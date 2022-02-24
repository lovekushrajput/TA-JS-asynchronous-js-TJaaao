let input = document.querySelector('input')
let avatarImage = document.querySelector('.avatar')
let avatarName = document.querySelector('h2')
let userName = document.querySelector('a')
let follower = document.querySelectorAll('.follower')
let following = document.querySelectorAll('.following')

let catImage = document.querySelector('.cat')
let button = document.querySelector('button')


// user
function createUI(data){
avatarImage.src = data.avatar_url
avatarName.innerText = data.name
userName.innerText = `@${data.login}`
}

//user-follower
function createFollower (data2){
for(let i=0 ; i<5;i++){
    let r = data2[i].avatar_url 
follower[i].src = r
}
}

// user-following
function createFollowing (data3){
    for(let i=0 ; i<5;i++){
        let s = data3[i].avatar_url 
    following[i].src = s
    }
    }


//handlekey
function handleKey(event){
  let user = event.target.value
if(user!==''){
  if(event.keyCode === 13){
    let xhr = new XMLHttpRequest
    xhr.open('GET',`https://api.github.com/users/${user}`)
    xhr.onload = function (){
        let userData = JSON.parse(xhr.response)
        createUI(userData)
    }
    xhr.send()

    let  xhrFollower = new XMLHttpRequest
     xhrFollower.open('GET',`https://api.github.com/users/${event.target.value}/followers`)
     xhrFollower.addEventListener('load',()=>{
        let userData2 = JSON.parse( xhrFollower.response)
        createFollower(userData2)
    })
    xhrFollower.send()


    let  xhrFollowing = new XMLHttpRequest
    xhrFollowing.open('GET',`https://api.github.com/users/${event.target.value}/following`)
    xhrFollowing.addEventListener('load',()=>{
       let userData3 = JSON.parse( xhrFollowing.response)
       createFollowing(userData3)
   })
   xhrFollowing.send()
    event.target.value = ''
  }
}
}

input.addEventListener('keyup',handleKey)


//

button.addEventListener('click',()=>{
    let xhrCat = new XMLHttpRequest
    xhrCat.open('GET','https://api.thecatapi.com/v1/images/search?limit=1&size=full')
    xhrCat.onload = function (){
      let cat = JSON.parse(xhrCat.response)
      cat.forEach((elm)=>{
        catImage.src = elm.url
      })
    }
    xhrCat.send()
})
