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
