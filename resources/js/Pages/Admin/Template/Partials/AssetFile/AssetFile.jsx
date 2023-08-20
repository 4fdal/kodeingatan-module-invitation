import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd';
import CreateEditAssetFile from './CreateEditAssetFile';
import ListAssetFile from './ListAssetFile';
import BrowseAssetFile from './BrowseAssetFile';


const defaultContextState = {
    _token: null,
    listAssetFile: {
        loading: false,
        data: null,
    },
    invitationTemplate: {},
    set: (state) => { }
}

export const AssetFileContext = React.createContext(defaultContextState);

function AssetFile({ invitationTemplate, _token }) {


    const [assetContextState, setAssetContextState] = useState(defaultContextState)

    return <AssetFileContext.Provider value={{ ...assetContextState, invitationTemplate, _token, set: setAssetContextState }}>
        <Row gutter={4} >
            <Col md={12}>
                <CreateEditAssetFile />
            </Col>
            <Col md={12}>
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
