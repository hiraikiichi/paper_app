import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from "react-dropzone";

import { storage } from "../Firebase";

import { Box, Paper, Typography } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import Button from 'react-bootstrap/Button';
import '../styles/Homepage.css';
// import firebase from 'firebase/compat/app';
// import { spacing } from '@material-ui/system';


const textstyle = {
    // height: "100",
    padding: 70,
    border: "3px dotted #888",
    backgroundColor: "rgb(230 230 230)"
};


const Upload_img = () => {

    // const [uploadfile, setUploadfile] = useState({name:""});
    const maxSize = 3 * 1024 * 1024;

    const accept = "image/jpeg, image/jpg, image/png";
    // const [fileUrl, setFileUrl] = useState<string>();
    const [myFiles, setMyFiles] = useState<File[]>([]);
    const [clickable, setClickable] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {setIsChecked(!isChecked);};

    // dropzone
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles[0]) return;
        try {
            setMyFiles([...acceptedFiles]);
            setClickable(true);
            // handlePreview(acceptedFiles);
          } catch (error) {
            alert(error);
          }

        /*
        if (acceptedFiles.length > 0) {
            const src = URL.createObjectURL(acceptedFiles[0]);
            setFileUrl(src);
            setUploadfile(acceptedFiles[0]);
            console.log("読み込み", acceptedFiles[0]);
        } else {
            console.log("画像以外読み込み", acceptedFiles);
        }
        */
    }, []);

    // 読み込み失敗
    const onDropRejected = () => {
        alert("読み込みに失敗しました");
      };

    // 初期化
    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragReject, fileRejections, open } = useDropzone({
        accept,
        onDrop,
        onDropRejected,
        minSize: 1,
        maxSize,
        noClick: true
    });

    // FileListからfile.nameを取得し表示
    const files = useMemo(() =>
        acceptedFiles.map(file => (
            <p key={file.name}>
                {file.name}
            </p>
        )
        ), [acceptedFiles]);
    
    // fileupload時のエラー
    const uploaderror = useMemo(() =>
        fileRejections.map(({ file, errors }) => (
            <div className="alert alert-danger" role="alert" key={file.name}>
                {/* {fileRejections[0].errors[0].message} */}
                {/* {file.name} - {file.size} bytes */}
                {errors.map(e => (
                    <div key={e.code}>{e.message}</div>
                ))}
            </div>
        )
        ), [fileRejections]);
    
    // 画像アップロード
    // const [message, setMessage] = useState("");

    const upload = async (accepterdImg: any) => {
        try {
            const uploadTask: any = storage
                .ref(`/images/${myFiles[0].name}`)
                .put(myFiles[0]);
            // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
            // setMessage('登録しました');
            alert("登録しました");
        } catch (error) {
            console.log("エラーキャッチ", error);
            alert("エラー");
        }
    };

    /*
    // upload
    const [message, setMessage] = useState("");

    //submit
    const upload = async () => {

        //fire upload
        let url = "";
        if (uploadfile.name) {
            const storageref = firebase.storage().ref('sample/' + uploadfile.name);
            const snapshot = await storageref.put(uploadfile.name);
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
    };
    */
    
    return (
        <>
        <Box sx={{mt:20,　mb:30, mx: "auto", width: "auto", height: 300}} textAlign="center">
            <Paper
                variant="outlined"
                square
                {...getRootProps()}
                style={textstyle}
                // className="textstyle"
            >
                <input {...getInputProps()} />
                {/* ドラッグされているかどうか */}

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
                                <Button variant="primary" onClick={open}>画像を選択</Button>
                                <p>{files}</p>
                                <p>{uploaderror}</p>
                            </Typography>
                    )}
                    {isDragReject ? <div className="alert alert-danger" role="alert">ファイルタイプが一致しません</div> : null}
                </Paper>
                <p style={{marginTop:"1rem"}}>
                    <input type="checkbox" name="agree" id="agreeCheck" onChange={() => toggleCheckbox()} />
                    <label htmlFor="agreeCheck">利用規約に同意する</label>
                </p>
                <button type="button" className="btn btn-primary mt-2" disabled={!isChecked} onClick={upload}>登録</button>
                {/* {message ? <Alert className="alert alert-success mt-2" role="alert">{message}</Alert> : null} */}
            </Box>
            </ >
  );
};

export default Upload_img;