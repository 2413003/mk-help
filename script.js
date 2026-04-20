const body = document.body;
const workspaceCanvas = document.getElementById("workspaceCanvas");
const homeGreeting = document.getElementById("homeGreeting");
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
const topLoginAction = document.getElementById("topLoginAction");
const topAccountPill = document.getElementById("topAccountPill");
const topAccountName = document.getElementById("topAccountName");
const sidebarLoginAction = document.getElementById("sidebarLoginAction");
const sidebarSessionCard = document.getElementById("sidebarSessionCard");
const sidebarSessionName = document.getElementById("sidebarSessionName");
const sidebarSessionEmail = document.getElementById("sidebarSessionEmail");
const sidebarLogoutAction = document.getElementById("sidebarLogoutAction");
const modePills = [...document.querySelectorAll(".mode-pill")];
const serviceLinks = [...document.querySelectorAll(".service-link")];
const shortcuts = [...document.querySelectorAll(".shortcut, .recent-item")];
const quickModeButtons = [...document.querySelectorAll("[data-quick-mode]")];
const authOverlay = document.getElementById("authOverlay");
const authBackdrop = document.getElementById("authBackdrop");
const closeAuthButton = document.getElementById("closeAuth");
const authForm = document.getElementById("authForm");
const authNameField = document.getElementById("authNameField");
const authName = document.getElementById("authName");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authError = document.getElementById("authError");
const authTitle = document.getElementById("authTitle");
const authHint = document.getElementById("authHint");
const authSubmit = document.getElementById("authSubmit");
const authTabs = [...document.querySelectorAll(".auth-tab")];

const STORAGE_KEYS = {
  users: "mk-help-users",
  session: "mk-help-session",
  sidebarCollapsed: "mk-help-sidebar-collapsed",
};

const SIDEBAR_BREAKPOINT = 1080;

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
let authMode = "login";
let replyTimer = null;
let pendingDraft = null;
let session = loadSession();
let isSidebarCollapsed = readStorage(STORAGE_KEYS.sidebarCollapsed, false);

const quickModeSeeds = {
  call: "I would like a call.",
  meet: "I would like to meet in Milton Keynes.",
};

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function loadUsers() {
  return readStorage(STORAGE_KEYS.users, []);
}

function saveUsers(users) {
  writeStorage(STORAGE_KEYS.users, users);
}

function loadSession() {
  return readStorage(STORAGE_KEYS.session, null);
}

function saveSession(nextSession) {
  session = nextSession;
  writeStorage(STORAGE_KEYS.session, nextSession);
}

function clearSession() {
  session = null;
  window.localStorage.removeItem(STORAGE_KEYS.session);
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function getDisplayName(user) {
  if (!user) {
    return "Member";
  }

  const name = user.name?.trim();
  if (name) {
    return name;
  }

  return user.email.split("@")[0];
}

function getFirstName(user) {
  const displayName = getDisplayName(user);
  return displayName.split(/\s+/)[0];
}

function getDayGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function updateHomeGreeting() {
  const greeting = getDayGreeting();
  homeGreeting.textContent = session ? `${greeting}, ${getFirstName(session)}` : greeting;
}

function setSidebar(open) {
  body.classList.toggle("sidebar-open", open);
}

function persistSidebarPreference() {
  writeStorage(STORAGE_KEYS.sidebarCollapsed, isSidebarCollapsed);
}

function applySidebarPreference() {
  if (window.innerWidth > SIDEBAR_BREAKPOINT) {
    body.classList.toggle("sidebar-collapsed", isSidebarCollapsed);
    body.classList.remove("sidebar-open");
    return;
  }

  body.classList.remove("sidebar-collapsed");
}

function setDesktopSidebarCollapsed(collapsed) {
  isSidebarCollapsed = collapsed;
  persistSidebarPreference();
  applySidebarPreference();
}

function toggleSidebar() {
  if (window.innerWidth > SIDEBAR_BREAKPOINT) {
    setDesktopSidebarCollapsed(!isSidebarCollapsed);
    return;
  }

  setSidebar(!body.classList.contains("sidebar-open"));
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

function setAuthError(message = "") {
  authError.textContent = message;
  authError.hidden = !message;
}

function resetAuthForm() {
  authForm.reset();
  setAuthError();
}

function setAuthMode(mode, hintOverride = "") {
  authMode = mode;

  authTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authMode === mode);
  });

  authNameField.hidden = mode !== "signup";
  authName.required = mode === "signup";
  authPassword.autocomplete = mode === "signup" ? "new-password" : "current-password";
  authTitle.textContent = mode === "signup" ? "Sign up" : "Log in";
  authSubmit.textContent = mode === "signup" ? "Create account" : "Log in";
  authHint.textContent =
    hintOverride ||
    (mode === "signup" ? "Create a local account for this browser." : "Use the same browser next time.");
  setAuthError();
}

