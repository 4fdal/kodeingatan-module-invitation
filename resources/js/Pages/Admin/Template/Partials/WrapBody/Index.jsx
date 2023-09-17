import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import BrowseWrapBody from './BrowseWrapBody';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CreateEditWrapBody from './CreateEditWrapBody';
import { browseInvitationTemplateSetting } from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';

const defaultWrapBodyCtx = {
  _token: null,
  invitationTemplate: {
    id: null,
    key: null,
    slug: null,
    name: null,
  },
  loadDataWrapBody: true,

  dataAssetFile: [],
  defaultSelectAssetFile: {
    id: null,
    name: null,
    dir_path: null,
  },

  setWrapBodyState: state => {},

  selectDataWrapBody: {
    id: null,
    name: null,
    upperbody_html: null,
    lowerbody_html: null,
  },

  showCreateUpdate: false,
  showCreateUpdateTitle: '',
};
export const WrapBodyCtx = React.createContext(defaultWrapBodyCtx);
export const getWrapBodyState = ({ invitationTemplate, _token }) => {
  const [assetFileState, setWrapBodyState] = React.useState({
    ...defaultWrapBodyCtx,
    invitationTemplate,
    _token,
  });
  return {
    ...assetFileState,
    setWrapBodyState: state =>
      setWrapBodyState({ ...assetFileState, ...state }),
  };
};

export default function WrapBody({
  invitationTemplate,
  _token,
  setDataWrapTemplate,
}) {
  const wrapBodyState = getWrapBodyState({ invitationTemplate, _token });
  const {
    showCreateUpdate,
    setWrapBodyState,
    showCreateUpdateTitle,
    dataWrapBody,
  } = wrapBodyState;

  return (
    <WrapBodyCtx.Provider value={wrapBodyState}>
      <Modal
        width={'100%'}
        title={showCreateUpdateTitle}
        open={showCreateUpdate}
        okButtonProps={{ hidden: true }}
        onCancel={() => setWrapBodyState({ showCreateUpdate: false })}
      >
        <CreateEditWrapBody />
      </Modal>

      <Row>
        <Button
          type="dashed"
          onClick={() =>
            setWrapBodyState({
              showCreateUpdate: true,
              showCreateUpdateTitle: 'Buat kerangka baru template undangan',
            })
          }
          icon={<PlusCircleOutlined />}
        >
          Tambah
        </Button>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col md={24}>
          <BrowseWrapBody setDataWrapTemplate={setDataWrapTemplate} />
        </Col>
      </Row>
    </WrapBodyCtx.Provider>
  );
}
