const fs = require("fs"),
    vm = require("vm");
const catalog = vm.runInNewContext(fs.readFileSync("danawa-catalog.js", "utf8") + ";danawaCatalog");
const result = {},
    errors = [];
let cursor = 0;
async function worker() {
    while (cursor < catalog.length) {
        const item = catalog[cursor++];
        try {
            for (const size of [600, 360]) {
                const url = "https://autoimg.danawa.com/photo/" + item.id + "/model_" + size + ".png";
                const response = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(12000) });
                if (response.ok && (response.headers.get("content-type") || "").startsWith("image/")) {
                    result[item.id] = url;
                    break;
                }
            }
        } catch (e) {
            errors.push({ id: item.id, error: e.message });
        }
        if (cursor % 100 === 0) console.log(cursor, "/", catalog.length);
    }
}
Promise.all(Array.from({ length: 6 }, worker)).then(() => {
    fs.writeFileSync("quality-images.js", "const danawaQualityImages = " + JSON.stringify(result) + ";\n");
    fs.writeFileSync(
        "quality-images-report.json",
        JSON.stringify({ requested: catalog.length, verified: Object.keys(result).length, errors }, null, 2),
    );
    console.log("verified", Object.keys(result).length, "errors", errors.length);
});
