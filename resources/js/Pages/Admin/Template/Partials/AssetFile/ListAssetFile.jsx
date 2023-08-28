import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Divider, List, Row, notification } from 'antd';
import { Link } from '@inertiajs/react';
import { getFileScandir } from '@/Requests/File';
import { FileOutlined } from '@ant-design/icons';
import { getShowFileUrl } from '@kodeingatan/Utils/url';
import { AssetFileContext } from './AssetFile';

function ItemFile({ file }) {
  const handleClick = () => {
    const urlFile = getShowFileUrl({
      file_path: file.path,
      mime_type: 'application/text',
    });
    window.open(urlFile, '_blank');
  };

  return (
    <Button
      icon={<FileOutlined />}
      onClick={handleClick}
      type="dashed"
      style={{ margin: 5 }}
    >
      {file.name}
    </Button>
  );
}

function ListAssetFile() {
  const [assetPathFiles, setAssetPathFiles] = React.useState([]);

  const { defaultSelectAssetFile, setAssetFileState } =
    React.useContext(AssetFileContext);

  React.useEffect(() => {
    if (defaultSelectAssetFile.dir_path) {
      getFileScandir(defaultSelectAssetFile.dir_path, true).then(
        ({ data: { data: assetPathFiles } }) => {
          setAssetPathFiles(assetPathFiles);
        }
      );
    }
  }, [defaultSelectAssetFile]);

  return (
    <div style={{ overflowY: 'scroll', height: 350 }}>
      <Row>
        {assetPathFiles.map((file, index) => (
          <ItemFile file={file} key={index} />
        ))}
      </Row>
    </div>
  );
}

ListAssetFile.propTypes = {
  initialValues: PropTypes.object,
};

ListAssetFile.defaultProps = {
  initialValues: {},
};

export default ListAssetFile;
