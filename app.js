// 邏輯註解：初始模擬資料，取自上傳之 sample file.csv 與 SLP PDF
const initialRecords = [
  { year: "25/26", class: "3C", classNo: 28, name: "謝廣燊", role: "參與者", hours: 3, award: "-" },
  { year: "25/26", class: "3C", classNo: 14, name: "李文滔", role: "參與者", hours: 3, award: "-" },
  { year: "24/25", class: "3B", classNo: 5, name: "陳岸翔", role: "隊長", hours: 8, award: "碟賽殿軍" },
  { year: "24/25", class: "2A", classNo: 5, name: "詹浩文", role: "隊員", hours: 8, award: "碟賽殿軍" }
];

const slpOleList = [
  { title: "本地藝術團", year: "2025/2026", role: "參與者", organizer: "視覺藝術科", cat: "藝術發展", award: "-" },
  { title: "學生視覺藝術作品展", year: "2024/2025", role: "參與者", organizer: "視覺藝術科", cat: "藝術發展", award: "入圍獎" },
  { title: "「藍天綠地在香港」設計比賽", year: "2023/2024", role: "參與者", organizer: "視覺藝術科", cat: "藝術發展", award: "冠軍" },
  { title: "賽馬會學界足球挑戰盃", year: "2024/2025", role: "隊員", organizer: "體育科", cat: "體育發展", award: "碟賽殿軍" }
];

// 邏輯註解：分頁切換控制
function switchTab(tabName) {
  document.getElementById("tab-create-activity").classList.add("hidden");
  document.getElementById("tab-activity-list").classList.add("hidden");
  document.getElementById("tab-slp-generate").classList.add("hidden");

  document.getElementById(`tab-${tabName}`).classList.remove("hidden");
}

// 邏輯註解：生成通告草稿內容並顯示預覽
function generateNotice() {
  const noticeNo = document.getElementById("actNoticeNo").value;
  const title = document.getElementById("actTitle").value;
  const organizer = document.getElementById("actOrganizer").value;
  const teacher = document.getElementById("actTeacher").value;
  const date = document.getElementById("actDate").value;
  const category = document.getElementById("actCategory").value;
  const hours = document.getElementById("actHours").value;

  document.getElementById("pNoticeNo").innerText = noticeNo;
  document.getElementById("pOrganizer").innerText = organizer;
  document.getElementById("pTitle").innerText = title;
  document.getElementById("pReplyTitle").innerText = title;
  document.getElementById("pDate").innerText = date;
  document.getElementById("pCategory").innerText = category;
  document.getElementById("pHours").innerText = hours;
  document.getElementById("pTeacher").innerText = teacher;
  document.getElementById("pCurrentDate").innerText = new Date().toLocaleDateString('zh-HK');

  document.getElementById("noticePreviewWrapper").classList.remove("hidden");
  // 自動平滑滾動到預覽區
  document.getElementById("noticePreviewWrapper").scrollIntoView({ behavior: 'smooth' });
}

// 邏輯註解：渲染活動學生名單
function renderRecords() {
  const tbody = document.getElementById("studentRecordsBody");
  tbody.innerHTML = initialRecords.map(r => `
    <tr class="border-b hover:bg-gray-50">
      <td class="p-2">${r.year}</td>
      <td class="p-2">${r.class}</td>
      <td class="p-2">${r.classNo}</td>
      <td class="p-2 font-medium">${r.name}</td>
      <td class="p-2">${r.role}</td>
      <td class="p-2">${r.hours}</td>
      <td class="p-2"><span class="px-2 py-0.5 rounded text-xs ${r.award !== '-' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-gray-400'}">${r.award}</span></td>
      <td class="p-2"><button class="text-blue-600 hover:underline text-xs">修改</button></td>
    </tr>
  `).join("");
}

// 邏輯註解：渲染 SLP 第二頁的 OLE 項目
function renderSlpOle() {
  const tbody = document.getElementById("slpOleTableBody");
  tbody.innerHTML = slpOleList.map(item => `
    <tr class="border-b">
      <td class="border p-1.5 font-medium">${item.title}</td>
      <td class="border p-1.5">${item.year}</td>
      <td class="border p-1.5">${item.role}</td>
      <td class="border p-1.5">${item.organizer}</td>
      <td class="border p-1.5">${item.cat}</td>
      <td class="border p-1.5 font-semibold text-blue-700">${item.award}</td>
    </tr>
  `).join("");
}

// 頁面初始化
document.addEventListener("DOMContentLoaded", () => {
  renderRecords();
  renderSlpOle();
});
