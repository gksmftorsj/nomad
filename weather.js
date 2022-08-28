const API_KEY = "e29f134c86e1f37fd3050673fddfbe05";

function onGeoSuccess(position) {
  // js가 user의 위치를 전달해 준다. 위도(latitude)와 경도(longitude) 확인 가능하다.
  const lat = position.coords.latitude; // 현재 위치 위도 저장
  const lon = position.coords.longitude; // 현재 위치 경도 저장
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
  // 현재값 url를 저장하기 위해 ``으로 변수 lat, lon, API_KEY를 사용한다.
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const $city = document.querySelector("#weather span:first-child");
      const $weather = document.querySelector("#weather span:last-child");
      $city.innerText = data.name;
      $weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
  //fetch는 promise고 promise는 당장 뭔가 일어나지 않고 시간이 좀 걸린 뒤에 일어난다. 예를 들어 서버가 응답하는 데 5분이 걸린다고 하면 서버의 응답을 기다려야 한다. 그래서 then을 사용해야 한다. url을 fetch하고 그 다음으로 response를 받아야 한다. 그리고 response의 json을 얻어야 한다. response의 json은 네트워크 미리보기에 있는 전부이다. 그리고 내용을 추출했으면 data를 얻을 것이고 그 data에서 name이나 weather이나 temp 등 필요한 정보를 선택해 사용하면 된다.
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError); // 위치를 얻는 데 성공했다면 onGeoSuccess를 실패했다면 onGeoError를 실행한다.
