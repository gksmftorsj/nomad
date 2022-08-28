const images = ["0.jpg", "1.jpg", "2.jpg"];
// img 폴더 이미지들이랑 이름을 똑같이 쓴다는 것만 명심하자.

const chosenImage = images[Math.floor(Math.random() * images.length)];
// images.length를 사용하여 배열의 길이를 받아와서 랜덤한 숫자를 뽑고 floor=내림을 사용하여 정수로 만든 뒤에 chosenImage에 images[랜덤숫자]를 저장한다.

const $bgImage = document.createElement("img"); // HTML에 element인 img를 생성한 값을 bgImage 변수에 저장한다. 아직 HTML에 삽입X 저장만O

$bgImage.src = `img/${chosenImage}`;
// bgImage(img)의 src에 이미지의 주소를 저장한다. 그렇기 때문에 images 배열들의 이름과 이미지 이름이 동일해야 한다. 즉 HTML에서는 <img src="img/2.jpg"></img> 값이 입력된다.

document.body.appendChild($bgImage);
// HTML의 body(부모) 노드에서 제일 끝부분에 img에 src를 저장한 bgImage=<img src="img/2.jpg"></img> element를 삽입한다. html에서의 모습은 body > img
