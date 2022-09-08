function createAnImageNotif(title, description, date, imageUrl) {
    chrome.notifications.create("NOTIFICATION_ID", {
        type: "image",
        iconUrl: "/images/icon.png",
        imageUrl: imageUrl,
        title: title,
        message: description,
        priority: 2,
        buttons: [
            {
                title: "read now"
            }
        ],
        eventTime: date
    })
}

function createABasicNotif(title, description, date) {
    chrome.notifications.create("", {
        type: "basic",
        iconUrl: "/images/icon.png",
        title: title,
        message: description,
        priority: 2,
        buttons: [
            {
                title: "read now"
            }
        ],
        eventTime: date
    })
}