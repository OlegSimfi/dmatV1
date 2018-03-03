require('chai').should();
const fs = require('fs');
const path = require('path');
const timestamp = + new Date();
const emailForRegistration = 'qaat' + timestamp + '@mailinator.com'; //Creating Email for registration
const {
    passwordForRegistration,
    usernameForRegistration,
    facebookEmail,
    facebookPassword,
    usernameExistingUser,
    existingUserEmail,
    existingUserPassword
} = require('../constants');


describe("Register with Email", function () {
    it("Open Registration window", function () {
        // browser.windowHandleMaximize();
        // browser.windowHandleSize({width: 1920, height: 1080});
        // browser.windowHandleFullscreen();
        browser.url('');
        browser.click('//button[.="Sign Up"]');
        browser.pause(1000);
        const registrationWindowTitle = browser.getText('//span[@class="form-title"]');
        registrationWindowTitle.should.equal('Registration');
    });
    it("Enter registration data", function () {
        browser.setValue('#name',usernameForRegistration);
        browser.setValue('#email',emailForRegistration);
        console.log(emailForRegistration);
        browser.setValue('#password',passwordForRegistration);
        browser.click('//button[contains(@class, "form-submit-btn")]');
        browser.pause(3000);
        fs.writeFileSync(path.join(__dirname, '../createdEmail.json'), JSON.stringify({emailForRegistration}), 'utf8'); //Creating createdEmail.json file with Email for registration
    });
    it("Check login after registration", function () {
        const userLogin = browser.getText('//span[@class="profile-name"]');
        userLogin.should.equal(usernameForRegistration);
        const balanceTitle = browser.getText('//div[@class="header-balance-title"]');
        balanceTitle.should.equal('Your balance');
        const balanceValue = browser.getText('//div[@class="header-balance-value"]');
        balanceValue.should.equal('$0.00');
        const addFundButton = browser.isExisting('//a[@class="action-btn header-glow-btn funds-btn"]');
        addFundButton.should.equal(true);

    });
    it("Logout", function () {
        browser.click('//button[@class="logout-btn"]');
        browser.pause(1000);
    });
    it("Check Logout", function () {
        const logInButton = browser.isExisting('//button[.="Log In"]');
        logInButton.should.equal(true);
        const signUpButton = browser.isExisting('//button[.="Sign Up"]');
        signUpButton.should.equal(true);
    });
 });

// describe("Login with Facebook", function () {
//     it("Open Login window", function () {
//         browser.click('//button[.="Log In"]');
//         browser.pause(1000);
//         const loginWindowTitle = browser.getText('//span[@class="form-title"]');
//         loginWindowTitle.should.equal('Login');
//     });
//     it("Login to Facebook", function () {
//         browser.click('//a[@class="social-login-btn large facebook-login"]');
//         browser.setValue('#email',facebookEmail);
//         browser.setValue('#pass',facebookPassword);
//         browser.click('//button[@name="login"]');
//         browser.pause(3000);
//     });
//     it("Check login with Facebook", function () {
//         const userLogin = browser.getText('//span[@class="profile-name"]');
//         userLogin.should.equal('Andrii');
//         const balanceTitle = browser.getText('//div[@class="header-balance-title"]');
//         balanceTitle.should.equal('Your balance');
//         const balanceValue = browser.getText('//div[@class="header-balance-value"]');
//         balanceValue.should.equal('$0.00');
//         const addFundButton = browser.isExisting('//a[@class="action-btn header-glow-btn funds-btn"]');
//         addFundButton.should.equal(true);
//     });
//     it("Logout", function () {
//         browser.click('//button[@class="logout-btn"]');
//         browser.pause(1000);
//     });
//     it("Check Logout", function () {
//         const logInButton = browser.isExisting('//button[.="Log In"]');
//         logInButton.should.equal(true);
//         const signUpButton = browser.isExisting('//button[.="Sign Up"]');
//         signUpButton.should.equal(true);
//     });
// });

    describe("Login with Email of existing user", function () {
        it("Open Login window", function () {
            browser.click('//button[.="Log In"]');
            browser.pause(1000);
            const loginWindowTitle = browser.getText('//span[@class="form-title"]');
            loginWindowTitle.should.equal('Login');
        });
        it("Login with Email", function () {
            browser.setValue('#username',existingUserEmail);
            browser.setValue('#password',existingUserPassword);
            browser.click('//button[contains(@class, "form-submit-btn")]');
            browser.pause(3000);
        });
        it("Check Login with Email", function () {
            const userLogin = browser.getText('//span[@class="profile-name"]');
            userLogin.should.equal(usernameExistingUser);
            const balanceTitle = browser.getText('//div[@class="header-balance-title"]');
            balanceTitle.should.equal('Your balance');
            const balanceValue = browser.getText('//div[@class="header-balance-value"]');
            balanceValue.should.equal('$0.00');
            const addFundButton = browser.isExisting('//a[@class="action-btn header-glow-btn funds-btn"]');
            addFundButton.should.equal(true);

        });
        it("Logout", function () {
            browser.click('//button[@class="logout-btn"]');
            browser.pause(1000);
        });
        it("Check Logout", function () {
            const logInButton = browser.isExisting('//button[.="Log In"]');
            logInButton.should.equal(true);
            const signUpButton = browser.isExisting('//button[.="Sign Up"]');
            signUpButton.should.equal(true);
        });
 });
