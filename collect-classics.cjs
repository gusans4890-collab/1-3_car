const fs = require("fs");
// Curated discontinued model lines; exclude names still sold and renamed active families.
const seeds = [
    ["현대", "클릭", "car_13321", "https://www.motoya.co.kr/news/articleViewAmp.html?idxno=15815", 2010],
    ["르노코리아", "SM3", "car_13277", "https://www.etnews.com/20200109000253", 2019],
    ["르노코리아", "SM5", "car_10437", "https://www.etnews.com/20200109000253", 2019],
    ["르노코리아", "SM7", "car_12166", "https://www.etnews.com/20200109000253", 2019],
    ["르노코리아", "SM6", "car_156051", "https://www.news1.kr/industry/auto-industry/5999933", 2025],
    ["쉐보레", "크루즈", "car_67843", "https://www.news1.kr/industry/auto-industry/5999933", 2018],
    ["쉐보레", "말리부", "car_141643", "https://www.news1.kr/industry/auto-industry/5999933", 2023],
    ["쉐보레", "토스카", "car_10141", "https://www.newsis.com/view/NISX20101212_0006932129", 2011],
    ["KG 모빌리티", "체어맨 W", "car_11088", "https://www.news1.kr/industry/auto-industry/5999933", 2017],
    ["현대", "포니2", "car_16621", "https://org1.hyundai.com/kr/ko/brand/brandstory/heritage", 1985],
    ["현대", "포니 엑셀", "car_16616", "https://org1.hyundai.com/kr/ko/brand/brandstory/heritage", 1994],
    ["현대", "다이너스티", "car_13593", "https://org1.hyundai.com/kr/ko/brand/brandstory/heritage", 2005],
    ["현대", "티뷰론", "car_16694", "https://org1.hyundai.com/kr/ko/brand/brandstory/heritage", 2002],
    [
        "현대",
        "트라제 XG",
        "car_13303",
        "https://cbiz.chosun.com/svc/bulletin/bulletin_art.html?contid=2007051601063",
        2008,
    ],
    ["기아", "세피아", "car_119267", "https://www.kia.com/kr/company/introduce/history", 1999],
    ["기아", "프라이드", "car_51309", "https://pdf.etoday.co.kr/daily/pdf/detoday02389.pdf", 2018],
    ["쉐보레", "다마스", "car_13269", "https://www.asiatoday.co.kr/kn/view.php?key=20230816010007627", 2021],
    ["쉐보레", "올란도", "car_15051", "https://www.kukinews.com/article/view/kuk201802130201", 2018],
    ["기아", "K7", "car_131207", "https://m.carisyou.com/search/result/?qt=%EA%B8%B0%EC%95%84+K7", 2021],
    ["기아", "오피러스", "car_10616", "https://www.encar.com/mocha/history.do?mdlcd=093&mnfccd=002", 2012],
    ["기아", "스팅어", "car_154759", "https://v.daum.net/v/GqxMZIfzEo", 2023],
];
const clean = (s) =>
    (s || "")
        .replace(/<!--.*?-->/gs, "")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
const unpack = (s) => JSON.parse('"' + s + '"');
const result = [],
    history = {},
    details = {},
    media = {},
    errors = [];
