/**
 * @file dates.js
 * Dati di localizzazione delle date: MONTHS (nomi mesi) e DOWS (iniziali giorni),
 * per lingua. Dati puri, caricati prima di app.js; le funzioni di formattazione
 * data (che usano LANG/LOCALES) restano in app.js. Estratto senza modifiche.
 */
const MONTHS={
  it:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
  en:['January','February','March','April','May','June','July','August','September','October','November','December'],
  fr:['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  es:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
};
const DOWS={it:['L','M','M','G','V','S','D'],en:['M','T','W','T','F','S','S'],fr:['L','M','M','J','V','S','D'],es:['L','M','X','J','V','S','D']};
