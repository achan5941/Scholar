const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chat-container");

const API_KEY = "";
let userMessage;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "user" ? `<p>${message}</p>` : `<span>SC</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
}

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatBox.appendChild(createChatLi(userMessage, "user"));
  chatInput.value = '';

  setTimeout(() => {
    const incomingChatLI = createChatLi("Hmmm...", "bot")
    chatBox.appendChild(incomingChatLI);
    generateResponse(incomingChatLI);
  }, 600);
}

const generateResponse = (incomingChatLI) => {
  const messageElement = incomingChatLI.querySelector('p');
  
  fetch('http://localhost:8080/api/chat', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: userMessage }),
  })
  .then(res => res.json())
  .then(data => {
      messageElement.textContent = data.choices[0].message.content;
  }).catch((error) => {
      console.log(error);
      messageElement.textContent = "Something is wrong. Please try again";
  });
};

sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
})