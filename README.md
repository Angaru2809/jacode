# JACODE

Landing premium en **React** con arquitectura en capas modular + plantilla de cotización.

## Arquitectura

```
src/
  app/              → composición (main, App, providers, estilos)
  domain/           → modelos, contenido, geometría del cubo (puro)
  application/      → hooks / casos de uso de UI
  presentation/     → componentes y páginas React
  infrastructure/   → (reservado para APIs / analytics)
```

## Principios UX (Nielsen)

- Estado visible (`aria-live`, caption del cubo, modo edición)
- Control del usuario (reducir animaciones, Escape cierra menú, teclado en cubo)
- Consistencia (botones, secciones, tokens)
- Reconocimiento (nav clara, etiquetas de piezas)
- Accesibilidad (skip link, `:focus-visible`, roles ARIA)

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Rutas

- `/` — Landing
- `/cotizacion` — Plantilla editable / PDF

## Colores

- Hot Magenta `#FF006E`
- Pitch `#080808`
- Blanco `#FFFFFF`
