/* ADAM V5 - "back to the app" link for the prototype pages (builder, analytics, reports). Shown only when the page was opened from the app hub (?from=app).
   It only navigates to index.html; no data is read or written. */
(function () {
  'use strict';
  var q; try { q = new URLSearchParams(location.search); } catch (e) { return; }
  if (q.get('from') !== 'app') return;
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function paint() {
    var top = document.querySelector('.ax-top'); if (!top) return false;
    var a = top.querySelector('.ax-back');
    if (!a) {
      a = document.createElement('a'); a.className = 'ax-back'; a.href = 'index.html';
      a.style.cssText = 'display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 12px;border-radius:12px;border:1px solid var(--axline2);color:var(--axink);text-decoration:none;font-weight:700;margin-inline-end:10px;background:var(--axs1);white-space:nowrap;flex:none';
      top.insertBefore(a, top.firstChild);
    }
    a.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="transform:' + (lang() === 'ar' ? 'none' : 'scaleX(-1)') + '"><path d="M9 6l6 6l-6 6"/></svg><span>' + (lang() === 'ar' ? 'رجوع' : 'Back') + '</span>';
    return true;
  }
  function boot() { var n = 0; (function t() { if (!paint() && n++ < 40) setTimeout(t, 100); })(); new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
