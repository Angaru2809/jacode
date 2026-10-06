import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "@domain/content/brand";
import { deliverables } from "@domain/content/process";
import "@app/styles/quote.css";

function formatDate(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")} / ${String(d.getMonth() + 1).padStart(2, "0")} / ${d.getFullYear()}`;
}

/** Editable quote template — Nielsen #1 status (editing mode), #5 prevention via clear actions */
export function QuotePage() {
  const [editing, setEditing] = useState(false);
  const now = new Date();
  const valid = new Date(now);
  valid.setDate(valid.getDate() + 30);

  useEffect(() => {
    document.title = "JACODE — Plantilla de Cotización";
    return () => {
      document.title = "JACODE — Ordenamos la complejidad. Creamos soluciones.";
    };
  }, []);

  return (
    <div className="quote-page">
      <div className="toolbar no-print">
        <Link to="/" className="back">
          ← Volver a JACODE
        </Link>
        <div className="toolbar-actions">
          <button
            type="button"
            className={`tool-btn${editing ? " primary" : ""}`}
            aria-pressed={editing}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? "Listo" : "Editar"}
          </button>
          <button
            type="button"
            className="tool-btn primary"
            onClick={() => {
              if (editing) setEditing(false);
              window.print();
            }}
          >
            Imprimir / PDF
          </button>
        </div>
      </div>

      {editing ? (
        <p className="edit-banner no-print" role="status">
          Modo edición activo — haz clic en el texto para modificarlo.
        </p>
      ) : null}

      <article
        className={`quote${editing ? " is-editing" : ""}`}
        contentEditable={editing}
        suppressContentEditableWarning
        aria-label="Cotización JACODE"
      >
        <header className="quote-header">
          <div className="quote-brand">
            <img src={brand.logoSrc} alt={brand.name} width={150} height={45} />
            <p>{brand.tagline}</p>
          </div>
          <div className="quote-meta">
            <span className="badge">Cotización</span>
            <p>
              <strong>N.º</strong> JAC-2026-001
            </p>
            <p>
              <strong>Fecha</strong> {formatDate(now)}
            </p>
            <p>
              <strong>Válida hasta</strong> {formatDate(valid)}
            </p>
          </div>
        </header>

        <section className="quote-parties">
          <div>
            <h2>De</h2>
            <p>
              <strong>{brand.name}</strong>
            </p>
            <p>Soluciones digitales · Software · IA</p>
            <p>{brand.contactEmail}</p>
          </div>
          <div>
            <h2>Para</h2>
            <p>
              <strong>Nombre del cliente</strong>
            </p>
            <p>Empresa / Organización</p>
            <p>correo@cliente.com</p>
          </div>
        </section>

        <section className="quote-intro">
          <h1>Propuesta de solución digital</h1>
          <p>
            JACODE transforma tu idea en una solución tecnológica funcional. Esta
            cotización detalla el alcance, entregables, modalidad de trabajo e
            inversión estimada para el proyecto.
          </p>
        </section>

        <section className="quote-block">
          <h2>
            <span>01</span> Entendimiento del problema
          </h2>
          <p>
            Describa aquí la necesidad, el contexto y el problema que se busca
            resolver. JACODE parte de entender la complejidad antes de proponer la
            arquitectura de la solución.
          </p>
        </section>

        <section className="quote-block">
          <h2>
            <span>02</span> Alcance propuesto
          </h2>
          <ul className="scope-list">
            <li>Descubrimiento y definición del problema</li>
            <li>Diseño de experiencia e interfaz</li>
            <li>Desarrollo de la solución</li>
            <li>Integraciones y APIs necesarias</li>
            <li>Pruebas, despliegue y documentación</li>
            <li>Capacitación y soporte inicial</li>
          </ul>
        </section>

        <section className="quote-block">
          <h2>
            <span>03</span> Entregables
          </h2>
          <div className="deliverables-grid">
            {deliverables.map((d) => (
              <span key={d.id}>{d.label}</span>
            ))}
          </div>
        </section>

        <section className="quote-block">
          <h2>
            <span>04</span> Modalidad
          </h2>
          <p>
            <strong>Proyecto</strong> — Alcance → Desarrollo → Pruebas → Entrega
          </p>
          <p className="muted">
            También disponibles: Evolutivo (MVP continuo) y Por fases.
          </p>
        </section>

        <section className="quote-block">
          <h2>
            <span>05</span> Inversión
          </h2>
          <table className="quote-table">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Detalle</th>
                <th className="num">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Descubrimiento y planeación</td>
                <td>Análisis, alcance y arquitectura</td>
                <td className="num">$ —</td>
              </tr>
              <tr>
                <td>Diseño UX/UI</td>
                <td>Experiencia, interfaz y prototipo</td>
                <td className="num">$ —</td>
              </tr>
              <tr>
                <td>Desarrollo</td>
                <td>Construcción de la solución</td>
                <td className="num">$ —</td>
              </tr>
              <tr>
                <td>Pruebas e implementación</td>
                <td>QA, despliegue y entrega</td>
                <td className="num">$ —</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <strong>Total estimado</strong>
                </td>
                <td className="num">
                  <strong>$ —</strong>
                </td>
              </tr>
            </tfoot>
          </table>
          <p className="muted">
            Valores en moneda local. Impuestos aplicables según normativa vigente.
          </p>
        </section>

        <section className="quote-block">
          <h2>
            <span>06</span> Tiempo estimado
          </h2>
          <p>
            <strong>X – Y semanas</strong>, sujeto a definición final de alcance y
            disponibilidad de información.
          </p>
        </section>

        <section className="quote-cta">
          <div className="cube-mark" aria-hidden="true" />
          <p className="cta-line">{brand.secondaryLine}</p>
          <p>¿Listo para ordenar la complejidad? Conversemos.</p>
          <p className="contact">{brand.contactEmail}</p>
        </section>

        <footer className="quote-footer">
          <p>
            {brand.name} — {brand.headline.join(" ")}
          </p>
          <p className="tiny">Documento confidencial · Uso exclusivo del destinatario</p>
        </footer>
      </article>
    </div>
  );
}
