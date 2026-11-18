const brands = [
    "현대",
    "기아",
    "제네시스",
    "KG 모빌리티",
    "르노코리아",
    "쉐보레",
    "BMW",
    "벤츠",
    "아우디",
    "폭스바겐",
    "볼보",
    "렉서스",
    "토요타",
    "혼다",
    "포르쉐",
    "미니",
    "랜드로버",
    "재규어",
    "지프",
    "포드",
    "링컨",
    "캐딜락",
    "GMC",
    "테슬라",
    "폴스타",
    "푸조",
    "시트로엥",
    "DS 오토모빌",
    "마세라티",
    "페라리",
    "람보르기니",
    "벤틀리",
    "롤스로이스",
    "애스턴마틴",
    "맥라렌",
    "로터스",
    "BYD",
];
const img = [
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1100&q=80",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=80",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1100&q=80",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=80",
];
const cars = [
    {
        id: "ioniq5",
        brand: "현대",
        name: "아이오닉 5",
        type: "전기 SUV",
        years: ["2025", "2024", "2022"],
        gens: ["1세대 (NE)", "1세대 부분변경"],
        trims: ["롱레인지", "스탠다드"],
        power: "전기",
        output: "168 kW",
        range: "458 km",
        price: "5,200만 원대",
        image: img[0],
        history: "2021년 현대차의 전용 전기차 플랫폼 E-GMP를 바탕으로 처음 공개되었습니다.",
    },
    {
        id: "g80",
        brand: "제네시스",
        name: "G80",
        type: "대형 세단",
        years: ["2025", "2024", "2020"],
        gens: ["3세대 (RG3)", "2세대 (DH)"],
        trims: ["2.5 터보", "3.5 터보"],
        power: "가솔린",
        output: "304 ps",
        range: "10.6 km/L",
        price: "5,900만 원대",
        image: img[3],
        history: "2016년 독립 브랜드 제네시스의 세단으로 출발해 세대를 거듭해 왔습니다.",
    },
    {
        id: "5series",
        brand: "BMW",
        name: "5시리즈",
        type: "준대형 세단",
        years: ["2025", "2024", "2020"],
        gens: ["8세대 (G60)", "7세대 (G30)"],
        trims: ["520i", "530i"],
        power: "가솔린",
        output: "190 ps",
        range: "12.1 km/L",
        price: "7,000만 원대",
        image: img[1],
        history: "1972년 첫 출시 이후 BMW의 대표적인 비즈니스 세단으로 자리 잡았습니다.",
    },
    {
        id: "eclass",
        brand: "벤츠",
        name: "E-클래스",
        type: "준대형 세단",
        years: ["2025", "2024", "2020"],
        gens: ["11세대 (W214)", "10세대 (W213)"],
        trims: ["E 200", "E 300"],
        power: "가솔린",
        output: "204 ps",
        range: "12.4 km/L",
        price: "7,000만 원대",
        image: img[2],
        history: "오랜 역사를 지닌 메르세데스-벤츠의 대표 세단 계보를 잇고 있습니다.",
    },
    {
        id: "sorento",
        brand: "기아",
        name: "쏘렌토",
        type: "중형 SUV",
        years: ["2025", "2024", "2020"],
        gens: ["4세대 (MQ4)", "3세대 (UM)"],
        trims: ["가솔린 2.5", "하이브리드"],
        power: "가솔린",
        output: "281 ps",
        range: "10.8 km/L",
        price: "3,600만 원대",
        image: img[3],
        history: "2002년 출시된 기아의 대표 SUV로 여러 세대에 걸쳐 발전했습니다.",
    },
];
// Model names are a curated snapshot, not a live manufacturer's feed.
const sources = {
    현대: "https://www.hyundai.com/kr/ko/e/vehicles/purchase-guide",
    기아: "https://www.kia.com/kr/vehicles/ev",
    제네시스: "https://www.genesis.com/kr/ko",
    BMW: "https://www.bmw.co.kr/ko/all-models.html",
    벤츠: "https://www.mercedes-benz.co.kr/passengercars/models.html",
};
const newModels = {
    현대: [
        ["그랜저", "세단"],
        ["넥쏘", "수소 SUV"],
        ["코나 Electric", "전기 SUV"],
    ],
    기아: [
        ["모닝", "경차"],
        ["레이", "경차"],
        ["K5", "세단"],
        ["K8", "세단"],
        ["K9", "세단"],
        ["레이 EV", "전기차"],
        ["EV3", "전기 SUV"],
        ["EV4", "전기 세단"],
        ["EV5", "전기 SUV"],
        ["EV6", "전기 SUV"],
        ["EV9", "전기 SUV"],
    ],
    제네시스: [
        ["GV90 Neolun", "전기 SUV"],
        ["GV90", "전기 SUV"],
        ["GV80 Coupe", "SUV"],
        ["GV80", "SUV"],
        ["Electrified G80", "전기 세단"],
        ["Electrified GV70", "전기 SUV"],
        ["GV70", "SUV"],
        ["GV60", "전기 SUV"],
        ["G90", "세단"],
        ["G70", "세단"],
        ["G70 Shooting Brake", "왜건"],
    ],
    BMW: [
        ["1시리즈", "해치백"],
        ["2시리즈 그란 쿠페", "쿠페"],
        ["2시리즈 액티브 투어러", "MPV"],
        ["3시리즈", "세단"],
        ["7시리즈", "세단"],
        ["X1", "SUV"],
        ["X3", "SUV"],
        ["X5", "SUV"],
        ["X6", "SUV"],
        ["X7", "SUV"],
    ],
    벤츠: [
        ["CLA Sedan", "세단"],
        ["C-Class", "세단"],
        ["S-Class", "세단"],
        ["EQE", "전기 세단"],
        ["EQE SUV", "전기 SUV"],
        ["EQS SUV", "전기 SUV"],
        ["GLA", "SUV"],
        ["GLB", "SUV"],
        ["A-Class Hatch", "해치백"],
        ["CLE Coupé", "쿠페"],
    ],
};
for (const [brand, models] of Object.entries(newModels))
    for (const [name, type] of models) {
        cars.push({
            id: "catalog-" + cars.length,
            brand,
            name,
            type,
            source:
                brand === "기아" && !["레이 EV", "EV3", "EV4", "EV5", "EV6", "EV9"].includes(name)
                    ? "https://www.kia.com/kr/vehicles/sedan"
                    : sources[brand],
            catalogOnly: true,
        });
    }
