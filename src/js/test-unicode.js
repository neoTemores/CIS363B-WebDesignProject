import { fetchEmoji, createCard, createErrorCard } from "../../app.js";

loadTestUnicodePage();
async function loadTestUnicodePage() {
    let randomBtn = document.getElementById("random-emoji-btn");
    randomBtn.addEventListener("click", displayRandomEmoji);

    let enteredUnicodeBtn = document.getElementById("entered-unicode-btn");
    enteredUnicodeBtn.addEventListener("click", validateEnteredUnicode);
}

async function displayRandomEmoji() {
    let randomEmojiDiv = document.getElementById("random-emoji");
    randomEmojiDiv.innerHTML = "<i>Loading...</i>";
    let url = "https://emojihub.yurace.pro/api/random";
    let emojiObj;
    let card;

    try {
        emojiObj = await fetchEmoji(url);
        card = createCard(emojiObj);
    } catch (error) {
        card = createErrorCard();
    }

    randomEmojiDiv.innerHTML = "";
    randomEmojiDiv.appendChild(card);
}

function validateEnteredUnicode() {
    let enteredUniCodeDiv = document.getElementById("entered-unicode-div");
    let enteredUnicodeTextBox = document.getElementById("entered-unicode-textbox");
    let unicode = enteredUnicodeTextBox.value

    if (unicode.length <= 5 || unicode.length >= 8) {
        displayEnteredError("Error: Unicode must be 6 - 7 characters.", enteredUniCodeDiv)
    }
    else if (unicode.substring(0, 2).toUpperCase() !== "U+") {
        displayEnteredError("Error: Unicode must begin with \"U+\"", enteredUniCodeDiv)
    } else {
        displayEnteredUnicode(unicode, enteredUniCodeDiv)
    }
}

function displayEnteredError(msg, div) {
    div.innerHTML = ""
    let errorDiv = document.createElement("div")
    errorDiv.innerHTML = msg
    div.appendChild(errorDiv)
}


function displayEnteredUnicode(unicode, div) {
    div.innerHTML = ""
    let strippedUnicode = unicode.substring(2)
    let enteredUnicode = document.createElement("div")
    enteredUnicode.innerHTML = "&#x" + strippedUnicode
    div.appendChild(enteredUnicode)
}