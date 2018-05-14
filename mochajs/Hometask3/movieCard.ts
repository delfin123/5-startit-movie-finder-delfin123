import { browser, $, $$, element, by, Key, until, ElementFinder} from 'protractor'
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
<<<<<<< HEAD:Hometask3/movieCard.ts
      })
      
=======
    })

>>>>>>> 4fb4f6a7b5d5dd088bc664b5c019edfd9bd24580:mochajs/Hometask3/movieCard.ts
    it('should have name', async function(){
        logger.info('Начало теста на наличие названия фильма на странице фильма')
        expect (await homepage.homepageMovie.get(7).getText()).not.to.be.empty
        logger.info("Тест пройден и название фильма "+ await homepage.homepageMovie.get(7).getText())
    })

    it('should have "rating" pointer', async function(){
        logger.info('Начало теста на наличие рейтинга у фильма')
        let movies = await homepage.homepagePopularMoviesFilm.count()
        let ratings = await homepage.homepagePopularMoviesFilmRaiting.count()
        expect(movies).to.equal(ratings)        
        logger.info('Тест пройден, количество фильмов - '+ movies+' совпадает с количеством рейтингов фильмов - '+ ratings)   
    })

    it('should open appropriate "movie details" page, after click on "name" field', async function(){
        logger.info('Начало теста на наличие соответствия содержания фильма с названием фильма')
        let search_request = 'Spirited Away'
        await homepage.searchOfMovie(search_request)
        await homepage.chooseFilmAtSearchResult(0)
        let fraze = await homepage.obtainClearNameOfMovie()
        expect(await homepage.movieCardFilmDetails.getText()).to.contain('courage she never knew she')
        logger.info('Содержание фильма с названием '+ fraze +' такое - ' + await homepage.movieCardFilmDetails.getText())
    })
}) 