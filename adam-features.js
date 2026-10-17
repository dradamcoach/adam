/*
 * ADAM feature flags (V5 beta). Loaded BEFORE the new modules. Set a flag to false to switch that part off without touching anything else.
 * Nothing here talks to Firebase. All the new features run on SAMPLE data until a backend is authorised, so each one is labelled "تجريبي / Beta".
 */
window.ADAM_FEATURES = {
  home: true,       /* visitor "what you get" band + the new tools hub on the home screens */
  explore: true,    /* Phase 1 - unified search (client entry card) */
  tasks: true,      /* Phase 2 - task center */
  builder: true,    /* Phase 3 - program builder (coach / specialist / admin) */
  analytics: true,  /* Phase 4 - progress analytics (client) */
  reports: true,    /* Phase 3B - results & ranking reports (coach / specialist / admin) */
  label: 'beta'     /* 'beta' shows the "تجريبي" tag on every new entry point; '' hides it once real data is wired */
};
