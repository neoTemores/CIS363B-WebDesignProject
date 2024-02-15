updateNavbar();

function updateNavbar() {
    let pathNameArr = window.location.pathname.toString().split("/");
    let endPoint = pathNameArr[pathNameArr.length - 1];
    let navbarLinks = document.querySelectorAll(".navbarLink");

    navbarLinks.forEach((elem) => {
        elem.classList.remove("activeLink");
        if (elem.id == endPoint) {
            elem.classList.add("activeLink");
        }
    });

    if (endPoint == "") {
        navbarLinks[0].classList.add("activeLink");
    }
}


let form = document.getElementById("form")
let btn = document.getElementById("submitBtn")

btn.addEventListener("click", () => {
    form.setAttribute("action", "mailto:test@gmail.com?subject=testing the subject")
    console.log(form.getAttribute("action"))
})

let firstNameInput = document.getElementById("firstNameInput")
firstNameInput.addEventListener("invalid", () => {
    // firstNameInput.setCustomValidity(firstNameInput.getAttribute("placeholder"))
    // firstNameInput.setCustomValidity("Please enter your first name")
    firstNameInput.setAttribute("oninvalid", firstNameInput.setCustomValidity("test"))

})

// inputs.forEach((elem) => {
//     // elem.setAttribute("oninvalid", "test")
//     // elem.setCustomValidity(elem.getAttribute("placeholder"))

//     elem.addEventListener("invalid", (e) => {
//         console.log(elem)
//     })
// })

// oninvalid = "this.setCustomValidity('Lütfen işaretli yerleri doldurunuz')"