const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Addition Contract", function () {
  let Addition;
  let addition;

  beforeEach(async function () {
    Addition = await ethers.getContractFactory("Addition");
    addition = await Addition.deploy();
  });

  it("Should return the correct sum when adding two positive numbers", async function () {
    const result = await addition.add(5, 3);
    expect(result).to.equal(8);
  });

  it("Should return 0 when adding zero to zero", async function () {
    const result = await addition.add(0, 0);
    expect(result).to.equal(0);
  });

  it("Should return correct sum when adding a number with zero", async function () {
    const result = await addition.add(10, 0);
    expect(result).to.equal(10);
  });
});
