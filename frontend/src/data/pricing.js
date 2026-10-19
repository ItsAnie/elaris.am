/**
 * ELARIS Pricing Packages Data
 * Stored separately and fully translatable
 */
export const pricingData = [
  {
    id: "start",
    name: "START",
    key: "start",
    priceAMD: 10000,
    econom: true,
    popular: false,
    bespoke: false,
    badgeColor: "bg-elaris-bg-secondary text-elaris-text",
    featuresCount: 6
  },
  {
    id: "elegant",
    name: "CLASSIC",
    key: "elegant",
    priceAMD: 13000,
    popular: true,
    econom: false,
    bespoke: false,
    badgeColor: "bg-elaris-accent text-white",
    featuresCount: 7
  },
  {
    id: "signature",
    name: "SIGNATURE",
    key: "signature",
    priceAMD: 26000,
    econom: false,
    popular: false,
    bespoke: true,
    badgeColor: "bg-elaris-gold text-white",
    featuresCount: 7
  }
];

export default pricingData;
