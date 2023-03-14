export const hasValue = (value) => value !== '' && value !== null && value !== undefined

export const isRequired = (key, value) => {
  if (hasValue(value)) {
    return null // no error
  }

  return 'This field is required'
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

      const error = func(key, data[key])

      if (error) {
        hasErrors = true
        errors[key] = error
      }
    }
  }

  return { errors, isValid: !hasErrors }
}


export default validate
