//날짜표시
date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;
day = date.getDate();
document.getElementById("current_date").innerHTML = year + " / " + month + " / " + day ;

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
//id가 todo-form인 form 안에 있는 input
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos"
let toDos = []; //let으로 업데이트 가능하도록 함


function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
//사용자가 form을 submit하면, input을 비우고 그 텍스트(newToDo)를 toDos array에 push하고
//화면에 toDo를 그려주고 handToDoSubmit에서 saveToDos를 하면 됨.(toDo들 저장)

function deleteToDo (event) {
    const li = event.target.parentElement;
    //target은 클릭된 html요소, parentElement는 클릭된 요소의 부모
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
} 





function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const input = document.createElement("span");
    input.innerText = newTodo.text;
    input.id = "newTodo_text";
    const button = document.createElement("button");
    button.innerText = "X";
    button.id = "newTodo_delete";
    button.addEventListener("click", deleteToDo);
    li.appendChild(input); //li는 span이라는 자식을 갖게 됨
    li.appendChild(button);
    toDoList.appendChild(li);

    //모두삭제
    const span = document.getElementById("delete_all");
    span.addEventListener("click", deleteAllToDo);
    toDoList.appendChild(span);
    
}


function deleteAllToDo (event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
} 


function handleToDoSubmit (event) {
    event.preventDefault();
    const newTodo = toDoInput.value; //여기서 input의 value를 새로운 변수(newToDo)에 복사하는 것
    //변수 newToDo는 inputdml value를 비우기 전의 값을 나타내는 string. 그 다음 입력값을 piantToDo에 넣어서 호출
    toDoInput.value = ""; //toDoInput을 비웠다고 newTodo가 비워지는 것은 아님
    const newTodoObj = {
        text: newTodo,
        id: Date.now(), //각각의 li item 구별 
    };
    toDos.push(newTodoObj); //toDos array를 가지고 와서 newToDo를 push. 이걸 local storages에 저장해야하는데 
    //여기는 array로 저장 못함 오직 text만.
    paintToDo(newTodoObj); //paintToDo에게 newToDo를 보냄
    saveToDos(); //toDos array를 localStorage에 넣는 역할
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY );

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

