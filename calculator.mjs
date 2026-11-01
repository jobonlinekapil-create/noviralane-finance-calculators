/** Pure, currency-neutral arithmetic. All amounts must use the same currency. */
function nonNegativeFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new RangeError(`${label} must be a finite, non-negative number.`);
  }
  return number;
}

export function freelanceHourlyFloor({ income, costs, reserve, hours }) {
  const target = nonNegativeFinite(income, 'Income target');
  const expenses = nonNegativeFinite(costs, 'Business costs');
  const buffer = nonNegativeFinite(reserve, 'Reserve');
  const billableHours = nonNegativeFinite(hours, 'Billable hours');
  if (billableHours === 0) throw new RangeError('Billable hours must be greater than zero.');
  return (target + expenses + buffer) / billableHours;
}

export function cashRunway({ cash, inflow, outflow }) {
  const balance = nonNegativeFinite(cash, 'Available cash');
  const monthlyInflow = nonNegativeFinite(inflow, 'Monthly inflow');
  const monthlyOutflow = nonNegativeFinite(outflow, 'Monthly outflow');
  const burn = monthlyOutflow - monthlyInflow;
  if (burn <= 0) return { burn: 0, months: null };
  return { burn, months: balance / burn };
}
