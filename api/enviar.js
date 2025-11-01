import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  try {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }
    const { name, lastname, email, content, message } = req.body ?? {};

    // validação simples
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Campos 'nome', 'email' e 'menssagem' são obrigatórios." });
    }

    // cria o transportador do Nodemailer usando as variáveis da Vercel
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // configurar na Vercel
        pass: process.env.EMAIL_PASS  // configurar na Vercel (senha de app)
      }
    });

    // monta o e-mail
    const mailOptions = {
      from: `"${name}" <${email}>`,         // remetente aparece como a pessoa que preencheu
      to: process.env.EMAIL_USER,           // seu e-mail (quem recebe)
      subject: `Contato do site: assunto ${content}`,
      text: `Nome: ${name}\nSobrenome: ${lastname}\nEmail: ${email}\n\nMensagem:\n${message}`
    };

    // envia o e-mail (await para garantir que terminou)
    await transporter.sendMail(mailOptions);

    // responde com sucesso
    return res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (err) {
    // loga o erro no console (Vercel mostra esses logs no painel)
    console.error("Erro ao enviar e-mail:", err);
    return res.status(500).json({ error: "Erro interno ao enviar e-mail." });
  }
}