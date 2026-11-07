import { useId, useState, type FormEvent } from "react";
import { brand, whatsappHref } from "@domain/content/brand";
import {
  contactFormCopy,
  contactServiceOptions,
} from "@domain/content/faq";
import { Button } from "@presentation/components/ui/Button";
import { WhatsAppIcon } from "@presentation/components/ui/SocialIcons";

type FieldName = "name" | "email" | "message" | "consent";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Escribe tu nombre.";
  if (!EMAIL_RE.test(v.email.trim()))
    errors.email = "Revisa el correo (ej. tu@empresa.com).";
  if (v.message.trim().length < 10)
    errors.message = "Cuéntanos un poco más (mín. 10 caracteres).";
  if (!v.consent)
    errors.consent = "Necesitamos tu autorización para responderte.";
  return errors;
}

export function ContactLeadForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const errors = validate({ name, email, message, consent });
  const hasErrors = Object.keys(errors).length > 0;
  const show = (f: FieldName) => Boolean((submitted || touched[f]) && errors[f]);
  const blur = (f: FieldName) => () =>
    setTouched((t) => ({ ...t, [f]: true }));
  const errId = (f: FieldName) => `${uid}-${f}-error`;
  const a11y = (f: FieldName) => ({
    "aria-invalid": show(f) ? true : undefined,
    "aria-describedby": show(f) ? errId(f) : undefined,
  });

  const errorText = (f: FieldName) =>
    show(f) ? (
      <span id={errId(f)} className="contact-form__error">
        {errors[f]}
      </span>
    ) : null;

  const composeText = () => {
    const serviceLabel = service
      ? (contactServiceOptions.find((o) => o.value === service)?.label ??
        service)
      : "";
    return [
      `Nombre: ${name}`,
      `Email: ${email}`,
      company ? `Empresa: ${company}` : null,
      serviceLabel ? `Interés: ${serviceLabel}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");
  };

  const focusFirstInvalid = (form: HTMLFormElement | null) => {
    requestAnimationFrame(() => {
      form
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (hasErrors) {
      focusFirstInvalid(event.currentTarget);
      return;
    }
    const subject = encodeURIComponent("Consulta desde jacode.com");
    const body = encodeURIComponent(composeText());
    window.location.href = `mailto:${brand.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  const sendWhatsApp = (form: HTMLFormElement | null) => {
    setSubmitted(true);
    if (hasErrors) {
      focusFirstInvalid(form);
      return;
    }
    window.open(
      whatsappHref(`Hola JACODE, quiero hablar de un proyecto.\n\n${composeText()}`),
      "_blank",
      "noopener,noreferrer"
    );
    setStatus("sent");
  };

  return (
    <div className="contact-form">
      <h3 className="contact-form__title">{contactFormCopy.title}</h3>
      <p className="contact-form__hint">
        Te respondemos en menos de 24 h hábiles. Sin compromiso.
      </p>

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
            onBlur={blur("name")}
            placeholder="Tu nombre"
            {...a11y("name")}
          />
          {errorText("name")}
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">Correo electrónico</span>
          <input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={blur("email")}
            placeholder="tu@empresa.com"
            {...a11y("email")}
          />
          {errorText("email")}
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
          <span className="contact-form__label">Servicio (opcional)</span>
          <select
            name="service"
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
          <span className="contact-form__label">¿Qué necesitas?</span>
          <textarea
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={blur("message")}
            placeholder="Ej.: una web para mi negocio con reservas en línea."
            {...a11y("message")}
          />
          {errorText("message")}
        </label>

        <div className="contact-form__field--wide">
          <label className="contact-form__consent">
            <input
              type="checkbox"
              name="data-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              onBlur={blur("consent")}
              required
              {...a11y("consent")}
            />
            <span>{contactFormCopy.consentLabel}</span>
          </label>
          {errorText("consent")}
        </div>

        <div className="contact-form__submit">
          <Button
            type="submit"
            variant="primary"
            size="md"
            showArrow
            className="contact-form__btn"
          >
            {contactFormCopy.submitLabel}
          </Button>
          <button
            type="button"
            className="contact-form__wa"
            onClick={(e) => sendWhatsApp(e.currentTarget.form)}
          >
            <WhatsAppIcon title="" />
            Enviar por WhatsApp
          </button>
        </div>

        <p className="contact-form__status" role="status" aria-live="polite">
          {status === "sent" ? (
            <>
              ¡Listo! Se abrió tu app para enviar el mensaje. Si no aparece,
              escríbenos a{" "}
              <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>.
            </>
          ) : submitted && hasErrors ? (
            "Revisa los campos marcados para continuar."
          ) : null}
        </p>
      </form>
    </div>
  );
}
