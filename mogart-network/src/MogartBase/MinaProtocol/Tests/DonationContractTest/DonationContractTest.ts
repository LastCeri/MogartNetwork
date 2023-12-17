import { DonationContract } from '../../Contracts/DonationContract/DonationContract';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, UInt64 } from 'o1js';

let proofsEnabled = false;

describe('Mogart Network Donation Contract', () => {
  let deployer: PrivateKey;
  let userOne: PrivateKey;
  let userTwo: PrivateKey;
  let zkapp: PrivateKey;
  let donation: DonationContract;
  let verificationKey: {
    data: string;
    hash: Field;
  };

  beforeAll(async () => {
    const res = await DonationContract.compile();
    verificationKey = res.verificationKey;

    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);

    deployer = Local.testAccounts[0].privateKey;
    userOne = Local.testAccounts[1].privateKey;
    userTwo = Local.testAccounts[2].privateKey;
    zkapp = PrivateKey.random();
    donation = new DonationContract(zkapp.toPublicKey());
  });

  it('Can deploy the Donation contract!', async () => {
    const txn = await Mina.transaction(deployer.toPublicKey(), () => {
      AccountUpdate.fundNewAccount(deployer.toPublicKey());
      donation.deploy({ verificationKey, zkappKey: zkapp });
    });

    await txn.prove();
    await txn.sign([deployer, zkapp]).send();
    expect(donation.totalDonationAmount.get()).toEqual(UInt64.zero);
  });

  it('Can donate!', async () => {
    const amount = UInt64.from(40);
    const tx = await Mina.transaction(userOne.toPublicKey(), () => {
      donation.donate(amount, userTwo.toPublicKey());
    });

    await tx.prove();
    await tx.sign([userOne]).send();
    expect(donation.totalDonationAmount.get()).toEqual(amount);
  });

});
