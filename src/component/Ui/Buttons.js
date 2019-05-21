import React from 'react';
import {Card, Button, Modal} from 'antd'

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false
        }
    }

    handleOpen (type) {
        this.setState({
            [type]: true
        })
    }


    render() {
        return (
            <div>
                <Card>
                    <Button type={'primary'} onClick={() => this.handleOpen('modal1')}>modal1</Button>
                    <Button type={'primary'} onClick={() => this.handleOpen('modal2')}>modal2</Button>
                    <Button type={'primary'} onClick={() => this.handleOpen('modal3')}>modal3</Button>
                    <Button type={'primary'} onClick={() => this.handleOpen('modal4')}>modal4</Button>
                </Card>
                <Modal title={'react'} visible={this.state.modal1} onCancel={() => {
                }}>
                    <p>hello world</p>
                </Modal>
            </div>
        );
    }
}
