import { NextRequest, NextResponse } from 'next/server'


const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
};

export async function POST(request: NextRequest) {
  const { firstName, lastName, phone, carModel, notes } = await request.json()

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return NextResponse.json({ error: 'Missing Telegram credentials' }, { status: 500 })
  }


  console.log("Chat ID type:", typeof chatId, "Value:", chatId);
  if (isNaN(Number(chatId))) {
    return NextResponse.json(
      { error: 'Invalid Telegram chat ID format. Must be numeric.' },
      { status: 500 }
    );
  }

  const message = [
    `🚗 *Новая заявка на мойку*`,
    `*Имя:* ${escapeMarkdown(firstName)} ${escapeMarkdown(lastName)}`,
    `*Телефон:* ${escapeMarkdown(phone)}`,
    carModel ? `*Модель авто:* ${escapeMarkdown(carModel)}` : '',
    notes ? `*Примечание:* ${escapeMarkdown(notes)}` : ''
  ].filter(Boolean).join('\n')

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          parse_mode: 'Markdown',
          text: message
        })
      }
    )

    const responseData = await telegramRes.json();

    if (!telegramRes.ok) {
      console.error('Telegram API error:', responseData);
      return NextResponse.json(
        { error: `Telegram API error: ${responseData.description || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}