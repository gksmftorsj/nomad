const $loginForm = document.querySelector("#login-form");
const $loginInput = document.querySelector("#login-form input");
const $greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden"; // hidden class 생성
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  // js에 저장된 argument event 사용
  event.preventDefault(); // js에 저장된 매개값 event를 사용하여 submit 페이지 새로고침 기본 동작 막아주기
  $loginForm.classList.add(HIDDEN_CLASSNAME); // 저장 후 $loginForm의 classList에 hidden class 추가
  const username = $loginInput.value; // $loginInput.value(입력값)을 username 변수에 저장
  localStorage.setItem(USERNAME_KEY, username); // "username"은 저장될 값의 이름(key)이고 그 다음 username은 입력값을 저장한 변수임
  paintGreetings(username); // HTML #loginForm class 중에서 hidden class 제거해서 입력 받은 값 출력할 수 있도록 함
}

function paintGreetings(username) {
  // const username = localStorage.getItem(USERNAME_KEY);를 사용하면
  // localStorage에서 입력값 가져온 후 username에 저장하고 innerText에서 사용하면 따로 argument를 받을 필요 없음 그 대신 localStorage를 두 번 열어 봄
  // 매개값에 username을 넣어 사용하면 위 아래 둘다 다른 argument를 입력해야 하지만 localStorage를 한 번만 열어 봄 / 두 번 열어보든가 한 번 열어보든가 자기마음
  $greeting.innerText = `Hello ${username}`; // String + String 대신 `String ${변수값}` h1에 input에서 입력받은 값 저장
  $greeting.classList.remove(HIDDEN_CLASSNAME); // HTML #$greeting h1 class 중에서 hidden class 제거
}

const savedUsername = localStorage.getItem(USERNAME_KEY); // localStorage에서 입력값 불러와서 savedUsername에 저장

if (savedUsername === null) {
  // show the form
  $loginForm.classList.remove(HIDDEN_CLASSNAME); // localStorage에 저장된 값 없으면 HTML #loginForm class 중에서 hidden class 제거해서 입력 받을 수 있도록 함
  $loginForm.addEventListener("submit", onLoginSubmit);
} else {
  // show the greetings
  paintGreetings(savedUsername); // localStorage에 저장된 값 있으면 HTML #loginForm class 중에서 hidden class 제거해서 입력 받은 값 출력할 수 있도록 함
}
