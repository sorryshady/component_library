import { configureStore } from '@reduxjs/toolkit'
import formSlice from './form-slice'
import loginSubSlice from './loginSub-slice'
import registerSlice from './register-slice'
const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    loginSub: loginSubSlice.reducer,
    register: registerSlice.reducer,
  },
})

export default store
