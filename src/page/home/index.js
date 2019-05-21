import React from 'react';
import {Link} from 'react-router-dom'
import Header from './component/header'
import NavLeft from './component/navLeft'
import Footer from './component/footer'


import {
    Row, Col
} from 'antd';

import styles from './index.less'

export default class Home extends React.Component {
    state = {};


    render() {
        return (
            <React.Fragment>
                <Row className={styles.container}>
                    <Col span="4" className={styles.navLeft}>
                        <NavLeft/>
                    </Col>
                    <Col span="20" className={styles.main}>
                        <Header/>
                        <Row className={styles.content}>
                            {this.props.children}
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
