(function () {
  if (window.FormCraftWidgetLoaded) return;
  window.FormCraftWidgetLoaded = true;
  var current = document.currentScript;
  var slug = current && current.getAttribute('data-formcraft-slug');
  var base = current && current.getAttribute('data-formcraft-base');
  if (!slug) { console.error('FormCraft: missing data-formcraft-slug attribute.'); return; }
  if (!base) base = current && current.src ? new URL(current.src).origin : window.location.origin;
  base = base.replace(/\/$/, '');
  var style = document.createElement('style');
  style.textContent = '#formcraft-launcher{position:fixed;right:22px;bottom:22px;z-index:2147483000;width:58px;height:58px;border:0;border-radius:50%;background:#5b5ce2;color:#fff;box-shadow:0 8px 28px #171b3b35;cursor:pointer;font:24px Arial,sans-serif}#formcraft-panel{position:fixed;right:18px;bottom:92px;z-index:2147483000;width:min(390px,calc(100vw - 28px));height:min(680px,calc(100vh - 120px));border:1px solid #e4e7ef;border-radius:18px;background:#fff;box-shadow:0 18px 70px #171b3b30;overflow:hidden;display:none}#formcraft-panel iframe{width:100%;height:100%;border:0;background:transparent}#formcraft-panel.fc-open{display:block}@media(max-width:480px){#formcraft-panel{right:10px;bottom:82px;width:calc(100vw - 20px);height:min(650px,calc(100vh - 100px))}#formcraft-launcher{right:14px;bottom:14px}}';
  document.head.appendChild(style);
  var panel = document.createElement('div'); panel.id = 'formcraft-panel';
  var iframe = document.createElement('iframe'); iframe.title = 'FormCraft conversational form'; iframe.src = base + '/embed/' + encodeURIComponent(slug); iframe.loading = 'lazy'; iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  panel.appendChild(iframe); document.body.appendChild(panel);
  var button = document.createElement('button'); button.id = 'formcraft-launcher'; button.type = 'button'; button.setAttribute('aria-label','Open form'); button.setAttribute('aria-expanded','false'); button.innerHTML = '&#128172;';
  button.addEventListener('click', function () { var open = panel.classList.toggle('fc-open'); button.setAttribute('aria-expanded',String(open)); button.innerHTML = open ? '&times;' : '&#128172;'; });
  document.body.appendChild(button);
})();
