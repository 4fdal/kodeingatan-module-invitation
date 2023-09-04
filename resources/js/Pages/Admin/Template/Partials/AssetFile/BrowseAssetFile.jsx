import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Checkbox, Modal, Row, notification } from 'antd';
import { AssetFileContext } from './Index';
import {
  browseInvitationTemplateSetting,
  deleteInvitationTemplateSetting,
} from '@kodeingatan/module/invitation/resources/js/Requests/TemplateSetting';
import KiDataTable from '@kodeingatan/Components/Table/KiDataTable';
import { v4 } from 'uuid';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import { Link } from '@inertiajs/react';
import { getFileUrl } from '@kodeingatan/Utils/url';

function BrowseAssetFile(props) {
  const {
    _token,
    loadAssetHtml,
    invitationTemplate,
    setAssetFileState,
    defaultSelectAssetFile,
  } = React.useContext(AssetFileContext);
  const [assetFiles, setAssetFiles] = React.useState([]);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    browseInvitationTemplateSetting({
      invitation_template_key: invitationTemplate.key,
      table: 'asset',
    }).then(({ data: { data: dataAssetFile } }) => {
      let assetFileState = { loadAssetHtml: false };

      setAssetFiles(dataAssetFile);
      setAssetFileState(assetFileState);
    });
  }, [loadAssetHtml]);

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
            table: 'asset',
            invitation_template_key: invitationTemplate.key,
            id: row.id,
          },
          {
            _token,
          }
        )
          .then(
            ({
              data: {
                data: { message },
              },
            }) => {
              notification.open({
                type: 'success',
                message,
              });
            }
          )
          .catch(
            ({
              data: {
                data: { message },
              },
            }) => {
              notification.open({
                type: 'error',
                message,
              });
            }
          )
          .finally(() => {
            setAssetFileState({
              defaultSelectAssetFile: {
                id: null,
                name: null,
                dir_path: null,
              },
              loadAssetHtml: true,
            });
            setDeleteLoading(false);
          });
      },
    });
  };

  return (
    <KiDataTable
      data={assetFiles}
      columns={[
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Nama',
        },
        {
          key: 'dir_path',
          dataIndex: 'dir_path',
          title: 'Asset Url',
          render: (dir_path, row) => {
            getFileUrl;

            return (
              <Link
                onClick={e => {
                  e.preventDefault();
                  console.log(e.target.href);
                }}
                target="_blank"
              >
                {dir_path}
              </Link>
            );
          },
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
                    setAssetFileState({
                      defaultSelectAssetFile: row,
                      showModalCreateUpdate: true,
                      titleModalCreateUpdate: 'Edit asset file template',
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

BrowseAssetFile.propTypes = {};

BrowseAssetFile.defaultProps = {};

export default BrowseAssetFile;
