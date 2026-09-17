import { NextRequest, NextResponse } from 'next/server';

const SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbz3jiR6VhNnoDolrriDBWTugP_BRlisHT-ymHc7s4WaIa09jr2q-GgCt7B-dc6o2q7d2g/exec';

const CRM_WEBHOOK_URL = 'https://apicrm.lexa-ia.com.br/webhooks/automation/5287b462-eb7d-41bf-8224-131bc101a8a2';

function toE164BR(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('55') ? digits : `55${digits}`;
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const send = (url: string, body: unknown) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

    const requests = [send(SHEETS_WEBHOOK_URL, payload)];

    if (payload.qualificado) {
      const crmPayload = { ...payload, whatsapp: toE164BR(payload.whatsapp ?? '') };
      requests.push(send(CRM_WEBHOOK_URL, crmPayload));
    }

    await Promise.all(requests);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
