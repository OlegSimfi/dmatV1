require('chai').should();
const {
    passwordForRegistration,
    usernameForRegistration
} = require('../constants');
const { emailForRegistration } = require('../createdEmail.json');
let nameOfcase;
let priceOfCase;
let totalOpenedCasesValueBeforeOpenCase;
let userBalanceBeforeOpenCase;
let gotItemName;
let gotItemPrice;
let userBalanceBeforeAddFunds;


describe("Login with registered User account", function () {
    it("Open Login window", function () {
        // browser.windowHandleMaximize();
        // browser.windowHandleFullscreen();
        browser.url('');
        browser.click('//button[.="Log In"]');
        browser.pause(1000);
        const loginWindowTitle = browser.getText('//span[@class="form-title"]');
        loginWindowTitle.should.equal('Login');
    });
    it("Login with Email", function () {
        const loginWindowTitle = browser.getText('//span[@class="form-title"]');
        loginWindowTitle.should.equal('Login');
        browser.setValue('#username',emailForRegistration);
        browser.setValue('#password',passwordForRegistration);
        browser.click('//button[contains(@class, "form-submit-btn")]');
        browser.pause(3000);
    });
    it("Check Login with Email", function () {
        const userLogin = browser.getText('//span[@class="profile-name"]');
        userLogin.should.equal(usernameForRegistration);
        const balanceTitle = browser.getText('//div[@class="header-balance-title"]');
        balanceTitle.should.equal('Your balance');
        const balanceValue = browser.getText('//div[@class="header-balance-value"]');
        balanceValue.should.equal('$0.00');
        const addFundButton = browser.isExisting('//a[@class="action-btn header-glow-btn funds-btn"]');
        addFundButton.should.equal(true);
    });
});

describe("Check Case", function () {
    it("Open View page of Case", function () {
        nameOfcase = browser.getText('//h1[.="Smart Case"]');
        priceOfCase = browser.getText('//h1[.="Smart Case"]/following-sibling::div[1]');
        browser.click('//h1[.="Smart Case"]');
        browser.pause(1000);
    });
    it("Check opened Case", function () {
        const onlineDrop = browser.isExisting('//div[@class="onlinedrop-container"]');
        onlineDrop.should.equal(true);
        const nameOfopenedCase = browser.getText('//h1');
        nameOfopenedCase.should.equal(nameOfcase);
        const priceOfOpenedCase = browser.getText('//div[@class="box-detail-price"]');
        priceOfOpenedCase.should.equal(priceOfCase);
        const roulette = browser.isExisting('//div[@class="roulette-row"]');
        roulette.should.equal(true);
        const boxContent = browser.getText('//div[@class="box-detail-content"]');
        boxContent.should.equal('15 Items in the case that you can get\nApple iPhone X\n$999.00\nGoPro HERO6\n$500.00\nApple Watch Series 3\n$399.00\nSamsung Galaxy S8\n$750.00\nOculus Rift\n$435.00\nXiaomi Mi Band 2\n$35.00\nAmazon Echo\n$100.00\nAmazon Echo Dot\n$50.00\nLaMetric Wi-Fi Clock\n$199.00\nWIFI Projector\n$130.00\nAmazon Fire TV Stick\n$40.00\nVoice Control Car\n$35.00\nWiFi Drone\n$60.00\nEufy RoboVac 11\n$220.00\nSmart Home Hub\n$84.00');
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(1000);
    });
});

describe("Open Case (Balance 0.00$)", function () {
    it("Open View page of Case", function () {
        nameOfcase = browser.getText('//h1[.="Smart Case"]');
        priceOfCase = browser.getText('//h1[.="Smart Case"]/following-sibling::div[1]');
        browser.click('//h1[.="Smart Case"]');
        browser.pause(1000);
    });
    it("Open Case", function () {
        const OpenCaseButton = ('//button[@class="action-btn brand-solid"]');
        browser.click(OpenCaseButton);
        browser.pause(1000);
    });
    it("Check Add funds page", function () {
        browser.waitForVisible('//h1[@class="payment-page-title"]', 50000);
        const paymentPageTitle = browser.getText('//h1[@class="payment-page-title"]');
        paymentPageTitle.should.equal('Add funds');
        browser.pause(1000);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(1000);
    });
});

