- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.
```js
function randomValue(){
   return Math.floor( Math.random()*6)
}

let first = new Promise(resolve => setTimeout(()=>resolve(randomValue()),1000))
let second = new Promise(resolve => setTimeout(()=>resolve(randomValue()),2000))
let third = new Promise(resolve => setTimeout(()=>resolve(randomValue()),3000))
let fourth = new Promise(resolve => setTimeout(()=>resolve(randomValue()),4000))

Promise.all([first,second,third,fourth]).then(console.log)
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.
```js
let userList = [
  'lovekushrajput',
  'upendrarajput9',
  'prank7',
  'suraj',
  'nnnkit'
]

Promise.all(userList.map((user)=>{
  fetch(`https://api.github.com/users/${user}`).then(res=> res.json())
})).then((elm)=> elm.forEach((elm)=> console.log(elm.followers)))
```
- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow
```js
let dog = fetch('https://random.dog/woof.json').then(res => res.json()).then(console.log)
let cat = fetch('https://aws.random.cat/meow').then(res => res.json()).then(console.log)
Promise.race([dog,cat])
```
- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);


No `Promise.all` is not working because are using a promise named (two) is rejected.


Promise.allSettled([one,two,three])
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);


['Arya','Sam',{name: 'John'}] - output
```
