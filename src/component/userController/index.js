import React from 'react';
import {Row,Col,Button} from 'antd';

export default class Settings extends React.Component{
    render(){
        return (
            <div>
                <Row>
                    <Col span={3}>
                        <Button>创建权限角色</Button>
                    </Col>
                    <Col span={3}>
                        <Button>编辑权限角色</Button>
                    </Col>
                    <Col span={3}>
                        {/*后台里面的所有用户*/}
                        <Button>用户授权</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
