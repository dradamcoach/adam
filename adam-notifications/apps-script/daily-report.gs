/*
 * ADAM — التقرير اليومي التلقائي
 * ================================
 * الملف ده بيشتغل على Google Apps Script (مجاني تمامًا — من غير كارت
 * ائتمان ومن غير سيرفر تشغّله انت). كل يوم في الميعاد اللي تحدده:
 *
 *   1) بيقرا بيانات موقعك من Firestore
 *   2) بيحسب اللي حصل في آخر ٢٤ ساعة
 *   3) بيبعتلك إيميل منسّق فيه الأرقام والتنبيهات
 *   4) (اختياري) بيبعتلك نفس الملخّص على واتساب
 *
 * خطوات التركيب كاملة بالتفصيل في ملف DAILY_REPORT_SETUP.md
 *
 * ⚠️ مهم: مفتاح حساب الخدمة (Service Account) مايتكتبش هنا في الكود
 * خالص — بيتحط في Script Properties زي ما الشرح بيقول. لو كتبته هنا
 * وشاركت الملف، أي حد هياخده يقدر يقرا كل بيانات عملائك.
 */

/* ==================== الإعدادات ==================== */

const PROJECT_ID = 'adam-32e6c';

// الإيميل اللي التقرير هيوصله
const REPORT_EMAIL = 'dra3nany@gmail.com';

// اسم الموقع زي ما هتحب يظهر في عنوان الرسالة
const SITE_NAME = 'ADAM';

// لو عايز التقرير بالإنجليزي غيّرها لـ 'en'
const REPORT_LANG = 'ar';

/* ==================== نصوص التقرير ==================== */

const TXT = {
  ar: {
    subject: 'تقرير ADAM اليومي',
    heading: 'تقرير آخر ٢٤ ساعة',
    numbers: 'الأرقام',
    newClients: 'عملاء جداد',
    newLeads: 'رسايل تواصل جديدة',
    newInjuries: 'بلاغات إصابة',
    newConsults: 'طلبات استشارة',
    newOrders: 'طلبات متجر',
    totalClients: 'إجمالي العملاء',
    totalProviders: 'إجمالي المدربين والمتخصصين',
    activeClients: 'عملاء نشطين (دخلوا آخر ٧ أيام)',
    needsYou: 'محتاج تدخّل منك',
    allClear: 'مفيش حاجة مستنية منك — كل حاجة تمام ✅',
    alertInjuries: 'بلاغ إصابة لسه محدش رد عليه',
    alertLeads: 'رسالة تواصل جديدة مستنية رد',
    alertConsults: 'طلب استشارة مستني رد',
    alertPayments: 'دفعة مستنية مراجعتك',
    alertOrders: 'طلب متجر جديد',
    alertTrials: 'عميل تجربته بتخلص خلال ٣ أيام',
    alertClearance: 'طلب إذن طبي مستني رد من دكتور',
    clearanceDecided: 'قرارات إذن طبي',
    clearanceList: 'قرارات الإذن الطبي آخر ٢٤ ساعة',
    clearancePendingList: 'طلبات إذن مستنية رد',
    st_cleared: 'موافق',
    st_restricted: 'موافق بشروط',
    st_denied: 'مرفوض حاليًا',
    newLeadsList: 'الرسايل الجديدة',
    newClientsList: 'العملاء الجداد',
    footer: 'التقرير ده بيتبعت تلقائي كل يوم من Google Apps Script.',
    errorSubject: 'مشكلة في تقرير ADAM اليومي'
  },
  en: {
    subject: 'ADAM daily report',
    heading: 'Last 24 hours',
    numbers: 'Numbers',
    newClients: 'New clients',
    newLeads: 'New contact messages',
    newInjuries: 'Injury reports',
    newConsults: 'Consult requests',
    newOrders: 'Store orders',
    totalClients: 'Total clients',
    totalProviders: 'Total coaches & specialists',
    activeClients: 'Active clients (last 7 days)',
    needsYou: 'Needs your attention',
    allClear: 'Nothing waiting on you — all clear ✅',
    alertInjuries: 'injury report(s) with no reply yet',
    alertLeads: 'new contact message(s) waiting',
    alertConsults: 'consult request(s) waiting',
    alertPayments: 'payment(s) waiting for review',
    alertOrders: 'new store order(s)',
    alertTrials: 'client trial(s) ending within 3 days',
    alertClearance: 'medical clearance request awaiting a doctor',
    clearanceDecided: 'Clearance decisions',
    clearanceList: 'Clearance decisions in the last 24h',
    clearancePendingList: 'Clearance requests awaiting a reply',
    st_cleared: 'Approved',
    st_restricted: 'Approved with limits',
    st_denied: 'Not approved yet',
    newLeadsList: 'New messages',
    newClientsList: 'New clients',
    footer: 'This report is sent automatically every day by Google Apps Script.',
    errorSubject: 'ADAM daily report failed'
  }
};

function T(key) {
  return (TXT[REPORT_LANG] && TXT[REPORT_LANG][key]) || TXT.ar[key] || key;
}

/* ==================== الدخول على Firestore ==================== */

/*
 * بنستعمل حساب خدمة (Service Account) عشان نقرا من Firestore.
 * بنعمل JWT ونوقّعه بالمفتاح الخاص، وجوجل بترجّعلنا توكن صالح ساعة.
 */
function getAccessToken_(scope) {
  scope = scope || 'https://www.googleapis.com/auth/datastore';
  const raw = PropertiesService.getScriptProperties().getProperty('SERVICE_ACCOUNT_JSON');
  if (!raw) {
    throw new Error('مفيش SERVICE_ACCOUNT_JSON في Script Properties — راجع خطوة 3 في ملف الشرح');
  }

  const key = JSON.parse(raw);
  const now = Math.floor(Date.now() / 1000);

  const header = Utilities.base64EncodeWebSafe(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = Utilities.base64EncodeWebSafe(JSON.stringify({
    iss: key.client_email,
    scope: scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }));

  const toSign = header + '.' + claim;
  const signature = Utilities.base64EncodeWebSafe(
    Utilities.computeRsaSha256Signature(toSign, key.private_key)
  );

  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method: 'post',
    payload: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: toSign + '.' + signature
    },
    muteHttpExceptions: true
  });

  const body = JSON.parse(response.getContentText());
  if (!body.access_token) {
    throw new Error('فشل تسجيل الدخول لجوجل: ' + response.getContentText());
  }
  return body.access_token;
}

/* Firestore بترجّع القيم بشكل { stringValue: '...' } — بنحوّلها لقيم عادية */
function parseValue_(value) {
  if (value === null || value === undefined) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return Number(value.doubleValue);
  if ('booleanValue' in value) return value.booleanValue;
  if ('timestampValue' in value) return value.timestampValue;
  if ('nullValue' in value) return null;
  if ('mapValue' in value) return parseFields_(value.mapValue.fields || {});
  if ('arrayValue' in value) {
    return (value.arrayValue.values || []).map(parseValue_);
  }
  return null;
}

