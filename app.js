// 邏輯註解：初始資料結構，對齊 sample file.csv 與學校通告
let activities = [
  {
    id: "act-1",
    year: "25/26",
    noticeNo: "2627-ECA019",
    organizer: "體育科",
    title: "田徑隊訓練",
    teacher: "張梓烽",
    category: "體育發展",
    hours: 8,
    date: "2026年9月23日至2026年12月16日",
    time: "5:00 p.m. - 6:40 p.m.",
    location: "學校操場及大埔運動場",
    attire: "穿著田徑隊隊衣",
    fee: "全免",
    purpose: "為讓學生接受系統性訓練，準備本年度校際比賽，本校將舉行訓練活動。"
  },
  {
    id: "act-2",
    year: "25/26",
    noticeNo: "2526-PE002",
    organizer: "體育科",
    title: "(初級組)全港中學校際三人籃球馬拉松",
    teacher: "朱賢煒",
    category: "體育發展",
    hours: 3,
    date: "2026年6月30日",
    time: "9:00 a.m. - 5:00 p.m.",
    location: "校外指定地點",
    attire: "學校指定體育服裝",
    fee: "全免",
    purpose: "透過校際三人籃球比賽，加強學生團隊協作與體育精神。"
  }
];

let studentRecords = [
  { actId: "act-1", year: "25/26", class: "3A", classNo: 24, name: "鄧家蔚", role: "參與者", hours: 8, award: "全勤獎" },
  { actId: "act-1", year: "25/26", class: "1C", classNo: 18, name: "林映彤", role: "隊長", hours: 8, award: "-" },
  { actId: "act-2", year: "25/26", class: "3C", classNo: 28, name: "謝廣燊", role: "隊員", hours: 3, award: "-" },
  { actId: "act-2", year: "25/26", class: "3C", classNo: 14, name: "李文滔", role: "隊員", hours: 3, award: "-" }
];

// 邏輯註解：標籤切換
function switchTab(tabId) {
  document.getElementById("section-activity").classList.add("hidden");
  document.getElementById("section-record").classList.add("hidden");
  document.getElementById("section-slp").classList.add("hidden");

  document.querySelectorAll(".nav-tab-btn").forEach(btn => btn.classList.remove("active"));

  if (tabId === "activity") {
    document.getElementById("section-activity").classList.remove("hidden");
    document.getElementById("tab-btn-activity").classList.add("active");
  } else if (tabId === "record") {
    document.getElementById("section-record").classList.remove("hidden");
    document.getElementById("tab-btn-record").classList.add("active");
    syncActivityDropdown();
  } else if (tabId === "slp") {
    document.getElementById("section-slp").classList.remove("hidden");
    document.getElementById("tab-btn-slp").classList.add("active");
    renderSlpPreview();
  }
}

// 邏輯註解：儲存活動並即時同步到「名單登記」下拉選單
function saveActivityAndSync() {
  const newAct = {
    id: "act-" + Date.now(),
    year: document.getElementById("actYear").value,
    noticeNo: document.getElementById("actNoticeNo").value,
    organizer: document.getElementById("actOrganizer").value,
    teacher: document.getElementById("actTeacher").value,
    title: document.getElementById("actTitle").value,
    category: document.getElementById("actCategory").value,
    hours: Number(document.getElementById("actHours").value),
    date: document.getElementById("actDate").value,
    time: document.getElementById("actTime").value,
    location: document.getElementById("actLocation").value,
    attire: document.getElementById("actAttire").value,
    fee: document.getElementById("actFee").value,
    purpose: document.getElementById("actPurpose").value
  };

  if (!newAct.title || !newAct.noticeNo) {
    alert("請填寫活動名稱及通告編號！");
    return;
  }

  activities.unshift(newAct);
  alert(`活動「${newAct.title}」已建立！系統將自動切換至名單頁面進行學生登記。`);

  // 自動導航至名單登記頁面並預設選取剛剛新增的活動
  switchTab("record");
  document.getElementById("activitySelector").value = newAct.id;
  renderStudentRecords();
}

// 邏輯註解：同步「處理活動」的下拉選單選項
function syncActivityDropdown() {
  const selector = document.getElementById("activitySelector");
  const previousValue = selector.value;

  selector.innerHTML = activities.map(act => `
    <option value="${act.id}">[${act.year}] ${act.noticeNo} - ${act.title} (負責: ${act.teacher}老師)</option>
  `).join("");

  if (previousValue && activities.some(a => a.id === previousValue)) {
    selector.value = previousValue;
  }
  renderStudentRecords();
}

