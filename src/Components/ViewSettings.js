import React from "react";
import { Form, Button, Switch, message } from "antd";
import styled from "styled-components";
const { useForm } = Form;

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
    <ViewSettingsContainer>
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 10 }}
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
          name="showTotalDeaths"
          label="Total Deaths"
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
        <Form.Item wrapperCol={{ offset: 3 }}>
          <Button type="primary" htmlType="submit" onClick={openMessage}>
            Save
          </Button>
          <Button type="link" htmlType="button" onClick={onCancel}>
            Close
          </Button>
        </Form.Item>
      </Form>
    </ViewSettingsContainer>
  );
};

export default ViewSettings;

const ViewSettingsContainer = styled.div`
  padding: 1rem;
  background-color: #f0f0f0;
`;
