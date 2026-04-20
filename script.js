const body = document.body;
const workspaceCanvas = document.getElementById("workspaceCanvas");
const sidebar = document.getElementById("sidebar");
const openSidebarButton = document.getElementById("openSidebar");
const closeSidebarButton = document.getElementById("closeSidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const composer = document.getElementById("composer");
const messageInput = document.getElementById("messageInput");
const conversation = document.getElementById("conversation");
const threadTitle = document.getElementById("threadTitle");
const newChatButton = document.getElementById("newChat");
const searchAction = document.getElementById("searchAction");
const brandHome = document.getElementById("brandHome");
const startAction = document.getElementById("startAction");
const modePills = [...document.querySelectorAll(".mode-pill")];
const serviceLinks = [...document.querySelectorAll(".service-link")];
const shortcuts = [...document.querySelectorAll(".shortcut, .recent-item")];
const quickModeButtons = [...document.querySelectorAll("[data-quick-mode]")];

const helpers = {
  chat: {
    title: "Human help",
    opener:
      "A person will pick this up. Start anywhere, and we will work through it with you.",
  },
  call: {
    title: "Call request",
    opener: "A person can call. Share what time works best and what the problem is.",
  },
  meet: {
    title: "Meet in MK",
    opener:
      "We can meet in Milton Keynes if that is easier. Say what day and area suit you.",
  },
};

let activeMode = "chat";
let replyTimer = null;
const quickModeSeeds = {
  call: "I would like a call.",
  meet: "I would like to meet in Milton Keynes.",
};

function setSidebar(open) {
  body.classList.toggle("sidebar-open", open);
}

function setMode(mode) {
  activeMode = mode;

  modePills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.mode === mode);
  });

  serviceLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.mode === mode);
  });
}

