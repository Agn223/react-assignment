import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button,Modal } from 'antd';
import "./Table.css";


function Home() {

  const[record,setRecord] = useState([])
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rs,setrs] = useState({
    id:'',
    userName:'',
    username:'',
    email:'',
    website:''
 })
 
  const showModal = (id) => {
    setIsModalOpen(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(resposne=> resposne.json())
      .then(res=>setrs(res))
    
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

 const getData = () =>
   {
       fetch('https://jsonplaceholder.typicode.com/users/')
       .then(resposne=> resposne.json())
       .then(res=>setRecord(res))
   }
  
   useEffect(() => {
      getData();
   },[])
  
  const Navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("signUp")
    Navigate("/signin")
}
const deleteAccount=()=>{ 
  localStorage.clear()
  Navigate("/")
}
  return (
    <div className='bg'>
      <div className='welcome'>
      <h1> Home Page </h1>
      <p>Welcome {localStorage.getItem('name')}</p>
      </div>
      
        
      <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Modify</th>
        </tr>
      </thead>
      <tbody>
      {record.map((names,index)=>
                           <tr key={index}>
                               <td>{names.id}</td>
                              <td>{names.name}</td>
                              <td>{names.username}</td>
           
            <td> <Button  danger onClick={(e)=>showModal(names.id)}>view</Button> <Button danger>edit</Button> <Button danger>delete</Button></td>
          </tr>
        )}
      </tbody>
    </table>
      
      <Button type="primary" danger onClick={logout} className="logout">LogOut</Button> 
      <Button type="primary" danger onClick={deleteAccount} className="delete">Delete</Button>


<>
    
<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Employee ID : {rs.id}</p>
                <p>Name : {rs.name}</p>
                <p>Username : {rs.username}</p>
                <p>Email : {rs.email}</p>
      </Modal>
    </>
                
              
          </div>
      
  )
}

export default Home
