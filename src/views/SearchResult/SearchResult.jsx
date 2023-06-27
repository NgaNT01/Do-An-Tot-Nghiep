import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {StyledSearchResult} from "./SearchResult.styled";
import {useParams} from "react-router-dom";
import {Tabs} from "antd";
import ChannelsDesktop from "../../components/Channels/ChannelsDesktop/ChannelsDesktop";
import VideosDesktop from "../../components/Videos/VideosDesktop";
import GeneralResult from "./GeneralResult";
import {useDispatch, useSelector} from "react-redux";
import {getAllUserByUsername} from "../../store/user";
import UsersDesktop from "../../components/Users/UsersDesktop";
import {getAllStreamByName} from "../../store/streams";
import {getAllRecordByName} from "../../store/record_video";

const SearchResult = () => {
    const {keyword} = useParams();
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const dispatch = useDispatch();
    const {currentListUser} = useSelector(state => state.user)
    const {currentListStream} = useSelector(state => state.stream)
    const {currentListRecord} = useSelector(state => state.record)

    useEffect(async () => {
        setSearchKeyword(keyword);
        await dispatch(getAllUserByUsername(keyword))
        await dispatch(getAllStreamByName(keyword))
        await dispatch(getAllRecordByName(keyword))
    }, [keyword]);

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: <span style={{fontSize: '20px'}}>Chung</span>,
            children: <GeneralResult
                currentListRecord={currentListRecord}
                currentListUser={currentListUser}
                currentListStream={currentListStream}
            />,
        },
        {
            key: '2',
            label: <span style={{fontSize: '20px'}}>Trực tiếp</span>,
            children: <ChannelsDesktop currentBroadcastingStreams={currentListStream}/>,
        },
        {
            key: '3',
            label: <span style={{fontSize: '20px'}}>User</span>,
            children: <UsersDesktop currentListUsers={currentListUser}/>,
        },
        {
            key: '4',
            label: <span style={{fontSize: '20px'}}>Video</span>,
            children: <VideosDesktop currentListRecords={currentListRecord}/>,
        },
    ];

    return (
        <div style={{backgroundColor: '#F5F5F5'}}>
            <Header title="Tìm kiếm" mySize="1848" />
            <StyledSearchResult>
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    tabBarStyle={{fontWeight: 'light'}}
                    items={items}
                    onChange={onChange}
                />
            </StyledSearchResult>
        </div>
    );
};

export default SearchResult;