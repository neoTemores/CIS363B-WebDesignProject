const END_POINT = getEndPoint();
updateNavbar();

function updateNavbar() {
    let navbarLinks = document.querySelectorAll(".navbarLink");

    navbarLinks.forEach((elem) => {
        elem.classList.remove("activeLink");
        if (elem.id == END_POINT) {
            elem.classList.add("activeLink");
        }
    });

    END_POINT == "" && navbarLinks[0].classList.add("activeLink");
}

function getEndPoint() {
    let pathNameArr = window.location.pathname.toString().split("/");
    return pathNameArr[pathNameArr.length - 1];

}

if (END_POINT == "contact.html") {
    setFormValidityMsg("firstNameInput", "your first name")
    setFormValidityMsg("lastNameInput", "your last name")
    setFormValidityMsg("emailInput", "a valid email")
    createFormEvntListener()
}

function setFormValidityMsg(elemName, msg) {
    let elem = document.getElementById(elemName)
    elem.setAttribute("oninvalid", `this.setCustomValidity("Please enter ${msg}")`)
    elem.setAttribute("oninput", 'this.setCustomValidity("")')
}

function createFormEvntListener() {
    let form = document.getElementById("form")
    form.addEventListener("submit", () => { handleSubmit(form) })
}

function handleSubmit(form) {
    let firstName = document.getElementById("firstNameInput").value
    let lastName = document.getElementById("lastNameInput").value
    let email = document.getElementById("emailInput").value
    let subject = `Hello from ${firstName} ${lastName} - ${email}`

    let actionString = `mailto:neo.temores@live.com?subject=${subject}`
    form.setAttribute("action", actionString)
}
