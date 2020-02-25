require('../styles/index.css')

const apikey = 'b86afd377bec48db9c40b1d00e483ffd';

async function getNews()
{
    const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=' + apikey;
    const response=await fetch(url);
    const user=await response.json();
    return user;
}

let news=getNews();
console.log(news);
news.then((data)=>{
    const length = data.articles.length;
                var output = '';
         
                for (var i = 0; i < length; i++) {
    
                    var obj = data.articles;
                    var titles = obj[i].title;
                    var authors = obj[i].author;
                    var descriptions = obj[i].description;
                    var urls = obj[i].url;
                    var image = obj[i].urlToImage;
    
                    output +='<li class="article">'+
                        '<div class="card p-1" style="width: 15rem;display:none"><img src="'+image+'" class="article-img" alt="..."></div> '+ 
                        '<div class="card p-1" style="width: 15rem;"><img src="'+image+'" class="card-img-top article-img" alt="..."> '+
                        
                        '<div class="card-body">'+
                        '<h2 class="article-title">'+titles.substring(0,70)+'</h2>'+
                        '<p class="article-description">'+descriptions.substring(0,100)+'</p>'+
                        '<span class="article-author">'+authors+'</span><br>'+
                        '<a href="'+urls+'" class="article-link">know more</a>' +
                        '</div></div></li> ';
    
                    document.getElementById('news-articles').innerHTML = output;
                }
}

)





function searchNews() {

    var query = document.getElementById('search').value;
    
    const url = 'http://newsapi.org/v2/everything?q=' + query + '&apiKey=' + apikey;
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        const length = data.articles.length;
        const results = data.totalResults;
        var output = '';
        if(results != 0)
        {
        for(var i=0; i<length; i++){
            var obj = data.articles;
            var titles = obj[i].title;
            var authors = obj[i].author;
            var descriptions = obj[i].description;
            var urls = obj[i].url;
            var image = obj[i].urlToImage;

            output +='<li class="article">'+
                    '<div class="card p-1" style="width: 15rem;display:none"><img src="'+image+'" class="article-img" alt="..."></div> '+ 
                    '<div class="card p-2" style="width: 17rem;"><img src="'+image+'" class="card-img-top article-img" alt="..."> '+        
                    '<div class="card-body">'+
                    '<h2 class="article-title">'+titles.substring(0,70)+'</h2>'+
                    '<p class="article-description">'+descriptions.substring(0,100)+'</p>'+
                    '<span class="article-author">'+authors+'</span><br>'+
                    '<a href="'+urls+'" class="article-link">know more</a>'
                    '</div></div></li> ';

                    document.getElementById('news-articles').innerHTML = output;
        }
    }
    else 
    {
        
        document.getElementById('news-articles').innerHTML = '';
        document.getElementById('notfound').innerHTML = 'No article was found based on the search.';
    }
    })
}

document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        var query = document.getElementById('search').value;
        query=='' ? getNews() : searchNews();
    }
}, false);
