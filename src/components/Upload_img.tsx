import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from "react-dropzone";

import { storage } from "../Firebase";
// import * as tf from '@tensorflow/tfjs';

import { Box, Paper, Typography } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import '../styles/Homepage.css';
// import { url } from 'inspector';
// import firebase from 'firebase/compat/app';
// import { spacing } from '@material-ui/system';


const textstyle = {
    // height: "100",
    padding: 70,
    border: "5px dashed #888",
    backgroundColor: "rgb(230 230 230)"
};

const boxstyle = {
    mb: 30,
    mx: "auto",
    width: "auto",
    height: 300,
    // @media 
}

// console.log("aaa", tf.version)
// const model = tf.loadModel("../model/model.json")
// console.log(model)
// tf.loadLayersModel("../model/model.json").then(model => {
//     console.log("OK");
// });

const Upload_img = () => {

    // const [uploadfile, setUploadfile] = useState({name:""});
    const maxSize = 3 * 1024 * 1024;

    const accept = "image/jpeg, image/jpg, image/png";
    // const [fileUrl, setFileUrl] = useState<string>();
    const [myFiles, setMyFiles] = useState<File[]>([]);
    const [clickable, setClickable] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => { setIsChecked(!isChecked); };
    // const [imageUrl, setImageUrl] = useState("");
    const [resultRaw, setResultRaw] = useState("");
    const [resultGrad, setResultGrad] = useState("");
    const [resultPhotoName, setResultPhotoName] = useState("");

    const [product, setProduct] = useState<string []>([]);
    const [productUrl, setProductUrl] = useState<string []>([]);

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        setLoading(true);
        try {
            const uploadTask: any = storage
                .ref(`/images/${myFiles[0].name}`)
                .put(myFiles[0]).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        // console.log('File available at', downloadURL);
                        const requestOptions ={
                            method: 'POST',
                            headers:{'Content-Type': 'application/json'},
                            body: JSON.stringify({'key': downloadURL})
                        };
                        try {
                            fetch('https://paperjudgment.herokuapp.com/send', requestOptions
                            ).then((response) => response.json()
                            ).then((responseJson) => {
                                // console.log('json=', responseJson);
                                setResultRaw(responseJson.raw_url);
                                setResultGrad(responseJson.grad_url);
                                setResultPhotoName(responseJson.pred_answer);
                                // setphotoList(responseJson.paper_product)
                                const array = responseJson.paper_product;
                                // []の方が望ましい
                                const arrProducts: string[] = new Array;
                                const arrUrl: string[] = new Array;
                                array.forEach((elm: any) => {
                                    Object.keys(elm).forEach(key => {
                                        if (key === "product") {
                                            arrProducts.push(elm[key]);
                                            // setProduct(elm[key])
                                        } else {
                                            arrUrl.push(elm[key]);
                                            // setProductUrl(elm[key])
                                        }
                                        // console.log(`key: ${key} value: ${elm[key]}`)
                                    })
                                })
                                setProduct(arrProducts);
                                setProductUrl(arrUrl);
                                setLoading(false);
                                }).catch((error) => {
                                    console.log(error);
                                    alert("APIエラー");
                                    setLoading(false);
                                    })
                        } catch (error) {
                            console.log("エラーキャッチ", error);
                            alert("エラー");
                            setLoading(false);
                        }
                    })
                    // const url = snapshot.ref.getDownloadURL();
                    // console.log("URLはこちら", url); // ダウンロードURL
                    //alert(url);
                });
            // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
            // setMessage('登録しました');
            // alert("登録しました");
        } catch (error) {
            console.log("エラーキャッチ", error);
            alert("エラー");
            setLoading(false);
        }
    };
    // 結果の商品ボタンだすやつ
    const num = product.map((number, idx) => (
        <li>
            <a href={productUrl[idx]} >
            <button className="paperbutton">{number}</button>
            </a>
        </li>
    ));

    return (
        <>
            <section>
                {/*<Box sx={{ mb: 30, mx: "auto", width: "auto", height: 300 }} textAlign="center">*/}
                <Box sx={boxstyle} textAlign="center">
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
                                    <p>ここに画像をドラッグ＆ドロップ</p>
                                    <p>JPGまたはPNG 3MBまで</p>
                                    <br />
                                    <Button variant="primary" onClick={open}>画像を選択</Button>
                                    <a>{files}</a>
                                    <a>{uploaderror}</a>
                                </Typography>
                        )}
                        {isDragReject ? <div className="alert alert-danger" role="alert">ファイルタイプが一致しません</div> : null}
                    </Paper>

                    <div style={{ marginTop: "2rem" }}>
                        <input type="checkbox" name="agree" id="agreeCheck" onChange={() => toggleCheckbox()} />
                        <label onClick={handleShow} style={{color:"blue"}}>利用規約</label>
                        <label htmlFor="agreeCheck">に同意する</label>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>利用規約</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>ここに規約かく</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <button type="button" className="btn btn-primary mt-2" disabled={!isChecked} onClick={upload}>判定する</button>
                    {/* {message ? <Alert className="alert alert-success mt-2" role="alert">{message}</Alert> : null} */}
                    </Box>
                {/*<p>{ load }</p>*/}
            </section>
            <section>
                <div style={{textAlign:"center"}}>
                    {/* trueの場合，falseの場合 */}
                    {loading ? <Spinner className="text-center" animation="border" /> : ""}
                </div>
                <Container className="mb-5">
                    <Row>
                        <Col>
                            <p className="resultphotoname">{resultPhotoName}</p>
                            <ul>{num}</ul>
                        </Col>
                        <Col xs lg="5">
                        <img alt="" className="resultimg" src={resultRaw} />
                        <img alt="" className="resultimg" src={resultGrad} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </ >

  );
};

export default Upload_img;