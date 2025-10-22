require('dotenv').config();
const { getGmailOTP } = require("../../helpers/getGmailOTP");

describe('EyeCareX - Authentication Flows', () => {

  it('should show validation error for empty fields', async () => {
    await $('id=com.eyecarex.mobile.dev:id/title').click();


    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/title").instance(1)').click();
    // await $('android=new UiSelector().text("Sign In")').click();

    const emailError = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/textinput_error")');
    await expect(emailError).toBeDisplayed();
  });



  it('should show error for invalid password', async () => {
    // await $('android=new UiSelector().text("Sign In")').click();
        await $('id=com.eyecarex.mobile.dev:id/title').click();


    await $('id=com.eyecarex.mobile.dev:id/et_email')
      .setValue('designartist1418@gmail.com');
    await $('id=com.eyecarex.mobile.dev:id/et_password')
      .setValue('Shan@2026');

    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/title").instance(1)').click();

    const toast = await $('//android.widget.Toast[@text="Invalid Email or Password"]');
    const toastMsg = await toast.getText();
    console.log('Toast Message:', toastMsg);
    await expect(toastMsg).toContain('Invalid Email or Password');
  });




  it('should complete forgot password flow successfully', async () => {
    await $('id=com.eyecarex.mobile.dev:id/title').click();

    await $('android=new UiSelector().text("Forgot Password")').click();
    await $('id=com.eyecarex.mobile.dev:id/tv_email').click();


    await $('id=com.eyecarex.mobile.dev:id/et_email')
      .setValue('designartist1418@gmail.com');
    await $('android=new UiSelector().text("Send Code")').click();

    console.log('Waiting for Reset OTP email...');
    const resetOTP = await getGmailOTP('reset');
    console.log('Reset OTP:', resetOTP);

    // const digits = resetOTP.split('');
    // for (let i = 0; i < digits.length; i++) {
    //   await $(`id=com.eyecarex.mobile.dev:id/et_${i + 1}`).setValue(digits[i]);
    // }
    const otpDigits = resetOTP.split('');

// Map digits to field IDs
const fieldIds = ['et_one', 'et_two', 'et_three', 'et_four', 'et_five', 'et_six'];

// Loop through each digit and set value
for (let i = 0; i < otpDigits.length; i++) {
  const field = await $(`id=com.eyecarex.mobile.dev:id/${fieldIds[i]}`);
  await field.setValue(otpDigits[i]);
}

    await $('android=new UiSelector().text("Continue")').click();

    await $('id=com.eyecarex.mobile.dev:id/et_new_password').setValue('Shan@2025');
    await $('id=com.eyecarex.mobile.dev:id/et_confirm_password').setValue('Shan@2025');
    await $('android=new UiSelector().text("Confirm New Password")').click();

    await $('android=new UiSelector().text("Back to Login")').click();

    // Login with new password
    // await $('id=com.eyecarex.mobile.dev:id/et_email').setValue('designartist1418@gmail.com');
    // await $('id=com.eyecarex.mobile.dev:id/et_password').setValue('Shan@2025');
    // await $('android=new UiSelector().text("Sign In")').click();

    // const otp = await getGmailOTP('Your EyeCareX Access Code');
    // const digits2 = otp.split('');
    // for (let i = 0; i < digits2.length; i++) {
    //   await $(`id=com.eyecarex.mobile.dev:id/et_${i + 1}`).setValue(digits2[i]);
    // }
// const otpDigits = otp.split('');

// Map digits to field IDs
// const fieldIds = ['et_one', 'et_two', 'et_three', 'et_four', 'et_five', 'et_six'];

// Loop through each digit and set value
// for (let i = 0; i < otpDigits.length; i++) {
//   const field = await $(`id=com.eyecarex.mobile.dev:id/${fieldIds[i]}`);
//   await field.setValue(otpDigits[i]);
// }
//     await $('android=new UiSelector().text("Continue")').click();
//     const user = await $('android=new UiSelector().textContains("Zeeshan Patient")');
//     await expect(user).toBeDisplayed();
  });

  it('should login successfully', async () => {
    console.log('Setting up before each test - Logging in...');

    await $('id=com.eyecarex.mobile.dev:id/title').click();

    await $('id=com.eyecarex.mobile.dev:id/et_email')
      .setValue('designartist1418@gmail.com');
    await $('id=com.eyecarex.mobile.dev:id/et_password')
      .setValue('Shan@2025');
    await $('id=com.eyecarex.mobile.dev:id/rb_remember_me').click();

    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/title").instance(1)').click();

    console.log('Waiting for OTP email...');
    const otp = await getGmailOTP('Your EyeCareX Access Code');

    const otpDigits = otp.split('');

// Map digits to field IDs
const fieldIds = ['et_one', 'et_two', 'et_three', 'et_four', 'et_five', 'et_six'];

// Loop through each digit and set value
for (let i = 0; i < otpDigits.length; i++) {
  const field = await $(`id=com.eyecarex.mobile.dev:id/${fieldIds[i]}`);
  await field.setValue(otpDigits[i]);
}

    // await $('android=new UiSelector().text("Continue")').click();
    const continueBtn = await $('android=new UiSelector().text("Continue")');
await continueBtn.waitForDisplayed({ timeout: 10000 });
await continueBtn.click();

    // await $('android=new UiSelector().text("Start")').click();
    // const nextBtns = await $$('android=new UiSelector().text("Next")');
    // for (const btn of nextBtns) await btn.click();

    // const user = await $('android=new UiSelector().textContains("Zeeshan Patient")');
    // await expect(user).toBeDisplayed();

      // Step 10: Handle Welcome Popups sequence
    console.log('Navigating through onboarding popups...');

    const nextBtn = 'android=new UiSelector().text("Next")';
    const startBtn = 'android=new UiSelector().text("Start")';

    // First popup → Tap "Next"
    if (await $(nextBtn).isDisplayed()) {
      await $(nextBtn).click();
      await driver.pause(1000);
    }

    // Second popup → Tap "Start"
    if (await $(startBtn).isDisplayed()) {
      await $(startBtn).click();
      await driver.pause(1000);
    }

    // Third popup → Tap "Next"
    if (await $(nextBtn).isDisplayed()) {
      await $(nextBtn).click();
      await driver.pause(1000);
    }

    // Fourth popup → Tap "Next" again if appears
    if (await $(nextBtn).isDisplayed()) {
      await $(nextBtn).click();
      await driver.pause(1000);
    }
  });

});
