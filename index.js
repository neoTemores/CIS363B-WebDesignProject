import { fetchEmoji } from "./app.js";

loadHomePage();

async function loadHomePage(){
    let randomUrl = "https://emojihub.yurace.pro/api/random/category/animals-and-nature"
    let emojiObj = await fetchEmoji(randomUrl)
    let unicode = emojiObj.unicode[0]
    let parsedUnicode = unicode.replace("U+", "&#x") + ";"
    displayRandomEmoji(parsedUnicode)
}

function displayRandomEmoji(unicode){
    console.log(unicode)
    let emojiDiv = document.getElementById("home-emoji-div");
    let emojiSpan = document.getElementById("home-emoji");
    emojiSpan.innerHTML = "";
    emojiSpan.innerHTML = unicode;
}