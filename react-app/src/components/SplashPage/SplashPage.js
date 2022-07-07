import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import Home from "../Home/Home";
import './SplashPage.css'
import { login } from "../../store/session";


const SplashPage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

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

    const demoLogin = async () => {
        await dispatch(login('demo@aa.io', 'password'));
    }

    if (sessionUser) {
        return (
            <Home />
        )
    } else {
        return (
            <div className="login-signup-div">

                <div className="splash-left-right-div">
                    <div className="splash-left-div">
                        <div className="splash-left" style={{ width: '300px', height: '500px', padding: '20px' }}>
                        </div>
                    </div>
                    <div className="splash-right">
                        <div className={`${loginDisplay} login-form`}>
                            <div className="btn-div">
                                <button onClick={demoLogin} className="demo-btn">Demo User</button>
                            </div>
                            <LoginForm formDisplay={formDisplay} />
                        </div>
                        <div className={`${signUpDisplay} sign-up-form`}>
                            <div className="btn-div">
                                <button onClick={demoLogin} className="demo-btn">Demo User</button>
                            </div>
                            <SignUpForm formDisplay={formDisplay} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default SplashPage
