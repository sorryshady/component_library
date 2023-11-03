import React, { useEffect, useState } from 'react'
import styles from './CustomInput.module.css'
import { emailValidate } from '../../utils/emailValidation'
import { passwordValidate } from '../../utils/passwordValidation'
import { passwordEquality } from '../../utils/passwordValidation'
import { useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
const CustomInput = ({
  type,
  formType,
  registerType = 'signup',
  name,
  placeholder,
  validityCheck = true,
  value = '',
}) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [validity, setValidity] = useState(true)
  const [showPass, setShowPass] = useState(true)
  const [inputType, setInputType] = useState(type)

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
        // setIsTyping(false)
      }, 600)
    }
    if (isTyping && type === 'text') {
      dispatchTimer = setTimeout(() => {
        console.log('dispatching text: ', input)
        dispatch(
          formActions.updateField({
            fieldPath: `${formType}.${name}`,
            value: input,
          })
        )
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
        console.log('dispacthing email')
        dispatch(
          formActions.updateField({
            fieldPath: `${formType}.${name}`,
            value: input,
          })
        )
        setErrorMsg('')
        // console.log('Valid email')
      } else {
        setValidity(false)
        setErrorMsg(valid)
        // console.log(valid)
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
        console.log('dispacthing password')
        dispatch(
          formActions.updateField({
            fieldPath: `${formType}.${name}`,
            value: input,
          })
        )
        setErrorMsg('')
        // console.log('valid password')
      } else {
        setValidity(false)
        setErrorMsg(valid)
        // console.log(valid)
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

export default CustomInput
