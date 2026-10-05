/**
 * ELARIS Pricing Packages Data
 * Stored separately and fully translatable
 */
export const pricingData = [
  {
    id: "start",
    name: "START",
    key: "start",
    priceAMD: 11000,
    popular: false,
    bespoke: false,
    badgeColor: "bg-elaris-bg-secondary text-elaris-text",
    featuresCount: 6
  },
  {
    id: "elegant",
    name: "ELEGANT",
    key: "elegant",
    priceAMD: 15000,
    popular: true,
    bespoke: false,
    badgeColor: "bg-elaris-accent text-white",
    featuresCount: 7
  },
  {
    id: "signature",
    name: "SIGNATURE",
    key: "signature",
    priceAMD: 26000,
    popular: false,
    bespoke: true,
    badgeColor: "bg-elaris-gold text-white",
    featuresCount: 7
  }
];

export default pricingData;
