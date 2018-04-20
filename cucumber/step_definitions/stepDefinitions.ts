import { browser, element, By, utils,$, $$, Key,ExpectedConditions as EC, ActionSequence  } from 'protractor';
import { Then, When, Given, Step } from 'cucumber'
import { expect } from 'chai';
import {HomePage} from '../pages/homepage'
import { setDefaultTimeout } from 'cucumber';
import {Navigation} from '../pages/navigation'
const homepage = new HomePage()
const navigation = new Navigation()

setDefaultTimeout(30000)

Given(/^user on home page$/, async function () {
   await homepage.open()
   });

Then(/^user expects movie cards are present on the page$/, async function () {
    await expect(await homepage.movieCard.count()).not.to.equal(0)
});

Then(/^user expects that movie cards have name$/, async function () {
    await expect(await homepage.homepageMovie.get(7).getText()).not.to.be.empty
});

Then(/^user expects that movie cards have rating pointer$/, async function () {
    let movies = await homepage.homepagePopularMoviesFilm.count()
    let raitings = await homepage.homepagePopularMoviesFilmRaiting.count()
    expect(movies).to.equal(raitings)        
});

Then(/^user is searching for the movie "(.*?)" on the page$/, async function(requested_film){
    await homepage.searchOfMovie(requested_film)
});

Then(/^after click on movie details user expects that appropriate "movie details" page for this movie is opened$/, async function(){
    await homepage.chooseViewDetailsOfFilm(0)
    expect(await homepage.movieCardFilmDetails.getText()).to.contain('courage she never knew she')
});

When(/^user opens "Upcoming movies" section$/, async function(){
    await homepage.upcomingMoviesButton.click()
    await navigation.waitforvisibleUpcomingmovies()
})

When (/^user opens "Popular series" section$/, async function(){
    await homepage.popularMoviesButton.click()
    await homepage.waitForPopularMoviesVisibility()
})

Then(/^user expects appropriate to "(.*?)" section movies are present on the page$/, async function(movie_category){
    expect (await homepage.categoryOfFilmsTitle.getText()).to.contain(movie_category)
})

When(/^user opens "Action" section$/, async function(){
    await homepage.actionCategoryMoviesButton.click()
    await navigation.waitforvisibleActioncategories()
})

Then(/^user expects that name of the first found film completely match with the name of film "(.*?)"$/, async function(requested_film){
    expect(await homepage.searchResultMovieLink.first().getAttribute('title')).to.equal(requested_film)
})

Then (/^user expects that all movie names in search results contain the name "(.*?)"$/, async function (name_of_film){
    let titles:any = await homepage.searchResultMovieLink.getAttribute('title')
    titles.forEach(title => expect (title).to.contain(name_of_film))
})

Then(/^user expects that search results are empty$/, async function(){
    expect(await homepage.searchResultMovieLink.count()).to.equal(0)
})

Then(/^user chooses the (.*?) in a block movie in search results$/, async function(number_of_film_at_search_results){
    await homepage.chooseFilmAtSearchResult(number_of_film_at_search_results-1)
})

Then(/^user expects that the name of film "(.*?)" should be as a header$/, async function (name_of_film){
    let fraze = await homepage.obtainClearNameOfMovie()
    expect(await fraze).to.equal(name_of_film)
})

Then(/^user expects that rating of film is present on the page$/, async function(){
    let rating =  await homepage.movieCardRaiting.getText()
    expect(await rating).not.to.be.empty
})

Then(/^user expects that count of similar movies more than (.*?)$/, async function(count){
    expect(await homepage.similarFilmsMovie.count()).to.be.above(count)
})

Then(/^user expects that genres of (.*?) film at "Similar films" block includes 1 or more genres of requested film$/, async function(number_of_film){
    let genresoffilm = await homepage.massiveOfElementsTexts(homepage.movieCardGanre)
    await homepage.similarFilmLink.get(number_of_film-1).click()                                      //Next, go to the page of the 8th movie, which is shown on the site as similar
    await homepage.waitForCategoriesVisibility()
    let genresofsimilarfilm = await homepage.massiveOfElementsTexts(homepage.movieCardGanre)
    expect(await homepage.compare2Massives(genresoffilm,genresofsimilarfilm)).not.to.be.empty
})

Then(/^user expects that images of actors are present on the page in quantity more than (.*?)$/, async function(number_of_images){
    expect(await homepage.movieActorImg.count()).to.be.above(number_of_images)
})

Then(/^user expects that review block contains at least 1 review and has some text$/, async function(){
    expect(await homepage.movieCardReview.count()).to.be.above(0)                                                //number of reviews received on the page with the film must be greater than 0
    expect(await homepage.movieCardReview.first().getText()).not.to.be.empty
})

Then(/^user expects that review block contains at least 1 review and the first review contain outer link$/, async function(){
    expect(await homepage.movieCardReview.count()).to.be.above(0)
    expect(await homepage.movieCardReviewerLink.first().getAttribute('href')).to.contain('http')
})

Then(/^user follows this outer link and verify that it works and has some content$/, async function(){
    await homepage.movieCardReviewerLink.get(1).click()                                                      //go to the link to the site of the reviewer
    let winHandles= browser.getAllWindowHandles();
    await winHandles.then(async function(handles) {
        let parentWindow =handles[0];
        let popUpWindow=handles[1];
        await browser.switchTo().window(popUpWindow);
        await browser.waitForAngularEnabled(false)
        await browser.wait(EC.visibilityOf(homepage.reviewerOuterSite),20000,'Element not found')
        expect(await homepage.reviewerOuterSite.getText()).to.contain('Written by')                                   //this page should contain text Written By
        await browser.close()
        await browser.switchTo().window(parentWindow)
    })
})

Then(/^user expects that search bar is absent on the page$/, async function(){
    expect (await homepage.search.isPresent()).to.equal(false)
})

Then(/^user expects that movie cards of films of this section contain "(.*?)" fraze$/, async function(fraze){
    let massive = await homepage.massiveOfElementsTexts(homepage.popularSeriesMovieAir)
    let massive2 =await Promise.all(await homepage.compareMassiveWithFraze(massive,fraze))
    expect(await massive.length).to.equal(await massive2.length)
})