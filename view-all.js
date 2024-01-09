import {fetchEmoji, displayCards} from "./index.js"

let viewAllPageDiv= document.getElementById("view-all-page")
//https://github.com/cheatsnake/emojihub
let url = "https://emojihub.yurace.pro/api/all"

const allEmojiArrr = await fetchEmoji(url)
const numOfEmojiPerPage = 12;
let currentPage = 1;
let totalPages = Math.ceil(allEmojiArrr.length / numOfEmojiPerPage);


let startIndex = 0;
let endIndex = numOfEmojiPerPage;

const backBtn = document.querySelector(".back-btn")
backBtn.addEventListener("click", ()=> {
    paginate(-numOfEmojiPerPage)
})

const forwardBtn = document.querySelector(".forward-btn")
forwardBtn.addEventListener("click", ()=> {
    paginate(numOfEmojiPerPage)
})

function paginate(value){
    startIndex += value
    endIndex += value
    currentPage = value > 0 ? currentPage+=1 : currentPage-=1

    if(currentPage < 1 || currentPage > totalPages){
        currentPage = 1;
        startIndex = 0;
        endIndex = numOfEmojiPerPage;    
    }

    updateCurrentPage()
    displayCards(allEmojiArrr, viewAllPageDiv, startIndex, endIndex)
}

const currentPageSpan = document.querySelector(".current-page")
function updateCurrentPage() {
    let currPageText = `Page ${currentPage} of ${totalPages}`
    currentPageSpan.innerHTML = currPageText
}

updateCurrentPage()
displayCards(allEmojiArrr, viewAllPageDiv, startIndex, endIndex)
