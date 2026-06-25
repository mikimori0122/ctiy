const cities = [
    { name: "渋谷", image: "shibuya.png" },
    { name: "舞鶴", image: "maiduru.png" },
    { name: "鎌倉", image: "kamakura.png" },
    { name: "伊勢", image: "ise.png" },
    { name: "富岡", image: "tomioka.png" },
    { name: "今治", image: "imabari.png" }
];

let currentIndex = 0;

function updateBanner(){
    const city = cities[currentIndex];

    const nameElement = document.getElementById("cityName");
    const catchElement = document.getElementById("cityCatch");
    const imageElement = document.getElementById("cityImage");

    if(nameElement) nameElement.textContent = city.name;
    if(catchElement) catchElement.textContent = "LR自治体";

    if(imageElement){
        imageElement.src = city.image;
        imageElement.alt = city.name;
    }
}

function nextCity(){
    currentIndex++;
    if(currentIndex >= cities.length) currentIndex = 0;
    updateBanner();
}

function prevCity(){
    currentIndex--;
    if(currentIndex < 0) currentIndex = cities.length - 1;
    updateBanner();
}

window.onload = updateBanner;


// 招聘結果用
const municipalities = {
    N:["西粟倉","九戸","京丹波","関ヶ原","西目屋","能登","金武","苅田"],
    R:["真田","東栄","津和野","中之条","播磨","川南","苓北"],
    SR:["つがる","遠野","天童","宇都宮","銚子","行田","軽井沢","魚沼","浜松","関","吹田","芦屋","備前","下関","三好","糸島","日南","屋久島"],
    SSR:["函館","男鹿","花巻","仙台","会津若松","つくば","甲府","小松","豊田","勝山","富山","奈良","新宮","近江八幡","姫路","岡山","呉","境港","出雲","高松","四万十","神埼","佐世保","別府","上天草","名護"],
    LR:["渋谷","舞鶴","鎌倉","伊勢","富岡","今治"]
};

let totalGachaCount = Number(localStorage.getItem("totalGachaCount")) || 0;

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

        for(let i = 0; i < 10; i++){
            const rarity = getRarity();
            const list = municipalities[rarity];
            const city = list[Math.floor(Math.random() * list.length)];

            results.push({
                rarity: rarity,
                city: city
            });
        }
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
                "<img class='attribute-bg' src='bg_" + attribute + ".png' alt=''>" +
                "<img class='result-face' src='" + imageName + "_face.png' alt='" + city + "'>" +
                "<div class='result-stars'>" + getStars(rarity) + "</div>" +
            "</div>" +
            "<div class='result-name'>" + city + "</div>";

        grid.appendChild(card);
    }
}
function getImageName(city){
    const nameMap = {
        "渋谷":"shibuya","舞鶴":"maiduru","鎌倉":"kamakura","伊勢":"ise","富岡":"tomioka","今治":"imabari",
        "函館":"hakodate","男鹿":"oga","花巻":"hanamaki","仙台":"sendai","会津若松":"aiduwakamatsu","つくば":"tsukuba","甲府":"kouhu","小松":"komatsu","豊田":"toyoda","勝山":"katsuyama","富山":"toyama","奈良":"nara","新宮":"shinguu","近江八幡":"oumihachiman","姫路":"himezi","岡山":"okayama","呉":"kure","境港":"sakaiminato","出雲":"izumo","高松":"takamatsu","四万十":"shimanto","神埼":"kanzaki","佐世保":"sasebo","別府":"beppu","上天草":"kamiamakusa","名護":"nago",
        "つがる":"tsugaru","遠野":"toono","天童":"tendou","宇都宮":"utsunomiya","銚子":"cyoushi","行田":"gyouda","軽井沢":"karuizawa","魚沼":"uonuma","浜松":"hamamatsu","関":"seki","吹田":"suita","芦屋":"ashiya","備前":"bizen","下関":"shimonoseki","三好":"miyoshi","糸島":"itoshima","日南":"nichinan","屋久島":"yakushima",
        "真田":"sanada","東栄":"touei","津和野":"tsuwano","中之条":"nakanozyou","播磨":"harima","川南":"kawaminami","苓北":"reihoku",
        "西粟倉":"nishiawakura","九戸":"kunohe","京丹波":"kyoutanba","関ヶ原":"sekigahara","西目屋":"nishimeya","能登":"noto","金武":"kin","苅田":"karita"
    };

    return nameMap[city];
}

