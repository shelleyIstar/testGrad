import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Divider } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link } from 'dva/router'
import queryString from 'query-string'
import styles from './TableList.less';
import moment from 'moment';
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  rule: state.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue1: '',
    addInputValue2: '',
    addInputValue3: '',
    addInputValue4: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    paginationStatue: true
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    console.log("pagination", pagination)
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    var current = pagination.current== 1 ? 0: pagination.current-1

    const params = {
      start: current * pagination.pageSize,
      count: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
        paginationStatue: false
      });

      dispatch({
        type: 'rule/search',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAddInput1 = (e) => {
    this.setState({
      addInputValue1: e.target.value,
    });
  }

  handleAddInput2 = (e) => {
    this.setState({
      addInputValue2: e.target.value,
    });
  }
  handleAddInput3 = (e) => {
    this.setState({
      addInputValue3: e.target.value,
    });
  }
  handleAddInput4 = (e) => {
    this.setState({
      addInputValue4: e.target.value,
    });
  }

  handleAdd = () => {
    // this.props.dispatch({
    //   type: 'rule/add',
    //   payload: {
    //     description: this.state.addInputValue1,
    //   },
    // });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="学生学号">
              {getFieldDecorator('stuId')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学生专业">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">数字媒体技术</Option>
                  <Option value="1">网络工程</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  delete =(id) => {

  }

  render() {
    const { rule: { loading: ruleLoading, data } } = this.props;
    const { selectedRows, modalVisible, addInputValue1,addInputValue2, addInputValue3, addInputValue4, paginationStatue } = this.state;

    const columns = [
      {
        title: '学号',
        dataIndex: 'stuId',
        width: '12%',
        render: (text, record) => {
          return <Link to={{
            pathname: '/profile/advanced',search: queryString.stringify({ stuId: record.stuId})
          }} 
          // target="_blank"
           >{record.stuId}</Link>;
        },
      },
      {
        title: '姓名',
        dataIndex: 'stuName',
        width: '10%',
      },
      {
        title: '性别',
        dataIndex: 'stuSex',
        width: '5%'
      },
      {
        title: '家庭地址',
        dataIndex: 'stuAddress',
        width: '15%',
      },
      {
        title: '班级',
        dataIndex: 'className',
        width: '10%',
      },
      {
        title: '专业',
        dataIndex: 'majorName',
        width: '10%',

      },
      {
        title: '学院',
        dataIndex: 'schoolName',
        width: '10%',
      },
      {
        title: '注册时间',
        dataIndex: 'updatedAt',
        sorter: true,
        width: '15%',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <Link to={{
            pathname: '/profile/advanced',search: queryString.stringify({ stuId: record.stuId})
          }} >修改
          </Link>
          </div>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="学生信息">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            {
              data && data.result == 1 ?
                <StandardTable
                  loading={ruleLoading}
                  dataSource={data}
                  columns={columns}
                  onChange={this.handleStandardTableChange}
                  pagination={paginationStatue}
                /> : <div>暂无数据</div>
            }
          </div>
        </Card>
        <Modal
          title="新建规则"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="学号"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput1} value={addInputValue1} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="姓名"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput2} value={addInputValue2} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="班级"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput3} value={addInputValue3} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="专业"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput4} value={addInputValue4} />
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
