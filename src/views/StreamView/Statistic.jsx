import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {StyledStatistic} from "./Statistic.styled";
import Chart from "react-apexcharts";
import {Button,DatePicker} from "antd";
import {getCurrentUser} from "../../utils/auth";
import {getStatisticInfo} from "../../store/user";
import {useDispatch} from "react-redux";

const Statistic = () => {
    const [totalDurations, setTotalDurations] = useState(0);
    const [totalViewers, setTotalViewers] = useState(0);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [startMonth, setStartMonth] = useState(null)
    const [endMonth, setEndMonth] = useState(null)
    const [year, setYear] = useState(null)
    const {RangePicker} = DatePicker;
    const dispatch = useDispatch();


    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            // categories: ['Lượt xem trực tiếp', 'Số lượng theo dõi', 'Thời gian phát trực tiếp']
            type: 'category'
        },
        fill: {
            colors: ['blue']
        }
    });
    const [series, setSeries] = useState([{
        data: [{
            x: 'Lượt xem trực tiếp',
            y: totalViewers
        }, {
            x: 'Số lượng theo dõi',
            y: totalFollowers
        },
        {
            x: 'Thời gian phát trực tiếp',
            y: totalDurations
        }],
    }],);

    useEffect(() => {

    }, [])

    const onPickMonth = (value) => {
        console.log(value);
    }

    const onCalendarChange = (dates,dateStrings,info) => {
        console.log(dates[0].$y);
        setYear(dates[0].$y)
        setStartMonth(dates[0].$M + 1)
        if (dates[1] !== null) setEndMonth(dates[1].$M + 1)
    }

    const onStatistic = async () => {
        const payload = {
            startMonth,
            endMonth,
            year,
            userId: getCurrentUser().id
        }
        const result = await dispatch(getStatisticInfo(payload));
        console.log(result)
        if (result.payload) {
            setSeries([{
                data: [{
                    x: 'Lượt xem trực tiếp',
                    y: result.payload.totalViews
                }, {
                    x: 'Số lượng theo dõi',
                    y: result.payload.totalFollowers
                },
                    {
                        x: 'Thời gian phát trực tiếp',
                        y: Math.floor(result.payload.totalDurations/60)
                    }],
            }])
        }
    }


    return (
        <>
            <Header title="Thống kê" mySize="1848" />
            <StyledStatistic>
                <div className="statis-time-wrapper">
                    <RangePicker
                        picker="month"
                        className="month-picker"
                        onChange={onPickMonth}
                        onCalendarChange={onCalendarChange}
                    />
                    <Button
                        className="statis-button"
                        type="primary"
                        onClick={onStatistic}
                    >
                        Thống kê
                    </Button>
                </div>
                <div className="statis-info-wrapper">
                        <div className="statis-info-item">
                            <h3 className="info-number">{totalViewers}</h3>
                            <span className="info-title">Lượt xem trực tiếp</span>
                        </div>
                        <div className="statis-info-item">
                            <h3 className="info-number">{totalFollowers}</h3>
                            <span className="info-title">Số lượng theo dõi</span>
                        </div>
                        <div className="statis-info-item">
                            <h3 className="info-number">{Math.floor(totalDurations/60)}</h3>
                            <span className="info-title">Thời gian phát trực tiếp (phút)</span>
                        </div>
                </div>
                <div className="statis-chart-wrapper">
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="1150"
                        height="550"
                    />
                </div>
                <div className="export-button">
                    <Button
                        style={{border: 'none',backgroundColor: '#D9D9DD', width:'1150px',height: '50px'}}
                    >
                        Xuất dữ liệu
                    </Button>
                </div>
            </StyledStatistic>
        </>
    );
};

export default Statistic;