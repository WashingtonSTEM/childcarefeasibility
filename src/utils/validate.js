export const hasValue = (value) => value !== '' && value !== null && value !== undefined

export const isRequired = (key, value) => {
  if (hasValue(value)) {
    return null // no error
  }

  return {
    message: 'This field is required',
    code: 'REQUIRED'
  }
}

export const minNumber = (min) => (key, value) => {
  if (parseFloat(value) >= min) {
    return null // no error
  }

  return {
    message: `Min. acepted value is ${min}`,
    code: 'MIN_VALUE'
  }
}

export const minInt = (min) => (key, value) => {
  if (parseInt(value) >= min) {
    return null // no error
  }

  return {
    message: `Min. acepted value is ${min}`,
    code: 'MIN_VALUE',
    min,
  }
}

export const maxNumber = (max) => (key, value) => {
  if (parseFloat(value) <= max) {
    return null // no error
  }

  return {
    message: `Max. acepted value is ${max}`,
    code: 'MAX_VALUE',
    max,
  }
}

const validate = (data, rules, intl) => {
  if (typeof data !== 'object' || Array.isArray(data)) {
    return false
  }
  const errors = {}
  let hasErrors = false

  for (const [key, funcs] of Object.entries(rules)) {
    for (const func of funcs) {
      if (typeof func !== 'function') {
        return
      }

      const error = func(key, data[key], data)

      if (error) {
        hasErrors = true
        errors[key] = error
        break
      }
    }
  }

  return { errors, isValid: !hasErrors }
}


export default validate
