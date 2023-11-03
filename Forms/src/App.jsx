import { useState } from 'react'
import SignUp from './components/Forms/SignUp/SignUp'
import NewInput from './components/NewInput/NewInput'
import { useSelector } from 'react-redux'

function App() {
  let submitTimer
  const [submit, setSubmit] = useState(false)
  const { email } = useSelector((state) => state.register.privateData)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(true)
    console.log(email)
    clearTimeout(submitTimer)
    submitTimer = setTimeout(() => {
      setSubmit(false)
    }, 500)
  }
  return (
    <>
      <div className='app'>
        {/* <SignUp /> */}
        {/* <Login /> */}
        <form onSubmit={handleSubmit}>
          <NewInput
            type={'email'}
            formType={'private'}
            registerType={'register'}
            name={'email'}
            placeholder={'email*'}
            submit={submit}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
