import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, Form, Input, Row, Spin, notification } from 'antd';
import { FileZipOutlined, InboxOutlined, SaveOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { AssetFileContext } from './AssetFile';
import { getFileBase64 } from '@/Utils/url';
import { router } from '@inertiajs/react';

function CreateEditAssetFile(props) {
    const { _token, invitationTemplate, set: setAssetFileContext } = React.useContext(AssetFileContext)
    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState({});

    const [loading, setLoading] = React.useState(false)

    const [loadingUpload, setLoadingUpload] = React.useState(false)
    const [fileZip, setFileZip] = React.useState(props.initialValues.file_zip ?? undefined)

    const handleSubmit = values => {
        values._token = _token;
        values.file_zip = fileZip

        setErrors({})
        setLoading(true)
        fetch(route('admin.invitation.template.setting.store', {
            table: 'asset',
            invitation_template_key: invitationTemplate.key
        }), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(async res => {
            try {

                const data = await res.json()



                switch (res.status) {
                    case 200: {


                        const { dir_path, name, id } = data.data
                        setAssetFileContext({
                            assetHtml: { dir_path, name, id }
                        })

                        break;

                    }

                    case 422: {

                        notification.open({
                            type: 'error',
                            message: data.message,
                            description: Object.keys(data.errors).map(key => <>*{data.errors[key].toString()}<br /></ >)
                        })

                        setErrors(data.errors)

                        break;
                    }
                }
            } catch (error) {
                throw error
            }
        }).catch(err => {
            notification.open({
                type: 'error',
                message: err.message,
            })
        }).finally(() => setLoading(false))
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
                const { type, name } = info?.file?.originFileObj

                setFileZip({ type, name, base64 })

            });
            return;
        }

        if (info.file.status === 'error') {
            setLoadingUpload(false);
            return;
        }
    }


    return (
        <Card>
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
                                label="Name"
                                name="name"
                                validateStatus={errors.name != null ? 'error' : 'success'}
                                help={errors.name}
                                tooltip="Name harus berisi"
                            >
                                <Input placeholder="Name" onChange={e => form.setFieldValue('name', e.target?.value?.toString().toLocaleLowerCase().replace(/ /g, "-"))} />
                            </Form.Item>
                            <Form.Item
                                required
                                label="File Zip"
                                validateStatus={errors.file_zip != null ? 'error' : 'success'}
                                help={errors.file_zip}
                                tooltip="File zip harus berisi"
                            >
                                <Dragger action={route('admin.file.upload')} onChange={handleFileUpload} showUploadList={false} data={file =>
                                    new Promise(resolve => {
                                        resolve({
                                            _token: _token,
                                        });
                                    })
                                } multiple={false} accept='zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed' >
                                    <p className="ant-upload-drag-icon">
                                        {loadingUpload
                                            ? <Spin />
                                            : (fileZip?.name ? <><FileZipOutlined /> {fileZip?.name}</> : <InboxOutlined />)}
                                    </p>
                                    <p className="ant-upload-text">Klik atau drag file ke area upload</p>
                                    <p className="ant-upload-hint">
                                        Hanya suport pada satu file dengan format .zip untuk di upload. Pastikan file yang ada upload berupa file .zip
                                    </p>
                                </Dragger>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col md={24}>
                            <Form.Item>
                                <Button loading={loading} htmlType="submit" icon={<SaveOutlined />}>
                                    Simpan
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Form>
        </Card>
    );
}

CreateEditAssetFile.propTypes = {
    initialValues: PropTypes.object,
};

CreateEditAssetFile.defaultProps = {
    initialValues: {},
};

export default CreateEditAssetFile;