cars.forEach((c) => {
    c.source = c.source || sources[c.brand];
});
const grandeurHistory = [
    "1세대 · 1986",
    "2세대 · 1992",
    "3세대 · 1998",
    "4세대 · 2005",
    "5세대 · 2011",
    "6세대 · 2016",
    "7세대 · 2022",
];
// Additional models checked against the linked Korean manufacturer pages.
const additions = [
    ["현대", "팰리세이드", "SUV", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "베뉴", "SUV", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "코나", "SUV", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "캐스퍼", "경차", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "캐스퍼 일렉트릭", "전기 SUV", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "아이오닉 6 N", "전기 세단", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "아이오닉 5 N", "전기 SUV", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["벤츠", "GLC", "SUV", "https://www.mercedes-benz.co.kr/passengercars/models/suv/glc/overview.html"],
    ["벤츠", "GLC Coupé", "SUV", "https://www.mercedes-benz.co.kr/passengercars/models/suv/glc-coupe/overview.html"],
    ["벤츠", "GLE", "SUV", "https://www.mercedes-benz.co.kr/passengercars/models/suv/gle/overview.html"],
    ["벤츠", "GLS", "SUV", "https://www.mercedes-benz.co.kr/passengercars/models/suv/gls/overview.html"],
    ["벤츠", "G-Class", "SUV", "https://www.mercedes-benz.co.kr/passengercars/models/suv/g-class/overview.html"],
    ["현대", "디 올 뉴 아반떼", "세단", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "쏘나타 디 엣지", "세단", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "디 올 뉴 투싼", "SUV", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "싼타페", "SUV", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["현대", "아반떼 N", "세단", "https://www.hyundai.com/kr/ko/e/all-vehicles"],
    ["기아", "셀토스", "SUV", "https://www.kia.com/kr/redirect/sitemap"],
    ["기아", "니로", "SUV", "https://www.kia.com/kr/redirect/sitemap"],
    ["기아", "스포티지", "SUV", "https://www.kia.com/kr/vehicles/sportage/features"],
    ["기아", "타스만", "트럭", "https://www.kia.com/kr/redirect/sitemap"],
    ["기아", "카니발", "MPV", "https://www.kia.com/kr/redirect/sitemap"],
    ["기아", "PV5 패신저", "전기 MPV", "https://www.kia.com/kr/redirect/sitemap"],
    ["KG 모빌리티", "토레스", "SUV", "https://www.kg-mobility.com/pr/model"],
    ["KG 모빌리티", "액티언", "SUV", "https://www.kg-mobility.com/pr/model"],
    ["KG 모빌리티", "티볼리", "SUV", "https://www.kg-mobility.com/cm/pre-order/10000810025"],
    ["KG 모빌리티", "렉스턴 뉴 아레나", "SUV", "https://www.kg-mobility.com/pr/model"],
    ["KG 모빌리티", "토레스 EVX", "전기 SUV", "https://www.kg-mobility.com/cm/pre-order/10000810025"],
    ["KG 모빌리티", "무쏘", "트럭", "https://www.kg-mobility.com/cm/pre-order/10000810025"],
    ["KG 모빌리티", "무쏘 EV", "전기 트럭", "https://www.kg-mobility.com/cm/pre-order/10000810025"],
    ["르노코리아", "그랑 콜레오스", "SUV", "https://cdn.renault.co.kr/ko/model/koleos_overview.jsp"],
    ["르노코리아", "필랑트", "SUV", "https://cdn.renault.co.kr/ko/inside/news_list.jsp"],
    ["볼보", "EX90", "전기 SUV", "https://www.volvocars.com/kr/build/"],
    ["볼보", "EX30", "전기 SUV", "https://www.volvocars.com/kr/build/"],
    ["볼보", "XC90", "SUV", "https://www.volvocars.com/kr/build/"],
    ["볼보", "XC60", "SUV", "https://www.volvocars.com/kr/build/"],
    ["볼보", "XC40", "SUV", "https://www.volvocars.com/kr/build/"],
    ["렉서스", "ES", "세단", "https://www.lexus.co.kr/"],
    ["렉서스", "LX", "SUV", "https://www.lexus.co.kr/"],
    ["렉서스", "LM", "MPV", "https://www.lexus.co.kr/"],
    ["렉서스", "LS", "세단", "https://www.lexus.co.kr/"],
    ["렉서스", "RX", "SUV", "https://www.lexus.co.kr/"],
    ["렉서스", "NX", "SUV", "https://www.lexus.co.kr/"],
    ["렉서스", "UX", "SUV", "https://www.lexus.co.kr/"],
    ["토요타", "캠리", "세단", "https://toyota.co.kr/models/camry/"],
    ["토요타", "RAV4", "SUV", "https://toyota.co.kr/seasonal-event/2026-nov-testdrive/"],
    ["테슬라", "Model 3", "전기 세단", "https://www.tesla.com/ko_kr/models"],
    ["테슬라", "Model Y", "전기 SUV", "https://www.tesla.com/ko_kr/models"],
    ["테슬라", "Cybertruck", "전기 트럭", "https://www.tesla.com/ko_kr/drive"],
    ["BMW", "i4", "전기 세단", "https://www.bmw.co.kr/ko/all-models.html"],
    ["BMW", "iX", "전기 SUV", "https://www.bmw.co.kr/ko/all-models.html"],
    ["BMW", "iX3", "전기 SUV", "https://www.bmw.co.kr/ko/all-models.html"],
];
for (const [brand, name, type, source] of additions)
    if (!cars.some((c) => c.brand === brand && c.name === name))
        cars.push({ id: "catalog-" + cars.length, brand, name, type, source, catalogOnly: true });
const officialImages = {
    EV3: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev3/24my/content/the_kia_ev3_feature_bg_pc.jpg",
    EV6: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev6/pe/ev6_pe_feature_bg_pc.jpg",
    EV9: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev9/24my/ev9_feature_bg_pc.jpg",
    스포티지: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/sportage/27my/content/the_kia_sportage_bg_pc.jpg",
};
cars.forEach((c) => {
    if (c.brand === "기아" && officialImages[c.name]) c.officialImage = officialImages[c.name];
});
const iceModels = [
    "디 올 뉴 아반떼",
    "쏘나타 디 엣지",
    "디 올 뉴 투싼",
    "싼타페",
    "아반떼 N",
    "모닝",
    "레이",
    "K5",
    "K8",
    "K9",
    "스포티지",
    "쏘렌토",
    "셀토스",
    "카니발",
    "타스만",
    "토레스",
    "액티언",
    "티볼리",
    "렉스턴 뉴 아레나",
    "무쏘",
];
cars.forEach((c) => {
    c.ice = iceModels.includes(c.name);
});
let bodyFilter = "전체",
    fuelFilter = "전체";
const domesticBrands = ["현대", "기아", "제네시스", "KG 모빌리티", "르노코리아", "쉐보레"];
const logos = {
    현대: "hyundai",
    기아: "kia",
    제네시스: "genesis",
    르노코리아: "renault",
    쉐보레: "chevrolet",
    BMW: "bmw",
    벤츠: "mercedesbenz",
    아우디: "audi",
    폭스바겐: "volkswagen",
    볼보: "volvo",
    렉서스: "lexus",
    토요타: "toyota",
    혼다: "honda",
    포르쉐: "porsche",
    미니: "mini",
    랜드로버: "landrover",
    재규어: "jaguar",
    지프: "jeep",
    포드: "ford",
    링컨: "lincoln",
    캐딜락: "cadillac",
    GMC: "gmc",
    테슬라: "tesla",
    폴스타: "polestar",
    푸조: "peugeot",
    시트로엥: "citroen",
    마세라티: "maserati",
    페라리: "ferrari",
    람보르기니: "lamborghini",
    벤틀리: "bentley",
    롤스로이스: "rollsroyce",
    애스턴마틴: "astonmartin",
    맥라렌: "mclaren",
    로터스: "lotus",
    BYD: "byd",
};
let brandGroup = "국산";
const brandPresentation = {
    현대: { name: "현대자동차", en: "HYUNDAI MOTOR", theme: "hyundai", desc: "현대자동차의 다양한 모델을 만나보세요." },
    기아: { name: "기아", en: "KIA", theme: "kia", desc: "움직임을 통해 새로운 영감을 만나보세요." },
    제네시스: { name: "제네시스", en: "GENESIS", theme: "genesis", desc: "제네시스가 제안하는 자동차를 살펴보세요." },
    BMW: { name: "BMW", en: "BMW", theme: "bmw", desc: "BMW의 다양한 모델을 살펴보세요." },
    벤츠: { name: "메르세데스-벤츠", en: "MERCEDES-BENZ", theme: "benz", desc: "메르세데스-벤츠 모델을 만나보세요." },
};
const logoSources = {
    "KG 모빌리티": "kgm",
    현대: "hyundai",
    기아: "kia",
    제네시스: "genesis",
    르노코리아: "renault",
    쉐보레: "chevrolet",
    BMW: "bmw",
    벤츠: "mercedes-benz",
    아우디: "audi",
    폭스바겐: "volkswagen",
    볼보: "volvo",
    렉서스: "lexus",
    토요타: "toyota",
    혼다: "honda",
    포르쉐: "porsche",
    미니: "mini",
    랜드로버: "land-rover",
    재규어: "jaguar",
    지프: "jeep",
    포드: "ford",
    링컨: "lincoln",
    캐딜락: "cadillac",
    GMC: "gmc",
    테슬라: "tesla",
    마세라티: "maserati",
    페라리: "ferrari",
    람보르기니: "lamborghini",
    벤틀리: "bentley",
    애스턴마틴: "aston-martin",
    맥라렌: "mclaren",
    로터스: "lotus",
    BYD: "byd",
    폴스타: "polestar",
    푸조: "peugeot",
    시트로엥: "citroen",
    롤스로이스: "rolls-royce",
};
const brandLogoUrl = (b) =>
    b === "KG 모빌리티" ? "kgm-logo.svg" : logoSources[b] ? "https://www.carlogos.org/car-logos/" + logoSources[b] + "-logo.png" : "";
function brandHeading() {
    if (selectedBrand === "전체")
        return `<div class="eyebrow">자동차 모아보기</div><h1 class="page-title">자동차 탐색</h1><p class="sub">브랜드와 차종, 동력별로 관심 있는 모델을 찾아보세요.</p>`;
    let v = brandPresentation[selectedBrand] || {
        name: selectedBrand,
        en: selectedBrand.toUpperCase(),
        theme: "default",
        desc: "브랜드의 모델을 한곳에서 살펴보세요.",
    };
    return `<div class="brand-hero brand-theme-${v.theme}" data-brand-theme="${esc(selectedBrand)}"><div class="brand-hero-logo">${logoSources[selectedBrand] ? `<img src="${brandLogoUrl(selectedBrand)}" alt="${esc(v.name)} 로고" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="brand-logo-fallback" hidden>${esc(v.name)}</span>` : `<span class="brand-logo-fallback">${esc(v.name)}</span>`}</div><div><div class="eyebrow">브랜드 안내</div><h1>${esc(v.name)}</h1><p>${esc(v.desc)}</p></div><span class="brand-hero-caption">브랜드 모아보기<br>차량 안내</span></div>`;
}
const brandExpanded = { 국산: false, 수입: false };
let classicBrand = "전체";
let classicSearch = "";
let classicYear = "전체";
let classicYearLimit = 5;
function classicPage() {
    const all = cars.filter((car) => car.classic);
    const groups = ["전체", ...new Set(classicCatalog.map((car) => car.brand))];
    const filtered = all.filter(
        (car) =>
            (classicBrand === "전체" || car.brand === classicBrand) &&
            (car.brand + " " + car.name).toLowerCase().includes(classicSearch.toLowerCase()),
    );
    const entries = filtered.flatMap((car) => {
        const sourceId = car.naver.source.match(/car_\d+/)?.[0];
        const previous = ((sourceId && classicHistory[sourceId]) || []).map((row) => ({
            car,
            year: row.year,
            key: row.modelId,
            name: row.name,
            image: row.image,
            price: row.priceDisplay,
        }));
        return [
            {
                car,
                year: car.naver.year,
                key: "current",
                name: car.name,
                image: car.officialImage,
                price: car.naver.range,
            },
            ...previous,
        ].filter((row) => /^\d{4}$/.test(row.year || ""));
    });
    const years = [...new Set(entries.map((row) => row.year))].sort((a, b) => Number(b) - Number(a));
    const yearOption =
        '<label class="classic-year-filter">연식 <select data-classic-year-filter><option value="전체">전체 연식</option>' +
        years
            .map(
                (year) =>
                    '<option value="' +
                    esc(year) +
                    '" ' +
                    (classicYear === year ? "selected" : "") +
                    ">" +
                    esc(year) +
                    "년형</option>",
            )
            .join("") +
        "</select></label>";
    const models = filtered
        .map((car) => {
            const rows = entries.filter((row) => row.car === car);
            const selected =
                classicYear === "전체"
                    ? rows.find((row) => row.key === "current") || rows[0]
                    : rows.find((row) => row.year === classicYear);
            return selected ? { car, rows, selected } : null;
        })
        .filter(Boolean);
    const modelCard = ({ car, rows, selected }) => {
        const available = [...new Set(rows.map((row) => row.year))].sort();
        const yearsLabel =
            available.length > 1
                ? available[0] + "–" + available[available.length - 1] + "년형 자료"
                : (available[0] || "") + "년형 자료";
        const image = selected.image;
        return (
            '<article class="model classic-year-card"><button type="button" class="classic-image-button" data-classic-open="' +
            esc(car.id) +
            '" data-classic-model-year="' +
            esc(selected.key) +
            '" aria-label="' +
            esc(car.name) +
            ' 상세 보기">' +
            (image
                ? '<span class="official-car-image" role="img" aria-label="' +
                  esc(car.name) +
                  '" style="background-image:url(&quot;' +
                  esc(image) +
                  '&quot;)"></span>'
                : '<span class="model-placeholder"><span>' +
                  esc(car.brand) +
                  "</span><strong>" +
                  esc(car.name) +
                  "</strong><small>사진 준비 중</small></span>") +
            '</button><div class="model-body"><span class="eyebrow">' +
            esc(car.brand) +
            "</span><h3>" +
            esc(car.name) +
            "</h3><p>" +
            esc(yearsLabel) +
            '</p><div class="model-actions"><button class="outline" data-classic-open="' +
            esc(car.id) +
            '" data-classic-model-year="' +
            esc(selected.key) +
            '">차량 상세 보기 ↗</button></div></div></article>'
        );
    };
    return (
        '<div class="page classic-page"><div class="breadcrumbs"><a href="#home">홈</a> / 추억의 자동차</div><div class="classic-hero"><div class="eyebrow">THE CARS WE REMEMBER</div><h1>추억의 자동차</h1><p>이제는 생산이 끝난 차종들을 다시 만나보세요.</p></div><div class="notice">차종 자체가 단종된 차량을 모았습니다. 표시된 연도는 보유한 모델 연식이며 단종 연도가 아닙니다. 연식을 선택하면 해당 연식 자료가 있는 차종을 볼 수 있습니다.</div><div class="classic-controls"><div class="classic-brands" role="group" aria-label="브랜드 선택">' +
        groups
            .map(
                (brand) =>
                    '<button type="button" data-classic-brand="' +
                    esc(brand) +
                    '" class="' +
                    (classicBrand === brand ? "active" : "") +
                    '" aria-pressed="' +
                    (classicBrand === brand) +
                    '">' +
                    esc(brand) +
                    "</button>",
            )
            .join("") +
        '</div><form id="classic-search-form" class="classic-search"><input name="query" value="' +
        esc(classicSearch) +
        '" placeholder="브랜드 또는 모델 검색" aria-label="추억의 자동차 검색"><button type="submit">검색</button></form>' +
        yearOption +
        '</div><p class="meta">' +
        models.length +
        "개 차종 · 확인일 2026.11.17</p>" +
        (models.length
            ? '<div class="model-grid">' + models.map(modelCard).join("") + "</div>"
            : '<p class="notice">해당 조건의 차량이 없습니다.</p>') +
        "</div>"
    );
}
function brandChooser() {
    let list =
        brandGroup === "국산"
            ? domesticBrands
            : [
                  "테슬라",
                  "벤츠",
                  "BMW",
                  "볼보",
                  "BYD",
                  ...brands.filter(
                      (b) => !domesticBrands.includes(b) && !["테슬라", "벤츠", "BMW", "볼보", "BYD"].includes(b),
                  ),
              ];
    const limit = brandGroup === "국산" ? 6 : 16;
    const expanded = brandExpanded[brandGroup];
    let visible = expanded ? list : list.slice(0, limit);
    if (brandGroup !== "국산" && !expanded && list.includes(selectedBrand) && !visible.includes(selectedBrand))
        visible = [...visible.slice(0, limit - 1), selectedBrand];
    const toggle =
        list.length > limit
            ? `<button type="button" class="brand-expand" data-brand-expand="1" aria-expanded="${expanded}" aria-controls="brand-list">${expanded ? "브랜드 접기 ↑" : `브랜드 더 보기 <span>+${list.length - visible.length}</span> ↓`}</button>`
            : "";
    return `<section class="brand-picker"><div class="brand-picker-header"><div><div class="eyebrow">브랜드</div><h2>브랜드로 찾기</h2></div><div class="brand-switch">${["국산", "수입"].map((g) => `<button data-group="${g}" class="${brandGroup === g ? "active" : ""}">${g}</button>`).join("")}</div></div>${brandGroup === "수입" ? '<p class="brand-order-note">앞의 5개 브랜드: 2026년 10월 수입 승용차 신규등록 순 · 나머지는 기존 목록 순</p>' : ""}<div class="brand-icons" id="brand-list">${visible.map((b) => `<button data-brand="${b}" class="brand-icon ${selectedBrand === b ? "selected" : ""}">${logoSources[b] ? `<img src="${brandLogoUrl(b)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">` : ""}<span class="logo-fallback" style="display:${logoSources[b] ? "none" : "grid"}">${esc(b.slice(0, 2))}</span><span>${esc(b)}</span></button>`).join("")}</div>${toggle}</section>`;
}
const listMeta = {
    "기아|레이 EV": { price: 2807 },
    "기아|EV3": { price: 3995 },
    "기아|EV4": { price: 4042 },
    "기아|EV5": { price: 4183 },
    "기아|EV6": { price: 4360 },
    "기아|EV9": { price: 6197 },
    "기아|스포티지": { sales: 7708 },
    "현대|그랜저": { sales: 6989 },
    "기아|쏘렌토": { sales: 6784 },
    "현대|디 올 뉴 아반떼": { sales: 5730 },
    "기아|카니발": { sales: 5570 },
};
let sizeFilter = "전체",
    sortMode = "기본순",
    budgetFilter = null;
cars.forEach((c) => Object.assign(c, listMeta[c.brand + "|" + c.name] || {}));
const initial = [
    {
        title: "오래 타도 질리지 않는 차, 여러분의 선택은?",
        category: "자유 이야기",
        author: "기어봉",
        body: "디자인이든 주행감이든, 시간이 지나도 계속 좋아지는 차가 있나요?",
        comments: 24,
    },
    {
        title: "G80 1년 운행하며 느낀 장단점",
        category: "오너 리뷰",
        author: "주말드라이버",
        body: "편안한 승차감과 정숙성이 특히 마음에 듭니다.",
        comments: 18,
    },
    {
        title: "전기차 첫 겨울, 주행거리 체감 어떠셨나요?",
        category: "아이오닉 5",
        author: "충전중",
        body: "첫 겨울을 앞두고 다른 오너분들의 경험이 궁금합니다.",
        comments: 12,
    },
];
let openPost = null;
let posts = JSON.parse(localStorage.getItem("chago-posts") || "null") || initial;
let compare = JSON.parse(localStorage.getItem("chago-compare") || "[]");
let selectedBrand = "전체",
    search = "",
    month = new Date(2026, 10, 1),
    selection = {};
const app = document.querySelector("#app");
const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const save = () => {
    localStorage.setItem("chago-compare", JSON.stringify(compare));
    document.querySelector("#count").textContent = compare.length;
};
function cardImageSources(c) {
    const variants = Object.values(c.variants || {}).filter(Boolean);
    const ids = [...variants, c.naver].map(data => data?.source?.match(/car_\d+/)?.[0]).filter(Boolean);
    const media = ids.map(id => vehicleMedia[id]).filter(Boolean);
    const cleanViews = media.flatMap(item => [item.colors?.[0]?.image, item.frames?.[0]]);
    const photos = media.flatMap(item => item.photos?.slice(0, 3) || []);
    return [...new Set([...cleanViews, c.officialImage, ...photos].filter(Boolean))];
}
function cardImageError(image) {
    const car = cars.find(item => item.id === image.dataset.cardImage);
    const sources = car ? cardImageSources(car) : [];
    const next = Number(image.dataset.imageIndex || 0) + 1;
    if (next < sources.length) { image.dataset.imageIndex = next; image.src = sources[next]; return; }
    image.hidden = true;
    image.nextElementSibling.hidden = false;
}
const carNameTranslations = {
    "Shooting Brake": "슈팅 브레이크",
    "Cross Country": "크로스 컨트리",
    "Grand Cherokee": "그랜드 체로키",
    "Range Rover": "레인지로버",
    "Flying Spur": "플라잉 스퍼",
    "Active Tourer": "액티브 투어러",
    "Gran Coupe": "그란 쿠페",
    "Cybertruck": "사이버트럭",
    "Countryman": "컨트리맨",
    "Convertible": "컨버터블",
    "Discovery": "디스커버리",
    "Defender": "디펜더",
    "Aviator": "에이비에터",
    "Nautilus": "노틸러스",
    "Navigator": "네비게이터",
    "Corsair": "코세어",
    "Cullinan": "컬리넌",
    "Phantom": "팬텀",
    "Spectre": "스펙터",
    "Ghost": "고스트",
    "Bentayga": "벤테이가",
    "Continental": "컨티넨탈",
    "Revuelto": "레부엘토",
    "Temerario": "테메라리오",
    "Urus": "우루스",
    "Eletre": "엘레트라",
    "Emeya": "에메야",
    "Emira": "에미라",
    "GranCabrio": "그란카브리오",
    "GranTurismo": "그란투리스모",
    "Grecale": "그레칼레",
    "Artura": "아투라",
    "Aceman": "에이스맨",
    "Cooper": "쿠퍼",
    "Maybach": "마이바흐",
    "Vantage": "밴키지",
    "Valhalla": "발할라",
    "Vanquish": "뱅퀴시",
    "Grenadier": "그레나디어",
    "Gladiator": "글래디에이터",
    "Wagoneer": "와고니어",
    "Wrangler": "랭글러",
    "Cherokee": "체로키",
    "Celestiq": "셀레스틱",
    "Escalade": "에스컬레이드",
    "Optiq": "옵틱",
    "Vistiq": "비스틱",
    "Roadster": "로드스터",
    "Alphard": "알파드",
    "Crown": "크라운",
    "Highlander": "하이랜더",
    "Prius": "프리우스",
    "Sienna": "시엔나",
    "Amalfi": "아말피",
    "Purosangue": "푸로산구에",
    "Roma": "로마",
    "Bronco": "브롱코",
    "Expedition": "익스페디션",
    "Explorer": "익스플로러",
    "Mustang": "머스탱",
    "Cayenne": "카이엔",
    "Macan": "마칸",
    "Panamera": "파나메라",
    "Taycan": "타이칸",
    "Atlas": "아틀라스",
    "Golf": "골프",
    "Touareg": "투아렉",
    "Polestar": "폴스타",
    "Accord": "어코드",
    "Odyssey": "오디세이",
    "Pilot": "파일럿",
    "Dolphin": "돌핀",
    "SEALION": "실라이언",
    "SEAL": "실",
    "Acadia": "아카디아",
    "Canyon": "캐년",
    "Hummer": "허머",
    "Sierra": "시에라",
    "Model": "모델",
    "Series": "시리즈",
    "Coup?": "쿠페",
    "Coupe": "쿠페",
    "Sedan": "세단",
    "Hatch": "해치백",
    "Sport": "스포트",
    "Spyder": "스파이더",
    "Spider": "스파이더",
    "Class": "클래스",
    "Neolun": "네오룬",
    "Evoque": "이보크",
    "Velar": "벨라",
    "New": "뉴"
};
function displayCarName(name) {
    let result = String(name);
    for (const [english, korean] of Object.entries(carNameTranslations)) {
        result = result.replace(new RegExp("\\b" + english.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + "\\b", "gi"), korean);
    }
    return result;
}

function card(c) {
    const sources = cardImageSources(c);
    const price = Number.isFinite(c.price) && c.price > 0 ? c.price.toLocaleString('ko-KR') + '만 원부터' : '시작가격 확인 중';
    return `<article class="model"><a class="model-image-link" href="#car/${esc(c.id)}" aria-label="${esc(c.brand + " " + c.name)} 상세 정보 보기"><div class="official-car-image card-image">${sources.length ? `<img src="${esc(sources[0])}" alt="${esc(c.brand + " " + c.name)}" data-card-image="${esc(c.id)}" data-image-index="0" onerror="cardImageError(this)" loading="lazy" referrerpolicy="no-referrer">` : ""}<span class="card-image-fallback" ${sources.length ? "hidden" : ""}>${esc(c.brand)} ${esc(c.name)}<small>사진 준비 중</small></span></div></a><div class="model-body"><span class="eyebrow">${esc(c.brand)} / ${esc(c.type)}</span><h3>${esc(displayCarName(c.name))}</h3><p>${price} · 가격표 기준 확인 필요</p><div class="model-actions"><button class="outline" data-car="${c.id}">자세히 보기 ↗</button><button class="outline" data-add="${c.id}">${compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교하기"}</button></div></div></article>`;
}

let slide = 0,
    calendarFilter = "전체",
    selectedDay = null;
const slides = [
    {
        label: "FEATURED MODEL · EDITORIAL",
        title: "The Kia EV3",
        text: "전기차의 새로운 일상을 만나보세요.",
        image: officialImages["EV3"],
        link: "#car/" + cars.find((c) => c.name === "EV3").id,
        cta: "EV3 살펴보기",
    },
    {
        label: "FEATURED MODEL · EDITORIAL",
        title: "The 2027 EV6",
        text: "새로운 이동의 즐거움을 발견하세요.",
        image: officialImages["EV6"],
        link: "#car/" + cars.find((c) => c.name === "EV6").id,
        cta: "EV6 살펴보기",
    },
    {
        label: "FEATURED MODEL · EDITORIAL",
        title: "The Kia EV9",
        text: "더 넓어진 전기 SUV의 가능성.",
        image: officialImages["EV9"],
        link: "#car/" + cars.find((c) => c.name === "EV9").id,
        cta: "EV9 살펴보기",
    },
];

function homeHero() {
    const slides = [
        {
                "eyebrow": "THE WORLD OF AUTOMOBILES",
                "title": "차고에서 만나는<br>자동차의 모든 것.",
                "description": "다양한 브랜드와 모델을 둘러보고,<br>당신에게 꼭 맞는 차를 찾아보세요.",
                "link": "#explore",
                "action": "자동차 둘러보기",
                "image": "hero-mountain-road.png"
        },
        {
                "eyebrow": "COMPARE WITH CONFIDENCE",
                "title": "나에게 맞는 차,<br>한눈에 비교하다.",
                "description": "주요 사양과 가격을 비교하고<br>더 확신 있는 선택을 시작해 보세요.",
                "link": "#compare",
                "action": "차량 비교하기",
                "image": "hero-coastal-road.png"
        },
        {
                "eyebrow": "CARS WE REMEMBER",
                "title": "오래도록 기억될<br>자동차의 이야기.",
                "description": "시대를 대표한 클래식 자동차와<br>그 시절의 이야기를 만나보세요.",
                "link": "#classic",
                "action": "추억의 자동차 보기",
                "image": "temp-hero-0.jpg"
        }
];
    return `<div class="home-hero hero-carousel" data-hero-carousel role="region" aria-roledescription="캐러셀" aria-label="자동차 소개" tabindex="0">${slides.map((slide, i) => `<section class="hero-slide${i === 0 ? ' is-active' : ''}" aria-roledescription="슬라이드" aria-label="${i + 1} / ${slides.length}" aria-hidden="${i !== 0}" ${i ? 'inert' : ''} style="background-image:linear-gradient(90deg, rgba(12,16,18,.72), rgba(12,16,18,.22)), linear-gradient(0deg, rgba(12,16,18,.25), transparent 55%), url('${slide.image}')"><div class="home-hero-copy"><span class="eyebrow">${slide.eyebrow}</span><h1>${slide.title}</h1><p>${slide.description}</p><a href="${slide.link}" class="hero-link">${slide.action} <span aria-hidden="true">→</span></a></div></section>`).join('')}<div class="hero-carousel-controls" aria-label="배너 탐색"><button type="button" class="hero-arrow" data-hero-prev aria-label="이전 슬라이드">←</button><span class="hero-count" data-hero-count>01 / 03</span><button type="button" class="hero-arrow" data-hero-next aria-label="다음 슬라이드">→</button><div class="hero-dots">${slides.map((_, i) => `<button type="button" data-hero-index="${i}" aria-label="${i + 1}번 슬라이드로 이동" ${i === 0 ? 'aria-current="true"' : ''}><span></span></button>`).join('')}</div><button type="button" class="hero-play" data-hero-play aria-label="자동 넘김 제어">Ⅱ</button></div><div class="home-hero-caption" aria-hidden="true">EXPLORE / COMPARE / DISCOVER</div></div>`;
}

function home() {
    let x = slides[slide];
    return `<div class="home-shell"><section class="home-top">${homeHero()}<aside class="quick-panel"><div class="eyebrow">FIND YOUR CAR</div><h2>어떤 차를 찾으세요?</h2><form id="quicksearch"><input name="query" placeholder="브랜드 또는 모델 검색" aria-label="자동차 검색"><button aria-label="검색">↗</button></form><div class="quick-label">빠른 브랜드 탐색</div><div class="quick-brands">${["현대", "기아", "제네시스", "BMW", "벤츠", "아우디"].map((b) => `<button data-brand="${b}">${b}</button>`).join("")}</div><a href="#explore" class="quick-more">전체 브랜드 보기 <span>→</span></a><div class="quick-tools"><a href="#compare">차량 비교 <span>↗</span></a><a href="#calendar">출시 캘린더 <span>↗</span></a></div></aside></section><section class="brand-marquee" aria-label="브랜드 탐색"><div class="brand-marquee-heading"><span>DISCOVER BRANDS</span><strong>좋아하는 브랜드를 만나보세요</strong><a href="#explore">전체 보기 ↗</a></div><div class="brand-marquee-window"><div class="brand-marquee-track">${[0, 1].map(() => `<div class="brand-marquee-group">${["현대", "기아", "제네시스", "BMW", "벤츠", "테슬라", "아우디", "볼보", "포르쉐", "토요타", "렉서스", "폭스바겐", "미니", "랜드로버", "BYD", "폴스타"].map((brand) => `<button type="button" data-brand="${brand}">${logoSources[brand] ? `<img class="brand-marquee-logo" src="${brandLogoUrl(brand)}" alt="" loading="lazy" onerror="this.style.display='none'">` : ""}<span>${esc(brand)}</span></button>`).join("")}</div>`).join("")}</div></div></section><section class="home-content"><div class="home-community"><div class="block-title"><div><span class="eyebrow">COMMUNITY</span><h2>지금, 차고의 이야기</h2></div><a href="#community">전체보기 →</a></div><div class="community-tabs"><span>전체 이야기</span><a href="#community">오너 리뷰</a><a href="#community">차종별 이야기</a></div>${posts
        .slice(0, 4)
        .map(
            (p, i) =>
                `<a href="#community" class="home-post"><span class="post-index">0${i + 1}</span><span><small>${esc(p.category)}</small><strong>${esc(p.title)}</strong><em>${esc(p.author)} · 댓글 ${p.comments}</em></span><span class="post-arrow">↗</span></a>`,
        )
        .join(
            "",
        )}</div><aside class="home-side"><div class="block-title"><div><span class="eyebrow">COMING UP</span><h2>출시 캘린더</h2></div><a href="#calendar">전체보기 →</a></div><p class="side-note">예시 일정 · 실제 출시 정보가 아닙니다</p><a href="#calendar" class="upcoming"><span class="up-date">NOV<strong>18</strong></span><span><small>공개 · 확정 예시</small><b>새로운 전기 SUV 공개</b><em>출시 소식과 이야기 보기 →</em></span></a><a href="#calendar" class="upcoming"><span class="up-date">미정<strong>—</strong></span><span><small>출시 · 예상 예시</small><b>차세대 세단 출시</b><em>예상 일정 살펴보기 →</em></span></a><a href="#community" class="join-banner"><span>차에 대한 모든 이야기</span><strong>당신의 경험을 들려주세요. ↗</strong></a></aside></section><section class="home-models"><div class="block-title"><div><span class="eyebrow">EXPLORE THE CARS</span><h2>자동차 살펴보기</h2></div><a href="#explore">전체 모델 보기 →</a></div><p>인기 모델부터 새로운 관심사까지, 차고에서 만나보세요.</p><div class="model-grid">${["아이오닉 5", "G80", "5시리즈"].map((n) => card(cars.find((c) => c.name === n))).join("")}</div></section></div>`;
}

function explore() {
    let filtered = cars.filter((c) => {
        if (c.classic || c.familyHidden) return false;
        let body =
            bodyFilter === "전체" ||
            (bodyFilter === "기타"
                ? !["세단", "SUV", "트럭", "버스", "특수차"].some((t) => c.type.includes(t))
                : c.type.includes(bodyFilter));
        let fuel =
            fuelFilter === "전체" ||
            (fuelFilter === "전기차"
                ? c.type.includes("전기") || c.hasElectricVariant
                : fuelFilter === "수소"
                  ? c.type.includes("수소")
                  : c.ice === true);
        let size = sizeFilter === "전체" || c.size === sizeFilter;
        let budget = budgetFilter === null || (Number.isFinite(c.price) && c.price >= budgetFilter.min && c.price <= budgetFilter.max);
        return (
            (selectedBrand === "전체" || c.brand === selectedBrand) &&
            body &&
            fuel &&
            size &&
            budget &&
            (c.name + " " + c.brand + " " + c.type + " " + (c.searchAliases || ""))
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    });
    if (sortMode === "기본순") {
        const order = ["경형", "소형", "준중형", "중형", "준대형", "대형"];
        filtered.sort((a, b) => {
            let ai = order.indexOf(a.size),
                bi = order.indexOf(b.size);
            return (ai < 0 ? order.length : ai) - (bi < 0 ? order.length : bi);
        });
    } else {
        let key = sortMode === "인기순" ? "sales" : "price";
        let dir = sortMode === "낮은 가격순" ? 1 : -1;
        filtered.sort((a, b) => {
            let av = a[key],
                bv = b[key];
            if (av == null && bv == null) return 0;
            if (av == null) return 1;
            if (bv == null) return -1;
            return (av - bv) * dir;
        });
    }
    return `<div class="page"><div class="breadcrumbs"><a href="#home">홈</a> / 자동차 탐색 ${selectedBrand === "전체" ? "" : "/ " + esc(selectedBrand)}</div>${brandHeading()}<div class="notice">제조사 및 자동차 정보 사이트의 모델을 모았습니다. 상용차에는 과거 연식도 포함되며, 현재 판매 여부는 별도 확인이 필요합니다.</div>${brandChooser()}<div class="toolbar"><input id="search" placeholder="브랜드, 모델, 차종 검색" value="${esc(search)}"><select id="brand"><option>전체</option>${brands.map((b) => `<option ${selectedBrand === b ? "selected" : ""}>${b}</option>`).join("")}</select></div><div class="filter-row"><b>차체</b>${["전체", "세단", "SUV", "트럭", "버스", "기타"].map((t) => `<button data-body="${t}" class="${bodyFilter === t ? "active" : ""}">${t}</button>`).join("")}</div><div class="filter-row"><b>동력</b>${["전체", "내연기관", "전기차", "수소"].map((t) => `<button data-fuel="${t}" class="${fuelFilter === t ? "active" : ""}">${t}</button>`).join("")}<span>확인된 동력 정보만 필터에 표시</span></div><div class="filter-row"><b>차급</b>${["전체", "경형", "소형", "준중형", "중형", "준대형", "대형"].map((t) => `<button data-size="${t}" class="${sizeFilter === t ? "active" : ""}">${t}</button>`).join("")}<span>차급 확인된 모델만 표시</span></div>${budgetFilter === null ? "" : `<div class="budget-active"><form id="budget-edit-form"><label for="budget-edit-min">차량 예산</label><div class="budget-edit-control"><select id="budget-edit-min" name="min" aria-label="최소 예산">${budgetChoices(budgetFilter.min, true)}</select><span>~</span><select id="budget-edit-max" name="max" aria-label="최대 예산">${budgetChoices(budgetFilter.max, false)}</select><button type="submit">적용</button></div></form><small>확인된 시작가격 기준 · 가격 미확인 차량 제외</small><button type="button" data-clear-budget="1">예산 조건 해제 ×</button></div>`}<div class="list-controls"><p class="meta">등록 모델 ${filtered.length}대</p><div class="sort-buttons">${["기본순", "인기순", "높은 가격순", "낮은 가격순"].map((t) => `<button data-sort="${t}" class="${sortMode === t ? "active" : ""}">${t}</button>`).join("")}</div></div>${sortMode === "기본순" ? '<p class="sort-note">차급이 작은 순서이며, 차급 미확인 모델은 뒤에 표시됩니다.</p>' : `<p class="sort-note">${sortMode === "인기순" ? "2026년 10월 국내 완성차 내수 판매 확인 모델 기준" : "수집된 시작가격 기준 (만원)"} · 정보가 없는 모델은 뒤에 표시됩니다.</p>`}<div class="model-grid">${filtered.map(card).join("")}</div>${filtered.length ? "" : '<p class="notice">해당 조건의 등록 모델이 없습니다. 다른 조건을 선택해 주세요.</p>'}</div>`;
}

function detail(id) {
    const c = cars.find((x) => x.id === id);
    if (!c) return explore();
    if (c.naver || c.variants) return verifiedDetail(c);
    if (c.catalogOnly) return catalogDetail(c);
    let s = selection[id] || { gen: c.gens[0], year: c.years[0], trim: c.trims[0] };
    selection[id] = s;
    return `<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / ${c.brand} / ${c.name}</div><div class="detail-top">${c.officialImage ? `<div class="detail-img" style="background-image:url('${c.officialImage}')"></div>` : `<div class="model-placeholder detail-placeholder"><span>${esc(c.brand)}</span><strong>${esc(c.name)}</strong><small>전면 사진 준비 중</small></div>`}<div><div class="eyebrow">${c.brand} / ${c.type}</div><h1 class="page-title">${c.name}</h1><p class="sub">${c.history}</p><div class="notice">세대·연식·트림 선택은 탐색 프로토타입입니다. 아래 제원은 선택에 따라 바뀌지 않는 예시입니다.</div><p><b>세대</b></p><div class="tabs">${c.gens.map((x) => `<button data-select="gen" data-value="${x}" class="${s.gen === x ? "active" : ""}">${x}</button>`).join("")}</div><p><b>연식</b></p><div class="tabs">${c.years.map((x) => `<button data-select="year" data-value="${x}" class="${s.year === x ? "active" : ""}">${x}</button>`).join("")}</div><p><b>트림</b></p><div class="tabs">${c.trims.map((x) => `<button data-select="trim" data-value="${x}" class="${s.trim === x ? "active" : ""}">${x}</button>`).join("")}</div><button class="dark" data-add="${c.id}">${compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교함에 담기"}</button></div></div><div class="columns" style="margin-top:70px"><div><div class="eyebrow">SPECIFICATIONS</div><h2>주요 제원</h2><table class="specs"><tr><th>동력</th><td>${c.power}</td></tr><tr><th>최고 출력</th><td>${c.output}</td></tr><tr><th>주행거리 / 연비</th><td>${c.range}</td></tr><tr><th>가격</th><td>${c.price}</td></tr></table></div><div><div class="eyebrow">OWNER'S VOICE</div><h2>오너와 이야기</h2><p class="sub">이 모델이 궁금하다면 커뮤니티에서 경험을 나눠보세요.</p><a class="link" href="#community">커뮤니티 가기 ↗</a></div></div></div>`;
}
function catalogDetail(c) {
    return `<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / ${esc(c.brand)} / ${esc(c.name)}</div><div class="detail-top">${c.officialImage ? `<div class="official-car-image detail-placeholder" style="background-image:url('${c.officialImage}')" role="img" aria-label="${esc(c.name)}"></div>` : `<div class="model-placeholder detail-placeholder"><span>${esc(c.brand)}</span><strong>${esc(c.name)}</strong><small>전면 사진 준비 중</small></div>`}<div><div class="eyebrow">${esc(c.brand)} / ${esc(c.type)}</div><h1 class="page-title">${esc(c.name)}</h1><p class="sub">제조사 공식 모델 목록에서 확인한 차량입니다.</p><div class="notice">가격·제원·연식별 트림은 아직 확인 중입니다. 제조사 페이지에서 최신 정보를 확인하세요.</div><a class="dark" target="_blank" rel="noopener noreferrer" href="${c.source}">제조사 공식 모델 보기 ↗</a><button class="outline" data-add="${c.id}">${compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교함에 담기"}</button></div></div>${c.name === "그랜저" ? `<section class="history-section"><div class="eyebrow">MODEL HISTORY</div><h2>세대를 이어온 그랜저</h2><p class="sub">공식 모델 연혁의 출시 연도를 기준으로 정리했습니다.</p><div class="history-grid">${grandeurHistory.map((g, i) => `<div><small>0${i + 1}</small><strong>${g}</strong></div>`).join("")}</div><a class="link" href="https://www.hyundai.com/kr/ko/brand/brandstory/model/grandeur-history" target="_blank" rel="noopener noreferrer">현대자동차 모델 연혁 ↗</a></section>` : ""}<section class="history-section"><h2>이 차의 이야기</h2><p class="sub">궁금한 점이나 오너 경험을 커뮤니티에서 나눠보세요.</p><a class="link" href="#community">커뮤니티 가기 ↗</a></section></div>`;
}
function comparison() {
    let cs = compare.map((id) => cars.find((c) => c.id === id)).filter(Boolean);
    return `<div class="page"><div class="breadcrumbs">홈 / 비교함</div><div class="eyebrow">SIDE BY SIDE</div><h1 class="page-title">자동차 비교</h1><p class="sub">관심 있는 차량을 최대 3대까지 나란히 비교해 보세요.</p><div class="notice">제원이 확인된 모델은 네이버 자동차 확인 기준이며, 미확인 항목은 준비 중으로 표시합니다.</div>${
        cs.length
            ? `<div class="compare-table"><table><tr><th>모델</th>${cs.map((c) => `<td><b>${c.brand} ${c.name}</b><br><button class="outline" data-add="${c.id}">삭제</button></td>`).join("")}</tr>${[
                  ["차종", "type"],
                  ["동력", "power"],
                  ["최고 출력", "output"],
                  ["주행거리 / 연비", "range"],
                  ["가격", "priceDisplay"],
              ]
                  .map(
                      ([label, key]) =>
                          `<tr><th>${label}</th>${cs.map((c) => `<td>${c[key] || "정보 준비 중"}</td>`).join("")}</tr>`,
                  )
                  .join("")}</table></div>`
            : "<p>아직 담은 차량이 없습니다.</p>"
    }<a href="#explore" class="dark">차량 더 둘러보기 ↗</a></div>`;
}
function calendar() {
    let y = month.getFullYear(),
        m = month.getMonth(),
        first = new Date(y, m, 1).getDay(),
        days = new Date(y, m + 1, 0).getDate();
    let events =
        y === 2026 && m === 10
            ? [
                  { day: 18, title: "새로운 전기 SUV 공개", status: "확정", type: "공개" },
                  { day: null, title: "차세대 세단 출시", status: "예상", type: "출시" },
              ]
            : y === 2026 && m === 11
              ? [{ day: null, title: "스포츠카 부분변경 공개", status: "예상", type: "공개" }]
              : [];
    let visible = events.filter(
        (e) =>
            (calendarFilter === "전체" || e.status === calendarFilter) &&
            (selectedDay === null || e.day === selectedDay),
    );
    return `<div class="page calendar-page"><div class="breadcrumbs">홈 / 출시 캘린더</div><div class="eyebrow">WHAT'S NEXT</div><h1 class="page-title">신차 출시 캘린더</h1><p class="sub">관심 있는 신차의 공개와 출시 소식을 살펴보세요.</p><div class="notice">일정은 기능 시연을 위한 가상 데이터입니다. 실제 출시 정보가 아닙니다.</div><div class="calendar-layout"><div><div class="calendar-heading"><div class="calendar-top"><button class="outline" data-month="-1" aria-label="이전 달">←</button><div class="month-selects"><select id="calendar-year" aria-label="연도 선택">${Array.from(
        { length: 21 },
        (_, i) => 2020 + i,
    )
        .map((n) => `<option value="${n}" ${n === y ? "selected" : ""}>${n}년</option>`)
        .join("")}</select><select id="calendar-month" aria-label="월 선택">${Array.from({ length: 12 }, (_, i) => i)
        .map((n) => `<option value="${n}" ${n === m ? "selected" : ""}>${n + 1}월</option>`)
        .join(
            "",
        )}</select></div><button class="outline" data-month="1" aria-label="다음 달">→</button></div><button class="calendar-reset" data-day="all">이번 달 전체 보기</button></div><div class="calendar">${["일", "월", "화", "수", "목", "금", "토"].map((d) => `<div class="day head">${d}</div>`).join("")}${Array(first).fill('<div class="day blank"></div>').join("")}${Array.from(
        { length: days },
        (_, i) => {
            let d = i + 1,
                e = events.find((e) => e.day === d);
            return `<button class="day day-button ${selectedDay === d ? "selected" : ""}" data-day="${d}"><span>${d}</span>${e ? `<span class="event">${e.title}</span>` : ""}</button>`;
        },
    ).join(
        "",
    )}</div></div><aside class="calendar-agenda"><div class="agenda-heading"><div><span class="eyebrow">SCHEDULE</span><h2>${selectedDay ? m + 1 + "월 " + selectedDay + "일" : m + 1 + "월 일정"}</h2></div><span>${visible.length}건</span></div><div class="agenda-filters">${["전체", "확정", "예상"].map((f) => `<button data-filter="${f}" class="${calendarFilter === f ? "active" : ""}">${f}</button>`).join("")}</div>${visible.length ? visible.map((e) => `<article class="agenda-item"><span class="badge ${e.status === "확정" ? "confirmed" : ""}">${e.status} 예시</span><span class="meta">${e.day ? m + 1 + "월 " + e.day + "일" : "날짜 미정"} · ${e.type}</span><h3>${e.title}</h3><a href="#community">커뮤니티에서 이야기하기 ↗</a></article>`).join("") : '<p class="agenda-empty">선택한 조건에 일정이 없습니다.</p>'}<p class="agenda-note">예상 일정은 날짜가 확정되지 않아 목록에 따로 표시합니다.</p></aside></div></div>`;
}

function budgetChoices(selected, allowZero) {
    const values = [0,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,12000,15000,20000,30000,50000,100000,1000000];
    return values.filter(value => allowZero || value > 0).map(value => '<option value="' + value + '" ' + (value === selected ? 'selected' : '') + '>' + (value === 1000000 ? '100억' : value >= 10000 && value % 10000 === 0 ? (value / 10000) + '억' : value.toLocaleString() + '만') + '원</option>').join('');
}
let communityTab = "전체 이야기";
function community() {
    return `<div class="page community-page"><div class="breadcrumbs">홈 / 커뮤니티</div><div class="community-heading"><div><div class="eyebrow">THE CAR COMMUNITY</div><h1 class="page-title">차를 좋아하는 사람들의 이야기</h1><p class="sub">오너의 경험부터 사소한 궁금증까지, 편하게 이야기해 보세요.</p></div><button class="dark" data-write="1">글쓰기 ＋</button></div><div class="notice">이 프로토타입의 글과 댓글은 현재 브라우저에만 저장됩니다.</div><div class="community-layout"><div><div class="community-tabs" role="group" aria-label="커뮤니티 분류">${["전체 이야기", "오너 리뷰", "차종별 이야기"].map(tab => `<button type="button" data-community-tab="${tab}" class="${communityTab === tab ? "active" : ""}" aria-pressed="${communityTab === tab}">${tab}</button>`).join("")}</div>${posts.map((p, i) => (communityTab === "전체 이야기" || (communityTab === "오너 리뷰" ? p.category === "오너 리뷰" : p.category !== "오너 리뷰" && p.category !== "자유 이야기")) ? `<article class="community-post"><button class="post-open" data-post="${i}"><span class="tag">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p><span class="meta">${esc(p.author)}　·　댓글 ${(p.replies || []).length}　·　공감 ${p.likes || 0}</span></button>${openPost === i ? `<div class="post-expanded"><button class="outline" data-like="${i}">♡ 공감 ${p.likes || 0}</button><h4>댓글 ${(p.replies || []).length}</h4>${(p.replies || []).map((r) => `<p class="reply"><b>${esc(r.author)}</b>　${esc(r.body)}</p>`).join("")}<form class="reply-form" data-reply="${i}"><input name="author" placeholder="닉네임" maxlength="20" required><input name="body" placeholder="댓글을 남겨주세요" maxlength="300" required><button>등록</button></form></div>` : ""}</article>` : "").join("") || '<p class="community-empty">해당 분류에 이야기가 아직 없습니다.</p>'}</div><aside id="write"><div class="write-panel"><div class="eyebrow">SHARE YOUR STORY</div><h2>이야기 남기기</h2><p class="sub">당신의 경험을 들려주세요.</p><form class="form" id="postform"><select name="category"><option>자유 이야기</option><option>오너 리뷰</option>${cars.map((c) => `<option>${esc(c.name)}</option>`).join("")}</select><input name="author" placeholder="닉네임" required maxlength="20"><input name="title" placeholder="제목" required maxlength="80"><textarea name="body" placeholder="어떤 이야기를 나누고 싶으신가요?" required maxlength="1000"></textarea><button class="dark">게시글 등록</button></form></div></aside></div></div>`;
}

function render() {
    const previousScroll = window.scrollY;
    let [route, id] = location.hash.slice(1).split("/");
    app.innerHTML =
        route === "classic"
            ? classicPage()
            : route === "estimate" && typeof estimate === "function"
              ? estimate(id)
              : route === "explore"
                ? explore()
                : route === "car"
                  ? detail(id)
                  : route === "compare"
                    ? comparison()
                    : route === "calendar"
                      ? calendar()
                      : route === "community"
                        ? community()
                        : home();
    save();
    window.scrollTo(0, previousScroll);
}
document.addEventListener('click', event => {
    const tab = event.target.closest('[data-community-tab]');
    if (!tab) return;
    communityTab = tab.dataset.communityTab;
    openPost = null;
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
});
document.addEventListener("click", (e) => {
    let b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.brandExpand) {
        brandExpanded[brandGroup] = !brandExpanded[brandGroup];
        const y = window.scrollY;
        render();
        window.scrollTo(0, y);
        document.querySelector("[data-brand-expand]")?.focus({ preventScroll: true });
        return;
    }
    if (b.dataset.write) {
        document.querySelector("#write")?.scrollIntoView({ behavior: "smooth" });
        return;
    }
    if (b.dataset.post !== undefined) {
        let n = Number(b.dataset.post);
        openPost = openPost === n ? null : n;
        render();
    }
    if (b.dataset.like !== undefined) {
        let post = posts[Number(b.dataset.like)];
        post.likes = (post.likes || 0) + 1;
        localStorage.setItem("chago-posts", JSON.stringify(posts));
        render();
    }
    if (b.dataset.group) {
        brandGroup = b.dataset.group;
        render();
    }
    if (b.dataset.clearBudget) {
        budgetFilter = null;
        render();
    }
    if (b.dataset.size) {
        sizeFilter = b.dataset.size;
        render();
    }
    if (b.dataset.sort) {
        sortMode = b.dataset.sort;
        render();
    }
    if (b.dataset.body) {
        bodyFilter = b.dataset.body;
        render();
    }
    if (b.dataset.fuel) {
        fuelFilter = b.dataset.fuel;
        render();
    }
    if (b.dataset.slide) {
        slide = (slide + (b.dataset.slide === "next" ? 1 : 2)) % 3;
        render();
    }
    if (b.dataset.day) {
        selectedDay = b.dataset.day === "all" ? null : Number(b.dataset.day);
        render();
    }
    if (b.dataset.filter) {
        calendarFilter = b.dataset.filter;
        render();
    }
    if (b.dataset.go) location.hash = b.dataset.go;
    if (b.dataset.brand) {
        selectedBrand = b.dataset.brand;
        budgetFilter = null;
        brandGroup = domesticBrands.includes(selectedBrand) ? "국산" : "수입";
        search = "";
        bodyFilter = "전체";
        fuelFilter = "전체";
        if (location.hash === "#explore") render();
        else location.hash = "explore";
    }
    if (b.dataset.car) location.hash = "car/" + b.dataset.car;
    if (b.dataset.add) {
        const y = window.scrollY;
        let id = b.dataset.add;
        if (compare.includes(id)) compare = compare.filter((x) => x !== id);
        else if (compare.length < 3) compare.push(id);
        else return alert("차량은 최대 3대까지 비교할 수 있습니다.");
        render();
        window.scrollTo(0, y);
    }
    if (b.dataset.select) {
        let id = location.hash.split("/")[1];
        selection[id][b.dataset.select] = b.dataset.value;
        render();
    }
    if (b.dataset.month) {
        month = new Date(month.getFullYear(), month.getMonth() + Number(b.dataset.month), 1);
        selectedDay = null;
        render();
    }
});
document.addEventListener("change", (e) => {
    if (["budget-min", "budget-max", "budget-edit-min", "budget-edit-max"].includes(e.target.id)) {
        e.target.form?.elements.max?.setCustomValidity('');
    }
    if (e.target.id === "calendar-year" || e.target.id === "calendar-month") {
        let y = Number(document.querySelector("#calendar-year").value),
            m = Number(document.querySelector("#calendar-month").value);
        month = new Date(y, m, 1);
        selectedDay = null;
        const previousScroll = window.scrollY;
        const fieldId = e.target.id;
        render();
        window.scrollTo(0, previousScroll);
        document.getElementById(fieldId)?.focus({preventScroll:true});
        return;
    }
    if (e.target.id === "brand") {
        selectedBrand = e.target.value;
        budgetFilter = null;
        render();
    }
});
document.addEventListener("input", (e) => {
    if (e.target.id === "search") {
        search = e.target.value;
        let pos = e.target.selectionStart;
        render();
        let el = document.querySelector("#search");
        el.focus();
        el.setSelectionRange(pos, pos);
    }
});
document.addEventListener("submit", (e) => {
    if (e.target.dataset.reply !== undefined) {
        e.preventDefault();
        let f = new FormData(e.target),
            post = posts[Number(e.target.dataset.reply)];
        post.replies = post.replies || [];
        post.replies.push({ author: f.get("author"), body: f.get("body") });
        localStorage.setItem("chago-posts", JSON.stringify(posts));
        render();
        return;
    }
    if (e.target.id === "budget-edit-form") {
        e.preventDefault();
        const minInput = e.target.elements.min, maxInput = e.target.elements.max;
        const min = Number(minInput.value.replace(/,/g, '')), max = Number(maxInput.value.replace(/,/g, ''));
        if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min < 0 || max <= 0 || max > 1000000 || min > max) {
            maxInput.setCustomValidity('최소보다 큰 최대 예산을 입력해 주세요.'); maxInput.reportValidity(); return;
        }
        budgetFilter = {min, max};
        const y = window.scrollY; render(); window.scrollTo(0, y);
        document.querySelector('#budget-edit-min')?.focus({preventScroll:true}); return;
    }
    if (e.target.id === "budget-form") {
        e.preventDefault();
        const minInput = e.target.elements.min, maxInput = e.target.elements.max;
        const min = Number(minInput.value.replace(/,/g, '')), max = Number(maxInput.value.replace(/,/g, ''));
        if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min < 0 || max <= 0 || max > 1000000 || min > max) {
            maxInput.setCustomValidity('최소보다 큰 최대 예산을 입력해 주세요.'); maxInput.reportValidity(); return;
        }
        budgetFilter = {min, max};
        selectedBrand = "전체";
        search = "";
        bodyFilter = "전체";
        fuelFilter = "전체";
        sizeFilter = "전체";
        sortMode = "낮은 가격순";
        if (location.hash === "#explore") render();
        else location.hash = "explore";
        return;
    }
    if (e.target.id === "quicksearch") {
        e.preventDefault();
        search = new FormData(e.target).get("query").trim();
        selectedBrand = "전체";
        location.hash = "explore";
        return;
    }
    if (e.target.id === "postform") {
        e.preventDefault();
        let f = new FormData(e.target);
        posts.unshift({
            category: f.get("category"),
            author: f.get("author"),
            title: f.get("title"),
            body: f.get("body"),
            comments: 0,
        });
        localStorage.setItem("chago-posts", JSON.stringify(posts));
        render();
    }
});
function setMobileMenu(open, restoreFocus = false) {
    const button = document.querySelector('[data-menu-toggle]');
    const navigation = document.querySelector('#main-navigation');
    if (!button || !navigation) return;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    navigation.classList.toggle('menu-open', open);
    if (restoreFocus) button.focus();
}
document.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-menu-toggle]');
    if (toggle) {
        setMobileMenu(toggle.getAttribute('aria-expanded') !== 'true');
        return;
    }
    if (event.target.closest('#main-navigation a')) setMobileMenu(false);
    else if (!event.target.closest('header')) setMobileMenu(false);
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.querySelector('[data-menu-toggle]')?.getAttribute('aria-expanded') === 'true') setMobileMenu(false, true);
});
window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
render();
// Reveal the lower sections as they enter the viewport; keep content visible without JS.
const revealObserver = typeof IntersectionObserver === 'function' ? new IntersectionObserver(
    (entries, observer) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    }),
    { threshold: 0.06, rootMargin: '0px 0px -35px 0px' },
) : null;
function observeSections() {
    if (!revealObserver || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    document.querySelectorAll(".home-content,.home-models,.brand-picker,.detail-top,.history-section,.options-section,.change-outlook,.rich-details,.estimate-section,.classic-hero").forEach((el) => {
        if (el.classList.contains('reveal')) return;
        el.classList.add("reveal");
        revealObserver.observe(el);
    });
}
window.addEventListener("hashchange", observeSections);
observeSections();
const monthlyBest = [
    ["기아", "스포티지", 7708],
    ["현대", "그랜저", 6989],
    ["기아", "쏘렌토", 6784],
    ["현대", "디 올 뉴 아반떼", 5730],
    ["기아", "카니발", 5570],
];
const baseHome = home;
home = function () {
    let h = baseHome();
    let a = h.indexOf('<section class="home-models">'),
        b = h.indexOf("</section></div>", a);
    if (a < 0 || b < 0) return h;
    let rows = monthlyBest
        .map((v, i) => {
            let c = cars.find((x) => x.brand === v[0] && x.name === v[1]);
            return (
                '<button class="ranking-item" data-car="' +
                c.id +
                '"><span class="rank-num">0' +
                (i + 1) +
                '</span><span class="rank-model"><small>' +
                v[0] +
                "</small><strong>" +
                v[1] +
                '</strong></span><span class="rank-count">' +
                v[2].toLocaleString() +
                "대</span><span>↗</span></button>"
            );
        })
        .join("");
    let section =
        '<section class="home-models monthly-section"><div class="block-title"><div><span class="eyebrow">MONTHLY BEST</span><h2>이번 달 사람들이 선택한 차</h2></div><a href="#explore">자동차 전체보기 →</a></div><p>2026년 10월 · 국내 완성차 5개사 내수 판매 기준</p><div class="ranking-list">' +
        rows +
        '</div><p class="rank-source">국내 완성차 5개사 발표 기준이며 수입차는 포함되지 않습니다. 도매 판매와 신규 등록은 집계 기준이 다를 수 있습니다. 자동 갱신되지 않습니다. <a href="https://chatok24.com/october-2026-korea-car-sales-numbers/" target="_blank" rel="noopener noreferrer">집계 출처 ↗</a></p></section>';
    return h.slice(0, a) + section + h.slice(b + 10);
};
const sizeClass = {
    모닝: "경형",
    레이: "경형",
    "레이 EV": "경형",
    "디 올 뉴 아반떼": "준중형",
    "아반떼 N": "준중형",
    "쏘나타 디 엣지": "중형",
    그랜저: "준대형",
    K5: "중형",
    K8: "준대형",
    K9: "대형",
    셀토스: "소형",
    스포티지: "준중형",
    쏘렌토: "중형",
    카니발: "대형",
    EV3: "소형",
    EV4: "준중형",
    EV5: "준중형",
    EV6: "중형",
    EV9: "대형",
    G80: "준대형",
    G90: "대형",
};
cars.forEach((c) => {
    if (sizeClass[c.name] && !c.type.startsWith(sizeClass[c.name])) c.type = sizeClass[c.name] + " · " + c.type;
    c.size = sizeClass[c.name] || null;
});
render();
observeSections();
const extraPhotos = {
    쏘렌토: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/sorento/27my/sorento_feature_bg_pc.jpg",
    카니발: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/carnival/27my/content/the_kia_carnival_feature_bg_pc.jpg",
    K5: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/k5/24pe/k5_feature_bg_pc.jpg",
    EV4: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev4/25my/content/the-kia-ev4_feature_bg_pc.jpg",
};
cars.forEach((c) => {
    if (c.brand === "기아" && extraPhotos[c.name]) c.officialImage = extraPhotos[c.name];
});
render();
observeSections();
let bestTab = "국산";
const importedBest = [
    ["테슬라", "Model Y", "Model Y Premium", 5501],
    ["벤츠", "E-클래스", "E 200", 2836],
    ["테슬라", "Model 3", "Model 3", 2199],
];
const previousHome = home;
home = function () {
    let h = previousHome(),
        a = h.indexOf('<section class="home-models monthly-section">'),
        b = h.indexOf("</section></div>", a);
    if (a < 0 || b < 0) return h;
    let tabs = ["국산", "수입", "통합"]
        .map((t) => '<button data-best="' + t + '" class="' + (bestTab === t ? "active" : "") + '">' + t + "</button>")
        .join("");
    let rows = "";
    if (bestTab === "통합") {
        const combined = [["현대","그랜저",7471],["기아","스포티지",7139],["기아","쏘렌토",7010],["테슬라","Model Y",5512],["기아","카니발",5270],["현대","아반떼",4933],["기아","셀토스",4878],["기아","레이",4620],["현대","팰리세이드",3762],["벤츠","E-클래스",3693]];
        rows = combined.map(([brand, name, count], index) => {
            const normalize = text => text.toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
            const aliases = { '현대|아반떼': '디 올 뉴 아반떼' };
            const lookup = aliases[brand + '|' + name] || name;
            const car = cars.find(item => item.brand === brand && normalize(item.name) === normalize(lookup));
            const photo = car?.officialImage ? '<span class="ranking-photo" style="background-image:url(&quot;' + esc(car.officialImage) + '&quot;)"></span>' : '<span class="ranking-photo empty">사진 준비 중</span>';
            const inner = '<span class="rank-num">' + String(index + 1).padStart(2,'0') + '</span>' + photo + '<span class="rank-model"><small>' + esc(brand) + '</small><strong>' + esc(name) + '</strong></span><span class="rank-count">' + count.toLocaleString() + '대</span><span>' + (car ? '↗' : '') + '</span>';
            return car ? '<button class="ranking-item" data-car="' + esc(car.id) + '">' + inner + '</button>' : '<div class="ranking-item">' + inner + '</div>';
        }).join('');
    } else {
        let data = bestTab === "국산" ? monthlyBest.map((v) => [v[0], v[1], v[1], v[2]]) : importedBest;
        rows = data
            .map((v, i) => {
                let c = cars.find((x) => x.brand === v[0] && x.name === v[1]);
                let logo = logoSources[v[0]]
                    ? '<img src="' + brandLogoUrl(v[0]) + '" alt="" onerror="this.style.display=\'none\'">'
                    : "";
                let photo =
                    c && c.officialImage
                        ? '<span class="ranking-photo" style="background-image:url(\'' +
                          c.officialImage +
                          "')\"></span>"
                        : '<span class="ranking-photo empty">전면 사진 준비 중</span>';
                return (
                    '<button class="ranking-item" data-car="' +
                    c.id +
                    '"><span class="rank-num">0' +
                    (i + 1) +
                    "</span>" +
                    photo +
                    '<span class="rank-model"><small>' +
                    logo +
                    v[0] +
                    "</small><strong>" +
                    v[2] +
                    '</strong></span><span class="rank-count">' +
                    v[3].toLocaleString() +
                    "대</span><span>↗</span></button>"
                );
            })
            .join("");
    }
    let desc =
        bestTab === "국산"
            ? "국내 완성차 5개사 내수 판매 · 수입차 제외"
            : bestTab === "수입"
              ? "KAIDA 회원사 수입 승용차 신규등록 · 세부 모델 기준"
              : "승용차 신규등록 기준 · 국산과 DataFact가 게재한 18개 수입 브랜드 비교";
    let source =
        bestTab === "통합" ? "https://datafact.org/release/2026-10" : bestTab === "수입"
            ? "https://stock.thinkpool.com/news/newsFlash/read/newsFlash.do?ct=&keyword=%EC%A0%84%EA%B8%B0%EC%B0%A8&pageNo=1&sn=16967231"
            : "https://chatok24.com/october-2026-korea-car-sales-numbers/";
    let section =
        '<section class="home-models monthly-section"><div class="block-title"><div><span class="eyebrow">MONTHLY BEST</span><h2>이번 달 사람들이 선택한 차</h2></div><a href="#explore">자동차 전체보기 →</a></div><p>2026년 10월 · ' +
        desc +
        '</p><div class="best-tabs">' +
        tabs +
        '</div><div class="ranking-list">' +
        rows +
        '</div><p class="rank-source">집계 방식에 따라 판매와 등록 대수는 차이가 있습니다. 자료는 자동 갱신되지 않습니다. <a href="' +
        source +
        '" target="_blank" rel="noopener noreferrer">집계 출처 ↗</a></p></section>';
    return h.slice(0, a) + section + h.slice(b + 10);
};
document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-best]");
    if (b) {
        bestTab = b.dataset.best;
        const y = window.scrollY;
        render();
        observeSections();
        window.scrollTo(0, y);
    }
});
render();
observeSections();
const morePhotos = {
    모닝: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/morning/my/morning_feature_pc_bg.jpg",
    레이: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ray/27my/kv_ray_feature_bg_pc.jpg",
    K8: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/k8/25pe/the_new_k8_feature_bg_pc.jpg",
    EV5: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev5/26my/the_kia_ev5_feature_bg_pc.jpg",
};
cars.forEach((c) => {
    if (c.brand === "기아" && morePhotos[c.name]) c.officialImage = morePhotos[c.name];
});
render();
observeSections();
const homeBeforeBudget = home;
home = function () {
    const h = homeBeforeBudget(),
        marker = '<section class="home-content">',
        at = h.indexOf(marker);
    if (at < 0) return h;
    const panel =
        '<section class="budget-wrap"><div class="budget-box"><div><span class="eyebrow">FIND YOUR CAR</span><h2>예산에 맞는 차 찾기</h2><p>생각하고 있는 차량 가격을 입력해 보세요.</p></div><form id="budget-form"><label for="budget-min">차량 예산 범위</label><div class="budget-range"><select id="budget-min" name="min" aria-label="최소 예산">' + budgetChoices(0, true) + '</select><span>~</span><select id="budget-max" name="max" aria-label="최대 예산">' + budgetChoices(5000, false) + '</select><button type="submit">차량 찾기 ↗</button></div><small>확인된 신차 시작가격 기준 · 가격 미확인 차량 제외 · 세금 및 옵션 별도</small></form></div></section>';
    return h.slice(0, at) + panel + h.slice(at);
};
render();
observeSections();
// Use only manufacturer images explicitly labelled as showing the vehicle front.
const frontPhotos = {
    EV3: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev3/24my/content/ev3_exterior_front_pc.jpg",
    EV4: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev4/25my/content/ev4_exterior_front_pc.jpg",
    EV9: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/ev9/24my/content/ev9_exterior_lighting_grill_pc.jpg",
    스포티지: "https://www.kia.com/content/dam/kwp/kr/ko/vehicles/sportage/pe/content/sportage_exterior_cover_pc.jpg",
};
cars.forEach((c) => {
    c.officialImage = c.brand === "기아" ? frontPhotos[c.name] || null : null;
});
slides[0].image = frontPhotos["EV3"];
slides[1].image = frontPhotos["EV4"];
slides[1].title = "The Kia EV4";
slides[1].text = "새로운 전기 세단을 만나보세요.";
slides[1].cta = "EV4 살펴보기";
slides[1].link = "#car/" + cars.find((c) => c.name === "EV4").id;
slides[2].image = frontPhotos["EV9"];
render();
observeSections();
document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#explore"]');
    if (!link) return;
    selectedBrand = "전체";
    search = "";
    bodyFilter = "전체";
    fuelFilter = "전체";
    sizeFilter = "전체";
    budgetFilter = null;
    sortMode = "기본순";
    if (location.hash === "#explore") {
        e.preventDefault();
        render();
    }
});
const hyundaiFront = {
    "아이오닉 5":
        "https://www.hyundai.com/content/dam/hyundai/au/en/models/ioniq5/images/2023/exterior/Hyundai_IONIQ5-EPIQ_Exterior_Front_830x400.png",
    그랜저: "https://www.hyundaimotorgroup.com/image/upload/asset_library/MDA00000000000037632/c704a4114e2847abbfedb3fed355319f.jpg",
};
cars.forEach((c) => {
    if (c.brand === "현대" && hyundaiFront[c.name]) c.officialImage = hyundaiFront[c.name];
});
render();
observeSections();
// Keep only current-generation manufacturer photographs where confirmed.
cars.forEach((c) => {
    if (c.brand === "현대" && c.name === "그랜저") c.officialImage = null;
    if (c.brand === "현대" && c.name === "싼타페")
        c.officialImage =
            "https://www.hyundai.com/content/dam/hyundai/id/id/images/find-a-car/360vr/all-new-sf-calligraphy-h/lhd/ex/sf-20h-alloy/sf-hev-c-cwp/sf-hev-c-cwp_0.png";
});
render();
observeSections();
const naverSpecs = {
    "현대|그랜저": {
        year: "2027",
        price: 4245,
        range: "4,245~5,866만 원",
        fuel: "가솔린 · LPG",
        efficiency: "복합 7.4~11.6 km/L",
        output: "198~300 hp",
        displacement: "2,497~3,470 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_171091",
        frames: naverImages.grandeur,
    },
    "현대|싼타페": {
        year: "2026",
        price: 3657,
        range: "3,657~4,770만 원",
        fuel: "가솔린",
        efficiency: "복합 9.7~11.0 km/L",
        output: "281 hp",
        displacement: "2,497 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_167089",
        frames: naverImages.santafe,
    },
    "현대|디 올 뉴 아반떼": {
        year: "2027",
        price: 2398,
        range: "2,398~3,307만 원",
        fuel: "가솔린",
        efficiency: "복합 13.4~14.3 km/L",
        output: "149 hp",
        displacement: "1,999 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_171409",
    },
    "기아|스포티지": {
        year: "2027",
        price: 2944,
        range: "2,944~3,845만 원",
        fuel: "가솔린 · LPG",
        efficiency: "복합 8.6~12.3 km/L",
        output: "146~180 hp",
        displacement: "1,598~1,999 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_172099",
    },
    "기아|EV3": {
        year: "2026",
        price: 3995,
        range: "3,995~5,122만 원",
        fuel: "전기",
        efficiency: "복합 4.8~5.4 km/kWh",
        output: "150~195 kW",
        driving: "347~501 km",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_170301",
        frames: naverImages.ev3,
    },
};
Object.assign(naverSpecs, {
    "기아|K5": {
        year: "2027",
        price: 2763,
        range: "2,763~3,637만 원",
        fuel: "가솔린 · LPG",
        efficiency: "복합 9.5~13.7 km/L",
        output: "146~180 hp",
        displacement: "1,598~1,999 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_171465",
    },
    "제네시스|G80": {
        year: "2026",
        price: 6063,
        range: "6,063~8,790만 원",
        fuel: "가솔린",
        efficiency: "복합 8.2~10.5 km/L",
        output: "304~380 hp",
        displacement: "2,497~3,470 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_169805",
    },
});
Object.values(naverImages).forEach((a) => a.forEach((v, i) => (a[i] = v.replace(/[.:,;]+$/, ""))));
cars.forEach((c) => {
    const d = naverSpecs[c.brand + "|" + c.name];
    if (!d) return;
    c.naver = d;
    c.price = d.price;
    if (c.name === "그랜저") {
        c.officialImage = d.frames[9];
        c.imageSource = "네이버 자동차 · 하이브리드 외관";
    }
});
let spinFrame = 9;
function verifiedDetail(c) {
    const d = c.naver;
    let image = d.frames
        ? '<div class="spin-view"><img id="spin-image" src="' +
          d.frames[spinFrame] +
          '" alt="' +
          esc(c.name) +
          ' 360도 회전 이미지"><div class="spin-controls"><button data-spin="-1" aria-label="왼쪽으로 회전">←</button><span>360° · ' +
          (spinFrame + 1) +
          " / " +
          d.frames.length +
          '</span><button data-spin="1" aria-label="오른쪽으로 회전">→</button></div><small>이미지를 누른 채 좌우로 움직여 보세요. 트림·동력에 따라 외관이 다를 수 있습니다.</small><div class="color-status"><b>외장 색상</b><span>기본 이미지 1종</span><small>다른 색상은 원문에서 확인하세요</small></div></div>'
        : c.officialImage
          ? '<div class="detail-img" style="background-image:url(\'' + c.officialImage + "')\"></div>"
          : '<div class="model-placeholder detail-placeholder"><span>' +
            esc(c.brand) +
            "</span><strong>" +
            esc(c.name) +
            "</strong><small>전면 사진 준비 중</small></div>";
    let rows = [
        ["연식", d.year + "년형"],
        ["가격", d.range],
        ["연료", d.fuel],
        ["복합 연비 / 전비", d.efficiency],
        ["출력", d.output],
        ...(d.driving ? [["주행거리", d.driving]] : []),
        ...(d.displacement ? [["배기량", d.displacement]] : []),
        ["정원", d.seats],
    ];
    return (
        '<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / ' +
        esc(c.brand) +
        " / " +
        esc(c.name) +
        '</div><div class="detail-top">' +
        image +
        '<div><div class="eyebrow">' +
        esc(c.brand) +
        " / " +
        esc(c.type) +
        '</div><h1 class="page-title">' +
        esc(c.name) +
        '</h1><p class="sub">' +
        d.year +
        "년형 · " +
        d.range +
        '</p><div class="notice">' +
        (d.source.includes("danawa.com") ? "다나와 자동차" : "네이버 자동차") +
        '에 표시된 모델별 범위입니다. 트림·동력별 사양과 실제 가격은 다를 수 있습니다. 확인일 2026.11.13</div><a class="link" href="' +
        d.source +
        '" target="_blank" rel="noopener noreferrer">' +
        (d.source.includes("danawa.com") ? "다나와 자동차" : "네이버 자동차") +
        ' 원문 보기 ↗</a><br><button class="dark" data-add="' +
        c.id +
        '">' +
        (compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교함에 담기") +
        '</button></div></div><section class="history-section"><div class="eyebrow">SPECIFICATIONS</div><h2>주요 제원</h2><table class="specs">' +
        rows.map(([k, v]) => "<tr><th>" + k + "</th><td>" + esc(v) + "</td></tr>").join("") +
        '</table><p class="meta">상기 정보는 선택 사양과 트림에 따라 달라질 수 있습니다.</p></section><section class="history-section"><h2>이 차의 이야기</h2><a class="link" href="#community">커뮤니티 가기 ↗</a></section></div>'
    );
}
document.addEventListener("click", (e) => {
    let b = e.target.closest("[data-spin]");
    if (!b) return;
    let c = cars.find((x) => x.id === location.hash.split("/")[1]);
    const frames = selectedSpinFrames(c);
    if (!frames) return;
    spinFrame = (spinFrame + Number(b.dataset.spin) + frames.length) % frames.length;
    const image = document.querySelector("#spin-image");
    if (image) image.src = frames[spinFrame];
    const status = b.parentElement.querySelector("span");
    if (status) status.textContent = "360° · " + (spinFrame + 1) + " / " + frames.length;
});
render();
observeSections();
// Prevent prototype-only numbers from appearing as verified manufacturer data.
cars.forEach((c) => {
    if (c.naver) {
        c.power = c.naver.fuel;
        c.output = c.naver.output;
        c.range = c.naver.driving || c.naver.efficiency;
        c.price = c.naver.price;
        c.priceDisplay = c.naver.range;
    } else {
        c.catalogOnly = true;
        c.power = "정보 준비 중";
        c.output = "정보 준비 중";
        c.range = "정보 준비 중";
        c.priceDisplay = c.price ? c.price.toLocaleString() + "만 원부터" : "정보 준비 중";
    }
});
render();
observeSections();
cars.forEach((c) => {
    if (c.name === "디 올 뉴 아반떼" && c.brand === "현대") {
        c.officialImage = naverImages.static[0];
        c.imageSource = "네이버 자동차";
    }
    if (c.name === "스포티지" && c.brand === "기아") {
        c.officialImage = naverImages.static[1];
        c.imageSource = "네이버 자동차";
    }
});
let spinDrag = null;
function paintSpin() {
    const c = cars.find((x) => x.id === location.hash.split("/")[1]);
    const frames = selectedSpinFrames(c);
    if (!frames) return;
    let el = document.querySelector("#spin-image");
    if (el) el.src = frames[spinFrame];
    let counter = document.querySelector(".spin-controls span");
    if (counter) counter.textContent = "360° · " + (spinFrame + 1) + " / " + frames.length;
}
document.addEventListener("pointerdown", (e) => {
    const img = e.target.closest("#spin-image");
    if (!img) return;
    spinDrag = { id: e.pointerId, x: e.clientX };
    img.setPointerCapture(e.pointerId);
    e.preventDefault();
});
document.addEventListener("pointermove", (e) => {
    if (!spinDrag || e.pointerId !== spinDrag.id) return;
    let delta = e.clientX - spinDrag.x;
    if (Math.abs(delta) < 12) return;
    let c = cars.find((x) => x.id === location.hash.split("/")[1]);
    const frames = selectedSpinFrames(c);
    if (!frames) return;
    let steps = Math.trunc(delta / 12);
    spinFrame = (spinFrame + (steps % frames.length) + frames.length) % frames.length;
    spinDrag.x += steps * 12;
    paintSpin();
});
document.addEventListener("pointerup", (e) => {
    if (spinDrag?.id === e.pointerId) spinDrag = null;
});
document.addEventListener("pointercancel", () => {
    spinDrag = null;
});
render();
observeSections();
const extraSpecs = {
    "기아|셀토스": {
        year: "2027",
        price: 2575,
        range: "2,575~3,491만 원",
        fuel: "가솔린",
        efficiency: "복합 11~12.5 km/L",
        output: "193 hp",
        displacement: "1,598 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_172597",
        image: naverExtraImages.seltos,
    },
    "기아|카니발": {
        year: "2027",
        price: 3686,
        range: "3,686~4,851만 원",
        fuel: "가솔린",
        efficiency: "복합 9.0 km/L",
        output: "294 hp",
        displacement: "3,470 cc",
        seats: "7~9인승",
        source: "https://car.naver.com/home?ncrId=car_172085",
        image: naverExtraImages.carnival,
    },
    "현대|투싼 하이브리드": {
        year: "2027",
        price: 3615,
        range: "3,615~4,510만 원",
        fuel: "가솔린 하이브리드",
        efficiency: "복합 14.3~17.4 km/L",
        output: "180 hp (엔진)",
        displacement: "1,598 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_172619",
        image: naverExtraImages.tucsonhybrid,
    },
};
if (!cars.some((c) => c.brand === "현대" && c.name === "투싼 하이브리드"))
    cars.push({
        id: "naver-tucson-hev",
        brand: "현대",
        name: "투싼 하이브리드",
        type: "준중형 · SUV",
        size: "준중형",
        ice: true,
        catalogOnly: true,
    });
cars.forEach((c) => {
    let d = extraSpecs[c.brand + "|" + c.name];
    if (d) {
        c.naver = d;
        c.price = d.price;
        c.priceDisplay = d.range;
        c.power = d.fuel;
        c.output = d.output;
        c.range = d.efficiency;
        c.officialImage = d.image;
        c.imageSource = "네이버 자동차";
    }
    if (c.brand === "기아" && c.name === "K5") {
        c.officialImage = naverExtraImages.k5;
        c.imageSource = "네이버 자동차";
    }
    if (c.brand === "제네시스" && c.name === "G80") {
        c.officialImage = naverExtraImages.g80;
        c.imageSource = "네이버 자동차";
    }
});
render();
observeSections();
const importSpecs = {
    "BMW|5시리즈": {
        year: "2026",
        price: 7200,
        range: "7,200~9,120만 원",
        fuel: "가솔린 · 디젤",
        efficiency: "복합 11.1~14.7 km/L",
        output: "190~258 hp",
        displacement: "1,995~1,998 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_168331",
        image: naverImportImages.five,
    },
    "벤츠|E-클래스": {
        year: "2026",
        price: 7750,
        range: "7,750~12,960만 원",
        fuel: "가솔린 · 디젤",
        efficiency: "복합 10.5~16 km/L",
        output: "197~381 hp",
        displacement: "1,993~2,999 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_167515",
        image: naverImportImages.eclass,
    },
    "테슬라|Model Y": {
        year: "2026",
        price: 4999,
        range: "4,999~7,299만 원",
        fuel: "전기",
        efficiency: "복합 5.4~5.6 km/kWh",
        output: "255~378 kW",
        driving: "400~543 km",
        seats: "6인승 (표시 모델 기준)",
        source: "https://car.naver.com/home?ncrId=car_169737",
        image: naverImportImages.modely,
    },
    "테슬라|Model 3": {
        year: "2026",
        price: 4699,
        range: "4,699~6,999만 원",
        fuel: "전기",
        efficiency: "복합 4.8~5.8 km/kWh",
        output: "208~461 kW",
        driving: "430~538 km",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_169735",
        image: naverImportImages.model3,
    },
    "볼보|XC60": {
        year: "2026",
        price: 6570,
        range: "6,570~7,330만 원",
        fuel: "가솔린",
        efficiency: "복합 10.7 km/L",
        output: "250 hp",
        displacement: "1,969 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_165009",
        image: naverImportImages.xc60,
    },
};
cars.forEach((c) => {
    const d = importSpecs[c.brand + "|" + c.name];
    if (d) {
        c.naver = d;
        c.price = d.price;
        c.priceDisplay = d.range;
        c.power = d.fuel;
        c.output = d.output;
        c.range = d.driving || d.efficiency;
        c.officialImage = d.image;
        c.imageSource = "네이버 자동차";
    }
    if (c.brand === "기아" && c.name === "EV3") {
        c.officialImage = naverImages.ev3[9];
        c.imageSource = "네이버 자동차";
    }
});
render();
observeSections();
const tucsonBase = cars.find((c) => c.brand === "현대" && c.name === "디 올 뉴 투싼");
const tucsonHybrid = cars.find((c) => c.brand === "현대" && c.name === "투싼 하이브리드");
if (tucsonBase && tucsonHybrid) {
    tucsonBase.variants = { 가솔린: null, 하이브리드: tucsonHybrid.naver };
    tucsonBase.officialImage = tucsonHybrid.officialImage;
    tucsonBase.imageSource = "네이버 자동차 · 하이브리드 외관";
    tucsonBase.naver = tucsonHybrid.naver;
    cars.splice(cars.indexOf(tucsonHybrid), 1);
}
const sportageBase = cars.find((c) => c.brand === "기아" && c.name === "스포티지");
if (sportageBase) {
    sportageBase.variants = {
        "가솔린 · LPG": sportageBase.naver,
        하이브리드: {
            year: "2027",
            price: 3436,
            range: "3,436~4,326만 원",
            fuel: "가솔린 하이브리드",
            efficiency: "복합 14.3~16.3 km/L",
            output: "235 hp (합산)",
            displacement: "1,598 cc",
            seats: "5인승",
            source: "https://car.naver.com/home?ncrId=car_172107",
        },
    };
}
let powerSelection = {};
const oldVerifiedDetail = verifiedDetail;
verifiedDetail = function (c) {
    if (!c.variants) return oldVerifiedDetail(c);
    let names = Object.keys(c.variants),
        choice = powerSelection[c.id] || names[0],
        data = c.variants[choice];
    let tabs =
        '<div class="power-tabs"><b>동력 선택</b>' +
        names
            .map(
                (n) =>
                    '<button data-power="' +
                    esc(n) +
                    '" class="' +
                    (n === choice ? "active" : "") +
                    '">' +
                    esc(n) +
                    "</button>",
            )
            .join("") +
        "</div>";
    if (!data) {
        let h = catalogDetail(c);
        return h.replace(
            '<div class="detail-top">',
            tabs +
                '<div class="notice">' +
                esc(choice) +
                '의 상세 가격과 제원은 확인 중입니다. 다른 동력을 선택하면 확인된 정보를 볼 수 있습니다.</div><div class="detail-top">',
        );
    }
    let original = c.naver;
    c.naver = data;
    let result = oldVerifiedDetail(c);
    c.naver = original;
    return result.replace('<div class="detail-top">', tabs + '<div class="detail-top">');
};
document.addEventListener("click", (e) => {
    let b = e.target.closest("[data-power]");
    if (!b) return;
    let id = location.hash.split("/")[1];
    powerSelection[id] = b.dataset.power;
    render();
});
render();
observeSections();
const evSpecs = {
    EV4: {
        year: "2026",
        price: 4042,
        range: "4,042~5,258만 원",
        fuel: "전기",
        efficiency: "복합 5.1~5.8 km/kWh",
        output: "150~195 kW",
        driving: "354~533 km",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_170303",
        frames: naverEvImages.ev4,
    },
    EV9: {
        year: "2026",
        price: 6197,
        range: "6,197~7,917만 원",
        fuel: "전기",
        efficiency: "복합 3.8~4.2 km/kWh",
        output: "150~283 kW",
        driving: "374~501 km",
        seats: "7인승 (표시 모델 기준)",
        source: "https://car.naver.com/home?ncrId=car_170307",
        frames: naverEvImages.ev9,
    },
    EV6: {
        year: "2027",
        price: 4360,
        range: "4,360~5,967만 원",
        fuel: "전기",
        efficiency: "복합 5~5.5 km/kWh",
        output: "125~239 kW",
        driving: "395~502 km",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_171749",
    },
};
cars.forEach((c) => {
    if (c.brand !== "기아" || !evSpecs[c.name]) return;
    let d = evSpecs[c.name];
    c.naver = d;
    c.price = d.price;
    c.priceDisplay = d.range;
    c.power = d.fuel;
    c.output = d.output;
    c.range = d.driving;
    c.officialImage = d.frames ? d.frames[9] : naverEvImages.ev6[0];
    c.imageSource = "네이버 자동차";
});
render();
observeSections();
cars.forEach((c) => {
    let asset = naverMorePhotos[c.brand + "|" + c.name];
    if (asset && !c.officialImage) {
        c.officialImage = asset.url;
        c.imageSource = (asset.source.includes("danawa.com") ? "다나와 자동차 · " : "네이버 자동차 · ") + asset.title;
        c.photoSource = asset.source;
    }
});
render();
observeSections();
vehicleSnapshot.forEach((row) => {
    let c = cars.find((x) => x.brand === row.brand && x.name === row.name);
    if (!c || c.naver) return;
    const d = {
        year: row.year,
        price: row.price,
        range: row.range.replace("만원", "만 원"),
        fuel: row.hybrid ? "하이브리드" : row.fuel && row.fuel !== "," ? row.fuel : "확인 필요",
        efficiency: row.efficiency || "정보 없음",
        output: row.output || "정보 없음",
        displacement: row.displacement || undefined,
        driving: row.driving || undefined,
        seats: row.seats || "정보 없음",
        source: row.url,
    };
    if (row.hybrid) {
        c.variants = { "기본 모델": null, 하이브리드: d };
        c.naver = d;
        c.priceDisplay = "기본 모델 가격 확인 중";
    } else {
        c.naver = d;
        c.price = d.price;
        c.priceDisplay = d.range;
        c.power = d.fuel;
        c.output = d.output;
        c.range = d.driving || d.efficiency;
    }
});
render();
observeSections();
const danawaSpecs = {
    "현대|넥쏘": {
        year: "2027",
        price: 7647,
        range: "7,647~8,379만 원",
        fuel: "수소전기",
        efficiency: "복합 95.1~107.6 km/kg",
        output: "정보 확인 필요",
        driving: "최대 720 km",
        seats: "정보 확인 필요",
        source: "https://auto.danawa.com/auto/?Model=4677&Work=model",
    },
    "현대|코나 Electric": {
        year: "2026",
        price: 4152,
        range: "4,152~5,086만 원",
        fuel: "전기",
        efficiency: "복합 4.7~5.5 km/kWh",
        output: "정보 확인 필요",
        driving: "311~417 km",
        seats: "정보 확인 필요",
        source: "https://auto.danawa.com/auto/?Model=4510&Tab=spec&Work=model",
    },
    "BMW|2시리즈 그란 쿠페": {
        year: "2026",
        price: 5110,
        range: "5,110~6,550만 원",
        fuel: "가솔린",
        efficiency: "복합 10.6~12.3 km/L",
        output: "정보 확인 필요",
        displacement: "1,998 cc",
        seats: "정보 확인 필요",
        source: "https://auto.danawa.com/auto/?Model=4683&Work=model",
    },
    "BMW|2시리즈 액티브 투어러": {
        year: "2026",
        price: 5140,
        range: "5,140만 원부터",
        fuel: "가솔린",
        efficiency: "복합 12.2 km/L (220i 기준)",
        output: "정보 확인 필요",
        displacement: "1,998 cc",
        seats: "정보 확인 필요",
        source: "https://auto.danawa.com/auto/?Model=4114&Work=model",
    },
    "벤츠|EQE": {
        year: "2026",
        price: 11000,
        range: "1억 1,000만 원부터",
        fuel: "전기",
        efficiency: "복합 3.3~4.6 km/kWh",
        output: "정보 확인 필요",
        driving: "354~513 km",
        seats: "정보 확인 필요",
        source: "https://auto.danawa.com/auto/?Model=4111&Work=model",
    },
    "벤츠|EQS SUV": {
        year: "2026",
        price: 16600,
        range: "1억 6,600만 원부터",
        fuel: "전기",
        efficiency: "복합 3.5~3.7 km/kWh",
        output: "정보 확인 필요",
        driving: "447~498 km",
        seats: "정보 확인 필요",
        source: "https://auto.danawa.com/auto/?Model=4381&Work=model",
    },
    "기아|니로": {
        year: "2026",
        price: 2927,
        range: "2,927~3,515만 원",
        fuel: "가솔린 하이브리드",
        efficiency: "복합 20.2 km/L",
        output: "정보 확인 필요",
        displacement: "1,580 cc",
        seats: "정보 확인 필요",
        source: "https://auto.danawa.com/auto/?Model=4775&Work=model",
    },
};
cars.forEach((c) => {
    let d = danawaSpecs[c.brand + "|" + c.name];
    if (d && !c.naver) {
        c.naver = d;
        c.price = d.price;
        c.priceDisplay = d.range;
        c.power = d.fuel;
        c.output = d.output;
        c.range = d.driving || d.efficiency;
    }
});
render();
observeSections();
const missingDetails = {
    "현대|아이오닉 5": {
        year: "2027",
        price: 4735,
        range: "4,735~6,397만 원",
        fuel: "전기",
        efficiency: "복합 4.4~5.2 km/kWh",
        output: "124.9~239 kW",
        driving: "368~485 km",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_171299",
    },
    "볼보|XC40": {
        year: "2027",
        range: "가격 정보 없음",
        fuel: "가솔린",
        efficiency: "정보 없음",
        output: "163~197 hp",
        displacement: "1,969 cc",
        seats: "5인승",
        source: "https://car.naver.com/home?ncrId=car_172203",
    },
};
cars.forEach((c) => {
    let d = missingDetails[c.brand + "|" + c.name];
    if (d && !c.naver) {
        c.naver = d;
        if (d.price) c.price = d.price;
        c.priceDisplay = d.range;
        c.power = d.fuel;
        c.output = d.output;
        c.range = d.driving || d.efficiency;
    }
});
render();
observeSections();
const beforeRichDetails = verifiedDetail;
verifiedDetail = function (c) {
    let html = beforeRichDetails(c);
    if (c.brand !== "기아" || c.name !== "EV3") return html;
    let content =
        '<section class="rich-details"><div class="eyebrow">MODEL GUIDE / EV3</div><h2>EV3를 더 자세히</h2><p class="sub">2026년형 기준 · 사양과 가격은 동력 및 선택 품목에 따라 달라집니다.</p><div class="rich-columns"><div><h3>차체 크기</h3><table class="specs"><tr><th>전장</th><td>4,300 mm · GT-Line 4,310 mm</td></tr><tr><th>전폭</th><td>1,850 mm</td></tr><tr><th>전고</th><td>1,560~1,570 mm · 구동 및 루프랙별 상이</td></tr><tr><th>축거</th><td>2,680 mm</td></tr></table></div><div><h3>배터리와 구동</h3><table class="specs"><tr><th>스탠다드 2WD</th><td>58.3 kWh · 150 kW · 283 Nm</td></tr><tr><th>롱레인지 2WD</th><td>81.4 kWh · 150 kW · 283 Nm</td></tr><tr><th>롱레인지 4WD</th><td>81.4 kWh · 195 kW · 385 Nm</td></tr></table></div></div><h3>스탠다드 트림별 시작 가격</h3><div class="trim-table"><div><span>에어</span><strong>3,995만 원</strong></div><div><span>어스</span><strong>4,390만 원</strong></div><div><span>GT-Line</span><strong>4,475만 원</strong></div></div><p class="meta">네이버 자동차 표시 기준 · 트림과 동력에 따라 가격이 달라지며, 보조금·옵션·등록비는 별도입니다.</p><h3>에어 스탠다드 주요 기본 사양</h3><div class="feature-grid"><div><b>안전과 주행 보조</b><p>전방 충돌방지 보조, 차로 유지 보조 2, 고속도로 주행 보조, 9에어백</p></div><div><b>실내와 편의</b><p>파노라믹 와이드 디스플레이, 후방 모니터, 열선 스티어링 휠, 1열 열선 시트</p></div><div><b>전기차 기능</b><p>실외 V2L, 히트 펌프, 배터리 히팅 시스템, 회생제동 컨트롤</p></div></div><div class="rich-sources"><a href="https://www.kia.com/kr/vehicles/ev3/specification" target="_blank" rel="noopener noreferrer">기아 공식 제원 ↗</a><a href="https://www.kia.com/kr/vehicles/ev3/price" target="_blank" rel="noopener noreferrer">기아 공식 가격·전체 사양 ↗</a><a href="https://car.naver.com/home?ncrId=car_170301" target="_blank" rel="noopener noreferrer">네이버 자동차 ↗</a></div><p class="meta">공식 자료 확인: 2026.11.13. 상세 사양은 트림·연식별로 반드시 제조사 자료를 확인하세요.</p></section>';
    let at = html.lastIndexOf("</div>");
    return at < 0 ? html : html.slice(0, at) + content + html.slice(at);
};
render();
observeSections();

const trimSelection = {};
const detailBeforeTrimCatalog = verifiedDetail;
verifiedDetail = function (c) {
    let html = detailBeforeTrimCatalog(c);
    const selected = c.variants ? c.variants[powerSelection[c.id] || Object.keys(c.variants)[0]] : c.naver;
    const catalog = selected && trimCatalog[selected.source];
    // The expanded options section below supersedes the incomplete legacy table.
    if (!catalog || !catalog.groups.length || typeof collectedOptions !== "undefined") return html;
    const groups = catalog.groups;
    const index = Math.min(trimSelection[c.id + selected.source] || 0, groups.length - 1);
    const group = groups[index];
    const buttons = groups
        .map(
            (g, i) =>
                '<button type="button" data-trim-group="' +
                i +
                '" class="' +
                (i === index ? "active" : "") +
                '">' +
                esc(g.name) +
                "</button>",
        )
        .join("");
    const rows = group.trims.length
        ? '<div class="trim-table">' +
          group.trims
              .map((t) => "<div><span>" + esc(t.name) + "</span><strong>" + esc(t.price) + "만 원</strong></div>")
              .join("") +
          "</div>"
        : '<p class="trim-empty">이 등급의 상세 가격은 원문에서 확인해 주세요.</p>';
    const source = "https://car.naver.com/home?a=grade-trim&ncrId=" + (selected.source.match(/car_\d+/) || [""])[0];
    const content =
        '<section class="rich-details"><div class="eyebrow">GRADES &amp; TRIMS</div><h2>등급과 트림</h2><p class="sub">' +
        esc(selected.year) +
        '년형 · 등급을 선택해 트림별 기본 가격을 살펴보세요.</p><div class="trim-group-tabs">' +
        buttons +
        "</div><h3>" +
        esc(group.name) +
        "</h3>" +
        rows +
        '<p class="meta">네이버 자동차 표시 기준 · 옵션, 세금 및 전기차 보조금 등에 따라 실제 구매 가격은 달라질 수 있습니다. 확인일 2026.11.13</p><a class="link" href="' +
        esc(source) +
        '" target="_blank" rel="noopener noreferrer">전체 등급과 사양 확인 ↗</a></section>';
    const at = html.lastIndexOf("</div>");
    return at < 0 ? html : html.slice(0, at) + content + html.slice(at);
};
document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-trim-group]");
    if (!button) return;
    const c = cars.find((x) => x.id === location.hash.split("/")[1]);
    if (!c) return;
    const selected = c.variants ? c.variants[powerSelection[c.id] || Object.keys(c.variants)[0]] : c.naver;
    if (!selected) return;
    trimSelection[c.id + selected.source] = Number(button.dataset.trimGroup);
    render();
});
render();
observeSections();

