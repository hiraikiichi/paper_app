import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from "react-dropzone";
import { spacing } from '@material-ui/system';
import { Box, Container, Paper, Typography } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import Button from 'react-bootstrap/Button';
import '../styles/Homepage.css';
import firebase from 'firebase/compat/app';
import { storage } from "../Firebase";

const textstyle = {
    // height: "100",
    padding: 70,
    border: "3px dotted #888",
    backgroundColor: "rgb(230 230 230)"
};


const Upload_img = () => {

    const [uploadfile, setUploadfile] = useState();
    const maxSize = 3 * 1024 * 1024;

    const accept = "image/jpeg, image/jpg, image/png";
    const [fileUrl, setFileUrl] = useState();

    // dropzone
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            // const src = URL.createObjectURL(acceptedFiles[0]);
            // setFileUrl(src);
            setUploadfile(acceptedFiles[0]);
            console.log("読み込み", acceptedFiles[0], "A", acceptedFiles);
        }
        console.log(acceptedFiles);
    }, []);

    const onDropRejected = () => {
        alert("画像以外のファイルです．");
      };

    // 初期化
    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragReject, fileRejections } = useDropzone({
        accept,
        onDrop,
        onDropRejected,
        minSize: 1,
        maxSize,
    });

    const files = acceptedFiles.map(file => (
        <p key={file.name}>
          {file.name}
        </p>
    ));
    // upload
    /*
    const [message, setMessage] = useState();

    //submit
    const upload = async () => {

        //fire upload
        let url = "";
        if (uploadfile.name) {
            const storageref = firebase.storage().ref('sample/' + uploadfile.name);
            const snapshot = await storageref.put(uploadfile);
            url = await snapshot.ref.getDownloadURL();
        }

        //db updated
        if (url) {
            await firebase.firestore().collection('sample').doc().set({
                filename: uploadfile.name,
                fileUrl: url,
            });

            setMessage('登録しました');
        }
    }
    */
    return (
        <>
        <Box sx={{mt:20,　mb:30, mx: "auto", width: 600, height: 300}} textAlign="center">
            <Paper
                variant="outlined"
                square
                {...getRootProps()}
                style={textstyle}
                // className="textstyle"
            >
                <input {...getInputProps()} />

                {isDragActive ? (
                        <Typography >
                            <p><BackupIcon style={{ fontSize: 40 }} /></p>
                            ここにファイルをドロップ
                        </Typography>
                    ) : (
                            <Typography >
                                <p><BackupIcon style={{ fontSize: 40 }} /></p>
                                <p>ここにファイルをドラッグ＆ドロップ</p>
                                <p>もしくは、クリックして選択</p>
                                <br />
                                <Button variant="primary">画像を選択</Button>
                                <p>{files}</p>
                                {isDragReject ? <div className="alert alert-danger" role="alert">ファイルタイプが一致しません</div> : null}
                                {fileRejections.length > 0 ? <div className="alert alert-danger" role="alert">
                                    {fileRejections[0].errors[0].message}
                                </div> : null}
                            </Typography>
                )}
            </Paper>
            <button type="button" className="btn btn-primary mt-2" >登録</button>
            </Box>
            {/*<button type="button" className="btn btn-primary mt-2" onClick={upload}>登録</button> */}
            {/* {message ? <div className="alert alert-success mt-2" role="alert">{message}</div> : null} */}
            </ >
  );
};

export default Upload_img;