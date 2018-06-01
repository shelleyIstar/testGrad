import React from 'react';
import { Form, Input, Button, Select, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

export default ({ formItemLayout, form, dispatch, data }) => {
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/saveStepFormData',
          payload: values,
        });
        dispatch(routerRedux.push('/form/step-form/confirm'));
      }
    });
  };
  return (
    <div>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item
          {...formItemLayout}
          label="文章发布方"
        >
          {getFieldDecorator('payAccount', {
            initialValue: data.payAccount || '浙传迎新官方发布',
            rules: [{ required: true, message: '请选择发布用户' }],
          })(
            <Select placeholder="">
              <Option value="浙传迎新官方发布">浙传迎新官方发布</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="文章标题"
        >
          <Input.Group compact>
            {getFieldDecorator('receiverAccount', {
              initialValue: data.receiverAccount || '',
              rules: [
                { required: true, message: '请输入文章标题' },
                // { type: 'email', message: '请输入文章摘要' },
              ],
            })(
              <Input style={{ width: 'calc(100% - 100px)' }} placeholder="" />
            )}
          </Input.Group>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="文章摘要"
        >
          {getFieldDecorator('receiverName', {
            initialValue: data.receiverName || '这是一段摘要信息',
            rules: [{ required: true, message: '请输入文章摘要' }],
          })(
            <Input placeholder="请输入文章摘要" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="文章内容"
        >
          {getFieldDecorator('amount', {
            initialValue: data.amount || '',
            rules: [
              // { required: true, message: '请输入文章内容' },
              // { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入文章内容' },
            ],
          })(
            <Input style={{height:80}} placeholder="请输入文章内容" />
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>文章发布详情说明</h4>
        <p>管理员可根据迎新情况，发布相关的报到文章说明，帮助学生了解报到流程，提前熟悉校园生活！</p>
        {/* <h4>转账到银行卡</h4> */}
        {/* <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p> */}
      </div>
    </div>
  );
};
