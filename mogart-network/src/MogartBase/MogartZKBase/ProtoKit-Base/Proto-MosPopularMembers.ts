import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod
} from "@proto-kit/module";

import {
    StateMap,
    assert
} from "@proto-kit/protocol";

import {
    UInt64
} from "@proto-kit/library";

import {
    PublicKey,
    Struct
} from "o1js";

export class MemberKey extends Struct({
    owner: PublicKey,
    id: UInt64,
}) {}

export class MemberEntity extends Struct({
    popularity: UInt64,
    activitiesCount: UInt64,
    memberType: UInt64,
}) {}

@runtimeModule()
export class PopularMembers extends RuntimeModule<{}> {

    @state() public members = StateMap.from<MemberKey, MemberEntity>(MemberKey, MemberEntity);

    @state() public memberCounts = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @runtimeMethod()
    public newMember(memberType: UInt64) {
        // Get member count of the user
        const memberCount = this.memberCounts.get(this.transaction.sender.value).value || UInt64.from(0);
        // Increase member count by 1
        const newMemberCount = UInt64.from(memberCount).add(UInt64.from(1));
        // Update member counts
        this.memberCounts.set(this.transaction.sender.value, newMemberCount);
        // Create new member
        this.members.set(
            new MemberKey({ 
                owner: this.transaction.sender.value, 
                id: newMemberCount 
            }), 
            new MemberEntity({ 
                popularity: UInt64.from(0), 
                activitiesCount: UInt64.from(0),
                memberType: memberType,
            })
        );
    }

    @runtimeMethod()
    public increasePopularity(id: UInt64) {
        // Check if there is a member with specified id on the user or not
        const memberKey = new MemberKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        });
        assert(this.members.get(memberKey).isSome, "No member found with the specified ID");

        // Get member
        const member = this.members.get(memberKey).value;
        // Increase popularity
        const newPopularity = UInt64.from(member.popularity).add(UInt64.from(1));
        // Update member with new popularity
        this.members.set(memberKey, new MemberEntity({
            popularity: newPopularity,
            activitiesCount: member.activitiesCount,
            memberType: member.memberType,
        }));
    }

    @runtimeMethod()
    public recordActivity(id: UInt64) {
        // Check if there is a member with specified id on the user or not
        const memberKey = new MemberKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        });
        assert(this.members.get(memberKey).isSome, "No member found with the specified ID");

        // Get member
        const member = this.members.get(memberKey).value;
        // Increase activities count
        const newActivitiesCount = UInt64.from(member.activitiesCount).add(UInt64.from(1));
        // Update member with new activities count
        this.members.set(memberKey, new MemberEntity({
            popularity: member.popularity,
            activitiesCount: newActivitiesCount,
            memberType: member.memberType,
        }));
    }

    @runtimeMethod()
    public getMostPopularMembers() {
        // Gather all members and sort by popularity
        const allMembers = this.members.values().sort((a: { popularity: any; }, b: { popularity: { compare: (arg0: any) => any; }; }) => b.popularity.compare(a.popularity));
        // Return the sorted list of members by popularity
        return allMembers;
    }
}
