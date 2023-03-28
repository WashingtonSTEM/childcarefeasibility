import styled from 'styled-components'

const Menu = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  max-height: 250px;
  position: absolute;
  inset: 0px auto auto 0px;
  background: #948A85;
  width: 100%;
  border-radius: 0px 0px 4px 4px;
  padding: 4px 0;
  overflow-y: auto;
  transform: translate(0px, 40px);
  z-index: 1;
  @media (max-width: 768px) {
    transform: translate(0px, 55px);
  }
`

const Item = styled.a`
  display: block;
  color: #012846;
  cursor: pointer;
  text-decoration: none;
  padding: 12px 10px;
  &:hover {
    background: #D9D9D9;
  }
  @media (max-width: 768px) {
    padding: 18px 10px;
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