import {
  Field,
  PublicKey,
  Signature,
  Poseidon,
  CircuitString,
  MerkleMapWitness,
  Struct,
} from 'o1js';
import { ZkProgram } from 'o1js/dist/node/lib/proof_system';

export class Constants {
  static fieldToFlagMessagesAccessCommand = Field(11011011);
  static fieldToFlagMessagesVerifyCommand = Field(10011011);
  static fieldToFlagMessagesSendCommand = Field(1010);
}

interface IHashable {
  hash(): Field;
}

class BaseState extends Struct({
  messagerAddress: PublicKey,
  messageContentID: CircuitString,
  allMessagesCounter: Field,
  userMessagesCounter: Field,
  messageBlockHeight: Field,
  deletionBlockHeight: Field,
  edittableBlockHeight: Field,
}) implements IHashable {
  hash(): Field {
    return Poseidon.hash([
      ...this.messagerAddress.toFields(),
      this.messageContentID.hash(),
      this.allMessagesCounter,
      this.userMessagesCounter,
      this.messageBlockHeight,
      this.deletionBlockHeight,
      this.edittableBlockHeight,
    ]);
  }
}

class CommunicationEntity implements IHashable {
  publicKey: PublicKey;
  messageContent: Field;
  chatId: CircuitString;

  constructor(publicKey: PublicKey, messageContent: Field, chatId: CircuitString) {
    this.publicKey = publicKey;
    this.messageContent = messageContent;
    this.chatId = chatId;
  }
  hash(): Field {
    return Poseidon.hash([
      ...this.publicKey.toFields(),
      this.messageContent,
      this.chatId.hash(),
    ]);
  }
}

export class AuthenticationToken implements IHashable {
  publicKey: PublicKey;
  authToken: CircuitString;

  constructor(publicKey: PublicKey, authToken: CircuitString) {
    this.publicKey = publicKey;
    this.authToken = authToken;
  }
  hash(): Field {
    return Poseidon.hash([
      ...this.publicKey.toFields(),
      this.authToken.hash(),
    ]);
  }
}

export class TransitionState extends Struct({
  initialAllMessagesCounter: Field,
  latestAllMessagesCounter: Field,
  initialUsersMessagesCounters: Field,
  latestUsersMessagesCounters: Field,
  initialMessages: Field,
  latestMessages: Field,
  blockHeight: Field,
}) {
  static verifyTransition(computedTransition: TransitionState, recordedTransition: TransitionState) {
    if (computedTransition.hash() !== recordedTransition.hash()) {
      throw new Error('Transition verification failed.');
    }
  }
  hash() {
    throw new Error('Method not implemented.');
  }
}

class MessageProcessor {
  static processMessageTransition(
    signature: Signature,
    messageState: BaseState,
    witnesses: MerkleMapWitness[]
  ): TransitionState {
    const transition = new TransitionState({
      initialAllMessagesCounter: Field(0),
      latestAllMessagesCounter: messageState.allMessagesCounter,
      initialUsersMessagesCounters: Field(0),
      latestUsersMessagesCounters: Field(0), 
      initialMessages: Field(0), 
      latestMessages: Field(0),
      blockHeight: messageState.messageBlockHeight,
    });

    return transition;
  }
}

const MessageModule = ZkProgram({
  name: 'MessagingModule',
  publicInput: TransitionState,

  methods: {
    executeMessageTransition: {
      privateInputs: [
        Signature,
        Field,
        Field,
        Field,
        Field,
        MerkleMapWitness,
        Field,
        Field,
        BaseState,
        MerkleMapWitness,
      ],

      method(
        transition: TransitionState,
        signature: Signature,
        initialAllMessagesCounter: Field,
        initialUsersMessagesCounters: Field,
        latestUsersMessagesCounters: Field,
        initialUserMessagesCounter: Field,
        userMessagesCounterWitness: MerkleMapWitness,
        initialMessages: Field,
        latestMessages: Field,
        messageState: BaseState,
        messageWitness: MerkleMapWitness
      ) {
        const computedTransition = MessageProcessor.processMessageTransition(
          signature,
          messageState,
          [userMessagesCounterWitness, messageWitness]
        );
        TransitionState.verifyTransition(computedTransition, transition);
      },
    },
  },
});
