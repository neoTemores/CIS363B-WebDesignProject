let END_POINT = "";
let SCROLL_VALUE = 0;
let SCROLL_LOCATION = 0;
let SCROLL_POSITION = 1;

loadPage();
function loadPage() {
    setEndPoint()
    updateNavbar()
    executeConditionalLogic()
}

// get & set endpoint from URL
function setEndPoint() {
    let pathNameArr = window.location.pathname.toString().split("/");
    END_POINT = pathNameArr[pathNameArr.length - 1];
}

// sets active navbar tab based on endpoint
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

// executes logic needed by contact or portfolio page
function executeConditionalLogic() {
    if (END_POINT == "contact.html") {
        setFormValidityMsg("firstNameInput", "your first name")
        setFormValidityMsg("lastNameInput", "your last name")
        setFormValidityMsg("emailInput", "a valid email")
        createFormEvntListener()
    }

    if (END_POINT == "portfolio.html") {
        toggleQuickScroll();
        setScrollValue();
        createScrollEvntListener();
        // updateScrollPosition(null)
        scrollVideo(0)
        toggleQuickScroll();
    }
}


// =====  Contact page logic ============== 

// set custom invalid form input msg
function setFormValidityMsg(elemName, msg) {
    let elem = document.getElementById(elemName)
    elem.setAttribute("oninvalid", `this.setCustomValidity("Please enter ${msg}")`)
    elem.setAttribute("oninput", 'this.setCustomValidity("")')
}

// creates an event listener for form submit
function createFormEvntListener() {
    let form = document.getElementById("form")
    form.addEventListener("submit", () => { handleSubmit(form) })
}

// grabs form input data, create & set action URL
function handleSubmit(form) {
    let firstName = document.getElementById("firstNameInput").value
    let lastName = document.getElementById("lastNameInput").value
    let email = document.getElementById("emailInput").value
    let subject = `Hello from ${firstName} ${lastName} - ${email}`

    let actionString = `mailto:neo.temores@live.com?subject=${subject}`
    form.setAttribute("action", actionString)
}
// ===========================================================



// ====== Portfolio page logic ===================

// add / remove smooth scroll behavior
// want quick scroll when page loads & window resizes
function toggleQuickScroll() {
    let portfolioContainers = document.querySelectorAll(".containerPortfolioScoll");
    portfolioContainers.forEach(elem => { elem.classList.toggle("quickScroll") })
}

// set scroll amount to current video container width
function setScrollValue() {
    let videoContainer = document.getElementById("containerVideo")
    let videoWidth = videoContainer.offsetWidth;

    // if scroll val != video width -> window was resized
    // if scroll val != 0 -> page did NOT just load, window was resized
    SCROLL_VALUE != videoWidth & SCROLL_VALUE != 0 && resetVideoWidth(videoWidth);

    SCROLL_VALUE = videoWidth
}

// resets the video container scroll location on window resize
function resetVideoWidth(width) {
    toggleQuickScroll();
    SCROLL_LOCATION = (SCROLL_POSITION - 1) * width;
    scrollVideo(0)
    toggleQuickScroll();
}

// creates event listeners for window resize and Fwd/Bck btns
function createScrollEvntListener() {
    let bckBtn = document.getElementById("scrollB")
    let fwdBtn = document.getElementById("scrollF")

    window.addEventListener("resize", setScrollValue)
    // scroll position check prevents scrolling past 1-5 limit
    bckBtn.addEventListener("click", () => { SCROLL_POSITION != 1 && scrollVideo(-SCROLL_VALUE) })
    fwdBtn.addEventListener("click", () => { SCROLL_POSITION != 5 && scrollVideo(SCROLL_VALUE) })
}

// scrolls video position to next location
function scrollVideo(value) {
    value != 0 && stopCurrentVideo()

    let portfolioContainers = document.querySelectorAll(".containerPortfolioScoll");
    SCROLL_LOCATION += value
    portfolioContainers.forEach(elem => { elem.scrollTo(SCROLL_LOCATION, 0) })
    updateScrollPosition(value)
}

// stops video playback by resetting src url
// this prevents video playback if not in current view
function stopCurrentVideo() {
    let iFrames = document.querySelectorAll("iframe")
    let targetIframe = iFrames[SCROLL_POSITION - 1]

    let src = targetIframe.src
    targetIframe.src = src
}

// updates the [ # of 5 ] msg
function updateScrollPosition(value) {
    if (value == -SCROLL_VALUE)
        SCROLL_POSITION--

    else if (value == SCROLL_VALUE)
        SCROLL_POSITION++

    let scrollSpan = document.getElementById("scrollPosDisplay")
    let msg = `${SCROLL_POSITION} of 5`
    scrollSpan.innerHTML = msg;
}