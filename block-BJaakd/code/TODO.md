1. Create a promise. Have it resolve with a value of `Promise Resolved!` in resolve after a delay of 1000ms, using `setTimeout`. Print the contents of the promise after it has been resolved by passing `console.log` to `.then`

```js
// Your code
let data = new Promise((resolve,reject)=> 
setTimeout( ()=> resolve('Promise Resolved!'),1000))
    data.then(console.log)
```

2. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch`

```js
// Your code
let data = new Promise((resolve,reject) => 
setTimeout(()=>reject(`Rejected Promise!`)
    ,1000));
    data.catch(console.log)
```

3. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch` and also use `.finally` to log message `Promise Settled!`.

```js
// Your code
let data = new Promise((resolve,reject) => reject(`Rejected Promise!`))
    data.catch(console.log)
    .finally(()=>console.log(`Promise Settled!`))
```

4. What will be the output of the code below.

```js
console.log('A');

// Asynchronous code finises in 0 seconds (Callback Queue)
setTimeout(() => console.log('B'), 0); // callback queue 

// A promise that resolves right away (Microtask Queue)
Promise.resolve().then(() => console.log('C'));

console.log('D');


// A (after 0ms)
// D(after 1ms)
// C(after 2ms)
// B(after 3ms)
```

5. Write a function named `wait` that accepts `time` in ms returns a promise. The promise gets resolved after given time.

```js
// Your code
function wait(time){
    return new Promise((resolve,reject)=> setTimeout(()=> resolve(`Promise is resolve in ${time}ms`), time))
}

let data = wait(3000)
data.then(console.log)
```

6. Do the following:

- Create a new promise
- Resolve with 21
- Use `.then` and return adding `10` to the value you will get as parameter
- Use `.then` and return adding `100` to the value you will get as parameter
- Use `.then` and check if the value you get is greater than `100` throw new error with any message
- Catch the error using `.catch`

```js
// Your code
let data = Promise.resolve(21)
.then((value)=> value + 10)
.then((value2)=> value2 + 100)
.then((value3)=> {
    if(value3>100){
        throw new Error ('something went wrong')
    }
})
.catch(console.error)
```

7. Do the following:

- Create a new promise
- Resolve the promise with `['A']`
- Use `.then` and concat `B` into the parameter and return
- Use `.then` and return and object like `{0: 'A', 1: 'B'}`
- Use `.then` and log the value

```js
// Your code
let data = new Promise((resolve,reject)=> resolve(['A']))
.then((value)=> value.concat('B'))
.then((value2)=>  value2.reduce((acc,cv,index)=>{
    acc[index]=cv
    return acc
},{}))
.then((value3)=> console.log(value3))
```

8. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Chain `.then` on above and return `3` also check the value you get access to by logging
- Chain `.then` on above and return `4` also check the value you get access to by logging

```js
// Your code
let first  = new Promise((resolve,reject)=>resolve(1))
first
.then((value)=> {
    console.log(value)
    return 2
})
.then((value2)=> {
    console.log(value2)
    return 3
})
.then((value3)=> {
    console.log(value3)
    return 4
})

```

9. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Use `.then` on `first` and return `3` also check the value you get access to by logging
- Use `.then` on `first` and return `4` also check the value you get access to by logging

```js
// Your code
let first  = new Promise((resolve,reject)=>resolve(1))
first.then((value)=> {
    console.log(value)
    return 2
});
first.then((value2)=> {
    console.log(value2)
    return 3
});
first.then((value3)=> {
    console.log(value3)
    return 4
})
```

10. Try to understand the difference between the problem 8 and 9. Write your observation.
```js
- In problem 8 we are return a new promise everytime 
but
- In problem 9 we are using only one promise and solving problems
```

11. Do the following

- Create a promise and resolve it with `John`
- Use `.then` and return another promise that resolves with `Arya`
- Use `.then` log the value you get access to and return another promise that resolves after 2000ms with value `Bran`
- Use `.then` to log the value

```js
// Your code
let data = new Promise((resolve,reject)=> resolve('John'))
.then((value)=> {
    console.log(value) 
    return Promise.resolve('Arya')
})
.then((value2)=>{
    console.log(value2)
    return new Promise((res,rej)=> 
    setTimeout(()=>res('Bran')
    ,2000))
})
.then((value3)=> console.log(value3))
```
