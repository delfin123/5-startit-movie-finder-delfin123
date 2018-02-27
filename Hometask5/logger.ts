import { browser, element, By, utils,$, $$, Key,ExpectedConditions as EC, ActionSequence } from 'protractor'
import {expect} from 'chai'
import { HomePage } from './pages/homepage'
import * as log4js from 'log4js'

const logger = log4js.getLogger('default')


describe('movie-finders tests',async function(){
      
    const homepage = new HomePage()
    beforeEach(async function(){          
    await homepage.open()               
})

describe('Movie details', async function () {
    
    it('should have movie name as header', async function () {
            logger.info('Начало теста на проверку названия фильма')
            let search_request = 'Maze runner'
            await homepage.searchOfMovie(search_request)                
            let name = 'The Maze Runner'
            await homepage.chooseFilmAtSearchResult(0)                  
            let fraze = await homepage.obtainClearNameOfMovie()         
            expect(fraze).to.equal(name)   
            logger.info('Тест пройден,полученное название фильма ' + name+' совпадает с ожидаемым названием '+ await fraze)    
    })

    it('should have raiting', async function () {
            logger.info('Начало теста на проверку рейтинга')
            let search_request= "Matrix"
            await homepage.searchOfMovie(search_request)                 
            await homepage.chooseFilmAtSearchResult(0)                   
            let raiting =  $('.col-md-8 h2 .label').getText()
            expect(await raiting).not.to.be.empty
            logger.info('The raiting of film is '+ await raiting)                          
    })

    it('should have simular movies block with atleast one movie', async function () {
        logger.info('Начало теста на проверку наличия подобных фильмов')
        let search_request = 'Wing Commander'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(0)
        expect(await $$('[_ngcontent-c2] img').count()).to.be.above(0) 
        logger.info("Number of similar movies is" +' '+ await $$('[_ngcontent-c2] img').count())                             
        let ganresoffilm = await Promise.all(await $$('p a.m-r-md').map(async function (element){                     
            return element.getText()                                                                
        }))
        await logger.info('Искомый фильм включает такие жанры ' + ganresoffilm)   
        let name = await $$('.caption h4.text-ellipsis a').get(7).getAttribute('title')
        console.log(name)                                                                   
        await $$('.caption h4.text-ellipsis a').get(7).click()                                        
        await homepage.waitForCategoriesVisibility()
        let fraze = await homepage.obtainClearNameOfMovie()  
        console.log(fraze)
        await browser.wait(function(){if(name==fraze){return true}},20000,'name not equal fraze')                                         
        let ganresofsimilarfilm = await Promise.all(await $$('p a.m-r-md').map(async function (element2){
            return element2.getText()
        })) 
        logger.info('Подобный фильм включает такие жанры '+ ganresofsimilarfilm)                                                                                                        
        async function Intersec(arr1,arr2){                                                   
            let idx = 0, arr3 = [];                                                          
            for (let i = 0; i < arr2.length; i++){
                idx = arr1.indexOf(arr2[i]);
                if (await idx >= 0) arr3.push(arr2[i]);
            }
            return arr3;
        }
        expect(await Intersec(ganresoffilm,ganresofsimilarfilm)).not.to.be.empty                                
        logger.info('Фильмы совпадают по таким жанрам: '+ await Intersec(ganresoffilm,ganresofsimilarfilm))     
    })
   
})

describe('cast block', async function () {
    it('should show atleast one actor', async function () {
        logger.info('Начало теста на наличие фото актеров на странице фильма')
        let search_request = 'Lord of the Rings'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(0)
        expect(await $$('.col-md-3 img').count()).to.be.above(0)                       
        logger.info('Фото присутствуют в количестве '+ await $$('.col-md-3 img')
        .count()+' '+ 'и имя первого актера ' + await $$('.col-md-3 .text-center a').first().getText())                   
    })                                                                                          
})  

describe('reviews block', function () {
    it('should be atleast one review', async function () {
        logger.info('Начало теста на наличие ревью на странице фильма')
        let search_request = 'Thor 3'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(1)
        expect(await $$('.text-justify').count()).to.be.above(0)                           
        expect(await $$('.text-justify').first().getText()).not.to.be.empty          
        logger.info('Ревью присутствуют на странице в количестве '+await $$('.text-justify')
        .count()+' и текст первого ревью такой: '+await $$('.text-justify').first().getText())                        
    })

    it('should have reviewer name as link to source', async function () {
        logger.info('Начало теста на проверку внешней интернет страницы ревьюера')
        let search_request = 'Pacific Rim'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(0)
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
            logger.info('Тест пршел успешно, данная страница доступна и полное ревью фильма с внешней интернет страницы ревьюера такой: '+ await $('.sub-heading+p').getText())                
            await browser.close()
            await browser.switchTo().window(parentWindow)
        })
    })
})

describe('Popular series', async function () {
    it('shouldnt have search bar', async function () {
        logger.info('Начало теста на отсутствие поисквой строки на странице популярных фильмов')
        await $(`[routerlink*="series"]`).click()
        await homepage.waitForPopularMoviesVisibility()
        expect (await $('.orange-text').getText()).to.contain('Popular Series')            
        expect (await $(`[name='searchStr']`).isPresent()).to.equal(false) 
        logger.info('Тест прошел успешно, поисковая строка на странице популярных фильмов отсутствует')                  
    })


    it('should have "First Air Date" instead "Release Date"', async function () {
        logger.info('Начало теста на проверки наличия фразы "First Air Date" в разделе популярынх фильмов в блоке первого выхода на экраны')
        let fraze = "First Air Date"
        await $(`a[routerlink="popular/series"]`).click()
        await homepage.waitForPopularMoviesVisibility()
        let massive = await Promise.all(await $$(`.text-ellipsis+p strong`).getText())
        async function check(a,b){ 
            let arr1 = []                                             //Create a function that checks each value of this array
            for (let i = 0; i < a.length; i++){                                 //to match the phrase 'First Air Date'
            if(await a[i].indexOf(b)>=0){
                arr1.push(a[i])
            }
            else{throw new Error('Не совпадают')}                               //if at least one value does not match this phrase, then an error occurs
            }
            return arr1
        }
        await browser.wait(async function(){if(await Promise.all(await check(massive,fraze))){return true}}, 20000, 'Not performed')
        await Promise.all(await check(massive,fraze))
        logger.info('Тест прошел успешно, данный текст присутствует в каждом блоке первого выхода на экраны и количество популярных фильмов на сайте -'+ await $$(`.text-ellipsis+p strong`).count())     //display in the console the number of popular movies on this page
    })
})
})