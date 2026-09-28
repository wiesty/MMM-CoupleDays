const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const moment = require("moment");
const english = require("../translations/en.json");
const german = require("../translations/de.json");

const source = fs.readFileSync(path.join(__dirname, "../MMM-CoupleDays.js"), "utf8");
const context = {
  moment,
  Module: {
    register (name, definition) {
      this.definition = definition;
    }
  }
};
vm.runInNewContext(source, context);

function createModule (start, end, translations = english) {
  return {
    ...context.Module.definition,
    startDate: moment(start),
    endDate: moment(end),
    translate (key) {
      assert.ok(Object.hasOwn(translations, key), `Unknown translation key: ${key}`);
      return translations[key];
    }
  };
}

const cases = [
  ["issue #16: thirty years minus one day", "1996-09-28", "2026-09-27", "29 years  11 months and 30 days"],
  ["same date", "2026-09-28", "2026-09-28", "0 months and 0 days"],
  ["one day", "2026-09-27", "2026-09-28", "0 months and 1 day"],
  ["short February", "2023-01-31", "2023-02-28", "1 month and 0 days"],
  ["leap February", "2024-01-31", "2024-02-29", "1 month and 0 days"],
  ["before a month-end anniversary", "2023-03-31", "2023-04-29", "0 months and 29 days"],
  ["after a short month", "2023-01-31", "2023-03-30", "1 month and 30 days"],
  ["leap-day anniversary", "2020-02-29", "2021-02-28", "1 year  0 months and 0 days"],
  ["month after a leap-day anniversary", "2020-02-29", "2021-03-29", "1 year  1 month and 0 days"],
  ["multiple leap years", "1996-09-28", "2026-09-28", "30 years  0 months and 0 days"],
  ["spring clock change", "2024-03-01", "2024-04-02", "1 month and 1 day"],
  ["autumn clock change", "2024-10-01", "2024-11-02", "1 month and 1 day"]
];

for (const [label, start, end, expected] of cases) {
  test(label, () => {
    const instance = createModule(start, end);
    instance.currentView = {key: "total"};
    assert.equal(instance.getFormattedDuration(), expected);
    assert.equal(instance.getFormattedDuration(), expected);
    assert.equal(instance.startDate.format("YYYY-MM-DD"), start);
    assert.equal(instance.endDate.format("YYYY-MM-DD"), end);
  });
}

test("years view uses calendar days before the first anniversary", () => {
  const instance = createModule("2024-01-01", "2024-03-02");
  instance.currentView = {key: "years"};
  assert.equal(instance.getFormattedDuration(), "2 months 1 day");
});

test("years view retains singular and plural years", () => {
  assert.equal(createModule("2025-09-28", "2026-09-28").formatYears(), "1 year");
  assert.equal(createModule("2024-09-28", "2026-09-28").formatYears(), "2 years");
});

test("German translations retain singular and plural calendar units", () => {
  const instance = createModule("2025-08-27", "2026-09-28", german);
  assert.equal(instance.formatTotal(), "1 Jahr  1 Monat und 1 Tag");
  const underOneYear = createModule("2024-01-01", "2024-03-02", german);
  assert.equal(underOneYear.formatTotal(), "2 Monate und 1 Tag");
  assert.equal(underOneYear.formatYears(), "2 Monate 1 Tag");
});

test("day, week and month views still show their elapsed totals", () => {
  const instance = createModule("2024-01-01", "2024-03-02");
  for (const [key, expected] of [["days", "61 days"], ["weeks", "8 weeks"], ["months", "2 months"]]) {
    instance.currentView = {key};
    assert.equal(instance.getFormattedDuration(), expected);
  }
});
