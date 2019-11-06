import React, {FunctionComponent} from "react";
import SimpleFileUpload from "@bgoodman/simple-file-upload";
import "./index.css";

const FileUploadForm: FunctionComponent<{}> = () => {

    const handleChange = (file?:File) => {
        console.log(file);
    }

    return (
        <SimpleFileUpload accept={['.png', '.svg']} onChange={handleChange} className={"simple-file-upload"}/>
    )
}

export default FileUploadForm;
