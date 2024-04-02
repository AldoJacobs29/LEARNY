import {Row, Col} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col md={1} className="d-flex bg-secondary rounded-end">
          <Link to="/dashboard" className="text-decoration-none mx-auto mt-4">
            <span className="fw-semibold fs-4 text-white">Ebooks</span>
          </Link>
        </Col>
        <Col md={11}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
