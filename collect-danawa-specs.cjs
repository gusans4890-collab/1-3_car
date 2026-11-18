const fs = require("fs"),
    vm = require("vm");
const models = vm.runInNewContext(fs.readFileSync("danawa-catalog.js", "utf8") + ";danawaCatalog");
const decode = (s) =>
    (s || "")
        .replace(/<!--.*?-->/gs, "")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
let cursor = 0;
const results = {},
    errors = [];
async function worker() {
    while (cursor < models.length) {
        const model = models[cursor++];
        try {
            const r = await fetch(model.source, { signal: AbortSignal.timeout(20000) });
            if (!r.ok) throw Error("HTTP " + r.status);
            const html = await r.text(),
                summary = html.split("class='modelSummary")[1]?.split("class='modelSection")[0] || "";
            const price = decode(summary.match(/class='price_title'>([\s\S]*?)<\/div>/)?.[1]);
            const date = decode(summary.match(/class='date'>([\s\S]*?)<\/div>/)?.[1]);
            const block = summary.match(/class='spec'>([\s\S]*?)<\/div>/)?.[1] || "";
            const specs = [...block.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)]
                .map((x) => decode(x[1]))
                .filter(Boolean);
            results[model.id] = { price, date, specs };
        } catch (e) {
            errors.push({ id: model.id, error: e.message });
        }
        if (cursor % 100 === 0) console.log(cursor, "/", models.length);
    }
}
Promise.all(Array.from({ length: 4 }, worker)).then(() => {
    fs.writeFileSync("danawa-specs.js", "const danawaModelSpecs = " + JSON.stringify(results, null, 2) + ";\n");
    fs.writeFileSync(
        "danawa-specs-report.json",
        JSON.stringify({ requested: models.length, completed: Object.keys(results).length, errors }, null, 2),
    );
    console.log("done", Object.keys(results).length, "errors", errors.length);
});
