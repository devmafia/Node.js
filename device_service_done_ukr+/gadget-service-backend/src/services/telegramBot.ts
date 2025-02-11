import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '7351088520:AAEKKXD1X1QpTbkoUWX0AKVaCYvuwnsfxiQ';

const TELEGRAM_USERNAME = 'tiger_gene';

const getChatIdByUsername = async (username: string): Promise<number | null> => {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const messages = response.data.result;

    for (const message of messages) {
      if (message.message.from.username === username) {
        return message.message.from.id;
      }
    }

    return null; // Якщо ID чату не знайдено
  } catch (err) {
    console.error('Error fetching chat ID:', err);
    return null;
  }
};

export const sendCallRequestToTelegram = async (name: string, phone: string) => {
  try {
    const chatId = await getChatIdByUsername(TELEGRAM_USERNAME);
    
    if (!chatId) {
      console.error('Chat ID not found. Please make sure the user has interacted with the bot.');
      return;
    }

    const message = `New Call Request:\nName: ${name}\nPhone: ${phone}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

    console.log('Message sent to Telegram.');
  } catch (err) {
    console.error('Error sending message to Telegram:', err);
  }
};
