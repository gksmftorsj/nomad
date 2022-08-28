const $clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date(); // 현재 날짜 및 시간을 date 변수에 저장
  // padStart는 string에 쓸 수 있는 function이기 때문에 String을 이용하여 Number값을 감싸주어 String 타입으로 변환시키고 사용한다. String의 길이는 두 글자고 한 글자일 경우 앞에 0을 붙인다.
  const hours = String(date.getHours()).padStart(2, "0"); // 각 시간, 분, 초에 현재 시간 저장
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  $clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock(); // 00:00:00을 보이지 않고 바로 호출하고 싶으면 getClock()을 사용하면 바로 호출된다.
setInterval(getClock, 1000); // setInterval function을 사용하여 실시간으로 getClock 함수를 1초마다 호출한다. 근데 시간은 1초마다 흐르니까 정상적으로 보인다. 만약 2000으로 한다면 2초마다 호출된다. 만약 setInterval을 사용하지 않으면 그냥 한 번만 시간을 보여주고 멈춘다. setInterval 사용함으로써 매초 반복하여 보여준다.
