import { browser, $, $$, element, ExpectedConditions as EC, by ,Key,By, ActionSequence} from 'protractor'
import {expect} from 'chai'



describe('Must catch an error and if function doesn\'t have an error,', async function (){
    it('next test must go,if no, begin another iteration of this function', async function iternalcatcher(){
        try{
            await browser.get('/')
            await browser.wait(EC.and(
            EC.visibilityOf($$('.is-flex[_ngcontent-c1]').first()),
            EC.visibilityOf($$('.is-flex[_ngcontent-c1]').last())),20000, 'Elments not appeard')
            await $$('.is-flex .col-sm-6 .text-ellipsis a').get(4).click()
            await browser.wait(EC.and(
            EC.visibilityOf($('.col-md-8 h2 .label')),
            EC.visibilityOf($('.col-md-4 img')),
            EC.visibilityOf($$('.col-md-3 img').first())),20000,'3 elements should appear')
            expect( await $$('p a.m-r-md').count()).to.be.above(2)
            console.log((await $$('p a.m-r-md').getText()).toString().split(','))
        } catch(e){
            console.log(e)
            await iternalcatcher()
        }
    })
})
describe('Must catch an error and if function doesn\'t have an error,', async function (){
    it('next test must go,if no, begin another iteration of this function, but have some count of errors', async function limitedcatcher(){
        let retrycount = 0 //зададим равным количество попыток равным 0
        while(true){
        try{
            await browser.get('/')
            await browser.wait(EC.and(
            EC.visibilityOf($$('.is-flex[_ngcontent-c1]').first()),
            EC.visibilityOf($$('.is-flex[_ngcontent-c1]').last())),20000, 'Elments not appeard')
            await $$('.is-flex .col-sm-6 .text-ellipsis a').get(4).click()
            await browser.wait(EC.and(
            EC.visibilityOf($('.col-md-8 h2 .label')),
            EC.visibilityOf($('.col-md-4 img')),
            EC.visibilityOf($$('.col-md-3 img').first())),20000,'3 elements should appear')
            expect( await $$('p a.m-r-md').count()).to.be.above(2)
            console.log((await $$('p a.m-r-md').getText()).toString().split(','))
            break;
        } catch(e){
           if(++retrycount<5) continue  //зададим количество попыток - на 5й попытке выбросит ошибку
           throw e;
    }
}
    })
})

fdescribe('Must catch an error and if function doesn\'t have an error,', async function (){
    it('next test must go,if no, begin another iteration of this function, but have some count of errors', async function limitedcatcher(){
var retryCount = 5; //количество попыток 5
var success = false;
while(!success && retryCount > 0)
{
        try{
            await browser.get('/')
            await browser.wait(EC.and(
            EC.visibilityOf($$('.is-flex[_ngcontent-c1]').first()),
            EC.visibilityOf($$('.is-flex[_ngcontent-c1]').last())),20000, 'Elments not appeard')
            await $$('.is-flex .col-sm-6 .text-ellipsis a').get(4).click()
            await browser.wait(EC.and(
            EC.visibilityOf($('.col-md-8 h2 .label')),
            EC.visibilityOf($('.col-md-4 img')),
            EC.visibilityOf($$('.col-md-3 img').first())),20000,'3 elements should appear')
            expect( await $$('p a.m-r-md').count()).to.be.above(2)
            console.log((await $$('p a.m-r-md').getText()).toString().split(','))
            success=true;
        } catch(e){
          retryCount--;
          if(retryCount == 0){
           throw e;
    }
}
}
    })
})