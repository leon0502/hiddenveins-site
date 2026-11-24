(function () {
  var root = document.documentElement;
  var btn = document.getElementById('langToggle');
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l === 'zh' ? 'zh-CN' : 'en');
    btn.textContent = l === 'zh' ? 'EN' : '中文';
    try { localStorage.setItem('hv-lang', l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('hv-lang'); } catch (e) {}
  var q = new URLSearchParams(location.search).get('lang');
  setLang(q === 'en' || q === 'zh' ? q : (saved || 'en'));
  btn.addEventListener('click', function () {
    setLang(root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh');
  });

  // TODO: 邮件订阅后端 —— 目前只做前端校验，不发送任何数据
  var form = document.getElementById('subscribeForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var zh = root.getAttribute('data-lang') === 'zh';
    var email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = zh ? '请输入有效的邮箱地址。' : 'Please enter a valid email address.';
      return;
    }
    msg.textContent = zh ? '感谢！（草稿：订阅功能尚未接入）' : 'Thanks! (Draft: newsletter not connected yet.)';
    form.reset();
  });

  // 占位链接提示，避免误点跳顶
  document.querySelectorAll('a[data-todo]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (a.getAttribute('href') === '#') { e.preventDefault(); a.classList.add('nudge'); setTimeout(function(){a.classList.remove('nudge');}, 600); }
    });
  });
})();
