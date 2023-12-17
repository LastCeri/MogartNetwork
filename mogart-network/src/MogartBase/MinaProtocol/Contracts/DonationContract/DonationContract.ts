import { SmartContract, method, PublicKey, UInt64, DeployArgs, Permissions, state, State } from 'o1js';

export class DonationContract extends SmartContract {

  @state(UInt64) totalDonationAmount = State<UInt64>()

    deploy(args: DeployArgs) {
        super.deploy(args);
        this.totalDonationAmount.set(UInt64.zero);
    }

    @method donate(amount: UInt64, recipient: PublicKey) {
      const zeroUInt64 = UInt64.from(0);

      if (amount.equals(zeroUInt64)) {
          throw new Error('Amount must be greater than zero');
      }
        this.token.send({
            from: this.sender,
            to: recipient,
            amount
        });

        let totalAmount = this.totalDonationAmount.get();
        this.totalDonationAmount.set(totalAmount.add(amount)); 

        this.emitEvent('donated', { donor: this.sender, amount, recipient });
    }
}
