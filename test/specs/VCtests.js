describe('🧿 Vision & Colour Vision Tests Flow', () => {

  // Small helper pause
  async function shortPause(ms = 2000) {
    await driver.pause(ms);
  }

  // ============
  // VISION TEST
  // ============
  it('should perform Vision Test flow correctly', async () => {
    console.log('Starting Vision Test...');

    // Step 1: Click on Vision Test
    const visionTestBtn = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(0)');
    await visionTestBtn.click();
    console.log('Clicked Vision Test button');

    // Step 2: Check acknowledgment
    const checkBox = await $('id=com.eyecarex.mobile.dev:id/rb_acknowledgment');
    await checkBox.click();
    console.log('Checked acknowledgment');

    // Step 3: Click first "Proceed to test"
    const proceedBtn1 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(14)');
    await proceedBtn1.click();
    console.log('Clicked first Proceed button');

    // Step 4: Click second "Proceed to test"
    const proceedBtn2 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(19)');
    await proceedBtn2.click();
    console.log('Clicked second Proceed button');

    // Step 5: Allow permissions (twice)
    const allowBtn1 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(7)');
    await allowBtn1.click();
    console.log('First Allow clicked');

    await shortPause(1000);
    const allowBtn2 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(7)');
    await allowBtn2.click();
    console.log('Second Allow clicked');

    // Step 6: Final proceed on sensor screen
    const finalProceed = await $('android=new UiSelector().className("android.view.ViewGroup").instance(6)');
    await finalProceed.click();
    console.log('Final Proceed clicked — test reached stuck point.');

    console.log('Vision Test completed successfully (until stuck point).');
  });


  // ===================
  // COLOUR VISION TEST
  // ===================
  it('should perform Colour Vision Test flow correctly', async () => {
    console.log('Starting Colour Vision Test...');

    // Step 1: Click on Colour Vision Test
    const colorVisionBtn = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(1)');
    await colorVisionBtn.click();
    console.log('Clicked Colour Vision Test button');

    // Step 2: Check acknowledgment
    const checkBox = await $('id=com.eyecarex.mobile.dev:id/rb_acknowledgment');
    await checkBox.click();
    console.log('Checked acknowledgment');

    // Step 3: Click first "Proceed to test"
    const proceedBtn1 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(14)');
    await proceedBtn1.click();
    console.log('Clicked first Proceed button');

    // Step 4: Click second "Proceed to test"
    const proceedBtn2 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(19)');
    await proceedBtn2.click();
    console.log('Clicked second Proceed button');

    // Step 5: Allow permissions (twice)
    const allowBtn1 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(7)');
    await allowBtn1.click();
    console.log('First Allow clicked');

    await shortPause(1000);
    const allowBtn2 = await $('android=new UiSelector().className("android.view.ViewGroup").instance(7)');
    await allowBtn2.click();
    console.log('Second Allow clicked');

    // Step 6: Final proceed on sensor screen
    const finalProceed = await $('android=new UiSelector().className("android.view.ViewGroup").instance(6)');
    await finalProceed.click();
    console.log('Final Proceed clicked — test reached stuck point.');

    console.log('Colour Vision Test completed successfully (until stuck point).');
  });

});
