import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { BaseCSS, Col, Container, Row } from 'styled-bootstrap-grid'
import styled from 'styled-components'

import Button from '@/components/Button'
import FinalResults from '@/components/Calculator/FinalResults'
import TotalBox from '@/components/Calculator/TotalBox'
import Input from '@/components/Input'
import Title from '@/components/Title'
import CustomCollapse from '@/components/Collapse'
import {
  getChildcareLicensingFee,
  getExpectedFeeRevenue,
  getSubsidy,
} from '@/helpers/formulas'
import useForm from '@/hooks/useForm'
import useMediaQuery from '@/hooks/useMediaQuery'

import { validationRules as stepOneRules } from '@/components/Calculator/StepOne'
import { validationRules as stepThreeRules } from '@/components/Calculator/StepThree'
import { validationRules as stepTwoRules } from '@/components/Calculator/StepTwo'

import childCareFeasibilityData from '@/data/childcare_feasibility_data.json'

import styles from '@/styles/Calculator.module.css'
import { saveAs } from 'file-saver'
import XlsxPopulate from 'xlsx-populate'

const WORKING_HOURS_IN_A_YEAR = 2080
const HOURS_IN_A_MONTH = WORKING_HOURS_IN_A_YEAR / 12

const Text = styled.span`
  display: block;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #012846;
`

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const ResultsPage = () => {
  const router = useRouter()
  const intl = useIntl()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { data, onDataChange, set: setData, validate, errors } = useForm(null)
  const [visibleSections, setVisibleSections] = useState([])

  useEffect(() => {
    if (!router.isReady) return

    const _data = { ...router.query }

    _data.rentOrMortageCost = parseFloat(_data.rentOrMortageCost)
    _data.percentageChildrenReceivingSubsidy = parseFloat(
      _data.percentageChildrenReceivingSubsidy
    )
    _data.numberOfToddlers = parseInt(_data.numberOfToddlers)
    _data.numberOfSchoolAgeChildren = parseInt(_data.numberOfSchoolAgeChildren)
    _data.numberOfPreschoolers = parseInt(_data.numberOfPreschoolers)
    _data.numberOfPreschoolTeachers = parseInt(_data.numberOfPreschoolTeachers)
    _data.numberOfInfants = parseInt(_data.numberOfInfants)
    _data.numberOfClassrooms = parseInt(_data.numberOfClassrooms)
    _data.numberOfChildCareWorkers = parseInt(_data.numberOfChildCareWorkers)
    _data.numberOfChildCareAdministrators = parseInt(
      _data.numberOfChildCareAdministrators
    )
    _data.intendedFootage = parseFloat(_data.intendedFootage)
    _data.collectionsRate = parseFloat(_data.collectionsRate)
    _data.percentageBenefitsCost = parseFloat(_data.percentageBenefitsCost)
    _data.additionalCost = parseFloat(_data.additionalCost)
    _data.programManagementChild = parseFloat(_data.programManagementChild)
    _data.educationProgramExpenses = parseFloat(_data.educationProgramExpenses)
    const isValid = validate(_data, {
      ...stepOneRules,
      ...stepTwoRules,
      ...stepThreeRules,
    })

    if (!isValid) {
      handleStartClick()
    } else {
      setData(_data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const handleDropdownChange = (selectedSection) => {
    // Verificar si la sección ya está en la lista de visibles y agregarla o quitarla según corresponda.
    if (visibleSections.includes(selectedSection)) {
      setVisibleSections(
        visibleSections.filter((section) => section !== selectedSection)
      )
    } else {
      setVisibleSections([...visibleSections, selectedSection])
    }
  }

  const expectedSalaryRevenue = useMemo(() => {
    if (!data) {
      return null
    }
    const infant = data.pctNumberOfInfants //getExpectedSalaryRevenuePerChild(data.county, 'Infant', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0
    const toddler = data.pctNumberOfToddlers //getExpectedSalaryRevenuePerChild(data.county, 'Toddler', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0
    const preschool = data.pctNumberOfPreschoolers //getExpectedSalaryRevenuePerChild(data.county, 'Pre School', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0
    const schoolAge = data.pctNumberOfSchoolAgeChildren //getExpectedSalaryRevenuePerChild(data.county, 'School Age', data.typeOfFacility, data.medianOr75thPercentile === 'Median') || 0

    return { infant, toddler, preschool, schoolAge }
  }, [data])

  const subsidy = useMemo(() => {
    if (!data) {
      return null
    }
    const infants =
      getSubsidy(
        data.typeOfFacility,
        data.county,
        data.earlyAchieversLevel,
        'infants'
      ) || 0
    const toddlers =
      getSubsidy(
        data.typeOfFacility,
        data.county,
        data.earlyAchieversLevel,
        'toddlers'
      ) || 0
    const preschool =
      getSubsidy(
        data.typeOfFacility,
        data.county,
        data.earlyAchieversLevel,
        'preschool'
      ) || 0
    const schoolAge =
      getSubsidy(
        data.typeOfFacility,
        data.county,
        data.earlyAchieversLevel,
        'schoolAge'
      ) || 0

    return { infants, toddlers, preschool, schoolAge }
  }, [data])

  const expectedSalary = useMemo(() => {
    if (!data) {
      return null
    }

    const worker = data.childCareWage * HOURS_IN_A_MONTH
    const teacher = data.preSchoolTeacherWage * HOURS_IN_A_MONTH
    const administrator = data.centerAdminWage * HOURS_IN_A_MONTH

    return { worker, teacher, administrator }
  }, [data])

  if (!data) {
    return null
  }

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

  const expectedSalaries =
    data.numberOfChildCareWorkers * expectedSalary.worker +
    data.numberOfPreschoolTeachers * expectedSalary.teacher +
    data.numberOfChildCareAdministrators * expectedSalary.administrator

  const expectedBenefits =
    data.payBenefits === 'true'
      ? (data.percentageBenefitsCost *
        (data.numberOfChildCareWorkers +
          data.numberOfPreschoolTeachers +
          data.numberOfChildCareAdministrators)) /
      12
      : 0

  const totalChildren =
    data.numberOfInfants +
    data.numberOfToddlers +
    data.numberOfPreschoolers +
    data.numberOfSchoolAgeChildren

  const childcareLicensingFee = getChildcareLicensingFee(
    data.typeOfFacility,
    totalChildren
  )

  const expectedAnnualRegistration =
    Number(data.annualRegistration) * totalChildren

  const qualityImprovementAwardValue =
    childCareFeasibilityData[data.typeOfFacility][data.earlyAchieversLevel]

  const qualityImprovementAward = qualityImprovementAwardValue
    ? Number(qualityImprovementAwardValue) / 12
    : 0

  const annualRegistration = expectedAnnualRegistration / 12

  const totalIncome =
    expectedFeeRevenue + expectedAnnualRegistration + qualityImprovementAward

  const totalExpenses =
    expectedSalaries +
    expectedBenefits +
    data.rentOrMortageCost +
    data.additionalCost * totalChildren +
    data.educationProgramExpenses * totalChildren +
    data.programManagementChild * totalChildren +
    childcareLicensingFee

  const netIncome = totalIncome - totalExpenses

  const additionalCost = totalChildren * data.additionalCost
  const educationProgramExpenses =
    totalChildren * data.educationProgramExpenses
  const managementAndAdministration =
    totalChildren * data.programManagementChild

  const handleStartClick = (edit = false) => {
    let query = {
      language: intl.locale || intl.defaultLocale,
    }

    if (edit === true) {
      query = router.query
    }

    router.push({
      pathname: '/',
      query,
    })
  }

  const onInputChage = ({ target }) => {
    let value = target.value

    if (value === '') {
      value = 0
    }

    onDataChange(target.name, parseInt(value))
  }

  const handleExportClick = () => {
    function getSheetData(data, header) {
      var fields = Object.keys(data[0])
      var sheetData = data.map(function(row) {
        return fields.map(function(fieldName) {
          return row[fieldName] ? row[fieldName] : ''
        })
      })

      sheetData.unshift(header)

      return sheetData
    }

    const header = [
      'Description',
      'Value',
      'Tuition revenue per child (monthly)',
      'Subsidy revenue per child (monthly)',
    ]
    const exceldata = [
      {
        Description: intl.formatMessage({ id: 'S3_#_INFANTS' }),
        value: data.numberOfInfants,
        'Tuition revenue per child (monthly)': moneyFormatter.format(
          expectedSalaryRevenue.infant
        ),
        'Subsidy revenue per child (monthly)': moneyFormatter.format(
          subsidy.infants
        ),
      },
      {
        Description: intl.formatMessage({ id: 'S3_#_TODDLERS' }),
        value: data.numberOfToddlers,
        'Tuition revenue per child (monthly)': moneyFormatter.format(
          expectedSalaryRevenue.toddler
        ),
        'Subsidy revenue per child (monthly)': moneyFormatter.format(
          subsidy.toddlers
        ),
      },
      {
        Description: intl.formatMessage({ id: 'S3_#_PRESCHOOLERS' }),
        value: data.numberOfPreschoolers,
        'Tuition revenue per child (monthly)': moneyFormatter.format(
          expectedSalaryRevenue.preschool
        ),
        'Subsidy revenue per child (monthly)': moneyFormatter.format(
          subsidy.preschool
        ),
      },
      {
        Description: intl.formatMessage({ id: 'S3_#_SAC' }),
        value: data.numberOfSchoolAgeChildren,
        'Tuition revenue per child (monthly)': moneyFormatter.format(
          expectedSalaryRevenue.schoolAge
        ),
        'Subsidy revenue per child (monthly)': moneyFormatter.format(
          subsidy.schoolAge
        ),
      },
    ]

    const header2 = [
      'Description',
      'Value',
      'Expected monthly salary',
      'Expected annual salary',
    ]
    const exceldata2 = [
      {
        Description: intl.formatMessage({ id: 'S3_#_CCS' }),
        value: data.numberOfChildCareWorkers,
        'Expected monthly salary': moneyFormatter.format(expectedSalary.worker),
        'Expected annual salary': moneyFormatter.format(
          expectedSalary.worker * 12
        ),
      },
      {
        Description: intl.formatMessage({ id: 'S3_#_PST' }),
        value: data.numberOfPreschoolTeachers,
        'Expected monthly salary': moneyFormatter.format(
          expectedSalary.teacher
        ),
        'Expected annual salary': moneyFormatter.format(
          expectedSalary.teacher * 12
        ),
      },
      {
        Description: intl.formatMessage({ id: 'S3_#_CCA' }),
        value: data.numberOfPreschoolTeachers,
        'Expected monthly salary': moneyFormatter.format(
          expectedSalary.administrator
        ),
        'Expected annual salary': moneyFormatter.format(
          expectedSalary.administrator * 12
        ),
      },
    ]

    const header3 = ['Description', 'Monthly', 'Annual']

    const exceldata3 = [
      {
        Description: intl.formatMessage({ id: 'R_E_FEE_REVENUE' }),
        Monthly: expectedFeeRevenue,
        Annual: expectedFeeRevenue * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_E_REGISTRATION' }),
        Monthly: annualRegistration,
        Annual: annualRegistration * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_QUALITY_IMP' }),
        Monthly: qualityImprovementAward,
        Annual: qualityImprovementAward * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_E_FEE_REVENUE' }),
        Monthly: expectedFeeRevenue,
        Annual: expectedFeeRevenue * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_E_FEE_REVENUE' }),
        Monthly: expectedFeeRevenue,
        Annual: expectedFeeRevenue * 12,
      },

      {
        Description: intl.formatMessage({ id: 'R_E_SALARIES' }),
        Monthly: expectedSalaries,
        Annual: expectedSalaries * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_E_BENEFITS' }),
        Monthly: expectedBenefits,
        Annual: expectedBenefits * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_RENT_COST' }),
        Monthly: data.rentOrMortageCost,
        Annual: data.rentOrMortageCost * 12,
      },
      {
        Description: intl.formatMessage({
          id: 'R_EDUCATIONAL_PROGRAM_EXPENSES',
        }),
        Monthly: additionalCost,
        Annual: additionalCost * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_MANAGEMENT_ADMINISTRATION' }),
        Monthly: educationProgramExpenses,
        Annual: educationProgramExpenses * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_ADDITIONAL_COSR' }),
        Monthly: managementAndAdministration,
        Annual: managementAndAdministration * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_QUALITY_IMP' }),
        Monthly: 0,
        Annual: 0 * 12,
      },
    ]

    const header4 = ['Description', 'Monthly', 'Annual']

    const exceldata4 = [
      {
        Description: intl.formatMessage({ id: 'R_TOTAL_INCOME' }),
        Monthly: totalIncome,
        Annual: totalIncome * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_TOTAL_EXPENSES' }),
        Monthly: totalExpenses,
        Annual: totalExpenses * 12,
      },
      {
        Description: intl.formatMessage({ id: 'R_NET_INCOME' }),
        Monthly: netIncome,
        Annual: netIncome * 12,
      },
    ]

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0)
      const sheetData = getSheetData(exceldata, header)
      const totalColumns = sheetData[0].length

      sheet1.cell('A1').value(sheetData)
      const endColumn = String.fromCharCode(64 + totalColumns)

      sheet1.row(1).style('bold', true)
      sheet1.range('A1:' + endColumn + '1').style('fill', 'BFBFBF')
      sheet1.range('A1:' + endColumn + '1').style('border', true)

      const sheetData2 = getSheetData(exceldata2, header2)
      const totalColumns2 = sheetData[0].length

      sheet1.cell('A8').value(sheetData2)
      const endColumn2 = String.fromCharCode(64 + totalColumns2)

      sheet1.row(8).style('bold', true)
      sheet1.range('A8:' + endColumn2 + '8').style('fill', 'BFBFBF')
      sheet1.range('A8:' + endColumn2 + '8').style('border', true)

      const sheetData3 = getSheetData(exceldata3, header3)
      const totalColumns3 = header3.length

      sheet1.cell('A14').value(sheetData3)
      const endColumn3 = String.fromCharCode(64 + totalColumns3)

      sheet1.row(14).style('bold', true)
      sheet1.range('A14:' + endColumn3 + '14').style('fill', 'BFBFBF')
      sheet1.range('A14:' + endColumn3 + '14').style('border', true)

      const sheetData4 = getSheetData(exceldata4, header4)
      const totalColumns4 = header4.length

      sheet1.cell('A25').value(sheetData4)
      const endColumn4 = String.fromCharCode(64 + totalColumns4)

      sheet1.row(25).style('bold', true)
      sheet1.range('A25:' + endColumn4 + '25').style('fill', 'BFBFBF')
      sheet1.range('A25:' + endColumn4 + '25').style('border', true)

      return workbook.outputAsync().then((res) => {
        saveAs(res, 'child-care-business-feasibility-estimator.xlsx')
      })
    })
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

          {!isMobile && (
            <Row style={{ margin: '60px 0px 20px 0px' }}>
              <Col col={3}></Col>

              <Col col={4}>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', color: '#534F4D' }}
                >
                  <FormattedMessage id="R_MONTHLY" />
                </Text>
              </Col>
              <Col col={4}>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', color: '#534F4D' }}
                >
                  <FormattedMessage id="R_ANNUAL" />
                </Text>
              </Col>
            </Row>
          )}
          <TotalBox
            label={intl.formatMessage({ id: 'R_TOTAL_INCOME' })}
            monthlyValue={totalIncome}
            annualValue={totalIncome * 12}
            mobile={isMobile}
          />
          <TotalBox
            label={intl.formatMessage({ id: 'R_TOTAL_EXPENSES' })}
            monthlyValue={totalExpenses}
            annualValue={totalExpenses * 12}
            mobile={isMobile}
            style={{ margin: '12px 0' }}
          />
          <TotalBox
            label={intl.formatMessage({ id: 'R_NET_INCOME' })}
            monthlyValue={netIncome}
            annualValue={netIncome * 12}
            mobile={isMobile}
            style={{ margin: '12px 0' }}
          />
          <CustomCollapse title={<FormattedMessage id="CLICK_VIEW_RESULTS" />}>
            <Row style={{ marginBottom: '1rem', margin: '20px', marginLeft: '0' }}>
              <Col col={4} lg={3}></Col>
              <Col
                col={4}
                style={{
                  paddingLeft: '0px !important',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>
                    <FormattedMessage id="R_RPC" />
                  </Text>
                </div>
              </Col>
              <Col
                col={4}
                style={{
                  paddingLeft: '0px !important',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
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
              <Col
                col={4}
                lg={3}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Input
                  name="numberOfInfants"
                  value={data.numberOfInfants}
                  onChange={onInputChage}
                  type="number"
                  min={0}
                />
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>
                  {moneyFormatter.format(expectedSalaryRevenue.infant)}
                </Text>
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
                  name="numberOfToddlers"
                  value={data.numberOfToddlers}
                  onChange={onInputChage}
                  type="number"
                  min={0}
                />
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>
                  {moneyFormatter.format(expectedSalaryRevenue.toddler)}
                </Text>
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
                  name="numberOfPreschoolers"
                  value={data.numberOfPreschoolers}
                  onChange={onInputChage}
                  type="number"
                  min={0}
                />
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>
                  {moneyFormatter.format(expectedSalaryRevenue.preschool)}
                </Text>
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
              <Col col={4} lg={3} label="# of school-age children">
                <Input
                  name="numberOfSchoolAgeChildren"
                  value={data.numberOfSchoolAgeChildren}
                  onChange={onInputChage}
                  type="number"
                  min={0}
                />
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>
                  {moneyFormatter.format(expectedSalaryRevenue.schoolAge)}
                </Text>
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>{moneyFormatter.format(subsidy.schoolAge)}</Text>
              </Col>
            </Row>
            <div style={{ margin: '20px 0', display: 'inline-block' }} />
            <Row style={{ marginBottom: '1rem' }}>
              <Col col={4} lg={3} />
              <Col col={4}>
                <Text style={{ fontWeight: 'bold' }}>
                  <FormattedMessage id="R_EMS" />
                </Text>
              </Col>
              <Col col={4}>
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
                  name="numberOfChildCareWorkers"
                  value={data.numberOfChildCareWorkers}
                  onChange={onInputChage}
                  type="number"
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
                  name="numberOfPreschoolTeachers"
                  value={data.numberOfPreschoolTeachers}
                  onChange={onInputChage}
                  type="number"
                  min={0}
                />
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>{moneyFormatter.format(expectedSalary.teacher)}</Text>
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>
                  {moneyFormatter.format(expectedSalary.teacher * 12)}
                </Text>
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
                  name="numberOfChildCareAdministrators"
                  value={data.numberOfChildCareAdministrators}
                  onChange={onInputChage}
                  type="number"
                  min={0}
                />
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>
                  {moneyFormatter.format(expectedSalary.administrator)}
                </Text>
              </Col>
              <Col col={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>
                  {moneyFormatter.format(expectedSalary.administrator * 12)}
                </Text>
              </Col>
            </Row>
            <div style={{ margin: '40px 0', display: 'inline-block' }} />
            <FinalResults
              mobile={isMobile}
              expectedFeeRevenue={expectedFeeRevenue}
              expectedSalaries={expectedSalaries}
              expectedBenefits={expectedBenefits}
              annualRegistration={annualRegistration}
              qualityImprovementAward={qualityImprovementAward}
              rentOrMortageCost={data.rentOrMortageCost}
              additionalCost={additionalCost}
              educationProgramExpenses={educationProgramExpenses}
              managementAndAdministration={managementAndAdministration}
              childcareLicensingFee={childcareLicensingFee}
              onDataChange={onInputChage}
            />
          </CustomCollapse>
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: '120px 0 60px 0',
            }}
          >
            <Col col={12}
              md={6}
              lg={6}
              style={{ marginBottom: 12 }}>
              <Title style={{ margin: 0 }}>
                <FormattedMessage id="R_THANKS" />
              </Title>
              <Title style={{ margin: 0, marginTop: 4, fontSize: 20 }}>
                <FormattedMessage id="R_THANKS_USE" />
              </Title>
            </Col>
            <Col
              col={12}
              md={8}
              lg={6}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Row style={{ paddingTop: '1em' }}>
                <Col col={12} md={4} style={{ paddingBottom: '0.5em' }}>
                  <Button
                    variant={'secondary'}
                    textAlign="center"
                    onClick={handleExportClick}
                    style={{ fontSize: 16, marginRight: '1em', width: '100%' }}
                  >
                    <img
                      style={{ position: 'relative', top: 4, marginRight: 5 }}
                      width={20}
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f3/.xlsx_icon.svg"
                    />
                    Export to excel
                  </Button>
                </Col>
                <Col col={12} md={4} style={{ paddingBottom: '0.5em' }}>
                  <Button
                    variant="secondary"
                    textAlign="center"
                    onClick={() => handleStartClick(true)}
                    style={{ fontSize: 16, width: '100%' }}
                  >
                    <FormattedMessage id="R_PREVIOUS_PAGE" />
                  </Button>
                </Col>
                <Col col={12} md={4} style={{ paddingBottom: '0.5em' }}>
                  <Button
                    textAlign="center"
                    onClick={() => handleStartClick()}
                    style={{ fontSize: 16, width: '100%' }}
                  >
                    <FormattedMessage id="R_START_AGAIN" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default ResultsPage
