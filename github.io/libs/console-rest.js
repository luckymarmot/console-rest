(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var theme = {
	    color: "#00AAFF"
	};
	var iconURLs = {
	    mainLogo: 'https://luckymarmot.github.io/console-rest/github.io/assets/console-rest-logo.svg',
	    pawLogo: 'https://luckymarmot.github.io/console-rest/github.io/assets/paw-logo.svg',
	    postmanLogo: 'https://luckymarmot.github.io/console-rest/github.io/assets/postman-logo-2.svg',
	    swaggerLogo: 'https://luckymarmot.github.io/console-rest/github.io/assets/swagger-logo.png',
	    ramlLogo: 'https://luckymarmot.github.io/console-rest/github.io/assets/raml-logo.svg',
	    curlLogo: 'https://luckymarmot.github.io/console-rest/github.io/assets/curl-logo.svg',
	    pawMiniLogo: 'https://luckymarmot.github.io/console-rest/github.io/assets/paw-icon.svg',
	    pawScreen: 'https://luckymarmot.github.io/console-rest/github.io/assets/paw-screen.png'
	}
	var modalCSSLink = 'https://luckymarmot.github.io/console-rest/github.io/styles/oic.css';
	var apiFlowURL = 'https://luckymarmot.github.io/console-rest/github.io/libs/api-flow.js';
	var worker = null;
	var ModalManager = __webpack_require__(2);
	var modalManager = new ModalManager(modalCSSLink, iconURLs);
	var Flow = __webpack_require__(12)
	var flow = new Flow(apiFlowURL);
	modalManager.bindFlow(flow);

	var button = __webpack_require__(13);
	var loadFonts = __webpack_require__(14);
	var paw = __webpack_require__(15);

	var domReady = (function (){
	    var arrDomReadyCallBacks = [] ;
	    function excuteDomReadyCallBacks(){
	        for (var i=0; i < arrDomReadyCallBacks.length; i++) {
	            arrDomReadyCallBacks[i]();
	        }
	        arrDomReadyCallBacks = [] ;
	    }

	    return function (callback){
	        arrDomReadyCallBacks.push(callback);
	        /* Mozilla, Chrome, Opera */
	        if (document.addEventListener ) {
	            document.addEventListener('DOMContentLoaded', excuteDomReadyCallBacks, false);
	        }
	        /* Safari, iCab, Konqueror */
	        if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
	            browserTypeSet = true ;
	            var DOMLoadTimer = setInterval(function () {
	                if (/loaded|complete/i.test(document.readyState)) {
	                    //callback();
	                    excuteDomReadyCallBacks();
	                    clearInterval(DOMLoadTimer);
	                }
	            }, 10);
	        }
	        /* Other web browsers */

	        window.onload = excuteDomReadyCallBacks;
	    }
	})()

	var ready = 0;
	var targetClass = 'paw-runner';

	window.WebFontConfig = {
	    google: { families: [ 'Source+Sans+Pro:200,400,600:latin' ] },
	    fontactive: function(){
	        loadButton();
	    }
	};

	function setTheme(_color) {
	    var color = _color

	    var pawButtons = document.getElementsByClassName(targetClass)
	    if (pawButtons) {
	        var themeColor = null
	        for (var  i = 0; i < pawButtons.length ; i++) {
	            var _theme = pawButtons[i].getAttribute('data-theme');
	            if (_theme) {
	                themeColor = _theme
	            }
	        }

	        if (themeColor) {
	            theme.color = themeColor
	        }
	    }

	    if (!color) {
	        color = theme.color
	    }

	    var themeId = 'oicThemeStylesheet';
	    var sheet = document.getElementById(themeId);
	    console.log('color  ->', color, theme.color, themeColor)
	    var content = '\n' +
	        '.oic .oic-button {\n' +
	            'background-color: ' + color + ';\n' +
	        '}\n' +

	        '.oic .oic-loading {\n' +
	            'border: 2px solid ' + color + ';\n' +
	        '}\n' +

	        '.oic .oic-tab-link.oic-active-tab {\n' +
	            'border-bottom: 0.125rem solid ' + color + ';\n' +
	        '}\n' +

	        '.oic-runner-classic {\n' +
	            'font-family: "Source Sans Pro", arial, sans-serif;\n' +
	            'font-weight: 200;\n' +
	            'cursor: pointer;\n' +
	            'position: relative;\n' +
	            'display: none; \n' +
	            'border: 1px solid rgba(0, 0, 0, 0.1);\n' +
	            'background-color: ' + color + ';\n' +
	            'color: #fefefe;\n' +
	            'padding: 0.5em;\n' +
	            'padding-left: 2rem;\n' +
	            'padding-right: 2rem;\n' +
	            'border-radius: 0.25em;\n' +
	        '}\n' +

	        '.oic-ready {\n' +
	            'display: inline-block;\n' +
	        '}';

	    if (!sheet) {
	        sheet = document.createElement('style');
	        sheet.id = themeId;
	        sheet.innerHTML = content;
	        document.body.appendChild(sheet)
	    }
	    else {
	        sheet.innerHTML = content;
	    }

	}

	function pawInjectButton($target) {
	    var pawButtons = document.getElementsByClassName($target)
	    for (var i = pawButtons.length - 1; i >= 0; i--) {
	        pawButtons[i].className += ' oic-ready';
	        pawButtons[i].onclick = (function(i) {
	            return function(ev) {
	                var target;
	                var file = this.getAttribute('data-target');
	                var source = this.getAttribute('data-source');
	                var raw = this.getAttribute('data-raw') || false;
	                var name = this.getAttribute('data-name') || null;
	                modalManager.setName(name);
	                console.log('set manager to name', name);
	                modalManager.show('selection', file, source, raw)
	            }
	        }(i))
	    }
	}

	function loadButton() {
	    ready += 1;
	    if (ready === 3) {
	        pawInjectButton(targetClass);
	    }
	}

	domReady(setTheme);
	domReady(loadFonts);
	domReady(loadButton);

	module.exports = {
	    openInConsole: {
	        generateDOM: modalManager.generateDOM,
	        setSource: modalManager.setSource,
	        generateContent: modalManager.generateContent,
	        setTheme: setTheme,
	        setName: modalManager.setName,
	        setGlobalCallback: flow.setGlobalCallback,
	        detect: flow.detect
	    }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var modalContainer = __webpack_require__(3);
	var BaseManager = __webpack_require__(4);
	var PawManager = __webpack_require__(5);
	var pawContent = __webpack_require__(6);
	var swaggerContent = __webpack_require__(7);
	var ramlContent = __webpack_require__(8);
	var postmanContent = __webpack_require__(9);
	var curlContent = __webpack_require__(10);

	function ModalManager(_modalCSSLink, _iconURLs, _fileName) {
	    var self = this;
	    var flow;
	    var modalCSSLink = _modalCSSLink;
	    var iconURLs = _iconURLs;
	    var _CSSIsLoaded = false;
	    var fileName = _fileName || 'api-flow';
	    this.sourceFormat = null;
	    this.file = null;
	    this.raw = null;

	    var _el = function(t, ens, cb, tout) {
	        var _called = false;
	        var _cb = function(e) {
	            if (!_called) {
	                _called = true;
	                cb(e);
	            }

	        }
	        for (en in ens) {
	            t.addEventListener(en, _cb);
	        }
	        if (tout) {
	            window.setTimeout(_cb, tout);
	        }
	    }

	    // var SelectionManager = require('./selection/selection.js');
	    // var PawManager = require('./paw/paw.js');

	    /*
	    var modals = {
	        'selection': new SelectionManager(self),
	        'paw': new PawManager(self)
	    }
	    */

	    function _loadCSS(href, onload) {
	        var ss = window.document.createElement("link");
	        ss.rel = "stylesheet";
	        ss.href = href;
	        ss.media = "all";
	        ss.onload = onload;
	        document.getElementsByTagName("body")[0].appendChild(ss);
	    }

	    this.bindFlow = function(_flow) {
	        flow = _flow
	    }

	    this.setSource = function(file, source, raw) {
	        self.file = file;
	        self.sourceFormat = source;
	        self.raw = raw;
	    }

	    this.dismiss = function() {
	        var outer = document.getElementById("oic-outer");
	        if (outer) {
	            var body = document.getElementsByTagName('body')[0];
	            var re = new RegExp("(^|\\s)oic-blurred($|\\s)", "g");
	            body.className = body.className.replace(re, '');
	            var oip = outer.getElementsByClassName('oic')[0];
	            oip.className = "oic fadeout";
	            outer.style.opacity = 0;
	            _el(oip, ["animationend", "webkitAnimationEnd"], function() {
	                outer.style.display = "none";
	            }, 350);
	            return true;
	        }
	    }

	    this.show = function(name, file, source, raw){
	        if (file && source && typeof raw === 'boolean') {
	            this.setSource(file, source, raw)
	        }
	        var _showOuter = function() {
	            var body = document.getElementsByTagName('body')[0];
	            body.className += ' oic-blurred ';
	            var outer = document.getElementById("oic-outer");
	            if (!outer) {
	                var outer = document.createElement("div");
	                outer.id = outer.className = "oic-outer";
	                document.getElementsByTagName("body")[0].appendChild(outer);
	                outer.innerHTML = modalContainer(
	                    iconURLs,
	                    pawContent,
	                    swaggerContent,
	                    ramlContent,
	                    postmanContent,
	                    curlContent
	                );
	                self.addSelectionListeners(outer);
	                self.addTabListeners(outer);
	            }
	            self.update(outer, name);
	            outer.getElementsByClassName('oic')[0].className = "oic oic-modal-content fadein";
	            outer.style.opacity = 1;
	            outer.style.display = "";
	            outer.onclick = function(e) {
	                if (e.target === outer || e.target.parentNode === outer) {
	                    self.dismiss();
	                }
	            };

	            var closeButton = document.getElementsByClassName('oic-header-close')[0]
	            closeButton.onclick = function(e) {
	                self.dismiss();
	                e.preventDefault();
	            }
	        }

	        if (_CSSIsLoaded) {
	            _showOuter();
	        }
	        else {
	            _CSSIsLoaded = true;
	            _loadCSS("https://fonts.googleapis.com/css?family=Roboto+Mono:100");
	            _loadCSS(modalCSSLink, function(){
	                _showOuter();
	            });
	        }
	    }

	    this.generateDOM = function(id, name, file, source, raw){
	        if (file && source && typeof raw === 'boolean') {
	            this.setSource(file, source, raw)
	        }

	        var noHeaderBar = true

	        var _showOuter = function() {
	            var outer = document.getElementById(id);
	            outer.innerHTML = modalContainer(
	                iconURLs,
	                pawContent,
	                swaggerContent,
	                ramlContent,
	                postmanContent,
	                curlContent,
	                noHeaderBar
	            );
	            self.addSelectionListeners(outer);
	            self.addTabListeners(outer);
	            self.update(outer, name);
	            outer.getElementsByClassName('oic')[0].className = "oic oic-modal-content";
	            outer.style.opacity = 1;
	            outer.style.display = "";
	        }

	        if (_CSSIsLoaded) {
	            _showOuter();
	        }
	        else {
	            _CSSIsLoaded = true;
	            _loadCSS("http://fonts.googleapis.com/css?family=Roboto+Mono:100");
	            _loadCSS(modalCSSLink, function(){
	                _showOuter();
	            });
	        }
	    }

	    var managers = {
	        paw: new PawManager(pawContent, 'paw', iconURLs),
	        swagger: new BaseManager(swaggerContent, 'swagger'),
	        raml: new BaseManager(ramlContent, 'raml'),
	        'postman-2': new BaseManager(postmanContent, 'postman-2'),
	        curl: new BaseManager(curlContent, 'curl')
	    };

	    this.addSelectionListeners = function(dom, options) {
	        var blocks = document.getElementsByClassName('oic-target-block')
	        for (var i = blocks.length - 1; i > -1 ; i--) {
	            blocks[i].onclick = (function(_i) {
	                return function(ev) {
	                    var parent = self.getClosestParentWithAttribute(ev.target, 'data-open-with');
	                    var target = parent.attributes['data-open-with'].value;
	                    self.update(dom, target);
	                    var manager = managers[target];
	                    if (manager) {
	                        manager.generateContent(
	                            flow,
	                            fileName,
	                            self.file,
	                            self.raw,
	                            self.sourceFormat,
	                            target,
	                            options
	                        )
	                    }
	                    ev.preventDefault();
	                }
	            })(i)
	        }
	    }

	    this.addTabListeners = function(dom, options) {
	        var blocks = document.getElementsByClassName('oic-tab-link')
	        for (var i = blocks.length - 1; i > -1 ; i--) {
	            blocks[i].onclick = (function(_i) {
	                return function(ev) {
	                    var parent = self.getClosestParentWithAttribute(ev.target, 'data-open-with');
	                    var target = parent.attributes['data-open-with'].value;
	                    self.update(dom, target);
	                    var manager = managers[target];
	                    if (manager) {
	                        manager.generateContent(
	                            flow,
	                            fileName,
	                            self.file,
	                            self.raw,
	                            self.sourceFormat,
	                            target,
	                            options
	                        )
	                    }
	                    ev.preventDefault();
	                }
	            })(i)
	        }
	    }

	    this.generateContent = function(_target, options) {
	        var target = _target
	        if (!target) {
	            var active = document.getElementsByClassName('oic-active-tab')[0];
	            target = active.attributes['data-open-with'].value;
	        }

	        var manager = managers[target];
	        if (manager) {
	            manager.generateContent(
	                flow,
	                fileName,
	                self.file,
	                self.raw,
	                self.sourceFormat,
	                target,
	                options
	            )
	        }
	    }

	    this.getClosestParentWithAttribute = function(dom, attributeName) {
	        var elem = dom;
	        while (elem && elem !== document) {
	            if (elem.getAttribute(attributeName)) {
	                return elem;
	            }
	            elem = elem.parentNode;
	        }

	        return null;
	    }

	    this.clearClass = function(dom, className) {
	        var re = new RegExp("(^|\\s)" + className + "($|\\s)", "g");
	        var selection = dom.getElementsByClassName(className);
	        for (var i = selection.length - 1; i > -1 ; i--) {
	            selection[i].className = selection[i].className.replace(re, ' ');
	        }
	    }

	    this.hasClass = function(id, className) {
	        var re = new RegExp("(^|\\s)" + className + "($|\\s)")
	        var selection = document.getElementById(id);
	        return !!selection.className.match(re)
	    }

	    this.addClass = function(id, className) {
	        var hasClass = self.hasClass(id, className);
	        var selection = document.getElementById(id);
	        if (!hasClass) {
	            selection.className += ' ' + className;
	        }
	    }

	    this.update = function(outer, _name){
	        var name = _name || ''
	        if (name === 'selection') {
	            self.clearClass(outer, 'oic-active-page');
	            self.addClass('oic-selection-modal', 'oic-active-page');
	        }
	        else {
	            if (!self.hasClass('oic-tab-modal', 'oic-active-page')) {
	                self.clearClass(outer, 'oic-active-page');
	                self.addClass('oic-tab-modal', 'oic-active-page');
	            }

	            var activeMap = {
	                paw: 'paw',
	                'postman-2': 'postman-2',
	                swagger: 'swagger',
	                raml: 'raml',
	                curl: 'curl'
	            };

	            var target = activeMap[name.toLowerCase()] || activeMap.paw;

	            if (!self.hasClass('oic-' + target, 'oic-active-tab')) {
	                self.clearClass(outer, 'oic-active-tab');
	                self.addClass('oic-' + target, 'oic-active-tab');
	                self.addClass('oic-link-' + target, 'oic-active-tab');
	            }
	        }
	    }

	    this.setName = function(name) {
	        fileName = name || 'api-flow';
	    }
	}


	module.exports = ModalManager;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(iconURLs, pawContent, swaggerContent, ramlContent, postmanContent, curlContent, noHeaderBar) {
	    var noHeaderBarClass = noHeaderBar ? ' oic-hidden' : '';
	    return `<div class="oic-middle">
	        <div class="oic oic-modal-content fadein">
	            <div class="oic-header` + noHeaderBarClass + `">
	                <div class="oic-header-logo">
	                    <img src="` + iconURLs.mainLogo + `"/>
	                </div>
	                <div class="oic-header-name">
	                    Open API As...
	                </div>
	                <div class="oic-header-close">
	                    &times;
	                </div>
	            </div>
	            <div class="oic-pages">
	                <div id="oic-selection-modal" class="oic-page">
	                    <div class="oic-container">
	                        <div class="oic-scrollable">
	                            <div class="oic-selection-wrapper">
	                                <div class="oic-selection-header">
	                                    VISUAL API CLIENTS
	                                </div>
	                                <div class="oic-target-block" data-open-with="paw">
	                                    <div class="oic-target-block-inner">
	                                        <div class="oic-logo oic-large">
	                                            <img src="` + iconURLs.pawLogo + `"></img>
	                                        </div>
	                                        <div class="oic-brand">
	                                            Native HTTP Client for Mac
	                                        </div>
	                                    </div>
	                                </div>
	                                <div class="oic-target-block" data-open-with="postman-2">
	                                    <div class="oic-target-block-inner">
	                                        <div class="oic-logo oic-large">
	                                            <img src="` + iconURLs.postmanLogo + `"></img>
	                                        </div>
	                                        <div class="oic-brand">
	                                            HTTP client
	                                        </div>
	                                    </div>
	                                </div>
	                                <div class="oic-selection-header">
	                                    API SPECIFICATION FILES
	                                </div>
	                                <div class="oic-target-block" data-open-with="swagger">
	                                    <div class="oic-target-block-inner">
	                                        <div class="oic-logo">
	                                            <img src="` + iconURLs.swaggerLogo + `"></img>
	                                        </div>
	                                        <div class="oic-brand">
	                                            OAI aka. Swagger
	                                        </div>
	                                    </div>
	                                </div>
	                                <div class="oic-target-block" data-open-with="raml">
	                                    <div class="oic-target-block-inner">
	                                        <div class="oic-logo oic-large">
	                                            <img src="` + iconURLs.ramlLogo + `"></img>
	                                        </div>
	                                        <span class="oic-brand">
	                                            RAML API Definition File
	                                        </span>
	                                    </div>
	                                </div>
	                                <div class="oic-selection-header">
	                                    COMMAND LINE TOOLS
	                                </div>
	                                <div class="oic-target-block" data-open-with="curl">
	                                    <div class="oic-target-block-inner">
	                                        <div class="oic-logo">
	                                            <img src="` + iconURLs.curlLogo + `"></img>
	                                        </div>
	                                        <div class="oic-brand">
	                                            cURL with Markdown formatting
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="oic-selection-footer">
	                        <div class="oic-footer-divider"></div>
	                        <span>console.rest is a community project by Paw.</span>
	                        <img class="oic-footer-icon" src="` + iconURLs.pawMiniLogo + `"></img>
	                        <span class="oic-button-light">
	                            <a href="#console.rest">Add this "Open in Console" button to your API</a>
	                        <span>
	                    </div>
	                </div>
	                <div id="oic-tab-modal" class="oic-page oic-tabs">
	                    <div class="oic-tab-nav">
	                        <div id="oic-link-paw" class="oic-tab-link" data-open-with="paw">PAW</div>
	                        <div id="oic-link-postman-2" class="oic-tab-link" data-open-with="postman-2">POSTMAN</div>
	                        <div id="oic-link-swagger" class="oic-tab-link" data-open-with="swagger">SWAGGER</div>
	                        <div id="oic-link-raml" class="oic-tab-link" data-open-with="raml">RAML</div>
	                        <div id="oic-link-curl" class="oic-tab-link" data-open-with="curl">CURL</div>
	                    </div>
	                    <div class="oic-tab-content">
	                        <div id="oic-paw" class="oic-tab-pane">` + pawContent(null, null, null, iconURLs) + `</div>
	                        <div id="oic-postman-2" class="oic-tab-pane">` + postmanContent() + `</div>
	                        <div id="oic-swagger" class="oic-tab-pane">` + swaggerContent() + `</div>
	                        <div id="oic-raml" class="oic-tab-pane">` + ramlContent() + `</div>
	                        <div id="oic-curl" class="oic-tab-pane">` + curlContent() + `</div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>`
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	function BaseManager(content, target) {
	    var self = this;

	    var currentDisplay = null;
	    var store = {};
	    var downloads = {};

	    var simpleHash = function(s) {
	      var hash = 0, strlen = s.length, i, c;
	      if (strlen === 0) {
	        return hash;
	      }
	      for (i = 0; i < strlen; i++) {
	        c = s.charCodeAt(i);
	        hash = ((hash << 5) - hash) + c;
	        hash &= hash; // Convert to 32bit integer
	      }
	      return (hash >>> 0); //uint32
	    };

	    this.displayContent = function(data, key, source, err) {
	        var _target = document.getElementById('oic-' + target);
	        if (currentDisplay !== key) {
	            _target.innerHTML = content(data, key, source, err);
	            self.addDownloadListener(key);
	            currentDisplay = key;
	        }
	    }

	    this.displayError = function(err, data, key) {
	        return self.displayContent(data, key, null, err);
	    }

	    this.generateContent = function(flow, name, file, raw, source, target, options) {
	        var key = simpleHash(target + file + source + name);

	        if (!file || !source) {
	            return self.displayContent(null, key, source)
	        }

	        if (store[key]) {
	            var content = store[key].data;
	            self.displayContent(content, key);
	            self.downloadContent();
	        }
	        else {
	            var contentType = raw !== false ? 'raw' : 'remote';
	            flow.transform(file, contentType, source, target, options, (function(_key) {
	                return function(err, data) {
	                    if (!err) {
	                        store[_key] = {
	                            data: data,
	                            name: name
	                        };
	                        self.displayContent(data, key);
	                        self.downloadContent();
	                    }
	                    else {
	                        self.displayError(err, data, key);
	                    }
	                }
	            })(key))
	        }
	    }

	    this.downloadContent = function() {
	        var keys = Object.keys(downloads);
	        for (var i = keys.length -1; i >= 0 ; i--) {
	            var key = keys[i];
	            if (store[key]) {
	                var link = document.createElement('a');
	                var name = (store[key].name || 'api-flow') + '.' + target;
	                link.download = name;
	                link.href = 'data:,' + encodeURIComponent(store[key].data);
	                link.click();
	                delete downloads[key]
	            }
	        }
	    }

	    this.addDownloadListener = function(key) {
	        var _target = document.getElementById('oic-button-' + target);
	        _target.onclick = function (e) {
	            downloads[key] = true;
	            if (store[key]) {
	                self.downloadContent();
	            }
	            e.preventDefault();
	        }
	    }
	}

	module.exports = BaseManager


/***/ },
/* 5 */
/***/ function(module, exports) {

	function PawManager(content, target, iconURLs) {
	    var self = this;
	    this.generateContent = function(flow, name, file, raw, source, target, options) {
	        var _target = document.getElementById('oic-' + target);
	        _target.innerHTML = content(file, source, raw, iconURLs);
	    }
	}

	module.exports = PawManager


/***/ },
/* 6 */
/***/ function(module, exports) {

	function getImporter(source) {
	    var importers = {
	        'postman-1': 'com.luckymarmot.PawExtensions.PostmanImporter',
	        'curl': 'com.luckymarmot.PawExtensions.CurlImporter',
	        'swagger': 'com.luckymarmot.PawExtensions.SwaggerImporter',
	        'raml': 'com.luckymarmot.PawExtensions.RAMLImporter'
	    }

	    if (importers[source.toLowerCase()]) {
	        return importers[source.toLowerCase()];
	    }
	}

	function getLink(file, source, raw) {
	    var importer = getImporter(source);
	    var method = raw ? 'text' : 'url';
	    var link = 'paw://current.document/open?' + method + '=' + encodeURIComponent(file);
	    if (importer) {
	        link += '&importer=' + importer;
	    }
	    return link;
	}

	module.exports = function(_file, _source, _raw, iconURLs) {
	    var file = _file || '';
	    var source = _source || '';
	    var raw = _raw || false;

	    var weblink = 'https://luckymarmot.com/paw?' +
	    "utm_source=" + encodeURIComponent(window.location.host) + "&" +
	    "utm_medium=openinpaw-js&" +
	    "utm_term=" + encodeURIComponent(document.title || '') + "&" +
	    "utm_content=" + encodeURIComponent(document.title || '') + "&" +
	    "utm_campaign=openinpaw-js";

	    var pawlink = getLink(file, source, raw);

	    return `<div id="paw-content-pane" class="oic-tab-pane-content oic-paw-pane">
	        <div class="oic-vertical-container oic-scrollable">
	            <div class="oic-paw-title">Paw</div>
	            <div class="oic-paw-subtitle">The most advanced HTTP client or Mac</div>
	            <div class="oic-paw-img">
	                <img src="` + iconURLs.pawScreen + `" width="75%"/>
	            </div>
	        </div>
	    </div>
	    <div class="oic-tab-action-bar">
	        <a id="oic-button-paw-discover" class="oic-button oic-button-secondary" href="` + weblink + `">Discover Paw</a>
	        <a id="oic-button-paw" class="oic-button" href="` + pawlink + `">Open API in Paw</a>
	    </div>
	    `
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	function escapeHtml(string) {
	  var matchHtmlRegExp = /["'&<>]/;
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}

	module.exports = function(data, key, source, err) {
	    var content = '';

	    if (err) {
	        if (err === '"generated file of poor quality"') {
	            content = '<div class="oic-waiting">Warning: The generated file seems to be of poor quality. This can be due to a wrong source format.</div>'
	        }
	        else {
	            content = '<div class="oic-waiting">Warning: The source file was not parsed correctly. This can be due to a wrong source format</div>'
	        }
	    }
	    if (data) {
	        var escaped = escapeHtml(data)
	        content += '<div class="oic-scrollable"><pre class="oic-left-align">' + escaped + '</pre></div>';
	    }
	    else if (source) {
	        content += `<div class="oic-loading"></div>`
	    }
	    else {
	        content += `<div class="oic-waiting">Waiting for a source file</div>`
	    }

	    return `<div id="swagger-content-pane" class="oic-tab-pane-content">
	        ` + content + `
	    </div>
	    <div class="oic-tab-action-bar">
	        <div id="oic-button-swagger" class="oic-button">Download</div>
	    </div>
	    `
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	function escapeHtml(string) {
	  var matchHtmlRegExp = /["'&<>]/;
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}

	module.exports = function(data, key, source, err) {
	    var content = '';

	    if (err) {
	        if (err === '"generated file of poor quality"') {
	            content = '<div class="oic-waiting">Warning: The generated file seems to be of poor quality. This can be due to a wrong source format.</div>'
	        }
	        else {
	            content = '<div class="oic-waiting">Warning: The source file was not parsed correctly. This can be due to a wrong source format</div>'
	        }
	    }
	    if (data) {
	        var escaped = escapeHtml(data)
	        content += '<div class="oic-scrollable"><pre class="oic-left-align">' + escaped + '</pre></div>';
	    }
	    else if (source) {
	        content += `<div class="oic-loading"></div>`
	    }
	    else {
	        content += `<div class="oic-waiting">Waiting for a source file</div>`
	    }

	    return `<div id="raml-content-pane" class="oic-tab-pane-content">
	        ` + content + `
	    </div>
	    <div class="oic-tab-action-bar">
	        <div id="oic-button-raml" class="oic-button">Download</div>
	    </div>
	    `
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(data, key, source, err) {
	    var content;
	    if (err) {
	        if (err === '"generated file of poor quality"') {
	            content = '<div class="oic-waiting">Warning: The generated file seems to be of poor quality. This can be due to a wrong source format.</div>'
	        }
	        else {
	            content = '<div class="oic-waiting">Warning: The source file was not parsed correctly. This can be due to a wrong source format</div>'
	        }
	    }
	    else if (data) {
	        content = `<div class="oic-container oic-space-around">
	            <div class="oic-column-25">
	                <div class="oic-block-20">
	                    <svg viewBox="0 0 200 200" width="25%" xmlns="http://www.w3.org/2000/svg">
	                        <g>
	                           <circle cx="100" cy="100" r="90" stroke="#00AAFF" stroke-width="10" fill="none"/>
	                           <text text-anchor="middle" x="100" y="135" font-size="100px" fill="#00AAFF">1</text>
	                        </g>
	                    </svg>
	                </div>
	                <div class="oic-block-20">
	                    Download the Postman collection from below
	                </div>
	                <div class="oic-block-40">
	                    <svg viewBox="0 0 580 400" width="70%" xmlns="http://www.w3.org/2000/svg">
	                        <g>
	                            <ellipse ry="150" rx="150" cy="200" cx="290" stroke-width="15" stroke="#748085" fill="none"/>
	                            <path transform="rotate(180 290,200) " d="m224.5,199.805589l65.5,-80.805589l65.5,80.805589l-32.750002,0l0,81.194411l-65.499996,0l0,-81.194411l-32.750002,0z" fill-opacity="null" stroke-opacity="null" stroke-width="15" stroke="none" fill="#748085"/>
	                        </g>
	                    </svg>
	                </div>
	            </div>
	            <div class="oic-column-25">
	                <div class="oic-block-20">
	                    <svg viewBox="0 0 200 200" width="25%" xmlns="http://www.w3.org/2000/svg">
	                        <g>
	                           <circle cx="100" cy="100" r="90" stroke="#00AAFF" stroke-width="10" fill="none"/>
	                           <text text-anchor="middle" x="100" y="135" font-size="100px" fill="#00AAFF">2</text>
	                        </g>
	                    </svg>
	                </div>
	                <div class="oic-block-20">
	                    Hit the "import" button on the top left corner
	                </div>
	                <div class="oic-block-40">
	                    <img src="../src/modals/postman/postman-step-2.png" width="100%" height="auto" />
	                </div>
	            </div>
	            <div class="oic-column-25">
	                <div class="oic-block-20">
	                    <svg viewBox="0 0 200 200" width="25%" xmlns="http://www.w3.org/2000/svg">
	                        <g>
	                           <circle cx="100" cy="100" r="90" stroke="#00AAFF" stroke-width="10" fill="none"/>
	                           <text text-anchor="middle" x="100" y="135" font-size="100px" fill="#00AAFF">3</text>
	                        </g>
	                    </svg>
	                </div>
	                <div class="oic-block-20">
	                    Drag and drop the downloaded file into the import dialog
	                </div>
	                <div class="oic-block-40">
	                    <img src="../src/modals/postman/postman-step-3.png" width="100%" height="auto" />
	                </div>
	            </div>
	        </div>`;
	    }
	    else if (source) {
	        content = `<div class="oic-loading"></div>`
	    }
	    else {
	        content = `<div class="oic-waiting">Waiting for a source file</div>`
	    }

	    return `<div id="postman-content-pane" class="oic-tab-pane-content">
	        ` + content + `
	    </div>
	    <div class="oic-tab-action-bar">
	        <div id="oic-button-postman-2" class="oic-button">Download</div>
	    </div>
	    `
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var showdown = __webpack_require__(11);
	var converter = new showdown.Converter();

	module.exports = function(data, key, source, err) {
	    var content = '';
	    if (err) {
	        if (err === '"generated file of poor quality"') {
	            content = '<div class="oic-waiting">Warning: The generated file seems to be of poor quality. This can be due to a wrong source format.</div>'
	        }
	        else {
	            content = '<div class="oic-waiting">Warning: The source file was not parsed correctly. This can be due to a wrong source format</div>'
	        }
	    }
	    if (data) {
	        content += `<div class="oic-scrollable">
	            <div class="oic-left-align oic-markdown">` + converter.makeHtml(data) + `</div>
	        </div>`;
	    }
	    else if (source) {
	        content += `<div class="oic-loading"></div>`
	    }
	    else {
	        content += `<div class="oic-waiting">Waiting for a source file</div>`
	    }

	    return `<div id="curl-content-pane" class="oic-tab-pane-content">
	        ` + content + `
	    </div>
	    <div class="oic-tab-action-bar">
	        <div id="oic-button-curl" class="oic-button">Download</div>
	    </div>
	    `
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;/*! showdown 19-08-2016 */
	(function(){
	/**
	 * Created by Tivie on 13-07-2015.
	 */

	function getDefaultOpts(simple) {
	  'use strict';

	  var defaultOptions = {
	    omitExtraWLInCodeBlocks: {
	      defaultValue: false,
	      describe: 'Omit the default extra whiteline added to code blocks',
	      type: 'boolean'
	    },
	    noHeaderId: {
	      defaultValue: false,
	      describe: 'Turn on/off generated header id',
	      type: 'boolean'
	    },
	    prefixHeaderId: {
	      defaultValue: false,
	      describe: 'Specify a prefix to generated header ids',
	      type: 'string'
	    },
	    headerLevelStart: {
	      defaultValue: false,
	      describe: 'The header blocks level start',
	      type: 'integer'
	    },
	    parseImgDimensions: {
	      defaultValue: false,
	      describe: 'Turn on/off image dimension parsing',
	      type: 'boolean'
	    },
	    simplifiedAutoLink: {
	      defaultValue: false,
	      describe: 'Turn on/off GFM autolink style',
	      type: 'boolean'
	    },
	    literalMidWordUnderscores: {
	      defaultValue: false,
	      describe: 'Parse midword underscores as literal underscores',
	      type: 'boolean'
	    },
	    strikethrough: {
	      defaultValue: false,
	      describe: 'Turn on/off strikethrough support',
	      type: 'boolean'
	    },
	    tables: {
	      defaultValue: false,
	      describe: 'Turn on/off tables support',
	      type: 'boolean'
	    },
	    tablesHeaderId: {
	      defaultValue: false,
	      describe: 'Add an id to table headers',
	      type: 'boolean'
	    },
	    ghCodeBlocks: {
	      defaultValue: true,
	      describe: 'Turn on/off GFM fenced code blocks support',
	      type: 'boolean'
	    },
	    tasklists: {
	      defaultValue: false,
	      describe: 'Turn on/off GFM tasklist support',
	      type: 'boolean'
	    },
	    smoothLivePreview: {
	      defaultValue: false,
	      describe: 'Prevents weird effects in live previews due to incomplete input',
	      type: 'boolean'
	    },
	    smartIndentationFix: {
	      defaultValue: false,
	      description: 'Tries to smartly fix identation in es6 strings',
	      type: 'boolean'
	    }
	  };
	  if (simple === false) {
	    return JSON.parse(JSON.stringify(defaultOptions));
	  }
	  var ret = {};
	  for (var opt in defaultOptions) {
	    if (defaultOptions.hasOwnProperty(opt)) {
	      ret[opt] = defaultOptions[opt].defaultValue;
	    }
	  }
	  return ret;
	}

	/**
	 * Created by Tivie on 06-01-2015.
	 */

	// Private properties
	var showdown = {},
	    parsers = {},
	    extensions = {},
	    globalOptions = getDefaultOpts(true),
	    flavor = {
	      github: {
	        omitExtraWLInCodeBlocks:   true,
	        prefixHeaderId:            'user-content-',
	        simplifiedAutoLink:        true,
	        literalMidWordUnderscores: true,
	        strikethrough:             true,
	        tables:                    true,
	        tablesHeaderId:            true,
	        ghCodeBlocks:              true,
	        tasklists:                 true
	      },
	      vanilla: getDefaultOpts(true)
	    };

	/**
	 * helper namespace
	 * @type {{}}
	 */
	showdown.helper = {};

	/**
	 * TODO LEGACY SUPPORT CODE
	 * @type {{}}
	 */
	showdown.extensions = {};

	/**
	 * Set a global option
	 * @static
	 * @param {string} key
	 * @param {*} value
	 * @returns {showdown}
	 */
	showdown.setOption = function (key, value) {
	  'use strict';
	  globalOptions[key] = value;
	  return this;
	};

	/**
	 * Get a global option
	 * @static
	 * @param {string} key
	 * @returns {*}
	 */
	showdown.getOption = function (key) {
	  'use strict';
	  return globalOptions[key];
	};

	/**
	 * Get the global options
	 * @static
	 * @returns {{}}
	 */
	showdown.getOptions = function () {
	  'use strict';
	  return globalOptions;
	};

	/**
	 * Reset global options to the default values
	 * @static
	 */
	showdown.resetOptions = function () {
	  'use strict';
	  globalOptions = getDefaultOpts(true);
	};

	/**
	 * Set the flavor showdown should use as default
	 * @param {string} name
	 */
	showdown.setFlavor = function (name) {
	  'use strict';
	  if (flavor.hasOwnProperty(name)) {
	    var preset = flavor[name];
	    for (var option in preset) {
	      if (preset.hasOwnProperty(option)) {
	        globalOptions[option] = preset[option];
	      }
	    }
	  }
	};

	/**
	 * Get the default options
	 * @static
	 * @param {boolean} [simple=true]
	 * @returns {{}}
	 */
	showdown.getDefaultOptions = function (simple) {
	  'use strict';
	  return getDefaultOpts(simple);
	};

	/**
	 * Get or set a subParser
	 *
	 * subParser(name)       - Get a registered subParser
	 * subParser(name, func) - Register a subParser
	 * @static
	 * @param {string} name
	 * @param {function} [func]
	 * @returns {*}
	 */
	showdown.subParser = function (name, func) {
	  'use strict';
	  if (showdown.helper.isString(name)) {
	    if (typeof func !== 'undefined') {
	      parsers[name] = func;
	    } else {
	      if (parsers.hasOwnProperty(name)) {
	        return parsers[name];
	      } else {
	        throw Error('SubParser named ' + name + ' not registered!');
	      }
	    }
	  }
	};

	/**
	 * Gets or registers an extension
	 * @static
	 * @param {string} name
	 * @param {object|function=} ext
	 * @returns {*}
	 */
	showdown.extension = function (name, ext) {
	  'use strict';

	  if (!showdown.helper.isString(name)) {
	    throw Error('Extension \'name\' must be a string');
	  }

	  name = showdown.helper.stdExtName(name);

	  // Getter
	  if (showdown.helper.isUndefined(ext)) {
	    if (!extensions.hasOwnProperty(name)) {
	      throw Error('Extension named ' + name + ' is not registered!');
	    }
	    return extensions[name];

	    // Setter
	  } else {
	    // Expand extension if it's wrapped in a function
	    if (typeof ext === 'function') {
	      ext = ext();
	    }

	    // Ensure extension is an array
	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }

	    var validExtension = validate(ext, name);

	    if (validExtension.valid) {
	      extensions[name] = ext;
	    } else {
	      throw Error(validExtension.error);
	    }
	  }
	};

	/**
	 * Gets all extensions registered
	 * @returns {{}}
	 */
	showdown.getAllExtensions = function () {
	  'use strict';
	  return extensions;
	};

	/**
	 * Remove an extension
	 * @param {string} name
	 */
	showdown.removeExtension = function (name) {
	  'use strict';
	  delete extensions[name];
	};

	/**
	 * Removes all extensions
	 */
	showdown.resetExtensions = function () {
	  'use strict';
	  extensions = {};
	};

	/**
	 * Validate extension
	 * @param {array} extension
	 * @param {string} name
	 * @returns {{valid: boolean, error: string}}
	 */
	function validate(extension, name) {
	  'use strict';

	  var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
	    ret = {
	      valid: true,
	      error: ''
	    };

	  if (!showdown.helper.isArray(extension)) {
	    extension = [extension];
	  }

	  for (var i = 0; i < extension.length; ++i) {
	    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
	        ext = extension[i];
	    if (typeof ext !== 'object') {
	      ret.valid = false;
	      ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
	      return ret;
	    }

	    if (!showdown.helper.isString(ext.type)) {
	      ret.valid = false;
	      ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
	      return ret;
	    }

	    var type = ext.type = ext.type.toLowerCase();

	    // normalize extension type
	    if (type === 'language') {
	      type = ext.type = 'lang';
	    }

	    if (type === 'html') {
	      type = ext.type = 'output';
	    }

	    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
	      ret.valid = false;
	      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
	      return ret;
	    }

	    if (type === 'listener') {
	      if (showdown.helper.isUndefined(ext.listeners)) {
	        ret.valid = false;
	        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
	        return ret;
	      }
	    } else {
	      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
	        ret.valid = false;
	        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
	        return ret;
	      }
	    }

	    if (ext.listeners) {
	      if (typeof ext.listeners !== 'object') {
	        ret.valid = false;
	        ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
	        return ret;
	      }
	      for (var ln in ext.listeners) {
	        if (ext.listeners.hasOwnProperty(ln)) {
	          if (typeof ext.listeners[ln] !== 'function') {
	            ret.valid = false;
	            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
	              ' must be a function but ' + typeof ext.listeners[ln] + ' given';
	            return ret;
	          }
	        }
	      }
	    }

	    if (ext.filter) {
	      if (typeof ext.filter !== 'function') {
	        ret.valid = false;
	        ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
	        return ret;
	      }
	    } else if (ext.regex) {
	      if (showdown.helper.isString(ext.regex)) {
	        ext.regex = new RegExp(ext.regex, 'g');
	      }
	      if (!ext.regex instanceof RegExp) {
	        ret.valid = false;
	        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
	        return ret;
	      }
	      if (showdown.helper.isUndefined(ext.replace)) {
	        ret.valid = false;
	        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
	        return ret;
	      }
	    }
	  }
	  return ret;
	}

	/**
	 * Validate extension
	 * @param {object} ext
	 * @returns {boolean}
	 */
	showdown.validateExtension = function (ext) {
	  'use strict';

	  var validateExtension = validate(ext, null);
	  if (!validateExtension.valid) {
	    console.warn(validateExtension.error);
	    return false;
	  }
	  return true;
	};

	/**
	 * showdownjs helper functions
	 */

	if (!showdown.hasOwnProperty('helper')) {
	  showdown.helper = {};
	}

	/**
	 * Check if var is string
	 * @static
	 * @param {string} a
	 * @returns {boolean}
	 */
	showdown.helper.isString = function isString(a) {
	  'use strict';
	  return (typeof a === 'string' || a instanceof String);
	};

	/**
	 * Check if var is a function
	 * @static
	 * @param {string} a
	 * @returns {boolean}
	 */
	showdown.helper.isFunction = function isFunction(a) {
	  'use strict';
	  var getType = {};
	  return a && getType.toString.call(a) === '[object Function]';
	};

	/**
	 * ForEach helper function
	 * @static
	 * @param {*} obj
	 * @param {function} callback
	 */
	showdown.helper.forEach = function forEach(obj, callback) {
	  'use strict';
	  if (typeof obj.forEach === 'function') {
	    obj.forEach(callback);
	  } else {
	    for (var i = 0; i < obj.length; i++) {
	      callback(obj[i], i, obj);
	    }
	  }
	};

	/**
	 * isArray helper function
	 * @static
	 * @param {*} a
	 * @returns {boolean}
	 */
	showdown.helper.isArray = function isArray(a) {
	  'use strict';
	  return a.constructor === Array;
	};

	/**
	 * Check if value is undefined
	 * @static
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 */
	showdown.helper.isUndefined = function isUndefined(value) {
	  'use strict';
	  return typeof value === 'undefined';
	};

	/**
	 * Standardidize extension name
	 * @static
	 * @param {string} s extension name
	 * @returns {string}
	 */
	showdown.helper.stdExtName = function (s) {
	  'use strict';
	  return s.replace(/[_-]||\s/g, '').toLowerCase();
	};

	function escapeCharactersCallback(wholeMatch, m1) {
	  'use strict';
	  var charCodeToEscape = m1.charCodeAt(0);
	  return '~E' + charCodeToEscape + 'E';
	}

	/**
	 * Callback used to escape characters when passing through String.replace
	 * @static
	 * @param {string} wholeMatch
	 * @param {string} m1
	 * @returns {string}
	 */
	showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

	/**
	 * Escape characters in a string
	 * @static
	 * @param {string} text
	 * @param {string} charsToEscape
	 * @param {boolean} afterBackslash
	 * @returns {XML|string|void|*}
	 */
	showdown.helper.escapeCharacters = function escapeCharacters(text, charsToEscape, afterBackslash) {
	  'use strict';
	  // First we have to escape the escape characters so that
	  // we can build a character class out of them
	  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

	  if (afterBackslash) {
	    regexString = '\\\\' + regexString;
	  }

	  var regex = new RegExp(regexString, 'g');
	  text = text.replace(regex, escapeCharactersCallback);

	  return text;
	};

	var rgxFindMatchPos = function (str, left, right, flags) {
	  'use strict';
	  var f = flags || '',
	    g = f.indexOf('g') > -1,
	    x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
	    l = new RegExp(left, f.replace(/g/g, '')),
	    pos = [],
	    t, s, m, start, end;

	  do {
	    t = 0;
	    while ((m = x.exec(str))) {
	      if (l.test(m[0])) {
	        if (!(t++)) {
	          s = x.lastIndex;
	          start = s - m[0].length;
	        }
	      } else if (t) {
	        if (!--t) {
	          end = m.index + m[0].length;
	          var obj = {
	            left: {start: start, end: s},
	            match: {start: s, end: m.index},
	            right: {start: m.index, end: end},
	            wholeMatch: {start: start, end: end}
	          };
	          pos.push(obj);
	          if (!g) {
	            return pos;
	          }
	        }
	      }
	    }
	  } while (t && (x.lastIndex = s));

	  return pos;
	};

	/**
	 * matchRecursiveRegExp
	 *
	 * (c) 2007 Steven Levithan <stevenlevithan.com>
	 * MIT License
	 *
	 * Accepts a string to search, a left and right format delimiter
	 * as regex patterns, and optional regex flags. Returns an array
	 * of matches, allowing nested instances of left/right delimiters.
	 * Use the "g" flag to return all matches, otherwise only the
	 * first is returned. Be careful to ensure that the left and
	 * right format delimiters produce mutually exclusive matches.
	 * Backreferences are not supported within the right delimiter
	 * due to how it is internally combined with the left delimiter.
	 * When matching strings whose format delimiters are unbalanced
	 * to the left or right, the output is intentionally as a
	 * conventional regex library with recursion support would
	 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
	 * "<" and ">" as the delimiters (both strings contain a single,
	 * balanced instance of "<x>").
	 *
	 * examples:
	 * matchRecursiveRegExp("test", "\\(", "\\)")
	 * returns: []
	 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
	 * returns: ["t<<e>><s>", ""]
	 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
	 * returns: ["test"]
	 */
	showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
	  'use strict';

	  var matchPos = rgxFindMatchPos (str, left, right, flags),
	    results = [];

	  for (var i = 0; i < matchPos.length; ++i) {
	    results.push([
	      str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
	      str.slice(matchPos[i].match.start, matchPos[i].match.end),
	      str.slice(matchPos[i].left.start, matchPos[i].left.end),
	      str.slice(matchPos[i].right.start, matchPos[i].right.end)
	    ]);
	  }
	  return results;
	};

	/**
	 *
	 * @param {string} str
	 * @param {string|function} replacement
	 * @param {string} left
	 * @param {string} right
	 * @param {string} flags
	 * @returns {string}
	 */
	showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
	  'use strict';

	  if (!showdown.helper.isFunction(replacement)) {
	    var repStr = replacement;
	    replacement = function () {
	      return repStr;
	    };
	  }

	  var matchPos = rgxFindMatchPos(str, left, right, flags),
	      finalStr = str,
	      lng = matchPos.length;

	  if (lng > 0) {
	    var bits = [];
	    if (matchPos[0].wholeMatch.start !== 0) {
	      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
	    }
	    for (var i = 0; i < lng; ++i) {
	      bits.push(
	        replacement(
	          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
	          str.slice(matchPos[i].match.start, matchPos[i].match.end),
	          str.slice(matchPos[i].left.start, matchPos[i].left.end),
	          str.slice(matchPos[i].right.start, matchPos[i].right.end)
	        )
	      );
	      if (i < lng - 1) {
	        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
	      }
	    }
	    if (matchPos[lng - 1].wholeMatch.end < str.length) {
	      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
	    }
	    finalStr = bits.join('');
	  }
	  return finalStr;
	};

	/**
	 * POLYFILLS
	 */
	if (showdown.helper.isUndefined(console)) {
	  console = {
	    warn: function (msg) {
	      'use strict';
	      alert(msg);
	    },
	    log: function (msg) {
	      'use strict';
	      alert(msg);
	    },
	    error: function (msg) {
	      'use strict';
	      throw msg;
	    }
	  };
	}

	/**
	 * Created by Estevao on 31-05-2015.
	 */

	/**
	 * Showdown Converter class
	 * @class
	 * @param {object} [converterOptions]
	 * @returns {Converter}
	 */
	showdown.Converter = function (converterOptions) {
	  'use strict';

	  var
	      /**
	       * Options used by this converter
	       * @private
	       * @type {{}}
	       */
	      options = {},

	      /**
	       * Language extensions used by this converter
	       * @private
	       * @type {Array}
	       */
	      langExtensions = [],

	      /**
	       * Output modifiers extensions used by this converter
	       * @private
	       * @type {Array}
	       */
	      outputModifiers = [],

	      /**
	       * Event listeners
	       * @private
	       * @type {{}}
	       */
	      listeners = {};

	  _constructor();

	  /**
	   * Converter constructor
	   * @private
	   */
	  function _constructor() {
	    converterOptions = converterOptions || {};

	    for (var gOpt in globalOptions) {
	      if (globalOptions.hasOwnProperty(gOpt)) {
	        options[gOpt] = globalOptions[gOpt];
	      }
	    }

	    // Merge options
	    if (typeof converterOptions === 'object') {
	      for (var opt in converterOptions) {
	        if (converterOptions.hasOwnProperty(opt)) {
	          options[opt] = converterOptions[opt];
	        }
	      }
	    } else {
	      throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
	      ' was passed instead.');
	    }

	    if (options.extensions) {
	      showdown.helper.forEach(options.extensions, _parseExtension);
	    }
	  }

	  /**
	   * Parse extension
	   * @param {*} ext
	   * @param {string} [name='']
	   * @private
	   */
	  function _parseExtension(ext, name) {

	    name = name || null;
	    // If it's a string, the extension was previously loaded
	    if (showdown.helper.isString(ext)) {
	      ext = showdown.helper.stdExtName(ext);
	      name = ext;

	      // LEGACY_SUPPORT CODE
	      if (showdown.extensions[ext]) {
	        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
	          'Please inform the developer that the extension should be updated!');
	        legacyExtensionLoading(showdown.extensions[ext], ext);
	        return;
	      // END LEGACY SUPPORT CODE

	      } else if (!showdown.helper.isUndefined(extensions[ext])) {
	        ext = extensions[ext];

	      } else {
	        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
	      }
	    }

	    if (typeof ext === 'function') {
	      ext = ext();
	    }

	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }

	    var validExt = validate(ext, name);
	    if (!validExt.valid) {
	      throw Error(validExt.error);
	    }

	    for (var i = 0; i < ext.length; ++i) {
	      switch (ext[i].type) {

	        case 'lang':
	          langExtensions.push(ext[i]);
	          break;

	        case 'output':
	          outputModifiers.push(ext[i]);
	          break;
	      }
	      if (ext[i].hasOwnProperty(listeners)) {
	        for (var ln in ext[i].listeners) {
	          if (ext[i].listeners.hasOwnProperty(ln)) {
	            listen(ln, ext[i].listeners[ln]);
	          }
	        }
	      }
	    }

	  }

	  /**
	   * LEGACY_SUPPORT
	   * @param {*} ext
	   * @param {string} name
	   */
	  function legacyExtensionLoading(ext, name) {
	    if (typeof ext === 'function') {
	      ext = ext(new showdown.Converter());
	    }
	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }
	    var valid = validate(ext, name);

	    if (!valid.valid) {
	      throw Error(valid.error);
	    }

	    for (var i = 0; i < ext.length; ++i) {
	      switch (ext[i].type) {
	        case 'lang':
	          langExtensions.push(ext[i]);
	          break;
	        case 'output':
	          outputModifiers.push(ext[i]);
	          break;
	        default:// should never reach here
	          throw Error('Extension loader error: Type unrecognized!!!');
	      }
	    }
	  }

	  /**
	   * Listen to an event
	   * @param {string} name
	   * @param {function} callback
	   */
	  function listen(name, callback) {
	    if (!showdown.helper.isString(name)) {
	      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
	    }

	    if (typeof callback !== 'function') {
	      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
	    }

	    if (!listeners.hasOwnProperty(name)) {
	      listeners[name] = [];
	    }
	    listeners[name].push(callback);
	  }

	  function rTrimInputText(text) {
	    var rsp = text.match(/^\s*/)[0].length,
	        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
	    return text.replace(rgx, '');
	  }

	  /**
	   * Dispatch an event
	   * @private
	   * @param {string} evtName Event name
	   * @param {string} text Text
	   * @param {{}} options Converter Options
	   * @param {{}} globals
	   * @returns {string}
	   */
	  this._dispatch = function dispatch (evtName, text, options, globals) {
	    if (listeners.hasOwnProperty(evtName)) {
	      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
	        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
	        if (nText && typeof nText !== 'undefined') {
	          text = nText;
	        }
	      }
	    }
	    return text;
	  };

	  /**
	   * Listen to an event
	   * @param {string} name
	   * @param {function} callback
	   * @returns {showdown.Converter}
	   */
	  this.listen = function (name, callback) {
	    listen(name, callback);
	    return this;
	  };

	  /**
	   * Converts a markdown string into HTML
	   * @param {string} text
	   * @returns {*}
	   */
	  this.makeHtml = function (text) {
	    //check if text is not falsy
	    if (!text) {
	      return text;
	    }

	    var globals = {
	      gHtmlBlocks:     [],
	      gHtmlMdBlocks:   [],
	      gHtmlSpans:      [],
	      gUrls:           {},
	      gTitles:         {},
	      gDimensions:     {},
	      gListLevel:      0,
	      hashLinkCounts:  {},
	      langExtensions:  langExtensions,
	      outputModifiers: outputModifiers,
	      converter:       this,
	      ghCodeBlocks:    []
	    };

	    // attacklab: Replace ~ with ~T
	    // This lets us use tilde as an escape char to avoid md5 hashes
	    // The choice of character is arbitrary; anything that isn't
	    // magic in Markdown will work.
	    text = text.replace(/~/g, '~T');

	    // attacklab: Replace $ with ~D
	    // RegExp interprets $ as a special character
	    // when it's in a replacement string
	    text = text.replace(/\$/g, '~D');

	    // Standardize line endings
	    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
	    text = text.replace(/\r/g, '\n'); // Mac to Unix

	    if (options.smartIndentationFix) {
	      text = rTrimInputText(text);
	    }

	    // Make sure text begins and ends with a couple of newlines:
	    text = '\n\n' + text + '\n\n';

	    // detab
	    text = showdown.subParser('detab')(text, options, globals);

	    // stripBlankLines
	    text = showdown.subParser('stripBlankLines')(text, options, globals);

	    //run languageExtensions
	    showdown.helper.forEach(langExtensions, function (ext) {
	      text = showdown.subParser('runExtension')(ext, text, options, globals);
	    });

	    // run the sub parsers
	    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
	    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
	    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
	    text = showdown.subParser('hashHTMLSpans')(text, options, globals);
	    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
	    text = showdown.subParser('blockGamut')(text, options, globals);
	    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
	    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

	    // attacklab: Restore dollar signs
	    text = text.replace(/~D/g, '$$');

	    // attacklab: Restore tildes
	    text = text.replace(/~T/g, '~');

	    // Run output modifiers
	    showdown.helper.forEach(outputModifiers, function (ext) {
	      text = showdown.subParser('runExtension')(ext, text, options, globals);
	    });

	    return text;
	  };

	  /**
	   * Set an option of this Converter instance
	   * @param {string} key
	   * @param {*} value
	   */
	  this.setOption = function (key, value) {
	    options[key] = value;
	  };

	  /**
	   * Get the option of this Converter instance
	   * @param {string} key
	   * @returns {*}
	   */
	  this.getOption = function (key) {
	    return options[key];
	  };

	  /**
	   * Get the options of this Converter instance
	   * @returns {{}}
	   */
	  this.getOptions = function () {
	    return options;
	  };

	  /**
	   * Add extension to THIS converter
	   * @param {{}} extension
	   * @param {string} [name=null]
	   */
	  this.addExtension = function (extension, name) {
	    name = name || null;
	    _parseExtension(extension, name);
	  };

	  /**
	   * Use a global registered extension with THIS converter
	   * @param {string} extensionName Name of the previously registered extension
	   */
	  this.useExtension = function (extensionName) {
	    _parseExtension(extensionName);
	  };

	  /**
	   * Set the flavor THIS converter should use
	   * @param {string} name
	   */
	  this.setFlavor = function (name) {
	    if (flavor.hasOwnProperty(name)) {
	      var preset = flavor[name];
	      for (var option in preset) {
	        if (preset.hasOwnProperty(option)) {
	          options[option] = preset[option];
	        }
	      }
	    }
	  };

	  /**
	   * Remove an extension from THIS converter.
	   * Note: This is a costly operation. It's better to initialize a new converter
	   * and specify the extensions you wish to use
	   * @param {Array} extension
	   */
	  this.removeExtension = function (extension) {
	    if (!showdown.helper.isArray(extension)) {
	      extension = [extension];
	    }
	    for (var a = 0; a < extension.length; ++a) {
	      var ext = extension[a];
	      for (var i = 0; i < langExtensions.length; ++i) {
	        if (langExtensions[i] === ext) {
	          langExtensions[i].splice(i, 1);
	        }
	      }
	      for (var ii = 0; ii < outputModifiers.length; ++i) {
	        if (outputModifiers[ii] === ext) {
	          outputModifiers[ii].splice(i, 1);
	        }
	      }
	    }
	  };

	  /**
	   * Get all extension of THIS converter
	   * @returns {{language: Array, output: Array}}
	   */
	  this.getAllExtensions = function () {
	    return {
	      language: langExtensions,
	      output: outputModifiers
	    };
	  };
	};

	/**
	 * Turn Markdown link shortcuts into XHTML <a> tags.
	 */
	showdown.subParser('anchors', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('anchors.before', text, options, globals);

	  var writeAnchorTag = function (wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
	    if (showdown.helper.isUndefined(m7)) {
	      m7 = '';
	    }
	    wholeMatch = m1;
	    var linkText = m2,
	        linkId = m3.toLowerCase(),
	        url = m4,
	        title = m7;

	    if (!url) {
	      if (!linkId) {
	        // lower-case and turn embedded newlines into spaces
	        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
	      }
	      url = '#' + linkId;

	      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
	        url = globals.gUrls[linkId];
	        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
	          title = globals.gTitles[linkId];
	        }
	      } else {
	        if (wholeMatch.search(/\(\s*\)$/m) > -1) {
	          // Special case for explicit empty url
	          url = '';
	        } else {
	          return wholeMatch;
	        }
	      }
	    }

	    url = showdown.helper.escapeCharacters(url, '*_', false);
	    var result = '<a href="' + url + '"';

	    if (title !== '' && title !== null) {
	      title = title.replace(/"/g, '&quot;');
	      title = showdown.helper.escapeCharacters(title, '*_', false);
	      result += ' title="' + title + '"';
	    }

	    result += '>' + linkText + '</a>';

	    return result;
	  };

	  // First, handle reference-style links: [link text] [id]
	  /*
	   text = text.replace(/
	   (							// wrap whole match in $1
	   \[
	   (
	   (?:
	   \[[^\]]*\]		// allow brackets nested one level
	   |
	   [^\[]			// or anything else
	   )*
	   )
	   \]

	   [ ]?					// one optional space
	   (?:\n[ ]*)?				// one optional newline followed by spaces

	   \[
	   (.*?)					// id = $3
	   \]
	   )()()()()					// pad remaining backreferences
	   /g,_DoAnchors_callback);
	   */
	  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, writeAnchorTag);

	  //
	  // Next, inline-style links: [link text](url "optional title")
	  //

	  /*
	   text = text.replace(/
	   (						// wrap whole match in $1
	   \[
	   (
	   (?:
	   \[[^\]]*\]	// allow brackets nested one level
	   |
	   [^\[\]]			// or anything else
	   )
	   )
	   \]
	   \(						// literal paren
	   [ \t]*
	   ()						// no id, so leave $3 empty
	   <?(.*?)>?				// href = $4
	   [ \t]*
	   (						// $5
	   (['"])				// quote char = $6
	   (.*?)				// Title = $7
	   \6					// matching quote
	   [ \t]*				// ignore any spaces/tabs between closing quote and )
	   )?						// title is optional
	   \)
	   )
	   /g,writeAnchorTag);
	   */
	  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
	                      writeAnchorTag);

	  //
	  // Last, handle reference-style shortcuts: [link text]
	  // These must come last in case you've also got [link test][1]
	  // or [link test](/foo)
	  //

	  /*
	   text = text.replace(/
	   (                // wrap whole match in $1
	   \[
	   ([^\[\]]+)       // link text = $2; can't contain '[' or ']'
	   \]
	   )()()()()()      // pad rest of backreferences
	   /g, writeAnchorTag);
	   */
	  text = text.replace(/(\[([^\[\]]+)])()()()()()/g, writeAnchorTag);

	  text = globals.converter._dispatch('anchors.after', text, options, globals);
	  return text;
	});

	showdown.subParser('autoLinks', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

	  var simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,
	      delimUrlRegex   = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,
	      simpleMailRegex = /(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi,
	      delimMailRegex  = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;

	  text = text.replace(delimUrlRegex, replaceLink);
	  text = text.replace(delimMailRegex, replaceMail);
	  // simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[-.+~:?#@!$&'()*,;=[\]\w]+)\b/gi,
	  // Email addresses: <address@domain.foo>

	  if (options.simplifiedAutoLink) {
	    text = text.replace(simpleURLRegex, replaceLink);
	    text = text.replace(simpleMailRegex, replaceMail);
	  }

	  function replaceLink(wm, link) {
	    var lnkTxt = link;
	    if (/^www\./i.test(link)) {
	      link = link.replace(/^www\./i, 'http://www.');
	    }
	    return '<a href="' + link + '">' + lnkTxt + '</a>';
	  }

	  function replaceMail(wholeMatch, m1) {
	    var unescapedStr = showdown.subParser('unescapeSpecialChars')(m1);
	    return showdown.subParser('encodeEmailAddress')(unescapedStr);
	  }

	  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

	  return text;
	});

	/**
	 * These are all the transformations that form block-level
	 * tags like paragraphs, headers, and list items.
	 */
	showdown.subParser('blockGamut', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('blockGamut.before', text, options, globals);

	  // we parse blockquotes first so that we can have headings and hrs
	  // inside blockquotes
	  text = showdown.subParser('blockQuotes')(text, options, globals);
	  text = showdown.subParser('headers')(text, options, globals);

	  // Do Horizontal Rules:
	  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
	  text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key);
	  text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key);
	  text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, key);

	  text = showdown.subParser('lists')(text, options, globals);
	  text = showdown.subParser('codeBlocks')(text, options, globals);
	  text = showdown.subParser('tables')(text, options, globals);

	  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
	  // was to escape raw HTML in the original Markdown source. This time,
	  // we're escaping the markup we've just created, so that we don't wrap
	  // <p> tags around block-level tags.
	  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
	  text = showdown.subParser('paragraphs')(text, options, globals);

	  text = globals.converter._dispatch('blockGamut.after', text, options, globals);

	  return text;
	});

	showdown.subParser('blockQuotes', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);
	  /*
	   text = text.replace(/
	   (								// Wrap whole match in $1
	   (
	   ^[ \t]*>[ \t]?			// '>' at the start of a line
	   .+\n					// rest of the first line
	   (.+\n)*					// subsequent consecutive lines
	   \n*						// blanks
	   )+
	   )
	   /gm, function(){...});
	   */

	  text = text.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (wholeMatch, m1) {
	    var bq = m1;

	    // attacklab: hack around Konqueror 3.5.4 bug:
	    // "----------bug".replace(/^-/g,"") == "bug"
	    bq = bq.replace(/^[ \t]*>[ \t]?/gm, '~0'); // trim one level of quoting

	    // attacklab: clean up hack
	    bq = bq.replace(/~0/g, '');

	    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
	    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
	    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

	    bq = bq.replace(/(^|\n)/g, '$1  ');
	    // These leading spaces screw with <pre> content, so we need to fix that:
	    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
	      var pre = m1;
	      // attacklab: hack around Konqueror 3.5.4 bug:
	      pre = pre.replace(/^  /mg, '~0');
	      pre = pre.replace(/~0/g, '');
	      return pre;
	    });

	    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
	  });

	  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
	  return text;
	});

	/**
	 * Process Markdown `<pre><code>` blocks.
	 */
	showdown.subParser('codeBlocks', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);
	  /*
	   text = text.replace(text,
	   /(?:\n\n|^)
	   (								// $1 = the code block -- one or more lines, starting with a space/tab
	   (?:
	   (?:[ ]{4}|\t)			// Lines must start with a tab or a tab-width of spaces - attacklab: g_tab_width
	   .*\n+
	   )+
	   )
	   (\n*[ ]{0,3}[^ \t\n]|(?=~0))	// attacklab: g_tab_width
	   /g,function(){...});
	   */

	  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
	  text += '~0';

	  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
	  text = text.replace(pattern, function (wholeMatch, m1, m2) {
	    var codeblock = m1,
	        nextChar = m2,
	        end = '\n';

	    codeblock = showdown.subParser('outdent')(codeblock);
	    codeblock = showdown.subParser('encodeCode')(codeblock);
	    codeblock = showdown.subParser('detab')(codeblock);
	    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
	    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

	    if (options.omitExtraWLInCodeBlocks) {
	      end = '';
	    }

	    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

	    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
	  });

	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');

	  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
	  return text;
	});

	/**
	 *
	 *   *  Backtick quotes are used for <code></code> spans.
	 *
	 *   *  You can use multiple backticks as the delimiters if you want to
	 *     include literal backticks in the code span. So, this input:
	 *
	 *         Just type ``foo `bar` baz`` at the prompt.
	 *
	 *       Will translate to:
	 *
	 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
	 *
	 *    There's no arbitrary limit to the number of backticks you
	 *    can use as delimters. If you need three consecutive backticks
	 *    in your code, use four for delimiters, etc.
	 *
	 *  *  You can use spaces to get literal backticks at the edges:
	 *
	 *         ... type `` `bar` `` ...
	 *
	 *       Turns to:
	 *
	 *         ... type <code>`bar`</code> ...
	 */
	showdown.subParser('codeSpans', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('codeSpans.before', text, options, globals);

	  /*
	   text = text.replace(/
	   (^|[^\\])					// Character before opening ` can't be a backslash
	   (`+)						// $2 = Opening run of `
	   (							// $3 = The code block
	   [^\r]*?
	   [^`]					// attacklab: work around lack of lookbehind
	   )
	   \2							// Matching closer
	   (?!`)
	   /gm, function(){...});
	   */

	  if (typeof(text) === 'undefined') {
	    text = '';
	  }
	  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
	    function (wholeMatch, m1, m2, m3) {
	      var c = m3;
	      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
	      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
	      c = showdown.subParser('encodeCode')(c);
	      return m1 + '<code>' + c + '</code>';
	    }
	  );

	  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
	  return text;
	});

	/**
	 * Convert all tabs to spaces
	 */
	showdown.subParser('detab', function (text) {
	  'use strict';

	  // expand first n-1 tabs
	  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

	  // replace the nth with two sentinels
	  text = text.replace(/\t/g, '~A~B');

	  // use the sentinel to anchor our regex so it doesn't explode
	  text = text.replace(/~B(.+?)~A/g, function (wholeMatch, m1) {
	    var leadingText = m1,
	        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

	    // there *must* be a better way to do this:
	    for (var i = 0; i < numSpaces; i++) {
	      leadingText += ' ';
	    }

	    return leadingText;
	  });

	  // clean up sentinels
	  text = text.replace(/~A/g, '    ');  // g_tab_width
	  text = text.replace(/~B/g, '');

	  return text;

	});

	/**
	 * Smart processing for ampersands and angle brackets that need to be encoded.
	 */
	showdown.subParser('encodeAmpsAndAngles', function (text) {
	  'use strict';
	  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
	  // http://bumppo.net/projects/amputator/
	  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

	  // Encode naked <'s
	  text = text.replace(/<(?![a-z\/?\$!])/gi, '&lt;');

	  return text;
	});

	/**
	 * Returns the string, with after processing the following backslash escape sequences.
	 *
	 * attacklab: The polite way to do this is with the new escapeCharacters() function:
	 *
	 *    text = escapeCharacters(text,"\\",true);
	 *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
	 *
	 * ...but we're sidestepping its use of the (slow) RegExp constructor
	 * as an optimization for Firefox.  This function gets called a LOT.
	 */
	showdown.subParser('encodeBackslashEscapes', function (text) {
	  'use strict';
	  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
	  text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, showdown.helper.escapeCharactersCallback);
	  return text;
	});

	/**
	 * Encode/escape certain characters inside Markdown code runs.
	 * The point is that in code, these characters are literals,
	 * and lose their special Markdown meanings.
	 */
	showdown.subParser('encodeCode', function (text) {
	  'use strict';

	  // Encode all ampersands; HTML entities are not
	  // entities within a Markdown code span.
	  text = text.replace(/&/g, '&amp;');

	  // Do the angle bracket song and dance:
	  text = text.replace(/</g, '&lt;');
	  text = text.replace(/>/g, '&gt;');

	  // Now, escape characters that are magic in Markdown:
	  text = showdown.helper.escapeCharacters(text, '*_{}[]\\', false);

	  // jj the line above breaks this:
	  //---
	  //* Item
	  //   1. Subitem
	  //            special char: *
	  // ---

	  return text;
	});

	/**
	 *  Input: an email address, e.g. "foo@example.com"
	 *
	 *  Output: the email address as a mailto link, with each character
	 *    of the address encoded as either a decimal or hex entity, in
	 *    the hopes of foiling most address harvesting spam bots. E.g.:
	 *
	 *    <a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;
	 *       x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;
	 *       &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>
	 *
	 *  Based on a filter by Matthew Wickline, posted to the BBEdit-Talk
	 *  mailing list: <http://tinyurl.com/yu7ue>
	 *
	 */
	showdown.subParser('encodeEmailAddress', function (addr) {
	  'use strict';

	  var encode = [
	    function (ch) {
	      return '&#' + ch.charCodeAt(0) + ';';
	    },
	    function (ch) {
	      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
	    },
	    function (ch) {
	      return ch;
	    }
	  ];

	  addr = 'mailto:' + addr;

	  addr = addr.replace(/./g, function (ch) {
	    if (ch === '@') {
	      // this *must* be encoded. I insist.
	      ch = encode[Math.floor(Math.random() * 2)](ch);
	    } else if (ch !== ':') {
	      // leave ':' alone (to spot mailto: later)
	      var r = Math.random();
	      // roughly 10% raw, 45% hex, 45% dec
	      ch = (
	        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
	      );
	    }
	    return ch;
	  });

	  addr = '<a href="' + addr + '">' + addr + '</a>';
	  addr = addr.replace(/">.+:/g, '">'); // strip the mailto: from the visible part

	  return addr;
	});

	/**
	 * Within tags -- meaning between < and > -- encode [\ ` * _] so they
	 * don't conflict with their use in Markdown for code, italics and strong.
	 */
	showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text) {
	  'use strict';

	  // Build a regex to find HTML tags and comments.  See Friedl's
	  // "Mastering Regular Expressions", 2nd Ed., pp. 200-201.
	  var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;

	  text = text.replace(regex, function (wholeMatch) {
	    var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`');
	    tag = showdown.helper.escapeCharacters(tag, '\\`*_', false);
	    return tag;
	  });

	  return text;
	});

	/**
	 * Handle github codeblocks prior to running HashHTML so that
	 * HTML contained within the codeblock gets escaped properly
	 * Example:
	 * ```ruby
	 *     def hello_world(x)
	 *       puts "Hello, #{x}"
	 *     end
	 * ```
	 */
	showdown.subParser('githubCodeBlocks', function (text, options, globals) {
	  'use strict';

	  // early exit if option is not enabled
	  if (!options.ghCodeBlocks) {
	    return text;
	  }

	  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

	  text += '~0';

	  text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function (wholeMatch, language, codeblock) {
	    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

	    // First parse the github code block
	    codeblock = showdown.subParser('encodeCode')(codeblock);
	    codeblock = showdown.subParser('detab')(codeblock);
	    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
	    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

	    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

	    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

	    // Since GHCodeblocks can be false positives, we need to
	    // store the primitive text and the parsed text in a global var,
	    // and then return a token
	    return '\n\n~G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
	  });

	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');

	  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
	});

	showdown.subParser('hashBlock', function (text, options, globals) {
	  'use strict';
	  text = text.replace(/(^\n+|\n+$)/g, '');
	  return '\n\n~K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
	});

	showdown.subParser('hashElement', function (text, options, globals) {
	  'use strict';

	  return function (wholeMatch, m1) {
	    var blockText = m1;

	    // Undo double lines
	    blockText = blockText.replace(/\n\n/g, '\n');
	    blockText = blockText.replace(/^\n/, '');

	    // strip trailing blank lines
	    blockText = blockText.replace(/\n+$/g, '');

	    // Replace the element text with a marker ("~KxK" where x is its key)
	    blockText = '\n\n~K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

	    return blockText;
	  };
	});

	showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
	  'use strict';

	  var blockTags = [
	      'pre',
	      'div',
	      'h1',
	      'h2',
	      'h3',
	      'h4',
	      'h5',
	      'h6',
	      'blockquote',
	      'table',
	      'dl',
	      'ol',
	      'ul',
	      'script',
	      'noscript',
	      'form',
	      'fieldset',
	      'iframe',
	      'math',
	      'style',
	      'section',
	      'header',
	      'footer',
	      'nav',
	      'article',
	      'aside',
	      'address',
	      'audio',
	      'canvas',
	      'figure',
	      'hgroup',
	      'output',
	      'video',
	      'p'
	    ],
	    repFunc = function (wholeMatch, match, left, right) {
	      var txt = wholeMatch;
	      // check if this html element is marked as markdown
	      // if so, it's contents should be parsed as markdown
	      if (left.search(/\bmarkdown\b/) !== -1) {
	        txt = left + globals.converter.makeHtml(match) + right;
	      }
	      return '\n\n~K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
	    };

	  for (var i = 0; i < blockTags.length; ++i) {
	    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^(?: |\\t){0,3}<' + blockTags[i] + '\\b[^>]*>', '</' + blockTags[i] + '>', 'gim');
	  }

	  // HR SPECIAL CASE
	  text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
	    showdown.subParser('hashElement')(text, options, globals));

	  // Special case for standalone HTML comments:
	  text = text.replace(/(<!--[\s\S]*?-->)/g,
	    showdown.subParser('hashElement')(text, options, globals));

	  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
	  text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
	    showdown.subParser('hashElement')(text, options, globals));

	  return text;
	});

	/**
	 * Hash span elements that should not be parsed as markdown
	 */
	showdown.subParser('hashHTMLSpans', function (text, config, globals) {
	  'use strict';

	  var matches = showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');

	  for (var i = 0; i < matches.length; ++i) {
	    text = text.replace(matches[i][0], '~L' + (globals.gHtmlSpans.push(matches[i][0]) - 1) + 'L');
	  }
	  return text;
	});

	/**
	 * Unhash HTML spans
	 */
	showdown.subParser('unhashHTMLSpans', function (text, config, globals) {
	  'use strict';

	  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
	    text = text.replace('~L' + i + 'L', globals.gHtmlSpans[i]);
	  }

	  return text;
	});

	/**
	 * Hash span elements that should not be parsed as markdown
	 */
	showdown.subParser('hashPreCodeTags', function (text, config, globals) {
	  'use strict';

	  var repFunc = function (wholeMatch, match, left, right) {
	    // encode html entities
	    var codeblock = left + showdown.subParser('encodeCode')(match) + right;
	    return '\n\n~G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
	  };

	  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^(?: |\\t){0,3}</code>\\s*</pre>', 'gim');
	  return text;
	});

	showdown.subParser('headers', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('headers.before', text, options, globals);

	  var prefixHeader = options.prefixHeaderId,
	      headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

	  // Set text-style headers:
	  //	Header 1
	  //	========
	  //
	  //	Header 2
	  //	--------
	  //
	      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
	      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

	  text = text.replace(setextRegexH1, function (wholeMatch, m1) {

	    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
	        hLevel = headerLevelStart,
	        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
	    return showdown.subParser('hashBlock')(hashBlock, options, globals);
	  });

	  text = text.replace(setextRegexH2, function (matchFound, m1) {
	    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
	        hLevel = headerLevelStart + 1,
	      hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
	    return showdown.subParser('hashBlock')(hashBlock, options, globals);
	  });

	  // atx-style headers:
	  //  # Header 1
	  //  ## Header 2
	  //  ## Header 2 with closing hashes ##
	  //  ...
	  //  ###### Header 6
	  //
	  text = text.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function (wholeMatch, m1, m2) {
	    var span = showdown.subParser('spanGamut')(m2, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
	        hLevel = headerLevelStart - 1 + m1.length,
	        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

	    return showdown.subParser('hashBlock')(header, options, globals);
	  });

	  function headerId(m) {
	    var title, escapedId = m.replace(/[^\w]/g, '').toLowerCase();

	    if (globals.hashLinkCounts[escapedId]) {
	      title = escapedId + '-' + (globals.hashLinkCounts[escapedId]++);
	    } else {
	      title = escapedId;
	      globals.hashLinkCounts[escapedId] = 1;
	    }

	    // Prefix id to prevent causing inadvertent pre-existing style matches.
	    if (prefixHeader === true) {
	      prefixHeader = 'section';
	    }

	    if (showdown.helper.isString(prefixHeader)) {
	      return prefixHeader + title;
	    }
	    return title;
	  }

	  text = globals.converter._dispatch('headers.after', text, options, globals);
	  return text;
	});

	/**
	 * Turn Markdown image shortcuts into <img> tags.
	 */
	showdown.subParser('images', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('images.before', text, options, globals);

	  var inlineRegExp    = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,
	      referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;

	  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {

	    var gUrls   = globals.gUrls,
	        gTitles = globals.gTitles,
	        gDims   = globals.gDimensions;

	    linkId = linkId.toLowerCase();

	    if (!title) {
	      title = '';
	    }

	    if (url === '' || url === null) {
	      if (linkId === '' || linkId === null) {
	        // lower-case and turn embedded newlines into spaces
	        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
	      }
	      url = '#' + linkId;

	      if (!showdown.helper.isUndefined(gUrls[linkId])) {
	        url = gUrls[linkId];
	        if (!showdown.helper.isUndefined(gTitles[linkId])) {
	          title = gTitles[linkId];
	        }
	        if (!showdown.helper.isUndefined(gDims[linkId])) {
	          width = gDims[linkId].width;
	          height = gDims[linkId].height;
	        }
	      } else {
	        return wholeMatch;
	      }
	    }

	    altText = altText.replace(/"/g, '&quot;');
	    altText = showdown.helper.escapeCharacters(altText, '*_', false);
	    url = showdown.helper.escapeCharacters(url, '*_', false);
	    var result = '<img src="' + url + '" alt="' + altText + '"';

	    if (title) {
	      title = title.replace(/"/g, '&quot;');
	      title = showdown.helper.escapeCharacters(title, '*_', false);
	      result += ' title="' + title + '"';
	    }

	    if (width && height) {
	      width  = (width === '*') ? 'auto' : width;
	      height = (height === '*') ? 'auto' : height;

	      result += ' width="' + width + '"';
	      result += ' height="' + height + '"';
	    }

	    result += ' />';

	    return result;
	  }

	  // First, handle reference-style labeled images: ![alt text][id]
	  text = text.replace(referenceRegExp, writeImageTag);

	  // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")
	  text = text.replace(inlineRegExp, writeImageTag);

	  text = globals.converter._dispatch('images.after', text, options, globals);
	  return text;
	});

	showdown.subParser('italicsAndBold', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

	  if (options.literalMidWordUnderscores) {
	    //underscores
	    // Since we are consuming a \s character, we need to add it
	    text = text.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, '$1<strong>$2</strong>');
	    text = text.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, '$1<em>$2</em>');
	    //asterisks
	    text = text.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, '<strong>$2</strong>');
	    text = text.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');

	  } else {
	    // <strong> must go first:
	    text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, '<strong>$2</strong>');
	    text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
	  }

	  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
	  return text;
	});

	/**
	 * Form HTML ordered (numbered) and unordered (bulleted) lists.
	 */
	showdown.subParser('lists', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('lists.before', text, options, globals);
	  /**
	   * Process the contents of a single ordered or unordered list, splitting it
	   * into individual list items.
	   * @param {string} listStr
	   * @param {boolean} trimTrailing
	   * @returns {string}
	   */
	  function processListItems (listStr, trimTrailing) {
	    // The $g_list_level global keeps track of when we're inside a list.
	    // Each time we enter a list, we increment it; when we leave a list,
	    // we decrement. If it's zero, we're not in a list anymore.
	    //
	    // We do this because when we're not inside a list, we want to treat
	    // something like this:
	    //
	    //    I recommend upgrading to version
	    //    8. Oops, now this line is treated
	    //    as a sub-list.
	    //
	    // As a single paragraph, despite the fact that the second line starts
	    // with a digit-period-space sequence.
	    //
	    // Whereas when we're inside a list (or sub-list), that line will be
	    // treated as the start of a sub-list. What a kludge, huh? This is
	    // an aspect of Markdown's syntax that's hard to parse perfectly
	    // without resorting to mind-reading. Perhaps the solution is to
	    // change the syntax rules such that sub-lists must start with a
	    // starting cardinal number; e.g. "1." or "a.".
	    globals.gListLevel++;

	    // trim trailing blank lines:
	    listStr = listStr.replace(/\n{2,}$/, '\n');

	    // attacklab: add sentinel to emulate \z
	    listStr += '~0';

	    var rgx = /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
	        isParagraphed = (/\n[ \t]*\n(?!~0)/.test(listStr));

	    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
	      checked = (checked && checked.trim() !== '');
	      var item = showdown.subParser('outdent')(m4, options, globals),
	          bulletStyle = '';

	      // Support for github tasklists
	      if (taskbtn && options.tasklists) {
	        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
	        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
	          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
	          if (checked) {
	            otp += ' checked';
	          }
	          otp += '>';
	          return otp;
	        });
	      }
	      // m1 - Leading line or
	      // Has a double return (multi paragraph) or
	      // Has sublist
	      if (m1 || (item.search(/\n{2,}/) > -1)) {
	        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
	        item = showdown.subParser('blockGamut')(item, options, globals);
	      } else {
	        // Recursion for sub-lists:
	        item = showdown.subParser('lists')(item, options, globals);
	        item = item.replace(/\n$/, ''); // chomp(item)
	        if (isParagraphed) {
	          item = showdown.subParser('paragraphs')(item, options, globals);
	        } else {
	          item = showdown.subParser('spanGamut')(item, options, globals);
	        }
	      }
	      item =  '\n<li' + bulletStyle + '>' + item + '</li>\n';
	      return item;
	    });

	    // attacklab: strip sentinel
	    listStr = listStr.replace(/~0/g, '');

	    globals.gListLevel--;

	    if (trimTrailing) {
	      listStr = listStr.replace(/\s+$/, '');
	    }

	    return listStr;
	  }

	  /**
	   * Check and parse consecutive lists (better fix for issue #142)
	   * @param {string} list
	   * @param {string} listType
	   * @param {boolean} trimTrailing
	   * @returns {string}
	   */
	  function parseConsecutiveLists(list, listType, trimTrailing) {
	    // check if we caught 2 or more consecutive lists by mistake
	    // we use the counterRgx, meaning if listType is UL we look for UL and vice versa
	    var counterRxg = (listType === 'ul') ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm,
	      subLists = [],
	      result = '';

	    if (list.search(counterRxg) !== -1) {
	      (function parseCL(txt) {
	        var pos = txt.search(counterRxg);
	        if (pos !== -1) {
	          // slice
	          result += '\n\n<' + listType + '>' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n\n';

	          // invert counterType and listType
	          listType = (listType === 'ul') ? 'ol' : 'ul';
	          counterRxg = (listType === 'ul') ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm;

	          //recurse
	          parseCL(txt.slice(pos));
	        } else {
	          result += '\n\n<' + listType + '>' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n\n';
	        }
	      })(list);
	      for (var i = 0; i < subLists.length; ++i) {

	      }
	    } else {
	      result = '\n\n<' + listType + '>' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n\n';
	    }

	    return result;
	  }

	  // attacklab: add sentinel to hack around khtml/safari bug:
	  // http://bugs.webkit.org/show_bug.cgi?id=11231
	  text += '~0';

	  // Re-usable pattern to match any entire ul or ol list:
	  var wholeList = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;

	  if (globals.gListLevel) {
	    text = text.replace(wholeList, function (wholeMatch, list, m2) {
	      var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
	      return parseConsecutiveLists(list, listType, true);
	    });
	  } else {
	    wholeList = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
	    //wholeList = /(\n\n|^\n?)( {0,3}([*+-]|\d+\.)[ \t]+[\s\S]+?)(?=(~0)|(\n\n(?!\t| {2,}| {0,3}([*+-]|\d+\.)[ \t])))/g;
	    text = text.replace(wholeList, function (wholeMatch, m1, list, m3) {

	      var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
	      return parseConsecutiveLists(list, listType);
	    });
	  }

	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');

	  text = globals.converter._dispatch('lists.after', text, options, globals);
	  return text;
	});

	/**
	 * Remove one level of line-leading tabs or spaces
	 */
	showdown.subParser('outdent', function (text) {
	  'use strict';

	  // attacklab: hack around Konqueror 3.5.4 bug:
	  // "----------bug".replace(/^-/g,"") == "bug"
	  text = text.replace(/^(\t|[ ]{1,4})/gm, '~0'); // attacklab: g_tab_width

	  // attacklab: clean up hack
	  text = text.replace(/~0/g, '');

	  return text;
	});

	/**
	 *
	 */
	showdown.subParser('paragraphs', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
	  // Strip leading and trailing lines:
	  text = text.replace(/^\n+/g, '');
	  text = text.replace(/\n+$/g, '');

	  var grafs = text.split(/\n{2,}/g),
	      grafsOut = [],
	      end = grafs.length; // Wrap <p> tags

	  for (var i = 0; i < end; i++) {
	    var str = grafs[i];
	    // if this is an HTML marker, copy it
	    if (str.search(/~(K|G)(\d+)\1/g) >= 0) {
	      grafsOut.push(str);
	    } else {
	      str = showdown.subParser('spanGamut')(str, options, globals);
	      str = str.replace(/^([ \t]*)/g, '<p>');
	      str += '</p>';
	      grafsOut.push(str);
	    }
	  }

	  /** Unhashify HTML blocks */
	  end = grafsOut.length;
	  for (i = 0; i < end; i++) {
	    var blockText = '',
	        grafsOutIt = grafsOut[i],
	        codeFlag = false;
	    // if this is a marker for an html block...
	    while (grafsOutIt.search(/~(K|G)(\d+)\1/) >= 0) {
	      var delim = RegExp.$1,
	          num   = RegExp.$2;

	      if (delim === 'K') {
	        blockText = globals.gHtmlBlocks[num];
	      } else {
	        // we need to check if ghBlock is a false positive
	        if (codeFlag) {
	          // use encoded version of all text
	          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text);
	        } else {
	          blockText = globals.ghCodeBlocks[num].codeblock;
	        }
	      }
	      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

	      grafsOutIt = grafsOutIt.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, blockText);
	      // Check if grafsOutIt is a pre->code
	      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
	        codeFlag = true;
	      }
	    }
	    grafsOut[i] = grafsOutIt;
	  }
	  text = grafsOut.join('\n\n');
	  // Strip leading and trailing lines:
	  text = text.replace(/^\n+/g, '');
	  text = text.replace(/\n+$/g, '');
	  return globals.converter._dispatch('paragraphs.after', text, options, globals);
	});

	/**
	 * Run extension
	 */
	showdown.subParser('runExtension', function (ext, text, options, globals) {
	  'use strict';

	  if (ext.filter) {
	    text = ext.filter(text, globals.converter, options);

	  } else if (ext.regex) {
	    // TODO remove this when old extension loading mechanism is deprecated
	    var re = ext.regex;
	    if (!re instanceof RegExp) {
	      re = new RegExp(re, 'g');
	    }
	    text = text.replace(re, ext.replace);
	  }

	  return text;
	});

	/**
	 * These are all the transformations that occur *within* block-level
	 * tags like paragraphs, headers, and list items.
	 */
	showdown.subParser('spanGamut', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
	  text = showdown.subParser('codeSpans')(text, options, globals);
	  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
	  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);

	  // Process anchor and image tags. Images must come first,
	  // because ![foo][f] looks like an anchor.
	  text = showdown.subParser('images')(text, options, globals);
	  text = showdown.subParser('anchors')(text, options, globals);

	  // Make links out of things like `<http://example.com/>`
	  // Must come after _DoAnchors(), because you can use < and >
	  // delimiters in inline links like [this](<url>).
	  text = showdown.subParser('autoLinks')(text, options, globals);
	  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);
	  text = showdown.subParser('italicsAndBold')(text, options, globals);
	  text = showdown.subParser('strikethrough')(text, options, globals);

	  // Do hard breaks:
	  text = text.replace(/  +\n/g, ' <br />\n');

	  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
	  return text;
	});

	showdown.subParser('strikethrough', function (text, options, globals) {
	  'use strict';

	  if (options.strikethrough) {
	    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
	    text = text.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, '<del>$1</del>');
	    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
	  }

	  return text;
	});

	/**
	 * Strip any lines consisting only of spaces and tabs.
	 * This makes subsequent regexs easier to write, because we can
	 * match consecutive blank lines with /\n+/ instead of something
	 * contorted like /[ \t]*\n+/
	 */
	showdown.subParser('stripBlankLines', function (text) {
	  'use strict';
	  return text.replace(/^[ \t]+$/mg, '');
	});

	/**
	 * Strips link definitions from text, stores the URLs and titles in
	 * hash references.
	 * Link defs are in the form: ^[id]: url "optional title"
	 *
	 * ^[ ]{0,3}\[(.+)\]: // id = $1  attacklab: g_tab_width - 1
	 * [ \t]*
	 * \n?                  // maybe *one* newline
	 * [ \t]*
	 * <?(\S+?)>?          // url = $2
	 * [ \t]*
	 * \n?                // maybe one newline
	 * [ \t]*
	 * (?:
	 * (\n*)              // any lines skipped = $3 attacklab: lookbehind removed
	 * ["(]
	 * (.+?)              // title = $4
	 * [")]
	 * [ \t]*
	 * )?                 // title is optional
	 * (?:\n+|$)
	 * /gm,
	 * function(){...});
	 *
	 */
	showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
	  'use strict';

	  var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;

	  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
	  text += '~0';

	  text = text.replace(regex, function (wholeMatch, linkId, url, width, height, blankLines, title) {
	    linkId = linkId.toLowerCase();
	    globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url);  // Link IDs are case-insensitive

	    if (blankLines) {
	      // Oops, found blank lines, so it's not a title.
	      // Put back the parenthetical statement we stole.
	      return blankLines + title;

	    } else {
	      if (title) {
	        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
	      }
	      if (options.parseImgDimensions && width && height) {
	        globals.gDimensions[linkId] = {
	          width:  width,
	          height: height
	        };
	      }
	    }
	    // Completely remove the definition from the text
	    return '';
	  });

	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');

	  return text;
	});

	showdown.subParser('tables', function (text, options, globals) {
	  'use strict';

	  if (!options.tables) {
	    return text;
	  }

	  var tableRgx = /^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;

	  function parseStyles(sLine) {
	    if (/^:[ \t]*--*$/.test(sLine)) {
	      return ' style="text-align:left;"';
	    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
	      return ' style="text-align:right;"';
	    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
	      return ' style="text-align:center;"';
	    } else {
	      return '';
	    }
	  }

	  function parseHeaders(header, style) {
	    var id = '';
	    header = header.trim();
	    if (options.tableHeaderId) {
	      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
	    }
	    header = showdown.subParser('spanGamut')(header, options, globals);

	    return '<th' + id + style + '>' + header + '</th>\n';
	  }

	  function parseCells(cell, style) {
	    var subText = showdown.subParser('spanGamut')(cell, options, globals);
	    return '<td' + style + '>' + subText + '</td>\n';
	  }

	  function buildTable(headers, cells) {
	    var tb = '<table>\n<thead>\n<tr>\n',
	        tblLgn = headers.length;

	    for (var i = 0; i < tblLgn; ++i) {
	      tb += headers[i];
	    }
	    tb += '</tr>\n</thead>\n<tbody>\n';

	    for (i = 0; i < cells.length; ++i) {
	      tb += '<tr>\n';
	      for (var ii = 0; ii < tblLgn; ++ii) {
	        tb += cells[i][ii];
	      }
	      tb += '</tr>\n';
	    }
	    tb += '</tbody>\n</table>\n';
	    return tb;
	  }

	  text = globals.converter._dispatch('tables.before', text, options, globals);

	  text = text.replace(tableRgx, function (rawTable) {

	    var i, tableLines = rawTable.split('\n');

	    // strip wrong first and last column if wrapped tables are used
	    for (i = 0; i < tableLines.length; ++i) {
	      if (/^[ \t]{0,3}\|/.test(tableLines[i])) {
	        tableLines[i] = tableLines[i].replace(/^[ \t]{0,3}\|/, '');
	      }
	      if (/\|[ \t]*$/.test(tableLines[i])) {
	        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
	      }
	    }

	    var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim();}),
	        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim();}),
	        rawCells = [],
	        headers = [],
	        styles = [],
	        cells = [];

	    tableLines.shift();
	    tableLines.shift();

	    for (i = 0; i < tableLines.length; ++i) {
	      if (tableLines[i].trim() === '') {
	        continue;
	      }
	      rawCells.push(
	        tableLines[i]
	          .split('|')
	          .map(function (s) {
	            return s.trim();
	          })
	      );
	    }

	    if (rawHeaders.length < rawStyles.length) {
	      return rawTable;
	    }

	    for (i = 0; i < rawStyles.length; ++i) {
	      styles.push(parseStyles(rawStyles[i]));
	    }

	    for (i = 0; i < rawHeaders.length; ++i) {
	      if (showdown.helper.isUndefined(styles[i])) {
	        styles[i] = '';
	      }
	      headers.push(parseHeaders(rawHeaders[i], styles[i]));
	    }

	    for (i = 0; i < rawCells.length; ++i) {
	      var row = [];
	      for (var ii = 0; ii < headers.length; ++ii) {
	        if (showdown.helper.isUndefined(rawCells[i][ii])) {

	        }
	        row.push(parseCells(rawCells[i][ii], styles[ii]));
	      }
	      cells.push(row);
	    }

	    return buildTable(headers, cells);
	  });

	  text = globals.converter._dispatch('tables.after', text, options, globals);

	  return text;
	});

	/**
	 * Swap back in all the special characters we've hidden.
	 */
	showdown.subParser('unescapeSpecialChars', function (text) {
	  'use strict';

	  text = text.replace(/~E(\d+)E/g, function (wholeMatch, m1) {
	    var charCodeToReplace = parseInt(m1);
	    return String.fromCharCode(charCodeToReplace);
	  });
	  return text;
	});

	var root = this;

	// CommonJS/nodeJS Loader
	if (typeof module !== 'undefined' && module.exports) {
	  module.exports = showdown;

	// AMD Loader
	} else if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';
	    return showdown;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	// Regular Browser loader
	} else {
	  root.showdown = showdown;
	}
	}).call(this);

	//# sourceMappingURL=showdown.js.map


