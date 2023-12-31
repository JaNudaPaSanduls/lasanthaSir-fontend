import React , { useState }from 'react';
import NavBar from '../../navbar/NavBar';
import { Form, message, Select } from 'antd';
import axios from 'axios';
import './register.css';

const StudentRegister = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [phone, setPhone] = useState("");
    const [nic, setNIC] = useState("");
    const [c_class, setClass] = useState("HighStudy");
    const [classId, setClassId] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [grade, setGrade] = useState(""); 

    const onFormSubmit = async (e) => {
        messageApi.open({
            type: 'loading',
            content: 'Loading...',
            duration: 0,
        });
        const user = {
            class_id: classId,
            fname: fname,
            lname: lname,
            tel_number: phone,
            nic: nic,
            grade: grade,
            Class: c_class
        };

        const config = {
            headers: {
                Authorization: await localStorage.getItem("Authorization")
        }};

        await axios.post('https://class-management-api-9hnm.vercel.app/student/create', user, config)
            .then((res) => {
                messageApi.destroy();
                messageApi.open({
                    type: 'success',
                    content: 'Student Added',
                    duration: 1000,
                });
                setTimeout(messageApi.destroy, 2000);
            })
            .catch((err) => {
                console.log(err.message);
                messageApi.destroy();
                messageApi.open({
                    type: 'error',
                    content: err.response.data
                });
                setTimeout(messageApi.destroy, 3000);
            });
    }

    return (
    <div className="register">
        {contextHolder}
        <div className="navbar">
            <NavBar />
        </div>
        <div className="register-container">
            <Form className="register-container-form" onFinish={onFormSubmit}>
                <div className="scroll">
                <p className="register-txt">Add Student</p><div className="input">
                    <p className="in-txt">Class ID</p>
                    <input 
                    onChange={(e) => setClassId(e.target.value)}
                    min="0"
                    required type="number" placeholder="Enter Class ID" />
                </div>
                <div className="input">
                    <p className="in-txt">First Name</p>
                    <input 
                    onChange={(e) => setFname(e.target.value)}
                    required type="text" placeholder="Enter First Name" />
                </div>
                <div className="input">
                    <p className="in-txt">Last Name</p>
                    <input 
                    onChange={(e) => setLname(e.target.value)}
                    required type="text" placeholder="Enter Last Name" />
                </div>
                <div className="input">
                    <p className="in-txt">Phone Number</p>
                    <input 
                    min="0111111111"
                    max="9999999999"
                    onChange={(e) => setPhone(e.target.value)}
                    required type="number" placeholder="Enter Phone Number" />
                </div>
                <div className="input">
                    <p className="in-txt">NIC</p>
                    <input maxLength="11" minLength="9"
                    onChange={(e) => setNIC(e.target.value)}
                    required type="text" placeholder="Enter NIC Number" />
                </div>
                <div className="input">
                    <p className="in-txt">Grade</p>
                    <input 
                    onChange={(e) => setGrade(e.target.value)}
                    required type="number" placeholder="Enter Grade" />
                </div>
                <div className="select">
                    <p className="in-txt">Class</p>
                    <select onChange={(e) => setClass(e.target.value)}>
                        <option className="op" style={{ border: "0px" }} value="Disaapa">Disaapa</option> 
                        <option className="op" value="Highstudy" selected>HighStudy</option>
                    </select>
                </div>
                <button className="btn" type="submit">Register</button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default StudentRegister;