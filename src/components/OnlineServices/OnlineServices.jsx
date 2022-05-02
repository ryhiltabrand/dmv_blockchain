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

            dead: Math.random() > 0.1 ? 0 : 1,
            married: Math.random() > 0.5 ? 0 : 1,
            divorced: Math.random() > 0.2 ? 0 : 1,

            dead_url: 'https://ipfs.infura.io/ipfs/QmVUjJsi7cx1a4dAeGZQ6PMtTMjXmMr3TxvdZYbhZTB1sG',
            birth_url: 'https://ipfs.infura.io/ipfs/QmNWRgSuJD3ggytUXdBQ4eNYq4iXvXHDJZWqJdGmvQ9yeJ',
            marriage_url: 'https://ipfs.infura.io/ipfs/QmYHyKpvedFNjF2kqfDr7ThB85KTNM48VX3MfeUjEtHheL',
            divorce_url: 'https://ipfs.infura.io/ipfs/Qmf1mn34MvDHTB2iiM4Ze3vvEiNLUR6fYNxSZynxgJuaqP',

            account: this.props.account,
            web3: this.props.web3,
            web_service: this.props.web_service
        };

        console.log(this.state)
    }


    componentWillReceiveProps(props) {

        this.setState({
            account: props.account,
            web3: props.web3,
            web_service: props.web_service
        });
    }


    view_record() {

        console.log(this.state.user)
        console.log(
            this.state.web_service.methods.view_vital(this.state.account)
                                          .send({from: this.state.account})
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


    render() {

        return(
            <div style={{width: '70%', margin: '0 auto', padding: '50px'}}>
                <div style={{background: 'white', borderRadius: '10px', padding: '40px'}}>
                    <div style={{ textAlign: "center" }}>
                        <Button variant="primary" onClick={() => this.setState({
                            dl_renew: 1,
                            address_change: 0,
                            vital_record: 0,
                            real_id: 0,
                        })}>Driver's License Renewal</Button>{' '}

                        <Button variant="primary" onClick={() => this.setState({
                            dl_renew: 0,
                            address_change: 1,
                            vital_record: 0,
                            real_id: 0,
                        })}>Change Address</Button>{' '}

                        <Button variant="primary" onClick={() => {
                            this.setState({ dl_renew: 0, address_change: 0,
                                            vital_record: 1, real_id: 0,
                            })
                            this.view_record()
                        }}>Obtain Vital Record</Button>{' '}

                        <Button variant="primary" onClick={() => this.setState({
                            dl_renew: 0,
                            address_change: 0,
                            vital_record: 0,
                            real_id: 1,
                        })}>Real ID</Button>{' '}
                    </div>

                    {
                        this.state.dl_renew === 1 ? (
                            <div>
                                d
                            </div>
                        ) : (
                            <div />
                        )
                    }

                    {
                       this.state.address_change === 1 ? (
                            <div>
                                e
                            </div>
                        ) : (
                            <div />
                        )
                    }

                    {
                       this.state.vital_record === 1 ? (
                            <div style={{textAlign: 'center'}}>
                                <br></br>
                                <h2>Vital Records Available</h2>

                                <br></br>
                                <a href={this.state.birth_url} target='_blank'>
                                    Birth Certificate
                                </a>

                                <br></br>

                                {
                                    this.state.dead === 1 ? (
                                        <a href={this.state.dead_url} target='_blank'>
                                            Death Certificate
                                        </a>
                                    ) : (
                                        <div />
                                    )
                                }

                                <br></br>

                                {
                                    this.state.married === 1 ? (
                                        <a href={this.state.marriage_url} target='_blank'>
                                            Marriage Certificate
                                        </a>
                                    ) : (
                                        <div />
                                    )
                                }

                                <br></br>

                                {
                                    this.state.divorced === 1 ? (
                                        <a href={this.state.divorce_url} target='_blank'>
                                            Divorce Certificate
                                        </a>
                                    ) : (
                                        <div />
                                    )
                                }
                            </div>
                        ) : (
                            <div />
                        )
                    }

                    {
                       this.state.real_id === 1 ? (
                            <div style={{paddingLeft: '15%', paddingRight: '15%'}}>
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

                                    <div style={{margin: '0 auto', textAlign: 'center'}}>
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
