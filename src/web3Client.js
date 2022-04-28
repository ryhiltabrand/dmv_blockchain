import Web3 from "web3"
import Services from './eth/contracts/Service.json'
export const init = async () => {
    let Provider = window.etherium
    const web3 = new Web3(Provider)
    const networkId = await web3.eth.net.getId();
    const serviceContract = new Web3.eth.Contract(Services.abi, Services.networks[networkId].address)
}