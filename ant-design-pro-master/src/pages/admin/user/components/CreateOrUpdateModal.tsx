
import React from "react";
import FormItem from "antd/lib/form/FormItem";
import { Modal, Input, Form, Tabs, Checkbox } from "antd";
import { IdentityUserCreateOrUpdateDto } from "../data";

const { TabPane } = Tabs;
interface CreateOrUpdateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: any) => void;
  onCancel: () => void;
  formValues?: IdentityUserCreateOrUpdateDto;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const CreateOrUpdateForm: React.FC<CreateOrUpdateFormProps> = props => {

  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel, formValues } = props;
  const okHandle = () => {
    form.validateFields().then(values => {
      handleAdd(values);
    }).catch(err => {
      console.log(err);
    })
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      destroyOnClose
      onOk={okHandle}
      onCancel={() => onCancel()}
    >

      <Tabs>
        <TabPane tab='用户' key='User'>
          <Form
            name="validate_other"
            {...layout}
            initialValues={formValues}
          >
            <FormItem  {...layout} name="userName" label="用户名">
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem  {...layout} name="name" label="名称">
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem  {...layout} name="sureName" label="完整名称">
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem  {...layout} name="password" label="密码">
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem  {...layout} name="email" label="邮箱">
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem  {...layout} name="phoneNumber" label="手机号">
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem  {...layout} label="" valuePropName="checked" name="lockoutEnabled">
              <Checkbox >登录失败后锁定帐户</Checkbox>
            </FormItem>
            <FormItem label="" {...layout} valuePropName="checked" name="twoFactorEnabled" >
              <Checkbox >双重身份认证</Checkbox>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane tab='角色' key='Role'>
          123
        </TabPane>
      </Tabs>

    </Modal>
  );
}

export default CreateOrUpdateForm;
