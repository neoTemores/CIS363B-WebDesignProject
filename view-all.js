import {fetchEmoji} from "./index.js"

let viewAllPageDiv= document.getElementById("view-all-page")
//https://github.com/cheatsnake/emojihub
let url = "https://emojihub.yurace.pro/api/all"

const data = await fetchEmoji(url)

let allEmojiArrr = [];
let emojiArrLength = 0;
let currentPage = 1;
let totalPages = 1;
function storeData(data){
    allEmojiArrr = data;
    emojiArrLength = data.length
    totalPages = Math.ceil(emojiArrLength / 12)
    displayCards(allEmojiArrr)
}

let startIndex = 0;
let endIndex = 12;
const backBtn = document.querySelector(".back-btn")
backBtn.addEventListener("click", ()=> {
    paginate(-12)
})

const forwardBtn = document.querySelector(".forward-btn")
forwardBtn.addEventListener("click", ()=> {
    paginate(12)
})

function paginate(value){
    startIndex += value
    endIndex += value
    currentPage = value > 0 ? currentPage+=1 : currentPage-=1

    if(currentPage < 1 || currentPage > 150){
        currentPage = 1;
        startIndex = 0;
        endIndex = 12;    
    }

    updateCurrentPage()
    displayCards(allEmojiArrr)
}

const currentPageSpan = document.querySelector(".current-page")
function updateCurrentPage() {
    let text = `Page ${currentPage} of ${totalPages}`
    currentPageSpan.innerHTML = text
}

function displayCards (data){
    updateCurrentPage()
    viewAllPageDiv.innerHTML = "";
    for(let i = startIndex; i < endIndex; i++) {
        const card = document.createElement("div")
        card.className = "emoji-card"
        const emojiDiv = document.createElement("div")
        emojiDiv.className = "emoji"
        const unicodeDiv = document.createElement("div")
        const nameDiv = document.createElement("div")
        const categoryDiv = document.createElement("div")
        const groupDiv = document.createElement("div")

        let unicode = data[i].unicode[0]
        let emoji = unicode.replace("U+", "&#x")
        let name = data[i].name
        let category = data[i].category
        let group = data[i].group
        
        if(name.includes("≊")){
            name = name.slice(0, name.indexOf("≊"))
        }

        emojiDiv.innerHTML = emoji
        unicodeDiv.innerHTML = "Unicode: " + unicode
        nameDiv.innerHTML = "Name: "+ name
        categoryDiv.innerHTML = "Category: " + category
        groupDiv.innerHTML = "Group: " + group
        

        card.appendChild(emojiDiv)
        card.appendChild(unicodeDiv)
        card.appendChild(nameDiv)
        card.appendChild(categoryDiv)
        card.appendChild(groupDiv)
    
        viewAllPageDiv.appendChild(card)
    }
   
}


storeData(data)
