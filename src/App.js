import React, { Fragment, useState, useEffect, setModalShow, modalShow, handleClose, setShow, MatrixRo, useReducer, reducer, defaultState } from "react";
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {
  Alert, Button, Form, Container, Col, Row, Media, Navbar, NavDropdown, Nav, FormControl, InputGroup,
  Modal, handleShow, show, Image, Component, Badge
} from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How to use
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Lee Algorithm</h4>
        <p>
          <dd>
            The Lee algorithm is one possible solution for maze routing problems based on breadth-first search. It always gives an optimal solution, if one exists.
          </dd>
          <dd>
            First press Generate button to generate an empty matrix
          </dd>
          <dd>
            S button represent the source of Lee Algorithm
          </dd>
          <dd>
            D button represent the destination
          </dd>
          <dd>
            G button represent gates or border of maze
          </dd>
          <dd>
            Press START button to run the algorithm
          </dd> 
        </p>
        <iframe id="Geeks3" width="450" height="350"
          src=
          "https://firebasestorage.googleapis.com/v0/b/test2-68f21.appspot.com/o/web.mp4?alt=media&token=5befe52d-0ec8-4c8e-a1d5-2f6dfc7fb06c"
          frameborder="0" allowfullscreen>
        </iframe>
      </Modal.Body>
    </Modal>
  );
}
function WarningModal(props) {
  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Imposible maze!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This maze doesn't have a solution!</h4>
      </Modal.Body>
    </Modal>
  );
}
const App = () => {
  const [mat, setmat] = useState([])
  const [ist, setist] = useState(-100)
  const [jst, setjst] = useState(null)
  const [istop, setistop] = useState(-100)
  const [jstop, setjstop] = useState(null)
  const [show, setshow] = useState(0)
  const [a, seta] = useState([])
  const [b, setb] = useState([])
  const [ok, setok] = useState(false)
  const [tip, settip] = useState(0)
  const [g, setg] = useState([])
  const [modal, setmodal] = useState(false);
  const [warn, setwarn] = useState(false) 
  const Generate = () => {
    setist(-100);
    setistop(-100);
    let mat2 = [mat]
    for (var i = 0; i <= 26 + 1; i++) {
      mat2[i] = [];
      for (var j = 0; j <= 62 + 1; j++)
        if (i == 0 || j == 0 || i == 27 || j == 63)
          mat2[i][j] = -1;
        else
          mat2[i][j] = 0;
    }
    setmat(mat2);
  }

  const Lee = () => {
    if(ist == -100 || istop == -100)
      setshow(3);
    else{
    let mat1 = []
    for (var i = 0; i <= 27 + 1; i++) {
      mat1[i] = [];
      for (var j = 0; j <= 62 + 1; j++)
        if (i == 0 || j == 0 || i == 27 || j == 63)
          mat1[i][j] = -1;
        else
          mat1[i][j] = 0;
    }
    mat1[istop][jstop] = -3
    while (g.length > 0) {
      let i = parseInt(g[0])
      g.shift()
      let j = parseInt(g[0])
      g.shift()
      mat1[i][j] = -5
    }
    const di = [0, 1, 0, -1];
    const dj = [1, 0, -1, 0];
    var val
    var q = [];
    var Q = []
    var i = parseInt(ist);
    var j = parseInt(jst);
    q.push(i);
    q.push(j);
    mat1[i][j] = 1;
    while (q.length) {
      i = q[0];
      q.shift();
      j = q[0];
      q.shift();
      for (var k = 0; k < 4; k++) {
        var iv = parseInt(i + di[k]);
        var jv = parseInt(j + dj[k]);
        if (mat1[iv][jv] == 0) {
          q.push(iv);
          q.push(jv);
          mat1[iv][jv] = mat1[i][j] + 1;
          Q.push(iv);
          Q.push(jv);
        }
        if (mat1[iv][jv] == -3) {
          mat1[iv][jv] = mat1[i][j] + 1;
          val = mat1[i][j] + 1
          while (q.length)
            q.shift();
        }
      }
    }
    mat1[istop][jstop] = val
    var b1 = []
    b1.push(istop)
    b1.push(jstop)
    i = istop
    j = jstop
    while (val > 2) {
      i = b1[b1.length - 2]
      j = b1[b1.length - 1]
      for (var k = 0; k < 4; k++) {
        var iv = parseInt(i + di[k])
        var jv = parseInt(j + dj[k])
        if (mat1[iv][jv] == mat1[i][j] - 1) {
          k = 4
          b1.push(iv)
          b1.push(jv)
          val = mat1[iv][jv]
        }
      }
    }
    if(b1.length == 2)
      setshow(3);
    else{
    setb(b1)
    seta(Q)
    setshow(1);
    }
  }
}

  useEffect(() => {
    if (show == 1) {
      const interval = setInterval(() => {
        var Q = [...a]
        let mat1 = [...mat];
        var i = parseInt(Q[0])
        Q.shift()
        var j = parseInt(Q[0])
        mat1[i][j] = 1
        Q.shift();
        seta(Q)
        setmat(mat1)
        if (Q.length == 0)
          setshow(2);
      }, )
      return () => clearInterval(interval)
    }
    if (show == 2) {
      const interval = setInterval(() => {
        var Q = [...b]
        let mat1 = [...mat];
        var i = parseInt(Q[Q.length - 2])

        var j = parseInt(Q[Q.length - 1])
        mat1[i][j] = 2
        Q.pop()
        Q.pop()
        console.log(Q)
        setb(Q)
        setmat(mat1)
        if (Q.length == 0){
          
          setshow(0);
        }
      }, )
      return () => clearInterval(interval)
    }
    if(show == 3){
      setwarn(true);
      Generate();
      setshow(0);
    }
  }, [show, mat])


  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow">
        <Navbar.Brand href="#home">Lee Algorithm</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Button variant="outline-dark" onClick={() => setmodal(true)}>Hints</Button>
          </Nav>
          <Form inline>
            <Button disabled = {show != 0} variant="outline-dark" className="mr-5" onClick={Generate}>Generate</Button>
            <Button variant="success" onClick={() => { settip(1) }} >S</Button>
            <Button variant="danger" onClick={() => { settip(2) }}>D </Button>
            <Button variant="primary" onClick={() => { settip(3) }} className="mr-5">G</Button>
            <Button variant="outline-dark" onClick={Lee}>Start</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <MyVerticallyCenteredModal
        show={modal}
        onHide={() => setmodal(false)}
      />
      <WarningModal
        show={warn}
        onHide={() => setwarn(false)}
      />
      <Container fluid id="bod" className="mt-2" onClick={() => { setok(!ok) }}>
        {
          mat.map((row, i) => {
            return (
              <Row fluid>
                {
                  row.map((element, j) => {
                    if (element == 0)
                      return <Col xs={0.1}><div id="divbox" onMouseMove={() => {
                        if (ok) {
                          if (tip == 1) {
                            let mat1 = [...mat]
                            if (ist != -100)
                              mat1[ist][jst] = 0
                            setmat(mat1)
                            mat1 = [...mat]
                            setist(i)
                            setjst(j)
                            mat1[i][j] = 1;
                            setmat(mat1)
                            setok(!ok)
                            settip(0)
                          }
                          else
                            if (tip == 2) {
                              let mat1 = [...mat]
                              if (istop != -100)
                                mat1[istop][jstop] = 0
                              setmat(mat1)
                              mat1 = [...mat]
                              setistop(i)
                              setjstop(j)
                              mat1[i][j] = -3;
                              setmat(mat1)
                              setok(!ok)
                              settip(0)
                            }
                            else
                              if (tip == 3) {
                                let mat1 = [...mat]
                                g.push(i)
                                g.push(j)
                                mat1[i][j] = -5
                                setmat(mat1)
                              }
                        }
                      }}> </div></Col>
                    if (element == 1)
                      return <Col xs={0.1}><div id="divbox1"> </div></Col>
                    if (element == 2)
                      return <Col xs={0.1}><div id="divbox4"> </div></Col>
                    if (element == -3)
                      return <Col xs={0.1}><div id="divbox2"> </div></Col>
                    if (element == -5)
                      return <Col xs={0.1}><div id="divbox3"> </div></Col>
                  })
                }
              </Row>
            )

          })
        }
      </Container>
    </>
  );
}
export default App;

