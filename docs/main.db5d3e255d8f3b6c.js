"use strict";
(self.webpackChunkquiz = self.webpackChunkquiz || []).push([
  [179],
  {
    499: () => {
      function ne(e) {
        return "function" == typeof e;
      }
      function Kr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ui = Kr(
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
      function Jr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class it {
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
            if (ne(r))
              try {
                r();
              } catch (i) {
                t = i instanceof ui ? i.errors : [i];
              }
            const { _teardowns: o } = this;
            if (o) {
              this._teardowns = null;
              for (const i of o)
                try {
                  $c(i);
                } catch (s) {
                  (t = null != t ? t : []),
                    s instanceof ui ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ui(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) $c(t);
            else {
              if (t instanceof it) {
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
          n === t ? (this._parentage = null) : Array.isArray(n) && Jr(n, t);
        }
        remove(t) {
          const { _teardowns: n } = this;
          n && Jr(n, t), t instanceof it && t._removeParent(this);
        }
      }
      it.EMPTY = (() => {
        const e = new it();
        return (e.closed = !0), e;
      })();
      const Hc = it.EMPTY;
      function Uc(e) {
        return (
          e instanceof it ||
          (e && "closed" in e && ne(e.remove) && ne(e.add) && ne(e.unsubscribe))
        );
      }
      function $c(e) {
        ne(e) ? e() : e.unsubscribe();
      }
      const Sn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        li = {
          setTimeout(...e) {
            const { delegate: t } = li;
            return ((null == t ? void 0 : t.setTimeout) || setTimeout)(...e);
          },
          clearTimeout(e) {
            const { delegate: t } = li;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function zc(e) {
        li.setTimeout(() => {
          const { onUnhandledError: t } = Sn;
          if (!t) throw e;
          t(e);
        });
      }
      function ci() {}
      const rD = Xs("C", void 0, void 0);
      function Xs(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let In = null;
      function di(e) {
        if (Sn.useDeprecatedSynchronousErrorHandling) {
          const t = !In;
          if ((t && (In = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = In;
            if (((In = null), n)) throw r;
          }
        } else e();
      }
      class ea extends it {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Uc(t) && t.add(this))
              : (this.destination = aD);
        }
        static create(t, n, r) {
          return new fi(t, n, r);
        }
        next(t) {
          this.isStopped
            ? na(
                (function iD(e) {
                  return Xs("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? na(
                (function oD(e) {
                  return Xs("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? na(rD, this)
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
      class fi extends ea {
        constructor(t, n, r) {
          let o;
          if ((super(), ne(t))) o = t;
          else if (t) {
            let i;
            ({ next: o, error: n, complete: r } = t),
              this && Sn.useDeprecatedNextContext
                ? ((i = Object.create(t)),
                  (i.unsubscribe = () => this.unsubscribe()))
                : (i = t),
              (o = null == o ? void 0 : o.bind(i)),
              (n = null == n ? void 0 : n.bind(i)),
              (r = null == r ? void 0 : r.bind(i));
          }
          this.destination = {
            next: o ? ta(o) : ci,
            error: ta(null != n ? n : qc),
            complete: r ? ta(r) : ci,
          };
        }
      }
      function ta(e, t) {
        return (...n) => {
          try {
            e(...n);
          } catch (r) {
            Sn.useDeprecatedSynchronousErrorHandling
              ? (function sD(e) {
                  Sn.useDeprecatedSynchronousErrorHandling &&
                    In &&
                    ((In.errorThrown = !0), (In.error = e));
                })(r)
              : zc(r);
          }
        };
      }
      function qc(e) {
        throw e;
      }
      function na(e, t) {
        const { onStoppedNotification: n } = Sn;
        n && li.setTimeout(() => n(e, t));
      }
      const aD = { closed: !0, next: ci, error: qc, complete: ci },
        ra =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Tn(e) {
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
          subscribe(n, r, o) {
            const i = (function lD(e) {
              return (
                (e && e instanceof ea) ||
                ((function uD(e) {
                  return e && ne(e.next) && ne(e.error) && ne(e.complete);
                })(e) &&
                  Uc(e))
              );
            })(n)
              ? n
              : new fi(n, r, o);
            return (
              di(() => {
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
            return new (r = Wc(r))((o, i) => {
              const s = new fi({
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
          [ra]() {
            return this;
          }
          pipe(...n) {
            return (function Gc(e) {
              return 0 === e.length
                ? Tn
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = Wc(n))((r, o) => {
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
      function Wc(e) {
        var t;
        return null !== (t = null != e ? e : Sn.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const cD = Kr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let $t = (() => {
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
            const r = new Qc(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new cD();
          }
          next(n) {
            di(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice();
                for (const o of r) o.next(n);
              }
            });
          }
          error(n) {
            di(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            di(() => {
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
            return r || o ? Hc : (i.push(n), new it(() => Jr(i, n)));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ie();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Qc(t, n)), e;
      })();
      class Qc extends $t {
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
            : Hc;
        }
      }
      function Zc(e) {
        return ne(null == e ? void 0 : e.lift);
      }
      function Me(e) {
        return (t) => {
          if (Zc(t))
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
      class Se extends ea {
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
      function Z(e, t) {
        return Me((n, r) => {
          let o = 0;
          n.subscribe(
            new Se(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function xn(e) {
        return this instanceof xn ? ((this.v = e), this) : new xn(e);
      }
      function hD(e, t, n) {
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
              f.value instanceof xn
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
      function pD(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Yc(e) {
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
      const Xc = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function ed(e) {
        return ne(null == e ? void 0 : e.then);
      }
      function td(e) {
        return ne(e[ra]);
      }
      function nd(e) {
        return (
          Symbol.asyncIterator &&
          ne(null == e ? void 0 : e[Symbol.asyncIterator])
        );
      }
      function rd(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const od = (function mD() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function id(e) {
        return ne(null == e ? void 0 : e[od]);
      }
      function sd(e) {
        return hD(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield xn(n.read());
              if (o) return yield xn(void 0);
              yield yield xn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function ad(e) {
        return ne(null == e ? void 0 : e.getReader);
      }
      function zt(e) {
        if (e instanceof ie) return e;
        if (null != e) {
          if (td(e))
            return (function yD(e) {
              return new ie((t) => {
                const n = e[ra]();
                if (ne(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Xc(e))
            return (function vD(e) {
              return new ie((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (ed(e))
            return (function DD(e) {
              return new ie((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, zc);
              });
            })(e);
          if (nd(e)) return ud(e);
          if (id(e))
            return (function CD(e) {
              return new ie((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (ad(e))
            return (function _D(e) {
              return ud(sd(e));
            })(e);
        }
        throw rd(e);
      }
      function ud(e) {
        return new ie((t) => {
          (function wD(e, t) {
            var n, r, o, i;
            return (function dD(e, t, n, r) {
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
                for (n = pD(e); !(r = yield n.next()).done; )
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
      function qt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function we(e, t, n = 1 / 0) {
        return ne(t)
          ? we((r, o) => Z((i, s) => t(r, i, o, s))(zt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Me((r, o) =>
              (function ED(e, t, n, r, o, i, s, a) {
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
                    zt(n(m, c++)).subscribe(
                      new Se(
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
                                s ? qt(t, s, () => p(v)) : p(v);
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
                    new Se(t, h, () => {
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
      function Yr(e = 1 / 0) {
        return we(Tn, e);
      }
      const Gt = new ie((e) => e.complete());
      function ia(e) {
        return e[e.length - 1];
      }
      function Xr(e) {
        return (function MD(e) {
          return e && ne(e.schedule);
        })(ia(e))
          ? e.pop()
          : void 0;
      }
      function ld(e, t = 0) {
        return Me((n, r) => {
          n.subscribe(
            new Se(
              r,
              (o) => qt(r, e, () => r.next(o), t),
              () => qt(r, e, () => r.complete(), t),
              (o) => qt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function cd(e, t = 0) {
        return Me((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function dd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ie((n) => {
          qt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            qt(
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
          ? (function RD(e, t) {
              if (null != e) {
                if (td(e))
                  return (function TD(e, t) {
                    return zt(e).pipe(cd(t), ld(t));
                  })(e, t);
                if (Xc(e))
                  return (function AD(e, t) {
                    return new ie((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (ed(e))
                  return (function xD(e, t) {
                    return zt(e).pipe(cd(t), ld(t));
                  })(e, t);
                if (nd(e)) return dd(e, t);
                if (id(e))
                  return (function PD(e, t) {
                    return new ie((n) => {
                      let r;
                      return (
                        qt(n, t, () => {
                          (r = e[od]()),
                            qt(
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
                        () => ne(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(e, t);
                if (ad(e))
                  return (function OD(e, t) {
                    return dd(sd(e), t);
                  })(e, t);
              }
              throw rd(e);
            })(e, t)
          : zt(e);
      }
      function hi(e) {
        return e <= 0
          ? () => Gt
          : Me((t, n) => {
              let r = 0;
              t.subscribe(
                new Se(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function sa(e, t, ...n) {
        return !0 === t
          ? (e(), null)
          : !1 === t
          ? null
          : t(...n)
              .pipe(hi(1))
              .subscribe(() => e());
      }
      function Y(e) {
        for (let t in e) if (e[t] === Y) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function K(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(K).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function ua(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const kD = Y({ __forward_ref__: Y });
      function la(e) {
        return (
          (e.__forward_ref__ = la),
          (e.toString = function () {
            return K(this());
          }),
          e
        );
      }
      function L(e) {
        return (function fd(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(kD) &&
            e.__forward_ref__ === la
          );
        })(e)
          ? e()
          : e;
      }
      class Q extends Error {
        constructor(t, n) {
          super(
            (function ca(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function O(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function ke(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : O(e);
      }
      function pi(e, t) {
        const n = t ? ` in ${t}` : "";
        throw new Q(-201, `No provider for ${ke(e)} found${n}`);
      }
      function Qe(e, t) {
        null == e &&
          (function re(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function j(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function xt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function da(e) {
        return hd(e, gi) || hd(e, gd);
      }
      function hd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function pd(e) {
        return e && (e.hasOwnProperty(fa) || e.hasOwnProperty($D))
          ? e[fa]
          : null;
      }
      const gi = Y({ ɵprov: Y }),
        fa = Y({ ɵinj: Y }),
        gd = Y({ ngInjectableDef: Y }),
        $D = Y({ ngInjectorDef: Y });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let ha;
      function dn(e) {
        const t = ha;
        return (ha = e), t;
      }
      function md(e, t, n) {
        const r = da(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void pi(K(e), "Injector");
      }
      function fn(e) {
        return { toString: e }.toString();
      }
      var mt = (() => (
          ((mt = mt || {})[(mt.OnPush = 0)] = "OnPush"),
          (mt[(mt.Default = 1)] = "Default"),
          mt
        ))(),
        At = (() => {
          return (
            ((e = At || (At = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            At
          );
          var e;
        })();
      const qD = "undefined" != typeof globalThis && globalThis,
        GD = "undefined" != typeof window && window,
        WD =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        J = qD || ("undefined" != typeof global && global) || GD || WD,
        Zn = {},
        X = [],
        mi = Y({ ɵcmp: Y }),
        pa = Y({ ɵdir: Y }),
        ga = Y({ ɵpipe: Y }),
        yd = Y({ ɵmod: Y }),
        Qt = Y({ ɵfac: Y }),
        eo = Y({ __NG_ELEMENT_ID__: Y });
      let QD = 0;
      function Zt(e) {
        return fn(() => {
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
              onPush: e.changeDetection === mt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || X,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || At.Emulated,
              id: "c",
              styles: e.styles || X,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            o = e.directives,
            i = e.features,
            s = e.pipes;
          return (
            (r.id += QD++),
            (r.inputs = _d(e.inputs, n)),
            (r.outputs = _d(e.outputs)),
            i && i.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(vd)
              : null),
            (r.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(Dd)
              : null),
            r
          );
        });
      }
      function vd(e) {
        return (
          Ae(e) ||
          (function hn(e) {
            return e[pa] || null;
          })(e)
        );
      }
      function Dd(e) {
        return (function An(e) {
          return e[ga] || null;
        })(e);
      }
      const Cd = {};
      function Kt(e) {
        return fn(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || X,
            declarations: e.declarations || X,
            imports: e.imports || X,
            exports: e.exports || X,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (Cd[e.id] = e.type), t;
        });
      }
      function _d(e, t) {
        if (null == e) return Zn;
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
      const Te = Zt;
      function Ae(e) {
        return e[mi] || null;
      }
      function st(e, t) {
        const n = e[yd] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${K(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const V = 11;
      function Pt(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function vt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function va(e) {
        return 0 != (8 & e.flags);
      }
      function Ci(e) {
        return 2 == (2 & e.flags);
      }
      function _i(e) {
        return 1 == (1 & e.flags);
      }
      function Dt(e) {
        return null !== e.template;
      }
      function eC(e) {
        return 0 != (512 & e[2]);
      }
      function Nn(e, t) {
        return e.hasOwnProperty(Qt) ? e[Qt] : null;
      }
      class rC {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Fn() {
        return Ed;
      }
      function Ed(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = iC), oC;
      }
      function oC() {
        const e = Md(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === Zn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function iC(e, t, n, r) {
        const o =
            Md(e) ||
            (function sC(e, t) {
              return (e[bd] = t);
            })(e, { previous: Zn, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new rC(u && u.currentValue, t, s === Zn)), (e[r] = t);
      }
      Fn.ngInherit = !0;
      const bd = "__ngSimpleChanges__";
      function Md(e) {
        return e[bd] || null;
      }
      let Ea;
      function ae(e) {
        return !!e.listen;
      }
      const Sd = {
        createRenderer: (e, t) =>
          (function ba() {
            return void 0 !== Ea
              ? Ea
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function fe(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function lt(e, t) {
        return fe(t[e.index]);
      }
      function Ma(e, t) {
        return e.data[t];
      }
      function Ke(e, t) {
        const n = t[e];
        return Pt(n) ? n : n[0];
      }
      function Id(e) {
        return 4 == (4 & e[2]);
      }
      function Sa(e) {
        return 128 == (128 & e[2]);
      }
      function pn(e, t) {
        return null == t ? null : e[t];
      }
      function Td(e) {
        e[18] = 0;
      }
      function Ia(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const A = {
        lFrame: Ld(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function xd() {
        return A.bindingsEnabled;
      }
      function D() {
        return A.lFrame.lView;
      }
      function W() {
        return A.lFrame.tView;
      }
      function ye() {
        let e = Pd();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Pd() {
        return A.lFrame.currentTNode;
      }
      function Ot(e, t) {
        const n = A.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ta() {
        return A.lFrame.isParent;
      }
      function Ei() {
        return A.isInCheckNoChangesMode;
      }
      function bi(e) {
        A.isInCheckNoChangesMode = e;
      }
      function tr() {
        return A.lFrame.bindingIndex++;
      }
      function EC(e, t) {
        const n = A.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Aa(t);
      }
      function Aa(e) {
        A.lFrame.currentDirectiveIndex = e;
      }
      function Nd() {
        return A.lFrame.currentQueryIndex;
      }
      function Oa(e) {
        A.lFrame.currentQueryIndex = e;
      }
      function MC(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Fd(e, t, n) {
        if (n & N.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & N.Host ||
              ((o = MC(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (A.lFrame = kd());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Mi(e) {
        const t = kd(),
          n = e[1];
        (A.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function kd() {
        const e = A.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Ld(e) : t;
      }
      function Ld(e) {
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
      function jd() {
        const e = A.lFrame;
        return (
          (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Vd = jd;
      function Si() {
        const e = jd();
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
      function je() {
        return A.lFrame.selectedIndex;
      }
      function gn(e) {
        A.lFrame.selectedIndex = e;
      }
      function ue() {
        const e = A.lFrame;
        return Ma(e.tView, e.selectedIndex);
      }
      function Ii(e, t) {
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
      function Ti(e, t, n) {
        Bd(e, t, 3, n);
      }
      function xi(e, t, n, r) {
        (3 & e[2]) === n && Bd(e, t, n, r);
      }
      function Ra(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Bd(e, t, n, r) {
        const i = null != r ? r : -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (NC(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function NC(e, t, n, r) {
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
      class io {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ai(e, t, n) {
        const r = ae(e);
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
            Fa(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              o++;
          }
        }
        return o;
      }
      function Hd(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Fa(e) {
        return 64 === e.charCodeAt(0);
      }
      function Pi(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Ud(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Ud(e, t, n, r, o) {
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
      function $d(e) {
        return -1 !== e;
      }
      function nr(e) {
        return 32767 & e;
      }
      function rr(e, t) {
        let n = (function VC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let ka = !0;
      function Oi(e) {
        const t = ka;
        return (ka = e), t;
      }
      let BC = 0;
      function ao(e, t) {
        const n = ja(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          La(r.data, e),
          La(t, null),
          La(r.blueprint, null));
        const o = Ri(e, t),
          i = e.injectorIndex;
        if ($d(o)) {
          const s = nr(o),
            a = rr(o, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function La(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function ja(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ri(e, t) {
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
      function Ni(e, t, n) {
        !(function HC(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(eo) && (r = n[eo]),
            null == r && (r = n[eo] = BC++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function Gd(e, t, n) {
        if (n & N.Optional) return e;
        pi(t, "NodeInjector");
      }
      function Wd(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          0 == (n & (N.Self | N.Host)))
        ) {
          const o = e[9],
            i = dn(void 0);
          try {
            return o ? o.get(t, r, n & N.Optional) : md(t, r, n & N.Optional);
          } finally {
            dn(i);
          }
        }
        return Gd(r, t, n);
      }
      function Qd(e, t, n, r = N.Default, o) {
        if (null !== e) {
          const i = (function qC(e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(eo) ? e[eo] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : $C) : t;
          })(n);
          if ("function" == typeof i) {
            if (!Fd(t, e, r)) return r & N.Host ? Gd(o, n, r) : Wd(t, n, r, o);
            try {
              const s = i(r);
              if (null != s || r & N.Optional) return s;
              pi(n);
            } finally {
              Vd();
            }
          } else if ("number" == typeof i) {
            let s = null,
              a = ja(e, t),
              u = -1,
              l = r & N.Host ? t[16][6] : null;
            for (
              (-1 === a || r & N.SkipSelf) &&
              ((u = -1 === a ? Ri(e, t) : t[a + 8]),
              -1 !== u && Jd(r, !1)
                ? ((s = t[1]), (a = nr(u)), (t = rr(u, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1];
              if (Kd(i, a, c.data)) {
                const d = zC(a, t, n, s, r, l);
                if (d !== Zd) return d;
              }
              (u = t[a + 8]),
                -1 !== u && Jd(r, t[1].data[a + 8] === l) && Kd(i, a, t)
                  ? ((s = c), (a = nr(u)), (t = rr(u, t)))
                  : (a = -1);
            }
          }
        }
        return Wd(t, n, r, o);
      }
      const Zd = {};
      function $C() {
        return new or(ye(), D());
      }
      function zC(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = Fi(
            a,
            s,
            n,
            null == r ? Ci(a) && ka : r != s && 0 != (3 & a.type),
            o & N.Host && i === a
          );
        return null !== c ? uo(t, s, c, a) : Zd;
      }
      function Fi(e, t, n, r, o) {
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
          if (h && Dt(h) && h.type === n) return u;
        }
        return null;
      }
      function uo(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function FC(e) {
            return e instanceof io;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function LD(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new Q(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(ke(i[n]));
          const a = Oi(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? dn(s.injectImpl) : null;
          Fd(e, r, N.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function RC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Ed(t);
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
            null !== u && dn(u), Oi(a), (s.resolving = !1), Vd();
          }
        }
        return o;
      }
      function Kd(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Jd(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class or {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Qd(this._tNode, this._lView, t, r, n);
        }
      }
      function lo(e) {
        return (function UC(e, t) {
          if ("class" === t) return e.classes;
          if ("style" === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let o = 0;
            for (; o < r; ) {
              const i = n[o];
              if (Hd(i)) break;
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
        })(ye(), e);
      }
      const sr = "__parameters__";
      function ur(e, t, n) {
        return fn(() => {
          const r = (function Ba(e) {
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
              const d = u.hasOwnProperty(sr)
                ? u[sr]
                : Object.defineProperty(u, sr, { value: [] })[sr];
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
      class z {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = j({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const QC = new z("AnalyzeForEntryComponents");
      function ct(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), ct(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function Rt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Rt(n, t) : t(n)));
      }
      function Xd(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function ki(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const po = {},
        za = "__NG_DI_FLAG__",
        ji = "ngTempTokenPath",
        o_ = /\n/gm,
        of = "__source",
        s_ = Y({ provide: String, useValue: Y });
      let go;
      function sf(e) {
        const t = go;
        return (go = e), t;
      }
      function a_(e, t = N.Default) {
        if (void 0 === go) throw new Q(203, "");
        return null === go
          ? md(e, void 0, t)
          : go.get(e, t & N.Optional ? null : void 0, t);
      }
      function S(e, t = N.Default) {
        return (
          (function zD() {
            return ha;
          })() || a_
        )(L(e), t);
      }
      function qa(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = L(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new Q(900, "");
            let o,
              i = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = u_(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(S(o, i));
          } else t.push(S(r));
        }
        return t;
      }
      function mo(e, t) {
        return (e[za] = t), (e.prototype[za] = t), e;
      }
      function u_(e) {
        return e[za];
      }
      const yo = mo(
          ur("Inject", (e) => ({ token: e })),
          -1
        ),
        Nt = mo(ur("Optional"), 8),
        cr = mo(ur("SkipSelf"), 4);
      class gf {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const A_ =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        P_ =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var he = (() => (
        ((he = he || {})[(he.NONE = 0)] = "NONE"),
        (he[(he.HTML = 1)] = "HTML"),
        (he[(he.STYLE = 2)] = "STYLE"),
        (he[(he.SCRIPT = 3)] = "SCRIPT"),
        (he[(he.URL = 4)] = "URL"),
        (he[(he.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        he
      ))();
      function hr(e) {
        const t = (function _o() {
          const e = D();
          return e && e[12];
        })();
        return t
          ? t.sanitize(he.URL, e) || ""
          : (function Do(e, t) {
              const n = (function S_(e) {
                return (e instanceof gf && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? (function yn(e) {
              return e instanceof gf
                ? e.changingThisBreaksApplicationSecurity
                : e;
            })(e)
          : (function Ui(e) {
              return (e = String(e)).match(A_) || e.match(P_)
                ? e
                : "unsafe:" + e;
            })(O(e));
      }
      const Mf = "__ngContext__";
      function Oe(e, t) {
        e[Mf] = t;
      }
      function eu(e) {
        const t = (function wo(e) {
          return e[Mf] || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function nu(e) {
        return e.ngOriginalError;
      }
      function ew(e, ...t) {
        e.error(...t);
      }
      class pr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function X_(e) {
              return (e && e.ngErrorLogger) || ew;
            })(t);
          r(this._console, "ERROR", t),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && nu(t);
          for (; n && nu(n); ) n = nu(n);
          return n || null;
        }
      }
      const Af = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(J))();
      function kt(e) {
        return e instanceof Function ? e() : e;
      }
      var Ye = (() => (
        ((Ye = Ye || {})[(Ye.Important = 1)] = "Important"),
        (Ye[(Ye.DashCase = 2)] = "DashCase"),
        Ye
      ))();
      function ou(e, t) {
        return undefined(e, t);
      }
      function Eo(e) {
        const t = e[3];
        return vt(t) ? t[3] : t;
      }
      function iu(e) {
        return Ff(e[13]);
      }
      function su(e) {
        return Ff(e[4]);
      }
      function Ff(e) {
        for (; null !== e && !vt(e); ) e = e[4];
        return e;
      }
      function mr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          vt(r) ? (i = r) : Pt(r) && ((s = !0), (r = r[0]));
          const a = fe(r);
          0 === e && null !== n
            ? null == o
              ? Hf(t, n, a)
              : kn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? kn(t, n, a, o || null, !0)
            : 2 === e
            ? (function Qf(e, t, n) {
                const r = zi(e, t);
                r &&
                  (function Ew(e, t, n, r) {
                    ae(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function Sw(e, t, n, r, o) {
                const i = n[7];
                i !== fe(n) && mr(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  bo(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function uu(e, t, n) {
        if (ae(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function cC(e) {
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
      function Lf(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        1024 & t[2] && ((t[2] &= -1025), Ia(o, -1)), n.splice(r, 1);
      }
      function lu(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && Lf(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = ki(e, 10 + t);
          !(function gw(e, t) {
            bo(e, t, t[V], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function jf(e, t) {
        if (!(256 & t[2])) {
          const n = t[V];
          ae(n) && n.destroyNode && bo(e, t, n, 3, null, null),
            (function vw(e) {
              let t = e[13];
              if (!t) return cu(e[1], e);
              for (; t; ) {
                let n = null;
                if (Pt(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Pt(t) && cu(t[1], t), (t = t[3]);
                  null === t && (t = e), Pt(t) && cu(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function cu(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function ww(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof io)) {
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
            (function _w(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : fe(t[s]),
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
            1 === t[1].type && ae(t[V]) && t[V].destroy();
          const n = t[17];
          if (null !== n && vt(t[3])) {
            n !== t[3] && Lf(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
        }
      }
      function Vf(e, t, n) {
        return (function Bf(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === At.None || o === At.Emulated) return null;
          }
          return lt(r, n);
        })(e, t.parent, n);
      }
      function kn(e, t, n, r, o) {
        ae(e) ? e.insertBefore(t, n, r, o) : t.insertBefore(n, r, o);
      }
      function Hf(e, t, n) {
        ae(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function Uf(e, t, n, r, o) {
        null !== r ? kn(e, t, n, r, o) : Hf(e, t, n);
      }
      function zi(e, t) {
        return ae(e) ? e.parentNode(t) : t.parentNode;
      }
      let qf = function zf(e, t, n) {
        return 40 & e.type ? lt(e, n) : null;
      };
      function qi(e, t, n, r) {
        const o = Vf(e, r, t),
          i = t[V],
          a = (function $f(e, t, n) {
            return qf(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Uf(i, o, n[u], a, !1);
          else Uf(i, o, n, a, !1);
      }
      function Gi(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return lt(t, e);
          if (4 & n) return fu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Gi(e, r);
            {
              const o = e[t.index];
              return vt(o) ? fu(-1, o) : fe(o);
            }
          }
          if (32 & n) return ou(t, e)() || fe(e[t.index]);
          {
            const r = Wf(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Gi(Eo(e[16]), r)
              : Gi(e, t.next);
          }
        }
        return null;
      }
      function Wf(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function fu(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return Gi(r, o);
        }
        return t[7];
      }
      function hu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Oe(fe(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) hu(e, t, n.child, r, o, i, !1), mr(t, e, o, a, i);
            else if (32 & u) {
              const l = ou(n, r);
              let c;
              for (; (c = l()); ) mr(t, e, o, c, i);
              mr(t, e, o, a, i);
            } else 16 & u ? Zf(e, t, r, n, o, i) : mr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function bo(e, t, n, r, o, i) {
        hu(n, r, e.firstChild, t, o, i, !1);
      }
      function Zf(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) mr(t, e, o, u[l], i);
        else hu(e, t, u, s[3], o, i, !0);
      }
      function Kf(e, t, n) {
        ae(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function pu(e, t, n) {
        ae(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function Jf(e, t, n) {
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
      const Yf = "ng-template";
      function Tw(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== Jf(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Xf(e) {
        return 4 === e.type && e.value !== Yf;
      }
      function xw(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Yf);
      }
      function Aw(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function Rw(e) {
            for (let t = 0; t < e.length; t++) if (Hd(e[t])) return t;
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
                  ("" !== u && !xw(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (Ct(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!Tw(e.attrs, l, n)) {
                    if (Ct(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = Pw(8 & r ? "class" : u, o, Xf(e), n);
                if (-1 === d) {
                  if (Ct(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Jf(h, l, 0)) || (2 & r && l !== f)) {
                    if (Ct(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Ct(r) && !Ct(u)) return !1;
            if (s && Ct(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return Ct(r) || s;
      }
      function Ct(e) {
        return 0 == (1 & e);
      }
      function Pw(e, t, n, r) {
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
        return (function Nw(e, t) {
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
      function eh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (Aw(e, t[r], n)) return !0;
        return !1;
      }
      function th(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function kw(e) {
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
            "" !== o && !Ct(s) && ((t += th(i, o)), (o = "")),
              (r = s),
              (i = i || !Ct(r));
          n++;
        }
        return "" !== o && (t += th(i, o)), t;
      }
      const R = {};
      function F(e) {
        nh(W(), D(), je() + e, Ei());
      }
      function nh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && Ti(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && xi(t, i, 0, n);
          }
        gn(n);
      }
      function hh(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Oa(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Mo(e, t, n, r, o, i, s, a, u, l) {
        const c = t.blueprint.slice();
        return (
          (c[0] = o),
          (c[2] = 140 | r),
          Td(c),
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
      function yr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Su(e, t, n, r, o) {
            const i = Pd(),
              s = Ta(),
              u = (e.data[t] = (function eE(e, t, n, r, o, i) {
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
            (function wC() {
              return A.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function oo() {
            const e = A.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Ot(i, !0), i;
      }
      function vr(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function So(e, t, n) {
        Mi(t);
        try {
          const r = e.viewQuery;
          null !== r && Fu(1, r, n);
          const o = e.template;
          null !== o && ph(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && hh(e, t),
            e.staticViewQueries && Fu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function Jw(e, t) {
              for (let n = 0; n < t.length; n++) vE(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Si();
        }
      }
      function Dr(e, t, n, r) {
        const o = t[2];
        if (256 == (256 & o)) return;
        Mi(t);
        const i = Ei();
        try {
          Td(t),
            (function Od(e) {
              return (A.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && ph(e, t, n, 2, r);
          const s = 3 == (3 & o);
          if (!i)
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Ti(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && xi(t, l, 0, null), Ra(t, 0);
            }
          if (
            ((function mE(e) {
              for (let t = iu(e); null !== t; t = su(t)) {
                if (!t[2]) continue;
                const n = t[9];
                for (let r = 0; r < n.length; r++) {
                  const o = n[r],
                    i = o[3];
                  0 == (1024 & o[2]) && Ia(i, 1), (o[2] |= 1024);
                }
              }
            })(t),
            (function gE(e) {
              for (let t = iu(e); null !== t; t = su(t))
                for (let n = 10; n < t.length; n++) {
                  const r = t[n],
                    o = r[1];
                  Sa(r) && Dr(o, r, o.template, r[8]);
                }
            })(t),
            null !== e.contentQueries && hh(e, t),
            !i)
          )
            if (s) {
              const l = e.contentCheckHooks;
              null !== l && Ti(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && xi(t, l, 1), Ra(t, 1);
            }
          !(function Zw(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const o = n[r];
                  if (o < 0) gn(~o);
                  else {
                    const i = o,
                      s = n[++r],
                      a = n[++r];
                    EC(s, i), a(2, t[i]);
                  }
                }
              } finally {
                gn(-1);
              }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function Kw(e, t) {
              for (let n = 0; n < t.length; n++) yE(e, t[n]);
            })(t, a);
          const u = e.viewQuery;
          if ((null !== u && Fu(2, u, r), !i))
            if (s) {
              const l = e.viewCheckHooks;
              null !== l && Ti(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && xi(t, l, 2), Ra(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            i || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), Ia(t[3], -1));
        } finally {
          Si();
        }
      }
      function Yw(e, t, n, r) {
        const o = t[10],
          i = !Ei(),
          s = Id(t);
        try {
          i && !s && o.begin && o.begin(), s && So(e, t, r), Dr(e, t, n, r);
        } finally {
          i && !s && o.end && o.end();
        }
      }
      function ph(e, t, n, r, o) {
        const i = je(),
          s = 2 & r;
        try {
          gn(-1), s && t.length > 20 && nh(e, t, 20, Ei()), n(r, o);
        } finally {
          gn(i);
        }
      }
      function Iu(e, t, n) {
        !xd() ||
          ((function aE(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || ao(n, t), Oe(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Dt(u);
              l && fE(t, n, u);
              const c = uo(t, e, a, n);
              Oe(c, t),
                null !== s && hE(0, a - o, c, u, 0, s),
                l && (Ke(n.index, t)[8] = c);
            }
          })(e, t, n, lt(n, t)),
          128 == (128 & n.flags) &&
            (function uE(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                s = n.index,
                a = (function bC() {
                  return A.lFrame.currentDirectiveIndex;
                })();
              try {
                gn(s);
                for (let u = r; u < o; u++) {
                  const l = e.data[u],
                    c = t[u];
                  Aa(u),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Eh(l, c);
                }
              } finally {
                gn(-1), Aa(a);
              }
            })(e, t, n));
      }
      function Tu(e, t, n = lt) {
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
      function mh(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Ki(
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
      function Ki(e, t, n, r, o, i, s, a, u, l) {
        const c = 20 + r,
          d = c + o,
          f = (function Xw(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : R);
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
      function Dh(e, t, n, r) {
        const o = xh(t);
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && Ah(e).push(r, o.length - 1));
      }
      function Ch(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Xe(e, t, n, r, o, i, s, a) {
        const u = lt(t, n);
        let c,
          l = t.inputs;
        !a && null != l && (c = l[r])
          ? (Rh(e, n, c, r, o),
            Ci(t) &&
              (function rE(e, t) {
                const n = Ke(t, e);
                16 & n[2] || (n[2] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function nE(e) {
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
            ae(i)
              ? i.setProperty(u, r, o)
              : Fa(r) || (u.setProperty ? u.setProperty(r, o) : (u[r] = o)));
      }
      function xu(e, t, n, r) {
        let o = !1;
        if (xd()) {
          const i = (function lE(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  eh(n, s.selectors, !1) &&
                    (o || (o = []),
                    Ni(ao(n, t), e, s.type),
                    Dt(s) ? (bh(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), Mh(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = vr(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = Pi(n.mergedAttrs, d.hostAttrs)),
                Sh(e, n, t, l, d),
                dE(l, d, s),
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
            !(function tE(e, t) {
              const r = t.directiveEnd,
                o = e.data,
                i = t.attrs,
                s = [];
              let a = null,
                u = null;
              for (let l = t.directiveStart; l < r; l++) {
                const c = o[l],
                  d = c.inputs,
                  f = null === i || Xf(t) ? null : pE(d, i);
                s.push(f), (a = Ch(d, l, a)), (u = Ch(c.outputs, l, u));
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
            (function cE(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i)
                    throw new Q(
                      -301,
                      `Export of name '${t[o + 1]}' not found!`
                    );
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Pi(n.mergedAttrs, n.attrs)), o;
      }
      function wh(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function sE(e) {
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
      function Eh(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function bh(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function dE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Dt(t) && (n[""] = e);
        }
      }
      function Mh(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Sh(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Nn(o.type)),
          s = new io(i, Dt(o), null);
        (e.blueprint[r] = s),
          (n[r] = s),
          wh(e, t, 0, r, vr(e, n, o.hostVars, R), o);
      }
      function fE(e, t, n) {
        const r = lt(t, e),
          o = mh(n),
          i = e[10],
          s = Ji(
            e,
            Mo(
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
      function hE(e, t, n, r, o, i) {
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
      function pE(e, t) {
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
      function Ih(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function yE(e, t) {
        const n = Ke(t, e);
        if (Sa(n)) {
          const r = n[1];
          80 & n[2] ? Dr(r, n, r.template, n[8]) : n[5] > 0 && Pu(n);
        }
      }
      function Pu(e) {
        for (let r = iu(e); null !== r; r = su(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (1024 & i[2]) {
              const s = i[1];
              Dr(s, i, s.template, i[8]);
            } else i[5] > 0 && Pu(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Ke(n[r], e);
            Sa(o) && o[5] > 0 && Pu(o);
          }
      }
      function vE(e, t) {
        const n = Ke(t, e),
          r = n[1];
        (function DE(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          So(r, n, n[8]);
      }
      function Ji(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Ou(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = Eo(e);
          if (eC(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Nu(e, t, n) {
        const r = t[10];
        r.begin && r.begin();
        try {
          Dr(e, t, e.template, n);
        } catch (o) {
          throw (Oh(t, o), o);
        } finally {
          r.end && r.end();
        }
      }
      function Th(e) {
        !(function Ru(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = eu(n),
              o = r[1];
            Yw(o, r, o.template, n);
          }
        })(e[8]);
      }
      function Fu(e, t, n) {
        Oa(0), t(e, n);
      }
      const EE = (() => Promise.resolve(null))();
      function xh(e) {
        return e[7] || (e[7] = []);
      }
      function Ah(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Oh(e, t) {
        const n = e[9],
          r = n ? n.get(pr, null) : null;
        r && r.handleError(t);
      }
      function Rh(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function en(e, t, n) {
        const r = (function wi(e, t) {
          return fe(t[e]);
        })(t, e);
        !(function kf(e, t, n) {
          ae(e) ? e.setValue(t, n) : (t.textContent = n);
        })(e[V], r, n);
      }
      function Yi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = ua(o, a))
              : 2 == i && (r = ua(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      const ku = new z("INJECTOR", -1);
      class Nh {
        get(t, n = po) {
          if (n === po) {
            const r = new Error(`NullInjectorError: No provider for ${K(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Lu = new z("Set Injector scope."),
        Io = {},
        SE = {};
      let ju;
      function Fh() {
        return void 0 === ju && (ju = new Nh()), ju;
      }
      function kh(e, t = null, n = null, r) {
        const o = Lh(e, t, n, r);
        return o._resolveInjectorDefTypes(), o;
      }
      function Lh(e, t = null, n = null, r) {
        return new IE(e, n, t || Fh(), r);
      }
      class IE {
        constructor(t, n, r, o = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const i = [];
          n && Rt(n, (a) => this.processProvider(a, t, n)),
            Rt([t], (a) => this.processInjectorType(a, [], i)),
            this.records.set(ku, Cr(void 0, this));
          const s = this.records.get(Lu);
          (this.scope = null != s ? s.value : null),
            (this.source = o || ("object" == typeof t ? null : K(t)));
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
        get(t, n = po, r = N.Default) {
          this.assertNotDestroyed();
          const o = sf(this),
            i = dn(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function FE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof z)
                    );
                  })(t) && da(t);
                (a = u && this.injectableDefInScope(u) ? Cr(Vu(t), Io) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? Fh() : this.parent).get(
              t,
              (n = r & N.Optional && n === po ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[ji] = s[ji] || []).unshift(K(t)), o)) throw s;
              return (function l_(e, t, n, r) {
                const o = e[ji];
                throw (
                  (t[of] && o.unshift(t[of]),
                  (e.message = (function c_(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let o = K(t);
                    if (Array.isArray(t)) o = t.map(K).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : K(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      o_,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[ji] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            dn(i), sf(o);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((r, o) => t.push(K(o))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Q(205, "");
        }
        processInjectorType(t, n, r) {
          if (!(t = L(t))) return !1;
          let o = pd(t);
          const i = (null == o && t.ngModule) || void 0,
            s = void 0 === i ? t : i,
            a = -1 !== r.indexOf(s);
          if ((void 0 !== i && (o = pd(i)), null == o)) return !1;
          if (null != o.imports && !a) {
            let c;
            r.push(s);
            try {
              Rt(o.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                Rt(h, (p) => this.processProvider(p, f, h || X));
              }
          }
          this.injectorDefTypes.add(s);
          const u = Nn(s) || (() => new s());
          this.records.set(s, Cr(u, Io));
          const l = o.providers;
          if (null != l && !a) {
            const c = t;
            Rt(l, (d) => this.processProvider(d, c, l));
          }
          return void 0 !== i && void 0 !== t.providers;
        }
        processProvider(t, n, r) {
          let o = _r((t = L(t))) ? t : L(t && t.provide);
          const i = (function xE(e, t, n) {
            return Vh(e)
              ? Cr(void 0, e.useValue)
              : Cr(
                  (function jh(e, t, n) {
                    let r;
                    if (_r(e)) {
                      const o = L(e);
                      return Nn(o) || Vu(o);
                    }
                    if (Vh(e)) r = () => L(e.useValue);
                    else if (
                      (function PE(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...qa(e.deps || []));
                    else if (
                      (function AE(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => S(L(e.useExisting));
                    else {
                      const o = L(e && (e.useClass || e.provide));
                      if (
                        !(function RE(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Nn(o) || Vu(o);
                      r = () => new o(...qa(e.deps));
                    }
                    return r;
                  })(e),
                  Io
                );
          })(t);
          if (_r(t) || !0 !== t.multi) this.records.get(o);
          else {
            let s = this.records.get(o);
            s ||
              ((s = Cr(void 0, Io, !0)),
              (s.factory = () => qa(s.multi)),
              this.records.set(o, s)),
              (o = t),
              s.multi.push(t);
          }
          this.records.set(o, i);
        }
        hydrate(t, n) {
          return (
            n.value === Io && ((n.value = SE), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function NE(e) {
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
          const n = L(t.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function Vu(e) {
        const t = da(e),
          n = null !== t ? t.factory : Nn(e);
        if (null !== n) return n;
        if (e instanceof z) throw new Q(204, "");
        if (e instanceof Function)
          return (function TE(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function ho(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new Q(204, ""))
              );
            const n = (function HD(e) {
              const t = e && (e[gi] || e[gd]);
              if (t) {
                const n = (function UD(e) {
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
        throw new Q(204, "");
      }
      function Cr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Vh(e) {
        return null !== e && "object" == typeof e && s_ in e;
      }
      function _r(e) {
        return "function" == typeof e;
      }
      let Re = (() => {
        class e {
          static create(n, r) {
            var o;
            if (Array.isArray(n)) return kh({ name: "" }, r, n, "");
            {
              const i = null !== (o = n.name) && void 0 !== o ? o : "";
              return kh({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = po),
          (e.NULL = new Nh()),
          (e.ɵprov = j({ token: e, providedIn: "any", factory: () => S(ku) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function $E(e, t) {
        Ii(eu(e)[1], ye());
      }
      let Xi = null;
      function wr() {
        if (!Xi) {
          const e = J.Symbol;
          if (e && e.iterator) Xi = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Xi = r);
            }
          }
        }
        return Xi;
      }
      function To(e) {
        return (
          !!$u(e) && (Array.isArray(e) || (!(e instanceof Map) && wr() in e))
        );
      }
      function $u(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Ne(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function br(e, t, n, r) {
        return Ne(e, tr(), n) ? t + O(n) + r : R;
      }
      function Mr(e, t, n, r, o, i) {
        const a = (function Ln(e, t, n, r) {
          const o = Ne(e, t, n);
          return Ne(e, t + 1, r) || o;
        })(
          e,
          (function Jt() {
            return A.lFrame.bindingIndex;
          })(),
          n,
          o
        );
        return (
          (function Yt(e) {
            const t = A.lFrame,
              n = t.bindingIndex;
            return (t.bindingIndex = t.bindingIndex + e), n;
          })(2),
          a ? t + O(n) + r + O(o) + i : R
        );
      }
      function Ao(e, t, n, r, o, i, s, a) {
        const u = D(),
          l = W(),
          c = e + 20,
          d = l.firstCreatePass
            ? (function e0(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = yr(t, e, 4, s || null, pn(l, a));
                xu(t, n, c, pn(l, u)), Ii(t, c);
                const d = (c.tViews = Ki(
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
        Ot(d, !1);
        const f = u[V].createComment("");
        qi(l, u, f, d),
          Oe(f, u),
          Ji(u, (u[c] = Ih(f, u, f, d))),
          _i(d) && Iu(l, u, d),
          null != s && Tu(u, d, a);
      }
      function M(e, t = N.Default) {
        const n = D();
        return null === n ? S(e, t) : Qd(ye(), n, L(e), t);
      }
      function Zu() {
        throw new Error("invalid");
      }
      function et(e, t, n) {
        const r = D();
        return Ne(r, tr(), t) && Xe(W(), ue(), r, e, t, r[V], n, !1), et;
      }
      function Ku(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Rh(e, n, t.inputs[s], s, r);
      }
      function C(e, t, n, r) {
        const o = D(),
          i = W(),
          s = 20 + e,
          a = o[V],
          u = (o[s] = uu(
            a,
            t,
            (function OC() {
              return A.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function E0(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = yr(t, e, 2, o, pn(a, i));
                return (
                  xu(t, n, l, pn(a, s)),
                  null !== l.attrs && Yi(l, l.attrs, !1),
                  null !== l.mergedAttrs && Yi(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        Ot(l, !0);
        const c = l.mergedAttrs;
        null !== c && Ai(a, u, c);
        const d = l.classes;
        null !== d && pu(a, u, d);
        const f = l.styles;
        null !== f && Kf(a, u, f),
          64 != (64 & l.flags) && qi(i, o, u, l),
          0 ===
            (function mC() {
              return A.lFrame.elementDepthCount;
            })() && Oe(u, o),
          (function yC() {
            A.lFrame.elementDepthCount++;
          })(),
          _i(l) &&
            (Iu(i, o, l),
            (function gh(e, t, n) {
              if (va(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, l, o)),
          null !== r && Tu(o, l);
      }
      function _() {
        let e = ye();
        Ta()
          ? (function xa() {
              A.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Ot(e, !1));
        const t = e;
        !(function vC() {
          A.lFrame.elementDepthCount--;
        })();
        const n = W();
        n.firstCreatePass && (Ii(n, e), va(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function LC(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Ku(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function jC(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            Ku(n, t, D(), t.stylesWithoutHost, !1);
      }
      function Fe(e, t, n, r) {
        C(e, t, n, r), _();
      }
      function ns(e) {
        return !!e && "function" == typeof e.then;
      }
      const wp = function _p(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function tn(e, t, n, r) {
        const o = D(),
          i = W(),
          s = ye();
        return (
          (function bp(e, t, n, r, o, i, s, a) {
            const u = _i(r),
              c = e.firstCreatePass && Ah(e),
              d = t[8],
              f = xh(t);
            let h = !0;
            if (3 & r.type || a) {
              const y = lt(r, t),
                v = a ? a(y) : y,
                g = f.length,
                b = a ? (T) => a(fe(T[r.index])) : r.index;
              if (ae(n)) {
                let T = null;
                if (
                  (!a &&
                    u &&
                    (T = (function S0(e, t, n, r) {
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
                  null !== T)
                )
                  ((T.__ngLastListenerFn__ || T).__ngNextListenerFn__ = i),
                    (T.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = Ju(r, t, d, i, !1);
                  const G = n.listen(v, o, i);
                  f.push(i, G), c && c.push(o, b, g, g + 1);
                }
              } else
                (i = Ju(r, t, d, i, !0)),
                  v.addEventListener(o, i, s),
                  f.push(i),
                  c && c.push(o, b, g, s);
            } else i = Ju(r, t, d, i, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[o])) {
              const y = m.length;
              if (y)
                for (let v = 0; v < y; v += 2) {
                  const ot = t[m[v]][m[v + 1]].subscribe(i),
                    Qn = f.length;
                  f.push(i, ot), c && c.push(o, r.index, Qn, -(Qn + 1));
                }
            }
          })(i, o, o[V], s, e, t, !!n, r),
          tn
        );
      }
      function Mp(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Oh(e, o), !1;
        }
      }
      function Ju(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          const a = 2 & e.flags ? Ke(e.index, t) : t;
          0 == (32 & t[2]) && Ou(a);
          let u = Mp(t, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Mp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function Sp(e = 1) {
        return (function SC(e) {
          return (A.lFrame.contextLView = (function IC(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, A.lFrame.contextLView))[8];
        })(e);
      }
      function Po(e, t, n) {
        return Yu(e, "", t, "", n), Po;
      }
      function Yu(e, t, n, r, o) {
        const i = D(),
          s = br(i, t, n, r);
        return s !== R && Xe(W(), ue(), i, e, s, i[V], o, !1), Yu;
      }
      function P(e, t = "") {
        const n = D(),
          r = W(),
          o = e + 20,
          i = r.firstCreatePass ? yr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function au(e, t) {
            return ae(e) ? e.createText(t) : e.createTextNode(t);
          })(n[V], t));
        qi(r, n, s, i), Ot(i, !1);
      }
      function be(e) {
        return qe("", e, ""), be;
      }
      function qe(e, t, n) {
        const r = D(),
          o = br(r, e, t, n);
        return o !== R && en(r, je(), o), qe;
      }
      function el(e, t, n, r, o) {
        const i = D(),
          s = Mr(i, e, t, n, r, o);
        return s !== R && en(i, je(), s), el;
      }
      const jn = void 0;
      var hb = [
        "en",
        [["a", "p"], ["AM", "PM"], jn],
        [["AM", "PM"], jn, jn],
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
        jn,
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
        jn,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", jn, "{1} 'at' {0}", jn],
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
        function fb(e) {
          const n = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let Nr = {};
      function gg(e) {
        return (
          e in Nr ||
            (Nr[e] =
              J.ng &&
              J.ng.common &&
              J.ng.common.locales &&
              J.ng.common.locales[e]),
          Nr[e]
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
      const os = "en-US";
      let mg = os;
      class Hg {}
      class mM {
        resolveComponentFactory(t) {
          throw (function gM(e) {
            const t = Error(
              `No component factory found for ${K(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let kr = (() => {
        class e {}
        return (e.NULL = new mM()), e;
      })();
      function yM() {
        return Lr(ye(), D());
      }
      function Lr(e, t) {
        return new nn(lt(e, t));
      }
      let nn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = yM), e;
      })();
      function vM(e) {
        return e instanceof nn ? e.nativeElement : e;
      }
      class $g {}
      let Lo = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function CM() {
                const e = D(),
                  n = Ke(ye().index, e);
                return (function DM(e) {
                  return e[V];
                })(Pt(n) ? n : e);
              })()),
            e
          );
        })(),
        _M = (() => {
          class e {}
          return (
            (e.ɵprov = j({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class ls {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const wM = new ls("13.2.0"),
        al = {};
      function cs(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(fe(i)), vt(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild;
              null !== l && cs(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) cs(e, t, n.child, r);
          else if (32 & s) {
            const a = ou(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Wf(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Eo(t[16]);
              cs(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class jo {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return cs(n, t, n.firstChild, []);
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
            if (vt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (lu(t, r), ki(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          jf(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Dh(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Ou(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Nu(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function _E(e, t, n) {
            bi(!0);
            try {
              Nu(e, t, n);
            } finally {
              bi(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new Q(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function yw(e, t) {
              bo(e, t, t[V], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new Q(902, "");
          this._appRef = t;
        }
      }
      class EM extends jo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Th(this._view);
        }
        checkNoChanges() {
          !(function wE(e) {
            bi(!0);
            try {
              Th(e);
            } finally {
              bi(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class zg extends kr {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Ae(t);
          return new ul(n, this.ngModule);
        }
      }
      function qg(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      const MM = new z("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Af,
      });
      class ul extends Hg {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function Lw(e) {
              return e.map(kw).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return qg(this.componentDef.inputs);
        }
        get outputs() {
          return qg(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          const i = (o = o || this.ngModule)
              ? (function SM(e, t) {
                  return {
                    get: (n, r, o) => {
                      const i = e.get(n, al, o);
                      return i !== al || r === al ? i : t.get(n, r, o);
                    },
                  };
                })(t, o.injector)
              : t,
            s = i.get($g, Sd),
            a = i.get(_M, null),
            u = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function vh(e, t, n) {
                  if (ae(e)) return e.selectRootElement(t, n === At.ShadowDom);
                  let r = "string" == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ""), r;
                })(u, r, this.componentDef.encapsulation)
              : uu(
                  s.createRenderer(null, this.componentDef),
                  l,
                  (function bM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(l)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function Kh(e, t) {
              return {
                components: [],
                scheduler: e || Af,
                clean: EE,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = Ki(0, null, null, 1, 0, null, null, null, null, null),
            p = Mo(null, h, f, d, null, null, s, u, a, i);
          let m, y;
          Mi(p);
          try {
            const v = (function Qh(e, t, n, r, o, i) {
              const s = n[1];
              n[20] = e;
              const u = yr(s, 20, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (Yi(u, l, !0),
                null !== e &&
                  (Ai(o, e, l),
                  null !== u.classes && pu(o, e, u.classes),
                  null !== u.styles && Kf(o, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = Mo(
                  n,
                  mh(t),
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
                  (Ni(ao(u, n), s, t.type), bh(s, u), Mh(u, n.length, 1)),
                Ji(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, s, u);
            if (c)
              if (r) Ai(u, c, ["ng-version", wM.full]);
              else {
                const { attrs: g, classes: b } = (function jw(e) {
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
                      if (!Ct(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                g && Ai(u, c, g), b && b.length > 0 && pu(u, c, b.join(" "));
              }
            if (((y = Ma(h, 20)), void 0 !== n)) {
              const g = (y.projection = []);
              for (let b = 0; b < this.ngContentSelectors.length; b++) {
                const T = n[b];
                g.push(null != T ? Array.from(T) : null);
              }
            }
            (m = (function Zh(e, t, n, r, o) {
              const i = n[1],
                s = (function iE(e, t, n) {
                  const r = ye();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Sh(e, r, t, vr(e, t, 1, null), n));
                  const o = uo(t, e, r.directiveStart, r);
                  Oe(o, t);
                  const i = lt(r, t);
                  return i && Oe(i, t), o;
                })(i, n, t);
              if (
                (r.components.push(s),
                (e[8] = s),
                o && o.forEach((u) => u(s, t)),
                t.contentQueries)
              ) {
                const u = ye();
                t.contentQueries(1, s, u.directiveStart);
              }
              const a = ye();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (gn(a.index),
                  wh(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Eh(t, s)),
                s
              );
            })(v, this.componentDef, p, f, [$E])),
              So(h, p, null);
          } finally {
            Si();
          }
          return new TM(this.componentType, m, Lr(y, p), p, y);
        }
      }
      class TM extends class pM {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new EM(o)),
            (this.componentType = t);
        }
        get injector() {
          return new or(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class rn {}
      class Gg {}
      const jr = new Map();
      class Zg extends rn {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new zg(this));
          const r = st(t);
          (this._bootstrapComponents = kt(r.bootstrap)),
            (this._r3Injector = Lh(
              t,
              n,
              [
                { provide: rn, useValue: this },
                { provide: kr, useValue: this.componentFactoryResolver },
              ],
              K(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, n = Re.THROW_IF_NOT_FOUND, r = N.Default) {
          return t === Re || t === rn || t === ku
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
      class ll extends Gg {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== st(t) &&
              (function AM(e) {
                const t = new Set();
                !(function n(r) {
                  const o = st(r, !0),
                    i = o.id;
                  null !== i &&
                    ((function Wg(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${K(
                            t
                          )} vs ${K(t.name)}`
                        );
                    })(i, jr.get(i), r),
                    jr.set(i, r));
                  const s = kt(o.imports);
                  for (const a of s) t.has(a) || (t.add(a), n(a));
                })(e);
              })(t);
        }
        create(t) {
          return new Zg(this.moduleType, t);
        }
      }
      function Vr(e, t, n) {
        const r =
            (function Le() {
              const e = A.lFrame;
              let t = e.bindingRootIndex;
              return (
                -1 === t &&
                  (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                t
              );
            })() + e,
          o = D();
        return o[r] === R
          ? (function jt(e, t, n) {
              return (e[t] = n);
            })(o, r, n ? t.call(n) : t())
          : (function xo(e, t) {
              return e[t];
            })(o, r);
      }
      function cl(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const He = class WM extends $t {
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
          this.__isAsync && ((u = cl(u)), a && (a = cl(a)), l && (l = cl(l)));
          const c = super.subscribe({ next: a, error: u, complete: l });
          return t instanceof it && t.add(c), c;
        }
      };
      function QM() {
        return this._results[wr()]();
      }
      class dl {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = wr(),
            r = dl.prototype;
          r[n] || (r[n] = QM);
        }
        get changes() {
          return this._changes || (this._changes = new He());
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
          const o = ct(t);
          (this._changesDetected = !(function ZC(e, t, n) {
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
      let on = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = JM), e;
      })();
      const ZM = on,
        KM = class extends ZM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = Mo(
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
              So(n, r, t),
              new jo(r)
            );
          }
        };
      function JM() {
        return ds(ye(), D());
      }
      function ds(e, t) {
        return 4 & e.type ? new KM(t, e, Lr(e, t)) : null;
      }
      let Mt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = YM), e;
      })();
      function YM() {
        return rm(ye(), D());
      }
      const XM = Mt,
        tm = class extends XM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Lr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new or(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ri(this._hostTNode, this._hostLView);
            if ($d(t)) {
              const n = rr(t, this._hostLView),
                r = nr(t);
              return new or(n[1].data[r + 8], n);
            }
            return new or(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = nm(this._lContainer);
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
              !(function fo(e) {
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
            const u = s ? t : new ul(Ae(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule && l) {
              const d = l.get(rn, null);
              d && (i = d);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function gC(e) {
                return vt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new tm(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function Dw(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Xd(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function Cw(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(o, r, s, i);
            const a = fu(i, s),
              u = r[V],
              l = zi(u, s[7]);
            return (
              null !== l &&
                (function mw(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), bo(e, r, n, 1, o, i);
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              Xd(fl(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = nm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = lu(this._lContainer, n);
            r && (ki(fl(this._lContainer), n), jf(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = lu(this._lContainer, n);
            return r && null != ki(fl(this._lContainer), n) ? new jo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t;
          }
        };
      function nm(e) {
        return e[8];
      }
      function fl(e) {
        return e[8] || (e[8] = []);
      }
      function rm(e, t) {
        let n;
        const r = t[e.index];
        if (vt(r)) n = r;
        else {
          let o;
          if (8 & e.type) o = fe(r);
          else {
            const i = t[V];
            o = i.createComment("");
            const s = lt(e, t);
            kn(
              i,
              zi(i, s),
              o,
              (function bw(e, t) {
                return ae(e) ? e.nextSibling(t) : t.nextSibling;
              })(i, s),
              !1
            );
          }
          (t[e.index] = n = Ih(r, t, o, e)), Ji(t, n);
        }
        return new tm(n, e, t);
      }
      class hl {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new hl(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class pl {
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
            return new pl(o);
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
            null !== lm(t, n).matches && this.queries[n].setDirty();
        }
      }
      class om {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class gl {
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
          return null !== n ? new gl(n) : null;
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
      class ml {
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
              new ml(this.metadata))
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
              this.matchTNodeWithReadOption(t, n, nS(n, i)),
                this.matchTNodeWithReadOption(t, n, Fi(n, t, i, !1, !1));
            }
          else
            r === on
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Fi(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === nn || o === Mt || (o === on && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = Fi(n, t, o, !1, !1);
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
      function nS(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function oS(e, t, n, r) {
        return -1 === n
          ? (function rS(e, t) {
              return 11 & e.type ? Lr(e, t) : 4 & e.type ? ds(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function iS(e, t, n) {
              return n === nn
                ? Lr(t, e)
                : n === on
                ? ds(t, e)
                : n === Mt
                ? rm(t, e)
                : void 0;
            })(e, t, r)
          : uo(e, e[1], n, t);
      }
      function im(e, t, n, r) {
        const o = t[19].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = [];
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u];
            a.push(l < 0 ? null : oS(t, i[l], s[u + 1], n.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function yl(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = im(e, t, o, n);
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const l = i[a + 1],
                c = t[-u];
              for (let d = 10; d < c.length; d++) {
                const f = c[d];
                f[17] === f[3] && yl(f[1], f, l, r);
              }
              if (null !== c[9]) {
                const d = c[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  yl(h[1], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function fs(e) {
        const t = D(),
          n = W(),
          r = Nd();
        Oa(r + 1);
        const o = lm(n, r);
        if (e.dirty && Id(t) === (2 == (2 & o.metadata.flags))) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? yl(n, t, r, []) : im(n, t, o, r);
            e.reset(i, vM), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function sm(e, t, n) {
        const r = W();
        r.firstCreatePass &&
          ((function um(e, t, n) {
            null === e.queries && (e.queries = new gl()),
              e.queries.track(new ml(t, n));
          })(r, new om(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function am(e, t, n) {
            const r = new dl(4 == (4 & n));
            Dh(e, t, r, r.destroy),
              null === t[19] && (t[19] = new pl()),
              t[19].queries.push(new hl(r));
          })(r, D(), t);
      }
      function lm(e, t) {
        return e.queries.getByIndex(t);
      }
      function ms(...e) {}
      const ys = new z("Application Initializer");
      let Hr = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ms),
              (this.reject = ms),
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
                if (ns(i)) n.push(i);
                else if (wp(i)) {
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
            return new (n || e)(S(ys, 8));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Uo = new z("AppId"),
        SS = {
          provide: Uo,
          useFactory: function MS() {
            return `${bl()}${bl()}${bl()}`;
          },
          deps: [],
        };
      function bl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Sm = new z("Platform Initializer"),
        vs = new z("Platform ID"),
        Im = new z("appBootstrapListener");
      let Tm = (() => {
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
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Cn = new z("LocaleId"),
        xm = new z("DefaultCurrencyCode");
      class IS {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Ds = (() => {
        class e {
          compileModuleSync(n) {
            return new ll(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = kt(st(n).declarations).reduce((s, a) => {
                const u = Ae(a);
                return u && s.push(new ul(u)), s;
              }, []);
            return new IS(r, i);
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
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const xS = (() => Promise.resolve(0))();
      function Ml(e) {
        "undefined" == typeof Zone
          ? xS.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Ce {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new He(!1)),
            (this.onMicrotaskEmpty = new He(!1)),
            (this.onStable = new He(!1)),
            (this.onError = new He(!1)),
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
            (o.nativeRequestAnimationFrame = (function AS() {
              let e = J.requestAnimationFrame,
                t = J.cancelAnimationFrame;
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
            (function RS(e) {
              const t = () => {
                !(function OS(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(J, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Il(e),
                                (e.isCheckStableRunning = !0),
                                Sl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Il(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return Am(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Pm(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return Am(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Pm(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Il(e),
                          Sl(e))
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
          if (!Ce.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Ce.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, PS, ms, ms);
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
      const PS = {};
      function Sl(e) {
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
      function Il(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Am(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Pm(e) {
        e._nesting--, Sl(e);
      }
      class NS {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new He()),
            (this.onMicrotaskEmpty = new He()),
            (this.onStable = new He()),
            (this.onError = new He());
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
      let Tl = (() => {
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
                      Ce.assertNotInAngularZone(),
                        Ml(() => {
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
                Ml(() => {
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
              return new (n || e)(S(Ce));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Om = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), xl.addToWindow(this);
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
              return xl.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      class FS {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null;
        }
      }
      let St,
        xl = new FS();
      const Rm = new z("AllowMultipleToken");
      class Nm {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Fm(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new z(r);
        return (i = []) => {
          let s = km();
          if (!s || s.injector.get(Rm, !1))
            if (e) e(n.concat(i).concat({ provide: o, useValue: !0 }));
            else {
              const a = n
                .concat(i)
                .concat(
                  { provide: o, useValue: !0 },
                  { provide: Lu, useValue: "platform" }
                );
              !(function VS(e) {
                if (St && !St.destroyed && !St.injector.get(Rm, !1))
                  throw new Q(400, "");
                St = e.get(Lm);
                const t = e.get(Sm, null);
                t && t.forEach((n) => n());
              })(Re.create({ providers: a, name: r }));
            }
          return (function BS(e) {
            const t = km();
            if (!t) throw new Q(401, "");
            return t;
          })();
        };
      }
      function km() {
        return St && !St.destroyed ? St : null;
      }
      let Lm = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function HS(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new NS()
                      : ("zone.js" === e ? void 0 : e) ||
                        new Ce({
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
              u = [{ provide: Ce, useValue: a }];
            return a.run(() => {
              const l = Re.create({
                  providers: u,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(l),
                d = c.injector.get(pr, null);
              if (!d) throw new Q(402, "");
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    Al(this._modules, c), f.unsubscribe();
                  });
                }),
                (function US(e, t, n) {
                  try {
                    const r = n();
                    return ns(r)
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
                  const f = c.injector.get(Hr);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function vb(e) {
                          Qe(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (mg = e.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(Cn, os) || os),
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
            const o = jm({}, r);
            return (function LS(e, t, n) {
              const r = new ll(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get($o);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new Q(403, "");
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
            if (this._destroyed) throw new Q(404, "");
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
            return new (n || e)(S(Re));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function jm(e, t) {
        return Array.isArray(t)
          ? t.reduce(jm, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let $o = (() => {
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
                    Ce.assertNotInAngularZone(),
                      Ml(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), l.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  Ce.assertInAngularZone(),
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
            this.isStable = (function ND(...e) {
              const t = Xr(e),
                n = (function ID(e, t) {
                  return "number" == typeof ia(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? zt(r[0])
                  : Yr(n)(Ie(r, t))
                : Gt;
            })(
              a,
              u.pipe(
                (function FD(e = {}) {
                  const {
                    connector: t = () => new $t(),
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
                    return Me((m, y) => {
                      l++, !d && !c && f();
                      const v = (u = null != u ? u : t());
                      y.add(() => {
                        l--, 0 === l && !d && !c && (a = sa(p, o));
                      }),
                        v.subscribe(y),
                        s ||
                          ((s = new fi({
                            next: (g) => v.next(g),
                            error: (g) => {
                              (d = !0), f(), (a = sa(h, n, g)), v.error(g);
                            },
                            complete: () => {
                              (c = !0), f(), (a = sa(h, r)), v.complete();
                            },
                          })),
                          Ie(m).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new Q(405, "");
            let o;
            (o =
              n instanceof Hg
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const i = (function jS(e) {
                return e.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(rn),
              a = o.create(Re.NULL, [], r || o.selector, i),
              u = a.location.nativeElement,
              l = a.injector.get(Tl, null),
              c = l && a.injector.get(Om);
            return (
              l && c && c.registerApplication(u, l),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  Al(this.components, a),
                  c && c.unregisterApplication(u);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new Q(101, "");
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
            Al(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(Im, [])
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
            return new (n || e)(S(Ce), S(Re), S(pr), S(kr), S(Hr));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Al(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Bm = !0,
        Pl = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = qS), e;
        })();
      function qS(e) {
        return (function GS(e, t, n) {
          if (Ci(e) && !n) {
            const r = Ke(e.index, t);
            return new jo(r, r);
          }
          return 47 & e.type ? new jo(t[16], t) : null;
        })(ye(), D(), 16 == (16 & e));
      }
      class Wm {
        constructor() {}
        supports(t) {
          return To(t);
        }
        create(t) {
          return new YS(t);
        }
      }
      const JS = (e, t) => t;
      class YS {
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
            (this._trackByFn = t || JS);
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
            const s = !r || (n && n.currentIndex < Zm(r, o, i)) ? n : r,
              a = Zm(s, o, i),
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
          if ((null == t && (t = []), !To(t))) throw new Q(900, "");
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
              (function XE(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[wr()]();
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
              : (t = this._addAfter(new XS(n, r), i, o)),
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
            null === this._linkedRecords && (this._linkedRecords = new Qm()),
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
              (this._unlinkedRecords = new Qm()),
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
      class XS {
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
      class eI {
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
      class Qm {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new eI()), this.map.set(n, r)), r.add(t);
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
      function Zm(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class Km {
        constructor() {}
        supports(t) {
          return t instanceof Map || $u(t);
        }
        create() {
          return new tI();
        }
      }
      class tI {
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
            if (!(t instanceof Map || $u(t))) throw new Q(900, "");
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
          const r = new nI(t);
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
      class nI {
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
      function Jm() {
        return new zo([new Wm()]);
      }
      let zo = (() => {
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
              useFactory: (r) => e.create(n, r || Jm()),
              deps: [[e, new cr(), new Nt()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new Q(901, "");
          }
        }
        return (e.ɵprov = j({ token: e, providedIn: "root", factory: Jm })), e;
      })();
      function Ym() {
        return new Ur([new Km()]);
      }
      let Ur = (() => {
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
              useFactory: (r) => e.create(n, r || Ym()),
              deps: [[e, new cr(), new Nt()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new Q(901, "");
          }
        }
        return (e.ɵprov = j({ token: e, providedIn: "root", factory: Ym })), e;
      })();
      const rI = [new Km()],
        iI = new zo([new Wm()]),
        sI = new Ur(rI),
        aI = Fm(null, "core", [
          { provide: vs, useValue: "unknown" },
          { provide: Lm, deps: [Re] },
          { provide: Om, deps: [] },
          { provide: Tm, deps: [] },
        ]),
        fI = [
          { provide: $o, useClass: $o, deps: [Ce, Re, pr, kr, Hr] },
          {
            provide: MM,
            deps: [Ce],
            useFactory: function hI(e) {
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
          { provide: Hr, useClass: Hr, deps: [[new Nt(), ys]] },
          { provide: Ds, useClass: Ds, deps: [] },
          SS,
          {
            provide: zo,
            useFactory: function uI() {
              return iI;
            },
            deps: [],
          },
          {
            provide: Ur,
            useFactory: function lI() {
              return sI;
            },
            deps: [],
          },
          {
            provide: Cn,
            useFactory: function cI(e) {
              return (
                e ||
                (function dI() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || os
                  );
                })()
              );
            },
            deps: [[new yo(Cn), new Nt(), new cr()]],
          },
          { provide: xm, useValue: "USD" },
        ];
      let pI = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S($o));
            }),
            (e.ɵmod = Kt({ type: e })),
            (e.ɵinj = xt({ providers: fI })),
            e
          );
        })(),
        _s = null;
      function _n() {
        return _s;
      }
      const tt = new z("DocumentToken");
      let Bn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return (function vI() {
                return S(Xm);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const DI = new z("Location Initialized");
      let Xm = (() => {
        class e extends Bn {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return _n().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = _n().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = _n().getGlobalEventTarget(this._doc, "window");
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
            ey() ? this._history.pushState(n, r, o) : (this.location.hash = o);
          }
          replaceState(n, r, o) {
            ey()
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
            return new (n || e)(S(tt));
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return (function CI() {
                return new Xm(S(tt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function ey() {
        return !!window.history.pushState;
      }
      function kl(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function ty(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function sn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let $r = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({
            token: e,
            factory: function () {
              return (function _I(e) {
                const t = S(tt).location;
                return new ny(S(Bn), (t && t.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Ll = new z("appBaseHref");
      let ny = (() => {
          class e extends $r {
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
              return kl(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  sn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + sn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + sn(i));
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
              return new (n || e)(S(Bn), S(Ll, 8));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        wI = (() => {
          class e extends $r {
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
              const r = kl(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + sn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + sn(i));
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
              return new (n || e)(S(Bn), S(Ll, 8));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        jl = (() => {
          class e {
            constructor(n, r) {
              (this._subject = new He()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n);
              const o = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = ty(ry(o))),
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
              return this.path() == this.normalize(n + sn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function bI(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, ry(n))
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
                  this.prepareExternalUrl(n + sn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._platformStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + sn(r)),
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
            (e.normalizeQueryParams = sn),
            (e.joinWithSlash = kl),
            (e.stripTrailingSlash = ty),
            (e.ɵfac = function (n) {
              return new (n || e)(S($r), S(Bn));
            }),
            (e.ɵprov = j({
              token: e,
              factory: function () {
                return (function EI() {
                  return new jl(S($r), S(Bn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function ry(e) {
        return e.replace(/\/index.html$/, "");
      }
      var pe = (() => (
        ((pe = pe || {})[(pe.Zero = 0)] = "Zero"),
        (pe[(pe.One = 1)] = "One"),
        (pe[(pe.Two = 2)] = "Two"),
        (pe[(pe.Few = 3)] = "Few"),
        (pe[(pe.Many = 4)] = "Many"),
        (pe[(pe.Other = 5)] = "Other"),
        pe
      ))();
      const PI = function pg(e) {
        return (function Be(e) {
          const t = (function pb(e) {
            return e.toLowerCase().replace(/_/g, "-");
          })(e);
          let n = gg(t);
          if (n) return n;
          const r = t.split("-")[0];
          if (((n = gg(r)), n)) return n;
          if ("en" === r) return hb;
          throw new Error(`Missing locale data for the locale "${e}".`);
        })(e)[E.PluralCase];
      };
      class Ps {}
      let sT = (() => {
        class e extends Ps {
          constructor(n) {
            super(), (this.locale = n);
          }
          getPluralCategory(n, r) {
            switch (PI(r || this.locale)(n)) {
              case pe.Zero:
                return "zero";
              case pe.One:
                return "one";
              case pe.Two:
                return "two";
              case pe.Few:
                return "few";
              case pe.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(Cn));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function fy(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class lT {
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
      let hy = (() => {
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
                  new lT(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), py(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              py(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Mt), M(on), M(zo));
          }),
          (e.ɵdir = Te({
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
      function py(e, t) {
        e.context.$implicit = t.item;
      }
      let gy = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new cT()),
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
            my("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            my("ngIfElse", n),
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
            return new (n || e)(M(Mt), M(on));
          }),
          (e.ɵdir = Te({
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
      class cT {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function my(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${K(t)}'.`
          );
      }
      let vy = (() => {
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
              return new (n || e)(M(nn), M(Ur), M(Lo));
            }),
            (e.ɵdir = Te({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
            })),
            e
          );
        })(),
        kT = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Kt({ type: e })),
            (e.ɵinj = xt({ providers: [{ provide: Ps, useClass: sT }] })),
            e
          );
        })();
      let BT = (() => {
        class e {}
        return (
          (e.ɵprov = j({
            token: e,
            providedIn: "root",
            factory: () => new HT(S(tt), window),
          })),
          e
        );
      })();
      class HT {
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
          const n = (function UT(e, t) {
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
              _y(this.window.history) ||
              _y(Object.getPrototypeOf(this.window.history));
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
      function _y(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class wy {}
      class Jl extends class $T extends class yI {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function mI(e) {
            _s || (_s = e);
          })(new Jl());
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
          const n = (function zT() {
            return (
              (Wo = Wo || document.querySelector("base")),
              Wo ? Wo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function qT(e) {
                (Os = Os || document.createElement("a")),
                  Os.setAttribute("href", e);
                const t = Os.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Wo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return fy(document.cookie, t);
        }
      }
      let Os,
        Wo = null;
      const Ey = new z("TRANSITION_ID"),
        WT = [
          {
            provide: ys,
            useFactory: function GT(e, t, n) {
              return () => {
                n.get(Hr).donePromise.then(() => {
                  const r = _n(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Ey, tt, Re],
            multi: !0,
          },
        ];
      class Yl {
        static init() {
          !(function kS(e) {
            xl = e;
          })(new Yl());
        }
        addToWindow(t) {
          (J.getAngularTestability = (r, o = !0) => {
            const i = t.findTestabilityInTree(r, o);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (J.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (J.getAllAngularRootElements = () => t.getAllRootElements()),
            J.frameworkStabilizers || (J.frameworkStabilizers = []),
            J.frameworkStabilizers.push((r) => {
              const o = J.getAllAngularTestabilities();
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
            ? _n().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null;
        }
      }
      let QT = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Rs = new z("EventManagerPlugins");
      let Ns = (() => {
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
            return new (n || e)(S(Rs), S(Ce));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class by {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = _n().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let My = (() => {
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
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Qo = (() => {
          class e extends My {
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
              r && r.forEach(Sy), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(Sy));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(tt));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function Sy(e) {
        _n().remove(e);
      }
      const Xl = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        ec = /%COMP%/g;
      function Fs(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? Fs(e, o, n) : ((o = o.replace(ec, e)), n.push(o));
        }
        return n;
      }
      function xy(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let tc = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new nc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case At.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new ex(
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
              case At.ShadowDom:
                return new tx(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Fs(r.id, r.styles, []);
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
            return new (n || e)(S(Ns), S(Qo), S(Uo));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class nc {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Xl[n], t)
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
            const i = Xl[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Xl[r];
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
          o & (Ye.DashCase | Ye.Important)
            ? t.style.setProperty(n, r, o & Ye.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Ye.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, xy(r))
            : this.eventManager.addEventListener(t, n, xy(r));
        }
      }
      class ex extends nc {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = Fs(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function JT(e) {
              return "_ngcontent-%COMP%".replace(ec, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function YT(e) {
              return "_nghost-%COMP%".replace(ec, e);
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
      class tx extends nc {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Fs(o.id, o.styles, []);
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
      let nx = (() => {
        class e extends by {
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
            return new (n || e)(S(tt));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Py = ["alt", "control", "meta", "shift"],
        ox = {
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
        Oy = {
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
        ix = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let sx = (() => {
        class e extends by {
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
              .runOutsideAngular(() => _n().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "";
            if (
              (Py.forEach((u) => {
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
              o = (function ax(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && Oy.hasOwnProperty(t) && (t = Oy[t]));
                }
                return ox[t] || t;
              })(n);
            return (
              (o = o.toLowerCase()),
              " " === o ? (o = "space") : "." === o && (o = "dot"),
              Py.forEach((i) => {
                i != o && ix[i](n) && (r += i + ".");
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
            return new (n || e)(S(tt));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const dx = Fm(aI, "browser", [
          { provide: vs, useValue: "browser" },
          {
            provide: Sm,
            useValue: function ux() {
              Jl.makeCurrent(), Yl.init();
            },
            multi: !0,
          },
          {
            provide: tt,
            useFactory: function cx() {
              return (
                (function dC(e) {
                  Ea = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        fx = [
          { provide: Lu, useValue: "root" },
          {
            provide: pr,
            useFactory: function lx() {
              return new pr();
            },
            deps: [],
          },
          { provide: Rs, useClass: nx, multi: !0, deps: [tt, Ce, vs] },
          { provide: Rs, useClass: sx, multi: !0, deps: [tt] },
          { provide: tc, useClass: tc, deps: [Ns, Qo, Uo] },
          { provide: $g, useExisting: tc },
          { provide: My, useExisting: Qo },
          { provide: Qo, useClass: Qo, deps: [tt] },
          { provide: Tl, useClass: Tl, deps: [Ce] },
          { provide: Ns, useClass: Ns, deps: [Rs, Ce] },
          { provide: wy, useClass: QT, deps: [] },
        ];
      let hx = (() => {
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
                { provide: Uo, useValue: n.appId },
                { provide: Ey, useExisting: Uo },
                WT,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(e, 12));
          }),
          (e.ɵmod = Kt({ type: e })),
          (e.ɵinj = xt({ providers: fx, imports: [kT, pI] })),
          e
        );
      })();
      function k(...e) {
        return Ie(e, Xr(e));
      }
      "undefined" != typeof window && window;
      class pt extends $t {
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
      const { isArray: bx } = Array,
        { getPrototypeOf: Mx, prototype: Sx, keys: Ix } = Object;
      const { isArray: Ax } = Array;
      function Nx(...e) {
        const t = Xr(e),
          n = (function SD(e) {
            return ne(ia(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function Tx(e) {
            if (1 === e.length) {
              const t = e[0];
              if (bx(t)) return { args: t, keys: null };
              if (
                (function xx(e) {
                  return e && "object" == typeof e && Mx(e) === Sx;
                })(t)
              ) {
                const n = Ix(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return Ie([], t);
        const i = new ie(
          (function Fx(e, t, n = Tn) {
            return (r) => {
              Fy(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    Fy(
                      t,
                      () => {
                        const l = Ie(e[u], t);
                        let c = !1;
                        l.subscribe(
                          new Se(
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
          })(
            r,
            t,
            o
              ? (s) =>
                  (function Rx(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : Tn
          )
        );
        return n
          ? i.pipe(
              (function Ox(e) {
                return Z((t) =>
                  (function Px(e, t) {
                    return Ax(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function Fy(e, t, n) {
        e ? qt(n, e, t) : t();
      }
      const ks = Kr(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function oc(...e) {
        return (function kx() {
          return Yr(1);
        })()(Ie(e, Xr(e)));
      }
      function ky(e) {
        return new ie((t) => {
          zt(e()).subscribe(t);
        });
      }
      function Ly() {
        return Me((e, t) => {
          let n = null;
          e._refCount++;
          const r = new Se(t, void 0, void 0, void 0, () => {
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
      class Lx extends ie {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Zc(t) && (this.lift = t.lift);
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
            t = this._connection = new it();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                new Se(
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
              t.closed && ((this._connection = null), (t = it.EMPTY));
          }
          return t;
        }
        refCount() {
          return Ly()(this);
        }
      }
      function Hn(e, t) {
        return Me((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            new Se(
              r,
              (u) => {
                null == o || o.unsubscribe();
                let l = 0;
                const c = i++;
                zt(e(u, c)).subscribe(
                  (o = new Se(
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
      function Vx(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            u = t,
            l = 0;
          i.subscribe(
            new Se(
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
      function jy(e, t) {
        return Me(Vx(e, t, arguments.length >= 2, !0));
      }
      function Un(e, t) {
        return Me((n, r) => {
          let o = 0;
          n.subscribe(new Se(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function En(e) {
        return Me((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            new Se(n, void 0, void 0, (s) => {
              (i = zt(e(s, En(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function zr(e, t) {
        return ne(t) ? we(e, t, 1) : we(e, 1);
      }
      function ic(e) {
        return e <= 0
          ? () => Gt
          : Me((t, n) => {
              let r = [];
              t.subscribe(
                new Se(
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
      function Vy(e = Bx) {
        return Me((t, n) => {
          let r = !1;
          t.subscribe(
            new Se(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function Bx() {
        return new ks();
      }
      function By(e) {
        return Me((t, n) => {
          let r = !1;
          t.subscribe(
            new Se(
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
      function qr(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Un((o, i) => e(o, i, r)) : Tn,
            hi(1),
            n ? By(t) : Vy(() => new ks())
          );
      }
      function nt(e, t, n) {
        const r = ne(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Me((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                new Se(
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
          : Tn;
      }
      class un {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class sc extends un {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n), (this.navigationTrigger = r), (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Zo extends un {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Hy extends un {
        constructor(t, n, r) {
          super(t, n), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class $x extends un {
        constructor(t, n, r) {
          super(t, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class zx extends un {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class qx extends un {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Gx extends un {
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
      class Wx extends un {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Qx extends un {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Uy {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class $y {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Zx {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Kx {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Jx {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Yx {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zy {
        constructor(t, n, r) {
          (this.routerEvent = t), (this.position = n), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const U = "primary";
      class Xx {
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
      function Gr(e) {
        return new Xx(e);
      }
      const qy = "ngNavigationCancelingError";
      function ac(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t[qy] = !0), t;
      }
      function tA(e, t, n) {
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
      function Ht(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !Gy(e[o], t[o]))) return !1;
        return !0;
      }
      function Gy(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function Wy(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Qy(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function xe(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Ut(e) {
        return wp(e) ? e : ns(e) ? Ie(Promise.resolve(e)) : k(e);
      }
      const oA = {
          exact: function Jy(e, t, n) {
            if (
              !zn(e.segments, t.segments) ||
              !Ls(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Jy(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Yy,
        },
        Zy = {
          exact: function iA(e, t) {
            return Ht(e, t);
          },
          subset: function sA(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Gy(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Ky(e, t, n) {
        return (
          oA[n.paths](e.root, t.root, n.matrixParams) &&
          Zy[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Yy(e, t, n) {
        return Xy(e, t, t.segments, n);
      }
      function Xy(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!zn(o, n) || t.hasChildren() || !Ls(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!zn(e.segments, n) || !Ls(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !Yy(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(zn(e.segments, o) && Ls(e.segments, o, r) && e.children[U]) &&
            Xy(e.children[U], t, i, r)
          );
        }
      }
      function Ls(e, t, n) {
        return t.every((r, o) => Zy[n](e[o].parameters, r.parameters));
      }
      class $n {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Gr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return lA.serialize(this);
        }
      }
      class q {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            xe(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return js(this);
        }
      }
      class Ko {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Gr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return ov(this);
        }
      }
      function zn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      class ev {}
      class tv {
        parse(t) {
          const n = new vA(t);
          return new $n(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Jo(t.root, !0)}`,
            r = (function fA(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Vs(n)}=${Vs(o)}`).join("&")
                    : `${Vs(n)}=${Vs(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function cA(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const lA = new tv();
      function js(e) {
        return e.segments.map((t) => ov(t)).join("/");
      }
      function Jo(e, t) {
        if (!e.hasChildren()) return js(e);
        if (t) {
          const n = e.children[U] ? Jo(e.children[U], !1) : "",
            r = [];
          return (
            xe(e.children, (o, i) => {
              i !== U && r.push(`${i}:${Jo(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function uA(e, t) {
            let n = [];
            return (
              xe(e.children, (r, o) => {
                o === U && (n = n.concat(t(r, o)));
              }),
              xe(e.children, (r, o) => {
                o !== U && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === U ? [Jo(e.children[U], !1)] : [`${o}:${Jo(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[U]
            ? `${js(e)}/${n[0]}`
            : `${js(e)}/(${n.join("//")})`;
        }
      }
      function nv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Vs(e) {
        return nv(e).replace(/%3B/gi, ";");
      }
      function uc(e) {
        return nv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Bs(e) {
        return decodeURIComponent(e);
      }
      function rv(e) {
        return Bs(e.replace(/\+/g, "%20"));
      }
      function ov(e) {
        return `${uc(e.path)}${(function dA(e) {
          return Object.keys(e)
            .map((t) => `;${uc(t)}=${uc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const hA = /^[^\/()?;=#]+/;
      function Hs(e) {
        const t = e.match(hA);
        return t ? t[0] : "";
      }
      const pA = /^[^=?&#]+/,
        mA = /^[^&#]+/;
      class vA {
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
            (t.length > 0 || Object.keys(n).length > 0) && (r[U] = new q(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Hs(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Ko(Bs(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Hs(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Hs(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Bs(n)] = Bs(r);
        }
        parseQueryParam(t) {
          const n = (function gA(e) {
            const t = e.match(pA);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function yA(e) {
              const t = e.match(mA);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = rv(n),
            i = rv(r);
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
            const r = Hs(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o)
              throw new Error(`Cannot parse url '${this.url}'`);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.substr(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = U);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[U] : new q([], s)),
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
      class iv {
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
          const n = lc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = lc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = cc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return cc(t, this._root).map((n) => n.value);
        }
      }
      function lc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = lc(e, n);
          if (r) return r;
        }
        return null;
      }
      function cc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = cc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class ln {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Wr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class sv extends iv {
        constructor(t, n) {
          super(t), (this.snapshot = n), dc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function av(e, t) {
        const n = (function DA(e, t) {
            const s = new Us([], {}, {}, "", {}, U, t, null, e.root, -1, {});
            return new lv("", new ln(s, []));
          })(e, t),
          r = new pt([new Ko("", {})]),
          o = new pt({}),
          i = new pt({}),
          s = new pt({}),
          a = new pt(""),
          u = new Qr(r, o, s, a, i, U, t, n.root);
        return (u.snapshot = n.root), new sv(new ln(u, []), n);
      }
      class Qr {
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
              (this._paramMap = this.params.pipe(Z((t) => Gr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Z((t) => Gr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function uv(e, t = "emptyOnly") {
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
        return (function CA(e) {
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
      class Us {
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
            this._paramMap || (this._paramMap = Gr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Gr(this.queryParams)),
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
      class lv extends iv {
        constructor(t, n) {
          super(n), (this.url = t), dc(this, n);
        }
        toString() {
          return cv(this._root);
        }
      }
      function dc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => dc(e, n));
      }
      function cv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(cv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function fc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Ht(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Ht(t.params, n.params) || e.params.next(n.params),
            (function nA(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Ht(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Ht(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function hc(e, t) {
        const n =
          Ht(e.params, t.params) &&
          (function aA(e, t) {
            return (
              zn(e, t) && e.every((n, r) => Ht(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || hc(e.parent, t.parent))
        );
      }
      function Yo(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function wA(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Yo(e, r, o);
              return Yo(e, r);
            });
          })(e, t, n);
          return new ln(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Yo(e, a))),
                s
              );
            }
          }
          const r = (function EA(e) {
              return new Qr(
                new pt(e.url),
                new pt(e.params),
                new pt(e.queryParams),
                new pt(e.fragment),
                new pt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Yo(e, i));
          return new ln(r, o);
        }
      }
      function $s(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Xo(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function pc(e, t, n, r, o) {
        let i = {};
        return (
          r &&
            xe(r, (s, a) => {
              i[a] = Array.isArray(s) ? s.map((u) => `${u}`) : `${s}`;
            }),
          new $n(n.root === e ? t : dv(n.root, e, t), i, o)
        );
      }
      function dv(e, t, n) {
        const r = {};
        return (
          xe(e.children, (o, i) => {
            r[i] = o === t ? n : dv(o, t, n);
          }),
          new q(e.segments, r)
        );
      }
      class fv {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && $s(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const o = r.find(Xo);
          if (o && o !== Qy(r))
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
      class gc {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function hv(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return zs(e, t, n);
        const r = (function xA(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Xo(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!gv(u, l, s)) return i;
                r += 2;
              } else {
                if (!gv(u, {}, s)) return i;
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
            (i.children[U] = new q(e.segments.slice(r.pathIndex), e.children)),
            zs(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? mc(e, t, n)
          : r.match
          ? zs(e, 0, o)
          : mc(e, t, n);
      }
      function zs(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function TA(e) {
              return Xo(e[0]) ? e[0].outlets : { [U]: e };
            })(n),
            o = {};
          return (
            xe(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = hv(e.children[s], t, i));
            }),
            xe(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new q(e.segments, o)
          );
        }
      }
      function mc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Xo(i)) {
            const u = AA(i.outlets);
            return new q(r, u);
          }
          if (0 === o && $s(n[0])) {
            r.push(new Ko(e.segments[t].path, pv(n[0]))), o++;
            continue;
          }
          const s = Xo(i) ? i.outlets[U] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && $s(a)
            ? (r.push(new Ko(s, pv(a))), (o += 2))
            : (r.push(new Ko(s, {})), o++);
        }
        return new q(r, {});
      }
      function AA(e) {
        const t = {};
        return (
          xe(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = mc(new q([], {}), 0, n));
          }),
          t
        );
      }
      function pv(e) {
        const t = {};
        return xe(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function gv(e, t, n) {
        return e == n.path && Ht(t, n.parameters);
      }
      class OA {
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
            fc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Wr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            xe(o, (i, s) => {
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
            i = Wr(t);
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
            i = Wr(t);
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
          const o = Wr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new Yx(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Kx(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((fc(o), o === i))
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
                fc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = (function RA(e) {
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
      class yc {
        constructor(t, n) {
          (this.routes = t), (this.module = n);
        }
      }
      function bn(e) {
        return "function" == typeof e;
      }
      function qn(e) {
        return e instanceof $n;
      }
      const ei = Symbol("INITIAL_VALUE");
      function ti() {
        return Hn((e) =>
          Nx(
            e.map((t) =>
              t.pipe(
                hi(1),
                (function jx(...e) {
                  const t = Xr(e);
                  return Me((n, r) => {
                    (t ? oc(e, n, t) : oc(e, n)).subscribe(r);
                  });
                })(ei)
              )
            )
          ).pipe(
            jy((t, n) => {
              let r = !1;
              return n.reduce(
                (o, i, s) =>
                  o !== ei
                    ? o
                    : (i === ei && (r = !0),
                      r || (!1 !== i && s !== n.length - 1 && !qn(i)) ? o : i),
                t
              );
            }, ei),
            Un((t) => t !== ei),
            Z((t) => (qn(t) ? t : !0 === t)),
            hi(1)
          )
        );
      }
      class VA {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new ni()),
            (this.attachRef = null);
        }
      }
      class ni {
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
          return n || ((n = new VA()), this.contexts.set(t, n)), n;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let vc = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = o),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new He()),
              (this.deactivateEvents = new He()),
              (this.attachEvents = new He()),
              (this.detachEvents = new He()),
              (this.name = i || U),
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
              u = new BA(n, a, this.location.injector);
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
            return new (n || e)(M(ni), M(Mt), M(kr), lo("name"), M(Pl));
          }),
          (e.ɵdir = Te({
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
      class BA {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Qr
            ? this.route
            : t === ni
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let mv = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Zt({
            type: e,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Fe(0, "router-outlet");
            },
            directives: [vc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function yv(e, t = "") {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          HA(r, UA(t, r));
        }
      }
      function HA(e, t) {
        e.children && yv(e.children, t);
      }
      function UA(e, t) {
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
      function Dc(e) {
        const t = e.children && e.children.map(Dc),
          n = t
            ? Object.assign(Object.assign({}, e), { children: t })
            : Object.assign({}, e);
        return (
          !n.component &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== U &&
            (n.component = mv),
          n
        );
      }
      function gt(e) {
        return e.outlet || U;
      }
      function vv(e, t) {
        const n = e.filter((r) => gt(r) === t);
        return n.push(...e.filter((r) => gt(r) !== t)), n;
      }
      const Dv = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function qs(e, t, n) {
        var r;
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? Object.assign({}, Dv)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || tA)(n, e, t);
        if (!i) return Object.assign({}, Dv);
        const s = {};
        xe(i.posParams, (u, l) => {
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
      function Gs(e, t, n, r, o = "corrected") {
        if (
          n.length > 0 &&
          (function qA(e, t, n) {
            return n.some((r) => Ws(e, t, r) && gt(r) !== U);
          })(e, n, r)
        ) {
          const s = new q(
            t,
            (function zA(e, t, n, r) {
              const o = {};
              (o[U] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && gt(i) !== U) {
                  const s = new q([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[gt(i)] = s);
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
          (function GA(e, t, n) {
            return n.some((r) => Ws(e, t, r));
          })(e, n, r)
        ) {
          const s = new q(
            e.segments,
            (function $A(e, t, n, r, o, i) {
              const s = {};
              for (const a of r)
                if (Ws(e, n, a) && !o[gt(a)]) {
                  const u = new q([], {});
                  (u._sourceSegment = e),
                    (u._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (s[gt(a)] = u);
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
      function Ws(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function Cv(e, t, n, r) {
        return (
          !!(gt(e) === r || (r !== U && Ws(t, n, e))) &&
          ("**" === e.path || qs(t, e, n).matched)
        );
      }
      function _v(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      class ri {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class wv {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Qs(e) {
        return new ie((t) => t.error(new ri(e)));
      }
      function Ev(e) {
        return new ie((t) => t.error(new wv(e)));
      }
      function WA(e) {
        return new ie((t) =>
          t.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${e}'`
            )
          )
        );
      }
      class KA {
        constructor(t, n, r, o, i) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(rn));
        }
        apply() {
          const t = Gs(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new q(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, U)
            .pipe(
              Z((i) =>
                this.createUrlTree(
                  Cc(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              En((i) => {
                if (i instanceof wv)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof ri ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, U)
            .pipe(
              Z((o) => this.createUrlTree(Cc(o), t.queryParams, t.fragment))
            )
            .pipe(
              En((o) => {
                throw o instanceof ri ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, n, r) {
          const o = t.segments.length > 0 ? new q([], { [U]: t }) : t;
          return new $n(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(Z((i) => new q([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ie(o).pipe(
            zr((i) => {
              const s = r.children[i],
                a = vv(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                Z((u) => ({ segment: u, outlet: i }))
              );
            }),
            jy((i, s) => ((i[s.outlet] = s.segment), i), {}),
            (function Hx(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? Un((o, i) => e(o, i, r)) : Tn,
                  ic(1),
                  n ? By(t) : Vy(() => new ks())
                );
            })()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Ie(r).pipe(
            zr((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                En((l) => {
                  if (l instanceof ri) return k(null);
                  throw l;
                })
              )
            ),
            qr((a) => !!a),
            En((a, u) => {
              if (a instanceof ks || "EmptyError" === a.name) {
                if (_v(n, o, i)) return k(new q([], {}));
                throw new ri(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return Cv(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Qs(n)
            : Qs(n);
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
            ? Ev(i)
            : this.lineralizeSegments(r, i).pipe(
                we((s) => {
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
          } = qs(n, o, i);
          if (!a) return Qs(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? Ev(d)
            : this.lineralizeSegments(o, d).pipe(
                we((f) =>
                  this.expandSegment(t, n, r, f.concat(i.slice(l)), s, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? k(r._loadedConfig)
                  : this.configLoader.load(t.injector, r)
                ).pipe(Z((f) => ((r._loadedConfig = f), new q(o, {}))))
              : k(new q(o, {}));
          const { matched: s, consumedSegments: a, lastChild: u } = qs(n, r, o);
          if (!s) return Qs(n);
          const l = o.slice(u);
          return this.getChildConfig(t, r, o).pipe(
            we((d) => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: m } = Gs(n, a, l, h),
                y = new q(p.segments, p.children);
              if (0 === m.length && y.hasChildren())
                return this.expandChildren(f, h, y).pipe(Z((T) => new q(a, T)));
              if (0 === h.length && 0 === m.length) return k(new q(a, {}));
              const v = gt(r) === i;
              return this.expandSegment(f, y, h, m, v ? U : i, !0).pipe(
                Z((b) => new q(a.concat(b.segments), b.children))
              );
            })
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? k(new yc(n.children, t))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? k(n._loadedConfig)
              : this.runCanLoadGuards(t.injector, n, r).pipe(
                  we((o) =>
                    o
                      ? this.configLoader
                          .load(t.injector, n)
                          .pipe(Z((i) => ((n._loadedConfig = i), i)))
                      : (function QA(e) {
                          return new ie((t) =>
                            t.error(
                              ac(
                                `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                              )
                            )
                          );
                        })(n)
                  )
                )
            : k(new yc([], t));
        }
        runCanLoadGuards(t, n, r) {
          const o = n.canLoad;
          return o && 0 !== o.length
            ? k(
                o.map((s) => {
                  const a = t.get(s);
                  let u;
                  if (
                    (function FA(e) {
                      return e && bn(e.canLoad);
                    })(a)
                  )
                    u = a.canLoad(n, r);
                  else {
                    if (!bn(a)) throw new Error("Invalid CanLoad guard");
                    u = a(n, r);
                  }
                  return Ut(u);
                })
              ).pipe(
                ti(),
                nt((s) => {
                  if (!qn(s)) return;
                  const a = ac(
                    `Redirecting to "${this.urlSerializer.serialize(s)}"`
                  );
                  throw ((a.url = s), a);
                }),
                Z((s) => !0 === s)
              )
            : k(!0);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return k(r);
            if (o.numberOfChildren > 1 || !o.children[U])
              return WA(t.redirectTo);
            o = o.children[U];
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
          return new $n(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            xe(t, (o, i) => {
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
            xe(n.children, (a, u) => {
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
      function Cc(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Cc(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function JA(e) {
          if (1 === e.numberOfChildren && e.children[U]) {
            const t = e.children[U];
            return new q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new q(e.segments, t));
      }
      class bv {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Zs {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function XA(e, t, n) {
        const r = e._root;
        return oi(r, t ? t._root : null, n, [r.value]);
      }
      function Ks(e, t, n) {
        const r = (function tP(e) {
          if (!e) return null;
          for (let t = e.parent; t; t = t.parent) {
            const n = t.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(t);
        return (r ? r.module.injector : n).get(e);
      }
      function oi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Wr(t);
        return (
          e.children.forEach((s) => {
            (function nP(
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
                const u = (function rP(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !zn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !zn(e.url, t.url) || !Ht(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !hc(e, t) || !Ht(e.queryParams, t.queryParams);
                    default:
                      return !hc(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new bv(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  oi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Zs(a.outlet.component, s));
              } else
                s && ii(t, a, o),
                  o.canActivateChecks.push(new bv(r)),
                  oi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          xe(i, (s, a) => ii(s, n.getContext(a), o)),
          o
        );
      }
      function ii(e, t, n) {
        const r = Wr(e),
          o = e.value;
        xe(r, (i, s) => {
          ii(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Zs(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      class fP {}
      function Mv(e) {
        return new ie((t) => t.error(e));
      }
      class pP {
        constructor(t, n, r, o, i, s) {
          (this.rootComponentType = t),
            (this.config = n),
            (this.urlTree = r),
            (this.url = o),
            (this.paramsInheritanceStrategy = i),
            (this.relativeLinkResolution = s);
        }
        recognize() {
          const t = Gs(
              this.urlTree.root,
              [],
              [],
              this.config.filter((s) => void 0 === s.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, t, U);
          if (null === n) return null;
          const r = new Us(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              U,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            o = new ln(r, n),
            i = new lv(this.url, o);
          return this.inheritParamsAndData(i._root), i;
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = uv(n, this.paramsInheritanceStrategy);
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
              a = vv(t, i),
              u = this.processSegmentGroup(a, s, i);
            if (null === u) return null;
            r.push(...u);
          }
          const o = Sv(r);
          return (
            (function gP(e) {
              e.sort((t, n) =>
                t.value.outlet === U
                  ? -1
                  : n.value.outlet === U
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
          return _v(n, r, o) ? [] : null;
        }
        processSegmentAgainstRoute(t, n, r, o) {
          if (t.redirectTo || !Cv(t, n, r, o)) return null;
          let i,
            s = [],
            a = [];
          if ("**" === t.path) {
            const h = r.length > 0 ? Qy(r).parameters : {};
            i = new Us(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              xv(t),
              gt(t),
              t.component,
              t,
              Iv(n),
              Tv(n) + r.length,
              Av(t)
            );
          } else {
            const h = qs(n, t, r);
            if (!h.matched) return null;
            (s = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (i = new Us(
                s,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                xv(t),
                gt(t),
                t.component,
                t,
                Iv(n),
                Tv(n) + s.length,
                Av(t)
              ));
          }
          const u = (function mP(e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = Gs(
              n,
              s,
              a,
              u.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const h = this.processChildren(u, l);
            return null === h ? null : [new ln(i, h)];
          }
          if (0 === u.length && 0 === c.length) return [new ln(i, [])];
          const d = gt(t) === o,
            f = this.processSegment(u, l, c, d ? U : o);
          return null === f ? null : [new ln(i, f)];
        }
      }
      function yP(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Sv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!yP(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = Sv(r.children);
          t.push(new ln(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function Iv(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Tv(e) {
        let t = e,
          n = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (n += t._segmentIndexShift ? t._segmentIndexShift : 0);
        return n - 1;
      }
      function xv(e) {
        return e.data || {};
      }
      function Av(e) {
        return e.resolve || {};
      }
      function Pv(e) {
        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
      }
      function _c(e) {
        return Hn((t) => {
          const n = e(t);
          return n ? Ie(n).pipe(Z(() => t)) : k(t);
        });
      }
      class MP extends class bP {
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
      const wc = new z("ROUTES");
      class Ov {
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
            Z((i) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const s = i.create(t);
              return new yc(
                Wy(s.injector.get(wc, void 0, N.Self | N.Optional)).map(Dc),
                s
              );
            }),
            En((i) => {
              throw ((n._loader$ = void 0), i);
            })
          );
          return (
            (n._loader$ = new Lx(o, () => new $t()).pipe(Ly())), n._loader$
          );
        }
        loadModuleFactory(t) {
          return Ut(t()).pipe(
            we((n) =>
              n instanceof Gg ? k(n) : Ie(this.compiler.compileModuleAsync(n))
            )
          );
        }
      }
      class IP {
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
      function TP(e) {
        throw e;
      }
      function xP(e, t, n) {
        return t.parse("/");
      }
      function Rv(e, t) {
        return k(null);
      }
      const AP = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        PP = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let rt = (() => {
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
              (this.events = new $t()),
              (this.errorHandler = TP),
              (this.malformedUriErrorHandler = xP),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: Rv,
                afterPreactivation: Rv,
              }),
              (this.urlHandlingStrategy = new IP()),
              (this.routeReuseStrategy = new MP()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = s.get(rn)),
              (this.console = s.get(Tm));
            const d = s.get(Ce);
            (this.isNgZoneEnabled = d instanceof Ce && Ce.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = (function rA() {
                return new $n(new q([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new Ov(
                s,
                a,
                (f) => this.triggerEvent(new Uy(f)),
                (f) => this.triggerEvent(new $y(f))
              )),
              (this.routerState = av(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new pt({
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
              Un((o) => 0 !== o.id),
              Z((o) =>
                Object.assign(Object.assign({}, o), {
                  extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
                })
              ),
              Hn((o) => {
                let i = !1,
                  s = !1;
                return k(o).pipe(
                  nt((a) => {
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
                  Hn((a) => {
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
                        Js(a.source) && (this.browserUrlTree = a.extractedUrl),
                        k(a).pipe(
                          Hn((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new sc(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Gt
                                : Promise.resolve(d)
                            );
                          }),
                          (function YA(e, t, n, r) {
                            return Hn((o) =>
                              (function ZA(e, t, n, r, o) {
                                return new KA(e, t, n, r, o).apply();
                              })(e, t, n, o.extractedUrl, r).pipe(
                                Z((i) =>
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
                          nt((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function vP(e, t, n, r, o) {
                            return we((i) =>
                              (function hP(
                                e,
                                t,
                                n,
                                r,
                                o = "emptyOnly",
                                i = "legacy"
                              ) {
                                try {
                                  const s = new pP(
                                    e,
                                    t,
                                    n,
                                    r,
                                    o,
                                    i
                                  ).recognize();
                                  return null === s ? Mv(new fP()) : k(s);
                                } catch (s) {
                                  return Mv(s);
                                }
                              })(
                                e,
                                t,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                o
                              ).pipe(
                                Z((s) =>
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
                          nt((d) => {
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
                            const f = new zx(
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
                        v = new sc(f, this.serializeUrl(h), p, m);
                      r.next(v);
                      const g = av(h, this.rootComponentType).snapshot;
                      return k(
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
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Gt;
                  }),
                  _c((a) => {
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
                  nt((a) => {
                    const u = new qx(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(u);
                  }),
                  Z((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: XA(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function oP(e, t) {
                    return we((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === i.length
                        ? k(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function iP(e, t, n, r) {
                            return Ie(e).pipe(
                              we((o) =>
                                (function dP(e, t, n, r, o) {
                                  const i =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? k(
                                        i.map((a) => {
                                          const u = Ks(a, t, o);
                                          let l;
                                          if (
                                            (function jA(e) {
                                              return e && bn(e.canDeactivate);
                                            })(u)
                                          )
                                            l = Ut(u.canDeactivate(e, t, n, r));
                                          else {
                                            if (!bn(u))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            l = Ut(u(e, t, n, r));
                                          }
                                          return l.pipe(qr());
                                        })
                                      ).pipe(ti())
                                    : k(!0);
                                })(o.component, o.route, n, t, r)
                              ),
                              qr((o) => !0 !== o, !0)
                            );
                          })(s, r, o, e).pipe(
                            we((a) =>
                              a &&
                              (function NA(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function sP(e, t, n, r) {
                                    return Ie(t).pipe(
                                      zr((o) =>
                                        oc(
                                          (function uP(e, t) {
                                            return (
                                              null !== e && t && t(new Zx(e)),
                                              k(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function aP(e, t) {
                                            return (
                                              null !== e && t && t(new Jx(e)),
                                              k(!0)
                                            );
                                          })(o.route, r),
                                          (function cP(e, t, n) {
                                            const r = t[t.length - 1],
                                              i = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function eP(e) {
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
                                                  ky(() =>
                                                    k(
                                                      s.guards.map((u) => {
                                                        const l = Ks(
                                                          u,
                                                          s.node,
                                                          n
                                                        );
                                                        let c;
                                                        if (
                                                          (function LA(e) {
                                                            return (
                                                              e &&
                                                              bn(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(l)
                                                        )
                                                          c = Ut(
                                                            l.canActivateChild(
                                                              r,
                                                              e
                                                            )
                                                          );
                                                        else {
                                                          if (!bn(l))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = Ut(l(r, e));
                                                        }
                                                        return c.pipe(qr());
                                                      })
                                                    ).pipe(ti())
                                                  )
                                                );
                                            return k(i).pipe(ti());
                                          })(e, o.path, n),
                                          (function lP(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return k(!0);
                                            const o = r.map((i) =>
                                              ky(() => {
                                                const s = Ks(i, t, n);
                                                let a;
                                                if (
                                                  (function kA(e) {
                                                    return (
                                                      e && bn(e.canActivate)
                                                    );
                                                  })(s)
                                                )
                                                  a = Ut(s.canActivate(t, e));
                                                else {
                                                  if (!bn(s))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = Ut(s(t, e));
                                                }
                                                return a.pipe(qr());
                                              })
                                            );
                                            return k(o).pipe(ti());
                                          })(e, o.route, n)
                                        )
                                      ),
                                      qr((o) => !0 !== o, !0)
                                    );
                                  })(r, i, e, t)
                                : k(a)
                            ),
                            Z((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  nt((a) => {
                    if (qn(a.guardsResult)) {
                      const l = ac(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((l.url = a.guardsResult), l);
                    }
                    const u = new Gx(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(u);
                  }),
                  Un(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  _c((a) => {
                    if (a.guards.canActivateChecks.length)
                      return k(a).pipe(
                        nt((u) => {
                          const l = new Wx(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        Hn((u) => {
                          let l = !1;
                          return k(u).pipe(
                            (function DP(e, t) {
                              return we((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = n;
                                if (!o.length) return k(n);
                                let i = 0;
                                return Ie(o).pipe(
                                  zr((s) =>
                                    (function CP(e, t, n, r) {
                                      return (function _P(e, t, n, r) {
                                        const o = Pv(e);
                                        if (0 === o.length) return k({});
                                        const i = {};
                                        return Ie(o).pipe(
                                          we((s) =>
                                            (function wP(e, t, n, r) {
                                              const o = Ks(e, t, r);
                                              return Ut(
                                                o.resolve
                                                  ? o.resolve(t, n)
                                                  : o(t, n)
                                              );
                                            })(e[s], t, n, r).pipe(
                                              nt((a) => {
                                                i[s] = a;
                                              })
                                            )
                                          ),
                                          ic(1),
                                          we(() =>
                                            Pv(i).length === o.length
                                              ? k(i)
                                              : Gt
                                          )
                                        );
                                      })(e._resolve, e, t, r).pipe(
                                        Z(
                                          (i) => (
                                            (e._resolvedData = i),
                                            (e.data = Object.assign(
                                              Object.assign({}, e.data),
                                              uv(e, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  nt(() => i++),
                                  ic(1),
                                  we((s) => (i === o.length ? k(n) : Gt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            nt({
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
                        nt((u) => {
                          const l = new Qx(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        })
                      );
                  }),
                  _c((a) => {
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
                  Z((a) => {
                    const u = (function _A(e, t, n) {
                      const r = Yo(e, t._root, n ? n._root : void 0);
                      return new sv(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: u,
                    });
                  }),
                  nt((a) => {
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
                    Z(
                      (r) => (
                        new OA(
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
                  nt({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  (function Ux(e) {
                    return Me((t, n) => {
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
                  En((a) => {
                    if (
                      ((s = !0),
                      (function eA(e) {
                        return e && e[qy];
                      })(a))
                    ) {
                      const u = qn(a.url);
                      u || ((this.navigated = !0), this.restoreHistory(o, !0));
                      const l = new Hy(
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
                                    Js(o.source),
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
                      const u = new $x(
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
                    return Gt;
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
            yv(n),
              (this.config = n.map(Dc)),
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
              (function bA(e, t, n, r, o) {
                if (0 === n.length) return pc(t.root, t.root, t, r, o);
                const i = (function MA(e) {
                  if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new fv(!0, 0, e);
                  let t = 0,
                    n = !1;
                  const r = e.reduce((o, i, s) => {
                    if ("object" == typeof i && null != i) {
                      if (i.outlets) {
                        const a = {};
                        return (
                          xe(i.outlets, (u, l) => {
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
                  return new fv(n, t, r);
                })(n);
                if (i.toRoot()) return pc(t.root, new q([], {}), t, r, o);
                const s = (function SA(e, t, n) {
                    if (e.isAbsolute) return new gc(t.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const i = n.snapshot._urlSegment;
                      return new gc(i, i === t.root, 0);
                    }
                    const r = $s(e.commands[0]) ? 0 : 1;
                    return (function IA(e, t, n) {
                      let r = e,
                        o = t,
                        i = n;
                      for (; i > o; ) {
                        if (((i -= o), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        o = r.segments.length;
                      }
                      return new gc(r, !1, o - i);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      e.numberOfDoubleDots
                    );
                  })(i, t, e),
                  a = s.processChildren
                    ? zs(s.segmentGroup, s.index, i.commands)
                    : hv(s.segmentGroup, s.index, i.commands);
                return pc(s.segmentGroup, a, t, r, o);
              })(l, this.currentUrlTree, n, d, null != c ? c : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = qn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function OP(e) {
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
                  ? Object.assign({}, AP)
                  : !1 === r
                  ? Object.assign({}, PP)
                  : r),
              qn(n))
            )
              return Ky(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return Ky(this.currentUrlTree, i, o);
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
                    new Zo(
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
              d = Js(r) && c && !Js(c.source),
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
              : (v = new Promise((T, G) => {
                  (m = T), (y = G);
                }));
            const g = ++this.navigationId;
            let b;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (b =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
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
              v.catch((T) => Promise.reject(T))
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
            const o = new Hy(n.id, this.serializeUrl(n.extractedUrl), r);
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
            Zu();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Js(e) {
        return "imperative" !== e;
      }
      let Gn = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.route = r),
              (this.tabIndexAttribute = o),
              (this.renderer = i),
              (this.el = s),
              (this.commands = null),
              (this.onChanges = new $t()),
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
              skipLocationChange: Zr(this.skipLocationChange),
              replaceUrl: Zr(this.replaceUrl),
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
                  preserveFragment: Zr(this.preserveFragment),
                });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(rt), M(Qr), lo("tabindex"), M(Lo), M(nn));
          }),
          (e.ɵdir = Te({
            type: e,
            selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
            hostBindings: function (n, r) {
              1 & n &&
                tn("click", function () {
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
            features: [Fn],
          })),
          e
        );
      })();
      function Zr(e) {
        return "" === e || !!e;
      }
      class Nv {}
      class Fv {
        preload(t, n) {
          return k(null);
        }
      }
      let kv = (() => {
          class e {
            constructor(n, r, o, i) {
              (this.router = n),
                (this.injector = o),
                (this.preloadingStrategy = i),
                (this.loader = new Ov(
                  o,
                  r,
                  (u) => n.triggerEvent(new Uy(u)),
                  (u) => n.triggerEvent(new $y(u))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Un((n) => n instanceof Zo),
                  zr(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const n = this.injector.get(rn);
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
                Yr(),
                Z((i) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? k(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  we(
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
              return new (n || e)(S(rt), S(Ds), S(Re), S(Nv));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        bc = (() => {
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
                n instanceof sc
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof Zo &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof zy &&
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
                new zy(
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
              Zu();
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Wn = new z("ROUTER_CONFIGURATION"),
        Lv = new z("ROUTER_FORROOT_GUARD"),
        kP = [
          jl,
          { provide: ev, useClass: tv },
          {
            provide: rt,
            useFactory: function HP(e, t, n, r, o, i, s = {}, a, u) {
              const l = new rt(null, e, t, n, r, o, Wy(i));
              return (
                a && (l.urlHandlingStrategy = a),
                u && (l.routeReuseStrategy = u),
                (function UP(e, t) {
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
              ev,
              ni,
              jl,
              Re,
              Ds,
              wc,
              Wn,
              [class SP {}, new Nt()],
              [class EP {}, new Nt()],
            ],
          },
          ni,
          {
            provide: Qr,
            useFactory: function $P(e) {
              return e.routerState.root;
            },
            deps: [rt],
          },
          kv,
          Fv,
          class FP {
            preload(t, n) {
              return n().pipe(En(() => k(null)));
            }
          },
          { provide: Wn, useValue: { enableTracing: !1 } },
        ];
      function LP() {
        return new Nm("Router", rt);
      }
      let jv = (() => {
        class e {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                kP,
                Vv(n),
                {
                  provide: Lv,
                  useFactory: BP,
                  deps: [[rt, new Nt(), new cr()]],
                },
                { provide: Wn, useValue: r || {} },
                {
                  provide: $r,
                  useFactory: VP,
                  deps: [Bn, [new yo(Ll), new Nt()], Wn],
                },
                { provide: bc, useFactory: jP, deps: [rt, BT, Wn] },
                {
                  provide: Nv,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : Fv,
                },
                { provide: Nm, multi: !0, useFactory: LP },
                [
                  Mc,
                  { provide: ys, multi: !0, useFactory: zP, deps: [Mc] },
                  { provide: Bv, useFactory: qP, deps: [Mc] },
                  { provide: Im, multi: !0, useExisting: Bv },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [Vv(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(Lv, 8), S(rt, 8));
          }),
          (e.ɵmod = Kt({ type: e })),
          (e.ɵinj = xt({})),
          e
        );
      })();
      function jP(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new bc(e, t, n);
      }
      function VP(e, t, n = {}) {
        return n.useHash ? new wI(e, t) : new ny(e, t);
      }
      function BP(e) {
        return "guarded";
      }
      function Vv(e) {
        return [
          { provide: QC, multi: !0, useValue: e },
          { provide: wc, multi: !0, useValue: e },
        ];
      }
      let Mc = (() => {
        class e {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new $t());
          }
          appInitializer() {
            return this.injector.get(DI, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const o = new Promise((a) => (r = a)),
                i = this.injector.get(rt),
                s = this.injector.get(Wn);
              return (
                "disabled" === s.initialNavigation
                  ? (i.setUpLocationChangeListener(), r(!0))
                  : "enabled" === s.initialNavigation ||
                    "enabledBlocking" === s.initialNavigation
                  ? ((i.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? k(null)
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
            const r = this.injector.get(Wn),
              o = this.injector.get(kv),
              i = this.injector.get(bc),
              s = this.injector.get(rt),
              a = this.injector.get($o);
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
            return new (n || e)(S(Re));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function zP(e) {
        return e.appInitializer.bind(e);
      }
      function qP(e) {
        return e.bootstrapListener.bind(e);
      }
      const Bv = new z("Router Initializer"),
        WP = ["name"];
      let QP = (() => {
        class e {
          constructor() {}
          ngOnInit() {}
          startQuiz() {
            localStorage.setItem("name", this.nameKey.nativeElement.value);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Zt({
            type: e,
            selectors: [["app-main-view"]],
            viewQuery: function (n, r) {
              if ((1 & n && sm(WP, 5), 2 & n)) {
                let o;
                fs(
                  (o = (function hs() {
                    return (function sS(e, t) {
                      return e[19].queries[t].queryList;
                    })(D(), Nd());
                  })())
                ) && (r.nameKey = o.first);
              }
            },
            decls: 17,
            vars: 0,
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
                P(2, "Szyde\u0142kowa quizilla"),
                _(),
                C(3, "div", 1),
                C(4, "p"),
                P(5, "Szyde\u0142kowanie jest dla babci?"),
                _(),
                C(6, "p"),
                P(7, "Nonsens!"),
                _(),
                C(8, "p"),
                P(
                  9,
                  "Kliknij start i sprawd\u017a czy wiesz jak to si\u0119 pl\u0105cze \u{1f9f6}"
                ),
                _(),
                _(),
                C(10, "div", 2),
                C(11, "label", 3),
                P(12, "Wpisz swoje imie"),
                _(),
                Fe(13, "input", 4, 5),
                _(),
                C(15, "button", 6),
                tn("click", function () {
                  return r.startQuiz();
                }),
                P(16, "Start"),
                _(),
                _());
            },
            directives: [Gn],
            styles: [
              "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentMain[_ngcontent-%COMP%]{margin:0;padding:0;position:absolute;top:180px;left:calc(50% - 500px);width:1000px;height:500px;max-width:1920px;max-height:1080px;display:flex;flex-direction:column;justify-content:space-between;font-family:Arial,sans-serif;color:#074430;text-align:center}.contentMain[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-transform:uppercase;text-align:center;font-size:45px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:10px;font-size:30px}.contentMain[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-of-type(2){color:#d61919;font-weight:700}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{display:flex;flex-direction:column}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:27px;padding:20px}.contentMain[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:0 auto;width:400px;height:30px;font-size:22px;background-color:#d9f3f0;border:3px dotted #62928c;border-radius:5px}.contentMain[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:70px;width:150px;position:relative;top:0px;left:calc(50% - 75px);font-size:30px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}",
            ],
          })),
          e
        );
      })();
      class Hv {}
      class Uv {}
      class cn {
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
            (this.lazyInit instanceof cn
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
          const n = new cn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof cn
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
      class ZP {
        encodeKey(t) {
          return $v(t);
        }
        encodeValue(t) {
          return $v(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const JP = /%(\d[a-f0-9])/gi,
        YP = {
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
      function $v(e) {
        return encodeURIComponent(e).replace(JP, (t, n) => {
          var r;
          return null !== (r = YP[n]) && void 0 !== r ? r : t;
        });
      }
      function zv(e) {
        return `${e}`;
      }
      class Mn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new ZP()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function KP(e, t) {
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
          const n = new Mn({ encoder: this.encoder });
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
                    n.push(zv(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(zv(t.value));
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
      class XP {
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
      function qv(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function Gv(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function Wv(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class si {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function eO(e) {
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
            this.headers || (this.headers = new cn()),
            this.context || (this.context = new XP()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Mn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : qv(this.body) ||
              Gv(this.body) ||
              Wv(this.body) ||
              (function tO(e) {
                return (
                  "undefined" != typeof URLSearchParams &&
                  e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Mn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Wv(this.body)
            ? null
            : Gv(this.body)
            ? this.body.type || null
            : qv(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Mn
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
            new si(r, o, s, {
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
      var me = (() => (
        ((me = me || {})[(me.Sent = 0)] = "Sent"),
        (me[(me.UploadProgress = 1)] = "UploadProgress"),
        (me[(me.ResponseHeader = 2)] = "ResponseHeader"),
        (me[(me.DownloadProgress = 3)] = "DownloadProgress"),
        (me[(me.Response = 4)] = "Response"),
        (me[(me.User = 5)] = "User"),
        me
      ))();
      class Sc {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new cn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Ic extends Sc {
        constructor(t = {}) {
          super(t), (this.type = me.ResponseHeader);
        }
        clone(t = {}) {
          return new Ic({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Ys extends Sc {
        constructor(t = {}) {
          super(t),
            (this.type = me.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Ys({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Qv extends Sc {
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
      function Tc(e, t) {
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
      let Zv = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof si) i = n;
            else {
              let u, l;
              (u = o.headers instanceof cn ? o.headers : new cn(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof Mn
                      ? o.params
                      : new Mn({ fromObject: o.params })),
                (i = new si(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = k(i).pipe(zr((u) => this.handler.handle(u)));
            if (n instanceof si || "events" === o.observe) return s;
            const a = s.pipe(Un((u) => u instanceof Ys));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      Z((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      Z((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      Z((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(Z((u) => u.body));
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
              params: new Mn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Tc(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Tc(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Tc(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(S(Hv));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Kv {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Jv = new z("HTTP_INTERCEPTORS");
      let nO = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const rO = /^\)\]\}',?\n/;
      let Yv = (() => {
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
                    m = new cn(o.getAllResponseHeaders()),
                    y =
                      (function oO(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new Ic({
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
                    const b = v;
                    v = v.replace(rO, "");
                    try {
                      v = "" !== v ? JSON.parse(v) : null;
                    } catch (T) {
                      (v = b), g && ((g = !1), (v = { error: T, text: v }));
                    }
                  }
                  g
                    ? (r.next(
                        new Ys({
                          body: v,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: y || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new Qv({
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
                    m = new Qv({
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
                  let p = { type: me.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      !!o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: me.UploadProgress, loaded: h.loaded };
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
                r.next({ type: me.Sent }),
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
            return new (n || e)(S(wy));
          }),
          (e.ɵprov = j({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const xc = new z("XSRF_COOKIE_NAME"),
        Ac = new z("XSRF_HEADER_NAME");
      class Xv {}
      let iO = (() => {
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
                  (this.lastToken = fy(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(tt), S(vs), S(xc));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Pc = (() => {
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
              return new (n || e)(S(Xv), S(Ac));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        sO = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(Jv, []);
                this.chain = r.reduceRight(
                  (o, i) => new Kv(o, i),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(S(Uv), S(Re));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        aO = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: Pc, useClass: nO }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: xc, useValue: n.cookieName } : [],
                  n.headerName ? { provide: Ac, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Kt({ type: e })),
            (e.ɵinj = xt({
              providers: [
                Pc,
                { provide: Jv, useExisting: Pc, multi: !0 },
                { provide: Xv, useClass: iO },
                { provide: xc, useValue: "XSRF-TOKEN" },
                { provide: Ac, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        uO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Kt({ type: e })),
            (e.ɵinj = xt({
              providers: [
                Zv,
                { provide: Hv, useClass: sO },
                Yv,
                { provide: Uv, useExisting: Yv },
              ],
              imports: [
                [
                  aO.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            e
          );
        })(),
        eD = (() => {
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
              return new (n || e)(S(Zv));
            }),
            (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        tD = (() => {
          class e {
            constructor() {
              (this.messageSource = new pt("default")),
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
            (e.ɵprov = j({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        lO = (() => {
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
              return new (n || e)(M(nn), M(Lo));
            }),
            (e.ɵdir = Te({
              type: e,
              selectors: [["", "appChangeBg", ""]],
              hostBindings: function (n, r) {
                1 & n &&
                  tn("click", function () {
                    return r.getAnswer();
                  });
              },
              inputs: { isCorrect: "isCorrect" },
            })),
            e
          );
        })();
      function cO(e, t) {
        if (1 & e) {
          const n = (function Cp() {
            return D();
          })();
          C(0, "ul"),
            C(1, "li", 7),
            tn("click", function () {
              const i = (function Ad(e) {
                  return (A.lFrame.contextLView = e), e[8];
                })(n).$implicit,
                s = Sp();
              return s.getAnswer(s.currentQuestion + 1, i);
            }),
            P(2),
            _(),
            _();
        }
        if (2 & e) {
          const n = t.$implicit;
          F(1), et("isCorrect", n.correct), F(1), qe(" ", n.text, " ");
        }
      }
      const ai = function () {
        return { color: "green", textDecoration: "underline" };
      };
      function hO(e, t) {
        1 & e &&
          (C(0, "div", 8),
          C(1, "p"),
          P(2, "Po\u0107wicz, bo mozesz si\u0119 popl\u0105ta\u0107."),
          _(),
          Fe(3, "img", 9),
          _());
      }
      function pO(e, t) {
        1 & e &&
          (C(0, "div", 10),
          C(1, "p"),
          P(2, "Ju\u017c prawie! Sukces jest bliski!"),
          _(),
          Fe(3, "img", 11),
          _());
      }
      function gO(e, t) {
        1 & e &&
          (C(0, "div", 12),
          C(1, "p"),
          P(2, "Mistrz! Mo\u017cesz pl\u0105ta\u0107 do woli!"),
          _(),
          Fe(3, "img", 13),
          _());
      }
      const mO = [
        { path: "", redirectTo: "main", pathMatch: "full" },
        { path: "main", component: QP },
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
                    (this.userSelection[this.currentQuestion] = r.text)),
                  console.log(this.userSelection);
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
                return new (n || e)(M(eD), M(tD));
              }),
              (e.ɵcmp = Zt({
                type: e,
                selectors: [["app-question-view"]],
                decls: 19,
                vars: 7,
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
                    P(3, "Szyde\u0142kowa quizilla"),
                    _(),
                    C(4, "h4"),
                    P(5),
                    _(),
                    C(6, "p"),
                    P(7),
                    _(),
                    _(),
                    C(8, "div", 2),
                    C(9, "h3"),
                    P(10),
                    _(),
                    C(11, "h4"),
                    P(12),
                    _(),
                    Ao(13, cO, 3, 2, "ul", 3),
                    _(),
                    C(14, "div", 4),
                    C(15, "button", 5),
                    tn("click", function () {
                      return r.nextQuestion();
                    }),
                    P(16, " Nast\u0119pne pytanie "),
                    _(),
                    C(17, "button", 6),
                    tn("click", function () {
                      return r.sendMessage();
                    }),
                    P(18, " Podsumowanie "),
                    _(),
                    _(),
                    _()),
                    2 & n &&
                      (F(5),
                      qe("Witaj ", r.name, " \u{1f44b}"),
                      F(2),
                      el(
                        "Pytanie ",
                        r.currentQuestion + 1,
                        " z ",
                        r.allQuestions.length,
                        ""
                      ),
                      F(3),
                      qe("Pytanie nr ", r.currentQuestion + 1, ""),
                      F(2),
                      be(
                        null == r.allQuestions[r.currentQuestion]
                          ? null
                          : r.allQuestions[r.currentQuestion].question
                      ),
                      F(1),
                      et(
                        "ngForOf",
                        null == r.allQuestions[r.currentQuestion]
                          ? null
                          : r.allQuestions[r.currentQuestion].options
                      ),
                      F(2),
                      et(
                        "disabled",
                        r.currentQuestion === r.allQuestions.length - 1
                      ));
                },
                directives: [hy, lO, Gn],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:10px}.contentQuestions[_ngcontent-%COMP%]{width:850px;height:654px;max-width:1920px;max-height:1080px;position:absolute;top:120px;left:calc(50% - 425px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;display:flex;flex-direction:column;justify-content:space-around}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]{width:300px}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:25px;text-decoration:underline}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:22px;font-weight:400}.contentQuestions[_ngcontent-%COMP%]   .pre[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{position:absolute;top:40px;right:60px;font-size:20px;font-style:italic}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{width:700px;height:350px;position:relative;left:calc(50% - 350px);display:flex;flex-direction:column;justify-content:space-between}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:20px;font-size:27px;text-align:center;text-decoration:underline}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{padding-left:20px;font-size:25px}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px;list-style:none;font-size:20px;cursor:pointer}.contentQuestions[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{border:2px solid #083d36;border-radius:5px}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:70px;width:180px;font-size:21px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}.contentQuestions[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   button[disabled][_ngcontent-%COMP%]{opacity:.5}",
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
              constructor(n) {
                (this.questionService = n),
                  (this.allQuestions = []),
                  (this.link = "");
              }
              ngOnInit() {
                this.getAllQuetsions();
              }
              getAllQuetsions() {
                this.questionService.getQuestionsJson().subscribe((n) => {
                  this.allQuestions = n;
                });
              }
              displayCorrectQuestion() {
                (this.allQuestions.options.correct = !0) && console.log("ok");
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)(M(eD));
              }),
              (e.ɵcmp = Zt({
                type: e,
                selectors: [["app-response-view"]],
                decls: 66,
                vars: 30,
                consts: [
                  [1, "contentResponse"],
                  [1, "questions"],
                  [1, "partOne"],
                  [1, "first"],
                  [1, "text"],
                  [3, "ngStyle"],
                  ["src", "./assets/pic/mr.png", "alt", ""],
                  [1, "second"],
                  ["src", "./assets/pic/relief.png", "alt", ""],
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
                    P(2, "Sprawd\u017a poprawne odpowiedzi"),
                    _(),
                    C(3, "div", 1),
                    C(4, "div", 2),
                    C(5, "div", 3),
                    C(6, "div", 4),
                    C(7, "h2"),
                    P(8),
                    _(),
                    C(9, "ul"),
                    C(10, "li"),
                    P(11),
                    _(),
                    C(12, "li", 5),
                    P(13),
                    _(),
                    C(14, "li"),
                    P(15),
                    _(),
                    _(),
                    _(),
                    Fe(16, "img", 6),
                    _(),
                    C(17, "div", 7),
                    C(18, "div", 4),
                    C(19, "h2"),
                    P(20),
                    _(),
                    C(21, "ul"),
                    C(22, "li", 5),
                    P(23),
                    _(),
                    C(24, "li"),
                    P(25),
                    _(),
                    C(26, "li"),
                    P(27),
                    _(),
                    _(),
                    _(),
                    Fe(28, "img", 8),
                    _(),
                    C(29, "div", 9),
                    C(30, "div", 4),
                    C(31, "h2"),
                    P(32),
                    _(),
                    C(33, "ul"),
                    C(34, "li", 5),
                    P(35),
                    _(),
                    C(36, "li"),
                    P(37),
                    _(),
                    C(38, "li"),
                    P(39),
                    _(),
                    _(),
                    _(),
                    Fe(40, "img", 10),
                    _(),
                    _(),
                    C(41, "div", 11),
                    C(42, "div", 12),
                    C(43, "div", 4),
                    C(44, "h2"),
                    P(45),
                    _(),
                    C(46, "ul"),
                    C(47, "li"),
                    P(48),
                    _(),
                    C(49, "li"),
                    P(50),
                    _(),
                    C(51, "li", 5),
                    P(52),
                    _(),
                    _(),
                    _(),
                    Fe(53, "img", 13),
                    _(),
                    C(54, "div", 14),
                    C(55, "div", 4),
                    C(56, "h2"),
                    P(57),
                    _(),
                    C(58, "ul"),
                    C(59, "li"),
                    P(60),
                    _(),
                    C(61, "li"),
                    P(62),
                    _(),
                    C(63, "li", 5),
                    P(64),
                    _(),
                    _(),
                    _(),
                    Fe(65, "img", 15),
                    _(),
                    _(),
                    _(),
                    _()),
                    2 & n &&
                      (F(8),
                      be(r.allQuestions[0].question),
                      F(3),
                      be(r.allQuestions[0].options[0].text),
                      F(1),
                      et("ngStyle", Vr(25, ai)),
                      F(1),
                      qe(" ", r.allQuestions[0].options[1].text, " "),
                      F(2),
                      be(r.allQuestions[0].options[2].text),
                      F(5),
                      be(r.allQuestions[1].question),
                      F(2),
                      et("ngStyle", Vr(26, ai)),
                      F(1),
                      qe(" ", r.allQuestions[1].options[0].text, " "),
                      F(2),
                      be(r.allQuestions[1].options[1].text),
                      F(2),
                      be(r.allQuestions[1].options[2].text),
                      F(5),
                      be(r.allQuestions[2].question),
                      F(2),
                      et("ngStyle", Vr(27, ai)),
                      F(1),
                      qe(" ", r.allQuestions[2].options[0].text, " "),
                      F(2),
                      be(r.allQuestions[2].options[1].text),
                      F(2),
                      be(r.allQuestions[2].options[2].text),
                      F(6),
                      be(r.allQuestions[3].question),
                      F(3),
                      be(r.allQuestions[3].options[0].text),
                      F(2),
                      be(r.allQuestions[3].options[1].text),
                      F(1),
                      et("ngStyle", Vr(28, ai)),
                      F(1),
                      qe(" ", r.allQuestions[3].options[2].text, " "),
                      F(5),
                      be(r.allQuestions[4].question),
                      F(3),
                      be(r.allQuestions[4].options[0].text),
                      F(2),
                      be(r.allQuestions[4].options[1].text),
                      F(1),
                      et("ngStyle", Vr(29, ai)),
                      F(1),
                      qe(" ", r.allQuestions[4].options[2].text, " "));
                },
                directives: [vy],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentResponse[_ngcontent-%COMP%]{width:1600px;height:800px;max-width:1920px;max-height:1080px;position:relative;top:110px;left:calc(50% - 800px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;text-align:center}.contentResponse[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:20px;font-size:30px;position:relative;top:3px;left:0}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{width:750px;padding:20px;display:flex;flex-direction:column;justify-content:space-between}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:10px;display:flex;flex-direction:row;justify-content:space-around}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{width:400px;display:flex;flex-direction:column;justify-content:space-around;text-align:left}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:20px;padding:10px 10px 10px 5px;line-height:30px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:10px 10px 10px 5px;list-style:none;font-size:18px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:200px;border-radius:5px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partOne[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fourth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]   div.fifth[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:300px}.contentResponse[_ngcontent-%COMP%]   .questions[_ngcontent-%COMP%]   .partTwo[_ngcontent-%COMP%]{justify-content:space-around}",
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
                return new (n || e)(M(tD));
              }),
              (e.ɵcmp = Zt({
                type: e,
                selectors: [["app-summary-view"]],
                decls: 19,
                vars: 6,
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
                    P(4, "Gratulacje! Uko\u0144czy\u0142e\u015b quiz!"),
                    _(),
                    C(5, "h3"),
                    P(6, "Oto twoje wyniki:"),
                    _(),
                    C(7, "p"),
                    P(8),
                    _(),
                    C(9, "p"),
                    P(10),
                    _(),
                    C(11, "p"),
                    P(12),
                    _(),
                    _(),
                    C(13, "div", 3),
                    Ao(14, hO, 4, 0, "div", 4),
                    Ao(15, pO, 4, 0, "div", 5),
                    Ao(16, gO, 4, 0, "div", 6),
                    _(),
                    _(),
                    C(17, "button", 7),
                    P(18, "Poka\u017c odpowiedzi"),
                    _(),
                    _()),
                    2 & n &&
                      (F(8),
                      qe("Poprawne odpowiedzi: ", r.correctAnswer, ""),
                      F(2),
                      qe("Niepoprawne odpowiedzi: ", r.incorrectAnswer, ""),
                      F(2),
                      qe("Wynik: ", 100 * r.visible, "%"),
                      F(2),
                      et("ngIf", r.visible <= 0.5),
                      F(1),
                      et("ngIf", r.visible > 0.5 && r.visible <= 0.8),
                      F(1),
                      et("ngIf", r.visible > 0.8));
                },
                directives: [gy, Gn],
                styles: [
                  "*[_ngcontent-%COMP%]{margin:0;padding:0}.contentSummary[_ngcontent-%COMP%]{width:1100px;height:700px;max-width:1920px;max-height:1080px;position:absolute;top:120px;left:calc(50% - 550px);font-family:Arial,sans-serif;color:#083d36;background-color:#ebfffd;border:2px solid #badad6;border-radius:5px;display:flex;flex-direction:column;justify-content:space-around;text-align:center}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]{position:relative;top:100px;height:200px;display:flex;flex-direction:column;justify-content:space-between}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:30px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:25px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]{margin-top:20px;position:relative;top:20px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:20px;font-size:25px;font-weight:700}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:20px;width:320px}.contentSummary[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .percent[_ngcontent-%COMP%]   .to50Percent[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:30px;width:450px}.contentSummary[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:relative;top:0;left:calc(50% - 90px);height:70px;width:220px;font-size:21px;background-color:#bee5e0;cursor:pointer;border-radius:7px;color:#074430;border:1px dotted #083d36}",
                ],
              })),
              e
            );
          })(),
        },
      ];
      let yO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Kt({ type: e })),
            (e.ɵinj = xt({ imports: [[jv.forRoot(mO)], jv] })),
            e
          );
        })(),
        vO = (() => {
          class e {
            constructor() {
              (this.logoPath = "./assets/pic/logo.png"),
                (this.plPath = "./assets/pic/pl.png"),
                (this.enPath = "./assets/pic/en.png");
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Zt({
              type: e,
              selectors: [["app-header"]],
              decls: 6,
              vars: 3,
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
                ["alt", "wersja polska", 1, "plVersion", 3, "src"],
                ["alt", "wersja angielska", 1, "enVersion", 3, "src"],
              ],
              template: function (n, r) {
                1 & n &&
                  (C(0, "div", 0),
                  Fe(1, "img", 1),
                  C(2, "button", 2),
                  P(3, "Start"),
                  _(),
                  Fe(4, "img", 3),
                  Fe(5, "img", 4),
                  _()),
                  2 & n &&
                    (F(1),
                    Po("src", r.logoPath, hr),
                    F(3),
                    Po("src", r.plPath, hr),
                    F(1),
                    Po("src", r.enPath, hr));
              },
              directives: [Gn],
              styles: [
                ".contentHeader[_ngcontent-%COMP%]{margin:0;padding:0;position:absolute;top:0px;left:0px;width:100vw;max-width:1920px;height:80px}.contentHeader[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{width:120px;position:absolute;top:20px;left:70px;cursor:pointer}.contentHeader[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:50px;width:100px;position:absolute;top:25px;right:150px;font-size:21px;color:#074430;background-color:#bee5e0;cursor:pointer;border-radius:7px;border:1px dotted #083d36}.contentHeader[_ngcontent-%COMP%]   img.plVersion[_ngcontent-%COMP%]{width:30px;position:absolute;top:40px;right:90px;cursor:pointer}.contentHeader[_ngcontent-%COMP%]   img.enVersion[_ngcontent-%COMP%]{width:30px;position:absolute;top:40px;right:40px;cursor:pointer}",
              ],
            })),
            e
          );
        })(),
        DO = (() => {
          class e {
            constructor() {
              this.title = "quiz";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Zt({
              type: e,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              template: function (n, r) {
                1 & n && (Fe(0, "app-header"), Fe(1, "router-outlet"));
              },
              directives: [vO, vc],
              styles: [""],
            })),
            e
          );
        })(),
        CO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Kt({ type: e, bootstrap: [DO] })),
            (e.ɵinj = xt({ providers: [], imports: [[hx, yO, uO]] })),
            e
          );
        })();
      (function zS() {
        Bm = !1;
      })(),
        dx()
          .bootstrapModule(CO)
          .catch((e) => console.error(e));
    },
  },
  (ne) => {
    ne((ne.s = 499));
  },
]);
