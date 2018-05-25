import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Tag, Alert, Form, Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider, message } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './AdvancedProfile.less';
import queryString from 'query-string'

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

@connect(state => {
  console.log(state)
  return state
})
@connect(({ rule }) => {
  rule
})


@Form.create()
export default class AdvancedProfile extends Component {

  state = {
    stuId: null,
    current: 0,
    flag: false,
    over: null
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    console.log("location", location)

    var text = location.search
    var equal = text.indexOf("=")
    var id = text.substring(equal + 1, text.length)
    this.setState({ stuId: id })
    const data = {
      student: JSON.stringify({
        stuId: id
      })
    }

    this.getData(data)
  }

  getData = (data) => {
    console.log("getData", data)
    const { dispatch } = this.props
    dispatch({
      type: 'rule/fetchStu',
      payload: data
    });

  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  submit = (id) => {
    const { stuId } = this.state
    console.log("id", stuId)
    const { dispatch } = this.props
    var data = {
      freshman: JSON.stringify({
        stuId: parseInt(stuId),
        isCharge: "1",
        isBuyInsurance: "1",
        isRentAirConditioner: "1",
        isGreenChannel: "0"
      })
    }
    console.log("dd", data)
    dispatch({
      type: 'rule/update',
      payload: data
    });
    message.success('自助报到成功！')
    this.setState({ flag: true, over: '已完成' })
  }

  render() {
    const { rule: { stuData } } = this.props;
    const { stuId, flag,over } = this.state
    var stuItemData = stuData && stuData[0]
    console.log("dddddd", stuId)
    const { current } = this.state;
    const steps = [{
      title: '学费缴纳',
      content: '请确认银行缴费信息',
    }, {
      title: '绿色通道',
      content: '请确认绿色通道信息',
    }, {
      title: '购买保险',
      content: '请确认保险信息',
    },
    {
      title: '租赁空调',
      content: '请确认租赁信息',
    }];

    const data = [{
      isCharge: '已缴纳',
      isGreenChannel: '不需要',
      isBuyInsurance: '已购保',
      isRentAirConditioner: '已租赁'
    }]

    const columns = [{
      title: '缴纳学费',
      dataIndex: 'isCharge',
      key: 'isCharge',
      render: (text, record) => {
        return <Tag >{record.isCharge}</Tag>
      }
    }, {
      title: '绿色通道',
      dataIndex: 'isGreenChannel',
      key: 'isGreenChannel',
      render: (text, record) => {
        return <Tag >{record.isGreenChannel}</Tag>
      }
    }, {
      title: '购买保险',
      dataIndex: 'isBuyInsurance',
      key: 'isBuyInsurance',
      render: (text, record) => {
        return <Tag >{record.isBuyInsurance}</Tag>
      }
    }, {
      title: '租赁空调',
      dataIndex: 'isRentAirConditioner',
      key: 'isRentAirConditioner',
      render: (text, record) => {
        return <Tag >{record.isRentAirConditioner}</Tag>
      }
    }]

    return (<div>
      <Card
        title="学生详情"
      >
        {
          stuData.length !== 0 && stuData &&
          <div>
            <Row gutter={16} style={{ marginBottom: 20 }}>
              <Col span={6}>
                姓名：{stuItemData.stuName}
              </Col>
              <Col span={6}>
                性别：{stuItemData.stuSex}
              </Col>
              <Col span={6}>
                学号：{stuItemData.stuId}
              </Col>
              <Col span={6}>
                身份证号：{stuItemData.stuIdNum}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                校区：{stuItemData.campusName}
              </Col>
              <Col span={6}>
                学院：{stuItemData.schoolName}
              </Col>
              <Col span={6}>
                专业：{stuItemData.majorName}
              </Col>
              <Col span={6}>
                班级：{stuItemData.className}
              </Col>
            </Row>
          </div>
        }</Card>
      <Card
        title={<div>自助报到流程进度 {
          over ? <Tag color="#13c2c2">{over}</Tag>: null
        }</div>}
        style={{ marginTop: 30 }}
      >
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div>
          {
            !flag && <div className="steps-content" style={{ marginTop: 10 }}>{steps[this.state.current].content}</div>
          }
          {
            this.state.current == 0 && stuData.length !== 0 && stuData && !flag &&
            <Alert
              message="银行缴费信息"
              description={`${stuItemData.stuName}同学已与2018-08-29日通过中国建设银行已缴纳学费1000元`}
              type="success"
              showIcon
              style={{ marginTop: 20, marginBottom: 20 }}
            />
          }
          {
            this.state.current == 1 && stuData.length !== 0 && stuData && !flag &&
            <Alert
              message="绿色通道助学信息"
              description={`${stuItemData.stuName}同学不走绿色助学通道`}
              type="success"
              showIcon
              style={{ marginTop: 20, marginBottom: 20 }}
            />
          }
          {
            this.state.current == 2 && stuData.length !== 0 && stuData && !flag &&
            <Alert
              message="购买保险信息"
              description={`${stuItemData.stuName}同学已于当日通过人工通道购买了校园保险`}
              type="success"
              showIcon
              style={{ marginTop: 20, marginBottom: 20 }}
            />
          }
          {
            this.state.current == 3 && stuData.length !== 0 && stuData && !flag &&
            <Alert
              message="租赁信息"
              description={`${stuItemData.stuName}同学已在寝室管理员处办理了空调租赁手续`}
              type="success"
              showIcon
              style={{ marginTop: 20, marginBottom: 20 }}
            />
          }
          {
            flag && <Table
              style={{ marginTop: 20 }}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          }
        </div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()} style={{ float: 'right', marginLeft: 10 }}>下一步</Button>
          }
          {
            !flag && this.state.current === steps.length - 1 && stuData.length !== 0 && stuData &&
            <Button type="primary" onClick={(id) => this.submit(stuData.stuId)} style={{ float: 'right' }}>提交</Button>
          }
          {
            this.state.current != 3 && this.state.current != 0
            &&
            <Button style={{ paddingRight: 20 }} onClick={() => this.prev()} style={{ float: 'right' }}>
              上一步
            </Button>
          }
        </div>
      </Card>

    </div>);
  }
}
