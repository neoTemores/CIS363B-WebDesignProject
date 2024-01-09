 //https://github.com/cheatsnake/emojihub

export async function fetchEmoji(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export function displayCards (data, pageDiv, start, end){
    pageDiv.innerHTML = "";
    let endIndex = end > data.length ? data.length : end
    for(let i = start; i < endIndex; i++) {
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


export function paginate(emojiPerPage, start, end, currPage, totalPages, emojiArr, pageDiv, currPageDiv){
    start += emojiPerPage
    end += emojiPerPage
    currPage = emojiPerPage > 0 ? currPage+=1 : currPage-=1

    if(currPage < 1 || currPage > totalPages){
        currPage = 1;
        start = 0;
        end = Math.abs(emojiPerPage);  
    } 
    
    else if(currPage == totalPages){
        let remainder = emojiArr.length % emojiPerPage
        end = start + remainder
    }

    updateCurrentPage(currPage, totalPages, currPageDiv )
    displayCards(emojiArr, pageDiv, start, end)

    return [start, end, currPage]
}

export function updateCurrentPage(currPage, totalPages, currPageDiv) {
    let currPageText = `Page ${currPage} of ${totalPages}`
    currPageDiv.innerHTML = currPageText
}