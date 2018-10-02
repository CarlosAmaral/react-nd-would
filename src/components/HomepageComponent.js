import React, { Component } from 'react'
import {List, Avatar} from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { getQuestionsFromServer } from "../actions/questionsActions";
import { getUsersFromServer } from "../actions/usersActions";

const TabPane = Tabs.TabPane;

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({ style }) => (
            <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#000' }} />
        )}
    </Sticky>
);

class HomepageComponent extends Component {

    componentDidMount(){
        this.props.getQuestionsFromServer();
    }
    render() {
        return (
            <div>
                <StickyContainer>
                    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                        <TabPane tab="Unanswered Questions" key="1" style={{ height: 200 }}>
                            <div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Answered Questions" key="2">Content of Tab Pane 2</TabPane>
                    </Tabs>
                </StickyContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    unansweredQuestions: Object.values(state.questions.items),
    answeredQuestions: Object.values(state.questions.items)
    //answeredQuestions: Object.values(state.questions.items),
})


const mapDispatchToProps = {
    getQuestionsFromServer,
    getUsersFromServer
    
}

HomepageComponent.propTypes = {
    getUsersFromServer: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageComponent)
