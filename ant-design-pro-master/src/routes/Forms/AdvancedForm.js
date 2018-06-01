import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';
import TableForm from './TableForm';
import styles from './style.less';
import queryString from 'query-string'

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  
};

const tableData = [];

@connect(state => ({
  rule: state.stuData,
}))
class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    const { dispatch, location } = this.props
    const { id } = queryString.parse(location.search)
    dispatch({
      type: 'rule/fetchStu',
      payload: id
    });
  }
 
 
  render() {
   
    return (
     <div></div>
    );
  }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
  submitting: state.form.advancedFormSubmitting,
}))(Form.create()(AdvancedForm));
