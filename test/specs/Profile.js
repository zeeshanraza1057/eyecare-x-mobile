const { loginAsPatient } = require('../../helpers/loginAsPatient');
const { goToProfileAfterEach } = require('../../helpers/loginAsPatient');

describe('👤 Profile Module Flow', () => {
beforeEach(async () => {
  console.log('Setting up for test...');

  // Ensure login/session is valid
  await loginAsPatient();

  // Go to Profile tab explicitly each time
  const profileTab = await $('id=com.eyecarex.mobile.dev:id/profileFragment');

  // Wait until visible
  await profileTab.waitForDisplayed({ timeout: 10000 });

  // Small pause to stabilize UI
  await driver.pause(500);

  // If profile not currently selected, click
  try {
    await profileTab.click();
  } catch (err) {
    console.log('Profile tab click failed, retrying...');
    await driver.pause(1500);
    await profileTab.click();
  }
});


    afterEach(async () => {
    await goToProfileAfterEach();

  });

  // ===========================
  //  ACCOUNT INFORMATION TEST
  // ===========================
  it('should open Account Information and edit details', async () => {
    console.log('Opening Account Information...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(0)').click();

    const editBtn = await $('id=com.eyecarex.mobile.dev:id/iv_edit');
    await editBtn.waitForDisplayed({ timeout: 5000 });
    await editBtn.click();

    console.log('Account Information edit page opened successfully');
  });

  // ===========================
  // INSURANCE INFORMATION TEST
  // ===========================
  it('should open Insurance Information and fill form', async () => {
  console.log('Opening Insurance Information...');
  await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(1)').click();

  await $('id=com.eyecarex.mobile.dev:id/btn').click();
  const providerOption = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("BPA")`);
  await providerOption.waitForDisplayed({ timeout: 5000 });
  await providerOption.click();
  console.log('Selected provider: Alberta Blue Cross');

  const policyField = await $('id=com.eyecarex.mobile.dev:id/et_policy_no');
  await policyField.setValue('POLICY12345');

  const memberField = await $('id=com.eyecarex.mobile.dev:id/et_member_id');
  await memberField.setValue('MEMBER6789');

  // Click the dropdown to open it
  const planDropdown = await $('id=com.eyecarex.mobile.dev:id/sp_insurance_plan_type');
  await planDropdown.click();

  // Now select the desired option from the list
  const option1 = await $(`android=new UiSelector().text("Extended Healthcare")`);
  await option1.click();


  console.log('Insurance plan dropdown opened');

  await $('id=com.eyecarex.mobile.dev:id/rb_policy_holder').click();
  console.log('Policy holder checkbox selected');

  await $('android=new UiSelector().className("android.view.ViewGroup").instance(8)').click();
  console.log('Saved insurance details successfully');
  });

  // =================
  //   SETTINGS TEST
  // =================
  it('should open Settings', async () => {
    console.log('Opening Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();
    console.log('Settings page opened');
  });

  // ==================
  //   CONTACT US TEST
  // ==================
  it('should open Contact Us page', async () => {
    console.log('Opening Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();
    console.log('Settings page opened');
    console.log('Opening Contact Us...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(0)').click();
    console.log('Landed on EyeCareX contact page');
  });

//   // =========================
//   //   UPDATE PASSWORD TEST
//   // =========================
  it('should update password successfully', async () => {
    console.log('Opening Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();
    console.log('Settings page opened');
    console.log('Opening Password Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();

    const currentPwd = await $('id=com.eyecarex.mobile.dev:id/et_current_password');
    await currentPwd.setValue('Shan@2025');

    const newPwd = await $('id=com.eyecarex.mobile.dev:id/et_new_password');
    await newPwd.setValue('Shan@2025');

    const confirmPwd = await $('id=com.eyecarex.mobile.dev:id/et_password');
    await confirmPwd.setValue('Shan@2025');

    await $('android=new UiSelector().className("android.view.ViewGroup").instance(4)').click();
    console.log('Password changed successfully');
  });

//   // ======================
//   //   PRIVACY POLICY TEST
//   // ======================
  it('should open Privacy Policy page', async () => {
    console.log('Opening Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();
    console.log('Settings page opened');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(3)').click();
    console.log('Privacy Policy opened successfully');
  });

//   // =================
//   //   ABOUT US TEST
//   // =================
  it('should open About Us page', async () => {
    console.log('Opening Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();
    console.log('Settings page opened');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(4)').click();
    console.log('About Us page opened successfully');
  });

//   // =================
//   // HELP CENTER TEST
//   // =================
  it('should open Help Center page', async () => {
    console.log('Opening Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();
    console.log('Settings page opened');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(5)').click();
    console.log('Help Center opened successfully');
  });

//   // =============
//   //   LEGAL TEST
//   // =============
  it('should open Legal page', async () => {
    console.log('Opening Settings...');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)').click();
    console.log('Settings page opened');
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(6)').click();
    console.log('Legal page opened successfully');
  });

});
