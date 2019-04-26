import React from 'react';
import styles from './index.less'

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createContent: "",
            allChecked: "",
            len: -1,
            renderList: [
                {
                    id: 1,
                    isComplete: true,
                    content: 'java'
                },
                {
                    id: 2,
                    isComplete: false,
                    content: 'c++'
                },
                {
                    id: 3,
                    isComplete: true,
                    content: 'javascript'
                }
            ]

        }
    }

    componentDidMount() {
        let newState = this.state.renderList.filter((item) => {
            if (item.isComplete) {
                return item;
            }
        })
        this.setState({
            len: newState.length
        })
    }

    //1.renderList
    renderView = () => {
        return this.state.renderList.map((item, key) => {
            return (
                <li key={key}>
                    <input type="checkbox" onChange={e => this.itemChange(e, item)} checked={item.isComplete}/>
                    <label>{item.content}</label>
                    <strong onClick={e => this.destoryItem(item)}>destory</strong>
                </li>
            )
        })
    }

    //2.addtodo
    addTodo = () => {
        let maxId = -1;
        this.state.renderList.forEach((item) => {
            if (item.id > maxId) {
                maxId = item.id;
            }
        });
        this.state.renderList.push({
            id: maxId + 1,
            isComplete: true,
            content: this.state.createContent
        });
        this.setState({createContent: ""});
    }

    //3.contentChange
    contentChange(e) {
        this.setState({
            createContent: e.target.value
        })
    }

    //4.itemChange
    itemChange = (e, item) => {
        if (e.target.checked) {
            this.state.len++
        } else {
            this.state.len--
        }

        item.isComplete = e.target.checked;

        if (this.state.len === this.state.renderList.length) {
            this.state.allChecked = true
        } else {
            this.state.allChecked = false
        }

        this.state.renderList.forEach((item) => {
            if (item.isComplete === false) {
                this.state.allChecked = false
            }
        })
        this.setState({})
    }

    //5.destoryItem
    destoryItem = (item) => {
        let newItem = this.state.renderList.findIndex((el) => {
            if (el.id === item.id) {
                return el.id;
            }
        });
        this.state.renderList.splice(newItem, 1);
        this.setState({});
    }

    //6.footerChange
    footerChange(event) {
        if (event.target.checked) {
            this.state.renderList.forEach((item) => {
                if (item.isComplete === false) {
                    item.isComplete = true;
                }
            })
            this.state.len = this.state.renderList.length;
        } else {
            this.state.renderList.forEach((item) => {
                if (item.isComplete === true) {
                    item.isComplete = false;
                }
            })
            this.state.len = 0
        }
        this.setState({
            allChecked: event.target.checked
        });
    }

    //7.allDestory
    allDestory = () => {
        let newData = this.state.renderList.filter((item) => {
            if (item.isComplete === false) {
                return item
            }
        })

        this.setState({
            renderList: newData,
            len: newData.length
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.container}>
                    <header>
                        <input type="text" value={this.state.createContent} onChange={e => this.contentChange(e)}/>
                        <button onClick={this.addTodo}>add</button>
                    </header>
                    <section>
                        <ul>{this.renderView()}</ul>
                    </section>
                    <footer>
                        <button onClick={this.allDestory}>destory</button>
                        <span>all</span>
                        <input type="checkbox" onChange={e => this.footerChange(e)} checked={this.state.allChecked}/>
                    </footer>
                </div>
            </React.Fragment>
        )
    }
}