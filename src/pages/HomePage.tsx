import '../styles/Homepage.css';
import Upload_img from "../components/Upload_img"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import selectionImage from '../img/selection.svg';

const HomePage = () => {
    return (
        <>
            <section>
                <Container className="mb-5">
                    <Row>
                        <Col className="d-flex justify-content-center youshi">
                            <div>AIが写真に合う用紙を判定</div>
                        </Col>
                        <Col className="sectionImagecenter">
                            <img className="selectionImage" alt="" src={selectionImage} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Upload_img />
        </ >
  );
};

export default HomePage;