function parseFields_(fields) {
  const out = {};
  Object.keys(fields).forEach(function (key) {
    out[key] = parseValue_(fields[key]);
  });
  return out;
}

/* بتجيب كل مستندات مجموعة (بتتعامل مع الصفحات لو المجموعة كبيرة) */
function fetchCollection_(name, token) {
  const base = 'https://firestore.googleapis.com/v1/projects/' + PROJECT_ID
    + '/databases/(default)/documents/' + name + '?pageSize=300';

  const results = [];
  let pageToken = '';

  for (let guard = 0; guard < 20; guard++) {
    const url = base + (pageToken ? '&pageToken=' + encodeURIComponent(pageToken) : '');
    const response = UrlFetchApp.fetch(url, {
      headers: { Authorization: 'Bearer ' + token },
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200) {
      // مجموعة لسه مفيهاش أي مستند بترجّع 200 وجسم فاضي — أي كود تاني
      // معناه مشكلة حقيقية، بس مانوقفش التقرير كله عشانها
      Logger.log('تحذير: فشلت قراءة ' + name + ' — ' + response.getContentText());
      return results;
    }

    const body = JSON.parse(response.getContentText());
    (body.documents || []).forEach(function (docItem) {
      const id = docItem.name.split('/').pop();
      results.push(Object.assign({ _id: id }, parseFields_(docItem.fields || {})));
    });

    pageToken = body.nextPageToken || '';
    if (!pageToken) break;
  }

  return results;
}

/* ==================== حساب التقرير ==================== */

function isoDaysAgo_(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function countSince_(list, since, field) {
  const key = field || 'createdAt';
  return list.filter(function (item) {
    const stamp = item[key] || '';
    return stamp && stamp >= since;
  }).length;
}

function buildReport_() {
  const token = getAccessToken_();
  const since24 = isoDaysAgo_(1);
  const since7 = isoDaysAgo_(7);

  const clients = fetchCollection_('clients', token);
  const providers = fetchCollection_('providers', token);
  const leads = fetchCollection_('leads', token);
  const injuries = fetchCollection_('injuryReports', token);
  const consults = fetchCollection_('consultRequests', token);
  const orders = fetchCollection_('storeOrders', token);
  const health = fetchCollection_('health', token);

  // الدفعات المستنية مخزّنة جوه مستند العميل/المتخصص نفسه
  const pendingPayments = clients.concat(providers).filter(function (item) {
    return item.pendingPayment && item.pendingPayment.status === 'submitted';
  });

  // تجارب مجانية بتخلص خلال ٣ أيام (التجربة ٣٠ يوم من trialStartedAt)
  const today = new Date();
  const endingTrials = clients.filter(function (c) {
    if (!c.trialStartedAt || c.accessOverride) return false;
    const start = new Date(c.trialStartedAt);
    if (isNaN(start.getTime())) return false;
    const daysUsed = Math.floor((today - start) / 86400000);
    return daysUsed >= 27 && daysUsed <= 30;
  });

  /*
   * الإذن الطبي: الطلبات المستنية رد، والقرارات اللي اتاخدت في آخر
   * ٢٤ ساعة. ده أهم بند في التقرير — حالة مرضية أو حمل مستنية دكتور
   */
  const clearanceReqs = consults.filter(function (c) { return c.kind === 'clearance'; });
  const pendingClearance = clearanceReqs.filter(function (c) { return (c.status || 'pending') !== 'answered'; });
  const clientNameOf = function (email) {
    const hit = clients.filter(function (c) { return c.email === email || c.id === email; })[0];
    return (hit && hit.name) || email;
  };
  const decidedClearance = health.filter(function (h) {
    return h.clearance && h.clearance.at && h.clearance.at >= isoDaysAgo_(1).slice(0, 10);
  }).map(function (h) {
    return {
      name: clientNameOf(h.id),
      status: h.clearance.status,
      by: h.clearance.by,
      note: h.clearance.note || ''
    };
  });

  const newLeads = leads.filter(function (l) { return !l.contacted && !l.accepted; });
  const newClients = clients.filter(function (c) {
    return (c.createdAt || '') >= since24;
  });

  return {
    numbers: [
      { label: T('newClients'), value: newClients.length },
      { label: T('newLeads'), value: countSince_(leads, since24) },
      { label: T('newInjuries'), value: countSince_(injuries, since24) },
      { label: T('newConsults'), value: countSince_(consults, since24) },
      { label: T('newOrders'), value: countSince_(orders, since24) },
      { label: T('clearanceDecided'), value: decidedClearance.length },
      { label: T('totalClients'), value: clients.length },
      { label: T('totalProviders'), value: providers.length },
      {
        label: T('activeClients'),
        value: clients.filter(function (c) { return (c.lastActiveAt || '') >= since7; }).length
      }
    ],
    alerts: [
      {
        n: injuries.filter(function (r) { return (r.status || 'requested') === 'requested'; }).length,
        text: T('alertInjuries')
      },
      { n: newLeads.length, text: T('alertLeads') },
      {
        n: consults.filter(function (r) { return (r.status || 'pending') === 'pending'; }).length,
        text: T('alertConsults')
      },
      { n: pendingPayments.length, text: T('alertPayments') },
      {
        n: orders.filter(function (o) { return (o.status || 'new') === 'new'; }).length,
        text: T('alertOrders')
      },
      { n: endingTrials.length, text: T('alertTrials') },
      { n: pendingClearance.length, text: T('alertClearance') }
    ].filter(function (row) { return row.n > 0; }),
    newLeads: newLeads.slice(0, 10),
    newClients: newClients.slice(0, 10),
    clearance: decidedClearance.slice(0, 10),
    pendingClearance: pendingClearance.slice(0, 10)
  };
}

/* ==================== شكل الإيميل ==================== */

function buildHtml_(report) {
  const dir = REPORT_LANG === 'ar' ? 'rtl' : 'ltr';
  const parts = [];

  parts.push('<div dir="' + dir + '" style="font-family:system-ui,Segoe UI,Arial,sans-serif;'
    + 'background:#0f172a;color:#e2e8f0;padding:24px;border-radius:14px;max-width:620px">');
  parts.push('<h2 style="color:#22c55e;margin:0 0 4px">' + SITE_NAME + ' — ' + T('heading') + '</h2>');
  parts.push('<div style="color:#94a3b8;font-size:13px;margin-bottom:18px">'
    + new Date().toLocaleString(REPORT_LANG === 'ar' ? 'ar-EG' : 'en-GB') + '</div>');

  // التنبيهات الأول — دي أهم حاجة في التقرير
  parts.push('<h3 style="color:#e2e8f0;font-size:15px;margin:0 0 8px">' + T('needsYou') + '</h3>');
  if (!report.alerts.length) {
    parts.push('<div style="color:#22c55e;font-size:14px;margin-bottom:18px">' + T('allClear') + '</div>');
  } else {
    parts.push('<div style="background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.35);'
      + 'border-radius:10px;padding:12px 14px;margin-bottom:18px">');
    report.alerts.forEach(function (row) {
      parts.push('<div style="color:#fbbf24;font-size:14px;line-height:2">• <b>' + row.n + '</b> ' + row.text + '</div>');
    });
    parts.push('</div>');
  }

  // الأرقام
  parts.push('<h3 style="color:#e2e8f0;font-size:15px;margin:0 0 8px">' + T('numbers') + '</h3>');
  parts.push('<table style="width:100%;border-collapse:collapse;margin-bottom:18px">');
  report.numbers.forEach(function (row) {
    parts.push('<tr>'
      + '<td style="padding:7px 10px;border-bottom:1px solid #1e293b;font-size:14px">' + row.label + '</td>'
      + '<td style="padding:7px 10px;border-bottom:1px solid #1e293b;font-size:16px;font-weight:700;'
      + 'color:#22c55e;text-align:' + (REPORT_LANG === 'ar' ? 'left' : 'right') + '">' + row.value + '</td>'
      + '</tr>');
  });
  parts.push('</table>');

  /*
   * الإذن الطبي أول حاجة بعد الأرقام — ده البند اللي فيه حالة
   * مرضية أو حمل مستنية قرار، وماينفعش يتأخر
   */
  if (report.pendingClearance && report.pendingClearance.length) {
    parts.push('<h3 style="color:#fbbf24;font-size:15px;margin:0 0 8px">⚠️ ' + T('clearancePendingList') + '</h3>');
    report.pendingClearance.forEach(function (row) {
      parts.push('<div style="background:#2a2213;border:1px solid #57451a;border-radius:10px;padding:10px 12px;margin-bottom:8px;font-size:13.5px">'
        + '<b>' + (row.clientName || row.clientEmail || '') + '</b><br>'
        + '<span style="color:#cbd5e1">' + (row.text || '') + '</span>'
        + '</div>');
    });
  }

  if (report.clearance && report.clearance.length) {
    parts.push('<h3 style="color:#e2e8f0;font-size:15px;margin:14px 0 8px">' + T('clearanceList') + '</h3>');
    report.clearance.forEach(function (row) {
      var colour = row.status === 'cleared' ? '#22c55e' : (row.status === 'denied' ? '#ef4444' : '#fbbf24');
      parts.push('<div style="background:#1e293b;border-inline-start:3px solid ' + colour + ';border-radius:10px;padding:10px 12px;margin-bottom:8px;font-size:13.5px">'
        + '<b>' + row.name + '</b> — <span style="color:' + colour + '">' + T('st_' + row.status) + '</span><br>'
        + '<span style="color:#94a3b8">' + (row.by || '') + (row.note ? ' — ' + row.note : '') + '</span>'
        + '</div>');
    });
  }

  // تفاصيل الرسايل الجديدة عشان ترد عليها من الإيميل على طول
  if (report.newLeads.length) {
    parts.push('<h3 style="color:#e2e8f0;font-size:15px;margin:0 0 8px">' + T('newLeadsList') + '</h3>');
    report.newLeads.forEach(function (lead) {
      parts.push('<div style="background:#1e293b;border-radius:10px;padding:10px 12px;margin-bottom:8px;font-size:13.5px">'
        + '<b>' + (lead.name || '') + '</b><br>'
        + (lead.phone ? lead.phone + '<br>' : '')
        + (lead.email ? lead.email + '<br>' : '')
        + '<span style="color:#94a3b8">' + (lead.message || '') + '</span>'
        + '</div>');
    });
  }

  if (report.newClients.length) {
    parts.push('<h3 style="color:#e2e8f0;font-size:15px;margin:14px 0 8px">' + T('newClientsList') + '</h3>');
    report.newClients.forEach(function (client) {
      parts.push('<div style="font-size:13.5px;line-height:1.9">• ' + (client.name || client._id)
        + ' <span style="color:#94a3b8">' + (client.email || client._id) + '</span></div>');
    });
  }

  parts.push('<div style="color:#64748b;font-size:11.5px;margin-top:20px;border-top:1px solid #1e293b;'
    + 'padding-top:12px">' + T('footer') + '</div>');
  parts.push('</div>');

  return parts.join('');
}

/* نسخة نصية قصيرة — بتستعمل في واتساب وكنسخة احتياطية في الإيميل */
function buildPlainText_(report) {
  const lines = [SITE_NAME + ' — ' + T('heading'), ''];

  if (!report.alerts.length) {
    lines.push(T('allClear'));
  } else {
    lines.push(T('needsYou') + ':');
    report.alerts.forEach(function (row) { lines.push('• ' + row.n + ' ' + row.text); });
  }

  lines.push('', T('numbers') + ':');
  report.numbers.forEach(function (row) { lines.push('- ' + row.label + ': ' + row.value); });

  return lines.join('\n');
}

/* ==================== واتساب (اختياري) ==================== */

/*
 * بيشتغل بس لو حطيت WHATSAPP_TOKEN و WHATSAPP_PHONE_ID و WHATSAPP_TO
 * في Script Properties. لو مش موجودين بيعدّي من غير ما يعمل مشكلة،
 * والإيميل بيتبعت عادي.
 *
 * ⚠️ واتساب بيحاسب على الرسايل اللي بتبدأها انت (مش رد على رسالة
 * العميل) — تقرير يومي ≈ دولار في الشهر. الإيميل مجاني تمامًا.
 */
function sendWhatsApp_(text) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('WHATSAPP_TOKEN');
  const phoneId = props.getProperty('WHATSAPP_PHONE_ID');
  const to = props.getProperty('WHATSAPP_TO');

  if (!token || !phoneId || !to) return false;

  const response = UrlFetchApp.fetch(
    'https://graph.facebook.com/v21.0/' + phoneId + '/messages',
    {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + token },
      payload: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: text }
      }),
      muteHttpExceptions: true
    }
  );

  if (response.getResponseCode() >= 300) {
    Logger.log('واتساب فشل: ' + response.getContentText());
    return false;
  }
  return true;
}

