import KiShowRecycleDetailList from '@/Components/CRUD/Recycle/KiShowRecycleDetailList';
import KiBreadcrumb, {
  addItemBreadcrumb,
} from '@/Components/Layout/KiBreadcrumb';
import { useAdminLayoutContext } from '@/Layouts/Admin/Main';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Head, router } from '@inertiajs/react';
import {
  Badge,
  Button,
  Card,
  Divider,
  List,
  Modal,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';

const KiButtonRestoreModal = ({ onRestore }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleOkModalConformed = close => {
    setIsLoading(true);

    const finish = () => {
      setIsLoading(false);
      setIsOpenModal(false);
    };
    if (onRestore) onRestore(finish);
  };

  return (
    <Tooltip title="Restore data">
      <Button onClick={() => setIsOpenModal(true)} icon={<FieldTimeOutlined />}>
        Restore
      </Button>
      <Modal
        title="Peringatan restore"
        cancelText="Tidak"
        okText="Iya"
        closable={true}
        onOk={handleOkModalConformed}
        onCancel={() => setIsOpenModal(false)}
        confirmLoading={isLoading}
        open={isOpenModal}
        zIndex={99}
      >
        <Typography.Text>
          Apakah anda yakin untuk mengembalikan data yang telah dihapus ?
        </Typography.Text>
      </Modal>
    </Tooltip>
  );
};

const KiDetailData = ({ data }) => {
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
};

function Read(props) {
  const { data } = props;

  const { globalState, setGlobalState, layoutSettings } =
    useAdminLayoutContext();
  layoutSettings({
    title: 'Recycle Detail Permission',
    breadcrumb: (
      <KiBreadcrumb
        activeLabel={data.name}
        paths={[
          addItemBreadcrumb(route('admin.dashboard.index'), 'Dashboard'),
          addItemBreadcrumb(route(`admin.${props.as}index`), 'Permission'),
          addItemBreadcrumb(route(`admin.${props.as}index.recycle`), 'Recycle'),
        ]}
      />
    ),
  });

  const handleRestore = finish => {
    router.post(
      route(`admin.${props.as}restore`, data.key),
      {},
      {
        onFinish: finish,
      }
    );
  };

  return (
    <>
      <Head title="Recycle Detail Permission" />
      <Card>
        <KiShowRecycleDetailList
          as={props.as}
          dataKey={data.key}
          showTitle="Recycle Detail Permission"
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
