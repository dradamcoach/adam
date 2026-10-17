/*
 * ADAM feature flags (V5 beta). Loaded BEFORE the new modules. Set a flag to false to switch that part off without touching anything else.
 * Nothing here talks to Firebase. All the new features run on SAMPLE data until a backend is authorised, so each one is labelled "تجريبي / Beta".
 */
window.ADAM_FEATURES = {
  /* Each flag: true = on, false = hidden, 'soon' = the card stays visible but greyed out with a "قريبًا / Soon" tag. */
  home: true,         /* visitor "what you get" band + the tools hub on the home screens */
  explore: true,      /* Explore: shows REAL listings only; every category with none yet says "قريبًا". Sample listings only with ?data=sample */
  tasks: 'soon',      /* task center - still sample data, so greyed out until it is connected */
  builder: 'soon',    /* program builder - sample data / simulated approvals */
  analytics: 'soon',  /* progress analytics - sample data */
  reports: 'soon',    /* results & ranking reports - sample data */
  exploreSample: false, /* true = Explore uses the invented sample listings (demos only) */
  label: 'beta'       /* 'beta' shows the "تجريبي" tag on entry points; '' hides it once real data is wired */
};
