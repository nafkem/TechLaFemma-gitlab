// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Import the necessary libraries and interfaces
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NatureDefenders is ERC721, Ownable, AccessControl, ReentrancyGuard {
    using SafeMath for uint256;

    // Declare variables and mappings
    uint256 private tokenId;
    uint256 private fundingGoal;
    uint256 private contributionFeePercentage;
    uint256 private nftTradingFeePercentage;
    mapping(address => uint256) private balances;
    mapping(address => bool) private projectVerified;
    mapping(address => mapping(uint256 => uint256)) private donationHistory;

    // Define the roles for funders and project administrators
    bytes32 public constant FUNDER_ROLE = keccak256("FUNDER_ROLE");
    bytes32 public constant PROJECT_ADMIN_ROLE = keccak256("PROJECT_ADMIN_ROLE");

    // Event to notify when a contribution is made
    event Contribution(address indexed funder, uint256 amount);

    // Event to notify when an NFT is minted
    event NFTMinted(address indexed receiver, uint256 tokenId);

    // Event to notify when a project is verified
    event ProjectVerified(address indexed project);

    // Constructor to set up roles and initial parameters
    constructor() ERC721("NatureDefenders", "NDF") {}

    // Function to initialize contract parameters and roles
    function initialize(uint256 _fundingGoal) external {
        require(!initialized, "Contract already initialized.");
        fundingGoal = _fundingGoal;
        tokenId = 0;
        contributionFeePercentage = 1; // 1% contribution fee by default
        nftTradingFeePercentage = 2; // 2% NFT trading fee by default

        // Grant the contract owner the project admin role
        _setupRole(PROJECT_ADMIN_ROLE, msg.sender);
        initialized = true;
    }
    bool initialized;

    // Function to contribute funds
    function contribute() external payable nonReentrant {
        require(msg.value > 0, "Please send a valid contribution amount.");

        uint256 contributionAmount = msg.value;
        uint256 contributionFee = contributionAmount.mul(contributionFeePercentage).div(100);
        uint256 contributionAmountAfterFee = contributionAmount.sub(contributionFee);

        balances[msg.sender] += contributionAmountAfterFee;

        emit Contribution(msg.sender, contributionAmountAfterFee);

        if (address(this).balance >= fundingGoal) {
            // Mint an NFT for the funder
            _safeMint(msg.sender, tokenId);
            emit NFTMinted(msg.sender, tokenId);

            tokenId++;
        }

        // Add donation to the donation history
        donationHistory[msg.sender][tokenId] = contributionAmount;
    }

    // Function to verify a project (only available to project admins)
    function verifyProject(address project) external onlyRole(PROJECT_ADMIN_ROLE) {
        require(!projectVerified[project], "Project already verified.");

        projectVerified[project] = true;

        emit ProjectVerified(project);
    }

    // Function to check if a project is verified
    function isProjectVerified(address project) external view returns (bool) {
        return projectVerified[project];
    }

    // Function to retrieve the total balance of the contract
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Function to retrieve the balance of a specific funder
    function getFunderBalance(address funder) external view returns (uint256) {
        return balances[funder];
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    //Function to withdraw funds from the contract (only available to the contract owner)
    function withdrawFunds() external onlyOwner {
        require(address(this).balance > 0, "No funds available for withdrawal.");

        address payable ownerAddress = payable(owner());
        ownerAddress.transfer(address(this).balance);
    }

    // Function to set the contribution fee percentage (only available to the contract owner)
    function setContributionFeePercentage(uint256 feePercentage) external onlyOwner {
        require(feePercentage <= 100, "Fee percentage cannot exceed 100%.");

        contributionFeePercentage = feePercentage;
    }

    // Function to set the NFT trading fee percentage (only available to the contract owner)
    function setNftTradingFeePercentage(uint256 feePercentage) external onlyOwner {
        require(feePercentage <= 100, "Fee percentage cannot exceed 100%.");

        nftTradingFeePercentage = feePercentage;
    }

    // Function to calculate the fee amount for a given value and fee percentage
    function calculateFeeAmount(uint256 value, uint256 feePercentage) internal pure returns (uint256) {
        return value.mul(feePercentage).div(100);
    }

    // Function to calculate the amount after deducting a fee
    function calculateAmountAfterFee(uint256 value, uint256 feePercentage) internal pure returns (uint256) {
        uint256 feeAmount = calculateFeeAmount(value, feePercentage);
        return value.sub(feeAmount);
    }

    // Function to calculate the fee amount for a contribution
    function calculateContributionFee(uint256 contributionAmount) external view returns (uint256) {
        return calculateFeeAmount(contributionAmount, contributionFeePercentage);
    }

    // Function to calculate the amount after deducting the fee for a contribution
    function calculateContributionAmountAfterFee(uint256 contributionAmount) external view returns (uint256) {
        return calculateAmountAfterFee(contributionAmount, contributionFeePercentage);
    }

    // Function to calculate the fee amount for an NFT trade/sale
    function calculateNftTradingFee(uint256 nftValue) external view returns (uint256) {
        return calculateFeeAmount(nftValue, nftTradingFeePercentage);
    }

    // Function to calculate the amount after deducting the fee for an NFT trade/sale
    function calculateNftAmountAfterFee(uint256 nftValue) external view returns (uint256) {
        return calculateAmountAfterFee(nftValue, nftTradingFeePercentage);
    }

    // Function to retrieve the donation history of a funder
    function getDonationHistory(address funder, uint256 _tokenId) external view returns (uint256) {
        return donationHistory[funder][tokenId];
    }
}
