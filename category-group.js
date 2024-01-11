import { fetchEmoji, displayCards, paginate, updateCurrentPage } from "./common.js"

let categoryGroupPageDiv = document.getElementById("category-group-page")
let categoryGroupBtn = document.getElementById("cat-grp-btn")
let categoryDropdown = document.getElementById("category-dropdown")
let groupDropdown = document.getElementById("group-dropdown")

categoryDropdown.addEventListener("change", () => {
    setGroups(categoryDropdown.value)
})

function setGroups(categoryValue) {
    const smileysAndPeopleGrps = ["all", "body", "cat-face", "clothing", "creature-face", "emotion", "face-negative", "face-neutral", "face-positive", "face-role", "face-sick", "family", "monkey-face", "person", "person-activity", "person-gesture", "person-role", "skin-tone"];

    const animalsAndNatureGrps = ["all", "animal-amphibian", "animal-bird", "animal-bug", "animal-mammal", "animal-marine", "animal-reptile", "plant-flower", "plant-other"];

    const foodAndDrinkGrps = ["all", "dishware", "drink", "food-asian", "food-fruit", "food-prepared", "food-sweet", "food-vegetable"]

    const oneGrpAvail = ["all"]

    switch(categoryValue) {
        case "smileys-and-people": updateGroups(smileysAndPeopleGrps)
        break;
        case "animals-and-nature": updateGroups(animalsAndNatureGrps)
        break;
        case "food-and-drink": updateGroups(foodAndDrinkGrps)
        break;
        default: updateGroups(oneGrpAvail)                     
    }
}

function updateGroups(arr){
    groupDropdown.innerHTML = "";

    arr.forEach(grp => {
        let optionElem = document.createElement("option")
        optionElem.value = grp
        optionElem.innerHTML = grp
        groupDropdown.appendChild(optionElem)
    });
}

setGroups(categoryDropdown.value)

categoryGroupBtn.addEventListener("click", () => {
    setUrlAndFetch(categoryDropdown.value, groupDropdown.value)
})


function createPaginationBtns(){
    let paginationContainer = document.querySelector(".pagination-container")
    let backBtn = document.createElement("input")
    let forwardBtn = document.createElement("input")
    let currPageDiv = document.createElement("span")

    paginationContainer.innerHTML = "";

    backBtn.className = "back-btn"
    backBtn.type = "button"
    backBtn.value = "Backward"

    forwardBtn.className = "forward-btn"
    forwardBtn.type = "button"
    forwardBtn.value = "Forward"

    currPageDiv.className = "current-page-cat-grp"

    paginationContainer.appendChild(backBtn)
    paginationContainer.appendChild(forwardBtn)
    paginationContainer.appendChild(currPageDiv)

   createPaginationEventListeners()
}


const numOfEmojiPerPage = 10
let startIndex;
let endIndex = numOfEmojiPerPage
let currentPage;
let totalPages;
let filteredEmojiArr = []

function createPaginationEventListeners(){
    let backBtn = document.querySelector(".back-btn")
    let forwardBtn = document.querySelector(".forward-btn") 
    backBtn.className = "btn"
    forwardBtn.className = "btn"
    let currentPageDiv = document.querySelector(".current-page-cat-grp")
    updateCurrentPage(currentPage, totalPages, currentPageDiv)

    backBtn.addEventListener("click", ()=> {
        let indexes = paginate(-numOfEmojiPerPage, startIndex, endIndex, currentPage, totalPages, filteredEmojiArr, categoryGroupPageDiv, currentPageDiv)
        startIndex = indexes[0]
        endIndex = indexes[1]
        currentPage = indexes[2]
    })
    forwardBtn.addEventListener("click", ()=> {
        let indexes = paginate(numOfEmojiPerPage, startIndex, endIndex, currentPage, totalPages, filteredEmojiArr, categoryGroupPageDiv, currentPageDiv)
        startIndex = indexes[0]
        endIndex = indexes[1]
        currentPage = indexes[2]    })
}

async function setUrlAndFetch(category, group){
    let url = ""
    if(groupDropdown.value === "all"){
        url = `https://emojihub.yurace.pro/api/all/category/${categoryDropdown.value}`
    }
    else {
        url = `https://emojihub.yurace.pro/api/all/group/${groupDropdown.value}`
    }
    
    filteredEmojiArr = await fetchEmoji(url)
    currentPage = 1;
    startIndex = 0
    endIndex = numOfEmojiPerPage
    totalPages = Math.ceil(filteredEmojiArr.length / numOfEmojiPerPage);
    createPaginationBtns()
    displayCards(filteredEmojiArr, categoryGroupPageDiv, startIndex, endIndex)
}