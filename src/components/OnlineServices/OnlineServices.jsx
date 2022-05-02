import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

export default class OnlineServices extends Component {

    constructor(props) {

        super(props);

        this.state = {
            dl_renew: 0,
            address_change: 0,
            vital_record: 0,
            real_id: 0,
            MyInfo: 0,
            ADDUP: 0,

            dead: Math.random() > 0.1 ? 0 : 1,
            married: Math.random() > 0.5 ? 0 : 1,
            divorced: Math.random() > 0.2 ? 0 : 1,

            dead_url: 'https://ipfs.infura.io/ipfs/QmVUjJsi7cx1a4dAeGZQ6PMtTMjXmMr3TxvdZYbhZTB1sG',
            birth_url: 'https://ipfs.infura.io/ipfs/QmNWRgSuJD3ggytUXdBQ4eNYq4iXvXHDJZWqJdGmvQ9yeJ',
            marriage_url: 'https://ipfs.infura.io/ipfs/QmYHyKpvedFNjF2kqfDr7ThB85KTNM48VX3MfeUjEtHheL',
            divorce_url: 'https://ipfs.infura.io/ipfs/Qmf1mn34MvDHTB2iiM4Ze3vvEiNLUR6fYNxSZynxgJuaqP',

            account: this.props.account,
            web3: this.props.web3,
            web_service: this.props.web_service,
            services: this.props.services,

            Info: null,
            DL: null,
            Vital: null,
            Address: null,
        };

        console.log(this.state)
    }


    componentWillReceiveProps(props) {

        this.setState({
            account: props.account,
            web3: props.web3,
            web_service: props.web_service,
            services: this.props.services,
        });
    }


    view_record() {

        console.log(this.state.user)
        console.log(
            this.state.web_service.methods.view_vital(this.state.account)
                .send({ from: this.state.account })
        );
    }


    realID_request(event) {

        event.preventDefault();

        const identifier = (Math.random() + 1).toString(36).substring(2);
        const year = new Date().getFullYear()

        console.log(
            this.state.web_service.methods.create_realID(this.name, identifier,
                this.address, year, this.dob)
                .send({
                    from: this.state.account,
                    gas: '200000',
                    value: this.state.web3.utils.toWei('0.05', 'ether')
                })
                .on('error', (e) => {
                    window.alert('License not yet expired!')
                })
        );
    }

    async viewInfo() {
        const information = this.state.services.methods.getInfo(this.state.account).call().then((results => {
            this.setState({ Info: Object.values(results) })
        }))
    }
    async viewLicense() {
        const information = this.state.services.methods.getLicense(this.state.account).call().then((results => {
            this.setState({ DL: Object.values(results) })
            
        }))
    }
    async viewVital() {
        const information = this.state.services.methods.pay().send({from:this.state.account, value: this.state.web3.utils.toWei('0.03', 'ether')}).on("transactionHash", (hash) =>{
            console.log(hash)
            this.state.services.methods.getVital(this.state.account).call().then((results => {
            this.setState({ Vital: Object.values(results) })
        }))
        })
        
        const i = await this.state.web3.eth.getBalance(this.state.services.options.address)
            console.log(i)
    }
    async viewAddress() {
        const information = this.state.services.methods.getAddress(this.state.account).call().then((results => {
            this.setState({ Address: Object.values(results) })
        }))
    }
    updateAddress(street, state, zip) {
        this.state.services.methods.updateAddress(street, state, zip)
            .send({ from: this.state.account })
            .on("transactionHash", (hash) => {
                this.setState({ loading: false })
                window.location.reload();
            })
    }
    renewLicense() {
        let license = Math.random()
            .toString(36)
            .slice(2);
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let exp = `${year + 8}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${date}`
        this.state.services.methods.updateLicense(license, exp)
            .send({ from: this.state.account })
            .on("transactionHash", (hash) => {
                this.setState({ loading: false })
                window.location.reload();
            })
    }



