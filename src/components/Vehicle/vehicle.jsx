import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Web3 from "web3";
import VehicleServices from '../../eth/contracts/VehicleServices.json'
import OwnerServices from '../../eth/contracts/VehicleOwner.json'

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
            reg: this.props.registration,
            own: this.props.owner,
            loading: false,
            vAddress: null,

            v: null,
            r: null,
            tester: null,
            o: null,
        };
    }


    componentWillReceiveProps(props) {
        this.setState({
            account: props.account,
            web3: props.web3,
            vehicle: props.vehicle,
            reg: props.registration,
            own: props.owner,
            loading: true
        });
    }

    titleCar(vin, year, model, make) {
        this.state.vehicle.methods
            .TitleVehicle(
                Web3.utils.asciiToHex(vin),
                year,
                model,
                make,
                this.state.account,
            )
            .send({ from: this.state.account , value: this.state.web3.utils.toWei('0.03', 'ether') })
            .on("transactionHash", (hash) => {
                this.setState({
                    loading: false,
                });
            })
            .on("error", (e) => {
                window.alert("You do not access to this");
                this.setState({ loading: false });
            })
        this.setOwner(vin)
    }

    async setOwner(vin) {
        const networkId = await this.state.web3.eth.net.getId();

        this.state.own.methods
            .OriginalOwner(
                Web3.utils.asciiToHex(vin), OwnerServices.networks[networkId].address).send({ from: this.state.account })
            .on("transactionHash", (hash) => {
                this.setState({
                    loading: false,
                });
                window.location.reload();
            })

    }

    async viewCar(vin) {
        console.log(Web3.utils.asciiToHex(vin))
        this.state.vehicle.methods.returnVins(Web3.utils.asciiToHex(vin)).call().then((results => {
            this.setState({ v: Object.values(results) })
        }))

        //const vehicle  = await this.state.methods.vehicleMap(Web3.utils.asciiToHex(vin).call())

    }
    async viewOwner(vin) {
        console.log(Web3.utils.asciiToHex(vin))
        this.state.own.methods.getVowner(Web3.utils.asciiToHex(vin)).call().then((results => {
            this.setState({ o: Object.values(results) })
        }))

        //const vehicle  = await this.state.methods.vehicleMap(Web3.utils.asciiToHex(vin).call())

    }

    TransferCar = (vin, pub) => {
        this.state.own.methods.changeOwner(Web3.utils.asciiToHex(vin), pub).send({ from: this.state.account, value: this.state.web3.utils.toWei('0.03', 'ether')}).on("transactionHash", (hash) => {
            this.setState({
                loading: false,
            });
            window.location.reload();
        }).on("error", (e) => {
            window.alert("You do not access to this");
            this.setState({ loading: false })
        })
    }

    async RegisterCar(vin) {
        const networkId = await this.state.web3.eth.net.getId();
        this.state.reg.methods.registerCar(vin, '2022', OwnerServices.networks[networkId].address).send({
            from: this.state.account,
            value: this.state.web3.utils.toWei('0.03', 'ether')
        }).on("transactionHash", (hash) => {
            this.setState({
                loading: false,
            });
            window.location.reload();
        }).on("error", (e) => {
            window.alert("You do not access to this");
            this.setState({ loading: false })
        })
    }

    async viewReg(vin) {
        console.log(Web3.utils.asciiToHex(vin))
        this.state.reg.methods.getRegistration(Web3.utils.asciiToHex(vin)).call().then((results => {
            this.setState({ r: Object.values(results) })
        }))
    }

    async testv(vin) {
        //console.log(Web3.utils.asciiToHex(vin))
        const networkId = await this.state.web3.eth.net.getId();
        this.state.reg.methods.test(VehicleServices.networks[networkId].address, Web3.utils.asciiToHex(vin)).call().then((results => {

            console.log(results)
            this.setState({ tester: Object.values(results) })
        }))
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
                        })}>VIN Lookup</Button>{' '}
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
                                                this.viewReg(vin)
                                                this.viewOwner(vin)
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

                                        {this.state.v !== null && this.state.r !== null && this.state.o !== null ? (
                                            <div>
                                                <div></div>
                                                <thead style={{ fontSize: "12px" }} >
                                                    <tr>
                                                        <th>Owner</th>
                                                        <td>{this.state.o[1]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Vin</th>
                                                        <td>{Web3.utils.hexToAscii(this.state.v[2]).substring(0, 16)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Car Year</th>
                                                        <td>{this.state.v[3]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Make</th>
                                                        <td>{this.state.v[4]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Model</th>
                                                        <td>{this.state.v[5]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Registration Year</th>
                                                        <td>{this.state.r[2]}</td>
                                                    </tr>

                                                </thead>
                                                {this.state.r[2] !== "2022" ? (
                                                    <div>
                                                        <div style={{ color: "red" }}>REGISTRATION EXPIRED</div>
                                                        <Button variant="warning" onClick={() => this.RegisterCar(this.state.v[2])}>Register Car</Button>
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
