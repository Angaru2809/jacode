import { useCallback, useState, type CSSProperties } from "react";
import { clientNeeds } from "@domain/content/clientNeeds";
import type { ClientNeed } from "@domain/models/types";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";
import { ProblemNeedIcon } from "@presentation/components/sections/ProblemNeedIcon";

const DEFAULT_NEED_ID = clientNeeds[1]?.id ?? clientNeeds[0]?.id ?? "manual";

const NEED_PLAYBOOK: Record<
  string,
  { route: string; lines: { kind: "comment" | "code" | "key"; text: string }[] }
> = {
  manual: {
    route: "workflow.map",
    lines: [
      { kind: "comment", text: "// Del Excel al flujo que sí se usa" },
      { kind: "code", text: "const pasos = await discover.repetitiveTasks();" },
      { kind: "code", text: "return automate.build({ pasos, owner: 'equipo' });" },
    ],
  },
  digital: {
    route: "product.scope",
    lines: [
      { kind: "comment", text: "// Producto propio, no parche" },
      { kind: "code", text: "const scope = define.experienceAndArchitecture();" },
      { kind: "code", text: "return build.platform({ scope, evolutivo: true });" },
    ],
  },
  connect: {
    route: "integrate.sync",
    lines: [
      { kind: "comment", text: "// Un solo dato, varios sistemas" },
      { kind: "code", text: "const graph = connect.apis([erp, crm, ecommerce]);" },
      { kind: "code", text: "return graph.sync({ trazabilidad: true });" },
    ],
  },
  automate: {
    route: "ai.automate",
    lines: [
      { kind: "comment", text: "// IA donde aporta, no por moda" },
      { kind: "code", text: "const caso = prioritize.useCaseReal();" },
      { kind: "code", text: "return automate.apply({ caso, datos: 'claros' });" },
    ],
  },
};

function NeedStagePanel({ need, index }: { need: ClientNeed; index: number }) {
  const playbook = NEED_PLAYBOOK[need.id] ?? NEED_PLAYBOOK.manual;

  return (
    <article
      className="problems-stage__panel is-enter"
      aria-labelledby={`need-stage-${need.id}`}
    >
      <header className="problems-stage__chrome">
        <div className="problems-stage__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="problems-stage__route">{playbook.route}</span>
        <span className="problems-stage__badge">{need.watermark}</span>
      </header>

      <div className="problems-stage__body">
        <p className="problems-stage__kicker">
          Situación {String(index + 1).padStart(2, "0")}
        </p>
        <h3 id={`need-stage-${need.id}`} className="problems-stage__title">
          {need.title}
        </h3>
        <p className="problems-stage__hint">{need.hint}</p>
        <p className="problems-stage__help">{need.help}</p>

        <ul className="problems-stage__signals">
          {need.signals.map((s) => (
            <li key={s.id}>{s.label}</li>
          ))}
        </ul>

        <pre className="problems-stage__playbook">
          <code>
            {playbook.lines.map((line, i) => (
              <span key={i} className={`problems-stage__line problems-stage__line--${line.kind}`}>
                {line.text}
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </article>
  );
}

export function ProblemsSection() {
  const [activeId, setActiveId] = useState(DEFAULT_NEED_ID);

  const select = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const activeIndex = clientNeeds.findIndex((n) => n.id === activeId);
  const activeNeed = clientNeeds[activeIndex >= 0 ? activeIndex : 0];

  return (
    <Section
      id="necesidades"
      className="section-problems jacode-late"
      labelledBy="problems-title"
    >
      <header className="problems-head reveal">
        <span className="section-index" aria-hidden="true">
          04
        </span>
        <ScrollSplitTitle
          id="problems-title"
          plain="¿Qué problema o necesidad tienes en mente?"
          accent="Reconoce tu situación — te ayudamos a resolverla."
          className="problems-head__title"
        />
      </header>

      <div className="problems-atelier reveal">
        <div
          className="problems-atelier__rail"
          role="tablist"
          aria-label="Tipos de necesidad"
        >
          {clientNeeds.map((need, i) => {
            const isActive = need.id === activeId;
            return (
              <button
                key={need.id}
                type="button"
                role="tab"
                id={`need-tab-${need.id}`}
                aria-selected={isActive}
                aria-controls={`need-panel-${need.id}`}
                className={`problems-rail__card${isActive ? " is-active" : ""}`}
                style={{ "--need-i": i } as CSSProperties}
                onClick={() => select(need.id)}
              >
                <span className="problems-rail__glow" aria-hidden="true" />
                <span className="problems-rail__icon">
                  <ProblemNeedIcon id={need.id} />
                </span>
                <span className="problems-rail__copy">
                  <span className="problems-rail__meta">
                    <span className="problems-rail__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="problems-rail__title">{need.title}</span>
                  </span>
                  <span className={`problems-rail__detail${isActive ? " is-open" : ""}`}>
                    <span className="problems-rail__hint">{need.hint}</span>
                  </span>
                </span>
                <span className="problems-rail__chev" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div
          className="problems-atelier__stage"
          role="tabpanel"
          id={`need-panel-${activeNeed.id}`}
          aria-labelledby={`need-tab-${activeNeed.id}`}
        >
          <NeedStagePanel key={activeNeed.id} need={activeNeed} index={activeIndex} />
        </div>
      </div>
    </Section>
  );
}
