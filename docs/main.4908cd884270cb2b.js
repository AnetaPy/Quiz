"use strict";
(self.webpackChunkquiz = self.webpackChunkquiz || []).push([
  [179],
  {
    126: () => {
      function X(e) {
        return "function" == typeof e;
      }
      function ri(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const mo = ri(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function ii(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class at {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (X(r))
              try {
                r();
              } catch (o) {
                t = o instanceof mo ? o.errors : [o];
              }
            const { _teardowns: i } = this;
            if (i) {
              this._teardowns = null;
              for (const o of i)
                try {
                  pd(o);
                } catch (s) {
                  (t = null != t ? t : []),
                    s instanceof mo ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new mo(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) pd(t);
            else {
              if (t instanceof at) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._teardowns =
                null !== (n = this._teardowns) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && ii(n, t);
        }
        remove(t) {
          const { _teardowns: n } = this;
          n && ii(n, t), t instanceof at && t._removeParent(this);
        }
      }
      at.EMPTY = (() => {
        const e = new at();
        return (e.closed = !0), e;
      })();
      const fd = at.EMPTY;
      function hd(e) {
        return (
          e instanceof at ||
          (e && "closed" in e && X(e.remove) && X(e.add) && X(e.unsubscribe))
        );
      }
      function pd(e) {
        X(e) ? e() : e.unsubscribe();
      }
      const Pn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        yo = {
          setTimeout(...e) {
            const { delegate: t } = yo;
            return ((null == t ? void 0 : t.setTimeout) || setTimeout)(...e);
          },
          clearTimeout(e) {
            const { delegate: t } = yo;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function gd(e) {
        yo.setTimeout(() => {
          const { onUnhandledError: t } = Pn;
          if (!t) throw e;
          t(e);
        });
      }
      function vo() {}
      const ND = ha("C", void 0, void 0);
      function ha(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let On = null;
      function Do(e) {
        if (Pn.useDeprecatedSynchronousErrorHandling) {
          const t = !On;
          if ((t && (On = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = On;
            if (((On = null), n)) throw r;
          }
        } else e();
      }
      class pa extends at {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), hd(t) && t.add(this))
              : (this.destination = jD);
        }
        static create(t, n, r) {
          return new Co(t, n, r);
        }
        next(t) {
          this.isStopped
            ? ma(
                (function kD(e) {
                  return ha("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? ma(
                (function FD(e) {
                  return ha("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? ma(ND, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      class Co extends pa {
        constructor(t, n, r) {
          let i;
          if ((super(), X(t))) i = t;
          else if (t) {
            let o;
            ({ next: i, error: n, complete: r } = t),
              this && Pn.useDeprecatedNextContext
                ? ((o = Object.create(t)),
                  (o.unsubscribe = () => this.unsubscribe()))
                : (o = t),
              (i = null == i ? void 0 : i.bind(o)),
              (n = null == n ? void 0 : n.bind(o)),
              (r = null == r ? void 0 : r.bind(o));
          }
          this.destination = {
            next: i ? ga(i) : vo,
            error: ga(null != n ? n : md),
            complete: r ? ga(r) : vo,
          };
        }
      }
      function ga(e, t) {
        return (...n) => {
          try {
            e(...n);
          } catch (r) {
            Pn.useDeprecatedSynchronousErrorHandling
              ? (function LD(e) {
                  Pn.useDeprecatedSynchronousErrorHandling &&
                    On &&
                    ((On.errorThrown = !0), (On.error = e));
                })(r)
              : gd(r);
          }
        };
      }
      function md(e) {
        throw e;
      }
      function ma(e, t) {
        const { onStoppedNotification: n } = Pn;
        n && yo.setTimeout(() => n(e, t));
      }
      const jD = { closed: !0, next: vo, error: md, complete: vo },
        ya =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Rn(e) {
        return e;
      }
      let ie = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const o = (function HD(e) {
              return (
                (e && e instanceof pa) ||
                ((function VD(e) {
                  return e && X(e.next) && X(e.error) && X(e.complete);
                })(e) &&
                  hd(e))
              );
            })(n)
              ? n
              : new Co(n, r, i);
            return (
              Do(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = vd(r))((i, o) => {
              const s = new Co({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    o(u), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ya]() {
            return this;
          }
          pipe(...n) {
            return (function yd(e) {
              return 0 === e.length
                ? Rn
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, i) => i(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = vd(n))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function vd(e) {
        var t;
        return null !== (t = null != e ? e : Pn.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const BD = ri(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Ot = (() => {
        class e extends ie {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Dd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new BD();
          }
          next(n) {
            Do(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice();
                for (const i of r) i.next(n);
              }
            });
          }
          error(n) {
            Do(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Do(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i ? fd : (o.push(n), new at(() => ii(o, n)));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? n.error(i) : o && n.complete();
          }
          asObservable() {
            const n = new ie();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Dd(t, n)), e;
      })();
      class Dd extends Ot {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : fd;
        }
      }
      function Cd(e) {
        return X(null == e ? void 0 : e.lift);
      }
      function Ae(e) {
        return (t) => {
          if (Cd(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      class Te extends pa {
        constructor(t, n, r, i, o) {
          super(t),
            (this.onFinalize = o),
            (this._next = n
              ? function (s) {
                  try {
                    n(s);
                  } catch (a) {
                    t.error(a);
                  }
                }
              : super._next),
            (this._error = i
              ? function (s) {
                  try {
                    i(s);
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (s) {
                    t.error(s);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          const { closed: n } = this;
          super.unsubscribe(),
            !n &&
              (null === (t = this.onFinalize) || void 0 === t || t.call(this));
        }
      }
      function Q(e, t) {
        return Ae((n, r) => {
          let i = 0;
          n.subscribe(
            new Te(r, (o) => {
              r.next(e.call(t, o, i++));
            })
          );
        });
      }
      function Nn(e) {
        return this instanceof Nn ? ((this.v = e), this) : new Nn(e);
      }
      function zD(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var i,
          r = n.apply(e, t || []),
          o = [];
        return (
          (i = {}),
          s("next"),
          s("throw"),
          s("return"),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function s(f) {
          r[f] &&
            (i[f] = function (h) {
              return new Promise(function (p, m) {
                o.push([f, h, p, m]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof Nn
                ? Promise.resolve(f.value.v).then(l, c)
                : d(o[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(o[0][3], p);
          }
        }
        function l(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function qD(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Ed(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(o) {
          n[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function i(o, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    o({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      const bd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Md(e) {
        return X(null == e ? void 0 : e.then);
      }
      function Sd(e) {
        return X(e[ya]);
      }
      function Td(e) {
        return (
          Symbol.asyncIterator &&
          X(null == e ? void 0 : e[Symbol.asyncIterator])
        );
      }
      function Id(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const xd = (function WD() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ad(e) {
        return X(null == e ? void 0 : e[xd]);
      }
      function Pd(e) {
        return zD(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield Nn(n.read());
              if (i) return yield Nn(void 0);
              yield yield Nn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Od(e) {
        return X(null == e ? void 0 : e.getReader);
      }
      function Rt(e) {
        if (e instanceof ie) return e;
        if (null != e) {
          if (Sd(e))
            return (function QD(e) {
              return new ie((t) => {
                const n = e[ya]();
                if (X(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (bd(e))
            return (function KD(e) {
              return new ie((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Md(e))
            return (function ZD(e) {
              return new ie((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, gd);
              });
            })(e);
          if (Td(e)) return Rd(e);
          if (Ad(e))
            return (function JD(e) {
              return new ie((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Od(e))
            return (function YD(e) {
              return Rd(Pd(e));
            })(e);
        }
        throw Id(e);
      }
      function Rd(e) {
        return new ie((t) => {
          (function XD(e, t) {
            var n, r, i, o;
            return (function UD(e, t, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? o(c.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = qD(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Kt(e, t, n, r = 0, i = !1) {
        const o = t.schedule(function () {
          n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(o), !i)) return o;
      }
      function Ie(e, t, n = 1 / 0) {
        return X(t)
          ? Ie((r, i) => Q((o, s) => t(r, o, i, s))(Rt(e(r, i))), n)
          : ("number" == typeof t && (n = t),
            Ae((r, i) =>
              (function eC(e, t, n, r, i, o, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (m) => (l < r ? p(m) : u.push(m)),
                  p = (m) => {
                    o && t.next(m), l++;
                    let y = !1;
                    Rt(n(m, c++)).subscribe(
                      new Te(
                        t,
                        (v) => {
                          null == i || i(v), o ? h(v) : t.next(v);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const v = u.shift();
                                s ? Kt(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    new Te(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, i, e, n)
            ));
      }
      function oi(e = 1 / 0) {
        return Ie(Rn, e);
      }
      const Zt = new ie((e) => e.complete());
      function Da(e) {
        return e[e.length - 1];
      }
      function Nd(e) {
        return X(Da(e)) ? e.pop() : void 0;
      }
      function si(e) {
        return (function nC(e) {
          return e && X(e.schedule);
        })(Da(e))
          ? e.pop()
          : void 0;
      }
      function Fd(e, t = 0) {
        return Ae((n, r) => {
          n.subscribe(
            new Te(
              r,
              (i) => Kt(r, e, () => r.next(i), t),
              () => Kt(r, e, () => r.complete(), t),
              (i) => Kt(r, e, () => r.error(i), t)
            )
          );
        });
      }
      function kd(e, t = 0) {
        return Ae((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Ld(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ie((n) => {
          Kt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Kt(
              n,
              t,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Pe(e, t) {
        return t
          ? (function lC(e, t) {
              if (null != e) {
                if (Sd(e))
                  return (function iC(e, t) {
                    return Rt(e).pipe(kd(t), Fd(t));
                  })(e, t);
                if (bd(e))
                  return (function sC(e, t) {
                    return new ie((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Md(e))
                  return (function oC(e, t) {
                    return Rt(e).pipe(kd(t), Fd(t));
                  })(e, t);
                if (Td(e)) return Ld(e, t);
                if (Ad(e))
                  return (function aC(e, t) {
                    return new ie((n) => {
                      let r;
                      return (
                        Kt(n, t, () => {
                          (r = e[xd]()),
                            Kt(
                              n,
                              t,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                o ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => X(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Od(e))
                  return (function uC(e, t) {
                    return Ld(Pd(e), t);
                  })(e, t);
              }
              throw Id(e);
            })(e, t)
          : Rt(e);
      }
      function pn(e) {
        return e <= 0
          ? () => Zt
          : Ae((t, n) => {
              let r = 0;
              t.subscribe(
                new Te(n, (i) => {
                  ++r <= e && (n.next(i), e <= r && n.complete());
                })
              );
            });
      }
      function jd(e = {}) {
        const {
          connector: t = () => new Ot(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: i = !0,
        } = e;
        return (o) => {
          let s = null,
            a = null,
            u = null,
            l = 0,
            c = !1,
            d = !1;
          const f = () => {
              null == a || a.unsubscribe(), (a = null);
            },
            h = () => {
              f(), (s = u = null), (c = d = !1);
            },
            p = () => {
              const m = s;
              h(), null == m || m.unsubscribe();
            };
          return Ae((m, y) => {
            l++, !d && !c && f();
            const v = (u = null != u ? u : t());
            y.add(() => {
              l--, 0 === l && !d && !c && (a = Ca(p, i));
            }),
              v.subscribe(y),
              s ||
                ((s = new Co({
                  next: (g) => v.next(g),
                  error: (g) => {
                    (d = !0), f(), (a = Ca(h, n, g)), v.error(g);
                  },
                  complete: () => {
                    (c = !0), f(), (a = Ca(h, r)), v.complete();
                  },
                })),
                Pe(m).subscribe(s));
          })(o);
        };
      }
      function Ca(e, t, ...n) {
        return !0 === t
          ? (e(), null)
          : !1 === t
          ? null
          : t(...n)
              .pipe(pn(1))
              .subscribe(() => e());
      }
      function ee(e) {
        for (let t in e) if (e[t] === ee) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function J(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(J).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function wa(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const dC = ee({ __forward_ref__: ee });
      function Ea(e) {
        return (
          (e.__forward_ref__ = Ea),
          (e.toString = function () {
            return J(this());
          }),
          e
        );
      }
      function j(e) {
        return Vd(e) ? e() : e;
      }
      function Vd(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(dC) &&
          e.__forward_ref__ === Ea
        );
      }
      class K extends Error {
        constructor(t, n) {
          super(
            (function ba(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function F(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ve(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : F(e);
      }
      function _o(e, t) {
        const n = t ? ` in ${t}` : "";
        throw new K(-201, `No provider for ${Ve(e)} found${n}`);
      }
      function Je(e, t) {
        null == e &&
          (function oe(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function R(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function vt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Ma(e) {
        return Hd(e, wo) || Hd(e, Ud);
      }
      function Hd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Bd(e) {
        return e && (e.hasOwnProperty(Sa) || e.hasOwnProperty(vC))
          ? e[Sa]
          : null;
      }
      const wo = ee({ ɵprov: ee }),
        Sa = ee({ ɵinj: ee }),
        Ud = ee({ ngInjectableDef: ee }),
        vC = ee({ ngInjectorDef: ee });
      var L = (() => (
        ((L = L || {})[(L.Default = 0)] = "Default"),
        (L[(L.Host = 1)] = "Host"),
        (L[(L.Self = 2)] = "Self"),
        (L[(L.SkipSelf = 4)] = "SkipSelf"),
        (L[(L.Optional = 8)] = "Optional"),
        L
      ))();
      let Ta;
      function gn(e) {
        const t = Ta;
        return (Ta = e), t;
      }
      function $d(e, t, n) {
        const r = Ma(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & L.Optional
          ? null
          : void 0 !== t
          ? t
          : void _o(J(e), "Injector");
      }
      function mn(e) {
        return { toString: e }.toString();
      }
      var Dt = (() => (
          ((Dt = Dt || {})[(Dt.OnPush = 0)] = "OnPush"),
          (Dt[(Dt.Default = 1)] = "Default"),
          Dt
        ))(),
        Nt = (() => {
          return (
            ((e = Nt || (Nt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Nt
          );
          var e;
        })();
      const CC = "undefined" != typeof globalThis && globalThis,
        _C = "undefined" != typeof window && window,
        wC =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Y = CC || ("undefined" != typeof global && global) || _C || wC,
        nr = {},
        te = [],
        Eo = ee({ ɵcmp: ee }),
        Ia = ee({ ɵdir: ee }),
        xa = ee({ ɵpipe: ee }),
        zd = ee({ ɵmod: ee }),
        Yt = ee({ ɵfac: ee }),
        ai = ee({ __NG_ELEMENT_ID__: ee });
      let EC = 0;
      function Xt(e) {
        return mn(() => {
          const n = {},
            r = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Dt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || te,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Nt.Emulated,
              id: "c",
              styles: e.styles || te,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.directives,
            o = e.features,
            s = e.pipes;
          return (
            (r.id += EC++),
            (r.inputs = Qd(e.inputs, n)),
            (r.outputs = Qd(e.outputs)),
            o && o.forEach((a) => a(r)),
            (r.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(qd)
              : null),
            (r.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(Gd)
              : null),
            r
          );
        });
      }
      function qd(e) {
        return (
          Ne(e) ||
          (function yn(e) {
            return e[Ia] || null;
          })(e)
        );
      }
      function Gd(e) {
        return (function Fn(e) {
          return e[xa] || null;
        })(e);
      }
      const Wd = {};
      function Ft(e) {
        return mn(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || te,
            declarations: e.declarations || te,
            imports: e.imports || te,
            exports: e.exports || te,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (Wd[e.id] = e.type), t;
        });
      }
      function Qd(e, t) {
        if (null == e) return nr;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = o);
          }
        return n;
      }
      const Oe = Xt;
      function He(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function Ne(e) {
        return e[Eo] || null;
      }
      function ut(e, t) {
        const n = e[zd] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${J(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const V = 11;
      function kt(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function _t(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Oa(e) {
        return 0 != (8 & e.flags);
      }
      function To(e) {
        return 2 == (2 & e.flags);
      }
      function Io(e) {
        return 1 == (1 & e.flags);
      }
      function wt(e) {
        return null !== e.template;
      }
      function xC(e) {
        return 0 != (512 & e[2]);
      }
      function Vn(e, t) {
        return e.hasOwnProperty(Yt) ? e[Yt] : null;
      }
      class OC {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Hn() {
        return Zd;
      }
      function Zd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = NC), RC;
      }
      function RC() {
        const e = Yd(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === nr) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function NC(e, t, n, r) {
        const i =
            Yd(e) ||
            (function FC(e, t) {
              return (e[Jd] = t);
            })(e, { previous: nr, current: null }),
          o = i.current || (i.current = {}),
          s = i.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (o[a] = new OC(u && u.currentValue, t, s === nr)), (e[r] = t);
      }
      Hn.ngInherit = !0;
      const Jd = "__ngSimpleChanges__";
      function Yd(e) {
        return e[Jd] || null;
      }
      let La;
      function ce(e) {
        return !!e.listen;
      }
      const Xd = {
        createRenderer: (e, t) =>
          (function ja() {
            return void 0 !== La
              ? La
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function me(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function dt(e, t) {
        return me(t[e.index]);
      }
      function Va(e, t) {
        return e.data[t];
      }
      function ar(e, t) {
        return e[t];
      }
      function Xe(e, t) {
        const n = t[e];
        return kt(n) ? n : n[0];
      }
      function ef(e) {
        return 4 == (4 & e[2]);
      }
      function Ha(e) {
        return 128 == (128 & e[2]);
      }
      function vn(e, t) {
        return null == t ? null : e[t];
      }
      function tf(e) {
        e[18] = 0;
      }
      function Ba(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const N = {
        lFrame: cf(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function nf() {
        return N.bindingsEnabled;
      }
      function D() {
        return N.lFrame.lView;
      }
      function W() {
        return N.lFrame.tView;
      }
      function Ua(e) {
        return (N.lFrame.contextLView = e), e[8];
      }
      function we() {
        let e = rf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function rf() {
        return N.lFrame.currentTNode;
      }
      function Lt(e, t) {
        const n = N.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function $a() {
        return N.lFrame.isParent;
      }
      function Ao() {
        return N.isInCheckNoChangesMode;
      }
      function Po(e) {
        N.isInCheckNoChangesMode = e;
      }
      function Be() {
        const e = N.lFrame;
        let t = e.bindingRootIndex;
        return (
          -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
        );
      }
      function en() {
        return N.lFrame.bindingIndex;
      }
      function ur() {
        return N.lFrame.bindingIndex++;
      }
      function tn(e) {
        const t = N.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function YC(e, t) {
        const n = N.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), qa(t);
      }
      function qa(e) {
        N.lFrame.currentDirectiveIndex = e;
      }
      function af() {
        return N.lFrame.currentQueryIndex;
      }
      function Wa(e) {
        N.lFrame.currentQueryIndex = e;
      }
      function e_(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function uf(e, t, n) {
        if (n & L.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & L.Host ||
              ((i = e_(o)), null === i || ((o = o[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const r = (N.lFrame = lf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Oo(e) {
        const t = lf(),
          n = e[1];
        (N.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function lf() {
        const e = N.lFrame,
          t = null === e ? null : e.child;
        return null === t ? cf(e) : t;
      }
      function cf(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function df() {
        const e = N.lFrame;
        return (
          (N.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const ff = df;
      function Ro() {
        const e = df();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ue() {
        return N.lFrame.selectedIndex;
      }
      function Dn(e) {
        N.lFrame.selectedIndex = e;
      }
      function de() {
        const e = N.lFrame;
        return Va(e.tView, e.selectedIndex);
      }
      function No(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = o;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function Fo(e, t, n) {
        hf(e, t, 3, n);
      }
      function ko(e, t, n, r) {
        (3 & e[2]) === n && hf(e, t, n, r);
      }
      function Qa(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function hf(e, t, n, r) {
        const o = null != r ? r : -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < o || -1 == o) &&
                (l_(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function l_(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = e[i ? -n[r] : n[r]];
        if (i) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              o.call(a);
            } finally {
            }
          }
        } else
          try {
            o.call(a);
          } finally {
          }
      }
      class fi {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Lo(e, t, n) {
        const r = ce(e);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if ("number" == typeof o) {
            if (0 !== o) break;
            i++;
            const s = n[i++],
              a = n[i++],
              u = n[i++];
            r ? e.setAttribute(t, a, u, s) : t.setAttributeNS(s, a, u);
          } else {
            const s = o,
              a = n[++i];
            Za(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              i++;
          }
        }
        return i;
      }
      function pf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Za(e) {
        return 64 === e.charCodeAt(0);
      }
      function jo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  gf(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function gf(e, t, n, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      function mf(e) {
        return -1 !== e;
      }
      function lr(e) {
        return 32767 & e;
      }
      function cr(e, t) {
        let n = (function p_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Ja = !0;
      function Vo(e) {
        const t = Ja;
        return (Ja = e), t;
      }
      let g_ = 0;
      function pi(e, t) {
        const n = Xa(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Ya(r.data, e),
          Ya(t, null),
          Ya(r.blueprint, null));
        const i = Ho(e, t),
          o = e.injectorIndex;
        if (mf(i)) {
          const s = lr(i),
            a = cr(i, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[o + l] = a[s + l] | u[s + l];
        }
        return (t[o + 8] = i), o;
      }
      function Ya(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Xa(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ho(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          const o = i[1],
            s = o.type;
          if (((r = 2 === s ? o.declTNode : 1 === s ? i[6] : null), null === r))
            return -1;
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Bo(e, t, n) {
        !(function m_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(ai) && (r = n[ai]),
            null == r && (r = n[ai] = g_++);
          const i = 255 & r;
          t.data[e + (i >> 5)] |= 1 << i;
        })(e, t, n);
      }
      function Df(e, t, n) {
        if (n & L.Optional) return e;
        _o(t, "NodeInjector");
      }
      function Cf(e, t, n, r) {
        if (
          (n & L.Optional && void 0 === r && (r = null),
          0 == (n & (L.Self | L.Host)))
        ) {
          const i = e[9],
            o = gn(void 0);
          try {
            return i ? i.get(t, r, n & L.Optional) : $d(t, r, n & L.Optional);
          } finally {
            gn(o);
          }
        }
        return Df(r, t, n);
      }
      function _f(e, t, n, r = L.Default, i) {
        if (null !== e) {
          const o = (function C_(e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(ai) ? e[ai] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : v_) : t;
          })(n);
          if ("function" == typeof o) {
            if (!uf(t, e, r)) return r & L.Host ? Df(i, n, r) : Cf(t, n, r, i);
            try {
              const s = o(r);
              if (null != s || r & L.Optional) return s;
              _o(n);
            } finally {
              ff();
            }
          } else if ("number" == typeof o) {
            let s = null,
              a = Xa(e, t),
              u = -1,
              l = r & L.Host ? t[16][6] : null;
            for (
              (-1 === a || r & L.SkipSelf) &&
              ((u = -1 === a ? Ho(e, t) : t[a + 8]),
              -1 !== u && bf(r, !1)
                ? ((s = t[1]), (a = lr(u)), (t = cr(u, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1];
              if (Ef(o, a, c.data)) {
                const d = D_(a, t, n, s, r, l);
                if (d !== wf) return d;
              }
              (u = t[a + 8]),
                -1 !== u && bf(r, t[1].data[a + 8] === l) && Ef(o, a, t)
                  ? ((s = c), (a = lr(u)), (t = cr(u, t)))
                  : (a = -1);
            }
          }
        }
        return Cf(t, n, r, i);
      }
      const wf = {};
      function v_() {
        return new dr(we(), D());
      }
      function D_(e, t, n, r, i, o) {
        const s = t[1],
          a = s.data[e + 8],
          c = Uo(
            a,
            s,
            n,
            null == r ? To(a) && Ja : r != s && 0 != (3 & a.type),
            i & L.Host && o === a
          );
        return null !== c ? gi(t, s, c, a) : wf;
      }
      function Uo(e, t, n, r, i) {
        const o = e.providerIndexes,
          s = t.data,
          a = 1048575 & o,
          u = e.directiveStart,
          c = o >> 20,
          f = i ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < u && n === p) || (h >= u && p.type === n)) return h;
        }
        if (i) {
          const h = s[u];
          if (h && wt(h) && h.type === n) return u;
        }
        return null;
      }
      function gi(e, t, n, r) {
        let i = e[n];
        const o = t.data;
        if (
          (function c_(e) {
            return e instanceof fi;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function fC(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new K(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(Ve(o[n]));
          const a = Vo(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? gn(s.injectImpl) : null;
          uf(e, r, L.Default);
          try {
            (i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function u_(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (r) {
                    const s = Zd(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, o));
                })(n, o[n], t);
          } finally {
            null !== u && gn(u), Vo(a), (s.resolving = !1), ff();
          }
        }
        return i;
      }
      function Ef(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function bf(e, t) {
        return !(e & L.Self || (e & L.Host && t));
      }
      class dr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return _f(this._tNode, this._lView, t, r, n);
        }
      }
      function $o(e) {
        return mn(() => {
          const t = e.prototype.constructor,
            n = t[Yt] || eu(t),
            r = Object.prototype;
          let i = Object.getPrototypeOf(e.prototype).constructor;
          for (; i && i !== r; ) {
            const o = i[Yt] || eu(i);
            if (o && o !== n) return o;
            i = Object.getPrototypeOf(i);
          }
          return (o) => new o();
        });
      }
      function eu(e) {
        return Vd(e)
          ? () => {
              const t = eu(j(e));
              return t && t();
            }
          : Vn(e);
      }
      function mi(e) {
        return (function y_(e, t) {
          if ("class" === t) return e.classes;
          if ("style" === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let i = 0;
            for (; i < r; ) {
              const o = n[i];
              if (pf(o)) break;
              if (0 === o) i += 2;
              else if ("number" == typeof o)
                for (i++; i < r && "string" == typeof n[i]; ) i++;
              else {
                if (o === t) return n[i + 1];
                i += 2;
              }
            }
          }
          return null;
        })(we(), e);
      }
      const hr = "__parameters__";
      function gr(e, t, n) {
        return mn(() => {
          const r = (function tu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(hr)
                ? u[hr]
                : Object.defineProperty(u, hr, { value: [] })[hr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      class B {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = R({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const w_ = new B("AnalyzeForEntryComponents");
      function ft(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), ft(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function jt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? jt(n, t) : t(n)));
      }
      function Sf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function zo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Ci = {},
        ou = "__NG_DI_FLAG__",
        Go = "ngTempTokenPath",
        O_ = /\n/gm,
        Pf = "__source",
        N_ = ee({ provide: String, useValue: ee });
      let _i;
      function Of(e) {
        const t = _i;
        return (_i = e), t;
      }
      function F_(e, t = L.Default) {
        if (void 0 === _i) throw new K(203, "");
        return null === _i
          ? $d(e, void 0, t)
          : _i.get(e, t & L.Optional ? null : void 0, t);
      }
      function M(e, t = L.Default) {
        return (
          (function DC() {
            return Ta;
          })() || F_
        )(j(e), t);
      }
      function su(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = j(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new K(900, "");
            let i,
              o = L.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = k_(a);
              "number" == typeof u
                ? -1 === u
                  ? (i = a.token)
                  : (o |= u)
                : (i = a);
            }
            t.push(M(i, o));
          } else t.push(M(r));
        }
        return t;
      }
      function wi(e, t) {
        return (e[ou] = t), (e.prototype[ou] = t), e;
      }
      function k_(e) {
        return e[ou];
      }
      const Ei = wi(
          gr("Inject", (e) => ({ token: e })),
          -1
        ),
        Vt = wi(gr("Optional"), 8),
        yr = wi(gr("SkipSelf"), 4);
      class Bf {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const iw =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        ow =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var ye = (() => (
        ((ye = ye || {})[(ye.NONE = 0)] = "NONE"),
        (ye[(ye.HTML = 1)] = "HTML"),
        (ye[(ye.STYLE = 2)] = "STYLE"),
        (ye[(ye.SCRIPT = 3)] = "SCRIPT"),
        (ye[(ye.URL = 4)] = "URL"),
        (ye[(ye.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ye
      ))();
      function Yo(e) {
        const t = (function Ti() {
          const e = D();
          return e && e[12];
        })();
        return t
          ? t.sanitize(ye.URL, e) || ""
          : (function Mi(e, t) {
              const n = (function ew(e) {
                return (e instanceof Bf && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? (function _n(e) {
              return e instanceof Bf
                ? e.changingThisBreaksApplicationSecurity
                : e;
            })(e)
          : (function Zo(e) {
              return (e = String(e)).match(iw) || e.match(ow)
                ? e
                : "unsafe:" + e;
            })(F(e));
      }
      const Jf = "__ngContext__";
      function ke(e, t) {
        e[Jf] = t;
      }
      function gu(e) {
        const t = (function Ii(e) {
          return e[Jf] || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function yu(e) {
        return e.ngOriginalError;
      }
      function Iw(e, ...t) {
        e.error(...t);
      }
      class Cr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function Tw(e) {
              return (e && e.ngErrorLogger) || Iw;
            })(t);
          r(this._console, "ERROR", t),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && yu(t);
          for (; n && yu(n); ) n = yu(n);
          return n || null;
        }
      }
      const nh = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Y))();
      function Bt(e) {
        return e instanceof Function ? e() : e;
      }
      var tt = (() => (
        ((tt = tt || {})[(tt.Important = 1)] = "Important"),
        (tt[(tt.DashCase = 2)] = "DashCase"),
        tt
      ))();
      function Du(e, t) {
        return undefined(e, t);
      }
      function xi(e) {
        const t = e[3];
        return _t(t) ? t[3] : t;
      }
      function Cu(e) {
        return ah(e[13]);
      }
      function _u(e) {
        return ah(e[4]);
      }
      function ah(e) {
        for (; null !== e && !_t(e); ) e = e[4];
        return e;
      }
      function wr(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          _t(r) ? (o = r) : kt(r) && ((s = !0), (r = r[0]));
          const a = me(r);
          0 === e && null !== n
            ? null == i
              ? hh(t, n, a)
              : Bn(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? Bn(t, n, a, i || null, !0)
            : 2 === e
            ? (function Ch(e, t, n) {
                const r = Xo(e, t);
                r &&
                  (function Jw(e, t, n, r) {
                    ce(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function eE(e, t, n, r, i) {
                const o = n[7];
                o !== me(n) && wr(t, e, r, o, i);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Ai(u[1], u, e, t, r, o);
                }
              })(t, e, o, n, i);
        }
      }
      function Eu(e, t, n) {
        if (ce(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function VC(e) {
                  const t = e.toLowerCase();
                  return "svg" === t
                    ? "http://www.w3.org/2000/svg"
                    : "math" === t
                    ? "http://www.w3.org/1998/MathML/"
                    : null;
                })(n)
              : null;
          return null === r ? e.createElement(t) : e.createElementNS(r, t);
        }
      }
      function lh(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          i = t[3];
        1024 & t[2] && ((t[2] &= -1025), Ba(i, -1)), n.splice(r, 1);
      }
      function bu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const i = r[17];
          null !== i && i !== e && lh(i, r), t > 0 && (e[n - 1][4] = r[4]);
          const o = zo(e, 10 + t);
          !(function $w(e, t) {
            Ai(e, t, t[V], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = o[19];
          null !== s && s.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function ch(e, t) {
        if (!(256 & t[2])) {
          const n = t[V];
          ce(n) && n.destroyNode && Ai(e, t, n, 3, null, null),
            (function Gw(e) {
              let t = e[13];
              if (!t) return Mu(e[1], e);
              for (; t; ) {
                let n = null;
                if (kt(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    kt(t) && Mu(t[1], t), (t = t[3]);
                  null === t && (t = e), kt(t) && Mu(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Mu(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function Zw(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof fi)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          u = o[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(i);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Kw(e, t) {
              const n = e.cleanup,
                r = t[7];
              let i = -1;
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ("string" == typeof n[o]) {
                    const s = n[o + 1],
                      a = "function" == typeof s ? s(t) : me(t[s]),
                      u = r[(i = n[o + 2])],
                      l = n[o + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(n[o], u, l)
                      : l >= 0
                      ? r[(i = l)]()
                      : r[(i = -l)].unsubscribe(),
                      (o += 2);
                  } else {
                    const s = r[(i = n[o + 1])];
                    n[o].call(s);
                  }
              if (null !== r) {
                for (let o = i + 1; o < r.length; o++) r[o]();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && ce(t[V]) && t[V].destroy();
          const n = t[17];
          if (null !== n && _t(t[3])) {
            n !== t[3] && lh(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
        }
      }
      function dh(e, t, n) {
        return (function fh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = e.data[r.directiveStart].encapsulation;
            if (i === Nt.None || i === Nt.Emulated) return null;
          }
          return dt(r, n);
        })(e, t.parent, n);
      }
      function Bn(e, t, n, r, i) {
        ce(e) ? e.insertBefore(t, n, r, i) : t.insertBefore(n, r, i);
      }
      function hh(e, t, n) {
        ce(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function ph(e, t, n, r, i) {
        null !== r ? Bn(e, t, n, r, i) : hh(e, t, n);
      }
      function Xo(e, t) {
        return ce(e) ? e.parentNode(t) : t.parentNode;
      }
      let yh = function mh(e, t, n) {
        return 40 & e.type ? dt(e, n) : null;
      };
      function es(e, t, n, r) {
        const i = dh(e, r, t),
          o = t[V],
          a = (function gh(e, t, n) {
            return yh(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) ph(o, i, n[u], a, !1);
          else ph(o, i, n, a, !1);
      }
      function ts(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return dt(t, e);
          if (4 & n) return Tu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return ts(e, r);
            {
              const i = e[t.index];
              return _t(i) ? Tu(-1, i) : me(i);
            }
          }
          if (32 & n) return Du(t, e)() || me(e[t.index]);
          {
            const r = Dh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : ts(xi(e[16]), r)
              : ts(e, t.next);
          }
        }
        return null;
      }
      function Dh(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function Tu(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[1].firstChild;
          if (null !== i) return ts(r, i);
        }
        return t[7];
      }
      function Iu(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && ke(me(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) Iu(e, t, n.child, r, i, o, !1), wr(t, e, i, a, o);
            else if (32 & u) {
              const l = Du(n, r);
              let c;
              for (; (c = l()); ) wr(t, e, i, c, o);
              wr(t, e, i, a, o);
            } else 16 & u ? _h(e, t, r, n, i, o) : wr(t, e, i, a, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Ai(e, t, n, r, i, o) {
        Iu(n, r, e.firstChild, t, i, o, !1);
      }
      function _h(e, t, n, r, i, o) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) wr(t, e, i, u[l], o);
        else Iu(e, t, u, s[3], i, o, !0);
      }
      function wh(e, t, n) {
        ce(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function xu(e, t, n) {
        ce(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function Eh(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const bh = "ng-template";
      function nE(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let i = e[r++];
          if (n && "class" === i) {
            if (((i = e[r]), -1 !== Eh(i.toLowerCase(), t, 0))) return !0;
          } else if (1 === i) {
            for (; r < e.length && "string" == typeof (i = e[r++]); )
              if (i.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Mh(e) {
        return 4 === e.type && e.value !== bh;
      }
      function rE(e, t, n) {
        return t === (4 !== e.type || n ? e.value : bh);
      }
      function iE(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          o = (function aE(e) {
            for (let t = 0; t < e.length; t++) if (pf(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !rE(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (Et(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!nE(e.attrs, l, n)) {
                    if (Et(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = oE(8 & r ? "class" : u, i, Mh(e), n);
                if (-1 === d) {
                  if (Et(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Eh(h, l, 0)) || (2 & r && l !== f)) {
                    if (Et(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Et(r) && !Et(u)) return !1;
            if (s && Et(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return Et(r) || s;
      }
      function Et(e) {
        return 0 == (1 & e);
      }
      function oE(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function uE(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Sh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (iE(e, t[r], n)) return !0;
        return !1;
      }
      function Th(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function cE(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = "",
          o = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !Et(s) && ((t += Th(o, i)), (i = "")),
              (r = s),
              (o = o || !Et(r));
          n++;
        }
        return "" !== i && (t += Th(o, i)), t;
      }
      const k = {};
      function S(e) {
        Ih(W(), D(), Ue() + e, Ao());
      }
      function Ih(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const o = e.preOrderCheckHooks;
            null !== o && Fo(t, o, n);
          } else {
            const o = e.preOrderHooks;
            null !== o && ko(t, o, 0, n);
          }
        Dn(n);
      }
      function Vh(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              o = n[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              Wa(i), s.contentQueries(2, t[o], o);
            }
          }
      }
      function Pi(e, t, n, r, i, o, s, a, u, l) {
        const c = t.blueprint.slice();
        return (
          (c[0] = i),
          (c[2] = 140 | r),
          tf(c),
          (c[3] = c[15] = e),
          (c[8] = n),
          (c[10] = s || (e && e[10])),
          (c[V] = a || (e && e[V])),
          (c[12] = u || (e && e[12]) || null),
          (c[9] = l || (e && e[9]) || null),
          (c[6] = o),
          (c[16] = 2 == t.type ? e[16] : c),
          c
        );
      }
      function Er(e, t, n, r, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function Bu(e, t, n, r, i) {
            const o = rf(),
              s = $a(),
              u = (e.data[t] = (function IE(e, t, n, r, i, o) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== o &&
                (s
                  ? null == o.child && null !== u.parent && (o.child = u)
                  : null === o.next && (o.next = u)),
              u
            );
          })(e, t, n, r, i)),
            (function JC() {
              return N.lFrame.inI18n;
            })() && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function di() {
            const e = N.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Lt(o, !0), o;
      }
      function br(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let o = 0; o < n; o++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function Oi(e, t, n) {
        Oo(t);
        try {
          const r = e.viewQuery;
          null !== r && Zu(1, r, n);
          const i = e.template;
          null !== i && Hh(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Vh(e, t),
            e.staticViewQueries && Zu(2, e.viewQuery, n);
          const o = e.components;
          null !== o &&
            (function ME(e, t) {
              for (let n = 0; n < t.length; n++) GE(e, t[n]);
            })(t, o);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Ro();
        }
      }
      function Mr(e, t, n, r) {
        const i = t[2];
        if (256 == (256 & i)) return;
        Oo(t);
        const o = Ao();
        try {
          tf(t),
            (function of(e) {
              return (N.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && Hh(e, t, n, 2, r);
          const s = 3 == (3 & i);
          if (!o)
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Fo(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && ko(t, l, 0, null), Qa(t, 0);
            }
          if (
            ((function zE(e) {
              for (let t = Cu(e); null !== t; t = _u(t)) {
                if (!t[2]) continue;
                const n = t[9];
                for (let r = 0; r < n.length; r++) {
                  const i = n[r],
                    o = i[3];
                  0 == (1024 & i[2]) && Ba(o, 1), (i[2] |= 1024);
                }
              }
            })(t),
            (function $E(e) {
              for (let t = Cu(e); null !== t; t = _u(t))
                for (let n = 10; n < t.length; n++) {
                  const r = t[n],
                    i = r[1];
                  Ha(r) && Mr(i, r, i.template, r[8]);
                }
            })(t),
            null !== e.contentQueries && Vh(e, t),
            !o)
          )
            if (s) {
              const l = e.contentCheckHooks;
              null !== l && Fo(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && ko(t, l, 1), Qa(t, 1);
            }
          !(function EE(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const i = n[r];
                  if (i < 0) Dn(~i);
                  else {
                    const o = i,
                      s = n[++r],
                      a = n[++r];
                    YC(s, o), a(2, t[o]);
                  }
                }
              } finally {
                Dn(-1);
              }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function bE(e, t) {
              for (let n = 0; n < t.length; n++) qE(e, t[n]);
            })(t, a);
          const u = e.viewQuery;
          if ((null !== u && Zu(2, u, r), !o))
            if (s) {
              const l = e.viewCheckHooks;
              null !== l && Fo(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && ko(t, l, 2), Qa(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            o || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), Ba(t[3], -1));
        } finally {
          Ro();
        }
      }
      function SE(e, t, n, r) {
        const i = t[10],
          o = !Ao(),
          s = ef(t);
        try {
          o && !s && i.begin && i.begin(), s && Oi(e, t, r), Mr(e, t, n, r);
        } finally {
          o && !s && i.end && i.end();
        }
      }
      function Hh(e, t, n, r, i) {
        const o = Ue(),
          s = 2 & r;
        try {
          Dn(-1), s && t.length > 20 && Ih(e, t, 20, Ao()), n(r, i);
        } finally {
          Dn(o);
        }
      }
      function Uu(e, t, n) {
        !nf() ||
          ((function FE(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            e.firstCreatePass || pi(n, t), ke(r, t);
            const s = n.initialInputs;
            for (let a = i; a < o; a++) {
              const u = e.data[a],
                l = wt(u);
              l && HE(t, n, u);
              const c = gi(t, e, a, n);
              ke(c, t),
                null !== s && BE(0, a - i, c, u, 0, s),
                l && (Xe(n.index, t)[8] = c);
            }
          })(e, t, n, dt(n, t)),
          128 == (128 & n.flags) &&
            (function kE(e, t, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                s = n.index,
                a = (function XC() {
                  return N.lFrame.currentDirectiveIndex;
                })();
              try {
                Dn(s);
                for (let u = r; u < i; u++) {
                  const l = e.data[u],
                    c = t[u];
                  qa(u),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Kh(l, c);
                }
              } finally {
                Dn(-1), qa(a);
              }
            })(e, t, n));
      }
      function $u(e, t, n = dt) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function Uh(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = os(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function os(e, t, n, r, i, o, s, a, u, l) {
        const c = 20 + r,
          d = c + i,
          f = (function TE(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : k);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function qh(e, t, n, r) {
        const i = tp(t);
        null === n
          ? i.push(r)
          : (i.push(n), e.firstCreatePass && np(e).push(r, i.length - 1));
      }
      function Gh(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const i = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, i)
              : (n[r] = [t, i]);
          }
        return n;
      }
      function nt(e, t, n, r, i, o, s, a) {
        const u = dt(t, n);
        let c,
          l = t.inputs;
        !a && null != l && (c = l[r])
          ? (op(e, n, c, r, i),
            To(t) &&
              (function PE(e, t) {
                const n = Xe(t, e);
                16 & n[2] || (n[2] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function AE(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (i = null != s ? s(i, t.value || "", r) : i),
            ce(o)
              ? o.setProperty(u, r, i)
              : Za(r) || (u.setProperty ? u.setProperty(r, i) : (u[r] = i)));
      }
      function zu(e, t, n, r) {
        let i = !1;
        if (nf()) {
          const o = (function LE(e, t, n) {
              const r = e.directiveRegistry;
              let i = null;
              if (r)
                for (let o = 0; o < r.length; o++) {
                  const s = r[o];
                  Sh(n, s.selectors, !1) &&
                    (i || (i = []),
                    Bo(pi(n, t), e, s.type),
                    wt(s) ? (Zh(e, n), i.unshift(s)) : i.push(s));
                }
              return i;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== o) {
            (i = !0), Jh(n, e.data.length, o.length);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = br(e, t, o.length, null);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              (n.mergedAttrs = jo(n.mergedAttrs, d.hostAttrs)),
                Yh(e, n, t, l, d),
                VE(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++;
            }
            !(function xE(e, t) {
              const r = t.directiveEnd,
                i = e.data,
                o = t.attrs,
                s = [];
              let a = null,
                u = null;
              for (let l = t.directiveStart; l < r; l++) {
                const c = i[l],
                  d = c.inputs,
                  f = null === o || Mh(t) ? null : UE(d, o);
                s.push(f), (a = Gh(d, l, a)), (u = Gh(c.outputs, l, u));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (t.flags |= 16),
                a.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = s),
                (t.inputs = a),
                (t.outputs = u);
            })(e, n);
          }
          s &&
            (function jE(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let i = 0; i < t.length; i += 2) {
                  const o = n[t[i + 1]];
                  if (null == o)
                    throw new K(
                      -301,
                      `Export of name '${t[i + 1]}' not found!`
                    );
                  r.push(t[i], o);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = jo(n.mergedAttrs, n.attrs)), i;
      }
      function Qh(e, t, n, r, i, o) {
        const s = o.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function NE(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, i, s);
        }
      }
      function Kh(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Zh(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function VE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          wt(t) && (n[""] = e);
        }
      }
      function Jh(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Yh(e, t, n, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = Vn(i.type)),
          s = new fi(o, wt(i), null);
        (e.blueprint[r] = s),
          (n[r] = s),
          Qh(e, t, 0, r, br(e, n, i.hostVars, k), i);
      }
      function HE(e, t, n) {
        const r = dt(t, e),
          i = Uh(n),
          o = e[10],
          s = ss(
            e,
            Pi(
              e,
              i,
              null,
              n.onPush ? 64 : 16,
              r,
              t,
              o,
              o.createRenderer(r, n),
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function BE(e, t, n, r, i, o) {
        const s = o[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function UE(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const i = t[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              e.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, e[i], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Xh(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function qE(e, t) {
        const n = Xe(t, e);
        if (Ha(n)) {
          const r = n[1];
          80 & n[2] ? Mr(r, n, r.template, n[8]) : n[5] > 0 && Gu(n);
        }
      }
      function Gu(e) {
        for (let r = Cu(e); null !== r; r = _u(r))
          for (let i = 10; i < r.length; i++) {
            const o = r[i];
            if (1024 & o[2]) {
              const s = o[1];
              Mr(s, o, s.template, o[8]);
            } else o[5] > 0 && Gu(o);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = Xe(n[r], e);
            Ha(i) && i[5] > 0 && Gu(i);
          }
      }
      function GE(e, t) {
        const n = Xe(t, e),
          r = n[1];
        (function WE(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Oi(r, n, n[8]);
      }
      function ss(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Wu(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = xi(e);
          if (xC(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Ku(e, t, n) {
        const r = t[10];
        r.begin && r.begin();
        try {
          Mr(e, t, e.template, n);
        } catch (i) {
          throw (ip(t, i), i);
        } finally {
          r.end && r.end();
        }
      }
      function ep(e) {
        !(function Qu(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = gu(n),
              i = r[1];
            SE(i, r, i.template, n);
          }
        })(e[8]);
      }
      function Zu(e, t, n) {
        Wa(0), t(e, n);
      }
      const JE = (() => Promise.resolve(null))();
      function tp(e) {
        return e[7] || (e[7] = []);
      }
      function np(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function ip(e, t) {
        const n = e[9],
          r = n ? n.get(Cr, null) : null;
        r && r.handleError(t);
      }
      function op(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, i, r, a) : (u[a] = i);
        }
      }
      function rn(e, t, n) {
        const r = (function xo(e, t) {
          return me(t[e]);
        })(t, e);
        !(function uh(e, t, n) {
          ce(e) ? e.setValue(t, n) : (t.textContent = n);
        })(e[V], r, n);
      }
      function as(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = wa(i, a))
              : 2 == o && (r = wa(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      const Ju = new B("INJECTOR", -1);
      class sp {
        get(t, n = Ci) {
          if (n === Ci) {
            const r = new Error(`NullInjectorError: No provider for ${J(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Yu = new B("Set Injector scope."),
        Ri = {},
        e0 = {};
      let Xu;
      function ap() {
        return void 0 === Xu && (Xu = new sp()), Xu;
      }
      function up(e, t = null, n = null, r) {
        const i = lp(e, t, n, r);
        return i._resolveInjectorDefTypes(), i;
      }
      function lp(e, t = null, n = null, r) {
        return new t0(e, n, t || ap(), r);
      }
      class t0 {
        constructor(t, n, r, i = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const o = [];
          n && jt(n, (a) => this.processProvider(a, t, n)),
            jt([t], (a) => this.processInjectorType(a, [], o)),
            this.records.set(Ju, Sr(void 0, this));
          const s = this.records.get(Yu);
          (this.scope = null != s ? s.value : null),
            (this.source = i || ("object" == typeof t ? null : J(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, n = Ci, r = L.Default) {
          this.assertNotDestroyed();
          const i = Of(this),
            o = gn(void 0);
          try {
            if (!(r & L.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function c0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof B)
                    );
                  })(t) && Ma(t);
                (a = u && this.injectableDefInScope(u) ? Sr(el(t), Ri) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & L.Self ? ap() : this.parent).get(
              t,
              (n = r & L.Optional && n === Ci ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Go] = s[Go] || []).unshift(J(t)), i)) throw s;
              return (function L_(e, t, n, r) {
                const i = e[Go];
                throw (
                  (t[Pf] && i.unshift(t[Pf]),
                  (e.message = (function j_(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let i = J(t);
                    if (Array.isArray(t)) i = t.map(J).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : J(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      O_,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[Go] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            gn(o), Of(i);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((r, i) => t.push(J(i))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new K(205, "");
        }
        processInjectorType(t, n, r) {
          if (!(t = j(t))) return !1;
          let i = Bd(t);
          const o = (null == i && t.ngModule) || void 0,
            s = void 0 === o ? t : o,
            a = -1 !== r.indexOf(s);
          if ((void 0 !== o && (i = Bd(o)), null == i)) return !1;
          if (null != i.imports && !a) {
            let c;
            r.push(s);
            try {
              jt(i.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                jt(h, (p) => this.processProvider(p, f, h || te));
              }
          }
          this.injectorDefTypes.add(s);
          const u = Vn(s) || (() => new s());
          this.records.set(s, Sr(u, Ri));
          const l = i.providers;
          if (null != l && !a) {
            const c = t;
            jt(l, (d) => this.processProvider(d, c, l));
          }
          return void 0 !== o && void 0 !== t.providers;
        }
        processProvider(t, n, r) {
          let i = Tr((t = j(t))) ? t : j(t && t.provide);
          const o = (function r0(e, t, n) {
            return dp(e)
              ? Sr(void 0, e.useValue)
              : Sr(
                  (function cp(e, t, n) {
                    let r;
                    if (Tr(e)) {
                      const i = j(e);
                      return Vn(i) || el(i);
                    }
                    if (dp(e)) r = () => j(e.useValue);
                    else if (
                      (function s0(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...su(e.deps || []));
                    else if (
                      (function o0(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => M(j(e.useExisting));
                    else {
                      const i = j(e && (e.useClass || e.provide));
                      if (
                        !(function u0(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Vn(i) || el(i);
                      r = () => new i(...su(e.deps));
                    }
                    return r;
                  })(e),
                  Ri
                );
          })(t);
          if (Tr(t) || !0 !== t.multi) this.records.get(i);
          else {
            let s = this.records.get(i);
            s ||
              ((s = Sr(void 0, Ri, !0)),
              (s.factory = () => su(s.multi)),
              this.records.set(i, s)),
              (i = t),
              s.multi.push(t);
          }
          this.records.set(i, o);
        }
        hydrate(t, n) {
          return (
            n.value === Ri && ((n.value = e0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function l0(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = j(t.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function el(e) {
        const t = Ma(e),
          n = null !== t ? t.factory : Vn(e);
        if (null !== n) return n;
        if (e instanceof B) throw new K(204, "");
        if (e instanceof Function)
          return (function n0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Di(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new K(204, ""))
              );
            const n = (function mC(e) {
              const t = e && (e[wo] || e[Ud]);
              if (t) {
                const n = (function yC(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new K(204, "");
      }
      function Sr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function dp(e) {
        return null !== e && "object" == typeof e && N_ in e;
      }
      function Tr(e) {
        return "function" == typeof e;
      }
      let Le = (() => {
        class e {
          static create(n, r) {
            var i;
            if (Array.isArray(n)) return up({ name: "" }, r, n, "");
            {
              const o = null !== (i = n.name) && void 0 !== i ? i : "";
              return up({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Ci),
          (e.NULL = new sp()),
          (e.ɵprov = R({ token: e, providedIn: "any", factory: () => M(Ju) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function v0(e, t) {
        No(gu(e)[1], we());
      }
      let us = null;
      function Ir() {
        if (!us) {
          const e = Y.Symbol;
          if (e && e.iterator) us = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (us = r);
            }
          }
        }
        return us;
      }
      function Ni(e) {
        return (
          !!il(e) && (Array.isArray(e) || (!(e instanceof Map) && Ir() in e))
        );
      }
      function il(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function $t(e, t, n) {
        return (e[t] = n);
      }
      function je(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Un(e, t, n, r) {
        const i = je(e, t, n);
        return je(e, t + 1, r) || i;
      }
      function Ar(e, t, n, r) {
        return je(e, ur(), n) ? t + F(n) + r : k;
      }
      function Or(e, t, n, r, i, o, s, a) {
        const l = (function ls(e, t, n, r, i) {
          const o = Un(e, t, n, r);
          return je(e, t + 2, i) || o;
        })(e, en(), n, i, s);
        return tn(3), l ? t + F(n) + r + F(i) + o + F(s) + a : k;
      }
      function jr(e, t, n, r, i, o, s, a) {
        const u = D(),
          l = W(),
          c = e + 20,
          d = l.firstCreatePass
            ? (function x0(e, t, n, r, i, o, s, a, u) {
                const l = t.consts,
                  c = Er(t, e, 4, s || null, vn(l, a));
                zu(t, n, c, vn(l, u)), No(t, c);
                const d = (c.tViews = os(
                  2,
                  c,
                  r,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, i, o, s)
            : l.data[c];
        Lt(d, !1);
        const f = u[V].createComment("");
        es(l, u, f, d),
          ke(f, u),
          ss(u, (u[c] = Xh(f, u, f, d))),
          Io(d) && Uu(l, u, d),
          null != s && $u(u, d, a);
      }
      function T(e, t = L.Default) {
        const n = D();
        return null === n ? M(e, t) : _f(we(), n, j(e), t);
      }
      function cl() {
        throw new Error("invalid");
      }
      function ze(e, t, n) {
        const r = D();
        return je(r, ur(), t) && nt(W(), de(), r, e, t, r[V], n, !1), ze;
      }
      function dl(e, t, n, r, i) {
        const s = i ? "class" : "style";
        op(e, n, t.inputs[s], s, r);
      }
      function C(e, t, n, r) {
        const i = D(),
          o = W(),
          s = 20 + e,
          a = i[V],
          u = (i[s] = Eu(
            a,
            t,
            (function a_() {
              return N.lFrame.currentNamespace;
            })()
          )),
          l = o.firstCreatePass
            ? (function Z0(e, t, n, r, i, o, s) {
                const a = t.consts,
                  l = Er(t, e, 2, i, vn(a, o));
                return (
                  zu(t, n, l, vn(a, s)),
                  null !== l.attrs && as(l, l.attrs, !1),
                  null !== l.mergedAttrs && as(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, o, i, 0, t, n, r)
            : o.data[s];
        Lt(l, !0);
        const c = l.mergedAttrs;
        null !== c && Lo(a, u, c);
        const d = l.classes;
        null !== d && xu(a, u, d);
        const f = l.styles;
        null !== f && wh(a, u, f),
          64 != (64 & l.flags) && es(o, i, u, l),
          0 ===
            (function qC() {
              return N.lFrame.elementDepthCount;
            })() && ke(u, i),
          (function GC() {
            N.lFrame.elementDepthCount++;
          })(),
          Io(l) &&
            (Uu(o, i, l),
            (function Bh(e, t, n) {
              if (Oa(t)) {
                const i = t.directiveEnd;
                for (let o = t.directiveStart; o < i; o++) {
                  const s = e.data[o];
                  s.contentQueries && s.contentQueries(1, n[o], o);
                }
              }
            })(o, l, i)),
          null !== r && $u(i, l);
      }
      function _() {
        let e = we();
        $a()
          ? (function za() {
              N.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Lt(e, !1));
        const t = e;
        !(function WC() {
          N.lFrame.elementDepthCount--;
        })();
        const n = W();
        n.firstCreatePass && (No(n, e), Oa(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function f_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            dl(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function h_(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            dl(n, t, D(), t.stylesWithoutHost, !1);
      }
      function Qe(e, t, n, r) {
        C(e, t, n, r), _();
      }
      function fl() {
        return D();
      }
      function ds(e) {
        return !!e && "function" == typeof e.then;
      }
      const Qp = function Wp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function zt(e, t, n, r) {
        const i = D(),
          o = W(),
          s = we();
        return (
          (function Zp(e, t, n, r, i, o, s, a) {
            const u = Io(r),
              c = e.firstCreatePass && np(e),
              d = t[8],
              f = tp(t);
            let h = !0;
            if (3 & r.type || a) {
              const y = dt(r, t),
                v = a ? a(y) : y,
                g = f.length,
                b = a ? (P) => a(me(P[r.index])) : r.index;
              if (ce(n)) {
                let P = null;
                if (
                  (!a &&
                    u &&
                    (P = (function X0(e, t, n, r) {
                      const i = e.cleanup;
                      if (null != i)
                        for (let o = 0; o < i.length - 1; o += 2) {
                          const s = i[o];
                          if (s === n && i[o + 1] === r) {
                            const a = t[7],
                              u = i[o + 2];
                            return a.length > u ? a[u] : null;
                          }
                          "string" == typeof s && (o += 2);
                        }
                      return null;
                    })(e, t, i, r.index)),
                  null !== P)
                )
                  ((P.__ngLastListenerFn__ || P).__ngNextListenerFn__ = o),
                    (P.__ngLastListenerFn__ = o),
                    (h = !1);
                else {
                  o = hl(r, t, d, o, !1);
                  const G = n.listen(v, i, o);
                  f.push(o, G), c && c.push(i, b, g, g + 1);
                }
              } else
                (o = hl(r, t, d, o, !0)),
                  v.addEventListener(i, o, s),
                  f.push(o),
                  c && c.push(i, b, g, s);
            } else o = hl(r, t, d, o, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[i])) {
              const y = m.length;
              if (y)
                for (let v = 0; v < y; v += 2) {
                  const st = t[m[v]][m[v + 1]].subscribe(o),
                    tr = f.length;
                  f.push(o, st), c && c.push(i, r.index, tr, -(tr + 1));
                }
            }
          })(o, i, i[V], s, e, t, !!n, r),
          zt
        );
      }
      function Jp(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return ip(e, i), !1;
        }
      }
      function hl(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          const a = 2 & e.flags ? Xe(e.index, t) : t;
          0 == (32 & t[2]) && Wu(a);
          let u = Jp(t, 0, r, s),
            l = o.__ngNextListenerFn__;
          for (; l; ) (u = Jp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return i && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function pl(e = 1) {
        return (function t_(e) {
          return (N.lFrame.contextLView = (function n_(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, N.lFrame.contextLView))[8];
        })(e);
      }
      function gl(e, t, n) {
        return ml(e, "", t, "", n), gl;
      }
      function ml(e, t, n, r, i) {
        const o = D(),
          s = Ar(o, t, n, r);
        return s !== k && nt(W(), de(), o, e, s, o[V], i, !1), ml;
      }
      function I(e, t = "") {
        const n = D(),
          r = W(),
          i = e + 20,
          o = r.firstCreatePass ? Er(r, i, 1, t, null) : r.data[i],
          s = (n[i] = (function wu(e, t) {
            return ce(e) ? e.createText(t) : e.createTextNode(t);
          })(n[V], t));
        es(r, n, s, o), Lt(o, !1);
      }
      function Z(e) {
        return ve("", e, ""), Z;
      }
      function ve(e, t, n) {
        const r = D(),
          i = Ar(r, e, t, n);
        return i !== k && rn(r, Ue(), i), ve;
      }
      function $n(e, t, n, r, i) {
        const o = D(),
          s = (function Pr(e, t, n, r, i, o) {
            const a = Un(e, en(), n, i);
            return tn(2), a ? t + F(n) + r + F(i) + o : k;
          })(o, e, t, n, r, i);
        return s !== k && rn(o, Ue(), s), $n;
      }
      function vl(e, t, n, r, i, o, s) {
        const a = D(),
          u = Or(a, e, t, n, r, i, o, s);
        return u !== k && rn(a, Ue(), u), vl;
      }
      const zn = void 0;
      var Hb = [
        "en",
        [["a", "p"], ["AM", "PM"], zn],
        [["AM", "PM"], zn, zn],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        zn,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        zn,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", zn, "{1} 'at' {0}", zn],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function Vb(e) {
          const n = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let Br = {};
      function Vg(e) {
        return (
          e in Br ||
            (Br[e] =
              Y.ng &&
              Y.ng.common &&
              Y.ng.common.locales &&
              Y.ng.common.locales[e]),
          Br[e]
        );
      }
      var E = (() => (
        ((E = E || {})[(E.LocaleId = 0)] = "LocaleId"),
        (E[(E.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (E[(E.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (E[(E.DaysFormat = 3)] = "DaysFormat"),
        (E[(E.DaysStandalone = 4)] = "DaysStandalone"),
        (E[(E.MonthsFormat = 5)] = "MonthsFormat"),
        (E[(E.MonthsStandalone = 6)] = "MonthsStandalone"),
        (E[(E.Eras = 7)] = "Eras"),
        (E[(E.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (E[(E.WeekendRange = 9)] = "WeekendRange"),
        (E[(E.DateFormat = 10)] = "DateFormat"),
        (E[(E.TimeFormat = 11)] = "TimeFormat"),
        (E[(E.DateTimeFormat = 12)] = "DateTimeFormat"),
        (E[(E.NumberSymbols = 13)] = "NumberSymbols"),
        (E[(E.NumberFormats = 14)] = "NumberFormats"),
        (E[(E.CurrencyCode = 15)] = "CurrencyCode"),
        (E[(E.CurrencySymbol = 16)] = "CurrencySymbol"),
        (E[(E.CurrencyName = 17)] = "CurrencyName"),
        (E[(E.Currencies = 18)] = "Currencies"),
        (E[(E.Directionality = 19)] = "Directionality"),
        (E[(E.PluralCase = 20)] = "PluralCase"),
        (E[(E.ExtraData = 21)] = "ExtraData"),
        E
      ))();
      const hs = "en-US";
      let Hg = hs;
      class dm {}
      class $M {
        resolveComponentFactory(t) {
          throw (function UM(e) {
            const t = Error(
              `No component factory found for ${J(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let $r = (() => {
        class e {}
        return (e.NULL = new $M()), e;
      })();
      function zM() {
        return zr(we(), D());
      }
      function zr(e, t) {
        return new on(dt(e, t));
      }
      let on = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = zM), e;
      })();
      function qM(e) {
        return e instanceof on ? e.nativeElement : e;
      }
      class hm {}
      let Bi = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function WM() {
                const e = D(),
                  n = Xe(we().index, e);
                return (function GM(e) {
                  return e[V];
                })(kt(n) ? n : e);
              })()),
            e
          );
        })(),
        QM = (() => {
          class e {}
          return (
            (e.ɵprov = R({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class vs {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const KM = new vs("13.2.0"),
        Ml = {};
      function Ds(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index];
          if ((null !== o && r.push(me(o)), _t(o)))
            for (let a = 10; a < o.length; a++) {
              const u = o[a],
                l = u[1].firstChild;
              null !== l && Ds(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) Ds(e, t, n.child, r);
          else if (32 & s) {
            const a = Du(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Dh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = xi(t[16]);
              Ds(u[1], u, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class Ui {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Ds(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (_t(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (bu(t, r), zo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          ch(this._lView[1], this._lView);
        }
        onDestroy(t) {
          qh(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Wu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Ku(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function KE(e, t, n) {
            Po(!0);
            try {
              Ku(e, t, n);
            } finally {
              Po(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new K(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function qw(e, t) {
              Ai(e, t, t[V], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new K(902, "");
          this._appRef = t;
        }
      }
      class ZM extends Ui {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          ep(this._view);
        }
        checkNoChanges() {
          !(function ZE(e) {
            Po(!0);
            try {
              ep(e);
            } finally {
              Po(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class pm extends $r {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Ne(t);
          return new Sl(n, this.ngModule);
        }
      }
      function gm(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      const YM = new B("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => nh,
      });
      class Sl extends dm {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function dE(e) {
              return e.map(cE).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return gm(this.componentDef.inputs);
        }
        get outputs() {
          return gm(this.componentDef.outputs);
        }
        create(t, n, r, i) {
          const o = (i = i || this.ngModule)
              ? (function XM(e, t) {
                  return {
                    get: (n, r, i) => {
                      const o = e.get(n, Ml, i);
                      return o !== Ml || r === Ml ? o : t.get(n, r, i);
                    },
                  };
                })(t, i.injector)
              : t,
            s = o.get(hm, Xd),
            a = o.get(QM, null),
            u = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function zh(e, t, n) {
                  if (ce(e)) return e.selectRootElement(t, n === Nt.ShadowDom);
                  let r = "string" == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ""), r;
                })(u, r, this.componentDef.encapsulation)
              : Eu(
                  s.createRenderer(null, this.componentDef),
                  l,
                  (function JM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(l)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function wp(e, t) {
              return {
                components: [],
                scheduler: e || nh,
                clean: JE,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = os(0, null, null, 1, 0, null, null, null, null, null),
            p = Pi(null, h, f, d, null, null, s, u, a, o);
          let m, y;
          Oo(p);
          try {
            const v = (function Cp(e, t, n, r, i, o) {
              const s = n[1];
              n[20] = e;
              const u = Er(s, 20, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (as(u, l, !0),
                null !== e &&
                  (Lo(i, e, l),
                  null !== u.classes && xu(i, e, u.classes),
                  null !== u.styles && wh(i, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = Pi(
                  n,
                  Uh(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  u,
                  r,
                  c,
                  o || null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Bo(pi(u, n), s, t.type), Zh(s, u), Jh(u, n.length, 1)),
                ss(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, s, u);
            if (c)
              if (r) Lo(u, c, ["ng-version", KM.full]);
              else {
                const { attrs: g, classes: b } = (function fE(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < e.length; ) {
                    let o = e[r];
                    if ("string" == typeof o)
                      2 === i
                        ? "" !== o && t.push(o, e[++r])
                        : 8 === i && n.push(o);
                    else {
                      if (!Et(i)) break;
                      i = o;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                g && Lo(u, c, g), b && b.length > 0 && xu(u, c, b.join(" "));
              }
            if (((y = Va(h, 20)), void 0 !== n)) {
              const g = (y.projection = []);
              for (let b = 0; b < this.ngContentSelectors.length; b++) {
                const P = n[b];
                g.push(null != P ? Array.from(P) : null);
              }
            }
            (m = (function _p(e, t, n, r, i) {
              const o = n[1],
                s = (function RE(e, t, n) {
                  const r = we();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Yh(e, r, t, br(e, t, 1, null), n));
                  const i = gi(t, e, r.directiveStart, r);
                  ke(i, t);
                  const o = dt(r, t);
                  return o && ke(o, t), i;
                })(o, n, t);
              if (
                (r.components.push(s),
                (e[8] = s),
                i && i.forEach((u) => u(s, t)),
                t.contentQueries)
              ) {
                const u = we();
                t.contentQueries(1, s, u.directiveStart);
              }
              const a = we();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Dn(a.index),
                  Qh(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Kh(t, s)),
                s
              );
            })(v, this.componentDef, p, f, [v0])),
              Oi(h, p, null);
          } finally {
            Ro();
          }
          return new tS(this.componentType, m, zr(y, p), p, y);
        }
      }
      class tS extends class BM {} {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new ZM(i)),
            (this.componentType = t);
        }
        get injector() {
          return new dr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class sn {}
      class mm {}
      const qr = new Map();
      class Dm extends sn {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new pm(this));
          const r = ut(t);
          (this._bootstrapComponents = Bt(r.bootstrap)),
            (this._r3Injector = lp(
              t,
              n,
              [
                { provide: sn, useValue: this },
                { provide: $r, useValue: this.componentFactoryResolver },
              ],
              J(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, n = Le.THROW_IF_NOT_FOUND, r = L.Default) {
          return t === Le || t === sn || t === Ju
            ? this
            : this._r3Injector.get(t, n, r);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Tl extends mm {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== ut(t) &&
              (function rS(e) {
                const t = new Set();
                !(function n(r) {
                  const i = ut(r, !0),
                    o = i.id;
                  null !== o &&
                    ((function ym(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${J(
                            t
                          )} vs ${J(t.name)}`
                        );
                    })(o, qr.get(o), r),
                    qr.set(o, r));
                  const s = Bt(i.imports);
                  for (const a of s) t.has(a) || (t.add(a), n(a));
                })(e);
              })(t);
        }
        create(t) {
          return new Dm(this.moduleType, t);
        }
      }
      function Gr(e, t, n) {
        const r = Be() + e,
          i = D();
        return i[r] === k
          ? $t(i, r, n ? t.call(n) : t())
          : (function Fi(e, t) {
              return e[t];
            })(i, r);
      }
      function Cm(e, t, n, r, i, o) {
        const s = t + n;
        return je(e, s, i)
          ? $t(e, s + 1, o ? r.call(o, i) : r(i))
          : (function $i(e, t) {
              const n = e[t];
              return n === k ? void 0 : n;
            })(e, s + 1);
      }
      function se(e, t) {
        const n = W();
        let r;
        const i = e + 20;
        n.firstCreatePass
          ? ((r = (function hS(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[i] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(i, r.onDestroy))
          : (r = n.data[i]);
        const o = r.factory || (r.factory = Vn(r.type)),
          s = gn(T);
        try {
          const a = Vo(!1),
            u = o();
          return (
            Vo(a),
            (function A0(e, t, n, r) {
              n >= e.data.length &&
                ((e.data[n] = null), (e.blueprint[n] = null)),
                (t[n] = r);
            })(n, D(), i, u),
            u
          );
        } finally {
          gn(s);
        }
      }
      function ae(e, t, n) {
        const r = e + 20,
          i = D(),
          o = ar(i, r);
        return (function zi(e, t) {
          return e[1].data[t].pure;
        })(i, r)
          ? Cm(i, Be(), t, o.transform, n, o)
          : o.transform(n);
      }
      function Il(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const pe = class vS extends Ot {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          var i, o, s;
          let a = t,
            u = n || (() => null),
            l = r;
          if (t && "object" == typeof t) {
            const d = t;
            (a = null === (i = d.next) || void 0 === i ? void 0 : i.bind(d)),
              (u = null === (o = d.error) || void 0 === o ? void 0 : o.bind(d)),
              (l =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d));
          }
          this.__isAsync && ((u = Il(u)), a && (a = Il(a)), l && (l = Il(l)));
          const c = super.subscribe({ next: a, error: u, complete: l });
          return t instanceof at && t.add(c), c;
        }
      };
      function DS() {
        return this._results[Ir()]();
      }
      class xl {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = Ir(),
            r = xl.prototype;
          r[n] || (r[n] = DS);
        }
        get changes() {
          return this._changes || (this._changes = new pe());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const i = ft(t);
          (this._changesDetected = !(function E_(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let i = e[r],
                o = t[r];
              if ((n && ((i = n(i)), (o = n(o))), o !== i)) return !1;
            }
            return !0;
          })(r._results, i, n)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      Symbol;
      let an = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = wS), e;
      })();
      const CS = an,
        _S = class extends CS {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = Pi(
                this._declarationLView,
                n,
                t,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const o = this._declarationLView[19];
            return (
              null !== o && (r[19] = o.createEmbeddedView(n)),
              Oi(n, r, t),
              new Ui(r)
            );
          }
        };
      function wS() {
        return Cs(we(), D());
      }
      function Cs(e, t) {
        return 4 & e.type ? new _S(t, e, zr(e, t)) : null;
      }
      let It = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = ES), e;
      })();
      function ES() {
        return Tm(we(), D());
      }
      const bS = It,
        Mm = class extends bS {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return zr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new dr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ho(this._hostTNode, this._hostLView);
            if (mf(t)) {
              const n = cr(t, this._hostLView),
                r = lr(t);
              return new dr(n[1].data[r + 8], n);
            }
            return new dr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Sm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            const i = t.createEmbeddedView(n || {});
            return this.insert(i, r), i;
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function vi(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (o = d.ngModuleRef);
            }
            const u = s ? t : new Sl(Ne(t)),
              l = r || this.parentInjector;
            if (!o && null == u.ngModule && l) {
              const d = l.get(sn, null);
              d && (o = d);
            }
            const c = u.create(l, i, void 0, o);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              i = r[1];
            if (
              (function zC(e) {
                return _t(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Mm(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const o = this._adjustIndex(n),
              s = this._lContainer;
            !(function Ww(e, t, n, r) {
              const i = 10 + r,
                o = n.length;
              r > 0 && (n[i - 1][4] = t),
                r < o - 10
                  ? ((t[4] = n[i]), Sf(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function Qw(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(i, r, s, o);
            const a = Tu(o, s),
              u = r[V],
              l = Xo(u, s[7]);
            return (
              null !== l &&
                (function zw(e, t, n, r, i, o) {
                  (r[0] = i), (r[6] = t), Ai(e, r, n, 1, i, o);
                })(i, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              Sf(Al(s), o, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Sm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = bu(this._lContainer, n);
            r && (zo(Al(this._lContainer), n), ch(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = bu(this._lContainer, n);
            return r && null != zo(Al(this._lContainer), n) ? new Ui(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t;
          }
        };
      function Sm(e) {
        return e[8];
      }
      function Al(e) {
        return e[8] || (e[8] = []);
      }
      function Tm(e, t) {
        let n;
        const r = t[e.index];
        if (_t(r)) n = r;
        else {
          let i;
          if (8 & e.type) i = me(r);
          else {
            const o = t[V];
            i = o.createComment("");
            const s = dt(e, t);
            Bn(
              o,
              Xo(o, s),
              i,
              (function Yw(e, t) {
                return ce(e) ? e.nextSibling(t) : t.nextSibling;
              })(o, s),
              !1
            );
          }
          (t[e.index] = n = Xh(r, t, i, e)), ss(t, n);
        }
        return new Mm(n, e, t);
      }
      class Pl {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Pl(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Ol {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              i = [];
            for (let o = 0; o < r; o++) {
              const s = n.getByIndex(o);
              i.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Ol(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== Rm(t, n).matches && this.queries[n].setDirty();
        }
      }
      class Im {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class Rl {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const i = null !== n ? n.length : 0,
              o = this.getByIndex(r).embeddedTView(t, i);
            o &&
              ((o.indexInDeclarationView = r),
              null !== n ? n.push(o) : (n = [o]));
          }
          return null !== n ? new Rl(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Nl {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Nl(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const o = r[i];
              this.matchTNodeWithReadOption(t, n, TS(n, o)),
                this.matchTNodeWithReadOption(t, n, Uo(n, t, o, !1, !1));
            }
          else
            r === an
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Uo(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === on || i === It || (i === an && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const o = Uo(n, t, i, !1, !1);
                null !== o && this.addMatch(n.index, o);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function TS(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function xS(e, t, n, r) {
        return -1 === n
          ? (function IS(e, t) {
              return 11 & e.type ? zr(e, t) : 4 & e.type ? Cs(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function AS(e, t, n) {
              return n === on
                ? zr(t, e)
                : n === an
                ? Cs(t, e)
                : n === It
                ? Tm(t, e)
                : void 0;
            })(e, t, r)
          : gi(e, e[1], n, t);
      }
      function xm(e, t, n, r) {
        const i = t[19].queries[r];
        if (null === i.matches) {
          const o = e.data,
            s = n.matches,
            a = [];
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u];
            a.push(l < 0 ? null : xS(t, o[l], s[u + 1], n.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function Fl(e, t, n, r) {
        const i = e.queries.getByIndex(n),
          o = i.matches;
        if (null !== o) {
          const s = xm(e, t, i, n);
          for (let a = 0; a < o.length; a += 2) {
            const u = o[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const l = o[a + 1],
                c = t[-u];
              for (let d = 10; d < c.length; d++) {
                const f = c[d];
                f[17] === f[3] && Fl(f[1], f, l, r);
              }
              if (null !== c[9]) {
                const d = c[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Fl(h[1], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function _s(e) {
        const t = D(),
          n = W(),
          r = af();
        Wa(r + 1);
        const i = Rm(n, r);
        if (e.dirty && ef(t) === (2 == (2 & i.metadata.flags))) {
          if (null === i.matches) e.reset([]);
          else {
            const o = i.crossesNgTemplate ? Fl(n, t, r, []) : xm(n, t, i, r);
            e.reset(o, qM), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Am(e, t, n) {
        const r = W();
        r.firstCreatePass &&
          ((function Om(e, t, n) {
            null === e.queries && (e.queries = new Rl()),
              e.queries.track(new Nl(t, n));
          })(r, new Im(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function Pm(e, t, n) {
            const r = new xl(4 == (4 & n));
            qh(e, t, r, r.destroy),
              null === t[19] && (t[19] = new Ol()),
              t[19].queries.push(new Pl(r));
          })(r, D(), t);
      }
      function Rm(e, t) {
        return e.queries.getByIndex(t);
      }
      function Ms(...e) {}
      const Ss = new B("Application Initializer");
      let Qr = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Ms),
              (this.reject = Ms),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const o = this.appInits[i]();
                if (ds(o)) n.push(o);
                else if (Qp(o)) {
                  const s = new Promise((a, u) => {
                    o.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ss, 8));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Gi = new B("AppId"),
        JS = {
          provide: Gi,
          useFactory: function ZS() {
            return `${Ul()}${Ul()}${Ul()}`;
          },
          deps: [],
        };
      function Ul() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Zm = new B("Platform Initializer"),
        Ts = new B("Platform ID"),
        Jm = new B("appBootstrapListener");
      let Ym = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const bn = new B("LocaleId"),
        Xm = new B("DefaultCurrencyCode");
      class YS {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Is = (() => {
        class e {
          compileModuleSync(n) {
            return new Tl(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = Bt(ut(n).declarations).reduce((s, a) => {
                const u = Ne(a);
                return u && s.push(new Sl(u)), s;
              }, []);
            return new YS(r, o);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const eT = (() => Promise.resolve(0))();
      function $l(e) {
        "undefined" == typeof Zone
          ? eT.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Me {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new pe(!1)),
            (this.onMicrotaskEmpty = new pe(!1)),
            (this.onStable = new pe(!1)),
            (this.onError = new pe(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function tT() {
              let e = Y.requestAnimationFrame,
                t = Y.cancelAnimationFrame;
              if ("undefined" != typeof Zone && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function iT(e) {
              const t = () => {
                !(function rT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Y, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                ql(e),
                                (e.isCheckStableRunning = !0),
                                zl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    ql(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  try {
                    return ey(e), n.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      ty(e);
                  }
                },
                onInvoke: (n, r, i, o, s, a, u) => {
                  try {
                    return ey(e), n.invoke(i, o, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), ty(e);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          ql(e),
                          zl(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return (
            "undefined" != typeof Zone &&
            !0 === Zone.current.get("isAngularZone")
          );
        }
        static assertInAngularZone() {
          if (!Me.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Me.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, t, nT, Ms, Ms);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const nT = {};
      function zl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function ql(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function ey(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function ty(e) {
        e._nesting--, zl(e);
      }
      class oT {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new pe()),
            (this.onMicrotaskEmpty = new pe()),
            (this.onStable = new pe()),
            (this.onError = new pe());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      let Gl = (() => {
          class e {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Me.assertNotInAngularZone(),
                        $l(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                $l(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Me));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ny = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), Wl.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Wl.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      class sT {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null;
        }
      }
      let xt,
        Wl = new sT();
      const ry = new B("AllowMultipleToken");
      class iy {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function oy(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new B(r);
        return (o = []) => {
          let s = sy();
          if (!s || s.injector.get(ry, !1))
            if (e) e(n.concat(o).concat({ provide: i, useValue: !0 }));
            else {
              const a = n
                .concat(o)
                .concat(
                  { provide: i, useValue: !0 },
                  { provide: Yu, useValue: "platform" }
                );
              !(function cT(e) {
                if (xt && !xt.destroyed && !xt.injector.get(ry, !1))
                  throw new K(400, "");
                xt = e.get(ay);
                const t = e.get(Zm, null);
                t && t.forEach((n) => n());
              })(Le.create({ providers: a, name: r }));
            }
          return (function dT(e) {
            const t = sy();
            if (!t) throw new K(401, "");
            return t;
          })();
        };
      }
      function sy() {
        return xt && !xt.destroyed ? xt : null;
      }
      let ay = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function fT(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new oT()
                      : ("zone.js" === e ? void 0 : e) ||
                        new Me({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              u = [{ provide: Me, useValue: a }];
            return a.run(() => {
              const l = Le.create({
                  providers: u,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(l),
                d = c.injector.get(Cr, null);
              if (!d) throw new K(402, "");
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    Ql(this._modules, c), f.unsubscribe();
                  });
                }),
                (function hT(e, t, n) {
                  try {
                    const r = n();
                    return ds(r)
                      ? r.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(Qr);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function qb(e) {
                          Je(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Hg = e.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(bn, hs) || hs),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = uy({}, r);
            return (function uT(e, t, n) {
              const r = new Tl(n);
              return Promise.resolve(r);
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Wi);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new K(403, "");
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new K(404, "");
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Le));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function uy(e, t) {
        return Array.isArray(t)
          ? t.reduce(uy, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let Wi = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = o),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new ie((l) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    l.next(this._stable), l.complete();
                  });
              }),
              u = new ie((l) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Me.assertNotInAngularZone(),
                      $l(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), l.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  Me.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        l.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = (function cC(...e) {
              const t = si(e),
                n = (function rC(e, t) {
                  return "number" == typeof Da(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Rt(r[0])
                  : oi(n)(Pe(r, t))
                : Zt;
            })(a, u.pipe(jd()));
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new K(405, "");
            let i;
            (i =
              n instanceof dm
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(i.componentType);
            const o = (function lT(e) {
                return e.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(sn),
              a = i.create(Le.NULL, [], r || i.selector, o),
              u = a.location.nativeElement,
              l = a.injector.get(Gl, null),
              c = l && a.injector.get(ny);
            return (
              l && c && c.registerApplication(u, l),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  Ql(this.components, a),
                  c && c.unregisterApplication(u);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new K(101, "");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Ql(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(Jm, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Me), M(Le), M(Cr), M($r), M(Qr));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Ql(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let cy = !0,
        xs = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = mT), e;
        })();
      function mT(e) {
        return (function yT(e, t, n) {
          if (To(e) && !n) {
            const r = Xe(e.index, t);
            return new Ui(r, r);
          }
          return 47 & e.type ? new Ui(t[16], t) : null;
        })(we(), D(), 16 == (16 & e));
      }
      class yy {
        constructor() {}
        supports(t) {
          return Ni(t);
        }
        create(t) {
          return new ET(t);
        }
      }
      const wT = (e, t) => t;
      class ET {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || wT);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Dy(r, i, o)) ? n : r,
              a = Dy(s, i, o),
              u = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const l = a - i,
                c = u - i;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  c <= p && p < l && (o[f] = h + 1);
                }
                o[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Ni(t))) throw new K(900, "");
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, a)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function I0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Ir()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, o, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, o, i))
              : (t = this._addAfter(new bT(n, r), o, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new vy()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new vy()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class bT {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class MT {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class vy {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new MT()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Dy(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      class Cy {
        constructor() {}
        supports(t) {
          return t instanceof Map || il(t);
        }
        create() {
          return new ST();
        }
      }
      class ST {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || il(t))) throw new K(900, "");
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, i) => {
              if (n && n.key === i)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const o = this._getOrCreateRecordForKey(i, r);
                n = this._insertBeforeOrAppend(n, o);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const i = this._records.get(t);
            this._maybeAddToChanges(i, n);
            const o = i._prev,
              s = i._next;
            return (
              o && (o._next = s),
              s && (s._prev = o),
              (i._next = null),
              (i._prev = null),
              i
            );
          }
          const r = new TT(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class TT {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function _y() {
        return new Qi([new yy()]);
      }
      let Qi = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || _y()),
              deps: [[e, new yr(), new Vt()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new K(901, "");
          }
        }
        return (e.ɵprov = R({ token: e, providedIn: "root", factory: _y })), e;
      })();
      function wy() {
        return new Kr([new Cy()]);
      }
      let Kr = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || wy()),
              deps: [[e, new yr(), new Vt()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new K(901, "");
          }
        }
        return (e.ɵprov = R({ token: e, providedIn: "root", factory: wy })), e;
      })();
      const IT = [new Cy()],
        AT = new Qi([new yy()]),
        PT = new Kr(IT),
        OT = oy(null, "core", [
          { provide: Ts, useValue: "unknown" },
          { provide: ay, deps: [Le] },
          { provide: ny, deps: [] },
          { provide: Ym, deps: [] },
        ]),
        LT = [
          { provide: Wi, useClass: Wi, deps: [Me, Le, Cr, $r, Qr] },
          {
            provide: YM,
            deps: [Me],
            useFactory: function jT(e) {
              let t = [];
              return (
                e.onStable.subscribe(() => {
                  for (; t.length; ) t.pop()();
                }),
                function (n) {
                  t.push(n);
                }
              );
            },
          },
          { provide: Qr, useClass: Qr, deps: [[new Vt(), Ss]] },
          { provide: Is, useClass: Is, deps: [] },
          JS,
          {
            provide: Qi,
            useFactory: function RT() {
              return AT;
            },
            deps: [],
          },
          {
            provide: Kr,
            useFactory: function NT() {
              return PT;
            },
            deps: [],
          },
          {
            provide: bn,
            useFactory: function FT(e) {
              return (
                e ||
                (function kT() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || hs
                  );
                })()
              );
            },
            deps: [[new Ei(bn), new Vt(), new yr()]],
          },
          { provide: Xm, useValue: "USD" },
        ];
      let VT = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Wi));
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({ providers: LT })),
            e
          );
        })(),
        Ps = null;
      function Mn() {
        return Ps;
      }
      const rt = new B("DocumentToken");
      let Gn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function $T() {
                return M(Ey);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const zT = new B("Location Initialized");
      let Ey = (() => {
        class e extends Gn {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Mn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Mn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Mn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, i) {
            by() ? this._history.pushState(n, r, i) : (this.location.hash = i);
          }
          replaceState(n, r, i) {
            by()
              ? this._history.replaceState(n, r, i)
              : (this.location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(rt));
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function qT() {
                return new Ey(M(rt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function by() {
        return !!window.history.pushState;
      }
      function Xl(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function My(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function un(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Zr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function GT(e) {
                const t = M(rt).location;
                return new Sy(M(Gn), (t && t.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const ec = new B("appBaseHref");
      let Sy = (() => {
          class e extends Zr {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Xl(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  un(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + un(o));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + un(o));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Gn), M(ec, 8));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        WT = (() => {
          class e extends Zr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Xl(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + un(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + un(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Gn), M(ec, 8));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        tc = (() => {
          class e {
            constructor(n, r) {
              (this._subject = new pe()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n);
              const i = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = My(Ty(i))),
                this._platformStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            path(n = !1) {
              return this.normalize(this._platformStrategy.path(n));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + un(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function KT(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, Ty(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._platformStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._platformStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + un(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._platformStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + un(r)),
                  i
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformStrategy).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (e.normalizeQueryParams = un),
            (e.joinWithSlash = Xl),
            (e.stripTrailingSlash = My),
            (e.ɵfac = function (n) {
              return new (n || e)(M(Zr), M(Gn));
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return (function QT() {
                  return new tc(M(Zr), M(Gn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function Ty(e) {
        return e.replace(/\/index.html$/, "");
      }
      var De = (() => (
        ((De = De || {})[(De.Zero = 0)] = "Zero"),
        (De[(De.One = 1)] = "One"),
        (De[(De.Two = 2)] = "Two"),
        (De[(De.Few = 3)] = "Few"),
        (De[(De.Many = 4)] = "Many"),
        (De[(De.Other = 5)] = "Other"),
        De
      ))();
      const nI = function jg(e) {
        return (function qe(e) {
          const t = (function Bb(e) {
            return e.toLowerCase().replace(/_/g, "-");
          })(e);
          let n = Vg(t);
          if (n) return n;
          const r = t.split("-")[0];
          if (((n = Vg(r)), n)) return n;
          if ("en" === r) return Hb;
          throw new Error(`Missing locale data for the locale "${e}".`);
        })(e)[E.PluralCase];
      };
      class Bs {}
      let PI = (() => {
        class e extends Bs {
          constructor(n) {
            super(), (this.locale = n);
          }
          getPluralCategory(n, r) {
            switch (nI(r || this.locale)(n)) {
              case De.Zero:
                return "zero";
              case De.One:
                return "one";
              case De.Two:
                return "two";
              case De.Few:
                return "few";
              case De.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(bn));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ky(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (i.trim() === t) return decodeURIComponent(o);
        }
        return null;
      }
      class NI {
        constructor(t, n, r, i) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let cc = (() => {
        class e {
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, o, s) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new NI(i.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = r.get(o);
                r.move(a, s), Ly(a, i);
              }
            });
            for (let i = 0, o = r.length; i < o; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              Ly(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(It), T(an), T(Qi));
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          e
        );
      })();
      function Ly(e, t) {
        e.context.$implicit = t.item;
      }
      let jy = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new FI()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Vy("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Vy("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(It), T(an));
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          e
        );
      })();
      class FI {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Vy(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${J(t)}'.`
          );
      }
      let By = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngEl = n),
                (this._differs = r),
                (this._renderer = i),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(n) {
              (this._ngStyle = n),
                !this._differ &&
                  n &&
                  (this._differ = this._differs.find(n).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const n = this._differ.diff(this._ngStyle);
                n && this._applyChanges(n);
              }
            }
            _setStyle(n, r) {
              const [i, o] = n.split(".");
              null != (r = null != r && o ? `${r}${o}` : r)
                ? this._renderer.setStyle(this._ngEl.nativeElement, i, r)
                : this._renderer.removeStyle(this._ngEl.nativeElement, i);
            }
            _applyChanges(n) {
              n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
                n.forEachAddedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                ),
                n.forEachChangedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(on), T(Kr), T(Bi));
            }),
            (e.ɵdir = Oe({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
            })),
            e
          );
        })(),
        ax = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({ providers: [{ provide: Bs, useClass: PI }] })),
            e
          );
        })();
      let dx = (() => {
        class e {}
        return (
          (e.ɵprov = R({
            token: e,
            providedIn: "root",
            factory: () => new fx(M(rt), window),
          })),
          e
        );
      })();
      class fx {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function hx(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(r - o[0], i - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              zy(this.window.history) ||
              zy(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (t) {
            return !1;
          }
        }
      }
      function zy(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class qy {}
      class gc extends class px extends class UT {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function BT(e) {
            Ps || (Ps = e);
          })(new gc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function gx() {
            return (
              (Ji = Ji || document.querySelector("base")),
              Ji ? Ji.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function mx(e) {
                (Us = Us || document.createElement("a")),
                  Us.setAttribute("href", e);
                const t = Us.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Ji = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return ky(document.cookie, t);
        }
      }
      let Us,
        Ji = null;
      const Gy = new B("TRANSITION_ID"),
        vx = [
          {
            provide: Ss,
            useFactory: function yx(e, t, n) {
              return () => {
                n.get(Qr).donePromise.then(() => {
                  const r = Mn(),
                    i = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let o = 0; o < i.length; o++) r.remove(i[o]);
                });
              };
            },
            deps: [Gy, rt, Le],
            multi: !0,
          },
        ];
      class mc {
        static init() {
          !(function aT(e) {
            Wl = e;
          })(new mc());
        }
        addToWindow(t) {
          (Y.getAngularTestability = (r, i = !0) => {
            const o = t.findTestabilityInTree(r, i);
            if (null == o)
              throw new Error("Could not find testability for element.");
            return o;
          }),
            (Y.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Y.getAllAngularRootElements = () => t.getAllRootElements()),
            Y.frameworkStabilizers || (Y.frameworkStabilizers = []),
            Y.frameworkStabilizers.push((r) => {
              const i = Y.getAllAngularTestabilities();
              let o = i.length,
                s = !1;
              const a = function (u) {
                (s = s || u), o--, 0 == o && r(s);
              };
              i.forEach(function (u) {
                u.whenStable(a);
              });
            });
        }
        findTestabilityInTree(t, n, r) {
          if (null == n) return null;
          const i = t.getTestability(n);
          return null != i
            ? i
            : r
            ? Mn().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null;
        }
      }
      let Dx = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const $s = new B("EventManagerPlugins");
      let zs = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const i = this._plugins;
            for (let o = 0; o < i.length; o++) {
              const s = i[o];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M($s), M(Me));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Wy {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const i = Mn().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let Qy = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Yi = (() => {
          class e extends Qy {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, i) {
              n.forEach((o) => {
                const s = this._doc.createElement("style");
                (s.textContent = o), i.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(Ky), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(Ky));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(rt));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function Ky(e) {
        Mn().remove(e);
      }
      const yc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        vc = /%COMP%/g;
      function qs(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          Array.isArray(i) ? qs(e, i, n) : ((i = i.replace(vc, e)), n.push(i));
        }
        return n;
      }
      function Yy(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Dc = (() => {
        class e {
          constructor(n, r, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Cc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Nt.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new Mx(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                );
              }
              case 1:
              case Nt.ShadowDom:
                return new Sx(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = qs(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(zs), M(Yi), M(Gi));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Cc {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(yc[n], t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          t.appendChild(n);
        }
        insertBefore(t, n, r) {
          t && t.insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const o = yc[i];
            o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = yc[r];
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, i) {
          i & (tt.DashCase | tt.Important)
            ? t.style.setProperty(n, r, i & tt.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & tt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Yy(r))
            : this.eventManager.addEventListener(t, n, Yy(r));
        }
      }
      class Mx extends Cc {
        constructor(t, n, r, i) {
          super(t), (this.component = r);
          const o = qs(i + "-" + r.id, r.styles, []);
          n.addStyles(o),
            (this.contentAttr = (function wx(e) {
              return "_ngcontent-%COMP%".replace(vc, e);
            })(i + "-" + r.id)),
            (this.hostAttr = (function Ex(e) {
              return "_nghost-%COMP%".replace(vc, e);
            })(i + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class Sx extends Cc {
        constructor(t, n, r, i) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = qs(i.id, i.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement("style");
            (a.textContent = o[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let Tx = (() => {
        class e extends Wy {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(rt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ev = ["alt", "control", "meta", "shift"],
        xx = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        tv = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        Ax = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let Px = (() => {
        class e extends Wy {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Mn().onAndCancel(n, o.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = e._normalizeKey(r.pop());
            let s = "";
            if (
              (ev.forEach((u) => {
                const l = r.indexOf(u);
                l > -1 && (r.splice(l, 1), (s += u + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const a = {};
            return (a.domEventName = i), (a.fullKey = s), a;
          }
          static getEventFullKey(n) {
            let r = "",
              i = (function Ox(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && tv.hasOwnProperty(t) && (t = tv[t]));
                }
                return xx[t] || t;
              })(n);
            return (
              (i = i.toLowerCase()),
              " " === i ? (i = "space") : "." === i && (i = "dot"),
              ev.forEach((o) => {
                o != i && Ax[o](n) && (r += o + ".");
              }),
              (r += i),
              r
            );
          }
          static eventCallback(n, r, i) {
            return (o) => {
              e.getEventFullKey(o) === n && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(rt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const kx = oy(OT, "browser", [
          { provide: Ts, useValue: "browser" },
          {
            provide: Zm,
            useValue: function Rx() {
              gc.makeCurrent(), mc.init();
            },
            multi: !0,
          },
          {
            provide: rt,
            useFactory: function Fx() {
              return (
                (function HC(e) {
                  La = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Lx = [
          { provide: Yu, useValue: "root" },
          {
            provide: Cr,
            useFactory: function Nx() {
              return new Cr();
            },
            deps: [],
          },
          { provide: $s, useClass: Tx, multi: !0, deps: [rt, Me, Ts] },
          { provide: $s, useClass: Px, multi: !0, deps: [rt] },
          { provide: Dc, useClass: Dc, deps: [zs, Yi, Gi] },
          { provide: hm, useExisting: Dc },
          { provide: Qy, useExisting: Yi },
          { provide: Yi, useClass: Yi, deps: [rt] },
          { provide: Gl, useClass: Gl, deps: [Me] },
          { provide: zs, useClass: zs, deps: [$s, Me] },
          { provide: qy, useClass: Dx, deps: [] },
        ];
      let jx = (() => {
        class e {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: Gi, useValue: n.appId },
                { provide: Gy, useExisting: Gi },
                vx,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(e, 12));
          }),
          (e.ɵmod = Ft({ type: e })),
          (e.ɵinj = vt({ providers: Lx, imports: [ax, VT] })),
          e
        );
      })();
      function A(...e) {
        return Pe(e, si(e));
      }
      "undefined" != typeof window && window;
      class mt extends Ot {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const { isArray: Kx } = Array,
        { getPrototypeOf: Zx, prototype: Jx, keys: Yx } = Object;
      function iv(e) {
        if (1 === e.length) {
          const t = e[0];
          if (Kx(t)) return { args: t, keys: null };
          if (
            (function Xx(e) {
              return e && "object" == typeof e && Zx(e) === Jx;
            })(t)
          ) {
            const n = Yx(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: eA } = Array;
      function ov(e) {
        return Q((t) =>
          (function tA(e, t) {
            return eA(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function sv(e, t) {
        return e.reduce((n, r, i) => ((n[r] = t[i]), n), {});
      }
      function av(e, t, n) {
        e ? Kt(n, e, t) : t();
      }
      const Gs = ri(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Xi(...e) {
        return (function iA() {
          return oi(1);
        })()(Pe(e, si(e)));
      }
      function Ws(e) {
        return new ie((t) => {
          Rt(e()).subscribe(t);
        });
      }
      function uv() {
        return Ae((e, t) => {
          let n = null;
          e._refCount++;
          const r = new Te(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const i = e._connection,
              o = n;
            (n = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class oA extends ie {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Cd(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null),
            null == t || t.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new at();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                new Te(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = at.EMPTY));
          }
          return t;
        }
        refCount() {
          return uv()(this);
        }
      }
      function cn(e, t) {
        return Ae((n, r) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && r.complete();
          n.subscribe(
            new Te(
              r,
              (u) => {
                null == i || i.unsubscribe();
                let l = 0;
                const c = o++;
                Rt(e(u, c)).subscribe(
                  (i = new Te(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function aA(e, t, n, r, i) {
        return (o, s) => {
          let a = n,
            u = t,
            l = 0;
          o.subscribe(
            new Te(
              s,
              (c) => {
                const d = l++;
                (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
              },
              i &&
                (() => {
                  a && s.next(u), s.complete();
                })
            )
          );
        };
      }
      function lv(e, t) {
        return Ae(aA(e, t, arguments.length >= 2, !0));
      }
      function Wn(e, t) {
        return Ae((n, r) => {
          let i = 0;
          n.subscribe(new Te(r, (o) => e.call(t, o, i++) && r.next(o)));
        });
      }
      function Tn(e) {
        return Ae((t, n) => {
          let o,
            r = null,
            i = !1;
          (r = t.subscribe(
            new Te(n, void 0, void 0, (s) => {
              (o = Rt(e(s, Tn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n));
        });
      }
      function Qn(e, t) {
        return X(t) ? Ie(e, t, 1) : Ie(e, 1);
      }
      function wc(e) {
        return e <= 0
          ? () => Zt
          : Ae((t, n) => {
              let r = [];
              t.subscribe(
                new Te(
                  n,
                  (i) => {
                    r.push(i), e < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) n.next(i);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function cv(e = uA) {
        return Ae((t, n) => {
          let r = !1;
          t.subscribe(
            new Te(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function uA() {
        return new Gs();
      }
      function dv(e) {
        return Ae((t, n) => {
          let r = !1;
          t.subscribe(
            new Te(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function Jr(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Wn((i, o) => e(i, o, r)) : Rn,
            pn(1),
            n ? dv(t) : cv(() => new Gs())
          );
      }
      function it(e, t, n) {
        const r = X(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ae((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                new Te(
                  o,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      o.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      o.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      o.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Rn;
      }
      class dn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Ec extends dn {
        constructor(t, n, r = "imperative", i = null) {
          super(t, n), (this.navigationTrigger = r), (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class eo extends dn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class fv extends dn {
        constructor(t, n, r) {
          super(t, n), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class dA extends dn {
        constructor(t, n, r) {
          super(t, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class fA extends dn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class hA extends dn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pA extends dn {
        constructor(t, n, r, i, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class gA extends dn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mA extends dn {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class hv {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class pv {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class yA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class vA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class DA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class CA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class gv {
        constructor(t, n, r) {
          (this.routerEvent = t), (this.position = n), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const $ = "primary";
      class _A {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Yr(e) {
        return new _A(e);
      }
      const mv = "ngNavigationCancelingError";
      function bc(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t[mv] = !0), t;
      }
      function EA(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function Wt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let o = 0; o < n.length; o++)
          if (((i = n[o]), !yv(e[i], t[i]))) return !1;
        return !0;
      }
      function yv(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, o) => r[o] === i);
        }
        return e === t;
      }
      function vv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Dv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Re(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Qt(e) {
        return Qp(e) ? e : ds(e) ? Pe(Promise.resolve(e)) : A(e);
      }
      const SA = {
          exact: function wv(e, t, n) {
            if (
              !Zn(e.segments, t.segments) ||
              !Qs(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !wv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Ev,
        },
        Cv = {
          exact: function TA(e, t) {
            return Wt(e, t);
          },
          subset: function IA(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => yv(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function _v(e, t, n) {
        return (
          SA[n.paths](e.root, t.root, n.matrixParams) &&
          Cv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Ev(e, t, n) {
        return bv(e, t, t.segments, n);
      }
      function bv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!Zn(i, n) || t.hasChildren() || !Qs(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Zn(e.segments, n) || !Qs(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !Ev(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            o = n.slice(e.segments.length);
          return (
            !!(Zn(e.segments, i) && Qs(e.segments, i, r) && e.children[$]) &&
            bv(e.children[$], t, o, r)
          );
        }
      }
      function Qs(e, t, n) {
        return t.every((r, i) => Cv[n](e[i].parameters, r.parameters));
      }
      class Kn {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Yr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return PA.serialize(this);
        }
      }
      class q {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Re(n, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ks(this);
        }
      }
      class to {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Yr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return xv(this);
        }
      }
      function Zn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      class Mv {}
      class Sv {
        parse(t) {
          const n = new HA(t);
          return new Kn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${no(t.root, !0)}`,
            r = (function NA(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${Zs(n)}=${Zs(i)}`).join("&")
                    : `${Zs(n)}=${Zs(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function OA(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const PA = new Sv();
      function Ks(e) {
        return e.segments.map((t) => xv(t)).join("/");
      }
      function no(e, t) {
        if (!e.hasChildren()) return Ks(e);
        if (t) {
          const n = e.children[$] ? no(e.children[$], !1) : "",
            r = [];
          return (
            Re(e.children, (i, o) => {
              o !== $ && r.push(`${o}:${no(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function AA(e, t) {
            let n = [];
            return (
              Re(e.children, (r, i) => {
                i === $ && (n = n.concat(t(r, i)));
              }),
              Re(e.children, (r, i) => {
                i !== $ && (n = n.concat(t(r, i)));
              }),
              n
            );
          })(e, (r, i) =>
            i === $ ? [no(e.children[$], !1)] : [`${i}:${no(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${Ks(e)}/${n[0]}`
            : `${Ks(e)}/(${n.join("//")})`;
        }
      }
      function Tv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Zs(e) {
        return Tv(e).replace(/%3B/gi, ";");
      }
      function Mc(e) {
        return Tv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Js(e) {
        return decodeURIComponent(e);
      }
      function Iv(e) {
        return Js(e.replace(/\+/g, "%20"));
      }
      function xv(e) {
        return `${Mc(e.path)}${(function RA(e) {
          return Object.keys(e)
            .map((t) => `;${Mc(t)}=${Mc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const FA = /^[^\/()?;=#]+/;
      function Ys(e) {
        const t = e.match(FA);
        return t ? t[0] : "";
      }
      const kA = /^[^=?&#]+/,
        jA = /^[^&#]+/;
      class HA {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new q([], {})
              : new q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[$] = new q(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Ys(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new to(Js(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Ys(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = Ys(this.remaining);
            i && ((r = i), this.capture(r));
          }
          t[Js(n)] = Js(r);
        }
        parseQueryParam(t) {
          const n = (function LA(e) {
            const t = e.match(kA);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function VA(e) {
              const t = e.match(jA);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const i = Iv(n),
            o = Iv(r);
          if (t.hasOwnProperty(i)) {
            let s = t[i];
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
          } else t[i] = o;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Ys(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i)
              throw new Error(`Cannot parse url '${this.url}'`);
            let o;
            r.indexOf(":") > -1
              ? ((o = r.substr(0, r.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = $);
            const s = this.parseChildren();
            (n[o] = 1 === Object.keys(s).length ? s[$] : new q([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class Av {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Sc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Sc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Tc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return Tc(t, this._root).map((n) => n.value);
        }
      }
      function Sc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Sc(e, n);
          if (r) return r;
        }
        return null;
      }
      function Tc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Tc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class fn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Xr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Pv extends Av {
        constructor(t, n) {
          super(t), (this.snapshot = n), Ic(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Ov(e, t) {
        const n = (function BA(e, t) {
            const s = new Xs([], {}, {}, "", {}, $, t, null, e.root, -1, {});
            return new Nv("", new fn(s, []));
          })(e, t),
          r = new mt([new to("", {})]),
          i = new mt({}),
          o = new mt({}),
          s = new mt({}),
          a = new mt(""),
          u = new ei(r, i, s, a, o, $, t, n.root);
        return (u.snapshot = n.root), new Pv(new fn(u, []), n);
      }
      class ei {
        constructor(t, n, r, i, o, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Q((t) => Yr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Q((t) => Yr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Rv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              o = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (o.component) break;
              r--;
            }
          }
        return (function UA(e) {
          return e.reduce(
            (t, n) => ({
              params: Object.assign(Object.assign({}, t.params), n.params),
              data: Object.assign(Object.assign({}, t.data), n.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                n._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Xs {
        constructor(t, n, r, i, o, s, a, u, l, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Yr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Yr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Nv extends Av {
        constructor(t, n) {
          super(n), (this.url = t), Ic(this, n);
        }
        toString() {
          return Fv(this._root);
        }
      }
      function Ic(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Ic(e, n));
      }
      function Fv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Fv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function xc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Wt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Wt(t.params, n.params) || e.params.next(n.params),
            (function bA(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Wt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Wt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Ac(e, t) {
        const n =
          Wt(e.params, t.params) &&
          (function xA(e, t) {
            return (
              Zn(e, t) && e.every((n, r) => Wt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Ac(e.parent, t.parent))
        );
      }
      function ro(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function zA(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return ro(e, r, i);
              return ro(e, r);
            });
          })(e, t, n);
          return new fn(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => ro(e, a))),
                s
              );
            }
          }
          const r = (function qA(e) {
              return new ei(
                new mt(e.url),
                new mt(e.params),
                new mt(e.queryParams),
                new mt(e.fragment),
                new mt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((o) => ro(e, o));
          return new fn(r, i);
        }
      }
      function ea(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function io(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Pc(e, t, n, r, i) {
        let o = {};
        return (
          r &&
            Re(r, (s, a) => {
              o[a] = Array.isArray(s) ? s.map((u) => `${u}`) : `${s}`;
            }),
          new Kn(n.root === e ? t : kv(n.root, e, t), o, i)
        );
      }
      function kv(e, t, n) {
        const r = {};
        return (
          Re(e.children, (i, o) => {
            r[o] = i === t ? n : kv(i, t, n);
          }),
          new q(e.segments, r)
        );
      }
      class Lv {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && ea(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const i = r.find(io);
          if (i && i !== Dv(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Oc {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function jv(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return ta(e, t, n);
        const r = (function JA(e, t, n) {
            let r = 0,
              i = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return o;
              const s = e.segments[i],
                a = n[r];
              if (io(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Hv(u, l, s)) return o;
                r += 2;
              } else {
                if (!Hv(u, {}, s)) return o;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, t, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new q(e.segments.slice(0, r.pathIndex), {});
          return (
            (o.children[$] = new q(e.segments.slice(r.pathIndex), e.children)),
            ta(o, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? Rc(e, t, n)
          : r.match
          ? ta(e, 0, i)
          : Rc(e, t, n);
      }
      function ta(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function ZA(e) {
              return io(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            i = {};
          return (
            Re(r, (o, s) => {
              "string" == typeof o && (o = [o]),
                null !== o && (i[s] = jv(e.children[s], t, o));
            }),
            Re(e.children, (o, s) => {
              void 0 === r[s] && (i[s] = o);
            }),
            new q(e.segments, i)
          );
        }
      }
      function Rc(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (io(o)) {
            const u = YA(o.outlets);
            return new q(r, u);
          }
          if (0 === i && ea(n[0])) {
            r.push(new to(e.segments[t].path, Vv(n[0]))), i++;
            continue;
          }
          const s = io(o) ? o.outlets[$] : `${o}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          s && a && ea(a)
            ? (r.push(new to(s, Vv(a))), (i += 2))
            : (r.push(new to(s, {})), i++);
        }
        return new q(r, {});
      }
      function YA(e) {
        const t = {};
        return (
          Re(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Rc(new q([], {}), 0, n));
          }),
          t
        );
      }
      function Vv(e) {
        const t = {};
        return Re(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function Hv(e, t, n) {
        return e == n.path && Wt(t, n.parameters);
      }
      class eP {
        constructor(t, n, r, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            xc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = Xr(n);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], r), delete i[s];
          }),
            Re(i, (o, s) => {
              this.deactivateRouteAndItsChildren(o, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else o && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Xr(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = Xr(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const i = Xr(n);
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new CA(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new vA(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if ((xc(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                xc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = (function tP(e) {
                  for (let t = e.parent; t; t = t.parent) {
                    const n = t.routeConfig;
                    if (n && n._loadedConfig) return n._loadedConfig;
                    if (n && n.component) return null;
                  }
                  return null;
                })(i.snapshot),
                u = a ? a.module.componentFactoryResolver : null;
              (s.attachRef = null),
                (s.route = i),
                (s.resolver = u),
                s.outlet && s.outlet.activateWith(i, u),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class Nc {
        constructor(t, n) {
          (this.routes = t), (this.module = n);
        }
      }
      function In(e) {
        return "function" == typeof e;
      }
      function Jn(e) {
        return e instanceof Kn;
      }
      const oo = Symbol("INITIAL_VALUE");
      function so() {
        return cn((e) =>
          (function nA(...e) {
            const t = si(e),
              n = Nd(e),
              { args: r, keys: i } = iv(e);
            if (0 === r.length) return Pe([], t);
            const o = new ie(
              (function rA(e, t, n = Rn) {
                return (r) => {
                  av(
                    t,
                    () => {
                      const { length: i } = e,
                        o = new Array(i);
                      let s = i,
                        a = i;
                      for (let u = 0; u < i; u++)
                        av(
                          t,
                          () => {
                            const l = Pe(e[u], t);
                            let c = !1;
                            l.subscribe(
                              new Te(
                                r,
                                (d) => {
                                  (o[u] = d),
                                    c || ((c = !0), a--),
                                    a || r.next(n(o.slice()));
                                },
                                () => {
                                  --s || r.complete();
                                }
                              )
                            );
                          },
                          r
                        );
                    },
                    r
                  );
                };
              })(r, t, i ? (s) => sv(i, s) : Rn)
            );
            return n ? o.pipe(ov(n)) : o;
          })(
            e.map((t) =>
              t.pipe(
                pn(1),
                (function sA(...e) {
                  const t = si(e);
                  return Ae((n, r) => {
                    (t ? Xi(e, n, t) : Xi(e, n)).subscribe(r);
                  });
                })(oo)
              )
            )
          ).pipe(
            lv((t, n) => {
              let r = !1;
              return n.reduce(
                (i, o, s) =>
                  i !== oo
                    ? i
                    : (o === oo && (r = !0),
                      r || (!1 !== o && s !== n.length - 1 && !Jn(o)) ? i : o),
                t
              );
            }, oo),
            Wn((t) => t !== oo),
            Q((t) => (Jn(t) ? t : !0 === t)),
            pn(1)
          )
        );
      }
      class aP {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new ao()),
            (this.attachRef = null);
        }
      }
      class ao {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, n) {
          const r = this.getOrCreateContext(t);
          (r.outlet = n), this.contexts.set(t, r);
        }
        onChildOutletDestroyed(t) {
          const n = this.getContext(t);
          n && ((n.outlet = null), (n.attachRef = null));
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let n = this.getContext(t);
          return n || ((n = new aP()), this.contexts.set(t, n)), n;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let Fc = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = i),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new pe()),
              (this.deactivateEvents = new pe()),
              (this.attachEvents = new pe()),
              (this.detachEvents = new pe()),
              (this.name = o || $),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = n;
            const s = (r = r || this.resolver).resolveComponentFactory(
                n._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new uP(n, a, this.location.injector);
            (this.activated = this.location.createComponent(
              s,
              this.location.length,
              u
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(ao), T(It), T($r), mi("name"), T(xs));
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
          })),
          e
        );
      })();
      class uP {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === ei
            ? this.route
            : t === ao
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Bv = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Xt({
            type: e,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Qe(0, "router-outlet");
            },
            directives: [Fc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function Uv(e, t = "") {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          lP(r, cP(t, r));
        }
      }
      function lP(e, t) {
        e.children && Uv(e.children, t);
      }
      function cP(e, t) {
        return t
          ? e || t.path
            ? e && !t.path
              ? `${e}/`
              : !e && t.path
              ? t.path
              : `${e}/${t.path}`
            : ""
          : e;
      }
      function kc(e) {
        const t = e.children && e.children.map(kc),
          n = t
            ? Object.assign(Object.assign({}, e), { children: t })
            : Object.assign({}, e);
        return (
          !n.component &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== $ &&
            (n.component = Bv),
          n
        );
      }
      function yt(e) {
        return e.outlet || $;
      }
      function $v(e, t) {
        const n = e.filter((r) => yt(r) === t);
        return n.push(...e.filter((r) => yt(r) !== t)), n;
      }
      const zv = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function na(e, t, n) {
        var r;
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? Object.assign({}, zv)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || EA)(n, e, t);
        if (!o) return Object.assign({}, zv);
        const s = {};
        Re(o.posParams, (u, l) => {
          s[l] = u.path;
        });
        const a =
          o.consumed.length > 0
            ? Object.assign(
                Object.assign({}, s),
                o.consumed[o.consumed.length - 1].parameters
              )
            : s;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          lastChild: o.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = o.posParams) && void 0 !== r ? r : {},
        };
      }
      function ra(e, t, n, r, i = "corrected") {
        if (
          n.length > 0 &&
          (function hP(e, t, n) {
            return n.some((r) => ia(e, t, r) && yt(r) !== $);
          })(e, n, r)
        ) {
          const s = new q(
            t,
            (function fP(e, t, n, r) {
              const i = {};
              (i[$] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const o of n)
                if ("" === o.path && yt(o) !== $) {
                  const s = new q([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (i[yt(o)] = s);
                }
              return i;
            })(e, t, r, new q(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function pP(e, t, n) {
            return n.some((r) => ia(e, t, r));
          })(e, n, r)
        ) {
          const s = new q(
            e.segments,
            (function dP(e, t, n, r, i, o) {
              const s = {};
              for (const a of r)
                if (ia(e, n, a) && !i[yt(a)]) {
                  const u = new q([], {});
                  (u._sourceSegment = e),
                    (u._segmentIndexShift =
                      "legacy" === o ? e.segments.length : t.length),
                    (s[yt(a)] = u);
                }
              return Object.assign(Object.assign({}, i), s);
            })(e, t, n, r, e.children, i)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const o = new q(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function ia(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function qv(e, t, n, r) {
        return (
          !!(yt(e) === r || (r !== $ && ia(t, n, e))) &&
          ("**" === e.path || na(t, e, n).matched)
        );
      }
      function Gv(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      class uo {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Wv {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function oa(e) {
        return new ie((t) => t.error(new uo(e)));
      }
      function Qv(e) {
        return new ie((t) => t.error(new Wv(e)));
      }
      function gP(e) {
        return new ie((t) =>
          t.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${e}'`
            )
          )
        );
      }
      class vP {
        constructor(t, n, r, i, o) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = o),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(sn));
        }
        apply() {
          const t = ra(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new q(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, $)
            .pipe(
              Q((o) =>
                this.createUrlTree(
                  Lc(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Tn((o) => {
                if (o instanceof Wv)
                  return (this.allowRedirects = !1), this.match(o.urlTree);
                throw o instanceof uo ? this.noMatchError(o) : o;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, $)
            .pipe(
              Q((i) => this.createUrlTree(Lc(i), t.queryParams, t.fragment))
            )
            .pipe(
              Tn((i) => {
                throw i instanceof uo ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, n, r) {
          const i = t.segments.length > 0 ? new q([], { [$]: t }) : t;
          return new Kn(i, n, r);
        }
        expandSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(Q((o) => new q([], o)))
            : this.expandSegment(t, r, n, r.segments, i, !0);
        }
        expandChildren(t, n, r) {
          const i = [];
          for (const o of Object.keys(r.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return Pe(i).pipe(
            Qn((o) => {
              const s = r.children[o],
                a = $v(n, o);
              return this.expandSegmentGroup(t, a, s, o).pipe(
                Q((u) => ({ segment: u, outlet: o }))
              );
            }),
            lv((o, s) => ((o[s.outlet] = s.segment), o), {}),
            (function lA(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? Wn((i, o) => e(i, o, r)) : Rn,
                  wc(1),
                  n ? dv(t) : cv(() => new Gs())
                );
            })()
          );
        }
        expandSegment(t, n, r, i, o, s) {
          return Pe(r).pipe(
            Qn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, i, o, s).pipe(
                Tn((l) => {
                  if (l instanceof uo) return A(null);
                  throw l;
                })
              )
            ),
            Jr((a) => !!a),
            Tn((a, u) => {
              if (a instanceof Gs || "EmptyError" === a.name) {
                if (Gv(n, i, o)) return A(new q([], {}));
                throw new uo(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, i, o, s, a) {
          return qv(i, n, o, s)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, i, o, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s)
              : oa(n)
            : oa(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const o = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? Qv(o)
            : this.lineralizeSegments(r, o).pipe(
                Ie((s) => {
                  const a = new q(s, {});
                  return this.expandSegment(t, a, n, s, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: u,
            lastChild: l,
            positionalParamSegments: c,
          } = na(n, i, o);
          if (!a) return oa(n);
          const d = this.applyRedirectCommands(u, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? Qv(d)
            : this.lineralizeSegments(i, d).pipe(
                Ie((f) =>
                  this.expandSegment(t, n, r, f.concat(o.slice(l)), s, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, n, r, i, o) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? A(r._loadedConfig)
                  : this.configLoader.load(t.injector, r)
                ).pipe(Q((f) => ((r._loadedConfig = f), new q(i, {}))))
              : A(new q(i, {}));
          const { matched: s, consumedSegments: a, lastChild: u } = na(n, r, i);
          if (!s) return oa(n);
          const l = i.slice(u);
          return this.getChildConfig(t, r, i).pipe(
            Ie((d) => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: m } = ra(n, a, l, h),
                y = new q(p.segments, p.children);
              if (0 === m.length && y.hasChildren())
                return this.expandChildren(f, h, y).pipe(Q((P) => new q(a, P)));
              if (0 === h.length && 0 === m.length) return A(new q(a, {}));
              const v = yt(r) === o;
              return this.expandSegment(f, y, h, m, v ? $ : o, !0).pipe(
                Q((b) => new q(a.concat(b.segments), b.children))
              );
            })
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A(new Nc(n.children, t))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? A(n._loadedConfig)
              : this.runCanLoadGuards(t.injector, n, r).pipe(
                  Ie((i) =>
                    i
                      ? this.configLoader
                          .load(t.injector, n)
                          .pipe(Q((o) => ((n._loadedConfig = o), o)))
                      : (function mP(e) {
                          return new ie((t) =>
                            t.error(
                              bc(
                                `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                              )
                            )
                          );
                        })(n)
                  )
                )
            : A(new Nc([], t));
        }
        runCanLoadGuards(t, n, r) {
          const i = n.canLoad;
          return i && 0 !== i.length
            ? A(
                i.map((s) => {
                  const a = t.get(s);
                  let u;
                  if (
                    (function rP(e) {
                      return e && In(e.canLoad);
                    })(a)
                  )
                    u = a.canLoad(n, r);
                  else {
                    if (!In(a)) throw new Error("Invalid CanLoad guard");
                    u = a(n, r);
                  }
                  return Qt(u);
                })
              ).pipe(
                so(),
                it((s) => {
                  if (!Jn(s)) return;
                  const a = bc(
                    `Redirecting to "${this.urlSerializer.serialize(s)}"`
                  );
                  throw ((a.url = s), a);
                }),
                Q((s) => !0 === s)
              )
            : A(!0);
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return A(r);
            if (i.numberOfChildren > 1 || !i.children[$])
              return gP(t.redirectTo);
            i = i.children[$];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreatreUrlTree(t, n, r, i) {
          const o = this.createSegmentGroup(t, n.root, r, i);
          return new Kn(
            o,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Re(t, (i, o) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, i) {
          const o = this.createSegments(t, n.segments, r, i);
          let s = {};
          return (
            Re(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, i);
            }),
            new q(o, s)
          );
        }
        createSegments(t, n, r, i) {
          return n.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, r)
          );
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)];
          if (!i)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${n.path}'.`
            );
          return i;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i;
            r++;
          }
          return t;
        }
      }
      function Lc(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const o = Lc(e.children[r]);
          (o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
        }
        return (function DP(e) {
          if (1 === e.numberOfChildren && e.children[$]) {
            const t = e.children[$];
            return new q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new q(e.segments, t));
      }
      class Kv {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class sa {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function _P(e, t, n) {
        const r = e._root;
        return lo(r, t ? t._root : null, n, [r.value]);
      }
      function aa(e, t, n) {
        const r = (function EP(e) {
          if (!e) return null;
          for (let t = e.parent; t; t = t.parent) {
            const n = t.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(t);
        return (r ? r.module.injector : n).get(e);
      }
      function lo(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = Xr(t);
        return (
          e.children.forEach((s) => {
            (function bP(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const u = (function MP(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Zn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Zn(e.url, t.url) || !Wt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Ac(e, t) || !Wt(e.queryParams, t.queryParams);
                    default:
                      return !Ac(e, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                u
                  ? i.canActivateChecks.push(new Kv(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  lo(e, t, o.component ? (a ? a.children : null) : n, r, i),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new sa(a.outlet.component, s));
              } else
                s && co(t, a, i),
                  i.canActivateChecks.push(new Kv(r)),
                  lo(e, null, o.component ? (a ? a.children : null) : n, r, i);
            })(s, o[s.value.outlet], n, r.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          Re(o, (s, a) => co(s, n.getContext(a), i)),
          i
        );
      }
      function co(e, t, n) {
        const r = Xr(e),
          i = e.value;
        Re(r, (o, s) => {
          co(o, i.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new sa(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      class NP {}
      function Zv(e) {
        return new ie((t) => t.error(e));
      }
      class kP {
        constructor(t, n, r, i, o, s) {
          (this.rootComponentType = t),
            (this.config = n),
            (this.urlTree = r),
            (this.url = i),
            (this.paramsInheritanceStrategy = o),
            (this.relativeLinkResolution = s);
        }
        recognize() {
          const t = ra(
              this.urlTree.root,
              [],
              [],
              this.config.filter((s) => void 0 === s.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, t, $);
          if (null === n) return null;
          const r = new Xs(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              $,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            i = new fn(r, n),
            o = new Nv(this.url, i);
          return this.inheritParamsAndData(o._root), o;
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Rv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, n)
            : this.processSegment(t, n, n.segments, r);
        }
        processChildren(t, n) {
          const r = [];
          for (const o of Object.keys(n.children)) {
            const s = n.children[o],
              a = $v(t, o),
              u = this.processSegmentGroup(a, s, o);
            if (null === u) return null;
            r.push(...u);
          }
          const i = Jv(r);
          return (
            (function LP(e) {
              e.sort((t, n) =>
                t.value.outlet === $
                  ? -1
                  : n.value.outlet === $
                  ? 1
                  : t.value.outlet.localeCompare(n.value.outlet)
              );
            })(i),
            i
          );
        }
        processSegment(t, n, r, i) {
          for (const o of t) {
            const s = this.processSegmentAgainstRoute(o, n, r, i);
            if (null !== s) return s;
          }
          return Gv(n, r, i) ? [] : null;
        }
        processSegmentAgainstRoute(t, n, r, i) {
          if (t.redirectTo || !qv(t, n, r, i)) return null;
          let o,
            s = [],
            a = [];
          if ("**" === t.path) {
            const h = r.length > 0 ? Dv(r).parameters : {};
            o = new Xs(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              eD(t),
              yt(t),
              t.component,
              t,
              Yv(n),
              Xv(n) + r.length,
              tD(t)
            );
          } else {
            const h = na(n, t, r);
            if (!h.matched) return null;
            (s = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (o = new Xs(
                s,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                eD(t),
                yt(t),
                t.component,
                t,
                Yv(n),
                Xv(n) + s.length,
                tD(t)
              ));
          }
          const u = (function jP(e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = ra(
              n,
              s,
              a,
              u.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const h = this.processChildren(u, l);
            return null === h ? null : [new fn(o, h)];
          }
          if (0 === u.length && 0 === c.length) return [new fn(o, [])];
          const d = yt(t) === i,
            f = this.processSegment(u, l, c, d ? $ : i);
          return null === f ? null : [new fn(o, f)];
        }
      }
      function VP(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Jv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!VP(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((o) => r.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = Jv(r.children);
          t.push(new fn(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function Yv(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Xv(e) {
        let t = e,
          n = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (n += t._segmentIndexShift ? t._segmentIndexShift : 0);
        return n - 1;
      }
      function eD(e) {
        return e.data || {};
      }
      function tD(e) {
        return e.resolve || {};
      }
      function nD(e) {
        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
      }
      function jc(e) {
        return cn((t) => {
          const n = e(t);
          return n ? Pe(n).pipe(Q(() => t)) : A(t);
        });
      }
      class WP extends class GP {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const Vc = new B("ROUTES");
      class rD {
        constructor(t, n, r, i) {
          (this.injector = t),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = i);
        }
        load(t, n) {
          if (n._loader$) return n._loader$;
          this.onLoadStartListener && this.onLoadStartListener(n);
          const i = this.loadModuleFactory(n.loadChildren).pipe(
            Q((o) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const s = o.create(t);
              return new Nc(
                vv(s.injector.get(Vc, void 0, L.Self | L.Optional)).map(kc),
                s
              );
            }),
            Tn((o) => {
              throw ((n._loader$ = void 0), o);
            })
          );
          return (
            (n._loader$ = new oA(i, () => new Ot()).pipe(uv())), n._loader$
          );
        }
        loadModuleFactory(t) {
          return Qt(t()).pipe(
            Ie((n) =>
              n instanceof mm ? A(n) : Pe(this.compiler.compileModuleAsync(n))
            )
          );
        }
      }
      class KP {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function ZP(e) {
        throw e;
      }
      function JP(e, t, n) {
        return t.parse("/");
      }
      function iD(e, t) {
        return A(null);
      }
      const YP = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        XP = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let ot = (() => {
        class e {
          constructor(n, r, i, o, s, a, u) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = o),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Ot()),
              (this.errorHandler = ZP),
              (this.malformedUriErrorHandler = JP),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: iD,
                afterPreactivation: iD,
              }),
              (this.urlHandlingStrategy = new KP()),
              (this.routeReuseStrategy = new WP()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = s.get(sn)),
              (this.console = s.get(Ym));
            const d = s.get(Me);
            (this.isNgZoneEnabled = d instanceof Me && Me.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = (function MA() {
                return new Kn(new q([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new rD(
                s,
                a,
                (f) => this.triggerEvent(new hv(f)),
                (f) => this.triggerEvent(new pv(f))
              )),
              (this.routerState = Ov(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new mt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var n;
            return null === (n = this.location.getState()) || void 0 === n
              ? void 0
              : n.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              Wn((i) => 0 !== i.id),
              Q((i) =>
                Object.assign(Object.assign({}, i), {
                  extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
                })
              ),
              cn((i) => {
                let o = !1,
                  s = !1;
                return A(i).pipe(
                  it((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  cn((a) => {
                    const u = this.browserUrlTree.toString(),
                      l =
                        !this.navigated ||
                        a.extractedUrl.toString() !== u ||
                        u !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || l) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        ua(a.source) && (this.browserUrlTree = a.extractedUrl),
                        A(a).pipe(
                          cn((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Ec(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Zt
                                : Promise.resolve(d)
                            );
                          }),
                          (function CP(e, t, n, r) {
                            return cn((i) =>
                              (function yP(e, t, n, r, i) {
                                return new vP(e, t, n, r, i).apply();
                              })(e, t, n, i.extractedUrl, r).pipe(
                                Q((o) =>
                                  Object.assign(Object.assign({}, i), {
                                    urlAfterRedirects: o,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          it((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function HP(e, t, n, r, i) {
                            return Ie((o) =>
                              (function FP(
                                e,
                                t,
                                n,
                                r,
                                i = "emptyOnly",
                                o = "legacy"
                              ) {
                                try {
                                  const s = new kP(
                                    e,
                                    t,
                                    n,
                                    r,
                                    i,
                                    o
                                  ).recognize();
                                  return null === s ? Zv(new NP()) : A(s);
                                } catch (s) {
                                  return Zv(s);
                                }
                              })(
                                e,
                                t,
                                o.urlAfterRedirects,
                                n(o.urlAfterRedirects),
                                r,
                                i
                              ).pipe(
                                Q((s) =>
                                  Object.assign(Object.assign({}, o), {
                                    targetSnapshot: s,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          it((d) => {
                            if ("eager" === this.urlUpdateStrategy) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new fA(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      l &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: m,
                          extras: y,
                        } = a,
                        v = new Ec(f, this.serializeUrl(h), p, m);
                      r.next(v);
                      const g = Ov(h, this.rootComponentType).snapshot;
                      return A(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: g,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, y), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Zt;
                  }),
                  jc((a) => {
                    const {
                      targetSnapshot: u,
                      id: l,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.beforePreactivation(u, {
                      navigationId: l,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  it((a) => {
                    const u = new hA(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(u);
                  }),
                  Q((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: _P(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function SP(e, t) {
                    return Ie((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: o,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === o.length
                        ? A(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function TP(e, t, n, r) {
                            return Pe(e).pipe(
                              Ie((i) =>
                                (function RP(e, t, n, r, i) {
                                  const o =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return o && 0 !== o.length
                                    ? A(
                                        o.map((a) => {
                                          const u = aa(a, t, i);
                                          let l;
                                          if (
                                            (function sP(e) {
                                              return e && In(e.canDeactivate);
                                            })(u)
                                          )
                                            l = Qt(u.canDeactivate(e, t, n, r));
                                          else {
                                            if (!In(u))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            l = Qt(u(e, t, n, r));
                                          }
                                          return l.pipe(Jr());
                                        })
                                      ).pipe(so())
                                    : A(!0);
                                })(i.component, i.route, n, t, r)
                              ),
                              Jr((i) => !0 !== i, !0)
                            );
                          })(s, r, i, e).pipe(
                            Ie((a) =>
                              a &&
                              (function nP(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function IP(e, t, n, r) {
                                    return Pe(t).pipe(
                                      Qn((i) =>
                                        Xi(
                                          (function AP(e, t) {
                                            return (
                                              null !== e && t && t(new yA(e)),
                                              A(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function xP(e, t) {
                                            return (
                                              null !== e && t && t(new DA(e)),
                                              A(!0)
                                            );
                                          })(i.route, r),
                                          (function OP(e, t, n) {
                                            const r = t[t.length - 1],
                                              o = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function wP(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  Ws(() =>
                                                    A(
                                                      s.guards.map((u) => {
                                                        const l = aa(
                                                          u,
                                                          s.node,
                                                          n
                                                        );
                                                        let c;
                                                        if (
                                                          (function oP(e) {
                                                            return (
                                                              e &&
                                                              In(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(l)
                                                        )
                                                          c = Qt(
                                                            l.canActivateChild(
                                                              r,
                                                              e
                                                            )
                                                          );
                                                        else {
                                                          if (!In(l))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = Qt(l(r, e));
                                                        }
                                                        return c.pipe(Jr());
                                                      })
                                                    ).pipe(so())
                                                  )
                                                );
                                            return A(o).pipe(so());
                                          })(e, i.path, n),
                                          (function PP(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return A(!0);
                                            const i = r.map((o) =>
                                              Ws(() => {
                                                const s = aa(o, t, n);
                                                let a;
                                                if (
                                                  (function iP(e) {
                                                    return (
                                                      e && In(e.canActivate)
                                                    );
                                                  })(s)
                                                )
                                                  a = Qt(s.canActivate(t, e));
                                                else {
                                                  if (!In(s))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = Qt(s(t, e));
                                                }
                                                return a.pipe(Jr());
                                              })
                                            );
                                            return A(i).pipe(so());
                                          })(e, i.route, n)
                                        )
                                      ),
                                      Jr((i) => !0 !== i, !0)
                                    );
                                  })(r, o, e, t)
                                : A(a)
                            ),
                            Q((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  it((a) => {
                    if (Jn(a.guardsResult)) {
                      const l = bc(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((l.url = a.guardsResult), l);
                    }
                    const u = new pA(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(u);
                  }),
                  Wn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  jc((a) => {
                    if (a.guards.canActivateChecks.length)
                      return A(a).pipe(
                        it((u) => {
                          const l = new gA(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        cn((u) => {
                          let l = !1;
                          return A(u).pipe(
                            (function BP(e, t) {
                              return Ie((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n;
                                if (!i.length) return A(n);
                                let o = 0;
                                return Pe(i).pipe(
                                  Qn((s) =>
                                    (function UP(e, t, n, r) {
                                      return (function $P(e, t, n, r) {
                                        const i = nD(e);
                                        if (0 === i.length) return A({});
                                        const o = {};
                                        return Pe(i).pipe(
                                          Ie((s) =>
                                            (function zP(e, t, n, r) {
                                              const i = aa(e, t, r);
                                              return Qt(
                                                i.resolve
                                                  ? i.resolve(t, n)
                                                  : i(t, n)
                                              );
                                            })(e[s], t, n, r).pipe(
                                              it((a) => {
                                                o[s] = a;
                                              })
                                            )
                                          ),
                                          wc(1),
                                          Ie(() =>
                                            nD(o).length === i.length
                                              ? A(o)
                                              : Zt
                                          )
                                        );
                                      })(e._resolve, e, t, r).pipe(
                                        Q(
                                          (o) => (
                                            (e._resolvedData = o),
                                            (e.data = Object.assign(
                                              Object.assign({}, e.data),
                                              Rv(e, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  it(() => o++),
                                  wc(1),
                                  Ie((s) => (o === i.length ? A(n) : Zt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            it({
                              next: () => (l = !0),
                              complete: () => {
                                l ||
                                  (this.restoreHistory(u),
                                  this.cancelNavigationTransition(
                                    u,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        it((u) => {
                          const l = new mA(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        })
                      );
                  }),
                  jc((a) => {
                    const {
                      targetSnapshot: u,
                      id: l,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.afterPreactivation(u, {
                      navigationId: l,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  Q((a) => {
                    const u = (function $A(e, t, n) {
                      const r = ro(e, t._root, n ? n._root : void 0);
                      return new Pv(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: u,
                    });
                  }),
                  it((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    Q(
                      (r) => (
                        new eP(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  it({
                    next() {
                      o = !0;
                    },
                    complete() {
                      o = !0;
                    },
                  }),
                  (function cA(e) {
                    return Ae((t, n) => {
                      try {
                        t.subscribe(n);
                      } finally {
                        n.add(e);
                      }
                    });
                  })(() => {
                    var a;
                    o ||
                      s ||
                      this.cancelNavigationTransition(
                        i,
                        `Navigation ID ${i.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === i.id && (this.currentNavigation = null);
                  }),
                  Tn((a) => {
                    if (
                      ((s = !0),
                      (function wA(e) {
                        return e && e[mv];
                      })(a))
                    ) {
                      const u = Jn(a.url);
                      u || ((this.navigated = !0), this.restoreHistory(i, !0));
                      const l = new fv(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message
                      );
                      r.next(l),
                        u
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    i.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    ua(i.source),
                                };
                              this.scheduleNavigation(
                                c,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: i.resolve,
                                  reject: i.reject,
                                  promise: i.promise,
                                }
                              );
                            }, 0)
                          : i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const u = new dA(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a
                      );
                      r.next(u);
                      try {
                        i.resolve(this.errorHandler(a));
                      } catch (l) {
                        i.reject(l);
                      }
                    }
                    return Zt;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), n)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    var i;
                    const o = { replaceUrl: !0 },
                      s = (
                        null === (i = n.state) || void 0 === i
                          ? void 0
                          : i.navigationId
                      )
                        ? n.state
                        : null;
                    if (s) {
                      const u = Object.assign({}, s);
                      delete u.navigationId,
                        delete u.ɵrouterPageId,
                        0 !== Object.keys(u).length && (o.state = u);
                    }
                    const a = this.parseUrl(n.url);
                    this.scheduleNavigation(a, r, s, o);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            Uv(n),
              (this.config = n.map(kc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = i || this.routerState.root,
              c = u ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  o
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = o || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function GA(e, t, n, r, i) {
                if (0 === n.length) return Pc(t.root, t.root, t, r, i);
                const o = (function WA(e) {
                  if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new Lv(!0, 0, e);
                  let t = 0,
                    n = !1;
                  const r = e.reduce((i, o, s) => {
                    if ("object" == typeof o && null != o) {
                      if (o.outlets) {
                        const a = {};
                        return (
                          Re(o.outlets, (u, l) => {
                            a[l] = "string" == typeof u ? u.split("/") : u;
                          }),
                          [...i, { outlets: a }]
                        );
                      }
                      if (o.segmentPath) return [...i, o.segmentPath];
                    }
                    return "string" != typeof o
                      ? [...i, o]
                      : 0 === s
                      ? (o.split("/").forEach((a, u) => {
                          (0 == u && "." === a) ||
                            (0 == u && "" === a
                              ? (n = !0)
                              : ".." === a
                              ? t++
                              : "" != a && i.push(a));
                        }),
                        i)
                      : [...i, o];
                  }, []);
                  return new Lv(n, t, r);
                })(n);
                if (o.toRoot()) return Pc(t.root, new q([], {}), t, r, i);
                const s = (function QA(e, t, n) {
                    if (e.isAbsolute) return new Oc(t.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const o = n.snapshot._urlSegment;
                      return new Oc(o, o === t.root, 0);
                    }
                    const r = ea(e.commands[0]) ? 0 : 1;
                    return (function KA(e, t, n) {
                      let r = e,
                        i = t,
                        o = n;
                      for (; o > i; ) {
                        if (((o -= i), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        i = r.segments.length;
                      }
                      return new Oc(r, !1, i - o);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      e.numberOfDoubleDots
                    );
                  })(o, t, e),
                  a = s.processChildren
                    ? ta(s.segmentGroup, s.index, o.commands)
                    : jv(s.segmentGroup, s.index, o.commands);
                return Pc(s.segmentGroup, a, t, r, i);
              })(l, this.currentUrlTree, n, d, null != c ? c : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = Jn(n) ? n : this.parseUrl(n),
              o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(o, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function eO(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${t}`
                    );
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let i;
            if (
              ((i =
                !0 === r
                  ? Object.assign({}, YP)
                  : !1 === r
                  ? Object.assign({}, XP)
                  : r),
              Jn(n))
            )
              return _v(this.currentUrlTree, n, i);
            const o = this.parseUrl(n);
            return _v(this.currentUrlTree, o, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const o = n[i];
              return null != o && (r[i] = o), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new eo(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, i, o, s) {
            var a, u, l;
            if (this.disposed) return Promise.resolve(!1);
            const c = this.transitions.value,
              d = ua(r) && c && !ua(c.source),
              f = c.rawUrl.toString() === n.toString(),
              h =
                c.id ===
                (null === (a = this.currentNavigation) || void 0 === a
                  ? void 0
                  : a.id);
            if (d && f && h) return Promise.resolve(!0);
            let m, y, v;
            s
              ? ((m = s.resolve), (y = s.reject), (v = s.promise))
              : (v = new Promise((P, G) => {
                  (m = P), (y = G);
                }));
            const g = ++this.navigationId;
            let b;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (b =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : o.replaceUrl || o.skipLocationChange
                      ? null !== (u = this.browserPageId) && void 0 !== u
                        ? u
                        : 0
                      : (null !== (l = this.browserPageId) && void 0 !== l
                          ? l
                          : 0) + 1))
                : (b = 0),
              this.setTransition({
                id: g,
                targetPageId: b,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: o,
                resolve: m,
                reject: y,
                promise: v,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              v.catch((P) => Promise.reject(P))
            );
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n),
              o = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, "", o)
              : this.location.go(i, "", o);
          }
          restoreHistory(n, r = !1) {
            var i, o;
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (i = this.currentNavigation) || void 0 === i
                    ? void 0
                    : i.finalUrl)) ||
              0 === s
                ? this.currentUrlTree ===
                    (null === (o = this.currentNavigation) || void 0 === o
                      ? void 0
                      : o.finalUrl) &&
                  0 === s &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(s);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r) {
            const i = new fv(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(i), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            cl();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ua(e) {
        return "imperative" !== e;
      }
      let Yn = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.router = n),
              (this.route = r),
              (this.tabIndexAttribute = i),
              (this.renderer = o),
              (this.el = s),
              (this.commands = null),
              (this.onChanges = new Ot()),
              this.setTabIndexIfNotOnNativeEl("0");
          }
          setTabIndexIfNotOnNativeEl(n) {
            if (null != this.tabIndexAttribute) return;
            const r = this.renderer,
              i = this.el.nativeElement;
            null !== n
              ? r.setAttribute(i, "tabindex", n)
              : r.removeAttribute(i, "tabindex");
          }
          ngOnChanges(n) {
            this.onChanges.next(this);
          }
          set routerLink(n) {
            null != n
              ? ((this.commands = Array.isArray(n) ? n : [n]),
                this.setTabIndexIfNotOnNativeEl("0"))
              : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
          }
          onClick() {
            if (null === this.urlTree) return !0;
            const n = {
              skipLocationChange: ti(this.skipLocationChange),
              replaceUrl: ti(this.replaceUrl),
              state: this.state,
            };
            return this.router.navigateByUrl(this.urlTree, n), !0;
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: ti(this.preserveFragment),
                });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(ot), T(ei), mi("tabindex"), T(Bi), T(on));
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
            hostBindings: function (n, r) {
              1 & n &&
                zt("click", function () {
                  return r.onClick();
                });
            },
            inputs: {
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              state: "state",
              relativeTo: "relativeTo",
              routerLink: "routerLink",
            },
            features: [Hn],
          })),
          e
        );
      })();
      function ti(e) {
        return "" === e || !!e;
      }
      class oD {}
      class sD {
        preload(t, n) {
          return A(null);
        }
      }
      let aD = (() => {
          class e {
            constructor(n, r, i, o) {
              (this.router = n),
                (this.injector = i),
                (this.preloadingStrategy = o),
                (this.loader = new rD(
                  i,
                  r,
                  (u) => n.triggerEvent(new hv(u)),
                  (u) => n.triggerEvent(new pv(u))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Wn((n) => n instanceof eo),
                  Qn(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const n = this.injector.get(sn);
              return this.processRoutes(n, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, r) {
              const i = [];
              for (const o of r)
                if (o.loadChildren && !o.canLoad && o._loadedConfig) {
                  const s = o._loadedConfig;
                  i.push(this.processRoutes(s.module, s.routes));
                } else
                  o.loadChildren && !o.canLoad
                    ? i.push(this.preloadConfig(n, o))
                    : o.children && i.push(this.processRoutes(n, o.children));
              return Pe(i).pipe(
                oi(),
                Q((o) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? A(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  Ie(
                    (o) => (
                      (r._loadedConfig = o),
                      this.processRoutes(o.module, o.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(ot), M(Is), M(Le), M(oD));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Bc = (() => {
          class e {
            constructor(n, r, i = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = i),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (i.scrollPositionRestoration =
                  i.scrollPositionRestoration || "disabled"),
                (i.anchorScrolling = i.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Ec
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof eo &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof gv &&
                  (n.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new gv(
                  n,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (e.ɵfac = function (n) {
              cl();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Xn = new B("ROUTER_CONFIGURATION"),
        uD = new B("ROUTER_FORROOT_GUARD"),
        iO = [
          tc,
          { provide: Mv, useClass: Sv },
          {
            provide: ot,
            useFactory: function lO(e, t, n, r, i, o, s = {}, a, u) {
              const l = new ot(null, e, t, n, r, i, vv(o));
              return (
                a && (l.urlHandlingStrategy = a),
                u && (l.routeReuseStrategy = u),
                (function cO(e, t) {
                  e.errorHandler && (t.errorHandler = e.errorHandler),
                    e.malformedUriErrorHandler &&
                      (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
                    e.onSameUrlNavigation &&
                      (t.onSameUrlNavigation = e.onSameUrlNavigation),
                    e.paramsInheritanceStrategy &&
                      (t.paramsInheritanceStrategy =
                        e.paramsInheritanceStrategy),
                    e.relativeLinkResolution &&
                      (t.relativeLinkResolution = e.relativeLinkResolution),
                    e.urlUpdateStrategy &&
                      (t.urlUpdateStrategy = e.urlUpdateStrategy),
                    e.canceledNavigationResolution &&
                      (t.canceledNavigationResolution =
                        e.canceledNavigationResolution);
                })(s, l),
                s.enableTracing &&
                  l.events.subscribe((c) => {
                    var d, f;
                    null === (d = console.group) ||
                      void 0 === d ||
                      d.call(console, `Router Event: ${c.constructor.name}`),
                      console.log(c.toString()),
                      console.log(c),
                      null === (f = console.groupEnd) ||
                        void 0 === f ||
                        f.call(console);
                  }),
                l
              );
            },
            deps: [
              Mv,
              ao,
              tc,
              Le,
              Is,
              Vc,
              Xn,
              [class QP {}, new Vt()],
              [class qP {}, new Vt()],
            ],
          },
          ao,
          {
            provide: ei,
            useFactory: function dO(e) {
              return e.routerState.root;
            },
            deps: [ot],
          },
          aD,
          sD,
          class rO {
            preload(t, n) {
              return n().pipe(Tn(() => A(null)));
            }
          },
          { provide: Xn, useValue: { enableTracing: !1 } },
        ];
      function oO() {
        return new iy("Router", ot);
      }
      let lD = (() => {
        class e {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                iO,
                cD(n),
                {
                  provide: uD,
                  useFactory: uO,
                  deps: [[ot, new Vt(), new yr()]],
                },
                { provide: Xn, useValue: r || {} },
                {
                  provide: Zr,
                  useFactory: aO,
                  deps: [Gn, [new Ei(ec), new Vt()], Xn],
                },
                { provide: Bc, useFactory: sO, deps: [ot, dx, Xn] },
                {
                  provide: oD,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : sD,
                },
                { provide: iy, multi: !0, useFactory: oO },
                [
                  Uc,
                  { provide: Ss, multi: !0, useFactory: fO, deps: [Uc] },
                  { provide: dD, useFactory: hO, deps: [Uc] },
                  { provide: Jm, multi: !0, useExisting: dD },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [cD(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(uD, 8), M(ot, 8));
          }),
          (e.ɵmod = Ft({ type: e })),
          (e.ɵinj = vt({})),
          e
        );
      })();
      function sO(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new Bc(e, t, n);
      }
      function aO(e, t, n = {}) {
        return n.useHash ? new WT(e, t) : new Sy(e, t);
      }
      function uO(e) {
        return "guarded";
      }
      function cD(e) {
        return [
          { provide: w_, multi: !0, useValue: e },
          { provide: Vc, multi: !0, useValue: e },
        ];
      }
      let Uc = (() => {
        class e {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new Ot());
          }
          appInitializer() {
            return this.injector.get(zT, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const i = new Promise((a) => (r = a)),
                o = this.injector.get(ot),
                s = this.injector.get(Xn);
              return (
                "disabled" === s.initialNavigation
                  ? (o.setUpLocationChangeListener(), r(!0))
                  : "enabled" === s.initialNavigation ||
                    "enabledBlocking" === s.initialNavigation
                  ? ((o.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? A(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    o.initialNavigation())
                  : r(!0),
                i
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(Xn),
              i = this.injector.get(aD),
              o = this.injector.get(Bc),
              s = this.injector.get(ot),
              a = this.injector.get(Wi);
            n === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                s.initialNavigation(),
              i.setUpPreloading(),
              o.init(),
              s.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Le));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function fO(e) {
        return e.appInitializer.bind(e);
      }
      function hO(e) {
        return e.bootstrapListener.bind(e);
      }
      const dD = new B("Router Initializer");
      function er(e) {
        return !!e && (e instanceof ie || (X(e.lift) && X(e.subscribe)));
      }
      const fD = { now: () => (fD.delegate || Date).now(), delegate: void 0 };
      class mO extends Ot {
        constructor(t = 1 / 0, n = 1 / 0, r = fD) {
          super(),
            (this._bufferSize = t),
            (this._windowTime = n),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = n === 1 / 0),
            (this._bufferSize = Math.max(1, t)),
            (this._windowTime = Math.max(1, n));
        }
        next(t) {
          const {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: i,
            _timestampProvider: o,
            _windowTime: s,
          } = this;
          n || (r.push(t), !i && r.push(o.now() + s)),
            this._trimBuffer(),
            super.next(t);
        }
        _subscribe(t) {
          this._throwIfClosed(), this._trimBuffer();
          const n = this._innerSubscribe(t),
            { _infiniteTimeWindow: r, _buffer: i } = this,
            o = i.slice();
          for (let s = 0; s < o.length && !t.closed; s += r ? 1 : 2)
            t.next(o[s]);
          return this._checkFinalizedStatuses(t), n;
        }
        _trimBuffer() {
          const {
              _bufferSize: t,
              _timestampProvider: n,
              _buffer: r,
              _infiniteTimeWindow: i,
            } = this,
            o = (i ? 1 : 2) * t;
          if ((t < 1 / 0 && o < r.length && r.splice(0, r.length - o), !i)) {
            const s = n.now();
            let a = 0;
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
            a && r.splice(0, a + 1);
          }
        }
      }
      function hD(e, t, n) {
        var r, i;
        let o,
          s = !1;
        return (
          e && "object" == typeof e
            ? ((o = null !== (r = e.bufferSize) && void 0 !== r ? r : 1 / 0),
              (t = null !== (i = e.windowTime) && void 0 !== i ? i : 1 / 0),
              (s = !!e.refCount),
              (n = e.scheduler))
            : (o = null != e ? e : 1 / 0),
          jd({
            connector: () => new mO(o, t, n),
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: s,
          })
        );
      }
      class fo {}
      let pD = (() => {
        class e extends fo {
          getTranslation(n) {
            return A({});
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = $o(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class $c {}
      let gD = (() => {
        class e {
          handle(n) {
            return n.key;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function la(e, t) {
        if (e === t) return !0;
        if (null === e || null === t) return !1;
        if (e != e && t != t) return !0;
        let i,
          o,
          s,
          n = typeof e;
        if (n == typeof t && "object" == n) {
          if (!Array.isArray(e)) {
            if (Array.isArray(t)) return !1;
            for (o in ((s = Object.create(null)), e)) {
              if (!la(e[o], t[o])) return !1;
              s[o] = !0;
            }
            for (o in t) if (!(o in s) && void 0 !== t[o]) return !1;
            return !0;
          }
          if (!Array.isArray(t)) return !1;
          if ((i = e.length) == t.length) {
            for (o = 0; o < i; o++) if (!la(e[o], t[o])) return !1;
            return !0;
          }
        }
        return !1;
      }
      function xn(e) {
        return null != e;
      }
      function zc(e) {
        return e && "object" == typeof e && !Array.isArray(e);
      }
      function mD(e, t) {
        let n = Object.assign({}, e);
        return (
          zc(e) &&
            zc(t) &&
            Object.keys(t).forEach((r) => {
              zc(t[r])
                ? r in e
                  ? (n[r] = mD(e[r], t[r]))
                  : Object.assign(n, { [r]: t[r] })
                : Object.assign(n, { [r]: t[r] });
            }),
          n
        );
      }
      class ca {}
      let yD = (() => {
        class e extends ca {
          constructor() {
            super(...arguments),
              (this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g);
          }
          interpolate(n, r) {
            let i;
            return (
              (i =
                "string" == typeof n
                  ? this.interpolateString(n, r)
                  : "function" == typeof n
                  ? this.interpolateFunction(n, r)
                  : n),
              i
            );
          }
          getValue(n, r) {
            let i = "string" == typeof r ? r.split(".") : [r];
            r = "";
            do {
              (r += i.shift()),
                !xn(n) || !xn(n[r]) || ("object" != typeof n[r] && i.length)
                  ? i.length
                    ? (r += ".")
                    : (n = void 0)
                  : ((n = n[r]), (r = ""));
            } while (i.length);
            return n;
          }
          interpolateFunction(n, r) {
            return n(r);
          }
          interpolateString(n, r) {
            return r
              ? n.replace(this.templateMatcher, (i, o) => {
                  let s = this.getValue(r, o);
                  return xn(s) ? s : i;
                })
              : n;
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = $o(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class da {}
      let vD = (() => {
        class e extends da {
          compile(n, r) {
            return n;
          }
          compileTranslations(n, r) {
            return n;
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = $o(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class DD {
        constructor() {
          (this.currentLang = this.defaultLang),
            (this.translations = {}),
            (this.langs = []),
            (this.onTranslationChange = new pe()),
            (this.onLangChange = new pe()),
            (this.onDefaultLangChange = new pe());
        }
      }
      const qc = new B("USE_STORE"),
        Gc = new B("USE_DEFAULT_LANG"),
        Wc = new B("DEFAULT_LANGUAGE"),
        Qc = new B("USE_EXTEND");
      let ni = (() => {
          class e {
            constructor(n, r, i, o, s, a = !0, u = !1, l = !1, c) {
              (this.store = n),
                (this.currentLoader = r),
                (this.compiler = i),
                (this.parser = o),
                (this.missingTranslationHandler = s),
                (this.useDefaultLang = a),
                (this.isolate = u),
                (this.extend = l),
                (this.pending = !1),
                (this._onTranslationChange = new pe()),
                (this._onLangChange = new pe()),
                (this._onDefaultLangChange = new pe()),
                (this._langs = []),
                (this._translations = {}),
                (this._translationRequests = {}),
                c && this.setDefaultLang(c);
            }
            get onTranslationChange() {
              return this.isolate
                ? this._onTranslationChange
                : this.store.onTranslationChange;
            }
            get onLangChange() {
              return this.isolate
                ? this._onLangChange
                : this.store.onLangChange;
            }
            get onDefaultLangChange() {
              return this.isolate
                ? this._onDefaultLangChange
                : this.store.onDefaultLangChange;
            }
            get defaultLang() {
              return this.isolate ? this._defaultLang : this.store.defaultLang;
            }
            set defaultLang(n) {
              this.isolate
                ? (this._defaultLang = n)
                : (this.store.defaultLang = n);
            }
            get currentLang() {
              return this.isolate ? this._currentLang : this.store.currentLang;
            }
            set currentLang(n) {
              this.isolate
                ? (this._currentLang = n)
                : (this.store.currentLang = n);
            }
            get langs() {
              return this.isolate ? this._langs : this.store.langs;
            }
            set langs(n) {
              this.isolate ? (this._langs = n) : (this.store.langs = n);
            }
            get translations() {
              return this.isolate
                ? this._translations
                : this.store.translations;
            }
            set translations(n) {
              this.isolate
                ? (this._translations = n)
                : (this.store.translations = n);
            }
            setDefaultLang(n) {
              if (n === this.defaultLang) return;
              let r = this.retrieveTranslations(n);
              void 0 !== r
                ? (null == this.defaultLang && (this.defaultLang = n),
                  r.pipe(pn(1)).subscribe((i) => {
                    this.changeDefaultLang(n);
                  }))
                : this.changeDefaultLang(n);
            }
            getDefaultLang() {
              return this.defaultLang;
            }
            use(n) {
              if (n === this.currentLang) return A(this.translations[n]);
              let r = this.retrieveTranslations(n);
              return void 0 !== r
                ? (this.currentLang || (this.currentLang = n),
                  r.pipe(pn(1)).subscribe((i) => {
                    this.changeLang(n);
                  }),
                  r)
                : (this.changeLang(n), A(this.translations[n]));
            }
            retrieveTranslations(n) {
              let r;
              return (
                (void 0 === this.translations[n] || this.extend) &&
                  ((this._translationRequests[n] =
                    this._translationRequests[n] || this.getTranslation(n)),
                  (r = this._translationRequests[n])),
                r
              );
            }
            getTranslation(n) {
              this.pending = !0;
              const r = this.currentLoader.getTranslation(n).pipe(hD(1), pn(1));
              return (
                (this.loadingTranslations = r.pipe(
                  Q((i) => this.compiler.compileTranslations(i, n)),
                  hD(1),
                  pn(1)
                )),
                this.loadingTranslations.subscribe({
                  next: (i) => {
                    (this.translations[n] =
                      this.extend && this.translations[n]
                        ? Object.assign(
                            Object.assign({}, i),
                            this.translations[n]
                          )
                        : i),
                      this.updateLangs(),
                      (this.pending = !1);
                  },
                  error: (i) => {
                    this.pending = !1;
                  },
                }),
                r
              );
            }
            setTranslation(n, r, i = !1) {
              (r = this.compiler.compileTranslations(r, n)),
                (this.translations[n] =
                  (i || this.extend) && this.translations[n]
                    ? mD(this.translations[n], r)
                    : r),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: n,
                  translations: this.translations[n],
                });
            }
            getLangs() {
              return this.langs;
            }
            addLangs(n) {
              n.forEach((r) => {
                -1 === this.langs.indexOf(r) && this.langs.push(r);
              });
            }
            updateLangs() {
              this.addLangs(Object.keys(this.translations));
            }
            getParsedResult(n, r, i) {
              let o;
              if (r instanceof Array) {
                let s = {},
                  a = !1;
                for (let u of r)
                  (s[u] = this.getParsedResult(n, u, i)), er(s[u]) && (a = !0);
                return a
                  ? (function gO(...e) {
                      const t = Nd(e),
                        { args: n, keys: r } = iv(e),
                        i = new ie((o) => {
                          const { length: s } = n;
                          if (!s) return void o.complete();
                          const a = new Array(s);
                          let u = s,
                            l = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            Rt(n[c]).subscribe(
                              new Te(
                                o,
                                (f) => {
                                  d || ((d = !0), l--), (a[c] = f);
                                },
                                () => u--,
                                void 0,
                                () => {
                                  (!u || !d) &&
                                    (l || o.next(r ? sv(r, a) : a),
                                    o.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? i.pipe(ov(t)) : i;
                    })(r.map((l) => (er(s[l]) ? s[l] : A(s[l])))).pipe(
                      Q((l) => {
                        let c = {};
                        return (
                          l.forEach((d, f) => {
                            c[r[f]] = d;
                          }),
                          c
                        );
                      })
                    )
                  : s;
              }
              if (
                (n &&
                  (o = this.parser.interpolate(this.parser.getValue(n, r), i)),
                void 0 === o &&
                  null != this.defaultLang &&
                  this.defaultLang !== this.currentLang &&
                  this.useDefaultLang &&
                  (o = this.parser.interpolate(
                    this.parser.getValue(
                      this.translations[this.defaultLang],
                      r
                    ),
                    i
                  )),
                void 0 === o)
              ) {
                let s = { key: r, translateService: this };
                void 0 !== i && (s.interpolateParams = i),
                  (o = this.missingTranslationHandler.handle(s));
              }
              return void 0 !== o ? o : r;
            }
            get(n, r) {
              if (!xn(n) || !n.length)
                throw new Error('Parameter "key" required');
              if (this.pending)
                return this.loadingTranslations.pipe(
                  Qn((i) =>
                    er((i = this.getParsedResult(i, n, r))) ? i : A(i)
                  )
                );
              {
                let i = this.getParsedResult(
                  this.translations[this.currentLang],
                  n,
                  r
                );
                return er(i) ? i : A(i);
              }
            }
            getStreamOnTranslationChange(n, r) {
              if (!xn(n) || !n.length)
                throw new Error('Parameter "key" required');
              return Xi(
                Ws(() => this.get(n, r)),
                this.onTranslationChange.pipe(
                  cn((i) => {
                    const o = this.getParsedResult(i.translations, n, r);
                    return "function" == typeof o.subscribe ? o : A(o);
                  })
                )
              );
            }
            stream(n, r) {
              if (!xn(n) || !n.length)
                throw new Error('Parameter "key" required');
              return Xi(
                Ws(() => this.get(n, r)),
                this.onLangChange.pipe(
                  cn((i) => {
                    const o = this.getParsedResult(i.translations, n, r);
                    return er(o) ? o : A(o);
                  })
                )
              );
            }
            instant(n, r) {
              if (!xn(n) || !n.length)
                throw new Error('Parameter "key" required');
              let i = this.getParsedResult(
                this.translations[this.currentLang],
                n,
                r
              );
              if (er(i)) {
                if (n instanceof Array) {
                  let o = {};
                  return (
                    n.forEach((s, a) => {
                      o[n[a]] = n[a];
                    }),
                    o
                  );
                }
                return n;
              }
              return i;
            }
            set(n, r, i = this.currentLang) {
              (this.translations[i][n] = this.compiler.compile(r, i)),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: i,
                  translations: this.translations[i],
                });
            }
            changeLang(n) {
              (this.currentLang = n),
                this.onLangChange.emit({
                  lang: n,
                  translations: this.translations[n],
                }),
                null == this.defaultLang && this.changeDefaultLang(n);
            }
            changeDefaultLang(n) {
              (this.defaultLang = n),
                this.onDefaultLangChange.emit({
                  lang: n,
                  translations: this.translations[n],
                });
            }
            reloadLang(n) {
              return this.resetLang(n), this.getTranslation(n);
            }
            resetLang(n) {
              (this._translationRequests[n] = void 0),
                (this.translations[n] = void 0);
            }
            getBrowserLang() {
              if ("undefined" == typeof window || void 0 === window.navigator)
                return;
              let n = window.navigator.languages
                ? window.navigator.languages[0]
                : null;
              return (
                (n =
                  n ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                void 0 !== n
                  ? (-1 !== n.indexOf("-") && (n = n.split("-")[0]),
                    -1 !== n.indexOf("_") && (n = n.split("_")[0]),
                    n)
                  : void 0
              );
            }
            getBrowserCultureLang() {
              if ("undefined" == typeof window || void 0 === window.navigator)
                return;
              let n = window.navigator.languages
                ? window.navigator.languages[0]
                : null;
              return (
                (n =
                  n ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                n
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                M(DD),
                M(fo),
                M(da),
                M(ca),
                M($c),
                M(Gc),
                M(qc),
                M(Qc),
                M(Wc)
              );
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ho = (() => {
          class e {
            constructor(n, r) {
              (this.translate = n),
                (this._ref = r),
                (this.value = ""),
                (this.lastKey = null),
                (this.lastParams = []);
            }
            updateValue(n, r, i) {
              let o = (s) => {
                (this.value = void 0 !== s ? s : n),
                  (this.lastKey = n),
                  this._ref.markForCheck();
              };
              if (i) {
                let s = this.translate.getParsedResult(i, n, r);
                er(s.subscribe) ? s.subscribe(o) : o(s);
              }
              this.translate.get(n, r).subscribe(o);
            }
            transform(n, ...r) {
              if (!n || !n.length) return n;
              if (la(n, this.lastKey) && la(r, this.lastParams))
                return this.value;
              let i;
              if (xn(r[0]) && r.length)
                if ("string" == typeof r[0] && r[0].length) {
                  let o = r[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                  try {
                    i = JSON.parse(o);
                  } catch (s) {
                    throw new SyntaxError(
                      `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${r[0]}`
                    );
                  }
                } else
                  "object" == typeof r[0] && !Array.isArray(r[0]) && (i = r[0]);
              return (
                (this.lastKey = n),
                (this.lastParams = r),
                this.updateValue(n, i),
                this._dispose(),
                this.onTranslationChange ||
                  (this.onTranslationChange =
                    this.translate.onTranslationChange.subscribe((o) => {
                      this.lastKey &&
                        o.lang === this.translate.currentLang &&
                        ((this.lastKey = null),
                        this.updateValue(n, i, o.translations));
                    })),
                this.onLangChange ||
                  (this.onLangChange = this.translate.onLangChange.subscribe(
                    (o) => {
                      this.lastKey &&
                        ((this.lastKey = null),
                        this.updateValue(n, i, o.translations));
                    }
                  )),
                this.onDefaultLangChange ||
                  (this.onDefaultLangChange =
                    this.translate.onDefaultLangChange.subscribe(() => {
                      this.lastKey &&
                        ((this.lastKey = null), this.updateValue(n, i));
                    })),
                this.value
              );
            }
            _dispose() {
              void 0 !== this.onTranslationChange &&
                (this.onTranslationChange.unsubscribe(),
                (this.onTranslationChange = void 0)),
                void 0 !== this.onLangChange &&
                  (this.onLangChange.unsubscribe(),
                  (this.onLangChange = void 0)),
                void 0 !== this.onDefaultLangChange &&
                  (this.onDefaultLangChange.unsubscribe(),
                  (this.onDefaultLangChange = void 0));
            }
            ngOnDestroy() {
              this._dispose();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(ni, 16), T(xs, 16));
            }),
            (e.ɵpipe = He({ name: "translate", type: e, pure: !1 })),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        yO = (() => {
          class e {
            static forRoot(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.loader || { provide: fo, useClass: pD },
                  n.compiler || { provide: da, useClass: vD },
                  n.parser || { provide: ca, useClass: yD },
                  n.missingTranslationHandler || { provide: $c, useClass: gD },
                  DD,
                  { provide: qc, useValue: n.isolate },
                  { provide: Gc, useValue: n.useDefaultLang },
                  { provide: Qc, useValue: n.extend },
                  { provide: Wc, useValue: n.defaultLanguage },
                  ni,
                ],
              };
            }
            static forChild(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.loader || { provide: fo, useClass: pD },
                  n.compiler || { provide: da, useClass: vD },
                  n.parser || { provide: ca, useClass: yD },
                  n.missingTranslationHandler || { provide: $c, useClass: gD },
                  { provide: qc, useValue: n.isolate },
                  { provide: Gc, useValue: n.useDefaultLang },
                  { provide: Qc, useValue: n.extend },
                  { provide: Wc, useValue: n.defaultLanguage },
                  ni,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({})),
            e
          );
        })();
      const vO = ["name"];
      let DO = (() => {
        class e {
          constructor(n) {
            n.setDefaultLang("pl"), n.use("pl");
          }
          ngOnInit() {}
          startQuiz() {
            localStorage.setItem("name", this.nameKey.nativeElement.value);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(ni));
          }),
          (e.ɵcmp = Xt({
            type: e,
            selectors: [["app-main-view"]],
            viewQuery: function (n, r) {
              if ((1 & n && Am(vO, 5), 2 & n)) {
                let i;
                _s(
                  (i = (function ws() {
                    return (function PS(e, t) {
                      return e[19].queries[t].queryList;
                    })(D(), af());
                  })())
                ) && (r.nameKey = i.first);
              }
            },
            decls: 23,
            vars: 18,
            consts: [
              [1, "contentMain"],
              [1, "text"],
              [1, "name"],
              ["for", ""],
              ["type", "text"],
              ["name", ""],
              ["routerLink", "/question", 3, "click"],
            ],
            template: function (n, r) {
              1 & n &&
                (C(0, "div", 0),
                C(1, "h1"),
                I(2),
                se(3, "translate"),
                _(),
                C(4, "div", 1),
                C(5, "p"),
                I(6),
                se(7, "translate"),
                _(),
                C(8, "p"),
                I(9),
                se(10, "translate"),
                _(),
                C(11, "p"),
                I(12),
                se(13, "translate"),
                _(),
                _(),
                C(14, "div", 2),
                C(15, "label", 3),
                I(16),
                se(17, "translate"),
                _(),
                Qe(18, "input", 4, 5),
                _(),
                C(20, "button", 6),
                zt("click", function () {
                  return r.startQuiz();
                }),
                I(21),
                se(22, "translate"),
                _(),
                _()),
                2 & n &&
                  (S(2),
                  Z(ae(3, 6, "home.title")),
                  S(4),
                  Z(ae(7, 8, "home.textOne")),
                  S(3),
                  Z(ae(10, 10, "home.textTwo")),
                  S(3),
                  Z(ae(13, 12, "home.textThree")),
                  S(4),
                  Z(ae(17, 14, "home.textName")),
                  S(5),
                  ve(" ", ae(22, 16, "home.button"), " "));
            },
            directives: [Yn],
            pipes: [ho],
            styles: [
              "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentMain[_ngcontent-%COMP%]{margin:0;padding:0;position:absolute;top:180px;left:calc(50% - 500px);width:1000px;height:500px;max-width:1920px;max-height:1080px;display:flex;flex-direction:column;justify-content:space-between;font-family:Arial,sans-serif;color:#074430;text-align:center}.contentMain[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase;text-align:center;font-size:45px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:10px;font-size:30px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-of-type(2){color:#d61919;font-weight:700}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;flex-direction:column}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:27px;padding:20px}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:0 auto;width:400px;height:30px;font-size:22px;background-color:#d9f3f0;border:3px dotted #62928c;border-radius:5px}.contentMain[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:70px;width:150px;position:relative;top:0px;left:calc(50% - 75px);font-size:30px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}",
            ],
          })),
          e
        );
      })();
      class CD {}
      class _D {}
      class hn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const i = n.slice(0, r),
                                o = i.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(i, o),
                                this.headers.has(o)
                                  ? this.headers.get(o).push(s)
                                  : this.headers.set(o, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const i = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(i, r),
                                this.maybeSetNormalizedName(n, i));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof hn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new hn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof hn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const i = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              i.push(...r), this.headers.set(n, i);
              break;
            case "d":
              const o = t.value;
              if (o) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class CO {
        encodeKey(t) {
          return wD(t);
        }
        encodeValue(t) {
          return wD(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const wO = /%(\d[a-f0-9])/gi,
        EO = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "2B": "+",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function wD(e) {
        return encodeURIComponent(e).replace(wO, (t, n) => {
          var r;
          return null !== (r = EO[n]) && void 0 !== r ? r : t;
        });
      }
      function ED(e) {
        return `${e}`;
      }
      class An {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new CO()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function _O(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const o = i.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [t.decodeKey(i), ""]
                            : [
                                t.decodeKey(i.slice(0, o)),
                                t.decodeValue(i.slice(o + 1)),
                              ],
                        u = n.get(s) || [];
                      u.push(a), n.set(s, u);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n];
                  this.map.set(n, Array.isArray(r) ? r : [r]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const i = t[r];
              Array.isArray(i)
                ? i.forEach((o) => {
                    n.push({ param: r, value: o, op: "a" });
                  })
                : n.push({ param: r, value: i, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new An({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(ED(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const i = r.indexOf(ED(t.value));
                      -1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class bO {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function bD(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function MD(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function SD(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class po {
        constructor(t, n, r, i) {
          let o;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function MO(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (o = i))
              : (o = r),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new hn()),
            this.context || (this.context = new bO()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new An()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : bD(this.body) ||
              MD(this.body) ||
              SD(this.body) ||
              (function SO(e) {
                return (
                  "undefined" != typeof URLSearchParams &&
                  e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof An
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || SD(this.body)
            ? null
            : MD(this.body)
            ? this.body.type || null
            : bD(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof An
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          var n;
          const r = t.method || this.method,
            i = t.url || this.url,
            o = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            a =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            u =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const d = null !== (n = t.context) && void 0 !== n ? n : this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (f, h) => f.set(h, t.setHeaders[h]),
                l
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (f, h) => f.set(h, t.setParams[h]),
                c
              )),
            new po(r, i, s, {
              params: c,
              headers: l,
              context: d,
              reportProgress: u,
              responseType: o,
              withCredentials: a,
            })
          );
        }
      }
      var _e = (() => (
        ((_e = _e || {})[(_e.Sent = 0)] = "Sent"),
        (_e[(_e.UploadProgress = 1)] = "UploadProgress"),
        (_e[(_e.ResponseHeader = 2)] = "ResponseHeader"),
        (_e[(_e.DownloadProgress = 3)] = "DownloadProgress"),
        (_e[(_e.Response = 4)] = "Response"),
        (_e[(_e.User = 5)] = "User"),
        _e
      ))();
      class Kc {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new hn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Zc extends Kc {
        constructor(t = {}) {
          super(t), (this.type = _e.ResponseHeader);
        }
        clone(t = {}) {
          return new Zc({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class fa extends Kc {
        constructor(t = {}) {
          super(t),
            (this.type = _e.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new fa({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class TD extends Kc {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Jc(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let Yc = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, i = {}) {
            let o;
            if (n instanceof po) o = n;
            else {
              let u, l;
              (u = i.headers instanceof hn ? i.headers : new hn(i.headers)),
                i.params &&
                  (l =
                    i.params instanceof An
                      ? i.params
                      : new An({ fromObject: i.params })),
                (o = new po(n, r, void 0 !== i.body ? i.body : null, {
                  headers: u,
                  context: i.context,
                  params: l,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || "json",
                  withCredentials: i.withCredentials,
                }));
            }
            const s = A(o).pipe(Qn((u) => this.handler.handle(u)));
            if (n instanceof po || "events" === i.observe) return s;
            const a = s.pipe(Wn((u) => u instanceof fa));
            switch (i.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      Q((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      Q((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      Q((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(Q((u) => u.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new An().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, i = {}) {
            return this.request("PATCH", n, Jc(i, r));
          }
          post(n, r, i = {}) {
            return this.request("POST", n, Jc(i, r));
          }
          put(n, r, i = {}) {
            return this.request("PUT", n, Jc(i, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(CD));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ID {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const xD = new B("HTTP_INTERCEPTORS");
      let TO = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const IO = /^\)\]\}',?\n/;
      let AD = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new ie((r) => {
              const i = this.xhrFactory.build();
              if (
                (i.open(n.method, n.urlWithParams),
                n.withCredentials && (i.withCredentials = !0),
                n.headers.forEach((h, p) => i.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  i.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && i.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                i.responseType = "json" !== h ? h : "text";
              }
              const o = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = 1223 === i.status ? 204 : i.status,
                    p = i.statusText || "OK",
                    m = new hn(i.getAllResponseHeaders()),
                    y =
                      (function xO(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(i) || n.url;
                  return (
                    (s = new Zc({
                      headers: m,
                      status: h,
                      statusText: p,
                      url: y,
                    })),
                    s
                  );
                },
                u = () => {
                  let { headers: h, status: p, statusText: m, url: y } = a(),
                    v = null;
                  204 !== p &&
                    (v = void 0 === i.response ? i.responseText : i.response),
                    0 === p && (p = v ? 200 : 0);
                  let g = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof v) {
                    const b = v;
                    v = v.replace(IO, "");
                    try {
                      v = "" !== v ? JSON.parse(v) : null;
                    } catch (P) {
                      (v = b), g && ((g = !1), (v = { error: P, text: v }));
                    }
                  }
                  g
                    ? (r.next(
                        new fa({
                          body: v,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: y || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new TD({
                          error: v,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: y || void 0,
                        })
                      );
                },
                l = (h) => {
                  const { url: p } = a(),
                    m = new TD({
                      error: h,
                      status: i.status || 0,
                      statusText: i.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(m);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: _e.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      !!i.responseText &&
                      (p.partialText = i.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: _e.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                i.addEventListener("load", u),
                i.addEventListener("error", l),
                i.addEventListener("timeout", l),
                i.addEventListener("abort", l),
                n.reportProgress &&
                  (i.addEventListener("progress", d),
                  null !== o &&
                    i.upload &&
                    i.upload.addEventListener("progress", f)),
                i.send(o),
                r.next({ type: _e.Sent }),
                () => {
                  i.removeEventListener("error", l),
                    i.removeEventListener("abort", l),
                    i.removeEventListener("load", u),
                    i.removeEventListener("timeout", l),
                    n.reportProgress &&
                      (i.removeEventListener("progress", d),
                      null !== o &&
                        i.upload &&
                        i.upload.removeEventListener("progress", f)),
                    i.readyState !== i.DONE && i.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(qy));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Xc = new B("XSRF_COOKIE_NAME"),
        ed = new B("XSRF_HEADER_NAME");
      class PD {}
      let AO = (() => {
          class e {
            constructor(n, r, i) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = i),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = ky(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(rt), M(Ts), M(Xc));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        td = (() => {
          class e {
            constructor(n, r) {
              (this.tokenService = n), (this.headerName = r);
            }
            intercept(n, r) {
              const i = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                i.startsWith("http://") ||
                i.startsWith("https://")
              )
                return r.handle(n);
              const o = this.tokenService.getToken();
              return (
                null !== o &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, o) })),
                r.handle(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(PD), M(ed));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        PO = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(xD, []);
                this.chain = r.reduceRight(
                  (i, o) => new ID(i, o),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(_D), M(Le));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        OO = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: td, useClass: TO }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: Xc, useValue: n.cookieName } : [],
                  n.headerName ? { provide: ed, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({
              providers: [
                td,
                { provide: xD, useExisting: td, multi: !0 },
                { provide: PD, useClass: AO },
                { provide: Xc, useValue: "XSRF-TOKEN" },
                { provide: ed, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        RO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({
              providers: [
                Yc,
                { provide: CD, useClass: PO },
                AD,
                { provide: _D, useExisting: AD },
              ],
              imports: [
                [
                  OO.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            e
          );
        })(),
        OD = (() => {
          class e {
            constructor(n) {
              this.http = n;
            }
            getQuestionsJson() {
              return this.http.get("assets/questions.json");
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Yc));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        nd = (() => {
          class e {
            constructor() {
              (this.messageSource = new mt("default")),
                (this.currentMessage = this.messageSource.asObservable());
            }
            changeMessage(n) {
              this.messageSource.next(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        NO = (() => {
          class e {
            constructor(n, r) {
              (this.el = n), (this.render = r), (this.isCorrect = !1);
            }
            getAnswer() {
              this.render.setStyle(
                this.el.nativeElement,
                "background",
                this.isCorrect ? "#56b97c" : "#d16363"
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(on), T(Bi));
            }),
            (e.ɵdir = Oe({
              type: e,
              selectors: [["", "appChangeBg", ""]],
              hostBindings: function (n, r) {
                1 & n &&
                  zt("click", function () {
                    return r.getAnswer();
                  });
              },
              inputs: { isCorrect: "isCorrect" },
            })),
            e
          );
        })();
      function FO(e, t) {
        if (1 & e) {
          const n = fl();
          C(0, "ul"),
            C(1, "li", 7),
            zt("click", function () {
              const o = Ua(n).$implicit,
                s = pl();
              return s.getAnswer(s.currentQuestion + 1, o);
            }),
            I(2),
            _(),
            _();
        }
        if (2 & e) {
          const n = t.$implicit;
          S(1), ze("isCorrect", n.correct), S(1), ve(" ", n.text, " ");
        }
      }
      const go = function () {
        return {
          color: "green",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
        };
      };
      function jO(e, t) {
        1 & e &&
          (C(0, "div", 8),
          C(1, "p"),
          I(2),
          se(3, "translate"),
          _(),
          Qe(4, "img", 9),
          _()),
          2 & e && (S(2), Z(ae(3, 1, "home.summaryTextOne")));
      }
      function VO(e, t) {
        1 & e &&
          (C(0, "div", 10),
          C(1, "p"),
          I(2),
          se(3, "translate"),
          _(),
          Qe(4, "img", 11),
          _()),
          2 & e && (S(2), Z(ae(3, 1, "home.summaryTextTwo")));
      }
      function HO(e, t) {
        1 & e &&
          (C(0, "div", 12),
          C(1, "p"),
          I(2),
          se(3, "translate"),
          _(),
          Qe(4, "img", 13),
          _()),
          2 & e && (S(2), Z(ae(3, 1, "home.summaryTextThree")));
      }
      const BO = [
        { path: "", redirectTo: "main", pathMatch: "full" },
        { path: "main", component: DO },
        {
          path: "question",
          component: (() => {
            class e {
              constructor(n, r) {
                (this.questionService = n),
                  (this.data = r),
                  (this.name = ""),
                  (this.allQuestions = []),
                  (this.currentQuestion = 0),
                  (this.correctAnswer = 0),
                  (this.incorrectAnswer = 0),
                  (this.userSelection = []),
                  (this.message = "");
              }
              ngOnInit() {
                (this.name = localStorage.getItem("name")),
                  this.getAllQuetsions(),
                  this.data.currentMessage.subscribe((n) => (this.message = n));
              }
              getAllQuetsions() {
                this.questionService.getQuestionsJson().subscribe((n) => {
                  this.allQuestions = n;
                });
              }
              nextQuestion() {
                this.currentQuestion++;
              }
              getAnswer(n, r) {
                r.correct
                  ? (this.correctAnswer++,
                    (this.userSelection[this.currentQuestion] = r.text))
                  : (this.incorrectAnswer++,
                    (this.userSelection[this.currentQuestion] = r.text));
              }
              sendMessage() {
                this.data.changeMessage(
                  this.correctAnswer +
                    "," +
                    this.incorrectAnswer +
                    "," +
                    this.allQuestions.length +
                    "," +
                    this.userSelection
                );
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)(T(OD), T(nd));
              }),
              (e.ɵcmp = Xt({
                type: e,
                selectors: [["app-question-view"]],
                decls: 25,
                vars: 25,
                consts: [
                  [1, "contentQuestions"],
                  [1, "pre"],
                  [1, "questions"],
                  [4, "ngFor", "ngForOf"],
                  [1, "buttons"],
                  [1, "next", 3, "disabled", "click"],
                  ["routerLink", "/summary", 1, "summary", 3, "click"],
                  ["appChangeBg", "", 3, "isCorrect", "click"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (C(0, "div", 0),
                    C(1, "div", 1),
                    C(2, "h3"),
                    I(3),
                    se(4, "translate"),
                    _(),
                    C(5, "h4"),
                    I(6),
                    se(7, "translate"),
                    _(),
                    C(8, "p"),
                    I(9),
                    se(10, "translate"),
                    _(),
                    _(),
                    C(11, "div", 2),
                    C(12, "h3"),
                    I(13),
                    se(14, "translate"),
                    _(),
                    C(15, "h4"),
                    I(16),
                    _(),
                    jr(17, FO, 3, 2, "ul", 3),
                    _(),
                    C(18, "div", 4),
                    C(19, "button", 5),
                    zt("click", function () {
                      return r.nextQuestion();
                    }),
                    I(20),
                    se(21, "translate"),
                    _(),
                    C(22, "button", 6),
                    zt("click", function () {
                      return r.sendMessage();
                    }),
                    I(23),
                    se(24, "translate"),
                    _(),
                    _(),
                    _()),
                    2 & n &&
                      (S(3),
                      Z(ae(4, 13, "home.title")),
                      S(3),
                      $n(
                        "",
                        ae(7, 15, "home.hello"),
                        " ",
                        r.name,
                        " \u{1f44b}"
                      ),
                      S(3),
                      vl(
                        " ",
                        ae(10, 17, "home.question"),
                        " ",
                        r.currentQuestion + 1,
                        " z ",
                        r.allQuestions.length,
                        " "
                      ),
                      S(4),
                      $n(
                        "",
                        ae(14, 19, "home.questionNo"),
                        " ",
                        r.currentQuestion + 1,
                        ""
                      ),
                      S(3),
                      Z(
                        null == r.allQuestions[r.currentQuestion]
                          ? null
                          : r.allQuestions[r.currentQuestion].question
                      ),
                      S(1),
                      ze(
                        "ngForOf",
                        null == r.allQuestions[r.currentQuestion]
                          ? null
                          : r.allQuestions[r.currentQuestion].options
                      ),
                      S(2),
                      ze(
                        "disabled",
                        r.currentQuestion === r.allQuestions.length - 1
                      ),
                      S(1),
                      ve(" ", ae(21, 21, "home.next"), " "),
                      S(3),
                      ve(" ", ae(24, 23, "home.summary"), " "));
                },
                directives: [cc, NO, Yn],
                pipes: [ho],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:10px}.contentQuestions[_ngcontent-%COMP%]{width:850px;height:654px;max-width:1920px;max-height:1080px;position:absolute;top:120px;left:calc(50% - 425px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;display:flex;flex-direction:column;justify-content:space-around}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]{width:300px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:25px;text-decoration:underline}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:22px;font-weight:400}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{position:absolute;top:40px;right:60px;font-size:20px;font-style:italic}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{width:700px;height:350px;position:relative;left:calc(50% - 350px);display:flex;flex-direction:column;justify-content:space-between}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:20px;font-size:27px;text-align:center;text-decoration:underline}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding-left:20px;font-size:25px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px;list-style:none;font-size:20px;cursor:pointer;border:2px solid transparent}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{border-color:#083d36;border-radius:5px}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:70px;width:180px;font-size:21px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[disabled][_ngcontent-%COMP%]{opacity:.5}",
                ],
              })),
              e
            );
          })(),
        },
        {
          path: "response",
          component: (() => {
            class e {
              constructor(n, r) {
                (this.questionService = n),
                  (this.data = r),
                  (this.message = ""),
                  (this.answers = []),
                  (this.allQuestions = []),
                  (this.link = ""),
                  (this.userSelectionOne = ""),
                  (this.userSelectionTwo = ""),
                  (this.userSelectionThree = ""),
                  (this.userSelectionFour = ""),
                  (this.userSelectionFive = "");
              }
              ngOnInit() {
                this.getAllQuetsions(),
                  this.data.currentMessage.subscribe((n) => (this.message = n)),
                  (this.answers = this.message.split(",")),
                  (this.userSelectionOne = this.answers[3]),
                  (this.userSelectionTwo = this.answers[4]),
                  (this.userSelectionThree = this.answers[5]),
                  (this.userSelectionFour = this.answers[6]),
                  (this.userSelectionFive = this.answers[7]);
              }
              getAllQuetsions() {
                this.questionService.getQuestionsJson().subscribe((n) => {
                  this.allQuestions = n;
                });
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)(T(OD), T(nd));
              }),
              (e.ɵcmp = Xt({
                type: e,
                selectors: [["app-response-view"]],
                decls: 77,
                vars: 38,
                consts: [
                  [1, "contentResponse"],
                  [1, "questions"],
                  [1, "partOne"],
                  [1, "first"],
                  [1, "text"],
                  [3, "ngStyle"],
                  ["src", "./assets/pic/mr.jpg", "alt", ""],
                  [1, "second"],
                  ["src", "./assets/pic/relief.jpg", "alt", ""],
                  [1, "third"],
                  ["src", "./assets/pic/haczyk.jpg", "alt", ""],
                  [1, "partTwo"],
                  [1, "fourth"],
                  ["src", "./assets/pic/maskotka.jpeg", "alt", ""],
                  [1, "fifth"],
                  ["src", "./assets/pic/dywan.jpg", "alt", ""],
                ],
                template: function (n, r) {
                  1 & n &&
                    (C(0, "div", 0),
                    C(1, "h1"),
                    I(2),
                    se(3, "translate"),
                    _(),
                    C(4, "div", 1),
                    C(5, "div", 2),
                    C(6, "div", 3),
                    C(7, "div", 4),
                    C(8, "h2"),
                    I(9),
                    _(),
                    C(10, "ul"),
                    C(11, "li"),
                    I(12),
                    _(),
                    C(13, "li", 5),
                    I(14),
                    _(),
                    C(15, "li"),
                    I(16),
                    _(),
                    _(),
                    C(17, "p"),
                    I(18),
                    _(),
                    _(),
                    Qe(19, "img", 6),
                    _(),
                    C(20, "div", 7),
                    C(21, "div", 4),
                    C(22, "h2"),
                    I(23),
                    _(),
                    C(24, "ul"),
                    C(25, "li", 5),
                    I(26),
                    _(),
                    C(27, "li"),
                    I(28),
                    _(),
                    C(29, "li"),
                    I(30),
                    _(),
                    _(),
                    C(31, "p"),
                    I(32),
                    _(),
                    _(),
                    Qe(33, "img", 8),
                    _(),
                    C(34, "div", 9),
                    C(35, "div", 4),
                    C(36, "h2"),
                    I(37),
                    _(),
                    C(38, "ul"),
                    C(39, "li", 5),
                    I(40),
                    _(),
                    C(41, "li"),
                    I(42),
                    _(),
                    C(43, "li"),
                    I(44),
                    _(),
                    _(),
                    C(45, "p"),
                    I(46),
                    _(),
                    _(),
                    Qe(47, "img", 10),
                    _(),
                    _(),
                    C(48, "div", 11),
                    C(49, "div", 12),
                    C(50, "div", 4),
                    C(51, "h2"),
                    I(52),
                    _(),
                    C(53, "ul"),
                    C(54, "li"),
                    I(55),
                    _(),
                    C(56, "li"),
                    I(57),
                    _(),
                    C(58, "li", 5),
                    I(59),
                    _(),
                    _(),
                    C(60, "p"),
                    I(61),
                    _(),
                    _(),
                    Qe(62, "img", 13),
                    _(),
                    C(63, "div", 14),
                    C(64, "div", 4),
                    C(65, "h2"),
                    I(66),
                    _(),
                    C(67, "ul"),
                    C(68, "li"),
                    I(69),
                    _(),
                    C(70, "li"),
                    I(71),
                    _(),
                    C(72, "li", 5),
                    I(73),
                    _(),
                    _(),
                    C(74, "p"),
                    I(75),
                    _(),
                    _(),
                    Qe(76, "img", 15),
                    _(),
                    _(),
                    _(),
                    _()),
                    2 & n &&
                      (S(2),
                      Z(ae(3, 31, "home.checkAnswer")),
                      S(7),
                      Z(r.allQuestions[0].question),
                      S(3),
                      Z(r.allQuestions[0].options[0].text),
                      S(1),
                      ze("ngStyle", Gr(33, go)),
                      S(1),
                      ve(" ", r.allQuestions[0].options[1].text, " "),
                      S(2),
                      Z(r.allQuestions[0].options[2].text),
                      S(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionOne,
                        ""
                      ),
                      S(5),
                      Z(r.allQuestions[1].question),
                      S(2),
                      ze("ngStyle", Gr(34, go)),
                      S(1),
                      ve(" ", r.allQuestions[1].options[0].text, " "),
                      S(2),
                      Z(r.allQuestions[1].options[1].text),
                      S(2),
                      Z(r.allQuestions[1].options[2].text),
                      S(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionTwo,
                        ""
                      ),
                      S(5),
                      Z(r.allQuestions[2].question),
                      S(2),
                      ze("ngStyle", Gr(35, go)),
                      S(1),
                      ve(" ", r.allQuestions[2].options[0].text, " "),
                      S(2),
                      Z(r.allQuestions[2].options[1].text),
                      S(2),
                      Z(r.allQuestions[2].options[2].text),
                      S(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionThree,
                        ""
                      ),
                      S(6),
                      Z(r.allQuestions[3].question),
                      S(3),
                      Z(r.allQuestions[3].options[0].text),
                      S(2),
                      Z(r.allQuestions[3].options[1].text),
                      S(1),
                      ze("ngStyle", Gr(36, go)),
                      S(1),
                      ve(" ", r.allQuestions[3].options[2].text, " "),
                      S(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionFour,
                        ""
                      ),
                      S(5),
                      Z(r.allQuestions[4].question),
                      S(3),
                      Z(r.allQuestions[4].options[0].text),
                      S(2),
                      Z(r.allQuestions[4].options[1].text),
                      S(1),
                      ze("ngStyle", Gr(37, go)),
                      S(1),
                      ve(" ", r.allQuestions[4].options[2].text, " "),
                      S(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionFive,
                        ""
                      ));
                },
                directives: [By],
                pipes: [ho],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentResponse[_ngcontent-%COMP%]{width:1600px;height:810px;max-width:1920px;max-height:1080px;position:relative;top:100px;left:calc(50% - 800px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;text-align:center}.contentResponse[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:20px 10px 10px;font-size:27px;position:relative;text-decoration:underline;text-underline-offset:5px;top:3px;left:0}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{width:750px;padding:5px;display:flex;flex-direction:column;justify-content:space-between}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:10px;display:flex;flex-direction:row;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:470px;display:flex;flex-direction:column;justify-content:space-around;text-align:left}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:20px;padding:0 10px 10px 5px;line-height:30px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px 10px 10px 5px;font-size:17px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0 0 -20px;font-size:16px;line-height:25px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{padding-top:20px;height:180px;border-radius:5px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:280px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{justify-content:space-around}",
                ],
              })),
              e
            );
          })(),
        },
        {
          path: "summary",
          component: (() => {
            class e {
              constructor(n) {
                (this.data = n),
                  (this.message = ""),
                  (this.answers = []),
                  (this.correctAnswer = 0),
                  (this.incorrectAnswer = 0),
                  (this.allAnswer = 0),
                  (this.visible = 0),
                  (this.userSelectionOne = ""),
                  (this.userSelectionTwo = ""),
                  (this.userSelectionThree = ""),
                  (this.userSelectionFour = ""),
                  (this.userSelectionFive = "");
              }
              ngOnInit() {
                this.data.currentMessage.subscribe((n) => (this.message = n)),
                  (this.answers = this.message.split(",")),
                  (this.correctAnswer = Number(this.answers[0])),
                  (this.incorrectAnswer = Number(this.answers[1])),
                  (this.allAnswer = Number(this.answers[2])),
                  (this.userSelectionOne = this.answers[3]),
                  (this.userSelectionTwo = this.answers[4]),
                  (this.userSelectionThree = this.answers[5]),
                  (this.userSelectionFour = this.answers[6]),
                  (this.userSelectionFive = this.answers[7]),
                  (this.visible = this.correctAnswer / this.allAnswer);
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)(T(nd));
              }),
              (e.ɵcmp = Xt({
                type: e,
                selectors: [["app-summary-view"]],
                decls: 25,
                vars: 24,
                consts: [
                  ["change", "getScore()", 1, "contentSummary"],
                  [1, "text"],
                  [1, "summary"],
                  [1, "percent"],
                  ["class", "to50Percent", 4, "ngIf"],
                  ["class", "to80Percent", 4, "ngIf"],
                  ["class", "to100Percent", 4, "ngIf"],
                  ["routerLink", "/response"],
                  [1, "to50Percent"],
                  [
                    "src",
                    "./assets/pic/poplatane.jpg",
                    "alt",
                    "popl\u0105tane sznurki",
                  ],
                  [1, "to80Percent"],
                  [
                    "src",
                    "./assets/pic/prawie.jpg",
                    "alt",
                    "owieczka w koszyku",
                  ],
                  [1, "to100Percent"],
                  [
                    "src",
                    "./assets/pic/mistrz.jpg",
                    "alt",
                    "pszcz\xf3\u0142ka",
                  ],
                ],
                template: function (n, r) {
                  1 & n &&
                    (C(0, "div", 0),
                    C(1, "div", 1),
                    C(2, "div", 2),
                    C(3, "h2"),
                    I(4),
                    se(5, "translate"),
                    _(),
                    C(6, "h3"),
                    I(7),
                    se(8, "translate"),
                    _(),
                    C(9, "p"),
                    I(10),
                    se(11, "translate"),
                    _(),
                    C(12, "p"),
                    I(13),
                    se(14, "translate"),
                    _(),
                    C(15, "p"),
                    I(16),
                    se(17, "translate"),
                    _(),
                    _(),
                    C(18, "div", 3),
                    jr(19, jO, 5, 3, "div", 4),
                    jr(20, VO, 5, 3, "div", 5),
                    jr(21, HO, 5, 3, "div", 6),
                    _(),
                    _(),
                    C(22, "button", 7),
                    I(23),
                    se(24, "translate"),
                    _(),
                    _()),
                    2 & n &&
                      (S(4),
                      Z(ae(5, 12, "home.congratulations")),
                      S(3),
                      Z(ae(8, 14, "home.result")),
                      S(3),
                      $n(
                        "",
                        ae(11, 16, "home.correct"),
                        " ",
                        r.correctAnswer,
                        ""
                      ),
                      S(3),
                      $n(
                        "",
                        ae(14, 18, "home.incorrect"),
                        "",
                        r.incorrectAnswer,
                        ""
                      ),
                      S(3),
                      $n(
                        "",
                        ae(17, 20, "home.percent"),
                        " ",
                        100 * r.visible,
                        "%"
                      ),
                      S(3),
                      ze("ngIf", r.visible <= 0.5),
                      S(1),
                      ze("ngIf", r.visible > 0.5 && r.visible <= 0.8),
                      S(1),
                      ze("ngIf", r.visible > 0.8),
                      S(2),
                      Z(ae(24, 22, "home.seeResult")));
                },
                directives: [jy, Yn],
                pipes: [ho],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentSummary[_ngcontent-%COMP%]{width:1200px;height:700px;max-width:1920px;max-height:1080px;position:absolute;top:120px;left:calc(50% - 600px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;display:flex;flex-direction:column;justify-content:space-around;text-align:center}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]{position:relative;top:100px;height:200px;width:500px;display:flex;flex-direction:column;justify-content:space-between}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{line-height:40px;padding:20px;font-size:30px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding:10px;font-size:25px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:10px;font-size:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]{margin-top:20px;position:relative;top:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:550px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:35px;margin-bottom:10px;font-size:25px;font-weight:700}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:20px;width:320px;border-radius:7px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   .to50Percent[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:30px;width:450px}.contentSummary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:relative;top:0;left:calc(50% - 90px);height:70px;width:220px;font-size:21px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}",
                ],
              })),
              e
            );
          })(),
        },
      ];
      let UO = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ft({ type: e })),
          (e.ɵinj = vt({ imports: [[lD.forRoot(BO)], lD] })),
          e
        );
      })();
      function $O(e, t) {
        if ((1 & e && (C(0, "option", 6), I(1), _()), 2 & e)) {
          const n = t.$implicit,
            r = pl();
          ze("value", n)("selected", n === r.translate.currentLang),
            S(1),
            ve(" ", n, " ");
        }
      }
      let zO = (() => {
          class e {
            constructor(n) {
              (this.translate = n),
                n.addLangs(["pl", "en"]),
                n.setDefaultLang("pl"),
                (this.logoPath = "./assets/pic/logo.jpg");
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(ni));
            }),
            (e.ɵcmp = Xt({
              type: e,
              selectors: [["app-header"]],
              decls: 12,
              vars: 8,
              consts: [
                [1, "contentHeader"],
                [
                  "alt",
                  "logo Pyszki",
                  "routerLink",
                  "/main",
                  1,
                  "logo",
                  3,
                  "src",
                ],
                ["routerLink", "/main", 1, "start"],
                [3, "change"],
                ["langSelect", ""],
                [3, "value", "selected", 4, "ngFor", "ngForOf"],
                [3, "value", "selected"],
              ],
              template: function (n, r) {
                if (1 & n) {
                  const i = fl();
                  C(0, "div", 0),
                    Qe(1, "img", 1),
                    C(2, "button", 2),
                    I(3),
                    se(4, "translate"),
                    _(),
                    C(5, "div"),
                    C(6, "label"),
                    I(7),
                    se(8, "translate"),
                    C(9, "select", 3, 4),
                    zt("change", function () {
                      Ua(i);
                      const s = (function Np(e) {
                        return ar(
                          (function ZC() {
                            return N.lFrame.contextLView;
                          })(),
                          20 + e
                        );
                      })(10);
                      return r.translate.use(s.value);
                    }),
                    jr(11, $O, 2, 3, "option", 5),
                    _(),
                    _(),
                    _(),
                    _();
                }
                2 & n &&
                  (S(1),
                  gl("src", r.logoPath, Yo),
                  S(2),
                  ve(" ", ae(4, 4, "home.button"), " "),
                  S(4),
                  ve(" ", ae(8, 6, "home.chooseLanguage"), " "),
                  S(4),
                  ze("ngForOf", r.translate.getLangs()));
              },
              directives: [Yn, cc],
              pipes: [ho],
              styles: [
                ".contentHeader[_ngcontent-%COMP%]{margin:0;padding:0;position:absolute;top:0px;left:0px;width:100vw;max-width:1920px;height:80px}.contentHeader[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{width:120px;position:absolute;top:20px;left:70px;cursor:pointer}.contentHeader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:50px;width:100px;position:absolute;top:25px;right:340px;font-size:21px;color:#074430;background-color:#bee5e0;cursor:pointer;border-radius:7px;border:1px dotted #083d36}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:10px;width:240px;height:29px;background-color:#bee5e0;position:absolute;top:25px;right:60px;border-radius:5px;color:#083d36;border:1px dotted #083d36}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:215px;position:relative;top:-2px;font-size:21px;font-family:Arial,sans-serif}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{position:relative;right:-25px;height:35px;width:45px;font-size:18px;color:#083d36;border:1px solid #083d36;border-radius:3px}",
              ],
            })),
            e
          );
        })(),
        qO = (() => {
          class e {
            constructor(n) {
              (this.translate = n),
                n.addLangs(["pl", "en"]),
                n.setDefaultLang("pl");
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(ni));
            }),
            (e.ɵcmp = Xt({
              type: e,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              template: function (n, r) {
                1 & n && (Qe(0, "app-header"), Qe(1, "router-outlet"));
              },
              directives: [zO, Fc],
              styles: [""],
            })),
            e
          );
        })();
      class GO {
        constructor(t, n = "/assets/i18n/", r = ".json") {
          (this.http = t), (this.prefix = n), (this.suffix = r);
        }
        getTranslation(t) {
          return this.http.get(`${this.prefix}${t}${this.suffix}`);
        }
      }
      function WO(e) {
        return new GO(e);
      }
      let QO = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ft({ type: e, bootstrap: [qO] })),
          (e.ɵinj = vt({
            providers: [],
            imports: [
              [
                jx,
                UO,
                RO,
                yO.forRoot({
                  defaultLanguage: "pl",
                  loader: { provide: fo, useFactory: WO, deps: [Yc] },
                }),
              ],
            ],
          })),
          e
        );
      })();
      (function gT() {
        cy = !1;
      })(),
        kx()
          .bootstrapModule(QO)
          .catch((e) => console.error(e));
    },
  },
  (X) => {
    X((X.s = 126));
  },
]);