/* ==================== الدالة الرئيسية ==================== */

/*
 * دي اللي بتشتغل كل يوم. لو عايز تجربها بإيدك: اختارها من القائمة
 * فوق في Apps Script ودوس Run.
 */
function sendDailyReport() {
  try {
    const report = buildReport_();
    const html = buildHtml_(report);
    const plain = buildPlainText_(report);

    MailApp.sendEmail({
      to: REPORT_EMAIL,
      subject: T('subject') + ' — ' + new Date().toLocaleDateString(REPORT_LANG === 'ar' ? 'ar-EG' : 'en-GB'),
      htmlBody: html,
      body: plain
    });

    sendWhatsApp_(plain);
    Logger.log('اتبعت ✅');
  } catch (error) {
    // لو حصل أي خطأ، ابعتلي إيميل بيه بدل ما التقرير يختفي في صمت
    MailApp.sendEmail(REPORT_EMAIL, T('errorSubject'), String(error && error.stack ? error.stack : error));
    throw error;
  }
}

/*
 * شغّل الدالة دي مرة واحدة بس بإيدك عشان تظبط الجدولة اليومية.
 * هتبعت التقرير كل يوم الساعة ٨ الصبح بتوقيت المشروع.
 */
function createDailyTrigger() {
  // بنمسح أي جدولة قديمة الأول عشان مايتبعتش أكتر من تقرير
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'sendDailyReport') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('sendDailyReport')
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .create();

  Logger.log('اتظبطت الجدولة — التقرير هيوصلك كل يوم الساعة ٨ الصبح');
}

