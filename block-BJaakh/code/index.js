let inputMain = document.querySelector('input');
let root = document.querySelector('ul');

let baseURL = 'https://basic-todo-api.vercel.app/api/todo';

//DELETE
function delet(event, id) {
  fetch(baseURL + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //   deleting li
  event.target.parentElement.remove();
}

// handledelete
function handleDelete(event, todos) {
  let value = event.target.parentElement.children[1].innerText;

  let filterArr = todos.filter((elm) => {
    return elm.title.includes(value);
  });

  delet(event, filterArr[0]._id);
}

//PUT
function put(check, id) {
  console.log(check.checked);
  let data = {
    todo: {
      isCompleted: `${check.checked}`,
    },
  };
  fetch(baseURL + `/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// handlecheck
function handleCheckBox(event, todos) {
  let box = event.target.parentElement.children[0];

  let value = event.target.parentElement.children[1].innerText;

  let filterArr = todos.filter((elm) => {
    return elm.title.includes(value);
  });
  put(box, filterArr[0]._id);
}

function handleDbl(event, info, todos) {
  let elm = event.target;
  let input = document.createElement('input');
  input.type = 'text';
  input.value = info;
  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      let value = event.target.innerText;
      let updated = e.target.value;

      let filterArr = todos.filter((elm) => {
        return elm.title.includes(value);
      });
      let data = {
        todo: {
          title: `${updated}`,
        },
      };
      fetch(baseURL + `/${filterArr[0]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(`response is not ok ${res.status}`);
          }
        })
        .then((todoList) => displayUI(todoList.todos))
        .catch((error) => {
          root.innerText = error;
          rootStyle();
        });
    }
  });
  let parent = event.target.parentElement;
  parent.replaceChild(input, elm);
}

// creat UI
function displayUI(todos) {
  root.innerHTML = '';
  todos.map((todo) => {
    // console.log(todo)
    let li = document.createElement('li');
    li.classList = 'li';
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.addEventListener('change', (event) =>
      handleCheckBox(event, todos)
    );
    let p = document.createElement('p');
    p.innerText = todo.title;
    p.addEventListener('dblclick', (event) =>
      handleDbl(event, todo.title, todos)
    );
    let small = document.createElement('small');
    small.innerText = '❌';
    small.style.cursor = 'pointer';
    small.addEventListener('click', (event) => handleDelete(event, todos));
    li.append(checkBox, p, small);
    root.append(li);
  });
}

//POST
function post(val) {
  let data = {
    todo: {
      title: val,
      isCompleted: false,
    },
  };

  fetch(baseURL, {
    method: 'POST', //* GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`response is not ok ${res.status}`);
      }
    })
    .then((todoList) => displayUI(todoList.todos))
    .catch((error) => {
      root.innerText = error;
      rootStyle();
    });
}

//handle input
function handleInput(event) {
  if (inputMain.value) {
    if (event.keyCode === 13) {
      post(inputMain.value);
      inputMain.value = '';
    }
  }
}

inputMain.addEventListener('keyup', handleInput);

function init() {
  fetch(baseURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`response is not ok ${res.status}`);
      }
    })
    .then((list) => displayUI(list.todos))
    .catch((error) => {
      root.innerText = error;
      rootStyle();
    });
}

if (navigator.onLine) {
  init();
} else {
  root.innerText = 'Check your internet connections';
  rootStyle();
}

function rootStyle() {
  root.style.color = 'red';
  root.style.fontWeight = '600';
  root.style.marginTop = '0.6rem';
}
