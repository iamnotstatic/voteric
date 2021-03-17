const Election = artifacts.require('Election');
const { expectThrow, expectEvent } = require('./utils.js');

contract('Election  contract Tests', async (accounts) => {
  const [owner, voterOne, voterTwo] = accounts;

  let getCandidate = async (id) => {
    let candidate = await this.contract.candidates.call(id);

    let identifier = candidate[0];
    let name = candidate[1];
    let voteCount = candidate[2];

    return { id: identifier, name, voteCount };
  };

  beforeEach(async () => {
    this.contract = await Election.deployed();
  });

  describe('contructor() test', () => {
    it('election name should be set in contructor', async () => {
      let name = await this.contract.electionName.call();
      assert.notEqual(name, '');
    });

    it('should not have any candidates', async () => {
      let candidate = await getCandidate(99);
      assert.equal(candidate.id, 0);
    });
  });

  describe('addCandidate() tests', () => {
    it('non owner can not add candidates', async () => {
      let status = this.contract.addCandidate('Abdulfatai', { from: voterOne });
      await expectThrow(status);
    });

    it('owner can add candidates', async () => {
      await this.contract.addCandidate('Abdulfatai', { from: owner });
    });

    it('candidate info check', async () => {
      let candidate = await getCandidate(1);
      assert.equal(candidate.id, 1);
      assert.equal(candidate.name, 'Abdulfatai');
      assert.equal(candidate.voteCount, 0);
    });
  });

  describe('authorize() tests', async () => {
    it('non owner can not authorize voter', async () => {
      let status = this.contract.authorize(voterOne, { from: voterTwo });
      await expectThrow(status);
    });

    it('owner can authorize voter', async () => {
      await this.contract.authorize(voterOne, { from: owner });
    });
  });

  describe('vote() tests', () => {
    it('non authorized users can not vote', async () => {
      let status = this.contract.vote(1, { from: owner });
      await expectThrow(status);
    });

    it('authorized voters can vote', async () => {
      let status = this.contract.vote(1, { from: voterOne });
      await expectEvent(status, 'Vote');
    });

    it('candidate votes should be updated', async () => {
      let candidate = await getCandidate(1);
      assert.equal(candidate.voteCount, 1);
    });
  });

  describe('end() Election tests', async () => {
    it('non owner can not end election', async () => {
      let status = this.contract.end({ from: voterOne });
      expectThrow(status);
    });

    it('owner should be able to end election', async () => {
      await this.contract.end({ from: owner });
    });
  });
});
