const body = document.body;
const workspaceCanvas = document.getElementById("workspaceCanvas");
const homeGreeting = document.getElementById("homeGreeting");
const openSidebarButton = document.getElementById("openSidebar");
const closeSidebarButton = document.getElementById("closeSidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const composer = document.getElementById("composer");
const composerAttach = document.getElementById("composerAttach");
const composerFileInput = document.getElementById("composerFileInput");
const messageInput = document.getElementById("messageInput");
const attachmentStrip = document.getElementById("attachmentStrip");
const composerStatus = document.getElementById("composerStatus");
const conversation = document.getElementById("conversation");
const threadTitle = document.getElementById("threadTitle");
const recentList = document.getElementById("recentList");
const newChatButton = document.getElementById("newChat");
const searchAction = document.getElementById("searchAction");
const settingsAction = document.getElementById("settingsAction");
const brandHome = document.getElementById("brandHome");
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
const schedulerShell = document.getElementById("schedulerShell");
const schedulerLabel = document.getElementById("schedulerLabel");
const schedulerTitle = document.getElementById("schedulerTitle");
const schedulerSubtitle = document.getElementById("schedulerSubtitle");
const schedulerPlanBadge = document.getElementById("schedulerPlanBadge");
const schedulerTabs = [...document.querySelectorAll(".scheduler-tab")];
const schedulerTopicOptions = document.getElementById("schedulerTopicOptions");
const schedulerDurationOptions = document.getElementById("schedulerDurationOptions");
const schedulerDayOptions = document.getElementById("schedulerDayOptions");
const schedulerTimeOptions = document.getElementById("schedulerTimeOptions");
const schedulerFormatTitle = document.getElementById("schedulerFormatTitle");
const schedulerFormatHint = document.getElementById("schedulerFormatHint");
const schedulerFormatOptions = document.getElementById("schedulerFormatOptions");
const schedulerSummaryTitle = document.getElementById("schedulerSummaryTitle");
const schedulerSummaryIntro = document.getElementById("schedulerSummaryIntro");
const schedulerSummary = document.getElementById("schedulerSummary");
const schedulerPlanCopy = document.getElementById("schedulerPlanCopy");
const schedulerSubmit = document.getElementById("schedulerSubmit");
const schedulerStatus = document.getElementById("schedulerStatus");
const settingsShell = document.getElementById("settingsShell");
const currentPlanPill = document.getElementById("currentPlanPill");
const currentPlanCard = document.getElementById("currentPlanCard");
const usageGrid = document.getElementById("usageGrid");
const planGrid = document.getElementById("planGrid");
const manageBillingAction = document.getElementById("manageBillingAction");
const managePaymentAction = document.getElementById("managePaymentAction");
const invoiceList = document.getElementById("invoiceList");
const billingStatus = document.getElementById("billingStatus");
const requestList = document.getElementById("requestList");
const settingsAccountHint = document.getElementById("settingsAccountHint");
const settingsAccountCard = document.getElementById("settingsAccountCard");

const STORAGE_KEYS = {
  sidebarCollapsed: "mk-help-sidebar-collapsed",
};

const SIDEBAR_BREAKPOINT = 1080;

const helpers = {
  chat: {
    title: "Human help",
  },
  call: {
    title: "Call request",
  },
  meet: {
    title: "Meet in MK",
  },
};

const planDefinitions = {
  free: {
    name: "Free",
    price: "£0",
    blurb: "All core features. Limits still being tuned.",
    features: [
      "Chat, call, and meet access",
      "Standard routing",
      "Launch limits to be finalised",
    ],
    cta: "Current plan",
  },
  plus: {
    name: "Plus",
    price: "Soon",
    blurb: "Higher usage limits and faster routing.",
    features: [
      "More chats, calls, and meet requests",
      "Priority human routing",
      "Better availability windows",
    ],
    cta: "Upgrade",
  },
  pro: {
    name: "Pro",
    price: "Soon",
    blurb: "Highest limits for heavy use.",
    features: [
      "Highest request capacity",
      "Fastest routing",
      "Best scheduling flexibility",
    ],
    cta: "Upgrade",
  },
};

const scheduleDefinitions = {
  call: {
    label: "Call",
    title: "Choose a call slot",
    subtitle: "Pick from fixed options. A person confirms the request.",
    summaryTitle: "Call request",
    summaryIntro: "Free plan includes calls.",
    submitLabel: "Request call",
    successLabel: "Call request sent. We will confirm the slot in your account.",
    formatTitle: "Call type",
    formatHint: "Choose how it happens.",
    topics: ["Forms", "Work", "Tech", "Life"],
    durations: [15, 30, 45],
    formats: ["Phone", "WhatsApp", "Zoom"],
    times: {
      weekday: ["09:30", "11:00", "13:30", "15:30", "18:00"],
      saturday: ["10:00", "12:00", "14:00"],
      sunday: ["11:00", "13:00"],
    },
  },
  meet: {
    label: "Meet",
    title: "Choose a meetup slot",
    subtitle: "Structured like Calendly. Just pick from the available options.",
    summaryTitle: "Meetup request",
    summaryIntro: "Free plan includes meetups in Milton Keynes.",
    submitLabel: "Request meetup",
    successLabel: "Meetup request sent. We will confirm the slot in your account.",
    formatTitle: "Area",
    formatHint: "Pick the public Milton Keynes area.",
    topics: ["Forms", "Work", "Tech", "Life"],
    durations: [30, 45, 60],
    formats: ["Central Milton Keynes", "Bletchley", "Wolverton", "Stony Stratford"],
    times: {
      weekday: ["10:30", "12:30", "15:00", "17:30"],
      saturday: ["10:30", "12:30", "14:30"],
      sunday: ["11:30", "13:30"],
    },
  },
};

const appConfig = window.MK_HELP_CONFIG || {};
const SUPABASE_URL = (appConfig.supabaseUrl || "").trim();
const SUPABASE_ANON_KEY = (appConfig.supabaseAnonKey || "").trim();
const MESSAGE_FILES_BUCKET = (appConfig.messageFilesBucket || "mk-help-message-files").trim();
const BILLING_PORTAL_URL = (appConfig.billingPortalUrl || "").trim();
const DB = {
  profiles: "mk_help_profiles",
  subscriptions: "mk_help_subscriptions",
  conversations: "mk_help_conversations",
  messages: "mk_help_messages",
  bookingRequests: "mk_help_booking_requests",
};

function hasRealConfigValue(value) {
  return Boolean(value) && !/^YOUR_/i.test(value);
}

const hasBackend =
  Boolean(window.supabase?.createClient) &&
  hasRealConfigValue(SUPABASE_URL) &&
  hasRealConfigValue(SUPABASE_ANON_KEY);

const supabaseClient = hasBackend
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    })
  : null;

