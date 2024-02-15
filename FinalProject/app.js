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