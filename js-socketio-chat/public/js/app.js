// Init socket
const socket = io();

// Init UI
const ui = new UI();

// Init elements
const loginForm = document.forms['login-form'];
const userName = loginForm.elements['username'];
const messageForm = document.forms['send-message'];
const message = messageForm.elements['message'];
const roomList = document.querySelector('.rooms-list');

// Init local vars
let currentRoom;

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (userName.value) {
    const name = userName.value;
    socket.emit('new user', name);
  }
});

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (message.value) {
    socket.emit('message', message.value);
    message.value = '';
  }
});

roomList.addEventListener('click', function (e) {
  if (e.target.dataset.roomIndex) {
    let index = e.target.dataset.roomIndex;
    socket.emit('roomchange', index);
    // $(".side-nav").sidenav("close");
  }
});

// Socket events
socket.on('welcome', (room) => {
  console.log('welcome', room);
  currentRoom = room;
  ui.hideLogin();
  ui.showAuthorized();
});
socket.on('rooms', (rooms) => ui.generateRooms(rooms)); // get all rooms
// socket.on("updateusers", users => ui.generateUsersInRoom(users)); // get all users
socket.on('chat message', (message) => ui.addMessage(message));
socket.on('new user joined', (user) => ui.newUserJoin(user));
socket.on('roommates', ({ usernames }) => {
  let users = Object.keys(usernames)
    .filter((user) => (usernames[user].room = currentRoom)) // -> ['user1', 'user2', ...];
    .map((user) => {
      usernames[user].name = user;
      return usernames[user];
    }); // -> [{user1, {user2}, ...];

  ui.generateUsersInRoom(users);
});
socket.on('has left the room', (user) => ui.userLeft(user));
