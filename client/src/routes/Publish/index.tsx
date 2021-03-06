import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import Route from '../../components/templates/Route'
import Form from '../../components/atoms/Form/Form'
import AssetModel from '../../models/AssetModel'
import { User } from '../../context'
import Web3message from '../../components/organisms/Web3message'
import Step from './Step'
import Progress from './Progress'
import ReactGA from 'react-ga'

import { steps } from '../../data/form-publish.json'
import Content from '../../components/atoms/Content'
import { File } from './Files'

type AssetType = 'dataset' | 'algorithm' | 'container' | 'workflow' | 'other'

interface PublishState {
    name?: string
    dateCreated?: string
    price?: string
    author?: string
    license?: string
    description?: string
    files?: File[]
    type?: AssetType
    copyrightHolder?: string
    categories?: string[]

    currentStep?: number
    publishingStep?: number
    isPublishing?: boolean
    isPublished?: boolean
    publishedDid?: string
    publishingError?: string
    validationStatus?: any
}

export default class Publish extends Component<{}, PublishState> {
    public static contextType = User

    public state = {
        name: '',
        dateCreated: new Date().toISOString(),
        description: '',
        files: [],
        price: '',
        author: '',
        type: 'dataset' as AssetType,
        license: '',
        copyrightHolder: '',
        categories: [],

        currentStep: 1,
        isPublishing: false,
        isPublished: false,
        publishedDid: '',
        publishingError: '',
        publishingStep: 0,
        validationStatus: {
            1: { name: false, price: false, allFieldsValid: false },
            2: {
                description: false,
                categories: false,
                allFieldsValid: false
            },
            3: {
                author: false,
                copyrightHolder: false,
                license: false,
                allFieldsValid: false
            }
        }
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.validateInputs(event.currentTarget.name, event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private next = () => {
        let { currentStep } = this.state
        const totalSteps = steps.length

        currentStep =
            currentStep >= totalSteps - 1 ? totalSteps : currentStep + 1

        ReactGA.event({
            category: 'Publish',
            action: 'nextStep ' + currentStep
        })

        this.setState({ currentStep })
    }

    private prev = () => {
        let { currentStep } = this.state
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({ currentStep })
    }

    private tryAgain = () => {
        this.setState({ publishingError: '' })
    }

    private toStart = () => {
        const deviceId = sessionStorage.getItem("currentDevice")
        const deviceURL = "http://api.oehu.org/transactions?deviceId=" + deviceId

        const nFiles = [];
        nFiles.push({
            url: deviceURL, 
            contentType: "JSON",
            found: true
        });

        this.setState({
            name: '',
            dateCreated: new Date().toISOString(),
            description: '',
            files: [],
            price: '',
            author: '',
            type: 'dataset' as AssetType,
            license: '',
            copyrightHolder: '',
            categories: [],
            isPublishing: false,
            isPublished: false,
            publishingStep: 0,
            currentStep: 1
        })
    }

    private validateInputs = (name: string, value: string) => {
        let hasContent = value.length > 0

        // Setting state for all fields
        if (hasContent) {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: true
                        }
                    }
                }),
                this.runValidation
            )
        } else {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: false
                        }
                    }
                }),
                this.runValidation
            )
        }
    }

    private runValidation = () => {
        let { validationStatus } = this.state
        //
        // Step 1
        //
        if (validationStatus[1].name && validationStatus[1].price) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 2
        //
        if (validationStatus[2].description && validationStatus[2].categories) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 3
        //
        if (
            validationStatus[3].author &&
            validationStatus[3].copyrightHolder &&
            validationStatus[3].license
        ) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: false
                    }
                }
            }))
        }
    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const deviceId = sessionStorage.getItem("currentDevice")
        const deviceURL = "http://api.oehu.org/transactions?deviceId=" + deviceId

        ReactGA.event({ category: 'Publish', action: 'registerAsset-start' })

        this.setState({
            publishingError: '',
            isPublishing: true,
            publishingStep: 0
        })

        const { ocean } = this.context
        const account = await ocean.accounts.list()

        // remove `found` attribute from all File objects
        // in a new array
        // const files = this.state.files.map(
        //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //     ({ found, ...keepAttrs }: { found: boolean }) => keepAttrs
        // )

        const files = [];
        files.push({
            url: deviceURL, 
            contentType: "JSON"
        }); 


        const links = [];
        links.push({
            url: deviceURL,
            name: "" + deviceId,
            type: "json"
        });

       

        const newAsset = {
            // OEP-08 Attributes
            // https://github.com/oceanprotocol/OEPs/tree/master/8
            base: Object.assign(AssetModel.base, {
                name: this.state.name,
                description: this.state.description,
                dateCreated:
                    new Date(this.state.dateCreated)
                        .toISOString()
                        .split('.')[0] + 'Z', // remove milliseconds
                author: this.state.author,
                license: this.state.license,
                copyrightHolder: this.state.copyrightHolder,
                links: links,
                files: files,
                price: this.state.price,
                type: this.state.type,
                categories: ['OEHU']
            })
        }
 
        console.log("NEW ASSET", newAsset);

        try {
            const asset = await this.context.ocean.assets
                .create(newAsset, account[0])
                .next((publishingStep: number) =>
                    this.setState({ publishingStep })
                )

            this.setState({
                publishedDid: asset.id,
                isPublished: true
            })

            ReactGA.event({
                category: 'Publish',
                action: `registerAsset-end ${asset.id}`
            })
        } catch (error) {
            // make readable errors
            Logger.error('error:', error.message)
            this.setState({ publishingError: error.message })

            ReactGA.event({
                category: 'Publish',
                action: `registerAsset-error ${error.message}`
            })
        }

        this.setState({ isPublishing: false })
    }

    public render() {
        return (
            <Route
                title="Publish"
                description="Publish a new data set into the Ocean Protocol Network."
            >
                <Content>
                    {(!this.context.isLogged ||
                        !this.context.isOceanNetwork) && <Web3message />}

                    <Progress
                        steps={steps}
                        currentStep={this.state.currentStep}
                    />

                    <Form onSubmit={this.registerAsset}>
                        {steps.map((step: any, index: number) => (
                            <Step
                                key={index}
                                index={index}
                                title={step.title}
                                description={step.description}
                                currentStep={this.state.currentStep}
                                fields={step.fields}
                                inputChange={this.inputChange}
                                state={this.state}
                                next={this.next}
                                prev={this.prev}
                                totalSteps={steps.length}
                                tryAgain={this.tryAgain}
                                toStart={this.toStart}
                                content={step.content}
                            />
                        ))}
                    </Form>
                </Content>
            </Route>
        )
    }
}
