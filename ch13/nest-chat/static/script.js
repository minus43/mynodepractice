// socket.io 인스턴스 생성
const socket = io('http://localhost:3000/chat'); // 네임스페이스 추가
const nickname = prompt('닉네임을 입력해주세요'); // 닉네임 입력받기
const roomSocket = io('http://localhost:3000/room'); // 채팅방용 네임스페이스 생성
let currentRoom = ''; // 채팅방 초깃값

// [전송] 버튼 클릭 시 입력된 글을 message 이벤트로 보냄
function sendMessage() {
  if (currentRoom === '') {
    // 선택된 방이 없으면 에러
    alert('방을 선택해주세요');
    return;
  }
  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };
  const htmlMessage = data.message.replace(/(\r\n|\n|\r)/g, '<br />'); // 줄바꿈 변환
  $('#chat').append(`<div>나 : ${htmlMessage}</div>`); // 내가 보낸 메세지 바로 추가
  // socket.emit('message', { message, nickname }); // 메세지 보낼 때 닉네임 같이 전송
  roomSocket.emit('message', data); // RoomGateway로 메세지를 보내기
  $('#message').val(''); // 입력창 비우기
  return false;
}

// Enter 키를 눌렀을 때 sendMessage() 실행 + 줄바꿈
$('#message').on('keydown', function (event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // 줄바꿈 방지
    sendMessage();
  }
});

socket.on('connect', () => {
  // 서버 접속 확인을 위한 이벤트
  console.log('connected');
});

// 채팅방 내에서 대화를 나눌 때 사용하는 이벤트
roomSocket.on('message', (data) => {
  // 서버에서 message 이벤트 발생 시 처리
  const htmlMessage = data.message.replace(/(\r\n|\n|\r)/g, '<br />'); // 줄바꿈 변환
  console.log(htmlMessage);
  $('#chat').append(`<div>${htmlMessage}</div>`);
});

// 채팅방 생성 버튼 클릭 시 실행하는 함수
function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요');
  roomSocket.emit('createRoom', { room, nickname });
}

// notice 이벤트를 받아서 처리
socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

// 클라이언트 측에서 채팅방 추가하는 함수
roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty(); // 채팅방 갱신 시 일단 리스트를 비움
  data.forEach((room) => {
    // 루프를 돌면서 서버에서 준 데이터 추가
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`,
    );
  });
});

// 방에 들어갈 때 기존에 있던 방에서는 나가기
function joinRoom(room) {
  // 서버 측의 joinRoom 이벤트를 발생시킴
  roomSocket.emit('joinRoom', { room, nickname, toleaveRoom: currentRoom });
  $('#chat').html(''); // 채팅방 이동 시 기존 메세지 삭제
  currentRoom = room; // 현재 들어 있는 방의 값을 변경
}
