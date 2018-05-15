import { browser, $, $$, element, by, Key} from 'protractor'
import {HomePage} from '../Hometask5/pages/homepage'
import {expect} from 'chai'
import * as log4js from 'log4js'

const homepage = new HomePage()
const logger = log4js.getLogger('default')

describe('Movie card ', async function(){
    beforeEach(async function(){
        await homepage.open()
    })
    afterEach(async function () {
        await browser.manage().timeouts().implicitlyWait(1000)
      })
      
    it('by exisiting name, should show first movie with complete name match', async function(){
        logger.info('Начало теста на проверку работы поиска фильма')
        let search_request = 'Pacific Rim'
        await homepage.searchOfMovie(search_request)  
        expect(await homepage.searchResultMovieLink.first().getAttribute('title')).to.equal(search_request)
        logger.info("Тест пройден, полное название фильма" + await homepage.searchResultMovieLink.first().getAttribute('title'))
    })

    it('results(all of them) should contain search request', async function(){
        logger.info('Начало теста на проверку работы поиска фильма относительно всех результатов поиска')
        let search_request = 'Lord of the Rings'
        await homepage.searchOfMovie(search_request) 
        let titles:any = await homepage.searchResultMovieLink.getAttribute('title')
        titles.forEach(title => expect (title).to.contain(search_request))
        logger.info("Тест пройден, все найденные фильмы содержат в названии фразу "+search_request +" и список всех названий фильмов в результатах поиска такой - " + await homepage.searchResultMovieLink.getAttribute('title'))
    })
    

    it('result should be empty, after request for nonexistent movie', async function(){
        logger.info('Начало теста на проверку работы поиска фильма если ищется фильм с несуществующим названием')
        let search_request = 'dhcr'
        await homepage.searchOfMovie(search_request) 
        expect(await homepage.searchResultMovieLink.count()).to.equal(0)
        logger.info('Тест пройден, в результате поиска не найдено соответсвующих фильмов')
    })
})