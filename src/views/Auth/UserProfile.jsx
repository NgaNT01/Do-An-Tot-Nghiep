import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {StyledUserProfile} from "./UserProfile.styled";
import {Button, Layout, message, Upload, Menu, theme} from "antd";
const {Content, Footer, Sider } = Layout;
import {UploadOutlined,LaptopOutlined, NotificationOutlined, UserOutlined, HeartFilled, YoutubeOutlined} from "@ant-design/icons";
import UsersDesktop from "../../components/Users/UsersDesktop";


export const UserProfile = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [selectedKey, setSelectedKey] = useState('1');

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <span>Nội dung 1</span>;
            case '2':
                return <span>Nội dung 2</span>;
            case '3':
                return <span>Nội dung 3</span>;
            default:
                return null;
        }
    };

    const items2 = [UserOutlined, HeartFilled, YoutubeOutlined].map((icon, index) => {
        const key = index + 1;
        let label;
        switch (key) {
            case 1:
                label = 'Thông tin của tôi'
                break;
            case 2:
                label = 'Theo dõi của tôi'
                break;
            case 3:
                label = 'Video của tôi'
                break;
        }
        return {
            key: `${key}`,
            icon: <span style={{width: '20px'}}>{React.createElement(icon)}</span>,
            label: <span style={{fontSize: '20px'}}>{label}</span>,
        };
    });

    const onClickItem = (e) => {
        setSelectedKey(e.key)
    }

    return (
        <StyledUserProfile>
            <Header mySize="1848" />
            <Layout
                style={{
                    height: '800px',
                    padding: '24px 0',
                    background: colorBgContainer,
                }}
            >
                <Sider
                    style={{
                        background: colorBgContainer,
                        width: '300px'
                    }}
                >
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={['1']}
                        style={{
                            height: '100%',
                            width: '300px'
                        }}
                        items={items2}
                        onClick={onClickItem}
                    />
                </Sider>
                <Content
                    style={{
                        padding: '0 24px',
                    }}
                >
                    {renderContent(selectedKey)}
                </Content>
            </Layout>
        </StyledUserProfile>
    );
};