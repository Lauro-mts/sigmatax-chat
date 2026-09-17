import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbz3jiR6VhNnoDolrriDBWTugP_BRlisHT-ymHc7s4WaIa09jr2q-GgCt7B-dc6o2q7d2g/exec';

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
