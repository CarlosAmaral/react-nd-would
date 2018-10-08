import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class ResultsQuestionComponent extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <Card title={`${selectedQuestion.author} asks`}
                    bordered={false} style={{ width: 500 }}>
                    <h3>Would you Rather</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('answer', {
                                rules: [{
                                    required: true,
                                    message: 'Please select an answer',
                                }],
                            })(
                                <RadioGroup>
                                    <Radio value="optionOne">
                                        {selectedQuestion.optionOne.text}
                                    </Radio>
                                    <Radio value="optionTwo">
                                        {selectedQuestion.optionTwo.text}
                                    </Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <Button htmlType="submit" className="text-uppercase">
                            Submit
                        </Button>
                    </Form>
                </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsQuestionComponent)
