import React from 'react'
import {GoogleLogout} from 'react-google-login'
const clientId="527841808497-gelcv9a1tom7l177ldu3632ve9aff60c.apps.googleusercontent.com"

const onSuccess = () => {
    console.log("Log out successful")
  }

const LogoutButton = () => {
  return (
    <div id='signOutButton'>
        <GoogleLogout
            clientId = {clientId}
            buttonText = {"Logout"}
            onLogoutSuccess={onSuccess}
        />
    </div>
  )
}

export default LogoutButton