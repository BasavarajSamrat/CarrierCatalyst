import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
   
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      console.log(response)
      if (response.success) {
        console.log(response)
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/home";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mft-250 h-screen w-screen bg-first">
      <div className="card w-400 p-3 bg-first bd">
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="text-2xl text-white"> LOGIN <i class="ri-login-circle-line"></i></h1>

          </div>
          <div className="divider"></div>
         
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
  <Form.Item name="email" label="Email">
    <input type="text" className="input-field" />
  </Form.Item>
  <Form.Item name="password" label="Password">
    <input type="password" className="input-field" />
  </Form.Item>

  <div className="flex flex-col gap-2">
    <button type="submit" className="bg-login bd mft-20 w-100">
      Login
    </button>
    <Link to="/register" className="underline mft-20 text-mdx">
      Not a member? Register
    </Link>
  </div>
</Form>

        </div>
      </div>
    </div>
  );
}

export default Login;
