import React, { useState} from 'react';
import { Button, Form, Input} from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./App.css";


function SignIn(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const localEmail=localStorage.getItem("email")
  const localPassword=localStorage.getItem("password")


  const handleLoginSubmit = (e) => {
   
    if(email==localEmail&&password==localPassword){
        navigate("/home")
    }else{
        alert("Please Enter valid Credential")
        e.preventDefault();
    }
   }
   const deleteAccount=()=>{ 
    localStorage.clear()
    navigate("/")
  }
 
   return(
    <div className='appBg'>
            
  <form className='formC' onSubmit={handleLoginSubmit}>

    <h1> Welcome Back! </h1>
    <Form.Item
      labelCol={{ span: 4, }}
      wrapperCol={{ span: 24, }}
      style={{ maxWidth: 1500, }}

      
      value={email} onChange={(e) => setEmail(e.target.value)}
      rules={[{ required: true, message: 'Please input your email!', },]}>
      <Input type="email" placeholder='Your email' prefix={<UserOutlined className="site-form-item-icon" />} />
    </Form.Item>

    <Form.Item
      labelCol={{ span: 4, }}
      wrapperCol={{ span: 24, }}
      style={{ maxWidth: 1500, }}
      label=""
      value={password} onChange={(e) => setPassword(e.target.value)}
      rules={[{ required: true, message: 'Please input your password!', },]}>
      <Input.Password
        type="password"
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Form.Item>
    <Button type="primary" danger htmlType='submit'>
      Sign In
    </Button>
    <br /> 
    <hr />
    <Button type="dashed" danger onClick={deleteAccount} className="delete">Create New Account ?</Button>
    </form>
</div>
          
  );
}

export default SignIn;
