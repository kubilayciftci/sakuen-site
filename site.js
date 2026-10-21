// TR / EN toggle: remembers the choice, otherwise follows the browser language.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("sakuen.lang"); } catch (e) {}
  var lang = saved || ((navigator.language || "tr").toLowerCase().indexOf("tr") === 0 ? "tr" : "en");

  function apply(next) {
    lang = next;
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.textContent = lang === "tr" ? "English" : "Türkçe";
    });
  }

  apply(lang);
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang-toggle]");
    if (!b) return;
    apply(lang === "tr" ? "en" : "tr");
    try { localStorage.setItem("sakuen.lang", lang); } catch (err) {}
  });
})();
