import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

var _ = require("lodash");
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient.create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
}); // leaving out the arguments will default to these values

export default class VehicleS extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Transfer: 0,
            Title: 0,
            Register: 0,
            Report: 0,
            view: 0,

            account: this.props.account,
            web3: this.props.web3,
            vehicle: this.props.vehicle,
            loading: false,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            account: props.account,
            web3: props.web3,
            vehicle: props.vehicle,
            loading: true
        });
    }

    TransferCar = (vin, pub) => {
        this.state.vehicle.methods.transferVehicle(vin, pub).send({ from: this.state.account }).on("transactionHash", (hash) => {
            this.setState({
                loading: false,
            });
            window.location.reload();
        }).on("error", (e) => {
            window.alert("Error");
            this.setState({ loading: false })
        })
    }

    render() {
        return (
            <div style={{ width: "70%", margin: "0 auto", padding: "50px" }}>
                <div
                    style={{ background: "white", borderRadius: "10px", padding: "40px" }}
                >

                    <div style={{ textAlign: "center" }}>
                        <Button variant="primary" onClick={() => this.setState({
                            Transfer: 0,
                            Title: 0,
                            Register: 0,
                            Report: 0,
                            view: 1,
                        })}>My Vehicles</Button>{' '}
                        <Button variant="primary" onClick={() => this.setState({
                            Transfer: 1,
                            Title: 0,
                            Register: 0,
                            Report: 0,
                            view: 0,
                        })}>Transfer Ownership</Button>{' '}
                        <Button variant="primary" onClick={() => this.setState({
                            Transfer: 0,
                            Title: 1,
                            Register: 0,
                            Report: 0,
                            view: 0,
                        })}>Title A Vehicle</Button>{' '}
                        <Button variant="primary" onClick={() => this.setState({
                            Transfer: 0,
                            Title: 0,
                            Register: 1,
                            Report: 0,
                            view: 0,
                        })}>Register Renewal</Button>{' '}
                        <Button variant="primary" onClick={() => this.setState({
                            Transfer: 0,
                            Title: 0,
                            Register: 0,
                            Report: 1,
                            view: 0,
                        })}>Report Vehicle Status</Button>{' '}
                    </div>

                    {this.state.loaded !== false ? (
                        <div>
                            {console.log(this.state)}
                            <div>
                                {this.state.view === 1 ? (
                                    <div style={{ textAlign: "center" }}>
                                        <p>&nbsp;</p>
                                        <div>View</div>
                                    </div>
                                ) : (
                                    <div />
                                )}
                                {this.state.Transfer === 1 ? (
                                    <div style={{ textAlign: "center" }}>
                                        <p>&nbsp;</p>
                                        <div>Transfer</div>

                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                const vin = this.vin.value;
                                                const pub = this.pub.value;
                                                this.TransferCar(vin, pub)
                                                //this.uploadFile(name, dob, sa, vehicle);

                                            }}
                                        >
                                            <div className="form-group">
                                                <br></br>
                                                <input
                                                    id="vin"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.vin = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="What is your vehicles VIN..."
                                                    required
                                                />
                                                <input
                                                    id="newOwner"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.pub = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="New Owners Public Key..."
                                                    required
                                                />

                                            </div>

                                            <br />
                                            <button type="submit" className="btn-primary btn-block">
                                                <b>Submit!</b>
                                            </button>
                                        </form>
                                        <p>&nbsp;</p></div>
                                ) : (
                                    <div />
                                )}
                                {this.state.Title === 1 ? (
                                    <div style={{ textAlign: "center" }}>
                                        <p>&nbsp;</p>
                                        <div>Title</div>
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                const vin = this.vin.value;
                                                const pub = this.pub.value;
                                                this.TransferCar(vin, pub)
                                                //this.uploadFile(name, dob, sa, vehicle);

                                            }}
                                        >
                                            <div className="form-group">
                                                <br></br>
                                                <input
                                                    id="vin"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.vin = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="What is your vehicles VIN..."
                                                    required
                                                />
                                                <input
                                                    id="newOwner"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.pub = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="New Owners Public Key..."
                                                    required
                                                />

                                            </div>

                                            <br />
                                            <button type="submit" className="btn-primary btn-block">
                                                <b>Submit!</b>
                                            </button>
                                        </form>
                                        <p>&nbsp;</p>
                                    </div>
                                ) : (
                                    <div />
                                )}
                                {this.state.Register === 1 ? (
                                    <div style={{ textAlign: "center" }}>
                                        <p>&nbsp;</p>
                                        <div>Registration</div>
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                const vin = this.vin.value;
                                                const pub = this.pub.value;
                                                this.TransferCar(vin, pub)
                                                //this.uploadFile(name, dob, sa, vehicle);

                                            }}
                                        >
                                            <div className="form-group">
                                                <br></br>
                                                <input
                                                    id="vin"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.vin = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="What is your vehicles VIN..."
                                                    required
                                                />
                                                <input
                                                    id="newOwner"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.pub = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="New Owners Public Key..."
                                                    required
                                                />

                                            </div>

                                            <br />
                                            <button type="submit" className="btn-primary btn-block">
                                                <b>Submit!</b>
                                            </button>
                                        </form>
                                        <p>&nbsp;</p>
                                    </div>
                                ) : (
                                    <div />
                                )}
                                {this.state.Report === 1 ? (
                                    <div style={{ textAlign: "center" }}>
                                        <p>&nbsp;</p>
                                        <div>Report</div>
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                const vin = this.vin.value;
                                                const pub = this.pub.value;
                                                this.TransferCar(vin, pub)
                                                //this.uploadFile(name, dob, sa, vehicle);

                                            }}
                                        >
                                            <div className="form-group">
                                                <br></br>
                                                <input
                                                    id="vin"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.vin = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="What is your vehicles VIN..."
                                                    required
                                                />
                                                <input
                                                    id="newOwner"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.pub = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="New Owners Public Key..."
                                                    required
                                                />

                                            </div>

                                            <br />
                                            <button type="submit" className="btn-primary btn-block">
                                                <b>Submit!</b>
                                            </button>
                                        </form>
                                        <p>&nbsp;</p>
                                    </div>
                                ) : (
                                    <div />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>

            </div>
        );
    }
}
