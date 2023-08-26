import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd';
import CreateEditAssetFile from './CreateEditAssetFile';
import ListAssetFile from './ListAssetFile';
import BrowseAssetFile from './BrowseAssetFile';


const defaultContextState = {
    _token: null,
    assetHtml: {
        dir_path: null,
        name: null,
    },
    invitationTemplate: {},
    set: (state) => { }
}

export const AssetFileContext = React.createContext(defaultContextState);

function AssetFile({ invitationTemplate, _token }) {

    const [assetContextState, setAssetContextState] = useState(defaultContextState)

    return <AssetFileContext.Provider value={{ ...assetContextState, invitationTemplate, _token, set: (state) => setAssetContextState({ ...assetContextState, ...state }) }}>
        <Row gutter={10} >
            <Col md={12}>
                <CreateEditAssetFile />
            </Col>
            <Col md={12} >
                <ListAssetFile />
            </Col>
            <Col md={24}>
                <BrowseAssetFile />
            </Col>
        </Row>
    </AssetFileContext.Provider>
}

AssetFile.propTypes = {
};

AssetFile.defaultProps = {
};

export default AssetFile;


// function AssetFile(props) {
//     return
// }

// AssetFile.propTypes = {
//     _token: PropTypes.string.isRequired,
//     initialValues: PropTypes.object,
//     onSubmit: PropTypes.func,
// };

// AssetFile.defaultProps = {
//     initialValues: {},
//     onSubmit: (values, setErrors) => { },
// };

// export default AssetFile;
