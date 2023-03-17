import { useState } from 'react'
import styled from 'styled-components'

import InfoButton from '@/components/InfoButton'

const Text = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-transform: capitalize;
  color: #948A85;
`

const Instructions = ({ text }) => {
  const [show, setShow] = useState(false)

  return (
    <div style={{  margin: '18px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Instructions</Text>
        <InfoButton onClick={() => setShow((prev) => !prev)} />
      </div>
      {show && (
        <div style={{ marginTop: 18 }}>
          <Text style={{ fontSize: 14 }}>{text}</Text>
        </div>
      )}
    </div>
  )
}

export default Instructions
