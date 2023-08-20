import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

export const FormCreateEdit = props => {
  const { _token, initialValues, onSubmit } = props;
  const [form] = Form.useForm();
  const [errors, setErrors] = React.useState({});


  const handleSubmit = values => {
    values._token = _token;
    onSubmit(values, setErrors);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={props.initialValues}
      onFinish={handleSubmit}
    >
      <Col>
        <Row gutter={10}>
          <Col md={24}>
            <Form.Item
              required
              label="Slug"
              name="slug"
              validateStatus={errors.slug != null ? 'error' : 'success'}
              help={errors.slug}
              tooltip="Slug harus berisi"
            >
              <Input placeholder="Slug" onChange={e => form.setFieldValue('slug', e.target?.value?.toString().toLocaleLowerCase().replace(/ /g, "-"))} />
            </Form.Item>
            <Form.Item
              required
              label="Nama"
              name="name"
              validateStatus={errors.name != null ? 'error' : 'success'}
              help={errors.name}
              tooltip="Nama harus berisi"
            >
              <Input placeholder="Nama" onChange={e => {
                form.setFieldValue('slug', e.target?.value?.toString().toLocaleLowerCase().replace(/ /g, "-"))
              }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Button htmlType="submit" icon={<SaveOutlined />}>
              Simpan
            </Button>
          </Form.Item>
        </Row>
      </Col>
    </Form>
  );
};

FormCreateEdit.propTypes = {
  _token: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

FormCreateEdit.defaultProps = {
  initialValues: {},
  onSubmit: (values, setErrors) => { },
};

export default FormCreateEdit;
