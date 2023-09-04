import KiBreadcrumb, {
  addItemBreadcrumb,
} from '@/Components/Layout/KiBreadcrumb';
import KiHeadContent from '@/Components/Layout/KiHeadContent';
import { Head, router } from '@inertiajs/react';
import { Card, Divider } from 'antd';
import * as React from 'react';
import FormCreateEdit from './Partials/FormCreateEdit';
import { useAdminLayoutContext } from '@/Layouts/Admin/Main';
import AssetFile from './Partials/AssetFile/Index';
import WrapBody from './Partials/WrapBody/Index';
import OpenInvitation from './Partials/OpenInvitation/Index';

function Edit(props) {
  const [dataWrapBody, setDataWrapBody] = React.useState([]);

  const { _token, data } = props;

  const { globalState, setGlobalState, layoutSettings } =
    useAdminLayoutContext();
  layoutSettings({
    title: 'Edit Invitation Template',
    breadcrumb: (
      <KiBreadcrumb
        activeLabel="Edit"
        paths={[
          addItemBreadcrumb(route('admin.dashboard.index'), 'Dashboard'),
          addItemBreadcrumb(
            route(`admin.${props.as}index`),
            'Invitation Template'
          ),
          addItemBreadcrumb(
            route(`admin.${props.as}show`, data.key),
            data.name
          ),
        ]}
      />
    ),
  });

  const handleSubmit = (values, setErrors) => {
    router.post(route(`admin.${props.as}update`, data.key), values, {
      onError: setErrors,
    });
  };

  return (
    <>
      <Head title="Edit Invitation Template" />
      <Card>
        <KiHeadContent title="Edit Invitation Template" />
        <Divider />
        <FormCreateEdit
          _token={_token}
          initialValues={data}
          onSubmit={handleSubmit}
        />
      </Card>

      <Card>
        <KiHeadContent title="Asset Files" />
        <Divider />
        <AssetFile invitationTemplate={data} _token={_token} />
        {/* input html |
        form input | output iframe
        ----------------------------------------
        table */}
      </Card>

      <Card>
        <KiHeadContent title="Wrapper Body Template" />
        <Divider />
        <WrapBody
          onChange={setDataWrapBody}
          invitationTemplate={data}
          _token={_token}
        />
      </Card>

      <Card>
        <KiHeadContent title="Open Invitation" />
        <Divider />
        <OpenInvitation invitationTemplate={data} _token={_token} />
      </Card>

      <Card>
        <KiHeadContent title="First Person" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="First Person Social Media Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Second Person" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Second Person Social Media Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Save Event" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Event" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Event Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Our Stroy" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Our Stroy Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Special Invitation" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Moment" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Moment Photo Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Moment Video Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Live Streaming" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Live Streaming Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Testimonial Best Friend" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Testimonial Best Friend Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Send Gift" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Send Gift Bank Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Send Gift Address Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Send Greeting" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Health Protocol" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Health Protocol Item" />
        <Divider />
      </Card>

      <Card>
        <KiHeadContent title="Footer" />
        <Divider />
      </Card>
    </>
  );
}

export default Edit;
