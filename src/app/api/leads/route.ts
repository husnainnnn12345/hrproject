import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/config/company";

export const runtime = "nodejs";

type LeadPayload = {
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  audience?: string;
  service?: string;
  basis?: string;
  message?: string;
  count?: number;
  city?: string;
  locale?: string;
};

export async function POST(request: Request) {
  let body: LeadPayload = {};
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.phone && !body.message && !body.service) {
    return NextResponse.json(
      { ok: false, error: "Missing lead fields" },
      { status: 400 }
    );
  }

  const summary = [
    `New lead — ${company.name}`,
    `Source: ${body.source ?? "unknown"}`,
    `Name: ${body.name ?? "—"}`,
    `Phone: ${body.phone ?? "—"}`,
    `Email: ${body.email ?? "—"}`,
    `Audience: ${body.audience ?? "—"}`,
    `Service: ${body.service ?? "—"}`,
    `Basis: ${body.basis ?? "—"}`,
    `Count: ${body.count ?? "—"}`,
    `City: ${body.city ?? "—"}`,
    `Locale: ${body.locale ?? "—"}`,
    `Message: ${body.message ?? "—"}`,
  ].join("\n");

  // Graceful fallback when no API key: log to console for local/dev use
  console.info("\n========== LEAD CAPTURED ==========\n" + summary + "\n===================================\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL || company.contact.email;
  const from = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        subject: `[Lead] ${body.service ?? body.source ?? "New request"} — ${company.shortName}`,
        text: summary,
      });
      return NextResponse.json({ ok: true, emailed: true });
    } catch (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: true, emailed: false, logged: true });
    }
  }

  return NextResponse.json({ ok: true, emailed: false, logged: true });
}
