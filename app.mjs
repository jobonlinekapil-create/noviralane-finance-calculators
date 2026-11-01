import { freelanceHourlyFloor, cashRunway } from './calculator.mjs';

const pricingForm = document.querySelector('#pricing-form');
const runwayForm = document.querySelector('#runway-form');

function amount(form, name) {
  const input = form.elements.namedItem(name);
  if (!(input instanceof HTMLInputElement)) throw new Error(`Missing ${name} input.`);
  return Number(input.value);
}

function show(result, message, isError = false) {
  result.textContent = message;
  result.dataset.error = String(isError);
}

pricingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = document.querySelector('#pricing-result');
  try {
    const floor = freelanceHourlyFloor({
      income: amount(pricingForm, 'income'), costs: amount(pricingForm, 'costs'),
      reserve: amount(pricingForm, 'reserve'), hours: amount(pricingForm, 'hours'),
    });
    show(result, `Hourly starting floor: ${floor.toFixed(2)} in your chosen currency. Review your market, scope and local obligations before quoting.`);
  } catch (error) {
    show(result, error.message, true);
  }
});

runwayForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = document.querySelector('#runway-result');
  try {
    const { burn, months } = cashRunway({
      cash: amount(runwayForm, 'cash'), inflow: amount(runwayForm, 'inflow'),
      outflow: amount(runwayForm, 'outflow'),
    });
    show(result, months === null
      ? 'No current monthly cash burn from these inputs. Recheck if income or costs change.'
      : `Estimated runway: ${months.toFixed(1)} months at a monthly net outflow of ${burn.toFixed(2)} in your chosen currency.`);
  } catch (error) {
    show(result, error.message, true);
  }
});
