import { browser, $, $$, element, ExpectedConditions as EC, by ,Key,By, ActionSequence} from 'protractor'
import {expect} from 'chai'
import { Lesson5 } from './pages/lesson5'

beforeEach(async function(){
    await browser.sleep(200)
    await browser.get('/')
    await browser.sleep(200)
})
const lesson5 = new Lesson5()
describe('Movie details', async function () {
   it('should have movie name as header', async function () {
        let search_request = 'Maze runner'
        await lesson5.searchOfMovie(search_request)
        let name = 'The Maze Runner'
        await lesson5.chooseFilmAtSearchResult(0)
        let fraze = await lesson5.obtainClearNameOfMovie()
        expect(fraze).to.equal(name)
        console.log('Eсли пройден,то' + ' ' + name+'='+ fraze)
    })

    it('should have raiting', async function () {
        let search_request= "Matrix"
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(0)
        let raiting =  $('.col-md-8 h2 .label').getText()
        expect(await raiting).not.to.be.NaN
        console.log('The raiting of film is '+ await raiting)
    })

    it('should have simular movies block with atleast one movie', async function () {
        let search_request = 'Wing Commander'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(0)
        expect(await $$('[_ngcontent-c2] img').count()).to.be.above(0)
        console.log("Number of similar movies is" +' '+ await $$('[_ngcontent-c2] img').count())
        let ganresoffilm = await $$('p a.m-r-md').map(async function (element){
            return element.getText()
        })
        console.log(ganresoffilm)        
        await $$('.caption h4.text-ellipsis a').first().click()
        await lesson5.waitForCategoriesVisibility()
        await browser.sleep(2000)
        let ganresofsimilarfilm = await $$('p a.m-r-md').map(async function (element2){
            return element2.getText()
        })
        console.log(ganresofsimilarfilm)
        async function Intersec(arr1,arr2){
            let idx = 0, arr3 = [];
            for (let i = 0; i < arr2.length; i++){
                idx = arr1.indexOf(arr2[i]);
                if (idx >= 0) arr3.push(arr2[i]);
            }
            return arr3;
        }
        expect(await Intersec(ganresoffilm,ganresofsimilarfilm)).not.to.be.empty
        await browser.sleep(2000)
        console.log('Фильмы совпадают по таким жанрам: '+ await Intersec(ganresoffilm,ganresofsimilarfilm))
    })
})
describe('cast block', async function () {
    it('should show atleast one actor', async function () {
        let search_request = 'Lord of the Rings'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(0)
        expect(await $$('.col-md-3 img').count()).to.be.above(0)
        console.log(await $$('.col-md-3 .text-center a').first().getText())
    })
})  

describe('reviews block', function () {
    it('should be atleast one review', async function () {
        let search_request = 'Thor 3'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(1)
        expect(await $$('.text-justify').count()).to.be.above(0)
        expect(await $$('.text-justify').first().getText()).not.to.be.empty
        console.log(await $$('.text-justify').first().getText())
    })

    it('should have reviewer name as link to source', async function () {
        let search_request = 'Pacific Rim'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(0)
        expect(await $$('.text-justify').count()).to.be.above(0)
        expect(await $$('.text-justify+footer a').first().getAttribute('href')).to.contain('http')
        await $$('.text-justify+footer a').first().click()
        let winHandles= browser.getAllWindowHandles();
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
        await $(`[routerlink*="series"]`).click()
        await lesson5.waitForPopularMoviesVisibility()
        expect (await $('.orange-text').getText()).to.contain('Popular Series')
        expect (await $(`[name='searchStr']`).isPresent()).to.equal(false)
    })

    it('should have "First Air Date" instead "Release Date"', async function () {
        await $(`a[routerlink="popular/series"]`).click()
        await lesson5.waitForPopularMoviesVisibility()
        await browser.sleep(2000)
        let searchelement = $$(`.text-ellipsis+p strong`)
        let massive = await searchelement.map(async function (element){
            return element.getText()
        })
        let fraze = "First Air Date"
        //massive.forEach(text=>expect(text).to.contain("First Air Date"))
        async function check(a,b){
            for (let i = 0; i < a.length; i++){
            if(a[i].indexOf(b)>=0) continue
            else{throw new Error('Не совпадают')}
        }
    }
        await check(massive,fraze)
        await browser.sleep(2000)
        console.log("Количество популярных фильмов на сайте "+ await searchelement.count())
    })
})