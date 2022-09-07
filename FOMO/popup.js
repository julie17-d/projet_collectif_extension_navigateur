let button = document.getElementById("button");
button.addEventListener("click", buttonUpdate);

function buttonUpdate() {
//store the data related to topic
  let topic = document.getElementById("topic");
  let userTopic = topic.value;

//format the topic without spaces
  userTopic = userTopic.split(" ");
  userTopic = userTopic.join("-");
  console.log(userTopic);

//store the data related to date
  let date = document.getElementById("date");
  let userDate = date.value;
  date = new Date();

//format the date from string to object
  if(userDate === "yesterday"){
    date.setDate(date.getDate() - 1);
  } else if(userDate === "three days ago"){
    date.setDate(date.getDate() - 3);
  } else if(userDate === "a week ago"){
    date.setDate(date.getDate() - 7);
  }

//extract infos from date and format for API
  let year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  if (month < 10) {
    month = "0" + month;
  };
  let day = String(date.getDate());
  if (day < 10) {
    day = "0" + day;
  };

  let fullDate = `${year}-${month}-${day}`;
  console.log(fullDate);

  //let url = 'https://newsapi.org/v2/everything?q=' + 'Apple' + '&from=' + fullDate + '&apiKey=f36578cbd49a4d378930151f1e3ac0d6';
}
let url = 'https://newsapi.org/v2/everything?' +
'q=Apple&' +
'from=2022-09-07&' +
'sortBy=popularity&' +
'apiKey=f36578cbd49a4d378930151f1e3ac0d6';

const fetchData = fetch(url)
.then((response) => response.json())
.then((response) => response.articles[0]);
const printTitle = () => {
  fetchData.then((a) => {
      console.log(a.title)
      console.log(a.description)
      console.log(a.source.name)
      console.log(a.url)
      console.log(a.urlToImage)
      console.log(typeof a.publishedAt)
  });
}

printTitle();