import {fetchEmoji, displayCards, paginate, updateCurrentPage} from "./common.js"

let viewAllPageDiv= document.getElementById("view-all-page")
const currentPageDiv = document.querySelector(".current-page")

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
   let indexes = paginate(-numOfEmojiPerPage, startIndex, endIndex, currentPage, totalPages, allEmojiArrr, viewAllPageDiv, currentPageDiv)
    startIndex = indexes[0]
    endIndex = indexes[1]
    currentPage = indexes[2]
})

const forwardBtn = document.querySelector(".forward-btn")
forwardBtn.addEventListener("click", ()=> {
   let indexes = paginate(numOfEmojiPerPage, startIndex, endIndex, currentPage, totalPages, allEmojiArrr, viewAllPageDiv, currentPageDiv)
   startIndex = indexes[0]
   endIndex = indexes[1]
   currentPage = indexes[2]
})

updateCurrentPage(currentPage, totalPages, currentPageDiv)
displayCards(allEmojiArrr, viewAllPageDiv, startIndex, endIndex)
