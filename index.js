 //https://github.com/cheatsnake/emojihub

export async function fetchEmoji(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export function displayCards (data, pageDiv, start, end){
    pageDiv.innerHTML = "";
    for(let i = start; i < end; i++) {
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
    
        pageDiv.appendChild(card)
    }  
}