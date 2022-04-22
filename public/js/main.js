const URL = "http://localhost:3000"
const ALL_TASK = URL + '/tasks';
const TASK = URL + '/task';
const STUDENTS = URL + '/students'
function addTask(e) {
  e.preventDefault();
  let task = taskTitle.value;
  let priority = taskPriority.value;
  let author = {first_name: firstName.value,last_name: lastName.value};
  // GET DATA FROM CHECKBOX
  let list_of_categories = [];
  for(let i=0;i<categories.length;i++){
    if(categories[i].checked){
      list_of_categories.push(categories[i].value)
    }
  }
  // TODO: request the server to create new task
  let link = URL + '/add_task';
  let body = {title:task, priority: priority, categories: list_of_categories, author: author, assignee: allStudents.value};
  axios.post(link, body).then((result)=>{
    displayTasks();
  });
}

function displayTasks() {
  if(todo.checked){
    // GET task that not completed
    axios.get(ALL_TASK+'/notcompleted/')
    .then((result)=>{
      createDomResult(result)
    })
  }else{
    // TODO: request tasks from server and update DOM
    axios.get(ALL_TASK)
    .then((result)=>{
      createDomResult(result)
    })
  }
}

function createDomResult(result){
  let datas = result.data;
  // To remove child from dom
  while(screenToDisplay.firstChild){
    screenToDisplay.removeChild(screenToDisplay.lastChild);
  }
  for (let data of datas){
    let task = document.createElement('div');
    task.id = data._id;
    task.classList = 'card mt-2 p-2 text-danger';
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p1.textContent = data.title;
    task.appendChild(p1);
    p2.textContent = 'Priority = ' + data.priority;
    task.appendChild(p2);
    if(data.completed==true){
      p1.classList = 'text-success';
      p2.classList = 'text-success';
    }
    let hr = document.createElement('hr');
    task.appendChild(hr);
    let delete_btn = document.createElement('a');
    delete_btn.href = '#';
    delete_btn.classList = 'delete';
    delete_btn.textContent = 'Delete';
    task.appendChild(delete_btn);
    if(data.completed==false){
      let update_btn = document.createElement('a');
      update_btn.href = '#';
      update_btn.classList = 'update';
      update_btn.textContent = 'Completed';
      task.appendChild(update_btn);
    }
    screenToDisplay.appendChild(task);
  }
}

function createListOfStudents(result){
  let students = result.data;
  for(let student of students){
    let option = document.createElement('option');
    option.value = student._id;
    option.textContent = student.name;
    allStudents.appendChild(option);
  }
}

function clickTask(e) {
  e.preventDefault();
  if (e.target.className === "delete") {
    let id = e.target.parentElement.id;
    let isExecuted = confirm("Are you sure to delete this task?");
    if (isExecuted) {
      // TODO: Request to the server to detele one task
      axios.delete(TASK+'/'+id)
      .then((result)=>{
        console.log('Deleted');
      })
    }
  } else if (e.target.className === "update") {
    // TODO: Request to the server to update one task as completed
    let id = e.target.parentElement.id;
    axios.put((TASK+'/edit/'+id), {completed: true})
    .then((result)=>{
      console.log('Send updated!'+id);
    })
  }
  displayTasks();
}

// GET STUDENT FROM SERVER
axios.get(STUDENTS).then((result)=>{
  createListOfStudents(result);
});


let screenToDisplay = document.querySelector(".result");
let categories = document.getElementsByName('categories');
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let taskTitle = document.querySelector("#task");
let taskPriority = document.querySelector("#priority");
let btnAddTask = document.querySelector("#addTask");
let todo = document.querySelector("#todo");
let allStudents = document.querySelector("#student");

btnAddTask.addEventListener("click", addTask);
screenToDisplay.addEventListener("click", clickTask);
todo.addEventListener("change", displayTasks);

displayTasks();

