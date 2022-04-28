import React, { Component } from "react";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: this.props.account,
            services: this.props.services,
            user: this.props.user,
            web3: this.props.web3,
            info: [],
            loading: false,
        };
    }


    componentWillReceiveProps(props) {
        this.setState({ account: props.account, services: props.services, user: props.user, web3: props.web3 });
    }


    user = () => {
        console.log(this.state.user)
        console.log(this.state.user.methods.getOwner().send({ from: this.state.account }))
    }

    async loadInformation() {
        const accounts = await this.state.web3.eth.getAccounts()
        console.log(this.state.account)
    }

    captureFile = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()

        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({
                buffer: Buffer(reader.result),
                type: file.type,
                name: file.name
            })
            console.log('buffer', this.state.buffer)
        }
    }

    uploadFile = registration => {
        console.log("Submitting file to IPFS...")
        console.log(this.state.buffer)
        // Add file to the IPFS
        console.log(ipfs)
        ipfs.add(this.state.buffer).then(result=>{
            console.log(result)
        })
        /*ipfs.add(this.state.buffer, (error, result) => {
            console.log('IPFS result', result.size)
            if (error) {
                console.error(error)
                return
            }

            this.setState({ loading: true })
            // Assign value for the file without extension
            if (this.state.type === '') {
                this.setState({ type: 'none' })
            }

            this.state.services.methods.uploadInformation(result[0].hash, registration, "218 Berry", "T8AG9SASCV0", [1,2,3], "Hi").send({ from: this.state.account }).on('transactionHash', (hash) => {
                this.setState({
                    loading: false,
                    type: null,
                    name: null
                })
                window.location.reload()
            }).on('error', (e) => {
                window.alert('Error')
                this.setState({ loading: false })
            })
        })*/
    }

    render() {

        return (
            <div>
                {this.state.account}
                {this.state.user !== null ? (
                    <button onClick={() => this.user()}>get account</button>
                ) :
                    (<p>Error</p>)}
                <div>
                    <p>&nbsp;</p>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const registration = this.registration.value
                        this.uploadFile(registration)
                    }} >
                        <div className="form-group">
                            <br></br>
                            <input
                                id="fileregistration"
                                type="text"
                                ref={(input) => { this.registration = input }}
                                className="form-control text-monospace"
                                placeholder="registration..."
                                required />
                        </div>
                        <input type="file" onChange={this.captureFile} className="text-white text-monospace" />
                        <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                    </form>
                    <p>&nbsp;</p>
                </div>
            </div>
        )
    }
}