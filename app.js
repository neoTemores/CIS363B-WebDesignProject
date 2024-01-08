let btn = document.getElementById("testbtn");

let test = () =>{
    console.log("test")
}

//https://github.com/cheatsnake/emojihub
let url = "https://emojihub.yurace.pro/api/all"
 async function fetchEmoji() {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);
}

btn.addEventListener("click", fetchEmoji)
