import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import AddStudentForm from './AddStudentForm';
import Context from './Context'
import AuthApi from './AuthApi'
import Cookies from 'js-cookie'
import { Redirect, useHistory } from 'react-router-dom';
const Student = (props) => {
  const Auth = useContext(AuthApi)

  const token = Cookies.get('token')

  const his = useHistory()
  const [id, setId] = useState(0);
  const [con, setCon] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [uid, setUniversityId] = useState(0);
  const [users, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  // if(Auth.auth === false && Cookies.get("token") === ""){
  //  his.push('/')
  // }

  useEffect(() => {
    getData();
  }, [])

  
  const addNewRecord = () => {
    getData();
  }

  async function getData() {
    
    const allData = await axios.get(`http://localhost:9000/student/list`, { headers: {"Authorization" : `Bearer ${token}`} })
    // console.log(allData.data)
    setUser(allData.data);
  }

  // async function getData() {
    
  //   const allData = await axios.get(`http://localhost:9000/student/list`)
  //   // console.log(allData.data)
  //   setUser(allData.data);
  // }

  const formatDate = (a) => {
    const date = new Date(a);
    // const changedDate =  + "/" +  + 
    const changedDate  = String(date.getFullYear())+"-" + String((date.getMonth() + 1)).padStart(2,'0') +"-" + String(date.getDate()).padStart(2,'0')
    // console.log(a)
    return changedDate

  }


  const editRecord = (e) => {
    setId(e.id);
    setName(e.name);
    setEmail(e.email);
    setUniversityId(e.universityId);
    setDob(formatDate(e.dob));
  }
  const validateUniversity = function (name) {
    if (name === null || name === "") {

      return false
    }
    else {
      const re = /^([a-zA-Z\s]+)$/;
      return re.test(String(name));
    }

  }

  const validateEmail = function (email) {
    const re = /^([a-zA-Z\d+)(\.[a-zA-Z\d]+)?@([a-zA-Z\d]+).([a-zA-Z]{2,8})(\.[a-zA-Z\d]+)?$/;
    return re.test(String(email).toLowerCase());
  }
  const validateName = function (name) {
    if (name === null || name === "") {
      return false
    }
    else {
      const re = /^([a-zA-Z\s]+)$/;
      return re.test(String(name).toLowerCase());
    }

  }


  async function deleteData(e) {
    if (window.confirm(`are you sure? Do you want to delete?\nID\t\t\t:\t\t${e.id}\nName\t\t:\t\t${e.name}\nEmail\t\t:\t\t${e.email}\nUniversity\t:\t\t${e.universityId}`)) {
      const t = parseInt(e.id);
      // console.log(t);
      try {
        await fetch(`http://localhost:9000/student/delete/${t}`, {
          method: 'delete',
          headers :{
            "Authorization" : `Bearer ${token}`
          }
        });
      }
      catch (e) {
      }
    }
    addNewRecord();
  }


  async function editData() {
    if (!validateName(name) || !validateEmail(email)) {
      alert('information is not in correct format')
    }
    else {
      try {
        await fetch('http://localhost:9000/student/update', {
          method: 'put',
          headers: {
            "Authorization" : `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ "name": `${name}`, "email": `${email}`, "universityId": parseInt(uid), "dob":  `${dob}`, "id": parseInt(id), "userRef":"" })

        });

      }
      catch (e) {
        // console.log(e);
      }
    }

    handleClose();
    addNewRecord();
  }

  return (
    <>
    
      <div style = {{ margin: "100px auto" }}>
        <table data-testid="table" className="table table-dark">
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">University ID</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((e) => (
                <tr key={e.id} onContextMenu={(el) => {
                  // console.log(e.id)
                }}>
                  <th scope="col">{e.id}</th>
                  {con === true && <Context />}
                  <th scope="col">{e.name}</th>
                  <th scope="col">{e.email}</th>
                  <th scope="col">{e.universityId}</th>
                  <th scope="col">{formatDate(e.dob)}</th>
                  <th scope='col'> <button tilte="edit-addNew-btn" onClick={() => {
                    editRecord(e);
                  }} className="btn edit btn-outline-primary" data-toggle="modal" data-target="#mmyModal"><i className="fa fa-edit" style={{ fontSize: "20px" }}></i></button></th>
                  <th scope='col'> <button data-testid="delete-btn" title="delete-btn" onClick={() => {
                    deleteData(e);
                  }} className="btn delete btn-outline-danger"><i className="fa fa-trash-o" style={{ fontSize: "20px" }}></i></button></th>
                </tr>
              ))

            }
          </tbody>
        </table>

        <div className="container text-center">
          <button onClick={() => {
            handleShow();
          }} type="button" title="add_new" className="btn btn-outline-primary" data-toggle="modal" data-target="#myModal">
            Add New Student <i className="fa fa-plus-circle" style={{ fontSize: "19px" }}></i>
          </button>
          {show === true && <AddStudentForm hideMethod={handleClose} dataVal={addNewRecord} />}


        </div>


      </div>



      <div className="modal" id="mmyModal" title="mmyModal">
        <div className="modal-dialog modal-content modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success">
              <h4 className="modal-title">Edit Student </h4>
              <button type="button" className="close" data-dismiss="modal"
              >&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="uid">University ID:</label>
                <input type="text" className="form-control" id="uid" placeholder="Enter University ID" value={uid} onChange={(e) => setUniversityId(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" className="form-control" id="dob" placeholder="Enter University ID" value={dob} onChange ={(e)=>setDob(e.target.value)} />
              </div>


              <div style={{ float: 'left' }} className="modal-footer">
                <button onClick={() => {
                  editData();
                }} type="button" className="btn btn-outline-primary" data-dismiss="modal" title="edit-btn">submit</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" title="close-btn">Close</button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* <div className="modal">
        <div id="context-menu">
          <a>
            <div className="item">
              <i className="fa fa-edit"></i> Edit
			</div>
          </a>
          <a>
            <div className="item">
              <i className="fa fa-trash-o"></i> Delete
			</div>
          </a>

        </div>
      </div> */}
    </>
  )
}

export default Student;
