window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BackgroundAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27aaaWThfxNB6G86bv/Zz/4", "BackgroundAdapter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BackgroundAdapter = function(_super) {
      __extends(BackgroundAdapter, _super);
      function BackgroundAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BackgroundAdapter.prototype.onLoad = function() {
        var srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        var realWidth = this.node.width * srcScaleForShowAll;
        var realHeight = this.node.height * srcScaleForShowAll;
        this.node.scale = Math.max(cc.view.getCanvasSize().width / realWidth, cc.view.getCanvasSize().height / realHeight);
      };
      BackgroundAdapter = __decorate([ ccclass ], BackgroundAdapter);
      return BackgroundAdapter;
    }(cc.Component);
    exports.default = BackgroundAdapter;
    cc._RF.pop();
  }, {} ],
  BgSplashSceneCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b5321VzKhOTIt+levQrTrh", "BgSplashSceneCtrl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BgSplashSceneCtrl = function(_super) {
      __extends(BgSplashSceneCtrl, _super);
      function BgSplashSceneCtrl() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BgSplashSceneCtrl.prototype.start = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this._hideNativeSplash();
        }, 1);
      };
      BgSplashSceneCtrl.prototype._hideNativeSplash = function() {
        true;
        cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideSplash", "()V");
      };
      BgSplashSceneCtrl = __decorate([ ccclass ], BgSplashSceneCtrl);
      return BgSplashSceneCtrl;
    }(cc.Component);
    exports.default = BgSplashSceneCtrl;
    cc._RF.pop();
  }, {} ],
  ContentAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee105izEf1CdIQoxMLGJXEy", "ContentAdapter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ContentAdapter = function(_super) {
      __extends(ContentAdapter, _super);
      function ContentAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ContentAdapter.prototype.onLoad = function() {
        var srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        var realWidth = this.node.width * srcScaleForShowAll;
        var realHeight = this.node.height * srcScaleForShowAll;
        this.node.width = this.node.width * (cc.view.getCanvasSize().width / realWidth);
        this.node.height = this.node.height * (cc.view.getCanvasSize().height / realHeight);
      };
      ContentAdapter = __decorate([ ccclass ], ContentAdapter);
      return ContentAdapter;
    }(cc.Component);
    exports.default = ContentAdapter;
    cc._RF.pop();
  }, {} ],
  ImageSplashSceneCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9f6a9QkHhPcaXEMAqE4WxO", "ImageSplashSceneCtrl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ImageSplashSceneCtrl = function(_super) {
      __extends(ImageSplashSceneCtrl, _super);
      function ImageSplashSceneCtrl() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ImageSplashSceneCtrl.prototype.start = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this._hideNativeSplash();
        }, 1);
      };
      ImageSplashSceneCtrl.prototype._hideNativeSplash = function() {
        true;
        cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideSplash", "()V");
      };
      ImageSplashSceneCtrl = __decorate([ ccclass ], ImageSplashSceneCtrl);
      return ImageSplashSceneCtrl;
    }(cc.Component);
    exports.default = ImageSplashSceneCtrl;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BgSplashSceneCtrl", "ImageSplashSceneCtrl", "BackgroundAdapter", "ContentAdapter" ]);