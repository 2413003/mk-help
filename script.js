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
const sendButton = composer.querySelector(".send-button");
const conversation = document.getElementById("conversation");
const threadTitle = document.getElementById("threadTitle");
const recentList = document.getElementById("recentList");
const newChatButton = document.getElementById("newChat");
const searchAction = document.getElementById("searchAction");
const groupsAction = document.getElementById("groupsAction");
const feedAction = document.getElementById("feedAction");
const settingsAction = document.getElementById("settingsAction");
const helperAction = document.getElementById("helperAction");
const adminAction = document.getElementById("adminAction");
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
const helperShell = document.getElementById("helperShell");
const helperMetricGrid = document.getElementById("helperMetricGrid");
const helperConversationQueue = document.getElementById("helperConversationQueue");
const helperBookingQueue = document.getElementById("helperBookingQueue");
const adminShell = document.getElementById("adminShell");
const adminMetricGrid = document.getElementById("adminMetricGrid");
const adminUserList = document.getElementById("adminUserList");
const adminConversationList = document.getElementById("adminConversationList");
const adminBookingList = document.getElementById("adminBookingList");
const adminInviteForm = document.getElementById("adminInviteForm");
const adminInviteEmail = document.getElementById("adminInviteEmail");
const adminInviteStatus = document.getElementById("adminInviteStatus");
const adminInviteList = document.getElementById("adminInviteList");
const groupsShell = document.getElementById("groupsShell");
const createGroupAction = document.getElementById("createGroupAction");
const groupList = document.getElementById("groupList");
const activeGroupTopic = document.getElementById("activeGroupTopic");
const activeGroupTitle = document.getElementById("activeGroupTitle");
const activeGroupDescription = document.getElementById("activeGroupDescription");
const groupJoinAction = document.getElementById("groupJoinAction");
const groupMessagesElement = document.getElementById("groupMessages");
const groupComposer = document.getElementById("groupComposer");
const groupMessageInput = document.getElementById("groupMessageInput");
const groupStatus = document.getElementById("groupStatus");
const feedShell = document.getElementById("feedShell");
const feedComposer = document.getElementById("feedComposer");
const feedPostTopic = document.getElementById("feedPostTopic");
const feedPostTitle = document.getElementById("feedPostTitle");
const feedPostBody = document.getElementById("feedPostBody");
const feedComposerStatus = document.getElementById("feedComposerStatus");
const feedList = document.getElementById("feedList");

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
  helperInvites: "mk_help_helper_invites",
  groups: "mk_help_groups",
  groupMembers: "mk_help_group_members",
  groupMessages: "mk_help_group_messages",
  helpPosts: "mk_help_help_posts",
  postComments: "mk_help_help_post_comments",
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
let staffConversations = [];
let staffBookingRequests = [];
let adminProfiles = [];
let adminSubscriptions = [];
let adminInvites = [];
let groups = [];
let groupMemberships = [];
let groupMessages = [];
let feedPosts = [];
let feedCommentsByPost = {};
let activeConversationId = null;
let activeGroupId = null;
let conversationsChannel = null;
let messagesChannel = null;
let groupMessagesChannel = null;
let feedChannel = null;
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

function getCurrentRole() {
  const role = currentProfile?.role;

  if (role === "admin" || role === "helper") {
    return role;
  }

  return "user";
}

function currentUserIsHelper() {
  return getCurrentRole() === "helper";
}

function currentUserIsAdmin() {
  return getCurrentRole() === "admin";
}

function currentUserIsStaff() {
  return currentUserIsHelper() || currentUserIsAdmin();
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
  workspaceCanvas.classList.remove(
    "is-home",
    "is-chat",
    "is-scheduler",
    "is-settings",
    "is-helper",
    "is-admin",
    "is-groups",
    "is-feed",
  );
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
  updateComposerSubmitState();
}

