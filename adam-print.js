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
   المخرجات: طباعة/PDF (المتصفح)، Word (.docx حقيقي)، Excel (.xlsx حقيقي) — بنبنيهم بإيدينا من غير مكتبة. */
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
      '*{box-sizing:border-box}svg,img{max-width:100%;height:auto}' +
      'body{font-family:Tahoma,Arial,"Segoe UI",sans-serif;color:#1b2430;font-size:11.5px;line-height:1.55;margin:0;padding:0;direction:' + (rtl ? 'rtl' : 'ltr') + ';background:#fff}' +
      '.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid ' + BRAND + ';padding-bottom:6px;margin-bottom:10px}' +
      '.top b{font-size:19px;color:' + BRAND + '}.top small{color:#667;display:block;font-size:11px}' +
      '.brand{font-weight:800;letter-spacing:.14em;color:' + BRAND + ';font-size:13px}' +
      'h1{font-size:19px;margin:12px 0 4px;color:#102a43}h2{font-size:15px;margin:14px 0 4px;color:' + BRAND + '}h3{font-size:12.5px;margin:10px 0 3px}' +
      'p{margin:4px 0}' +
      'table{border-collapse:collapse;width:100%;margin:6px 0 10px;page-break-inside:auto}tr{page-break-inside:avoid}' +
      'th{background:#e8f1ef;color:#0a4d42;font-weight:700}th,td{overflow-wrap:break-word;border:1px solid #b9c4c9;padding:3px 6px;text-align:' + (rtl ? 'right' : 'left') + ';vertical-align:top}' +
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

  function isWide(doc) {
    return (doc.blocks || []).some(function (b) { return b && b.t === 'table' && (b.head || []).length >= 9; });
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
      '<meta name="viewport" content="width=device-width,initial-scale=1"><style>' + css(rtl) + (isWide(doc) ? '@page{size:A4 landscape;margin:12mm 10mm}' : '') + 'html{background:#e9edf0}body{width:' + (isWide(doc) ? 1123 : 794) + 'px;margin:0 auto;padding:18px 22px;min-height:1000px;box-shadow:0 0 6px rgba(0,0,0,.15)}@media print{html{zoom:1!important;background:#fff}body{width:auto;padding:0;margin:0;min-height:0;box-shadow:none}}</style></head><body data-w="' + (isWide(doc) ? 1123 : 794) + '">' + render(doc, 'print') + '</body></html>';
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

  /* ---------- ZIP بسيط (من غير ضغط) + CRC32 — لبناء ملفات xlsx/docx الحقيقية ---------- */
  var CRC_T = null;
  function crc32(u8) {
    if (!CRC_T) { CRC_T = new Uint32Array(256); for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); CRC_T[n] = c >>> 0; } }
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < u8.length; i++) crc = CRC_T[(crc ^ u8[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function zipStore(files) {
    var enc = new TextEncoder(), chunks = [], central = [], offset = 0;
    function u16(v) { return [v & 255, (v >>> 8) & 255]; }
    function u32(v) { return [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]; }
    files.forEach(function (f) {
      var name = enc.encode(f.name), data = enc.encode(f.data), crc = crc32(data);
      var lh = [].concat(u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(crc), u32(data.length), u32(data.length), u16(name.length), u16(0));
      chunks.push(new Uint8Array(lh), name, data);
      central.push({ name: name, crc: crc, size: data.length, off: offset });
      offset += lh.length + name.length + data.length;
    });
    var cdStart = offset, cdSize = 0;
    central.forEach(function (c) {
      var h = [].concat(u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(c.crc), u32(c.size), u32(c.size), u16(c.name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(c.off));
      chunks.push(new Uint8Array(h), c.name);
      cdSize += h.length + c.name.length;
    });
    chunks.push(new Uint8Array([].concat(u32(0x06054b50), u16(0), u16(0), u16(central.length), u16(central.length), u32(cdSize), u32(cdStart), u16(0))));
    var total = 0; chunks.forEach(function (c) { total += c.length; });
    var out = new Uint8Array(total), p = 0;
    chunks.forEach(function (c) { out.set(c, p); p += c.length; });
    return out;
  }
  function xe(s) { /* هروب XML + شيل الرموز الممنوعة */
    return esc(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '');
  }
  function hex6(c) {
    c = String(c || '').trim();
    var m8 = /^#?([0-9a-f]{6})([0-9a-f]{2})$/i.exec(c);
    if (m8) { /* لون بشفافية → نمزجه مع الأبيض */
      var al = parseInt(m8[2], 16) / 255, o = '';
      for (var q = 0; q < 3; q++) { var ch = parseInt(m8[1].substr(q * 2, 2), 16); o += ('0' + Math.round(ch * al + 255 * (1 - al)).toString(16)).slice(-2); }
      return o.toUpperCase();
    }
    var m = /^#?([0-9a-f]{6})$/i.exec(c);
    if (m) return m[1].toUpperCase();
    m = /^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(c);
    return m ? (m[1] + m[1] + m[2] + m[2] + m[3] + m[3]).toUpperCase() : '';
  }
  var XML_H = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

  /* ---------- Excel حقيقي (.xlsx) ---------- */
  function colName(i) { var s = ''; i++; while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }
  function buildXlsx(doc) {
    var rtl = (doc.lang || 'ar') === 'ar';
    var used = {}, sheets = [], info = [];
    (doc.blocks || []).forEach(function (b) {
      if (!b) return;
      if (b.t === 'h') info.push({ k: 'H', a: b.text });
      else if (b.t === 'p') info.push({ k: 'P', a: b.text });
      else if (b.t === 'kv') (b.rows || []).forEach(function (r) { if (r && r[1] !== '' && r[1] != null) info.push({ k: 'K', a: r[0], b: r[1] }); });
      else if (b.t === 'table') sheets.push({ name: b.title || (rtl ? 'جدول' : 'Table'), head: b.head || [], rows: b.rows || [], colors: b.colors });
      else if (b.t === 'chart') {
        var head = [rtl ? 'البند' : 'Item'].concat((b.series || []).map(function (s) { return s.name || ''; }));
        var rows = (b.labels || []).map(function (lb, i) { return [lb].concat((b.series || []).map(function (s) { return (s.values || [])[i]; })); });
        sheets.push({ name: b.title || (rtl ? 'رسم' : 'Chart'), head: head, rows: rows, numeric: true });
      }
    });
    /* ألوان الخلايا → أنماط (fills) */
    var fillIdx = {}, fills = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>',
      '<fill><patternFill patternType="solid"><fgColor rgb="FF0B6B5C"/><bgColor indexed="64"/></patternFill></fill>',
      '<fill><patternFill patternType="solid"><fgColor rgb="FFE8F1EF"/><bgColor indexed="64"/></patternFill></fill>'];
    var colorXf = {}, extraXfs = [];
    function xfForColor(hex) {
      if (colorXf[hex] != null) return colorXf[hex];
      fills.push('<fill><patternFill patternType="solid"><fgColor rgb="FF' + hex + '"/><bgColor indexed="64"/></patternFill></fill>');
      var fid = fills.length - 1;
      extraXfs.push('<xf numFmtId="0" fontId="0" fillId="' + fid + '" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"' + (rtl ? ' readingOrder="2"' : '') + '/></xf>');
      colorXf[hex] = 6 + extraXfs.length - 1;
      return colorXf[hex];
    }
    /* خلية: s=نمط، v=قيمة */
    function cell(r, c, v, s, isNum) {
      var ref = colName(c) + r, st = s ? ' s="' + s + '"' : '';
      if (v === '' || v == null) return s ? '<c r="' + ref + '"' + st + '/>' : '';
      if (isNum && isFinite(Number(v)) && String(v).trim() !== '') return '<c r="' + ref + '"' + st + '><v>' + Number(v) + '</v></c>';
      return '<c r="' + ref + '"' + st + ' t="inlineStr"><is><t xml:space="preserve">' + xe(v) + '</t></is></c>';
    }
    function widths(head, rows, min, max) {
      var w = head.map(function (h) { return Math.min(max, Math.max(min, String(h == null ? '' : h).length + 4)); });
      rows.forEach(function (r) { r.forEach(function (v, i) {
        var longest = 0; String(v == null ? '' : v).split('\n').forEach(function (ln) { if (ln.length > longest) longest = ln.length; });
        if (i < w.length) w[i] = Math.min(max, Math.max(w[i], longest + 3));
      }); });
      return w;
    }
    function sheetXml(rowsXml, colW, freeze, merges) {
      return XML_H + '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"' + (rtl ? ' rightToLeft="1"' : '') + '>' +
        (freeze ? '<pane ySplit="' + freeze + '" topLeftCell="A' + (freeze + 1) + '" activePane="bottomLeft" state="frozen"/>' : '') + '</sheetView></sheetViews>' +
        '<sheetFormatPr defaultRowHeight="15"/>' +
        '<cols>' + colW.map(function (w, i) { return '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>'; }).join('') + '</cols>' +
        '<sheetData>' + rowsXml + '</sheetData>' +
        (merges && merges.length ? '<mergeCells count="' + merges.length + '">' + merges.map(function (m) { return '<mergeCell ref="' + m + '"/>'; }).join('') + '</mergeCells>' : '') + '</worksheet>';
    }
    var sheetFiles = [], names = [];
    /* ورقة الملخص: 1=header 2=title 3=key 4=cell */
    var r = 1, rx = '<row r="1">' + cell(1, 0, doc.title || 'ADAM', 2) + '</row>', merges = [];
    if (doc.subtitle) { r++; rx += '<row r="' + r + '">' + cell(r, 0, doc.subtitle, 5) + '</row>'; }
    info.forEach(function (it) {
      r++;
      if (it.k === 'K') rx += '<row r="' + r + '">' + cell(r, 0, it.a, 3) + cell(r, 1, it.b, 4) + '</row>';
      else {
        var len = String(it.a || '').length, ht = Math.max(1, Math.ceil(len / 80)) * 15 + (it.k === 'H' ? 4 : 0);
        rx += '<row r="' + r + '" ht="' + ht + '" customHeight="1">' + cell(r, 0, it.a, it.k === 'H' ? 3 : 5) + (it.k === 'H' ? cell(r, 1, '', 3) : '') + '</row>';
        merges.push('A' + r + ':B' + r);
      }
    });
    names.push(sheetName(rtl ? 'ملخص' : 'Summary', used));
    sheetFiles.push(sheetXml(rx, [30, 60], 0, merges));
    sheets.forEach(function (sh) {
      var rows = '', rr = 1;
      rows += '<row r="1">' + sh.head.map(function (h, ci) { return cell(1, ci, h, 1); }).join('') + '</row>';
      sh.rows.forEach(function (row, ri) {
        rr++;
        rows += '<row r="' + rr + '">' + row.map(function (v, ci) {
          var hx = sh.colors && sh.colors[ri] && hex6(sh.colors[ri][ci]);
          var st = hx ? xfForColor(hx) : 4;
          if (v === '' || v == null) return hx ? '<c r="' + colName(ci) + rr + '" s="' + st + '"/>' : '';
          return cell(rr, ci, v, st, sh.numeric && ci > 0);
        }).join('') + '</row>';
      });
      names.push(sheetName(sh.name, used));
      sheetFiles.push(sheetXml(rows, widths(sh.head, sh.rows, 9, 45), 1));
    });
    var files = [
      { name: '[Content_Types].xml', data: XML_H + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
        sheetFiles.map(function (_, i) { return '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'; }).join('') + '</Types>' },
      { name: '_rels/.rels', data: XML_H + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
      { name: 'xl/workbook.xml', data: XML_H + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
        names.map(function (n, i) { return '<sheet name="' + xe(n) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>'; }).join('') + '</sheets></workbook>' },
      { name: 'xl/_rels/workbook.xml.rels', data: XML_H + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        sheetFiles.map(function (_, i) { return '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>'; }).join('') +
        '<Relationship Id="rId' + (sheetFiles.length + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>' },
      { name: 'xl/styles.xml', data: XML_H + '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
        '<fonts count="4"><font><sz val="11"/><name val="Tahoma"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Tahoma"/></font><font><b/><sz val="14"/><color rgb="FF0B6B5C"/><name val="Tahoma"/></font><font><b/><sz val="11"/><name val="Tahoma"/></font></fonts>' +
        '<fills count="' + fills.length + '">' + fills.join('') + '</fills>' +
        '<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFB9C4C9"/></left><right style="thin"><color rgb="FFB9C4C9"/></right><top style="thin"><color rgb="FFB9C4C9"/></top><bottom style="thin"><color rgb="FFB9C4C9"/></bottom><diagonal/></border></borders>' +
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
        '<cellXfs count="' + (6 + extraXfs.length) + '">' +
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
        '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"' + (rtl ? ' readingOrder="2"' : '') + '/></xf>' +
        '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>' +
        '<xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"' + (rtl ? ' readingOrder="2"' : '') + '/></xf>' +
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"' + (rtl ? ' readingOrder="2"' : '') + '/></xf>' +
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"' + (rtl ? ' readingOrder="2"' : '') + '/></xf>' +
        extraXfs.join('') + '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>' }
    ];
    sheetFiles.forEach(function (x, i) { files.push({ name: 'xl/worksheets/sheet' + (i + 1) + '.xml', data: x }); });
    return zipStore(files);
  }

  /* ---------- Word حقيقي (.docx) ---------- */
  function mixWhite(hex, k) { /* يفتّح اللون عشان النص يتقري */
    var r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    function m(v) { var x = Math.round(v + (255 - v) * k); return ('0' + x.toString(16)).slice(-2); }
    return (m(r) + m(g) + m(b)).toUpperCase();
  }
  function buildDocx(doc) {
    var rtl = (doc.lang || 'ar') === 'ar';
    var GREEN = '0B6B5C';
    function rpr(o) {
      o = o || {};
      return '<w:rPr><w:rFonts w:ascii="Tahoma" w:hAnsi="Tahoma" w:cs="Tahoma"/>' + (o.b ? '<w:b/><w:bCs/>' : '') +
        (o.color ? '<w:color w:val="' + o.color + '"/>' : '') + '<w:sz w:val="' + (o.sz || 22) + '"/><w:szCs w:val="' + (o.sz || 22) + '"/>' + (rtl ? '<w:rtl/>' : '') + '</w:rPr>';
    }
    function runs(text, o) {
      var parts = String(text == null ? '' : text).split('\n');
      return parts.map(function (ln, i) { return '<w:r>' + rpr(o) + (i ? '<w:br/>' : '') + '<w:t xml:space="preserve">' + xe(ln) + '</w:t></w:r>'; }).join('');
    }
    function para(text, o, ppr) {
      return '<w:p><w:pPr>' + (rtl ? '<w:bidi/>' : '') + (ppr || '') + '</w:pPr>' + runs(text, o) + '</w:p>';
    }
    var BORD = '<w:tblBorders>' + ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(function (s) { return '<w:' + s + ' w:val="single" w:sz="4" w:space="0" w:color="B9C4C9"/>'; }).join('') + '</w:tblBorders>';
    function table(head, rows, opt) {
      opt = opt || {};
      var ncol = head ? head.length : (rows[0] || []).length;
      var x = '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/>' + (rtl ? '<w:bidiVisual/>' : '') + BORD + '<w:tblLayout w:type="autofit"/><w:tblCellMar><w:left w:w="70" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>' + new Array(ncol + 1).join('<w:gridCol w:w="' + Math.floor(10000 / Math.max(1, ncol)) + '"/>') + '</w:tblGrid>';
      function tc(content, fill, first) {
        return '<w:tc><w:tcPr>' + (opt.firstW && first ? '<w:tcW w:w="' + opt.firstW + '" w:type="pct"/>' : '') + (fill ? '<w:shd w:val="clear" w:color="auto" w:fill="' + fill + '"/>' : '') + '</w:tcPr>' + content + '</w:tc>';
      }
      if (head) x += '<w:tr><w:trPr><w:cantSplit/><w:tblHeader/></w:trPr>' + head.map(function (h) { return tc(para(h, { b: 1, sz: 20, color: GREEN }), 'E8F1EF'); }).join('') + '</w:tr>';
      rows.forEach(function (row) {
        x += '<w:tr><w:trPr><w:cantSplit/></w:trPr>';
        for (var ci = 0; ci < ncol; ci++) {
          var c = row[ci];
          if (c && typeof c === 'object' && c.xml) x += tc(c.xml, c.fill, ci === 0);
          else x += tc(para(c, { sz: opt.sz || 20, b: opt.keyBold && ci === 0 }), (opt.keyBold && ci === 0) ? 'F1F6F5' : (c && c.fill) || '', ci === 0);
        }
        x += '</w:tr>';
      });
      return x + '</w:tbl>' + para('', { sz: 8 });
    }
    var body = '', wide = false;
    var dateStr = new Date().toLocaleDateString(rtl ? 'ar-EG' : 'en-GB');
    body += para(doc.title || '', { b: 1, sz: 36, color: GREEN });
    if (doc.subtitle) body += para(doc.subtitle, { sz: 22, color: '667788' });
    body += para('ADAM · ' + dateStr, { b: 1, sz: 18, color: GREEN }, '<w:pBdr><w:bottom w:val="single" w:sz="18" w:space="4" w:color="' + GREEN + '"/></w:pBdr><w:spacing w:after="160"/>');
    (doc.blocks || []).forEach(function (b) {
      if (!b) return;
      if (b.t === 'h') body += para(b.text, { b: 1, sz: b.level === 1 ? 32 : (b.level === 3 ? 24 : 28), color: b.level === 3 ? '102A43' : GREEN }, '<w:keepNext/><w:spacing w:before="200" w:after="60"/>');
      else if (b.t === 'p') body += para(b.text, { sz: 22 }, '<w:spacing w:after="80"/>');
      else if (b.t === 'kv') {
        var kr = (b.rows || []).filter(function (r) { return r && r[1] !== '' && r[1] != null; }).map(function (r) { return [r[0], r[1]]; });
        if (kr.length) body += table(null, kr, { keyBold: true, firstW: 1400 });
      } else if (b.t === 'table') {
        if (b.title) body += para(b.title, { b: 1, sz: 22 }, '<w:keepNext/><w:spacing w:before="160" w:after="40"/>');
        if ((b.head || []).length >= 7) wide = true;
        var rows = (b.rows || []).map(function (r, ri) {
          return (b.head || r).map(function (_, ci) {
            var hx = b.colors && b.colors[ri] && hex6(b.colors[ri][ci]);
            var v = r[ci];
            return hx ? { xml: para(v, { sz: 20 }), fill: hx } : v;
          });
        });
        body += table(b.head || [], rows, { sz: (b.head || []).length >= 7 ? 18 : 20 });
      } else if (b.t === 'chart') {
        if (b.title) body += para(b.title, { b: 1, sz: 22 }, '<w:keepNext/><w:spacing w:before="160" w:after="40"/>');
        var labels = b.labels || [], series = b.series || [], max = b.max || 0;
        if (!max) series.forEach(function (s) { (s.values || []).forEach(function (v) { if (num(v) > max) max = num(v); }); });
        if (!max) max = 10;
        var head = ['#'], crow = [];
        series.forEach(function (s) { head.push(s.name || ''); head.push(''); });
        labels.forEach(function (lb, i) {
          var row = [lb];
          series.forEach(function (s) {
            var col = hex6((s.colors && s.colors[i]) || s.color) || GREEN, v = (s.values || [])[i];
            var len = Math.max(1, Math.round(num(v) / max * 24));
            row.push(v);
            row.push({ xml: para(new Array(len + 1).join('█'), { sz: 18, color: col }) });
          });
          crow.push(row);
        });
        body += table(head, crow, { sz: 20 });
        var lg = (b.legend || []).concat(series.filter(function (s) { return !s.colors; }).map(function (s) { return { name: s.name, color: s.color }; })).filter(function (l) { return l && l.name; });
        if (lg.length) body += '<w:p><w:pPr>' + (rtl ? '<w:bidi/>' : '') + '</w:pPr>' + lg.map(function (l) {
          return '<w:r>' + rpr({ sz: 20, color: hex6(l.color) || GREEN }) + '<w:t xml:space="preserve">■ </w:t></w:r><w:r>' + rpr({ sz: 18 }) + '<w:t xml:space="preserve">' + xe(l.name) + '    </w:t></w:r>';
        }).join('') + '</w:p>';
      } else if (b.t === 'break') body += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
    });
    body += para(rtl ? 'طُبع من تطبيق ADAM · adamxfit.com' : 'Printed from the ADAM app · adamxfit.com', { sz: 18, color: '778899' }, '<w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="CCCCDD"/></w:pBdr><w:spacing w:before="240"/>');
    var pg = wide ? '<w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/>' : '<w:pgSz w:w="11906" w:h="16838"/>';
    var sect = '<w:sectPr>' + pg + '<w:pgMar w:top="800" w:right="800" w:bottom="800" w:left="800" w:header="400" w:footer="400" w:gutter="0"/>' + (rtl ? '<w:bidi/>' : '') + '</w:sectPr>';
    return zipStore([
      { name: '[Content_Types].xml', data: XML_H + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>' },
      { name: '_rels/.rels', data: XML_H + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>' },
      { name: 'word/document.xml', data: XML_H + '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + body + sect + '</w:body></w:document>' }
    ]);
  }

  /* ---------- تنزيل ---------- */
  function downloadBytes(name, mime, bytes) {
    var blob = new Blob([bytes], { type: mime });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }

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
    var fit = 1, zoomK = 1;
    var applyZoom = function () {
      try { frame.contentDocument.documentElement.style.zoom = String(fit * zoomK); } catch (e) {}
    };
    frame.addEventListener('load', function () {
      var w = frame.clientWidth || 794;
      var pw = 794; try { pw = Number(frame.contentDocument.body.getAttribute('data-w')) || 794; } catch (e) {}
      fit = Math.min(1, (w - 2) / pw);
      zoomK = 1;
      applyZoom();
    });
    var zoomBy = function (k) { zoomK = Math.max(0.5, Math.min(4, zoomK * k)); applyZoom(); };
    bar.append(
      ttl,
      mk(L('طباعة / PDF', 'Print / PDF'), function () { try { frame.contentWindow.focus(); frame.contentWindow.print(); } catch (e) { window.print(); } }, true),
      mk('＋', function () { zoomBy(1.25); }),
      mk('－', function () { zoomBy(0.8); }),
      mk('Word', function () { downloadBytes(base + '.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', buildDocx(doc)); }),
      mk('Excel', function () { downloadBytes(base + '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', buildXlsx(doc)); }),
      mk(L('إغلاق', 'Close'), close)
    );
    overlay.append(bar, frame);
    overlay.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    return overlay;
  }

  window.ADAM_PRINT = { open: open, close: close, html: fullHtml, excel: excelXml, xlsx: buildXlsx, docx: buildDocx, _chartSvg: chartSvg };
})();
