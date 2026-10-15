# ADAM - Design-system research (desk research)

Research date: 2026-10-15. Every bullet comes from a page opened with WebFetch. Where a page would not load or did not cover a topic, the gap is written as UNVERIFIED instead of filled from memory. Topic letters: (a) theming, (b) RTL, (c) forms/wizards, (d) status/badges, (e) tables on mobile, (f) touch targets, (g) motion, (h) empty states / next best action.

## 1. Apple Human Interface Guidelines
Sources: https://developer.apple.com/design/human-interface-guidelines/{dark-mode,right-to-left,accessibility,motion,onboarding,managing-accounts,entering-data}.md
- (a) The HIG advises against an app-specific appearance setting, because people then manage two settings and may think the app ignores the system choice (dark-mode). It also says to look good in both modes and to expect "Auto" switching while the app runs. Tension with ADAM's optional theme switch: default to the system setting and make any override an explicit, visible choice.
- (a) Contrast in dark mode: minimum 4.5:1, aim for 7:1 for custom colours especially small text; re-check with Increase Contrast on (dark-mode, accessibility).
- (b) Mirror: text alignment (paragraphs of 3+ lines align to their own language), controls showing progress (sliders, progress bars), back/next navigation, images whose order is meaningful, icons that show text/reading direction or forward/backward motion. Do not mirror: digits inside a number (phone number, "541"), photographs/illustrations, logos, checkmark and other universal signs, icons of real-world objects (clock), controls meaning an actual direction (right-pointing "to the right") (right-to-left).
- (b) Numerals: Arabic text may use Western or Eastern Arabic numerals depending on region; reverse the order of numeral labels along a flipped control but never flip the numeral glyphs. Increase Arabic font size ~2 pt next to all-caps Latin labels for visual balance (right-to-left).
- (c) Validate values as soon as they are entered; enable Next/Continue only after required data is provided; prefer choices over typing; secure fields for sensitive data (entering-data). Break multi-step workflows into one interaction per screen and ask for confirmation twice before hard-to-recover actions (accessibility, Assistive Access section).
- (c) Delay sign-in as long as possible; if accounts can be created, they must be deletable in-app (or via a direct link to a web page) with status messages and optional scheduled deletion (managing-accounts).
- (f) Default control size 44x44 pt on iOS; stated minimum 28x28 pt; about 12 pt padding around bezeled elements and about 24 pt around elements without a bezel (accessibility).
- (g) With Reduce Motion on: cut automatic/repetitive animation, replace x/y/z transitions with fades, avoid animating into/out of blurs; make motion optional and cancelable; avoid timed auto-dismissing UI (accessibility, motion).
- (h) Onboarding should be fast, optional, interactive; prefer context-specific tips over one long flow; postpone non-essential setup (onboarding). Tables/badges/empty-state pages: not opened, UNVERIFIED.

## 2. Google Material Design 3
Sources: https://m3.material.io/ pages (all JavaScript-only, content did not render: foundations/designing/structure, color-contrast, customization, adaptive-design, bidirectionality); https://support.google.com/accessibility/android/answer/7101858 ; https://developers.google.com/fonts/docs/material_symbols
- (f) Google's Android accessibility help page recommends touch targets of at least 48x48 dp (about 9 mm), spaced 8 dp or more apart; padding around a small icon can count toward the target (support.google.com page). This is the Google accessibility help page, not an M3 page.
- (a) M3 theming, dark theme and dynamic colour guidance: UNVERIFIED (page did not render).
- (b) M3 bidirectionality/RTL rules: UNVERIFIED (page did not render; the older Material 2 page also did not render).
- (c)(d)(e)(g)(h) M3 form, chip/badge, table, motion, empty-state guidance: UNVERIFIED.
- Icons: Material Symbols are Apache-2.0 and the font guide says to self-host the file and write your own `@font-face` (developers.google.com page). See licence inventory.
- Action to resolve: have a person read the M3 pages in a browser and paste the relevant text, or drop M3 as a source.

