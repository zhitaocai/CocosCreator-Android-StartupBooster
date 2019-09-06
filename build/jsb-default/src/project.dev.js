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
        cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/BgSplashActivity", "hideSplash", "()V");
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
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.progressBar = null;
        _this.isStartLoaded = false;
        return _this;
      }
      ImageSplashSceneCtrl.prototype.start = function() {
        var _this = this;
        this.progressBar.progress = 0;
        this.scheduleOnce(function() {
          _this._hideNativeSplash();
          _this._simulateLoading();
          _this._playTitleAnim();
        }, 1);
      };
      ImageSplashSceneCtrl.prototype._hideNativeSplash = function() {
        true;
        cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImageSplashActivity", "hideSplash", "()V");
      };
      ImageSplashSceneCtrl.prototype._playTitleAnim = function() {
        this.titleLabel.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.8, 1.2).easing(cc.easeCircleActionOut()), cc.scaleTo(.8, 1).easing(cc.easeCircleActionIn()))));
      };
      ImageSplashSceneCtrl.prototype._simulateLoading = function() {
        this.isStartLoaded = true;
      };
      ImageSplashSceneCtrl.prototype.update = function(dt) {
        this.isStartLoaded && this.progressBar.progress <= 1 && (this.progressBar.progress += .002);
      };
      __decorate([ property(cc.Label) ], ImageSplashSceneCtrl.prototype, "titleLabel", void 0);
      __decorate([ property(cc.ProgressBar) ], ImageSplashSceneCtrl.prototype, "progressBar", void 0);
      ImageSplashSceneCtrl = __decorate([ ccclass ], ImageSplashSceneCtrl);
      return ImageSplashSceneCtrl;
    }(cc.Component);
    exports.default = ImageSplashSceneCtrl;
    cc._RF.pop();
  }, {} ],
  SloganSplashSceneCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b2f8c/BVKVO0JGZBDHOt+I8", "SloganSplashSceneCtrl");
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
    var SloganSplashSceneCtrl = function(_super) {
      __extends(SloganSplashSceneCtrl, _super);
      function SloganSplashSceneCtrl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.progressBar = null;
        _this.isStartLoaded = false;
        return _this;
      }
      SloganSplashSceneCtrl.prototype.start = function() {
        var _this = this;
        this.progressBar.progress = 0;
        this.scheduleOnce(function() {
          _this._hideNativeSplash();
          _this._simulateLoading();
          _this._playTitleAnim();
        }, 1);
      };
      SloganSplashSceneCtrl.prototype._hideNativeSplash = function() {
        true;
        cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/SloganSplashActivity", "hideSplash", "()V");
      };
      SloganSplashSceneCtrl.prototype._playTitleAnim = function() {
        this.titleLabel.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.8, 1.2).easing(cc.easeCircleActionOut()), cc.scaleTo(.8, 1).easing(cc.easeCircleActionIn()))));
      };
      SloganSplashSceneCtrl.prototype._simulateLoading = function() {
        this.isStartLoaded = true;
      };
      SloganSplashSceneCtrl.prototype.update = function(dt) {
        this.isStartLoaded && this.progressBar.progress <= 1 && (this.progressBar.progress += .002);
      };
      __decorate([ property(cc.Label) ], SloganSplashSceneCtrl.prototype, "titleLabel", void 0);
      __decorate([ property(cc.ProgressBar) ], SloganSplashSceneCtrl.prototype, "progressBar", void 0);
      SloganSplashSceneCtrl = __decorate([ ccclass ], SloganSplashSceneCtrl);
      return SloganSplashSceneCtrl;
    }(cc.Component);
    exports.default = SloganSplashSceneCtrl;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BgSplashSceneCtrl", "ImageSplashSceneCtrl", "SloganSplashSceneCtrl", "BackgroundAdapter", "ContentAdapter" ]);