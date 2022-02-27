let input = document.querySelector('input')
let root = document.querySelector('ul')


let url = `https://api.unsplash.com/photos?client_id=QsUK1hER_XqYGi1q1_JqtCJieqFCVQ-9JYc87eauxIo`
let serchUrl = (query)=>`https://api.unsplash.com/search/photos?query=${query};client_id=QsUK1hER_XqYGi1q1_JqtCJieqFCVQ-9JYc87eauxIo`

function fetch(url){
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.onload = ()=> resolve (JSON.parse(xhr.response))
        xhr.onerror = ()=> reject('Something went wrong')
        xhr.send()
    })
}



function displayUI(imageList){
    root.innerHTML=''
    imageList.forEach((image)=>{
        let li = document.createElement('li')
        let img = document.createElement('img')
        img.src = image.urls.thumb
        li.append(img)
        root.append(li)
    })
}
fetch(url)
.then(displayUI)
.catch((error)=>console.log(error))


function handlekey(event) {
    if(event.keyCode===13){
       fetch(serchUrl(event.target.value)).then((searchResult)=>{
           displayUI(searchResult.results);
       })
       .catch((error)=>console.log(error))
        event.target.value=''
    }
}

input.addEventListener('keyup',handlekey)