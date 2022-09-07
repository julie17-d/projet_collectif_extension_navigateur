function createANotif() {
    chrome.notifications.create("NOTIFICATION_ID", {
        type: "image",
        iconUrl: "/images/icon.png",
        imageUrl: "/images/icon.png",
        title: "Breaking News",
        message: "There has been a huge new development or whatever.",
        priority: 2,
        buttons: [
            {
                title: "save for later"
            },
            {
                title: "read now"
            }
        ],
        eventTime: Date.now()
    })
}