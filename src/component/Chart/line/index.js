import React from 'react';
// 引入 ECharts 主模块
import Echarts from 'echarts'
import {Row, Col} from 'antd'

export default class LineChart extends React.Component {
    componentDidMount() {
        this.chartLine3();
        this.chartLine4();
    }

    chartLine3=()=> {
        //指定图标的配置和数据
        var option = {
            title: {
                text: "ECharts 数据统计"
            },
            tooltip: {},
            legend: {
                data: ["用户来源"]
            },
            xAxis: {
                data: ["Android", "IOS", "PC", "Ohter"]
            },
            yAxis: {},
            series: [
                {
                    name: "访问量",
                    type: "line",
                    data: [500, 200, 360, 100]
                }
            ]
        };
        //初始化echarts实例
        var myChart3 = Echarts.init(document.getElementById("chart3"));

        //使用制定的配置项和数据显示图表
        myChart3.setOption(option);
    }


    chartLine4=()=> {
        let option = {
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
                // type: "value"
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: "line",
                    smooth: true
                }
            ]
        };
        let myChart4 = Echarts.init(document.getElementById("chart4"));
        myChart4.setOption(option);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={12}>
                        <div id="chart3" style={{width: '100%', height: 400}}></div>
                    </Col>
                    <Col span={12}>
                        <div id="chart4" style={{width: '100%', height: 400}}></div>
                    </Col>
                </Row>


            </React.Fragment>
        )
    }
}