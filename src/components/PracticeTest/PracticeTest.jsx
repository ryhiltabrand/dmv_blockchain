import React, { Component } from "react";

export default class PracticeTest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: this.props.account,
            practice_test: this.props.practice_test,
            user: this.props.user,
            web3: this.props.web3,
            info: [],
            loading: false,
        };
    }


    componentWillReceiveProps(props) {

        this.setState({
            account: props.account,
            user: props.user,
            web3: props.web3,
            info: props.info,
            practice_test: props.practice_test
        });
    }


    submit_test = (event) => {
        event.preventDefault();

        console.log(this.state.user)
        console.log(
            this.state.practice_test.methods.upload_score(this.state.account, 0)
                .send({
                    from: this.state.account,
                    gas: '200000',
                    value: this.state.web3.utils.toWei('0.01', 'ether')
                }).on("transactionHash", (hash) => {
                    let score = Number(event.target.elements.Q1.value) +
                        Number(event.target.elements.Q2.value) +
                        Number(event.target.elements.Q3.value) +
                        Number(event.target.elements.Q4.value) +
                        Number(event.target.elements.Q5.value);
                    alert('Score: ' + score + '/5');
                })
        );
    }


    alert_message(event) {

        event.preventDefault();

        let score = Number(event.target.elements.Q1.value) +
            Number(event.target.elements.Q2.value) +
            Number(event.target.elements.Q3.value) +
            Number(event.target.elements.Q4.value) +
            Number(event.target.elements.Q5.value);

        alert('Score: ' + score + '/5');
        return score;
    }


    render() {
        return (
            <div style={{ width: '70%', margin: '0 auto', padding: '50px' }}>
                <div style={{ background: 'white', borderRadius: '10px', padding: '40px' }}>
                    <h1 style={{ textAlign: 'center' }}>Driver's License Practice Test</h1>

                    <br></br>

                    <div style={{ paddingLeft: '15%', paddingRight: '15%' }}>
                        <form onSubmit={(event) => {
                            //const score = this.alert_message(event);
                            this.submit_test(event);
                        }}>
                            <p><b>1</b>. At a red light, you must:</p>

                            <input name='Q1' value={1} type='radio' /> A: Come to a complete stop
                            <br></br>
                            <input name='Q1' value={0} type='radio' /> B: Yield to oncoming traffic and pedestrians
                            <br></br>
                            <input name='Q1' value={0} type='radio' /> C: Proceed if the way is clear

                            <br></br>
                            <br></br>

                            <p>
                                <b>2</b>. What is the recommended way to hold the steering wheel:
                            </p>

                            <input name='Q2' value={0} type='radio' /> A: 10 o'clock and 2 o'clock
                            <br></br>
                            <input name='Q2' value={1} type='radio' /> B: 8 o'clock and 4 o'clock
                            <br></br>
                            <input name='Q2' value={0} type='radio' /> C: 9 o'clock and 3 o'clock

                            <br></br>
                            <br></br>

                            <p>
                                <b>3</b>. If you are required to complete a driver improvement clinic, you must do so within __ days:
                            </p>

                            <input name='Q3' value={0} type='radio' /> A: 30
                            <br></br>
                            <input name='Q3' value={0} type='radio' /> B: 60
                            <br></br>
                            <input name='Q3' value={1} type='radio' /> C: 90

                            <br></br>
                            <br></br>

                            <p>
                                <b>4</b>. Generally, with a learner's permit, you are restricted to driving with 1 other person __ years of age:
                            </p>

                            <input name='Q4' value={0} type='radio' /> A: 18
                            <br></br>
                            <input name='Q4' value={1} type='radio' /> B: 21
                            <br></br>
                            <input name='Q4' value={0} type='radio' /> C: 20

                            <br></br>
                            <br></br>

                            <p>
                                <b>5</b>. A yellow "x" or diagonal downward arrow above your lane means you should:
                            </p>

                            <input name='Q5' value={0} type='radio' /> A: Yield to traffic entering your lane
                            <br></br>
                            <input name='Q5' value={1} type='radio' /> B: Get out of the lane as soon as safely possible
                            <br></br>
                            <input name='Q5' value={0} type='radio' /> C: Remain in the current lane

                            <br></br>
                            <br></br>

                            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                                <input type='submit' value={'Submit Test'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
