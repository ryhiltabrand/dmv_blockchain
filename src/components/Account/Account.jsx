import React, { Component } from "react";
var _ = require("lodash");
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: this.props.account,
      services: this.props.services,
      user: this.props.user,
      web3: this.props.web3,
      info: this.props.info,
      information: [],
      loading: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      account: props.account,
      services: props.services,
      user: props.user,
      web3: props.web3,
      info: props.info,
    });
    this.getinfo();
    this.setState({ loading: true });
  }

  user = () => {
    console.log(this.state.user);
    console.log(
      this.state.user.methods.getOwner().send({ from: this.state.account })
    );
  };

  async loadInformation() {
    const accounts = await this.state.web3.eth.getAccounts();
    console.log(accounts);
  }

  captureRegistration = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        rbuffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
      });
      console.log("buffer", this.state.rbuffer);
    };
  };
  captureTitle = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        tbuffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
      });
      console.log("buffer", this.state.tbuffer);
    };
  };

  uploadFile = (name, dob, sa, vehicle) => {
    console.log("Submitting file to IPFS...");
    console.log(this.state.buffer);
    let Death = ["QmVUjJsi7cx1a4dAeGZQ6PMtTMjXmMr3TxvdZYbhZTB1sG", ""];
    let Marriage = ["QmYHyKpvedFNjF2kqfDr7ThB85KTNM48VX3MfeUjEtHheL", ""];
    let Divorce = ["Qmf1mn34MvDHTB2iiM4Ze3vvEiNLUR6fYNxSZynxgJuaqP", ""];
    let married;
    let divorced;
    let dead;
    if (0 + Math.random() * (1 - 0) > 0.5) {
      married = 0;
    } else {
      married = 1;
    }
    if (married == 1 && 0 + Math.random() * (1 - 0) < 0.3) {
      divorced = 0;
    } else {
      divorced = 1;
    }
    if (0 + Math.random() * (1 - 0) < 0.1) {
      dead = 0;
    } else {
      dead = 1;
    }

    let license = Math.random()
      .toString(36)
      .slice(2);
    var registration;
    var title;
    console.log(Death[dead], Marriage[married], Divorce[divorced]);
    // Add file to the IPFS

    ipfs
      .add(this.state.rbuffer)
      .then((result) => {
        return (registration = Object.values(result)[0]);
      })
      .then(
        ipfs.add(this.state.tbuffer).then((result) => {
          title = Object.values(result)[0];
          console.log(registration, title);
          this.state.services.methods
            .uploadInformation(
              name,
              dob,
              registration,
              sa,
              license,
              vehicle,
              title
            )
            .send({ from: this.state.account })
            .on("transactionHash", (hash) => {
              this.setState({
                loading: false,
                type: null,
                name: null,
              });
              window.location.reload();
            })
            .on("error", (e) => {
              window.alert("Error");
              this.setState({ loading: false });
            });
        })
      );
  };

  async getinfo() {
    if (this.state.services !== null) {
      const infoCount = await this.state.services.methods.infoCount().call();
      this.setState({ infoCount: infoCount });
      for (var i = 1; i <= infoCount; i++) {
        const information = await this.state.services.methods
          .information(i)
          .call();
        let a = Object.values(information);
        console.log(information);
        console.log(this.state.account.trim());
        console.log(a[a.length - 1].trim());
        let retAccount = a[a.length - 1].normalize("NFKC");
        let account = this.state.account.normalize("NFKC");
        console.log(retAccount.split(""));
        console.log(account.split(""));
        console.log(this.state);
        if (retAccount.toLowerCase() == account.toLowerCase()) {
          console.log(information);
          this.setState({
            information: [...this.state.information, information],
          });
        }
      }
    }
  }

  render() {
    return (
      <div style={{ width: "70%", margin: "0 auto", padding: "50px" }}>
        <div
          style={{ background: "white", borderRadius: "10px", padding: "40px" }}
        >
          {this.state.user !== null ? (
            <>
              <p>&nbsp;</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const name = this.name.value;
                  const dob = this.dob.value;
                  const sa = this.sa.value;
                  const vehicle = this.vehicle.value;
                  this.uploadFile(name, dob, sa, vehicle);
                }}
              >
                <div className="form-group">
                  <br></br>
                  <input
                    id="infoName"
                    type="text"
                    ref={(input) => {
                      this.name = input;
                    }}
                    className="form-control text-monospace"
                    placeholder="First and Last Name..."
                    required
                  />
                  <input
                    id="infoDOB"
                    type="text"
                    ref={(input) => {
                      this.dob = input;
                    }}
                    className="form-control text-monospace"
                    placeholder="Date of Birth..."
                    required
                  />
                  <input
                    id="infoSA"
                    type="text"
                    ref={(input) => {
                      this.sa = input;
                    }}
                    className="form-control text-monospace"
                    placeholder="Street Address..."
                    required
                  />
                  <input
                    id="infoVehicle"
                    type="text"
                    ref={(input) => {
                      this.vehicle = input;
                    }}
                    className="form-control text-monospace"
                    placeholder="Vehicle..."
                    required
                  />
                </div>

                <div>
                  Registration:{" "}
                  <input
                    type="file"
                    onChange={this.captureRegistration}
                    className="text-white text-monospace"
                  />
                </div>
                <div>
                  Title:{" "}
                  <input
                    type="file"
                    onChange={this.captureTitle}
                    className="text-white text-monospace"
                  />
                </div>
                <button type="submit" className="btn-primary btn-block">
                  <b>Upload!</b>
                </button>
              </form>
              <p>&nbsp;</p>
            </>
          ) : (
            <div></div>
          )}
        </div>
        {this.state.information.map((file, key) => {
          return (
            <div
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "40px",
              }}
            >
              <thead style={{ fontSize: "12px" }} key={key}>
                <tr>
                  <th>Name</th>
                  <td>{file.name}</td>
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <td>{file.dob}</td>
                </tr>
                <tr>
                  <th>Registration</th>
                  <td><a href={`https://ipfs.infura.io/ipfs/${file.registration}`}>Link</a></td>
                </tr>
                <tr>
                  <th>Street Address</th>
                  <td>{file.streetAddress}</td>
                </tr>
                <tr>
                  <th>License Number</th>
                  <td>{file.license}</td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td><a href={`https://ipfs.infura.io/ipfs/${file.title}`}>Link</a></td>
                </tr>
                <tr>
                    <th>Key</th>
                    <td>{file.person}</td>
                </tr>

                <tr>
                  
                </tr>
              </thead>
            </div>
          );
        })}
      </div>
    );
  }
}
