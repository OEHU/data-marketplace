import React, { Component } from 'react'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import VersionNumbers from '../components/molecules/VersionNumbers'

class About extends Component {
    public render() {
        return (
            <Route
                title="About"
                description="A marketplace to find and publish OEHU data sets in the Ocean Network. Built
                by the BlockLab intern team using Commons as a template."
            >
                <Content>
                    <p>
                        OEHU Data Marketplace is built on top of the Ocean{' '}
                        <a href="https://docs.oceanprotocol.com/concepts/testnets/#the-nile-testnet">
                            Nile test network
                        </a>{' '}
                        and is targeted at enthusiastic data scientists with
                        some crypto experience. It can be used with any
                        Web3-capable browser, like Firefox with MetaMask
                        installed.
                    </p>

                    <ul>
                        {/* <li>
                            <a href="https://blog.oceanprotocol.com/the-commons-marketplace-c57a44288314">
                                Read the blog post →
                            </a>
                        </li> */}
                        <li>
                            <a href="https://github.com/OEHU/data-marketplace">
                                Check out OEHU/data-marketplace on GitHub →
                            </a>
                        </li>
                    </ul>
                </Content>

                <Content>
                    <VersionNumbers />
                </Content>
            </Route>
        )
    }
}

export default About
