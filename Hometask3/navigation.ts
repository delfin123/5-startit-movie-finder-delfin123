import { browser, $, $$, element, by} from 'protractor'

describe('Navigation ',async function() {
    
    it('should open "Upcoming movies" section', async function() {
        await browser.get('/')
        await $(`#navbar [routerlink="/upcoming"]`).click()
        await browser.sleep(3000)
        expect (await $(`.orange-text`).getText()).toContain('Up Coming')
    })

    it('should open "Popular Series" section', async function(){
        await browser.get('/')
        await $(`[routerlink*="series"]`).click()
        await browser.sleep(3000)
        expect (await $(`.orange-text`).getText()).toContain('Popular Series')
    })

    it('should open "Action" category', async function(){
        await browser.get('/')
        await $(`[href="/genres/28/Action"]`).click()
        await browser.sleep(3000)
        expect (await $(`.orange-text`).getText()).toContain('Action')
    })
})