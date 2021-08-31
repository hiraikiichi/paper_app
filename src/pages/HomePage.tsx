import React from 'react';
import { useCallback, useMemo } from 'react';
import { useDropzone } from "react-dropzone";
import { spacing } from '@material-ui/system';
import { Box, Container, Paper, Typography } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import Button from 'react-bootstrap/Button'
import '../styles/Homepage.css';

const textstyle = {
    height: "100",
    padding: 70,
    border: "3px dotted #888",
    backgroundColor: "rgb(230 230 230)"
};


const HomePage = () => {
    const accept = "image/*"; //"image/jpeg, image/png";
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        onDrop,
    });
 
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
                        </Typography>
                )}
            </Paper>
        </Box>
  );
};

export default HomePage;