import { browser, $, $$, element, ExpectedConditions as EC, by ,Key,By, ActionSequence} from 'protractor'
import {expect} from 'chai'

beforeEach(async function(){
    await browser.sleep(300)
    await browser.get('/')
    await browser.sleep(500)
})

describe('Movie details', async function () {
   it('should have movie name as header', async function () {
        let search = await $(`[name="searchStr"]`)
        let name1 = 'Maze runner'
        await search.sendKeys(name1)
        await search.sendKeys(Key.ENTER)    
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-sm-3 movie-card img').first()),
        EC.visibilityOf($$('.col-sm-3 movie-card img').get(10)),
        EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c1][child::h3]'))),
        EC.visibilityOf($$('.col-sm-3 movie-card img').last())),15000,'3 elements should appear')
        await element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(0).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('.col-md-8 h2 .label')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($$('.col-md-3 img').get(0))),20000,'3 elements should appear')
        let name = 'The Maze Runner'
        let frazefordelete = (await $('.col-md-8 h2 .label').getText()).toString().length
        let fullfraze = (await element(By.xpath(`//*[contains(@class, 'col-md-8')]/h2[child::small]`)).getText()).toString()
        let fraze = await fullfraze.slice(0,-frazefordelete-1)
        expect(fraze).to.equal(name)
        console.log('Eсли пройден,то' + ' ' +name+'='+ await fullfraze.slice(0,-frazefordelete-1))
    });

    it('should have raiting', async function () {
        let search = await $(`[name="searchStr"]`)
        let name = 'Matrix'
        await search.sendKeys(name)
        await search.sendKeys(Key.ENTER)
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-sm-3 movie-card img').first()),
        EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c1][child::h3]'))),
        EC.visibilityOf($$('.col-sm-3 movie-card img').get(10)),
        EC.visibilityOf($$('.col-sm-3 movie-card img').last())),20000,'3 elements should appear')
        await element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(0).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('.col-md-8 h2 .label')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($$('.col-md-3 img').get(0))),20000,'3 elements should appear')
        let raiting = await $('.col-md-8 h2 .label').getText()
        expect(await raiting).not.to.be.NaN
        console.log('The raiting of film is'+' '+await raiting)
    });

    it('should have simular movies block with atleast one movie', async function () {
        let search = await $(`[name="searchStr"]`)
        let name1 = 'Wing Commander'
        await search.sendKeys(name1)
        await search.sendKeys(Key.ENTER)   
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-sm-3 movie-card img').first()),
        EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c1][child::h3]'))),
        EC.visibilityOf(element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(0)),
        EC.visibilityOf($$('.col-sm-3 movie-card img').get(10)),
        EC.visibilityOf($$('.col-sm-3 movie-card img').last())),15000,'5 elements should appear')
        await element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(0).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('.col-md-8 h2 .label')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($$('.col-md-3 img').get(0))),20000,'3 elements should appear')
        let countofsimilarmovies = $$('[_ngcontent-c2] img')
        expect(await countofsimilarmovies.count()).to.be.above(0)
        console.log("Number of similar movies is" +' '+ await countofsimilarmovies.count())
        let ganresoffilm = (await $$('p a.m-r-md').getText()).toString().split(',')
        console.log(await ganresoffilm)
        await browser.executeScript("scroll(250,0)")
        await browser.wait(EC.visibilityOf($$('.caption h4.text-ellipsis a').get(0)),15000, 'Not found')
        await $$('.caption h4.text-ellipsis a').first().click()
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-md-2 img').first()),
        EC.visibilityOf($$('.col-md-2 img').last())),20000,'2 elements should')
        let count = await $$('p a.m-r-md').count()
        await browser.wait(EC.and(
        EC.visibilityOf($$('p a.m-r-md').get(0)),
        EC.visibilityOf($$('p a.m-r-md').get(count-1))),20000,'2 elements should appear')
        let ganresofsimilarfilm = (await $$('p a.m-r-md').getText()).toString().split(',')
        console.log(await ganresofsimilarfilm)
        async function Intersec(arr1,arr2){
            let idx = 0, arr3 = [];
            for (let i = 0; i < arr2.length; i++){
                idx = arr1.indexOf(arr2[i]);
                if (idx >= 0) arr3.push(arr2[i]);
            }
            return arr3;
        }
        expect(await Intersec(ganresoffilm,ganresofsimilarfilm)).not.to.be.empty
        console.log('Фильмы совпадают по таким жанрам: '+ await Intersec(ganresoffilm,ganresofsimilarfilm))
    })
})
describe('cast block', async function () {
    it('should show atleast one actor', async function () {
        let search = await $(`[name="searchStr"]`)
        let name = 'Lord of the Rings'
        await search.sendKeys(name)
        await search.sendKeys(Key.ENTER)
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-sm-3 movie-card img').first()),
        EC.visibilityOf($$('.col-sm-3 movie-card img').get(10)),
        EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c1][child::h3]'))),
        EC.visibilityOf(element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(0)),
        EC.visibilityOf($$('.col-sm-3 movie-card img').last())),15000,'5 elements should appear')
        await browser.wait(EC.visibilityOf($('[_ngcontent-c1] .orange-text')),20000,'Element not found')
        await element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(0).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('.col-md-8 h2 .label')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($$('.col-md-3 img').get(0))),20000,'3 elements should appear')
        expect(await ($$('.col-md-3 img')).count()).to.be.above(0)
        console.log(await $$('.col-md-3 .text-center a').get(0).getText())
    })
})  

