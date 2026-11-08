const $ = s => document.querySelector(s);
const T = {
  en: {
    brand: "Training 2026", lang: "العربية", add: "Add content", clear: "Clear content",
    anim: "CSS Animation", head: ["What is HTML?", "What is CSS?", "What is JavaScript?"], content: "Content", foot: "© 2026 Training 2026. All rights reserved.",
    menu: ["Dashboard", "HTML Folder", "CSS Style", "JavaScript Console", "Components", "Templates", "Snippets", "Projects", "Live Preview", "Responsive Design", "Color Patterns", "Typography", "Animation", "Debugger", "Settings"],
    info: [
      ["HTML (HyperText Markup Language) is the skeleton of every web page. It uses tags such as headings, paragraphs, links and images to describe what each piece of content is.",
       "Semantic elements like header, nav, main and footer give a page meaning, which helps search engines, screen readers and other developers understand your structure."],
      ["CSS (Cascading Style Sheets) controls how HTML looks: colors, fonts, spacing and layout. One stylesheet can restyle an entire website.",
       "Modern CSS offers Flexbox and Grid for layout, media queries for responsive design, and keyframe animations that bring pages to life without any scripting."],
      ["JavaScript is the programming language of the web. It runs in the browser, reacts to clicks and typing, and updates the page without reloading it.",
       "With the DOM, events and fetch requests, JavaScript can build menus, validate forms, load data from servers and power full applications."]]
  },
  ar: {
    brand: "تدريب 2026", lang: "English", add: "إضافة محتوى", clear: "مسح المحتوى",
    anim: "حركات CSS", head: ["ما هي HTML؟", "ما هي CSS؟", "ما هي جافاسكربت؟"], content: "محتوى", foot: "© 2026 تدريب 2026. جميع الحقوق محفوظة.",
    menu: ["لوحة التحكم", "مجلد HTML", "أنماط CSS", "وحدة تحكم جافاسكربت", "المكوّنات", "القوالب", "المقتطفات", "المشاريع", "المعاينة المباشرة", "التصميم المتجاوب", "أنماط الألوان", "الخطوط", "الحركة", "المصحّح", "الإعدادات"],
    info: [
      ["لغة HTML (لغة ترميز النص التشعبي) هي الهيكل الأساسي لكل صفحة ويب. تستخدم وسوماً مثل العناوين والفقرات والروابط والصور لوصف نوع كل جزء من المحتوى.",
       "تمنح العناصر الدلالية مثل header وnav وmain وfooter معنى للصفحة، مما يساعد محركات البحث وقارئات الشاشة والمطورين الآخرين على فهم بنيتها."],
      ["تتحكم CSS (أوراق الأنماط المتتالية) في مظهر عناصر HTML: الألوان والخطوط والمسافات والتخطيط. يمكن لملف أنماط واحد أن يغير تصميم موقع كامل.",
       "توفر CSS الحديثة Flexbox وGrid للتخطيط، واستعلامات الوسائط للتصميم المتجاوب، وحركات keyframes التي تضفي الحيوية على الصفحات دون أي برمجة."],
      ["جافاسكربت هي لغة البرمجة الخاصة بالويب. تعمل داخل المتصفح وتستجيب للنقرات والكتابة وتحدّث الصفحة دون إعادة تحميلها.",
       "عبر DOM والأحداث وطلبات fetch تستطيع جافاسكربت بناء القوائم والتحقق من النماذج وتحميل البيانات من الخوادم وتشغيل تطبيقات كاملة."]]
  }
};
const icons = ["solid gauge-high #e53935", "solid folder-open #fb8c00", "brands css3-alt #2965f1", "solid terminal #2e7d32", "solid puzzle-piece #8e24aa", "solid file-lines #00897b", "solid scissors #d81b60", "solid diagram-project #3949ab", "solid eye #00acc1", "solid mobile-screen #6d4c41", "solid palette #f4511e", "solid font #546e7a", "solid wand-magic-sparkles #ffb300", "solid bug #c62828", "solid gear #757575"];
const topics = [["HTML", "brands html5", "#e44d26", "#fff"], ["CSS", "brands css3-alt", "#2965f1", "#fff"], ["JavaScript", "brands js", "#f7df1e", "#222"]];
let L = "en", items = [], n = 0;

function render() {
  const t = T[L], d = document.documentElement;
  d.lang = L; d.dir = L == "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-k]").forEach(e => e.textContent = t[e.dataset.k]);
  $("#menu").innerHTML = icons.map((c, i) => { const [a, b, k] = c.split(" "); return `<a href="#"><i class="fa-${a} fa-${b}" style="color:${k}"></i><span>${t.menu[i]}</span></a>`; }).join("");
  $("#info").innerHTML = topics.map(([k, c, bg, fg], i) => { const [a, b] = c.split(" "); return `<section><h3>${t.head[i]}</h3>` + `<div class="row"><div class="sq" style="background:${bg};color:${fg}"><i class="fa-${a} fa-${b}"></i>${k}</div><div>${t.info[i].map(p => `<p>${p}</p>`).join("")}</div></div></section>`; }).join("");
  $("#extra").innerHTML = items.map(i => `<label class="chip"><input type="checkbox" data-i="${i}">${t.content} ${i}</label>`).join("");
}

$("#lang").onclick = () => { L = L == "en" ? "ar" : "en"; render(); };
$("#add").onclick = $("#fab").onclick = () => { items.push(++n); render(); };
$("#clr").onclick = () => { items = []; render(); };
$("#extra").onchange = e => setTimeout(() => { items = items.filter(i => i != e.target.dataset.i); render(); }, 180);

// resizable menu
const g = $(".grip");
g.onpointerdown = e => {
  g.setPointerCapture(e.pointerId);
  g.onpointermove = m => {
    const r = $("aside").getBoundingClientRect();
    document.body.style.setProperty("--mw", (L == "ar" ? r.right - m.clientX : m.clientX - r.left) + "px");
  };
  g.onpointerup = () => g.onpointermove = null;
};

// squares in the "video": same speed, evenly spaced in time, 2 of every 3 filled
for (let i = 0; i < 16; i++) {
  const s = [50, 100, 160][Math.floor(Math.random() * 3)], e = document.createElement("span");
  e.className = "leaf " + (i % 3 ? "f" : "o");
  e.style.cssText = `width:${s}px;height:${s}px;top:${Math.random() * 85}%;animation-delay:-${i * 1.5}s`;
  $("#vid").append(e);
}

// fall back to the hosted copy if heart.glb can't load (e.g. opened via file://)
$("#heart").addEventListener("error", () => $("#heart").src = "https://raw.githubusercontent.com/Nathandona/Google-DeepMind---Hackathon/main/realistic_human_heart.glb", { once: true });

render();
