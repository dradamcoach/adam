import asyncio, os, sys, json
from playwright.async_api import async_playwright
H=os.path.dirname(os.path.abspath(__file__))
JS='''()=>{
 function parse(c){const m=c.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;const p=m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
 function blend(top,bot){const a=top.a;return {r:top.r*a+bot.r*(1-a),g:top.g*a+bot.g*(1-a),b:top.b*a+bot.b*(1-a),a:1}}
 function bgOf(el){const stack=[];let e=el;while(e){const cs=getComputedStyle(e);const c=parse(cs.backgroundColor);if(c&&c.a>0)stack.push(c);if(c&&c.a>=1)break;e=e.parentElement}
   let base={r:255,g:255,b:255,a:1};if(stack.length&&stack[stack.length-1].a<1){base=parse(getComputedStyle(document.body).backgroundColor)||base;if(base.a<1)base={r:8,g:13,b:23,a:1}}
   for(let i=stack.length-1;i>=0;i--)base=blend(stack[i],base);return base}
 function lum(c){const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)}
 const out=[];const seen=new Set();
 document.querySelectorAll('body *').forEach(el=>{
  if(el.closest('svg')||el.closest('[hidden]'))return;
  const txt=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim().length>0).map(n=>n.textContent.trim()).join(' ');
  if(!txt)return;const r=el.getBoundingClientRect();if(r.width<1||r.height<1)return;
  const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.opacity==='0')return;
  let fg=parse(cs.color);const bg=bgOf(el);fg=blend(fg,bg);
  const L1=lum(fg),L2=lum(bg);const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
  const fs=parseFloat(cs.fontSize),fw=parseInt(cs.fontWeight);const large=fs>=24||(fs>=18.66&&fw>=700);
  const need=large?3:4.5;
  if(ratio<need){const k=el.className+'|'+txt.slice(0,20);if(!seen.has(k)){seen.add(k);out.push([ratio.toFixed(2),need,fs,txt.slice(0,34),String(el.className).slice(0,30)])}}
 });return out}'''
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for th in ('dark','light'):
            tot=0
            for pg in sys.argv[1:]:
                ctx=await b.new_context(viewport={'width':1440,'height':900}); page=await ctx.new_page()
                await page.goto(f'file://{H}/{"index" if pg=="index" else "concept-"+pg}.html?lang=ar&theme={th}'); await page.wait_for_timeout(1300)
                r=await page.evaluate(JS); tot+=len(r)
                print(th,pg,len(r),'issues'); 
                for x in r[:6]: print('   ',x)
                await ctx.close()
        await b.close()
asyncio.run(main())
