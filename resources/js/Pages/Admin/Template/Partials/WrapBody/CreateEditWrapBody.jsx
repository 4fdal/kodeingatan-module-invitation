import React from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import AceEditorHtml from '@kodeingatan/Components/Input/AceEditor/AceEditorHtml';
import { WrapBodyCtx } from './Index';
import { kirequest } from '@kodeingatan/Requests/Index';
import {
  showInvitationTemplateSetting,
  storeInvitationTemplateSetting,
} from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';

export default function CreateEditUpperbody() {
  const { invitationTemplate, setWrapBodyState, selectDataWrapBody, _token } =
    React.useContext(WrapBodyCtx);

  const [form] = Form.useForm();
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [htmlViewContent, setHtmlViewContent] = React.useState(null);
  const [wrapBodyId, setWrapBodyId] = React.useState(null);

  /** @type {{ current : HTMLIFrameElement }} */
  const elIframe = React.useRef();

  const handleSubmit = values => {
    requestCreateUpdateWrapBody().then(() =>
      setWrapBodyState({ showCreateUpdate: false })
    );
  };

  const requestCreateUpdateWrapBody = () => {
    const name = form.getFieldValue('name');
    const upperbody = wrapBodyId
      ? form.getFieldValue('upperbody')
      : `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
  ${form.getFieldValue('upperbody') ?? ''}`;
    const lowerbody = wrapBodyId
      ? form.getFieldValue('lowerbody')
      : ` </body>
</html>`;

    let dataRequest = {
      _token,
      name,
      upperbody,
      lowerbody,
    };

    if (wrapBodyId) dataRequest.id = wrapBodyId;

    return storeInvitationTemplateSetting(
      {
        invitation_template_key: invitationTemplate.key,
        table: 'wrap',
      },
      dataRequest
    )
      .then(result => {
        const {
          data: { data },
        } = result;

        if (!wrapBodyId) {
          form.setFieldValue('upperbody', upperbody);
          form.setFieldValue('lowerbody', lowerbody);
        }
        setWrapBodyId(data.id);

        return result;
      })
      .catch(err => {
        if (err.status == 422) setErrors(err.data.errors);
        throw err;
      })
      .finally(() => {
        setHtmlViewContent(`${upperbody}${lowerbody}`);
      });
  };

  const handleChangeTextEditor = key => code => {
    form.setFieldValue(key, code);
    requestCreateUpdateWrapBody();
  };

  React.useEffect(() => {
    if (selectDataWrapBody?.id) {
      const {
        id,
        lowerbody_html: lowerbody,
        upperbody_html: upperbody,
        name,
      } = selectDataWrapBody;

      setWrapBodyId(id);
      form.setFieldsValue({ lowerbody, upperbody, name });
      setHtmlViewContent(`${upperbody}${lowerbody}`);
    }
  }, [selectDataWrapBody]);

  React.useEffect(() => {
    if (elIframe?.current && wrapBodyId) {
      let iframeOutput = elIframe.current;
      iframeOutput.src = 'about:blank';
      iframeOutput.contentWindow.document.open();
      iframeOutput.contentWindow.document.write(htmlViewContent);
      iframeOutput.contentWindow.document.close();
    }
  }, [htmlViewContent]);

  return (
    <Form
      layout="vertical"
      form={form}
      style={{ padding: 10 }}
      onFinish={handleSubmit}
    >
      <Col>
        <Row gutter={10}>
          <Col md={12}>
            <Form.Item
              required
              label="Name"
              name="name"
              validateStatus={errors.name != null ? 'error' : 'success'}
              help={errors.name}
              tooltip="Name harus berisi"
            >
              <Input
                onBlur={() => requestCreateUpdateWrapBody()}
                placeholder="Name"
                onChange={e =>
                  form.setFieldValue(
                    'name',
                    e.target?.value
                      ?.toString()
                      .toLocaleLowerCase()
                      .replace(/ /g, '-')
                  )
                }
              />
            </Form.Item>
            <Form.Item
              required
              name="upperbody"
              label="Upperbody"
              validateStatus={errors.upperbody != null ? 'error' : 'success'}
              help={errors.upperbody}
              tooltip="Upperbody harus berisi"
            >
              <AceEditorHtml
                value={form.getFieldValue('upperbody')}
                onChange={handleChangeTextEditor('upperbody')}
              />
            </Form.Item>
            <Form.Item
              required
              name="lowerbody"
              label="Lowerbody"
              validateStatus={errors.lowerbody != null ? 'error' : 'success'}
              help={errors.lowerbody}
              tooltip="Lowerbody harus berisi"
            >
              <AceEditorHtml
                value={form.getFieldValue('lowerbody')}
                onChange={handleChangeTextEditor('lowerbody')}
              />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Card title="Template wrapper view">
              <iframe
                ref={elIframe}
                width="100%"
                height="400px"
                style={{ border: 'none' }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col md={24}>
            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Simpan
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Form>
  );
}
