const fs = require("fs");
const strip = (s) =>
    (s || "")
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
const names = {
    현대자동차: "현대",
    기아자동차: "기아",
    타타대우모빌리티: "타타대우모빌리티",
    타타대우: "타타대우모빌리티",
    "KGM 커머셜": "KGM 커머셜",
    르노코리아자동차: "르노코리아",
};
(async () => {
    const models = {},
        errors = [];
    const tasks = ["truck", "bus"].flatMap((kind) =>
        ["", ...Array.from({ length: kind === "truck" ? 40 : 30 }, (_, i) => "index.php?startPage=" + i * 10)].map(
            (path) => ({ kind, path }),
        ),
    );
    let cursor = 0;
    async function worker() {
        while (cursor < tasks.length) {
            const { kind, path } = tasks[cursor++];
            const url = "https://www.etrucks.co.kr/kr/" + kind + "/" + path;
            try {
                const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
                if (!res.ok) throw Error("HTTP " + res.status);
                const html = await res.text();
                for (const item of html.matchAll(/<li class="car-search-list-item"[\s\S]*?<\/li>/g)) {
                    const block = item[0],
                        source = block.match(/href="([^"]*detail\.php\?idx=(\d+)[^"]*)"/),
                        image = block.match(/class="car-list-detail-thum"[\s\S]*?<img src="([^"]+)"/),
                        title = block.match(/class="car-name">([\s\S]*?)<\/strong>/),
                        description = block.match(/class="car-text">([\s\S]*?)<\/p>/);
                    if (!source || !title) continue;
                    const parts = strip(description?.[1])
                        .split("/")
                        .map((s) => s.trim());
                    const manufacturer = strip(block.match(/class="tooltiptext">([\s\S]*?)<\/span>/)?.[1]) || parts[0],
                        name = strip(title[1]);
                    const category = strip(block.match(/class="car-list-item-category">([\s\S]*?)<\/p>/)?.[1]);
                    const fuelHint = category + " " + name + " " + parts.join(" ");
                    const year = parts.find((value) => /(?:19|20)\d{2}/.test(value)) || "";
                    if (!manufacturer) continue;
                    models[kind + "-" + source[2]] = {
                        id: kind + "-" + source[2],
                        brand: names[manufacturer] || manufacturer,
                        name,
                        type:
                            (/수소/.test(fuelHint) ? "수소 " : /전기|electric/i.test(fuelHint) ? "전기 " : "") +
                            (kind === "truck" ? "트럭" : "버스"),
                        year,
                        fields: {
                            제조사: manufacturer,
                            연식: year,
                            분류: category,
                            "추가 정보": parts.filter((p) => p && p !== manufacturer && p !== year).join(" / "),
                        },
                        image: image && image[1],
                        source: source[1],
                    };
                }
                for (const item of html.matchAll(/<div class="car-model-thum">([\s\S]*?)<\/li>/g)) {
                    const block = item[1],
                        source = block.match(/href="([^"]*detail\.php\?idx=(\d+)[^"]*)"/),
                        image = block.match(/<img src="([^"]+)"/),
                        title = block.match(/class="car-model-tit">([\s\S]*?)<\/h2>/);
                    if (!source || !title) continue;
                    const fields = {};
                    for (const row of block.matchAll(/<th[^>]*>([\s\S]*?)<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/g))
                        fields[strip(row[1])] = strip(row[2]);
                    const manufacturer = fields["제조사"];
                    if (!manufacturer) continue;
                    const name = strip(title[1]),
                        year = fields["연식"] || "";
                    models[kind + "-" + source[2]] = {
                        id: kind + "-" + source[2],
                        brand: names[manufacturer] || manufacturer,
                        name,
                        type:
                            (/수소/.test(name) ? "수소 " : /전기|electric/i.test(name) ? "전기 " : "") +
                            (kind === "truck" ? "트럭" : "버스"),
                        year,
                        fields,
                        image: image && image[1],
                        source: source[1],
                    };
                }
            } catch (e) {
                errors.push({ url, error: e.message });
            }
        }
    }
    await Promise.all(Array.from({ length: 4 }, worker));
    fs.writeFileSync(
        "commercial-catalog.js",
        "const commercialCatalog = " + JSON.stringify(Object.values(models), null, 2) + ";\n",
    );
    fs.writeFileSync("commercial-report.json", JSON.stringify({ count: Object.keys(models).length, errors }, null, 2));
    console.log("models", Object.keys(models).length, "errors", errors.length);
})();
