import React from 'react';
import service from "../../../utils/service";
import moment from 'moment'

export default class Watch extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.formContent, 91);
        this.state = {
            _formContent1: {
                name: '',
                city: 0,
                date: new Date(),
                sex: 0,
            }
        }

    }

    componentDidMount() {
        let match = this.props.match.params;
        //我是second页面，路由id 是 {mathc.id}
        service.linkEdit({id: match.id}).then((res) => {
            console.log(res.data.data, 55);
            this.setState({
                _formContent1: res.data.data
            })
        })
    }

    render() {
        let {
            name,
            city,
            date,
            sex,
        } = this.state._formContent1;

        let newMoment=moment(date).format("YYYY-MM-DD");
        return (
            <div>
                <ul>
                    <li><strong>姓名：</strong><strong>{name}</strong></li>
                    <li><strong>城市：</strong><strong>{city}</strong></li>
                    <li><strong>性别：</strong><strong>{sex}</strong></li>
                    <li><strong>日期：</strong><strong>{newMoment}</strong></li>
                </ul>
            </div>
        );
    }
}