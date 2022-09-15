function createABasicNotif(title, description, date, link, source) {
  chrome.notifications.create("01", {
    type: "basic",
    iconUrl: "/images/icon.png",
    title: title,
    message: source + ": " + date + " | " + description,
    priority: 2,
    buttons: [
      {
        title: "Read now",
      }],
  });
  readNow(link);
}

function readNow(link) {
  chrome.notifications.onButtonClicked.addListener(function (tab) {
    chrome.tabs.create({ url: link });
  });
}

// function createAnImageNotif(title, description, date, imageUrl) {
//   chrome.notifications.create("01", {
//     type: "image",
//     iconUrl: "/images/icon.png",
//     imageUrl: imageUrl,
//     title: title,
//     message: description,
//     priority: 2,
//     buttons: [
//       {
//         title: "read now",
//       },
//     ],
//     eventTime: date,
//   });
// }