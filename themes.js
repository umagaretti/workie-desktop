/**
 * @file themes.js
 * Dati dei temi: THEME_DEFS (palette dei temi) e THEME_SOON (quali sono "in arrivo").
 * Dati puri, caricati prima di app.js; stato (curTheme/customCfg...) e funzioni
 * di applicazione restano in app.js. Estratto senza modifiche.
 */
const THEME_DEFS=[
  {k:'classico',name:'Classico',desc:'Scuro · lilla',bg:'#171718',side:'#212123',card:'#232325',accent:'#b8a6f4'},
  {k:'futuristico',name:'Futuristico',desc:'Viola vetro',bg:'#150f26',side:'#1a1430',card:'#2a2049',accent:'#8b5cf6'},
  {k:'chiaro',name:'Chiaro',desc:'Classico, bianco',bg:'#f3f2f8',side:'#ffffff',card:'#ffffff',accent:'#7c5cff'},
  {k:'custom',name:'Personalizzato',desc:'Scegli tu',bg:'#1e1836',side:'#2a2246',card:'#342a55',accent:'#e879c9'}
];
const THEME_SOON={futuristico:1,custom:1}; // temi disattivati ("in arrivo") fino al lancio
