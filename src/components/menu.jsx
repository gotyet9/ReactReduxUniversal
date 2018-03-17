"use strict"
import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCart } from '../../src/actions/cartActions';

class Menu extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React-Bootstrap</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>

          </Nav>
          <Nav pullRight>
            <LinkContainer to="/admin">
              <NavItem eventKey={1}>Admin</NavItem>
            </LinkContainer>
            <LinkContainer to="/cart">
              <NavItem eventKey={2}>Your Cart
              {(this.props.totalQty > 0) ? ( // if # of items in cart is > 0
                  <Badge className="badge">
                    {this.props.totalQty}</Badge>) : ('')}
                {/* display the # of items in cart, if zero items, display nothing  :{''} */}
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCart: getCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
