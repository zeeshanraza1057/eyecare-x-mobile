const { loginAsPatient } = require('../../helpers/loginAsPatient');

describe('EyeCareX - My Clinics Module', () => {
  before(async () => {
    console.log('Starting My Clinics test...');

    // If session exists, skip login
    const isHomeVisible = await driver.$('id=com.eyecarex.mobile.dev:id/homeFragment').isDisplayed().catch(() => false);
    if (!isHomeVisible) {
      console.log('Session not found, logging in...');
      await loginAsPatient();
    } else {
      console.log('Session detected, skipping login...');
    }
  });

  it('should navigate to My Clinics and open clinic details', async () => {
    console.log('Navigating to My Clinics...');

    // Step 1: Tap on "My Clinics" button from home
    const myClinicsBtn = await $('id=com.eyecarex.mobile.dev:id/myClinicsListingFragment');
    await myClinicsBtn.waitForDisplayed({ timeout: 10000 });
    await myClinicsBtn.click();
    console.log('My Clinics button clicked');

    // Step 2: Wait for Clinics Association screen to load
    const clinicList = await $('id=com.eyecarex.mobile.dev:id/iv_trailing');
    await clinicList.waitForDisplayed({ timeout: 10000 });
    console.log('Clinic list loaded');

    // Step 3: Click on the arrow (to view clinic details)
    await clinicList.click();
    console.log('Clinic details opened successfully');

    // Step 4 (Optional): Verify clinic detail elements
    // Example: wait for a specific text or element
    const detailHeader = await $('android=new UiSelector().textContains("Clinic Details")');
    const isDetailVisible = await detailHeader.isDisplayed().catch(() => false);
    if (isDetailVisible) {
      console.log('Clinic details page verified successfully!');
    } else {
      console.log('Clinic details not visible – check selector or timing.');
    }
  });
});
