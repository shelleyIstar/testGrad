import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './CardList.less';

@connect(state => ({
  list: state.list,
}))
export default class CardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const { list: { list, loading } } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          小程序项目：小程序主要提供以下项目服务，且注册便捷。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 数据信息
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 项目信息
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="小程序项目"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} actions={[<a>上线</a>, <a>下线</a>]}>
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src={"https://www.zumc.xin/images/logo.png"} />}
                    title={<a href="#">{item.title}</a>}
                    description={(
                      <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                    )}
                  />
                </Card>
              </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增产品
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
