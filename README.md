# Analytics Dashboard Demo

демо-реконструкция подхода на синтетических данных

HTML/JS dashboard with Chart.js, segment filtering, an accessible source ledger and CSV export.
60 fictional deal rows are derived from the flagship's generated data. No employer metrics or records.
Open `index.html` directly or run `python -m http.server 8000`. No build or secrets required.

## GitHub Pages

After creating this public repository, enable Pages source = GitHub Actions in Settings / Pages.
The included workflow deploys the current tree. The live URL will be returned by GitHub after deployment;
no live URL is claimed by this local package. Chart.js loads from a pinned public CDN URL; offline users
still get filters, totals, table and export. Self-host the library if a fully offline chart is required.
MIT.
