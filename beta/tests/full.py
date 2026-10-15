import asyncio,glob,os,re,sys
from playwright.async_api import async_playwright
H=os.getcwd()
pages=sorted(glob.glob('*.html'))
VP={'desktop':(1440,900),'tablet':(820,1100),'mobile':(390,844)}
EM=re.compile('[\U0001F300-\U0001FAFF☀-➿]')
async def main():
    bad=[];n=0
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for pg in pages:
            for lang in('ar','en'):
                for th in('dark','light'):
                    for vn,(w,h) in VP.items():
                        c=await b.new_context(viewport={'width':w,'height':h});pp=await c.new_page();errs=[]
                        pp.on('pageerror',lambda e:errs.append(str(e)))
                        await pp.goto(f'file://{H}/{pg}?lang={lang}&theme={th}&lock=1');await pp.wait_for_timeout(150)
                        r=await pp.evaluate('''()=>{var d=document.documentElement;var o=d.scrollWidth-innerWidth;var t=document.body.innerText;
                          var small=[...document.querySelectorAll('a,button,input,select,textarea,[role=tab],[role=radio]')].filter(e=>{var r=e.getBoundingClientRect();var s=getComputedStyle(e);return r.width>0&&s.visibility!='hidden'&&(r.height<44-1||r.width<44-1)&&e.type!='checkbox'&&e.type!='radio'&&!e.closest('[hidden]')&&!e.closest('.sr')&&e.tagName!='A'||0}).length;
                          return {o:o,l:d.lang,dir:d.dir,t:d.getAttribute('data-theme'),txt:t,small:small}}''')
                        n+=1
                        if r['o']>1:bad.append((pg,lang,th,vn,'overflow',r['o']))
                        if r['l']!=lang or r['t']!=th or r['dir']!=('rtl' if lang=='ar' else 'ltr'):bad.append((pg,lang,th,vn,'state',r['l'],r['t'],r['dir']))
                        if EM.search(r['txt']):bad.append((pg,lang,th,vn,'emoji'))
                        if errs:bad.append((pg,lang,th,vn,'js',errs[0][:80]))
                        await c.close()
        await b.close()
    print('checked',n,'combos; issues',len(bad))
    for x in bad[:60]:print(x)
asyncio.run(main())
