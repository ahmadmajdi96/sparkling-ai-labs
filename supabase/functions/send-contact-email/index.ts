import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Send email using Resend HTTP API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CortaNex AI Contact <onboarding@resend.dev>",
        to: ["a.salameh@cortanexai.com"],
        reply_to: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1a; color: #ffffff; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00d4ff; margin: 0;">CortaNex AI</h1>
              <p style="color: #888; margin: 5px 0;">New Contact Form Submission</p>
            </div>
            
            <div style="background: #111827; padding: 20px; border-radius: 8px; border-left: 4px solid #00d4ff;">
              <h2 style="color: #00d4ff; margin-top: 0; font-size: 18px;">Contact Details</h2>
              
              <p style="margin: 10px 0;"><strong style="color: #00d4ff;">Name:</strong> <span style="color: #e5e7eb;">${name}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #00d4ff;">Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
              ${company ? `<p style="margin: 10px 0;"><strong style="color: #00d4ff;">Company:</strong> <span style="color: #e5e7eb;">${company}</span></p>` : ''}
            </div>
            
            <div style="background: #111827; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #3b82f6;">
              <h2 style="color: #3b82f6; margin-top: 0; font-size: 18px;">Message</h2>
              <p style="color: #e5e7eb; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                This message was sent from the CortaNex AI website contact form.
              </p>
              <p style="color: #666; font-size: 12px; margin: 5px 0;">
                Reply directly to this email to respond to ${name}.
              </p>
            </div>
          </div>
        `,
      }),
    });

    const responseData = await emailResponse.json();
    console.log("Resend API response:", responseData);

    if (!emailResponse.ok) {
      throw new Error(responseData.message || "Failed to send email");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been sent successfully! We will get back to you soon.",
        id: responseData.id 
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);