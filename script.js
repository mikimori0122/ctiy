const cities = [
    { name: "渋谷", image: "assets/pickups/shibuya_pickup.PNG" },
    { name: "舞鶴", image: "assets/pickups/maiduru_pickup.PNG" },
    { name: "鎌倉", image: "assets/pickups/kamakura_pickup.PNG" },
    { name: "伊勢", image: "assets/pickups/ise_pickup.PNG" },
    { name: "富岡", image: "assets/pickups/tomioka_pickup.PNG" },
    { name: "今治", image: "assets/pickups/imabari_pickup.PNG" }
];

let currentIndex = 0;
let pickupAutoTimer = null;

const husouMessages = [
    "甘いものが食べたいです。",
    "市長、今日の予定を確認しましょう。",
    "財源の使い道は慎重に決めたいですね。",
    "議会の準備は整っています。",
    "住民の声に、しっかり耳を傾けましょう。",
    "少し休憩したら、また頑張れます。",
    "新しい自治体との出会いが楽しみです。",
    "戦いは準備で半分決まります。"
];

let husouMessageIndex = 0;

function changeHusouMessage(){
    const message = document.getElementById("husouMessage");
    if(!message) return;

    husouMessageIndex = (husouMessageIndex + 1) % husouMessages.length;
    message.classList.remove("talking");
    void message.offsetWidth;
    message.textContent = husouMessages[husouMessageIndex];
    message.classList.add("talking");
    playGameSound("click");
}

function updateBanner(direction){
    const city = cities[currentIndex];

    const imageElement = document.getElementById("cityImage");

    if(imageElement && direction){
        const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
        const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

        imageElement.classList.remove(
            "slide-out-left",
            "slide-out-right",
            "slide-in-left",
            "slide-in-right"
        );
        imageElement.classList.add(outClass);

        setTimeout(function(){
            imageElement.src = city.image;
            imageElement.alt = city.name;
            imageElement.classList.remove(outClass);
            imageElement.classList.add(inClass);

            setTimeout(function(){
                imageElement.classList.remove(inClass);
            }, 420);
        }, 240);

        return;
    }

    if(imageElement){
        imageElement.src = city.image;
        imageElement.alt = city.name;
    }
}

function nextCity(){
    currentIndex++;
    if(currentIndex >= cities.length) currentIndex = 0;
    updateBanner("next");
}

function prevCity(){
    currentIndex--;
    if(currentIndex < 0) currentIndex = cities.length - 1;
    updateBanner("prev");
}

function startPickupAutoSlide(){
    const imageElement = document.getElementById("cityImage");

    if(!imageElement) return;

    if(pickupAutoTimer){
        clearInterval(pickupAutoTimer);
    }

    pickupAutoTimer = setInterval(function(){
        nextCity();
    }, 5000);
}

// ガチャ結果用
const municipalities = {
    "N": [
        "西粟倉",
        "九戸",
        "京丹波",
        "関ケ原",
        "西目屋",
        "能登",
        "金武",
        "苅田"
    ],
    "R": [
        "真田",
        "東栄",
        "津和野",
        "中之条",
        "播磨",
        "川南",
        "苓北"
    ],
    "SR": [
        "つがる",
        "遠野",
        "天童",
        "宇都宮",
        "銚子",
        "行田",
        "軽井沢",
        "魚沼",
        "浜松",
        "関",
        "吹田",
        "芦屋",
        "備前",
        "下関",
        "三好",
        "糸島",
        "日南",
        "屋久島"
    ],
    "SSR": [
        "函館",
        "男鹿",
        "花巻",
        "仙台",
        "会津若松",
        "つくば",
        "甲府",
        "小松",
        "豊田",
        "勝山",
        "富山",
        "奈良",
        "新宮",
        "近江八幡",
        "姫路",
        "岡山",
        "呉",
        "境港",
        "出雲",
        "高松",
        "四万十",
        "神埼",
        "佐世保",
        "別府",
        "上天草",
        "名護"
    ],
    "LR": [
        "渋谷",
        "舞鶴",
        "鎌倉",
        "伊勢",
        "富岡",
        "今治"
    ]
};


const municipalityNameAliases = {
    "荵晄虻": "九戸",
    "莠ｬ荳ｹ豕｢": "京丹波",
    "閭ｽ逋ｻ": "能登",
    "驥第ｭｦ": "金武",
    "逵溽伐": "真田",
    "豢･蜥碁㍽": "津和野",
    "荳ｭ荵区擅": "中之条",
    "謦ｭ逎ｨ": "播磨",
    "蟾晏漉": "川南",
    "闍灘圏": "苓北",
    "縺､縺後ｋ": "つがる",
    "螟ｩ遶･": "天童",
    "陦檎伐": "行田",
    "霆ｽ莠墓ｲ｢": "軽井沢",
    "鬲壽ｲｼ": "魚沼",
    "豬懈收": "浜松",
    "髢｢": "関",
    "蜷ｹ逕ｰ": "吹田",
    "蛯吝燕": "備前",
    "荳矩未": "下関",
    "荳牙･ｽ": "三好",
    "邉ｸ蟲ｶ": "糸島",
    "蜃ｽ鬢ｨ": "函館",
    "逕ｷ鮖ｿ": "男鹿",
    "闃ｱ蟾ｻ": "花巻",
    "莉吝床": "仙台",
    "莨壽ｴ･闍･譚ｾ": "会津若松",
    "蟆乗收": "小松",
    "雎顔伐": "豊田",
    "蜍晏ｱｱ": "勝山",
    "蟇悟ｱｱ": "富山",
    "螂郁憶": "奈良",
    "譁ｰ螳ｮ": "新宮",
    "蟋ｫ霍ｯ": "姫路",
    "蟯｡螻ｱ": "岡山",
    "蜃ｺ髮ｲ": "出雲",
    "鬮俶收": "高松",
    "逾槫涵": "神埼",
    "蜷崎ｭｷ": "名護",
    "貂玖ｰｷ": "渋谷",
    "闊樣ｶｴ": "舞鶴",
    "莨雁兇": "伊勢",
    "蟇悟ｲ｡": "富岡",
    "莉頑ｲｻ": "今治"
};

function normalizeMunicipalityName(city){
    return municipalityNameAliases[city] || city;
}

function parseStoredJson(value, fallback){
    if(!value) return fallback;

    try{
        return JSON.parse(value);
    }catch(e){
        return fallback;
    }
}

function getOwnedMunicipalities(){
    const savedOwned = localStorage.getItem("ownedMunicipalities");

    if(savedOwned){
        const storedOwned = parseStoredJson(savedOwned, []);
        if(!Array.isArray(storedOwned)){
            saveOwnedMunicipalities([]);
            return [];
        }

        const owned = storedOwned.filter(function(item){
            return item && item.city;
        }).map(function(item){
            item.city = normalizeMunicipalityName(item.city);
            return item;
        });
        saveOwnedMunicipalities(owned);
        return owned;
    }

    return [];
}

function saveOwnedMunicipalities(owned){
    localStorage.setItem("ownedMunicipalities", JSON.stringify(owned));
}

function getFinancialResources(){
    return Number(localStorage.getItem("financialResources")) || 5000;
}

function formatMoney(amount){
    return String(amount) + "万円";
}

function updateFinancialResourceDisplays(){
    const elements = document.querySelectorAll("[data-financial-resource]");
    const amount = getFinancialResources();

    for(let i = 0; i < elements.length; i++){
        elements[i].textContent = formatMoney(amount);
    }
}

function addFinancialResources(amount){
    const nextAmount = getFinancialResources() + amount;
    localStorage.setItem("financialResources", nextAmount);
    updateFinancialResourceDisplays();
}

function getDuplicateConvertValue(rarity){
    const values = {
        N: 30,
        R: 80,
        SR: 200,
        SSR: 600,
        LR: 1800,
        "LR+": 2400
    };

    return values[rarity] || 30;
}

function addGachaResultsToOwned(results){
    const owned = getOwnedMunicipalities();

    for(let i = 0; i < results.length; i++){
        const result = results[i];
        const current = owned.find(function(item){
            return item.city === result.city;
        });

        if(current){
            current.friendship = current.friendship || 1;
            current.level = current.level || 1;
            current.upgraded = current.upgraded || current.friendship >= 5;

            if(current.upgraded){
                addFinancialResources(getDuplicateConvertValue(getEffectiveRarity(current)));
            }else{
                current.count++;
            }
        }else{
            owned.push({
                city: result.city,
                rarity: result.rarity,
                count: 1,
                friendship: 1,
                level: 1,
                upgraded: false
            });
        }
    }

    saveOwnedMunicipalities(owned);
}

let totalGachaCount = Number(localStorage.getItem("totalGachaCount")) || 0;

function getRemainingUntil(step){
    const remainder = totalGachaCount % step;
    return remainder === 0 ? step : step - remainder;
}

function updateGachaPity(){
    const pityElement = document.getElementById("gachaPity");

    if(!pityElement) return;

    const ssrRemaining = getRemainingUntil(50);
    const lrRemaining = getRemainingUntil(100);

    pityElement.textContent =
        "あと" + ssrRemaining + "回でSSR、あと" + lrRemaining + "回でLR確定！";
}

window.addEventListener("load", function(){
    updateBanner();
    updateGachaPity();
    updateFinancialResourceDisplays();
    startPickupAutoSlide();
});

function getRarity(){
    totalGachaCount++;
    localStorage.setItem("totalGachaCount", totalGachaCount);

    if(totalGachaCount % 100 === 0) return "LR";

    if(totalGachaCount % 50 === 0){
        const roll = Math.random() * 100;
        if(roll < 20) return "LR";
        return "SSR";
    }

    if(totalGachaCount % 10 === 0){
        const roll = Math.random() * 100;
        if(roll < 2) return "LR";
        if(roll < 20) return "SSR";
        return "SR";
    }

    const roll = Math.random() * 100;

    if(roll < 0.3) return "LR";
    if(roll < 3.0) return "SSR";
    if(roll < 10.0) return "SR";
    if(roll < 40.0) return "R";

    return "N";
}

function createGachaResults(count){
    const results = [];

    for(let i = 0; i < count; i++){
        const rarity = getRarity();
        const list = municipalities[rarity];
        const city = list[Math.floor(Math.random() * list.length)];

        results.push({
            rarity: rarity,
            city: city
        });
    }

    return results;
}

function getHighestRarity(results){
    const rank = {
        N: 1,
        R: 2,
        SR: 3,
        SSR: 4,
        LR: 5
    };
    let highest = "N";

    for(let i = 0; i < results.length; i++){
        if(rank[results[i].rarity] > rank[highest]){
            highest = results[i].rarity;
        }
    }

    return highest;
}

function saveCurrentGachaResults(results){
    localStorage.setItem("lastGachaResults", JSON.stringify(results));
    localStorage.setItem("lastGachaSavedToOwned", "1");
}

function generateGacha(){

    const grid = document.getElementById("resultGrid");

    if(!grid) return;

    grid.innerHTML = "";

    const savedResults = localStorage.getItem("lastGachaResults");

    let results = [];

    if(savedResults){
        const storedResults = parseStoredJson(savedResults, []);
        results = Array.isArray(storedResults) ? storedResults : [];

        if(results.length === 0){
            results = createGachaResults(10);
            saveCurrentGachaResults(results);
            addGachaResultsToOwned(results);
        }
    }else{
        results = [];

        results = createGachaResults(10);

        saveCurrentGachaResults(results);
        addGachaResultsToOwned(results);
    }

    for(let i = 0; i < results.length; i++){

        const rarity = results[i].rarity;
        const city = results[i].city;

        const imageName = getImageName(city);
        const attribute = getAttribute(city);

        const card = document.createElement("div");
        card.className = "result-card " + rarity.toLowerCase();

        card.innerHTML =
            "<div class='result-image-wrap'>" +
                "<img class='attribute-bg' src='assets/backgrounds/bg_" + attribute + ".png' alt=''>" +
                "<img class='result-face' src='assets/faces/" + imageName + "_face.png' alt='" + city + "'>" +
                "<div class='result-stars'>" + getStars(rarity) + "</div>" +
            "</div>" +
            "<div class='result-name'>" + city + "</div>";

        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", city + "の仮表示を開く");

        const openReveal = function(){
            if(card.dataset.opening === "true") return;
            card.dataset.opening = "true";
            location.href = "reveal.html?count=" + results.length + "&index=" + i + "&from=result";
        };

        let touchStartX = 0;
        let touchStartY = 0;

        card.addEventListener("click", openReveal);
        card.addEventListener("touchstart", function(e){
            if(e.touches.length !== 1) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive:true });
        card.addEventListener("touchend", function(e){
            if(e.changedTouches.length !== 1) return;
            const touch = e.changedTouches[0];
            const moveX = Math.abs(touch.clientX - touchStartX);
            const moveY = Math.abs(touch.clientY - touchStartY);
            if(moveX > 12 || moveY > 12) return;
            e.preventDefault();
            openReveal();
        }, { passive:false });
        card.addEventListener("keydown", function(e){
            if(e.key === "Enter" || e.key === " "){
                e.preventDefault();
                openReveal();
            }
        });

        grid.appendChild(card);
    }
}
function getImageName(city){
    const nameMap = {
    "渋谷": "shibuya",
    "舞鶴": "maiduru",
    "鎌倉": "kamakura",
    "伊勢": "ise",
    "富岡": "tomioka",
    "今治": "imabari",
    "函館": "hakodate",
    "男鹿": "oga",
    "花巻": "hanamaki",
    "仙台": "sendai",
    "会津若松": "aiduwakamatsu",
    "つくば": "tsukuba",
    "甲府": "kouhu",
    "小松": "komatsu",
    "豊田": "toyoda",
    "勝山": "katsuyama",
    "富山": "toyama",
    "奈良": "nara",
    "新宮": "shinguu",
    "近江八幡": "oumihachiman",
    "姫路": "himezi",
    "岡山": "okayama",
    "呉": "kure",
    "境港": "sakaiminato",
    "出雲": "izumo",
    "高松": "takamatsu",
    "四万十": "shimanto",
    "神埼": "kanzaki",
    "佐世保": "sasebo",
    "別府": "beppu",
    "上天草": "kamiamakusa",
    "名護": "nago",
    "つがる": "tsugaru",
    "遠野": "toono",
    "天童": "tendou",
    "宇都宮": "utsunomiya",
    "銚子": "cyoushi",
    "行田": "gyouda",
    "軽井沢": "karuizawa",
    "魚沼": "uonuma",
    "浜松": "hamamatsu",
    "関": "seki",
    "吹田": "suita",
    "芦屋": "ashiya",
    "備前": "bizen",
    "下関": "shimonoseki",
    "三好": "miyoshi",
    "糸島": "itoshima",
    "日南": "nichinan",
    "屋久島": "yakushima",
    "真田": "sanada",
    "東栄": "touei",
    "津和野": "tsuwano",
    "中之条": "nakanozyou",
    "播磨": "harima",
    "川南": "kawaminami",
    "苓北": "reihoku",
    "西粟倉": "nishiawakura",
    "九戸": "kunohe",
    "京丹波": "kyoutanba",
    "関ケ原": "sekigahara",
    "西目屋": "nishimeya",
    "能登": "noto",
    "金武": "kin",
    "苅田": "karita"
};

    return nameMap[city];
}

function getAttribute(city){
    const attributeMap = {
    "渋谷": "fire",
    "舞鶴": "water",
    "鎌倉": "wind",
    "伊勢": "light",
    "富岡": "dark",
    "今治": "none",
    "函館": "water",
    "男鹿": "dark",
    "花巻": "dark",
    "仙台": "fire",
    "会津若松": "wind",
    "つくば": "dark",
    "甲府": "none",
    "小松": "none",
    "豊田": "none",
    "勝山": "none",
    "富山": "light",
    "奈良": "wind",
    "新宮": "dark",
    "近江八幡": "wind",
    "姫路": "light",
    "岡山": "fire",
    "呉": "water",
    "境港": "dark",
    "出雲": "light",
    "高松": "wind",
    "四万十": "water",
    "神埼": "light",
    "佐世保": "wind",
    "別府": "fire",
    "上天草": "water",
    "名護": "light",
    "つがる": "wind",
    "遠野": "dark",
    "天童": "dark",
    "宇都宮": "fire",
    "銚子": "water",
    "行田": "none",
    "軽井沢": "water",
    "魚沼": "wind",
    "浜松": "dark",
    "関": "fire",
    "吹田": "none",
    "芦屋": "light",
    "備前": "fire",
    "下関": "water",
    "三好": "light",
    "糸島": "none",
    "日南": "fire",
    "屋久島": "wind",
    "真田": "fire",
    "東栄": "dark",
    "津和野": "wind",
    "中之条": "dark",
    "播磨": "light",
    "川南": "none",
    "苓北": "light",
    "西粟倉": "water",
    "九戸": "fire",
    "京丹波": "wind",
    "関ケ原": "wind",
    "西目屋": "water",
    "能登": "fire",
    "金武": "fire",
    "苅田": "none"
};

    return attributeMap[city] || "none";
}

function getStars(rarity){

    let count = 1;

    if(rarity === "R") count = 2;
    if(rarity === "SR") count = 3;
    if(rarity === "SSR") count = 4;
    if(rarity === "LR") count = 5;

    let html = "";

    for(let i = 0; i < count; i++){
        html += "<img class='star-icon' src='assets/ui/star.png' alt='★'>";
    }

    return html;
}window.addEventListener("load", function(){
    document.body.classList.add("page-show");
});

document.addEventListener("click", function(e){

    const linkButton = e.target.closest("button[onclick*='location.href']");

    if(!linkButton) return;

    const onclickText = linkButton.getAttribute("onclick");
    const match = onclickText.match(/location\.href='(.+?)'/);

    if(!match) return;

    e.preventDefault();

    const targetUrl = match[1];

    document.body.classList.remove("page-show");
    document.body.classList.add("page-hide");

    setTimeout(function(){
        location.href = targetUrl;
    }, 350);
});let revealResults = [];
let revealIndex = 0;
let revealReady = true;
let revealToken = 0;
let revealStarTimers = [];
let revealCutinTimer = null;
let revealFromResult = false;

