import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({
  title = 'Title',
  description = 'Description',
  sellerName = 'Seller name',
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className='jumbotron mt-5'>
      <h2>{title}</h2>
      <h3> Seller: {sellerName} </h3>
      <p className='lead'>{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;