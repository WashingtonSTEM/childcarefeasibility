import { useState } from 'react'

import validate from '@/utils/validate'

const useForm = (defaultData = {}) => {
  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState({})

  const handleOnChange = (name, value) => {
    data[name] = value
    setData({ ...data })
  }

  const validateData = (data, validationRules) => {
    const { errors, isValid } = validate(data, validationRules)

    if (!isValid) {
      setErrors(errors)
    } else {
      setErrors({})
    }

    return isValid
  }

  const clean = () => {
    setData({})
    setErrors({})
  }

  return { data, onDataChange: handleOnChange, validate: validateData, errors, clean }
}

export default useForm