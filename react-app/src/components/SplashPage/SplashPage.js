import { useSelector } from "react-redux"
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"


const SplashPage = () => {

    const sessionUser = useSelector(state => state.session.user)

    return (

        <div className="login-signup-div">
            <LoginForm />
            <br>
            </br>
            <SignUpForm />
        </div>

    )
}

export default SplashPage
