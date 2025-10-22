const imaps = require('imap-simple');

(async () => {
  const config = {
    imap: {
      user: 'designartist1418@gmail.com',
      password: 'dzqf gppy iykw ljng',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 20000,
    },
  };

  try {
    console.log('Connecting...');
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');
    console.log('✅ Connected successfully!');
    await connection.end();
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();
