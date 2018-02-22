import { browser, element, By, by, until, $, $$, Key, ExpectedConditions as EC } from 'protractor'

export class Lesson5 {
    private search = $(`[name="searchStr"]`)
    async searchOfMovie(search_request:string | number){
        await this.search.sendKeys(search_request)
        await this.search.sendKeys(Key.ENTER)
        await browser.wait(EC.and(
        EC.visibilityOf($$('.col-sm-3 movie-card img').get(10)),
        EC.visibilityOf($$('.col-sm-3 movie-card img').first()),
        EC.elementToBeClickable(element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).first()),
        EC.visibilityOf($('[_ngcontent-c1] .orange-text')),
        EC.visibilityOf(element(By.xpath('//div[@_ngcontent-c1][child::h3]'))),
        EC.visibilityOf(element.all(By.xpath(`//*[@_ngcontent-c1 and child::*[@class='orange-text']]//div[child::movie-card]`)).first()),
        EC.visibilityOf($$('.col-sm-3 movie-card img').last())),20000,'6 elements should appear')
    }
    async chooseFilmAtSearchResult(number_of_film:number){
        await element.all(By.xpath(`//div[@_ngcontent-c1][child::h3]//a[@title]`)).get(number_of_film).click()
        await browser.wait(EC.and(
        EC.visibilityOf($('.col-md-8 h2 .label')),
        EC.visibilityOf($('.col-md-4 img')),
        EC.visibilityOf(element(By.xpath(`//*[@_ngcontent-c3 and child::h3]/p[child::a]`))),
        EC.visibilityOf($$('.col-md-3 img').first()),
        EC.elementToBeClickable($$('.caption h4.text-ellipsis a').first()),
        EC.visibilityOf(element.all(By.xpath(`//app-movie[child::*[@class='row is-flex']]//div[child::movie-card]`)).first()),
        EC.visibilityOf(element(By.xpath(`//*[@class='row is-flex' and child::*[@class='col-md-2']]`)))),20000,'7 elements should appear')
    }
    async obtainClearNameOfMovie(){
        let frazefordelete = (await $('.col-md-8 h2 .label').getText()).toString().length
        let fullfraze = (await element(By.xpath(`//*[contains(@class, 'col-md-8')]/h2[child::small]`)).getText()).toString()
        let fraze = await fullfraze.slice(0,-frazefordelete-1)
        return fraze;
    }
    async waitForCategoriesVisibility(){
        await browser.wait(EC.and(
        EC.visibilityOf($$('p a.m-r-md').first()),
        EC.visibilityOf($$('p a.m-r-md').last()),
        EC.visibilityOf(element(By.xpath(`//p[@_ngcontent-c3 and child::a[contains(@class,'label')]]`))),
        EC.visibilityOf($('.col-md-4+.col-md-8'))),20000,'4 elements should')
    }
    async waitForPopularMoviesVisibility(){
        await browser.wait(EC.and(
        EC.visibilityOf(element.all(By.xpath('//div[child::h3]/div/div')).first()),
        EC.visibilityOf(element.all(By.xpath('//div[child::h3]/div/div')).last()),
        EC.visibilityOf(element(By.xpath('//div[child::h3]/div'))),
        EC.visibilityOf($('.orange-text'))),20000,'Element not appeared')
    }
}