describe("Add Funds", function () {
    it("Open Add funds page", function () {
        browser.click('//span[.="Add funds"]');
        browser.waitForVisible('//h1[@class="payment-page-title"]', 50000);
        const paymentPageTitle = browser.getText('//h1[@class="payment-page-title"]');
        paymentPageTitle.should.equal('Add funds');
        browser.pause(1000);
        userBalanceBeforeAddFunds = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
    });
    it("Enter amount", function () {
         browser.setValue('//input[@name="payment-amount"]', '100');
         browser.pause(1000);
         const totalSum = browser.getText('//span[@class="value"]');
        totalSum.should.equal(totalSum);
        browser.click('//span[.="continue"]');
    });
    it("Enter billing address", function () {
        browser.waitForVisible('//div[@class="payment-select-block-title"]', 50000);
        const paymentSelectBlockTitle = browser.getText('//div[@class="payment-select-block-title"]');
        paymentSelectBlockTitle.should.equal('Enter a billing address(it can be the same as a delivery address)');
        browser.setValue('//input[@name="firstName"]', 'QA');
        browser.setValue('//input[@name="lastName"]', 'Automation');
        browser.click('//div[@class="react-datepicker__input-container"]//input[@type="text"]');
        browser.pause(1000);
        browser.click('//select[@class="react-datepicker__year-select"]');
        browser.pause(1000);
        browser.click('//option[@value="1987"]');
        browser.pause(1000);
        browser.click('//select[@class="react-datepicker__month-select"]');
        browser.pause(1000);
        browser.click('//option[@value="11"]');
        browser.pause(1000);
        browser.click('//div[.="27"]');
        browser.setValue('//input[@name="phone"]', '+380508787879');
        browser.click('#country');
        browser.pause(1000);
        browser.click('//option[@value="UA"]');
        browser.setValue('//input[@name="city"]','Kyiv');
        browser.setValue('//input[@name="zipCode"]','02000');
        browser.setValue('//input[@name="street"]','Velyka Vasylkivska');
        browser.setValue('//input[@name="building"]','74');
        browser.setValue('//input[@name="apartment"]','11');
        browser.click('//span[.="continue"]');
        browser.pause(20000);
    });
    it("Check Secure Payment Information page", function () {
        const pageTitle = browser.getText('//h1');
        pageTitle.should.equal("SECURE PAYMENT INFORMATION");
        const firstName = browser.getValue('#firstname');
        firstName.should.equal("QA");
        const lastName = browser.getValue('#lastname');
        lastName.should.equal("Automation");
        const city = browser.getValue('#city');
        city.should.equal("Kyiv");
        const country = browser.getValue('#country');
        country.should.equal("UA");
        const phone = browser.getValue('#phone');
        phone.should.equal("+380508787879");
        const address = browser.getValue('#address');
        address.should.equal("Velyka Vasylkivska, 74 11");
        const state = browser.getValue('#state');
        state.should.equal("Kyiv");
        const postCode = browser.getValue('#post_code');
        postCode.should.equal("02000");
        const email = browser.getValue('#email');
        email.should.equal(emailForRegistration);
        const totalDueAmount = browser.getText('//div[@class="total-amt"]//span');
        totalDueAmount.should.equal('100 USD');
        //Make test more flexible in the future
    });
    it("Enter Payment Detail and Pay", function () {
        browser.setValue('#card_number','4111111111111111');
        browser.click('#expiry_month');
        browser.pause(1000);
        browser.click('//option[@value="09"]');
        browser.click('#expiry_year');
        browser.pause(1000);
        browser.click('//option[@value="2021"]');
        browser.setValue('#card_cvv','178');
        browser.click('#term_condition_checkbox');
        browser.click('#submit_hpp');
        browser.pause(7000);
        const pageTitle = browser.getText('//h1');
        pageTitle.should.equal("SECURE PAYMENT INFORMATION");
        const transactionSuccess = browser.getText('//div[@class="alert alert-success"]');
        transactionSuccess.should.equal("Transaction Success");
        browser.pause(50000);
    });
    it("Check Add Funds", function () {
        browser.url('');
        browser.screenshot();
        const userBalanceAfterAddFunds = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const expectedUserBalanceAfterAddFunds = userBalanceBeforeAddFunds + 100;

        function comparisonUserBalance (userBalanceAfterAddFunds, expectedUserBalanceAfterAddFunds) {
            return userBalanceAfterAddFunds === expectedUserBalanceAfterAddFunds
        }

        let comparisonUserBalanceResult = comparisonUserBalance(userBalanceAfterAddFunds, expectedUserBalanceAfterAddFunds);
        comparisonUserBalanceResult.should.equal(true);
    });
});

