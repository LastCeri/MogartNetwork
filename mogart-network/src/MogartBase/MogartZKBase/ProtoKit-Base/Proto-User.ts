import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
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

export class UserMessage extends Struct({
    messageId: UInt64,
    content: String,
    timestamp: UInt64
}) {}

export class UserImage extends Struct({
    imageId: UInt64,
    imageURL: String,
    timestamp: UInt64
}) {}

export class UserComment extends Struct({
    commentId: UInt64,
    content: String,
    timestamp: UInt64
}) {}

@runtimeModule()
export class UserContent extends RuntimeModule<{}> {

    @state() public messages = StateMap.from(PublicKey, UserMessage);
    @state() public messageKeys = StateMap.from(PublicKey, Array);

    @state() public images = StateMap.from(PublicKey, UserImage);
    @state() public imageKeys = StateMap.from(PublicKey, Array);

    @state() public comments = StateMap.from(PublicKey, UserComment);
    @state() public commentKeys = StateMap.from(PublicKey, Array);

    @runtimeMethod()
    public postMessage(content: string) {
        const messageId = this.messages.size().add(UInt64.from(1));
        this.messages.set(
            this.transaction.sender.value,
            new UserMessage({
                messageId: messageId,
                content: content,
                timestamp: UInt64.from(Date.now())
            })
        );
        // Track the message key
        const keys = this.messageKeys.get(this.transaction.sender.value) || [];
        keys.push(messageId);
        this.messageKeys.set(this.transaction.sender.value, keys);
    }

    @runtimeMethod()
    public uploadImage(imageURL: string) {
        const imageId = this.images.size().add(UInt64.from(1));
        this.images.set(
            this.transaction.sender.value,
            new UserImage({
                imageId: imageId,
                imageURL: imageURL,
                timestamp: UInt64.from(Date.now())
            })
        );
        // Track the image key
        const keys = this.imageKeys.get(this.transaction.sender.value) || [];
        keys.push(imageId);
        this.imageKeys.set(this.transaction.sender.value, keys);
    }

    @runtimeMethod()
    public postComment(content: string) {
        const commentId = this.comments.size().add(UInt64.from(1));
        this.comments.set(
            this.transaction.sender.value,
            new UserComment({
                commentId: commentId,
                content: content,
                timestamp: UInt64.from(Date.now())
            })
        );
        // Track the comment key
        const keys = this.commentKeys.get(this.transaction.sender.value) || [];
        keys.push(commentId);
        this.commentKeys.set(this.transaction.sender.value, keys);
    }

    @runtimeMethod()
    public getMessageHistory() {
        const keys = this.messageKeys.get(this.transaction.sender.value) || [];
        return keys.map(key => this.messages.get(key));
    }

    @runtimeMethod()
    public getImageHistory() {
        const keys = this.imageKeys.get(this.transaction.sender.value) || [];
        return keys.map(key => this.images.get(key));
    }

    @runtimeMethod()
    public getCommentHistory() {
        const keys = this.commentKeys.get(this.transaction.sender.value) || [];
        return keys.map(key => this.comments.get(key));
    }
}
