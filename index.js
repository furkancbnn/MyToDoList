// ! selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoFilter = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");

// ? alerts
const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

// ! events
document.addEventListener("DOMContentLoaded", function () {
   getTodos();
});
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);

// ! functions
function addTodo(e) {
   e.preventDefault();

   // ! if-else
   const isEmpty = (str) => !str.trim().length;

   if (isEmpty(todoInput.value)) {
      alertWarning.style.display = "block";
      setTimeout(() => {
         alertWarning.style.display = "none";
      }, 1500);
   } else {
      alertSuccess.style.display = "block";
      setTimeout(() => {
         alertSuccess.style.display = "none";
      }, 1500);
   }

   saveLocalTodos(todoInput.value);

   // create todo div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");

   // check button
   const completedButton = document.createElement("button");
   completedButton.innerHTML = `<i class="fas fa-check-circle"></i>`;
   completedButton.classList.add("complete-btn");
   todoDiv.appendChild(completedButton);

   // li
   const newToDo = document.createElement("li");
   newToDo.innerText = todoInput.value;
   newToDo.classList.add("todo-item");
   todoDiv.appendChild(newToDo);

   // trash button
   const trashButton = document.createElement("button");
   trashButton.innerHTML = `<i class="fas fa-minus-circle"></i>`;
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);

   // append to list
   todoList.appendChild(todoDiv);

   // clear todo input value
   todoInput.value = "";
}

function deleteCheck(e) {
   const item = e.target;
   // delete todo
   if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener("transitionend", function () {
         todo.remove();
      });
   }

   if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
   }
}

function filterTodo(e) {
   const todos = todoList.childNodes;
   todos.forEach(function (item) {
      switch (e.target.value) {
         case "all":
            item.style.display = "flex";
            break;
         case "completed":
            if (item.classList.contains("completed")) {
               item.style.display = "flex";
            } else {
               item.style.display = "none";
            }
            break;
         case "uncompleted":
            if (item.classList.contains("completed")) {
               item.style.display = "none";
            }
            break;
      }
   });
}

// ! local storage
function saveLocalTodos(todo) {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.forEach((todo) => {
      // create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      // check button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check-circle"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      // li
      const newToDo = document.createElement("li");
      newToDo.innerText = todo;
      newToDo.classList.add("todo-item");
      todoDiv.appendChild(newToDo);

      // trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-minus-circle"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      // append to list
      todoList.appendChild(todoDiv);
   });
}

function removeLocalTodos(todo) {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   const todoIndex = todo.children[1].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}
