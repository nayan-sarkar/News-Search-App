import testData from './testData.js';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://newsapi.org/v2/everything?q=";
const cardsContainerEl = document.getElementById('cards-container');
const searchBtnEl = document.querySelector('input[type="button"]');
const searchTextEl = document.querySelector('input[type="text"]');
const navLinkEl = document.querySelector(".nav-links > ul");
const logoLink = document.getElementById('logo-image');


logoLink.addEventListener('click',function(){
    fetchNews("Global News");
    // render local data
    // testData.forEach(renderCard);
})

window.addEventListener('load',function(){
    fetchNews("Global News");
    // render local data
    // testData.forEach(renderCard);
})

navLinkEl.addEventListener('click',function(e){
    fetchNews(e.target.textContent);
})

searchBtnEl.addEventListener('click',function(){
    if(searchTextEl.value){
        fetchNews(searchTextEl.value);
    }
    searchTextEl.value = null;
    
})

searchTextEl.addEventListener("keypress",function(e){
        if(e.key==="Enter"){
        e.preventDefault();
        searchBtnEl.click();
    }
})

async function fetchNews(query){
    cardsContainerEl.replaceChildren();
    const res = await fetch(`${API_URL}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    data.articles.forEach(renderCard);
}

function renderCard(cardObj){
    if(cardObj.urlToImage){
        const articleLinkEl = document.createElement('a');
        articleLinkEl.setAttribute("href",cardObj.url);
        articleLinkEl.setAttribute("target","_blank");
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        const cardHeaderEl = document.createElement('div');
        cardHeaderEl.classList.add('card-header');
        cardEl.appendChild(cardHeaderEl);
        const articleImgEl = document.createElement('img');
        cardHeaderEl.appendChild(articleImgEl);
        articleImgEl.src = cardObj.urlToImage;
        articleImgEl.alt = "article image"
        const cardContentEl = document.createElement('div');
        cardContentEl.classList.add('card-content');
        cardContentEl.classList.add('flex');
        cardEl.appendChild(cardContentEl);
        const articleHeaderEl = document.createElement('h3');
        articleHeaderEl.setAttribute("id","article-title");
        articleHeaderEl.textContent = 
        cardObj.title.length > 10 ? `${cardObj.title.split(' ').slice(0,11).join(' ')} ...` : cardObj.title;
        cardContentEl.appendChild(articleHeaderEl);
        const articleSourceEl = document.createElement('h4');
        articleSourceEl.setAttribute("id","article-source");
        articleSourceEl.textContent = cardObj.source.name
        cardContentEl.appendChild(articleSourceEl);
        const articleAuthorEl = document.createElement('h4');
        articleAuthorEl.setAttribute("id","article-author");
        articleAuthorEl.textContent = cardObj.author
        cardContentEl.appendChild(articleAuthorEl);
        const articleDescEl = document.createElement('p');
        articleDescEl.setAttribute("id","article-desc");
        articleDescEl.textContent = `${cardObj.description.slice(0,135)} ...`;
        cardContentEl.appendChild(articleDescEl);
        articleLinkEl.appendChild(cardEl)
        cardsContainerEl.appendChild(articleLinkEl);

    }    
}
