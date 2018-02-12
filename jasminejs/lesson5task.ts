import { browser, $, $$, element, ExpectedConditions as EC, by ,Key,By, ActionSequence} from 'protractor'
import {expect} from 'chai'

beforeEach(async function(){
    await browser.get('/')
})
describe('Movie details', async function () {
   it('should have movie name as header', async function () {
        await $('.text-ellipsis [title*="Maze"]').click()
        await browser.wait(EC.and(
    EC.visibilityOf($('[class = "col-md-8"] h2')),
    EC.visibilityOf($('.col-md-4 img')),
    EC.visibilityOf($('img[src*="dvWPaE"]'))
),3000,'3 elements should appear')
let name = 'The Maze Runner'
let frazefordelete = (await $('[class = "col-md-8"] h2 small').getText()).toString().length
let fullfraze = (await $('[class = "col-md-8"] h2').getText()).toString()
let fraze = await fullfraze.slice(0,-frazefordelete-1)
expect(fraze).to.equal(name)
console.log('Eсли пройден,то' + ' ' +name+'='+ await fullfraze.slice(0,-frazefordelete-1))
    })

    it('should have raiting', async function () {
        let search = $(`[name="searchStr"]`)
            let name = 'Matrix'
            await search.sendKeys(name)
            await search.sendKeys(Key.ENTER)
            await browser.wait(EC.and(
                EC.visibilityOf($('[_ngcontent-c1] .orange-text')),
                EC.visibilityOf($$('[_ngcontent-c2] strong').get(0))
            ),10000,'Element not found')
            await $$('.text-ellipsis [title*="Matrix"]').get(0).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('[class = "col-md-8"] h2')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($('img[src*="lXZ5QTC"]'))),10000,'3 elements should appear')
       let raiting = (await $('[class = "col-md-8"] h2 small').getText())
       expect(await raiting).not.to.be.NaN
       console.log('The raiting of film is'+' '+await raiting)
    })

    it('should have simular movies block with atleast one movie', async function () {
        await $('.text-ellipsis [title*="Maze Runner"]').click()
        await browser.wait(EC.and(
    EC.visibilityOf($('[class = "col-md-8"] h2')),
    EC.visibilityOf($('.col-md-4 img')),
    EC.visibilityOf($('img[src*="dvWPaE"]'))
),10000,'3 elements should appear')
    let countofsimilarmovies = $$('[_ngcontent-c2] img')
    expect(await countofsimilarmovies.count()).to.be.above(0)
    console.log("Number of similar movies is" +' '+ await countofsimilarmovies.count())
    let ganresoffilm = (await $$('p a.m-r-md').getText()).toString().split(',')
    console.log(await ganresoffilm)
    let elementclick = $$('.text-ellipsis a').get(0)
    await browser.executeScript("scroll(250, 0)")
    await elementclick.click()
    await browser.wait(EC.visibilityOf(element(by.xpath(`//p[contains(.,'In a world divided into factions based on personality')]`))),10000,'Must be visibleimg')
    let ganresofsimilarfilm = (await $$('p a.m-r-md').getText()).toString().split(',')
    console.log(await ganresofsimilarfilm)
    async function Intersec(arr1,arr2){
         var idx = 0, arr3 = [];
         for (var i = 0; i < arr2.length; i++){
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
            let search = $(`[name="searchStr"]`)
            let name = 'Lord of the Rings'
            await search.sendKeys(name)
            await search.sendKeys(Key.ENTER)
            await browser.wait(EC.visibilityOf($('[_ngcontent-c1] .orange-text')),10000,'Element not found')
            await $$('.text-ellipsis [title*="Lord of the"]').get(0).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('[class = "col-md-8"] h2')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf($('img[src*="AEsyRvnUT"]'))),10000,'3 elements should appear')
          expect(await ($$('.col-md-3 img')).count()).to.be.above(0)
          console.log(await $$('.col-md-3 .text-center a').get(0).getText())
        })
    })  

    describe('reviews block', function () {
        it('should be atleast one review', async function () {
            let search = $(`[name="searchStr"]`)
            let name = 'Thor 3'
            await search.sendKeys(name)
            await search.sendKeys(Key.ENTER)
            await browser.wait(EC.visibilityOf($('[_ngcontent-c1] .orange-text')),10000,'Element not found')
            await $$('.text-ellipsis [title*="Thor"]').get(1).click()
        await browser.wait(EC.and(
    EC.visibilityOf($('[class = "col-md-8"] h2')),
    EC.visibilityOf($('.col-md-4 img')),
    EC.visibilityOf($('img[src*="DUM1THKl"]'))
),10000,'3 elements should appear')
expect(await $$('.text-justify').count()).to.be.above(0)
expect(await $$('.text-justify').get(0).getText()).not.to.be.empty
console.log(await $$('.text-justify').get(0).getText())
        })

        it('should have reviewer name as link to source', async function () {
            let search = $(`[name="searchStr"]`)
            let name = 'Pacific Rim'
            await search.sendKeys(name)
            await search.sendKeys(Key.ENTER)
            await browser.wait(EC.visibilityOf($('[_ngcontent-c1] .orange-text')),10000,'Element not found')
            await $$('.text-ellipsis [title*="Pacific Rim"]').get(0).click()
        await browser.wait(EC.and(
    EC.visibilityOf($('[class = "col-md-8"] h2')),
    EC.visibilityOf($('.col-md-4 img')),
    EC.visibilityOf($$('.col-md-3 img').get(0))
),10000,'3 elements should appear')
expect(await $$('.text-justify').count()).to.be.above(0)
expect(await $$('.text-justify+footer a').get(0).getAttribute('href')).to.contain('http')
await $$('.text-justify+footer a').get(0).click()
let winHandles=browser.getAllWindowHandles();
await winHandles.then(async function(handles) 
{
    let parentWindow =handles[0];
    let popUpWindow=handles[1];
    await browser.switchTo().window(popUpWindow);
    await browser.waitForAngularEnabled(false)
await browser.wait(EC.visibilityOf($('.sub-heading')),10000,'Element not found')
expect(await $('.sub-heading').getText()).to.contain('Written by')
console.log(await $('.sub-heading+p').getText())
await browser.close()
await browser.switchTo().window(parentWindow)
})

    })
})

describe('Popular series', async function () {
    it('shouldnt have search bar', async function () {
        let popularmovies = await $(`[routerlink*="series"]`).click()
     await browser.wait(EC.visibilityOf($('.orange-text')),10000,'Element popular movies not found')
        expect (await $('.orange-text').getText()).to.contain('Popular Series')
        expect (await $(`[name='searchStr']`).isPresent()).to.equal(false)
        })

    it('should have "First Air Date" instead "Release Date"', async function () {
        let popularmovies = await $(`[routerlink*="series"]`).click()
        await browser.wait(EC.visibilityOf($('.orange-text')),10000,'Element popular movies not found')
           expect (await $('.orange-text').getText()).to.contain('Popular Series')
           let foundTitles = $$(`.text-ellipsis+p strong`)
           let firstairtext:any = await foundTitles.getText()
           firstairtext.forEach(text => expect (text).to.contain('First Air Date'))      
           console.log("Количество популярных фильмов на сайте "+ await $$(`.text-ellipsis+p strong`).count())   
    })
})