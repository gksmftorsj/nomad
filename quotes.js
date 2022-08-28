const quotes = [
  // 명언 모음집
  // array를 사용하여 quotes[0]값의 quote와 quotes[1]값의 quote는 다르기 때문에 변수 반복하여 사용 가능하다.
  {
    quote: "힘으로서 사람을 복종시키지 말고 덕으로서 사람을 복종시켜라",
    author: "맹자",
  },
  {
    quote:
      "오늘 할 수 있는 일에 전력을 다하라. 그러면 내일에는 한걸음 더 진보한다",
    author: "뉴턴",
  },
  {
    quote: "타인에 대한 존경은 처세법의 제일 조건이다",
    author: "아미엘",
  },
  {
    quote: "남자란, 말하며 접근할 때는 봄이지만 결혼해 버리면 겨울이다",
    author: "셰익스피어",
  },
  {
    quote: "1퍼센트의 가능성, 그것이 나의 길이다",
    author: "나폴레옹",
  },
  {
    quote: "용기가 없으면 어떤 것도 이룰 수 없다",
    author: "괴테",
  },
  {
    quote: "피할수 없으면 즐겨라",
    author: "로버트 엘리엇",
  },
  {
    quote: "세상은 고통으로 가득하지만 그것을 극복하는 사람들로도 가득하다",
    author: "헨렌켈러",
  },
  {
    quote: "겨울이 오면 봄이 멀지 않으리",
    author: "셸리",
  },
  {
    quote:
      "우리는 두려움의 홍수에 버티기 위해서 끊임없이 용기의 둑을 쌓아야 한다",
    author: "마틴 루터 킹",
  },
];

const $quote = document.querySelector("#quote span:first-child");
const $author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
// quotes.length를 사용하여 배열의 길이를 받아와서 랜덤한 숫자를 뽑고 floor=내림을 사용하여 정수로 만든 뒤에 todaysQuote에 quotes[랜덤숫자]를 저장한다.

$quote.innerText = todaysQuote.quote; // #quote의 text 안에 quotes[랜덤숫자]에서 quote를 가져와 값을 입력
$author.innerText = todaysQuote.author; // #quote의 text 안에 quotes[랜덤숫자]에서 author를 가져와 값을 입력
