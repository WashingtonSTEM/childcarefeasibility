import { useMemo } from 'react'
import { Row } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'

import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import Tooltip from '@/components/Tooltip'
import FormGroup from '@/components/FormGroup'
import { isRequired, minInt, hasValue } from '@/utils/validate'
import {
  getMaximumNumberOfInfantsSupported,
  getMaximumNumberOfPreschoolers,
  getEstimatedNumberOfChildCareAdministrators,
  getEstimatedNumberOfChildCareWorkers,
  getEstimatedNumberOfPreschoolTeachers
} from '@/helpers/formulas'

export const validationRules = {
  numberOfInfants: [isRequired, minInt(0)],
  numberOfToddlers: [isRequired, minInt(0)],
  numberOfPreschoolers: [isRequired, minInt(0)],
  numberOfSchoolAgeChildren: [isRequired, minInt(0)],
  numberOfClassrooms: [isRequired, minInt(0)],
  numberOfChildCareWorkers: [isRequired, minInt(0)],
  numberOfPreschoolTeachers: [isRequired, minInt(0)],
  numberOfChildCareAdministrators: [isRequired, minInt(0)],
}

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

const StepThree = ({ data, onDataChange, errors, isMobile = false, show = false }) => {
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

  return (
    <>
      <Text>
        <FormattedMessage id="S3_INSTRUCTIONS" />
      </Text>
      { data.typeOfFacility === 'FCC' && (
        <Text>
          <FormattedMessage id="S1_FOOTAGE_TOOLTIP_FCC" />
        </Text>
      ) }
      <Row>
        <FormGroup lg={3} error={errors.numberOfInfants}>
          <Input
            name='numberOfInfants'
            type='number'
            label={intl.formatMessage({ 'id': 'S3_#_INFANTS' })}
            min={0}
            value={data.numberOfInfants}
            onChange={handleOnChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfToddlers}>
          <Input
            name='numberOfToddlers'
            type='number'
            label={intl.formatMessage({ 'id': 'S3_#_TODDLERS' })}
            min={0}
            value={data.numberOfToddlers}
            onChange={handleOnChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfPreschoolers}>
          <Input
            name='numberOfPreschoolers'
            type='number'
            label={intl.formatMessage({ 'id': 'S3_#_PRESCHOOLERS' })}
            min={0}
            value={data.numberOfPreschoolers}
            onChange={handleOnChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfSchoolAgeChildren}>
          <Input
            name='numberOfSchoolAgeChildren'
            type='number'
            label={intl.formatMessage({ 'id': 'S3_#_SAC' })}
            min={0}
            value={data.numberOfSchoolAgeChildren}
            onChange={handleOnChange}
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={3} error={errors.numberOfClassrooms}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfClassrooms'
              type='number'
              label={intl.formatMessage({ id: 'S3_#_CLASSROOMS' })}
              min={0}
              value={data.numberOfClassrooms}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_CLASSROOMS_TOOLTIP' })} />
          </div>
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfChildCareWorkers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfChildCareWorkers'
              type='number'
              label={intl.formatMessage({ id: 'S3_#_CCS' })}
              min={0}
              value={data.numberOfChildCareWorkers}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_CCS_TOOLTIP' })} />
          </div>
          {estimatedNumberOfChildCareWorkers !== null && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {estimatedNumberOfChildCareWorkers}
                <br />
                <FormattedMessage id='S3_#_CCS_RECOMENDATION' />
              </>
            </TextBox>
          )}
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfPreschoolTeachers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfPreschoolTeachers'
              type='number'
              label={intl.formatMessage({ id: 'S3_#_PST' })}
              min={0}
              value={data.numberOfPreschoolTeachers}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_PST_TOOLTIP' })} />
          </div>
          {estimatedNumberOfPreschoolTeachers !== null && (
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {estimatedNumberOfPreschoolTeachers}
                <br />
                <FormattedMessage id='S3_#_PST_RECOMENDATION' />
              </>
            </TextBox>
          )}
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfChildCareAdministrators}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfChildCareAdministrators'
              type='number'
              label={intl.formatMessage({ id: 'S3_#_CCA' })}
              min={0}
              value={data.numberOfChildCareAdministrators}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_CCA_TOOLTIP' })} />
          </div>
        </FormGroup>
      </Row>
    </>
  )
}

export default StepThree
