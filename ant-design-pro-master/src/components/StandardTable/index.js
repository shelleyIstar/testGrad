import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { Link } from 'dva/router'
import queryString from 'query-string'

const statusMap = ['error', 'success'];
class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0,
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { dataSource, loading, columns, pagination } = this.props;
    var paginationProps = true
    if(pagination){
      paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        ...dataSource.page,
      };
    }else {
      paginationProps = false
    }

    return (
      <div>
        {
          dataSource.result == 1 ?
            <Table
              loading={loading}
              dataSource={dataSource.students}
              columns={columns}
              pagination={paginationProps}
              onChange={this.handleTableChange}
            /> : null
        }
      </div>
    );
  }
}

export default StandardTable;
