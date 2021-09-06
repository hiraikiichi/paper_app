// import '../styles/Header.css';
import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import '../styles/Header.css';

import logo_img from '../card-image.svg'

const Header = () => {
    return (
        <Navbar className={"fixed-top p-3"} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand className='title' href="/">
                写真用紙判定
            </Navbar.Brand>
            <Navbar.Toggle className='reaponsive-memu' aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );
};

export default Header;