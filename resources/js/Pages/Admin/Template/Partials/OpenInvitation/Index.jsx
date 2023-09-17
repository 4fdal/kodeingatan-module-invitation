import { Button, Col, Modal, Row, notification } from 'antd';
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
    setSelectOpenInvitation({
      html: null,
      id: null,
      name: null,
    });
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
      .then(res => {
        const {
          data: { message },
        } = res;

        notification.open({
          type: 'success',
          message,
        });

        handleRequestBrowseDataOpenInvitation();

        setShowModal(false);
      })
      .catch(res => {
        if (res.status == 422) {
          setErrors(res.data.errors);
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

      handleRequestBrowseDataOpenInvitation();
    });
  };
  // end delete

  // update
  const handleEditOpenInvitation = openInvitation => {
    setSelectOpenInvitation(openInvitation);
    setModalCreateUpdateOption({
      title: `Edit varian template '${openInvitation.name}'`,
      show: true,
    });
  };
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
        setOpenInvitation={setSelectOpenInvitation}
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