/*
 * تجربة سريعة من غير ما تبعت أي حاجة — بتطبع التقرير في السجل
 * (View → Logs) عشان تتأكد إن قراءة البيانات شغالة صح.
 */
function testReadOnly() {
  const report = buildReport_();
  Logger.log(buildPlainText_(report));
}

/* ============================================================
   الرسالة الترحيبية التلقائية
   ============================================================

   الجزء ده بيخلي أي حد يسيب إيميله في صفحة ADAM يوصله شرح كامل
   عن البرنامج فورًا — من غير ما تستنى إنك تفضى ترد.

   خطوات التفعيل (مرة واحدة):
   1) من Apps Script: Deploy ← New deployment ← اختار "Web app"
      • Execute as: Me
      • Who has access: Anyone
      ودوس Deploy، وانسخ الرابط اللي هيطلعلك.
   2) من ADAM: لوحة التحكم ← "الرسالة الترحيبية التلقائية"
      ألصق الرابط وفعّل السويتش.

   ملحوظة: كلمة السر المشتركة اتشالت. كانت بتنزل على متصفح أي
   زائر، يعني مش سر أصلًا. بدالها بنتأكد بنفسنا إن الإيميل ده
   سايب رسالة فعلًا عندنا، وحطينا حد أقصى للرسايل — الشرح في
   قسم handleWelcome_ تحت.

   ⚠️ كل ما تعدّل الكود، لازم تعمل Deploy تاني (New version) عشان
   التعديل يوصل للرابط.
*/
const WELCOME_FROM_NAME = 'ADAM';
const WHATSAPP_NUMBER = '201090941999';        /* رقمك بالكود الدولي من غير + */

/* ============================================================
   الباب الوحيد للطلبات الجاية من التطبيق
   فيه حاجتين: الرسالة الترحيبية، ورد المساعد الذكي على العميل.
   الاتنين مختلفين في طريقة التأمين عن قصد:
   • الترحيب: بيتبعت من زائر لسه مسجّلش، فمحصّن بكلمة سر بس
   • الشات: العميل مسجّل دخول، فبنتأكد من هويته الحقيقية من فايربيز
     نفسها — مش بكلمة سر ممكن أي حد ياخدها من المتصفح
   ============================================================ */
/*
 * افتح رابط الـ Web App في المتصفح عادي وهيطلعلك الحالة.
 * مفيش أي سر بيتعرض — بولينز بس (متحطّط ولا لأ).
 * وده كمان بيمنع سطر "doGet Failed" اللي كان بيظهر في Executions
 * كل ما حد يفتح الرابط
 */
var SCRIPT_BUILD = '2026-09-23-push-v1';

