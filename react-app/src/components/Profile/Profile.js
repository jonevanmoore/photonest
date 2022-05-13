import { useParams } from "react-router-dom"
import './Profile.css'

const Profile = () => {
    const { username } = useParams()
    return (
        <div className="profile-body">
            <span>HELLO USER</span>
        </div>
    )
}

export default Profile
