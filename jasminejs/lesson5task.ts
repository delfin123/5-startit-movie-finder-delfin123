import { browser, $, $$, element, ExpectedConditions as EC, by ,Key,By, ActionSequence} from 'protractor'
import {expect} from 'chai'
import { Lesson5 } from './pages/lesson5'

beforeEach(async function(){
    await browser.sleep(200)              //set a small delay before each test
    await browser.get('/')                //browser should open on the given page before each test
    await browser.sleep(200)
})
const lesson5 = new Lesson5()
describe('Movie details', async function () {
   it('should have movie name as header', async function () {
        let search_request = 'Maze runner'
        await lesson5.searchOfMovie(search_request)                //Enter the name of the movie in search string and click on the search button
        let name = 'The Maze Runner'
        await lesson5.chooseFilmAtSearchResult(0)                  //select the first movie found in search results and click on it
        let fraze = await lesson5.obtainClearNameOfMovie()         //get the full title from the movie title
        expect(fraze).to.equal(name)                               //The received name must completely match with the expected title of film
        console.log('Eсли пройден,то' + ' ' + name+'='+ fraze)     //output to the console the name obtained from the header and expected name
    })

    it('should have raiting', async function () {
        let search_request= "Matrix"
        await lesson5.searchOfMovie(search_request)                 
        await lesson5.chooseFilmAtSearchResult(0)                   
        let raiting =  $('.col-md-8 h2 .label').getText()
        expect(await raiting).not.to.be.NaN                         //received value of raiting must be a numeric
        console.log('The raiting of film is '+ await raiting)       //Output the received value of the rating in the console
    })

    it('should have simular movies block with atleast one movie', async function () {
        let search_request = 'Wing Commander'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(0)
        expect(await $$('[_ngcontent-c2] img').count()).to.be.above(0)                              //received number of films that are similar to the one found must be greater than 0
        console.log("Number of similar movies is" +' '+ await $$('[_ngcontent-c2] img').count())   //output to a console the quantity of similar films to the searched film on a site
        let ganresoffilm = await $$('p a.m-r-md').map(async function (element){                     //check if the films found are similar
            return element.getText()                                                                 //for this we get the names of all genres of searched film
        })
        console.log(ganresoffilm)                                                                       //and output them in the console
        await $$('.caption h4.text-ellipsis a').first().click()                                        //Next, go to the page of the first movie, which is shown on the site as similar
        await lesson5.waitForCategoriesVisibility()                                         
        await browser.sleep(2000)
        let ganresofsimilarfilm = await $$('p a.m-r-md').map(async function (element2){
            return element2.getText()
        })                                                                                   //and get the values of all its genres
        console.log(ganresofsimilarfilm)                                                      //and output them to the console
        async function Intersec(arr1,arr2){                                                   //create a function that compares the values of two arrays
            let idx = 0, arr3 = [];                                                           //and the same values of genres of both films are enter into a separate array of arr3
            for (let i = 0; i < arr2.length; i++){
                idx = arr1.indexOf(arr2[i]);
                if (idx >= 0) arr3.push(arr2[i]);
            }
            return arr3;
        }
        expect(await Intersec(ganresoffilm,ganresofsimilarfilm)).not.to.be.empty                                //received arr 3 must not be empty
        await browser.sleep(2000)
        console.log('Фильмы совпадают по таким жанрам: '+ await Intersec(ganresoffilm,ganresofsimilarfilm))     //and bring to the console genres for which the movies match
    })
})
describe('cast block', async function () {
    it('should show atleast one actor', async function () {
        let search_request = 'Lord of the Rings'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(0)
        expect(await $$('.col-md-3 img').count()).to.be.above(0)                                //The site should contain on the page with the film at least 
        console.log(await $$('.col-md-3 .text-center a').first().getText())                     //one photo of the actors who are shot in this movie
    })                                                                                          //Output the name of the actor who is shown first on the site in the console 
})  

describe('reviews block', function () {
    it('should be atleast one review', async function () {
        let search_request = 'Thor 3'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(1)
        expect(await $$('.text-justify').count()).to.be.above(0)                           //the number of reviews received on the page with the film must be greater than 0
        expect(await $$('.text-justify').first().getText()).not.to.be.empty                 //and must contain some text
        console.log(await $$('.text-justify').first().getText())                            //output a review which on the page is shown first in the console
    })

    it('should have reviewer name as link to source', async function () {
        let search_request = 'Pacific Rim'
        await lesson5.searchOfMovie(search_request)
        await lesson5.chooseFilmAtSearchResult(0)
        expect(await $$('.text-justify').count()).to.be.above(0)                        
        expect(await $$('.text-justify+footer a').first().getAttribute('href')).to.contain('http')      //the link to the reviewer should contain the actual address of the page of the reviewer
        await $$('.text-justify+footer a').first().click()                                              //go to the link to the site of the reviewer
        let winHandles= browser.getAllWindowHandles();
        await winHandles.then(async function(handles) {
            let parentWindow =handles[0];
            let popUpWindow=handles[1];
            await browser.switchTo().window(popUpWindow);
            await browser.waitForAngularEnabled(false)
            await browser.wait(EC.visibilityOf($('.sub-heading')),20000,'Element not found')  
            expect(await $('.sub-heading').getText()).to.contain('Written by')                  //this page should contain text Written By
            console.log(await $('.sub-heading+p').getText())                                    //output the full review in the console
            await browser.close()
            await browser.switchTo().window(parentWindow)
        })
    })
})

describe('Popular series', async function () {
    it('shouldnt have search bar', async function () {
        await $(`[routerlink*="series"]`).click()
        await lesson5.waitForPopularMoviesVisibility()
        expect (await $('.orange-text').getText()).to.contain('Popular Series')             //this page should contain text popular series
        expect (await $(`[name='searchStr']`).isPresent()).to.equal(false)                  //and should not contain a search string
    })

    it('should have "First Air Date" instead "Release Date"', async function () {
        await $(`a[routerlink="popular/series"]`).click()
        await lesson5.waitForPopularMoviesVisibility()
        await browser.sleep(2000)
        let searchelement = $$(`.text-ellipsis+p strong`)
        let massive = await searchelement.map(async function (element){             //take all the values from the blocks first air date from the popular movies page
            return element.getText()         
        })
        let fraze = "First Air Date"
        //massive.forEach(text=>expect(text).to.contain("First Air Date"))
        async function check(a,b){                                              //Create a function that checks each value of this array
            for (let i = 0; i < a.length; i++){                                 //to match the phrase 'First Air Date'
            if(a[i].indexOf(b)>=0) continue
            else{throw new Error('Не совпадают')}                               //if at least one value does not match this phrase, then an error occurs
            }
        }
        await check(massive,fraze)
        await browser.sleep(2000)
        console.log("Количество популярных фильмов на сайте "+ await searchelement.count())     //display in the console the number of popular movies on this page
    })
})