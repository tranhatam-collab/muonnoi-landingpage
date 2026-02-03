const i18n = {
  vi: {
    appName: "Muôn Nói",
    appSub: "Hạ tầng đăng tải tri thức sống thật. Proof-first. Privacy-first.",
    signIn: "Đăng nhập",
    signOut: "Đăng xuất",
    email: "Email",
    sendLink: "Gửi magic link",
    statusPending: "Trạng thái: Chờ duyệt",
    statusApproved: "Trạng thái: Đã duyệt",
    statusBlocked: "Trạng thái: Bị chặn",
    compose: "Đăng nội dung",
    kind: "Loại",
    text: "Văn bản",
    link: "Liên kết",
    file: "Tệp",
    title: "Tiêu đề (tùy chọn)",
    body: "Nội dung",
    source: "Nguồn (URL, tùy chọn)",
    proof: "Proof hash (tùy chọn)",
    upload: "Chọn tệp (tối đa 25MB)",
    publish: "Đăng",
    feed: "Bảng tin (Latest)",
    loadMore: "Tải thêm",
    noAlg: "Không thuật toán. Không infinite scroll.",
    flag: "Gắn cờ",
    flagReason: "Lý do (giật tít / nghi ngờ / cần phản chứng...)",
    harmful: "Domain harmful: không preview",
  },
  en: {
    appName: "Muon Noi",
    appSub: "A proof-first, privacy-first public node for real-life knowledge.",
    signIn: "Sign in",
    signOut: "Sign out",
    email: "Email",
    sendLink: "Send magic link",
    statusPending: "Status: Pending approval",
    statusApproved: "Status: Approved",
    statusBlocked: "Status: Blocked",
    compose: "Publish",
    kind: "Kind",
    text: "Text",
    link: "Link",
    file: "File",
    title: "Title (optional)",
    body: "Content",
    source: "Source URL (optional)",
    proof: "Proof hash (optional)",
    upload: "Choose file (max 25MB)",
    publish: "Publish",
    feed: "Feed (Latest)",
    loadMore: "Load more",
    noAlg: "No algorithm. No infinite scroll.",
    flag: "Flag",
    flagReason: "Reason (clickbait / suspicious / needs counter-proof...)",
    harmful: "Harmful domain: no preview",
  }
};

const state = {
  lang: localStorage.getItem("mn_lang") || "vi",
  me: null,
  cursor: 0,
  loading: false,
};

function t(k){ return i18n[state.lang][k] || k; }
function el(q){ return document.querySelector(q); }
function fmtTime(ms){ return new Date(ms).toLocaleString(state.lang === "vi" ? "vi-VN":"en-US"); }

async function api(path, opts){
  const r = await fetch(`/functions/api/${path}`, opts);
  const j = await r.json().catch(()=>({ok:false}));
  if (!r.ok || !j.ok) throw new Error(j.message || "Request failed");
  return j;
}

function renderTop(){
  el("#langBtn").textContent = state.lang === "vi" ? "VI" : "EN";
  el("#appName").textContent = `${t("appName")}`;
  el("#appSub").textContent = t("appSub");
}

function renderAuth(){
  const me = state.me;
  if (!me){
    el("#authBox").innerHTML = `
      <div class="row">
        <input id="email" placeholder="${t("email")}" />
        <button class="btn" id="sendLinkBtn">${t("sendLink")}</button>
      </div>
      <div class="small" style="margin-top:10px">
        Magic email. Không mật khẩu. Giai đoạn đầu cần admin duyệt.
      </div>`;
    el("#sendLinkBtn").onclick = sendLink;
    return;
  }

  let statusText = t("statusPending");
  if (me.status === "approved") statusText = t("statusApproved");
  if (me.status === "blocked") statusText = t("statusBlocked");

  el("#authBox").innerHTML = `
    <div class="kpi">
      <span class="badge">${me.email}</span>
      <span class="badge ${me.status==='approved'?'ok':(me.status==='blocked'?'bad':'warn')}">${statusText}</span>
      <button class="pill" id="logoutBtn">${t("signOut")}</button>
    </div>
    <div class="small" style="margin-top:10px">${t("noAlg")}</div>`;
  el("#logoutBtn").onclick = logout;
}

function renderComposer(){
  const me = state.me;
  const disabled = !me || me.status !== "approved";
  el("#composeTitle").textContent = t("compose");
  el("#composer").innerHTML = `
    <div class="row">
      <select id="kind" ${disabled?"disabled":""}>
        <option value="text">${t("text")}</option>
        <option value="link">${t("link")}</option>
        <option value="file">${t("file")}</option>
      </select>
      <button class="btn" id="publishBtn" ${disabled?"disabled":""}>${t("publish")}</button>
    </div>
    <div style="height:10px"></div>
    <input id="title" placeholder="${t("title")}" ${disabled?"disabled":""}/>
    <div style="height:10px"></div>
    <textarea id="body" placeholder="${t("body")}" ${disabled?"disabled":""}></textarea>
    <div style="height:10px"></div>
    <input id="source" placeholder="${t("source")}" ${disabled?"disabled":""}/>
    <div style="height:10px"></div>
    <input id="proof" placeholder="${t("proof")}" ${disabled?"disabled":""}/>
    <div id="fileBox" style="margin-top:10px; display:none">
      <input type="file" id="file" ${disabled?"disabled":""}/>
      <div class="small" style="margin-top:6px">${t("upload")}</div>
    </div>
    <div class="small" style="margin-top:10px;opacity:.9">
      Hệ chỉ lưu hash + metadata. Nội dung có proof sẽ hiện “Verified (soft)”.
    </div>
  `;

  el("#kind").onchange = () => {
    el("#fileBox").style.display = el("#kind").value === "file" ? "block" : "none";
  };
  el("#publishBtn").onclick = publish;
}

