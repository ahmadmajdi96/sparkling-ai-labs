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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use AI to format the email content nicely
    const prompt = `Format this contact form submission as a professional email notification:

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Message: ${message}

Create a clear, well-formatted plain text email body that includes all the details above. Start directly with the content, no subject line.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a helpful assistant that formats contact form submissions into professional email notifications. Be concise and clear." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const formattedEmail = aiData.choices?.[0]?.message?.content || `
Contact Form Submission from CortaNex AI Website

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}
`;

    console.log("Contact form submission received:");
    console.log("From:", name, "<" + email + ">");
    if (company) console.log("Company:", company);
    console.log("Message:", message);
    console.log("---");
    console.log("Formatted notification:");
    console.log(formattedEmail);
    console.log("---");
    console.log("Notification should be sent to: a.salameh@cortanexai.com");

    // Note: To actually send emails, integrate with an email service.
    // For now, logging the submission as a record.

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been received. We will get back to you soon!",
        formattedEmail 
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
