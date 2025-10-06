# R_Arc_Demo_Site

This site is now mobile-responsive.

Breakpoints used:
- <= 992px: Stack main content columns; scale header and testimonials
- <= 768px: Compact nav and cards; reduce paddings
- <= 480px: Phone-friendly typography and spacing

Notes:
- Images and media are constrained to max-width: 100% to prevent overflow.
- Navigation bar horizontally scrolls on very narrow screens instead of wrapping awkwardly.
- On the Create Yours page, the diagonal feature panel simplifies on small screens for readability.

Adjusting styles
- Global styles live in `css/styles.css`.
- Page-specific overrides are in their respective files under `css/`.

To test locally, open `index.html` and use your browser devtools responsive mode.