import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, Tag } from 'antd';
import { PlusOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { IdentityRoleDto } from './data';
import { queryRoles } from './service';



const Role: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<IdentityRoleDto>[] = [
    {
      title: '操作',
      render: () =>
        <Dropdown
          overlay={
            <Menu
              selectedKeys={[]}
            >
              <Menu.Item key="edit">编辑</Menu.Item>
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
      title: '角色名',
      dataIndex: 'name',
      render: (_, record) => <>{record.name}{record.isDefault ? <Tag style={{ borderRadius: 10, marginLeft: '.25rem' }} color="#108ee9">默认</Tag> : null}
        {record.isPublic ? <Tag style={{ borderRadius: 10, marginLeft: '.25rem'  }} color="#17a2b8">公开</Tag> : null}</>
    },
  ]
  return (
    <PageHeaderWrapper>
      <ProTable<IdentityRoleDto>
        headerTitle="用户信息"
        actionRef={actionRef}
        search={false}
        rowKey="id"
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} type="primary" >
            新建
    </Button>
        ]}
        request={async (params = {}) => {
          const response = await queryRoles({ skipCount: params.current! - 1, maxResultCount: params.pageSize });
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
    </PageHeaderWrapper>
  );
}
export default Role;
