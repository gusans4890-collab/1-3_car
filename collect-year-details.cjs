const fs = require("fs"),
    vm = require("vm");
const histories = vm.runInNewContext(fs.readFileSync("history-expanded.js", "utf8") + ";expandedHistoryById");
const existing = fs.existsSync("year-details.js")
    ? vm.runInNewContext(fs.readFileSync("year-details.js", "utf8") + ";naverYearDetails")
    : {};
const ids = [
    ...new Set(
        Object.values(histories)
            .flat()
            .map((x) => x.modelId)
            .filter(Boolean),
    ),
].filter((id) => !existing[id]);
const decode = (s) =>
    (s || "")
        .replace(/<!--.*?-->/g, "")
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
const output = { ...existing },
    errors = [];
let cursor = 0;
async function worker() {
    while (cursor < ids.length) {
        const id = ids[cursor++];
        try {
            const r = await fetch("https://car.naver.com/home?ncrId=" + id, { signal: AbortSignal.timeout(20000) });
            if (!r.ok) throw new Error("HTTP " + r.status);
            const html = await r.text(),
                fields = {};
            for (const m of html.matchAll(
                /<dt>(출시|연료|주행|연비|전비|정원|출력|토크|배기)<\/dt><dd>([\s\S]*?)<\/dd>/g,
            ))
                fields[m[1]] = decode(m[2]);
            output[id] = fields;
        } catch (e) {
            errors.push({ id, error: e.message });
        }
        if (cursor % 100 === 0) console.log("processed", cursor, "/", ids.length);
    }
}
Promise.all(Array.from({ length: 4 }, worker)).then(() => {
    fs.writeFileSync("year-details.js", "const naverYearDetails = " + JSON.stringify(output, null, 2) + ";\n");
    fs.writeFileSync(
        "year-details-report.json",
        JSON.stringify({ requested: ids.length, completed: Object.keys(output).length, errors }, null, 2),
    );
    console.log("done", Object.keys(output).length, "errors", errors.length);
});
