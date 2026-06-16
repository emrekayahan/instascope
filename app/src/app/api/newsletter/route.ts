import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçersiz e-posta adresi.' },
        { status: 400 }
      );
    }

    console.log(`[Newsletter Sign-up] New subscriber: ${email}`);

    // In a production BaaS, we would save to Firestore or send to Brevo/Mailchimp.
    // For now, we will append it to a local logs file inside the workspace for persistency
    // and demonstrate full compliance with client requirements.
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }
      const filePath = path.join(dataDir, 'subscribers.txt');
      fs.appendFileSync(filePath, `${new Date().toISOString()} - ${email}\n`);
    } catch (err) {
      console.error('Failed to write to subscribers file:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Sunucu tarafında bir hata oluştu.' },
      { status: 500 }
    );
  }
}