function doGet() {
  var status = {
    ok: true,
    build: SCRIPT_BUILD,
    geminiKeySet: !!aiProp_('GEMINI_KEY'),
    firebaseKeySet: !!aiProp_('FIREBASE_API_KEY'),
    model: aiModel_(),
    handlesAiChat: (typeof handleAiChat_ === 'function'),
    handlesPush: (typeof handlePush_ === 'function'),
    serviceAccountSet: !!aiProp_('SERVICE_ACCOUNT_JSON')
  };
  status.aiReady = status.geminiKeySet && status.firebaseKeySet && status.handlesAiChat;
  return ContentService.createTextOutput(JSON.stringify(status, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var out = { ok: false };
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action || 'welcome';

    if (action === 'ai_chat') {
      out = handleAiChat_(body);
    } else if (action === 'push') {
      out = handlePush_(body);
    } else {
      out = handleWelcome_(body);
    }
  } catch (err) {
    out.error = String(err);
  }
  out.build = SCRIPT_BUILD;
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ============================================================
   المساعد الذكي — مجانًا عن طريق Gemini
   ------------------------------------------------------------
   إعداد مرة واحدة، من Apps Script نفسه:
   Project Settings ← Script properties ← ضيف الاتنين دول:
     GEMINI_KEY       = المفتاح من  https://aistudio.google.com/apikey
     FIREBASE_API_KEY = نفس apiKey اللي في firebase-config.js
   ما تكتبش أي مفتاح في الكود نفسه ولا في GitHub.
   ============================================================ */

var AI_DAILY_LIMIT = 30;          /* أقصى عدد رسايل للعميل الواحد في اليوم */
/*
 * جوجل بتوقف النماذج القديمة كل فترة. gemini-2.0-flash اتوقف فعلًا
 * ورجّع 404 وقال استعمل gemini-3.6-flash. عشان ما نقعدش نطارد كل
 * مرة: الاسم بيتقرا من Script property اسمها GEMINI_MODEL لو
 * موجودة، ولو النموذج اتوقف الكود بيقرا البديل من رسالة جوجل
 * نفسها ويجرّبه مرة واحدة — ويكتبلك في الـlog تغيّره في الإعدادات
 */
var AI_MODEL_DEFAULT = 'gemini-3.6-flash';

function aiModel_() {
  return aiProp_('GEMINI_MODEL') || AI_MODEL_DEFAULT;
}

function aiProp_(name) {
  return PropertiesService.getScriptProperties().getProperty(name) || '';
}

/*
 * بنتأكد إن اللي بيكلمنا هو فعلاً صاحب الحساب ده: بناخد توكن
 * الدخول اللي فايربيز إداهوله وبنسأل فايربيز نفسها هو بتاع مين.
 * كده مفيش كلمة سر مشتركة ممكن تتسرق من المتصفح
 */
function verifyIdToken_(idToken) {
  var key = aiProp_('FIREBASE_API_KEY');
  if (!key || !idToken) return '';
  try {
    var res = UrlFetchApp.fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + encodeURIComponent(key),
      {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({ idToken: idToken }),
        muteHttpExceptions: true
      });
    if (res.getResponseCode() !== 200) return '';
    var data = JSON.parse(res.getContentText());
    var user = (data.users || [])[0];
    return (user && user.email) ? String(user.email).toLowerCase() : '';
  } catch (err) {
    return '';
  }
}

/* حد أقصى للرسايل في اليوم لكل عميل — عشان حد ميستهلكش الحصة كلها */
function aiUnderLimit_(email) {
  var cache = CacheService.getScriptCache();
  var key = 'ai:' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd') + ':' + email;
  var used = Number(cache.get(key) || 0);
  if (used >= AI_DAILY_LIMIT) return false;
  cache.put(key, String(used + 1), 60 * 60 * 24);
  return true;
}

/*
 * مهم تعرف: "Completed" في صفحة Executions معناها إن الدالة ما
 * رمتش خطأ — مش معناها إن الرد اتبعت. الطلب ممكن يترفض ويرجع
 * ok:false وتفضل مكتوبة Completed. عشان كده كل سبب رفض بيتكتب
 * هنا في الـ log، فتفتح التشغيل وتشوف بعينك وقف عند فين
 */
function aiReject_(reason) {
  Logger.log('AI_CHAT رفض: ' + reason);
  return { ok: false, error: reason };
}

function handleAiChat_(body) {
  var geminiKey = aiProp_('GEMINI_KEY');
  if (!geminiKey) return aiReject_('GEMINI_KEY مش متحطّط في Script properties');

  if (!aiProp_('FIREBASE_API_KEY')) {
    return aiReject_('FIREBASE_API_KEY مش متحطّط في Script properties');
  }

  var email = verifyIdToken_(body.idToken);
  if (!email) return aiReject_('توكن الدخول مش مقبول — اتأكد إن FIREBASE_API_KEY هو نفسه apiKey اللي في firebase-config.js');

  /* العميل يسأل في شاته هو بس */
  if (String(body.clientEmail || '').toLowerCase() !== email) {
    return aiReject_('الشات مش بتاع الحساب ده: ' + email + ' ≠ ' + body.clientEmail);
  }
  if (!aiUnderLimit_(email)) return aiReject_('عدّى الحد اليومي: ' + email);

  var question = String(body.text || '').slice(0, 1200);
  if (!question) return aiReject_('الرسالة فاضية');

  var reply = askGemini_(question, body.context || {}, body.lang === 'en' ? 'en' : 'ar', geminiKey);
  if (!reply) return aiReject_('جيمناي رجع فاضي — شوف السطر اللي فوق ده');

  Logger.log('AI_CHAT تمام: رد بطول ' + reply.length + ' حرف لـ ' + email);
  return { ok: true, reply: reply };
}

function aiSystemPrompt_(ctx, lang) {
  var ar = lang !== 'en';
  var who = [];
  if (ctx.name) who.push(ar ? ('اسمه: ' + ctx.name) : ('Name: ' + ctx.name));
  if (ctx.goal) who.push(ar ? ('هدفه: ' + ctx.goal) : ('Goal: ' + ctx.goal));
  if (ctx.sport) who.push(ar ? ('رياضته: ' + ctx.sport) : ('Sport: ' + ctx.sport));
  if (ctx.trainingDays) who.push(ar ? ('بيتمرن ' + ctx.trainingDays + ' يوم في الأسبوع') : ('Trains ' + ctx.trainingDays + ' days/week'));

  if (ar) {
    return [
      'إنت المساعد الذكي جوه تطبيق ADAM، منصة تدريب وتأهيل وتغذية مصرية.',
      'بتتكلم مصري بسيط وودود، وبترد باختصار (٣ لـ ٦ أسطر).',
      'اللي قدامك عميل مشترك ومعاه مدرب وفريق متخصصين حقيقيين.',
      who.length ? ('اللي تعرفه عنه: ' + who.join(' · ')) : '',
      '',
      'قواعد لازم تلتزم بيها:',
      '• إنت مش دكتور ومش بتشخّص ومش بتوصف دوا. لو السؤال طبي أو فيه ألم',
      '  أو أعراض، قول له بوضوح إن ده يترد عليه من فريقه الطبي جوه التطبيق',
      '  واطلب منه يبعتلهم — وما تديش تشخيص ولا علاج.',
      '• ما تغيّرش برنامجه ولا أكله من عندك. البرنامج بيكتبه مدربه.',
      '  تقدر تشرحله تمرين، أو تفهّمه معلومة، أو تساعده يستخدم التطبيق.',
      '• لو مش متأكد، قول مش متأكد وحوّله لمدربه. ما تخترعش أرقام.',
      '• ما تتكلمش في حاجة خارج التمرين والتغذية والتأهيل واستخدام التطبيق.'
    ].filter(String).join('\n');
  }
  return [
    'You are the AI assistant inside ADAM, an Egyptian training, rehab and nutrition platform.',
    'Speak simply and warmly, and keep replies short (3-6 lines).',
    'You are talking to a subscribed client who has a real coach and specialist team.',
    who.length ? ('What you know about them: ' + who.join(' · ')) : '',
    '',
    'Rules you must follow:',
    '• You are not a doctor. You do not diagnose and do not prescribe. If the question',
    '  is medical or involves pain or symptoms, say plainly that their medical team',
    '  inside the app answers that, and ask them to message the team. No diagnosis.',
    '• Do not change their program or their food. Their coach writes that.',
    '  You can explain an exercise, teach a concept, or help them use the app.',
    '• If you are unsure, say so and point them to their coach. Never invent numbers.',
    '• Stay on training, nutrition, rehab and using the app.'
  ].filter(String).join('\n');
}

function askGemini_(question, ctx, lang, key) {
  var out = callGemini_(question, ctx, lang, key, aiModel_());
  if (out.text) return out.text;

  /* النموذج اتوقف؟ جوجل بتقول البديل في الرسالة — بنجرّبه */
  var suggested = suggestedModelFrom_(out.body);
  if (suggested && suggested !== aiModel_()) {
    Logger.log('النموذج اتوقف. بجرّب البديل اللي جوجل اقترحته: ' + suggested);
    var retry = callGemini_(question, ctx, lang, key, suggested);
    if (retry.text) {
      Logger.log('اشتغل بـ ' + suggested + ' — حط GEMINI_MODEL = ' + suggested
        + ' في Script properties عشان ما يجربش مرتين كل مرة');
      return retry.text;
    }
  }
  return '';
}

/* بيطلع اسم النموذج البديل من رسالة الخطأ: "...use models/xxx for..." */
function suggestedModelFrom_(body) {
  if (!body) return '';
  var m = String(body).match(/models\/([A-Za-z0-9._-]+)/g);
  if (!m) return '';
  for (var i = 0; i < m.length; i++) {
    var name = m[i].replace('models/', '');
    if (name && name !== aiModel_()) return name;
  }
  return '';
}

function callGemini_(question, ctx, lang, key, model) {
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/'
    + model + ':generateContent?key=' + encodeURIComponent(key);
  var payload = {
    systemInstruction: { parts: [{ text: aiSystemPrompt_(ctx, lang) }] },
    contents: [{ role: 'user', parts: [{ text: question }] }],
    /*
     * ٤٠٠ توكن كانت قليلة على العربي — العربي بياكل توكنات أكتر من
     * الإنجليزي بكتير، فالرد كان بيتقطع في نص الجملة. ٩٠٠ كفاية
     * لرد من ٣ لـ ٦ أسطر من غير ما يتقطع
     */
    generationConfig: { temperature: 0.6, maxOutputTokens: 900 }
  };
  try {
    var res = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    if (res.getResponseCode() !== 200) {
      // بنكتب السبب في Execution log — من غيره أي مشكلة بتبقى
      // "مفيش رد" وبس، ومستحيل تعرف هي إيه
      Logger.log('Gemini رفض الطلب (' + model + '): ' + res.getResponseCode() + ' — ' + res.getContentText());
      return { text: '', body: res.getContentText() };
    }
    var data = JSON.parse(res.getContentText());
    var candidate = data && data.candidates && data.candidates[0];
    if (!candidate) {
      Logger.log('Gemini رد من غير محتوى: ' + res.getContentText());
      return { text: '', body: res.getContentText() };
    }
    if (candidate.finishReason && candidate.finishReason !== 'STOP') {
      Logger.log('Gemini وقف السبب: ' + candidate.finishReason);
    }
    var parts = candidate.content && candidate.content.parts;
    var text = (parts && parts[0] && parts[0].text) ? String(parts[0].text).trim() : '';
    if (!text) Logger.log('Gemini رد بنص فاضي: ' + res.getContentText());
    return { text: text, body: res.getContentText() };
  } catch (err) {
    Logger.log('Gemini رمى خطأ: ' + err);
    return { text: '', body: String(err) };
  }
}

/* جرّبها من Apps Script نفسه قبل ما تعتمد عليها */
function testGemini() {
  var key = aiProp_('GEMINI_KEY');
  if (!key) { Logger.log('حط GEMINI_KEY في Script properties الأول'); return; }
  Logger.log(askGemini_('يعني إيه تمرين مركّب؟', { name: 'كريم', goal: 'تضخيم' }, 'ar', key));
}

/* ============================================================
   الرسالة الترحيبية — التأمين اتغيّر
   ------------------------------------------------------------
   كان فيه كلمة سر مشتركة بتتبعت من المتصفح. المشكلة إن أي حد
   يفتح الصفحة كان يقدر يشوفها ويستعملها يبعت إيميلات باسمك.
   دلوقتي مفيش كلمة سر خالص، وبدالها حاجتين أقوى:
     ١) بنتأكد إن الإيميل ده فعلًا سايب رسالة عندنا في leads —
        بنقراها بحساب الخدمة، يعني تحقّق من جهتنا مش من المتصفح
     ٢) حد أقصى: رسالتين للإيميل الواحد في اليوم
   ============================================================ */

var WELCOME_DAILY_LIMIT = 2;

function handleWelcome_(body) {
  var email = String((body && body.email) || '').trim().toLowerCase();
  if (!email) return { ok: false, error: 'no email' };
  if (!welcomeUnderLimit_(email)) return { ok: false, error: 'daily limit' };
  if (!leadExists_(email)) return { ok: false, error: 'no matching lead' };
  sendWelcomeEmail_(body);
  return { ok: true };
}

function welcomeUnderLimit_(email) {
  var cache = CacheService.getScriptCache();
  var key = 'welcome:' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd') + ':' + email;
  var used = Number(cache.get(key) || 0);
  if (used >= WELCOME_DAILY_LIMIT) return false;
  cache.put(key, String(used + 1), 60 * 60 * 24);
  return true;
}

/*
 * الرسالة بتتكتب في Firestore قبل ما التطبيق ينده علينا، فلو
 * الإيميل ده مش موجود في leads يبقى الطلب مش جاي من نموذجنا
 */
function leadExists_(email) {
  try {
    var token = getAccessToken_();
    var leads = fetchCollection_('leads', token);
    for (var i = 0; i < leads.length; i++) {
      var candidate = String(leads[i].contact || leads[i].email || '').trim().toLowerCase();
      if (candidate && candidate === email) return true;
    }
    return false;
  } catch (err) {
    // لو التحقق نفسه وقع، مابنبعتش — أأمن من إننا نبعت لأي حد
    return false;
  }
}

function sendWelcomeEmail_(lead) {
  var ar = (lead.lang || 'ar') !== 'en';
  var name = lead.name || (ar ? 'أهلاً' : 'Hello');
  MailApp.sendEmail({
    to: lead.email,
    subject: ar ? ('أهلاً بيك في ADAM يا ' + name) : ('Welcome to ADAM, ' + name),
    htmlBody: ar ? welcomeHtmlAr_(name) : welcomeHtmlEn_(name),
    name: WELCOME_FROM_NAME
  });
}

/* نفس الرسالة كنص، عشان تنسخها وتبعتها واتساب لو حبيت */
function welcomeWhatsAppText(name) {
  return [
    'أهلاً ' + (name || '') + ' 👋',
    '',
    'أنا أحمد عناني من ADAM. وصلتني رسالتك، وحبيت أشرحلك الفكرة في دقيقة.',
    '',
    'ADAM مش تطبيق تمارين جاهزة. ده فريق بيشتغل معاك:',
    '• مدرب بيكتبلك برنامجك إنت — مش برنامج منسوخ',
    '• أخصائي تغذية بيظبطلك أكلك بالمقادير البيتية (كوب/ملعقة/رغيف) مش بالجرام',
    '• أخصائي تأهيل لو عندك إصابة أو ألم',
    '• وطبيب بيراجع حالتك لو عندك مرض مزمن أو حمل — والبرنامج مابيبدأش قبل موافقته',
    '',
    'وإنت من جوه التطبيق:',
    '• بتشوف كل تمرين بصورته وسبحة مجموعات تدوس عليها وانت بتعمله',
    '• بتسجّل أكلك بضغطة، والتطبيق بيقولك فاضلك كام',
    '• وفريقك شايف التزامك أول بأول فبيعدّل معاك',
    '',
    'عندك ٣٠ يوم تجربة مجانية.',
    '',
    'قولي بس: هدفك إيه دلوقتي؟'
  ].join('\n');
}

function welcomeHtmlAr_(name) {
  return '' +
  '<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;background:#0b1220;color:#e2e8f0;padding:22px">' +
    '<div style="max-width:560px;margin:auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px">' +
      '<div style="font-size:26px;font-weight:800;color:#22c55e;letter-spacing:3px;text-align:center">ADAM</div>' +
      '<div style="text-align:center;color:#94a3b8;font-size:13px;margin-bottom:20px">منصة التدريب والتأهيل والتغذية</div>' +

      '<p style="font-size:16px;line-height:1.9">أهلاً ' + name + ' 👋</p>' +
      '<p style="font-size:14.5px;line-height:1.95;color:#cbd5e1">' +
        'أنا أحمد عناني. وصلتني رسالتك، وحبيت أشرحلك ADAM في دقيقة قبل ما نتكلم.' +
      '</p>' +

      '<div style="background:#111d33;border-radius:12px;padding:16px;margin:18px 0">' +
        '<div style="font-weight:800;font-size:15px;margin-bottom:10px">ADAM مش تطبيق تمارين جاهزة</div>' +
        '<div style="font-size:14px;line-height:2;color:#cbd5e1">' +
          'ده <b>فريق</b> بيشتغل معاك:<br>' +
          '🏋️ <b>مدرب</b> بيكتبلك برنامجك إنت — مش برنامج منسوخ<br>' +
          '🍎 <b>أخصائي تغذية</b> بيظبطلك أكلك بالمقادير البيتية (كوب · ملعقة · رغيف) مش بالجرام<br>' +
          '🩹 <b>أخصائي تأهيل</b> لو عندك إصابة أو ألم<br>' +
          '🩺 <b>طبيب</b> بيراجع حالتك لو عندك مرض مزمن أو حمل — والبرنامج مابيبدأش قبل موافقته' +
        '</div>' +
      '</div>' +

      '<div style="background:#111d33;border-radius:12px;padding:16px;margin:18px 0">' +
        '<div style="font-weight:800;font-size:15px;margin-bottom:10px">وإنت من جوه التطبيق</div>' +
        '<div style="font-size:14px;line-height:2;color:#cbd5e1">' +
          '• كل تمرين بصورته، وسبحة مجموعات تدوس عليها وانت بتعمله<br>' +
          '• تسجّل أكلك بضغطة، والتطبيق يقولك <b>فاضلك كام</b> مش بس خطتك كانت كام<br>' +
          '• عدّاد مياه، ومتابعة للدورة الشهرية لو حبيتي<br>' +
          '• وفريقك شايف التزامك أول بأول، فبيعدّل معاك مش بيستنى الشهر يخلص' +
        '</div>' +
      '</div>' +

      '<div style="background:#12241a;border:1px solid #1f5136;border-radius:12px;padding:14px;margin:18px 0;text-align:center">' +
        '<div style="font-size:15px;font-weight:800;color:#22c55e">٣٠ يوم تجربة مجانية</div>' +
        '<div style="font-size:13px;color:#94a3b8;margin-top:4px">من غير أي بيانات دفع</div>' +
      '</div>' +

      '<p style="font-size:14.5px;line-height:1.9">ردّ على الإيميل ده وقولي: <b>هدفك إيه دلوقتي؟</b><br>' +
      'أو كلّمني واتساب على <b>01090941999</b>.</p>' +

      '<div style="color:#64748b;font-size:11.5px;margin-top:22px;border-top:1px solid #1e293b;padding-top:12px;line-height:1.8">' +
        'الرسالة دي وصلتك لأنك سيبت بياناتك في صفحة ADAM. بياناتك عندنا بس ومش بتتباع لأي جهة.' +
      '</div>' +
    '</div>' +
  '</div>';
}

function welcomeHtmlEn_(name) {
  return '' +
  '<div style="font-family:Arial,sans-serif;background:#0b1220;color:#e2e8f0;padding:22px">' +
    '<div style="max-width:560px;margin:auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px">' +
      '<div style="font-size:26px;font-weight:800;color:#22c55e;letter-spacing:3px;text-align:center">ADAM</div>' +
      '<div style="text-align:center;color:#94a3b8;font-size:13px;margin-bottom:20px">Training · Rehab · Nutrition</div>' +
      '<p style="font-size:16px;line-height:1.9">Hi ' + name + ' 👋</p>' +
      '<p style="font-size:14.5px;line-height:1.9;color:#cbd5e1">I am Ahmed Enany. I got your message — here is ADAM in one minute.</p>' +
      '<div style="background:#111d33;border-radius:12px;padding:16px;margin:18px 0;font-size:14px;line-height:2;color:#cbd5e1">' +
        '<b>ADAM is not a workout app. It is a team:</b><br>' +
        '🏋️ A coach who writes <i>your</i> program, not a copied one<br>' +
        '🍎 A dietitian who sets your food in household measures (cup · spoon · loaf), not grams<br>' +
        '🩹 A rehab specialist if you have an injury or pain<br>' +
        '🩺 A doctor who reviews your case if you have a chronic condition or are pregnant — the program does not start before their approval' +
      '</div>' +
      '<div style="background:#111d33;border-radius:12px;padding:16px;margin:18px 0;font-size:14px;line-height:2;color:#cbd5e1">' +
        '<b>Inside the app:</b><br>' +
        '• Every exercise with its photo, and a bead per set you tap as you go<br>' +
        '• Log food in one tap — it tells you what is <b>left</b>, not just what was planned<br>' +
        '• Water tracking, and cycle tracking if you want it<br>' +
        '• Your team sees your adherence day by day and adjusts with you' +
      '</div>' +
      '<div style="background:#12241a;border:1px solid #1f5136;border-radius:12px;padding:14px;margin:18px 0;text-align:center">' +
        '<div style="font-size:15px;font-weight:800;color:#22c55e">30-day free trial</div>' +
        '<div style="font-size:13px;color:#94a3b8;margin-top:4px">No payment details needed</div>' +
      '</div>' +
      '<p style="font-size:14.5px;line-height:1.9">Just reply and tell me: <b>what is your goal right now?</b><br>Or WhatsApp me on <b>+20 109 094 1999</b>.</p>' +
      '<div style="color:#64748b;font-size:11.5px;margin-top:22px;border-top:1px solid #1e293b;padding-top:12px">You received this because you left your details on the ADAM page. Your data stays with us and is never sold.</div>' +
    '</div>' +
  '</div>';
}

/* جرّب الرسالة على نفسك قبل ما تفعّلها */
function testWelcomeEmail() {
  sendWelcomeEmail_({ email: REPORT_EMAIL, name: 'أحمد', lang: 'ar' });
  Logger.log('اتبعتت على ' + REPORT_EMAIL);
}

/* لينك واتساب جاهز تبعته من رقمك لأي عميل */
function whatsAppLinkFor(phoneDigits, name) {
  var link = 'https://wa.me/' + phoneDigits + '?text=' + encodeURIComponent(welcomeWhatsAppText(name));
  Logger.log(link);
  return link;
}


/* ============================================================
   إشعارات الموبايل — مجانًا عن طريق Firebase Cloud Messaging
   ------------------------------------------------------------
   البرنامج بيكتب الإشعار في Firestore (مجموعة notifications)،
   وبعدين يبعتلنا رقمه بس. إحنا بنقرا الإشعار بنفسنا من Firestore
   ونتأكد إن اللي بعته هو فعلًا صاحبه — فمحدش يقدر يبعت إشعار
   مزيّف لحد باسم حد تاني، ولا يبعت نفس الإشعار مرتين.

   محتاج حاجة واحدة زيادة: حساب الخدمة adam-daily-report لازم
   ياخد دور  Firebase Cloud Messaging API Admin  (الشرح في
   PUSH_SETUP.md). من غيره جوجل هترد بـ 403 وهتلاقيها مكتوبة
   في الـ log.
   ============================================================ */

var PUSH_SITE_URL = 'https://dradamcoach.github.io/adam/';
var PUSH_DAILY_LIMIT = 300;          /* أقصى إشعارات يبعتها حساب واحد في اليوم */
var PUSH_MAX_AGE_MIN = 30;           /* إشعار أقدم من كده مابيتبعتش */

function pushReject_(reason) {
  Logger.log('PUSH رفض: ' + reason);
  return { ok: false, error: reason };
}

function pushUnderLimit_(email) {
  var cache = CacheService.getScriptCache();
  var key = 'push:' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd') + ':' + email;
  var used = Number(cache.get(key) || 0);
  if (used >= PUSH_DAILY_LIMIT) return false;
  cache.put(key, String(used + 1), 60 * 60 * 24);
  return true;
}

/* مستند واحد من Firestore — null لو مش موجود */
function fetchDoc_(path, token) {
  var url = 'https://firestore.googleapis.com/v1/projects/' + PROJECT_ID
    + '/databases/(default)/documents/' + path;
  var res = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
    muteHttpExceptions: true
  });
  if (res.getResponseCode() === 404) return null;
  if (res.getResponseCode() !== 200) {
    throw new Error('قراءة ' + path + ' فشلت: ' + res.getResponseCode() + ' ' + res.getContentText().slice(0, 300));
  }
  var body = JSON.parse(res.getContentText());
  return parseFields_(body.fields || {});
}

