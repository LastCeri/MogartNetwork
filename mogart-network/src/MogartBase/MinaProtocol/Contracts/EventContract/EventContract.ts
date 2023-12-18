import { SmartContract, method, PublicKey, UInt64, State, state, CircuitValue, prop, Bool } from 'o1js';

class Participant extends CircuitValue {
  @prop publicKey: PublicKey;
  @prop hasJoined: Bool;

  constructor(publicKey: PublicKey, hasJoined: Bool) {
    super();
    this.publicKey = publicKey;
    this.hasJoined = hasJoined;
  }
}

class Event extends CircuitValue {
  @prop eventId: UInt64;
  @prop participants: Participant[];

  constructor(eventId: UInt64, participants: Participant[]) {
    super();
    this.eventId = eventId;
    this.participants = participants;
  }
}

export class EventContract extends SmartContract {
  @state(Event) events = State<Event[]>();

  constructor(publicKey: PublicKey) {
    super(publicKey);
    // Başlangıçta boş bir Event dizisi ile başlat
    this.events.set(new State<Event[]>([]));
  }

  @method createEvent(eventId: UInt64) {
    let currentEvents = this.events.get();
    currentEvents.push(new Event(eventId, []));
    this.events.set(new State<Event[]>(currentEvents));
  }

  @method joinEvent(eventId: UInt64, participantPublicKey: PublicKey) {
    let currentEvents = this.events.get();
    let event = currentEvents.find(e => e.eventId.equals(eventId));

    if (event) {
      event.participants.push(new Participant(participantPublicKey, Bool(true)));
      this.events.set(new State<Event[]>(currentEvents));
    }
  }

  @method leaveEvent(eventId: UInt64, participantPublicKey: PublicKey) {
    let currentEvents = this.events.get();
    let event = currentEvents.find(e => e.eventId.equals(eventId));

    if (event) {
      let participant = event.participants.find(p => p.publicKey.equals(participantPublicKey));
      if (participant) {
        participant.hasJoined = Bool(false);
      }
      this.events.set(new State<Event[]>(currentEvents));
    }
  }

  @method hasUserJoined(eventId: UInt64, userPublicKey: PublicKey): Bool {
    let currentEvents = this.events.get();
    let event = currentEvents.find(e => e.eventId.equals(eventId));

    if (event) {
      let participant = event.participants.find(p => p.publicKey.equals(userPublicKey));
      return participant ? participant.hasJoined : Bool(false);
    }
    return Bool(false);
  }
}
