import { ethers } from "ethers";
import abi from "../../contract/naturedefender.json";


const contractAddr = "0x85271cb4A12a0BB18c82c5BC7d7F8752B68b79cE";

const getContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum); // A connection to the Ethereum network
    var signer = await provider.getSigner(); // Holds your private key and can sign things
    const Contract = new ethers.Contract(contractAddr, abi, signer);
    console.log(Contract)
    return Contract;
  } else {
    alert("No wallet detected");
  }
};

export async function createProject(
    name, 
    description,
    goal,
    amount
    ) {
    const naturedefenderContract = await getContract();
    try {
        var tx = await naturedefenderContract.projects(
            name,
            description,
            goal,
            amount

          );
          await tx.wait();
          console.log(tx.hash)
    } catch (error) {
        console.log(error);
    }
  }

  export async function getDonor(name) {
    const naturedefenderContract = await getContract();
    try {
        var tx = await naturedefenderContract.donateToProject(name);
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
}

