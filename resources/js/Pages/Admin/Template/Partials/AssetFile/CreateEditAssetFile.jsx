import React from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Typography,
  notification,
} from 'antd';
import {
  FileZipOutlined,
  InboxOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { getFileBase64 } from '@/Utils/url';
import { storeInvitationTemplateSetting } from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';
import { AssetFileContext } from './Index';
import { getFileScandir } from '@kodeingatan/Requests/File';
import { getShowFileUrl } from '@kodeingatan/Utils/url';

function CreateEditAssetFile(props) {
  const [form] = Form.useForm();
  const [errors, setErrors] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [fileZip, setFileZip] = React.useState(null);

  const [assetPathFiles, setAssetPathFiles] = React.useState([]);
  const hasAssetPathFiles = () => assetPathFiles.length > 0;

  const {
    invitationTemplate,
    _token,
    setAssetFileState,
    defaultSelectAssetFile,
    loadAssetPathFiles,
  } = React.useContext(AssetFileContext);

  React.useEffect(() => {
    form.setFieldsValue(defaultSelectAssetFile);

    if (!defaultSelectAssetFile.dir_path) {
      setFileZip(false);
    } else {
      setAssetFileState({ loadAssetPathFiles: true });
    }
  }, [defaultSelectAssetFile]);

  React.useEffect(() => {
    if (defaultSelectAssetFile.dir_path && loadAssetPathFiles) {
      getFileScandir(defaultSelectAssetFile.dir_path, true)
        .then(({ data: { data } }) => {
          setAssetPathFiles(data);
        })
        .finally(() => setAssetFileState({ loadAssetPathFiles: false }));
    }
  }, [loadAssetPathFiles]);

  const handleSubmit = values => {
    values._token = _token;
    values.file_zip = fileZip;

    if (defaultSelectAssetFile.id) values.id = defaultSelectAssetFile.id;

    setErrors({});
    setLoading(true);
    storeInvitationTemplateSetting(
      {
        invitation_template_key: invitationTemplate.key,
        table: 'asset',
      },
      values
    )
      .then(({ data: { data, message } }) => {
        notification.open({
          type: 'success',
          message,
        });
        setAssetFileState({
          loadAssetHtml: true,
          showModalCreateUpdate: false,
        });
      })
      .catch(res => {
        if (res.status == 422) setErrors(res.data.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileUpload = info => {
    if (info.file.status === 'uploading') {
      setLoadingUpload(true);
      return;
    }

    if (info.file.status === 'done') {
      setLoadingUpload(false);
      getFileBase64(info.file.originFileObj, url => {
        const base64 = info?.file?.response?.data?.uri_base64 ?? url;
        const { type, name } = info?.file?.originFileObj;

        setFileZip({ type, name, base64 });
      });
      return;
    }

    if (info.file.status === 'error') {
      setLoadingUpload(false);
      return;
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
          <Col md={24}>
            <Form.Item
              required
              label="Name"
              name="name"
              validateStatus={errors.name != null ? 'error' : 'success'}
              help={errors.name}
              tooltip="Name harus berisi"
            >
              <Input
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
              label="File Zip"
              validateStatus={errors.file_zip != null ? 'error' : 'success'}
              help={errors.file_zip}
              tooltip="File zip harus berisi"
            >
              <Dragger
                action={route('admin.file.upload')}
                onChange={handleFileUpload}
                showUploadList={false}
                data={file =>
                  new Promise(resolve => {
                    resolve({
                      _token: _token,
                    });
                  })
                }
                multiple={false}
                accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                style={{ padding: 10 }}
              >
                <p className="ant-upload-drag-icon">
                  {loadingUpload ? (
                    <Spin />
                  ) : fileZip?.name ? (
                    <>
                      <FileZipOutlined /> {fileZip?.name}
                    </>
                  ) : (
                    <InboxOutlined />
                  )}
                </p>
                <p className="ant-upload-text">
                  {!hasAssetPathFiles()
                    ? 'Klik atau drag file ke area upload'
                    : 'Klik atau drag file ke area upload untuk memperbarui asset template'}
                </p>
                <p className="ant-upload-hint">
                  Hanya suport pada satu file dengan format .zip untuk di
                  upload. Pastikan file yang ada upload berupa file .zip
                </p>
                {!fileZip?.name && hasAssetPathFiles && (
                  <div
                    style={{ width: '100%', height: 350, overflowY: 'scroll' }}
                  >
                    <p>Asset file template sebelumnya : </p>
                    {assetPathFiles.map((file, index) => (
                      <Button
                        onClick={() => {
                          window.open(
                            getShowFileUrl({ file_path: file.path }),
                            '_blank'
                          );
                        }}
                        type="dashed"
                      >
                        {' '}
                        {file.name}{' '}
                      </Button>
                    ))}
                  </div>
                )}
              </Dragger>
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

CreateEditAssetFile.defaultProps = {};

export default CreateEditAssetFile;
