import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, Form, FormControl, Container, Row, Col, ListGroup } from 'react-bootstrap'
import Image from 'next/image'
const Layout = ({ children }) => {
    const [navbarScrolled, setNavbarScrolled] = useState('')
    const handleScroll = useCallback(event => {
        let scrollTop = window.scrollY
        if (scrollTop > 40) {
            setNavbarScrolled("navbar-scrolled")
        } else {
            setNavbarScrolled('')
        }
    })
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll, false)
    }, []);
    return <>
        <Navbar fixed="top" bg="transparent" className={`navbar-marketing ${navbarScrolled}`} variant="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img src="/images/logo.png" width="56" />
                    Books
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/explore">Explore</Nav.Link>
                        <Nav.Link href="/courses">Courses</Nav.Link>
                        <Nav.Link href="/projects">Projects</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Form inline>
                        <FormControl size="sm" type="search" placeholder="Search" className="ml-sm-2" />
                        {/* <Button size="sm" variant="outline-success">Search</Button> */}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {children}
        <footer className="py-5 bg-light-2 border-top">
            <Container>
                <Row className="align-items-center">
                    <Col md="6"><p className="m-0">Copyright &copy; 2020</p></Col>
                    <Col md="6">
                        {/* <ListGroup horizontal className="float-right">
                            <ListGroup.Item>
                                <Image src="/images/payments/visa.png" width="47" height="37" />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Image src="/images/payments/master.png" width="47" height="37" />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Image src="/images/payments/master2.png" width="47" height="37" />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Image src="/images/payments/visa2.png" width="47" height="37" />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Image src="/images/payments/america.png" width="47" height="37" />
                            </ListGroup.Item>
                        </ListGroup> */}
                    </Col>
                </Row>
            </Container>
        </footer>
    </>
}
export default Layout