function autoResizeTextarea() {
  messageInput.style.height = "auto";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 180)}px`;
}

function createMessage(role, label, text, actions = []) {
  const wrapper = document.createElement("article");
  wrapper.className = "message";
  wrapper.dataset.role = role;

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = label;

  const body = document.createElement("div");
  body.className = "message-body";
  body.textContent = text;

  wrapper.append(meta, body);

  if (actions.length > 0) {
    const actionRow = document.createElement("div");
    actionRow.className = "message-actions";

    actions.forEach((action) => {
      const button = document.createElement("button");
      button.className = "reply-chip";
      button.type = "button";
      button.textContent = action.label;
      button.dataset.mode = action.mode;
      button.addEventListener("click", () => {
        setMode(action.mode);
        messageInput.value = action.seed;
        autoResizeTextarea();
        messageInput.focus();
      });
      actionRow.appendChild(button);
    });

    wrapper.appendChild(actionRow);
  }

  conversation.appendChild(wrapper);
  wrapper.scrollIntoView({ block: "end", behavior: "smooth" });
}

function createTypingRow() {
  const wrapper = document.createElement("article");
  wrapper.className = "message";
  wrapper.dataset.role = "helper";
  wrapper.dataset.typing = "true";

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = "mk help";

  const body = document.createElement("div");
  body.className = "message-body";

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.innerHTML = "<span></span><span></span><span></span>";

  body.appendChild(typing);
  wrapper.append(meta, body);
  conversation.appendChild(wrapper);
  wrapper.scrollIntoView({ block: "end", behavior: "smooth" });
  return wrapper;
}

function inferReply(message, mode) {
  const lower = message.toLowerCase();

  if (mode === "call") {
    return {
      text: "A person can take this by phone. Send a time window, and we can line it up.",
      actions: [
        { label: "Stay in chat", mode: "chat", seed: "Actually, let us keep this in chat first." },
        { label: "Meet in MK", mode: "meet", seed: "Could we meet in Milton Keynes instead?" },
      ],
    };
  }

  if (mode === "meet") {
    return {
      text: "In-person works too. Share the day, rough area, and what you want help with.",
      actions: [
        { label: "Request call", mode: "call", seed: "A call might be easier first." },
        { label: "Keep chatting", mode: "chat", seed: "I want to keep this in chat for now." },
      ],
    };
  }

  if (lower.includes("job") || lower.includes("cv") || lower.includes("work")) {
    return {
      text: "We can help with the wording, next steps, or the full reply. Paste what you have.",
      actions: [
        { label: "Draft reply", mode: "chat", seed: "Here is the message I need help writing:" },
        { label: "Book call", mode: "call", seed: "Can someone call me about work help?" },
      ],
    };
  }

  if (
    lower.includes("housing") ||
    lower.includes("benefit") ||
    lower.includes("form") ||
    lower.includes("council")
  ) {
    return {
      text: "We can go through it step by step. Send the form, question, or the part that is stuck.",
      actions: [
        { label: "Send details", mode: "chat", seed: "Here is the exact part I am stuck on:" },
        { label: "Meet in MK", mode: "meet", seed: "Could someone meet me in Milton Keynes about this form?" },
      ],
    };
  }

  if (
    lower.includes("phone") ||
    lower.includes("laptop") ||
    lower.includes("computer") ||
    lower.includes("tech") ||
    lower.includes("website")
  ) {
    return {
      text: "Start with what is happening and what you have tried. We can troubleshoot here first.",
      actions: [
        { label: "Describe issue", mode: "chat", seed: "The problem is:" },
        { label: "Request call", mode: "call", seed: "A call would help for this tech problem." },
      ],
    };
  }

  if (lower.includes("talk") || lower.includes("stressed") || lower.includes("overwhelmed")) {
    return {
      text: "You do not need to have it fully worked out. Say the main thing first, and we will slow it down.",
      actions: [
        { label: "Keep talking", mode: "chat", seed: "The main thing is:" },
        { label: "Request call", mode: "call", seed: "Could someone call me today?" },
      ],
    };
  }

  return {
    text: "A person will help with this. Start with the main problem, and we can take it one step at a time.",
    actions: [
      { label: "Request call", mode: "call", seed: "Can someone call me about this?" },
      { label: "Meet in MK", mode: "meet", seed: "Could we meet in Milton Keynes for this?" },
    ],
  };
}

function setThread(mode, initialMessage = "") {
  body.classList.add("has-thread");
  workspaceCanvas.classList.remove("is-home");
  workspaceCanvas.classList.add("is-chat");
  threadTitle.textContent = helpers[mode].title;

  if (conversation.children.length === 0) {
    createMessage("helper", "mk help", helpers[mode].opener);
  }

  if (initialMessage) {
    createMessage("user", "you", initialMessage);
  }
}

function clearTyping() {
  const typingRow = conversation.querySelector("[data-typing='true']");
  if (typingRow) {
    typingRow.remove();
  }
}

function resetChat() {
  window.clearTimeout(replyTimer);
  clearTyping();
  conversation.innerHTML = "";
  body.classList.remove("has-thread");
  workspaceCanvas.classList.add("is-home");
  workspaceCanvas.classList.remove("is-chat");
  setMode("chat");
  messageInput.value = "";
  autoResizeTextarea();
  messageInput.focus();
}

function submitMessage(rawMessage) {
  const message = rawMessage.trim();

  if (!message) {
    return;
  }

  setThread(activeMode, message);
  messageInput.value = "";
  autoResizeTextarea();

  window.clearTimeout(replyTimer);
  clearTyping();
  const typingRow = createTypingRow();
  const response = inferReply(message, activeMode);

  replyTimer = window.setTimeout(() => {
    typingRow.remove();
    createMessage("helper", "mk help", response.text, response.actions);
  }, 900);
}

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  submitMessage(messageInput.value);
});

messageInput.addEventListener("input", autoResizeTextarea);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submitMessage(messageInput.value);
  }
});

modePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    setMode(pill.dataset.mode);
  });
});

serviceLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMode(link.dataset.mode);
    if (workspaceCanvas.classList.contains("is-chat")) {
      threadTitle.textContent = helpers[link.dataset.mode].title;
    }
    messageInput.focus();
  });
});

shortcuts.forEach((button) => {
  button.addEventListener("click", () => {
    setMode("chat");
    submitMessage(button.dataset.seed || "");
    setSidebar(false);
  });
});

quickModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.quickMode;
    window.clearTimeout(replyTimer);
    clearTyping();
    setMode(mode);
    conversation.innerHTML = "";
    submitMessage(quickModeSeeds[mode]);
    setSidebar(false);
  });
});

newChatButton.addEventListener("click", () => {
  resetChat();
  setSidebar(false);
});
searchAction.addEventListener("click", () => {
  setSidebar(false);
  messageInput.focus();
});
brandHome.addEventListener("click", (event) => {
  event.preventDefault();
  resetChat();
});
startAction.addEventListener("click", () => {
  messageInput.focus();
});

openSidebarButton.addEventListener("click", () => setSidebar(true));
closeSidebarButton.addEventListener("click", () => setSidebar(false));
sidebarBackdrop.addEventListener("click", () => setSidebar(false));

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    setSidebar(false);
  }
});

autoResizeTextarea();
resetChat();
