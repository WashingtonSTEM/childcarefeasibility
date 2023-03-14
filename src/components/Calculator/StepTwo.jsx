import { Row } from 'styled-bootstrap-grid'

import Input from '@/components/Input'
import Toggle from '@/components/Toggle'
import FormGroup from '@/components/FormGroup'

const StepTwo = ({ data, onDataChange, show = false }) => {
  if (!show) {
    return null
  }

  return (
    <>
      <Row>
        <FormGroup lg={4}>
          <Toggle label='Do you plan to pay benefits?' onChange={({ target }) => onDataChange('payBenefits', target.checked)} />
        </FormGroup>
        <FormGroup lg={8}>
          <Input type='number' label='What % of salaries do your benefits cost?' disabled={!data.payBenefits} />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={12}>
          <Input type='number' sufix='%' label='Percentage of children receiving the Working Connections Child Care Subsidy' />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={6}>
          <Input type='number' sufix='$' label='Monthly rent/mortgage cost if known' />
        </FormGroup>
        <FormGroup lg={3}>
          <Toggle label='Summer schedule?' />
        </FormGroup>
        <FormGroup lg={3}>
          <Input type='number' sufix='%' label='Collections rate' />
        </FormGroup>
      </Row>
    </>
  )
}

export default StepTwo
