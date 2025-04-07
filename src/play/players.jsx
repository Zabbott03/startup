import React from 'react';

import { GameEvent, GameNotifier } from './gameNotifier';


export function Players(props) {

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    GameNotifier.addHandler(handleGameEvent);

    return () => {
      GameNotifier.removeHandler(handleGameEvent);
    };
  },[]);

  function handleGameEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === GameEvent.End) {
        message = ` scored ${event.value.score} points`;
      } else if (event.type === GameEvent.Start) {
        message = ` started a new game`;
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className='event'>
          <span>{event.from}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
      <div>{createMessageArray()}</div>
  );
}
