let btn = document.getElementById("testbtn");

let test = () =>{
    console.log("test")
}

let url = "https://pokeapi.co/api/v2/pokemon/p*"
 async function fetchPoke() {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);
}

btn.addEventListener("click", fetchPoke)
