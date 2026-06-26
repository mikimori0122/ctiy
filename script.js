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

function getOwnedMunicipalities(){
    const savedOwned = localStorage.getItem("ownedMunicipalities");

    if(savedOwned){
        const owned = JSON.parse(savedOwned).map(function(item){
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
        results = JSON.parse(savedResults);
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
        const parsedResults = JSON.parse(savedResults);
        if(parsedResults.length === count){
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
        const formation = JSON.parse(savedFormation).map(function(city){
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
