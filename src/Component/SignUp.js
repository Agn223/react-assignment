import React, { useState, useEffect} from 'react';
import { Button,Form, Input} from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./App.css";


function SignUp(){
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHome,setShowHome]=useState(false)
  const localSignUp=localStorage.getItem("signUp")

  useEffect(()=>{
    if(localSignUp){
        setShowHome(true)
    }})


  const handleSubmit = (e) => {
    if(name&&email&&password)
      {
    localStorage.setItem("name",name)
    localStorage.setItem("email",email)
    localStorage.setItem("password",password)
    localStorage.setItem("signUp",email);
      }
      else{
        alert("Please enter required credentials");
        e.preventDefault();
      }
}

const handleSignIn = () =>{
  navigate("/signin")

}

  return(
    <div className='appBg'>
    {showHome? navigate("/home"): 
            
  <form className='formC' onSubmit={handleSubmit}>

    <h1> Welcome </h1>
    <Form.Item
      label=""
      labelCol={{ span: 4, }}
      wrapperCol={{ span: 24, }}
      style={{ maxWidth: 1500, }}
      hasFeedback
      rules={[{ required: true, message: 'Please input your username!', },]}
      value={name} onChange={(e) => setName(e.target.value)}
      >
      <Input type="text" placeholder='Your Name' prefix={<UserOutlined className="site-form-item-icon" />} />
    </Form.Item>

    <Form.Item
      labelCol={{ span: 4, }}
      wrapperCol={{ span: 24, }}
      style={{ maxWidth: 1500, }}

      label=""
      value={email} onChange={(e) => setEmail(e.target.value)}
      rules={[{ required: true, message: 'Please input your email!', },]}>
      <Input type="email" placeholder='Your email address'/>
    </Form.Item>

    <Form.Item
      labelCol={{ span: 4, }}
      wrapperCol={{ span: 24, }}
      style={{ maxWidth: 1500, }}

      label=""
      value={password} onChange={(e) => setPassword(e.target.value)}
      rules={[{ required: true, message: 'Please input your password!', },]}>
      <Input.Password type="password" placeholder='Your Password' iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
    </Form.Item>

    <Button type="primary" danger htmlType='submit' >
      Sign up
    </Button>
    

<br />
<br />
<Button type='dashed' danger onClick={handleSignIn}>Already an user? Click here to login</Button>
</form>
}
</div>
        
  );
}

export default SignUp;
