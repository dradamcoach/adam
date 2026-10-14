import asyncio,os,glob
from playwright.async_api import async_playwright
H=os.getcwd()
JS='''()=>{var bad=[];document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea,[role=tab],[role=radio]').forEach(e=>{if(e.closest('[hidden]'))return;var r=e.getBoundingClientRect();if(!r.width)return;var n=(e.getAttribute('aria-label')||'').trim()||(e.innerText||'').trim()||(e.labels&&e.labels.length?e.labels[0].innerText.trim():'')||(e.getAttribute('title')||'')||(e.getAttribute('placeholder')||'');if(!n&&e.id){var l=document.querySelector('label[for='+e.id+']');if(l)n=l.textContent.trim()}if(!n&&e.closest('label'))n=e.closest('label').textContent.trim();if(!n)bad.push(e.tagName+'.'+String(e.className).slice(0,25))});return bad}'''
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();tot=0
        for f in sorted(glob.glob('*.html')):
            for w in(1440,390):
                pg=await b.new_page(viewport={'width':w,'height':900});await pg.goto(f'file://{H}/{f}?lang=en&lock=1');await pg.wait_for_timeout(150)
                r=await pg.evaluate(JS)
                if r:print(f,w,len(r),r[:4]);tot+=len(r)
                await pg.close()
        print('total unnamed controls',tot);await b.close()
asyncio.run(main())
