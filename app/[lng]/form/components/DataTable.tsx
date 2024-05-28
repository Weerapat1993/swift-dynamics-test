'use client'
import React, { useState } from 'react';
import { Button, Table, Popconfirm, message, Row, Col, Tooltip, Flex } from 'antd';
import type { PopconfirmProps, TableColumnsType } from 'antd';
import { useTranslation } from '../../../i18n/client';
import { useEmployeeList } from '../hooks/useEmployeeList';
import { DeleteOutlined } from '@ant-design/icons';
import CreateEmployeeModalForm from './CreateEmployeeModalForm';
import UpdateEmployeeModalFormById from './UpdateEmployeeModalFormById';

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  telephone: string;
}

type Params = {
  lng: 'en' | 'th'
}

type Props = {
  params: Params,
}

const DataTable = (props: Props) => {
  const { params } = props
  const { lng } = params
  const { list, keys, ids, deleteEmployeeByListId } = useEmployeeList()
  const { t } = useTranslation(lng, 'form')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const getGenderName = (char: string) => {
    switch(char) {
      case 'M':
        return t('form.radio.male')
      case 'F':
        return t('form.radio.female')
      default:
        return t('form.radio.unspecified')
    }
  }

  const data = list.map((item) => ({
    key: item.id,
    name: `${item.firstname} ${item.lastname}`,
    gender: getGenderName(item.gender),
    telephone: item.telephone
  }))

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name - b.name,
    },
    {
      title: 'Gender',
      key: 'gender',
      dataIndex: 'gender',
      sorter: (a: any, b: any) => a.gender - b.gender,
    },
    {
      title: 'Telephone',
      key: 'telephone',
      dataIndex: 'telephone',
      sorter: (a: any, b: any) => a.name - b.name,
    },
    {
      title: 'Action',
      key: 'action',
      width: '120px',
      render: (_, item) => (
        <Flex wrap gap="small">
          {/* <Tooltip title={t('form.btn.edit')}>
            <Button shape="circle" icon={<EditOutlined />} />
          </Tooltip> */}
          <UpdateEmployeeModalFormById params={params} id={item.key} />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirmByRow(item.key)}
            onCancel={() => null}
            okText={t('form.btn.yes')}
            cancelText={t('form.btn.no')}
          >
            <Tooltip title={t('form.btn.delete')}>
              <Button shape="circle" type='primary' danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const deleteCompleted = (keys: number[]) => {
    setLoading(true)
    setTimeout(() => {
      deleteEmployeeByListId(keys)
      message.success('Confirm delete employee!');
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    deleteCompleted(selectedRowKeys)
  };

  const confirmByRow = (id: number) => {
    deleteCompleted([id])
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Cancel delete employee!');
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <pre>{JSON.stringify(ids, null, '  ')}</pre>
      <pre>{JSON.stringify(keys, null, '  ')}</pre>
      <div style={{ marginBottom: 16 }}>
        <Row>
          <Col span={12}>
            {hasSelected ? (
              <>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText={t('form.btn.yes')}
                  cancelText={t('form.btn.no')}
                >
                  <Button type="primary" danger icon={<DeleteOutlined />} disabled={!hasSelected} loading={loading}>
                    {t('form.btn.delete')}
                  </Button>
                </Popconfirm>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
              </>
            ) : null}
          </Col>
          <Col span={12}>
            <CreateEmployeeModalForm params={params} />
          </Col>
        </Row>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default DataTable;