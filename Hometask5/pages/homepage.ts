import { browser, element, By, by, until, $, $$, Key, ExpectedConditions as EC } from 'protractor'

export class HomePage {
    public search = $(`[name="searchStr"]`)
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
    

    async open(){
        let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        await browser.get('/')
        await browser.wait(EC.and(
        EC.visibilityOf(this.search),
        EC.visibilityOf(this.topRaitingPopularMoviesBlock.first()),
        EC.visibilityOf(this.topRaitingPopularMoviesBlock.get(1))),20000,'Site didn\'t open')    
}
    async searchOfMovie(search_request:string | number){
        await this.search.sendKeys(search_request)
        await this.search.sendKeys(Key.ENTER)
        await browser.wait(EC.and(
        EC.visibilityOf(this.popularMoviesBlock.get(10)),
        EC.visibilityOf(this.popularMoviesBlock.first()),
        EC.visibilityOf(this.searchResultName),
        EC.visibilityOf(this.searchResultBlock),
        EC.visibilityOf(this.popularMoviesBlock.last())),20000,'5 elements should appear')
        if(await this.searchResultMovieLink.count()> 0){
            await browser.wait(EC.and(
            EC.visibilityOf(this.searchResultMovie.first()),
            EC.elementToBeClickable(this.searchResultMovieLink.first())), 20000,'2 elements should appear')
        } else { console.log('search results is empty')}
    }
    async waitforloadingpagewithfilm(){
        await browser.wait(EC.and(
            EC.visibilityOf(this.movieCardRaiting),
            EC.visibilityOf(this.movieCardImg),
            EC.visibilityOf(this.movieCardGanresBlock),
            EC.visibilityOf(this.movieActorImg.first()),
            EC.elementToBeClickable(this.similarFilmLink.first()),
            EC.visibilityOf(this.similarFilmsMovie.first()),
            EC.visibilityOf(this.similarFilmsBlock)),20000,'7 elements should appear')
    }
    async chooseFilmAtSearchResult(number_of_film:number){
        await this.searchResultMovieLink.get(number_of_film).click()
        await this.waitforloadingpagewithfilm()
    }
    async obtainClearNameOfMovie(){
        await browser.wait(EC.visibilityOf(this.movieCardTitle),20000, 'not appeared')
        let frazefordelete = (await this.movieCardRaiting.getText()).trim().length
        let fullfraze = (await this.movieCardTitle.getText()).trim()
        return await fullfraze.slice(0,-frazefordelete - 1)
    }
    async waitForCategoriesVisibility(){
        await browser.wait(EC.and(
        EC.visibilityOf(this.movieCardRaiting),
        EC.visibilityOf(this.movieCardImg),
        EC.visibilityOf(this.movieCardGanresBlock),
        EC.visibilityOf(this.movieActorImg.first()),
        EC.elementToBeClickable(this.similarFilmLink.first()),
        EC.visibilityOf(this.similarFilmsMovie.first()),
        EC.visibilityOf(this.similarFilmsBlock),
        EC.visibilityOf(this.movieCardGanre.first()),
        EC.visibilityOf(this.movieCardGanre.last()),
        EC.visibilityOf(this.movieCardGanresBlock),
        EC.visibilityOf(this.movieCardTitle),
        EC.visibilityOf(this.movieCardContent)),20000,'12 elements should')
    }
    async waitForPopularMoviesVisibility(){
        await browser.wait(EC.and(
        EC.visibilityOf(this.popularSeriesMovie.first()),
        EC.visibilityOf(this.popularSeriesMovie.last()),
        EC.visibilityOf(this.popularSeriesBlock),
        EC.visibilityOf(this.categoryOfFilmsTitle)),20000,'4 Elements not appeared')
    }
}

export class Navigation {
    
    private upcomingMoviesBlock = element(By.xpath(`//div[child::h3[contains(.,'Up Coming Movies')]]`))
    private search = $(`[name="searchStr"]`)
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