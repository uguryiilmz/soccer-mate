import { useContext, useEffect, useState } from 'react'
import FormContext from './FormContext'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './InputField.css'

const splitCamelCase = (s) =>
  s
    .replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2')
    .replace(/^([a-z])/, (x) => x.toUpperCase())

const InputField = (props) => {
  const form = useContext(FormContext)

  const [error, setError] = useState('')

  const { onValidate, name, label,listItems, ...otherProps } = props

  let value = form.value && form.value(name)

  useEffect(() => {
    if (onValidate) {
      setError(onValidate(value))
    }
  }, [onValidate, value])

  const setInvalid = form.setInvalid

  const isDropDown=otherProps.type==='dropdown'

  useEffect(() => {
    if (setInvalid) {
      setInvalid(name, error)
    }
  }, [setInvalid, name, error])

  if (!form.value) {
    return 'InputField should be wrapped in a form'
  }



  return (
    <div className="InputField">
      <label htmlFor={name}>{label || splitCamelCase(name)}:</label>
      {isDropDown 
      ? <Box sx={{ minWidth: 120, maxHeight:21 }}>
          <FormControl>
            <Select
              style={{height:21,width:172,fontSize:12}}
              labelId="demo-simple-select-label"
              id={name}
              value={value||''}
              onChange={(event) => {
                form.setDirty(name)
                form.setValue(name, event.target.value)
              }}
            >
              {listItems.map((li)=>(
                <MenuItem key={li} style={{fontSize:12}} value={li}>{li}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      :<input
        className="InputSize"
        id={name}
        onBlur={() => form.setDirty(name)}
        value={value || ''}
        onChange={(event) => {
          form.setDirty(name)
          form.setValue(name, event.target.value)
        }}
        {...otherProps}
      />}{' '}
      {
        <div className="InputField-error">
          {form.isDirty(name) && error ? error : <>&nbsp;</>}
        </div>
      }
    </div>
  )
}

export default InputField
