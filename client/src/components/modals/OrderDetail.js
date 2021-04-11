import React from "react";
import { Modal, Button } from "react-bootstrap";
const OrderDetail = ({ order, show, handleClose }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
      {order && (
        <Modal
          show={show}
          onHide={handleClose}
          // aria-labelledby="contained-modal-title-vcenter"
          // style={{ border: "5px solid green" }}
          centered
        >
          <Modal.Header>
            <Modal.Title className="login-heading">
              {order.kitchen.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>
              <span className="fw-bold">Total:</span> {order.totalPrice}PKR
            </h5>
            <h5 className="fw-bold">Khaabay:</h5>
            <ul>
              {order.khaabay.map((khaaba) => (
                <li>{`${khaaba.khaaba.title} -> Quantity: ${khaaba.quantity}`}</li>
              ))}
            </ul>
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

export default OrderDetail;
