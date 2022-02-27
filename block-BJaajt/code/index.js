let input = document.querySelector('input')
let avatarImage = document.querySelector('.avatar')
let avatarName = document.querySelector('h2')
let userName = document.querySelector('a')
let followers = document.querySelector('.follower')
let followings = document.querySelector('.following')

let catImage = document.querySelector('.cat')
let button = document.querySelector('button')




function fetch(url,successor){
  let xhr = new XMLHttpRequest
  xhr.open('GET',url)
  xhr.onload = () =>  successor(JSON.parse(xhr.response))
  xhr.onerror = function (){
    console.error('Something went wrong!')
  }
  xhr.send()
}



//follower and following
function common(url,root){
  root.innerHTML = '';
  fetch(url,function(followerList){
    let topFive = followerList.slice(0,5)
    topFive.forEach((info) => {
      let li = document.createElement('li')
      let img = document.createElement('img')
      img.src = info.avatar_url
      li.append(img)
      root.append(li)
    })
  })

}

// user
function displayUI(userInfo){
  console.log(userInfo)
avatarImage.src = userInfo.avatar_url
avatarName.innerText = userInfo.name
userName.innerText = `@${userInfo.login}`
 common(`https://api.github.com/users/${userInfo.login}/followers`,followers)
 common(`https://api.github.com/users/${userInfo.login}/following`,followings)
}





//handlekey
function handleKey(event){
  if(event.keyCode === 13 && event.target.value){
    let userData = event.target.value
    let url = "https://api.github.com/users/"
    fetch(url + userData , displayUI)
    event.target.value = ''
}
}
input.addEventListener('keyup',handleKey)


//cat
button.addEventListener('click',()=>{
  fetch('https://api.thecatapi.com/v1/images/search?limit=1&size=full',function(cat){
    cat.forEach((elm)=>{
      catImage.src = elm.url
    })
  })
})
