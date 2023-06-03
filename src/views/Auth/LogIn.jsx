import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {StyledLogin} from "./LogIn.styled";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signIn} from "../../store/user";
import Swal from "sweetalert2";
const LogIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const payload = {
            username: values.username,
            password: values.password
        }
        const result = await dispatch(signIn(payload));
        console.log("result",result);
        if (result.payload) {
            await Swal.fire(
                'Thành công!',
                'Đăng nhập thành công!',
                'success'
            )
            // history.push("/")
            history.goBack()
        }
        else {
            await Swal.fire({
                icon: 'error',
                title: 'Ôi không...',
                text: "Bạn đã nhập sai username hoặc password!"
            })
        }
    };
    return (
        <>
            <StyledLogin>
                <div className="login-wrap">
                    <h1>Welcome back!</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
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
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Lưu thông tin</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="" style={{color: 'blue'}}>
                                Quên mật khẩu
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button size={"large"} type="primary" htmlType="submit" className="login-form-button">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        Hoặc <Link to="/auth/sign-up" style={{color: 'blue'}}>đăng ký!</Link>
                    </Form>
                </div>
            </StyledLogin>
        </>
    );
};
export default LogIn;