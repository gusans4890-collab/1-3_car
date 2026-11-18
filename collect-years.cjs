const fs = require("fs");
const files = ["app.js", "naver-data.js", "naver-ev.js", "vehicle-snapshot.js", "history-catalog.js"];
const extra = {
    "BMW|7시리즈": "car_168351",
    "벤츠|CLA Sedan": "car_170877",
    "현대|팰리세이드": "car_171809",
    "현대|베뉴": "car_168523",
    "현대|캐스퍼": "car_166867",
    "현대|코나": "car_170929",
    "현대|아이오닉 6 N": "car_166785",
    "현대|아이오닉 5 N": "car_168047",
    "벤츠|GLC": "car_167531",
    "벤츠|GLC Coupé": "car_167529",
    "벤츠|GLE": "car_168885",
    "벤츠|GLS": "car_168773",
    "벤츠|G-Class": "car_169557",
    "볼보|XC90": "car_163027",
};
extra["기아|타스만"] = "car_164949";
extra["벤츠|A-Class Hatch"] = "car_132823";
const variantIds = {
    "기아|쏘렌토|기본 모델": "car_172115",
    "기아|K8|기본 모델": "car_171021",
    "현대|코나|하이브리드": "car_170937",
    "현대|캐스퍼|전기": "car_171587",
    "KG 모빌리티|토레스|전기": "car_170337",
};
variantIds["현대|디 올 뉴 투싼|가솔린"] = "car_171917";
const ids = [
    ...new Set([
        ...files.flatMap((f) => fs.readFileSync(f, "utf8").match(/car_\d+/g) || []),
        ...Object.values(extra),
        ...Object.values(variantIds),
    ]),
];
const decode = (s) =>
    (s || "")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/<[^>]*>/g, "")
        .trim();
const results = {};
const current = {};
const errors = [];
let cursor = 0;
async function worker() {
    while (cursor < ids.length) {
        const id = ids[cursor++];
        try {
            const response = await fetch("https://car.naver.com/home?ncrId=" + id, {
                signal: AbortSignal.timeout(20000),
            });
            if (!response.ok) throw new Error("HTTP " + response.status);
            const html = await response.text();
            const title = decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]);
            const fields = {};
            for (const match of html.matchAll(
                /<dt>(출시|연료|주행|연비|전비|정원|출력|배기)<\/dt><dd>([\s\S]*?)<\/dd>/g,
            ))
                fields[match[1]] = decode(match[2]);
            const rawPrice = decode(html.match(/<dt>가격<\/dt><dd>([\s\S]*?)(?:<span|<\/dd>)/)?.[1]);
            const year = title.match(/\b(19\d{2}|20\d{2})\b/)?.[1];
            if (year)
                current[id] = {
                    year,
                    range: rawPrice || "정보 없음",
                    fuel: fields["연료"] || "정보 없음",
                    efficiency: fields["연비"] || fields["전비"] || "정보 없음",
                    output: fields["출력"] || "정보 없음",
                    driving: fields["주행"] || null,
                    displacement: fields["배기"] || null,
                    seats: fields["정원"] || "정보 없음",
                    source: "https://car.naver.com/home?ncrId=" + id,
                };
            const section = html.split("timeline_list_wrap")[1]?.split("</ul>")[0] || "";
            const records = [];
            for (const m of section.matchAll(/<li class="timeline_item">([\s\S]*?)<\/li>/g)) {
                const item = m[1];
                const year = item.match(/class="date">(\d{4})/)?.[1];
                const modelId = item.match(/ncrId=(car_\d+)/)?.[1];
                const title = decode(item.match(/class="tit_text">([\s\S]*?)<\/span>/)?.[1]);
                const info = [...item.matchAll(/class="info_text">([\s\S]*?)<\/span>/g)].map((x) => decode(x[1]));
                const image = item.match(/<img src="([^"]+)"/)?.[1];
                if (year && modelId && title)
                    records.push({
                        year,
                        name: title.replace(/^\d{4}\s*/, ""),
                        price:
                            (info.find((x) => x.startsWith("가격")) || "")
                                .replace(/^가격\s*/, "")
                                .replace(/만원$/, "") || "정보 없음",
                        efficiency: (info.find((x) => /^(연비|전비)/.test(x)) || "").replace(/^(연비|전비)\s*/, ""),
                        modelId,
                        image: image ? decode(image) : null,
                    });
            }
            const embedded = html.match(/\\"otherModels\\":(\[[\s\S]*?\]),\\"otherSeriesModels\\"/);
            if (embedded) {
                const raw = JSON.parse('"' + embedded[1] + '"');
                const all = JSON.parse(raw);
                const format = (obj) => {
                    if (!obj || !obj.value) return "";
                    const { min, max } = obj.value;
                    return min == null
                        ? ""
                        : (min === max || max == null ? String(min) : min + "~" + max) + (obj.unit || "");
                };
                records.length = 0;
                for (const item of all)
                    if (item.year && item.ncrId)
                        records.push({
                            year: item.year,
                            name: (item.modelName || "").replace(/^\d{4}\s*/, ""),
                            price: format(item.price).replace(/만원$/, "") || "정보 없음",
                            priceDisplay: format(item.price) || "정보 없음",
                            efficiency: format(item.fuelRate),
                            modelId: item.ncrId,
                            image: item.repImage || null,
                        });
            }
            results[id] = records;
            process.stdout.write(id + ": " + records.length + "\n");
        } catch (e) {
            errors.push({ id, error: e.message });
        }
    }
}
Promise.all(Array.from({ length: 4 }, worker)).then(() => {
    fs.writeFileSync(
        "history-expanded.js",
        "const expandedHistoryById = " +
            JSON.stringify(results, null, 2) +
            ";\nconst naverExtraModelIds = " +
            JSON.stringify(extra, null, 2) +
            ";\nconst naverExtraVariantIds = " +
            JSON.stringify(variantIds, null, 2) +
            ";\nconst naverCollectedCurrent = " +
            JSON.stringify(current, null, 2) +
            ";\n",
        "utf8",
    );
    fs.writeFileSync(
        "history-collection-report.json",
        JSON.stringify({ requested: ids.length, completed: Object.keys(results).length, errors }, null, 2),
    );
    console.log("done", Object.keys(results).length, "errors", errors.length);
});
