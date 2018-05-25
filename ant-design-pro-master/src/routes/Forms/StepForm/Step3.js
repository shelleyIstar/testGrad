import React from 'react';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

export default ({ dispatch, data }) => {
  const onFinish = () => {
    dispatch(routerRedux.push('/form/step-form'));
  };
  const information = (
    <div className={styles.information}>
      <Row>
        <Col span={8} className={styles.label}>文章发布方：</Col>
        <Col span={16}>{data.payAccount}</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.label}>文章标题：</Col>
        <Col span={16}>{data.receiverAccount}</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.label}>文章摘要：</Col>
        <Col span={16}>{data.receiverName}</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.label}>文章详情：</Col>
        <Col span={16}><span className={styles.money}>{data.amount}</span></Col>
      </Row>
    </div>
  );
  const actions = (
    <div>
      <Button type="primary" onClick={onFinish}>
        再发一篇
      </Button>
      <Button>
        查看文章
      </Button>
    </div>
  );
  return (
    <Result
      type="success"
      title="操作成功"
      description="预计两小时内发布到小程序"
      extra={information}
      actions={actions}
      className={styles.result}
    />
  );
};
