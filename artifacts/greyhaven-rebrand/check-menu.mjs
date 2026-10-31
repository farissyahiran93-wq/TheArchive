import { chromium } from 'playwright';
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:844,height:390}});
await page.goto('http://127.0.0.1:4174');
await page.getByRole('heading',{name:'GREYHAVEN',exact:true}).waitFor();
console.log(await page.locator('.menu-brand').evaluate(el=>({client:el.clientWidth,scroll:el.scrollWidth,rect:el.getBoundingClientRect().toJSON(),children:[...el.children].map(c=>({tag:c.tagName,text:c.textContent,client:c.clientWidth,scroll:c.scrollWidth,font:getComputedStyle(c).fontSize,rect:c.getBoundingClientRect().toJSON()}))})));
await page.screenshot({path:'artifacts/greyhaven-rebrand/menu-landscape-debug.png'});
await browser.close();
