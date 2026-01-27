const box = document.getElementById("notifyBox");

let notifications = JSON.parse(localStorage.getItem("vay_notifications")) || [];

// Если пусто — приветственное уведомление
if (notifications.length === 0) {
  notifications.push({
    title: "Добро пожаловать 👋",
    text: "Вы подключены к системе уведомлений VAY",
    time: new Date().toLocaleString(),
    read: false
  });
  save();
}

function save() {
  localStorage.setItem("vay_notifications", JSON.stringify(notifications));
}

function render() {
  box.innerHTML = "";

  notifications.reverse().forEach((n, i) => {
    const div = document.createElement("div");
    div.className = "glass reveal notify-card" + (n.read ? "" : " new");

    div.innerHTML = `
      <h3>${n.title}</h3>
      <small>${n.time}</small>
      <p>${n.text}</p>
      ${n.read ? "" : "<button onclick='markRead("+i+")'>Прочитано</button>"}
    `;

    box.appendChild(div);
  });
}

function markRead(index) {
  notifications[index].read = true;
  save();
  render();
}

render();
