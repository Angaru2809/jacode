import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { brand } from "@domain/content/brand";
import { Button } from "@presentation/components/ui/Button";

function buildWhatsAppUrl(name: string, email: string, company: string, message: string) {
  const lines = [
    "Hola JACODE, quiero iniciar una conversación sobre un proyecto.",
    name ? `Nombre: ${name}` : "",
    email ? `Email: ${email}` : "",
    company ? `Empresa: ${company}` : "",
    message ? `Mensaje: ${message}` : "",
  ].filter(Boolean);
  return `https://wa.me/${brand.whatsappPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function ContactLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Consulta desde jacode.com");
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Email: ${email}`,
        company ? `Empresa: ${company}` : "",
        "",
        message,
      ].join("\n")
    );
    window.location.href = `mailto:${brand.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <div className="faq-form">
      <p className="faq-form__kicker">Cuéntanos tu idea</p>
      <h3 className="faq-form__title">¿Qué quieres crear?</h3>
      <p className="faq-form__lead">
        Déjanos los datos y te respondemos con alcance inicial, próximos pasos y tiempos
        orientativos.
      </p>

      <form className="faq-form__fields" onSubmit={onSubmit} noValidate>
        <label className="faq-form__field">
          <span>Nombre</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </label>

        <label className="faq-form__field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@empresa.com"
          />
        </label>

        <label className="faq-form__field">
          <span>Empresa (opcional)</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Nombre de la empresa"
          />
        </label>

        <label className="faq-form__field faq-form__field--area">
          <span>Mensaje</span>
          <textarea
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe el reto, objetivos o contexto del proyecto."
          />
        </label>

        <div className="faq-form__actions">
          <Button type="submit" variant="primary" size="md" showArrow>
            Enviar consulta
          </Button>
          <a
            className="faq-form__whatsapp"
            href={buildWhatsAppUrl(name, email, company, message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>

        {status === "sent" ? (
          <p className="faq-form__status" role="status">
            Se abrió tu cliente de correo. Si no aparece, escríbenos a{" "}
            <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>.
          </p>
        ) : null}
      </form>

      <p className="faq-form__footnote">
        También puedes usar la{" "}
        <Link to="/cotizacion">plantilla de cotización</Link>.
      </p>
    </div>
  );
}
