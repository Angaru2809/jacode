/**
 * JACODE Landing interactions
 */

(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Header scroll
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-open", !open);
  });
  nav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });

  // Cubes
  const mainRoot = document.getElementById("main-cube");
  const focusRoot = document.getElementById("focus-cube");
  const processRoot = document.getElementById("process-cube");
  const finalRoot = document.getElementById("final-cube");

  const mainCube = mainRoot
    ? new JacodeCube(mainRoot, { autoRotate: true, interactive: true, story: true, size: 180 })
    : null;

  const focusCube = focusRoot
    ? new JacodeCube(focusRoot, { autoRotate: true, interactive: true, story: false, size: 160 })
    : null;

  const processCube = processRoot
    ? new JacodeCube(processRoot, { autoRotate: true, interactive: false, story: false, size: 130 })
    : null;

  const finalCube = finalRoot
    ? new JacodeCube(finalRoot, { autoRotate: true, interactive: false, story: false, size: 110 })
    : null;

  // Ensure secondary cubes start ordered
  focusCube?.setStory("ordered", true);
  processCube?.setStory("ordered", true);
  finalCube?.setStory("solution", true);

  // Hero CTA → reorganize + scroll
  const btnConoce = document.getElementById("btn-conoce");
  btnConoce?.addEventListener("click", (e) => {
    if (!mainCube || reduced) return;
    e.preventDefault();
    mainCube.reorganize();
    setTimeout(() => {
      document.getElementById("que-hacemos")?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  });

  // Click cube stage to reorganize
  document.getElementById("hero-cube")?.addEventListener("dblclick", () => {
    mainCube?.reorganize();
  });

  // Approach concepts
  const concepts = window.JACODE_CONCEPTS || [];
  const titleEl = document.getElementById("concept-title");
  const textEl = document.getElementById("concept-text");
  const listEl = document.getElementById("concept-list");

  function setConcept(concept, index) {
    if (!concept) return;
    if (titleEl) {
      titleEl.style.opacity = "0";
      setTimeout(() => {
        titleEl.textContent = concept.title;
        titleEl.style.opacity = "1";
      }, 150);
    }
    if (textEl) textEl.textContent = concept.text;
    listEl?.querySelectorAll("li").forEach((li) => {
      li.classList.toggle("is-active", li.dataset.concept === concept.id);
    });
    focusCube?.highlightModule(index % 12);
  }

  listEl?.querySelectorAll("li").forEach((li, i) => {
    li.addEventListener("click", () => {
      const concept = concepts.find((c) => c.id === li.dataset.concept) || concepts[i];
      setConcept(concept, i);
    });
  });

  focusRoot?.addEventListener("jacode:piece", (e) => {
    const { concept, index } = e.detail;
    setConcept(concept, index);
  });

  // Mode tabs
  const tabs = document.querySelectorAll(".mode-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const mode = tab.dataset.mode;
      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });
      document.querySelectorAll(".mode-panel").forEach((panel) => {
        const match = panel.id === `mode-${mode}`;
        panel.hidden = !match;
        panel.classList.toggle("is-active", match);
      });
    });
  });

  // Journey stages
  const journeySteps = document.querySelectorAll("#journey-steps li");
  journeySteps.forEach((step) => {
    step.addEventListener("click", () => {
      const stage = Number(step.dataset.stage);
      journeySteps.forEach((s) => s.classList.toggle("is-active", s === step));
      processCube?.setConfig(stage);
    });
  });

  // Auto-advance journey when in view
  let journeyTimer = null;
  const journeySection = document.getElementById("proceso");
  if (journeySection && !reduced) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          clearInterval(journeyTimer);
          journeyTimer = setInterval(() => {
            i = (i + 1) % journeySteps.length;
            journeySteps[i]?.click();
          }, 2800);
        } else {
          clearInterval(journeyTimer);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(journeySection);
  }

  // Deliverables assemble animation
  const assemble = document.getElementById("assemble-cube");
  const delivList = document.getElementById("deliverables-list");
  if (assemble && delivList) {
    const items = [...delivList.querySelectorAll("li")];
    items.forEach((_, i) => {
      const piece = document.createElement("div");
      piece.className = "assemble-piece" + (i % 3 === 0 ? " is-dark" : "");
      piece.dataset.piece = String(i);
      assemble.appendChild(piece);
    });

    const pieces = [...assemble.querySelectorAll(".assemble-piece")];
    let assembled = false;

    const runAssemble = () => {
      if (assembled) return;
      assembled = true;
      pieces.forEach((piece, i) => {
        setTimeout(() => {
          piece.classList.add("is-in");
          items[i]?.classList.add("is-active");
        }, reduced ? 0 : i * 160);
      });
    };

    const delivSection = document.getElementById("entregables");
    if (delivSection) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) runAssemble();
        },
        { threshold: 0.3 }
      );
      io.observe(delivSection);
    }

    items.forEach((item, i) => {
      item.addEventListener("mouseenter", () => {
        pieces.forEach((p, j) => p.classList.toggle("is-in", j <= i || assembled));
        items.forEach((li, j) => li.classList.toggle("is-active", j === i || (assembled && j <= i)));
        pieces[i]?.classList.add("is-in");
      });
    });
  }

  // Process steps reveal
  const processSteps = document.querySelectorAll(".process-step");
  if (processSteps.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    processSteps.forEach((s) => io.observe(s));
  }

  // Generic reveal
  document.querySelectorAll(".section-head, .service-card, .why-item, .mode-panel.is-active").forEach((el) => {
    el.classList.add("reveal");
  });
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => {
    if (reduced) el.classList.add("is-in");
    else revealIO.observe(el);
  });

  // Service card hover lightly tweaks main cube highlight
  document.querySelectorAll(".service-card").forEach((card, i) => {
    card.addEventListener("mouseenter", () => mainCube?.highlightModule(i));
    card.addEventListener("mouseleave", () => mainCube?.clearHighlight());
  });
})();
