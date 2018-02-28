import { browser, $, $$, element, by} from 'protractor'
import {HomePage} from '../Hometask5/pages/homepage'
import * as log4js from 'log4js'
import {Navigation} from '../Hometask5/pages/homepage'
const homepage = new HomePage()
const navigation = new Navigation()
const logger = log4js.getLogger('default')

describe('Movie card ', async function(){
    beforeEach(async function(){
        await homepage.open()
    })
    
    it('should open "Upcoming movies" section', async function() {
        logger.info('Начало теста на проверку открытия страницы "Upcoming movies"')
        await $(`#navbar [routerlink="/upcoming"]`).click()
        await navigation.waitforvisibleUpcomingmovies()
        expect (await $(`.orange-text`).getText()).toContain('Up Coming')
        logger.info('Тест пройден, данная страница соответствует разделу "Upcoming movies"')
    })

    it('should open "Popular Series" section', async function(){
        logger.info('Начало теста на проверку открытия страницы "Popular series"')
        await $(`[routerlink*="series"]`).click()
        await homepage.waitForPopularMoviesVisibility()
        expect (await $(`.orange-text`).getText()).toContain('Popular Series')
        logger.info('Тест пройден, данная страница соответствует разделу "Popular series"')
    })

    it('should open "Action" category', async function(){
        logger.info('Начало теста на проверку открытия страницы c категорией фильмов "Action category"')
        await $(`[href="/genres/28/Action"]`).click()
        await navigation.waitforvisibleActioncategories()
        expect (await $(`.orange-text`).getText()).toContain('Action')
        logger.info('Тест пройден, данная страница соответствует разделу "Action category"')
    })
})