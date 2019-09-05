(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

require('./jsb-sys.js');
require('./jsb-game.js');
require('./jsb-videoplayer.js');
require('./jsb-webview.js');
require('./jsb-node.js');
require('./jsb-audio.js');
require('./jsb-loader.js');
require('./jsb-editbox.js');
require('./jsb-reflection.js');
require('./jsb-assets-manager.js');
require('./jsb-editor-support.js');
require('./jsb-dragonbones.js');
require('./jsb-spine-skeleton.js');
require('./jsb-spine-assembler.js');

},{"./jsb-assets-manager.js":2,"./jsb-audio.js":3,"./jsb-dragonbones.js":4,"./jsb-editbox.js":5,"./jsb-editor-support.js":6,"./jsb-game.js":7,"./jsb-loader.js":8,"./jsb-node.js":9,"./jsb-reflection.js":10,"./jsb-spine-assembler.js":11,"./jsb-spine-skeleton.js":12,"./jsb-sys.js":13,"./jsb-videoplayer.js":14,"./jsb-webview.js":15}],2:[function(require,module,exports){
"use strict";

/*
 * Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

if (jsb.AssetsManager) {
    jsb.AssetsManager.State = {
        UNINITED: 0,
        UNCHECKED: 1,
        PREDOWNLOAD_VERSION: 2,
        DOWNLOADING_VERSION: 3,
        VERSION_LOADED: 4,
        PREDOWNLOAD_MANIFEST: 5,
        DOWNLOADING_MANIFEST: 6,
        MANIFEST_LOADED: 7,
        NEED_UPDATE: 8,
        READY_TO_UPDATE: 9,
        UPDATING: 10,
        UNZIPPING: 11,
        UP_TO_DATE: 12,
        FAIL_TO_UPDATE: 13
    };

    jsb.Manifest.DownloadState = {
        UNSTARTED: 0,
        DOWNLOADING: 1,
        SUCCESSED: 2,
        UNMARKED: 3
    };

    jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST = 0;
    jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST = 1;
    jsb.EventAssetsManager.ERROR_PARSE_MANIFEST = 2;
    jsb.EventAssetsManager.NEW_VERSION_FOUND = 3;
    jsb.EventAssetsManager.ALREADY_UP_TO_DATE = 4;
    jsb.EventAssetsManager.UPDATE_PROGRESSION = 5;
    jsb.EventAssetsManager.ASSET_UPDATED = 6;
    jsb.EventAssetsManager.ERROR_UPDATING = 7;
    jsb.EventAssetsManager.UPDATE_FINISHED = 8;
    jsb.EventAssetsManager.UPDATE_FAILED = 9;
    jsb.EventAssetsManager.ERROR_DECOMPRESS = 10;
}

},{}],3:[function(require,module,exports){
'use strict';

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.Audio = function (src) {
    this.src = src;
    this.volume = 1;
    this.loop = false;
    this.id = -1;
};

var handleVolume = function handleVolume(volume) {
    if (volume === undefined) {
        // set default volume as 1
        volume = 1;
    } else if (typeof volume === 'string') {
        volume = Number.parseFloat(volume);
    }
    return volume;
};

(function (proto, audioEngine) {

    // Using the new audioEngine
    cc.audioEngine = audioEngine;
    audioEngine.setMaxWebAudioSize = function () {};

    cc.Audio.State = audioEngine.AudioState;

    proto.play = function () {
        audioEngine.stop(this.id);

        var clip = this.src;
        if (clip.loaded) {
            this.id = audioEngine.play2d(clip._nativeAsset, this.loop, this.volume);
        } else {
            var self = this;
            cc.loader.load({
                url: clip.nativeUrl,
                // For audio, we should skip loader otherwise it will load a new audioClip.
                skips: ['Loader']
            }, function (err, audioNativeAsset) {
                if (err) {
                    cc.error(err);
                    return;
                }
                if (!clip.loaded) {
                    clip._nativeAsset = audioNativeAsset;
                    self.id = audioEngine.play2d(audioNativeAsset, self.loop, self.volume);
                }
            });
        }
    };

    proto.pause = function () {
        audioEngine.pause(this.id);
    };

    proto.resume = function () {
        audioEngine.resume(this.id);
    };

    proto.stop = function () {
        audioEngine.stop(this.id);
    };

    proto.destroy = function () {};

    proto.setLoop = function (loop) {
        this.loop = loop;
        audioEngine.setLoop(this.id, loop);
    };

    proto.getLoop = function () {
        return this.loop;
    };

    proto.setVolume = function (volume) {
        volume = handleVolume(volume);
        this.volume = volume;
        return audioEngine.setVolume(this.id, volume);
    };

    proto.getVolume = function () {
        return this.volume;
    };

    proto.setCurrentTime = function (time) {
        audioEngine.setCurrentTime(this.id, time);
    };

    proto.getCurrentTime = function () {
        return audioEngine.getCurrentTime(this.id);
    };

    proto.getDuration = function () {
        return audioEngine.getDuration(this.id);
    };

    proto.getState = function () {
        return audioEngine.getState(this.id);
    };

    // polyfill audioEngine

    var _music = {
        id: -1,
        clip: '',
        loop: false,
        volume: 1
    };
    var _effect = {
        volume: 1
    };

    audioEngine.play = function (clip, loop, volume) {
        if (typeof volume !== 'number') {
            volume = 1;
        }
        if (typeof clip === 'string') {
            // backward compatibility since 1.10
            cc.warnID(8401, 'cc.audioEngine', 'cc.AudioClip', 'AudioClip', 'cc.AudioClip', 'audio');
            var path = clip;
            var md5Pipe = cc.loader.md5Pipe;
            if (md5Pipe) {
                path = md5Pipe.transformURL(path);
            }
            return audioEngine.play2d(path, loop, volume);
        } else {
            if (!clip) {
                return;
            }
            if (clip.loaded) {
                return audioEngine.play2d(clip._nativeAsset, loop, volume);
            } else {
                cc.loader.load({
                    url: clip.nativeUrl,
                    // For audio, we should skip loader otherwise it will load a new audioClip.
                    skips: ['Loader']
                }, function (err, audioNativeAsset) {
                    if (err) {
                        cc.error(err);
                        return;
                    }
                    if (!clip.loaded) {
                        clip._nativeAsset = audioNativeAsset;
                        audioEngine.play2d(audioNativeAsset, loop, volume);
                    }
                });
                // Deffered loading return audioID -1
                return -1;
            }
        }
    };
    audioEngine.playMusic = function (clip, loop) {
        audioEngine.stop(_music.id);
        _music.id = audioEngine.play(clip, loop, _music.volume);
        _music.loop = loop;
        _music.clip = clip;
        return _music.id;
    };
    audioEngine.stopMusic = function () {
        audioEngine.stop(_music.id);
    };
    audioEngine.pauseMusic = function () {
        audioEngine.pause(_music.id);
        return _music.id;
    };
    audioEngine.resumeMusic = function () {
        audioEngine.resume(_music.id);
        return _music.id;
    };
    audioEngine.getMusicVolume = function () {
        return _music.volume;
    };
    audioEngine.setMusicVolume = function (volume) {
        _music.volume = handleVolume(volume);
        audioEngine.setVolume(_music.id, _music.volume);
        return volume;
    };
    audioEngine.isMusicPlaying = function () {
        return audioEngine.getState(_music.id) === audioEngine.AudioState.PLAYING;
    };
    audioEngine.playEffect = function (filePath, loop) {
        return audioEngine.play(filePath, loop || false, _effect.volume);
    };
    audioEngine.setEffectsVolume = function (volume) {
        _effect.volume = handleVolume(volume);
    };
    audioEngine.getEffectsVolume = function () {
        return _effect.volume;
    };
    audioEngine.pauseEffect = function (audioID) {
        return audioEngine.pause(audioID);
    };
    audioEngine.pauseAllEffects = function () {
        var musicPlay = audioEngine.getState(_music.id) === audioEngine.AudioState.PLAYING;
        audioEngine.pauseAll();
        if (musicPlay) {
            audioEngine.resume(_music.id);
        }
    };
    audioEngine.resumeEffect = function (id) {
        audioEngine.resume(id);
    };
    audioEngine.resumeAllEffects = function () {
        var musicPaused = audioEngine.getState(_music.id) === audioEngine.AudioState.PAUSED;
        audioEngine.resumeAll();
        if (musicPaused && audioEngine.getState(_music.id) === audioEngine.AudioState.PLAYING) {
            audioEngine.pause(_music.id);
        }
    };
    audioEngine.stopEffect = function (id) {
        return audioEngine.stop(id);
    };
    audioEngine.stopAllEffects = function () {
        var musicPlaying = audioEngine.getState(_music.id) === audioEngine.AudioState.PLAYING;
        var currentTime = audioEngine.getCurrentTime(_music.id);
        audioEngine.stopAll();
        if (musicPlaying) {
            _music.id = audioEngine.play(_music.clip, _music.loop);
            audioEngine.setCurrentTime(_music.id, currentTime);
        }
    };

    // incompatible implementation for game pause & resume
    audioEngine._break = audioEngine.pauseAll;
    audioEngine._restore = audioEngine.resumeAll;

    // deprecated

    audioEngine._uncache = audioEngine.uncache;
    audioEngine.uncache = function (clip) {
        var path;
        if (typeof clip === 'string') {
            // backward compatibility since 1.10
            cc.warnID(8401, 'cc.audioEngine', 'cc.AudioClip', 'AudioClip', 'cc.AudioClip', 'audio');
            path = clip;
        } else {
            if (!clip) {
                return;
            }
            path = clip._nativeAsset;
        }
        audioEngine._uncache(path);
    };

    audioEngine._preload = audioEngine.preload;
    audioEngine.preload = function (filePath, callback) {
        cc.warn('`cc.audioEngine.preload` is deprecated, use `cc.loader.loadRes(url, cc.AudioClip)` instead please.');
        audioEngine._preload(filePath, callback);
    };
})(cc.Audio.prototype, jsb.AudioEngine);

},{}],4:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
(function () {
    if (window.dragonBones === undefined || window.middleware === undefined) return;
    if (dragonBones.DragonBonesAtlasAsset === undefined) return;

    // dragonbones global time scale.
    Object.defineProperty(dragonBones, 'timeScale', {
        get: function get() {
            return this._timeScale;
        },
        set: function set(value) {
            this._timeScale = value;
            var factory = this.CCFactory.getInstance();
            factory.setTimeScale(value);
        },

        configurable: true
    });

    ////////////////////////////////////////////////////////////
    // override dragonBones library by native dragonBones
    ////////////////////////////////////////////////////////////
    //--------------------
    // adapt event name
    //--------------------
    dragonBones.EventObject.START = "start";
    dragonBones.EventObject.LOOP_COMPLETE = "loopComplete";
    dragonBones.EventObject.COMPLETE = "complete";
    dragonBones.EventObject.FADE_IN = "fadeIn";
    dragonBones.EventObject.FADE_IN_COMPLETE = "fadeInComplete";
    dragonBones.EventObject.FADE_OUT = "fadeOut";
    dragonBones.EventObject.FADE_OUT_COMPLETE = "fadeOutComplete";
    dragonBones.EventObject.FRAME_EVENT = "frameEvent";
    dragonBones.EventObject.SOUND_EVENT = "soundEvent";

    dragonBones.DragonBones = {
        ANGLE_TO_RADIAN: Math.PI / 180,
        RADIAN_TO_ANGLE: 180 / Math.PI
    };

    //-------------------
    // native factory
    //-------------------

    var factoryProto = dragonBones.CCFactory.prototype;
    factoryProto.createArmatureNode = function (comp, armatureName, node) {
        node = node || new cc.Node();
        var display = node.getComponent(dragonBones.ArmatureDisplay);
        if (!display) {
            display = node.addComponent(dragonBones.ArmatureDisplay);
        }

        node.name = armatureName;

        display._armatureName = armatureName;
        display._N$dragonAsset = comp.dragonAsset;
        display._N$dragonAtlasAsset = comp.dragonAtlasAsset;
        display._init();

        return display;
    };

    //-------------------
    // native armature
    //-------------------
    var armatureProto = dragonBones.Armature.prototype;
    Object.defineProperty(armatureProto, 'animation', {
        get: function get() {
            return this.getAnimation();
        }
    });

    Object.defineProperty(armatureProto, 'display', {
        get: function get() {
            return this.getDisplay();
        }
    });

    Object.defineProperty(armatureProto, 'name', {
        get: function get() {
            return this.getName();
        }
    });

    armatureProto.addEventListener = function (eventType, listener, target) {
        if (!this.__persistentDisplay__) {
            this.__persistentDisplay__ = this.getDisplay();
        }
        this.__persistentDisplay__.on(eventType, listener, target);
    };

    armatureProto.removeEventListener = function (eventType, listener, target) {
        if (!this.__persistentDisplay__) {
            this.__persistentDisplay__ = this.getDisplay();
        }
        this.__persistentDisplay__.off(eventType, listener, target);
    };

    //--------------------------
    // native CCArmatureDisplay
    //--------------------------
    var nativeArmatureDisplayProto = dragonBones.CCArmatureDisplay.prototype;

    Object.defineProperty(nativeArmatureDisplayProto, "node", {
        get: function get() {
            return this;
        }
    });

    nativeArmatureDisplayProto.getRootNode = function () {
        var rootDisplay = this.getRootDisplay();
        return rootDisplay && rootDisplay._ccNode;
    };

    nativeArmatureDisplayProto.convertToWorldSpace = function (point) {
        var newPos = this.convertToRootSpace(point);
        var ccNode = this.getRootNode();
        if (!ccNode) return newPos;
        var finalPos = ccNode.convertToWorldSpace(newPos);
        return finalPos;
    };

    nativeArmatureDisplayProto.initEvent = function () {
        if (this._eventTarget) {
            return;
        }
        this._eventTarget = new cc.EventTarget();
        this.setDBEventCallback(function (eventObject) {
            this._eventTarget.emit(eventObject.type, eventObject);
        });
    };

    nativeArmatureDisplayProto.on = function (type, listener, target) {
        this.initEvent();
        this._eventTarget.on(type, listener, target);
        this.addDBEventListener(type, listener);
    };

    nativeArmatureDisplayProto.off = function (type, listener, target) {
        this.initEvent();
        this._eventTarget.off(type, listener, target);
        this.removeDBEventListener(type, listener);
    };

    nativeArmatureDisplayProto.once = function (type, listener, target) {
        this.initEvent();
        this._eventTarget.once(type, listener, target);
        this.addDBEventListener(type, listener);
    };

    //-------------------
    // native slot
    //-------------------
    var slotProto = dragonBones.Slot.prototype;
    Object.defineProperty(slotProto, 'childArmature', {
        get: function get() {
            return this.getChildArmature();
        },
        set: function set(val) {
            this.setChildArmature(val);
        }
    });

    Object.defineProperty(slotProto, 'display', {
        get: function get() {
            return this.getDisplay();
        }
    });

    Object.defineProperty(slotProto, 'name', {
        get: function get() {
            return this.getName();
        }
    });

    //------------------------
    // native TransformObject
    //------------------------
    var transformObjectProto = dragonBones.TransformObject.prototype;
    Object.defineProperty(transformObjectProto, 'global', {
        get: function get() {
            return this.getGlobal();
        }
    });

    Object.defineProperty(transformObjectProto, 'origin', {
        get: function get() {
            return this.getOrigin();
        }
    });

    Object.defineProperty(transformObjectProto, 'offset', {
        get: function get() {
            return this.getOffset();
        }
    });

    ////////////////////////////////////////////////////////////
    // override DragonBonesAtlasAsset
    ////////////////////////////////////////////////////////////
    var dbAtlas = dragonBones.DragonBonesAtlasAsset.prototype;
    var gTextureIdx = 0;
    var textureKeyMap = {};
    var textureMap = new WeakMap();
    var textureIdx2Name = {};

    dbAtlas.recordTexture = function () {
        if (this._texture && this._oldTexture !== this._texture) {
            var texKey = textureKeyMap[gTextureIdx] = { key: gTextureIdx };
            textureMap.set(texKey, this._texture);
            this._oldTexture = this._texture;
            this._texture.__textureIndex__ = gTextureIdx;
            gTextureIdx++;
        }
    };

    dbAtlas.getTextureByIndex = function (textureIdx) {
        var texKey = textureKeyMap[textureIdx];
        if (!texKey) return;
        return textureMap.get(texKey);
    };

    dbAtlas.updateTextureAtlasData = function (factory) {
        var url = this._texture.url;
        var preAtlasInfo = textureIdx2Name[url];
        var index = void 0;

        // If the texture has store the atlas info before,then get native atlas object,and 
        // update script texture map.
        if (preAtlasInfo) {
            index = preAtlasInfo.index;
            this._textureAtlasData = factory.getTextureAtlasDataByIndex(preAtlasInfo.name, index);
            var texKey = textureKeyMap[preAtlasInfo.index];
            textureMap.set(texKey, this._texture);
            this._texture.__textureIndex__ = index;
            // If script has store the atlas info,but native has no atlas object,then
            // still new native texture2d object,but no call recordTexture to increase
            // textureIndex.
            if (this._textureAtlasData) {
                return;
            }
        } else {
            this.recordTexture();
        }

        index = this._texture.__textureIndex__;
        this.jsbTexture = new middleware.Texture2D();
        this.jsbTexture.setRealTextureIndex(index);
        this.jsbTexture.setPixelsWide(this._texture.width);
        this.jsbTexture.setPixelsHigh(this._texture.height);
        this._textureAtlasData = factory.parseTextureAtlasData(this.atlasJson, this.jsbTexture, this._uuid);

        textureIdx2Name[url] = { name: this._textureAtlasData.name, index: index };
    };

    dbAtlas.init = function (factory) {
        this._factory = factory;

        // If create by manual, uuid is empty.
        if (!this._uuid) {
            var atlasJsonObj = JSON.parse(this.atlasJson);
            this._uuid = atlasJsonObj.name;
        }

        if (this._textureAtlasData) {
            factory.addTextureAtlasData(this._textureAtlasData, this._uuid);
        } else {
            this.updateTextureAtlasData(factory);
        }
    };

    dbAtlas._clear = function () {
        if (this._factory) {
            this._factory.removeTextureAtlasData(this._uuid, true);
            this._factory.removeDragonBonesDataByUUID(this._uuid, true);
        }
        this._textureAtlasData = null;
        this.recordTexture();
    };

    ////////////////////////////////////////////////////////////
    // override DragonBonesAsset
    ////////////////////////////////////////////////////////////
    var dbAsset = dragonBones.DragonBonesAsset.prototype;

    dbAsset.init = function (factory, atlasUUID) {
        this._factory = factory;

        // If create by manual, uuid is empty.
        // Only support json format, if remote load dbbin, must set uuid by manual.
        if (!this._uuid && this.dragonBonesJson) {
            var rawData = JSON.parse(this.dragonBonesJson);
            this._uuid = rawData.name;
        }

        var armatureKey = this._uuid + "#" + atlasUUID;
        var dragonBonesData = this._factory.getDragonBonesData(armatureKey);
        if (dragonBonesData) return armatureKey;

        var filePath = null;
        if (this.dragonBonesJson) {
            filePath = this.dragonBonesJson;
        } else {
            filePath = cc.loader.md5Pipe ? cc.loader.md5Pipe.transformURL(this.nativeUrl, true) : this.nativeUrl;
        }
        this._factory.parseDragonBonesDataByPath(filePath, armatureKey);
        return armatureKey;
    };

    dbAsset._clear = function () {
        if (this._factory) {
            this._factory.removeDragonBonesDataByUUID(this._uuid, true);
        }
    };

    ////////////////////////////////////////////////////////////
    // override ArmatureDisplay
    ////////////////////////////////////////////////////////////
    var armatureDisplayProto = dragonBones.ArmatureDisplay.prototype;
    var assembler = dragonBones.ArmatureDisplay._assembler;
    var renderCompProto = cc.RenderComponent.prototype;
    var RenderFlow = cc.RenderFlow;
    var renderer = cc.renderer;
    var renderEngine = renderer.renderEngine;
    var gfx = renderEngine.gfx;
    var VertexFormat = gfx.VertexFormat;

    Object.defineProperty(armatureDisplayProto, 'armatureName', {
        get: function get() {
            return this._armatureName;
        },
        set: function set(value) {
            this._armatureName = value;
            var animNames = this.getAnimationNames(this._armatureName);

            if (!this.animationName || animNames.indexOf(this.animationName) < 0) {
                this.animationName = '';
            }

            if (this._armature) {
                this._armature.dispose();
                this._factory.remove(this._armature);
                this._armature = null;
            }
            this._nativeDisplay = null;

            this._refresh();
            if (this._armature) {
                this._factory.add(this._armature);
            }
        },

        visible: false
    });

    Object.defineProperty(armatureDisplayProto, 'debugBones', {
        get: function get() {
            return this._debugBones || false;
        },
        set: function set(value) {
            this._debugBones = value;
            this._initDebugDraw();
            if (this._nativeDisplay) {
                this._nativeDisplay.setDebugBonesEnabled(this._debugBones);
            }
        }
    });

    Object.defineProperty(armatureDisplayProto, "premultipliedAlpha", {
        get: function get() {
            if (this._premultipliedAlpha === undefined) {
                return false;
            }
            return this._premultipliedAlpha;
        },
        set: function set(value) {
            this._premultipliedAlpha = value;
            if (this._nativeDisplay) {
                this._nativeDisplay.setOpacityModifyRGB(this._premultipliedAlpha);
            }
        }
    });

    armatureDisplayProto._clearRenderData = function () {
        this._renderInfoOffset = null;
        this._nativeDisplay = null;
    };

    armatureDisplayProto.update = null;

    // Shield use batch in native
    armatureDisplayProto._updateBatch = function () {};

    armatureDisplayProto._buildArmature = function () {
        if (!this.dragonAsset || !this.dragonAtlasAsset || !this.armatureName) {
            this._clearRenderData();
            return;
        }

        if (this._nativeDisplay) {
            this._nativeDisplay.dispose();
            this._nativeDisplay._comp = null;
            this._nativeDisplay = null;
        }

        var atlasUUID = this.dragonAtlasAsset._uuid;
        this._armatureKey = this.dragonAsset.init(this._factory, atlasUUID);
        this._nativeDisplay = this._factory.buildArmatureDisplay(this.armatureName, this._armatureKey, "", atlasUUID);
        if (!this._nativeDisplay) {
            this._clearRenderData();
            return;
        }

        this._nativeDisplay._ccNode = this.node;
        this._nativeDisplay._comp = this;
        this._nativeDisplay._eventTarget = this._eventTarget;

        this._nativeDisplay.setOpacityModifyRGB(this.premultipliedAlpha);
        this._nativeDisplay.setDebugBonesEnabled(this.debugBones);
        this._nativeDisplay.setDBEventCallback(function (eventObject) {
            this._eventTarget.emit(eventObject.type, eventObject);
        });

        // add all event into native display
        var callbackTable = this._eventTarget._callbackTable;
        // just use to adapt to native api
        var emptyHandle = function emptyHandle() {};
        for (var key in callbackTable) {
            var list = callbackTable[key];
            if (!list || !list.callbacks || !list.callbacks.length) continue;
            this._nativeDisplay.addDBEventListener(key, emptyHandle);
        }

        this._armature = this._nativeDisplay.armature();
        this._armature.animation.timeScale = this.timeScale;

        this._renderInfoOffset = this._nativeDisplay.getRenderInfoOffset();

        if (this.animationName) {
            this.playAnimation(this.animationName, this.playTimes);
        }
    };

    armatureDisplayProto.onEnable = function () {
        renderCompProto.onEnable.call(this);
        if (this._armature) {
            this._factory.add(this._armature);
        }
        this.node._renderFlag &= ~RenderFlow.FLAG_UPDATE_RENDER_DATA;
        this.node._renderFlag &= ~RenderFlow.FLAG_RENDER;
        this.node._renderFlag |= RenderFlow.FLAG_CUSTOM_IA_RENDER;
    };

    armatureDisplayProto.onDisable = function () {
        renderCompProto.onDisable.call(this);
        if (this._armature) {
            this._factory.remove(this._armature);
        }
    };

    var _onLoad = armatureDisplayProto.onLoad;
    armatureDisplayProto.onLoad = function () {
        if (_onLoad) {
            _onLoad.call(this);
        }

        this._iaPool = [];
        this._iaPool.push(new middleware.MiddlewareIA());

        this._iaRenderData = new renderEngine.IARenderData();
    };

    armatureDisplayProto.once = function (eventType, listener, target) {
        if (this._nativeDisplay) {
            this._nativeDisplay.addDBEventListener(eventType, listener);
        }
        this._eventTarget.once(eventType, listener, target);
    };

    armatureDisplayProto.addEventListener = function (eventType, listener, target) {
        if (this._nativeDisplay) {
            this._nativeDisplay.addDBEventListener(eventType, listener);
        }
        this._eventTarget.on(eventType, listener, target);
    };

    armatureDisplayProto.removeEventListener = function (eventType, listener, target) {
        if (this._nativeDisplay) {
            this._nativeDisplay.removeDBEventListener(eventType, listener);
        }
        this._eventTarget.off(eventType, listener, target);
    };

    var _onDestroy = armatureDisplayProto.onDestroy;
    armatureDisplayProto.onDestroy = function () {
        _onDestroy.call(this);
        if (this._nativeDisplay) {
            this._nativeDisplay.dispose();
            this._nativeDisplay._comp = null;
            this._nativeDisplay = null;
        }
        this._materialCache = null;
    };

    ////////////////////////////////////////////////////////////
    // override webgl-assembler
    ////////////////////////////////////////////////////////////
    var _slotColor = cc.color(0, 0, 255, 255);
    var _boneColor = cc.color(255, 0, 0, 255);
    var _originColor = cc.color(0, 255, 0, 255);

    var _getSlotMaterial = function _getSlotMaterial(comp, tex, src, dst) {
        var key = tex.url + src + dst;
        var baseMaterial = comp._material;
        if (!baseMaterial) return null;

        var materialCache = comp._materialCache;
        var material = materialCache[key];

        if (!material) {

            var baseKey = baseMaterial._hash;
            if (!materialCache[baseKey]) {
                material = baseMaterial;
            } else {
                material = baseMaterial.clone();
            }

            material.useModel = true;
            // update texture
            material.texture = tex;
            material.useColor = false;

            // update blend function
            var pass = material._mainTech.passes[0];
            pass.setBlend(gfx.BLEND_FUNC_ADD, src, dst, gfx.BLEND_FUNC_ADD, src, dst);
            materialCache[key] = material;
            material.updateHash(key);
        } else if (material.texture !== tex) {
            material.texture = tex;
            material.updateHash(key);
        }
        return material;
    };

    // native enable useModel
    assembler.useModel = true;

    // native no need implement
    assembler.genRenderDatas = function (comp, batchData) {};

    // native no need implement
    assembler.updateRenderData = function (comp, batchData) {};

    assembler.renderIA = function (comp, renderer) {

        var nativeDisplay = comp._nativeDisplay;
        if (!nativeDisplay) {
            return;
        }

        var renderInfoOffset = comp._renderInfoOffset;
        if (!renderInfoOffset) return;

        var node = comp.node;
        var iaPool = comp._iaPool;
        var poolIdx = 0;

        if (comp.__preColor__ === undefined || !node.color.equals(comp.__preColor__)) {
            nativeDisplay.setColor(node.color);
            comp.__preColor__ = node.color;
        }

        var infoOffset = renderInfoOffset[0];
        var renderInfoMgr = middleware.renderInfoMgr;
        var renderInfo = renderInfoMgr.renderInfo;

        var materialIdx = 0,
            realTextureIndex = void 0,
            realTexture = void 0;
        // verify render border
        var border = renderInfo[infoOffset + materialIdx++];
        if (border !== 0xffffffff) return;

        var matLen = renderInfo[infoOffset + materialIdx++];
        if (matLen == 0) return;

        for (var index = 0; index < matLen; index++) {
            realTextureIndex = renderInfo[infoOffset + materialIdx++];
            realTexture = comp.dragonAtlasAsset.getTextureByIndex(realTextureIndex);
            if (!realTexture) return;

            var material = _getSlotMaterial(comp, realTexture, renderInfo[infoOffset + materialIdx++], renderInfo[infoOffset + materialIdx++]);

            var glIB = renderInfo[infoOffset + materialIdx++];
            var glVB = renderInfo[infoOffset + materialIdx++];
            var indiceOffset = renderInfo[infoOffset + materialIdx++];
            var segmentCount = renderInfo[infoOffset + materialIdx++];

            var ia = iaPool[poolIdx];
            if (!ia) {
                ia = new middleware.MiddlewareIA();
                iaPool[poolIdx] = ia;
            }
            ia._start = indiceOffset;
            ia._count = segmentCount;
            ia.setVertexFormat(VertexFormat.XY_UV_Color);
            ia.setGLIBID(glIB);
            ia.setGLVBID(glVB);

            poolIdx++;

            comp._iaRenderData.ia = ia;
            comp._iaRenderData.material = material;
            renderer._flushIA(comp._iaRenderData);
        }

        if (comp.debugBones && comp._debugDraw) {

            var graphics = comp._debugDraw;
            graphics.clear();

            comp._debugData = comp._debugData || nativeDisplay.getDebugData();
            var debugData = comp._debugData;
            var debugIdx = 0;

            graphics.lineWidth = 5;
            graphics.strokeColor = _boneColor;
            graphics.fillColor = _slotColor; // Root bone color is same as slot color.

            var debugBonesLen = debugData[debugIdx++];
            for (var i = 0; i < debugBonesLen; i += 4) {
                var bx = debugData[debugIdx++];
                var by = debugData[debugIdx++];
                var x = debugData[debugIdx++];
                var y = debugData[debugIdx++];

                // Bone lengths.
                graphics.moveTo(bx, by);
                graphics.lineTo(x, y);
                graphics.stroke();

                // Bone origins.
                graphics.circle(bx, by, Math.PI * 2);
                graphics.fill();
                if (i === 0) {
                    graphics.fillColor = _originColor;
                }
            }
        }
    };
})();

},{}],5:[function(require,module,exports){
'use strict';

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

(function () {
	if (!(cc && cc.EditBox)) {
		return;
	}

	var KeyboardReturnType = cc.EditBox.KeyboardReturnType;
	var InputMode = cc.EditBox.InputMode;
	var InputFlag = cc.EditBox.InputFlag;
	var _p = cc.EditBox._EditBoxImpl.prototype;

	function getInputType(type) {
		switch (type) {
			case InputMode.EMAIL_ADDR:
				return 'email';
			case InputMode.NUMERIC:
			case InputMode.DECIMAL:
				return 'number';
			case InputMode.PHONE_NUMBER:
				return 'phone';
			case InputMode.URL:
				return 'url';
			case InputMode.SINGLE_LINE:
			case InputMode.ANY:
			default:
				return 'text';
		}
	}

	function getKeyboardReturnType(type) {
		switch (type) {
			case KeyboardReturnType.DEFAULT:
			case KeyboardReturnType.DONE:
				return 'done';
			case KeyboardReturnType.SEND:
				return 'send';
			case KeyboardReturnType.SEARCH:
				return 'search';
			case KeyboardReturnType.GO:
				return 'go';
			case KeyboardReturnType.NEXT:
				return 'next';
		}
		return 'done';
	}

	function updateLabelsInvisible(editBox) {
		var placeholderLabel = editBox._placeholderLabel;
		var textLabel = editBox._textLabel;
		var displayText = editBox._impl._text;

		placeholderLabel.node.active = displayText === '';
		textLabel.node.active = displayText !== '';
	}

	cc.EditBox.prototype.editBoxEditingDidBegan = function () {
		cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
		this.node.emit('editing-did-began', this);
	};

	cc.EditBox.prototype.editBoxEditingDidEnded = function () {
		cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
		this.node.emit('editing-did-ended', this);
	};

	cc.EditBox.prototype._updateStayOnTop = function () {
		// jsb not support
	};

	_p.createInput = function () {
		var editBoxImpl = this;
		editBoxImpl._editing = true;

		var multiline = this._inputMode === InputMode.ANY;
		var inputTypeString = getInputType(editBoxImpl._inputMode);
		if (editBoxImpl._inputFlag === InputFlag.PASSWORD) inputTypeString = 'password';

		var rect = this._getRect();

		jsb.inputBox.show({
			defaultValue: editBoxImpl._text,
			maxLength: editBoxImpl._maxLength,
			multiple: multiline,
			confirmHold: false,
			confirmType: getKeyboardReturnType(editBoxImpl._returnType),
			inputType: inputTypeString,
			originX: rect.x,
			originY: rect.y,
			width: rect.width,
			height: rect.height
		});
		if (this._delegate) {
			var editBox = this._delegate;
			cc.Component.EventHandler.emitEvents(editBox.editingDidBegan, editBox);
			editBox.node.emit('editing-did-began', editBox);
			updateLabelsInvisible(editBox);
		}

		function onConfirm(res) {
			editBoxImpl._delegate && editBoxImpl._delegate.editBoxEditingReturn && editBoxImpl._delegate.editBoxEditingReturn();
		}
		jsb.inputBox.onConfirm(onConfirm);

		function onInput(res) {
			if (res.value.length > editBoxImpl._maxLength) {
				res.value = res.value.slice(0, editBoxImpl._maxLength);
			}
			if (editBoxImpl._delegate && editBoxImpl._delegate.editBoxTextChanged) {
				if (editBoxImpl._text !== res.value) {
					editBoxImpl._text = res.value;
					editBoxImpl._delegate.editBoxTextChanged(editBoxImpl._text);
				}
			}
		}
		jsb.inputBox.onInput(onInput);

		function onComplete(res) {
			editBoxImpl._endEditing();
			jsb.inputBox.offConfirm(onConfirm);
			jsb.inputBox.offInput(onInput);
			jsb.inputBox.offComplete(onComplete);
		}
		jsb.inputBox.onComplete(onComplete);
	};

	_p.setTabIndex = function (index) {
		// jsb not support 
	};

	_p.setFocus = function () {
		this._beginEditing();
	};

	_p.isFocused = function () {
		return this._editing;
	}, _p.stayOnTop = function (flag) {
		// jsb not support 	
	};

	_p._updateMatrix = function () {
		// jsb not support 			
	};

	_p._updateSize = function (newWidth, newHeight) {
		// jsb not support
	};

	_p._getRect = function () {
		var node = this._node,
		    scaleX = cc.view._scaleX,
		    scaleY = cc.view._scaleY;
		var dpr = cc.view._devicePixelRatio;

		var math = cc.vmath;
		var matrix = math.mat4.create();
		node.getWorldMatrix(matrix);
		var contentSize = node._contentSize;
		var vec3 = cc.v3();
		vec3.x = -node._anchorPoint.x * contentSize.width;
		vec3.y = -node._anchorPoint.y * contentSize.height;

		math.mat4.translate(matrix, matrix, vec3);

		scaleX /= dpr;
		scaleY /= dpr;

		var finalScaleX = matrix.m00 * scaleX;
		var finaleScaleY = matrix.m05 * scaleY;

		return {
			x: matrix.m12 * finalScaleX,
			y: matrix.m13 * finaleScaleY,
			width: contentSize.width * finalScaleX,
			height: contentSize.height * finaleScaleY
		};
	};

	_p.setMaxLength = function (maxLength) {
		if (!isNaN(maxLength)) {
			if (maxLength < 0) {
				//we can't set Number.MAX_VALUE to input's maxLength property
				//so we use a magic number here, it should works at most use cases.
				maxLength = 65535;
			}
			this._maxLength = maxLength;
		}
	};

	_p.setString = function (text) {
		this._text = text;
		this._updateInput();
		updateLabelsInvisible(this._delegate);
	};

	_p._updateInput = function () {
		var tmpText = this._text;
		if (this._inputFlag === InputFlag.PASSWORD) {
			tmpText = tmpText.replace(/./g, '*');
		}
		this._delegate._textLabel.string = tmpText;
	};

	_p.setFontSize = function (fontSize) {
		this._edFontSize = fontSize || this._edFontSize;
		this._delegate._textLabel.fontSize = this._edFontSize;
	};

	_p.setFontColor = function (color) {
		this._textColor = color;
		this._delegate._textLabel.fontColor = this._textColor;
	};

	_p.setInputMode = function (inputMode) {
		this._inputMode = inputMode;
	};

	_p.setInputFlag = function (inputFlag) {
		this._inputFlag = inputFlag;
	};

	_p.setReturnType = function (returnType) {
		this._returnType = returnType;
	};

	_p._beginEditing = function () {
		this.createInput();
	};

	_p._endEditing = function () {
		var self = this;
		if (this._editing) {
			self._endEditingOnMobile();
			if (self._delegate && self._delegate.editBoxEditingDidEnded) {
				self._delegate.editBoxEditingDidEnded();
			}
		}
		this._editing = false;
	};

	_p.clear = function () {
		this._node = null;
		this.setDelegate(null);
	};
})();

},{}],6:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
(function () {
    if (window.middleware === undefined) return;

    var renderEngine = cc.renderer.renderEngine;
    var gfx = renderEngine.gfx;

    var middlewareMgr = middleware.MiddlewareManager.getInstance();
    var director = cc.director;

    director.on(cc.Director.EVENT_BEFORE_DRAW, function () {
        middlewareMgr.update(director._deltaTime);
    });

    var MiddlewareIA = cc.Class({
        ctor: function ctor() {
            var tempFormat = gfx.VertexFormat.XY_UV_Color;
            this._vertexBuffer = {
                _format: tempFormat,
                _usage: gfx.USAGE_DYNAMIC,
                _glID: {
                    _id: 0
                }
            };

            this._indexBuffer = {
                _format: gfx.INDEX_FMT_UINT16,
                _usage: gfx.USAGE_STATIC,
                _glID: {
                    _id: 0
                },
                _bytesPerIndex: 2
            };
            this._primitiveType = gfx.PT_TRIANGLES;
            this._start = 0;
            this._count = -1;
        },
        getPrimitiveCount: function getPrimitiveCount() {
            return this._count;
        },
        setVertexFormat: function setVertexFormat(format) {
            this._vertexBuffer._format = format;
        },
        setGLIBID: function setGLIBID(glIBID) {
            this._indexBuffer._glID._id = glIBID;
        },
        setGLVBID: function setGLVBID(glVBID) {
            this._vertexBuffer._glID._id = glVBID;
        }
    });

    middleware.MiddlewareIA = MiddlewareIA;

    var renderInfoMgr = middleware.RenderInfoMgr.getInstance();
    middleware.renderInfoMgr = renderInfoMgr;
    renderInfoMgr.renderInfo = renderInfoMgr.getRenderInfo();
    renderInfoMgr.__middleware__ = middleware;
    renderInfoMgr.setResizeCallback(function () {
        this.renderInfo = this.getRenderInfo();
    });
})();

},{}],7:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.game.restart = function () {
    __restartVM();
};

jsb.onHide = function () {
    cc.game.emit(cc.game.EVENT_HIDE);
};

jsb.onShow = function () {
    cc.game.emit(cc.game.EVENT_SHOW);
};

jsb.onResize = function (size) {
    if (size.width === 0 || size.height === 0) return;
    window.resize(size.width, size.height);
    cc.view.setCanvasSize(window.innerWidth, window.innerHeight);
};

},{}],8:[function(require,module,exports){
/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
'use strict';

function downloadScript(item, callback) {
    require(item.url);
    return null;
}

var audioDownloader = new jsb.Downloader();
var audioUrlMap = {}; // key: url, value: { loadingItem, callback }

audioDownloader.setOnFileTaskSuccess(function (task) {
    var _audioUrlMap$task$req = audioUrlMap[task.requestURL],
        item = _audioUrlMap$task$req.item,
        callback = _audioUrlMap$task$req.callback;

    if (!(item && callback)) {
        return;
    }

    item.url = task.storagePath;
    item.rawUrl = task.storagePath;

    callback(null, item);
    delete audioUrlMap[task.requestURL];
});

audioDownloader.setOnTaskError(function (task, errorCode, errorCodeInternal, errorStr) {
    var callback = audioUrlMap[task.requestURL].callback;

    callback && callback(errorStr, null);
    delete audioUrlMap[task.requestURL];
});

function downloadAudio(item, callback) {
    if (/^http/.test(item.url)) {
        var index = item.url.lastIndexOf('/');
        var fileName = item.url.substr(index + 1);
        var storagePath = jsb.fileUtils.getWritablePath() + fileName;

        // load from local cache
        if (jsb.fileUtils.isFileExist(storagePath)) {
            item.url = storagePath;
            item.rawUrl = storagePath;
            callback && callback(null, item);
        }
        // download remote audio
        else {
                audioUrlMap[item.url] = { item: item, callback: callback };
                audioDownloader.createDownloadFileTask(item.url, storagePath);
            }
        // Don't return anything to use async loading.
    } else {
        return item.url;
    }
}

function loadAudio(item, callback) {
    var loadByDeserializedAsset = item._owner instanceof cc.AudioClip;
    if (loadByDeserializedAsset) {
        return item.url;
    } else {
        var audioClip = new cc.AudioClip();
        // obtain user url through nativeUrl
        audioClip._setRawAsset(item.rawUrl, false);
        // obtain download url through _nativeAsset
        audioClip._nativeAsset = item.url;
        return audioClip;
    }
}

function downloadImage(item, callback) {
    var img = new Image();
    img.src = item.url;
    img.onload = function (info) {
        callback(null, img);
    };
    // Don't return anything to use async loading.
}

function _getFontFamily(fontHandle) {
    var ttfIndex = fontHandle.lastIndexOf(".ttf");
    if (ttfIndex === -1) return fontHandle;

    var slashPos = fontHandle.lastIndexOf("/");
    var fontFamilyName;
    if (slashPos === -1) {
        fontFamilyName = fontHandle.substring(0, ttfIndex) + "_LABEL";
    } else {
        fontFamilyName = fontHandle.substring(slashPos + 1, ttfIndex) + "_LABEL";
    }
    if (fontFamilyName.indexOf(' ') !== -1) {
        fontFamilyName = '"' + fontFamilyName + '"';
    }
    return fontFamilyName;
}

function downloadText(item) {
    var url = item.url;

    var result = jsb.fileUtils.getStringFromFile(url);
    if (typeof result === 'string' && result) {
        return result;
    } else {
        return new Error('Download text failed: ' + url);
    }
}

function downloadBinary(item) {
    var url = item.url;

    var result = jsb.fileUtils.getDataFromFile(url);
    if (result) {
        return result;
    } else {
        return new Error('Download binary file failed: ' + url);
    }
}

function loadFont(item, callback) {
    var url = item.url;
    var fontFamilyName = _getFontFamily(url);

    var fontFace = new FontFace(fontFamilyName, "url('" + url + "')");
    document.fonts.add(fontFace);

    fontFace.load();
    fontFace.loaded.then(function () {
        callback(null, fontFamilyName);
    }, function () {
        cc.warnID(4933, fontFamilyName);
        callback(null, fontFamilyName);
    });
}

cc.loader.addDownloadHandlers({
    // JS
    'js': downloadScript,
    'jsc': downloadScript,

    // Images
    'png': downloadImage,
    'jpg': downloadImage,
    'bmp': downloadImage,
    'jpeg': downloadImage,
    'gif': downloadImage,
    'ico': downloadImage,
    'tiff': downloadImage,
    'webp': downloadImage,
    'image': downloadImage,
    'pvr': downloadImage,
    'etc': downloadImage,

    // Audio
    'mp3': downloadAudio,
    'ogg': downloadAudio,
    'wav': downloadAudio,
    'mp4': downloadAudio,
    'm4a': downloadAudio,

    // Text
    'txt': downloadText,
    'xml': downloadText,
    'vsh': downloadText,
    'fsh': downloadText,
    'atlas': downloadText,

    'tmx': downloadText,
    'tsx': downloadText,

    'json': downloadText,
    'ExportJson': downloadText,
    'plist': downloadText,

    'fnt': downloadText,

    'binary': downloadBinary,
    'bin': downloadBinary,
    'dbbin': downloadBinary,

    'default': downloadText
});

cc.loader.addLoadHandlers({
    // Font
    'font': loadFont,
    'eot': loadFont,
    'ttf': loadFont,
    'woff': loadFont,
    'svg': loadFont,
    'ttc': loadFont,

    // Audio
    'mp3': loadAudio,
    'ogg': loadAudio,
    'wav': loadAudio,
    'mp4': loadAudio,
    'm4a': loadAudio
});

},{}],9:[function(require,module,exports){
/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
'use strict';

var math = cc.vmath;

var _typedArray_temp = new Float32Array(16);
var _mat4_temp = math.mat4.create();

function _mat4ToArray(typedArray, mat4) {
    typedArray[0] = mat4.m00;
    typedArray[1] = mat4.m01;
    typedArray[2] = mat4.m02;
    typedArray[3] = mat4.m03;
    typedArray[4] = mat4.m04;
    typedArray[5] = mat4.m05;
    typedArray[6] = mat4.m06;
    typedArray[7] = mat4.m07;
    typedArray[8] = mat4.m08;
    typedArray[9] = mat4.m09;
    typedArray[10] = mat4.m10;
    typedArray[11] = mat4.m11;
    typedArray[12] = mat4.m12;
    typedArray[13] = mat4.m13;
    typedArray[14] = mat4.m14;
    typedArray[15] = mat4.m15;
}

cc.Node.prototype.getWorldRTInAB = function () {
    this.getWorldRT(_mat4_temp);
    _mat4ToArray(_typedArray_temp, _mat4_temp);
    return _typedArray_temp;
};

cc.Node.prototype.getWorldMatrixInAB = function () {
    this._updateWorldMatrix();
    _mat4ToArray(_typedArray_temp, this._worldMatrix);
    return _typedArray_temp;
};

},{}],10:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

// JS to Native bridges
if (window.JavascriptJavaBridge && cc.sys.os == cc.sys.OS_ANDROID) {
  jsb.reflection = new JavascriptJavaBridge();
  cc.sys.capabilities["keyboard"] = true;
} else if (window.JavaScriptObjCBridge && (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX)) {
  jsb.reflection = new JavaScriptObjCBridge();
}

},{}],11:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
(function () {
    if (window.sp === undefined || window.spine === undefined || window.middleware === undefined) return;

    var Skeleton = sp.Skeleton;
    var renderer = cc.renderer;
    var renderEngine = renderer.renderEngine;
    var gfx = renderEngine.gfx;
    var VertexFormat = gfx.VertexFormat;
    var SpineMaterial = renderEngine.SpineMaterial;
    var assembler = Skeleton._assembler;

    var _slotColor = cc.color(0, 0, 255, 255);
    var _boneColor = cc.color(255, 0, 0, 255);
    var _originColor = cc.color(0, 255, 0, 255);

    var _getSlotMaterial = function _getSlotMaterial(comp, tex, src, dst) {

        var key = tex.url + src + dst;

        comp._material = comp._material || new SpineMaterial();
        var baseMaterial = comp._material;
        var materialCache = comp._materialCache;
        var material = materialCache[key];

        if (!material) {

            var baseKey = baseMaterial._hash;
            if (!materialCache[baseKey]) {
                material = baseMaterial;
            } else {
                material = baseMaterial.clone();
            }

            material.useModel = true;
            // update texture
            material.texture = tex;
            material.useTint = comp.useTint;

            // update blend function
            var pass = material._mainTech.passes[0];
            pass.setBlend(gfx.BLEND_FUNC_ADD, src, dst, gfx.BLEND_FUNC_ADD, src, dst);

            if (materialCache[material._hash]) {
                delete materialCache[material._hash];
            }
            materialCache[key] = material;
            material.updateHash(key);
        } else if (material.texture !== tex) {
            if (materialCache[material._hash]) {
                delete materialCache[material._hash];
            }
            material.texture = tex;
            material.updateHash(key);
        }
        return material;
    };

    // native enable useModel
    assembler.useModel = true;

    assembler.genRenderDatas = function (comp, batchData) {};

    assembler.updateRenderData = function (comp, batchData) {};

    assembler.renderIA = function (comp, renderer) {
        var nativeSkeleton = comp._skeleton;
        if (!nativeSkeleton) return;

        var node = comp.node;
        if (!node) return;

        var renderInfoOffset = comp._renderInfoOffset;
        if (!renderInfoOffset) return;

        if (comp.__preColor__ === undefined || !node.color.equals(comp.__preColor__)) {
            nativeSkeleton.setColor(node.color);
            comp.__preColor__ = node.color;
        }

        var iaPool = comp._iaPool;
        var poolIdx = 0;

        var infoOffset = renderInfoOffset[0];
        var renderInfoMgr = middleware.renderInfoMgr;
        var renderInfo = renderInfoMgr.renderInfo;

        var materialIdx = 0,
            realTextureIndex = void 0,
            realTexture = void 0;
        // verify render border
        var border = renderInfo[infoOffset + materialIdx++];
        if (border !== 0xffffffff) return;

        var matLen = renderInfo[infoOffset + materialIdx++];
        var useTint = comp.useTint;

        if (matLen == 0) return;

        for (var index = 0; index < matLen; index++) {
            realTextureIndex = renderInfo[infoOffset + materialIdx++];
            realTexture = comp.skeletonData.textures[realTextureIndex];
            if (!realTexture) return;

            var material = _getSlotMaterial(comp, realTexture, renderInfo[infoOffset + materialIdx++], renderInfo[infoOffset + materialIdx++]);

            var glIB = renderInfo[infoOffset + materialIdx++];
            var glVB = renderInfo[infoOffset + materialIdx++];
            var indiceOffset = renderInfo[infoOffset + materialIdx++];
            var segmentCount = renderInfo[infoOffset + materialIdx++];

            var ia = iaPool[poolIdx];
            if (!ia) {
                ia = new middleware.MiddlewareIA();
                iaPool[poolIdx] = ia;
            }
            ia._start = indiceOffset;
            ia._count = segmentCount;
            ia.setVertexFormat(useTint ? VertexFormat.XY_UV_Two_Color : VertexFormat.XY_UV_Color);
            ia.setGLIBID(glIB);
            ia.setGLVBID(glVB);

            poolIdx++;

            comp._iaRenderData.ia = ia;
            comp._iaRenderData.material = material;
            renderer._flushIA(comp._iaRenderData);
        }

        if ((comp.debugBones || comp.debugSlots) && comp._debugRenderer) {

            var graphics = comp._debugRenderer;
            graphics.clear();

            comp._debugData = comp._debugData || nativeSkeleton.getDebugData();
            var debugData = comp._debugData;
            var debugIdx = 0;

            if (comp.debugSlots) {
                // Debug Slot
                graphics.strokeColor = _slotColor;
                graphics.lineWidth = 5;

                var debugSlotsLen = debugData[debugIdx++];
                for (var i = 0; i < debugSlotsLen; i += 8) {
                    graphics.moveTo(debugData[debugIdx++], debugData[debugIdx++]);
                    graphics.lineTo(debugData[debugIdx++], debugData[debugIdx++]);
                    graphics.lineTo(debugData[debugIdx++], debugData[debugIdx++]);
                    graphics.lineTo(debugData[debugIdx++], debugData[debugIdx++]);
                    graphics.close();
                    graphics.stroke();
                }
            }

            if (comp.debugBones) {

                graphics.lineWidth = 5;
                graphics.strokeColor = _boneColor;
                graphics.fillColor = _slotColor; // Root bone color is same as slot color.

                var debugBonesLen = debugData[debugIdx++];
                for (var _i = 0; _i < debugBonesLen; _i += 4) {
                    var bx = debugData[debugIdx++];
                    var by = debugData[debugIdx++];
                    var x = debugData[debugIdx++];
                    var y = debugData[debugIdx++];

                    // Bone lengths.
                    graphics.moveTo(bx, by);
                    graphics.lineTo(x, y);
                    graphics.stroke();

                    // Bone origins.
                    graphics.circle(bx, by, Math.PI * 2);
                    graphics.fill();
                    if (_i === 0) {
                        graphics.fillColor = _originColor;
                    }
                }
            }
        }
    };
})();

},{}],12:[function(require,module,exports){
'use strict';

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

(function () {
    if (window.sp === undefined || window.spine === undefined || window.middleware === undefined) return;

    // spine global time scale
    Object.defineProperty(sp, 'timeScale', {
        get: function get() {
            return this._timeScale;
        },
        set: function set(value) {
            this._timeScale = value;
            spine.SpineAnimation.setGlobalTimeScale(value);
        },

        configurable: true
    });

    var skeletonDataProto = sp.SkeletonData.prototype;
    skeletonDataProto.destroy = function () {
        this._jsbTextures = null;
        spine.disposeSkeletonData(this._uuid);
        cc.Asset.prototype.destroy.call(this);
    };

    skeletonDataProto.init = function () {
        if (this._inited) return;

        var uuid = this._uuid;
        if (!uuid) {
            cc.errorID(7504);
            return;
        }
        var atlasText = this.atlasText;
        if (!atlasText) {
            cc.errorID(7508, this.name);
            return;
        }
        var texValues = this.textures;
        var texKeys = this.textureNames;
        if (!(texValues && texValues.length > 0 && texKeys && texKeys.length > 0)) {
            cc.errorID(7507, this.name);
            return;
        }
        var jsbTextures = {};
        for (var i = 0; i < texValues.length; ++i) {
            var spTex = new middleware.Texture2D();
            spTex.setRealTextureIndex(i);
            spTex.setPixelsWide(texValues[i].width);
            spTex.setPixelsHigh(texValues[i].height);
            spTex.setTexParamCallback(function (texIdx, minFilter, magFilter, wrapS, warpT) {
                texValues[texIdx].setFilters(minFilter, magFilter);
                texValues[texIdx].setWrapMode(wrapS, warpT);
            }.bind(this));
            jsbTextures[texKeys[i]] = spTex;
        }
        this._jsbTextures = jsbTextures;
        spine.initSkeletonData(uuid, this.skeletonJsonStr, atlasText, jsbTextures, this.scale);

        this._inited = true;
    };

    var RenderFlow = cc.RenderFlow;
    var renderer = cc.renderer;
    var renderEngine = renderer.renderEngine;

    var animation = spine.SpineAnimation.prototype;
    // The methods are added to be compatibility with old versions.
    animation.setCompleteListener = function (listener) {
        this._compeleteListener = listener;
        this.setCompleteListenerNative(function (trackEntry) {
            var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
            this._compeleteListener(trackEntry, loopCount);
        });
    };

    // Temporary solution before upgrade the Spine API
    animation.setAnimationListener = function (target, callback) {
        this._target = target;
        this._callback = callback;

        this.setStartListener(function (trackEntry) {
            if (this._target && this._callback) {
                this._callback.call(this._target, this, trackEntry, sp.AnimationEventType.START, null, 0);
            }
        });

        this.setInterruptListener(function (trackEntry) {
            if (this._target && this._callback) {
                this._callback.call(this._target, this, trackEntry, sp.AnimationEventType.INTERRUPT, null, 0);
            }
        });

        this.setEndListener(function (trackEntry) {
            if (this._target && this._callback) {
                this._callback.call(this._target, this, trackEntry, sp.AnimationEventType.END, null, 0);
            }
        });

        this.setDisposeListener(function (trackEntry) {
            if (this._target && this._callback) {
                this._callback.call(this._target, this, trackEntry, sp.AnimationEventType.DISPOSE, null, 0);
            }
        });

        this.setCompleteListener(function (trackEntry, loopCount) {
            if (this._target && this._callback) {
                this._callback.call(this._target, this, trackEntry, sp.AnimationEventType.COMPLETE, null, loopCount);
            }
        });

        this.setEventListener(function (trackEntry, event) {
            if (this._target && this._callback) {
                this._callback.call(this._target, this, trackEntry, sp.AnimationEventType.EVENT, event, 0);
            }
        });
    };

    var skeleton = sp.Skeleton.prototype;
    Object.defineProperty(skeleton, 'paused', {
        get: function get() {
            return this._paused || false;
        },
        set: function set(value) {
            this._paused = value;
            if (this._skeleton) {
                this._skeleton.paused(value);
            }
        }
    });

    Object.defineProperty(skeleton, 'debugSlots', {
        get: function get() {
            return this._debugSlots || false;
        },
        set: function set(value) {
            this._debugSlots = value;
            this._updateDebugDraw();
            if (this._skeleton) {
                this._skeleton.setDebugSlotsEnabled(this._debugSlots);
            }
        }
    });

    Object.defineProperty(skeleton, 'debugBones', {
        get: function get() {
            return this._debugBones || false;
        },
        set: function set(value) {
            this._debugBones = value;
            this._updateDebugDraw();
            if (this._skeleton) {
                this._skeleton.setDebugBonesEnabled(this._debugBones);
            }
        }
    });

    Object.defineProperty(skeleton, "premultipliedAlpha", {
        get: function get() {
            if (this._premultipliedAlpha === undefined) {
                return true;
            }
            return this._premultipliedAlpha;
        },
        set: function set(value) {
            this._premultipliedAlpha = value;
            if (this._skeleton) {
                this._skeleton.setOpacityModifyRGB(this._premultipliedAlpha);
            }
        }
    });

    Object.defineProperty(skeleton, "timeScale", {
        get: function get() {
            if (this._timeScale === undefined) return 1.0;
            return this._timeScale;
        },
        set: function set(value) {
            this._timeScale = value;
            if (this._skeleton) {
                this._skeleton.setTimeScale(this._timeScale);
            }
        }
    });

    Object.defineProperty(skeleton, "useTint", {
        get: function get() {
            return this._useTint || false;
        },
        set: function set(value) {
            this._useTint = value;
            // Update cache material useTint property
            var cache = this._materialCache;
            for (var mKey in cache) {
                var material = cache[mKey];
                if (material) {
                    material.useTint = this._useTint;
                }
            }
            if (this._skeleton) {
                this._skeleton.setUseTint(this._useTint);
            }
        }
    });

    var _onLoad = skeleton.onLoad;
    skeleton.onLoad = function () {
        if (_onLoad) {
            _onLoad.call(this);
        }

        this._iaPool = [];
        this._iaPool.push(new middleware.MiddlewareIA());

        this._iaRenderData = new renderEngine.IARenderData();
    };

    // Shield use batch in native
    skeleton._updateBatch = function () {};

    skeleton.setSkeletonData = function (skeletonData) {
        null != skeletonData.width && null != skeletonData.height && this.node.setContentSize(skeletonData.width, skeletonData.height);

        var uuid = skeletonData._uuid;
        if (!uuid) {
            cc.errorID(7504);
            return;
        }

        if (this._skeleton) {
            this._skeleton.stopSchedule();
            this._skeleton._comp = null;
            this._skeleton = null;
        }

        var skeletonAni = new spine.SpineAnimation();
        try {
            spine.initSkeletonRenderer(skeletonAni, uuid);
        } catch (e) {
            cc._throw(e);
            return;
        }
        this._skeleton = skeletonAni;
        this._skeleton._comp = this;

        this._skeleton.setOpacityModifyRGB(this.premultipliedAlpha);
        this._skeleton.setDebugSlotsEnabled(this.debugSlots);
        this._skeleton.setDebugBonesEnabled(this.debugBones);
        this._skeleton.setUseTint(this.useTint);
        this._skeleton.setTimeScale(this.timeScale);

        this._renderInfoOffset = this._skeleton.getRenderInfoOffset();

        // init skeleton listener
        this._startListener && this.setStartListener(this._startListener);
        this._endListener && this.setEndListener(this._endListener);
        this._completeListener && this.setCompleteListener(this._completeListener);
        this._eventListener && this.setEventListener(this._eventListener);
        this._interruptListener && this.setInterruptListener(this._interruptListener);
        this._disposeListener && this.setDisposeListener(this._disposeListener);
    };

    skeleton.setAnimationStateData = function (stateData) {
        if (this._skeleton) {
            return this._skeleton.setAnimationStateData(stateData);
        }
    };

    var _onEnable = skeleton.onEnable;
    skeleton.onEnable = function () {
        _onEnable.call(this);
        if (this._skeleton) {
            this._skeleton.onEnable();
        }
        this.node._renderFlag &= ~RenderFlow.FLAG_UPDATE_RENDER_DATA;
        this.node._renderFlag &= ~RenderFlow.FLAG_RENDER;
        this.node._renderFlag |= RenderFlow.FLAG_CUSTOM_IA_RENDER;
    };

    var _onDisable = skeleton.onDisable;
    skeleton.onDisable = function () {
        _onDisable.call(this);
        if (this._skeleton) {
            this._skeleton.onDisable();
        }
    };

    skeleton.update = undefined;

    skeleton.updateWorldTransform = function () {
        this._skeleton && this._skeleton.updateWorldTransform();
    };

    skeleton.setToSetupPose = function () {
        this._skeleton && this._skeleton.setToSetupPose();
    };

    skeleton.setBonesToSetupPose = function () {
        this._skeleton && this._skeleton.setBonesToSetupPose();
    };

    skeleton.setSlotsToSetupPose = function () {
        this._skeleton && this._skeleton.setSlotsToSetupPose();
    };

    skeleton.setSlotsRange = function (startSlotIndex, endSlotIndex) {
        this._skeleton && this._skeleton.setSlotsRange(startSlotIndex, endSlotIndex);
    };

    skeleton.findBone = function (boneName) {
        if (this._skeleton) return this._skeleton.findBone(boneName);
        return null;
    };

    skeleton.findSlot = function (slotName) {
        if (this._skeleton) return this._skeleton.findSlot(slotName);
        return null;
    };

    skeleton.setSkin = function (skinName) {
        if (this._skeleton) return this._skeleton.setSkin(skinName);
        return null;
    };

    skeleton.getAttachment = function (slotName, attachmentName) {
        if (this._skeleton) return this._skeleton.getAttachment(slotName, attachmentName);
        return null;
    };

    skeleton.setAttachment = function (slotName, attachmentName) {
        this._skeleton && this._skeleton.setAttachment(slotName, attachmentName);
    };

    skeleton.getTextureAtlas = function (regionAttachment) {
        cc.warn("sp.Skeleton getTextureAtlas not support in native");
        return null;
    };

    skeleton.setMix = function (fromAnimation, toAnimation, duration) {
        if (this._skeleton) {
            this._skeleton.setMix(fromAnimation, toAnimation, duration);
        }
    };

    skeleton.setAnimation = function (trackIndex, name, loop) {
        if (this._skeleton) {
            return this._skeleton.setAnimation(trackIndex, name, loop);
        }
        return null;
    };

    skeleton.addAnimation = function (trackIndex, name, loop, delay) {
        if (this._skeleton) {
            delay = delay || 0;
            return this._skeleton.addAnimation(trackIndex, name, loop, delay);
        }
        return null;
    };

    skeleton.findAnimation = function (name) {
        if (this._skeleton) return this._skeleton.findAnimation(name);
        return null;
    };

    skeleton.getCurrent = function (trackIndex) {
        if (this._skeleton) {
            return this._skeleton.getCurrent(trackIndex);
        }
        return null;
    };

    skeleton.clearTracks = function () {
        if (this._skeleton) {
            this._skeleton.clearTracks();
        }
    };

    skeleton.clearTrack = function (trackIndex) {
        if (this._skeleton) {
            this._skeleton.clearTrack(trackIndex);
        }
    };

    skeleton.setStartListener = function (listener) {
        this._startListener = listener;
        if (this._skeleton) {
            this._skeleton.setStartListener(listener);
        }
    };

    skeleton.setInterruptListener = function (listener) {
        this._interruptListener = listener;
        if (this._skeleton) {
            this._skeleton.setInterruptListener(listener);
        }
    };

    skeleton.setEndListener = function (listener) {
        this._endListener = listener;
        if (this._skeleton) {
            this._skeleton.setEndListener(listener);
        }
    };

    skeleton.setDisposeListener = function (listener) {
        this._disposeListener = listener;
        if (this._skeleton) {
            this._skeleton.setDisposeListener(listener);
        }
    };

    skeleton.setCompleteListener = function (listener) {
        this._completeListener = listener;
        if (this._skeleton) {
            this._skeleton.setCompleteListener(listener);
        }
    };

    skeleton.setEventListener = function (listener) {
        this._eventListener = listener;
        if (this._skeleton) {
            this._skeleton.setEventListener(listener);
        }
    };

    skeleton.setTrackStartListener = function (entry, listener) {
        if (this._skeleton) {
            this._skeleton.setTrackStartListener(entry, listener);
        }
    };

    skeleton.setTrackInterruptListener = function (entry, listener) {
        if (this._skeleton) {
            this._skeleton.setTrackInterruptListener(entry, listener);
        }
    };

    skeleton.setTrackEndListener = function (entry, listener) {
        if (this._skeleton) {
            this._skeleton.setTrackEndListener(entry, listener);
        }
    };

    skeleton.setTrackDisposeListener = function (entry, listener) {
        if (this._skeleton) {
            this._skeleton.setTrackDisposeListener(entry, listener);
        }
    };

    skeleton.setTrackCompleteListener = function (entry, listener) {
        if (this._skeleton) {
            this._skeleton.setTrackCompleteListener(entry, listener);
        }
    };

    skeleton.setTrackEventListener = function (entry, listener) {
        if (this._skeleton) {
            this._skeleton.setTrackEventListener(entry, listener);
        }
    };

    skeleton.getState = function () {
        if (this._skeleton) {
            return this._skeleton.getState();
        }
    };

    skeleton._ensureListener = function () {
        cc.warn("sp.Skeleton _ensureListener not need in native");
    };

    skeleton._updateSkeletonData = function () {
        if (this.skeletonData) {
            this.skeletonData.init();
            this.setSkeletonData(this.skeletonData);
            this.defaultSkin && this._skeleton.setSkin(this.defaultSkin);
            this.animation = this.defaultAnimation;
        }
    };

    var _onDestroy = skeleton.onDestroy;
    skeleton.onDestroy = function () {
        _onDestroy.call(this);
        if (this._skeleton) {
            this._skeleton.stopSchedule();
            this._skeleton._comp = null;
            this._skeleton = null;
        }
        this._materialCache = null;
    };
})();

},{}],13:[function(require,module,exports){
/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
'use strict';

var sys = cc.sys;

sys.getNetworkType = jsb.Device.getNetworkType;
sys.getBatteryLevel = jsb.Device.getBatteryLevel;
sys.garbageCollect = jsb.garbageCollect;
sys.restartVM = __restartVM;
sys.isObjectValid = __isObjectValid;

sys.getSafeAreaRect = function () {
  // x(top), y(left), z(bottom), w(right)
  var edge = jsb.Device.getSafeAreaEdge();
  var screenSize = cc.view.getFrameSize();

  // Get leftBottom and rightTop point in UI coordinates
  var leftBottom = new cc.Vec2(edge.y, screenSize.height - edge.z);
  var rightTop = new cc.Vec2(screenSize.width - edge.w, edge.x);

  // Returns the real location in view.
  var relatedPos = { left: 0, top: 0, width: screenSize.width, height: screenSize.height };
  cc.view.convertToLocationInView(leftBottom.x, leftBottom.y, relatedPos, leftBottom);
  cc.view.convertToLocationInView(rightTop.x, rightTop.y, relatedPos, rightTop);
  // convert view point to design resolution size
  cc.view._convertPointWithScale(leftBottom);
  cc.view._convertPointWithScale(rightTop);

  return cc.rect(leftBottom.x, leftBottom.y, rightTop.x - leftBottom.x, rightTop.y - leftBottom.y);
};

},{}],14:[function(require,module,exports){
"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

(function () {
    if (!(cc && cc.VideoPlayer && cc.VideoPlayer.Impl)) {
        return;
    }

    var math = cc.vmath;
    var _mat4_temp = math.mat4.create();

    var _impl = cc.VideoPlayer.Impl;
    var _p = cc.VideoPlayer.Impl.prototype;

    _p._bindEvent = function () {
        var video = this._video,
            self = this;

        if (!video) {
            return;
        }

        //binding event
        var cbs = this.__eventListeners;
        cbs.loadedmetadata = function () {
            self._loadedmeta = true;
            self._dispatchEvent(_impl.EventType.META_LOADED);
        };
        cbs.ended = function () {
            if (self._video !== video) return;
            self._playing = false;
            self._dispatchEvent(_impl.EventType.COMPLETED);
        };
        cbs.play = function () {
            if (self._video !== video) return;
            self._playing = true;
            self._dispatchEvent(_impl.EventType.PLAYING);
        };
        cbs.pause = function () {
            if (self._ignorePause || self._video !== video) return;
            self._playing = false;
            self._dispatchEvent(_impl.EventType.PAUSED);
        };
        cbs.click = function () {
            self._dispatchEvent(_impl.EventType.CLICKED);
        };
        cbs.stoped = function () {
            self._dispatchEvent(_impl.EventType.STOPPED);
            self._ignorePause = false;
        };

        video.addEventListener("loadedmetadata", cbs.loadedmetadata);
        video.addEventListener("ended", cbs.ended);
        video.addEventListener("play", cbs.play);
        video.addEventListener("pause", cbs.pause);
        video.addEventListener("click", cbs.click);
        video.addEventListener("stoped", cbs.stoped);

        function onCanPlay() {
            if (this._loaded) return;

            this._loaded = true;
            this._dispatchEvent(_impl.EventType.READY_TO_PLAY);
            this._updateVisibility();
        }

        cbs.onCanPlay = onCanPlay.bind(this);
        video.addEventListener('canplay', cbs.onCanPlay);
        video.addEventListener('canplaythrough', cbs.onCanPlay);
        video.addEventListener('suspend', cbs.onCanPlay);
    };

    _p._updateVisibility = function () {
        if (!this._video) return;
        var video = this._video;
        if (this._visible) {
            this._video.setVisible(true);
        } else {
            this._video.setVisible(false);
            video.pause();
            this._playing = false;
        }
        this._forceUpdate = true;
    };

    _p._updateSize = function (width, height) {};

    _p.createDomElementIfNeeded = function () {
        if (!jsb.VideoPlayer) {
            cc.warn('VideoPlayer only supports mobile platform.');
            return null;
        }

        if (!this._video) {
            this._video = new jsb.VideoPlayer();
        }
    };

    _p.removeDom = function () {
        var video = this._video;
        if (video) {
            this._video.stop();
            this._video.setVisible(false);

            var cbs = this.__eventListeners;

            cbs.loadedmetadata = null;
            cbs.ended = null;
            cbs.play = null;
            cbs.pause = null;
            cbs.click = null;
            cbs.onCanPlay = null;
        }

        this._video = null;
        this._url = "";
    };

    _p.setURL = function (path) {
        var source = void 0,
            extname = void 0;

        if (this._url === path) {
            return;
        }

        this.removeDom();

        this._url = path;
        this.createDomElementIfNeeded();
        this._bindEvent();

        var video = this._video;
        if (!video) {
            return;
        }

        video.setVisible(this._visible);

        this._loaded = false;
        this._played = false;
        this._playing = false;
        this._loadedmeta = false;

        video.setURL(this._url);
    };

    _p.getURL = function () {
        return this._url;
    };

    _p.play = function () {
        var video = this._video;
        if (!video || !this._visible || this._playing) return;

        video.play();
        this._playing = true;
    };

    _p.pause = function () {
        var video = this._video;
        if (!this._playing || !video) return;

        video.pause();
        this._playing = false;
    };

    _p.resume = function () {
        var video = this._video;
        if (!this._playing || !video) return;

        video.resume();
        this._playing = true;
    };

    _p.stop = function () {
        var video = this._video;
        if (!video || !this._visible) return;
        this._ignorePause = true;

        video.stop();
        this._playing = false;
    };

    _p.setVolume = function (volume) {};

    _p.seekTo = function (time) {
        var video = this._video;
        if (!video) return;

        if (this._loaded) {
            video.seekTo(time);
        } else {
            var cb = function cb() {
                video.seekTo(time);
            };
            video.addEventListener(_impl._polyfill.event, cb);
        }
        if (_impl._polyfill.autoplayAfterOperation && this.isPlaying()) {
            setTimeout(function () {
                video.play();
            }, 20);
        }
    };

    _p.isPlaying = function () {
        return this._playing;
    };

    _p.duration = function () {
        var video = this._video;
        var duration = -1;
        if (!video) return duration;

        duration = video.duration();
        if (duration <= 0) {
            cc.logID(7702);
        }

        return duration;
    };

    _p.currentTime = function () {
        var video = this._video;
        if (!video) return -1;

        return video.currentTime();
    };

    _p.setKeepAspectRatioEnabled = function (isEnabled) {
        if (!this._video) {
            return false;
        }
        return this._video.setKeepAspectRatioEnabled(isEnabled);
    };

    _p.isKeepAspectRatioEnabled = function () {
        if (!this._video) {
            return false;
        }
        return this._video.isKeepAspectRatioEnabled();
    };

    _p.isFullScreenEnabled = function () {
        return this._fullScreenEnabled;
    };

    _p.setEventListener = function (event, callback) {
        this._EventList[event] = callback;
    };

    _p.removeEventListener = function (event) {
        this._EventList[event] = null;
    };

    _p._dispatchEvent = function (event) {
        var callback = this._EventList[event];
        if (callback) callback.call(this, this, this._video.src);
    };

    _p.onPlayEvent = function () {
        var callback = this._EventList[_impl.EventType.PLAYING];
        callback.call(this, this, this._video.src);
    };

    _p.enable = function () {
        var list = _impl.elements;
        if (list.indexOf(this) === -1) list.push(this);
        this.setVisible(true);
    };

    _p.disable = function () {
        var list = _impl.elements;
        var index = list.indexOf(this);
        if (index !== -1) list.splice(index, 1);
        this.setVisible(false);
    };

    _p.destroy = function () {
        this.disable();
        this.removeDom();
    };

    _p.setVisible = function (visible) {
        if (this._visible !== visible) {
            this._visible = !!visible;
            this._updateVisibility();
        }
    };

    _p.setFullScreenEnabled = function (enable) {
        var video = this._video;
        if (!video) {
            return;
        }
        this._fullScreenEnabled = enable;
        video.setFullScreenEnabled(enable);
    };

    _p.updateMatrix = function (node) {
        if (!this._video || !this._visible) return;

        node.getWorldMatrix(_mat4_temp);
        if (!this._forceUpdate && this._m00 === _mat4_temp.m00 && this._m01 === _mat4_temp.m01 && this._m04 === _mat4_temp.m04 && this._m05 === _mat4_temp.m05 && this._m12 === _mat4_temp.m12 && this._m13 === _mat4_temp.m13 && this._w === node._contentSize.width && this._h === node._contentSize.height) {
            return;
        }

        // update matrix cache
        this._m00 = _mat4_temp.m00;
        this._m01 = _mat4_temp.m01;
        this._m04 = _mat4_temp.m04;
        this._m05 = _mat4_temp.m05;
        this._m12 = _mat4_temp.m12;
        this._m13 = _mat4_temp.m13;
        this._w = node._contentSize.width;
        this._h = node._contentSize.height;

        var scaleX = cc.view._scaleX,
            scaleY = cc.view._scaleY;
        var dpr = cc.view._devicePixelRatio;

        scaleX /= dpr;
        scaleY /= dpr;

        var container = cc.game.container;
        var a = _mat4_temp.m00 * scaleX,
            b = _mat4_temp.m01,
            c = _mat4_temp.m04,
            d = _mat4_temp.m05 * scaleY;

        var offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
        var offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
        var w = void 0,
            h = void 0;
        if (_impl._polyfill.zoomInvalid) {
            this._updateSize(this._w * a, this._h * d);
            a = 1;
            d = 1;
            w = this._w * scaleX;
            h = this._h * scaleY;
        } else {
            this._updateSize(this._w, this._h);
            w = this._w * scaleX;
            h = this._h * scaleY;
        }

        var appx = w * _mat4_temp.m00 * node._anchorPoint.x;
        var appy = h * _mat4_temp.m05 * node._anchorPoint.y;

        var viewport = cc.view._viewportRect;
        offsetX += viewport.x / dpr;
        offsetY += viewport.y / dpr;

        var tx = _mat4_temp.m12 * scaleX - appx + offsetX,
            ty = _mat4_temp.m13 * scaleY - appy + offsetY;

        var height = cc.view.getFrameSize().height;
        this._video.setFrame(tx, height - h - ty, this._w * a, this._h * d);
    };

    _impl.EventType = {
        PLAYING: 0,
        PAUSED: 1,
        STOPPED: 2,
        COMPLETED: 3,
        META_LOADED: 4,
        CLICKED: 5,
        READY_TO_PLAY: 6
    };

    // video 队列，所有 vidoe 在 onEnter 的时候都会插入这个队列
    _impl.elements = [];
    // video 在 game_hide 事件中被自动暂停的队列，用于回复的时候重新开始播放
    _impl.pauseElements = [];

    cc.game.on(cc.game.EVENT_HIDE, function () {
        var list = _impl.elements;
        for (var element, i = 0; i < list.length; i++) {
            element = list[i];
            if (element.isPlaying()) {
                element.pause();
                _impl.pauseElements.push(element);
            }
        }
    });

    cc.game.on(cc.game.EVENT_SHOW, function () {
        var list = _impl.pauseElements;
        var element = list.pop();
        while (element) {
            element.play();
            element = list.pop();
        }
    });
})();

},{}],15:[function(require,module,exports){
'use strict';

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

(function () {
    if (!(cc && cc.WebView && cc.WebView.Impl)) {
        return;
    }

    var math = cc.vmath;
    var _mat4_temp = math.mat4.create();

    cc.WebView.Impl = cc.Class({
        extends: cc.WebView.Impl,
        ctor: function ctor() {
            // keep webview data
            this.jsCallback = null;
            this.interfaceSchema = null;
        }
    });
    var _impl = cc.WebView.Impl;
    var _p = cc.WebView.Impl.prototype;

    _p._updateVisibility = function () {
        if (!this._iframe) return;
        this._iframe.setVisible(this._visible);
        this._forceUpdate = true;
    };
    _p._updateSize = function (w, h) {};
    _p._initEvent = function () {
        var iframe = this._iframe;
        if (iframe) {
            var cbs = this.__eventListeners,
                self = this;
            cbs.load = function () {
                self._dispatchEvent(_impl.EventType.LOADED);
            };
            cbs.error = function () {
                self._dispatchEvent(_impl.EventType.ERROR);
            };
            // native event callback
            this._iframe.setOnDidFinishLoading(cbs.load);
            this._iframe.setOnDidFailLoading(cbs.error);
        }
    };
    _p._initExtraSetting = function () {
        this.jsCallback && this.setOnJSCallback(this.jsCallback);
        this.interfaceSchema && this.setJavascriptInterfaceScheme(this.interfaceSchema);
        // remove obj
        this.jsCallback = null;
        this.interfaceSchema = null;
    };
    _p._setOpacity = function (opacity) {
        var iframe = this._iframe;
        if (iframe && iframe.style) {
            iframe.style.opacity = opacity / 255;
            // TODO, add impl to Native
        }
    };
    _p.createDomElementIfNeeded = function (w, h) {
        if (!jsb.WebView) {
            cc.warn('WebView only supports mobile platform.');
            return;
        }
        if (!this._iframe) {
            this._iframe = jsb.WebView.create();
            this._initEvent();
            this._initExtraSetting();
        }
    };
    _p.removeDom = function () {
        var iframe = this._iframe;
        if (iframe) {
            var cbs = this.__eventListeners;
            cbs.load = null;
            cbs.error = null;
            this._iframe = null;
        }
    };

    _p.setOnJSCallback = function (callback) {
        var iframe = this._iframe;
        if (iframe) {
            iframe.setOnJSCallback(callback);
        } else {
            this.jsCallback = callback;
        }
    };
    _p.setJavascriptInterfaceScheme = function (scheme) {
        var iframe = this._iframe;
        if (iframe) {
            iframe.setJavascriptInterfaceScheme(scheme);
        } else {
            this.interfaceSchema = scheme;
        }
    };
    _p.loadData = function (data, MIMEType, encoding, baseURL) {
        var iframe = this._iframe;
        if (iframe) {
            iframe.loadData(data, MIMEType, encoding, baseURL);
        }
    };
    _p.loadHTMLString = function (string, baseURL) {
        var iframe = this._iframe;
        if (iframe) {
            iframe.loadHTMLString(string, baseURL);
        }
    };
    /**
     * Load an URL
     * @param {String} url
     */
    _p.loadURL = function (url) {
        var iframe = this._iframe;
        if (iframe) {
            iframe.src = url;
            iframe.loadURL(url);
            this._dispatchEvent(_impl.EventType.LOADING);
        }
    };
    /**
     * Stop loading
     */
    _p.stopLoading = function () {
        cc.logID(7800);
    };
    /**
     * Reload the WebView
     */
    _p.reload = function () {
        var iframe = this._iframe;
        if (iframe) {
            iframe.reload();
        }
    };
    /**
     * Determine whether to go back
     */
    _p.canGoBack = function () {
        var iframe = this._iframe;
        if (iframe) {
            return iframe.canGoBack();
        }
    };
    /**
     * Determine whether to go forward
     */
    _p.canGoForward = function () {
        var iframe = this._iframe;
        if (iframe) {
            return iframe.canGoForward();
        }
    };
    /**
     * go back
     */
    _p.goBack = function () {
        var iframe = this._iframe;
        if (iframe) {
            return iframe.goBack();
        }
    };
    /**
     * go forward
     */
    _p.goForward = function () {
        var iframe = this._iframe;
        if (iframe) {
            return iframe.goForward();
        }
    };
    /**
     * In the webview execution within a period of js string
     * @param {String} str
     */
    _p.evaluateJS = function (str) {
        var iframe = this._iframe;
        if (iframe) {
            return iframe.evaluateJS();
        }
    };
    /**
     * Limited scale
     */
    _p.setScalesPageToFit = function () {
        var iframe = this._iframe;
        if (iframe) {
            return iframe.setScalesPageToFit();
        }
    };
    /**
     * The binding event
     * @param {_impl.EventType} event
     * @param {Function} callback
     */
    _p.setEventListener = function (event, callback) {
        this._EventList[event] = callback;
    };
    /**
     * Delete events
     * @param {_impl.EventType} event
     */
    _p.removeEventListener = function (event) {
        this._EventList[event] = null;
    };
    _p._dispatchEvent = function (event) {
        var callback = this._EventList[event];
        if (callback) callback.call(this, this, this._iframe.src);
    };
    _p._createRenderCmd = function () {
        return new _impl.RenderCmd(this);
    };
    _p.destroy = function () {
        this.removeDom();
    };
    _p.setVisible = function (visible) {
        if (this._visible !== visible) {
            this._visible = !!visible;
            this._updateVisibility();
        }
    };
    _p.updateMatrix = function (node) {
        if (!this._iframe || !this._visible) return;
        node.getWorldMatrix(_mat4_temp);
        if (!this._forceUpdate && this._m00 === _mat4_temp.m00 && this._m01 === _mat4_temp.m01 && this._m04 === _mat4_temp.m04 && this._m05 === _mat4_temp.m05 && this._m12 === _mat4_temp.m12 && this._m13 === _mat4_temp.m13 && this._w === node._contentSize.width && this._h === node._contentSize.height) {
            return;
        }
        // update matrix cache
        this._m00 = _mat4_temp.m00;
        this._m01 = _mat4_temp.m01;
        this._m04 = _mat4_temp.m04;
        this._m05 = _mat4_temp.m05;
        this._m12 = _mat4_temp.m12;
        this._m13 = _mat4_temp.m13;
        this._w = node._contentSize.width;
        this._h = node._contentSize.height;
        var scaleX = cc.view._scaleX,
            scaleY = cc.view._scaleY;
        var dpr = cc.view._devicePixelRatio;
        scaleX /= dpr;
        scaleY /= dpr;
        var container = cc.game.container;
        var a = _mat4_temp.m00 * scaleX,
            b = _mat4_temp.m01,
            c = _mat4_temp.m04,
            d = _mat4_temp.m05 * scaleY;
        var offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
        var offsetY = container && container.style.paddingBottom ? parseIn(container.style.paddingBottom) : 0;
        this._updateSize(this._w, this._h);
        var w = this._w * scaleX;
        var h = this._h * scaleY;
        var appx = w * _mat4_temp.m00 * node._anchorPoint.x;
        var appy = h * _mat4_temp.m05 * node._anchorPoint.y;

        var viewport = cc.view._viewportRect;
        offsetX += viewport.x / dpr;
        offsetY += viewport.y / dpr;

        var tx = _mat4_temp.m12 * scaleX - appx + offsetX,
            ty = _mat4_temp.m13 * scaleY - appy + offsetY;

        var height = cc.view.getFrameSize().height;
        // set webview rect
        this._iframe.setFrame(tx, height - h - ty, this._w * a, this._h * d);
    };
})();

},{}]},{},[1]);
