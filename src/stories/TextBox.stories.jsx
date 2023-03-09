import TextBox from '../components/TextBox'

import '../styles/globals.css'

const Story = {
  title: 'Text Box',
  component: TextBox,
  argTypes: {},
}

const Template = (args) => (
  <div style={{ width: '50%' }}>
    <TextBox>{args.text}</TextBox>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  text: 'This is the text',
}

export default Story
