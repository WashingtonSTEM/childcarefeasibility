import { Row } from 'styled-bootstrap-grid'

import Input from '@/components/Input'
import TextBox from '@/components/TextBox'
import Tooltip from '@/components/Tooltip'
import FormGroup from '@/components/FormGroup'
import Instructions from '@/components/Calculator/Instructions'
import { isRequired, minInt } from '@/utils/validate'

export const validationRules = {
  numberOfInfants: [isRequired, minInt(0)],
  numberOfToddlers: [isRequired, minInt(0)],
  numberOfPreschoolers: [isRequired, minInt(0)],
  numberOfChildrenPerAge: [isRequired, minInt(0)],
  numberOfClassrooms: [isRequired, minInt(0)],
  numberOfChildCaseWorkers: [isRequired, minInt(0)],
  numberOfPreschoolTeachers: [isRequired, minInt(0)],
  numberOfChildCareAdministrators: [isRequired, minInt(0)],
}

const StepThree = ({ data, onDataChange, errors, isMobile = false, show = false }) => {
  if (!show) {
    return null
  }

  const handleOnChange = ({ target }) => {
    onDataChange?.(target.name, target.value)
  }

  return (
    <>
      <Instructions text='Enter below how many children, classrooms, and staff you plan to have in your program. Remember staffing ratio requirements for each age group when you enter the number of staff you intend to hire.' />
      <Row>
        <FormGroup lg={3} error={errors.numberOfInfants}>
          <Input
            name='numberOfInfants'
            type='number'
            label='# of infants'
            min={0}
            value={data.numberOfInfants}
            onChange={handleOnChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfToddlers}>
          <Input
            name='numberOfToddlers'
            type='number'
            label='# of toddlers'
            min={0}
            value={data.numberOfToddlers}
            onChange={handleOnChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfPreschoolers}>
          <Input
            name='numberOfPreschoolers'
            type='number'
            label='# of preschoolers'
            min={0}
            value={data.numberOfPreschoolers}
            onChange={handleOnChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfChildrenPerAge}>
          <Input
            name='numberOfChildrenPerAge'
            type='number'
            label='# of children per age'
            min={0}
            value={data.numberOfChildrenPerAge}
            onChange={handleOnChange}
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup lg={3} error={errors.numberOfClassrooms}>
          <Input
            name='numberOfClassrooms'
            type='number'
            label='# of classrooms'
            min={0}
            value={data.numberOfClassrooms}
            onChange={handleOnChange}
          />
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfChildCaseWorkers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input
              name='numberOfChildCaseWorkers'
              type='number'
              label='# of child care workers'
              min={0}
              value={data.numberOfChildCaseWorkers}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='This could include center aide, center assistant teacher, family home aide, family home assistant teacher, school-age child care assistant' />
          </div>
          {data.numberOfChildCaseWorkers && data.numberOfChildCaseWorkers !== '' && <TextBox style={{ marginTop: 4 }}>Estimated # of child care administrators (center director of family child care owner)</TextBox>}
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfPreschoolTeachers}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input
              name='numberOfPreschoolTeachers'
              type='number'
              label='# of preschool teachers'
              min={0}
              value={data.numberOfPreschoolTeachers}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='This could include center lead teacher, family home lead teacher, school-age lead staff or group leader' />
          </div>
          {data.numberOfPreschoolTeachers && data.numberOfPreschoolTeachers !== '' && <TextBox style={{ marginTop: 4 }}>Estimated # of preschool teachers</TextBox>}
        </FormGroup>
        <FormGroup lg={3} error={errors.numberOfChildCareAdministrators}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Input
              name='numberOfChildCareAdministrators'
              type='number'
              label='# of child care administrators'
              min={0}
              value={data.numberOfChildCareAdministrators}
              onChange={handleOnChange}
            />
            <Tooltip trigger={isMobile ? 'click' : 'hover'} tooltipText='This could include center program supervisor, center director, family home owner, school-age assistant director, school-age program director, school-age site coordinator' />
          </div>
          {data.numberOfChildCareAdministrators && data.numberOfChildCareAdministrators !== '' && <TextBox style={{ marginTop: 4 }}>Estimated # of child care workers</TextBox>}
        </FormGroup>
      </Row>
    </>
  )
}

export default StepThree
