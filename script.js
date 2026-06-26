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

// 招聘結果用
const municipalities = {
    N:["西粟倉","九戸","京丹波","関ヶ原","西目屋","能登","金武","苅田"],
    R:["真田","東栄","津和野","中之条","播磨","川南","苓北"],
    SR:["つがる","遠野","天童","宇都宮","銚子","行田","軽井沢","魚沼","浜松","関","吹田","芦屋","備前","下関","三好","糸島","日南","屋久島"],
    SSR:["函館","男鹿","花巻","仙台","会津若松","つくば","甲府","小松","豊田","勝山","富山","奈良","新宮","近江八幡","姫路","岡山","呉","境港","出雲","高松","四万十","神埼","佐世保","別府","上天草","名護"],
    LR:["渋谷","舞鶴","鎌倉","伊勢","富岡","今治"]
};

function getOwnedMunicipalities(){
    const savedOwned = localStorage.getItem("ownedMunicipalities");

    if(savedOwned){
        return JSON.parse(savedOwned);
    }

    return [];
}

function saveOwnedMunicipalities(owned){
    localStorage.setItem("ownedMunicipalities", JSON.stringify(owned));
}

function getFinancialResources(){
    return Number(localStorage.getItem("financialResources")) || 5000;
}

function addFinancialResources(amount){
    const nextAmount = getFinancialResources() + amount;
    localStorage.setItem("financialResources", nextAmount);
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

        localStorage.setItem("lastGachaResults", JSON.stringify(results));
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
    addGachaResultsToOwned(revealResults);

    revealIndex = 0;
    showReveal();
}

function showReveal(){

    const result = revealResults[revealIndex];

    const imageName = getImageName(result.city);
    const attribute = getAttribute(result.city);

    revealReady = false;
    setRevealVisible(false);

    const showCard = function(){
        document.getElementById("revealBg").src =
            "assets/effects/effect_" + attribute + ".png";

        document.getElementById("revealName").textContent =
            result.city;

        document.getElementById("revealImage").src =
            "assets/characters/" + imageName + ".png";

        document.getElementById("revealImage").alt =
            result.city;

        setRevealVisible(true);
        showRevealStars(result.rarity);
        revealReady = true;
    };

    if(result.rarity === "SSR" || result.rarity === "LR"){
        playRarityCutin(result.rarity, result.city, showCard);
    }else{
        showCard();
    }
}

