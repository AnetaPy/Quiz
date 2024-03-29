"use strict";
(self.webpackChunkquiz = self.webpackChunkquiz || []).push([
  [179],
  {
    126: () => {
      function X(e) {
        return "function" == typeof e;
      }
      function ro(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const mi = ro(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function oo(e, t) {
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
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (X(r))
              try {
                r();
              } catch (i) {
                t = i instanceof mi ? i.errors : [i];
              }
            const { _teardowns: o } = this;
            if (o) {
              this._teardowns = null;
              for (const i of o)
                try {
                  pd(i);
                } catch (s) {
                  (t = null != t ? t : []),
                    s instanceof mi ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new mi(t);
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
          n === t ? (this._parentage = null) : Array.isArray(n) && oo(n, t);
        }
        remove(t) {
          const { _teardowns: n } = this;
          n && oo(n, t), t instanceof at && t._removeParent(this);
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
      const In = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        yi = {
          setTimeout(...e) {
            const { delegate: t } = yi;
            return ((null == t ? void 0 : t.setTimeout) || setTimeout)(...e);
          },
          clearTimeout(e) {
            const { delegate: t } = yi;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function gd(e) {
        yi.setTimeout(() => {
          const { onUnhandledError: t } = In;
          if (!t) throw e;
          t(e);
        });
      }
      function vi() {}
      const NC = ha("C", void 0, void 0);
      function ha(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let An = null;
      function Ci(e) {
        if (In.useDeprecatedSynchronousErrorHandling) {
          const t = !An;
          if ((t && (An = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = An;
            if (((An = null), n)) throw r;
          }
        } else e();
      }
      class pa extends at {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), hd(t) && t.add(this))
              : (this.destination = jC);
        }
        static create(t, n, r) {
          return new _i(t, n, r);
        }
        next(t) {
          this.isStopped
            ? ma(
                (function kC(e) {
                  return ha("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? ma(
                (function FC(e) {
                  return ha("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? ma(NC, this)
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
      class _i extends pa {
        constructor(t, n, r) {
          let o;
          if ((super(), X(t))) o = t;
          else if (t) {
            let i;
            ({ next: o, error: n, complete: r } = t),
              this && In.useDeprecatedNextContext
                ? ((i = Object.create(t)),
                  (i.unsubscribe = () => this.unsubscribe()))
                : (i = t),
              (o = null == o ? void 0 : o.bind(i)),
              (n = null == n ? void 0 : n.bind(i)),
              (r = null == r ? void 0 : r.bind(i));
          }
          this.destination = {
            next: o ? ga(o) : vi,
            error: ga(null != n ? n : md),
            complete: r ? ga(r) : vi,
          };
        }
      }
      function ga(e, t) {
        return (...n) => {
          try {
            e(...n);
          } catch (r) {
            In.useDeprecatedSynchronousErrorHandling
              ? (function LC(e) {
                  In.useDeprecatedSynchronousErrorHandling &&
                    An &&
                    ((An.errorThrown = !0), (An.error = e));
                })(r)
              : gd(r);
          }
        };
      }
      function md(e) {
        throw e;
      }
      function ma(e, t) {
        const { onStoppedNotification: n } = In;
        n && yi.setTimeout(() => n(e, t));
      }
      const jC = { closed: !0, next: vi, error: md, complete: vi },
        ya =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Rn(e) {
        return e;
      }
      let oe = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function HC(e) {
              return (
                (e && e instanceof pa) ||
                ((function VC(e) {
                  return e && X(e.next) && X(e.error) && X(e.complete);
                })(e) &&
                  hd(e))
              );
            })(n)
              ? n
              : new _i(n, r, o);
            return (
              Ci(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
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
            return new (r = vd(r))((o, i) => {
              const s = new _i({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
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
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = vd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function vd(e) {
        var t;
        return null !== (t = null != e ? e : In.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const BC = ro(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let At = (() => {
        class e extends oe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Cd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new BC();
          }
          next(n) {
            Ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice();
                for (const o of r) o.next(n);
              }
            });
          }
          error(n) {
            Ci(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Ci(() => {
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
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o ? fd : (i.push(n), new at(() => oo(i, n)));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new oe();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Cd(t, n)), e;
      })();
      class Cd extends At {
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
      function _d(e) {
        return X(null == e ? void 0 : e.lift);
      }
      function Te(e) {
        return (t) => {
          if (_d(t))
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
      class Oe extends pa {
        constructor(t, n, r, o, i) {
          super(t),
            (this.onFinalize = i),
            (this._next = n
              ? function (s) {
                  try {
                    n(s);
                  } catch (a) {
                    t.error(a);
                  }
                }
              : super._next),
            (this._error = o
              ? function (s) {
                  try {
                    o(s);
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
      function W(e, t) {
        return Te((n, r) => {
          let o = 0;
          n.subscribe(
            new Oe(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Nn(e) {
        return this instanceof Nn ? ((this.v = e), this) : new Nn(e);
      }
      function zC(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, m) {
                i.push([f, h, p, m]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof Nn
                ? Promise.resolve(f.value.v).then(l, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function l(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function qC(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Md(e) {
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
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Ed = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function bd(e) {
        return X(null == e ? void 0 : e.then);
      }
      function Pd(e) {
        return X(e[ya]);
      }
      function Od(e) {
        return (
          Symbol.asyncIterator &&
          X(null == e ? void 0 : e[Symbol.asyncIterator])
        );
      }
      function xd(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Sd = (function QC() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Td(e) {
        return X(null == e ? void 0 : e[Sd]);
      }
      function Id(e) {
        return zC(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Nn(n.read());
              if (o) return yield Nn(void 0);
              yield yield Nn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Ad(e) {
        return X(null == e ? void 0 : e.getReader);
      }
      function Rt(e) {
        if (e instanceof oe) return e;
        if (null != e) {
          if (Pd(e))
            return (function WC(e) {
              return new oe((t) => {
                const n = e[ya]();
                if (X(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Ed(e))
            return (function KC(e) {
              return new oe((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (bd(e))
            return (function ZC(e) {
              return new oe((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, gd);
              });
            })(e);
          if (Od(e)) return Rd(e);
          if (Td(e))
            return (function JC(e) {
              return new oe((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Ad(e))
            return (function YC(e) {
              return Rd(Id(e));
            })(e);
        }
        throw xd(e);
      }
      function Rd(e) {
        return new oe((t) => {
          (function XC(e, t) {
            var n, r, o, i;
            return (function UC(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
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
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = qC(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Kt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function xe(e, t, n = 1 / 0) {
        return X(t)
          ? xe((r, o) => W((i, s) => t(r, i, o, s))(Rt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Te((r, o) =>
              (function e_(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (m) => (l < r ? p(m) : u.push(m)),
                  p = (m) => {
                    i && t.next(m), l++;
                    let y = !1;
                    Rt(n(m, c++)).subscribe(
                      new Oe(
                        t,
                        (v) => {
                          null == o || o(v), i ? h(v) : t.next(v);
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
                    new Oe(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function io(e = 1 / 0) {
        return xe(Rn, e);
      }
      const Zt = new oe((e) => e.complete());
      function Ca(e) {
        return e[e.length - 1];
      }
      function Nd(e) {
        return X(Ca(e)) ? e.pop() : void 0;
      }
      function so(e) {
        return (function n_(e) {
          return e && X(e.schedule);
        })(Ca(e))
          ? e.pop()
          : void 0;
      }
      function Fd(e, t = 0) {
        return Te((n, r) => {
          n.subscribe(
            new Oe(
              r,
              (o) => Kt(r, e, () => r.next(o), t),
              () => Kt(r, e, () => r.complete(), t),
              (o) => Kt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function kd(e, t = 0) {
        return Te((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Ld(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new oe((n) => {
          Kt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Kt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ie(e, t) {
        return t
          ? (function l_(e, t) {
              if (null != e) {
                if (Pd(e))
                  return (function o_(e, t) {
                    return Rt(e).pipe(kd(t), Fd(t));
                  })(e, t);
                if (Ed(e))
                  return (function s_(e, t) {
                    return new oe((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (bd(e))
                  return (function i_(e, t) {
                    return Rt(e).pipe(kd(t), Fd(t));
                  })(e, t);
                if (Od(e)) return Ld(e, t);
                if (Td(e))
                  return (function a_(e, t) {
                    return new oe((n) => {
                      let r;
                      return (
                        Kt(n, t, () => {
                          (r = e[Sd]()),
                            Kt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => X(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Ad(e))
                  return (function u_(e, t) {
                    return Ld(Id(e), t);
                  })(e, t);
              }
              throw xd(e);
            })(e, t)
          : Rt(e);
      }
      function pn(e) {
        return e <= 0
          ? () => Zt
          : Te((t, n) => {
              let r = 0;
              t.subscribe(
                new Oe(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function jd(e = {}) {
        const {
          connector: t = () => new At(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
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
          return Te((m, y) => {
            l++, !d && !c && f();
            const v = (u = null != u ? u : t());
            y.add(() => {
              l--, 0 === l && !d && !c && (a = _a(p, o));
            }),
              v.subscribe(y),
              s ||
                ((s = new _i({
                  next: (g) => v.next(g),
                  error: (g) => {
                    (d = !0), f(), (a = _a(h, n, g)), v.error(g);
                  },
                  complete: () => {
                    (c = !0), f(), (a = _a(h, r)), v.complete();
                  },
                })),
                Ie(m).subscribe(s));
          })(i);
        };
      }
      function _a(e, t, ...n) {
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
      const d_ = ee({ __forward_ref__: ee });
      function Ma(e) {
        return (
          (e.__forward_ref__ = Ma),
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
          e.hasOwnProperty(d_) &&
          e.__forward_ref__ === Ma
        );
      }
      class K extends Error {
        constructor(t, n) {
          super(
            (function Ea(e, t) {
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
      function Di(e, t) {
        const n = t ? ` in ${t}` : "";
        throw new K(-201, `No provider for ${Ve(e)} found${n}`);
      }
      function Je(e, t) {
        null == e &&
          (function ie(e, t, n, r) {
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
      function ba(e) {
        return Hd(e, wi) || Hd(e, Ud);
      }
      function Hd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Bd(e) {
        return e && (e.hasOwnProperty(Pa) || e.hasOwnProperty(v_))
          ? e[Pa]
          : null;
      }
      const wi = ee({ ɵprov: ee }),
        Pa = ee({ ɵinj: ee }),
        Ud = ee({ ngInjectableDef: ee }),
        v_ = ee({ ngInjectorDef: ee });
      var L = (() => (
        ((L = L || {})[(L.Default = 0)] = "Default"),
        (L[(L.Host = 1)] = "Host"),
        (L[(L.Self = 2)] = "Self"),
        (L[(L.SkipSelf = 4)] = "SkipSelf"),
        (L[(L.Optional = 8)] = "Optional"),
        L
      ))();
      let Oa;
      function gn(e) {
        const t = Oa;
        return (Oa = e), t;
      }
      function $d(e, t, n) {
        const r = ba(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & L.Optional
          ? null
          : void 0 !== t
          ? t
          : void Di(J(e), "Injector");
      }
      function mn(e) {
        return { toString: e }.toString();
      }
      var Ct = (() => (
          ((Ct = Ct || {})[(Ct.OnPush = 0)] = "OnPush"),
          (Ct[(Ct.Default = 1)] = "Default"),
          Ct
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
      const __ = "undefined" != typeof globalThis && globalThis,
        D_ = "undefined" != typeof window && window,
        w_ =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Y = __ || ("undefined" != typeof global && global) || D_ || w_,
        nr = {},
        te = [],
        Mi = ee({ ɵcmp: ee }),
        xa = ee({ ɵdir: ee }),
        Sa = ee({ ɵpipe: ee }),
        zd = ee({ ɵmod: ee }),
        Yt = ee({ ɵfac: ee }),
        ao = ee({ __NG_ELEMENT_ID__: ee });
      let M_ = 0;
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
              onPush: e.changeDetection === Ct.OnPush,
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
            o = e.directives,
            i = e.features,
            s = e.pipes;
          return (
            (r.id += M_++),
            (r.inputs = Wd(e.inputs, n)),
            (r.outputs = Wd(e.outputs)),
            i && i.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(qd)
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
            return e[xa] || null;
          })(e)
        );
      }
      function Gd(e) {
        return (function Fn(e) {
          return e[Sa] || null;
        })(e);
      }
      const Qd = {};
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
          return null != e.id && (Qd[e.id] = e.type), t;
        });
      }
      function Wd(e, t) {
        if (null == e) return nr;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const Ae = Xt;
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
        return e[Mi] || null;
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
      function Dt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Aa(e) {
        return 0 != (8 & e.flags);
      }
      function Oi(e) {
        return 2 == (2 & e.flags);
      }
      function xi(e) {
        return 1 == (1 & e.flags);
      }
      function wt(e) {
        return null !== e.template;
      }
      function S_(e) {
        return 0 != (512 & e[2]);
      }
      function Vn(e, t) {
        return e.hasOwnProperty(Yt) ? e[Yt] : null;
      }
      class A_ {
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
        return e.type.prototype.ngOnChanges && (e.setInput = N_), R_;
      }
      function R_() {
        const e = Yd(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === nr) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function N_(e, t, n, r) {
        const o =
            Yd(e) ||
            (function F_(e, t) {
              return (e[Jd] = t);
            })(e, { previous: nr, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new A_(u && u.currentValue, t, s === nr)), (e[r] = t);
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
      function C() {
        return N.lFrame.lView;
      }
      function Q() {
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
      function Ti() {
        return N.isInCheckNoChangesMode;
      }
      function Ii(e) {
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
      function Y_(e, t) {
        const n = N.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), qa(t);
      }
      function qa(e) {
        N.lFrame.currentDirectiveIndex = e;
      }
      function af() {
        return N.lFrame.currentQueryIndex;
      }
      function Qa(e) {
        N.lFrame.currentQueryIndex = e;
      }
      function eD(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function uf(e, t, n) {
        if (n & L.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & L.Host ||
              ((o = eD(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (N.lFrame = lf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ai(e) {
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
      function Ri() {
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
      function Cn(e) {
        N.lFrame.selectedIndex = e;
      }
      function de() {
        const e = N.lFrame;
        return Va(e.tView, e.selectedIndex);
      }
      function Ni(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
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
      function Fi(e, t, n) {
        hf(e, t, 3, n);
      }
      function ki(e, t, n, r) {
        (3 & e[2]) === n && hf(e, t, n, r);
      }
      function Wa(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function hf(e, t, n, r) {
        const i = null != r ? r : -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (lD(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function lD(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class ho {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Li(e, t, n) {
        const r = ce(e);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if ("number" == typeof i) {
            if (0 !== i) break;
            o++;
            const s = n[o++],
              a = n[o++],
              u = n[o++];
            r ? e.setAttribute(t, a, u, s) : t.setAttributeNS(s, a, u);
          } else {
            const s = i,
              a = n[++o];
            Za(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              o++;
          }
        }
        return o;
      }
      function pf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Za(e) {
        return 64 === e.charCodeAt(0);
      }
      function ji(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  gf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function gf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function mf(e) {
        return -1 !== e;
      }
      function lr(e) {
        return 32767 & e;
      }
      function cr(e, t) {
        let n = (function pD(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Ja = !0;
      function Vi(e) {
        const t = Ja;
        return (Ja = e), t;
      }
      let gD = 0;
      function go(e, t) {
        const n = Xa(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Ya(r.data, e),
          Ya(t, null),
          Ya(r.blueprint, null));
        const o = Hi(e, t),
          i = e.injectorIndex;
        if (mf(o)) {
          const s = lr(o),
            a = cr(o, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
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
      function Hi(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          const i = o[1],
            s = i.type;
          if (((r = 2 === s ? i.declTNode : 1 === s ? o[6] : null), null === r))
            return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Bi(e, t, n) {
        !(function mD(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(ao) && (r = n[ao]),
            null == r && (r = n[ao] = gD++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function Cf(e, t, n) {
        if (n & L.Optional) return e;
        Di(t, "NodeInjector");
      }
      function _f(e, t, n, r) {
        if (
          (n & L.Optional && void 0 === r && (r = null),
          0 == (n & (L.Self | L.Host)))
        ) {
          const o = e[9],
            i = gn(void 0);
          try {
            return o ? o.get(t, r, n & L.Optional) : $d(t, r, n & L.Optional);
          } finally {
            gn(i);
          }
        }
        return Cf(r, t, n);
      }
      function Df(e, t, n, r = L.Default, o) {
        if (null !== e) {
          const i = (function _D(e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(ao) ? e[ao] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : vD) : t;
          })(n);
          if ("function" == typeof i) {
            if (!uf(t, e, r)) return r & L.Host ? Cf(o, n, r) : _f(t, n, r, o);
            try {
              const s = i(r);
              if (null != s || r & L.Optional) return s;
              Di(n);
            } finally {
              ff();
            }
          } else if ("number" == typeof i) {
            let s = null,
              a = Xa(e, t),
              u = -1,
              l = r & L.Host ? t[16][6] : null;
            for (
              (-1 === a || r & L.SkipSelf) &&
              ((u = -1 === a ? Hi(e, t) : t[a + 8]),
              -1 !== u && Ef(r, !1)
                ? ((s = t[1]), (a = lr(u)), (t = cr(u, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1];
              if (Mf(i, a, c.data)) {
                const d = CD(a, t, n, s, r, l);
                if (d !== wf) return d;
              }
              (u = t[a + 8]),
                -1 !== u && Ef(r, t[1].data[a + 8] === l) && Mf(i, a, t)
                  ? ((s = c), (a = lr(u)), (t = cr(u, t)))
                  : (a = -1);
            }
          }
        }
        return _f(t, n, r, o);
      }
      const wf = {};
      function vD() {
        return new dr(we(), C());
      }
      function CD(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = Ui(
            a,
            s,
            n,
            null == r ? Oi(a) && Ja : r != s && 0 != (3 & a.type),
            o & L.Host && i === a
          );
        return null !== c ? mo(t, s, c, a) : wf;
      }
      function Ui(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          a = 1048575 & i,
          u = e.directiveStart,
          c = i >> 20,
          f = o ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < u && n === p) || (h >= u && p.type === n)) return h;
        }
        if (o) {
          const h = s[u];
          if (h && wt(h) && h.type === n) return u;
        }
        return null;
      }
      function mo(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function cD(e) {
            return e instanceof ho;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function f_(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new K(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(Ve(i[n]));
          const a = Vi(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? gn(s.injectImpl) : null;
          uf(e, r, L.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function uD(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Zd(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && gn(u), Vi(a), (s.resolving = !1), ff();
          }
        }
        return o;
      }
      function Mf(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Ef(e, t) {
        return !(e & L.Self || (e & L.Host && t));
      }
      class dr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Df(this._tNode, this._lView, t, r, n);
        }
      }
      function $i(e) {
        return mn(() => {
          const t = e.prototype.constructor,
            n = t[Yt] || eu(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[Yt] || eu(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
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
      function yo(e) {
        return (function yD(e, t) {
          if ("class" === t) return e.classes;
          if ("style" === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let o = 0;
            for (; o < r; ) {
              const i = n[o];
              if (pf(i)) break;
              if (0 === i) o += 2;
              else if ("number" == typeof i)
                for (o++; o < r && "string" == typeof n[o]; ) o++;
              else {
                if (i === t) return n[o + 1];
                o += 2;
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
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
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
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
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
      const wD = new B("AnalyzeForEntryComponents");
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
      function Pf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function zi(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Do = {},
        iu = "__NG_DI_FLAG__",
        Gi = "ngTempTokenPath",
        AD = /\n/gm,
        If = "__source",
        ND = ee({ provide: String, useValue: ee });
      let wo;
      function Af(e) {
        const t = wo;
        return (wo = e), t;
      }
      function FD(e, t = L.Default) {
        if (void 0 === wo) throw new K(203, "");
        return null === wo
          ? $d(e, void 0, t)
          : wo.get(e, t & L.Optional ? null : void 0, t);
      }
      function b(e, t = L.Default) {
        return (
          (function C_() {
            return Oa;
          })() || FD
        )(j(e), t);
      }
      function su(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = j(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new K(900, "");
            let o,
              i = L.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = kD(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(b(o, i));
          } else t.push(b(r));
        }
        return t;
      }
      function Mo(e, t) {
        return (e[iu] = t), (e.prototype[iu] = t), e;
      }
      function kD(e) {
        return e[iu];
      }
      const Eo = Mo(
          gr("Inject", (e) => ({ token: e })),
          -1
        ),
        Vt = Mo(gr("Optional"), 8),
        yr = Mo(gr("SkipSelf"), 4);
      class Bf {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const ow =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        iw =
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
      function Yi(e) {
        const t = (function xo() {
          const e = C();
          return e && e[12];
        })();
        return t
          ? t.sanitize(ye.URL, e) || ""
          : (function Po(e, t) {
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
          ? (function Dn(e) {
              return e instanceof Bf
                ? e.changingThisBreaksApplicationSecurity
                : e;
            })(e)
          : (function Zi(e) {
              return (e = String(e)).match(ow) || e.match(iw)
                ? e
                : "unsafe:" + e;
            })(F(e));
      }
      const Jf = "__ngContext__";
      function ke(e, t) {
        e[Jf] = t;
      }
      function gu(e) {
        const t = (function So(e) {
          return e[Jf] || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function yu(e) {
        return e.ngOriginalError;
      }
      function xw(e, ...t) {
        e.error(...t);
      }
      class _r {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function Ow(e) {
              return (e && e.ngErrorLogger) || xw;
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
      function Cu(e, t) {
        return undefined(e, t);
      }
      function To(e) {
        const t = e[3];
        return Dt(t) ? t[3] : t;
      }
      function _u(e) {
        return ah(e[13]);
      }
      function Du(e) {
        return ah(e[4]);
      }
      function ah(e) {
        for (; null !== e && !Dt(e); ) e = e[4];
        return e;
      }
      function wr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Dt(r) ? (i = r) : kt(r) && ((s = !0), (r = r[0]));
          const a = me(r);
          0 === e && null !== n
            ? null == o
              ? hh(t, n, a)
              : Bn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Bn(t, n, a, o || null, !0)
            : 2 === e
            ? (function _h(e, t, n) {
                const r = Xi(e, t);
                r &&
                  (function Jw(e, t, n, r) {
                    ce(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function eM(e, t, n, r, o) {
                const i = n[7];
                i !== me(n) && wr(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Io(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Mu(e, t, n) {
        if (ce(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function V_(e) {
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
          o = t[3];
        1024 & t[2] && ((t[2] &= -1025), Ba(o, -1)), n.splice(r, 1);
      }
      function Eu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && lh(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = zi(e, 10 + t);
          !(function $w(e, t) {
            Io(e, t, t[V], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function ch(e, t) {
        if (!(256 & t[2])) {
          const n = t[V];
          ce(n) && n.destroyNode && Io(e, t, n, 3, null, null),
            (function Gw(e) {
              let t = e[13];
              if (!t) return bu(e[1], e);
              for (; t; ) {
                let n = null;
                if (kt(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    kt(t) && bu(t[1], t), (t = t[3]);
                  null === t && (t = e), kt(t) && bu(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function bu(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function Zw(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ho)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Kw(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : me(t[s]),
                      u = r[(o = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(n[i], u, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) r[i]();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && ce(t[V]) && t[V].destroy();
          const n = t[17];
          if (null !== n && Dt(t[3])) {
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
            const o = e.data[r.directiveStart].encapsulation;
            if (o === Nt.None || o === Nt.Emulated) return null;
          }
          return dt(r, n);
        })(e, t.parent, n);
      }
      function Bn(e, t, n, r, o) {
        ce(e) ? e.insertBefore(t, n, r, o) : t.insertBefore(n, r, o);
      }
      function hh(e, t, n) {
        ce(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function ph(e, t, n, r, o) {
        null !== r ? Bn(e, t, n, r, o) : hh(e, t, n);
      }
      function Xi(e, t) {
        return ce(e) ? e.parentNode(t) : t.parentNode;
      }
      let yh = function mh(e, t, n) {
        return 40 & e.type ? dt(e, n) : null;
      };
      function es(e, t, n, r) {
        const o = dh(e, r, t),
          i = t[V],
          a = (function gh(e, t, n) {
            return yh(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) ph(i, o, n[u], a, !1);
          else ph(i, o, n, a, !1);
      }
      function ts(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return dt(t, e);
          if (4 & n) return Ou(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return ts(e, r);
            {
              const o = e[t.index];
              return Dt(o) ? Ou(-1, o) : me(o);
            }
          }
          if (32 & n) return Cu(t, e)() || me(e[t.index]);
          {
            const r = Ch(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : ts(To(e[16]), r)
              : ts(e, t.next);
          }
        }
        return null;
      }
      function Ch(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function Ou(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return ts(r, o);
        }
        return t[7];
      }
      function xu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && ke(me(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) xu(e, t, n.child, r, o, i, !1), wr(t, e, o, a, i);
            else if (32 & u) {
              const l = Cu(n, r);
              let c;
              for (; (c = l()); ) wr(t, e, o, c, i);
              wr(t, e, o, a, i);
            } else 16 & u ? Dh(e, t, r, n, o, i) : wr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Io(e, t, n, r, o, i) {
        xu(n, r, e.firstChild, t, o, i, !1);
      }
      function Dh(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) wr(t, e, o, u[l], i);
        else xu(e, t, u, s[3], o, i, !0);
      }
      function wh(e, t, n) {
        ce(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function Su(e, t, n) {
        ce(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function Mh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Eh = "ng-template";
      function nM(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== Mh(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function bh(e) {
        return 4 === e.type && e.value !== Eh;
      }
      function rM(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Eh);
      }
      function oM(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function aM(e) {
            for (let t = 0; t < e.length; t++) if (pf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !rM(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (Mt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!nM(e.attrs, l, n)) {
                    if (Mt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = iM(8 & r ? "class" : u, o, bh(e), n);
                if (-1 === d) {
                  if (Mt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Mh(h, l, 0)) || (2 & r && l !== f)) {
                    if (Mt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Mt(r) && !Mt(u)) return !1;
            if (s && Mt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return Mt(r) || s;
      }
      function Mt(e) {
        return 0 == (1 & e);
      }
      function iM(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function uM(e, t) {
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
      function Ph(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (oM(e, t[r], n)) return !0;
        return !1;
      }
      function Oh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function cM(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Mt(s) && ((t += Oh(i, o)), (o = "")),
              (r = s),
              (i = i || !Mt(r));
          n++;
        }
        return "" !== o && (t += Oh(i, o)), t;
      }
      const k = {};
      function P(e) {
        xh(Q(), C(), Ue() + e, Ti());
      }
      function xh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && Fi(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && ki(t, i, 0, n);
          }
        Cn(n);
      }
      function Vh(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Qa(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ao(e, t, n, r, o, i, s, a, u, l) {
        const c = t.blueprint.slice();
        return (
          (c[0] = o),
          (c[2] = 140 | r),
          tf(c),
          (c[3] = c[15] = e),
          (c[8] = n),
          (c[10] = s || (e && e[10])),
          (c[V] = a || (e && e[V])),
          (c[12] = u || (e && e[12]) || null),
          (c[9] = l || (e && e[9]) || null),
          (c[6] = i),
          (c[16] = 2 == t.type ? e[16] : c),
          c
        );
      }
      function Mr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Bu(e, t, n, r, o) {
            const i = rf(),
              s = $a(),
              u = (e.data[t] = (function xM(e, t, n, r, o, i) {
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
                  value: o,
                  attrs: i,
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
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            );
          })(e, t, n, r, o)),
            (function J_() {
              return N.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function fo() {
            const e = N.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Lt(i, !0), i;
      }
      function Er(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Ro(e, t, n) {
        Ai(t);
        try {
          const r = e.viewQuery;
          null !== r && Zu(1, r, n);
          const o = e.template;
          null !== o && Hh(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Vh(e, t),
            e.staticViewQueries && Zu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function bM(e, t) {
              for (let n = 0; n < t.length; n++) GM(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Ri();
        }
      }
      function br(e, t, n, r) {
        const o = t[2];
        if (256 == (256 & o)) return;
        Ai(t);
        const i = Ti();
        try {
          tf(t),
            (function of(e) {
              return (N.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && Hh(e, t, n, 2, r);
          const s = 3 == (3 & o);
          if (!i)
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Fi(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && ki(t, l, 0, null), Wa(t, 0);
            }
          if (
            ((function zM(e) {
              for (let t = _u(e); null !== t; t = Du(t)) {
                if (!t[2]) continue;
                const n = t[9];
                for (let r = 0; r < n.length; r++) {
                  const o = n[r],
                    i = o[3];
                  0 == (1024 & o[2]) && Ba(i, 1), (o[2] |= 1024);
                }
              }
            })(t),
            (function $M(e) {
              for (let t = _u(e); null !== t; t = Du(t))
                for (let n = 10; n < t.length; n++) {
                  const r = t[n],
                    o = r[1];
                  Ha(r) && br(o, r, o.template, r[8]);
                }
            })(t),
            null !== e.contentQueries && Vh(e, t),
            !i)
          )
            if (s) {
              const l = e.contentCheckHooks;
              null !== l && Fi(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && ki(t, l, 1), Wa(t, 1);
            }
          !(function MM(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const o = n[r];
                  if (o < 0) Cn(~o);
                  else {
                    const i = o,
                      s = n[++r],
                      a = n[++r];
                    Y_(s, i), a(2, t[i]);
                  }
                }
              } finally {
                Cn(-1);
              }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function EM(e, t) {
              for (let n = 0; n < t.length; n++) qM(e, t[n]);
            })(t, a);
          const u = e.viewQuery;
          if ((null !== u && Zu(2, u, r), !i))
            if (s) {
              const l = e.viewCheckHooks;
              null !== l && Fi(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && ki(t, l, 2), Wa(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            i || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), Ba(t[3], -1));
        } finally {
          Ri();
        }
      }
      function PM(e, t, n, r) {
        const o = t[10],
          i = !Ti(),
          s = ef(t);
        try {
          i && !s && o.begin && o.begin(), s && Ro(e, t, r), br(e, t, n, r);
        } finally {
          i && !s && o.end && o.end();
        }
      }
      function Hh(e, t, n, r, o) {
        const i = Ue(),
          s = 2 & r;
        try {
          Cn(-1), s && t.length > 20 && xh(e, t, 20, Ti()), n(r, o);
        } finally {
          Cn(i);
        }
      }
      function Uu(e, t, n) {
        !nf() ||
          ((function FM(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || go(n, t), ke(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = wt(u);
              l && HM(t, n, u);
              const c = mo(t, e, a, n);
              ke(c, t),
                null !== s && BM(0, a - o, c, u, 0, s),
                l && (Xe(n.index, t)[8] = c);
            }
          })(e, t, n, dt(n, t)),
          128 == (128 & n.flags) &&
            (function kM(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                s = n.index,
                a = (function X_() {
                  return N.lFrame.currentDirectiveIndex;
                })();
              try {
                Cn(s);
                for (let u = r; u < o; u++) {
                  const l = e.data[u],
                    c = t[u];
                  qa(u),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Kh(l, c);
                }
              } finally {
                Cn(-1), qa(a);
              }
            })(e, t, n));
      }
      function $u(e, t, n = dt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Uh(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = is(
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
      function is(e, t, n, r, o, i, s, a, u, l) {
        const c = 20 + r,
          d = c + o,
          f = (function OM(e, t) {
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
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function qh(e, t, n, r) {
        const o = tp(t);
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && np(e).push(r, o.length - 1));
      }
      function Gh(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function nt(e, t, n, r, o, i, s, a) {
        const u = dt(t, n);
        let c,
          l = t.inputs;
        !a && null != l && (c = l[r])
          ? (ip(e, n, c, r, o),
            Oi(t) &&
              (function IM(e, t) {
                const n = Xe(t, e);
                16 & n[2] || (n[2] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function TM(e) {
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
            (o = null != s ? s(o, t.value || "", r) : o),
            ce(i)
              ? i.setProperty(u, r, o)
              : Za(r) || (u.setProperty ? u.setProperty(r, o) : (u[r] = o)));
      }
      function zu(e, t, n, r) {
        let o = !1;
        if (nf()) {
          const i = (function LM(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  Ph(n, s.selectors, !1) &&
                    (o || (o = []),
                    Bi(go(n, t), e, s.type),
                    wt(s) ? (Zh(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), Jh(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = Er(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = ji(n.mergedAttrs, d.hostAttrs)),
                Yh(e, n, t, l, d),
                VM(l, d, s),
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
            !(function SM(e, t) {
              const r = t.directiveEnd,
                o = e.data,
                i = t.attrs,
                s = [];
              let a = null,
                u = null;
              for (let l = t.directiveStart; l < r; l++) {
                const c = o[l],
                  d = c.inputs,
                  f = null === i || bh(t) ? null : UM(d, i);
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
            (function jM(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i)
                    throw new K(
                      -301,
                      `Export of name '${t[o + 1]}' not found!`
                    );
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = ji(n.mergedAttrs, n.attrs)), o;
      }
      function Wh(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function NM(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, o, s);
        }
      }
      function Kh(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Zh(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function VM(e, t, n) {
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
      function Yh(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Vn(o.type)),
          s = new ho(i, wt(o), null);
        (e.blueprint[r] = s),
          (n[r] = s),
          Wh(e, t, 0, r, Er(e, n, o.hostVars, k), o);
      }
      function HM(e, t, n) {
        const r = dt(t, e),
          o = Uh(n),
          i = e[10],
          s = ss(
            e,
            Ao(
              e,
              o,
              null,
              n.onPush ? 64 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function BM(e, t, n, r, o, i) {
        const s = i[t];
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
      function UM(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Xh(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function qM(e, t) {
        const n = Xe(t, e);
        if (Ha(n)) {
          const r = n[1];
          80 & n[2] ? br(r, n, r.template, n[8]) : n[5] > 0 && Gu(n);
        }
      }
      function Gu(e) {
        for (let r = _u(e); null !== r; r = Du(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (1024 & i[2]) {
              const s = i[1];
              br(s, i, s.template, i[8]);
            } else i[5] > 0 && Gu(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Xe(n[r], e);
            Ha(o) && o[5] > 0 && Gu(o);
          }
      }
      function GM(e, t) {
        const n = Xe(t, e),
          r = n[1];
        (function QM(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Ro(r, n, n[8]);
      }
      function ss(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Qu(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = To(e);
          if (S_(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Ku(e, t, n) {
        const r = t[10];
        r.begin && r.begin();
        try {
          br(e, t, e.template, n);
        } catch (o) {
          throw (op(t, o), o);
        } finally {
          r.end && r.end();
        }
      }
      function ep(e) {
        !(function Wu(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = gu(n),
              o = r[1];
            PM(o, r, o.template, n);
          }
        })(e[8]);
      }
      function Zu(e, t, n) {
        Qa(0), t(e, n);
      }
      const JM = (() => Promise.resolve(null))();
      function tp(e) {
        return e[7] || (e[7] = []);
      }
      function np(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function op(e, t) {
        const n = e[9],
          r = n ? n.get(_r, null) : null;
        r && r.handleError(t);
      }
      function ip(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function rn(e, t, n) {
        const r = (function Si(e, t) {
          return me(t[e]);
        })(t, e);
        !(function uh(e, t, n) {
          ce(e) ? e.setValue(t, n) : (t.textContent = n);
        })(e[V], r, n);
      }
      function as(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = wa(o, a))
              : 2 == i && (r = wa(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      const Ju = new B("INJECTOR", -1);
      class sp {
        get(t, n = Do) {
          if (n === Do) {
            const r = new Error(`NullInjectorError: No provider for ${J(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Yu = new B("Set Injector scope."),
        No = {},
        e0 = {};
      let Xu;
      function ap() {
        return void 0 === Xu && (Xu = new sp()), Xu;
      }
      function up(e, t = null, n = null, r) {
        const o = lp(e, t, n, r);
        return o._resolveInjectorDefTypes(), o;
      }
      function lp(e, t = null, n = null, r) {
        return new t0(e, n, t || ap(), r);
      }
      class t0 {
        constructor(t, n, r, o = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const i = [];
          n && jt(n, (a) => this.processProvider(a, t, n)),
            jt([t], (a) => this.processInjectorType(a, [], i)),
            this.records.set(Ju, Pr(void 0, this));
          const s = this.records.get(Yu);
          (this.scope = null != s ? s.value : null),
            (this.source = o || ("object" == typeof t ? null : J(t)));
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
        get(t, n = Do, r = L.Default) {
          this.assertNotDestroyed();
          const o = Af(this),
            i = gn(void 0);
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
                  })(t) && ba(t);
                (a = u && this.injectableDefInScope(u) ? Pr(el(t), No) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & L.Self ? ap() : this.parent).get(
              t,
              (n = r & L.Optional && n === Do ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Gi] = s[Gi] || []).unshift(J(t)), o)) throw s;
              return (function LD(e, t, n, r) {
                const o = e[Gi];
                throw (
                  (t[If] && o.unshift(t[If]),
                  (e.message = (function jD(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let o = J(t);
                    if (Array.isArray(t)) o = t.map(J).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : J(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      AD,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Gi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            gn(i), Af(o);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((r, o) => t.push(J(o))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new K(205, "");
        }
        processInjectorType(t, n, r) {
          if (!(t = j(t))) return !1;
          let o = Bd(t);
          const i = (null == o && t.ngModule) || void 0,
            s = void 0 === i ? t : i,
            a = -1 !== r.indexOf(s);
          if ((void 0 !== i && (o = Bd(i)), null == o)) return !1;
          if (null != o.imports && !a) {
            let c;
            r.push(s);
            try {
              jt(o.imports, (d) => {
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
          this.records.set(s, Pr(u, No));
          const l = o.providers;
          if (null != l && !a) {
            const c = t;
            jt(l, (d) => this.processProvider(d, c, l));
          }
          return void 0 !== i && void 0 !== t.providers;
        }
        processProvider(t, n, r) {
          let o = Or((t = j(t))) ? t : j(t && t.provide);
          const i = (function r0(e, t, n) {
            return dp(e)
              ? Pr(void 0, e.useValue)
              : Pr(
                  (function cp(e, t, n) {
                    let r;
                    if (Or(e)) {
                      const o = j(e);
                      return Vn(o) || el(o);
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
                      r = () => b(j(e.useExisting));
                    else {
                      const o = j(e && (e.useClass || e.provide));
                      if (
                        !(function u0(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Vn(o) || el(o);
                      r = () => new o(...su(e.deps));
                    }
                    return r;
                  })(e),
                  No
                );
          })(t);
          if (Or(t) || !0 !== t.multi) this.records.get(o);
          else {
            let s = this.records.get(o);
            s ||
              ((s = Pr(void 0, No, !0)),
              (s.factory = () => su(s.multi)),
              this.records.set(o, s)),
              (o = t),
              s.multi.push(t);
          }
          this.records.set(o, i);
        }
        hydrate(t, n) {
          return (
            n.value === No && ((n.value = e0), (n.value = n.factory())),
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
        const t = ba(e),
          n = null !== t ? t.factory : Vn(e);
        if (null !== n) return n;
        if (e instanceof B) throw new K(204, "");
        if (e instanceof Function)
          return (function n0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function _o(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new K(204, ""))
              );
            const n = (function m_(e) {
              const t = e && (e[wi] || e[Ud]);
              if (t) {
                const n = (function y_(e) {
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
      function Pr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function dp(e) {
        return null !== e && "object" == typeof e && ND in e;
      }
      function Or(e) {
        return "function" == typeof e;
      }
      let Le = (() => {
        class e {
          static create(n, r) {
            var o;
            if (Array.isArray(n)) return up({ name: "" }, r, n, "");
            {
              const i = null !== (o = n.name) && void 0 !== o ? o : "";
              return up({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Do),
          (e.NULL = new sp()),
          (e.ɵprov = R({ token: e, providedIn: "any", factory: () => b(Ju) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function v0(e, t) {
        Ni(gu(e)[1], we());
      }
      let us = null;
      function xr() {
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
      function Fo(e) {
        return (
          !!ol(e) && (Array.isArray(e) || (!(e instanceof Map) && xr() in e))
        );
      }
      function ol(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function $t(e, t, n) {
        return (e[t] = n);
      }
      function je(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Un(e, t, n, r) {
        const o = je(e, t, n);
        return je(e, t + 1, r) || o;
      }
      function Tr(e, t, n, r) {
        return je(e, ur(), n) ? t + F(n) + r : k;
      }
      function Ar(e, t, n, r, o, i, s, a) {
        const l = (function ls(e, t, n, r, o) {
          const i = Un(e, t, n, r);
          return je(e, t + 2, o) || i;
        })(e, en(), n, o, s);
        return tn(3), l ? t + F(n) + r + F(o) + i + F(s) + a : k;
      }
      function jr(e, t, n, r, o, i, s, a) {
        const u = C(),
          l = Q(),
          c = e + 20,
          d = l.firstCreatePass
            ? (function S0(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = Mr(t, e, 4, s || null, vn(l, a));
                zu(t, n, c, vn(l, u)), Ni(t, c);
                const d = (c.tViews = is(
                  2,
                  c,
                  r,
                  o,
                  i,
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
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        Lt(d, !1);
        const f = u[V].createComment("");
        es(l, u, f, d),
          ke(f, u),
          ss(u, (u[c] = Xh(f, u, f, d))),
          xi(d) && Uu(l, u, d),
          null != s && $u(u, d, a);
      }
      function O(e, t = L.Default) {
        const n = C();
        return null === n ? b(e, t) : Df(we(), n, j(e), t);
      }
      function cl() {
        throw new Error("invalid");
      }
      function ze(e, t, n) {
        const r = C();
        return je(r, ur(), t) && nt(Q(), de(), r, e, t, r[V], n, !1), ze;
      }
      function dl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        ip(e, n, t.inputs[s], s, r);
      }
      function _(e, t, n, r) {
        const o = C(),
          i = Q(),
          s = 20 + e,
          a = o[V],
          u = (o[s] = Mu(
            a,
            t,
            (function aD() {
              return N.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function Z0(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = Mr(t, e, 2, o, vn(a, i));
                return (
                  zu(t, n, l, vn(a, s)),
                  null !== l.attrs && as(l, l.attrs, !1),
                  null !== l.mergedAttrs && as(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        Lt(l, !0);
        const c = l.mergedAttrs;
        null !== c && Li(a, u, c);
        const d = l.classes;
        null !== d && Su(a, u, d);
        const f = l.styles;
        null !== f && wh(a, u, f),
          64 != (64 & l.flags) && es(i, o, u, l),
          0 ===
            (function q_() {
              return N.lFrame.elementDepthCount;
            })() && ke(u, o),
          (function G_() {
            N.lFrame.elementDepthCount++;
          })(),
          xi(l) &&
            (Uu(i, o, l),
            (function Bh(e, t, n) {
              if (Aa(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, l, o)),
          null !== r && $u(o, l);
      }
      function D() {
        let e = we();
        $a()
          ? (function za() {
              N.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Lt(e, !1));
        const t = e;
        !(function Q_() {
          N.lFrame.elementDepthCount--;
        })();
        const n = Q();
        n.firstCreatePass && (Ni(n, e), Aa(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function fD(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            dl(n, t, C(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function hD(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            dl(n, t, C(), t.stylesWithoutHost, !1);
      }
      function We(e, t, n, r) {
        _(e, t, n, r), D();
      }
      function fl() {
        return C();
      }
      function ds(e) {
        return !!e && "function" == typeof e.then;
      }
      const Wp = function Qp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function zt(e, t, n, r) {
        const o = C(),
          i = Q(),
          s = we();
        return (
          (function Zp(e, t, n, r, o, i, s, a) {
            const u = xi(r),
              c = e.firstCreatePass && np(e),
              d = t[8],
              f = tp(t);
            let h = !0;
            if (3 & r.type || a) {
              const y = dt(r, t),
                v = a ? a(y) : y,
                g = f.length,
                E = a ? (I) => a(me(I[r.index])) : r.index;
              if (ce(n)) {
                let I = null;
                if (
                  (!a &&
                    u &&
                    (I = (function X0(e, t, n, r) {
                      const o = e.cleanup;
                      if (null != o)
                        for (let i = 0; i < o.length - 1; i += 2) {
                          const s = o[i];
                          if (s === n && o[i + 1] === r) {
                            const a = t[7],
                              u = o[i + 2];
                            return a.length > u ? a[u] : null;
                          }
                          "string" == typeof s && (i += 2);
                        }
                      return null;
                    })(e, t, o, r.index)),
                  null !== I)
                )
                  ((I.__ngLastListenerFn__ || I).__ngNextListenerFn__ = i),
                    (I.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = hl(r, t, d, i, !1);
                  const G = n.listen(v, o, i);
                  f.push(i, G), c && c.push(o, E, g, g + 1);
                }
              } else
                (i = hl(r, t, d, i, !0)),
                  v.addEventListener(o, i, s),
                  f.push(i),
                  c && c.push(o, E, g, s);
            } else i = hl(r, t, d, i, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[o])) {
              const y = m.length;
              if (y)
                for (let v = 0; v < y; v += 2) {
                  const st = t[m[v]][m[v + 1]].subscribe(i),
                    tr = f.length;
                  f.push(i, st), c && c.push(o, r.index, tr, -(tr + 1));
                }
            }
          })(i, o, o[V], s, e, t, !!n, r),
          zt
        );
      }
      function Jp(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return op(e, o), !1;
        }
      }
      function hl(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          const a = 2 & e.flags ? Xe(e.index, t) : t;
          0 == (32 & t[2]) && Qu(a);
          let u = Jp(t, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Jp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function pl(e = 1) {
        return (function tD(e) {
          return (N.lFrame.contextLView = (function nD(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, N.lFrame.contextLView))[8];
        })(e);
      }
      function gl(e, t, n) {
        return ml(e, "", t, "", n), gl;
      }
      function ml(e, t, n, r, o) {
        const i = C(),
          s = Tr(i, t, n, r);
        return s !== k && nt(Q(), de(), i, e, s, i[V], o, !1), ml;
      }
      function x(e, t = "") {
        const n = C(),
          r = Q(),
          o = e + 20,
          i = r.firstCreatePass ? Mr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function wu(e, t) {
            return ce(e) ? e.createText(t) : e.createTextNode(t);
          })(n[V], t));
        es(r, n, s, i), Lt(i, !1);
      }
      function Z(e) {
        return ve("", e, ""), Z;
      }
      function ve(e, t, n) {
        const r = C(),
          o = Tr(r, e, t, n);
        return o !== k && rn(r, Ue(), o), ve;
      }
      function $n(e, t, n, r, o) {
        const i = C(),
          s = (function Ir(e, t, n, r, o, i) {
            const a = Un(e, en(), n, o);
            return tn(2), a ? t + F(n) + r + F(o) + i : k;
          })(i, e, t, n, r, o);
        return s !== k && rn(i, Ue(), s), $n;
      }
      function vl(e, t, n, r, o, i, s) {
        const a = C(),
          u = Ar(a, e, t, n, r, o, i, s);
        return u !== k && rn(a, Ue(), u), vl;
      }
      const zn = void 0;
      var HE = [
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
        function VE(e) {
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
      var M = (() => (
        ((M = M || {})[(M.LocaleId = 0)] = "LocaleId"),
        (M[(M.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (M[(M.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (M[(M.DaysFormat = 3)] = "DaysFormat"),
        (M[(M.DaysStandalone = 4)] = "DaysStandalone"),
        (M[(M.MonthsFormat = 5)] = "MonthsFormat"),
        (M[(M.MonthsStandalone = 6)] = "MonthsStandalone"),
        (M[(M.Eras = 7)] = "Eras"),
        (M[(M.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (M[(M.WeekendRange = 9)] = "WeekendRange"),
        (M[(M.DateFormat = 10)] = "DateFormat"),
        (M[(M.TimeFormat = 11)] = "TimeFormat"),
        (M[(M.DateTimeFormat = 12)] = "DateTimeFormat"),
        (M[(M.NumberSymbols = 13)] = "NumberSymbols"),
        (M[(M.NumberFormats = 14)] = "NumberFormats"),
        (M[(M.CurrencyCode = 15)] = "CurrencyCode"),
        (M[(M.CurrencySymbol = 16)] = "CurrencySymbol"),
        (M[(M.CurrencyName = 17)] = "CurrencyName"),
        (M[(M.Currencies = 18)] = "Currencies"),
        (M[(M.Directionality = 19)] = "Directionality"),
        (M[(M.PluralCase = 20)] = "PluralCase"),
        (M[(M.ExtraData = 21)] = "ExtraData"),
        M
      ))();
      const hs = "en-US";
      let Hg = hs;
      class dm {}
      class $b {
        resolveComponentFactory(t) {
          throw (function Ub(e) {
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
        return (e.NULL = new $b()), e;
      })();
      function zb() {
        return zr(we(), C());
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
        return (e.__NG_ELEMENT_ID__ = zb), e;
      })();
      function qb(e) {
        return e instanceof on ? e.nativeElement : e;
      }
      class hm {}
      let Uo = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function Qb() {
                const e = C(),
                  n = Xe(we().index, e);
                return (function Gb(e) {
                  return e[V];
                })(kt(n) ? n : e);
              })()),
            e
          );
        })(),
        Wb = (() => {
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
      const Kb = new vs("13.2.0"),
        bl = {};
      function Cs(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(me(i)), Dt(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild;
              null !== l && Cs(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) Cs(e, t, n.child, r);
          else if (32 & s) {
            const a = Cu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Ch(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = To(t[16]);
              Cs(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class $o {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Cs(n, t, n.firstChild, []);
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
            if (Dt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Eu(t, r), zi(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          ch(this._lView[1], this._lView);
        }
        onDestroy(t) {
          qh(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Qu(this._cdRefInjectingView || this._lView);
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
          !(function KM(e, t, n) {
            Ii(!0);
            try {
              Ku(e, t, n);
            } finally {
              Ii(!1);
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
              Io(e, t, t[V], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new K(902, "");
          this._appRef = t;
        }
      }
      class Zb extends $o {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          ep(this._view);
        }
        checkNoChanges() {
          !(function ZM(e) {
            Ii(!0);
            try {
              ep(e);
            } finally {
              Ii(!1);
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
          return new Pl(n, this.ngModule);
        }
      }
      function gm(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      const Yb = new B("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => nh,
      });
      class Pl extends dm {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function dM(e) {
              return e.map(cM).join(",");
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
        create(t, n, r, o) {
          const i = (o = o || this.ngModule)
              ? (function Xb(e, t) {
                  return {
                    get: (n, r, o) => {
                      const i = e.get(n, bl, o);
                      return i !== bl || r === bl ? i : t.get(n, r, o);
                    },
                  };
                })(t, o.injector)
              : t,
            s = i.get(hm, Xd),
            a = i.get(Wb, null),
            u = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function zh(e, t, n) {
                  if (ce(e)) return e.selectRootElement(t, n === Nt.ShadowDom);
                  let r = "string" == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ""), r;
                })(u, r, this.componentDef.encapsulation)
              : Mu(
                  s.createRenderer(null, this.componentDef),
                  l,
                  (function Jb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(l)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function wp(e, t) {
              return {
                components: [],
                scheduler: e || nh,
                clean: JM,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = is(0, null, null, 1, 0, null, null, null, null, null),
            p = Ao(null, h, f, d, null, null, s, u, a, i);
          let m, y;
          Ai(p);
          try {
            const v = (function _p(e, t, n, r, o, i) {
              const s = n[1];
              n[20] = e;
              const u = Mr(s, 20, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (as(u, l, !0),
                null !== e &&
                  (Li(o, e, l),
                  null !== u.classes && Su(o, e, u.classes),
                  null !== u.styles && wh(o, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = Ao(
                  n,
                  Uh(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  u,
                  r,
                  c,
                  i || null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Bi(go(u, n), s, t.type), Zh(s, u), Jh(u, n.length, 1)),
                ss(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, s, u);
            if (c)
              if (r) Li(u, c, ["ng-version", Kb.full]);
              else {
                const { attrs: g, classes: E } = (function fM(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!Mt(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                g && Li(u, c, g), E && E.length > 0 && Su(u, c, E.join(" "));
              }
            if (((y = Va(h, 20)), void 0 !== n)) {
              const g = (y.projection = []);
              for (let E = 0; E < this.ngContentSelectors.length; E++) {
                const I = n[E];
                g.push(null != I ? Array.from(I) : null);
              }
            }
            (m = (function Dp(e, t, n, r, o) {
              const i = n[1],
                s = (function RM(e, t, n) {
                  const r = we();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Yh(e, r, t, Er(e, t, 1, null), n));
                  const o = mo(t, e, r.directiveStart, r);
                  ke(o, t);
                  const i = dt(r, t);
                  return i && ke(i, t), o;
                })(i, n, t);
              if (
                (r.components.push(s),
                (e[8] = s),
                o && o.forEach((u) => u(s, t)),
                t.contentQueries)
              ) {
                const u = we();
                t.contentQueries(1, s, u.directiveStart);
              }
              const a = we();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Cn(a.index),
                  Wh(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Kh(t, s)),
                s
              );
            })(v, this.componentDef, p, f, [v0])),
              Ro(h, p, null);
          } finally {
            Ri();
          }
          return new tP(this.componentType, m, zr(y, p), p, y);
        }
      }
      class tP extends class Bb {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Zb(o)),
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
      class Cm extends sn {
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
      class Ol extends mm {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== ut(t) &&
              (function rP(e) {
                const t = new Set();
                !(function n(r) {
                  const o = ut(r, !0),
                    i = o.id;
                  null !== i &&
                    ((function ym(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${J(
                            t
                          )} vs ${J(t.name)}`
                        );
                    })(i, qr.get(i), r),
                    qr.set(i, r));
                  const s = Bt(o.imports);
                  for (const a of s) t.has(a) || (t.add(a), n(a));
                })(e);
              })(t);
        }
        create(t) {
          return new Cm(this.moduleType, t);
        }
      }
      function Gr(e, t, n) {
        const r = Be() + e,
          o = C();
        return o[r] === k
          ? $t(o, r, n ? t.call(n) : t())
          : (function ko(e, t) {
              return e[t];
            })(o, r);
      }
      function _m(e, t, n, r, o, i) {
        const s = t + n;
        return je(e, s, o)
          ? $t(e, s + 1, i ? r.call(i, o) : r(o))
          : (function zo(e, t) {
              const n = e[t];
              return n === k ? void 0 : n;
            })(e, s + 1);
      }
      function se(e, t) {
        const n = Q();
        let r;
        const o = e + 20;
        n.firstCreatePass
          ? ((r = (function hP(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[o] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(o, r.onDestroy))
          : (r = n.data[o]);
        const i = r.factory || (r.factory = Vn(r.type)),
          s = gn(O);
        try {
          const a = Vi(!1),
            u = i();
          return (
            Vi(a),
            (function T0(e, t, n, r) {
              n >= e.data.length &&
                ((e.data[n] = null), (e.blueprint[n] = null)),
                (t[n] = r);
            })(n, C(), o, u),
            u
          );
        } finally {
          gn(s);
        }
      }
      function ae(e, t, n) {
        const r = e + 20,
          o = C(),
          i = ar(o, r);
        return (function qo(e, t) {
          return e[1].data[t].pure;
        })(o, r)
          ? _m(o, Be(), t, i.transform, n, i)
          : i.transform(n);
      }
      function xl(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const pe = class vP extends At {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          var o, i, s;
          let a = t,
            u = n || (() => null),
            l = r;
          if (t && "object" == typeof t) {
            const d = t;
            (a = null === (o = d.next) || void 0 === o ? void 0 : o.bind(d)),
              (u = null === (i = d.error) || void 0 === i ? void 0 : i.bind(d)),
              (l =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d));
          }
          this.__isAsync && ((u = xl(u)), a && (a = xl(a)), l && (l = xl(l)));
          const c = super.subscribe({ next: a, error: u, complete: l });
          return t instanceof at && t.add(c), c;
        }
      };
      function CP() {
        return this._results[xr()]();
      }
      class Sl {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = xr(),
            r = Sl.prototype;
          r[n] || (r[n] = CP);
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
          const o = ft(t);
          (this._changesDetected = !(function MD(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
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
        return (e.__NG_ELEMENT_ID__ = wP), e;
      })();
      const _P = an,
        DP = class extends _P {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = Ao(
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
            const i = this._declarationLView[19];
            return (
              null !== i && (r[19] = i.createEmbeddedView(n)),
              Ro(n, r, t),
              new $o(r)
            );
          }
        };
      function wP() {
        return _s(we(), C());
      }
      function _s(e, t) {
        return 4 & e.type ? new DP(t, e, zr(e, t)) : null;
      }
      let xt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = MP), e;
      })();
      function MP() {
        return Om(we(), C());
      }
      const EP = xt,
        bm = class extends EP {
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
            const t = Hi(this._hostTNode, this._hostLView);
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
            const n = Pm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            const o = t.createEmbeddedView(n || {});
            return this.insert(o, r), o;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Co(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.ngModuleRef);
            }
            const u = s ? t : new Pl(Ne(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule && l) {
              const d = l.get(sn, null);
              d && (i = d);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function z_(e) {
                return Dt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new bm(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function Qw(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Pf(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function Ww(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(o, r, s, i);
            const a = Ou(i, s),
              u = r[V],
              l = Xi(u, s[7]);
            return (
              null !== l &&
                (function zw(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Io(e, r, n, 1, o, i);
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              Pf(Tl(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Pm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Eu(this._lContainer, n);
            r && (zi(Tl(this._lContainer), n), ch(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Eu(this._lContainer, n);
            return r && null != zi(Tl(this._lContainer), n) ? new $o(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t;
          }
        };
      function Pm(e) {
        return e[8];
      }
      function Tl(e) {
        return e[8] || (e[8] = []);
      }
      function Om(e, t) {
        let n;
        const r = t[e.index];
        if (Dt(r)) n = r;
        else {
          let o;
          if (8 & e.type) o = me(r);
          else {
            const i = t[V];
            o = i.createComment("");
            const s = dt(e, t);
            Bn(
              i,
              Xi(i, s),
              o,
              (function Yw(e, t) {
                return ce(e) ? e.nextSibling(t) : t.nextSibling;
              })(i, s),
              !1
            );
          }
          (t[e.index] = n = Xh(r, t, o, e)), ss(t, n);
        }
        return new bm(n, e, t);
      }
      class Il {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Il(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Al {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Al(o);
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
      class xm {
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
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
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
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, OP(n, i)),
                this.matchTNodeWithReadOption(t, n, Ui(n, t, i, !1, !1));
            }
          else
            r === an
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Ui(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === on || o === xt || (o === an && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = Ui(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
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
      function OP(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function SP(e, t, n, r) {
        return -1 === n
          ? (function xP(e, t) {
              return 11 & e.type ? zr(e, t) : 4 & e.type ? _s(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function TP(e, t, n) {
              return n === on
                ? zr(t, e)
                : n === an
                ? _s(t, e)
                : n === xt
                ? Om(t, e)
                : void 0;
            })(e, t, r)
          : mo(e, e[1], n, t);
      }
      function Sm(e, t, n, r) {
        const o = t[19].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = [];
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u];
            a.push(l < 0 ? null : SP(t, i[l], s[u + 1], n.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Fl(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = Sm(e, t, o, n);
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const l = i[a + 1],
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
      function Ds(e) {
        const t = C(),
          n = Q(),
          r = af();
        Qa(r + 1);
        const o = Rm(n, r);
        if (e.dirty && ef(t) === (2 == (2 & o.metadata.flags))) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? Fl(n, t, r, []) : Sm(n, t, o, r);
            e.reset(i, qb), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Tm(e, t, n) {
        const r = Q();
        r.firstCreatePass &&
          ((function Am(e, t, n) {
            null === e.queries && (e.queries = new Rl()),
              e.queries.track(new Nl(t, n));
          })(r, new xm(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function Im(e, t, n) {
            const r = new Sl(4 == (4 & n));
            qh(e, t, r, r.destroy),
              null === t[19] && (t[19] = new Al()),
              t[19].queries.push(new Il(r));
          })(r, C(), t);
      }
      function Rm(e, t) {
        return e.queries.getByIndex(t);
      }
      function bs(...e) {}
      const Ps = new B("Application Initializer");
      let Wr = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = bs),
              (this.reject = bs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (ds(i)) n.push(i);
                else if (Wp(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(Ps, 8));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Qo = new B("AppId"),
        JP = {
          provide: Qo,
          useFactory: function ZP() {
            return `${Ul()}${Ul()}${Ul()}`;
          },
          deps: [],
        };
      function Ul() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Zm = new B("Platform Initializer"),
        Os = new B("Platform ID"),
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
      const En = new B("LocaleId"),
        Xm = new B("DefaultCurrencyCode");
      class YP {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let xs = (() => {
        class e {
          compileModuleSync(n) {
            return new Ol(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Bt(ut(n).declarations).reduce((s, a) => {
                const u = Ne(a);
                return u && s.push(new Pl(u)), s;
              }, []);
            return new YP(r, i);
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
      const eO = (() => Promise.resolve(0))();
      function $l(e) {
        "undefined" == typeof Zone
          ? eO.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class be {
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
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function tO() {
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
            (function oO(e) {
              const t = () => {
                !(function rO(e) {
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
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return ey(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      ty(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return ey(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), ty(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          ql(e),
                          zl(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return (
            "undefined" != typeof Zone &&
            !0 === Zone.current.get("isAngularZone")
          );
        }
        static assertInAngularZone() {
          if (!be.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (be.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, nO, bs, bs);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const nO = {};
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
      class iO {
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
        runTask(t, n, r, o) {
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
                      be.assertNotInAngularZone(),
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
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(be));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ny = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), Ql.addToWindow(this);
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
              return Ql.findTestabilityInTree(this, n, r);
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
      class sO {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null;
        }
      }
      let St,
        Ql = new sO();
      const ry = new B("AllowMultipleToken");
      class oy {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function iy(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new B(r);
        return (i = []) => {
          let s = sy();
          if (!s || s.injector.get(ry, !1))
            if (e) e(n.concat(i).concat({ provide: o, useValue: !0 }));
            else {
              const a = n
                .concat(i)
                .concat(
                  { provide: o, useValue: !0 },
                  { provide: Yu, useValue: "platform" }
                );
              !(function cO(e) {
                if (St && !St.destroyed && !St.injector.get(ry, !1))
                  throw new K(400, "");
                St = e.get(ay);
                const t = e.get(Zm, null);
                t && t.forEach((n) => n());
              })(Le.create({ providers: a, name: r }));
            }
          return (function dO(e) {
            const t = sy();
            if (!t) throw new K(401, "");
            return t;
          })();
        };
      }
      function sy() {
        return St && !St.destroyed ? St : null;
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
            const a = (function fO(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new iO()
                      : ("zone.js" === e ? void 0 : e) ||
                        new be({
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
              u = [{ provide: be, useValue: a }];
            return a.run(() => {
              const l = Le.create({
                  providers: u,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(l),
                d = c.injector.get(_r, null);
              if (!d) throw new K(402, "");
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    Wl(this._modules, c), f.unsubscribe();
                  });
                }),
                (function hO(e, t, n) {
                  try {
                    const r = n();
                    return ds(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(Wr);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function qE(e) {
                          Je(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Hg = e.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(En, hs) || hs),
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
            const o = uy({}, r);
            return (function uO(e, t, n) {
              const r = new Ol(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Wo);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
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
            return new (n || e)(b(Le));
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
      let Wo = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._componentFactoryResolver = i),
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
            const a = new oe((l) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    l.next(this._stable), l.complete();
                  });
              }),
              u = new oe((l) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    be.assertNotInAngularZone(),
                      $l(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), l.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  be.assertInAngularZone(),
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
            this.isStable = (function c_(...e) {
              const t = so(e),
                n = (function r_(e, t) {
                  return "number" == typeof Ca(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Rt(r[0])
                  : io(n)(Ie(r, t))
                : Zt;
            })(a, u.pipe(jd()));
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new K(405, "");
            let o;
            (o =
              n instanceof dm
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const i = (function lO(e) {
                return e.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(sn),
              a = o.create(Le.NULL, [], r || o.selector, i),
              u = a.location.nativeElement,
              l = a.injector.get(Gl, null),
              c = l && a.injector.get(ny);
            return (
              l && c && c.registerApplication(u, l),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  Wl(this.components, a),
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
            Wl(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(Jm, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
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
            return new (n || e)(b(be), b(Le), b(_r), b($r), b(Wr));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Wl(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let cy = !0,
        Ss = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = mO), e;
        })();
      function mO(e) {
        return (function yO(e, t, n) {
          if (Oi(e) && !n) {
            const r = Xe(e.index, t);
            return new $o(r, r);
          }
          return 47 & e.type ? new $o(t[16], t) : null;
        })(we(), C(), 16 == (16 & e));
      }
      class yy {
        constructor() {}
        supports(t) {
          return Fo(t);
        }
        create(t) {
          return new MO(t);
        }
      }
      const wO = (e, t) => t;
      class MO {
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
            (this._trackByFn = t || wO);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Cy(r, o, i)) ? n : r,
              a = Cy(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
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
          if ((null == t && (t = []), !Fo(t))) throw new K(900, "");
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function x0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[xr()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
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
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new EO(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
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
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
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
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
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
      class EO {
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
      class bO {
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
          r || ((r = new bO()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
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
      function Cy(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class _y {
        constructor() {}
        supports(t) {
          return t instanceof Map || ol(t);
        }
        create() {
          return new PO();
        }
      }
      class PO {
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
            if (!(t instanceof Map || ol(t))) throw new K(900, "");
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
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
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new OO(t);
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
      class OO {
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
      function Dy() {
        return new Ko([new yy()]);
      }
      let Ko = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Dy()),
              deps: [[e, new yr(), new Vt()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new K(901, "");
          }
        }
        return (e.ɵprov = R({ token: e, providedIn: "root", factory: Dy })), e;
      })();
      function wy() {
        return new Kr([new _y()]);
      }
      let Kr = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
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
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new K(901, "");
          }
        }
        return (e.ɵprov = R({ token: e, providedIn: "root", factory: wy })), e;
      })();
      const xO = [new _y()],
        TO = new Ko([new yy()]),
        IO = new Kr(xO),
        AO = iy(null, "core", [
          { provide: Os, useValue: "unknown" },
          { provide: ay, deps: [Le] },
          { provide: ny, deps: [] },
          { provide: Ym, deps: [] },
        ]),
        LO = [
          { provide: Wo, useClass: Wo, deps: [be, Le, _r, $r, Wr] },
          {
            provide: Yb,
            deps: [be],
            useFactory: function jO(e) {
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
          { provide: Wr, useClass: Wr, deps: [[new Vt(), Ps]] },
          { provide: xs, useClass: xs, deps: [] },
          JP,
          {
            provide: Ko,
            useFactory: function RO() {
              return TO;
            },
            deps: [],
          },
          {
            provide: Kr,
            useFactory: function NO() {
              return IO;
            },
            deps: [],
          },
          {
            provide: En,
            useFactory: function FO(e) {
              return (
                e ||
                (function kO() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || hs
                  );
                })()
              );
            },
            deps: [[new Eo(En), new Vt(), new yr()]],
          },
          { provide: Xm, useValue: "USD" },
        ];
      let VO = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(Wo));
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({ providers: LO })),
            e
          );
        })(),
        Is = null;
      function bn() {
        return Is;
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
              return (function $O() {
                return b(My);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const zO = new B("Location Initialized");
      let My = (() => {
        class e extends Gn {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return bn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = bn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = bn().getGlobalEventTarget(this._doc, "window");
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
          pushState(n, r, o) {
            Ey() ? this._history.pushState(n, r, o) : (this.location.hash = o);
          }
          replaceState(n, r, o) {
            Ey()
              ? this._history.replaceState(n, r, o)
              : (this.location.hash = o);
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
            return new (n || e)(b(rt));
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function qO() {
                return new My(b(rt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Ey() {
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
      function by(e) {
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
              return (function GO(e) {
                const t = b(rt).location;
                return new Py(b(Gn), (t && t.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const ec = new B("appBaseHref");
      let Py = (() => {
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
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + un(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + un(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(Gn), b(ec, 8));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        QO = (() => {
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
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + un(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + un(i));
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
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(Gn), b(ec, 8));
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
              const o = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = by(Oy(o))),
                this._platformStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
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
                (function KO(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, Oy(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._platformStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._platformStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + un(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._platformStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + un(r)),
                  o
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformStrategy).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = un),
            (e.joinWithSlash = Xl),
            (e.stripTrailingSlash = by),
            (e.ɵfac = function (n) {
              return new (n || e)(b(Zr), b(Gn));
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return (function WO() {
                  return new tc(b(Zr), b(Gn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function Oy(e) {
        return e.replace(/\/index.html$/, "");
      }
      var Ce = (() => (
        ((Ce = Ce || {})[(Ce.Zero = 0)] = "Zero"),
        (Ce[(Ce.One = 1)] = "One"),
        (Ce[(Ce.Two = 2)] = "Two"),
        (Ce[(Ce.Few = 3)] = "Few"),
        (Ce[(Ce.Many = 4)] = "Many"),
        (Ce[(Ce.Other = 5)] = "Other"),
        Ce
      ))();
      const nx = function jg(e) {
        return (function qe(e) {
          const t = (function BE(e) {
            return e.toLowerCase().replace(/_/g, "-");
          })(e);
          let n = Vg(t);
          if (n) return n;
          const r = t.split("-")[0];
          if (((n = Vg(r)), n)) return n;
          if ("en" === r) return HE;
          throw new Error(`Missing locale data for the locale "${e}".`);
        })(e)[M.PluralCase];
      };
      class Bs {}
      let Ix = (() => {
        class e extends Bs {
          constructor(n) {
            super(), (this.locale = n);
          }
          getPluralCategory(n, r) {
            switch (nx(r || this.locale)(n)) {
              case Ce.Zero:
                return "zero";
              case Ce.One:
                return "one";
              case Ce.Two:
                return "two";
              case Ce.Few:
                return "few";
              case Ce.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(En));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ky(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class Nx {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
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
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
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
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new Nx(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Ly(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              Ly(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(xt), O(an), O(Ko));
          }),
          (e.ɵdir = Ae({
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
              (this._context = new Fx()),
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
            return new (n || e)(O(xt), O(an));
          }),
          (e.ɵdir = Ae({
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
      class Fx {
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
            constructor(n, r, o) {
              (this._ngEl = n),
                (this._differs = r),
                (this._renderer = o),
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
              const [o, i] = n.split(".");
              null != (r = null != r && i ? `${r}${i}` : r)
                ? this._renderer.setStyle(this._ngEl.nativeElement, o, r)
                : this._renderer.removeStyle(this._ngEl.nativeElement, o);
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
              return new (n || e)(O(on), O(Kr), O(Uo));
            }),
            (e.ɵdir = Ae({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
            })),
            e
          );
        })(),
        aS = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({ providers: [{ provide: Bs, useClass: Ix }] })),
            e
          );
        })();
      let dS = (() => {
        class e {}
        return (
          (e.ɵprov = R({
            token: e,
            providedIn: "root",
            factory: () => new fS(b(rt), window),
          })),
          e
        );
      })();
      class fS {
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
          const n = (function hS(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
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
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
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
      class gc extends class pS extends class UO {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function BO(e) {
            Is || (Is = e);
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
          const n = (function gS() {
            return (
              (Yo = Yo || document.querySelector("base")),
              Yo ? Yo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function mS(e) {
                (Us = Us || document.createElement("a")),
                  Us.setAttribute("href", e);
                const t = Us.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Yo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return ky(document.cookie, t);
        }
      }
      let Us,
        Yo = null;
      const Gy = new B("TRANSITION_ID"),
        vS = [
          {
            provide: Ps,
            useFactory: function yS(e, t, n) {
              return () => {
                n.get(Wr).donePromise.then(() => {
                  const r = bn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Gy, rt, Le],
            multi: !0,
          },
        ];
      class mc {
        static init() {
          !(function aO(e) {
            Ql = e;
          })(new mc());
        }
        addToWindow(t) {
          (Y.getAngularTestability = (r, o = !0) => {
            const i = t.findTestabilityInTree(r, o);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (Y.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Y.getAllAngularRootElements = () => t.getAllRootElements()),
            Y.frameworkStabilizers || (Y.frameworkStabilizers = []),
            Y.frameworkStabilizers.push((r) => {
              const o = Y.getAllAngularTestabilities();
              let i = o.length,
                s = !1;
              const a = function (u) {
                (s = s || u), i--, 0 == i && r(s);
              };
              o.forEach(function (u) {
                u.whenStable(a);
              });
            });
        }
        findTestabilityInTree(t, n, r) {
          if (null == n) return null;
          const o = t.getTestability(n);
          return null != o
            ? o
            : r
            ? bn().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null;
        }
      }
      let CS = (() => {
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
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b($s), b(be));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Qy {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = bn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Wy = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
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
        Xo = (() => {
          class e extends Wy {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
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
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(Ky));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(rt));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function Ky(e) {
        bn().remove(e);
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
          let o = t[r];
          Array.isArray(o) ? qs(e, o, n) : ((o = o.replace(vc, e)), n.push(o));
        }
        return n;
      }
      function Yy(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Cc = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new _c(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Nt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new bS(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case Nt.ShadowDom:
                return new PS(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = qs(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
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
            return new (n || e)(b(zs), b(Xo), b(Qo));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class _c {
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
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = yc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = yc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (tt.DashCase | tt.Important)
            ? t.style.setProperty(n, r, o & tt.Important ? "important" : "")
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
      class bS extends _c {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = qs(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function wS(e) {
              return "_ngcontent-%COMP%".replace(vc, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function MS(e) {
              return "_nghost-%COMP%".replace(vc, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class PS extends _c {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = qs(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
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
      let OS = (() => {
        class e extends Qy {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(rt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ev = ["alt", "control", "meta", "shift"],
        SS = {
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
        TS = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let IS = (() => {
        class e extends Qy {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => bn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "";
            if (
              (ev.forEach((u) => {
                const l = r.indexOf(u);
                l > -1 && (r.splice(l, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const a = {};
            return (a.domEventName = o), (a.fullKey = s), a;
          }
          static getEventFullKey(n) {
            let r = "",
              o = (function AS(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && tv.hasOwnProperty(t) && (t = tv[t]));
                }
                return SS[t] || t;
              })(n);
            return (
              (o = o.toLowerCase()),
              " " === o ? (o = "space") : "." === o && (o = "dot"),
              ev.forEach((i) => {
                i != o && TS[i](n) && (r += i + ".");
              }),
              (r += o),
              r
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.getEventFullKey(i) === n && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(rt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const kS = iy(AO, "browser", [
          { provide: Os, useValue: "browser" },
          {
            provide: Zm,
            useValue: function RS() {
              gc.makeCurrent(), mc.init();
            },
            multi: !0,
          },
          {
            provide: rt,
            useFactory: function FS() {
              return (
                (function H_(e) {
                  La = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        LS = [
          { provide: Yu, useValue: "root" },
          {
            provide: _r,
            useFactory: function NS() {
              return new _r();
            },
            deps: [],
          },
          { provide: $s, useClass: OS, multi: !0, deps: [rt, be, Os] },
          { provide: $s, useClass: IS, multi: !0, deps: [rt] },
          { provide: Cc, useClass: Cc, deps: [zs, Xo, Qo] },
          { provide: hm, useExisting: Cc },
          { provide: Wy, useExisting: Xo },
          { provide: Xo, useClass: Xo, deps: [rt] },
          { provide: Gl, useClass: Gl, deps: [be] },
          { provide: zs, useClass: zs, deps: [$s, be] },
          { provide: qy, useClass: CS, deps: [] },
        ];
      let jS = (() => {
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
                { provide: Qo, useValue: n.appId },
                { provide: Gy, useExisting: Qo },
                vS,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(e, 12));
          }),
          (e.ɵmod = Ft({ type: e })),
          (e.ɵinj = vt({ providers: LS, imports: [aS, VO] })),
          e
        );
      })();
      function T(...e) {
        return Ie(e, so(e));
      }
      "undefined" != typeof window && window;
      class mt extends At {
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
      const { isArray: KS } = Array,
        { getPrototypeOf: ZS, prototype: JS, keys: YS } = Object;
      function ov(e) {
        if (1 === e.length) {
          const t = e[0];
          if (KS(t)) return { args: t, keys: null };
          if (
            (function XS(e) {
              return e && "object" == typeof e && ZS(e) === JS;
            })(t)
          ) {
            const n = YS(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: eT } = Array;
      function iv(e) {
        return W((t) =>
          (function tT(e, t) {
            return eT(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function sv(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function av(e, t, n) {
        e ? Kt(n, e, t) : t();
      }
      const Gs = ro(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function ei(...e) {
        return (function oT() {
          return io(1);
        })()(Ie(e, so(e)));
      }
      function Qs(e) {
        return new oe((t) => {
          Rt(e()).subscribe(t);
        });
      }
      function uv() {
        return Te((e, t) => {
          let n = null;
          e._refCount++;
          const r = new Oe(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class iT extends oe {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            _d(t) && (this.lift = t.lift);
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
                new Oe(
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
        return Te((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            new Oe(
              r,
              (u) => {
                null == o || o.unsubscribe();
                let l = 0;
                const c = i++;
                Rt(e(u, c)).subscribe(
                  (o = new Oe(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
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
      function aT(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            u = t,
            l = 0;
          i.subscribe(
            new Oe(
              s,
              (c) => {
                const d = l++;
                (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
              },
              o &&
                (() => {
                  a && s.next(u), s.complete();
                })
            )
          );
        };
      }
      function lv(e, t) {
        return Te(aT(e, t, arguments.length >= 2, !0));
      }
      function Qn(e, t) {
        return Te((n, r) => {
          let o = 0;
          n.subscribe(new Oe(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function On(e) {
        return Te((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            new Oe(n, void 0, void 0, (s) => {
              (i = Rt(e(s, On(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function Wn(e, t) {
        return X(t) ? xe(e, t, 1) : xe(e, 1);
      }
      function wc(e) {
        return e <= 0
          ? () => Zt
          : Te((t, n) => {
              let r = [];
              t.subscribe(
                new Oe(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
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
      function cv(e = uT) {
        return Te((t, n) => {
          let r = !1;
          t.subscribe(
            new Oe(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function uT() {
        return new Gs();
      }
      function dv(e) {
        return Te((t, n) => {
          let r = !1;
          t.subscribe(
            new Oe(
              n,
              (o) => {
                (r = !0), n.next(o);
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
            e ? Qn((o, i) => e(o, i, r)) : Rn,
            pn(1),
            n ? dv(t) : cv(() => new Gs())
          );
      }
      function ot(e, t, n) {
        const r = X(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Te((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                new Oe(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
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
      class Mc extends dn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n), (this.navigationTrigger = r), (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ti extends dn {
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
      class dT extends dn {
        constructor(t, n, r) {
          super(t, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class fT extends dn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class hT extends dn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pT extends dn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class gT extends dn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mT extends dn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
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
      class yT {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class vT {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class CT {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class _T {
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
      class DT {
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
        return new DT(e);
      }
      const mv = "ngNavigationCancelingError";
      function Ec(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t[mv] = !0), t;
      }
      function MT(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Qt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !yv(e[o], t[o]))) return !1;
        return !0;
      }
      function yv(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function vv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Cv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Re(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Wt(e) {
        return Wp(e) ? e : ds(e) ? Ie(Promise.resolve(e)) : T(e);
      }
      const PT = {
          exact: function wv(e, t, n) {
            if (
              !Zn(e.segments, t.segments) ||
              !Ws(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !wv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Mv,
        },
        _v = {
          exact: function OT(e, t) {
            return Qt(e, t);
          },
          subset: function xT(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => yv(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Dv(e, t, n) {
        return (
          PT[n.paths](e.root, t.root, n.matrixParams) &&
          _v[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Mv(e, t, n) {
        return Ev(e, t, t.segments, n);
      }
      function Ev(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Zn(o, n) || t.hasChildren() || !Ws(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Zn(e.segments, n) || !Ws(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !Mv(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Zn(e.segments, o) && Ws(e.segments, o, r) && e.children[$]) &&
            Ev(e.children[$], t, i, r)
          );
        }
      }
      function Ws(e, t, n) {
        return t.every((r, o) => _v[n](e[o].parameters, r.parameters));
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
          return IT.serialize(this);
        }
      }
      class q {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Re(n, (r, o) => (r.parent = this));
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
      class ni {
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
          return Sv(this);
        }
      }
      function Zn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      class bv {}
      class Pv {
        parse(t) {
          const n = new HT(t);
          return new Kn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${ri(t.root, !0)}`,
            r = (function NT(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Zs(n)}=${Zs(o)}`).join("&")
                    : `${Zs(n)}=${Zs(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function AT(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const IT = new Pv();
      function Ks(e) {
        return e.segments.map((t) => Sv(t)).join("/");
      }
      function ri(e, t) {
        if (!e.hasChildren()) return Ks(e);
        if (t) {
          const n = e.children[$] ? ri(e.children[$], !1) : "",
            r = [];
          return (
            Re(e.children, (o, i) => {
              i !== $ && r.push(`${i}:${ri(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function TT(e, t) {
            let n = [];
            return (
              Re(e.children, (r, o) => {
                o === $ && (n = n.concat(t(r, o)));
              }),
              Re(e.children, (r, o) => {
                o !== $ && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === $ ? [ri(e.children[$], !1)] : [`${o}:${ri(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${Ks(e)}/${n[0]}`
            : `${Ks(e)}/(${n.join("//")})`;
        }
      }
      function Ov(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Zs(e) {
        return Ov(e).replace(/%3B/gi, ";");
      }
      function bc(e) {
        return Ov(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Js(e) {
        return decodeURIComponent(e);
      }
      function xv(e) {
        return Js(e.replace(/\+/g, "%20"));
      }
      function Sv(e) {
        return `${bc(e.path)}${(function RT(e) {
          return Object.keys(e)
            .map((t) => `;${bc(t)}=${bc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const FT = /^[^\/()?;=#]+/;
      function Ys(e) {
        const t = e.match(FT);
        return t ? t[0] : "";
      }
      const kT = /^[^=?&#]+/,
        jT = /^[^&#]+/;
      class HT {
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
          return this.capture(t), new ni(Js(t), this.parseMatrixParams());
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
            const o = Ys(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Js(n)] = Js(r);
        }
        parseQueryParam(t) {
          const n = (function LT(e) {
            const t = e.match(kT);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function VT(e) {
              const t = e.match(jT);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = xv(n),
            i = xv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Ys(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o)
              throw new Error(`Cannot parse url '${this.url}'`);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.substr(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = $);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[$] : new q([], s)),
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
      class Tv {
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
          const n = Pc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Pc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Oc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Oc(t, this._root).map((n) => n.value);
        }
      }
      function Pc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Pc(e, n);
          if (r) return r;
        }
        return null;
      }
      function Oc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Oc(e, n);
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
      class Iv extends Tv {
        constructor(t, n) {
          super(t), (this.snapshot = n), xc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Av(e, t) {
        const n = (function BT(e, t) {
            const s = new Xs([], {}, {}, "", {}, $, t, null, e.root, -1, {});
            return new Nv("", new fn(s, []));
          })(e, t),
          r = new mt([new ni("", {})]),
          o = new mt({}),
          i = new mt({}),
          s = new mt({}),
          a = new mt(""),
          u = new eo(r, o, s, a, i, $, t, n.root);
        return (u.snapshot = n.root), new Iv(new fn(u, []), n);
      }
      class eo {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
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
              (this._paramMap = this.params.pipe(W((t) => Yr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(W((t) => Yr(t)))),
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
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function UT(e) {
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
        constructor(t, n, r, o, i, s, a, u, l, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
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
      class Nv extends Tv {
        constructor(t, n) {
          super(n), (this.url = t), xc(this, n);
        }
        toString() {
          return Fv(this._root);
        }
      }
      function xc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => xc(e, n));
      }
      function Fv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Fv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Sc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Qt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Qt(t.params, n.params) || e.params.next(n.params),
            (function ET(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Qt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Qt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Tc(e, t) {
        const n =
          Qt(e.params, t.params) &&
          (function ST(e, t) {
            return (
              Zn(e, t) && e.every((n, r) => Qt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Tc(e.parent, t.parent))
        );
      }
      function oi(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function zT(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return oi(e, r, o);
              return oi(e, r);
            });
          })(e, t, n);
          return new fn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => oi(e, a))),
                s
              );
            }
          }
          const r = (function qT(e) {
              return new eo(
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
            o = t.children.map((i) => oi(e, i));
          return new fn(r, o);
        }
      }
      function ea(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function ii(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Ic(e, t, n, r, o) {
        let i = {};
        return (
          r &&
            Re(r, (s, a) => {
              i[a] = Array.isArray(s) ? s.map((u) => `${u}`) : `${s}`;
            }),
          new Kn(n.root === e ? t : kv(n.root, e, t), i, o)
        );
      }
      function kv(e, t, n) {
        const r = {};
        return (
          Re(e.children, (o, i) => {
            r[i] = o === t ? n : kv(o, t, n);
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
          const o = r.find(ii);
          if (o && o !== Cv(r))
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
      class Ac {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function jv(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return ta(e, t, n);
        const r = (function JT(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (ii(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Hv(u, l, s)) return i;
                r += 2;
              } else {
                if (!Hv(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new q(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[$] = new q(e.segments.slice(r.pathIndex), e.children)),
            ta(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? Rc(e, t, n)
          : r.match
          ? ta(e, 0, o)
          : Rc(e, t, n);
      }
      function ta(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function ZT(e) {
              return ii(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            o = {};
          return (
            Re(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = jv(e.children[s], t, i));
            }),
            Re(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new q(e.segments, o)
          );
        }
      }
      function Rc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (ii(i)) {
            const u = YT(i.outlets);
            return new q(r, u);
          }
          if (0 === o && ea(n[0])) {
            r.push(new ni(e.segments[t].path, Vv(n[0]))), o++;
            continue;
          }
          const s = ii(i) ? i.outlets[$] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && ea(a)
            ? (r.push(new ni(s, Vv(a))), (o += 2))
            : (r.push(new ni(s, {})), o++);
        }
        return new q(r, {});
      }
      function YT(e) {
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
        return e == n.path && Qt(t, n.parameters);
      }
      class eI {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Sc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Xr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Re(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Xr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
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
            o = r && t.value.component ? r.children : n,
            i = Xr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Xr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new _T(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new vT(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Sc(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Sc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = (function tI(e) {
                  for (let t = e.parent; t; t = t.parent) {
                    const n = t.routeConfig;
                    if (n && n._loadedConfig) return n._loadedConfig;
                    if (n && n.component) return null;
                  }
                  return null;
                })(o.snapshot),
                u = a ? a.module.componentFactoryResolver : null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                s.outlet && s.outlet.activateWith(o, u),
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
      function xn(e) {
        return "function" == typeof e;
      }
      function Jn(e) {
        return e instanceof Kn;
      }
      const si = Symbol("INITIAL_VALUE");
      function ai() {
        return cn((e) =>
          (function nT(...e) {
            const t = so(e),
              n = Nd(e),
              { args: r, keys: o } = ov(e);
            if (0 === r.length) return Ie([], t);
            const i = new oe(
              (function rT(e, t, n = Rn) {
                return (r) => {
                  av(
                    t,
                    () => {
                      const { length: o } = e,
                        i = new Array(o);
                      let s = o,
                        a = o;
                      for (let u = 0; u < o; u++)
                        av(
                          t,
                          () => {
                            const l = Ie(e[u], t);
                            let c = !1;
                            l.subscribe(
                              new Oe(
                                r,
                                (d) => {
                                  (i[u] = d),
                                    c || ((c = !0), a--),
                                    a || r.next(n(i.slice()));
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
              })(r, t, o ? (s) => sv(o, s) : Rn)
            );
            return n ? i.pipe(iv(n)) : i;
          })(
            e.map((t) =>
              t.pipe(
                pn(1),
                (function sT(...e) {
                  const t = so(e);
                  return Te((n, r) => {
                    (t ? ei(e, n, t) : ei(e, n)).subscribe(r);
                  });
                })(si)
              )
            )
          ).pipe(
            lv((t, n) => {
              let r = !1;
              return n.reduce(
                (o, i, s) =>
                  o !== si
                    ? o
                    : (i === si && (r = !0),
                      r || (!1 !== i && s !== n.length - 1 && !Jn(i)) ? o : i),
                t
              );
            }, si),
            Qn((t) => t !== si),
            W((t) => (Jn(t) ? t : !0 === t)),
            pn(1)
          )
        );
      }
      class aI {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new ui()),
            (this.attachRef = null);
        }
      }
      class ui {
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
          return n || ((n = new aI()), this.contexts.set(t, n)), n;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let Fc = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = o),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new pe()),
              (this.deactivateEvents = new pe()),
              (this.attachEvents = new pe()),
              (this.detachEvents = new pe()),
              (this.name = i || $),
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
              u = new uI(n, a, this.location.injector);
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
            return new (n || e)(O(ui), O(xt), O($r), yo("name"), O(Ss));
          }),
          (e.ɵdir = Ae({
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
      class uI {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === eo
            ? this.route
            : t === ui
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
              1 & n && We(0, "router-outlet");
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
          lI(r, cI(t, r));
        }
      }
      function lI(e, t) {
        e.children && Uv(e.children, t);
      }
      function cI(e, t) {
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
        const i = (t.matcher || MT)(n, e, t);
        if (!i) return Object.assign({}, zv);
        const s = {};
        Re(i.posParams, (u, l) => {
          s[l] = u.path;
        });
        const a =
          i.consumed.length > 0
            ? Object.assign(
                Object.assign({}, s),
                i.consumed[i.consumed.length - 1].parameters
              )
            : s;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          lastChild: i.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = i.posParams) && void 0 !== r ? r : {},
        };
      }
      function ra(e, t, n, r, o = "corrected") {
        if (
          n.length > 0 &&
          (function hI(e, t, n) {
            return n.some((r) => oa(e, t, r) && yt(r) !== $);
          })(e, n, r)
        ) {
          const s = new q(
            t,
            (function fI(e, t, n, r) {
              const o = {};
              (o[$] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && yt(i) !== $) {
                  const s = new q([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[yt(i)] = s);
                }
              return o;
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
          (function pI(e, t, n) {
            return n.some((r) => oa(e, t, r));
          })(e, n, r)
        ) {
          const s = new q(
            e.segments,
            (function dI(e, t, n, r, o, i) {
              const s = {};
              for (const a of r)
                if (oa(e, n, a) && !o[yt(a)]) {
                  const u = new q([], {});
                  (u._sourceSegment = e),
                    (u._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (s[yt(a)] = u);
                }
              return Object.assign(Object.assign({}, o), s);
            })(e, t, n, r, e.children, o)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const i = new q(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function oa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function qv(e, t, n, r) {
        return (
          !!(yt(e) === r || (r !== $ && oa(t, n, e))) &&
          ("**" === e.path || na(t, e, n).matched)
        );
      }
      function Gv(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      class li {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Qv {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ia(e) {
        return new oe((t) => t.error(new li(e)));
      }
      function Wv(e) {
        return new oe((t) => t.error(new Qv(e)));
      }
      function gI(e) {
        return new oe((t) =>
          t.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${e}'`
            )
          )
        );
      }
      class vI {
        constructor(t, n, r, o, i) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(sn));
        }
        apply() {
          const t = ra(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new q(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, $)
            .pipe(
              W((i) =>
                this.createUrlTree(
                  Lc(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              On((i) => {
                if (i instanceof Qv)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof li ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, $)
            .pipe(
              W((o) => this.createUrlTree(Lc(o), t.queryParams, t.fragment))
            )
            .pipe(
              On((o) => {
                throw o instanceof li ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, n, r) {
          const o = t.segments.length > 0 ? new q([], { [$]: t }) : t;
          return new Kn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(W((i) => new q([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ie(o).pipe(
            Wn((i) => {
              const s = r.children[i],
                a = $v(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                W((u) => ({ segment: u, outlet: i }))
              );
            }),
            lv((i, s) => ((i[s.outlet] = s.segment), i), {}),
            (function lT(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? Qn((o, i) => e(o, i, r)) : Rn,
                  wc(1),
                  n ? dv(t) : cv(() => new Gs())
                );
            })()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Ie(r).pipe(
            Wn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                On((l) => {
                  if (l instanceof li) return T(null);
                  throw l;
                })
              )
            ),
            Jr((a) => !!a),
            On((a, u) => {
              if (a instanceof Gs || "EmptyError" === a.name) {
                if (Gv(n, o, i)) return T(new q([], {}));
                throw new li(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return qv(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : ia(n)
            : ia(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? Wv(i)
            : this.lineralizeSegments(r, i).pipe(
                xe((s) => {
                  const a = new q(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            lastChild: l,
            positionalParamSegments: c,
          } = na(n, o, i);
          if (!a) return ia(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? Wv(d)
            : this.lineralizeSegments(o, d).pipe(
                xe((f) =>
                  this.expandSegment(t, n, r, f.concat(i.slice(l)), s, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? T(r._loadedConfig)
                  : this.configLoader.load(t.injector, r)
                ).pipe(W((f) => ((r._loadedConfig = f), new q(o, {}))))
              : T(new q(o, {}));
          const { matched: s, consumedSegments: a, lastChild: u } = na(n, r, o);
          if (!s) return ia(n);
          const l = o.slice(u);
          return this.getChildConfig(t, r, o).pipe(
            xe((d) => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: m } = ra(n, a, l, h),
                y = new q(p.segments, p.children);
              if (0 === m.length && y.hasChildren())
                return this.expandChildren(f, h, y).pipe(W((I) => new q(a, I)));
              if (0 === h.length && 0 === m.length) return T(new q(a, {}));
              const v = yt(r) === i;
              return this.expandSegment(f, y, h, m, v ? $ : i, !0).pipe(
                W((E) => new q(a.concat(E.segments), E.children))
              );
            })
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? T(new Nc(n.children, t))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? T(n._loadedConfig)
              : this.runCanLoadGuards(t.injector, n, r).pipe(
                  xe((o) =>
                    o
                      ? this.configLoader
                          .load(t.injector, n)
                          .pipe(W((i) => ((n._loadedConfig = i), i)))
                      : (function mI(e) {
                          return new oe((t) =>
                            t.error(
                              Ec(
                                `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                              )
                            )
                          );
                        })(n)
                  )
                )
            : T(new Nc([], t));
        }
        runCanLoadGuards(t, n, r) {
          const o = n.canLoad;
          return o && 0 !== o.length
            ? T(
                o.map((s) => {
                  const a = t.get(s);
                  let u;
                  if (
                    (function rI(e) {
                      return e && xn(e.canLoad);
                    })(a)
                  )
                    u = a.canLoad(n, r);
                  else {
                    if (!xn(a)) throw new Error("Invalid CanLoad guard");
                    u = a(n, r);
                  }
                  return Wt(u);
                })
              ).pipe(
                ai(),
                ot((s) => {
                  if (!Jn(s)) return;
                  const a = Ec(
                    `Redirecting to "${this.urlSerializer.serialize(s)}"`
                  );
                  throw ((a.url = s), a);
                }),
                W((s) => !0 === s)
              )
            : T(!0);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return T(r);
            if (o.numberOfChildren > 1 || !o.children[$])
              return gI(t.redirectTo);
            o = o.children[$];
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
        applyRedirectCreatreUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Kn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Re(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Re(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new q(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${n.path}'.`
            );
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      function Lc(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Lc(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function CI(e) {
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
      function DI(e, t, n) {
        const r = e._root;
        return ci(r, t ? t._root : null, n, [r.value]);
      }
      function aa(e, t, n) {
        const r = (function MI(e) {
          if (!e) return null;
          for (let t = e.parent; t; t = t.parent) {
            const n = t.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(t);
        return (r ? r.module.injector : n).get(e);
      }
      function ci(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Xr(t);
        return (
          e.children.forEach((s) => {
            (function EI(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function bI(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Zn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Zn(e.url, t.url) || !Qt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Tc(e, t) || !Qt(e.queryParams, t.queryParams);
                    default:
                      return !Tc(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new Kv(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  ci(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new sa(a.outlet.component, s));
              } else
                s && di(t, a, o),
                  o.canActivateChecks.push(new Kv(r)),
                  ci(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Re(i, (s, a) => di(s, n.getContext(a), o)),
          o
        );
      }
      function di(e, t, n) {
        const r = Xr(e),
          o = e.value;
        Re(r, (i, s) => {
          di(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new sa(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      class NI {}
      function Zv(e) {
        return new oe((t) => t.error(e));
      }
      class kI {
        constructor(t, n, r, o, i, s) {
          (this.rootComponentType = t),
            (this.config = n),
            (this.urlTree = r),
            (this.url = o),
            (this.paramsInheritanceStrategy = i),
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
            o = new fn(r, n),
            i = new Nv(this.url, o);
          return this.inheritParamsAndData(i._root), i;
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Rv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, n)
            : this.processSegment(t, n, n.segments, r);
        }
        processChildren(t, n) {
          const r = [];
          for (const i of Object.keys(n.children)) {
            const s = n.children[i],
              a = $v(t, i),
              u = this.processSegmentGroup(a, s, i);
            if (null === u) return null;
            r.push(...u);
          }
          const o = Jv(r);
          return (
            (function LI(e) {
              e.sort((t, n) =>
                t.value.outlet === $
                  ? -1
                  : n.value.outlet === $
                  ? 1
                  : t.value.outlet.localeCompare(n.value.outlet)
              );
            })(o),
            o
          );
        }
        processSegment(t, n, r, o) {
          for (const i of t) {
            const s = this.processSegmentAgainstRoute(i, n, r, o);
            if (null !== s) return s;
          }
          return Gv(n, r, o) ? [] : null;
        }
        processSegmentAgainstRoute(t, n, r, o) {
          if (t.redirectTo || !qv(t, n, r, o)) return null;
          let i,
            s = [],
            a = [];
          if ("**" === t.path) {
            const h = r.length > 0 ? Cv(r).parameters : {};
            i = new Xs(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              eC(t),
              yt(t),
              t.component,
              t,
              Yv(n),
              Xv(n) + r.length,
              tC(t)
            );
          } else {
            const h = na(n, t, r);
            if (!h.matched) return null;
            (s = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (i = new Xs(
                s,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                eC(t),
                yt(t),
                t.component,
                t,
                Yv(n),
                Xv(n) + s.length,
                tC(t)
              ));
          }
          const u = (function jI(e) {
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
            return null === h ? null : [new fn(i, h)];
          }
          if (0 === u.length && 0 === c.length) return [new fn(i, [])];
          const d = yt(t) === o,
            f = this.processSegment(u, l, c, d ? $ : o);
          return null === f ? null : [new fn(i, f)];
        }
      }
      function VI(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Jv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!VI(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = Jv(r.children);
          t.push(new fn(r.value, o));
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
      function eC(e) {
        return e.data || {};
      }
      function tC(e) {
        return e.resolve || {};
      }
      function nC(e) {
        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
      }
      function jc(e) {
        return cn((t) => {
          const n = e(t);
          return n ? Ie(n).pipe(W(() => t)) : T(t);
        });
      }
      class QI extends class GI {
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
      class rC {
        constructor(t, n, r, o) {
          (this.injector = t),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = o);
        }
        load(t, n) {
          if (n._loader$) return n._loader$;
          this.onLoadStartListener && this.onLoadStartListener(n);
          const o = this.loadModuleFactory(n.loadChildren).pipe(
            W((i) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const s = i.create(t);
              return new Nc(
                vv(s.injector.get(Vc, void 0, L.Self | L.Optional)).map(kc),
                s
              );
            }),
            On((i) => {
              throw ((n._loader$ = void 0), i);
            })
          );
          return (
            (n._loader$ = new iT(o, () => new At()).pipe(uv())), n._loader$
          );
        }
        loadModuleFactory(t) {
          return Wt(t()).pipe(
            xe((n) =>
              n instanceof mm ? T(n) : Ie(this.compiler.compileModuleAsync(n))
            )
          );
        }
      }
      class KI {
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
      function ZI(e) {
        throw e;
      }
      function JI(e, t, n) {
        return t.parse("/");
      }
      function oC(e, t) {
        return T(null);
      }
      const YI = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        XI = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let it = (() => {
        class e {
          constructor(n, r, o, i, s, a, u) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = i),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new At()),
              (this.errorHandler = ZI),
              (this.malformedUriErrorHandler = JI),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: oC,
                afterPreactivation: oC,
              }),
              (this.urlHandlingStrategy = new KI()),
              (this.routeReuseStrategy = new QI()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = s.get(sn)),
              (this.console = s.get(Ym));
            const d = s.get(be);
            (this.isNgZoneEnabled = d instanceof be && be.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = (function bT() {
                return new Kn(new q([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new rC(
                s,
                a,
                (f) => this.triggerEvent(new hv(f)),
                (f) => this.triggerEvent(new pv(f))
              )),
              (this.routerState = Av(
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
              Qn((o) => 0 !== o.id),
              W((o) =>
                Object.assign(Object.assign({}, o), {
                  extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
                })
              ),
              cn((o) => {
                let i = !1,
                  s = !1;
                return T(o).pipe(
                  ot((a) => {
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
                        T(a).pipe(
                          cn((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Mc(
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
                          (function _I(e, t, n, r) {
                            return cn((o) =>
                              (function yI(e, t, n, r, o) {
                                return new vI(e, t, n, r, o).apply();
                              })(e, t, n, o.extractedUrl, r).pipe(
                                W((i) =>
                                  Object.assign(Object.assign({}, o), {
                                    urlAfterRedirects: i,
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
                          ot((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function HI(e, t, n, r, o) {
                            return xe((i) =>
                              (function FI(
                                e,
                                t,
                                n,
                                r,
                                o = "emptyOnly",
                                i = "legacy"
                              ) {
                                try {
                                  const s = new kI(
                                    e,
                                    t,
                                    n,
                                    r,
                                    o,
                                    i
                                  ).recognize();
                                  return null === s ? Zv(new NI()) : T(s);
                                } catch (s) {
                                  return Zv(s);
                                }
                              })(
                                e,
                                t,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                o
                              ).pipe(
                                W((s) =>
                                  Object.assign(Object.assign({}, i), {
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
                          ot((d) => {
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
                            const f = new fT(
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
                        v = new Mc(f, this.serializeUrl(h), p, m);
                      r.next(v);
                      const g = Av(h, this.rootComponentType).snapshot;
                      return T(
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
                  ot((a) => {
                    const u = new hT(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(u);
                  }),
                  W((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: DI(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function PI(e, t) {
                    return xe((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === i.length
                        ? T(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function OI(e, t, n, r) {
                            return Ie(e).pipe(
                              xe((o) =>
                                (function RI(e, t, n, r, o) {
                                  const i =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? T(
                                        i.map((a) => {
                                          const u = aa(a, t, o);
                                          let l;
                                          if (
                                            (function sI(e) {
                                              return e && xn(e.canDeactivate);
                                            })(u)
                                          )
                                            l = Wt(u.canDeactivate(e, t, n, r));
                                          else {
                                            if (!xn(u))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            l = Wt(u(e, t, n, r));
                                          }
                                          return l.pipe(Jr());
                                        })
                                      ).pipe(ai())
                                    : T(!0);
                                })(o.component, o.route, n, t, r)
                              ),
                              Jr((o) => !0 !== o, !0)
                            );
                          })(s, r, o, e).pipe(
                            xe((a) =>
                              a &&
                              (function nI(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function xI(e, t, n, r) {
                                    return Ie(t).pipe(
                                      Wn((o) =>
                                        ei(
                                          (function TI(e, t) {
                                            return (
                                              null !== e && t && t(new yT(e)),
                                              T(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function SI(e, t) {
                                            return (
                                              null !== e && t && t(new CT(e)),
                                              T(!0)
                                            );
                                          })(o.route, r),
                                          (function AI(e, t, n) {
                                            const r = t[t.length - 1],
                                              i = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function wI(e) {
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
                                                  Qs(() =>
                                                    T(
                                                      s.guards.map((u) => {
                                                        const l = aa(
                                                          u,
                                                          s.node,
                                                          n
                                                        );
                                                        let c;
                                                        if (
                                                          (function iI(e) {
                                                            return (
                                                              e &&
                                                              xn(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(l)
                                                        )
                                                          c = Wt(
                                                            l.canActivateChild(
                                                              r,
                                                              e
                                                            )
                                                          );
                                                        else {
                                                          if (!xn(l))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = Wt(l(r, e));
                                                        }
                                                        return c.pipe(Jr());
                                                      })
                                                    ).pipe(ai())
                                                  )
                                                );
                                            return T(i).pipe(ai());
                                          })(e, o.path, n),
                                          (function II(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return T(!0);
                                            const o = r.map((i) =>
                                              Qs(() => {
                                                const s = aa(i, t, n);
                                                let a;
                                                if (
                                                  (function oI(e) {
                                                    return (
                                                      e && xn(e.canActivate)
                                                    );
                                                  })(s)
                                                )
                                                  a = Wt(s.canActivate(t, e));
                                                else {
                                                  if (!xn(s))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = Wt(s(t, e));
                                                }
                                                return a.pipe(Jr());
                                              })
                                            );
                                            return T(o).pipe(ai());
                                          })(e, o.route, n)
                                        )
                                      ),
                                      Jr((o) => !0 !== o, !0)
                                    );
                                  })(r, i, e, t)
                                : T(a)
                            ),
                            W((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  ot((a) => {
                    if (Jn(a.guardsResult)) {
                      const l = Ec(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((l.url = a.guardsResult), l);
                    }
                    const u = new pT(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(u);
                  }),
                  Qn(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  jc((a) => {
                    if (a.guards.canActivateChecks.length)
                      return T(a).pipe(
                        ot((u) => {
                          const l = new gT(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        cn((u) => {
                          let l = !1;
                          return T(u).pipe(
                            (function BI(e, t) {
                              return xe((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = n;
                                if (!o.length) return T(n);
                                let i = 0;
                                return Ie(o).pipe(
                                  Wn((s) =>
                                    (function UI(e, t, n, r) {
                                      return (function $I(e, t, n, r) {
                                        const o = nC(e);
                                        if (0 === o.length) return T({});
                                        const i = {};
                                        return Ie(o).pipe(
                                          xe((s) =>
                                            (function zI(e, t, n, r) {
                                              const o = aa(e, t, r);
                                              return Wt(
                                                o.resolve
                                                  ? o.resolve(t, n)
                                                  : o(t, n)
                                              );
                                            })(e[s], t, n, r).pipe(
                                              ot((a) => {
                                                i[s] = a;
                                              })
                                            )
                                          ),
                                          wc(1),
                                          xe(() =>
                                            nC(i).length === o.length
                                              ? T(i)
                                              : Zt
                                          )
                                        );
                                      })(e._resolve, e, t, r).pipe(
                                        W(
                                          (i) => (
                                            (e._resolvedData = i),
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
                                  ot(() => i++),
                                  wc(1),
                                  xe((s) => (i === o.length ? T(n) : Zt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            ot({
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
                        ot((u) => {
                          const l = new mT(
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
                  W((a) => {
                    const u = (function $T(e, t, n) {
                      const r = oi(e, t._root, n ? n._root : void 0);
                      return new Iv(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: u,
                    });
                  }),
                  ot((a) => {
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
                    W(
                      (r) => (
                        new eI(
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
                  ot({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  (function cT(e) {
                    return Te((t, n) => {
                      try {
                        t.subscribe(n);
                      } finally {
                        n.add(e);
                      }
                    });
                  })(() => {
                    var a;
                    i ||
                      s ||
                      this.cancelNavigationTransition(
                        o,
                        `Navigation ID ${o.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === o.id && (this.currentNavigation = null);
                  }),
                  On((a) => {
                    if (
                      ((s = !0),
                      (function wT(e) {
                        return e && e[mv];
                      })(a))
                    ) {
                      const u = Jn(a.url);
                      u || ((this.navigated = !0), this.restoreHistory(o, !0));
                      const l = new fv(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
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
                                    o.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    ua(o.source),
                                };
                              this.scheduleNavigation(
                                c,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: o.resolve,
                                  reject: o.reject,
                                  promise: o.promise,
                                }
                              );
                            }, 0)
                          : o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const u = new dT(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a
                      );
                      r.next(u);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (l) {
                        o.reject(l);
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
                    var o;
                    const i = { replaceUrl: !0 },
                      s = (
                        null === (o = n.state) || void 0 === o
                          ? void 0
                          : o.navigationId
                      )
                        ? n.state
                        : null;
                    if (s) {
                      const u = Object.assign({}, s);
                      delete u.navigationId,
                        delete u.ɵrouterPageId,
                        0 !== Object.keys(u).length && (i.state = u);
                    }
                    const a = this.parseUrl(n.url);
                    this.scheduleNavigation(a, r, s, i);
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
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = o || this.routerState.root,
              c = u ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  i
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function GT(e, t, n, r, o) {
                if (0 === n.length) return Ic(t.root, t.root, t, r, o);
                const i = (function QT(e) {
                  if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new Lv(!0, 0, e);
                  let t = 0,
                    n = !1;
                  const r = e.reduce((o, i, s) => {
                    if ("object" == typeof i && null != i) {
                      if (i.outlets) {
                        const a = {};
                        return (
                          Re(i.outlets, (u, l) => {
                            a[l] = "string" == typeof u ? u.split("/") : u;
                          }),
                          [...o, { outlets: a }]
                        );
                      }
                      if (i.segmentPath) return [...o, i.segmentPath];
                    }
                    return "string" != typeof i
                      ? [...o, i]
                      : 0 === s
                      ? (i.split("/").forEach((a, u) => {
                          (0 == u && "." === a) ||
                            (0 == u && "" === a
                              ? (n = !0)
                              : ".." === a
                              ? t++
                              : "" != a && o.push(a));
                        }),
                        o)
                      : [...o, i];
                  }, []);
                  return new Lv(n, t, r);
                })(n);
                if (i.toRoot()) return Ic(t.root, new q([], {}), t, r, o);
                const s = (function WT(e, t, n) {
                    if (e.isAbsolute) return new Ac(t.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const i = n.snapshot._urlSegment;
                      return new Ac(i, i === t.root, 0);
                    }
                    const r = ea(e.commands[0]) ? 0 : 1;
                    return (function KT(e, t, n) {
                      let r = e,
                        o = t,
                        i = n;
                      for (; i > o; ) {
                        if (((i -= o), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        o = r.segments.length;
                      }
                      return new Ac(r, !1, o - i);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      e.numberOfDoubleDots
                    );
                  })(i, t, e),
                  a = s.processChildren
                    ? ta(s.segmentGroup, s.index, i.commands)
                    : jv(s.segmentGroup, s.index, i.commands);
                return Ic(s.segmentGroup, a, t, r, o);
              })(l, this.currentUrlTree, n, d, null != c ? c : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = Jn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function eA(e) {
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
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (
              ((o =
                !0 === r
                  ? Object.assign({}, YI)
                  : !1 === r
                  ? Object.assign({}, XI)
                  : r),
              Jn(n))
            )
              return Dv(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return Dv(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new ti(
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
          scheduleNavigation(n, r, o, i, s) {
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
              : (v = new Promise((I, G) => {
                  (m = I), (y = G);
                }));
            const g = ++this.navigationId;
            let E;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (E =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? null !== (u = this.browserPageId) && void 0 !== u
                        ? u
                        : 0
                      : (null !== (l = this.browserPageId) && void 0 !== l
                          ? l
                          : 0) + 1))
                : (E = 0),
              this.setTransition({
                id: g,
                targetPageId: E,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: i,
                resolve: m,
                reject: y,
                promise: v,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              v.catch((I) => Promise.reject(I))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            var o, i;
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (o = this.currentNavigation) || void 0 === o
                    ? void 0
                    : o.finalUrl)) ||
              0 === s
                ? this.currentUrlTree ===
                    (null === (i = this.currentNavigation) || void 0 === i
                      ? void 0
                      : i.finalUrl) &&
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
            const o = new fv(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(o), n.resolve(!1);
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
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.route = r),
              (this.tabIndexAttribute = o),
              (this.renderer = i),
              (this.el = s),
              (this.commands = null),
              (this.onChanges = new At()),
              this.setTabIndexIfNotOnNativeEl("0");
          }
          setTabIndexIfNotOnNativeEl(n) {
            if (null != this.tabIndexAttribute) return;
            const r = this.renderer,
              o = this.el.nativeElement;
            null !== n
              ? r.setAttribute(o, "tabindex", n)
              : r.removeAttribute(o, "tabindex");
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
              skipLocationChange: to(this.skipLocationChange),
              replaceUrl: to(this.replaceUrl),
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
                  preserveFragment: to(this.preserveFragment),
                });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(it), O(eo), yo("tabindex"), O(Uo), O(on));
          }),
          (e.ɵdir = Ae({
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
      function to(e) {
        return "" === e || !!e;
      }
      class iC {}
      class sC {
        preload(t, n) {
          return T(null);
        }
      }
      let aC = (() => {
          class e {
            constructor(n, r, o, i) {
              (this.router = n),
                (this.injector = o),
                (this.preloadingStrategy = i),
                (this.loader = new rC(
                  o,
                  r,
                  (u) => n.triggerEvent(new hv(u)),
                  (u) => n.triggerEvent(new pv(u))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Qn((n) => n instanceof ti),
                  Wn(() => this.preload())
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
              const o = [];
              for (const i of r)
                if (i.loadChildren && !i.canLoad && i._loadedConfig) {
                  const s = i._loadedConfig;
                  o.push(this.processRoutes(s.module, s.routes));
                } else
                  i.loadChildren && !i.canLoad
                    ? o.push(this.preloadConfig(n, i))
                    : i.children && o.push(this.processRoutes(n, i.children));
              return Ie(o).pipe(
                io(),
                W((i) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? T(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  xe(
                    (i) => (
                      (r._loadedConfig = i),
                      this.processRoutes(i.module, i.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(it), b(xs), b(Le), b(iC));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Bc = (() => {
          class e {
            constructor(n, r, o = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = o),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (o.scrollPositionRestoration =
                  o.scrollPositionRestoration || "disabled"),
                (o.anchorScrolling = o.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Mc
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof ti &&
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
        uC = new B("ROUTER_FORROOT_GUARD"),
        oA = [
          tc,
          { provide: bv, useClass: Pv },
          {
            provide: it,
            useFactory: function lA(e, t, n, r, o, i, s = {}, a, u) {
              const l = new it(null, e, t, n, r, o, vv(i));
              return (
                a && (l.urlHandlingStrategy = a),
                u && (l.routeReuseStrategy = u),
                (function cA(e, t) {
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
              bv,
              ui,
              tc,
              Le,
              xs,
              Vc,
              Xn,
              [class WI {}, new Vt()],
              [class qI {}, new Vt()],
            ],
          },
          ui,
          {
            provide: eo,
            useFactory: function dA(e) {
              return e.routerState.root;
            },
            deps: [it],
          },
          aC,
          sC,
          class rA {
            preload(t, n) {
              return n().pipe(On(() => T(null)));
            }
          },
          { provide: Xn, useValue: { enableTracing: !1 } },
        ];
      function iA() {
        return new oy("Router", it);
      }
      let lC = (() => {
        class e {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                oA,
                cC(n),
                {
                  provide: uC,
                  useFactory: uA,
                  deps: [[it, new Vt(), new yr()]],
                },
                { provide: Xn, useValue: r || {} },
                {
                  provide: Zr,
                  useFactory: aA,
                  deps: [Gn, [new Eo(ec), new Vt()], Xn],
                },
                { provide: Bc, useFactory: sA, deps: [it, dS, Xn] },
                {
                  provide: iC,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : sC,
                },
                { provide: oy, multi: !0, useFactory: iA },
                [
                  Uc,
                  { provide: Ps, multi: !0, useFactory: fA, deps: [Uc] },
                  { provide: dC, useFactory: hA, deps: [Uc] },
                  { provide: Jm, multi: !0, useExisting: dC },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [cC(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(uC, 8), b(it, 8));
          }),
          (e.ɵmod = Ft({ type: e })),
          (e.ɵinj = vt({})),
          e
        );
      })();
      function sA(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new Bc(e, t, n);
      }
      function aA(e, t, n = {}) {
        return n.useHash ? new QO(e, t) : new Py(e, t);
      }
      function uA(e) {
        return "guarded";
      }
      function cC(e) {
        return [
          { provide: wD, multi: !0, useValue: e },
          { provide: Vc, multi: !0, useValue: e },
        ];
      }
      let Uc = (() => {
        class e {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new At());
          }
          appInitializer() {
            return this.injector.get(zO, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const o = new Promise((a) => (r = a)),
                i = this.injector.get(it),
                s = this.injector.get(Xn);
              return (
                "disabled" === s.initialNavigation
                  ? (i.setUpLocationChangeListener(), r(!0))
                  : "enabled" === s.initialNavigation ||
                    "enabledBlocking" === s.initialNavigation
                  ? ((i.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? T(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    i.initialNavigation())
                  : r(!0),
                o
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(Xn),
              o = this.injector.get(aC),
              i = this.injector.get(Bc),
              s = this.injector.get(it),
              a = this.injector.get(Wo);
            n === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                s.initialNavigation(),
              o.setUpPreloading(),
              i.init(),
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
            return new (n || e)(b(Le));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function fA(e) {
        return e.appInitializer.bind(e);
      }
      function hA(e) {
        return e.bootstrapListener.bind(e);
      }
      const dC = new B("Router Initializer");
      function er(e) {
        return !!e && (e instanceof oe || (X(e.lift) && X(e.subscribe)));
      }
      const fC = { now: () => (fC.delegate || Date).now(), delegate: void 0 };
      class mA extends At {
        constructor(t = 1 / 0, n = 1 / 0, r = fC) {
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
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
          } = this;
          n || (r.push(t), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(t);
        }
        _subscribe(t) {
          this._throwIfClosed(), this._trimBuffer();
          const n = this._innerSubscribe(t),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice();
          for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2)
            t.next(i[s]);
          return this._checkFinalizedStatuses(t), n;
        }
        _trimBuffer() {
          const {
              _bufferSize: t,
              _timestampProvider: n,
              _buffer: r,
              _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * t;
          if ((t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            const s = n.now();
            let a = 0;
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
            a && r.splice(0, a + 1);
          }
        }
      }
      function hC(e, t, n) {
        var r, o;
        let i,
          s = !1;
        return (
          e && "object" == typeof e
            ? ((i = null !== (r = e.bufferSize) && void 0 !== r ? r : 1 / 0),
              (t = null !== (o = e.windowTime) && void 0 !== o ? o : 1 / 0),
              (s = !!e.refCount),
              (n = e.scheduler))
            : (i = null != e ? e : 1 / 0),
          jd({
            connector: () => new mA(i, t, n),
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: s,
          })
        );
      }
      class fi {}
      let pC = (() => {
        class e extends fi {
          getTranslation(n) {
            return T({});
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = $i(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class $c {}
      let gC = (() => {
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
        let o,
          i,
          s,
          n = typeof e;
        if (n == typeof t && "object" == n) {
          if (!Array.isArray(e)) {
            if (Array.isArray(t)) return !1;
            for (i in ((s = Object.create(null)), e)) {
              if (!la(e[i], t[i])) return !1;
              s[i] = !0;
            }
            for (i in t) if (!(i in s) && void 0 !== t[i]) return !1;
            return !0;
          }
          if (!Array.isArray(t)) return !1;
          if ((o = e.length) == t.length) {
            for (i = 0; i < o; i++) if (!la(e[i], t[i])) return !1;
            return !0;
          }
        }
        return !1;
      }
      function Sn(e) {
        return null != e;
      }
      function zc(e) {
        return e && "object" == typeof e && !Array.isArray(e);
      }
      function mC(e, t) {
        let n = Object.assign({}, e);
        return (
          zc(e) &&
            zc(t) &&
            Object.keys(t).forEach((r) => {
              zc(t[r])
                ? r in e
                  ? (n[r] = mC(e[r], t[r]))
                  : Object.assign(n, { [r]: t[r] })
                : Object.assign(n, { [r]: t[r] });
            }),
          n
        );
      }
      class ca {}
      let yC = (() => {
        class e extends ca {
          constructor() {
            super(...arguments),
              (this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g);
          }
          interpolate(n, r) {
            let o;
            return (
              (o =
                "string" == typeof n
                  ? this.interpolateString(n, r)
                  : "function" == typeof n
                  ? this.interpolateFunction(n, r)
                  : n),
              o
            );
          }
          getValue(n, r) {
            let o = "string" == typeof r ? r.split(".") : [r];
            r = "";
            do {
              (r += o.shift()),
                !Sn(n) || !Sn(n[r]) || ("object" != typeof n[r] && o.length)
                  ? o.length
                    ? (r += ".")
                    : (n = void 0)
                  : ((n = n[r]), (r = ""));
            } while (o.length);
            return n;
          }
          interpolateFunction(n, r) {
            return n(r);
          }
          interpolateString(n, r) {
            return r
              ? n.replace(this.templateMatcher, (o, i) => {
                  let s = this.getValue(r, i);
                  return Sn(s) ? s : o;
                })
              : n;
          }
        }
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = $i(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class da {}
      let vC = (() => {
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
              return (t || (t = $i(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class CC {
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
        Qc = new B("DEFAULT_LANGUAGE"),
        Wc = new B("USE_EXTEND");
      let no = (() => {
          class e {
            constructor(n, r, o, i, s, a = !0, u = !1, l = !1, c) {
              (this.store = n),
                (this.currentLoader = r),
                (this.compiler = o),
                (this.parser = i),
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
                  r.pipe(pn(1)).subscribe((o) => {
                    this.changeDefaultLang(n);
                  }))
                : this.changeDefaultLang(n);
            }
            getDefaultLang() {
              return this.defaultLang;
            }
            use(n) {
              if (n === this.currentLang) return T(this.translations[n]);
              let r = this.retrieveTranslations(n);
              return void 0 !== r
                ? (this.currentLang || (this.currentLang = n),
                  r.pipe(pn(1)).subscribe((o) => {
                    this.changeLang(n);
                  }),
                  r)
                : (this.changeLang(n), T(this.translations[n]));
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
              const r = this.currentLoader.getTranslation(n).pipe(hC(1), pn(1));
              return (
                (this.loadingTranslations = r.pipe(
                  W((o) => this.compiler.compileTranslations(o, n)),
                  hC(1),
                  pn(1)
                )),
                this.loadingTranslations.subscribe({
                  next: (o) => {
                    (this.translations[n] =
                      this.extend && this.translations[n]
                        ? Object.assign(
                            Object.assign({}, o),
                            this.translations[n]
                          )
                        : o),
                      this.updateLangs(),
                      (this.pending = !1);
                  },
                  error: (o) => {
                    this.pending = !1;
                  },
                }),
                r
              );
            }
            setTranslation(n, r, o = !1) {
              (r = this.compiler.compileTranslations(r, n)),
                (this.translations[n] =
                  (o || this.extend) && this.translations[n]
                    ? mC(this.translations[n], r)
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
            getParsedResult(n, r, o) {
              let i;
              if (r instanceof Array) {
                let s = {},
                  a = !1;
                for (let u of r)
                  (s[u] = this.getParsedResult(n, u, o)), er(s[u]) && (a = !0);
                return a
                  ? (function gA(...e) {
                      const t = Nd(e),
                        { args: n, keys: r } = ov(e),
                        o = new oe((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let u = s,
                            l = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            Rt(n[c]).subscribe(
                              new Oe(
                                i,
                                (f) => {
                                  d || ((d = !0), l--), (a[c] = f);
                                },
                                () => u--,
                                void 0,
                                () => {
                                  (!u || !d) &&
                                    (l || i.next(r ? sv(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(iv(t)) : o;
                    })(r.map((l) => (er(s[l]) ? s[l] : T(s[l])))).pipe(
                      W((l) => {
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
                  (i = this.parser.interpolate(this.parser.getValue(n, r), o)),
                void 0 === i &&
                  null != this.defaultLang &&
                  this.defaultLang !== this.currentLang &&
                  this.useDefaultLang &&
                  (i = this.parser.interpolate(
                    this.parser.getValue(
                      this.translations[this.defaultLang],
                      r
                    ),
                    o
                  )),
                void 0 === i)
              ) {
                let s = { key: r, translateService: this };
                void 0 !== o && (s.interpolateParams = o),
                  (i = this.missingTranslationHandler.handle(s));
              }
              return void 0 !== i ? i : r;
            }
            get(n, r) {
              if (!Sn(n) || !n.length)
                throw new Error('Parameter "key" required');
              if (this.pending)
                return this.loadingTranslations.pipe(
                  Wn((o) =>
                    er((o = this.getParsedResult(o, n, r))) ? o : T(o)
                  )
                );
              {
                let o = this.getParsedResult(
                  this.translations[this.currentLang],
                  n,
                  r
                );
                return er(o) ? o : T(o);
              }
            }
            getStreamOnTranslationChange(n, r) {
              if (!Sn(n) || !n.length)
                throw new Error('Parameter "key" required');
              return ei(
                Qs(() => this.get(n, r)),
                this.onTranslationChange.pipe(
                  cn((o) => {
                    const i = this.getParsedResult(o.translations, n, r);
                    return "function" == typeof i.subscribe ? i : T(i);
                  })
                )
              );
            }
            stream(n, r) {
              if (!Sn(n) || !n.length)
                throw new Error('Parameter "key" required');
              return ei(
                Qs(() => this.get(n, r)),
                this.onLangChange.pipe(
                  cn((o) => {
                    const i = this.getParsedResult(o.translations, n, r);
                    return er(i) ? i : T(i);
                  })
                )
              );
            }
            instant(n, r) {
              if (!Sn(n) || !n.length)
                throw new Error('Parameter "key" required');
              let o = this.getParsedResult(
                this.translations[this.currentLang],
                n,
                r
              );
              if (er(o)) {
                if (n instanceof Array) {
                  let i = {};
                  return (
                    n.forEach((s, a) => {
                      i[n[a]] = n[a];
                    }),
                    i
                  );
                }
                return n;
              }
              return o;
            }
            set(n, r, o = this.currentLang) {
              (this.translations[o][n] = this.compiler.compile(r, o)),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: o,
                  translations: this.translations[o],
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
                b(CC),
                b(fi),
                b(da),
                b(ca),
                b($c),
                b(Gc),
                b(qc),
                b(Wc),
                b(Qc)
              );
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        hi = (() => {
          class e {
            constructor(n, r) {
              (this.translate = n),
                (this._ref = r),
                (this.value = ""),
                (this.lastKey = null),
                (this.lastParams = []);
            }
            updateValue(n, r, o) {
              let i = (s) => {
                (this.value = void 0 !== s ? s : n),
                  (this.lastKey = n),
                  this._ref.markForCheck();
              };
              if (o) {
                let s = this.translate.getParsedResult(o, n, r);
                er(s.subscribe) ? s.subscribe(i) : i(s);
              }
              this.translate.get(n, r).subscribe(i);
            }
            transform(n, ...r) {
              if (!n || !n.length) return n;
              if (la(n, this.lastKey) && la(r, this.lastParams))
                return this.value;
              let o;
              if (Sn(r[0]) && r.length)
                if ("string" == typeof r[0] && r[0].length) {
                  let i = r[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                  try {
                    o = JSON.parse(i);
                  } catch (s) {
                    throw new SyntaxError(
                      `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${r[0]}`
                    );
                  }
                } else
                  "object" == typeof r[0] && !Array.isArray(r[0]) && (o = r[0]);
              return (
                (this.lastKey = n),
                (this.lastParams = r),
                this.updateValue(n, o),
                this._dispose(),
                this.onTranslationChange ||
                  (this.onTranslationChange =
                    this.translate.onTranslationChange.subscribe((i) => {
                      this.lastKey &&
                        i.lang === this.translate.currentLang &&
                        ((this.lastKey = null),
                        this.updateValue(n, o, i.translations));
                    })),
                this.onLangChange ||
                  (this.onLangChange = this.translate.onLangChange.subscribe(
                    (i) => {
                      this.lastKey &&
                        ((this.lastKey = null),
                        this.updateValue(n, o, i.translations));
                    }
                  )),
                this.onDefaultLangChange ||
                  (this.onDefaultLangChange =
                    this.translate.onDefaultLangChange.subscribe(() => {
                      this.lastKey &&
                        ((this.lastKey = null), this.updateValue(n, o));
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
              return new (n || e)(O(no, 16), O(Ss, 16));
            }),
            (e.ɵpipe = He({ name: "translate", type: e, pure: !1 })),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        yA = (() => {
          class e {
            static forRoot(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.loader || { provide: fi, useClass: pC },
                  n.compiler || { provide: da, useClass: vC },
                  n.parser || { provide: ca, useClass: yC },
                  n.missingTranslationHandler || { provide: $c, useClass: gC },
                  CC,
                  { provide: qc, useValue: n.isolate },
                  { provide: Gc, useValue: n.useDefaultLang },
                  { provide: Wc, useValue: n.extend },
                  { provide: Qc, useValue: n.defaultLanguage },
                  no,
                ],
              };
            }
            static forChild(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.loader || { provide: fi, useClass: pC },
                  n.compiler || { provide: da, useClass: vC },
                  n.parser || { provide: ca, useClass: yC },
                  n.missingTranslationHandler || { provide: $c, useClass: gC },
                  { provide: qc, useValue: n.isolate },
                  { provide: Gc, useValue: n.useDefaultLang },
                  { provide: Wc, useValue: n.extend },
                  { provide: Qc, useValue: n.defaultLanguage },
                  no,
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
      const vA = ["name"];
      let CA = (() => {
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
            return new (n || e)(O(no));
          }),
          (e.ɵcmp = Xt({
            type: e,
            selectors: [["app-main-view"]],
            viewQuery: function (n, r) {
              if ((1 & n && Tm(vA, 5), 2 & n)) {
                let o;
                Ds(
                  (o = (function ws() {
                    return (function IP(e, t) {
                      return e[19].queries[t].queryList;
                    })(C(), af());
                  })())
                ) && (r.nameKey = o.first);
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
                (_(0, "div", 0),
                _(1, "h1"),
                x(2),
                se(3, "translate"),
                D(),
                _(4, "div", 1),
                _(5, "p"),
                x(6),
                se(7, "translate"),
                D(),
                _(8, "p"),
                x(9),
                se(10, "translate"),
                D(),
                _(11, "p"),
                x(12),
                se(13, "translate"),
                D(),
                D(),
                _(14, "div", 2),
                _(15, "label", 3),
                x(16),
                se(17, "translate"),
                D(),
                We(18, "input", 4, 5),
                D(),
                _(20, "button", 6),
                zt("click", function () {
                  return r.startQuiz();
                }),
                x(21),
                se(22, "translate"),
                D(),
                D()),
                2 & n &&
                  (P(2),
                  Z(ae(3, 6, "home.title")),
                  P(4),
                  Z(ae(7, 8, "home.textOne")),
                  P(3),
                  Z(ae(10, 10, "home.textTwo")),
                  P(3),
                  Z(ae(13, 12, "home.textThree")),
                  P(4),
                  Z(ae(17, 14, "home.textName")),
                  P(5),
                  ve(" ", ae(22, 16, "home.button"), " "));
            },
            directives: [Yn],
            pipes: [hi],
            styles: [
              "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentMain[_ngcontent-%COMP%]{margin:180px auto 0;padding:0;height:500px;max-width:1920px;max-height:1080px;display:flex;flex-direction:column;justify-content:space-between;font-family:Arial,sans-serif;color:#074430;text-align:center}.contentMain[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase;text-align:center;font-size:45px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:10px;font-size:30px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-of-type(2){color:#d61919;font-weight:700}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;flex-direction:column}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:27px;padding:20px}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:0 auto;width:400px;height:30px;font-size:22px;background-color:#d9f3f0;border:3px dotted #62928c;border-radius:5px}.contentMain[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:0 auto;display:block;padding:15px 25px;font-size:30px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}@media (max-width: 768px){.contentMain[_ngcontent-%COMP%]{height:400px}.contentMain[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:35px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:25px}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding:10px;font-size:25px}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px dotted #62928c;font-size:20px}.contentMain[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:25px;padding:12px 20px}}@media (max-width: 425px){.contentMain[_ngcontent-%COMP%]{margin:150px auto 0}.contentMain[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:25px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:22px}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:300px;font-size:19px}.contentMain[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:20px;padding:12px 20px}}@media (max-width: 375px){.contentMain[_ngcontent-%COMP%]{margin:130px auto 0}.contentMain[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:22px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:20px}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:260px;font-size:17px}.contentMain[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:17px;padding:8px 20px}}",
            ],
          })),
          e
        );
      })();
      class _C {}
      class DC {}
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
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
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
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
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
      class _A {
        encodeKey(t) {
          return wC(t);
        }
        encodeValue(t) {
          return wC(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const wA = /%(\d[a-f0-9])/gi,
        MA = {
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
      function wC(e) {
        return encodeURIComponent(e).replace(wA, (t, n) => {
          var r;
          return null !== (r = MA[n]) && void 0 !== r ? r : t;
        });
      }
      function MC(e) {
        return `${e}`;
      }
      class Tn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new _A()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function DA(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
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
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
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
          const n = new Tn({ encoder: this.encoder });
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
                    n.push(MC(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(MC(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class EA {
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
      function EC(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function bC(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function PC(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class pi {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function bA(e) {
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
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new hn()),
            this.context || (this.context = new EA()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Tn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : EC(this.body) ||
              bC(this.body) ||
              PC(this.body) ||
              (function PA(e) {
                return (
                  "undefined" != typeof URLSearchParams &&
                  e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Tn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || PC(this.body)
            ? null
            : bC(this.body)
            ? this.body.type || null
            : EC(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Tn
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
            o = t.url || this.url,
            i = t.responseType || this.responseType,
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
            new pi(r, o, s, {
              params: c,
              headers: l,
              context: d,
              reportProgress: u,
              responseType: i,
              withCredentials: a,
            })
          );
        }
      }
      var De = (() => (
        ((De = De || {})[(De.Sent = 0)] = "Sent"),
        (De[(De.UploadProgress = 1)] = "UploadProgress"),
        (De[(De.ResponseHeader = 2)] = "ResponseHeader"),
        (De[(De.DownloadProgress = 3)] = "DownloadProgress"),
        (De[(De.Response = 4)] = "Response"),
        (De[(De.User = 5)] = "User"),
        De
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
          super(t), (this.type = De.ResponseHeader);
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
            (this.type = De.Response),
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
      class OC extends Kc {
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
          request(n, r, o = {}) {
            let i;
            if (n instanceof pi) i = n;
            else {
              let u, l;
              (u = o.headers instanceof hn ? o.headers : new hn(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof Tn
                      ? o.params
                      : new Tn({ fromObject: o.params })),
                (i = new pi(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = T(i).pipe(Wn((u) => this.handler.handle(u)));
            if (n instanceof pi || "events" === o.observe) return s;
            const a = s.pipe(Qn((u) => u instanceof fa));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      W((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      W((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      W((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(W((u) => u.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
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
              params: new Tn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Jc(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Jc(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Jc(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(_C));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class xC {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const SC = new B("HTTP_INTERCEPTORS");
      let OA = (() => {
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
      const xA = /^\)\]\}',?\n/;
      let TC = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new oe((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = 1223 === o.status ? 204 : o.status,
                    p = o.statusText || "OK",
                    m = new hn(o.getAllResponseHeaders()),
                    y =
                      (function SA(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
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
                    (v = void 0 === o.response ? o.responseText : o.response),
                    0 === p && (p = v ? 200 : 0);
                  let g = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof v) {
                    const E = v;
                    v = v.replace(xA, "");
                    try {
                      v = "" !== v ? JSON.parse(v) : null;
                    } catch (I) {
                      (v = E), g && ((g = !1), (v = { error: I, text: v }));
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
                        new OC({
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
                    m = new OC({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(m);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: De.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      !!o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: De.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", u),
                o.addEventListener("error", l),
                o.addEventListener("timeout", l),
                o.addEventListener("abort", l),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: De.Sent }),
                () => {
                  o.removeEventListener("error", l),
                    o.removeEventListener("abort", l),
                    o.removeEventListener("load", u),
                    o.removeEventListener("timeout", l),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(qy));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Xc = new B("XSRF_COOKIE_NAME"),
        ed = new B("XSRF_HEADER_NAME");
      class IC {}
      let TA = (() => {
          class e {
            constructor(n, r, o) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = o),
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
              return new (n || e)(b(rt), b(Os), b(Xc));
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
              const o = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                o.startsWith("http://") ||
                o.startsWith("https://")
              )
                return r.handle(n);
              const i = this.tokenService.getToken();
              return (
                null !== i &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, i) })),
                r.handle(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(IC), b(ed));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        IA = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(SC, []);
                this.chain = r.reduceRight(
                  (o, i) => new xC(o, i),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(DC), b(Le));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        AA = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: td, useClass: OA }],
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
                { provide: SC, useExisting: td, multi: !0 },
                { provide: IC, useClass: TA },
                { provide: Xc, useValue: "XSRF-TOKEN" },
                { provide: ed, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        RA = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ft({ type: e })),
            (e.ɵinj = vt({
              providers: [
                Yc,
                { provide: _C, useClass: IA },
                TC,
                { provide: DC, useExisting: TC },
              ],
              imports: [
                [
                  AA.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            e
          );
        })(),
        AC = (() => {
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
              return new (n || e)(b(Yc));
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
        NA = (() => {
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
              return new (n || e)(O(on), O(Uo));
            }),
            (e.ɵdir = Ae({
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
      function FA(e, t) {
        if (1 & e) {
          const n = fl();
          _(0, "ul"),
            _(1, "li", 7),
            zt("click", function () {
              const i = Ua(n).$implicit,
                s = pl();
              return s.getAnswer(s.currentQuestion + 1, i);
            }),
            x(2),
            D(),
            D();
        }
        if (2 & e) {
          const n = t.$implicit;
          P(1), ze("isCorrect", n.correct), P(1), ve(" ", n.text, " ");
        }
      }
      const gi = function () {
        return {
          color: "green",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
        };
      };
      function jA(e, t) {
        1 & e &&
          (_(0, "div", 8),
          _(1, "p"),
          x(2),
          se(3, "translate"),
          D(),
          We(4, "img", 9),
          D()),
          2 & e && (P(2), Z(ae(3, 1, "home.summaryTextOne")));
      }
      function VA(e, t) {
        1 & e &&
          (_(0, "div", 10),
          _(1, "p"),
          x(2),
          se(3, "translate"),
          D(),
          We(4, "img", 11),
          D()),
          2 & e && (P(2), Z(ae(3, 1, "home.summaryTextTwo")));
      }
      function HA(e, t) {
        1 & e &&
          (_(0, "div", 12),
          _(1, "p"),
          x(2),
          se(3, "translate"),
          D(),
          We(4, "img", 13),
          D()),
          2 & e && (P(2), Z(ae(3, 1, "home.summaryTextThree")));
      }
      const BA = [
        { path: "", redirectTo: "main", pathMatch: "full" },
        { path: "main", component: CA },
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
                return new (n || e)(O(AC), O(nd));
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
                    (_(0, "div", 0),
                    _(1, "div", 1),
                    _(2, "h3"),
                    x(3),
                    se(4, "translate"),
                    D(),
                    _(5, "h4"),
                    x(6),
                    se(7, "translate"),
                    D(),
                    _(8, "p"),
                    x(9),
                    se(10, "translate"),
                    D(),
                    D(),
                    _(11, "div", 2),
                    _(12, "h3"),
                    x(13),
                    se(14, "translate"),
                    D(),
                    _(15, "h4"),
                    x(16),
                    D(),
                    jr(17, FA, 3, 2, "ul", 3),
                    D(),
                    _(18, "div", 4),
                    _(19, "button", 5),
                    zt("click", function () {
                      return r.nextQuestion();
                    }),
                    x(20),
                    se(21, "translate"),
                    D(),
                    _(22, "button", 6),
                    zt("click", function () {
                      return r.sendMessage();
                    }),
                    x(23),
                    se(24, "translate"),
                    D(),
                    D(),
                    D()),
                    2 & n &&
                      (P(3),
                      Z(ae(4, 13, "home.title")),
                      P(3),
                      $n(
                        "",
                        ae(7, 15, "home.hello"),
                        " ",
                        r.name,
                        " \u{1f44b}"
                      ),
                      P(3),
                      vl(
                        " ",
                        ae(10, 17, "home.question"),
                        " ",
                        r.currentQuestion + 1,
                        " z ",
                        r.allQuestions.length,
                        " "
                      ),
                      P(4),
                      $n(
                        "",
                        ae(14, 19, "home.questionNo"),
                        " ",
                        r.currentQuestion + 1,
                        ""
                      ),
                      P(3),
                      Z(
                        null == r.allQuestions[r.currentQuestion]
                          ? null
                          : r.allQuestions[r.currentQuestion].question
                      ),
                      P(1),
                      ze(
                        "ngForOf",
                        null == r.allQuestions[r.currentQuestion]
                          ? null
                          : r.allQuestions[r.currentQuestion].options
                      ),
                      P(2),
                      ze(
                        "disabled",
                        r.currentQuestion === r.allQuestions.length - 1
                      ),
                      P(1),
                      ve(" ", ae(21, 21, "home.next"), " "),
                      P(3),
                      ve(" ", ae(24, 23, "home.summary"), " "));
                },
                directives: [cc, NA, Yn],
                pipes: [hi],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentQuestions[_ngcontent-%COMP%]{width:850px;height:654px;max-width:1920px;max-height:1080px;position:absolute;top:120px;left:calc(50% - 425px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;display:flex;flex-direction:column;justify-content:space-around}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding:10px 30px;font-size:25px;text-decoration:underline}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding:10px 30px;font-size:22px;font-weight:400}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{position:absolute;top:40px;right:60px;font-size:20px;font-style:italic}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{width:700px;height:350px;position:relative;left:calc(50% - 350px);display:flex;flex-direction:column;justify-content:space-between}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:20px;font-size:27px;text-align:center;text-decoration:underline}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding-left:20px;font-size:25px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px;list-style:none;font-size:20px;cursor:pointer;border:2px solid transparent}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{border-color:#083d36;border-radius:5px}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:15px 25px;font-size:21px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[disabled][_ngcontent-%COMP%]{opacity:.5}@media (max-width: 851px){.contentQuestions[_ngcontent-%COMP%]{width:80vw;height:550px;left:calc(50% - 40vw)}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:19px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{right:40px;font-size:19px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{width:80vw;left:calc(50% - 40vw);height:250px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:10px;font-size:25px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding-left:35px;font-size:22px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:85%;margin-left:30px;padding:5px;font-size:19px}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:12px 18px;font-size:18px}}@media (max-width: 425px){.contentQuestions[_ngcontent-%COMP%]{width:90vw;height:600px;left:calc(50% - 45vw)}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:18px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:17px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{height:320px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding-left:10px;font-size:18px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:95%;margin-left:5px;font-size:18px}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:16px}}@media (max-width: 375px){.contentQuestions[_ngcontent-%COMP%]{height:550px;top:100px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding:10px 20px;font-size:17px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding:10px 20px;font-size:16px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{top:75px;right:30px;font-size:15px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:18px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:16px}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:7px 12px;font-size:14px}}",
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
                return new (n || e)(O(AC), O(nd));
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
                  ["src", "assets/pic/mr.jpg", "alt", ""],
                  [1, "second"],
                  ["src", "assets/pic/relief.jpg", "alt", ""],
                  [1, "third"],
                  ["src", "assets/pic/haczyk.jpg", "alt", ""],
                  [1, "partTwo"],
                  [1, "fourth"],
                  ["src", "assets/pic/maskotka.jpeg", "alt", ""],
                  [1, "fifth"],
                  ["src", "assets/pic/dywan.jpg", "alt", ""],
                ],
                template: function (n, r) {
                  1 & n &&
                    (_(0, "div", 0),
                    _(1, "h1"),
                    x(2),
                    se(3, "translate"),
                    D(),
                    _(4, "div", 1),
                    _(5, "div", 2),
                    _(6, "div", 3),
                    _(7, "div", 4),
                    _(8, "h2"),
                    x(9),
                    D(),
                    _(10, "ul"),
                    _(11, "li"),
                    x(12),
                    D(),
                    _(13, "li", 5),
                    x(14),
                    D(),
                    _(15, "li"),
                    x(16),
                    D(),
                    D(),
                    _(17, "p"),
                    x(18),
                    D(),
                    D(),
                    We(19, "img", 6),
                    D(),
                    _(20, "div", 7),
                    _(21, "div", 4),
                    _(22, "h2"),
                    x(23),
                    D(),
                    _(24, "ul"),
                    _(25, "li", 5),
                    x(26),
                    D(),
                    _(27, "li"),
                    x(28),
                    D(),
                    _(29, "li"),
                    x(30),
                    D(),
                    D(),
                    _(31, "p"),
                    x(32),
                    D(),
                    D(),
                    We(33, "img", 8),
                    D(),
                    _(34, "div", 9),
                    _(35, "div", 4),
                    _(36, "h2"),
                    x(37),
                    D(),
                    _(38, "ul"),
                    _(39, "li", 5),
                    x(40),
                    D(),
                    _(41, "li"),
                    x(42),
                    D(),
                    _(43, "li"),
                    x(44),
                    D(),
                    D(),
                    _(45, "p"),
                    x(46),
                    D(),
                    D(),
                    We(47, "img", 10),
                    D(),
                    D(),
                    _(48, "div", 11),
                    _(49, "div", 12),
                    _(50, "div", 4),
                    _(51, "h2"),
                    x(52),
                    D(),
                    _(53, "ul"),
                    _(54, "li"),
                    x(55),
                    D(),
                    _(56, "li"),
                    x(57),
                    D(),
                    _(58, "li", 5),
                    x(59),
                    D(),
                    D(),
                    _(60, "p"),
                    x(61),
                    D(),
                    D(),
                    We(62, "img", 13),
                    D(),
                    _(63, "div", 14),
                    _(64, "div", 4),
                    _(65, "h2"),
                    x(66),
                    D(),
                    _(67, "ul"),
                    _(68, "li"),
                    x(69),
                    D(),
                    _(70, "li"),
                    x(71),
                    D(),
                    _(72, "li", 5),
                    x(73),
                    D(),
                    D(),
                    _(74, "p"),
                    x(75),
                    D(),
                    D(),
                    We(76, "img", 15),
                    D(),
                    D(),
                    D(),
                    D()),
                    2 & n &&
                      (P(2),
                      Z(ae(3, 31, "home.checkAnswer")),
                      P(7),
                      Z(r.allQuestions[0].question),
                      P(3),
                      Z(r.allQuestions[0].options[0].text),
                      P(1),
                      ze("ngStyle", Gr(33, gi)),
                      P(1),
                      ve(" ", r.allQuestions[0].options[1].text, " "),
                      P(2),
                      Z(r.allQuestions[0].options[2].text),
                      P(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionOne,
                        ""
                      ),
                      P(5),
                      Z(r.allQuestions[1].question),
                      P(2),
                      ze("ngStyle", Gr(34, gi)),
                      P(1),
                      ve(" ", r.allQuestions[1].options[0].text, " "),
                      P(2),
                      Z(r.allQuestions[1].options[1].text),
                      P(2),
                      Z(r.allQuestions[1].options[2].text),
                      P(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionTwo,
                        ""
                      ),
                      P(5),
                      Z(r.allQuestions[2].question),
                      P(2),
                      ze("ngStyle", Gr(35, gi)),
                      P(1),
                      ve(" ", r.allQuestions[2].options[0].text, " "),
                      P(2),
                      Z(r.allQuestions[2].options[1].text),
                      P(2),
                      Z(r.allQuestions[2].options[2].text),
                      P(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionThree,
                        ""
                      ),
                      P(6),
                      Z(r.allQuestions[3].question),
                      P(3),
                      Z(r.allQuestions[3].options[0].text),
                      P(2),
                      Z(r.allQuestions[3].options[1].text),
                      P(1),
                      ze("ngStyle", Gr(36, gi)),
                      P(1),
                      ve(" ", r.allQuestions[3].options[2].text, " "),
                      P(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionFour,
                        ""
                      ),
                      P(5),
                      Z(r.allQuestions[4].question),
                      P(3),
                      Z(r.allQuestions[4].options[0].text),
                      P(2),
                      Z(r.allQuestions[4].options[1].text),
                      P(1),
                      ze("ngStyle", Gr(37, gi)),
                      P(1),
                      ve(" ", r.allQuestions[4].options[2].text, " "),
                      P(2),
                      ve(
                        "\u{1f449} Twoja odpowied\u017a: ",
                        r.userSelectionFive,
                        ""
                      ));
                },
                directives: [By],
                pipes: [hi],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentResponse[_ngcontent-%COMP%]{width:94vw;max-width:1920px;position:relative;top:100px;left:calc(50% - 47vw);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;text-align:center}.contentResponse[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:20px 10px 10px;font-size:27px;position:relative;text-decoration:underline;text-underline-offset:5px;top:3px;left:0}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{width:47%;padding:5px;display:flex;flex-direction:column;justify-content:space-between}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:10px;display:flex;flex-direction:row;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:470px;display:flex;flex-direction:column;justify-content:space-around;text-align:left}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:20px;padding:0 10px 10px 0;line-height:30px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px 10px 10px 5px;font-size:17px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0 0 -20px;font-size:16px;line-height:25px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{padding-top:100px;height:180px;border-radius:5px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:280px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{padding-bottom:20px;justify-content:space-around}@media (max-width: 1024px){.contentResponse[_ngcontent-%COMP%]{width:90vw;max-width:1920px;position:relative;top:100px;left:calc(50% - 45vw);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;text-align:center}.contentResponse[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:20px 10px;font-size:22px;position:relative;text-decoration:underline;text-underline-offset:5px;top:3px;left:0}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{margin:0 auto;width:90%;padding:5px;display:flex;flex-direction:column;justify-content:space-between}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:10px;display:flex;flex-direction:row;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:470px;display:flex;flex-direction:column;justify-content:space-around;text-align:left}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:19px;line-height:30px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px 10px 10px 5px;font-size:16px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0 0 -20px;font-size:15px;line-height:25px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{padding-top:20px;height:180px;border-radius:5px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:280px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{justify-content:space-around}}@media (max-width: 425px){.contentResponse[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:20px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{width:90%}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{flex-direction:column}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:100%}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:17px;line-height:27px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:5px;font-size:15px;line-height:25px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:15px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;margin:0 auto;width:50vw}}@media (max-width: 320px){.contentResponse[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:20px 10px 10px;font-size:18px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:16px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:60vw}}",
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
                return new (n || e)(O(nd));
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
                    "assets/pic/poplatane.jpg",
                    "alt",
                    "popl\u0105tane sznurki",
                  ],
                  [1, "to80Percent"],
                  ["src", "assets/pic/prawie.jpg", "alt", "owieczka w koszyku"],
                  [1, "to100Percent"],
                  ["src", "assets/pic/mistrz.jpg", "alt", "pszcz\xf3\u0142ka"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (_(0, "div", 0),
                    _(1, "div", 1),
                    _(2, "div", 2),
                    _(3, "h2"),
                    x(4),
                    se(5, "translate"),
                    D(),
                    _(6, "h3"),
                    x(7),
                    se(8, "translate"),
                    D(),
                    _(9, "p"),
                    x(10),
                    se(11, "translate"),
                    D(),
                    _(12, "p"),
                    x(13),
                    se(14, "translate"),
                    D(),
                    _(15, "p"),
                    x(16),
                    se(17, "translate"),
                    D(),
                    D(),
                    _(18, "div", 3),
                    jr(19, jA, 5, 3, "div", 4),
                    jr(20, VA, 5, 3, "div", 5),
                    jr(21, HA, 5, 3, "div", 6),
                    D(),
                    D(),
                    _(22, "button", 7),
                    x(23),
                    se(24, "translate"),
                    D(),
                    D()),
                    2 & n &&
                      (P(4),
                      Z(ae(5, 12, "home.congratulations")),
                      P(3),
                      Z(ae(8, 14, "home.result")),
                      P(3),
                      $n(
                        "",
                        ae(11, 16, "home.correct"),
                        " ",
                        r.correctAnswer,
                        ""
                      ),
                      P(3),
                      $n(
                        "",
                        ae(14, 18, "home.incorrect"),
                        "",
                        r.incorrectAnswer,
                        ""
                      ),
                      P(3),
                      $n(
                        "",
                        ae(17, 20, "home.percent"),
                        " ",
                        100 * r.visible,
                        "%"
                      ),
                      P(3),
                      ze("ngIf", r.visible <= 0.5),
                      P(1),
                      ze("ngIf", r.visible > 0.5 && r.visible <= 0.8),
                      P(1),
                      ze("ngIf", r.visible > 0.8),
                      P(2),
                      Z(ae(24, 22, "home.seeResult")));
                },
                directives: [jy, Yn],
                pipes: [hi],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentSummary[_ngcontent-%COMP%]{width:1200px;height:700px;max-width:1920px;max-height:1080px;position:absolute;top:120px;left:calc(50% - 600px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;display:flex;flex-direction:column;justify-content:space-around;text-align:center}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]{position:relative;top:100px;height:200px;width:500px;display:flex;flex-direction:column;justify-content:space-between}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{line-height:40px;padding:20px;font-size:30px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding:10px;font-size:25px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:10px;font-size:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]{margin-top:20px;position:relative;top:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:550px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:35px;margin-bottom:10px;font-size:25px;font-weight:700}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:20px auto 0;display:block;width:320px;border-radius:7px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   .to50Percent[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:30px;width:450px}.contentSummary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:0 auto;display:block;padding:15px 25px;font-size:21px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}@media (max-width: 768px){.contentSummary[_ngcontent-%COMP%]{width:90vw;left:calc(50% - 45vw)}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{flex-direction:column}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]{margin:0 auto;top:0px;height:200px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{line-height:35px;padding:10px;font-size:25px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding:5px;font-size:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:5px;font-size:18px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]{margin:0 auto}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:550px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:30px;font-size:20px;font-weight:700}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:10px auto;width:200px;border-radius:7px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   .to50Percent[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:300px}.contentSummary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:12px 17px;font-size:18px}}@media (max-width: 425px){.contentSummary[_ngcontent-%COMP%]{top:100px;height:85vh}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]{width:90vw}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{line-height:30px;font-size:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:18px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:17px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:90vw}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:28px;font-size:18px}.contentSummary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:17px}}@media (max-width: 375px){.contentSummary[_ngcontent-%COMP%]{top:100px;height:80vh}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]{width:90vw}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:17px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:16px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:15px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:180px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   .to50Percent[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:265px}.contentSummary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:15px}}",
                ],
              })),
              e
            );
          })(),
        },
      ];
      let UA = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ft({ type: e })),
          (e.ɵinj = vt({ imports: [[lC.forRoot(BA)], lC] })),
          e
        );
      })();
      function $A(e, t) {
        if ((1 & e && (_(0, "option", 6), x(1), D()), 2 & e)) {
          const n = t.$implicit,
            r = pl();
          ze("value", n)("selected", n === r.translate.currentLang),
            P(1),
            ve(" ", n, " ");
        }
      }
      let zA = (() => {
          class e {
            constructor(n) {
              (this.translate = n),
                n.addLangs(["pl", "en"]),
                n.setDefaultLang("pl"),
                (this.logoPath = "assets/pic/logo.jpg");
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(no));
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
                  const o = fl();
                  _(0, "div", 0),
                    We(1, "img", 1),
                    _(2, "button", 2),
                    x(3),
                    se(4, "translate"),
                    D(),
                    _(5, "div"),
                    _(6, "label"),
                    x(7),
                    se(8, "translate"),
                    _(9, "select", 3, 4),
                    zt("change", function () {
                      Ua(o);
                      const s = (function Np(e) {
                        return ar(
                          (function Z_() {
                            return N.lFrame.contextLView;
                          })(),
                          20 + e
                        );
                      })(10);
                      return r.translate.use(s.value);
                    }),
                    jr(11, $A, 2, 3, "option", 5),
                    D(),
                    D(),
                    D(),
                    D();
                }
                2 & n &&
                  (P(1),
                  gl("src", r.logoPath, Yi),
                  P(2),
                  ve(" ", ae(4, 4, "home.button"), " "),
                  P(4),
                  ve(" ", ae(8, 6, "home.chooseLanguage"), " "),
                  P(4),
                  ze("ngForOf", r.translate.getLangs()));
              },
              directives: [Yn, cc],
              pipes: [hi],
              styles: [
                ".contentHeader[_ngcontent-%COMP%]{margin:0;padding:0;position:absolute;top:0px;left:0px;width:100vw;max-width:1920px;height:80px}.contentHeader[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{width:120px;position:absolute;top:20px;left:70px;cursor:pointer}.contentHeader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:15px 25px;position:absolute;top:25px;right:340px;font-size:21px;color:#074430;background-color:#bee5e0;cursor:pointer;border-radius:7px;border:1px dotted #083d36}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:13px 5px;min-width:245px;height:29px;background-color:#bee5e0;position:absolute;top:25px;right:60px;border-radius:5px;color:#083d36;border:1px dotted #083d36;text-align:center}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{position:relative;top:-2px;font-size:21px;font-family:Arial,sans-serif}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{margin-left:15px;height:35px;width:45px;font-size:18px;color:#083d36;border:1px solid #083d36;border-radius:3px}@media (max-width: 1024px){.contentHeader[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{width:100px;top:30px;left:50px}.contentHeader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{right:280px;padding:12px 17px;font-size:18px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{min-width:100px;padding:8px;width:220px;right:30px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100px;font-size:18px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{font-size:16px}}@media (max-width: 425px){.contentHeader[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{width:80px;top:25px;left:25px}.contentHeader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{right:230px;padding:10px 15px;font-size:15px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:4px;width:190px;right:20px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{top:0px;font-size:15px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{height:30px;font-size:14px}}@media (max-width: 400px){.contentHeader[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{width:60px;top:30px;left:10px}.contentHeader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:8px 11px;top:30px;right:190px;font-size:14px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:2px;width:170px;top:30px;right:10px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{top:2px;font-size:14px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{margin-left:5px;height:25px;font-size:13px}}@media (max-width: 320px){.contentHeader[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{display:none}.contentHeader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{right:225px}.contentHeader[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{right:25px}}",
              ],
            })),
            e
          );
        })(),
        qA = (() => {
          class e {
            constructor(n) {
              (this.translate = n),
                n.addLangs(["pl", "en"]),
                n.setDefaultLang("pl");
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(no));
            }),
            (e.ɵcmp = Xt({
              type: e,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              template: function (n, r) {
                1 & n && (We(0, "app-header"), We(1, "router-outlet"));
              },
              directives: [zA, Fc],
              styles: [""],
            })),
            e
          );
        })();
      class GA {
        constructor(t, n = "/assets/i18n/", r = ".json") {
          (this.http = t), (this.prefix = n), (this.suffix = r);
        }
        getTranslation(t) {
          return this.http.get(`${this.prefix}${t}${this.suffix}`);
        }
      }
      function QA(e) {
        return new GA(e, "./assets/", ".json");
      }
      let WA = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ft({ type: e, bootstrap: [qA] })),
          (e.ɵinj = vt({
            providers: [],
            imports: [
              [
                jS,
                UA,
                RA,
                yA.forRoot({
                  defaultLanguage: "pl",
                  loader: { provide: fi, useFactory: QA, deps: [Yc] },
                }),
              ],
            ],
          })),
          e
        );
      })();
      (function gO() {
        cy = !1;
      })(),
        kS()
          .bootstrapModule(WA)
          .catch((e) => console.error(e));
    },
  },
  (X) => {
    X((X.s = 126));
  },
]);
