// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please see the guide for more information: https://stryker-mutator.io/docs/stryker-js/guides/react",
  testRunner: "jest",
  reporters: ["progress", "clear-text", "html", "dashboard"],
  coverageAnalysis: "perTest",
  thresholds: { high: 90, low: 88, break: null},
  jest: {
    projectType: "create-react-app",
  },
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories|styled|tw).ts?(x)',
  ]
};
export default config;
