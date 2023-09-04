import React from 'react';
import { WrapBodyCtx } from './Index';
import {
  browseInvitationTemplateSetting,
  deleteInvitationTemplateSetting,
} from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';
import KiDataTable from '@kodeingatan/Components/Table/KiDataTable';
import { Button, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function BrowseUpperbody({ onChange }) {
  const { loadDataWrapBody, invitationTemplate, setWrapBodyState, _token } =
    React.useContext(WrapBodyCtx);
  const [dataBrowse, setDataBrowse] = React.useState([]);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    // if (loadDataWrapBody) {
    browseInvitationTemplateSetting({
      table: 'wrap',
      invitation_template_key: invitationTemplate.key,
    })
      .then(({ data: { data } }) => {
        setDataBrowse(data);
        onChange(data);
      })
      .finally(() => setWrapBodyState({ loadDataWrapBody: false }));
    // }
  }, [loadDataWrapBody]);

  const handleDelete = row => {
    Modal.confirm({
      title: 'Peringatan hapus data!',
      content: `Yakin menghapus data asset file template '${row.name}' ?`,
      okText: 'Ya',
      cancelText: 'Tidak',
      okButtonProps: {
        loading: deleteLoading,
      },
      onOk: () => {
        setDeleteLoading(true);
        deleteInvitationTemplateSetting(
          {
            table: 'wrap',
            invitation_template_key: invitationTemplate.key,
            id: row.id,
          },
          {
            _token,
          }
        )
          .then(result => {
            const {
              data: { message },
            } = result;
            notification.open({
              type: 'success',
              message,
            });
          })
          .finally(() => {
            setWrapBodyState({ loadDataWrapBody: true });
            setDeleteLoading(false);
          });
      },
    });
  };

  return (
    <KiDataTable
      data={dataBrowse}
      columns={[
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Nama',
        },
        {
          width: '10%',
          key: 'id',
          dataIndex: 'id',
          title: 'Aksi',
          showOrder: false,
          showSearch: false,
          render: (id, row) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => {
                    setWrapBodyState({
                      selectDataWrapBody: row,
                      showCreateUpdate: true,
                      showCreateUpdateTitle: 'Edit kerangka template undangan',
                    });
                  }}
                  style={{ marginRight: 5 }}
                  size="small"
                  icon={<EditOutlined />}
                />
                <Button
                  type="primary"
                  size="small"
                  danger
                  onClick={() => handleDelete(row)}
                  icon={<DeleteOutlined />}
                />
              </div>
            );
          },
        },
      ]}
    />
  );
}
