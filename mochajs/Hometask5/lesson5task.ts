import { browser, element, By, utils,$, $$, Key,ExpectedConditions as EC, ActionSequence } from 'protractor'
import {expect} from 'chai'
import { HomePage } from './pages/homepage1'
import * as log4js from 'log4js'

const logger = log4js.getLogger('default')
const homepage = new HomePage()

describe('Authorization page',async function(){
    
    beforeEach(async function(){          
    await homepage.open()               //browser should open on the given page before each test
    })
    afterEach(async function () {
        await browser.manage().timeouts().implicitlyWait(1000)
      })
      
    describe('When user login with valid account and password', async function () {
        it('he must login successfully', async function () {
            logger.info('Begging the test on login with valid values')
            await homepage.logInButton.click()
            await homepage.waitForLoginVisibility()
            await homepage.authorization("ssls.automation+5@gmail.com","123456")
            await homepage.waitForLogining()
            expect(await homepage.dropdownMenu.isDisplayed()).to.equal(true)
            await homepage.dropdownMenu.click()
            await homepage.logoutButton.click()
            await homepage.waitForLoginVisibility()
            })
        })
    describe('When user login with incorrect login and password', async function(){
        it('he must obtain an error', async function(){
            logger.info('Beginning the test on login with invalid values')
            await homepage.logInButton.click()
            await homepage.waitForLoginVisibility()
            await homepage.authorization("abcd@gmail.com","123456")
            await browser.wait(EC.visibilityOf(homepage.invalidLoginErrorMessage),20000,"Error not appeared")
            expect(await homepage.invalidLoginErrorMessage.isDisplayed()).to.equal(true)
        })
    
    })
})