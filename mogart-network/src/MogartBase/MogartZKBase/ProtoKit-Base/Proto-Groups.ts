import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";

import {
    StateMap,
    State,
    assert
} from "@proto-kit/protocol";

import {
    UInt64
} from "@proto-kit/library";

import {
    PublicKey,
    Struct
} from "o1js";

export class GroupEntity extends Struct({
    leader: PublicKey,
    memberCount: UInt64,
}) {}

export class GroupChatEntity extends Struct({
    groupId: UInt64,
    messages: Array<string>()
}) {}


@runtimeModule()
export class Groups extends RuntimeModule<{}> {

    @state() public groups = StateMap.from<UInt64, GroupEntity>(UInt64, GroupEntity);

    @state() public playerGroups = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @state() public groupCount = State.from<UInt64>(UInt64);

    @state() public groupChats = StateMap.from<UInt64, GroupChatEntity>(UInt64, GroupChatEntity as any);

    @state() public groupChatCount = State.from<UInt64>(UInt64);

    @runtimeMethod()
    public newGroup() {
        assert(this.playerGroups.get(this.transaction.sender.value).isSome.not(), "you cannot be in two groups at the same time")
        const groupCount = this.groupCount.get().value;
        const newGroupCount = UInt64.from(groupCount).add(UInt64.from(1));
        this.groupCount.set(newGroupCount);
        this.groups.set(
            newGroupCount,
            new GroupEntity({
                leader: this.transaction.sender.value,
                memberCount: UInt64.from(1)
            })
        );
        this.playerGroups.set(this.transaction.sender.value, newGroupCount);
    }

    @runtimeMethod()
    public joinGroup(groupId: UInt64) {
        assert(this.groups.get(groupId).isSome, "Group does not exist");
        const group = this.groups.get(groupId).value;
        assert(group.memberCount.lessThan(UInt64.from(50)), "Group is full");
        assert(this.playerGroups.get(this.transaction.sender.value).isSome.not(), "You are already in a group");
        const groupMemberCount = group.memberCount;
        const newGroupMemberCount = UInt64.from(groupMemberCount).add(UInt64.from(1));
        this.groups.set(
            groupId,
            new GroupEntity({ 
                leader: group.leader,
                memberCount: newGroupMemberCount
            })
        );
        this.playerGroups.set(this.transaction.sender.value, groupId);
    }

    @runtimeMethod()
    public leaveGroup(groupId: UInt64) {
        assert(this.groups.get(groupId).isSome, "Group does not exist");
        const group = this.groups.get(groupId).value;
        assert(group.memberCount.greaterThanOrEqual(UInt64.from(2)), "You are the only player at the group, you cannot leave the group");
        assert(this.transaction.sender.value.equals(group.leader).not(), "Leader cannot leave the group");
        assert(this.playerGroups.get(this.transaction.sender.value).isSome, "You are not in any group!");
        assert(UInt64.from(this.playerGroups.get(this.transaction.sender.value).value).equals(UInt64.from(groupId)), "This is not your group!");
        const groupMemberCount = group.memberCount;
        const newGroupMemberCount = UInt64.from(groupMemberCount).sub(UInt64.from(1));
        this.groups.set(
            groupId,
            new GroupEntity({ 
                leader: group.leader,
                memberCount: newGroupMemberCount
            })
        );
        this.playerGroups.set(this.transaction.sender.value, UInt64.from(0));
    }

    @runtimeMethod()
    public createChat(groupId: UInt64) {
        assert(this.groups.get(groupId).isSome, "Group does not exist");
        const chatCount = this.groupChatCount.get().value;
        const newChatCount = UInt64.from(chatCount).add(UInt64.from(1));
        this.groupChatCount.set(newChatCount);
        this.groupChats.set(
            newChatCount,
            new GroupChatEntity({
                groupId: groupId,
                messages: []
            })
        );
    }
    
    @runtimeMethod()
    public addMessageToChat(chatId: UInt64, message: string) { 
        assert(this.groupChats.get(chatId).isSome, "Chat does not exist");
        let chat = this.groupChats.get(chatId).value;
        (chat.messages as string[]).push(message); 
        this.groupChats.set(chatId, chat);
    }
    
}
