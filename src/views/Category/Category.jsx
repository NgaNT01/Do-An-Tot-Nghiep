import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {StyledCategory} from "./Category.styled";
import {useParams} from "react-router-dom";
import {Tabs} from "antd";
import ChannelsDesktop from "../../components/Channels/ChannelsDesktop/ChannelsDesktop";
import {useDispatch, useSelector} from "react-redux";
import {getListBroadcastingStreamsByCategory} from "../../store/streams";
import Seperate from "../../components/Share/Seperate";
import VideosDesktop from "../../components/Videos/VideosDesktop";
import {getListRecordByCategory} from "../../store/record_video";

const Category = () => {
    const [categoryName, setCategoryName] = useState(useParams().category);
    const {currentBroadcastingStreamsByCategory} = useSelector(state => state.stream);
    const {listRecordByCategory} = useSelector(state => state.record);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListBroadcastingStreamsByCategory(categoryName));
        dispatch(getListRecordByCategory(categoryName));
    },[])


    let srcImage = "";
    if (categoryName === "Games") srcImage = "/images/categories/games.jpeg";
    else if (categoryName === "Music") srcImage = "/images/categories/music.jpeg";
    else if (categoryName === "Sports") srcImage = "/images/categories/sports.jpeg";
    else if (categoryName === "Movie") srcImage = "/images/categories/creative.jpeg";
    else if (categoryName === "Dances") srcImage = "/images/categories/dances.jpeg";
    else if (categoryName === "Idols") srcImage = "/images/categories/idols.jpeg"

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: <span style={{fontSize: '1.6rem'}}>Kênh trực tiếp</span>,
            children: <ChannelsDesktop currentBroadcastingStreams={currentBroadcastingStreamsByCategory}/>,
        },
        {
            key: '2',
            label: <span style={{fontSize: '1.6rem'}}>Video</span>,
            children: <VideosDesktop currentListRecords={listRecordByCategory}/>,
        },
    ];

    useEffect(() => {
        console.log("category", categoryName);
    }, [])

    return (
        <>
            <Header mySize="1848" />
            <StyledCategory>
                <div className="header-box">
                    <div className="header-logo">
                        <img
                            style={{width: '280px',height: '186px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)'}}
                            src={srcImage}/>
                    </div>
                    <div className="header-content">
                        <h1>{categoryName}</h1>
                        <div style={{marginTop: '15px'}}>
                            <span
                                style={{marginRight: '20px',fontSize: '22px'}}
                            >
                                {currentBroadcastingStreamsByCategory.length} kênh trực tiếp
                            </span>
                            <span
                                style={{marginRight: '20px',marginTop: '5px', fontSize: '25px', fontWeight: 'bolder'}}
                            >&#10072;
                            </span>
                            <span style={{marginRight: '10px',fontSize: '22px'}}>{listRecordByCategory.length} video clip</span>
                        </div>
                    </div>
                </div>
                <Seperate/>
                <div className="content-box">
                    <Tabs
                        defaultActiveKey="1"
                        size="small"
                        tabBarStyle={{fontWeight: 'bold'}}
                        items={items}
                        onChange={onChange}
                    />
                </div>
            </StyledCategory>
        </>
    );
};

export default Category;