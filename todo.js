const $toDoForm = document.getElementById("todo-form");
const $toDoInput = $toDoForm.querySelector("input"); // $toDo-Form에서 이미 todo-from을 선택했기 때문에 $todo-Form안에서 input element를 querySelector를 사용하여 선택하면 된다.
// const $toDoInput = document.querySelector("#todo-form input"); document에서 선택할 땐 이렇게 사용할 수 있다.
const $toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = []; // newTodo가 그려질 때마다 새로고침하면 값이 삭제되기 때문에 todo-list 값을 localstorage에 저장하기 위해 배열을 생성 / localStorage에 array를 저장할 수 없음 / application이 시작될 때마다 항상 toDos array는 비어있다. 그래서 localStorage가 새로운 입력값이 그 이전 입력값을 덮게 된다. 그래서 application이 시작될 때마다 업데이트가 가능하도록 let을 사용한다.

function saveToDos() {
  // localStorage에 toDos배열 값을 저장
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // JSON.stringify를 사용하여 단순 text가 아닌 String으로 저장
}

function deleteToDo(event) {
  // 우리가 어떤 버튼을 클릭했는지 모르기 때문에 클릭한 버튼이 어떤 버튼인지 찾기 위한 event를 실행시킨다.
  const $li = event.target.parentElement; // 삭제하고 싶은 li를 변수 li에 저장
  //event.target을 사용하면 button의 parentElement에 대한 값을 알 수 있다. target은 클릭된 HTML element이다.parentElement는 클릭된 element의 부모다.
  toDos = toDos.filter((toDo) => toDo.id !== parseInt($li.id)); // toDos의 각 배열의 id와 클릭 시의 id가 같지 않다. 즉 true 값으로 설정하여 삭제버튼 클릭 시의 li.id를 false값으로 받도록 하고 li.id만 제외하고 나머지 값들은 남겨둔다. li.id는 Document에서의 값이기 때문에 string 타입이고 toDo.id는 Date.now의 값이기 때문에 number 타입이라 무조건 true로 나와서 클릭한 li.id를 제외시키지 못한다. 그래서 같은 타입으로 만들어줘야 한다.
  $li.remove(); // 클릭한 button의 li를 제거
  saveToDos(); // toDos DB에서 todo를 지운 뒤에 saveToDos를 한 번 더 불러 localStorage에 filter를 이용해 새로 만든 array를 저장 => 새로고침해도 그대로 localStorage에 남아있기 때문에 제외시킨 li.id는 더 이상 나타나지 않는다.
}

function paintToDo(newTodo) {
  const $li = document.createElement("li"); // HTML에 element 요소인 li를 생성한 값을 li 변수에 저장한다. 아직 HTML에 삽입X 저장만O
  $li.id = newTodo.id; // HTML li에 id값 저장한다. => HTML에서의 모습은 <li id="newTodo의 id값">
  const $span = document.createElement("span"); // HTML에 element 요소인 li를 생성한 값을 li 변수에 저장한다. 아직 HTML에 삽입X 저장만O
  $span.innerText = newTodo.text; // argument에 obj를 받기 때문에 text를 받기 위해 newTodo.text를 사용한다 => HTML에서의 모습은 <li><span>newTodo(입력값)<span><li>
  const $button = document.createElement("button"); // HTML에 element 요소인 button을 생성한 값을 li 변수에 저장한다. 아직 HTML에 삽입X 저장만O
  $button.innerText = "❌";
  $button.addEventListener("click", deleteToDo); // button을 클릭했다는 정보를 얻기 위해 click event를 생성
  $li.appendChild($span); // HTML의 li(부모) 노드에서 제일 끝부분에 span element를 삽입한다. HTML에서의 모습은 li > span
  $li.appendChild($button); // HTML의 li(부모) 노드에서 제일 끝부분에 button element를 삽입한다. HTML에서의 모습은 li > span - button
  $toDoList.appendChild($li); // HTML의 ul(부모) 노드에서 제일 끝부분에 li element를 삽입한다. HTML에서의 모습은 ul > li > span
}

function handleToDoSubmit(event) {
  event.preventDefault(); // submit 기본동작인 새로고침 기능 막기
  const newTodo = $toDoInput.value; // newTodo 변수에 input 입력값(value) 저장
  $toDoInput.value = ""; // input 입력값에 빈값 넣기 => 입력값에 빈값을 넣는다고 해서 newTodo의 저장된 값이 비워지는 것은 아님 그냥 시각적으로 입력값이 비어 보이게 만드는 것이다.
  const newTodoObj = {
    // 단순히 txet만 갖는 것이 아닌 랜덤한 id도 갖는 object를 주기 위해 생성
    text: newTodo,
    id: Date.now(), // Date.now = 현재시간 1000분에 1초
  };
  toDos.push(newTodoObj); // toDos array에 newTodoObj 값을 추가(push)
  paintToDo(newTodoObj); // 화면에 toDo 그리기 => 입력값을 보여주기 위해 paintToDo를 호출하여 argument도 입력값을 저장한 변수명과 똑같이 newTodo를 주고 paintToDo function을 사용한다. But id도 함께 주기 위해 argument에 newTodo 대신 newTodo의 text를 저장하고 id값도 부여한 newTodoObj를 준다.
  saveToDos(); // saveToDos function 실행
}

$toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
// text를 단순 string으로 저장한 todos값을 localStorage에서 가져와 savedToDos에 저장

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  // 만약 localStorage에 toDos배열 값이 저장되어 있으면 localStorage의 TODOS_KEY에 저장된 text를 단순 string으로 저장한 todos값을 parse를 사용하여 array로 변경한 뒤 paserToDos변수에 저장
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
  // forEach 함수는 painToDo를 parsedToDos 배열의 요소마다 실행한다.
  // 만약 parsedToDos = [ "a", "b", "c", "d", "e" ]; 값이라면 parsedToDos.forEach(paintToDo); 사용 시
  // => patinToDo("a") / patinToDo("b") / patinToDo("c") / patinToDo("d") / patinToDo("e")처럼 배열순서대로
  // 배열의 처음부터 마지막 요소까지 실행하는 function 반복 시마다 argument에 넣어주고 실행한다.
}
// function sayHello(item) { // JavaScript는 지금 처리되고 있는 item 또한 그냥 제공해준다.
//   console.log("this is the turn of", item);
//   // 배열["a", "b", "c"]값을 JavaScript는 sayHello("a"), sayHello("b"), sayHello("c")를 해준다.
// }
// console.log(parsedToDos); // 주석 풀면 forEach와 item에 대해 이해가 쉽다.
// parsedToDos.forEach(sayHello); // forEach는 array의 각 item에 대해 function을 실행하게 해준다.
// // parsedToDos가 가지고 있는 각각의 item에 대해 sayHello function을 실행해준다.
// // 하지만 이건 이 array의 item들에 대해 한 개의 function만 실행할 수 있게 해준다.
// // 지금 내가 어떤 item을 사용하고 있는지 모른다면 완전 무용지물이다.
