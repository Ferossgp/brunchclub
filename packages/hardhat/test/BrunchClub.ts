import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('BrunchClub', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBrunchClubFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners()

    const BrunchClub = await ethers.getContractFactory('BrunchClub')

    const brunchClub = await BrunchClub.deploy('0x4200000000000000000000000000000000000021')

    return { brunchClub, owner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should have correct default message', async function () {
      const { brunchClub, owner } = await loadFixture(deployBrunchClubFixture)

      expect(await brunchClub.owner()).to.equal(owner.address)
    })
  })

  describe('Test match system', function () {
    it('Should add new match', async function () {
      const { brunchClub, owner, otherAccount } = await loadFixture(deployBrunchClubFixture)

      expect((await brunchClub.getMatches()).length).to.equal(0)
      await brunchClub.addMatch(owner.address, otherAccount.address)
      expect((await brunchClub.getMatches()).length).to.equal(1)
    })

    it('Should add new user', async function () {
      const { brunchClub, otherAccount } = await loadFixture(deployBrunchClubFixture)

      expect((await brunchClub.getUsers()).length).to.equal(0)
      await brunchClub.register(otherAccount.address)
      expect((await brunchClub.getUsers()).length).to.equal(1)
    })

    it('Should return user', async function () {
      const { brunchClub, owner } = await loadFixture(deployBrunchClubFixture)

      expect((await brunchClub.getUsers()).length).to.equal(0)
      const tx1 = await brunchClub.register(owner.address)
      await tx1.wait()

      const tx = await brunchClub.updateProfileDescription('test')
      await tx.wait()

      expect((await brunchClub.getUsers()).length).to.equal(1)
      expect((await brunchClub.getUser(owner.address)).description).to.equal('test')
    })

    it('Should reject a match', async function () {
      const { brunchClub, owner, otherAccount } = await loadFixture(deployBrunchClubFixture)

      expect((await brunchClub.getMatches()).length).to.equal(0)
      await brunchClub.addMatch(owner.address, otherAccount.address)
      expect((await brunchClub.getMatches()).length).to.equal(1)
      await brunchClub.rejectMatch(otherAccount.address)
      expect((await brunchClub.getMatches()).length).to.equal(0)
    })

    it('Should accept a match', async function () {
      const { brunchClub, owner, otherAccount } = await loadFixture(deployBrunchClubFixture)

      expect((await brunchClub.getMatches()).length).to.equal(0)
      await brunchClub.addMatch(owner.address, otherAccount.address)

      expect((await brunchClub.getMatches()).length).to.equal(1)
      expect((await brunchClub.getMatches())[0][3]).to.equal(false)

      await brunchClub.acceptMatch(otherAccount.address)
      expect((await brunchClub.getMatches()).length).to.equal(1)
      expect((await brunchClub.getMatches())[0][3]).to.equal(false)

      await brunchClub.connect(otherAccount).acceptMatch(owner.address)
      expect((await brunchClub.getMatches())[0][3]).to.equal(true)
    })

    it('make the attestation', async function () {
      const { brunchClub, owner, otherAccount } = await loadFixture(deployBrunchClubFixture)

      const res = await brunchClub.attestStatement(
        '0x1883d7a418f73d92bcf3160c13fe18cfd53303cd7918e891b88da8ec00ae8b48',
        owner.address,
        otherAccount.address,
        'test'
      )

      console.log(res)
    })
  })
})
