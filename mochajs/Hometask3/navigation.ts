import { browser, $, $$, element, by} from 'protractor'
import {HomePage} from '../Hometask5/pages/homepage'
import * as log4js from 'log4js'
import {expect} from 'chai'
import {Navigation} from '../Hometask5/pages/navigation'
const homepage = new HomePage()
const navigation = new Navigation()
const logger = log4js.getLogger('default')

describe('Movie card ', async function(){
    beforeEach(async function(){
        await homepage.open()
    })
    afterEach(async function () {
        await browser.manage().timeouts().implicitlyWait(1000)
<<<<<<< HEAD:Hometask3/navigation.ts
      })
      
=======
    })
    
>>>>>>> 4fb4f6a7b5d5dd088bc664b5c019edfd9bd24580:mochajs/Hometask3/navigation.ts
    it('should open "Upcoming movies" section', async function() {
        logger.info('Начало теста на проверку открытия страницы "Upcoming movies"')
        await homepage.upcomingMoviesButton.click()
        await navigation.waitforvisibleUpcomingmovies()
        expect (await homepage.categoryOfFilmsTitle.getText()).to.contain('Up Coming')
        logger.info('Тест пройден, данная страница соответствует разделу "Upcoming movies"')
    })

    it('should open "Popular Series" section', async function(){
        logger.info('Начало теста на проверку открытия страницы "Popular series"')
        await homepage.popularMoviesButton.click()
        await homepage.waitForPopularMoviesVisibility()
        expect (await homepage.categoryOfFilmsTitle.getText()).to.contain('Popular Series')
        logger.info('Тест пройден, данная страница соответствует разделу "Popular series"')
    })

    it('should open "Action" category', async function(){
        logger.info('Начало теста на проверку открытия страницы c категорией фильмов "Action category"')
        await homepage.actionCategoryMoviesButton.click()
        await navigation.waitforvisibleActioncategories()
        expect (await homepage.categoryOfFilmsTitle.getText()).to.contain('Action')
        logger.info('Тест пройден, данная страница соответствует разделу "Action category"')
    })
})