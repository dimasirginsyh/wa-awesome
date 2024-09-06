const { Client, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();

client.on("ready", () => console.log("Client is ready!"));

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));

client.on("message", async (msg) => {
    if (msg.rawData?.isViewOnce) {
        const media = await msg.downloadMedia();
        if (media?.mimetype.startsWith("image/")) {
            const mediaToSend = new MessageMedia(media.mimetype, media.data);
            await client.sendMessage(msg.from, mediaToSend, { caption: msg.body });
        }
    }
});

client.initialize();
