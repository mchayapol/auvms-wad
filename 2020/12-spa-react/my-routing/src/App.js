import {
  Container, Jumbotron, Button,
  Navbar, Nav, Form, FormControl
} from 'react-bootstrap';

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import Home from './Home'
import About from './About'
import Pricing from './Pricing'
import Register from './Register'


import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router basename="flower-app">
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href={`/`}>
            <img
              src={`${process.env.PUBLIC_URL}/flower.png`}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            /> Flower
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/pricing">Pricing</Link>
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>

        <Switch>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/about">
            <About />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>



      </Container>
    </Router>
  );
}

export default App;
