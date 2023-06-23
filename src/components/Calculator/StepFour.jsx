import { useMemo } from 'react'
import { Row } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'

import Input from '@/components/Input'
import Toggle from '@/components/Toggle'
import Tooltip from '@/components/Tooltip'
import TextBox from '@/components/TextBox'
import FormGroup from '@/components/FormGroup'
import Instructions from './Instructions'
import { isRequired, minInt, hasValue } from '@/utils/validate'
import {
  getMaximumNumberOfInfantsSupported,
  getMaximumNumberOfPreschoolers,
  getEstimatedNumberOfChildCareAdministrators,
  getEstimatedNumberOfChildCareWorkers,
  getEstimatedNumberOfPreschoolTeachers
} from '@/helpers/formulas'
import salaryData from '@/data/salary_data.json'

export const validationRules = {
  
}

const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })


const Text = styled.span`
  display: block;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-size: 14px;
  margin: 18px 0;
`

const StepFour = ({ data, onDataChange, errors, isMobile = false, show = false }) => {
  const intl = useIntl()

  const estimatedNumberOfChildCareAdministrators = useMemo(() => {
    const { typeOfFacility } = data

    if (!typeOfFacility) {
      return null
    }

    return getEstimatedNumberOfChildCareAdministrators(typeOfFacility)
  }, [data])

  const estimatedNumberOfPreschoolTeachers = useMemo(() => {
    const { typeOfFacility, numberOfClassrooms } = data

    if (!typeOfFacility || !numberOfClassrooms) {
      return null
    }

    return getEstimatedNumberOfPreschoolTeachers(typeOfFacility, numberOfClassrooms)
  }, [data])

  const estimatedNumberOfChildCareWorkers = useMemo(() => {
    const { typeOfFacility, numberOfInfants, numberOfToddlers, numberOfPreschoolers, numberOfSchoolAgeChildren } = data

    if (!typeOfFacility || !hasValue(numberOfInfants) || !hasValue(numberOfToddlers) || !hasValue(numberOfPreschoolers) || !hasValue(numberOfSchoolAgeChildren)) {
      return null
    }

    return getEstimatedNumberOfChildCareWorkers(
      typeOfFacility,
      estimatedNumberOfPreschoolTeachers,
      estimatedNumberOfChildCareAdministrators,
      numberOfInfants,
      numberOfToddlers,
      numberOfPreschoolers,
      numberOfSchoolAgeChildren
    )
  }, [data, estimatedNumberOfChildCareAdministrators, estimatedNumberOfPreschoolTeachers])

  const maximumNumberOfInfantsSupported = useMemo(() => {
    const { typeOfFacility, intendedFootage } = data

    if (!typeOfFacility || !intendedFootage) {
      return null
    }

    return getMaximumNumberOfInfantsSupported(typeOfFacility, intendedFootage)
  }, [data])

  const maximumNumberOfPreschoolers = useMemo(() => {
    const { typeOfFacility, intendedFootage } = data

    if (!typeOfFacility || !intendedFootage) {
      return null
    }

    return getMaximumNumberOfPreschoolers(typeOfFacility, intendedFootage, maximumNumberOfInfantsSupported)
  }, [data, maximumNumberOfInfantsSupported])


  const salary = salaryData.find(e => e.county === data.county)

  console.log(salary)

  if (!show) {
    return null
  }

  const handleOnChange = ({ target }) => {
    let value = parseInt(target.value)

    if (target.value === '') {
      value = null
    }
    onDataChange?.(target.name, value)
  }

  const handleInputChange = ({ target }) => {
    onDataChange?.(target.name, target.value)
  }


  return (
    <>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
        <Instructions text={intl.formatMessage({ id: 'S4_INSTRUCTIONS' })} />
      </div>


      {data.county && (
        <Text>{intl.formatMessage({ id: 'S4_INSTRUCTIONS_WAGE' }, { value: 'XX' })}</Text>        
      )}
   
      {data.typeOfFacility === 'FCC' && (
        <Text>
          <FormattedMessage id="S1_FOOTAGE_TOOLTIP_FCC" />
        </Text>
      )}

      <Row>
        <FormGroup lg={4} style={ { display: 'flex' } }>
          <Toggle
            label={intl.formatMessage({ id: 'S2_PAY_BENEFITS' })}
            checked={!!data.payBenefits}
            onChange={({ target }) => onDataChange?.('payBenefits', target.checked)}
          />
        </FormGroup>
        <FormGroup lg={8} error={errors.percentageBenefitsCost}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='percentageBenefitsCost'
              type='number'
              sufix='$'
              label={intl.formatMessage({ id: 'S2_BENEFITS_COST' })}
              disabled={!data.payBenefits}
              min={0}
              max={100}
              value={data.percentageBenefitsCost}
              onChange={handleInputChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S2_BENEFITS_COST_TOOLTIP' })} />
          </div>
        </FormGroup>
      </Row> 

      <Row>
        <FormGroup lg={4} style={ { display: 'flex', flexDirection: 'column'  } }>
          <Input
            name='childCareWage'
            type='number'
            sufix='$'
            label={intl.formatMessage({ id: 'S4_CHILD_STAFF' })}
            value={data.childCareWage}
            onChange={handleInputChange}
          />
          {data.childCareWage && salary && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {intl.formatMessage({ id: 'S4_CHILD_STAFF_BOX' }, { value:  moneyFormatter.format(salary.childcareWorkerMedianSalary) })}
              </>
            </TextBox>
          )}
        </FormGroup>
  
  
        <FormGroup lg={4} style={ { display: 'flex', flexDirection: 'column' } }>
          <Input
            name='preSchoolTeacherWage'
            type='number'
            sufix='$'
            label={intl.formatMessage({ id: 'S4_PRESCHOOL_TEACHER' })}
            value={data.preSchoolTeacherWage}
            onChange={handleInputChange}
          />
          {data.preSchoolTeacherWage && salary && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {intl.formatMessage({ id: 'S4_PRESCHOOL_TEACHER_BOX' }, { value:  moneyFormatter.format(salary.preschoolTeacherMedianSalary) })}
              </>
            </TextBox>
          )}
        </FormGroup>

        <FormGroup lg={4} style={ { display: 'flex', flexDirection: 'column'  } }>
          <Input
            name='centerAdminWage'
            type='number'
            sufix='$'
            label={intl.formatMessage({ id: 'S4_CENTER_ADMIN' })}
            value={data.centerAdminWage}
            onChange={handleInputChange}
          />
          {data.centerAdminWage && salary && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {intl.formatMessage({ id: 'S4_PRESCHOOL_TEACHER_BOX' }, { value:  moneyFormatter.format(salary.administratorMedianSalary) })}
              </>
            </TextBox>
          )}
        </FormGroup>
      </Row>

      <Row>
        <FormGroup lg={6} style={ { display: 'flex', flexDirection: 'column'  } }>
          <Input
            name='qualityImprovementAward'
            type='number'
            sufix='$'
            label={intl.formatMessage({ id: 'S4_QUALITY_IMPR' })}
            value={data.qualityImprovementAward}
            onChange={handleInputChange}
          />
        </FormGroup>
      </Row>
    </>
  )
}

export default StepFour