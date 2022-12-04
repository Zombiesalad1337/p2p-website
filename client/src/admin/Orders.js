import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const purchaseHistory = (history) => {
  return (
    <div className='card mb-5'>
      <h3 className='card-header'>Purchase history</h3>
      <ul className='list-group'>
        <li className='list-group-item'>
          {history.map((h, i) => {
            return (
              <div>
                <hr />
                {h.products.map((p, i) => {
                  return (
                    <div key={i}>
                      <h6>Product name: {p.name}</h6>
                      <h6>Product price: ${p.price}</h6>
                      <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </li>
      </ul>
    </div>
  );
};



const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    console.log('loading orders')
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = (orders) => {
    if (orders.length > 0) {
      return (
        <h1 className='text-danger display-2'>Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className='text-danger'>No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
    // console.log('update order status');
  };

  const showStatus = (o) => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {o.status}</h3>
    </div>
  );
  const showStatusAdmin = (o) => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {o.status}</h3>
      <select
        className='form-control'orders
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title='Orders'
      description={`Hey ${user.name}, you can manage all the orders here`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength(orders.filter((o) => {if (user.role === 1) {return o.user._id === user._id} return true}))}

          {user.role === 1 && orders.filter((o) => {return o.user._id === user._id}).map((o, oIndex) => {
            return (
              <div
                className='mt-5'
                key={oIndex}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h2 className='mb-5'>
                  <span className='bg-primary'>Order ID: {o._id}</span>
                </h2>

                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(o)}</li>
                  <li className='list-group-item'>
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: ₹{o.amount}</li>
                  <li className='list-group-item'>
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Delivery address: {o.address}
                  </li>
                </ul>

                <h3 className='mt-4 mb-4 font-italic'>
                  Total products in the order: {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className='mb-4'
                    key={pIndex}
                    style={{ padding: '20px', border: '1px solid indigo' }}
                  >
                    {showInput('Product name', p.name)}
                    {showInput('Product price', p.price)}
                    {showInput('Product total', p.count)}
                    {showInput('Product Id', p._id)}
                  </div>
                ))}
              </div>
            );
          })
          }
          {user.role === 2 && orders.map((o, oIndex) => {
            return (
              <div
                className='mt-5'
                key={oIndex}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h2 className='mb-5'>
                  <span className='bg-primary'>Order ID: {o._id}</span>
                </h2>

                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatusAdmin(o)}</li>
                  <li className='list-group-item'>
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: ₹{o.amount}</li>
                  <li className='list-group-item'>Ordered by: {o.user.name}</li>
                  <li className='list-group-item'>
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Delivery address: {o.address}
                  </li>
                </ul>

                <h3 className='mt-4 mb-4 font-italic'>
                  Total products in the order: {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className='mb-4'
                    key={pIndex}
                    style={{ padding: '20px', border: '1px solid indigo' }}
                  >
                    {showInput('Product name', p.name)}
                    {showInput('Product price', p.price)}
                    {showInput('Product total', p.count)}
                    {showInput('Product Id', p._id)}
                  </div>
                ))}
              </div>
            );
          })
          }
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