/***/ },
/* 12 */
/***/ function(module, exports) {

	function FlowInterface(apiFlowURL) {
	    var apiFlowReady = false;
	    var apiFlowURL = apiFlowURL;
	    var worker = null;
	    var callbacks = {};

	    var globalCallback = function() {};

	    var _uuid = function() {
	        var d = new Date().getTime();
	        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
	        .replace(/[xy]/g, function(c) {
	            var r = (d + Math.random() * 16) % 16 | 0;
	            d = Math.floor(d / 16);
	            return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
	        });
	        return uuid;
	    }

	    var apiFlowCallback = function(ev) {
	        var blob = new Blob([ ev.target.responseText ], { type: "text/javascript" });
	        var blobURL = window.URL.createObjectURL(blob);
	        worker = new Worker(blobURL);

	        worker.addEventListener("message", function(ev) {
	            if (typeof callbacks[ev.data.uuid] === 'function') {
	                callbacks[ev.data.uuid](ev.data.error || null, ev.data.generated || null);
	            }
	            globalCallback(ev.data.error || null, ev.data.generated || null);
	            delete callbacks[ev.data.uuid];
	        })

	        apiFlowReady = true;
	        processQueue();
	    }

	    var queue = [];
	    var processQueue = function() {
	        while (queue.length > 0) {
	            var query = queue.shift();
	            worker.postMessage(query);
	        }
	    }

	    this.setGlobalCallback = function(cb) {
	        if (cb) {
	            globalCallback = cb
	        }
	        else {
	            globalCallback = function() {};
	        }
	    }

	    this.transform = function(
	        content, contentType, sourceFormat, targetFormat, _resolutionOptions, callback
	    ) {
	        var resolutionOptions = _resolutionOptions || {};
	        resolutionOptions.remote = false;
	        resolutionOptions.local = false;

	        var uuid = _uuid();
	        callbacks[uuid] = callback;
	        queue.push({
	            action: 'transform',
	            content: content,
	            contentType: contentType,
	            sourceFormat: sourceFormat,
	            targetFormat: targetFormat,
	            resolutionOptions: resolutionOptions,
	            uuid: uuid
	        });

	        if (apiFlowReady) {
	            processQueue()
	        }
	    }

	    this.detect = function(content, callback) {
	        var uuid = _uuid();
	        callbacks[uuid] = callback;
	        queue.push({
	            action: 'detect',
	            content: content,
	            uuid: uuid
	        });

	        if (apiFlowReady) {
	            processQueue()
	        }
	    }

	    var req = new XMLHttpRequest();
	    req.addEventListener("load", apiFlowCallback);
	    req.open("GET", apiFlowURL);
	    req.send();
	}

	module.exports = FlowInterface


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports =
	`<div class='ric-dropdown'><span>Run in Console</span>
	    <div class='ric-dropdown-content'>
	        <h5>Visual Http clients</h5>
	        <ul class='ric-list'>
	            <li class='ric-action' data-open-with='paw'>Paw <span class='ric-action-text'>open</span></li>
	            <li class='ric-action' data-open-with='postman'>Postman <span class='ric-action-text'>download</span></li>
	            <li class='ric-action' data-open-with='dhc'>DHC <span class='ric-action-text'>download</span></li>
	        </ul>
	        <div class='ric-divider'></div>
	        <h5>API description formats</h5>
	        <ul class='ric-list'>
	            <li class='ric-action' data-open-with='swagger'>OpenAPI (aka. Swagger)  <span class='ric-action-text'>download</span></li>
	            <li class='ric-action' data-open-with='raml'>RAML <span class='ric-action-text'>download</span></li>
	        </ul>
	        <div class='ric-divider'></div>
	        <h5>Command line</h5>
	        <ul class='ric-list'>
	            <li class='ric-action'>curl</li>
	            <li class='ric-action'>httpie</li>
	        </ul>
	        <div class='ric-divider'></div>service provided by <a href='https://luckymarmot.com/paw'>Paw</a></div>
	</div>`


/***/ },
/* 14 */
/***/ function(module, exports) {

	var loadFonts = function() {
	    var wf = document.createElement('script');
	    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	      '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
	    wf.type = 'text/javascript';
	    wf.async = 'true';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(wf, s);
	}

	module.exports = loadFonts


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {


	(function(window) {
	    var pawCSSLink = "../src/exporters/paw/paw.css"
	    if (window.paw) {
	        return;
	    }

	    window.addEventListener("keydown", function(e) {
	        if (e.keyCode === 27 && _hideOpenInPaw()) {
	            e.preventDefault();
	            return false;
	        }
	    });


	    var _CSSIsLoaded = false

	    var _el = function(t, ens, cb, tout) {
	        var _called = false;
	        var _cb = function(e) {
	            if (!_called) {
	                _called = true;
	                cb(e);
	            }

	        }
	        for (en in ens) {
	            t.addEventListener(en, _cb);
	        }
	        if (tout) {
	            window.setTimeout(_cb, tout);
	        }
	    }

	    var _loadCSS = function(href, onload) {
	        var ss = window.document.createElement("link");
	        ss.rel = "stylesheet";
	        ss.href = href;
	        ss.media = "all";
	        ss.onload = function() {
	            window.setTimeout(onload, 100);
	        }
	        document.getElementsByTagName("body")[0].appendChild(ss);
	    }

	    var _hideOpenInPaw = function() {
	        var outer = document.getElementById("openinpaw-outer");
	        if (outer) {
	            var oip = outer.getElementsByClassName('openinpaw')[0];
	            oip.className = "openinpaw fadeout";
	            outer.style.opacity = 0;
	            _el(oip, ["animationend", "webkitAnimationEnd"], function() {
	                outer.style.display = "none";
	            }, 350);
	            return true;
	        }
	    }

	    var _showOpenInPaw = function(document_name, pawlink){
	        var _openInPawHTML = __webpack_require__(16);
	        var _webUrl = function() {
	            return 'https://luckymarmot.com/paw?' +
	            "utm_source=" + encodeURIComponent(window.location.host) + "&" +
	            "utm_medium=openinpaw-js&" +
	            "utm_term=" + encodeURIComponent(document_name) + "&" +
	            "utm_content=" + encodeURIComponent(document_name) + "&" +
	            "utm_campaign=openinpaw-js";
	        }

	        var _showOuter = function() {
	            var outer = document.getElementById("openinpaw-outer")
	            if (!outer) {
	                var outer = document.createElement("div");
	                outer.id = outer.className = "openinpaw-outer";
	                document.getElementsByTagName("body")[0].appendChild(outer);
	            }
	            console.log('_openInPawHTML', _openInPawHTML(document_name, pawlink, _webUrl()))
	            outer.innerHTML = _openInPawHTML(document_name, pawlink, _webUrl());
	            outer.getElementsByClassName('openinpaw')[0].className = "openinpaw fadein";
	            outer.style.opacity = 1;
	            outer.style.display = "";
	            outer.onclick = function(e) {
	                if (e.target === outer || e.target.parentNode === outer) {
	                    _hideOpenInPaw();
	                }
	            };
	        }

	        if (_CSSIsLoaded) {
	            _showOuter();
	        }
	        else {
	            _CSSIsLoaded = true;
	            _loadCSS("http://fonts.googleapis.com/css?family=Open+Sans:400,300");
	            _loadCSS(pawCSSLink, function(){
	                _showOuter();
	            });
	        }
	    }

	    var _p = {}

	    _p.open = function(d) {
	        if (d.deeplink) {
	            _showOpenInPaw((d.apiname || document.title), d.deeplink);
	        }
	        else if (d.a) {
	            _showOpenInPaw((d.apiname || d.a.getAttribute('data-paw-api-name') || document.title), d.a.href);
	        }
	    };

	    module.exports = _p;
	})(window);


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(document_name, pawlink, web_url) {
	    return '<div class="openinpaw-middle">' +
	        '<div class="openinpaw fadein">' +
	            '<div class="hd">' +
	                '<span class="appicon"></span> Open in <span class="appname">Paw</span>' +
	            '</div>' +
	            '<div class="bd">' +
	                '<span class="dc">Open "` + document_name + `" in Paw - the ultimate HTTP client for Mac.</span>' +
	                '<div class="scc"><span class="sc"></span></div>' +
	                '<div class="btnblk-container">' +
	                    '<div class="btnblk">' +
	                        '<span>Learn more about Paw</span>' +
	                        '<a href="' + web_url + '" class="openinpaw-a-get" target="_blank">Get Paw</a>' +
	                    '</div>' +
	                    '<div class="btnblk">' +
	                        '<span>I already have Paw</span>' +
	                        '<a href="' + pawlink + '" class="openinpaw-a-open">Open in Paw</a>' +
	                    '</div>' +
	                    '<div class="clr"></div>' +
	                '</div>' +
	            '</div>' +
	        '</div>' +
	    '</div>'
	}


/***/ }
/******/ ])
});
;
