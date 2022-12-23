import { useEffect, useState } from 'react'
import SimpleForm from './SimpleForm'
import InputField from './InputField'
import Header from '../Header'
import { Grid,Paper, Avatar } from '@mui/material'
import './RegisterForm.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



const RegisterForm = ({ onSubmit, initialValue = {} }) => {


  const [formFields, setFormFields] = useState(initialValue)

  const [valid, setValid] = useState(true)
  const [errors, setErrors] = useState({})

  const paperStyle={padding :10,minHeight:'70vh',width:'500px',margin:'10px auto'}
  const avatarStyle={backgroundColor:'#1bbd7e'}

  const positions=['Forward','Midfielder','Defender','Goalkeeper','Hey','hey']
  const foot=['Right','Left']

  useEffect(() => {
    console.log("on change",)
    setFormFields(formFields)
    setValid(valid)
    setErrors(errors)
  }, [formFields, valid, errors])

  return (
      <div>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
                      <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                      <h2>Sign Up Form</h2>
          </Grid>
          <SimpleForm
          value={formFields}
          onChange={setFormFields}
          onValid={(v, errs) => {
            setValid(v)
            setErrors(errs)
          }}
        >
        <div className="register-field">
          <InputField

            name="name"
            onValidate={(v) =>
              !v || v.length < 3 ? 'Too short!' : null
            }
          />

          <InputField
            name="lastname"
            onValidate={(v) => (v ? null : 'Required')}
          />
        </div>

          
        <div className="register-field">
          <InputField
            name="email"
            type="email"
            onValidate={(v) => (v ? null : 'Required')}
          />

          <InputField
            name="password"
            type="password"
            onValidate={(v) => (v ? null : 'Required')}
          />
        </div>

        <div className="register-field">
          <InputField
            name="password-confirmation"
            type="password"
            onValidate={(v) => (v ? null : 'Required')}
          />

          <InputField
            name="Position"
            type="dropdown"
            listItems={positions}
            onValidate={(v) => (v ? null : 'Required')}
          />
        </div>


        <div className="register-field">
          <InputField
              name="address"
              onValidate={(v) => (v ? null : 'Required')}
            />

          <InputField
            name="Foot"
            type="dropdown"
            listItems={foot}
            onValidate={(v) => (v ? null : 'Required')}
          />
        </div>
        <div className="register-field">
          <InputField
              name="age"
              type="number"
              onValidate={(v) =>
                !v || parseInt(v) < 18 ? 'Must be at least 18' : null
              }
            />

            <InputField
              name="Date Of Birth"
              type="date"
              onValidate={(v) => (v ? null : 'Required')}
            />
        </div>
        <button
          onClick={() => onSubmit && onSubmit(formFields)}
          disabled={!valid}
        >
          Submit!
        </button>
        </SimpleForm>
      </Paper>
      </div>
  )
}

export default RegisterForm
