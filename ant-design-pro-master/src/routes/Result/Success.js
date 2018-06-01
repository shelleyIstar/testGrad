import React from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from '../../components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Step } = Steps;

const desc1 = (
  <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)', position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      <Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
    </div>
    <div><a href=""></a></div>
  </div>
);

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500', marginBottom: 20 }}>
    </div>
    <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
      
    </Steps>
  </div>
);

const actions = (
  <div>
  </div>
);

export default () => (
  <PageHeaderLayout>
   
  </PageHeaderLayout>
);
