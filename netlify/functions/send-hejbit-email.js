// netlify/functions/send-email.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { name, company, email } = JSON.parse(event.body);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // This is bad but it works for now. TODO: Get the API key from the environment variables using backend
            'api-key': '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',
        },
        body: JSON.stringify({
            sender: { name: "Hejbit", email: "tech@metaprovide.org" },
            to: [{ email: email, name: name }],
            subject: "Thank you for contacting us!",
            htmlContent: `<h1>Hello ${name}</h1><p>Thank you for reaching out. We will get back to you shortly.</p><p>Company: ${company}</p>`,
            params: {
                company: company,
                name: name,
            },
        }),
    });

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully', data }),
    };
};
