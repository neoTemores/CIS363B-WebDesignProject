 //https://github.com/cheatsnake/emojihub

export async function fetchEmoji(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

