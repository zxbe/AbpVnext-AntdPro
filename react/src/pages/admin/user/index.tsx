
import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { IdentityUserDto, IdentityUserCreateOrUpdateDto } from './data';
import CreateOrUpdateForm from './components/CreateOrUpdateModal';
import { queryUsers } from './service';

interface UserProps {
  dispatch: Dispatch;
  createOrUpdateUser?: IdentityUserCreateOrUpdateDto
}

const User: React.FC<UserProps> = ({ dispatch, createOrUpdateUser }) => {

  const [createOrUpdateModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  /**
   * 新增用户
   * @param id
   */
  const handleAdd = async () => {
    await dispatch({
      type: 'user/saveEditUser',
      payload: {}
    })
    handleModalVisible(true)
  };

  /**
   * 编辑用户
   * @param id 用户id
   */
  const handleEdit = async (id: string) => {
    await dispatch({
      type: 'user/getUser',
      payload: id
    })
    handleModalVisible(true)
  };
  const columns: ProColumns<IdentityUserDto>[] = [
    {
      title: '操作',
      render: (_, record) =>
        <Dropdown
          overlay={
            <Menu
              selectedKeys={[]}
            >
              <Menu.Item onClick={() => { handleEdit(record.id) }} key="edit">编辑</Menu.Item>
              <Menu.Item key="approval">权限</Menu.Item>
              <Menu.Item key="remove">删除</Menu.Item>
            </Menu>
          }
        >
          <Button type="primary">
            <SettingOutlined /> 操作 <DownOutlined />
          </Button>
        </Dropdown>

    },
    {
      title: '用户名',
      dataIndex: 'name',
    }, {
      title: '邮箱地址',
      dataIndex: 'email',
    }, {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
  ]
  return (
    <PageHeaderWrapper>
      <ProTable<IdentityUserDto>
        headerTitle="用户信息"
        actionRef={actionRef}
        search={false}
        rowKey="id"
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} onClick={() => handleAdd()} type="primary" >
            新建
        </Button>
        ]}
        request={async (params = {}) => {
          const response = await queryUsers({ skipCount: params.current! - 1, maxResultCount: params.pageSize });
          const data = response.items;
          return {
            data,
            page: params.current,
            success: true,
            total: data.totalCount,
          }
        }}
        columns={columns}
      />
      <CreateOrUpdateForm
        formValues={createOrUpdateUser}
        onSubmit={async () => {

        }}
        modalVisible={createOrUpdateModalVisible}
        onCancel={async () => handleModalVisible(false)}
      />
    </PageHeaderWrapper>

  )
}

export default connect(({ user }: ConnectState) => ({
  createOrUpdateUser: user.createOrUpdateUser,
}))(User);
