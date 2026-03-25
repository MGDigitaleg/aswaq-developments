import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, requestType, unitType, preferredMall, notes } =
      await req.json();

    const apiKey = Deno.env.get("PINGRAM_API_KEY");
    if (!apiKey) {
      throw new Error("PINGRAM_API_KEY not configured");
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Request Type</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${requestType}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Unit Type</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${unitType}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Preferred Mall</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${preferredMall}</td></tr>
          ${notes ? `<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Notes</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${notes}</td></tr>` : ""}
        </table>
      </div>
    `;

    const response = await fetch("https://api.pingram.io/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        type: "aswaaq",
        to: {
          id: email,
          email: "admin@mg.digital",
        },
        email: {
          subject: `New Inquiry from ${name} - ${requestType}`,
          html: htmlContent,
        },
      }),
    });

    const result = await response.text();

    if (!response.ok) {
      console.error("Pingram API error:", result);
      throw new Error(`Pingram API returned ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
