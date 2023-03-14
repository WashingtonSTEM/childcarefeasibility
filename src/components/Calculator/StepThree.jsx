import { Row } from 'styled-bootstrap-grid'

import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import Tooltip from '@/components/Tooltip'
import FormGroup from '@/components/FormGroup'

const StepThree = ({ data, onDataChange, isMobile = false, show = false }) => {
  if (!show) {
    return null
  }

  return (
    <>
      <Row>
        <FormGroup lg={3}>
          <Input type='number' label='# of infants' />
        </FormGroup>
        <FormGroup lg={3}>
          <Input type='number' label='# of toddlers' />
        </FormGroup>
        <FormGroup lg={3}>
          <Input type='number' label='# of preschoolers' />
        </FormGroup>
        <FormGroup lg={3}>
          <Input type='number' label='# of children per age' />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={3}>
          <Input type='number' label='# of classrooms' />
        </FormGroup>
        <FormGroup lg={3}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input type='number' label='# of child care workers' />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='This could include center aide, center assistant teacher, family home aide, family home assistant teacher, school-age child care assistant' />
          </div>
          {data.childCareWorkers && data.childCareWorkers !== '' && <TextBox style={{ marginTop: 4 }}>Estimated # of child care administrators (center director of family child care owner)</TextBox>}
        </FormGroup>
        <FormGroup lg={3}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input type='number' label='# of preschool teachers' />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='This could include center lead teacher, family home lead teacher, school-age lead staff or group leader' />
          </div>
          {data.preschoolTeachers && data.preschoolTeachers !== '' && <TextBox style={{ marginTop: 4 }}>Estimated # of preschool teachers</TextBox>}
        </FormGroup>
        <FormGroup lg={3}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input type='number' label='# of child care administrators' />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='This could include center program supervisor, center director, family home owner, school-age assistant director, school-age program director, school-age site coordinator' />
          </div>
          {data.childCareAdministrators && data.childCareAdministrators !== '' && <TextBox style={{ marginTop: 4 }}>Estimated # of child care workers</TextBox>}
        </FormGroup>
      </Row>
    </>
  )
}

export default StepThree
