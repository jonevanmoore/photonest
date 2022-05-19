const LikesModal = ({ closeLikesModal, stopTheProp, likes }) => {
    return (
        <div
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
        >
            <div style={{ backgroundColor: 'white', borderRadius: '5px', paddingTop: '5px', maxHeight: '30vh', overflow: 'hidden', overflowY: 'scroll' }}>
                <div style={{ borderBottom: '1px solid lightgray' }}>
                    <span >Likes</span>

                </div>
                {likes.map((like, i) => (
                    <div key={i} style={{ display: 'flex', margin: '10px', paddingBottom: '5px' }}>
                        <div>
                            <img src={like?.user?.profile_image} style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px', float: 'left' }} />
                        </div>
                        <div style={{ display: 'grid' }}>
                            <div>
                                <span style={{ fontSize: '15px', float: 'left' }}>{`${like?.user?.first_name} ${like?.user?.last_name}`}</span>
                            </div>
                            <div>
                                <span style={{ fontSize: '12px', float: 'left', marginBottom: '10px' }}>{like?.user?.username}</span>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >


        </div >
    )
}

export default LikesModal;