## 3. Microsoft Fluent 2
Sources: https://fluent2.microsoft.design/accessibility , /layout , /iconography ; https://learn.microsoft.com/en-us/globalization/fonts-layout/mirroring
- (f) Layout page: keep touch targets at least 44x44 on iOS and web and 48x48 on Android.
- (a)(contrast) Accessibility page: text 4.5:1, large text 3:1 (18.5 px bold or 24 px regular), non-text and icons 3:1; reflow without horizontal scroll at 400% zoom (design down to 320 px); support text zoom to 200%.
- (e) Layout page lists size classes: small 320-479, medium 480-639, large 640-1023, x-large 1024-1365, xx-large 1366-1919, xxx-large 1920+; techniques: reposition, resize, reflow, show/hide, re-architect.
- (b) Fluent 2 pages themselves say nothing on RTL (the layout page's advice assumes left-to-right order). The Microsoft Learn mirroring page says: mirror edit-control behaviour, handles and pull-down buttons; put a needed scroll bar on the left; keep media-player icons (fast-forward, rewind) unmirrored; not all images/icons should be mirrored. It gives no rule for numbers or charts.
- (g) Reduced motion: not covered on the accessibility page (UNVERIFIED elsewhere).
- Icons: "system icons" are open source under MIT per the iconography page; no RTL rules there.

## 4. IBM Carbon
Sources: https://carbondesignsystem.com/patterns/forms-pattern/ , /patterns/empty-states-pattern/ , /elements/themes/overview/ , /components/tag/usage/ , /elements/motion/overview/ , /guidelines/accessibility/overview/
- (c) Validate before submit with inline client-side checks on blur; always show errors inline and clear them when fixed; error messages say what happened and how to fix it; mark only the less common field type ("(optional)" when most fields are required); on short forms disable the primary button until valid, on long forms do not; disable it after submission to prevent duplicates (forms-pattern).
- (h) Empty-state types: no data, user action (no search results), error, alternatives; use a positive title, one clear next step, avoid dead ends, rank multiple options (empty-states-pattern).
- (a) Four themes (White default, Gray 10, Gray 90, Gray 100) sharing the same token roles; the page does not say how users switch or persist (themes/overview).
- (d) Tags: read-only/dismissible/selectable/operational types; keep titles short (ideally under 20 characters); 8 px spacing; use colours or icons to distinguish categories; page does not state "never colour alone" (tag/usage).
- (g) Offer non-motion alternatives for state changes; convey the same message statically (motion/overview).
- (f)(contrast) Accessibility overview: colour themes aim for WCAG 2.1 AA contrast; touch target size not stated.
- (b) RTL/bidirectional guidance: UNVERIFIED (no page found). (e) mobile data tables: UNVERIFIED.

## 5. GitHub Primer
Sources: https://primer.style/product/ui-patterns/forms/ , /product/ui-patterns/empty-states/ , /product/ui-patterns/progressive-disclosure/ , /product/components/data-table/accessibility/
- (c) Validate on submit by default; if 3 or more errors show an interactive error summary, otherwise focus the first invalid input; after first validation switch to inline validation as the user types; show a loading indicator when validation may exceed 1 second; mark required fields visibly and in code; placeholders cannot replace labels (forms).
- (h) Empty states: one primary action (start a creation flow for unused features; lead to a fix for errors), optional "learn more" secondary link; titles welcoming for new features, supporting text brief (empty-states).
- (e) Data table: allow horizontal scroll with a focusable, named wrapper, use pagination, keep content unclipped at 200% zoom, test at 320x256 CSS px, buttons at least 24x24 CSS px (data-table accessibility).
- (progressive disclosure) Pair icons with text, use chevrons for collapsibles, avoid text-only toggles.
- (a) colour modes, (d) Label/badges, (f) touch-target pages: the URLs tried returned only the Primer homepage, so UNVERIFIED. (b) RTL: UNVERIFIED.

## 6. Tabler (UI kit)
Sources: https://docs.tabler.io/ui/getting-started/color-modes.md , https://docs.tabler.io/ui/getting-started/rtl.md
- (a) `tabler-theme.js` sets `data-bs-theme` on `<html>` to light, dark or auto (default auto, follows OS and updates live). Persisted in localStorage key `tabler-theme`; also settable by `?theme=dark` URL parameter or a server-rendered attribute from a cookie/account setting; stored value overrides the server value; load the script inline right after `<body>` (no defer/async) to avoid a flash of the wrong theme; if a mode is forced, offer a visible switch.
- (b) Set `dir="rtl"` on `<html>`; spacing, borders, radii use CSS logical properties; `.ms-*/.me-*/.ps-*/.pe-*/.start-*/.end-*` flip automatically; extra `*.rtl.css` builds (rtlcss) exist; caveat: `.text-start/.text-end` do not flip in plain `tabler.css`; use `rtl:ignore` comments to keep fixed elements unflipped.
- (d)(c)(e)(f)(g)(h): the badges page request failed; other Tabler component guidance not opened, UNVERIFIED.

## 7. AdminLTE and CoreUI (admin dashboards)
Sources: https://docs.adminlte.io/ ; https://github.com/ColorlibHQ/AdminLTE ; https://coreui.io/bootstrap/docs/customize/color-modes/ ; https://coreui.io/docs/getting-started/rtl/
- AdminLTE (docs index): editions for HTML/React/Vue/etc.; the index mentions dark mode only for React and Symfony editions and does not mention RTL or accessibility; the HTML RTL page request failed (UNVERIFIED). README: Bootstrap 5.3.8 base; tables via Tabulator; maintainers may change licence of future releases.
- CoreUI (a): `data-coreui-theme` on `<html>`; example toggler with Light/Dark/Auto; uses stored choice else the system preference; saved to localStorage (docs key `coreui-docs-theme`); put the script at the top of the page to reduce flicker; follows system changes only while no explicit choice is stored.
- CoreUI (b): `dir="rtl"` plus `lang="ar"` and the `coreui.rtl.min.css` build; logical utility classes (`ms-auto`); `$enable-ltr` and `$enable-rtl` allow both directions on one page.
- Dashboard patterns on mobile, badges, forms, touch sizes, motion: not opened, UNVERIFIED. CoreUI Pro features are paid (see licence file).

## 8. Pico CSS
Sources: https://picocss.com/docs/color-schemes , /docs/forms , /docs/rtl , /docs/table , /docs
- (a) Light by default; dark automatically with `prefers-color-scheme: dark`; force a scheme with `data-theme="light|dark"` on `<html>` or scope to an element; the page does not describe persistence of a user's choice (you must build it).
- (b) RTL: set `dir="rtl"` on `<html>` (example with `lang="ar"`), or on single elements.
- (c) Forms: `<small>` helper text linked by `aria-describedby`; labels via `for`/`id` or wrapping; `autocomplete` values encouraged. The forms page excerpt did not mention `aria-invalid` states (UNVERIFIED).
- Docs index states Pico CSS is no longer maintained (v2.1.1 docs): a long-term risk.
- (e) Table page has no responsive guidance (a separate "Overflow auto" page exists, not opened).

## 9. Open Props
Source: https://open-props.style/
- (a) Colour scales run light (low numbers) to dark; optional normalize/theme files follow the OS preference; optional switch imports apply a theme via `.light`, `.dark` or `data-theme` selectors.
- (g) Named media queries `--motionOK` and `--motionNotOK` for motion preference.
- (b) Examples use logical properties (`inline-size`, `margin-block`, `padding-inline-start`), which follow writing direction; no explicit RTL guidance on the page.
- Provides size tokens (`--size-1` to `--size-15`, fluid clamp sizes, `ch` widths). It is tokens, not components; no form/table/badge guidance. MIT.

## 10. W3C WCAG 2.2 and WAI-ARIA Authoring Practices
Sources: https://www.w3.org/WAI/WCAG22/Understanding/{target-size-minimum,target-size-enhanced,contrast-minimum,non-text-contrast,animation-from-interactions,redundant-entry,error-suggestion,error-prevention-legal-financial-data,accessible-authentication-minimum,reflow,status-messages,consistent-help,focus-not-obscured-minimum,use-of-color,labels-or-instructions,dragging-movements,timing-adjustable}.html ; https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- (f) 2.5.8 Target Size (Minimum), AA: 24x24 CSS px, with exceptions (spacing circle, equivalent control, inline, user-agent, essential). 2.5.5 Target Size (Enhanced) is AAA: 44x44 CSS px.
- Contrast: 1.4.3 AA 4.5:1 normal text, 3:1 large text (18 pt / 14 pt bold); 1.4.11 3:1 for UI components and graphics, not rounded.
- (g) 2.3.3 Animation from Interactions is AAA: interaction-triggered motion must be disableable; techniques use `prefers-reduced-motion`.
- (c) 3.3.7 Redundant Entry (A): in a multi-step process, auto-populate or let users select information already given. 3.3.3 Error Suggestion (AA). 3.3.4 Error Prevention for legal/financial/data (AA): reversible, checked, or confirmed. 3.3.2 Labels or Instructions (A). 3.3.8 Accessible Authentication Minimum (AA): no cognitive-function test without an alternative (password-manager/paste support counts). 2.2.1 Timing Adjustable (A): session limits need off/extend/warn options.
- (e) 1.4.10 Reflow (AA): 320 CSS px width without 2-D scrolling; data tables are excepted for the parts needing 2-D layout, but headings, search, pagination are not.
- (d) 1.4.1 Use of Color (A): colour cannot be the only cue, add shape/text. 4.1.3 Status Messages (AA): announce via role/properties without moving focus (use for save-draft and review-state changes).
- Other: 3.2.6 Consistent Help (A), 2.4.11 Focus Not Obscured (Minimum) (AA, sticky bars/footers must not hide focus), 2.5.7 Dragging Movements (AA, single-pointer alternative for drag).
- APG keyboard page: one tab stop per composite widget, roving tabindex or aria-activedescendant, rely on DOM order and avoid positive tabindex, return focus to a logical element after dialogs close.
- (a)(b)(d)(h) as such: WCAG does not prescribe theming, RTL or badge design.

## Comparison table (as stated by each source)
| Source | Touch / target size | Text contrast | Non-text contrast | Page URL |
|---|---|---|---|---|
| WCAG 2.2 | 24x24 CSS px (AA, 2.5.8); 44x44 CSS px (AAA, 2.5.5) | 4.5:1 normal, 3:1 large (AA) | 3:1 | w3.org Understanding pages above |
| Apple HIG | iOS default 44x44 pt, minimum 28x28 pt; ~12 pt padding around bezeled controls | 4.5:1 up to 17 pt, 3:1 at 18 pt or bold (WCAG AA values); dark-mode page: min 4.5:1, aim 7:1 | not stated separately | HIG accessibility.md, dark-mode.md |
| Google (Android accessibility help, not an M3 page) | 48x48 dp, spaced 8 dp+ | not on that page; M3 UNVERIFIED | - | support.google.com/accessibility/android/answer/7101858 |
| Microsoft Fluent 2 | 44x44 iOS/web, 48x48 Android | 4.5:1 / 3:1 large | 3:1 | fluent2 /layout, /accessibility |
| IBM Carbon | not stated | themes aim at WCAG 2.1 AA | not stated | /guidelines/accessibility/overview/ |
| GitHub Primer | 24x24 CSS px for DataTable buttons; general touch-target page UNVERIFIED | not retrieved | not retrieved | /product/components/data-table/accessibility/ |
| Tabler, AdminLTE, CoreUI, Pico, Open Props | not stated in pages opened | not stated | not stated | - |

## What ADAM should adopt / adapt / avoid (max 15)
1. Adopt: three-state theme (System / Light / Dark), default System, stored choice overrides, applied by an inline head script before first paint (Tabler, CoreUI patterns). Adapt: Apple advises against in-app appearance settings, so keep the switch discoverable but never required.
2. Adopt: persist the theme in localStorage inside try/catch plus, for signed-in users, in the profile (Tabler lists cookie/account as an option); localStorage can be empty in private windows.
3. Adopt: use CSS logical properties everywhere (`margin-inline-*`, `inset-inline-*`, `text-align: start`) plus `dir`/`lang` on `<html>` (Tabler, CoreUI, Pico, Open Props).
4. Adopt: mirror navigation arrows, progress bars, sliders, step indicators; do NOT mirror digits, phone numbers, logos, check marks, photos, media play/rewind icons, clocks (Apple HIG, Microsoft Learn). Charts: no source opened gave a rule (UNVERIFIED): decide with a bilingual reviewer.
5. Adopt: Arabic numerals policy decided per locale (HIG: Western or Eastern numerals vary by region); keep it consistent and user-visible.
6. Adopt: touch targets at least 44x44 CSS px for primary controls (Apple, Fluent, WCAG AAA) and never below WCAG 2.5.8's 24x24 px with spacing; use 48 px where cheap (Google).
7. Adopt: contrast 4.5:1 text, 3:1 UI parts, in BOTH themes, with the green #22C55E checked as text and as a button fill (not computed here; verify with a contrast tool).
8. Adopt: wizard rules - one task per screen, Next enabled only when required data is valid (Apple), validate on blur then inline (Carbon/Primer), error summary for 3+ errors (Primer), never ask twice for the same data (WCAG 3.3.7), confirm/review before final submit (WCAG 3.3.4), save drafts and announce "saved" with a status message (WCAG 4.1.3).
9. Adopt: status/trust badges must carry text or an icon, not colour alone (WCAG 1.4.1, Carbon tags), short labels (Carbon: under 20 characters), consistent spacing.
10. Adopt: mobile tables - horizontal scroll wrapper with keyboard focus and an accessible name, or switch to stacked cards under 640 px; reflow rule has a data-table exception (WCAG 1.4.10, Primer).
11. Adopt: respect `prefers-reduced-motion`: replace slides/zooms with fades or nothing; no information carried by motion alone (Apple, Carbon, Open Props, WCAG 2.3.3).
12. Adopt: empty states with a positive title, one primary next action, optional secondary link, no dead ends (Carbon, Primer).
13. Adapt: Pico/Open Props are fine as small CSS bases, but Pico is unmaintained; prefer owning your own tokens.
14. Avoid: Segoe UI/SF fonts, SF Symbols art, Fluent/Material/Carbon sample imagery, GitHub/IBM/Apple logos (see licence file).
15. Avoid: relying on M3/Primer pages that did not load; get a human to read them before quoting.

## Do not copy
- Apple SF Symbols, SF fonts, Apple logos/product images; HIG text and illustrations.
- Google Material Design 3 imagery and docs text (terms UNVERIFIED); third-party logos are not in Material Symbols anyway.
- Microsoft Segoe UI, Fluent 2 imagery/text, Microsoft product launch icons.
- IBM product icons with registered marks, IBM logo, Carbon docs imagery and text.
- GitHub logos, Octocat/Invertocat.
- Remix Icon glyphs as a logo; CoreUI Pro code/templates without a licence; AdminLTE demo images.
