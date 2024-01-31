const API_key = "478c3132135e4f02aea6e41095ef2fe4";
const Url = "https://newsapi.org/v2/everything?q=";
let inputData = document.getElementById('input-data');
let searchNews = document.getElementById('search-news');
searchNews.addEventListener('click',()=>loading())
searchNews.addEventListener('click',()=>fetchnews(inputData.value))
function search(){
    if(event.keyCode ==13){
    loading()
        fetchnews(inputData.value)
    }
}
let itemSelector =null;
function navnews(id){
    fetchnews(id)
      loading()
    const navitem = document.getElementById(id)
    itemSelector?.classList.remove('active')
    itemSelector =navitem;
    itemSelector.classList.add('active')

}


async function fetchnews(query){
let data = await fetch(`${Url}${query}&apiKey=${API_key}`);
let news = await data.json();
news.articles.length = 21;
console.log(news.articles)
bindata(news.articles)
}

function bindata(articles){
    let newsboxes = document.getElementById('cards-container');
    let newstemplate  = document.getElementById('news-temp');
  
    newsboxes.innerHTML =''
    articles.forEach(article => {
        if(!article.urlToImage) return;
        
    const cardclone = newstemplate.content.cloneNode(true)
    fillData(cardclone,article)
    newsboxes.appendChild(cardclone)
    });

}

function fillData(cardclone,article){
    let newsimg =cardclone.querySelector('#news-img')
    let newstitle =cardclone.querySelector('#news-title')
    let newssource =cardclone.querySelector('#news-source')
    let newsdesc =cardclone.querySelector('#news-desc')

  newsimg.src = article.urlToImage;
  newstitle.innerHTML = article.title;
  newsdesc.innerHTML = article.description;
  let date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:'Asia/Jakarta'})
  newssource.innerHTML=`${article.source.name} . ${date}`;

  cardclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank")
  })
}
function loading(){
let loader = document.querySelector('.loader-container');
loader.style.display="flex";
setTimeout(()=>{loader.style.display="none";},1300)
}