let activeMode = "chat";
let activeView = "home";
let authMode = "login";
let pendingDraft = null;
let pendingAttachments = [];
let isSidebarCollapsed = readStorage(STORAGE_KEYS.sidebarCollapsed, false);
let isSubmittingMessage = false;
let isBookingBusy = false;
let isAuthBusy = false;
let currentUser = null;
let currentProfile = null;
let currentSubscription = null;
let bookingRequests = [];
let conversations = [];
let activeConversationId = null;
let conversationsChannel = null;
let messagesChannel = null;
let pendingSchedulerSubmit = false;
let schedulerFeedback = { message: "", tone: "" };
let billingFeedback = { message: "", tone: "" };
let scheduleState = {
  call: null,
  meet: null,
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

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function persistSidebarPreference() {
  writeStorage(STORAGE_KEYS.sidebarCollapsed, isSidebarCollapsed);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getCurrentDisplayName() {
  const profileName = currentProfile?.full_name?.trim();
  if (profileName) {
    return profileName;
  }

  const metadataName =
    currentUser?.user_metadata?.full_name?.trim() ||
    currentUser?.user_metadata?.display_name?.trim() ||
    currentUser?.user_metadata?.name?.trim();

  if (metadataName) {
    return metadataName;
  }

  if (currentUser?.email) {
    return currentUser.email.split("@")[0];
  }

  return "Member";
}

function getCurrentFirstName() {
  const profileFirstName = currentProfile?.first_name?.trim();
  if (profileFirstName) {
    return profileFirstName;
  }

  return getCurrentDisplayName().split(/\s+/)[0];
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
  homeGreeting.textContent = currentUser ? `${greeting}, ${getCurrentFirstName()}` : greeting;
}

function focusComposerInput() {
  if (authOverlay && !authOverlay.hidden) {
    return;
  }

  window.requestAnimationFrame(() => {
    messageInput.focus({ preventScroll: true });
  });
}

function getDefaultSubscription() {
  return {
    plan_code: "free",
    status: "active",
    billing_email: currentUser?.email || "",
    cancel_at_period_end: false,
    current_period_end: null,
  };
}

function getCurrentPlanCode() {
  return currentSubscription?.plan_code || "free";
}

function getCurrentPlan() {
  return planDefinitions[getCurrentPlanCode()] || planDefinitions.free;
}

function setSidebar(open) {
  body.classList.toggle("sidebar-open", open);
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

function setView(view) {
  activeView = view;
  workspaceCanvas.classList.remove("is-home", "is-chat", "is-scheduler", "is-settings");
  workspaceCanvas.classList.add(`is-${view}`);
}

function setMode(mode) {
  activeMode = mode;

  modePills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.mode === mode);
  });

  serviceLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.mode === mode);
  });

  schedulerTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.schedulerMode === mode);
  });
}

function autoResizeTextarea() {
  messageInput.style.height = "auto";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 180)}px`;
}

function formatFileSize(size) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 102.4) / 10} KB`;
  }

  return `${Math.round(size / 104857.6) / 10} MB`;
}