function handlePush_(body) {
  if (!aiProp_('FIREBASE_API_KEY')) return pushReject_('FIREBASE_API_KEY مش متحطّط في Script properties');
  if (!aiProp_('SERVICE_ACCOUNT_JSON')) return pushReject_('SERVICE_ACCOUNT_JSON مش متحطّط في Script properties');

  var caller = verifyIdToken_(body.idToken);
  if (!caller) return pushReject_('توكن الدخول مش مقبول');

  var id = String(body.id || '');
  if (!/^[A-Za-z0-9_-]{6,64}$/.test(id)) return pushReject_('رقم إشعار غلط');

  /* نفس الإشعار مايتبعتش مرتين */
  var cache = CacheService.getScriptCache();
  if (cache.get('pushed:' + id)) return { ok: true, sent: 0, duplicate: true };
  if (!pushUnderLimit_(caller)) return pushReject_('عدّى الحد اليومي: ' + caller);

  var readToken = getAccessToken_();
  var note = fetchDoc_('notifications/' + id, readToken);
  if (!note) return pushReject_('الإشعار مش موجود: ' + id);

  if (String(note.from || '').toLowerCase() !== caller) {
    return pushReject_('الإشعار مش باسم اللي باعته: ' + caller + ' ≠ ' + note.from);
  }
  var age = (Date.now() - Date.parse(note.createdAt || '')) / 60000;
  if (!(age < PUSH_MAX_AGE_MIN)) return pushReject_('الإشعار قديم: ' + note.createdAt);

  cache.put('pushed:' + id, '1', 60 * 60 * 6);

  var to = String(note.to || '').toLowerCase();
  var devices = fetchDoc_('pushTokens/' + encodeURIComponent(to), readToken);
  var tokens = (devices && devices.tokens) || [];
  if (!tokens.length) {
    Logger.log('PUSH: ' + to + ' مش مفعّل إشعارات الموبايل — الإشعار في الجرس بس');
    return { ok: true, sent: 0, reason: 'no device' };
  }

  var L = (devices.lang === 'en') ? 'en' : 'ar';
  var text = (note.text && (note.text[L] || note.text.ar)) || {};
  var sendToken = getAccessToken_('https://www.googleapis.com/auth/firebase.messaging');

  var sent = 0;
  tokens.forEach(function (deviceToken) {
    var res = UrlFetchApp.fetch('https://fcm.googleapis.com/v1/projects/' + PROJECT_ID + '/messages:send', {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + sendToken },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        message: {
          token: deviceToken,
          data: {
            title: String(text.t || 'ADAM'),
            body: String(text.b || ''),
            link: PUSH_SITE_URL,
            tag: String(note.type || 'adam'),
            lang: L
          },
          webpush: { headers: { Urgency: 'high', TTL: '86400' } }
        }
      })
    });
    var code = res.getResponseCode();
    if (code === 200) {
      sent++;
    } else if (code === 403) {
      Logger.log('PUSH 403: حساب الخدمة مالوش صلاحية إرسال — ضيفله دور Firebase Cloud Messaging API Admin. ' + res.getContentText().slice(0, 300));
    } else {
      // 404 = الجهاز ده اتشال أو المتصفح اتمسح — عادي، بيتنضّف من البرنامج
      Logger.log('PUSH ' + code + ' لجهاز من أجهزة ' + to + ': ' + res.getContentText().slice(0, 300));
    }
  });

  Logger.log('PUSH تمام: ' + sent + ' من ' + tokens.length + ' جهاز لـ ' + to);
  return { ok: true, sent: sent };
}

