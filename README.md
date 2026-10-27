# Workie — Desktop

App desktop di **Workie** (Mac/Windows/Linux). È la **web app di Workie** racchiusa
in un guscio **Electron** — lo stesso modo in cui sono fatte Slack, VS Code, Notion
e Figma. La grafica e la logica sono quelle della Workie esistente: il desktop non
le riscrive, le ospita.

## Struttura

```
Workie-desktop/
  index.html          # la web app di Workie (per ora file unico; da spezzare, vedi AGENTS.md)
  icon.svg, logo.svg  # marchio e icone
  manifest.webmanifest, sw.js
  netlify/            # funzioni serverless (backend attuale)
  electron/
    main.js           # processo principale: crea la finestra, carica index.html
    preload.js        # bridge sicuro verso il sistema (per ora vuoto)
  package.json
```

## Comandi

```bash
npm install     # installa Electron
npm start       # apre Workie come app desktop
```

## Dove stiamo andando

1. **Ora:** guscio Electron attorno alla web app esistente → app desktop vera, grafica identica.
2. **Rifondazione graduale** (sotto il cofano): spezzare `index.html` in una struttura pulita
   (componenti, stato, data layer) **senza cambiare l'aspetto**. Vedi [AGENTS.md](./AGENTS.md).
3. **Colonne enterprise:** auto-aggiornamento, firma + notarizzazione Apple, crash report,
   login/SSO, backend Supabase.

Electron è gratis (open source, MIT). L'unico costo futuro è l'account sviluppatore
Apple (99 €/anno) per firmare l'app, e serve solo per distribuirla ad altri senza avvisi.
