import React from "react"
import { useMutation, gql } from "@apollo/client"
const UPLOAD_FILE = gql`
    mutation singleUpload($file: Upload!){
        singleUpload(file: $file){
            url
        }
    }
`
const UploadImageButton = () => {
    const [uploadFile] = useMutation(UPLOAD_FILE)
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        console.log("file ", file)
        uploadFile({ variables: { file: file } })
    }
    return (<>
        <input type="file" onChange={handleFileChange} />
        <h1>upload file</h1>

    </>)
}

export default UploadImageButton;