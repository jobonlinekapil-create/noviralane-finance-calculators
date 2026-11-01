import test from 'node:test';
import assert from 'node:assert/strict';
import { freelanceHourlyFloor, cashRunway } from './calculator.mjs';

test('hourly floor includes all annual targets', () => {
  assert.equal(freelanceHourlyFloor({ income: 50000, costs: 10000, reserve: 5000, hours: 1000 }), 65);
});

test('hourly floor rejects zero hours and invalid inputs', () => {
  assert.throws(() => freelanceHourlyFloor({ income: 1, costs: 0, reserve: 0, hours: 0 }), RangeError);
  assert.throws(() => freelanceHourlyFloor({ income: -1, costs: 0, reserve: 0, hours: 1 }), RangeError);
});

test('cash runway uses net outflow', () => {
  assert.deepEqual(cashRunway({ cash: 12000, inflow: 2000, outflow: 5000 }), { burn: 3000, months: 4 });
});

test('cash runway handles no burn and empty cash', () => {
  assert.deepEqual(cashRunway({ cash: 1000, inflow: 500, outflow: 500 }), { burn: 0, months: null });
  assert.deepEqual(cashRunway({ cash: 0, inflow: 0, outflow: 100 }), { burn: 100, months: 0 });
});
