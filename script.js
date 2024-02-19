const apikey = "ad0b002a436c4cf2964394bc5a80d942";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error Fetching", error);
        return [];
    }
}
 searchButton.addEventListener("click",async ()=>{
    const query =searchField.value.trim();
    if(query!==""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }
        catch(error){
            console.log("error- query",error)
        }
    }
 })
 async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error Fetching", error);
        return [];
    }
 }
function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const shortTitle =
            article.title.length > 30
                ? article.title.slice(0, 30) + "..."
                : article.title;
        title.textContent = shortTitle;

        const desc = document.createElement("p");
        const shortDesc =
        article.description && article.description.length > 100
            ? article.description.slice(0, 100) + "..."
            : article.description || "";
    desc.textContent = shortDesc;
    

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desc);
        blogContainer.appendChild(blogCard);
        blogCard.addEventListener("click", () => {
            if (article.url) {
                window.open(article.url, "_blank");
            } else {
                console.error("Article URL is null or undefined");
            }
        })
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
        console.log(articles);
    } catch (error) {
        console.error("Error Fetching", error);
    }
})();