function startReveal(){

    const params = new URLSearchParams(window.location.search);
    const count = Number(params.get("count")) || 10;
    const savedResults = localStorage.getItem("lastGachaResults");
    let generatedOnReveal = false;

    if(savedResults){
        const parsedResults = parseStoredJson(savedResults, []);
        if(Array.isArray(parsedResults) && parsedResults.length === count){
            revealResults = parsedResults;
        }else{
            revealResults = createGachaResults(count);
            generatedOnReveal = true;
        }
    }else{
        revealResults = createGachaResults(count);
        generatedOnReveal = true;
    }

    saveCurrentGachaResults(revealResults);

    if(generatedOnReveal){
        addGachaResultsToOwned(revealResults);
    }

    const requestedIndex = Number(params.get("index"));
    revealFromResult = params.get("from") === "result";
    const skipButton = document.getElementById("revealSkipButton");
    if(skipButton){
        skipButton.textContent = revealFromResult ? "戻る" : "SKIP";
    }
    revealIndex = Number.isInteger(requestedIndex) && requestedIndex >= 0 && requestedIndex < revealResults.length ? requestedIndex : 0;
    showReveal();
}

function showReveal(){

    const result = revealResults[revealIndex];
    const token = ++revealToken;

    const imageName = getImageName(result.city);
    const attribute = getAttribute(result.city);
    const bgSrc = "assets/effects/effect_" + attribute + ".png";
    const characterSrc = "assets/characters/" + imageName + ".png";

    revealReady = false;
    clearRevealTimers();
    setRevealVisible(false);
    clearRevealStars();

    const showCard = function(){
        if(token !== revealToken) return;

        const revealBg = document.getElementById("revealBg");
        revealBg.src = bgSrc;
        revealBg.className = "reveal-bg";

        const revealScreen = document.querySelector(".reveal-screen");
        if(revealScreen){
            revealScreen.classList.remove("rarity-ssr", "rarity-lr");
            if(result.rarity === "SSR" || result.rarity === "LR"){
                revealScreen.classList.add("rarity-" + result.rarity.toLowerCase());
            }
        }

        document.getElementById("revealName").textContent =
            result.city;

        document.getElementById("revealImage").src = characterSrc;

        document.getElementById("revealImage").alt =
            result.city;

        setRevealVisible(true);
        showRevealStars(result.rarity, token);
        revealReady = true;
    };

    const revealAfterImagesReady = function(){
        preloadRevealAssets([bgSrc, characterSrc], function(){
            if(token !== revealToken) return;

            if(result.rarity === "SSR" || result.rarity === "LR"){
                playRarityCutin(result.rarity, result.city, showCard, token);
            }else{
                showCard();
            }
        });
    };

    revealAfterImagesReady();
}

function nextReveal(){

    if(!revealReady) return;

    revealIndex++;

    if(revealFromResult || revealIndex >= revealResults.length){
        location.href = "result.html";
        return;
    }

    showReveal();
}function startIntro(){

    const image = document.getElementById("introImage");
    const whiteout = document.getElementById("doorWhiteout");
    const telop = document.getElementById("introTelop");

    if(!image) return;

    const params = new URLSearchParams(window.location.search);
    const count = Number(params.get("count")) || 10;
    const introResults = createGachaResults(count);
    const highestRarity = getHighestRarity(introResults);
    const introLines = getIntroTelopLines(highestRarity);

    saveCurrentGachaResults(introResults);
    addGachaResultsToOwned(introResults);

    if(whiteout){
        whiteout.className = "rarity-" + highestRarity.toLowerCase();
    }

    // 1つ目のテロップ
    typeTelop(introLines[0].text, introLines[0].className);

    // 3秒後：2つ目のテロップ
    setTimeout(function(){
        typeTelop(introLines[1].text, introLines[1].className);
    }, 3000);

    // 6秒後：廊下へ
    setTimeout(function(){

        if(telop) telop.style.display = "none";

        image.src = "assets/cg/cg_corridor.png";
        image.classList.add("walking-corridor");

    }, 6000);

    // 10秒後：ホワイトアウト開始
    setTimeout(function(){

        if(whiteout){
            whiteout.classList.add("open");
        }

    }, 10000);

    // 11.6秒後：revealへ
    setTimeout(function(){

        location.href = "reveal.html?count=" + count;

    }, 11600);

}

function skipIntro(event){
    if(event) event.stopPropagation();

    const params = new URLSearchParams(window.location.search);
    const count = params.get("count") || 10;

    location.href = "reveal.html?count=" + count;
}

function skipReveal(event){
    if(event) event.stopPropagation();

    location.href = "result.html";
}

function setRevealVisible(visible){
    const image = document.getElementById("revealImage");
    const info = document.querySelector(".reveal-info");
    const bg = document.getElementById("revealBg");

    if(image) image.classList.toggle("is-hidden", !visible);
    if(info) info.classList.toggle("is-hidden", !visible);
    if(bg) bg.classList.toggle("is-hidden", !visible);
}

function getIntroTelopLines(highestRarity){
    if(highestRarity === "LR"){
        if(Math.random() < 0.5){
            return [
                { text:"選ばれし自治体に招聘要請を送信します", className:"telop-red" },
                { text:"まさかこの自治体が来てくれるなんて、、、！", className:"telop-gold" }
            ];
        }

        return [
            { text:"今日もいい天気ですね～", className:"telop-gold" },
            { text:"甘いものでも食べに行きましょう♪", className:"telop-rainbow" }
        ];
    }

    if(highestRarity === "SSR"){
        return [
            { text:"選ばれし自治体に招聘要請を送信します", className:"telop-red" },
            { text:"歴戦の自治体から返信が来ています！", className:"telop-red" }
        ];
    }

    return [
        { text:"全国の自治体へ招聘要請を送信します。", className:"" },
        { text:"招聘要請への応答を確認しました。", className:"" }
    ];
}

function clearRevealTimers(){
    for(let i = 0; i < revealStarTimers.length; i++){
        clearTimeout(revealStarTimers[i]);
    }

    revealStarTimers = [];

    if(revealCutinTimer){
        clearTimeout(revealCutinTimer);
        revealCutinTimer = null;
    }
}

function clearRevealStars(){
    const rarityBox = document.getElementById("revealRarity");

    if(rarityBox) rarityBox.innerHTML = "";
}

function preloadRevealAssets(srcList, callback){
    let remaining = srcList.length;

    if(remaining === 0){
        callback();
        return;
    }

    for(let i = 0; i < srcList.length; i++){
        const image = new Image();
        image.onload = image.onerror = function(){
            remaining--;
            if(remaining === 0) callback();
        };
        image.src = srcList[i];
    }
}

function playRarityCutin(rarity, city, callback, token){
    const cutin = document.getElementById("rarityCutin");
    const cutinText = document.getElementById("cutinText");

    if(!cutin || !cutinText){
        callback();
        return;
    }

    cutinText.textContent = getMunicipalityQuote(city);
    cutin.className = "rarity-cutin show " + rarity.toLowerCase();

    revealCutinTimer = setTimeout(function(){
        if(token !== revealToken) return;

        cutin.className = "rarity-cutin";
        callback();
    }, rarity === "LR" ? 2400 : 2100);
}
function showRevealStars(rarity, token){

    const rarityBox = document.getElementById("revealRarity");

    rarityBox.innerHTML = "";

    let count = 1;

    if(rarity === "R") count = 2;
    if(rarity === "SR") count = 3;
    if(rarity === "SSR") count = 4;
    if(rarity === "LR") count = 5;

    for(let i = 0; i < count; i++){

        const timer = setTimeout(function(){
            if(token !== revealToken) return;

            rarityBox.innerHTML +=
                "<img class='reveal-star pop-star' src='assets/ui/star.png' alt='★'>";

        }, i * 120);

        revealStarTimers.push(timer);
    }
}function typeTelop(text, className){

    const telopText = document.getElementById("telopText");

    if(!telopText) return;

    telopText.textContent = "";
    telopText.className = className || "";

    let index = 0;

    const timer = setInterval(function(){

        telopText.textContent += text[index];
        index++;

        if(index >= text.length){
            clearInterval(timer);
        }

    }, 45);
}

const formationSlotLabels = ["議長", "議員1", "議員2", "議員3", "議員4"];
let selectedFormationSlot = 0;
let selectedJinjiCity = "";

function getRarityByCity(city){
    const rarities = Object.keys(municipalities);

    for(let i = 0; i < rarities.length; i++){
        const rarity = rarities[i];
        if(municipalities[rarity].includes(city)) return rarity;
    }

    return "N";
}

function getNextRarity(rarity){
    const nextMap = {
        N: "R",
        R: "SR",
        SR: "SSR",
        SSR: "LR",
        LR: "LR+",
        "LR+": "LR+"
    };

    return nextMap[rarity] || rarity;
}

function getEffectiveRarity(member){
    const baseRarity = member.rarity || getRarityByCity(member.city);

    if(member.upgraded || member.friendship >= 5){
        return getNextRarity(baseRarity);
    }

    return baseRarity;
}

function getRarityRank(rarity){
    const ranks = {
        N: 1,
        R: 2,
        SR: 3,
        SSR: 4,
        LR: 5,
        "LR+": 6
    };

    return ranks[rarity] || 1;
}

function canUseAdvancedSkill(member){
    return getRarityRank(member.rarity) >= getRarityRank("SSR");
}

function getMunicipalityProfile(city){
    const profiles = {
    "渋谷": [
        "関東",
        "東京都"
    ],
    "舞鶴": [
        "関西",
        "京都府"
    ],
    "鎌倉": [
        "関東",
        "神奈川県"
    ],
    "伊勢": [
        "中部",
        "三重県"
    ],
    "富岡": [
        "関東",
        "群馬県"
    ],
    "今治": [
        "中国四国",
        "愛媛県"
    ],
    "函館": [
        "北海道東北",
        "北海道"
    ],
    "男鹿": [
        "北海道東北",
        "秋田県"
    ],
    "花巻": [
        "北海道東北",
        "岩手県"
    ],
    "仙台": [
        "北海道東北",
        "宮城県"
    ],
    "会津若松": [
        "北海道東北",
        "福島県"
    ],
    "つくば": [
        "関東",
        "茨城県"
    ],
    "甲府": [
        "中部",
        "山梨県"
    ],
    "小松": [
        "中部",
        "石川県"
    ],
    "豊田": [
        "中部",
        "愛知県"
    ],
    "勝山": [
        "中部",
        "福井県"
    ],
    "富山": [
        "中部",
        "富山県"
    ],
    "奈良": [
        "関西",
        "奈良県"
    ],
    "新宮": [
        "関西",
        "和歌山県"
    ],
    "近江八幡": [
        "関西",
        "滋賀県"
    ],
    "姫路": [
        "関西",
        "兵庫県"
    ],
    "岡山": [
        "中国四国",
        "岡山県"
    ],
    "呉": [
        "中国四国",
        "広島県"
    ],
    "境港": [
        "中国四国",
        "鳥取県"
    ],
    "出雲": [
        "中国四国",
        "島根県"
    ],
    "高松": [
        "中国四国",
        "香川県"
    ],
    "四万十": [
        "中国四国",
        "高知県"
    ],
    "神埼": [
        "九州",
        "佐賀県"
    ],
    "佐世保": [
        "九州",
        "長崎県"
    ],
    "別府": [
        "九州",
        "大分県"
    ],
    "上天草": [
        "九州",
        "熊本県"
    ],
    "名護": [
        "沖縄",
        "沖縄県"
    ],
    "つがる": [
        "北海道東北",
        "青森県"
    ],
    "遠野": [
        "北海道東北",
        "岩手県"
    ],
    "天童": [
        "北海道東北",
        "山形県"
    ],
    "宇都宮": [
        "関東",
        "栃木県"
    ],
    "銚子": [
        "関東",
        "千葉県"
    ],
    "行田": [
        "関東",
        "埼玉県"
    ],
    "軽井沢": [
        "中部",
        "長野県"
    ],
    "魚沼": [
        "中部",
        "新潟県"
    ],
    "浜松": [
        "中部",
        "静岡県"
    ],
    "関": [
        "中部",
        "岐阜県"
    ],
    "吹田": [
        "関西",
        "大阪府"
    ],
    "芦屋": [
        "関西",
        "兵庫県"
    ],
    "備前": [
        "中国四国",
        "岡山県"
    ],
    "下関": [
        "中国四国",
        "山口県"
    ],
    "三好": [
        "中国四国",
        "徳島県"
    ],
    "糸島": [
        "九州",
        "福岡県"
    ],
    "日南": [
        "九州",
        "宮崎県"
    ],
    "屋久島": [
        "九州",
        "鹿児島県"
    ],
    "真田": [
        "中部",
        "長野県"
    ],
    "東栄": [
        "中部",
        "愛知県"
    ],
    "津和野": [
        "中国四国",
        "島根県"
    ],
    "中之条": [
        "関東",
        "群馬県"
    ],
    "播磨": [
        "関西",
        "兵庫県"
    ],
    "川南": [
        "九州",
        "宮崎県"
    ],
    "苓北": [
        "九州",
        "熊本県"
    ],
    "西粟倉": [
        "中国四国",
        "岡山県"
    ],
    "九戸": [
        "北海道東北",
        "岩手県"
    ],
    "京丹波": [
        "関西",
        "京都府"
    ],
    "関ケ原": [
        "中部",
        "岐阜県"
    ],
    "西目屋": [
        "北海道東北",
        "青森県"
    ],
    "能登": [
        "中部",
        "石川県"
    ],
    "金武": [
        "沖縄",
        "沖縄県"
    ],
    "苅田": [
        "九州",
        "福岡県"
    ]
};
    const profile = profiles[city] || ["未設定", "未設定"];

    return {
        region: profile[0],
        prefecture: profile[1]
    };
}

function getMunicipalityQuote(city){
    const quotes = {
    "渋谷": "鋭眼アンサンブル響かすぜ！",
    "舞鶴": "全艦掃討準備…放て！",
    "鎌倉": "明鏡止水——静の極地、乱れり",
    "伊勢": "永遠が天上に祈りを捧げなさい",
    "富岡": "美味しそうな赤ワイン…飲んでいいよ…",
    "今治": "メインFSE、起動——",
    "函館": "幾億の夜景と凍りなさい",
    "男鹿": "悪い奴はいねえが〜！",
    "花巻": "どこまでも一緒に進んでいこう…",
    "仙台": "龍の誇りと共に…参る！",
    "会津若松": "美徳を以て誇りと為す！",
    "つくば": "あら、また壊れちゃった♪",
    "甲府": "全て護る",
    "小松": "直ちに掃討ヲ開始シマス",
    "豊田": "拳で語るのが良きリーダーというものよ",
    "勝山": "腹が減った！全部アタシに喰わせろォ！",
    "富山": "黒いものに価値なんて無いよ",
    "奈良": "キュゥゥゥゥ！！",
    "新宮": "臨兵闘者皆陣烈在前！",
    "近江八幡": "肩肘張らずゆっくり行こか",
    "姫路": "白き威厳に仰ぎなさい",
    "岡山": "…どきな。",
    "呉": "負けじ魂、此処に有り！",
    "境港": "おや、迷っちまったのかい？",
    "出雲": "いらっしゃいませ、神様",
    "高松": "罠の巣にしてやるよぉ！",
    "四万十": "ね、すっごくきれいな川でしょ？",
    "神埼": "我が導きに従いなさい",
    "佐世保": "花と光を差し上げますわ",
    "別府": "ここは何と微温い地獄か",
    "上天草": "イルカちゃん、ついてきて！",
    "名護": "ねぇ…いっしょに遊ぼうよぉ♪",
    "つがる": "また林檎落としちゃいました〜！",
    "遠野": "あっちさ行けば、いいことあるよ♪",
    "天童": "子供だからってナメないでよね！",
    "宇都宮": "哈！",
    "銚子": "大漁！大漁！",
    "行田": "うまい、うますぎる！",
    "軽井沢": "今日も良いパウダーだねぇ♪",
    "魚沼": "飯を無駄にするやつはたたっ斬る！",
    "浜松": "極上の音でイキるが良い！",
    "関": "この双剣、断てぬもの無し！",
    "吹田": "くるぞ、万博。",
    "芦屋": "おや、私に何か御用ですかな？",
    "備前": "フム…良い土じゃ…",
    "下関": "フッフッ、フグゥゥゥゥ！",
    "三好": "幾千の関門、受け切れるかしら？",
    "糸島": "コーヒーでも如何ですか？",
    "日南": "私を口説こうだなんて、勇敢ね",
    "屋久島": "ええっと、断ち切ります！",
    "真田": "燃え尽きるまで。",
    "東栄": "花祭りの熱、見せるよ。",
    "津和野": "森の静けさをまとって。",
    "中之条": "温泉の夢を見せてあげる。",
    "播磨": "守りは任せて。",
    "川南": "命令を実行する。",
    "苓北": "白灯を掲げます。",
    "西粟倉": "小さくても強いよ。",
    "九戸": "赤様、突き抜ける。",
    "京丹波": "狩りの時間だ。",
    "関ケ原": "決着をつける。",
    "西目屋": "影門、開きます。",
    "能登": "拳で語ろうぜ。",
    "金武": "火線を開く。",
    "苅田": "港湾要塞、起動。"
};

    return quotes[city] || "共に進みます。";
}