describe('reviews block', function () {
    it('should be atleast one review', async function () {
        let search = await $(`[name="searchStr"]`)
        let name = 'Thor 3'
        await search.sendKeys(name)
        await search.sendKeys(Key.ENTER)
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-sm-3 movie-card img').first()),
        EC.visibilityOf($$('.col-sm-3 movie-card img').get(10)),
        EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c1][child::h3]'))),
        EC.visibilityOf($$('.text-ellipsis [title*="Thor"]').get(1)),
        EC.visibilityOf($$('.col-sm-3 movie-card img').last())),20000,'3 elements should ')
        await element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(1).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('.col-md-8 h2 .label')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($$('.col-md-3 img').get(0))),20000,'3 elements should appear')
        expect(await $$('.text-justify').count()).to.be.above(0)
        expect(await $$('.text-justify').get(0).getText()).not.to.be.empty
        console.log(await $$('.text-justify').get(0).getText())
    })

    it('should have reviewer name as link to source', async function () {
        let search = await $(`[name="searchStr"]`);
        let name = 'Pacific Rim';
        await search.sendKeys(name)
        await search.sendKeys(Key.ENTER)
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-sm-3 movie-card img').first()),
        EC.visibilityOf($$('.col-sm-3 movie-card img').get(10)),
        EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c1][child::h3]'))),
        EC.visibilityOf($$('.col-sm-3 movie-card img').last())),20000,'3 elements should appear')
        await element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(0).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('.col-md-8 h2 .label')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($$('.col-md-3 img').get(0))),20000,'3 elements should appear')
        expect(await $$('.text-justify').count()).to.be.above(0)
        expect(await $$('.text-justify+footer a').get(0).getAttribute('href')).to.contain('http')
        await $$('.text-justify+footer a').get(0).click()
        let winHandles=browser.getAllWindowHandles();
        await winHandles.then(async function(handles) {
            let parentWindow =handles[0];
            let popUpWindow=handles[1];
            await browser.switchTo().window(popUpWindow);
            await browser.waitForAngularEnabled(false)
            await browser.wait(EC.visibilityOf($('.sub-heading')),20000,'Element not found')
            expect(await $('.sub-heading').getText()).to.contain('Written by')
            console.log(await $('.sub-heading+p').getText())
            await browser.close()
            await browser.switchTo().window(parentWindow)
        })
    })
})

describe('Popular series', async function () {
    it('shouldnt have search bar', async function () {
        await browser.wait(EC.and(
        EC.visibilityOf(element(By.xpath(`//*[@_ngcontent-c1 and child::*[contains(@class,'col-sm-6')]]`))),
        EC.visibilityOf(element(By.xpath(`//*[@_ngcontent-c1 and child::*[contains(@class,'col-sm-3')]]`)))),
        20000,'2 elements not appeared')
        await $(`[routerlink*="series"]`).click()
        await browser.wait(EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c3][child::h3]'))),20000,'Element not appeared')
        expect (await $('.orange-text').getText()).to.contain('Popular Series')
        expect (await $(`[name='searchStr']`).isPresent()).to.equal(false)
    })

    it('should have "First Air Date" instead "Release Date"', async function () {
        await browser.wait(EC.and(
        EC.visibilityOf(element(By.xpath(`//*[@_ngcontent-c1 and child::*[contains(@class,'col-sm-6')]]`))),
        EC.visibilityOf(element(By.xpath(`//*[@_ngcontent-c1 and child::*[contains(@class,'col-sm-3')]]`)))),
        20000,'2 elements not appeared')
        let popularfilms = await $(`a[routerlink*="series"]`).click()
        await browser.wait(EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c3][child::h3]'))),20000,'Element not appeared')
        expect (await $('.orange-text').getText()).to.contain('Popular Series')
        let firstairtext:any = await $$(`.text-ellipsis+p strong`).getText()
        firstairtext.forEach(text => expect (text).to.contain('First Air Date'))      
        console.log("Количество популярных фильмов на сайте "+ await $$(`.text-ellipsis+p strong`).count())   
    });
})