function openAuth(mode = "login", hint = "") {
  setAuthMode(mode, hint);
  authOverlay.hidden = false;
  body.classList.add("auth-open");

  window.setTimeout(() => {
    if (authMode === "signup") {
      authName.focus();
    } else {
      authEmail.focus();
    }
  }, 0);
}

function closeAuth() {
  authOverlay.hidden = true;
  body.classList.remove("auth-open");
  setAuthError();
}

function updateAuthUI() {
  const isAuthed = Boolean(session);

  topLoginAction.hidden = isAuthed;
  topAccountPill.hidden = !isAuthed;
  sidebarLoginAction.hidden = isAuthed;
  sidebarSessionCard.hidden = !isAuthed;
  updateHomeGreeting();

  if (!isAuthed) {
    return;
  }

  const displayName = getDisplayName(session);
  topAccountName.textContent = displayName;
  sidebarSessionName.textContent = displayName;
  sidebarSessionEmail.textContent = session.email;
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
  workspaceCanvas.classList.add("is-home");
  workspaceCanvas.classList.remove("is-chat");
  setMode("chat");
  messageInput.value = "";
  autoResizeTextarea();
  messageInput.focus();
}

function queueDraft(message, mode) {
  pendingDraft = {
    message,
    mode,
  };
}

function consumeDraft() {
  if (!pendingDraft) {
    return;
  }

  const queued = { ...pendingDraft };
  pendingDraft = null;
  setMode(queued.mode);
  submitMessage(queued.message, true);
}

function requireAuth(message = "", mode = activeMode, preferredMode = "login", hint = "") {
  if (session) {
    return true;
  }

  if (message) {
    queueDraft(message, mode);
    messageInput.value = message;
    autoResizeTextarea();
  }

  openAuth(preferredMode, hint || "Log in or sign up to continue.");
  return false;
}

function submitMessage(rawMessage, skipAuth = false) {
  const message = rawMessage.trim();

  if (!message) {
    return;
  }

  if (!skipAuth && !requireAuth(message, activeMode, "signup", "Log in or sign up to send this.")) {
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

async function hashPassword(password) {
  if (!window.crypto?.subtle) {
    return window.btoa(unescape(encodeURIComponent(password)));
  }

  const payload = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", payload);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  setAuthError();

  const email = normalizeEmail(authEmail.value);
  const password = authPassword.value.trim();

  if (!email || !password) {
    setAuthError("Enter your email and password.");
    return;
  }

  const users = loadUsers();
  const passwordHash = await hashPassword(password);

  if (authMode === "signup") {
    const name = authName.value.trim();

    if (name.length < 2) {
      setAuthError("Enter your name.");
      return;
    }

    if (users.some((user) => user.email === email)) {
      setAuthError("That email already exists. Try logging in.");
      return;
    }

    const user = {
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    saveUsers(users);
    saveSession({ name: user.name, email: user.email });
  } else {
    const existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
      setAuthError("No account found for that email.");
      return;
    }

    if (existingUser.passwordHash !== passwordHash) {
      setAuthError("Wrong password.");
      return;
    }

    saveSession({ name: existingUser.name, email: existingUser.email });
  }

  updateAuthUI();
  closeAuth();
  resetAuthForm();
  consumeDraft();

  if (!pendingDraft) {
    messageInput.focus();
  }
}

function logout() {
  clearSession();
  updateAuthUI();
  closeAuth();
}

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  submitMessage(messageInput.value);
});

authForm.addEventListener("submit", handleAuthSubmit);

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setAuthMode(tab.dataset.authMode);
  });
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
    const seed = quickModeSeeds[mode];

    window.clearTimeout(replyTimer);
    clearTyping();
    setMode(mode);
    conversation.innerHTML = "";
    submitMessage(seed);
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
  if (!requireAuth("", activeMode, "signup", "Sign up to start.")) {
    return;
  }

  messageInput.focus();
});

topLoginAction.addEventListener("click", () => {
  openAuth("login", "Use the same browser next time.");
});

sidebarLoginAction.addEventListener("click", () => {
  openAuth("login", "Use the same browser next time.");
});

sidebarLogoutAction.addEventListener("click", logout);
authBackdrop.addEventListener("click", closeAuth);
closeAuthButton.addEventListener("click", closeAuth);
topAccountPill.addEventListener("click", () => {
  messageInput.focus();
});

openSidebarButton.addEventListener("click", toggleSidebar);
closeSidebarButton.addEventListener("click", () => {
  if (window.innerWidth > SIDEBAR_BREAKPOINT) {
    setDesktopSidebarCollapsed(true);
    return;
  }

  setSidebar(false);
});
sidebarBackdrop.addEventListener("click", () => setSidebar(false));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAuth();
    setSidebar(false);
  }
});

window.addEventListener("resize", () => {
  applySidebarPreference();
});

updateAuthUI();
updateHomeGreeting();
autoResizeTextarea();
applySidebarPreference();
resetChat();