function info(html, id) {
    const fields = {};
    for (const x of html.matchAll(/<dt>(출시|연료|주행|연비|전비|정원|출력|토크|배기)<\/dt><dd>([\s\S]*?)<\/dd>/g))
        fields[x[1]] = clean(x[2]);
    const title = clean(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]),
        year = title.match(/\b(?:19|20)\d{2}\b/)?.[0];
    const price = clean(html.match(/<dt>가격<\/dt><dd>([\s\S]*?)(?:<span|<\/dd>)/)?.[1]);
    const photos = [...html.matchAll(/<li class="photo_item">[\s\S]*?<img src="([^"]+)"/g)].map((x) =>
        x[1].replace(/&amp;/g, "&").replace(/\?type=.*/, ""),
    );
    const frames = [...html.matchAll(/<img src="([^"]+)" alt="Car 360 view \d+"/g)].map((x) =>
        x[1].replace(/&amp;/g, "&"),
    );
    const cb = html.match(/\\"colors\\":(\[[\s\S]*?\])/);
    let colors = [];
    try {
        if (cb)
            colors = JSON.parse(unpack(cb[1]))
                .filter((x) => x.colorsCarUrl)
                .map((x) => ({
                    name: x.colorsDescription || "색상",
                    image: x.colorsCarUrl,
                    swatch: x.colorsBarUrl || "",
                }));
    } catch {}
    if (photos.length || frames.length || colors.length) media[id] = { photos, frames, colors };
    return {
        year,
        range: price || "정보 없음",
        fuel: fields["연료"] || "정보 없음",
        efficiency: fields["연비"] || fields["전비"] || "정보 없음",
        output: fields["출력"] || "정보 없음",
        displacement: fields["배기"] || undefined,
        seats: fields["정원"] || "정보 없음",
        source: "https://car.naver.com/home?ncrId=" + id,
        fields,
    };
}
async function main() {
    for (const [brand, name, id, proof, lastDomesticYear] of seeds) {
        try {
            const r = await fetch("https://car.naver.com/home?ncrId=" + id, { signal: AbortSignal.timeout(20000) });
            if (!r.ok) throw Error("HTTP " + r.status);
            const html = await r.text();
            const base = info(html, id);
            const m = html.match(/\\"otherModels\\":(\[[\s\S]*?\]),\\"otherSeriesModels\\"/);
            let others = [];
            if (m) {
                const arr = JSON.parse(unpack(m[1]));
                const fmt = (o) => {
                    if (!o?.value || o.value.min == null) return "";
                    const a = o.value.min,
                        b = o.value.max;
                    return (a === b || b == null ? String(a) : a + "~" + b) + (o.unit || "");
                };
                others = arr
                    .filter((x) => x.year && x.ncrId && Number(x.year) <= lastDomesticYear)
                    .map((x) => ({
                        year: x.year,
                        name: (x.modelName || "").replace(/^\d{4}\s*/, ""),
                        priceDisplay: fmt(x.price) || "정보 없음",
                        price: fmt(x.price).replace(/만원$/, "") || "정보 없음",
                        efficiency: fmt(x.fuelRate),
                        modelId: x.ncrId,
                        image: x.repImage?.replace(/^http:\/\//, "https://") || null,
                    }));
            }
            history[id] = others;
            result.push({ id, brand, name, proof, base, image: media[id]?.photos?.[0] || null });
        } catch (e) {
            errors.push({ id, error: e.message });
        }
    }
    const ids = [
        ...new Set(
            Object.values(history)
                .flat()
                .map((x) => x.modelId),
        ),
    ];
    let cursor = 0;
    async function worker() {
        while (cursor < ids.length) {
            const id = ids[cursor++];
            try {
                const r = await fetch("https://car.naver.com/home?ncrId=" + id, { signal: AbortSignal.timeout(20000) });
                if (!r.ok) throw Error("HTTP " + r.status);
                const d = info(await r.text(), id);
                details[id] = d.fields;
            } catch (e) {
                errors.push({ id, error: e.message });
            }
        }
    }
    await Promise.all(Array.from({ length: 4 }, worker));
    for (const rows of Object.values(history))
        for (const row of rows) row.image = media[row.modelId]?.photos?.[0] || null;
    fs.writeFileSync(
        "classic-catalog.js",
        "const classicCatalog = " +
            JSON.stringify(result) +
            ";\nconst classicHistory = " +
            JSON.stringify(history) +
            ";\nconst classicYearDetails = " +
            JSON.stringify(details) +
            ";\nconst classicMedia = " +
            JSON.stringify(media) +
            ";\n",
    );
    fs.writeFileSync(
        "classic-report.json",
        JSON.stringify({ requested: seeds.length, models: result.length, years: ids.length, errors }, null, 2),
    );
    console.log("models", result.length, "years", ids.length, "errors", errors.length);
}
main();