const detailBeforeModelHistory = verifiedDetail;
verifiedDetail = function (c) {
    let html = detailBeforeModelHistory(c);
    return html;
    /* Historical years are presented in the selector above the vehicle. */
    const selected = c.variants ? c.variants[powerSelection[c.id] || Object.keys(c.variants)[0]] : c.naver;
    const years = selected && historyCatalog[selected.source];
    if (!years || !years.length) return html;
    const rows = years
        .map(
            (y) =>
                "<div><span><b>" +
                esc(y.year) +
                "</b> " +
                esc(y.name) +
                "</span><strong>" +
                esc(y.price) +
                "만 원</strong><small>" +
                (y.efficiency ? "복합 " + esc(y.efficiency) : "") +
                "</small></div>",
        )
        .join("");
    const content =
        '<section class="rich-details"><div class="eyebrow">MODEL HISTORY</div><h2>지난 연식 살펴보기</h2><p class="sub">같은 모델의 이전 연식과 당시 표시된 가격 범위입니다.</p><div class="history-list">' +
        rows +
        '</div><p class="meta">과거 신차 가격 기준이며 현재 중고차 시세가 아닙니다. 표시된 일부 연식 · 출처: 네이버 자동차</p><a class="link" href="' +
        esc(selected.source) +
        '" target="_blank" rel="noopener noreferrer">다른 연식 원문에서 보기 ↗</a></section>';
    const at = html.lastIndexOf("</div>");
    return at < 0 ? html : html.slice(0, at) + content + html.slice(at);
};
render();
observeSections();

