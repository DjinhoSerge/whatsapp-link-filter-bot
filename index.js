const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true }); // Affiche le QR Code dans la console
});

client.on('ready', () => {
  console.log('🤖 Bot WhatsApp prêt !');
});

client.on('message', async (msg) => {
  if (msg.isGroupMsg) {
    const chat = await msg.getChat();
    const containsLink = /(http|https|www\.|\.com|\.org|\.net)/i.test(msg.body);

    if (containsLink) {
      console.log(`🔗 Lien détecté dans le groupe "${chat.name}"`);
      await msg.delete(true); // Supprime le message
      await msg.reply("⚠️ Les liens ne sont pas autorisés ici !");
    }
  }
});

client.initialize();