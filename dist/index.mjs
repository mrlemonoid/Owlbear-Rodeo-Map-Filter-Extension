var C = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class ct {
  constructor(e) {
    this.messageBus = e;
  }
  get id() {
    if (!this.messageBus.userId)
      throw Error("Unable to get user ID: not ready");
    return this.messageBus.userId;
  }
  getSelection() {
    return C(this, void 0, void 0, function* () {
      const { selection: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SELECTION", {});
      return e;
    });
  }
  select(e, n) {
    return C(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SELECT", { items: e, replace: n });
    });
  }
  deselect(e) {
    return C(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_DESELECT", { items: e });
    });
  }
  getName() {
    return C(this, void 0, void 0, function* () {
      const { name: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_NAME", {});
      return e;
    });
  }
  setName(e) {
    return C(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_NAME", { name: e });
    });
  }
  getColor() {
    return C(this, void 0, void 0, function* () {
      const { color: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_COLOR", {});
      return e;
    });
  }
  setColor(e) {
    return C(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_COLOR", { color: e });
    });
  }
  getSyncView() {
    return C(this, void 0, void 0, function* () {
      const { syncView: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SYNC_VIEW", {});
      return e;
    });
  }
  setSyncView(e) {
    return C(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_SYNC_VIEW", { syncView: e });
    });
  }
  getId() {
    return C(this, void 0, void 0, function* () {
      const { id: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ID", {});
      return e;
    });
  }
  getRole() {
    return C(this, void 0, void 0, function* () {
      const { role: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ROLE", {});
      return e;
    });
  }
  getMetadata() {
    return C(this, void 0, void 0, function* () {
      const { metadata: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_METADATA", {});
      return e;
    });
  }
  setMetadata(e) {
    return C(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_METADATA", { update: e });
    });
  }
  hasPermission(e) {
    return C(this, void 0, void 0, function* () {
      if ((yield this.getRole()) === "GM")
        return !0;
      const { permissions: s } = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
      return s.indexOf(e) > -1;
    });
  }
  getConnectionId() {
    return C(this, void 0, void 0, function* () {
      const { connectionId: e } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_CONNECTION_ID", {});
      return e;
    });
  }
  onChange(e) {
    const n = (s) => {
      e(s.player);
    };
    return this.messageBus.send("OBR_PLAYER_SUBSCRIBE", {}), this.messageBus.on("OBR_PLAYER_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_PLAYER_UNSUBSCRIBE", {}), this.messageBus.off("OBR_PLAYER_EVENT_CHANGE", n);
    };
  }
}
var L = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class ut {
  constructor(e) {
    this.messageBus = e;
  }
  reset() {
    return L(this, void 0, void 0, function* () {
      const { transform: e } = yield this.messageBus.sendAsync("OBR_VIEWPORT_RESET", {});
      return e;
    });
  }
  animateTo(e) {
    return L(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO", { transform: e });
    });
  }
  animateToBounds(e) {
    return L(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO_BOUNDS", {
        bounds: e
      });
    });
  }
  getPosition() {
    return L(this, void 0, void 0, function* () {
      const { position: e } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_POSITION", {});
      return e;
    });
  }
  setPosition(e) {
    return L(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_POSITION", { position: e });
    });
  }
  getScale() {
    return L(this, void 0, void 0, function* () {
      const { scale: e } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_SCALE", {});
      return e;
    });
  }
  setScale(e) {
    return L(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_SCALE", { scale: e });
    });
  }
  getWidth() {
    return L(this, void 0, void 0, function* () {
      const { width: e } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_WIDTH", {});
      return e;
    });
  }
  getHeight() {
    return L(this, void 0, void 0, function* () {
      const { height: e } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_HEIGHT", {});
      return e;
    });
  }
  transformPoint(e) {
    return L(this, void 0, void 0, function* () {
      const { point: n } = yield this.messageBus.sendAsync("OBR_VIEWPORT_TRANSFORM_POINT", { point: e });
      return n;
    });
  }
  inverseTransformPoint(e) {
    return L(this, void 0, void 0, function* () {
      const { point: n } = yield this.messageBus.sendAsync("OBR_VIEWPORT_INVERSE_TRANSFORM_POINT", { point: e });
      return n;
    });
  }
}
function at(t) {
  return typeof t.id == "string";
}
var ge = { exports: {} }, $ = typeof Reflect == "object" ? Reflect : null, Me = $ && typeof $.apply == "function" ? $.apply : function(e, n, s) {
  return Function.prototype.apply.call(e, n, s);
}, oe;
$ && typeof $.ownKeys == "function" ? oe = $.ownKeys : Object.getOwnPropertySymbols ? oe = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : oe = function(e) {
  return Object.getOwnPropertyNames(e);
};
function dt(t) {
  console && console.warn && console.warn(t);
}
var ze = Number.isNaN || function(e) {
  return e !== e;
};
function h() {
  h.init.call(this);
}
ge.exports = h;
ge.exports.once = ht;
h.EventEmitter = h;
h.prototype._events = void 0;
h.prototype._eventsCount = 0;
h.prototype._maxListeners = void 0;
var Le = 10;
function ue(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
}
Object.defineProperty(h, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Le;
  },
  set: function(t) {
    if (typeof t != "number" || t < 0 || ze(t))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    Le = t;
  }
});
h.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
h.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || ze(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function We(t) {
  return t._maxListeners === void 0 ? h.defaultMaxListeners : t._maxListeners;
}
h.prototype.getMaxListeners = function() {
  return We(this);
};
h.prototype.emit = function(e) {
  for (var n = [], s = 1; s < arguments.length; s++)
    n.push(arguments[s]);
  var i = e === "error", o = this._events;
  if (o !== void 0)
    i = i && o.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var c;
    if (n.length > 0 && (c = n[0]), c instanceof Error)
      throw c;
    var d = new Error("Unhandled error." + (c ? " (" + c.message + ")" : ""));
    throw d.context = c, d;
  }
  var _ = o[e];
  if (_ === void 0)
    return !1;
  if (typeof _ == "function")
    Me(_, this, n);
  else
    for (var u = _.length, r = Ze(_, u), s = 0; s < u; ++s)
      Me(r[s], this, n);
  return !0;
};
function $e(t, e, n, s) {
  var i, o, c;
  if (ue(n), o = t._events, o === void 0 ? (o = t._events = /* @__PURE__ */ Object.create(null), t._eventsCount = 0) : (o.newListener !== void 0 && (t.emit(
    "newListener",
    e,
    n.listener ? n.listener : n
  ), o = t._events), c = o[e]), c === void 0)
    c = o[e] = n, ++t._eventsCount;
  else if (typeof c == "function" ? c = o[e] = s ? [n, c] : [c, n] : s ? c.unshift(n) : c.push(n), i = We(t), i > 0 && c.length > i && !c.warned) {
    c.warned = !0;
    var d = new Error("Possible EventEmitter memory leak detected. " + c.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    d.name = "MaxListenersExceededWarning", d.emitter = t, d.type = e, d.count = c.length, dt(d);
  }
  return t;
}
h.prototype.addListener = function(e, n) {
  return $e(this, e, n, !1);
};
h.prototype.on = h.prototype.addListener;
h.prototype.prependListener = function(e, n) {
  return $e(this, e, n, !0);
};
function _t() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Ke(t, e, n) {
  var s = { fired: !1, wrapFn: void 0, target: t, type: e, listener: n }, i = _t.bind(s);
  return i.listener = n, s.wrapFn = i, i;
}
h.prototype.once = function(e, n) {
  return ue(n), this.on(e, Ke(this, e, n)), this;
};
h.prototype.prependOnceListener = function(e, n) {
  return ue(n), this.prependListener(e, Ke(this, e, n)), this;
};
h.prototype.removeListener = function(e, n) {
  var s, i, o, c, d;
  if (ue(n), i = this._events, i === void 0)
    return this;
  if (s = i[e], s === void 0)
    return this;
  if (s === n || s.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, s.listener || n));
  else if (typeof s != "function") {
    for (o = -1, c = s.length - 1; c >= 0; c--)
      if (s[c] === n || s[c].listener === n) {
        d = s[c].listener, o = c;
        break;
      }
    if (o < 0)
      return this;
    o === 0 ? s.shift() : ft(s, o), s.length === 1 && (i[e] = s[0]), i.removeListener !== void 0 && this.emit("removeListener", e, d || n);
  }
  return this;
};
h.prototype.off = h.prototype.removeListener;
h.prototype.removeAllListeners = function(e) {
  var n, s, i;
  if (s = this._events, s === void 0)
    return this;
  if (s.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : s[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete s[e]), this;
  if (arguments.length === 0) {
    var o = Object.keys(s), c;
    for (i = 0; i < o.length; ++i)
      c = o[i], c !== "removeListener" && this.removeAllListeners(c);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (n = s[e], typeof n == "function")
    this.removeListener(e, n);
  else if (n !== void 0)
    for (i = n.length - 1; i >= 0; i--)
      this.removeListener(e, n[i]);
  return this;
};
function je(t, e, n) {
  var s = t._events;
  if (s === void 0)
    return [];
  var i = s[e];
  return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? lt(i) : Ze(i, i.length);
}
h.prototype.listeners = function(e) {
  return je(this, e, !0);
};
h.prototype.rawListeners = function(e) {
  return je(this, e, !1);
};
h.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : Xe.call(t, e);
};
h.prototype.listenerCount = Xe;
function Xe(t) {
  var e = this._events;
  if (e !== void 0) {
    var n = e[t];
    if (typeof n == "function")
      return 1;
    if (n !== void 0)
      return n.length;
  }
  return 0;
}
h.prototype.eventNames = function() {
  return this._eventsCount > 0 ? oe(this._events) : [];
};
function Ze(t, e) {
  for (var n = new Array(e), s = 0; s < e; ++s)
    n[s] = t[s];
  return n;
}
function ft(t, e) {
  for (; e + 1 < t.length; e++)
    t[e] = t[e + 1];
  t.pop();
}
function lt(t) {
  for (var e = new Array(t.length), n = 0; n < e.length; ++n)
    e[n] = t[n].listener || t[n];
  return e;
}
function ht(t, e) {
  return new Promise(function(n, s) {
    function i(c) {
      t.removeListener(e, o), s(c);
    }
    function o() {
      typeof t.removeListener == "function" && t.removeListener("error", i), n([].slice.call(arguments));
    }
    Qe(t, e, o, { once: !0 }), e !== "error" && Et(t, i, { once: !0 });
  });
}
function Et(t, e, n) {
  typeof t.on == "function" && Qe(t, "error", e, n);
}
function Qe(t, e, n, s) {
  if (typeof t.on == "function")
    s.once ? t.once(e, n) : t.on(e, n);
  else if (typeof t.addEventListener == "function")
    t.addEventListener(e, function i(o) {
      s.once && t.removeEventListener(e, i), n(o);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
}
var Ot = ge.exports;
let te;
const yt = new Uint8Array(16);
function Tt() {
  if (!te && (te = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !te))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return te(yt);
}
const R = [];
for (let t = 0; t < 256; ++t)
  R.push((t + 256).toString(16).slice(1));
function At(t, e = 0) {
  return R[t[e + 0]] + R[t[e + 1]] + R[t[e + 2]] + R[t[e + 3]] + "-" + R[t[e + 4]] + R[t[e + 5]] + "-" + R[t[e + 6]] + R[t[e + 7]] + "-" + R[t[e + 8]] + R[t[e + 9]] + "-" + R[t[e + 10]] + R[t[e + 11]] + R[t[e + 12]] + R[t[e + 13]] + R[t[e + 14]] + R[t[e + 15]];
}
const mt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), De = {
  randomUUID: mt
};
function Bt(t, e, n) {
  if (De.randomUUID && !e && !t)
    return De.randomUUID();
  t = t || {};
  const s = t.random || (t.rng || Tt)();
  if (s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, e) {
    n = n || 0;
    for (let i = 0; i < 16; ++i)
      e[n + i] = s[i];
    return e;
  }
  return At(s);
}
class pt extends Ot.EventEmitter {
  constructor(e, n) {
    super(), this.ready = !1, this.userId = null, this.ref = null, this.handleMessage = (s) => {
      const i = s.data;
      if (s.origin === this.targetOrigin && at(i)) {
        if (i.id === "OBR_READY") {
          this.ready = !0;
          const o = i.data;
          this.ref = o.ref, this.userId = o.userId;
        }
        this.emit(i.id, i.data);
      }
    }, this.send = (s, i, o) => {
      var c;
      if (!this.ref)
        throw Error("Unable to send message: not ready");
      (c = window.parent) === null || c === void 0 || c.postMessage({
        id: s,
        data: i,
        ref: this.ref,
        nonce: o
      }, this.targetOrigin);
    }, this.sendAsync = (s, i, o = 5e3) => {
      const c = `_${Bt()}`;
      return this.send(s, i, c), Promise.race([
        new Promise((d, _) => {
          const u = this;
          function r(f) {
            u.off(`${s}_RESPONSE${c}`, r), u.off(`${s}_ERROR${c}`, a), d(f);
          }
          function a(f) {
            u.off(`${s}_RESPONSE${c}`, r), u.off(`${s}_ERROR${c}`, a), _(f);
          }
          this.on(`${s}_RESPONSE${c}`, r), this.on(`${s}_ERROR${c}`, a);
        }),
        ...o > 0 ? [
          new Promise((d, _) => window.setTimeout(() => _(new Error(`Message ${s} took longer than ${o}ms to get a result`)), o))
        ] : []
      ]);
    }, this.roomId = n, this.targetOrigin = e, window.addEventListener("message", this.handleMessage), this.setMaxListeners(100);
  }
  destroy() {
    window.removeEventListener("message", this.handleMessage);
  }
}
var be = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class gt {
  constructor(e) {
    this.messageBus = e;
  }
  show(e, n) {
    return be(this, void 0, void 0, function* () {
      const { id: s } = yield this.messageBus.sendAsync("OBR_NOTIFICATION_SHOW", { message: e, variant: n });
      return s;
    });
  }
  close(e) {
    return be(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_NOTIFICATION_CLOSE", { id: e });
    });
  }
}
var k = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class vt {
  constructor(e) {
    this.messageBus = e;
  }
  getColor() {
    return k(this, void 0, void 0, function* () {
      const { color: e } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_COLOR", {});
      return e;
    });
  }
  setColor(e) {
    return k(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_COLOR", { color: e });
    });
  }
  getStrokeWidth() {
    return k(this, void 0, void 0, function* () {
      const { strokeWidth: e } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_STROKE_WIDTH", {});
      return e;
    });
  }
  setStrokeWidth(e) {
    return k(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_STROKE_WIDTH", {
        strokeWidth: e
      });
    });
  }
  getFilled() {
    return k(this, void 0, void 0, function* () {
      const { filled: e } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_FILLED", {});
      return e;
    });
  }
  setFilled(e) {
    return k(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_FILLED", { filled: e });
    });
  }
  onChange(e) {
    const n = (s) => {
      e(s.fog);
    };
    return this.messageBus.send("OBR_SCENE_FOG_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_FOG_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_SCENE_FOG_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_FOG_EVENT_CHANGE", n);
    };
  }
}
var v = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Rt {
  constructor(e) {
    this.messageBus = e;
  }
  getDpi() {
    return v(this, void 0, void 0, function* () {
      const { dpi: e } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DPI", {});
      return e;
    });
  }
  getScale() {
    return v(this, void 0, void 0, function* () {
      return yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_SCALE", {});
    });
  }
  setScale(e) {
    return v(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_SCALE", { scale: e });
    });
  }
  getColor() {
    return v(this, void 0, void 0, function* () {
      const { color: e } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_COLOR", {});
      return e;
    });
  }
  setColor(e) {
    return v(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_COLOR", { color: e });
    });
  }
  getOpacity() {
    return v(this, void 0, void 0, function* () {
      const { opacity: e } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_OPACITY", {});
      return e;
    });
  }
  setOpacity(e) {
    return v(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_OPACITY", { opacity: e });
    });
  }
  getType() {
    return v(this, void 0, void 0, function* () {
      const { type: e } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_TYPE", {});
      return e;
    });
  }
  setType(e) {
    return v(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_TYPE", { type: e });
    });
  }
  getLineType() {
    return v(this, void 0, void 0, function* () {
      const { lineType: e } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_TYPE", {});
      return e;
    });
  }
  setLineType(e) {
    return v(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_TYPE", {
        lineType: e
      });
    });
  }
  getMeasurement() {
    return v(this, void 0, void 0, function* () {
      const { measurement: e } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_MEASUREMENT", {});
      return e;
    });
  }
  setMeasurement(e) {
    return v(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_MEASUREMENT", {
        measurement: e
      });
    });
  }
  getLineWidth() {
    return v(this, void 0, void 0, function* () {
      const { lineWidth: e } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_WIDTH", {});
      return e;
    });
  }
  setLineWidth(e) {
    return v(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_WIDTH", {
        lineWidth: e
      });
    });
  }
  snapPosition(e, n, s, i) {
    return v(this, void 0, void 0, function* () {
      const { position: o } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_SNAP_POSITION", {
        position: e,
        snappingSensitivity: n,
        useCorners: s,
        useCenter: i
      });
      return o;
    });
  }
  getDistance(e, n) {
    return v(this, void 0, void 0, function* () {
      const { distance: s } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DISTANCE", { from: e, to: n });
      return s;
    });
  }
  onChange(e) {
    const n = (s) => {
      e(s.grid);
    };
    return this.messageBus.send("OBR_SCENE_GRID_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_GRID_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_SCENE_GRID_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_GRID_EVENT_CHANGE", n);
    };
  }
}
var ne = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Ct {
  constructor(e) {
    this.messageBus = e;
  }
  undo() {
    return ne(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_UNDO", {});
    });
  }
  redo() {
    return ne(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_REDO", {});
    });
  }
  canUndo() {
    return ne(this, void 0, void 0, function* () {
      const { canUndo: e } = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_UNDO", {});
      return e;
    });
  }
  canRedo() {
    return ne(this, void 0, void 0, function* () {
      const { canRedo: e } = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_REDO", {});
      return e;
    });
  }
}
var ve = Symbol.for("immer-nothing"), K = Symbol.for("immer-draftable"), I = Symbol.for("immer-state"), qe = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(t) {
    return `The plugin for '${t}' has not been loaded into Immer. To enable the plugin, import and call \`enable${t}()\` when initializing your application.`;
  },
  function(t) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${t}'`;
  },
  "This object has been frozen and should not be mutated",
  function(t) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + t;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(t) {
    return `'current' expects a draft, got: ${t}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(t) {
    return `'original' expects a draft, got: ${t}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function B(t, ...e) {
  if (process.env.NODE_ENV !== "production") {
    const n = qe[t], s = typeof n == "function" ? n.apply(null, e) : n;
    throw new Error(`[Immer] ${s}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var P = Object.getPrototypeOf;
function U(t) {
  return !!t && !!t[I];
}
function b(t) {
  var e;
  return t ? Je(t) || Array.isArray(t) || !!t[K] || !!((e = t.constructor) != null && e[K]) || J(t) || ee(t) : !1;
}
var St = Object.prototype.constructor.toString();
function Je(t) {
  if (!t || typeof t != "object")
    return !1;
  const e = P(t);
  if (e === null)
    return !0;
  const n = Object.hasOwnProperty.call(e, "constructor") && e.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === St;
}
function X(t, e) {
  V(t) === 0 ? Reflect.ownKeys(t).forEach((n) => {
    e(n, t[n], t);
  }) : t.forEach((n, s) => e(s, n, t));
}
function V(t) {
  const e = t[I];
  return e ? e.type_ : Array.isArray(t) ? 1 : J(t) ? 2 : ee(t) ? 3 : 0;
}
function Z(t, e) {
  return V(t) === 2 ? t.has(e) : Object.prototype.hasOwnProperty.call(t, e);
}
function de(t, e) {
  return V(t) === 2 ? t.get(e) : t[e];
}
function et(t, e, n) {
  const s = V(t);
  s === 2 ? t.set(e, n) : s === 3 ? t.add(n) : t[e] = n;
}
function Nt(t, e) {
  return t === e ? t !== 0 || 1 / t === 1 / e : t !== t && e !== e;
}
function J(t) {
  return t instanceof Map;
}
function ee(t) {
  return t instanceof Set;
}
function x(t) {
  return t.copy_ || t.base_;
}
function Oe(t, e) {
  if (J(t))
    return new Map(t);
  if (ee(t))
    return new Set(t);
  if (Array.isArray(t))
    return Array.prototype.slice.call(t);
  const n = Je(t);
  if (e === !0 || e === "class_only" && !n) {
    const s = Object.getOwnPropertyDescriptors(t);
    delete s[I];
    let i = Reflect.ownKeys(s);
    for (let o = 0; o < i.length; o++) {
      const c = i[o], d = s[c];
      d.writable === !1 && (d.writable = !0, d.configurable = !0), (d.get || d.set) && (s[c] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: d.enumerable,
        value: t[c]
      });
    }
    return Object.create(P(t), s);
  } else {
    const s = P(t);
    if (s !== null && n)
      return { ...t };
    const i = Object.create(s);
    return Object.assign(i, t);
  }
}
function Re(t, e = !1) {
  return ae(t) || U(t) || !b(t) || (V(t) > 1 && (t.set = t.add = t.clear = t.delete = It), Object.freeze(t), e && Object.entries(t).forEach(([n, s]) => Re(s, !0))), t;
}
function It() {
  B(2);
}
function ae(t) {
  return Object.isFrozen(t);
}
var ye = {};
function H(t) {
  const e = ye[t];
  return e || B(0, t), e;
}
function wt(t, e) {
  ye[t] || (ye[t] = e);
}
var Q;
function tt() {
  return Q;
}
function Mt(t, e) {
  return {
    drafts_: [],
    parent_: t,
    immer_: e,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function xe(t, e) {
  e && (H("Patches"), t.patches_ = [], t.inversePatches_ = [], t.patchListener_ = e);
}
function Te(t) {
  Ae(t), t.drafts_.forEach(Lt), t.drafts_ = null;
}
function Ae(t) {
  t === Q && (Q = t.parent_);
}
function Ge(t) {
  return Q = Mt(Q, t);
}
function Lt(t) {
  const e = t[I];
  e.type_ === 0 || e.type_ === 1 ? e.revoke_() : e.revoked_ = !0;
}
function Pe(t, e) {
  e.unfinalizedDrafts_ = e.drafts_.length;
  const n = e.drafts_[0];
  return t !== void 0 && t !== n ? (n[I].modified_ && (Te(e), B(4)), b(t) && (t = re(e, t), e.parent_ || ce(e, t)), e.patches_ && H("Patches").generateReplacementPatches_(
    n[I].base_,
    t,
    e.patches_,
    e.inversePatches_
  )) : t = re(e, n, []), Te(e), e.patches_ && e.patchListener_(e.patches_, e.inversePatches_), t !== ve ? t : void 0;
}
function re(t, e, n) {
  if (ae(e))
    return e;
  const s = e[I];
  if (!s)
    return X(
      e,
      (i, o) => Ue(t, s, e, i, o, n)
    ), e;
  if (s.scope_ !== t)
    return e;
  if (!s.modified_)
    return ce(t, s.base_, !0), s.base_;
  if (!s.finalized_) {
    s.finalized_ = !0, s.scope_.unfinalizedDrafts_--;
    const i = s.copy_;
    let o = i, c = !1;
    s.type_ === 3 && (o = new Set(i), i.clear(), c = !0), X(
      o,
      (d, _) => Ue(t, s, i, d, _, n, c)
    ), ce(t, i, !1), n && t.patches_ && H("Patches").generatePatches_(
      s,
      n,
      t.patches_,
      t.inversePatches_
    );
  }
  return s.copy_;
}
function Ue(t, e, n, s, i, o, c) {
  if (process.env.NODE_ENV !== "production" && i === n && B(5), U(i)) {
    const d = o && e && e.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Z(e.assigned_, s) ? o.concat(s) : void 0, _ = re(t, i, d);
    if (et(n, s, _), U(_))
      t.canAutoFreeze_ = !1;
    else
      return;
  } else
    c && n.add(i);
  if (b(i) && !ae(i)) {
    if (!t.immer_.autoFreeze_ && t.unfinalizedDrafts_ < 1)
      return;
    re(t, i), (!e || !e.scope_.parent_) && typeof s != "symbol" && Object.prototype.propertyIsEnumerable.call(n, s) && ce(t, i);
  }
}
function ce(t, e, n = !1) {
  !t.parent_ && t.immer_.autoFreeze_ && t.canAutoFreeze_ && Re(e, n);
}
function Dt(t, e) {
  const n = Array.isArray(t), s = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: e ? e.scope_ : tt(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: e,
    // The base state.
    base_: t,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let i = s, o = Ce;
  n && (i = [s], o = q);
  const { revoke: c, proxy: d } = Proxy.revocable(i, o);
  return s.draft_ = d, s.revoke_ = c, d;
}
var Ce = {
  get(t, e) {
    if (e === I)
      return t;
    const n = x(t);
    if (!Z(n, e))
      return bt(t, n, e);
    const s = n[e];
    return t.finalized_ || !b(s) ? s : s === _e(t.base_, e) ? (fe(t), t.copy_[e] = Be(s, t)) : s;
  },
  has(t, e) {
    return e in x(t);
  },
  ownKeys(t) {
    return Reflect.ownKeys(x(t));
  },
  set(t, e, n) {
    const s = nt(x(t), e);
    if (s != null && s.set)
      return s.set.call(t.draft_, n), !0;
    if (!t.modified_) {
      const i = _e(x(t), e), o = i == null ? void 0 : i[I];
      if (o && o.base_ === n)
        return t.copy_[e] = n, t.assigned_[e] = !1, !0;
      if (Nt(n, i) && (n !== void 0 || Z(t.base_, e)))
        return !0;
      fe(t), me(t);
    }
    return t.copy_[e] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || e in t.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(t.copy_[e]) || (t.copy_[e] = n, t.assigned_[e] = !0), !0;
  },
  deleteProperty(t, e) {
    return _e(t.base_, e) !== void 0 || e in t.base_ ? (t.assigned_[e] = !1, fe(t), me(t)) : delete t.assigned_[e], t.copy_ && delete t.copy_[e], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(t, e) {
    const n = x(t), s = Reflect.getOwnPropertyDescriptor(n, e);
    return s && {
      writable: !0,
      configurable: t.type_ !== 1 || e !== "length",
      enumerable: s.enumerable,
      value: n[e]
    };
  },
  defineProperty() {
    B(11);
  },
  getPrototypeOf(t) {
    return P(t.base_);
  },
  setPrototypeOf() {
    B(12);
  }
}, q = {};
X(Ce, (t, e) => {
  q[t] = function() {
    return arguments[0] = arguments[0][0], e.apply(this, arguments);
  };
});
q.deleteProperty = function(t, e) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(e)) && B(13), q.set.call(this, t, e, void 0);
};
q.set = function(t, e, n) {
  return process.env.NODE_ENV !== "production" && e !== "length" && isNaN(parseInt(e)) && B(14), Ce.set.call(this, t[0], e, n, t[0]);
};
function _e(t, e) {
  const n = t[I];
  return (n ? x(n) : t)[e];
}
function bt(t, e, n) {
  var i;
  const s = nt(e, n);
  return s ? "value" in s ? s.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = s.get) == null ? void 0 : i.call(t.draft_)
  ) : void 0;
}
function nt(t, e) {
  if (!(e in t))
    return;
  let n = P(t);
  for (; n; ) {
    const s = Object.getOwnPropertyDescriptor(n, e);
    if (s)
      return s;
    n = P(n);
  }
}
function me(t) {
  t.modified_ || (t.modified_ = !0, t.parent_ && me(t.parent_));
}
function fe(t) {
  t.copy_ || (t.copy_ = Oe(
    t.base_,
    t.scope_.immer_.useStrictShallowCopy_
  ));
}
var xt = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (e, n, s) => {
      if (typeof e == "function" && typeof n != "function") {
        const o = n;
        n = e;
        const c = this;
        return function(_ = o, ...u) {
          return c.produce(_, (r) => n.call(this, r, ...u));
        };
      }
      typeof n != "function" && B(6), s !== void 0 && typeof s != "function" && B(7);
      let i;
      if (b(e)) {
        const o = Ge(this), c = Be(e, void 0);
        let d = !0;
        try {
          i = n(c), d = !1;
        } finally {
          d ? Te(o) : Ae(o);
        }
        return xe(o, s), Pe(i, o);
      } else if (!e || typeof e != "object") {
        if (i = n(e), i === void 0 && (i = e), i === ve && (i = void 0), this.autoFreeze_ && Re(i, !0), s) {
          const o = [], c = [];
          H("Patches").generateReplacementPatches_(e, i, o, c), s(o, c);
        }
        return i;
      } else
        B(1, e);
    }, this.produceWithPatches = (e, n) => {
      if (typeof e == "function")
        return (c, ...d) => this.produceWithPatches(c, (_) => e(_, ...d));
      let s, i;
      return [this.produce(e, n, (c, d) => {
        s = c, i = d;
      }), s, i];
    }, typeof (t == null ? void 0 : t.autoFreeze) == "boolean" && this.setAutoFreeze(t.autoFreeze), typeof (t == null ? void 0 : t.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(t.useStrictShallowCopy);
  }
  createDraft(t) {
    b(t) || B(8), U(t) && (t = Gt(t));
    const e = Ge(this), n = Be(t, void 0);
    return n[I].isManual_ = !0, Ae(e), n;
  }
  finishDraft(t, e) {
    const n = t && t[I];
    (!n || !n.isManual_) && B(9);
    const { scope_: s } = n;
    return xe(s, e), Pe(void 0, s);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  applyPatches(t, e) {
    let n;
    for (n = e.length - 1; n >= 0; n--) {
      const i = e[n];
      if (i.path.length === 0 && i.op === "replace") {
        t = i.value;
        break;
      }
    }
    n > -1 && (e = e.slice(n + 1));
    const s = H("Patches").applyPatches_;
    return U(t) ? s(t, e) : this.produce(
      t,
      (i) => s(i, e)
    );
  }
};
function Be(t, e) {
  const n = J(t) ? H("MapSet").proxyMap_(t, e) : ee(t) ? H("MapSet").proxySet_(t, e) : Dt(t, e);
  return (e ? e.scope_ : tt()).drafts_.push(n), n;
}
function Gt(t) {
  return U(t) || B(10, t), st(t);
}
function st(t) {
  if (!b(t) || ae(t))
    return t;
  const e = t[I];
  let n;
  if (e) {
    if (!e.modified_)
      return e.base_;
    e.finalized_ = !0, n = Oe(t, e.scope_.immer_.useStrictShallowCopy_);
  } else
    n = Oe(t, !0);
  return X(n, (s, i) => {
    et(n, s, st(i));
  }), e && (e.finalized_ = !1), n;
}
function Se() {
  process.env.NODE_ENV !== "production" && qe.push(
    'Sets cannot have "replace" patches.',
    function(f) {
      return "Unsupported patch operation: " + f;
    },
    function(f) {
      return "Cannot apply patch, path doesn't resolve: " + f;
    },
    "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
  );
  const e = "replace", n = "add", s = "remove";
  function i(f, m, O, T) {
    switch (f.type_) {
      case 0:
      case 2:
        return c(
          f,
          m,
          O,
          T
        );
      case 1:
        return o(f, m, O, T);
      case 3:
        return d(
          f,
          m,
          O,
          T
        );
    }
  }
  function o(f, m, O, T) {
    let { base_: g, assigned_: y } = f, A = f.copy_;
    A.length < g.length && ([g, A] = [A, g], [O, T] = [T, O]);
    for (let l = 0; l < g.length; l++)
      if (y[l] && A[l] !== g[l]) {
        const E = m.concat([l]);
        O.push({
          op: e,
          path: E,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: a(A[l])
        }), T.push({
          op: e,
          path: E,
          value: a(g[l])
        });
      }
    for (let l = g.length; l < A.length; l++) {
      const E = m.concat([l]);
      O.push({
        op: n,
        path: E,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: a(A[l])
      });
    }
    for (let l = A.length - 1; g.length <= l; --l) {
      const E = m.concat([l]);
      T.push({
        op: s,
        path: E
      });
    }
  }
  function c(f, m, O, T) {
    const { base_: g, copy_: y } = f;
    X(f.assigned_, (A, l) => {
      const E = de(g, A), F = de(y, A), D = l ? Z(g, A) ? e : n : s;
      if (E === F && D === e)
        return;
      const N = m.concat(A);
      O.push(D === s ? { op: D, path: N } : { op: D, path: N, value: F }), T.push(
        D === n ? { op: s, path: N } : D === s ? { op: n, path: N, value: a(E) } : { op: e, path: N, value: a(E) }
      );
    });
  }
  function d(f, m, O, T) {
    let { base_: g, copy_: y } = f, A = 0;
    g.forEach((l) => {
      if (!y.has(l)) {
        const E = m.concat([A]);
        O.push({
          op: s,
          path: E,
          value: l
        }), T.unshift({
          op: n,
          path: E,
          value: l
        });
      }
      A++;
    }), A = 0, y.forEach((l) => {
      if (!g.has(l)) {
        const E = m.concat([A]);
        O.push({
          op: n,
          path: E,
          value: l
        }), T.unshift({
          op: s,
          path: E,
          value: l
        });
      }
      A++;
    });
  }
  function _(f, m, O, T) {
    O.push({
      op: e,
      path: [],
      value: m === ve ? void 0 : m
    }), T.push({
      op: e,
      path: [],
      value: f
    });
  }
  function u(f, m) {
    return m.forEach((O) => {
      const { path: T, op: g } = O;
      let y = f;
      for (let F = 0; F < T.length - 1; F++) {
        const D = V(y);
        let N = T[F];
        typeof N != "string" && typeof N != "number" && (N = "" + N), (D === 0 || D === 1) && (N === "__proto__" || N === "constructor") && B(16 + 3), typeof y == "function" && N === "prototype" && B(16 + 3), y = de(y, N), typeof y != "object" && B(16 + 2, T.join("/"));
      }
      const A = V(y), l = r(O.value), E = T[T.length - 1];
      switch (g) {
        case e:
          switch (A) {
            case 2:
              return y.set(E, l);
            case 3:
              B(16);
            default:
              return y[E] = l;
          }
        case n:
          switch (A) {
            case 1:
              return E === "-" ? y.push(l) : y.splice(E, 0, l);
            case 2:
              return y.set(E, l);
            case 3:
              return y.add(l);
            default:
              return y[E] = l;
          }
        case s:
          switch (A) {
            case 1:
              return y.splice(E, 1);
            case 2:
              return y.delete(E);
            case 3:
              return y.delete(O.value);
            default:
              return delete y[E];
          }
        default:
          B(16 + 1, g);
      }
    }), f;
  }
  function r(f) {
    if (!b(f))
      return f;
    if (Array.isArray(f))
      return f.map(r);
    if (J(f))
      return new Map(
        Array.from(f.entries()).map(([O, T]) => [O, r(T)])
      );
    if (ee(f))
      return new Set(Array.from(f).map(r));
    const m = Object.create(P(f));
    for (const O in f)
      m[O] = r(f[O]);
    return Z(f, K) && (m[K] = f[K]), m;
  }
  function a(f) {
    return U(f) ? r(f) : f;
  }
  wt("Patches", {
    applyPatches_: u,
    generatePatches_: i,
    generateReplacementPatches_: _
  });
}
var w = new xt();
w.produce;
var Ne = w.produceWithPatches.bind(
  w
);
w.setAutoFreeze.bind(w);
w.setUseStrictShallowCopy.bind(w);
w.applyPatches.bind(w);
w.createDraft.bind(w);
w.finishDraft.bind(w);
var Y = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
Se();
class Pt {
  constructor(e) {
    this.messageBus = e;
  }
  getItems(e) {
    return Y(this, void 0, void 0, function* () {
      if (Array.isArray(e)) {
        const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEMS", { ids: e });
        return n;
      } else if (e) {
        const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
        return n.filter(e);
      } else {
        const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
        return n;
      }
    });
  }
  isItemArray(e) {
    return Array.isArray(e) && e.every((n) => typeof n != "string");
  }
  updateItems(e, n) {
    return Y(this, void 0, void 0, function* () {
      let s;
      this.isItemArray(e) ? s = e : s = yield this.getItems(e);
      const [i, o] = Ne(s, n), c = i.map((_) => ({
        id: _.id,
        type: _.type
      }));
      for (const _ of o) {
        const [u, r] = _.path;
        typeof u == "number" && typeof r == "string" && (c[u][r] = i[u][r]);
      }
      const d = c.filter(
        // Ensure that there are updates besides the default ID and type
        (_) => Object.keys(_).length > 2
      );
      d.length !== 0 && (yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_UPDATE_ITEMS", {
        updates: d
      }));
    });
  }
  addItems(e) {
    return Y(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_ADD_ITEMS", {
        items: e
      });
    });
  }
  deleteItems(e) {
    return Y(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_DELETE_ITEMS", {
        ids: e
      });
    });
  }
  getItemAttachments(e) {
    return Y(this, void 0, void 0, function* () {
      const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_ATTACHMENTS", { ids: e });
      return n;
    });
  }
  getItemBounds(e) {
    return Y(this, void 0, void 0, function* () {
      const { bounds: n } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_BOUNDS", { ids: e });
      return n;
    });
  }
  onChange(e) {
    const n = (s) => {
      e(s.items);
    };
    return this.messageBus.send("OBR_SCENE_ITEMS_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_ITEMS_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_SCENE_ITEMS_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_ITEMS_EVENT_CHANGE", n);
    };
  }
}
var z = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
Se();
class Ut {
  constructor(e) {
    this.messageBus = e;
  }
  getItems(e) {
    return z(this, void 0, void 0, function* () {
      if (Array.isArray(e)) {
        const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEMS", { ids: e });
        return n;
      } else if (e) {
        const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
        return n.filter(e);
      } else {
        const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
        return n;
      }
    });
  }
  isItemArray(e) {
    return Array.isArray(e) && e.every((n) => typeof n != "string");
  }
  updateItems(e, n, s) {
    return z(this, void 0, void 0, function* () {
      let i;
      this.isItemArray(e) ? i = e : i = yield this.getItems(e);
      const [o, c] = Ne(i, n), d = o.map((u) => ({
        id: u.id,
        type: u.type
      }));
      for (const u of c) {
        const [r, a] = u.path;
        typeof r == "number" && typeof a == "string" && (d[r][a] = o[r][a]);
      }
      const _ = d.filter(
        // Ensure that there are updates besides the default ID and type
        (u) => Object.keys(u).length > 2
      );
      _.length !== 0 && (yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_UPDATE_ITEMS", {
        updates: _,
        fastUpdate: s
      }));
    });
  }
  addItems(e) {
    return z(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_ADD_ITEMS", {
        items: e
      });
    });
  }
  deleteItems(e) {
    return z(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_DELETE_ITEMS", {
        ids: e
      });
    });
  }
  getItemAttachments(e) {
    return z(this, void 0, void 0, function* () {
      const { items: n } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_ATTACHMENTS", { ids: e });
      return n;
    });
  }
  getItemBounds(e) {
    return z(this, void 0, void 0, function* () {
      const { bounds: n } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_BOUNDS", { ids: e });
      return n;
    });
  }
  onChange(e) {
    const n = (s) => {
      e(s.items);
    };
    return this.messageBus.send("OBR_SCENE_LOCAL_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_LOCAL_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_SCENE_LOCAL_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_LOCAL_EVENT_CHANGE", n);
    };
  }
}
var le = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Vt {
  constructor(e) {
    this.messageBus = e, this.grid = new Rt(e), this.fog = new vt(e), this.history = new Ct(e), this.items = new Pt(e), this.local = new Ut(e);
  }
  isReady() {
    return le(this, void 0, void 0, function* () {
      const { ready: e } = yield this.messageBus.sendAsync("OBR_SCENE_IS_READY", {});
      return e;
    });
  }
  onReadyChange(e) {
    const n = (s) => {
      e(s.ready);
    };
    return this.messageBus.send("OBR_SCENE_READY_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_EVENT_READY_CHANGE", n), () => {
      this.messageBus.send("OBR_SCENE_READY_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_EVENT_READY_CHANGE", n);
    };
  }
  getMetadata() {
    return le(this, void 0, void 0, function* () {
      const { metadata: e } = yield this.messageBus.sendAsync("OBR_SCENE_GET_METADATA", {});
      return e;
    });
  }
  setMetadata(e) {
    return le(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_SET_METADATA", { update: e });
    });
  }
  onMetadataChange(e) {
    const n = (s) => {
      e(s.metadata);
    };
    return this.messageBus.send("OBR_SCENE_METADATA_SUBSCRIBE", {}), this.messageBus.on("OBR_SCENE_METADATA_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_SCENE_METADATA_UNSUBSCRIBE", {}), this.messageBus.off("OBR_SCENE_METADATA_EVENT_CHANGE", n);
    };
  }
}
function it(t) {
  return t.startsWith("http") ? t : `${window.location.origin}${t}`;
}
function j(t) {
  return t.map((e) => Object.assign(Object.assign({}, e), { icon: it(e.icon) }));
}
function Ie(t) {
  return Object.assign(Object.assign({}, t), { url: it(t.url) });
}
var Ve = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Ht {
  constructor(e) {
    this.contextMenus = {}, this.handleClick = (n) => {
      var s;
      const i = this.contextMenus[n.id];
      i && ((s = i.onClick) === null || s === void 0 || s.call(i, n.context, n.elementId));
    }, this.messageBus = e, e.on("OBR_CONTEXT_MENU_EVENT_CLICK", this.handleClick);
  }
  create(e) {
    return Ve(this, void 0, void 0, function* () {
      this.messageBus.sendAsync("OBR_CONTEXT_MENU_CREATE", {
        id: e.id,
        shortcut: e.shortcut,
        icons: j(e.icons),
        embed: e.embed && Ie(e.embed)
      }), this.contextMenus[e.id] = e;
    });
  }
  remove(e) {
    return Ve(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_CONTEXT_MENU_REMOVE", { id: e }), delete this.contextMenus[e];
    });
  }
}
var M = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Ft {
  constructor(e) {
    this.tools = {}, this.toolActions = {}, this.toolModes = {}, this.handleToolClick = (n) => {
      const s = this.tools[n.id];
      if (s)
        if (s.onClick) {
          const i = s.onClick(n.context, n.elementId);
          Promise.resolve(i).then((o) => {
            o && this.messageBus.send("OBR_TOOL_ACTIVATE", {
              id: n.id
            });
          });
        } else
          this.messageBus.send("OBR_TOOL_ACTIVATE", {
            id: n.id
          });
    }, this.handleToolActionClick = (n) => {
      var s;
      const i = this.toolActions[n.id];
      i && ((s = i.onClick) === null || s === void 0 || s.call(i, n.context, n.elementId));
    }, this.handleToolModeClick = (n) => {
      const s = this.toolModes[n.id];
      if (s)
        if (s.onClick) {
          const i = s.onClick(n.context, n.elementId);
          Promise.resolve(i).then((o) => {
            o && this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
              toolId: n.context.activeTool,
              modeId: n.id
            });
          });
        } else
          this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
            toolId: n.context.activeTool,
            modeId: n.id
          });
    }, this.handleToolModeToolClick = (n) => {
      const s = this.toolModes[n.id];
      if (s)
        if (s.onToolClick) {
          const i = s.onToolClick(n.context, n.event);
          Promise.resolve(i).then((o) => {
            o && n.event.target && !n.event.target.locked && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
              items: [n.event.target.id]
            });
          });
        } else
          n.event.target && !n.event.target.locked && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
            items: [n.event.target.id]
          });
    }, this.handleToolModeToolDoubleClick = (n) => {
      const s = this.toolModes[n.id];
      if (s)
        if (s.onToolDoubleClick) {
          const i = s.onToolDoubleClick(n.context, n.event);
          Promise.resolve(i).then((o) => {
            o && n.event.target && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
              items: [n.event.target.id]
            });
          });
        } else
          n.event.target && this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
            items: [n.event.target.id]
          });
    }, this.handleToolModeToolDown = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onToolDown) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeToolMove = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onToolMove) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeToolUp = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onToolUp) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeToolDragStart = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onToolDragStart) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeToolDragMove = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onToolDragMove) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeToolDragEnd = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onToolDragEnd) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeToolDragCancel = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onToolDragCancel) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeKeyDown = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onKeyDown) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeKeyUp = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onKeyUp) === null || s === void 0 || s.call(i, n.context, n.event));
    }, this.handleToolModeActivate = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onActivate) === null || s === void 0 || s.call(i, n.context));
    }, this.handleToolModeDeactivate = (n) => {
      var s;
      const i = this.toolModes[n.id];
      i && ((s = i.onDeactivate) === null || s === void 0 || s.call(i, n.context));
    }, this.messageBus = e, e.on("OBR_TOOL_EVENT_CLICK", this.handleToolClick), e.on("OBR_TOOL_ACTION_EVENT_CLICK", this.handleToolActionClick), e.on("OBR_TOOL_MODE_EVENT_CLICK", this.handleToolModeClick), e.on("OBR_TOOL_MODE_EVENT_TOOL_CLICK", this.handleToolModeToolClick), e.on("OBR_TOOL_MODE_EVENT_TOOL_DOUBLE_CLICK", this.handleToolModeToolDoubleClick), e.on("OBR_TOOL_MODE_EVENT_TOOL_DOWN", this.handleToolModeToolDown), e.on("OBR_TOOL_MODE_EVENT_TOOL_MOVE", this.handleToolModeToolMove), e.on("OBR_TOOL_MODE_EVENT_TOOL_UP", this.handleToolModeToolUp), e.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_START", this.handleToolModeToolDragStart), e.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_MOVE", this.handleToolModeToolDragMove), e.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_END", this.handleToolModeToolDragEnd), e.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_CANCEL", this.handleToolModeToolDragCancel), e.on("OBR_TOOL_MODE_EVENT_KEY_DOWN", this.handleToolModeKeyDown), e.on("OBR_TOOL_MODE_EVENT_KEY_UP", this.handleToolModeKeyUp), e.on("OBR_TOOL_MODE_EVENT_ACTIVATE", this.handleToolModeActivate), e.on("OBR_TOOL_MODE_EVENT_DEACTIVATE", this.handleToolModeDeactivate);
  }
  create(e) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_CREATE", {
        id: e.id,
        shortcut: e.shortcut,
        defaultMode: e.defaultMode,
        defaultMetadata: e.defaultMetadata,
        icons: j(e.icons),
        disabled: e.disabled
      }), this.tools[e.id] = e;
    });
  }
  remove(e) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_REMOVE", { id: e }), delete this.tools[e];
    });
  }
  activateTool(e) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTIVATE", { id: e });
    });
  }
  getActiveTool() {
    return M(this, void 0, void 0, function* () {
      const { id: e } = yield this.messageBus.sendAsync("OBR_TOOL_GET_ACTIVE", {});
      return e;
    });
  }
  onToolChange(e) {
    const n = (s) => {
      e(s.id);
    };
    return this.messageBus.send("OBR_TOOL_ACTIVE_SUBSCRIBE", {}), this.messageBus.on("OBR_TOOL_ACTIVE_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_TOOL_ACTIVE_UNSUBSCRIBE", {}), this.messageBus.off("OBR_TOOL_ACTIVE_EVENT_CHANGE", n);
    };
  }
  getMetadata(e) {
    return M(this, void 0, void 0, function* () {
      const { metadata: n } = yield this.messageBus.sendAsync("OBR_TOOL_GET_METADATA", { id: e });
      return n;
    });
  }
  setMetadata(e, n) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_SET_METADATA", {
        toolId: e,
        update: n
      });
    });
  }
  createAction(e) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTION_CREATE", {
        id: e.id,
        shortcut: e.shortcut,
        icons: j(e.icons),
        disabled: e.disabled
      }), this.toolActions[e.id] = e;
    });
  }
  removeAction(e) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTION_REMOVE", { id: e }), delete this.tools[e];
    });
  }
  createMode(e) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_CREATE", {
        id: e.id,
        shortcut: e.shortcut,
        icons: j(e.icons),
        preventDrag: e.preventDrag,
        disabled: e.disabled,
        cursors: e.cursors
      }), this.toolModes[e.id] = e;
    });
  }
  removeMode(e) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_REMOVE", { id: e }), delete this.tools[e];
    });
  }
  activateMode(e, n) {
    return M(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_ACTIVATE", {
        toolId: e,
        modeId: n
      });
    });
  }
  getActiveToolMode() {
    return M(this, void 0, void 0, function* () {
      const { id: e } = yield this.messageBus.sendAsync("OBR_TOOL_MODE_GET_ACTIVE", {});
      return e;
    });
  }
  onToolModeChange(e) {
    const n = (s) => {
      e(s.id);
    };
    return this.messageBus.send("OBR_TOOL_MODE_ACTIVE_SUBSCRIBE", {}), this.messageBus.on("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_TOOL_MODE_ACTIVE_UNSUBSCRIBE", {}), this.messageBus.off("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", n);
    };
  }
}
var W = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class kt {
  constructor(e) {
    this.messageBus = e;
  }
  open(e) {
    return W(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_OPEN", Object.assign({}, Ie(e)));
    });
  }
  close(e) {
    return W(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_CLOSE", { id: e });
    });
  }
  getWidth(e) {
    return W(this, void 0, void 0, function* () {
      const { width: n } = yield this.messageBus.sendAsync("OBR_POPOVER_GET_WIDTH", { id: e });
      return n;
    });
  }
  setWidth(e, n) {
    return W(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_SET_WIDTH", { id: e, width: n });
    });
  }
  getHeight(e) {
    return W(this, void 0, void 0, function* () {
      const { height: n } = yield this.messageBus.sendAsync("OBR_POPOVER_GET_HEIGHT", { id: e });
      return n;
    });
  }
  setHeight(e, n) {
    return W(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_SET_HEIGHT", { id: e, height: n });
    });
  }
}
var He = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Yt {
  constructor(e) {
    this.messageBus = e;
  }
  open(e) {
    return He(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_MODAL_OPEN", Object.assign({}, Ie(e)));
    });
  }
  close(e) {
    return He(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_MODAL_CLOSE", { id: e });
    });
  }
}
var S = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class zt {
  constructor(e) {
    this.messageBus = e;
  }
  getWidth() {
    return S(this, void 0, void 0, function* () {
      const { width: e } = yield this.messageBus.sendAsync("OBR_ACTION_GET_WIDTH", {});
      return e;
    });
  }
  setWidth(e) {
    return S(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_WIDTH", { width: e });
    });
  }
  getHeight() {
    return S(this, void 0, void 0, function* () {
      const { height: e } = yield this.messageBus.sendAsync("OBR_ACTION_GET_HEIGHT", {});
      return e;
    });
  }
  setHeight(e) {
    return S(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_HEIGHT", { height: e });
    });
  }
  getBadgeText() {
    return S(this, void 0, void 0, function* () {
      const { badgeText: e } = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_TEXT", {});
      return e;
    });
  }
  setBadgeText(e) {
    return S(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_TEXT", { badgeText: e });
    });
  }
  getBadgeBackgroundColor() {
    return S(this, void 0, void 0, function* () {
      const { badgeBackgroundColor: e } = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_BACKGROUND_COLOR", {});
      return e;
    });
  }
  setBadgeBackgroundColor(e) {
    return S(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_BACKGROUND_COLOR", {
        badgeBackgroundColor: e
      });
    });
  }
  getIcon() {
    return S(this, void 0, void 0, function* () {
      const { icon: e } = yield this.messageBus.sendAsync("OBR_ACTION_GET_ICON", {});
      return e;
    });
  }
  setIcon(e) {
    return S(this, void 0, void 0, function* () {
      const n = j([{ icon: e }]);
      yield this.messageBus.sendAsync("OBR_ACTION_SET_ICON", {
        icon: n[0].icon
      });
    });
  }
  getTitle() {
    return S(this, void 0, void 0, function* () {
      const { title: e } = yield this.messageBus.sendAsync("OBR_ACTION_GET_TITLE", {});
      return e;
    });
  }
  setTitle(e) {
    return S(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_TITLE", { title: e });
    });
  }
  isOpen() {
    return S(this, void 0, void 0, function* () {
      const { isOpen: e } = yield this.messageBus.sendAsync("OBR_ACTION_GET_IS_OPEN", {});
      return e;
    });
  }
  open() {
    return S(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_OPEN", {});
    });
  }
  close() {
    return S(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_CLOSE", {});
    });
  }
  onOpenChange(e) {
    const n = (s) => {
      e(s.isOpen);
    };
    return this.messageBus.send("OBR_ACTION_IS_OPEN_SUBSCRIBE", {}), this.messageBus.on("OBR_ACTION_IS_OPEN_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_IS_OPEN_ACTION_UNSUBSCRIBE", {}), this.messageBus.off("OBR_ACTION_IS_OPEN_EVENT_CHANGE", n);
    };
  }
}
var Wt = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
Se();
class $t {
  constructor(e) {
    this.messageBus = e;
  }
  startItemInteraction(e) {
    return Wt(this, void 0, void 0, function* () {
      const { id: n } = yield this.messageBus.sendAsync("OBR_INTERACTION_START_ITEM_INTERACTION", { baseState: e });
      let s = e;
      return [(c) => {
        const [d, _] = Ne(s, c);
        return s = d, this.messageBus.send("OBR_INTERACTION_UPDATE_ITEM_INTERACTION", {
          id: n,
          patches: _
        }), d;
      }, () => {
        this.messageBus.send("OBR_INTERACTION_STOP_ITEM_INTERACTION", { id: n });
      }];
    });
  }
}
var Kt = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class jt {
  constructor(e) {
    this.messageBus = e;
  }
  getPlayers() {
    return Kt(this, void 0, void 0, function* () {
      const { players: e } = yield this.messageBus.sendAsync("OBR_PARTY_GET_PLAYERS", {});
      return e;
    });
  }
  onChange(e) {
    const n = (s) => {
      e(s.players);
    };
    return this.messageBus.send("OBR_PARTY_SUBSCRIBE", {}), this.messageBus.on("OBR_PARTY_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_PARTY_UNSUBSCRIBE", {}), this.messageBus.off("OBR_PARTY_EVENT_CHANGE", n);
    };
  }
}
var he = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Xt {
  constructor(e) {
    this.messageBus = e;
  }
  get id() {
    return this.messageBus.roomId;
  }
  getPermissions() {
    return he(this, void 0, void 0, function* () {
      const { permissions: e } = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
      return e;
    });
  }
  getMetadata() {
    return he(this, void 0, void 0, function* () {
      const { metadata: e } = yield this.messageBus.sendAsync("OBR_ROOM_GET_METADATA", {});
      return e;
    });
  }
  setMetadata(e) {
    return he(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ROOM_SET_METADATA", { update: e });
    });
  }
  onMetadataChange(e) {
    const n = (s) => {
      e(s.metadata);
    };
    return this.messageBus.send("OBR_ROOM_METADATA_SUBSCRIBE", {}), this.messageBus.on("OBR_ROOM_METADATA_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_METADATA_ROOM_UNSUBSCRIBE", {}), this.messageBus.off("OBR_ROOM_METADATA_EVENT_CHANGE", n);
    };
  }
  onPermissionsChange(e) {
    const n = (s) => {
      e(s.permissions);
    };
    return this.messageBus.send("OBR_ROOM_PERMISSIONS_SUBSCRIBE", {}), this.messageBus.on("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_PERMISSIONS_ROOM_UNSUBSCRIBE", {}), this.messageBus.off("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", n);
    };
  }
}
var Zt = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class Qt {
  constructor(e) {
    this.messageBus = e;
  }
  getTheme() {
    return Zt(this, void 0, void 0, function* () {
      const { theme: e } = yield this.messageBus.sendAsync("OBR_THEME_GET_THEME", {});
      return e;
    });
  }
  onChange(e) {
    const n = (s) => {
      e(s.theme);
    };
    return this.messageBus.send("OBR_THEME_SUBSCRIBE", {}), this.messageBus.on("OBR_THEME_EVENT_CHANGE", n), () => {
      this.messageBus.send("OBR_THEME_UNSUBSCRIBE", {}), this.messageBus.off("OBR_THEME_EVENT_CHANGE", n);
    };
  }
}
var se = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class qt {
  constructor(e) {
    this.messageBus = e;
  }
  uploadImages(e, n) {
    return se(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_IMAGES", {
        images: e,
        typeHint: n
      });
    });
  }
  uploadScenes(e, n) {
    return se(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_SCENES", {
        scenes: e,
        disableShowScenes: n
      });
    });
  }
  downloadImages(e, n, s) {
    return se(this, void 0, void 0, function* () {
      const { images: i } = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_IMAGES", { multiple: e, defaultSearch: n, typeHint: s }, -1);
      return i;
    });
  }
  downloadScenes(e, n) {
    return se(this, void 0, void 0, function* () {
      const { scenes: s } = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_SCENES", { multiple: e, defaultSearch: n }, -1);
      return s;
    });
  }
}
var Jt = globalThis && globalThis.__awaiter || function(t, e, n, s) {
  function i(o) {
    return o instanceof n ? o : new n(function(c) {
      c(o);
    });
  }
  return new (n || (n = Promise))(function(o, c) {
    function d(r) {
      try {
        u(s.next(r));
      } catch (a) {
        c(a);
      }
    }
    function _(r) {
      try {
        u(s.throw(r));
      } catch (a) {
        c(a);
      }
    }
    function u(r) {
      r.done ? o(r.value) : i(r.value).then(d, _);
    }
    u((s = s.apply(t, e || [])).next());
  });
};
class en {
  constructor(e) {
    this.messageBus = e;
  }
  sendMessage(e, n, s) {
    return Jt(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_BROADCAST_SEND_MESSAGE", {
        channel: e,
        data: n,
        options: s
      });
    });
  }
  onMessage(e, n) {
    return this.messageBus.send("OBR_BROADCAST_SUBSCRIBE", { channel: e }), this.messageBus.on(`OBR_BROADCAST_MESSAGE_${e}`, n), () => {
      this.messageBus.send("OBR_BROADCAST_UNSUBSCRIBE", { channel: e }), this.messageBus.off(`OBR_BROADCAST_MESSAGE_${e}`, n);
    };
  }
}
const we = typeof Buffer == "function", Fe = typeof TextDecoder == "function" ? new TextDecoder() : void 0;
typeof TextEncoder == "function" && new TextEncoder();
const tn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", nn = Array.prototype.slice.call(tn), ie = ((t) => {
  let e = {};
  return t.forEach((n, s) => e[n] = s), e;
})(nn), sn = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, G = String.fromCharCode.bind(String), ke = typeof Uint8Array.from == "function" ? Uint8Array.from.bind(Uint8Array) : (t) => new Uint8Array(Array.prototype.slice.call(t, 0)), ot = (t) => t.replace(/[^A-Za-z0-9\+\/]/g, ""), on = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, rn = (t) => {
  switch (t.length) {
    case 4:
      var e = (7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3), n = e - 65536;
      return G((n >>> 10) + 55296) + G((n & 1023) + 56320);
    case 3:
      return G((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
    default:
      return G((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1));
  }
}, cn = (t) => t.replace(on, rn), un = (t) => {
  if (t = t.replace(/\s+/g, ""), !sn.test(t))
    throw new TypeError("malformed base64.");
  t += "==".slice(2 - (t.length & 3));
  let e, n = "", s, i;
  for (let o = 0; o < t.length; )
    e = ie[t.charAt(o++)] << 18 | ie[t.charAt(o++)] << 12 | (s = ie[t.charAt(o++)]) << 6 | (i = ie[t.charAt(o++)]), n += s === 64 ? G(e >> 16 & 255) : i === 64 ? G(e >> 16 & 255, e >> 8 & 255) : G(e >> 16 & 255, e >> 8 & 255, e & 255);
  return n;
}, rt = typeof atob == "function" ? (t) => atob(ot(t)) : we ? (t) => Buffer.from(t, "base64").toString("binary") : un, an = we ? (t) => ke(Buffer.from(t, "base64")) : (t) => ke(rt(t).split("").map((e) => e.charCodeAt(0))), dn = we ? (t) => Buffer.from(t, "base64").toString("utf8") : Fe ? (t) => Fe.decode(an(t)) : (t) => cn(rt(t)), _n = (t) => ot(t.replace(/[-_]/g, (e) => e == "-" ? "+" : "/")), fn = (t) => dn(_n(t));
function ln() {
  const e = new URLSearchParams(window.location.search).get("obrref");
  let n = "", s = "";
  if (e) {
    const o = fn(e).split(" ");
    o.length === 2 && (n = o[0], s = o[1]);
  }
  return { origin: n, roomId: s };
}
var Ye;
(function(t) {
  t[t.MOVE = 0] = "MOVE", t[t.LINE = 1] = "LINE", t[t.QUAD = 2] = "QUAD", t[t.CONIC = 3] = "CONIC", t[t.CUBIC = 4] = "CUBIC", t[t.CLOSE = 5] = "CLOSE";
})(Ye || (Ye = {}));
const pe = ln(), p = new pt(pe.origin, pe.roomId), hn = new ut(p), En = new ct(p), On = new jt(p), yn = new gt(p), Tn = new Vt(p), An = new Ht(p), mn = new Ft(p), Bn = new kt(p), pn = new Yt(p), gn = new zt(p), vn = new $t(p), Rn = new Xt(p), Cn = new Qt(p), Sn = new qt(p), Nn = new en(p), Ee = {
  onReady: (t) => {
    p.ready ? t() : p.once("OBR_READY", () => t());
  },
  get isReady() {
    return p.ready;
  },
  viewport: hn,
  player: En,
  party: On,
  notification: yn,
  scene: Tn,
  contextMenu: An,
  tool: mn,
  popover: Bn,
  modal: pn,
  action: gn,
  interaction: vn,
  room: Rn,
  theme: Cn,
  assets: Sn,
  broadcast: Nn,
  /** True if the current site is embedded in an instance of Owlbear Rodeo */
  isAvailable: !!pe.origin
};
Ee.onReady(() => {
  console.log("OBR ready - Very simple extension"), Ee.contextMenu.create({
    id: "map-filter.simple-effect",
    icons: [{ icon: "/icon.svg", label: "Alap Effect Hozzáadása" }],
    onClick: async (t) => {
      const e = t.items.find((o) => o.type === "IMAGE");
      if (!e) {
        console.warn("Nincs kiválasztott kép.");
        return;
      }
      const n = `effect-${Date.now()}`, s = "https://map-filter-extension.vercel.app/effect.js", i = {
        id: n,
        type: "EFFECT",
        name: "Simple Map Effect",
        visible: !0,
        locked: !0,
        transform: {
          width: e.transform.width || 1,
          height: e.transform.height || 1,
          scaleX: 1,
          scaleY: 1,
          rotation: e.transform.rotation || 0,
          position: {
            x: e.transform.position.x,
            y: e.transform.position.y
          }
        },
        zIndex: (e.zIndex ?? 0) + 1,
        effect: {
          url: s,
          data: {
            hue: 0,
            saturation: 100,
            brightness: 100,
            gamma: 100,
            chroma: 0
          }
        }
      };
      try {
        await Ee.scene.items.addItems([i]), console.log("Effect létrehozva sikeresen!");
      } catch (o) {
        console.error("Hiba az effect létrehozásánál:", o);
      }
    },
    filter: {
      every: [{ key: "type", value: "IMAGE" }]
    }
  });
});
