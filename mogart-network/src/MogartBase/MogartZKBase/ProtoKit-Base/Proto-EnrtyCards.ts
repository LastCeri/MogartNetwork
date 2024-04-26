import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";

import {
    Option,
    StateMap,
    State,
    assert
} from "@proto-kit/protocol";

import {
    Bool,
    PublicKey,
    Struct,
    UInt64
} from "o1js";

// Define a key to uniquely identify items or cards
export class ItemKey extends Struct({
    owner: PublicKey,
    id: UInt64,
}) {}

// Entry card structure
export class EntryCardEntity extends Struct({
    eventId: UInt64,
    validFrom: UInt64,
    validTo: UInt64,
    consumed: Bool,
}) {}

// Runtime module for item and entry card management
@runtimeModule()
export class ItemModule extends RuntimeModule<{}> {
    @state() public items = StateMap.from<ItemKey, EntryCardEntity>(ItemKey, EntryCardEntity);
    @state() public entryCards = StateMap.from<ItemKey, EntryCardEntity>(ItemKey, EntryCardEntity);
    @state() public itemCount = State.from<UInt64>(UInt64);

    // Method to issue a new entry card
    @runtimeMethod()
    public issueEntryCard(eventId: UInt64, validFrom: UInt64, validTo: UInt64) {
        const itemCount = this.itemCount.get().value;
        const newItemCount = UInt64.from(itemCount).add(UInt64.from(1));
        this.itemCount.set(newItemCount);
        this.entryCards.set(
            new ItemKey({
                owner: this.transaction.sender.value,
                id: newItemCount
            }),
            new EntryCardEntity({
                eventId: eventId,
                validFrom: validFrom,
                validTo: validTo,
                consumed: Bool(false),
            })
        );
    }

    // Method to use an entry card
    @runtimeMethod()
    public useEntryCard(itemId: UInt64) {
        const itemKey = new ItemKey({
            owner: this.transaction.sender.value,
            id: itemId
        });
        const cardOption = this.entryCards.get(itemKey);

        if (cardOption.isSome.toBoolean()) { 
            const card = cardOption.value;

            assert(card.consumed.not(), "Entry card already used"); 

            const valid = this.isCardValid(card.validFrom, card.validTo);
            assert(valid, "Entry card is not valid at this time"); 

            this.entryCards.set(itemKey, new EntryCardEntity({
                eventId: card.eventId,
                validFrom: card.validFrom,
                validTo: card.validTo,
                consumed: new Bool(true)
            }));
        } else {
            throw new Error("Entry card does not exist");
        }
    }
    
    // Helper method to check card validity against the current system time
    private isCardValid(validFrom: UInt64, validTo: UInt64): Bool {
        let currentTime = this.getCurrentTime();
        let isValid = currentTime.greaterThanOrEqual(validFrom) && currentTime.lessThanOrEqual(validTo);
        return new Bool(isValid);
    }
    
    private getCurrentTime(): UInt64 {
        return UInt64.from(Date.now());
    }
}
