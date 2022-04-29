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
            info: this.props.info,
            loading: false,
        };
    }


    componentWillReceiveProps(props) {
        this.setState({ account: props.account, services: props.services, user: props.user, web3: props.web3, info: props.info});
    }


    user = () => {
        console.log(this.state.user)
        console.log(this.state.user.methods.getOwner().send({ from: this.state.account }))
    }

    async loadInformation() {
        const accounts = await this.state.web3.eth.getAccounts()
        console.log(this.state.account)
    }

    captureRegistration = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()

        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({
                rbuffer: Buffer(reader.result),
                type: file.type,
                name: file.name
            })
            console.log('buffer', this.state.rbuffer)
        }
    }
    captureTitle = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()

        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({
                tbuffer: Buffer(reader.result),
                type: file.type,
                name: file.name
            })
            console.log('buffer', this.state.tbuffer)
        }
    }

    uploadFile = (name, dob, sa, vehicle) => {
        console.log("Submitting file to IPFS...")
        console.log(this.state.buffer)
        let Death = ['QmVUjJsi7cx1a4dAeGZQ6PMtTMjXmMr3TxvdZYbhZTB1sG', '']
        let Marriage = ['QmYHyKpvedFNjF2kqfDr7ThB85KTNM48VX3MfeUjEtHheL', '']
        let Divorce = ['Qmf1mn34MvDHTB2iiM4Ze3vvEiNLUR6fYNxSZynxgJuaqP', '']
        let married
        let divorced
        let dead
        if (0 + Math.random() * (1 - 0) > .5) {
            married = 0
        } else { married = 1 }
        if (married == 1 && (0 + Math.random() * (1 - 0)) < .3) {
            divorced = 0
        } else { divorced = 1 }
        if (0 + Math.random() * (1 - 0) < .1) {
            dead = 0
        } else { dead = 1 }

        let license = Math.random().toString(36).slice(2)
        var registration
        var title
        console.log(Death[dead], Marriage[married], Divorce[divorced])
        // Add file to the IPFS

        ipfs.add(this.state.rbuffer).then(result => {
            return registration = Object.values(result)[0]
        }).then(
            ipfs.add(this.state.tbuffer).then(result => {
                title = Object.values(result)[0]
                console.log(registration, title)
                this.state.services.methods.uploadInformation(name, dob, registration, sa, license, vehicle, title).send({ from: this.state.account }).on('transactionHash', (hash) => {
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
            })
        )
        /* 
        ipfs.add(this.state.buffer, (error, result) => {
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
                {this.state.user !== null ? (
                    <button onClick={() => this.user()}>get account</button>
                ) :
                    (<p>Error</p>)}
                <div>
                    {this.state.user !== null ? (
                        <>
                            {console.log(this.state)}
                            <p>&nbsp;</p>
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const name = this.name.value;
                                const dob = this.dob.value;
                                const sa = this.sa.value;
                                const vehicle = this.vehicle.value;
                                this.uploadFile(name, dob, sa, vehicle)
                            }} >
                                <div className="form-group">
                                    <br></br>
                                    <input
                                        id="infoName"
                                        type="text"
                                        ref={(input) => { this.name = input }}
                                        className="form-control text-monospace"
                                        placeholder="First and Last Name..."
                                        required />
                                    <input
                                        id="infoDOB"
                                        type="text"
                                        ref={(input) => { this.dob = input }}
                                        className="form-control text-monospace"
                                        placeholder="Date of Birth..."
                                        required />
                                    <input
                                        id="infoSA"
                                        type="text"
                                        ref={(input) => { this.sa = input }}
                                        className="form-control text-monospace"
                                        placeholder="Street Address..."
                                        required />
                                    <input
                                        id="infoVehicle"
                                        type="text"
                                        ref={(input) => { this.vehicle = input }}
                                        className="form-control text-monospace"
                                        placeholder="Vehicle..."
                                        required />
                                </div>

                                <div>Registration: <input type="file" onChange={this.captureRegistration} className="text-white text-monospace" /></div>
                                <div>Title: <input type="file" onChange={this.captureTitle} className="text-white text-monospace" /></div>
                                <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                            </form>
                            <p>&nbsp;</p></>) : (<div></div>)}
                </div>
                {console.log(this.state.info)}
                {this.state.info.map((file, key) => {
                    return (
                        <thead style={{ 'fontSize': '12px' }} key={key}>
                            <tr>
                                <td>name</td>
                                <td>dob</td>
                                <td>registration</td>
                                <td>streetAddress</td>
                                <td>license</td>

                            </tr>
                            <tr>
                                <td>{file.name}</td>
                                <td>{file.dob}</td>
                                <td>{file.registration}</td>
                                <td>{file.streetAddress}</td>
                                <td>{file.license}</td>

                            </tr>
                        </thead>
                    )
                })}
            </div>
        )
    }
}