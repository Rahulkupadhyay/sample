(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function(e, t, n) {
      e.exports = n("zUnb");
    },
    ORT8: function(e, t, n) {
      "use strict";
      function r(e) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        r(n("y4AJ")),
        r(n("XwGT"));
    },
    XwGT: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.clone = function(e) {
          var t = this;
          if (e) {
            if (Array.isArray(e)) {
              var n = [];
              return (
                e.forEach(function(e) {
                  return n.push(t.clone(e));
                }),
                n
              );
            }
            if ("object" == typeof e) {
              var r = {};
              return (
                Object.keys(e).forEach(function(n) {
                  return (r[n] = t.clone(e[n]));
                }),
                r
              );
            }
            return e;
          }
          return e;
        }),
        (t.isPrimitive = function(e) {
          return (
            "string" == typeof e ||
            "number" == typeof e ||
            "boolean" == typeof e
          );
        }),
        (t.isSameObject = function(e, t) {
          if (e === t) return !0;
          if ("number" == typeof e && e.toString() === t.toString()) return !0;
          if (
            void 0 === e ||
            void 0 === t ||
            (Array.isArray(e) && !Array.isArray(t)) ||
            (!Array.isArray(e) && Array.isArray(t)) ||
            (Array.isArray(e) && Array.isArray(t) && e.length !== t.length) ||
            e === !t
          )
            return !1;
          if (Array.isArray(e) && Array.isArray(t)) {
            for (var n = 0, r = 0, s = e; r < s.length; r++) {
              if (!this.isSameObject(s[r], t[n])) return !1;
              n++;
            }
            return !0;
          }
          for (var i = 0, o = Object.keys(e); i < o.length; i++) {
            var a = o[i];
            if (!t.hasOwnProperty(a) || (!t[a] && e[a]) || (t[a] && !e[a]))
              return !1;
            if (Array.isArray(e[a])) {
              if (!this.isSameObject(e[a], t[a])) return !1;
            } else if ("object" == typeof e[a]) {
              if (!this.isSameObject(e[a], t[a])) return !1;
            } else if (e[a] && t[a] && e[a].toString() !== t[a].toString())
              return !1;
          }
          return !0;
        });
    },
    rZz3: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PRIMITIVES = ["String", "Number", "Boolean"]);
    },
    y4AJ: function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n("rZz3"),
        s = n("ORT8"),
        i = (function() {
          function e(e) {
            this.tConstructor = e;
          }
          return (
            (e.prototype.map = function(e) {
              var t = new this.tConstructor();
              return e
                ? (this.tConstructor.hasOwnProperty("gnRename") &&
                    (e = this._rename(this.tConstructor, e)),
                  Object.assign(t, this._diveMap(t, e)))
                : t;
            }),
            (e.prototype.arrayMap = function(e, t) {
              var n = this;
              if ((void 0 === t && (t = this.tConstructor), null === e))
                return null;
              if (!Array.isArray(e)) return [];
              var s = [];
              return (
                r.PRIMITIVES.includes(t.name)
                  ? e.forEach(function(e) {
                      typeof e === t.name.toLowerCase()
                        ? s.push(e)
                        : "String" === t.name && "number" == typeof e
                        ? s.push(e.toString())
                        : "Number" !== t.name ||
                          "string" != typeof e ||
                          isNaN(Number(e))
                        ? null === e && s.push(null)
                        : s.push(+e);
                    })
                  : e.forEach(function(e) {
                      s.push(n.map(e));
                    }),
                s
              );
            }),
            (e.prototype._areStringOrNumber = function(e, t) {
              return !(
                ("string" != typeof e && "number" != typeof e) ||
                ("number" != typeof t && "string" != typeof t)
              );
            }),
            (e.prototype._castStringAndNumbers = function(e, t) {
              return ("string" != typeof e && "number" != typeof e) ||
                void 0 === t
                ? void console.warn(
                    "Genese _castStringAndNumbers : source or target undefined"
                  )
                : null === t
                ? null
                : "string" != typeof e ||
                  ("number" != typeof t && "string" != typeof t)
                ? "number" == typeof e && "number" == typeof t
                  ? t
                  : "number" == typeof e && "string" == typeof t
                  ? isNaN(Number(t))
                    ? e
                    : +t
                  : void console.warn(
                      "Genese _castStringAndNumbers : impossible to cast this elements"
                    )
                : t.toString();
            }),
            (e.prototype._diveMap = function(e, t) {
              return void 0 === t
                ? e
                : null === t
                ? t
                : s.isPrimitive(e)
                ? s.isPrimitive(t)
                  ? this._areStringOrNumber(e, t)
                    ? this._castStringAndNumbers(e, t)
                    : "boolean" == typeof t && "boolean" == typeof e
                    ? t
                    : e
                  : e
                : this._mapNotPrimitive(e, t);
            }),
            (e.prototype._mapNotPrimitive = function(e, t) {
              if (void 0 === t) return e;
              if (null === t) return null;
              for (
                var n = Object.assign({}, e), r = 0, s = Object.keys(e);
                r < s.length;
                r++
              ) {
                var i = s[r];
                if ("gnIndexableType" === i) n = this._mapIndexableType(e, t);
                else {
                  if (void 0 === e[i]) return t;
                  n[i] =
                    null === t[i]
                      ? null
                      : void 0 === t[i]
                      ? this._purge(e[i])
                      : Array.isArray(e[i])
                      ? Array.isArray(t[i])
                        ? this._mapArray(e[i], t[i])
                        : n[i]
                      : this._areStringOrNumber(e[i], t[i])
                      ? this._castStringAndNumbers(e[i], t[i])
                      : this._diveMap(e[i], t[i]);
                }
              }
              return n;
            }),
            (e.prototype._mapIndexableType = function(e, t) {
              if (void 0 !== e && void 0 !== e.gnIndexableType)
                return void 0 === t
                  ? e
                  : null === t
                  ? null
                  : Array.isArray(e.gnIndexableType) &&
                    e.gnIndexableType.length > 0
                  ? this._mapIndexableTypeArray(e.gnIndexableType[0], t)
                  : Object.assign(
                      {},
                      this._mapIndexableTypeObject(e.gnIndexableType, t)
                    );
              console.warn(
                "Impossible to map indexable types with undefined target."
              );
            }),
            (e.prototype._mapIndexableTypeArray = function(e, t) {
              for (
                var n, r, s = {}, i = 0, o = Object.keys(t);
                i < o.length;
                i++
              ) {
                var a = o[i],
                  l = this._diveMap((((n = {})[a] = [e]), n), t);
                Object.assign(s, (((r = {})[a] = l[a]), r));
              }
              return s;
            }),
            (e.prototype._mapIndexableTypeObject = function(e, t) {
              for (
                var n, r = {}, s = 0, i = Object.keys(t);
                s < i.length;
                s++
              ) {
                var o = i[s];
                Object.assign(r, (((n = {})[o] = this._diveMap(e, t[o])), n));
              }
              return r;
            }),
            (e.prototype._mapArray = function(e, t) {
              if (null === t) return null;
              if (
                void 0 === t ||
                !Array.isArray(t) ||
                (Array.isArray(e) && !Array.isArray(t))
              )
                return e;
              if (Array.isArray(e) && 0 !== e.length) {
                for (
                  var n = [], r = s.clone(e[0]), i = 0, o = t;
                  i < o.length;
                  i++
                ) {
                  var a = o[i],
                    l = void 0;
                  if (Array.isArray(r) && Array.isArray(a))
                    l = this._mapArray(r, a);
                  else {
                    if (Array.isArray(r) && !Array.isArray(a) && a) return e;
                    l = this._diveMap(r, a);
                  }
                  n.push(l);
                }
                return n;
              }
              console.warn(
                "Impossible to map array of objects with undefined or empty array"
              );
            }),
            (e.prototype._purge = function(e) {
              return e ? (delete e.gnIndexableType, e) : e;
            }),
            (e.prototype._rename = function(e, t) {
              var n = e;
              return (
                Object.keys(n.gnRename).map(function(e) {
                  var r = n.gnRename[e];
                  t[r] && ((t[e] = t[r]), delete t[r]);
                }),
                t
              );
            }),
            (e.prototype.translate = function(e, t) {
              var n = this;
              if (e && t) {
                var r = s.clone(e);
                return (
                  Object.keys(r).map(function(e) {
                    if ("gnTranslate" === e)
                      Object.assign(r, r.gnTranslate[t]), delete r.gnTranslate;
                    else if ("object" == typeof r[e]) {
                      var i = s.clone(r[e]);
                      r[e] = n.translate(i, t);
                    }
                  }),
                  r
                );
              }
              console.error(
                "No data or no language : impossible to translate element"
              );
            }),
            e
          );
        })();
      t.GeneseMapper = i;
    },
    zUnb: function(e, t, n) {
      "use strict";
      function r(e) {
        return "function" == typeof e;
      }
      n.r(t);
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
          if (e) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = e;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        }
      };
      function o(e) {
        setTimeout(() => {
          throw e;
        });
      }
      const a = {
          closed: !0,
          next(e) {},
          error(e) {
            if (i.useDeprecatedSynchronousErrorHandling) throw e;
            o(e);
          },
          complete() {}
        },
        l = Array.isArray || (e => e && "number" == typeof e.length);
      function u(e) {
        return null !== e && "object" == typeof e;
      }
      function c(e) {
        return (
          Error.call(this),
          (this.message = e
            ? `${e.length} errors occurred during unsubscription:\n${e
                .map((e, t) => `${t + 1}) ${e.toString()}`)
                .join("\n  ")}`
            : ""),
          (this.name = "UnsubscriptionError"),
          (this.errors = e),
          this
        );
      }
      c.prototype = Object.create(Error.prototype);
      const h = c;
      let d = (() => {
        class e {
          constructor(e) {
            (this.closed = !1),
              (this._parent = null),
              (this._parents = null),
              (this._subscriptions = null),
              e && (this._unsubscribe = e);
          }
          unsubscribe() {
            let e,
              t = !1;
            if (this.closed) return;
            let {
              _parent: n,
              _parents: s,
              _unsubscribe: i,
              _subscriptions: o
            } = this;
            (this.closed = !0),
              (this._parent = null),
              (this._parents = null),
              (this._subscriptions = null);
            let a = -1,
              c = s ? s.length : 0;
            for (; n; ) n.remove(this), (n = (++a < c && s[a]) || null);
            if (r(i))
              try {
                i.call(this);
              } catch (d) {
                (t = !0), (e = d instanceof h ? p(d.errors) : [d]);
              }
            if (l(o))
              for (a = -1, c = o.length; ++a < c; ) {
                const n = o[a];
                if (u(n))
                  try {
                    n.unsubscribe();
                  } catch (d) {
                    (t = !0),
                      (e = e || []),
                      d instanceof h ? (e = e.concat(p(d.errors))) : e.push(d);
                  }
              }
            if (t) throw new h(e);
          }
          add(t) {
            let n = t;
            switch (typeof t) {
              case "function":
                n = new e(t);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof e)) {
                  const t = n;
                  (n = new e()), (n._subscriptions = [t]);
                }
                break;
              default:
                if (!t) return e.EMPTY;
                throw new Error(
                  "unrecognized teardown " + t + " added to Subscription."
                );
            }
            if (n._addParent(this)) {
              const e = this._subscriptions;
              e ? e.push(n) : (this._subscriptions = [n]);
            }
            return n;
          }
          remove(e) {
            const t = this._subscriptions;
            if (t) {
              const n = t.indexOf(e);
              -1 !== n && t.splice(n, 1);
            }
          }
          _addParent(e) {
            let { _parent: t, _parents: n } = this;
            return (
              t !== e &&
              (t
                ? n
                  ? -1 === n.indexOf(e) && (n.push(e), !0)
                  : ((this._parents = [e]), !0)
                : ((this._parent = e), !0))
            );
          }
        }
        return (
          (e.EMPTY = (function(e) {
            return (e.closed = !0), e;
          })(new e())),
          e
        );
      })();
      function p(e) {
        return e.reduce((e, t) => e.concat(t instanceof h ? t.errors : t), []);
      }
      const f =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class g extends d {
        constructor(e, t, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!e) {
                this.destination = a;
                break;
              }
              if ("object" == typeof e) {
                e instanceof g
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new m(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new m(this, e, t, n));
          }
        }
        [f]() {
          return this;
        }
        static create(e, t, n) {
          const r = new g(e, t, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parent: e, _parents: t } = this;
          return (
            (this._parent = null),
            (this._parents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parent = e),
            (this._parents = t),
            this
          );
        }
      }
      class m extends g {
        constructor(e, t, n, s) {
          let i;
          super(), (this._parentSubscriber = e);
          let o = this;
          r(t)
            ? (i = t)
            : t &&
              ((i = t.next),
              (n = t.error),
              (s = t.complete),
              t !== a &&
                ((o = Object.create(t)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: t } = this;
            i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
              ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (t.syncErrorThrowable)
              n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : o(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw e;
              o(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const t = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, t), this.unsubscribe())
                : (this.__tryOrUnsub(t), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, t) {
          try {
            e.call(this._context, t);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(e, t, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            t.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = r), (e.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const y =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function b() {}
      function v(...e) {
        return _(e);
      }
      function _(e) {
        return e
          ? 1 === e.length
            ? e[0]
            : function(t) {
                return e.reduce((e, t) => t(e), t);
              }
          : b;
      }
      let w = (() => {
        class e {
          constructor(e) {
            (this._isScalar = !1), e && (this._subscribe = e);
          }
          lift(t) {
            const n = new e();
            return (n.source = this), (n.operator = t), n;
          }
          subscribe(e, t, n) {
            const { operator: r } = this,
              s = (function(e, t, n) {
                if (e) {
                  if (e instanceof g) return e;
                  if (e[f]) return e[f]();
                }
                return e || t || n ? new g(e, t, n) : new g(a);
              })(e, t, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (t) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
                (function(e) {
                  for (; e; ) {
                    const { closed: t, destination: n, isStopped: r } = e;
                    if (t || r) return !1;
                    e = n && n instanceof g ? n : null;
                  }
                  return !0;
                })(e)
                  ? e.error(t)
                  : console.warn(t);
            }
          }
          forEach(e, t) {
            return new (t = C(t))((t, n) => {
              let r;
              r = this.subscribe(
                t => {
                  try {
                    e(t);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                t
              );
            });
          }
          _subscribe(e) {
            const { source: t } = this;
            return t && t.subscribe(e);
          }
          [y]() {
            return this;
          }
          pipe(...e) {
            return 0 === e.length ? this : _(e)(this);
          }
          toPromise(e) {
            return new (e = C(e))((e, t) => {
              let n;
              this.subscribe(
                e => (n = e),
                e => t(e),
                () => e(n)
              );
            });
          }
        }
        return (e.create = t => new e(t)), e;
      })();
      function C(e) {
        if ((e || (e = i.Promise || Promise), !e))
          throw new Error("no Promise impl found");
        return e;
      }
      function x() {
        return (
          Error.call(this),
          (this.message = "object unsubscribed"),
          (this.name = "ObjectUnsubscribedError"),
          this
        );
      }
      x.prototype = Object.create(Error.prototype);
      const S = x;
      class E extends d {
        constructor(e, t) {
          super(),
            (this.subject = e),
            (this.subscriber = t),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            t = e.observers;
          if (
            ((this.subject = null),
            !t || 0 === t.length || e.isStopped || e.closed)
          )
            return;
          const n = t.indexOf(this.subscriber);
          -1 !== n && t.splice(n, 1);
        }
      }
      class k extends g {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let T = (() => {
        class e extends w {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [f]() {
            return new k(this);
          }
          lift(e) {
            const t = new D(this, this);
            return (t.operator = e), t;
          }
          next(e) {
            if (this.closed) throw new S();
            if (!this.isStopped) {
              const { observers: t } = this,
                n = t.length,
                r = t.slice();
              for (let s = 0; s < n; s++) r[s].next(e);
            }
          }
          error(e) {
            if (this.closed) throw new S();
            (this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
            const { observers: t } = this,
              n = t.length,
              r = t.slice();
            for (let s = 0; s < n; s++) r[s].error(e);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new S();
            this.isStopped = !0;
            const { observers: e } = this,
              t = e.length,
              n = e.slice();
            for (let r = 0; r < t; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(e) {
            if (this.closed) throw new S();
            return super._trySubscribe(e);
          }
          _subscribe(e) {
            if (this.closed) throw new S();
            return this.hasError
              ? (e.error(this.thrownError), d.EMPTY)
              : this.isStopped
              ? (e.complete(), d.EMPTY)
              : (this.observers.push(e), new E(this, e));
          }
          asObservable() {
            const e = new w();
            return (e.source = this), e;
          }
        }
        return (e.create = (e, t) => new D(e, t)), e;
      })();
      class D extends T {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          const { destination: t } = this;
          t && t.next && t.next(e);
        }
        error(e) {
          const { destination: t } = this;
          t && t.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: t } = this;
          return t ? this.source.subscribe(e) : d.EMPTY;
        }
      }
      function A(e) {
        return e && "function" == typeof e.schedule;
      }
      class I extends g {
        constructor(e, t, n) {
          super(),
            (this.parent = e),
            (this.outerValue = t),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(e) {
          this.parent.notifyNext(
            this.outerValue,
            e,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(e) {
          this.parent.notifyError(e, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const O = e => t => {
          for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
          t.closed || t.complete();
        },
        R = e => t => (
          e
            .then(
              e => {
                t.closed || (t.next(e), t.complete());
              },
              e => t.error(e)
            )
            .then(null, o),
          t
        );
      function N() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const P = N(),
        M = e => t => {
          const n = e[P]();
          for (;;) {
            const e = n.next();
            if (e.done) {
              t.complete();
              break;
            }
            if ((t.next(e.value), t.closed)) break;
          }
          return (
            "function" == typeof n.return &&
              t.add(() => {
                n.return && n.return();
              }),
            t
          );
        },
        V = e => t => {
          const n = e[y]();
          if ("function" != typeof n.subscribe)
            throw new TypeError(
              "Provided object does not correctly implement Symbol.observable"
            );
          return n.subscribe(t);
        },
        j = e => e && "number" == typeof e.length && "function" != typeof e;
      function U(e) {
        return (
          !!e && "function" != typeof e.subscribe && "function" == typeof e.then
        );
      }
      const F = e => {
        if (e instanceof w)
          return t =>
            e._isScalar ? (t.next(e.value), void t.complete()) : e.subscribe(t);
        if (e && "function" == typeof e[y]) return V(e);
        if (j(e)) return O(e);
        if (U(e)) return R(e);
        if (e && "function" == typeof e[P]) return M(e);
        {
          const t = u(e) ? "an invalid object" : `'${e}'`;
          throw new TypeError(
            `You provided ${t} where a stream was expected.` +
              " You can provide an Observable, Promise, Array, or Iterable."
          );
        }
      };
      function L(e, t, n, r, s = new I(e, n, r)) {
        if (!s.closed) return F(t)(s);
      }
      class $ extends g {
        notifyNext(e, t, n, r, s) {
          this.destination.next(t);
        }
        notifyError(e, t) {
          this.destination.error(e);
        }
        notifyComplete(e) {
          this.destination.complete();
        }
      }
      function H(e, t) {
        return function(n) {
          if ("function" != typeof e)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new z(e, t));
        };
      }
      class z {
        constructor(e, t) {
          (this.project = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new B(e, this.project, this.thisArg));
        }
      }
      class B extends g {
        constructor(e, t, n) {
          super(e),
            (this.project = t),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(e) {
          let t;
          try {
            t = this.project.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      function q(e, t) {
        return new w(
          t
            ? n => {
                const r = new d();
                let s = 0;
                return (
                  r.add(
                    t.schedule(function() {
                      s !== e.length
                        ? (n.next(e[s++]), n.closed || r.add(this.schedule()))
                        : n.complete();
                    })
                  ),
                  r
                );
              }
            : O(e)
        );
      }
      function W(e, t) {
        if (!t) return e instanceof w ? e : new w(F(e));
        if (null != e) {
          if (
            (function(e) {
              return e && "function" == typeof e[y];
            })(e)
          )
            return (function(e, t) {
              return new w(
                t
                  ? n => {
                      const r = new d();
                      return (
                        r.add(
                          t.schedule(() => {
                            const s = e[y]();
                            r.add(
                              s.subscribe({
                                next(e) {
                                  r.add(t.schedule(() => n.next(e)));
                                },
                                error(e) {
                                  r.add(t.schedule(() => n.error(e)));
                                },
                                complete() {
                                  r.add(t.schedule(() => n.complete()));
                                }
                              })
                            );
                          })
                        ),
                        r
                      );
                    }
                  : V(e)
              );
            })(e, t);
          if (U(e))
            return (function(e, t) {
              return new w(
                t
                  ? n => {
                      const r = new d();
                      return (
                        r.add(
                          t.schedule(() =>
                            e.then(
                              e => {
                                r.add(
                                  t.schedule(() => {
                                    n.next(e),
                                      r.add(t.schedule(() => n.complete()));
                                  })
                                );
                              },
                              e => {
                                r.add(t.schedule(() => n.error(e)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    }
                  : R(e)
              );
            })(e, t);
          if (j(e)) return q(e, t);
          if (
            (function(e) {
              return e && "function" == typeof e[P];
            })(e) ||
            "string" == typeof e
          )
            return (function(e, t) {
              if (!e) throw new Error("Iterable cannot be null");
              return new w(
                t
                  ? n => {
                      const r = new d();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          t.schedule(() => {
                            (s = e[P]()),
                              r.add(
                                t.schedule(function() {
                                  if (n.closed) return;
                                  let e, t;
                                  try {
                                    const n = s.next();
                                    (e = n.value), (t = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  t
                                    ? n.complete()
                                    : (n.next(e), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    }
                  : M(e)
              );
            })(e, t);
        }
        throw new TypeError(
          ((null !== e && typeof e) || e) + " is not observable"
        );
      }
      function G(e, t, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof t
          ? r =>
              r.pipe(
                G((n, r) => W(e(n, r)).pipe(H((e, s) => t(n, e, r, s))), n)
              )
          : ("number" == typeof t && (n = t), t => t.lift(new Z(e, n)));
      }
      class Z {
        constructor(e, t = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = t);
        }
        call(e, t) {
          return t.subscribe(new Q(e, this.project, this.concurrent));
        }
      }
      class Q extends $ {
        constructor(e, t, n = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = t),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let t;
          const n = this.index++;
          try {
            t = this.project(e, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(t, e, n);
        }
        _innerSub(e, t, n) {
          const r = new I(this, void 0, void 0);
          this.destination.add(r), L(this, e, t, n, r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e, t, n, r, s) {
          this.destination.next(t);
        }
        notifyComplete(e) {
          const t = this.buffer;
          this.remove(e),
            this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function K(e) {
        return e;
      }
      function Y(e = Number.POSITIVE_INFINITY) {
        return G(K, e);
      }
      function J(...e) {
        let t = Number.POSITIVE_INFINITY,
          n = null,
          r = e[e.length - 1];
        return (
          A(r)
            ? ((n = e.pop()),
              e.length > 1 &&
                "number" == typeof e[e.length - 1] &&
                (t = e.pop()))
            : "number" == typeof r && (t = e.pop()),
          null === n && 1 === e.length && e[0] instanceof w
            ? e[0]
            : Y(t)(q(e, n))
        );
      }
      function X() {
        return function(e) {
          return e.lift(new ee(e));
        };
      }
      class ee {
        constructor(e) {
          this.connectable = e;
        }
        call(e, t) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new te(e, n),
            s = t.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class te extends g {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const t = e._refCount;
          if (t <= 0) return void (this.connection = null);
          if (((e._refCount = t - 1), t > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = e._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      const ne = class extends w {
          constructor(e, t) {
            super(),
              (this.source = e),
              (this.subjectFactory = t),
              (this._refCount = 0),
              (this._isComplete = !1);
          }
          _subscribe(e) {
            return this.getSubject().subscribe(e);
          }
          getSubject() {
            const e = this._subject;
            return (
              (e && !e.isStopped) || (this._subject = this.subjectFactory()),
              this._subject
            );
          }
          connect() {
            let e = this._connection;
            return (
              e ||
                ((this._isComplete = !1),
                (e = this._connection = new d()),
                e.add(this.source.subscribe(new se(this.getSubject(), this))),
                e.closed
                  ? ((this._connection = null), (e = d.EMPTY))
                  : (this._connection = e)),
              e
            );
          }
          refCount() {
            return X()(this);
          }
        }.prototype,
        re = {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: ne._subscribe },
          _isComplete: { value: ne._isComplete, writable: !0 },
          getSubject: { value: ne.getSubject },
          connect: { value: ne.connect },
          refCount: { value: ne.refCount }
        };
      class se extends k {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const t = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              t && t.unsubscribe();
          }
        }
      }
      function ie(e, t) {
        return function(n) {
          let r;
          if (
            ((r =
              "function" == typeof e
                ? e
                : function() {
                    return e;
                  }),
            "function" == typeof t)
          )
            return n.lift(new oe(r, t));
          const s = Object.create(n, re);
          return (s.source = n), (s.subjectFactory = r), s;
        };
      }
      class oe {
        constructor(e, t) {
          (this.subjectFactory = e), (this.selector = t);
        }
        call(e, t) {
          const { selector: n } = this,
            r = this.subjectFactory(),
            s = n(r).subscribe(e);
          return s.add(t.subscribe(r)), s;
        }
      }
      function ae() {
        return new T();
      }
      function le(e, t, n) {
        const r = (function(e) {
          return function(...t) {
            if (e) {
              const n = e(...t);
              for (const e in n) this[e] = n[e];
            }
          };
        })(t);
        function s(...e) {
          if (this instanceof s) return r.apply(this, e), this;
          const t = new s(...e);
          return (n.annotation = t), n;
          function n(e, n, r) {
            const s = e.hasOwnProperty("__parameters__")
              ? e.__parameters__
              : Object.defineProperty(e, "__parameters__", { value: [] })
                  .__parameters__;
            for (; s.length <= r; ) s.push(null);
            return (s[r] = s[r] || []).push(t), e;
          }
        }
        return (
          n && (s.prototype = Object.create(n.prototype)),
          (s.prototype.ngMetadataName = e),
          (s.annotationCls = s),
          s
        );
      }
      const ue = le("Inject", e => ({ token: e })),
        ce = le("Optional"),
        he = le("Self"),
        de = le("SkipSelf");
      var pe = (function(e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })({});
      function fe(e) {
        for (let t in e) if (e[t] === fe) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ge(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0
        };
      }
      function me(e) {
        const t = e[ye];
        return t && t.token === e ? t : null;
      }
      const ye = fe({ ngInjectableDef: fe });
      function be(e) {
        if ("string" == typeof e) return e;
        if (e instanceof Array) return "[" + e.map(be).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      const ve = fe({ __forward_ref__: fe });
      function _e(e) {
        return (
          (e.__forward_ref__ = _e),
          (e.toString = function() {
            return be(this());
          }),
          e
        );
      }
      function we(e) {
        const t = e;
        return "function" == typeof t &&
          t.hasOwnProperty(ve) &&
          t.__forward_ref__ === _e
          ? t()
          : e;
      }
      const Ce = "undefined" != typeof globalThis && globalThis,
        xe = "undefined" != typeof window && window,
        Se =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Ee = "undefined" != typeof global && global,
        ke = Ce || Ee || xe || Se;
      class Te {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ngInjectableDef = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ngInjectableDef = ge({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const De = new Te("INJECTOR", -1),
        Ae = new Object(),
        Ie = /\n/gm,
        Oe = fe({ provide: String, useValue: fe });
      let Re = void 0;
      function Ne(e) {
        const t = Re;
        return (Re = e), t;
      }
      function Pe(e, t = pe.Default) {
        return (function(e, t = pe.Default) {
          if (void 0 === Re)
            throw new Error(
              "inject() must be called from an injection context"
            );
          return null === Re
            ? (function(e, t, n) {
                const r = me(e);
                if (r && "root" == r.providedIn)
                  return void 0 === r.value ? (r.value = r.factory()) : r.value;
                if (n & pe.Optional) return null;
                throw new Error(`Injector: NOT_FOUND [${be(e)}]`);
              })(e, 0, t)
            : Re.get(e, t & pe.Optional ? null : void 0, t);
        })(e, t);
      }
      class Me {
        get(e, t = Ae) {
          if (t === Ae) {
            const t = new Error(`NullInjectorError: No provider for ${be(e)}!`);
            throw ((t.name = "NullInjectorError"), t);
          }
          return t;
        }
      }
      function Ve(e, t, n, r = null) {
        e =
          e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
            ? e.substr(2)
            : e;
        let s = be(t);
        if (t instanceof Array) s = t.map(be).join(" -> ");
        else if ("object" == typeof t) {
          let e = [];
          for (let n in t)
            if (t.hasOwnProperty(n)) {
              let r = t[n];
              e.push(
                n + ":" + ("string" == typeof r ? JSON.stringify(r) : be(r))
              );
            }
          s = `{${e.join(", ")}}`;
        }
        return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${e.replace(Ie, "\n  ")}`;
      }
      class je {}
      class Ue {}
      function Fe(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Le(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const $e = (function() {
          var e = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (e[e.Emulated] = "Emulated"),
            (e[e.Native] = "Native"),
            (e[e.None] = "None"),
            (e[e.ShadowDom] = "ShadowDom"),
            e
          );
        })(),
        He = (() =>
          (
            ("undefined" != typeof requestAnimationFrame &&
              requestAnimationFrame) ||
            setTimeout
          ).bind(ke))();
      function ze(e) {
        return e.ngDebugContext;
      }
      function Be(e) {
        return e.ngOriginalError;
      }
      function qe(e, ...t) {
        e.error(...t);
      }
      class We {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            n = this._findContext(e),
            r = (function(e) {
              return e.ngErrorLogger || qe;
            })(e);
          r(this._console, "ERROR", e),
            t && r(this._console, "ORIGINAL ERROR", t),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(e) {
          return e ? (ze(e) ? ze(e) : this._findContext(Be(e))) : null;
        }
        _findOriginalError(e) {
          let t = Be(e);
          for (; t && Be(t); ) t = Be(t);
          return t;
        }
      }
      let Ge = !0,
        Ze = !1;
      function Qe() {
        return (Ze = !0), Ge;
      }
      class Ke {
        constructor(e) {
          if (
            ((this.defaultDoc = e),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              "sanitization-inert"
            )),
            (this.inertBodyElement = this.inertDocument.body),
            null == this.inertBodyElement)
          ) {
            const e = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(e),
              (this.inertBodyElement = this.inertDocument.createElement(
                "body"
              )),
              e.appendChild(this.inertBodyElement);
          }
          (this.inertBodyElement.innerHTML =
            '<svg><g onload="this.parentNode.remove()"></g></svg>'),
            !this.inertBodyElement.querySelector ||
            this.inertBodyElement.querySelector("svg")
              ? ((this.inertBodyElement.innerHTML =
                  '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                (this.getInertBodyElement =
                  this.inertBodyElement.querySelector &&
                  this.inertBodyElement.querySelector("svg img") &&
                  (function() {
                    try {
                      return !!window.DOMParser;
                    } catch (e) {
                      return !1;
                    }
                  })()
                    ? this.getInertBodyElement_DOMParser
                    : this.getInertBodyElement_InertDocument))
              : (this.getInertBodyElement = this.getInertBodyElement_XHR);
        }
        getInertBodyElement_XHR(e) {
          e = "<body><remove></remove>" + e + "</body>";
          try {
            e = encodeURI(e);
          } catch (r) {
            return null;
          }
          const t = new XMLHttpRequest();
          (t.responseType = "document"),
            t.open("GET", "data:text/html;charset=utf-8," + e, !1),
            t.send(void 0);
          const n = t.response.body;
          return n.removeChild(n.firstChild), n;
        }
        getInertBodyElement_DOMParser(e) {
          e = "<body><remove></remove>" + e + "</body>";
          try {
            const t = new window.DOMParser().parseFromString(e, "text/html")
              .body;
            return t.removeChild(t.firstChild), t;
          } catch (t) {
            return null;
          }
        }
        getInertBodyElement_InertDocument(e) {
          const t = this.inertDocument.createElement("template");
          return "content" in t
            ? ((t.innerHTML = e), t)
            : ((this.inertBodyElement.innerHTML = e),
              this.defaultDoc.documentMode &&
                this.stripCustomNsAttrs(this.inertBodyElement),
              this.inertBodyElement);
        }
        stripCustomNsAttrs(e) {
          const t = e.attributes;
          for (let r = t.length - 1; 0 < r; r--) {
            const n = t.item(r).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              e.removeAttribute(n);
          }
          let n = e.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const Ye = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Je = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Xe(e) {
        return (e = String(e)).match(Ye) || e.match(Je)
          ? e
          : (Qe() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${e} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + e);
      }
      function et(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function tt(...e) {
        const t = {};
        for (const n of e)
          for (const e in n) n.hasOwnProperty(e) && (t[e] = !0);
        return t;
      }
      const nt = et("area,br,col,hr,img,wbr"),
        rt = et("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        st = et("rp,rt"),
        it = tt(st, rt),
        ot = tt(
          nt,
          tt(
            rt,
            et(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          tt(
            st,
            et(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          it
        ),
        at = et("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        lt = et("srcset"),
        ut = tt(
          at,
          lt,
          et(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          et(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        ct = et("script,style,template");
      class ht {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
          let t = e.firstChild,
            n = !0;
          for (; t; )
            if (
              (t.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(t))
                : t.nodeType === Node.TEXT_NODE
                ? this.chars(t.nodeValue)
                : (this.sanitizedSomething = !0),
              n && t.firstChild)
            )
              t = t.firstChild;
            else
              for (; t; ) {
                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                let e = this.checkClobberedElement(t, t.nextSibling);
                if (e) {
                  t = e;
                  break;
                }
                t = this.checkClobberedElement(t, t.parentNode);
              }
          return this.buf.join("");
        }
        startElement(e) {
          const t = e.nodeName.toLowerCase();
          if (!ot.hasOwnProperty(t))
            return (this.sanitizedSomething = !0), !ct.hasOwnProperty(t);
          this.buf.push("<"), this.buf.push(t);
          const n = e.attributes;
          for (let s = 0; s < n.length; s++) {
            const e = n.item(s),
              t = e.name,
              i = t.toLowerCase();
            if (!ut.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = e.value;
            at[i] && (o = Xe(o)),
              lt[i] &&
                ((r = o),
                (o = (r = String(r))
                  .split(",")
                  .map(e => Xe(e.trim()))
                  .join(", "))),
              this.buf.push(" ", t, '="', ft(o), '"');
          }
          var r;
          return this.buf.push(">"), !0;
        }
        endElement(e) {
          const t = e.nodeName.toLowerCase();
          ot.hasOwnProperty(t) &&
            !nt.hasOwnProperty(t) &&
            (this.buf.push("</"), this.buf.push(t), this.buf.push(">"));
        }
        chars(e) {
          this.buf.push(ft(e));
        }
        checkClobberedElement(e, t) {
          if (
            t &&
            (e.compareDocumentPosition(t) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
            );
          return t;
        }
      }
      const dt = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        pt = /([^\#-~ |!])/g;
      function ft(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(dt, function(e) {
            return (
              "&#" +
              (1024 * (e.charCodeAt(0) - 55296) +
                (e.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(pt, function(e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let gt;
      function mt(e) {
        return "content" in e &&
          (function(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      const yt = (function() {
        var e = {
          NONE: 0,
          HTML: 1,
          STYLE: 2,
          SCRIPT: 3,
          URL: 4,
          RESOURCE_URL: 5
        };
        return (
          (e[e.NONE] = "NONE"),
          (e[e.HTML] = "HTML"),
          (e[e.STYLE] = "STYLE"),
          (e[e.SCRIPT] = "SCRIPT"),
          (e[e.URL] = "URL"),
          (e[e.RESOURCE_URL] = "RESOURCE_URL"),
          e
        );
      })();
      class bt {}
      const vt = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        _t = /^url\(([^)]+)\)$/,
        wt = /([A-Z])/g;
      function Ct(e) {
        try {
          return null != e ? e.toString().slice(0, 30) : e;
        } catch (t) {
          return "[ERROR] Exception while trying to serialize the value";
        }
      }
      let xt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => St()), e;
      })();
      const St = (...e) => {},
        Et = new Te(
          "The presence of this token marks an injector as being the root injector."
        ),
        kt = function(e, t, n) {
          return new Rt(e, t, n);
        };
      let Tt = (() => {
        class e {
          static create(e, t) {
            return Array.isArray(e)
              ? kt(e, t, "")
              : kt(e.providers, e.parent, e.name || "");
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Ae),
          (e.NULL = new Me()),
          (e.ngInjectableDef = ge({
            token: e,
            providedIn: "any",
            factory: () => Pe(De)
          })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      const Dt = function(e) {
          return e;
        },
        At = [],
        It = Dt,
        Ot = function() {
          return Array.prototype.slice.call(arguments);
        };
      class Rt {
        constructor(e, t = Tt.NULL, n = null) {
          (this.parent = t), (this.source = n);
          const r = (this._records = new Map());
          r.set(Tt, { token: Tt, fn: Dt, deps: At, value: this, useNew: !1 }),
            r.set(De, { token: De, fn: Dt, deps: At, value: this, useNew: !1 }),
            (function e(t, n) {
              if (n)
                if ((n = we(n)) instanceof Array)
                  for (let r = 0; r < n.length; r++) e(t, n[r]);
                else {
                  if ("function" == typeof n)
                    throw Pt("Function/Class not supported", n);
                  if (!n || "object" != typeof n || !n.provide)
                    throw Pt("Unexpected provider", n);
                  {
                    let e = we(n.provide);
                    const r = (function(e) {
                      const t = (function(e) {
                        let t = At;
                        const n = e.deps;
                        if (n && n.length) {
                          t = [];
                          for (let e = 0; e < n.length; e++) {
                            let r = 6,
                              s = we(n[e]);
                            if (s instanceof Array)
                              for (let e = 0, t = s; e < t.length; e++) {
                                const n = t[e];
                                n instanceof ce || n == ce
                                  ? (r |= 1)
                                  : n instanceof de || n == de
                                  ? (r &= -3)
                                  : n instanceof he || n == he
                                  ? (r &= -5)
                                  : (s = n instanceof ue ? n.token : we(n));
                              }
                            t.push({ token: s, options: r });
                          }
                        } else if (e.useExisting)
                          t = [{ token: we(e.useExisting), options: 6 }];
                        else if (!(n || Oe in e))
                          throw Pt("'deps' required", e);
                        return t;
                      })(e);
                      let n = Dt,
                        r = At,
                        s = !1,
                        i = we(e.provide);
                      if (Oe in e) r = e.useValue;
                      else if (e.useFactory) n = e.useFactory;
                      else if (e.useExisting);
                      else if (e.useClass) (s = !0), (n = we(e.useClass));
                      else {
                        if ("function" != typeof i)
                          throw Pt(
                            "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
                            e
                          );
                        (s = !0), (n = i);
                      }
                      return { deps: t, fn: n, useNew: s, value: r };
                    })(n);
                    if (!0 === n.multi) {
                      let r = t.get(e);
                      if (r) {
                        if (r.fn !== Ot) throw Nt(e);
                      } else
                        t.set(
                          e,
                          (r = {
                            token: n.provide,
                            deps: [],
                            useNew: !1,
                            fn: Ot,
                            value: At
                          })
                        );
                      (e = n), r.deps.push({ token: e, options: 6 });
                    }
                    const s = t.get(e);
                    if (s && s.fn == Ot) throw Nt(e);
                    t.set(e, r);
                  }
                }
            })(r, e);
        }
        get(e, t, n = pe.Default) {
          const r = this._records.get(e);
          try {
            return (function e(t, n, r, s, i, o) {
              try {
                return (function(t, n, r, s, i, o) {
                  let a;
                  if (!n || o & pe.SkipSelf)
                    o & pe.Self || (a = s.get(t, i, pe.Default));
                  else {
                    if (((a = n.value), a == It))
                      throw Error("\u0275Circular dependency");
                    if (a === At) {
                      n.value = It;
                      let t = void 0,
                        i = n.useNew,
                        o = n.fn,
                        l = n.deps,
                        u = At;
                      if (l.length) {
                        u = [];
                        for (let t = 0; t < l.length; t++) {
                          const n = l[t],
                            i = n.options,
                            o = 2 & i ? r.get(n.token) : void 0;
                          u.push(
                            e(
                              n.token,
                              o,
                              r,
                              o || 4 & i ? s : Tt.NULL,
                              1 & i ? null : Tt.THROW_IF_NOT_FOUND,
                              pe.Default
                            )
                          );
                        }
                      }
                      n.value = a = i ? new o(...u) : o.apply(t, u);
                    }
                  }
                  return a;
                })(t, n, r, s, i, o);
              } catch (a) {
                throw (a instanceof Error || (a = new Error(a)),
                (a.ngTempTokenPath = a.ngTempTokenPath || []).unshift(t),
                n && n.value == It && (n.value = At),
                a);
              }
            })(e, r, this._records, this.parent, t, n);
          } catch (s) {
            return (function(e, t, n, r) {
              const s = e.ngTempTokenPath;
              throw (t.__source && s.unshift(t.__source),
              (e.message = Ve("\n" + e.message, s, "StaticInjectorError", r)),
              (e.ngTokenPath = s),
              (e.ngTempTokenPath = null),
              e);
            })(s, e, 0, this.source);
          }
        }
        toString() {
          const e = [];
          return (
            this._records.forEach((t, n) => e.push(be(n))),
            `StaticInjector[${e.join(", ")}]`
          );
        }
      }
      function Nt(e) {
        return Pt("Cannot mix multi providers and regular providers", e);
      }
      function Pt(e, t) {
        return new Error(Ve(e, t, "StaticInjectorError"));
      }
      const Mt = new Te("AnalyzeForEntryComponents");
      let Vt = null;
      function jt() {
        if (!Vt) {
          const e = ke.Symbol;
          if (e && e.iterator) Vt = e.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const n = e[t];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Vt = n);
            }
          }
        }
        return Vt;
      }
      function Ut(e, t) {
        return (
          e === t ||
          ("number" == typeof e && "number" == typeof t && isNaN(e) && isNaN(t))
        );
      }
      function Ft(e, t) {
        const n = $t(e),
          r = $t(t);
        if (n && r)
          return (function(e, t, n) {
            const r = e[jt()](),
              s = t[jt()]();
            for (;;) {
              const e = r.next(),
                t = s.next();
              if (e.done && t.done) return !0;
              if (e.done || t.done) return !1;
              if (!n(e.value, t.value)) return !1;
            }
          })(e, t, Ft);
        {
          const s = e && ("object" == typeof e || "function" == typeof e),
            i = t && ("object" == typeof t || "function" == typeof t);
          return !(n || !s || r || !i) || Ut(e, t);
        }
      }
      class Lt {
        constructor(e) {
          this.wrapped = e;
        }
        static wrap(e) {
          return new Lt(e);
        }
        static unwrap(e) {
          return Lt.isWrapped(e) ? e.wrapped : e;
        }
        static isWrapped(e) {
          return e instanceof Lt;
        }
      }
      function $t(e) {
        return (
          !!Ht(e) && (Array.isArray(e) || (!(e instanceof Map) && jt() in e))
        );
      }
      function Ht(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function zt(e) {
        return !!e && "function" == typeof e.then;
      }
      function Bt(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      class qt {
        constructor(e, t, n) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      class Wt {}
      function Gt(e) {
        const t = Error(
          `No component factory found for ${be(
            e
          )}. Did you add it to @NgModule.entryComponents?`
        );
        return (t[Zt] = e), t;
      }
      const Zt = "ngComponent";
      class Qt {
        resolveComponentFactory(e) {
          throw Gt(e);
        }
      }
      let Kt = (() => {
        class e {}
        return (e.NULL = new Qt()), e;
      })();
      class Yt {
        constructor(e, t, n) {
          (this._parent = t),
            (this._ngModule = n),
            (this._factories = new Map());
          for (let r = 0; r < e.length; r++) {
            const t = e[r];
            this._factories.set(t.componentType, t);
          }
        }
        resolveComponentFactory(e) {
          let t = this._factories.get(e);
          if (
            (!t &&
              this._parent &&
              (t = this._parent.resolveComponentFactory(e)),
            !t)
          )
            throw Gt(e);
          return new Jt(t, this._ngModule);
        }
      }
      class Jt extends Wt {
        constructor(e, t) {
          super(),
            (this.factory = e),
            (this.ngModule = t),
            (this.selector = e.selector),
            (this.componentType = e.componentType),
            (this.ngContentSelectors = e.ngContentSelectors),
            (this.inputs = e.inputs),
            (this.outputs = e.outputs);
        }
        create(e, t, n, r) {
          return this.factory.create(e, t, n, r || this.ngModule);
        }
      }
      function Xt(...e) {}
      let en = (() => {
        class e {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (e.__NG_ELEMENT_ID__ = () => tn(e)), e;
      })();
      const tn = Xt;
      class nn {}
      class rn {}
      const sn = (function() {
        var e = { Important: 1, DashCase: 2 };
        return (e[e.Important] = "Important"), (e[e.DashCase] = "DashCase"), e;
      })();
      let on = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => an()), e;
      })();
      const an = Xt;
      class ln {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e
              .split(".")
              .slice(2)
              .join("."));
        }
      }
      const un = new ln("8.2.14");
      class cn {
        constructor() {}
        supports(e) {
          return $t(e);
        }
        create(e) {
          return new dn(e);
        }
      }
      const hn = (e, t) => t;
      class dn {
        constructor(e) {
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
            (this._trackByFn = e || hn);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; t || n; ) {
            const i = !n || (t && t.currentIndex < mn(n, r, s)) ? t : n,
              o = mn(i, r, s),
              a = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((t = t._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const e = o - r,
                t = a - r;
              if (e != t) {
                for (let n = 0; n < e; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  t <= i && i < e && (s[n] = r + 1);
                }
                s[i.previousIndex] = t - e;
              }
            }
            o !== a && e(i, o, a);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !$t(e)))
            throw new Error(
              `Error trying to diff '${be(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let t = 0; t < this.length; t++)
              (n = e[t]),
                (r = this._trackByFn(t, n)),
                null !== s && Ut(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, t)),
                    Ut(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, t)), (i = !0)),
                (s = s._next);
          } else
            (t = 0),
              (function(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[jt()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(e, e => {
                (r = this._trackByFn(t, e)),
                  null !== s && Ut(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, e, r, t)),
                      Ut(s.item, e) || this._addIdentityChange(s, e))
                    : ((s = this._mismatch(s, e, r, t)), (i = !0)),
                  (s = s._next),
                  t++;
              }),
              (this.length = t);
          return this._truncate(s), (this.collection = e), this.isDirty;
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
            let e, t;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = t
            )
              (e.previousIndex = e.currentIndex), (t = e._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, n, r) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Ut(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, s, r))
              : null !==
                (e =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Ut(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, s, r))
              : (e = this._addAfter(new pn(t, n), s, r)),
            e
          );
        }
        _verifyReinsertion(e, t, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, r))
              : e.currentIndex != r &&
                ((e.currentIndex = r), this._addToMoves(e, r)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
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
        _reinsertAfter(e, t, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const r = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _moveAfter(e, t, n) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _addAfter(e, t, n) {
          return (
            this._insertAfter(e, t, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, n) {
          const r = null === t ? this._itHead : t._next;
          return (
            (e._next = r),
            (e._prev = t),
            null === r ? (this._itTail = e) : (r._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new gn()),
            this._linkedRecords.put(e),
            (e.currentIndex = n),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            n = e._next;
          return (
            null === t ? (this._itHead = n) : (t._next = n),
            null === n ? (this._itTail = t) : (n._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return e.previousIndex === t
            ? e
            : ((this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
              e);
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new gn()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class pn {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
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
      class fn {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === t || t <= n.currentIndex) && Ut(n.trackById, e))
              return n;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            n = e._nextDup;
          return (
            null === t ? (this._head = n) : (t._nextDup = n),
            null === n ? (this._tail = t) : (n._prevDup = t),
            null === this._head
          );
        }
      }
      class gn {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let n = this.map.get(t);
          n || ((n = new fn()), this.map.set(t, n)), n.add(e);
        }
        get(e, t) {
          const n = this.map.get(e);
          return n ? n.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function mn(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + t + s;
      }
      class yn {
        constructor() {}
        supports(e) {
          return e instanceof Map || Ht(e);
        }
        create() {
          return new bn();
        }
      }
      class bn {
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
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Ht(e)))
              throw new Error(
                `Error trying to diff '${be(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (e, n) => {
              if (t && t.key === n)
                this._maybeAddToChanges(t, e),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const r = this._getOrCreateRecordForKey(n, e);
                t = this._insertBeforeOrAppend(t, r);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let e = t; null !== e; e = e._nextRemoved)
              e === this._mapHead && (this._mapHead = null),
                this._records.delete(e.key),
                (e._nextRemoved = e._next),
                (e.previousValue = e.currentValue),
                (e.currentValue = null),
                (e._prev = null),
                (e._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const n = e._prev;
            return (
              (t._next = e),
              (t._prev = n),
              (e._prev = t),
              n && (n._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const n = this._records.get(e);
            this._maybeAddToChanges(n, t);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new vn(e);
          return (
            this._records.set(e, n),
            (n.currentValue = t),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Ut(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach(n => t(e[n], n));
        }
      }
      class vn {
        constructor(e) {
          (this.key = e),
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
      let _n = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (null != n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: n => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new de(), new ce()]]
              };
            }
            find(e) {
              const t = this.factories.find(t => t.supports(e));
              if (null != t) return t;
              throw new Error(
                `Cannot find a differ supporting object '${e}' of type '${((n = e),
                n.name || typeof n)}'`
              );
              var n;
            }
          }
          return (
            (e.ngInjectableDef = ge({
              token: e,
              providedIn: "root",
              factory: () => new e([new cn()])
            })),
            e
          );
        })(),
        wn = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: n => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new de(), new ce()]]
              };
            }
            find(e) {
              const t = this.factories.find(t => t.supports(e));
              if (t) return t;
              throw new Error(`Cannot find a differ supporting object '${e}'`);
            }
          }
          return (
            (e.ngInjectableDef = ge({
              token: e,
              providedIn: "root",
              factory: () => new e([new yn()])
            })),
            e
          );
        })();
      const Cn = [new yn()],
        xn = new _n([new cn()]),
        Sn = new wn(Cn);
      let En = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => kn(e, en)), e;
      })();
      const kn = Xt;
      let Tn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => Dn(e, en)), e;
      })();
      const Dn = Xt;
      function An(e, t, n, r) {
        let s = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${t}'. Current value: '${n}'.`;
        return (
          r &&
            (s +=
              " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
          (function(e, t) {
            const n = new Error(e);
            return In(n, t), n;
          })(s, e)
        );
      }
      function In(e, t) {
        (e.ngDebugContext = t), (e.ngErrorLogger = t.logError.bind(t));
      }
      function On(e) {
        return new Error(
          `ViewDestroyedError: Attempt to use a destroyed view: ${e}`
        );
      }
      function Rn(e, t, n) {
        const r = e.state,
          s = 1792 & r;
        return s === t
          ? ((e.state = (-1793 & r) | n), (e.initIndex = -1), !0)
          : s === n;
      }
      function Nn(e, t, n) {
        return (
          (1792 & e.state) === t &&
          e.initIndex <= n &&
          ((e.initIndex = n + 1), !0)
        );
      }
      function Pn(e, t) {
        return e.nodes[t];
      }
      function Mn(e, t) {
        return e.nodes[t];
      }
      function Vn(e, t) {
        return e.nodes[t];
      }
      function jn(e, t) {
        return e.nodes[t];
      }
      function Un(e, t) {
        return e.nodes[t];
      }
      const Fn = {
          setCurrentNode: void 0,
          createRootView: void 0,
          createEmbeddedView: void 0,
          createComponentView: void 0,
          createNgModuleRef: void 0,
          overrideProvider: void 0,
          overrideComponentView: void 0,
          clearOverrides: void 0,
          checkAndUpdateView: void 0,
          checkNoChangesView: void 0,
          destroyView: void 0,
          resolveDep: void 0,
          createDebugContext: void 0,
          handleEvent: void 0,
          updateDirectives: void 0,
          updateRenderer: void 0,
          dirtyParentQueries: void 0
        },
        Ln = () => {},
        $n = new Map();
      function Hn(e) {
        let t = $n.get(e);
        return t || ((t = be(e) + "_" + $n.size), $n.set(e, t)), t;
      }
      function zn(e) {
        return {
          id: "$$undefined",
          styles: e.styles,
          encapsulation: e.encapsulation,
          data: e.data
        };
      }
      let Bn = 0;
      function qn(e, t, n, r) {
        return !(!(2 & e.state) && Ut(e.oldValues[t.bindingIndex + n], r));
      }
      function Wn(e, t, n, r) {
        return !!qn(e, t, n, r) && ((e.oldValues[t.bindingIndex + n] = r), !0);
      }
      function Gn(e, t, n, r) {
        const s = e.oldValues[t.bindingIndex + n];
        if (1 & e.state || !Ft(s, r)) {
          const i = t.bindings[n].name;
          throw An(
            Fn.createDebugContext(e, t.nodeIndex),
            `${i}: ${s}`,
            `${i}: ${r}`,
            0 != (1 & e.state)
          );
        }
      }
      function Zn(e) {
        let t = e;
        for (; t; )
          2 & t.def.flags && (t.state |= 8),
            (t = t.viewContainerParent || t.parent);
      }
      function Qn(e, t) {
        let n = e;
        for (; n && n !== t; )
          (n.state |= 64), (n = n.viewContainerParent || n.parent);
      }
      function Kn(e, t, n, r) {
        try {
          return (
            Zn(33554432 & e.def.nodes[t].flags ? Mn(e, t).componentView : e),
            Fn.handleEvent(e, t, n, r)
          );
        } catch (s) {
          e.root.errorHandler.handleError(s);
        }
      }
      function Yn(e) {
        return e.parent ? Mn(e.parent, e.parentNodeDef.nodeIndex) : null;
      }
      function Jn(e) {
        return e.parent ? e.parentNodeDef.parent : null;
      }
      function Xn(e, t) {
        switch (201347067 & t.flags) {
          case 1:
            return Mn(e, t.nodeIndex).renderElement;
          case 2:
            return Pn(e, t.nodeIndex).renderText;
        }
      }
      function er(e) {
        return !!e.parent && !!(32768 & e.parentNodeDef.flags);
      }
      function tr(e) {
        return !(!e.parent || 32768 & e.parentNodeDef.flags);
      }
      function nr(e) {
        return 1 << e % 32;
      }
      function rr(e) {
        const t = {};
        let n = 0;
        const r = {};
        return (
          e &&
            e.forEach(([e, s]) => {
              "number" == typeof e ? ((t[e] = s), (n |= nr(e))) : (r[e] = s);
            }),
          { matchedQueries: t, references: r, matchedQueryIds: n }
        );
      }
      function sr(e, t) {
        return e.map(e => {
          let n, r;
          return (
            Array.isArray(e) ? ([r, n] = e) : ((r = 0), (n = e)),
            n &&
              ("function" == typeof n || "object" == typeof n) &&
              t &&
              Object.defineProperty(n, "__source", {
                value: t,
                configurable: !0
              }),
            { flags: r, token: n, tokenKey: Hn(n) }
          );
        });
      }
      function ir(e, t, n) {
        let r = n.renderParent;
        return r
          ? 0 == (1 & r.flags) ||
            0 == (33554432 & r.flags) ||
            (r.element.componentRendererType &&
              r.element.componentRendererType.encapsulation === $e.Native)
            ? Mn(e, n.renderParent.nodeIndex).renderElement
            : void 0
          : t;
      }
      const or = new WeakMap();
      function ar(e) {
        let t = or.get(e);
        return t || ((t = e(() => Ln)), (t.factory = e), or.set(e, t)), t;
      }
      function lr(e, t, n, r, s) {
        3 === t && (n = e.renderer.parentNode(Xn(e, e.def.lastRenderRootNode))),
          ur(e, t, 0, e.def.nodes.length - 1, n, r, s);
      }
      function ur(e, t, n, r, s, i, o) {
        for (let a = n; a <= r; a++) {
          const n = e.def.nodes[a];
          11 & n.flags && hr(e, n, t, s, i, o), (a += n.childCount);
        }
      }
      function cr(e, t, n, r, s, i) {
        let o = e;
        for (; o && !er(o); ) o = o.parent;
        const a = o.parent,
          l = Jn(o),
          u = l.nodeIndex + l.childCount;
        for (let c = l.nodeIndex + 1; c <= u; c++) {
          const e = a.def.nodes[c];
          e.ngContentIndex === t && hr(a, e, n, r, s, i), (c += e.childCount);
        }
        if (!a.parent) {
          const o = e.root.projectableNodes[t];
          if (o) for (let t = 0; t < o.length; t++) dr(e, o[t], n, r, s, i);
        }
      }
      function hr(e, t, n, r, s, i) {
        if (8 & t.flags) cr(e, t.ngContent.index, n, r, s, i);
        else {
          const o = Xn(e, t);
          if (
            (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
              ? (16 & t.bindingFlags && dr(e, o, n, r, s, i),
                32 & t.bindingFlags &&
                  dr(Mn(e, t.nodeIndex).componentView, o, n, r, s, i))
              : dr(e, o, n, r, s, i),
            16777216 & t.flags)
          ) {
            const o = Mn(e, t.nodeIndex).viewContainer._embeddedViews;
            for (let e = 0; e < o.length; e++) lr(o[e], n, r, s, i);
          }
          1 & t.flags &&
            !t.element.name &&
            ur(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, s, i);
        }
      }
      function dr(e, t, n, r, s, i) {
        const o = e.renderer;
        switch (n) {
          case 1:
            o.appendChild(r, t);
            break;
          case 2:
            o.insertBefore(r, t, s);
            break;
          case 3:
            o.removeChild(r, t);
            break;
          case 0:
            i.push(t);
        }
      }
      const pr = /^:([^:]+):(.+)$/;
      function fr(e) {
        if (":" === e[0]) {
          const t = e.match(pr);
          return [t[1], t[2]];
        }
        return ["", e];
      }
      function gr(e) {
        let t = 0;
        for (let n = 0; n < e.length; n++) t |= e[n].flags;
        return t;
      }
      const mr = new Object(),
        yr = Hn(Tt),
        br = Hn(De),
        vr = Hn(je);
      function _r(e, t, n, r) {
        return (
          (n = we(n)),
          { index: -1, deps: sr(r, be(t)), flags: e, token: t, value: n }
        );
      }
      function wr(e, t, n = Tt.THROW_IF_NOT_FOUND) {
        const r = Ne(e);
        try {
          if (8 & t.flags) return t.token;
          if ((2 & t.flags && (n = null), 1 & t.flags))
            return e._parent.get(t.token, n);
          const o = t.tokenKey;
          switch (o) {
            case yr:
            case br:
            case vr:
              return e;
          }
          const a = e._def.providersByKey[o];
          let l;
          if (a) {
            let t = e._providers[a.index];
            return (
              void 0 === t && (t = e._providers[a.index] = Cr(e, a)),
              t === mr ? void 0 : t
            );
          }
          if (
            (l = me(t.token)) &&
            ((s = e),
            null != (i = l).providedIn &&
              ((function(e, t) {
                return e._def.modules.indexOf(t) > -1;
              })(s, i.providedIn) ||
                ("root" === i.providedIn && s._def.isRoot)))
          ) {
            const n = e._providers.length;
            return (
              (e._def.providers[n] = e._def.providersByKey[t.tokenKey] = {
                flags: 5120,
                value: l.factory,
                deps: [],
                index: n,
                token: t.token
              }),
              (e._providers[n] = mr),
              (e._providers[n] = Cr(e, e._def.providersByKey[t.tokenKey]))
            );
          }
          return 4 & t.flags ? n : e._parent.get(t.token, n);
        } finally {
          Ne(r);
        }
        var s, i;
      }
      function Cr(e, t) {
        let n;
        switch (201347067 & t.flags) {
          case 512:
            n = (function(e, t, n) {
              const r = n.length;
              switch (r) {
                case 0:
                  return new t();
                case 1:
                  return new t(wr(e, n[0]));
                case 2:
                  return new t(wr(e, n[0]), wr(e, n[1]));
                case 3:
                  return new t(wr(e, n[0]), wr(e, n[1]), wr(e, n[2]));
                default:
                  const s = new Array(r);
                  for (let t = 0; t < r; t++) s[t] = wr(e, n[t]);
                  return new t(...s);
              }
            })(e, t.value, t.deps);
            break;
          case 1024:
            n = (function(e, t, n) {
              const r = n.length;
              switch (r) {
                case 0:
                  return t();
                case 1:
                  return t(wr(e, n[0]));
                case 2:
                  return t(wr(e, n[0]), wr(e, n[1]));
                case 3:
                  return t(wr(e, n[0]), wr(e, n[1]), wr(e, n[2]));
                default:
                  const s = Array(r);
                  for (let t = 0; t < r; t++) s[t] = wr(e, n[t]);
                  return t(...s);
              }
            })(e, t.value, t.deps);
            break;
          case 2048:
            n = wr(e, t.deps[0]);
            break;
          case 256:
            n = t.value;
        }
        return (
          n === mr ||
            null === n ||
            "object" != typeof n ||
            131072 & t.flags ||
            "function" != typeof n.ngOnDestroy ||
            (t.flags |= 131072),
          void 0 === n ? mr : n
        );
      }
      function xr(e, t) {
        const n = e.viewContainer._embeddedViews;
        if (((null == t || t >= n.length) && (t = n.length - 1), t < 0))
          return null;
        const r = n[t];
        return (
          (r.viewContainerParent = null),
          Le(n, t),
          Fn.dirtyParentQueries(r),
          Er(r),
          r
        );
      }
      function Sr(e, t, n) {
        const r = t ? Xn(t, t.def.lastRenderRootNode) : e.renderElement,
          s = n.renderer.parentNode(r),
          i = n.renderer.nextSibling(r);
        lr(n, 2, s, i, void 0);
      }
      function Er(e) {
        lr(e, 3, null, null, void 0);
      }
      const kr = new Object();
      function Tr(e, t, n, r, s, i) {
        return new Dr(e, t, n, r, s, i);
      }
      class Dr extends Wt {
        constructor(e, t, n, r, s, i) {
          super(),
            (this.selector = e),
            (this.componentType = t),
            (this._inputs = r),
            (this._outputs = s),
            (this.ngContentSelectors = i),
            (this.viewDefFactory = n);
        }
        get inputs() {
          const e = [],
            t = this._inputs;
          for (let n in t) e.push({ propName: n, templateName: t[n] });
          return e;
        }
        get outputs() {
          const e = [];
          for (let t in this._outputs)
            e.push({ propName: t, templateName: this._outputs[t] });
          return e;
        }
        create(e, t, n, r) {
          if (!r) throw new Error("ngModule should be provided");
          const s = ar(this.viewDefFactory),
            i = s.nodes[0].element.componentProvider.nodeIndex,
            o = Fn.createRootView(e, t || [], n, s, r, kr),
            a = Vn(o, i).instance;
          return (
            n &&
              o.renderer.setAttribute(
                Mn(o, 0).renderElement,
                "ng-version",
                un.full
              ),
            new Ar(o, new Nr(o), a)
          );
        }
      }
      class Ar extends class {} {
        constructor(e, t, n) {
          super(),
            (this._view = e),
            (this._viewRef = t),
            (this._component = n),
            (this._elDef = this._view.def.nodes[0]),
            (this.hostView = t),
            (this.changeDetectorRef = t),
            (this.instance = n);
        }
        get location() {
          return new en(Mn(this._view, this._elDef.nodeIndex).renderElement);
        }
        get injector() {
          return new jr(this._view, this._elDef);
        }
        get componentType() {
          return this._component.constructor;
        }
        destroy() {
          this._viewRef.destroy();
        }
        onDestroy(e) {
          this._viewRef.onDestroy(e);
        }
      }
      function Ir(e, t, n) {
        return new Or(e, t, n);
      }
      class Or {
        constructor(e, t, n) {
          (this._view = e),
            (this._elDef = t),
            (this._data = n),
            (this._embeddedViews = []);
        }
        get element() {
          return new en(this._data.renderElement);
        }
        get injector() {
          return new jr(this._view, this._elDef);
        }
        get parentInjector() {
          let e = this._view,
            t = this._elDef.parent;
          for (; !t && e; ) (t = Jn(e)), (e = e.parent);
          return e ? new jr(e, t) : new jr(this._view, null);
        }
        clear() {
          for (let e = this._embeddedViews.length - 1; e >= 0; e--) {
            const t = xr(this._data, e);
            Fn.destroyView(t);
          }
        }
        get(e) {
          const t = this._embeddedViews[e];
          if (t) {
            const e = new Nr(t);
            return e.attachToViewContainerRef(this), e;
          }
          return null;
        }
        get length() {
          return this._embeddedViews.length;
        }
        createEmbeddedView(e, t, n) {
          const r = e.createEmbeddedView(t || {});
          return this.insert(r, n), r;
        }
        createComponent(e, t, n, r, s) {
          const i = n || this.parentInjector;
          s || e instanceof Jt || (s = i.get(je));
          const o = e.create(i, r, void 0, s);
          return this.insert(o.hostView, t), o;
        }
        insert(e, t) {
          if (e.destroyed)
            throw new Error(
              "Cannot insert a destroyed View in a ViewContainer!"
            );
          const n = e;
          return (
            (function(e, t, n, r) {
              let s = t.viewContainer._embeddedViews;
              null == n && (n = s.length),
                (r.viewContainerParent = e),
                Fe(s, n, r),
                (function(e, t) {
                  const n = Yn(t);
                  if (!n || n === e || 16 & t.state) return;
                  t.state |= 16;
                  let r = n.template._projectedViews;
                  r || (r = n.template._projectedViews = []),
                    r.push(t),
                    (function(e, t) {
                      if (4 & t.flags) return;
                      (e.nodeFlags |= 4), (t.flags |= 4);
                      let n = t.parent;
                      for (; n; ) (n.childFlags |= 4), (n = n.parent);
                    })(t.parent.def, t.parentNodeDef);
                })(t, r),
                Fn.dirtyParentQueries(r),
                Sr(t, n > 0 ? s[n - 1] : null, r);
            })(this._view, this._data, t, n._view),
            n.attachToViewContainerRef(this),
            e
          );
        }
        move(e, t) {
          if (e.destroyed)
            throw new Error("Cannot move a destroyed View in a ViewContainer!");
          const n = this._embeddedViews.indexOf(e._view);
          return (
            (function(e, t, n) {
              const r = e.viewContainer._embeddedViews,
                s = r[t];
              Le(r, t),
                null == n && (n = r.length),
                Fe(r, n, s),
                Fn.dirtyParentQueries(s),
                Er(s),
                Sr(e, n > 0 ? r[n - 1] : null, s);
            })(this._data, n, t),
            e
          );
        }
        indexOf(e) {
          return this._embeddedViews.indexOf(e._view);
        }
        remove(e) {
          const t = xr(this._data, e);
          t && Fn.destroyView(t);
        }
        detach(e) {
          const t = xr(this._data, e);
          return t ? new Nr(t) : null;
        }
      }
      function Rr(e) {
        return new Nr(e);
      }
      class Nr {
        constructor(e) {
          (this._view = e),
            (this._viewContainerRef = null),
            (this._appRef = null);
        }
        get rootNodes() {
          return (function(e) {
            const t = [];
            return lr(e, 0, void 0, void 0, t), t;
          })(this._view);
        }
        get context() {
          return this._view.context;
        }
        get destroyed() {
          return 0 != (128 & this._view.state);
        }
        markForCheck() {
          Zn(this._view);
        }
        detach() {
          this._view.state &= -5;
        }
        detectChanges() {
          const e = this._view.root.rendererFactory;
          e.begin && e.begin();
          try {
            Fn.checkAndUpdateView(this._view);
          } finally {
            e.end && e.end();
          }
        }
        checkNoChanges() {
          Fn.checkNoChangesView(this._view);
        }
        reattach() {
          this._view.state |= 4;
        }
        onDestroy(e) {
          this._view.disposables || (this._view.disposables = []),
            this._view.disposables.push(e);
        }
        destroy() {
          this._appRef
            ? this._appRef.detachView(this)
            : this._viewContainerRef &&
              this._viewContainerRef.detach(
                this._viewContainerRef.indexOf(this)
              ),
            Fn.destroyView(this._view);
        }
        detachFromAppRef() {
          (this._appRef = null),
            Er(this._view),
            Fn.dirtyParentQueries(this._view);
        }
        attachToAppRef(e) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
        attachToViewContainerRef(e) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = e;
        }
      }
      function Pr(e, t) {
        return new Mr(e, t);
      }
      class Mr extends En {
        constructor(e, t) {
          super(), (this._parentView = e), (this._def = t);
        }
        createEmbeddedView(e) {
          return new Nr(
            Fn.createEmbeddedView(
              this._parentView,
              this._def,
              this._def.element.template,
              e
            )
          );
        }
        get elementRef() {
          return new en(
            Mn(this._parentView, this._def.nodeIndex).renderElement
          );
        }
      }
      function Vr(e, t) {
        return new jr(e, t);
      }
      class jr {
        constructor(e, t) {
          (this.view = e), (this.elDef = t);
        }
        get(e, t = Tt.THROW_IF_NOT_FOUND) {
          return Fn.resolveDep(
            this.view,
            this.elDef,
            !!this.elDef && 0 != (33554432 & this.elDef.flags),
            { flags: 0, token: e, tokenKey: Hn(e) },
            t
          );
        }
      }
      function Ur(e, t) {
        const n = e.def.nodes[t];
        if (1 & n.flags) {
          const t = Mn(e, n.nodeIndex);
          return n.element.template ? t.template : t.renderElement;
        }
        if (2 & n.flags) return Pn(e, n.nodeIndex).renderText;
        if (20240 & n.flags) return Vn(e, n.nodeIndex).instance;
        throw new Error(`Illegal state: read nodeValue for node index ${t}`);
      }
      function Fr(e) {
        return new Lr(e.renderer);
      }
      class Lr {
        constructor(e) {
          this.delegate = e;
        }
        selectRootElement(e) {
          return this.delegate.selectRootElement(e);
        }
        createElement(e, t) {
          const [n, r] = fr(t),
            s = this.delegate.createElement(r, n);
          return e && this.delegate.appendChild(e, s), s;
        }
        createViewRoot(e) {
          return e;
        }
        createTemplateAnchor(e) {
          const t = this.delegate.createComment("");
          return e && this.delegate.appendChild(e, t), t;
        }
        createText(e, t) {
          const n = this.delegate.createText(t);
          return e && this.delegate.appendChild(e, n), n;
        }
        projectNodes(e, t) {
          for (let n = 0; n < t.length; n++) this.delegate.appendChild(e, t[n]);
        }
        attachViewAfter(e, t) {
          const n = this.delegate.parentNode(e),
            r = this.delegate.nextSibling(e);
          for (let s = 0; s < t.length; s++)
            this.delegate.insertBefore(n, t[s], r);
        }
        detachView(e) {
          for (let t = 0; t < e.length; t++) {
            const n = e[t],
              r = this.delegate.parentNode(n);
            this.delegate.removeChild(r, n);
          }
        }
        destroyView(e, t) {
          for (let n = 0; n < t.length; n++) this.delegate.destroyNode(t[n]);
        }
        listen(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        listenGlobal(e, t, n) {
          return this.delegate.listen(e, t, n);
        }
        setElementProperty(e, t, n) {
          this.delegate.setProperty(e, t, n);
        }
        setElementAttribute(e, t, n) {
          const [r, s] = fr(t);
          null != n
            ? this.delegate.setAttribute(e, s, n, r)
            : this.delegate.removeAttribute(e, s, r);
        }
        setBindingDebugInfo(e, t, n) {}
        setElementClass(e, t, n) {
          n ? this.delegate.addClass(e, t) : this.delegate.removeClass(e, t);
        }
        setElementStyle(e, t, n) {
          null != n
            ? this.delegate.setStyle(e, t, n)
            : this.delegate.removeStyle(e, t);
        }
        invokeElementMethod(e, t, n) {
          e[t].apply(e, n);
        }
        setText(e, t) {
          this.delegate.setValue(e, t);
        }
        animate() {
          throw new Error("Renderer.animate is no longer supported!");
        }
      }
      function $r(e, t, n, r) {
        return new Hr(e, t, n, r);
      }
      class Hr {
        constructor(e, t, n, r) {
          (this._moduleType = e),
            (this._parent = t),
            (this._bootstrapComponents = n),
            (this._def = r),
            (this._destroyListeners = []),
            (this._destroyed = !1),
            (this.injector = this),
            (function(e) {
              const t = e._def,
                n = (e._providers = new Array(t.providers.length));
              for (let r = 0; r < t.providers.length; r++) {
                const s = t.providers[r];
                4096 & s.flags || (void 0 === n[r] && (n[r] = Cr(e, s)));
              }
            })(this);
        }
        get(e, t = Tt.THROW_IF_NOT_FOUND, n = pe.Default) {
          let r = 0;
          return (
            n & pe.SkipSelf ? (r |= 1) : n & pe.Self && (r |= 4),
            wr(this, { token: e, tokenKey: Hn(e), flags: r }, t)
          );
        }
        get instance() {
          return this.get(this._moduleType);
        }
        get componentFactoryResolver() {
          return this.get(Kt);
        }
        destroy() {
          if (this._destroyed)
            throw new Error(
              `The ng module ${be(
                this.instance.constructor
              )} has already been destroyed.`
            );
          (this._destroyed = !0),
            (function(e, t) {
              const n = e._def,
                r = new Set();
              for (let s = 0; s < n.providers.length; s++)
                if (131072 & n.providers[s].flags) {
                  const t = e._providers[s];
                  if (t && t !== mr) {
                    const e = t.ngOnDestroy;
                    "function" != typeof e ||
                      r.has(t) ||
                      (e.apply(t), r.add(t));
                  }
                }
            })(this),
            this._destroyListeners.forEach(e => e());
        }
        onDestroy(e) {
          this._destroyListeners.push(e);
        }
      }
      const zr = Hn(nn),
        Br = Hn(on),
        qr = Hn(en),
        Wr = Hn(Tn),
        Gr = Hn(En),
        Zr = Hn(xt),
        Qr = Hn(Tt),
        Kr = Hn(De);
      function Yr(e, t, n, r, s, i, o, a) {
        const l = [];
        if (o)
          for (let c in o) {
            const [e, t] = o[c];
            l[e] = {
              flags: 8,
              name: c,
              nonMinifiedName: t,
              ns: null,
              securityContext: null,
              suffix: null
            };
          }
        const u = [];
        if (a)
          for (let c in a)
            u.push({ type: 1, propName: c, target: null, eventName: a[c] });
        return Xr(e, (t |= 16384), n, r, s, s, i, l, u);
      }
      function Jr(e, t, n, r, s) {
        return Xr(-1, e, t, 0, n, r, s);
      }
      function Xr(e, t, n, r, s, i, o, a, l) {
        const { matchedQueries: u, references: c, matchedQueryIds: h } = rr(n);
        l || (l = []), a || (a = []), (i = we(i));
        const d = sr(o, be(s));
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: e,
          flags: t,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: u,
          matchedQueryIds: h,
          references: c,
          ngContentIndex: -1,
          childCount: r,
          bindings: a,
          bindingFlags: gr(a),
          outputs: l,
          element: null,
          provider: { token: s, value: i, deps: d },
          text: null,
          query: null,
          ngContent: null
        };
      }
      function es(e, t) {
        return ss(e, t);
      }
      function ts(e, t) {
        let n = e;
        for (; n.parent && !er(n); ) n = n.parent;
        return is(n.parent, Jn(n), !0, t.provider.value, t.provider.deps);
      }
      function ns(e, t) {
        const n = is(
          e,
          t.parent,
          (32768 & t.flags) > 0,
          t.provider.value,
          t.provider.deps
        );
        if (t.outputs.length)
          for (let r = 0; r < t.outputs.length; r++) {
            const s = t.outputs[r],
              i = n[s.propName];
            if (!Bt(i))
              throw new Error(
                `@Output ${s.propName} not initialized in '${n.constructor.name}'.`
              );
            {
              const n = i.subscribe(rs(e, t.parent.nodeIndex, s.eventName));
              e.disposables[t.outputIndex + r] = n.unsubscribe.bind(n);
            }
          }
        return n;
      }
      function rs(e, t, n) {
        return r => Kn(e, t, n, r);
      }
      function ss(e, t) {
        const n = (8192 & t.flags) > 0,
          r = t.provider;
        switch (201347067 & t.flags) {
          case 512:
            return is(e, t.parent, n, r.value, r.deps);
          case 1024:
            return (function(e, t, n, r, s) {
              const i = s.length;
              switch (i) {
                case 0:
                  return r();
                case 1:
                  return r(as(e, t, n, s[0]));
                case 2:
                  return r(as(e, t, n, s[0]), as(e, t, n, s[1]));
                case 3:
                  return r(
                    as(e, t, n, s[0]),
                    as(e, t, n, s[1]),
                    as(e, t, n, s[2])
                  );
                default:
                  const o = Array(i);
                  for (let r = 0; r < i; r++) o[r] = as(e, t, n, s[r]);
                  return r(...o);
              }
            })(e, t.parent, n, r.value, r.deps);
          case 2048:
            return as(e, t.parent, n, r.deps[0]);
          case 256:
            return r.value;
        }
      }
      function is(e, t, n, r, s) {
        const i = s.length;
        switch (i) {
          case 0:
            return new r();
          case 1:
            return new r(as(e, t, n, s[0]));
          case 2:
            return new r(as(e, t, n, s[0]), as(e, t, n, s[1]));
          case 3:
            return new r(
              as(e, t, n, s[0]),
              as(e, t, n, s[1]),
              as(e, t, n, s[2])
            );
          default:
            const o = new Array(i);
            for (let r = 0; r < i; r++) o[r] = as(e, t, n, s[r]);
            return new r(...o);
        }
      }
      const os = {};
      function as(e, t, n, r, s = Tt.THROW_IF_NOT_FOUND) {
        if (8 & r.flags) return r.token;
        const i = e;
        2 & r.flags && (s = null);
        const o = r.tokenKey;
        o === Zr && (n = !(!t || !t.element.componentView)),
          t && 1 & r.flags && ((n = !1), (t = t.parent));
        let a = e;
        for (; a; ) {
          if (t)
            switch (o) {
              case zr:
                return Fr(ls(a, t, n));
              case Br:
                return ls(a, t, n).renderer;
              case qr:
                return new en(Mn(a, t.nodeIndex).renderElement);
              case Wr:
                return Mn(a, t.nodeIndex).viewContainer;
              case Gr:
                if (t.element.template) return Mn(a, t.nodeIndex).template;
                break;
              case Zr:
                return Rr(ls(a, t, n));
              case Qr:
              case Kr:
                return Vr(a, t);
              default:
                const e = (n
                  ? t.element.allProviders
                  : t.element.publicProviders)[o];
                if (e) {
                  let t = Vn(a, e.nodeIndex);
                  return (
                    t ||
                      ((t = { instance: ss(a, e) }),
                      (a.nodes[e.nodeIndex] = t)),
                    t.instance
                  );
                }
            }
          (n = er(a)), (t = Jn(a)), (a = a.parent), 4 & r.flags && (a = null);
        }
        const l = i.root.injector.get(r.token, os);
        return l !== os || s === os
          ? l
          : i.root.ngModule.injector.get(r.token, s);
      }
      function ls(e, t, n) {
        let r;
        if (n) r = Mn(e, t.nodeIndex).componentView;
        else for (r = e; r.parent && !er(r); ) r = r.parent;
        return r;
      }
      function us(e, t, n, r, s, i) {
        if (32768 & n.flags) {
          const t = Mn(e, n.parent.nodeIndex).componentView;
          2 & t.def.flags && (t.state |= 8);
        }
        if (((t.instance[n.bindings[r].name] = s), 524288 & n.flags)) {
          i = i || {};
          const t = Lt.unwrap(e.oldValues[n.bindingIndex + r]);
          i[n.bindings[r].nonMinifiedName] = new qt(t, s, 0 != (2 & e.state));
        }
        return (e.oldValues[n.bindingIndex + r] = s), i;
      }
      function cs(e, t) {
        if (!(e.def.nodeFlags & t)) return;
        const n = e.def.nodes;
        let r = 0;
        for (let s = 0; s < n.length; s++) {
          const i = n[s];
          let o = i.parent;
          for (
            !o && i.flags & t && ds(e, s, i.flags & t, r++),
              0 == (i.childFlags & t) && (s += i.childCount);
            o && 1 & o.flags && s === o.nodeIndex + o.childCount;

          )
            o.directChildFlags & t && (r = hs(e, o, t, r)), (o = o.parent);
        }
      }
      function hs(e, t, n, r) {
        for (let s = t.nodeIndex + 1; s <= t.nodeIndex + t.childCount; s++) {
          const t = e.def.nodes[s];
          t.flags & n && ds(e, s, t.flags & n, r++), (s += t.childCount);
        }
        return r;
      }
      function ds(e, t, n, r) {
        const s = Vn(e, t);
        if (!s) return;
        const i = s.instance;
        i &&
          (Fn.setCurrentNode(e, t),
          1048576 & n && Nn(e, 512, r) && i.ngAfterContentInit(),
          2097152 & n && i.ngAfterContentChecked(),
          4194304 & n && Nn(e, 768, r) && i.ngAfterViewInit(),
          8388608 & n && i.ngAfterViewChecked(),
          131072 & n && i.ngOnDestroy());
      }
      const ps = new Te("SCHEDULER_TOKEN", {
          providedIn: "root",
          factory: () => He
        }),
        fs = {},
        gs = (function() {
          var e = {
            LocaleId: 0,
            DayPeriodsFormat: 1,
            DayPeriodsStandalone: 2,
            DaysFormat: 3,
            DaysStandalone: 4,
            MonthsFormat: 5,
            MonthsStandalone: 6,
            Eras: 7,
            FirstDayOfWeek: 8,
            WeekendRange: 9,
            DateFormat: 10,
            TimeFormat: 11,
            DateTimeFormat: 12,
            NumberSymbols: 13,
            NumberFormats: 14,
            CurrencySymbol: 15,
            CurrencyName: 16,
            Currencies: 17,
            PluralCase: 18,
            ExtraData: 19
          };
          return (
            (e[e.LocaleId] = "LocaleId"),
            (e[e.DayPeriodsFormat] = "DayPeriodsFormat"),
            (e[e.DayPeriodsStandalone] = "DayPeriodsStandalone"),
            (e[e.DaysFormat] = "DaysFormat"),
            (e[e.DaysStandalone] = "DaysStandalone"),
            (e[e.MonthsFormat] = "MonthsFormat"),
            (e[e.MonthsStandalone] = "MonthsStandalone"),
            (e[e.Eras] = "Eras"),
            (e[e.FirstDayOfWeek] = "FirstDayOfWeek"),
            (e[e.WeekendRange] = "WeekendRange"),
            (e[e.DateFormat] = "DateFormat"),
            (e[e.TimeFormat] = "TimeFormat"),
            (e[e.DateTimeFormat] = "DateTimeFormat"),
            (e[e.NumberSymbols] = "NumberSymbols"),
            (e[e.NumberFormats] = "NumberFormats"),
            (e[e.CurrencySymbol] = "CurrencySymbol"),
            (e[e.CurrencyName] = "CurrencyName"),
            (e[e.Currencies] = "Currencies"),
            (e[e.PluralCase] = "PluralCase"),
            (e[e.ExtraData] = "ExtraData"),
            e
          );
        })(),
        ms = void 0;
      var ys = [
        "en",
        [["a", "p"], ["AM", "PM"], ms],
        [["AM", "PM"], ms, ms],
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
            "Saturday"
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        ],
        ms,
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
            "Dec"
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
            "December"
          ]
        ],
        ms,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"]
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", ms, "{1} 'at' {0}", ms],
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
          ":"
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "$",
        "US Dollar",
        {},
        function(e) {
          let t = Math.floor(Math.abs(e)),
            n = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === n ? 1 : 5;
        }
      ];
      function bs(e) {
        const t = e.toLowerCase().replace(/_/g, "-");
        let n = fs[t];
        if (n) return n;
        const r = t.split("-")[0];
        if (((n = fs[r]), n)) return n;
        if ("en" === r) return ys;
        throw new Error(`Missing locale data for the locale "${e}".`);
      }
      class vs extends T {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, n) {
          let r,
            s = e => null,
            i = () => null;
          e && "object" == typeof e
            ? ((r = this.__isAsync
                ? t => {
                    setTimeout(() => e.next(t));
                  }
                : t => {
                    e.next(t);
                  }),
              e.error &&
                (s = this.__isAsync
                  ? t => {
                      setTimeout(() => e.error(t));
                    }
                  : t => {
                      e.error(t);
                    }),
              e.complete &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => e.complete());
                    }
                  : () => {
                      e.complete();
                    }))
            : ((r = this.__isAsync
                ? t => {
                    setTimeout(() => e(t));
                  }
                : t => {
                    e(t);
                  }),
              t &&
                (s = this.__isAsync
                  ? e => {
                      setTimeout(() => t(e));
                    }
                  : e => {
                      t(e);
                    }),
              n &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(r, s, i);
          return e instanceof d && e.add(o), o;
        }
      }
      function _s() {
        return this._results[jt()]();
      }
      class ws {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new vs()),
            (this.length = 0);
          const e = jt(),
            t = ws.prototype;
          t[e] || (t[e] = _s);
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e) {
          (this._results = (function e(t, n) {
            void 0 === n && (n = t);
            for (let r = 0; r < t.length; r++) {
              let s = t[r];
              Array.isArray(s)
                ? (n === t && (n = t.slice(0, r)), e(s, n))
                : n !== t && n.push(s);
            }
            return n;
          })(e)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      const Cs = new Te("Application Initializer");
      class xs {
        constructor(e) {
          (this.appInits = e),
            (this.initialized = !1),
            (this.done = !1),
            (this.donePromise = new Promise((e, t) => {
              (this.resolve = e), (this.reject = t);
            }));
        }
        runInitializers() {
          if (this.initialized) return;
          const e = [],
            t = () => {
              (this.done = !0), this.resolve();
            };
          if (this.appInits)
            for (let n = 0; n < this.appInits.length; n++) {
              const t = this.appInits[n]();
              zt(t) && e.push(t);
            }
          Promise.all(e)
            .then(() => {
              t();
            })
            .catch(e => {
              this.reject(e);
            }),
            0 === e.length && t(),
            (this.initialized = !0);
        }
      }
      const Ss = new Te("AppId");
      function Es() {
        return `${ks()}${ks()}${ks()}`;
      }
      function ks() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Ts = new Te("Platform Initializer"),
        Ds = new Te("Platform ID"),
        As = new Te("appBootstrapListener");
      class Is {
        log(e) {
          console.log(e);
        }
        warn(e) {
          console.warn(e);
        }
      }
      const Os = new Te("LocaleId");
      function Rs() {
        throw new Error("Runtime compiler is not loaded");
      }
      const Ns = Rs,
        Ps = Rs,
        Ms = Rs,
        Vs = Rs;
      class js {
        constructor() {
          (this.compileModuleSync = Ns),
            (this.compileModuleAsync = Ps),
            (this.compileModuleAndAllComponentsSync = Ms),
            (this.compileModuleAndAllComponentsAsync = Vs);
        }
        clearCache() {}
        clearCacheFor(e) {}
        getModuleId(e) {}
      }
      class Us {}
      let Fs, Ls;
      function $s() {
        const e = ke.wtf;
        return !(!e || ((Fs = e.trace), !Fs) || ((Ls = Fs.events), 0));
      }
      const Hs = $s();
      function zs(e, t) {
        return null;
      }
      const Bs = Hs
          ? function(e, t = null) {
              return Ls.createScope(e, t);
            }
          : (e, t) => zs,
        qs = Hs
          ? function(e, t) {
              return Fs.leaveScope(e, t), t;
            }
          : (e, t) => t,
        Ws = (() => Promise.resolve(0))();
      function Gs(e) {
        "undefined" == typeof Zone
          ? Ws.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Zs {
        constructor({ enableLongStackTrace: e = !1 }) {
          if (
            ((this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new vs(!1)),
            (this.onMicrotaskEmpty = new vs(!1)),
            (this.onStable = new vs(!1)),
            (this.onError = new vs(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          var t;
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            ((t = this)._inner = t._inner.fork({
              name: "angular",
              properties: { isAngularZone: !0 },
              onInvokeTask: (e, n, r, s, i, o) => {
                try {
                  return Js(t), e.invokeTask(r, s, i, o);
                } finally {
                  Xs(t);
                }
              },
              onInvoke: (e, n, r, s, i, o, a) => {
                try {
                  return Js(t), e.invoke(r, s, i, o, a);
                } finally {
                  Xs(t);
                }
              },
              onHasTask: (e, n, r, s) => {
                e.hasTask(r, s),
                  n === r &&
                    ("microTask" == s.change
                      ? ((t.hasPendingMicrotasks = s.microTask), Ys(t))
                      : "macroTask" == s.change &&
                        (t.hasPendingMacrotasks = s.macroTask));
              },
              onHandleError: (e, n, r, s) => (
                e.handleError(r, s),
                t.runOutsideAngular(() => t.onError.emit(s)),
                !1
              )
            }));
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Zs.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Zs.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, t, n) {
          return this._inner.run(e, t, n);
        }
        runTask(e, t, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, e, Ks, Qs, Qs);
          try {
            return s.runTask(i, t, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(e, t, n) {
          return this._inner.runGuarded(e, t, n);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      function Qs() {}
      const Ks = {};
      function Ys(e) {
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
      function Js(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Xs(e) {
        e._nesting--, Ys(e);
      }
      class ei {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new vs()),
            (this.onMicrotaskEmpty = new vs()),
            (this.onStable = new vs()),
            (this.onError = new vs());
        }
        run(e) {
          return e();
        }
        runGuarded(e) {
          return e();
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e) {
          return e();
        }
      }
      class ti {
        constructor(e) {
          (this._ngZone = e),
            (this._pendingCount = 0),
            (this._isZoneStable = !0),
            (this._didWork = !1),
            (this._callbacks = []),
            (this.taskTrackingZone = null),
            this._watchAngularEvents(),
            e.run(() => {
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
            }
          }),
            this._ngZone.runOutsideAngular(() => {
              this._ngZone.onStable.subscribe({
                next: () => {
                  Zs.assertNotInAngularZone(),
                    Gs(() => {
                      (this._isZoneStable = !0), this._runCallbacksIfReady();
                    });
                }
              });
            });
        }
        increasePendingRequestCount() {
          return (
            (this._pendingCount += 1), (this._didWork = !0), this._pendingCount
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
            Gs(() => {
              for (; 0 !== this._callbacks.length; ) {
                let e = this._callbacks.pop();
                clearTimeout(e.timeoutId), e.doneCb(this._didWork);
              }
              this._didWork = !1;
            });
          else {
            let e = this.getPendingTasks();
            (this._callbacks = this._callbacks.filter(
              t =>
                !t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId), !1)
            )),
              (this._didWork = !0);
          }
        }
        getPendingTasks() {
          return this.taskTrackingZone
            ? this.taskTrackingZone.macroTasks.map(e => ({
                source: e.source,
                creationLocation: e.creationLocation,
                data: e.data
              }))
            : [];
        }
        addCallback(e, t, n) {
          let r = -1;
          t &&
            t > 0 &&
            (r = setTimeout(() => {
              (this._callbacks = this._callbacks.filter(
                e => e.timeoutId !== r
              )),
                e(this._didWork, this.getPendingTasks());
            }, t)),
            this._callbacks.push({ doneCb: e, timeoutId: r, updateCb: n });
        }
        whenStable(e, t, n) {
          if (n && !this.taskTrackingZone)
            throw new Error(
              'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
            );
          this.addCallback(e, t, n), this._runCallbacksIfReady();
        }
        getPendingRequestCount() {
          return this._pendingCount;
        }
        findProviders(e, t, n) {
          return [];
        }
      }
      class ni {
        constructor() {
          (this._applications = new Map()), ii.addToWindow(this);
        }
        registerApplication(e, t) {
          this._applications.set(e, t);
        }
        unregisterApplication(e) {
          this._applications.delete(e);
        }
        unregisterAllApplications() {
          this._applications.clear();
        }
        getTestability(e) {
          return this._applications.get(e) || null;
        }
        getAllTestabilities() {
          return Array.from(this._applications.values());
        }
        getAllRootElements() {
          return Array.from(this._applications.keys());
        }
        findTestabilityInTree(e, t = !0) {
          return ii.findTestabilityInTree(this, e, t);
        }
      }
      class ri {
        addToWindow(e) {}
        findTestabilityInTree(e, t, n) {
          return null;
        }
      }
      let si,
        ii = new ri();
      const oi = new Te("AllowMultipleToken");
      class ai {
        constructor(e, t) {
          (this.name = e), (this.token = t);
        }
      }
      function li(e, t, n = []) {
        const r = `Platform: ${t}`,
          s = new Te(r);
        return (t = []) => {
          let i = ui();
          if (!i || i.injector.get(oi, !1))
            if (e) e(n.concat(t).concat({ provide: s, useValue: !0 }));
            else {
              const e = n.concat(t).concat({ provide: s, useValue: !0 });
              !(function(e) {
                if (si && !si.destroyed && !si.injector.get(oi, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                si = e.get(ci);
                const t = e.get(Ts, null);
                t && t.forEach(e => e());
              })(Tt.create({ providers: e, name: r }));
            }
          return (function(e) {
            const t = ui();
            if (!t) throw new Error("No platform exists!");
            if (!t.injector.get(e, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return t;
          })(s);
        };
      }
      function ui() {
        return si && !si.destroyed ? si : null;
      }
      class ci {
        constructor(e) {
          (this._injector = e),
            (this._modules = []),
            (this._destroyListeners = []),
            (this._destroyed = !1);
        }
        bootstrapModuleFactory(e, t) {
          const n = (function(e) {
              let t;
              return (
                (t =
                  "noop" === e
                    ? new ei()
                    : ("zone.js" === e ? void 0 : e) ||
                      new Zs({ enableLongStackTrace: Qe() })),
                t
              );
            })(t ? t.ngZone : void 0),
            r = [{ provide: Zs, useValue: n }];
          return n.run(() => {
            const t = Tt.create({
                providers: r,
                parent: this.injector,
                name: e.moduleType.name
              }),
              s = e.create(t),
              i = s.injector.get(We, null);
            if (!i)
              throw new Error(
                "No ErrorHandler. Is platform module (BrowserModule) included?"
              );
            return (
              s.onDestroy(() => pi(this._modules, s)),
              n.runOutsideAngular(() =>
                n.onError.subscribe({
                  next: e => {
                    i.handleError(e);
                  }
                })
              ),
              (function(e, t, n) {
                try {
                  const r = n();
                  return zt(r)
                    ? r.catch(n => {
                        throw (t.runOutsideAngular(() => e.handleError(n)), n);
                      })
                    : r;
                } catch (r) {
                  throw (t.runOutsideAngular(() => e.handleError(r)), r);
                }
              })(i, n, () => {
                const e = s.injector.get(xs);
                return (
                  e.runInitializers(),
                  e.donePromise.then(() => (this._moduleDoBootstrap(s), s))
                );
              })
            );
          });
        }
        bootstrapModule(e, t = []) {
          const n = hi({}, t);
          return (function(e, t, n) {
            return e
              .get(Us)
              .createCompiler([t])
              .compileModuleAsync(n);
          })(this.injector, n, e).then(e => this.bootstrapModuleFactory(e, n));
        }
        _moduleDoBootstrap(e) {
          const t = e.injector.get(di);
          if (e._bootstrapComponents.length > 0)
            e._bootstrapComponents.forEach(e => t.bootstrap(e));
          else {
            if (!e.instance.ngDoBootstrap)
              throw new Error(
                `The module ${be(
                  e.instance.constructor
                )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                  "Please define one of these."
              );
            e.instance.ngDoBootstrap(t);
          }
          this._modules.push(e);
        }
        onDestroy(e) {
          this._destroyListeners.push(e);
        }
        get injector() {
          return this._injector;
        }
        destroy() {
          if (this._destroyed)
            throw new Error("The platform has already been destroyed!");
          this._modules.slice().forEach(e => e.destroy()),
            this._destroyListeners.forEach(e => e()),
            (this._destroyed = !0);
        }
        get destroyed() {
          return this._destroyed;
        }
      }
      function hi(e, t) {
        return Array.isArray(t) ? t.reduce(hi, e) : Object.assign({}, e, t);
      }
      let di = (() => {
        class e {
          constructor(e, t, n, r, s, i) {
            (this._zone = e),
              (this._console = t),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = Qe()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                }
              });
            const o = new w(e => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    e.next(this._stable), e.complete();
                  });
              }),
              a = new w(e => {
                let t;
                this._zone.runOutsideAngular(() => {
                  t = this._zone.onStable.subscribe(() => {
                    Zs.assertNotInAngularZone(),
                      Gs(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), e.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Zs.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        e.next(!1);
                      }));
                });
                return () => {
                  t.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = J(
              o,
              a.pipe(e => X()(ie(ae)(e)))
            );
          }
          bootstrap(e, t) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              e instanceof Wt
                ? e
                : this._componentFactoryResolver.resolveComponentFactory(e)),
              this.componentTypes.push(n.componentType);
            const r = n instanceof Jt ? null : this._injector.get(je),
              s = n.create(Tt.NULL, [], t || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const i = s.injector.get(ti, null);
            return (
              i &&
                s.injector
                  .get(ni)
                  .registerApplication(s.location.nativeElement, i),
              this._loadComponent(s),
              Qe() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            const t = e._tickScope();
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
              if (this._enforceNoNewChanges)
                for (let e of this._views) e.checkNoChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              (this._runningTick = !1), qs(t);
            }
          }
          attachView(e) {
            const t = e;
            this._views.push(t), t.attachToAppRef(this);
          }
          detachView(e) {
            const t = e;
            pi(this._views, t), t.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(As, [])
                .concat(this._bootstrapListeners)
                .forEach(t => t(e));
          }
          _unloadComponent(e) {
            this.detachView(e.hostView), pi(this.components, e);
          }
          ngOnDestroy() {
            this._views.slice().forEach(e => e.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (e._tickScope = Bs("ApplicationRef#tick()")), e;
      })();
      function pi(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      class fi {}
      class gi {}
      const mi = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      class yi {
        constructor(e, t) {
          (this._compiler = e), (this._config = t || mi);
        }
        load(e) {
          return this._compiler instanceof js
            ? this.loadFactory(e)
            : this.loadAndCompile(e);
        }
        loadAndCompile(e) {
          let [t, r] = e.split("#");
          return (
            void 0 === r && (r = "default"),
            n("zn8P")(t)
              .then(e => e[r])
              .then(e => bi(e, t, r))
              .then(e => this._compiler.compileModuleAsync(e))
          );
        }
        loadFactory(e) {
          let [t, r] = e.split("#"),
            s = "NgFactory";
          return (
            void 0 === r && ((r = "default"), (s = "")),
            n("zn8P")(
              this._config.factoryPathPrefix +
                t +
                this._config.factoryPathSuffix
            )
              .then(e => e[r + s])
              .then(e => bi(e, t, r))
          );
        }
      }
      function bi(e, t, n) {
        if (!e) throw new Error(`Cannot find '${n}' in '${t}'`);
        return e;
      }
      class vi {
        constructor(e, t) {
          (this.name = e), (this.callback = t);
        }
      }
      class _i {
        constructor(e, t, n) {
          (this.listeners = []),
            (this.parent = null),
            (this._debugContext = n),
            (this.nativeNode = e),
            t && t instanceof wi && t.addChild(this);
        }
        get injector() {
          return this._debugContext.injector;
        }
        get componentInstance() {
          return this._debugContext.component;
        }
        get context() {
          return this._debugContext.context;
        }
        get references() {
          return this._debugContext.references;
        }
        get providerTokens() {
          return this._debugContext.providerTokens;
        }
      }
      class wi extends _i {
        constructor(e, t, n) {
          super(e, t, n),
            (this.properties = {}),
            (this.attributes = {}),
            (this.classes = {}),
            (this.styles = {}),
            (this.childNodes = []),
            (this.nativeElement = e);
        }
        addChild(e) {
          e && (this.childNodes.push(e), (e.parent = this));
        }
        removeChild(e) {
          const t = this.childNodes.indexOf(e);
          -1 !== t && ((e.parent = null), this.childNodes.splice(t, 1));
        }
        insertChildrenAfter(e, t) {
          const n = this.childNodes.indexOf(e);
          -1 !== n &&
            (this.childNodes.splice(n + 1, 0, ...t),
            t.forEach(t => {
              t.parent && t.parent.removeChild(t), (e.parent = this);
            }));
        }
        insertBefore(e, t) {
          const n = this.childNodes.indexOf(e);
          -1 === n
            ? this.addChild(t)
            : (t.parent && t.parent.removeChild(t),
              (t.parent = this),
              this.childNodes.splice(n, 0, t));
        }
        query(e) {
          return this.queryAll(e)[0] || null;
        }
        queryAll(e) {
          const t = [];
          return (
            (function e(t, n, r) {
              t.childNodes.forEach(t => {
                t instanceof wi && (n(t) && r.push(t), e(t, n, r));
              });
            })(this, e, t),
            t
          );
        }
        queryAllNodes(e) {
          const t = [];
          return (
            (function e(t, n, r) {
              t instanceof wi &&
                t.childNodes.forEach(t => {
                  n(t) && r.push(t), t instanceof wi && e(t, n, r);
                });
            })(this, e, t),
            t
          );
        }
        get children() {
          return this.childNodes.filter(e => e instanceof wi);
        }
        triggerEventHandler(e, t) {
          this.listeners.forEach(n => {
            n.name == e && n.callback(t);
          });
        }
      }
      const Ci = new Map(),
        xi = function(e) {
          return Ci.get(e) || null;
        };
      function Si(e) {
        Ci.set(e.nativeNode, e);
      }
      const Ei = li(null, "core", [
        { provide: Ds, useValue: "unknown" },
        { provide: ci, deps: [Tt] },
        { provide: ni, deps: [] },
        { provide: Is, deps: [] }
      ]);
      function ki() {
        return xn;
      }
      function Ti() {
        return Sn;
      }
      function Di(e) {
        return e || "en-US";
      }
      function Ai(e) {
        let t = [];
        return (
          e.onStable.subscribe(() => {
            for (; t.length; ) t.pop()();
          }),
          function(e) {
            t.push(e);
          }
        );
      }
      class Ii {
        constructor(e) {}
      }
      function Oi(e, t, n, r, s, i) {
        e |= 1;
        const { matchedQueries: o, references: a, matchedQueryIds: l } = rr(t);
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          flags: e,
          checkIndex: -1,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: o,
          matchedQueryIds: l,
          references: a,
          ngContentIndex: n,
          childCount: r,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: {
            ns: null,
            name: null,
            attrs: null,
            template: i ? ar(i) : null,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: s || Ln
          },
          provider: null,
          text: null,
          query: null,
          ngContent: null
        };
      }
      function Ri(e, t, n, r, s, i, o = [], a, l, u, c, h) {
        u || (u = Ln);
        const { matchedQueries: d, references: p, matchedQueryIds: f } = rr(n);
        let g = null,
          m = null;
        i && ([g, m] = fr(i)), (a = a || []);
        const y = new Array(a.length);
        for (let _ = 0; _ < a.length; _++) {
          const [e, t, n] = a[_],
            [r, s] = fr(t);
          let i = void 0,
            o = void 0;
          switch (15 & e) {
            case 4:
              o = n;
              break;
            case 1:
            case 8:
              i = n;
          }
          y[_] = {
            flags: e,
            ns: r,
            name: s,
            nonMinifiedName: s,
            securityContext: i,
            suffix: o
          };
        }
        l = l || [];
        const b = new Array(l.length);
        for (let _ = 0; _ < l.length; _++) {
          const [e, t] = l[_];
          b[_] = { type: 0, target: e, eventName: t, propName: null };
        }
        const v = (o = o || []).map(([e, t]) => {
          const [n, r] = fr(e);
          return [n, r, t];
        });
        return (
          (h = (function(e) {
            if (e && "$$undefined" === e.id) {
              const t =
                (null != e.encapsulation && e.encapsulation !== $e.None) ||
                e.styles.length ||
                Object.keys(e.data).length;
              e.id = t ? `c${Bn++}` : "$$empty";
            }
            return e && "$$empty" === e.id && (e = null), e || null;
          })(h)),
          c && (t |= 33554432),
          {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: e,
            flags: (t |= 1),
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: d,
            matchedQueryIds: f,
            references: p,
            ngContentIndex: r,
            childCount: s,
            bindings: y,
            bindingFlags: gr(y),
            outputs: b,
            element: {
              ns: g,
              name: m,
              attrs: v,
              template: null,
              componentProvider: null,
              componentView: c || null,
              componentRendererType: h,
              publicProviders: null,
              allProviders: null,
              handleEvent: u || Ln
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null
          }
        );
      }
      function Ni(e, t, n) {
        const r = n.element,
          s = e.root.selectorOrNode,
          i = e.renderer;
        let o;
        if (e.parent || !s) {
          o = r.name ? i.createElement(r.name, r.ns) : i.createComment("");
          const s = ir(e, t, n);
          s && i.appendChild(s, o);
        } else
          o = i.selectRootElement(
            s,
            !!r.componentRendererType &&
              r.componentRendererType.encapsulation === $e.ShadowDom
          );
        if (r.attrs)
          for (let a = 0; a < r.attrs.length; a++) {
            const [e, t, n] = r.attrs[a];
            i.setAttribute(o, t, n, e);
          }
        return o;
      }
      function Pi(e, t, n, r) {
        for (let o = 0; o < n.outputs.length; o++) {
          const a = n.outputs[o],
            l = Mi(
              e,
              n.nodeIndex,
              ((i = a.eventName), (s = a.target) ? `${s}:${i}` : i)
            );
          let u = a.target,
            c = e;
          "component" === a.target && ((u = null), (c = t));
          const h = c.renderer.listen(u || r, a.eventName, l);
          e.disposables[n.outputIndex + o] = h;
        }
        var s, i;
      }
      function Mi(e, t, n) {
        return r => Kn(e, t, n, r);
      }
      function Vi(e, t, n, r) {
        if (!Wn(e, t, n, r)) return !1;
        const s = t.bindings[n],
          i = Mn(e, t.nodeIndex),
          o = i.renderElement,
          a = s.name;
        switch (15 & s.flags) {
          case 1:
            !(function(e, t, n, r, s, i) {
              const o = t.securityContext;
              let a = o ? e.root.sanitizer.sanitize(o, i) : i;
              a = null != a ? a.toString() : null;
              const l = e.renderer;
              null != i
                ? l.setAttribute(n, s, a, r)
                : l.removeAttribute(n, s, r);
            })(e, s, o, s.ns, a, r);
            break;
          case 2:
            !(function(e, t, n, r) {
              const s = e.renderer;
              r ? s.addClass(t, n) : s.removeClass(t, n);
            })(e, o, a, r);
            break;
          case 4:
            !(function(e, t, n, r, s) {
              let i = e.root.sanitizer.sanitize(yt.STYLE, s);
              if (null != i) {
                i = i.toString();
                const e = t.suffix;
                null != e && (i += e);
              } else i = null;
              const o = e.renderer;
              null != i ? o.setStyle(n, r, i) : o.removeStyle(n, r);
            })(e, s, o, a, r);
            break;
          case 8:
            !(function(e, t, n, r, s) {
              const i = t.securityContext;
              let o = i ? e.root.sanitizer.sanitize(i, s) : s;
              e.renderer.setProperty(n, r, o);
            })(
              33554432 & t.flags && 32 & s.flags ? i.componentView : e,
              s,
              o,
              a,
              r
            );
        }
        return !0;
      }
      function ji(e, t, n) {
        let r = [];
        for (let s in n) r.push({ propName: s, bindingType: n[s] });
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: -1,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          ngContentIndex: -1,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          childCount: 0,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: { id: t, filterId: nr(t), bindings: r },
          ngContent: null
        };
      }
      function Ui(e) {
        const t = e.def.nodeMatchedQueries;
        for (; e.parent && tr(e); ) {
          let n = e.parentNodeDef;
          e = e.parent;
          const r = n.nodeIndex + n.childCount;
          for (let s = 0; s <= r; s++) {
            const r = e.def.nodes[s];
            67108864 & r.flags &&
              536870912 & r.flags &&
              (r.query.filterId & t) === r.query.filterId &&
              Un(e, s).setDirty(),
              (!(1 & r.flags && s + r.childCount < n.nodeIndex) &&
                67108864 & r.childFlags &&
                536870912 & r.childFlags) ||
                (s += r.childCount);
          }
        }
        if (134217728 & e.def.nodeFlags)
          for (let n = 0; n < e.def.nodes.length; n++) {
            const t = e.def.nodes[n];
            134217728 & t.flags && 536870912 & t.flags && Un(e, n).setDirty(),
              (n += t.childCount);
          }
      }
      function Fi(e, t) {
        const n = Un(e, t.nodeIndex);
        if (!n.dirty) return;
        let r,
          s = void 0;
        if (67108864 & t.flags) {
          const n = t.parent.parent;
          (s = Li(e, n.nodeIndex, n.nodeIndex + n.childCount, t.query, [])),
            (r = Vn(e, t.parent.nodeIndex).instance);
        } else
          134217728 & t.flags &&
            ((s = Li(e, 0, e.def.nodes.length - 1, t.query, [])),
            (r = e.component));
        n.reset(s);
        const i = t.query.bindings;
        let o = !1;
        for (let a = 0; a < i.length; a++) {
          const e = i[a];
          let t;
          switch (e.bindingType) {
            case 0:
              t = n.first;
              break;
            case 1:
              (t = n), (o = !0);
          }
          r[e.propName] = t;
        }
        o && n.notifyOnChanges();
      }
      function Li(e, t, n, r, s) {
        for (let i = t; i <= n; i++) {
          const t = e.def.nodes[i],
            n = t.matchedQueries[r.id];
          if (
            (null != n && s.push($i(e, t, n)),
            1 & t.flags &&
              t.element.template &&
              (t.element.template.nodeMatchedQueries & r.filterId) ===
                r.filterId)
          ) {
            const n = Mn(e, i);
            if (
              ((t.childMatchedQueries & r.filterId) === r.filterId &&
                (Li(e, i + 1, i + t.childCount, r, s), (i += t.childCount)),
              16777216 & t.flags)
            ) {
              const e = n.viewContainer._embeddedViews;
              for (let t = 0; t < e.length; t++) {
                const i = e[t],
                  o = Yn(i);
                o && o === n && Li(i, 0, i.def.nodes.length - 1, r, s);
              }
            }
            const o = n.template._projectedViews;
            if (o)
              for (let e = 0; e < o.length; e++) {
                const t = o[e];
                Li(t, 0, t.def.nodes.length - 1, r, s);
              }
          }
          (t.childMatchedQueries & r.filterId) !== r.filterId &&
            (i += t.childCount);
        }
        return s;
      }
      function $i(e, t, n) {
        if (null != n)
          switch (n) {
            case 1:
              return Mn(e, t.nodeIndex).renderElement;
            case 0:
              return new en(Mn(e, t.nodeIndex).renderElement);
            case 2:
              return Mn(e, t.nodeIndex).template;
            case 3:
              return Mn(e, t.nodeIndex).viewContainer;
            case 4:
              return Vn(e, t.nodeIndex).instance;
          }
      }
      function Hi(e, t) {
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: -1,
          flags: 8,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: e,
          childCount: 0,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: null,
          ngContent: { index: t }
        };
      }
      function zi(e, t, n) {
        const r = ir(e, t, n);
        r && cr(e, n.ngContent.index, 1, r, null, void 0);
      }
      function Bi(e, t) {
        const n = Object.keys(t),
          r = n.length,
          s = new Array(r);
        for (let i = 0; i < r; i++) {
          const e = n[i];
          s[t[e]] = e;
        }
        return qi(64, e, s);
      }
      function qi(e, t, n) {
        const r = new Array(n.length);
        for (let s = 0; s < n.length; s++) {
          const e = n[s];
          r[s] = {
            flags: 8,
            name: e,
            ns: null,
            nonMinifiedName: e,
            securityContext: null,
            suffix: null
          };
        }
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: t,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: -1,
          childCount: 0,
          bindings: r,
          bindingFlags: gr(r),
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: null,
          ngContent: null
        };
      }
      function Wi(e, t, n) {
        const r = new Array(n.length - 1);
        for (let s = 1; s < n.length; s++)
          r[s - 1] = {
            flags: 8,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: n[s]
          };
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: e,
          flags: 2,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: t,
          childCount: 0,
          bindings: r,
          bindingFlags: 8,
          outputs: [],
          element: null,
          provider: null,
          text: { prefix: n[0] },
          query: null,
          ngContent: null
        };
      }
      function Gi(e, t, n) {
        let r;
        const s = e.renderer;
        r = s.createText(n.text.prefix);
        const i = ir(e, t, n);
        return i && s.appendChild(i, r), { renderText: r };
      }
      function Zi(e, t) {
        return (null != e ? e.toString() : "") + t.suffix;
      }
      function Qi(e, t, n, r) {
        let s = 0,
          i = 0,
          o = 0,
          a = 0,
          l = 0,
          u = null,
          c = null,
          h = !1,
          d = !1,
          p = null;
        for (let f = 0; f < t.length; f++) {
          const e = t[f];
          if (
            ((e.nodeIndex = f),
            (e.parent = u),
            (e.bindingIndex = s),
            (e.outputIndex = i),
            (e.renderParent = c),
            (o |= e.flags),
            (l |= e.matchedQueryIds),
            e.element)
          ) {
            const t = e.element;
            (t.publicProviders = u
              ? u.element.publicProviders
              : Object.create(null)),
              (t.allProviders = t.publicProviders),
              (h = !1),
              (d = !1),
              e.element.template &&
                (l |= e.element.template.nodeMatchedQueries);
          }
          if (
            (Yi(u, e, t.length),
            (s += e.bindings.length),
            (i += e.outputs.length),
            !c && 3 & e.flags && (p = e),
            20224 & e.flags)
          ) {
            h ||
              ((h = !0),
              (u.element.publicProviders = Object.create(
                u.element.publicProviders
              )),
              (u.element.allProviders = u.element.publicProviders));
            const t = 0 != (32768 & e.flags);
            0 == (8192 & e.flags) || t
              ? (u.element.publicProviders[Hn(e.provider.token)] = e)
              : (d ||
                  ((d = !0),
                  (u.element.allProviders = Object.create(
                    u.element.publicProviders
                  ))),
                (u.element.allProviders[Hn(e.provider.token)] = e)),
              t && (u.element.componentProvider = e);
          }
          if (
            (u
              ? ((u.childFlags |= e.flags),
                (u.directChildFlags |= e.flags),
                (u.childMatchedQueries |= e.matchedQueryIds),
                e.element &&
                  e.element.template &&
                  (u.childMatchedQueries |=
                    e.element.template.nodeMatchedQueries))
              : (a |= e.flags),
            e.childCount > 0)
          )
            (u = e), Ki(e) || (c = e);
          else
            for (; u && f === u.nodeIndex + u.childCount; ) {
              const e = u.parent;
              e &&
                ((e.childFlags |= u.childFlags),
                (e.childMatchedQueries |= u.childMatchedQueries)),
                (u = e),
                (c = u && Ki(u) ? u.renderParent : u);
            }
        }
        return {
          factory: null,
          nodeFlags: o,
          rootNodeFlags: a,
          nodeMatchedQueries: l,
          flags: e,
          nodes: t,
          updateDirectives: n || Ln,
          updateRenderer: r || Ln,
          handleEvent: (e, n, r, s) => t[n].element.handleEvent(e, r, s),
          bindingCount: s,
          outputCount: i,
          lastRenderRootNode: p
        };
      }
      function Ki(e) {
        return 0 != (1 & e.flags) && null === e.element.name;
      }
      function Yi(e, t, n) {
        const r = t.element && t.element.template;
        if (r) {
          if (!r.lastRenderRootNode)
            throw new Error(
              "Illegal State: Embedded templates without nodes are not allowed!"
            );
          if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
            throw new Error(
              `Illegal State: Last root node of a template can't have embedded views, at index ${t.nodeIndex}!`
            );
        }
        if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
          throw new Error(
            `Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${t.nodeIndex}!`
          );
        if (t.query) {
          if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
            throw new Error(
              `Illegal State: Content Query nodes need to be children of directives, at index ${t.nodeIndex}!`
            );
          if (134217728 & t.flags && e)
            throw new Error(
              `Illegal State: View Query nodes have to be top level nodes, at index ${t.nodeIndex}!`
            );
        }
        if (t.childCount) {
          const r = e ? e.nodeIndex + e.childCount : n - 1;
          if (t.nodeIndex <= r && t.nodeIndex + t.childCount > r)
            throw new Error(
              `Illegal State: childCount of node leads outside of parent, at index ${t.nodeIndex}!`
            );
        }
      }
      function Ji(e, t, n, r) {
        const s = to(e.root, e.renderer, e, t, n);
        return no(s, e.component, r), ro(s), s;
      }
      function Xi(e, t, n) {
        const r = to(e, e.renderer, null, null, t);
        return no(r, n, n), ro(r), r;
      }
      function eo(e, t, n, r) {
        const s = t.element.componentRendererType;
        let i;
        return (
          (i = s
            ? e.root.rendererFactory.createRenderer(r, s)
            : e.root.renderer),
          to(e.root, i, e, t.element.componentProvider, n)
        );
      }
      function to(e, t, n, r, s) {
        const i = new Array(s.nodes.length),
          o = s.outputCount ? new Array(s.outputCount) : null;
        return {
          def: s,
          parent: n,
          viewContainerParent: null,
          parentNodeDef: r,
          context: null,
          component: null,
          nodes: i,
          state: 13,
          root: e,
          renderer: t,
          oldValues: new Array(s.bindingCount),
          disposables: o,
          initIndex: -1
        };
      }
      function no(e, t, n) {
        (e.component = t), (e.context = n);
      }
      function ro(e) {
        let t;
        er(e) &&
          (t = Mn(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
        const n = e.def,
          r = e.nodes;
        for (let s = 0; s < n.nodes.length; s++) {
          const i = n.nodes[s];
          let o;
          switch ((Fn.setCurrentNode(e, s), 201347067 & i.flags)) {
            case 1:
              const n = Ni(e, t, i);
              let a = void 0;
              if (33554432 & i.flags) {
                const t = ar(i.element.componentView);
                a = Fn.createComponentView(e, i, t, n);
              }
              Pi(e, a, i, n),
                (o = {
                  renderElement: n,
                  componentView: a,
                  viewContainer: null,
                  template: i.element.template ? Pr(e, i) : void 0
                }),
                16777216 & i.flags && (o.viewContainer = Ir(e, i, o));
              break;
            case 2:
              o = Gi(e, t, i);
              break;
            case 512:
            case 1024:
            case 2048:
            case 256:
              (o = r[s]), o || 4096 & i.flags || (o = { instance: es(e, i) });
              break;
            case 16:
              o = { instance: ts(e, i) };
              break;
            case 16384:
              (o = r[s]),
                o || (o = { instance: ns(e, i) }),
                32768 & i.flags &&
                  no(
                    Mn(e, i.parent.nodeIndex).componentView,
                    o.instance,
                    o.instance
                  );
              break;
            case 32:
            case 64:
            case 128:
              o = { value: void 0 };
              break;
            case 67108864:
            case 134217728:
              o = new ws();
              break;
            case 8:
              zi(e, t, i), (o = void 0);
          }
          r[s] = o;
        }
        po(e, ho.CreateViewNodes), yo(e, 201326592, 268435456, 0);
      }
      function so(e) {
        ao(e),
          Fn.updateDirectives(e, 1),
          fo(e, ho.CheckNoChanges),
          Fn.updateRenderer(e, 1),
          po(e, ho.CheckNoChanges),
          (e.state &= -97);
      }
      function io(e) {
        1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
          Rn(e, 0, 256),
          ao(e),
          Fn.updateDirectives(e, 0),
          fo(e, ho.CheckAndUpdate),
          yo(e, 67108864, 536870912, 0);
        let t = Rn(e, 256, 512);
        cs(e, 2097152 | (t ? 1048576 : 0)),
          Fn.updateRenderer(e, 0),
          po(e, ho.CheckAndUpdate),
          yo(e, 134217728, 536870912, 0),
          (t = Rn(e, 512, 768)),
          cs(e, 8388608 | (t ? 4194304 : 0)),
          2 & e.def.flags && (e.state &= -9),
          (e.state &= -97),
          Rn(e, 768, 1024);
      }
      function oo(e, t, n, r, s, i, o, a, l, u, c, h, d) {
        return 0 === n
          ? (function(e, t, n, r, s, i, o, a, l, u, c, h) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function(e, t, n, r, s, i, o, a, l, u, c, h) {
                    const d = t.bindings.length;
                    let p = !1;
                    return (
                      d > 0 && Vi(e, t, 0, n) && (p = !0),
                      d > 1 && Vi(e, t, 1, r) && (p = !0),
                      d > 2 && Vi(e, t, 2, s) && (p = !0),
                      d > 3 && Vi(e, t, 3, i) && (p = !0),
                      d > 4 && Vi(e, t, 4, o) && (p = !0),
                      d > 5 && Vi(e, t, 5, a) && (p = !0),
                      d > 6 && Vi(e, t, 6, l) && (p = !0),
                      d > 7 && Vi(e, t, 7, u) && (p = !0),
                      d > 8 && Vi(e, t, 8, c) && (p = !0),
                      d > 9 && Vi(e, t, 9, h) && (p = !0),
                      p
                    );
                  })(e, t, n, r, s, i, o, a, l, u, c, h);
                case 2:
                  return (function(e, t, n, r, s, i, o, a, l, u, c, h) {
                    let d = !1;
                    const p = t.bindings,
                      f = p.length;
                    if (
                      (f > 0 && Wn(e, t, 0, n) && (d = !0),
                      f > 1 && Wn(e, t, 1, r) && (d = !0),
                      f > 2 && Wn(e, t, 2, s) && (d = !0),
                      f > 3 && Wn(e, t, 3, i) && (d = !0),
                      f > 4 && Wn(e, t, 4, o) && (d = !0),
                      f > 5 && Wn(e, t, 5, a) && (d = !0),
                      f > 6 && Wn(e, t, 6, l) && (d = !0),
                      f > 7 && Wn(e, t, 7, u) && (d = !0),
                      f > 8 && Wn(e, t, 8, c) && (d = !0),
                      f > 9 && Wn(e, t, 9, h) && (d = !0),
                      d)
                    ) {
                      let d = t.text.prefix;
                      f > 0 && (d += Zi(n, p[0])),
                        f > 1 && (d += Zi(r, p[1])),
                        f > 2 && (d += Zi(s, p[2])),
                        f > 3 && (d += Zi(i, p[3])),
                        f > 4 && (d += Zi(o, p[4])),
                        f > 5 && (d += Zi(a, p[5])),
                        f > 6 && (d += Zi(l, p[6])),
                        f > 7 && (d += Zi(u, p[7])),
                        f > 8 && (d += Zi(c, p[8])),
                        f > 9 && (d += Zi(h, p[9]));
                      const g = Pn(e, t.nodeIndex).renderText;
                      e.renderer.setValue(g, d);
                    }
                    return d;
                  })(e, t, n, r, s, i, o, a, l, u, c, h);
                case 16384:
                  return (function(e, t, n, r, s, i, o, a, l, u, c, h) {
                    const d = Vn(e, t.nodeIndex),
                      p = d.instance;
                    let f = !1,
                      g = void 0;
                    const m = t.bindings.length;
                    return (
                      m > 0 &&
                        qn(e, t, 0, n) &&
                        ((f = !0), (g = us(e, d, t, 0, n, g))),
                      m > 1 &&
                        qn(e, t, 1, r) &&
                        ((f = !0), (g = us(e, d, t, 1, r, g))),
                      m > 2 &&
                        qn(e, t, 2, s) &&
                        ((f = !0), (g = us(e, d, t, 2, s, g))),
                      m > 3 &&
                        qn(e, t, 3, i) &&
                        ((f = !0), (g = us(e, d, t, 3, i, g))),
                      m > 4 &&
                        qn(e, t, 4, o) &&
                        ((f = !0), (g = us(e, d, t, 4, o, g))),
                      m > 5 &&
                        qn(e, t, 5, a) &&
                        ((f = !0), (g = us(e, d, t, 5, a, g))),
                      m > 6 &&
                        qn(e, t, 6, l) &&
                        ((f = !0), (g = us(e, d, t, 6, l, g))),
                      m > 7 &&
                        qn(e, t, 7, u) &&
                        ((f = !0), (g = us(e, d, t, 7, u, g))),
                      m > 8 &&
                        qn(e, t, 8, c) &&
                        ((f = !0), (g = us(e, d, t, 8, c, g))),
                      m > 9 &&
                        qn(e, t, 9, h) &&
                        ((f = !0), (g = us(e, d, t, 9, h, g))),
                      g && p.ngOnChanges(g),
                      65536 & t.flags &&
                        Nn(e, 256, t.nodeIndex) &&
                        p.ngOnInit(),
                      262144 & t.flags && p.ngDoCheck(),
                      f
                    );
                  })(e, t, n, r, s, i, o, a, l, u, c, h);
                case 32:
                case 64:
                case 128:
                  return (function(e, t, n, r, s, i, o, a, l, u, c, h) {
                    const d = t.bindings;
                    let p = !1;
                    const f = d.length;
                    if (
                      (f > 0 && Wn(e, t, 0, n) && (p = !0),
                      f > 1 && Wn(e, t, 1, r) && (p = !0),
                      f > 2 && Wn(e, t, 2, s) && (p = !0),
                      f > 3 && Wn(e, t, 3, i) && (p = !0),
                      f > 4 && Wn(e, t, 4, o) && (p = !0),
                      f > 5 && Wn(e, t, 5, a) && (p = !0),
                      f > 6 && Wn(e, t, 6, l) && (p = !0),
                      f > 7 && Wn(e, t, 7, u) && (p = !0),
                      f > 8 && Wn(e, t, 8, c) && (p = !0),
                      f > 9 && Wn(e, t, 9, h) && (p = !0),
                      p)
                    ) {
                      const p = jn(e, t.nodeIndex);
                      let g;
                      switch (201347067 & t.flags) {
                        case 32:
                          (g = new Array(d.length)),
                            f > 0 && (g[0] = n),
                            f > 1 && (g[1] = r),
                            f > 2 && (g[2] = s),
                            f > 3 && (g[3] = i),
                            f > 4 && (g[4] = o),
                            f > 5 && (g[5] = a),
                            f > 6 && (g[6] = l),
                            f > 7 && (g[7] = u),
                            f > 8 && (g[8] = c),
                            f > 9 && (g[9] = h);
                          break;
                        case 64:
                          (g = {}),
                            f > 0 && (g[d[0].name] = n),
                            f > 1 && (g[d[1].name] = r),
                            f > 2 && (g[d[2].name] = s),
                            f > 3 && (g[d[3].name] = i),
                            f > 4 && (g[d[4].name] = o),
                            f > 5 && (g[d[5].name] = a),
                            f > 6 && (g[d[6].name] = l),
                            f > 7 && (g[d[7].name] = u),
                            f > 8 && (g[d[8].name] = c),
                            f > 9 && (g[d[9].name] = h);
                          break;
                        case 128:
                          const e = n;
                          switch (f) {
                            case 1:
                              g = e.transform(n);
                              break;
                            case 2:
                              g = e.transform(r);
                              break;
                            case 3:
                              g = e.transform(r, s);
                              break;
                            case 4:
                              g = e.transform(r, s, i);
                              break;
                            case 5:
                              g = e.transform(r, s, i, o);
                              break;
                            case 6:
                              g = e.transform(r, s, i, o, a);
                              break;
                            case 7:
                              g = e.transform(r, s, i, o, a, l);
                              break;
                            case 8:
                              g = e.transform(r, s, i, o, a, l, u);
                              break;
                            case 9:
                              g = e.transform(r, s, i, o, a, l, u, c);
                              break;
                            case 10:
                              g = e.transform(r, s, i, o, a, l, u, c, h);
                          }
                      }
                      p.value = g;
                    }
                    return p;
                  })(e, t, n, r, s, i, o, a, l, u, c, h);
                default:
                  throw "unreachable";
              }
            })(e, t, r, s, i, o, a, l, u, c, h, d)
          : (function(e, t, n) {
              switch (201347067 & t.flags) {
                case 1:
                  return (function(e, t, n) {
                    let r = !1;
                    for (let s = 0; s < n.length; s++)
                      Vi(e, t, s, n[s]) && (r = !0);
                    return r;
                  })(e, t, n);
                case 2:
                  return (function(e, t, n) {
                    const r = t.bindings;
                    let s = !1;
                    for (let i = 0; i < n.length; i++)
                      Wn(e, t, i, n[i]) && (s = !0);
                    if (s) {
                      let s = "";
                      for (let e = 0; e < n.length; e++) s += Zi(n[e], r[e]);
                      s = t.text.prefix + s;
                      const i = Pn(e, t.nodeIndex).renderText;
                      e.renderer.setValue(i, s);
                    }
                    return s;
                  })(e, t, n);
                case 16384:
                  return (function(e, t, n) {
                    const r = Vn(e, t.nodeIndex),
                      s = r.instance;
                    let i = !1,
                      o = void 0;
                    for (let a = 0; a < n.length; a++)
                      qn(e, t, a, n[a]) &&
                        ((i = !0), (o = us(e, r, t, a, n[a], o)));
                    return (
                      o && s.ngOnChanges(o),
                      65536 & t.flags &&
                        Nn(e, 256, t.nodeIndex) &&
                        s.ngOnInit(),
                      262144 & t.flags && s.ngDoCheck(),
                      i
                    );
                  })(e, t, n);
                case 32:
                case 64:
                case 128:
                  return (function(e, t, n) {
                    const r = t.bindings;
                    let s = !1;
                    for (let i = 0; i < n.length; i++)
                      Wn(e, t, i, n[i]) && (s = !0);
                    if (s) {
                      const s = jn(e, t.nodeIndex);
                      let i;
                      switch (201347067 & t.flags) {
                        case 32:
                          i = n;
                          break;
                        case 64:
                          i = {};
                          for (let s = 0; s < n.length; s++)
                            i[r[s].name] = n[s];
                          break;
                        case 128:
                          const e = n[0],
                            t = n.slice(1);
                          i = e.transform(...t);
                      }
                      s.value = i;
                    }
                    return s;
                  })(e, t, n);
                default:
                  throw "unreachable";
              }
            })(e, t, r);
      }
      function ao(e) {
        const t = e.def;
        if (4 & t.nodeFlags)
          for (let n = 0; n < t.nodes.length; n++) {
            const r = t.nodes[n];
            if (4 & r.flags) {
              const t = Mn(e, n).template._projectedViews;
              if (t)
                for (let n = 0; n < t.length; n++) {
                  const r = t[n];
                  (r.state |= 32), Qn(r, e);
                }
            } else 0 == (4 & r.childFlags) && (n += r.childCount);
          }
      }
      function lo(e, t, n, r, s, i, o, a, l, u, c, h, d) {
        return (
          0 === n
            ? (function(e, t, n, r, s, i, o, a, l, u, c, h) {
                const d = t.bindings.length;
                d > 0 && Gn(e, t, 0, n),
                  d > 1 && Gn(e, t, 1, r),
                  d > 2 && Gn(e, t, 2, s),
                  d > 3 && Gn(e, t, 3, i),
                  d > 4 && Gn(e, t, 4, o),
                  d > 5 && Gn(e, t, 5, a),
                  d > 6 && Gn(e, t, 6, l),
                  d > 7 && Gn(e, t, 7, u),
                  d > 8 && Gn(e, t, 8, c),
                  d > 9 && Gn(e, t, 9, h);
              })(e, t, r, s, i, o, a, l, u, c, h, d)
            : (function(e, t, n) {
                for (let r = 0; r < n.length; r++) Gn(e, t, r, n[r]);
              })(e, t, r),
          !1
        );
      }
      function uo(e, t) {
        if (Un(e, t.nodeIndex).dirty)
          throw An(
            Fn.createDebugContext(e, t.nodeIndex),
            `Query ${t.query.id} not dirty`,
            `Query ${t.query.id} dirty`,
            0 != (1 & e.state)
          );
      }
      function co(e) {
        if (!(128 & e.state)) {
          if (
            (fo(e, ho.Destroy), po(e, ho.Destroy), cs(e, 131072), e.disposables)
          )
            for (let t = 0; t < e.disposables.length; t++) e.disposables[t]();
          !(function(e) {
            if (!(16 & e.state)) return;
            const t = Yn(e);
            if (t) {
              const n = t.template._projectedViews;
              n && (Le(n, n.indexOf(e)), Fn.dirtyParentQueries(e));
            }
          })(e),
            e.renderer.destroyNode &&
              (function(e) {
                const t = e.def.nodes.length;
                for (let n = 0; n < t; n++) {
                  const t = e.def.nodes[n];
                  1 & t.flags
                    ? e.renderer.destroyNode(Mn(e, n).renderElement)
                    : 2 & t.flags
                    ? e.renderer.destroyNode(Pn(e, n).renderText)
                    : (67108864 & t.flags || 134217728 & t.flags) &&
                      Un(e, n).destroy();
                }
              })(e),
            er(e) && e.renderer.destroy(),
            (e.state |= 128);
        }
      }
      const ho = (function() {
        var e = {
          CreateViewNodes: 0,
          CheckNoChanges: 1,
          CheckNoChangesProjectedViews: 2,
          CheckAndUpdate: 3,
          CheckAndUpdateProjectedViews: 4,
          Destroy: 5
        };
        return (
          (e[e.CreateViewNodes] = "CreateViewNodes"),
          (e[e.CheckNoChanges] = "CheckNoChanges"),
          (e[e.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews"),
          (e[e.CheckAndUpdate] = "CheckAndUpdate"),
          (e[e.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews"),
          (e[e.Destroy] = "Destroy"),
          e
        );
      })();
      function po(e, t) {
        const n = e.def;
        if (33554432 & n.nodeFlags)
          for (let r = 0; r < n.nodes.length; r++) {
            const s = n.nodes[r];
            33554432 & s.flags
              ? go(Mn(e, r).componentView, t)
              : 0 == (33554432 & s.childFlags) && (r += s.childCount);
          }
      }
      function fo(e, t) {
        const n = e.def;
        if (16777216 & n.nodeFlags)
          for (let r = 0; r < n.nodes.length; r++) {
            const s = n.nodes[r];
            if (16777216 & s.flags) {
              const n = Mn(e, r).viewContainer._embeddedViews;
              for (let e = 0; e < n.length; e++) go(n[e], t);
            } else 0 == (16777216 & s.childFlags) && (r += s.childCount);
          }
      }
      function go(e, t) {
        const n = e.state;
        switch (t) {
          case ho.CheckNoChanges:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? so(e)
                : 64 & n && mo(e, ho.CheckNoChangesProjectedViews));
            break;
          case ho.CheckNoChangesProjectedViews:
            0 == (128 & n) && (32 & n ? so(e) : 64 & n && mo(e, t));
            break;
          case ho.CheckAndUpdate:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? io(e)
                : 64 & n && mo(e, ho.CheckAndUpdateProjectedViews));
            break;
          case ho.CheckAndUpdateProjectedViews:
            0 == (128 & n) && (32 & n ? io(e) : 64 & n && mo(e, t));
            break;
          case ho.Destroy:
            co(e);
            break;
          case ho.CreateViewNodes:
            ro(e);
        }
      }
      function mo(e, t) {
        fo(e, t), po(e, t);
      }
      function yo(e, t, n, r) {
        if (!(e.def.nodeFlags & t && e.def.nodeFlags & n)) return;
        const s = e.def.nodes.length;
        for (let i = 0; i < s; i++) {
          const s = e.def.nodes[i];
          if (s.flags & t && s.flags & n)
            switch ((Fn.setCurrentNode(e, s.nodeIndex), r)) {
              case 0:
                Fi(e, s);
                break;
              case 1:
                uo(e, s);
            }
          (s.childFlags & t && s.childFlags & n) || (i += s.childCount);
        }
      }
      let bo = !1;
      function vo(e, t, n, r, s, i) {
        const o = s.injector.get(rn);
        return Xi(wo(e, s, o, t, n), r, i);
      }
      function _o(e, t, n, r, s, i) {
        const o = s.injector.get(rn),
          a = wo(e, s, new Xo(o), t, n),
          l = Oo(r);
        return Yo(jo.create, Xi, null, [a, l, i]);
      }
      function wo(e, t, n, r, s) {
        const i = t.injector.get(bt),
          o = t.injector.get(We),
          a = n.createRenderer(null, null);
        return {
          ngModule: t,
          injector: e,
          projectableNodes: r,
          selectorOrNode: s,
          sanitizer: i,
          rendererFactory: n,
          renderer: a,
          errorHandler: o
        };
      }
      function Co(e, t, n, r) {
        const s = Oo(n);
        return Yo(jo.create, Ji, null, [e, t, s, r]);
      }
      function xo(e, t, n, r) {
        return (
          (n = To.get(t.element.componentProvider.provider.token) || Oo(n)),
          Yo(jo.create, eo, null, [e, t, n, r])
        );
      }
      function So(e, t, n, r) {
        return $r(
          e,
          t,
          n,
          (function(e) {
            const { hasOverrides: t, hasDeprecatedOverrides: n } = (function(
              e
            ) {
              let t = !1,
                n = !1;
              return 0 === Eo.size
                ? { hasOverrides: t, hasDeprecatedOverrides: n }
                : (e.providers.forEach(e => {
                    const r = Eo.get(e.token);
                    3840 & e.flags &&
                      r &&
                      ((t = !0), (n = n || r.deprecatedBehavior));
                  }),
                  e.modules.forEach(e => {
                    ko.forEach((r, s) => {
                      me(s).providedIn === e &&
                        ((t = !0), (n = n || r.deprecatedBehavior));
                    });
                  }),
                  { hasOverrides: t, hasDeprecatedOverrides: n });
            })(e);
            return t
              ? ((function(e) {
                  for (let t = 0; t < e.providers.length; t++) {
                    const r = e.providers[t];
                    n && (r.flags |= 4096);
                    const s = Eo.get(r.token);
                    s &&
                      ((r.flags = (-3841 & r.flags) | s.flags),
                      (r.deps = sr(s.deps)),
                      (r.value = s.value));
                  }
                  if (ko.size > 0) {
                    let t = new Set(e.modules);
                    ko.forEach((r, s) => {
                      if (t.has(me(s).providedIn)) {
                        let t = {
                          token: s,
                          flags: r.flags | (n ? 4096 : 0),
                          deps: sr(r.deps),
                          value: r.value,
                          index: e.providers.length
                        };
                        e.providers.push(t), (e.providersByKey[Hn(s)] = t);
                      }
                    });
                  }
                })((e = e.factory(() => Ln))),
                e)
              : e;
          })(r)
        );
      }
      const Eo = new Map(),
        ko = new Map(),
        To = new Map();
      function Do(e) {
        let t;
        Eo.set(e.token, e),
          "function" == typeof e.token &&
            (t = me(e.token)) &&
            "function" == typeof t.providedIn &&
            ko.set(e.token, e);
      }
      function Ao(e, t) {
        const n = ar(t.viewDefFactory),
          r = ar(n.nodes[0].element.componentView);
        To.set(e, r);
      }
      function Io() {
        Eo.clear(), ko.clear(), To.clear();
      }
      function Oo(e) {
        if (0 === Eo.size) return e;
        const t = (function(e) {
          const t = [];
          let n = null;
          for (let r = 0; r < e.nodes.length; r++) {
            const s = e.nodes[r];
            1 & s.flags && (n = s),
              n &&
                3840 & s.flags &&
                Eo.has(s.provider.token) &&
                (t.push(n.nodeIndex), (n = null));
          }
          return t;
        })(e);
        if (0 === t.length) return e;
        e = e.factory(() => Ln);
        for (let r = 0; r < t.length; r++) n(e, t[r]);
        return e;
        function n(e, t) {
          for (let n = t + 1; n < e.nodes.length; n++) {
            const t = e.nodes[n];
            if (1 & t.flags) return;
            if (3840 & t.flags) {
              const e = t.provider,
                n = Eo.get(e.token);
              n &&
                ((t.flags = (-3841 & t.flags) | n.flags),
                (e.deps = sr(n.deps)),
                (e.value = n.value));
            }
          }
        }
      }
      function Ro(e, t, n, r, s, i, o, a, l, u, c, h, d) {
        const p = e.def.nodes[t];
        return (
          oo(e, p, n, r, s, i, o, a, l, u, c, h, d),
          224 & p.flags ? jn(e, t).value : void 0
        );
      }
      function No(e, t, n, r, s, i, o, a, l, u, c, h, d) {
        const p = e.def.nodes[t];
        return (
          lo(e, p, n, r, s, i, o, a, l, u, c, h, d),
          224 & p.flags ? jn(e, t).value : void 0
        );
      }
      function Po(e) {
        return Yo(jo.detectChanges, io, null, [e]);
      }
      function Mo(e) {
        return Yo(jo.checkNoChanges, so, null, [e]);
      }
      function Vo(e) {
        return Yo(jo.destroy, co, null, [e]);
      }
      const jo = (function() {
        var e = {
          create: 0,
          detectChanges: 1,
          checkNoChanges: 2,
          destroy: 3,
          handleEvent: 4
        };
        return (
          (e[e.create] = "create"),
          (e[e.detectChanges] = "detectChanges"),
          (e[e.checkNoChanges] = "checkNoChanges"),
          (e[e.destroy] = "destroy"),
          (e[e.handleEvent] = "handleEvent"),
          e
        );
      })();
      let Uo, Fo, Lo;
      function $o(e, t) {
        (Fo = e), (Lo = t);
      }
      function Ho(e, t, n, r) {
        return (
          $o(e, t), Yo(jo.handleEvent, e.def.handleEvent, null, [e, t, n, r])
        );
      }
      function zo(e, t) {
        if (128 & e.state) throw On(jo[Uo]);
        return (
          $o(e, Go(e, 0)),
          e.def.updateDirectives(function(e, n, r, ...s) {
            const i = e.def.nodes[n];
            return (
              0 === t ? qo(e, i, r, s) : Wo(e, i, r, s),
              16384 & i.flags && $o(e, Go(e, n)),
              224 & i.flags ? jn(e, i.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function Bo(e, t) {
        if (128 & e.state) throw On(jo[Uo]);
        return (
          $o(e, Zo(e, 0)),
          e.def.updateRenderer(function(e, n, r, ...s) {
            const i = e.def.nodes[n];
            return (
              0 === t ? qo(e, i, r, s) : Wo(e, i, r, s),
              3 & i.flags && $o(e, Zo(e, n)),
              224 & i.flags ? jn(e, i.nodeIndex).value : void 0
            );
          }, e)
        );
      }
      function qo(e, t, n, r) {
        if (oo(e, t, n, ...r)) {
          const o = 1 === n ? r[0] : r;
          if (16384 & t.flags) {
            const n = {};
            for (let e = 0; e < t.bindings.length; e++) {
              const r = t.bindings[e],
                a = o[e];
              8 & r.flags &&
                (n[
                  ((s = r.nonMinifiedName),
                  (i = void 0),
                  (i = s.replace(/[$@]/g, "_")),
                  `ng-reflect-${(s = i.replace(
                    wt,
                    (...e) => "-" + e[1].toLowerCase()
                  ))}`)
                ] = Ct(a));
            }
            const r = t.parent,
              a = Mn(e, r.nodeIndex).renderElement;
            if (r.element.name)
              for (let t in n) {
                const r = n[t];
                null != r
                  ? e.renderer.setAttribute(a, t, r)
                  : e.renderer.removeAttribute(a, t);
              }
            else
              e.renderer.setValue(a, `bindings=${JSON.stringify(n, null, 2)}`);
          }
        }
        var s, i;
      }
      function Wo(e, t, n, r) {
        lo(e, t, n, ...r);
      }
      function Go(e, t) {
        for (let n = t; n < e.def.nodes.length; n++) {
          const t = e.def.nodes[n];
          if (16384 & t.flags && t.bindings && t.bindings.length) return n;
        }
        return null;
      }
      function Zo(e, t) {
        for (let n = t; n < e.def.nodes.length; n++) {
          const t = e.def.nodes[n];
          if (3 & t.flags && t.bindings && t.bindings.length) return n;
        }
        return null;
      }
      class Qo {
        constructor(e, t) {
          (this.view = e),
            (this.nodeIndex = t),
            null == t && (this.nodeIndex = t = 0),
            (this.nodeDef = e.def.nodes[t]);
          let n = this.nodeDef,
            r = e;
          for (; n && 0 == (1 & n.flags); ) n = n.parent;
          if (!n) for (; !n && r; ) (n = Jn(r)), (r = r.parent);
          (this.elDef = n), (this.elView = r);
        }
        get elOrCompView() {
          return (
            Mn(this.elView, this.elDef.nodeIndex).componentView || this.view
          );
        }
        get injector() {
          return Vr(this.elView, this.elDef);
        }
        get component() {
          return this.elOrCompView.component;
        }
        get context() {
          return this.elOrCompView.context;
        }
        get providerTokens() {
          const e = [];
          if (this.elDef)
            for (
              let t = this.elDef.nodeIndex + 1;
              t <= this.elDef.nodeIndex + this.elDef.childCount;
              t++
            ) {
              const n = this.elView.def.nodes[t];
              20224 & n.flags && e.push(n.provider.token), (t += n.childCount);
            }
          return e;
        }
        get references() {
          const e = {};
          if (this.elDef) {
            Ko(this.elView, this.elDef, e);
            for (
              let t = this.elDef.nodeIndex + 1;
              t <= this.elDef.nodeIndex + this.elDef.childCount;
              t++
            ) {
              const n = this.elView.def.nodes[t];
              20224 & n.flags && Ko(this.elView, n, e), (t += n.childCount);
            }
          }
          return e;
        }
        get componentRenderElement() {
          const e = (function(e) {
            for (; e && !er(e); ) e = e.parent;
            return e.parent ? Mn(e.parent, Jn(e).nodeIndex) : null;
          })(this.elOrCompView);
          return e ? e.renderElement : void 0;
        }
        get renderNode() {
          return 2 & this.nodeDef.flags
            ? Xn(this.view, this.nodeDef)
            : Xn(this.elView, this.elDef);
        }
        logError(e, ...t) {
          let n, r;
          2 & this.nodeDef.flags
            ? ((n = this.view.def), (r = this.nodeDef.nodeIndex))
            : ((n = this.elView.def), (r = this.elDef.nodeIndex));
          const s = (function(e, t) {
            let n = -1;
            for (let r = 0; r <= t; r++) 3 & e.nodes[r].flags && n++;
            return n;
          })(n, r);
          let i = -1;
          n.factory(() => (i++, i === s ? e.error.bind(e, ...t) : Ln)),
            i < s &&
              (e.error(
                "Illegal state: the ViewDefinitionFactory did not call the logger!"
              ),
              e.error(...t));
        }
      }
      function Ko(e, t, n) {
        for (let r in t.references) n[r] = $i(e, t, t.references[r]);
      }
      function Yo(e, t, n, r) {
        const s = Uo,
          i = Fo,
          o = Lo;
        try {
          Uo = e;
          const a = t.apply(n, r);
          return (Fo = i), (Lo = o), (Uo = s), a;
        } catch (a) {
          if (ze(a) || !Fo) throw a;
          throw (function(e, t) {
            return (
              e instanceof Error || (e = new Error(e.toString())), In(e, t), e
            );
          })(a, Jo());
        }
      }
      function Jo() {
        return Fo ? new Qo(Fo, Lo) : null;
      }
      class Xo {
        constructor(e) {
          this.delegate = e;
        }
        createRenderer(e, t) {
          return new ea(this.delegate.createRenderer(e, t));
        }
        begin() {
          this.delegate.begin && this.delegate.begin();
        }
        end() {
          this.delegate.end && this.delegate.end();
        }
        whenRenderingDone() {
          return this.delegate.whenRenderingDone
            ? this.delegate.whenRenderingDone()
            : Promise.resolve(null);
        }
      }
      class ea {
        constructor(e) {
          (this.delegate = e),
            (this.debugContextFactory = Jo),
            (this.data = this.delegate.data);
        }
        createDebugContext(e) {
          return this.debugContextFactory(e);
        }
        destroyNode(e) {
          const t = xi(e);
          !(function(e) {
            Ci.delete(e.nativeNode);
          })(t),
            t instanceof _i && (t.listeners.length = 0),
            this.delegate.destroyNode && this.delegate.destroyNode(e);
        }
        destroy() {
          this.delegate.destroy();
        }
        createElement(e, t) {
          const n = this.delegate.createElement(e, t),
            r = this.createDebugContext(n);
          if (r) {
            const t = new wi(n, null, r);
            (t.name = e), Si(t);
          }
          return n;
        }
        createComment(e) {
          const t = this.delegate.createComment(e),
            n = this.createDebugContext(t);
          return n && Si(new _i(t, null, n)), t;
        }
        createText(e) {
          const t = this.delegate.createText(e),
            n = this.createDebugContext(t);
          return n && Si(new _i(t, null, n)), t;
        }
        appendChild(e, t) {
          const n = xi(e),
            r = xi(t);
          n && r && n instanceof wi && n.addChild(r),
            this.delegate.appendChild(e, t);
        }
        insertBefore(e, t, n) {
          const r = xi(e),
            s = xi(t),
            i = xi(n);
          r && s && r instanceof wi && r.insertBefore(i, s),
            this.delegate.insertBefore(e, t, n);
        }
        removeChild(e, t) {
          const n = xi(e),
            r = xi(t);
          n && r && n instanceof wi && n.removeChild(r),
            this.delegate.removeChild(e, t);
        }
        selectRootElement(e, t) {
          const n = this.delegate.selectRootElement(e, t),
            r = Jo();
          return r && Si(new wi(n, null, r)), n;
        }
        setAttribute(e, t, n, r) {
          const s = xi(e);
          s && s instanceof wi && (s.attributes[r ? r + ":" + t : t] = n),
            this.delegate.setAttribute(e, t, n, r);
        }
        removeAttribute(e, t, n) {
          const r = xi(e);
          r && r instanceof wi && (r.attributes[n ? n + ":" + t : t] = null),
            this.delegate.removeAttribute(e, t, n);
        }
        addClass(e, t) {
          const n = xi(e);
          n && n instanceof wi && (n.classes[t] = !0),
            this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          const n = xi(e);
          n && n instanceof wi && (n.classes[t] = !1),
            this.delegate.removeClass(e, t);
        }
        setStyle(e, t, n, r) {
          const s = xi(e);
          s && s instanceof wi && (s.styles[t] = n),
            this.delegate.setStyle(e, t, n, r);
        }
        removeStyle(e, t, n) {
          const r = xi(e);
          r && r instanceof wi && (r.styles[t] = null),
            this.delegate.removeStyle(e, t, n);
        }
        setProperty(e, t, n) {
          const r = xi(e);
          r && r instanceof wi && (r.properties[t] = n),
            this.delegate.setProperty(e, t, n);
        }
        listen(e, t, n) {
          if ("string" != typeof e) {
            const r = xi(e);
            r && r.listeners.push(new vi(t, n));
          }
          return this.delegate.listen(e, t, n);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setValue(e, t) {
          return this.delegate.setValue(e, t);
        }
      }
      function ta(e, t, n) {
        return new na(e, t, n);
      }
      class na extends Ue {
        constructor(e, t, n) {
          super(),
            (this.moduleType = e),
            (this._bootstrapComponents = t),
            (this._ngModuleDefFactory = n);
        }
        create(e) {
          !(function() {
            if (bo) return;
            bo = !0;
            const e = Qe()
              ? {
                  setCurrentNode: $o,
                  createRootView: _o,
                  createEmbeddedView: Co,
                  createComponentView: xo,
                  createNgModuleRef: So,
                  overrideProvider: Do,
                  overrideComponentView: Ao,
                  clearOverrides: Io,
                  checkAndUpdateView: Po,
                  checkNoChangesView: Mo,
                  destroyView: Vo,
                  createDebugContext: (e, t) => new Qo(e, t),
                  handleEvent: Ho,
                  updateDirectives: zo,
                  updateRenderer: Bo
                }
              : {
                  setCurrentNode: () => {},
                  createRootView: vo,
                  createEmbeddedView: Ji,
                  createComponentView: eo,
                  createNgModuleRef: $r,
                  overrideProvider: Ln,
                  overrideComponentView: Ln,
                  clearOverrides: Ln,
                  checkAndUpdateView: io,
                  checkNoChangesView: so,
                  destroyView: co,
                  createDebugContext: (e, t) => new Qo(e, t),
                  handleEvent: (e, t, n, r) => e.def.handleEvent(e, t, n, r),
                  updateDirectives: (e, t) =>
                    e.def.updateDirectives(0 === t ? Ro : No, e),
                  updateRenderer: (e, t) =>
                    e.def.updateRenderer(0 === t ? Ro : No, e)
                };
            (Fn.setCurrentNode = e.setCurrentNode),
              (Fn.createRootView = e.createRootView),
              (Fn.createEmbeddedView = e.createEmbeddedView),
              (Fn.createComponentView = e.createComponentView),
              (Fn.createNgModuleRef = e.createNgModuleRef),
              (Fn.overrideProvider = e.overrideProvider),
              (Fn.overrideComponentView = e.overrideComponentView),
              (Fn.clearOverrides = e.clearOverrides),
              (Fn.checkAndUpdateView = e.checkAndUpdateView),
              (Fn.checkNoChangesView = e.checkNoChangesView),
              (Fn.destroyView = e.destroyView),
              (Fn.resolveDep = as),
              (Fn.createDebugContext = e.createDebugContext),
              (Fn.handleEvent = e.handleEvent),
              (Fn.updateDirectives = e.updateDirectives),
              (Fn.updateRenderer = e.updateRenderer),
              (Fn.dirtyParentQueries = Ui);
          })();
          const t = (function(e) {
            const t = Array.from(e.providers),
              n = Array.from(e.modules),
              r = {};
            for (const s in e.providersByKey) r[s] = e.providersByKey[s];
            return {
              factory: e.factory,
              isRoot: e.isRoot,
              providers: t,
              modules: n,
              providersByKey: r
            };
          })(ar(this._ngModuleDefFactory));
          return Fn.createNgModuleRef(
            this.moduleType,
            e || Tt.NULL,
            this._bootstrapComponents,
            t
          );
        }
      }
      class ra {}
      const sa = new w(e => e.complete());
      function ia(e) {
        return e
          ? (function(e) {
              return new w(t => e.schedule(() => t.complete()));
            })(e)
          : sa;
      }
      function oa(e) {
        const t = new w(t => {
          t.next(e), t.complete();
        });
        return (t._isScalar = !0), (t.value = e), t;
      }
      function aa(...e) {
        let t = e[e.length - 1];
        switch ((A(t) ? e.pop() : (t = void 0), e.length)) {
          case 0:
            return ia(t);
          case 1:
            return t ? q(e, t) : oa(e[0]);
          default:
            return q(e, t);
        }
      }
      function la(e, t) {
        return G(e, t, 1);
      }
      function ua(e, t) {
        return function(n) {
          return n.lift(new ca(e, t));
        };
      }
      class ca {
        constructor(e, t) {
          (this.predicate = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new ha(e, this.predicate, this.thisArg));
        }
      }
      class ha extends g {
        constructor(e, t, n) {
          super(e), (this.predicate = t), (this.thisArg = n), (this.count = 0);
        }
        _next(e) {
          let t;
          try {
            t = this.predicate.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          t && this.destination.next(e);
        }
      }
      class da {}
      const pa = new Te("Location Initialized");
      class fa {}
      const ga = new Te("appBaseHref");
      class ma {
        constructor(e, t) {
          (this._subject = new vs()),
            (this._urlChangeListeners = []),
            (this._platformStrategy = e);
          const n = this._platformStrategy.getBaseHref();
          (this._platformLocation = t),
            (this._baseHref = ma.stripTrailingSlash(ya(n))),
            this._platformStrategy.onPopState(e => {
              this._subject.emit({
                url: this.path(!0),
                pop: !0,
                state: e.state,
                type: e.type
              });
            });
        }
        path(e = !1) {
          return this.normalize(this._platformStrategy.path(e));
        }
        getState() {
          return this._platformLocation.getState();
        }
        isCurrentPathEqualTo(e, t = "") {
          return this.path() == this.normalize(e + ma.normalizeQueryParams(t));
        }
        normalize(e) {
          return ma.stripTrailingSlash(
            (function(e, t) {
              return e && t.startsWith(e) ? t.substring(e.length) : t;
            })(this._baseHref, ya(e))
          );
        }
        prepareExternalUrl(e) {
          return (
            e && "/" !== e[0] && (e = "/" + e),
            this._platformStrategy.prepareExternalUrl(e)
          );
        }
        go(e, t = "", n = null) {
          this._platformStrategy.pushState(n, "", e, t),
            this._notifyUrlChangeListeners(
              this.prepareExternalUrl(e + ma.normalizeQueryParams(t)),
              n
            );
        }
        replaceState(e, t = "", n = null) {
          this._platformStrategy.replaceState(n, "", e, t),
            this._notifyUrlChangeListeners(
              this.prepareExternalUrl(e + ma.normalizeQueryParams(t)),
              n
            );
        }
        forward() {
          this._platformStrategy.forward();
        }
        back() {
          this._platformStrategy.back();
        }
        onUrlChange(e) {
          this._urlChangeListeners.push(e),
            this.subscribe(e => {
              this._notifyUrlChangeListeners(e.url, e.state);
            });
        }
        _notifyUrlChangeListeners(e = "", t) {
          this._urlChangeListeners.forEach(n => n(e, t));
        }
        subscribe(e, t, n) {
          return this._subject.subscribe({ next: e, error: t, complete: n });
        }
        static normalizeQueryParams(e) {
          return e && "?" !== e[0] ? "?" + e : e;
        }
        static joinWithSlash(e, t) {
          if (0 == e.length) return t;
          if (0 == t.length) return e;
          let n = 0;
          return (
            e.endsWith("/") && n++,
            t.startsWith("/") && n++,
            2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
          );
        }
        static stripTrailingSlash(e) {
          const t = e.match(/#|\?|$/),
            n = (t && t.index) || e.length;
          return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
        }
      }
      function ya(e) {
        return e.replace(/\/index.html$/, "");
      }
      class ba extends fa {
        constructor(e, t) {
          super(),
            (this._platformLocation = e),
            (this._baseHref = ""),
            null != t && (this._baseHref = t);
        }
        onPopState(e) {
          this._platformLocation.onPopState(e),
            this._platformLocation.onHashChange(e);
        }
        getBaseHref() {
          return this._baseHref;
        }
        path(e = !1) {
          let t = this._platformLocation.hash;
          return null == t && (t = "#"), t.length > 0 ? t.substring(1) : t;
        }
        prepareExternalUrl(e) {
          const t = ma.joinWithSlash(this._baseHref, e);
          return t.length > 0 ? "#" + t : t;
        }
        pushState(e, t, n, r) {
          let s = this.prepareExternalUrl(n + ma.normalizeQueryParams(r));
          0 == s.length && (s = this._platformLocation.pathname),
            this._platformLocation.pushState(e, t, s);
        }
        replaceState(e, t, n, r) {
          let s = this.prepareExternalUrl(n + ma.normalizeQueryParams(r));
          0 == s.length && (s = this._platformLocation.pathname),
            this._platformLocation.replaceState(e, t, s);
        }
        forward() {
          this._platformLocation.forward();
        }
        back() {
          this._platformLocation.back();
        }
      }
      class va extends fa {
        constructor(e, t) {
          if (
            (super(),
            (this._platformLocation = e),
            null == t && (t = this._platformLocation.getBaseHrefFromDOM()),
            null == t)
          )
            throw new Error(
              "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
            );
          this._baseHref = t;
        }
        onPopState(e) {
          this._platformLocation.onPopState(e),
            this._platformLocation.onHashChange(e);
        }
        getBaseHref() {
          return this._baseHref;
        }
        prepareExternalUrl(e) {
          return ma.joinWithSlash(this._baseHref, e);
        }
        path(e = !1) {
          const t =
              this._platformLocation.pathname +
              ma.normalizeQueryParams(this._platformLocation.search),
            n = this._platformLocation.hash;
          return n && e ? `${t}${n}` : t;
        }
        pushState(e, t, n, r) {
          const s = this.prepareExternalUrl(n + ma.normalizeQueryParams(r));
          this._platformLocation.pushState(e, t, s);
        }
        replaceState(e, t, n, r) {
          const s = this.prepareExternalUrl(n + ma.normalizeQueryParams(r));
          this._platformLocation.replaceState(e, t, s);
        }
        forward() {
          this._platformLocation.forward();
        }
        back() {
          this._platformLocation.back();
        }
      }
      const _a = (function() {
          var e = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
          return (
            (e[e.Zero] = "Zero"),
            (e[e.One] = "One"),
            (e[e.Two] = "Two"),
            (e[e.Few] = "Few"),
            (e[e.Many] = "Many"),
            (e[e.Other] = "Other"),
            e
          );
        })(),
        wa = (function() {
          var e = { Format: 0, Standalone: 1 };
          return (e[e.Format] = "Format"), (e[e.Standalone] = "Standalone"), e;
        })(),
        Ca = (function() {
          var e = { Narrow: 0, Abbreviated: 1, Wide: 2, Short: 3 };
          return (
            (e[e.Narrow] = "Narrow"),
            (e[e.Abbreviated] = "Abbreviated"),
            (e[e.Wide] = "Wide"),
            (e[e.Short] = "Short"),
            e
          );
        })(),
        xa = (function() {
          var e = { Short: 0, Medium: 1, Long: 2, Full: 3 };
          return (
            (e[e.Short] = "Short"),
            (e[e.Medium] = "Medium"),
            (e[e.Long] = "Long"),
            (e[e.Full] = "Full"),
            e
          );
        })(),
        Sa = (function() {
          var e = {
            Decimal: 0,
            Group: 1,
            List: 2,
            PercentSign: 3,
            PlusSign: 4,
            MinusSign: 5,
            Exponential: 6,
            SuperscriptingExponent: 7,
            PerMille: 8,
            Infinity: 9,
            NaN: 10,
            TimeSeparator: 11,
            CurrencyDecimal: 12,
            CurrencyGroup: 13
          };
          return (
            (e[e.Decimal] = "Decimal"),
            (e[e.Group] = "Group"),
            (e[e.List] = "List"),
            (e[e.PercentSign] = "PercentSign"),
            (e[e.PlusSign] = "PlusSign"),
            (e[e.MinusSign] = "MinusSign"),
            (e[e.Exponential] = "Exponential"),
            (e[e.SuperscriptingExponent] = "SuperscriptingExponent"),
            (e[e.PerMille] = "PerMille"),
            (e[e.Infinity] = "Infinity"),
            (e[e.NaN] = "NaN"),
            (e[e.TimeSeparator] = "TimeSeparator"),
            (e[e.CurrencyDecimal] = "CurrencyDecimal"),
            (e[e.CurrencyGroup] = "CurrencyGroup"),
            e
          );
        })();
      function Ea(e, t, n) {
        const r = bs(e),
          s = Ra([r[gs.DaysFormat], r[gs.DaysStandalone]], t);
        return Ra(s, n);
      }
      function ka(e, t, n) {
        const r = bs(e),
          s = Ra([r[gs.MonthsFormat], r[gs.MonthsStandalone]], t);
        return Ra(s, n);
      }
      function Ta(e, t) {
        return Ra(bs(e)[gs.DateFormat], t);
      }
      function Da(e, t) {
        return Ra(bs(e)[gs.TimeFormat], t);
      }
      function Aa(e, t) {
        return Ra(bs(e)[gs.DateTimeFormat], t);
      }
      function Ia(e, t) {
        const n = bs(e),
          r = n[gs.NumberSymbols][t];
        if (void 0 === r) {
          if (t === Sa.CurrencyDecimal) return n[gs.NumberSymbols][Sa.Decimal];
          if (t === Sa.CurrencyGroup) return n[gs.NumberSymbols][Sa.Group];
        }
        return r;
      }
      function Oa(e) {
        if (!e[gs.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${
              e[gs.LocaleId]
            }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
          );
      }
      function Ra(e, t) {
        for (let n = t; n > -1; n--) if (void 0 !== e[n]) return e[n];
        throw new Error("Locale data API: locale data undefined");
      }
      function Na(e) {
        const [t, n] = e.split(":");
        return { hours: +t, minutes: +n };
      }
      const Pa = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        Ma = {},
        Va = /((?:[^GyMLwWdEabBhHmsSzZO']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
        ja = (function() {
          var e = { Short: 0, ShortGMT: 1, Long: 2, Extended: 3 };
          return (
            (e[e.Short] = "Short"),
            (e[e.ShortGMT] = "ShortGMT"),
            (e[e.Long] = "Long"),
            (e[e.Extended] = "Extended"),
            e
          );
        })(),
        Ua = (function() {
          var e = {
            FullYear: 0,
            Month: 1,
            Date: 2,
            Hours: 3,
            Minutes: 4,
            Seconds: 5,
            FractionalSeconds: 6,
            Day: 7
          };
          return (
            (e[e.FullYear] = "FullYear"),
            (e[e.Month] = "Month"),
            (e[e.Date] = "Date"),
            (e[e.Hours] = "Hours"),
            (e[e.Minutes] = "Minutes"),
            (e[e.Seconds] = "Seconds"),
            (e[e.FractionalSeconds] = "FractionalSeconds"),
            (e[e.Day] = "Day"),
            e
          );
        })(),
        Fa = (function() {
          var e = { DayPeriods: 0, Days: 1, Months: 2, Eras: 3 };
          return (
            (e[e.DayPeriods] = "DayPeriods"),
            (e[e.Days] = "Days"),
            (e[e.Months] = "Months"),
            (e[e.Eras] = "Eras"),
            e
          );
        })();
      function La(e, t) {
        return (
          t &&
            (e = e.replace(/\{([^}]+)}/g, function(e, n) {
              return null != t && n in t ? t[n] : e;
            })),
          e
        );
      }
      function $a(e, t, n = "-", r, s) {
        let i = "";
        (e < 0 || (s && e <= 0)) && (s ? (e = 1 - e) : ((e = -e), (i = n)));
        let o = String(e);
        for (; o.length < t; ) o = "0" + o;
        return r && (o = o.substr(o.length - t)), i + o;
      }
      function Ha(e, t, n = 0, r = !1, s = !1) {
        return function(i, o) {
          let a = (function(e, t) {
            switch (e) {
              case Ua.FullYear:
                return t.getFullYear();
              case Ua.Month:
                return t.getMonth();
              case Ua.Date:
                return t.getDate();
              case Ua.Hours:
                return t.getHours();
              case Ua.Minutes:
                return t.getMinutes();
              case Ua.Seconds:
                return t.getSeconds();
              case Ua.FractionalSeconds:
                return t.getMilliseconds();
              case Ua.Day:
                return t.getDay();
              default:
                throw new Error(`Unknown DateType value "${e}".`);
            }
          })(e, i);
          if (((n > 0 || a > -n) && (a += n), e === Ua.Hours))
            0 === a && -12 === n && (a = 12);
          else if (e === Ua.FractionalSeconds)
            return (l = t), $a(a, 3).substr(0, l);
          var l;
          const u = Ia(o, Sa.MinusSign);
          return $a(a, t, u, r, s);
        };
      }
      function za(e, t, n = wa.Format, r = !1) {
        return function(s, i) {
          return (function(e, t, n, r, s, i) {
            switch (n) {
              case Fa.Months:
                return ka(t, s, r)[e.getMonth()];
              case Fa.Days:
                return Ea(t, s, r)[e.getDay()];
              case Fa.DayPeriods:
                const o = e.getHours(),
                  a = e.getMinutes();
                if (i) {
                  const e = (function(e) {
                      const t = bs(e);
                      return (
                        Oa(t),
                        (t[gs.ExtraData][2] || []).map(e =>
                          "string" == typeof e ? Na(e) : [Na(e[0]), Na(e[1])]
                        )
                      );
                    })(t),
                    n = (function(e, t, n) {
                      const r = bs(e);
                      Oa(r);
                      const s =
                        Ra([r[gs.ExtraData][0], r[gs.ExtraData][1]], t) || [];
                      return Ra(s, n) || [];
                    })(t, s, r);
                  let i;
                  if (
                    (e.forEach((e, t) => {
                      if (Array.isArray(e)) {
                        const { hours: r, minutes: s } = e[0],
                          { hours: l, minutes: u } = e[1];
                        o >= r &&
                          a >= s &&
                          (o < l || (o === l && a < u)) &&
                          (i = n[t]);
                      } else {
                        const { hours: r, minutes: s } = e;
                        r === o && s === a && (i = n[t]);
                      }
                    }),
                    i)
                  )
                    return i;
                }
                return (function(e, t, n) {
                  const r = bs(e),
                    s = Ra(
                      [r[gs.DayPeriodsFormat], r[gs.DayPeriodsStandalone]],
                      t
                    );
                  return Ra(s, n);
                })(t, s, r)[o < 12 ? 0 : 1];
              case Fa.Eras:
                return (function(e, t) {
                  return Ra(bs(e)[gs.Eras], t);
                })(t, r)[e.getFullYear() <= 0 ? 0 : 1];
              default:
                throw new Error(`unexpected translation type ${n}`);
            }
          })(s, i, e, t, n, r);
        };
      }
      function Ba(e) {
        return function(t, n, r) {
          const s = -1 * r,
            i = Ia(n, Sa.MinusSign),
            o = s > 0 ? Math.floor(s / 60) : Math.ceil(s / 60);
          switch (e) {
            case ja.Short:
              return (
                (s >= 0 ? "+" : "") + $a(o, 2, i) + $a(Math.abs(s % 60), 2, i)
              );
            case ja.ShortGMT:
              return "GMT" + (s >= 0 ? "+" : "") + $a(o, 1, i);
            case ja.Long:
              return (
                "GMT" +
                (s >= 0 ? "+" : "") +
                $a(o, 2, i) +
                ":" +
                $a(Math.abs(s % 60), 2, i)
              );
            case ja.Extended:
              return 0 === r
                ? "Z"
                : (s >= 0 ? "+" : "") +
                    $a(o, 2, i) +
                    ":" +
                    $a(Math.abs(s % 60), 2, i);
            default:
              throw new Error(`Unknown zone width "${e}"`);
          }
        };
      }
      function qa(e, t = !1) {
        return function(n, r) {
          let s;
          if (t) {
            const e = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
              t = n.getDate();
            s = 1 + Math.floor((t + e) / 7);
          } else {
            const e = (function(e) {
                const t = new Date(e, 0, 1).getDay();
                return new Date(e, 0, 1 + (t <= 4 ? 4 : 11) - t);
              })(n.getFullYear()),
              t =
                ((i = n),
                new Date(
                  i.getFullYear(),
                  i.getMonth(),
                  i.getDate() + (4 - i.getDay())
                )).getTime() - e.getTime();
            s = 1 + Math.round(t / 6048e5);
          }
          var i;
          return $a(s, e, Ia(r, Sa.MinusSign));
        };
      }
      const Wa = {};
      function Ga(e, t) {
        e = e.replace(/:/g, "");
        const n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(n) ? t : n;
      }
      function Za(e) {
        return e instanceof Date && !isNaN(e.valueOf());
      }
      const Qa = new Te("UseV4Plurals");
      class Ka {}
      class Ya extends Ka {
        constructor(e, t) {
          super(), (this.locale = e), (this.deprecatedPluralFn = t);
        }
        getPluralCategory(e, t) {
          switch (
            this.deprecatedPluralFn
              ? this.deprecatedPluralFn(t || this.locale, e)
              : (function(e) {
                  return bs(e)[gs.PluralCase];
                })(t || this.locale)(e)
          ) {
            case _a.Zero:
              return "zero";
            case _a.One:
              return "one";
            case _a.Two:
              return "two";
            case _a.Few:
              return "few";
            case _a.Many:
              return "many";
            default:
              return "other";
          }
        }
      }
      function Ja(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const e = n.indexOf("="),
            [r, s] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
          if (r.trim() === t) return decodeURIComponent(s);
        }
        return null;
      }
      class Xa {}
      class el {
        constructor(e, t, n, r) {
          (this._iterableDiffers = e),
            (this._keyValueDiffers = t),
            (this._ngEl = n),
            (this._renderer = r),
            (this._initialClasses = []);
        }
        getValue() {
          return null;
        }
        setClass(e) {
          this._removeClasses(this._initialClasses),
            (this._initialClasses = "string" == typeof e ? e.split(/\s+/) : []),
            this._applyClasses(this._initialClasses),
            this._applyClasses(this._rawClass);
        }
        setNgClass(e) {
          this._removeClasses(this._rawClass),
            this._applyClasses(this._initialClasses),
            (this._iterableDiffer = null),
            (this._keyValueDiffer = null),
            (this._rawClass = "string" == typeof e ? e.split(/\s+/) : e),
            this._rawClass &&
              ($t(this._rawClass)
                ? (this._iterableDiffer = this._iterableDiffers
                    .find(this._rawClass)
                    .create())
                : (this._keyValueDiffer = this._keyValueDiffers
                    .find(this._rawClass)
                    .create()));
        }
        applyChanges() {
          if (this._iterableDiffer) {
            const e = this._iterableDiffer.diff(this._rawClass);
            e && this._applyIterableChanges(e);
          } else if (this._keyValueDiffer) {
            const e = this._keyValueDiffer.diff(this._rawClass);
            e && this._applyKeyValueChanges(e);
          }
        }
        _applyKeyValueChanges(e) {
          e.forEachAddedItem(e => this._toggleClass(e.key, e.currentValue)),
            e.forEachChangedItem(e => this._toggleClass(e.key, e.currentValue)),
            e.forEachRemovedItem(e => {
              e.previousValue && this._toggleClass(e.key, !1);
            });
        }
        _applyIterableChanges(e) {
          e.forEachAddedItem(e => {
            if ("string" != typeof e.item)
              throw new Error(
                `NgClass can only toggle CSS classes expressed as strings, got ${be(
                  e.item
                )}`
              );
            this._toggleClass(e.item, !0);
          }),
            e.forEachRemovedItem(e => this._toggleClass(e.item, !1));
        }
        _applyClasses(e) {
          e &&
            (Array.isArray(e) || e instanceof Set
              ? e.forEach(e => this._toggleClass(e, !0))
              : Object.keys(e).forEach(t => this._toggleClass(t, !!e[t])));
        }
        _removeClasses(e) {
          e &&
            (Array.isArray(e) || e instanceof Set
              ? e.forEach(e => this._toggleClass(e, !1))
              : Object.keys(e).forEach(e => this._toggleClass(e, !1)));
        }
        _toggleClass(e, t) {
          (e = e.trim()) &&
            e.split(/\s+/g).forEach(e => {
              t
                ? this._renderer.addClass(this._ngEl.nativeElement, e)
                : this._renderer.removeClass(this._ngEl.nativeElement, e);
            });
        }
      }
      let tl = (() => {
        class e {
          constructor(e) {
            this._delegate = e;
          }
          getValue() {
            return this._delegate.getValue();
          }
        }
        return (e.ngDirectiveDef = void 0), e;
      })();
      class nl extends tl {
        constructor(e) {
          super(e);
        }
        set klass(e) {
          this._delegate.setClass(e);
        }
        set ngClass(e) {
          this._delegate.setNgClass(e);
        }
        ngDoCheck() {
          this._delegate.applyChanges();
        }
      }
      class rl {
        constructor(e, t, n, r) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = n),
            (this.count = r);
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
      class sl {
        constructor(e, t, n) {
          (this._viewContainer = e),
            (this._template = t),
            (this._differs = n),
            (this._ngForOfDirty = !0),
            (this._differ = null);
        }
        set ngForOf(e) {
          (this._ngForOf = e), (this._ngForOfDirty = !0);
        }
        set ngForTrackBy(e) {
          Qe() &&
            null != e &&
            "function" != typeof e &&
            console &&
            console.warn &&
            console.warn(
              `trackBy must be a function, but received ${JSON.stringify(
                e
              )}. ` +
                "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."
            ),
            (this._trackByFn = e);
        }
        get ngForTrackBy() {
          return this._trackByFn;
        }
        set ngForTemplate(e) {
          e && (this._template = e);
        }
        ngDoCheck() {
          if (this._ngForOfDirty) {
            this._ngForOfDirty = !1;
            const n = this._ngForOf;
            if (!this._differ && n)
              try {
                this._differ = this._differs.find(n).create(this.ngForTrackBy);
              } catch (t) {
                throw new Error(
                  `Cannot find a differ supporting object '${n}' of type '${((e = n),
                  e.name ||
                    typeof e)}'. NgFor only supports binding to Iterables such as Arrays.`
                );
              }
          }
          var e;
          if (this._differ) {
            const e = this._differ.diff(this._ngForOf);
            e && this._applyChanges(e);
          }
        }
        _applyChanges(e) {
          const t = [];
          e.forEachOperation((e, n, r) => {
            if (null == e.previousIndex) {
              const n = this._viewContainer.createEmbeddedView(
                  this._template,
                  new rl(null, this._ngForOf, -1, -1),
                  null === r ? void 0 : r
                ),
                s = new il(e, n);
              t.push(s);
            } else if (null == r)
              this._viewContainer.remove(null === n ? void 0 : n);
            else if (null !== n) {
              const s = this._viewContainer.get(n);
              this._viewContainer.move(s, r);
              const i = new il(e, s);
              t.push(i);
            }
          });
          for (let n = 0; n < t.length; n++)
            this._perViewChange(t[n].view, t[n].record);
          for (let n = 0, r = this._viewContainer.length; n < r; n++) {
            const e = this._viewContainer.get(n);
            (e.context.index = n),
              (e.context.count = r),
              (e.context.ngForOf = this._ngForOf);
          }
          e.forEachIdentityChange(e => {
            this._viewContainer.get(e.currentIndex).context.$implicit = e.item;
          });
        }
        _perViewChange(e, t) {
          e.context.$implicit = t.item;
        }
        static ngTemplateContextGuard(e, t) {
          return !0;
        }
      }
      class il {
        constructor(e, t) {
          (this.record = e), (this.view = t);
        }
      }
      class ol {
        constructor(e, t) {
          (this._viewContainer = e),
            (this._context = new al()),
            (this._thenTemplateRef = null),
            (this._elseTemplateRef = null),
            (this._thenViewRef = null),
            (this._elseViewRef = null),
            (this._thenTemplateRef = t);
        }
        set ngIf(e) {
          (this._context.$implicit = this._context.ngIf = e),
            this._updateView();
        }
        set ngIfThen(e) {
          ll("ngIfThen", e),
            (this._thenTemplateRef = e),
            (this._thenViewRef = null),
            this._updateView();
        }
        set ngIfElse(e) {
          ll("ngIfElse", e),
            (this._elseTemplateRef = e),
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
      }
      class al {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function ll(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${be(t)}'.`
          );
      }
      class ul {
        constructor(e) {
          (this._viewContainerRef = e),
            (this._viewRef = null),
            (this.ngTemplateOutletContext = null),
            (this.ngTemplateOutlet = null);
        }
        ngOnChanges(e) {
          this._shouldRecreateView(e)
            ? (this._viewRef &&
                this._viewContainerRef.remove(
                  this._viewContainerRef.indexOf(this._viewRef)
                ),
              this.ngTemplateOutlet &&
                (this._viewRef = this._viewContainerRef.createEmbeddedView(
                  this.ngTemplateOutlet,
                  this.ngTemplateOutletContext
                )))
            : this._viewRef &&
              this.ngTemplateOutletContext &&
              this._updateExistingContext(this.ngTemplateOutletContext);
        }
        _shouldRecreateView(e) {
          const t = e.ngTemplateOutletContext;
          return !!e.ngTemplateOutlet || (t && this._hasContextShapeChanged(t));
        }
        _hasContextShapeChanged(e) {
          const t = Object.keys(e.previousValue || {}),
            n = Object.keys(e.currentValue || {});
          if (t.length === n.length) {
            for (let e of n) if (-1 === t.indexOf(e)) return !0;
            return !1;
          }
          return !0;
        }
        _updateExistingContext(e) {
          for (let t of Object.keys(e))
            this._viewRef.context[t] = this.ngTemplateOutletContext[t];
        }
      }
      class cl {}
      const hl = new Te("DocumentToken");
      function dl(e) {
        return "browser" === e;
      }
      let pl = (() => {
        class e {}
        return (
          (e.ngInjectableDef = ge({
            token: e,
            providedIn: "root",
            factory: () => new fl(Pe(hl), window, Pe(We))
          })),
          e
        );
      })();
      class fl {
        constructor(e, t, n) {
          (this.document = e),
            (this.window = t),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportScrollRestoration() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (this.supportScrollRestoration()) {
            e =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(e)
                : e.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const t = this.document.querySelector(`#${e}`);
              if (t) return void this.scrollToElement(t);
              const n = this.document.querySelector(`[name='${e}']`);
              if (n) return void this.scrollToElement(n);
            } catch (t) {
              this.errorHandler.handleError(t);
            }
          }
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const t = e.getBoundingClientRect(),
            n = t.left + this.window.pageXOffset,
            r = t.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (e) {
            return !1;
          }
        }
      }
      class gl {}
      class ml {}
      class yl {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach(e => {
                            const t = e.indexOf(":");
                            if (t > 0) {
                              const n = e.slice(0, t),
                                r = n.toLowerCase(),
                                s = e.slice(t + 1).trim();
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(s)
                                  : this.headers.set(r, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach(t => {
                            let n = e[t];
                            const r = t.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(r, n),
                                this.maybeSetNormalizedName(t, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof yl
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach(e => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach(t => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new yl();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof yl
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let n = e.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const r = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              r.push(...n), this.headers.set(t, r);
              break;
            case "d":
              const s = e.value;
              if (s) {
                let e = this.headers.get(t);
                if (!e) return;
                (e = e.filter(e => -1 === s.indexOf(e))),
                  0 === e.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, e);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(t =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class bl {
        encodeKey(e) {
          return vl(e);
        }
        encodeValue(e) {
          return vl(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      function vl(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class _l {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new bl()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e.split("&").forEach(e => {
                    const r = e.indexOf("="),
                      [s, i] =
                        -1 == r
                          ? [t.decodeKey(e), ""]
                          : [
                              t.decodeKey(e.slice(0, r)),
                              t.decodeValue(e.slice(r + 1))
                            ],
                      o = n.get(s) || [];
                    o.push(i), n.set(s, o);
                  }),
                n
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach(t => {
                  const n = e.fromObject[t];
                  this.map.set(t, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map(e => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map(e => t + "=" + this.encoder.encodeValue(e))
                  .join("&");
              })
              .join("&")
          );
        }
        clone(e) {
          const t = new _l({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat([e])),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach(e => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach(e => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(e.value), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let t = this.map.get(e.param) || [];
                      const n = t.indexOf(e.value);
                      -1 !== n && t.splice(n, 1),
                        t.length > 0
                          ? this.map.set(e.param, t)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function wl(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function Cl(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function xl(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class Sl {
        constructor(e, t, n, r) {
          let s;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function(e) {
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
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new yl()),
            this.params)
          ) {
            const e = this.params.toString();
            if (0 === e.length) this.urlWithParams = t;
            else {
              const n = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === n ? "?" : n < t.length - 1 ? "&" : "") + e;
            }
          } else (this.params = new _l()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : wl(this.body) ||
              Cl(this.body) ||
              xl(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof _l
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body
            ? null
            : xl(this.body)
            ? null
            : Cl(this.body)
            ? this.body.type || null
            : wl(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof _l
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          const t = e.method || this.method,
            n = e.url || this.url,
            r = e.responseType || this.responseType,
            s = void 0 !== e.body ? e.body : this.body,
            i =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            o =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let a = e.headers || this.headers,
            l = e.params || this.params;
          return (
            void 0 !== e.setHeaders &&
              (a = Object.keys(e.setHeaders).reduce(
                (t, n) => t.set(n, e.setHeaders[n]),
                a
              )),
            e.setParams &&
              (l = Object.keys(e.setParams).reduce(
                (t, n) => t.set(n, e.setParams[n]),
                l
              )),
            new Sl(t, n, s, {
              params: l,
              headers: a,
              reportProgress: o,
              responseType: r,
              withCredentials: i
            })
          );
        }
      }
      const El = (function() {
        var e = {
          Sent: 0,
          UploadProgress: 1,
          ResponseHeader: 2,
          DownloadProgress: 3,
          Response: 4,
          User: 5
        };
        return (
          (e[e.Sent] = "Sent"),
          (e[e.UploadProgress] = "UploadProgress"),
          (e[e.ResponseHeader] = "ResponseHeader"),
          (e[e.DownloadProgress] = "DownloadProgress"),
          (e[e.Response] = "Response"),
          (e[e.User] = "User"),
          e
        );
      })();
      class kl {
        constructor(e, t = 200, n = "OK") {
          (this.headers = e.headers || new yl()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || n),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Tl extends kl {
        constructor(e = {}) {
          super(e), (this.type = El.ResponseHeader);
        }
        clone(e = {}) {
          return new Tl({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0
          });
        }
      }
      class Dl extends kl {
        constructor(e = {}) {
          super(e),
            (this.type = El.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new Dl({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0
          });
        }
      }
      class Al extends kl {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || "(unknown url)"}`
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function Il(e, t) {
        return {
          body: t,
          headers: e.headers,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials
        };
      }
      class Ol {
        constructor(e) {
          this.handler = e;
        }
        request(e, t, n = {}) {
          let r;
          if (e instanceof Sl) r = e;
          else {
            let s = void 0;
            s = n.headers instanceof yl ? n.headers : new yl(n.headers);
            let i = void 0;
            n.params &&
              (i =
                n.params instanceof _l
                  ? n.params
                  : new _l({ fromObject: n.params })),
              (r = new Sl(e, t, void 0 !== n.body ? n.body : null, {
                headers: s,
                params: i,
                reportProgress: n.reportProgress,
                responseType: n.responseType || "json",
                withCredentials: n.withCredentials
              }));
          }
          const s = aa(r).pipe(la(e => this.handler.handle(e)));
          if (e instanceof Sl || "events" === n.observe) return s;
          const i = s.pipe(ua(e => e instanceof Dl));
          switch (n.observe || "body") {
            case "body":
              switch (r.responseType) {
                case "arraybuffer":
                  return i.pipe(
                    H(e => {
                      if (null !== e.body && !(e.body instanceof ArrayBuffer))
                        throw new Error("Response is not an ArrayBuffer.");
                      return e.body;
                    })
                  );
                case "blob":
                  return i.pipe(
                    H(e => {
                      if (null !== e.body && !(e.body instanceof Blob))
                        throw new Error("Response is not a Blob.");
                      return e.body;
                    })
                  );
                case "text":
                  return i.pipe(
                    H(e => {
                      if (null !== e.body && "string" != typeof e.body)
                        throw new Error("Response is not a string.");
                      return e.body;
                    })
                  );
                case "json":
                default:
                  return i.pipe(H(e => e.body));
              }
            case "response":
              return i;
            default:
              throw new Error(
                `Unreachable: unhandled observe type ${n.observe}}`
              );
          }
        }
        delete(e, t = {}) {
          return this.request("DELETE", e, t);
        }
        get(e, t = {}) {
          return this.request("GET", e, t);
        }
        head(e, t = {}) {
          return this.request("HEAD", e, t);
        }
        jsonp(e, t) {
          return this.request("JSONP", e, {
            params: new _l().append(t, "JSONP_CALLBACK"),
            observe: "body",
            responseType: "json"
          });
        }
        options(e, t = {}) {
          return this.request("OPTIONS", e, t);
        }
        patch(e, t, n = {}) {
          return this.request("PATCH", e, Il(n, t));
        }
        post(e, t, n = {}) {
          return this.request("POST", e, Il(n, t));
        }
        put(e, t, n = {}) {
          return this.request("PUT", e, Il(n, t));
        }
      }
      class Rl {
        constructor(e, t) {
          (this.next = e), (this.interceptor = t);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const Nl = new Te("HTTP_INTERCEPTORS");
      class Pl {
        intercept(e, t) {
          return t.handle(e);
        }
      }
      const Ml = /^\)\]\}',?\n/;
      class Vl {}
      class jl {
        constructor() {}
        build() {
          return new XMLHttpRequest();
        }
      }
      class Ul {
        constructor(e) {
          this.xhrFactory = e;
        }
        handle(e) {
          if ("JSONP" === e.method)
            throw new Error(
              "Attempted to construct Jsonp request without JsonpClientModule installed."
            );
          return new w(t => {
            const n = this.xhrFactory.build();
            if (
              (n.open(e.method, e.urlWithParams),
              e.withCredentials && (n.withCredentials = !0),
              e.headers.forEach((e, t) => n.setRequestHeader(e, t.join(","))),
              e.headers.has("Accept") ||
                n.setRequestHeader(
                  "Accept",
                  "application/json, text/plain, */*"
                ),
              !e.headers.has("Content-Type"))
            ) {
              const t = e.detectContentTypeHeader();
              null !== t && n.setRequestHeader("Content-Type", t);
            }
            if (e.responseType) {
              const t = e.responseType.toLowerCase();
              n.responseType = "json" !== t ? t : "text";
            }
            const r = e.serializeBody();
            let s = null;
            const i = () => {
                if (null !== s) return s;
                const t = 1223 === n.status ? 204 : n.status,
                  r = n.statusText || "OK",
                  i = new yl(n.getAllResponseHeaders()),
                  o =
                    (function(e) {
                      return "responseURL" in e && e.responseURL
                        ? e.responseURL
                        : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                        ? e.getResponseHeader("X-Request-URL")
                        : null;
                    })(n) || e.url;
                return (
                  (s = new Tl({
                    headers: i,
                    status: t,
                    statusText: r,
                    url: o
                  })),
                  s
                );
              },
              o = () => {
                let { headers: r, status: s, statusText: o, url: a } = i(),
                  l = null;
                204 !== s &&
                  (l = void 0 === n.response ? n.responseText : n.response),
                  0 === s && (s = l ? 200 : 0);
                let u = s >= 200 && s < 300;
                if ("json" === e.responseType && "string" == typeof l) {
                  const e = l;
                  l = l.replace(Ml, "");
                  try {
                    l = "" !== l ? JSON.parse(l) : null;
                  } catch (c) {
                    (l = e), u && ((u = !1), (l = { error: c, text: l }));
                  }
                }
                u
                  ? (t.next(
                      new Dl({
                        body: l,
                        headers: r,
                        status: s,
                        statusText: o,
                        url: a || void 0
                      })
                    ),
                    t.complete())
                  : t.error(
                      new Al({
                        error: l,
                        headers: r,
                        status: s,
                        statusText: o,
                        url: a || void 0
                      })
                    );
              },
              a = e => {
                const { url: r } = i(),
                  s = new Al({
                    error: e,
                    status: n.status || 0,
                    statusText: n.statusText || "Unknown Error",
                    url: r || void 0
                  });
                t.error(s);
              };
            let l = !1;
            const u = r => {
                l || (t.next(i()), (l = !0));
                let s = { type: El.DownloadProgress, loaded: r.loaded };
                r.lengthComputable && (s.total = r.total),
                  "text" === e.responseType &&
                    n.responseText &&
                    (s.partialText = n.responseText),
                  t.next(s);
              },
              c = e => {
                let n = { type: El.UploadProgress, loaded: e.loaded };
                e.lengthComputable && (n.total = e.total), t.next(n);
              };
            return (
              n.addEventListener("load", o),
              n.addEventListener("error", a),
              e.reportProgress &&
                (n.addEventListener("progress", u),
                null !== r &&
                  n.upload &&
                  n.upload.addEventListener("progress", c)),
              n.send(r),
              t.next({ type: El.Sent }),
              () => {
                n.removeEventListener("error", a),
                  n.removeEventListener("load", o),
                  e.reportProgress &&
                    (n.removeEventListener("progress", u),
                    null !== r &&
                      n.upload &&
                      n.upload.removeEventListener("progress", c)),
                  n.abort();
              }
            );
          });
        }
      }
      const Fl = new Te("XSRF_COOKIE_NAME"),
        Ll = new Te("XSRF_HEADER_NAME");
      class $l {}
      class Hl {
        constructor(e, t, n) {
          (this.doc = e),
            (this.platform = t),
            (this.cookieName = n),
            (this.lastCookieString = ""),
            (this.lastToken = null),
            (this.parseCount = 0);
        }
        getToken() {
          if ("server" === this.platform) return null;
          const e = this.doc.cookie || "";
          return (
            e !== this.lastCookieString &&
              (this.parseCount++,
              (this.lastToken = Ja(e, this.cookieName)),
              (this.lastCookieString = e)),
            this.lastToken
          );
        }
      }
      class zl {
        constructor(e, t) {
          (this.tokenService = e), (this.headerName = t);
        }
        intercept(e, t) {
          const n = e.url.toLowerCase();
          if (
            "GET" === e.method ||
            "HEAD" === e.method ||
            n.startsWith("http://") ||
            n.startsWith("https://")
          )
            return t.handle(e);
          const r = this.tokenService.getToken();
          return (
            null === r ||
              e.headers.has(this.headerName) ||
              (e = e.clone({ headers: e.headers.set(this.headerName, r) })),
            t.handle(e)
          );
        }
      }
      class Bl {
        constructor(e, t) {
          (this.backend = e), (this.injector = t), (this.chain = null);
        }
        handle(e) {
          if (null === this.chain) {
            const e = this.injector.get(Nl, []);
            this.chain = e.reduceRight((e, t) => new Rl(e, t), this.backend);
          }
          return this.chain.handle(e);
        }
      }
      class ql {
        static disable() {
          return { ngModule: ql, providers: [{ provide: zl, useClass: Pl }] };
        }
        static withOptions(e = {}) {
          return {
            ngModule: ql,
            providers: [
              e.cookieName ? { provide: Fl, useValue: e.cookieName } : [],
              e.headerName ? { provide: Ll, useValue: e.headerName } : []
            ]
          };
        }
      }
      class Wl {}
      var Gl = n("ORT8");
      class Zl {
        constructor() {}
        static clone(e) {
          if (e) {
            if (Array.isArray(e)) {
              const t = [];
              return e.forEach(e => t.push(this.clone(e))), t;
            }
            if ("object" == typeof e) {
              const t = {};
              return Object.keys(e).forEach(n => (t[n] = this.clone(e[n]))), t;
            }
            return e;
          }
          return e;
        }
        static isPrimitive(e) {
          return (
            "string" == typeof e ||
            "number" == typeof e ||
            "boolean" == typeof e
          );
        }
        static default(e, t) {
          return e || t;
        }
        static isSameObject(e, t) {
          if (e === t) return !0;
          if ("number" == typeof e && e.toString() === t.toString()) return !0;
          if (
            void 0 === e ||
            void 0 === t ||
            (Array.isArray(e) && !Array.isArray(t)) ||
            (!Array.isArray(e) && Array.isArray(t)) ||
            (Array.isArray(e) && Array.isArray(t) && e.length !== t.length)
          )
            return !1;
          if (Array.isArray(e) && Array.isArray(t)) {
            let n = 0;
            for (const r of e) {
              if (!this.isSameObject(r, t[n])) return !1;
              n++;
            }
            return !0;
          }
          for (const n of Object.keys(e)) {
            if ((!t[n] && e[n]) || (t[n] && !e[n])) return !1;
            if (Array.isArray(e[n])) {
              if (!this.isSameObject(e[n], t[n])) return !1;
            } else if ("object" == typeof e[n]) {
              if (!this.isSameObject(e[n], t[n])) return !1;
            } else if (e[n] && t[n] && e[n].toString() !== t[n].toString())
              return !1;
          }
          return !0;
        }
      }
      class Ql {
        constructor() {}
        setEnvironment(e) {
          e &&
            ((this.api = Zl.default(e.api, "http://localhost:3000")),
            (this.extract = Zl.default(e.extract, "gnExtract")),
            e.pagination &&
              ((this.pageIndex = Zl.default(
                e.pagination.pageIndex,
                "gnPageIndex"
              )),
              (this.pageSize = Zl.default(e.pagination.pageSize, "gnPageSize")),
              (this.results = Zl.default(
                e.pagination.results,
                "gnPageResults"
              )),
              (this.totalResults = Zl.default(
                e.pagination.totalResults,
                "gnPageTotalResults"
              ))));
        }
      }
      class Kl {
        constructor(e, t, n) {
          (this.http = e),
            (this.geneseEnvironment = t),
            (this.tConstructor = n),
            (this.geneseMapperService = new Gl.GeneseMapper(n));
        }
        create(e, t) {
          return (
            this.checkTType(e),
            this.http
              .post(
                this.apiRoot(this.getStandardPath()),
                e,
                this.getRequestOptions(t)
              )
              .pipe(
                H(e =>
                  t && !1 === t.mapData ? e : this.geneseMapperService.map(e)
                )
              )
          );
        }
        createCustom(e, t, n) {
          return (
            this.checkPath(e),
            (t = Zl.default(t, {})),
            this.http
              .post(this.apiRoot(e), t, this.getRequestOptions(n))
              .pipe(
                H(e =>
                  n && !1 === n.mapData ? e : this.geneseMapperService.map(e)
                )
              )
          );
        }
        delete(e) {
          return (
            this.checkId(e),
            this.http
              .delete(`${this.apiRoot(this.getStandardPath())}/${e}`, {
                observe: "response"
              })
              .pipe(H(e => (e && !0 === e.ok ? "SUCCESS" : "FAILED")))
          );
        }
        deleteCustom(e, t) {
          this.checkPath(e);
          const n = this.apiRoot(e);
          return (
            (t = Zl.default(t, {})),
            Object.assign(t, { observe: "response" }),
            this.http
              .delete(n, t)
              .pipe(H(e => (e && !0 === e.ok ? "SUCCESS" : "FAILED")))
          );
        }
        fetch(e, t, n) {
          return (
            (r = this),
            void 0,
            (i = function*() {
              if (!t || !e)
                return (
                  console.error(
                    "Incorrect parameters : impossible to send request"
                  ),
                  Promise.reject(
                    "Incorrect parameters : impossible to send request"
                  )
                );
              const r = this.apiRoot(e),
                s = yield fetch(r, n),
                i = yield s.clone().json();
              return this.geneseMapperService.map(
                "delete" === t ? (i ? i.body : void 0) : i
              );
            }),
            new ((s = void 0) || (s = Promise))(function(e, t) {
              function n(e) {
                try {
                  a(i.next(e));
                } catch (n) {
                  t(n);
                }
              }
              function o(e) {
                try {
                  a(i.throw(e));
                } catch (n) {
                  t(n);
                }
              }
              function a(t) {
                var r;
                t.done
                  ? e(t.value)
                  : ((r = t.value),
                    r instanceof s
                      ? r
                      : new s(function(e) {
                          e(r);
                        })).then(n, o);
              }
              a((i = i.apply(r, [])).next());
            })
          );
          var r, s, i;
        }
        getAll(e) {
          let t = new _l();
          if (e && e.filters)
            for (const s of Object.keys(e.filters))
              e.filters[s] && (t = t.set(s, e.filters[s].toString()));
          const n = { params: t },
            r = this.apiRoot(this.getStandardPath());
          return this.http
            .get(r, n)
            .pipe(H(e => (e ? this.geneseMapperService.arrayMap(e) : [])));
        }
        getAllCustom(e, t, n) {
          if (!e)
            return (
              console.error("No path : impossible to get elements"), aa(void 0)
            );
          let r = new _l();
          if (n && n.params) {
            for (const e of Object.keys(n.params))
              n.params[e] && (r = r.set(e, n.params[e].toString()));
            delete n.params;
          }
          if (t && t.filters)
            for (const o of Object.keys(t.filters))
              t.filters[o] && (r = r.set(o, t.filters[o].toString()));
          const s = Object.assign({}, { params: r }, n),
            i = this.apiRoot(e);
          return this.http
            .get(i, s)
            .pipe(H(e => (e ? this.geneseMapperService.arrayMap(e) : [])));
        }
        getAllWithPagination(e, t) {
          if (!e)
            return (
              console.error("No path : impossible to get paginated elements"),
              aa(void 0)
            );
          if (!t || !t.pageSize)
            return (
              console.error(
                "Incorrect parameters : impossible to get paginated elements. The parameter pageSize must be defined."
              ),
              aa(void 0)
            );
          let n = new _l();
          if (
            t &&
            (void 0 !== t.pageIndex &&
              (n = n.set(
                this.geneseEnvironment.pageIndex,
                t.pageIndex.toString()
              )),
            void 0 !== t.pageSize &&
              (n = n.set(
                this.geneseEnvironment.pageSize,
                t.pageSize.toString()
              )),
            t.filters)
          )
            for (const i of Object.keys(t.filters))
              t.filters[i] && (n = n.set(i, t.filters[i].toString()));
          const r = { params: n },
            s = this.apiRoot(e);
          return this.http
            .get(s, r)
            .pipe(
              H(e =>
                e && this.isPaginatedResponse(e)
                  ? {
                      results: this.geneseMapperService.arrayMap(
                        e[this.geneseEnvironment.results]
                      ),
                      totalResults: e[this.geneseEnvironment.totalResults]
                    }
                  : void console.error(
                      "Response is not paginated. Please verify that the response includes an array corresponding to your Genese pagination environment."
                    )
              )
            );
        }
        getArray() {
          this.checkIfTTypeIsArrayResponseType();
          const e = this.apiRoot(this.getStandardPath());
          return this.http.get(e).pipe(
            H(e => {
              const t = { gnArrayResponse: e };
              return this.geneseMapperService.map(t)
                ? this.geneseMapperService.map(t).gnArrayResponse
                : void 0;
            })
          );
        }
        getOne(e) {
          this.checkId(e);
          const t = this.apiRoot(this.getStandardPath(), e);
          return this.http.get(t).pipe(H(e => this.geneseMapperService.map(e)));
        }
        getOneCustom(e, t) {
          this.checkPath(e);
          let n = new _l();
          if (t && t.filters)
            for (const i of Object.keys(t.filters))
              t.filters[i] && (n = n.set(i, t.filters[i].toString()));
          const r = { params: n },
            s = this.apiRoot(e);
          return this.http
            .get(s, r)
            .pipe(H(e => this.geneseMapperService.map(e)));
        }
        request(e, t, n) {
          if ((this.checkPath(e), !t))
            throw Error("Incorrect Genese method : impossible to send request");
          (n = Zl.default(n, {})).headers ||
            ("post" !== t && "put" !== t && "patch" !== t) ||
            (n.headers = { "Content-Type": "application/json" }),
            n.observe || "delete" !== t || (n.observe = "response");
          const r = this.apiRoot(e, n.id);
          return this.http
            .request(t, r, n)
            .pipe(
              H(e =>
                "delete" === t
                  ? n && !1 === n.mapData
                    ? e
                    : this.geneseMapperService.map(e ? e.body : void 0)
                  : n && !1 === n.mapData
                  ? e
                  : this.geneseMapperService.map(e)
              )
            );
        }
        update(e, t, n) {
          return (
            this.checkId(e),
            this.checkTType(t),
            (n = Object.assign(this.getRequestOptions(n), { observe: "body" })),
            this.http
              .put(this.apiRoot(this.getStandardPath()), t, n)
              .pipe(
                H(e =>
                  n && !1 === n.mapData ? e : this.geneseMapperService.map(e)
                )
              )
          );
        }
        updateCustom(e, t, n) {
          return (
            this.checkPath(e),
            (t = Zl.default(t, {})),
            (n = Object.assign(this.getRequestOptions(n), { observe: "body" })),
            this.http
              .put(this.apiRoot(e), t, n)
              .pipe(
                H(e =>
                  n && !1 === n.mapData ? e : this.geneseMapperService.map(e)
                )
              )
          );
        }
        apiRoot(e, t) {
          const n = e
            ? this.geneseEnvironment.api + e
            : this.geneseEnvironment.api;
          return t ? `${n}/${t}` : n;
        }
        checkId(e) {
          if (!(e && +e > 0)) throw Error("Incorrect Genese id.");
        }
        checkIfTTypeIsArrayResponseType() {
          if (!new this.tConstructor().gnArrayResponse)
            throw Error("The model must contain the gnArrayResponse property.");
        }
        checkPath(e) {
          if (!e || "string" != typeof e) throw Error("Incorrect Genese path.");
        }
        checkTType(e) {
          if (!e) throw Error("Genese : there is no T object.");
          if (e === {}) throw Error("Genese : empty object.");
          if (Array.isArray(e))
            throw Error("Genese : an array is not a T object.");
          const t = new this.tConstructor();
          Object.keys(e).forEach(e => {
            if (!t.hasOwnProperty(e))
              throw Error("Genese : the object is not a T object");
          });
        }
        getRequestOptions(e) {
          return (
            ((e = Zl.default(e, {})).headers = Zl.default(e.headers, {
              "Content-Type": "application/json"
            })),
            Object.assign(e, { observe: "body" })
          );
        }
        isPaginatedResponse(e) {
          return e && Array.isArray(e[this.geneseEnvironment.results]);
        }
        getStandardPath() {
          const e = new this.geneseMapperService.tConstructor();
          if (e.genese && e.genese.path) return e.genese.path;
          throw Error(
            "No Genese path environment for the model  : impossible to get element."
          );
        }
        translate(e, t) {
          return t
            ? this.geneseMapperService.translate(e, t)
            : void console.error(
                "No data or no language : impossible to get element"
              );
        }
      }
      class Yl {
        constructor(e, t) {
          (this.http = e), (this.geneseEnvironment = t);
        }
        getGeneseInstance(e) {
          if (e) return new Kl(this.http, this.geneseEnvironment, e);
        }
      }
      function Jl(e, t) {
        return new Yl(e, t);
      }
      class Xl {
        static forRoot() {
          return {
            ngModule: Xl,
            providers: [Ql, Zl, { provide: Yl, deps: [Ol, Ql], useFactory: Jl }]
          };
        }
      }
      class eu {
        constructor() {
          this.pagination = {
            pageIndex: "gnPageIndex",
            pageSize: "gnPageSize",
            results: "gnResults",
            totalResults: "gnTotalResults"
          };
        }
      }
      class tu {
        constructor(e, t, n, r) {
          (this.geneseEnvironmentService = e),
            (this.router = t),
            (this.swPush = n),
            (this.notificationService = r),
            (this.title = "Tambola");
          const s = new eu();
          (s.api = "https://game-tambola.herokuapp.com/"), e.setEnvironment(s);
        }
        ngOnInit() {
          this.notificationService.subscribeForPushNotification(),
            this.swPush.notificationClicks.subscribe(e => {
              console.log("Received notification: ", e),
                this.router.navigate(["home"]);
            });
            this.swPush.message.subscribe(e => {
                console.log("Received message: ", e),
                  this.router.navigate(["home"]);
              });
        }
      }
      let nu = null;
      function ru() {
        return nu;
      }
      const su = {
          class: "className",
          innerHtml: "innerHTML",
          readonly: "readOnly",
          tabindex: "tabIndex"
        },
        iu = {
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
          Win: "OS"
        },
        ou = {
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
          "\x90": "NumLock"
        },
        au = (() => {
          if (ke.Node)
            return (
              ke.Node.prototype.contains ||
              function(e) {
                return !!(16 & this.compareDocumentPosition(e));
              }
            );
        })();
      class lu extends class extends class {
        constructor() {
          this.resourceLoaderType = null;
        }
        get attrToPropMap() {
          return this._attrToPropMap;
        }
        set attrToPropMap(e) {
          this._attrToPropMap = e;
        }
      } {
        constructor() {
          super(), (this._animationPrefix = null), (this._transitionEnd = null);
          try {
            const e = this.createElement("div", document);
            if (null != this.getStyle(e, "animationName"))
              this._animationPrefix = "";
            else {
              const t = ["Webkit", "Moz", "O", "ms"];
              for (let n = 0; n < t.length; n++)
                if (null != this.getStyle(e, t[n] + "AnimationName")) {
                  this._animationPrefix = "-" + t[n].toLowerCase() + "-";
                  break;
                }
            }
            const t = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend"
            };
            Object.keys(t).forEach(n => {
              null != this.getStyle(e, n) && (this._transitionEnd = t[n]);
            });
          } catch (e) {
            (this._animationPrefix = null), (this._transitionEnd = null);
          }
        }
        getDistributedNodes(e) {
          return e.getDistributedNodes();
        }
        resolveAndSetHref(e, t, n) {
          e.href = null == n ? t : t + "/../" + n;
        }
        supportsDOMEvents() {
          return !0;
        }
        supportsNativeShadowDOM() {
          return "function" == typeof document.body.createShadowRoot;
        }
        getAnimationPrefix() {
          return this._animationPrefix ? this._animationPrefix : "";
        }
        getTransitionEnd() {
          return this._transitionEnd ? this._transitionEnd : "";
        }
        supportsAnimation() {
          return null != this._animationPrefix && null != this._transitionEnd;
        }
      } {
        parse(e) {
          throw new Error("parse not implemented");
        }
        static makeCurrent() {
          var e;
          (e = new lu()), nu || (nu = e);
        }
        hasProperty(e, t) {
          return t in e;
        }
        setProperty(e, t, n) {
          e[t] = n;
        }
        getProperty(e, t) {
          return e[t];
        }
        invoke(e, t, n) {
          e[t](...n);
        }
        logError(e) {
          window.console && (console.error ? console.error(e) : console.log(e));
        }
        log(e) {
          window.console && window.console.log && window.console.log(e);
        }
        logGroup(e) {
          window.console && window.console.group && window.console.group(e);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        get attrToPropMap() {
          return su;
        }
        contains(e, t) {
          return au.call(e, t);
        }
        querySelector(e, t) {
          return e.querySelector(t);
        }
        querySelectorAll(e, t) {
          return e.querySelectorAll(t);
        }
        on(e, t, n) {
          e.addEventListener(t, n, !1);
        }
        onAndCancel(e, t, n) {
          return (
            e.addEventListener(t, n, !1),
            () => {
              e.removeEventListener(t, n, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        createMouseEvent(e) {
          const t = this.getDefaultDocument().createEvent("MouseEvent");
          return t.initEvent(e, !0, !0), t;
        }
        createEvent(e) {
          const t = this.getDefaultDocument().createEvent("Event");
          return t.initEvent(e, !0, !0), t;
        }
        preventDefault(e) {
          e.preventDefault(), (e.returnValue = !1);
        }
        isPrevented(e) {
          return (
            e.defaultPrevented || (null != e.returnValue && !e.returnValue)
          );
        }
        getInnerHTML(e) {
          return e.innerHTML;
        }
        getTemplateContent(e) {
          return "content" in e && this.isTemplateElement(e) ? e.content : null;
        }
        getOuterHTML(e) {
          return e.outerHTML;
        }
        nodeName(e) {
          return e.nodeName;
        }
        nodeValue(e) {
          return e.nodeValue;
        }
        type(e) {
          return e.type;
        }
        content(e) {
          return this.hasProperty(e, "content") ? e.content : e;
        }
        firstChild(e) {
          return e.firstChild;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        parentElement(e) {
          return e.parentNode;
        }
        childNodes(e) {
          return e.childNodes;
        }
        childNodesAsList(e) {
          const t = e.childNodes,
            n = new Array(t.length);
          for (let r = 0; r < t.length; r++) n[r] = t[r];
          return n;
        }
        clearNodes(e) {
          for (; e.firstChild; ) e.removeChild(e.firstChild);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        removeChild(e, t) {
          e.removeChild(t);
        }
        replaceChild(e, t, n) {
          e.replaceChild(t, n);
        }
        remove(e) {
          return e.parentNode && e.parentNode.removeChild(e), e;
        }
        insertBefore(e, t, n) {
          e.insertBefore(n, t);
        }
        insertAllBefore(e, t, n) {
          n.forEach(n => e.insertBefore(n, t));
        }
        insertAfter(e, t, n) {
          e.insertBefore(n, t.nextSibling);
        }
        setInnerHTML(e, t) {
          e.innerHTML = t;
        }
        getText(e) {
          return e.textContent;
        }
        setText(e, t) {
          e.textContent = t;
        }
        getValue(e) {
          return e.value;
        }
        setValue(e, t) {
          e.value = t;
        }
        getChecked(e) {
          return e.checked;
        }
        setChecked(e, t) {
          e.checked = t;
        }
        createComment(e) {
          return this.getDefaultDocument().createComment(e);
        }
        createTemplate(e) {
          const t = this.getDefaultDocument().createElement("template");
          return (t.innerHTML = e), t;
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createElementNS(e, t, n) {
          return (n = n || this.getDefaultDocument()).createElementNS(e, t);
        }
        createTextNode(e, t) {
          return (t = t || this.getDefaultDocument()).createTextNode(e);
        }
        createScriptTag(e, t, n) {
          const r = (n = n || this.getDefaultDocument()).createElement(
            "SCRIPT"
          );
          return r.setAttribute(e, t), r;
        }
        createStyleElement(e, t) {
          const n = (t = t || this.getDefaultDocument()).createElement("style");
          return this.appendChild(n, this.createTextNode(e, t)), n;
        }
        createShadowRoot(e) {
          return e.createShadowRoot();
        }
        getShadowRoot(e) {
          return e.shadowRoot;
        }
        getHost(e) {
          return e.host;
        }
        clone(e) {
          return e.cloneNode(!0);
        }
        getElementsByClassName(e, t) {
          return e.getElementsByClassName(t);
        }
        getElementsByTagName(e, t) {
          return e.getElementsByTagName(t);
        }
        classList(e) {
          return Array.prototype.slice.call(e.classList, 0);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        hasClass(e, t) {
          return e.classList.contains(t);
        }
        setStyle(e, t, n) {
          e.style[t] = n;
        }
        removeStyle(e, t) {
          e.style[t] = "";
        }
        getStyle(e, t) {
          return e.style[t];
        }
        hasStyle(e, t, n) {
          const r = this.getStyle(e, t) || "";
          return n ? r == n : r.length > 0;
        }
        tagName(e) {
          return e.tagName;
        }
        attributeMap(e) {
          const t = new Map(),
            n = e.attributes;
          for (let r = 0; r < n.length; r++) {
            const e = n.item(r);
            t.set(e.name, e.value);
          }
          return t;
        }
        hasAttribute(e, t) {
          return e.hasAttribute(t);
        }
        hasAttributeNS(e, t, n) {
          return e.hasAttributeNS(t, n);
        }
        getAttribute(e, t) {
          return e.getAttribute(t);
        }
        getAttributeNS(e, t, n) {
          return e.getAttributeNS(t, n);
        }
        setAttribute(e, t, n) {
          e.setAttribute(t, n);
        }
        setAttributeNS(e, t, n, r) {
          e.setAttributeNS(t, n, r);
        }
        removeAttribute(e, t) {
          e.removeAttribute(t);
        }
        removeAttributeNS(e, t, n) {
          e.removeAttributeNS(t, n);
        }
        templateAwareRoot(e) {
          return this.isTemplateElement(e) ? this.content(e) : e;
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        getBoundingClientRect(e) {
          try {
            return e.getBoundingClientRect();
          } catch (t) {
            return {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: 0,
              height: 0
            };
          }
        }
        getTitle(e) {
          return e.title;
        }
        setTitle(e, t) {
          e.title = t || "";
        }
        elementMatches(e, t) {
          return (
            !!this.isElementNode(e) &&
            ((e.matches && e.matches(t)) ||
              (e.msMatchesSelector && e.msMatchesSelector(t)) ||
              (e.webkitMatchesSelector && e.webkitMatchesSelector(t)))
          );
        }
        isTemplateElement(e) {
          return this.isElementNode(e) && "TEMPLATE" === e.nodeName;
        }
        isTextNode(e) {
          return e.nodeType === Node.TEXT_NODE;
        }
        isCommentNode(e) {
          return e.nodeType === Node.COMMENT_NODE;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        hasShadowRoot(e) {
          return null != e.shadowRoot && e instanceof HTMLElement;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        importIntoDoc(e) {
          return document.importNode(this.templateAwareRoot(e), !0);
        }
        adoptNode(e) {
          return document.adoptNode(e);
        }
        getHref(e) {
          return e.getAttribute("href");
        }
        getEventKey(e) {
          let t = e.key;
          if (null == t) {
            if (((t = e.keyIdentifier), null == t)) return "Unidentified";
            t.startsWith("U+") &&
              ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
              3 === e.location && ou.hasOwnProperty(t) && (t = ou[t]));
          }
          return iu[t] || t;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(e) {
          const t =
            cu || ((cu = document.querySelector("base")), cu)
              ? cu.getAttribute("href")
              : null;
          return null == t
            ? null
            : ((n = t),
              uu || (uu = document.createElement("a")),
              uu.setAttribute("href", n),
              "/" === uu.pathname.charAt(0) ? uu.pathname : "/" + uu.pathname);
          var n;
        }
        resetBaseElement() {
          cu = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        setData(e, t, n) {
          this.setAttribute(e, "data-" + t, n);
        }
        getData(e, t) {
          return this.getAttribute(e, "data-" + t);
        }
        getComputedStyle(e) {
          return getComputedStyle(e);
        }
        supportsWebAnimation() {
          return "function" == typeof Element.prototype.animate;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(e) {
          return Ja(document.cookie, e);
        }
        setCookie(e, t) {
          document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        }
      }
      let uu,
        cu = null;
      function hu() {
        return !!window.history.pushState;
      }
      const du = new Te("TRANSITION_ID"),
        pu = [
          {
            provide: Cs,
            useFactory: function(e, t, n) {
              return () => {
                n.get(xs).donePromise.then(() => {
                  const n = ru();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(t, "style[ng-transition]"))
                    .filter(t => n.getAttribute(t, "ng-transition") === e)
                    .forEach(e => n.remove(e));
                });
              };
            },
            deps: [du, hl, Tt],
            multi: !0
          }
        ];
      class fu {
        static init() {
          var e;
          (e = new fu()), (ii = e);
        }
        addToWindow(e) {
          (ke.getAngularTestability = (t, n = !0) => {
            const r = e.findTestabilityInTree(t, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (ke.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (ke.getAllAngularRootElements = () => e.getAllRootElements()),
            ke.frameworkStabilizers || (ke.frameworkStabilizers = []),
            ke.frameworkStabilizers.push(e => {
              const t = ke.getAllAngularTestabilities();
              let n = t.length,
                r = !1;
              const s = function(t) {
                (r = r || t), n--, 0 == n && e(r);
              };
              t.forEach(function(e) {
                e.whenStable(s);
              });
            });
        }
        findTestabilityInTree(e, t, n) {
          if (null == t) return null;
          const r = e.getTestability(t);
          return null != r
            ? r
            : n
            ? ru().isShadowRoot(t)
              ? this.findTestabilityInTree(e, ru().getHost(t), !0)
              : this.findTestabilityInTree(e, ru().parentElement(t), !0)
            : null;
        }
      }
      function gu(e, t) {
        ("undefined" != typeof COMPILED && COMPILED) ||
          ((ke.ng = ke.ng || {})[e] = t);
      }
      const mu = (() => ({ ApplicationRef: di, NgZone: Zs }))();
      function yu(e) {
        return xi(e);
      }
      const bu = new Te("EventManagerPlugins");
      class vu {
        constructor(e, t) {
          (this._zone = t),
            (this._eventNameToPlugin = new Map()),
            e.forEach(e => (e.manager = this)),
            (this._plugins = e.slice().reverse());
        }
        addEventListener(e, t, n) {
          return this._findPluginFor(t).addEventListener(e, t, n);
        }
        addGlobalEventListener(e, t, n) {
          return this._findPluginFor(t).addGlobalEventListener(e, t, n);
        }
        getZone() {
          return this._zone;
        }
        _findPluginFor(e) {
          const t = this._eventNameToPlugin.get(e);
          if (t) return t;
          const n = this._plugins;
          for (let r = 0; r < n.length; r++) {
            const t = n[r];
            if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t;
          }
          throw new Error(`No event manager plugin found for event ${e}`);
        }
      }
      class _u {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, n) {
          const r = ru().getGlobalEventTarget(this._doc, e);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${t}`);
          return this.addEventListener(r, t, n);
        }
      }
      class wu {
        constructor() {
          this._stylesSet = new Set();
        }
        addStyles(e) {
          const t = new Set();
          e.forEach(e => {
            this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e));
          }),
            this.onStylesAdded(t);
        }
        onStylesAdded(e) {}
        getAllStyles() {
          return Array.from(this._stylesSet);
        }
      }
      class Cu extends wu {
        constructor(e) {
          super(),
            (this._doc = e),
            (this._hostNodes = new Set()),
            (this._styleNodes = new Set()),
            this._hostNodes.add(e.head);
        }
        _addStylesToHost(e, t) {
          e.forEach(e => {
            const n = this._doc.createElement("style");
            (n.textContent = e), this._styleNodes.add(t.appendChild(n));
          });
        }
        addHost(e) {
          this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
        }
        removeHost(e) {
          this._hostNodes.delete(e);
        }
        onStylesAdded(e) {
          this._hostNodes.forEach(t => this._addStylesToHost(e, t));
        }
        ngOnDestroy() {
          this._styleNodes.forEach(e => ru().remove(e));
        }
      }
      const xu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/"
        },
        Su = /%COMP%/g;
      function Eu(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let s = t[r];
          Array.isArray(s) ? Eu(e, s, n) : ((s = s.replace(Su, e)), n.push(s));
        }
        return n;
      }
      function ku(e) {
        return t => {
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      class Tu {
        constructor(e, t, n) {
          (this.eventManager = e),
            (this.sharedStylesHost = t),
            (this.appId = n),
            (this.rendererByCompId = new Map()),
            (this.defaultRenderer = new Du(e));
        }
        createRenderer(e, t) {
          if (!e || !t) return this.defaultRenderer;
          switch (t.encapsulation) {
            case $e.Emulated: {
              let n = this.rendererByCompId.get(t.id);
              return (
                n ||
                  ((n = new Ou(
                    this.eventManager,
                    this.sharedStylesHost,
                    t,
                    this.appId
                  )),
                  this.rendererByCompId.set(t.id, n)),
                n.applyToHost(e),
                n
              );
            }
            case $e.Native:
            case $e.ShadowDom:
              return new Ru(this.eventManager, this.sharedStylesHost, e, t);
            default:
              if (!this.rendererByCompId.has(t.id)) {
                const e = Eu(t.id, t.styles, []);
                this.sharedStylesHost.addStyles(e),
                  this.rendererByCompId.set(t.id, this.defaultRenderer);
              }
              return this.defaultRenderer;
          }
        }
        begin() {}
        end() {}
      }
      class Du {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(xu[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, n) {
          e && e.insertBefore(t, n);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let n = "string" == typeof e ? document.querySelector(e) : e;
          if (!n)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (n.textContent = ""), n;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, n, r) {
          if (r) {
            t = r + ":" + t;
            const s = xu[r];
            s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n);
          } else e.setAttribute(t, n);
        }
        removeAttribute(e, t, n) {
          if (n) {
            const r = xu[n];
            r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, n, r) {
          r & sn.DashCase
            ? e.style.setProperty(t, n, r & sn.Important ? "important" : "")
            : (e.style[t] = n);
        }
        removeStyle(e, t, n) {
          n & sn.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, n) {
          Iu(t, "property"), (e[t] = n);
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, n) {
          return (
            Iu(t, "listener"),
            "string" == typeof e
              ? this.eventManager.addGlobalEventListener(e, t, ku(n))
              : this.eventManager.addEventListener(e, t, ku(n))
          );
        }
      }
      const Au = (() => "@".charCodeAt(0))();
      function Iu(e, t) {
        if (e.charCodeAt(0) === Au)
          throw new Error(
            `Found the synthetic ${t} ${e}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`
          );
      }
      class Ou extends Du {
        constructor(e, t, n, r) {
          super(e), (this.component = n);
          const s = Eu(r + "-" + n.id, n.styles, []);
          t.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Su,
              r + "-" + n.id
            )),
            (this.hostAttr = (function(e) {
              return "_nghost-%COMP%".replace(Su, e);
            })(r + "-" + n.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const n = super.createElement(e, t);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class Ru extends Du {
        constructor(e, t, n, r) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = n),
            (this.component = r),
            (this.shadowRoot =
              r.encapsulation === $e.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Eu(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const e = document.createElement("style");
            (e.textContent = s[i]), this.shadowRoot.appendChild(e);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, n) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      const Nu = (() =>
          ("undefined" != typeof Zone && Zone.__symbol__) ||
          function(e) {
            return "__zone_symbol__" + e;
          })(),
        Pu = Nu("addEventListener"),
        Mu = Nu("removeEventListener"),
        Vu = {},
        ju = "__zone_symbol__propagationStopped",
        Uu = (() => {
          const e =
            "undefined" != typeof Zone && Zone[Nu("BLACK_LISTED_EVENTS")];
          if (e) {
            const t = {};
            return (
              e.forEach(e => {
                t[e] = e;
              }),
              t
            );
          }
        })(),
        Fu = function(e) {
          return !!Uu && Uu.hasOwnProperty(e);
        },
        Lu = function(e) {
          const t = Vu[e.type];
          if (!t) return;
          const n = this[t];
          if (!n) return;
          const r = [e];
          if (1 === n.length) {
            const e = n[0];
            return e.zone !== Zone.current
              ? e.zone.run(e.handler, this, r)
              : e.handler.apply(this, r);
          }
          {
            const t = n.slice();
            for (let n = 0; n < t.length && !0 !== e[ju]; n++) {
              const e = t[n];
              e.zone !== Zone.current
                ? e.zone.run(e.handler, this, r)
                : e.handler.apply(this, r);
            }
          }
        };
      class $u extends _u {
        constructor(e, t, n) {
          super(e),
            (this.ngZone = t),
            (n &&
              (function(e) {
                return "server" === e;
              })(n)) ||
              this.patchEvent();
        }
        patchEvent() {
          if ("undefined" == typeof Event || !Event || !Event.prototype) return;
          if (Event.prototype.__zone_symbol__stopImmediatePropagation) return;
          const e = (Event.prototype.__zone_symbol__stopImmediatePropagation =
            Event.prototype.stopImmediatePropagation);
          Event.prototype.stopImmediatePropagation = function() {
            this && (this[ju] = !0), e && e.apply(this, arguments);
          };
        }
        supports(e) {
          return !0;
        }
        addEventListener(e, t, n) {
          let r = n;
          if (!e[Pu] || (Zs.isInAngularZone() && !Fu(t)))
            e.addEventListener(t, r, !1);
          else {
            let n = Vu[t];
            n || (n = Vu[t] = Nu("ANGULAR" + t + "FALSE"));
            let s = e[n];
            const i = s && s.length > 0;
            s || (s = e[n] = []);
            const o = Fu(t) ? Zone.root : Zone.current;
            if (0 === s.length) s.push({ zone: o, handler: r });
            else {
              let e = !1;
              for (let t = 0; t < s.length; t++)
                if (s[t].handler === r) {
                  e = !0;
                  break;
                }
              e || s.push({ zone: o, handler: r });
            }
            i || e[Pu](t, Lu, !1);
          }
          return () => this.removeEventListener(e, t, r);
        }
        removeEventListener(e, t, n) {
          let r = e[Mu];
          if (!r) return e.removeEventListener.apply(e, [t, n, !1]);
          let s = Vu[t],
            i = s && e[s];
          if (!i) return e.removeEventListener.apply(e, [t, n, !1]);
          let o = !1;
          for (let a = 0; a < i.length; a++)
            if (i[a].handler === n) {
              (o = !0), i.splice(a, 1);
              break;
            }
          o
            ? 0 === i.length && r.apply(e, [t, Lu, !1])
            : e.removeEventListener.apply(e, [t, n, !1]);
        }
      }
      const Hu = {
          pan: !0,
          panstart: !0,
          panmove: !0,
          panend: !0,
          pancancel: !0,
          panleft: !0,
          panright: !0,
          panup: !0,
          pandown: !0,
          pinch: !0,
          pinchstart: !0,
          pinchmove: !0,
          pinchend: !0,
          pinchcancel: !0,
          pinchin: !0,
          pinchout: !0,
          press: !0,
          pressup: !0,
          rotate: !0,
          rotatestart: !0,
          rotatemove: !0,
          rotateend: !0,
          rotatecancel: !0,
          swipe: !0,
          swipeleft: !0,
          swiperight: !0,
          swipeup: !0,
          swipedown: !0,
          tap: !0
        },
        zu = new Te("HammerGestureConfig"),
        Bu = new Te("HammerLoader");
      class qu {
        constructor() {
          (this.events = []), (this.overrides = {});
        }
        buildHammer(e) {
          const t = new Hammer(e, this.options);
          t.get("pinch").set({ enable: !0 }),
            t.get("rotate").set({ enable: !0 });
          for (const n in this.overrides) t.get(n).set(this.overrides[n]);
          return t;
        }
      }
      class Wu extends _u {
        constructor(e, t, n, r) {
          super(e), (this._config = t), (this.console = n), (this.loader = r);
        }
        supports(e) {
          return !(
            (!Hu.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e)) ||
            (!window.Hammer &&
              !this.loader &&
              (this.console.warn(
                `The "${e}" event cannot be bound because Hammer.JS is not ` +
                  "loaded and no custom loader has been specified."
              ),
              1))
          );
        }
        addEventListener(e, t, n) {
          const r = this.manager.getZone();
          if (((t = t.toLowerCase()), !window.Hammer && this.loader)) {
            let r = !1,
              s = () => {
                r = !0;
              };
            return (
              this.loader()
                .then(() => {
                  if (!window.Hammer)
                    return (
                      this.console.warn(
                        "The custom HAMMER_LOADER completed, but Hammer.JS is not present."
                      ),
                      void (s = () => {})
                    );
                  r || (s = this.addEventListener(e, t, n));
                })
                .catch(() => {
                  this.console.warn(
                    `The "${t}" event cannot be bound because the custom ` +
                      "Hammer.JS loader failed."
                  ),
                    (s = () => {});
                }),
              () => {
                s();
              }
            );
          }
          return r.runOutsideAngular(() => {
            const s = this._config.buildHammer(e),
              i = function(e) {
                r.runGuarded(function() {
                  n(e);
                });
              };
            return (
              s.on(t, i),
              () => {
                s.off(t, i), "function" == typeof s.destroy && s.destroy();
              }
            );
          });
        }
        isCustomEvent(e) {
          return this._config.events.indexOf(e) > -1;
        }
      }
      const Gu = ["alt", "control", "meta", "shift"],
        Zu = {
          alt: e => e.altKey,
          control: e => e.ctrlKey,
          meta: e => e.metaKey,
          shift: e => e.shiftKey
        };
      class Qu extends _u {
        constructor(e) {
          super(e);
        }
        supports(e) {
          return null != Qu.parseEventName(e);
        }
        addEventListener(e, t, n) {
          const r = Qu.parseEventName(t),
            s = Qu.eventCallback(r.fullKey, n, this.manager.getZone());
          return this.manager
            .getZone()
            .runOutsideAngular(() => ru().onAndCancel(e, r.domEventName, s));
        }
        static parseEventName(e) {
          const t = e.toLowerCase().split("."),
            n = t.shift();
          if (0 === t.length || ("keydown" !== n && "keyup" !== n)) return null;
          const r = Qu._normalizeKey(t.pop());
          let s = "";
          if (
            (Gu.forEach(e => {
              const n = t.indexOf(e);
              n > -1 && (t.splice(n, 1), (s += e + "."));
            }),
            (s += r),
            0 != t.length || 0 === r.length)
          )
            return null;
          const i = {};
          return (i.domEventName = n), (i.fullKey = s), i;
        }
        static getEventFullKey(e) {
          let t = "",
            n = ru().getEventKey(e);
          return (
            (n = n.toLowerCase()),
            " " === n ? (n = "space") : "." === n && (n = "dot"),
            Gu.forEach(r => {
              r != n && (0, Zu[r])(e) && (t += r + ".");
            }),
            (t += n),
            t
          );
        }
        static eventCallback(e, t, n) {
          return r => {
            Qu.getEventFullKey(r) === e && n.runGuarded(() => t(r));
          };
        }
        static _normalizeKey(e) {
          switch (e) {
            case "esc":
              return "escape";
            default:
              return e;
          }
        }
      }
      class Ku {}
      class Yu extends Ku {
        constructor(e) {
          super(), (this._doc = e);
        }
        sanitize(e, t) {
          if (null == t) return null;
          switch (e) {
            case yt.NONE:
              return t;
            case yt.HTML:
              return t instanceof Xu
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "HTML"),
                  (function(e, t) {
                    let n = null;
                    try {
                      gt = gt || new Ke(e);
                      let r = t ? String(t) : "";
                      n = gt.getInertBodyElement(r);
                      let s = 5,
                        i = r;
                      do {
                        if (0 === s)
                          throw new Error(
                            "Failed to sanitize html because the input is unstable"
                          );
                        s--,
                          (r = i),
                          (i = n.innerHTML),
                          (n = gt.getInertBodyElement(r));
                      } while (r !== i);
                      const o = new ht(),
                        a = o.sanitizeChildren(mt(n) || n);
                      return (
                        Qe() &&
                          o.sanitizedSomething &&
                          console.warn(
                            "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                          ),
                        a
                      );
                    } finally {
                      if (n) {
                        const e = mt(n) || n;
                        for (; e.firstChild; ) e.removeChild(e.firstChild);
                      }
                    }
                  })(this._doc, String(t)));
            case yt.STYLE:
              return t instanceof ec
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "Style"),
                  (function(e) {
                    if (!(e = String(e).trim())) return "";
                    const t = e.match(_t);
                    return (t && Xe(t[1]) === t[1]) ||
                      (e.match(vt) &&
                        (function(e) {
                          let t = !0,
                            n = !0;
                          for (let r = 0; r < e.length; r++) {
                            const s = e.charAt(r);
                            "'" === s && n
                              ? (t = !t)
                              : '"' === s && t && (n = !n);
                          }
                          return t && n;
                        })(e))
                      ? e
                      : (Qe() &&
                          console.warn(
                            `WARNING: sanitizing unsafe style value ${e} (see http://g.co/ng/security#xss).`
                          ),
                        "unsafe");
                  })(t));
            case yt.SCRIPT:
              if (t instanceof tc)
                return t.changingThisBreaksApplicationSecurity;
              throw (this.checkNotSafeValue(t, "Script"),
              new Error("unsafe value used in a script context"));
            case yt.URL:
              return t instanceof rc || t instanceof nc
                ? t.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(t, "URL"), Xe(String(t)));
            case yt.RESOURCE_URL:
              if (t instanceof rc)
                return t.changingThisBreaksApplicationSecurity;
              throw (this.checkNotSafeValue(t, "ResourceURL"),
              new Error(
                "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
              ));
            default:
              throw new Error(
                `Unexpected SecurityContext ${e} (see http://g.co/ng/security#xss)`
              );
          }
        }
        checkNotSafeValue(e, t) {
          if (e instanceof Ju)
            throw new Error(
              `Required a safe ${t}, got a ${e.getTypeName()} ` +
                "(see http://g.co/ng/security#xss)"
            );
        }
        bypassSecurityTrustHtml(e) {
          return new Xu(e);
        }
        bypassSecurityTrustStyle(e) {
          return new ec(e);
        }
        bypassSecurityTrustScript(e) {
          return new tc(e);
        }
        bypassSecurityTrustUrl(e) {
          return new nc(e);
        }
        bypassSecurityTrustResourceUrl(e) {
          return new rc(e);
        }
      }
      class Ju {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return (
            `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      class Xu extends Ju {
        getTypeName() {
          return "HTML";
        }
      }
      class ec extends Ju {
        getTypeName() {
          return "Style";
        }
      }
      class tc extends Ju {
        getTypeName() {
          return "Script";
        }
      }
      class nc extends Ju {
        getTypeName() {
          return "URL";
        }
      }
      class rc extends Ju {
        getTypeName() {
          return "ResourceURL";
        }
      }
      const sc = li(Ei, "browser", [
        { provide: Ds, useValue: "browser" },
        {
          provide: Ts,
          useValue: function() {
            lu.makeCurrent(), fu.init();
          },
          multi: !0
        },
        {
          provide: da,
          useClass: class extends da {
            constructor(e) {
              super(), (this._doc = e), this._init();
            }
            _init() {
              (this.location = ru().getLocation()),
                (this._history = ru().getHistory());
            }
            getBaseHrefFromDOM() {
              return ru().getBaseHref(this._doc);
            }
            onPopState(e) {
              ru()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("popstate", e, !1);
            }
            onHashChange(e) {
              ru()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("hashchange", e, !1);
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
            set pathname(e) {
              this.location.pathname = e;
            }
            pushState(e, t, n) {
              hu()
                ? this._history.pushState(e, t, n)
                : (this.location.hash = n);
            }
            replaceState(e, t, n) {
              hu()
                ? this._history.replaceState(e, t, n)
                : (this.location.hash = n);
            }
            forward() {
              this._history.forward();
            }
            back() {
              this._history.back();
            }
            getState() {
              return this._history.state;
            }
          },
          deps: [hl]
        },
        {
          provide: hl,
          useFactory: function() {
            return document;
          },
          deps: []
        }
      ]);
      function ic() {
        return new We();
      }
      class oc {
        constructor(e) {
          if (e)
            throw new Error(
              "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
            );
        }
        static withServerTransition(e) {
          return {
            ngModule: oc,
            providers: [
              { provide: Ss, useValue: e.appId },
              { provide: du, useExisting: Ss },
              pu
            ]
          };
        }
      }
      "undefined" != typeof window && window;
      class ac extends $ {
        constructor(e, t) {
          super(e),
            (this.sources = t),
            (this.completed = 0),
            (this.haveValues = 0);
          const n = t.length;
          this.values = new Array(n);
          for (let r = 0; r < n; r++) {
            const e = L(this, t[r], null, r);
            e && this.add(e);
          }
        }
        notifyNext(e, t, n, r, s) {
          (this.values[n] = t),
            s._hasValue || ((s._hasValue = !0), this.haveValues++);
        }
        notifyComplete(e) {
          const { destination: t, haveValues: n, values: r } = this,
            s = r.length;
          e._hasValue
            ? (this.completed++,
              this.completed === s && (n === s && t.next(r), t.complete()))
            : t.complete();
        }
      }
      const lc = new Te("NgValueAccessor"),
        uc = new Te("CompositionEventMode");
      class cc {
        constructor(e, t, n) {
          (this._renderer = e),
            (this._elementRef = t),
            (this._compositionMode = n),
            (this.onChange = e => {}),
            (this.onTouched = () => {}),
            (this._composing = !1),
            null == this._compositionMode &&
              (this._compositionMode = !(function() {
                const e = ru() ? ru().getUserAgent() : "";
                return /android (\d+)/.test(e.toLowerCase());
              })());
        }
        writeValue(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "value",
            null == e ? "" : e
          );
        }
        registerOnChange(e) {
          this.onChange = e;
        }
        registerOnTouched(e) {
          this.onTouched = e;
        }
        setDisabledState(e) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "disabled",
            e
          );
        }
        _handleInput(e) {
          (!this._compositionMode ||
            (this._compositionMode && !this._composing)) &&
            this.onChange(e);
        }
        _compositionStart() {
          this._composing = !0;
        }
        _compositionEnd(e) {
          (this._composing = !1), this._compositionMode && this.onChange(e);
        }
      }
      class hc {
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        reset(e) {
          this.control && this.control.reset(e);
        }
        hasError(e, t) {
          return !!this.control && this.control.hasError(e, t);
        }
        getError(e, t) {
          return this.control ? this.control.getError(e, t) : null;
        }
      }
      class dc extends hc {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      function pc() {
        throw new Error("unimplemented");
      }
      class fc extends hc {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return pc();
        }
        get asyncValidator() {
          return pc();
        }
      }
      class gc {
        constructor(e) {
          this._cd = e;
        }
        get ngClassUntouched() {
          return !!this._cd.control && this._cd.control.untouched;
        }
        get ngClassTouched() {
          return !!this._cd.control && this._cd.control.touched;
        }
        get ngClassPristine() {
          return !!this._cd.control && this._cd.control.pristine;
        }
        get ngClassDirty() {
          return !!this._cd.control && this._cd.control.dirty;
        }
        get ngClassValid() {
          return !!this._cd.control && this._cd.control.valid;
        }
        get ngClassInvalid() {
          return !!this._cd.control && this._cd.control.invalid;
        }
        get ngClassPending() {
          return !!this._cd.control && this._cd.control.pending;
        }
      }
      class mc extends gc {
        constructor(e) {
          super(e);
        }
      }
      class yc extends gc {
        constructor(e) {
          super(e);
        }
      }
      function bc(e) {
        return null == e || 0 === e.length;
      }
      const vc = new Te("NgValidators"),
        _c = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class wc {
        static min(e) {
          return t => {
            if (bc(t.value) || bc(e)) return null;
            const n = parseFloat(t.value);
            return !isNaN(n) && n < e
              ? { min: { min: e, actual: t.value } }
              : null;
          };
        }
        static max(e) {
          return t => {
            if (bc(t.value) || bc(e)) return null;
            const n = parseFloat(t.value);
            return !isNaN(n) && n > e
              ? { max: { max: e, actual: t.value } }
              : null;
          };
        }
        static required(e) {
          return bc(e.value) ? { required: !0 } : null;
        }
        static requiredTrue(e) {
          return !0 === e.value ? null : { required: !0 };
        }
        static email(e) {
          return bc(e.value) ? null : _c.test(e.value) ? null : { email: !0 };
        }
        static minLength(e) {
          return t => {
            if (bc(t.value)) return null;
            const n = t.value ? t.value.length : 0;
            return n < e
              ? { minlength: { requiredLength: e, actualLength: n } }
              : null;
          };
        }
        static maxLength(e) {
          return t => {
            const n = t.value ? t.value.length : 0;
            return n > e
              ? { maxlength: { requiredLength: e, actualLength: n } }
              : null;
          };
        }
        static pattern(e) {
          if (!e) return wc.nullValidator;
          let t, n;
          return (
            "string" == typeof e
              ? ((n = ""),
                "^" !== e.charAt(0) && (n += "^"),
                (n += e),
                "$" !== e.charAt(e.length - 1) && (n += "$"),
                (t = new RegExp(n)))
              : ((n = e.toString()), (t = e)),
            e => {
              if (bc(e.value)) return null;
              const r = e.value;
              return t.test(r)
                ? null
                : { pattern: { requiredPattern: n, actualValue: r } };
            }
          );
        }
        static nullValidator(e) {
          return null;
        }
        static compose(e) {
          if (!e) return null;
          const t = e.filter(Cc);
          return 0 == t.length
            ? null
            : function(e) {
                return Sc(
                  (function(e, t) {
                    return t.map(t => t(e));
                  })(e, t)
                );
              };
        }
        static composeAsync(e) {
          if (!e) return null;
          const t = e.filter(Cc);
          return 0 == t.length
            ? null
            : function(e) {
                return (function e(...t) {
                  let n;
                  return (
                    "function" == typeof t[t.length - 1] && (n = t.pop()),
                    1 === t.length && l(t[0]) && (t = t[0]),
                    0 === t.length
                      ? sa
                      : n
                      ? e(t).pipe(H(e => n(...e)))
                      : new w(e => new ac(e, t))
                  );
                })(
                  (function(e, t) {
                    return t.map(t => t(e));
                  })(e, t).map(xc)
                ).pipe(H(Sc));
              };
        }
      }
      function Cc(e) {
        return null != e;
      }
      function xc(e) {
        const t = zt(e) ? W(e) : e;
        if (!Bt(t))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return t;
      }
      function Sc(e) {
        const t = e.reduce(
          (e, t) => (null != t ? Object.assign({}, e, t) : e),
          {}
        );
        return 0 === Object.keys(t).length ? null : t;
      }
      function Ec(e) {
        return e.validate ? t => e.validate(t) : e;
      }
      function kc(e) {
        return e.validate ? t => e.validate(t) : e;
      }
      class Tc {
        constructor() {
          this._accessors = [];
        }
        add(e, t) {
          this._accessors.push([e, t]);
        }
        remove(e) {
          for (let t = this._accessors.length - 1; t >= 0; --t)
            if (this._accessors[t][1] === e)
              return void this._accessors.splice(t, 1);
        }
        select(e) {
          this._accessors.forEach(t => {
            this._isSameGroup(t, e) && t[1] !== e && t[1].fireUncheck(e.value);
          });
        }
        _isSameGroup(e, t) {
          return (
            !!e[0].control &&
            e[0]._parent === t._control._parent &&
            e[1].name === t.name
          );
        }
      }
      const Dc =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        Ac =
          '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>';
      function Ic(e, t) {
        return null == e
          ? `${t}`
          : (t && "object" == typeof t && (t = "Object"),
            `${e}: ${t}`.slice(0, 50));
      }
      class Oc {
        constructor(e, t, n) {
          (this._element = e),
            (this._renderer = t),
            (this._select = n),
            this._select && (this.id = this._select._registerOption());
        }
        set ngValue(e) {
          null != this._select &&
            (this._select._optionMap.set(this.id, e),
            this._setElementValue(Ic(this.id, e)),
            this._select.writeValue(this._select.value));
        }
        set value(e) {
          this._setElementValue(e),
            this._select && this._select.writeValue(this._select.value);
        }
        _setElementValue(e) {
          this._renderer.setProperty(this._element.nativeElement, "value", e);
        }
        ngOnDestroy() {
          this._select &&
            (this._select._optionMap.delete(this.id),
            this._select.writeValue(this._select.value));
        }
      }
      function Rc(e, t) {
        return null == e
          ? `${t}`
          : ("string" == typeof t && (t = `'${t}'`),
            t && "object" == typeof t && (t = "Object"),
            `${e}: ${t}`.slice(0, 50));
      }
      class Nc {
        constructor(e, t, n) {
          (this._element = e),
            (this._renderer = t),
            (this._select = n),
            this._select && (this.id = this._select._registerOption(this));
        }
        set ngValue(e) {
          null != this._select &&
            ((this._value = e),
            this._setElementValue(Rc(this.id, e)),
            this._select.writeValue(this._select.value));
        }
        set value(e) {
          this._select
            ? ((this._value = e),
              this._setElementValue(Rc(this.id, e)),
              this._select.writeValue(this._select.value))
            : this._setElementValue(e);
        }
        _setElementValue(e) {
          this._renderer.setProperty(this._element.nativeElement, "value", e);
        }
        _setSelected(e) {
          this._renderer.setProperty(
            this._element.nativeElement,
            "selected",
            e
          );
        }
        ngOnDestroy() {
          this._select &&
            (this._select._optionMap.delete(this.id),
            this._select.writeValue(this._select.value));
        }
      }
      function Pc(e, t) {
        return [...t.path, e];
      }
      function Mc(e, t) {
        e || jc(t, "Cannot find control with"),
          t.valueAccessor || jc(t, "No value accessor for form control with"),
          (e.validator = wc.compose([e.validator, t.validator])),
          (e.asyncValidator = wc.composeAsync([
            e.asyncValidator,
            t.asyncValidator
          ])),
          t.valueAccessor.writeValue(e.value),
          (function(e, t) {
            t.valueAccessor.registerOnChange(n => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && Vc(e, t);
            });
          })(e, t),
          (function(e, t) {
            e.registerOnChange((e, n) => {
              t.valueAccessor.writeValue(e), n && t.viewToModelUpdate(e);
            });
          })(e, t),
          (function(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && Vc(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          t.valueAccessor.setDisabledState &&
            e.registerOnDisabledChange(e => {
              t.valueAccessor.setDisabledState(e);
            }),
          t._rawValidators.forEach(t => {
            t.registerOnValidatorChange &&
              t.registerOnValidatorChange(() => e.updateValueAndValidity());
          }),
          t._rawAsyncValidators.forEach(t => {
            t.registerOnValidatorChange &&
              t.registerOnValidatorChange(() => e.updateValueAndValidity());
          });
      }
      function Vc(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function jc(e, t) {
        let n;
        throw ((n =
          e.path.length > 1
            ? `path: '${e.path.join(" -> ")}'`
            : e.path[0]
            ? `name: '${e.path}'`
            : "unspecified name attribute"),
        new Error(`${t} ${n}`));
      }
      function Uc(e) {
        return null != e ? wc.compose(e.map(Ec)) : null;
      }
      function Fc(e) {
        return null != e ? wc.composeAsync(e.map(kc)) : null;
      }
      const Lc = [
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = e => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              e
            );
          }
          registerOnChange(e) {
            this.onChange = e;
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = e => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(e)
            );
          }
          registerOnChange(e) {
            this.onChange = t => {
              e("" == t ? null : parseFloat(t));
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this.onChange = e => {}),
              (this.onTouched = () => {});
          }
          writeValue(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == e ? "" : e
            );
          }
          registerOnChange(e) {
            this.onChange = t => {
              e("" == t ? null : parseFloat(t));
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = e => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Ut);
          }
          set compareWith(e) {
            if ("function" != typeof e)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  e
                )}`
              );
            this._compareWith = e;
          }
          writeValue(e) {
            this.value = e;
            const t = this._getOptionId(e);
            null == t &&
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "selectedIndex",
                -1
              );
            const n = Ic(t, e);
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              n
            );
          }
          registerOnChange(e) {
            this.onChange = t => {
              (this.value = this._getOptionValue(t)), e(this.value);
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _registerOption() {
            return (this._idCounter++).toString();
          }
          _getOptionId(e) {
            for (const t of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(t), e)) return t;
            return null;
          }
          _getOptionValue(e) {
            const t = (function(e) {
              return e.split(":")[0];
            })(e);
            return this._optionMap.has(t) ? this._optionMap.get(t) : e;
          }
        },
        class {
          constructor(e, t) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = e => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Ut);
          }
          set compareWith(e) {
            if ("function" != typeof e)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  e
                )}`
              );
            this._compareWith = e;
          }
          writeValue(e) {
            let t;
            if (((this.value = e), Array.isArray(e))) {
              const n = e.map(e => this._getOptionId(e));
              t = (e, t) => {
                e._setSelected(n.indexOf(t.toString()) > -1);
              };
            } else
              t = (e, t) => {
                e._setSelected(!1);
              };
            this._optionMap.forEach(t);
          }
          registerOnChange(e) {
            this.onChange = t => {
              const n = [];
              if (t.hasOwnProperty("selectedOptions")) {
                const e = t.selectedOptions;
                for (let t = 0; t < e.length; t++) {
                  const r = e.item(t),
                    s = this._getOptionValue(r.value);
                  n.push(s);
                }
              } else {
                const e = t.options;
                for (let t = 0; t < e.length; t++) {
                  const r = e.item(t);
                  if (r.selected) {
                    const e = this._getOptionValue(r.value);
                    n.push(e);
                  }
                }
              }
              (this.value = n), e(n);
            };
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _registerOption(e) {
            const t = (this._idCounter++).toString();
            return this._optionMap.set(t, e), t;
          }
          _getOptionId(e) {
            for (const t of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(t)._value, e)) return t;
            return null;
          }
          _getOptionValue(e) {
            const t = (function(e) {
              return e.split(":")[0];
            })(e);
            return this._optionMap.has(t) ? this._optionMap.get(t)._value : e;
          }
        },
        class {
          constructor(e, t, n, r) {
            (this._renderer = e),
              (this._elementRef = t),
              (this._registry = n),
              (this._injector = r),
              (this.onChange = () => {}),
              (this.onTouched = () => {});
          }
          ngOnInit() {
            (this._control = this._injector.get(fc)),
              this._checkName(),
              this._registry.add(this._control, this);
          }
          ngOnDestroy() {
            this._registry.remove(this);
          }
          writeValue(e) {
            (this._state = e === this.value),
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "checked",
                this._state
              );
          }
          registerOnChange(e) {
            (this._fn = e),
              (this.onChange = () => {
                e(this.value), this._registry.select(this);
              });
          }
          fireUncheck(e) {
            this.writeValue(e);
          }
          registerOnTouched(e) {
            this.onTouched = e;
          }
          setDisabledState(e) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              e
            );
          }
          _checkName() {
            this.name &&
              this.formControlName &&
              this.name !== this.formControlName &&
              this._throwNameError(),
              !this.name &&
                this.formControlName &&
                (this.name = this.formControlName);
          }
          _throwNameError() {
            throw new Error(
              '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
            );
          }
        }
      ];
      function $c(e) {
        const t = zc(e) ? e.validators : e;
        return Array.isArray(t) ? Uc(t) : t || null;
      }
      function Hc(e, t) {
        const n = zc(t) ? t.asyncValidators : e;
        return Array.isArray(n) ? Fc(n) : n || null;
      }
      function zc(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class Bc {
        constructor(e, t) {
          (this.validator = e),
            (this.asyncValidator = t),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(e) {
          this.validator = $c(e);
        }
        setAsyncValidators(e) {
          this.asyncValidator = Hc(e);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(e = {}) {
          (this.touched = !0),
            this._parent && !e.onlySelf && this._parent.markAsTouched(e);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild(e => e.markAllAsTouched());
        }
        markAsUntouched(e = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild(e => {
              e.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        markAsDirty(e = {}) {
          (this.pristine = !1),
            this._parent && !e.onlySelf && this._parent.markAsDirty(e);
        }
        markAsPristine(e = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild(e => {
              e.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        markAsPending(e = {}) {
          (this.status = "PENDING"),
            !1 !== e.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !e.onlySelf && this._parent.markAsPending(e);
        }
        disable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild(t => {
              t.disable(Object.assign({}, e, { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign({}, e, { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach(e => e(!0));
        }
        enable(e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf);
          (this.status = "VALID"),
            this._forEachChild(t => {
              t.enable(Object.assign({}, e, { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent
            }),
            this._updateAncestors(
              Object.assign({}, e, { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach(e => e(!1));
        }
        _updateAncestors(e) {
          this._parent &&
            !e.onlySelf &&
            (this._parent.updateValueAndValidity(e),
            e.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(e) {
          this._parent = e;
        }
        updateValueAndValidity(e = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(e.emitEvent)),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !e.onlySelf &&
              this._parent.updateValueAndValidity(e);
        }
        _updateTreeValidity(e = { emitEvent: !0 }) {
          this._forEachChild(t => t._updateTreeValidity(e)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(e) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const t = xc(this.asyncValidator(this));
            this._asyncValidationSubscription = t.subscribe(t =>
              this.setErrors(t, { emitEvent: e })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(e, t = {}) {
          (this.errors = e), this._updateControlsErrors(!1 !== t.emitEvent);
        }
        get(e) {
          return (function(e, t, n) {
            return null == t
              ? null
              : (t instanceof Array || (t = t.split(".")),
                t instanceof Array && 0 === t.length
                  ? null
                  : t.reduce(
                      (e, t) =>
                        e instanceof Wc
                          ? e.controls.hasOwnProperty(t)
                            ? e.controls[t]
                            : null
                          : (e instanceof Gc && e.at(t)) || null,
                      e
                    ));
          })(this, e);
        }
        getError(e, t) {
          const n = t ? this.get(t) : this;
          return n && n.errors ? n.errors[e] : null;
        }
        hasError(e, t) {
          return !!this.getError(e, t);
        }
        get root() {
          let e = this;
          for (; e._parent; ) e = e._parent;
          return e;
        }
        _updateControlsErrors(e) {
          (this.status = this._calculateStatus()),
            e && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(e);
        }
        _initObservables() {
          (this.valueChanges = new vs()), (this.statusChanges = new vs());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(e) {
          return this._anyControls(t => t.status === e);
        }
        _anyControlsDirty() {
          return this._anyControls(e => e.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls(e => e.touched);
        }
        _updatePristine(e = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        _updateTouched(e = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        _isBoxedValue(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            2 === Object.keys(e).length &&
            "value" in e &&
            "disabled" in e
          );
        }
        _registerOnCollectionChange(e) {
          this._onCollectionChange = e;
        }
        _setUpdateStrategy(e) {
          zc(e) && null != e.updateOn && (this._updateOn = e.updateOn);
        }
        _parentMarkedDirty(e) {
          return (
            !e &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class qc extends Bc {
        constructor(e = null, t, n) {
          super($c(t), Hc(n, t)),
            (this._onChange = []),
            this._applyFormState(e),
            this._setUpdateStrategy(t),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(e, t = {}) {
          (this.value = this._pendingValue = e),
            this._onChange.length &&
              !1 !== t.emitModelToViewChange &&
              this._onChange.forEach(e =>
                e(this.value, !1 !== t.emitViewToModelChange)
              ),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          this.setValue(e, t);
        }
        reset(e = null, t = {}) {
          this._applyFormState(e),
            this.markAsPristine(t),
            this.markAsUntouched(t),
            this.setValue(this.value, t),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(e) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(e) {
          this._onChange.push(e);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(e) {
          this._onDisabledChange.push(e);
        }
        _forEachChild(e) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1
            }),
            0)
          );
        }
        _applyFormState(e) {
          this._isBoxedValue(e)
            ? ((this.value = this._pendingValue = e.value),
              e.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = e);
        }
      }
      class Wc extends Bc {
        constructor(e, t, n) {
          super($c(t), Hc(n, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(e, t) {
          return this.controls[e]
            ? this.controls[e]
            : ((this.controls[e] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t);
        }
        addControl(e, t) {
          this.registerControl(e, t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(e) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(e, t) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            t && this.registerControl(e, t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(e) {
          return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
        }
        setValue(e, t = {}) {
          this._checkAllValuesPresent(e),
            Object.keys(e).forEach(n => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(e[n], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          Object.keys(e).forEach(n => {
            this.controls[n] &&
              this.controls[n].patchValue(e[n], {
                onlySelf: !0,
                emitEvent: t.emitEvent
              });
          }),
            this.updateValueAndValidity(t);
        }
        reset(e = {}, t = {}) {
          this._forEachChild((n, r) => {
            n.reset(e[r], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (e, t, n) => (
              (e[n] = t instanceof qc ? t.value : t.getRawValue()), e
            )
          );
        }
        _syncPendingControls() {
          let e = this._reduceChildren(
            !1,
            (e, t) => !!t._syncPendingControls() || e
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _throwIfControlMissing(e) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[e])
            throw new Error(`Cannot find form control with name: ${e}.`);
        }
        _forEachChild(e) {
          Object.keys(this.controls).forEach(t => e(this.controls[t], t));
        }
        _setUpControls() {
          this._forEachChild(e => {
            e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(e) {
          let t = !1;
          return (
            this._forEachChild((n, r) => {
              t = t || (this.contains(r) && e(n));
            }),
            t
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (e, t, n) => ((t.enabled || this.disabled) && (e[n] = t.value), e)
          );
        }
        _reduceChildren(e, t) {
          let n = e;
          return (
            this._forEachChild((e, r) => {
              n = t(n, e, r);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const e of Object.keys(this.controls))
            if (this.controls[e].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(e) {
          this._forEachChild((t, n) => {
            if (void 0 === e[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class Gc extends Bc {
        constructor(e, t, n) {
          super($c(t), Hc(n, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(e) {
          return this.controls[e];
        }
        push(e) {
          this.controls.push(e),
            this._registerControl(e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(e, t) {
          this.controls.splice(e, 0, t),
            this._registerControl(t),
            this.updateValueAndValidity();
        }
        removeAt(e) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            this.updateValueAndValidity();
        }
        setControl(e, t) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            t && (this.controls.splice(e, 0, t), this._registerControl(t)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(e, t = {}) {
          this._checkAllValuesPresent(e),
            e.forEach((e, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(e, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(e, t = {}) {
          e.forEach((e, n) => {
            this.at(n) &&
              this.at(n).patchValue(e, {
                onlySelf: !0,
                emitEvent: t.emitEvent
              });
          }),
            this.updateValueAndValidity(t);
        }
        reset(e = [], t = {}) {
          this._forEachChild((n, r) => {
            n.reset(e[r], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this.controls.map(e =>
            e instanceof qc ? e.value : e.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild(e => e._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let e = this.controls.reduce(
            (e, t) => !!t._syncPendingControls() || e,
            !1
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _throwIfControlMissing(e) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(e))
            throw new Error(`Cannot find form control at index ${e}`);
        }
        _forEachChild(e) {
          this.controls.forEach((t, n) => {
            e(t, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter(e => e.enabled || this.disabled)
            .map(e => e.value);
        }
        _anyControls(e) {
          return this.controls.some(t => t.enabled && e(t));
        }
        _setUpControls() {
          this._forEachChild(e => this._registerControl(e));
        }
        _checkAllValuesPresent(e) {
          this._forEachChild((t, n) => {
            if (void 0 === e[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const e of this.controls) if (e.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(e) {
          e.setParent(this),
            e._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const Zc = (() => Promise.resolve(null))();
      class Qc extends dc {
        constructor(e, t) {
          super(),
            (this.submitted = !1),
            (this._directives = []),
            (this.ngSubmit = new vs()),
            (this.form = new Wc({}, Uc(e), Fc(t)));
        }
        ngAfterViewInit() {
          this._setUpdateStrategy();
        }
        get formDirective() {
          return this;
        }
        get control() {
          return this.form;
        }
        get path() {
          return [];
        }
        get controls() {
          return this.form.controls;
        }
        addControl(e) {
          Zc.then(() => {
            const t = this._findContainer(e.path);
            (e.control = t.registerControl(e.name, e.control)),
              Mc(e.control, e),
              e.control.updateValueAndValidity({ emitEvent: !1 }),
              this._directives.push(e);
          });
        }
        getControl(e) {
          return this.form.get(e.path);
        }
        removeControl(e) {
          Zc.then(() => {
            const t = this._findContainer(e.path);
            t && t.removeControl(e.name),
              (function(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1);
              })(this._directives, e);
          });
        }
        addFormGroup(e) {
          Zc.then(() => {
            const t = this._findContainer(e.path),
              n = new Wc({});
            (function(e, t) {
              null == e && jc(t, "Cannot find control with"),
                (e.validator = wc.compose([e.validator, t.validator])),
                (e.asyncValidator = wc.composeAsync([
                  e.asyncValidator,
                  t.asyncValidator
                ]));
            })(n, e),
              t.registerControl(e.name, n),
              n.updateValueAndValidity({ emitEvent: !1 });
          });
        }
        removeFormGroup(e) {
          Zc.then(() => {
            const t = this._findContainer(e.path);
            t && t.removeControl(e.name);
          });
        }
        getFormGroup(e) {
          return this.form.get(e.path);
        }
        updateModel(e, t) {
          Zc.then(() => {
            this.form.get(e.path).setValue(t);
          });
        }
        setValue(e) {
          this.control.setValue(e);
        }
        onSubmit(e) {
          return (
            (this.submitted = !0),
            (t = this._directives),
            this.form._syncPendingControls(),
            t.forEach(e => {
              const t = e.control;
              "submit" === t.updateOn &&
                t._pendingChange &&
                (e.viewToModelUpdate(t._pendingValue), (t._pendingChange = !1));
            }),
            this.ngSubmit.emit(e),
            !1
          );
          var t;
        }
        onReset() {
          this.resetForm();
        }
        resetForm(e) {
          this.form.reset(e), (this.submitted = !1);
        }
        _setUpdateStrategy() {
          this.options &&
            null != this.options.updateOn &&
            (this.form._updateOn = this.options.updateOn);
        }
        _findContainer(e) {
          return e.pop(), e.length ? this.form.get(e) : this.form;
        }
      }
      class Kc {
        static modelParentException() {
          throw new Error(
            '\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup\'s partner directive "formControlName" instead.  Example:\n\n      \n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });\n\n      Or, if you\'d like to avoid registering this form control, indicate that it\'s standalone in ngModelOptions:\n\n      Example:\n\n      \n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  '
          );
        }
        static formGroupNameException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${Dc}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Ac}`
          );
        }
        static missingNameException() {
          throw new Error(
            'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">'
          );
        }
        static modelGroupParentException() {
          throw new Error(
            `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${Dc}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Ac}`
          );
        }
        static ngFormWarning() {
          console.warn(
            "\n    It looks like you're using 'ngForm'.\n\n    Support for using the 'ngForm' element selector has been deprecated in Angular v6 and will be removed\n    in Angular v9.\n\n    Use 'ng-form' instead.\n\n    Before:\n    <ngForm #myForm=\"ngForm\">\n\n    After:\n    <ng-form #myForm=\"ngForm\">\n    "
          );
        }
      }
      const Yc = new Te("NgFormSelectorWarning");
      class Jc extends dc {
        ngOnInit() {
          this._checkParentType(), this.formDirective.addFormGroup(this);
        }
        ngOnDestroy() {
          this.formDirective && this.formDirective.removeFormGroup(this);
        }
        get control() {
          return this.formDirective.getFormGroup(this);
        }
        get path() {
          return Pc(this.name, this._parent);
        }
        get formDirective() {
          return this._parent ? this._parent.formDirective : null;
        }
        get validator() {
          return Uc(this._validators);
        }
        get asyncValidator() {
          return Fc(this._asyncValidators);
        }
        _checkParentType() {}
      }
      class Xc extends Jc {
        constructor(e, t, n) {
          super(),
            (this._parent = e),
            (this._validators = t),
            (this._asyncValidators = n);
        }
        _checkParentType() {
          this._parent instanceof Xc ||
            this._parent instanceof Qc ||
            Kc.modelGroupParentException();
        }
      }
      const eh = (() => Promise.resolve(null))();
      class th extends fc {
        constructor(e, t, n, r) {
          super(),
            (this.control = new qc()),
            (this._registered = !1),
            (this.update = new vs()),
            (this._parent = e),
            (this._rawValidators = t || []),
            (this._rawAsyncValidators = n || []),
            (this.valueAccessor = (function(e, t) {
              if (!t) return null;
              Array.isArray(t) ||
                jc(
                  e,
                  "Value accessor was not provided as an array for form control with"
                );
              let n = void 0,
                r = void 0,
                s = void 0;
              return (
                t.forEach(t => {
                  var i;
                  t.constructor === cc
                    ? (n = t)
                    : ((i = t),
                      Lc.some(e => i.constructor === e)
                        ? (r &&
                            jc(
                              e,
                              "More than one built-in value accessor matches form control with"
                            ),
                          (r = t))
                        : (s &&
                            jc(
                              e,
                              "More than one custom value accessor matches form control with"
                            ),
                          (s = t)));
                }),
                s ||
                  r ||
                  n ||
                  (jc(e, "No valid value accessor for form control with"), null)
              );
            })(this, r));
        }
        ngOnChanges(e) {
          this._checkForErrors(),
            this._registered || this._setUpControl(),
            "isDisabled" in e && this._updateDisabled(e),
            (function(e, t) {
              if (!e.hasOwnProperty("model")) return !1;
              const n = e.model;
              return !!n.isFirstChange() || !Ut(t, n.currentValue);
            })(e, this.viewModel) &&
              (this._updateValue(this.model), (this.viewModel = this.model));
        }
        ngOnDestroy() {
          this.formDirective && this.formDirective.removeControl(this);
        }
        get path() {
          return this._parent ? Pc(this.name, this._parent) : [this.name];
        }
        get formDirective() {
          return this._parent ? this._parent.formDirective : null;
        }
        get validator() {
          return Uc(this._rawValidators);
        }
        get asyncValidator() {
          return Fc(this._rawAsyncValidators);
        }
        viewToModelUpdate(e) {
          (this.viewModel = e), this.update.emit(e);
        }
        _setUpControl() {
          this._setUpdateStrategy(),
            this._isStandalone()
              ? this._setUpStandalone()
              : this.formDirective.addControl(this),
            (this._registered = !0);
        }
        _setUpdateStrategy() {
          this.options &&
            null != this.options.updateOn &&
            (this.control._updateOn = this.options.updateOn);
        }
        _isStandalone() {
          return !this._parent || !(!this.options || !this.options.standalone);
        }
        _setUpStandalone() {
          Mc(this.control, this),
            this.control.updateValueAndValidity({ emitEvent: !1 });
        }
        _checkForErrors() {
          this._isStandalone() || this._checkParentType(), this._checkName();
        }
        _checkParentType() {
          !(this._parent instanceof Xc) && this._parent instanceof Jc
            ? Kc.formGroupNameException()
            : this._parent instanceof Xc ||
              this._parent instanceof Qc ||
              Kc.modelParentException();
        }
        _checkName() {
          this.options && this.options.name && (this.name = this.options.name),
            this._isStandalone() || this.name || Kc.missingNameException();
        }
        _updateValue(e) {
          eh.then(() => {
            this.control.setValue(e, { emitViewToModelChange: !1 });
          });
        }
        _updateDisabled(e) {
          const t = e.isDisabled.currentValue,
            n = "" === t || (t && "false" !== t);
          eh.then(() => {
            n && !this.control.disabled
              ? this.control.disable()
              : !n && this.control.disabled && this.control.enable();
          });
        }
      }
      class nh {}
      class rh {
        get required() {
          return this._required;
        }
        set required(e) {
          (this._required = null != e && !1 !== e && "false" !== `${e}`),
            this._onChange && this._onChange();
        }
        validate(e) {
          return this.required ? wc.required(e) : null;
        }
        registerOnValidatorChange(e) {
          this._onChange = e;
        }
      }
      class sh {}
      class ih {
        static withConfig(e) {
          return {
            ngModule: ih,
            providers: [
              { provide: Yc, useValue: e.warnOnDeprecatedNgFormSelector }
            ]
          };
        }
      }
      class oh extends T {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return t && !t.closed && e.next(this._value), t;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new S();
          return this._value;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      const ah = {};
      class lh {
        constructor(e) {
          this.resultSelector = e;
        }
        call(e, t) {
          return t.subscribe(new uh(e, this.resultSelector));
        }
      }
      class uh extends $ {
        constructor(e, t) {
          super(e),
            (this.resultSelector = t),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(e) {
          this.values.push(ah), this.observables.push(e);
        }
        _complete() {
          const e = this.observables,
            t = e.length;
          if (0 === t) this.destination.complete();
          else {
            (this.active = t), (this.toRespond = t);
            for (let n = 0; n < t; n++) {
              const t = e[n];
              this.add(L(this, t, t, n));
            }
          }
        }
        notifyComplete(e) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(e, t, n, r, s) {
          const i = this.values,
            o = this.toRespond
              ? i[n] === ah
                ? --this.toRespond
                : this.toRespond
              : 0;
          (i[n] = t),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(i)
                : this.destination.next(i.slice()));
        }
        _tryResultSelector(e) {
          let t;
          try {
            t = this.resultSelector.apply(this, e);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      class ch extends d {
        constructor(e, t) {
          super();
        }
        schedule(e, t = 0) {
          return this;
        }
      }
      class hh extends ch {
        constructor(e, t) {
          super(e, t),
            (this.scheduler = e),
            (this.work = t),
            (this.pending = !1);
        }
        schedule(e, t = 0) {
          if (this.closed) return this;
          this.state = e;
          const n = this.id,
            r = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(r, n, t)),
            (this.pending = !0),
            (this.delay = t),
            (this.id = this.id || this.requestAsyncId(r, this.id, t)),
            this
          );
        }
        requestAsyncId(e, t, n = 0) {
          return setInterval(e.flush.bind(e, this), n);
        }
        recycleAsyncId(e, t, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return t;
          clearInterval(t);
        }
        execute(e, t) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(e, t);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(e, t) {
          let n = !1,
            r = void 0;
          try {
            this.work(e);
          } catch (s) {
            (n = !0), (r = (!!s && s) || new Error(s));
          }
          if (n) return this.unsubscribe(), r;
        }
        _unsubscribe() {
          const e = this.id,
            t = this.scheduler,
            n = t.actions,
            r = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== r && n.splice(r, 1),
            null != e && (this.id = this.recycleAsyncId(t, e, null)),
            (this.delay = null);
        }
      }
      let dh = (() => {
        class e {
          constructor(t, n = e.now) {
            (this.SchedulerAction = t), (this.now = n);
          }
          schedule(e, t = 0, n) {
            return new this.SchedulerAction(this, e).schedule(n, t);
          }
        }
        return (e.now = () => Date.now()), e;
      })();
      class ph extends dh {
        constructor(e, t = dh.now) {
          super(e, () =>
            ph.delegate && ph.delegate !== this ? ph.delegate.now() : t()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(e, t = 0, n) {
          return ph.delegate && ph.delegate !== this
            ? ph.delegate.schedule(e, t, n)
            : super.schedule(e, t, n);
        }
        flush(e) {
          const { actions: t } = this;
          if (this.active) return void t.push(e);
          let n;
          this.active = !0;
          do {
            if ((n = e.execute(e.state, e.delay))) break;
          } while ((e = t.shift()));
          if (((this.active = !1), n)) {
            for (; (e = t.shift()); ) e.unsubscribe();
            throw n;
          }
        }
      }
      const fh = new ph(hh),
        gh = new w(b);
      function mh(e, t, n, s) {
        return (
          r(n) && ((s = n), (n = void 0)),
          s
            ? mh(e, t, n).pipe(H(e => (l(e) ? s(...e) : s(e))))
            : new w(r => {
                !(function e(t, n, r, s, i) {
                  let o;
                  if (
                    (function(e) {
                      return (
                        e &&
                        "function" == typeof e.addEventListener &&
                        "function" == typeof e.removeEventListener
                      );
                    })(t)
                  ) {
                    const e = t;
                    t.addEventListener(n, r, i),
                      (o = () => e.removeEventListener(n, r, i));
                  } else if (
                    (function(e) {
                      return (
                        e &&
                        "function" == typeof e.on &&
                        "function" == typeof e.off
                      );
                    })(t)
                  ) {
                    const e = t;
                    t.on(n, r), (o = () => e.off(n, r));
                  } else if (
                    (function(e) {
                      return (
                        e &&
                        "function" == typeof e.addListener &&
                        "function" == typeof e.removeListener
                      );
                    })(t)
                  ) {
                    const e = t;
                    t.addListener(n, r), (o = () => e.removeListener(n, r));
                  } else {
                    if (!t || !t.length)
                      throw new TypeError("Invalid event target");
                    for (let o = 0, a = t.length; o < a; o++)
                      e(t[o], n, r, s, i);
                  }
                  s.add(o);
                })(
                  e,
                  t,
                  function(e) {
                    r.next(
                      arguments.length > 1
                        ? Array.prototype.slice.call(arguments)
                        : e
                    );
                  },
                  r,
                  n
                );
              })
        );
      }
      function yh() {
        return Y(1);
      }
      function bh(...e) {
        return yh()(aa(...e));
      }
      function vh(e, t) {
        return "function" == typeof t
          ? n =>
              n.pipe(vh((n, r) => W(e(n, r)).pipe(H((e, s) => t(n, e, r, s)))))
          : t => t.lift(new _h(e));
      }
      class _h {
        constructor(e) {
          this.project = e;
        }
        call(e, t) {
          return t.subscribe(new wh(e, this.project));
        }
      }
      class wh extends $ {
        constructor(e, t) {
          super(e), (this.project = t), (this.index = 0);
        }
        _next(e) {
          let t;
          const n = this.index++;
          try {
            t = this.project(e, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(t, e, n);
        }
        _innerSub(e, t, n) {
          const r = this.innerSubscription;
          r && r.unsubscribe();
          const s = new I(this, void 0, void 0);
          this.destination.add(s),
            (this.innerSubscription = L(this, e, t, n, s));
        }
        _complete() {
          const { innerSubscription: e } = this;
          (e && !e.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(e) {
          this.destination.remove(e),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(e, t, n, r, s) {
          this.destination.next(t);
        }
      }
      function Ch(e) {
        return t => t.lift(new xh(e));
      }
      class xh {
        constructor(e) {
          this.notifier = e;
        }
        call(e, t) {
          const n = new Sh(e),
            r = L(n, this.notifier);
          return r && !n.seenValue ? (n.add(r), t.subscribe(n)) : n;
        }
      }
      class Sh extends $ {
        constructor(e) {
          super(e), (this.seenValue = !1);
        }
        notifyNext(e, t, n, r, s) {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      function Eh() {
        return (
          Error.call(this),
          (this.message = "argument out of range"),
          (this.name = "ArgumentOutOfRangeError"),
          this
        );
      }
      Eh.prototype = Object.create(Error.prototype);
      const kh = Eh;
      function Th(e) {
        return t => (0 === e ? ia() : t.lift(new Dh(e)));
      }
      class Dh {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new kh();
        }
        call(e, t) {
          return t.subscribe(new Ah(e, this.total));
        }
      }
      class Ah extends g {
        constructor(e, t) {
          super(e), (this.total = t), (this.count = 0);
        }
        _next(e) {
          const t = this.total,
            n = ++this.count;
          n <= t &&
            (this.destination.next(e),
            n === t && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Ih(e, t, n) {
        return function(r) {
          return r.lift(new Oh(e, t, n));
        };
      }
      class Oh {
        constructor(e, t, n) {
          (this.nextOrObserver = e), (this.error = t), (this.complete = n);
        }
        call(e, t) {
          return t.subscribe(
            new Rh(e, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class Rh extends g {
        constructor(e, t, n, s) {
          super(e),
            (this._tapNext = b),
            (this._tapError = b),
            (this._tapComplete = b),
            (this._tapError = n || b),
            (this._tapComplete = s || b),
            r(t)
              ? ((this._context = this), (this._tapNext = t))
              : t &&
                ((this._context = t),
                (this._tapNext = t.next || b),
                (this._tapError = t.error || b),
                (this._tapComplete = t.complete || b));
        }
        _next(e) {
          try {
            this._tapNext.call(this._context, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(e);
        }
        _error(e) {
          try {
            this._tapError.call(this._context, e);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.error(e);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (e) {
            return void this.destination.error(e);
          }
          return this.destination.complete();
        }
      }
      function Nh(...e) {
        return t => {
          let n;
          return (
            "function" == typeof e[e.length - 1] && (n = e.pop()),
            t.lift(new Ph(e, n))
          );
        };
      }
      class Ph {
        constructor(e, t) {
          (this.observables = e), (this.project = t);
        }
        call(e, t) {
          return t.subscribe(new Mh(e, this.observables, this.project));
        }
      }
      class Mh extends $ {
        constructor(e, t, n) {
          super(e),
            (this.observables = t),
            (this.project = n),
            (this.toRespond = []);
          const r = t.length;
          this.values = new Array(r);
          for (let s = 0; s < r; s++) this.toRespond.push(s);
          for (let s = 0; s < r; s++) {
            let e = t[s];
            this.add(L(this, e, e, s));
          }
        }
        notifyNext(e, t, n, r, s) {
          this.values[n] = t;
          const i = this.toRespond;
          if (i.length > 0) {
            const e = i.indexOf(n);
            -1 !== e && i.splice(e, 1);
          }
        }
        notifyComplete() {}
        _next(e) {
          if (0 === this.toRespond.length) {
            const t = [e, ...this.values];
            this.project ? this._tryProject(t) : this.destination.next(t);
          }
        }
        _tryProject(e) {
          let t;
          try {
            t = this.project.apply(this, e);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      function Vh(e, t) {
        return new w(
          t
            ? n => t.schedule(jh, 0, { error: e, subscriber: n })
            : t => t.error(e)
        );
      }
      function jh({ error: e, subscriber: t }) {
        t.error(e);
      }
      let Uh = (() => {
        class e {
          constructor(e, t, n) {
            (this.kind = e),
              (this.value = t),
              (this.error = n),
              (this.hasValue = "N" === e);
          }
          observe(e) {
            switch (this.kind) {
              case "N":
                return e.next && e.next(this.value);
              case "E":
                return e.error && e.error(this.error);
              case "C":
                return e.complete && e.complete();
            }
          }
          do(e, t, n) {
            switch (this.kind) {
              case "N":
                return e && e(this.value);
              case "E":
                return t && t(this.error);
              case "C":
                return n && n();
            }
          }
          accept(e, t, n) {
            return e && "function" == typeof e.next
              ? this.observe(e)
              : this.do(e, t, n);
          }
          toObservable() {
            switch (this.kind) {
              case "N":
                return aa(this.value);
              case "E":
                return Vh(this.error);
              case "C":
                return ia();
            }
            throw new Error("unexpected notification kind value");
          }
          static createNext(t) {
            return void 0 !== t ? new e("N", t) : e.undefinedValueNotification;
          }
          static createError(t) {
            return new e("E", void 0, t);
          }
          static createComplete() {
            return e.completeNotification;
          }
        }
        return (
          (e.completeNotification = new e("C")),
          (e.undefinedValueNotification = new e("N", void 0)),
          e
        );
      })();
      class Fh {
        constructor(e, t) {
          (this.delay = e), (this.scheduler = t);
        }
        call(e, t) {
          return t.subscribe(new Lh(e, this.delay, this.scheduler));
        }
      }
      class Lh extends g {
        constructor(e, t, n) {
          super(e),
            (this.delay = t),
            (this.scheduler = n),
            (this.queue = []),
            (this.active = !1),
            (this.errored = !1);
        }
        static dispatch(e) {
          const t = e.source,
            n = t.queue,
            r = e.scheduler,
            s = e.destination;
          for (; n.length > 0 && n[0].time - r.now() <= 0; )
            n.shift().notification.observe(s);
          if (n.length > 0) {
            const t = Math.max(0, n[0].time - r.now());
            this.schedule(e, t);
          } else this.unsubscribe(), (t.active = !1);
        }
        _schedule(e) {
          (this.active = !0),
            this.destination.add(
              e.schedule(Lh.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: e
              })
            );
        }
        scheduleNotification(e) {
          if (!0 === this.errored) return;
          const t = this.scheduler,
            n = new $h(t.now() + this.delay, e);
          this.queue.push(n), !1 === this.active && this._schedule(t);
        }
        _next(e) {
          this.scheduleNotification(Uh.createNext(e));
        }
        _error(e) {
          (this.errored = !0),
            (this.queue = []),
            this.destination.error(e),
            this.unsubscribe();
        }
        _complete() {
          this.scheduleNotification(Uh.createComplete()), this.unsubscribe();
        }
      }
      class $h {
        constructor(e, t) {
          (this.time = e), (this.notification = t);
        }
      }
      function Hh(e) {
        return parseInt(`${e}`, 10);
      }
      function zh(e) {
        return null != e ? `${e}` : "";
      }
      function Bh(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
      }
      function qh(e) {
        return null != e;
      }
      function Wh(e, t) {
        return (
          e &&
          e.className &&
          e.className.split &&
          e.className.split(/\s+/).indexOf(t) >= 0
        );
      }
      "undefined" == typeof Element ||
        Element.prototype.closest ||
        (Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector),
        (Element.prototype.closest = function(e) {
          let t = this;
          if (!document.documentElement.contains(t)) return null;
          do {
            if (t.matches(e)) return t;
            t = t.parentElement || t.parentNode;
          } while (null !== t && 1 === t.nodeType);
          return null;
        }));
      class Gh {}
      let Zh = (() => {
        class e {
          constructor() {
            (this.dismissible = !0), (this.type = "warning");
          }
        }
        return (
          (e.ngInjectableDef = ge({
            factory: function() {
              return new e();
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      class Qh {
        constructor(e, t, n) {
          (this._renderer = t),
            (this._element = n),
            (this.close = new vs()),
            (this.dismissible = e.dismissible),
            (this.type = e.type);
        }
        closeHandler() {
          this.close.emit(null);
        }
        ngOnChanges(e) {
          const t = e.type;
          t &&
            !t.firstChange &&
            (this._renderer.removeClass(
              this._element.nativeElement,
              `alert-${t.previousValue}`
            ),
            this._renderer.addClass(
              this._element.nativeElement,
              `alert-${t.currentValue}`
            ));
        }
        ngOnInit() {
          this._renderer.addClass(
            this._element.nativeElement,
            `alert-${this.type}`
          );
        }
      }
      class Kh {}
      class Yh {}
      class Jh {}
      class Xh {}
      class ed {
        static from(e) {
          return e instanceof ed
            ? e
            : e
            ? new ed(e.year, e.month, e.day)
            : null;
        }
        constructor(e, t, n) {
          (this.year = Bh(e) ? e : null),
            (this.month = Bh(t) ? t : null),
            (this.day = Bh(n) ? n : null);
        }
        equals(e) {
          return (
            e &&
            this.year === e.year &&
            this.month === e.month &&
            this.day === e.day
          );
        }
        before(e) {
          return (
            !!e &&
            (this.year === e.year
              ? this.month === e.month
                ? this.day !== e.day && this.day < e.day
                : this.month < e.month
              : this.year < e.year)
          );
        }
        after(e) {
          return (
            !!e &&
            (this.year === e.year
              ? this.month === e.month
                ? this.day !== e.day && this.day > e.day
                : this.month > e.month
              : this.year > e.year)
          );
        }
      }
      function td(e) {
        return new ed(e.getFullYear(), e.getMonth() + 1, e.getDate());
      }
      function nd(e) {
        const t = new Date(e.year, e.month - 1, e.day, 12);
        return isNaN(t.getTime()) || t.setFullYear(e.year), t;
      }
      function rd() {
        return new id();
      }
      let sd = (() => {
        class e {}
        return (
          (e.ngInjectableDef = ge({
            factory: rd,
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      class id extends sd {
        getDaysPerWeek() {
          return 7;
        }
        getMonths() {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
        getWeeksPerMonth() {
          return 6;
        }
        getNext(e, t = "d", n = 1) {
          let r = nd(e),
            s = !0,
            i = r.getMonth();
          switch (t) {
            case "y":
              r.setFullYear(r.getFullYear() + n);
              break;
            case "m":
              (i += n), r.setMonth(i), (i %= 12), i < 0 && (i += 12);
              break;
            case "d":
              r.setDate(r.getDate() + n), (s = !1);
              break;
            default:
              return e;
          }
          return s && r.getMonth() !== i && r.setDate(0), td(r);
        }
        getPrev(e, t = "d", n = 1) {
          return this.getNext(e, t, -n);
        }
        getWeekday(e) {
          let t = nd(e).getDay();
          return 0 === t ? 7 : t;
        }
        getWeekNumber(e, t) {
          7 === t && (t = 0);
          const n = nd(e[(11 - t) % 7]);
          n.setDate(n.getDate() + 4 - (n.getDay() || 7));
          const r = n.getTime();
          return (
            n.setMonth(0),
            n.setDate(1),
            Math.floor(Math.round((r - n.getTime()) / 864e5) / 7) + 1
          );
        }
        getToday() {
          return td(new Date());
        }
        isValid(e) {
          if (!(e && Bh(e.year) && Bh(e.month) && Bh(e.day))) return !1;
          if (0 === e.year) return !1;
          const t = nd(e);
          return (
            !isNaN(t.getTime()) &&
            t.getFullYear() === e.year &&
            t.getMonth() + 1 === e.month &&
            t.getDate() === e.day
          );
        }
      }
      function od(e, t) {
        return !(function(e, t) {
          return (!e && !t) || (!!e && !!t && e.equals(t));
        })(e, t);
      }
      function ad(e, t) {
        return !(
          (!e && !t) ||
          (e && t && e.year === t.year && e.month === t.month)
        );
      }
      function ld(e, t, n) {
        return e && t && e.before(t) ? t : e && n && e.after(n) ? n : e;
      }
      function ud(e, t) {
        const { minDate: n, maxDate: r, disabled: s, markDisabled: i } = t;
        return !(
          !qh(e) ||
          s ||
          (i && i(e, { year: e.year, month: e.month })) ||
          (n && e.before(n)) ||
          (r && e.after(r))
        );
      }
      let cd = (() => {
        class e {
          getDayNumerals(e) {
            return `${e.day}`;
          }
          getWeekNumerals(e) {
            return `${e}`;
          }
          getYearNumerals(e) {
            return `${e}`;
          }
        }
        return (
          (e.ngInjectableDef = ge({
            factory: function() {
              return (e = Pe(Os)), new hd(e);
              var e;
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      class hd extends cd {
        constructor(e) {
          super(), (this._locale = e);
          const t = Ea(e, wa.Standalone, Ca.Short);
          (this._weekdaysShort = t.map((e, n) => t[(n + 1) % 7])),
            (this._monthsShort = ka(e, wa.Standalone, Ca.Abbreviated)),
            (this._monthsFull = ka(e, wa.Standalone, Ca.Wide));
        }
        getWeekdayShortName(e) {
          return this._weekdaysShort[e - 1];
        }
        getMonthShortName(e) {
          return this._monthsShort[e - 1];
        }
        getMonthFullName(e) {
          return this._monthsFull[e - 1];
        }
        getDayAriaLabel(e) {
          return (function(e, t, n, r) {
            let s = (function(e) {
              if (Za(e)) return e;
              if ("number" == typeof e && !isNaN(e)) return new Date(e);
              if ("string" == typeof e) {
                e = e.trim();
                const t = parseFloat(e);
                if (!isNaN(e - t)) return new Date(t);
                if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(e)) {
                  const [t, n, r] = e.split("-").map(e => +e);
                  return new Date(t, n - 1, r);
                }
                let n;
                if ((n = e.match(Pa)))
                  return (function(e) {
                    const t = new Date(0);
                    let n = 0,
                      r = 0;
                    const s = e[8] ? t.setUTCFullYear : t.setFullYear,
                      i = e[8] ? t.setUTCHours : t.setHours;
                    e[9] &&
                      ((n = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
                      s.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
                    const o = Number(e[4] || 0) - n,
                      a = Number(e[5] || 0) - r,
                      l = Number(e[6] || 0),
                      u = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
                    return i.call(t, o, a, l, u), t;
                  })(n);
              }
              const t = new Date(e);
              if (!Za(t))
                throw new Error(`Unable to convert "${e}" into a date`);
              return t;
            })(e);
            t =
              (function e(t, n) {
                const r = (function(e) {
                  return bs(e)[gs.LocaleId];
                })(t);
                if (((Ma[r] = Ma[r] || {}), Ma[r][n])) return Ma[r][n];
                let s = "";
                switch (n) {
                  case "shortDate":
                    s = Ta(t, xa.Short);
                    break;
                  case "mediumDate":
                    s = Ta(t, xa.Medium);
                    break;
                  case "longDate":
                    s = Ta(t, xa.Long);
                    break;
                  case "fullDate":
                    s = Ta(t, xa.Full);
                    break;
                  case "shortTime":
                    s = Da(t, xa.Short);
                    break;
                  case "mediumTime":
                    s = Da(t, xa.Medium);
                    break;
                  case "longTime":
                    s = Da(t, xa.Long);
                    break;
                  case "fullTime":
                    s = Da(t, xa.Full);
                    break;
                  case "short":
                    const n = e(t, "shortTime"),
                      r = e(t, "shortDate");
                    s = La(Aa(t, xa.Short), [n, r]);
                    break;
                  case "medium":
                    const i = e(t, "mediumTime"),
                      o = e(t, "mediumDate");
                    s = La(Aa(t, xa.Medium), [i, o]);
                    break;
                  case "long":
                    const a = e(t, "longTime"),
                      l = e(t, "longDate");
                    s = La(Aa(t, xa.Long), [a, l]);
                    break;
                  case "full":
                    const u = e(t, "fullTime"),
                      c = e(t, "fullDate");
                    s = La(Aa(t, xa.Full), [u, c]);
                }
                return s && (Ma[r][n] = s), s;
              })(n, t) || t;
            let i,
              o = [];
            for (; t; ) {
              if (((i = Va.exec(t)), !i)) {
                o.push(t);
                break;
              }
              {
                o = o.concat(i.slice(1));
                const e = o.pop();
                if (!e) break;
                t = e;
              }
            }
            let a = s.getTimezoneOffset();
            r &&
              ((a = Ga(r, a)),
              (s = (function(e, t, n) {
                const r = e.getTimezoneOffset();
                return (function(e, t) {
                  return (
                    (e = new Date(e.getTime())).setMinutes(e.getMinutes() + t),
                    e
                  );
                })(e, -1 * (Ga(t, r) - r));
              })(s, r)));
            let l = "";
            return (
              o.forEach(e => {
                const t = (function(e) {
                  if (Wa[e]) return Wa[e];
                  let t;
                  switch (e) {
                    case "G":
                    case "GG":
                    case "GGG":
                      t = za(Fa.Eras, Ca.Abbreviated);
                      break;
                    case "GGGG":
                      t = za(Fa.Eras, Ca.Wide);
                      break;
                    case "GGGGG":
                      t = za(Fa.Eras, Ca.Narrow);
                      break;
                    case "y":
                      t = Ha(Ua.FullYear, 1, 0, !1, !0);
                      break;
                    case "yy":
                      t = Ha(Ua.FullYear, 2, 0, !0, !0);
                      break;
                    case "yyy":
                      t = Ha(Ua.FullYear, 3, 0, !1, !0);
                      break;
                    case "yyyy":
                      t = Ha(Ua.FullYear, 4, 0, !1, !0);
                      break;
                    case "M":
                    case "L":
                      t = Ha(Ua.Month, 1, 1);
                      break;
                    case "MM":
                    case "LL":
                      t = Ha(Ua.Month, 2, 1);
                      break;
                    case "MMM":
                      t = za(Fa.Months, Ca.Abbreviated);
                      break;
                    case "MMMM":
                      t = za(Fa.Months, Ca.Wide);
                      break;
                    case "MMMMM":
                      t = za(Fa.Months, Ca.Narrow);
                      break;
                    case "LLL":
                      t = za(Fa.Months, Ca.Abbreviated, wa.Standalone);
                      break;
                    case "LLLL":
                      t = za(Fa.Months, Ca.Wide, wa.Standalone);
                      break;
                    case "LLLLL":
                      t = za(Fa.Months, Ca.Narrow, wa.Standalone);
                      break;
                    case "w":
                      t = qa(1);
                      break;
                    case "ww":
                      t = qa(2);
                      break;
                    case "W":
                      t = qa(1, !0);
                      break;
                    case "d":
                      t = Ha(Ua.Date, 1);
                      break;
                    case "dd":
                      t = Ha(Ua.Date, 2);
                      break;
                    case "E":
                    case "EE":
                    case "EEE":
                      t = za(Fa.Days, Ca.Abbreviated);
                      break;
                    case "EEEE":
                      t = za(Fa.Days, Ca.Wide);
                      break;
                    case "EEEEE":
                      t = za(Fa.Days, Ca.Narrow);
                      break;
                    case "EEEEEE":
                      t = za(Fa.Days, Ca.Short);
                      break;
                    case "a":
                    case "aa":
                    case "aaa":
                      t = za(Fa.DayPeriods, Ca.Abbreviated);
                      break;
                    case "aaaa":
                      t = za(Fa.DayPeriods, Ca.Wide);
                      break;
                    case "aaaaa":
                      t = za(Fa.DayPeriods, Ca.Narrow);
                      break;
                    case "b":
                    case "bb":
                    case "bbb":
                      t = za(Fa.DayPeriods, Ca.Abbreviated, wa.Standalone, !0);
                      break;
                    case "bbbb":
                      t = za(Fa.DayPeriods, Ca.Wide, wa.Standalone, !0);
                      break;
                    case "bbbbb":
                      t = za(Fa.DayPeriods, Ca.Narrow, wa.Standalone, !0);
                      break;
                    case "B":
                    case "BB":
                    case "BBB":
                      t = za(Fa.DayPeriods, Ca.Abbreviated, wa.Format, !0);
                      break;
                    case "BBBB":
                      t = za(Fa.DayPeriods, Ca.Wide, wa.Format, !0);
                      break;
                    case "BBBBB":
                      t = za(Fa.DayPeriods, Ca.Narrow, wa.Format, !0);
                      break;
                    case "h":
                      t = Ha(Ua.Hours, 1, -12);
                      break;
                    case "hh":
                      t = Ha(Ua.Hours, 2, -12);
                      break;
                    case "H":
                      t = Ha(Ua.Hours, 1);
                      break;
                    case "HH":
                      t = Ha(Ua.Hours, 2);
                      break;
                    case "m":
                      t = Ha(Ua.Minutes, 1);
                      break;
                    case "mm":
                      t = Ha(Ua.Minutes, 2);
                      break;
                    case "s":
                      t = Ha(Ua.Seconds, 1);
                      break;
                    case "ss":
                      t = Ha(Ua.Seconds, 2);
                      break;
                    case "S":
                      t = Ha(Ua.FractionalSeconds, 1);
                      break;
                    case "SS":
                      t = Ha(Ua.FractionalSeconds, 2);
                      break;
                    case "SSS":
                      t = Ha(Ua.FractionalSeconds, 3);
                      break;
                    case "Z":
                    case "ZZ":
                    case "ZZZ":
                      t = Ba(ja.Short);
                      break;
                    case "ZZZZZ":
                      t = Ba(ja.Extended);
                      break;
                    case "O":
                    case "OO":
                    case "OOO":
                    case "z":
                    case "zz":
                    case "zzz":
                      t = Ba(ja.ShortGMT);
                      break;
                    case "OOOO":
                    case "ZZZZ":
                    case "zzzz":
                      t = Ba(ja.Long);
                      break;
                    default:
                      return null;
                  }
                  return (Wa[e] = t), t;
                })(e);
                l += t
                  ? t(s, n, a)
                  : "''" === e
                  ? "'"
                  : e.replace(/(^'|'$)/g, "").replace(/''/g, "'");
              }),
              l
            );
          })(new Date(e.year, e.month - 1, e.day), "fullDate", this._locale);
        }
      }
      class dd {
        constructor(e, t) {
          (this._calendar = e),
            (this._i18n = t),
            (this._VALIDATORS = {
              dayTemplateData: e => {
                if (this._state.dayTemplateData !== e)
                  return { dayTemplateData: e };
              },
              displayMonths: e => {
                if (Bh((e = Hh(e))) && e > 0 && this._state.displayMonths !== e)
                  return { displayMonths: e };
              },
              disabled: e => {
                if (this._state.disabled !== e) return { disabled: e };
              },
              firstDayOfWeek: e => {
                if (
                  Bh((e = Hh(e))) &&
                  e >= 0 &&
                  this._state.firstDayOfWeek !== e
                )
                  return { firstDayOfWeek: e };
              },
              focusVisible: e => {
                if (this._state.focusVisible !== e && !this._state.disabled)
                  return { focusVisible: e };
              },
              markDisabled: e => {
                if (this._state.markDisabled !== e) return { markDisabled: e };
              },
              maxDate: e => {
                const t = this.toValidDate(e, null);
                if (od(this._state.maxDate, t)) return { maxDate: t };
              },
              minDate: e => {
                const t = this.toValidDate(e, null);
                if (od(this._state.minDate, t)) return { minDate: t };
              },
              navigation: e => {
                if (this._state.navigation !== e) return { navigation: e };
              },
              outsideDays: e => {
                if (this._state.outsideDays !== e) return { outsideDays: e };
              }
            }),
            (this._model$ = new T()),
            (this._dateSelect$ = new T()),
            (this._state = {
              disabled: !1,
              displayMonths: 1,
              firstDayOfWeek: 1,
              focusVisible: !1,
              months: [],
              navigation: "select",
              outsideDays: "visible",
              prevDisabled: !1,
              nextDisabled: !1,
              selectBoxes: { years: [], months: [] },
              selectedDate: null
            });
        }
        get model$() {
          return this._model$.pipe(ua(e => e.months.length > 0));
        }
        get dateSelect$() {
          return this._dateSelect$.pipe(ua(e => null !== e));
        }
        set(e) {
          let t = Object.keys(e)
            .map(t => this._VALIDATORS[t](e[t]))
            .reduce((e, t) => Object.assign({}, e, t), {});
          Object.keys(t).length > 0 && this._nextState(t);
        }
        focus(e) {
          !this._state.disabled &&
            this._calendar.isValid(e) &&
            od(this._state.focusDate, e) &&
            this._nextState({ focusDate: e });
        }
        focusSelect() {
          ud(this._state.focusDate, this._state) &&
            this.select(this._state.focusDate, { emitEvent: !0 });
        }
        open(e) {
          const t = this.toValidDate(e, this._calendar.getToday());
          this._state.disabled ||
            (this._state.firstDate && !ad(this._state.firstDate, e)) ||
            this._nextState({ firstDate: t });
        }
        select(e, t = {}) {
          const n = this.toValidDate(e, null);
          this._state.disabled ||
            (od(this._state.selectedDate, n) &&
              this._nextState({ selectedDate: n }),
            t.emitEvent && ud(n, this._state) && this._dateSelect$.next(n));
        }
        toValidDate(e, t) {
          const n = ed.from(e);
          return (
            void 0 === t && (t = this._calendar.getToday()),
            this._calendar.isValid(n) ? n : t
          );
        }
        _nextState(e) {
          const t = this._updateState(e);
          this._patchContexts(t),
            (this._state = t),
            this._model$.next(this._state);
        }
        _patchContexts(e) {
          const {
            months: t,
            displayMonths: n,
            selectedDate: r,
            focusDate: s,
            focusVisible: i,
            disabled: o,
            outsideDays: a
          } = e;
          e.months.forEach(e => {
            e.weeks.forEach(l => {
              l.days.forEach(l => {
                s && (l.context.focused = s.equals(l.date) && i),
                  (l.tabindex =
                    !o && l.date.equals(s) && s.month === e.number ? 0 : -1),
                  !0 === o && (l.context.disabled = !0),
                  void 0 !== r &&
                    (l.context.selected = null !== r && r.equals(l.date)),
                  e.number !== l.date.month &&
                    (l.hidden =
                      "hidden" === a ||
                      "collapsed" === a ||
                      (n > 1 &&
                        l.date.after(t[0].firstDate) &&
                        l.date.before(t[n - 1].lastDate)));
              });
            });
          });
        }
        _updateState(e) {
          const t = Object.assign({}, this._state, e);
          let n = t.firstDate;
          if (
            (("minDate" in e || "maxDate" in e) &&
              ((function(e, t) {
                if (t && e && t.before(e))
                  throw new Error(
                    `'maxDate' ${t} should be greater than 'minDate' ${e}`
                  );
              })(t.minDate, t.maxDate),
              (t.focusDate = ld(t.focusDate, t.minDate, t.maxDate)),
              (t.firstDate = ld(t.firstDate, t.minDate, t.maxDate)),
              (n = t.focusDate)),
            "disabled" in e && (t.focusVisible = !1),
            "selectedDate" in e &&
              0 === this._state.months.length &&
              (n = t.selectedDate),
            "focusVisible" in e)
          )
            return t;
          if (
            "focusDate" in e &&
            ((t.focusDate = ld(t.focusDate, t.minDate, t.maxDate)),
            (n = t.focusDate),
            0 !== t.months.length &&
              !t.focusDate.before(t.firstDate) &&
              !t.focusDate.after(t.lastDate))
          )
            return t;
          if (
            ("firstDate" in e &&
              ((t.firstDate = ld(t.firstDate, t.minDate, t.maxDate)),
              (n = t.firstDate)),
            n)
          ) {
            const r = (function(e, t, n, r, s) {
              const { displayMonths: i, months: o } = n,
                a = o.splice(0, o.length);
              return (
                Array.from({ length: i }, (n, r) => {
                  const i = Object.assign(e.getNext(t, "m", r), { day: 1 });
                  if (((o[r] = null), !s)) {
                    const e = a.findIndex(e => e.firstDate.equals(i));
                    -1 !== e && (o[r] = a.splice(e, 1)[0]);
                  }
                  return i;
                }).forEach((t, s) => {
                  null === o[s] &&
                    (o[s] = (function(e, t, n, r, s = {}) {
                      const {
                          dayTemplateData: i,
                          minDate: o,
                          maxDate: a,
                          firstDayOfWeek: l,
                          markDisabled: u,
                          outsideDays: c
                        } = n,
                        h = e.getToday();
                      (s.firstDate = null),
                        (s.lastDate = null),
                        (s.number = t.month),
                        (s.year = t.year),
                        (s.weeks = s.weeks || []),
                        (s.weekdays = s.weekdays || []),
                        (t = (function(e, t, n) {
                          const r = e.getDaysPerWeek(),
                            s = new ed(t.year, t.month, 1),
                            i = e.getWeekday(s) % r;
                          return e.getPrev(s, "d", (r + i - n) % r);
                        })(e, t, l));
                      for (let d = 0; d < e.getWeeksPerMonth(); d++) {
                        let n = s.weeks[d];
                        n ||
                          (n = s.weeks[d] = {
                            number: 0,
                            days: [],
                            collapsed: !0
                          });
                        const p = n.days;
                        for (let l = 0; l < e.getDaysPerWeek(); l++) {
                          0 === d && (s.weekdays[l] = e.getWeekday(t));
                          const n = new ed(t.year, t.month, t.day),
                            c = e.getNext(n),
                            f = r.getDayAriaLabel(n);
                          let g = !!((o && n.before(o)) || (a && n.after(a)));
                          !g &&
                            u &&
                            (g = u(n, { month: s.number, year: s.year }));
                          let m = n.equals(h),
                            y = i
                              ? i(n, { month: s.number, year: s.year })
                              : void 0;
                          null === s.firstDate &&
                            n.month === s.number &&
                            (s.firstDate = n),
                            n.month === s.number &&
                              c.month !== s.number &&
                              (s.lastDate = n);
                          let b = p[l];
                          b || (b = p[l] = {}),
                            (b.date = n),
                            (b.context = Object.assign(b.context || {}, {
                              $implicit: n,
                              date: n,
                              data: y,
                              currentMonth: s.number,
                              currentYear: s.year,
                              disabled: g,
                              focused: !1,
                              selected: !1,
                              today: m
                            })),
                            (b.tabindex = -1),
                            (b.ariaLabel = f),
                            (b.hidden = !1),
                            (t = c);
                        }
                        (n.number = e.getWeekNumber(
                          p.map(e => e.date),
                          l
                        )),
                          (n.collapsed =
                            "collapsed" === c &&
                            p[0].date.month !== s.number &&
                            p[p.length - 1].date.month !== s.number);
                      }
                      return s;
                    })(e, t, n, r, a.shift() || {}));
                }),
                o
              );
            })(
              this._calendar,
              n,
              t,
              this._i18n,
              "dayTemplateData" in e ||
                "firstDayOfWeek" in e ||
                "markDisabled" in e ||
                "minDate" in e ||
                "maxDate" in e ||
                "disabled" in e ||
                "outsideDays" in e
            );
            (t.months = r),
              (t.firstDate = r.length > 0 ? r[0].firstDate : void 0),
              (t.lastDate = r.length > 0 ? r[r.length - 1].lastDate : void 0),
              "selectedDate" in e &&
                !ud(t.selectedDate, t) &&
                (t.selectedDate = null),
              "firstDate" in e &&
                (void 0 === t.focusDate ||
                  t.focusDate.before(t.firstDate) ||
                  t.focusDate.after(t.lastDate)) &&
                (t.focusDate = n);
            const s =
                !this._state.firstDate ||
                this._state.firstDate.year !== t.firstDate.year,
              i =
                !this._state.firstDate ||
                this._state.firstDate.month !== t.firstDate.month;
            "select" === t.navigation
              ? (("minDate" in e ||
                  "maxDate" in e ||
                  0 === t.selectBoxes.years.length ||
                  s) &&
                  (t.selectBoxes.years = (function(e, t, n) {
                    if (!e) return [];
                    const r = t ? Math.max(t.year, e.year - 500) : e.year - 10,
                      s =
                        (n ? Math.min(n.year, e.year + 500) : e.year + 10) -
                        r +
                        1,
                      i = Array(s);
                    for (let o = 0; o < s; o++) i[o] = r + o;
                    return i;
                  })(t.firstDate, t.minDate, t.maxDate)),
                ("minDate" in e ||
                  "maxDate" in e ||
                  0 === t.selectBoxes.months.length ||
                  s) &&
                  (t.selectBoxes.months = (function(e, t, n, r) {
                    if (!t) return [];
                    let s = e.getMonths(t.year);
                    if (n && t.year === n.year) {
                      const e = s.findIndex(e => e === n.month);
                      s = s.slice(e);
                    }
                    if (r && t.year === r.year) {
                      const e = s.findIndex(e => e === r.month);
                      s = s.slice(0, e + 1);
                    }
                    return s;
                  })(this._calendar, t.firstDate, t.minDate, t.maxDate)))
              : (t.selectBoxes = { years: [], months: [] }),
              ("arrows" !== t.navigation && "select" !== t.navigation) ||
                !(
                  i ||
                  s ||
                  "minDate" in e ||
                  "maxDate" in e ||
                  "disabled" in e
                ) ||
                ((t.prevDisabled =
                  t.disabled ||
                  (function(e, t, n) {
                    const r = Object.assign(e.getPrev(t, "m"), { day: 1 });
                    return (
                      n &&
                      ((r.year === n.year && r.month < n.month) ||
                        (r.year < n.year && 1 === n.month))
                    );
                  })(this._calendar, t.firstDate, t.minDate)),
                (t.nextDisabled =
                  t.disabled ||
                  (function(e, t, n) {
                    const r = Object.assign(e.getNext(t, "m"), { day: 1 });
                    return n && r.after(n);
                  })(this._calendar, t.lastDate, t.maxDate)));
          }
          return t;
        }
      }
      const pd = (function() {
        var e = {
          Tab: 9,
          Enter: 13,
          Escape: 27,
          Space: 32,
          PageUp: 33,
          PageDown: 34,
          End: 35,
          Home: 36,
          ArrowLeft: 37,
          ArrowUp: 38,
          ArrowRight: 39,
          ArrowDown: 40
        };
        return (
          (e[e.Tab] = "Tab"),
          (e[e.Enter] = "Enter"),
          (e[e.Escape] = "Escape"),
          (e[e.Space] = "Space"),
          (e[e.PageUp] = "PageUp"),
          (e[e.PageDown] = "PageDown"),
          (e[e.End] = "End"),
          (e[e.Home] = "Home"),
          (e[e.ArrowLeft] = "ArrowLeft"),
          (e[e.ArrowUp] = "ArrowUp"),
          (e[e.ArrowRight] = "ArrowRight"),
          (e[e.ArrowDown] = "ArrowDown"),
          e
        );
      })();
      let fd = (() => {
        class e {
          processKey(e, t, n) {
            const r = t.state;
            switch (e.which) {
              case pd.PageUp:
                t.focusDate(
                  n.getPrev(r.focusedDate, e.shiftKey ? "y" : "m", 1)
                );
                break;
              case pd.PageDown:
                t.focusDate(
                  n.getNext(r.focusedDate, e.shiftKey ? "y" : "m", 1)
                );
                break;
              case pd.End:
                t.focusDate(e.shiftKey ? r.maxDate : r.lastDate);
                break;
              case pd.Home:
                t.focusDate(e.shiftKey ? r.minDate : r.firstDate);
                break;
              case pd.ArrowLeft:
                t.focusDate(n.getPrev(r.focusedDate, "d", 1));
                break;
              case pd.ArrowUp:
                t.focusDate(n.getPrev(r.focusedDate, "d", n.getDaysPerWeek()));
                break;
              case pd.ArrowRight:
                t.focusDate(n.getNext(r.focusedDate, "d", 1));
                break;
              case pd.ArrowDown:
                t.focusDate(n.getNext(r.focusedDate, "d", n.getDaysPerWeek()));
                break;
              case pd.Enter:
              case pd.Space:
                t.focusSelect();
                break;
              default:
                return;
            }
            e.preventDefault(), e.stopPropagation();
          }
        }
        return (
          (e.ngInjectableDef = ge({
            factory: function() {
              return new e();
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      const gd = (function() {
        var e = { PREV: 0, NEXT: 1 };
        return (e[e.PREV] = "PREV"), (e[e.NEXT] = "NEXT"), e;
      })();
      let md = (() => {
        class e {
          constructor() {
            (this.displayMonths = 1),
              (this.firstDayOfWeek = 1),
              (this.navigation = "select"),
              (this.outsideDays = "visible"),
              (this.showWeekdays = !0),
              (this.showWeekNumbers = !1);
          }
        }
        return (
          (e.ngInjectableDef = ge({
            factory: function() {
              return new e();
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      function yd() {
        return new vd();
      }
      let bd = (() => {
        class e {}
        return (
          (e.ngInjectableDef = ge({
            factory: yd,
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      class vd extends bd {
        fromModel(e) {
          return e && Bh(e.year) && Bh(e.month) && Bh(e.day)
            ? { year: e.year, month: e.month, day: e.day }
            : null;
        }
        toModel(e) {
          return e && Bh(e.year) && Bh(e.month) && Bh(e.day)
            ? { year: e.year, month: e.month, day: e.day }
            : null;
        }
      }
      class _d {
        constructor(e, t, n, r, s, i, o, a, l) {
          (this._service = e),
            (this._calendar = t),
            (this.i18n = n),
            (this._keyboardService = s),
            (this._elementRef = o),
            (this._ngbDateAdapter = a),
            (this._ngZone = l),
            (this._destroyed$ = new T()),
            (this._publicState = {}),
            (this.navigate = new vs()),
            (this.dateSelect = new vs()),
            (this.select = this.dateSelect),
            (this.onChange = e => {}),
            (this.onTouched = () => {}),
            [
              "dayTemplate",
              "dayTemplateData",
              "displayMonths",
              "firstDayOfWeek",
              "footerTemplate",
              "markDisabled",
              "minDate",
              "maxDate",
              "navigation",
              "outsideDays",
              "showWeekdays",
              "showWeekNumbers",
              "startDate"
            ].forEach(e => (this[e] = r[e])),
            e.dateSelect$.pipe(Ch(this._destroyed$)).subscribe(e => {
              this.dateSelect.emit(e);
            }),
            e.model$.pipe(Ch(this._destroyed$)).subscribe(e => {
              const t = e.firstDate,
                n = this.model ? this.model.firstDate : null;
              this._publicState = {
                maxDate: e.maxDate,
                minDate: e.minDate,
                firstDate: e.firstDate,
                lastDate: e.lastDate,
                focusedDate: e.focusDate
              };
              let r = !1;
              if (
                !t.equals(n) &&
                (this.navigate.emit({
                  current: n ? { year: n.year, month: n.month } : null,
                  next: { year: t.year, month: t.month },
                  preventDefault: () => (r = !0)
                }),
                r && null !== n)
              )
                return void this._service.open(n);
              const s = e.selectedDate,
                o = e.focusDate,
                a = this.model ? this.model.focusDate : null;
              (this.model = e),
                od(s, this._controlValue) &&
                  ((this._controlValue = s),
                  this.onTouched(),
                  this.onChange(this._ngbDateAdapter.toModel(s))),
                od(o, a) && a && e.focusVisible && this.focus(),
                i.markForCheck();
            });
        }
        get state() {
          return this._publicState;
        }
        focusDate(e) {
          this._service.focus(ed.from(e));
        }
        focusSelect() {
          this._service.focusSelect();
        }
        focus() {
          this._ngZone.onStable
            .asObservable()
            .pipe(Th(1))
            .subscribe(() => {
              const e = this._elementRef.nativeElement.querySelector(
                'div.ngb-dp-day[tabindex="0"]'
              );
              e && e.focus();
            });
        }
        navigateTo(e) {
          this._service.open(
            ed.from(e ? (e.day ? e : Object.assign({}, e, { day: 1 })) : null)
          );
        }
        ngAfterViewInit() {
          this._ngZone.runOutsideAngular(() => {
            const e = mh(this._monthsEl.nativeElement, "focusin"),
              t = mh(this._monthsEl.nativeElement, "focusout"),
              { nativeElement: n } = this._elementRef;
            J(e, t)
              .pipe(
                ua(
                  ({ target: e, relatedTarget: t }) =>
                    !(
                      Wh(e, "ngb-dp-day") &&
                      Wh(t, "ngb-dp-day") &&
                      n.contains(e) &&
                      n.contains(t)
                    )
                ),
                Ch(this._destroyed$)
              )
              .subscribe(({ type: e }) =>
                this._ngZone.run(() =>
                  this._service.set({ focusVisible: "focusin" === e })
                )
              );
          });
        }
        ngOnDestroy() {
          this._destroyed$.next();
        }
        ngOnInit() {
          if (void 0 === this.model) {
            const e = {};
            [
              "dayTemplateData",
              "displayMonths",
              "markDisabled",
              "firstDayOfWeek",
              "navigation",
              "minDate",
              "maxDate",
              "outsideDays"
            ].forEach(t => (e[t] = this[t])),
              this._service.set(e),
              this.navigateTo(this.startDate);
          }
        }
        ngOnChanges(e) {
          const t = {};
          if (
            ([
              "dayTemplateData",
              "displayMonths",
              "markDisabled",
              "firstDayOfWeek",
              "navigation",
              "minDate",
              "maxDate",
              "outsideDays"
            ]
              .filter(t => t in e)
              .forEach(e => (t[e] = this[e])),
            this._service.set(t),
            "startDate" in e)
          ) {
            const { currentValue: t, previousValue: n } = e.startDate;
            ad(n, t) && this.navigateTo(this.startDate);
          }
        }
        onDateSelect(e) {
          this._service.focus(e), this._service.select(e, { emitEvent: !0 });
        }
        onKeyDown(e) {
          this._keyboardService.processKey(e, this, this._calendar);
        }
        onNavigateDateSelect(e) {
          this._service.open(e);
        }
        onNavigateEvent(e) {
          switch (e) {
            case gd.PREV:
              this._service.open(
                this._calendar.getPrev(this.model.firstDate, "m", 1)
              );
              break;
            case gd.NEXT:
              this._service.open(
                this._calendar.getNext(this.model.firstDate, "m", 1)
              );
          }
        }
        registerOnChange(e) {
          this.onChange = e;
        }
        registerOnTouched(e) {
          this.onTouched = e;
        }
        setDisabledState(e) {
          this._service.set({ disabled: e });
        }
        writeValue(e) {
          (this._controlValue = ed.from(this._ngbDateAdapter.fromModel(e))),
            this._service.select(this._controlValue);
        }
      }
      class wd {
        constructor(e) {
          (this.i18n = e), (this.select = new vs());
        }
        doSelect(e) {
          e.context.disabled || e.hidden || this.select.emit(e.date);
        }
      }
      class Cd {
        constructor(e) {
          (this.i18n = e),
            (this.navigation = gd),
            (this.months = []),
            (this.navigate = new vs()),
            (this.select = new vs());
        }
        onClickPrev(e) {
          e.currentTarget.focus(), this.navigate.emit(this.navigation.PREV);
        }
        onClickNext(e) {
          e.currentTarget.focus(), this.navigate.emit(this.navigation.NEXT);
        }
      }
      const xd = [
        "a[href]",
        "button:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[contenteditable]",
        '[tabindex]:not([tabindex="-1"])'
      ].join(", ");
      function Sd(e) {
        const t = Array.from(e.querySelectorAll(xd)).filter(
          e => -1 !== e.tabIndex
        );
        return [t[0], t[t.length - 1]];
      }
      class Ed {
        constructor(e) {
          this.i18n = e;
        }
        isMuted() {
          return (
            !this.selected &&
            (this.date.month !== this.currentMonth || this.disabled)
          );
        }
      }
      class kd {
        constructor(e, t) {
          (this.i18n = e),
            (this._renderer = t),
            (this.select = new vs()),
            (this._month = -1),
            (this._year = -1);
        }
        changeMonth(e) {
          this.select.emit(new ed(this.date.year, Hh(e), 1));
        }
        changeYear(e) {
          this.select.emit(new ed(Hh(e), this.date.month, 1));
        }
        ngAfterViewChecked() {
          this.date &&
            (this.date.month !== this._month &&
              ((this._month = this.date.month),
              this._renderer.setProperty(
                this.monthSelect.nativeElement,
                "value",
                this._month
              )),
            this.date.year !== this._year &&
              ((this._year = this.date.year),
              this._renderer.setProperty(
                this.yearSelect.nativeElement,
                "value",
                this._year
              )));
        }
      }
      class Td {}
      class Dd {}
      let Ad = (() => {
        class e {
          constructor() {
            (this.backdrop = !0), (this.keyboard = !0);
          }
        }
        return (
          (e.ngInjectableDef = ge({
            factory: function() {
              return new e();
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      class Id {
        constructor(e, t, n) {
          (this.nodes = e), (this.viewRef = t), (this.componentRef = n);
        }
      }
      const Od = () => {};
      let Rd = (() => {
        class e {
          constructor(e) {
            this._document = e;
          }
          compensate() {
            const e = this._getWidth();
            return this._isPresent(e) ? this._adjustBody(e) : Od;
          }
          _adjustBody(e) {
            const t = this._document.body,
              n = t.style.paddingRight,
              r = parseFloat(window.getComputedStyle(t)["padding-right"]);
            return (
              (t.style["padding-right"] = `${r + e}px`),
              () => (t.style["padding-right"] = n)
            );
          }
          _isPresent(e) {
            const t = this._document.body.getBoundingClientRect();
            return window.innerWidth - (t.left + t.right) >= e - 0.1 * e;
          }
          _getWidth() {
            const e = this._document.createElement("div");
            e.className = "modal-scrollbar-measure";
            const t = this._document.body;
            t.appendChild(e);
            const n = e.getBoundingClientRect().width - e.clientWidth;
            return t.removeChild(e), n;
          }
        }
        return (
          (e.ngInjectableDef = ge({
            factory: function() {
              return new e(Pe(hl));
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      class Nd {}
      class Pd {
        close(e) {}
        dismiss(e) {}
      }
      class Md {
        constructor(e, t, n, r) {
          (this._windowCmptRef = e),
            (this._contentRef = t),
            (this._backdropCmptRef = n),
            (this._beforeDismiss = r),
            e.instance.dismissEvent.subscribe(e => {
              this.dismiss(e);
            }),
            (this.result = new Promise((e, t) => {
              (this._resolve = e), (this._reject = t);
            })),
            this.result.then(null, () => {});
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef)
            return this._contentRef.componentRef.instance;
        }
        close(e) {
          this._windowCmptRef &&
            (this._resolve(e), this._removeModalElements());
        }
        _dismiss(e) {
          this._reject(e), this._removeModalElements();
        }
        dismiss(e) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const t = this._beforeDismiss();
              t && t.then
                ? t.then(
                    t => {
                      !1 !== t && this._dismiss(e);
                    },
                    () => {}
                  )
                : !1 !== t && this._dismiss(e);
            } else this._dismiss(e);
        }
        _removeModalElements() {
          const e = this._windowCmptRef.location.nativeElement;
          if (
            (e.parentNode.removeChild(e),
            this._windowCmptRef.destroy(),
            this._backdropCmptRef)
          ) {
            const e = this._backdropCmptRef.location.nativeElement;
            e.parentNode.removeChild(e), this._backdropCmptRef.destroy();
          }
          this._contentRef &&
            this._contentRef.viewRef &&
            this._contentRef.viewRef.destroy(),
            (this._windowCmptRef = null),
            (this._backdropCmptRef = null),
            (this._contentRef = null);
        }
      }
      const Vd = (function() {
        var e = { BACKDROP_CLICK: 0, ESC: 1 };
        return (e[e.BACKDROP_CLICK] = "BACKDROP_CLICK"), (e[e.ESC] = "ESC"), e;
      })();
      class jd {
        constructor(e, t, n) {
          (this._document = e),
            (this._elRef = t),
            (this._zone = n),
            (this._closed$ = new T()),
            (this.backdrop = !0),
            (this.keyboard = !0),
            (this.dismissEvent = new vs());
        }
        dismiss(e) {
          this.dismissEvent.emit(e);
        }
        ngOnInit() {
          this._elWithFocus = this._document.activeElement;
        }
        ngAfterViewInit() {
          const { nativeElement: e } = this._elRef;
          if (
            (this._zone.runOutsideAngular(() => {
              mh(e, "keydown")
                .pipe(
                  Ch(this._closed$),
                  ua(e => e.which === pd.Escape && this.keyboard)
                )
                .subscribe(e =>
                  requestAnimationFrame(() => {
                    e.defaultPrevented ||
                      this._zone.run(() => this.dismiss(Vd.ESC));
                  })
                );
              let t = !1;
              mh(this._dialogEl.nativeElement, "mousedown")
                .pipe(
                  Ch(this._closed$),
                  Ih(() => (t = !1)),
                  vh(() => mh(e, "mouseup").pipe(Ch(this._closed$), Th(1))),
                  ua(({ target: t }) => e === t)
                )
                .subscribe(() => {
                  t = !0;
                }),
                mh(e, "click")
                  .pipe(Ch(this._closed$))
                  .subscribe(({ target: n }) => {
                    !0 !== this.backdrop ||
                      e !== n ||
                      t ||
                      this._zone.run(() => this.dismiss(Vd.BACKDROP_CLICK)),
                      (t = !1);
                  });
            }),
            !e.contains(document.activeElement))
          ) {
            const t = e.querySelector("[ngbAutofocus]"),
              n = Sd(e)[0];
            (t || n || e).focus();
          }
        }
        ngOnDestroy() {
          const e = this._document.body,
            t = this._elWithFocus;
          let n;
          (n = t && t.focus && e.contains(t) ? t : e),
            this._zone.runOutsideAngular(() => {
              setTimeout(() => n.focus()), (this._elWithFocus = null);
            }),
            this._closed$.next();
        }
      }
      let Ud = (() => {
          class e {
            constructor(e, t, n, r, s, i) {
              (this._applicationRef = e),
                (this._injector = t),
                (this._document = n),
                (this._scrollBar = r),
                (this._rendererFactory = s),
                (this._ngZone = i),
                (this._activeWindowCmptHasChanged = new T()),
                (this._ariaHiddenValues = new Map()),
                (this._backdropAttributes = ["backdropClass"]),
                (this._modalRefs = []),
                (this._windowAttributes = [
                  "ariaLabelledBy",
                  "backdrop",
                  "centered",
                  "keyboard",
                  "scrollable",
                  "size",
                  "windowClass"
                ]),
                (this._windowCmpts = []),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const e = this._windowCmpts[this._windowCmpts.length - 1];
                    ((e, t, n, r = !1) => {
                      this._ngZone.runOutsideAngular(() => {
                        const e = mh(t, "focusin").pipe(
                          Ch(n),
                          H(e => e.target)
                        );
                        mh(t, "keydown")
                          .pipe(
                            Ch(n),
                            ua(e => e.which === pd.Tab),
                            Nh(e)
                          )
                          .subscribe(([e, n]) => {
                            const [r, s] = Sd(t);
                            (n !== r && n !== t) ||
                              !e.shiftKey ||
                              (s.focus(), e.preventDefault()),
                              n !== s ||
                                e.shiftKey ||
                                (r.focus(), e.preventDefault());
                          }),
                          r &&
                            mh(t, "click")
                              .pipe(
                                Ch(n),
                                Nh(e),
                                H(e => e[1])
                              )
                              .subscribe(e => e.focus());
                      });
                    })(
                      0,
                      e.location.nativeElement,
                      this._activeWindowCmptHasChanged
                    ),
                      this._revertAriaHidden(),
                      this._setAriaHidden(e.location.nativeElement);
                  }
                });
            }
            open(e, t, n, r) {
              const s = qh(r.container)
                  ? this._document.querySelector(r.container)
                  : this._document.body,
                i = this._rendererFactory.createRenderer(null, null),
                o = this._scrollBar.compensate(),
                a = () => {
                  this._modalRefs.length ||
                    (i.removeClass(this._document.body, "modal-open"),
                    this._revertAriaHidden());
                };
              if (!s)
                throw new Error(
                  `The specified modal container "${r.container ||
                    "body"}" was not found in the DOM.`
                );
              const l = new Pd(),
                u = this._getContentRef(e, r.injector || t, n, l, r);
              let c = !1 !== r.backdrop ? this._attachBackdrop(e, s) : null,
                h = this._attachWindowComponent(e, s, u),
                d = new Md(h, u, c, r.beforeDismiss);
              return (
                this._registerModalRef(d),
                this._registerWindowCmpt(h),
                d.result.then(o, o),
                d.result.then(a, a),
                (l.close = e => {
                  d.close(e);
                }),
                (l.dismiss = e => {
                  d.dismiss(e);
                }),
                this._applyWindowOptions(h.instance, r),
                1 === this._modalRefs.length &&
                  i.addClass(this._document.body, "modal-open"),
                c && c.instance && this._applyBackdropOptions(c.instance, r),
                d
              );
            }
            dismissAll(e) {
              this._modalRefs.forEach(t => t.dismiss(e));
            }
            hasOpenModals() {
              return this._modalRefs.length > 0;
            }
            _attachBackdrop(e, t) {
              let n = e.resolveComponentFactory(Nd).create(this._injector);
              return (
                this._applicationRef.attachView(n.hostView),
                t.appendChild(n.location.nativeElement),
                n
              );
            }
            _attachWindowComponent(e, t, n) {
              let r = e
                .resolveComponentFactory(jd)
                .create(this._injector, n.nodes);
              return (
                this._applicationRef.attachView(r.hostView),
                t.appendChild(r.location.nativeElement),
                r
              );
            }
            _applyWindowOptions(e, t) {
              this._windowAttributes.forEach(n => {
                qh(t[n]) && (e[n] = t[n]);
              });
            }
            _applyBackdropOptions(e, t) {
              this._backdropAttributes.forEach(n => {
                qh(t[n]) && (e[n] = t[n]);
              });
            }
            _getContentRef(e, t, n, r, s) {
              return n
                ? n instanceof En
                  ? this._createFromTemplateRef(n, r)
                  : "string" == typeof n
                  ? this._createFromString(n)
                  : this._createFromComponent(e, t, n, r, s)
                : new Id([]);
            }
            _createFromTemplateRef(e, t) {
              const n = e.createEmbeddedView({
                $implicit: t,
                close(e) {
                  t.close(e);
                },
                dismiss(e) {
                  t.dismiss(e);
                }
              });
              return (
                this._applicationRef.attachView(n), new Id([n.rootNodes], n)
              );
            }
            _createFromString(e) {
              const t = this._document.createTextNode(`${e}`);
              return new Id([[t]]);
            }
            _createFromComponent(e, t, n, r, s) {
              const i = e.resolveComponentFactory(n),
                o = Tt.create({
                  providers: [{ provide: Pd, useValue: r }],
                  parent: t
                }),
                a = i.create(o),
                l = a.location.nativeElement;
              return (
                s.scrollable && l.classList.add("component-host-scrollable"),
                this._applicationRef.attachView(a.hostView),
                new Id([[l]], a.hostView, a)
              );
            }
            _setAriaHidden(e) {
              const t = e.parentElement;
              t &&
                e !== this._document.body &&
                (Array.from(t.children).forEach(t => {
                  t !== e &&
                    "SCRIPT" !== t.nodeName &&
                    (this._ariaHiddenValues.set(
                      t,
                      t.getAttribute("aria-hidden")
                    ),
                    t.setAttribute("aria-hidden", "true"));
                }),
                this._setAriaHidden(t));
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((e, t) => {
                e
                  ? t.setAttribute("aria-hidden", e)
                  : t.removeAttribute("aria-hidden");
              }),
                this._ariaHiddenValues.clear();
            }
            _registerModalRef(e) {
              const t = () => {
                const t = this._modalRefs.indexOf(e);
                t > -1 && this._modalRefs.splice(t, 1);
              };
              this._modalRefs.push(e), e.result.then(t, t);
            }
            _registerWindowCmpt(e) {
              this._windowCmpts.push(e),
                this._activeWindowCmptHasChanged.next(),
                e.onDestroy(() => {
                  const t = this._windowCmpts.indexOf(e);
                  t > -1 &&
                    (this._windowCmpts.splice(t, 1),
                    this._activeWindowCmptHasChanged.next());
                });
            }
          }
          return (
            (e.ngInjectableDef = ge({
              factory: function() {
                return new e(Pe(di), Pe(De), Pe(hl), Pe(Rd), Pe(rn), Pe(Zs));
              },
              token: e,
              providedIn: "root"
            })),
            e
          );
        })(),
        Fd = (() => {
          class e {
            constructor(e, t, n, r) {
              (this._moduleCFR = e),
                (this._injector = t),
                (this._modalStack = n),
                (this._config = r);
            }
            open(e, t = {}) {
              const n = Object.assign({}, this._config, t);
              return this._modalStack.open(
                this._moduleCFR,
                this._injector,
                e,
                n
              );
            }
            dismissAll(e) {
              this._modalStack.dismissAll(e);
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals();
            }
          }
          return (
            (e.ngInjectableDef = ge({
              factory: function() {
                return new e(Pe(Kt), Pe(De), Pe(Ud), Pe(Ad));
              },
              token: e,
              providedIn: "root"
            })),
            e
          );
        })();
      class Ld {}
      class $d {}
      class Hd {}
      class zd {
        isTitleTemplate() {
          return this.title instanceof En;
        }
      }
      class Bd {}
      class qd {}
      class Wd {}
      class Gd {}
      class Zd {}
      class Qd {}
      class Kd {}
      class Yd {}
      class Jd {
        constructor() {
          this.highlightClass = "ngb-highlight";
        }
        ngOnChanges(e) {
          const t = zh(this.result),
            n = (Array.isArray(this.term) ? this.term : [this.term])
              .map(e => zh(e).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"))
              .filter(e => e);
          this.parts = n.length
            ? t.split(new RegExp(`(${n.join("|")})`, "gmi"))
            : [t];
        }
      }
      class Xd {
        constructor() {
          (this.activeIdx = 0),
            (this.focusFirst = !0),
            (this.formatter = zh),
            (this.selectEvent = new vs()),
            (this.activeChangeEvent = new vs());
        }
        hasActive() {
          return this.activeIdx > -1 && this.activeIdx < this.results.length;
        }
        getActive() {
          return this.results[this.activeIdx];
        }
        markActive(e) {
          (this.activeIdx = e), this._activeChanged();
        }
        next() {
          this.activeIdx === this.results.length - 1
            ? (this.activeIdx = this.focusFirst
                ? (this.activeIdx + 1) % this.results.length
                : -1)
            : this.activeIdx++,
            this._activeChanged();
        }
        prev() {
          this.activeIdx < 0
            ? (this.activeIdx = this.results.length - 1)
            : 0 === this.activeIdx
            ? (this.activeIdx = this.focusFirst ? this.results.length - 1 : -1)
            : this.activeIdx--,
            this._activeChanged();
        }
        resetActive() {
          (this.activeIdx = this.focusFirst ? 0 : -1), this._activeChanged();
        }
        select(e) {
          this.selectEvent.emit(e);
        }
        ngOnInit() {
          this.resetActive();
        }
        _activeChanged() {
          this.activeChangeEvent.emit(
            this.activeIdx >= 0 ? this.id + "-" + this.activeIdx : void 0
          );
        }
      }
      class ep {}
      class tp {}
      var np = zn({
        encapsulation: 2,
        styles: ["ngb-alert{display:block}"],
        data: {}
      });
      function rp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              2,
              "button",
              [
                ["aria-label", "Close"],
                ["class", "close"],
                ["type", "button"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.closeHandler() && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(),
            Ri(
              1,
              0,
              null,
              null,
              1,
              "span",
              [["aria-hidden", "true"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(-1, null, ["\xd7"]))
          ],
          null,
          null
        );
      }
      function sp(e) {
        return Qi(
          2,
          [
            Hi(null, 0),
            (e()(), Oi(16777216, null, null, 1, null, rp)),
            Yr(2, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, t.component.dismissible);
          },
          null
        );
      }
      function ip(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-alert",
              [
                ["class", "alert"],
                ["role", "alert"]
              ],
              [[2, "alert-dismissible", null]],
              null,
              null,
              sp,
              np
            )),
            Yr(1, 638976, null, 0, Qh, [Zh, on, en], null, null)
          ],
          function(e, t) {
            e(t, 1, 0);
          },
          function(e, t) {
            e(t, 0, 0, Ur(t, 1).dismissible);
          }
        );
      }
      var op = Tr(
          "ngb-alert",
          Qh,
          ip,
          { dismissible: "dismissible", type: "type" },
          { close: "close" },
          ["*"]
        ),
        ap = zn({
          encapsulation: 2,
          styles: [
            'ngb-datepicker-month-view{display:block}.ngb-dp-week-number,.ngb-dp-weekday{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:#5bc0de;color:var(--info)}.ngb-dp-week{border-radius:.25rem;display:-ms-flexbox;display:flex}.ngb-dp-weekdays{border-bottom:1px solid rgba(0,0,0,.125);border-radius:0;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-day,.ngb-dp-week-number,.ngb-dp-weekday{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default}.ngb-dp-day[tabindex="0"]{z-index:1}'
          ],
          data: {}
        });
      function lp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              0,
              "div",
              [["class", "ngb-dp-weekday ngb-dp-showweek"]],
              null,
              null,
              null,
              null,
              null
            ))
          ],
          null,
          null
        );
      }
      function up(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "div",
              [
                ["class", "ngb-dp-weekday small"],
                ["role", "columnheader"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(1, null, [" ", " "]))
          ],
          null,
          function(e, t) {
            e(
              t,
              1,
              0,
              t.component.i18n.getWeekdayShortName(t.context.$implicit)
            );
          }
        );
      }
      function cp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              4,
              "div",
              [
                ["class", "ngb-dp-week ngb-dp-weekdays"],
                ["role", "row"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, lp)),
            Yr(2, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(16777216, null, null, 1, null, up)),
            Yr(
              4,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 2, 0, n.showWeekNumbers), e(t, 4, 0, n.month.weekdays);
          },
          null
        );
      }
      function hp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ngb-dp-week-number small text-muted"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(
              t,
              1,
              0,
              t.component.i18n.getWeekNumerals(
                t.parent.parent.context.$implicit.number
              )
            );
          }
        );
      }
      function dp(e) {
        return Qi(0, [(e()(), Oi(0, null, null, 0))], null, null);
      }
      function pp(e) {
        return Qi(
          0,
          [
            (e()(), Oi(16777216, null, null, 1, null, dp)),
            Yr(
              1,
              540672,
              null,
              0,
              ul,
              [Tn],
              {
                ngTemplateOutletContext: [0, "ngTemplateOutletContext"],
                ngTemplateOutlet: [1, "ngTemplateOutlet"]
              },
              null
            ),
            (e()(), Oi(0, null, null, 0))
          ],
          function(e, t) {
            e(
              t,
              1,
              0,
              t.parent.context.$implicit.context,
              t.component.dayTemplate
            );
          },
          null
        );
      }
      function fp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              2,
              "div",
              [
                ["class", "ngb-dp-day"],
                ["role", "gridcell"]
              ],
              [
                [2, "disabled", null],
                [8, "tabIndex", 0],
                [2, "hidden", null],
                [2, "ngb-dp-today", null],
                [1, "aria-label", 0]
              ],
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (e.component.doSelect(e.context.$implicit),
                    (r = !1 !== n.preventDefault() && r)),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, pp)),
            Yr(2, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            e(t, 2, 0, !t.context.$implicit.hidden);
          },
          function(e, t) {
            e(
              t,
              0,
              0,
              t.context.$implicit.context.disabled,
              t.context.$implicit.tabindex,
              t.context.$implicit.hidden,
              t.context.$implicit.context.today,
              t.context.$implicit.ariaLabel
            );
          }
        );
      }
      function gp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              4,
              "div",
              [
                ["class", "ngb-dp-week"],
                ["role", "row"]
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, hp)),
            Yr(2, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(16777216, null, null, 1, null, fp)),
            Yr(
              4,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.component.showWeekNumbers),
              e(t, 4, 0, t.parent.context.$implicit.days);
          },
          null
        );
      }
      function mp(e) {
        return Qi(
          0,
          [
            (e()(), Oi(16777216, null, null, 1, null, gp)),
            Yr(1, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(0, null, null, 0))
          ],
          function(e, t) {
            e(t, 1, 0, !t.context.$implicit.collapsed);
          },
          null
        );
      }
      function yp(e) {
        return Qi(
          0,
          [
            (e()(), Oi(16777216, null, null, 1, null, cp)),
            Yr(1, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(16777216, null, null, 1, null, mp)),
            Yr(
              3,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 1, 0, n.showWeekdays), e(t, 3, 0, n.month.weeks);
          },
          null
        );
      }
      var bp = zn({
        encapsulation: 2,
        styles: [
          "[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:0 0}[ngbDatepickerDayView].outside{opacity:.5}"
        ],
        data: {}
      });
      function vp(e) {
        return Qi(2, [(e()(), Wi(0, null, ["", ""]))], null, function(e, t) {
          var n = t.component;
          e(t, 0, 0, n.i18n.getDayNumerals(n.date));
        });
      }
      var _p = zn({
        encapsulation: 2,
        styles: [
          "ngb-datepicker-navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.right .ngb-dp-navigation-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{-ms-flex-pack:end;justify-content:flex-end}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:-ms-flexbox;display:flex;-ms-flex:1 1 9rem;flex:1 1 9rem}"
        ],
        data: {}
      });
      function wp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-datepicker-navigation-select",
              [["class", "ngb-dp-navigation-select"]],
              null,
              [[null, "select"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "select" === t &&
                    (r = !1 !== e.component.select.emit(n) && r),
                  r
                );
              },
              Ip,
              Tp
            )),
            Yr(
              1,
              8437760,
              null,
              0,
              kd,
              [cd, on],
              {
                date: [0, "date"],
                disabled: [1, "disabled"],
                months: [2, "months"],
                years: [3, "years"]
              },
              { select: "select" }
            )
          ],
          function(e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              n.date,
              n.disabled,
              n.selectBoxes.months,
              n.selectBoxes.years
            );
          },
          null
        );
      }
      function Cp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              0,
              "div",
              [["class", "ngb-dp-arrow"]],
              null,
              null,
              null,
              null,
              null
            ))
          ],
          null,
          null
        );
      }
      function xp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              0,
              "div",
              [["class", "ngb-dp-arrow"]],
              null,
              null,
              null,
              null,
              null
            ))
          ],
          null,
          null
        );
      }
      function Sp(e) {
        return Qi(
          0,
          [
            (e()(), Oi(16777216, null, null, 1, null, Cp)),
            Yr(1, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ri(
              2,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ngb-dp-month-name"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(3, null, [" ", " ", " "])),
            (e()(), Oi(16777216, null, null, 1, null, xp)),
            Yr(5, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(0, null, null, 0))
          ],
          function(e, t) {
            var n = t.component;
            e(t, 1, 0, t.context.index > 0),
              e(t, 5, 0, t.context.index !== n.months.length - 1);
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              3,
              0,
              n.i18n.getMonthFullName(
                t.context.$implicit.number,
                t.context.$implicit.year
              ),
              n.i18n.getYearNumerals(t.context.$implicit.year)
            );
          }
        );
      }
      function Ep(e) {
        return Qi(
          0,
          [
            (e()(), Oi(16777216, null, null, 1, null, Sp)),
            Yr(
              1,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(), Oi(0, null, null, 0))
          ],
          function(e, t) {
            e(t, 1, 0, t.component.months);
          },
          null
        );
      }
      function kp(e) {
        return Qi(
          2,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              2,
              "div",
              [["class", "ngb-dp-arrow"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              1,
              0,
              null,
              null,
              1,
              "button",
              [
                ["aria-label", "Previous month"],
                ["class", "btn btn-link ngb-dp-arrow-btn"],
                ["title", "Previous month"],
                ["type", "button"]
              ],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onClickPrev(n) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(),
            Ri(
              2,
              0,
              null,
              null,
              0,
              "span",
              [["class", "ngb-dp-navigation-chevron"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, wp)),
            Yr(4, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(16777216, null, null, 1, null, Ep)),
            Yr(6, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ri(
              7,
              0,
              null,
              null,
              2,
              "div",
              [["class", "ngb-dp-arrow right"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              8,
              0,
              null,
              null,
              1,
              "button",
              [
                ["aria-label", "Next month"],
                ["class", "btn btn-link ngb-dp-arrow-btn"],
                ["title", "Next month"],
                ["type", "button"]
              ],
              [[8, "disabled", 0]],
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.onClickNext(n) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(),
            Ri(
              9,
              0,
              null,
              null,
              0,
              "span",
              [["class", "ngb-dp-navigation-chevron"]],
              null,
              null,
              null,
              null,
              null
            ))
          ],
          function(e, t) {
            var n = t.component;
            e(t, 4, 0, n.showSelect), e(t, 6, 0, !n.showSelect);
          },
          function(e, t) {
            var n = t.component;
            e(t, 1, 0, n.prevDisabled), e(t, 8, 0, n.nextDisabled);
          }
        );
      }
      var Tp = zn({
        encapsulation: 2,
        styles: [
          "ngb-datepicker-navigation-select>.custom-select{-ms-flex:1 1 auto;flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.custom-select:focus{z-index:1}ngb-datepicker-navigation-select>.custom-select::-ms-value{background-color:transparent!important}"
        ],
        data: {}
      });
      function Dp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              3,
              "option",
              [],
              [[1, "aria-label", 0]],
              null,
              null,
              null,
              null
            )),
            Yr(
              1,
              147456,
              null,
              0,
              Oc,
              [en, on, [8, null]],
              { value: [0, "value"] },
              null
            ),
            Yr(
              2,
              147456,
              null,
              0,
              Nc,
              [en, on, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), Wi(3, null, ["", ""]))
          ],
          function(e, t) {
            e(t, 1, 0, t.context.$implicit), e(t, 2, 0, t.context.$implicit);
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              0,
              0,
              n.i18n.getMonthFullName(
                t.context.$implicit,
                null == n.date ? null : n.date.year
              )
            ),
              e(
                t,
                3,
                0,
                n.i18n.getMonthShortName(
                  t.context.$implicit,
                  null == n.date ? null : n.date.year
                )
              );
          }
        );
      }
      function Ap(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              3,
              "option",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Yr(
              1,
              147456,
              null,
              0,
              Oc,
              [en, on, [8, null]],
              { value: [0, "value"] },
              null
            ),
            Yr(
              2,
              147456,
              null,
              0,
              Nc,
              [en, on, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), Wi(3, null, ["", ""]))
          ],
          function(e, t) {
            e(t, 1, 0, t.context.$implicit), e(t, 2, 0, t.context.$implicit);
          },
          function(e, t) {
            e(t, 3, 0, t.component.i18n.getYearNumerals(t.context.$implicit));
          }
        );
      }
      function Ip(e) {
        return Qi(
          2,
          [
            ji(402653184, 1, { monthSelect: 0 }),
            ji(402653184, 2, { yearSelect: 0 }),
            (e()(),
            Ri(
              2,
              0,
              [
                [1, 0],
                ["month", 1]
              ],
              null,
              2,
              "select",
              [
                ["aria-label", "Select month"],
                ["class", "custom-select"],
                ["title", "Select month"]
              ],
              [[8, "disabled", 0]],
              [[null, "change"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "change" === t &&
                    (r = !1 !== e.component.changeMonth(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, Dp)),
            Yr(
              4,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(),
            Ri(
              5,
              0,
              [
                [2, 0],
                ["year", 1]
              ],
              null,
              2,
              "select",
              [
                ["aria-label", "Select year"],
                ["class", "custom-select"],
                ["title", "Select year"]
              ],
              [[8, "disabled", 0]],
              [[null, "change"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "change" === t &&
                    (r = !1 !== e.component.changeYear(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, Ap)),
            Yr(
              7,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 4, 0, n.months), e(t, 7, 0, n.years);
          },
          function(e, t) {
            var n = t.component;
            e(t, 2, 0, n.disabled), e(t, 5, 0, n.disabled);
          }
        );
      }
      var Op = zn({
        encapsulation: 2,
        styles: [
          "ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}ngb-datepicker-month-view{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}.ngb-dp-body{z-index:1050}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-months{display:-ms-flexbox;display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:#f8f9fa;background-color:var(--light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}"
        ],
        data: {}
      });
      function Rp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "div",
              [
                ["class", "btn-light"],
                ["ngbDatepickerDayView", ""]
              ],
              [
                [2, "bg-primary", null],
                [2, "text-white", null],
                [2, "text-muted", null],
                [2, "outside", null],
                [2, "active", null]
              ],
              null,
              null,
              vp,
              bp
            )),
            Yr(
              1,
              49152,
              null,
              0,
              Ed,
              [cd],
              {
                currentMonth: [0, "currentMonth"],
                date: [1, "date"],
                disabled: [2, "disabled"],
                focused: [3, "focused"],
                selected: [4, "selected"]
              },
              null
            )
          ],
          function(e, t) {
            e(
              t,
              1,
              0,
              t.context.currentMonth,
              t.context.date,
              t.context.disabled,
              t.context.focused,
              t.context.selected
            );
          },
          function(e, t) {
            e(
              t,
              0,
              0,
              Ur(t, 1).selected,
              Ur(t, 1).selected,
              Ur(t, 1).isMuted(),
              Ur(t, 1).isMuted(),
              Ur(t, 1).focused
            );
          }
        );
      }
      function Np(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-datepicker-navigation",
              [],
              null,
              [
                [null, "navigate"],
                [null, "select"]
              ],
              function(e, t, n) {
                var r = !0,
                  s = e.component;
                return (
                  "navigate" === t && (r = !1 !== s.onNavigateEvent(n) && r),
                  "select" === t && (r = !1 !== s.onNavigateDateSelect(n) && r),
                  r
                );
              },
              kp,
              _p
            )),
            Yr(
              1,
              49152,
              null,
              0,
              Cd,
              [cd],
              {
                date: [0, "date"],
                disabled: [1, "disabled"],
                months: [2, "months"],
                showSelect: [3, "showSelect"],
                prevDisabled: [4, "prevDisabled"],
                nextDisabled: [5, "nextDisabled"],
                selectBoxes: [6, "selectBoxes"]
              },
              { navigate: "navigate", select: "select" }
            )
          ],
          function(e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              n.model.firstDate,
              n.model.disabled,
              n.model.months,
              "select" === n.model.navigation,
              n.model.prevDisabled,
              n.model.nextDisabled,
              n.model.selectBoxes
            );
          },
          null
        );
      }
      function Pp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "ngb-dp-month-name"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(1, null, [" ", " ", " "]))
          ],
          null,
          function(e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              n.i18n.getMonthFullName(
                t.parent.context.$implicit.number,
                t.parent.context.$implicit.year
              ),
              n.i18n.getYearNumerals(t.parent.context.$implicit.year)
            );
          }
        );
      }
      function Mp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              4,
              "div",
              [["class", "ngb-dp-month"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, Pp)),
            Yr(2, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ri(
              3,
              0,
              null,
              null,
              1,
              "ngb-datepicker-month-view",
              [["role", "grid"]],
              null,
              [[null, "select"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "select" === t &&
                    (r = !1 !== e.component.onDateSelect(n) && r),
                  r
                );
              },
              yp,
              ap
            )),
            Yr(
              4,
              49152,
              null,
              0,
              wd,
              [cd],
              {
                dayTemplate: [0, "dayTemplate"],
                month: [1, "month"],
                showWeekdays: [2, "showWeekdays"],
                showWeekNumbers: [3, "showWeekNumbers"]
              },
              { select: "select" }
            )
          ],
          function(e, t) {
            var n = t.component;
            e(
              t,
              2,
              0,
              "none" === n.navigation ||
                (n.displayMonths > 1 && "select" === n.navigation)
            ),
              e(
                t,
                4,
                0,
                n.dayTemplate || Ur(t.parent, 1),
                t.context.$implicit,
                n.showWeekdays,
                n.showWeekNumbers
              );
          },
          null
        );
      }
      function Vp(e) {
        return Qi(0, [(e()(), Oi(0, null, null, 0))], null, null);
      }
      function jp(e) {
        return Qi(
          2,
          [
            ji(402653184, 1, { _monthsEl: 0 }),
            (e()(), Oi(0, [["dt", 2]], null, 0, null, Rp)),
            (e()(),
            Ri(
              2,
              0,
              null,
              null,
              2,
              "div",
              [["class", "ngb-dp-header"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, Np)),
            Yr(4, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ri(
              5,
              0,
              [
                [1, 0],
                ["months", 1]
              ],
              null,
              2,
              "div",
              [["class", "ngb-dp-months"]],
              null,
              [[null, "keydown"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "keydown" === t && (r = !1 !== e.component.onKeyDown(n) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, Mp)),
            Yr(
              7,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(), Oi(16777216, null, null, 1, null, Vp)),
            Yr(
              9,
              540672,
              null,
              0,
              ul,
              [Tn],
              { ngTemplateOutlet: [0, "ngTemplateOutlet"] },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 4, 0, "none" !== n.navigation),
              e(t, 7, 0, n.model.months),
              e(t, 9, 0, n.footerTemplate);
          },
          null
        );
      }
      function Up(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              3,
              "ngb-datepicker",
              [],
              null,
              null,
              null,
              jp,
              Op
            )),
            Jr(
              5120,
              null,
              lc,
              function(e) {
                return [e];
              },
              [_d]
            ),
            Jr(512, null, dd, dd, [sd, cd]),
            Yr(
              3,
              4964352,
              null,
              0,
              _d,
              [dd, sd, cd, md, fd, xt, en, bd, Zs],
              null,
              null
            )
          ],
          function(e, t) {
            e(t, 3, 0);
          },
          null
        );
      }
      var Fp = Tr(
          "ngb-datepicker",
          _d,
          Up,
          {
            dayTemplate: "dayTemplate",
            dayTemplateData: "dayTemplateData",
            displayMonths: "displayMonths",
            firstDayOfWeek: "firstDayOfWeek",
            footerTemplate: "footerTemplate",
            markDisabled: "markDisabled",
            maxDate: "maxDate",
            minDate: "minDate",
            navigation: "navigation",
            outsideDays: "outsideDays",
            showWeekdays: "showWeekdays",
            showWeekNumbers: "showWeekNumbers",
            startDate: "startDate"
          },
          { navigate: "navigate", dateSelect: "dateSelect", select: "select" },
          []
        ),
        Lp = zn({
          encapsulation: 2,
          styles: [
            "ngb-popover-window.bs-popover-bottom>.arrow,ngb-popover-window.bs-popover-top>.arrow{left:50%;margin-left:-.5rem}ngb-popover-window.bs-popover-bottom-left>.arrow,ngb-popover-window.bs-popover-top-left>.arrow{left:2em}ngb-popover-window.bs-popover-bottom-right>.arrow,ngb-popover-window.bs-popover-top-right>.arrow{left:auto;right:2em}ngb-popover-window.bs-popover-left>.arrow,ngb-popover-window.bs-popover-right>.arrow{top:50%;margin-top:-.5rem}ngb-popover-window.bs-popover-left-top>.arrow,ngb-popover-window.bs-popover-right-top>.arrow{top:.7em}ngb-popover-window.bs-popover-left-bottom>.arrow,ngb-popover-window.bs-popover-right-bottom>.arrow{top:auto;bottom:.7em}"
          ],
          data: {}
        });
      function $p(e) {
        return Qi(0, [(e()(), Wi(0, null, ["", ""]))], null, function(e, t) {
          e(t, 0, 0, t.component.title);
        });
      }
      function Hp(e) {
        return Qi(0, [(e()(), Oi(0, null, null, 0))], null, null);
      }
      function zp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              3,
              "h3",
              [["class", "popover-header"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(0, [["simpleTitle", 2]], null, 0, null, $p)),
            (e()(), Oi(16777216, null, null, 1, null, Hp)),
            Yr(
              3,
              540672,
              null,
              0,
              ul,
              [Tn],
              {
                ngTemplateOutletContext: [0, "ngTemplateOutletContext"],
                ngTemplateOutlet: [1, "ngTemplateOutlet"]
              },
              null
            )
          ],
          function(e, t) {
            var n = t.component;
            e(t, 3, 0, n.context, n.isTitleTemplate() ? n.title : Ur(t, 1));
          },
          null
        );
      }
      function Bp(e) {
        return Qi(
          2,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              0,
              "div",
              [["class", "arrow"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, zp)),
            Yr(2, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(),
            Ri(
              3,
              0,
              null,
              null,
              1,
              "div",
              [["class", "popover-body"]],
              null,
              null,
              null,
              null,
              null
            )),
            Hi(null, 0)
          ],
          function(e, t) {
            e(t, 2, 0, null != t.component.title);
          },
          null
        );
      }
      function qp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-popover-window",
              [["role", "tooltip"]],
              [
                [8, "className", 0],
                [8, "id", 0]
              ],
              null,
              null,
              Bp,
              Lp
            )),
            Yr(1, 49152, null, 0, zd, [], null, null)
          ],
          null,
          function(e, t) {
            e(
              t,
              0,
              0,
              "popover" +
                (Ur(t, 1).popoverClass ? " " + Ur(t, 1).popoverClass : ""),
              Ur(t, 1).id
            );
          }
        );
      }
      var Wp = Tr(
          "ngb-popover-window",
          zd,
          qp,
          {
            title: "title",
            id: "id",
            popoverClass: "popoverClass",
            context: "context"
          },
          {},
          ["*"]
        ),
        Gp = zn({
          encapsulation: 2,
          styles: [
            "ngb-tooltip-window.bs-tooltip-bottom .arrow,ngb-tooltip-window.bs-tooltip-top .arrow{left:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-bottom-left .arrow,ngb-tooltip-window.bs-tooltip-top-left .arrow{left:1em}ngb-tooltip-window.bs-tooltip-bottom-right .arrow,ngb-tooltip-window.bs-tooltip-top-right .arrow{left:auto;right:.8rem}ngb-tooltip-window.bs-tooltip-left .arrow,ngb-tooltip-window.bs-tooltip-right .arrow{top:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-left-top .arrow,ngb-tooltip-window.bs-tooltip-right-top .arrow{top:.4rem}ngb-tooltip-window.bs-tooltip-left-bottom .arrow,ngb-tooltip-window.bs-tooltip-right-bottom .arrow{top:auto;bottom:.4rem}"
          ],
          data: {}
        });
      function Zp(e) {
        return Qi(
          2,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              0,
              "div",
              [["class", "arrow"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              1,
              0,
              null,
              null,
              1,
              "div",
              [["class", "tooltip-inner"]],
              null,
              null,
              null,
              null,
              null
            )),
            Hi(null, 0)
          ],
          null,
          null
        );
      }
      function Qp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-tooltip-window",
              [["role", "tooltip"]],
              [
                [8, "className", 0],
                [8, "id", 0]
              ],
              null,
              null,
              Zp,
              Gp
            )),
            Yr(1, 49152, null, 0, Kd, [], null, null)
          ],
          null,
          function(e, t) {
            e(
              t,
              0,
              0,
              "tooltip show" +
                (Ur(t, 1).tooltipClass ? " " + Ur(t, 1).tooltipClass : ""),
              Ur(t, 1).id
            );
          }
        );
      }
      var Kp = Tr(
          "ngb-tooltip-window",
          Kd,
          Qp,
          { id: "id", tooltipClass: "tooltipClass" },
          {},
          ["*"]
        ),
        Yp = zn({ encapsulation: 2, styles: [], data: {} });
      function Jp(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-highlight",
              [],
              null,
              null,
              null,
              uf,
              sf
            )),
            Yr(
              1,
              573440,
              null,
              0,
              Jd,
              [],
              { result: [0, "result"], term: [1, "term"] },
              null
            )
          ],
          function(e, t) {
            var n = t.context.formatter(t.context.result);
            e(t, 1, 0, n, t.context.term);
          },
          null
        );
      }
      function Xp(e) {
        return Qi(0, [(e()(), Oi(0, null, null, 0))], null, null);
      }
      function ef(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              3,
              "button",
              [
                ["class", "dropdown-item"],
                ["role", "option"],
                ["type", "button"]
              ],
              [
                [8, "id", 0],
                [2, "active", null]
              ],
              [
                [null, "mouseenter"],
                [null, "click"]
              ],
              function(e, t, n) {
                var r = !0,
                  s = e.component;
                return (
                  "mouseenter" === t &&
                    (r = !1 !== s.markActive(e.context.index) && r),
                  "click" === t &&
                    (r = !1 !== s.select(e.context.$implicit) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 2, null, Xp)),
            Yr(
              2,
              540672,
              null,
              0,
              ul,
              [Tn],
              {
                ngTemplateOutletContext: [0, "ngTemplateOutletContext"],
                ngTemplateOutlet: [1, "ngTemplateOutlet"]
              },
              null
            ),
            Bi(3, { result: 0, term: 1, formatter: 2 })
          ],
          function(e, t) {
            var n = t.component,
              r = e(t, 3, 0, t.context.$implicit, n.term, n.formatter);
            e(t, 2, 0, r, n.resultTemplate || Ur(t.parent, 0));
          },
          function(e, t) {
            var n = t.component;
            e(
              t,
              0,
              0,
              n.id + "-" + t.context.index,
              t.context.index === n.activeIdx
            );
          }
        );
      }
      function tf(e) {
        return Qi(
          0,
          [
            (e()(), Oi(0, [["rt", 2]], null, 0, null, Jp)),
            (e()(), Oi(16777216, null, null, 1, null, ef)),
            Yr(
              2,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 2, 0, t.component.results);
          },
          null
        );
      }
      function nf(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-typeahead-window",
              [
                ["class", "dropdown-menu show"],
                ["role", "listbox"]
              ],
              [[8, "id", 0]],
              [[null, "mousedown"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "mousedown" === t && (r = !1 !== n.preventDefault() && r), r
                );
              },
              tf,
              Yp
            )),
            Yr(1, 114688, null, 0, Xd, [], null, null)
          ],
          function(e, t) {
            e(t, 1, 0);
          },
          function(e, t) {
            e(t, 0, 0, Ur(t, 1).id);
          }
        );
      }
      var rf = Tr(
          "ngb-typeahead-window",
          Xd,
          nf,
          {
            id: "id",
            focusFirst: "focusFirst",
            results: "results",
            term: "term",
            formatter: "formatter",
            resultTemplate: "resultTemplate"
          },
          { selectEvent: "select", activeChangeEvent: "activeChange" },
          []
        ),
        sf = zn({
          encapsulation: 2,
          styles: [".ngb-highlight{font-weight:700}"],
          data: {}
        });
      function of(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "span",
              [],
              [[8, "className", 0]],
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 0, 0, t.component.highlightClass),
              e(t, 1, 0, t.parent.context.$implicit);
          }
        );
      }
      function af(e) {
        return Qi(0, [(e()(), Wi(0, null, ["", ""]))], null, function(e, t) {
          e(t, 0, 0, t.parent.context.$implicit);
        });
      }
      function lf(e) {
        return Qi(
          0,
          [
            (e()(), Oi(16777216, null, null, 1, null, of)),
            Yr(
              1,
              16384,
              null,
              0,
              ol,
              [Tn, En],
              { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] },
              null
            ),
            (e()(), Oi(0, [["even", 2]], null, 0, null, af))
          ],
          function(e, t) {
            e(t, 1, 0, t.context.odd, Ur(t, 2));
          },
          null
        );
      }
      function uf(e) {
        return Qi(
          2,
          [
            (e()(), Oi(16777216, null, null, 1, null, lf)),
            Yr(
              1,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 1, 0, t.component.parts);
          },
          null
        );
      }
      var cf = zn({ encapsulation: 2, styles: [], data: {} });
      function hf(e) {
        return Qi(0, [], null, null);
      }
      function df(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-modal-backdrop",
              [["style", "z-index: 1050"]],
              [[8, "className", 0]],
              null,
              null,
              hf,
              cf
            )),
            Yr(1, 49152, null, 0, Nd, [], null, null)
          ],
          null,
          function(e, t) {
            e(
              t,
              0,
              0,
              "modal-backdrop fade show" +
                (Ur(t, 1).backdropClass ? " " + Ur(t, 1).backdropClass : "")
            );
          }
        );
      }
      var pf = Tr(
          "ngb-modal-backdrop",
          Nd,
          df,
          { backdropClass: "backdropClass" },
          {},
          []
        ),
        ff = zn({
          encapsulation: 2,
          styles: [
            "ngb-modal-window .component-host-scrollable{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}"
          ],
          data: {}
        });
      function gf(e) {
        return Qi(
          0,
          [
            ji(402653184, 1, { _dialogEl: 0 }),
            (e()(),
            Ri(
              1,
              0,
              [
                [1, 0],
                ["dialog", 1]
              ],
              null,
              2,
              "div",
              [["role", "document"]],
              [[8, "className", 0]],
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              2,
              0,
              null,
              null,
              1,
              "div",
              [["class", "modal-content"]],
              null,
              null,
              null,
              null,
              null
            )),
            Hi(null, 0)
          ],
          null,
          function(e, t) {
            var n = t.component;
            e(
              t,
              1,
              0,
              "modal-dialog" +
                (n.size ? " modal-" + n.size : "") +
                (n.centered ? " modal-dialog-centered" : "") +
                (n.scrollable ? " modal-dialog-scrollable" : "")
            );
          }
        );
      }
      function mf(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ngb-modal-window",
              [
                ["role", "dialog"],
                ["tabindex", "-1"]
              ],
              [
                [8, "className", 0],
                [1, "aria-modal", 0],
                [1, "aria-labelledby", 0]
              ],
              null,
              null,
              gf,
              ff
            )),
            Yr(1, 4440064, null, 0, jd, [hl, en, Zs], null, null)
          ],
          function(e, t) {
            e(t, 1, 0);
          },
          function(e, t) {
            e(
              t,
              0,
              0,
              "modal fade show d-block" +
                (Ur(t, 1).windowClass ? " " + Ur(t, 1).windowClass : ""),
              !0,
              Ur(t, 1).ariaLabelledBy
            );
          }
        );
      }
      var yf = Tr(
        "ngb-modal-window",
        jd,
        mf,
        {
          ariaLabelledBy: "ariaLabelledBy",
          backdrop: "backdrop",
          centered: "centered",
          keyboard: "keyboard",
          scrollable: "scrollable",
          size: "size",
          windowClass: "windowClass"
        },
        { dismissEvent: "dismiss" },
        ["*"]
      );
      function bf() {
        return (
          Error.call(this),
          (this.message = "no elements in sequence"),
          (this.name = "EmptyError"),
          this
        );
      }
      bf.prototype = Object.create(Error.prototype);
      const vf = bf;
      function _f(e) {
        return new w(t => {
          let n;
          try {
            n = e();
          } catch (r) {
            return void t.error(r);
          }
          return (n ? W(n) : ia()).subscribe(t);
        });
      }
      function wf(e) {
        return function(t) {
          return 0 === e ? ia() : t.lift(new Cf(e));
        };
      }
      class Cf {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new kh();
        }
        call(e, t) {
          return t.subscribe(new xf(e, this.total));
        }
      }
      class xf extends g {
        constructor(e, t) {
          super(e),
            (this.total = t),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(e) {
          const t = this.ring,
            n = this.total,
            r = this.count++;
          t.length < n ? t.push(e) : (t[r % n] = e);
        }
        _complete() {
          const e = this.destination;
          let t = this.count;
          if (t > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = t++ % n;
              e.next(r[s]);
            }
          }
          e.complete();
        }
      }
      const Sf = (e = Ef) =>
        Ih({
          hasValue: !1,
          next() {
            this.hasValue = !0;
          },
          complete() {
            if (!this.hasValue) throw e();
          }
        });
      function Ef() {
        return new vf();
      }
      function kf(e = null) {
        return t => t.lift(new Tf(e));
      }
      class Tf {
        constructor(e) {
          this.defaultValue = e;
        }
        call(e, t) {
          return t.subscribe(new Df(e, this.defaultValue));
        }
      }
      class Df extends g {
        constructor(e, t) {
          super(e), (this.defaultValue = t), (this.isEmpty = !0);
        }
        _next(e) {
          (this.isEmpty = !1), this.destination.next(e);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function Af(e, t) {
        const n = arguments.length >= 2;
        return r =>
          r.pipe(
            e ? ua((t, n) => e(t, n, r)) : K,
            wf(1),
            n ? kf(t) : Sf(() => new vf())
          );
      }
      function If(e) {
        return function(t) {
          const n = new Of(e),
            r = t.lift(n);
          return (n.caught = r);
        };
      }
      class Of {
        constructor(e) {
          this.selector = e;
        }
        call(e, t) {
          return t.subscribe(new Rf(e, this.selector, this.caught));
        }
      }
      class Rf extends $ {
        constructor(e, t, n) {
          super(e), (this.selector = t), (this.caught = n);
        }
        error(e) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(e, this.caught);
            } catch (t) {
              return void super.error(t);
            }
            this._unsubscribeAndRecycle();
            const r = new I(this, void 0, void 0);
            this.add(r), L(this, n, void 0, void 0, r);
          }
        }
      }
      function Nf(e, t) {
        const n = arguments.length >= 2;
        return r =>
          r.pipe(
            e ? ua((t, n) => e(t, n, r)) : K,
            Th(1),
            n ? kf(t) : Sf(() => new vf())
          );
      }
      class Pf {
        constructor(e, t, n) {
          (this.predicate = e), (this.thisArg = t), (this.source = n);
        }
        call(e, t) {
          return t.subscribe(
            new Mf(e, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class Mf extends g {
        constructor(e, t, n, r) {
          super(e),
            (this.predicate = t),
            (this.thisArg = n),
            (this.source = r),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(e) {
          this.destination.next(e), this.destination.complete();
        }
        _next(e) {
          let t = !1;
          try {
            t = this.predicate.call(this.thisArg, e, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          t || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function Vf(e, t) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function(r) {
            return r.lift(new jf(e, t, n));
          }
        );
      }
      class jf {
        constructor(e, t, n = !1) {
          (this.accumulator = e), (this.seed = t), (this.hasSeed = n);
        }
        call(e, t) {
          return t.subscribe(
            new Uf(e, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Uf extends g {
        constructor(e, t, n, r) {
          super(e),
            (this.accumulator = t),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(e) {
          (this.hasSeed = !0), (this._seed = e);
        }
        _next(e) {
          if (this.hasSeed) return this._tryNext(e);
          (this.seed = e), this.destination.next(e);
        }
        _tryNext(e) {
          const t = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, e, t);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      class Ff {
        constructor(e) {
          this.callback = e;
        }
        call(e, t) {
          return t.subscribe(new Lf(e, this.callback));
        }
      }
      class Lf extends g {
        constructor(e, t) {
          super(e), this.add(new d(t));
        }
      }
      class $f {
        constructor(e, t) {
          (this.id = e), (this.url = t);
        }
      }
      class Hf extends $f {
        constructor(e, t, n = "imperative", r = null) {
          super(e, t), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class zf extends $f {
        constructor(e, t, n) {
          super(e, t), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Bf extends $f {
        constructor(e, t, n) {
          super(e, t), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class qf extends $f {
        constructor(e, t, n) {
          super(e, t), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Wf extends $f {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Gf extends $f {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Zf extends $f {
        constructor(e, t, n, r, s) {
          super(e, t),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Qf extends $f {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Kf extends $f {
        constructor(e, t, n, r) {
          super(e, t), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Yf {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Jf {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Xf {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig &&
            this.snapshot.routeConfig.path) ||
            ""}')`;
        }
      }
      class eg {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig &&
            this.snapshot.routeConfig.path) ||
            ""}')`;
        }
      }
      class tg {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig &&
            this.snapshot.routeConfig.path) ||
            ""}')`;
        }
      }
      class ng {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig &&
            this.snapshot.routeConfig.path) ||
            ""}')`;
        }
      }
      class rg {
        constructor(e, t, n) {
          (this.routerEvent = e), (this.position = t), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class sg {}
      class ig {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return this.params.hasOwnProperty(e);
        }
        get(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function og(e) {
        return new ig(e);
      }
      function ag(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t.ngNavigationCancelingError = !0), t;
      }
      function lg(e, t, n) {
        const r = n.path.split("/");
        if (r.length > e.length) return null;
        if ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const t = r[i],
            n = e[i];
          if (t.startsWith(":")) s[t.substring(1)] = n;
          else if (t !== n.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: s };
      }
      class ug {
        constructor(e, t) {
          (this.routes = e), (this.module = t);
        }
      }
      function cg(e, t = "") {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          hg(r, dg(t, r));
        }
      }
      function hg(e, t) {
        if (!e)
          throw new Error(
            `\n      Invalid configuration of route '${t}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(e))
          throw new Error(
            `Invalid configuration of route '${t}': Array cannot be specified`
          );
        if (
          !e.component &&
          !e.children &&
          !e.loadChildren &&
          e.outlet &&
          "primary" !== e.outlet
        )
          throw new Error(
            `Invalid configuration of route '${t}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (e.redirectTo && e.children)
          throw new Error(
            `Invalid configuration of route '${t}': redirectTo and children cannot be used together`
          );
        if (e.redirectTo && e.loadChildren)
          throw new Error(
            `Invalid configuration of route '${t}': redirectTo and loadChildren cannot be used together`
          );
        if (e.children && e.loadChildren)
          throw new Error(
            `Invalid configuration of route '${t}': children and loadChildren cannot be used together`
          );
        if (e.redirectTo && e.component)
          throw new Error(
            `Invalid configuration of route '${t}': redirectTo and component cannot be used together`
          );
        if (e.path && e.matcher)
          throw new Error(
            `Invalid configuration of route '${t}': path and matcher cannot be used together`
          );
        if (
          void 0 === e.redirectTo &&
          !e.component &&
          !e.children &&
          !e.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${t}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === e.path && void 0 === e.matcher)
          throw new Error(
            `Invalid configuration of route '${t}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof e.path && "/" === e.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${t}': path cannot start with a slash`
          );
        if ("" === e.path && void 0 !== e.redirectTo && void 0 === e.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${t}", redirectTo: "${e.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== e.pathMatch &&
          "full" !== e.pathMatch &&
          "prefix" !== e.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${t}': pathMatch can only be set to 'prefix' or 'full'`
          );
        e.children && cg(e.children, t);
      }
      function dg(e, t) {
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
      function pg(e) {
        const t = e.children && e.children.map(pg),
          n = t ? Object.assign({}, e, { children: t }) : Object.assign({}, e);
        return (
          !n.component &&
            (t || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = sg),
          n
        );
      }
      function fg(e, t) {
        const n = Object.keys(e),
          r = Object.keys(t);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), e[s] !== t[s])) return !1;
        return !0;
      }
      function gg(e) {
        return Array.prototype.concat.apply([], e);
      }
      function mg(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function yg(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function bg(e) {
        return Bt(e) ? e : zt(e) ? W(Promise.resolve(e)) : aa(e);
      }
      function vg(e, t, n) {
        return n
          ? (function(e, t) {
              return fg(e, t);
            })(e.queryParams, t.queryParams) &&
              (function e(t, n) {
                if (!xg(t.segments, n.segments)) return !1;
                if (t.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!t.children[r]) return !1;
                  if (!e(t.children[r], n.children[r])) return !1;
                }
                return !0;
              })(e.root, t.root)
          : (function(e, t) {
              return (
                Object.keys(t).length <= Object.keys(e).length &&
                Object.keys(t).every(n => t[n] === e[n])
              );
            })(e.queryParams, t.queryParams) &&
              (function e(t, n) {
                return (function t(n, r, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!xg(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!xg(n.segments, s)) return !1;
                    for (const t in r.children) {
                      if (!n.children[t]) return !1;
                      if (!e(n.children[t], r.children[t])) return !1;
                    }
                    return !0;
                  }
                  {
                    const e = s.slice(0, n.segments.length),
                      i = s.slice(n.segments.length);
                    return (
                      !!xg(n.segments, e) &&
                      !!n.children.primary &&
                      t(n.children.primary, r, i)
                    );
                  }
                })(t, n, n.segments);
              })(e.root, t.root);
      }
      class _g {
        constructor(e, t, n) {
          (this.root = e), (this.queryParams = t), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = og(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Tg.serialize(this);
        }
      }
      class wg {
        constructor(e, t) {
          (this.segments = e),
            (this.children = t),
            (this.parent = null),
            yg(t, (e, t) => (e.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Dg(this);
        }
      }
      class Cg {
        constructor(e, t) {
          (this.path = e), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = og(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Pg(this);
        }
      }
      function xg(e, t) {
        return e.length === t.length && e.every((e, n) => e.path === t[n].path);
      }
      function Sg(e, t) {
        let n = [];
        return (
          yg(e.children, (e, r) => {
            "primary" === r && (n = n.concat(t(e, r)));
          }),
          yg(e.children, (e, r) => {
            "primary" !== r && (n = n.concat(t(e, r)));
          }),
          n
        );
      }
      class Eg {}
      class kg {
        parse(e) {
          const t = new Fg(e);
          return new _g(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(e) {
          var t;
          return `${`/${(function e(t, n) {
            if (!t.hasChildren()) return Dg(t);
            if (n) {
              const n = t.children.primary ? e(t.children.primary, !1) : "",
                r = [];
              return (
                yg(t.children, (t, n) => {
                  "primary" !== n && r.push(`${n}:${e(t, !1)}`);
                }),
                r.length > 0 ? `${n}(${r.join("//")})` : n
              );
            }
            {
              const n = Sg(t, (n, r) =>
                "primary" === r
                  ? [e(t.children.primary, !1)]
                  : [`${r}:${e(n, !1)}`]
              );
              return `${Dg(t)}/(${n.join("//")})`;
            }
          })(e.root, !0)}`}${(function(e) {
            const t = Object.keys(e).map(t => {
              const n = e[t];
              return Array.isArray(n)
                ? n.map(e => `${Ig(t)}=${Ig(e)}`).join("&")
                : `${Ig(t)}=${Ig(n)}`;
            });
            return t.length ? `?${t.join("&")}` : "";
          })(e.queryParams)}${
            "string" == typeof e.fragment
              ? `#${((t = e.fragment), encodeURI(t))}`
              : ""
          }`;
        }
      }
      const Tg = new kg();
      function Dg(e) {
        return e.segments.map(e => Pg(e)).join("/");
      }
      function Ag(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ig(e) {
        return Ag(e).replace(/%3B/gi, ";");
      }
      function Og(e) {
        return Ag(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Rg(e) {
        return decodeURIComponent(e);
      }
      function Ng(e) {
        return Rg(e.replace(/\+/g, "%20"));
      }
      function Pg(e) {
        return `${Og(e.path)}${((t = e.parameters),
        Object.keys(t)
          .map(e => `;${Og(e)}=${Og(t[e])}`)
          .join(""))}`;
        var t;
      }
      const Mg = /^[^\/()?;=#]+/;
      function Vg(e) {
        const t = e.match(Mg);
        return t ? t[0] : "";
      }
      const jg = /^[^=?&#]+/,
        Ug = /^[^?&#]+/;
      class Fg {
        constructor(e) {
          (this.url = e), (this.remaining = e);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new wg([], {})
              : new wg([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (e.length > 0 || Object.keys(t).length > 0) &&
              (n.primary = new wg(e, t)),
            n
          );
        }
        parseSegment() {
          const e = Vg(this.remaining);
          if ("" === e && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(e), new Cg(Rg(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const t = Vg(this.remaining);
          if (!t) return;
          this.capture(t);
          let n = "";
          if (this.consumeOptional("=")) {
            const e = Vg(this.remaining);
            e && ((n = e), this.capture(n));
          }
          e[Rg(t)] = Rg(n);
        }
        parseQueryParam(e) {
          const t = (function(e) {
            const t = e.match(jg);
            return t ? t[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let n = "";
          if (this.consumeOptional("=")) {
            const e = (function(e) {
              const t = e.match(Ug);
              return t ? t[0] : "";
            })(this.remaining);
            e && ((n = e), this.capture(n));
          }
          const r = Ng(t),
            s = Ng(n);
          if (e.hasOwnProperty(r)) {
            let t = e[r];
            Array.isArray(t) || ((t = [t]), (e[r] = t)), t.push(s);
          } else e[r] = s;
        }
        parseParens(e) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = Vg(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : e && (s = "primary");
            const i = this.parseChildren();
            (t[s] = 1 === Object.keys(i).length ? i.primary : new wg([], i)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`);
        }
      }
      class Lg {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const t = this.pathFromRoot(e);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(e) {
          const t = $g(e, this._root);
          return t ? t.children.map(e => e.value) : [];
        }
        firstChild(e) {
          const t = $g(e, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(e) {
          const t = Hg(e, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children.map(e => e.value).filter(t => t !== e);
        }
        pathFromRoot(e) {
          return Hg(e, this._root).map(e => e.value);
        }
      }
      function $g(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const t = $g(e, n);
          if (t) return t;
        }
        return null;
      }
      function Hg(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Hg(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class zg {
        constructor(e, t) {
          (this.value = e), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Bg(e) {
        const t = {};
        return e && e.children.forEach(e => (t[e.value.outlet] = e)), t;
      }
      class qg extends Lg {
        constructor(e, t) {
          super(e), (this.snapshot = t), Yg(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Wg(e, t) {
        const n = (function(e, t) {
            const n = new Qg(
              [],
              {},
              {},
              "",
              {},
              "primary",
              t,
              null,
              e.root,
              -1,
              {}
            );
            return new Kg("", new zg(n, []));
          })(e, t),
          r = new oh([new Cg("", {})]),
          s = new oh({}),
          i = new oh({}),
          o = new oh({}),
          a = new oh(""),
          l = new Gg(r, s, o, a, i, "primary", t, n.root);
        return (l.snapshot = n.root), new qg(new zg(l, []), n);
      }
      class Gg {
        constructor(e, t, n, r, s, i, o, a) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
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
              (this._paramMap = this.params.pipe(H(e => og(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(H(e => og(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Zg(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const e = n[r],
              t = n[r - 1];
            if (e.routeConfig && "" === e.routeConfig.path) r--;
            else {
              if (t.component) break;
              r--;
            }
          }
        return (function(e) {
          return e.reduce(
            (e, t) => ({
              params: Object.assign({}, e.params, t.params),
              data: Object.assign({}, e.data, t.data),
              resolve: Object.assign({}, e.resolve, t._resolvedData)
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Qg {
        constructor(e, t, n, r, s, i, o, a, l, u, c) {
          (this.url = e),
            (this.params = t),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = u),
            (this._resolve = c);
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
            this._paramMap || (this._paramMap = og(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = og(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map(e => e.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Kg extends Lg {
        constructor(e, t) {
          super(t), (this.url = e), Yg(this, t);
        }
        toString() {
          return Jg(this._root);
        }
      }
      function Yg(e, t) {
        (t.value._routerState = e), t.children.forEach(t => Yg(e, t));
      }
      function Jg(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Jg).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Xg(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            fg(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            fg(t.params, n.params) || e.params.next(n.params),
            (function(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!fg(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            fg(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function em(e, t) {
        var n, r;
        return (
          fg(e.params, t.params) &&
          xg((n = e.url), (r = t.url)) &&
          n.every((e, t) => fg(e.parameters, r[t].parameters)) &&
          !(!e.parent != !t.parent) &&
          (!e.parent || em(e.parent, t.parent))
        );
      }
      function tm(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function nm(e, t, n, r, s) {
        let i = {};
        return (
          r &&
            yg(r, (e, t) => {
              i[t] = Array.isArray(e) ? e.map(e => `${e}`) : `${e}`;
            }),
          new _g(
            n.root === e
              ? t
              : (function e(t, n, r) {
                  const s = {};
                  return (
                    yg(t.children, (t, i) => {
                      s[i] = t === n ? r : e(t, n, r);
                    }),
                    new wg(t.segments, s)
                  );
                })(n.root, e, t),
            i,
            s
          )
        );
      }
      class rm {
        constructor(e, t, n) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = t),
            (this.commands = n),
            e && n.length > 0 && tm(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(e => "object" == typeof e && null != e && e.outlets);
          if (r && r !== mg(n))
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
      class sm {
        constructor(e, t, n) {
          (this.segmentGroup = e), (this.processChildren = t), (this.index = n);
        }
      }
      function im(e) {
        return "object" == typeof e && null != e && e.outlets
          ? e.outlets.primary
          : `${e}`;
      }
      function om(e, t, n) {
        if (
          (e || (e = new wg([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return am(e, t, n);
        const r = (function(e, t, n) {
            let r = 0,
              s = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < e.segments.length; ) {
              if (r >= n.length) return i;
              const t = e.segments[s],
                o = im(n[r]),
                a = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === o) break;
              if (o && a && "object" == typeof a && void 0 === a.outlets) {
                if (!hm(o, a, t)) return i;
                r += 2;
              } else {
                if (!hm(o, {}, t)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(e, t, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const t = new wg(e.segments.slice(0, r.pathIndex), {});
          return (
            (t.children.primary = new wg(
              e.segments.slice(r.pathIndex),
              e.children
            )),
            am(t, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new wg(e.segments, {})
          : r.match && !e.hasChildren()
          ? lm(e, t, n)
          : r.match
          ? am(e, 0, s)
          : lm(e, t, n);
      }
      function am(e, t, n) {
        if (0 === n.length) return new wg(e.segments, {});
        {
          const r = (function(e) {
              return "object" != typeof e[0]
                ? { primary: e }
                : void 0 === e[0].outlets
                ? { primary: e }
                : e[0].outlets;
            })(n),
            s = {};
          return (
            yg(r, (n, r) => {
              null !== n && (s[r] = om(e.children[r], t, n));
            }),
            yg(e.children, (e, t) => {
              void 0 === r[t] && (s[t] = e);
            }),
            new wg(e.segments, s)
          );
        }
      }
      function lm(e, t, n) {
        const r = e.segments.slice(0, t);
        let s = 0;
        for (; s < n.length; ) {
          if ("object" == typeof n[s] && void 0 !== n[s].outlets) {
            const e = um(n[s].outlets);
            return new wg(r, e);
          }
          if (0 === s && tm(n[0])) {
            r.push(new Cg(e.segments[t].path, n[0])), s++;
            continue;
          }
          const i = im(n[s]),
            o = s < n.length - 1 ? n[s + 1] : null;
          i && o && tm(o)
            ? (r.push(new Cg(i, cm(o))), (s += 2))
            : (r.push(new Cg(i, {})), s++);
        }
        return new wg(r, {});
      }
      function um(e) {
        const t = {};
        return (
          yg(e, (e, n) => {
            null !== e && (t[n] = lm(new wg([], {}), 0, e));
          }),
          t
        );
      }
      function cm(e) {
        const t = {};
        return yg(e, (e, n) => (t[n] = `${e}`)), t;
      }
      function hm(e, t, n) {
        return e == n.path && fg(t, n.parameters);
      }
      class dm {
        constructor(e, t, n, r) {
          (this.routeReuseStrategy = e),
            (this.futureState = t),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(e) {
          const t = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, n, e),
            Xg(this.futureState.root),
            this.activateChildRoutes(t, n, e);
        }
        deactivateChildRoutes(e, t, n) {
          const r = Bg(t);
          e.children.forEach(e => {
            const t = e.value.outlet;
            this.deactivateRoutes(e, r[t], n), delete r[t];
          }),
            yg(r, (e, t) => {
              this.deactivateRouteAndItsChildren(e, n);
            });
        }
        deactivateRoutes(e, t, n) {
          const r = e.value,
            s = t ? t.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(e, t, s.children);
            } else this.deactivateChildRoutes(e, t, n);
          else s && this.deactivateRouteAndItsChildren(t, n);
        }
        deactivateRouteAndItsChildren(e, t) {
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, t)
            : this.deactivateRouteAndOutlet(e, t);
        }
        detachAndStoreRouteSubtree(e, t) {
          const n = t.getContext(e.value.outlet);
          if (n && n.outlet) {
            const t = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: t,
              route: e,
              contexts: r
            });
          }
        }
        deactivateRouteAndOutlet(e, t) {
          const n = t.getContext(e.value.outlet);
          if (n) {
            const r = Bg(e),
              s = e.value.component ? n.children : t;
            yg(r, (e, t) => this.deactivateRouteAndItsChildren(e, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(e, t, n) {
          const r = Bg(t);
          e.children.forEach(e => {
            this.activateRoutes(e, r[e.value.outlet], n),
              this.forwardEvent(new ng(e.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new eg(e.value.snapshot));
        }
        activateRoutes(e, t, n) {
          const r = e.value,
            s = t ? t.value : null;
          if ((Xg(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(e, t, s.children);
            } else this.activateChildRoutes(e, t, n);
          else if (r.component) {
            const t = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const e = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                t.children.onOutletReAttached(e.contexts),
                (t.attachRef = e.componentRef),
                (t.route = e.route.value),
                t.outlet && t.outlet.attach(e.componentRef, e.route.value),
                pm(e.route);
            } else {
              const n = (function(e) {
                  for (let t = e.parent; t; t = t.parent) {
                    const e = t.routeConfig;
                    if (e && e._loadedConfig) return e._loadedConfig;
                    if (e && e.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (t.attachRef = null),
                (t.route = r),
                (t.resolver = s),
                t.outlet && t.outlet.activateWith(r, s),
                this.activateChildRoutes(e, null, t.children);
            }
          } else this.activateChildRoutes(e, null, n);
        }
      }
      function pm(e) {
        Xg(e.value), e.children.forEach(pm);
      }
      function fm(e) {
        return "function" == typeof e;
      }
      function gm(e) {
        return e instanceof _g;
      }
      class mm {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class ym {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function bm(e) {
        return new w(t => t.error(new mm(e)));
      }
      function vm(e) {
        return new w(t => t.error(new ym(e)));
      }
      function _m(e) {
        return new w(t =>
          t.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${e}'`
            )
          )
        );
      }
      class wm {
        constructor(e, t, n, r, s) {
          (this.configLoader = t),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(je));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              H(e =>
                this.createUrlTree(
                  e,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              If(e => {
                if (e instanceof ym)
                  return (this.allowRedirects = !1), this.match(e.urlTree);
                if (e instanceof mm) throw this.noMatchError(e);
                throw e;
              })
            );
        }
        match(e) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            e.root,
            "primary"
          )
            .pipe(H(t => this.createUrlTree(t, e.queryParams, e.fragment)))
            .pipe(
              If(e => {
                if (e instanceof mm) throw this.noMatchError(e);
                throw e;
              })
            );
        }
        noMatchError(e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          );
        }
        createUrlTree(e, t, n) {
          const r = e.segments.length > 0 ? new wg([], { primary: e }) : e;
          return new _g(r, t, n);
        }
        expandSegmentGroup(e, t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(e, t, n).pipe(H(e => new wg([], e)))
            : this.expandSegment(e, n, t, n.segments, r, !0);
        }
        expandChildren(e, t, n) {
          return (function(e, t) {
            if (0 === Object.keys(e).length) return aa({});
            const n = [],
              r = [],
              s = {};
            return (
              yg(e, (e, i) => {
                const o = t(i, e).pipe(H(e => (s[i] = e)));
                "primary" === i ? n.push(o) : r.push(o);
              }),
              aa.apply(null, n.concat(r)).pipe(
                yh(),
                Af(),
                H(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(e, t, r, n));
        }
        expandSegment(e, t, n, r, s, i) {
          return aa(...n).pipe(
            H(o =>
              this.expandSegmentAgainstRoute(e, t, n, o, r, s, i).pipe(
                If(e => {
                  if (e instanceof mm) return aa(null);
                  throw e;
                })
              )
            ),
            yh(),
            Nf(e => !!e),
            If((e, n) => {
              if (e instanceof vf || "EmptyError" === e.name) {
                if (this.noLeftoversInUrl(t, r, s)) return aa(new wg([], {}));
                throw new mm(t);
              }
              throw e;
            })
          );
        }
        noLeftoversInUrl(e, t, n) {
          return 0 === t.length && !e.children[n];
        }
        expandSegmentAgainstRoute(e, t, n, r, s, i, o) {
          return Em(r) !== i
            ? bm(t)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(e, t, r, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i)
            : bm(t);
        }
        expandSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                t,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? vm(s)
            : this.lineralizeSegments(n, s).pipe(
                G(n => {
                  const s = new wg(n, {});
                  return this.expandSegment(e, s, t, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, t, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: u
          } = Cm(t, r, s);
          if (!o) return bm(t);
          const c = this.applyRedirectCommands(a, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? vm(c)
            : this.lineralizeSegments(r, c).pipe(
                G(r => this.expandSegment(e, t, n, r.concat(s.slice(l)), i, !1))
              );
        }
        matchSegmentAgainstRoute(e, t, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(e.injector, n)
                  .pipe(H(e => ((n._loadedConfig = e), new wg(r, {}))))
              : aa(new wg(r, {}));
          const { matched: s, consumedSegments: i, lastChild: o } = Cm(t, n, r);
          if (!s) return bm(t);
          const a = r.slice(o);
          return this.getChildConfig(e, n, r).pipe(
            G(e => {
              const n = e.module,
                r = e.routes,
                { segmentGroup: s, slicedSegments: o } = (function(e, t, n, r) {
                  return n.length > 0 &&
                    (function(e, t, n) {
                      return n.some(n => Sm(e, t, n) && "primary" !== Em(n));
                    })(e, n, r)
                    ? {
                        segmentGroup: xm(
                          new wg(
                            t,
                            (function(e, t) {
                              const n = {};
                              n.primary = t;
                              for (const r of e)
                                "" === r.path &&
                                  "primary" !== Em(r) &&
                                  (n[Em(r)] = new wg([], {}));
                              return n;
                            })(r, new wg(n, e.children))
                          )
                        ),
                        slicedSegments: []
                      }
                    : 0 === n.length &&
                      (function(e, t, n) {
                        return n.some(n => Sm(e, t, n));
                      })(e, n, r)
                    ? {
                        segmentGroup: xm(
                          new wg(
                            e.segments,
                            (function(e, t, n, r) {
                              const s = {};
                              for (const i of n)
                                Sm(e, t, i) &&
                                  !r[Em(i)] &&
                                  (s[Em(i)] = new wg([], {}));
                              return Object.assign({}, r, s);
                            })(e, n, r, e.children)
                          )
                        ),
                        slicedSegments: n
                      }
                    : { segmentGroup: e, slicedSegments: n };
                })(t, i, a, r);
              return 0 === o.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(H(e => new wg(i, e)))
                : 0 === r.length && 0 === o.length
                ? aa(new wg(i, {}))
                : this.expandSegment(n, s, r, o, "primary", !0).pipe(
                    H(e => new wg(i.concat(e.segments), e.children))
                  );
            })
          );
        }
        getChildConfig(e, t, n) {
          return t.children
            ? aa(new ug(t.children, e))
            : t.loadChildren
            ? void 0 !== t._loadedConfig
              ? aa(t._loadedConfig)
              : (function(e, t, n) {
                  const r = t.canLoad;
                  return r && 0 !== r.length
                    ? W(r)
                        .pipe(
                          H(r => {
                            const s = e.get(r);
                            let i;
                            if (
                              (function(e) {
                                return e && fm(e.canLoad);
                              })(s)
                            )
                              i = s.canLoad(t, n);
                            else {
                              if (!fm(s))
                                throw new Error("Invalid CanLoad guard");
                              i = s(t, n);
                            }
                            return bg(i);
                          })
                        )
                        .pipe(
                          yh(),
                          ((s = e => !0 === e),
                          e => e.lift(new Pf(s, void 0, e)))
                        )
                    : aa(!0);
                  var s;
                })(e.injector, t, n).pipe(
                  G(n =>
                    n
                      ? this.configLoader
                          .load(e.injector, t)
                          .pipe(H(e => ((t._loadedConfig = e), e)))
                      : (function(e) {
                          return new w(t =>
                            t.error(
                              ag(
                                `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                              )
                            )
                          );
                        })(t)
                  )
                )
            : aa(new ug([], e));
        }
        lineralizeSegments(e, t) {
          let n = [],
            r = t.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return aa(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return _m(e.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(e, t, n) {
          return this.applyRedirectCreatreUrlTree(
            t,
            this.urlSerializer.parse(t),
            e,
            n
          );
        }
        applyRedirectCreatreUrlTree(e, t, n, r) {
          const s = this.createSegmentGroup(e, t.root, n, r);
          return new _g(
            s,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(e, t) {
          const n = {};
          return (
            yg(e, (e, r) => {
              if ("string" == typeof e && e.startsWith(":")) {
                const s = e.substring(1);
                n[r] = t[s];
              } else n[r] = e;
            }),
            n
          );
        }
        createSegmentGroup(e, t, n, r) {
          const s = this.createSegments(e, t.segments, n, r);
          let i = {};
          return (
            yg(t.children, (t, s) => {
              i[s] = this.createSegmentGroup(e, t, n, r);
            }),
            new wg(s, i)
          );
        }
        createSegments(e, t, n, r) {
          return t.map(t =>
            t.path.startsWith(":")
              ? this.findPosParam(e, t, r)
              : this.findOrReturn(t, n)
          );
        }
        findPosParam(e, t, n) {
          const r = n[t.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${t.path}'.`
            );
          return r;
        }
        findOrReturn(e, t) {
          let n = 0;
          for (const r of t) {
            if (r.path === e.path) return t.splice(n), r;
            n++;
          }
          return e;
        }
      }
      function Cm(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {}
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {}
              };
        const r = (t.matcher || lg)(n, e, t);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {}
            };
      }
      function xm(e) {
        if (1 === e.numberOfChildren && e.children.primary) {
          const t = e.children.primary;
          return new wg(e.segments.concat(t.segments), t.children);
        }
        return e;
      }
      function Sm(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Em(e) {
        return e.outlet || "primary";
      }
      class km {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Tm {
        constructor(e, t) {
          (this.component = e), (this.route = t);
        }
      }
      function Dm(e, t, n) {
        const r = e._root;
        return (function e(
          t,
          n,
          r,
          s,
          i = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const o = Bg(n);
          return (
            t.children.forEach(t => {
              !(function(
                t,
                n,
                r,
                s,
                i = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const o = t.value,
                  a = n ? n.value : null,
                  l = r ? r.getContext(t.value.outlet) : null;
                if (a && o.routeConfig === a.routeConfig) {
                  const u = (function(e, t, n) {
                    if ("function" == typeof n) return n(e, t);
                    switch (n) {
                      case "pathParamsChange":
                        return !xg(e.url, t.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !xg(e.url, t.url) || !fg(e.queryParams, t.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !em(e, t) || !fg(e.queryParams, t.queryParams);
                      case "paramsChange":
                      default:
                        return !em(e, t);
                    }
                  })(a, o, o.routeConfig.runGuardsAndResolvers);
                  u
                    ? i.canActivateChecks.push(new km(s))
                    : ((o.data = a.data), (o._resolvedData = a._resolvedData)),
                    e(t, n, o.component ? (l ? l.children : null) : r, s, i),
                    u &&
                      i.canDeactivateChecks.push(
                        new Tm((l && l.outlet && l.outlet.component) || null, a)
                      );
                } else
                  a && Im(n, l, i),
                    i.canActivateChecks.push(new km(s)),
                    e(t, null, o.component ? (l ? l.children : null) : r, s, i);
              })(t, o[t.value.outlet], r, s.concat([t.value]), i),
                delete o[t.value.outlet];
            }),
            yg(o, (e, t) => Im(e, r.getContext(t), i)),
            i
          );
        })(r, t ? t._root : null, n, [r.value]);
      }
      function Am(e, t, n) {
        const r = (function(e) {
          if (!e) return null;
          for (let t = e.parent; t; t = t.parent) {
            const e = t.routeConfig;
            if (e && e._loadedConfig) return e._loadedConfig;
          }
          return null;
        })(t);
        return (r ? r.module.injector : n).get(e);
      }
      function Im(e, t, n) {
        const r = Bg(e),
          s = e.value;
        yg(r, (e, r) => {
          Im(e, s.component ? (t ? t.children.getContext(r) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Tm(
              s.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              s
            )
          );
      }
      const Om = Symbol("INITIAL_VALUE");
      function Rm() {
        return vh(e =>
          (function(...e) {
            let t = null,
              n = null;
            return (
              A(e[e.length - 1]) && (n = e.pop()),
              "function" == typeof e[e.length - 1] && (t = e.pop()),
              1 === e.length && l(e[0]) && (e = e[0]),
              q(e, n).lift(new lh(t))
            );
          })(
            ...e.map(e =>
              e.pipe(
                Th(1),
                (function(...e) {
                  return t => {
                    let n = e[e.length - 1];
                    A(n) ? e.pop() : (n = null);
                    const r = e.length;
                    return bh(
                      1 !== r || n ? (r > 0 ? q(e, n) : ia(n)) : oa(e[0]),
                      t
                    );
                  };
                })(Om)
              )
            )
          ).pipe(
            Vf((e, t) => {
              let n = !1;
              return t.reduce((e, r, s) => {
                if (e !== Om) return e;
                if ((r === Om && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === t.length - 1 || gm(r)) return r;
                }
                return e;
              }, e);
            }, Om),
            ua(e => e !== Om),
            H(e => (gm(e) ? e : !0 === e)),
            Th(1)
          )
        );
      }
      function Nm(e, t) {
        return null !== e && t && t(new tg(e)), aa(!0);
      }
      function Pm(e, t) {
        return null !== e && t && t(new Xf(e)), aa(!0);
      }
      function Mm(e, t, n) {
        const r = t.routeConfig ? t.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? aa(
              r.map(r =>
                _f(() => {
                  const s = Am(r, t, n);
                  let i;
                  if (
                    (function(e) {
                      return e && fm(e.canActivate);
                    })(s)
                  )
                    i = bg(s.canActivate(t, e));
                  else {
                    if (!fm(s)) throw new Error("Invalid CanActivate guard");
                    i = bg(s(t, e));
                  }
                  return i.pipe(Nf());
                })
              )
            ).pipe(Rm())
          : aa(!0);
      }
      function Vm(e, t, n) {
        const r = t[t.length - 1],
          s = t
            .slice(0, t.length - 1)
            .reverse()
            .map(e =>
              (function(e) {
                const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                return t && 0 !== t.length ? { node: e, guards: t } : null;
              })(e)
            )
            .filter(e => null !== e)
            .map(t =>
              _f(() =>
                aa(
                  t.guards.map(s => {
                    const i = Am(s, t.node, n);
                    let o;
                    if (
                      (function(e) {
                        return e && fm(e.canActivateChild);
                      })(i)
                    )
                      o = bg(i.canActivateChild(r, e));
                    else {
                      if (!fm(i))
                        throw new Error("Invalid CanActivateChild guard");
                      o = bg(i(r, e));
                    }
                    return o.pipe(Nf());
                  })
                ).pipe(Rm())
              )
            );
        return aa(s).pipe(Rm());
      }
      class jm {}
      class Um {
        constructor(e, t, n, r, s, i) {
          (this.rootComponentType = e),
            (this.config = t),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          try {
            const e = $m(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              t = this.processSegmentGroup(this.config, e, "primary"),
              n = new Qg(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new zg(n, t),
              s = new Kg(this.url, r);
            return this.inheritParamsAndData(s._root), aa(s);
          } catch (e) {
            return new w(t => t.error(e));
          }
        }
        inheritParamsAndData(e) {
          const t = e.value,
            n = Zg(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(n.params)),
            (t.data = Object.freeze(n.data)),
            e.children.forEach(e => this.inheritParamsAndData(e));
        }
        processSegmentGroup(e, t, n) {
          return 0 === t.segments.length && t.hasChildren()
            ? this.processChildren(e, t)
            : this.processSegment(e, t, t.segments, n);
        }
        processChildren(e, t) {
          const n = Sg(t, (t, n) => this.processSegmentGroup(e, t, n));
          return (
            (function(e) {
              const t = {};
              e.forEach(e => {
                const n = t[e.value.outlet];
                if (n) {
                  const t = n.url.map(e => e.toString()).join("/"),
                    r = e.value.url.map(e => e.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${t}' and '${r}'.`
                  );
                }
                t[e.value.outlet] = e.value;
              });
            })(n),
            n.sort((e, t) =>
              "primary" === e.value.outlet
                ? -1
                : "primary" === t.value.outlet
                ? 1
                : e.value.outlet.localeCompare(t.value.outlet)
            ),
            n
          );
        }
        processSegment(e, t, n, r) {
          for (const i of e)
            try {
              return this.processSegmentAgainstRoute(i, t, n, r);
            } catch (s) {
              if (!(s instanceof jm)) throw s;
            }
          if (this.noLeftoversInUrl(t, n, r)) return [];
          throw new jm();
        }
        noLeftoversInUrl(e, t, n) {
          return 0 === t.length && !e.children[n];
        }
        processSegmentAgainstRoute(e, t, n, r) {
          if (e.redirectTo) throw new jm();
          if ((e.outlet || "primary") !== r) throw new jm();
          let s,
            i = [],
            o = [];
          if ("**" === e.path) {
            const i = n.length > 0 ? mg(n).parameters : {};
            s = new Qg(
              n,
              i,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Bm(e),
              r,
              e.component,
              e,
              Fm(t),
              Lm(t) + n.length,
              qm(e)
            );
          } else {
            const a = (function(e, t, n) {
              if ("" === t.path) {
                if ("full" === t.pathMatch && (e.hasChildren() || n.length > 0))
                  throw new jm();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (t.matcher || lg)(n, e, t);
              if (!r) throw new jm();
              const s = {};
              yg(r.posParams, (e, t) => {
                s[t] = e.path;
              });
              const i =
                r.consumed.length > 0
                  ? Object.assign(
                      {},
                      s,
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: i
              };
            })(t, e, n);
            (i = a.consumedSegments),
              (o = n.slice(a.lastChild)),
              (s = new Qg(
                i,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Bm(e),
                r,
                e.component,
                e,
                Fm(t),
                Lm(t) + i.length,
                qm(e)
              ));
          }
          const a = (function(e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedConfig.routes
                : [];
            })(e),
            { segmentGroup: l, slicedSegments: u } = $m(
              t,
              i,
              o,
              a,
              this.relativeLinkResolution
            );
          if (0 === u.length && l.hasChildren()) {
            const e = this.processChildren(a, l);
            return [new zg(s, e)];
          }
          if (0 === a.length && 0 === u.length) return [new zg(s, [])];
          const c = this.processSegment(a, l, u, "primary");
          return [new zg(s, c)];
        }
      }
      function Fm(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Lm(e) {
        let t = e,
          n = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (n += t._segmentIndexShift ? t._segmentIndexShift : 0);
        return n - 1;
      }
      function $m(e, t, n, r, s) {
        if (
          n.length > 0 &&
          (function(e, t, n) {
            return n.some(n => Hm(e, t, n) && "primary" !== zm(n));
          })(e, n, r)
        ) {
          const s = new wg(
            t,
            (function(e, t, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && "primary" !== zm(i)) {
                  const n = new wg([], {});
                  (n._sourceSegment = e),
                    (n._segmentIndexShift = t.length),
                    (s[zm(i)] = n);
                }
              return s;
            })(e, t, r, new wg(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function(e, t, n) {
            return n.some(n => Hm(e, t, n));
          })(e, n, r)
        ) {
          const i = new wg(
            e.segments,
            (function(e, t, n, r, s, i) {
              const o = {};
              for (const a of r)
                if (Hm(e, n, a) && !s[zm(a)]) {
                  const n = new wg([], {});
                  (n._sourceSegment = e),
                    (n._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (o[zm(a)] = n);
                }
              return Object.assign({}, s, o);
            })(e, t, n, r, e.children, s)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new wg(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function Hm(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function zm(e) {
        return e.outlet || "primary";
      }
      function Bm(e) {
        return e.data || {};
      }
      function qm(e) {
        return e.resolve || {};
      }
      function Wm(e, t, n, r) {
        const s = Am(e, t, r);
        return bg(s.resolve ? s.resolve(t, n) : s(t, n));
      }
      function Gm(e) {
        return function(t) {
          return t.pipe(
            vh(t => {
              const n = e(t);
              return n ? W(n).pipe(H(() => t)) : W([t]);
            })
          );
        };
      }
      class Zm {}
      class Qm {
        shouldDetach(e) {
          return !1;
        }
        store(e, t) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, t) {
          return e.routeConfig === t.routeConfig;
        }
      }
      const Km = new Te("ROUTES");
      class Ym {
        constructor(e, t, n, r) {
          (this.loader = e),
            (this.compiler = t),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(e, t) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(t),
            this.loadModuleFactory(t.loadChildren).pipe(
              H(n => {
                this.onLoadEndListener && this.onLoadEndListener(t);
                const r = n.create(e);
                return new ug(gg(r.injector.get(Km)).map(pg), r);
              })
            )
          );
        }
        loadModuleFactory(e) {
          return "string" == typeof e
            ? W(this.loader.load(e))
            : bg(e()).pipe(
                G(e =>
                  e instanceof Ue
                    ? aa(e)
                    : W(this.compiler.compileModuleAsync(e))
                )
              );
        }
      }
      class Jm {}
      class Xm {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, t) {
          return e;
        }
      }
      function ey(e) {
        throw e;
      }
      function ty(e, t, n) {
        return t.parse("/");
      }
      function ny(e, t) {
        return aa(null);
      }
      class ry {
        constructor(e, t, n, r, s, i, o, a) {
          (this.rootComponentType = e),
            (this.urlSerializer = t),
            (this.rootContexts = n),
            (this.location = r),
            (this.config = a),
            (this.lastSuccessfulNavigation = null),
            (this.currentNavigation = null),
            (this.navigationId = 0),
            (this.isNgZoneEnabled = !1),
            (this.events = new T()),
            (this.errorHandler = ey),
            (this.malformedUriErrorHandler = ty),
            (this.navigated = !1),
            (this.lastSuccessfulId = -1),
            (this.hooks = { beforePreactivation: ny, afterPreactivation: ny }),
            (this.urlHandlingStrategy = new Xm()),
            (this.routeReuseStrategy = new Qm()),
            (this.onSameUrlNavigation = "ignore"),
            (this.paramsInheritanceStrategy = "emptyOnly"),
            (this.urlUpdateStrategy = "deferred"),
            (this.relativeLinkResolution = "legacy"),
            (this.ngModule = s.get(je)),
            (this.console = s.get(Is));
          const l = s.get(Zs);
          (this.isNgZoneEnabled = l instanceof Zs),
            this.resetConfig(a),
            (this.currentUrlTree = new _g(new wg([], {}), {}, null)),
            (this.rawUrlTree = this.currentUrlTree),
            (this.browserUrlTree = this.currentUrlTree),
            (this.configLoader = new Ym(
              i,
              o,
              e => this.triggerEvent(new Yf(e)),
              e => this.triggerEvent(new Jf(e))
            )),
            (this.routerState = Wg(
              this.currentUrlTree,
              this.rootComponentType
            )),
            (this.transitions = new oh({
              id: 0,
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
              guardsResult: null
            })),
            (this.navigations = this.setupNavigations(this.transitions)),
            this.processNavigations();
        }
        setupNavigations(e) {
          const t = this.events;
          return e.pipe(
            ua(e => 0 !== e.id),
            H(e =>
              Object.assign({}, e, {
                extractedUrl: this.urlHandlingStrategy.extract(e.rawUrl)
              })
            ),
            vh(e => {
              let n = !1,
                r = !1;
              return aa(e).pipe(
                Ih(e => {
                  this.currentNavigation = {
                    id: e.id,
                    initialUrl: e.currentRawUrl,
                    extractedUrl: e.extractedUrl,
                    trigger: e.source,
                    extras: e.extras,
                    previousNavigation: this.lastSuccessfulNavigation
                      ? Object.assign({}, this.lastSuccessfulNavigation, {
                          previousNavigation: null
                        })
                      : null
                  };
                }),
                vh(e => {
                  const n =
                    !this.navigated ||
                    e.extractedUrl.toString() !==
                      this.browserUrlTree.toString();
                  if (
                    ("reload" === this.onSameUrlNavigation || n) &&
                    this.urlHandlingStrategy.shouldProcessUrl(e.rawUrl)
                  )
                    return aa(e).pipe(
                      vh(e => {
                        const n = this.transitions.getValue();
                        return (
                          t.next(
                            new Hf(
                              e.id,
                              this.serializeUrl(e.extractedUrl),
                              e.source,
                              e.restoredState
                            )
                          ),
                          n !== this.transitions.getValue() ? sa : [e]
                        );
                      }),
                      vh(e => Promise.resolve(e)),
                      ((r = this.ngModule.injector),
                      (s = this.configLoader),
                      (i = this.urlSerializer),
                      (o = this.config),
                      function(e) {
                        return e.pipe(
                          vh(e =>
                            (function(e, t, n, r, s) {
                              return new wm(e, t, n, r, s).apply();
                            })(r, s, i, e.extractedUrl, o).pipe(
                              H(t =>
                                Object.assign({}, e, { urlAfterRedirects: t })
                              )
                            )
                          )
                        );
                      }),
                      Ih(e => {
                        this.currentNavigation = Object.assign(
                          {},
                          this.currentNavigation,
                          { finalUrl: e.urlAfterRedirects }
                        );
                      }),
                      (function(e, t, n, r, s) {
                        return function(i) {
                          return i.pipe(
                            G(i =>
                              (function(
                                e,
                                t,
                                n,
                                r,
                                s = "emptyOnly",
                                i = "legacy"
                              ) {
                                return new Um(e, t, n, r, s, i).recognize();
                              })(
                                e,
                                t,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                s
                              ).pipe(
                                H(e =>
                                  Object.assign({}, i, { targetSnapshot: e })
                                )
                              )
                            )
                          );
                        };
                      })(
                        this.rootComponentType,
                        this.config,
                        e => this.serializeUrl(e),
                        this.paramsInheritanceStrategy,
                        this.relativeLinkResolution
                      ),
                      Ih(e => {
                        "eager" === this.urlUpdateStrategy &&
                          (e.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              e.urlAfterRedirects,
                              !!e.extras.replaceUrl,
                              e.id,
                              e.extras.state
                            ),
                          (this.browserUrlTree = e.urlAfterRedirects));
                      }),
                      Ih(e => {
                        const n = new Wf(
                          e.id,
                          this.serializeUrl(e.extractedUrl),
                          this.serializeUrl(e.urlAfterRedirects),
                          e.targetSnapshot
                        );
                        t.next(n);
                      })
                    );
                  var r, s, i, o;
                  if (
                    n &&
                    this.rawUrlTree &&
                    this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                  ) {
                    const {
                        id: n,
                        extractedUrl: r,
                        source: s,
                        restoredState: i,
                        extras: o
                      } = e,
                      a = new Hf(n, this.serializeUrl(r), s, i);
                    t.next(a);
                    const l = Wg(r, this.rootComponentType).snapshot;
                    return aa(
                      Object.assign({}, e, {
                        targetSnapshot: l,
                        urlAfterRedirects: r,
                        extras: Object.assign({}, o, {
                          skipLocationChange: !1,
                          replaceUrl: !1
                        })
                      })
                    );
                  }
                  return (
                    (this.rawUrlTree = e.rawUrl),
                    (this.browserUrlTree = e.urlAfterRedirects),
                    e.resolve(null),
                    sa
                  );
                }),
                Gm(e => {
                  const {
                    targetSnapshot: t,
                    id: n,
                    extractedUrl: r,
                    rawUrl: s,
                    extras: { skipLocationChange: i, replaceUrl: o }
                  } = e;
                  return this.hooks.beforePreactivation(t, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: s,
                    skipLocationChange: !!i,
                    replaceUrl: !!o
                  });
                }),
                Ih(e => {
                  const t = new Gf(
                    e.id,
                    this.serializeUrl(e.extractedUrl),
                    this.serializeUrl(e.urlAfterRedirects),
                    e.targetSnapshot
                  );
                  this.triggerEvent(t);
                }),
                H(e =>
                  Object.assign({}, e, {
                    guards: Dm(
                      e.targetSnapshot,
                      e.currentSnapshot,
                      this.rootContexts
                    )
                  })
                ),
                (function(e, t) {
                  return function(n) {
                    return n.pipe(
                      G(n => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: s,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: o
                          }
                        } = n;
                        return 0 === o.length && 0 === i.length
                          ? aa(Object.assign({}, n, { guardsResult: !0 }))
                          : (function(e, t, n, r) {
                              return W(e).pipe(
                                G(e =>
                                  (function(e, t, n, r, s) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? aa(
                                          i.map(i => {
                                            const o = Am(i, t, s);
                                            let a;
                                            if (
                                              (function(e) {
                                                return e && fm(e.canDeactivate);
                                              })(o)
                                            )
                                              a = bg(
                                                o.canDeactivate(e, t, n, r)
                                              );
                                            else {
                                              if (!fm(o))
                                                throw new Error(
                                                  "Invalid CanDeactivate guard"
                                                );
                                              a = bg(o(e, t, n, r));
                                            }
                                            return a.pipe(Nf());
                                          })
                                        ).pipe(Rm())
                                      : aa(!0);
                                  })(e.component, e.route, n, t, r)
                                ),
                                Nf(e => !0 !== e, !0)
                              );
                            })(o, r, s, e).pipe(
                              G(n =>
                                n && "boolean" == typeof n
                                  ? (function(e, t, n, r) {
                                      return W(t).pipe(
                                        la(t =>
                                          W([
                                            Pm(t.route.parent, r),
                                            Nm(t.route, r),
                                            Vm(e, t.path, n),
                                            Mm(e, t.route, n)
                                          ]).pipe(
                                            yh(),
                                            Nf(e => !0 !== e, !0)
                                          )
                                        ),
                                        Nf(e => !0 !== e, !0)
                                      );
                                    })(r, i, e, t)
                                  : aa(n)
                              ),
                              H(e => Object.assign({}, n, { guardsResult: e }))
                            );
                      })
                    );
                  };
                })(this.ngModule.injector, e => this.triggerEvent(e)),
                Ih(e => {
                  if (gm(e.guardsResult)) {
                    const t = ag(
                      `Redirecting to "${this.serializeUrl(e.guardsResult)}"`
                    );
                    throw ((t.url = e.guardsResult), t);
                  }
                }),
                Ih(e => {
                  const t = new Zf(
                    e.id,
                    this.serializeUrl(e.extractedUrl),
                    this.serializeUrl(e.urlAfterRedirects),
                    e.targetSnapshot,
                    !!e.guardsResult
                  );
                  this.triggerEvent(t);
                }),
                ua(e => {
                  if (!e.guardsResult) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new Bf(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      ""
                    );
                    return t.next(n), e.resolve(!1), !1;
                  }
                  return !0;
                }),
                Gm(e => {
                  if (e.guards.canActivateChecks.length)
                    return aa(e).pipe(
                      Ih(e => {
                        const t = new Qf(
                          e.id,
                          this.serializeUrl(e.extractedUrl),
                          this.serializeUrl(e.urlAfterRedirects),
                          e.targetSnapshot
                        );
                        this.triggerEvent(t);
                      }),
                      ((t = this.paramsInheritanceStrategy),
                      (n = this.ngModule.injector),
                      function(e) {
                        return e.pipe(
                          G(e => {
                            const {
                              targetSnapshot: r,
                              guards: { canActivateChecks: s }
                            } = e;
                            return s.length
                              ? W(s).pipe(
                                  la(e =>
                                    (function(e, t, n, r) {
                                      return (function(e, t, n, r) {
                                        const s = Object.keys(e);
                                        if (0 === s.length) return aa({});
                                        if (1 === s.length) {
                                          const i = s[0];
                                          return Wm(e[i], t, n, r).pipe(
                                            H(e => ({ [i]: e }))
                                          );
                                        }
                                        const i = {};
                                        return W(s)
                                          .pipe(
                                            G(s =>
                                              Wm(e[s], t, n, r).pipe(
                                                H(e => ((i[s] = e), e))
                                              )
                                            )
                                          )
                                          .pipe(
                                            Af(),
                                            H(() => i)
                                          );
                                      })(e._resolve, e, t, r).pipe(
                                        H(
                                          t => (
                                            (e._resolvedData = t),
                                            (e.data = Object.assign(
                                              {},
                                              e.data,
                                              Zg(e, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(e.route, r, t, n)
                                  ),
                                  (function(e, t) {
                                    return arguments.length >= 2
                                      ? function(n) {
                                          return v(Vf(e, t), wf(1), kf(t))(n);
                                        }
                                      : function(t) {
                                          return v(
                                            Vf((t, n, r) => e(t, n, r + 1)),
                                            wf(1)
                                          )(t);
                                        };
                                  })((e, t) => e),
                                  H(t => e)
                                )
                              : aa(e);
                          })
                        );
                      }),
                      Ih(e => {
                        const t = new Kf(
                          e.id,
                          this.serializeUrl(e.extractedUrl),
                          this.serializeUrl(e.urlAfterRedirects),
                          e.targetSnapshot
                        );
                        this.triggerEvent(t);
                      })
                    );
                  var t, n;
                }),
                Gm(e => {
                  const {
                    targetSnapshot: t,
                    id: n,
                    extractedUrl: r,
                    rawUrl: s,
                    extras: { skipLocationChange: i, replaceUrl: o }
                  } = e;
                  return this.hooks.afterPreactivation(t, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: s,
                    skipLocationChange: !!i,
                    replaceUrl: !!o
                  });
                }),
                H(e => {
                  const t = (function(e, t, n) {
                    const r = (function e(t, n, r) {
                      if (r && t.shouldReuseRoute(n.value, r.value.snapshot)) {
                        const s = r.value;
                        s._futureSnapshot = n.value;
                        const i = (function(t, n, r) {
                          return n.children.map(n => {
                            for (const s of r.children)
                              if (t.shouldReuseRoute(s.value.snapshot, n.value))
                                return e(t, n, s);
                            return e(t, n);
                          });
                        })(t, n, r);
                        return new zg(s, i);
                      }
                      {
                        const r = t.retrieve(n.value);
                        if (r) {
                          const e = r.route;
                          return (
                            (function e(t, n) {
                              if (t.value.routeConfig !== n.value.routeConfig)
                                throw new Error(
                                  "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                );
                              if (t.children.length !== n.children.length)
                                throw new Error(
                                  "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                );
                              n.value._futureSnapshot = t.value;
                              for (let r = 0; r < t.children.length; ++r)
                                e(t.children[r], n.children[r]);
                            })(n, e),
                            e
                          );
                        }
                        {
                          const r = new Gg(
                              new oh((s = n.value).url),
                              new oh(s.params),
                              new oh(s.queryParams),
                              new oh(s.fragment),
                              new oh(s.data),
                              s.outlet,
                              s.component,
                              s
                            ),
                            i = n.children.map(n => e(t, n));
                          return new zg(r, i);
                        }
                      }
                      var s;
                    })(e, t._root, n ? n._root : void 0);
                    return new qg(r, t);
                  })(
                    this.routeReuseStrategy,
                    e.targetSnapshot,
                    e.currentRouterState
                  );
                  return Object.assign({}, e, { targetRouterState: t });
                }),
                Ih(e => {
                  (this.currentUrlTree = e.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      this.currentUrlTree,
                      e.rawUrl
                    )),
                    (this.routerState = e.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (e.extras.skipLocationChange ||
                        this.setBrowserUrl(
                          this.rawUrlTree,
                          !!e.extras.replaceUrl,
                          e.id,
                          e.extras.state
                        ),
                      (this.browserUrlTree = e.urlAfterRedirects));
                }),
                ((i = this.rootContexts),
                (o = this.routeReuseStrategy),
                (a = e => this.triggerEvent(e)),
                H(
                  e => (
                    new dm(
                      o,
                      e.targetRouterState,
                      e.currentRouterState,
                      a
                    ).activate(i),
                    e
                  )
                )),
                Ih({
                  next() {
                    n = !0;
                  },
                  complete() {
                    n = !0;
                  }
                }),
                ((s = () => {
                  if (!n && !r) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new Bf(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      `Navigation ID ${e.id} is not equal to the current navigation id ${this.navigationId}`
                    );
                    t.next(n), e.resolve(!1);
                  }
                  this.currentNavigation = null;
                }),
                e => e.lift(new Ff(s))),
                If(n => {
                  if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                    const r = gm(n.url);
                    r ||
                      ((this.navigated = !0),
                      this.resetStateAndUrl(
                        e.currentRouterState,
                        e.currentUrlTree,
                        e.rawUrl
                      ));
                    const s = new Bf(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      n.message
                    );
                    t.next(s), e.resolve(!1), r && this.navigateByUrl(n.url);
                  } else {
                    this.resetStateAndUrl(
                      e.currentRouterState,
                      e.currentUrlTree,
                      e.rawUrl
                    );
                    const r = new qf(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      n
                    );
                    t.next(r);
                    try {
                      e.resolve(this.errorHandler(n));
                    } catch (i) {
                      e.reject(i);
                    }
                  }
                  var s;
                  return sa;
                })
              );
              var s, i, o, a;
            })
          );
        }
        resetRootComponentType(e) {
          (this.rootComponentType = e),
            (this.routerState.root.component = this.rootComponentType);
        }
        getTransition() {
          const e = this.transitions.value;
          return (e.urlAfterRedirects = this.browserUrlTree), e;
        }
        setTransition(e) {
          this.transitions.next(Object.assign({}, this.getTransition(), e));
        }
        initialNavigation() {
          this.setUpLocationChangeListener(),
            0 === this.navigationId &&
              this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
        }
        setUpLocationChangeListener() {
          this.locationSubscription ||
            (this.locationSubscription = this.location.subscribe(e => {
              let t = this.parseUrl(e.url);
              const n = "popstate" === e.type ? "popstate" : "hashchange",
                r = e.state && e.state.navigationId ? e.state : null;
              setTimeout(() => {
                this.scheduleNavigation(t, n, r, { replaceUrl: !0 });
              }, 0);
            }));
        }
        get url() {
          return this.serializeUrl(this.currentUrlTree);
        }
        getCurrentNavigation() {
          return this.currentNavigation;
        }
        triggerEvent(e) {
          this.events.next(e);
        }
        resetConfig(e) {
          cg(e),
            (this.config = e.map(pg)),
            (this.navigated = !1),
            (this.lastSuccessfulId = -1);
        }
        ngOnDestroy() {
          this.dispose();
        }
        dispose() {
          this.locationSubscription &&
            (this.locationSubscription.unsubscribe(),
            (this.locationSubscription = null));
        }
        createUrlTree(e, t = {}) {
          const {
            relativeTo: n,
            queryParams: r,
            fragment: s,
            preserveQueryParams: i,
            queryParamsHandling: o,
            preserveFragment: a
          } = t;
          Qe() &&
            i &&
            console &&
            console.warn &&
            console.warn(
              "preserveQueryParams is deprecated, use queryParamsHandling instead."
            );
          const l = n || this.routerState.root,
            u = a ? this.currentUrlTree.fragment : s;
          let c = null;
          if (o)
            switch (o) {
              case "merge":
                c = Object.assign({}, this.currentUrlTree.queryParams, r);
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = r || null;
            }
          else c = i ? this.currentUrlTree.queryParams : r || null;
          return (
            null !== c && (c = this.removeEmptyProps(c)),
            (function(e, t, n, r, s) {
              if (0 === n.length) return nm(t.root, t.root, t, r, s);
              const i = (function(e) {
                if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                  return new rm(!0, 0, e);
                let t = 0,
                  n = !1;
                const r = e.reduce((e, r, s) => {
                  if ("object" == typeof r && null != r) {
                    if (r.outlets) {
                      const t = {};
                      return (
                        yg(r.outlets, (e, n) => {
                          t[n] = "string" == typeof e ? e.split("/") : e;
                        }),
                        [...e, { outlets: t }]
                      );
                    }
                    if (r.segmentPath) return [...e, r.segmentPath];
                  }
                  return "string" != typeof r
                    ? [...e, r]
                    : 0 === s
                    ? (r.split("/").forEach((r, s) => {
                        (0 == s && "." === r) ||
                          (0 == s && "" === r
                            ? (n = !0)
                            : ".." === r
                            ? t++
                            : "" != r && e.push(r));
                      }),
                      e)
                    : [...e, r];
                }, []);
                return new rm(n, t, r);
              })(n);
              if (i.toRoot()) return nm(t.root, new wg([], {}), t, r, s);
              const o = (function(e, t, n) {
                  if (e.isAbsolute) return new sm(t.root, !0, 0);
                  if (-1 === n.snapshot._lastPathIndex)
                    return new sm(n.snapshot._urlSegment, !0, 0);
                  const r = tm(e.commands[0]) ? 0 : 1;
                  return (function(e, t, n) {
                    let r = e,
                      s = t,
                      i = n;
                    for (; i > s; ) {
                      if (((i -= s), (r = r.parent), !r))
                        throw new Error("Invalid number of '../'");
                      s = r.segments.length;
                    }
                    return new sm(r, !1, s - i);
                  })(
                    n.snapshot._urlSegment,
                    n.snapshot._lastPathIndex + r,
                    e.numberOfDoubleDots
                  );
                })(i, t, e),
                a = o.processChildren
                  ? am(o.segmentGroup, o.index, i.commands)
                  : om(o.segmentGroup, o.index, i.commands);
              return nm(o.segmentGroup, a, t, r, s);
            })(l, this.currentUrlTree, e, c, u)
          );
        }
        navigateByUrl(e, t = { skipLocationChange: !1 }) {
          Qe() &&
            this.isNgZoneEnabled &&
            !Zs.isInAngularZone() &&
            this.console.warn(
              "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
            );
          const n = gm(e) ? e : this.parseUrl(e),
            r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
          return this.scheduleNavigation(r, "imperative", null, t);
        }
        navigate(e, t = { skipLocationChange: !1 }) {
          return (
            (function(e) {
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                if (null == n)
                  throw new Error(
                    `The requested path contains ${n} segment at index ${t}`
                  );
              }
            })(e),
            this.navigateByUrl(this.createUrlTree(e, t), t)
          );
        }
        serializeUrl(e) {
          return this.urlSerializer.serialize(e);
        }
        parseUrl(e) {
          let t;
          try {
            t = this.urlSerializer.parse(e);
          } catch (n) {
            t = this.malformedUriErrorHandler(n, this.urlSerializer, e);
          }
          return t;
        }
        isActive(e, t) {
          if (gm(e)) return vg(this.currentUrlTree, e, t);
          const n = this.parseUrl(e);
          return vg(this.currentUrlTree, n, t);
        }
        removeEmptyProps(e) {
          return Object.keys(e).reduce((t, n) => {
            const r = e[n];
            return null != r && (t[n] = r), t;
          }, {});
        }
        processNavigations() {
          this.navigations.subscribe(
            e => {
              (this.navigated = !0),
                (this.lastSuccessfulId = e.id),
                this.events.next(
                  new zf(
                    e.id,
                    this.serializeUrl(e.extractedUrl),
                    this.serializeUrl(this.currentUrlTree)
                  )
                ),
                (this.lastSuccessfulNavigation = this.currentNavigation),
                (this.currentNavigation = null),
                e.resolve(!0);
            },
            e => {
              this.console.warn("Unhandled Navigation Error: ");
            }
          );
        }
        scheduleNavigation(e, t, n, r) {
          const s = this.getTransition();
          if (
            s &&
            "imperative" !== t &&
            "imperative" === s.source &&
            s.rawUrl.toString() === e.toString()
          )
            return Promise.resolve(!0);
          if (
            s &&
            "hashchange" == t &&
            "popstate" === s.source &&
            s.rawUrl.toString() === e.toString()
          )
            return Promise.resolve(!0);
          if (
            s &&
            "popstate" == t &&
            "hashchange" === s.source &&
            s.rawUrl.toString() === e.toString()
          )
            return Promise.resolve(!0);
          let i = null,
            o = null;
          const a = new Promise((e, t) => {
              (i = e), (o = t);
            }),
            l = ++this.navigationId;
          return (
            this.setTransition({
              id: l,
              source: t,
              restoredState: n,
              currentUrlTree: this.currentUrlTree,
              currentRawUrl: this.rawUrlTree,
              rawUrl: e,
              extras: r,
              resolve: i,
              reject: o,
              promise: a,
              currentSnapshot: this.routerState.snapshot,
              currentRouterState: this.routerState
            }),
            a.catch(e => Promise.reject(e))
          );
        }
        setBrowserUrl(e, t, n, r) {
          const s = this.urlSerializer.serialize(e);
          (r = r || {}),
            this.location.isCurrentPathEqualTo(s) || t
              ? this.location.replaceState(
                  s,
                  "",
                  Object.assign({}, r, { navigationId: n })
                )
              : this.location.go(
                  s,
                  "",
                  Object.assign({}, r, { navigationId: n })
                );
        }
        resetStateAndUrl(e, t, n) {
          (this.routerState = e),
            (this.currentUrlTree = t),
            (this.rawUrlTree = this.urlHandlingStrategy.merge(
              this.currentUrlTree,
              n
            )),
            this.resetUrlToCurrentUrlTree();
        }
        resetUrlToCurrentUrlTree() {
          this.location.replaceState(
            this.urlSerializer.serialize(this.rawUrlTree),
            "",
            { navigationId: this.lastSuccessfulId }
          );
        }
      }
      class sy {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new iy()),
            (this.attachRef = null);
        }
      }
      class iy {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(e, t) {
          const n = this.getOrCreateContext(e);
          (n.outlet = t), this.contexts.set(e, n);
        }
        onChildOutletDestroyed(e) {
          const t = this.getContext(e);
          t && (t.outlet = null);
        }
        onOutletDeactivated() {
          const e = this.contexts;
          return (this.contexts = new Map()), e;
        }
        onOutletReAttached(e) {
          this.contexts = e;
        }
        getOrCreateContext(e) {
          let t = this.getContext(e);
          return t || ((t = new sy()), this.contexts.set(e, t)), t;
        }
        getContext(e) {
          return this.contexts.get(e) || null;
        }
      }
      class oy {
        constructor(e, t, n, r, s) {
          (this.parentContexts = e),
            (this.location = t),
            (this.resolver = n),
            (this.changeDetector = s),
            (this.activated = null),
            (this._activatedRoute = null),
            (this.activateEvents = new vs()),
            (this.deactivateEvents = new vs()),
            (this.name = r || "primary"),
            e.onChildOutletCreated(this.name, this);
        }
        ngOnDestroy() {
          this.parentContexts.onChildOutletDestroyed(this.name);
        }
        ngOnInit() {
          if (!this.activated) {
            const e = this.parentContexts.getContext(this.name);
            e &&
              e.route &&
              (e.attachRef
                ? this.attach(e.attachRef, e.route)
                : this.activateWith(e.route, e.resolver || null));
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
          return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
        }
        detach() {
          if (!this.activated) throw new Error("Outlet is not activated");
          this.location.detach();
          const e = this.activated;
          return (this.activated = null), (this._activatedRoute = null), e;
        }
        attach(e, t) {
          (this.activated = e),
            (this._activatedRoute = t),
            this.location.insert(e.hostView);
        }
        deactivate() {
          if (this.activated) {
            const e = this.component;
            this.activated.destroy(),
              (this.activated = null),
              (this._activatedRoute = null),
              this.deactivateEvents.emit(e);
          }
        }
        activateWith(e, t) {
          if (this.isActivated)
            throw new Error("Cannot activate an already activated outlet");
          this._activatedRoute = e;
          const n = (t = t || this.resolver).resolveComponentFactory(
              e._futureSnapshot.routeConfig.component
            ),
            r = this.parentContexts.getOrCreateContext(this.name).children,
            s = new ay(e, r, this.location.injector);
          (this.activated = this.location.createComponent(
            n,
            this.location.length,
            s
          )),
            this.changeDetector.markForCheck(),
            this.activateEvents.emit(this.activated.instance);
        }
      }
      class ay {
        constructor(e, t, n) {
          (this.route = e), (this.childContexts = t), (this.parent = n);
        }
        get(e, t) {
          return e === Gg
            ? this.route
            : e === iy
            ? this.childContexts
            : this.parent.get(e, t);
        }
      }
      class ly {}
      class uy {
        preload(e, t) {
          return t().pipe(If(() => aa(null)));
        }
      }
      class cy {
        preload(e, t) {
          return aa(null);
        }
      }
      class hy {
        constructor(e, t, n, r, s) {
          (this.router = e),
            (this.injector = r),
            (this.preloadingStrategy = s),
            (this.loader = new Ym(
              t,
              n,
              t => e.triggerEvent(new Yf(t)),
              t => e.triggerEvent(new Jf(t))
            ));
        }
        setUpPreloading() {
          this.subscription = this.router.events
            .pipe(
              ua(e => e instanceof zf),
              la(() => this.preload())
            )
            .subscribe(() => {});
        }
        preload() {
          const e = this.injector.get(je);
          return this.processRoutes(e, this.router.config);
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        processRoutes(e, t) {
          const n = [];
          for (const r of t)
            if (r.loadChildren && !r.canLoad && r._loadedConfig) {
              const e = r._loadedConfig;
              n.push(this.processRoutes(e.module, e.routes));
            } else
              r.loadChildren && !r.canLoad
                ? n.push(this.preloadConfig(e, r))
                : r.children && n.push(this.processRoutes(e, r.children));
          return W(n).pipe(
            Y(),
            H(e => {})
          );
        }
        preloadConfig(e, t) {
          return this.preloadingStrategy.preload(t, () =>
            this.loader
              .load(e.injector, t)
              .pipe(
                G(
                  e => (
                    (t._loadedConfig = e),
                    this.processRoutes(e.module, e.routes)
                  )
                )
              )
          );
        }
      }
      class dy {
        constructor(e, t, n = {}) {
          (this.router = e),
            (this.viewportScroller = t),
            (this.options = n),
            (this.lastId = 0),
            (this.lastSource = "imperative"),
            (this.restoredId = 0),
            (this.store = {}),
            (n.scrollPositionRestoration =
              n.scrollPositionRestoration || "disabled"),
            (n.anchorScrolling = n.anchorScrolling || "disabled");
        }
        init() {
          "disabled" !== this.options.scrollPositionRestoration &&
            this.viewportScroller.setHistoryScrollRestoration("manual"),
            (this.routerEventsSubscription = this.createScrollEvents()),
            (this.scrollEventsSubscription = this.consumeScrollEvents());
        }
        createScrollEvents() {
          return this.router.events.subscribe(e => {
            e instanceof Hf
              ? ((this.store[
                  this.lastId
                ] = this.viewportScroller.getScrollPosition()),
                (this.lastSource = e.navigationTrigger),
                (this.restoredId = e.restoredState
                  ? e.restoredState.navigationId
                  : 0))
              : e instanceof zf &&
                ((this.lastId = e.id),
                this.scheduleScrollEvent(
                  e,
                  this.router.parseUrl(e.urlAfterRedirects).fragment
                ));
          });
        }
        consumeScrollEvents() {
          return this.router.events.subscribe(e => {
            e instanceof rg &&
              (e.position
                ? "top" === this.options.scrollPositionRestoration
                  ? this.viewportScroller.scrollToPosition([0, 0])
                  : "enabled" === this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition(e.position)
                : e.anchor && "enabled" === this.options.anchorScrolling
                ? this.viewportScroller.scrollToAnchor(e.anchor)
                : "disabled" !== this.options.scrollPositionRestoration &&
                  this.viewportScroller.scrollToPosition([0, 0]));
          });
        }
        scheduleScrollEvent(e, t) {
          this.router.triggerEvent(
            new rg(
              e,
              "popstate" === this.lastSource
                ? this.store[this.restoredId]
                : null,
              t
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
      const py = new Te("ROUTER_CONFIGURATION"),
        fy = new Te("ROUTER_FORROOT_GUARD"),
        gy = [
          ma,
          { provide: Eg, useClass: kg },
          {
            provide: ry,
            useFactory: Cy,
            deps: [
              di,
              Eg,
              iy,
              ma,
              Tt,
              fi,
              js,
              Km,
              py,
              [Jm, new ce()],
              [Zm, new ce()]
            ]
          },
          iy,
          { provide: Gg, useFactory: xy, deps: [ry] },
          { provide: fi, useClass: yi },
          hy,
          cy,
          uy,
          { provide: py, useValue: { enableTracing: !1 } }
        ];
      function my() {
        return new ai("Router", ry);
      }
      class yy {
        constructor(e, t) {}
        static forRoot(e, t) {
          return {
            ngModule: yy,
            providers: [
              gy,
              wy(e),
              { provide: fy, useFactory: _y, deps: [[ry, new ce(), new de()]] },
              { provide: py, useValue: t || {} },
              {
                provide: fa,
                useFactory: vy,
                deps: [da, [new ue(ga), new ce()], py]
              },
              { provide: dy, useFactory: by, deps: [ry, pl, py] },
              {
                provide: ly,
                useExisting:
                  t && t.preloadingStrategy ? t.preloadingStrategy : cy
              },
              { provide: ai, multi: !0, useFactory: my },
              [
                Sy,
                { provide: Cs, multi: !0, useFactory: Ey, deps: [Sy] },
                { provide: Ty, useFactory: ky, deps: [Sy] },
                { provide: As, multi: !0, useExisting: Ty }
              ]
            ]
          };
        }
        static forChild(e) {
          return { ngModule: yy, providers: [wy(e)] };
        }
      }
      function by(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new dy(e, t, n);
      }
      function vy(e, t, n = {}) {
        return n.useHash ? new ba(e, t) : new va(e, t);
      }
      function _y(e) {
        if (e)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function wy(e) {
        return [
          { provide: Mt, multi: !0, useValue: e },
          { provide: Km, multi: !0, useValue: e }
        ];
      }
      function Cy(e, t, n, r, s, i, o, a, l = {}, u, c) {
        const h = new ry(null, t, n, r, s, i, o, gg(a));
        if (
          (u && (h.urlHandlingStrategy = u),
          c && (h.routeReuseStrategy = c),
          l.errorHandler && (h.errorHandler = l.errorHandler),
          l.malformedUriErrorHandler &&
            (h.malformedUriErrorHandler = l.malformedUriErrorHandler),
          l.enableTracing)
        ) {
          const e = ru();
          h.events.subscribe(t => {
            e.logGroup(`Router Event: ${t.constructor.name}`),
              e.log(t.toString()),
              e.log(t),
              e.logGroupEnd();
          });
        }
        return (
          l.onSameUrlNavigation &&
            (h.onSameUrlNavigation = l.onSameUrlNavigation),
          l.paramsInheritanceStrategy &&
            (h.paramsInheritanceStrategy = l.paramsInheritanceStrategy),
          l.urlUpdateStrategy && (h.urlUpdateStrategy = l.urlUpdateStrategy),
          l.relativeLinkResolution &&
            (h.relativeLinkResolution = l.relativeLinkResolution),
          h
        );
      }
      function xy(e) {
        return e.routerState.root;
      }
      class Sy {
        constructor(e) {
          (this.injector = e),
            (this.initNavigation = !1),
            (this.resultOfPreactivationDone = new T());
        }
        appInitializer() {
          return this.injector.get(pa, Promise.resolve(null)).then(() => {
            let e = null;
            const t = new Promise(t => (e = t)),
              n = this.injector.get(ry),
              r = this.injector.get(py);
            if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) e(!0);
            else if ("disabled" === r.initialNavigation)
              n.setUpLocationChangeListener(), e(!0);
            else {
              if ("enabled" !== r.initialNavigation)
                throw new Error(
                  `Invalid initialNavigation options: '${r.initialNavigation}'`
                );
              (n.hooks.afterPreactivation = () =>
                this.initNavigation
                  ? aa(null)
                  : ((this.initNavigation = !0),
                    e(!0),
                    this.resultOfPreactivationDone)),
                n.initialNavigation();
            }
            return t;
          });
        }
        bootstrapListener(e) {
          const t = this.injector.get(py),
            n = this.injector.get(hy),
            r = this.injector.get(dy),
            s = this.injector.get(ry),
            i = this.injector.get(di);
          e === i.components[0] &&
            (this.isLegacyEnabled(t)
              ? s.initialNavigation()
              : this.isLegacyDisabled(t) && s.setUpLocationChangeListener(),
            n.setUpPreloading(),
            r.init(),
            s.resetRootComponentType(i.componentTypes[0]),
            this.resultOfPreactivationDone.next(null),
            this.resultOfPreactivationDone.complete());
        }
        isLegacyEnabled(e) {
          return (
            "legacy_enabled" === e.initialNavigation ||
            !0 === e.initialNavigation ||
            void 0 === e.initialNavigation
          );
        }
        isLegacyDisabled(e) {
          return (
            "legacy_disabled" === e.initialNavigation ||
            !1 === e.initialNavigation
          );
        }
      }
      function Ey(e) {
        return e.appInitializer.bind(e);
      }
      function ky(e) {
        return e.bootstrapListener.bind(e);
      }
      const Ty = new Te("Router Initializer");
      var Dy = zn({ encapsulation: 2, styles: [], data: {} });
      function Ay(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Yr(1, 212992, null, 0, oy, [iy, Tn, Kt, [8, null], xt], null, null)
          ],
          function(e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      function Iy(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "ng-component",
              [],
              null,
              null,
              null,
              Ay,
              Dy
            )),
            Yr(1, 49152, null, 0, sg, [], null, null)
          ],
          null,
          null
        );
      }
      var Oy = Tr("ng-component", sg, Iy, {}, {}, []);
      class Ry extends class {
        constructor() {
          (this.email = ""), (this.password = "");
        }
      } {
        constructor() {
          super(...arguments),
            (this.fname = ""),
            (this.lname = ""),
            (this.token = "");
        }
      }
      class Ny {
        constructor(e, t, n) {
          (this.tambolaService = e),
            (this.notificationService = t),
            (this.router = n),
            (this.data = new Ry()),
            (this.isRegister = !1),
            (this.isError = !1);
        }
        ngOnInit() {
          this.registered = this.tambolaService.registered.subscribe(e => {
            e ? (this.isRegister = !1) : (this.isError = !0);
          });
        }
        login(e) {
          (this.isError = !1),
            (this.data = e.value),
            this.tambolaService.login(this.data);
        }
        goToRegister() {
          (this.isError = !1), (this.isRegister = !0);
        }
        register(e) {
          (this.data = e.value),
            (this.isError = !1),
            this.tambolaService.register(this.data);
        }
      }
      class Py {}
      class My {
        constructor() {
          (this.accessToken = ""),
            (this.errorCodes = [""]),
            (this.debugErrorMessages = [""]),
            (this.success = !0);
        }
      }
      class Vy extends My {
        constructor() {
          super(...arguments), (this.userResponse = [new Ry()]);
        }
      }
      class jy extends My {
        constructor() {
          super(...arguments), (this.gameResponse = [new Py()]);
        }
      }
      class Uy {
        constructor() {
          this.model = new Vy();
        }
      }
      class Fy {
        constructor() {
          this.model = new jy();
        }
      }
      class Ly {
        constructor() {
          (this.success = ""), (this.error = "");
        }
      }
      var $y = (function(e) {
        return (
          (e.SubscriptionToken = "NotificationToken"),
          (e.UserSubscribed = "UserSubscribed"),
          e
        );
      })({});
      class Hy {
        constructor(e) {
          this.activeModal = e;
        }
      }
      class zy {
        constructor(e, t, n) {
          (this.geneseService = e),
            (this.http = t),
            (this.utils = n),
            (this.ResponsesGenese = new Map()),
            this.ResponsesGenese.set(Fy, {
              instance: this.geneseService.getGeneseInstance(Object),
              apiBaseUrl: "games/"
            }),
            this.ResponsesGenese.set(Uy, {
              instance: this.geneseService.getGeneseInstance(Object),
              apiBaseUrl: "users/"
            });
        }
        post(e, t, n) {
          const r =
              "https://game-tambola.herokuapp.com/" +
              (e === Fy ? "games/" : "users/") +
              n,
            s = this.getHttpOptions(t);
          return this.http.post(r, t, s);
        }
        get(e, t) {
          return this.http.get("https://game-tambola.herokuapp.com/" + t + e, {
            responseType: "text"
          });
        }
        userDataCall(e, t) {
          return this.post(Uy, e, t).pipe(
            Ih(e => {
              this.setUserData(e);
            })
          );
        }
        setUserData(e) {
          e.model.success &&
            e.model.accessToken &&
            localStorage.setItem("Tambola_AccessToken", e.model.accessToken);
        }
        getHttpOptions(e) {
          return {
            body: e,
            headers: new yl({
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            })
          };
        }
      }
      let By = (() => {
          class e {
            constructor() {}
            getLocalStorage(e, t = !1) {
              return t
                ? this.JsonParse(localStorage.getItem("TAMBOLA:" + e))
                : localStorage.getItem("TAMBOLA:" + e);
            }
            JsonParse(e) {
              return e ? JSON.parse(e) : null;
            }
            removeLocalStorage(e) {
              localStorage.removeItem("TAMBOLA:" + e);
            }
            setLocalStorage(e, t, n = !1) {
              localStorage.setItem("TAMBOLA:" + e, n ? JSON.stringify(t) : t);
            }
            clearLocalStorage() {
              localStorage.clear();
            }
          }
          return (
            (e.ngInjectableDef = ge({
              factory: function() {
                return new e();
              },
              token: e,
              providedIn: "root"
            })),
            e
          );
        })(),
        qy = (() => {
          class e {
            constructor(e, t, n, r) {
              (this.apiService = e),
                (this.router = t),
                (this.utils = n),
                (this.modalService = r),
                (this.ticketDetails = []),
                (this.ticketUpdate = new T()),
                (this.registered = new T()),
                (this.ticketCreated = !1),
                this.getTicket();
            }
            register(e) {
              this.apiService.post(Uy, e, "register").subscribe(e => {
                this.registered.next(!!e.response);
              });
            }
            updateProfile(e) {
              return this.apiService.post(Ly, e, "updateProfile");
            }
            login(e) {
              this.apiService.post(Uy, e, "login").subscribe(e => {
                if (e.response && e.response.registered) {
                  if (
                    (this.router.navigate(["home"]),
                    localStorage.setItem(
                      "Tambola_AccessToken",
                      e.response.idToken
                    ),
                    this.utils.getLocalStorage($y.UserSubscribed, !1))
                  ) {
                    const e = {
                      token: this.utils.getLocalStorage(
                        $y.SubscriptionToken,
                        !0
                      )
                    };
                    this.updateProfile(e).subscribe();
                  }
                } else this.registered.next(!1);
              });
            }
            getTicket() {
              this.apiService.post(Fy, {}, "getTicket").subscribe(e => {
                e.response &&
                  (this.ticketUpdate.next(e.response),
                  localStorage.setItem(
                    "TambolaTicket",
                    JSON.stringify(e.response)
                  ),
                  (this.ticketCreated = !0)),
                  "Not logged in" === e.error &&
                    this.router.navigate(["login"]);
              });
            }
            createTicket(e) {
              this.apiService.post(Fy, e, "createGame").subscribe(t => {
                t.response &&
                  this.apiService.post(Fy, e, "createTicket").subscribe(e => {
                    e.response &&
                      (this.openModal("Ticket", "Ticket Sent to Admin!!"),
                      this.getTicket());
                  });
              });
            }
            claimPrize(e) {
              this.apiService.post(Fy, e, "claimPrize").subscribe(e => {
                e.response &&
                  this.openModal("Congratulations", "You Have won the Prize!!");
              });
            }
            getGameStats() {
              if (this.ticketCreated)
                return this.apiService.post(Fy, {}, "getGameStats");
            }
            createTicketData(e) {
              e.sort((e, t) => e - t);
              const t = this.createRowColumn();
              t.map((t, n) => {
                t.value = e[n];
              }),
                this.ticketUpdate.next(t);
            }
            generateRandomTicket() {
              let e = 1;
              const t = [];
              for (; e < 16; ) {
                const n = Math.floor(89 * Math.random() + 1);
                t.includes(n) || (t.push(n), e++);
              }
              this.createTicketData(t);
            }
            createRowColumn() {
              const e = [],
                t = [1, 3, 5, 7, 9],
                n = [2, 4, 6, 8, 9];
              return (
                [1, 2, 3].map(r => {
                  (1 === r || 3 === r ? t : n).map(t => {
                    const n = new Py();
                    (n.row = r), (n.column = t), e.push(n);
                  });
                }),
                e
              );
            }
            openModal(e, t) {
              const n = this.modalService.open(Hy);
              (n.componentInstance.my_modal_title = e),
                (n.componentInstance.my_modal_content = t);
            }
          }
          return (
            (e.ngInjectableDef = ge({
              factory: function() {
                return new e(Pe(zy), Pe(ry), Pe(By), Pe(Fd));
              },
              token: e,
              providedIn: "root"
            })),
            e
          );
        })();
      const Wy =
        "Service workers are disabled or not supported by this browser";
      class Gy {
        constructor(e) {
          if (((this.serviceWorker = e), e)) {
            const t = mh(e, "controllerchange").pipe(H(() => e.controller)),
              n = bh(
                _f(() => aa(e.controller)),
                t
              );
            (this.worker = n.pipe(ua(e => !!e))),
              (this.registration = this.worker.pipe(
                vh(() => e.getRegistration())
              ));
            const r = mh(e, "message")
              .pipe(H(e => e.data))
              .pipe(ua(e => e && e.type))
              .pipe(ie(new T()));
            r.connect(), (this.events = r);
          } else
            this.worker = this.events = this.registration = _f(() =>
              Vh(
                new Error(
                  "Service workers are disabled or not supported by this browser"
                )
              )
            );
        }
        postMessage(e, t) {
          return this.worker
            .pipe(
              Th(1),
              Ih(n => {
                n.postMessage(Object.assign({ action: e }, t));
              })
            )
            .toPromise()
            .then(() => {});
        }
        postMessageWithStatus(e, t, n) {
          const r = this.waitForStatus(n),
            s = this.postMessage(e, t);
          return Promise.all([r, s]).then(() => {});
        }
        generateNonce() {
          return Math.round(1e7 * Math.random());
        }
        eventsOfType(e) {
          return this.events.pipe(ua(t => t.type === e));
        }
        nextEventOfType(e) {
          return this.eventsOfType(e).pipe(Th(1));
        }
        waitForStatus(e) {
          return this.eventsOfType("STATUS")
            .pipe(
              ua(t => t.nonce === e),
              Th(1),
              H(e => {
                if (!e.status) throw new Error(e.error);
              })
            )
            .toPromise();
        }
        get isEnabled() {
          return !!this.serviceWorker;
        }
      }
      class Zy {
        constructor(e) {
          if (
            ((this.sw = e), (this.subscriptionChanges = new T()), !e.isEnabled)
          )
            return (
              (this.messages = gh),
              (this.notificationClicks = gh),
              void (this.subscription = gh)
            );
          (this.messages = this.sw.eventsOfType("PUSH").pipe(H(e => e.data))),
            (this.notificationClicks = this.sw
              .eventsOfType("NOTIFICATION_CLICK")
              .pipe(H(e => e.data))),
            (this.pushManager = this.sw.registration.pipe(
              H(e => e.pushManager)
            ));
          const t = this.pushManager.pipe(vh(e => e.getSubscription()));
          this.subscription = J(t, this.subscriptionChanges);
        }
        get isEnabled() {
          return this.sw.isEnabled;
        }
        requestSubscription(e) {
          if (!this.sw.isEnabled) return Promise.reject(new Error(Wy));
          const t = { userVisibleOnly: !0 };
          let n = this.decodeBase64(
              e.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+")
            ),
            r = new Uint8Array(new ArrayBuffer(n.length));
          for (let s = 0; s < n.length; s++) r[s] = n.charCodeAt(s);
          return (
            (t.applicationServerKey = r),
            this.pushManager
              .pipe(
                vh(e => e.subscribe(t)),
                Th(1)
              )
              .toPromise()
              .then(e => (this.subscriptionChanges.next(e), e))
          );
        }
        unsubscribe() {
          return this.sw.isEnabled
            ? this.subscription
                .pipe(
                  Th(1),
                  vh(e => {
                    if (null === e)
                      throw new Error("Not subscribed to push notifications.");
                    return e.unsubscribe().then(e => {
                      if (!e) throw new Error("Unsubscribe failed!");
                      this.subscriptionChanges.next(null);
                    });
                  })
                )
                .toPromise()
            : Promise.reject(new Error(Wy));
        }
        decodeBase64(e) {
          return atob(e);
        }
      }
      class Qy {
        constructor(e) {
          if (((this.sw = e), !e.isEnabled))
            return (this.available = gh), void (this.activated = gh);
          (this.available = this.sw.eventsOfType("UPDATE_AVAILABLE")),
            (this.activated = this.sw.eventsOfType("UPDATE_ACTIVATED"));
        }
        get isEnabled() {
          return this.sw.isEnabled;
        }
        checkForUpdate() {
          if (!this.sw.isEnabled) return Promise.reject(new Error(Wy));
          const e = this.sw.generateNonce();
          return this.sw.postMessageWithStatus(
            "CHECK_FOR_UPDATES",
            { statusNonce: e },
            e
          );
        }
        activateUpdate() {
          if (!this.sw.isEnabled) return Promise.reject(new Error(Wy));
          const e = this.sw.generateNonce();
          return this.sw.postMessageWithStatus(
            "ACTIVATE_UPDATE",
            { statusNonce: e },
            e
          );
        }
      }
      class Ky {}
      const Yy = new Te("NGSW_REGISTER_SCRIPT");
      function Jy(e, t, n, r) {
        return () => {
          if (!(dl(r) && "serviceWorker" in navigator && !1 !== n.enabled))
            return;
          let s;
          if (
            (navigator.serviceWorker.addEventListener(
              "controllerchange",
              () => {
                null !== navigator.serviceWorker.controller &&
                  navigator.serviceWorker.controller.postMessage({
                    action: "INITIALIZE"
                  });
              }
            ),
            "function" == typeof n.registrationStrategy)
          )
            s = n.registrationStrategy();
          else {
            const [t, ...r] = (
              n.registrationStrategy || "registerWhenStable"
            ).split(":");
            switch (t) {
              case "registerImmediately":
                s = aa(null);
                break;
              case "registerWithDelay":
                s = aa(null).pipe(
                  (function(e, t = fh) {
                    var n;
                    const r =
                      (n = e) instanceof Date && !isNaN(+n)
                        ? +e - t.now()
                        : Math.abs(e);
                    return e => e.lift(new Fh(r, t));
                  })(+r[0] || 0)
                );
                break;
              case "registerWhenStable":
                s = e.get(di).isStable.pipe(ua(e => e));
                break;
              default:
                throw new Error(
                  `Unknown ServiceWorker registration strategy: ${n.registrationStrategy}`
                );
            }
          }
          s.pipe(Th(1)).subscribe(() =>
            navigator.serviceWorker
              .register(t, { scope: n.scope })
              .catch(e =>
                console.error("Service worker registration failed with:", e)
              )
          );
        };
      }
      function Xy(e, t) {
        return new Gy(
          dl(t) && !1 !== e.enabled ? navigator.serviceWorker : void 0
        );
      }
      class eb {
        static register(e, t = {}) {
          return {
            ngModule: eb,
            providers: [
              { provide: Yy, useValue: e },
              { provide: Ky, useValue: t },
              { provide: Gy, useFactory: Xy, deps: [Ky, Ds] },
              { provide: Cs, useFactory: Jy, deps: [Tt, Yy, Ky, Ds], multi: !0 }
            ]
          };
        }
      }
      let tb = (() => {
        class e {
          constructor(e, t, n) {
            (this.swPush = e),
              (this.utils = t),
              (this.tambolaService = n),
              (this.storedSubscription = this.utils.getLocalStorage(
                $y.SubscriptionToken,
                !0
              ));
          }
          subscribeForPushNotification() {
            this.swPush.isEnabled && !this.storedSubscription
              ? this.swPush
                  .requestSubscription({
                    serverPublicKey:
                      "BFkYyCTu3nj8kfbwWAGt1KPwk5k5k4D-YcoPCYnr9tMuS2TpEDHe5A1YZUcwaHxwkrzYLXpChJNU6zTmq3tKDZU"
                  })
                  .then(e => {
                    e &&
                      (this.utils.setLocalStorage($y.SubscriptionToken, e, !0),
                      this.utils.setLocalStorage($y.UserSubscribed, "true", !1),
                      alert("Subscribed!!"));
                  })
                  .catch(e =>
                    console.error("Could not subscribe to notifications", e)
                  )
              : this.utils.removeLocalStorage($y.UserSubscribed);
          }
        }
        return (
          (e.ngInjectableDef = ge({
            factory: function() {
              return new e(Pe(Zy), Pe(By), Pe(qy));
            },
            token: e,
            providedIn: "root"
          })),
          e
        );
      })();
      var nb = zn({
        encapsulation: 0,
        styles: [
          [
            'html[_ngcontent-%COMP%]{background-color:#56baed}body[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;height:100vh}a[_ngcontent-%COMP%]{color:#92badd;display:inline-block;text-decoration:none;font-weight:400}h1[_ngcontent-%COMP%]{color:#56baed}h2[_ngcontent-%COMP%]{text-align:center;font-size:16px;font-weight:600;text-transform:uppercase;display:inline-block;margin:40px 8px 10px;color:#ccc}.wrapper[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;width:100%;min-height:100%;padding:20px}#formContent[_ngcontent-%COMP%]{border-radius:10px;background:#fff;padding:0;width:90%;max-width:450px;position:relative;box-shadow:0 30px 60px 0 rgba(0,0,0,.3);text-align:center}#formFooter[_ngcontent-%COMP%]{background-color:#f6f6f6;border-top:1px solid #dce8f1;padding:25px;text-align:center;border-radius:0 0 10px 10px}h2.inactive[_ngcontent-%COMP%]{color:#ccc}h2.active[_ngcontent-%COMP%]{color:#0d0d0d;border-bottom:2px solid #5fbae9}input[type=button][_ngcontent-%COMP%], input[type=reset][_ngcontent-%COMP%], input[type=submit][_ngcontent-%COMP%]{background-color:#56baed;border:none;color:#fff;padding:15px 80px;text-align:center;text-decoration:none;display:inline-block;text-transform:uppercase;font-size:13px;box-shadow:0 10px 30px 0 rgba(95,186,233,.4);border-radius:5px;margin:5px 20px 40px;-webkit-transition:.3s ease-in-out;transition:all .3s ease-in-out}input[type=button][_ngcontent-%COMP%]:hover, input[type=reset][_ngcontent-%COMP%]:hover, input[type=submit][_ngcontent-%COMP%]:hover{background-color:#39ace7}input[type=button][_ngcontent-%COMP%]:active, input[type=reset][_ngcontent-%COMP%]:active, input[type=submit][_ngcontent-%COMP%]:active{-webkit-transform:scale(.95);transform:scale(.95)}input[type=text][_ngcontent-%COMP%]{background-color:#f6f6f6;border:2px solid #f6f6f6;color:#0d0d0d;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:5px;width:82%;-webkit-transition:.5s ease-in-out;transition:all .5s ease-in-out;border-radius:5px}input[type=text][_ngcontent-%COMP%]:focus{background-color:#fff;border-bottom:2px solid #5fbae9}input[type=text][_ngcontent-%COMP%]:placeholder{color:#ccc}.fadeInDown[_ngcontent-%COMP%]{-webkit-animation-name:fadeInDown;animation-name:fadeInDown;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}100%{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}100%{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn[_ngcontent-%COMP%]{opacity:0;-webkit-animation:1s ease-in forwards fadeIn;animation:1s ease-in forwards fadeIn}.fadeIn.first[_ngcontent-%COMP%]{-webkit-animation-delay:.4s;animation-delay:.4s}.fadeIn.second[_ngcontent-%COMP%]{-webkit-animation-delay:.6s;animation-delay:.6s}.fadeIn.third[_ngcontent-%COMP%]{-webkit-animation-delay:.8s;animation-delay:.8s}.fadeIn.fourth[_ngcontent-%COMP%]{-webkit-animation-delay:1s;animation-delay:1s}.underlineHover[_ngcontent-%COMP%]:after{display:block;left:0;bottom:-10px;width:0;height:2px;background-color:#56baed;content:"";-webkit-transition:width .2s;transition:width .2s}.underlineHover[_ngcontent-%COMP%]:hover:after{width:100%}span.error[_ngcontent-%COMP%]{color:red}[_ngcontent-%COMP%]:focus{outline:0}#icon[_ngcontent-%COMP%]{width:60%}'
          ]
        ],
        data: {}
      });
      function rb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "span",
              [["class", "error"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Error!!"]))
          ],
          null,
          null
        );
      }
      function sb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              21,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "ngSubmit"],
                [null, "submit"],
                [null, "reset"]
              ],
              function(e, t, n) {
                var r = !0,
                  s = e.component;
                return (
                  "submit" === t && (r = !1 !== Ur(e, 2).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Ur(e, 2).onReset() && r),
                  "ngSubmit" === t && (r = !1 !== s.login(Ur(e, 2)) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(1, 16384, null, 0, nh, [], null, null),
            Yr(
              2,
              4210688,
              [["f", 4]],
              0,
              Qc,
              [
                [8, null],
                [8, null]
              ],
              null,
              { ngSubmit: "ngSubmit" }
            ),
            Jr(2048, null, dc, null, [Qc]),
            Yr(4, 16384, null, 0, yc, [[4, dc]], null, null),
            (e()(),
            Ri(
              5,
              0,
              null,
              null,
              7,
              "input",
              [
                ["class", "fadeIn second"],
                ["id", "login"],
                ["name", "email"],
                ["ngModel", ""],
                ["placeholder", "email"],
                ["required", ""],
                ["type", "text"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Ur(e, 6)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Ur(e, 6).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Ur(e, 6)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Ur(e, 6)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(6, 16384, null, 0, cc, [on, en, [2, uc]], null, null),
            Yr(7, 16384, null, 0, rh, [], { required: [0, "required"] }, null),
            Jr(
              1024,
              null,
              vc,
              function(e) {
                return [e];
              },
              [rh]
            ),
            Jr(
              1024,
              null,
              lc,
              function(e) {
                return [e];
              },
              [cc]
            ),
            Yr(
              10,
              671744,
              null,
              0,
              th,
              [
                [2, dc],
                [6, vc],
                [8, null],
                [6, lc]
              ],
              { name: [0, "name"], model: [1, "model"] },
              null
            ),
            Jr(2048, null, fc, null, [th]),
            Yr(12, 16384, null, 0, mc, [[4, fc]], null, null),
            (e()(),
            Ri(
              13,
              0,
              null,
              null,
              7,
              "input",
              [
                ["class", "fadeIn third"],
                ["id", "password"],
                ["name", "password"],
                ["ngModel", ""],
                ["placeholder", "password"],
                ["required", ""],
                ["type", "text"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Ur(e, 14)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Ur(e, 14).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Ur(e, 14)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Ur(e, 14)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(14, 16384, null, 0, cc, [on, en, [2, uc]], null, null),
            Yr(15, 16384, null, 0, rh, [], { required: [0, "required"] }, null),
            Jr(
              1024,
              null,
              vc,
              function(e) {
                return [e];
              },
              [rh]
            ),
            Jr(
              1024,
              null,
              lc,
              function(e) {
                return [e];
              },
              [cc]
            ),
            Yr(
              18,
              671744,
              null,
              0,
              th,
              [
                [2, dc],
                [6, vc],
                [8, null],
                [6, lc]
              ],
              { name: [0, "name"], model: [1, "model"] },
              null
            ),
            Jr(2048, null, fc, null, [th]),
            Yr(20, 16384, null, 0, mc, [[4, fc]], null, null),
            (e()(),
            Ri(
              21,
              0,
              null,
              null,
              0,
              "input",
              [
                ["class", "fadeIn fourth"],
                ["type", "submit"],
                ["value", "Log In"]
              ],
              null,
              null,
              null,
              null,
              null
            ))
          ],
          function(e, t) {
            e(t, 7, 0, ""),
              e(t, 10, 0, "email", ""),
              e(t, 15, 0, ""),
              e(t, 18, 0, "password", "");
          },
          function(e, t) {
            e(
              t,
              0,
              0,
              Ur(t, 4).ngClassUntouched,
              Ur(t, 4).ngClassTouched,
              Ur(t, 4).ngClassPristine,
              Ur(t, 4).ngClassDirty,
              Ur(t, 4).ngClassValid,
              Ur(t, 4).ngClassInvalid,
              Ur(t, 4).ngClassPending
            ),
              e(
                t,
                5,
                0,
                Ur(t, 7).required ? "" : null,
                Ur(t, 12).ngClassUntouched,
                Ur(t, 12).ngClassTouched,
                Ur(t, 12).ngClassPristine,
                Ur(t, 12).ngClassDirty,
                Ur(t, 12).ngClassValid,
                Ur(t, 12).ngClassInvalid,
                Ur(t, 12).ngClassPending
              ),
              e(
                t,
                13,
                0,
                Ur(t, 15).required ? "" : null,
                Ur(t, 20).ngClassUntouched,
                Ur(t, 20).ngClassTouched,
                Ur(t, 20).ngClassPristine,
                Ur(t, 20).ngClassDirty,
                Ur(t, 20).ngClassValid,
                Ur(t, 20).ngClassInvalid,
                Ur(t, 20).ngClassPending
              );
          }
        );
      }
      function ib(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              37,
              "form",
              [["novalidate", ""]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "ngSubmit"],
                [null, "submit"],
                [null, "reset"]
              ],
              function(e, t, n) {
                var r = !0,
                  s = e.component;
                return (
                  "submit" === t && (r = !1 !== Ur(e, 2).onSubmit(n) && r),
                  "reset" === t && (r = !1 !== Ur(e, 2).onReset() && r),
                  "ngSubmit" === t && (r = !1 !== s.register(Ur(e, 2)) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(1, 16384, null, 0, nh, [], null, null),
            Yr(
              2,
              4210688,
              [["f", 4]],
              0,
              Qc,
              [
                [8, null],
                [8, null]
              ],
              null,
              { ngSubmit: "ngSubmit" }
            ),
            Jr(2048, null, dc, null, [Qc]),
            Yr(4, 16384, null, 0, yc, [[4, dc]], null, null),
            (e()(),
            Ri(
              5,
              0,
              null,
              null,
              7,
              "input",
              [
                ["class", "fadeIn first"],
                ["id", "fname"],
                ["name", "fname"],
                ["ngModel", ""],
                ["placeholder", "First name"],
                ["required", ""],
                ["type", "text"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Ur(e, 6)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Ur(e, 6).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Ur(e, 6)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Ur(e, 6)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(6, 16384, null, 0, cc, [on, en, [2, uc]], null, null),
            Yr(7, 16384, null, 0, rh, [], { required: [0, "required"] }, null),
            Jr(
              1024,
              null,
              vc,
              function(e) {
                return [e];
              },
              [rh]
            ),
            Jr(
              1024,
              null,
              lc,
              function(e) {
                return [e];
              },
              [cc]
            ),
            Yr(
              10,
              671744,
              null,
              0,
              th,
              [
                [2, dc],
                [6, vc],
                [8, null],
                [6, lc]
              ],
              { name: [0, "name"], model: [1, "model"] },
              null
            ),
            Jr(2048, null, fc, null, [th]),
            Yr(12, 16384, null, 0, mc, [[4, fc]], null, null),
            (e()(),
            Ri(
              13,
              0,
              null,
              null,
              7,
              "input",
              [
                ["class", "fadeIn second"],
                ["id", "lname"],
                ["name", "lname"],
                ["ngModel", ""],
                ["placeholder", "Last name"],
                ["required", ""],
                ["type", "text"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Ur(e, 14)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Ur(e, 14).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Ur(e, 14)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Ur(e, 14)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(14, 16384, null, 0, cc, [on, en, [2, uc]], null, null),
            Yr(15, 16384, null, 0, rh, [], { required: [0, "required"] }, null),
            Jr(
              1024,
              null,
              vc,
              function(e) {
                return [e];
              },
              [rh]
            ),
            Jr(
              1024,
              null,
              lc,
              function(e) {
                return [e];
              },
              [cc]
            ),
            Yr(
              18,
              671744,
              null,
              0,
              th,
              [
                [2, dc],
                [6, vc],
                [8, null],
                [6, lc]
              ],
              { name: [0, "name"], model: [1, "model"] },
              null
            ),
            Jr(2048, null, fc, null, [th]),
            Yr(20, 16384, null, 0, mc, [[4, fc]], null, null),
            (e()(),
            Ri(
              21,
              0,
              null,
              null,
              7,
              "input",
              [
                ["class", "fadeIn third"],
                ["id", "login"],
                ["name", "email"],
                ["ngModel", ""],
                ["placeholder", "login"],
                ["required", ""],
                ["type", "text"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Ur(e, 22)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Ur(e, 22).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Ur(e, 22)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Ur(e, 22)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(22, 16384, null, 0, cc, [on, en, [2, uc]], null, null),
            Yr(23, 16384, null, 0, rh, [], { required: [0, "required"] }, null),
            Jr(
              1024,
              null,
              vc,
              function(e) {
                return [e];
              },
              [rh]
            ),
            Jr(
              1024,
              null,
              lc,
              function(e) {
                return [e];
              },
              [cc]
            ),
            Yr(
              26,
              671744,
              null,
              0,
              th,
              [
                [2, dc],
                [6, vc],
                [8, null],
                [6, lc]
              ],
              { name: [0, "name"], model: [1, "model"] },
              null
            ),
            Jr(2048, null, fc, null, [th]),
            Yr(28, 16384, null, 0, mc, [[4, fc]], null, null),
            (e()(),
            Ri(
              29,
              0,
              null,
              null,
              7,
              "input",
              [
                ["class", "fadeIn fourth"],
                ["id", "password"],
                ["name", "password"],
                ["ngModel", ""],
                ["placeholder", "password"],
                ["required", ""],
                ["type", "text"]
              ],
              [
                [1, "required", 0],
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null]
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"]
              ],
              function(e, t, n) {
                var r = !0;
                return (
                  "input" === t &&
                    (r = !1 !== Ur(e, 30)._handleInput(n.target.value) && r),
                  "blur" === t && (r = !1 !== Ur(e, 30).onTouched() && r),
                  "compositionstart" === t &&
                    (r = !1 !== Ur(e, 30)._compositionStart() && r),
                  "compositionend" === t &&
                    (r = !1 !== Ur(e, 30)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            Yr(30, 16384, null, 0, cc, [on, en, [2, uc]], null, null),
            Yr(31, 16384, null, 0, rh, [], { required: [0, "required"] }, null),
            Jr(
              1024,
              null,
              vc,
              function(e) {
                return [e];
              },
              [rh]
            ),
            Jr(
              1024,
              null,
              lc,
              function(e) {
                return [e];
              },
              [cc]
            ),
            Yr(
              34,
              671744,
              null,
              0,
              th,
              [
                [2, dc],
                [6, vc],
                [8, null],
                [6, lc]
              ],
              { name: [0, "name"], model: [1, "model"] },
              null
            ),
            Jr(2048, null, fc, null, [th]),
            Yr(36, 16384, null, 0, mc, [[4, fc]], null, null),
            (e()(),
            Ri(
              37,
              0,
              null,
              null,
              0,
              "input",
              [
                ["class", "fadeIn fourth"],
                ["type", "submit"],
                ["value", "Register"]
              ],
              null,
              null,
              null,
              null,
              null
            ))
          ],
          function(e, t) {
            e(t, 7, 0, ""),
              e(t, 10, 0, "fname", ""),
              e(t, 15, 0, ""),
              e(t, 18, 0, "lname", ""),
              e(t, 23, 0, ""),
              e(t, 26, 0, "email", ""),
              e(t, 31, 0, ""),
              e(t, 34, 0, "password", "");
          },
          function(e, t) {
            e(
              t,
              0,
              0,
              Ur(t, 4).ngClassUntouched,
              Ur(t, 4).ngClassTouched,
              Ur(t, 4).ngClassPristine,
              Ur(t, 4).ngClassDirty,
              Ur(t, 4).ngClassValid,
              Ur(t, 4).ngClassInvalid,
              Ur(t, 4).ngClassPending
            ),
              e(
                t,
                5,
                0,
                Ur(t, 7).required ? "" : null,
                Ur(t, 12).ngClassUntouched,
                Ur(t, 12).ngClassTouched,
                Ur(t, 12).ngClassPristine,
                Ur(t, 12).ngClassDirty,
                Ur(t, 12).ngClassValid,
                Ur(t, 12).ngClassInvalid,
                Ur(t, 12).ngClassPending
              ),
              e(
                t,
                13,
                0,
                Ur(t, 15).required ? "" : null,
                Ur(t, 20).ngClassUntouched,
                Ur(t, 20).ngClassTouched,
                Ur(t, 20).ngClassPristine,
                Ur(t, 20).ngClassDirty,
                Ur(t, 20).ngClassValid,
                Ur(t, 20).ngClassInvalid,
                Ur(t, 20).ngClassPending
              ),
              e(
                t,
                21,
                0,
                Ur(t, 23).required ? "" : null,
                Ur(t, 28).ngClassUntouched,
                Ur(t, 28).ngClassTouched,
                Ur(t, 28).ngClassPristine,
                Ur(t, 28).ngClassDirty,
                Ur(t, 28).ngClassValid,
                Ur(t, 28).ngClassInvalid,
                Ur(t, 28).ngClassPending
              ),
              e(
                t,
                29,
                0,
                Ur(t, 31).required ? "" : null,
                Ur(t, 36).ngClassUntouched,
                Ur(t, 36).ngClassTouched,
                Ur(t, 36).ngClassPristine,
                Ur(t, 36).ngClassDirty,
                Ur(t, 36).ngClassValid,
                Ur(t, 36).ngClassInvalid,
                Ur(t, 36).ngClassPending
              );
          }
        );
      }
      function ob(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              2,
              "div",
              [["id", "formFooter"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              1,
              0,
              null,
              null,
              1,
              "a",
              [
                ["class", "underlineHover"],
                ["href", "javascript:void(0)"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.goToRegister() && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Register"]))
          ],
          null,
          null
        );
      }
      function ab(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              12,
              "div",
              [["class", "wrapper fadeInDown"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              1,
              0,
              null,
              null,
              11,
              "div",
              [["id", "formContent"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              2,
              0,
              null,
              null,
              4,
              "div",
              [["class", "fadeIn first"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(3, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (e()(), Wi(-1, null, ["Tambola Login"])),
            (e()(), Oi(16777216, null, null, 1, null, rb)),
            Yr(6, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(16777216, null, null, 1, null, sb)),
            Yr(8, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(16777216, null, null, 1, null, ib)),
            Yr(10, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null),
            (e()(), Oi(16777216, null, null, 1, null, ob)),
            Yr(12, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = t.component;
            e(t, 6, 0, n.isError),
              e(t, 8, 0, !n.isRegister),
              e(t, 10, 0, n.isRegister),
              e(t, 12, 0, !n.isRegister);
          },
          null
        );
      }
      function lb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 1, "app-login", [], null, null, null, ab, nb)),
            Yr(1, 114688, null, 0, Ny, [qy, tb, ry], null, null)
          ],
          function(e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var ub = Tr("app-login", Ny, lb, {}, {}, []);
      class cb {
        constructor(e) {
          (this.tambolaService = e),
            (this.ticketsData = [new Py()]),
            (this.rowColumn = new Map([
              ["1-1", 1],
              ["1-2", 2],
              ["1-3", 3],
              ["1-4", 4],
              ["1-5", 5],
              ["1-6", 6],
              ["1-7", 7],
              ["1-8", 8],
              ["1-9", 9],
              ["2-1", 10],
              ["2-2", 11],
              ["2-3", 12],
              ["2-4", 13],
              ["2-5", 14],
              ["2-6", 15],
              ["2-7", 16],
              ["2-8", 17],
              ["2-9", 18],
              ["3-1", 19],
              ["3-2", 20],
              ["3-3", 21],
              ["3-4", 22],
              ["3-5", 23],
              ["3-6", 24],
              ["3-7", 25],
              ["3-8", 26],
              ["3-9", 27]
            ]));
        }
        ngOnInit() {
          const e = localStorage.getItem("TambolaTicket");
          (this.ticketsData = this.getEmptyTicket()),
            e && this.mapTickets(JSON.parse(e)),
            (this.ticketUpdate = this.tambolaService.ticketUpdate.subscribe(
              e => {
                (this.ticketsData = this.getEmptyTicket()),
                  this.mapTickets(e),
                  localStorage.setItem("TambolaTicket", JSON.stringify(e));
              }
            ));
        }
        getEmptyTicket() {
          let e = 1;
          const t = [new Py()];
          for (; e < 27; ) (t[e] = new Py()), e++;
          return t;
        }
        mapTickets(e) {
          e && e.length > 0
            ? e.map(e => {
                const t = this.rowColumn.get(e.row + "-" + e.column);
                this.ticketsData[t - 1] = e;
              })
            : (this.ticketsData = this.getEmptyTicket());
        }
        crossNumber(e) {
          const t = this.ticketsData.indexOf(e);
          this.ticketsData[t].value &&
            (this.ticketsData[t].isChecked = !this.ticketsData[t].isChecked);
        }
      }
      var hb = zn({
        encapsulation: 0,
        styles: [
          [
            '#grid-container[_ngcontent-%COMP%]{margin-top:20px;max-width:90%;width:100%;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.num[_ngcontent-%COMP%]{width:10%;margin:2px;border:1px solid #ccc;display:inline-block;font-size:24px;box-sizing:border-box;height:79px;line-height:79px;background-color:#ffffe0;color:#000;vertical-align:middle;cursor:pointer;position:relative}.generated[_ngcontent-%COMP%]{border-color:#00f;color:#00f;background-color:#e6e6fa}h2[_ngcontent-%COMP%]{text-align:center}.checked[_ngcontent-%COMP%]:after{position:absolute;top:0;bottom:0;left:0;right:0;content:"\\274c";font-size:50px;color:#fff;line-height:100px;text-align:center}'
          ]
        ],
        data: {}
      });
      function db(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 1, "span", [], null, null, null, null, null)),
            (e()(), Wi(1, null, ["", ""]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.parent.context.$implicit.value);
          }
        );
      }
      function pb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              5,
              "div",
              [["class", "num"]],
              null,
              [[null, "dblclick"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "dblclick" === t &&
                    (r =
                      !1 !== e.component.crossNumber(e.context.$implicit) && r),
                  r
                );
              },
              null,
              null
            )),
            Jr(512, null, Xa, el, [_n, wn, en, on]),
            Yr(
              2,
              278528,
              null,
              0,
              nl,
              [Xa],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            Bi(3, { checked: 0 }),
            (e()(), Oi(16777216, null, null, 1, null, db)),
            Yr(5, 16384, null, 0, ol, [Tn, En], { ngIf: [0, "ngIf"] }, null)
          ],
          function(e, t) {
            var n = e(t, 3, 0, t.context.$implicit.isChecked);
            e(t, 2, 0, "num", n), e(t, 5, 0, t.context.$implicit.value);
          },
          null
        );
      }
      function fb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 1, "h2", [], null, null, null, null, null)),
            (e()(), Wi(-1, null, ["My Ticket"])),
            (e()(),
            Ri(
              2,
              0,
              null,
              null,
              2,
              "div",
              [["id", "grid-container"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, pb)),
            Yr(
              4,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 4, 0, t.component.ticketsData);
          },
          null
        );
      }
      class gb {
        constructor(e) {
          this.tambolaService = e;
        }
        claimPrize(e) {
          this.tambolaService.claimPrize({ claimType: e });
        }
      }
      var mb = zn({
        encapsulation: 0,
        styles: [
          [
            "button[_ngcontent-%COMP%]{background-color:#fff;color:#2475ac;font-weight:700;-webkit-appearance:button;cursor:pointer;text-align:center;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:70%;margin:10px;display:block}div[_ngcontent-%COMP%]{width:50%;margin:auto}"
          ]
        ],
        data: {}
      });
      function yb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 8, "div", [], null, null, null, null, null)),
            (e()(),
            Ri(
              1,
              0,
              null,
              null,
              1,
              "button",
              [],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.claimPrize("frow") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Claim First Row"])),
            (e()(),
            Ri(
              3,
              0,
              null,
              null,
              1,
              "button",
              [],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.claimPrize("srow") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Claim Second Row"])),
            (e()(),
            Ri(
              5,
              0,
              null,
              null,
              1,
              "button",
              [],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.claimPrize("lrow") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Claim Third Row"])),
            (e()(),
            Ri(
              7,
              0,
              null,
              null,
              1,
              "button",
              [],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.claimPrize("house") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Claim Full House"]))
          ],
          null,
          null
        );
      }
      class bb {
        constructor(e) {
          this.tambolaService = e;
        }
        ngOnInit() {
          this.timer = setInterval(() => {
            this.tambolaService.ticketCreated &&
              this.tambolaService.getGameStats().subscribe(e => {
                e.response && (this.adminNumbers = e.response.calledOutNumbers);
              });
          }, 5e3);
        }
        ngOnDestroy() {
          this.timer && clearInterval(this.timer);
        }
      }
      var vb = zn({
        encapsulation: 0,
        styles: [
          [
            "div.container[_ngcontent-%COMP%]{border:2px solid #d3d3d3;height:140px;margin-top:30px;width:90%;padding:0}div.scroll[_ngcontent-%COMP%]{overflow-x:auto;white-space:nowrap;padding-bottom:10px}.num[_ngcontent-%COMP%]{width:9%;margin:2px 10px;border:1px solid #ccc;display:inline-block;font-size:24px;box-sizing:border-box;border-radius:100px;text-align:center;padding:10px 0;background:green;color:#fff}h3[_ngcontent-%COMP%]{margin:10px}"
          ]
        ],
        data: {}
      });
      function _b(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "num"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(1, null, [" ", " "]))
          ],
          null,
          function(e, t) {
            e(t, 1, 0, t.context.$implicit);
          }
        );
      }
      function wb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              5,
              "div",
              [["class", "container"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(1, 0, null, null, 1, "h3", [], null, null, null, null, null)),
            (e()(), Wi(-1, null, ["Called Out Numbers"])),
            (e()(),
            Ri(
              3,
              0,
              null,
              null,
              2,
              "div",
              [["class", "scroll"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, _b)),
            Yr(
              5,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            )
          ],
          function(e, t) {
            e(t, 5, 0, t.component.adminNumbers);
          },
          null
        );
      }
      class Cb {
        constructor(e, t) {
          (this.tambolaService = e),
            (this.modalService = t),
            (this.selectedNumbers = []),
            (this.isDashboardAvtive = !1);
        }
        ngOnInit() {
          this.numbers = this.generateNumbers(1);
        }
        generateNumbers(e) {
          const t = [];
          for (; e < 91; ) {
            const n = new xb();
            (n.value = e), t.push(n), e++;
          }
          return t;
        }
        generateRandomTicket() {
          (this.isDashboardAvtive = !1),
            this.tambolaService.generateRandomTicket();
        }
        createTicket() {
          this.openCreateModal(),
            (this.isDashboardAvtive = !0),
            this.tambolaService.ticketUpdate.next();
        }
        sendTicket() {
          const e = { ticket: localStorage.getItem("TambolaTicket") };
          this.tambolaService.createTicket(e);
        }
        selectNumber(e) {
          if (this.isDashboardAvtive) {
            if (e.isSelected) {
              const t = this.selectedNumbers.indexOf(e.value);
              return (
                t > -1 && this.selectedNumbers.splice(t, 1),
                void (e.isSelected = !e.isSelected)
              );
            }
            this.selectedNumbers.length < 15
              ? ((e.isSelected = !e.isSelected),
                this.selectedNumbers.includes(e.value) ||
                  this.selectedNumbers.push(e.value),
                15 === this.selectedNumbers.length &&
                  ((this.isDashboardAvtive = !1),
                  this.tambolaService.createTicketData(this.selectedNumbers)))
              : alert("15 Numbers already selcted!!");
          }
        }
        openCreateModal() {
          const e = this.modalService.open(Hy);
          (e.componentInstance.my_modal_title = "Create Your Own Ticket"),
            (e.componentInstance.my_modal_content =
              "1. Select 15 numbers of your choice from dashboard."),
            (e.componentInstance.my_modal_content2 =
              "2. Recommended to select maximum of 2 numbers from each row."),
            (e.componentInstance.my_modal_content3 =
              "3. Once 15 numbers are selected your ticket will be created.");
        }
      }
      class xb {
        constructor() {
          (this.isSelected = !1), (this.value = 1);
        }
      }
      var Sb = zn({
        encapsulation: 0,
        styles: [
          [
            "#grid-container[_ngcontent-%COMP%]{margin-top:20px;max-width:700px;width:100%;text-align:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.num[_ngcontent-%COMP%]{width:9%;margin:2px;border:1px solid #ccc;display:inline-block;color:#ccc;font-size:24px;box-sizing:border-box;height:50px;line-height:50px}.num.active[_ngcontent-%COMP%]{color:#fff;background-color:#007bff;cursor:pointer}.generated[_ngcontent-%COMP%]{border-color:#00f;color:#00f;background-color:#e6e6fa}button[_ngcontent-%COMP%]{background-color:#fff;color:#2475ac;font-weight:700;-webkit-appearance:button;cursor:pointer;text-align:center;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:45%;margin:10px;display:inline- block}.tickets[_ngcontent-%COMP%]{margin:30px}"
          ]
        ],
        data: {}
      });
      function Eb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              4,
              "div",
              [["class", "num"]],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !== e.component.selectNumber(e.context.$implicit) &&
                      r),
                  r
                );
              },
              null,
              null
            )),
            Jr(512, null, Xa, el, [_n, wn, en, on]),
            Yr(
              2,
              278528,
              null,
              0,
              nl,
              [Xa],
              { klass: [0, "klass"], ngClass: [1, "ngClass"] },
              null
            ),
            qi(32, 3, new Array(1)),
            (e()(), Wi(4, null, ["", ""]))
          ],
          function(e, t) {
            var n = e(
              t,
              3,
              0,
              t.component.isDashboardAvtive && !t.context.$implicit.isSelected
                ? "active"
                : ""
            );
            e(t, 2, 0, "num", n);
          },
          function(e, t) {
            e(t, 4, 0, t.context.$implicit.value);
          }
        );
      }
      function kb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              2,
              "div",
              [["id", "grid-container"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Oi(16777216, null, null, 1, null, Eb)),
            Yr(
              2,
              278528,
              null,
              0,
              sl,
              [Tn, En, _n],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(),
            Ri(
              3,
              0,
              null,
              null,
              6,
              "div",
              [["class", "tickets"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              4,
              0,
              null,
              null,
              1,
              "button",
              [["type", "button"]],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.generateRandomTicket() && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Generate Random Ticket"])),
            (e()(),
            Ri(
              6,
              0,
              null,
              null,
              1,
              "button",
              [["type", "button"]],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.createTicket() && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Create Your own Ticket"])),
            (e()(),
            Ri(
              8,
              0,
              null,
              null,
              1,
              "button",
              [["type", "button"]],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.sendTicket() && r), r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Send Ticket"]))
          ],
          function(e, t) {
            e(t, 2, 0, t.component.numbers);
          },
          null
        );
      }
      class Tb {
        constructor(e, t) {
          (this.modalService = e), (this.router = t), (this.title = "Tambola");
        }
        ngOnInit() {
          localStorage.getItem("Tambola_AccessToken")
            ? this.open()
            : this.router.navigate(["login"]);
        }
        open() {
          const e = this.modalService.open(Hy);
          (e.componentInstance.my_modal_title = "Tambola Rules"),
            (e.componentInstance.my_modal_content =
              "1. To Play Tambola, start by creating a ticket and sending it to admin."),
            (e.componentInstance.my_modal_content2 =
              "2. Tickets can be created in two ways, Generate Random Ticket or Creating Ticket from Dashboard"),
            (e.componentInstance.my_modal_content3 =
              "3. Click Claim butons to claim the respective prizes");
        }
        ngOnDestroy() {
          localStorage.removeItem("Tambola_AccessToken"),
            localStorage.removeItem("TambolaTicket");
        }
      }
      var Db = zn({
        encapsulation: 0,
        styles: [
          [
            ".rootContainer[_ngcontent-%COMP%]{font-family:'Josefin Sans',Arial,sans-serif;background-color:#2475ac;padding-top:40px;color:#fff}.left[_ngcontent-%COMP%], .right[_ngcontent-%COMP%]{width:50%;vertical-align:top;display:inline-block}.left[_ngcontent-%COMP%]{margin-right:auto}.right[_ngcontent-%COMP%]{margin-left:auto}h1[_ngcontent-%COMP%]{text-align:center}"
          ]
        ],
        data: {}
      });
      function Ab(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              12,
              "div",
              [["class", "rootContainer"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(1, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (e()(), Wi(2, null, ["", ""])),
            (e()(),
            Ri(
              3,
              0,
              null,
              null,
              6,
              "div",
              [["class", "left"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              4,
              0,
              null,
              null,
              1,
              "app-ticket",
              [],
              null,
              null,
              null,
              fb,
              hb
            )),
            Yr(5, 114688, null, 0, cb, [qy], null, null),
            (e()(),
            Ri(6, 0, null, null, 1, "app-claim", [], null, null, null, yb, mb)),
            Yr(7, 49152, null, 0, gb, [qy], null, null),
            (e()(),
            Ri(
              8,
              0,
              null,
              null,
              1,
              "app-admin-numbers",
              [],
              null,
              null,
              null,
              wb,
              vb
            )),
            Yr(9, 245760, null, 0, bb, [qy], null, null),
            (e()(),
            Ri(
              10,
              0,
              null,
              null,
              2,
              "div",
              [["class", "right"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              11,
              0,
              null,
              null,
              1,
              "app-numbers",
              [],
              null,
              null,
              null,
              kb,
              Sb
            )),
            Yr(12, 114688, null, 0, Cb, [qy, Fd], null, null)
          ],
          function(e, t) {
            e(t, 5, 0), e(t, 9, 0), e(t, 12, 0);
          },
          function(e, t) {
            e(t, 2, 0, t.component.title);
          }
        );
      }
      function Ib(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 1, "app-home", [], null, null, null, Ab, Db)),
            Yr(1, 245760, null, 0, Tb, [Fd, ry], null, null)
          ],
          function(e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var Ob = Tr("app-home", Tb, Ib, {}, {}, []),
        Rb = zn({
          encapsulation: 0,
          styles: [
            [
              ".modal-header[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%]{color:#56baed;text-align:center}.modal-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#56baed;color:#fff;text-align:center;border:none;max-width:150px;margin:auto}"
            ]
          ],
          data: {}
        });
      function Nb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(
              0,
              0,
              null,
              null,
              5,
              "div",
              [["class", "modal-header"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              1,
              0,
              null,
              null,
              1,
              "h4",
              [["class", "modal-title"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(2, null, ["", ""])),
            (e()(),
            Ri(
              3,
              0,
              null,
              null,
              2,
              "button",
              [
                ["aria-label", "Close"],
                ["class", "close"],
                ["type", "button"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !== e.component.activeModal.dismiss("Cross click") &&
                      r),
                  r
                );
              },
              null,
              null
            )),
            (e()(),
            Ri(
              4,
              0,
              null,
              null,
              1,
              "span",
              [["aria-hidden", "true"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), Wi(-1, null, ["\xd7"])),
            (e()(),
            Ri(
              6,
              0,
              null,
              null,
              6,
              "div",
              [["class", "modal-body"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(7, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), Wi(8, null, [" ", ""])),
            (e()(),
            Ri(9, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), Wi(10, null, [" ", ""])),
            (e()(),
            Ri(11, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (e()(), Wi(12, null, [" ", ""])),
            (e()(),
            Ri(
              13,
              0,
              null,
              null,
              2,
              "div",
              [["class", "modal-footer"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(),
            Ri(
              14,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "btn btn-outline-dark"],
                ["type", "button"]
              ],
              null,
              [[null, "click"]],
              function(e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !== e.component.activeModal.close("Close click") && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), Wi(-1, null, ["Close"]))
          ],
          null,
          function(e, t) {
            var n = t.component;
            e(t, 2, 0, n.my_modal_title),
              e(t, 8, 0, n.my_modal_content),
              e(t, 10, 0, n.my_modal_content2),
              e(t, 12, 0, n.my_modal_content3);
          }
        );
      }
      function Pb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 1, "app-modal", [], null, null, null, Nb, Rb)),
            Yr(1, 49152, null, 0, Hy, [Pd], null, null)
          ],
          null,
          null
        );
      }
      var Mb = Tr(
          "app-modal",
          Hy,
          Pb,
          {
            my_modal_title: "my_modal_title",
            my_modal_content: "my_modal_content",
            my_modal_content2: "my_modal_content2",
            my_modal_content3: "my_modal_content3"
          },
          {},
          []
        ),
        Vb = zn({
          encapsulation: 0,
          styles: [
            [
              ".rootContainer[_ngcontent-%COMP%]{font-family:'Josefin Sans',Arial,sans-serif;background-color:#2475ac;padding-top:40px;color:#fff}.left[_ngcontent-%COMP%], .right[_ngcontent-%COMP%]{width:50%;vertical-align:top;display:inline-block}.left[_ngcontent-%COMP%]{margin-right:auto}.right[_ngcontent-%COMP%]{margin-left:auto}h1[_ngcontent-%COMP%]{text-align:center}"
            ]
          ],
          data: {}
        });
      function jb(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 2, "div", [], null, null, null, null, null)),
            (e()(),
            Ri(
              1,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            Yr(2, 212992, null, 0, oy, [iy, Tn, Kt, [8, null], xt], null, null)
          ],
          function(e, t) {
            e(t, 2, 0);
          },
          null
        );
      }
      function Ub(e) {
        return Qi(
          0,
          [
            (e()(),
            Ri(0, 0, null, null, 1, "app-root", [], null, null, null, jb, Vb)),
            Yr(1, 114688, null, 0, tu, [Ql, ry, Zy, tb], null, null)
          ],
          function(e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var Fb = Tr("app-root", tu, Ub, {}, {}, []);
      class Lb {
        intercept(e, t) {
          const n = localStorage.getItem("Tambola_AccessToken");
          return n
            ? ((e = e.clone({ headers: e.headers.set("Authorization", n) })),
              t.handle(e))
            : t.handle(e);
        }
      }
      class $b {}
      var Hb = ta(ra, [tu], function(e) {
        return (function(e) {
          const t = {},
            n = [];
          let r = !1;
          for (let s = 0; s < e.length; s++) {
            const i = e[s];
            i.token === Et && !0 === i.value && (r = !0),
              1073741824 & i.flags && n.push(i.token),
              (i.index = s),
              (t[Hn(i.token)] = i);
          }
          return {
            factory: null,
            providersByKey: t,
            providers: e,
            modules: n,
            isRoot: r
          };
        })([
          _r(512, Kt, Yt, [
            [8, [op, Fp, pf, yf, Wp, Kp, rf, Oy, ub, Ob, Mb, Fb]],
            [3, Kt],
            je
          ]),
          _r(5120, Os, Di, [[3, Os]]),
          _r(4608, Ka, Ya, [Os, [2, Qa]]),
          _r(5120, ps, Ai, [Zs]),
          _r(5120, Ss, Es, []),
          _r(5120, _n, ki, []),
          _r(5120, wn, Ti, []),
          _r(4608, Ku, Yu, [hl]),
          _r(6144, bt, null, [Ku]),
          _r(4608, zu, qu, []),
          _r(
            5120,
            bu,
            function(e, t, n, r, s, i, o, a) {
              return [new $u(e, t, n), new Qu(r), new Wu(s, i, o, a)];
            },
            [hl, Zs, Ds, hl, hl, zu, Is, [2, Bu]]
          ),
          _r(4608, vu, vu, [bu, Zs]),
          _r(135680, Cu, Cu, [hl]),
          _r(4608, Tu, Tu, [vu, Cu, Ss]),
          _r(6144, rn, null, [Tu]),
          _r(6144, wu, null, [Cu]),
          _r(4608, ti, ti, [Zs]),
          _r(4608, $l, Hl, [hl, Ds, Fl]),
          _r(4608, zl, zl, [$l, Ll]),
          _r(
            5120,
            Nl,
            function(e) {
              return [e, new Lb()];
            },
            [zl]
          ),
          _r(4608, jl, jl, []),
          _r(6144, Vl, null, [jl]),
          _r(4608, Ul, Ul, [Vl]),
          _r(6144, ml, null, [Ul]),
          _r(4608, gl, Bl, [ml, Tt]),
          _r(4608, Ol, Ol, [gl]),
          _r(4608, Tc, Tc, []),
          _r(4608, Fd, Fd, [Kt, Tt, Ud, Ad]),
          _r(5120, Gg, xy, [ry]),
          _r(4608, uy, uy, []),
          _r(6144, ly, null, [uy]),
          _r(135680, hy, hy, [ry, fi, js, Tt, ly]),
          _r(4608, cy, cy, []),
          _r(5120, dy, by, [ry, pl, py]),
          _r(5120, Ty, ky, [Sy]),
          _r(
            5120,
            As,
            function(e) {
              return [e];
            },
            [Ty]
          ),
          _r(4608, Ql, Ql, []),
          _r(4608, Zl, Zl, []),
          _r(5120, Gy, Xy, [Ky, Ds]),
          _r(4608, Zy, Zy, [Gy]),
          _r(4608, Qy, Qy, [Gy]),
          _r(5120, Yl, Jl, [Ol, Ql]),
          _r(4608, zy, zy, [Yl, Ol, By]),
          _r(4608, Pd, Pd, []),
          _r(1073742336, cl, cl, []),
          _r(1024, We, ic, []),
          _r(
            1024,
            ai,
            function() {
              return [my()];
            },
            []
          ),
          _r(512, Sy, Sy, [Tt]),
          _r(256, Yy, "ngsw-worker.js", []),
          _r(256, Ky, { enabled: !0 }, []),
          _r(
            1024,
            Cs,
            function(e, t, n, r, s, i) {
              return [
                ((o = e),
                gu("probe", yu),
                gu(
                  "coreTokens",
                  Object.assign(
                    {},
                    mu,
                    (o || []).reduce((e, t) => ((e[t.name] = t.token), e), {})
                  )
                ),
                () => yu),
                Ey(t),
                Jy(n, r, s, i)
              ];
              var o;
            },
            [[2, ai], Sy, Tt, Yy, Ky, Ds]
          ),
          _r(512, xs, xs, [[2, Cs]]),
          _r(131584, di, di, [Zs, Is, Tt, We, Kt, xs]),
          _r(1073742336, Ii, Ii, [di]),
          _r(1073742336, oc, oc, [[3, oc]]),
          _r(1073742336, ql, ql, []),
          _r(1073742336, Wl, Wl, []),
          _r(1073742336, Gh, Gh, []),
          _r(1073742336, Kh, Kh, []),
          _r(1073742336, Yh, Yh, []),
          _r(1073742336, Jh, Jh, []),
          _r(1073742336, Xh, Xh, []),
          _r(1073742336, sh, sh, []),
          _r(1073742336, ih, ih, []),
          _r(1073742336, Td, Td, []),
          _r(1073742336, Dd, Dd, []),
          _r(1073742336, Ld, Ld, []),
          _r(1073742336, $d, $d, []),
          _r(1073742336, Hd, Hd, []),
          _r(1073742336, Bd, Bd, []),
          _r(1073742336, qd, qd, []),
          _r(1073742336, Wd, Wd, []),
          _r(1073742336, Gd, Gd, []),
          _r(1073742336, Zd, Zd, []),
          _r(1073742336, Qd, Qd, []),
          _r(1073742336, Yd, Yd, []),
          _r(1073742336, ep, ep, []),
          _r(1073742336, tp, tp, []),
          _r(1024, fy, _y, [[3, ry]]),
          _r(512, Eg, kg, []),
          _r(512, iy, iy, []),
          _r(
            256,
            py,
            {
              preloadingStrategy: uy,
              scrollPositionRestoration: "top",
              useHash: !0
            },
            []
          ),
          _r(1024, fa, vy, [da, [2, ga], py]),
          _r(512, ma, ma, [fa, da]),
          _r(512, js, js, []),
          _r(512, fi, yi, [js, [2, gi]]),
          _r(
            1024,
            Km,
            function() {
              return [
                [
                  { path: "", redirectTo: "login", pathMatch: "full" },
                  { path: "login", component: Ny },
                  { path: "home", component: Tb },
                  { path: "**", redirectTo: "/home", pathMatch: "full" }
                ]
              ];
            },
            []
          ),
          _r(1024, ry, Cy, [
            di,
            Eg,
            iy,
            ma,
            Tt,
            fi,
            js,
            Km,
            py,
            [2, Jm],
            [2, Zm]
          ]),
          _r(1073742336, yy, yy, [
            [2, fy],
            [2, ry]
          ]),
          _r(1073742336, $b, $b, []),
          _r(1073742336, Xl, Xl, []),
          _r(1073742336, eb, eb, []),
          _r(1073742336, ra, ra, []),
          _r(256, Et, !0, []),
          _r(256, Fl, "XSRF-TOKEN", []),
          _r(256, Ll, "X-XSRF-TOKEN", [])
        ]);
      });
      (function() {
        if (Ze)
          throw new Error("Cannot enable prod mode after platform setup.");
        Ge = !1;
      })(),
        sc()
          .bootstrapModuleFactory(Hb)
          .catch(e => console.error(e));
    },
    zn8P: function(e, t) {
      function n(e) {
        return Promise.resolve().then(function() {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        });
      }
      (n.keys = function() {
        return [];
      }),
        (n.resolve = n),
        (e.exports = n),
        (n.id = "zn8P");
    }
  },
  [[0, 0]]
]);
