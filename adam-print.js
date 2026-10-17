/* ADAM — محرك الطباعة والتصدير (طباعة/PDF + Word + Excel)
   من غير أي مكتبة خارجية. الاستخدام:
     ADAM_PRINT.open({ title, subtitle, lang:'ar'|'en', blocks:[...], filename })
   أنواع البلوكات:
     {t:'h', text, level:1|2|3}      عنوان
     {t:'p', text}                   فقرة
     {t:'kv', rows:[[مفتاح, قيمة]]}   بيانات أساسية
     {t:'table', title, head:[..], rows:[[..]], colors:[[لون|'' لكل خلية]]}
     {t:'chart', title, kind:'bars'|'line', labels:[..], series:[{name,color,values:[..],colors:[..]}], max, unit}
     {t:'break'}                     صفحة جديدة
   المخرجات: طباعة/PDF (المتصفح)، Word (.doc)، Excel (.xls SpreadsheetML). */
(function () {
  'use strict';
  if (window.ADAM_PRINT) return;

  var BRAND = '#0b6b5c';

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
  function fileSafe(s) { return String(s || 'adam').replace(/[\\/:*?"<>|\s]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 60) || 'adam'; }

  /* ---------- رسومات SVG للطباعة (ألوان ثابتة على خلفية بيضاء) ---------- */
  function chartSvg(b) {
    var labels = b.labels || [], series = b.series || [];
    var n = Math.max(1, labels.length);
    var W = 720, H = 220, L = 34, R = 10, T = 12, B = 30;
    var max = b.max || 0;
    if (!max) series.forEach(function (s) { (s.values || []).forEach(function (v) { if (num(v) > max) max = num(v); }); });
    if (!max) max = 10;
    var pw = W - L - R, ph = H - T - B;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:720px" font-family="Arial,Tahoma,sans-serif">';
    for (var g = 0; g <= 4; g++) {
      var gy = T + ph - (g / 4) * ph;
      svg += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + gy + '" y2="' + gy + '" stroke="#d0d7de" stroke-width="1"' + (g ? ' stroke-dasharray="3 3"' : '') + '/>';
      svg += '<text x="' + (L - 5) + '" y="' + (gy + 3) + '" font-size="9" text-anchor="end" fill="#555">' + (Math.round(max * g / 4 * 10) / 10) + '</text>';
    }
    var step = Math.ceil(n / 24);
    if (b.kind === 'line') {
      series.forEach(function (s, si) {
        var col = s.color || ['#0b6b5c', '#c0392b', '#2a6fdb', '#d68910'][si % 4];
        var pts = (s.values || []).map(function (v, i) {
          var x = L + (n === 1 ? pw / 2 : (i / (n - 1)) * pw);
          var y = T + ph - (num(v) / max) * ph;
          return [x, y];
        });
        svg += '<polyline fill="none" stroke="' + col + '" stroke-width="2.2" stroke-linejoin="round" points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>';
        pts.forEach(function (p) { svg += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.6" fill="' + col + '"/>'; });
      });
      labels.forEach(function (lb, i) {
        if (i % step) return;
        var x = L + (n === 1 ? pw / 2 : (i / (n - 1)) * pw);
        svg += '<text x="' + x.toFixed(1) + '" y="' + (H - 12) + '" font-size="9" text-anchor="middle" fill="#555">' + esc(lb) + '</text>';
      });
    } else {
      var sc = Math.max(1, series.length);
      var gw = pw / n;
      var bw = Math.max(2, (gw - 3) / sc);
      series.forEach(function (s, si) {
        (s.values || []).forEach(function (v, i) {
          var h = Math.max(1.5, (num(v) / max) * ph);
          var col = (s.colors && s.colors[i]) || s.color || BRAND;
          svg += '<rect x="' + (L + i * gw + 1.5 + si * bw).toFixed(1) + '" y="' + (T + ph - h).toFixed(1) + '" width="' + (bw - 0.5).toFixed(1) + '" height="' + h.toFixed(1) + '" rx="1.5" fill="' + col + '"/>';
          if (n <= 20) svg += '<text x="' + (L + i * gw + 1.5 + si * bw + bw / 2).toFixed(1) + '" y="' + (T + ph - h - 3).toFixed(1) + '" font-size="8" text-anchor="middle" fill="#333">' + esc(v) + '</text>';
        });
      });
      labels.forEach(function (lb, i) {
        if (i % step) return;
        svg += '<text x="' + (L + i * gw + gw / 2).toFixed(1) + '" y="' + (H - 12) + '" font-size="9" text-anchor="middle" fill="#555">' + esc(lb) + '</text>';
      });
    }
    return svg + '</svg>';
  }

  function legendHtml(series, extra) {
    var h = '';
    (extra || []).concat(series.filter(function (s) { return !s.colors; }).map(function (s) { return { name: s.name, color: s.color }; })).forEach(function (l) {
      if (!l || !l.name) return;
      h += '<span class="lg"><i style="background:' + (l.color || BRAND) + '"></i>' + esc(l.name) + '</span>';
    });
    return h ? '<div class="legend">' + h + '</div>' : '';
  }

  /* ---------- Word: الرسمة جدول بأعمدة ملوّنة (Word مش بيعرض SVG) ---------- */
  function chartWordTable(b) {
    var labels = b.labels || [], series = b.series || [];
    var max = b.max || 0;
    if (!max) series.forEach(function (s) { (s.values || []).forEach(function (v) { if (num(v) > max) max = num(v); }); });
    if (!max) max = 10;
    var h = '<table border="1" cellspacing="0" cellpadding="3" style="border-collapse:collapse;width:100%;font-size:10pt"><tr style="background:#eef3f2"><th>#</th>';
    series.forEach(function (s) { h += '<th>' + esc(s.name || '') + '</th><th style="width:45%"></th>'; });
    h += '</tr>';
    labels.forEach(function (lb, i) {
      h += '<tr><td>' + esc(lb) + '</td>';
      series.forEach(function (s) {
        var v = num((s.values || [])[i]);
        var col = (s.colors && s.colors[i]) || s.color || BRAND;
        var pct = Math.max(1, Math.round(v / max * 100));
        h += '<td align="center">' + esc((s.values || [])[i]) + '</td><td><table cellspacing="0" cellpadding="0" style="width:' + pct + '%"><tr><td bgcolor="' + col + '" style="background:' + col + ';height:10px;font-size:1pt">&nbsp;</td></tr></table></td>';
      });
      h += '</tr>';
    });
    return h + '</table>';
  }

  /* ---------- بناء المستند ---------- */
  function css(rtl) {
    return '@page{size:A4;margin:14mm 12mm}' +
      '*{box-sizing:border-box}' +
      'body{font-family:Tahoma,Arial,"Segoe UI",sans-serif;color:#1b2430;font-size:11.5px;line-height:1.55;margin:0;padding:0;direction:' + (rtl ? 'rtl' : 'ltr') + ';background:#fff}' +
      '.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid ' + BRAND + ';padding-bottom:6px;margin-bottom:10px}' +
      '.top b{font-size:19px;color:' + BRAND + '}.top small{color:#667;display:block;font-size:11px}' +
      '.brand{font-weight:800;letter-spacing:.14em;color:' + BRAND + ';font-size:13px}' +
      'h1{font-size:19px;margin:12px 0 4px;color:#102a43}h2{font-size:15px;margin:14px 0 4px;color:' + BRAND + '}h3{font-size:12.5px;margin:10px 0 3px}' +
      'p{margin:4px 0}' +
      'table{border-collapse:collapse;width:100%;margin:6px 0 10px;page-break-inside:auto}tr{page-break-inside:avoid}' +
      'th{background:#e8f1ef;color:#0a4d42;font-weight:700}th,td{border:1px solid #b9c4c9;padding:3px 6px;text-align:' + (rtl ? 'right' : 'left') + ';vertical-align:top}' +
      'tbody tr:nth-child(even) td{background:#f7faf9}' +
      '.kv td:first-child{width:28%;font-weight:700;background:#f1f6f5}' +
      '.cap{font-weight:700;margin:10px 0 2px}' +
      '.legend{margin:2px 0 8px;font-size:10.5px}.lg{display:inline-block;margin-inline-end:12px}.lg i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-inline-end:4px;vertical-align:middle}' +
      '.chartbox{page-break-inside:avoid;margin:4px 0 8px}' +
      '.pb{page-break-after:always;height:0}' +
      '.foot{margin-top:14px;border-top:1px solid #ccd;padding-top:4px;color:#778;font-size:10px}' +
      'body,*{-webkit-print-color-adjust:exact;print-color-adjust:exact}';
  }

  function render(doc, target) {
    var rtl = (doc.lang || 'ar') === 'ar';
    var word = target === 'word';
    var out = '';
    var dateStr = new Date().toLocaleDateString(rtl ? 'ar-EG' : 'en-GB');
    out += '<div class="top"><div><b>' + esc(doc.title || '') + '</b>' + (doc.subtitle ? '<small>' + esc(doc.subtitle) + '</small>' : '') + '</div><div style="text-align:' + (rtl ? 'left' : 'right') + '"><span class="brand">ADAM</span><small>' + esc(dateStr) + '</small></div></div>';
    (doc.blocks || []).forEach(function (b) {
      if (!b) return;
      if (b.t === 'h') {
        var lv = b.level === 1 ? 'h1' : (b.level === 3 ? 'h3' : 'h2');
        out += '<' + lv + '>' + esc(b.text) + '</' + lv + '>';
      } else if (b.t === 'p') {
        out += '<p>' + esc(b.text).replace(/\n/g, '<br>') + '</p>';
      } else if (b.t === 'kv') {
        out += '<table class="kv"><tbody>' + (b.rows || []).filter(function (r) { return r && r[1] !== '' && r[1] != null; }).map(function (r) {
          return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]).replace(/\n/g, '<br>') + '</td></tr>';
        }).join('') + '</tbody></table>';
      } else if (b.t === 'table') {
        if (b.title) out += '<div class="cap">' + esc(b.title) + '</div>';
        out += '<table><thead><tr>' + (b.head || []).map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>';
        (b.rows || []).forEach(function (r, ri) {
          out += '<tr>' + r.map(function (c, ci) {
            var bg = b.colors && b.colors[ri] && b.colors[ri][ci];
            return '<td' + (bg ? ' bgcolor="' + bg + '" style="background:' + bg + '"' : '') + '>' + esc(c).replace(/\n/g, '<br>') + '</td>';
          }).join('') + '</tr>';
        });
        out += '</tbody></table>';
      } else if (b.t === 'chart') {
        if (b.title) out += '<div class="cap">' + esc(b.title) + '</div>';
        out += '<div class="chartbox">' + (word ? chartWordTable(b) : chartSvg(b)) + '</div>' + legendHtml(b.series || [], b.legend);
      } else if (b.t === 'break') {
        out += '<div class="pb"></div>';
      }
    });
    out += '<div class="foot">' + esc(rtl ? 'طُبع من تطبيق ADAM · adamxfit.com' : 'Printed from the ADAM app · adamxfit.com') + '</div>';
    return out;
  }

  function fullHtml(doc, target) {
    var rtl = (doc.lang || 'ar') === 'ar';
    var head = '<meta charset="utf-8"><title>' + esc(doc.title || 'ADAM') + '</title>';
    if (target === 'word') {
      return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head>' + head +
        '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->' +
        '<style>' + css(rtl) + '</style></head><body dir="' + (rtl ? 'rtl' : 'ltr') + '">' + render(doc, 'word') + '</body></html>';
    }
    return '<!doctype html><html lang="' + (rtl ? 'ar' : 'en') + '" dir="' + (rtl ? 'rtl' : 'ltr') + '"><head>' + head +
      '<meta name="viewport" content="width=device-width,initial-scale=1"><style>' + css(rtl) + 'body{padding:12px}@media print{body{padding:0}}</style></head><body>' + render(doc, 'print') + '</body></html>';
  }

  /* ---------- Excel: SpreadsheetML 2003 (من غير مكتبة) ---------- */
  function xCell(v, style, isNum) {
    var s = style ? ' ss:StyleID="' + style + '"' : '';
    if (isNum && v !== '' && isFinite(Number(v))) return '<Cell' + s + '><Data ss:Type="Number">' + Number(v) + '</Data></Cell>';
    return '<Cell' + s + '><Data ss:Type="String">' + esc(v) + '</Data></Cell>';
  }
  function sheetName(s, used) {
    var n = String(s || 'Sheet').replace(/[\\\/\?\*\[\]:]/g, ' ').trim().slice(0, 28) || 'Sheet';
    var base = n, i = 2;
    while (used[n.toLowerCase()]) { n = base.slice(0, 26) + ' ' + i++; }
    used[n.toLowerCase()] = 1;
    return n;
  }
  function excelXml(doc) {
    var rtl = (doc.lang || 'ar') === 'ar';
    var used = {};
    var sheets = [];
    var info = [], cur = null;
    /* أول ورقة: ملخص (عناوين + بيانات أساسية + فقرات)، وكل جدول/رسمة في ورقتها */
    (doc.blocks || []).forEach(function (b) {
      if (!b) return;
      if (b.t === 'h') info.push([b.text, '', 'H']);
      else if (b.t === 'p') info.push([b.text, '', 'P']);
      else if (b.t === 'kv') (b.rows || []).forEach(function (r) { if (r && r[1] !== '' && r[1] != null) info.push([r[0], r[1], 'K']); });
      else if (b.t === 'table') sheets.push({ name: b.title || (rtl ? 'جدول' : 'Table'), head: b.head || [], rows: b.rows || [], colors: b.colors });
      else if (b.t === 'chart') {
        var head = [rtl ? 'البند' : 'Item'].concat((b.series || []).map(function (s) { return s.name || ''; }));
        var rows = (b.labels || []).map(function (lb, i) { return [lb].concat((b.series || []).map(function (s) { return (s.values || [])[i]; })); });
        sheets.push({ name: (b.title || (rtl ? 'رسم' : 'Chart')), head: head, rows: rows, numeric: true, chartNote: rtl ? 'بيانات الرسم البياني — حدّد الجدول واعمل Insert > Chart' : 'Chart data — select the table and use Insert > Chart' });
      }
    });
    var x = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>' +
      '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
      '<Styles><Style ss:ID="Default"><Alignment ss:Vertical="Top" ss:WrapText="1"/><Font ss:FontName="Tahoma" ss:Size="11"/></Style>' +
      '<Style ss:ID="h"><Font ss:FontName="Tahoma" ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#0B6B5C" ss:Pattern="Solid"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>' +
      '<Style ss:ID="t"><Font ss:FontName="Tahoma" ss:Bold="1" ss:Size="14" ss:Color="#0B6B5C"/></Style>' +
      '<Style ss:ID="k"><Font ss:FontName="Tahoma" ss:Bold="1"/><Interior ss:Color="#E8F1EF" ss:Pattern="Solid"/></Style>' +
      '<Style ss:ID="c"><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#B9C4C9"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#B9C4C9"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#B9C4C9"/></Borders></Style></Styles>';
    var ws = function (name, rowsXml) {
      return '<Worksheet ss:Name="' + esc(sheetName(name, used)) + '"' + (rtl ? '' : '') + '><Table ss:DefaultColumnWidth="95">' + rowsXml + '</Table>' +
        '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">' + (rtl ? '<DisplayRightToLeft/>' : '') + '<FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane></WorksheetOptions></Worksheet>';
    };
    var s0 = '<Row><Cell ss:StyleID="t"><Data ss:Type="String">' + esc(doc.title || 'ADAM') + '</Data></Cell></Row>';
    if (doc.subtitle) s0 += '<Row>' + xCell(doc.subtitle) + '</Row>';
    info.forEach(function (r) {
      if (r[2] === 'K') s0 += '<Row>' + xCell(r[0], 'k') + xCell(r[1]) + '</Row>';
      else if (r[2] === 'H') s0 += '<Row>' + xCell(r[0], 'k') + '</Row>';
      else s0 += '<Row>' + xCell(r[0]) + '</Row>';
    });
    x += ws(rtl ? 'ملخص' : 'Summary', s0.replace('<Table', '<Table')).replace('<FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane>', '');
    sheets.forEach(function (sh) {
      var r = '';
      if (sh.chartNote) r += '<Row>' + xCell(sh.chartNote) + '</Row>';
      r += '<Row>' + sh.head.map(function (h) { return xCell(h, 'h'); }).join('') + '</Row>';
      sh.rows.forEach(function (row) { r += '<Row>' + row.map(function (c, ci) { return xCell(c, 'c', sh.numeric && ci > 0); }).join('') + '</Row>'; });
      var ws2 = ws(sh.name, r);
      if (sh.chartNote) ws2 = ws2.replace('<FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane>', '');
      x += ws2;
    });
    return x + '</Workbook>';
  }

  /* ---------- تنزيل ---------- */
  function download(name, mime, content) {
    var blob = new Blob(['﻿', content], { type: mime });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }

  /* ---------- شاشة المعاينة ---------- */
  var overlay = null;
  function close() { if (overlay) { overlay.remove(); overlay = null; document.body.style.overflow = ''; } }

  function open(doc) {
    close();
    var rtl = (doc.lang || 'ar') === 'ar';
    var L = function (ar, en) { return rtl ? ar : en; };
    var base = fileSafe(doc.filename || doc.title);
    overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(8,14,22,.78);display:flex;flex-direction:column;direction:' + (rtl ? 'rtl' : 'ltr') + ';font-family:Tahoma,Arial,sans-serif';
    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 12px;background:#101a26;color:#fff;border-bottom:1px solid #26354a';
    var mk = function (label, fn, primary) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'min-height:44px;padding:0 16px;border-radius:10px;border:1px solid ' + (primary ? '#0b6b5c' : '#3b4d66') + ';background:' + (primary ? '#0b6b5c' : '#1a283a') + ';color:#fff;font-size:14px;font-weight:700;cursor:pointer';
      b.addEventListener('click', fn);
      return b;
    };
    var ttl = document.createElement('strong');
    ttl.textContent = L('معاينة الطباعة', 'Print preview');
    ttl.style.cssText = 'flex:1;min-width:120px;font-size:15px';
    var frame = document.createElement('iframe');
    frame.title = L('معاينة', 'Preview');
    frame.style.cssText = 'flex:1;width:100%;border:0;background:#fff';
    frame.srcdoc = fullHtml(doc, 'print');
    bar.append(
      ttl,
      mk(L('طباعة / PDF', 'Print / PDF'), function () { try { frame.contentWindow.focus(); frame.contentWindow.print(); } catch (e) { window.print(); } }, true),
      mk('Word', function () { download(base + '.doc', 'application/msword', fullHtml(doc, 'word')); }),
      mk('Excel', function () { download(base + '.xls', 'application/vnd.ms-excel', excelXml(doc)); }),
      mk(L('إغلاق', 'Close'), close)
    );
    overlay.append(bar, frame);
    overlay.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    return overlay;
  }

  window.ADAM_PRINT = { open: open, close: close, html: fullHtml, excel: excelXml, _chartSvg: chartSvg };
})();