// Reference links are navigation aids; they do not imply a live data feed.
const manufacturerReferences = {
    현대: "https://www.hyundai.com/kr/ko/e/all-vehicles",
    기아: "https://www.kia.com/kr",
    테슬라: "https://www.tesla.com/ko_kr",
    벤츠: "https://www.mercedes-benz.co.kr/passengercars.html",
    BMW: "https://www.bmw.co.kr/ko/all-models.html",
};
const detailBeforeReferenceLinks = detail;
detail = function (id) {
    const html = detailBeforeReferenceLinks(id);
    const c = cars.find((car) => car.id === id);
    if (!c) return html;
    const official = c.source && !c.source.includes("danawa.com") ? c.source : manufacturerReferences[c.brand];
    const links = [
        official && ["제조사 공식 정보", official],
        ["다나와 자동차", "https://auto.danawa.com/"],
        ["보배드림 중고차·커뮤니티", "https://www.bobaedream.co.kr/"],
    ].filter(Boolean);
    const section =
        '<section class="rich-details"><div class="eyebrow">RESEARCH LINKS</div><h2>차량 정보 더 알아보기</h2><p class="sub">공식 자료에서 최신 판매 여부와 사양을 확인하고, 비교 사이트와 중고차 정보도 함께 살펴보세요.</p><div class="rich-sources">' +
        links
            .map(
                ([label, url]) =>
                    '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + " ↗</a>",
            )
            .join("") +
        '</div><p class="meta">외부 사이트로 이동합니다. 이 페이지의 가격과 제원은 자동 갱신되지 않으며 연식·트림에 따라 달라질 수 있습니다.</p></section>';
    const at = html.lastIndexOf("</div>");
    return at < 0 ? html + section : html.slice(0, at) + section + html.slice(at);
};

