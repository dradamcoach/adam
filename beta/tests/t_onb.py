import asyncio,os
from playwright.async_api import async_playwright
H=os.path.dirname(os.path.abspath(__file__))
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={'width':1280,'height':900}); pg=await ctx.new_page(); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)[:200])); pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='error' else None)
        await pg.goto(f'file://{H}/concept-onboard.html?type=coach'); await pg.wait_for_timeout(600)
        print('start step',await pg.evaluate("document.querySelector('.step.on').dataset.step"))
        # step2 validation
        await pg.click('#next'); await pg.wait_for_timeout(200)
        print('errsum on',await pg.evaluate("document.getElementById('es').classList.contains('on')"), await pg.evaluate("document.querySelectorAll('.fld.bad').length"))
        await pg.fill('#acc\\.name','Ahmed Test'); await pg.fill('#acc\\.role','Myself')
        await pg.fill('#acc\\.email','a@b.co'); await pg.click('[data-vf="acc.email"] .vsend'); await pg.fill('[data-vf="acc.email"] .vc input','123456'); await pg.click('[data-vf="acc.email"] .vgo')
        await pg.fill('#acc\\.phone','01000000000'); await pg.click('[data-vf="acc.phone"] .vsend'); await pg.fill('[data-vf="acc.phone"] .vc input','123456'); await pg.click('[data-vf="acc.phone"] .vgo')
        # toggle language + theme mid-form, check values kept
        await pg.click('[data-lang-set="en"]'); await pg.click('[data-theme-set="light"]'); await pg.wait_for_timeout(200)
        print('after toggle',await pg.evaluate("[document.documentElement.lang,document.documentElement.dir,document.documentElement.dataset.theme,document.getElementById('acc.name').value,document.querySelectorAll('.vrow.ok').length].join('|')"))
        await pg.click('#next'); await pg.wait_for_timeout(200)
        print('step',await pg.evaluate("document.querySelector('.step.on').dataset.step"), 'errors:',errs)
        # persistence reload
        await pg.reload(); await pg.wait_for_timeout(500)
        print('reload lang/theme',await pg.evaluate("[document.documentElement.lang,document.documentElement.dataset.theme,document.getElementById('resume').classList.contains('on')].join('|')"))
        await b.close()
asyncio.run(main())
