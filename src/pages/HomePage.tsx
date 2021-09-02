import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from "react-dropzone";
import { spacing } from '@material-ui/system';
import { Box, Container, Paper, Typography } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import Button from 'react-bootstrap/Button';
import '../styles/Homepage.css';
import Upload from "../components/Upload";
import firebase from 'firebase/compat/app';
import { storage } from "../Firebase";
import Upload_img from "../components/Upload_img"

const HomePage = () => {
    return (
        <>
            <Upload_img />
        </ >
  );
};

export default HomePage;