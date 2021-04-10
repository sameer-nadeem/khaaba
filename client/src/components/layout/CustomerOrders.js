import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCustomerActiveOrders,
  getCustomerCompleteOrders,
} from "../../actions/customer";

import CustomerOrderTable from "./tables/CustomerOrderTable";

const CustomerOrders = ({
  getCustomerActiveOrders,
  getCustomerCompleteOrders,
  orders,
}) => {
  useEffect(() => {
    getCustomerActiveOrders();
    getCustomerCompleteOrders();
  }, []);

  return (
    <div className="container-fluid login-container">
      <div className="row justify-content-center pt-3">
        <div className="col-md-10 col-lg-10 pt-5 col-sm-10">
          <div className="panel panel-table">
            <div className="panel-body">
              <div className="text-align-center"></div>
              <h5 className="card-title text-center login-heading pt-3">
                My Orders
              </h5>
              <div
                className="table-responsive"
                // style="filter: blur(0px) brightness(100%)"
              >
                <CustomerOrderTable orders={orders} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.customerOrders,
  };
};

export default connect(mapStateToProps, {
  getCustomerCompleteOrders,
  getCustomerActiveOrders,
})(CustomerOrders);
