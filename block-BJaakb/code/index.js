let input = document.querySelector('input')
let root = document.querySelector('ul')



function fetch(url){
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.onload = ()=> resolve (JSON.parse(xhr.response))
        xhr.onerror = ()=> reject('Something went wrong')
        xhr.send()
    })
}


function displayUI(imageName){
let data = fetch(`https://api.unsplash.com/search/photos?query=${imageName};client_id=QsUK1hER_XqYGi1q1_JqtCJieqFCVQ-9JYc87eauxIo`)
data
.then((imageList) =>{
    root.innerHTML=''
    imageList.results.forEach((image)=>{
        let li = document.createElement('li')
        let img = document.createElement('img')
        img.src = image.urls.thumb
        li.append(img)
        root.append(li)
    })
})
.catch(info =>console.log(info))
}


function handlekey(event) {
    if(event.keyCode===13){
        displayUI(event.target.value)
        event.target.value=''
    }
}

input.addEventListener('keyup',handlekey)