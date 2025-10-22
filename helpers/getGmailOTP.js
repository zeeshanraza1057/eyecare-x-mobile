const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

async function getGmailOTP(type = "login") {
  const subjectKeyword =
    type === "reset"
      ? "Reset Your EyeCareX Password"
      : "Your EyeCareX Access Code";

  console.log(`Waiting for OTP email (subject containing "${subjectKeyword}")...`);

  const config = {
    imap: {
      user: process.env.user,
      password: process.env.pass,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 20000,
    },
  };
  console.log('Step 1: Starting getGmailOTP()');
  const connection = await imaps.connect(config);
  console.log('Step 2: IMAP connection established');
  await connection.openBox('INBOX');
  console.log('Step 3: Inbox opened successfully');

  const sinceDate = new Date(Date.now() - 10 * 60 * 1000); // last 10 mins
  const since = `${sinceDate.getDate()}-${sinceDate.toLocaleString('en-US', {
    month: 'short',
  })}-${sinceDate.getFullYear()}`;

  const searchCriteria = [
    ['SINCE', since], // don't filter UNSEEN yet
  ];

  const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };

  // Retry up to 6 times (waiting 10 sec each)
  for (let attempt = 1; attempt <= 1; attempt++) {
    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length) {
      const sorted = messages.sort(
        (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)
      );

    for (const msg of sorted) {
      const headerPart = msg.parts.find(p => p.which === 'HEADER');
      const textPart = msg.parts.find(p => p.which === 'TEXT');

      // Extract subject from header
      const subj = headerPart?.body?.subject?.[0] || '';
      console.log('Checking email with subject:', subj);

      // Parse text content
      const parsed = await simpleParser(textPart.body);
      const bodyText = parsed.text || '';

      if (subj.toLowerCase().includes(subjectKeyword.toLowerCase())) {
        console.log(`Found matching email: "${subj}"`);
        const otpMatch = bodyText.match(/\b\d{4,6}\b/);
        if (otpMatch) {
          await connection.end();
          console.log(`OTP found: ${otpMatch[0]}`);
          return otpMatch[0];
      }
    }
}
    }

    console.log(`Attempt ${attempt}: No OTP yet, retrying in 10s...`);
    await new Promise(r => setTimeout(r, 10000));
  }

  await connection.end();
  throw new Error(`No OTP email found after retries for subject containing "${subjectKeyword}".`);
}

module.exports = { getGmailOTP };

