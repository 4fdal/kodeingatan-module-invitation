import { kirequest } from '@/Requests/Index';

export function browseInvitationTemplateSetting({
  table,
  invitation_template_key,
  id = null,
}) {
  let query = { table, invitation_template_key };
  if (id) query.id = id;

  return kirequest(
    'GET',
    route('admin.invitation.template.setting.index', query)
  );
}

export function storeInvitationTemplateSetting(
  { table, invitation_template_key, id = null },
  data
) {
  let query = { table, invitation_template_key };
  if (id) query.id = id;

  return kirequest(
    'POST',
    route('admin.invitation.template.setting.store', query),
    data
  );
}

export function showInvitationTemplateSetting(
  { table, invitation_template_key, id = null },
  data
) {
  let query = { table, invitation_template_key };
  if (id) query.id = id;

  return kirequest(
    'GET',
    route('admin.invitation.template.setting.show', query)
  );
}

export function deleteInvitationTemplateSetting(
  { table, invitation_template_key, id },
  data
) {
  let query = { table, invitation_template_key, id };
  return kirequest(
    'DELETE',
    route('admin.invitation.template.setting.delete', query),
    data
  );
}

/**
 *
 *
 * @export
 * @param {{ _token, table, file_upload }} params
 * @return {Promise<Response>}
 */
export function uploadFileTemplateSetting({ _token, table, file_upload }) {
  const formData = new FormData();
  formData.append('_token', _token);
  formData.append('table', table);
  formData.append('file_upload', file_upload, file_upload.name);

  return kirequest('POST', route('admin.invitation.asset.store'), formData, {
    'Content-Type': 'multipart/form-data',
  });
}
