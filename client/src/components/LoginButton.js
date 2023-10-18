import React from 'react'
import {GoogleLogin} from 'react-google-login'
const clientId = "527841808497-gelcv9a1tom7l177ldu3632ve9aff60c.apps.googleusercontent.com"

const LoginButton = () => {
    const onSuccess = (res) => {
        console.log("login success! current user; ", res.profileObj)
      }
      const onFailure = (res) => {
        console.log("login failed! res; ", res)
      }
  return (
    <div id="signInButton">
        <GoogleLogin
            clientId = {clientId}
            buttonText = "Login"
            onSuccess = {onSuccess}
            onFailure = {onFailure}
            cookiePloicy = {'sibgle_host_origin'}
            isSignedIn = {true}
        />
    </div>
  )
}

export default LoginButton
