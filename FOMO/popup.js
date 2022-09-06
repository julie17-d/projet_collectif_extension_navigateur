let button = document.getElementById("button");
button.addEventListener("click", buttonUpdate);

function buttonUpdate() {
  let topic = document.getElementById("topic");
  let userTopic = topic.value;

  userTopic = userTopic.join("-");
  console.log(userTopic);
  let date = document.getElementById("date");
  let userDate = date.value;
  console.log(userDate);
}
