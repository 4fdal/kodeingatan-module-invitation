import React from 'react'
import PropTypes from 'prop-types'
import { AssetFileContext } from './AssetFile';

function ListAssetFile(props) {
    const {
        invitationTemplate,
        listAssetFile,
        set: setAssetFileContext
    } = React.useContext(AssetFileContext)

    // console.log("logs", assetFileContext)
    React.useEffect(() => {
        fetch(route('admin.invitation.template.setting.index', {
            invitation_template_key: invitationTemplate.key,
            table: 'asset',
        }), {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) return response.json()
            throw response
        }).then(data => {

            console.log('logs', data)

        }).then(error => {

        })
    })
}

ListAssetFile.propTypes = {
    initialValues: PropTypes.object,
};

ListAssetFile.defaultProps = {
    initialValues: {},
};

export default ListAssetFile;