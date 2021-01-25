const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
  //console.log(event.target.parentNode); -> 부모를 찾기 위해 (삭제된 파일의 원본)
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  //console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
  //console.log(text);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerHTML = "X";
  delBtn.addEventListener("click",deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: toDos.length + 1
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);
    //console.log(parsedToDos);
    parsedToDos.forEach(function(toDo){
      //console.log(toDo.text);
      paintToDo(toDo.text);
    });
  } 
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit",handleSubmit);
}

init();
