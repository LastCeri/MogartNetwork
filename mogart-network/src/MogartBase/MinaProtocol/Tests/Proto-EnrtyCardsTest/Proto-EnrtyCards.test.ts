import { ItemModule, ItemKey, EntryCardEntity } from '../../../MogartZKBase/ProtoKit-Base/Proto-EnrtyCards';
import { PublicKey, Bool, UInt64, Field } from "o1js";
import assert from 'assert';

describe('ItemModule', () => {
    let module;
    let mockPublicKey;
    let mockTransaction;

    beforeEach(() => {
        module = new ItemModule();
        mockPublicKey = new PublicKey("some-public-key");  // Replace with actual mock public key if needed
        mockTransaction = { sender: { value: mockPublicKey } };
        module.transaction = mockTransaction;
    });

    it('should issue a new entry card', () => {
        const eventId = UInt64.from(1);
        const validFrom = UInt64.from(Date.now());
        const validTo = UInt64.from(Date.now() + 10000);

        module.issueEntryCard(eventId, validFrom, validTo);

        const itemKey = new ItemKey({
            owner: mockPublicKey,
            id: UInt64.from("1") as any 
        });
        const card = module.entryCards.get(itemKey);

        assert(card.isSome.toBoolean(), "Entry card should be issued");
        assert.strictEqual(card.value.eventId.toString(), eventId.toString(), "Event ID should match");
        assert.strictEqual(card.value.validFrom.toString(), validFrom.toString(), "Valid from date should match");
        assert.strictEqual(card.value.validTo.toString(), validTo.toString(), "Valid to date should match");
        assert.strictEqual(card.value.consumed.toBoolean(), false, "Card should not be consumed initially");
    });

    it('should use an entry card', () => {
        const eventId = UInt64.from(1);
        const validFrom = UInt64.from(Date.now() - 1000); 
        const validTo = UInt64.from(Date.now() + 10000);
        const itemId = UInt64.from(1);

        module.issueEntryCard(eventId, validFrom, validTo);

        module.useEntryCard(itemId);

        const itemKey = new ItemKey({
            owner: mockPublicKey,
            id: UInt64.from(itemId) 
        });
        const card = module.entryCards.get(itemKey);

        assert(card.isSome.toBoolean(), "Entry card should exist");
        assert.strictEqual(card.value.consumed.toBoolean(), true, "Card should be marked as consumed after use");
    });

    it('should not allow using an invalid or already used card', () => {
        const eventId = UInt64.from(1);
        const validFrom = UInt64.from(Date.now() - 20000);
        const validTo = UInt64.from(Date.now() - 10000);
        const itemId = UInt64.from(1);

        module.issueEntryCard(eventId, validFrom, validTo);

        assert.throws(() => module.useEntryCard(itemId), /not valid at this time|already used/, 'Should throw an error for invalid or used card');
    });
});

