import { Row } from 'styled-bootstrap-grid'

import Input from '@/components/Input'
import Toggle from '@/components/Toggle'
import FormGroup from '@/components/FormGroup'
import Tooltip from '../Tooltip'
import { isRequired, minNumber, maxNumber } from '@/utils/validate'

export const validationRules = {
  percentageBenefitsCost: [(key, value, data) => {
    let error = null

    if (data.payBenefits !== true) {
      return error // no error
    }

    error = isRequired(key, value)

    if (!error) {
      return minNumber(0)(key, value)
    }

    return error
  }],
  percentageChildrenReceivingSubsidy: [isRequired, minNumber(0), maxNumber(100)],
  rentOrMortageCost: [isRequired, minNumber(0)],
  collectionsRate: [isRequired, minNumber(0), maxNumber(100)],
}

const StepTwo = ({ data, onDataChange, errors, isMobile = false, show = false }) => {
  if (!show) {
    return null
  }

  const handleInputChange = ({ target }) => {
    onDataChange?.(target.name, target.value)
  }

  return (
    <>
      <Row>
        <FormGroup lg={4}>
          <Toggle label='Do you plan to pay benefits?' checked={!!data.payBenefits} onChange={({ target }) => onDataChange?.('payBenefits', target.checked)} />
        </FormGroup>
        <FormGroup lg={8} error={errors.percentageBenefitsCost}>
          <Input
            name='percentageBenefitsCost'
            type='number'
            sufix='%'
            label='What % of salaries will your benefits cost?'
            disabled={!data.payBenefits}
            min={0}
            max={100}
            value={data.percentageBenefitsCost}
            onChange={handleInputChange}
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={12} error={errors.percentageChildrenReceivingSubsidy}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input
              name='percentageChildrenReceivingSubsidy'
              type='number'
              sufix='%'
              label='Percentage of subsidy students'
              min={0}
              max={100}
              value={data.percentageChildrenReceivingSubsidy}
              onChange={handleInputChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='Percent of students receiving the Working Connections Child Care Subsidy.' />
          </div>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={6} error={errors.rentOrMortageCost}>
          <Input
            name='rentOrMortageCost'
            type='number'
            sufix='$'
            label='Monthly rent/mortgage cost, if known'
            min={0}
            value={data.rentOrMortageCost}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.collectionsRate}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input
              name='collectionsRate'
              type='number'
              sufix='%'
              label='Collections rate'
              min={0}
              max={100}
              value={data.collectionsRate}
              onChange={handleInputChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='Percentage of fee reveneu ultimately collected.' />
          </div>
        </FormGroup>
      </Row>
    </>
  )
}

export default StepTwo
