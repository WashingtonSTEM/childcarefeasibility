import { Col } from 'styled-bootstrap-grid'
import styled from 'styled-components'

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0.5rem;
  color: #534F4D;
`

const FormGroup = ({ error, children, ...props }) => (
  <Col {...props} className={`form-group${error ? ' form-group-error' : ''}`}>
    {props.label && <Label>{props.label}</Label>}
    {children}
    {error && <small className='text-error'>{error}</small>}
  </Col>
)

export default FormGroup
