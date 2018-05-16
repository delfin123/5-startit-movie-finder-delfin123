import { browser, element, By, by, until, $, $$, Key, ExpectedConditions as EC } from 'protractor'
import{expect} from 'chai'
import * as log4js from 'log4js'

const logger = log4js.getLogger('default')
export class HomePage {

public logInButton = element(By.xpath('//a[contains(.,"Log in")]'))
public salesBlocks = $$('a[href*="/ssl-certificates/"][ui-sref]')
private authorizationInscription = element(By.xpath('//h1[contains(.,"Authorization")]'))
private usernameLoginField = $('input[placeholder="Email"]')
private passwordLoginField = $('input[placeholder="Enter password"]')
private showPasswordIcon = $('button[ng-click*="showPassword"]')
private loginButtonSubmit = element(By.xpath('//button[contains(.,"Login")]'))
private limitedTimeOfferInscription = element(By.xpath('//div[contains(.,"LIMITED TIME OFFER") and parent::div[@ng-if]]'))
private discountBanner = $('div.ev-promo-banner')
private userIndicator = element(By.xpath('//a[contains(.,"ssls.automation+5@gmail.com")]'))
public dropdownMenu = $('button[nc-dropdown-trigger]')
public invalidLoginErrorMessage = element(By.xpath('//span[contains(.,"Uh oh! Email or password is incorrect")]'))
public logoutButton = element(By.xpath('//button[contains(.,"Log out")]'))
    /*public search = $(`[name="searchStr"]`)
    private topRaitingPopularMoviesBlock = element.all(By.xpath(`//*[@class='row is-flex']`))
    private popularMoviesBlock = $$('.col-sm-3 movie-card img')
    private searchResultName = $('[_ngcontent-c1] .orange-text')
    private searchResultBlock = element(By.xpath('//div[child::h3]'))
    public searchResultMovieLink= element.all(By.xpath(`//div[child::h3]//a[@title]`))
    private searchResultMovie = element.all(By.xpath(`//*[@_ngcontent-c1 and child::*[@class='orange-text']]//div[child::movie-card]`))
    public movieCardRaiting = $('.col-md-8 h2 .label')
    private movieCardImg = $('.col-md-4 img')
    private movieCardGanresBlock = element(By.xpath(`//p[child::a[contains(@class,'label')]]`))
    public movieActorImg = $$('.col-md-3 img')
    public movieActorName = $$('.col-md-3 .text-center a')
    public similarFilmLink = $$('.caption h4.text-ellipsis a')
    public similarFilmsMovie = element.all(By.xpath(`//*[child::*[@class='row is-flex']]//div[child::movie-card]`))
    private similarFilmsBlock = element(By.xpath(`//*[@class='row is-flex' and child::*[@class='col-md-2']]`))
    private movieCardTitle = element(By.xpath(`//h2[child::small[contains(@class,'label')]]`))
    public movieCardGanre = $$('p a.m-r-md')
    private movieCardContent = $('.col-md-4+.col-md-8')
    private popularSeriesMovie = element.all(By.xpath('//div[child::h3]/div/div'))
    private popularSeriesBlock = element(By.xpath('//div[child::h3]/div'))
    public categoryOfFilmsTitle = $('.orange-text')
    public popularSeriesMovieAir = $$(`.text-ellipsis+p strong`)
    public movieCardReview = $$('.text-justify')
    public movieCardReviewerLink = $$('.text-justify+footer a')
    public reviewerOuterSite = $('.sub-heading')
    public reviewerOuterSiteComment = $('.sub-heading+p')
    public popularMoviesButton= $(`[routerlink*="series"]`)
    public homepageMovie = $$('.text-ellipsis a')
    public homepagePopularMoviesFilm = $$(`.col-sm-3`)
    public homepagePopularMoviesFilmRaiting = $$(`.col-sm-3 .pull-right`)
    public movieCardFilmDetails = $$('app-movie .col-md-8 p').get(2)
    public upcomingMoviesButton = $('[routerlink*="upcoming"]')
    public actionCategoryMoviesButton = $(`[href*="Action"]`)
    */

    async open(){
        await browser.get('/')
        await browser.wait(EC.and(
        EC.visibilityOf(this.discountBanner),
        EC.visibilityOf(this.logInButton),
        EC.visibilityOf(this.salesBlocks.first()),
    EC.visibilityOf(this.salesBlocks.last())),20000,'Site didn\'t open')    
}
    async authorization(login:string,password:string){
        await this.usernameLoginField.sendKeys(login)
        await this.passwordLoginField.sendKeys(password)
        await this.showPasswordIcon.click()
        expect(await this.passwordLoginField.getAttribute("value")).to.equal("123456")
        await this.loginButtonSubmit.click()
    }
    async waitForLoginVisibility(){
        await browser.wait(EC.and(
        EC.visibilityOf(this.authorizationInscription),
        EC.visibilityOf(this.usernameLoginField),
        EC.visibilityOf(this.passwordLoginField),
        EC.elementToBeClickable(this.loginButtonSubmit)),20000,'4 elements should appear')
    }
    async waitForLogining(){
        await browser.wait(EC.and(
            EC.visibilityOf(this.limitedTimeOfferInscription),
            EC.visibilityOf(this.discountBanner),
            EC.visibilityOf(this.userIndicator),
            EC.visibilityOf(this.dropdownMenu)),20000,'4 elements should appear')
    }
}