function nextReveal(){

    if(!revealReady) return;

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

function playRarityCutin(rarity, city, callback){
    const cutin = document.getElementById("rarityCutin");
    const cutinText = document.getElementById("cutinText");

    if(!cutin || !cutinText){
        callback();
        return;
    }

    cutinText.textContent = getMunicipalityQuote(city);
    cutin.className = "rarity-cutin show " + rarity.toLowerCase();

    setTimeout(function(){
        cutin.className = "rarity-cutin";
        callback();
    }, rarity === "LR" ? 2400 : 2100);
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
                "<img class='reveal-star pop-star' src='assets/ui/star.png' alt='★'>";

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
    return getRarityRank(getEffectiveRarity(member)) >= getRarityRank("LR");
}

function getMunicipalityProfile(city){
    const profiles = {
        "渋谷":["東京","東京都"],"舞鶴":["関西","京都府"],"鎌倉":["関東","神奈川県"],"伊勢":["中部","三重県"],"富岡":["関東","群馬県"],"今治":["中四国","愛媛県"],
        "函館":["北海道東北","北海道"],"男鹿":["北海道東北","秋田県"],"花巻":["北海道東北","岩手県"],"仙台":["北海道東北","宮城県"],"会津若松":["北海道東北","福島県"],"つくば":["関東","茨城県"],"甲府":["中部","山梨県"],"小松":["中部","石川県"],"豊田":["中部","愛知県"],"勝山":["中部","福井県"],"富山":["中部","富山県"],"奈良":["関西","奈良県"],"新宮":["関西","和歌山県"],"近江八幡":["関西","滋賀県"],"姫路":["関西","兵庫県"],"岡山":["中四国","岡山県"],"呉":["中四国","広島県"],"境港":["中四国","鳥取県"],"出雲":["中四国","島根県"],"高松":["中四国","香川県"],"四万十":["中四国","高知県"],"神埼":["九州","佐賀県"],"佐世保":["九州","長崎県"],"別府":["九州","大分県"],"上天草":["九州","熊本県"],"名護":["沖縄","沖縄県"],
        "つがる":["北海道東北","青森県"],"遠野":["北海道東北","岩手県"],"天童":["北海道東北","山形県"],"宇都宮":["関東","栃木県"],"銚子":["関東","千葉県"],"行田":["関東","埼玉県"],"軽井沢":["中部","長野県"],"魚沼":["中部","新潟県"],"浜松":["中部","静岡県"],"関":["中部","岐阜県"],"吹田":["関西","大阪府"],"芦屋":["関西","兵庫県"],"備前":["中四国","岡山県"],"下関":["中四国","山口県"],"三好":["中四国","徳島県"],"糸島":["九州","福岡県"],"日南":["九州","宮崎県"],"屋久島":["九州","鹿児島県"],
        "真田":["中部","長野県"],"東栄":["中部","愛知県"],"津和野":["中四国","島根県"],"中之条":["関東","群馬県"],"播磨":["関西","兵庫県"],"川南":["九州","宮崎県"],"苓北":["九州","熊本県"],
        "西粟倉":["中四国","岡山県"],"九戸":["北海道東北","岩手県"],"京丹波":["関西","京都府"],"関ヶ原":["中部","岐阜県"],"西目屋":["北海道東北","青森県"],"能登":["中部","石川県"],"金武":["沖縄","沖縄県"],"苅田":["九州","福岡県"]
    };
    const profile = profiles[city] || ["関東", "未設定"];

    return {
        region: profile[0],
        prefecture: profile[1]
    };
}

function getMunicipalityQuote(city){
    const quotes = {
        "渋谷":"火傷しても知らないよ。","舞鶴":"白刃、抜きます。","鎌倉":"刃風に沈みなさい。","伊勢":"祈りは刃にもなる。","富岡":"闇を紡いであげる。","今治":"鋼翼、展開します。",
        "函館":"凍て星よ、降りて。","男鹿":"鬼火で焦がすぞ。","花巻":"夜に咲かせましょう。","仙台":"狙いは外さない。","会津若松":"誇りは折れない。","つくば":"解析、完了したわ。","甲府":"この盾、砕けぬ。","小松":"重装、前へ出る。","豊田":"拳で道を開ける。","勝山":"牙を立ててやる。","富山":"凍れる美をどうぞ。","奈良":"神鹿よ、駆けよ。","新宮":"式よ、舞いなさい。","近江八幡":"影より裁きます。","姫路":"白き剣を捧げる。","岡山":"闇夜に咲くわ。","呉":"提督、出撃します。","境港":"幽世へ誘いましょう。","出雲":"縁は私が結ぶ。","高松":"荒ぶる風よ。","四万十":"水華、きらめけ。","神埼":"天輪よ、照らして。","佐世保":"双刃、踊ります。","別府":"紅蓮に溺れなさい。","上天草":"きらきら、いくよ。","名護":"南の陽をあげる。",
        "つがる":"りんご、あげるね。","遠野":"怪異も友だちだよ。","天童":"いたずら開始っ。","宇都宮":"本気、見せるわ。","銚子":"力比べといこう。","行田":"ぼく、がんばるよ。","軽井沢":"雪上で魅せるよ。","魚沼":"この一矢、届け。","浜松":"闇音を奏でよう。","関":"斬って終わらせる。","吹田":"白銀装甲、起動。","芦屋":"静かに仕留めます。","備前":"黙して焼き切る。","下関":"ぷくっと参上。","三好":"山影から射抜く。","糸島":"一服、いかが？","日南":"陽射しを味方に。","屋久島":"大斧、いっくよ。",
        "真田":"燃え尽きるまで。","東栄":"獣の爪で裂く。","津和野":"森の怒りを聞け。","中之条":"眠らせてあげる。","播磨":"守りは任せて。","川南":"命令を遂行する。","苓北":"聖灯を掲げます。",
        "西粟倉":"小さくても強いよ。","九戸":"赤槍、突き抜ける。","京丹波":"狩りの時間だ。","関ヶ原":"決着をつける。","西目屋":"影札、開きます。","能登":"拳で語ろうぜ。","金武":"火線を開く。","苅田":"砲塔、旋回開始。"
    };

    return quotes[city] || "共に進みます。";
}

function getSkillNames(member){
    const names = {
        "渋谷":["紅蓮ストリート","フレアステップ","終幕ブレイズ"],"舞鶴":["白軍令","双剣航路","舞鶴ノ太刀"],"鎌倉":["鎌倉剣陣","風刃一閃","御霊風牙"],"伊勢":["天照祈装","神域光輪","伊勢神楽・極"],"富岡":["黒絹の帳","影糸縛り","常夜ノ繭"],"今治":["鋼翼指令","メタルフェザー","扶桑鋼翼陣"],
        "函館":["氷星礼装","スノウヴェール","極光の戴冠"],"男鹿":["鬼面号令","鬼火乱舞","赤鬼焦土"],"花巻":["夜花の調べ","黒薔薇舞踏","冥花爛漫"],"仙台":["狙撃布陣","杜の一弾","青葉精密射"],"会津若松":["白虎の義","不屈の誓刃","会津魂・烈"],"つくば":["演算議場","量子解析","叡智の黒塔"],"甲府":["蒼晶堅陣","宝盾反照","甲斐水晶壁"],"小松":["重機動令","鋼拳圧壊","巨兵総進撃"],"豊田":["駆動号令","メカニックブロー","鋼拳オーバードライブ"],"勝山":["竜骨の咆哮","恐牙裂き","古竜暴走"],"富山":["氷薬の守り","白雪処方","凍華霊薬"],"奈良":["鹿角神威","金鹿突進","神鹿天駆"],"新宮":["熊野式符","神符散華","八咫霊符陣"],"近江八幡":["影傘の令","水郷影討","八幡黒雨"],"姫路":["白鷺剣令","白羽斬り","白鷺天翔"],"岡山":["黒桃の誘い","暗香爪撃","宵桃乱舞"],"呉":["艦隊指揮","主砲斉射","呉鎮守府砲雷"],"境港":["幽世招き","妖霧絡み","百鬼境界門"],"出雲":["縁結び令","神楽の鈴音","大社結界"],"高松":["嵐笛の号","風荒び","讃岐暴風"],"四万十":["清流の加護","水華弾","四万十霊流"],"神埼":["天輪祝詞","光輪裁き","吉野ヶ里天照"],"佐世保":["双刃港令","港湾乱舞","佐世保双月斬"],"別府":["湯獄号令","紅蓮湯煙","地獄巡り焦土"],"上天草":["海星スマイル","きらめき波紋","天草スターライト"],"名護":["南陽指揮","太陽のステップ","琉球サンバースト"],
        "つがる":["林檎の祈り","アップルヒール","赤実の奇跡"],"遠野":["怪異語り","遠野夜話","座敷童の祝宴"],"天童":["道化の一手","パペットトリック","悪戯チェックメイト"],"宇都宮":["拳姫号令","華脚連打","紅脚演舞"],"銚子":["大漁気合","剛腕投げ","荒波どすこい"],"行田":["古墳応援","はにわタックル","埴輪大行進"],"軽井沢":["雪映え令","スノーボード疾走","白銀スラローム"],"魚沼":["雪原弓陣","米蔵の矢","魚沼一矢"],"浜松":["闇音指揮","黒弦奏","夜想協奏曲"],"関":["刃物号令","関の一閃","名刀断ち"],"吹田":["白銀起動","装甲突撃","万博機神砲"],"芦屋":["黒礼装令","静謐刺突","芦屋ノワール"],"備前":["陶火の構え","焼締拳","備前黒炎"],"下関":["ふぐ提督","ぷくぷく突撃","海峡ふぐ結界"],"三好":["山影狙撃","峡谷の矢","三好山嵐"],"糸島":["茶煙の席","一服の策","糸島茶会陣"],"日南":["陽光舞踏","サンライトキック","南国烈陽"],"屋久島":["森斧の令","苔むす大断","縄文森羅斬"],
        "真田":["紅槍号令","六文突き","真田烈火槍"],"東栄":["獣爪の命","荒爪裂き","花祭り獣王爪"],"津和野":["森獣指揮","蔓牙拘束","津和野森喰らい"],"中之条":["夢魔の囁き","眠りの爪","温泉夢幻香"],"播磨":["円盾守令","守護槍撃","播磨堅陣"],"川南":["戦術命令","任務遂行斬","無音制圧"],"苓北":["聖灯指揮","白灯浄化","天草聖光陣"],
        "西粟倉":["小斧応援","ちびっこ一撃","森っ子大伐採"],"九戸":["赤槍突撃","九戸穿ち","北天朱槍"],"京丹波":["狩人号令","森弓連射","丹波猟撃陣"],"関ヶ原":["決戦布陣","古戦場の矢","天下分け目"],"西目屋":["影札指令","闇札放ち","白神影札陣"],"能登":["拳闘号令","荒海正拳","能登豪拳"],"金武":["火線命令","制圧射撃","金武フルバースト"],"苅田":["砲塔指揮","重砲射撃","港湾要塞砲"]
    };

    return names[member.city] || ["議場号令", "政策攻撃", "大号令・改"];
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
        advancedName: names[2],
        chair: "議長配置時、" + attribute + "属性自治体の体力・攻撃・防御 +" + getSkillPower(member, "chair") + "%",
        council: getSkillTurn(member, false) + "ターンごとに発動。敵単体へ攻撃力" + getSkillPower(member, "council") + "%の政策攻撃",
        advanced: advancedAvailable ?
            getSkillTurn(member, true) + "ターンごとに発動。友好ランクに応じて敵全体へ攻撃力" + getSkillPower(member, "advanced") + "%の政策攻撃" :
            "LR以上で解放"
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
        const formation = JSON.parse(savedFormation);
        while(formation.length < 5) formation.push("");
        return formation.slice(0, 5);
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
        fire: "火",
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

function renderJinjiList(){
    const grid = document.getElementById("jinjiRosterGrid");
    const count = document.getElementById("jinjiCount");

    if(!grid) return;

    const roster = getCooperationRoster();
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
            selectedJinjiCity = member.city;
            switchJinjiTab("formation");
            renderFormation(member.city);
        };
        grid.appendChild(icon);
    }
}

