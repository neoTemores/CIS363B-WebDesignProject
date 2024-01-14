import { fetchEmoji, createCard } from "../../app.js";

loadTestUnicodePage();
async function loadTestUnicodePage(){
    let randomBtn = document.getElementById("random-emoji-btn");
    randomBtn.addEventListener("click", displayRandomEmoji);
}

async function displayRandomEmoji(){
    let randomEmojiDiv = document.getElementById("random-emoji")
    randomEmojiDiv.innerHTML = "<i>Loading...</i>";
    let url = "https://emojihub.yurace.pro/api/random"
    let is200response;
    let emojiObj;
    let card;

    try {
        emojiObj = await fetchEmoji(url);
        card = createCard(emojiObj)
        is200response = true;
    } catch (error) {
        is200response = false;
    }
    
    randomEmojiDiv.innerHTML = "";
    is200response ? randomEmojiDiv.appendChild(card) : randomEmojiDiv.innerHTML = "<i>Error!</i>"
}   