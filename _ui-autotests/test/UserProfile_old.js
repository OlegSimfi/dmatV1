require('chai').should();
const {
    passwordForRegistration,
    usernameForRegistration,
    termsAndConditionsExample
} = require('../constants');
const { emailForRegistration } = require('../createdEmail.json');

const newAddress = 'QaTester\nUkraine, Kyiv 02000\nKhreshchatyk str, b. 77, apt. 9\nPhone: +380507777777';
const editedAddress = 'QaTester\nUkraine, Kyiv 02000\nVelyka Vasylkivska str, b. 74, apt. 11\nPhone: +380508787879';
const newAddressSecond = 'QaTester\nUkraine, Kyiv 02000\nBaseina Street str, b. 7, apt. 10\nPhone: +380509999999';
let nameOfItemForSell;
let priceOfItemForSell;
let userBalanceBeforeSelling;
let userBalanceBeforeDelivering;
let deliveryPrice;
let gotItemName;
let gotItemPrice;
let totalAmountPrice;
let totalAmountPriceFloat;
let gotItemNameArray = [];
let gotItemPriceArray = [];
//Delete after add "Add funds" test
const tempUsername = "AutomationTemp";
const tempUserEmail = "tempUser@test.com";
const tempUserPassword = "!QAZ2wsx";
////////////////////////////////////

