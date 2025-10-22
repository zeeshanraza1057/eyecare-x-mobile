const readline = require('readline');

async function loginAsPatient() {
  console.log('Checking if user session is still active...');

  try {
    // Check if home screen fragment exists (already logged in)
    const homeFragment = await $('id=com.eyecarex.mobile.dev:id/homeFragment');
    await homeFragment.waitForExist({ timeout: 10000 }); // Added await for the wait
    // const isDisplayed = await homeFragment.isDisplayed(); // Store awaited result
    if (await homeFragment.isDisplayed()) {
      console.log('Session is active — skipping login process.');
      return;
    }
  } catch (err) {
    console.log('No active session found. Proceeding with login...');
  }

  console.log('Logging in as patient...');

  // Step 1: Open login screen
  await $('id=com.eyecarex.mobile.dev:id/title').click();

  // Step 2: Enter credentials
  // await $('id=com.eyecarex.mobile.dev:id/et_email').setValue('akl132@yopmail.com');
    await $('id=com.eyecarex.mobile.dev:id/et_email').setValue('designartist1418@gmail.com');

  console.log('Email entered');

  await $('id=com.eyecarex.mobile.dev:id/et_password').setValue('Shan@2025');
  console.log('Password entered');

  // Step 3: Click remember me
  await $('id=com.eyecarex.mobile.dev:id/rb_remember_me').click();
  console.log('Remember Me clicked');

  // Step 4: Click Login
  await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/title").instance(1)').click();
  console.log('Login button clicked, waiting for OTP screen...');

  // Step 5: Wait for OTP field to appear
  const otpField = await $('id=com.eyecarex.mobile.dev:id/et_six');
  await otpField.waitForDisplayed({ timeout: 15000 });
  console.log('OTP screen is visible');
  
  // Step 6: Wait until user manually enters OTP
  console.log('Waiting for user to manually enter OTP...');

  await driver.waitUntil(async () => {
    const otpText = await otpField.getText();
    console.log('otp text:', otpText);
    return otpText && otpText.length > 0;
  }, {
    timeout: 60000, // wait up to 60s for OTP entry
    timeoutMsg: 'OTP was not entered manually within 60 seconds',
  });

  console.log('OTP detected, proceeding to Continue...');

  // Step 7: Click Continue
  const continueBtn = await $('android=new UiSelector().text("Continue")');
  await continueBtn.waitForDisplayed({ timeout: 10000 });
  await continueBtn.click();

  // Step 8: Handle onboarding / welcome popups
  // console.log('Navigating through onboarding popups...');

  // const nextBtn = 'android=new UiSelector().text("Next")';
  // const startBtn = 'android=new UiSelector().text("Start")';

  // const tryClick = async (selector, label) => {
  //   try {
  //     const el = await $(selector);
  //     if (await el.isDisplayed()) {
  //       console.log(`Clicking ${label}...`);
  //       await el.click();
  //       await driver.pause(1000);
  //     }
  //   } catch (e) {
  //     // Do nothing if button not found
  //   }
  // };

  // await tryClick(nextBtn, 'Next (1)');
  // await tryClick(startBtn, 'Start');
  // await tryClick(nextBtn, 'Next (2)');
  // await tryClick(nextBtn, 'Next (3)');

  // Step 9: Verify home screen
  await $('id=com.eyecarex.mobile.dev:id/homeFragment').waitForDisplayed({ timeout: 20000 });
  console.log('Onboarding complete, login successful!');
}

// Clean-up function (acts like afterEach)
async function cleanupAfterEach() {
  console.log('Cleaning up after test...');
  try {
    if (typeof driver.resetApp === 'function') {
      await driver.resetApp();
      console.log('App reset successfully.');
    } else {
      console.log('Fallback: terminate and reactivate app.');
      await driver.terminateApp('com.eyecarex.mobile.dev');
      await driver.activateApp('com.eyecarex.mobile.dev');
    }

    const homeFragment = await $('id=com.eyecarex.mobile.dev:id/homeFragment');
    await homeFragment.waitForExist({ timeout: 15000 });
    console.log('Home screen ready.');
  } catch (error) {
    console.log('Cleanup failed:', error.message);
  }
}

// Navigate-to-Profile function (acts like afterEach)
async function goToProfileAfterEach() {
  console.log('Running afterEach cleanup...');

  try {
    // Step 1: Go to Profile tab (if possible)
    const profileTab = await $('id=com.eyecarex.mobile.dev:id/profileFragment');
    if (await profileTab.isDisplayed()) {
      await profileTab.click();
      console.log('Navigated to Profile tab.');
    } else {
      console.log('Profile tab not visible, skipping navigation.');
    }

    // Step 2: End or reset app session properly
    if (typeof driver.resetApp === 'function') {
      await driver.resetApp();
      console.log('App reset successfully after test.');
    } else {
      console.log('Fallback: terminating and restarting app...');
      await driver.terminateApp('com.eyecarex.mobile.dev');
      await driver.activateApp('com.eyecarex.mobile.dev');
      console.log('App relaunched successfully.');
    }

  } catch (error) {
    console.log('afterEach cleanup failed:', error.message);
  }
}


// Optional helper (if you ever want to enter OTP from terminal instead of app)
async function askForOTP() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Please enter OTP manually: ', (otp) => {
      rl.close();
      resolve(otp.trim());
    });
  });
}

module.exports = { loginAsPatient, cleanupAfterEach, goToProfileAfterEach };
