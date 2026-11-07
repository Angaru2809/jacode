import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { brand, whatsappHref } from "@domain/content/brand";
import { WhatsAppIcon } from "@presentation/components/ui/SocialIcons";
import { Button } from "@/components/ui/button";

/**
 * Barra de conversión fija (solo móvil, < md).
 * Aparece al dejar atrás el hero y se oculta cuando el formulario
 * de contacto o el cierre están en pantalla (no compite con ellos).
 */
export function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false);
  const [targetInView, setTargetInView] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const targets = ["contacto", "cierre"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Set<Element>();

    const heroIo = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting);
    });
    const targetIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
        );
        setTargetInView(visible.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px" }
    );

    if (hero) heroIo.observe(hero);
    targets.forEach((t) => targetIo.observe(t));
    return () => {
      heroIo.disconnect();
      targetIo.disconnect();
    };
  }, []);

  const show = pastHero && !targetInView;

  useEffect(() => {
    document.documentElement.classList.toggle("has-mobile-cta", show);
    return () => document.documentElement.classList.remove("has-mobile-cta");
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <m.div
          key="mobile-cta"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
          className="fixed inset-x-0 bottom-0 z-[95] border-t border-black/[0.08] bg-white/[0.97] px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(8,8,8,0.08)] md:hidden"
          role="region"
          aria-label="Contacto rápido"
        >
          <div className="mx-auto flex max-w-xl items-center gap-2.5">
            <Button
              asChild
              size="lg"
              className="h-12 flex-1 rounded-full font-sans text-[0.9375rem] font-semibold shadow-[0_8px_22px_rgba(255,0,110,0.28)] active:scale-[0.98]"
            >
              <a href={brand.primaryCtaHref}>
                {brand.primaryCtaLabel}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="icon-lg"
              className="size-12 rounded-full bg-[#25d366] text-white hover:bg-[#1fbe5b] [&_svg]:size-6"
            >
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escríbenos por WhatsApp"
              >
                <WhatsAppIcon title="" />
              </a>
            </Button>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
