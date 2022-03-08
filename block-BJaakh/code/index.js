(function(){
  let inputMain = document.querySelector('input');
let root = document.querySelector('ul');

let baseURL = 'https://basic-todo-api.vercel.app/api/todo';

//DELETE
function handleDelete(id) {
  fetch(baseURL + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      init();
    })
    .catch((error) => {
      root.innerText = error;
      rootStyle();
    });
}

// handlecheck
function handleCheckBox(id, status) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(baseURL + `/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      init();
    })
    .catch((error) => {
      root.innerText = error;
      rootStyle();
    });
}

// handleEdit
function handleEdit(event, id, info) {
  let elm = event.target;
  let input = document.createElement('input');
  input.type = 'text';
  input.value = info;
  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      let updated = e.target.value;
      let data = {
        todo: {
          title: updated,
        },
      };
      fetch(baseURL + `/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          init();
        })
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
  todos.forEach((todo) => {
    // console.log(todo)
    let li = document.createElement('li');
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = todo.isCompleted;
    checkBox.setAttribute('data-id', todo._id);
    checkBox.addEventListener('change', () =>
      handleCheckBox(todo._id, todo.isCompleted)
    );
    let p = document.createElement('p');
    p.innerText = todo.title;
    p.addEventListener('dblclick', (event) =>
      handleEdit(event, todo._id, todo.title)
    );
    let small = document.createElement('small');
    small.innerText = '❌';
    small.style.cursor = 'pointer';
    small.setAttribute('data-id', todo._id);
    small.addEventListener('click', () => handleDelete(todo._id));
    li.append(checkBox, p, small);
    root.append(li);
  });
}

//handle input
function handleInput(event) {
  if (inputMain.value) {
    if (event.keyCode === 13) {
      let data = {
        todo: {
          title: inputMain.value,
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
        .then(() => {
          inputMain.value = '';
          init();
        })
        .catch((error) => {
          root.innerText = error;
          rootStyle();
        });
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

})()