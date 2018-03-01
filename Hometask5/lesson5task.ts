import { browser, element, By, utils,$, $$, Key,ExpectedConditions as EC, ActionSequence } from 'protractor'
import {expect} from 'chai'
import { HomePage } from './pages/homepage'
import * as log4js from 'log4js'

const logger = log4js.getLogger('default')


describe('movie-finders tests',async function(){
    
    const homepage = new HomePage()
    beforeEach(async function(){          
    await homepage.open()               //browser should open on the given page before each test
})

describe('Movie details', async function () {
    
    it('should have movie name as header', async function () {
            logger.info('Начало теста на проверку названия фильма')
            let search_request = 'Maze runner'
            await homepage.searchOfMovie(search_request)                    //Enter the name of the movie in search string and click on the search button
            let name = 'The Maze Runner'
            await homepage.chooseFilmAtSearchResult(0)                      //select the first movie found in search results and click on it
            let fraze = await homepage.obtainClearNameOfMovie()             //get the full title from the movie title
            expect(fraze).to.equal(name)                                    //The received name must completely match with the expected title of film
            logger.info('Тест пройден,полученное название фильма ' +        
            name+' совпадает с ожидаемым названием '+ await fraze)          //output to the console the name obtained from the header and expected name
    })

    it('should have raiting', async function () {
            logger.info('Начало теста на проверку рейтинга')
            let search_request= "Matrix"
            await homepage.searchOfMovie(search_request)                 
            await homepage.chooseFilmAtSearchResult(0)                   
            let raiting =  homepage.movieCardRaiting.getText()
            expect(await raiting).not.to.be.empty                            //received value of raiting mustn't to be empty
            logger.info('The raiting of film is '+ await raiting)            //Output the received value of the rating in the console    
    })

    it('should have simular movies block with atleast one movie', async function () {
        logger.info('Начало теста на проверку наличия подобных фильмов')
        let search_request = 'Wing Commander'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(0)
        expect(await homepage.similarFilmsMovie.count()).to.be.above(0)                              //received number of films that are similar to the one found must be greater than 0
        logger.info("Number of similar movies is" +' '+ await homepage.similarFilmsMovie.count())    //output to a console the quantity of similar films to the searched film on a site                        
        let ganresOfFilm = await Promise.all(await homepage.movieCardGanre.map(async function (element){   //check if the films found are similar                  
            return await element.getText()                                                                //for this we get the names of all genres of searched film
        }))
        logger.info('Искомый фильм включает такие жанры ' + ganresOfFilm)                     //and output them in the console                                                         
        await homepage.similarFilmLink.get(7).click()                                      //Next, go to the page of the 8th movie, which is shown on the site as similar
        await homepage.waitForCategoriesVisibility()                                       
        let ganresOfSimilarFilm = await Promise.all(await homepage.movieCardGanre.map(async function (element2){
            return await element2.getText()                                                                //and get the values of all its genres
        })) 
        logger.info('Подобный фильм включает такие жанры '+ ganresOfSimilarFilm)                      //and output them to the console                                                                             
        async function Intersec(arr1,arr2){                                                           //create a function that compares the values of two arrays
            let idx = 0, arr3 = [];                                                                   //and the same values of genres of both films are enter into a separate array of arr3
            for (let i = 0; i < arr2.length; i++){
                idx = arr1.indexOf(arr2[i]);
                if (await idx >= 0) arr3.push(arr2[i]);
            }
            return arr3;
        }
        expect(await Intersec(ganresOfFilm,ganresOfSimilarFilm)).not.to.be.empty                                //received arr 3 must not be empty              
        logger.info('Фильмы совпадают по таким жанрам: '+ await Intersec(ganresOfFilm,ganresOfSimilarFilm))     //and bring to the console genres for which the movies match
    })
   
})

describe('cast block', async function () {
    it('should show atleast one actor', async function () {
        logger.info('Начало теста на наличие фото актеров на странице фильма')
        let search_request = 'Lord of the Rings'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(0)
        expect(await homepage.movieActorImg.count()).to.be.above(0)                                                //site should contain on the page with the film at least 
        logger.info('Фото присутствуют в количестве '+ await homepage.movieActorImg                                 
        .count()+' '+ 'и имя первого актера ' + await homepage.movieActorName.first().getText())         //one photo of the actors who are shot in this movie          
    })                                                                                                          //Output the name of the actor who is shown first on the site in the console 
})  

describe('reviews block', function () {
    it('should be atleast one review', async function () {
        logger.info('Начало теста на наличие ревью на странице фильма')
        let search_request = 'Thor 3'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(1)
        expect(await homepage.movieCardReview.count()).to.be.above(0)                                                //number of reviews received on the page with the film must be greater than 0
        expect(await homepage.movieCardReview.first().getText()).not.to.be.empty                                     //and must contain some text
        logger.info('Ревью присутствуют на странице в количестве '+ await homepage.movieCardReview
        .count() +' и текст первого ревью такой: '+ await homepage.movieCardReview.first().getText())                  //output a review which on the page is shown first in the console  
    })

    it('should have reviewer name as link to source', async function () {
        logger.info('Начало теста на проверку внешней интернет страницы ревьюера')
        let search_request = 'Pacific Rim'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(0)
        expect(await homepage.movieCardReview.count()).to.be.above(0)                        
        expect(await homepage.movieCardReviewerLink.first().getAttribute('href')).to.contain('http')              //link to the reviewer should contain the actual address of the page of the reviewer
        await homepage.movieCardReviewerLink.first().click()                                                      //go to the link to the site of the reviewer
        let winHandles= browser.getAllWindowHandles();
        await winHandles.then(async function(handles) {
            let parentWindow =handles[0];
            let popUpWindow=handles[1];
            await browser.switchTo().window(popUpWindow);
            await browser.waitForAngularEnabled(false)
            await browser.wait(EC.visibilityOf(homepage.reviewerOuterSite),20000,'Element not found')  
            expect(await homepage.reviewerOuterSite.getText()).to.contain('Written by')                                   //this page should contain text Written By
            logger.info('Тест пршел успешно, данная страница доступна и полное ревью фильма с внешней интернет страницы ревьюера такой: '+ await homepage.reviewerOuterSiteComment.getText())      //output the full review in the console            
            await browser.close()
            await browser.switchTo().window(parentWindow)
        })
    })
})

describe('Popular series', async function () {
    it('shouldnt have search bar', async function () {
        logger.info('Начало теста на отсутствие поисквой строки на странице популярных фильмов')
        await homepage.popularMoviesButton.click()
        await homepage.waitForPopularMoviesVisibility()
        expect (await homepage.categoryOfFilmsTitle.getText()).to.contain('Popular Series')                            //this page should contain text popular series   
        expect (await homepage.search.isPresent()).to.equal(false)                                  //and should not contain a search string
        logger.info('Тест прошел успешно, поисковая строка на странице популярных фильмов отсутствует')       //output that test passed in the console              
    })


    it('should have "First Air Date" instead "Release Date"', async function () {
        logger.info('Начало теста на проверки наличия фразы "First Air Date" в разделе популярынх фильмов в блоке первого выхода на экраны')
        let fraze = "First Air Date"
        await homepage.popularMoviesButton.click()
        await homepage.waitForPopularMoviesVisibility()
        let massive = await Promise.all(await homepage.popularSeriesMovieAir.map(async function(element){
            return await element.getText()
        }))
        async function check(a,b){                                               //Create a function that checks each value of this array
            let arr1 = []                                                        //to match the phrase 'First Air Date'
            for (let i = 0; i < a.length; i++){                                 
            if(await a[i].indexOf(b)>=0){
                arr1.push(a[i])
            } else { throw new Error('Не совпадают') }                               //if at least one value does not match this phrase, then an error occurs
            }
            return arr1
        }
        await browser.wait(async function(){if(await Promise.all(await check(massive,fraze))){return true}}, 20000, 'Not performed')
        await Promise.all(await check(massive,fraze))
        logger.info('Тест прошел успешно, данный текст присутствует в каждом блоке первого выхода на экраны и количество популярных фильмов на сайте -'+ await homepage.popularSeriesMovieAir.count())     //display in the console the number of popular movies on this page
    })
})
})