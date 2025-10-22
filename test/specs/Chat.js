describe('Pre-Exam Interactive Questionnaire Flow', () => {

  // Helper function — generate a random answer
  function getRandomAnswer(questionText) {
    const text = questionText.toLowerCase();

    if (text.includes('symptom')) {
      // Randomly choose from 1–7 or 'none'
      return ['1', '2', '3', '4', '5', '6', '7', 'none'][Math.floor(Math.random() * 8)];
    } else if (text.includes('glasses')) {
      return Math.random() > 0.5 ? 'Yes' : 'No';
    } else if (text.includes('age')) {
      return (Math.floor(Math.random() * 40) + 18).toString(); // Random age between 18–58
    } else {
      return ['Yes', 'No', 'Skip', '1', '2', '3' ][Math.floor(Math.random() * 6)];
    }
  }

  it('should navigate to Pre-Exam and answer all chatbot questions until end', async () => {
    const trailingBtn = await $('id=com.eyecarex.mobile.dev:id/iv_trailing');
    await trailingBtn.waitForDisplayed({ timeout: 20000 });
    await trailingBtn.click();

    await $('android=new UiSelector().text("(0/3 task(s) completed)")').waitForDisplayed({ timeout: 10000 });
    await $('android=new UiSelector().text("(0/3 task(s) completed)")').click();
    console.log('Starting Pre-Exam Questionnaire Automation...');

    // ============================
    // STEP 1 — Open Pre-Exam Section
    // ============================
    console.log('Clicking on Pre-Exam Interactive Questionnaire...');
    const preExamButton = await $('android=new UiSelector().resourceId("com.eyecarex.mobile.dev:id/ly_module").instance(2)');
    await preExamButton.click();

    // ============================
    // STEP 2 — Click Start Button
    // ============================
    console.log('Clicking on Start button...');
    const startButton = await $('android=new UiSelector().className("android.view.ViewGroup").instance(7)');
    await startButton.waitForDisplayed({ timeout: 10000 });
    await startButton.click();

    console.log('Landed inside the chatbot questionnaire screen');

    // ============================
    // STEP 3 — Answer All Chatbot Questions
    // ============================
    let questionCount = 0;

    while (true) {
      try {
        console.log(`Waiting for next question... (answered so far: ${questionCount})`);

        // Find the latest question that contains '?'
        const questionElement = await $('android=new UiSelector().textContains("?")');
        console.log('questionElement located, waiting for it to be displayed...');
        await questionElement.waitForDisplayed({timeout: 10000});
        const questionText = await questionElement.getText();
        console.log(`Question ${++questionCount}: ${questionText}`);

        // Generate random answer
        console.log('Generating answer for the question...');
        const answer = getRandomAnswer(questionText);
        console.log(`Answer generated: ${answer}`);

        // Type into the input field
        console.log('Locating input field to type the answer...');
        const inputBox = await $('id=com.eyecarex.mobile.dev:id/input_field');
        await inputBox.setValue(answer);
        console.log('Answer typed into input field');

        // Tap on the send/submit button
        console.log('Locating and clicking the send/submit button...');
        const sendButton = await $('id=com.eyecarex.mobile.dev:id/btn_submit_answer');
        await sendButton.click();
        console.log('Send button clicked');

        // Wait before next question appears
        console.log('Pausing for 3 seconds to wait for the next question...');
        await driver.pause(3000);
        console.log('Resuming loop to look for the next question...');

      } catch (error) {
        // If question not found or chat ended, break the loop
        console.log('Questionnaire completed or error encountered — exiting loop.', error && error.message ? error.message : error);
        break;
      }
    }

    console.log('Pre-Exam Questionnaire automation finished successfully!');
  });

});
