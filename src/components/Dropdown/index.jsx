import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Menu, { MenuItem } from './Menu'
import List, { ListItem } from './List'

import DropdownArrowDown from '../../assets/dropdown-arrow.svg'

const Toggle = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background: #D9D9D9;
  border: 1px solid #012846;
  border-radius: ${props => props.show ? '4px 4px 0 0' : '4px'};
  font-family: inherit;
  font-size: inherit;
  color: '#012846';
  text-align: left;
  padding: 0 10px;
  cursor: pointer;
  span {
    display: inline-block;
    text-overflow: ellipsis;
    width: calc(100% - 18px);
    white-space: nowrap;
    overflow: hidden;
  }
  &:after {
    content: '';
    position: absolute;
    width: 18px;
    height: 10px;
    top: calc(50% - 5px);
    right: 10px;
    transition: 250ms all;
    transform: rotate(${props => props.show ? '180' : '0'}deg);
    background-image: url(${DropdownArrowDown.src});
  }
}
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 768px) {
    height: 55px;
    font-size: 17px;
  }
`

const Dropdown = ({ label, options, value, onChange, ...props }) => {
  const containerRef = useRef()
  const [show, setShow] = useState(false)
  const selectedOption = value ? options.find(({ value: opValue }) => opValue === value)?.text : null

  const open = () => setShow(true)

  const close = () => setShow(false)

  useEffect(() => {
    const handleClickListener = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close()
      }
    }

    document.addEventListener('click', handleClickListener)

    return () => {
      document.removeEventListener('click', handleClickListener)
    }
  }, [])

  const handleOnClick = () => show ? close() : open()

  const handleSelection = (value) => {
    onChange?.(value)
    close()
  }

  return (
    <Container ref={containerRef} type={props.type} className="dropdown-control">
      <Toggle onClick={handleOnClick} show={show}>
        <span>
          {selectedOption || label}
        </span>
      </Toggle>
      {props.type !== 'list' && show && (
        <Menu show={show}>
          {options.map(({ text, value }, index) => (
            <MenuItem key={`item-${index}`} value={value} onClick={handleSelection}>{text}</MenuItem>
          ))}
        </Menu>
      )}
      {props.type === 'list' && show && (
        <List show={show} onClose={close}>
          {options.map(({ text, value }, index) => (
            <ListItem key={`item-${index}`} value={value} onClick={handleSelection}>{text}</ListItem>
          ))}
        </List>
      )}
    </Container>
  )
}

Dropdown.propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf(['menu', 'list']),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string
  }))
}

Dropdown.defaultProps = {
  type: 'menu',
  value: null,
}

export default Dropdown
