import React from "react";
import { Form, Button, Switch, Menu, message } from "antd";
const { useForm } = Form;

const tailLayout = {
  wrapperCol: { offset: 5, span: 14 },
};

const key = "MESSAGE";

const ViewSettings = ({ closeViewSettings, updateViewConfig, viewConfig }) => {
  const [form] = useForm();
  const initialValues = {
    ...viewConfig,
  };

  const openMessage = () => {
    message.loading({ content: "Updating...", key });
    setTimeout(() => {
      message.success({ content: "View updated!", key, duration: 2 });
    }, 500);
  };

  const onCancel = () => {
    closeViewSettings();
  };

  const onFinish = (values) => {
    console.log(values);
    updateViewConfig({ ...values });
  };

  return (
    <Menu>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={initialValues}
        form={form}
      >
        <Form.Item
          name="showLatestData"
          label="Daily Update"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="show" unCheckedChildren="hide" />
        </Form.Item>
        <Form.Item
          name="showTotalCases"
          label="Total Cases"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="show" unCheckedChildren="hide" />
        </Form.Item>
        <Form.Item
          name="showTotalDeath"
          label="Total Death"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="show" unCheckedChildren="hide" />
        </Form.Item>
        <Form.Item
          name="showVaccinationProgress"
          label="Vaccination Progress"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="show" unCheckedChildren="hide" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={openMessage}>
            Save
          </Button>
          <Button type="link" htmlType="button" onClick={onCancel}>
            Close
          </Button>
        </Form.Item>
      </Form>
    </Menu>
  );
};

export default ViewSettings;
