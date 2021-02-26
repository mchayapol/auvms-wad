import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Select from "react-select"
import {
  Container, Table,
  Modal, Button,
  Row, Col
} from 'react-bootstrap'
import { useForm } from "react-hook-form"

import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseUrl: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  })
}
const firestore = firebase.firestore()
const auth = firebase.auth()

const categories = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Fun' },
  { id: 3, name: 'Transportation' },
]

function Journal(props) {
  const { register, handleSubmit, watch } = useForm()
  const [showModal, setShowModal] = useState(false)
  const [category, setCategory] = useState()
  const [records, setRecords] = useState()

  const moneyRef = firestore.collection('money');
  const query = moneyRef.orderBy('createdAt', 'asc').limitToLast(25);
  const [moneyList] = useCollectionData(query, { idField: 'id' });
  // const [formValue, setFormValue] = useState('');

  const [total, setTotal] = useState(0)

  useEffect(() => {
    console.log('moneyList updated', typeof (moneyList), moneyList)
    if (moneyList) {
      let t = moneyList.map(m => m.amount).reduce((total, amt) => total + parseFloat(amt))
      console.log({ t })
      setTotal(t)
    } else {
      setTotal(0)
    }
  }, [moneyList])

  const handleClose = () => {
    setShowModal(false)
  }

  const onSubmit = async (data) => {
    data = { 
      ...data, 
      category: category, 
      createdAt: new Date()
    }
    console.log(data)

    await moneyRef.add(data)
    setShowModal(false)
  }

  const handleCategoryChange = (obj) => {
    setCategory(obj)
  }




  return (
    <Container>
      <h1>Money Journal : {props.user.displayName}</h1>
      <Button variant="success" onClick={() => setShowModal(true)}>ADD</Button>
      <SignOut />

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Date/Time</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {moneyList && moneyList.map((v, i) => (
            <tr key={i} onClick={(e)=>console.log("Row Click",e)} onContextMenu={(e)=>console.log("Context",v)}>
              <td>{i+1}</td>
              <td>{format(v.createdAt.toDate(),'dd MMM yy HH:mm')}</td>
              <td>{v.description}</td>
              <td>{v.category.name}</td>
              <td>{v.amount}</td>
            </tr>
          ))}
          <tr key={'total'}>
            <td colSpan={3}>
              <h2>Total : {total.toFixed(2)}</h2>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <label htmlFor="category">Category</label>
              </Col>
              <Col>
                <Select
                  id="category"
                  name="category"
                  placeholder="Category"
                  value={category}
                  options={categories}
                  onChange={handleCategoryChange}
                  getOptionLabel={x => x.name}
                  getOptionValue={x => x.id}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <label htmlFor="description">Description</label>
              </Col>
              <Col>
                <input type="text" placeholder="Description" ref={register({ required: true })} name="description" id="description" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="amount">Amount</label>
              </Col>
              <Col>
                <input type="number" placeholder="Amount" ref={register({ required: true })} name="amount" id="amount" />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <button className="btn-primary btn" type="submit">"Add Record"</button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
}

function SignOut() {
  return auth.currentUser && (
    <Button variant="outline-dark" onClick={() => auth.signOut()}>Sign Out</Button>

  )
}
export default Journal;
