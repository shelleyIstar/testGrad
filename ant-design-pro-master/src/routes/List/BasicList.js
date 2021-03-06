import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({list}) => ({
  list
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'list/fetchQu'
    })
  }

  render() {
    const { list: { list, loading, quData } } = this.props;
    console.log("quData", quData)
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">待处理</RadioButton>
          <RadioButton value="waiting">已完成</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div>
          <span>提问时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
        </div>
        <div>
          <Progress percent={Math.floor(Math.random() * (100 - 1) + 1)} status="active" strokeWidth={6} />
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个问题" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周问题平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周解答问题数" value="24个问题" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="问题信息"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              // pagination={paginationProps}
              dataSource={quData.question}
              renderItem={item => (
                <List.Item
                  actions={[<a>回复</a>, <MoreBtn />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={"https://www.zumc.xin/images/logo.png"} shape="square" size="large" />}
                    title={item.questionContent}
                    description={item.questionAnswer}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
