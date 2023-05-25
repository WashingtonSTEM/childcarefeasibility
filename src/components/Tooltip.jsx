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

const Tooltip = ({ tooltipText, trigger, disabled, children }) => {
  const [show, setShow] = useState(false)
  const divRef = useRef()
  const timeoutRef = useRef()

  const handleOnMouseOver = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShow(true)
  }

  const handleOnMouseLeve = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(false)
    }, 150)
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
          {children || <InfoButton disabled={disabled} backgroundColor={show ? '#012846' : null} />}
        </div>
      </div>
      {(show && !disabled) && (
        <PortalContainer style={{ top: divRef.current?.offsetHeight + 30 }}>
          <TextBox>{tooltipText}</TextBox>
        </PortalContainer>
      )}
    </div>
  )
}

Tooltip.propTypes = {
  tooltipText: PropTypes.any.isRequired,
  boxWidth: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'click']),
  position: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
}

Tooltip.defaultProps = {
  boxWidth: 200,
  trigger: 'hover',
  position: 'left',
  disabled: false,
}

export default Tooltip