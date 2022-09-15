//put the html button in a JS variable
let button = document.getElementById("button");

//put the html input in a JS variable
let inputTopic = document.getElementById("topic");

//launch buttonUpdate() on click or alert an error
button.addEventListener("click", async function(){
  if (inputTopic.value == ""){
    alert("You must choose a topic.");   
  } else {
    await buttonUpdate();
  }
});

//launch buttonUpdate() with Enter or alert an error
inputTopic.addEventListener("keypress", async function (e) {
  if (inputTopic.value == "" && e.key === "Enter") {
    alert("You must choose a topic.");
  } else if (e.key === "Enter") {
    await buttonUpdate();
  }
});

let userTopic;
let url;

//
async function buttonUpdate() {
  //store the data related to topic
  let topic = document.getElementById("topic");
  userTopic = topic.value;
  //prepare the API request
  url =
    "https://newsdata.io/api/1/news?apikey=pub_1096463a00f38152b895f422ed9db51349ba9&language=fr,en&qInTitle= " +
    userTopic +
    " ";
  //API request and display
  let articles = await fetchArticles();
  displayOneByOne(articles, 0, 2);
}

//recursive function to display three notifications, one by one
function displayOneByOne(list, next, max) {
  //alert an error if topic is empty
  if (list.length == 0){
    alert("Sorry, no luck this time... Please choose another topic.");
    inputTopic.value="";
    return;
  }
  if (next > max) {
    return;
  } else {
    displayArticles(list, next);
  }
  setTimeout(() => {
    displayOneByOne(list, next + 1, max);
  }, 10000);
}

//API request
async function fetchArticles() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data.results;
}

//get each elements needed from API request
async function displayArticles(list, num) {
  let title;
  if (list[num].title==null) {
    title = "News related to " + userTopic;
  } else {
    title = list[num].title
  }
  let link = list[num].link;
  let description = list[num].description;
  let sourceId = list[num].source_id;
  
  //get and format the published date
  let pubDate = list[num].pubDate;
  let date = pubDate.split(' ');
  let dayAndMonth = date[0].split('-');
  let day = dayAndMonth[2];
  let month = dayAndMonth[1];
  let hourAndMinutes = date[1].split(":");
  let hour = hourAndMinutes[0];
  let minutes = hourAndMinutes[1];
  let time = `${day}/${month} at ${hour}:${minutes}`;

  //if statement if parameter(s) is unavailable
  if (!description) {
    description = "Click the link to discover more!";
  }

  createABasicNotif(title, description, time, link, sourceId);
};






// ARCHIVES :

// window.onunhandledrejection = (e) => {
//   console.log(e.reason);
//   alert("Sorry, your taste is too particular... Please choose another topic.");
// };

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// store the data related to date
//   let date = document.getElementById("date");
//   let userDate = date.value;
//   date = new Date();

// format the date from string to object
//   if(userDate === "yesterday"){
//     date.setDate(date.getDate() - 1);
//   } else if(userDate === "three days ago"){
//     date.setDate(date.getDate() - 3);
//   } else if(userDate === "a week ago"){
//     date.setDate(date.getDate() - 7);
//   }

// extract infos from date and format for API
// let year = String(date.getFullYear());
// let month = String(date.getMonth() + 1);
// if (month < 10) {
//   month = "0" + month;
// };
// let day = String(date.getDate());
// if (day < 10) {
//   day = "0" + day
// };