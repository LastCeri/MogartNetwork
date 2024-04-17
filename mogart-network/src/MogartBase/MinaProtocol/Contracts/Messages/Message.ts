import {
    AccountUpdate,
    Bool,
    DeployArgs,
    Field,
    MerkleMap,
    MerkleMapWitness,
    PublicKey,
    Permissions,
    Poseidon,
    Provable,
    SmartContract,
    State,
    UInt32,
    method,
    state,
} from 'o1js';

export class MessagingContract extends SmartContract {
    @state(PublicKey) adminUser = State<PublicKey>();
    @state(UInt32) totalMessages = State<UInt32>();
    @state(Field) rootMessageMap = State<Field>();

    events = {
        NewMessage: UInt32,
    };

    deploy(deployArgs?: DeployArgs) {
        super.deploy(deployArgs);
        this.account.permissions.set({
            ...Permissions.allImpossible(),
            access: Permissions.proof(),
            editState: Permissions.proof(),
        });
    }

    init() {
        super.init();
        AccountUpdate.createSigned(this.sender);
        const emptyMap = new MerkleMap();
        this.adminUser.set(this.sender);
        this.totalMessages.set(UInt32.zero);
        this.rootMessageMap.set(emptyMap.getRoot());
    }
  
    @method sendMessage(senderPublicKey: PublicKey, recipientPublicKey: PublicKey, message: Field): { updatedRootMessageMap: Field, messageWitness: MerkleMapWitness } {
        AccountUpdate.createSigned(this.sender);
    
        const totalMessages = this.totalMessages.get();
        const currentRootMessageMap = this.rootMessageMap.get();
    
        const senderFields = senderPublicKey.toFields();
        const senderHash = Poseidon.hash(senderFields);
        const recipientFields = recipientPublicKey.toFields();
        const recipientHash = Poseidon.hash(recipientFields);
    
        const messageIdentifier = Poseidon.hash([senderHash, recipientHash, ...message.toFields()]);
    
        let messageMap = new MerkleMap();
        messageMap.set(messageIdentifier, message); 
    
        const updatedRootMessageMap = messageMap.getRoot();
    
        const messageWitness = messageMap.getWitness(messageIdentifier);
    
        this.emitEvent('NewMessage', totalMessages.add(1));
    
        this.totalMessages.set(totalMessages.add(1));
    
        this.rootMessageMap.set(updatedRootMessageMap);
    
        return { updatedRootMessageMap, messageWitness };
    }
    
    @method validateOwnership(messageIdentifier: Field, senderPublicKey: PublicKey, recipientPublicKey: PublicKey, messageWitness: MerkleMapWitness, updatedRootMessageMap: Field): Bool {
        const senderHash = Poseidon.hash(senderPublicKey.toFields());
        const recipientHash = Poseidon.hash(recipientPublicKey.toFields());
        const recalculatedIdentifier = Poseidon.hash([senderHash, recipientHash, messageIdentifier]);
    
        const [computedRoot, computedKey] = messageWitness.computeRootAndKey(recalculatedIdentifier);
    
        if (computedRoot.equals(updatedRootMessageMap) && computedKey.equals(recalculatedIdentifier)) {
            return Bool(true);
        } else {
            return Bool(false);
        }
    }

  }
  