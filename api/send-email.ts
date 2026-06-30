export default async function handler(req: any, res: any) {
  // Add CORS headers for local development if needed, but Vercel handles it normally
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { to, subject, html } = req.body;
    
    // The user will set RESEND_API_KEY in Vercel settings later
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Mock mode when no API key is provided
      console.log('--- MOCK EMAIL SENT ---');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Body:', html);
      console.log('-----------------------');
      return res.status(200).json({ 
        success: true, 
        message: 'Mock email sent successfully (Add RESEND_API_KEY to Vercel to send real emails)' 
      });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Nook Burgers Orders <orders@resend.dev>', // resend.dev is allowed for testing, they will update this to their verified domain later
        to: [to],
        subject: subject,
        html: html
      })
    });

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, error: data });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
