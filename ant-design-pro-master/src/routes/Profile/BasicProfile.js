import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [{
  title: '时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '当前进度',
  dataIndex: 'rate',
  key: 'rate',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'success' ? <Badge status="success" text="成功" /> : <Badge status="processing" text="进行中" />
  ),
}, {
  title: 'ID',
  dataIndex: 'operator',
  key: 'operator',
}, {
  title: '耗时',
  dataIndex: 'cost',
  key: 'cost',
}];

@connect(state => ({
  profile: state.profile,
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile } = this.props;
    const { basicGoods, basicProgress, basicLoading } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [{
      title: '1',
      dataIndex: 'id',
      key: 'id',
      render: (text, row, index) => {
        if (index < basicGoods.length) {
          return <a href="">{text}</a>;
        }
        return {
          children: <span style={{ fontWeight: 600 }}>总计</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    }, {
      title: '4',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    }, {
      title: '3',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    }, {
      title: '2',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: renderContent,
    }, {
      title: '1',
      dataIndex: 'num',
      key: 'num',
      align: 'right',
      render: (text, row, index) => {
        if (index < basicGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    }, {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (text, row, index) => {
        if (index < basicGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    }];
    return (
      <div>111</div>
    );
  }
}
