import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, Row } from 'antd';
import CreateEditAssetFile from './CreateEditAssetFile';
import BrowseAssetFile from './BrowseAssetFile';
import { PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import ListAssetFile from './ListAssetFile';

export const defaultAssetFileContext = {
  _token: null,
  invitationTemplate: {},
  loadAssetHtml: true,
  loadAssetPathFiles: true,
  defaultSelectAssetFile: {
    name: null,
    id: null,
    dir_path: null,
  },
  setAssetFileState: state => {},
  titleModalCreateUpdate: '',
  showModalCreateUpdate: false,
};
export const AssetFileContext = React.createContext(defaultAssetFileContext);
export const getAssetFileState = ({ invitationTemplate, _token }) => {
  const [assetFileState, setAssetFileState] = React.useState({
    ...defaultAssetFileContext,
    invitationTemplate,
    _token,
  });
  return {
    ...assetFileState,
    setAssetFileState: state =>
      setAssetFileState({ ...assetFileState, ...state }),
  };
};

function AssetFile({ invitationTemplate, _token }) {
  // const [dataAssetHtml, seDataAssetHtml] = React.useState([]);
  // const [assetPathFiles, setAssetPathFiles] = React.useState([]);

  // const getFirstAssetHtml = () => dataAssetHtml[0] ? dataAssetHtml[0] : null

  // const browseDataAssetHtml = () => {
  //     if (!invitationTemplate.key) throw new Error("Template invitation key tidak ditemukan")
  //     return browseInvitationTemplateSetting({ invitation_template_key: invitationTemplate.key, table: 'asset', }).then(({ data: { data } }) => {
  //         seDataAssetHtml(data)
  //     })
  // }

  // const browseDataAssetPathFiles = () => {
  //     if (!getFirstAssetHtml().dir_path) throw new Error('Lokasi asset direktori tidak ditemukan');
  //     return getFileScandir(getFirstAssetHtml().dir_path, true).then(({ data: { data } }) => {
  //         setAssetPathFiles(data)
  //     })
  // }

  // React.useEffect(() => {
  //     (async () => {
  //         await browseDataAssetHtml()
  //         if (getFirstAssetHtml) {
  //             await browseDataAssetPathFiles()
  //         }
  //     })()
  // }, [])

  const assetFileCtx = getAssetFileState({ invitationTemplate, _token });

  return (
    <AssetFileContext.Provider value={assetFileCtx}>
      <Modal
        title={assetFileCtx.titleModalCreateUpdate}
        centered
        open={assetFileCtx.showModalCreateUpdate}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() =>
          assetFileCtx.setAssetFileState({ showModalCreateUpdate: false })
        }
      >
        <CreateEditAssetFile />
      </Modal>
      <Row gutter={10}>
        <Col md={24}>
          <Button
            onClick={() => {
              assetFileCtx.setAssetFileState({
                defaultSelectAssetFile: {
                  name: null,
                  id: null,
                  dir_path: null,
                },
                titleModalCreateUpdate: 'Tambahkan asset baru pada template',
                showModalCreateUpdate: true,
              });
            }}
            type="dashed"
            style={{ marginBottom: 10 }}
            icon={<PlusCircleOutlined />}
          >
            Tambah
          </Button>
          <BrowseAssetFile />
        </Col>
      </Row>
    </AssetFileContext.Provider>
  );
}

AssetFile.propTypes = {};

AssetFile.defaultProps = {};

export default AssetFile;

// function AssetFile(props) {
//     return
// }

// AssetFile.propTypes = {
//     _token: PropTypes.string.isRequired,
//     initialValues: PropTypes.object,
//     onSubmit: PropTypes.func,
// };

// AssetFile.defaultProps = {
//     initialValues: {},
//     onSubmit: (values, setErrors) => { },
// };

// export default AssetFile;
