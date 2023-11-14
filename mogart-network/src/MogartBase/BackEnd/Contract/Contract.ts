import { Donation } from './Donation.ts';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, MerkleTree, UInt32, UInt64 } from 'o1js';


let proofsEnabled = false;

describe('Donation Contract', () => {
  let deployer: PrivateKey
  let userOne: PrivateKey
  let userTwo: PrivateKey
  let zkapp: PrivateKey
  let donation: Donation
  let verificationKey: {
    data: string
    hash: Field
  }

  beforeAll(async () => {
    const res = await Donation.compile();
    verificationKey = res.verificationKey

    const Local = Mina.LocalBlockchain({ proofsEnabled })
    Mina.setActiveInstance(Local)

    deployer = Local.testAccounts[0].privateKey
    userOne = Local.testAccounts[1].privateKey
    userTwo = Local.testAccounts[2].privateKey
    zkapp = PrivateKey.random()
    donation = new Donation(zkapp.toPublicKey())
  });

  it('Can deploy the Donation contract!', async () => {
    const txn = await Mina.transaction(deployer.toPublicKey(), () => {
      AccountUpdate.fundNewAccount(deployer.toPublicKey());
      donation.deploy({ verificationKey, zkappKey: zkapp });
    });

    await txn.prove();

    await txn.sign([deployer, zkapp]).send();

    expect(donation.totalDonationAmount.get()).toEqual(UInt64.zero)
  });

  it('Can donate!', async () => {
    const amount = UInt64.from(40)
    const tx = await Mina.transaction(userOne.toPublicKey(), () => {
      AccountUpdate.fundNewAccount(deployer.toPublicKey());
      donation.donate(amount)
    })

    await tx.prove()

    await tx.sign([userOne]).send()

    expect(donation.totalDonationAmount.get()).toEqual(amount)
  });

});