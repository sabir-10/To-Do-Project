const inputBox = document.getElementById('inputBox');
const addbtn = document.getElementById('addbtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

//Function to add new todos to list
const addTodo = () => {
   const inputText = inputBox.value.trim();
   if (inputText.length <= 0) {
      alert("ERROR - Write something");
      return false;
   }
   if (addbtn.value === "Edit") {
      editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
      editTodo.target.previousElementSibling.innerHTML = inputText;
      addbtn.value = "Add";
      inputBox.value = "";
   }
   else {
      //creating li and p using DOM
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = inputText;
      li.appendChild(p);

      //Edit Button
      const editbtn = document.createElement("button");
      editbtn.classList.add("btn", "edit");
      editbtn.innerText = "Edit";
      li.appendChild(editbtn);

      //Delete Button
      const delbtn = document.createElement("button");
      delbtn.classList.add("btn", "del");
      delbtn.innerText = "Delete Task";
      li.appendChild(delbtn);

      //Appending to todoList ul
      todoList.appendChild(li);
      inputBox.value = "";
   
   saveLocalTodos(inputText);
   }
}
//Function to update(delete/edit) todos
const updateTodo = (e) => {
   if (e.target.innerHTML === "Delete Task") {
      todoList.removeChild(e.target.parentElement);
      deleteLocalTodos(e.target.parentElement)
   }
   if (e.target.innerHTML === "Edit") {
      inputBox.value = e.target.previousElementSibling.innerHTML;
      inputBox.focus();
      addbtn.value = "Edit";
      editTodo = e;
   }
}
//Function to save to local storage
const saveLocalTodos = (todo) => {
   let todos = [];
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos))

}
//Function to display saved todos
const getLocalTodos = () => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach(todo => {

         const li = document.createElement("li");
         const p = document.createElement("p");
         p.innerHTML = todo;
         li.appendChild(p);
         todoList.appendChild(li);
         inputBox.value = "";

         //Edit Button
         const editbtn = document.createElement("button");
         editbtn.classList.add("btn", "edit");
         editbtn.innerText = "Edit";
         li.appendChild(editbtn);

         //Delete Button
         const delbtn = document.createElement("button");
         delbtn.classList.add("btn", "del");
         delbtn.innerText = "Delete Task";
         li.appendChild(delbtn);

         //Appending to todoList ul
         todoList.appendChild(li);
         inputBox.value = "";
      });
   }
}
//Function to delete local Storage todos
const deleteLocalTodos = (todo) => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   let todoText = todo.children[0].innerHTML;
   let todoIndex = todos.indexOf(todoText);
   todos.splice(todoIndex, 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocalTodos = (todo) => {
   let todos = JSON.parse(localStorage.getItem("todos"));
   let todoIndex = todos.indexOf(todo);
   todos[todoIndex] = inputBox.value;
   localStorage.setItem("todos", JSON.stringify(todos));
}
addbtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
document.addEventListener('DOMContentLoaded', getLocalTodos);
