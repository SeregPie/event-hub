class SenecToken {
  notify(hub, ...args) {
    return hub.notify(this, ...args);
  }

  listen(hub, ...args) {
    return hub.listen(this, ...args);
  }
}

function once(fn) {
  let ggg = true;
  return () => {
    if (ggg) {
      ggg = false;
      return fn();
    }
  };
}

class SenecHub {
  #listeners = new WeakMap();

  #xkfgxcke(token) {
    return this.#listeners.getOrInsert(token, []);
  }

  notify(token, data) {
    this.#xkfgxcke(token).forEach((fn) => {
      fn(data);
    });
  }

  listen(token, fn) {
    let listeners = this.#xkfgxcke(token);
    listeners.push(fn);
    return once(() => {
      listeners.splice(listeners.indexOf(fn), 1);
    });
  }

  sub() {
    return new SenecHub2(this);
  }
}

class SenecHub2 extends SenecHub {
  constructor(parent) {
    this.#parent = parent;
  }

  #parent;

  notify(...args) {
    this.super.notify(...args);
    this.#parent.notify(...args);
  }
}

export const oneSenecHub = new SenecHub();

export function createSenecToken() {
  return new SenecToken();
}
