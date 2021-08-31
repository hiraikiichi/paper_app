import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from "react-dropzone";
import { spacing } from '@material-ui/system';
import { Box, Container, Paper, Typography } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import Button from 'react-bootstrap/Button'
import '../styles/Homepage.css';

const textstyle = {
    // height: "100",
    padding: 70,
    border: "3px dotted #888",
    backgroundColor: "rgb(230 230 230)"
};


const HomePage = () => {
    const [Uploadfile, setUploadfile] = useState();
    const maxSize = 3 * 1024 * 1024;

    const accept = "image/jpeg, image/jpg, image/png";

    // dropzone
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setUploadfile(acceptedFiles[0]);
        }
        console.log(acceptedFiles);
    }, []);

    // 初期化
    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragReject, fileRejections } = useDropzone({
        accept,
        onDrop,
        minSize: 1,
        maxSize,
    });

    const files = acceptedFiles.map(file => (
        <p key={file.name}>
          {file.name}
        </p>
      ));
 
    return (
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
                    <Typography >ここにファイルをドロップ</Typography>
                ) : (
                        <Typography >
                            <p><BackupIcon style={{ fontSize: 40 }} /></p>
                            <p>ここにファイルをドラッグ＆ドロップ</p>
                            <p>もしくは、クリックして選択</p>
                            <Button variant="primary">画像を選択</Button>
                            <p>{files}</p>
                            {isDragReject ? <div className="alert alert-danger" role="alert">ファイルタイプが一致しません</div> : null}
                            {fileRejections.length > 0 ? <div className="alert alert-danger" role="alert">
                                {fileRejections[0].errors[0].message}
                            </div> : null}
                        </Typography>
                )}
            </Paper>
        </Box>
  );
};

export default HomePage;