import { fetchEmoji, createCard, createErrorCard } from "../../app.js";

loadTestUnicodePage();
async function loadTestUnicodePage(){
    let randomBtn = document.getElementById("random-emoji-btn");
    randomBtn.addEventListener("click", displayRandomEmoji);
}

async function displayRandomEmoji(){
    let randomEmojiDiv = document.getElementById("random-emoji")
    randomEmojiDiv.innerHTML = "<i>Loading...</i>";
    let url = "https://emojihub.yurace.pro/api/random"
    let emojiObj;
    let card;

    try {
        emojiObj = await fetchEmoji(url);
        card = createCard(emojiObj)
    } catch (error) {
        card = createErrorCard()
    }
    
    randomEmojiDiv.innerHTML = "";
    randomEmojiDiv.appendChild(card)
}   