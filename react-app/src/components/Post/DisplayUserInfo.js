const DisplayUserInfo = ({ sessionUser, showModal }) => {
    return (
        <>
            <div>
                <img src={sessionUser.profile_image} style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
            </div>
            <div style={{ paddingLeft: '10px', marginTop: '5px' }}>
                <div style={{ maxWidth: '100px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', float: 'left' }}>{sessionUser.username}</span>
                </div>
                <div className="full-name" style={{ maxWidth: '100px' }}>
                    <span style={{ fontSize: '12px', float: 'left', color: 'gray', overflowY: 'break-line' }}>{`${sessionUser.first_name} ${sessionUser.last_name}`}</span>
                    <span style={{ fontSize: '10px', float: 'left', cursor: 'pointer' }} onClick={showModal}>edit user info</span>
                </div>
            </div>
        </>
    )
}

export default DisplayUserInfo;