    render() {

        return (
            <div style={{ width: '70%', margin: '0 auto', padding: '50px' }}>
                <div style={{ background: 'white', borderRadius: '10px', padding: '40px' }}>
                    <div style={{ textAlign: "center" }}>
                        <Button variant="primary" onClick={() => {

                            this.setState({
                                dl_renew: 0,
                                address_change: 0,
                                vital_record: 0,
                                real_id: 0,
                                MyInfo: 1,
                            })
                            this.viewAddress(this.state.account)
                            this.viewInfo(this.state.account)
                            this.viewLicense(this.state.account)
                        }
                        }>My Information</Button>{' '}
                        <Button variant="primary" onClick={() => {
                            this.setState({
                                dl_renew: 1,
                                address_change: 0,
                                vital_record: 0,
                                real_id: 0,
                                MyInfo: 0,
                            })
                            this.viewLicense(this.state.account)
                        }}>Driver's License Renewal</Button>{' '}

                        <Button variant="primary" onClick={() => {
                            this.setState({
                                dl_renew: 0,
                                address_change: 1,
                                vital_record: 0,
                                real_id: 0,
                                MyInfo: 0,
                            }); this.viewAddress(this.state.account)
                        }}>Change Address</Button>{' '}

                        <Button variant="primary" onClick={() => {
                            this.setState({
                                dl_renew: 0, address_change: 0,
                                vital_record: 1, real_id: 0, MyInfo: 0,
                            })
                            
                        }}>Obtain Vital Record</Button>{' '}

                        <Button variant="primary" onClick={() => this.setState({
                            dl_renew: 0,
                            address_change: 0,
                            vital_record: 0,
                            real_id: 1,
                            MyInfo: 0,
                        })}>Real ID</Button>{' '}
                    </div>
                    {
                        this.state.MyInfo === 1 ? (
                            <div style={{ textAlign: "center" }}>
                                <br />
                                {this.state.Info !== null && this.state.Address !== null && this.state.DL !== null ? (
                                    <div style={{ fontSize: "16px", textAlign: "center" }}>
                                        <div>{console.log(this.state)}</div>
                                        <thead style={{ fontSize: "16px", textAlign: "center" }} >
                                            <tr>
                                                <th>Name</th>
                                                <td>{this.state.Info[0]}</td>
                                            </tr>
                                            <tr>
                                                <th>Date of Birth</th>
                                                <td>{this.state.Info[1]}</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>{this.state.Address[0]}. {this.state.Address[1]}, {this.state.Address[2]}</td>
                                            </tr>
                                            <tr>
                                                <th>License ID Number</th>
                                                <td>{this.state.DL[0]}</td>
                                            </tr>
                                            <tr>
                                                <th>License EXP.</th>
                                                <td>{this.state.DL[1]}</td>
                                            </tr>


                                        </thead>

                                    </div>

                                ) : (
                                    <div />
                                )}
                            </div>
                        ) : (
                            <div />
                        )
                    }
                    {
                        this.state.dl_renew === 1 ? (
                            <div>
                                <div>
                                    {this.state.DL !== null ? (
                                        <div>
                                            <br />
                                            <thead style={{ fontSize: "16px", textAlign: "center" }} >
                                                <tr>
                                                    <th>License ID: </th>
                                                    <td>{this.state.DL[0]}</td>
                                                </tr>
                                                <tr>
                                                    <th>License Exp: </th>
                                                    <td>{this.state.DL[1]}</td>
                                                </tr>
                                            </thead>
                                            <div>
                                                <form
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        this.renewLicense()
                                                        //this.uploadFile(name, dob, sa, vehicle);
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <br></br>
                                                        <input
                                                            id="Reason"
                                                            type="text"
                                                            ref={(input) => {
                                                                this.street = input;
                                                            }}
                                                            className="form-control text-monospace"
                                                            placeholder="Reason you need a new license..."
                                                            required
                                                        />

                                                    </div>

                                                    <br />
                                                    <button type="submit" className="btn-primary btn-block">
                                                        <b>Submit!</b>
                                                    </button>
                                                </form>
                                            </div>


                                        </div>
                                    ) : (
                                        <div />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div />
                        )
                    }

                    {
                        this.state.address_change === 1 ? (
                            <div>
                                <br />
                                <div style={{ textAlign: "center" }}>Do you want to update your existing address?</div>
                                <br />
                                {this.state.Address !== null ? (
                                    <div>
                                        <thead style={{ fontSize: "16px", textAlign: "center" }} >
                                            <tr>
                                                <th>Address: </th>
                                                <td>{this.state.Address[0]}. {this.state.Address[1]}, {this.state.Address[2]}</td>
                                                <td><Button onClick={() => {
                                                    this.setState({ ADDUP: 1 })
                                                }}>Update Address</Button></td>
                                            </tr>
                                        </thead>
                                        {this.state.ADDUP === 1 ? (
                                            <div>
                                                <form
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        const street = this.street.value;
                                                        const state = this.USstate.value;
                                                        const zip = this.zip.value;
                                                        this.updateAddress(street, state, zip)
                                                        //this.uploadFile(name, dob, sa, vehicle);
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <br></br>
                                                        <input
                                                            id="addressStreet"
                                                            type="text"
                                                            ref={(input) => {
                                                                this.street = input;
                                                            }}
                                                            className="form-control text-monospace"
                                                            placeholder="Street Address..."
                                                            required
                                                        />
                                                        <input
                                                            id="addressState"
                                                            type="text"
                                                            ref={(input) => {
                                                                this.USstate = input;
                                                            }}
                                                            className="form-control text-monospace"
                                                            placeholder="State ..."
                                                            required
                                                        />
                                                        <input
                                                            id="addresszip"
                                                            type="text"
                                                            ref={(input) => {
                                                                this.zip = input;
                                                            }}
                                                            className="form-control text-monospace"
                                                            placeholder="Zip Code ..."
                                                            required
                                                        />

                                                    </div>

                                                    <br />
                                                    <button type="submit" className="btn-primary btn-block">
                                                        <b>Submit!</b>
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div />
                                        )}

                                    </div>
                                ) : (
                                    <div />
                                )}
                            </div>
                        ) : (
                            <div />
                        )
                    }

                    {
                        this.state.vital_record === 1 ? (
                            <div style={{ textAlign: 'center' }}>
                                <br></br>
                                <h2> Do you want your Vital Records?</h2>
                                <Button onClick={() => {
                                    this.viewVital()
                                }}>Request Vital Records</Button>
                                {this.state.Vital != null ? (
                                    <div>
                                        <br></br>
                                        <a href={`https://ipfs.infura.io/ipfs/${this.state.Vital[0]}`}>
                                            Birth Certificate
                                        </a>

                                        <br></br>
                                        {
                                            this.state.Vital[1] !== "" ? (
                                                <><a href={`https://ipfs.infura.io/ipfs/${this.state.Vital[1]}`} target='_blank'>
                                                    Death Certificate
                                                </a>
                                                <br /></>
                                            ) : (
                                                <div />
                                            )
                                        }
                                        
                                        {
                                            this.state.Vital[2] !== "" ? (
                                                <><a href={`https://ipfs.infura.io/ipfs/${this.state.Vital[2]}`} target='_blank'>
                                                    Marriage Certificate
                                                </a><br /></>
                                            ) : (
                                                <div />
                                            )
                                        }
                                        <br></br>
                                        {
                                            this.state.Vital[3] !== "" ? (
                                                <><a href={`https://ipfs.infura.io/ipfs/${this.state.Vital[3]}`} target='_blank'>
                                                    Divorce Certificate
                                                </a><br /></>
                                            ) : (
                                                <div />
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div />
                                )}

                            </div>
                        ) : (
                            <div />
                        )
                    }

                    {
                        this.state.real_id === 1 ? (
                            <div style={{ paddingLeft: '15%', paddingRight: '15%' }}>
                                <form onSubmit={(event) => this.realID_request(event)}>
                                    <br></br>

                                    <input id='name' type='text' ref={(input) => {
                                        this.name = input
                                    }} className="form-control text-monospace" placeholder='Enter your name...' required />

                                    <br></br>

                                    <input id='address' type='text' ref={(input) => {
                                        this.address = input
                                    }} className="form-control text-monospace" placeholder='Enter your address...' required />

                                    <br></br>

                                    <input id='dob' type='date' ref={(input) => {
                                        this.dob = input
                                    }} className="form-control text-monospace" required />

                                    <br></br>

                                    <div style={{ margin: '0 auto', textAlign: 'center' }}>
                                        <input type='submit' value={'Submit Request'} />
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div />
                        )
                    }
                </div>
            </div>
        );
    }
}
