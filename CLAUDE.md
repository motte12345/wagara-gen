# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

wagara-gen — Japanese traditional pattern (wagara) SVG generator and editor.
Users customize patterns (colors, scale, stroke, rotation, opacity) and download as SVG/PNG/CSS.
Target audience: overseas designers and developers. English-first with Japanese i18n.

## Tech Stack

- React 19 + TypeScript + Vite 8
- React Router (SPA)
- i18n: same approach as color-conv (EN primary, JA secondary)
- Vitest for testing
- Deploy: Cloudflare Pages (GitHub → main push)

## Commands

```bash
npm run dev          # Vite dev server (port 5173)
npm run build        # tsc -b && vite build
npm run lint         # ESLint
npm run preview      # Vite preview (port 4173)
npm test             # Vitest
npm run test:watch   # Vitest watch mode
```

## Architecture

### Pattern Engine (core logic)

Each wagara pattern is a **pure function** returning SVG markup:

```
src/patterns/<pattern-name>.ts   # e.g. seigaiha.ts, asanoha.ts
```

- Input: `PatternParams` (color1, color2, color3?, scale, strokeWidth, rotation, opacity)
- Output: SVG string (content for `<pattern>` element)
- All patterns use only SVG primitives (circle, path, line, rect, polygon)
- Must be pure — no side effects, no DOM access

### 12 Phase-1 Patterns

Ichimatsu (checkered), Asanoha (hemp leaf), Seigaiha (wave), Uroko (scales),
Shippou (seven treasures), Kikkou (tortoiseshell), Yagasuri (arrow feathers),
Chidori (plovers), Koushi (lattice), Karakusa (arabesque), Sakura (cherry blossom), Nami (wave)

### Export Formats

- **SVG**: raw vector download
- **PNG**: Canvas API rendering (512/1024/2048px)
- **CSS**: `background-image: url("data:image/svg+xml,...")` inline

### Routes

| Path | Content |
|---|---|
| `/` | Pattern gallery (grid of all patterns) |
| `/:pattern` | Pattern editor (customize + preview + download) |
| `/about` | History of wagara |

### State Persistence

Use `usePersistedState` hook (localStorage) to preserve editor settings across navigation.
Key format: `wagara-gen:{pattern}:{field}`

## Key Design Decisions

- Pattern functions are pure and framework-agnostic — testable without React
- SVG `<pattern>` + `<rect>` for real-time tiling preview (no canvas for preview)
- Canvas API used only for PNG export
- Each pattern page includes cultural/historical content (SEO differentiator)
- No backend — fully static site
- Cross-link with color-conv for Japanese traditional colors (Phase 2)