// Keep the two Ray powertrains together while retaining their own specifications.
const ray = cars.find((c) => c.brand === "기아" && c.name === "레이");
const rayEV = cars.find((c) => c.brand === "기아" && c.name === "레이 EV");
if (ray && rayEV) {
    ray.variants = { 가솔린: ray.naver || null, 전기: rayEV.naver || null };
    ray.naver = ray.naver || rayEV.naver;
    ray.hasElectricVariant = true;
    ray.searchAliases = "레이 EV";
    ray.ice = true;
    const detailBeforeRayImage = verifiedDetail;
    verifiedDetail = function (c) {
        if (c !== ray || powerSelection[ray.id] !== "전기") return detailBeforeRayImage(c);
        const image = c.officialImage;
        c.officialImage = rayEV.officialImage || null;
        try {
            return detailBeforeRayImage(c);
        } finally {
            c.officialImage = image;
        }
    };
    const oldRayId = rayEV.id;
    cars.splice(cars.indexOf(rayEV), 1);
    compare = [...new Set(compare.map((id) => (id === oldRayId ? ray.id : id)))];
    const redirectRayEV = () => {
        if (location.hash === "#car/" + oldRayId) {
            powerSelection[ray.id] = "전기";
            location.hash = "#car/" + ray.id;
        }
    };
    window.addEventListener("hashchange", redirectRayEV);
    redirectRayEV();
}

