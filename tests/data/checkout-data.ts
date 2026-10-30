export const credentials = {
  username: process.env.SAUCEDEMO_USERNAME ?? 'standard_user',
  password: process.env.SAUCEDEMO_PASSWORD ?? 'secret_sauce',
};

export const products = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
  },
} as const;

export const checkoutInformation = {
  firstName: 'QA',
  lastName: 'Tester',
  postalCode: '12345',
} as const;

export const checkoutRoutes = {
  inventory: /inventory\.html$/,
  cart: /cart\.html$/,
  information: /checkout-step-one\.html$/,
  overview: /checkout-step-two\.html$/,
  confirmation: /checkout-complete\.html$/,
} as const;
