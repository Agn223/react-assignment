
import "./Antt.css";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState,useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const[record,setRecord] = useState([])
  const getData = () =>
   {
       fetch('https://jsonplaceholder.typicode.com/users/')
       .then(resposne=> resposne.json())
       .then(res=>setRecord(res))
   }
  
   useEffect(() => {
      getData();
   },[])
    
   const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Actions",
      render: (record) => {
        return (
          <>
          <Button
              onClick={() => {
                onViewStudent(record);
              }}
            > View </Button>
            
            <Button
              onClick={() => {
                onEditStudent(record);
              }}
            > Edit </Button>
            
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const Navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("signUp")
    Navigate("/signin")
}
const deleteAccount=()=>{ 
  localStorage.clear()
  Navigate("/")
}

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };
    setRecord((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setRecord((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onViewStudent = (record) => {
    setIsViewing(true);
    setViewingStudent({ ...record });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  const resetViewing = () => {
    setIsViewing(false);
    setViewingStudent(null);
  };
  


  return (
    <div className="Bg">
    <div className="App">
    <h1>Welcome {localStorage.getItem('name')}</h1>
      <br />
      
      <header className="App-header">
        <Button type="primary" danger onClick={onAddStudent}>Add a new Student</Button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Table columns={columns} dataSource={record}></Table>
        
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setRecord((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input placeholder="Id"
            value={editingStudent?.id}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, id: e.target.value };
              });
            }}
            />
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input placeholder="name"
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          
        </Modal>
</header>

<Modal
          title="View Student"
          visible={isViewing}
          okText="Close"
          onCancel={() => {
            resetViewing();
          }}
          onOk={() => {
            resetViewing();
          }}
        >
          <Input
            value={viewingStudent?.name} 
          />
          <Input placeholder="name"
            value={viewingStudent?.email}
          />
        </Modal>

      <Button type="primary" danger onClick={logout} className="logout">LogOut</Button> 
      <Button type="primary" danger onClick={deleteAccount} className="delete">Delete</Button>
    </div>
    </div>
  );
}

export default Home;
