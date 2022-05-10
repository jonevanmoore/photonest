import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import './SplashPage.css'


const SplashPage = () => {
    const sessionUser = useSelector(state => state.session.user)

    const [loginDisplay, setLoginDisplay] = useState('displayed')
    const [signUpDisplay, setSignUpDisplay] = useState('not-displayed')

    const formDisplay = () => {
        if (loginDisplay === "displayed") {
            setLoginDisplay("not-displayed")
            setSignUpDisplay('displayed')
        } else {
            setLoginDisplay('displayed')
            setSignUpDisplay('not-displayed')
        }
    }

    return (
        <div className="login-signup-div">
            <div className="splash-left-right-div">

                <div className="splash-left">
                    <img src="./static/splash_page.PNG" style={{ width: '325px' }} className="reflection"></img>
                </div>
                <div>
                    <div className={`${loginDisplay}`}>
                        <LoginForm formDisplay={formDisplay} />

                    </div>
                    <div className={`${signUpDisplay}`}>
                        <SignUpForm formDisplay={formDisplay} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage
