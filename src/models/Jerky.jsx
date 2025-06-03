//DATA!!!
//  Flavor and size options for your UI (value + label)
export const flavors = [
  { value: 'spicy_sweet_garlic', label: 'Spicy Sweet Garlic' },
  { value: 'lemongrass',       label: 'Lemongrass'       },
  { value: 'mild',              label: 'Mild'              },
  { value: 'ghost_pepper',      label: 'Ghost Pepper'      },
];

export const bagSizes = [
  { value: 'small',  label: 'Small Bag (2 oz)'  },
  { value: 'medium', label: 'Medium Bag (4 oz)' },
  { value: 'large',  label: 'Large Bag (8 oz)'  },
  { value: 'family', label: 'Family Pack (16 oz)'},
];

// Product image paths
const productImages = {
  spicy_sweet_garlic: {
    small:  '/images/jerky_spicy_small.png',
    medium: '/images/jerky_spicy_medium.png',
    large:  '/images/jerky_spicy_large.png',
    family: '/images/jerky_spicy_family.png',
  },
  lemongrass: {
    small:  '/images/jerky_lemongrass_small.png',
    medium: '/images/jerky_lemongrass_medium.png',
    large:  '/images/jerky_lemongrass_large.png',
    family: '/images/jerky_lemongrass_family.png',
  },
  mild: {
    small:  '/images/jerky_mild_small.png',
    medium: '/images/jerky_mild_medium.png',
    large:  '/images/jerky_mild_large.png',
    family: '/images/jerky_mild_family.png',
  },
  ghost_pepper: {
    small:  '/images/jerky_ghost_small.png',
    medium: '/images/jerky_ghost_medium.png',
    large:  '/images/jerky_ghost_large.png',
    family: '/images/jerky_ghost_family.png',
  },
};

// Product pricing by flavor and size
export const productPrices = {
  spicy_sweet_garlic: { small: 17, medium: 25, large: 35, family: 60 },
  lemongrass:          { small: 17, medium: 25, large: 35, family: 60 },
  mild:                { small: 17, medium: 25, large: 35, family: 60 },
  ghost_pepper:        { small: 18, medium: 27, large: 38, family: 65 },
};

//Data END--------------------------------------------------------


//Jerky beginsss saaaar (^_<)

export default class Jerky {
  // Pull the raw value arrays out for validation
  static availableFlavorValues = flavors.map(f => f.value);
  static availableSizeValues   = bagSizes.map(s => s.value);

  constructor(flavor, description, size = null) {
    if (!Jerky.availableFlavorValues.includes(flavor)) {//May be slightly redundent since we are making our declerations of the flavors kindaaaa but whattebre
      throw new Error(`Invalid flavor: ${flavor}`);
    }
    this.flavor      = flavor;
    this.description = description;
    this.size        = size;
  }

  // Read‑only accessors
  getFlavor()      { return this.flavor; }
  getDescription() { return this.description; }
  getSize()        { return this.size; }

  // Allow setting size later, with validation
  setSize(sz) {
    if (!Jerky.availableSizeValues.includes(sz)) {
      throw new Error(`Invalid size: ${sz}`);
    }
    this.size = sz;
  }

  // Return the image URL for the current size
  getImage() {
    if (!this.size) {
      throw new Error(`Size not set for ${this.flavor}`);
    }
    return productImages[this.flavor][this.size];
  }

  // Return the price for the current size
  getPrice() {
    if (!this.size) {
      throw new Error(`Size not set for ${this.flavor}`);
    }
    return productPrices[this.flavor][this.size];
  }
}


// Intialization of the 4 flavor's as objects
export const spicyGarlicJerky = new Jerky(
  'spicy_sweet_garlic',
  'Savory garlic meets a kick of heat in every chewy bite.',
  'small'
);

export const lemongrassJerky = new Jerky(
  'lemongrass',
  'Bright, citrusy lemongrass over tender marinated beef slices.',
  'small'
);

export const mildJerky = new Jerky(
  'mild',
  'A perfectly balanced, lightly seasoned classic beef jerky.',
  'small'
);

export const ghostPepperJerky = new Jerky(
  'ghost_pepper',
  'For the true spice seeker—intense ghost pepper scorch in every strip.',
  'small'
);

// Export an array for easy iteration in your UI Also easier to import then each individual object
export const jerkyCatalog = [
  spicyGarlicJerky,
  lemongrassJerky,
  mildJerky,
  ghostPepperJerky,
];
