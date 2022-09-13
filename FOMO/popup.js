let button = document.getElementById("button");
button.addEventListener("click", buttonUpdate);
let inputTopic = document.getElementById("topic");
inputTopic.addEventListener("keypress", async function (e) {
  if (inputTopic.value == "" && e.key === "Enter") {
    alert("You must choose a topic.");
  } else if (e.key === "Enter") {
    await buttonUpdate();
  }
});

//test pour accéder à la sélection utilisateur
let userSelection = window.getSelection();
console.log(userSelection);
let urlOpen = chrome.tabs.query(url);
console.log(urlOpen);

let userTopic;
let url;

async function buttonUpdate() {
  //store the data related to topic
  let topic = document.getElementById("topic");
  userTopic = topic.value;
  console.log(userTopic);

  //store the data related to date
  //   let date = document.getElementById("date");
  //   let userDate = date.value;
  //   date = new Date();

  // //format the date from string to object
  //   if(userDate === "yesterday"){
  //     date.setDate(date.getDate() - 1);
  //   } else if(userDate === "three days ago"){
  //     date.setDate(date.getDate() - 3);
  //   } else if(userDate === "a week ago"){
  //     date.setDate(date.getDate() - 7);
  //   }

  //extract infos from date and format for API
  // let year = String(date.getFullYear());
  // let month = String(date.getMonth() + 1);
  // if (month < 10) {
  //   month = "0" + month;
  // };
  // let day = String(date.getDate());
  // if (day < 10) {
  //   day = "0" + day;
  // };

  // let fullDate = `${year}-${month}-${day}`;
  // console.log(fullDate);

  //let url = 'https://newsdata.io/api/1/news?apikey=pub_11024b51bab49e5c0e5be61de5f0eb348afdb&language=fr,en&q=' + 'Apple' + '&from=' + fullDate + '&apiKey=f36578cbd49a4d378930151f1e3ac0d6';

  url =
    "https://newsdata.io/api/1/news?apikey=pub_1096463a00f38152b895f422ed9db51349ba9&language=fr,en&qInTitle= " +
    userTopic +
    " ";

  //fetchArticles(0);
  let articles = await fetchArticles();
  displayOneByOne(articles, 0, 3);
}

function displayOneByOne(list, next, max) {
  if (next > max) {
    return;
  } else {
    displayArticles(list, next);
  }
  setTimeout(() => {
    displayOneByOne(list, next + 1, max);
  }, 3000);
}

async function fetchArticles() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data.results;
}
//get latest article from API about user-chosen topic
async function displayArticles(list, num) {
  //console.log(data.results[0].title);
  let title = list[num].title;
  let link = list[num].link;
  let pubDate = list[num].pubDate;
  let imageUrl = list[num].image_url;
  let description = list[num].description;
  let sourceId = list[num].source_id;
  console.log(imageUrl);
  let epochDate = new Date(pubDate);
  epochDate = epochDate.getTime();
  console.log(pubDate);
  console.log(typeof epochDate);

  //if statement if parameter(s) is unavailable
  if (!description) {
    description = "Click the link to discover more!";
  }
  if (!title) {
    title = "News related to " + userTopic;
  }

  if (!imageUrl) {
    createABasicNotif(sourceId + " | " + title, description, epochDate);
  } else {
    createAnImageNotif(
      sourceId + " | " + title,
      description,
      epochDate,
      "/images/icon.png"
    );
  }
  readNow(link);
}

window.onunhandledrejection = (e) => {
  console.log(e.reason);
  alert("Sorry, your taste is too particular... Please choose another topic.");
};

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