describe("Login with registered User account", function () {
    it("Open Login window", function () {
        // browser.windowHandleMaximize();
        // browser.windowHandleFullscreen();
        browser.url('');
        browser.pause(2000);
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
describe("Add new address (General info)", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
    });
    it("Add new address", function () {
        browser.click('//button[@class="add-address"]');
        browser.setValue('//input[@name="firstName"]', 'QA');
        browser.setValue('//input[@name="lastName"]', 'Automation');
        browser.setValue('//input[@name="phone"]', '+380507777777');
        browser.setValue('//input[@name="country"]','Ukraine');
        browser.setValue('//input[@name="region"]','Kyiv city');
        browser.setValue('//input[@name="city"]','Kyiv');
        browser.setValue('//input[@name="zipCode"]','02000');
        browser.setValue('//input[@name="street"]','Khreshchatyk');
        browser.setValue('//input[@name="building"]','77');
        browser.setValue('//input[@name="apartment"]','9');
        browser.click('//button[contains(@class, "action-btn brand-solid save-btn")]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check added address", function () {
        const addressInfo = browser.getText('//div[@class="address-info"]');
        addressInfo.should.equal(newAddress);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});

describe("Edit Delivery address", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
    });
    it("Edit address", function () {
        browser.click('//a[@class="edit"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
        browser.setValue('//input[@name="phone"]', '+380508787879');
        browser.setValue('//input[@name="street"]','Velyka Vasylkivska');
        browser.setValue('//input[@name="building"]','74');
        browser.setValue('//input[@name="apartment"]','11');
        browser.click('//button[contains(@class, "action-btn brand-solid save-btn")]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check edited address", function () {
        const addressInfo = browser.getText('//div[@class="address-info"]');
        addressInfo.should.equal(editedAddress);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});

describe("Add new address (Second)", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
      });
    it("Add new address", function () {
        browser.click('//button[@class="add-address"]');
        browser.setValue('//input[@name="firstName"]', 'QA');
        browser.setValue('//input[@name="lastName"]', 'Automation');
        browser.setValue('//input[@name="phone"]', '+380509999999');
        browser.setValue('//input[@name="country"]','Ukraine');
        browser.setValue('//input[@name="region"]','Kyiv city');
        browser.setValue('//input[@name="city"]','Kyiv');
        browser.setValue('//input[@name="zipCode"]','02000');
        browser.setValue('//input[@name="street"]','Baseina Street');
        browser.setValue('//input[@name="building"]','7');
        browser.setValue('//input[@name="apartment"]','10');
        browser.click('//button[contains(@class, "action-btn brand-solid save-btn")]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check added second address", function () {
        const addressInfo = browser.getText('//div[@class="address-info"]');
        addressInfo[1].should.equal (newAddressSecond);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});
describe("Set address as Default", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
        browser.pause(1000);
    });
    it("Set as default", function () {
        const arrayInitialAddressStatus = $$('.address-controls span');
        const initialAddressStatusFirst = arrayInitialAddressStatus[0];
        const initialAddressStatusSecond = arrayInitialAddressStatus[1];
        const initialAddressStatusFirstText = initialAddressStatusFirst.getText();
        const initialAddressStatusSecondText = initialAddressStatusSecond.getText();
        initialAddressStatusFirstText.should.equal('Default'); //Check initial address status
        initialAddressStatusSecondText.should.equal('Set as default'); //Check initial address status
        browser.click('//span[.="Set as default"]');
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check setting Default address on the General info tab", function () {
        const arrayChangedAddressStatus = $$('.address-controls span');
        const changedAddressStatusFirst = arrayChangedAddressStatus[0];
        const changedAddressStatusSecond = arrayChangedAddressStatus[1];
        const changedAddressStatusFirstText = changedAddressStatusFirst.getText();
        const changedAddressStatusSecondText = changedAddressStatusSecond.getText();
        changedAddressStatusFirstText.should.equal('Set as default');
        changedAddressStatusSecondText.should.equal('Default');
        browser.pause(1000);
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
    //Add test "Check setting Default address on the Delivery tab" after completed Game tests!!!
});
describe("Delete Address", function () {
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
        browser.pause(3000);
    });
    it("Deleting address", function () {
        const arayOfAddresses = browser.getText('//div[@class="address-controls"]');
        const quantityOfAddresses = arayOfAddresses.length;
        quantityOfAddresses.should.equal(2); // Check quantity of added addresses
        const deleteButtonArray = $$('.default');
        const deleteFirstAddressButton = deleteButtonArray[1].selector;
        browser.click(deleteFirstAddressButton);
        browser.pause(1000);
        const notificationMessage = browser.isExisting ('//div[@class="notification-container success"]');
        notificationMessage.should.equal(true);
        browser.pause(1000);
        const notificationMessageTitle = browser.getText('//div[@class="notification-title"]');
        notificationMessageTitle.should.equal('Delivery address!');
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery address has been successfully updated!');
        browser.pause(1000);
    });
    it("Check deleting address", function () {
        let addresses = browser.getText('//div[@class="address-controls"]');
        addresses = typeof addresses === 'string' ? [addresses] : addresses;
        const quantityOfAddresses = addresses.length;
        quantityOfAddresses.should.equal(1);
        const addressStatus = browser.getText('//div[@class="address-controls"]');
        addressStatus.should.equal('Default');
        //Use after fixing bug DRAKE-206
    });

    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
    //Add test "Check deleting address on the Delivery tab" after completed Game tests!!!
});
describe("Sell Item", function () {
    it("Temporary precondition", function () {
        browser.click('//button[@class="logout-btn"]');
        browser.pause(1000);
        browser.click('//button[.="Log In"]');
        browser.pause(1000);
        const loginWindowTitle = browser.getText('//span[@class="form-title"]');
        loginWindowTitle.should.equal('Login');
        browser.setValue('#username',tempUserEmail);
        browser.setValue('#password',tempUserPassword);
        browser.click('//button[contains(@class, "form-submit-btn")]');
        browser.pause(3000);
    });
    it("Open User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
    });
    it("Open General info tab", function () {
        browser.click('//button[@class="btn-profileForm"]');
        const titleOfTab = browser.getText('//h2');
        titleOfTab.should.equal ("Delivery info");
    });
    it("Open Got tab", function () {
        browser.click('//button[@class="btn-profileProducts"]');
        browser.pause(1000);
        // browser.click('//button[@class="btn-profileProducts"]');
        // browser.click('//button[@name="got"]');
        browser.waitForVisible('//div[@class="total-amount-wrapper"]', 150000);
        browser.pause(1000);
    });
    it("Sell Item", function () {
        userBalanceBeforeSelling = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        nameOfItemForSell = browser.getText('//a[@class="product-title"]');
        priceOfItemForSell = browser.getText('//div[@class="product-item"]//div[@class="price"]');
        browser.click('//button[@class="action-btn brand-solid sell"]');
        browser.pause(1000);
        const sellingWindowTitle = browser.getText('//span[@class="sell-modal-title"]');
        sellingWindowTitle.should.equal("Selling product");
        const sellingWindowText =  browser.getText('//div[@class="sell-modal-text with-image"]');
        sellingWindowText.should.equal(`Are you sure you want to sell ${nameOfItemForSell} for ${priceOfItemForSell}?\nThe sum will be added to your balance`);
        browser.click('//button[@class="action-btn brand-solid sell-modal-submit-btn"]');
        browser.pause(1000);
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Item successfully sold');
    });
    it("Check User balance after selling of item", function () {
        const userBalanceAfterSelling = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const priceOfItemForSellFloat = parseFloat(priceOfItemForSell.substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const expectedUserBalanceAfterSelling = (userBalanceBeforeSelling + priceOfItemForSellFloat);
        function comparisonUserBalance (userBalanceAfterSelling, expectedUserBalanceAfterSelling) {
            return userBalanceAfterSelling === expectedUserBalanceAfterSelling
        }

        let comparisonUserBalanceResult = comparisonUserBalance(userBalanceAfterSelling, expectedUserBalanceAfterSelling);
        comparisonUserBalanceResult.should.equal(true);
    });
    // Add check selling item on the Sold tab after add "Add funds" test

    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});

describe("Deliver Item", function () {
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
    it("Check got item on the Got tab in the User Profile", function () {
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
        // browser.click('//button[@class="btn-profileProducts"]');
        // browser.click('//button[@name="got"]');
        browser.waitForVisible('//div[@class="total-amount-wrapper"]', 150000);
        browser.pause(1000);
        const itemNameOnGotTab = browser.getText('//a[@class="product-title"]');
        itemNameOnGotTab.should.equal(gotItemName);
        const itemPriceOnGotTab = browser.getText('//div[@class="product-item"]//div[@class="price"]');
        itemPriceOnGotTab.should.equal(gotItemPrice);
    });
    it("Check User balance before delivering", function () {
        userBalanceBeforeDelivering = browser.getText('//div[@class="header-balance-value"]');
    });
    it("Deliver item", function () {
        browser.click('//button[@name="withdrawn"]');
        browser.pause(3000);
        deliveryPrice = parseInt(browser.getText('//span[@class="delivery-modal-title-tooltip"]').match(/\D*(\d+)\D*/)[1],10); //Get delivery price from Delivery window
        // const addressInfoDeliveryWindow =  browser.getText('//div[@class="address-item-content"]');
        // addressInfoDeliveryWindow.should.equal(editedAddress);                                              // Add check Delivery info on the Delivery window after add "Add funds" test
        browser.click('//span[.="Terms and Conditions"]');
        browser.pause(1000);
        const termsAndConditionsText = browser.getText('//div[@class="delivery-modal-content-wrapper"]');
        // termsAndConditionsText.should.equal(termsAndConditionsExample); Check after bux fix DRAKE-305
        browser.click('//span[.="Back to delivery"]');
        browser.click('//span[.="I agree with "]');
        browser.click('//span[.="Confirm delivery"]');
        browser.pause(1000);
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Delivery process started!');
        browser.pause(3000);
    });
    it("Check User balance after delivery of item", function () {
        const userBalanceAfterDeliveryOfItem = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const expectedUserBalanceAfterDeliveryOfItem = parseFloat((userBalanceBeforeDelivering.substr(1)).replace(new RegExp(/\s/, 'g'), '')) - deliveryPrice;

        function comparisonUserBalance (userBalanceAfterDeliveryOfItem, expectedUserBalanceAfterDeliveryOfItem) {
            return userBalanceAfterDeliveryOfItem === expectedUserBalanceAfterDeliveryOfItem
        }

        let comparisonUserBalanceResult = comparisonUserBalance(userBalanceAfterDeliveryOfItem, expectedUserBalanceAfterDeliveryOfItem);
        comparisonUserBalanceResult.should.equal(true);
        browser.pause(1000);
        // Add check delivery item on the Delivered tab after add "Add funds" test
    });
    it("Return to Main Page", function () {
        browser.click('//a[@class="header-logo"]');
        browser.pause(3000);
    });
});

describe("Sell All", function () {
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
        const gotItemPriceFloat = parseFloat(gotItemPrice.substr(1).replace(new RegExp(/\s/, 'g'), ''));
        gotItemNameArray.push(gotItemName);
        gotItemPriceArray.push(gotItemPriceFloat);
        const openAgainButton = browser.isExisting('//span[.="Open again"]');
        openAgainButton.should.equal(true);
        const sellItemButton = browser.isExisting('//span[.="Sell item"]');
        sellItemButton.should.equal(true);
        const linkToPrifileText = browser.getText('//div[@class="roulette-modal-support-info"]');
        linkToPrifileText.should.equal('You can withraw it anytime in your profile');
        const linkToPrifile = browser.isExisting('//a[@href="/profile"]');
        linkToPrifile.should.equal(true);
    });
    for (let i = 0; i<=1; i++){
    it("Check Congratulations window and Open again", function () {
        const openAgainButton = browser.isExisting('//span[.="Open again"]');
        openAgainButton.should.equal(true);
        const sellItemButton = browser.isExisting('//span[.="Sell item"]');
        sellItemButton.should.equal(true);
        const linkToPrifileText = browser.getText('//div[@class="roulette-modal-support-info"]');
        linkToPrifileText.should.equal('You can withraw it anytime in your profile');
        const linkToPrifile = browser.isExisting('//a[@href="/profile"]');
        linkToPrifile.should.equal(true);
        browser.click('//span[.="Open again"]');
        browser.pause(16000);
        gotItemName = browser.getText('//span[@class="dropitem-name"]');
        gotItemPrice = browser.getText('//span[@class="dropitem-price"]');
        const gotItemPriceFloat = parseFloat(gotItemPrice.substr(1).replace(new RegExp(/\s/, 'g'), ''));
        gotItemNameArray.push(gotItemName);
        gotItemPriceArray.push(gotItemPriceFloat);
        });
        }
    it("Check got items and price on the Got tab in the User Profile", function () {
        browser.click('//button[@class="modal-close"]');
        browser.click('//div[@class="profile-image"]');
        browser.pause(1000);
        // browser.click('//button[@class="btn-profileProducts"]');
        // browser.click('//button[@name="got"]');                   //Check, and apply to all such tests
        browser.waitForVisible('//div[@class="total-amount-wrapper"]', 150000);
        let itemsNamesOnGotTabArray =[];
        const itemsNamesOnGotTab = $$('.product-title');

        for (let i =0; i < itemsNamesOnGotTab.length; i++){
            const itemName = itemsNamesOnGotTab[i].getAttribute('outerText');
            itemsNamesOnGotTabArray.push(itemName);
        }
        itemsNamesOnGotTabArray.reverse();

        function comparisonNamesOnGotTabArrays (arr1, arr2) {
            let isEqual = true;
            // if (arr1.length !== arr2.length) return false;
            arr1.forEach((item, i) => {
                if (item !== arr2[i]) isEqual = false
            });
            return isEqual
        }

        let comparisonNamesOnGotTabArraysResult = comparisonNamesOnGotTabArrays(gotItemNameArray, itemsNamesOnGotTabArray);
        comparisonNamesOnGotTabArraysResult.should.equal(true);

        totalAmountPrice = browser.getText('//div[@class="total-amount"]');
        totalAmountPriceFloat = parseFloat(totalAmountPrice.substr(16).replace(new RegExp(/\s/, 'g'), ''));
        const expectedTotalAmountPrice = gotItemPriceArray.reduce(function(sum, current) {
            return sum + current;
        }, 0);

        function comparisonTotalAmountPrice (totalAmountPriceFloat, expectedTotalAmountPrice) {
            return totalAmountPriceFloat === expectedTotalAmountPrice
        }

        let comparisonTotalAmountPriceResult = comparisonTotalAmountPrice(totalAmountPriceFloat, expectedTotalAmountPrice);
        comparisonTotalAmountPriceResult.should.equal(true);
    });
    it("Sell All items", function () {
        userBalanceBeforeSelling = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        browser.click('//button[@class="sell"]');
        browser.waitForVisible('//div[@class="sell-modal-container"]', 3000);
        const sellingWindowTitle = browser.getText('//span[@class="sell-modal-title"]');
        sellingWindowTitle.should.equal("Selling all products");
        const sellingWindowText =  browser.getText('//div[@class="sell-modal-text"]');
        sellingWindowText.should.equal(`Are you sure you wan’t to sell all your products for: $ ${totalAmountPriceFloat}.00 ?\nThis action can not be undone. The sum will be added to your balance.`);
        browser.click('//button[@class="action-btn brand-solid sell-modal-submit-btn"]');
        browser.pause(4000); //Update after site speedup
        const notificationMessageText = browser.getText('//div[@class="notification-content"]');
        notificationMessageText.should.equal('Item successfully sold');
        browser.pause(5000);
    });
    it("Check Got tab and User balance after selling of items", function () {
        browser.waitForVisible('//div[@class="total-amount-wrapper"]', 5000);
        const totalAmountAfterSelling = browser.getText('//div[@class="total-amount"]');
        totalAmountAfterSelling.should.equal('Total amount: $ 0.00');
        const userBalanceAfterSelling = parseFloat(browser.getText('//div[@class="header-balance-value"]').substr(1).replace(new RegExp(/\s/, 'g'), ''));
        const expectedUserBalanceAfterSelling = (userBalanceBeforeSelling + totalAmountPriceFloat);

        function comparisonUserBalance (userBalanceAfterSelling, expectedUserBalanceAfterSelling) {
            return userBalanceAfterSelling === expectedUserBalanceAfterSelling
        }

        let comparisonUserBalanceResult = comparisonUserBalance(userBalanceAfterSelling, expectedUserBalanceAfterSelling);
        comparisonUserBalanceResult.should.equal(true);
    });
    // Add check selling item on the Sold tab after add "Add funds" test
});



