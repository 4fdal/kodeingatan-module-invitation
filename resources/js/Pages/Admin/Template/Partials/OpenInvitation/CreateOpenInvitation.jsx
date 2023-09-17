import React from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';
import { uploadFileTemplateSetting } from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';
import HTMLTemplateFormEditor from '@kodeingatan/module/invitation/resources/js/Components/HTMLTemplateFormEditor/HTMLTemplateFormEditor';
import { useAdminLayoutContext } from '@kodeingatan/Layouts/Admin/Main';

export default function CreateOpenInvitation({
  dataWrapTemplate,
  openInvitation,
  setOpenInvitation,
  modalTitle = '',
  showModal = false,
  setShowModal = showModal => {},
  onSubmit = (values, setErrors, setShowModal) => {},
}) {
  const [form] = Form.useForm();
  const [errors, setErrors] = React.useState({});
  const {
    globalState: { _token },
  } = useAdminLayoutContext();

  React.useEffect(() => {
    form.setFieldsValue(openInvitation);
  }, [openInvitation]);

  const handleChangeHTMLTemplateFormEditor = (html, generateInputOption) => {
    // open invitation change
    let newOpenInvitation = openInvitation;
    newOpenInvitation.html = html;
    setOpenInvitation({ ...newOpenInvitation });
    // end invitation change

    // form change
    form.setFieldValue('html', html);
    form.setFieldValue('input_config', JSON.stringify(generateInputOption));
    // end form change
  };

  const handleUploadImageTemplateFormEditor = (e, setImageUrl, setLoading) => {
    uploadFileTemplateSetting({
      _token,
      file_upload: e.target.files[0],
      table: 'open_invitation_html',
    })
      .then(res => {
        const {
          data: {
            data: { file_path },
          },
        } = res;
        setImageUrl(file_path);
      })
      .finally(() => setLoading(false));
  };

  const getDataWrapTemplateOptions = () => {
    return dataWrapTemplate.map(item => ({
      id: item.id,
      name: item.name,
      upperbody: item.upperbody_html,
      lowerbody: item.lowerbody_html,
    }));
  };

  return (
    <Modal
      width={'100%'}
      title={modalTitle}
      open={showModal}
      onCancel={() => setShowModal(false)}
      onOk={() => onSubmit(form.getFieldsValue(), setErrors, setShowModal)}
    >
      <Row>
        <Col md={24}>
          <Form
            layout="vertical"
            initialValues={{ name: openInvitation.name }}
            form={form}
          >
            <Form.Item
              validateStatus={errors.name != null ? 'error' : 'success'}
              help={errors.name}
              label="Nama"
              name="name"
            >
              <Input
                placeholder="Nama"
                onChange={({ target }) => {
                  form.setFieldValue(
                    'name',
                    target.value.replace(/ /g, '-').toLowerCase()
                  );
                }}
              />
            </Form.Item>
            <Form.Item style={{ display: 'none' }} name="input_config">
              <input type="hidden" />
            </Form.Item>
            <Form.Item style={{ display: 'none' }} name="html">
              <input type="hidden" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <HTMLTemplateFormEditor
            validateStatus={errors.html != null ? 'error' : 'success'}
            help={errors.html}
            key={openInvitation.name}
            wrapTemplateOptions={getDataWrapTemplateOptions()}
            html={openInvitation.html}
            onChange={handleChangeHTMLTemplateFormEditor}
            onUploadImage={handleUploadImageTemplateFormEditor}
          />
        </Col>
      </Row>
    </Modal>
  );
}
