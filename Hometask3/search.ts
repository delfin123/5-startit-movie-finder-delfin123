import { browser, $, $$, element, by, Key} from 'protractor'

describe('Search ', async function(){

    it('by exisiting name, should show first movie with complete name match', async function(){
        await browser.get('/')
        let search = $(`[name="searchStr"]`)
        let name = 'Pacific Rim'
        await search.sendKeys(name)
        await search.sendKeys(Key.ENTER)
        await browser.sleep(3000)
        expect(await $$(`[class*="col-lg-3 col-xs-6"] [class="text-ellipsis"] a`).first().getAttribute('title')).toBe(name)
        console.log(await $$(`[class*="col-lg-3 col-xs-6"] [class="text-ellipsis"] a`).first().getAttribute('title'))
    })

    it('results(all of them) should contain search request', async function(){
        await browser.get('/')
        let search = $(`[name="searchStr"]`)
        let name = 'Lord of the Rings'
        await search.sendKeys(name)
        await search.sendKeys(Key.ENTER)
        await browser.sleep(3000)
        let foundTitles = $$(`[_ngcontent-c1]>[class*="flex"] [class*="ellipsis"]>a`);
        let titles:any = await foundTitles.getAttribute('title')
        titles.forEach(title => expect (title).toContain(name))
        console.log(await $$(`[_ngcontent-c1]>[class*="flex"] [class*="ellipsis"]>a`).getAttribute('title'))
        })
    

    it('result should be empty, after request for nonexistent movie', async function(){
        await browser.get('/')
        let search = $(`[name="searchStr"]`)
        let name = 'dhcr'
        await search.sendKeys(name)
        await search.sendKeys(Key.ENTER)
        await browser.sleep(3000)
        let foundTitles = $$(`[_ngcontent-c1]>[class*="flex"] [class*="ellipsis"]>a`)
        expect(await foundTitles.count()).toBe(0)
    })
})