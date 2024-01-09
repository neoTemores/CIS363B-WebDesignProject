import { fetchEmoji, displayCards } from "./index.js"

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

function createPaginationBtns(currPageText){
    let paginationContainer = document.querySelector(".pagination-container")
    let backBtn = document.createElement("input")
    let forwardBtn = document.createElement("input")
    let currPageSpan = document.createElement("span")

    paginationContainer.innerHTML = "";

    backBtn.className = "back-btn"
    backBtn.type = "button"
    backBtn.value = "Backward"

    forwardBtn.className = "forward-btn"
    forwardBtn.type = "button"
    forwardBtn.value = "Forward"

    currPageSpan.className = "current-page"
    currPageSpan.innerHTML = currPageText

    paginationContainer.appendChild(backBtn)
    paginationContainer.appendChild(forwardBtn)
    paginationContainer.appendChild(currPageSpan)
}


const numOfEmojiPerPage = 10
let startIndex = 0;
let endIndex = numOfEmojiPerPage
let currentPage = 1;
let totalPages = 1;

async function setUrlAndFetch(category, group){
    console.log(category)
    console.log(group)
    let url = ""
    if(groupDropdown.value === "all"){
        url = `https://emojihub.yurace.pro/api/all/category/${categoryDropdown.value}`
    }
    else {
        url = `https://emojihub.yurace.pro/api/all/group/${groupDropdown.value}`
    }
    
    let filteredEmojiArr = await fetchEmoji(url)
    totalPages = Math.ceil(filteredEmojiArr.length / numOfEmojiPerPage);
    createPaginationBtns(`Page ${currentPage} of ${totalPages}`)
    displayCards(filteredEmojiArr, categoryGroupPageDiv, startIndex, endIndex)
}