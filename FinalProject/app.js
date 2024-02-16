const END_POINT = getEndPoint();
let scrollValue = 0;
let scrollLocation = 0;
let scrollPosition = 1;

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

if (END_POINT == "portfolio.html") {
    setScrollValue();
    createScrollEvntListener();
    updateScrollPosition(0)
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

function resetVideoWidth(width) {
    console.log("reset")
    let newScrollLocation = 0;

    switch (scrollLocation) {

    }
}

function setScrollValue() {
    let videoContainer = document.getElementById("containerVideo")
    let videoWidth = videoContainer.offsetWidth;

    scrollValue != videoWidth & scrollValue != 0 && resetVideoWidth(videoWidth);

    scrollValue = videoWidth
}
function createScrollEvntListener() {
    let bckBtn = document.getElementById("scrollB")
    let fwdBtn = document.getElementById("scrollF")

    window.addEventListener("resize", setScrollValue)
    bckBtn.addEventListener("click", () => { scrollPosition != 1 && scrollVideo(-scrollValue) })
    fwdBtn.addEventListener("click", () => { scrollPosition != 5 && scrollVideo(scrollValue) })
}

function scrollVideo() {
    let portfolioContainers = document.querySelectorAll(".containerPortfolioScoll");
    scrollLocation += value
    portfolioContainers.forEach(elem => { elem.scrollTo(scrollLocation, 0) })
    updateScrollPosition(value)
}

function updateScrollPosition(value) {
    if (value == -scrollValue)
        scrollPosition--

    else if (value == scrollValue)
        scrollPosition++

    let scrollSpan = document.getElementById("scrollPosDisplay")
    let msg = `${scrollPosition} of 5`
    scrollSpan.innerHTML = msg;
}