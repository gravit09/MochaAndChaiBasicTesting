const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
  let Token;
  let token;
  let deployer;
  let addr1;
  let addr2;

  // Before each test, deploy a new Token contract
  beforeEach(async function () {
    [deployer, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
  });

  it("Should set the correct name and symbol", async function () {
    expect(await token.name()).to.equal("Phala");
    expect(await token.symbol()).to.equal("phl");
  });

  it("Should allow the deployer to mint tokens", async function () {
    await token.connect(deployer).mintToken(100);
    expect(await token.balances(deployer.address)).to.equal(100);
  });

  it("Should not allow non-deployer to mint tokens", async function () {
    await expect(token.connect(addr1).mintToken(100)).to.be.revertedWith(
      "Not the contract owner"
    );
  });

  it("Should return the correct balance of an account", async function () {
    await token.connect(deployer).mintToken(100);
    expect(await token.balancesOf(deployer.address)).to.equal(100);
    expect(await token.balancesOf(addr1.address)).to.equal(0);
  });

  it("Should allow transfer of tokens between accounts", async function () {
    await token.connect(deployer).mintToken(100);
    await token.connect(deployer).transfer(50, addr1.address);

    expect(await token.balancesOf(deployer.address)).to.equal(50);
    expect(await token.balancesOf(addr1.address)).to.equal(50);
  });

  it("Should fail transfer if sender has insufficient balance", async function () {
    await expect(
      token.connect(addr1).transfer(50, addr2.address)
    ).to.be.revertedWith("Insufficient balance");
  });
});
