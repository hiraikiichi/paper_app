import React from 'react';
import { useCallback, useMemo } from 'react';
import { useDropzone } from "react-dropzone";
import { spacing } from '@material-ui/system';
import { Box, Container, Paper, Typography } from "@material-ui/core";
import '../styles/Homepage.css';

const textstyle = {
    height: "100",

    // alignItems: "center",
    padding: 70,
    border: "3px dotted #888",
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
        <Box sx={{mt:20, mx: "auto", width: 600, height: 300 }} textAlign="center">
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
                            <p>ここにファイルをドラッグ＆ドロップ</p>
                            <p>もしくは、クリックして選択</p>
                    </Typography>
                )}
            </Paper>
        </Box>
  );
};

export default HomePage;