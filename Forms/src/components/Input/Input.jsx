import React, { useState, useEffect } from 'react'
import styles from './Input.module.css'
import { emailValidate } from '../../utils/emailValidation'
import {
  passwordValidate,
  passwordEquality,
} from '../../utils/passwordValidation'
import { useDispatch, useSelector } from 'react-redux'
import { registerActions } from '../../store/register-slice'
import { loginSubActions } from '../../store/loginSub-slice'

const Input = ({
  type,
  formType, //private, company, subscribe
  registerType = 'register', // register, login, subscribe
  name,
  placeholder,
  validityCheck = true,
  value = '',
  submit,
}) => {
  const selectField = (state, fieldPath) => {
    const pathParts = fieldPath.split('.')
    let selectedState = state
    for (const pathPart of pathParts) {
      selectedState = selectedState[pathPart]
    }
    return selectedState
  }

  const fieldPath = `${registerType}.${formType}Data.${name}`
  const stateValue = useSelector((state) => selectField(state, fieldPath))

  const dispatch = useDispatch()
  const [input, setInput] = useState(stateValue)
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
          value: input,
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
          value: input,
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

  const handleChange = (e) => {
    setInput(e.target.value)
    setIsTyping(true)
    setValidity(true)
  }

  const handleShowPass = () => {
    setShowPass(!showPass)
    showPass ? setInputType('text') : setInputType('password')
  }

  const handleBlur = (e) => {
    if (e.target.value.trim() === '') {
      setErrorMsg('')
      setValidity(false)
    }
  }

  useEffect(() => {
    let debounce, dispatchTimer

    if (
      isTyping &&
      (type === 'email' || type === 'password') &&
      validityCheck
    ) {
      debounce = setTimeout(() => {
        performValidityCheck(input.trim())
        setIsTyping(false)
      }, 600)
    }
    if (isTyping && type === 'text') {
      dispatchTimer = setTimeout(() => {
        // console.log('dispatching: ', input)
        if (registerType === 'register') {
          dispatchRegister()
        } else {
          dispatchLoginSub()
        }
      }, 600)
    }
    return () => {
      clearTimeout(debounce)
      clearTimeout(dispatchTimer)
    }
  }, [input, isTyping])

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
        // console.log('checking confirm')
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

  return (
    <>
      <div className={`${styles['main-container']}`}>
        <input
          type={inputType}
          className={`${styles.input} ${
            registerType !== 'subscribe' && styles.notSubscribe
          } ${
            validity ? '' : registerType !== 'subscribe' ? styles.invalid : ''
          }`}
          placeholder=' '
          value={input}
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

export default Input
