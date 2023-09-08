import {
  EyeOutlined,
  FileImageOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Modal, Row } from 'antd';
import React from 'react';
import { uploadFileTemplateSetting } from '../../Requests/TemplateSetting';

/**
 *
 *
 * @export
 * @param {{ defaultValue, name, _token, table, onChange = (uri) => {}} props
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
      uploadFileTemplateSetting({
        _token,
        file_upload: e.target.files[0],
        table: props.table,
      })
        .then(res => {
          const {
            data: {
              data: { file_path },
            },
          } = res;
          setImageUrl(file_path);
          onChange(file_path);
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
