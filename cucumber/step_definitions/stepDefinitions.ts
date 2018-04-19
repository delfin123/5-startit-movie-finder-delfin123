import { browser, element, By, utils,$, $$, Key,ExpectedConditions as EC, ActionSequence  } from 'protractor';
import { Then, When, Given, Step } from 'cucumber'
import { expect } from 'chai';
import {HomePage} from '../pages/homepage'
import { setDefaultTimeout } from 'cucumber';
import {Navigation} from '../pages/navigation'
const homepage = new HomePage()
const navigation = new Navigation()

setDefaultTimeout(30000)

Given(/^I am on home page$/, async function () {
   await homepage.open()
   });

Then(/^I see movie cards loaded$/, async function () {
    await expect(await homepage.movieCard.count()).not.to.equal(0)
});

Then(/^Movie Card should have name$/, async function () {
    await expect(await homepage.homepageMovie.get(7).getText()).not.to.be.empty
});

Then(/^Movie Card should have raiting pointer$/, async function () {
    let movies = await homepage.homepagePopularMoviesFilm.count()
    let raitings = await homepage.homepagePopularMoviesFilmRaiting.count()
    expect(movies).to.equal(raitings)        
});

Then(/^I search for film "(.*?)" on the page$/, async function(requested_film){
    await homepage.searchOfMovie(requested_film)
});

Then(/^After click on movie details i see appropriate "movie details" page$/, async function(){
    await homepage.chooseViewDetailsOfFilm(0)
    expect(await homepage.movieCardFilmDetails.getText()).to.contain('courage she never knew she')
});

When(/^I open "Upcoming movies" section$/, async function(){
    await homepage.upcomingMoviesButton.click()
    await navigation.waitforvisibleUpcomingmovies()
})

Then(/^I see appropriate to "Upcoming movies" section movies$/, async function(){
    expect (await homepage.categoryOfFilmsTitle.getText()).to.contain('Up Coming')
})

When (/^I open "Popular series" section$/, async function(){
    await homepage.popularMoviesButton.click()
    await homepage.waitForPopularMoviesVisibility()
})

Then(/^I see appropriate to "Popular series" section movies$/, async function(){
    expect (await homepage.categoryOfFilmsTitle.getText()).to.contain('Popular Series')
})

When(/^I open "Action" section$/, async function(){
    await homepage.actionCategoryMoviesButton.click()
    await navigation.waitforvisibleActioncategories()
})

Then(/^I see appropriate to "Action" section movies$/, async function(){
    expect (await homepage.categoryOfFilmsTitle.getText()).to.contain('Action')
})

Then(/^Name of the first found film completely match with the name of film "(.*?)"$/, async function(requested_film){
    expect(await homepage.searchResultMovieLink.first().getAttribute('title')).to.equal(requested_film)
})

Then (/^All search results contains the name "(.*?)"$/, async function (name_of_film){
    let titles:any = await homepage.searchResultMovieLink.getAttribute('title')
    titles.forEach(title => expect (title).to.contain(name_of_film))
})

Then(/^Search  results should be empty$/, async function(){
    expect(await homepage.searchResultMovieLink.count()).to.equal(0)
})

Then(/^I choose (.*?) film at search results$/, async function(number_of_film_at_search_results){
    await homepage.chooseFilmAtSearchResult(number_of_film_at_search_results-1)
})

Then(/^The name of film "(.*?)" should be as a header$/, async function (name_of_film){
    let fraze = await homepage.obtainClearNameOfMovie()
    expect(await fraze).to.equal(name_of_film)
})

Then(/^I see the rating of film$/, async function(){
    let rating =  await homepage.movieCardRaiting.getText()
    expect(await rating).not.to.be.empty
})

Then(/^Count of similar movies more than (.*?)$/, async function(count){
    expect(await homepage.similarFilmsMovie.count()).to.be.above(0)
})

Then(/^I see that genres of (.*?) film at "Similar films" block includes 1 or more genres of requested film$/, async function(number_of_film){
    let genresoffilm = await homepage.massiveOfElementsTexts(homepage.movieCardGanre)
    await homepage.similarFilmLink.get(number_of_film-1).click()                                      //Next, go to the page of the 8th movie, which is shown on the site as similar
    await homepage.waitForCategoriesVisibility()
    let genresofsimilarfilm = await homepage.massiveOfElementsTexts(homepage.movieCardGanre)
    expect(await homepage.compare2Massives(genresoffilm,genresofsimilarfilm)).not.to.be.empty
})

Then(/^I see that images of actors on the page more than (.*?)$/, async function(number_of_images){
    expect(await homepage.movieActorImg.count()).to.be.above(number_of_images)
})

Then(/^I see that review block contains at least 1 review and has some text$/, async function(){
    expect(await homepage.movieCardReview.count()).to.be.above(0)                                                //number of reviews received on the page with the film must be greater than 0
    expect(await homepage.movieCardReview.first().getText()).not.to.be.empty
})

Then(/^I see that review block contains at least 1 review and the first review contain outer link$/, async function(){
    expect(await homepage.movieCardReview.count()).to.be.above(0)
    expect(await homepage.movieCardReviewerLink.first().getAttribute('href')).to.contain('http')
})

Then(/^I can follow this outer link and verify that it works and has some content$/, async function(){
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

Then(/^I see that search bar is absent$/, async function(){
    expect (await homepage.search.isPresent()).to.equal(false)
})

Then(/^I see that movie cards of films of this section contain "(.*?)" fraze$/, async function(fraze){
    let massive = await homepage.massiveOfElementsTexts(homepage.popularSeriesMovieAir)
    let massive2 =await Promise.all(await homepage.compareMassiveWithFraze(massive,fraze))
    expect(await massive.length).to.equal(await massive2.length)
})