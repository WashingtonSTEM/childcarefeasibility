/*
export enum FacilityType {
  FCC = 'FCC',
  CenterBased = 'Center',
  NatureBased = 'Nature'
}

export enum Child {
  Infant = 'Infant',
  Toddler = 'Toddler',
  Preschooler = 'Preschooler',
  SchoolAge = 'School Age'
}

=IF(
  D3="FCC",
  MIN(3,SUM(ROUNDDOWN(D11/50,0))),
  ROUNDDOWN(D11/50,0)
)
*/
export const getMaximumNumberOfInfantsSupported = (facilityType, squareFootage = 0) => {
  const squareFootagePerChildren = Math.floor(squareFootage / 50)

  if (facilityType === 'FCC' && squareFootagePerChildren > 3) {
    return 3
  }

  return squareFootagePerChildren
}

/*
=+IF(
  D3="FCC",
  MIN(9,SUM(ROUNDDOWN((D11-D17*50)/35,0))),
  ROUNDDOWN(D11/35,0)
)
*/
export const getMaximumNumberOfPreschoolers = (facilityType, squareFootage = 0, maximumNumbersOfInfantsSupported = 0) => {
  if (facilityType !== 'FCC') {
    return Math.floor(squareFootage / 35)
  }

  const numberOfPreschoolers = Math.floor((squareFootage - maximumNumbersOfInfantsSupported * 50) / 35)

  if (numberOfPreschoolers > 9) {
    return 9
  }

  return numberOfPreschoolers
}

export const getNumberOfChildrenRecommendation = (facilityType) => {
  if (facilityType !== 'FCC') {
    return ''
  }

  return 'NOTE: Family Child Cares may have up to 12 children, 3 of which may be under age 2.'
}

/*
=+IF(
  D3="FCC",
  (ROUNDUP(SUM(D22:D25)/4,0))-D33-D32,
  IF(
    ROUNDUP(D22/'Childcare Staff Ratios'!D2,0)+ROUNDUP('Simplified Calculator'!D23/'Childcare Staff Ratios'!D3,0)+ROUNDUP('Simplified Calculator'!D24/'Childcare Staff Ratios'!D4,0)+ROUNDUP('Simplified Calculator'!D25/'Childcare Staff Ratios'!D5,0)-'Simplified Calculator'!D32 < 0,
    0,
    ROUNDUP(D22/'Childcare Staff Ratios'!D2,0)+ROUNDUP('Simplified Calculator'!D23/'Childcare Staff Ratios'!D3,0)+ROUNDUP('Simplified Calculator'!D24/'Childcare Staff Ratios'!D4,0)+ROUNDUP('Simplified Calculator'!D25/'Childcare Staff Ratios'!D5,0)-'Simplified Calculator'!D32
  )
)

D22 = Number of Infants
D23 = Number of Toddlers
D24 = Number of Preschoolers
D25 = Number of School-Age Children
*/
export const getRatioForFacilityAndChildren = (facilityType, child) => {
  const rates = require('../data/childcare_staff_ratios.json')

  return rates.find((rate) => rate.facilityType === facilityType && rate.child === child)?.numberOfChildren || 1
}

export const getEstimatedNumberOfChildCareWorkers = (
  facilityType,
  estimatedNumberOfPreschoolTeachers = 0,
  estimatedNumberOfChildCareAdministrators = 0,
  infants = 0,
  toddlers = 0,
  preschoolers = 0,
  schoolAgeChildren = 0
) => {
  const total = infants + toddlers + preschoolers + schoolAgeChildren

  if (facilityType === 'FCC') {
    return (Math.ceil(total / 4) - estimatedNumberOfChildCareAdministrators - estimatedNumberOfPreschoolTeachers)
  }

  // This might be on a different route
  const rates = require('../data/childcare_staff_ratios.json')

  const estimated =
    Math.ceil(infants / getRatioForFacilityAndChildren(facilityType, 'Infant'))
    + Math.ceil(toddlers / getRatioForFacilityAndChildren(facilityType, 'Toddler'))
    + Math.ceil(preschoolers / getRatioForFacilityAndChildren(facilityType, 'Preschooler'))
    + Math.ceil(schoolAgeChildren / getRatioForFacilityAndChildren(facilityType, 'School Age'))
    - estimatedNumberOfPreschoolTeachers

  if (estimated < 0) {
    return 0
  }

  return estimated
}

export const getEstimatedNumberOfPreschoolTeachers = (facilityType, numberOfClassrooms = 1) => {
  return facilityType === 'FCC' ? numberOfClassrooms - 1 : numberOfClassrooms
}

export const getEstimatedNumberOfChildCareAdministrators = (facilityType) => {
  // The formula is like this, let's keep it as it is
  // in case it changes in the future
  if (facilityType === 'FCC') {
    return 1
  }

  return 1
}