function getAttribute(city){
    const attributeMap = {
        "渋谷":"fire","舞鶴":"water","鎌倉":"wind","伊勢":"light","富岡":"dark","今治":"none",
        "函館":"water","男鹿":"dark","花巻":"dark","仙台":"fire","会津若松":"wind","つくば":"dark","甲府":"none","小松":"none","豊田":"none","勝山":"none","富山":"light","奈良":"wind","新宮":"dark","近江八幡":"wind","姫路":"light","岡山":"fire","呉":"water","境港":"dark","出雲":"light","高松":"wind","四万十":"water","神埼":"light","佐世保":"wind","別府":"fire","上天草":"water","名護":"light",
        "つがる":"wind","遠野":"dark","天童":"dark","宇都宮":"fire","銚子":"water","行田":"none","軽井沢":"water","魚沼":"wind","浜松":"dark","関":"fire","吹田":"none","芦屋":"light","備前":"fire","下関":"water","三好":"light","糸島":"none","日南":"fire","屋久島":"wind",
        "真田":"fire","東栄":"dark","津和野":"wind","中之条":"dark","播磨":"light","川南":"none","苓北":"light",
        "西粟倉":"water","九戸":"fire","京丹波":"wind","関ヶ原":"wind","西目屋":"water","能登":"fire","金武":"fire","苅田":"none"
    };

    return attributeMap[city];
}

function getStars(rarity){

    let count = 1;

    if(rarity === "R") count = 2;
    if(rarity === "SR") count = 3;
    if(rarity === "SSR") count = 4;
    if(rarity === "LR") count = 5;

    let html = "";

    for(let i = 0; i < count; i++){
        html += "<img class='star-icon' src='star.png' alt='★'>";
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

function startReveal(){

    const params = new URLSearchParams(window.location.search);
    const count = Number(params.get("count")) || 10;

    revealResults = [];

    for(let i = 0; i < count; i++){

        const rarity = getRarity();
        const list = municipalities[rarity];
        const city = list[Math.floor(Math.random() * list.length)];

        revealResults.push({
            rarity: rarity,
            city: city
        });
    }

    localStorage.setItem("lastGachaResults", JSON.stringify(revealResults));

    revealIndex = 0;
    showReveal();
}

function showReveal(){

    const result = revealResults[revealIndex];

    const imageName = getImageName(result.city);
    const attribute = getAttribute(result.city);

    document.getElementById("revealBg").src =
        "effect_" + attribute + ".png";

    document.getElementById("revealName").textContent =
        result.city;

    document.getElementById("revealImage").src =
        imageName + ".png";

    document.getElementById("revealImage").alt =
        result.city;

    const rarityBox =
        document.getElementById("revealRarity");

    showRevealStars(result.rarity);
}

function nextReveal(){

    revealIndex++;

    if(revealIndex >= revealResults.length){
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
    const count = params.get("count") || 10;

    // 1つ目のテロップ
    typeTelop("全国の自治体へ招聘要請を送信します。");

    // 3秒後：2つ目のテロップ
    setTimeout(function(){
        typeTelop("招聘要請への応答を確認しました。");
    }, 3000);

    // 6秒後：廊下へ
    setTimeout(function(){

        if(telop) telop.style.display = "none";

        image.src = "cg_corridor.png";
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
function showRevealStars(rarity){

    const rarityBox = document.getElementById("revealRarity");

    rarityBox.innerHTML = "";

    let count = 1;

    if(rarity === "R") count = 2;
    if(rarity === "SR") count = 3;
    if(rarity === "SSR") count = 4;
    if(rarity === "LR") count = 5;

    for(let i = 0; i < count; i++){

        setTimeout(function(){

            rarityBox.innerHTML +=
                "<img class='reveal-star pop-star' src='star.png' alt='★'>";

        }, i * 120);
    }
}function typeTelop(text){

    const telopText = document.getElementById("telopText");

    if(!telopText) return;

    telopText.textContent = "";

    let index = 0;

    const timer = setInterval(function(){

        telopText.textContent += text[index];
        index++;

        if(index >= text.length){
            clearInterval(timer);
        }

    }, 45);
}