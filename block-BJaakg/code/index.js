(function(){
    let main = document.querySelector('.main');
let popup = document.querySelector('.popup');
let gotPeople = document.querySelector('.peoples');
let charactersUL = document.querySelector('.chracters');
let closeBtn = document.querySelector('.closeBtn');
let loader = document.querySelector('.spinner');
loader.style.display = 'none';
let error = document.querySelector('.error');

closeBtn.addEventListener('click', () => {
  main.style.display = 'block';
  popup.style.display = 'none';
  main.style.position = 'absolute';
  main.style.display = 'grid';
});

function charactersUI(character) {
  loader.style.display = 'block';
  loader.style.display = 'flex';
  Promise.all(
    character.map((e) =>
      fetch(e).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`response is not ok ${res.status}`);
        }
      })
    )
  )
    .then((charData) => {
      charactersUL.innerHTML = '';
      charData.forEach((char) => {
        let li = document.createElement('li');
        li.classList = 'chracterBox';
        li.innerText = `${char.name} : (${char.aliases.join(' ')})`;
        charactersUL.append(li);
      });
    })
    .catch((err) => (error.innerText = err))
    .finally(() => {
      loader.style.display = 'none';
    });
}

function createUI(arrayOfPeoples) {
  arrayOfPeoples.forEach((people) => {
    let li = document.createElement('li');
    li.classList = 'box';
    let h2 = document.createElement('h2');
    h2.innerText = people.name;
    let p = document.createElement('p');
    p.innerText = people.authors.join(' ');
    let a = document.createElement('a');
    a.classList = 'showBtn';
    a.innerText = `Show Characters(${people.characters.length})`;

    a.addEventListener('click', () => {
      main.style.position = 'fixed';
      main.style.right = '14.5%';
      main.style.width = '70.5%';
      main.style.zindex = '2';
      popup.style.display = 'block';
      popup.style.zindex = '100';
      charactersUI(people.characters);
    });
    li.append(h2, p, a);
    gotPeople.append(li);
  });
}

function init() {
  loader.style.display = 'block';
  loader.style.display = 'flex';
  fetch('https://www.anapioficeandfire.com/api/books')
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`response is not ok ${res.status}`);
      }
    })
    .then((e) => createUI(e))
    .catch((err) => (error.innerText = err))
    .finally(() => (loader.style.display = 'none'));
}

if (navigator.onLine) {
  init();
} else {
  error.innerText = 'Check Your Internet Connections';
}

})()