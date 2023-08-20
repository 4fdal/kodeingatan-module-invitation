import KiShowDetailList from '@/Components/CRUD/KiShowDetailList';
import KiBreadcrumb, {
  addItemBreadcrumb,
} from '@/Components/Layout/KiBreadcrumb';
import { useAdminLayoutContext } from '@/Layouts/Admin/Main';
import { Head } from '@inertiajs/react';
import { Badge, Card, List } from 'antd';
import React from 'react';

function KiDetailData({ data }) {
  return (
    <List
      dataSource={data}
      renderItem={(item, index) => {
        return (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        );
      }}
    />
  );
}

function Read(props) {
  const { data } = props;

  const { globalState, setGlobalState, layoutSettings } =
    useAdminLayoutContext();
  layoutSettings({
    title: 'Detail Permission',
    breadcrumb: (
      <KiBreadcrumb
        activeLabel={data.name}
        paths={[
          addItemBreadcrumb(route('admin.dashboard.index'), 'Dashboard'),
          addItemBreadcrumb(route(`admin.${props.as}index`), 'Permission'),
        ]}
      />
    ),
  });

  return (
    <>
      <Head title="Detail Permission" />
      <Card>
        <KiShowDetailList
          as={props.as}
          dataKey={data.key}
          showTitle="Detail Permission"
          data={[
            {
              title: 'Nama',
              description: data.name,
            },
            {
              title: 'Nama guard',
              description: data.guard_name,
            },
            {
              title: 'Izin url pathname',
              description: data.allow_pathname,
            },
            {
              title: 'Izin url method',
              description: (JSON.parse(data.allow_methods) ?? []).map(
                allowMethod => (
                  <Badge
                    style={{ marginRight: 10 }}
                    color="blue"
                    key={allowMethod}
                    text={allowMethod}
                  />
                )
              ),
            },
            {
              title: 'Created At',
              description: new Date(data.created_at).toLocaleString(),
            },
            {
              title: 'Updated At',
              description: new Date(data.updated_at).toLocaleString(),
            },
          ]}
        />
      </Card>
    </>
  );
}

export default Read;
