import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { BaseCSS, Container, Row, Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'

import Title from '@/components/Title'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import FinalResults from '@/components/Calculator/FinalResults'
import TotalBox from '@/components/Calculator/TotalBox'
import useMediaQuery from '@/hooks/useMediaQuery'
import useForm from '@/hooks/useForm'
import { getExpectedSalaryRevenuePerChild, getSubsidy, getExpectedSalary, getExpectedFeeRevenue } from '@/helpers/formulas'

import { validationRules as stepOneRules } from '@/components/Calculator/StepOne'
import { validationRules as stepTwoRules } from '@/components/Calculator/StepTwo'
import { validationRules as stepThreeRules } from '@/components/Calculator/StepThree'

import styles from '@/styles/Calculator.module.css'

const Text = styled.span`
  display: block;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #012846;
`

const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const ResultsPage = () => {
  const router = useRouter()
  const intl = useIntl()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { data, onDataChange, set: setData, validate, errors } = useForm({})

  useEffect(() => {
    const data = {
      ...router.query,
    }

    data.rentOrMortageCost = parseFloat(data.rentOrMortageCost)
    data.percentageChildrenReceivingSubsidy = parseFloat(data.percentageChildrenReceivingSubsidy)
    data.numberOfToddlers = parseInt(data.numberOfToddlers)
    data.numberOfSchoolAgeChildren = parseInt(data.numberOfSchoolAgeChildren)
    data.numberOfPreschoolers = parseInt(data.numberOfPreschoolers)
    data.numberOfPreschoolTeachers = parseInt(data.numberOfPreschoolTeachers)
    data.numberOfInfants = parseInt(data.numberOfInfants)
    data.numberOfClassrooms = parseInt(data.numberOfClassrooms)
    data.numberOfChildCareWorkers = parseInt(data.numberOfChildCareWorkers)
    data.numberOfChildCareAdministrators = parseInt(data.numberOfChildCareAdministrators)
    data.intendedFootage = parseFloat(data.intendedFootage)
    data.collectionsRate = parseFloat(data.collectionsRate)
    data.percentageBenefitsCost = parseFloat(data.percentageBenefitsCost)
    data.additionalCost = parseFloat(data.additionalCost)
    data.programManagementChild = parseFloat(data.programManagementChild)
    data.educationProgramExpenses = parseFloat(data.educationProgramExpenses)
    const isValid = validate(data, {
      ...stepOneRules,
      ...stepTwoRules,
      ...stepThreeRules
    })

    if (!isValid) {
      handleStartClick()
    } else {
      setData(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const expectedSalaryRevenue = useMemo(() => {
    if (!data) {
      return null
    }
    const infant = getExpectedSalaryRevenuePerChild(data.county, 'Infant', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0
    const toddler = getExpectedSalaryRevenuePerChild(data.county, 'Toddler', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0
    const preschool = getExpectedSalaryRevenuePerChild(data.county, 'Pre School', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0
    const schoolAge = getExpectedSalaryRevenuePerChild(data.county, 'School Age', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0

    return { infant, toddler, preschool, schoolAge }
  }, [data])

  const subsidy = useMemo(() => {
    if (!data) {
      return null
    }
    const infants = getSubsidy(data.typeOfFacility, data.county, data.earlyAchieversLevel, 'infants') || 0
    const toddlers = getSubsidy(data.typeOfFacility, data.county, data.earlyAchieversLevel, 'toddlers') || 0
    const preschool = getSubsidy(data.typeOfFacility, data.county, data.earlyAchieversLevel, 'preschool') || 0
    const schoolAge = getSubsidy(data.typeOfFacility, data.county, data.earlyAchieversLevel, 'schoolAge') || 0

    return { infants, toddlers, preschool, schoolAge }
  }, [data])

  const expectedSalary = useMemo(() => {
    if (!data) {
      return null
    }

    const worker = getExpectedSalary(data.county, 'Child Care Worker', data.staffCompesantion) || 0
    const teacher = getExpectedSalary(data.county, 'Preschool Teacher', data.staffCompesantion) || 0
    const administrator = getExpectedSalary(data.county, 'Administrator', data.staffCompesantion) || 0

    return { worker, teacher, administrator }
  }, [data])

  const expectedFeeRevenue = getExpectedFeeRevenue(
    data.numberOfInfants,
    data.numberOfToddlers,
    data.numberOfPreschoolers,
    data.numberOfSchoolAgeChildren,
    subsidy.infants,
    subsidy.toddlers,
    subsidy.preschool,
    subsidy.schoolAge,
    expectedSalaryRevenue.infant,
    expectedSalaryRevenue.toddler,
    expectedSalaryRevenue.preschool,
    expectedSalaryRevenue.schoolAge,
    data.percentageChildrenReceivingSubsidy / 100,
    data.collectionsRate / 100
  )

  const expectedSalaries = (data.numberOfChildCareWorkers * expectedSalary.worker) +
    (data.numberOfPreschoolTeachers * expectedSalary.teacher) +
    (data.numberOfChildCareAdministrators * expectedSalary.administrator)

  const expectedBenefits = data.payBenefits === 'true' ? expectedSalaries * (data.percentageBenefitsCost / 100) : 0

  const totalChildren = data.numberOfInfants + data.numberOfToddlers + data.numberOfPreschoolers + data.numberOfSchoolAgeChildren

  const totalIncome = expectedFeeRevenue

  const totalExpenses = expectedSalaries + expectedBenefits + data.rentOrMortageCost + data.additionalCost * totalChildren + data.educationProgramExpenses * totalChildren + data.programManagementChild * totalChildren

  const netIncome = totalIncome - totalExpenses

  const handleStartClick = () => {
    router.push({
      pathname: '/',
      query: {
        language: intl.locale || intl.defaultLocale
      }
    })
  }

  const onInputChage = ({ target }) => {
    let value = target.value

    if (value === '') {
      value = 0
    }

    onDataChange(target.name, parseInt(value))
  }

  if (!data) {
    return null
  }

  return (
    <>
      <BaseCSS />
      <main className={styles.main}>
        <Container style={{ padding: '0 30px' }}>
          <Title>
            <FormattedMessage id="RESULTS_TITLE" />
          </Title>
          <Row style={{ marginBottom: '1rem' }}>
            <Col col={4} lg={3}></Col>
            <Col col={4}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  <FormattedMessage id="R_RPC" />
                </Text>
              </div>
            </Col>
            <Col col={4}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  <FormattedMessage id="R_SRPC" />
                </Text>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text>
                <FormattedMessage id="S3_#_INFANTS" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3} style={{ display: 'flex', alignItems: 'center' }}>
              <Input
                name='numberOfInfants'
                value={data.numberOfInfants}
                onChange={onInputChage}
                type='number'
                min={0}
              />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalaryRevenue.infant)}</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(subsidy.infants)}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text>
                <FormattedMessage id="S3_#_TODDLERS" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input
                name='numberOfToddlers'
                value={data.numberOfToddlers}
                onChange={onInputChage}
                type='number'
                min={0}
              />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalaryRevenue.toddler)}</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(subsidy.toddlers)}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text>
                <FormattedMessage id="S3_#_PRESCHOOLERS" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input
                name='numberOfPreschoolers'
                value={data.numberOfPreschoolers}
                onChange={onInputChage}
                type='number'
                min={0}
              />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalaryRevenue.preschool)}</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(subsidy.preschool)}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text>
                <FormattedMessage id="S3_#_SAC" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3} label='# of school-age children'>
              <Input
                name='numberOfSchoolAgeChildren'
                value={data.numberOfSchoolAgeChildren}
                onChange={onInputChage}
                type='number'
                min={0}
              />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalaryRevenue.schoolAge)}</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(subsidy.schoolAge)}</Text>
            </Col>
          </Row>
          <div style={{ margin: '20px 0', display: 'inline-block' }} />
          <Row style={{ marginBottom: '1rem' }}>
            <Col col={4} lg={3} />
            <Col col={4} >
              <Text style={{ fontWeight: 'bold' }}>
                <FormattedMessage id="R_EMS" />
              </Text>
            </Col>
            <Col col={4} >
              <Text style={{ fontWeight: 'bold' }}>
                <FormattedMessage id="R_EAS" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text>
                <FormattedMessage id="S3_#_CCS" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input
                name='numberOfChildCareWorkers'
                value={data.numberOfChildCareWorkers}
                onChange={onInputChage}
                type='number'
                min={0}
              />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalary.worker)}</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalary.worker * 12)}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text>
                <FormattedMessage id="S3_#_PST" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input
                name='numberOfPreschoolTeachers'
                value={data.numberOfPreschoolTeachers}
                onChange={onInputChage}
                type='number'
                min={0}
              />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalary.teacher)}</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalary.teacher * 12)}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '0.5rem' }}>
            <Col col={12}>
              <Text>
                <FormattedMessage id="S3_#_CCA" />
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col col={4} lg={3}>
              <Input
                name='numberOfChildCareAdministrators'
                value={data.numberOfChildCareAdministrators}
                onChange={onInputChage}
                type='number'
                min={0}
              />
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalary.administrator)}</Text>
            </Col>
            <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{moneyFormatter.format(expectedSalary.administrator * 12)}</Text>
            </Col>
          </Row>
          <div style={{ margin: '40px 0', display: 'inline-block' }} />
          <FinalResults
            mobile={isMobile}
            expectedFeeRevenue={expectedFeeRevenue}
            expectedSalaries={expectedSalaries}
            expectedBenefits={expectedBenefits}
            rentOrMortageCost={data.rentOrMortageCost}
            additionalCost={totalChildren * data.additionalCost}
            educationProgramExpenses={totalChildren * data.educationProgramExpenses}
            managementAndAdministration={totalChildren * data.programManagementChild}
            onDataChange={onInputChage}
          />
          {!isMobile && (
            <Row style={{ margin: '60px 0 20px 0' }}>
              <Col offset={6} col={3} style={{ textAlign: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#534F4D' }}>
                  <FormattedMessage id='R_MONTHLY' />
                </Text>
              </Col>
              <Col col={3} style={{ textAlign: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#534F4D' }}>
                  <FormattedMessage id='R_ANNUAL' />
                </Text>
              </Col>
            </Row>
          )}
          <TotalBox
            label={intl.formatMessage({ 'id': 'R_TOTAL_INCOME' })}
            monthlyValue={totalIncome}
            annualValue={totalIncome * 12}
            mobile={isMobile}
          />
          <TotalBox
            label={intl.formatMessage({ 'id': 'R_TOTAL_EXPENSES' })}
            monthlyValue={totalExpenses}
            annualValue={totalExpenses * 12}
            mobile={isMobile}
            style={{ margin: '12px 0' }}
          />
          <TotalBox
            label={intl.formatMessage({ 'id': 'R_NET_INCOME' })}
            monthlyValue={netIncome}
            annualValue={netIncome * 12}
            mobile={isMobile}
          />
          <Row style={{ display: 'flex', justifyContent: 'space-between', padding: '120px 0 60px 0' }}>
            <Col
              col={12}
              mg={6}
              lg={6}
              style={{ marginBottom: 12 }}
            >
              <Title style={{ margin: 0 }}>
                <FormattedMessage id='R_THANKS' />
              </Title>
              <Title style={{ margin: 0, marginTop: 4, fontSize: 20 }}>
                <FormattedMessage id='R_THANKS_USE' />
              </Title>
            </Col>
            <Col
              col={12}
              md={6}
              lg={6}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button textAlign='center' onClick={handleStartClick} style={{ fontSize: 16 }}>
                <FormattedMessage id='R_START_AGAIN' />
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default ResultsPage