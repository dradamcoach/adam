import asyncio,sys,os
from playwright.async_api import async_playwright
H=os.path.dirname(os.path.abspath(__file__))
pages=['landing','client','coach','analytics','store','clinic','club','custom','admin','discover','join','onboard','status','provider','profile','publish','review','roles','controls','tasks','builder','insights']
JS='''()=>{const out=[];document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=switch],[role=tab]').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;
 // inline text links inside paragraphs are exempt
 if(e.tagName==='A'&&cs.display==='inline'&&e.closest('p,.t-xs,.t-sm,footer'))return;
 if(r.height<40||r.width<40)out.push((e.className||e.tagName)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' '+(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,18))});return out}'''
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for pg in pages:
            ctx=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True)
            page=await ctx.new_page()
            await page.goto(f'file://{H}/concept-{pg}.html?lang=ar&theme=dark'); await page.wait_for_timeout(900)
            r=await page.evaluate(JS)
            from collections import Counter
            c=Counter([x.split(' ')[0]+' '+x.split(' ')[1] for x in r])
            print(pg,len(r),r[:8])
            await ctx.close()
        await b.close()
asyncio.run(main())