function getSkillNames(member){
    const names = {
    "渋谷": [
        "渋谷号令",
        "渋谷政策攻撃",
        "渋谷政策攻撃・改"
    ],
    "舞鶴": [
        "舞鶴号令",
        "舞鶴政策攻撃",
        "舞鶴政策攻撃・改"
    ],
    "鎌倉": [
        "鎌倉号令",
        "鎌倉政策攻撃",
        "鎌倉政策攻撃・改"
    ],
    "伊勢": [
        "伊勢号令",
        "伊勢政策攻撃",
        "伊勢政策攻撃・改"
    ],
    "富岡": [
        "富岡号令",
        "富岡政策攻撃",
        "富岡政策攻撃・改"
    ],
    "今治": [
        "今治号令",
        "今治政策攻撃",
        "今治政策攻撃・改"
    ],
    "函館": [
        "函館号令",
        "函館政策攻撃",
        "函館政策攻撃・改"
    ],
    "男鹿": [
        "男鹿号令",
        "男鹿政策攻撃",
        "男鹿政策攻撃・改"
    ],
    "花巻": [
        "花巻号令",
        "花巻政策攻撃",
        "花巻政策攻撃・改"
    ],
    "仙台": [
        "仙台号令",
        "仙台政策攻撃",
        "仙台政策攻撃・改"
    ],
    "会津若松": [
        "会津若松号令",
        "会津若松政策攻撃",
        "会津若松政策攻撃・改"
    ],
    "つくば": [
        "つくば号令",
        "つくば政策攻撃",
        "つくば政策攻撃・改"
    ],
    "甲府": [
        "甲府号令",
        "甲府政策攻撃",
        "甲府政策攻撃・改"
    ],
    "小松": [
        "小松号令",
        "小松政策攻撃",
        "小松政策攻撃・改"
    ],
    "豊田": [
        "豊田号令",
        "豊田政策攻撃",
        "豊田政策攻撃・改"
    ],
    "勝山": [
        "勝山号令",
        "勝山政策攻撃",
        "勝山政策攻撃・改"
    ],
    "富山": [
        "富山号令",
        "富山政策攻撃",
        "富山政策攻撃・改"
    ],
    "奈良": [
        "奈良号令",
        "奈良政策攻撃",
        "奈良政策攻撃・改"
    ],
    "新宮": [
        "新宮号令",
        "新宮政策攻撃",
        "新宮政策攻撃・改"
    ],
    "近江八幡": [
        "近江八幡号令",
        "近江八幡政策攻撃",
        "近江八幡政策攻撃・改"
    ],
    "姫路": [
        "姫路号令",
        "姫路政策攻撃",
        "姫路政策攻撃・改"
    ],
    "岡山": [
        "岡山号令",
        "岡山政策攻撃",
        "岡山政策攻撃・改"
    ],
    "呉": [
        "呉号令",
        "呉政策攻撃",
        "呉政策攻撃・改"
    ],
    "境港": [
        "境港号令",
        "境港政策攻撃",
        "境港政策攻撃・改"
    ],
    "出雲": [
        "出雲号令",
        "出雲政策攻撃",
        "出雲政策攻撃・改"
    ],
    "高松": [
        "高松号令",
        "高松政策攻撃",
        "高松政策攻撃・改"
    ],
    "四万十": [
        "四万十号令",
        "四万十政策攻撃",
        "四万十政策攻撃・改"
    ],
    "神埼": [
        "神埼号令",
        "神埼政策攻撃",
        "神埼政策攻撃・改"
    ],
    "佐世保": [
        "佐世保号令",
        "佐世保政策攻撃",
        "佐世保政策攻撃・改"
    ],
    "別府": [
        "別府号令",
        "別府政策攻撃",
        "別府政策攻撃・改"
    ],
    "上天草": [
        "上天草号令",
        "上天草政策攻撃",
        "上天草政策攻撃・改"
    ],
    "名護": [
        "名護号令",
        "名護政策攻撃",
        "名護政策攻撃・改"
    ],
    "つがる": [
        "つがる号令",
        "つがる政策攻撃",
        "つがる政策攻撃・改"
    ],
    "遠野": [
        "遠野号令",
        "遠野政策攻撃",
        "遠野政策攻撃・改"
    ],
    "天童": [
        "天童号令",
        "天童政策攻撃",
        "天童政策攻撃・改"
    ],
    "宇都宮": [
        "宇都宮号令",
        "宇都宮政策攻撃",
        "宇都宮政策攻撃・改"
    ],
    "銚子": [
        "銚子号令",
        "銚子政策攻撃",
        "銚子政策攻撃・改"
    ],
    "行田": [
        "行田号令",
        "行田政策攻撃",
        "行田政策攻撃・改"
    ],
    "軽井沢": [
        "軽井沢号令",
        "軽井沢政策攻撃",
        "軽井沢政策攻撃・改"
    ],
    "魚沼": [
        "魚沼号令",
        "魚沼政策攻撃",
        "魚沼政策攻撃・改"
    ],
    "浜松": [
        "浜松号令",
        "浜松政策攻撃",
        "浜松政策攻撃・改"
    ],
    "関": [
        "関号令",
        "関政策攻撃",
        "関政策攻撃・改"
    ],
    "吹田": [
        "吹田号令",
        "吹田政策攻撃",
        "吹田政策攻撃・改"
    ],
    "芦屋": [
        "芦屋号令",
        "芦屋政策攻撃",
        "芦屋政策攻撃・改"
    ],
    "備前": [
        "備前号令",
        "備前政策攻撃",
        "備前政策攻撃・改"
    ],
    "下関": [
        "下関号令",
        "下関政策攻撃",
        "下関政策攻撃・改"
    ],
    "三好": [
        "三好号令",
        "三好政策攻撃",
        "三好政策攻撃・改"
    ],
    "糸島": [
        "糸島号令",
        "糸島政策攻撃",
        "糸島政策攻撃・改"
    ],
    "日南": [
        "日南号令",
        "日南政策攻撃",
        "日南政策攻撃・改"
    ],
    "屋久島": [
        "屋久島号令",
        "屋久島政策攻撃",
        "屋久島政策攻撃・改"
    ],
    "真田": [
        "真田号令",
        "真田政策攻撃",
        "真田政策攻撃・改"
    ],
    "東栄": [
        "東栄号令",
        "東栄政策攻撃",
        "東栄政策攻撃・改"
    ],
    "津和野": [
        "津和野号令",
        "津和野政策攻撃",
        "津和野政策攻撃・改"
    ],
    "中之条": [
        "中之条号令",
        "中之条政策攻撃",
        "中之条政策攻撃・改"
    ],
    "播磨": [
        "播磨号令",
        "播磨政策攻撃",
        "播磨政策攻撃・改"
    ],
    "川南": [
        "川南号令",
        "川南政策攻撃",
        "川南政策攻撃・改"
    ],
    "苓北": [
        "苓北号令",
        "苓北政策攻撃",
        "苓北政策攻撃・改"
    ],
    "西粟倉": [
        "西粟倉号令",
        "西粟倉政策攻撃",
        "西粟倉政策攻撃・改"
    ],
    "九戸": [
        "九戸号令",
        "九戸政策攻撃",
        "九戸政策攻撃・改"
    ],
    "京丹波": [
        "京丹波号令",
        "京丹波政策攻撃",
        "京丹波政策攻撃・改"
    ],
    "関ケ原": [
        "関ケ原号令",
        "関ケ原政策攻撃",
        "関ケ原政策攻撃・改"
    ],
    "西目屋": [
        "西目屋号令",
        "西目屋政策攻撃",
        "西目屋政策攻撃・改"
    ],
    "能登": [
        "能登号令",
        "能登政策攻撃",
        "能登政策攻撃・改"
    ],
    "金武": [
        "金武号令",
        "金武政策攻撃",
        "金武政策攻撃・改"
    ],
    "苅田": [
        "苅田号令",
        "苅田政策攻撃",
        "苅田政策攻撃・改"
    ]
};

    if(getRarityRank(member.rarity) < getRarityRank("SSR")){
        return [names[member.city]?.[0] || "議場号令", names[member.city]?.[1] || "政策攻撃", "-"];
    }

    return names[member.city] || ["議場号令", "政策攻撃", "政策攻撃・改"];
}

function getStableNumber(seed){
    let hash = 0;

    for(let i = 0; i < seed.length; i++){
        hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
    }

    return hash;
}

function getBaseStatAverage(rarity){
    const averages = {
        N: 2000,
        R: 2500,
        SR: 3000,
        SSR: 3500,
        LR: 4000,
        "LR+": 4300
    };

    return averages[rarity] || 2000;
}

function getMunicipalityStats(member){
    const rarity = getEffectiveRarity(member);
    const level = member.level || 1;
    const friendship = member.friendship || 1;
    const base = getBaseStatAverage(rarity);
    const levelBonus = (level - 1) * 32;
    const friendshipBonus = (friendship - 1) * 90;

    return {
        hp: base + (getStableNumber(member.city + "hp") % 401) - 200 + levelBonus + friendshipBonus,
        attack: base + (getStableNumber(member.city + "atk") % 401) - 200 + levelBonus + friendshipBonus,
        defense: base + (getStableNumber(member.city + "def") % 401) - 200 + levelBonus + friendshipBonus
    };
}

function getSkillPower(member, type){
    const rank = getRarityRank(getEffectiveRarity(member));
    const friendship = member.friendship || 1;

    if(type === "chair") return 8 + rank * 4 + friendship;
    if(type === "council") return 120 + rank * 45 + friendship * 12;
    return 240 + rank * 70 + friendship * 55;
}

function getSkillTurn(member, advanced){
    const rank = getRarityRank(getEffectiveRarity(member));
    return advanced ? Math.max(5, 10 - Math.floor(rank / 2)) : Math.max(2, 7 - Math.floor(rank / 2));
}

function getMunicipalitySkills(member){
    const attribute = getAttributeLabel(member.attribute);
    const advancedAvailable = canUseAdvancedSkill(member);
    const names = getSkillNames(member);

    return {
        chairName: names[0],
        councilName: names[1],
        advancedName: advancedAvailable ? names[2] : "-",
        chair: "議長配置時、" + attribute + "属性自治体の体力・攻撃・防御 +" + getSkillPower(member, "chair") + "%",
        council: getSkillTurn(member, false) + "ターンごとに発動。敵単体へ攻撃力" + getSkillPower(member, "council") + "%の政策攻撃。",
        advanced: advancedAvailable ?
            getSkillTurn(member, true) + "ターンごとに発動。友好ランクに応じて敵全体へ攻撃力" + getSkillPower(member, "advanced") + "%の政策攻撃。" :
            "-"
    };
}

function getAllMunicipalities(){
    const order = ["LR", "SSR", "SR", "R", "N"];
    let list = [];

    for(let i = 0; i < order.length; i++){
        const rarity = order[i];

        for(let j = 0; j < municipalities[rarity].length; j++){
            const city = municipalities[rarity][j];

            list.push({
                city: city,
                rarity: rarity,
                image: getImageName(city),
                attribute: getAttribute(city)
            });
        }
    }

    return list;
}

function getCooperationRoster(){
    const owned = getOwnedMunicipalities();
    return owned.map(function(item){
        item.friendship = Math.min(item.friendship || 1, 5);
        item.level = item.level || 1;
        item.upgraded = item.upgraded || item.friendship >= 5;

        const member = {
            city: item.city,
            rarity: item.rarity || getRarityByCity(item.city),
            image: getImageName(item.city),
            attribute: getAttribute(item.city),
            count: item.count || 1,
            friendship: item.friendship,
            level: item.level,
            upgraded: item.upgraded
        };

        const profile = getMunicipalityProfile(member.city);
        member.effectiveRarity = getEffectiveRarity(member);
        member.region = profile.region;
        member.prefecture = profile.prefecture;
        member.stats = getMunicipalityStats(member);
        member.skills = getMunicipalitySkills(member);

        return member;
    }).sort(function(a, b){
        if(getRarityRank(a.effectiveRarity) !== getRarityRank(b.effectiveRarity)){
            return getRarityRank(b.effectiveRarity) - getRarityRank(a.effectiveRarity);
        }

        return a.city.localeCompare(b.city, "ja");
    }).slice(0, 50);
}

function getFormation(){
    const savedFormation = localStorage.getItem("jinjiFormation");

    if(savedFormation){
        const storedFormation = parseStoredJson(savedFormation, []);
        if(!Array.isArray(storedFormation)){
            saveFormation(["", "", "", "", ""]);
            return ["", "", "", "", ""];
        }

        const formation = storedFormation.map(function(city){
            return city ? normalizeMunicipalityName(city) : "";
        });
        while(formation.length < 5) formation.push("");
        const nextFormation = formation.slice(0, 5);
        saveFormation(nextFormation);
        return nextFormation;
    }

    return ["", "", "", "", ""];
}

function saveFormation(formation){
    localStorage.setItem("jinjiFormation", JSON.stringify(formation));
}

function getCityPower(city){
    const rarity = getRarityByCity(city);
    const rarityBase = {
        N: 45,
        R: 58,
        SR: 72,
        SSR: 88,
        LR: 105
    };
    const attributeBonus = {
        fire: 8,
        water: 6,
        wind: 7,
        light: 9,
        dark: 9,
        none: 5
    };
    const attribute = getAttribute(city);
    const nameScore = city.length * 3;

    return rarityBase[rarity] + attributeBonus[attribute] + nameScore;
}

function getAttributeLabel(attribute){
    const labels = {
        fire: "炎",
        water: "水",
        wind: "風",
        light: "光",
        dark: "闇",
        none: "無"
    };

    return labels[attribute] || "無";
}

function createJinjiIcon(member, options){
    const button = document.createElement("button");
    const activeClass = options && options.active ? " active" : "";
    button.className = "jinji-icon rarity-" + member.effectiveRarity.toLowerCase().replace("+", "plus") + activeClass;
    button.innerHTML =
        "<div class='jinji-icon-art'>" +
            "<img class='attribute-bg' src='assets/backgrounds/bg_" + member.attribute + ".png' alt=''>" +
            "<img class='result-face' src='assets/faces/" + member.image + "_face.png' alt='" + member.city + "'>" +
        "</div>" +
        "<div class='jinji-icon-name'>" + member.city + "</div>" +
        "<div class='jinji-icon-meta'>" + member.effectiveRarity + " / " + getAttributeLabel(member.attribute) + "</div>" +
        "<div class='jinji-icon-sub'>友好" + member.friendship + " / 所持" + member.count + "</div>";

    return button;
}

function getJinjiSortMode(){
    const sort = document.getElementById("jinjiSort");
    return sort ? sort.value : "rarity";
}

function sortRoster(roster){
    const mode = getJinjiSortMode();
    return roster.slice().sort(function(a, b){
        if(mode === "name") return a.city.localeCompare(b.city, "ja");
        if(mode === "attribute"){
            if(a.attribute !== b.attribute) return getAttributeLabel(a.attribute).localeCompare(getAttributeLabel(b.attribute), "ja");
            return a.city.localeCompare(b.city, "ja");
        }
        if(getRarityRank(a.effectiveRarity) !== getRarityRank(b.effectiveRarity)){
            return getRarityRank(b.effectiveRarity) - getRarityRank(a.effectiveRarity);
        }
        return a.city.localeCompare(b.city, "ja");
    });
}

function assignToSelectedFormation(member){
    const currentFormation = getFormation();
    const alreadyIndex = currentFormation.indexOf(member.city);

    if(alreadyIndex !== -1 && alreadyIndex !== selectedFormationSlot){
        currentFormation[alreadyIndex] = "";
    }

    currentFormation[selectedFormationSlot] = member.city;
    saveFormation(currentFormation);
    selectedJinjiCity = member.city;
    switchJinjiTab("formation");
    renderFormation(member.city);
}

function renderJinjiList(){
    const grid = document.getElementById("jinjiRosterGrid");
    const count = document.getElementById("jinjiCount");

    if(!grid) return;

    const roster = sortRoster(getCooperationRoster());
    const ownedTotal = roster.reduce(function(total, member){
        return total + member.count;
    }, 0);

    grid.innerHTML = "";
    if(count) count.textContent = "協力自治体 " + roster.length + " / 所持 " + ownedTotal;

    if(roster.length === 0){
        grid.innerHTML =
            "<div class='jinji-empty'>まだ協力自治体がいません。招聘で自治体を獲得するとここに表示されます。</div>";
        return;
    }

    for(let i = 0; i < roster.length; i++){
        const member = roster[i];
        const icon = createJinjiIcon(member, {});
        icon.onclick = function(){
            assignToSelectedFormation(member);
        };
        grid.appendChild(icon);
    }
}

function renderFormation(selectedCity){
    const slots = document.getElementById("formationSlots");
    const pool = document.getElementById("formationPoolGrid");

    if(!slots) return;
    if(pool) pool.innerHTML = "";

    const roster = getCooperationRoster();
    const formation = getFormation();

    if(roster.length === 0){
        slots.innerHTML = "";
        const detail = document.getElementById("formationDetail");
        if(detail){
            detail.innerHTML =
                "<div class='jinji-empty'>まだ編成できる自治体がいません。招聘で自治体を獲得してください。</div>";
        }
        return;
    }

    if(selectedCity) selectedJinjiCity = selectedCity;
    if(!selectedJinjiCity){
        selectedJinjiCity = formation.find(function(city){ return city; }) || roster[0].city;
    }

    renderFormationDetail(selectedJinjiCity);

    slots.innerHTML = "";
    for(let i = 0; i < formationSlotLabels.length; i++){
        const city = formation[i];
        const member = city ? roster.find(function(item){ return item.city === city; }) : null;
        const slot = document.createElement("button");
        slot.className = "formation-slot " + (i === 0 ? "chair-slot" : "council-slot") + (selectedFormationSlot === i ? " active" : "");

        if(member){
            slot.innerHTML =
                "<span class='formation-role'>" + formationSlotLabels[i] + "</span>" +
                "<span class='formation-face'>" +
                    "<img class='attribute-bg' src='assets/backgrounds/bg_" + member.attribute + ".png' alt=''>" +
                    "<img class='result-face' src='assets/faces/" + member.image + "_face.png' alt='" + member.city + "'>" +
                "</span>" +
                "<strong>" + member.city + "</strong>";
        }else{
            slot.innerHTML =
                "<span class='formation-role'>" + formationSlotLabels[i] + "</span>" +
                "<span class='formation-empty'>空枠</span>";
        }

        slot.onclick = function(){
            selectedFormationSlot = i;
            renderFormation(selectedJinjiCity);
        };

        slots.appendChild(slot);
    }
}

