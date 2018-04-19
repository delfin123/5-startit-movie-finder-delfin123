
import { browser, element, By, by, until, $, $$, Key, ExpectedConditions as EC } from 'protractor'
import {HomePage} from './homepage'

export class Navigation extends HomePage {
    
    private upcomingMoviesBlock = element(By.xpath(`//div[child::h3[contains(.,'Up Coming Movies')]]`))
    private upcomingOrActionMoviesFilm = $$('.col-sm-6>movie-card')
    private upcomingMoviesTitle =element(By.xpath(`//h3[contains(.,'Up Coming Movies')]`))
    private actionFilmsTitle = element(By.xpath(`//h3[contains(.,'Action')]`))
    private ationFilmsBlock = element(By.xpath(`//div[child::h3[contains(.,'Action')]]`))

    async waitforvisibleUpcomingmovies(){
    await browser.wait(EC.and(
        EC.visibilityOf(this.upcomingMoviesBlock),
        EC.visibilityOf(this.search),
        EC.visibilityOf(this.upcomingOrActionMoviesFilm.first()),
        EC.visibilityOf(this.upcomingMoviesTitle),
        EC.visibilityOf(this.upcomingOrActionMoviesFilm.last())),20000, "5 elements should appear")
    }
    async waitforvisibleActioncategories(){
        await browser.wait(EC.and(
        EC.visibilityOf(this.actionFilmsTitle),
        EC.visibilityOf(this.ationFilmsBlock),
        EC.visibilityOf(this.upcomingOrActionMoviesFilm.first()),
        EC.visibilityOf(this.upcomingOrActionMoviesFilm.last())),20000, 'Should appear 4 elements')
        }
}