// Styled
import { StyledProfileDesktop } from "./ProfileDesktop.styled";

// React
import React, {useEffect, useState} from "react";

// React İcons
import { FaCircle } from "react-icons/fa";
import { FiUsers, FiUserMinus, FiShield, FiTwitch } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { BiUser, BiWallet } from "react-icons/bi";
import { BsInbox, BsFileBarGraph } from "react-icons/bs";
import { MdOutlineDarkMode, MdLanguage, MdOutlineLogout } from "react-icons/md";
import { RiSettings2Line, RiArrowRightSLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";

// Components
import DarkAndStatus from "./DarkAndStatus";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../../store/user";
import {getCurrentUser} from "../../../utils/auth";
import {Button, Form, Input, Modal, Select} from "antd";
import {InfoCircleOutlined, LockOutlined, MailOutlined, PlayCircleOutlined, UserOutlined} from "@ant-design/icons";

const ProfileDesktop = () => {
  const [profileStatus, setProfileStatus] = useState(false);
  const {darkStatus} = useSelector(state => state.site);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();


  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    dispatch(signOut());
    // Điều hướng về trang chu
    history.push('/');
  }

  useEffect(() => {
    return () => {
      setIsModalOpen(false);
      setProfileStatus(false);
    }
  },[])


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
      history.push(`/publish/${getCurrentUser().username}`);
  }

  const options = [
    {label: 'Games', value: 'Games'},
    {label: 'Music', value: 'Music'},
    {label: 'Sports', value: 'Sports'},
    {label: 'Movie', value: 'Movie'},
    {label: 'Dances', value: 'Dances'},
    {label: 'Idols', value: 'Idols'},
  ];
  const handleChange = (value) => {
  };

  return (
    <StyledProfileDesktop>
      <div className="profile-box">
        <div
          className="profile"
          onClick={() => setProfileStatus(!profileStatus)}
        >
          <BiUser />
        </div>
        <div
          className={`profile-menu ${profileStatus ? "show-profile-menu" : ""}`}
        >
          <div className="menu-box">
            <div className="profile-info">
              <div className="pp">
                <BiUser />
              </div>
              <div className="info">
                <div className="username">{getCurrentUser().username}</div>
                <div className="status">
                </div>
              </div>
            </div>
            <hr />
            <div className="menu-list">
              <ul>
                <li>
                  <Link to={`/auth/user-profile/${getCurrentUser().username}`}>
                    <div className="item" style={darkStatus ? {color: '#fff'} : {color: '#000'}}>
                      <FiUserMinus /> <span>Thông tin cá nhân</span>
                    </div>
                  </Link>
                </li>
                <li>
                  {/*<Link to="/auth/sign-in">*/}
                  <div className="item" style={darkStatus ? {color: '#fff'} : {color: '#000'}} onClick={showModal}>
                    <VscSettings /> <span>Quản lý phát trực tiếp</span>
                  </div>
                    <Modal title="Nhập thông tin luồng stream" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                      <Form
                          name="normal_stream"
                          className="signup-form"
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={onFinish}
                      >
                        <Form.Item
                            name="streamName"
                            rules={[
                              {
                                required: true,
                                message: 'Hãy nhập streamName!',
                              },
                            ]}
                        >
                          <Input size={"large"} prefix={<PlayCircleOutlined className="site-form-item-icon" />} placeholder="Nhập tên stream" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                        >
                          <Input
                              size={"large"}
                              prefix={<InfoCircleOutlined className="site-form-item-icon" />}
                              placeholder="Mô tả thông tin stream"
                          />
                        </Form.Item>
                        <Form.Item
                            name="categories"
                            rules={[
                              {
                                required: true,
                                message: 'Hãy chọn thể loại stream!',
                              },
                            ]}
                        >
                          <Select
                              mode="multiple"
                              allowClear
                              style={{
                                width: '100%',
                              }}
                              placeholder="Chọn thể loại cho stream"
                              initialvalues={['Games']}
                              onChange={handleChange}
                              options={options}
                          />
                        </Form.Item>
                        {/*<Form.Item*/}
                        {/*    name="email"*/}
                        {/*    rules={[*/}
                        {/*      {*/}
                        {/*        required: true,*/}
                        {/*        message: 'Hãy nhập Email!',*/}
                        {/*      },*/}
                        {/*    ]}*/}
                        {/*>*/}
                        {/*  <Input size={"large"} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />*/}
                        {/*</Form.Item>*/}
                        <Form.Item>
                          <Button size={"large"} type="primary" htmlType="submit" className="signup-form-button">
                            Live Stream
                          </Button>
                        </Form.Item>
                      </Form>
                    </Modal>
                  {/*</Link>*/}
                </li>
                <li>
                  <Link to="/auth/sign-in">
                  <div className="item" style={darkStatus ? {color: '#fff'} : {color: '#000'}} >
                    <MdOutlineDarkMode /> <span>Giao diện tối</span>
                  </div>
                  </Link>
                  <DarkAndStatus whichStatus="darkmode" />
                </li>
                <hr />
                <li>
                  <div className="item" onClick={handleLogOut}>
                    <MdOutlineLogout style={{ transform: "rotate(180deg)" }} />{" "}
                    <span>Đăng xuất</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StyledProfileDesktop>
  );
};

export default ProfileDesktop;
