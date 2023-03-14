export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'figma',
    values: [
      {
        name: 'figma',
        value: '#4E4E4E'
      },
      {
        name: 'white',
        value: 'white'
      },
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}