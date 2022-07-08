import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchUsers } from "../../store/user"
import LogoutButton from "../auth/LogoutButton"

const About = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const username = sessionUser?.username

    useEffect(() => {
        dispatch(fetchUsers)
    }, [dispatch])

    return (
        <>
            <div className="desktop-footer-div">
                <footer className="desktop-footer">
                    <a href="https://github.com/jonevanmoore" target="_blank"> <i className="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com/in/jonevanmoore" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
                </footer>
            </div>
            {sessionUser && (
                <div className="mobile-footer-div">
                    <footer className="mobile-footer">
                        <div className="footer-button">
                            <NavLink to='/'><i className="fa-solid fa-house-chimney fa-navbar foot-mobile"></i></NavLink>
                        </div>
                        <div className="footer-button">
                            <NavLink to={`/${username}`}><i className="fa-solid fa-user fa-navbar foot-mobile"></i></NavLink>
                        </div>
                        <div className="footer-button footer-logout">
                            <LogoutButton />
                        </div>
                    </footer>
                </div>
            )}
        </>
    )
}

export default About
