type ListenerType = (eventData: any) => void;

type ListenersType = {
  [key: string]: ListenerType[];
};

type EventDataType = {
  [key: string]: any;
};

type EventDispatcherType = {
  listen: (type: string, listener: ListenerType) => void;
  hasListener: (type: string, listener: ListenerType) => boolean;
  removeListener: (type: string, listener: ListenerType) => void;
  dispatch: (eventName: string, eventData?: EventDataType) => void;
};

const EventDispatcher = (): EventDispatcherType => {
  const _listeners: ListenersType = {};

  const listen = (type: string, listener: ListenerType) => {
    if (_listeners[type] === undefined) {
      _listeners[type] = [];
    }

    if (_listeners[type].indexOf(listener) === -1) {
      _listeners[type].push(listener);
    }
  };

  const hasListener = (type: string, listener: ListenerType) => {
    return _listeners[type] !== undefined && _listeners[type].indexOf(listener) !== -1;
  };

  const removeListener = (type: string, listener: ListenerType) => {
    const listenerArray = _listeners[type];

    if (listenerArray !== undefined) {
      const index = listenerArray.indexOf(listener);

      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  };

  const dispatch = (eventName: string, eventData: EventDataType = {}) => {
    const listeners = _listeners[eventName];

    if (listeners !== undefined) {
      eventData.target = self;

      const listenersCopy = listeners.slice(0);
      for (let i = 0, l = listenersCopy.length; i < l; i++) {
        listenersCopy[i].call(this, eventData);
      }
    }
  };

  return {
    listen,
    hasListener,
    removeListener,
    dispatch,
  };
};

export default EventDispatcher;
