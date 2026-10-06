/**
 * JACODE Cube Engine
 * Modular 3D lattice cube with story states:
 * scrambled → intervening → ordered → solution
 */

const FACES = ["front", "back", "right", "left", "top", "bottom"];

/** Ordered lattice positions (inspired by interlocking isotype modules) */
const ORDERED = [
  { x: -58, y: -58, z: -58 },
  { x: 0, y: -58, z: -58 },
  { x: 58, y: -58, z: 0 },
  { x: -58, y: 0, z: -58 },
  { x: 0, y: 0, z: 0 },
  { x: 58, y: 0, z: 58 },
  { x: -58, y: 58, z: 0 },
  { x: 0, y: 58, z: 58 },
  { x: 58, y: 58, z: 58 },
  { x: -58, y: -58, z: 58 },
  { x: 58, y: -58, z: -58 },
  { x: -58, y: 58, z: -58 },
];

const CONCEPTS = [
  {
    id: "idea",
    title: "IDEA",
    text: "Todo comienza con una necesidad real. Escuchamos, observamos y definimos el problema antes de escribir una sola línea de código.",
  },
  {
    id: "diseno",
    title: "DISEÑO",
    text: "Damos forma a la experiencia. Interfaces claras, flujos intuitivos y una arquitectura visual alineada al producto.",
  },
  {
    id: "tecnologia",
    title: "TECNOLOGÍA",
    text: "Elegimos el stack correcto para cada reto: robusto, escalable y mantenible a largo plazo.",
  },
  {
    id: "codigo",
    title: "CÓDIGO",
    text: "Construimos con precisión. Código limpio, modular y listo para evolucionar con el negocio.",
  },
  {
    id: "datos",
    title: "DATOS",
    text: "Organizamos la información para que sea útil: modelos, consultas, analítica y decisiones informadas.",
  },
  {
    id: "ia",
    title: "IA",
    text: "Integramos inteligencia artificial donde aporta valor real: automatización, asistentes y análisis inteligente.",
  },
  {
    id: "integracion",
    title: "INTEGRACIÓN",
    text: "Conectamos sistemas, APIs y plataformas para que todo trabaje como una sola solución.",
  },
  {
    id: "resultado",
    title: "RESULTADO",
    text: "Las piezas encajan. Entregamos tecnología funcional, útil y preparada para escalar.",
  },
];

const STORY_LABELS = {
  scrambled: "Complejidad desordenada",
  intervening: "JACODE interviene",
  ordered: "Las piezas se organizan",
  solution: "Solución",
};

function scramblePose(i, scale = 1) {
  const spread = (90 + (i % 5) * 18) * scale;
  const angle = (i / 12) * Math.PI * 2;
  return {
    x: Math.cos(angle) * spread + (((i * 17) % 40) - 20) * scale,
    y: Math.sin(angle * 1.3) * spread * 0.7 + (((i * 13) % 50) - 25) * scale,
    z: (((i * 29) % 100) - 50) * scale,
    rx: ((i * 47) % 80) - 40,
    ry: ((i * 61) % 100) - 50,
    rz: ((i * 37) % 60) - 30,
  };
}

function createModule(index, dark) {
  const el = document.createElement("div");
  el.className = "cube-module" + (dark ? " is-dark" : "");
  el.dataset.index = String(index);
  FACES.forEach((face) => {
    const f = document.createElement("div");
    f.className = `face ${face}`;
    el.appendChild(f);
  });
  return el;
}

