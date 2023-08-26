import React from 'react'
import PropTypes from 'prop-types'
import { AssetFileContext } from './AssetFile'
// import { browseInvitationTemplateSetting } from '@invitation/Requests/TemplateSetting'

function BrowseAssetFile(props) {

    const { invitationTemplate } = React.useContext(AssetFileContext)

    React.useEffect(() => {
        // browseInvitationTemplateSetting({ invitation_template_key: invitationTemplate.key, table: 'asset', }).then(res => {
        //     console.log(res)
        // })

        // browseInvitationTemplateSetting
    })

    return
}

BrowseAssetFile.propTypes = {
};

BrowseAssetFile.defaultProps = {
};

export default BrowseAssetFile;