import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import InfoButton from './InfoButton'
import TextBox from './TextBox'

const PortalContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 44px;
  right: 0;
  padding: inherit;
  box-sizing: border-box;
  font-style: italic;
`

let timeout

const Tooltip = ({ tooltipText, trigger, children }) => {
  const [show, setShow] = useState(false)
  const divRef = useRef()

  const handleOnMouseOver = () => {
    clearTimeout(timeout)
    setShow(true)
  }

  const handleOnMouseLeve = () => {
    timeout = setTimeout(() => {
      setShow(false)
    }, 350)
  }

  const handleOnClick = () => {
    setShow((prev) => !prev)
  }

  const containerProps = trigger !== 'click' ? ({
    onMouseOver: handleOnMouseOver,
    onMouseLeave: handleOnMouseLeve
  }) : ({
    onClick: handleOnClick
  })

  return (
    <div {...containerProps} style={ { marginBottom: 3 } }>
      <div style={{ fontStyle: 'italic' }}>
        <div ref={divRef}>
          {children || <InfoButton backgroundColor={show ? '#012846' : null} />}
        </div>
      </div>
      {show && (
        <PortalContainer style={{ top: divRef.current?.offsetHeight + 8 }}>
          <TextBox>{tooltipText}</TextBox>
        </PortalContainer>
      )}
    </div>
  )
}

Tooltip.propTypes = {
  tooltipText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  boxWidth: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'click']),
  position: PropTypes.oneOf(['left', 'right']),
}

Tooltip.defaultProps = {
  boxWidth: 200,
  trigger: 'hover',
  position: 'left'
}

export default Tooltip