// Merge explicitly matched model families; unrelated electric models remain separate.
const powertrainFamilies = [
    ["현대", "코나", "코나 Electric"],
    ["현대", "캐스퍼", "캐스퍼 일렉트릭"],
    ["제네시스", "G80", "Electrified G80"],
    ["제네시스", "GV70", "Electrified GV70"],
    ["KG 모빌리티", "토레스", "토레스 EVX"],
    ["KG 모빌리티", "무쏘", "무쏘 EV"],
];
const mergedModelIds = {};
const variantImages = {};
for (const [brand, baseName, electricName] of powertrainFamilies) {
    const base = cars.find((c) => c.brand === brand && c.name === baseName);
    const electric = cars.find((c) => c.brand === brand && c.name === electricName);
    if (!base || !electric) continue;
    base.variants = { ...(base.variants || { 내연기관: base.naver || null }), 전기: electric.naver || null };
    base.naver = base.naver || electric.naver;
    base.hasElectricVariant = true;
    base.ice = true;
    base.searchAliases = [base.searchAliases, electricName].filter(Boolean).join(" ");
    variantImages[base.id] = electric.officialImage || null;
    const prices = [base.price, electric.price].filter((price) => typeof price === "number" && price > 0);
    if (prices.length) base.price = Math.min(...prices);
    mergedModelIds[electric.id] = base.id;
    cars.splice(cars.indexOf(electric), 1);
}
const detailBeforeFamilyImages = verifiedDetail;
verifiedDetail = function (c) {
    if (!(c.id in variantImages) || powerSelection[c.id] !== "전기") return detailBeforeFamilyImages(c);
    const originalImage = c.officialImage;
    c.officialImage = variantImages[c.id];
    try {
        return detailBeforeFamilyImages(c);
    } finally {
        c.officialImage = originalImage;
    }
};
compare = [...new Set(compare.map((id) => mergedModelIds[id] || id))];
function redirectMergedModel() {
    const oldId = location.hash.startsWith("#car/") && location.hash.slice(5);
    if (oldId && mergedModelIds[oldId]) {
        const id = mergedModelIds[oldId];
        powerSelection[id] = "전기";
        location.hash = "#car/" + id;
    }
}
window.addEventListener("hashchange", redirectMergedModel);
redirectMergedModel();

for (const c of cars) {
    const id = naverExtraModelIds[c.brand + "|" + c.name];
    const collected = id && naverCollectedCurrent[id];
    if (!collected) continue;
    if (c.variants) {
        const firstPower = Object.keys(c.variants)[0];
        if (!c.variants[firstPower]) c.variants[firstPower] = collected;
    }
    if (!c.naver) c.naver = collected;
}
for (const [key, id] of Object.entries(naverExtraVariantIds)) {
    const [brand, name, power] = key.split("|");
    const c = cars.find((car) => car.brand === brand && car.name === name);
    const collected = naverCollectedCurrent[id];
    if (!c || !c.variants || !collected) continue;
    if (!c.variants[power]) c.variants[power] = collected;
    if (!c.naver) c.naver = collected;
}
const selectedModelYears = {};
function selectedSpinFrames(c) {
    if (!c) return null;
    const selected = c.variants ? c.variants[powerSelection[c.id] || Object.keys(c.variants)[0]] : c.naver;
    return selected && selected.frames && selected.frames.length ? selected.frames : null;
}
const detailBeforeYearSelector = detail;
detail = function (id) {
    const c = cars.find((car) => car.id === id);
    if (!c) return detailBeforeYearSelector(id);
    const selectedPower = c.variants ? powerSelection[id] || Object.keys(c.variants)[0] : "";
    if (c.danawa || c.danawaVariants?.[selectedPower]) {
        const power = selectedPower;
        const alternate = c.danawaVariants && c.danawaVariants[power];
        const info = alternate ? alternate.info : c.danawa;
        const image = alternate ? alternate.image : c.officialImage;
        const source = alternate ? alternate.source : c.source;
        const tabs = c.variants
            ? '<div class="power-tabs"><b>동력 선택</b>' +
              Object.keys(c.variants)
                  .map(
                      (name) =>
                          '<button data-power="' +
                          esc(name) +
                          '" class="' +
                          (power === name ? "active" : "") +
                          '">' +
                          esc(name) +
                          "</button>",
                  )
                  .join("") +
              "</div>"
            : "";
        const modelId = (c.danawaOptionIds && c.danawaOptionIds[power]) || c.danawaId;
        const lineups = (collectedOptions[modelId] || []).filter((row) => {
            if (!power || c.danawaOptionIds?.[power]) return true;
            if (/하이브리드/.test(power)) return /하이브리드|hybrid/i.test(row.label);
            if (/전기/.test(power)) return /전기|electric|\bEV\b/i.test(row.label);
            return !/하이브리드|hybrid|전기|electric|\bEV\b/i.test(row.label);
        });
        const years = [
            ...new Set(lineups.map((row) => row.label.match(/(19\d{2}|20\d{2})년형/)?.[1]).filter(Boolean)),
        ].sort((a, b) => Number(b) - Number(a));
        const selectedKey = selectedModelYears[id + "|" + power] || "current";
        const selectedYear = selectedKey.match(/^danawa-year-(\d{4})$/)?.[1];
        const selectedLineups = selectedYear ? lineups.filter((row) => row.label.includes(selectedYear + "년형")) : [];
        const prices = selectedLineups
            .flatMap((row) => row.trims)
            .map((trim) => Number((trim.price || "").replace(/,/g, "")))
            .filter((value) => Number.isFinite(value) && value > 0);
        const yearPrice = prices.length
            ? (Math.min(...prices) === Math.max(...prices)
                  ? Math.min(...prices).toLocaleString()
                  : Math.min(...prices).toLocaleString() + "~" + Math.max(...prices).toLocaleString()) + "원"
            : "가격 정보 없음";
        const selector = years.length ? '<section class="year-selector"><div><span class="eyebrow">MODEL YEAR</span><h2>연식 선택</h2><p>확인된 가격표 기준입니다.</p></div><label class="year-select-label"><span>선택한 연식</span><select data-model-year-select aria-label="차량 연식 선택"><option value="current" ' + (!selectedYear ? 'selected' : '') + '>기본 모델 정보</option>' + years.map(year => '<option value="danawa-year-' + esc(year) + '" ' + (year === selectedYear ? 'selected' : '') + '>' + esc(year) + '년형</option>').join('') + '</select></label></section>' : '';
        if (selectedYear) {
            return (
                '<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / ' +
                esc(c.brand) +
                " / " +
                esc(c.name) +
                "</div>" +
                tabs +
                selector +
                '<div class="detail-top">' +
                (image ? '<div><div class="official-car-image detail-placeholder" role="img" aria-label="' + esc(c.name) + ' 대표 이미지" style="background-image:url(&quot;' + esc(image) + '&quot;)"></div><p class="meta">대표 이미지 · 선택한 연식과 외관이 다를 수 있습니다.</p></div>' : '<div class="model-placeholder detail-placeholder"><span>' + esc(c.brand) + '</span><strong>' + esc(c.name) + '</strong><small>' + esc(selectedYear) + '년형 사진 준비 중</small></div>') +
                '<div><div class="eyebrow">' +
                esc(c.brand) +
                " / " +
                esc(c.type) +
                '</div><h1 class="page-title">' +
                esc(c.name) +
                '</h1><p class="sub">' +
                esc(selectedYear) +
                "년형 · " +
                esc(yearPrice) +
                '</p><div class="notice">다나와 가격표의 해당 연식 트림 가격 범위입니다. 세금과 기준일이 다른 라인업이 포함될 수 있습니다.</div><button class="dark" data-add="' +
                esc(c.id) +
                '">' +
                (compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교함에 담기") +
                '</button></div></div><section class="history-section"><h2>해당 연식 정보</h2><table class="specs"><tr><th>연식</th><td>' +
                esc(selectedYear) +
                "년형</td></tr><tr><th>확인된 트림 가격</th><td>" +
                esc(yearPrice) +
                '</td></tr><tr><th>세부 제원</th><td>정보 준비 중</td></tr></table><p class="meta">아래 트림과 옵션에서 가격표별 내용을 확인하세요.</p></section><section class="rich-details"><h2>차량 정보 더 알아보기</h2><div class="rich-sources"><a href="' +
                esc(source) +
                '" target="_blank" rel="noopener noreferrer">다나와 차량 정보 ↗</a></div></section></div>'
            );
        }
        const rows = [
            ["가격", info.price],
            ["판매 기간", info.date],
            ...(info.specs || []).map((value, index) => ["주요 정보 " + (index + 1), value]),
        ];
        return (
            '<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / ' +
            esc(c.brand) +
            " / " +
            esc(c.name) +
            "</div>" +
            tabs +
            selector +
            '<div class="detail-top"><div class="official-car-image detail-placeholder" role="img" aria-label="' +
            esc(c.name) +
            '" style="background-image:url(&quot;' +
            esc(image) +
            '&quot;)"></div><div><div class="eyebrow">' +
            esc(c.brand) +
            " / " +
            esc(c.type) +
            '</div><h1 class="page-title">' +
            esc(c.name) +
            '</h1><p class="sub">' +
            esc(info.price || "가격 정보 없음") +
            '</p><div class="notice">다나와 자동차에 표시된 모델 정보입니다. 연식별 자료와 색상별 회전 이미지는 확인 중입니다.</div><button class="dark" data-add="' +
            esc(c.id) +
            '">' +
            (compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교함에 담기") +
            '</button></div></div><section class="history-section"><h2>주요 정보</h2><table class="specs">' +
            rows
                .map(
                    ([label, value]) =>
                        "<tr><th>" + esc(label) + "</th><td>" + esc(value || "정보 없음") + "</td></tr>",
                )
                .join("") +
            '</table><p class="meta">트림과 시점에 따라 가격과 사양이 달라질 수 있습니다.</p></section><section class="rich-details"><h2>차량 정보 더 알아보기</h2><div class="rich-sources"><a href="' +
            esc(source) +
            '" target="_blank" rel="noopener noreferrer">다나와 차량 정보 ↗</a><a href="https://www.bobaedream.co.kr/" target="_blank" rel="noopener noreferrer">보배드림 중고차·커뮤니티 ↗</a></div></section></div>'
        );
    }
    const power = c.variants ? powerSelection[id] || Object.keys(c.variants)[0] : "";
    const data = c.variants ? c.variants[power] : c.naver;
    const sourceId = data && data.source && data.source.match(/car_\d+/)?.[0];
    const history = (sourceId && expandedHistoryById[sourceId]) || (data && historyCatalog[data.source]) || [];
    const yearKey = id + "|" + power;
    const selectedYear = selectedModelYears[yearKey] || "current";
    const old = history.find((item, index) => (item.modelId || item.year + "-" + index) === selectedYear);
    const years = data
        ? [
              { year: data.year, key: "current" },
              ...history.map((item, index) => ({ year: item.year, key: item.modelId || item.year + "-" + index })),
          ].filter((item) => item.year).sort((a, b) => Number(b.year) - Number(a.year))
        : [];
    const selector = years.length ? '<section class="year-selector"><div><span class="eyebrow">MODEL YEAR</span><h2>연식 선택</h2><p>선택한 연식의 정보를 확인하세요.</p></div><label class="year-select-label"><span>선택한 연식</span><select data-model-year-select aria-label="차량 연식 선택">' + years.map(item => '<option value="' + esc(item.key) + '" ' + (item.key === selectedYear ? 'selected' : '') + '>' + esc(item.year) + '년형</option>').join('') + '</select></label></section>' : '';
    let html;
    if (old) {
        const powerTabs = c.variants
            ? '<div class="power-tabs"><b>동력 선택</b>' +
              Object.keys(c.variants)
                  .map(
                      (name) =>
                          '<button data-power="' +
                          esc(name) +
                          '" class="' +
                          (name === power ? "active" : "") +
                          '">' +
                          esc(name) +
                          "</button>",
                  )
                  .join("") +
              "</div>"
            : "";
        const oldPrice =
            old.priceDisplay || (old.price && old.price !== "정보 없음" ? old.price + "만 원" : "정보 없음");
        const oldImage = old.image
            ? '<div class="official-car-image detail-placeholder" role="img" aria-label="' +
              esc(old.year + " " + old.name) +
              '" style="background-image:url(&quot;' +
              esc(old.image) +
              '&quot;)"></div>' + (old.imageReference ? '<p class="meta">' + esc(old.imageReference) + '</p>' : '')
            : '<div class="model-placeholder detail-placeholder"><span>' +
              esc(c.brand) +
              "</span><strong>" +
              esc(old.name) +
              "</strong><small>" +
              esc(old.year) +
              "년형 사진 준비 중</small></div>";
        const specs = naverYearDetails[old.modelId] || {};
        const rows = [
            ["연식", old.year + "년형"],
            ["당시 가격", oldPrice],
            ["출시", specs["출시"]],
            ["연료", specs["연료"]],
            ["주행거리", specs["주행"]],
            ["연비 / 전비", specs["연비"] || specs["전비"] || old.efficiency],
            ["정원", specs["정원"]],
            ["출력", specs["출력"]],
            ["토크", specs["토크"]],
            ["배기량", specs["배기"]],
        ];
        html =
            '<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / ' +
            esc(c.brand) +
            " / " +
            esc(c.name) +
            "</div>" +
            powerTabs +
            selector +
            '<div class="detail-top">' +
            oldImage +
            '<div><div class="eyebrow">' +
            esc(c.brand) +
            " / " +
            esc(power || c.type) +
            '</div><h1 class="page-title">' +
            esc(old.name) +
            '</h1><p class="sub">' +
            esc(old.year) +
            "년형 · " +
            esc(oldPrice) +
            '</p><div class="notice">네이버 자동차에 표시된 해당 연식 정보입니다. 가격은 당시 신차 가격입니다.</div><button class="dark" data-add="' +
            esc(id) +
            '">' +
            (compare.includes(id) ? "비교에서 빼기" : "＋ 비교함에 담기") +
            '</button></div></div><section class="history-section"><div class="eyebrow">SPECIFICATIONS</div><h2>주요 제원</h2><table class="specs">' +
            rows
                .map(
                    ([label, value]) =>
                        "<tr><th>" + esc(label) + "</th><td>" + esc(value || "정보 없음") + "</td></tr>",
                )
                .join("") +
            "</table></section></div>";
    } else {
        html = detailBeforeYearSelector(id);
        if (c.source && c.source.includes("danawa.com")) {
            html = html.replace(
                "제조사 공식 모델 목록에서 확인한 차량입니다.",
                "다나와 자동차 차량 목록에서 확인한 차량입니다.",
            );
            html = html.replace("제조사 공식 모델 보기 ↗", "다나와 차량 정보 보기 ↗");
        }
        if (selector) html = html.replace('<div class="detail-top">', selector + '<div class="detail-top">');
        if (!data || !data.frames)
            html = html.replace(
                '<div class="detail-top">',
                '<p class="meta">이 차량의 색상별 360° 이미지는 준비 중입니다.</p><div class="detail-top">',
            );
    }
    // Keep research links while removing the individual data-source links.
    html = html.replace(
        /<a\b[^>]*href="https?:\/\/[^>]*>\s*(?:네이버 자동차|다나와 자동차)\s*원문 보기\s*↗\s*<\/a>\s*(?:<br\s*\/?\s*>)?/gi,
        "",
    );
    html = html.replace(
        /<a\b[^>]*href="https?:\/\/(?:car\.naver\.com|auto\.danawa\.com\/auto\/)[^"]*"[^>]*>[\s\S]*?<\/a>/gi,
        "",
    );
    if (old) {
        const official = c.source && !c.source.includes("danawa.com") ? c.source : manufacturerReferences[c.brand];
        const links = [
            official && ["제조사 공식 정보", official],
            ["다나와 자동차", "https://auto.danawa.com/"],
            ["보배드림 중고차·커뮤니티", "https://www.bobaedream.co.kr/"],
        ].filter(Boolean);
        const section =
            '<section class="rich-details"><div class="eyebrow">RESEARCH LINKS</div><h2>차량 정보 더 알아보기</h2><div class="rich-sources">' +
            links
                .map(
                    ([label, url]) =>
                        '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + " ↗</a>",
                )
                .join("") +
            "</div></section>";
        const at = html.lastIndexOf("</div>");
        html = html.slice(0, at) + section + html.slice(at);
    }
    html = html.replace(
        "<span>기본 이미지 1종</span><small>다른 색상은 원문에서 확인하세요</small>",
        '<span class="color-option" aria-label="기본 색상">기본 색상</span><small>다른 색상의 회전 이미지는 준비 중입니다.</small>',
    );
    return html;
};
document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-model-year]");
    if (!button) return;
    const id = location.hash.split("/")[1];
    const c = cars.find((car) => car.id === id);
    if (!c) return;
    const power = c.variants ? powerSelection[id] || Object.keys(c.variants)[0] : "";
    selectedModelYears[id + "|" + power] = button.dataset.modelYear;
    render();
});

document.addEventListener('change', (event) => {
    if (!event.target.matches('[data-model-year-select]')) return;
    const id = location.hash.split('/')[1];
    const car = cars.find((item) => item.id === id);
    if (!car) return;
    const power = car.variants ? powerSelection[id] || Object.keys(car.variants)[0] : '';
    selectedModelYears[id + '|' + power] = event.target.value;
    const scrollPosition = window.scrollY;
    render();
    window.scrollTo(0, scrollPosition);
    document.querySelector('[data-model-year-select]')?.focus({preventScroll:true});
});

// Danawa's current model list supplements the manually curated catalogue.
const normalizedModelName = (name) =>
    name
        .toLowerCase()
        .replace(/the new|all new|더 뉴|디 올 뉴|올 뉴|신형/g, "")
        .replace(/series/g, "시리즈")
        .replace(/class/g, "클래스")
        .replace(/[^가-힣a-z0-9]/g, "");
const modelAliases = {
    "벤츠|e클래스": "E-클래스",
    "벤츠|c클래스": "C-Class",
    "벤츠|s클래스": "S-Class",
    "벤츠|a클래스": "A-Class Hatch",
    "벤츠|gla클래스": "GLA",
    "벤츠|glb클래스": "GLB",
    "벤츠|glc클래스": "GLC",
    "벤츠|gle클래스": "GLE",
    "벤츠|gls클래스": "GLS",
    "벤츠|cla클래스": "CLA Sedan",
    "벤츠|cle": "CLE Coupé",
    "현대|스타리아": "스타리아",
    "기아|pv5": "PV5 패신저",
};
for (const entry of danawaCatalog) {
    if (!brands.includes(entry.brand)) brands.push(entry.brand);
    const key = normalizedModelName(entry.name);
    const alias = modelAliases[entry.brand + "|" + key];
    let matchedPower = "";
    let match = cars.find(
        (c) => c.brand === entry.brand && (normalizedModelName(c.name) === key || (alias && c.name === alias)),
    );
    if (!match) {
        const baseKey = key.replace(/(일렉트릭|electric|하이브리드|hybrid|ev)$/, "");
        if (baseKey !== key && baseKey.length >= 2) {
            match = cars.find((c) => c.brand === entry.brand && normalizedModelName(c.name) === baseKey);
            if (match) {
                const power = /하이브리드|hybrid/.test(key) ? "하이브리드" : "전기";
                matchedPower = power;
                if (!match.variants) match.variants = { "기본 모델": match.naver || null };
                if (!(power in match.variants)) match.variants[power] = null;
                if (match.danawa) {
                    match.danawaVariants = match.danawaVariants || {};
                    match.danawaVariants[power] = {
                        info: danawaModelSpecs[entry.id] || {},
                        image: entry.image,
                        source: entry.source,
                    };
                }
                if (power === "전기") match.hasElectricVariant = true;
            }
        }
    }
    if (match) {
        match.searchAliases = [match.searchAliases, entry.name].filter(Boolean).join(" ");
        if (matchedPower) {
            match.danawaOptionIds = match.danawaOptionIds || {};
            match.danawaOptionIds[matchedPower] = entry.id;
        } else if (!match.danawaId) match.danawaId = entry.id;
        continue;
    }
    const specs = danawaModelSpecs[entry.id] || {};
    const electric =
        /electric|일렉트릭|전기|(^|\s)ev\d*\b/i.test(entry.name) || (specs.specs || []).some((s) => /^전기/.test(s));
    const isBus =
        /버스|카운티|쏠라티|유니버스|일렉시티/i.test(entry.name) ||
        (specs.specs || []).some((s) => /버스|승합/.test(s));
    const type =
        entry.category === "상용"
            ? (electric ? "전기 " : "") + (isBus ? "버스" : "트럭")
            : entry.category === "RV"
              ? electric
                  ? "전기 RV"
                  : "RV"
              : electric
                ? "전기차"
                : "승용";
    const priceMatch = (specs.price || "").match(/^([\d,]+)(?:~[\d,]+)?\s*만\s*원$/);
    const size = (specs.specs || []).find((s) => ["경형", "소형", "준중형", "중형", "준대형", "대형"].includes(s));
    cars.push({
        id: "danawa-" + entry.id,
        brand: entry.brand,
        name: entry.name,
        type,
        source: entry.source,
        catalogOnly: true,
        officialImage: entry.image,
        imageSource: "다나와 자동차",
        ice: !electric,
        size,
        price: priceMatch ? Number(priceMatch[1].replace(/,/g, "")) : undefined,
        danawa: specs,
        danawaId: entry.id,
    });
}

