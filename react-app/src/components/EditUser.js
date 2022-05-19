const EditUser = () => {
    <div
        onClick={stopTheProp}
        onMouseDown={stopTheProp}
        style={{ backgroundColor: 'white' }}
    >
        <div style={{ display: 'flex' }}>
            {!imgPreview && (
                <img src={sessionUser?.profile_image} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
            )}
            {imgPreview && (
                <img src={URL.createObjectURL(imgPreview)} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
            )}
            <label className="img-file">
                <label htmlFor='img-upload' >Update profile pic</label>
                <input
                    type='file'
                    onChange={e => setImages(e.target.files[0])}
                    accept="image/*"
                    placeholder='Enter your URL image'
                    id='img-upload'
                    name='img-upload'
                    required
                    hidden
                />
            </label>
        </div>
        <div>
            <input
                value={formerUsername}
                onChange={e => setFormerUsername(e.target.value)}></input>
            <div>
            </div>

            <input
                value={formerFirst}
                onChange={e => setFormerFirst(e.target.value)}
            ></input>
            <input
                value={formerLast}
                onChange={e => setFormerLast(e.target.value)}
            ></input>
        </div>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={closeModal}>cancel</button>
    </div>
}

export default EditUser;