/*
=+IF(
  D5="Annually",
  ((
    SUMIFS(
      'Salary Data Tab'!C:C,
      'Salary Data Tab'!A:A,
      'Simplified Calculator'!D2,
      'Salary Data Tab'!B:B,
      'Simplified Calculator'!D7
    )
  )),
  ((SUMIFS('Salary Data Tab'!C:C,'Salary Data Tab'!A:A,'Simplified Calculator'!D2,'Salary Data Tab'!B:B,'Simplified Calculator'!D7)))/12
)
*/
export const getExpectedSalary = (county, workerType, salaryType = 'Median') => {
  let index = null

  switch (workerType) {
  case 'Child Care Worker':
    index = 'childcareWorkerMedianSalary'
    break
  case 'Preschool Teacher':
    index = 'preschoolTeacherMedianSalary'
    break
  case 'Administrator':
    index = 'administratorMedianSalary'
    break
  default:
    return null
  }

  const salaries = require('../data/salary_data.json')

  const salary = salaries.find((s) => {
    return s.county === county
      && s.medianOrLivingWage === salaryType
  })

  if (!salary) {
    return null
  }

  return salary[index] / 12 || null
}

/*
=+IF(
  D5="Monthly",
  SUMIFS('Cost Data'!D:D,'Cost Data'!A:A,'Simplified Calculator'!D2,'Cost Data'!B:B,'Simplified Calculator'!D3,'Cost Data'!C:C,'Simplified Calculator'!D6),
  SUMIFS('Cost Data'!D:D,'Cost Data'!A:A,'Simplified Calculator'!D2,'Cost Data'!B:B,'Simplified Calculator'!D3,'Cost Data'!C:C,'Simplified Calculator'!D6)*12
)
*/
export const getExpectedSalaryRevenuePerChild = (county, child, facilityType, median = true) => {
  let index

  switch (child) {
  case 'Infant':
    index = 'infantCost'
    break
  case 'Toddler':
    index = 'toddlerCost'
    break
  case 'Pre School':
    index = 'preschoolCost'
    break
  case 'School Age':
    index = 'schoolAgeCost'
    break
  default:
    return null
  }

  const costs = require('../data/cost_data.json')

  const row = costs.find((c) => {
    return c.county === county
      && c.fccOrCenterBased === facilityType
      && c.medianOr75thPercentile === (median ? 'Median' : '75th Percentile')
  })

  if (!row) {
    return null
  }

  return row[index] || null
}

export const getRegionByCounty = (county) => {
  const regions = require('../data/region_converter.json')

  const row = regions.find((r) => r.county === county)

  if (!row) {
    return null
  }

  return row.region || null
}

/*
=+(IF(
  D5="Monthly",
  SUMIFS(
    DCYFSubsidyRate!B:B,
    DCYFSubsidyRate!A:A,
    VLOOKUP('Simplified Calculator'!D2,'DCYF Region Converter'!A:B,2,FALSE)
  )*22,
  SUMIFS(
    DCYFSubsidyRate!B:B,
    DCYFSubsidyRate!A:A,
    VLOOKUP('Simplified Calculator'!D2,'DCYF Region Converter'!A:B,2,FALSE)
  )*22*12))*(SUMIFS(DCYFSubsidyRate!C21:C34,DCYFSubsidyRate!A21:A34,'Simplified Calculator'!D3,DCYFSubsidyRate!B21:B34,'Simplified Calculator'!D4)
)
*/
export const getSubsidy = (county, child) => {
  const region = getRegionByCounty(county)

  if (!region) {
    return null
  }
  const subsidyRates = require('../data/subsidy_rates.json')

  const row = subsidyRates.find((s) => s.region === region)

  if (!row) {
    return null
  }

  let multiplier = 20

  if (child === 'infants') {
    multiplier = 22
  }

  return (row[child] || 0) * multiplier
}

export const getExpectedFeeRevenue = (
  numberOfInfants,
  numberOfToddlers,
  numberOfPreschoolers,
  numberOfSchoolAgeChildren,
  subsidyPerInfant,
  subsidyPerToddler,
  subsidyOfPreschoolers,
  subsidyOfSchoolAgeChildren,
  revenuePerInfant,
  revenuePerToddler,
  revenueOfPreschoolers,
  revenueOfSchoolAgeChildren,
  percentageChildrenReceivingSubsidy,
  collectionsRate
) => (
  (numberOfInfants * percentageChildrenReceivingSubsidy * subsidyPerInfant) +
  (numberOfToddlers * percentageChildrenReceivingSubsidy * subsidyPerToddler) +
  (percentageChildrenReceivingSubsidy * numberOfPreschoolers * subsidyOfPreschoolers) +
  (numberOfSchoolAgeChildren * percentageChildrenReceivingSubsidy * subsidyOfSchoolAgeChildren) +
  ((1 - percentageChildrenReceivingSubsidy) * numberOfInfants * revenuePerInfant) +
  ((1 - percentageChildrenReceivingSubsidy) * numberOfToddlers * revenuePerToddler) +
  ((1 - percentageChildrenReceivingSubsidy) * numberOfPreschoolers * revenueOfPreschoolers) +
  ((1 - percentageChildrenReceivingSubsidy) * numberOfSchoolAgeChildren * revenueOfSchoolAgeChildren)
) * collectionsRate