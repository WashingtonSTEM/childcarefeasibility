import IconButton from '../components/IconButton'

import '../styles/globals.css'

const Story = {
  title: 'Icon Button',
  component: IconButton,
  argTypes: {
    variant: {
      control: false,
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    }
  },
}

const Template = (args) => <IconButton {...args}>
  <svg width="6" height="15" viewBox="0 0 6 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5C1.5 1.10218 1.65804 0.720644 1.93934 0.43934C2.22064 0.158035 2.60218 0 3 0C3.39782 0 3.77936 0.158035 4.06066 0.43934C4.34196 0.720644 4.5 1.10218 4.5 1.5C4.5 1.89782 4.34196 2.27936 4.06066 2.56066C3.77936 2.84196 3.39782 3 3 3C2.60218 3 2.22064 2.84196 1.93934 2.56066C1.65804 2.27936 1.5 1.89782 1.5 1.5ZM0 6C0 5.44688 0.446875 5 1 5H3C3.55312 5 4 5.44688 4 6V13H5C5.55312 13 6 13.4469 6 14C6 14.5531 5.55312 15 5 15H1C0.446875 15 0 14.5531 0 14C0 13.4469 0.446875 13 1 13H2V7H1C0.446875 7 0 6.55312 0 6Z" fill="white" />
  </svg>
</IconButton>

const defaulrArgs = {
  disabled: false,
  textAlign: 'center',
}

export const Primary = Template.bind({})
Primary.args = defaulrArgs

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  ...defaulrArgs
}

export const CustomBackground = Template.bind({})
CustomBackground.args = {
  variant: 'secondary',
  backgroundColor: 'green',
  ...defaulrArgs
}

export default Story
