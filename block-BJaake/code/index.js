let select = document.querySelector('select')
let root =  document.querySelector('ul')
let allNews = []



function displayUI(newsInfo){
  root.innerHTML = ''
    newsInfo.forEach((elm)=>{
                let li = document.createElement('li')
                let img = document.createElement('img')
                img.src = elm.imageUrl
                let box = document.createElement('div')
                box.classList = 'box'
                let h2 = document.createElement('h2')
                h2.innerText = elm.newsSite
                let p = document.createElement('p')
                p.innerText = elm.title

                let div = document.createElement('div')
                div.classList = 'button'
                let a = document.createElement('a')
                a.innerText='Read More'
                a.href = elm.url
                div.append(a)
                box.append(h2,p,div)
                li.append(img,box)
                root.append(li)
            })
}


function displayOptions(sources){
sources.forEach((source)=>{
  let options = document.createElement('option')
  options.innerText = source
  options.value = source
  select.append(options)
})
}

let data =  fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
.then(res=> res.json())
.then(newsList=>{
  allNews = newsList
displayUI(newsList)
let allSource = Array.from(new Set( newsList.map( (n) => n.newsSite) ))
displayOptions(allSource)
  })


select.addEventListener('change',(e)=>{
let value = e.target.value
let filterNews
if(value==='Select a news source'){
  filterNews = allNews;
  displayUI(filterNews);
}else{
  filterNews= allNews.filter((news)=> news.newsSite=== value);
  displayUI(filterNews);
}

})