const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const toggleThemeBtn = document.getElementById("toggleTheme");
const downloadBtn = document.getElementById("downloadPDF");
const emptyState = document.querySelector(".empty-state");

let chatHistory = [];
let isTyping = false;

// Theme Toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const icon = toggleThemeBtn.querySelector('i');
  if (document.body.classList.contains("dark-theme")) {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
});

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function parseMarkdown(text) {
    // A very basic markdown parser for code blocks and bold text.
    // For a real FAANG app, use a library like marked.js
    let html = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\n/g, '<br/>');
    return html;
}

function addMessage(content, sender) {
  if (emptyState) emptyState.style.display = "none";

  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}-msg`;

  const avatarDiv = document.createElement("div");
  avatarDiv.className = `avatar ${sender}-avatar`;
  avatarDiv.innerHTML = sender === "user" ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "bubble";
  
  msgDiv.appendChild(avatarDiv);
  msgDiv.appendChild(bubbleDiv);
  messages.appendChild(msgDiv);
  scrollToBottom();

  if (sender === "bot") {
    // Simple typing effect
    let i = 0;
    bubbleDiv.innerHTML = '';
    const parsedContent = parseMarkdown(content);
    
    // To keep it simple and clean, we'll just drop the HTML instantly for code blocks
    // instead of typing out HTML tags.
    bubbleDiv.innerHTML = parsedContent;
    scrollToBottom();
  } else {
    bubbleDiv.textContent = content;
  }
}

async function sendMessage() {
  if (isTyping) return;
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  input.value = "";
  isTyping = true;
  
  // Update chat history locally
  chatHistory.push({ "role": "USER", "message": msg });

  // Add temporary loading message with typing animation
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message bot-msg";
  loadingDiv.innerHTML = `
    <div class="avatar bot-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="bubble">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>
  `;
  if (emptyState) emptyState.style.display = "none";
  messages.appendChild(loadingDiv);
  scrollToBottom();

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, chat_history: chatHistory })
    });

    const data = await res.json();
    loadingDiv.remove();
    addMessage(data.response, "bot");
    
    chatHistory.push({ "role": "CHATBOT", "message": data.response });
  } catch (err) {
    loadingDiv.remove();
    addMessage("⚠️ Error communicating with the server.", "bot");
  } finally {
    isTyping = false;
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Voice Input Mock
voiceBtn.addEventListener("click", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    
    const originalIcon = voiceBtn.innerHTML;
    voiceBtn.innerHTML = '<i class="fa-solid fa-microphone-lines" style="color: red;"></i>';
    
    recognition.onresult = (event) => {
      input.value = event.results[0][0].transcript;
      voiceBtn.innerHTML = originalIcon;
    };
    recognition.onerror = () => {
      voiceBtn.innerHTML = originalIcon;
    };
    recognition.onend = () => {
      voiceBtn.innerHTML = originalIcon;
    };
  } else {
    alert("Speech recognition is not supported in your browser.");
  }
});

// PDF Download
downloadBtn.addEventListener("click", () => {
  if (window.jspdf) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    document.querySelectorAll(".message").forEach(msg => {
      const isUser = msg.classList.contains('user-msg');
      const text = msg.querySelector('.bubble').innerText;
      const prefix = isUser ? "User: " : "IntelliBot: ";
      
      const lines = doc.splitTextToSize(prefix + text, 180);
      doc.text(lines, 10, y);
      y += (lines.length * 7) + 5;
      
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save("intellibot-chat.pdf");
  }
});
