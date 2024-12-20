let knit, purl;
let input, button;
let instructions = ""; // 입력된 서술형 도안을 저장
let backgroundImage; // 배경 이미지 변수 추가

function preload() {
  // 기호 이미지 불러오기
  knit = loadImage('겉뜨기.png');
  purl = loadImage('안뜨기.png');
  
  // 배경 이미지 불러오기
  backgroundImage = loadImage('변환페이지 프레임.png');
}

function setup() {
  createCanvas(800, 600);
  
  // 배경 이미지 그리기
  image(backgroundImage, 0, 0, width, height);

  // 입력창 생성
  input = createInput();
  input.position(138,225);
  input.size(452,59);
  
  // 입력창을 투명하게 설정
  input.style('background', 'rgba(255, 255, 255, 0)'); // 완전히 투명
  input.style('border', 'none'); // 테두리 제거 (선택사항)
  input.style('color', 'black'); // 텍스트 색상 (가독성을 위해 검정으로 설정)

 // 버튼 생성
  button = createButton('');
  button.position(615, 227);
  button.size(76,60); // 버튼의 크기 (너비, 높이)
  
  // 버튼 스타일 (투명화 및 기타 스타일링)
  button.style('background', 'rgba(255, 255, 255, 0)'); // 완전히 투명
  button.style('border', '2px solid #D2C2AC'); // 테두리 설정 (선택사항)
  button.style('color', 'black'); // 버튼 텍스트 색상
  button.style('font-size', '16px'); // 버튼 텍스트 크기
  button.style('cursor', 'pointer'); // 마우스 호버 시 포인터 커서 설정
  
  button.mousePressed(onButtonClick); // 버튼 클릭 이벤트 등록
}


function onButtonClick() {
  // 입력창에서 서술형 도안을 가져오기
  instructions = input.value();
  processInstructions(instructions);
}

function processInstructions(instructions) {
  // 배경 이미지 다시 그리기 (화면 초기화 역할)
  image(backgroundImage, 0, 0, width, height);

  let rows = instructions.split('단'); // '단'으로 구분하여 각 단의 서술형 도안을 가져옴
  let startX = 435; // 기호 출력 시작 X 위치
  let y = 320; // 기호 출력 시작 Y 위치
  let direction = -1; // 좌우 방향 (-1: 오른쪽 → 왼쪽, 1: 왼쪽 → 오른쪽)

  for (let i = 1; i < rows.length; i++) {
    // 각 단의 내용 (예: "1단 : 겉뜨기 1, 안뜨기 1")
    let row = rows[i]?.split(':')[1]?.trim(); // 서술형 도안 내용만 가져옴
    if (!row) continue; // 내용이 없는 경우 건너뛰기

    let symbols = []; // 현재 줄의 기호 도안

    // 서술형 도안을 기호로 변환
    let matches = row.match(/(겉뜨기|안뜨기)\s*\d+/g); // '겉뜨기 숫자' 또는 '안뜨기 숫자' 추출
    if (matches) {
      for (let match of matches) {
        // 기호와 숫자 분리
        let [stitch, count] = match.split(/\s+/); // 공백으로 분리
        count = parseInt(count.trim(), 10); // 숫자로 변환

        // 짝수 단에서는 겉뜨기와 안뜨기를 뒤집음
        for (let j = 0; j < count; j++) {
          if (i % 2 === 0) {
            symbols.push(stitch === '겉뜨기' ? purl : knit); // 짝수 단: 겉 -> 안, 안 -> 겉
          } else {
            symbols.push(stitch === '겉뜨기' ? knit : purl); // 홀수 단: 그대로 사용
          }
        }
      }
    }

    // 단별로 출력 (방향에 따라 위치 조정)
    let x = startX; // 단 시작 X 위치
    for (let j = 0; j < symbols.length; j++) {
      image(symbols[j], x, y, 40, 40); // 기호 출력
      x += 40 * direction; // 방향에 따라 X 좌표 이동
    }

    // 다음 단의 Y 위치 및 방향 설정
    y += 50; // 위로 쌓기
    startX = direction === -1 ? x + 40 : x - 40; // 다음 단 시작 위치 조정
    direction *= -1; // 방향 전환
  }
}

function draw() {
  textSize(16);
  fill(0);
  text("", 10, 80);
}
