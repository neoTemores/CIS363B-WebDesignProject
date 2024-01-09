let viewAllPageDiv= document.getElementById("view-all-page")
//https://github.com/cheatsnake/emojihub
let url = "https://emojihub.yurace.pro/api/all"
 async function fetchEmoji() {
    const res = await fetch(url)
    const data = await res.json()
    processArr(data)
}

function processArr (data){
    console.log(data[0])
    for(i = 0; i < 12; i++) {
        const card = document.createElement("div")
        card.id = "view-all-card"
        const emojiDiv = document.createElement("div")
        emojiDiv.id = "view-all-emoji"
        const unicodeDiv = document.createElement("div")
        const nameDiv = document.createElement("div")
        const categoryDiv = document.createElement("div")
        const groupDiv = document.createElement("div")

        let unicode = data[i].unicode[0]
        let emoji = unicode.replace("U+", "&#x")
        let name = data[i].name
        let category = data[i].category
        let group = data[i].group
        

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


fetchEmoji()