function renderFormation(selectedCity){
    const slots = document.getElementById("formationSlots");
    const pool = document.getElementById("formationPoolGrid");

    if(!slots || !pool) return;

    const roster = getCooperationRoster();
    const formation = getFormation();

    if(roster.length === 0){
        slots.innerHTML = "";
        pool.innerHTML =
            "<div class='jinji-empty'>まだ編成できる自治体がいません。招聘で自治体を獲得してください。</div>";
        const detail = document.getElementById("formationDetail");
        if(detail){
            detail.innerHTML =
                "<div class='jinji-empty'>選択中の自治体はありません。</div>";
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
        slot.className = "formation-slot" + (selectedFormationSlot === i ? " active" : "");

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
                "<span class='formation-empty'>空欄</span>";
        }

        slot.onclick = function(){
            selectedFormationSlot = i;
            renderFormation(selectedJinjiCity);
        };

        slots.appendChild(slot);
    }

    pool.innerHTML = "";
    for(let i = 0; i < roster.length; i++){
        const member = roster[i];
        const icon = createJinjiIcon(member, {
            active: selectedJinjiCity === member.city
        });

        icon.onclick = function(){
            const currentFormation = getFormation();
            const alreadyIndex = currentFormation.indexOf(member.city);

            if(alreadyIndex !== -1 && alreadyIndex !== selectedFormationSlot){
                currentFormation[alreadyIndex] = "";
            }

            currentFormation[selectedFormationSlot] = member.city;
            saveFormation(currentFormation);
            selectedJinjiCity = member.city;
            renderFormation(member.city);
        };

        pool.appendChild(icon);
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
            "<div class='formation-detail-tags'>" +
                "<span>" + member.effectiveRarity + "</span>" +
                (member.upgraded ? "<span>レアリティ上昇済</span>" : "") +
                "<span>LV " + member.level + "/99</span>" +
                "<span>" + getAttributeLabel(member.attribute) + "属性</span>" +
                "<span>友好ランク " + member.friendship + "/5</span>" +
                "<span>所持 " + member.count + "</span>" +
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
