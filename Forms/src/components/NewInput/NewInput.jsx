import React, { useRef, useState } from 'react'
import styles from './NewInput.module.css'
import { useDispatch } from 'react-redux'
import { emailValidate } from '../../utils/emailValidation'
import {
  passwordEquality,
  passwordValidate,
} from '../../utils/passwordValidation'
import { registerActions } from '../../store/register-slice'
import { loginSubActions } from '../../store/loginSub-slice'

const NewInput = ({
  type,
  formType,
  registerType,
  name,
  placeholder,
  validityCheck = true,
  value = '',
  submit,
}) => {
  let debounce
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const [isTyping, setIsTyping] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [validity, setValidity] = useState(true)
  const [showPass, setShowPass] = useState(true)
  const [inputType, setInputType] = useState(type)

  const dispatchRegister = (receivedValue = '') => {
    if (receivedValue !== 'empty') {
      dispatch(
        registerActions.updateField({
          fieldPath: `${formType}.${name}`,
          value: inputRef.current.value,
        })
      )
    } else {
      dispatch(
        registerActions.updateField({
          fieldPath: `${formType}.${name}`,
          value: '',
        })
      )
    }
  }

  const dispatchLoginSub = (receivedValue = '') => {
    if (receivedValue !== 'empty') {
      dispatch(
        loginSubActions.updateField({
          fieldPath: `${formType}.${name}`,
          value: inputRef.current.value,
        })
      )
    } else {
      dispatch(
        loginSubActions.updateField({
          fieldPath: `${formType}.${name}`,
          value: '',
        })
      )
    }
  }
  const handleBlur = (e) => {
    if (e.target.value.trim() === '') {
      setErrorMsg('')
      setValidity(false)
    }
  }

  const handleShowPass = () => {
    setShowPass(!showPass)
    showPass ? setInputType('text') : setInputType('password')
  }

  const handleChange = () => {
    clearTimeout(debounce)
    debounce = setTimeout(() => {
      console.log('debouncing')
      handleDispatch()
    }, 1000)
    setIsTyping(true)
    setValidity(true)
  }

  const handleDispatch = () => {
    if (
      isTyping &&
      (type === 'email' || type === 'password') &&
      validityCheck
    ) {
      console.log('performing check')
      performValidityCheck(inputRef.current.value)
    }
    if (isTyping && type === 'text') {
      if (registerType === 'register') {
        dispatchRegister()
      } else {
        dispatchLoginSub()
      }
    }
  }

  const performValidityCheck = (checkValue) => {
    if (type === 'email') {
      const valid = emailValidate(checkValue)
      if (!valid) {
        setValidity(true)
        if (registerType === 'register') {
          dispatchRegister()
        } else {
          dispatchLoginSub()
        }
        setErrorMsg('')
      } else {
        setValidity(false)
        if (registerType === 'register') {
          dispatchRegister('empty')
        } else {
          dispatchLoginSub('empty')
        }
        setErrorMsg(valid)
      }
    }
    if (type === 'password') {
      let valid
      if (name === 'password') {
        valid = passwordValidate(checkValue)
      } else if (name === 'confirmPassword') {
        valid = passwordEquality(checkValue, value)
      }
      if (!valid) {
        setValidity(true)
        if (registerType === 'register') {
          dispatchRegister()
        } else {
          dispatchLoginSub()
        }
        setErrorMsg('')
      } else {
        setValidity(false)
        if (registerType === 'register') {
          dispatchRegister('empty')
        } else {
          dispatchLoginSub('empty')
        }
        setErrorMsg(valid)
      }
    }
  }

  if (submit) {
    inputRef.current.value = ''
  }

  return (
    <>
      {/* <input
        type='text'
        ref={inputRef}
        onChange={handleChange}
        placeholder='enter name'
      /> */}
      <div className={`${styles['main-container']}`}>
        <input
          type={inputType}
          className={`${styles.input} ${
            registerType !== 'subscribe' && styles.notSubscribe
          } ${
            validity ? '' : registerType !== 'subscribe' ? styles.invalid : ''
          }`}
          ref={inputRef}
          placeholder=' '
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`${styles.placeholder}  ${
            registerType !== 'subscribe' && styles.notSubscribe
          } ${
            validity ? '' : registerType != 'subscribe' ? styles.invalid : ''
          }`}
        >
          {placeholder}
        </span>
        <div className={styles.actions}>
          {registerType === 'login' && type === 'password' ? (
            <span className={styles.forgot}>Forgot password?</span>
          ) : (
            <span className={styles.errorMsg}>{errorMsg}</span>
          )}
          {type === 'password' && (
            <span
              className={`${styles.show} ${!showPass ? styles.active : ''}`}
              onClick={handleShowPass}
            >
              Show
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default NewInput
