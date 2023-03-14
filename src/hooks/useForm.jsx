import { useState } from 'react'

const useForm = ({ defaultData = {} }) => {
  const [data, setData] = useState(defaultData)

  const handleOnChange = (name, value) => {
    data[name] = value
    setData({ ...data })
  }

  return { data, onDataChange: handleOnChange }
}

export default useForm