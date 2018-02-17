import { browser, $, $$, element, by, Key, until, ElementFinder} from 'protractor'
import { error } from 'util';

describe('Movie card ', async function(){
    beforeEach(async function(){
        await browser.get('/')
        await browser.manage().timeouts().implicitlyWait(5000)
    })

    it('should have name', async function(){
        let expectedName = 'Once Upon'
        expect (await ($(`a[title*='Once'][href='/movie/311']`)).getText()).toContain(expectedName) 
        console.log(await ($(`a[title*='Once'][href='/movie/311']`)).getText())
    })

    it('should have "raiting" pointer', async function(){
        let movies = await $$(`.col-sm-3`).count()
        let raitings = await $$(`.col-sm-3 .pull-right`).count()
        console.log('movies'+ ' '+movies)
        console.log('with raiting'+ ' '+ raitings)
        expect(movies).toEqual(raitings)           
    })

    it('should open appropriate "movie details" page, after click on "name" field', async function(){
        await $(`.text-ellipsis a[href*="129"]`).click()
        await browser.sleep(5000)
        expect(await element(by.xpath(`//p[contains(.,'When her parents')]`)).getText()).toContain('courage she never knew she')
        console.log (await element(by.xpath(`//p[contains(.,'When her parents')]`)).getText())
    })
})