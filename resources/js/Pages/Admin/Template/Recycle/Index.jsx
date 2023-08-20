import {
  createColumnOrderProps,
  createColumnSearchProps,
} from '@/Components/Table/KiTable';
import KiBreadcrumb, {
  addItemBreadcrumb,
} from '@/Components/Layout/KiBreadcrumb';
import { Head } from '@inertiajs/react';
import { Badge, Card } from 'antd';
import * as React from 'react';
import { useAdminLayoutContext } from '@/Layouts/Admin/Main';
import KiBrowseRecycleTable from '@/Components/CRUD/Recycle/KiBrowseRecycleTable ';
import { createColumnsWithActionRestore } from '@/Components/Table/KiTableRecycle';

const columns = as =>
  createColumnsWithActionRestore(as, [
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
      title: 'Nama Guard',
      dataIndex: 'guard_name',
      key: 'guard_name',
      ...createColumnOrderProps('guard_name'),
      ...createColumnSearchProps({
        placeholder: 'Search nama guard...',
        field: 'guard_name',
      }),
    },
    {
      title: 'Izinkan pathname',
      dataIndex: 'allow_pathname',
      key: 'allow_pathname',
      ...createColumnOrderProps('allow_pathname'),
      ...createColumnSearchProps({
        placeholder: 'Search perizinan path url...',
        field: 'allow_pathname',
      }),
    },
    {
      title: 'Izinkan methods',
      dataIndex: 'allow_methods',
      key: 'allow_methods',
      ...createColumnOrderProps('allow_methods'),
      ...createColumnSearchProps({
        placeholder: 'Search perizinan path url...',
        field: 'allow_methods',
      }),
      render: strAllowMethods => {
        const allowMethods = JSON.parse(strAllowMethods) ?? [];
        return allowMethods.map(allowMethod => (
          <Badge
            style={{ marginRight: 10 }}
            color="blue"
            key={allowMethod}
            text={allowMethod}
          />
        ));
      },
    },
  ]);

function Index(props) {
  const { globalState, setGlobalState, layoutSettings } =
    useAdminLayoutContext();
  layoutSettings({
    title: 'Recycle Browse Permission',
    breadcrumb: (
      <KiBreadcrumb
        activeLabel="Recycle"
        paths={[
          addItemBreadcrumb(route('admin.dashboard.index'), 'Dashboard'),
          addItemBreadcrumb(route('admin.permission.index'), 'Permission'),
        ]}
      />
    ),
  });

  return (
    <>
      <Head title="Recycle Permission Browse" />
      <Card>
        <KiBrowseRecycleTable
          as={props.as}
          tableTitle="Table Recycle Permission"
          columns={columns(props.as)}
          paginate={props.paginate}
        />
      </Card>
    </>
  );
}

export default Index;
