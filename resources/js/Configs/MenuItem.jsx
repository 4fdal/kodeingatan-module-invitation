import { MinusOutlined, RightOutlined } from '@ant-design/icons'
import React from 'react'


export default [
    {
        key: 'admin.invitation',
        as: 'admin.invitation.',
        label: 'Invitation',
        title: 'Invitation',
        icon: <RightOutlined />,
        add_active_route: [
            'admin.invitation.template.index',
        ],
        children: [
            {
                icon: <MinusOutlined />,
                key: 'admin.invitation.template.index',
                permission: 'invitation.template.browse',
                label: 'Template',
                title: 'Template',
                as: 'admin.invitation.template.',
                add_active_route: [],
            },
        ],
    },
]

