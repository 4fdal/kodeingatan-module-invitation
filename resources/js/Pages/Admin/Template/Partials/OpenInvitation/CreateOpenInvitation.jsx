import React from 'react';
import { SaveOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Progress,
  Row,
  Select,
  Spin,
} from 'antd';
import AceEditorHtml from '@kodeingatan/Components/Input/AceEditor/AceEditorHtml';
import { OpenInvitationCtx } from './Index';
import { kirequest } from '@kodeingatan/Requests/Index';
import {
  browseInvitationTemplateSetting,
  showInvitationTemplateSetting,
  storeInvitationTemplateSetting,
} from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';
import { textToInputObject } from '@kodeingatan/module/invitation/resources/js/Requests/Generate';
import InputConfigGenerate from '@kodeingatan/module/invitation/resources/js/Components/Input/InputConfigGenerate';

export default function CreateOpenInvitation() {
  const {
    invitationTemplate,
    setOpenInvitationState,
    selectDataOpenInvitation,
    _token,
  } = React.useContext(OpenInvitationCtx);

  const [form] = Form.useForm();
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [openInvitationId, setOpenInvitationId] = React.useState(null);

  const [dataWrapTemplate, setDataWrapTemplate] = React.useState([]);
  const [wrapTemplate, setWrapTemplate] = React.useState({
    id: null,
    name: null,
    html: null,
  });
  React.useEffect(() => {
    browseInvitationTemplateSetting({
      table: 'wrap',
      invitation_template_key: invitationTemplate.key,
    }).then(({ data: { data } }) => {
      setDataWrapTemplate(data);
      if (data.length > 0) {
        setWrapTemplate(data[0]);
      }
    });
  }, []);

  /** @type {{ current : HTMLIFrameElement }} */
  const elIframe = React.useRef();

  const handleSubmit = values => {
    requestCreateUpdateOpenInvitation().then(() =>
      setOpenInvitationState({ showCreateUpdate: false })
    );
  };

  React.useEffect(() => {
    if (selectDataOpenInvitation?.id) {
      const { id, html, name, input_config } = selectDataOpenInvitation;
      setOpenInvitationId(id);
      form.setFieldsValue({ html, name, input_config });
    }
  }, [selectDataOpenInvitation]);

  const requestCreateUpdateOpenInvitation = () => {
    const name = form.getFieldValue('name');
    const html = form.getFieldValue('html');

    let dataRequest = {
      _token,
      name,
      html,
    };

    if (openInvitationId) dataRequest.id = openInvitationId;

    setErrors({});
    return (async () => {
      var input_config = null;
      try {
        var {
          data: { data: input_config },
        } = await textToInputObject({ _token, text: html });

        dataRequest.input_config = JSON.stringify(input_config);
        form.setFieldValue('input_config', input_config);
      } catch (error) {}

      try {
        var {
          data: { data },
        } = await storeInvitationTemplateSetting(
          {
            invitation_template_key: invitationTemplate.key,
            table: 'open_invitation',
          },
          dataRequest
        );

        setOpenInvitationId(data.id);
      } catch (error) {
        if (err.status == 422) setErrors(err.data.errors);
        throw err;
      } finally {
        elIframe?.current?.contentWindow.location.reload();
      }
    })();
  };

  const handleChangeTextEditor = key => code => {
    form.setFieldValue(key, code);
    requestCreateUpdateOpenInvitation();
  };

  const getInputConfig = () => {
    const inputConfig = form.getFieldValue('input_config');

    if (typeof inputConfig == 'string') {
      return JSON.parse(inputConfig ?? '{}');
    } else if (typeof inputConfig == 'object') {
      return inputConfig;
    } else {
      return {};
    }
  };

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
                onBlur={() => requestCreateUpdateOpenInvitation()}
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
              name="html"
              label="Html"
              validateStatus={errors.html != null ? 'error' : 'success'}
              help={errors.html}
              tooltip="Html harus berisi"
            >
              <AceEditorHtml
                value={form.getFieldValue('html')}
                onChange={handleChangeTextEditor('html')}
              />
            </Form.Item>
            <Form.Item>
              <InputConfigGenerate
                _token={_token}
                config={getInputConfig()}
                table={'open_invitation'}
                onChange={config => {
                  // form.setFieldValue('input_config', { ...config });

                  form.setFieldValue('html', 'hello world');
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item label="Pilih Wrapper Template ">
              {wrapTemplate.id ? (
                <Select
                  defaultValue={wrapTemplate.id}
                  style={{ width: '100%' }}
                  onChange={id => {
                    const wrapTemplate = dataWrapTemplate.find(
                      row => row.id == id
                    );
                    if (wrapTemplate) setWrapTemplate(wrapTemplate);
                  }}
                  options={dataWrapTemplate.map(wrapTemplate => {
                    const { id: value, name: label } = wrapTemplate;
                    return {
                      value,
                      label,
                    };
                  })}
                />
              ) : (
                <Spin />
              )}
            </Form.Item>
            <Form.Item name="input_config">
              <Card title="Open invitation view">
                {wrapTemplate.id && openInvitationId && (
                  <iframe
                    ref={elIframe}
                    src={route('admin.invitation.template.setting.show', {
                      invitation_template_key: invitationTemplate.key,
                      table: 'open_invitation',
                      wrap_id: wrapTemplate.id,
                      id: openInvitationId,
                    })}
                    onLoad={e => {
                      e.target.style.height =
                        e.target.contentWindow.document.documentElement
                          .scrollHeight + 'px';
                    }}
                    width="100%"
                    height="400px"
                    style={{ border: 'none' }}
                  />
                )}
              </Card>
            </Form.Item>
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
