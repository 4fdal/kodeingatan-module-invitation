import {
  EyeOutlined,
  FileImageOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { uploadFile } from '@kodeingatan/Requests/File';
import { Button, Card, Col, Modal, Row } from 'antd';
import React from 'react';

/**
 *
 *
 * @export
 * @param {{ defaultValue, name, _token }} props
 * @return {*}
 */
export default function InputImage(props) {
  const { defaultValue, name, _token } = props;
  const [imageUrl, setImageUrl] = React.useState(defaultValue ?? null);
  const [loading, setLoading] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [elInputFile, setElInputFile] = React.useState(
    (() => {
      let inputFile = document.createElement('input');
      inputFile.type = 'file';
      inputFile.accept = 'image/*';
      inputFile.name = name;

      return inputFile;
    })()
  );

  const handleClickUpload = () => {
    elInputFile.click();
    elInputFile.onchange = e => {
      setLoading(true);
      uploadFile({ _token, file: e.target.files[0] })
        .then(res => {
          const {
            data: {
              data: { uri_base64 },
            },
          } = res;

          setImageUrl(uri_base64);
        })
        .catch(res => {})
        .finally(() => setLoading(false));
    };
  };

  return (
    <React.Fragment>
      <Modal
        title="File Gambar"
        open={showImage}
        cancelText="Oke"
        okButtonProps={{ hidden: true }}
        onCancel={() => setShowImage(false)}
      >
        <img src={imageUrl} />
      </Modal>
      <Row gutter={10}>
        <Col>
          <Button
            onClick={handleClickUpload}
            type="dashed"
            loading={loading}
            icon={<PlusOutlined />}
          >
            Upload Gambar
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={loading ? <LoadingOutlined /> : <EyeOutlined />}
            onClick={() => setShowImage(true)}
          ></Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
