import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Footer = () => {
  return (
    <div className="page-footer" style={{ backgroundColor: "rgb(33, 37, 41)" }}>
      <Container className="pt-3 pb-3">
        <Row>
          <Col className="text-center mt-1 mb-1">
            <span className="align-middle ml-2" style={{color: "white"}}>
                @2021 KiichiHirai
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
