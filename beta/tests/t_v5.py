import asyncio,os
from playwright.async_api import async_playwright
H=os.getcwd()
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':1440,'height':900});errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(f'file://{H}/concept-builder.html?lang=en&lock=1');await pg.wait_for_timeout(300)
        n0=await pg.locator('.ex').count()
        await pg.click('[data-add=run]');print('add exercise',n0,'->',await pg.locator('.ex').count())
        await pg.click('[data-sub="m:0"]');print('substitute',await pg.inner_text('#msg'),'|',await pg.inner_text('#hist li:first-child'))
        await pg.fill('#rn','test');await pg.click('#sv');print('revision',await pg.inner_text('#ver'))
        await pg.click('#pub');print('publish',await pg.inner_text('#msg'))
        await pg.click('[data-day="2"]');print('rest day',await pg.inner_text('#ses'))
        await pg.click('[data-day="4"]');print('rehab fields',await pg.locator('#ses input[data-k]').count(),await pg.inner_text('#ses .chip'))
        await pg.fill('#ls','zzz');print('empty lib',await pg.inner_text('#lib'))
        await pg.click('[data-lang-set=ar]');await pg.wait_for_timeout(200);print('lang ar keeps day 5:',await pg.inner_text('.dy[aria-current=true]'))
        # tasks
        await pg.goto(f'file://{H}/concept-tasks.html?lang=en&lock=1&role=store');await pg.wait_for_timeout(300)
        print('tasks store',await pg.locator('#tkp [data-p=store] .tr:visible').count())
        await pg.click('.fl [data-f=wait]');print('wait filter',await pg.locator('#tkp .tr:visible').count(),'empty hidden',await pg.is_hidden('#em'))
        await pg.click('[data-tabs=tkp] [data-t=club]');await pg.click('.fl [data-f=all]');print('club',await pg.locator('#tkp .tr:visible').count())
        # device setting
        await pg.goto(f'file://{H}/concept-controls.html?lang=en&lock=1')
        await pg.emulate_media(color_scheme='light');await pg.click('[data-theme-set=system]');print('system+light OS ->',await pg.evaluate("document.documentElement.dataset.theme"))
        await pg.emulate_media(color_scheme='dark');await pg.wait_for_timeout(200);print('OS dark ->',await pg.evaluate("document.documentElement.dataset.theme"))
        await pg.click('[data-theme-set=light]');await pg.emulate_media(color_scheme='dark');print('manual light wins',await pg.evaluate("document.documentElement.dataset.theme"))
        print('errs',errs);await b.close()
asyncio.run(main())
