import React from 'react';
import Header from "../../components/Header/Header";
import {StyledUserProfile} from "./UserProfile.styled";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export const UserProfile = () => {

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`).then(r => {});
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`).then(r => {});
            }
        },
    };

    return (
        <StyledUserProfile>
            <Header mySize="1848" />
            {/*<div>*/}
            {/*    <form method="post" action="/api/upload-avatar" encType="multipart/form-data">*/}
            {/*        <input type="file" name="file" required/><br/>*/}
            {/*        <input type="hidden" name="userId" value="{user-id}"/>*/}
            {/*        <button type="submit">Upload</button>*/}
            {/*    </form>*/}
            {/*</div>*/}
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </StyledUserProfile>
    );
};