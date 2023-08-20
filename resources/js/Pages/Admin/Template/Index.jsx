import KiBrowseTable from '@/Components/CRUD/KiBrowseTable';
import {
  KiButtonDeleteModal,
  createColumnOrderProps,
  createColumnSearchProps,
  createColumns,
} from '@/Components/Table/KiTable';
import KiBreadcrumb, {
  addItemBreadcrumb,
} from '@/Components/Layout/KiBreadcrumb';
import { Head, Link, router } from '@inertiajs/react';
import { Badge, Button, Card, Col, Row, Tooltip } from 'antd';
import * as React from 'react';
import { useAdminLayoutContext } from '@/Layouts/Admin/Main';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';

const columns = (as, columns = []) =>
  createColumns(as, [
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      ...createColumnOrderProps('slug'),
      ...createColumnSearchProps({
        placeholder: 'Search slug...',
        field: 'slug',
      }),
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      ...createColumnOrderProps('name'),
      ...createColumnSearchProps({
        placeholder: 'Search nama...',
        field: 'name',
      }),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      ...createColumnOrderProps('created_at'),
      render: createdAt => new Date(createdAt).toLocaleString(),
    },
    ...columns
  ], false);

function Index(props) {

  const { isAllowPermission } = useAdminLayoutContext();

  const isAllowCreate = isAllowPermission([`${props.as}create`]);
  const isAllowUpdate = isAllowPermission([`${props.as}update`]);
  const isAllowShow = isAllowPermission([`${props.as}show`]);
  const isAllowStoreImport = isAllowPermission([`${props.as}store_import`]);
  const isAllowBrowseRecycle = isAllowPermission([`${props.as}browse_recycle`]);
  const isAllowSoftDelete = isAllowPermission([`${props.as}soft_delete`]);
  const isAllowBulkSoftDelete = isAllowPermission([`${props.as}bulk_soft_delete`]);

  const { globalState, setGlobalState, layoutSettings } =
    useAdminLayoutContext();
  layoutSettings({
    title: 'Browse Invitation Template',
    breadcrumb: (
      <KiBreadcrumb
        activeLabel="Invitation Template"
        paths={[addItemBreadcrumb(route('admin.dashboard.index'), 'Dashboard')]}
      />
    ),
  });


  return (
    <>
      <Head title="Browse Invitation Template" />
      <Card>
        <KiBrowseTable
          as={props.as}
          tableTitle="Tabel Invitation Template"
          columns={columns(props.as, [
            {
              id: '_actions',
              title: 'Aksi',
              dataIndex: 'key',
              render: (key, row) => <Row gutter={5}>
                {isAllowUpdate && (
                  <Col>
                    <Tooltip title="Edit">
                      <Link href={route(`admin.${props.as}edit`, key)}>
                        <Button
                          shape="circle"
                          type="primary"
                          style={{ backgroundColor: blue[6] }}
                          icon={<EditOutlined />}
                        />
                      </Link>
                    </Tooltip>
                  </Col>
                )}
                {isAllowShow && (
                  <Col>
                    <Tooltip title="Detail">
                      <Link href={route(`admin.${props.as}show`, key)}>
                        <Button
                          shape="circle"
                          type="primary"
                          style={{ backgroundColor: blue[4] }}
                          icon={<EyeOutlined />}
                        />
                      </Link>
                    </Tooltip>
                  </Col>
                )}
                {isAllowSoftDelete && (
                  <Col>
                    <Tooltip title="Delete">
                      <KiButtonDeleteModal
                        onDelete={finish =>
                          router.delete(route(`admin.${props.as}delete`, row.key), {
                            onFinish: finish,
                          })
                        }
                      />
                    </Tooltip>
                  </Col>
                )}
              </Row>,
            }
          ])}
          paginate={props.paginate}
        />
      </Card>
    </>
  );
}

export default Index;
