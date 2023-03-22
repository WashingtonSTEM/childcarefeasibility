export const hasValue = (value) => value !== '' && value !== null && value !== undefined

export const isRequired = (key, value) => {
  if (hasValue(value)) {
    return null // no error
  }

  return 'This field is required'
}

export const minNumber = (min) => (key, value) => {
  if (parseFloat(value) >= min) {
    return null // no error
  }

  return `Min. acepted value is ${min}`
}

export const minInt = (min) => (key, value) => {
  if (parseInt(value) >= min) {
    return null // no error
  }

  return `Min. acepted value is ${min}`
}

export const maxNumber = (max) => (key, value) => {
  if (parseFloat(value) <= max) {
    return null // no error
  }

  return `Max. acepted value is ${min}`
}

const validate = (data, rules) => {
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