function sanitizeFileName(name) {
  return name.replace(/[^\w.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function releaseAttachments(attachments) {
  attachments.forEach((attachment) => {
    if (attachment.previewUrl) {
      URL.revokeObjectURL(attachment.previewUrl);
    }
  });
}

function createAttachmentFromFile(file) {
  return {
    id: `${file.name}-${file.lastModified}-${window.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`,
    file,
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    isImage: file.type.startsWith("image/"),
    previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
  };
}

function renderPendingAttachments() {
  attachmentStrip.innerHTML = "";
  attachmentStrip.hidden = pendingAttachments.length === 0;

  pendingAttachments.forEach((attachment) => {
    const pill = document.createElement("div");
    pill.className = "attachment-pill";

    const copy = document.createElement("div");
    copy.className = "attachment-pill-copy";

    const name = document.createElement("span");
    name.className = "attachment-pill-name";
    name.textContent = attachment.name;

    const meta = document.createElement("span");
    meta.className = "attachment-pill-meta";
    meta.textContent = formatFileSize(attachment.size);

    copy.append(name, meta);

    const remove = document.createElement("button");
    remove.className = "attachment-pill-remove";
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${attachment.name}`);
    remove.textContent = "x";
    remove.addEventListener("click", () => {
      if (attachment.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl);
      }

      pendingAttachments = pendingAttachments.filter((item) => item.id !== attachment.id);
      renderPendingAttachments();
      composerFileInput.value = "";
    });

    pill.append(copy, remove);
    attachmentStrip.appendChild(pill);
  });
}

function clearPendingAttachments() {
  releaseAttachments(pendingAttachments);
  pendingAttachments = [];
  renderPendingAttachments();
  composerFileInput.value = "";
}

function setComposerStatus(message = "", tone = "") {
  composerStatus.textContent = message;
  composerStatus.hidden = !message;
  composerStatus.classList.toggle("is-error", tone === "error");
}

function setComposerBusy(isBusy) {
  isSubmittingMessage = isBusy;
  composerAttach.disabled = isBusy;
  messageInput.disabled = isBusy;
  composer.querySelector(".send-button").disabled = isBusy;
}

function setSchedulerStatus(message = "", tone = "") {
  schedulerFeedback = { message, tone };
  schedulerStatus.textContent = message;
  schedulerStatus.hidden = !message;
  schedulerStatus.classList.toggle("is-error", tone === "error");
}

function setBookingBusy(isBusy) {
  isBookingBusy = isBusy;
  schedulerSubmit.disabled = isBusy;
}

function setBillingStatus(message = "", tone = "") {
  billingFeedback = { message, tone };
  billingStatus.textContent = message;
  billingStatus.hidden = !message;
  billingStatus.classList.toggle("is-error", tone === "error");
}

function setAuthError(message = "") {
  authError.textContent = message;
  authError.hidden = !message;
}

function resetAuthForm() {
  authForm.reset();
  setAuthError();
}

function syncAuthSubmitButton() {
  const idleLabel = authMode === "signup" ? "Create account" : "Log in";
  const busyLabel = authMode === "signup" ? "Creating..." : "Logging in...";

  authSubmit.textContent = isAuthBusy ? busyLabel : idleLabel;
  authSubmit.disabled = isAuthBusy || !hasBackend;
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
  authHint.textContent =
    hintOverride ||
    (hasBackend
      ? mode === "signup"
        ? "Create your mk help account."
        : "Use the same account next time."
      : "Add Supabase keys in config.js to turn this on.");
  setAuthError();
  syncAuthSubmitButton();
}

function openAuth(mode = "login", hint = "") {
  setAuthMode(mode, hint);
  authOverlay.hidden = false;
  body.classList.add("auth-open");

  if (!hasBackend) {
    setAuthError("Add your Supabase URL and anon key in config.js first.");
  }

  window.setTimeout(() => {
    if (authMode === "signup") {
      authName.focus();
      return;
    }

    authEmail.focus();
  }, 0);
}

function closeAuth() {
  authOverlay.hidden = true;
  body.classList.remove("auth-open");
  setAuthError();
}

function updateAuthUI() {
  const isAuthed = Boolean(currentUser);

  topLoginAction.hidden = isAuthed;
  topAccountPill.hidden = !isAuthed;
  sidebarLoginAction.hidden = isAuthed;
  sidebarSessionCard.hidden = !isAuthed;
  updateHomeGreeting();

  if (!isAuthed) {
    return;
  }

  const displayName = getCurrentDisplayName();
  topAccountName.textContent = displayName;
  sidebarSessionName.textContent = displayName;
  sidebarSessionEmail.textContent = currentUser.email || "";
}

function renderRecentList() {
  recentList.innerHTML = "";

  if (conversations.length === 0) {
    const empty = document.createElement("p");
    empty.className = "recent-empty";
    empty.textContent = "No chats yet.";
    recentList.appendChild(empty);
    return;
  }

  conversations.forEach((item) => {
    const button = document.createElement("button");
    button.className = "recent-item";
    button.type = "button";
    button.dataset.conversationId = item.id;
    button.textContent = item.title || helpers[item.mode]?.title || "New chat";
    button.classList.toggle("active", item.id === activeConversationId && activeView === "chat");
    recentList.appendChild(button);
  });
}

function createMessageElement({ role, label, text, attachments = [] }) {
  const wrapper = document.createElement("article");
  wrapper.className = "message";
  wrapper.dataset.role = role;

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = label;

  const bodyElement = document.createElement("div");
  bodyElement.className = "message-body";

  if (attachments.length > 0) {
    const files = document.createElement("div");
    files.className = "message-files";

    attachments.forEach((attachment) => {
      const item = attachment.downloadUrl
        ? document.createElement("a")
        : document.createElement("div");

      item.className = "message-file";

      if (attachment.downloadUrl) {
        item.href = attachment.downloadUrl;
        item.target = "_blank";
        item.rel = "noreferrer";
      }

      const thumb = document.createElement("div");
      thumb.className = "message-file-thumb";

      if (attachment.isImage && attachment.previewUrl) {
        const image = document.createElement("img");
        image.src = attachment.previewUrl;
        image.alt = attachment.name;
        thumb.appendChild(image);
      } else {
        const glyph = document.createElement("span");
        glyph.className = "message-file-glyph";
        glyph.textContent =
          attachment.name.split(".").pop()?.slice(0, 4).toUpperCase() || "FILE";
        thumb.appendChild(glyph);
      }

      const copy = document.createElement("div");
      copy.className = "message-file-copy";

      const name = document.createElement("div");
      name.className = "message-file-name";
      name.textContent = attachment.name;

      const fileMeta = document.createElement("div");
      fileMeta.className = "message-file-meta";
      fileMeta.textContent = formatFileSize(attachment.size);

      copy.append(name, fileMeta);
      item.append(thumb, copy);
      files.appendChild(item);
    });

    bodyElement.appendChild(files);
  }

  if (text) {
    const content = document.createElement("div");
    content.className = "message-text";
    content.textContent = text;
    bodyElement.appendChild(content);
  }

  wrapper.append(meta, bodyElement);
  return wrapper;
}

function scrollConversationToEnd() {
  const lastMessage = conversation.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView({ block: "end", behavior: "smooth" });
  }
}

function showHome() {
  setView("home");
}

function showConversationShell(record) {
  setView("chat");
  threadTitle.textContent = record?.title || helpers[activeMode].title;
}

function resetChat() {
  unsubscribeMessages();
  activeConversationId = null;
  conversation.innerHTML = "";
  clearPendingAttachments();
  setComposerStatus();
  setSchedulerStatus();
  setMode("chat");
  showHome();
  messageInput.value = "";
  autoResizeTextarea();
  renderRecentList();
  focusComposerInput();
}

function queueDraft(message, mode, attachments = []) {
  pendingDraft = {
    message,
    mode,
    attachments: attachments.slice(),
  };
}

async function consumeDraft() {
  if (!pendingDraft || !currentUser) {
    return;
  }

  const queued = { ...pendingDraft };
  pendingDraft = null;
  setMode(queued.mode);
  await submitMessage(queued.message, true, queued.attachments);
}

function requireAuth(
  message = "",
  mode = activeMode,
  preferredMode = "login",
  hint = "",
  attachments = [],
) {
  if (currentUser) {
    return true;
  }

  if (message || attachments.length > 0) {
    queueDraft(message, mode, attachments);
    messageInput.value = message;
    autoResizeTextarea();
  }

  openAuth(preferredMode, hint || "Log in or sign up to continue.");
  return false;
}

function getFriendlyErrorMessage(error) {
  const message = error?.message || "Something went wrong.";

  if (/invalid login credentials/i.test(message)) {
    return "Wrong email or password.";
  }

  if (/email not confirmed/i.test(message)) {
    return "Check your email, then log in again.";
  }

  if (/user already registered/i.test(message)) {
    return "That email already exists. Try logging in.";
  }

  if (/row-level security/i.test(message)) {
    return "Permissions are blocking this. Run the SQL in supabase/schema.sql first.";
  }

  if (/relation .* does not exist/i.test(message) || /Could not find the table/i.test(message)) {
    return "A required table is missing. Run the SQL in supabase/schema.sql first.";
  }

  if (/bucket/i.test(message) && /not found/i.test(message)) {
    return "The uploads bucket is missing. Run the SQL in supabase/schema.sql first.";
  }

  return message;
}

function deriveConversationTitle(message, mode) {
  const normalized = message.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return helpers[mode].title;
  }

  if (normalized.length <= 38) {
    return normalized;
  }

  return `${normalized.slice(0, 35).trimEnd()}...`;
}

function getConversationRecord(conversationId) {
  return conversations.find((item) => item.id === conversationId) || null;
}

function getDayType(date) {
  const day = date.getDay();

  if (day === 0) {
    return "sunday";
  }

  if (day === 6) {
    return "saturday";
  }

  return "weekday";
}

function formatIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function generateScheduleDays() {
  const days = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  for (let index = 0; index < 7; index += 1) {
    const next = new Date(cursor);
    next.setDate(cursor.getDate() + index);

    days.push({
      value: formatIsoDate(next),
      weekday: next.toLocaleDateString("en-GB", { weekday: "short" }),
      dateLabel: next.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    });
  }

  return days;
}

function getScheduleTimeOptions(mode, isoDate) {
  const definition = scheduleDefinitions[mode];
  const dayType = getDayType(new Date(`${isoDate}T12:00:00`));
  return definition.times[dayType] || definition.times.weekday;
}

function createDefaultScheduleState(mode) {
  const definition = scheduleDefinitions[mode];
  const days = generateScheduleDays();
  const day = days[0].value;
  const times = getScheduleTimeOptions(mode, day);

  return {
    topic: definition.topics[0],
    duration: definition.durations[0],
    day,
    time: times[0],
    format: definition.formats[0],
  };
}

function ensureScheduleState(mode) {
  if (!scheduleState[mode]) {
    scheduleState[mode] = createDefaultScheduleState(mode);
  }

  const nextState = scheduleState[mode];
  const allowedTimes = getScheduleTimeOptions(mode, nextState.day);

  if (!allowedTimes.includes(nextState.time)) {
    nextState.time = allowedTimes[0];
  }

  return nextState;
}

function updateScheduleState(mode, patch) {
  scheduleState[mode] = {
    ...ensureScheduleState(mode),
    ...patch,
  };
}

function renderOptionButtons(container, options, selectedValue, onSelect, mapper) {
  container.innerHTML = "";

  options.forEach((value) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.classList.toggle("active", value === selectedValue);

    const copy = mapper ? mapper(value) : { label: value };
    button.textContent = copy.label;
    button.addEventListener("click", () => onSelect(value));
    container.appendChild(button);
  });
}

function renderDayButtons(container, options, selectedValue, onSelect) {
  container.innerHTML = "";

  options.forEach((item) => {
    const button = document.createElement("button");
    button.className = "day-button";
    button.type = "button";
    button.classList.toggle("active", item.value === selectedValue);

    const weekday = document.createElement("span");
    weekday.className = "day-button-weekday";
    weekday.textContent = item.weekday;

    const dateLabel = document.createElement("span");
    dateLabel.className = "day-button-date";
    dateLabel.textContent = item.dateLabel;

    button.append(weekday, dateLabel);
    button.addEventListener("click", () => onSelect(item.value));
    container.appendChild(button);
  });
}

function formatLongDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatRequestTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getUsageSummary() {
  const monthPrefix = new Date().toISOString().slice(0, 7);

  const chatCount = conversations.filter(
    (item) => item.mode === "chat" && item.created_at?.startsWith(monthPrefix),
  ).length;

  const callCount = bookingRequests.filter(
    (item) => item.kind === "call" && item.created_at?.startsWith(monthPrefix),
  ).length;

  const meetCount = bookingRequests.filter(
    (item) => item.kind === "meet" && item.created_at?.startsWith(monthPrefix),
  ).length;

  return [
    { label: "Chats", value: chatCount, foot: "This month" },
    { label: "Calls", value: callCount, foot: "This month" },
    { label: "Meets", value: meetCount, foot: "This month" },
  ];
}

function renderScheduler() {
  if (activeMode !== "call" && activeMode !== "meet") {
    return;
  }

  const definition = scheduleDefinitions[activeMode];
  const state = ensureScheduleState(activeMode);
  const days = generateScheduleDays();
  const currentPlan = getCurrentPlan();

  schedulerLabel.textContent = definition.label;
  schedulerTitle.textContent = definition.title;
  schedulerSubtitle.textContent = definition.subtitle;
  schedulerPlanBadge.textContent = currentPlan.name;
  schedulerSummaryTitle.textContent = definition.summaryTitle;
  schedulerSummaryIntro.textContent = definition.summaryIntro;
  schedulerFormatTitle.textContent = definition.formatTitle;
  schedulerFormatHint.textContent = definition.formatHint;
  schedulerPlanCopy.textContent =
    currentPlan.name === "Free"
      ? "Free includes chat, calls, and meetups. Launch limits still being tuned."
      : `${currentPlan.name} is for heavier use with higher limits.`;
  schedulerSubmit.textContent = definition.submitLabel;

  renderOptionButtons(
    schedulerTopicOptions,
    definition.topics,
    state.topic,
    (value) => {
      updateScheduleState(activeMode, { topic: value });
      renderScheduler();
    },
    (value) => ({ label: value }),
  );

  renderOptionButtons(
    schedulerDurationOptions,
    definition.durations,
    state.duration,
    (value) => {
      updateScheduleState(activeMode, { duration: value });
      renderScheduler();
    },
    (value) => ({ label: `${value} min` }),
  );

  renderDayButtons(schedulerDayOptions, days, state.day, (value) => {
    updateScheduleState(activeMode, {
      day: value,
      time: getScheduleTimeOptions(activeMode, value)[0],
    });
    renderScheduler();
  });

  renderOptionButtons(
    schedulerTimeOptions,
    getScheduleTimeOptions(activeMode, state.day),
    state.time,
    (value) => {
      updateScheduleState(activeMode, { time: value });
      renderScheduler();
    },
    (value) => ({ label: value }),
  );

  renderOptionButtons(
    schedulerFormatOptions,
    definition.formats,
    state.format,
    (value) => {
      updateScheduleState(activeMode, { format: value });
      renderScheduler();
    },
    (value) => ({ label: value }),
  );

  schedulerSummary.innerHTML = [
    { key: "Type", value: definition.label },
    { key: "Topic", value: state.topic },
    { key: "Length", value: `${state.duration} min` },
    { key: "Day", value: formatLongDate(state.day) },
    { key: "Time", value: state.time },
    { key: definition.formatTitle, value: state.format },
  ]
    .map(
      (item) => `
        <li class="summary-item">
          <span class="summary-key">${escapeHtml(item.key)}</span>
          <span class="summary-value">${escapeHtml(item.value)}</span>
        </li>
      `,
    )
    .join("");

  setSchedulerStatus(schedulerFeedback.message, schedulerFeedback.tone);
}

function renderSettings() {
  const currentPlan = getCurrentPlan();
  const isAuthed = Boolean(currentUser);

  currentPlanPill.textContent = currentPlan.name;
  settingsAccountHint.textContent = isAuthed
    ? "Your account, plan, and request activity."
    : "Log in to manage billing and paid plans.";

  currentPlanCard.innerHTML = `
    <div class="current-plan-main">
      <div>
        <h4>${escapeHtml(currentPlan.name)}</h4>
        <p>${escapeHtml(currentPlan.blurb)}</p>
      </div>
      <div class="current-plan-price">${escapeHtml(currentPlan.price)}</div>
    </div>
  `;

  usageGrid.innerHTML = getUsageSummary()
    .map(
      (item) => `
        <article class="usage-item">
          <div class="usage-label">${escapeHtml(item.label)}</div>
          <div class="usage-value">${escapeHtml(item.value)}</div>
          <div class="usage-foot">${escapeHtml(item.foot)}</div>
        </article>
      `,
    )
    .join("");

  planGrid.innerHTML = Object.entries(planDefinitions)
    .map(([code, plan]) => {
      const isCurrent = code === getCurrentPlanCode();
      const buttonLabel = isCurrent ? "Current plan" : plan.cta;

      return `
        <article class="plan-card${isCurrent ? " is-current" : ""}">
          <div class="plan-card-header">
            <div>
              <h4>${escapeHtml(plan.name)}</h4>
              <p>${escapeHtml(plan.blurb)}</p>
            </div>
            <div class="plan-card-price">${escapeHtml(plan.price)}</div>
          </div>
          <ul>
            ${plan.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
          </ul>
          <button class="ghost-button full-width" type="button" data-plan-action="${escapeHtml(code)}"${
            isCurrent ? " disabled" : ""
          }>
            ${escapeHtml(buttonLabel)}
          </button>
        </article>
      `;
    })
    .join("");

  invoiceList.innerHTML =
    getCurrentPlanCode() === "free"
      ? `<div class="invoice-item"><h4>No invoices yet</h4><p>Billing starts here once a paid plan is active.</p></div>`
      : `<div class="invoice-item"><h4>No invoices yet</h4><p>Your billing history will appear here.</p></div>`;

  requestList.innerHTML =
    bookingRequests.length > 0
      ? bookingRequests
          .slice(0, 6)
          .map(
            (request) => `
              <article class="request-item">
                <div class="request-item-top">
                  <div>
                    <h4>${escapeHtml(request.kind === "meet" ? "Meetup" : "Call")}</h4>
                    <p>${escapeHtml(request.topic)} · ${escapeHtml(String(request.duration_minutes))} min · ${escapeHtml(
                      request.kind === "meet" ? request.area || "MK" : request.contact_channel || "Call",
                    )}</p>
                  </div>
                  <span class="plan-pill">${escapeHtml(request.status || "requested")}</span>
                </div>
                <div class="request-item-meta">
                  ${escapeHtml(formatLongDate(request.slot_date))} · ${escapeHtml(request.slot_time)} · added ${escapeHtml(
                    formatRequestTimestamp(request.created_at),
                  )}
                </div>
              </article>
            `,
          )
          .join("")
      : `<p class="empty-state">No call or meetup requests yet.</p>`;

  settingsAccountCard.innerHTML = isAuthed
    ? `
        <div class="settings-account-row">
          <div class="settings-account-label">Name</div>
          <div class="settings-account-value">${escapeHtml(getCurrentDisplayName())}</div>
        </div>
        <div class="settings-account-row">
          <div class="settings-account-label">Email</div>
          <div class="settings-account-value">${escapeHtml(currentUser.email || "")}</div>
        </div>
        <div class="settings-account-row">
          <div class="settings-account-label">Plan</div>
          <div class="settings-account-value">${escapeHtml(currentPlan.name)}</div>
        </div>
      `
    : `
        <div class="settings-account-row">
          <div class="settings-account-label">Account</div>
          <div class="settings-account-value">Log in to manage your plan.</div>
        </div>
      `;

  setBillingStatus(billingFeedback.message, billingFeedback.tone);
}

function openScheduler(mode) {
  if (mode !== "call" && mode !== "meet") {
    return;
  }

  setMode(mode);
  setView("scheduler");
  setSchedulerStatus();
  renderScheduler();

  if (window.innerWidth <= SIDEBAR_BREAKPOINT) {
    setSidebar(false);
  }
}

function openSettings() {
  setView("settings");
  renderSettings();

  if (window.innerWidth <= SIDEBAR_BREAKPOINT) {
    setSidebar(false);
  }
}

async function loadProfile() {
  if (!supabaseClient || !currentUser) {
    currentProfile = null;
    return;
  }

  const { data, error } = await supabaseClient
    .from(DB.profiles)
    .select("id, email, full_name, first_name, role")
    .eq("id", currentUser.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    currentProfile = null;
    return;
  }

  currentProfile = data;
}

async function loadSubscription() {
  currentSubscription = getDefaultSubscription();

  if (!supabaseClient || !currentUser) {
    return;
  }

  const { data, error } = await supabaseClient
    .from(DB.subscriptions)
    .select("user_id, plan_code, status, billing_email, current_period_end, cancel_at_period_end")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    currentSubscription = data;
    return;
  }

  const defaultRow = {
    user_id: currentUser.id,
    plan_code: "free",
    status: "active",
    billing_email: currentUser.email || "",
  };

  const { data: inserted, error: insertError } = await supabaseClient
    .from(DB.subscriptions)
    .upsert(defaultRow)
    .select("user_id, plan_code, status, billing_email, current_period_end, cancel_at_period_end")
    .maybeSingle();

  if (insertError) {
    console.error(insertError);
    return;
  }

  currentSubscription = inserted || defaultRow;
}

async function loadBookingRequests() {
  bookingRequests = [];

  if (!supabaseClient || !currentUser) {
    renderSettings();
    return;
  }

  const { data, error } = await supabaseClient
    .from(DB.bookingRequests)
    .select(
      "id, kind, topic, duration_minutes, slot_date, slot_time, contact_channel, area, status, created_at",
    )
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    renderSettings();
    return;
  }

  bookingRequests = data || [];
  renderSettings();
}

async function loadConversations() {
  if (!supabaseClient || !currentUser) {
    conversations = [];
    renderRecentList();
    renderSettings();
    return;
  }

  const { data, error } = await supabaseClient
    .from(DB.conversations)
    .select("id, title, mode, last_message_preview, updated_at, created_at")
    .eq("user_id", currentUser.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    setComposerStatus(getFriendlyErrorMessage(error), "error");
    renderSettings();
    return;
  }

  conversations = data || [];
  setComposerStatus();

  if (activeConversationId && !getConversationRecord(activeConversationId)) {
    activeConversationId = null;
    conversation.innerHTML = "";
    if (activeView === "chat") {
      showHome();
    }
  }

  renderRecentList();
  renderSettings();
}

async function resolveAttachmentUrls(attachments) {
  if (!Array.isArray(attachments) || attachments.length === 0 || !supabaseClient) {
    return [];
  }

  return Promise.all(
    attachments.map(async (attachment) => {
      if (!attachment.path) {
        return attachment;
      }

      const bucket = attachment.bucket || MESSAGE_FILES_BUCKET;
      const { data, error } = await supabaseClient.storage
        .from(bucket)
        .createSignedUrl(attachment.path, 60 * 60);

      if (error) {
        console.error(error);
        return attachment;
      }

      return {
        ...attachment,
        downloadUrl: data.signedUrl,
        previewUrl: attachment.isImage ? data.signedUrl : "",
      };
    }),
  );
}

async function renderConversationMessages(rows) {
  conversation.innerHTML = "";

  for (const row of rows) {
    const attachments = await resolveAttachmentUrls(row.attachments);
    const messageElement = createMessageElement({
      role: row.role === "user" ? "user" : "helper",
      label: row.role === "user" ? "you" : row.sender_name || "mk help",
      text: row.body,
      attachments,
    });

    conversation.appendChild(messageElement);
  }

  scrollConversationToEnd();
}

async function loadMessages(conversationId) {
  if (!supabaseClient || !conversationId) {
    return;
  }

  const { data, error } = await supabaseClient
    .from(DB.messages)
    .select("id, role, body, attachments, sender_name, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    setComposerStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  setComposerStatus();
  await renderConversationMessages(data || []);
}

function unsubscribeConversations() {
  if (conversationsChannel && supabaseClient) {
    supabaseClient.removeChannel(conversationsChannel);
    conversationsChannel = null;
  }
}

function unsubscribeMessages() {
  if (messagesChannel && supabaseClient) {
    supabaseClient.removeChannel(messagesChannel);
    messagesChannel = null;
  }
}

function subscribeToConversations() {
  unsubscribeConversations();

  if (!supabaseClient || !currentUser) {
    return;
  }

  conversationsChannel = supabaseClient
    .channel(`conversations:${currentUser.id}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: DB.conversations,
        filter: `user_id=eq.${currentUser.id}`,
      },
      () => {
        void loadConversations();
      },
    )
    .subscribe();
}

function subscribeToMessages(conversationId) {
  unsubscribeMessages();

  if (!supabaseClient || !conversationId) {
    return;
  }

  messagesChannel = supabaseClient
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: DB.messages,
        filter: `conversation_id=eq.${conversationId}`,
      },
      () => {
        void loadMessages(conversationId);
        void loadConversations();
      },
    )
    .subscribe();
}

async function openConversation(conversationId, options = {}) {
  const { closeMenu = true } = options;

  if (!conversationId) {
    return;
  }

  if (!getConversationRecord(conversationId)) {
    await loadConversations();
  }

  const record = getConversationRecord(conversationId);
  if (!record) {
    return;
  }

  activeConversationId = conversationId;
  setMode("chat");
  showConversationShell(record);
  renderRecentList();
  subscribeToMessages(conversationId);
  await loadMessages(conversationId);

  if (window.innerWidth <= SIDEBAR_BREAKPOINT && closeMenu) {
    setSidebar(false);
  }

  focusComposerInput();
}

async function updateConversationMode(conversationId, mode) {
  if (!supabaseClient || !conversationId) {
    return;
  }

  const { error } = await supabaseClient
    .from(DB.conversations)
    .update({ mode })
    .eq("id", conversationId);

  if (error) {
    console.error(error);
    return;
  }

  conversations = conversations.map((item) =>
    item.id === conversationId
      ? {
          ...item,
          mode,
        }
      : item,
  );

  renderSettings();
}

async function createConversation(message, mode) {
  const payload = {
    title: deriveConversationTitle(message, mode),
    mode,
    user_id: currentUser.id,
  };

  const { data, error } = await supabaseClient
    .from(DB.conversations)
    .insert(payload)
    .select("id, title, mode, last_message_preview, updated_at, created_at")
    .single();

  if (error) {
    throw error;
  }

  conversations = [data, ...conversations.filter((item) => item.id !== data.id)];
  activeConversationId = data.id;
  showConversationShell(data);
  renderRecentList();
  renderSettings();
  subscribeToMessages(data.id);
  return data;
}

async function ensureConversationForSend(message) {
  if (!activeConversationId) {
    return createConversation(message, activeMode);
  }

  const record = getConversationRecord(activeConversationId);
  if (record?.mode !== activeMode) {
    await updateConversationMode(activeConversationId, activeMode);
  }

  return getConversationRecord(activeConversationId) || {
    id: activeConversationId,
    title: threadTitle.textContent,
    mode: activeMode,
  };
}

async function uploadAttachments(attachments, conversationId) {
  if (!supabaseClient || attachments.length === 0) {
    return [];
  }

  return Promise.all(
    attachments.map(async (attachment) => {
      const safeName = sanitizeFileName(attachment.name) || "file";
      const objectPath = `${conversationId}/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;

      const { error } = await supabaseClient.storage
        .from(MESSAGE_FILES_BUCKET)
        .upload(objectPath, attachment.file, {
          cacheControl: "3600",
          contentType: attachment.type || "application/octet-stream",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      return {
        bucket: MESSAGE_FILES_BUCKET,
        isImage: attachment.isImage,
        name: attachment.name,
        path: objectPath,
        size: attachment.size,
        type: attachment.type,
      };
    }),
  );
}

async function submitMessage(rawMessage, skipAuth = false, attachmentsOverride = null) {
  const message = rawMessage.trim();
  const attachments = attachmentsOverride ? attachmentsOverride.slice() : pendingAttachments.slice();
  const hadConversation = Boolean(activeConversationId);
  let createdConversationId = null;

  if (!message && attachments.length === 0) {
    return;
  }

  if (
    !skipAuth &&
    !requireAuth(message, activeMode, "signup", "Log in or sign up to send this.", attachments)
  ) {
    return;
  }

  if (!hasBackend || !supabaseClient || !currentUser) {
    openAuth("login", "Add Supabase first, then log in.");
    return;
  }

  if (isSubmittingMessage) {
    return;
  }

  setComposerBusy(true);
  setComposerStatus();

  try {
    const conversationRecord = await ensureConversationForSend(message);
    if (!hadConversation) {
      createdConversationId = conversationRecord.id;
    }

    const uploadedAttachments = await uploadAttachments(attachments, conversationRecord.id);

    const { error } = await supabaseClient.from(DB.messages).insert({
      attachments: uploadedAttachments,
      body: message,
      conversation_id: conversationRecord.id,
      role: "user",
      sender_id: currentUser.id,
      sender_name: getCurrentDisplayName(),
    });

    if (error) {
      throw error;
    }

    messageInput.value = "";
    autoResizeTextarea();
    clearPendingAttachments();
    await loadConversations();
    await openConversation(conversationRecord.id, { closeMenu: false });
  } catch (error) {
    console.error(error);

    if (createdConversationId && supabaseClient) {
      await supabaseClient.from(DB.conversations).delete().eq("id", createdConversationId);
      conversations = conversations.filter((item) => item.id !== createdConversationId);
      activeConversationId = null;
      conversation.innerHTML = "";
      showHome();
      renderRecentList();
    }

    setComposerStatus(getFriendlyErrorMessage(error), "error");
  } finally {
    setComposerBusy(false);
  }
}

async function submitSchedulerRequest(skipAuth = false) {
  if (activeMode !== "call" && activeMode !== "meet") {
    return;
  }

  if (!skipAuth && !currentUser) {
    pendingSchedulerSubmit = true;
    openAuth("signup", "Log in or sign up to request a slot.");
    return;
  }

  if (!hasBackend || !supabaseClient || !currentUser) {
    setSchedulerStatus("Add your Supabase URL and anon key in config.js first.", "error");
    return;
  }

  if (isBookingBusy) {
    return;
  }

  const state = ensureScheduleState(activeMode);

  setBookingBusy(true);
  setSchedulerStatus();

  try {
    const payload = {
      user_id: currentUser.id,
      kind: activeMode,
      topic: state.topic,
      duration_minutes: state.duration,
      slot_date: state.day,
      slot_time: state.time,
      contact_channel: activeMode === "call" ? state.format : null,
      area: activeMode === "meet" ? state.format : null,
      status: "requested",
      plan_code: getCurrentPlanCode(),
    };

    const { data, error } = await supabaseClient
      .from(DB.bookingRequests)
      .insert(payload)
      .select(
        "id, kind, topic, duration_minutes, slot_date, slot_time, contact_channel, area, status, created_at",
      )
      .single();

    if (error) {
      throw error;
    }

    bookingRequests = [data, ...bookingRequests];
    renderSettings();
    setSchedulerStatus(scheduleDefinitions[activeMode].successLabel);
    pendingSchedulerSubmit = false;
  } catch (error) {
    console.error(error);
    setSchedulerStatus(getFriendlyErrorMessage(error), "error");
  } finally {
    setBookingBusy(false);
  }
}

async function refreshSession() {
  if (!supabaseClient) {
    return;
  }

  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    console.error(error);
    return;
  }

  await applyAuthSession(data.session);
}

async function applyAuthSession(nextSession) {
  currentUser = nextSession?.user || null;

  if (!currentUser) {
    currentProfile = null;
    currentSubscription = getDefaultSubscription();
    bookingRequests = [];
    conversations = [];
    pendingSchedulerSubmit = false;
    unsubscribeConversations();
    resetChat();
    updateAuthUI();
    renderRecentList();
    renderScheduler();
    renderSettings();
    return;
  }

  await loadProfile();
  await loadSubscription();
  updateAuthUI();
  await loadBookingRequests();
  await loadConversations();
  subscribeToConversations();

  if (activeConversationId && getConversationRecord(activeConversationId)) {
    await openConversation(activeConversationId, { closeMenu: false });
  } else if (activeView === "settings") {
    renderSettings();
  } else if (activeView === "scheduler") {
    renderScheduler();
  } else {
    showHome();
    renderRecentList();
    focusComposerInput();
  }

  await consumeDraft();

  if (pendingSchedulerSubmit) {
    await submitSchedulerRequest(true);
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  if (!hasBackend || !supabaseClient) {
    setAuthError("Add your Supabase URL and anon key in config.js first.");
    return;
  }

  const email = normalizeEmail(authEmail.value);
  const password = authPassword.value.trim();

  if (!email || !password) {
    setAuthError("Enter your email and password.");
    return;
  }

  if (authMode === "signup" && authName.value.trim().length < 2) {
    setAuthError("Enter your name.");
    return;
  }

  isAuthBusy = true;
  setAuthError();
  syncAuthSubmitButton();

  try {
    if (authMode === "signup") {
      const name = authName.value.trim();
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name.split(/\s+/)[0],
            full_name: name,
          },
          emailRedirectTo: window.location.href.split("#")[0],
        },
      });

      if (error) {
        throw error;
      }

      if (!data.session) {
        setAuthError("Check your email to finish signing up.");
        return;
      }
    } else {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    }

    closeAuth();
    resetAuthForm();
    await refreshSession();
  } catch (error) {
    setAuthError(getFriendlyErrorMessage(error));
  } finally {
    isAuthBusy = false;
    syncAuthSubmitButton();
  }
}

async function logout() {
  if (!supabaseClient) {
    closeAuth();
    return;
  }

  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    setComposerStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  closeAuth();
  await applyAuthSession(null);
}

function openBillingPortal(actionLabel) {
  if (!currentUser) {
    openAuth("login", "Log in to manage your plan.");
    return;
  }

  if (BILLING_PORTAL_URL) {
    window.open(BILLING_PORTAL_URL, "_blank", "noopener");
    return;
  }

  setBillingStatus(`${actionLabel} will plug in here once billing is connected.`);
}

function handlePlanAction(planCode) {
  const plan = planDefinitions[planCode];
  if (!plan) {
    return;
  }

  if (!currentUser) {
    openAuth("signup", "Create an account to choose a plan.");
    return;
  }

  setBillingStatus(`${plan.name} checkout is the next backend step. The interface is ready.`);
}

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  void submitMessage(messageInput.value);
});

composerAttach.addEventListener("click", () => {
  composerFileInput.click();
});

composerFileInput.addEventListener("change", (event) => {
  const files = [...(event.target.files || [])];
  if (files.length === 0) {
    return;
  }

  pendingAttachments = pendingAttachments.concat(files.map(createAttachmentFromFile));
  renderPendingAttachments();
  composerFileInput.value = "";
});

authForm.addEventListener("submit", (event) => {
  void handleAuthSubmit(event);
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setAuthMode(tab.dataset.authMode);
  });
});

messageInput.addEventListener("input", autoResizeTextarea);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    void submitMessage(messageInput.value);
  }
});

modePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    if (pill.dataset.mode === "chat") {
      setMode("chat");
      if (activeView === "scheduler" || activeView === "settings") {
        showHome();
      }
      messageInput.focus();
      return;
    }

    openScheduler(pill.dataset.mode);
  });
});

serviceLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const { mode } = link.dataset;

    if (mode === "chat") {
      setMode("chat");

      if (activeConversationId) {
        void openConversation(activeConversationId, { closeMenu: false });
      } else {
        showHome();
      }

      messageInput.focus();
      return;
    }

    openScheduler(mode);
  });
});

recentList.addEventListener("click", (event) => {
  const button = event.target.closest("button.recent-item");
  if (!button || button.disabled) {
    return;
  }

  if (button.dataset.conversationId) {
    void openConversation(button.dataset.conversationId);
    return;
  }

  setMode("chat");
  void submitMessage(button.dataset.seed || "");
  setSidebar(false);
});

quickModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openScheduler(button.dataset.quickMode);
  });
});

schedulerTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    openScheduler(tab.dataset.schedulerMode);
  });
});

schedulerSubmit.addEventListener("click", () => {
  void submitSchedulerRequest();
});

settingsAction.addEventListener("click", openSettings);

planGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-plan-action]");
  if (!button || button.disabled) {
    return;
  }

  handlePlanAction(button.dataset.planAction);
});

manageBillingAction.addEventListener("click", () => {
  openBillingPortal("Billing management");
});

managePaymentAction.addEventListener("click", () => {
  openBillingPortal("Payment methods");
});

newChatButton.addEventListener("click", () => {
  resetChat();
  setSidebar(false);
});

searchAction.addEventListener("click", () => {
  setMode("chat");
  showHome();
  setSidebar(false);
  messageInput.focus();
});

brandHome.addEventListener("click", (event) => {
  event.preventDefault();
  resetChat();
});

topLoginAction.addEventListener("click", () => {
  openAuth("login", "Use your mk help account.");
});

sidebarLoginAction.addEventListener("click", () => {
  openAuth("login", "Use your mk help account.");
});

sidebarLogoutAction.addEventListener("click", () => {
  void logout();
});

authBackdrop.addEventListener("click", closeAuth);
closeAuthButton.addEventListener("click", closeAuth);
topAccountPill.addEventListener("click", openSettings);

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

window.addEventListener("beforeunload", () => {
  releaseAttachments(pendingAttachments);
});

async function bootstrap() {
  scheduleState = {
    call: createDefaultScheduleState("call"),
    meet: createDefaultScheduleState("meet"),
  };

  currentSubscription = getDefaultSubscription();

  updateHomeGreeting();
  autoResizeTextarea();
  applySidebarPreference();
  syncAuthSubmitButton();
  renderRecentList();
  renderScheduler();
  renderSettings();
  showHome();
  focusComposerInput();

  if (!hasBackend || !supabaseClient) {
    updateAuthUI();
    return;
  }

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    console.error(error);
  }

  await applyAuthSession(data?.session || null);

  supabaseClient.auth.onAuthStateChange((_event, nextSession) => {
    void applyAuthSession(nextSession);
  });
}

void bootstrap();
