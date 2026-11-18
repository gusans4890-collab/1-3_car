const fs = require("fs"),
    vm = require("vm");
const models = vm.runInNewContext(fs.readFileSync("danawa-catalog.js", "utf8") + ";danawaCatalog");
const decode = (s) =>
    (s || "")
        .replace(/<br\s*\/?\s*>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;|&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/[ \t]+/g, " ")
        .replace(/\n\s*/g, "\n")
        .trim();
const output = {},
    errors = [],
    queue = models.map((x) => ({ model: x.id, lineup: null }));
let cursor = 0,
    finished = 0;
function parse(html, model, lineup) {
    const selected = decode(html.match(/id='buttonSelect'>([\s\S]*?)<\/a>/)?.[1]);
    const start = html.indexOf("class='modelinfo-price'");
    const content = start >= 0 ? html.slice(start) : html;
    const starts = [...content.matchAll(/<td[^>]*class=['"][^'"]*trimsNameP\d+[^'"]*['"][^>]*>/g)];
    const trims = [];
    for (let i = 0; i < starts.length; i++) {
        const block = content.slice(starts[i].index, starts[i + 1]?.index || content.length);
        const name = decode(block.match(/^<td[^>]*>([\s\S]*?)<\/td>/)?.[1]);
        const price = decode(block.match(/<em class='num last'>([\s\S]*?)<\/em>/)?.[1]);
        const basic = decode(block.match(/<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/)?.[1]);
        const choiceBlock = block.match(/<ul class='pChkItemList'[\s\S]*?<\/ul>/)?.[0] || "";
        const options = [
            ...choiceBlock.matchAll(/<div class='choice' code='(\d+)'>([\s\S]*?)(?=<div class='choice' code=|<\/ul>)/g),
        ]
            .map((m) => ({
                name: decode(m[2].match(/<label[^>]*>([\s\S]*?)<\/label>/)?.[1]),
                price: decode(
                    m[2].match(/class='[^']*choice__price[^']*'>\s*<span class='txt'>([\s\S]*?)<\/span>/)?.[1],
                ),
                details: [...m[2].matchAll(/<h4 class='title'>([\s\S]*?)<\/h4>/g)].map((x) => decode(x[1])),
            }))
            .filter((x) => x.name);
        if (name) trims.push({ name, price, basic, options });
    }
    return { lineup: lineup || "default", label: selected, trims };
}
async function worker() {
    while (cursor < queue.length) {
        const job = queue[cursor++];
        try {
            const url =
                "https://auto.danawa.com/auto/?Work=model&Model=" +
                job.model +
                "&Tab=price" +
                (job.lineup ? "&Lineup=" + job.lineup : "");
            const r = await fetch(url, { signal: AbortSignal.timeout(25000) });
            if (!r.ok) throw Error("HTTP " + r.status);
            const html = await r.text();
            const parsed = parse(html, job.model, job.lineup);
            if (!output[job.model]) output[job.model] = [];
            if (parsed.trims.length) output[job.model].push(parsed);
            if (!job.lineup) {
                const active = html.match(/<div id='listSelect'[\s\S]*?<div class='modelinfo-tab'>/)?.[0] || "";
                for (const m of active.matchAll(/<div class='choice[^']*'>\s*<input[^>]*data-lineup='(\d+)'/g))
                    queue.push({ model: job.model, lineup: m[1] });
            }
        } catch (e) {
            errors.push({ model: job.model, lineup: job.lineup, error: e.message });
        }
        finished++;
        if (finished % 100 === 0) console.log("processed", finished, "queued", queue.length);
    }
}
Promise.all(Array.from({ length: 5 }, worker)).then(() => {
    fs.writeFileSync("options-catalog.js", "const collectedOptions = " + JSON.stringify(output) + ";\n");
    fs.writeFileSync(
        "options-report.json",
        JSON.stringify(
            {
                models: models.length,
                requests: finished,
                withData: Object.keys(output).filter((k) => output[k].length).length,
                errors,
            },
            null,
            2,
        ),
    );
    console.log(
        "done",
        finished,
        "models with data",
        Object.keys(output).filter((k) => output[k].length).length,
        "errors",
        errors.length,
    );
});
