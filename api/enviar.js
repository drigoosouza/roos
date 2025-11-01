import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const Cors = cors({
  origin: "https://roos-main-dusvbhd1h-drigoosouzas-projects.vercel.app", // só permite seu front
  methods: ["POST", "OPTIONS"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {

    await runMiddleware(req, res, Cors);
  // 🔓 Configurações de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Primeiro: responder a requisições OPTIONS (pré-voo do CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 🚫 Bloquear métodos diferentes de POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  const { name, lastname, email, content, message } = req.body ?? {};

  // 🧭 Validação básica
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Campos 'nome', 'email' e 'mensagem' são obrigatórios.",
    });
  }

  // 📬 Configurar transporte do Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // ✉️ Montar o e-mail
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `Contato do site: assunto ${content || "sem assunto"}`,
    text: `Nome: ${name}\nSobrenome: ${lastname}\nEmail: ${email}\n\nMensagem:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return res.status(500).json({ error: "Erro interno ao enviar e-mail." });
  }
}
