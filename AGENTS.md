# AGENTS.md — Workie Desktop

Guida per chi lavora (umani o AI) su questo progetto. Leggila prima di scrivere codice.

## Cos'è
App desktop Electron che ospita la **web app di Workie**. Il guscio (`electron/`) e la
web app (`index.html` + asset) sono separati. La web app è **la stessa** usata sul web
(deploy Netlify): il desktop la riusa, non la duplica a mano.

## Principi
- **La grafica si tiene.** Non si fanno passi indietro estetici: ogni cambiamento deve
  lasciare l'aspetto uguale o migliore. Il confronto è sempre la Workie attuale.
- **Rifondazione graduale, non riscrittura.** `index.html` oggi è un file unico (prototipo).
  Lo si spezza **a pezzi** in una struttura pulita (es. `src/` con componenti, stato,
  `api/` per il backend dietro un unico client) mantenendo tutto funzionante a ogni passo.
  Mai un "big bang" che rompe o imbruttisce.
- **Sicurezza Electron:** `contextIsolation: true`, `nodeIntegration: false`. Niente Node
  esposto alla pagina; i poteri nativi passano da `electron/preload.js` con API strette.
- **Backend dietro un contratto unico.** Le chiamate al server (ora Netlify functions,
  poi Supabase) vanno isolate dietro un solo modulo, così la UI non parla mai diretta col
  backend. (Da introdurre nella rifondazione.)
- **Git vero.** Branch `main` (+ `dev` quando serve). Commit con prefissi convenzionali
  (`feat:`, `fix:`, `chore:`, `style:`, `refactor:`…).

## Comandi
```bash
npm install
npm start      # avvia l'app desktop
```

## Rotta
1. Guscio Electron attorno alla web app esistente. ✅ (punto di partenza)
2. Rifinire l'esperienza desktop (menu, finestra, icona, scorciatoie).
3. Rifondazione graduale di `index.html` → struttura pulita (invisibile a schermo).
4. Colonne enterprise: auto-update, firma/notarizzazione, crash report, SSO, Supabase.