function applyPose(el, pose, withRotation = true) {
  const { x, y, z, rx = 0, ry = 0, rz = 0 } = pose;
  const rot = withRotation ? ` rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)` : "";
  el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)${rot}`;
}

class JacodeCube {
  constructor(root, options = {}) {
    this.root = root;
    this.options = {
      autoRotate: true,
      interactive: true,
      story: true,
      size: 180,
      ...options,
    };
    this.modules = [];
    this.rotX = -22;
    this.rotY = 32;
    this.targetRotX = this.rotX;
    this.targetRotY = this.rotY;
    this.drag = false;
    this.lastX = 0;
    this.lastY = 0;
    this.storyState = "scrambled";
    this.raf = null;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._tick = this._tick.bind(this);

    this._build();
    if (this.options.story && !this.reducedMotion) {
      this.setStory("scrambled", true);
      setTimeout(() => this.playStory(), 900);
    } else {
      this.setStory("ordered", true);
    }
    if (this.options.interactive) this._bind();
    this._tick();
  }

  _build() {
    this.root.innerHTML = "";
    const scale = this.options.size / 180;
    this.root.style.width = `${this.options.size}px`;
    this.root.style.height = `${this.options.size}px`;

    for (let i = 0; i < 12; i++) {
      const dark = i % 4 === 0 || i === 7;
      const mod = createModule(i, dark);
      if (scale !== 1) {
        mod.style.width = `${52 * scale}px`;
        mod.style.height = `${52 * scale}px`;
        const half = 26 * scale;
        mod.querySelectorAll(".face").forEach((face) => {
          const name = [...face.classList].find((c) => FACES.includes(c));
          if (name === "front") face.style.transform = `translateZ(${half}px)`;
          if (name === "back") face.style.transform = `rotateY(180deg) translateZ(${half}px)`;
          if (name === "right") face.style.transform = `rotateY(90deg) translateZ(${half}px)`;
          if (name === "left") face.style.transform = `rotateY(-90deg) translateZ(${half}px)`;
          if (name === "top") face.style.transform = `rotateX(90deg) translateZ(${half}px)`;
          if (name === "bottom") face.style.transform = `rotateX(-90deg) translateZ(${half}px)`;
        });
      }
      this.root.appendChild(mod);
      this.modules.push(mod);
    }
  }

  setStory(state, instant = false) {
    this.storyState = state;
    const caption = document.getElementById("story-caption");
    if (caption && this.options.story) {
      caption.style.opacity = "0";
      setTimeout(() => {
        caption.textContent = STORY_LABELS[state] || "";
        caption.style.opacity = "1";
      }, 200);
    }

    this.modules.forEach((mod, i) => {
      if (instant) mod.style.transition = "none";
      else mod.style.transition = "";

      const scale = this.options.size / 180;
      if (state === "scrambled") {
        applyPose(mod, scramblePose(i, scale), true);
      } else if (state === "intervening") {
        const mid = scramblePose(i, scale);
        const ord = this._scaledOrdered(i);
        applyPose(
          mod,
          {
            x: (mid.x + ord.x) / 2,
            y: (mid.y + ord.y) / 2,
            z: (mid.z + ord.z) / 2,
            rx: mid.rx / 2,
            ry: mid.ry / 2,
            rz: mid.rz / 2,
          },
          true
        );
      } else {
        applyPose(mod, { ...this._scaledOrdered(i), rx: 0, ry: 0, rz: 0 }, true);
      }

      if (instant) {
        // force reflow then restore transition
        void mod.offsetWidth;
        mod.style.transition = "";
      }
    });

    this.root.dispatchEvent(new CustomEvent("jacode:story", { detail: { state } }));
  }

  _scaledOrdered(i) {
    const s = this.options.size / 180;
    const o = ORDERED[i];
    return { x: o.x * s, y: o.y * s, z: o.z * s };
  }

  playStory() {
    if (this.reducedMotion) {
      this.setStory("solution", true);
      return;
    }
    this.setStory("intervening");
    setTimeout(() => this.setStory("ordered"), 700);
    setTimeout(() => this.setStory("solution"), 1600);
  }

  reorganize() {
    if (this.reducedMotion) {
      this.setStory("ordered", true);
      return;
    }
    this.setStory("scrambled");
    setTimeout(() => this.playStory(), 500);
  }

  setConfig(stageIndex) {
    // Slight configuration shift per process stage
    const offset = (stageIndex % 6) * 8;
    this.modules.forEach((mod, i) => {
      const base = this._scaledOrdered(i);
      const twist = ((i + stageIndex) % 3) - 1;
      applyPose(
        mod,
        {
          x: base.x + twist * offset * 0.3,
          y: base.y - twist * offset * 0.2,
          z: base.z + ((i + stageIndex) % 2) * offset * 0.15,
          rx: twist * 4,
          ry: stageIndex * 3,
          rz: 0,
        },
        true
      );
    });
    this.targetRotY = 32 + stageIndex * 12;
    this.targetRotX = -22 + (stageIndex % 2) * 6;
  }

  highlightModule(index) {
    this.modules.forEach((m, i) => {
      m.classList.toggle("is-active", i === index);
      m.classList.toggle("is-highlight", i === index);
    });
  }

  clearHighlight() {
    this.modules.forEach((m) => {
      m.classList.remove("is-active", "is-highlight");
    });
  }

  _bind() {
    const stage = this.root.closest(".cube-stage") || this.root.parentElement;
    stage.addEventListener("pointerdown", this._onPointerDown);
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._onPointerUp);

    this.modules.forEach((mod) => {
      mod.addEventListener("click", (e) => {
        if (this._dragged) return;
        e.stopPropagation();
        const idx = Number(mod.dataset.index);
        this.highlightModule(idx);
        this.root.dispatchEvent(
          new CustomEvent("jacode:piece", { detail: { index: idx, concept: CONCEPTS[idx % CONCEPTS.length] } })
        );
      });
    });

    // Parallax on mouse move when not dragging
    stage.addEventListener("pointermove", (e) => {
      if (this.drag || this.reducedMotion || !this.options.autoRotate) return;
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      this.targetRotY = 32 + nx * 18;
      this.targetRotX = -22 - ny * 12;
    });
  }

  _onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    this.drag = true;
    this._dragged = false;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this._pointerId = e.pointerId;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch (_) {}
  }

  _onPointerMove(e) {
    if (!this.drag) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    if (Math.abs(dx) + Math.abs(dy) > 4) this._dragged = true;
    this.targetRotY += dx * 0.45;
    this.targetRotX -= dy * 0.45;
    this.targetRotX = Math.max(-60, Math.min(40, this.targetRotX));
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  _onPointerUp() {
    this.drag = false;
  }

  _tick() {
    if (!this.reducedMotion && this.options.autoRotate && !this.drag) {
      this.targetRotY += 0.08;
    }
    this.rotX += (this.targetRotX - this.rotX) * 0.08;
    this.rotY += (this.targetRotY - this.rotY) * 0.08;
    this.root.style.transform = `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
    this.raf = requestAnimationFrame(this._tick);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
  }
}

// Expose for non-module scripts
window.JacodeCube = JacodeCube;
window.JACODE_CONCEPTS = CONCEPTS;
