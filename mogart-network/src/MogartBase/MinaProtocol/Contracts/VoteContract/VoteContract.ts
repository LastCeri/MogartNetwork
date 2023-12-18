import { SmartContract, method, PublicKey, UInt64, State, state, Struct, prop, Bool } from 'o1js';

class Vote extends Struct {
  @prop voterPublicKey: PublicKey;
  @prop choice: Bool;

  constructor(voterPublicKey: PublicKey, choice: Bool) {
    super({ voterPublicKey, choice });
  }
}

class Poll extends Struct {
  @prop pollId: UInt64;
  @prop votes: Vote[];

  constructor(pollId: UInt64, votes: Vote[]) {
    super({ pollId, votes });
  }
}

export class VotingContract extends SmartContract {
  @state(Poll) polls = State<Poll[]>();

  constructor(publicKey: PublicKey) {
    super(publicKey);
    this.polls.set(new State<Poll[]>([]));
  }

  @method createPoll(pollId: UInt64) {
    let currentPolls = this.polls.get();
    currentPolls.push(new Poll(pollId, []));
    this.polls.set(new State<Poll[]>(currentPolls));
  }

  @method vote(pollId: UInt64, voterPublicKey: PublicKey, choice: Bool) {
    let currentPolls = this.polls.get();
    let poll = currentPolls.find(p => p.pollId.equals(pollId));

    if (poll) {
      poll.votes.push(new Vote(voterPublicKey, choice));
      this.polls.set(new State<Poll[]>(currentPolls));
    }
  }
}
