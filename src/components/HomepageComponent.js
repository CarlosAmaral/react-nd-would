import React, { Component } from 'react'
import { List, Avatar } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import _ from "lodash";
import { StickyContainer, Sticky } from 'react-sticky';
import { getAnsweredAndUnansweredQuestions } from "../actions/questionsActions";
import { Redirect } from 'react-router-dom';

const TabPane = Tabs.TabPane;


const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({ style }) => (
            <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#000' }} />
        )}
    </Sticky>
);

class HomepageComponent extends Component {

    componentDidMount() {
        this.props.getAnsweredAndUnansweredQuestions(this.props.loggedInUser.id);
    }



    render() {

        if (_.isEmpty(this.props.loggedInUser)) {
            return <Redirect to='/' />
        }

        const { answered, unanswered } = this.props;
        return (
            <div>
                <StickyContainer>
                    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                        <TabPane tab="Unanswered Questions" key="1" style={{ height: 200 }}>
                            <div>
                                <List
                                    itemLayout="horizontal"
                                    loading={unanswered.length === 0}
                                    dataSource={unanswered}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                                title={<a>{item.author}</a>}
                                                description={item.optionOne.text}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Answered Questions" key="2">
                            <div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={answered}
                                    loading={answered.length === 0}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                                title={<a>{item.author}</a>}
                                                description={Object.values(item).find(k => k.selected === true).text}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </StickyContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    answered: Object.values(state.questions.answered),
    unanswered: Object.values(state.questions.unanswered),
    loggedInUser: state.users.loggedInUser
});


const mapDispatchToProps = {
    getAnsweredAndUnansweredQuestions
};

HomepageComponent.propTypes = {
    answered: PropTypes.array.isRequired,
    unanswered: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageComponent)
