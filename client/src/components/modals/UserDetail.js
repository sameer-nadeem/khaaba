import React from "react";
import { Modal, Button } from "react-bootstrap";
const UserDetail = ({ user, show, handleClose }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
      {user && (
        <Modal
          show={show}
          onHide={handleClose}
          // aria-labelledby="contained-modal-title-vcenter"
          // style={{ border: "5px solid green" }}
          centered
        >
          <Modal.Header>
            <Modal.Title>{user.firstName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Address: {user.address.addr}</h5>
            <h5>City: {user.address.city}</h5>
            <h5>Phone# {user.phone}</h5>
            <h5>Email: {user.email}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UserDetail;
