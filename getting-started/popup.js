// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        const favicon = document.querySelector('link[rel="shortcut icon"]');
        const icon = document.querySelector('link[rel="icon"]');
        const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
        // const maskIcon = document.querySelector('link[rel="mask-icon"]');
        // maskIcon.href = 'https://img.lemde.fr/2019/05/17/0/0/3553/2542/1328/0/45/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg';
        appleTouchIcon.href = 'https://img.lemde.fr/2019/05/17/0/0/3553/2542/1328/0/45/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg';
        icon.href = 'https://img.lemde.fr/2019/05/17/0/0/3553/2542/1328/0/45/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg';
        favicon.href = 'https://img.lemde.fr/2019/05/17/0/0/3553/2542/1328/0/45/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg';
        document.body.style.backgroundColor = color;
    });
}