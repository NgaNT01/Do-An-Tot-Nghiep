import React, {useEffect, useRef, useState} from 'react';
import {WebRTCAdaptor} from "../../utils/js/webrtc_adaptor";
import {useHistory, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import {StyledPublishStream} from "./PublishStream.styled";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../../utils/auth";
import {Button, Form, Input, Select, Modal} from "antd";
import Message from "../../components/Share/Message";
import {getAllStream, stopStream} from "../../store/streams";
import {ExclamationCircleFilled, InfoCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";
import {MdInsertEmoticon} from "react-icons/all";
import Icon from '@mdi/react';
import { mdiEmoticonHappyOutline } from '@mdi/js';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const PublishStream = () => {
    let webRTCAdaptor = null;
    const [webRTC,setWebRTC] = useState(null);
    const {currentUser} = useSelector(state => state.user);
    const {currentPublishStream} = useSelector(state => state.stream);
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { confirm } = Modal;

    const [streamName, setStreamName] = useState(useParams().streamName);
    const [mediaConstraints,setMediaConstraints] = useState({video: true, audio: true});
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: false,OfferToReceiveVideo: false})
    const [websocketURL,setWebsocketURL] = useState("wss://baongan.online:5443/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const chatMessageRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);

    const options = [
        {label: 'Games', value: 'Games'},
        {label: 'Music', value: 'Music'},
        {label: 'Sports', value: 'Sports'},
        {label: 'Movie', value: 'Movie'},
        {label: 'Dances', value: 'Dances'},
        {label: 'Idols', value: 'Idols'},
    ];

    useEffect(() => {
        webRTCAdaptor = initiateWebrtc();
        setWebRTC(webRTCAdaptor);
        console.log("adaptor của stream",webRTCAdaptor);
        setIsShow(true);
        onStartPublishing(streamName);

        return () => {
            const params = {
                streamId: currentPublishStream.streamId,
                streamName: currentPublishStream.streamName
            }
            dispatch(stopStream(params));
            webRTCAdaptor.stop(streamName);
            setChatMessages([]);
            setInputValue('');
            setIsShow(false);
            setWebRTC(null);
            setMediaConstraints(null);
            setSdpConstraints(null);
            setStreamName('');
            setWebsocketURL('');
        }
    },[]);

    const handleDisplayChat = (message) => {
        setChatMessages((messages) => [...messages, message]);
    }

    function initiateWebrtc() {
        let thiz = this;
        return new WebRTCAdaptor({
            websocket_url: websocketURL,
            mediaConstraints: mediaConstraints,
            peerconnection_config: pc_config,
            sdp_constraints: sdpConstraints,
            localVideoId: "localVideo",
            debug: true,
            bandwidth:2000,
            callback: function (info, obj) {
                if (info === "initialized") {
                    console.log("initialized",obj);

                } else if (info === "publish_started") {
                    //stream is being published
                    console.log("publish started");
                    alert("publish started");

                } else if (info === "publish_finished") {
                    //stream is being finished
                    console.log("publish finished");

                }
                else if (info === "data_channel_opened") {

                    console.log("data channel is open");

                }

                else if (info === "data_channel_error") {

                    // handleError(description);

                } else if (info === "data_channel_closed") {

                    console.log("Data channel closed " );
                }else if (info === "closed") {
                    //console.log("Connection closed");
                    if (typeof obj != "undefined") {
                        console.log("Connection closed: "
                            + JSON.stringify(obj));
                    }
                } else if (info === "streamInformation") {


                } else if (info === "ice_connection_state_changed") {
                    console.log("iceConnectionState Changed: ", JSON.stringify(obj));
                } else if (info === "updated_stats") {
                    console.log("Average incoming kbits/sec: " + obj.averageIncomingBitrate
                        + " Current incoming kbits/sec: " + obj.currentIncomingBitrate
                        + " packetLost: " + obj.packetsLost
                        + " fractionLost: " + obj.fractionLost
                        + " audio level: " + obj.audioLevel);

                } else if (info === "data_received") {
                    handleDisplayChat(obj.data);
                } else if (info === "bitrateMeasurement") {
                    // console.log(info + " notification received");

                    console.log(obj);
                } else {
                    // console.log(info + " notification received");
                }
            },
            callbackError: function (error) {
                //some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

                console.log("error callback: " + JSON.stringify(error));
                alert(JSON.stringify(error));
            }
        });
    }

    const streamChangeHandler = () => {

    }

    const handleEmojiSelect = (emoji) => {
        setInputValue(inputValue + emoji.native);
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const onStartPublishing = async (streamName) => {
        const result = await dispatch(getAllStream());
        const listStream = result.payload;
        const prevStreamId = listStream[listStream.length - 1].streamId;
        webRTCAdaptor.publish(`${streamName}_${prevStreamId}`,'');
    }

    const onEnterChat = (e) => {
        console.log(e.target.value);
        let now = new Date();
        webRTC.sendData(streamName, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${e.target.value}`);
        setChatMessages(messages => [...messages, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${e.target.value}`]);
        setInputValue('');
    }

    const onClickSend = () => {
        let now = new Date();
        webRTC.sendData(streamName, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${inputValue}`);
        setChatMessages(messages => [...messages, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${inputValue}`]);
        setInputValue('');
    }

    const handleClickOutsidePicker = () => {
        setShowPicker(false)
    }

    const handleChangeDesktopCamera = () => {
        webRTC.switchDesktopCaptureWithCamera(streamName);
    }

    const handleChangeDesktop = () => {
        webRTC.switchDesktopCapture(streamName);
    }

    const handleChangeCamera = () => {
        webRTC.switchVideoCameraCapture(streamName);
    }

    const onFinish = () => {

    }

    const handleChange = () => {

    }

    const handleStopStream = () => {
        confirm({
            title: 'Bạn có chắc muốn kết thúc stream?',
            icon: <ExclamationCircleFilled />,
            content: 'Nhấn Có để dừng',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                const params = {
                    streamId: currentPublishStream.streamId,
                    streamName: currentPublishStream.streamName
                }
                dispatch(stopStream(params));
                Swal.fire(
                    'Thành công!',
                    'Đã dừng stream!',
                    'success'
                )
                history.push(`/`);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    return (
        <>
            <StyledPublishStream>
                <Header mySize="1848" />
                <div className="publish-wrap">
                    <div className="livestream-box">
                        <video id="localVideo" muted autoPlay controls playsInline></video>
                    </div>
                    <div className="info-box">
                        <div className="stream-mode">
                            <div className="header-info">Chọn chế độ truyền trực tiếp
                            </div>
                            <div className="info-body" style={{marginTop: '20px'}}>
                                <Button type="primary" onClick={handleChangeDesktopCamera} style={{marginRight: '5px',marginLeft: '20px'}}>Desktop + Camera</Button>
                                <Button type="primary" onClick={handleChangeDesktop} style={{marginRight: '5px'}}>Desktop</Button>
                                <Button type="primary" onClick={handleChangeCamera}>Camera</Button>
                            </div>
                        </div>
                        <div className="modify-stream-info">
                            <div className="header-info">Chỉnh sửa thông tin truyền trực tiếp</div>
                            <div className="info-body">
                                <Form
                                    name="normal_stream"
                                    className="signup-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    form={form}
                                    style={{margin: '10px'}}
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
                                        <Input size={"large"} prefix={<PlayCircleOutlined className="site-form-item-icon" />} placeholder={`${currentPublishStream.streamName}`} />
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
                                            placeholder={`${currentPublishStream.description}`}
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
                                            initialValues={currentPublishStream.categories}
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{float: 'right'}}>
                                        <Button
                                            size={"large"}
                                            type="primary"
                                            htmlType="submit"
                                            className="signup-form-button"
                                        >
                                            Lưu
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </div>

                        </div>
                        <Button
                            style={{margin: '10px'}}
                            size="large"
                            type="primary"
                            danger
                            onClick={handleStopStream}
                        >
                            Dừng phát trực tiếp
                        </Button>
                    </div>
                    <div className="chat-box">
                        <div className="box-header">
                            <div className="my-chat">Trò chuyện của tôi</div>
                        </div>
                        <div className="chat-messages" ref={chatMessageRef}>
                            {chatMessages.map((message, index) => {
                                const time_username = message.split(": ")[0];
                                const username = time_username.split("] ")[1];
                                const time = time_username.split("] ")[0];
                                const content = message.split(": ")[1];
                                return (
                                    <Message time={time} username={username} content={content}></Message>
                                )
                            })}
                        </div>
                        <div className="box-footer">
                            <Input
                                placeholder="Nhập tin nhắn"
                                onPressEnter={onEnterChat}
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                                style={{width: '220px'}}
                            >

                            </Input>
                            <Button
                                type="primary"
                                size="large"
                                className="send-button"
                                onClick={onClickSend}
                            >
                                Gửi
                            </Button>
                            <Button
                                size="large"
                                onClick={togglePicker}

                            >
                                <span style={{marginBottom: '10px',fontSize: '19px'}}>😀</span>
                            </Button>
                        </div>
                        {showPicker && (
                            <Picker
                                onEmojiSelect={handleEmojiSelect}
                                emojiSize={24}
                                showPreview={true}
                                data={data}
                                className="picker"
                                onClickOutside={handleClickOutsidePicker}
                            />
                        )}
                    </div>
                </div>
            </StyledPublishStream>
        </>
    );
};

export default PublishStream;