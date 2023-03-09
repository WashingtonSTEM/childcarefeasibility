import { useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import IconButton from './IconButton'
import TextBox from './TextBox'

const getPortalYPos = (position, y, width, boxWidth) => {
  switch (position) {
  case 'left':
    return (y + width) - boxWidth - width
  default:
    return y
  }
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
`

const Tooltip = ({ tooltipText, boxWidth, trigger, position }) => {
  const tooltipRef = useRef()
  const portalElement = useRef()
  const portalRoot = useRef()

  useEffect(() => () => {
    removePortal()
  }, [])

  const addPortal = () => {
    const x = tooltipRef.current.offsetLeft
    const y = tooltipRef.current.offsetTop
    const width = tooltipRef.current.offsetHeight

    portalElement.current = document.createElement('div')

    portalElement.current.id = 'tooltip-portal'
    portalElement.current.style.cssText = `position:absolute;top:${x + width + 5}px;left:${getPortalYPos(position, y, width, boxWidth)}px;width:${boxWidth}px;`
    document.body.appendChild(portalElement.current)

    portalRoot.current = createRoot(portalElement.current)
    portalRoot.current.render(<TextBox>{tooltipText}</TextBox>)
  }

  const removePortal = () => {
    if (portalElement.current) {
      document.body.removeChild(portalElement.current)
      portalElement.current = null
      portalRoot.current.unmount()
    }
  }

  const handleOnMouseOver = () => {
    if (portalElement.current) {
      return
    }
    addPortal()
  }

  const handleOnMouseLeve = () => {
    removePortal()
  }

  const handleOnClick = () => {
    if (portalElement.current) {
      removePortal()

      return
    }
    addPortal()
  }

  const containerProps = trigger !== 'click' ? ({
    onMouseOver: handleOnMouseOver,
    onMouseLeave: handleOnMouseLeve
  }) : ({
    onClick: handleOnClick
  })

  return (
    <Container ref={tooltipRef} {...containerProps}>
      <IconButton backgroundColor="#012846">
        <svg
          width="6"
          height="15"
          viewBox="0 0 6 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.5 1.5C1.5 1.10218 1.65804 0.720644 1.93934 0.43934C2.22064 0.158035 2.60218 0 3 0C3.39782 0 3.77936 0.158035 4.06066 0.43934C4.34196 0.720644 4.5 1.10218 4.5 1.5C4.5 1.89782 4.34196 2.27936 4.06066 2.56066C3.77936 2.84196 3.39782 3 3 3C2.60218 3 2.22064 2.84196 1.93934 2.56066C1.65804 2.27936 1.5 1.89782 1.5 1.5ZM0 6C0 5.44688 0.446875 5 1 5H3C3.55312 5 4 5.44688 4 6V13H5C5.55312 13 6 13.4469 6 14C6 14.5531 5.55312 15 5 15H1C0.446875 15 0 14.5531 0 14C0 13.4469 0.446875 13 1 13H2V7H1C0.446875 7 0 6.55312 0 6Z" fill="white" />
        </svg>
      </IconButton>
    </Container>
  )
}

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
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