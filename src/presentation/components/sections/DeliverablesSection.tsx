import { useState } from "react";
import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { brand } from "@domain/content/brand";
import { deliverables } from "@domain/content/process";
import { deliverablesByGroup } from "@domain/content/deliverableGroups";
import type { DeliverableItem } from "@domain/models/types";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Pack = {
  id: string;
  step: string;
  title: string;
  hint: string;
  items: DeliverableItem[];
};

const packs: Pack[] = [
  ...deliverablesByGroup().map(({ group, items }, i) => ({
    id: group.id,
    step: String(i + 1).padStart(2, "0"),
    title: group.label,
    hint: group.hint,
    items,
  })),
  {
    id: "complete",
    step: "04",
    title: "Solución completa",
    hint: "Todas las piezas encajan según el alcance acordado.",
    items: deliverables,
  },
];

const TOTAL = deliverables.length;

export function DeliverablesSection() {
  const [active, setActive] = useState(packs[1].id);

  return (
    <Section
      id="entregables"
      className="section-deliverables-v2"
      labelledBy="deliverables-title"
    >
      <header className="section-head deliverables-v2__head reveal reveal-stagger">
        <span className="section-index reveal-stagger__item" aria-hidden="true">
          06
        </span>
        <ScrollSplitTitle
          id="deliverables-title"
          plain="Cada entregable es una pieza."
          accent="Juntas forman la solución."
          className="deliverables-v2__title reveal-stagger__item"
        />
        <p className="section-lead reveal-stagger__item">
          Elige un paquete para ver qué recibes. El alcance final lo acordamos contigo.
        </p>
      </header>

      <Tabs
        value={active}
        onValueChange={setActive}
        className="reveal grid gap-4 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-5"
      >
        {/* Selector de paquetes: carrusel horizontal en móvil, columna en escritorio */}
        <TabsList
          aria-label="Paquetes de entregables"
          className="-mx-[var(--page-gutter)] flex h-auto w-auto group-data-[orientation=horizontal]/tabs:h-auto snap-x snap-mandatory scroll-px-[var(--page-gutter)] justify-start gap-2.5 overflow-x-auto rounded-none bg-transparent px-[var(--page-gutter)] pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:items-stretch lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {packs.map((pack) => (
            <TabsTrigger
              key={pack.id}
              value={pack.id}
              className={cn(
                "group relative h-auto min-w-[15.5rem] flex-none snap-start flex-col items-start justify-start gap-1.5 overflow-hidden rounded-[18px] border border-black/[0.07] bg-white px-5 py-4 text-left whitespace-normal text-pitch shadow-[0_10px_30px_rgba(8,8,8,0.04)] transition-[background,color,box-shadow,transform] duration-300 lg:min-w-0",
                "hover:-translate-y-0.5 hover:border-black/[0.12] hover:text-pitch hover:shadow-[0_14px_34px_rgba(8,8,8,0.07)]",
                "data-[state=active]:border-pitch data-[state=active]:bg-pitch data-[state=active]:text-white data-[state=active]:shadow-[0_18px_40px_rgba(8,8,8,0.18)]",
                "focus-visible:ring-primary/40",
                "before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:rounded-r before:bg-primary before:opacity-0 before:transition-opacity data-[state=active]:before:opacity-100"
              )}
            >
              <span className="flex w-full items-center justify-between">
                <span className="font-display text-xs font-bold tracking-[0.14em] text-primary">
                  {pack.step}
                </span>
                <span className="rounded-full border border-current/15 px-2 py-0.5 font-sans text-[0.68rem] font-semibold tracking-wide text-[#5c5c66] group-data-[state=active]:border-white/15 group-data-[state=active]:text-white/70">
                  {pack.items.length} {pack.items.length === 1 ? "pieza" : "piezas"}
                </span>
              </span>
              <span className="font-hero text-[1.05rem] leading-tight font-extrabold tracking-[-0.01em]">
                {pack.title}
              </span>
              <span className="font-sans text-[0.8rem] leading-snug font-normal text-[#5c5c66] group-data-[state=active]:text-white/60">
                {pack.hint}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {packs.map((pack) => {
          const included = new Set(pack.items.map((d) => d.id));
          return (
            <TabsContent
              key={pack.id}
              value={pack.id}
              className="relative isolate overflow-hidden rounded-[22px] bg-pitch p-5 text-white shadow-[0_24px_60px_rgba(8,8,8,0.18)] sm:p-7"
            >
              {/* halo de marca, sin blur en vivo */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,0,110,0.22),transparent)]"
              />

              {/* barra tipo terminal, igual que la sección 05 */}
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-[0.72rem] text-white/50">
                <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-display font-bold tracking-[0.2em] text-white/40">
                  <span className="text-primary">J</span>ACODE
                </span>
                <span className="truncate">
                  ~ vault --open <span className="text-white/85">{pack.id}</span>
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="font-hero text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-extrabold tracking-[-0.02em]">
                    {pack.title}
                  </h3>
                  <p className="mt-1.5 max-w-[46ch] text-[0.95rem] leading-relaxed text-white/60">
                    {pack.hint}
                  </p>
                </div>

                {/* mapa de piezas: cuántas de las 12 incluye este paquete */}
                <div className="flex items-center gap-3" aria-label={`${pack.items.length} de ${TOTAL} piezas`}>
                  <div className="grid grid-cols-6 gap-1" aria-hidden="true">
                    {deliverables.map((d) => (
                      <span
                        key={d.id}
                        className={cn(
                          "size-2.5 rounded-[3px] transition-colors duration-500",
                          included.has(d.id) ? "bg-primary" : "bg-white/[0.1]"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-display text-xs font-bold tracking-[0.12em] text-white/50">
                    {pack.items.length}/{TOTAL}
                  </span>
                </div>
              </div>

              <ul
                className={cn(
                  "mt-6 grid gap-2.5 sm:grid-cols-2",
                  pack.items.length > 4 && "xl:grid-cols-3"
                )}
              >
                {pack.items.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="group/tile flex items-center gap-3 rounded-[14px] border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-white/[0.06]"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 font-display text-[0.65rem] font-bold text-primary"
                    >
                      {String(deliverables.findIndex((d) => d.id === item.id) + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-[0.68rem] text-white/40">
                        {item.slug}
                      </span>
                      <span className="block text-[0.92rem] leading-snug font-semibold text-white">
                        {item.label}
                      </span>
                    </span>
                  </m.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <p className="text-[0.8rem] text-white/45">
                  Ajustamos las piezas a tu proyecto: puedes sumar o quitar entregables.
                </p>
                <a
                  href={brand.primaryCtaHref}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-primary"
                >
                  Armar mi paquete
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Section>
  );
}
