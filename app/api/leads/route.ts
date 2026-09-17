import { NextRequest, NextResponse } from 'next/server';

// TODO: substituir pela URL gerada ao publicar o Apps Script como Web App
// (Extensões > Apps Script > Implantar > Nova implantação > App da Web).
const WEBHOOK_URL = 'https://script.google.com/macros/s/PLACEHOLDER/exec';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
