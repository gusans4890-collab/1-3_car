const historyCatalog = {
    "https://car.naver.com/home?ncrId=car_171299": [
        { year: "2025", name: "아이오닉 5", price: "4,740~6,272", efficiency: "4.4~5.2km/kWh" },
        { year: "2024", name: "아이오닉 5", price: "4,700~6,242", efficiency: "4.4~5.2km/kWh" },
        { year: "2023", name: "아이오닉 5", price: "5,005~6,120", efficiency: "4.7~5.2km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_169805": [
        { year: "2025", name: "G80", price: "5,899~8,579", efficiency: "8.2~10.5km/ℓ" },
        { year: "2024", name: "G80", price: "5,801~6,741", efficiency: "8.3~10.6km/ℓ" },
        { year: "2023", name: "G80", price: "5,548~6,488", efficiency: "8.4~10.8km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_168331": [
        { year: "2025", name: "BMW 5시리즈", price: "6,980~9,140", efficiency: "11.1~14.7km/ℓ" },
        { year: "2024", name: "BMW 5시리즈", price: "6,880~8,870", efficiency: "11.1~14.7km/ℓ" },
        { year: "2023", name: "BMW 5시리즈", price: "6,880~12,440", efficiency: "7.9~15.6km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_167515": [
        { year: "2025", name: "메르세데스-벤츠 E클래스", price: "6,900~12,560", efficiency: "10.5~16km/ℓ" },
        { year: "2024", name: "메르세데스-벤츠 E클래스", price: "7,390~12,300", efficiency: "10.5~15.4km/ℓ" },
        { year: "2023", name: "메르세데스-벤츠 E클래스", price: "7,050~11,570", efficiency: "9.7~13.7km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_172121": [
        { year: "2026", name: "쏘렌토 하이브리드", price: "3,953~4,957", efficiency: "13.8~15.7km/ℓ" },
        { year: "2025", name: "쏘렌토 하이브리드", price: "3,867~4,854", efficiency: "13.8~15.7km/ℓ" },
        { year: "2024", name: "쏘렌토 하이브리드", price: "3,786~4,831", efficiency: "13.8~15.7km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_171091": [
        { year: "2026", name: "그랜저", price: "3,798~5,302", efficiency: "7.8~11.7km/ℓ" },
        { year: "2025", name: "그랜저", price: "3,711~5,241", efficiency: "7.8~11.7km/ℓ" },
        { year: "2023", name: "그랜저", price: "3,743~5,103", efficiency: "7.8~11.7km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_167675": [
        { year: "2027", name: "레이", price: "1,480~2,060", efficiency: "12.6~12.9km/ℓ" },
        { year: "2025", name: "레이", price: "1,340~1,928", efficiency: "12.6~12.9km/ℓ" },
        { year: "2024", name: "레이", price: "1,330~1,865", efficiency: "12.7~13km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_171465": [
        { year: "2026", name: "K5", price: "2,724~3,546", efficiency: "9.5~13.7km/ℓ" },
        { year: "2025", name: "K5", price: "2,724~3,546", efficiency: "9.5~13.7km/ℓ" },
        { year: "2024", name: "K5", price: "2,784~3,526", efficiency: "9.5~13.7km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_171025": [
        { year: "2026", name: "K8 하이브리드", price: "4,206~5,052", efficiency: "16.1~18.1km/ℓ" },
        { year: "2025", name: "K8 하이브리드", price: "4,206~4,988", efficiency: "16.1~18.1km/ℓ" },
        { year: "2024", name: "K8 하이브리드", price: "3,782~4,617", efficiency: "17.1~18km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_170353": [
        { year: "2025", name: "K9", price: "5,871~7,882", efficiency: "8.1~9km/ℓ" },
        { year: "2024", name: "K9", price: "5,843~7,751", efficiency: "8.1~9km/ℓ" },
        { year: "2023", name: "K9", price: "5,815~7,744", efficiency: "8.1~9km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_167673": [
        { year: "2027", name: "레이 EV", price: "2,807~3,062", efficiency: "5.1km/kWh" },
        { year: "2025", name: "레이 EV", price: "2,735~2,955", efficiency: "5.1km/kWh" },
        { year: "2024", name: "레이 EV", price: "2,735~2,955", efficiency: "5.1km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_170301": [
        { year: "2025", name: "EV3", price: "3,995~4,895", efficiency: "5.1~5.4km/kWh" },
        { year: "2024", name: "EV3", price: "3,995~4,850", efficiency: "5.1~5.4km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_170303": [
        { year: "2025", name: "EV4", price: "4,042~5,031", efficiency: "5.4~5.8km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_170307": [
        { year: "2025", name: "EV9", price: "6,412~7,917", efficiency: "3.8~4.2km/kWh" },
        { year: "2024", name: "EV9", price: "7,337~8,397", efficiency: "3.8~4.2km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_170593": [
        { year: "2025", name: "일렉트리파이드 G80", price: "8,468~8,468", efficiency: "4.4km/kWh" },
        { year: "2024", name: "일렉트리파이드 G80", price: "8,392~8,392", efficiency: "4.3km/kWh" },
        { year: "2023", name: "일렉트리파이드 G80", price: "8,392~8,392", efficiency: "4.3km/kWh" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_171487": [
        { year: "2026", name: "GV70", price: "5,473~6,323", efficiency: "8.5~10.2km/ℓ" },
        { year: "2025", name: "GV70", price: "5,298~6,148", efficiency: "8.5~10.2km/ℓ" },
        { year: "2024", name: "GV70", price: "5,040~5,989", efficiency: "8.6~13.6km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_170757": [
        { year: "2026", name: "GV60", price: "6,490~7,330", efficiency: "4~5.1km/kWh" },
        { year: "2025", name: "GV60", price: "6,490~7,330", efficiency: "4~5.1km/kWh" },
        { year: "2024", name: "GV60", price: "6,433~7,343", efficiency: "4.1~5.1km/kWh" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_170849": [
        { year: "2025", name: "G90", price: "9,617~13,437", efficiency: "8~9.3km/ℓ" },
        { year: "2024", name: "G90", price: "9,397~13,657", efficiency: "8.2~9.3km/ℓ" },
        { year: "2023", name: "G90", price: "9,445~10,384", efficiency: "8.4~9.3km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_169853": [
        { year: "2025", name: "G70", price: "4,281~5,023", efficiency: "8.8~11.2km/ℓ" },
        { year: "2024", name: "G70", price: "4,347~5,089", efficiency: "8.8~11.2km/ℓ" },
        { year: "2023", name: "G70", price: "4,347~5,089", efficiency: "8.8~11.2km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_169851": [
        { year: "2025", name: "G70 슈팅브레이크", price: "4,476~4,723", efficiency: "10.1~10.9km/ℓ" },
        { year: "2024", name: "G70 슈팅브레이크", price: "4,545~4,792", efficiency: "10.1~10.9km/ℓ" },
        { year: "2023", name: "G70 슈팅브레이크", price: "4,545~4,792", efficiency: "10.1~10.9km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_168347": [
        { year: "2025", name: "BMW 1시리즈", price: "4,840~6,450", efficiency: "10.3~12km/ℓ" },
        { year: "2024", name: "BMW 1시리즈", price: "5,070~6,180", efficiency: "10~11km/ℓ" },
        { year: "2023", name: "BMW 1시리즈", price: "4,730~6,190", efficiency: "10~11km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_168341": [
        { year: "2025", name: "BMW 3시리즈", price: "5,790~8,830", efficiency: "12~15.2km/ℓ" },
        { year: "2024", name: "BMW 3시리즈", price: "5,700~8,480", efficiency: "10.4~15km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_168317": [
        { year: "2025", name: "BMW X1", price: "5,910~7,220", efficiency: "10.2~14.8km/ℓ" },
        { year: "2024", name: "BMW X1", price: "5,820~7,580", efficiency: "10.2~14.6km/ℓ" },
        { year: "2023", name: "BMW X1", price: "5,840~6,410", efficiency: "11.7~14.6km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_168843": [
        { year: "2025", name: "BMW X3", price: "6,850~9,870", efficiency: "10.6~14km/ℓ" },
        { year: "2024", name: "BMW X3", price: "7,000~9,890", efficiency: "9.2~12.2km/ℓ" },
        { year: "2023", name: "BMW X3", price: "6,950~9,890", efficiency: "9.2~12.2km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_168831": [
        { year: "2025", name: "BMW X5", price: "11,780~15,900", efficiency: "7.5~11.6km/ℓ" },
        { year: "2024", name: "BMW X5", price: "11,610~16,060", efficiency: "7.5~11.6km/ℓ" },
        { year: "2023", name: "BMW X5", price: "11,550~15,400", efficiency: "6.6~10.7km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_168827": [
        { year: "2025", name: "BMW X6", price: "12,650~16,270", efficiency: "7.8~11.9km/ℓ" },
        { year: "2024", name: "BMW X6", price: "12,580~16,410", efficiency: "7.8~11.9km/ℓ" },
        { year: "2023", name: "BMW X6", price: "12,310~15,600", efficiency: "7~10.9km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_168839": [
        { year: "2025", name: "BMW X7", price: "14,990~19,660", efficiency: "6.9~10km/ℓ" },
        { year: "2024", name: "BMW X7", price: "14,850~18,080", efficiency: "6.9~10km/ℓ" },
        { year: "2023", name: "BMW X7", price: "14,720~18,100", efficiency: "6.9~10km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_170249": [
        { year: "2025", name: "메르세데스-벤츠 C클래스", price: "6,280~6,590", efficiency: "12km/ℓ" },
        { year: "2024", name: "메르세데스-벤츠 C클래스", price: "6,200~7,600", efficiency: "11.1~11.7km/ℓ" },
        { year: "2023", name: "메르세데스-벤츠 C클래스", price: "6,120~7,701", efficiency: "11.2~11.7km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_170271": [
        { year: "2026", name: "메르세데스-벤츠 S클래스", price: "15,500~26,000", efficiency: "8~13km/ℓ" },
        { year: "2025", name: "메르세데스-벤츠 S클래스", price: "15,160~25,360", efficiency: "8~13km/ℓ" },
        { year: "2024", name: "메르세데스-벤츠 S클래스", price: "15,950~24,750", efficiency: "8~12.6km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_170197": [
        { year: "2025", name: "메르세데스-벤츠 EQE SUV", price: "11,310~13,620", efficiency: "4.1km/kWh" },
        { year: "2024", name: "메르세데스-EQ EQE SUV", price: "10,850~13,290", efficiency: "3.8~3.9km/kWh" },
        { year: "2023", name: "메르세데스-EQ EQE SUV", price: "10,990~13,400", efficiency: "3.8km/kWh" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_166655": [
        { year: "2025", name: "메르세데스-벤츠 GLA", price: "6,910~6,910", efficiency: "10.9km/ℓ" },
        { year: "2024", name: "메르세데스-벤츠 GLA", price: "6,790~6,790", efficiency: "10.8km/ℓ" },
        { year: "2023", name: "메르세데스-벤츠 GLA", price: "6,540~6,540", efficiency: "10.3km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_167279": [
        { year: "2025", name: "메르세데스-벤츠 GLB", price: "6,010~7,110", efficiency: "10.5~14.2km/ℓ" },
        { year: "2024", name: "메르세데스-벤츠 GLB", price: "6,210~6,980", efficiency: "10.5~14.2km/ℓ" },
        { year: "2023", name: "메르세데스-벤츠 GLB", price: "6,010~6,890", efficiency: "9.9~14.2km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_167507": [
        { year: "2025", name: "메르세데스-벤츠 CLE", price: "7,420~9,820", efficiency: "10.9~11.7km/ℓ" },
        { year: "2024", name: "메르세데스-벤츠 CLE", price: "7,270~9,600", efficiency: "10.9~12.1km/ℓ" },
        { year: "2023", name: "메르세데스-벤츠 CLE", price: "57,650~69,350", efficiency: "5.2~8.6ℓ/100km" },
    ],
    "https://car.naver.com/home?ncrId=car_171409": [
        { year: "2026", name: "아반떼", price: "2,062~2,882", efficiency: "10.2~15km/ℓ" },
        { year: "2025", name: "아반떼", price: "1,964~2,783", efficiency: "10.3~15km/ℓ" },
        { year: "2023", name: "아반떼", price: "1,975~2,818", efficiency: "10.3~15.3km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_167089": [
        { year: "2025", name: "싼타페", price: "3,492~4,598", efficiency: "9.7~11km/ℓ" },
        { year: "2024", name: "싼타페", price: "3,546~4,596", efficiency: "9.7~11km/ℓ" },
        { year: "2023", name: "싼타페", price: "3,277~4,472", efficiency: "9.5~14.1km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_165575": [
        { year: "2025", name: "아반떼 N", price: "3,309~3,517", efficiency: "10.4~10.6km/ℓ" },
        { year: "2023", name: "아반떼 N", price: "3,352~3,560", efficiency: "10.4~10.6km/ℓ" },
        { year: "2021", name: "아반떼 N", price: "3,212~3,402", efficiency: "10.4~10.7km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_172107": [
        { year: "2026", name: "스포티지 하이브리드", price: "3,395~4,276", efficiency: "14.3~16.3km/ℓ" },
        { year: "2025", name: "스포티지 하이브리드", price: "3,305~4,168", efficiency: "14.3~16.3km/ℓ" },
        { year: "2024", name: "스포티지 하이브리드", price: "3,213~4,054", efficiency: "15.2~16.7km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_171721": [
        { year: "2026", name: "PV5 패신저", price: "4,540~4,990", efficiency: "4.5km/kWh" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_170343": [
        { year: "2024", name: "티볼리", price: "1,872~3,100", efficiency: "9.4~12km/ℓ" },
        { year: "2023", name: "티볼리", price: "2,134~2,730", efficiency: "10.8~12km/ℓ" },
        { year: "2022", name: "티볼리", price: "1,659~2,613", efficiency: "10.8~12.5km/ℓ" },
    ],
    "https://car.naver.com/home?a=owner-review&ncrId=car_169649": [
        { year: "2005", name: "무쏘", price: "1,595~2,506", efficiency: "9.1~10.8km/ℓ" },
        { year: "2003", name: "무쏘", price: "1,505~2,657", efficiency: "11.7km/ℓ" },
        { year: "1993", name: "무쏘", price: "1,590~1,690", efficiency: "16.9~18.1km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_167861": [
        { year: "2027", name: "그랑 콜레오스 하이브리드 E-Tech", price: "3,905~4,574", efficiency: "15~15.7km/ℓ" },
        { year: "2025", name: "그랑 콜레오스 하이브리드 E-Tech", price: "3,760~4,406", efficiency: "15~15.7km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_165009": [
        { year: "2025", name: "볼보 XC60", price: "6,440~7,650", efficiency: "9.9~10.1km/ℓ" },
        { year: "2024", name: "볼보 XC60", price: "6,390~7,400", efficiency: "9.4~10.1km/ℓ" },
        { year: "2023", name: "볼보 XC60", price: "6,290~7,300", efficiency: "9.1~9.9km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_169731": [
        { year: "2025", name: "렉서스 LX 하이브리드", price: "16,587~19,457", efficiency: "8km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_168463": [
        { year: "2025", name: "렉서스 LM 하이브리드", price: "14,800~19,600", efficiency: "10.1km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_170359": [
        { year: "2025", name: "렉서스 RX 하이브리드", price: "8,675~9,743", efficiency: "13.6~14.7km/ℓ" },
        { year: "2024", name: "렉서스 RX 하이브리드", price: "9,743~9,743", efficiency: "13.6km/ℓ" },
        { year: "2023", name: "렉서스 RX 하이브리드", price: "9,870~9,870", efficiency: "13.6km/ℓ" },
    ],
    "https://car.naver.com/home?a=owner-review&ncrId=car_169855": [
        { year: "2025", name: "렉서스 NX 하이브리드", price: "6,740~7,670", efficiency: "14km/ℓ" },
        { year: "2024", name: "렉서스 NX 하이브리드", price: "6,670~7,630", efficiency: "14km/ℓ" },
        { year: "2023", name: "렉서스 NX 하이브리드", price: "6,670~7,630", efficiency: "14km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_170367": [
        { year: "2026", name: "렉서스 UX 하이브리드", price: "5,212~5,212", efficiency: "18km/ℓ" },
        { year: "2025", name: "렉서스 UX 하이브리드", price: "5,240~5,240", efficiency: "18km/ℓ" },
        { year: "2024", name: "렉서스 UX 하이브리드", price: "5,090~5,860", efficiency: "15~16.7km/ℓ" },
    ],
    "https://car.naver.com/home?a=owner-review&ncrId=car_169483": [
        { year: "2025", name: "토요타 캠리 하이브리드", price: "4,800~5,360", efficiency: "17.1km/ℓ" },
        { year: "2023", name: "토요타 캠리 하이브리드", price: "3,900~4,520", efficiency: "17.1~18.5km/ℓ" },
    ],
    "https://car.naver.com/home?a=grade-trim&ncrId=car_166287": [
        { year: "2025", name: "토요타 라브4 하이브리드", price: "4,415~4,998", efficiency: "14.1~14.5km/ℓ" },
        { year: "2024", name: "토요타 라브4 하이브리드", price: "4,415~4,998", efficiency: "15.1~16.1km/ℓ" },
        { year: "2023", name: "토요타 라브4 하이브리드", price: "4,380~4,950", efficiency: "15.1~16.1km/ℓ" },
    ],
    "https://car.naver.com/home?ncrId=car_169735": [
        { year: "2025", name: "테슬라 모델 3", price: "5,199~6,939", efficiency: "4.8~5.4km/kWh" },
        { year: "2024", name: "테슬라 모델 3", price: "5,199~6,939", efficiency: "4.8~5.7km/kWh" },
        { year: "2023", name: "테슬라 모델 3", price: "6,034~7,594", efficiency: "5.1~5.7km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_169737": [
        { year: "2025", name: "테슬라 모델 Y", price: "5,299~7,300", efficiency: "5.4~5.6km/kWh" },
        { year: "2024", name: "테슬라 모델 Y", price: "5,299~7,199", efficiency: "4.9~5.1km/kWh" },
        { year: "2023", name: "테슬라 모델 Y", price: "5,699~8,534", efficiency: "4.8~5.4km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_167353": [
        { year: "2024", name: "테슬라 사이버트럭", price: "60,990~99,990", efficiency: "" },
    ],
    "https://car.naver.com/home?ncrId=car_170289": [
        { year: "2025", name: "BMW i4", price: "7,830~8,750", efficiency: "4.5km/kWh" },
        { year: "2024", name: "BMW i4", price: "8,110~8,110", efficiency: "4.6km/kWh" },
        { year: "2023", name: "BMW i4", price: "7,730~7,730", efficiency: "4.6km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_164871": [
        { year: "2025", name: "BMW iX", price: "15,220~15,220", efficiency: "3.7km/kWh" },
        { year: "2024", name: "BMW iX", price: "14,990~14,990", efficiency: "3.7km/kWh" },
        { year: "2023", name: "BMW iX", price: "14,890~14,890", efficiency: "3.6km/kWh" },
    ],
    "https://car.naver.com/home?ncrId=car_167761": [
        { year: "2025", name: "BMW iX3", price: "8,240~8,240", efficiency: "4.1km/kWh" },
        { year: "2024", name: "BMW iX3", price: "8,260~8,460", efficiency: "4.1km/kWh" },
        { year: "2023", name: "BMW iX3", price: "8,260~8,260", efficiency: "4.1km/kWh" },
    ],
};
