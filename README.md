# NoviraLane Finance Calculators

Small, browser-based calculators for freelance pricing and cash runway. The formulas are transparent, the interface works without accounts or tracking, and all inputs stay in the visitor's browser.

This is an early open-source release. It does not claim a user base, downloads, or endorsement. Feedback and contributions are welcome.

## Calculators

- **Freelance hourly floor:** `(annual income target + annual business costs + annual reserve) / annual billable hours`. This is a starting floor, not a market quote. The reserve is a user-defined buffer; it is not a tax calculation.
- **Cash runway:** `available cash / monthly net cash outflow`. If inflows meet or exceed outflows, the result is shown as “no current burn” rather than an infinite number of months.

Open `index.html` in a modern browser. No build step or external dependencies are needed. Run the arithmetic tests with `node --test` (Node.js 20 or newer).

## Limits

Results are estimates from your inputs. They do not include country-specific taxes, VAT/GST, debt terms, inflation, payment delays or legal requirements. Use your local currency consistently. This project provides general education and does not provide personal financial, tax or legal advice.

## Development

The source is deliberately small: `calculator.mjs` contains pure functions, `app.mjs` handles the form, and `index.html` contains the accessible interface. Please open an issue describing a bug or propose a pull request with tests and a short explanation of the formula change. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
