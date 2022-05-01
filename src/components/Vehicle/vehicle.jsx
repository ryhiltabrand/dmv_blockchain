import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Web3 from "web3";


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

            v: null,
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

    titleCar = (vin, year, model, make) => {
        this.state.vehicle.methods
            .TitleVehicle(
                Web3.utils.asciiToHex(vin),
                year,
                model,
                make,
                this.state.account,
            )
            .send({ from: this.state.account })
            .on("transactionHash", (hash) => {
                this.setState({
                    loading: false,
                });
                window.location.reload();
            })
            .on("error", (e) => {
                window.alert("Error");
                this.setState({ loading: false });
            });
    }

    async viewCar(vin) {
        console.log(Web3.utils.asciiToHex(vin))
        const vehicle = this.state.vehicle.methods.returnVins(Web3.utils.asciiToHex(vin)).call().then((results => {
            this.setState({ v: Object.values(results) })
        }))

        //const vehicle  = await this.state.methods.vehicleMap(Web3.utils.asciiToHex(vin).call())

    }

    TransferCar = (vin, pub) => {
        this.state.vehicle.methods.transferVehicle(Web3.utils.asciiToHex(vin), pub).send({ from: this.state.account }).on("transactionHash", (hash) => {
            this.setState({
                loading: false,
            });
            window.location.reload();
        }).on("error", (e) => {
            window.alert("Error");
            this.setState({ loading: false })
        })
    }

    RegisterCar = (vin) => {
        this.state.vehicle.methods.RegisterVehicle(vin, '2022').send({ from: this.state.account }).on("transactionHash", (hash) => {
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
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                const vin = this.vin.value;
                                                this.viewCar(vin)
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

                                            </div>

                                            <br />
                                            <button type="submit" className="btn-primary btn-block">
                                                <b>Submit!</b>
                                            </button>
                                        </form>
                                        <p>&nbsp;</p>

                                        {this.state.v !== null ? (
                                            <div>
                                                <div></div>
                                                <thead style={{ fontSize: "12px" }} >
                                                    <tr>
                                                        <th>Owner</th>
                                                        <td>{this.state.v[0]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Vin</th>
                                                        <td>{Web3.utils.hexToAscii(this.state.v[1]).substring(0, 16)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Car Year</th>
                                                        <td>{this.state.v[2]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Make</th>
                                                        <td>{this.state.v[3]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Model</th>
                                                        <td>{this.state.v[4]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Registration Year</th>
                                                        <td>{this.state.v[5]}</td>
                                                    </tr>

                                                </thead>
                                                {this.state.v[4] !== "2021" ? (
                                                    <div>
                                                        <div style={{color: "red"}}>REGISTRATION EXPIRED</div>
                                                        <Button variant="warning" onClick={() =>this.RegisterCar(this.state.v[0])}>Register Car</Button>
                                                    </div>
                                                ): (
                                                    <div />
                                                )}
                                            </div>

                                        ) : (
                                            <div />
                                        )}
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
                                        <p>&nbsp;</p>
                                    </div>
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
                                                const year = this.year.value;
                                                const make = this.make.value;
                                                const model = this.model.value;
                                                this.titleCar(vin, year, make, model)
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
                                                    id="year"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.year = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="Cars year..."
                                                    required
                                                />
                                                <input
                                                    id="make"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.make = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="Cars Make..."
                                                    required
                                                />
                                                <input
                                                    id="model"
                                                    type="text"
                                                    ref={(input) => {
                                                        this.model = input;
                                                    }}
                                                    className="form-control text-monospace"
                                                    placeholder="Cars Model..."
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
