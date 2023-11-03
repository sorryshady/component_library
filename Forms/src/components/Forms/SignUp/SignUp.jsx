import React, { useState } from 'react'
import Input from '../../Input/Input'
import styles from './SignUp.module.css'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const { firstName, lastName, email, password } = useSelector(
    (state) => state.register.privateData
  )
  const [submit, setSubmit] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(true)
    const formData = { firstName, lastName, email, password }
    console.log(formData)
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        type={'text'}
        formType={'private'}
        registerType='register'
        name='firstName'
        placeholder={'first name*'}
        submit={submit}
      />
      <Input
        type={'text'}
        formType={'private'}
        registerType='register'
        name='lastName'
        placeholder={'last name*'}
      />
      <Input
        type={'email'}
        formType={'private'}
        registerType='register'
        name='email'
        placeholder={'email*'}
      />
      <Input
        type={'password'}
        formType={'private'}
        registerType='register'
        name='password'
        placeholder={'password*'}
      />
      <Input
        type={'password'}
        formType={'private'}
        registerType='register'
        name='confirmPassword'
        placeholder={'confirm password*'}
        value={password}
      />
      <button className={styles.button}>Submit</button>
    </form>
  )
}

export default SignUp
