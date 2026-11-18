const fs = require("fs"),
    vm = require("vm");
const output = vm.runInNewContext(fs.readFileSync("vehicle-media.js", "utf8") + ";vehicleMedia");
const ids = Object.keys(output);
let cursor = 0;
const errors = [];
async function worker() {
    while (cursor < ids.length) {
        const id = ids[cursor++];
        try {
            const r = await fetch("https://car.naver.com/photo?ncrId=" + id, { signal: AbortSignal.timeout(20000) });
            if (!r.ok) throw Error("HTTP " + r.status);
            const html = await r.text();
            const photos = [...html.matchAll(/<img src="([^"]+)" alt="자동차 이미지 \d+"/g)]
                .map((m) => {
                    const url = m[1].replace(/&amp;/g, "&");
                    try {
                        return new URL(url).searchParams.get("src") || url;
                    } catch {
                        return url;
                    }
                })
                .filter((x) => /^https:\/\/imgauto-phinf\.pstatic\.net\//.test(x));
            if (photos.length) output[id].photos = [...new Set(photos)];
        } catch (e) {
            errors.push({ id, error: e.message });
        }
        if (cursor % 100 === 0) console.log(cursor, "/", ids.length);
    }
}
Promise.all(Array.from({ length: 4 }, worker)).then(() => {
    fs.writeFileSync("vehicle-media.js", "const vehicleMedia = " + JSON.stringify(output) + ";\n");
    fs.writeFileSync("vehicle-gallery-report.json", JSON.stringify({ requested: ids.length, errors }, null, 2));
    console.log("done", ids.length, "errors", errors.length);
});
