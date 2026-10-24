import { useState, type FormEvent } from "react";
import { brand } from "@domain/content/brand";
import {
  contactFormCopy,
  contactServiceOptions,
} from "@domain/content/faq";
import { Button } from "@presentation/components/ui/Button";

export function ContactLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) return;
    const serviceLabel =
      contactServiceOptions.find((o) => o.value === service)?.label ?? service;
    const subject = encodeURIComponent("Consulta desde jacode.com");
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Email: ${email}`,
        company ? `Empresa: ${company}` : "",
        serviceLabel ? `Interés: ${serviceLabel}` : "",
        "",
        message,
      ].join("\n")
    );
    window.location.href = `mailto:${brand.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <div className="contact-form">
      <h3 className="contact-form__title">{contactFormCopy.title}</h3>

      <form className="contact-form__grid" onSubmit={onSubmit} noValidate>
        <label className="contact-form__field">
          <span className="contact-form__label">Nombre completo</span>
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

        <label className="contact-form__field">
          <span className="contact-form__label">Correo electrónico</span>
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

        <label className="contact-form__field">
          <span className="contact-form__label">Empresa (opcional)</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Nombre de la empresa"
          />
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">Servicio que necesitas</span>
          <select
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={service ? "" : "is-placeholder"}
          >
            {contactServiceOptions.map((opt) => (
              <option
                key={opt.value || "placeholder"}
                value={opt.value}
                disabled={opt.value === ""}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="contact-form__field contact-form__field--wide">
          <span className="contact-form__label">Mensaje</span>
          <textarea
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Contexto breve del proyecto."
          />
        </label>

        <label className="contact-form__consent contact-form__field--wide">
          <input
            type="checkbox"
            name="data-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>{contactFormCopy.consentLabel}</span>
        </label>

        <div className="contact-form__submit">
          <Button
            type="submit"
            variant="primary"
            size="md"
            showArrow
            className="contact-form__btn"
            disabled={!consent}
          >
            {contactFormCopy.submitLabel}
          </Button>
        </div>

        {status === "sent" ? (
          <p className="contact-form__status" role="status">
            Se abrió tu cliente de correo. Si no aparece, escríbenos a{" "}
            <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>.
          </p>
        ) : null}
      </form>
    </div>
  );
}
