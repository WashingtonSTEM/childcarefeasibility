import { useMemo } from 'react'
import { Row } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'

import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import Tooltip from '@/components/Tooltip'
import FormGroup from '@/components/FormGroup'
import { isRequired, minInt } from '@/utils/validate'
import {
  getMaximumNumberOfInfantsSupported,
  getMaximumNumberOfPreschoolers,
  getEstimatedNumberOfChildCareAdministrators,
  getEstimatedNumberOfPreschoolTeachers
} from '@/helpers/formulas'

import monthlyChildcarePrice from '@/data/monthly_childcare_price.json'
import Title from '../Title'


export const validationRules = {
  numberOfInfants: [isRequired, minInt(0)],
  numberOfToddlers: [isRequired, minInt(0)],
  numberOfPreschoolers: [isRequired, minInt(0)],
  numberOfSchoolAgeChildren: [isRequired, minInt(0)],
  numberOfClassrooms: [isRequired, minInt(0)],
  numberOfChildCareWorkers: [isRequired, minInt(0)],
  numberOfPreschoolTeachers: [isRequired, minInt(0)],
  numberOfChildCareAdministrators: [isRequired, minInt(0)],
  pctNumberOfInfants: [isRequired, minInt(0)],
  pctNumberOfToddlers: [isRequired, minInt(0)],
  pctNumberOfPreschoolers: [isRequired, minInt(0)],
  pctNumberOfSchoolAgeChildren: [isRequired, minInt(0)],
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


  const monthlyCCPricePerCounty = monthlyChildcarePrice[data.county] ? monthlyChildcarePrice[data.county][data.typeOfFacility] || {} : {}

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
      <Title>
        {intl.formatMessage({ id: 'S3_TITLE' })}
      </Title>
      <Text>{intl.formatMessage({ id: 'S3_INSTRUCTIONS' })}</Text>
      {data.typeOfFacility === 'FCC' && (
        <Text>
          <FormattedMessage id="S1_FOOTAGE_TOOLTIP_FCC" />
        </Text>
      )}
      <Row>
        <FormGroup lg={3} error={errors.numberOfInfants}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfInfants'
              type='number'
              label={intl.formatMessage({ 'id': 'S3_#_INFANTS' })}
              min={0}
              value={data.numberOfInfants}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_INFANTS_TOOLTIP' })} />
          </div>
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfToddlers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfToddlers'
              type='number'
              label={intl.formatMessage({ 'id': 'S3_#_TODDLERS' })}
              min={0}
              value={data.numberOfToddlers}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_TODDLERS_TOOLTIP' })} />
          </div>
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfPreschoolers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfPreschoolers'
              type='number'
              label={intl.formatMessage({ 'id': 'S3_#_PRESCHOOLERS' })}
              min={0}
              value={data.numberOfPreschoolers}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_PRESCHOOLERS_TOOLTIP' })} />
          </div>
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfSchoolAgeChildren}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='numberOfSchoolAgeChildren'
              type='number'
              label={intl.formatMessage({ 'id': 'S3_#_SAC' })}
              min={0}
              value={data.numberOfSchoolAgeChildren}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText={intl.formatMessage({ id: 'S3_#_SAC_TOOLTIP' })} />
          </div>
        </FormGroup>
      </Row>
      
      <Row>
        <FormGroup lg={3} error={errors.pctNumberOfInfants}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='pctNumberOfInfants'
              type='number'
              prefix='$'
              label={intl.formatMessage({ 'id': 'S3_#_PCT_INFANTS' })}
              min={0}
              value={data.pctNumberOfInfants}
              onChange={handleOnChange}
            />
          </div>
          {
            (monthlyCCPricePerCounty && monthlyCCPricePerCounty.Infant) && 
              <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
                <>
                  {(!monthlyCCPricePerCounty.Infant['Median Cost'] && !monthlyCCPricePerCounty.Infant['75th Percentile Cost']) ? 
                    intl.formatMessage({ id: 'S3_NO_DATA_COUNTY' }) : 
                    intl.formatMessage(
                      { id: 'S3_#_PCT_TOOLTIP_MIN_LIC' }, 
                      { 
                        median: monthlyCCPricePerCounty.Infant['Median Cost'], 
                        percent: monthlyCCPricePerCounty.Infant['75th Percentile Cost'] 
                      }
                    )}
                </>
              </TextBox>
          }
        </FormGroup>
        <FormGroup lg={3} error={errors.pctNumberOfToddlers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='pctNumberOfToddlers'
              type='number'
              prefix='$'
              label={intl.formatMessage({ 'id': 'S3_#_PCT_TODDLERS' })}
              min={0}
              value={data.pctNumberOfToddlers}
              onChange={handleOnChange}
            />
          </div>
          {
            (monthlyCCPricePerCounty && monthlyCCPricePerCounty.Toddler) && 
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {(!monthlyCCPricePerCounty.Toddler['Median Cost'] && !monthlyCCPricePerCounty.Toddler['75th Percentile Cost']) ? 
                  intl.formatMessage({ id: 'S3_NO_DATA_COUNTY' }) : 
                  intl.formatMessage(
                    { id: 'S3_#_PCT_TOOLTIP_MIN_LIC' }, 
                    { 
                      median: monthlyCCPricePerCounty.Toddler['Median Cost'], 
                      percent: monthlyCCPricePerCounty.Toddler['75th Percentile Cost'] 
                    }
                  )}
              </>
            </TextBox>
          }
          
        </FormGroup>
        <FormGroup lg={3} error={errors.pctNumberOfPreschoolers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='pctNumberOfPreschoolers'
              type='number'
              prefix='$'
              label={intl.formatMessage({ 'id': 'S3_#_PCT_PRESCHOOLERS' })}
              min={0}
              value={data.pctNumberOfPreschoolers}
              onChange={handleOnChange}
            />
          </div>

          {
            (monthlyCCPricePerCounty && monthlyCCPricePerCounty.Preschool) && 
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {(!monthlyCCPricePerCounty.Preschool['Median Cost'] && !monthlyCCPricePerCounty.Preschool['75th Percentile Cost']) ? 
                  intl.formatMessage({ id: 'S3_NO_DATA_COUNTY' }) : 
                  intl.formatMessage(
                    { id: 'S3_#_PCT_TOOLTIP_MIN_LIC' }, 
                    { median: 
                      monthlyCCPricePerCounty.Preschool['Median Cost'], 
                    percent: monthlyCCPricePerCounty.Preschool['75th Percentile Cost'] 
                    }
                  )}
              </>
            </TextBox>
          }

        </FormGroup>
        <FormGroup lg={3} error={errors.pctNumberOfSchoolAgeChildren}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <Input
              name='pctNumberOfSchoolAgeChildren'
              type='number'
              prefix='$'
              label={intl.formatMessage({ 'id': 'S3_#_PCT_SAC' })}
              min={0}
              value={data.pctNumberOfSchoolAgeChildren}
              onChange={handleOnChange}
            />
          </div>
          {
            (monthlyCCPricePerCounty && monthlyCCPricePerCounty['School Age']) && 
            <TextBox style={{ marginTop: 4, fontStyle: 'italic' }}>
              <>
                {(!monthlyCCPricePerCounty['School Age']['Median Cost'] && !monthlyCCPricePerCounty['School Age']['75th Percentile Cost']) ? 
                  intl.formatMessage({ id: 'S3_NO_DATA_COUNTY' }) : 
                  intl.formatMessage(
                    { id: 'S3_#_PCT_TOOLTIP_MIN_LIC_EXTENDED' }, 
                    { median: 
                      monthlyCCPricePerCounty['School Age']['Median Cost'], 
                    percent: monthlyCCPricePerCounty['School Age']['75th Percentile Cost'] 
                    }
                  )}
              </>
            </TextBox>
          }
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
      </Row>
    </>
  )
}

export default StepThree
