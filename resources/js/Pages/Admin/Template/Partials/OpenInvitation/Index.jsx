import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import BrowseOpenInvitation from './BrowseOpenInvitaion';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CreateEditOpenInvitation from './CreateOpenInvitation';
import { browseInvitationTemplateSetting } from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';

const defaultOpenInvitationCtx = {
  _token: null,
  invitationTemplate: {
    id: null,
    key: null,
    slug: null,
    name: null,
  },
  loadOpenInvitation: true,

  dataWrapBody: [],

  setOpenInvitationState: state => {},

  selectOpenInvitation: {
    id: null,
    name: null,
    html: null,
  },

  showCreateUpdate: true,
  showCreateUpdateTitle: '',
};
export const OpenInvitationCtx = React.createContext(defaultOpenInvitationCtx);
export const getOpenInvitationState = ({
  invitationTemplate,
  _token,
  dataWrapBody,
}) => {
  const [assetFileState, setOpenInvitationState] = React.useState({
    ...defaultOpenInvitationCtx,
    invitationTemplate,
    _token,
  });
  return {
    ...assetFileState,
    setOpenInvitationState: state =>
      setOpenInvitationState({ ...assetFileState, ...state }),
  };
};

export default function OpenInvitation({
  invitationTemplate,
  _token,
  dataWrapBody = [],
}) {
  const wrapBodyState = getOpenInvitationState({
    invitationTemplate,
    _token,
    dataWrapBody,
  });
  const { showCreateUpdate, setOpenInvitationState, showCreateUpdateTitle } =
    wrapBodyState;

  return (
    <OpenInvitationCtx.Provider value={wrapBodyState}>
      <Modal
        width={'100%'}
        title={showCreateUpdateTitle}
        open={showCreateUpdate}
        okButtonProps={{ hidden: true }}
        onCancel={() => setOpenInvitationState({ showCreateUpdate: false })}
      >
        <CreateEditOpenInvitation />
      </Modal>

      <Row>
        <Button
          type="dashed"
          onClick={() =>
            setOpenInvitationState({
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
          <BrowseOpenInvitation />
        </Col>
      </Row>
    </OpenInvitationCtx.Provider>
  );
}
