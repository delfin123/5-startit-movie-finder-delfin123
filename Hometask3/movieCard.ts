import { browser, $, $$, element, by, Key, until, ElementFinder} from 'protractor'
import {HomePage} from '../Hometask5/pages/homepage'
import * as log4js from 'log4js'
const homepage = new HomePage()
    const logger = log4js.getLogger('default')


describe('Movie card ', async function(){
    beforeEach(async function(){
        await homepage.open()
    })

    it('should have name', async function(){
        logger.info('Начало теста на наличие названия фильма на странице фильма')
        let expectedName = 'Once Upon'
        expect (await ($(`a[title*='Once'][href='/movie/311']`)).getText()).toContain(expectedName) 
        logger.info("Тест пройден и название фильма "+ await ($(`a[title*='Once'][href='/movie/311']`)).getText())
    })

    it('should have "raiting" pointer', async function(){
        logger.info('Начало теста на наличие рейтинга у фильма')
        let movies = await $$(`.col-sm-3`).count()
        let raitings = await $$(`.col-sm-3 .pull-right`).count()
        expect(movies).toEqual(raitings)        
        logger.info('Тест пройден, количество фильмов - '+ movies+'совпадает с количеством рейтингов фильмов - '+ raitings)   
    })

    it('should open appropriate "movie details" page, after click on "name" field', async function(){
        logger.info('Начало теста на наличие соответствия содержания фильма с названием фильма')
        await $(`.text-ellipsis a[href*="129"]`).click()
        await homepage.waitforloadingpagewithfilm()
        expect(await element(by.xpath(`//p[contains(.,'When her parents')]`)).getText()).toContain('courage she never knew she')
        logger.info('Содержание фильма с названием '+ await $(`.text-ellipsis a[href*="129"]`) +' такое - ' + await element(by.xpath(`//p[contains(.,'When her parents')]`)).getText())
    })
})