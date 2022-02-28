let select = document.querySelector('select')
let root =  document.querySelector('ul')




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


let data =  fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
.then(res=> res.json())
.then(newsList=>{
  //default
displayUI(newsList)

//addevent listener
  select.addEventListener('change',()=>{
    let value = select.options[select.selectedIndex].text
    if(value=== 'Select a news source'){
      displayUI(newsList)
    }else{
      let filterData = newsList.filter(obj=> obj.newsSite.includes(value)) 
      displayUI(filterData)
    }
  })
  })
  .catch(()=>'Something went wrong ☠️')