function renderFormationDetail(city){
    const detail = document.getElementById("formationDetail");

    if(!detail || !city) return;

    const member = getCooperationRoster().find(function(item){ return item.city === city; });
    if(!member){
        detail.innerHTML = "<div class='jinji-empty'>選択中の自治体はありません。</div>";
        return;
    }

    detail.innerHTML =
        "<div class='formation-detail-art'>" +
            "<img class='attribute-bg' src='assets/backgrounds/bg_" + member.attribute + ".png' alt=''>" +
            "<img class='result-face' src='assets/faces/" + member.image + "_face.png' alt='" + member.city + "'>" +
        "</div>" +
        "<div class='formation-detail-info'>" +
            "<div class='formation-detail-kicker'>選択中の自治体</div>" +
            "<h2>" + member.city + "</h2>" +
            "<div class='formation-attribute attribute-" + member.attribute + "'>" +
                "<span>" + getAttributeLabel(member.attribute) + "</span>" +
                "<strong>" + getAttributeLabel(member.attribute) + "属性</strong>" +
            "</div>" +
            "<div class='formation-detail-tags'>" +
                "<span>" + member.effectiveRarity + "</span>" +
                (member.upgraded ? "<span>レアリティ上昇済</span>" : "") +
                "<span>LV " + member.level + "/99</span>" +
                "<span>友好ランク " + member.friendship + "/5</span>" +
                "<span>所持" + member.count + "</span>" +
                "<span>" + member.region + "</span>" +
                "<span>" + member.prefecture + "</span>" +
            "</div>" +
            "<div class='formation-quote'>「" + getMunicipalityQuote(member.city) + "」</div>" +
            "<div class='formation-stats'>" +
                "<div><small>体力</small><strong>" + member.stats.hp + "</strong></div>" +
                "<div><small>攻撃</small><strong>" + member.stats.attack + "</strong></div>" +
                "<div><small>防御</small><strong>" + member.stats.defense + "</strong></div>" +
            "</div>" +
            "<div class='formation-skills'>" +
                "<div><small>議長スキル</small><h3>" + member.skills.chairName + "</h3><p>" + member.skills.chair + "</p></div>" +
                "<div><small>議員スキル</small><h3>" + member.skills.councilName + "</h3><p>" + member.skills.council + "</p></div>" +
                "<div class='" + (canUseAdvancedSkill(member) ? "" : "locked") + "'><small>議員スキル改</small><h3>" + member.skills.advancedName + "</h3><p>" + member.skills.advanced + "</p></div>" +
            "</div>" +
        "</div>";
}

function renderSpecialty(){
    const layout = document.getElementById("specialtyLayout");

    if(!layout) return;

    const roster = getCooperationRoster();
    const formation = getFormation();

    layout.innerHTML =
        "<div class='jinji-section-title'>" +
            "<h2>特産品</h2>" +
            "<p>編成中の5人に持たせる装備枠です</p>" +
        "</div>";

    const grid = document.createElement("div");
    grid.className = "specialty-grid";

    for(let i = 0; i < formationSlotLabels.length; i++){
        const city = formation[i];
        const member = city ? roster.find(function(item){ return item.city === city; }) : null;
        const card = document.createElement("div");
        card.className = "specialty-card";

        card.innerHTML =
            "<div class='specialty-owner'>" +
                "<span class='formation-role'>" + formationSlotLabels[i] + "</span>" +
                (member ?
                    "<span class='formation-face small'>" +
                        "<img class='attribute-bg' src='assets/backgrounds/bg_" + member.attribute + ".png' alt=''>" +
                        "<img class='result-face' src='assets/faces/" + member.image + "_face.png' alt='" + member.city + "'>" +
                    "</span>" +
                    "<strong>" + member.city + "</strong>"
                    :
                    "<span class='formation-empty'>未編成</span>"
                ) +
            "</div>" +
            "<div class='specialty-slots'>" +
                "<button disabled>特産品 1</button>" +
                "<button disabled>特産品 2</button>" +
                "<button disabled>特産品 3</button>" +
            "</div>";

        grid.appendChild(card);
    }

    layout.appendChild(grid);
}

function conductFriendship(city){
    const owned = getOwnedMunicipalities();
    const target = owned.find(function(item){
        return item.city === city;
    });

    if(!target || target.count <= 1) return;

    target.friendship = Math.min(target.friendship || 1, 5);
    target.level = target.level || 1;
    target.upgraded = target.upgraded || target.friendship >= 5;

    if(target.upgraded || target.friendship >= 5) return;

    target.count--;
    target.friendship++;

    if(target.friendship >= 5){
        target.friendship = 5;
        target.upgraded = true;
    }

    saveOwnedMunicipalities(owned);

    renderJinjiList();
    renderFormation(selectedJinjiCity);
    renderFriendship();
    renderSpecialty();
}

function renderFriendship(){
    const list = document.getElementById("friendshipList");

    if(!list) return;

    const roster = getCooperationRoster();
    list.innerHTML = "";

    if(roster.length === 0){
        list.innerHTML =
            "<div class='jinji-empty'>まだ親善できる自治体がいません。招聘で自治体を獲得してください。</div>";
        return;
    }

    for(let i = 0; i < roster.length; i++){
        const member = roster[i];
        const canFriendship = member.count > 1 && member.friendship < 5 && !member.upgraded;
        const card = document.createElement("div");
        card.className = "friendship-card" + (canFriendship ? "" : " disabled");

        card.innerHTML =
            "<div class='friendship-face'>" +
                "<img class='attribute-bg' src='assets/backgrounds/bg_" + member.attribute + ".png' alt=''>" +
                "<img class='result-face' src='assets/faces/" + member.image + "_face.png' alt='" + member.city + "'>" +
            "</div>" +
            "<div class='friendship-info'>" +
                "<strong>" + member.city + "</strong>" +
                "<span>" + member.effectiveRarity + " / " + getAttributeLabel(member.attribute) + "属性</span>" +
                "<span>友好ランク " + member.friendship + "/5</span>" +
                "<span>" + (member.upgraded ? "レアリティ上昇済・重複は財源変換" : "親善可能数 " + Math.max(0, member.count - 1)) + "</span>" +
            "</div>" +
            "<div class='friendship-count'>" +
                "<small>所持</small>" +
                "<strong>" + member.count + "</strong>" +
            "</div>" +
            "<button " + (canFriendship ? "" : "disabled") + ">" + (member.upgraded ? "上昇済" : "親善") + "</button>";

        const button = card.querySelector("button");
        button.onclick = function(){
            conductFriendship(member.city);
        };

        list.appendChild(card);
    }
}

function switchJinjiTab(tabName){
    const views = {
        list: document.getElementById("jinjiListView"),
        formation: document.getElementById("jinjiFormationView"),
        friendship: document.getElementById("jinjiFriendshipView"),
        specialty: document.getElementById("jinjiSpecialtyView")
    };
    const buttons = document.querySelectorAll(".jinji-tabs button");
    const tabOrder = ["list", "formation", "friendship", "specialty"];

    for(let key in views){
        if(views[key]){
            views[key].classList.toggle("active", key === tabName);
        }
    }

    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.toggle("active", tabOrder[i] === tabName);
    }

    if(tabName === "list") renderJinjiList();
    if(tabName === "formation") renderFormation(selectedJinjiCity);
    if(tabName === "friendship") renderFriendship();
    if(tabName === "specialty") renderSpecialty();
}

function initJinji(){
    if(!document.getElementById("jinjiRosterGrid")) return;

    renderJinjiList();
    renderFormation();
    renderFriendship();
    renderSpecialty();
}

const tutorialBattleGeneral = {
    name: "扶桑",
    type: "general",
    hp: 15,
    atk: 3,
    def: 1,
    move: 2,
    range: 1,
    attr: "光",
    cost: 0,
    text: "大将。出撃酔いなし。"
};

const tutorialBattleDeck = [
    { name:"渋谷", type:"unit", hp:6, atk:4, def:1, move:3, range:1, attr:"火", cost:4, text:"高機動アタッカー" },
    { name:"今治", type:"unit", hp:9, atk:4, def:2, move:1, range:1, attr:"水", cost:5, text:"重装大型" },
    { name:"舞鶴", type:"unit", hp:7, atk:3, def:2, move:2, range:2, attr:"水", cost:4, text:"中距離砲撃" },
    { name:"伊勢", type:"unit", hp:6, atk:3, def:1, move:2, range:2, attr:"光", cost:4, text:"支援寄り" },
    { name:"鎌倉", type:"unit", hp:8, atk:4, def:2, move:2, range:1, attr:"土", cost:5, text:"近接剣豪" },
    { name:"富岡", type:"unit", hp:5, atk:3, def:1, move:2, range:2, attr:"闇", cost:3, text:"遠隔寄り" },
    { name:"函館", type:"unit", hp:6, atk:3, def:1, move:2, range:2, attr:"水", cost:3, text:"バランス" },
    { name:"仙台", type:"unit", hp:7, atk:3, def:2, move:2, range:1, attr:"風", cost:4, text:"前衛" },
    { name:"姫路", type:"unit", hp:8, atk:3, def:3, move:1, range:1, attr:"光", cost:4, text:"守備型" },
    { name:"糸島", type:"unit", hp:5, atk:3, def:1, move:3, range:1, attr:"風", cost:3, text:"機動型" },
    { name:"出雲", type:"unit", hp:6, atk:2, def:2, move:2, range:2, attr:"光", cost:3, text:"支援型" },
    { name:"上天草", type:"unit", hp:6, atk:3, def:1, move:3, range:1, attr:"水", cost:3, text:"速攻" },
    { name:"軽井沢", type:"unit", hp:5, atk:2, def:1, move:3, range:2, attr:"風", cost:3, text:"遊撃" },
    { name:"甲府", type:"unit", hp:7, atk:4, def:1, move:1, range:1, attr:"火", cost:3, text:"鈍足火力" },
    { name:"九戸", type:"unit", hp:5, atk:2, def:1, move:2, range:1, attr:"土", cost:2, text:"低コスト" },
    { name:"苅田", type:"unit", hp:4, atk:2, def:1, move:2, range:1, attr:"風", cost:2, text:"低コスト" },
    { name:"川南", type:"unit", hp:5, atk:2, def:1, move:2, range:1, attr:"水", cost:2, text:"低コスト" },
    { name:"菊陽", type:"unit", hp:6, atk:2, def:2, move:1, range:1, attr:"土", cost:2, text:"低コスト盾" },
    { name:"金沢", type:"unit", hp:6, atk:3, def:2, move:1, range:2, attr:"光", cost:4, text:"堅実" },
    { name:"小松", type:"unit", hp:5, atk:3, def:1, move:2, range:2, attr:"火", cost:3, text:"遠隔火力" },
    { name:"甘味補給", type:"item", cost:1, text:"味方1体のHPを2回復" },
    { name:"応急手当", type:"item", cost:2, text:"味方1体のHPを4回復" },
    { name:"道路整備", type:"item", cost:2, text:"味方1体の移動力+1。このターンのみ。" },
    { name:"煙幕展開", type:"item", cost:2, text:"敵1体の攻撃-2。このターンのみ。" },
    { name:"強行軍", type:"item", cost:2, text:"味方1体の移動力+1。このターンのみ。" },
    { name:"奇襲指令", type:"item", cost:3, text:"味方1体の攻撃+1。このターンのみ。" },
    { name:"采配の旗", type:"equip", cost:2, text:"装備。攻撃+1。" },
    { name:"防災ヘルメット", type:"equip", cost:1, text:"装備。防御+1。" },
    { name:"交通網の地図", type:"equip", cost:2, text:"装備。移動力+1。" },
    { name:"伝統の甲冑", type:"equip", cost:3, text:"装備。HP+3、防御+1。" }
];

let battleState = null;
let selectedBattleCardIndex = null;
let selectedBattleUnitId = null;
let battleLongPressTimer = null;
let pendingBattleAttack = null;

function openQuestConfirm(){
    const modal = document.getElementById("questConfirmModal");
    if(modal){
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
    }
}

function closeQuestConfirm(){
    const modal = document.getElementById("questConfirmModal");
    if(modal){
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    }
}

function startTutorialQuest(){
    localStorage.removeItem("cwTutorialBattleState");
    location.href = "battle.html?quest=tutorial";
}

function cloneBattleCard(card){
    return JSON.parse(JSON.stringify(card));
}

function getBattleCardUpkeep(card){
    if(!card || card.type !== "unit") return 0;
    return card.cost >= 4 ? 2 : 1;
}

function createBattleDeck(seedOffset){
    const preferredNames = seedOffset === 0
        ? ["九戸", "糸島", "舞鶴", "甘味補給", "采配の旗"]
        : ["川南", "甲府", "姫路", "煙幕展開", "防災ヘルメット"];
    const deck = [];

    for(let i = 0; i < preferredNames.length; i++){
        const card = tutorialBattleDeck.find(function(item){
            return item.name === preferredNames[i];
        });
        if(card) deck.push(cloneBattleCard(card));
    }

    for(let i = 0; i < tutorialBattleDeck.length; i++){
        const card = tutorialBattleDeck[i];
        if(preferredNames.indexOf(card.name) < 0){
            deck.push(cloneBattleCard(card));
        }
    }

    return deck;
}

function createBattleUnit(card, owner, x, y, general){
    const unit = cloneBattleCard(card);
    unit.id = owner + "-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
    unit.owner = owner;
    unit.x = x;
    unit.y = y;
    unit.maxHp = unit.hp;
    unit.moved = 0;
    unit.attacked = false;
    unit.summonSick = !general;
    unit.upkeep = general ? 0 : getBattleCardUpkeep(card);
    unit.equipment = [];
    unit.tempAtk = 0;
    unit.tempMove = 0;
    return unit;
}

function createInitialBattleState(){
    const playerDeck = createBattleDeck(0);
    const enemyDeck = createBattleDeck(5);
    return {
        width: 7,
        height: 7,
        phase: "player",
        turn: 1,
        playerMaxCost: 2,
        enemyMaxCost: 1,
        playerCost: 2,
        enemyCost: 0,
        playerMaxSupply: 2,
        enemyMaxSupply: 1,
        playerSupply: 2,
        enemySupply: 0,
        playerDeck: playerDeck.slice(5),
        enemyDeck: enemyDeck.slice(5),
        playerHand: playerDeck.slice(0, 5),
        enemyHand: enemyDeck.slice(0, 5),
        playerGrave: [],
        enemyGrave: [],
        units: [
            createBattleUnit(tutorialBattleGeneral, "player", 4, 1, true),
            createBattleUnit(tutorialBattleGeneral, "enemy", 4, 7, true)
        ],
        effects: [],
        log: ["戦闘開始。大将を守りながら敵本陣を攻略してください。"],
        winner: ""
    };
}

function initBattle(){
    battleState = createInitialBattleState();
    selectedBattleCardIndex = null;
    selectedBattleUnitId = null;
    renderBattle();
}

function getBattleUnitAt(x, y){
    return battleState.units.find(function(unit){
        return unit.x === x && unit.y === y;
    });
}

function getSelectedBattleUnit(){
    return battleState.units.find(function(unit){
        return unit.id === selectedBattleUnitId;
    });
}