// Explicit family matches retain the original model's own specifications and images.
for (const [brand, baseName, electricName] of [
    ["BMW", "5시리즈", "i5"],
    ["마세라티", "GranTurismo", "GranTurismo Folgore"],
    ["마세라티", "GranCabrio", "GranCabrio Folgore"],
]) {
    const base = cars.find((c) => c.brand === brand && c.name === baseName);
    const electric = cars.find((c) => c.brand === brand && c.name === electricName);
    if (!base || !electric || !electric.danawa) continue;
    base.variants = { ...(base.variants || { 내연기관: base.naver || null }), 전기: electric.naver || null };
    base.danawaVariants = {
        ...(base.danawaVariants || {}),
        전기: { info: electric.danawa, image: electric.officialImage, source: electric.source },
    };
    base.danawaOptionIds = { ...(base.danawaOptionIds || {}), 전기: electric.danawaId };
    base.hasElectricVariant = true;
    base.searchAliases = [base.searchAliases, electricName].filter(Boolean).join(" ");
    mergedModelIds[electric.id] = base.id;
    cars.splice(cars.indexOf(electric), 1);
}
const camry = cars.find((c) => c.brand === "토요타" && c.name === "캠리");
const camryLatin = cars.find((c) => c.brand === "토요타" && c.name === "Camry");
if (camry && camryLatin) {
    camry.searchAliases = [camry.searchAliases, "Camry"].filter(Boolean).join(" ");
    camry.danawaId ||= camryLatin.danawaId;
    if (camry.variants?.["하이브리드"] && !camry.variants["기본 모델"]) delete camry.variants["기본 모델"];
    mergedModelIds[camryLatin.id] = camry.id;
    cars.splice(cars.indexOf(camryLatin), 1);
}
// Korea retail has ended or has not started for these passenger-car brands.
const unavailableKoreanBrands = new Set([
    "시트로엥",
    "DS 오토모빌",
    "재규어",
    "리비안",
    "루시드",
    "빈패스트",
    "피스커",
]);
for (let i = cars.length - 1; i >= 0; i--) if (unavailableKoreanBrands.has(cars[i].brand)) cars.splice(i, 1);
for (let i = brands.length - 1; i >= 0; i--) if (unavailableKoreanBrands.has(brands[i])) brands.splice(i, 1);

for (const brand of ["타타대우모빌리티", "KGM 커머셜", "에디슨모터스", "우진산전", "자일대우버스", "자일상용차"]) {
    if (!domesticBrands.includes(brand)) domesticBrands.push(brand);
}
for (const model of commercialCatalog) {
    if (!brands.includes(model.brand)) brands.push(model.brand);
    const existing = cars.find(
        (c) =>
            c.brand === model.brand &&
            c.type.includes(model.type.includes("버스") ? "버스" : "트럭") &&
            normalizedModelName(c.name) === normalizedModelName(model.name),
    );
    if (existing) {
        existing.searchAliases = [existing.searchAliases, model.name].filter(Boolean).join(" ");
        continue;
    }
    const electric = model.type.includes("전기"),
        hydrogen = model.type.includes("수소");
    const knownCombustion = !electric && !hydrogen && /디젤|가솔린|LPG|CNG|엔진/i.test(JSON.stringify(model.fields));
    cars.push({
        id: "commercial-" + model.id,
        brand: model.brand,
        name: model.name,
        type: model.type,
        source: model.source,
        catalogOnly: true,
        officialImage: model.image || undefined,
        imageSource: "이트럭스",
        ice: knownCombustion,
        commercial: model,
    });
}
for (const model of kiaSpecialCatalog) {
    cars.push({
        id: "kia-special-" + model.id,
        brand: "기아",
        name: model.name,
        type: model.type,
        source: model.source,
        catalogOnly: true,
        officialImage: model.image,
        imageSource: "기아 특수차량",
        ice: model.id === "kltv",
        special: model,
    });
}
const exploreBeforeSpecial = explore;
explore = function () {
    return exploreBeforeSpecial().replace(
        '<button data-body="기타"',
        '<button data-body="특수차" class="' +
            (bodyFilter === "특수차" ? "active" : "") +
            '">특수차</button><button data-body="기타"',
    );
};

