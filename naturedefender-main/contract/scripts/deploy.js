const hre = require("hardhat");

async function main() {

 // Deployment
 const NatureDefenders = await ethers.deployContract("NatureDefenders");
 await NatureDefenders.waitForDeployment();
 console.log(`NatureDefenders  deployed to ${NatureDefenders.target}`);

}
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  