describe("Open Case", function () {
    it("Check User balance and total opened cases value", function () {
        totalOpenedCasesValueBeforeOpenCase = browser.getText('//span[@class="header-stats-count"]')[1];
        userBalanceBeforeOpenCase = browser.getText('//div[@class="header-balance-value"]');
    });
    it("Open View page of Case", function () {
        nameOfcase = browser.getText('//h1[.="Smart Case"]');
        priceOfCase = browser.getText('//h1[.="Smart Case"]/following-sibling::div[1]');
        browser.click('//h1[.="Smart Case"]');
        browser.pause(1000);
    });
    it("Open Case", function () {
        const OpenCaseButton = ('//button[@class="action-btn brand-solid"]');
        browser.click(OpenCaseButton);
        browser.pause(15000);
    });
    it("Check Congratulations window", function () {
        gotItemName = browser.getText('//span[@class="dropitem-name"]');
        gotItemPrice = browser.getText('//span[@class="dropitem-price"]');
        const openAgainButton = browser.isExisting('//span[.="Open again"]');
        openAgainButton.should.equal(true);
        const sellItemButton = browser.isExisting('//span[.="Sell item"]');
        sellItemButton.should.equal(true);
        const linkToPrifileText = browser.getText('//div[@class="roulette-modal-support-info"]');
        linkToPrifileText.should.equal('You can withraw it anytime in your profile');
        const linkToPrifile = browser.isExisting('//a[@href="/profile"]');
        linkToPrifile.should.equal(true);
        browser.click('//button[@class="modal-close"]');
        browser.pause(3000);
    });
    it("Check got item in Live drop", function () {
        const liveDropArray = $$('.onlinedrop-item-product');
        const gotItemInArray = liveDropArray[0];
        const titleOfItemInArray = gotItemInArray.getAttribute('title');
        console.log(gotItemName);
        titleOfItemInArray.should.equal(gotItemName);
    });
    it("Check User balance and total opens cases value after opening box", function () {
        const totalOpenedCasesValueAfterOpenCase = parseInt(browser.getText('//span[@class="header-stats-count"]')[1].replace(new RegExp(/\s/, 'g'), ''),10);
        const userBalanceAfterOpenCase = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const expectedTotalOpenedCasesValueAfterOpenCase = parseInt(totalOpenedCasesValueBeforeOpenCase.replace(new RegExp(/\s/, 'g'), ''), 10) +1;

        function precisionRound(number, precision) {
            const factor = Math.pow(10, precision);
            return Math.round(number * factor) / factor;
        }
        const expectedUserBalanceAfterOpenCase = precisionRound(parseFloat((userBalanceBeforeOpenCase.substr(1)).replace(new RegExp(/\s/, 'g'), '')) - parseFloat((priceOfCase.substr(1)).replace(new RegExp(/\s/, 'g'), '')), 2);


        function comparisonOpenCase (totalOpenedCasesValueAfterOpenCase, expectedTotalOpenedCasesValueAfterOpenCase) {
            return totalOpenedCasesValueAfterOpenCase === expectedTotalOpenedCasesValueAfterOpenCase
        }

        let comparisonOpenCaseResult = comparisonOpenCase(totalOpenedCasesValueAfterOpenCase, expectedTotalOpenedCasesValueAfterOpenCase);
        comparisonOpenCaseResult.should.equal(true);

        function comparisonUserBalance (userBalanceAfterOpenCase, expectedUserBalanceAfterOpenCase) {
            return userBalanceAfterOpenCase === expectedUserBalanceAfterOpenCase
        }

        let comparisonUserBalanceResult = comparisonUserBalance(userBalanceAfterOpenCase, expectedUserBalanceAfterOpenCase);
        comparisonUserBalanceResult.should.equal(true);
        browser.pause(1000);
    });

    it("Check got item on the Got tab in the User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
        browser.click('//button[@class="btn-profileProducts"]');
        browser.click('//button[@name="got"]');
        browser.pause(1000);
        const itemNameOnGotTab = browser.getText('//a[@class="product-title"]');
        itemNameOnGotTab.should.equal(gotItemName);
        const itemPriceOnGotTab = browser.getText('//div[@class="product-item"]//div[@class="price"]');
        itemPriceOnGotTab.should.equal(gotItemPrice);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(5000);
    });
});

