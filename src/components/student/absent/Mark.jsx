/* eslint-disable no-undef */
import React, { useState } from "react";
import NavBar from "../../navbar/NavBar";
import { Form, message, Popconfirm } from "antd";
import axios from "axios";
import GetMarkStudent from "./Student";
import './mark.css';

const SendAbsent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState("");
  const [Class, setClass] = useState("Disaapa");
  const [hide, setHide] = useState("hide");
  let numbers = [];
  const [students, setStudents] = useState([{ _id: "3294", classId: 12, fname: "M.K.Januda", lname: "Pasandul", phone: "2023-10-05", status: "PRESENT" }])

  const token = localStorage.getItem("Authorization");

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const onConfirm = async() => {
    // eslint-disable-next-line no-undef
    setOpen(false);
    JavaScriptInterface.SendSMS(numbers, false, "Test");
  }

  const Click = async() => {
    setOpen(true);
  }

  const setNums = async(students) => {
    console.log(students[0].tel_number)
    function setNum() {
      for(let i = 0;i<students.length;i++) {
        numbers.push(students[i].tel_number);
      }
    }
    await setNum();
  }

  const onFormSubmit = async (e) => {
    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
      key: "abc"
    });

    const data = {
      grade: grade,
      Class: Class,
      Attendance: ""
    };

    await axios
      .post("https://class-management-api-9hnm.vercel.app/student/get", data)
      .then((res) => {
        messageApi.destroy();
        if (res.data.student.length == 0) {
          messageApi.open({
            type: "error",
            content: "Students not found",
            duration: 1000,
            key: "abc1"
          });
          setTimeout(messageApi.destroy, 3000);
        } else {
          messageApi.open({
            type: "success",
            content: "Students Fetched",
            duration: 1000,
            key: "abc1"
          });
          setStudents(res.data.student);
          setHide("");
          setNums(res.data.student);
          setTimeout(messageApi.destroy, 2000);
        }
      })
      .catch((err) => {
        console.log(err.message);
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: err.response.data,
          duration: 0,
          key: "abc1"
        });
        setTimeout(messageApi.destroy, 3000);
      });
  };

  return (
    <div className="users">
      {contextHolder}
      <div className="navbar">
        <NavBar />
      </div>
      <div className="users-container">
        <Form className="users-container-form" onFinish={onFormSubmit}>
          <div className={`scroll ${(hide == "hide") ? "" : "hide"}`}>
            <p className="users-txt" style={{marginLeft: "-80px"}}>Absent SMS</p>
            <div className="input">
              <p className="in-txt">Grade</p>
              <input type="number" min="6" max="11"
              onChange={(e) => setGrade(e.target.value)}
              required placeholder="Enter Grade" />
            </div>
            <div className="select">
              <p className="in-txt">Class</p>
              <select required onChange={(e) => setClass(e.target.value)}>
                <option value="Disaapa">Disaapa</option>
                <option value="Highstudy">HighStudy</option>
              </select>
            </div>
            <button className="btn" type="submit">
              Check
            </button>
          </div>
          <div className={`view-scroll ${hide}`}>
            <p className="users-txt" style={{marginLeft: "-80px"}}>Absent SMS</p>
            <div style={{display: "flex"}}>
              <p className="in-txt Ab_info">Students : {students.length}</p>
              <p className="in-txt Ab_info" style={{color: "#00bcf5"}}>Class : {Class}</p>
              <p className="in-txt Ab_info" style={{color: "#25db00"}}>Grade : {grade}</p>
            </div>
            <ul>
              {students.map((student) => (
                <GetMarkStudent
                  key={student._id}
                  id={student._id}
                  classId={student.classId}
                  lname={student.lname}
                  fname={student.fname}
                  status={student.status}
                />
              ))}
            </ul>
            <button className="btn5" type="button" onClick={(e) => setHide("hide")}>
              Back
            </button>
            <Popconfirm
              title="Are you Rechecked"
              description="Are you rechecked who absent?"
              okText="Yes"
              onCancel={() => setOpen(false)}
              onConfirm={onConfirm}
              open={open}
              cancelText="No"
              >
            <button className="btn" style={{marginLeft: "0px"}} onClick={() => Click()}>
              Send
            </button>
            </Popconfirm>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SendAbsent;
