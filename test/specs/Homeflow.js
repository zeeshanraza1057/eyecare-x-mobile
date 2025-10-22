const { loginAsPatient } = require('../../helpers/loginAsPatient');
const { cleanupAfterEach } = require('../../helpers/loginAsPatient');


describe('EyeCareX - Home Screen Navigation', function () {
  this.timeout(180000); // 3 minutes
  before(async () => {
    await loginAsPatient();
  });

  afterEach(async () => {
    await cleanupAfterEach();
  });

  // Check Clinic Details Flow
  it('should open and close clinic details from home screen', async function () {
    console.log('Test case running...');

    const trailingBtn = await $('id=com.eyecarex.mobile.dev:id/iv_trailing');
    await trailingBtn.waitForDisplayed({ timeout: 20000 });
    await trailingBtn.click();

    await $('android=new UiSelector().text("(0/3 task(s) completed)")').waitForDisplayed({ timeout: 10000 });
    await $('android=new UiSelector().text("(0/3 task(s) completed)")').click();

  });

  // Check Doctor Details Flow
  it('should open and close doctor details from home screen', async function () {
    const trailingBtn = await $('id=com.eyecarex.mobile.dev:id/iv_trailing');
    await trailingBtn.waitForDisplayed({ timeout: 20000 });
    await trailingBtn.click();
    const doctorDetailsBtn = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/iv_trailing").instance(1)');
    await doctorDetailsBtn.click();
    await $('id=com.eyecarex.mobile.dev:id/iv_close').waitForDisplayed({ timeout: 10000 });
    await $('id=com.eyecarex.mobile.dev:id/iv_close').click();
  });

  // Notifications Flow
  it('should open and close notifications', async () => {
  console.log('Opening notifications...');
  await $('id=com.eyecarex.mobile.dev:id/btn_notify').click(); // Click notification icon
  await driver.pause(2000);
  await $('id=com.eyecarex.mobile.dev:id/iv_close').click(); // Close notification popup
  console.log('Notification popup closed.');

  });

  // Tasks Flow
  it('should open tasks, check pending and completed, then review task details', async () => {
    const tasksArrow = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/iv_arrow").instance(0)');
    await tasksArrow.click();
    
    await $('id=com.eyecarex.mobile.dev:id/tv_completed').waitForDisplayed({ timeout: 10000 });
    await $('id=com.eyecarex.mobile.dev:id/tv_pending').waitForDisplayed({ timeout: 10000 });

    // Click into first task
    await $('id=com.eyecarex.mobile.dev:id/iv_trailing').click();

    // Verify task screen and go back
    await $('id=com.eyecarex.mobile.dev:id/backButton').waitForDisplayed({ timeout: 10000 });
    await $('id=com.eyecarex.mobile.dev:id/backButton').click();
  });

  // Appointment Management Flow
  it('should open appointment management, check upcoming and past, then view appointment details', async () => {
    const apptArrow = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/iv_arrow").instance(1)');
    await apptArrow.click();

    await $('id=com.eyecarex.mobile.dev:id/tv_past').waitForDisplayed({ timeout: 10000 });
    await $('id=com.eyecarex.mobile.dev:id/tv_upcoming').waitForDisplayed({ timeout: 10000 });

    // Click into a specific appointment
    await $('id=com.eyecarex.mobile.dev:id/iv_trailing').click();

    // Clinic details inside appointment
    await $('android=new UiSelector().text("(0/3 task(s) completed)")').waitForDisplayed({ timeout: 10000 });
    await $('android=new UiSelector().text("(0/3 task(s) completed)")').click();
    // await $('id=com.eyecarex.mobile.dev:id/iv_close').click();
    await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/backButton")').click();
   

    await $('id=com.eyecarex.mobile.dev:id/iv_trailing').click();

    // Doctor details inside appointment
    const doctorInsideAppt = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/iv_trailing").instance(1)');
    await doctorInsideAppt.click();
    await $('id=com.eyecarex.mobile.dev:id/iv_close').click();
  });
});

