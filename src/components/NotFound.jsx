import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container style={{ minHeight: '100vh', minWidth: '100vw' }} className="d-flex align-items-center justify-content-center bg-dark text-light">
      <Row className="justify-content-center mt-3">
        <Col className="text-center">
          <h1 className="display-3">😞</h1>
          <h3>404 - City Not Found</h3>
          <Link to="/">
            <p>VAI IN HOMEPAGE</p>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound