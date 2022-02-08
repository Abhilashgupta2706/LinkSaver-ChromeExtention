const saveBtn = document.getElementById("save-btn")
const customURLBtn = document.getElementById("customURL-btn")
const inputTxt = document.getElementById("input-txt")
const deleteBtn = document.getElementById("delete-btn")
const ulEL = document.getElementById("ul-el")


let savedLinks = []
const linksFromLocalStorage = JSON.parse(localStorage.getItem("Links"))

if (linksFromLocalStorage) {
    savedLinks = linksFromLocalStorage

    render1(savedLinks)
}


saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tablink) {
        savedLinks.push(tablink[0].url)
        localStorage.setItem("Links", JSON.stringify(savedLinks))

        render1(savedLinks)
    })
})

deleteBtn.addEventListener("dblclick", function () {
    savedLinks = []
    localStorage.removeItem("Links")

    render1(savedLinks)
    render2(savedLinks)
})

customURLBtn.addEventListener("click", function () {
    if (inputTxt.value != "") {
        savedLinks.push(inputTxt.value)
        localStorage.setItem("Links", JSON.stringify(savedLinks))
        inputTxt.value = ""

        render2(savedLinks)
    }
})


// Render Funtions to show LINKS

function render1(link) {
    let listItems = ""
    for (let i = 0; i < link.length; i++) {
        listItems += `
        <li>
            <a target="_blank" href="${link[i]}">
                ${link[i]}
            </a>
        </li>
        `
    }
    ulEL.innerHTML = listItems
}
function render2(link) {
    let listItems = ""
    for (let i = 0; i < link.length; i++) {
        listItems += `
        <li>
            <a target="_blank" href="https://${link[i]}">
                ${link[i]}
            </a>
        </li>
        `
    }
    ulEL.innerHTML = listItems
}