/* جرّب من جوه Apps Script: بيتأكد إن الصلاحيات كلها مظبوطة */
function testPushSetup() {
  var read = getAccessToken_();
  Logger.log('قراءة Firestore: تمام' + (read ? '' : ' (?)'));
  var send = getAccessToken_('https://www.googleapis.com/auth/firebase.messaging');
  Logger.log('توكن الإرسال: ' + (send ? 'تمام' : 'فشل'));
  /* رسالة لجهاز وهمي: 400 معناها الصلاحية تمام والجهاز بس مش حقيقي، 403 معناها الدور ناقص */
  var res = UrlFetchApp.fetch('https://fcm.googleapis.com/v1/projects/' + PROJECT_ID + '/messages:send', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + send },
    muteHttpExceptions: true,
    payload: JSON.stringify({ message: { token: 'test-token-not-real', data: { title: 'test' } } })
  });
  var code = res.getResponseCode();
  if (code === 403) Logger.log('ناقص دور Firebase Cloud Messaging API Admin على حساب الخدمة');
  else if (code === 400 || code === 404) Logger.log('تمام — الصلاحيات مظبوطة (الرد ' + code + ' عادي لأن الجهاز وهمي)');
  else Logger.log('رد غير متوقع ' + code + ': ' + res.getContentText().slice(0, 300));
}
