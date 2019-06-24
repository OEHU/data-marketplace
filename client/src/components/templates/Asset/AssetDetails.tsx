import React, { PureComponent } from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@oceanprotocol/squid'
import Markdown from '../../atoms/Markdown'
import CategoryLink from '../../atoms/CategoryLink'
import styles from './AssetDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'

interface AssetDetailsProps {
    metadata: MetaData
    ddo: DDO
}

export function datafilesLine(files: File[]) {
    if (files.length === 1) {
        return <span>{files.length} data file</span>
    }
    return <span>{files.length} data files</span>
}

export default class AssetDetails extends PureComponent<AssetDetailsProps> {
    public render() {
        const { metadata, ddo } = this.props
        const { base } = metadata

        return (
            <>
                <aside className={styles.metaPrimary}>
                    <h2
                        className={styles.copyrightHolder}
                        title="Copyright Holder"
                    >
                        {base.copyrightHolder}
                    </h2>
                    <div className={styles.metaPrimaryData}>
                        <span
                            title={`Date created, published on ${
                                base.datePublished
                            }`}
                        >
                            <Moment
                                date={base.dateCreated}
                                format="L"
                                interval={0}
                            />
                        </span>

                        {base.categories && (
                            <CategoryLink category={base.categories[0]} />
                        )}

                        {base.files && datafilesLine(base.files)}
                    </div>
                </aside>

                {base.description && (
                    <Markdown
                        text={base.description}
                        className={styles.description}
                    />
                )}

                <div className={styles.metaFixed}>
                    <h2
                        className={styles.metaFixedTitle}
                        title="This metadata can not be changed because it is used to generate the checksums for the DDO, and to encrypt the file urls."
                    >
                        Fixed Metadata
                    </h2>
                    <ul>
                        <li>
                            <span className={styles.metaLabel}>
                                <strong>Author</strong>
                            </span>
                            <span className={styles.metaValue}>
                                {base.author}
                            </span>
                        </li>
                        <li>
                            <span className={styles.metaLabel}>
                                <strong>License</strong>
                            </span>
                            <span className={styles.metaValue}>
                                {base.license}
                            </span>
                        </li>
                        <li>
                            <span className={styles.metaLabel}>
                                <strong>DID</strong>
                            </span>
                            <span className={styles.metaValue}>
                                <code>{ddo.id}</code>
                            </span>
                        </li>
                    </ul>
                </div>

                <AssetFilesDetails
                    files={base.files ? base.files : []}
                    ddo={ddo}
                />

                {/* <pre>
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                </pre> */}
            </>
        )
    }
}