const specialSelection = {};
// The current Avante has manufacturer-provided frames for each exterior color.
const avante360Colors = {
    "아틀라스 화이트": "SAW",
    "퀀텀 실버 펄": "QGP",
    "에코트로닉 그레이 펄": "PE2",
    "볼케닉 레드 펄": "V2R",
    "고요 카퍼 펄": "VC2",
    "그라펜 그린 펄": "G2H",
    "어비스 블랙 펄": "A2B",
    "랩터 그레이 매트": "RAF",
    "코디악 블루 매트": "KKP",
};
if (vehicleMedia.car_171409) {
    const media = vehicleMedia.car_171409;
    media.colorFrames = media.colors.map((color) => {
        const code = avante360Colors[color.name];
        return code
            ? Array.from(
                  { length: 60 },
                  (_, i) =>
                      "https://www.hyundai.com/contents/vr360/FN01/exterior/" +
                      code +
                      "/" +
                      String(i + 1).padStart(3, "0") +
                      ".png",
              )
            : null;
    });
    media.frames = media.colorFrames.find(Boolean) || [];
}
// 2027 Sonata: the manufacturer's VR images correspond to this model year.
if (vehicleMedia.car_172475) {
    const media = vehicleMedia.car_172475;
    const codes = {
        "에어로 실버 매트": "T4M",
        "녹턴 그레이 매트": "T9M",
        "세레니티 화이트 펄": "W6H",
        "트랜스 미션 블루 펄": "NY9",
        "바이오 필릭 블루 펄": "XB9",
        "어비스 블랙 펄": "A2B",
        "얼티메이트 레드 메탈릭": "R2P",
        "녹턴 그레이 메탈릭": "T2G",
    };
    media.colorFrames = media.colors.map((color) => {
        const code = codes[color.name];
        return code
            ? Array.from(
                  { length: 60 },
                  (_, i) =>
                      "https://www.hyundai.com/contents/vr360/DN26/exterior/" +
                      code +
                      "/" +
                      String(i + 1).padStart(3, "0") +
                      ".png",
              )
            : null;
    });
    media.frames = media.colorFrames.find(Boolean) || [];
}
// 2027 annual updates of these models retain the same generation. Use the
// matching powertrain's prior-year spin only as a clearly labelled reference.
const yearReferenceSpins = {
    car_172115: 'car_166815',
    car_172121: 'car_166817',
    car_172099: 'car_167619',
    car_172107: 'car_167617',
    car_172085: 'car_167181',
};
for (const [currentId, previousId] of Object.entries(yearReferenceSpins)) {
    const current = vehicleMedia[currentId];
    const previous = vehicleMedia[previousId];
    if (!current || current.frames.length || !previous?.frames?.length) continue;
    current.frames = [...previous.frames];
    current.spinSource = '2026년형 기본 사양 참고 이미지 · 선택한 연식이나 블랙 에디션과 세부 외관이 다를 수 있습니다';
}
// The same generation, shown in a representative overseas specification.
const importedSpinSources = {
    car_168317: ['BMW/BMW-X1/1677910541', 17],
    car_168843: ['BMW/BMW-X3/456789', 35],
    car_168831: ['BMW/BMW-X5/1708065015', 20],
    car_167531: ['Mercedes-Benz/Mercedes-Benz-GLC', 32],
};
for (const [id, [path, count]] of Object.entries(importedSpinSources)) {
    const media = vehicleMedia[id] || (vehicleMedia[id] = { colors: [], photos: [], frames: [] });
    if (media.frames.length) continue;
    media.frames = Array.from({length: count}, (_, i) => 'https://stimg.cardekho.com/images/feelthecar360view/Exterior/' + path + '/images/img_0_0_' + i + '.jpg');
    media.reverseDrag = true;
    media.spinSource = 'CarDekho 해외 사양 대표 이미지 · 국내 사양과 색상은 다를 수 있습니다';
}
function galleryFrames(media, state) {
    return media.colorFrames ? (media.colorFrames[state.color] || []) : media.frames;
}
const galleryState = {};
function galleryThumbnail(source) {
    try {
        const url = new URL(source);
        if (url.hostname === "imgauto-phinf.pstatic.net") url.searchParams.set("type", "f120_80");
        return url.href;
    } catch {
        return source;
    }
}
const detailBeforeGallery = detail;
detail = function (id) {
    const c = cars.find((car) => car.id === id);
    if (c?.special) {
        const m = c.special;
        const chosen = Math.min(specialSelection[id] || 0, Math.max((m.variants || []).length - 1, 0));
        const variants = (m.variants || [])
            .map(
                ([name], index) =>
                    '<button class="special-variant ' +
                    (index === chosen ? "active" : "") +
                    '" data-special-variant="' +
                    index +
                    '" aria-pressed="' +
                    (index === chosen) +
                    '">' +
                    esc(name) +
                    "</button>",
            )
            .join("");
        const variantLink = m.variants?.[chosen]
            ? '<p class="meta">선택: ' +
              esc(m.variants[chosen][0]) +
              ' · 대표 이미지는 계열 공통입니다.</p><a class="link" href="' +
              esc(m.variants[chosen][1]) +
              '" target="_blank" rel="noopener noreferrer">선택한 파생형 공식 정보 ↗</a>'
            : "";
        const rows = (m.specs || [])
            .map(([key, value]) => "<tr><th>" + esc(key) + "</th><td>" + esc(value) + "</td></tr>")
            .join("");
        return (
            '<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / 기아 / ' +
            esc(m.name) +
            '</div><div class="detail-top">' +
            (m.image
                ? '<div class="official-car-image detail-placeholder" role="img" aria-label="' +
                  esc(m.name) +
                  '" style="background-image:url(&quot;' +
                  esc(m.image) +
                  '&quot;)"></div>'
                : '<div class="model-placeholder detail-placeholder"><strong>' +
                  esc(m.name) +
                  "</strong><small>사진 준비 중</small></div>") +
            '<div><div class="eyebrow">기아 특수차량 / ' +
            esc(m.category) +
            '</div><h1 class="page-title">' +
            esc(m.name) +
            '</h1><p class="sub">' +
            esc(m.description) +
            '</p><div class="notice">' +
            esc(m.category) +
            ' · 일반 승용차와 구매 대상 및 판매 조건이 다를 수 있습니다.</div><button class="dark" data-add="' +
            esc(c.id) +
            '">' +
            (compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교함에 담기") +
            "</button></div></div>" +
            (variants
                ? '<section class="history-section"><h2>차량 구성</h2><p class="sub">기아에서 소개하는 파생형입니다.</p><div class="special-variants">' +
                  variants +
                  "</div>" +
                  variantLink +
                  "</section>"
                : "") +
            (rows
                ? '<section class="history-section"><h2>주요 제원</h2><table class="specs">' +
                  rows +
                  '</table><p class="meta">공식 플랫폼 소개 기준이며 파생형에 따라 다를 수 있습니다.</p></section>'
                : "") +
            '<section class="rich-details"><h2>차량 정보 더 알아보기</h2><div class="rich-sources"><a href="' +
            esc(m.source) +
            '" target="_blank" rel="noopener noreferrer">기아 특수차량 공식 정보 ↗</a></div></section></div>'
        );
    }
    if (c?.commercial) {
        const m = c.commercial;
        const rows = Object.entries(m.fields || {}).filter(([, value]) => value);
        return (
            '<div class="page"><div class="breadcrumbs"><a href="#explore">자동차 탐색</a> / ' +
            esc(c.brand) +
            " / " +
            esc(c.name) +
            '</div><div class="detail-top">' +
            (c.officialImage
                ? '<div class="official-car-image detail-placeholder" style="background-image:url(&quot;' +
                  esc(c.officialImage) +
                  '&quot;)" role="img" aria-label="' +
                  esc(c.name) +
                  '"></div>'
                : '<div class="model-placeholder detail-placeholder"><strong>' +
                  esc(c.name) +
                  "</strong><small>사진 준비 중</small></div>") +
            '<div><div class="eyebrow">' +
            esc(c.brand) +
            " / " +
            esc(c.type) +
            '</div><h1 class="page-title">' +
            esc(c.name) +
            '</h1><p class="sub">' +
            esc(m.year ? "자료 연식 " + m.year : "연식 확인 중") +
            '</p><div class="notice">이트럭스에 등록된 상용차 정보입니다. 과거 연식이 포함될 수 있으며 현재 판매 여부는 별도 확인이 필요합니다.</div><button class="dark" data-add="' +
            esc(c.id) +
            '">' +
            (compare.includes(c.id) ? "비교에서 빼기" : "＋ 비교함에 담기") +
            '</button></div></div><section class="history-section"><h2>차량 정보</h2><table class="specs">' +
            rows.map(([key, value]) => "<tr><th>" + esc(key) + "</th><td>" + esc(value) + "</td></tr>").join("") +
            '</table></section><section class="rich-details"><h2>차량 정보 더 알아보기</h2><div class="rich-sources"><a href="' +
            esc(c.source) +
            '" target="_blank" rel="noopener noreferrer">이트럭스 상세 정보 ↗</a></div></section></div>'
        );
    }
    let html = detailBeforeGallery(id);
    if (!c || c.danawa) return html;
    const power = c.variants ? powerSelection[id] || Object.keys(c.variants)[0] : "";
    const data = c.variants ? c.variants[power] : c.naver;
    const chosenYear = selectedModelYears[id + "|" + power];
    const mediaId =
        chosenYear && chosenYear !== "current" && /^car_\d+$/.test(chosenYear)
            ? chosenYear
            : data?.source?.match(/car_\d+/)?.[0];
    const media = mediaId && vehicleMedia[mediaId];
    if (!media || !(media.colors.length || media.photos.length || media.frames.length)) return html;
    const state =
        galleryState[mediaId] ||
        (galleryState[mediaId] = {
            mode: media.frames.length ? "rotate" : media.colors.length ? "colors" : "photos",
            color: media.colorFrames ? Math.max(0, media.colorFrames.findIndex((frames) => frames?.length)) : 0,
            photo: 0,
            frame: 0,
        });
    const count =
        state.mode === "rotate"
            ? media.frames.length
            : state.mode === "colors"
              ? media.colors.length
              : media.photos.length;
    const index =
        state.mode === "rotate"
            ? state.frame % count
            : state.mode === "colors"
              ? state.color % count
              : state.photo % count;
    const url =
        state.mode === "rotate"
            ? galleryFrames(media, state)[index]
            : state.mode === "colors"
              ? media.colors[index].image
              : media.photos[index];
    const modes = [
        ["rotate", "360°", media.frames.length],
        ["colors", "외장 색상", media.colors.length],
        ["photos", "사진", media.photos.length],
    ].filter((x) => x[2]);
    const buttons = modes
        .map(
            ([mode, label, total]) =>
                '<button type="button" data-gallery-mode="' +
                mode +
                '" class="' +
                (mode === state.mode ? "active" : "") +
                '">' +
                label +
                " <small>" +
                total +
                "</small></button>",
        )
        .join("");
    const colors =
        state.mode === "colors" || (state.mode === "rotate" && media.colorFrames)
            ? '<div class="gallery-colors">' +
              media.colors
                  .map(
                      (color, i) =>
                          '<button type="button" data-gallery-color="' +
                          i +
                          '" class="' +
                          (state.color === i ? "active" : "") +
                          '" title="' +
                          esc(color.name) +
                          '" aria-label="' +
                          esc(color.name) +
                          '" aria-pressed="' +
                          (state.color === i) +
                          '">' +
                          (color.swatch
                              ? '<img referrerpolicy="no-referrer" src="' + esc(color.swatch) + '" alt="">'
                              : "") +
                          '<span class="gallery-swatch-fallback"' +
                          (color.swatch ? " hidden" : "") +
                          ">" +
                          esc(color.name.slice(0, 1)) +
                          "</span></button>",
                  )
                  .join("") +
              '</div><p class="gallery-caption">' +
              esc(media.colors[state.color].name) +
              "</p>"
            : "";
    const photos =
        state.mode === "photos"
            ? '<div class="gallery-thumbs">' +
              media.photos
                  .map(
                      (photo, i) =>
                          '<button type="button" data-gallery-photo="' +
                          i +
                          '" class="' +
                          (i === index ? "active" : "") +
                          '" aria-label="사진 ' +
                          (i + 1) +
                          '"><img loading="lazy" referrerpolicy="no-referrer" src="' +
                          esc(galleryThumbnail(photo)) +
                          '" alt=""><span class="gallery-thumb-fallback" hidden>' +
                          (i + 1) +
                          "</span></button>",
                  )
                  .join("") +
              "</div>"
            : "";
    const controls =
        count > 1
            ? '<div class="gallery-controls"><button type="button" data-gallery-step="-1" aria-label="이전 이미지">←</button><span>' +
              (index + 1) +
              " / " +
              count +
              '</span><button type="button" data-gallery-step="1" aria-label="다음 이미지">→</button></div>'
            : "";
    const gallery =
        '<div class="vehicle-gallery" data-gallery-id="' +
        esc(mediaId) +
        '"><div class="gallery-tabs">' +
        buttons +
        '</div><div class="gallery-stage' +
        (c.brand === "제네시스" && c.name === "G90" && state.mode !== "photos" ? " g90-visual" : "") +
        '"><img id="gallery-image" referrerpolicy="no-referrer" src="' +
        esc(url) +
        '" alt="' +
        esc(c.name) +
        " " +
        (state.mode === "colors" ? esc(media.colors[index].name) : "차량 이미지") +
        '"><span class="gallery-image-fallback" hidden>이미지를 불러오지 못했습니다.<br>다른 사진을 선택해 주세요.</span><button type="button" class="gallery-zoom" data-gallery-zoom aria-label="사진 크게 보기">⤢ <span>크게 보기</span></button></div>' +
        controls +
        colors +
        photos +
        (!media.frames.length ? '<p class="gallery-unavailable">360° 회전 이미지를 이 연식에서 확인하지 못했습니다. 외장 색상과 사진은 볼 수 있습니다.</p>' : '') +
        '<p class="gallery-note">' +
        (state.mode === "rotate" && media.spinSource ? esc(media.spinSource) : state.mode === "rotate" && media.colorFrames ? "현대자동차 제공" : "네이버 자동차 제공") +
        " · " +
        (state.mode === "rotate"
            ? "이미지를 좌우로 드래그해 회전할 수 있습니다."
            : state.mode === "colors"
              ? "색상 이미지는 회전 이미지와 별도로 제공됩니다."
              : "사진은 연식과 트림에 따라 다를 수 있습니다.") +
        "</p></div>";
    html = html.replace('<div class="detail-top">', '<div class="detail-top has-gallery">' + gallery);
    html = html.replace('<p class="meta">이 차량의 색상별 360° 이미지는 준비 중입니다.</p>', "");
    return html;
};
document.addEventListener("click", (event) => {
    const specialButton = event.target.closest("[data-special-variant]");
    if (specialButton) {
        const id = location.hash.split("/")[1];
        if (cars.some((car) => car.id === id && car.special)) {
            specialSelection[id] = Number(specialButton.dataset.specialVariant);
            const y = window.scrollY;
            render();
            window.scrollTo(0, y);
        }
        return;
    }
    const button = event.target.closest(
        "[data-gallery-mode],[data-gallery-color],[data-gallery-photo],[data-gallery-step]",
    );
    if (!button) return;
    const id = button.closest("[data-gallery-id]")?.dataset.galleryId;
    const state = galleryState[id],
        media = vehicleMedia[id];
    if (!state || !media) return;
    if (button.dataset.galleryMode) {
        state.mode = button.dataset.galleryMode;
        if (state.mode === "rotate" && media.colorFrames && !media.colorFrames[state.color]?.length) {
            state.color = media.colorFrames.findIndex((frames) => frames?.length);
            state.frame = 0;
        }
    }
    if (button.dataset.galleryColor !== undefined) {
        state.color = Number(button.dataset.galleryColor);
        state.frame = 0;
        if (state.mode === "rotate" && media.colorFrames && !media.colorFrames[state.color]?.length) state.mode = "colors";
    }
    if (button.dataset.galleryPhoto !== undefined) state.photo = Number(button.dataset.galleryPhoto);
    if (button.dataset.galleryStep) {
        const field = state.mode === "rotate" ? "frame" : state.mode === "colors" ? "color" : "photo";
        const count =
            state.mode === "rotate"
                ? media.frames.length
                : state.mode === "colors"
                  ? media.colors.length
                  : media.photos.length;
        state[field] = (state[field] + Number(button.dataset.galleryStep) + count) % count;
    }
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
});
let galleryLightbox = null;
function updateGalleryLightbox() {
    if (!galleryLightbox) return;
    const { dialog, images, index } = galleryLightbox;
    dialog.querySelector('img').src = images[index];
    dialog.querySelector('[data-lightbox-count]').textContent = (index + 1) + ' / ' + images.length;
    dialog.querySelectorAll('[data-lightbox-step]').forEach(button => { button.hidden = images.length < 2; });
}
document.addEventListener('click', event => {
    const open = event.target.closest('[data-gallery-zoom]');
    if (open) {
        const id = open.closest('[data-gallery-id]')?.dataset.galleryId;
        const media = vehicleMedia[id], state = galleryState[id];
        if (!media || !state) return;
        const images = state.mode === 'rotate' ? galleryFrames(media,state) : state.mode === 'colors' ? media.colors.map(color => color.image) : media.photos;
        if (!images?.length) return;
        const index = state.mode === 'rotate' ? state.frame : state.mode === 'colors' ? state.color : state.photo;
        const dialog = document.createElement('dialog');
        dialog.className = 'gallery-lightbox';
        dialog.setAttribute('aria-label', '차량 사진 크게 보기');
        dialog.innerHTML = '<div class="lightbox-toolbar"><span data-lightbox-count></span><button type="button" data-lightbox-close aria-label="닫기">×</button></div><div class="lightbox-main"><button type="button" data-lightbox-step="-1" aria-label="이전 사진">←</button><img alt="선택한 차량 사진" referrerpolicy="no-referrer"><button type="button" data-lightbox-step="1" aria-label="다음 사진">→</button></div>';
        document.body.append(dialog);
        galleryLightbox = { dialog, images, index: Math.min(index,images.length-1), opener:open, rotate: state.mode === "rotate", direction: media.colorFrames || media.reverseDrag ? -1 : 1 };
        if (galleryLightbox.rotate) dialog.classList.add('is-rotatable');
        dialog.addEventListener('close', () => { const opener = galleryLightbox?.opener; dialog.remove(); galleryLightbox = null; opener?.focus({preventScroll:true}); });
        updateGalleryLightbox(); dialog.showModal(); return;
    }
    if (!galleryLightbox) return;
    if (event.target.closest('[data-lightbox-close]') || event.target === galleryLightbox.dialog) { galleryLightbox.dialog.close(); return; }
    const step = event.target.closest('[data-lightbox-step]');
    if (step) { galleryLightbox.index = (galleryLightbox.index + Number(step.dataset.lightboxStep) + galleryLightbox.images.length) % galleryLightbox.images.length; updateGalleryLightbox(); }
});
let lightboxDrag = null;
document.addEventListener('pointerdown', event => {
    if (!galleryLightbox?.rotate || event.target !== galleryLightbox.dialog.querySelector('img')) return;
    lightboxDrag = { pointerId:event.pointerId, x:event.clientX };
    event.target.setPointerCapture(event.pointerId);
    event.preventDefault();
});
document.addEventListener('pointermove', event => {
    if (!galleryLightbox || !lightboxDrag || lightboxDrag.pointerId !== event.pointerId) return;
    const steps = Math.trunc((event.clientX - lightboxDrag.x) / 12);
    if (!steps) return;
    const {images,direction} = galleryLightbox;
    galleryLightbox.index = (galleryLightbox.index + ((direction * steps) % images.length) + images.length) % images.length;
    lightboxDrag.x += steps * 12;
    updateGalleryLightbox();
});
for (const type of ['pointerup','pointercancel','lostpointercapture']) document.addEventListener(type, event => {
    if (lightboxDrag?.pointerId === event.pointerId) lightboxDrag = null;
});
document.addEventListener('keydown', event => {
    if (!galleryLightbox || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault(); galleryLightbox.index = (galleryLightbox.index + (event.key === 'ArrowRight' ? 1 : -1) + galleryLightbox.images.length) % galleryLightbox.images.length; updateGalleryLightbox();
});
let galleryDrag = null;
document.addEventListener(
    "error",
    (event) => {
        const img = event.target;
        if (!img.matches?.(".vehicle-gallery img")) return;
        img.hidden = true;
        const fallback =
            img.id === "gallery-image"
                ? img.parentElement.querySelector(".gallery-image-fallback")
                : img.parentElement.querySelector(".gallery-swatch-fallback, .gallery-thumb-fallback");
        if (fallback) fallback.hidden = false;
    },
    true,
);
document.addEventListener(
    "load",
    (event) => {
        const img = event.target;
        if (!img.matches?.(".vehicle-gallery img")) return;
        img.hidden = false;
        const fallback =
            img.id === "gallery-image"
                ? img.parentElement.querySelector(".gallery-image-fallback")
                : img.parentElement.querySelector(".gallery-swatch-fallback, .gallery-thumb-fallback");
        if (fallback) fallback.hidden = true;
    },
    true,
);
document.addEventListener("pointerdown", (event) => {
    if (event.target.id !== "gallery-image") return;
    const id = event.target.closest("[data-gallery-id]")?.dataset.galleryId;
    if (!id || galleryState[id]?.mode !== "rotate") return;
    galleryDrag = { id, x: event.clientX };
    event.target.setPointerCapture(event.pointerId);
    event.preventDefault();
});
document.addEventListener("pointermove", (event) => {
    if (!galleryDrag) return;
    const diff = event.clientX - galleryDrag.x,
        steps = Math.trunc(diff / 12);
    if (!steps) return;
    const media = vehicleMedia[galleryDrag.id],
        state = galleryState[galleryDrag.id];
    const direction = media.colorFrames || media.reverseDrag ? -1 : 1;
    state.frame =
        (state.frame + ((direction * steps) % media.frames.length) + media.frames.length) % media.frames.length;
    galleryDrag.x += steps * 12;
    const img = document.querySelector("#gallery-image");
    if (img) img.src = galleryFrames(media, state)[state.frame];
    const counter = document.querySelector(".gallery-controls span");
    if (counter) counter.textContent = state.frame + 1 + " / " + media.frames.length;
});
document.addEventListener("pointerup", () => {
    galleryDrag = null;
});
document.addEventListener("pointercancel", () => {
    galleryDrag = null;
});

const modelChangeOutlook = {
    "기아|쏘렌토": {
        full: "2028년 생산 계획 보도",
        note: "후속 모델 생산 계획에 관한 보도이며 국내 출시일은 확정되지 않았습니다.",
        source: "https://www.yuccapostkorea.com/news/articleView.html?idxno=2891",
        sourceLabel: "2026.11 보도",
    },
    "기아|스포티지": {
        full: "2027년 생산 계획 보도",
        note: "후속 모델 생산 계획에 관한 보도이며 국내 출시일은 확정되지 않았습니다.",
        source: "https://www.yuccapostkorea.com/news/articleView.html?idxno=2891",
        sourceLabel: "2026.11 보도",
    },
    "BMW|5시리즈": {
        facelift: "2027년 중반 생산 전망",
        note: "해외 보도에 따른 예상 생산 시기이며, 국내 출시 일정은 확인되지 않았습니다.",
        source: "https://www.yuccapostkorea.com/news/articleView.html?idxno=2565",
        sourceLabel: "2026.08 보도",
    },
    "제네시스|G80": {
        full: "2027~2028년 전망",
        note: "보도에 따라 동력별 예상 시기가 다르며 제조사 발표로 확정된 일정은 아닙니다.",
        source: "https://g80.carnote24.com/next-generation/",
        sourceLabel: "연식 변경 전망 정리",
    },
    "현대|그랜저": {
        note: "7세대 부분변경 모델은 2026년에 공개됐습니다. 이후 일정은 확인되지 않았습니다.",
        source: "https://www.hyundaimotorgroup.com/ko/news/hyundai-new-grandeur-design-reveal",
        sourceLabel: "현대자동차그룹 공식 발표",
    },
};
const detailBeforeChangeOutlook = detail;
detail = function (id) {
    const html = detailBeforeChangeOutlook(id);
    const c = cars.find((car) => car.id === id);
    if (!c || c.classic) return html;
    const outlook = modelChangeOutlook[c.brand + "|" + c.name] || {};
    const content =
        '<section class="change-outlook"><div class="eyebrow">NEXT MODEL</div><h2>다음 모델 변경 전망</h2><div class="change-outlook-grid"><div><span>부분변경 · F/L</span><strong>' +
        esc(outlook.facelift || "예상 시기 확인 중") +
        "</strong></div><div><span>완전변경 · 풀체인지</span><strong>" +
        esc(outlook.full || "예상 시기 확인 중") +
        "</strong></div></div><p>" +
        esc(outlook.note || "확인할 수 있는 발표나 보도가 없어 예상 시기를 표시하지 않습니다.") +
        "</p>" +
        (outlook.source
            ? '<a href="' +
              esc(outlook.source) +
              '" target="_blank" rel="noopener noreferrer">' +
              esc(outlook.sourceLabel) +
              " ↗</a>"
            : "") +
        "<small>확인일 2026.11.17 · 전망은 변경될 수 있으며 생산 시기와 국내 출시일은 다를 수 있습니다.</small></section>";
    const at = html.lastIndexOf("</div>");
    return at < 0 ? html + content : html.slice(0, at) + content + html.slice(at);
};
const optionsSelection = {};
const displayOptionPrice = (value, missing) =>
    !value ? missing : /^[\d,]+$/.test(value.trim()) ? value + "원" : value;
const detailBeforeOptions = detail;
detail = function (id) {
    let html = detailBeforeOptions(id);
    const c = cars.find((car) => car.id === id);
    if (!c) return html;
    const power = c.variants ? powerSelection[id] || Object.keys(c.variants)[0] : "";
    const selected = c.variants ? c.variants[power] : c.naver;
    const dedicatedModelId = c.danawaOptionIds && c.danawaOptionIds[power];
    const modelId = dedicatedModelId || c.danawaId;
    const yearKey = selectedModelYears[id + "|" + power];
    let expectedYear = !c.danawa && selected?.year;
    if (yearKey && yearKey !== "current") {
        const danawaYear = yearKey.match(/^danawa-year-(\d{4})$/)?.[1];
        const sourceId = selected?.source?.match(/car_\d+/)?.[0];
        const old = sourceId && (expandedHistoryById[sourceId] || []).find((row) => row.modelId === yearKey);
        expectedYear = danawaYear || old?.year || expectedYear;
    }
    let available = modelId ? collectedOptions[modelId] || [] : [];
    if (power && !dedicatedModelId) {
        if (/하이브리드/.test(power)) available = available.filter((lineup) => /하이브리드|hybrid/i.test(lineup.label));
        else if (/전기/.test(power))
            available = available.filter((lineup) => /전기|electric|\bEV\b/i.test(lineup.label));
        else available = available.filter((lineup) => !/하이브리드|hybrid|전기|electric|\bEV\b/i.test(lineup.label));
    }
    if (expectedYear && /^\d{4}$/.test(expectedYear))
        available = available.filter((lineup) => lineup.label.includes(expectedYear));
    available = available.filter(
        (lineup, index, all) =>
            all.findIndex(
                (other) => other.label === lineup.label && JSON.stringify(other.trims) === JSON.stringify(lineup.trims),
            ) === index,
    );
    const stateKey = id + "|" + power + "|" + (expectedYear || "all");
    const choice = Math.min(optionsSelection[stateKey]?.lineup || 0, Math.max(available.length - 1, 0));
    const lineup = available[choice];
    const trimIndex = Math.min(optionsSelection[stateKey]?.trim || 0, Math.max((lineup?.trims.length || 1) - 1, 0));
    const trim = lineup?.trims[trimIndex];
    let content = '<section class="options-section"><div class="eyebrow">TRIMS &amp; OPTIONS</div><h2>트림과 옵션</h2>';
    if (c.special?.id === "kltv" && (specialSelection[id] || 0) === 0) {
        content +=
            '<p class="sub">소형전술차 지휘 4인승 · 기아 특수차량 공식 자료</p><div class="options-card"><h3>선택 품목</h3><div class="options-list"><div><span>윈치</span><strong>가격 확인 필요</strong></div></div><p class="meta">기아가 옵션으로 명시한 항목입니다. 다른 파생형에 같은 사양이 적용된다고 단정할 수 없습니다.</p></div><a class="link" href="https://special.kia.com/kr/kltv/bulletproof-command-vehicle" target="_blank" rel="noopener noreferrer">기아 특수차량 공식 정보 ↗</a>';
    } else if (!trim) {
        content += '<p class="sub">선택한 차량과 연식에 맞는 옵션 정보를 아직 확인하지 못했습니다.</p>';
    } else {
        content +=
            '<p class="sub">다나와 자동차 가격표에 표시된 라인업과 트림을 선택하세요.</p><label class="options-label">라인업 <select data-option-lineup>' +
            available
                .map(
                    (row, i) =>
                        '<option value="' +
                        i +
                        '" ' +
                        (choice === i ? "selected" : "") +
                        ">" +
                        esc(row.label || "라인업 " + (i + 1)) +
                        "</option>",
                )
                .join("") +
            '</select></label><div class="option-trims" role="group" aria-label="트림 선택">' +
            lineup.trims
                .map(
                    (row, i) =>
                        '<button type="button" data-option-trim="' +
                        i +
                        '" class="' +
                        (i === trimIndex ? "active" : "") +
                        '" aria-pressed="' +
                        (i === trimIndex) +
                        '">' +
                        esc(row.name) +
                        "</button>",
                )
                .join("") +
            '</div><div class="options-card"><h3>' +
            esc(trim.name) +
            '</h3><p class="meta">표시 가격 ' +
            esc(displayOptionPrice(trim.price, "정보 없음")) +
            "</p><h4>선택 품목</h4>" +
            (trim.options.length
                ? '<div class="options-list">' +
                  trim.options
                      .map(
                          (option) =>
                              "<div><span>" +
                              esc(option.name) +
                              (option.details?.length ? "<small>" + esc(option.details.join(" · ")) + "</small>" : "") +
                              "</span><strong>" +
                              esc(displayOptionPrice(option.price, "가격 확인 필요")) +
                              "</strong></div>",
                      )
                      .join("") +
                  "</div>"
                : '<p class="meta">수집된 선택 품목이 없거나 확인되지 않았습니다.</p>') +
            (trim.basic
                ? '<details><summary>기본 사양 보기</summary><p class="options-basic">' +
                  esc(trim.basic) +
                  "</p></details>"
                : '<p class="meta">기본 사양 정보는 확인되지 않았습니다.</p>') +
            '</div><p class="meta">표시된 라인업 기준 자료이며, 트림별 적용 조건·세금·선택 조합에 따라 달라질 수 있습니다. 자동 갱신되지 않습니다.</p><a class="link" href="https://auto.danawa.com/auto/?Work=model&amp;Model=' +
            esc(modelId) +
            '&amp;Tab=price" target="_blank" rel="noopener noreferrer">다나와 가격표 ↗</a>';
    }
    if (!c.classic) content += '<div class="options-estimate"><a class="dark" data-estimate-from-options href="#estimate/' + esc(id) + '">견적 내기 ↗</a><span>선택한 차량과 트림으로 예상 비용을 확인하세요.</span></div>';
    content += "</section>";
    const story = html.indexOf('<section class="history-section"><h2>이 차의 이야기');
    const researchTitle = html.indexOf('<h2>차량 정보 더 알아보기</h2>');
    const research = researchTitle < 0 ? -1 : html.lastIndexOf('<section', researchTitle);
    const candidates = [story, research].filter((position) => position >= 0);
    const at = candidates.length ? Math.min(...candidates) : html.lastIndexOf('</div>');
    return at < 0 ? html + content : html.slice(0, at) + content + html.slice(at);
};
document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-option-lineup]")) return;
    const id = location.hash.split("/")[1],
        c = cars.find((car) => car.id === id);
    if (!c) return;
    const power = c.variants ? powerSelection[id] || Object.keys(c.variants)[0] : "";
    const selected = c.variants ? c.variants[power] : c.naver;
    const yearKey = selectedModelYears[id + "|" + power];
    const sourceId = selected?.source?.match(/car_\d+/)?.[0];
    const old =
        yearKey &&
        yearKey !== "current" &&
        sourceId &&
        (expandedHistoryById[sourceId] || []).find((row) => row.modelId === yearKey);
    const year = yearKey?.match(/^danawa-year-(\d{4})$/)?.[1] || old?.year || (!c.danawa && selected?.year) || "all";
    optionsSelection[id + "|" + power + "|" + year] = { lineup: Number(event.target.value), trim: 0 };
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
});
document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-option-trim]");
    if (!button) return;
    const id = location.hash.split("/")[1],
        c = cars.find((car) => car.id === id);
    if (!c) return;
    const power = c.variants ? powerSelection[id] || Object.keys(c.variants)[0] : "";
    const selected = c.variants ? c.variants[power] : c.naver,
        yearKey = selectedModelYears[id + "|" + power];
    const sourceId = selected?.source?.match(/car_\d+/)?.[0];
    const old =
        yearKey &&
        yearKey !== "current" &&
        sourceId &&
        (expandedHistoryById[sourceId] || []).find((row) => row.modelId === yearKey);
    const year = yearKey?.match(/^danawa-year-(\d{4})$/)?.[1] || old?.year || (!c.danawa && selected?.year) || "all",
        key = id + "|" + power + "|" + year;
    optionsSelection[key] = { lineup: optionsSelection[key]?.lineup || 0, trim: Number(button.dataset.optionTrim) };
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
});
function higherQualityImage(source) {
    if (!source || typeof source !== "string") return source;
    const cleaned = source.replace(/(\.(?:png|jpe?g|webp)):(?=\?|$)/i, "$1");
    try {
        const url = new URL(cleaned);
        if (url.hostname === "imgauto-phinf.pstatic.net") url.searchParams.delete("type");
        if (url.hostname === "autoimg.danawa.com") {
            const id = url.pathname.match(/^\/photo\/(\d+)\/model_(?:100|200|360)\.png$/)?.[1];
            if (id && danawaQualityImages[id]) return danawaQualityImages[id];
        }
        return url.href;
    } catch {
        return cleaned;
    }
}
for (const c of cars) {
    c.officialImage = higherQualityImage(c.officialImage);
    for (const data of [c.naver, ...Object.values(c.variants || {})]) {
        if (data?.frames) data.frames = data.frames.map(higherQualityImage);
    }
    for (const variant of Object.values(c.danawaVariants || {})) variant.image = higherQualityImage(variant.image);
}
Object.assign(expandedHistoryById, classicHistory);
Object.assign(naverYearDetails, classicYearDetails);
Object.assign(vehicleMedia, classicMedia);
for (const item of classicCatalog) {
    cars.push({
        id: "classic-" + item.id,
        brand: item.brand,
        name: item.name,
        type: "단종 모델",
        classic: true,
        discontinuedSource: item.proof,
        naver: item.base,
        officialImage: higherQualityImage(item.image),
        imageSource: "네이버 자동차",
        priceDisplay: item.base.range + " · 당시 신차 가격",
    });
}
// Reuse already-collected model-year media for list cards as well as details.
const classicReferenceImages = {
    car_16621: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/brand/heritage/13-pony2-640x412.jpg',
    car_13269: 'https://img.carswp.com/daewoo/damas/daewoo_damas_2003_images_1_b.jpg',
    car_10616: 'https://imgauto-phinf.pstatic.net/20200806_259/auto_1596693453909VA9Yf_PNG/20200806145732_Rm6iwe8h.png',
};
for (const car of cars) {
    const ids = [car.naver, ...Object.values(car.variants || {})].map(data => data?.source?.match(/car_\d+/)?.[0]).filter(Boolean);
    const media = ids.map(id => vehicleMedia[id]).find(data => data?.photos?.length || data?.colors?.length || data?.frames?.length);
    if (!car.officialImage && media) car.officialImage = higherQualityImage(media.colors?.[0]?.image || media.frames?.[0] || media.photos?.[0]);
    const sourceId = car.naver?.source?.match(/car_\d+/)?.[0];
    if (!car.officialImage && sourceId && classicReferenceImages[sourceId]) car.officialImage = classicReferenceImages[sourceId];
    if (car.special?.id === 'heavy' && !car.special.image) {
        car.special.image = 'https://special.kia.com/img/heavy-bg1.png';
        car.officialImage = car.special.image;
    }
}
for (const [sourceId, rows] of Object.entries(expandedHistoryById)) {
    const owner = cars.find(car => car.naver?.source?.includes(sourceId));
    for (const row of rows) {
        if (row.image) continue;
        const media = vehicleMedia[row.modelId];
        const exact = media?.colors?.[0]?.image || media?.frames?.[0] || media?.photos?.[0];
        if (exact) { row.image = higherQualityImage(exact); continue; }

    }
}
const detailBeforeClassicNotice = detail;
detail = function (id) {
    const html = detailBeforeClassicNotice(id);
    const c = cars.find((car) => car.id === id);
    if (!c?.classic) return html;
    const notice =
        '<div class="classic-detail-note"><strong>차종 단종 모델</strong><span>표시 가격은 당시 신차 가격이며 현재 중고차 시세가 아닙니다.</span><a href="' +
        esc(c.discontinuedSource) +
        '" target="_blank" rel="noopener noreferrer">차량 자료 보기 ↗</a></div>';
    return html.replace('<div class="detail-top', notice + '<div class="detail-top');
};
document.addEventListener("click", (event) => {
    const open = event.target.closest("[data-classic-open]");
    if (open) {
        const id = open.dataset.classicOpen;
        if (!cars.some((car) => car.id === id && car.classic)) return;
        selectedModelYears[id + "|"] = open.dataset.classicModelYear;
        location.hash = "#car/" + id;
        return;
    }
    const more = event.target.closest("[data-classic-more]");
    if (more) {
        const current = classicYearLimit;
        const yearCount = new Set(
            cars
                .filter(
                    (car) =>
                        car.classic &&
                        (classicBrand === "전체" || car.brand === classicBrand) &&
                        (car.brand + " " + car.name).toLowerCase().includes(classicSearch.toLowerCase()),
                )
                .flatMap((car) => [
                    car.naver.year,
                    ...(classicHistory[car.naver.source.match(/car_\d+/)?.[0]] || []).map((row) => row.year),
                ])
                .filter(Boolean),
        ).size;
        classicYearLimit = current >= yearCount ? 5 : current + 5;
        const y = window.scrollY;
        render();
        window.scrollTo(0, y);
        return;
    }
    const button = event.target.closest("[data-classic-brand]");
    if (!button) return;
    classicBrand = button.dataset.classicBrand;
    classicYear = "전체";
    classicYearLimit = 5;
    render();
});
document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-classic-year-filter]")) return;
    classicYear = event.target.value;
    classicYearLimit = 5;
    render();
});
document.addEventListener("submit", (event) => {
    if (event.target.id !== "classic-search-form") return;
    event.preventDefault();
    classicSearch = new FormData(event.target).get("query").trim();
    classicYear = "전체";
    classicYearLimit = 5;
    render();
});
// 2027 KONA 2.0 gasoline base price, Hyundai official announcement.
const verifiedKona = cars.find(car => car.brand === '현대' && car.name === '코나');
if (verifiedKona) { verifiedKona.price = 2360; verifiedKona.priceSource = 'https://www.hyundaimotorgroup.com/ko/news/hyundai-motor-company-2027-kona-launch'; }
render();
observeSections();
