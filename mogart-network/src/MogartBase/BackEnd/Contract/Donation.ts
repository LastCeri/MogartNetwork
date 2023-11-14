import { SmartContract, state, State, method, PublicKey, UInt64, DeployArgs, Permissions } from 'o1js';


export class Donation extends SmartContract {
  events = {
    'donated': PublicKey,
  }

  @state(UInt64) totalDonationAmount = State<UInt64>()



  deploy(args: DeployArgs) {
    super.deploy(args)

    const permissionToEdit = Permissions.proof()

    this.account.permissions.set({
      ...Permissions.default(),
      editState: permissionToEdit,
      setTokenSymbol: permissionToEdit,
      send: permissionToEdit,
      receive: permissionToEdit,
    })
  }

  init() {
    super.init()
    this.totalDonationAmount.set(UInt64.zero)
  }

  @method donate(amount: UInt64) {

    this.token.send({
      from: this.sender,
      to: this.address,
      amount
    })

    const totalDonationAmount = this.totalDonationAmount.getAndAssertEquals()

    this.totalDonationAmount.set(totalDonationAmount.add(amount))

    this.emitEvent('donated', this.sender)
  }

}