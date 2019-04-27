import React from 'react';
// 引入 ECharts 主模块
import Echarts from 'echarts'
import {Row, Col} from 'antd'

export default class CircleChart extends React.Component {

    componentDidMount() {
        this.chartLine5();
    }

    chartLine5 = () => {
        let option = {
            title: {
                text: 'ECharts 数据统计'
            },
            series: [{
                name: '访问量',
                type: 'pie',
                radius: '60%',
                data: [
                    {value: 500, name: 'Android'},
                    {value: 200, name: 'IOS'},
                    {value: 360, name: 'PC'},
                    {value: 100, name: 'Ohter'}
                ]
            }]
        };
        let myCharts5 = Echarts.init(document.getElementById("chart5"));
        myCharts5.setOption(option);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>
                        <div id="chart5" style={{width:' 100%', height: 400}}></div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}