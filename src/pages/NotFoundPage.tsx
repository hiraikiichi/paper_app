import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const NotFoundPage = () => {
  return (
        <Container style={{ marginTop:"10rem", marginBottom:"40rem"
}}>
      <Row>
        <Col className="mx-3">
          <h3>404 Not Found</h3>
          <p>ページが見つかりません</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
