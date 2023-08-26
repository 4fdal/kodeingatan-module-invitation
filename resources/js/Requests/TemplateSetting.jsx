import { kirequest } from "@/Requests/Index"

export function browseInvitationTemplateSetting({ table, invitation_template_key, id = null }) {
    let query = { table, invitation_template_key }
    if (id) query.id = id

    return kirequest('GET', route('admin.invitation.template.setting.index', query))
}