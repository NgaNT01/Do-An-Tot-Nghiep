import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {StyledStatistic} from "./Statistic.styled";
import Chart from "react-apexcharts";
import {Button,DatePicker} from "antd";

const Statistic = () => {
    const {RangePicker} = DatePicker;
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
            y: 100
        }, {
            x: 'Số lượng theo dõi',
            y: 4
        },
        {
            x: 'Thời gian phát trực tiếp',
            y: 150
        }],
    }],);

    useEffect(() => {

    }, [])

    const onPickMonth = (value) => {
        console.log(value);
    }

    const onCalendarChange = (dates,dateStrings,info) => {
        console.log("dates: ",dates);
        console.log("dateStrings: ",dateStrings);
        console.log("info: ",info);
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
                    >
                        Thống kê
                    </Button>
                </div>
                <div className="statis-info-wrapper">
                        <div className="statis-info-item">
                            <h3 className="info-number">100</h3>
                            <span className="info-title">Lượt xem trực tiếp</span>
                        </div>
                        <div className="statis-info-item">
                            <h3 className="info-number">4</h3>
                            <span className="info-title">Số lượng theo dõi</span>
                        </div>
                        <div className="statis-info-item">
                            <h3 className="info-number">150</h3>
                            <span className="info-title">Thời gian phát trực tiếp</span>
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