import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cidade,
      eventType,
      eventDate,
      location,
      audience,
      services,
      width,
      height,
      details,
      name,
      company,
      email,
      phone,
      acceptWhatsApp,
    } = body;

    if (!name || !email || !phone || !cidade) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ ok: true });
    }

    const servicesList = Array.isArray(services) ? services.join(", ") : services ?? "—";
    const panelInfo =
      services?.includes("paineis-led") && width && height
        ? `${width}m × ${height}m (${(parseFloat(width) * parseFloat(height)).toFixed(1)} m²)`
        : "—";

    const htmlBody = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /><title>Novo Orçamento</title></head>
<body style="font-family: system-ui, sans-serif; background: #0A0A0A; color: #F5F5F7; padding: 32px; margin: 0;">
  <table width="600" style="margin: 0 auto; background: #141414; border: 1px solid #2C2C2E; border-radius: 16px; overflow: hidden;">
    <tr>
      <td style="background: #FF0000; padding: 24px 32px;">
        <h1 style="margin: 0; color: white; font-size: 20px; font-weight: 700;">Novo Orçamento — Select LED ${cidade.charAt(0).toUpperCase() + cidade.slice(1)}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <h2 style="color: #FF0000; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px;">Dados do contato</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px; width: 140px;">Nome</td><td style="color: #F5F5F7; font-size: 14px;">${name}</td></tr>
          ${company ? `<tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Empresa</td><td style="color: #F5F5F7; font-size: 14px;">${company}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">E-mail</td><td style="color: #F5F5F7; font-size: 14px;"><a href="mailto:${email}" style="color: #FF0000;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Telefone</td><td style="color: #F5F5F7; font-size: 14px;"><a href="https://wa.me/55${phone.replace(/\D/g, '')}" style="color: #25D366;">${phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">WhatsApp</td><td style="color: #F5F5F7; font-size: 14px;">${acceptWhatsApp ? "Sim" : "Não"}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #2C2C2E; margin: 24px 0;" />

        <h2 style="color: #FF0000; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px;">Dados do evento</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px; width: 140px;">Cidade</td><td style="color: #F5F5F7; font-size: 14px;">${cidade}</td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Tipo</td><td style="color: #F5F5F7; font-size: 14px;">${eventType ?? "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Data</td><td style="color: #F5F5F7; font-size: 14px;">${eventDate ?? "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Ambiente</td><td style="color: #F5F5F7; font-size: 14px;">${location ?? "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Público</td><td style="color: #F5F5F7; font-size: 14px;">${audience ?? "—"} pessoas</td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Serviços</td><td style="color: #F5F5F7; font-size: 14px;">${servicesList}</td></tr>
          <tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px;">Painel</td><td style="color: #F5F5F7; font-size: 14px;">${panelInfo}</td></tr>
          ${details ? `<tr><td style="padding: 8px 0; color: #6E6E73; font-size: 14px; vertical-align: top;">Detalhes</td><td style="color: #F5F5F7; font-size: 14px;">${details}</td></tr>` : ""}
        </table>
      </td>
    </tr>
    <tr>
      <td style="background: #0D0D0D; padding: 16px 32px; text-align: center;">
        <p style="color: #6E6E73; font-size: 12px; margin: 0;">Select LED · selectled.com.br · CNPJ 35.554.822/0001-07</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "orcamento@selectled.com.br",
        to: ["contato@selectled.com.br"],
        reply_to: email,
        subject: `Orçamento: ${name} — ${eventType ?? "Evento"} em ${cidade}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
    }

    // Auto-reply to client
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "orcamento@selectled.com.br",
        to: [email],
        subject: "Recebemos seu orçamento! — Select LED",
        html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /></head>
<body style="font-family: system-ui, sans-serif; background: #0A0A0A; color: #F5F5F7; padding: 32px; margin: 0;">
  <table width="560" style="margin: 0 auto; background: #141414; border: 1px solid #2C2C2E; border-radius: 16px; overflow: hidden;">
    <tr>
      <td style="background: #FF0000; padding: 24px 32px;">
        <h1 style="margin: 0; color: white; font-size: 20px; font-weight: 700;">Orçamento recebido!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="color: #A1A1A6; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
          Olá, <strong style="color: white;">${name}</strong>! Recebemos sua solicitação e retornaremos em até <strong style="color: #FF0000;">2 horas úteis</strong> com uma proposta personalizada.
        </p>
        <p style="color: #A1A1A6; font-size: 14px; margin: 0 0 8px;">Quer resposta mais rápida? Fale direto via WhatsApp:</p>
        <a href="https://wa.me/5511971945576" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">Abrir WhatsApp</a>
      </td>
    </tr>
    <tr>
      <td style="background: #0D0D0D; padding: 16px 32px; text-align: center;">
        <p style="color: #6E6E73; font-size: 12px; margin: 0;">Select LED · selectled.com.br</p>
      </td>
    </tr>
  </table>
</body>
</html>`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("orcamento route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
