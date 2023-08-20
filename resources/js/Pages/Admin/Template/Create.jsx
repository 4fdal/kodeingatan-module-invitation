import KiBreadcrumb, {
  addItemBreadcrumb,
} from '@/Components/Layout/KiBreadcrumb';
import KiHeadContent from '@/Components/Layout/KiHeadContent';
import { Head, router } from '@inertiajs/react';
import { Card, Divider } from 'antd';
import * as React from 'react';
import FormCreateEdit from './Partials/FormCreateEdit';
import { useAdminLayoutContext } from '@/Layouts/Admin/Main';

function Create(props) {
  const { _token } = props;

  const { globalState, setGlobalState, layoutSettings } =
    useAdminLayoutContext();
  layoutSettings({
    title: 'Invitation Template',
    breadcrumb: (
      <KiBreadcrumb
        activeLabel="Create"
        paths={[
          addItemBreadcrumb(route('admin.dashboard.index'), 'Dashboard'),
          addItemBreadcrumb(route(`admin.${props.as}index`), 'Permission'),
        ]}
      />
    ),
  });

  const handleSubmit = (values, setErrors) => {
    router.post(route(`admin.${props.as}store`), values, {
      onError: setErrors,
    });
  };

  return (
    <>
      <Head title="Invitation Template" />
      <Card>
        <KiHeadContent title="Invitation Template Baru" />
        <Divider />
        <FormCreateEdit
          _token={_token}
          onSubmit={handleSubmit}
        />
      </Card>
    </>
  );
}

export default Create;
