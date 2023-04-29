import React from 'react';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signIn, signUp} from "../../store/user";
import {StyledSignUp} from "./SignUp.styled";
import Swal from "sweetalert2";
const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onFinish = async (values) => {
        if (values.password !== values.confirm_password) {
            await Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: "Mật khẩu chưa trùng khớp!"
            })
        }
        console.log('Received values of form: ', values);
        const payload = {
            username: values.username,
            password: values.password,
            email: values.email
        };

        const result = await dispatch(signUp(payload))
        console.log('Received result: ', result);
        if (result.payload) {
            await Swal.fire(
                'Thành công!',
                'Đăng ký thành công!',
                'success'
            )
            history.push("/auth/sign-in");
        }
        else {
            await Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: "Đã có lỗi xảy ra!"
            })
        }
    };
    return (
        <>
            <StyledSignUp>
                <div className="signup-wrap">
                    <h1>Register your account</h1>
                    <Form
                        name="normal_signup"
                        className="signup-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập Username!',
                                },
                            ]}
                        >
                            <Input size={"large"} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu!',
                                },
                            ]}
                        >
                            <Input
                                size={"large"}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu!',
                                },
                            ]}
                        >
                            <Input
                                size={"large"}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập Email!',
                                },
                            ]}
                        >
                            <Input size={"large"} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item>
                            <Button size={"large"} type="primary" htmlType="submit" className="signup-form-button">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </StyledSignUp>
        </>
    );
};
export default SignUp;