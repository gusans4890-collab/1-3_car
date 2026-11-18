const fs = require("fs"),
    vm = require("vm");
const histories = vm.runInNewContext(fs.readFileSync("history-expanded.js", "utf8") + ";expandedHistoryById");
const ids = [
    ...new Set([
        ...Object.keys(histories),
        ...Object.values(histories)
            .flat()
            .map((x) => x.modelId)
            .filter(Boolean),
    ]),
];
const output = {},
    errors = [];
let cursor = 0;
const unpack = (value) => {
    try {
        return JSON.parse('"' + value + '"');
    } catch {
        return "";
    }
};
async function worker() {
    while (cursor < ids.length) {
        const id = ids[cursor++];
        try {
            const r = await fetch("https://car.naver.com/home?ncrId=" + id, { signal: AbortSignal.timeout(20000) });
            if (!r.ok) throw Error("HTTP " + r.status);
            const html = await r.text();
            const colorBlock = html.match(/\\"colors\\":(\[[\s\S]*?\])/);
            let colors = [];
            if (colorBlock) {
                try {
                    colors = JSON.parse(unpack(colorBlock[1]))
                        .filter((x) => x.colorsCarUrl)
                        .map((x) => ({
                            name: x.colorsDescription || "색상",
                            image: x.colorsCarUrl,
                            swatch: x.colorsBarUrl || "",
                        }));
                } catch {}
            }
            const photos = [...html.matchAll(/\\"imageThumbUrl\\":\\"([^"\\]*(?:\\.[^"\\]*)*)\\"/g)]
                .map((x) => unpack(x[1]))
                .filter((x) => /^https:\/\//.test(x));
            const frames = [...html.matchAll(/<img src="([^"]+)" alt="Car 360 view \d+"/g)].map((x) =>
                x[1].replace(/&amp;/g, "&"),
            );
            if (colors.length || photos.length || frames.length)
                output[id] = { colors, photos: [...new Set(photos)], frames };
        } catch (e) {
            errors.push({ id, error: e.message });
        }
        if (cursor % 100 === 0) console.log(cursor, "/", ids.length);
    }
}
Promise.all(Array.from({ length: 4 }, worker)).then(() => {
    fs.writeFileSync("vehicle-media.js", "const vehicleMedia = " + JSON.stringify(output) + ";\n");
    fs.writeFileSync(
        "vehicle-media-report.json",
        JSON.stringify({ requested: ids.length, withMedia: Object.keys(output).length, errors }, null, 2),
    );
    console.log("done", Object.keys(output).length, "errors", errors.length);
});
