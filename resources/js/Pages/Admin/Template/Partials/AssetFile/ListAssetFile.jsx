import React from 'react'
import PropTypes from 'prop-types'
import { AssetFileContext } from './AssetFile';
import { Card, List, notification } from 'antd';
import { Link } from '@inertiajs/react';
import { getFileScandir } from '@/Requests/File';


function ItemFile({ file }) {
    return <List.Item>
        <Link href={route('admin.file.show', {
            base64: btoa(JSON.stringify({
                mime_type: 'application/text',
                file_path: file,
            })),

        })} >
            {file}
        </Link>
    </List.Item>
}

function ListAssetFile(props) {

    const [loading, setLoading] = React.useState(false)
    const [files, setFiles] = React.useState([])

    const {
        assetHtml,
        set: setAssetFileContext
    } = React.useContext(AssetFileContext)

    React.useEffect(() => {

        setLoading(true)
        if (assetHtml.dir_path) {
            getFileScandir(assetHtml.dir_path, true).then(res => {

            })
        } else {
            {/* setAssetFileContext({
                assetHtml : {
                    dir_path : 
                }
            }) */}


        }
    }, [assetHtml]);

    return <Card title="Asset Files" >
        {files.map((file, index) => <ItemFile file={file} key={index} />)}
    </Card>


}

ListAssetFile.propTypes = {
    initialValues: PropTypes.object,
};

ListAssetFile.defaultProps = {
    initialValues: {},
};

export default ListAssetFile;