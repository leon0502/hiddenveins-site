// 开发日志：EN / 中文 / 对照 切换（原生 JS，无外部依赖）
(function () {
  var root = document.documentElement;
  var btns = document.querySelectorAll('.view-toggle button');
  function setView(v) {
    if (v !== 'en' && v !== 'zh' && v !== 'both') v = 'both';
    root.setAttribute('data-view', v);
    root.setAttribute('lang', v === 'zh' ? 'zh-CN' : 'en');
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-view') === v ? 'true' : 'false'); });
    try { localStorage.setItem('hv-devlog-view', v); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('hv-devlog-view'); } catch (e) {}
  var q = new URLSearchParams(location.search).get('view');
  setView(q || saved || 'en');
  btns.forEach(function (b) { b.addEventListener('click', function () { setView(b.getAttribute('data-view')); }); });
})();
