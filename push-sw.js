/*
 * ADAM — عامل الإشعارات (Service Worker)
 * --------------------------------------
 * الملف ده بيفضل صاحي في الموبايل حتى والبرنامج مقفول، وأول ما
 * جوجل توصّل إشعار بيظهره. ولما العميل يدوس عليه بيفتح البرنامج.
 *
 * مهم: الملف ده مابيخزّنش أي صفحات (مفيش cache) — عشان أي تحديث
 * ترفعه على GitHub يوصل للناس فورًا زي ما هو.
 */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
  var payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (error) {
    payload = { data: { body: event.data ? event.data.text() : '' } };
  }

  // جوجل ممكن تبعت البيانات جوه data أو notification — بنقبل الاتنين
  var data = payload.data || {};
  var shown = payload.notification || {};
  var title = data.title || shown.title || payload.title || 'ADAM';
  var body = data.body || shown.body || payload.body || '';

  event.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: 'icon-192.png',
    badge: 'icon-badge.png',
    tag: data.tag || undefined,
    renotify: !!data.tag,
    dir: data.lang === 'en' ? 'ltr' : 'rtl',
    lang: data.lang || 'ar',
    data: { link: data.link || './' }
  }));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var link = new URL((event.notification.data && event.notification.data.link) || './', self.registration.scope).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      // البرنامج مفتوح أصلًا؟ نقدّمه بدل ما نفتح نسخة تانية
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf(self.registration.scope) === 0 && 'focus' in list[i]) {
          return list[i].focus();
        }
      }
      return self.clients.openWindow ? self.clients.openWindow(link) : null;
    })
  );
});