let url =
  "https://newsapi.org/v2/everything?" +
  "q=Apple&" +
  "from=2022-09-07&" +
  "sortBy=popularity&" +
  "apiKey=f36578cbd49a4d378930151f1e3ac0d6";

async function fetchArticles() {
  const response = await fetch(url);
  const data = await response.json();
  //return await data.articles[0];
  console.log(data.articles[0].title);
}

const fetchData = fetch(url)
  .then((response) => response.json())
  .then((response) => response.articles[0]);
const printTitle = () => {
  fetchData.then((a) => {
    console.log(a.title);
    console.log(a.description);
    console.log(a.source.name);
    console.log(a.url);
    console.log(a.urlToImage);
    console.log(typeof a.publishedAt);
  });
};
new Date("2022-09-08").getTime() / 1000;
