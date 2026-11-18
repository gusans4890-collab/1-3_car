const fs = require("fs");
const decode = (s) =>
    (s || "")
        .replace(/&amp;/g, "&")
        .replace(/&#39;|&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/<[^>]+>/g, "")
        .trim();
const brandsMap = {
    KGM: "KG 모빌리티",
    MINI: "미니",
    미니: "미니",
    벤츠: "벤츠",
    롤스로이스: "롤스로이스",
    DS: "DS 오토모빌",
    스마트: "스마트",
    BYD: "BYD",
};
const output = [],
    errors = [];
(async () => {
    const home = await (await fetch("https://auto.danawa.com/auto/")).text();
    const brands = [...home.matchAll(/Work=brand&Brand=(\d+)'[^>]*><img[^>]*alt='([^']+)'/g)].map((m) => ({
        id: m[1],
        name: brandsMap[decode(m[2])] || decode(m[2]),
    }));
    let cursor = 0;
    async function worker() {
        while (cursor < brands.length) {
            const brand = brands[cursor++];
            try {
                const response = await fetch("https://auto.danawa.com/auto/?Work=brand&Brand=" + brand.id, {
                    signal: AbortSignal.timeout(20000),
                });
                if (!response.ok) throw Error("HTTP " + response.status);
                const html = await response.text();
                const section = html.split("class='brandModel newcar'")[1]?.split("class='brandSegment'")[0] || "";
                for (const group of section.matchAll(
                    /<dt><span>(.*?)<\/span><\/dt><dd><ul class='modelList[\s\S]*?>([\s\S]*?)<\/ul>/g,
                )) {
                    const category = decode(group[1]);
                    for (const m of group[2].matchAll(
                        /<li code='(\d+)'[\s\S]*?<img alt='([^']*)' src='([^']+)'[\s\S]*?<span class='name'>([\s\S]*?)<\/span>[\s\S]*?<\/li>/g,
                    ))
                        output.push({
                            brand: brand.name,
                            name: decode(m[4]),
                            category,
                            id: m[1],
                            image: decode(m[3]),
                            source: "https://auto.danawa.com/auto/?Work=model&Model=" + m[1],
                        });
                }
            } catch (e) {
                errors.push({ brand: brand.name, error: e.message });
            }
        }
    }
    await Promise.all(Array.from({ length: 4 }, worker));
    output.sort((a, b) => a.brand.localeCompare(b.brand, "ko") || a.name.localeCompare(b.name, "ko"));
    fs.writeFileSync("danawa-catalog.js", "const danawaCatalog = " + JSON.stringify(output, null, 2) + ";\n");
    fs.writeFileSync(
        "danawa-collection-report.json",
        JSON.stringify({ brands: brands.length, models: output.length, errors }, null, 2),
    );
    console.log("brands", brands.length, "models", output.length, "errors", errors.length);
})();