// 邏輯註解：依據選取的活動渲染所屬學生列表
function renderStudentRecords() {
  const actId = document.getElementById("activitySelector").value;
  const currentAct = activities.find(a => a.id === actId);
  const metaBox = document.getElementById("activityMetaText");
  const tbody = document.getElementById("studentTableBody");

  if (!currentAct) return;

  metaBox.innerHTML = `主辦科組：<strong>${currentAct.organizer}</strong> ｜ 負責老師：<strong>${currentAct.teacher}老師</strong> ｜ OLE 範疇：<strong>${currentAct.category}</strong> ｜ 時數：<strong>${currentAct.hours} 小時</strong>`;

  const filtered = studentRecords.filter(r => r.actId === actId);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px; color: #999;">目前尚未登記學生，請點擊上方「+ 登記學生」補入名單。</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((r, i) => `
    <tr>
      <td>${r.year}</td>
      <td><strong>${r.class}</strong></td>
      <td>${r.classNo}</td>
      <td>${r.name}</td>
      <td>
        <select class="form-control" style="padding: 2px 5px; font-size: 12px; width: auto;">
          <option ${r.role === '參與者' ? 'selected' : ''}>參與者</option>
          <option ${r.role === '隊長' ? 'selected' : ''}>隊長</option>
          <option ${r.role === '隊員' ? 'selected' : ''}>隊員</option>
        </select>
      </td>
      <td>${r.hours}</td>
      <td>
        <input type="text" value="${r.award}" class="form-control" style="padding: 2px 5px; font-size: 12px; width: 110px;" />
      </td>
      <td style="text-align: center;">
        <button onclick="removeStudentRecord(${i})" style="color: #dc3545; background: none; border: none; cursor: pointer; font-size: 12px;">刪除</button>
      </td>
    </tr>
  `).join("");
}

// 邏輯註解：快速登記學生示範
function quickAddStudent() {
  const actId = document.getElementById("activitySelector").value;
  const currentAct = activities.find(a => a.id === actId);
  const name = prompt("請輸入學生姓名：", "陳小明");
  if (!name) return;
  const cls = prompt("請輸入班別 (如 3A)：", "3A");
  const no = prompt("請輸入班號：", "1");

  studentRecords.push({
    actId: actId,
    year: currentAct.year,
    class: cls || "3A",
    classNo: Number(no) || 1,
    name: name,
    role: "參與者",
    hours: currentAct.hours,
    award: "-"
  });

  renderStudentRecords();
}

function removeStudentRecord(index) {
  if (confirm("確定移除該筆記錄？")) {
    studentRecords.splice(index, 1);
    renderStudentRecords();
  }
}

// 邏輯註解：一鍵匯出 Word 格式通告草稿 (.doc)
function downloadWordNotice() {
  const title = document.getElementById("actTitle").value;
  const noticeNo = document.getElementById("actNoticeNo").value;
  const organizer = document.getElementById("actOrganizer").value;
  const teacher = document.getElementById("actTeacher").value;
  const date = document.getElementById("actDate").value;
  const time = document.getElementById("actTime").value;
  const location = document.getElementById("actLocation").value;
  const attire = document.getElementById("actAttire").value;
  const fee = document.getElementById("actFee").value;
  const purpose = document.getElementById("actPurpose").value;

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: "MingLiU", "PMingLiU", "新細明體", serif; font-size: 11pt; line-height: 1.5; }
        .school-title { text-align: center; font-size: 13pt; font-weight: bold; }
        .meta-table { width: 100%; font-size: 9.5pt; margin-bottom: 15px; }
        .content-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .content-table td { border: 1px solid black; padding: 6px 8px; font-size: 10.5pt; }
        .cut-line { text-align: center; margin: 25px 0; border-bottom: 1px dashed black; }
      </style>
    </head>
    <body>
      <div class="school-title">HONG KONG RED SWASTIKA SOCIETY TAI PO SECONDARY SCHOOL</div>
      <div class="school-title">香港紅卍字會大埔卍慈中學</div>
      
      <table class="meta-table">
        <tr>
          <td>香港新界大埔富亨邨<br>電話：二六六六六八二一<br>編號：${noticeNo}</td>
          <td style="text-align: right; vertical-align: top;">Fu Heng Estate, Tai Po, New Territories, H.K.<br>Tel: 26666821</td>
        </tr>
      </table>

      <p>各位家長：</p>
      <p style="text-indent: 2em;">${purpose}，本校${organizer}將舉行「${title}」活動，有關詳情如下：</p>

      <table class="content-table">
        <tr><td style="width: 25%; font-weight: bold;">活動日期︰</td><td>${date}</td></tr>
        <tr><td style="font-weight: bold;">活動地點︰</td><td>${location}</td></tr>
        <tr><td style="font-weight: bold;">活動時間︰</td><td>${time}</td></tr>
        <tr><td style="font-weight: bold;">費　　用︰</td><td>${fee}</td></tr>
        <tr><td style="font-weight: bold;">服飾要求︰</td><td>${attire}</td></tr>
        <tr><td style="font-weight: bold;">備　　註︰</td><td>活動常因天氣或特殊情況而變動，請家長留意學校短訊。</td></tr>
      </table>

      <p style="text-indent: 2em;">請將回條填妥，並交回負責是項活動之 ${teacher} 老師。</p>
      <p style="text-indent: 2em;">如有疑問，歡迎與 ${teacher} 老師聯絡。</p>

      <table style="width: 100%; margin-top: 25px;">
        <tr>
          <td style="width: 70%;"></td>
          <td style="text-align: center;">校長<br><br><br><b>(施家祺)</b></td>
        </tr>
      </table>
      <p>${new Date().getFullYear()} 年 ${new Date().getMonth() + 1} 月 ${new Date().getDate()} 日</p>

      <div class="cut-line">---------------------------------------------------------------------------------------------------------------</div>

      <div style="margin-top: 15px;">
        <h3 style="text-align: center; margin-bottom: 10px;">回　條</h3>
        <p>本人 *同意 / 不同意 學生 ____________________ (S. ____________ ) 參加「${title}」活動，</p>
        <p>本人當囑咐學生要小心謹慎及聽從老師之指示，以防意外發生。</p>
        <p style="font-size: 9pt;">*請將不適用者刪去</p>
        
        <table style="width: 100%; margin-top: 30px;">
          <tr>
            <td>學生家長簽署︰ _________________________</td>
            <td style="text-align: right;">日　期： _______________</td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + wordContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${noticeNo}_${title}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 邏輯註解：渲染 SLP 概覽 (呈現標準 6A 莊梓樂範本)
function renderSlpPreview() {
  const container = document.getElementById("slpRenderContainer");
  container.innerHTML = `
    <div style="border: 1px solid #333; padding: 25px; margin-bottom: 20px;">
      <h2 style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 4px;">香港紅卍字會大埔卍慈中學</h2>
      <h3 style="text-align: center; font-size: 16px; font-weight: 600; margin-bottom: 15px;">學生學習概覽 (SLP)</h3>
      
      <p style="font-size: 13px; margin-bottom: 10px;">
        <strong>學生姓名：</strong> 莊梓樂 &nbsp;&nbsp;&nbsp;&nbsp; 
        <strong>身份證號碼：</strong> R8379075 &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>學校編號：</strong> 190730
      </p>

      <h4 style="font-size: 14px; font-weight: bold; margin: 15px 0 8px 0; border-bottom: 1px solid #ddd; padding-bottom: 4px;">其他學習經歷 (OLE) 與獎項</h4>
      <table class="data-table" style="font-size: 12px;">
        <thead>
          <tr>
            <th>活動項目</th>
            <th>學年</th>
            <th>角色</th>
            <th>舉辦單位</th>
            <th>主要範疇</th>
            <th>獎項 / 成就</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>田徑隊訓練</td><td>2025/2026</td><td>參與者</td><td>體育科</td><td>體育發展</td><td>-</td>
          </tr>
          <tr>
            <td>學生視覺藝術作品展</td><td>2024/2025</td><td>參與者</td><td>視覺藝術科</td><td>藝術發展</td><td>入圍獎</td>
          </tr>
          <tr>
            <td>「藍天綠地在香港」設計比賽</td><td>2023/2024</td><td>參與者</td><td>視覺藝術科</td><td>藝術發展</td><td>冠軍</td>
          </tr>
        </tbody>
      </table>

      <h4 style="font-size: 14px; font-weight: bold; margin: 20px 0 8px 0; border-bottom: 1px solid #ddd; padding-bottom: 4px;">學生的自述 (節錄)</h4>
      <p style="font-size: 12px; line-height: 1.8; color: #444; text-align: justify;">
        我是一個熱愛創作、對藝術充滿熱情的學生。在高中階段，我參與了各種藝術活動，創作了許多美術作品，這些包括紙質立體模型和平面插畫等。這些經歷增強了我的美術技能，激發了我對設計與藝術探索的熱情。
      </p>
    </div>
  `;
}

// 頁面初次載入
document.addEventListener("DOMContentLoaded", () => {
  syncActivityDropdown();
});