function postBadges(p){
  const b = [];
  if (p.proof_level > 0) b.push(`<span class="badge ok">Verified (soft)</span>`);
  if (p.ai_flag === "caution") b.push(`<span class="badge warn">⚠️ caution</span>`);
  if (p.ai_flag === "suspicious") b.push(`<span class="badge bad">⚠️ suspicious</span>`);
  if (p.domain_status === "harmful") b.push(`<span class="badge bad">${t("harmful")}</span>`);
  return b.join(" ");
}

function renderFeed(items){
  el("#feedTitle").textContent = t("feed");
  const box = el("#feed");
  if (!state.cursor) box.innerHTML = "";
  for (const p of items){
    const metaLeft = `${p.author_email} · ${fmtTime(p.created_at)}`;
    const metaRight = `<span class="badge">${p.kind}</span> ${postBadges(p)}`;
    let extra = "";
    if (p.source_link) extra += `<div class="small" style="margin-top:8px">Source: <a href="${p.source_link}" target="_blank" rel="noreferrer">${p.source_link}</a></div>`;
    if (p.kind === "file" && p.file_key) extra += `<div class="small" style="margin-top:6px">File: ${p.file_key}</div>`;
    extra += `<div class="small" style="margin-top:6px">Hash: ${p.content_hash}</div>`;

    box.innerHTML += `
      <div class="post">
        <div class="meta">
          <div>${metaLeft}</div>
          <div>${metaRight}</div>
        </div>
        ${p.title ? `<div class="title">${escapeHtml(p.title)}</div>` : ""}
        <p class="body">${escapeHtml(p.body || "")}</p>
        ${extra}
        <div class="hr"></div>
        <div class="row">
          <input id="flag_${p.id}" placeholder="${t("flagReason")}" />
          <button class="btn secondary" onclick="window.__flag('${p.id}')">${t("flag")}</button>
        </div>
      </div>
    `;
  }
}

function escapeHtml(s){
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

async function loadMe(){
  const r = await api("auth/me", { method:"GET" });
  state.me = r.user;
}

async function sendLink(){
  const email = el("#email").value.trim();
  if (!email) return;
  el("#sendLinkBtn").disabled = true;
  try{
    await api("auth/request", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ email }) });
    alert(state.lang === "vi" ? "Đã gửi email. Kiểm tra hộp thư." : "Email sent. Check your inbox.");
  }catch(e){
    alert(e.message);
  }finally{
    el("#sendLinkBtn").disabled = false;
  }
}

async function logout(){
  await api("auth/logout", { method:"POST" });
  state.me = null;
  state.cursor = 0;
  init();
}

async function publish(){
  const kind = el("#kind").value;
  const title = el("#title").value.trim();
  const body = el("#body").value.trim();
  const source_link = el("#source").value.trim();
  const proof_hash = el("#proof").value.trim();

  let file_key="", file_mime="", file_size=0;

  if (kind === "file"){
    const f = el("#file").files[0];
    if (!f) return alert(state.lang==="vi" ? "Chọn tệp." : "Choose a file.");
    const buf = await f.arrayBuffer();
    const up = await fetch("/functions/api/upload/put", {
      method:"POST",
      headers:{ "content-type": f.type || "application/octet-stream", "x-file-size": String(f.size) },
      body: buf
    });
    const j = await up.json();
    if (!up.ok || !j.ok) return alert(j.message || "Upload failed");
    file_key = j.key; file_mime = j.contentType; file_size = j.size;
  }

  el("#publishBtn").disabled = true;
  try{
    await api("posts/create", {
      method:"POST",
      headers:{ "content-type":"application/json" },
      body: JSON.stringify({ kind, title, body, source_link, proof_hash, file_key, file_mime, file_size })
    });
    el("#title").value=""; el("#body").value=""; el("#source").value=""; el("#proof").value="";
    state.cursor = 0;
    await loadFeed(true);
  }catch(e){
    alert(e.message);
  }finally{
    el("#publishBtn").disabled = false;
  }
}

async function loadFeed(reset=false){
  if (state.loading) return;
  state.loading = true;
  try{
    const qs = new URLSearchParams();
    if (!reset && state.cursor) qs.set("cursor", String(state.cursor));
    qs.set("limit","15");
    const r = await api(`posts/list?${qs.toString()}`, { method:"GET" });
    renderFeed(r.items || []);
    state.cursor = r.nextCursor || 0;
  }catch(e){
    console.error(e);
  }finally{
    state.loading = false;
  }
}

window.__flag = async (id) => {
  const reason = el(`#flag_${id}`).value.trim();
  if (!reason) return;
  try{
    await api("posts/flag", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ post_id:id, reason })});
    alert("OK");
  }catch(e){
    alert(e.message);
  }
};

function toggleLang(){
  state.lang = state.lang === "vi" ? "en" : "vi";
  localStorage.setItem("mn_lang", state.lang);
  init();
}

async function init(){
  renderTop();
  await loadMe();
  renderAuth();
  renderComposer();
  await loadFeed(true);
  el("#loadMoreBtn").textContent = t("loadMore");
  el("#loadMoreBtn").onclick = () => loadFeed(false);
  el("#langBtn").onclick = toggleLang;
}

init();