function getBattleDistance(a, b){
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

function addBattleLog(text){
    battleState.log.unshift(text);
    battleState.log = battleState.log.slice(0, 8);
}

function addBattleEffect(x, y, value, supply){
    if(!battleState.effects) battleState.effects = [];
    battleState.effects.push({
        x: x,
        y: y,
        value: value,
        supply: !!supply,
        id: Date.now() + "-" + Math.floor(Math.random() * 100000)
    });
    battleState.effects = battleState.effects.slice(-12);
}

function getBattleCost(){
    return battleState.phase === "player" ? battleState.playerCost : battleState.enemyCost;
}

function getBattleUpkeep(owner){
    return battleState.units.reduce(function(total, unit){
        if(unit.owner !== owner || unit.type === "general") return total;
        return total + (unit.upkeep || 0);
    }, 0);
}

function prepareBattleTurn(owner){
    if(owner === "player"){
        battleState.playerMaxCost = Math.min(12, battleState.playerMaxCost + 1);
        battleState.playerMaxSupply = Math.min(12, battleState.playerMaxSupply + 1);
        const upkeep = getBattleUpkeep("player");
        battleState.playerCost = battleState.playerMaxCost;
        battleState.playerSupply = Math.max(0, battleState.playerMaxSupply - upkeep);
        if(upkeep > 0) addBattleLog("自軍の補給消費 " + upkeep + "。残り補給物資 " + battleState.playerSupply + "。");
        if(upkeep > battleState.playerMaxSupply) applySupplyShortage("player", upkeep - battleState.playerMaxSupply);
        return;
    }

    battleState.enemyMaxCost = Math.min(12, battleState.enemyMaxCost + 1);
    battleState.enemyMaxSupply = Math.min(12, battleState.enemyMaxSupply + 1);
    const upkeep = getBattleUpkeep("enemy");
    battleState.enemyCost = battleState.enemyMaxCost;
    battleState.enemySupply = Math.max(0, battleState.enemyMaxSupply - upkeep);
    if(upkeep > 0) addBattleLog("敵軍の補給消費 " + upkeep + "。残り補給物資 " + battleState.enemySupply + "。");
    if(upkeep > battleState.enemyMaxSupply) applySupplyShortage("enemy", upkeep - battleState.enemyMaxSupply);
}

function spendBattleCost(amount){
    if(battleState.phase === "player"){
        if(battleState.playerCost < amount) return false;
        battleState.playerCost -= amount;
        return true;
    }
    if(battleState.enemyCost < amount) return false;
    battleState.enemyCost -= amount;
    return true;
}

function applySupplyShortage(owner, shortage){
    const label = owner === "player" ? "自軍" : "敵軍";
    addBattleLog(label + "は補給不足。" + shortage + "不足し、通常ユニットが消耗しました。");

    const targets = battleState.units.filter(function(unit){
        return unit.owner === owner && unit.type !== "general";
    });

    for(let i = 0; i < targets.length; i++){
        targets[i].hp -= 1;
        addBattleEffect(targets[i].x, targets[i].y, 1, true);
        if(targets[i].hp <= 0){
            defeatBattleUnit(targets[i]);
        }
    }
}

function renderBattle(){
    if(!battleState) return;
    const board = document.getElementById("battleBoard");
    if(board){
        board.innerHTML = "";
        board.style.gridTemplateColumns = "repeat(" + battleState.width + ", minmax(42px, 1fr))";
        for(let y = battleState.height; y >= 1; y--){
            for(let x = 1; x <= battleState.width; x++){
                const cell = document.createElement("button");
                cell.className = "battle-cell";
                if(y <= 3) cell.classList.add("player-zone");
                if(y >= battleState.height - 2) cell.classList.add("enemy-zone");
                cell.onclick = function(){ handleBattleCellClick(x, y); };
                const coord = document.createElement("small");
                coord.textContent = String.fromCharCode(64 + x) + y;
                cell.appendChild(coord);
                const unit = getBattleUnitAt(x, y);
                if(unit){
                    const piece = document.createElement("div");
                    piece.className = "battle-piece " + unit.owner;
                    if(unit.id === selectedBattleUnitId) piece.classList.add("selected");
                    if(unit.moveFlash) piece.classList.add("moving");
                    piece.innerHTML =
                        "<strong>" + unit.name + "</strong>" +
                        "<span>HP " + unit.hp + "/" + unit.maxHp + "</span>" +
                        "<span>攻" + getBattleAtk(unit) + " 防" + getBattleDef(unit) + "</span>";
                    attachBattleLongPress(piece, unit);
                    cell.appendChild(piece);
                    unit.moveFlash = false;
                }
                board.appendChild(cell);
            }
        }
        renderBattleEffects(board);
    }
    renderBattleHand();
    renderBattleInfo();
}

function renderBattleHand(){
    const hand = document.getElementById("battleHand");
    if(!hand) return;
    hand.innerHTML = "";
    for(let i = 0; i < battleState.playerHand.length; i++){
        const card = battleState.playerHand[i];
        const button = document.createElement("button");
        button.className = "battle-card " + card.type;
        if(i === selectedBattleCardIndex) button.classList.add("selected");
        button.innerHTML = getBattleCardHtml(card);
        button.onclick = function(){
            selectedBattleCardIndex = selectedBattleCardIndex === i ? null : i;
            selectedBattleUnitId = null;
            renderBattle();
        };
        attachBattleLongPress(button, card);
        hand.appendChild(button);
    }
}

function renderBattleEffects(board){
    if(!battleState.effects) return;

    for(let i = 0; i < battleState.effects.length; i++){
        const effect = battleState.effects[i];
        const item = document.createElement("div");
        item.className = "battle-damage" + (effect.supply ? " supply" : "");
        item.textContent = "-" + effect.value;
        item.style.left = (((effect.x - 0.5) / battleState.width) * 100) + "%";
        item.style.top = (((battleState.height - effect.y + 0.5) / battleState.height) * 100) + "%";
        board.appendChild(item);
    }

    setTimeout(function(){
        if(battleState){
            battleState.effects = [];
        }
    }, 900);
}


function attachBattleLongPress(element, data){
    element.onmousedown = function(){ startBattleLongPress(data); };
    element.onmouseup = clearBattleLongPress;
    element.onmouseleave = clearBattleLongPress;
    element.ontouchstart = function(){ startBattleLongPress(data); };
    element.ontouchend = clearBattleLongPress;
}

function renderBattleInfo(){
    const costLabel = document.getElementById("battleCostLabel");
    const turnLabel = document.getElementById("battleTurnLabel");
    const message = document.getElementById("battleMessage");
    const playerInfo = document.getElementById("playerInfo");
    const enemyInfo = document.getElementById("enemyInfo");
    const log = document.getElementById("battleLog");
    const selectedBox = document.getElementById("selectedCardBox");
    if(costLabel) costLabel.textContent = "財源 " + battleState.playerCost + "/" + battleState.playerMaxCost + " / 補給 " + battleState.playerSupply + "/" + battleState.playerMaxSupply;
    if(turnLabel) turnLabel.textContent = battleState.phase === "player" ? "自軍ターン" : "敵軍ターン";
    if(message) message.textContent = battleState.phase === "player" ? "カード、または盤面のユニットを選択してください" : "敵軍行動中";
    if(playerInfo) playerInfo.innerHTML = getBattleSideInfo("player");
    if(enemyInfo) enemyInfo.innerHTML = getBattleSideInfo("enemy");
    if(log) log.innerHTML = battleState.log.map(function(item){ return "<p>" + item + "</p>"; }).join("");
    if(selectedBox){
        const card = selectedBattleCardIndex === null ? null : battleState.playerHand[selectedBattleCardIndex];
        const unit = getSelectedBattleUnit();
        selectedBox.innerHTML = card ? getBattleCardHtml(card) : unit ? getBattleUnitDetailHtml(unit) : "なし";
    }
}

function getBattleSideInfo(owner){
    const deck = owner === "player" ? battleState.playerDeck : battleState.enemyDeck;
    const hand = owner === "player" ? battleState.playerHand : battleState.enemyHand;
    const grave = owner === "player" ? battleState.playerGrave : battleState.enemyGrave;
    const cost = owner === "player" ? battleState.playerCost : battleState.enemyCost;
    const maxCost = owner === "player" ? battleState.playerMaxCost : battleState.enemyMaxCost;
    const supply = owner === "player" ? battleState.playerSupply : battleState.enemySupply;
    const maxSupply = owner === "player" ? battleState.playerMaxSupply : battleState.enemyMaxSupply;
    const general = battleState.units.find(function(unit){
        return unit.owner === owner && unit.type === "general";
    });
    return "<p>大将HP " + (general ? general.hp + "/" + general.maxHp : "0") + "</p>" +
        "<p>デッキ " + deck.length + " / 手札 " + hand.length + " / 墓地 " + grave.length + "</p>" +
        "<p>財源 " + cost + "/" + maxCost + " / 補給 " + supply + "/" + maxSupply + "</p>" +
        "<p>維持コスト " + getBattleUpkeep(owner) + "</p>";
}

function getBattleCardHtml(card){
    const typeLabel = card.type === "unit" ? "ユニット" : card.type === "item" ? "アイテム" : card.type === "equip" ? "装備" : "大将";
    let html = "<span>" + typeLabel + " / コスト" + card.cost + "</span><strong>" + card.name + "</strong>";
    if(card.type === "unit" || card.type === "general"){
        html += "<small>HP" + card.hp + " 攻" + card.atk + " 防" + card.def + " 移" + card.move + " 射" + card.range + " 維" + getBattleCardUpkeep(card) + "</small>";
        html += "<small>" + card.attr + " / " + card.text + "</small>";
    }else{
        html += "<small>" + card.text + "</small>";
    }
    return html;
}

function getBattleUnitDetailHtml(unit){
    return "<strong>" + unit.name + "</strong>" +
        "<small>HP " + unit.hp + "/" + unit.maxHp + " / 攻" + getBattleAtk(unit) + " / 防" + getBattleDef(unit) + "</small>" +
        "<small>移動 " + getBattleMove(unit) + " / 射程 " + unit.range + " / 維持 " + (unit.upkeep || 0) + " / 属性 " + unit.attr + "</small>" +
        "<small>装備 " + (unit.equipment.length ? unit.equipment.join("、") : "なし") + "</small>";
}

function handleBattleCellClick(x, y){
    if(!battleState || battleState.phase !== "player" || battleState.winner) return;
    const unit = getBattleUnitAt(x, y);
    const selectedCard = selectedBattleCardIndex === null ? null : battleState.playerHand[selectedBattleCardIndex];
    if(selectedCard){
        if(selectedCard.type === "unit"){
            deployBattleUnit(selectedCard, selectedBattleCardIndex, x, y);
            return;
        }
        if(unit) useBattleSupportCard(selectedCard, selectedBattleCardIndex, unit);
        return;
    }
    const selectedUnit = getSelectedBattleUnit();
    if(unit && unit.owner === "player"){
        selectedBattleUnitId = unit.id;
        selectedBattleCardIndex = null;
        renderBattle();
        return;
    }
    if(selectedUnit && !unit){
        moveBattleUnit(selectedUnit, x, y);
        return;
    }
    if(selectedUnit && unit && unit.owner === "enemy"){
        openBattleActionMenu(selectedUnit, unit);
    }
}

function openBattleActionMenu(attacker, defender){
    pendingBattleAttack = {
        attackerId: attacker.id,
        defenderId: defender.id
    };

    const menu = document.getElementById("battleActionMenu");
    if(menu){
        menu.classList.add("show");
        menu.setAttribute("aria-hidden", "false");
    }
}

function closeBattleActionMenu(){
    pendingBattleAttack = null;
    const menu = document.getElementById("battleActionMenu");
    if(menu){
        menu.classList.remove("show");
        menu.setAttribute("aria-hidden", "true");
    }
}

function confirmBattleAttack(){
    if(!pendingBattleAttack) return;
    const attacker = battleState.units.find(function(unit){
        return unit.id === pendingBattleAttack.attackerId;
    });
    const defender = battleState.units.find(function(unit){
        return unit.id === pendingBattleAttack.defenderId;
    });
    closeBattleActionMenu();
    if(attacker && defender){
        attackBattleUnit(attacker, defender);
    }
}

function confirmBattleSkill(){
    addBattleLog("スキルは今後実装予定です。");
    closeBattleActionMenu();
    renderBattle();
}

function deployBattleUnit(card, handIndex, x, y){
    if(y > 3){
        addBattleLog("出撃エリアは自陣手前3列です。");
        renderBattle();
        return;
    }
    if(getBattleUnitAt(x, y)){
        addBattleLog("そのマスにはすでにユニットがいます。");
        renderBattle();
        return;
    }
    if(!spendBattleCost(card.cost)){
        addBattleLog("コストが不足しています。");
        renderBattle();
        return;
    }
    battleState.units.push(createBattleUnit(card, "player", x, y, false));
    battleState.playerHand.splice(handIndex, 1);
    selectedBattleCardIndex = null;
    addBattleLog(card.name + "を出撃しました。");
    renderBattle();
}

function useBattleSupportCard(card, handIndex, target){
    if(card.type === "equip" && target.owner !== "player"){
        addBattleLog("装備は出撃済みの味方ユニットにのみ使用できます。");
        renderBattle();
        return;
    }
    if(card.type === "item" && card.name !== "煙幕展開" && target.owner !== "player"){
        addBattleLog("このアイテムは味方に使用します。");
        renderBattle();
        return;
    }
    if(!spendBattleCost(card.cost)){
        addBattleLog("コストが不足しています。");
        renderBattle();
        return;
    }
    applyBattleCardEffect(card, target);
    battleState.playerHand.splice(handIndex, 1);
    selectedBattleCardIndex = null;
    addBattleLog(card.name + "を" + target.name + "に使用しました。");
    renderBattle();
}

function applyBattleCardEffect(card, target){
    if(card.name === "甘味補給") target.hp = Math.min(target.maxHp, target.hp + 2);
    if(card.name === "応急手当") target.hp = Math.min(target.maxHp, target.hp + 4);
    if(card.name === "道路整備" || card.name === "強行軍") target.tempMove += 1;
    if(card.name === "奇襲指令") target.tempAtk += 1;
    if(card.name === "煙幕展開") target.tempAtk -= 2;
    if(card.name === "采配の旗"){ target.atk += 1; target.equipment.push(card.name); }
    if(card.name === "防災ヘルメット"){ target.def += 1; target.equipment.push(card.name); }
    if(card.name === "交通網の地図"){ target.move += 1; target.equipment.push(card.name); }
    if(card.name === "伝統の甲冑"){
        target.maxHp += 3;
        target.hp += 3;
        target.def += 1;
        target.equipment.push(card.name);
    }
}

function moveBattleUnit(unit, x, y){
    if(unit.owner !== "player") return;
    if(unit.summonSick){
        addBattleLog("出撃したターンは移動できません。");
        renderBattle();
        return;
    }
    const distance = Math.abs(unit.x - x) + Math.abs(unit.y - y);
    if(distance < 1 || unit.moved + distance > getBattleMove(unit)){
        addBattleLog("移動力が足りません。");
        renderBattle();
        return;
    }
    if(!spendBattleCost(distance)){
        addBattleLog("移動コストが不足しています。");
        renderBattle();
        return;
    }
    unit.x = x;
    unit.y = y;
    unit.moved += distance;
    unit.moveFlash = true;
    addBattleLog(unit.name + "が移動しました。");
    renderBattle();
}

function attackBattleUnit(attacker, defender){
    if(attacker.owner !== "player") return;
    if(attacker.summonSick){
        addBattleLog("出撃したターンは攻撃できません。");
        renderBattle();
        return;
    }
    if(attacker.attacked){
        addBattleLog("このユニットはすでに攻撃しました。");
        renderBattle();
        return;
    }
    if(getBattleDistance(attacker, defender) > attacker.range){
        addBattleLog("射程外です。");
        renderBattle();
        return;
    }
    if(!spendBattleCost(1)){
        addBattleLog("攻撃コストが不足しています。");
        renderBattle();
        return;
    }
    resolveBattleAttack(attacker, defender, false);
    attacker.attacked = true;
    checkBattleWin();
    renderBattle();
}

function resolveBattleAttack(attacker, defender, counter){
    const attackValue = counter ? Math.floor(getBattleAtk(attacker) / 2) : getBattleAtk(attacker);
    const damage = Math.max(1, attackValue - getBattleDef(defender));
    defender.hp -= damage;
    addBattleEffect(defender.x, defender.y, damage, false);
    addBattleLog(attacker.name + (counter ? "の反撃" : "の攻撃") + "。" + defender.name + "に" + damage + "ダメージ。");
    if(defender.hp <= 0){
        defeatBattleUnit(defender);
        return;
    }
    if(!counter && getBattleDistance(defender, attacker) <= defender.range){
        resolveBattleAttack(defender, attacker, true);
    }
}

function defeatBattleUnit(unit){
    battleState.units = battleState.units.filter(function(item){ return item.id !== unit.id; });
    const grave = unit.owner === "player" ? battleState.playerGrave : battleState.enemyGrave;
    grave.push(unit.name);
    addBattleLog(unit.name + "が撃破されました。");
}

function getBattleAtk(unit){
    return Math.max(0, unit.atk + (unit.tempAtk || 0));
}

function getBattleDef(unit){
    return unit.def;
}

function getBattleMove(unit){
    return unit.move + (unit.tempMove || 0);
}

function startPlayerBattleTurn(){
    battleState.phase = "player";
    battleState.turn++;
    resetBattleUnits("player");
    prepareBattleTurn("player");
    if(battleState.playerDeck.length === 0){
        finishBattle("敗北");
        return;
    }
    battleState.playerHand.push(battleState.playerDeck.shift());
    if(countEnemyZoneUnits("player") >= 7){
        finishBattle("勝利！");
        return;
    }
    addBattleLog("自軍ターン開始。");
    renderBattle();
}

function endPlayerBattleTurn(){
    if(!battleState || battleState.phase !== "player" || battleState.winner) return;
    selectedBattleCardIndex = null;
    selectedBattleUnitId = null;
    trimBattleHand("player");
    runEnemyBattleTurn();
}

function runEnemyBattleTurn(){
    battleState.phase = "enemy";
    resetBattleUnits("enemy");
    prepareBattleTurn("enemy");
    if(battleState.enemyDeck.length === 0){
        finishBattle("勝利！");
        return;
    }
    battleState.enemyHand.push(battleState.enemyDeck.shift());
    if(countEnemyZoneUnits("enemy") >= 7){
        finishBattle("敗北");
        return;
    }
    addBattleLog("敵軍ターン開始。");
    enemyBattleAction();
    trimBattleHand("enemy");
    if(!battleState.winner) startPlayerBattleTurn();
}

function enemyBattleAction(){
    let guard = 0;
    while(battleState.enemyCost > 0 && guard < 30){
        guard++;
        let acted = false;
        const enemyUnits = battleState.units.filter(function(unit){ return unit.owner === "enemy"; });
        for(let i = 0; i < enemyUnits.length; i++){
            const unit = enemyUnits[i];
            const target = findNearestBattleTarget(unit, "player");
            if(target && getBattleDistance(unit, target) <= unit.range && !unit.attacked && battleState.enemyCost >= 1){
                spendBattleCost(1);
                resolveBattleAttack(unit, target, false);
                unit.attacked = true;
                acted = true;
                checkBattleWin();
                if(battleState.winner) return;
            }
        }
        const movingUnit = battleState.units.find(function(unit){
            return unit.owner === "enemy" && unit.type !== "general" && !unit.summonSick && !unit.attacked && unit.moved < getBattleMove(unit);
        });
        if(movingUnit && battleState.enemyCost >= 1){
            const target = findNearestBattleTarget(movingUnit, "player");
            const next = getStepToward(movingUnit, target);
            if(next && !getBattleUnitAt(next.x, next.y)){
                movingUnit.x = next.x;
                movingUnit.y = next.y;
                movingUnit.moved += 1;
                movingUnit.moveFlash = true;
                battleState.enemyCost -= 1;
                addBattleLog("敵軍の" + movingUnit.name + "が前進。");
                acted = true;
            }
        }
        const playableIndex = battleState.enemyHand.findIndex(function(card){
            return card.type === "unit" && card.cost <= battleState.enemyCost;
        });
        if(!acted && playableIndex >= 0){
            const spot = findEnemyDeploySpot();
            if(spot){
                const card = battleState.enemyHand[playableIndex];
                spendBattleCost(card.cost);
                battleState.units.push(createBattleUnit(card, "enemy", spot.x, spot.y, false));
                battleState.enemyHand.splice(playableIndex, 1);
                addBattleLog("敵軍が" + card.name + "を出撃。");
                acted = true;
            }
        }
        const movable = battleState.units.find(function(unit){
            return unit.owner === "enemy" && unit.type !== "general" && !unit.summonSick && !unit.attacked && unit.moved < getBattleMove(unit);
        });
        if(movable && battleState.enemyCost >= 1){
            const target = findNearestBattleTarget(movable, "player");
            const next = getStepToward(movable, target);
            if(next && !getBattleUnitAt(next.x, next.y)){
                movable.x = next.x;
                movable.y = next.y;
                movable.moved += 1;
                movable.moveFlash = true;
                battleState.enemyCost -= 1;
                addBattleLog("敵軍の" + movable.name + "が前進。");
                acted = true;
            }
        }
        if(!acted) break;
    }
}

function resetBattleUnits(owner){
    for(let i = 0; i < battleState.units.length; i++){
        const unit = battleState.units[i];
        if(unit.owner === owner){
            unit.moved = 0;
            unit.attacked = false;
            unit.summonSick = false;
            unit.tempAtk = 0;
            unit.tempMove = 0;
        }
    }
}

function trimBattleHand(owner){
    const hand = owner === "player" ? battleState.playerHand : battleState.enemyHand;
    const grave = owner === "player" ? battleState.playerGrave : battleState.enemyGrave;
    while(hand.length > 7){
        const discarded = hand.pop();
        grave.push(discarded.name);
        addBattleLog((owner === "player" ? "自軍" : "敵軍") + "が手札上限で" + discarded.name + "を捨てました。");
    }
}

function findNearestBattleTarget(unit, targetOwner){
    const targets = battleState.units.filter(function(item){ return item.owner === targetOwner; });
    targets.sort(function(a, b){ return getBattleDistance(unit, a) - getBattleDistance(unit, b); });
    return targets[0];
}

function getStepToward(unit, target){
    if(!target) return null;
    const dx = target.x === unit.x ? 0 : target.x > unit.x ? 1 : -1;
    const dy = target.y === unit.y ? 0 : target.y > unit.y ? 1 : -1;
    const options = [
        { x: unit.x + dx, y: unit.y },
        { x: unit.x, y: unit.y + dy },
        { x: unit.x + dx, y: unit.y + dy }
    ];
    return options.find(function(pos){
        return pos.x >= 1 && pos.x <= battleState.width && pos.y >= 1 && pos.y <= battleState.height;
    });
}

function findEnemyDeploySpot(){
    for(let y = battleState.height - 2; y <= battleState.height; y++){
        for(let x = 1; x <= battleState.width; x++){
            if(!getBattleUnitAt(x, y)) return { x, y };
        }
    }
    return null;
}

function countEnemyZoneUnits(owner){
    return battleState.units.filter(function(unit){
        if(unit.owner !== owner || unit.type === "general") return false;
        return owner === "player" ? unit.y >= battleState.height - 2 : unit.y <= 3;
    }).length;
}

function checkBattleWin(){
    const playerGeneral = battleState.units.find(function(unit){ return unit.owner === "player" && unit.type === "general"; });
    const enemyGeneral = battleState.units.find(function(unit){ return unit.owner === "enemy" && unit.type === "general"; });
    if(!enemyGeneral) finishBattle("勝利！");
    if(!playerGeneral) finishBattle("敗北");
}

function finishBattle(text){
    battleState.winner = text;
    const cutin = document.getElementById("battleCutin");
    const cutinText = document.getElementById("battleCutinText");
    if(cutin && cutinText){
        cutinText.textContent = text;
        cutin.classList.add("show");
    }
    setTimeout(function(){
        location.href = "normal_assembly.html";
    }, 2200);
}

function startBattleLongPress(cardOrUnit){
    clearBattleLongPress();
    battleLongPressTimer = setTimeout(function(){
        openBattleCardDetail(cardOrUnit);
    }, 520);
}

function clearBattleLongPress(){
    if(battleLongPressTimer){
        clearTimeout(battleLongPressTimer);
        battleLongPressTimer = null;
    }
}

function openBattleCardDetail(cardOrUnit){
    const modal = document.getElementById("battleCardModal");
    const detail = document.getElementById("battleCardDetail");
    if(!modal || !detail) return;
    detail.innerHTML = "<h2>" + cardOrUnit.name + "</h2>" +
        "<div class='battle-detail-card'>" +
        ((cardOrUnit.type === "unit" || cardOrUnit.type === "general") ? getBattleUnitDetailHtml(cardOrUnit) : getBattleCardHtml(cardOrUnit)) +
        "</div>" +
        "<p>" + (cardOrUnit.text || "") + "</p>";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function closeBattleCardDetail(){
    const modal = document.getElementById("battleCardModal");
    if(modal){
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    }
}

let waveBattleState = null;

const waveBattleAllies = [
    { name:"扶桑", role:"大将", rarity:"LR", friendship:5, hp:6200, atk:4200, def:3900, speed:16, attr:"光", skill:"味方1体を1800回復", item:true },
    { name:"渋谷", role:"戦闘員", rarity:"LR", friendship:1, hp:4800, atk:5300, def:2600, speed:10, attr:"火", skill:"単体火力攻撃" },
    { name:"舞鶴", role:"戦闘員", rarity:"LR", friendship:1, hp:5200, atk:4300, def:3400, speed:14, attr:"水", skill:"敵全体に小ダメージ" },
    { name:"姫路", role:"戦闘員", rarity:"SSR", friendship:5, hp:5600, atk:3400, def:5200, speed:22, attr:"光", skill:"味方全体の防御+30%" },
    { name:"九戸", role:"戦闘員", rarity:"N", friendship:5, hp:2300, atk:2200, def:1800, speed:12, attr:"土", skill:"素早い通常攻撃" }
];

const waveBattleWaves = [
    [
        { name:"敵斥候", hp:3200, atk:1900, def:900, speed:18, attr:"風" },
        { name:"敵守備兵", hp:3800, atk:1700, def:1300, speed:24, attr:"土" }
    ],
    [
        { name:"敵術兵", hp:3600, atk:2400, def:900, speed:16, attr:"闇" },
        { name:"敵突撃兵", hp:4200, atk:2600, def:1200, speed:20, attr:"火" },
        { name:"敵補給兵", hp:3000, atk:1600, def:1000, speed:14, attr:"水" }
    ],
    [
        { name:"敵大将", hp:7600, atk:3100, def:1800, speed:19, attr:"闇", general:true },
        { name:"敵護衛", hp:4600, atk:2200, def:1900, speed:23, attr:"土" },
        { name:"敵砲兵", hp:3900, atk:2800, def:900, speed:25, attr:"火" }
    ]
];

function cloneWaveUnit(unit, owner, index){
    const cloned = JSON.parse(JSON.stringify(unit));
    cloned.owner = owner;
    cloned.id = owner + "-" + index + "-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
    cloned.maxHp = cloned.hp;
    cloned.nextAction = cloned.speed;
    cloned.buffs = { atk:0, def:0 };
    cloned.alive = true;
    return cloned;
}

function initBattle(){
    waveBattleState = {
        progress: 0,
        waveIndex: 0,
        allies: waveBattleAllies.map(function(unit, index){ return cloneWaveUnit(unit, "player", index); }),
        enemies: [],
        activeUnitId: "",
        selectedTargetId: "",
        paused: false,
        log: []
    };
    startWaveBattleWave(0);
}

function startWaveBattleWave(index){
    waveBattleState.waveIndex = index;
    waveBattleState.enemies = waveBattleWaves[index].map(function(unit, unitIndex){
        const enemy = cloneWaveUnit(unit, "enemy", unitIndex);
        enemy.nextAction = waveBattleState.progress + enemy.speed;
        return enemy;
    });
    waveBattleState.activeUnitId = "";
    waveBattleState.selectedTargetId = "";
    waveBattleState.paused = false;
    addWaveBattleLog("Wave " + (index + 1) + " 開始。");
    renderWaveBattle();
    advanceWaveBattle();
}

function getWaveBattleUnits(){
    return waveBattleState.allies.concat(waveBattleState.enemies).filter(function(unit){
        return unit.alive && unit.hp > 0;
    });
}

function getWaveBattleActiveUnit(){
    return getWaveBattleUnits().find(function(unit){
        return unit.id === waveBattleState.activeUnitId;
    });
}

function addWaveBattleLog(text){
    waveBattleState.log.unshift(text);
    waveBattleState.log = waveBattleState.log.slice(0, 8);
}

function showTurnCutin(unit){
    const cutin = document.getElementById("turnCutin");
    const side = document.getElementById("turnCutinSide");
    const name = document.getElementById("turnCutinName");
    if(!cutin || !side || !name) return;

    side.textContent = unit.owner === "player" ? "自軍" : "敵軍";
    name.textContent = unit.name + "の行動";
    cutin.className = "turn-cutin show " + unit.owner;

    setTimeout(function(){
        cutin.className = "turn-cutin " + unit.owner;
    }, 850);
}

function advanceWaveBattle(){
    if(!waveBattleState || waveBattleState.paused) return;

    const living = getWaveBattleUnits();
    if(living.length === 0) return;

    const nextValue = Math.min.apply(null, living.map(function(unit){
        return unit.nextAction;
    }));
    waveBattleState.progress = nextValue;

    const ready = living.filter(function(unit){
        return unit.nextAction <= nextValue;
    }).sort(function(a, b){
        return a.speed - b.speed;
    })[0];

    waveBattleState.activeUnitId = ready.id;
    waveBattleState.paused = true;
    showTurnCutin(ready);

    if(ready.owner === "enemy"){
        renderWaveBattle();
        setTimeout(function(){
            runWaveEnemyAction(ready);
        }, 650);
        return;
    }

    addWaveBattleLog(ready.name + "の行動。");
    renderWaveBattle();
}

function finishWaveUnitAction(unit){
    unit.nextAction += unit.speed;
    waveBattleState.activeUnitId = "";
    waveBattleState.selectedTargetId = "";
    waveBattleState.paused = false;
    clearWaveBattleBuffs(unit);
    renderWaveBattle();
    setTimeout(advanceWaveBattle, 550);
}

function clearWaveBattleBuffs(unit){
    if(!unit.buffs) unit.buffs = { atk:0, def:0 };
}

function getWaveStat(unit, stat){
    const base = unit[stat] || 0;
    const buff = unit.buffs && unit.buffs[stat] ? unit.buffs[stat] : 0;
    return Math.floor(base * (1 + buff / 100));
}

function calcWaveDamage(attacker, defender, skillMultiplier){
    const atk = Math.floor(getWaveStat(attacker, "atk") * (skillMultiplier || 1));
    const def = getWaveStat(defender, "def");
    return Math.max(1, Math.floor((atk - def * 0.45) / 4));
}

function damageWaveUnit(target, amount){
    if(!target.alive || target.hp <= 0) return;

    target.hp = Math.max(0, target.hp - amount);
    if(target.hp <= 0){
        target.alive = false;
        target.hitFlash = false;
        addWaveBattleLog(target.name + "を撃破。");
        return;
    }

    target.hitFlash = true;
}

function healWaveUnit(target, amount){
    if(!target.alive || target.hp <= 0) return;

    target.hp = Math.min(target.maxHp, target.hp + amount);
    target.healFlash = true;
}

function renderWaveBattle(){
    const enemyField = document.getElementById("enemyField");
    const playerField = document.getElementById("playerField");
    const timeline = document.getElementById("battleTimeline");
    const log = document.getElementById("battleLog");
    const selected = document.getElementById("selectedCardBox");
    const actions = document.getElementById("battleActionPanel");
    const turnLabel = document.getElementById("battleTurnLabel");
    const progressLabel = document.getElementById("battleCostLabel");
    const orb = document.getElementById("battleProgressOrb");
    const playerInfo = document.getElementById("playerInfo");
    const enemyInfo = document.getElementById("enemyInfo");

    if(enemyField){
        enemyField.className = "wave-enemies wave-count-" + waveBattleState.enemies.length;
        enemyField.innerHTML = waveBattleState.enemies.map(renderWaveUnitCard).join("");
    }
    if(playerField){
        playerField.className = "wave-allies wave-count-" + waveBattleState.allies.length;
        playerField.innerHTML = waveBattleState.allies.map(renderWaveUnitCard).join("");
    }
    if(timeline) timeline.innerHTML = renderWaveTimeline();
    if(log) log.innerHTML = waveBattleState.log.map(function(item){ return "<p>" + item + "</p>"; }).join("");
    if(turnLabel) turnLabel.textContent = "Wave " + (waveBattleState.waveIndex + 1) + "/" + waveBattleWaves.length;
    if(progressLabel) progressLabel.textContent = "進行値 " + waveBattleState.progress;
    if(orb) orb.textContent = waveBattleState.progress;
    if(playerInfo) playerInfo.innerHTML = getWaveSideInfo("player");
    if(enemyInfo) enemyInfo.innerHTML = getWaveSideInfo("enemy");

    const active = getWaveBattleActiveUnit();
    if(selected) selected.innerHTML = active ? renderWaveUnitDetail(active) : "進行中";
    if(actions) actions.innerHTML = active && active.owner === "player" ? renderWaveActions(active) : "";

    setTimeout(function(){
        for(let i = 0; i < getWaveBattleUnits().length; i++){
            getWaveBattleUnits()[i].hitFlash = false;
            getWaveBattleUnits()[i].healFlash = false;
        }
    }, 500);
}

function renderWaveUnitCard(unit){
    const activeClass = unit.id === waveBattleState.activeUnitId ? " active" : "";
    const selectedClass = unit.id === waveBattleState.selectedTargetId ? " selected" : "";
    const deadClass = unit.alive ? "" : " defeated";
    const flashClass = unit.hitFlash ? " hit" : unit.healFlash ? " heal" : "";
    const hpRate = Math.max(0, Math.round((unit.hp / unit.maxHp) * 100));
    return "<button class='wave-unit-card " + unit.owner + activeClass + selectedClass + deadClass + flashClass + "' onclick=\"selectWaveTarget('" + unit.id + "')\" onmousedown=\"startWaveCardPress('" + unit.id + "')\" onmouseup='clearBattleLongPress()' onmouseleave='clearBattleLongPress()' ontouchstart=\"startWaveCardPress('" + unit.id + "')\" ontouchend='clearBattleLongPress()'>" +
        "<span>" + unit.role + " " + unit.attr + "</span>" +
        "<strong>" + unit.name + "</strong>" +
        "<div class='wave-hp'><i style='width:" + hpRate + "%'></i></div>" +
        "<small>HP " + unit.hp + "/" + unit.maxHp + "</small>" +
        "<small>攻" + getWaveStat(unit, "atk") + " 防" + getWaveStat(unit, "def") + " 行" + unit.speed + "</small>" +
    "</button>";
}

function renderWaveUnitDetail(unit){
    return "<strong>" + unit.name + "</strong>" +
        "<small>" + unit.role + " / " + unit.rarity + "★" + unit.friendship + " / " + unit.attr + "</small>" +
        "<small>HP " + unit.hp + "/" + unit.maxHp + "</small>" +
        "<small>攻撃 " + getWaveStat(unit, "atk") + " / 防御 " + getWaveStat(unit, "def") + " / 行動値 " + unit.speed + "</small>" +
        "<small>次回行動 " + unit.nextAction + "</small>";
}

function renderWaveTimeline(){
    return getWaveBattleUnits().slice().sort(function(a, b){
        return a.nextAction - b.nextAction;
    }).slice(0, 8).map(function(unit){
        return "<div class='rt-timeline-item " + unit.owner + "'><strong>" + unit.name + "</strong><span>" + unit.nextAction + "</span></div>";
    }).join("");
}

function renderWaveActions(unit){
    const itemButton = unit.role === "大将" ? "<button onclick='useWaveItem()'>アイテム</button>" : "";
    return "<button onclick='waveAttack()'>攻撃</button>" +
        "<button onclick='waveSkill()'>スキル</button>" +
        itemButton +
        "<button onclick='waveWait()'>何もしない</button>";
}

function getWaveSideInfo(owner){
    const list = owner === "player" ? waveBattleState.allies : waveBattleState.enemies;
    const alive = list.filter(function(unit){ return unit.alive && unit.hp > 0; }).length;
    const general = list.find(function(unit){ return unit.role === "大将" || unit.general; });
    return "<p>" + (owner === "player" ? "味方" : "敵") + " 生存 " + alive + "/" + list.length + "</p>" +
        "<p>大将HP " + (general ? general.hp + "/" + general.maxHp : "-") + "</p>";
}

function selectWaveTarget(id){
    waveBattleState.selectedTargetId = id;
    renderWaveBattle();
}

function getSelectedWaveTarget(owner){
    const active = getWaveBattleActiveUnit();
    const opponents = active.owner === "player" ? waveBattleState.enemies : waveBattleState.allies;
    const selected = opponents.find(function(unit){
        return unit.id === waveBattleState.selectedTargetId && unit.alive && unit.hp > 0;
    });
    return selected || opponents.find(function(unit){ return unit.alive && unit.hp > 0; });
}

function waveAttack(){
    const active = getWaveBattleActiveUnit();
    if(!active || active.owner !== "player") return;
    const target = getSelectedWaveTarget("enemy");
    if(!target) return;
    playGameSound("attack");
    const damage = calcWaveDamage(active, target, 1);
    damageWaveUnit(target, damage);
    addWaveBattleLog(active.name + "の攻撃。" + target.name + "に" + damage + "ダメージ。");
    checkWaveBattleResult(active);
}

function waveSkill(){
    const active = getWaveBattleActiveUnit();
    if(!active || active.owner !== "player") return;
    playGameSound("skill");
    if(active.name === "扶桑"){
        const target = waveBattleState.allies.filter(function(unit){ return unit.alive; }).sort(function(a, b){ return (a.hp / a.maxHp) - (b.hp / b.maxHp); })[0];
        healWaveUnit(target, 1800);
        addWaveBattleLog("扶桑のスキル。" + target.name + "を1800回復。");
    }else if(active.name === "舞鶴"){
        const targets = waveBattleState.enemies.filter(function(unit){ return unit.alive; });
        for(let i = 0; i < targets.length; i++){
            const damage = calcWaveDamage(active, targets[i], .62);
            damageWaveUnit(targets[i], damage);
        }
        addWaveBattleLog("舞鶴の砲撃。敵全体にダメージ。");
    }else if(active.name === "姫路"){
        for(let i = 0; i < waveBattleState.allies.length; i++){
            if(waveBattleState.allies[i].alive) waveBattleState.allies[i].buffs.def += 30;
        }
        addWaveBattleLog("姫路の守り。味方全体の防御+30%。");
    }else{
        const target = getSelectedWaveTarget("enemy");
        const damage = calcWaveDamage(active, target, 1.35);
        damageWaveUnit(target, damage);
        addWaveBattleLog(active.name + "のスキル。" + target.name + "に" + damage + "ダメージ。");
    }
    checkWaveBattleResult(active);
}

function useWaveItem(){
    const active = getWaveBattleActiveUnit();
    if(!active || active.owner !== "player" || active.role !== "大将") return;
    const target = waveBattleState.allies.filter(function(unit){ return unit.alive; }).sort(function(a, b){ return (a.hp / a.maxHp) - (b.hp / b.maxHp); })[0];
    healWaveUnit(target, 2500);
    addWaveBattleLog("補給薬を使用。" + target.name + "を2500回復。");
    checkWaveBattleResult(active);
}

function waveWait(){
    const active = getWaveBattleActiveUnit();
    if(!active || active.owner !== "player") return;
    addWaveBattleLog(active.name + "は待機。");
    finishWaveUnitAction(active);
}

function runWaveEnemyAction(enemy){
    if(!enemy.alive){
        finishWaveUnitAction(enemy);
        return;
    }
    const target = waveBattleState.allies.filter(function(unit){ return unit.alive; }).sort(function(a, b){
        if(a.role === "大将" && b.role !== "大将") return 1;
        if(b.role === "大将" && a.role !== "大将") return -1;
        return (a.hp / a.maxHp) - (b.hp / b.maxHp);
    })[0];
    if(!target) return;
    const damage = calcWaveDamage(enemy, target, enemy.general ? 1.2 : 1);
    playGameSound("hit");
    damageWaveUnit(target, damage);
    addWaveBattleLog(enemy.name + "の攻撃。" + target.name + "に" + damage + "ダメージ。");
    checkWaveBattleResult(enemy);
}

function checkWaveBattleResult(active){
    const playerGeneral = waveBattleState.allies.find(function(unit){ return unit.role === "大将"; });
    if(!playerGeneral || playerGeneral.hp <= 0){
        finishWaveBattle("敗北");
        return;
    }
    const enemiesAlive = waveBattleState.enemies.some(function(unit){ return unit.alive && unit.hp > 0; });
    if(!enemiesAlive){
        if(waveBattleState.waveIndex + 1 >= waveBattleWaves.length){
            finishWaveBattle("勝利！");
            return;
        }
        addWaveBattleLog("Wave " + (waveBattleState.waveIndex + 1) + " クリア。マップが進行します。");
        setTimeout(function(){
            resetWaveAlliesForNextWave();
            startWaveBattleWave(waveBattleState.waveIndex + 1);
        }, 1200);
        return;
    }
    finishWaveUnitAction(active);
}

function resetWaveAlliesForNextWave(){
    for(let i = 0; i < waveBattleState.allies.length; i++){
        const unit = waveBattleState.allies[i];
        if(unit.hp > 0){
            unit.alive = true;
            unit.nextAction = waveBattleState.progress + unit.speed;
        }
    }
}

function finishWaveBattle(text){
    if(text.indexOf("勝利") !== -1){
        playGameSound("win");
    }else{
        playGameSound("cancel");
    }
    const cutin = document.getElementById("battleCutin");
    const cutinText = document.getElementById("battleCutinText");
    if(cutin && cutinText){
        cutinText.textContent = text;
        cutin.classList.add("show");
    }
    setTimeout(function(){
        location.href = "normal_assembly.html";
    }, 2200);
}

function leaveRealtimeBattle(){
    location.href = "normal_assembly.html";
}

function startWaveCardPress(id){
    const unit = getWaveBattleUnits().find(function(item){ return item.id === id; });
    if(unit) startBattleLongPress(unit);
}

function openBattleCardDetail(cardOrUnit){
    const modal = document.getElementById("battleCardModal");
    const detail = document.getElementById("battleCardDetail");
    if(!modal || !detail) return;
    detail.innerHTML = "<h2>" + cardOrUnit.name + "</h2><div class='battle-detail-card'>" + renderWaveUnitDetail(cardOrUnit) + "</div><p>" + (cardOrUnit.skill || cardOrUnit.text || "") + "</p>";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function renderWaveUnitCard(unit){
    const activeClass = unit.id === waveBattleState.activeUnitId ? " active" : "";
    const selectedClass = unit.id === waveBattleState.selectedTargetId ? " selected" : "";
    const deadClass = unit.alive ? "" : " defeated";
    const flashClass = unit.hitFlash ? " hit" : unit.healFlash ? " heal" : "";
    const hpRate = Math.max(0, Math.round((unit.hp / unit.maxHp) * 100));
    let html = "<button class='wave-unit-card " + unit.owner + activeClass + selectedClass + deadClass + flashClass + "' onclick=\"selectWaveTarget('" + unit.id + "')\" onmousedown=\"startWaveCardPress('" + unit.id + "')\" onmouseup='clearBattleLongPress()' onmouseleave='clearBattleLongPress()' ontouchstart=\"startWaveCardPress('" + unit.id + "')\" ontouchend='clearBattleLongPress()'>";

    if(unit.owner === "enemy"){
        html += "<strong>" + unit.name + "</strong>" +
            "<div class='wave-hp enemy-only'><i style='width:" + hpRate + "%'></i></div>";
    }else{
        html += "<span>" + unit.role + " " + unit.attr + "</span>" +
            "<strong>" + unit.name + "</strong>" +
            "<div class='wave-hp'><i style='width:" + hpRate + "%'></i></div>" +
            "<small>HP " + unit.hp + "/" + unit.maxHp + "</small>" +
            "<small>攻" + getWaveStat(unit, "atk") + " 防" + getWaveStat(unit, "def") + " 行" + unit.speed + "</small>";
    }

    return html + "</button>";
}

const shopItems = [
    {
        id: "healing_ration",
        name: "回復糧食",
        type: "回復",
        price: 120,
        text: "戦闘中、味方1体のHPを少し回復する消費アイテム。"
    },
    {
        id: "field_medicine",
        name: "応急医療箱",
        type: "回復",
        price: 260,
        text: "戦闘中、味方1体のHPを大きく回復する消費アイテム。"
    },
    {
        id: "fire_order",
        name: "火力支援要請",
        type: "攻撃",
        price: 420,
        text: "敵1体へ固定ダメージを与える消費アイテム。"
    },
    {
        id: "morale_banner",
        name: "士気高揚の旗",
        type: "強化",
        price: 300,
        text: "味方全体の攻撃を一時的に上げる消費アイテム。"
    },
    {
        id: "smoke_screen",
        name: "煙幕筒",
        type: "妨害",
        price: 220,
        text: "敵1体の次の攻撃を弱める消費アイテム。"
    },
    {
        id: "speed_drink",
        name: "俊足ドリンク",
        type: "加速",
        price: 180,
        text: "味方1体の次回行動を少し早める消費アイテム。"
    }
];

function getShopInventory(){
    const stored = parseStoredJson(localStorage.getItem("shopInventory"), {});
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
}

function saveShopInventory(inventory){
    localStorage.setItem("shopInventory", JSON.stringify(inventory));
}

function initShop(){
    if(!document.getElementById("shopList")) return;

    updateFinancialResourceDisplays();
    renderShop();
}

function renderShop(){
    const list = document.getElementById("shopList");
    const inventoryBox = document.getElementById("shopInventory");
    const inventory = getShopInventory();

    if(list){
        list.innerHTML = shopItems.map(function(item){
            const count = inventory[item.id] || 0;
            return "<article class='shop-card'>" +
                "<div class='shop-card-main'>" +
                    "<span>" + item.type + "</span>" +
                    "<h2>" + item.name + "</h2>" +
                    "<p>" + item.text + "</p>" +
                    "<small>所持 " + count + "</small>" +
                "</div>" +
                "<div class='shop-card-buy'>" +
                    "<strong>" + formatMoney(item.price) + "</strong>" +
                    "<button onclick=\"buyShopItem('" + item.id + "')\">購入</button>" +
                "</div>" +
            "</article>";
        }).join("");
    }

    if(inventoryBox){
        const ownedRows = shopItems.map(function(item){
            return "<p><strong>" + item.name + "</strong><span>" + (inventory[item.id] || 0) + "</span></p>";
        }).join("");
        inventoryBox.innerHTML = ownedRows || "<p>まだ所持アイテムがありません。</p>";
    }
}

function buyShopItem(itemId){
    const item = shopItems.find(function(entry){
        return entry.id === itemId;
    });
    if(!item) return;

    const current = getFinancialResources();
    if(current < item.price){
        alert("財源が不足しています。");
        return;
    }

    localStorage.setItem("financialResources", current - item.price);
    const inventory = getShopInventory();
    inventory[item.id] = (inventory[item.id] || 0) + 1;
    saveShopInventory(inventory);
    playGameSound("purchase");
    updateFinancialResourceDisplays();
    renderShop();
}

let rhythmState = null;
let rhythmKeyBound = false;

function initRhythmGame(){
    const board = document.getElementById("rhythmBoard");
    if(!board) return;

    rhythmState = {
        running: false,
        startTime: 0,
        lastSpawn: 0,
        nextNoteId: 1,
        score: 0,
        combo: 0,
        notes: [],
        animationId: null,
        songLength: 30000,
        spawnInterval: 620,
        travelTime: 2100
    };

    board.querySelectorAll(".rhythm-lane").forEach(function(lane){
        lane.addEventListener("pointerdown", function(event){
            event.preventDefault();
            tapRhythmLane(Number(lane.dataset.lane));
        });
    });

    if(!rhythmKeyBound){
        rhythmKeyBound = true;
        window.addEventListener("keydown", function(event){
            if(!rhythmState || !document.getElementById("rhythmBoard")) return;
            const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3 };
            if(Object.prototype.hasOwnProperty.call(keyMap, event.key)){
                tapRhythmLane(keyMap[event.key]);
            }else if(event.code === "Space"){
                tapRhythmAnyLane();
            }
        });
    }

    renderRhythmGame();
}

function startRhythmGame(){
    if(!rhythmState) initRhythmGame();
    if(!rhythmState || rhythmState.running) return;

    clearRhythmNotes();
    rhythmState.running = true;
    rhythmState.startTime = performance.now();
    rhythmState.lastSpawn = -rhythmState.spawnInterval;
    rhythmState.nextNoteId = 1;
    rhythmState.score = 0;
    rhythmState.combo = 0;
    rhythmState.notes = [];
    setRhythmJudge("Start");
    rhythmLoop();
}

function stopRhythmGame(){
    if(!rhythmState) return;
    rhythmState.running = false;
    if(rhythmState.animationId) cancelAnimationFrame(rhythmState.animationId);
    rhythmState.animationId = null;
    setRhythmJudge("Stop");
    renderRhythmGame();
}

function rhythmLoop(){
    if(!rhythmState || !rhythmState.running) return;

    const now = performance.now();
    const elapsed = now - rhythmState.startTime;

    if(elapsed - rhythmState.lastSpawn >= rhythmState.spawnInterval && elapsed < rhythmState.songLength - 1200){
        spawnRhythmNote(elapsed);
        rhythmState.lastSpawn = elapsed;
    }

    rhythmState.notes.forEach(function(note){
        if(note.hit) return;
        const age = elapsed - note.spawnAt;
        const progress = age / rhythmState.travelTime;
        if(progress > 1.16){
            note.hit = true;
            note.missed = true;
            rhythmState.combo = 0;
            setRhythmJudge("Miss");
        }
    });

    rhythmState.notes = rhythmState.notes.filter(function(note){
        return !note.hit || elapsed - note.spawnAt < rhythmState.travelTime + 520;
    });

    renderRhythmGame();

    if(elapsed >= rhythmState.songLength && rhythmState.notes.length === 0){
        rhythmState.running = false;
        setRhythmJudge("Finish");
        renderRhythmGame();
        return;
    }

    rhythmState.animationId = requestAnimationFrame(rhythmLoop);
}

function spawnRhythmNote(elapsed){
    const pattern = [0, 2, 1, 3, 0, 1, 2, 3, 1, 0, 3, 2];
    const lane = pattern[(rhythmState.nextNoteId - 1) % pattern.length];
    rhythmState.notes.push({
        id: rhythmState.nextNoteId++,
        lane: lane,
        spawnAt: elapsed,
        hit: false,
        missed: false
    });
}

function tapRhythmLane(lane){
    if(!rhythmState || !rhythmState.running) return;
    judgeRhythmTap(lane);
}

function tapRhythmAnyLane(){
    if(!rhythmState || !rhythmState.running) return;

    const elapsed = performance.now() - rhythmState.startTime;
    let best = null;
    rhythmState.notes.forEach(function(note){
        if(note.hit) return;
        const diff = Math.abs((elapsed - note.spawnAt) - rhythmState.travelTime);
        if(!best || diff < best.diff){
            best = { note: note, diff: diff };
        }
    });

    if(best) judgeRhythmTap(best.note.lane);
}

function judgeRhythmTap(lane){
    const elapsed = performance.now() - rhythmState.startTime;
    let target = null;
    let targetDiff = Infinity;

    rhythmState.notes.forEach(function(note){
        if(note.hit || note.lane !== lane) return;
        const diff = Math.abs((elapsed - note.spawnAt) - rhythmState.travelTime);
        if(diff < targetDiff){
            target = note;
            targetDiff = diff;
        }
    });

    if(!target || targetDiff > 230){
        rhythmState.combo = 0;
        playGameSound("cancel");
        setRhythmJudge("Miss");
        renderRhythmGame();
        return;
    }

    target.hit = true;
    rhythmState.combo += 1;
    playGameSound("rhythmTap");

    if(targetDiff <= 70){
        rhythmState.score += 1000 + rhythmState.combo * 8;
        setRhythmJudge("Perfect");
    }else if(targetDiff <= 130){
        rhythmState.score += 700 + rhythmState.combo * 5;
        setRhythmJudge("Great");
    }else{
        rhythmState.score += 400 + rhythmState.combo * 3;
        setRhythmJudge("Good");
    }

    flashRhythmLane(lane);
    renderRhythmGame();
}

function renderRhythmGame(){
    if(!rhythmState) return;

    const score = document.getElementById("rhythmScore");
    const combo = document.getElementById("rhythmCombo");
    const board = document.getElementById("rhythmBoard");
    if(score) score.textContent = rhythmState.score;
    if(combo) combo.textContent = rhythmState.combo;
    if(!board) return;

    board.querySelectorAll(".rhythm-note").forEach(function(note){
        note.remove();
    });

    const elapsed = rhythmState.running ? performance.now() - rhythmState.startTime : 0;
    rhythmState.notes.forEach(function(note){
        if(note.hit) return;
        const progress = Math.max(0, Math.min(1.18, (elapsed - note.spawnAt) / rhythmState.travelTime));
        const item = document.createElement("div");
        item.className = "rhythm-note lane-" + note.lane;
        item.style.left = "calc(" + (note.lane * 25) + "% + 6px)";
        item.style.top = (progress * 86) + "%";
        board.appendChild(item);
    });
}

function setRhythmJudge(text){
    const judge = document.getElementById("rhythmJudge");
    if(judge) judge.textContent = text;
}

function flashRhythmLane(lane){
    const target = document.querySelector(".rhythm-lane[data-lane='" + lane + "']");
    if(!target) return;
    target.classList.remove("hit");
    void target.offsetWidth;
    target.classList.add("hit");
}

function clearRhythmNotes(){
    const board = document.getElementById("rhythmBoard");
    if(board){
        board.querySelectorAll(".rhythm-note").forEach(function(note){
            note.remove();
        });
    }
}

const gameAudioFiles = {
    click: "assets/audio/click_kenney_metal_click.ogg",
    cancel: "assets/audio/cancel_kenney_metal_latch.ogg",
    purchase: "assets/audio/purchase_kenney_coins.ogg",
    attack: "assets/audio/attack_kenney_knife_slice.ogg",
    hit: "assets/audio/hit_kenney_metal_pot.ogg",
    skill: "assets/audio/skill_kenney_hit_jingle.ogg",
    win: "assets/audio/win_kenney_steel_jingle.ogg",
    rhythmTap: "assets/audio/rhythm_tap_kenney_hit.ogg",
    homeBgm: "assets/audio/bgm_pops_16bit.wav",
    battleBgm: "assets/audio/bgm_pops_16bit.wav"
};

const gameAudioFallbackFiles = {
    homeBgm: "assets/audio/kenney_music-jingles/Preview.ogg",
    battleBgm: "assets/audio/kenney_music-jingles/Audio/8-Bit jingles/jingles_NES00.ogg"
};

let gameAudioState = {
    unlocked: false,
    setupDone: false,
    bgmStarted: false,
    synthBgm: null,
    bufferBgm: null,
    bufferContext: null,
    bufferCache: {},
    currentBgm: null,
    currentBgmName: "",
    settings: null
};

function getGameAudioSettings(){
    if(gameAudioState.settings) return gameAudioState.settings;

    const saved = parseStoredJson(localStorage.getItem("cwAudioSettings"), null);
    gameAudioState.settings = {
        muted: saved && typeof saved.muted === "boolean" ? saved.muted : false,
        bgmVolume: saved && typeof saved.bgmVolume === "number" ? saved.bgmVolume : 0.42,
        seVolume: saved && typeof saved.seVolume === "number" ? saved.seVolume : 0.72
    };
    return gameAudioState.settings;
}

function saveGameAudioSettings(){
    localStorage.setItem("cwAudioSettings", JSON.stringify(getGameAudioSettings()));
    updateGameBgmVolume();
    renderAudioPanel();
}

function playGameSound(name){
    const settings = getGameAudioSettings();
    if(settings.muted || !gameAudioFiles[name]) return;

    try{
        const audio = new Audio(new URL(gameAudioFiles[name], location.href).href);
        audio.volume = Math.max(0, Math.min(1, settings.seVolume));
        audio.play().catch(function(){});
    }catch(error){}
}

function getPageBgmName(){
    const path = location.pathname || "";
    if(path.indexOf("battle.html") !== -1 || path.indexOf("rhythm.html") !== -1){
        return "battleBgm";
    }
    if(path.indexOf("home.html") !== -1 || path.indexOf("index.html") !== -1 || path.indexOf("gikai.html") !== -1 || path.indexOf("normal_assembly.html") !== -1 || path.indexOf("shop.html") !== -1 || path.indexOf("syouhei.html") !== -1){
        return "homeBgm";
    }
    return "homeBgm";
}

function getBufferAudioContext(){
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(!AudioContextClass) return null;
    if(!gameAudioState.bufferContext || gameAudioState.bufferContext.state === "closed"){
        gameAudioState.bufferContext = new AudioContextClass();
    }
    return gameAudioState.bufferContext;
}

function loadWavBgmBuffer(bgmName){
    if(gameAudioState.bufferCache[bgmName]) return gameAudioState.bufferCache[bgmName];

    const context = getBufferAudioContext();
    if(!context || !gameAudioFiles[bgmName]){
        return Promise.reject(new Error("AudioContext unavailable"));
    }

    gameAudioState.bufferCache[bgmName] = new Promise(function(resolve, reject){
        const request = new XMLHttpRequest();
        request.open("GET", new URL(gameAudioFiles[bgmName], location.href).href, true);
        request.responseType = "arraybuffer";
        request.onload = function(){
            if(request.status !== 0 && (request.status < 200 || request.status >= 300)){
                reject(new Error("BGM load failed"));
                return;
            }

            try{
                resolve(parsePcmWavToAudioBuffer(request.response, context));
            }catch(error){
                reject(error);
            }
        };
        request.onerror = function(){
            reject(new Error("BGM request failed"));
        };
        request.send();
    });

    return gameAudioState.bufferCache[bgmName];
}

function parsePcmWavToAudioBuffer(arrayBuffer, context){
    const view = new DataView(arrayBuffer);
    function text(offset, length){
        let value = "";
        for(let i = 0; i < length; i++) value += String.fromCharCode(view.getUint8(offset + i));
        return value;
    }

    if(text(0, 4) !== "RIFF" || text(8, 4) !== "WAVE"){
        throw new Error("Not a WAV file");
    }

    let offset = 12;
    let fmt = null;
    let dataOffset = 0;
    let dataSize = 0;

    while(offset + 8 <= view.byteLength){
        const id = text(offset, 4);
        const size = view.getUint32(offset + 4, true);
        const body = offset + 8;
        if(id === "fmt "){
            fmt = {
                format: view.getUint16(body, true),
                channels: view.getUint16(body + 2, true),
                sampleRate: view.getUint32(body + 4, true),
                bits: view.getUint16(body + 14, true)
            };
        }else if(id === "data"){
            dataOffset = body;
            dataSize = size;
            break;
        }
        offset += 8 + size + (size % 2);
    }

    if(!fmt || !dataOffset || fmt.format !== 1 || (fmt.bits !== 16 && fmt.bits !== 24)){
        throw new Error("Unsupported WAV format");
    }

    const bytesPerSample = fmt.bits / 8;
    const frameCount = Math.floor(dataSize / (bytesPerSample * fmt.channels));
    const buffer = context.createBuffer(fmt.channels, frameCount, fmt.sampleRate);

    for(let channel = 0; channel < fmt.channels; channel++){
        const output = buffer.getChannelData(channel);
        for(let frame = 0; frame < frameCount; frame++){
            const sampleOffset = dataOffset + (frame * fmt.channels + channel) * bytesPerSample;
            if(fmt.bits === 16){
                output[frame] = view.getInt16(sampleOffset, true) / 32768;
            }else{
                let value = view.getUint8(sampleOffset) | (view.getUint8(sampleOffset + 1) << 8) | (view.getUint8(sampleOffset + 2) << 16);
                if(value & 0x800000) value |= 0xff000000;
                output[frame] = Math.max(-1, Math.min(1, value / 8388608));
            }
        }
    }

    return buffer;
}

function startBufferGameBgm(bgmName){
    const settings = getGameAudioSettings();
    if(settings.muted) return Promise.reject(new Error("Muted"));

    const context = getBufferAudioContext();
    if(!context) return Promise.reject(new Error("AudioContext unavailable"));

    return loadWavBgmBuffer(bgmName).then(function(buffer){
        stopBufferGameBgm();
        stopSynthGameBgm();
        if(gameAudioState.currentBgm) gameAudioState.currentBgm.pause();

        const source = context.createBufferSource();
        const gain = context.createGain();
        source.buffer = buffer;
        source.loop = true;
        gain.gain.value = Math.max(0, Math.min(1, settings.bgmVolume));
        source.connect(gain);
        gain.connect(context.destination);
        source.start(0);

        gameAudioState.bufferBgm = { source: source, gain: gain, bgmName: bgmName };
        gameAudioState.currentBgmName = bgmName;
        gameAudioState.bgmStarted = true;

        if(context.state === "suspended"){
            return context.resume().then(function(){
                return buffer;
            });
        }
        return buffer;
    });
}

function stopBufferGameBgm(){
    if(!gameAudioState.bufferBgm) return;
    try{
        gameAudioState.bufferBgm.source.stop();
    }catch(error){}
    gameAudioState.bufferBgm = null;
}

function startGameBgm(){
    const bgmName = getPageBgmName();
    const settings = getGameAudioSettings();
    if(!bgmName || settings.muted || !gameAudioFiles[bgmName]) return;

    startBufferGameBgm(bgmName).catch(function(){
        startFallbackGameBgm(bgmName);
    });
    return;

    if(gameAudioState.currentBgm && gameAudioState.currentBgmName === bgmName){
        updateGameBgmVolume();
        gameAudioState.currentBgm.play().then(function(){
            gameAudioState.bgmStarted = true;
        }).catch(function(){
            gameAudioState.bgmStarted = false;
        });
        return;
    }

    stopGameBgm();
    try{
        let bgm = document.getElementById("gameBgmAudio");
        if(!bgm){
            bgm = document.createElement("audio");
            bgm.id = "gameBgmAudio";
            bgm.preload = "auto";
            bgm.style.display = "none";
            document.body.appendChild(bgm);
        }
        bgm.src = new URL(gameAudioFiles[bgmName], location.href).href;
        bgm.loop = true;
        bgm.playsInline = true;
        bgm.volume = Math.max(0, Math.min(1, settings.bgmVolume));
        gameAudioState.currentBgm = bgm;
        gameAudioState.currentBgmName = bgmName;
        bgm.play().then(function(){
            gameAudioState.bgmStarted = true;
        }).catch(function(){
            gameAudioState.bgmStarted = false;
            startFallbackGameBgm(bgmName);
        });
    }catch(error){}
}

function autoStartGameBgm(){
    if(gameAudioState.bgmStarted) return;
    startGameBgm();
}

function startFallbackGameBgm(bgmName){
    if(!gameAudioFallbackFiles[bgmName]) return;
    const settings = getGameAudioSettings();
    try{
        const bgm = gameAudioState.currentBgm || document.getElementById("gameBgmAudio");
        if(!bgm) return;
        bgm.src = new URL(gameAudioFallbackFiles[bgmName], location.href).href;
        bgm.loop = true;
        bgm.playsInline = true;
        bgm.volume = Math.max(0, Math.min(1, settings.bgmVolume));
        bgm.play().then(function(){
            gameAudioState.bgmStarted = true;
        }).catch(function(){
            gameAudioState.bgmStarted = false;
        });
    }catch(error){}
}

function testGameBgm(){
    const settings = getGameAudioSettings();
    settings.muted = false;
    if(settings.bgmVolume < 0.25) settings.bgmVolume = 0.55;
    saveGameAudioSettings();
    stopGameBgm();

    startBufferGameBgm("homeBgm").then(function(){
        gameAudioState.unlocked = true;
        setAudioPanelStatus("BGM再生中（WAV直接再生）");
    }).catch(function(error){
        testFallbackGameBgm(error);
    });
    return;

    try{
        let bgm = document.getElementById("gameBgmAudio");
        if(!bgm){
            bgm = document.createElement("audio");
            bgm.id = "gameBgmAudio";
            bgm.preload = "auto";
            bgm.style.display = "none";
            document.body.appendChild(bgm);
        }
        bgm.src = new URL(gameAudioFiles.homeBgm, location.href).href;
        bgm.loop = true;
        bgm.playsInline = true;
        bgm.volume = Math.max(0.35, Math.min(1, settings.bgmVolume));
        gameAudioState.currentBgm = bgm;
        gameAudioState.currentBgmName = "homeBgm";
        bgm.currentTime = 0;
        bgm.play().then(function(){
            gameAudioState.unlocked = true;
            gameAudioState.bgmStarted = true;
            setAudioPanelStatus("BGM再生中（bgm_pops_16bit.wav）");
        }).catch(function(error){
            gameAudioState.bgmStarted = false;
            testFallbackGameBgm(error);
        });
    }catch(error){
        testFallbackGameBgm(error);
    }
}

function testFallbackGameBgm(firstError){
    const settings = getGameAudioSettings();
    try{
        let bgm = document.getElementById("gameBgmAudio");
        if(!bgm){
            bgm = document.createElement("audio");
            bgm.id = "gameBgmAudio";
            bgm.preload = "auto";
            bgm.style.display = "none";
            document.body.appendChild(bgm);
        }
        bgm.src = new URL(gameAudioFallbackFiles.homeBgm, location.href).href;
        bgm.loop = true;
        bgm.playsInline = true;
        bgm.volume = Math.max(0.35, Math.min(1, settings.bgmVolume));
        gameAudioState.currentBgm = bgm;
        gameAudioState.currentBgmName = "homeBgm";
        bgm.currentTime = 0;
        bgm.play().then(function(){
            gameAudioState.unlocked = true;
            gameAudioState.bgmStarted = true;
            setAudioPanelStatus("BGM再生中（MP3予備）");
        }).catch(function(secondError){
            const firstName = firstError && firstError.name ? firstError.name : "不明";
            const secondName = secondError && secondError.name ? secondError.name : "不明";
            setAudioPanelStatus("BGM失敗: WAV " + firstName + " / 予備 " + secondName);
        });
    }catch(error){
        const firstName = firstError && firstError.name ? firstError.name : "不明";
        const secondName = error && error.name ? error.name : "不明";
        setAudioPanelStatus("BGM失敗: WAV " + firstName + " / 予備 " + secondName);
    }
}

function startSynthGameBgm(bgmName){
    const settings = getGameAudioSettings();
    if(settings.muted) return false;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(!AudioContextClass) return false;

    stopSynthGameBgm();

    try{
        const context = new AudioContextClass();
        const master = context.createGain();
        master.gain.value = Math.max(0.02, Math.min(0.18, settings.bgmVolume * 0.18));
        master.connect(context.destination);

        const isBattle = bgmName === "battleBgm";
        const notes = isBattle ? [196, 233.08, 261.63, 293.66, 349.23, 293.66, 261.63, 233.08] : [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];
        const bass = isBattle ? [98, 116.54, 130.81, 146.83] : [130.81, 146.83, 123.47, 130.81];
        const stepMs = isBattle ? 230 : 420;
        let step = 0;

        function playTone(freq, duration, type, gainValue){
            if(context.state === "closed") return;
            const now = context.currentTime;
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(master);
            osc.start(now);
            osc.stop(now + duration + 0.03);
        }

        function tick(){
            playTone(notes[step % notes.length], isBattle ? 0.16 : 0.32, isBattle ? "sawtooth" : "triangle", isBattle ? 0.35 : 0.28);
            if(step % 2 === 0){
                playTone(bass[Math.floor(step / 2) % bass.length], isBattle ? 0.22 : 0.4, "sine", isBattle ? 0.28 : 0.24);
            }
            step++;
        }

        tick();
        const timer = setInterval(tick, stepMs);
        gameAudioState.synthBgm = { context: context, timer: timer, master: master };
        gameAudioState.bgmStarted = true;
        gameAudioState.currentBgmName = bgmName;
        return true;
    }catch(error){
        return false;
    }
}

function stopSynthGameBgm(){
    if(!gameAudioState.synthBgm) return;
    clearInterval(gameAudioState.synthBgm.timer);
    try{
        gameAudioState.synthBgm.context.close();
    }catch(error){}
    gameAudioState.synthBgm = null;
}

function stopGameBgm(){
    if(gameAudioState.currentBgm){
        gameAudioState.currentBgm.pause();
    }
    stopBufferGameBgm();
    gameAudioState.bgmStarted = false;
    gameAudioState.currentBgmName = "";
    stopSynthGameBgm();
}

function updateGameBgmVolume(){
    const settings = getGameAudioSettings();
    if(gameAudioState.synthBgm && gameAudioState.synthBgm.master){
        gameAudioState.synthBgm.master.gain.value = settings.muted ? 0 : Math.max(0.02, Math.min(0.18, settings.bgmVolume * 0.18));
    }
    if(gameAudioState.bufferBgm && gameAudioState.bufferBgm.gain){
        gameAudioState.bufferBgm.gain.gain.value = settings.muted ? 0 : Math.max(0, Math.min(1, settings.bgmVolume));
        if(settings.muted) stopBufferGameBgm();
    }
    if(!gameAudioState.currentBgm) return;
    gameAudioState.currentBgm.volume = settings.muted ? 0 : Math.max(0, Math.min(1, settings.bgmVolume));
    if(settings.muted){
        gameAudioState.currentBgm.pause();
        stopSynthGameBgm();
    }else{
        gameAudioState.currentBgm.play().catch(function(){});
    }
}

function unlockGameAudio(){
    gameAudioState.unlocked = true;
    startGameBgm();
}

function setupGameAudio(){
    if(gameAudioState.setupDone) return;
    gameAudioState.setupDone = true;
    getGameAudioSettings();
    autoStartGameBgm();
    window.addEventListener("load", autoStartGameBgm);
    window.addEventListener("pageshow", autoStartGameBgm);
    document.addEventListener("visibilitychange", function(){
        if(!document.hidden) autoStartGameBgm();
    });
    setTimeout(autoStartGameBgm, 250);
    setTimeout(autoStartGameBgm, 1000);
    document.addEventListener("pointerdown", unlockGameAudio, { once: true });
    document.addEventListener("keydown", unlockGameAudio, { once: true });
    document.addEventListener("click", function(event){
        const button = event.target.closest("button");
        if(!button || button.disabled || button.dataset.noSound === "true") return;
        if(button.closest(".audio-panel")) return;
        unlockGameAudio();
        playGameSound("click");
    }, true);
    document.addEventListener("pointerdown", function(){
        if(!gameAudioState.bgmStarted) unlockGameAudio();
    });
}

function toggleAudioPanel(){
    let panel = document.getElementById("audioPanel");
    if(!panel){
        panel = document.createElement("div");
        panel.id = "audioPanel";
        panel.className = "audio-panel";
        document.body.appendChild(panel);
    }
    panel.classList.toggle("show");
    renderAudioPanel();
    unlockGameAudio();
}

function renderAudioPanel(){
    const panel = document.getElementById("audioPanel");
    if(!panel) return;
    const settings = getGameAudioSettings();
    panel.innerHTML =
        "<div class='audio-panel-head'>" +
            "<strong>音設定</strong>" +
            "<button onclick='toggleAudioPanel()'>×</button>" +
        "</div>" +
        "<label><span>BGM</span><input type='range' min='0' max='100' value='" + Math.round(settings.bgmVolume * 100) + "' oninput='setGameAudioVolume(\"bgm\", this.value)'></label>" +
        "<label><span>効果音</span><input type='range' min='0' max='100' value='" + Math.round(settings.seVolume * 100) + "' oninput='setGameAudioVolume(\"se\", this.value)'></label>" +
        "<button class='audio-mute' onclick='testGameBgm()'>BGMテスト</button>" +
        "<button class='audio-mute' onclick='toggleGameAudioMute()'>" + (settings.muted ? "音を出す" : "ミュート") + "</button>" +
        "<p class='audio-status' id='audioPanelStatus'></p>";
}

function setAudioPanelStatus(text){
    const status = document.getElementById("audioPanelStatus");
    if(status) status.textContent = text;
}

function setGameAudioVolume(type, value){
    const settings = getGameAudioSettings();
    const next = Math.max(0, Math.min(1, Number(value) / 100));
    if(type === "bgm"){
        settings.bgmVolume = next;
    }else{
        settings.seVolume = next;
        playGameSound("click");
    }
    saveGameAudioSettings();
}

function toggleGameAudioMute(){
    const settings = getGameAudioSettings();
    settings.muted = !settings.muted;
    saveGameAudioSettings();
    if(!settings.muted){
        unlockGameAudio();
        playGameSound("click");
    }
}

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", setupGameAudio);
}else{
    setupGameAudio();
}
