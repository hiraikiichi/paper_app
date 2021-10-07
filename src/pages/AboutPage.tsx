import React from "react";
import '../styles/Aboutpage.css';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button'

import step1Image from '../img/moments.svg';
import step2Image from '../img/uploadImage.svg';
import step3Image from '../img/displayImage.svg';
import printingImage from '../img/printing.svg';

const AboutPage = () => {
  const goMainPage = () => {
    window.location.href = "/";
  };
  return (
    <>
      <Container style={{ marginTop: "10rem", marginBottom: "2rem" }}>
        <Row>
          <Col className="d-flex justify-content-center">
            <div>
              <p className="topExpl">AIが写真に合う用紙を選定します。</p>
              <p className="mainExpl">本システムは、AIを使い写真に合う写真用紙を選び表示します。</p>
              <br />
              <p className="mainExpl">また、AIが注視した箇所をヒートマップで表示します。</p>
            </div>
          </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Container style={{ marginBottom: "10rem" }}>
          <Row>
            <Col className="d-flex justify-content-center">
              <div>
                <p className="topExpl bord">使い方</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={12}>
              <div>
                <p className="step">Step1</p>
                <img style={{width:"50%"}} className="stepImage" alt="" src={step1Image} />
                <p className="stepsentence">写真を決める</p>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div>
                <p className="step">Step2</p>
                <img style={{width:"80%", marginTop:"55px"}} className="stepImage" alt="" src={step2Image} />
                <p className="stepsentence">写真をアップロード</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-center" lg={4} md={12}>
              <div>
                <p className="step">Step3</p>
                <img style={{width:"70%", marginTop:"30px", marginBottom:"50px"}} className="stepImage" alt="" src={step3Image} />
                <p className="stepsentence">写真に合う用紙が表示されます</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ marginBottom: "10rem" }}>

        <Row>
          <Col>
            <img style={{ width: "50%" }} className="stepImage" alt="" src={printingImage} />
          </Col>
          <Col>
            <div>
              <p className="step">写真用紙推定</p>
              <div className="usebtn">
              <Button variant="primary" onClick={goMainPage}>使ってみる</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutPage;
