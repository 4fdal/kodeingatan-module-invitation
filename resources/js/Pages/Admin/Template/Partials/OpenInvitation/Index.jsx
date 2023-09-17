import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import BrowseOpenInvitation from './BrowseOpenInvitaion';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CreateEditOpenInvitation from './CreateOpenInvitation';
import {
  browseInvitationTemplateSetting,
  deleteInvitationTemplateSetting,
  storeInvitationTemplateSetting,
} from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';

export default function OpenInvitation({
  invitationTemplate,
  _token,
  dataWrapTemplate = [],
}) {
  // initial variables
  const [selectOpenInvitation, setSelectOpenInvitation] = React.useState({
    id: null,
    name: null,
    html: null,
  });
  const [modalCreateUpdateOption, setModalCreateUpdateOption] = React.useState({
    show: false,
    title: 'Tambahkan variasi template buka undangan',
  });
  // end initial variables

  // browse data open invitation
  const [browseDataOpenInvitation, setDataBrowseOpenInvitation] =
    React.useState([]);
  const [loadBrowseDataOpenInvitation, setLoadDataBrowseOpenInvitation] =
    React.useState(false);
  const handleRequestBrowseDataOpenInvitation = () => {
    setLoadDataBrowseOpenInvitation(true);
    browseInvitationTemplateSetting({
      table: 'open_invitation',
      invitation_template_key: invitationTemplate.key,
    })
      .then(({ data: { data } }) => setDataBrowseOpenInvitation(data))
      .finally(() => setLoadDataBrowseOpenInvitation(false));
  };
  React.useEffect(() => {
    handleRequestBrowseDataOpenInvitation();
  }, []);
  // end browse data

  // handle all event
  // create
  const handleCreateOpenInvitation = () => {
    setModalCreateUpdateOption({
      title: 'Tambahkan varian baru template open invitation',
      show: true,
    });
  };
  const handleCreateUpdateOpenInvitationSubmit = (
    values,
    setErrors,
    setShowModal
  ) => {
    let urlParams = {
      table: 'open_invitation',
      invitation_template_key: invitationTemplate.key,
    };

    if (selectOpenInvitation.id) urlParams.id = selectOpenInvitation.id;

    storeInvitationTemplateSetting(urlParams, {
      _token,
      ...values,
    })
      .then(response => {
        console.log(response.status);
        setShowModal(false);
      })
      .catch(response => {
        if (response.status == 422) {
          setErrors(response.data.errors);
        }
      });
  };
  // end create

  // delete
  const handleDeleteOpenInvitation = openInvitation => {
    deleteInvitationTemplateSetting(
      {
        table: 'open_invitation',
        invitation_template_key: invitationTemplate.key,
        id: openInvitation.id,
      },
      {
        _token,
      }
    ).then(result => {
      const {
        data: { message },
      } = result;
      notification.open({
        type: 'success',
        message,
      });
    });
  };
  // end delete

  // update
  const handleEditOpenInvitation = openInvitation => {};
  // end update
  // end all event

  return (
    <React.Fragment>
      <CreateEditOpenInvitation
        dataWrapTemplate={dataWrapTemplate}
        openInvitation={selectOpenInvitation}
        modalTitle={modalCreateUpdateOption.title}
        setShowModal={show =>
          setModalCreateUpdateOption({ ...modalCreateUpdateOption, show })
        }
        onSubmit={handleCreateUpdateOpenInvitationSubmit}
        showModal={modalCreateUpdateOption.show}
      />

      <Row>
        <Button
          type="dashed"
          onClick={handleCreateOpenInvitation}
          icon={<PlusCircleOutlined />}
        >
          Tambah
        </Button>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col md={24}>
          <BrowseOpenInvitation
            browseDataOpenInvitation={browseDataOpenInvitation}
            loadBrowseDataOpenInvitation={loadBrowseDataOpenInvitation}
            onDelete={handleDeleteOpenInvitation}
            onEdit={handleEditOpenInvitation}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