function updateComposerSubmitState() {
  const hasMessage = Boolean(messageInput.value.trim());
  sendButton.classList.toggle("is-visible", hasMessage);
  sendButton.disabled = isSubmittingMessage || !hasMessage;
  sendButton.setAttribute("aria-hidden", String(!hasMessage));
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
  updateComposerSubmitState();
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
  const isHelper = isAuthed && currentUserIsStaff();
  const isAdmin = isAuthed && currentUserIsAdmin();

  topLoginAction.hidden = isAuthed;
  topAccountPill.hidden = !isAuthed;
  sidebarLoginAction.hidden = isAuthed;
  sidebarSessionCard.hidden = !isAuthed;
  helperAction.hidden = !isHelper;
  adminAction.hidden = !isAdmin;
  updateHomeGreeting();

  if (!isAuthed) {
    helperAction.hidden = true;
    adminAction.hidden = true;
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
  return (
    conversations.find((item) => item.id === conversationId) ||
    staffConversations.find((item) => item.id === conversationId) ||
    null
  );
}

function isStaffConversation(record = getConversationRecord(activeConversationId)) {
  return Boolean(
    currentUser &&
      currentUserIsStaff() &&
      record?.user_id &&
      record.user_id !== currentUser.id,
  );
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

async function openGroups() {
  if (!currentUser) {
    openAuth("login", "Log in to join groups.");
    return;
  }

  setView("groups");
  await loadGroups();

  if (window.innerWidth <= SIDEBAR_BREAKPOINT) {
    setSidebar(false);
  }
}

async function openFeed() {
  if (!currentUser) {
    openAuth("login", "Log in to read the feed.");
    return;
  }

  setView("feed");
  await loadFeedPosts();

  if (window.innerWidth <= SIDEBAR_BREAKPOINT) {
    setSidebar(false);
  }
}

async function openHelperDashboard() {
  if (!currentUser) {
    openAuth("login", "Log in with a helper account.");
    return;
  }

  if (!currentUserIsStaff()) {
    showHome();
    return;
  }

  setView("helper");
  await loadStaffWork();

  if (window.innerWidth <= SIDEBAR_BREAKPOINT) {
    setSidebar(false);
  }
}

async function openAdminDashboard() {
  if (!currentUser) {
    openAuth("login", "Log in with an admin account.");
    return;
  }

  if (!currentUserIsAdmin()) {
    showHome();
    return;
  }

  setView("admin");
  await loadAdminWork();

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
  }
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
    .select("id, user_id, assigned_helper_id, title, mode, status, last_message_preview, updated_at, created_at")
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

function renderMetricGrid(container, metrics) {
  container.innerHTML = metrics
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
}

function setGroupStatus(message = "", tone = "") {
  groupStatus.textContent = message;
  groupStatus.hidden = !message;
  groupStatus.classList.toggle("is-error", tone === "error");
}

function setFeedComposerStatus(message = "", tone = "") {
  feedComposerStatus.textContent = message;
  feedComposerStatus.hidden = !message;
  feedComposerStatus.classList.toggle("is-error", tone === "error");
}

function getActiveGroup() {
  return groups.find((group) => group.id === activeGroupId) || null;
}

function currentUserIsGroupMember(groupId) {
  return currentUserIsStaff() || groupMemberships.some((membership) => membership.group_id === groupId);
}

function renderGroups() {
  createGroupAction.hidden = !currentUserIsStaff();

  groupList.innerHTML =
    groups.length > 0
      ? groups
          .map(
            (group) => `
              <article class="request-item${group.id === activeGroupId ? " is-active" : ""}">
                <div class="request-item-top">
                  <div>
                    <h4>${escapeHtml(group.title)}</h4>
                    <p>${escapeHtml(group.description || "Group help space.")}</p>
                  </div>
                  <span class="plan-pill">${escapeHtml(group.topic || "General")}</span>
                </div>
                <div class="staff-actions">
                  <button class="ghost-button" type="button" data-group-id="${escapeHtml(group.id)}">
                    Open
                  </button>
                </div>
              </article>
            `,
          )
          .join("")
      : `<p class="empty-state">No groups yet.</p>`;

  const activeGroup = getActiveGroup();
  if (!activeGroup) {
    activeGroupTopic.textContent = "Group";
    activeGroupTitle.textContent = "Choose a group";
    activeGroupDescription.textContent = "Join a topic space to start.";
    groupJoinAction.hidden = true;
    groupComposer.hidden = true;
    groupMessagesElement.innerHTML = `<p class="empty-state">No group selected.</p>`;
    return;
  }

  const isMember = currentUserIsGroupMember(activeGroup.id);
  activeGroupTopic.textContent = activeGroup.topic || "Group";
  activeGroupTitle.textContent = activeGroup.title;
  activeGroupDescription.textContent = activeGroup.description || "Group help space.";
  groupJoinAction.hidden = isMember;
  groupComposer.hidden = !isMember;

  renderGroupMessages();
}

function renderGroupMessages() {
  const activeGroup = getActiveGroup();
  if (!activeGroup) {
    groupMessagesElement.innerHTML = `<p class="empty-state">No group selected.</p>`;
    return;
  }

  if (!currentUserIsGroupMember(activeGroup.id)) {
    groupMessagesElement.innerHTML = `<p class="empty-state">Join this group to read and reply.</p>`;
    return;
  }

  groupMessagesElement.innerHTML =
    groupMessages.length > 0
      ? groupMessages
          .map((message) => {
            const isMine = message.sender_id === currentUser?.id;

            return `
              <article class="social-message${isMine ? " is-mine" : ""}">
                <div class="message-meta">${escapeHtml(isMine ? "you" : message.sender_name || "member")}</div>
                <div class="social-message-body">${escapeHtml(message.body)}</div>
              </article>
            `;
          })
          .join("")
      : `<p class="empty-state">No messages yet.</p>`;

  groupMessagesElement.scrollTop = groupMessagesElement.scrollHeight;
}

async function loadGroupMessages(groupId = activeGroupId) {
  groupMessages = [];

  if (!supabaseClient || !currentUser || !groupId || !currentUserIsGroupMember(groupId)) {
    renderGroups();
    return;
  }

  const { data, error } = await supabaseClient
    .from(DB.groupMessages)
    .select("id, group_id, sender_id, sender_name, role, body, created_at")
    .eq("group_id", groupId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    setGroupStatus(getFriendlyErrorMessage(error), "error");
    renderGroups();
    return;
  }

  groupMessages = data || [];
  setGroupStatus();
  renderGroups();
}

async function loadGroups() {
  groups = [];
  groupMemberships = [];
  groupMessages = [];

  if (!supabaseClient || !currentUser) {
    renderGroups();
    return;
  }

  const [{ data: groupRows, error: groupError }, { data: membershipRows, error: membershipError }] =
    await Promise.all([
      supabaseClient
        .from(DB.groups)
        .select("id, title, description, topic, visibility, status, created_at, updated_at")
        .order("updated_at", { ascending: false }),
      supabaseClient
        .from(DB.groupMembers)
        .select("group_id, user_id, role, created_at")
        .eq("user_id", currentUser.id),
    ]);

  if (groupError) {
    console.error(groupError);
    setGroupStatus(getFriendlyErrorMessage(groupError), "error");
  }

  if (membershipError) {
    console.error(membershipError);
  }

  groups = groupRows || [];
  groupMemberships = membershipRows || [];

  if (!activeGroupId || !groups.some((group) => group.id === activeGroupId)) {
    activeGroupId = groups[0]?.id || null;
  }

  if (activeGroupId && currentUserIsGroupMember(activeGroupId)) {
    await loadGroupMessages(activeGroupId);
    return;
  }

  renderGroups();
}

async function joinActiveGroup() {
  const activeGroup = getActiveGroup();
  if (!activeGroup) {
    return;
  }

  if (!currentUser) {
    openAuth("login", "Log in to join groups.");
    return;
  }

  const { error } = await supabaseClient.from(DB.groupMembers).insert({
    group_id: activeGroup.id,
    user_id: currentUser.id,
    role: "member",
  });

  if (error && !/duplicate key/i.test(error.message || "")) {
    console.error(error);
    setGroupStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  await loadGroups();
}

async function createGroupFromPrompt() {
  if (!currentUserIsStaff()) {
    return;
  }

  const title = window.prompt("Group name");
  if (!title?.trim()) {
    return;
  }

  const topic = window.prompt("Topic", "General") || "General";
  const { data, error } = await supabaseClient
    .from(DB.groups)
    .insert({
      title: title.trim(),
      description: "Group help space.",
      topic: topic.trim() || "General",
      created_by: currentUser.id,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    setGroupStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  activeGroupId = data.id;
  await loadGroups();
}

async function submitGroupMessage() {
  const activeGroup = getActiveGroup();
  const bodyValue = groupMessageInput.value.trim();

  if (!activeGroup || !bodyValue) {
    return;
  }

  if (!currentUserIsGroupMember(activeGroup.id)) {
    setGroupStatus("Join this group first.", "error");
    return;
  }

  const role = getCurrentRole();
  const { error } = await supabaseClient.from(DB.groupMessages).insert({
    group_id: activeGroup.id,
    sender_id: currentUser.id,
    sender_name: getCurrentDisplayName(),
    role,
    body: bodyValue,
  });

  if (error) {
    console.error(error);
    setGroupStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  groupMessageInput.value = "";
  await loadGroupMessages(activeGroup.id);
}

function renderFeed() {
  feedComposer.hidden = !currentUserIsStaff();

  feedList.innerHTML =
    feedPosts.length > 0
      ? feedPosts
          .map((post) => {
            const comments = feedCommentsByPost[post.id] || [];

            return `
              <article class="feed-card">
                <div>
                  <div class="feed-card-meta">
                    ${escapeHtml(post.topic || "Help")} · ${escapeHtml(post.author_name || "mk help")} · ${escapeHtml(
                      formatRequestTimestamp(post.created_at),
                    )}
                  </div>
                  <h3>${escapeHtml(post.title)}</h3>
                  <p class="feed-card-body">${escapeHtml(post.body)}</p>
                </div>
                <div class="feed-comments">
                  ${comments
                    .map(
                      (comment) => `
                        <div class="feed-comment">
                          <div class="feed-comment-meta">${escapeHtml(comment.user_name || "member")}</div>
                          <p>${escapeHtml(comment.body)}</p>
                        </div>
                      `,
                    )
                    .join("")}
                </div>
                <form class="feed-comment-form" data-post-comment-form="${escapeHtml(post.id)}">
                  <input type="text" placeholder="Add a reply" />
                  <button class="ghost-button" type="submit">Reply</button>
                </form>
              </article>
            `;
          })
          .join("")
      : `<p class="empty-state">No posts yet.</p>`;
}

async function loadFeedPosts() {
  feedPosts = [];
  feedCommentsByPost = {};

  if (!supabaseClient || !currentUser) {
    renderFeed();
    return;
  }

  const { data, error } = await supabaseClient
    .from(DB.helpPosts)
    .select("id, author_id, author_name, topic, title, body, status, created_at, updated_at")
    .order("updated_at", { ascending: false })
    .limit(40);

  if (error) {
    console.error(error);
    renderFeed();
    return;
  }

  feedPosts = data || [];
  const postIds = feedPosts.map((post) => post.id);

  if (postIds.length > 0) {
    const { data: comments, error: commentsError } = await supabaseClient
      .from(DB.postComments)
      .select("id, post_id, user_id, user_name, body, created_at")
      .in("post_id", postIds)
      .order("created_at", { ascending: true });

    if (commentsError) {
      console.error(commentsError);
    } else {
      feedCommentsByPost = (comments || []).reduce((next, comment) => {
        next[comment.post_id] = next[comment.post_id] || [];
        next[comment.post_id].push(comment);
        return next;
      }, {});
    }
  }

  renderFeed();
}

async function submitFeedPost() {
  const title = feedPostTitle.value.trim();
  const bodyValue = feedPostBody.value.trim();
  const topic = feedPostTopic.value.trim() || "General";

  if (!currentUserIsStaff()) {
    return;
  }

  if (!title || !bodyValue) {
    setFeedComposerStatus("Add a title and post.", "error");
    return;
  }

  const { error } = await supabaseClient.from(DB.helpPosts).insert({
    author_id: currentUser.id,
    author_name: getCurrentDisplayName(),
    topic,
    title,
    body: bodyValue,
    status: "published",
  });

  if (error) {
    console.error(error);
    setFeedComposerStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  feedPostTopic.value = "";
  feedPostTitle.value = "";
  feedPostBody.value = "";
  setFeedComposerStatus("Published.");
  await loadFeedPosts();
}

async function submitFeedComment(postId, bodyValue) {
  const body = bodyValue.trim();
  if (!body || !currentUser) {
    return;
  }

  const { error } = await supabaseClient.from(DB.postComments).insert({
    post_id: postId,
    user_id: currentUser.id,
    user_name: getCurrentDisplayName(),
    body,
  });

  if (error) {
    console.error(error);
    return;
  }

  await loadFeedPosts();
}

function getAdminProfile(userId) {
  return adminProfiles.find((profile) => profile.id === userId) || null;
}

function getAdminSubscription(userId) {
  return adminSubscriptions.find((subscription) => subscription.user_id === userId) || null;
}

function getUserDisplayForStaff(userId) {
  const profile = getAdminProfile(userId);
  return profile?.full_name || profile?.email || `User ${String(userId || "").slice(0, 8)}`;
}

function createConversationQueueMarkup(items, scope = "helper") {
  if (items.length === 0) {
    return `<p class="empty-state">No chats waiting.</p>`;
  }

  return items
    .slice(0, 12)
    .map(
      (item) => `
        <article class="request-item">
          <div class="request-item-top">
            <div>
              <h4>${escapeHtml(item.title || "Chat")}</h4>
              <p>${escapeHtml(item.last_message_preview || "No messages yet.")}</p>
            </div>
            <span class="plan-pill">${escapeHtml(item.status || "open")}</span>
          </div>
          <div class="staff-item-meta">
            ${escapeHtml(getUserDisplayForStaff(item.user_id))} · ${escapeHtml(formatRequestTimestamp(item.updated_at || item.created_at))}
          </div>
          <div class="staff-actions">
            <button class="ghost-button" type="button" data-${scope}-conversation-id="${escapeHtml(item.id)}">
              Open
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function createBookingQueueMarkup(items, scope = "helper") {
  if (items.length === 0) {
    return `<p class="empty-state">No requests waiting.</p>`;
  }

  return items
    .slice(0, 12)
    .map(
      (request) => `
        <article class="request-item">
          <div class="request-item-top">
            <div>
              <h4>${escapeHtml(request.kind === "meet" ? "Meetup" : "Call")}</h4>
              <p>${escapeHtml(request.topic)} · ${escapeHtml(String(request.duration_minutes))} min</p>
            </div>
            <span class="plan-pill">${escapeHtml(request.status || "requested")}</span>
          </div>
          <div class="staff-item-meta">
            ${escapeHtml(getUserDisplayForStaff(request.user_id))} · ${escapeHtml(formatLongDate(request.slot_date))} · ${escapeHtml(
              request.slot_time,
            )}
          </div>
          <div class="staff-actions">
            <select class="staff-select" data-${scope}-booking-status="${escapeHtml(request.id)}">
              ${["requested", "confirmed", "completed", "cancelled"]
                .map(
                  (status) =>
                    `<option value="${status}"${request.status === status ? " selected" : ""}>${status}</option>`,
                )
                .join("")}
            </select>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderHelperDashboard() {
  const workConversations = staffConversations.filter((item) => item.user_id !== currentUser?.id);
  const openConversations = workConversations.filter((item) => item.status !== "closed");
  const requestedBookings = staffBookingRequests.filter((item) => item.status === "requested");

  renderMetricGrid(helperMetricGrid, [
    { label: "Open chats", value: openConversations.length, foot: "Visible to you" },
    { label: "Requests", value: requestedBookings.length, foot: "Calls & meets" },
    {
      label: "Assigned",
      value: workConversations.filter((item) => item.assigned_helper_id === currentUser?.id).length,
      foot: "Your chats",
    },
  ]);

  helperConversationQueue.innerHTML = createConversationQueueMarkup(openConversations, "helper");
  helperBookingQueue.innerHTML = createBookingQueueMarkup(staffBookingRequests, "helper");
}

function renderAdminDashboard() {
  renderMetricGrid(adminMetricGrid, [
    { label: "Users", value: adminProfiles.filter((item) => item.role === "user").length, foot: "Default accounts" },
    { label: "Helpers", value: adminProfiles.filter((item) => item.role === "helper").length, foot: "Can give help" },
    { label: "Admins", value: adminProfiles.filter((item) => item.role === "admin").length, foot: "Full access" },
    { label: "Requests", value: staffBookingRequests.length, foot: "Calls & meets" },
  ]);

  adminUserList.innerHTML =
    adminProfiles.length > 0
      ? adminProfiles
          .slice(0, 40)
          .map((profile) => {
            const subscription = getAdminSubscription(profile.id);
            const isSelf = profile.id === currentUser?.id;

            return `
              <article class="admin-user-item">
                <div class="admin-user-item-top">
                  <div>
                    <h4>${escapeHtml(profile.full_name || profile.email || "Account")}</h4>
                    <p>${escapeHtml(profile.email || "")}</p>
                  </div>
                  <span class="plan-pill">${escapeHtml(profile.role || "user")}</span>
                </div>
                <div class="admin-user-controls">
                  <select data-admin-role-user-id="${escapeHtml(profile.id)}"${isSelf ? " disabled" : ""}>
                    ${["user", "helper", "admin"]
                      .map(
                        (role) =>
                          `<option value="${role}"${profile.role === role ? " selected" : ""}>${role}</option>`,
                      )
                      .join("")}
                  </select>
                  <select data-admin-plan-user-id="${escapeHtml(profile.id)}">
                    ${Object.keys(planDefinitions)
                      .map(
                        (planCode) =>
                          `<option value="${planCode}"${
                            (subscription?.plan_code || "free") === planCode ? " selected" : ""
                          }>${planDefinitions[planCode].name}</option>`,
                      )
                      .join("")}
                  </select>
                </div>
              </article>
            `;
          })
          .join("")
      : `<p class="empty-state">No accounts visible.</p>`;

  adminConversationList.innerHTML = createConversationQueueMarkup(staffConversations, "admin");
  adminBookingList.innerHTML = createBookingQueueMarkup(staffBookingRequests, "admin");
  adminInviteList.innerHTML =
    adminInvites.length > 0
      ? adminInvites
          .slice(0, 8)
          .map(
            (invite) => `
              <article class="request-item">
                <div class="request-item-top">
                  <div>
                    <h4>${escapeHtml(invite.email)}</h4>
                    <p>${escapeHtml(formatRequestTimestamp(invite.created_at))}</p>
                  </div>
                  <span class="plan-pill">${escapeHtml(invite.status)}</span>
                </div>
              </article>
            `,
          )
          .join("")
      : `<p class="empty-state">No helper invites yet.</p>`;
}

async function loadStaffWork() {
  staffConversations = [];
  staffBookingRequests = [];

  if (!supabaseClient || !currentUser || !currentUserIsStaff()) {
    renderHelperDashboard();
    return;
  }

  const [{ data: conversationRows, error: conversationError }, { data: bookingRows, error: bookingError }] =
    await Promise.all([
      supabaseClient
        .from(DB.conversations)
        .select("id, user_id, assigned_helper_id, title, mode, status, last_message_preview, updated_at, created_at")
        .order("updated_at", { ascending: false })
        .limit(60),
      supabaseClient
        .from(DB.bookingRequests)
        .select(
          "id, user_id, kind, topic, duration_minutes, slot_date, slot_time, contact_channel, area, status, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(60),
    ]);

  if (conversationError) {
    console.error(conversationError);
  }

  if (bookingError) {
    console.error(bookingError);
  }

  staffConversations = conversationRows || [];
  staffBookingRequests = bookingRows || [];
  renderHelperDashboard();
}

async function loadAdminWork() {
  adminProfiles = [];
  adminSubscriptions = [];
  adminInvites = [];

  if (!supabaseClient || !currentUser || !currentUserIsAdmin()) {
    renderAdminDashboard();
    return;
  }

  await loadStaffWork();

  const [
    { data: profileRows, error: profileError },
    { data: subscriptionRows, error: subscriptionError },
    { data: inviteRows, error: inviteError },
  ] = await Promise.all([
    supabaseClient
      .from(DB.profiles)
      .select("id, email, full_name, first_name, role, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabaseClient
      .from(DB.subscriptions)
      .select("user_id, plan_code, status, billing_email, current_period_end, cancel_at_period_end")
      .limit(100),
    supabaseClient
      .from(DB.helperInvites)
      .select("id, email, status, created_at")
      .order("created_at", { ascending: false })
      .limit(30),
  ]);

  if (profileError) {
    console.error(profileError);
  }

  if (subscriptionError) {
    console.error(subscriptionError);
  }

  if (inviteError) {
    console.error(inviteError);
  }

  adminProfiles = profileRows || [];
  adminSubscriptions = subscriptionRows || [];
  adminInvites = inviteRows || [];
  renderAdminDashboard();
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
  const activeRecord = getConversationRecord(activeConversationId);
  const viewingOwnConversation = !activeRecord?.user_id || activeRecord.user_id === currentUser?.id;

  for (const row of rows) {
    const attachments = await resolveAttachmentUrls(row.attachments);
    const messageElement = createMessageElement({
      role: row.role === "user" ? "user" : "helper",
      label:
        row.role === "user"
          ? viewingOwnConversation
            ? "you"
            : row.sender_name || "user"
          : row.sender_name || "mk help",
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
    .select("id, user_id, assigned_helper_id, title, mode, status, last_message_preview, updated_at, created_at")
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
  if (isStaffConversation(record)) {
    return record;
  }

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
    const staffReply = isStaffConversation(conversationRecord);

    const { error } = await supabaseClient.from(DB.messages).insert({
      attachments: uploadedAttachments,
      body: message,
      conversation_id: conversationRecord.id,
      role: staffReply ? "helper" : "user",
      sender_id: currentUser.id,
      sender_name: staffReply ? `${getCurrentDisplayName()} from mk help` : getCurrentDisplayName(),
    });

    if (error) {
      throw error;
    }

    messageInput.value = "";
    autoResizeTextarea();
    clearPendingAttachments();
    await loadConversations();
    if (currentUserIsStaff()) {
      await loadStaffWork();
    }
    if (currentUserIsAdmin()) {
      await loadAdminWork();
    }
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
    staffConversations = [];
    staffBookingRequests = [];
    adminProfiles = [];
    adminSubscriptions = [];
    adminInvites = [];
    groups = [];
    groupMemberships = [];
    groupMessages = [];
    feedPosts = [];
    feedCommentsByPost = {};
    activeGroupId = null;
    pendingSchedulerSubmit = false;
    unsubscribeConversations();
    resetChat();
    updateAuthUI();
    renderRecentList();
    renderScheduler();
    renderSettings();
    renderHelperDashboard();
    renderAdminDashboard();
    renderGroups();
    renderFeed();
    return;
  }

  await loadProfile();
  await loadSubscription();
  updateAuthUI();
  await loadBookingRequests();
  await loadConversations();
  if (activeView === "groups") {
    await loadGroups();
  }
  if (activeView === "feed") {
    await loadFeedPosts();
  }
  if (currentUserIsStaff()) {
    await loadStaffWork();
  } else {
    staffConversations = [];
    staffBookingRequests = [];
    renderHelperDashboard();
  }
  if (currentUserIsAdmin()) {
    await loadAdminWork();
  } else {
    adminProfiles = [];
    adminSubscriptions = [];
    adminInvites = [];
    renderAdminDashboard();
  }
  subscribeToConversations();

  if (activeConversationId && getConversationRecord(activeConversationId)) {
    await openConversation(activeConversationId, { closeMenu: false });
  } else if (activeView === "admin" && currentUserIsAdmin()) {
    await openAdminDashboard();
  } else if (activeView === "helper" && currentUserIsStaff()) {
    await openHelperDashboard();
  } else if (activeView === "groups") {
    await openGroups();
  } else if (activeView === "feed") {
    await openFeed();
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

function setAdminInviteStatus(message = "", tone = "") {
  adminInviteStatus.textContent = message;
  adminInviteStatus.hidden = !message;
  adminInviteStatus.classList.toggle("is-error", tone === "error");
}

async function inviteHelperByEmail(emailValue) {
  if (!currentUserIsAdmin() || !supabaseClient || !currentUser) {
    setAdminInviteStatus("Admin access required.", "error");
    return;
  }

  const email = normalizeEmail(emailValue);
  if (!email) {
    setAdminInviteStatus("Enter an email.", "error");
    return;
  }

  const { error } = await supabaseClient.from(DB.helperInvites).insert({
    email,
    invited_by: currentUser.id,
  });

  if (error) {
    console.error(error);
    setAdminInviteStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  adminInviteEmail.value = "";
  setAdminInviteStatus("Helper invite saved.");
  await loadAdminWork();
}

async function updateAdminUserRole(userId, role) {
  if (!currentUserIsAdmin() || userId === currentUser?.id) {
    return;
  }

  const { error } = await supabaseClient.from(DB.profiles).update({ role }).eq("id", userId);
  if (error) {
    console.error(error);
    setAdminInviteStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  await loadAdminWork();
}

async function updateAdminUserPlan(userId, planCode) {
  if (!currentUserIsAdmin()) {
    return;
  }

  const profile = getAdminProfile(userId);
  const { error } = await supabaseClient.from(DB.subscriptions).upsert({
    user_id: userId,
    plan_code: planCode,
    status: "active",
    billing_email: profile?.email || "",
  });

  if (error) {
    console.error(error);
    setAdminInviteStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  await loadAdminWork();
}

async function updateBookingStatus(requestId, status) {
  if (!currentUserIsStaff()) {
    return;
  }

  const { error } = await supabaseClient.from(DB.bookingRequests).update({ status }).eq("id", requestId);
  if (error) {
    console.error(error);
    setComposerStatus(getFriendlyErrorMessage(error), "error");
    return;
  }

  if (currentUserIsAdmin()) {
    await loadAdminWork();
    return;
  }

  await loadStaffWork();
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
groupsAction.addEventListener("click", () => {
  void openGroups();
});
feedAction.addEventListener("click", () => {
  void openFeed();
});
helperAction.addEventListener("click", () => {
  void openHelperDashboard();
});
adminAction.addEventListener("click", () => {
  void openAdminDashboard();
});

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

groupList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-group-id]");
  if (!button) {
    return;
  }

  activeGroupId = button.dataset.groupId;
  void loadGroupMessages(activeGroupId);
});

groupJoinAction.addEventListener("click", () => {
  void joinActiveGroup();
});

createGroupAction.addEventListener("click", () => {
  void createGroupFromPrompt();
});

groupComposer.addEventListener("submit", (event) => {
  event.preventDefault();
  void submitGroupMessage();
});

feedComposer.addEventListener("submit", (event) => {
  event.preventDefault();
  void submitFeedPost();
});

feedList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-post-comment-form]");
  if (!form) {
    return;
  }

  event.preventDefault();
  const input = form.querySelector("input");
  if (!input) {
    return;
  }

  const value = input.value;
  input.value = "";
  void submitFeedComment(form.dataset.postCommentForm, value);
});

helperConversationQueue.addEventListener("click", (event) => {
  const button = event.target.closest("[data-helper-conversation-id]");
  if (!button) {
    return;
  }

  void openConversation(button.dataset.helperConversationId);
});

adminConversationList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-conversation-id]");
  if (!button) {
    return;
  }

  void openConversation(button.dataset.adminConversationId);
});

helperBookingQueue.addEventListener("change", (event) => {
  const field = event.target.closest("[data-helper-booking-status]");
  if (!field) {
    return;
  }

  void updateBookingStatus(field.dataset.helperBookingStatus, field.value);
});

adminBookingList.addEventListener("change", (event) => {
  const field = event.target.closest("[data-admin-booking-status]");
  if (!field) {
    return;
  }

  void updateBookingStatus(field.dataset.adminBookingStatus, field.value);
});

adminUserList.addEventListener("change", (event) => {
  const roleField = event.target.closest("[data-admin-role-user-id]");
  if (roleField) {
    void updateAdminUserRole(roleField.dataset.adminRoleUserId, roleField.value);
    return;
  }

  const planField = event.target.closest("[data-admin-plan-user-id]");
  if (planField) {
    void updateAdminUserPlan(planField.dataset.adminPlanUserId, planField.value);
  }
});

adminInviteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  void inviteHelperByEmail(adminInviteEmail.value);
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
