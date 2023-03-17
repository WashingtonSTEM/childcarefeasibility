/*
export enum FacilityType {
  FCC = 'FCC',
  CenterBased = 'Center',
  NatureBased = 'Nature'
};

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
