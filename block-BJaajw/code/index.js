(function (){
let select = document.querySelector('select');
let root = document.querySelector('ul');
let errorElm = document.querySelector('.error');
let main = document.querySelector('.main');
let loader = document.querySelector('.loader');
loader.style.display = 'none';
let allNews = [];

function handleError(errorMsg = 'Something went wrong!') {
  if (errorMsg) {
    errorElm.style.display = 'block';
    errorElm.innerText = errorMsg;
    main.style.display = 'none';
  }
}

function spinner(status = false) {
  if (status) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}

function displayUI(newsInfo) {
  root.innerHTML = '';
  newsInfo.forEach((elm) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = elm.imageUrl;
    let box = document.createElement('div');
    box.classList = 'box';
    let h2 = document.createElement('h2');
    h2.innerText = elm.newsSite;
    let p = document.createElement('p');
    p.innerText = elm.title;

    let div = document.createElement('div');
    div.classList = 'button';
    let a = document.createElement('a');
    a.innerText = 'Read More';
    a.href = elm.url;
    div.append(a);
    box.append(h2, p, div);
    li.append(img, box);
    root.append(li);
  });
}

function displayOptions(sources) {
  sources.forEach((source) => {
    let options = document.createElement('option');
    options.innerText = source;
    options.value = source;
    select.append(options);
  });
}

function init() {
  spinner(true);
  fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`response is not ok ${res.status} ☠️!`);
      } else {
        return res.json();
      }
    })
    .then((newsList) => {
      allNews = newsList;
      displayUI(newsList);
      let allSource = Array.from(new Set(newsList.map((n) => n.newsSite)));
      displayOptions(allSource);
    })
    .catch((error) => {
      handleError(error);
    })
    .finally(() => spinner());
}

select.addEventListener('change', (e) => {
  let value = e.target.value;
  console.log(value);
  let filterNews;
  if (value === 'Select a news source') {
    filterNews = allNews;
    displayUI(filterNews);
  } else {
    filterNews = allNews.filter((news) => news.newsSite === value);
    displayUI(filterNews);
  }
});

if (navigator.onLine) {
  init();
} else {
  handleError('Please check your internet connection ❌!');
}
})()