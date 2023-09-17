import React from 'react';
import KiDataTable from '@kodeingatan/Components/Table/KiDataTable';
import { Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function BrowseOpenInvitaion({
  browseDataOpenInvitation = [],
  loadBrowseDataOpenInvitation = false,
  onEdit = row => {},
  onDelete = row => {},
}) {
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const handleDelete = row => {
    Modal.confirm({
      title: 'Peringatan hapus data!',
      content: `Yakin menghapus data asset file template '${row.name}' ?`,
      okText: 'Ya',
      cancelText: 'Tidak',
      okButtonProps: {
        loading: deleteLoading,
      },
      onOk: async () => {
        setDeleteLoading(true);
        await onDelete(row);
        setDeleteLoading(false);
      },
    });
  };

  return (
    <KiDataTable
      data={browseDataOpenInvitation}
      loading={loadBrowseDataOpenInvitation}
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
                  onClick={() => onEdit(row)}
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
