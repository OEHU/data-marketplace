const AssetModel = {
    assetId: null,
    publisherId: null,

    // OEP-08 Attributes
    // https://github.com/oceanprotocol/OEPs/tree/master/8
    base: {
        name: null,
        description: null,
        dateCreated: null,
        author: null,
        type: '',
        license: null,
        copyrightHolder: null,
        workExample: '',
        files: [],
        categories: [],
        links: [],
        inLanguage: '',
        tags: [],
        price: ''
    }
}

export default AssetModel
