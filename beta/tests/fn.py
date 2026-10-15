import asyncio,os
from playwright.async_api import async_playwright
H=os.getcwd()
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(viewport={'width':1280,'height':900});pg=await ctx.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        # controls: persistence + form preservation
        await pg.goto(f'file://{H}/concept-controls.html');await pg.fill('#ft','hello')
        await pg.click('[data-lang-set=en]');await pg.click('[data-theme-set=light]')
        print('controls',await pg.evaluate("[document.documentElement.lang,document.documentElement.dir,document.documentElement.dataset.theme,document.getElementById('ft').value,document.getElementById('fk').innerText]"))
        await pg.reload();print('reload',await pg.evaluate("[document.documentElement.lang,document.documentElement.dataset.theme]"))
        await pg.click('[data-lang-set=ar]');print('independent',await pg.evaluate("[document.documentElement.lang,document.documentElement.dataset.theme]"))
        # publish validation
        await pg.goto(f'file://{H}/concept-publish.html?lang=en&lock=1');await pg.click('#sb');print('publish invalid',await pg.inner_text('#fb'))
        await pg.fill('#tt','X');await pg.fill('#ds','Y');await pg.fill('#pr','500');await pg.click('#sb');print('publish ok',await pg.inner_text('#fb'))
        # review gating
        await pg.goto(f'file://{H}/concept-review.html?lang=en&lock=1');print('approve disabled',await pg.is_disabled('#ap'))
        for c in await pg.query_selector_all('.rc'):await c.check()
        print('approve enabled',not await pg.is_disabled('#ap'));await pg.click('#rj');print('reject w/o note',await pg.inner_text('#rm'))
        # profile kinds
        for k in('coach','spec','store','clinic','club','gym'):
            await pg.goto(f'file://{H}/concept-profile.html?kind={k}&lang=en&lock=1');vis=await pg.evaluate("[...document.querySelectorAll('#pk>[data-p]')].filter(e=>!e.hidden).length");print('profile',k,vis)
        # discover filter
        await pg.goto(f'file://{H}/concept-discover.html?lang=en&lock=1');print('discover cards',await pg.evaluate("document.querySelectorAll('.pc,.res,.card[data-k]').length"))
        print('jserrors',errs)
        await b.close()
asyncio.run(main())
