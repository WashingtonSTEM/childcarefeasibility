import { Row } from 'styled-bootstrap-grid'
import { useIntl } from 'react-intl'

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
  educationProgramExpenses: [isRequired, minNumber(0)],
  programManagementChild: [isRequired, minNumber(0)]
}

const StepTwo = ({ data, onDataChange, errors, isMobile = false, show = false }) => {
  const intl = useIntl()

  if (!show) {
    return null
  }

  const handleInputChange = ({ target }) => {
    onDataChange?.(target.name, target.value)
  }

  return (
    <>
      <Row>
        <FormGroup lg={4} style={ { display: 'flex' } }>
          <Toggle
            label={intl.formatMessage({ id: 'S2_PAY_BENEFITS' })}
            checked={!!data.payBenefits}
            onChange={({ target }) => onDataChange?.('payBenefits', target.checked)}
          />
        </FormGroup>
        <FormGroup lg={8} error={errors.percentageBenefitsCost}>
          <Input
            name='percentageBenefitsCost'
            type='number'
            sufix='%'
            label={intl.formatMessage({ id: 'S2_BENEFITS_COST' })}
            disabled={!data.payBenefits}
            min={0}
            max={100}
            value={data.percentageBenefitsCost}
            onChange={handleInputChange}
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={6} error={errors.percentageChildrenReceivingSubsidy}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='percentageChildrenReceivingSubsidy'
              type='number'
              sufix='%'
              label={intl.formatMessage({ id: 'S2_SUBSIDY' })}
              min={0}
              max={100}
              value={data.percentageChildrenReceivingSubsidy}
              onChange={handleInputChange}
              disabled={data.earlyAchieversLevel === '0'}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S2_SUBSIDY_TOOLTIP' })} />
          </div>
        </FormGroup>
        <FormGroup lg={6} error={errors.educationProgramExpenses}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='educationProgramExpenses'
              type='number'
              sufix='$'
              label={intl.formatMessage({ id: 'S2_EDUCATION_PROGRAM_EXPENSES' })}
              min={0}
              max={100}
              value={data.educationProgramExpenses}
              onChange={handleInputChange}
            />
            <Tooltip
              trigger={isMobile ? 'click' : 'hover'}
              tooltipText={
                data.typeOfFacility === 'Center-Based' ?
                  (
                    <>
                      {intl.formatMessage({ id: 'S2_EDUCATION_PROGRAM_EXPENSES_TOOLTIP_CB' })}
                    </>
                  ) : (
                    <>
                      {intl.formatMessage({ id: 'S2_EDUCATION_PROGRAM_EXPENSES_TOOLTIP_FCC' })}
                    </>
                  )
              }
            />
          </div>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={6} error={errors.rentOrMortageCost}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='rentOrMortageCost'
              type='number'
              sufix='$'
              label={intl.formatMessage({ id: 'S2_RENT_COST' })}
              min={0}
              value={data.rentOrMortageCost}
              onChange={handleInputChange}
            />
            <Tooltip
              trigger={isMobile ? 'click' : 'hover'}
              tooltipText={
                data.typeOfFacility === 'Center-Based' ?
                  (
                    <>
                      {intl.formatMessage({ id: 'S2_RENT_COST_TOOLTIP_1' })}
                    </>
                  ) : (
                    <>
                      {intl.formatMessage({ id: 'S2_RENT_COST_TOOLTIP_2' })}
                    </>
                  )
              }
            />
          </div>

        </FormGroup>
        <FormGroup lg={6} error={errors.collectionsRate}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='collectionsRate'
              type='number'
              sufix='%'
              label={intl.formatMessage({ id: 'S2_COLLECTIONS_RATE' })}
              min={0}
              max={100}
              value={data.collectionsRate}
              onChange={handleInputChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S2_COLLECTIONS_RATE_TOOLTIP' })} />
          </div>
        </FormGroup>
      </Row>

      <Row>
        <FormGroup lg={12} error={errors.programManagementChild}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='programManagementChild'
              type='number'
              sufix='$'
              label={intl.formatMessage({ id: 'S2_MANAGEMENT_CHILD' })}
              min={0}
              value={data.programManagementChild}
              onChange={handleInputChange}
            />
            <Tooltip
              trigger={isMobile ? 'click' : 'hover'}
              tooltipText={
                data.typeOfFacility === 'Center-Based' ?
                  (
                    <>
                      {intl.formatMessage({ id: 'S2_MANAGEMENT_CHILD_TOOLTIP_CB' })}
                    </>
                  ) : (
                    <>
                      {intl.formatMessage({ id: 'S2_MANAGEMENT_CHILD_TOOLTIP_FCC' })}
                    </>
                  )
              }
            />
          </div>

        </FormGroup>
      </Row>
    </>
  )
}

export default StepTwo
