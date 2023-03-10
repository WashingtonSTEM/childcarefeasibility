import styled from 'styled-components'

const Menu = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  max-height: 150px;
  position: absolute;
  inset: 0px auto auto 0px;
  transform: translate(0px, 55px);
  background: #948A85;
  width: 100%;
  border-radius: 0px 0px 4px 4px;
  padding: 4px 0;
  overflow-y: auto;
`

const Item = styled.a`
  display: block;
  padding: 18px 10px;
  color: #012846;
  cursor: pointer;
  text-transform: capitalize;
  text-decoration: none;
  &:hover {
    background: #D9D9D9;
  }
`

export const MenuItem = ({ value, onClick, children }) => {
  const handleOnClick = (event) => {
    event.preventDefault()
    onClick?.(value)
  }

  return (
    <Item href={`#/${value}`} onClick={handleOnClick}>{children}</Item>
  )
}

export default Menu