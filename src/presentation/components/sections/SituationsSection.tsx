import type { CSSProperties } from "react";
import { situations, situationsIntro } from "@domain/content/situations";
import type { SituationItem } from "@domain/content/situations";
import { SituationTileIcon } from "@presentation/components/sections/SituationTileIcon";

function SituationTileBack({ item }: { item: SituationItem }) {
  if (item.flipBack.type === "quote") {
    return (
      <div className="situation-tile__quote-back">
        <p className="situation-tile__quote-text">{item.flipBack.quote}</p>
      </div>
    );
  }

  return (
    <div className="situation-tile__image-back">
      <img
        className="situation-tile__back-photo"
        src={item.flipBack.image}
        alt={item.flipBack.imageAlt}
        loading="lazy"
        decoding="async"
      />
      {item.flipBack.label ? (
        <span className="situation-tile__back-label">{item.flipBack.label}</span>
      ) : null}
    </div>
  );
}

export function SituationsSection() {
  return (
    <section
      id="situaciones"
      className="situations-section"
      aria-labelledby="situations-title"
    >
      <div className="situations-section__inner">
        <div className="situations-split">
          <div className="situations-split__intro reveal reveal-stagger">
            <div className="situations-split__mark reveal-stagger__item" aria-hidden="true">
              <span className="situations-split__mark-dot" />
              <span className="situations-split__mark-line" />
            </div>
            <span
              className="situations-split__index reveal-stagger__item"
              aria-hidden="true"
            >
              01
            </span>
            <p className="situations-split__eyebrow reveal-stagger__item">
              {situationsIntro.eyebrow}
            </p>
            <h2 id="situations-title" className="situations-split__title reveal-stagger__item">
              {situationsIntro.titleLine1}
              <span className="situations-split__title-line situations-split__title-line--accent">
                {situationsIntro.titleLine2}
              </span>
            </h2>
            <p className="situations-split__lead reveal-stagger__item">
              {situationsIntro.leadBefore}
              <span className="situations-split__lead-accent">
                {situationsIntro.leadHighlight}
              </span>
              {situationsIntro.leadAfter}
            </p>
            <a
              href={situationsIntro.ctaHref}
              className="situations-split__cta reveal-stagger__item"
            >
              {situationsIntro.cta}
            </a>
          </div>

          <div className="situations-split__grid reveal reveal-stagger">
            {situations.map((item, index) => (
              <article
                key={item.id}
                className={`situation-tile situation-tile--flip situation-tile--${item.tone}${
                  item.coverImage ? " situation-tile--cover" : ""
                } reveal-stagger__item`}
                style={
                  {
                    "--stagger-i": index,
                    "--tile-i": index,
                    ...(item.coverImage
                      ? { "--tile-cover": `url(${item.coverImage})` }
                      : {}),
                  } as CSSProperties
                }
                tabIndex={0}
                aria-label={`${item.title}: ${item.description}`}
              >
                <div className="situation-tile__inner">
                  <div className="situation-tile__face situation-tile__face--front">
                    <span className="situation-tile__icon" aria-hidden="true">
                      <SituationTileIcon kind={item.icon} />
                    </span>
                    <h3 className="situation-tile__title">{item.title}</h3>
                    <p className="situation-tile__desc">{item.description}</p>
                  </div>
                  <div className="situation-tile__face situation-tile__face--back">
                    <SituationTileBack item={item} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
