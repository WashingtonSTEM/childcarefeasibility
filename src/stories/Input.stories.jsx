import Input from "../components/Input"

import '../styles/globals.css'

const Story = {
  title: 'Input',
  component: Input,
  argTypes: {
    
  },
}

const Template = (args) => (
  <div style={{ width: '50%' }}>
    <Input {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  value: '',
  disabled: false
}

export const WithSufix = Template.bind({})
WithSufix.args = {
  value: '',
  sufix: '$',
  disabled: false
}



export default Story
