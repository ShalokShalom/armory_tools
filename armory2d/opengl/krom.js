(function ($hx_exports, $global) { "use strict";
$hx_exports["kha"] = $hx_exports["kha"] || {};
$hx_exports["kha"]["input"] = $hx_exports["kha"]["input"] || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	var w = 1600;
	var h = 900;
	if(kha_Display.get_primary() != null) {
		if(w > kha_Display.get_primary().get_width()) {
			w = kha_Display.get_primary().get_width();
		}
		if(h > kha_Display.get_primary().get_height() - 30) {
			h = kha_Display.get_primary().get_height() - 30;
		}
	}
	kha_System.start(new kha_SystemOptions("Armory2D",w,h,null,new kha_FramebufferOptions(60,true,32,16,8,2)),Main.initialized);
};
Main.initialized = function($window) {
	Main.prefs = { path : "", scaleFactor : 1.0, keyMap : { selectMouseButton : "Left", grabKey : 71, rotateKey : 82, sizeKey : 83, slowMovement : 16, gridInvert : 17, gridInvertRelative : 18}};
	var c = Krom.getArgCount();
	if(c > 4) {
		Main.prefs.path = Krom.getArg(3);
	}
	if(c > 5) {
		var tmp = parseFloat(Krom.getArg(4));
		Main.prefs.scaleFactor = tmp;
	}
	var ar = Main.prefs.path.split("/");
	ar.pop();
	Main.cwd = ar.join("/");
	if(Main.cwd != "") {
		var path = kha_System.get_systemId() == "Windows" ? StringTools.replace(Main.prefs.path,"/","\\") : Main.prefs.path;
		kha_Assets.loadBlobFromPath(path,function(cblob) {
			var raw = JSON.parse(cblob.toString());
			Main.inst = new arm2d_Editor(raw);
		},null,{ fileName : "Main.hx", lineNumber : 58, className : "Main", methodName : "initialized"});
	} else {
		Main.prefs.path = Krom.getFilesLocation();
		var raw = { name : "untitled", x : 0, y : 0, width : 1280, height : 720, theme : "Default Light", elements : [], assets : []};
		Main.inst = new arm2d_Editor(raw);
	}
};
Main.loadDefaultKeyMap = function() {
	Main.prefs.keyMap.grabKey = 71;
	Main.prefs.keyMap.rotateKey = 82;
	Main.prefs.keyMap.sizeKey = 83;
	Main.prefs.keyMap.slowMovement = 16;
	Main.prefs.keyMap.gridInvert = 17;
	Main.prefs.keyMap.gridInvertRelative = 18;
};
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.copy = function(o) {
	if(o == null) {
		return null;
	}
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
var UInt = {};
UInt.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a > b;
	}
};
UInt.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a >= b;
	}
};
UInt.toFloat = function(this1) {
	var int = this1;
	if(int < 0) {
		return 4294967296.0 + int;
	} else {
		return int + 0.0;
	}
};
var arm2d_Assets = function() { };
$hxClasses["arm2d.Assets"] = arm2d_Assets;
arm2d_Assets.__name__ = true;
arm2d_Assets.getImage = function(asset) {
	return armory_ui_Canvas.assetMap.h[asset.id];
};
arm2d_Assets.getFont = function(asset) {
	return armory_ui_Canvas.assetMap.h[asset.id];
};
arm2d_Assets.importAsset = function(canvas,path) {
	var abspath = arm2d_Path.toAbsolute(path,Main.cwd);
	if(kha_System.get_systemId() == "Windows") {
		abspath = StringTools.replace(abspath,"/","\\");
	}
	if(arm2d_Assets.isPathImage(path)) {
		kha_Assets.loadImageFromPath(abspath,false,function(image) {
			var ar = path.split("/");
			var name = ar[ar.length - 1];
			var asset = { name : name, file : path, id : armory_ui_Canvas.getAssetId(canvas)};
			canvas.assets.push(asset);
			armory_ui_Canvas.assetMap.h[asset.id] = image;
			arm2d_Editor.assetNames.push(name);
			arm2d_ui_UIProperties.hwin.redraws = 2;
		},null,{ fileName : "arm2d/Assets.hx", lineNumber : 25, className : "arm2d.Assets", methodName : "importAsset"});
	} else if(haxe_io_Path.extension(path).toLowerCase() == "ttf") {
		kha_Assets.loadFontFromPath(abspath,function(font) {
			var ar = path.split("/");
			var name = ar[ar.length - 1];
			var asset = { name : name, file : path, id : armory_ui_Canvas.getAssetId(canvas)};
			canvas.assets.push(asset);
			armory_ui_Canvas.assetMap.h[asset.id] = font;
			arm2d_Editor.assetNames.push(name);
			arm2d_ui_UIProperties.hwin.redraws = 2;
		},null,{ fileName : "arm2d/Assets.hx", lineNumber : 37, className : "arm2d.Assets", methodName : "importAsset"});
	}
};
arm2d_Assets.importThemes = function() {
	var themesDir = haxe_io_Path.directory(Main.prefs.path);
	var themesPath = haxe_io_Path.join([themesDir,"_themes.json"]);
	if(kha_System.get_systemId() == "Windows") {
		themesPath = StringTools.replace(themesPath,"/","\\");
	}
	try {
		kha_Assets.loadBlobFromPath(themesPath,function(b) {
			armory_ui_Canvas.themes = JSON.parse(b.toString());
			if(armory_ui_Canvas.themes.length == 0) {
				armory_ui_Canvas.themes.push(Reflect.copy(armory_ui_Themes.light));
			}
			if(Main.inst != null) {
				arm2d_Editor.selectedTheme = armory_ui_Canvas.themes[0];
			}
		},function(a) {
			armory_ui_Canvas.themes.push(Reflect.copy(armory_ui_Themes.light));
			if(Main.inst != null) {
				arm2d_Editor.selectedTheme = armory_ui_Canvas.themes[0];
			}
		},{ fileName : "arm2d/Assets.hx", lineNumber : 60, className : "arm2d.Assets", methodName : "importThemes"});
	} catch( _g ) {
		armory_ui_Canvas.themes.push(Reflect.copy(armory_ui_Themes.light));
		if(Main.inst != null) {
			arm2d_Editor.selectedTheme = armory_ui_Canvas.themes[0];
		}
	}
};
arm2d_Assets.save = function(canvas) {
	canvas.x = 0;
	canvas.y = 0;
	arm2d_Assets.saveCanvas(canvas);
	arm2d_Assets.saveAssets(canvas);
	arm2d_Assets.saveThemes();
	canvas.x = arm2d_Editor.coffX;
	canvas.y = arm2d_Editor.coffY;
};
arm2d_Assets.load = function(done) {
	kha_Assets.loadBlobFromPath(Main.prefs.path,function(b) {
		var canvas = JSON.parse(b.toString());
		done(canvas);
	},null,{ fileName : "arm2d/Assets.hx", lineNumber : 96, className : "arm2d.Assets", methodName : "load"});
};
arm2d_Assets.saveCanvas = function(canvas) {
	Krom.fileSaveBytes(Main.prefs.path,haxe_io_Bytes.ofString(JSON.stringify(canvas)).b.bufferValue);
};
arm2d_Assets.saveAssets = function(canvas) {
	var filesPath = HxOverrides.substr(Main.prefs.path,0,Main.prefs.path.length - 5);
	filesPath += ".files";
	var filesList = "";
	var _g = 0;
	var _g1 = canvas.assets;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		filesList += a.file + "\n";
	}
	Krom.fileSaveBytes(filesPath,haxe_io_Bytes.ofString(filesList).b.bufferValue);
};
arm2d_Assets.saveThemes = function() {
	var themesPath = haxe_io_Path.join([haxe_io_Path.directory(Main.prefs.path),"_themes.json"]);
	Krom.fileSaveBytes(themesPath,haxe_io_Bytes.ofString(JSON.stringify(armory_ui_Canvas.themes)).b.bufferValue);
};
arm2d_Assets.getEnumTexts = function() {
	if(Main.inst == null) {
		return [""];
	}
	if(arm2d_Editor.assetNames.length > 0) {
		return arm2d_Editor.assetNames;
	} else {
		return [""];
	}
};
arm2d_Assets.getAssetIndex = function(canvas,asset) {
	var _g = 0;
	var _g1 = canvas.assets.length;
	while(_g < _g1) {
		var i = _g++;
		if(asset == canvas.assets[i].name) {
			return i + 1;
		}
	}
	return 0;
};
arm2d_Assets.isPathImage = function(path) {
	var extension = haxe_io_Path.extension(path).toLowerCase();
	if(!(extension == "jpg" || extension == "png" || extension == "k")) {
		return extension == "hdr";
	} else {
		return true;
	}
};
arm2d_Assets.isPathFont = function(path) {
	return haxe_io_Path.extension(path).toLowerCase() == "ttf";
};
var arm2d_Editor = function(canvas) {
	this.lastCanvasH = 0;
	this.lastCanvasW = 0;
	this.lastH = 0;
	this.lastW = 0;
	this.selectedFrame = 0;
	this.zoom = 1.0;
	this.resizeCanvas = false;
	this.dropPath = "";
	this.canvas = canvas;
	if(canvas.assets.length > 0) {
		var assets = canvas.assets;
		canvas.assets = [];
		var _g = 0;
		while(_g < assets.length) {
			var a = assets[_g];
			++_g;
			arm2d_Assets.importAsset(canvas,a.file);
		}
	}
	arm2d_Assets.importThemes();
	kha_Assets.loadEverything($bind(this,this.loaded));
};
$hxClasses["arm2d.Editor"] = arm2d_Editor;
arm2d_Editor.__name__ = true;
arm2d_Editor.__properties__ = {get_uiw:"get_uiw"};
arm2d_Editor.get_uiw = function() {
	return arm2d_Editor.windowW * Main.prefs.scaleFactor | 0;
};
arm2d_Editor.prototype = {
	ui: null
	,cui: null
	,canvas: null
	,toolbarw: null
	,get_toolbarw: function() {
		return 140 * this.ui.ops.scaleFactor | 0;
	}
	,dropPath: null
	,resizeCanvas: null
	,zoom: null
	,uimodal: null
	,selectedFrame: null
	,lastW: null
	,lastH: null
	,lastCanvasW: null
	,lastCanvasH: null
	,loaded: function() {
		var _gthis = this;
		var t = Reflect.copy(zui_Themes.dark);
		t.FILL_WINDOW_BG = true;
		this.ui = new zui_Zui({ scaleFactor : Main.prefs.scaleFactor, font : kha_Assets.fonts.font_default, theme : t, color_wheel : kha_Assets.images.color_wheel});
		this.cui = new zui_Zui({ scaleFactor : 1.0, font : kha_Assets.fonts.font_default, autoNotifyInput : true, theme : Reflect.copy(armory_ui_Canvas.getTheme(this.canvas.theme))});
		this.uimodal = new zui_Zui({ font : kha_Assets.fonts.font_default, scaleFactor : Main.prefs.scaleFactor});
		arm2d_ElementController.initialize(this.ui,this.cui);
		if(armory_ui_Canvas.getTheme(this.canvas.theme) == null) {
			armory_ui_Popup.showMessage(new zui_Zui(this.ui.ops),"Warning!","Theme \"" + this.canvas.theme + "\" was not found!" + ("\nUsing first theme in list instead: \"" + armory_ui_Canvas.themes[0].NAME + "\""));
			this.canvas.theme = armory_ui_Canvas.themes[0].NAME;
		}
		kha_System.notifyOnDropFiles(function(path) {
			_gthis.dropPath = StringTools.rtrim(path);
			_gthis.dropPath = arm2d_Path.toRelative(_gthis.dropPath,Main.cwd);
		});
		kha_System.notifyOnFrames($bind(this,this.onFrames));
		kha_Scheduler.addTimeTask($bind(this,this.update),0,0.016666666666666666);
	}
	,resize: function() {
		if(arm2d_Editor.grid != null) {
			arm2d_Editor.grid.unload();
			arm2d_Editor.grid = null;
		}
		if(arm2d_Editor.timeline != null) {
			arm2d_Editor.timeline.unload();
			arm2d_Editor.timeline = null;
		}
	}
	,drawGrid: function() {
		var scaledGridSize = arm2d_Editor.gridSize * this.cui.ops.scaleFactor | 0;
		var doubleGridSize = arm2d_Editor.gridSize * 2 * this.cui.ops.scaleFactor | 0;
		var ww = kha_System.windowWidth();
		var wh = kha_System.windowHeight();
		var w = ww + doubleGridSize * 2;
		var h = wh + doubleGridSize * 2;
		arm2d_Editor.grid = kha_Image.createRenderTarget(w,h);
		arm2d_Editor.grid.get_g2().begin(true,-14408668);
		var _g = 0;
		var _g1 = (h / doubleGridSize | 0) + 1;
		while(_g < _g1) {
			var i = _g++;
			arm2d_Editor.grid.get_g2().set_color(-14145496);
			arm2d_Editor.grid.get_g2().drawLine(0,i * doubleGridSize + scaledGridSize,w,i * doubleGridSize + scaledGridSize);
			arm2d_Editor.grid.get_g2().set_color(-13487566);
			arm2d_Editor.grid.get_g2().drawLine(0,i * doubleGridSize,w,i * doubleGridSize);
		}
		var _g = 0;
		var _g1 = (w / doubleGridSize | 0) + 1;
		while(_g < _g1) {
			var i = _g++;
			arm2d_Editor.grid.get_g2().set_color(-14145496);
			arm2d_Editor.grid.get_g2().drawLine(i * doubleGridSize + scaledGridSize,0,i * doubleGridSize + scaledGridSize,h);
			arm2d_Editor.grid.get_g2().set_color(-13487566);
			arm2d_Editor.grid.get_g2().drawLine(i * doubleGridSize,0,i * doubleGridSize,h);
		}
		arm2d_Editor.grid.get_g2().end();
	}
	,drawTimeline: function(timelineLabelsHeight,timelineFramesHeight) {
		var sc = this.ui.ops.scaleFactor;
		var timelineHeight = timelineLabelsHeight + timelineFramesHeight;
		arm2d_Editor.timeline = kha_Image.createRenderTarget(kha_System.windowWidth() - arm2d_Editor.get_uiw() - this.get_toolbarw(),timelineHeight);
		var g = arm2d_Editor.timeline.get_g2();
		g.begin(true,-14540254);
		g.set_font(kha_Assets.fonts.font_default);
		g.set_fontSize(16 * sc | 0);
		var frames = arm2d_Editor.timeline.get_width() / (11 * sc) | 0;
		var _g = 0;
		var _g1 = (frames / 5 | 0) + 1;
		while(_g < _g1) {
			var i = _g++;
			var frame = i * 5;
			var frameTextWidth = kha_Assets.fonts.font_default.width(g.get_fontSize(),frame + "");
			g.drawString(frame + "",i * 55 * sc + 5 * sc - frameTextWidth / 2,timelineLabelsHeight / 2 - g.get_fontSize() / 2);
		}
		var _g = 0;
		var _g1 = frames;
		while(_g < _g1) {
			var i = _g++;
			g.set_color(i % 5 == 0 ? -12303292 : -13421773);
			g.fillRect(i * 11 * sc,timelineHeight - timelineFramesHeight,10 * sc,timelineFramesHeight);
		}
		g.end();
	}
	,onFrames: function(framebuffers) {
		if(kha_System.windowWidth() == 0 || kha_System.windowHeight() == 0) {
			return;
		}
		var framebuffer = framebuffers[0];
		if(armory_ui_Popup.show && this.ui.inputRegistered) {
			this.ui.unregisterInput();
			this.cui.unregisterInput();
		} else if(!armory_ui_Popup.show && !this.ui.inputRegistered) {
			this.ui.registerInput();
			this.cui.registerInput();
		}
		if(armory_ui_Popup.show) {
			arm2d_ui_UIProperties.hwin.redraws = 1;
		}
		if(this.dropPath != "") {
			arm2d_Assets.importAsset(this.canvas,this.dropPath);
			this.dropPath = "";
		}
		var sc = this.ui.ops.scaleFactor;
		var timelineLabelsHeight = 30 * sc | 0;
		var timelineFramesHeight = 40 * sc | 0;
		if(arm2d_Editor.grid == null) {
			this.drawGrid();
		}
		if(arm2d_Editor.timeline == null || arm2d_Editor.timeline.get_height() != timelineLabelsHeight + timelineFramesHeight) {
			this.drawTimeline(timelineLabelsHeight,timelineFramesHeight);
		}
		var g = framebuffer.get_g2();
		g.begin();
		g.set_color(-1);
		var doubleGridSize = arm2d_Editor.gridSize * 2 * this.cui.ops.scaleFactor | 0;
		g.drawImage(arm2d_Editor.grid,arm2d_Editor.coffX % doubleGridSize - doubleGridSize,arm2d_Editor.coffY % doubleGridSize - doubleGridSize);
		this.canvas.x = arm2d_Editor.coffX;
		this.canvas.y = arm2d_Editor.coffY;
		g.drawRect(this.canvas.x,this.canvas.y,this.canvas.width * this.cui.ops.scaleFactor | 0,this.canvas.height * this.cui.ops.scaleFactor | 0,1.0);
		var handleSize = 8 * arm2d_ElementController.ui.ops.scaleFactor | 0;
		if(arm2d_tools_Math.hitbox(this.cui,this.canvas.x + (this.canvas.width * this.cui.ops.scaleFactor | 0) - handleSize / 2,this.canvas.y + (this.canvas.height * this.cui.ops.scaleFactor | 0) - handleSize / 2,handleSize,handleSize)) {
			g.set_color(-14656100);
			g.fillRect(this.canvas.x + (this.canvas.width * this.cui.ops.scaleFactor | 0) - handleSize / 2,this.canvas.y + (this.canvas.height * this.cui.ops.scaleFactor | 0) - handleSize / 2,handleSize,handleSize);
			g.set_color(-1);
		}
		g.drawRect(this.canvas.x + (this.canvas.width * this.cui.ops.scaleFactor | 0) - handleSize / 2,this.canvas.y + (this.canvas.height * this.cui.ops.scaleFactor | 0) - handleSize / 2,handleSize,handleSize,1);
		armory_ui_Canvas.screenW = this.canvas.width;
		armory_ui_Canvas.screenH = this.canvas.height;
		armory_ui_Canvas.draw(this.cui,this.canvas,g);
		arm2d_ElementController.render(g,this.canvas);
		if(arm2d_Editor.currentOperation != "") {
			g.set_fontSize(14 * this.ui.ops.scaleFactor | 0);
			g.set_color(-5592406);
			g.drawString(arm2d_Editor.currentOperation,this.get_toolbarw(),kha_System.windowHeight() - arm2d_Editor.timeline.get_height() - g.get_fontSize());
		}
		var showTimeline = true;
		if(showTimeline) {
			g.set_color(-1);
			var ty = kha_System.windowHeight() - arm2d_Editor.timeline.get_height();
			g.drawImage(arm2d_Editor.timeline,this.get_toolbarw(),ty);
			g.set_color(-14656100);
			g.fillRect(this.get_toolbarw() + this.selectedFrame * 11 * sc,ty + timelineLabelsHeight,10 * sc,timelineFramesHeight);
			g.set_font(kha_Assets.fonts.font_default);
			g.set_fontSize(16 * sc | 0);
			var frameIndicatorMargin = 4 * sc;
			var frameIndicatorPadding = 4 * sc;
			var frameIndicatorWidth = 30 * sc;
			var frameIndicatorHeight = timelineLabelsHeight - frameIndicatorMargin * 2;
			var frameTextWidth = kha_Assets.fonts.font_default.width(g.get_fontSize(),"" + this.selectedFrame);
			if(frameTextWidth > frameIndicatorWidth + frameIndicatorPadding) {
				frameIndicatorWidth = frameTextWidth + frameIndicatorPadding;
			}
			g.fillRect(this.get_toolbarw() + this.selectedFrame * 11 * sc + 5 * sc - frameIndicatorWidth / 2,ty + frameIndicatorMargin,frameIndicatorWidth,frameIndicatorHeight);
			g.set_color(-1);
			g.drawString("" + this.selectedFrame,this.get_toolbarw() + this.selectedFrame * 11 * sc + 5 * sc - frameTextWidth / 2,ty + timelineLabelsHeight / 2 - g.get_fontSize() / 2);
		}
		g.end();
		this.ui.begin(g);
		arm2d_ui_UIToolBar.renderToolbar(this.ui,this.cui,this.canvas,this.get_toolbarw());
		if(this.ui.window(zui_Handle.global.nest(63,null),this.get_toolbarw(),0,kha_System.windowWidth() - arm2d_Editor.get_uiw() - this.get_toolbarw(),(this.ui.t.ELEMENT_H + 2) * this.ui.ops.scaleFactor | 0)) {
			this.ui.tab(zui_Handle.global.nest(64,null),this.canvas.name);
		}
		arm2d_ui_UIProperties.renderProperties(this.ui,arm2d_Editor.get_uiw(),this.canvas);
		this.ui.end();
		if(this.ui.changed && !this.ui.inputDown) {
			this.drawGrid();
		}
		g.begin(false);
		if(arm2d_Editor.dragAsset != null) {
			var w = Math.min(128,arm2d_Assets.getImage(arm2d_Editor.dragAsset).get_width());
			var ratio = w / arm2d_Assets.getImage(arm2d_Editor.dragAsset).get_width();
			var h = arm2d_Assets.getImage(arm2d_Editor.dragAsset).get_height() * ratio;
			g.drawScaledImage(arm2d_Assets.getImage(arm2d_Editor.dragAsset),this.ui.inputX,this.ui.inputY,w,h);
		}
		g.end();
		if(this.lastW > 0 && (this.lastW != kha_System.windowWidth() || this.lastH != kha_System.windowHeight())) {
			this.resize();
		} else if(this.lastCanvasW > 0 && (this.lastCanvasW != this.canvas.width || this.lastCanvasH != this.canvas.height)) {
			this.resize();
		}
		this.lastW = kha_System.windowWidth();
		this.lastH = kha_System.windowHeight();
		this.lastCanvasW = this.canvas.width;
		this.lastCanvasH = this.canvas.height;
		if(arm2d_Editor.showFiles) {
			this.renderFiles(g);
		}
		if(armory_ui_Popup.show) {
			armory_ui_Popup.render(g);
		}
	}
	,acceptDrag: function(index) {
		var elem = arm2d_tools_CanvasTools.makeElem(this.cui,this.canvas,1);
		elem.asset = arm2d_Editor.assetNames[index + 1];
		elem.x = this.ui.inputX - this.canvas.x;
		elem.y = this.ui.inputY - this.canvas.y;
		elem.width = arm2d_Assets.getImage(this.canvas.assets[index]).get_width();
		elem.height = arm2d_Assets.getImage(this.canvas.assets[index]).get_height();
		arm2d_Editor.selectedElem = elem;
	}
	,update: function() {
		if(this.ui.inputReleased && arm2d_Editor.dragAsset != null) {
			if(this.ui.inputX < kha_System.windowWidth() - arm2d_Editor.get_uiw()) {
				var index = 0;
				var _g = 0;
				var _g1 = this.canvas.assets.length;
				while(_g < _g1) {
					var i = _g++;
					if(this.canvas.assets[i] == arm2d_Editor.dragAsset) {
						index = i;
						break;
					}
				}
				this.acceptDrag(index);
			}
			arm2d_Editor.dragAsset = null;
		}
		if(arm2d_Editor.dragAsset != null) {
			return;
		}
		this.updateCanvas();
		if(arm2d_Editor.timeline != null) {
			var ty = kha_System.windowHeight() - arm2d_Editor.timeline.get_height();
			if(this.ui.inputDown && this.ui.inputY > ty && this.ui.inputX < kha_System.windowWidth() - arm2d_Editor.get_uiw() && this.ui.inputX > this.get_toolbarw()) {
				this.selectedFrame = (this.ui.inputX - this.get_toolbarw()) / 11 / this.ui.ops.scaleFactor | 0;
			}
		}
		arm2d_ElementController.update(this.ui,this.cui,this.canvas);
		if(armory_ui_Popup.show) {
			armory_ui_Popup.update();
		}
		this.updateFiles();
	}
	,updateCanvas: function() {
		if(arm2d_Editor.showFiles || this.ui.inputX > kha_System.windowWidth() - arm2d_Editor.get_uiw()) {
			return;
		}
		arm2d_ElementController.selectElement(this.canvas);
		if(!arm2d_ElementController.isManipulating) {
			if(this.ui.inputDownR) {
				arm2d_Editor.coffX += this.ui.inputDX | 0;
				arm2d_Editor.coffY += this.ui.inputDY | 0;
			}
			if(this.ui.inputWheelDelta != 0) {
				var prevZoom = this.zoom;
				this.zoom += -this.ui.inputWheelDelta / 10;
				if(this.zoom < 0.4) {
					this.zoom = 0.4;
				} else if(this.zoom > 1.0) {
					this.zoom = 1.0;
				}
				this.zoom = Math.round(this.zoom * 10) / 10;
				this.cui.setScale(this.zoom);
				if(prevZoom != this.zoom) {
					this.drawGrid();
				}
			}
		}
		var handleSize = 8 * arm2d_ElementController.ui.ops.scaleFactor | 0;
		if(this.ui.inputStarted && arm2d_tools_Math.hitbox(this.cui,this.canvas.x + (this.canvas.width * this.cui.ops.scaleFactor | 0) - handleSize / 2,this.canvas.y + (this.canvas.height * this.cui.ops.scaleFactor | 0) - handleSize / 2,handleSize,handleSize)) {
			this.resizeCanvas = true;
		}
		if(this.ui.inputReleased && this.resizeCanvas) {
			this.resizeCanvas = false;
		}
		if(this.resizeCanvas) {
			this.canvas.width += this.ui.inputDX | 0;
			this.canvas.height += this.ui.inputDY | 0;
			if(this.canvas.width < 1) {
				this.canvas.width = 1;
			}
			if(this.canvas.height < 1) {
				this.canvas.height = 1;
			}
		}
	}
	,updateFiles: function() {
		if(!arm2d_Editor.showFiles) {
			return;
		}
		if(this.ui.inputReleased) {
			var appw = kha_System.windowWidth();
			var apph = kha_System.windowHeight();
			var left = appw / 2 - arm2d_Editor.modalRectW / 2;
			var right = appw / 2 + arm2d_Editor.modalRectW / 2;
			var top = apph / 2 - arm2d_Editor.modalRectH / 2;
			var bottom = apph / 2 + arm2d_Editor.modalRectH / 2;
			if(this.ui.inputX < left || this.ui.inputX > right || this.ui.inputY < top + arm2d_Editor.modalHeaderH || this.ui.inputY > bottom) {
				arm2d_Editor.showFiles = false;
			}
		}
	}
	,renderFiles: function(g) {
		var appw = kha_System.windowWidth();
		var apph = kha_System.windowHeight();
		var left = appw / 2 - arm2d_Editor.modalW / 2;
		var top = apph / 2 - arm2d_Editor.modalH / 2;
		g.begin(false);
		g.set_color(-14671840);
		g.fillRect(left,top,arm2d_Editor.modalW,arm2d_Editor.modalH);
		g.end();
		var leftRect = appw / 2 - arm2d_Editor.modalRectW / 2 | 0;
		var rightRect = appw / 2 + arm2d_Editor.modalRectW / 2 | 0;
		var topRect = apph / 2 - arm2d_Editor.modalRectH / 2 | 0;
		var bottomRect = apph / 2 + arm2d_Editor.modalRectH / 2 | 0;
		topRect += arm2d_Editor.modalHeaderH;
		this.uimodal.begin(g);
		if(this.uimodal.window(zui_Handle.global.nest(65,null),leftRect,topRect,arm2d_Editor.modalRectW,arm2d_Editor.modalRectH - 100)) {
			var pathHandle = zui_Handle.global.nest(66,null);
			pathHandle.text = this.uimodal.textInput(pathHandle);
			arm2d_Editor.path = zui_Ext.fileBrowser(this.uimodal,pathHandle,arm2d_Editor.foldersOnly);
		}
		this.uimodal.end(false);
		g.begin(false);
		this.uimodal.beginRegion(g,rightRect - 100,bottomRect - 30,100);
		if(this.uimodal.button("OK")) {
			arm2d_Editor.showFiles = false;
			arm2d_Editor.filesDone(arm2d_Editor.path);
		}
		this.uimodal.endRegion(false);
		this.uimodal.beginRegion(g,rightRect - 200,bottomRect - 30,100);
		if(this.uimodal.button("Cancel")) {
			arm2d_Editor.showFiles = false;
		}
		this.uimodal.endRegion();
		g.end();
	}
	,scaled: function(f) {
		return f * this.cui.ops.scaleFactor | 0;
	}
	,__class__: arm2d_Editor
	,__properties__: {get_toolbarw:"get_toolbarw"}
};
var arm2d_ElementController = function() { };
$hxClasses["arm2d.ElementController"] = arm2d_ElementController;
arm2d_ElementController.__name__ = true;
arm2d_ElementController.__properties__ = {get_handleSize:"get_handleSize"};
arm2d_ElementController.get_handleSize = function() {
	return 8 * arm2d_ElementController.ui.ops.scaleFactor | 0;
};
arm2d_ElementController.initialize = function(ui,cui) {
	arm2d_ElementController.ui = ui;
	arm2d_ElementController.cui = cui;
};
arm2d_ElementController.selectElement = function(canvas) {
	if(arm2d_ElementController.ui == null) {
		return;
	}
	var selectButton = Main.prefs.keyMap.selectMouseButton;
	if(selectButton == "Left" && arm2d_ElementController.ui.inputStarted && arm2d_ElementController.ui.inputDown || selectButton == "Right" && arm2d_ElementController.ui.inputStartedR && arm2d_ElementController.ui.inputDownR) {
		var lastSelected = arm2d_Editor.selectedElem;
		arm2d_Editor.selectedElem = null;
		arm2d_ElementController.newElementSelected = false;
		var sorted_elements = canvas.elements.slice();
		sorted_elements.reverse();
		var _g = 0;
		while(_g < sorted_elements.length) {
			var elem = sorted_elements[_g];
			++_g;
			var anchorOffset = armory_ui_Canvas.getAnchorOffset(canvas,elem);
			var ex = (arm2d_tools_Math.absx(canvas,elem) * arm2d_ElementController.cui.ops.scaleFactor | 0) + anchorOffset[0];
			var ey = (arm2d_tools_Math.absy(canvas,elem) * arm2d_ElementController.cui.ops.scaleFactor | 0) + anchorOffset[1];
			var ew = elem.width * arm2d_ElementController.cui.ops.scaleFactor | 0;
			var eh = elem.height * arm2d_ElementController.cui.ops.scaleFactor | 0;
			var cx = canvas.x + ex + ew / 2;
			var cy = canvas.y + ey + eh / 2;
			var rotHandleX = cx - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2;
			var rotHandleY = canvas.y + ey - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) * 2 - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2;
			var rotHandleH = (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) * 2 + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2;
			if(arm2d_tools_Math.hitbox(arm2d_ElementController.cui,canvas.x + ex - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2,canvas.y + ey - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2,ew + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0),eh + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0),elem.rotation) || arm2d_tools_Math.hitbox(arm2d_ElementController.cui,rotHandleX,rotHandleY,8 * arm2d_ElementController.ui.ops.scaleFactor | 0,rotHandleH,elem.rotation,[cx,cy]) && lastSelected == elem) {
				arm2d_Editor.selectedElem = elem;
				if(lastSelected != elem) {
					arm2d_ElementController.newElementSelected = true;
				}
				break;
			}
		}
		arm2d_ui_UIProperties.hwin.redraws = 2;
	}
};
arm2d_ElementController.render = function(g,canvas) {
	if(arm2d_Editor.selectedElem != null) {
		var anchorOffset = armory_ui_Canvas.getAnchorOffset(canvas,arm2d_Editor.selectedElem);
		var ex = (arm2d_tools_Math.absx(canvas,arm2d_Editor.selectedElem) * arm2d_ElementController.cui.ops.scaleFactor | 0) + anchorOffset[0];
		var ey = (arm2d_tools_Math.absy(canvas,arm2d_Editor.selectedElem) * arm2d_ElementController.cui.ops.scaleFactor | 0) + anchorOffset[1];
		var ew = arm2d_Editor.selectedElem.width * arm2d_ElementController.cui.ops.scaleFactor | 0;
		var eh = arm2d_Editor.selectedElem.height * arm2d_ElementController.cui.ops.scaleFactor | 0;
		var cx = canvas.x + ex + ew / 2;
		var cy = canvas.y + ey + eh / 2;
		g.pushRotation(arm2d_Editor.selectedElem.rotation,cx,cy);
		g.set_color(-1);
		g.drawRect(canvas.x + ex,canvas.y + ey,ew,eh);
		g.set_color(-16777216);
		g.drawRect(canvas.x + ex + 1,canvas.y + ey + 1,ew,eh);
		g.set_color(-1);
		var rotatedInput = arm2d_tools_Math.rotatePoint(arm2d_ElementController.ui.inputX,arm2d_ElementController.ui.inputY,cx,cy,-arm2d_Editor.selectedElem.rotation);
		var _g = 0;
		while(_g < 3) {
			var handlePosX = _g++;
			var handlePosX1 = handlePosX / 2;
			var _g1 = 0;
			while(_g1 < 3) {
				var handlePosY = _g1++;
				var handlePosY1 = handlePosY / 2;
				if(handlePosX1 == 0.5 && handlePosY1 == 0.5) {
					continue;
				}
				var hX = canvas.x + ex + ew * handlePosX1 - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2;
				var hY = canvas.y + ey + eh * handlePosY1 - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2;
				var dragged = false;
				if(handlePosX1 == 0 && arm2d_ElementController.dragLeft) {
					if(handlePosY1 == 0 && arm2d_ElementController.dragTop) {
						dragged = true;
					} else if(handlePosY1 == 0.5 && !(arm2d_ElementController.dragTop || arm2d_ElementController.dragBottom)) {
						dragged = true;
					} else if(handlePosY1 == 1 && arm2d_ElementController.dragBottom) {
						dragged = true;
					}
				} else if(handlePosX1 == 0.5 && !(arm2d_ElementController.dragLeft || arm2d_ElementController.dragRight)) {
					if(handlePosY1 == 0 && arm2d_ElementController.dragTop) {
						dragged = true;
					} else if(handlePosY1 == 1 && arm2d_ElementController.dragBottom) {
						dragged = true;
					}
				} else if(handlePosX1 == 1 && arm2d_ElementController.dragRight) {
					if(handlePosY1 == 0 && arm2d_ElementController.dragTop) {
						dragged = true;
					} else if(handlePosY1 == 0.5 && !(arm2d_ElementController.dragTop || arm2d_ElementController.dragBottom)) {
						dragged = true;
					} else if(handlePosY1 == 1 && arm2d_ElementController.dragBottom) {
						dragged = true;
					}
				}
				dragged = dragged && arm2d_ElementController.drag;
				if(rotatedInput.x > hX && rotatedInput.x < hX + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) || dragged) {
					if(rotatedInput.y > hY && rotatedInput.y < hY + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) || dragged) {
						g.set_color(-14656100);
						g.fillRect(hX,hY,8 * arm2d_ElementController.ui.ops.scaleFactor | 0,8 * arm2d_ElementController.ui.ops.scaleFactor | 0);
						g.set_color(-1);
					}
				}
				g.drawRect(hX,hY,8 * arm2d_ElementController.ui.ops.scaleFactor | 0,8 * arm2d_ElementController.ui.ops.scaleFactor | 0);
			}
		}
		g.drawLine(cx,canvas.y + ey,cx,canvas.y + ey - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) * 2);
		var x = cx;
		var y = canvas.y + ey - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) * 2;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var rotHandleCenter_x = x;
		var rotHandleCenter_y = y;
		var x = rotatedInput.x - rotHandleCenter_x;
		var y = rotatedInput.y - rotHandleCenter_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var _this_x = x;
		var _this_y = y;
		if(Math.sqrt(_this_x * _this_x + _this_y * _this_y) <= (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2 || arm2d_ElementController.rotate) {
			g.set_color(-14656100);
			kha_graphics2_GraphicsExtension.fillCircle(g,rotHandleCenter_x,rotHandleCenter_y,(8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2);
			g.set_color(-1);
		}
		kha_graphics2_GraphicsExtension.drawCircle(g,rotHandleCenter_x,rotHandleCenter_y,(8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2);
		g.popTransformation();
	}
};
arm2d_ElementController.update = function(ui,cui,canvas) {
	arm2d_ElementController.ui = ui;
	arm2d_ElementController.cui = cui;
	if(arm2d_ElementController.newElementSelected) {
		return;
	}
	if(arm2d_Editor.selectedElem != null) {
		var elem = arm2d_Editor.selectedElem;
		var anchorOffset = armory_ui_Canvas.getAnchorOffset(canvas,elem);
		var ex = (arm2d_tools_Math.absx(canvas,elem) * arm2d_ElementController.cui.ops.scaleFactor | 0) + anchorOffset[0];
		var ey = (arm2d_tools_Math.absy(canvas,elem) * arm2d_ElementController.cui.ops.scaleFactor | 0) + anchorOffset[1];
		var ew = elem.width * arm2d_ElementController.cui.ops.scaleFactor | 0;
		var eh = elem.height * arm2d_ElementController.cui.ops.scaleFactor | 0;
		var rotatedInput = arm2d_tools_Math.rotatePoint(ui.inputX,ui.inputY,canvas.x + ex + ew / 2,canvas.y + ey + eh / 2,-elem.rotation);
		if(ui.inputStarted && ui.inputDown) {
			if(arm2d_tools_Math.hitbox(ui,canvas.x + ex - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2,canvas.y + ey - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) / 2,ew + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0),eh + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0),arm2d_Editor.selectedElem.rotation)) {
				arm2d_ElementController.drag = true;
				arm2d_ElementController.dragLeft = arm2d_ElementController.dragRight = arm2d_ElementController.dragTop = arm2d_ElementController.dragBottom = false;
				if(rotatedInput.x > canvas.x + ex + ew - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0)) {
					arm2d_ElementController.dragRight = true;
				} else if(rotatedInput.x < canvas.x + ex + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0)) {
					arm2d_ElementController.dragLeft = true;
				}
				if(rotatedInput.y > canvas.y + ey + eh - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0)) {
					arm2d_ElementController.dragBottom = true;
				} else if(rotatedInput.y < canvas.y + ey + (8 * arm2d_ElementController.ui.ops.scaleFactor | 0)) {
					arm2d_ElementController.dragTop = true;
				}
				arm2d_ElementController.startElementManipulation(true);
			} else {
				var x = canvas.x + ex + ew / 2;
				var y = canvas.y + ey - (8 * arm2d_ElementController.ui.ops.scaleFactor | 0) * 2;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var rotHandleCenter_x = x;
				var rotHandleCenter_y = y;
				var x = rotatedInput.x - rotHandleCenter_x;
				var y = rotatedInput.y - rotHandleCenter_y;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var inputPos_x = x;
				var inputPos_y = y;
				if(Math.sqrt(inputPos_x * inputPos_x + inputPos_y * inputPos_y) <= (8 * arm2d_ElementController.ui.ops.scaleFactor | 0)) {
					arm2d_ElementController.rotate = true;
					arm2d_ElementController.startElementManipulation(true);
				}
			}
		}
		if(arm2d_ElementController.isManipulating) {
			arm2d_ui_UIProperties.hwin.redraws = 2;
			if(arm2d_ElementController.transformStartedMouse && ui.inputReleased || !arm2d_ElementController.transformStartedMouse && ui.inputStarted) {
				arm2d_ElementController.endElementManipulation();
			} else if(ui.isKeyPressed && ui.isEscapeDown || ui.inputStartedR) {
				arm2d_ElementController.endElementManipulation(true);
			} else if(arm2d_ElementController.drag) {
				var x = ui.inputX;
				var y = ui.inputY;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var _this_x = x;
				var _this_y = y;
				var vec = arm2d_ElementController.transformInitInput;
				var x = _this_x - vec.x;
				var y = _this_y - vec.y;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var transformDelta_x = x;
				var transformDelta_y = y;
				if(!arm2d_ElementController.transformStartedMouse) {
					if(ui.isKeyPressed && ui.key == 88) {
						elem.width = arm2d_ElementController.transformInitSize.x | 0;
						elem.height = arm2d_ElementController.transformInitSize.y | 0;
						arm2d_ElementController.dragRight = true;
						arm2d_ElementController.dragBottom = !arm2d_ElementController.dragBottom;
					}
					if(ui.isKeyPressed && ui.key == 89) {
						elem.width = arm2d_ElementController.transformInitSize.x | 0;
						elem.height = arm2d_ElementController.transformInitSize.y | 0;
						arm2d_ElementController.dragBottom = true;
						arm2d_ElementController.dragRight = !arm2d_ElementController.dragRight;
					}
				}
				if(arm2d_ElementController.dragRight) {
					transformDelta_x = arm2d_tools_Math.calculateTransformDelta(ui,arm2d_Editor.gridSnapPos,arm2d_Editor.gridUseRelative,arm2d_Editor.gridSize,transformDelta_x,arm2d_ElementController.transformInitPos.x + arm2d_ElementController.transformInitSize.x);
					elem.width = arm2d_ElementController.transformInitSize.x + transformDelta_x | 0;
				} else if(arm2d_ElementController.dragLeft) {
					transformDelta_x = arm2d_tools_Math.calculateTransformDelta(ui,arm2d_Editor.gridSnapPos,arm2d_Editor.gridUseRelative,arm2d_Editor.gridSize,transformDelta_x,arm2d_ElementController.transformInitPos.x);
					elem.x = arm2d_ElementController.transformInitPos.x + transformDelta_x;
					elem.width = arm2d_ElementController.transformInitSize.x - transformDelta_x | 0;
				}
				if(arm2d_ElementController.dragBottom) {
					transformDelta_y = arm2d_tools_Math.calculateTransformDelta(ui,arm2d_Editor.gridSnapPos,arm2d_Editor.gridUseRelative,arm2d_Editor.gridSize,transformDelta_y,arm2d_ElementController.transformInitPos.y + arm2d_ElementController.transformInitSize.y);
					elem.height = arm2d_ElementController.transformInitSize.y + transformDelta_y | 0;
				} else if(arm2d_ElementController.dragTop) {
					transformDelta_y = arm2d_tools_Math.calculateTransformDelta(ui,arm2d_Editor.gridSnapPos,arm2d_Editor.gridUseRelative,arm2d_Editor.gridSize,transformDelta_y,arm2d_ElementController.transformInitPos.y);
					elem.y = arm2d_ElementController.transformInitPos.y + transformDelta_y;
					elem.height = arm2d_ElementController.transformInitSize.y - transformDelta_y | 0;
				}
				if(elem.type != 1) {
					if(elem.width < 1) {
						elem.width = 1;
					}
					if(elem.height < 1) {
						elem.height = 1;
					}
				}
				if(!arm2d_ElementController.dragLeft && !arm2d_ElementController.dragRight && !arm2d_ElementController.dragBottom && !arm2d_ElementController.dragTop) {
					arm2d_ElementController.grab = true;
					arm2d_ElementController.grabX = true;
					arm2d_ElementController.grabY = true;
					arm2d_ElementController.drag = false;
				} else {
					if(!arm2d_ElementController.dragBottom && !arm2d_ElementController.dragTop) {
						transformDelta_y = 0;
					} else if(!arm2d_ElementController.dragLeft && !arm2d_ElementController.dragRight) {
						transformDelta_y = 0;
					}
					arm2d_Editor.currentOperation = " x: " + elem.x + "  y: " + elem.y + "  w: " + elem.width + "  h: " + elem.height + "  (dx: " + transformDelta_x + "  dy: " + transformDelta_y + ")";
				}
			} else if(arm2d_ElementController.grab) {
				var x = ui.inputX;
				var y = ui.inputY;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var _this_x = x;
				var _this_y = y;
				var vec = arm2d_ElementController.transformInitInput;
				var x = _this_x - vec.x;
				var y = _this_y - vec.y;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var transformDelta_x = x;
				var transformDelta_y = y;
				if(ui.isKeyPressed && ui.key == 88) {
					elem.x = arm2d_ElementController.transformInitPos.x;
					elem.y = arm2d_ElementController.transformInitPos.y;
					arm2d_ElementController.grabX = true;
					arm2d_ElementController.grabY = !arm2d_ElementController.grabY;
				}
				if(ui.isKeyPressed && ui.key == 89) {
					elem.x = arm2d_ElementController.transformInitPos.x;
					elem.y = arm2d_ElementController.transformInitPos.y;
					arm2d_ElementController.grabY = true;
					arm2d_ElementController.grabX = !arm2d_ElementController.grabX;
				}
				if(arm2d_ElementController.grabX) {
					transformDelta_x = arm2d_tools_Math.calculateTransformDelta(ui,arm2d_Editor.gridSnapPos,arm2d_Editor.gridUseRelative,arm2d_Editor.gridSize,transformDelta_x,arm2d_ElementController.transformInitPos.x);
					elem.x = arm2d_ElementController.transformInitPos.x + transformDelta_x | 0;
				}
				if(arm2d_ElementController.grabY) {
					transformDelta_y = arm2d_tools_Math.calculateTransformDelta(ui,arm2d_Editor.gridSnapPos,arm2d_Editor.gridUseRelative,arm2d_Editor.gridSize,transformDelta_y,arm2d_ElementController.transformInitPos.y);
					elem.y = arm2d_ElementController.transformInitPos.y + transformDelta_y | 0;
				}
				if(!arm2d_ElementController.grabX) {
					transformDelta_x = 0;
				} else if(!arm2d_ElementController.grabY) {
					transformDelta_y = 0;
				}
				arm2d_Editor.currentOperation = " x: " + elem.x + "  y: " + elem.y + "  (dx: " + transformDelta_x + "  dy: " + transformDelta_y + ")";
			} else if(arm2d_ElementController.rotate) {
				var x = canvas.x + ex + ew / 2;
				var y = canvas.y + ey + eh / 2;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var elemCenter_x = x;
				var elemCenter_y = y;
				var x = ui.inputX;
				var y = ui.inputY;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var _this_x = x;
				var _this_y = y;
				var x = _this_x - elemCenter_x;
				var y = _this_y - elemCenter_y;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var inputPos_x = x;
				var inputPos_y = y;
				var inputAngle = -Math.atan2(inputPos_x,inputPos_y) + Math.PI;
				if((ui.isKeyDown && ui.key == Main.prefs.keyMap.gridInvert) != arm2d_Editor.useRotationSteps) {
					inputAngle = Math.round(inputAngle / arm2d_Editor.rotationSteps) * arm2d_Editor.rotationSteps;
				}
				elem.rotation = inputAngle;
				arm2d_Editor.currentOperation = " Rot: " + arm2d_tools_Math.roundPrecision(inputAngle * 57.29578,2) + "deg";
			}
		}
		if(ui.isKeyPressed && !ui.isTyping) {
			if(!arm2d_ElementController.grab && ui.key == Main.prefs.keyMap.grabKey) {
				arm2d_ElementController.startElementManipulation();
				arm2d_ElementController.grab = true;
				arm2d_ElementController.grabX = true;
				arm2d_ElementController.grabY = true;
			}
			if(!arm2d_ElementController.drag && ui.key == Main.prefs.keyMap.sizeKey) {
				arm2d_ElementController.startElementManipulation();
				arm2d_ElementController.drag = true;
				arm2d_ElementController.dragLeft = false;
				arm2d_ElementController.dragTop = false;
				arm2d_ElementController.dragRight = true;
				arm2d_ElementController.dragBottom = true;
			}
			if(!arm2d_ElementController.rotate && ui.key == Main.prefs.keyMap.rotateKey) {
				arm2d_ElementController.startElementManipulation();
				arm2d_ElementController.rotate = true;
			}
			if(!arm2d_ElementController.isManipulating) {
				if(ui.key == 37) {
					if(arm2d_Editor.gridSnapPos) {
						elem.x -= arm2d_Editor.gridSize;
					} else {
						elem.x--;
					}
				}
				if(ui.key == 39) {
					if(arm2d_Editor.gridSnapPos) {
						elem.x += arm2d_Editor.gridSize;
					} else {
						elem.x++;
					}
				}
				if(ui.key == 38) {
					if(arm2d_Editor.gridSnapPos) {
						elem.y -= arm2d_Editor.gridSize;
					} else {
						elem.y--;
					}
				}
				if(ui.key == 40) {
					if(arm2d_Editor.gridSnapPos) {
						elem.y += arm2d_Editor.gridSize;
					} else {
						elem.y++;
					}
				}
				if(ui.isBackspaceDown || ui.isDeleteDown) {
					arm2d_tools_CanvasTools.removeElem(canvas,arm2d_Editor.selectedElem);
					arm2d_Editor.selectedElem = null;
				} else if(ui.key == 68) {
					arm2d_Editor.selectedElem = arm2d_tools_CanvasTools.duplicateElem(canvas,elem);
				}
			}
		}
	} else {
		arm2d_ElementController.endElementManipulation();
	}
};
arm2d_ElementController.startElementManipulation = function(mousePressed) {
	if(mousePressed == null) {
		mousePressed = false;
	}
	if(arm2d_ElementController.isManipulating) {
		arm2d_ElementController.endElementManipulation(true);
	}
	arm2d_ElementController.transformInitInput = new kha_math_Vector2(arm2d_ElementController.ui.inputX,arm2d_ElementController.ui.inputY);
	arm2d_ElementController.transformInitPos = new kha_math_Vector2(arm2d_Editor.selectedElem.x,arm2d_Editor.selectedElem.y);
	arm2d_ElementController.transformInitSize = new kha_math_Vector2(arm2d_Editor.selectedElem.width,arm2d_Editor.selectedElem.height);
	arm2d_ElementController.transformInitRot = arm2d_Editor.selectedElem.rotation;
	arm2d_ElementController.transformStartedMouse = mousePressed;
	arm2d_ElementController.isManipulating = true;
};
arm2d_ElementController.endElementManipulation = function(reset) {
	if(reset == null) {
		reset = false;
	}
	if(reset) {
		arm2d_Editor.selectedElem.x = arm2d_ElementController.transformInitPos.x;
		arm2d_Editor.selectedElem.y = arm2d_ElementController.transformInitPos.y;
		arm2d_Editor.selectedElem.width = arm2d_ElementController.transformInitSize.x | 0;
		arm2d_Editor.selectedElem.height = arm2d_ElementController.transformInitSize.y | 0;
		arm2d_Editor.selectedElem.rotation = arm2d_ElementController.transformInitRot;
	}
	arm2d_ElementController.isManipulating = false;
	arm2d_ElementController.grab = false;
	arm2d_ElementController.drag = false;
	arm2d_ElementController.rotate = false;
	arm2d_ElementController.transformStartedMouse = false;
	arm2d_Editor.currentOperation = "";
};
arm2d_ElementController.scaled = function(f) {
	return f * arm2d_ElementController.cui.ops.scaleFactor | 0;
};
var arm2d_Path = function() { };
$hxClasses["arm2d.Path"] = arm2d_Path;
arm2d_Path.__name__ = true;
arm2d_Path.toRelative = function(path,cwd) {
	path = haxe_io_Path.normalize(path);
	cwd = haxe_io_Path.normalize(cwd);
	var ar = [];
	var ar1 = path.split("/");
	var ar2 = cwd.split("/");
	var index = 0;
	while(ar1[index] == ar2[index]) ++index;
	var _g = 0;
	var _g1 = ar2.length - index;
	while(_g < _g1) {
		var i = _g++;
		ar.push("..");
	}
	var _g = index;
	var _g1 = ar1.length;
	while(_g < _g1) {
		var i = _g++;
		ar.push(ar1[i]);
	}
	return ar.join("/");
};
arm2d_Path.toAbsolute = function(path,cwd) {
	return haxe_io_Path.normalize(cwd + "/" + path);
};
var arm2d_tools_CanvasTools = function() { };
$hxClasses["arm2d.tools.CanvasTools"] = arm2d_tools_CanvasTools;
arm2d_tools_CanvasTools.__name__ = true;
arm2d_tools_CanvasTools.makeElem = function(cui,canvas,type) {
	var name = "";
	var height = cui.t.ELEMENT_H;
	var alignment = 0;
	switch(type) {
	case 0:
		name = arm2d_tools_CanvasTools.unique("Text",canvas.elements,"name");
		break;
	case 1:
		name = arm2d_tools_CanvasTools.unique("Image",canvas.elements,"name");
		height = 100;
		break;
	case 2:
		name = arm2d_tools_CanvasTools.unique("Button",canvas.elements,"name");
		alignment = 1;
		break;
	case 3:
		name = arm2d_tools_CanvasTools.unique("Empty",canvas.elements,"name");
		height = 100;
		break;
	case 6:
		name = arm2d_tools_CanvasTools.unique("Check",canvas.elements,"name");
		break;
	case 7:
		name = arm2d_tools_CanvasTools.unique("Radio",canvas.elements,"name");
		break;
	case 8:
		name = arm2d_tools_CanvasTools.unique("Combo",canvas.elements,"name");
		break;
	case 9:
		name = arm2d_tools_CanvasTools.unique("Slider",canvas.elements,"name");
		alignment = 2;
		break;
	case 10:
		name = arm2d_tools_CanvasTools.unique("TextInput",canvas.elements,"name");
		break;
	case 11:
		name = arm2d_tools_CanvasTools.unique("KeyInput",canvas.elements,"name");
		break;
	case 12:
		name = arm2d_tools_CanvasTools.unique("Filled_Rectangle",canvas.elements,"name");
		height = 100;
		break;
	case 13:
		name = arm2d_tools_CanvasTools.unique("Rectangle",canvas.elements,"name");
		height = 100;
		break;
	case 14:
		name = arm2d_tools_CanvasTools.unique("Filled_Circle",canvas.elements,"name");
		break;
	case 15:
		name = arm2d_tools_CanvasTools.unique("Circle",canvas.elements,"name");
		break;
	case 16:
		name = arm2d_tools_CanvasTools.unique("Filled_Triangle",canvas.elements,"name");
		break;
	case 17:
		name = arm2d_tools_CanvasTools.unique("Triangle",canvas.elements,"name");
		break;
	case 18:
		name = arm2d_tools_CanvasTools.unique("Progress_bar",canvas.elements,"name");
		break;
	case 19:
		name = arm2d_tools_CanvasTools.unique("CProgress_bar",canvas.elements,"name");
		break;
	case 20:
		name = arm2d_tools_CanvasTools.unique("TextArea",canvas.elements,"name");
		break;
	}
	var elem = { id : armory_ui_Canvas.getElementId(canvas), type : type, name : name, event : "", x : 0, y : 0, width : 150, height : height, rotation : 0, text : "My " + name, asset : "", progress_at : 0, progress_total : 100, strength : 1, alignment : js_Boot.__cast(alignment , Int), anchor : 0, parent : null, children : [], visible : true};
	canvas.elements.push(elem);
	return elem;
};
arm2d_tools_CanvasTools.unique = function(s,data,elemAttr,counter) {
	if(counter == null) {
		counter = -1;
	}
	var originalName = s;
	var split = s.lastIndexOf(".");
	if(split != -1) {
		var suffix = s.substring(split);
		if(suffix.length == 4) {
			originalName = s.substring(0,split);
		}
	}
	var _g = 0;
	while(_g < data.length) {
		var elem = data[_g];
		++_g;
		if(Reflect.getProperty(elem,elemAttr) == s) {
			if(counter > -1) {
				++counter;
				var counterLen = (counter == null ? "null" : "" + counter).length;
				if(counterLen > 3) {
					counterLen = 3;
				}
				var padding = ".";
				var _g1 = 0;
				var _g2 = 3 - counterLen;
				while(_g1 < _g2) {
					var i = _g1++;
					padding += "0";
				}
				return arm2d_tools_CanvasTools.unique(originalName + padding + (counter == null ? "null" : "" + counter),data,elemAttr,counter);
			} else {
				return arm2d_tools_CanvasTools.unique(originalName,data,elemAttr,0);
			}
		}
	}
	return s;
};
arm2d_tools_CanvasTools.moveElem = function(canvas,elem,d) {
	var ar = canvas.elements;
	var i = ar.indexOf(elem);
	var p = elem.parent;
	while(true) {
		i += d;
		if(i < 0 || i >= ar.length) {
			break;
		}
		if(ar[i].parent == p) {
			HxOverrides.remove(ar,elem);
			ar.splice(i,0,elem);
			break;
		}
	}
};
arm2d_tools_CanvasTools.removeElem = function(canvas,elem) {
	if(elem.children != null) {
		var _g = 0;
		var _g1 = elem.children;
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			arm2d_tools_CanvasTools.removeElem(canvas,arm2d_tools_CanvasTools.elemById(canvas,id));
		}
	}
	HxOverrides.remove(canvas.elements,elem);
	if(elem.parent != null) {
		HxOverrides.remove(arm2d_tools_CanvasTools.elemById(canvas,elem.parent).children,elem.id);
		elem.parent = null;
	}
};
arm2d_tools_CanvasTools.elemById = function(canvas,id) {
	var _g = 0;
	var _g1 = canvas.elements;
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		if(e.id == id) {
			return e;
		}
	}
	return null;
};
arm2d_tools_CanvasTools.unparent = function(canvas,elem) {
	var parent = arm2d_tools_CanvasTools.elemById(canvas,elem.parent);
	if(parent != null) {
		elem.x += arm2d_tools_Math.absx(canvas,parent);
		elem.y += arm2d_tools_Math.absy(canvas,parent);
		elem.parent = null;
		HxOverrides.remove(parent.children,elem.id);
	}
};
arm2d_tools_CanvasTools.setParent = function(canvas,elem,parent) {
	var oldParent = arm2d_tools_CanvasTools.elemById(canvas,elem.parent);
	if(oldParent == parent) {
		return;
	}
	arm2d_tools_CanvasTools.unparent(canvas,elem);
	if(parent != null) {
		if(parent.children == null) {
			elem.children = [];
		}
		parent.children.push(elem.id);
		elem.parent = parent.id;
		elem.x -= arm2d_tools_Math.absx(canvas,parent);
		elem.y -= arm2d_tools_Math.absy(canvas,parent);
	}
};
arm2d_tools_CanvasTools.duplicateElem = function(canvas,elem,parentId) {
	if(elem != null) {
		if(parentId == null) {
			parentId = elem.parent;
		}
		var dupe = { id : armory_ui_Canvas.getElementId(canvas), type : elem.type, name : elem.name, event : elem.event, x : elem.x + 10, y : elem.y + 10, width : elem.width, height : elem.height, rotation : elem.rotation, text : elem.text, asset : elem.asset, color : elem.color, color_text : elem.color_text, color_hover : elem.color_hover, color_press : elem.color_press, color_progress : elem.color_progress, progress_at : elem.progress_at, progress_total : elem.progress_total, strength : elem.strength, anchor : elem.anchor, parent : parentId, children : [], visible : elem.visible};
		canvas.elements.push(dupe);
		if(parentId != null) {
			var parentElem = arm2d_tools_CanvasTools.elemById(canvas,parentId);
			parentElem.children.push(dupe.id);
			if(elem.parent != parentId) {
				dupe.x = elem.x;
				dupe.y = elem.y;
			}
		}
		var _g = 0;
		var _g1 = elem.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			arm2d_tools_CanvasTools.duplicateElem(canvas,arm2d_tools_CanvasTools.elemById(canvas,child),dupe.id);
		}
		return dupe;
	}
	return null;
};
var arm2d_tools_Math = function() { };
$hxClasses["arm2d.tools.Math"] = arm2d_tools_Math;
arm2d_tools_Math.__name__ = true;
arm2d_tools_Math.toDegrees = function(radians) {
	return radians * 57.29578;
};
arm2d_tools_Math.toRadians = function(degrees) {
	return degrees * 0.0174532924;
};
arm2d_tools_Math.hitbox = function(ui,x,y,w,h,rotation,center) {
	if(rotation == null) {
		rotation = 0.0;
	}
	if(center != null && center.length != 2) {
		throw haxe_Exception.thrown("arm2d.tools.Math.hitbox(): 'center' argument must consist of two values!");
	}
	if(center == null) {
		center = [x + w / 2,y + h / 2];
	}
	var rotatedInput = arm2d_tools_Math.rotatePoint(ui.inputX,ui.inputY,center[0],center[1],-rotation);
	if(rotatedInput.x > x && rotatedInput.x < x + w && rotatedInput.y > y) {
		return rotatedInput.y < y + h;
	} else {
		return false;
	}
};
arm2d_tools_Math.absx = function(canvas,e) {
	if(e == null) {
		return 0;
	}
	return e.x + arm2d_tools_Math.absx(canvas,arm2d_tools_CanvasTools.elemById(canvas,e.parent));
};
arm2d_tools_Math.absy = function(canvas,e) {
	if(e == null) {
		return 0;
	}
	return e.y + arm2d_tools_Math.absy(canvas,arm2d_tools_CanvasTools.elemById(canvas,e.parent));
};
arm2d_tools_Math.roundPrecision = function(v,precision) {
	if(precision == null) {
		precision = 0;
	}
	v *= Math.pow(10,precision);
	v = (v | 0) * 1.0;
	v /= Math.pow(10,precision);
	return v;
};
arm2d_tools_Math.rotatePoint = function(pointX,pointY,centerX,centerY,angle) {
	pointX -= centerX;
	pointY -= centerY;
	var x = pointX * Math.cos(angle) - pointY * Math.sin(angle);
	var y = pointX * Math.sin(angle) + pointY * Math.cos(angle);
	return new kha_math_Vector2(centerX + x,centerY + y);
};
arm2d_tools_Math.calculateTransformDelta = function(ui,gSP,gUR,gS,value,offset) {
	if(offset == null) {
		offset = 0.0;
	}
	var precisionMode = ui.isKeyDown && ui.key == Main.prefs.keyMap.slowMovement;
	var enabled = gSP != (ui.isKeyDown && ui.key == Main.prefs.keyMap.gridInvert);
	var useOffset = gUR != (ui.isKeyDown && ui.key == Main.prefs.keyMap.gridInvertRelative);
	if(!enabled) {
		if(precisionMode) {
			return value / 2;
		} else {
			return value;
		}
	}
	value = Math.round(value / gS) * gS;
	if(precisionMode) {
		value /= 2;
	}
	if(useOffset && offset != 0) {
		offset %= gS;
		if(offset > gS / 2) {
			offset = -(gS - offset);
		}
		value -= offset;
	}
	return value;
};
var zui_Handle = function(ops) {
	this.changed = false;
	this.dragY = 0;
	this.dragX = 0;
	this.dragEnabled = false;
	this.lastMaxY = 0.0;
	this.lastMaxX = 0.0;
	this.layout = 0;
	this.scrollEnabled = false;
	this.scrollOffset = 0.0;
	this.redraws = 2;
	this.texture = null;
	this.text = "";
	this.value = 0.0;
	this.color = -1;
	this.position = 0;
	this.selected = false;
	if(ops != null) {
		if(ops.selected != null) {
			this.selected = ops.selected;
		}
		if(ops.position != null) {
			this.position = ops.position;
		}
		if(ops.value != null) {
			this.value = ops.value;
		}
		if(ops.text != null) {
			this.text = ops.text;
		}
		if(ops.color != null) {
			this.color = ops.color;
		}
		if(ops.layout != null) {
			this.layout = ops.layout;
		}
	}
};
$hxClasses["zui.Handle"] = zui_Handle;
zui_Handle.__name__ = true;
zui_Handle.prototype = {
	selected: null
	,position: null
	,color: null
	,value: null
	,text: null
	,texture: null
	,redraws: null
	,scrollOffset: null
	,scrollEnabled: null
	,layout: null
	,lastMaxX: null
	,lastMaxY: null
	,dragEnabled: null
	,dragX: null
	,dragY: null
	,changed: null
	,children: null
	,nest: function(i,ops) {
		if(this.children == null) {
			this.children = new haxe_ds_IntMap();
		}
		var c = this.children.h[i];
		if(c == null) {
			c = new zui_Handle(ops);
			this.children.h[i] = c;
		}
		return c;
	}
	,unnest: function(i) {
		if(this.children != null) {
			this.children.remove(i);
		}
	}
	,__class__: zui_Handle
};
var arm2d_ui_UIProperties = function() { };
$hxClasses["arm2d.ui.UIProperties"] = arm2d_ui_UIProperties;
arm2d_ui_UIProperties.__name__ = true;
arm2d_ui_UIProperties.renderProperties = function(ui,width,canvas) {
	if(ui.window(arm2d_ui_UIProperties.hwin,kha_System.windowWidth() - width,0,width,kha_System.windowHeight())) {
		var htab = zui_Handle.global.nest(2,null);
		if(ui.tab(htab,"Project")) {
			var hpath = zui_Handle.global.nest(3,{ text : ""});
			ui.textInput(hpath,"Current file");
			if(hpath.changed) {
				Main.prefs.path = hpath.text;
			}
			if(ui.button("Save")) {
				arm2d_Assets.save(canvas);
			}
			if(ui.button("Load")) {
				arm2d_Assets.load(function(c) {
					Main.inst.canvas = c;
					arm2d_ui_UIProperties.hwin.redraws = 2;
				});
			}
			if(ui.panel(zui_Handle.global.nest(4,{ selected : false}),"Canvas")) {
				ui.indent();
				if(ui.button("New")) {
					canvas.elements = [];
					arm2d_Editor.selectedElem = null;
				}
				if(ui.isHovered) {
					ui.tooltip("Create new canvas");
				}
				var handleName = zui_Handle.global.nest(5,{ text : canvas.name});
				handleName.text = canvas.name;
				ui.textInput(handleName,"Name",2);
				if(handleName.changed) {
					if(handleName.text == "_themes") {
						armory_ui_Popup.showMessage(new zui_Zui(ui.ops),"Sorry!","\"_themes\" is not a valid canvas name as it is reserved!");
						handleName.text = canvas.name;
					} else {
						canvas.name = handleName.text;
					}
				}
				ui.row([0.5,0.5]);
				var handlecw = zui_Handle.global.nest(6,{ text : canvas.width + ""});
				var handlech = zui_Handle.global.nest(7,{ text : canvas.height + ""});
				handlecw.text = canvas.width + "";
				handlech.text = canvas.height + "";
				var strw = ui.textInput(handlecw,"Width",2);
				var strh = ui.textInput(handlech,"Height",2);
				canvas.width = Std.parseInt(strw);
				canvas.height = Std.parseInt(strh);
				ui.unindent();
			}
			if(ui.panel(zui_Handle.global.nest(8,{ selected : true}),"Outliner")) {
				ui.indent();
				var drawList = null;
				drawList = function(h,elem) {
					var b = false;
					if(arm2d_Editor.selectedElem == elem) {
						ui.g.set_color(-14656100);
						ui.g.fillRect(ui._x,ui._y,ui._w,ui.t.ELEMENT_H * ui.ops.scaleFactor);
						ui.g.set_color(-1);
					}
					var started = ui.getStarted();
					if(started && !ui.inputDownR) {
						arm2d_Editor.selectedElem = elem;
					}
					if(started && ui.inputDownR) {
						if(elem == arm2d_Editor.selectedElem) {
							arm2d_tools_CanvasTools.unparent(canvas,elem);
						} else {
							arm2d_tools_CanvasTools.setParent(canvas,arm2d_Editor.selectedElem,elem);
						}
					}
					if(elem.children != null && elem.children.length > 0) {
						ui.row([0.076923076923076927,0.92307692307692313]);
						b = ui.panel(h.nest(elem.id,{ selected : true}),"",true,false,false);
						ui.text(elem.name);
					} else {
						ui._x += 18;
						ui.text(elem.name);
						ui._x -= 18;
					}
					if(b) {
						var i = elem.children.length;
						while(i > 0) {
							--i;
							var id = elem.children[elem.children.length - 1 - i];
							ui.indent();
							drawList(h,arm2d_tools_CanvasTools.elemById(canvas,id));
							ui.unindent();
						}
					}
				};
				if(canvas.elements.length > 0) {
					var _g = 0;
					var _g1 = canvas.elements.length;
					while(_g < _g1) {
						var i = _g++;
						var elem = canvas.elements[canvas.elements.length - 1 - i];
						if(elem.parent == null) {
							drawList(zui_Handle.global.nest(9,null),elem);
						}
					}
					ui.row([0.25,0.25,0.25,0.25]);
					if(ui.button("Up") && arm2d_Editor.selectedElem != null) {
						arm2d_tools_CanvasTools.moveElem(canvas,arm2d_Editor.selectedElem,1);
					}
					if(ui.isHovered) {
						ui.tooltip("Move element up");
					}
					if(ui.button("Down") && arm2d_Editor.selectedElem != null) {
						arm2d_tools_CanvasTools.moveElem(canvas,arm2d_Editor.selectedElem,-1);
					}
					if(ui.isHovered) {
						ui.tooltip("Move element down");
					}
					if(ui.button("Remove") && arm2d_Editor.selectedElem != null) {
						arm2d_tools_CanvasTools.removeElem(canvas,arm2d_Editor.selectedElem);
						arm2d_Editor.selectedElem = null;
					}
					if(ui.isHovered) {
						ui.tooltip("Delete element");
					}
					if(ui.button("Duplicate") && arm2d_Editor.selectedElem != null) {
						arm2d_Editor.selectedElem = arm2d_tools_CanvasTools.duplicateElem(canvas,arm2d_Editor.selectedElem);
					}
					if(ui.isHovered) {
						ui.tooltip("Create duplicate of element");
					}
				}
				ui.unindent();
			}
			if(arm2d_Editor.selectedElem != null) {
				var elem = arm2d_Editor.selectedElem;
				var id = elem.id;
				if(ui.panel(zui_Handle.global.nest(10,{ selected : true}),"Properties")) {
					ui.indent();
					var tmp = elem.visible == null ? true : elem.visible;
					elem.visible = ui.check(zui_Handle.global.nest(11,null).nest(id,{ selected : tmp}),"Visible");
					elem.name = ui.textInput(zui_Handle.global.nest(12,null).nest(id,{ text : elem.name}),"Name",2);
					elem.text = ui.textInput(zui_Handle.global.nest(13,null).nest(id,{ text : elem.text}),"Text",2);
					ui.row([0.25,0.25,0.25,0.25]);
					var handlex = elem.x + "";
					var handlex1 = zui_Handle.global.nest(14,null).nest(id,{ text : handlex});
					var handley = elem.y + "";
					var handley1 = zui_Handle.global.nest(15,null).nest(id,{ text : handley});
					handlex1.text = elem.x + "";
					handley1.text = elem.y + "";
					var strx = ui.textInput(handlex1,"X",2);
					var stry = ui.textInput(handley1,"Y",2);
					elem.x = parseFloat(strx);
					elem.y = parseFloat(stry);
					var handlew = elem.width + "";
					var handlew1 = zui_Handle.global.nest(16,null).nest(id,{ text : handlew});
					var handleh = elem.height + "";
					var handleh1 = zui_Handle.global.nest(17,null).nest(id,{ text : handleh});
					handlew1.text = elem.width + "";
					handleh1.text = elem.height + "";
					var strw = ui.textInput(handlew1,"W",2);
					var strh = ui.textInput(handleh1,"H",2);
					elem.width = parseFloat(strw) | 0;
					elem.height = parseFloat(strh) | 0;
					if(elem.type == 13 || elem.type == 15 || elem.type == 17 || elem.type == 18 || elem.type == 19) {
						var handles = elem.strength + "";
						var handles1 = zui_Handle.global.nest(18,null).nest(id,{ text : handles});
						var strs = ui.textInput(handles1,"Line Strength",2);
						elem.strength = parseFloat(strs) | 0;
					}
					if(elem.type == 18 || elem.type == 19) {
						var handlep = zui_Handle.global.nest(19,null).nest(id,{ value : elem.progress_at});
						var slp = ui.slider(handlep,"Progress",0.0,elem.progress_total,true,1);
						var handlespt = elem.progress_total + "";
						var handlespt1 = zui_Handle.global.nest(20,null).nest(id,{ text : handlespt});
						var strpt = ui.textInput(handlespt1,"Total Progress",2);
						elem.progress_total = parseFloat(strpt) | 0;
						elem.progress_at = slp | 0;
					}
					var handlerot = zui_Handle.global.nest(21,null).nest(id,{ value : arm2d_tools_Math.roundPrecision((elem.rotation == null ? 0 : elem.rotation) * 57.29578,2)});
					handlerot.value = arm2d_tools_Math.roundPrecision(elem.rotation * 57.29578,2);
					if(handlerot.value >= 360) {
						handlerot.value = 0;
					}
					elem.rotation = ui.slider(handlerot,"Rotation",0.0,360.0,true) * 0.0174532924;
					var assetPos = ui.combo(zui_Handle.global.nest(22,null).nest(id,{ position : arm2d_Assets.getAssetIndex(canvas,elem.asset)}),arm2d_Assets.getEnumTexts(),"Asset",true,2);
					elem.asset = arm2d_Assets.getEnumTexts()[assetPos];
					ui.unindent();
				}
				if(ui.panel(zui_Handle.global.nest(23,{ selected : false}),"Color")) {
					ui.indent();
					var drawColorSelection = function(idMult,color,defaultColor) {
						ui.row([0.5,0.5]);
						var handleCol = zui_Handle.global.nest(24,null).nest(id).nest(idMult,{ color : color != null ? color : defaultColor});
						armory_ui_Ext.colorField(ui,handleCol,true);
						if(handleCol.changed) {
							color = handleCol.color;
						}
						if(ui.button("Reset") || color == null) {
							color = null;
							handleCol.color = defaultColor;
							handleCol.changed = false;
						}
						return color;
					};
					var canvasTheme = armory_ui_Canvas.getTheme(canvas.theme);
					switch(elem.type) {
					case 0:
						ui.text("Text:");
						elem.color_text = drawColorSelection(1,elem.color_text,canvasTheme.TEXT_COL);
						break;
					case 2:
						ui.text("Text:");
						elem.color_text = drawColorSelection(1,elem.color_text,canvasTheme.BUTTON_TEXT_COL);
						ui.text("Background:");
						elem.color = drawColorSelection(2,elem.color,canvasTheme.BUTTON_COL);
						ui.text("On Hover:");
						elem.color_hover = drawColorSelection(3,elem.color_hover,canvasTheme.BUTTON_HOVER_COL);
						ui.text("On Pressed:");
						elem.color_press = drawColorSelection(4,elem.color_press,canvasTheme.BUTTON_PRESSED_COL);
						break;
					case 6:case 8:case 9:case 10:case 11:
						ui.text("Text:");
						elem.color_text = drawColorSelection(1,elem.color_text,canvasTheme.TEXT_COL);
						ui.text("Background:");
						elem.color = drawColorSelection(2,elem.color,canvasTheme.BUTTON_COL);
						ui.text("On Hover:");
						elem.color_hover = drawColorSelection(3,elem.color_hover,canvasTheme.BUTTON_HOVER_COL);
						break;
					case 12:case 13:case 14:case 15:case 16:case 17:
						ui.text("Color:");
						elem.color = drawColorSelection(1,elem.color,canvasTheme.BUTTON_COL);
						break;
					case 18:case 19:
						ui.text("Progress:");
						elem.color_progress = drawColorSelection(1,elem.color_progress,canvasTheme.TEXT_COL);
						ui.text("Background:");
						elem.color = drawColorSelection(2,elem.color,canvasTheme.BUTTON_COL);
						break;
					default:
						ui.text("This element type has no color settings!");
					}
					ui.unindent();
				}
				if(ui.panel(zui_Handle.global.nest(25,{ selected : false}),"Align")) {
					ui.indent();
					var alignmentHandle = zui_Handle.global.nest(26,null).nest(id,{ position : elem.alignment});
					ui.row([0.33333333333333331,0.33333333333333331,0.33333333333333331]);
					ui.radio(alignmentHandle,0,"Left");
					ui.radio(alignmentHandle,1,"Center");
					ui.radio(alignmentHandle,2,"Right");
					arm2d_Editor.selectedElem.alignment = alignmentHandle.position;
					ui.unindent();
				}
				if(ui.panel(zui_Handle.global.nest(27,{ selected : false}),"Anchor")) {
					ui.indent();
					var hanch = zui_Handle.global.nest(28,null).nest(id,{ position : elem.anchor});
					ui.row([0.36363636363636365,0.27272727272727271,0.36363636363636365]);
					ui.radio(hanch,0,"Top-Left");
					ui.radio(hanch,1,"Top");
					ui.radio(hanch,2,"Top-Right");
					ui.row([0.36363636363636365,0.27272727272727271,0.36363636363636365]);
					ui.radio(hanch,3,"Left");
					ui.radio(hanch,4,"Center");
					ui.radio(hanch,5,"Right");
					ui.row([0.36363636363636365,0.27272727272727271,0.36363636363636365]);
					ui.radio(hanch,6,"Bot-Left");
					ui.radio(hanch,7,"Bottom");
					ui.radio(hanch,8,"Bot-Right");
					elem.anchor = hanch.position;
					ui.unindent();
				}
				if(ui.panel(zui_Handle.global.nest(29,{ selected : false}),"Script")) {
					ui.indent();
					elem.event = ui.textInput(zui_Handle.global.nest(30,null).nest(id,{ text : elem.event}),"Event",2);
					ui.unindent();
				}
				var tmp = ui.panel(zui_Handle.global.nest(31,{ selected : false}),"Timeline");
			}
		}
		if(ui.tab(htab,"Themes")) {
			var handleThemeColor = zui_Handle.global.nest(32,null);
			var handleThemeName = zui_Handle.global.nest(33,null);
			var iconSize = 16;
			var drawList1 = function(h,theme) {
				if(arm2d_Editor.selectedTheme == theme) {
					ui.g.set_color(-14656100);
					ui.g.fillRect(0,ui._y,ui._windowW,ui.t.ELEMENT_H * ui.ops.scaleFactor);
					ui.g.set_color(-1);
				}
				if(theme == armory_ui_Canvas.getTheme(canvas.theme)) {
					var iconMargin = (ui.t.BUTTON_H - iconSize) / 2;
					ui.g.drawSubImage(kha_Assets.images.icons,ui._x + iconMargin,ui._y + iconMargin,0,0,16,16);
				}
				var started = ui.getStarted();
				if(started && !ui.inputDownR) {
					arm2d_Editor.selectedTheme = theme;
				}
				ui._x += iconSize;
				ui.text(theme.NAME);
				ui._x -= iconSize;
			};
			var _g = 0;
			var _g1 = armory_ui_Canvas.themes;
			while(_g < _g1.length) {
				var theme = _g1[_g];
				++_g;
				drawList1(zui_Handle.global.nest(34,null),theme);
			}
			ui.row([0.25,0.25,0.25,0.25]);
			if(ui.button("Add")) {
				var newTheme = Reflect.copy(armory_ui_Themes.light);
				newTheme.NAME = arm2d_tools_CanvasTools.unique("New Theme",armory_ui_Canvas.themes,"NAME");
				armory_ui_Canvas.themes.push(newTheme);
				arm2d_Editor.selectedTheme = newTheme;
			}
			if(arm2d_Editor.selectedTheme == null) {
				ui.enabled = false;
			}
			if(ui.button("Copy")) {
				var newTheme = Reflect.copy(arm2d_Editor.selectedTheme);
				newTheme.NAME = arm2d_tools_CanvasTools.unique(newTheme.NAME,armory_ui_Canvas.themes,"NAME");
				armory_ui_Canvas.themes.push(newTheme);
				arm2d_Editor.selectedTheme = newTheme;
			}
			ui.enabled = true;
			if(arm2d_Editor.selectedTheme == null) {
				ui.enabled = false;
			}
			var hName = handleThemeName.nest(armory_ui_Canvas.themes.indexOf(arm2d_Editor.selectedTheme));
			if(ui.button("Rename")) {
				hName.text = arm2d_Editor.selectedTheme.NAME;
				armory_ui_Popup.showCustom(new zui_Zui(ui.ops),function(ui) {
					ui.textInput(hName);
					if(ui.button("OK")) {
						armory_ui_Popup.show = false;
						arm2d_ui_UIProperties.hwin.redraws = 2;
					}
				},ui.inputX | 0,ui.inputY | 0,200,60);
			}
			if(arm2d_Editor.selectedTheme != null) {
				var name = arm2d_Editor.selectedTheme.NAME;
				if(hName.changed && arm2d_Editor.selectedTheme.NAME != hName.text) {
					name = arm2d_tools_CanvasTools.unique(hName.text,armory_ui_Canvas.themes,"NAME");
					if(canvas.theme == arm2d_Editor.selectedTheme.NAME) {
						canvas.theme = name;
					}
					arm2d_Editor.selectedTheme.NAME = name;
				}
			}
			ui.enabled = true;
			if(armory_ui_Canvas.themes.length == 1 || arm2d_Editor.selectedTheme == null) {
				ui.enabled = false;
			}
			if(ui.button("Delete")) {
				handleThemeColor.unnest(armory_ui_Canvas.themes.indexOf(arm2d_Editor.selectedTheme));
				handleThemeName.unnest(armory_ui_Canvas.themes.indexOf(arm2d_Editor.selectedTheme));
				HxOverrides.remove(armory_ui_Canvas.themes,arm2d_Editor.selectedTheme);
				if(armory_ui_Canvas.getTheme(canvas.theme) == null) {
					canvas.theme = armory_ui_Canvas.themes[0].NAME;
				}
				arm2d_Editor.selectedTheme = null;
			}
			ui.enabled = true;
			if(arm2d_Editor.selectedTheme == null) {
				ui.enabled = false;
			}
			if(ui.button("Apply to Canvas")) {
				canvas.theme = arm2d_Editor.selectedTheme.NAME;
			}
			ui.enabled = true;
			if(arm2d_Editor.selectedTheme == null) {
				ui.text("Please select a Theme!");
			} else {
				var themeColorOptions = [["Text","TEXT_COL"],["Elements","BUTTON_COL","BUTTON_TEXT_COL","BUTTON_HOVER_COL","BUTTON_PRESSED_COL","ACCENT_COL","ACCENT_HOVER_COL","ACCENT_SELECT_COL"],["Other","PANEL_BG_COL"]];
				var _g = 0;
				var _g1 = themeColorOptions.length;
				while(_g < _g1) {
					var idxCategory = _g++;
					if(ui.panel(zui_Handle.global.nest(35,null).nest(idxCategory,{ selected : true}),themeColorOptions[idxCategory][0])) {
						ui.indent();
						var attributes = themeColorOptions[idxCategory].slice(1);
						var _g2 = 0;
						var _g3 = attributes.length;
						while(_g2 < _g3) {
							var idxElemAttribs = _g2++;
							var themeColorOption = attributes[idxElemAttribs];
							ui.row([0.66666666666666663,0.33333333333333331]);
							ui.text(themeColorOption);
							var themeColor = Reflect.getProperty(arm2d_Editor.selectedTheme,themeColorOption);
							var handleCol = handleThemeColor.nest(armory_ui_Canvas.themes.indexOf(arm2d_Editor.selectedTheme)).nest(idxCategory).nest(idxElemAttribs,{ color : themeColor});
							var col = armory_ui_Ext.colorField(ui,handleCol,true);
							Reflect.setProperty(arm2d_Editor.selectedTheme,themeColorOption,col);
						}
						ui.unindent();
					}
				}
			}
		}
		if(ui.tab(htab,"Assets")) {
			if(ui.button("Import Asset")) {
				arm2d_Editor.showFiles = true;
				arm2d_Editor.foldersOnly = false;
				arm2d_Editor.filesDone = function(path) {
					path = StringTools.rtrim(path);
					path = arm2d_Path.toRelative(path,Main.cwd);
					arm2d_Assets.importAsset(canvas,path);
				};
			}
			if(canvas.assets.length > 0) {
				ui.text("(Drag and drop assets to canvas)",1);
				if(ui.panel(zui_Handle.global.nest(36,{ selected : true}),"Imported Assets")) {
					ui.indent();
					var i = canvas.assets.length - 1;
					while(i >= 0) {
						var asset = canvas.assets[i];
						if(haxe_io_Path.extension(asset.name).toLowerCase() != "ttf" && ui.image(arm2d_Assets.getImage(asset)) == 1) {
							arm2d_Editor.dragAsset = asset;
						} else if(haxe_io_Path.extension(asset.name).toLowerCase() == "ttf") {
							var oldFont = ui.ops.font;
							var oldFontSize = ui.fontSize;
							ui.ops.font = arm2d_Assets.getFont(asset);
							ui.fontSize = 32 * ui.ops.scaleFactor | 0;
							ui.text(asset.name);
							ui.ops.font = oldFont;
							ui.fontSize = oldFontSize;
						}
						ui.row([0.875,0.125]);
						asset.name = ui.textInput(zui_Handle.global.nest(37,null).nest(asset.id,{ text : asset.name}),"",2);
						arm2d_Editor.assetNames[i + 1] = asset.name;
						if(ui.button("X")) {
							arm2d_Assets.getImage(asset).unload();
							canvas.assets.splice(i,1);
							arm2d_Editor.assetNames.splice(i + 1,1);
						}
						--i;
					}
					ui.unindent();
				}
			} else {
				ui.text("(Drag and drop images and fonts here)",1);
			}
		}
		if(ui.tab(htab,"Preferences")) {
			if(ui.panel(zui_Handle.global.nest(38,{ selected : true}),"Application")) {
				ui.indent();
				var hscale = zui_Handle.global.nest(39,{ value : 1.0});
				ui.slider(hscale,"UI Scale",0.5,4.0,true);
				if(hscale.changed && !ui.inputDown) {
					ui.setScale(hscale.value);
					arm2d_Editor.windowW = arm2d_Editor.defaultWindowW * hscale.value | 0;
				}
				var ui1 = ui;
				var tmp = zui_Handle.global.nest(40,{ selected : true});
				Main.prefs.window_vsync = ui1.check(tmp,"VSync");
				ui.unindent();
			}
			if(ui.panel(zui_Handle.global.nest(41,{ selected : true}),"Grid")) {
				ui.indent();
				var gsize = zui_Handle.global.nest(42,{ value : 20});
				ui.slider(gsize,"Grid Size",1,128,true,1);
				arm2d_Editor.gridSnapPos = ui.check(zui_Handle.global.nest(43,{ selected : true}),"Grid Snap Position");
				if(ui.isHovered) {
					ui.tooltip("Snap the element's position to the grid");
				}
				arm2d_Editor.gridSnapBounds = ui.check(zui_Handle.global.nest(44,{ selected : false}),"Grid Snap Bounds");
				if(ui.isHovered) {
					ui.tooltip("Snap the element's bounds to the grid");
				}
				arm2d_Editor.gridUseRelative = ui.check(zui_Handle.global.nest(45,{ selected : true}),"Use Relative Grid");
				if(ui.isHovered) {
					ui.tooltip("Use a grid that's relative to the selected element");
				}
				if(gsize.changed && !ui.inputDown) {
					arm2d_Editor.gridSize = gsize.value | 0;
				}
				arm2d_Editor.useRotationSteps = ui.check(zui_Handle.global.nest(46,{ selected : false}),"Use Fixed Rotation Steps");
				if(ui.isHovered) {
					ui.tooltip("Rotate elements by a fixed step size");
				}
				var rotStepHandle = zui_Handle.global.nest(47,{ value : 15});
				if(arm2d_Editor.useRotationSteps) {
					ui.slider(rotStepHandle,"Rotation Step Size",1,180,true,1);
				}
				if(rotStepHandle.changed && !ui.inputDown) {
					arm2d_Editor.rotationSteps = rotStepHandle.value * 0.0174532924;
				}
				ui.unindent();
			}
			if(ui.panel(zui_Handle.global.nest(48,{ selected : true}),"Shortcuts")) {
				ui.indent();
				ui.row([0.5,0.5]);
				ui.text("Select");
				var selectMouseHandle = zui_Handle.global.nest(49,{ position : 0});
				ui.combo(selectMouseHandle,["Left Click","Right Click"],"");
				if(ui.isHovered) {
					ui.tooltip("Mouse button used for element selection.");
				}
				if(selectMouseHandle.changed) {
					Main.prefs.keyMap.selectMouseButton = ["Left","Right"][selectMouseHandle.position];
				}
				ui.separator(8,false);
				ui.row([0.5,0.5]);
				ui.text("Grab");
				var ui1 = ui;
				var tmp = zui_Handle.global.nest(50,{ value : 71});
				Main.prefs.keyMap.grabKey = armory_ui_Ext.keyInput(ui1,tmp,"Key");
				if(ui.isHovered) {
					ui.tooltip("Key used for grabbing elements");
				}
				ui.row([0.5,0.5]);
				ui.text("Rotate");
				var ui1 = ui;
				var tmp = zui_Handle.global.nest(51,{ value : 82});
				Main.prefs.keyMap.rotateKey = armory_ui_Ext.keyInput(ui1,tmp,"Key");
				if(ui.isHovered) {
					ui.tooltip("Key used for rotating elements");
				}
				ui.row([0.5,0.5]);
				ui.text("Size");
				var ui1 = ui;
				var tmp = zui_Handle.global.nest(52,{ value : 83});
				Main.prefs.keyMap.sizeKey = armory_ui_Ext.keyInput(ui1,tmp,"Key");
				if(ui.isHovered) {
					ui.tooltip("Key used for resizing elements");
				}
				ui.separator(8,false);
				ui.row([0.5,0.5]);
				ui.text("Precision Transform");
				var ui1 = ui;
				var tmp = zui_Handle.global.nest(53,{ value : 16});
				Main.prefs.keyMap.slowMovement = armory_ui_Ext.keyInput(ui1,tmp,"Key");
				if(ui.isHovered) {
					ui.tooltip("More precise transformations");
				}
				ui.row([0.5,0.5]);
				ui.text("Invert Grid");
				var ui1 = ui;
				var tmp = zui_Handle.global.nest(54,{ value : 17});
				Main.prefs.keyMap.gridInvert = armory_ui_Ext.keyInput(ui1,tmp,"Key");
				if(ui.isHovered) {
					ui.tooltip("Invert the grid setting");
				}
				ui.row([0.5,0.5]);
				ui.text("Invert Rel. Grid");
				var ui1 = ui;
				var tmp = zui_Handle.global.nest(55,{ value : 18});
				Main.prefs.keyMap.gridInvertRelative = armory_ui_Ext.keyInput(ui1,tmp,"Key");
				if(ui.isHovered) {
					ui.tooltip("Invert the relative grid setting");
				}
				ui.unindent();
			}
			if(ui.panel(zui_Handle.global.nest(56,{ selected : false}),"Console")) {
				ui.indent();
				ui.text("Mouse X: " + ui.inputX);
				ui.text("Mouse Y: " + ui.inputY);
				ui.unindent();
			}
		}
	}
};
var arm2d_ui_UIToolBar = function() { };
$hxClasses["arm2d.ui.UIToolBar"] = arm2d_ui_UIToolBar;
arm2d_ui_UIToolBar.__name__ = true;
arm2d_ui_UIToolBar.renderToolbar = function(ui,cui,canvas,width) {
	if(ui.window(zui_Handle.global.nest(57,null),0,0,width,kha_System.windowHeight())) {
		ui.text("Add Elements:");
		if(ui.panel(zui_Handle.global.nest(58,{ selected : true}),"Basic")) {
			ui.indent();
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Empty",3,"Create an empty element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Text",0,"Create a text element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Image",1,"Create an image element");
			ui.unindent();
		}
		if(ui.panel(zui_Handle.global.nest(59,{ selected : true}),"Buttons")) {
			ui.indent();
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Button",2,"Create a button element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Check",6,"Create a checkbox element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Radio",7,"Create a inline-radio element");
			ui.unindent();
		}
		if(ui.panel(zui_Handle.global.nest(60,{ selected : true}),"Inputs")) {
			ui.indent();
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Text Input",10,"Create a text input element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Text Area",20,"Create a text area element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Key Input",11,"Create a key input element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Combo Box",8,"Create a combo box element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Slider",9,"Create a slider element");
			ui.unindent();
		}
		if(ui.panel(zui_Handle.global.nest(61,{ selected : true}),"Shapes")) {
			ui.indent();
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Rect",13,"Create a rectangle shape element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Fill Rect",12,"Create a filled rectangle shape element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Circle",15,"Create a circle shape element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Fill Circle",14,"Create a filled circle shape element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Triangle",17,"Create a triangle shape element");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"Fill Triangle",16,"Create a filled triangle shape element");
			ui.unindent();
		}
		if(ui.panel(zui_Handle.global.nest(62,{ selected : true}),"Progress Bars")) {
			ui.indent();
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"RectPB",18,"Create a rectangular progress bar");
			arm2d_ui_UIToolBar.drawToolbarItem(ui,cui,canvas,"CircularPB",19,"Create a circular progress bar");
			ui.unindent();
		}
	}
};
arm2d_ui_UIToolBar.drawToolbarItem = function(ui,cui,canvas,label,elemType,tooltip) {
	if(ui.button(label)) {
		arm2d_Editor.selectedElem = arm2d_tools_CanvasTools.makeElem(cui,canvas,elemType);
	}
	if(ui.isHovered) {
		ui.tooltip(tooltip);
	}
};
var armory_ui_Canvas = function() { };
$hxClasses["armory.ui.Canvas"] = armory_ui_Canvas;
armory_ui_Canvas.__name__ = true;
armory_ui_Canvas.draw = function(ui,canvas,g) {
	armory_ui_Canvas.screenW = kha_System.windowWidth();
	armory_ui_Canvas.screenH = kha_System.windowHeight();
	armory_ui_Canvas.events.length = 0;
	armory_ui_Canvas._ui = ui;
	g.end();
	ui.begin(g);
	g.begin(false);
	ui.g = g;
	var _g = 0;
	var _g1 = canvas.elements;
	while(_g < _g1.length) {
		var elem = _g1[_g];
		++_g;
		if(elem.parent == null) {
			armory_ui_Canvas.drawElement(ui,canvas,elem);
		}
	}
	g.end();
	ui.end();
	g.begin(false);
	return armory_ui_Canvas.events;
};
armory_ui_Canvas.drawElement = function(ui,canvas,element,px,py) {
	if(py == null) {
		py = 0.0;
	}
	if(px == null) {
		px = 0.0;
	}
	if(element == null || element.visible == false) {
		return;
	}
	var anchorOffset = armory_ui_Canvas.getAnchorOffset(canvas,element);
	px += anchorOffset[0];
	py += anchorOffset[1];
	ui._x = canvas.x + (element.x * armory_ui_Canvas._ui.ops.scaleFactor | 0) + px;
	ui._y = canvas.y + (element.y * armory_ui_Canvas._ui.ops.scaleFactor | 0) + py;
	ui._w = element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0;
	var rotated = element.rotation != null && element.rotation != 0;
	if(rotated) {
		ui.g.pushRotation(element.rotation,ui._x + (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2);
	}
	var font = ui.ops.font;
	var assetName = element.asset;
	var fontAsset = assetName != null && StringTools.endsWith(assetName.toLowerCase(),".ttf");
	if(fontAsset) {
		ui.ops.font = armory_ui_Canvas.getAsset(canvas,element.asset);
	}
	switch(element.type) {
	case 0:
		var size = ui.fontSize;
		ui.fontSize = element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0;
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		ui.text(element.text,element.alignment);
		ui.fontSize = size;
		break;
	case 1:
		var image = armory_ui_Canvas.getAsset(canvas,element.asset);
		if(image != null && !fontAsset) {
			ui.imageScrollAlign = false;
			var tint = element.color != null ? element.color : -1;
			if(ui.image(image,tint,element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) == 3) {
				var e = element.event;
				if(e != null && e != "") {
					armory_ui_Canvas.events.push(e);
				}
			}
			ui.imageScrollAlign = true;
		}
		break;
	case 2:
		var eh = ui.t.ELEMENT_H;
		var bh = ui.t.BUTTON_H;
		ui.t.ELEMENT_H = element.height;
		ui.t.BUTTON_H = element.height;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.BUTTON_COL = color != null ? color : defaultColor;
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_TEXT_COL;
		ui.t.BUTTON_TEXT_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.BUTTON_HOVER_COL = color != null ? color : defaultColor;
		var color = element.color_press;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_PRESSED_COL;
		ui.t.BUTTON_PRESSED_COL = color != null ? color : defaultColor;
		if(ui.button(element.text,element.alignment)) {
			var e = element.event;
			if(e != null && e != "") {
				armory_ui_Canvas.events.push(e);
			}
		}
		ui.t.ELEMENT_H = eh;
		ui.t.BUTTON_H = bh;
		break;
	case 3:
		break;
	case 6:
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.ACCENT_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.ACCENT_HOVER_COL = color != null ? color : defaultColor;
		ui.check(armory_ui_Canvas.h.nest(element.id),element.text);
		break;
	case 7:
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.ACCENT_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.ACCENT_HOVER_COL = color != null ? color : defaultColor;
		zui_Ext.inlineRadio(ui,armory_ui_Canvas.h.nest(element.id),element.text.split(";"));
		break;
	case 8:
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.LABEL_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.ACCENT_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.SEPARATOR_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.ACCENT_HOVER_COL = color != null ? color : defaultColor;
		ui.combo(armory_ui_Canvas.h.nest(element.id),element.text.split(";"));
		break;
	case 9:
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.LABEL_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.ACCENT_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.ACCENT_HOVER_COL = color != null ? color : defaultColor;
		ui.slider(armory_ui_Canvas.h.nest(element.id),element.text,0.0,1.0,true,100,true,element.alignment);
		break;
	case 10:
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.LABEL_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.ACCENT_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.ACCENT_HOVER_COL = color != null ? color : defaultColor;
		ui.textInput(armory_ui_Canvas.h.nest(element.id),element.text,element.alignment);
		if(armory_ui_Canvas.h.nest(element.id).changed) {
			var e = element.event;
			if(e != null && e != "") {
				armory_ui_Canvas.events.push(e);
			}
		}
		break;
	case 11:
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.LABEL_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.ACCENT_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.ACCENT_HOVER_COL = color != null ? color : defaultColor;
		armory_ui_Ext.keyInput(ui,armory_ui_Canvas.h.nest(element.id),element.text);
		break;
	case 12:
		var col = ui.g.get_color();
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		ui.g.fillRect(ui._x,ui._y,ui._w,element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		ui.g.set_color(col);
		break;
	case 13:
		var col = ui.g.get_color();
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		ui.g.drawRect(ui._x,ui._y,ui._w,element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0,element.strength);
		ui.g.set_color(col);
		break;
	case 14:
		var col = ui.g.get_color();
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		kha_graphics2_GraphicsExtension.fillCircle(ui.g,ui._x + (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._w / 2);
		ui.g.set_color(col);
		break;
	case 15:
		var col = ui.g.get_color();
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		kha_graphics2_GraphicsExtension.drawCircle(ui.g,ui._x + (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._w / 2,element.strength);
		ui.g.set_color(col);
		break;
	case 16:
		var col = ui.g.get_color();
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		ui.g.fillTriangle(ui._x + ui._w / 2,ui._y,ui._x,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0),ui._x + ui._w,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0));
		ui.g.set_color(col);
		break;
	case 17:
		var col = ui.g.get_color();
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		ui.g.drawLine(ui._x + ui._w / 2,ui._y,ui._x,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0),element.strength);
		ui.g.drawLine(ui._x,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0),ui._x + ui._w,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0),element.strength);
		ui.g.drawLine(ui._x + ui._w,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0),ui._x + ui._w / 2,ui._y,element.strength);
		ui.g.set_color(col);
		break;
	case 18:
		var col = ui.g.get_color();
		var progress = element.progress_at;
		var totalprogress = element.progress_total;
		var ui1 = ui.g;
		var color = element.color_progress;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui1.set_color(color != null ? color : defaultColor);
		ui.g.fillRect(ui._x,ui._y,ui._w / totalprogress * Math.min(progress,totalprogress),element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		ui.g.drawRect(ui._x,ui._y,ui._w,element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0,element.strength);
		ui.g.set_color(col);
		break;
	case 19:
		var col = ui.g.get_color();
		var progress = element.progress_at;
		var totalprogress = element.progress_total;
		var ui1 = ui.g;
		var color = element.color_progress;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui1.set_color(color != null ? color : defaultColor);
		kha_graphics2_GraphicsExtension.drawArc(ui.g,ui._x + (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._w / 2,-Math.PI / 2,Math.PI * 2 / totalprogress * progress - Math.PI / 2,element.strength);
		var ui1 = ui.g;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui1.set_color(color != null ? color : defaultColor);
		kha_graphics2_GraphicsExtension.fillCircle(ui.g,ui._x + (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._y + (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2,ui._w / 2 - 10);
		ui.g.set_color(col);
		break;
	case 20:
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.TEXT_COL = color != null ? color : defaultColor;
		var color = element.color_text;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).TEXT_COL;
		ui.t.LABEL_COL = color != null ? color : defaultColor;
		var color = element.color;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_COL;
		ui.t.ACCENT_COL = color != null ? color : defaultColor;
		var color = element.color_hover;
		var defaultColor = armory_ui_Canvas.getTheme(canvas.theme).BUTTON_HOVER_COL;
		ui.t.ACCENT_HOVER_COL = color != null ? color : defaultColor;
		armory_ui_Canvas.h.nest(element.id).text = element.text;
		zui_Ext.textArea(ui,armory_ui_Canvas.h.nest(element.id),element.alignment,element.editable);
		if(armory_ui_Canvas.h.nest(element.id).changed) {
			var e = element.event;
			if(e != null && e != "") {
				armory_ui_Canvas.events.push(e);
			}
		}
		break;
	}
	ui.ops.font = font;
	if(element.children != null) {
		var _g = 0;
		var _g1 = element.children;
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			armory_ui_Canvas.drawElement(ui,canvas,armory_ui_Canvas.elemById(canvas,id),(element.x * armory_ui_Canvas._ui.ops.scaleFactor | 0) + px,(element.y * armory_ui_Canvas._ui.ops.scaleFactor | 0) + py);
		}
	}
	if(rotated) {
		ui.g.popTransformation();
	}
};
armory_ui_Canvas.getText = function(canvas,e) {
	return e.text;
};
armory_ui_Canvas.getAsset = function(canvas,asset) {
	var _g = 0;
	var _g1 = canvas.assets;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		if(a.name == asset) {
			return armory_ui_Canvas.assetMap.h[a.id];
		}
	}
	return null;
};
armory_ui_Canvas.getElementId = function(canvas) {
	if(armory_ui_Canvas.elemId == -1) {
		var _g = 0;
		var _g1 = canvas.elements;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(armory_ui_Canvas.elemId < e.id) {
				armory_ui_Canvas.elemId = e.id;
			}
		}
	}
	return ++armory_ui_Canvas.elemId;
};
armory_ui_Canvas.getAssetId = function(canvas) {
	if(armory_ui_Canvas.assetId == -1) {
		var _g = 0;
		var _g1 = canvas.assets;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(armory_ui_Canvas.assetId < a.id) {
				armory_ui_Canvas.assetId = a.id;
			}
		}
	}
	return ++armory_ui_Canvas.assetId;
};
armory_ui_Canvas.elemById = function(canvas,id) {
	var _g = 0;
	var _g1 = canvas.elements;
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		if(e.id == id) {
			return e;
		}
	}
	return null;
};
armory_ui_Canvas.scaled = function(f) {
	return f * armory_ui_Canvas._ui.ops.scaleFactor | 0;
};
armory_ui_Canvas.isFontAsset = function(assetName) {
	if(assetName != null) {
		return StringTools.endsWith(assetName.toLowerCase(),".ttf");
	} else {
		return false;
	}
};
armory_ui_Canvas.getColor = function(color,defaultColor) {
	if(color != null) {
		return color;
	} else {
		return defaultColor;
	}
};
armory_ui_Canvas.getTheme = function(theme) {
	var _g = 0;
	var _g1 = armory_ui_Canvas.themes;
	while(_g < _g1.length) {
		var t = _g1[_g];
		++_g;
		if(t.NAME == theme) {
			return t;
		}
	}
	return null;
};
armory_ui_Canvas.getAnchorOffset = function(canvas,element) {
	var boxWidth;
	var boxHeight;
	var offsetX = 0.0;
	var offsetY = 0.0;
	if(element.parent == null) {
		boxWidth = canvas.width;
		boxHeight = canvas.height;
	} else {
		var parent = armory_ui_Canvas.elemById(canvas,element.parent);
		boxWidth = parent.width * armory_ui_Canvas._ui.ops.scaleFactor | 0;
		boxHeight = parent.height * armory_ui_Canvas._ui.ops.scaleFactor | 0;
	}
	switch(element.anchor) {
	case 1:
		offsetX += boxWidth / 2 - (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2;
		break;
	case 2:
		offsetX += boxWidth - (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		break;
	case 3:
		offsetY += boxHeight / 2 - (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2;
		break;
	case 4:
		offsetX += boxWidth / 2 - (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2;
		offsetY += boxHeight / 2 - (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2;
		break;
	case 5:
		offsetX += boxWidth - (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		offsetY += boxHeight / 2 - (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2;
		break;
	case 6:
		offsetY += boxHeight - (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		break;
	case 7:
		offsetX += boxWidth / 2 - (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0) / 2;
		offsetY += boxHeight - (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		break;
	case 8:
		offsetX += boxWidth - (element.width * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		offsetY += boxHeight - (element.height * armory_ui_Canvas._ui.ops.scaleFactor | 0);
		break;
	}
	return [offsetX,offsetY];
};
var armory_ui_Ext = function() { };
$hxClasses["armory.ui.Ext"] = armory_ui_Ext;
armory_ui_Ext.__name__ = true;
armory_ui_Ext.keyInput = function(ui,handle,label,align) {
	if(align == null) {
		align = 0;
	}
	if(label == null) {
		label = "";
	}
	if(!ui.isVisible(ui.t.ELEMENT_H * ui.ops.scaleFactor)) {
		ui.endElement();
		return handle.value | 0;
	}
	var hover = ui.getHover();
	if(hover && zui_Zui.onTextHover != null) {
		zui_Zui.onTextHover();
	}
	ui.g.set_color(hover ? ui.t.ACCENT_HOVER_COL : ui.t.ACCENT_COL);
	var g = ui.g;
	var fill = ui.t.FILL_ACCENT_BG;
	var x = ui._x + ui.buttonOffsetY;
	var y = ui._y + ui.buttonOffsetY;
	var w = ui._w - ui.buttonOffsetY * 2;
	var h = ui.t.BUTTON_H * ui.ops.scaleFactor;
	var strength = 0.0;
	if(strength == 0.0) {
		strength = 1;
	}
	if(!ui.enabled) {
		ui.fadeColor();
	}
	if(fill) {
		g.fillRect(x,y - 1,w,h + 1);
	} else {
		g.drawRect(x,y,w,h,strength);
	}
	var startEdit = ui.getReleased() || ui.tabPressed;
	if(ui.textSelectedHandle != handle && startEdit) {
		ui.startTextEdit(handle);
	}
	if(ui.textSelectedHandle == handle) {
		armory_ui_Ext.listenToKey(ui,handle);
	} else {
		handle.changed = false;
	}
	if(label != "") {
		ui.g.set_color(ui.t.LABEL_COL);
		var labelAlign = align == 2 ? 0 : 2;
		var xOffset = labelAlign == 0 ? 7 : 0;
		ui.drawString(ui.g,label,xOffset,0,labelAlign);
	}
	handle.text = armory_ui_Ext.keycodeToString(handle.value | 0);
	ui.g.set_color(ui.t.TEXT_COL);
	if(ui.textSelectedHandle != handle) {
		ui.drawString(ui.g,handle.text,null,0,align);
	} else {
		ui.drawString(ui.g,ui.textSelected,null,0,align);
	}
	ui.endElement();
	return handle.value | 0;
};
armory_ui_Ext.listenToKey = function(ui,handle) {
	if(ui.isKeyDown) {
		handle.value = ui.key;
		handle.changed = ui.changed = true;
		ui.textSelectedHandle = null;
		ui.isTyping = false;
		if(kha_input_Keyboard.get() != null) {
			kha_input_Keyboard.get().hide();
		}
	} else {
		ui.textSelected = "Press a key...";
	}
};
armory_ui_Ext.list = function(ui,handle,ar,opts) {
	var selected = 0;
	if(opts == null) {
		opts = { };
	}
	var addCb = opts.addCb != null ? opts.addCb : function(name) {
		ar.push(name);
	};
	var removeCb = opts.removeCb != null ? opts.removeCb : function(i) {
		ar.splice(i,1);
	};
	var getNameCb = opts.getNameCb != null ? opts.getNameCb : function(i) {
		return ar[i];
	};
	var setNameCb = opts.setNameCb != null ? opts.setNameCb : function(i,name) {
		ar[i] = name;
	};
	var getLabelCb = opts.getLabelCb != null ? opts.getLabelCb : function(i) {
		return "";
	};
	var itemDrawCb = opts.itemDrawCb;
	var showRadio = opts.showRadio != null && opts.showRadio;
	var editable = opts.editable != null ? opts.editable : true;
	var showAdd = opts.showAdd != null ? opts.showAdd : true;
	var addLabel = opts.addLabel != null ? opts.addLabel : "Add";
	var i = 0;
	while(i < ar.length) {
		if(showRadio) {
			ui.row([0.12,0.68,0.2]);
			if(ui.radio(handle.nest(0),i,"")) {
				selected = i;
			}
		} else {
			ui.row([0.8,0.2]);
		}
		var itemHandle = handle.nest(i);
		itemHandle.text = getNameCb(i);
		if(editable) {
			setNameCb(i,ui.textInput(itemHandle,getLabelCb(i)));
		} else {
			ui.text(getNameCb(i));
		}
		if(ui.button("X")) {
			removeCb(i);
		} else {
			++i;
		}
		if(itemDrawCb != null) {
			itemDrawCb(itemHandle.nest(i),i - 1);
		}
	}
	if(showAdd && ui.button(addLabel)) {
		addCb("untitled");
	}
	return selected;
};
armory_ui_Ext.panelList = function(ui,handle,ar,addCb,removeCb,getNameCb,setNameCb,itemDrawCb,editable,showAdd,addLabel) {
	if(addLabel == null) {
		addLabel = "Add";
	}
	if(showAdd == null) {
		showAdd = true;
	}
	if(editable == null) {
		editable = true;
	}
	if(addCb == null) {
		addCb = function(name) {
			ar.push(name);
		};
	}
	if(removeCb == null) {
		removeCb = function(i) {
			ar.splice(i,1);
		};
	}
	if(getNameCb == null) {
		getNameCb = function(i) {
			return ar[i];
		};
	}
	if(setNameCb == null) {
		setNameCb = function(i,name) {
			ar[i] = name;
		};
	}
	var i = 0;
	while(i < ar.length) {
		ui.row([0.12,0.68,0.2]);
		var expanded = ui.panel(handle.nest(i),"");
		var itemHandle = handle.nest(i);
		if(editable) {
			setNameCb(i,ui.textInput(itemHandle,getNameCb(i)));
		} else {
			ui.text(getNameCb(i));
		}
		if(ui.button("X")) {
			removeCb(i);
		} else {
			++i;
		}
		if(itemDrawCb != null && expanded) {
			itemDrawCb(itemHandle.nest(i),i - 1);
		}
	}
	if(showAdd && ui.button(addLabel)) {
		addCb("untitled");
	}
};
armory_ui_Ext.colorField = function(ui,handle,alpha) {
	if(alpha == null) {
		alpha = false;
	}
	ui.g.set_color(handle.color);
	var g = ui.g;
	var x = ui._x + 2;
	var y = ui._y + ui.buttonOffsetY;
	var w = ui._w - 4;
	var h = ui.t.BUTTON_H * ui.ops.scaleFactor;
	var strength = 0.0;
	if(strength == 0.0) {
		strength = 1;
	}
	if(!ui.enabled) {
		ui.fadeColor();
	}
	g.fillRect(x,y - 1,w,h + 1);
	ui.g.set_color(ui.getHover() ? ui.t.ACCENT_HOVER_COL : ui.t.ACCENT_COL);
	var g = ui.g;
	var x = ui._x + 2;
	var y = ui._y + ui.buttonOffsetY;
	var w = ui._w - 4;
	var h = ui.t.BUTTON_H * ui.ops.scaleFactor;
	var strength = 1.0;
	if(strength == null) {
		strength = 0.0;
	}
	if(strength == 0.0) {
		strength = 1;
	}
	if(!ui.enabled) {
		ui.fadeColor();
	}
	g.drawRect(x,y,w,h,strength);
	if(ui.getStarted()) {
		armory_ui_Popup.showCustom(new zui_Zui(ui.ops),function(ui) {
			zui_Ext.colorWheel(ui,handle,alpha);
		},ui.inputX | 0,ui.inputY | 0,200,500);
	}
	ui.endElement();
	return handle.color;
};
armory_ui_Ext.colorPicker = function(ui,handle,alpha) {
	if(alpha == null) {
		alpha = false;
	}
	var r = ui.slider(handle.nest(0,{ value : ((handle.color & 16711680) >>> 16) * 0.00392156862745098}),"R",0,1,true);
	var g = ui.slider(handle.nest(1,{ value : ((handle.color & 65280) >>> 8) * 0.00392156862745098}),"G",0,1,true);
	var b = ui.slider(handle.nest(2,{ value : (handle.color & 255) * 0.00392156862745098}),"B",0,1,true);
	var a = (handle.color >>> 24) * 0.00392156862745098;
	if(alpha) {
		a = ui.slider(handle.nest(3,{ value : a}),"A",0,1,true);
	}
	var col = kha_Color.fromFloats(r,g,b,a);
	ui.text("",2,col);
	return col;
};
armory_ui_Ext.keycodeToString = function(keycode) {
	switch(keycode) {
	case -1:
		return "None";
	case 0:
		return "Unknown";
	case 1:
		return "Back";
	case 3:
		return "Cancel";
	case 6:
		return "Help";
	case 8:
		return "Backspace";
	case 9:
		return "Tab";
	case 12:
		return "Clear";
	case 13:
		return "Return";
	case 16:
		return "Shift";
	case 17:
		return "Ctrl";
	case 18:
		return "Alt";
	case 19:
		return "Pause";
	case 20:
		return "CapsLock";
	case 21:
		return "Kana";
	case 22:
		return "Eisu";
	case 23:
		return "Junja";
	case 24:
		return "Final";
	case 25:
		return "Hanja";
	case 27:
		return "Esc";
	case 28:
		return "Convert";
	case 29:
		return "NonConvert";
	case 30:
		return "Accept";
	case 31:
		return "ModeChange";
	case 32:
		return "Space";
	case 33:
		return "PageUp";
	case 34:
		return "PageDown";
	case 35:
		return "End";
	case 36:
		return "Home";
	case 37:
		return "Left";
	case 38:
		return "Up";
	case 39:
		return "Right";
	case 40:
		return "Down";
	case 41:
		return "Select";
	case 42:
		return "Print";
	case 43:
		return "Execute";
	case 44:
		return "PrintScreen";
	case 45:
		return "Insert";
	case 46:
		return "Delete";
	case 58:
		return "Colon";
	case 59:
		return "Semicolon";
	case 60:
		return "LessThan";
	case 61:
		return "Equals";
	case 62:
		return "GreaterThan";
	case 63:
		return "QuestionMark";
	case 64:
		return "At";
	case 91:
		return "Win";
	case 93:
		return "ContextMenu";
	case 95:
		return "Sleep";
	case 96:
		return "Numpad0";
	case 97:
		return "Numpad1";
	case 98:
		return "Numpad2";
	case 99:
		return "Numpad3";
	case 100:
		return "Numpad4";
	case 101:
		return "Numpad5";
	case 102:
		return "Numpad6";
	case 103:
		return "Numpad7";
	case 104:
		return "Numpad8";
	case 105:
		return "Numpad9";
	case 106:
		return "Multiply";
	case 107:
		return "Add";
	case 108:
		return "Separator";
	case 109:
		return "Subtract";
	case 110:
		return "Decimal";
	case 111:
		return "Divide";
	case 112:
		return "F1";
	case 113:
		return "F2";
	case 114:
		return "F3";
	case 115:
		return "F4";
	case 116:
		return "F5";
	case 117:
		return "F6";
	case 118:
		return "F7";
	case 119:
		return "F8";
	case 120:
		return "F9";
	case 121:
		return "F10";
	case 122:
		return "F11";
	case 123:
		return "F12";
	case 124:
		return "F13";
	case 125:
		return "F14";
	case 126:
		return "F15";
	case 127:
		return "F16";
	case 128:
		return "F17";
	case 129:
		return "F18";
	case 130:
		return "F19";
	case 131:
		return "F20";
	case 132:
		return "F21";
	case 133:
		return "F22";
	case 134:
		return "F23";
	case 135:
		return "F24";
	case 144:
		return "NumLock";
	case 145:
		return "ScrollLock";
	case 146:
		return "WinOemFjJisho";
	case 147:
		return "WinOemFjMasshou";
	case 148:
		return "WinOemFjTouroku";
	case 149:
		return "WinOemFjLoya";
	case 150:
		return "WinOemFjRoya";
	case 160:
		return "Circumflex";
	case 161:
		return "Exclamation";
	case 162:
		return "DoubleQuote";
	case 163:
		return "Hash";
	case 164:
		return "Dollar";
	case 165:
		return "Percent";
	case 166:
		return "Ampersand";
	case 167:
		return "Underscore";
	case 168:
		return "OpenParen";
	case 169:
		return "CloseParen";
	case 170:
		return "Asterisk";
	case 171:
		return "Plus";
	case 172:
		return "Pipe";
	case 173:
		return "HyphenMinus";
	case 174:
		return "OpenCurlyBracket";
	case 175:
		return "CloseCurlyBracket";
	case 176:
		return "Tilde";
	case 181:
		return "VolumeMute";
	case 182:
		return "VolumeDown";
	case 183:
		return "VolumeUp";
	case 188:
		return "Comma";
	case 190:
		return "Period";
	case 191:
		return "Slash";
	case 192:
		return "BackQuote";
	case 219:
		return "OpenBracket";
	case 220:
		return "BackSlash";
	case 221:
		return "CloseBracket";
	case 222:
		return "Quote";
	case 224:
		return "Meta";
	case 225:
		return "AltGr";
	case 227:
		return "WinIcoHelp";
	case 228:
		return "WinIco00";
	case 230:
		return "WinIcoClear";
	case 233:
		return "WinOemReset";
	case 234:
		return "WinOemJump";
	case 235:
		return "WinOemPA1";
	case 236:
		return "WinOemPA2";
	case 237:
		return "WinOemPA3";
	case 238:
		return "WinOemWSCTRL";
	case 239:
		return "WinOemCUSEL";
	case 240:
		return "WinOemATTN";
	case 241:
		return "WinOemFinish";
	case 242:
		return "WinOemCopy";
	case 243:
		return "WinOemAuto";
	case 244:
		return "WinOemENLW";
	case 245:
		return "WinOemBackTab";
	case 246:
		return "ATTN";
	case 247:
		return "CRSEL";
	case 248:
		return "EXSEL";
	case 249:
		return "EREOF";
	case 250:
		return "Play";
	case 251:
		return "Zoom";
	case 253:
		return "PA1";
	case 254:
		return "WinOemClear";
	default:
		return String.fromCodePoint(keycode);
	}
};
var armory_ui_Popup = function() { };
$hxClasses["armory.ui.Popup"] = armory_ui_Popup;
armory_ui_Popup.__name__ = true;
armory_ui_Popup.render = function(g) {
	if(armory_ui_Popup.boxCommands == null) {
		armory_ui_Popup.ui.begin(g);
		if(armory_ui_Popup.ui.window(armory_ui_Popup.hwnd,armory_ui_Popup.modalX,armory_ui_Popup.modalY,armory_ui_Popup.modalW,armory_ui_Popup.modalH)) {
			armory_ui_Popup.drawTitle(g);
			var _g = 0;
			var _g1 = armory_ui_Popup.boxText.split("\n");
			while(_g < _g1.length) {
				var line = _g1[_g];
				++_g;
				armory_ui_Popup.ui.text(line);
			}
			armory_ui_Popup.ui._y = armory_ui_Popup.ui._h - armory_ui_Popup.ui.t.BUTTON_H - 10;
			armory_ui_Popup.ui.row([0.33333333333333331,0.33333333333333331,0.33333333333333331]);
			armory_ui_Popup.ui.endElement();
			if(armory_ui_Popup.ui.button("OK")) {
				armory_ui_Popup.show = false;
			}
		}
		armory_ui_Popup.ui.end();
	} else {
		armory_ui_Popup.ui.begin(g);
		if(armory_ui_Popup.ui.window(armory_ui_Popup.hwnd,armory_ui_Popup.modalX,armory_ui_Popup.modalY,armory_ui_Popup.modalW,armory_ui_Popup.modalH)) {
			armory_ui_Popup.drawTitle(g);
			armory_ui_Popup.ui._y += 10;
			armory_ui_Popup.boxCommands(armory_ui_Popup.ui);
		}
		armory_ui_Popup.ui.end();
	}
};
armory_ui_Popup.drawTitle = function(g) {
	if(armory_ui_Popup.boxTitle != "") {
		g.set_color(armory_ui_Popup.ui.t.SEPARATOR_COL);
		var _this = armory_ui_Popup.ui;
		var x = armory_ui_Popup.ui._x;
		var y = armory_ui_Popup.ui._y;
		var w = armory_ui_Popup.ui._w;
		var h = armory_ui_Popup.ui.t.BUTTON_H;
		var strength = 0.0;
		if(strength == 0.0) {
			strength = 1;
		}
		if(!_this.enabled) {
			_this.fadeColor();
		}
		g.fillRect(x,y - 1,w,h + 1);
		g.set_color(armory_ui_Popup.ui.t.TEXT_COL);
		armory_ui_Popup.ui.text(armory_ui_Popup.boxTitle);
	}
};
armory_ui_Popup.update = function() {
	var inUse = armory_ui_Popup.ui.comboSelectedHandle != null;
	if(armory_ui_Popup.ui.inputStarted && !inUse) {
		if(armory_ui_Popup.ui.inputX < armory_ui_Popup.modalX || armory_ui_Popup.ui.inputX > armory_ui_Popup.modalX + armory_ui_Popup.modalW || armory_ui_Popup.ui.inputY < armory_ui_Popup.modalY || armory_ui_Popup.ui.inputY > armory_ui_Popup.modalY + armory_ui_Popup.modalH) {
			armory_ui_Popup.show = false;
		}
	}
};
armory_ui_Popup.showMessage = function(ui,title,text) {
	armory_ui_Popup.ui = ui;
	armory_ui_Popup.init();
	armory_ui_Popup.boxTitle = title;
	armory_ui_Popup.boxText = text;
	armory_ui_Popup.boxCommands = null;
};
armory_ui_Popup.showCustom = function(ui,commands,mx,my,mw,mh) {
	if(mh == null) {
		mh = 160;
	}
	if(mw == null) {
		mw = 400;
	}
	if(my == null) {
		my = -1;
	}
	if(mx == null) {
		mx = -1;
	}
	armory_ui_Popup.ui = ui;
	armory_ui_Popup.init(mx,my,mw,mh);
	armory_ui_Popup.boxTitle = "";
	armory_ui_Popup.boxText = "";
	armory_ui_Popup.boxCommands = commands;
};
armory_ui_Popup.init = function(mx,my,mw,mh) {
	if(mh == null) {
		mh = 160;
	}
	if(mw == null) {
		mw = 400;
	}
	if(my == null) {
		my = -1;
	}
	if(mx == null) {
		mx = -1;
	}
	var appW = kha_System.windowWidth();
	var appH = kha_System.windowHeight();
	armory_ui_Popup.modalX = mx;
	armory_ui_Popup.modalY = my;
	armory_ui_Popup.modalW = mw * armory_ui_Popup.ui.ops.scaleFactor | 0;
	armory_ui_Popup.modalH = mh * armory_ui_Popup.ui.ops.scaleFactor | 0;
	if(mx == -1) {
		armory_ui_Popup.modalX = appW / 2 - armory_ui_Popup.modalW / 2 | 0;
	}
	if(my == -1) {
		armory_ui_Popup.modalY = appH / 2 - armory_ui_Popup.modalH / 2 | 0;
	}
	armory_ui_Popup.modalX = Math.max(0,Math.min(armory_ui_Popup.modalX,appW - armory_ui_Popup.modalW)) | 0;
	armory_ui_Popup.modalY = Math.max(0,Math.min(armory_ui_Popup.modalY,appH - armory_ui_Popup.modalH)) | 0;
	armory_ui_Popup.hwnd.dragX = 0;
	armory_ui_Popup.hwnd.dragY = 0;
	armory_ui_Popup.hwnd.scrollOffset = 0.0;
	armory_ui_Popup.show = true;
};
var armory_ui_Themes = function() { };
$hxClasses["armory.ui.Themes"] = armory_ui_Themes;
armory_ui_Themes.__name__ = true;
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native",get_message:"get_message"}
});
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = true;
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe__$Unserializer_DefaultResolver = function() {
};
$hxClasses["haxe._Unserializer.DefaultResolver"] = haxe__$Unserializer_DefaultResolver;
haxe__$Unserializer_DefaultResolver.__name__ = true;
haxe__$Unserializer_DefaultResolver.prototype = {
	resolveClass: function(name) {
		return $hxClasses[name];
	}
	,resolveEnum: function(name) {
		return $hxEnums[name];
	}
	,__class__: haxe__$Unserializer_DefaultResolver
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = this.buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = new haxe__$Unserializer_DefaultResolver();
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.resolver = r;
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = true;
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g = 0;
	var _g1 = haxe_Unserializer.BASE64.length;
	while(_g < _g1) {
		var i = _g++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c == 45) {
				if(this.pos != fpos) {
					break;
				}
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) {
				break;
			}
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) {
			k *= -1;
		}
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c >= 43 && c < 58 || c == 101 || c == 69) {
				this.pos++;
			} else {
				break;
			}
		}
		return parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) {
				throw haxe_Exception.thrown("Invalid object");
			}
			if(this.buf.charCodeAt(this.pos) == 103) {
				break;
			}
			var k = this.unserialize();
			if(typeof(k) != "string") {
				throw haxe_Exception.thrown("Invalid object key");
			}
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) {
			throw haxe_Exception.thrown("Invalid enum format");
		}
		var nargs = this.readDigits();
		if(nargs == 0) {
			return Type.createEnum(edecl,tag);
		}
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 65:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			return cl;
		case 66:
			var name = this.unserialize();
			var e = this.resolver.resolveEnum(name);
			if(e == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			return e;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) {
				throw haxe_Exception.thrown("Invalid custom data");
			}
			return o;
		case 77:
			var h = new haxe_ds_ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) {
				throw haxe_Exception.thrown("Invalid string reference");
			}
			return this.scache[n];
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else {
					a.push(this.unserialize());
				}
			}
			return a;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				var value = this.unserialize();
				h.h[s] = value;
			}
			this.pos++;
			return h;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 100:
			return this.readFloat();
		case 102:
			return false;
		case 105:
			return this.readDigits();
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			this.pos++;
			var index = this.readDigits();
			var _this = edecl.__constructs__;
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while(_g < _g1) {
				var i = _g++;
				result[i] = _this[i]._hx_name;
			}
			var tag = result[index];
			if(tag == null) {
				throw haxe_Exception.thrown("Unknown enum index " + name + "@" + index);
			}
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 107:
			return NaN;
		case 108:
			var l = new haxe_ds_List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 109:
			return -Infinity;
		case 110:
			return null;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 112:
			return Infinity;
		case 113:
			var h = new haxe_ds_IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				var value = this.unserialize();
				h.h[i] = value;
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) {
				throw haxe_Exception.thrown("Invalid IntMap format");
			}
			return h;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) {
				throw haxe_Exception.thrown("Invalid reference");
			}
			return this.cache[n];
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid bytes length");
			}
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2 ? rest - 1 : 0);
			var max = i + (len - rest);
			var bytes = new haxe_io_Bytes(new ArrayBuffer(size));
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c3 << 6 | c4;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 116:
			return true;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
				this.pos += 19;
			} else {
				d = new Date(this.readFloat());
			}
			this.cache.push(d);
			return d;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 120:
			throw haxe_Exception.thrown(this.unserialize());
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid string length");
			}
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 122:
			return 0;
		default:
		}
		this.pos--;
		throw haxe_Exception.thrown("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(key | 0);
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = true;
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,__class__: haxe_ds_StringMap
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,getDouble: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	,setDouble: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat64(pos,v,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat32(pos,v,true);
	}
	,getUInt16: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getUint16(pos,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) {
		pos = 0;
	}
	if(len == null) {
		len = b.length - pos;
	}
	if(pos < 0 || len < 0 || pos + len > b.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	b: null
	,pos: null
	,len: null
	,totlen: null
	,set_position: function(p) {
		if(p < 0) {
			p = 0;
		} else if(p > this.totlen) {
			p = this.totlen;
		}
		this.len = this.totlen - p;
		return this.pos = p;
	}
	,readByte: function() {
		if(this.len == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.len == 0 && len > 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		if(this.len < len) {
			len = this.len;
		}
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
	,__properties__: {set_position:"set_position"}
});
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = true;
haxe_io_Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeFloat: function(x) {
		this.writeInt32(haxe_io_FPHelper.floatToI32(x));
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,__class__: haxe_io_Output
};
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = true;
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	b: null
	,writeByte: function(c) {
		this.b.addByte(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.floatToI32 = function(f) {
	haxe_io_FPHelper.helper.setFloat32(0,f,true);
	return haxe_io_FPHelper.helper.getInt32(0,true);
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = true;
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) {
		return "";
	}
	return s.dir;
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) {
		return "";
	}
	return s.ext;
};
haxe_io_Path.join = function(paths) {
	var _g = [];
	var _g1 = 0;
	var _g2 = paths;
	while(_g1 < _g2.length) {
		var v = _g2[_g1];
		++_g1;
		if(v != null && v != "") {
			_g.push(v);
		}
	}
	var paths = _g;
	if(paths.length == 0) {
		return "";
	}
	var path = paths[0];
	var _g = 1;
	var _g1 = paths.length;
	while(_g < _g1) {
		var i = _g++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join(slash);
	if(path == slash) {
		return slash;
	}
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
			target.pop();
		} else if(token == "") {
			if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
				target.push(token);
			}
		} else if(token != ".") {
			target.push(token);
		}
	}
	var tmp = target.join(slash);
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g2_offset = 0;
	var _g2_s = tmp;
	while(_g2_offset < _g2_s.length) {
		var s = _g2_s;
		var index = _g2_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g2_offset;
		}
		var c2 = c1;
		switch(c2) {
		case 47:
			if(!colon) {
				slashes = true;
			} else {
				var i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
			break;
		case 58:
			acc_b += ":";
			colon = true;
			break;
		default:
			var i1 = c2;
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			acc_b += String.fromCodePoint(i1);
		}
	}
	return acc_b;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) {
		return "/";
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) {
			return path + "\\";
		} else {
			return path;
		}
	} else if(c1 != path.length - 1) {
		return path + "/";
	} else {
		return path;
	}
};
haxe_io_Path.prototype = {
	dir: null
	,file: null
	,ext: null
	,backslash: null
	,__class__: haxe_io_Path
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = true;
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var kha__$Assets_ImageList = function() {
	this.names = ["color_wheel","icons"];
	this.iconsSize = 1;
	this.iconsDescription = { name : "icons", original_height : 512, file_sizes : [1], original_width : 512, files : ["icons.png"], type : "image"};
	this.iconsName = "icons";
	this.icons = null;
	this.color_wheelSize = 1;
	this.color_wheelDescription = { name : "color_wheel", original_height : 270, file_sizes : [1], original_width : 360, files : ["color_wheel.png"], type : "image"};
	this.color_wheelName = "color_wheel";
	this.color_wheel = null;
};
$hxClasses["kha._Assets.ImageList"] = kha__$Assets_ImageList;
kha__$Assets_ImageList.__name__ = true;
kha__$Assets_ImageList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,color_wheel: null
	,color_wheelName: null
	,color_wheelDescription: null
	,color_wheelSize: null
	,color_wheelLoad: function(done,failure) {
		kha_Assets.loadImage("color_wheel",function(image) {
			done();
		},failure,{ fileName : "kha/internal/AssetsBuilder.hx", lineNumber : 136, className : "kha._Assets.ImageList", methodName : "color_wheelLoad"});
	}
	,color_wheelUnload: function() {
		this.color_wheel.unload();
		this.color_wheel = null;
	}
	,icons: null
	,iconsName: null
	,iconsDescription: null
	,iconsSize: null
	,iconsLoad: function(done,failure) {
		kha_Assets.loadImage("icons",function(image) {
			done();
		},failure,{ fileName : "kha/internal/AssetsBuilder.hx", lineNumber : 136, className : "kha._Assets.ImageList", methodName : "iconsLoad"});
	}
	,iconsUnload: function() {
		this.icons.unload();
		this.icons = null;
	}
	,names: null
	,__class__: kha__$Assets_ImageList
};
var kha__$Assets_SoundList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.SoundList"] = kha__$Assets_SoundList;
kha__$Assets_SoundList.__name__ = true;
kha__$Assets_SoundList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_SoundList
};
var kha__$Assets_BlobList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.BlobList"] = kha__$Assets_BlobList;
kha__$Assets_BlobList.__name__ = true;
kha__$Assets_BlobList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_BlobList
};
var kha__$Assets_FontList = function() {
	this.names = ["font_default"];
	this.font_defaultSize = 1;
	this.font_defaultDescription = { name : "font_default", file_sizes : [1], files : ["font_default.ttf"], type : "font"};
	this.font_defaultName = "font_default";
	this.font_default = null;
};
$hxClasses["kha._Assets.FontList"] = kha__$Assets_FontList;
kha__$Assets_FontList.__name__ = true;
kha__$Assets_FontList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,font_default: null
	,font_defaultName: null
	,font_defaultDescription: null
	,font_defaultSize: null
	,font_defaultLoad: function(done,failure) {
		kha_Assets.loadFont("font_default",function(font) {
			done();
		},failure,{ fileName : "kha/internal/AssetsBuilder.hx", lineNumber : 148, className : "kha._Assets.FontList", methodName : "font_defaultLoad"});
	}
	,font_defaultUnload: function() {
		this.font_default.unload();
		this.font_default = null;
	}
	,names: null
	,__class__: kha__$Assets_FontList
};
var kha__$Assets_VideoList = function() {
	this.names = [];
};
$hxClasses["kha._Assets.VideoList"] = kha__$Assets_VideoList;
kha__$Assets_VideoList.__name__ = true;
kha__$Assets_VideoList.prototype = {
	get: function(name) {
		return Reflect.field(this,name);
	}
	,names: null
	,__class__: kha__$Assets_VideoList
};
var kha_Assets = function() { };
$hxClasses["kha.Assets"] = kha_Assets;
kha_Assets.__name__ = true;
kha_Assets.__properties__ = {get_videoFormats:"get_videoFormats",get_fontFormats:"get_fontFormats",get_soundFormats:"get_soundFormats",get_imageFormats:"get_imageFormats"};
kha_Assets.loadEverything = function(callback,filter,uncompressSoundsFilter,failed) {
	var lists = [kha__$Assets_ImageList,kha__$Assets_SoundList,kha__$Assets_BlobList,kha__$Assets_FontList,kha__$Assets_VideoList];
	var listInstances = [kha_Assets.images,kha_Assets.sounds,kha_Assets.blobs,kha_Assets.fonts,kha_Assets.videos];
	var fileCount = 0;
	var byteCount = 0;
	var _g = 0;
	var _g1 = lists.length;
	while(_g < _g1) {
		var i = _g++;
		var list = lists[i];
		var _g2 = 0;
		var _g3 = Type.getInstanceFields(list);
		while(_g2 < _g3.length) {
			var file = _g3[_g2];
			++_g2;
			if(StringTools.endsWith(file,"Description")) {
				++fileCount;
			} else if(StringTools.endsWith(file,"Size")) {
				var size = Reflect.field(listInstances[i],file);
				byteCount += size;
			}
		}
	}
	if(fileCount == 0) {
		callback();
		return;
	}
	var filesLeft = fileCount;
	var bytesLeft = byteCount;
	var onLoaded = function(bytes) {
		filesLeft -= 1;
		bytesLeft -= bytes;
		kha_Assets.progress = 1 - bytesLeft / byteCount;
		if(filesLeft == 0) {
			callback();
		}
	};
	var onError = function(err,bytes) {
		(kha_Assets.reporter(failed,{ fileName : "kha/Assets.hx", lineNumber : 116, className : "kha.Assets", methodName : "loadEverything"}))(err);
		onLoaded(bytes);
	};
	var loadFunc = function(desc,done,failure) {
		var name = desc.name;
		var size = desc.file_sizes[0];
		switch(desc.type) {
		case "blob":
			kha_Assets.loadBlob(name,function(blob) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 142, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "font":
			kha_Assets.loadFont(name,function(font) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 146, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "image":
			kha_Assets.loadImage(name,function(image) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 125, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "sound":
			kha_Assets.loadSound(name,function(sound) {
				if(uncompressSoundsFilter == null || uncompressSoundsFilter(desc)) {
					sound.uncompress(function() {
						done(size);
					});
				} else {
					done(size);
				}
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 129, className : "kha.Assets", methodName : "loadEverything"});
			break;
		case "video":
			kha_Assets.loadVideo(name,function(video) {
				done(size);
			},function(err) {
				onError(err,size);
			},{ fileName : "kha/Assets.hx", lineNumber : 150, className : "kha.Assets", methodName : "loadEverything"});
			break;
		}
	};
	var _g = 0;
	var _g1 = lists.length;
	while(_g < _g1) {
		var i = _g++;
		var list = lists[i];
		var listInstance = listInstances[i];
		var _g2 = 0;
		var _g3 = Type.getInstanceFields(list);
		while(_g2 < _g3.length) {
			var field = _g3[_g2];
			++_g2;
			if(!StringTools.endsWith(field,"Description")) {
				continue;
			}
			var desc = Reflect.field(listInstance,field);
			if(filter == null || filter(desc)) {
				loadFunc(desc,onLoaded,onError);
			} else {
				onLoaded(desc.file_sizes[0]);
			}
		}
	}
};
kha_Assets.loadImage = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.images,name + "Description");
	kha_LoaderImpl.loadImageFromDescription(description,function(image) {
		kha_Assets.images[name] = image;
		done(image);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadImageFromPath = function(path,readable,done,failed,pos) {
	var description = { files : [path], readable : readable};
	kha_LoaderImpl.loadImageFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_imageFormats = function() {
	return kha_LoaderImpl.getImageFormats();
};
kha_Assets.loadBlob = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.blobs,name + "Description");
	kha_LoaderImpl.loadBlobFromDescription(description,function(blob) {
		kha_Assets.blobs[name] = blob;
		done(blob);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadBlobFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadBlobFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.loadSound = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.sounds,name + "Description");
	kha_LoaderImpl.loadSoundFromDescription(description,function(sound) {
		kha_Assets.sounds[name] = sound;
		done(sound);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadSoundFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadSoundFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_soundFormats = function() {
	return kha_LoaderImpl.getSoundFormats();
};
kha_Assets.loadFont = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.fonts,name + "Description");
	kha_LoaderImpl.loadFontFromDescription(description,function(font) {
		kha_Assets.fonts[name] = font;
		done(font);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadFontFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadFontFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_fontFormats = function() {
	return ["ttf"];
};
kha_Assets.loadVideo = function(name,done,failed,pos) {
	var description = Reflect.field(kha_Assets.videos,name + "Description");
	kha_LoaderImpl.loadVideoFromDescription(description,function(video) {
		kha_Assets.videos[name] = video;
		done(video);
	},kha_Assets.reporter(failed,pos));
};
kha_Assets.loadVideoFromPath = function(path,done,failed,pos) {
	var description = { files : [path]};
	kha_LoaderImpl.loadVideoFromDescription(description,done,kha_Assets.reporter(failed,pos));
};
kha_Assets.get_videoFormats = function() {
	return kha_LoaderImpl.getVideoFormats();
};
kha_Assets.reporter = function(custom,pos) {
	if(custom != null) {
		return custom;
	} else {
		var _g = haxe_Log.trace;
		var infos = pos;
		return function(v) {
			_g(v,infos);
		};
	}
};
var kha_Canvas = function() { };
$hxClasses["kha.Canvas"] = kha_Canvas;
kha_Canvas.__name__ = true;
kha_Canvas.__isInterface__ = true;
kha_Canvas.prototype = {
	get_width: null
	,get_height: null
	,get_g1: null
	,get_g2: null
	,get_g4: null
	,width: null
	,height: null
	,g1: null
	,g2: null
	,g4: null
	,__class__: kha_Canvas
	,__properties__: {get_g4:"get_g4",get_g2:"get_g2",get_g1:"get_g1",get_height:"get_height",get_width:"get_width"}
};
var kha_Color = {};
kha_Color.__properties__ = {set_value:"set_value",get_value:"get_value",set_A:"set_A",get_A:"get_A",set_B:"set_B",get_B:"get_B",set_G:"set_G",get_G:"get_G",set_R:"set_R",get_R:"get_R",set_Ab:"set_Ab",get_Ab:"get_Ab",set_Bb:"set_Bb",get_Bb:"get_Bb",set_Gb:"set_Gb",get_Gb:"get_Gb",set_Rb:"set_Rb",get_Rb:"get_Rb"};
kha_Color.fromValue = function(value) {
	return kha_Color._new(value);
};
kha_Color.fromBytes = function(r,g,b,a) {
	if(a == null) {
		a = 255;
	}
	return kha_Color._new(a << 24 | r << 16 | g << 8 | b);
};
kha_Color.fromFloats = function(r,g,b,a) {
	if(a == null) {
		a = 1;
	}
	return kha_Color._new((a * 255 | 0) << 24 | (r * 255 | 0) << 16 | (g * 255 | 0) << 8 | (b * 255 | 0));
};
kha_Color.fromString = function(value) {
	if((value.length == 7 || value.length == 9) && value.charCodeAt(0) == 35) {
		var colorValue = Std.parseInt("0x" + HxOverrides.substr(value,1,null));
		if(value.length == 7) {
			colorValue += -16777216;
		}
		return kha_Color._new(colorValue | 0);
	} else {
		throw haxe_Exception.thrown("Invalid Color string: '" + value + "'");
	}
};
kha_Color._new = function(value) {
	var this1 = value;
	return this1;
};
kha_Color.get_value = function(this1) {
	return this1;
};
kha_Color.set_value = function(this1,value) {
	this1 = value;
	return this1;
};
kha_Color.get_Rb = function(this1) {
	return (this1 & 16711680) >>> 16;
};
kha_Color.get_Gb = function(this1) {
	return (this1 & 65280) >>> 8;
};
kha_Color.get_Bb = function(this1) {
	return this1 & 255;
};
kha_Color.get_Ab = function(this1) {
	return this1 >>> 24;
};
kha_Color.set_Rb = function(this1,i) {
	this1 = this1 >>> 24 << 24 | i << 16 | (this1 & 65280) >>> 8 << 8 | this1 & 255;
	return i;
};
kha_Color.set_Gb = function(this1,i) {
	this1 = this1 >>> 24 << 24 | (this1 & 16711680) >>> 16 << 16 | i << 8 | this1 & 255;
	return i;
};
kha_Color.set_Bb = function(this1,i) {
	this1 = this1 >>> 24 << 24 | (this1 & 16711680) >>> 16 << 16 | (this1 & 65280) >>> 8 << 8 | i;
	return i;
};
kha_Color.set_Ab = function(this1,i) {
	this1 = i << 24 | (this1 & 16711680) >>> 16 << 16 | (this1 & 65280) >>> 8 << 8 | this1 & 255;
	return i;
};
kha_Color.get_R = function(this1) {
	return ((this1 & 16711680) >>> 16) * 0.00392156862745098;
};
kha_Color.get_G = function(this1) {
	return ((this1 & 65280) >>> 8) * 0.00392156862745098;
};
kha_Color.get_B = function(this1) {
	return (this1 & 255) * 0.00392156862745098;
};
kha_Color.get_A = function(this1) {
	return (this1 >>> 24) * 0.00392156862745098;
};
kha_Color.set_R = function(this1,f) {
	this1 = ((this1 >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (f * 255 | 0) << 16 | (((this1 & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | ((this1 & 255) * 0.00392156862745098 * 255 | 0);
	return f;
};
kha_Color.set_G = function(this1,f) {
	this1 = ((this1 >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (((this1 & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (f * 255 | 0) << 8 | ((this1 & 255) * 0.00392156862745098 * 255 | 0);
	return f;
};
kha_Color.set_B = function(this1,f) {
	this1 = ((this1 >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (((this1 & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (((this1 & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | (f * 255 | 0);
	return f;
};
kha_Color.set_A = function(this1,f) {
	this1 = (f * 255 | 0) << 24 | (((this1 & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (((this1 & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | ((this1 & 255) * 0.00392156862745098 * 255 | 0);
	return f;
};
var kha_Display = function(num,isPrimary) {
	this.num = num;
	this.isPrimary = isPrimary;
};
$hxClasses["kha.Display"] = kha_Display;
kha_Display.__name__ = true;
kha_Display.__properties__ = {get_all:"get_all",get_primary:"get_primary"};
kha_Display.init = function() {
	if(kha_Display.displays == null) {
		kha_Display.displays = [];
		var _g = 0;
		var _g1 = Krom.displayCount();
		while(_g < _g1) {
			var i = _g++;
			kha_Display.displays.push(new kha_Display(i,Krom.displayIsPrimary(i)));
		}
	}
};
kha_Display.get_primary = function() {
	kha_Display.init();
	var _g = 0;
	var _g1 = kha_Display.displays;
	while(_g < _g1.length) {
		var display = _g1[_g];
		++_g;
		if(display.isPrimary) {
			return display;
		}
	}
	return null;
};
kha_Display.get_all = function() {
	kha_Display.init();
	return kha_Display.displays;
};
kha_Display.prototype = {
	num: null
	,isPrimary: null
	,get_available: function() {
		return true;
	}
	,get_name: function() {
		return "Display";
	}
	,get_x: function() {
		return Krom.displayX(this.num);
	}
	,get_y: function() {
		return Krom.displayY(this.num);
	}
	,get_width: function() {
		return Krom.displayWidth(this.num);
	}
	,get_height: function() {
		return Krom.displayHeight(this.num);
	}
	,get_frequency: function() {
		return 60;
	}
	,get_pixelsPerInch: function() {
		return Krom.screenDpi();
	}
	,get_modes: function() {
		return [];
	}
	,__class__: kha_Display
	,__properties__: {get_modes:"get_modes",get_pixelsPerInch:"get_pixelsPerInch",get_frequency:"get_frequency",get_height:"get_height",get_width:"get_width",get_y:"get_y",get_x:"get_x",get_name:"get_name",get_available:"get_available"}
};
var kha_DisplayMode = function(width,height,frequency,bitsPerPixel) {
	this.width = width;
	this.height = height;
	this.frequency = frequency;
	this.bitsPerPixel = bitsPerPixel;
};
$hxClasses["kha.DisplayMode"] = kha_DisplayMode;
kha_DisplayMode.__name__ = true;
kha_DisplayMode.prototype = {
	width: null
	,height: null
	,frequency: null
	,bitsPerPixel: null
	,__class__: kha_DisplayMode
};
var kha_FontStyle = function(bold,italic,underlined) {
	this.bold = bold;
	this.italic = italic;
	this.underlined = underlined;
};
$hxClasses["kha.FontStyle"] = kha_FontStyle;
kha_FontStyle.__name__ = true;
kha_FontStyle.prototype = {
	bold: null
	,italic: null
	,underlined: null
	,getBold: function() {
		return this.bold;
	}
	,getItalic: function() {
		return this.italic;
	}
	,getUnderlined: function() {
		return this.underlined;
	}
	,__class__: kha_FontStyle
};
var kha_Framebuffer = function($window,g1,g2,g4) {
	this.window = $window;
	this.graphics1 = g1;
	this.graphics2 = g2;
	this.graphics4 = g4;
};
$hxClasses["kha.Framebuffer"] = kha_Framebuffer;
kha_Framebuffer.__name__ = true;
kha_Framebuffer.__interfaces__ = [kha_Canvas];
kha_Framebuffer.prototype = {
	window: null
	,graphics1: null
	,graphics2: null
	,graphics4: null
	,init: function(g1,g2,g4) {
		this.graphics1 = g1;
		this.graphics2 = g2;
		this.graphics4 = g4;
	}
	,get_g1: function() {
		return this.graphics1;
	}
	,get_g2: function() {
		return this.graphics2;
	}
	,get_g4: function() {
		return this.graphics4;
	}
	,width: null
	,get_width: function() {
		return kha_System.windowWidth(this.window);
	}
	,height: null
	,get_height: function() {
		return kha_System.windowHeight(this.window);
	}
	,__class__: kha_Framebuffer
	,__properties__: {get_height:"get_height",get_width:"get_width",get_g4:"get_g4",get_g2:"get_g2",get_g1:"get_g1"}
};
var kha_FramebufferOptions = function(frequency,verticalSync,colorBufferBits,depthBufferBits,stencilBufferBits,samplesPerPixel) {
	if(samplesPerPixel == null) {
		samplesPerPixel = 1;
	}
	if(stencilBufferBits == null) {
		stencilBufferBits = 8;
	}
	if(depthBufferBits == null) {
		depthBufferBits = 16;
	}
	if(colorBufferBits == null) {
		colorBufferBits = 32;
	}
	if(verticalSync == null) {
		verticalSync = true;
	}
	if(frequency == null) {
		frequency = 60;
	}
	this.samplesPerPixel = 1;
	this.stencilBufferBits = 8;
	this.depthBufferBits = 16;
	this.colorBufferBits = 32;
	this.verticalSync = true;
	this.frequency = 60;
	this.frequency = frequency;
	this.verticalSync = verticalSync;
	this.colorBufferBits = colorBufferBits;
	this.depthBufferBits = depthBufferBits;
	this.stencilBufferBits = stencilBufferBits;
	this.samplesPerPixel = samplesPerPixel;
};
$hxClasses["kha.FramebufferOptions"] = kha_FramebufferOptions;
kha_FramebufferOptions.__name__ = true;
kha_FramebufferOptions.prototype = {
	frequency: null
	,verticalSync: null
	,colorBufferBits: null
	,depthBufferBits: null
	,stencilBufferBits: null
	,samplesPerPixel: null
	,__class__: kha_FramebufferOptions
};
var kha_Resource = function() { };
$hxClasses["kha.Resource"] = kha_Resource;
kha_Resource.__name__ = true;
kha_Resource.__isInterface__ = true;
kha_Resource.prototype = {
	unload: null
	,__class__: kha_Resource
};
var kha_Image = function(texture) {
	this.pixels = null;
	this.texture_ = texture;
};
$hxClasses["kha.Image"] = kha_Image;
kha_Image.__name__ = true;
kha_Image.__interfaces__ = [kha_Resource,kha_Canvas];
kha_Image.__properties__ = {get_nonPow2Supported:"get_nonPow2Supported",get_maxSize:"get_maxSize"};
kha_Image.getRenderTargetFormat = function(format) {
	switch(format) {
	case 0:
		return 0;
	case 1:
		return 5;
	case 2:
		return 3;
	case 3:
		return 4;
	case 4:
		return 1;
	case 5:
		return 2;
	case 6:
		return 6;
	default:
		return 0;
	}
};
kha_Image.getDepthBufferBits = function(depthAndStencil) {
	switch(depthAndStencil) {
	case 0:
		return -1;
	case 1:
		return 24;
	case 2:
		return 24;
	case 3:
		return 24;
	case 4:
		return 32;
	case 5:
		return 16;
	}
};
kha_Image.getStencilBufferBits = function(depthAndStencil) {
	switch(depthAndStencil) {
	case 0:
		return -1;
	case 1:
		return -1;
	case 2:
		return 8;
	case 3:
		return 8;
	case 4:
		return 8;
	case 5:
		return 0;
	}
};
kha_Image.getTextureFormat = function(format) {
	switch(format) {
	case 0:
		return 0;
	case 2:
		return 3;
	case 4:
		return 4;
	case 5:
		return 5;
	case 6:
		return 7;
	default:
		return 1;
	}
};
kha_Image._fromTexture = function(texture) {
	return new kha_Image(texture);
};
kha_Image.fromBytes = function(bytes,width,height,format,usage) {
	if(format == null) {
		format = 0;
	}
	var readable = true;
	var image = new kha_Image(null);
	image.myFormat = format;
	image.texture_ = Krom.createTextureFromBytes(bytes.b.bufferValue,width,height,kha_Image.getTextureFormat(format),readable);
	return image;
};
kha_Image.fromBytes3D = function(bytes,width,height,depth,format,usage) {
	if(format == null) {
		format = 0;
	}
	var readable = true;
	var image = new kha_Image(null);
	image.myFormat = format;
	image.texture_ = Krom.createTextureFromBytes3D(bytes.b.bufferValue,width,height,depth,kha_Image.getTextureFormat(format),readable);
	return image;
};
kha_Image.fromEncodedBytes = function(bytes,format,doneCallback,errorCallback,readable) {
	if(readable == null) {
		readable = false;
	}
	var image = new kha_Image(null);
	image.texture_ = Krom.createTextureFromEncodedBytes(bytes.b.bufferValue,format,readable);
	doneCallback(image);
};
kha_Image.create = function(width,height,format,usage) {
	if(format == null) {
		format = 0;
	}
	var image = new kha_Image(null);
	image.myFormat = format;
	image.texture_ = Krom.createTexture(width,height,kha_Image.getTextureFormat(format));
	return image;
};
kha_Image.create3D = function(width,height,depth,format,usage) {
	if(format == null) {
		format = 0;
	}
	var image = new kha_Image(null);
	image.myFormat = format;
	image.texture_ = Krom.createTexture3D(width,height,depth,kha_Image.getTextureFormat(format));
	return image;
};
kha_Image.createRenderTarget = function(width,height,format,depthStencil,antiAliasingSamples,contextId) {
	if(contextId == null) {
		contextId = 0;
	}
	if(antiAliasingSamples == null) {
		antiAliasingSamples = 1;
	}
	if(depthStencil == null) {
		depthStencil = 0;
	}
	if(format == null) {
		format = 0;
	}
	var image = new kha_Image(null);
	image.myFormat = format;
	image.renderTarget_ = Krom.createRenderTarget(width,height,kha_Image.getDepthBufferBits(depthStencil),kha_Image.getRenderTargetFormat(format),kha_Image.getStencilBufferBits(depthStencil),contextId);
	return image;
};
kha_Image.get_maxSize = function() {
	return 4096;
};
kha_Image.get_nonPow2Supported = function() {
	return true;
};
kha_Image.renderTargetsInvertedY = function() {
	return Krom.renderTargetsInvertedY();
};
kha_Image.formatByteSize = function(format) {
	switch(format) {
	case 0:
		return 4;
	case 1:
		return 1;
	case 2:
		return 16;
	case 3:
		return 2;
	case 4:
		return 8;
	case 5:
		return 4;
	case 6:
		return 2;
	default:
		return 4;
	}
};
kha_Image.prototype = {
	texture_: null
	,renderTarget_: null
	,myFormat: null
	,readable: null
	,graphics1: null
	,graphics2: null
	,graphics4: null
	,isOpaque: function(x,y) {
		return false;
	}
	,at: function(x,y) {
		return -16777216;
	}
	,unload: function() {
		Krom.unloadImage(this);
		this.texture_ = null;
		this.renderTarget_ = null;
	}
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		return haxe_io_Bytes.ofData(Krom.lockTexture(this.texture_,level));
	}
	,unlock: function() {
		Krom.unlockTexture(this.texture_);
	}
	,pixels: null
	,getPixels: function() {
		if(this.renderTarget_ != null) {
			if(this.pixels == null) {
				this.pixels = new haxe_io_Bytes(new ArrayBuffer(kha_Image.formatByteSize(this.myFormat) * this.get_width() * this.get_height()));
			}
			Krom.getRenderTargetPixels(this.renderTarget_,this.pixels.b.bufferValue);
			return this.pixels;
		} else {
			return haxe_io_Bytes.ofData(Krom.getTexturePixels(this.texture_));
		}
	}
	,generateMipmaps: function(levels) {
		if(this.texture_ == null) {
			Krom.generateRenderTargetMipmaps(this.renderTarget_,levels);
		} else {
			Krom.generateTextureMipmaps(this.texture_,levels);
		}
	}
	,setMipmaps: function(mipmaps) {
		Krom.setMipmaps(this.texture_,mipmaps);
	}
	,setDepthStencilFrom: function(image) {
		Krom.setDepthStencilFrom(this.renderTarget_,image.renderTarget_);
	}
	,clear: function(x,y,z,width,height,depth,color) {
		Krom.clearTexture(this.texture_,x,y,z,width,height,depth,color);
	}
	,get_width: function() {
		if(this.texture_ == null) {
			return this.renderTarget_.width;
		} else {
			return this.texture_.width;
		}
	}
	,get_height: function() {
		if(this.texture_ == null) {
			return this.renderTarget_.height;
		} else {
			return this.texture_.height;
		}
	}
	,get_depth: function() {
		if(this.texture_ != null) {
			return this.texture_.depth;
		} else {
			return 1;
		}
	}
	,get_format: function() {
		return this.myFormat;
	}
	,get_realWidth: function() {
		if(this.texture_ == null) {
			return this.renderTarget_.width;
		} else {
			return this.texture_.realWidth;
		}
	}
	,get_realHeight: function() {
		if(this.texture_ == null) {
			return this.renderTarget_.height;
		} else {
			return this.texture_.realHeight;
		}
	}
	,get_stride: function() {
		return this.texture_.stride;
	}
	,get_g1: function() {
		if(this.graphics1 == null) {
			this.graphics1 = new kha_graphics2_Graphics1(this);
		}
		return this.graphics1;
	}
	,get_g2: function() {
		if(this.graphics2 == null) {
			this.graphics2 = new kha_graphics4_Graphics2(this);
		}
		return this.graphics2;
	}
	,get_g4: function() {
		if(this.graphics4 == null) {
			this.graphics4 = new kha_krom_Graphics(this);
		}
		return this.graphics4;
	}
	,__class__: kha_Image
	,__properties__: {get_g4:"get_g4",get_g2:"get_g2",get_g1:"get_g1",get_stride:"get_stride",get_realHeight:"get_realHeight",get_realWidth:"get_realWidth",get_format:"get_format",get_depth:"get_depth",get_height:"get_height",get_width:"get_width"}
};
var kha_AlignedQuad = function() {
};
$hxClasses["kha.AlignedQuad"] = kha_AlignedQuad;
kha_AlignedQuad.__name__ = true;
kha_AlignedQuad.prototype = {
	x0: null
	,y0: null
	,s0: null
	,t0: null
	,x1: null
	,y1: null
	,s1: null
	,t1: null
	,xadvance: null
	,__class__: kha_AlignedQuad
};
var kha_KravurImage = function(size,ascent,descent,lineGap,width,height,chars,pixels) {
	this.mySize = size;
	this.width = width;
	this.height = height;
	this.chars = chars;
	this.baseline = ascent;
	var _g = 0;
	while(_g < chars.length) {
		var char = chars[_g];
		++_g;
		char.yoff += this.baseline;
	}
	this.texture = kha_Image.create(width,height,1);
	var bytes = this.texture.lock();
	var pos = 0;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			var v = pixels.readU8(pos);
			bytes.b[pos] = v;
			++pos;
		}
	}
	this.texture.unlock();
};
$hxClasses["kha.KravurImage"] = kha_KravurImage;
kha_KravurImage.__name__ = true;
kha_KravurImage.prototype = {
	mySize: null
	,chars: null
	,texture: null
	,width: null
	,height: null
	,baseline: null
	,getTexture: function() {
		return this.texture;
	}
	,getBakedQuad: function(q,char_index,xpos,ypos) {
		if(char_index >= this.chars.length) {
			return null;
		}
		var ipw = 1.0 / this.width;
		var iph = 1.0 / this.height;
		var b = this.chars[char_index];
		if(b == null) {
			return null;
		}
		var round_x = Math.round(xpos + b.xoff);
		var round_y = Math.round(ypos + b.yoff);
		q.x0 = round_x;
		q.y0 = round_y;
		q.x1 = round_x + b.x1 - b.x0;
		q.y1 = round_y + b.y1 - b.y0;
		q.s0 = b.x0 * ipw;
		q.t0 = b.y0 * iph;
		q.s1 = b.x1 * ipw;
		q.t1 = b.y1 * iph;
		q.xadvance = b.xadvance;
		return q;
	}
	,getCharWidth: function(charIndex) {
		if(this.chars.length == 0) {
			return 0;
		}
		var offset = kha_KravurImage.charBlocks[0];
		if(charIndex < offset) {
			return this.chars[0].xadvance;
		}
		var _g = 1;
		var _g1 = kha_KravurImage.charBlocks.length / 2 | 0;
		while(_g < _g1) {
			var i = _g++;
			var prevEnd = kha_KravurImage.charBlocks[i * 2 - 1];
			var start = kha_KravurImage.charBlocks[i * 2];
			if(charIndex > start - 1) {
				offset += start - 1 - prevEnd;
			}
		}
		if(charIndex - offset >= this.chars.length) {
			return this.chars[0].xadvance;
		}
		return this.chars[charIndex - offset].xadvance;
	}
	,getHeight: function() {
		return this.mySize;
	}
	,stringWidth: function(str) {
		var width = 0;
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) {
			var c = _g++;
			width += this.getCharWidth(HxOverrides.cca(str,c));
		}
		return width;
	}
	,charactersWidth: function(characters,start,length) {
		var width = 0;
		var _g = start;
		var _g1 = start + length;
		while(_g < _g1) {
			var i = _g++;
			width += this.getCharWidth(characters[i]);
		}
		return width;
	}
	,getBaselinePosition: function() {
		return this.baseline;
	}
	,__class__: kha_KravurImage
};
var kha_Kravur = function(blob,fontIndex) {
	if(fontIndex == null) {
		fontIndex = 0;
	}
	this.images = new haxe_ds_IntMap();
	this.blob = blob;
	this.fontIndex = fontIndex;
};
$hxClasses["kha.Kravur"] = kha_Kravur;
kha_Kravur.__name__ = true;
kha_Kravur.__interfaces__ = [kha_Resource];
kha_Kravur.fromBytes = function(bytes,fontIndex) {
	if(fontIndex == null) {
		fontIndex = 0;
	}
	return new kha_Kravur(kha_internal_BytesBlob.fromBytes(bytes),fontIndex);
};
kha_Kravur.prototype = {
	oldGlyphs: null
	,blob: null
	,images: null
	,fontIndex: null
	,_get: function(fontSize) {
		var glyphs = kha_graphics2_Graphics.fontGlyphs;
		if(glyphs != this.oldGlyphs) {
			this.oldGlyphs = glyphs;
			kha_KravurImage.charBlocks = [glyphs[0]];
			var nextChar = kha_KravurImage.charBlocks[0] + 1;
			var _g = 1;
			var _g1 = glyphs.length;
			while(_g < _g1) {
				var i = _g++;
				if(glyphs[i] != nextChar) {
					kha_KravurImage.charBlocks.push(glyphs[i - 1]);
					kha_KravurImage.charBlocks.push(glyphs[i]);
					nextChar = glyphs[i] + 1;
				} else {
					++nextChar;
				}
			}
			kha_KravurImage.charBlocks.push(glyphs[glyphs.length - 1]);
		}
		var imageIndex = this.fontIndex * 10000000 + fontSize * 10000 + glyphs.length;
		if(!this.images.h.hasOwnProperty(imageIndex)) {
			var width = 64;
			var height = 32;
			var this1 = new Array(glyphs.length);
			var baked = this1;
			var _g = 0;
			var _g1 = baked.length;
			while(_g < _g1) {
				var i = _g++;
				baked[i] = new kha_graphics2_truetype_Stbtt_$bakedchar();
			}
			var pixels = null;
			var offset = kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex(this.blob,this.fontIndex);
			if(offset == -1) {
				offset = kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex(this.blob,0);
			}
			var status = -1;
			while(status <= 0) {
				if(height < width) {
					height *= 2;
				} else {
					width *= 2;
				}
				pixels = kha_internal_BytesBlob.alloc(width * height);
				status = kha_graphics2_truetype_StbTruetype.stbtt_BakeFontBitmap(this.blob,offset,fontSize,pixels,width,height,glyphs,baked);
			}
			var info = new kha_graphics2_truetype_Stbtt_$fontinfo();
			kha_graphics2_truetype_StbTruetype.stbtt_InitFont(info,this.blob,offset);
			var metrics = kha_graphics2_truetype_StbTruetype.stbtt_GetFontVMetrics(info);
			var scale = kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight(info,fontSize);
			var ascent = Math.round(metrics.ascent * scale);
			var descent = Math.round(metrics.descent * scale);
			var lineGap = Math.round(metrics.lineGap * scale);
			var image = new kha_KravurImage(fontSize | 0,ascent,descent,lineGap,width,height,baked,pixels);
			this.images.h[imageIndex] = image;
			return image;
		}
		return this.images.h[imageIndex];
	}
	,height: function(fontSize) {
		return this._get(fontSize).getHeight();
	}
	,width: function(fontSize,str) {
		return this._get(fontSize).stringWidth(str);
	}
	,widthOfCharacters: function(fontSize,characters,start,length) {
		return this._get(fontSize).charactersWidth(characters,start,length);
	}
	,baseline: function(fontSize) {
		return this._get(fontSize).getBaselinePosition();
	}
	,setFontIndex: function(fontIndex) {
		this.fontIndex = fontIndex;
	}
	,unload: function() {
		this.blob = null;
		this.images = null;
	}
	,__class__: kha_Kravur
};
var kha_LoaderImpl = function() { };
$hxClasses["kha.LoaderImpl"] = kha_LoaderImpl;
kha_LoaderImpl.__name__ = true;
kha_LoaderImpl.getImageFormats = function() {
	return ["png","jpg"];
};
kha_LoaderImpl.loadImageFromDescription = function(desc,done,failed) {
	var readable = Object.prototype.hasOwnProperty.call(desc,"readable") && desc.readable;
	done(kha_Image._fromTexture(Krom.loadImage(desc.files[0],readable)));
};
kha_LoaderImpl.getSoundFormats = function() {
	return ["wav","ogg"];
};
kha_LoaderImpl.loadSoundFromDescription = function(desc,done,failed) {
	done(new kha_krom_Sound(haxe_io_Bytes.ofData(Krom.loadSound(desc.files[0]))));
};
kha_LoaderImpl.getVideoFormats = function() {
	return ["webm"];
};
kha_LoaderImpl.loadVideoFromDescription = function(desc,done,failed) {
};
kha_LoaderImpl.loadBlobFromDescription = function(desc,done,failed) {
	done(new kha_internal_BytesBlob(haxe_io_Bytes.ofData(Krom.loadBlob(desc.files[0]))));
};
kha_LoaderImpl.loadFontFromDescription = function(desc,done,failed) {
	kha_LoaderImpl.loadBlobFromDescription(desc,function(blob) {
		done(new kha_Kravur(blob));
	},failed);
};
var kha_TimeTask = function() {
};
$hxClasses["kha.TimeTask"] = kha_TimeTask;
kha_TimeTask.__name__ = true;
kha_TimeTask.prototype = {
	task: null
	,start: null
	,period: null
	,duration: null
	,next: null
	,id: null
	,groupId: null
	,active: null
	,paused: null
	,__class__: kha_TimeTask
};
var kha_FrameTask = function(task,priority,id) {
	this.task = task;
	this.priority = priority;
	this.id = id;
	this.active = true;
	this.paused = false;
};
$hxClasses["kha.FrameTask"] = kha_FrameTask;
kha_FrameTask.__name__ = true;
kha_FrameTask.prototype = {
	task: null
	,priority: null
	,id: null
	,active: null
	,paused: null
	,__class__: kha_FrameTask
};
var kha_Scheduler = function() { };
$hxClasses["kha.Scheduler"] = kha_Scheduler;
kha_Scheduler.__name__ = true;
kha_Scheduler.init = function() {
	kha_Scheduler.deltas = [];
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) {
		var i = _g++;
		kha_Scheduler.deltas[i] = 0;
	}
	kha_Scheduler.stopped = true;
	kha_Scheduler.frame_tasks_sorted = true;
	kha_Scheduler.current = kha_Scheduler.lastTime = kha_Scheduler.lastFrameEnd = kha_Scheduler.realTime();
	kha_Scheduler.currentFrameTaskId = 0;
	kha_Scheduler.currentTimeTaskId = 0;
	kha_Scheduler.currentGroupId = 0;
	kha_Scheduler.timeTasks = [];
	kha_Scheduler.pausedTimeTasks = [];
	kha_Scheduler.outdatedTimeTasks = [];
	kha_Scheduler.timeTasksScratchpad = [];
	kha_Scheduler.frameTasks = [];
	kha_Scheduler.toDeleteFrame = [];
};
kha_Scheduler.start = function(restartTimers) {
	if(restartTimers == null) {
		restartTimers = false;
	}
	kha_Scheduler.vsync = kha_Window.get(0).get_vSynced();
	var hz = kha_Display.get_primary().get_frequency();
	if(hz >= 57 && hz <= 63) {
		hz = 60;
	}
	kha_Scheduler.onedifhz = 1.0 / hz;
	kha_Scheduler.stopped = false;
	kha_Scheduler.resetTime();
	kha_Scheduler.lastTime = kha_Scheduler.realTime() - kha_Scheduler.startTime;
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) {
		var i = _g++;
		kha_Scheduler.deltas[i] = 0;
	}
	if(restartTimers) {
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasks;
		while(_g < _g1.length) {
			var timeTask = _g1[_g];
			++_g;
			timeTask.paused = false;
		}
		var _g = 0;
		var _g1 = kha_Scheduler.frameTasks;
		while(_g < _g1.length) {
			var frameTask = _g1[_g];
			++_g;
			frameTask.paused = false;
		}
	}
};
kha_Scheduler.stop = function() {
	kha_Scheduler.stopped = true;
};
kha_Scheduler.isStopped = function() {
	return kha_Scheduler.stopped;
};
kha_Scheduler.warpTimeTasksBack = function(time,tasks) {
	var _g = 0;
	while(_g < tasks.length) {
		var timeTask = tasks[_g];
		++_g;
		if(timeTask.start >= time) {
			timeTask.next = timeTask.start;
		} else if(timeTask.period > 0) {
			var sinceStart = time - timeTask.start;
			var times = Math.ceil(sinceStart / timeTask.period);
			timeTask.next = timeTask.start + times * timeTask.period;
		}
	}
};
kha_Scheduler.warp = function(time) {
	if(time < kha_Scheduler.lastTime) {
		kha_Scheduler.current = time;
		kha_Scheduler.lastTime = time;
		kha_Scheduler.lastFrameEnd = time;
		kha_Scheduler.warpTimeTasksBack(time,kha_Scheduler.outdatedTimeTasks);
		kha_Scheduler.warpTimeTasksBack(time,kha_Scheduler.timeTasks);
		var _g = 0;
		var _g1 = kha_Scheduler.outdatedTimeTasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			if(task.next >= time) {
				kha_Scheduler.timeTasksScratchpad.push(task);
			}
		}
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasksScratchpad;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			HxOverrides.remove(kha_Scheduler.outdatedTimeTasks,task);
		}
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasksScratchpad;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,task);
		}
		while(kha_Scheduler.timeTasksScratchpad.length > 0) HxOverrides.remove(kha_Scheduler.timeTasksScratchpad,kha_Scheduler.timeTasksScratchpad[0]);
	} else if(time > kha_Scheduler.lastTime) {
		kha_Scheduler.startTime -= time - kha_Scheduler.lastTime;
		kha_Scheduler.current = time;
		kha_Scheduler.lastTime = time;
		kha_Scheduler.lastFrameEnd = time;
		kha_Scheduler.executeTimeTasks(time);
	}
};
kha_Scheduler.executeFrame = function() {
	var real = kha_Scheduler.realTime();
	var now = real - kha_Scheduler.startTime;
	var delta = now - kha_Scheduler.lastTime;
	var frameEnd = kha_Scheduler.lastFrameEnd;
	if(delta >= 0) {
		if(kha_netsync_Session.the() == null) {
			if(delta > kha_Scheduler.maxframetime) {
				kha_Scheduler.startTime += delta - kha_Scheduler.maxframetime;
				now = real - kha_Scheduler.startTime;
				delta = kha_Scheduler.maxframetime;
				frameEnd += delta;
			} else if(kha_Scheduler.vsync) {
				var frames = Math.round(delta / kha_Scheduler.onedifhz);
				if(frames < 1) {
					return;
				}
				var realdif = frames * kha_Scheduler.onedifhz;
				delta = realdif;
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT - 2;
				while(_g < _g1) {
					var i = _g++;
					delta += kha_Scheduler.deltas[i];
					kha_Scheduler.deltas[i] = kha_Scheduler.deltas[i + 1];
				}
				delta += kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 2];
				delta /= kha_Scheduler.DIF_COUNT;
				kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 2] = realdif;
				frameEnd += delta;
			} else {
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT - 1;
				while(_g < _g1) {
					var i = _g++;
					kha_Scheduler.deltas[i] = kha_Scheduler.deltas[i + 1];
				}
				kha_Scheduler.deltas[kha_Scheduler.DIF_COUNT - 1] = delta;
				var next = 0;
				var _g = 0;
				var _g1 = kha_Scheduler.DIF_COUNT;
				while(_g < _g1) {
					var i = _g++;
					next += kha_Scheduler.deltas[i];
				}
				next /= kha_Scheduler.DIF_COUNT;
				frameEnd += next;
			}
		} else {
			frameEnd += delta;
		}
		kha_Scheduler.lastTime = now;
		if(!kha_Scheduler.stopped) {
			kha_Scheduler.lastFrameEnd = frameEnd;
		}
		var _g = 0;
		var _g1 = kha_Scheduler.pausedTimeTasks;
		while(_g < _g1.length) {
			var pausedTask = _g1[_g];
			++_g;
			pausedTask.next += delta;
		}
		if(kha_Scheduler.stopped) {
			var _g = 0;
			var _g1 = kha_Scheduler.timeTasks;
			while(_g < _g1.length) {
				var timeTask = _g1[_g];
				++_g;
				timeTask.next += delta;
			}
		}
		kha_Scheduler.executeTimeTasks(frameEnd);
		var _g = 0;
		var _g1 = kha_Scheduler.outdatedTimeTasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			if(task.next < frameEnd - 10.0) {
				kha_Scheduler.timeTasksScratchpad.push(task);
			}
		}
		var _g = 0;
		var _g1 = kha_Scheduler.timeTasksScratchpad;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			HxOverrides.remove(kha_Scheduler.outdatedTimeTasks,task);
		}
		while(kha_Scheduler.timeTasksScratchpad.length > 0) HxOverrides.remove(kha_Scheduler.timeTasksScratchpad,kha_Scheduler.timeTasksScratchpad[0]);
	}
	kha_Scheduler.current = frameEnd;
	kha_Scheduler.sortFrameTasks();
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(!kha_Scheduler.stopped && !frameTask.paused && frameTask.active) {
			if(!frameTask.task()) {
				frameTask.active = false;
			}
		}
	}
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(!frameTask.active) {
			kha_Scheduler.toDeleteFrame.push(frameTask);
		}
	}
	while(kha_Scheduler.toDeleteFrame.length > 0) HxOverrides.remove(kha_Scheduler.frameTasks,kha_Scheduler.toDeleteFrame.pop());
};
kha_Scheduler.executeTimeTasks = function(until) {
	while(kha_Scheduler.timeTasks.length > 0) {
		kha_Scheduler.activeTimeTask = kha_Scheduler.timeTasks[0];
		if(kha_Scheduler.activeTimeTask.next <= until) {
			kha_Scheduler.current = kha_Scheduler.activeTimeTask.next;
			kha_Scheduler.activeTimeTask.next += kha_Scheduler.activeTimeTask.period;
			HxOverrides.remove(kha_Scheduler.timeTasks,kha_Scheduler.activeTimeTask);
			if(kha_Scheduler.activeTimeTask.active && kha_Scheduler.activeTimeTask.task()) {
				if(kha_Scheduler.activeTimeTask.period > 0 && (kha_Scheduler.activeTimeTask.duration == 0 || kha_Scheduler.activeTimeTask.duration >= kha_Scheduler.activeTimeTask.start + kha_Scheduler.activeTimeTask.next)) {
					kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,kha_Scheduler.activeTimeTask);
				} else {
					kha_Scheduler.archiveTimeTask(kha_Scheduler.activeTimeTask,until);
				}
			} else {
				kha_Scheduler.activeTimeTask.active = false;
				kha_Scheduler.archiveTimeTask(kha_Scheduler.activeTimeTask,until);
			}
		} else {
			break;
		}
	}
	kha_Scheduler.activeTimeTask = null;
};
kha_Scheduler.archiveTimeTask = function(timeTask,frameEnd) {
};
kha_Scheduler.time = function() {
	return kha_Scheduler.current;
};
kha_Scheduler.realTime = function() {
	return kha_System.get_time();
};
kha_Scheduler.resetTime = function() {
	var now = kha_System.get_time();
	var dif = now - kha_Scheduler.startTime;
	kha_Scheduler.startTime = now;
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		timeTask.start -= dif;
		timeTask.next -= dif;
	}
	var _g = 0;
	var _g1 = kha_Scheduler.DIF_COUNT;
	while(_g < _g1) {
		var i = _g++;
		kha_Scheduler.deltas[i] = 0;
	}
	kha_Scheduler.current = 0;
	kha_Scheduler.lastTime = 0;
	kha_Scheduler.lastFrameEnd = 0;
};
kha_Scheduler.addBreakableFrameTask = function(task,priority) {
	kha_Scheduler.frameTasks.push(new kha_FrameTask(task,priority,++kha_Scheduler.currentFrameTaskId));
	kha_Scheduler.frame_tasks_sorted = false;
	return kha_Scheduler.currentFrameTaskId;
};
kha_Scheduler.addFrameTask = function(task,priority) {
	return kha_Scheduler.addBreakableFrameTask(function() {
		task();
		return true;
	},priority);
};
kha_Scheduler.pauseFrameTask = function(id,paused) {
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(frameTask.id == id) {
			frameTask.paused = paused;
			break;
		}
	}
};
kha_Scheduler.removeFrameTask = function(id) {
	var _g = 0;
	var _g1 = kha_Scheduler.frameTasks;
	while(_g < _g1.length) {
		var frameTask = _g1[_g];
		++_g;
		if(frameTask.id == id) {
			frameTask.active = false;
			break;
		}
	}
};
kha_Scheduler.generateGroupId = function() {
	return ++kha_Scheduler.currentGroupId;
};
kha_Scheduler.addBreakableTimeTaskToGroup = function(groupId,task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	var t = new kha_TimeTask();
	t.active = true;
	t.task = task;
	t.id = ++kha_Scheduler.currentTimeTaskId;
	t.groupId = groupId;
	t.start = kha_Scheduler.current + start;
	t.period = 0;
	if(period != 0) {
		t.period = period;
	}
	t.duration = 0;
	if(duration != 0) {
		t.duration = t.start + duration;
	}
	t.next = t.start;
	kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,t);
	return t.id;
};
kha_Scheduler.addTimeTaskToGroup = function(groupId,task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	return kha_Scheduler.addBreakableTimeTaskToGroup(groupId,function() {
		task();
		return true;
	},start,period,duration);
};
kha_Scheduler.addBreakableTimeTask = function(task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	return kha_Scheduler.addBreakableTimeTaskToGroup(0,task,start,period,duration);
};
kha_Scheduler.addTimeTask = function(task,start,period,duration) {
	if(duration == null) {
		duration = 0;
	}
	if(period == null) {
		period = 0;
	}
	return kha_Scheduler.addTimeTaskToGroup(0,task,start,period,duration);
};
kha_Scheduler.getTimeTask = function(id) {
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.id == id) {
		return kha_Scheduler.activeTimeTask;
	}
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.id == id) {
			return timeTask;
		}
	}
	var _g = 0;
	var _g1 = kha_Scheduler.pausedTimeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.id == id) {
			return timeTask;
		}
	}
	return null;
};
kha_Scheduler.pauseTimeTask = function(id,paused) {
	var timeTask = kha_Scheduler.getTimeTask(id);
	if(timeTask != null) {
		kha_Scheduler.pauseRunningTimeTask(timeTask,paused);
	}
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.id == id) {
		kha_Scheduler.activeTimeTask.paused = paused;
	}
};
kha_Scheduler.pauseRunningTimeTask = function(timeTask,paused) {
	timeTask.paused = paused;
	if(paused) {
		HxOverrides.remove(kha_Scheduler.timeTasks,timeTask);
		kha_Scheduler.pausedTimeTasks.push(timeTask);
	} else {
		kha_Scheduler.insertSorted(kha_Scheduler.timeTasks,timeTask);
		HxOverrides.remove(kha_Scheduler.pausedTimeTasks,timeTask);
	}
};
kha_Scheduler.pauseTimeTasks = function(groupId,paused) {
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.groupId == groupId) {
			kha_Scheduler.pauseRunningTimeTask(timeTask,paused);
		}
	}
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.groupId == groupId) {
		kha_Scheduler.activeTimeTask.paused = paused;
	}
};
kha_Scheduler.removeTimeTask = function(id) {
	var timeTask = kha_Scheduler.getTimeTask(id);
	if(timeTask != null) {
		timeTask.active = false;
		HxOverrides.remove(kha_Scheduler.timeTasks,timeTask);
	}
};
kha_Scheduler.removeTimeTasks = function(groupId) {
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasks;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		if(timeTask.groupId == groupId) {
			timeTask.active = false;
			kha_Scheduler.timeTasksScratchpad.push(timeTask);
		}
	}
	var _g = 0;
	var _g1 = kha_Scheduler.timeTasksScratchpad;
	while(_g < _g1.length) {
		var timeTask = _g1[_g];
		++_g;
		HxOverrides.remove(kha_Scheduler.timeTasks,timeTask);
	}
	while(kha_Scheduler.timeTasksScratchpad.length > 0) HxOverrides.remove(kha_Scheduler.timeTasksScratchpad,kha_Scheduler.timeTasksScratchpad[0]);
	if(kha_Scheduler.activeTimeTask != null && kha_Scheduler.activeTimeTask.groupId == groupId) {
		kha_Scheduler.activeTimeTask.active = false;
	}
};
kha_Scheduler.numTasksInSchedule = function() {
	return kha_Scheduler.timeTasks.length + kha_Scheduler.frameTasks.length;
};
kha_Scheduler.insertSorted = function(list,task) {
	var _g = 0;
	var _g1 = list.length;
	while(_g < _g1) {
		var i = _g++;
		if(list[i].next > task.next) {
			list.splice(i,0,task);
			return;
		}
	}
	list.push(task);
};
kha_Scheduler.sortFrameTasks = function() {
	if(kha_Scheduler.frame_tasks_sorted) {
		return;
	}
	kha_Scheduler.frameTasks.sort(function(a,b) {
		if(a.priority > b.priority) {
			return 1;
		} else if(a.priority < b.priority) {
			return -1;
		} else {
			return 0;
		}
	});
	kha_Scheduler.frame_tasks_sorted = true;
};
var kha_Shaders = function() { };
$hxClasses["kha.Shaders"] = kha_Shaders;
kha_Shaders.__name__ = true;
kha_Shaders.init = function() {
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_colored_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_colored_frag = new kha_graphics4_FragmentShader(blobs,["painter-colored.frag.glsl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_colored_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_colored_vert = new kha_graphics4_VertexShader(blobs,["painter-colored.vert.glsl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_image_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_image_frag = new kha_graphics4_FragmentShader(blobs,["painter-image.frag.glsl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_image_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_image_vert = new kha_graphics4_VertexShader(blobs,["painter-image.vert.glsl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_text_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_text_frag = new kha_graphics4_FragmentShader(blobs,["painter-text.frag.glsl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_text_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_text_vert = new kha_graphics4_VertexShader(blobs,["painter-text.vert.glsl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_video_fragData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_video_frag = new kha_graphics4_FragmentShader(blobs,["painter-video.frag.glsl"]);
	var blobs = [];
	var data = Reflect.field(kha_Shaders,"painter_video_vertData" + 0);
	var bytes = haxe_Unserializer.run(data);
	blobs.push(kha_internal_BytesBlob.fromBytes(bytes));
	kha_Shaders.painter_video_vert = new kha_graphics4_VertexShader(blobs,["painter-video.vert.glsl"]);
};
var kha_Sound = function() {
	this.sampleRate = 0;
	this.channels = 0;
	this.length = 0;
};
$hxClasses["kha.Sound"] = kha_Sound;
kha_Sound.__name__ = true;
kha_Sound.__interfaces__ = [kha_Resource];
kha_Sound.prototype = {
	compressedData: null
	,uncompressedData: null
	,length: null
	,channels: null
	,sampleRate: null
	,uncompress: function(done) {
		if(this.uncompressedData != null) {
			done();
			return;
		}
		var output = new haxe_io_BytesOutput();
		var header = kha_audio2_ogg_vorbis_Reader.readAll(this.compressedData,output,true);
		var soundBytes = output.getBytes();
		var count = soundBytes.length / 4 | 0;
		if(header.channel == 1) {
			this.length = count / kha_audio2_Audio.samplesPerSecond;
			var this1 = new Float32Array(count * 2);
			this.uncompressedData = this1;
			var _g = 0;
			var _g1 = count;
			while(_g < _g1) {
				var i = _g++;
				this.uncompressedData[i * 2] = soundBytes.getFloat(i * 4);
				this.uncompressedData[i * 2 + 1] = soundBytes.getFloat(i * 4);
			}
		} else {
			this.length = count / 2 / kha_audio2_Audio.samplesPerSecond;
			var this1 = new Float32Array(count);
			this.uncompressedData = this1;
			var _g = 0;
			var _g1 = count;
			while(_g < _g1) {
				var i = _g++;
				this.uncompressedData[i] = soundBytes.getFloat(i * 4);
			}
		}
		this.channels = header.channel;
		this.sampleRate = header.sampleRate;
		this.compressedData = null;
		done();
	}
	,unload: function() {
		this.compressedData = null;
		this.uncompressedData = null;
	}
	,__class__: kha_Sound
};
var kha_SystemOptions = function(title,width,height,$window,framebuffer) {
	if(height == null) {
		height = -1;
	}
	if(width == null) {
		width = -1;
	}
	if(title == null) {
		title = "Kha";
	}
	this.framebuffer = null;
	this.window = null;
	this.height = -1;
	this.width = -1;
	this.title = "Kha";
	this.title = title;
	this.window = $window == null ? new kha_WindowOptions(null,-1,-1,800,600,-1,true,null,0) : $window;
	if(width > 0) {
		this.window.width = width;
		this.width = width;
	} else {
		this.width = this.window.width;
	}
	if(height > 0) {
		this.window.height = height;
		this.height = height;
	} else {
		this.height = this.window.height;
	}
	if(this.window.title == null) {
		this.window.title = title;
	}
	this.framebuffer = framebuffer == null ? new kha_FramebufferOptions(60,true,32,16,8,1) : framebuffer;
};
$hxClasses["kha.SystemOptions"] = kha_SystemOptions;
kha_SystemOptions.__name__ = true;
kha_SystemOptions.prototype = {
	title: null
	,width: null
	,height: null
	,window: null
	,framebuffer: null
	,__class__: kha_SystemOptions
};
var kha_System = function() { };
$hxClasses["kha.System"] = kha_System;
kha_System.__name__ = true;
kha_System.__properties__ = {get_refreshRate:"get_refreshRate",get_vsync:"get_vsync",get_language:"get_language",get_systemId:"get_systemId",get_screenRotation:"get_screenRotation",get_time:"get_time",get_title:"get_title"};
kha_System.init = function(options,callback) {
	var features = 0;
	if(options.resizable) {
		features |= 1;
	}
	if(options.maximizable) {
		features |= 4;
	}
	if(options.minimizable) {
		features |= 2;
	}
	var newOptions = new kha_SystemOptions(options.title,options.width,options.height,new kha_WindowOptions(null,-1,-1,800,600,-1,true,features,options.windowMode),new kha_FramebufferOptions(60,options.vSync,32,16,8,options.samplesPerPixel));
	kha_System.start(newOptions,function(_) {
		callback();
	});
};
kha_System.start = function(options,callback) {
	kha_System.theTitle = options.title;
	kha_SystemImpl.init(options,callback);
};
kha_System.get_title = function() {
	return kha_System.theTitle;
};
kha_System.notifyOnRender = function(listener,id) {
	if(id == null) {
		id = 0;
	}
	kha_System.renderListeners.push(function(framebuffers) {
		if(id < framebuffers.length) {
			listener(framebuffers[id]);
		}
	});
};
kha_System.notifyOnFrames = function(listener) {
	kha_System.renderListeners.push(listener);
};
kha_System.removeFramesListener = function(listener) {
	HxOverrides.remove(kha_System.renderListeners,listener);
};
kha_System.notifyOnApplicationState = function(foregroundListener,resumeListener,pauseListener,backgroundListener,shutdownListener) {
	if(foregroundListener != null) {
		kha_System.foregroundListeners.push(foregroundListener);
	}
	if(resumeListener != null) {
		kha_System.resumeListeners.push(resumeListener);
	}
	if(pauseListener != null) {
		kha_System.pauseListeners.push(pauseListener);
	}
	if(backgroundListener != null) {
		kha_System.backgroundListeners.push(backgroundListener);
	}
	if(shutdownListener != null) {
		kha_System.shutdownListeners.push(shutdownListener);
	}
};
kha_System.removeApplicationStateListeners = function(foregroundListener,resumeListener,pauseListener,backgroundListener,shutdownListener) {
	if(foregroundListener != null) {
		HxOverrides.remove(kha_System.foregroundListeners,foregroundListener);
	}
	if(resumeListener != null) {
		HxOverrides.remove(kha_System.resumeListeners,resumeListener);
	}
	if(pauseListener != null) {
		HxOverrides.remove(kha_System.pauseListeners,pauseListener);
	}
	if(backgroundListener != null) {
		HxOverrides.remove(kha_System.backgroundListeners,backgroundListener);
	}
	if(shutdownListener != null) {
		HxOverrides.remove(kha_System.shutdownListeners,shutdownListener);
	}
};
kha_System.notifyOnDropFiles = function(dropFilesListener) {
	kha_System.dropFilesListeners.push(dropFilesListener);
};
kha_System.removeDropListener = function(listener) {
	HxOverrides.remove(kha_System.dropFilesListeners,listener);
};
kha_System.notifyOnCutCopyPaste = function(cutListener,copyListener,pasteListener) {
	kha_System.cutListener = cutListener;
	kha_System.copyListener = copyListener;
	kha_System.pasteListener = pasteListener;
};
kha_System.notifyOnLoginLogout = function(loginListener,logoutListener) {
	kha_System.loginListener = loginListener;
	kha_System.logoutListener = logoutListener;
};
kha_System.login = function() {
	kha_SystemImpl.login();
};
kha_System.waitingForLogin = function() {
	return kha_SystemImpl.waitingForLogin();
};
kha_System.allowUserChange = function() {
	kha_SystemImpl.allowUserChange();
};
kha_System.disallowUserChange = function() {
	kha_SystemImpl.disallowUserChange();
};
kha_System.render = function(framebuffers) {
	var _g = 0;
	var _g1 = kha_System.renderListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(framebuffers);
	}
};
kha_System.foreground = function() {
	var _g = 0;
	var _g1 = kha_System.foregroundListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.resume = function() {
	var _g = 0;
	var _g1 = kha_System.resumeListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.pause = function() {
	var _g = 0;
	var _g1 = kha_System.pauseListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.background = function() {
	var _g = 0;
	var _g1 = kha_System.backgroundListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.shutdown = function() {
	var _g = 0;
	var _g1 = kha_System.shutdownListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener();
	}
};
kha_System.dropFiles = function(filePath) {
	var _g = 0;
	var _g1 = kha_System.dropFilesListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(filePath);
	}
};
kha_System.get_time = function() {
	return kha_SystemImpl.getTime();
};
kha_System.windowWidth = function($window) {
	if($window == null) {
		$window = 0;
	}
	return kha_Window.get($window).get_width();
};
kha_System.windowHeight = function($window) {
	if($window == null) {
		$window = 0;
	}
	return kha_Window.get_all()[$window].get_height();
};
kha_System.get_screenRotation = function() {
	return 0;
};
kha_System.get_systemId = function() {
	return kha_SystemImpl.getSystemId();
};
kha_System.vibrate = function(ms) {
	kha_SystemImpl.vibrate(ms);
};
kha_System.get_language = function() {
	return kha_SystemImpl.getLanguage();
};
kha_System.stop = function() {
	return kha_SystemImpl.requestShutdown();
};
kha_System.loadUrl = function(url) {
	kha_SystemImpl.loadUrl(url);
};
kha_System.canSwitchFullscreen = function() {
	return true;
};
kha_System.isFullscreen = function() {
	if(kha_Window.get(0).get_mode() != 1) {
		return kha_Window.get(0).get_mode() == 2;
	} else {
		return true;
	}
};
kha_System.requestFullscreen = function() {
	kha_Window.get(0).set_mode(1);
};
kha_System.exitFullscreen = function() {
	kha_Window.get(0).set_mode(0);
};
kha_System.notifyOnFullscreenChange = function(func,error) {
};
kha_System.removeFullscreenListener = function(func,error) {
};
kha_System.changeResolution = function(width,height) {
};
kha_System.requestShutdown = function() {
	kha_System.stop();
};
kha_System.get_vsync = function() {
	return kha_Window.get(0).get_vSynced();
};
kha_System.get_refreshRate = function() {
	return kha_Display.get_primary().get_frequency();
};
kha_System.screenDpi = function() {
	return kha_Display.get_primary().get_pixelsPerInch();
};
kha_System.safeZone = function() {
	return kha_SystemImpl.safeZone();
};
kha_System.automaticSafeZone = function() {
	return kha_SystemImpl.automaticSafeZone();
};
kha_System.setSafeZone = function(value) {
	kha_SystemImpl.setSafeZone(value);
};
kha_System.unlockAchievement = function(id) {
	kha_SystemImpl.unlockAchievement(id);
};
var kha_SystemImpl = function() { };
$hxClasses["kha.SystemImpl"] = kha_SystemImpl;
kha_SystemImpl.__name__ = true;
kha_SystemImpl.renderCallback = function() {
	kha_Scheduler.executeFrame();
	kha_System.render([kha_SystemImpl.framebuffer]);
};
kha_SystemImpl.dropFilesCallback = function(filePath) {
	kha_System.dropFiles(filePath);
};
kha_SystemImpl.copyCallback = function() {
	if(kha_System.copyListener != null) {
		return kha_System.copyListener();
	} else {
		return null;
	}
};
kha_SystemImpl.cutCallback = function() {
	if(kha_System.cutListener != null) {
		return kha_System.cutListener();
	} else {
		return null;
	}
};
kha_SystemImpl.pasteCallback = function(data) {
	if(kha_System.pasteListener != null) {
		kha_System.pasteListener(data);
	}
};
kha_SystemImpl.foregroundCallback = function() {
	kha_System.foreground();
};
kha_SystemImpl.resumeCallback = function() {
	kha_System.resume();
};
kha_SystemImpl.pauseCallback = function() {
	kha_System.pause();
};
kha_SystemImpl.backgroundCallback = function() {
	kha_System.background();
};
kha_SystemImpl.shutdownCallback = function() {
	kha_System.shutdown();
};
kha_SystemImpl.keyboardDownCallback = function(code) {
	kha_SystemImpl.keyboard.sendDownEvent(code);
};
kha_SystemImpl.keyboardUpCallback = function(code) {
	kha_SystemImpl.keyboard.sendUpEvent(code);
};
kha_SystemImpl.keyboardPressCallback = function(charCode) {
	kha_SystemImpl.keyboard.sendPressEvent(String.fromCodePoint(charCode));
};
kha_SystemImpl.mouseDownCallback = function(button,x,y) {
	kha_SystemImpl.mouse.sendDownEvent(0,button,x,y);
};
kha_SystemImpl.mouseUpCallback = function(button,x,y) {
	kha_SystemImpl.mouse.sendUpEvent(0,button,x,y);
};
kha_SystemImpl.mouseMoveCallback = function(x,y,mx,my) {
	kha_SystemImpl.mouse.sendMoveEvent(0,x,y,mx,my);
};
kha_SystemImpl.mouseWheelCallback = function(delta) {
	kha_SystemImpl.mouse.sendWheelEvent(0,delta);
};
kha_SystemImpl.penDownCallback = function(x,y,pressure) {
	kha_SystemImpl.pen.sendDownEvent(0,x,y,pressure);
};
kha_SystemImpl.penUpCallback = function(x,y,pressure) {
	kha_SystemImpl.pen.sendUpEvent(0,x,y,pressure);
};
kha_SystemImpl.penMoveCallback = function(x,y,pressure) {
	kha_SystemImpl.pen.sendMoveEvent(0,x,y,pressure);
};
kha_SystemImpl.gamepadAxisCallback = function(gamepad,axis,value) {
	kha_SystemImpl.gamepads[gamepad].sendAxisEvent(axis,value);
};
kha_SystemImpl.gamepadButtonCallback = function(gamepad,button,value) {
	kha_SystemImpl.gamepads[gamepad].sendButtonEvent(button,value);
};
kha_SystemImpl.audioCallback = function(samples) {
	kha_audio2_Audio._callCallback(samples);
	var buffer = kha_audio2_Audio.buffer;
	Krom.writeAudioBuffer(buffer.data.buffer,samples);
};
kha_SystemImpl.init = function(options,callback) {
	Krom.init(options.title,options.width,options.height,options.framebuffer.samplesPerPixel,options.framebuffer.verticalSync,options.window.mode,options.window.windowFeatures,6);
	kha_SystemImpl.start = Krom.getTime();
	haxe_Log.trace = function(v,infos) {
		var message = haxe_Log.formatOutput(v,infos);
		Krom.log(message);
	};
	new kha_Window(0);
	kha_Scheduler.init();
	kha_Shaders.init();
	var g4 = new kha_krom_Graphics();
	kha_SystemImpl.framebuffer = new kha_Framebuffer(0,null,null,g4);
	kha_SystemImpl.framebuffer.init(new kha_graphics2_Graphics1(kha_SystemImpl.framebuffer),new kha_graphics4_Graphics2(kha_SystemImpl.framebuffer),g4);
	Krom.setCallback(kha_SystemImpl.renderCallback);
	Krom.setDropFilesCallback(kha_SystemImpl.dropFilesCallback);
	Krom.setCutCopyPasteCallback(kha_SystemImpl.cutCallback,kha_SystemImpl.copyCallback,kha_SystemImpl.pasteCallback);
	Krom.setApplicationStateCallback(kha_SystemImpl.foregroundCallback,kha_SystemImpl.resumeCallback,kha_SystemImpl.pauseCallback,kha_SystemImpl.backgroundCallback,kha_SystemImpl.shutdownCallback);
	kha_SystemImpl.keyboard = new kha_input_Keyboard();
	kha_SystemImpl.mouse = new kha_input_MouseImpl();
	kha_SystemImpl.pen = new kha_input_Pen();
	kha_SystemImpl.gamepads = [];
	var _g = 0;
	var _g1 = kha_SystemImpl.maxGamepads;
	while(_g < _g1) {
		var i = _g++;
		kha_SystemImpl.gamepads[i] = new kha_input_Gamepad(i);
	}
	Krom.setKeyboardDownCallback(kha_SystemImpl.keyboardDownCallback);
	Krom.setKeyboardUpCallback(kha_SystemImpl.keyboardUpCallback);
	Krom.setKeyboardPressCallback(kha_SystemImpl.keyboardPressCallback);
	Krom.setMouseDownCallback(kha_SystemImpl.mouseDownCallback);
	Krom.setMouseUpCallback(kha_SystemImpl.mouseUpCallback);
	Krom.setMouseMoveCallback(kha_SystemImpl.mouseMoveCallback);
	Krom.setMouseWheelCallback(kha_SystemImpl.mouseWheelCallback);
	Krom.setPenDownCallback(kha_SystemImpl.penDownCallback);
	Krom.setPenUpCallback(kha_SystemImpl.penUpCallback);
	Krom.setPenMoveCallback(kha_SystemImpl.penMoveCallback);
	Krom.setGamepadAxisCallback(kha_SystemImpl.gamepadAxisCallback);
	Krom.setGamepadButtonCallback(kha_SystemImpl.gamepadButtonCallback);
	kha_audio2_Audio._init();
	kha_audio2_Audio1._init();
	Krom.setAudioCallback(kha_SystemImpl.audioCallback);
	kha_Scheduler.start();
	callback(kha_Window.get(0));
};
kha_SystemImpl.initEx = function(title,options,windowCallback,callback) {
};
kha_SystemImpl.translateWindowMode = function(value) {
	if(value == null) {
		return 0;
	}
	switch(value) {
	case 0:
		return 0;
	case 1:
		return 1;
	case 2:
		return 2;
	}
};
kha_SystemImpl.getScreenRotation = function() {
	return 0;
};
kha_SystemImpl.getTime = function() {
	return Krom.getTime() - kha_SystemImpl.start;
};
kha_SystemImpl.getVsync = function() {
	return true;
};
kha_SystemImpl.getRefreshRate = function() {
	return 60;
};
kha_SystemImpl.getSystemId = function() {
	return Krom.systemId();
};
kha_SystemImpl.vibrate = function(ms) {
};
kha_SystemImpl.getLanguage = function() {
	return "en";
};
kha_SystemImpl.requestShutdown = function() {
	Krom.requestShutdown();
	return true;
};
kha_SystemImpl.getMouse = function(num) {
	return kha_SystemImpl.mouse;
};
kha_SystemImpl.getPen = function(num) {
	return kha_SystemImpl.pen;
};
kha_SystemImpl.getKeyboard = function(num) {
	return kha_SystemImpl.keyboard;
};
kha_SystemImpl.lockMouse = function() {
	if(!kha_SystemImpl.isMouseLocked()) {
		Krom.lockMouse();
		var _g = 0;
		var _g1 = kha_SystemImpl.mouseLockListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener();
		}
	}
};
kha_SystemImpl.unlockMouse = function() {
	if(kha_SystemImpl.isMouseLocked()) {
		Krom.unlockMouse();
		var _g = 0;
		var _g1 = kha_SystemImpl.mouseLockListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener();
		}
	}
};
kha_SystemImpl.canLockMouse = function() {
	return Krom.canLockMouse();
};
kha_SystemImpl.isMouseLocked = function() {
	return Krom.isMouseLocked();
};
kha_SystemImpl.notifyOfMouseLockChange = function(func,error) {
	if(kha_SystemImpl.canLockMouse() && func != null) {
		kha_SystemImpl.mouseLockListeners.push(func);
	}
};
kha_SystemImpl.removeFromMouseLockChange = function(func,error) {
	if(kha_SystemImpl.canLockMouse() && func != null) {
		HxOverrides.remove(kha_SystemImpl.mouseLockListeners,func);
	}
};
kha_SystemImpl.hideSystemCursor = function() {
	Krom.showMouse(false);
};
kha_SystemImpl.showSystemCursor = function() {
	Krom.showMouse(true);
};
kha_SystemImpl.unload = function() {
};
kha_SystemImpl.canSwitchFullscreen = function() {
	return false;
};
kha_SystemImpl.isFullscreen = function() {
	return false;
};
kha_SystemImpl.requestFullscreen = function() {
};
kha_SystemImpl.exitFullscreen = function() {
};
kha_SystemImpl.notifyOfFullscreenChange = function(func,error) {
};
kha_SystemImpl.removeFromFullscreenChange = function(func,error) {
};
kha_SystemImpl.changeResolution = function(width,height) {
};
kha_SystemImpl.setKeepScreenOn = function(on) {
};
kha_SystemImpl.loadUrl = function(url) {
};
kha_SystemImpl.getGamepadId = function(index) {
	return "unknown";
};
kha_SystemImpl.getGamepadVendor = function(index) {
	return "unknown";
};
kha_SystemImpl.setGamepadRumble = function(index,leftAmount,rightAmount) {
};
kha_SystemImpl.safeZone = function() {
	return 1.0;
};
kha_SystemImpl.login = function() {
};
kha_SystemImpl.automaticSafeZone = function() {
	return true;
};
kha_SystemImpl.setSafeZone = function(value) {
};
kha_SystemImpl.unlockAchievement = function(id) {
};
kha_SystemImpl.waitingForLogin = function() {
	return false;
};
kha_SystemImpl.disallowUserChange = function() {
};
kha_SystemImpl.allowUserChange = function() {
};
var kha_Video = function() {
};
$hxClasses["kha.Video"] = kha_Video;
kha_Video.__name__ = true;
kha_Video.__interfaces__ = [kha_Resource];
kha_Video.prototype = {
	width: function() {
		return 100;
	}
	,height: function() {
		return 100;
	}
	,play: function(loop) {
		if(loop == null) {
			loop = false;
		}
	}
	,pause: function() {
	}
	,stop: function() {
	}
	,getLength: function() {
		return 0;
	}
	,getCurrentPos: function() {
		return 0;
	}
	,get_position: function() {
		return 0;
	}
	,set_position: function(value) {
		return 0;
	}
	,getVolume: function() {
		return 1;
	}
	,setVolume: function(volume) {
	}
	,isFinished: function() {
		return this.getCurrentPos() >= this.getLength();
	}
	,unload: function() {
	}
	,__class__: kha_Video
	,__properties__: {set_position:"set_position",get_position:"get_position"}
};
var kha_Window = function(num) {
	this.num = num;
	kha_Window.windows.push(this);
};
$hxClasses["kha.Window"] = kha_Window;
kha_Window.__name__ = true;
kha_Window.__properties__ = {get_all:"get_all"};
kha_Window.create = function(win,frame) {
	return null;
};
kha_Window.destroy = function($window) {
};
kha_Window.get = function(index) {
	return kha_Window.windows[index];
};
kha_Window.get_all = function() {
	return kha_Window.windows;
};
kha_Window.prototype = {
	num: null
	,windowTitle: null
	,resize: function(width,height) {
	}
	,move: function(x,y) {
	}
	,changeWindowFeatures: function(features) {
	}
	,changeFramebuffer: function(frame) {
	}
	,get_x: function() {
		return 0;
	}
	,set_x: function(value) {
		return 0;
	}
	,get_y: function() {
		return 0;
	}
	,set_y: function(value) {
		return 0;
	}
	,get_width: function() {
		return Krom.windowWidth(this.num);
	}
	,set_width: function(value) {
		return 800;
	}
	,get_height: function() {
		return Krom.windowHeight(this.num);
	}
	,set_height: function(value) {
		return 600;
	}
	,get_mode: function() {
		return 0;
	}
	,set_mode: function(mode) {
		return 0;
	}
	,get_visible: function() {
		return true;
	}
	,set_visible: function(value) {
		return true;
	}
	,get_title: function() {
		return this.windowTitle;
	}
	,set_title: function(value) {
		Krom.setWindowTitle(this.num,value);
		this.windowTitle = value;
		return this.windowTitle;
	}
	,notifyOnResize: function(callback) {
	}
	,get_vSynced: function() {
		return true;
	}
	,__class__: kha_Window
	,__properties__: {get_vSynced:"get_vSynced",set_title:"set_title",get_title:"get_title",set_visible:"set_visible",get_visible:"get_visible",set_mode:"set_mode",get_mode:"get_mode",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
};
var kha_WindowFeatures = {};
kha_WindowFeatures._new = function(value) {
	var this1 = value;
	return this1;
};
var kha_WindowOptions = function(title,x,y,width,height,display,visible,windowFeatures,mode) {
	if(mode == null) {
		mode = 0;
	}
	if(visible == null) {
		visible = true;
	}
	if(display == null) {
		display = -1;
	}
	if(height == null) {
		height = 600;
	}
	if(width == null) {
		width = 800;
	}
	if(y == null) {
		y = -1;
	}
	if(x == null) {
		x = -1;
	}
	this.mode = 0;
	this.windowFeatures = 1 | 4 | 2;
	this.visible = true;
	this.display = -1;
	this.height = 600;
	this.width = 800;
	this.y = -1;
	this.x = -1;
	this.title = null;
	this.title = title;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.display = display;
	this.visible = visible;
	this.windowFeatures = windowFeatures == null ? 1 | 4 | 2 : windowFeatures;
	this.mode = mode;
};
$hxClasses["kha.WindowOptions"] = kha_WindowOptions;
kha_WindowOptions.__name__ = true;
kha_WindowOptions.prototype = {
	title: null
	,x: null
	,y: null
	,width: null
	,height: null
	,display: null
	,visible: null
	,windowFeatures: null
	,mode: null
	,__class__: kha_WindowOptions
};
var kha_arrays_Float32Array = {};
kha_arrays_Float32Array.__properties__ = {get_length:"get_length",get_buffer:"get_buffer"};
kha_arrays_Float32Array._new = function(elements) {
	var this1 = new Float32Array(elements);
	return this1;
};
kha_arrays_Float32Array.get_buffer = function(this1) {
	return this1.buffer;
};
kha_arrays_Float32Array.get_length = function(this1) {
	return this1.length;
};
kha_arrays_Float32Array.set = function(this1,index,value) {
	return this1[index] = value;
};
kha_arrays_Float32Array.get = function(this1,index) {
	return this1[index];
};
kha_arrays_Float32Array.data = function(this1) {
	return this1;
};
kha_arrays_Float32Array.subarray = function(this1,start,end) {
	return this1.subarray(start,end);
};
var kha_arrays_Int16Array = {};
kha_arrays_Int16Array.__properties__ = {get_length:"get_length"};
kha_arrays_Int16Array._new = function(elements) {
	var this1 = new Int16Array(elements);
	return this1;
};
kha_arrays_Int16Array.get_length = function(this1) {
	return this1.length;
};
kha_arrays_Int16Array.set = function(this1,index,value) {
	return this1[index] = value;
};
kha_arrays_Int16Array.get = function(this1,index) {
	return this1[index];
};
kha_arrays_Int16Array.data = function(this1) {
	return this1;
};
kha_arrays_Int16Array.arrayRead = function(this1,index) {
	return this1[index];
};
kha_arrays_Int16Array.arrayWrite = function(this1,index,value) {
	return this1[index] = value;
};
kha_arrays_Int16Array.subarray = function(this1,start,end) {
	return this1.subarray(start,end);
};
var kha_arrays_Int32Array = {};
kha_arrays_Int32Array.__properties__ = {get_length:"get_length"};
kha_arrays_Int32Array._new = function(elements) {
	var this1 = new Int32Array(elements);
	return this1;
};
kha_arrays_Int32Array.get_length = function(this1) {
	return this1.length;
};
kha_arrays_Int32Array.set = function(this1,index,value) {
	return this1[index] = value;
};
kha_arrays_Int32Array.get = function(this1,index) {
	return this1[index];
};
kha_arrays_Int32Array.data = function(this1) {
	return this1;
};
kha_arrays_Int32Array.arrayRead = function(this1,index) {
	return this1[index];
};
kha_arrays_Int32Array.arrayWrite = function(this1,index,value) {
	return this1[index] = value;
};
kha_arrays_Int32Array.subarray = function(this1,start,end) {
	return this1.subarray(start,end);
};
var kha_arrays_Uint32Array = {};
kha_arrays_Uint32Array.__properties__ = {get_length:"get_length"};
kha_arrays_Uint32Array._new = function(elements) {
	var this1 = new Uint32Array(elements);
	return this1;
};
kha_arrays_Uint32Array.get_length = function(this1) {
	return this1.length;
};
kha_arrays_Uint32Array.set = function(this1,index,value) {
	return this1[index] = value;
};
kha_arrays_Uint32Array.get = function(this1,index) {
	return this1[index];
};
kha_arrays_Uint32Array.data = function(this1) {
	return this1;
};
kha_arrays_Uint32Array.arrayRead = function(this1,index) {
	return this1[index];
};
kha_arrays_Uint32Array.arrayWrite = function(this1,index,value) {
	return this1[index] = value;
};
kha_arrays_Uint32Array.subarray = function(this1,start,end) {
	return this1.subarray(start,end);
};
var kha_audio1_AudioChannel = function() { };
$hxClasses["kha.audio1.AudioChannel"] = kha_audio1_AudioChannel;
kha_audio1_AudioChannel.__name__ = true;
kha_audio1_AudioChannel.__isInterface__ = true;
kha_audio1_AudioChannel.prototype = {
	play: null
	,pause: null
	,stop: null
	,length: null
	,get_length: null
	,get_position: null
	,set_position: null
	,get_volume: null
	,set_volume: null
	,finished: null
	,get_finished: null
	,__class__: kha_audio1_AudioChannel
	,__properties__: {get_finished:"get_finished",set_volume:"set_volume",get_volume:"get_volume",set_position:"set_position",get_position:"get_position",get_length:"get_length"}
};
var kha_internal_IntBox = function(value) {
	this.value = value;
};
$hxClasses["kha.internal.IntBox"] = kha_internal_IntBox;
kha_internal_IntBox.__name__ = true;
kha_internal_IntBox.prototype = {
	value: null
	,__class__: kha_internal_IntBox
};
var kha_audio2_Audio = function() { };
$hxClasses["kha.audio2.Audio"] = kha_audio2_Audio;
kha_audio2_Audio.__name__ = true;
kha_audio2_Audio._init = function() {
	var bufferSize = 2048;
	kha_audio2_Audio.buffer = new kha_audio2_Buffer(bufferSize * 4,2,44100);
	kha_audio2_Audio.samplesPerSecond = 44100;
};
kha_audio2_Audio._callCallback = function(samples) {
	if(kha_audio2_Audio.buffer == null) {
		return;
	}
	if(kha_audio2_Audio.audioCallback != null) {
		kha_audio2_Audio.intBox.value = samples;
		kha_audio2_Audio.audioCallback(kha_audio2_Audio.intBox,kha_audio2_Audio.buffer);
	} else {
		var _g = 0;
		var _g1 = samples;
		while(_g < _g1) {
			var i = _g++;
			kha_audio2_Audio.buffer.data[kha_audio2_Audio.buffer.writeLocation] = 0;
			kha_audio2_Audio.buffer.writeLocation += 1;
			if(kha_audio2_Audio.buffer.writeLocation >= kha_audio2_Audio.buffer.size) {
				kha_audio2_Audio.buffer.writeLocation = 0;
			}
		}
	}
};
kha_audio2_Audio._readSample = function() {
	if(kha_audio2_Audio.buffer == null) {
		return 0;
	}
	var value = kha_audio2_Audio.buffer.data[kha_audio2_Audio.buffer.readLocation];
	kha_audio2_Audio.buffer.readLocation += 1;
	if(kha_audio2_Audio.buffer.readLocation >= kha_audio2_Audio.buffer.size) {
		kha_audio2_Audio.buffer.readLocation = 0;
	}
	return value;
};
kha_audio2_Audio.play = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	return null;
};
kha_audio2_Audio.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	return null;
};
var kha_audio2_Audio1 = function() { };
$hxClasses["kha.audio2.Audio1"] = kha_audio2_Audio1;
kha_audio2_Audio1.__name__ = true;
kha_audio2_Audio1._init = function() {
	var this1 = new Array(32);
	kha_audio2_Audio1.soundChannels = this1;
	var this1 = new Array(32);
	kha_audio2_Audio1.streamChannels = this1;
	var this1 = new Array(32);
	kha_audio2_Audio1.internalSoundChannels = this1;
	var this1 = new Array(32);
	kha_audio2_Audio1.internalStreamChannels = this1;
	var this1 = new Float32Array(512);
	kha_audio2_Audio1.sampleCache1 = this1;
	var this1 = new Float32Array(512);
	kha_audio2_Audio1.sampleCache2 = this1;
	kha_audio2_Audio1.lastAllocationCount = 0;
	kha_audio2_Audio.audioCallback = kha_audio2_Audio1.mix;
};
kha_audio2_Audio1.max = function(a,b) {
	if(a > b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_Audio1.min = function(a,b) {
	if(a < b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_Audio1.mix = function(samplesBox,buffer) {
	var samples = samplesBox.value;
	if(kha_audio2_Audio1.sampleCache1.length < samples) {
		if(kha_audio2_Audio.disableGcInteractions) {
			haxe_Log.trace("Unexpected allocation request in audio thread.",{ fileName : "kha/audio2/Audio1.hx", lineNumber : 50, className : "kha.audio2.Audio1", methodName : "mix"});
			var _g = 0;
			var _g1 = samples;
			while(_g < _g1) {
				var i = _g++;
				buffer.data[buffer.writeLocation] = 0;
				buffer.writeLocation += 1;
				if(buffer.writeLocation >= buffer.size) {
					buffer.writeLocation = 0;
				}
			}
			kha_audio2_Audio1.lastAllocationCount = 0;
			kha_audio2_Audio.disableGcInteractions = false;
			return;
		}
		var this1 = new Float32Array(samples * 2);
		kha_audio2_Audio1.sampleCache1 = this1;
		var this1 = new Float32Array(samples * 2);
		kha_audio2_Audio1.sampleCache2 = this1;
		kha_audio2_Audio1.lastAllocationCount = 0;
	} else if(kha_audio2_Audio1.lastAllocationCount > 100) {
		kha_audio2_Audio.disableGcInteractions = true;
	} else {
		kha_audio2_Audio1.lastAllocationCount += 1;
	}
	var _g = 0;
	var _g1 = samples;
	while(_g < _g1) {
		var i = _g++;
		kha_audio2_Audio1.sampleCache2[i] = 0;
	}
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		kha_audio2_Audio1.internalSoundChannels[i] = kha_audio2_Audio1.soundChannels[i];
	}
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		kha_audio2_Audio1.internalStreamChannels[i] = kha_audio2_Audio1.streamChannels[i];
	}
	var _g = 0;
	var _g1 = kha_audio2_Audio1.internalSoundChannels;
	while(_g < _g1.length) {
		var channel = _g1[_g];
		++_g;
		if(channel == null || channel.get_finished()) {
			continue;
		}
		channel.nextSamples(kha_audio2_Audio1.sampleCache1,samples,buffer.samplesPerSecond);
		var _g2 = 0;
		var _g3 = samples;
		while(_g2 < _g3) {
			var i = _g2++;
			kha_audio2_Audio1.sampleCache2[i] += kha_audio2_Audio1.sampleCache1[i] * channel.get_volume();
		}
	}
	var _g = 0;
	var _g1 = kha_audio2_Audio1.internalStreamChannels;
	while(_g < _g1.length) {
		var channel = _g1[_g];
		++_g;
		if(channel == null || channel.get_finished()) {
			continue;
		}
		channel.nextSamples(kha_audio2_Audio1.sampleCache1,samples,buffer.samplesPerSecond);
		var _g2 = 0;
		var _g3 = samples;
		while(_g2 < _g3) {
			var i = _g2++;
			kha_audio2_Audio1.sampleCache2[i] += kha_audio2_Audio1.sampleCache1[i] * channel.get_volume();
		}
	}
	var _g = 0;
	var _g1 = samples;
	while(_g < _g1) {
		var i = _g++;
		var a = kha_audio2_Audio1.sampleCache2[i];
		var a1 = a < 1.0 ? a : 1.0;
		buffer.data[buffer.writeLocation] = a1 > -1.0 ? a1 : -1.0;
		buffer.writeLocation += 1;
		if(buffer.writeLocation >= buffer.size) {
			buffer.writeLocation = 0;
		}
	}
};
kha_audio2_Audio1.play = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	var channel = null;
	if(kha_audio2_Audio.samplesPerSecond != sound.sampleRate) {
		channel = new kha_audio2_ResamplingAudioChannel(loop,sound.sampleRate);
	} else {
		channel = new kha_audio2_AudioChannel(loop);
	}
	channel.data = sound.uncompressedData;
	var foundChannel = false;
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.soundChannels[i] == null || kha_audio2_Audio1.soundChannels[i].get_finished()) {
			kha_audio2_Audio1.soundChannels[i] = channel;
			foundChannel = true;
			break;
		}
	}
	if(foundChannel) {
		return channel;
	} else {
		return null;
	}
};
kha_audio2_Audio1._playAgain = function(channel) {
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.soundChannels[i] == channel) {
			kha_audio2_Audio1.soundChannels[i] = null;
		}
	}
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.soundChannels[i] == null || kha_audio2_Audio1.soundChannels[i].get_finished() || kha_audio2_Audio1.soundChannels[i] == channel) {
			kha_audio2_Audio1.soundChannels[i] = channel;
			break;
		}
	}
};
kha_audio2_Audio1.stream = function(sound,loop) {
	if(loop == null) {
		loop = false;
	}
	var hardwareChannel = kha_audio2_Audio.stream(sound,loop);
	if(hardwareChannel != null) {
		return hardwareChannel;
	}
	var channel = new kha_audio2_StreamChannel(sound.compressedData,loop);
	var foundChannel = false;
	var _g = 0;
	while(_g < 32) {
		var i = _g++;
		if(kha_audio2_Audio1.streamChannels[i] == null || kha_audio2_Audio1.streamChannels[i].get_finished()) {
			kha_audio2_Audio1.streamChannels[i] = channel;
			foundChannel = true;
			break;
		}
	}
	if(foundChannel) {
		return channel;
	} else {
		return null;
	}
};
var kha_audio2_AudioChannel = function(looping) {
	this.looping = false;
	this.stopped = false;
	this.paused = false;
	this.myPosition = 0;
	this.myVolume = 1;
	this.data = null;
	this.looping = looping;
};
$hxClasses["kha.audio2.AudioChannel"] = kha_audio2_AudioChannel;
kha_audio2_AudioChannel.__name__ = true;
kha_audio2_AudioChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_AudioChannel.max = function(a,b) {
	if(a > b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_AudioChannel.min = function(a,b) {
	if(a < b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_AudioChannel.prototype = {
	data: null
	,myVolume: null
	,myPosition: null
	,paused: null
	,stopped: null
	,looping: null
	,nextSamples: function(requestedSamples,requestedLength,sampleRate) {
		if(this.paused || this.stopped) {
			var _g = 0;
			var _g1 = requestedLength;
			while(_g < _g1) {
				var i = _g++;
				requestedSamples[i] = 0;
			}
			return;
		}
		var requestedSamplesIndex = 0;
		while(requestedSamplesIndex < requestedLength) {
			var _g = 0;
			var a = this.data.length - this.myPosition;
			var b = requestedLength - requestedSamplesIndex;
			var _g1 = a < b ? a : b;
			while(_g < _g1) {
				var i = _g++;
				requestedSamples[requestedSamplesIndex++] = this.data[this.myPosition++];
			}
			if(this.myPosition >= this.data.length) {
				this.myPosition = 0;
				if(!this.looping) {
					this.stopped = true;
					break;
				}
			}
		}
		while(requestedSamplesIndex < requestedLength) requestedSamples[requestedSamplesIndex++] = 0;
	}
	,play: function() {
		this.paused = false;
		this.stopped = false;
		kha_audio2_Audio1._playAgain(this);
	}
	,pause: function() {
		this.paused = true;
	}
	,stop: function() {
		this.myPosition = 0;
		this.stopped = true;
	}
	,length: null
	,get_length: function() {
		return this.data.length / kha_audio2_Audio.samplesPerSecond / 2;
	}
	,get_position: function() {
		return this.myPosition / kha_audio2_Audio.samplesPerSecond / 2;
	}
	,set_position: function(value) {
		this.myPosition = Math.round(value * kha_audio2_Audio.samplesPerSecond * 2);
		var a = this.myPosition;
		var b = this.data.length;
		var a1 = a < b ? a : b;
		this.myPosition = a1 > 0 ? a1 : 0;
		return value;
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,set_volume: function(value) {
		return this.myVolume = value;
	}
	,finished: null
	,get_finished: function() {
		return this.stopped;
	}
	,__class__: kha_audio2_AudioChannel
	,__properties__: {get_finished:"get_finished",set_volume:"set_volume",get_volume:"get_volume",set_position:"set_position",get_position:"get_position",get_length:"get_length"}
};
var kha_audio2_Buffer = function(size,channels,samplesPerSecond) {
	this.size = size;
	var this1 = new Float32Array(size);
	this.data = this1;
	this.channels = channels;
	this.samplesPerSecond = samplesPerSecond;
	this.readLocation = 0;
	this.writeLocation = 0;
};
$hxClasses["kha.audio2.Buffer"] = kha_audio2_Buffer;
kha_audio2_Buffer.__name__ = true;
kha_audio2_Buffer.prototype = {
	channels: null
	,samplesPerSecond: null
	,data: null
	,size: null
	,readLocation: null
	,writeLocation: null
	,__class__: kha_audio2_Buffer
};
var kha_audio2_ResamplingAudioChannel = function(looping,sampleRate) {
	kha_audio2_AudioChannel.call(this,looping);
	this.sampleRate = sampleRate;
};
$hxClasses["kha.audio2.ResamplingAudioChannel"] = kha_audio2_ResamplingAudioChannel;
kha_audio2_ResamplingAudioChannel.__name__ = true;
kha_audio2_ResamplingAudioChannel.max = function(a,b) {
	if(a > b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_ResamplingAudioChannel.min = function(a,b) {
	if(a < b) {
		return a;
	} else {
		return b;
	}
};
kha_audio2_ResamplingAudioChannel.__super__ = kha_audio2_AudioChannel;
kha_audio2_ResamplingAudioChannel.prototype = $extend(kha_audio2_AudioChannel.prototype,{
	sampleRate: null
	,nextSamples: function(requestedSamples,requestedLength,sampleRate) {
		if(this.paused || this.stopped) {
			var _g = 0;
			var _g1 = requestedLength;
			while(_g < _g1) {
				var i = _g++;
				requestedSamples[i] = 0;
			}
			return;
		}
		var requestedSamplesIndex = 0;
		while(requestedSamplesIndex < requestedLength) {
			var _g = 0;
			var value = Math.ceil(this.data.length * (sampleRate / this.sampleRate));
			var a = (value % 2 == 0 ? value : value + 1) - this.myPosition;
			var b = requestedLength - requestedSamplesIndex;
			var _g1 = a < b ? a : b;
			while(_g < _g1) {
				var i = _g++;
				var index = requestedSamplesIndex++;
				var position = this.myPosition++;
				var even = position % 2 == 0;
				var factor = this.sampleRate / sampleRate;
				var value1;
				if(even) {
					position = position / 2 | 0;
					var pos = factor * position;
					var pos1 = Math.floor(pos);
					var pos2 = Math.floor(pos + 1);
					pos1 *= 2;
					pos2 *= 2;
					var minimum = 0;
					var maximum = this.data.length - 1;
					if(maximum % 2 != 0) {
						--maximum;
					}
					var a1 = pos1 < minimum || pos1 > maximum ? 0 : this.data[pos1];
					var b1 = pos2 < minimum || pos2 > maximum ? 0 : this.data[pos2];
					var t = pos - Math.floor(pos);
					value1 = (1 - t) * a1 + t * b1;
				} else {
					position = position / 2 | 0;
					var pos3 = factor * position;
					var pos11 = Math.floor(pos3);
					var pos21 = Math.floor(pos3 + 1);
					pos11 = pos11 * 2 + 1;
					pos21 = pos21 * 2 + 1;
					var minimum1 = 1;
					var maximum1 = this.data.length - 1;
					if(maximum1 % 2 == 0) {
						--maximum1;
					}
					var a2 = pos11 < minimum1 || pos11 > maximum1 ? 0 : this.data[pos11];
					var b2 = pos21 < minimum1 || pos21 > maximum1 ? 0 : this.data[pos21];
					var t1 = pos3 - Math.floor(pos3);
					value1 = (1 - t1) * a2 + t1 * b2;
				}
				requestedSamples[index] = value1;
			}
			var value2 = Math.ceil(this.data.length * (sampleRate / this.sampleRate));
			if(this.myPosition >= (value2 % 2 == 0 ? value2 : value2 + 1)) {
				this.myPosition = 0;
				if(!this.looping) {
					this.stopped = true;
					break;
				}
			}
		}
		while(requestedSamplesIndex < requestedLength) requestedSamples[requestedSamplesIndex++] = 0;
	}
	,sample: function(position,sampleRate) {
		var even = position % 2 == 0;
		var factor = this.sampleRate / sampleRate;
		if(even) {
			position = position / 2 | 0;
			var pos = factor * position;
			var pos1 = Math.floor(pos);
			var pos2 = Math.floor(pos + 1);
			pos1 *= 2;
			pos2 *= 2;
			var minimum = 0;
			var maximum = this.data.length - 1;
			if(maximum % 2 != 0) {
				--maximum;
			}
			var a = pos1 < minimum || pos1 > maximum ? 0 : this.data[pos1];
			var b = pos2 < minimum || pos2 > maximum ? 0 : this.data[pos2];
			var t = pos - Math.floor(pos);
			return (1 - t) * a + t * b;
		} else {
			position = position / 2 | 0;
			var pos = factor * position;
			var pos1 = Math.floor(pos);
			var pos2 = Math.floor(pos + 1);
			pos1 = pos1 * 2 + 1;
			pos2 = pos2 * 2 + 1;
			var minimum = 1;
			var maximum = this.data.length - 1;
			if(maximum % 2 == 0) {
				--maximum;
			}
			var a = pos1 < minimum || pos1 > maximum ? 0 : this.data[pos1];
			var b = pos2 < minimum || pos2 > maximum ? 0 : this.data[pos2];
			var t = pos - Math.floor(pos);
			return (1 - t) * a + t * b;
		}
	}
	,lerp: function(v0,v1,t) {
		return (1 - t) * v0 + t * v1;
	}
	,sampleLength: function(sampleRate) {
		var value = Math.ceil(this.data.length * (sampleRate / this.sampleRate));
		if(value % 2 == 0) {
			return value;
		} else {
			return value + 1;
		}
	}
	,play: function() {
		this.paused = false;
		this.stopped = false;
		kha_audio2_Audio1._playAgain(this);
	}
	,pause: function() {
		this.paused = true;
	}
	,stop: function() {
		this.myPosition = 0;
		this.stopped = true;
	}
	,get_length: function() {
		return this.data.length / this.sampleRate / 2;
	}
	,get_position: function() {
		return this.myPosition / kha_audio2_Audio.samplesPerSecond / 2;
	}
	,set_position: function(value) {
		var pos = Math.round(value * kha_audio2_Audio.samplesPerSecond * 2.0);
		if(pos % 2 != 0) {
			++pos;
		}
		var value1 = Math.ceil(this.data.length * (kha_audio2_Audio.samplesPerSecond / this.sampleRate));
		var b = value1 % 2 == 0 ? value1 : value1 + 1;
		var a = pos < b ? pos : b;
		this.myPosition = a > 0 ? a : 0;
		return value;
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,set_volume: function(value) {
		return this.myVolume = value;
	}
	,get_finished: function() {
		return this.stopped;
	}
	,__class__: kha_audio2_ResamplingAudioChannel
});
var kha_audio2_StreamChannel = function(data,loop) {
	this.paused = false;
	this.atend = false;
	this.myVolume = 1;
	this.loop = loop;
	this.reader = kha_audio2_ogg_vorbis_Reader.openFromBytes(data);
};
$hxClasses["kha.audio2.StreamChannel"] = kha_audio2_StreamChannel;
kha_audio2_StreamChannel.__name__ = true;
kha_audio2_StreamChannel.__interfaces__ = [kha_audio1_AudioChannel];
kha_audio2_StreamChannel.prototype = {
	reader: null
	,atend: null
	,loop: null
	,myVolume: null
	,paused: null
	,nextSamples: function(samples,length,sampleRate) {
		if(this.paused) {
			var _g = 0;
			var _g1 = length;
			while(_g < _g1) {
				var i = _g++;
				samples[i] = 0;
			}
			return;
		}
		var count = this.reader.read(samples,length / 2 | 0,2,sampleRate,true) * 2;
		if(count < length) {
			if(this.loop) {
				this.reader.set_currentMillisecond(0);
			} else {
				this.atend = true;
			}
			var _g = count;
			var _g1 = length;
			while(_g < _g1) {
				var i = _g++;
				samples[i] = 0;
			}
		}
	}
	,play: function() {
		this.paused = false;
	}
	,pause: function() {
		this.paused = true;
	}
	,stop: function() {
		this.atend = true;
	}
	,length: null
	,get_length: function() {
		return this.reader.get_totalMillisecond() / 1000.0;
	}
	,get_position: function() {
		return this.reader.get_currentMillisecond() / 1000.0;
	}
	,set_position: function(value) {
		return value;
	}
	,get_volume: function() {
		return this.myVolume;
	}
	,set_volume: function(value) {
		return this.myVolume = value;
	}
	,finished: null
	,get_finished: function() {
		return this.atend;
	}
	,__class__: kha_audio2_StreamChannel
	,__properties__: {get_finished:"get_finished",set_volume:"set_volume",get_volume:"get_volume",set_position:"set_position",get_position:"get_position",get_length:"get_length"}
};
var kha_audio2_ogg_tools_Crc32 = function() { };
$hxClasses["kha.audio2.ogg.tools.Crc32"] = kha_audio2_ogg_tools_Crc32;
kha_audio2_ogg_tools_Crc32.__name__ = true;
kha_audio2_ogg_tools_Crc32.init = function() {
	if(kha_audio2_ogg_tools_Crc32.table != null) {
		return;
	}
	var this1 = new Array(256);
	kha_audio2_ogg_tools_Crc32.table = this1;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		var s = i << 24;
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		s = s << 1 ^ (UInt.gte(s,1 << 31) ? 79764919 : 0);
		kha_audio2_ogg_tools_Crc32.table[i] = s;
	}
};
kha_audio2_ogg_tools_Crc32.update = function(crc,byte) {
	return crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[byte ^ crc >>> 24];
};
var kha_audio2_ogg_tools_MathTools = function() { };
$hxClasses["kha.audio2.ogg.tools.MathTools"] = kha_audio2_ogg_tools_MathTools;
kha_audio2_ogg_tools_MathTools.__name__ = true;
kha_audio2_ogg_tools_MathTools.ilog = function(n) {
	var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
	if(n < 16384) {
		if(n < 16) {
			return log2_4[n];
		} else if(n < 512) {
			return 5 + log2_4[n >> 5];
		} else {
			return 10 + log2_4[n >> 10];
		}
	} else if(n < 16777216) {
		if(n < 524288) {
			return 15 + log2_4[n >> 15];
		} else {
			return 20 + log2_4[n >> 20];
		}
	} else if(n < 536870912) {
		return 25 + log2_4[n >> 25];
	} else if(n < -2147483648) {
		return 30 + log2_4[n >> 30];
	} else {
		return 0;
	}
};
var kha_audio2_ogg_tools_Mdct = function() { };
$hxClasses["kha.audio2.ogg.tools.Mdct"] = kha_audio2_ogg_tools_Mdct;
kha_audio2_ogg_tools_Mdct.__name__ = true;
kha_audio2_ogg_tools_Mdct.inverseTransform = function(buffer,n,a,b,c,bitReverse) {
	var n2 = n >> 1;
	var n4 = n >> 2;
	var n8 = n >> 3;
	var this1 = new Array(n2);
	var buf2 = this1;
	var dOffset = n2 - 2;
	var aaOffset = 0;
	var eOffset = 0;
	var eStopOffset = n2;
	while(eOffset != eStopOffset) {
		buf2[dOffset + 1] = buffer[eOffset] * a[aaOffset] - buffer[eOffset + 2] * a[aaOffset + 1];
		buf2[dOffset] = buffer[eOffset] * a[aaOffset + 1] + buffer[eOffset + 2] * a[aaOffset];
		dOffset -= 2;
		aaOffset += 2;
		eOffset += 4;
	}
	eOffset = n2 - 3;
	while(dOffset >= 0) {
		buf2[dOffset + 1] = -buffer[eOffset + 2] * a[aaOffset] - -buffer[eOffset] * a[aaOffset + 1];
		buf2[dOffset] = -buffer[eOffset + 2] * a[aaOffset + 1] + -buffer[eOffset] * a[aaOffset];
		dOffset -= 2;
		aaOffset += 2;
		eOffset -= 4;
	}
	var u = buffer;
	var v = buf2;
	var aaOffset = n2 - 8;
	var eOffset0 = n4;
	var eOffset1 = 0;
	var dOffset0 = n4;
	var dOffset1 = 0;
	while(aaOffset >= 0) {
		var v41_21 = v[eOffset0 + 1] - v[eOffset1 + 1];
		var v40_20 = v[eOffset0] - v[eOffset1];
		u[dOffset0 + 1] = v[eOffset0 + 1] + v[eOffset1 + 1];
		u[dOffset0] = v[eOffset0] + v[eOffset1];
		u[dOffset1 + 1] = v41_21 * a[aaOffset + 4] - v40_20 * a[aaOffset + 5];
		u[dOffset1] = v40_20 * a[aaOffset + 4] + v41_21 * a[aaOffset + 5];
		v41_21 = v[eOffset0 + 3] - v[eOffset1 + 3];
		v40_20 = v[eOffset0 + 2] - v[eOffset1 + 2];
		u[dOffset0 + 3] = v[eOffset0 + 3] + v[eOffset1 + 3];
		u[dOffset0 + 2] = v[eOffset0 + 2] + v[eOffset1 + 2];
		u[dOffset1 + 3] = v41_21 * a[aaOffset] - v40_20 * a[aaOffset + 1];
		u[dOffset1 + 2] = v40_20 * a[aaOffset] + v41_21 * a[aaOffset + 1];
		aaOffset -= 8;
		dOffset0 += 4;
		dOffset1 += 4;
		eOffset0 += 4;
		eOffset1 += 4;
	}
	var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
	var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
	var i_off = n2 - 1 - n4 * 0;
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + -(n >> 3);
	var aOffset = 0;
	var i = (n >> 4 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eeOffset0] - u[eeOffset2];
		var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
		u[eeOffset0] += u[eeOffset2];
		u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
		u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
		k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
		u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
		u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
		u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
		k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
		u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
		u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
		u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
		k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
		u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
		u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
		u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		eeOffset0 -= 8;
		eeOffset2 -= 8;
	}
	var i_off = n2 - 1 - n4;
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + -(n >> 3);
	var aOffset = 0;
	var i = (n >> 4 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eeOffset0] - u[eeOffset2];
		var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
		u[eeOffset0] += u[eeOffset2];
		u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
		u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
		k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
		u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
		u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
		u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
		k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
		u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
		u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
		u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
		k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
		u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
		u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
		u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		eeOffset0 -= 8;
		eeOffset2 -= 8;
	}
	var d0 = n2 - 1 - n8 * 0;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var d0 = n2 - 1 - n8;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var d0 = n2 - 1 - n8 * 2;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var d0 = n2 - 1 - n8 * 3;
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + -(n >> 4);
	var i = (n >> 5 >> 2) + 1;
	while(--i > 0) {
		var k00_20 = u[eOffset0] - u[eOffset2];
		var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
		u[eOffset0] += u[eOffset2];
		u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
		u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
		k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
		u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
		u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
		u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
		k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
		u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
		u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
		u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 16;
		k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
		k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
		u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
		u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
		u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += 16;
	}
	var _g = 2;
	var _g1 = ld - 3 >> 1;
	while(_g < _g1) {
		var l = _g++;
		var k0 = n >> l + 2;
		var k0_2 = k0 >> 1;
		var lim = 1 << l + 1;
		var _g2 = 0;
		var _g3 = lim;
		while(_g2 < _g3) {
			var i = _g2++;
			var d0 = n2 - 1 - k0 * i;
			var k1 = 1 << l + 3;
			var aOffset = 0;
			var eOffset0 = d0;
			var eOffset2 = d0 + -k0_2;
			var i1 = (n >> l + 4 >> 2) + 1;
			while(--i1 > 0) {
				var k00_20 = u[eOffset0] - u[eOffset2];
				var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
				u[eOffset0] += u[eOffset2];
				u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
				u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				aOffset += k1;
				k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
				k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
				u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
				u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
				u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				aOffset += k1;
				k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
				k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
				u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
				u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
				u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				aOffset += k1;
				k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
				k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
				u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
				u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
				u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
				u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
				eOffset0 -= 8;
				eOffset2 -= 8;
				aOffset += k1;
			}
		}
	}
	var _g = ld - 3 >> 1;
	var _g1 = ld - 6;
	while(_g < _g1) {
		var l = _g++;
		var k0 = n >> l + 2;
		var k1 = 1 << l + 3;
		var k0_2 = k0 >> 1;
		var rlim = n >> l + 6;
		var lim = 1 << l + 1;
		var aOffset = 0;
		var i_off = n2 - 1;
		var r = rlim + 1;
		while(--r > 0) {
			var A0 = a[aOffset];
			var A1 = a[aOffset + 1];
			var A2 = a[aOffset + k1];
			var A3 = a[aOffset + k1 + 1];
			var A4 = a[aOffset + k1 * 2];
			var A5 = a[aOffset + k1 * 2 + 1];
			var A6 = a[aOffset + k1 * 3];
			var A7 = a[aOffset + k1 * 3 + 1];
			var eeOffset0 = i_off;
			var eeOffset2 = i_off + -k0_2;
			var i = lim + 1;
			while(--i > 0) {
				var k00 = u[eeOffset0] - u[eeOffset2];
				var k11 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
				u[eeOffset0] += u[eeOffset2];
				u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
				u[eeOffset2] = k00 * A0 - k11 * A1;
				u[eeOffset2 + (-1)] = k11 * A0 + k00 * A1;
				k00 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
				k11 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
				u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
				u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
				u[eeOffset2 + (-2)] = k00 * A2 - k11 * A3;
				u[eeOffset2 + (-3)] = k11 * A2 + k00 * A3;
				k00 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
				k11 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
				u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
				u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
				u[eeOffset2 + (-4)] = k00 * A4 - k11 * A5;
				u[eeOffset2 + (-5)] = k11 * A4 + k00 * A5;
				k00 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
				k11 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
				u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
				u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
				u[eeOffset2 + (-6)] = k00 * A6 - k11 * A7;
				u[eeOffset2 + (-7)] = k11 * A6 + k00 * A7;
				eeOffset0 -= k0;
				eeOffset2 -= k0;
			}
			aOffset += k1 * 4;
			i_off -= 8;
		}
	}
	var i_off = n2 - 1;
	var A2 = a[n >> 3];
	var zOffset = i_off;
	var baseOffset = i_off - 16 * (n >> 5);
	while(zOffset > baseOffset) {
		var t0 = u[zOffset];
		var t1 = u[zOffset + (-8)];
		u[zOffset + (-8)] = t0 - t1;
		u[zOffset] = t0 + t1;
		t0 = u[zOffset + (-1)];
		t1 = u[zOffset + (-9)];
		u[zOffset + (-9)] = t0 - t1;
		u[zOffset + (-1)] = t0 + t1;
		t0 = u[zOffset + (-2)];
		t1 = u[zOffset + (-10)];
		var k00 = t0 - t1;
		u[zOffset + (-2)] = t0 + t1;
		t0 = u[zOffset + (-3)];
		t1 = u[zOffset + (-11)];
		var k11 = t0 - t1;
		u[zOffset + (-3)] = t0 + t1;
		u[zOffset + (-10)] = (k00 + k11) * A2;
		u[zOffset + (-11)] = (k11 - k00) * A2;
		t0 = u[zOffset + (-4)];
		t1 = u[zOffset + (-12)];
		k00 = t1 - t0;
		u[zOffset + (-4)] = t0 + t1;
		t0 = u[zOffset + (-5)];
		t1 = u[zOffset + (-13)];
		k11 = t0 - t1;
		u[zOffset + (-5)] = t0 + t1;
		u[zOffset + (-12)] = k11;
		u[zOffset + (-13)] = k00;
		t0 = u[zOffset + (-6)];
		t1 = u[zOffset + (-14)];
		k00 = t1 - t0;
		u[zOffset + (-6)] = t0 + t1;
		t0 = u[zOffset + (-7)];
		t1 = u[zOffset + (-15)];
		k11 = t0 - t1;
		u[zOffset + (-7)] = t0 + t1;
		u[zOffset + (-14)] = (k00 + k11) * A2;
		u[zOffset + (-15)] = (k00 - k11) * A2;
		var t01 = u[zOffset];
		var t11 = u[zOffset + (-4)];
		var k001 = t01 - t11;
		var y0 = t01 + t11;
		t01 = u[zOffset + (-2)];
		t11 = u[zOffset + (-6)];
		var y2 = t01 + t11;
		var k22 = t01 - t11;
		u[zOffset] = y0 + y2;
		u[zOffset + (-2)] = y0 - y2;
		var k33 = u[zOffset + (-3)] - u[zOffset + (-7)];
		u[zOffset + (-4)] = k001 + k33;
		u[zOffset + (-6)] = k001 - k33;
		t01 = u[zOffset + (-1)];
		t11 = u[zOffset + (-5)];
		var k111 = t01 - t11;
		var y1 = t01 + t11;
		var y3 = u[zOffset + (-3)] + u[zOffset + (-7)];
		u[zOffset + (-1)] = y1 + y3;
		u[zOffset + (-3)] = y1 - y3;
		u[zOffset + (-5)] = k111 - k22;
		u[zOffset + (-7)] = k111 + k22;
		var zOffset1 = zOffset - 8;
		var t02 = u[zOffset1];
		var t12 = u[zOffset1 + (-4)];
		var k002 = t02 - t12;
		var y01 = t02 + t12;
		t02 = u[zOffset1 + (-2)];
		t12 = u[zOffset1 + (-6)];
		var y21 = t02 + t12;
		var k221 = t02 - t12;
		u[zOffset1] = y01 + y21;
		u[zOffset1 + (-2)] = y01 - y21;
		var k331 = u[zOffset1 + (-3)] - u[zOffset1 + (-7)];
		u[zOffset1 + (-4)] = k002 + k331;
		u[zOffset1 + (-6)] = k002 - k331;
		t02 = u[zOffset1 + (-1)];
		t12 = u[zOffset1 + (-5)];
		var k112 = t02 - t12;
		var y11 = t02 + t12;
		var y31 = u[zOffset1 + (-3)] + u[zOffset1 + (-7)];
		u[zOffset1 + (-1)] = y11 + y31;
		u[zOffset1 + (-3)] = y11 - y31;
		u[zOffset1 + (-5)] = k112 - k221;
		u[zOffset1 + (-7)] = k112 + k221;
		zOffset -= 16;
	}
	var brOffset = 0;
	var dOffset0 = n4 - 4;
	var dOffset1 = n2 - 4;
	while(dOffset0 >= 0) {
		var k4 = bitReverse[brOffset];
		v[dOffset1 + 3] = u[k4];
		v[dOffset1 + 2] = u[k4 + 1];
		v[dOffset0 + 3] = u[k4 + 2];
		v[dOffset0 + 2] = u[k4 + 3];
		k4 = bitReverse[brOffset + 1];
		v[dOffset1 + 1] = u[k4];
		v[dOffset1] = u[k4 + 1];
		v[dOffset0 + 1] = u[k4 + 2];
		v[dOffset0] = u[k4 + 3];
		dOffset0 -= 4;
		dOffset1 -= 4;
		brOffset += 2;
	}
	var cOffset = 0;
	var dOffset = 0;
	var eOffset = n2 - 4;
	while(dOffset < eOffset) {
		var a02 = v[dOffset] - v[eOffset + 2];
		var a11 = v[dOffset + 1] + v[eOffset + 3];
		var b0 = c[cOffset + 1] * a02 + c[cOffset] * a11;
		var b1 = c[cOffset + 1] * a11 - c[cOffset] * a02;
		var b2 = v[dOffset] + v[eOffset + 2];
		var b3 = v[dOffset + 1] - v[eOffset + 3];
		v[dOffset] = b2 + b0;
		v[dOffset + 1] = b3 + b1;
		v[eOffset + 2] = b2 - b0;
		v[eOffset + 3] = b1 - b3;
		a02 = v[dOffset + 2] - v[eOffset];
		a11 = v[dOffset + 3] + v[eOffset + 1];
		b0 = c[cOffset + 3] * a02 + c[cOffset + 2] * a11;
		b1 = c[cOffset + 3] * a11 - c[cOffset + 2] * a02;
		b2 = v[dOffset + 2] + v[eOffset];
		b3 = v[dOffset + 3] - v[eOffset + 1];
		v[dOffset + 2] = b2 + b0;
		v[dOffset + 3] = b3 + b1;
		v[eOffset] = b2 - b0;
		v[eOffset + 1] = b1 - b3;
		cOffset += 4;
		dOffset += 4;
		eOffset -= 4;
	}
	var bOffset = n2 - 8;
	var eOffset = n2 - 8;
	var dOffset0 = 0;
	var dOffset1 = n2 - 4;
	var dOffset2 = n2;
	var dOffset3 = n - 4;
	while(eOffset >= 0) {
		var p3 = buf2[eOffset + 6] * b[bOffset + 7] - buf2[eOffset + 7] * b[bOffset + 6];
		var p2 = -buf2[eOffset + 6] * b[bOffset + 6] - buf2[eOffset + 7] * b[bOffset + 7];
		buffer[dOffset0] = p3;
		buffer[dOffset1 + 3] = -p3;
		buffer[dOffset2] = p2;
		buffer[dOffset3 + 3] = p2;
		var p1 = buf2[eOffset + 4] * b[bOffset + 5] - buf2[eOffset + 5] * b[bOffset + 4];
		var p0 = -buf2[eOffset + 4] * b[bOffset + 4] - buf2[eOffset + 5] * b[bOffset + 5];
		buffer[dOffset0 + 1] = p1;
		buffer[dOffset1 + 2] = -p1;
		buffer[dOffset2 + 1] = p0;
		buffer[dOffset3 + 2] = p0;
		p3 = buf2[eOffset + 2] * b[bOffset + 3] - buf2[eOffset + 3] * b[bOffset + 2];
		p2 = -buf2[eOffset + 2] * b[bOffset + 2] - buf2[eOffset + 3] * b[bOffset + 3];
		buffer[dOffset0 + 2] = p3;
		buffer[dOffset1 + 1] = -p3;
		buffer[dOffset2 + 2] = p2;
		buffer[dOffset3 + 1] = p2;
		p1 = buf2[eOffset] * b[bOffset + 1] - buf2[eOffset + 1] * b[bOffset];
		p0 = -buf2[eOffset] * b[bOffset] - buf2[eOffset + 1] * b[bOffset + 1];
		buffer[dOffset0 + 3] = p1;
		buffer[dOffset1] = -p1;
		buffer[dOffset2 + 3] = p0;
		buffer[dOffset3] = p0;
		bOffset -= 8;
		eOffset -= 8;
		dOffset0 += 4;
		dOffset2 += 4;
		dOffset1 -= 4;
		dOffset3 -= 4;
	}
};
kha_audio2_ogg_tools_Mdct.step3Iter0Loop = function(n,e,i_off,k_off,a) {
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + k_off;
	var aOffset = 0;
	var i = (n >> 2) + 1;
	while(--i > 0) {
		var k00_20 = e[eeOffset0] - e[eeOffset2];
		var k01_21 = e[eeOffset0 + (-1)] - e[eeOffset2 + (-1)];
		e[eeOffset0] += e[eeOffset2];
		e[eeOffset0 + (-1)] += e[eeOffset2 + (-1)];
		e[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = e[eeOffset0 + (-2)] - e[eeOffset2 + (-2)];
		k01_21 = e[eeOffset0 + (-3)] - e[eeOffset2 + (-3)];
		e[eeOffset0 + (-2)] += e[eeOffset2 + (-2)];
		e[eeOffset0 + (-3)] += e[eeOffset2 + (-3)];
		e[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = e[eeOffset0 + (-4)] - e[eeOffset2 + (-4)];
		k01_21 = e[eeOffset0 + (-5)] - e[eeOffset2 + (-5)];
		e[eeOffset0 + (-4)] += e[eeOffset2 + (-4)];
		e[eeOffset0 + (-5)] += e[eeOffset2 + (-5)];
		e[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		k00_20 = e[eeOffset0 + (-6)] - e[eeOffset2 + (-6)];
		k01_21 = e[eeOffset0 + (-7)] - e[eeOffset2 + (-7)];
		e[eeOffset0 + (-6)] += e[eeOffset2 + (-6)];
		e[eeOffset0 + (-7)] += e[eeOffset2 + (-7)];
		e[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += 8;
		eeOffset0 -= 8;
		eeOffset2 -= 8;
	}
};
kha_audio2_ogg_tools_Mdct.step3InnerRLoop = function(lim,e,d0,k_off,a,k1) {
	var aOffset = 0;
	var eOffset0 = d0;
	var eOffset2 = d0 + k_off;
	var i = (lim >> 2) + 1;
	while(--i > 0) {
		var k00_20 = e[eOffset0] - e[eOffset2];
		var k01_21 = e[eOffset0 + (-1)] - e[eOffset2 + (-1)];
		e[eOffset0] += e[eOffset2];
		e[eOffset0 + (-1)] += e[eOffset2 + (-1)];
		e[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += k1;
		k00_20 = e[eOffset0 + (-2)] - e[eOffset2 + (-2)];
		k01_21 = e[eOffset0 + (-3)] - e[eOffset2 + (-3)];
		e[eOffset0 + (-2)] += e[eOffset2 + (-2)];
		e[eOffset0 + (-3)] += e[eOffset2 + (-3)];
		e[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += k1;
		k00_20 = e[eOffset0 + (-4)] - e[eOffset2 + (-4)];
		k01_21 = e[eOffset0 + (-5)] - e[eOffset2 + (-5)];
		e[eOffset0 + (-4)] += e[eOffset2 + (-4)];
		e[eOffset0 + (-5)] += e[eOffset2 + (-5)];
		e[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		aOffset += k1;
		k00_20 = e[eOffset0 + (-6)] - e[eOffset2 + (-6)];
		k01_21 = e[eOffset0 + (-7)] - e[eOffset2 + (-7)];
		e[eOffset0 + (-6)] += e[eOffset2 + (-6)];
		e[eOffset0 + (-7)] += e[eOffset2 + (-7)];
		e[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
		e[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
		eOffset0 -= 8;
		eOffset2 -= 8;
		aOffset += k1;
	}
};
kha_audio2_ogg_tools_Mdct.step3InnerSLoop = function(n,e,i_off,k_off,a,aOffset0,aOffset1,k0) {
	var A0 = a[aOffset0];
	var A1 = a[aOffset0 + 1];
	var A2 = a[aOffset0 + aOffset1];
	var A3 = a[aOffset0 + aOffset1 + 1];
	var A4 = a[aOffset0 + aOffset1 * 2];
	var A5 = a[aOffset0 + aOffset1 * 2 + 1];
	var A6 = a[aOffset0 + aOffset1 * 3];
	var A7 = a[aOffset0 + aOffset1 * 3 + 1];
	var eeOffset0 = i_off;
	var eeOffset2 = i_off + k_off;
	var i = n + 1;
	while(--i > 0) {
		var k00 = e[eeOffset0] - e[eeOffset2];
		var k11 = e[eeOffset0 + (-1)] - e[eeOffset2 + (-1)];
		e[eeOffset0] += e[eeOffset2];
		e[eeOffset0 + (-1)] += e[eeOffset2 + (-1)];
		e[eeOffset2] = k00 * A0 - k11 * A1;
		e[eeOffset2 + (-1)] = k11 * A0 + k00 * A1;
		k00 = e[eeOffset0 + (-2)] - e[eeOffset2 + (-2)];
		k11 = e[eeOffset0 + (-3)] - e[eeOffset2 + (-3)];
		e[eeOffset0 + (-2)] += e[eeOffset2 + (-2)];
		e[eeOffset0 + (-3)] += e[eeOffset2 + (-3)];
		e[eeOffset2 + (-2)] = k00 * A2 - k11 * A3;
		e[eeOffset2 + (-3)] = k11 * A2 + k00 * A3;
		k00 = e[eeOffset0 + (-4)] - e[eeOffset2 + (-4)];
		k11 = e[eeOffset0 + (-5)] - e[eeOffset2 + (-5)];
		e[eeOffset0 + (-4)] += e[eeOffset2 + (-4)];
		e[eeOffset0 + (-5)] += e[eeOffset2 + (-5)];
		e[eeOffset2 + (-4)] = k00 * A4 - k11 * A5;
		e[eeOffset2 + (-5)] = k11 * A4 + k00 * A5;
		k00 = e[eeOffset0 + (-6)] - e[eeOffset2 + (-6)];
		k11 = e[eeOffset0 + (-7)] - e[eeOffset2 + (-7)];
		e[eeOffset0 + (-6)] += e[eeOffset2 + (-6)];
		e[eeOffset0 + (-7)] += e[eeOffset2 + (-7)];
		e[eeOffset2 + (-6)] = k00 * A6 - k11 * A7;
		e[eeOffset2 + (-7)] = k11 * A6 + k00 * A7;
		eeOffset0 -= k0;
		eeOffset2 -= k0;
	}
};
kha_audio2_ogg_tools_Mdct.iter54 = function(e,zOffset) {
	var t0 = e[zOffset];
	var t1 = e[zOffset + (-4)];
	var k00 = t0 - t1;
	var y0 = t0 + t1;
	t0 = e[zOffset + (-2)];
	t1 = e[zOffset + (-6)];
	var y2 = t0 + t1;
	var k22 = t0 - t1;
	e[zOffset] = y0 + y2;
	e[zOffset + (-2)] = y0 - y2;
	var k33 = e[zOffset + (-3)] - e[zOffset + (-7)];
	e[zOffset + (-4)] = k00 + k33;
	e[zOffset + (-6)] = k00 - k33;
	t0 = e[zOffset + (-1)];
	t1 = e[zOffset + (-5)];
	var k11 = t0 - t1;
	var y1 = t0 + t1;
	var y3 = e[zOffset + (-3)] + e[zOffset + (-7)];
	e[zOffset + (-1)] = y1 + y3;
	e[zOffset + (-3)] = y1 - y3;
	e[zOffset + (-5)] = k11 - k22;
	e[zOffset + (-7)] = k11 + k22;
};
kha_audio2_ogg_tools_Mdct.step3InnerSLoopLd654 = function(n,e,i_off,a,baseN) {
	var A2 = a[baseN >> 3];
	var zOffset = i_off;
	var baseOffset = i_off - 16 * n;
	while(zOffset > baseOffset) {
		var t0 = e[zOffset];
		var t1 = e[zOffset + (-8)];
		e[zOffset + (-8)] = t0 - t1;
		e[zOffset] = t0 + t1;
		t0 = e[zOffset + (-1)];
		t1 = e[zOffset + (-9)];
		e[zOffset + (-9)] = t0 - t1;
		e[zOffset + (-1)] = t0 + t1;
		t0 = e[zOffset + (-2)];
		t1 = e[zOffset + (-10)];
		var k00 = t0 - t1;
		e[zOffset + (-2)] = t0 + t1;
		t0 = e[zOffset + (-3)];
		t1 = e[zOffset + (-11)];
		var k11 = t0 - t1;
		e[zOffset + (-3)] = t0 + t1;
		e[zOffset + (-10)] = (k00 + k11) * A2;
		e[zOffset + (-11)] = (k11 - k00) * A2;
		t0 = e[zOffset + (-4)];
		t1 = e[zOffset + (-12)];
		k00 = t1 - t0;
		e[zOffset + (-4)] = t0 + t1;
		t0 = e[zOffset + (-5)];
		t1 = e[zOffset + (-13)];
		k11 = t0 - t1;
		e[zOffset + (-5)] = t0 + t1;
		e[zOffset + (-12)] = k11;
		e[zOffset + (-13)] = k00;
		t0 = e[zOffset + (-6)];
		t1 = e[zOffset + (-14)];
		k00 = t1 - t0;
		e[zOffset + (-6)] = t0 + t1;
		t0 = e[zOffset + (-7)];
		t1 = e[zOffset + (-15)];
		k11 = t0 - t1;
		e[zOffset + (-7)] = t0 + t1;
		e[zOffset + (-14)] = (k00 + k11) * A2;
		e[zOffset + (-15)] = (k00 - k11) * A2;
		var t01 = e[zOffset];
		var t11 = e[zOffset + (-4)];
		var k001 = t01 - t11;
		var y0 = t01 + t11;
		t01 = e[zOffset + (-2)];
		t11 = e[zOffset + (-6)];
		var y2 = t01 + t11;
		var k22 = t01 - t11;
		e[zOffset] = y0 + y2;
		e[zOffset + (-2)] = y0 - y2;
		var k33 = e[zOffset + (-3)] - e[zOffset + (-7)];
		e[zOffset + (-4)] = k001 + k33;
		e[zOffset + (-6)] = k001 - k33;
		t01 = e[zOffset + (-1)];
		t11 = e[zOffset + (-5)];
		var k111 = t01 - t11;
		var y1 = t01 + t11;
		var y3 = e[zOffset + (-3)] + e[zOffset + (-7)];
		e[zOffset + (-1)] = y1 + y3;
		e[zOffset + (-3)] = y1 - y3;
		e[zOffset + (-5)] = k111 - k22;
		e[zOffset + (-7)] = k111 + k22;
		var zOffset1 = zOffset - 8;
		var t02 = e[zOffset1];
		var t12 = e[zOffset1 + (-4)];
		var k002 = t02 - t12;
		var y01 = t02 + t12;
		t02 = e[zOffset1 + (-2)];
		t12 = e[zOffset1 + (-6)];
		var y21 = t02 + t12;
		var k221 = t02 - t12;
		e[zOffset1] = y01 + y21;
		e[zOffset1 + (-2)] = y01 - y21;
		var k331 = e[zOffset1 + (-3)] - e[zOffset1 + (-7)];
		e[zOffset1 + (-4)] = k002 + k331;
		e[zOffset1 + (-6)] = k002 - k331;
		t02 = e[zOffset1 + (-1)];
		t12 = e[zOffset1 + (-5)];
		var k112 = t02 - t12;
		var y11 = t02 + t12;
		var y31 = e[zOffset1 + (-3)] + e[zOffset1 + (-7)];
		e[zOffset1 + (-1)] = y11 + y31;
		e[zOffset1 + (-3)] = y11 - y31;
		e[zOffset1 + (-5)] = k112 - k221;
		e[zOffset1 + (-7)] = k112 + k221;
		zOffset -= 16;
	}
};
var kha_audio2_ogg_vorbis_Reader = function(input,seekFunc,inputLength) {
	this.seekFunc = seekFunc;
	this.inputLength = inputLength;
	this.decoder = kha_audio2_ogg_vorbis_VorbisDecoder.start(input);
	this.decoder.setupSampleNumber(seekFunc,inputLength);
	this.loopStart = this.get_header().comment.get_loopStart();
	this.loopLength = this.get_header().comment.get_loopLength();
};
$hxClasses["kha.audio2.ogg.vorbis.Reader"] = kha_audio2_ogg_vorbis_Reader;
kha_audio2_ogg_vorbis_Reader.__name__ = true;
kha_audio2_ogg_vorbis_Reader.openFromBytes = function(bytes) {
	var input = new haxe_io_BytesInput(bytes);
	var bytes1 = input;
	return new kha_audio2_ogg_vorbis_Reader(input,function(pos) {
		kha_audio2_ogg_vorbis_Reader.seekBytes(bytes1,pos);
	},bytes.length);
};
kha_audio2_ogg_vorbis_Reader.seekBytes = function(bytes,pos) {
	bytes.set_position(pos);
};
kha_audio2_ogg_vorbis_Reader.readAll = function(bytes,output,useFloat) {
	if(useFloat == null) {
		useFloat = false;
	}
	var input = new haxe_io_BytesInput(bytes);
	var decoder = kha_audio2_ogg_vorbis_VorbisDecoder.start(input);
	var bytes1 = input;
	decoder.setupSampleNumber(function(pos) {
		kha_audio2_ogg_vorbis_Reader.seekBytes(bytes1,pos);
	},bytes.length);
	var header = decoder.header;
	var count = 0;
	var bufferSize = 4096;
	var this1 = new Float32Array(bufferSize * header.channel);
	var buffer = this1;
	while(true) {
		var n = decoder.read(buffer,bufferSize,header.channel,header.sampleRate,useFloat);
		var _g = 0;
		var _g1 = n * header.channel;
		while(_g < _g1) {
			var i = _g++;
			output.writeFloat(buffer[i]);
		}
		if(n == 0) {
			break;
		}
		count += n;
	}
	return decoder.header;
};
kha_audio2_ogg_vorbis_Reader.prototype = {
	decoder: null
	,get_header: function() {
		return this.decoder.header;
	}
	,get_totalSample: function() {
		return this.decoder.totalSample;
	}
	,get_totalMillisecond: function() {
		var samples = this.decoder.totalSample;
		var b = this.get_header().sampleRate;
		return UInt.toFloat(samples) / UInt.toFloat(b) * 1000;
	}
	,get_currentSample: function() {
		return this.decoder.currentSample;
	}
	,set_currentSample: function(value) {
		this.decoder.seek(this.seekFunc,this.inputLength,value);
		return this.decoder.currentSample;
	}
	,get_currentMillisecond: function() {
		var samples = this.get_currentSample();
		var b = this.get_header().sampleRate;
		return UInt.toFloat(samples) / UInt.toFloat(b) * 1000;
	}
	,set_currentMillisecond: function(value) {
		this.set_currentSample(Math.floor(UInt.toFloat(this.get_header().sampleRate) * (value / 1000)));
		return this.get_currentMillisecond();
	}
	,loopStart: null
	,loopLength: null
	,seekFunc: null
	,inputLength: null
	,read: function(output,samples,channels,sampleRate,useFloat) {
		if(useFloat == null) {
			useFloat = false;
		}
		this.decoder.ensurePosition(this.seekFunc);
		if(samples == null) {
			samples = this.decoder.totalSample;
		}
		if(channels == null) {
			channels = this.get_header().channel;
		}
		if(sampleRate == null) {
			sampleRate = this.get_header().sampleRate;
		}
		return this.decoder.read(output,samples,channels,sampleRate,useFloat);
	}
	,clone: function() {
		var reader = Object.create(kha_audio2_ogg_vorbis_Reader.prototype);
		reader.seekFunc = this.seekFunc;
		reader.inputLength = this.inputLength;
		reader.decoder = this.decoder.clone(this.seekFunc);
		reader.loopStart = this.loopStart;
		reader.loopLength = this.loopLength;
		return reader;
	}
	,sampleToMillisecond: function(samples) {
		var b = this.get_header().sampleRate;
		return UInt.toFloat(samples) / UInt.toFloat(b) * 1000;
	}
	,millisecondToSample: function(millseconds) {
		return Math.floor(UInt.toFloat(this.get_header().sampleRate) * (millseconds / 1000));
	}
	,__class__: kha_audio2_ogg_vorbis_Reader
	,__properties__: {set_currentMillisecond:"set_currentMillisecond",get_currentMillisecond:"get_currentMillisecond",set_currentSample:"set_currentSample",get_currentSample:"get_currentSample",get_totalMillisecond:"get_totalMillisecond",get_totalSample:"get_totalSample",get_header:"get_header"}
};
var kha_audio2_ogg_vorbis_VorbisDecodeState = function(input) {
	this.nextSeg = 0;
	this.firstDecode = false;
	this.bytesInSeg = 0;
	this.validBits = 0;
	this.input = input;
	this.inputPosition = 0;
	this.page = new kha_audio2_ogg_vorbis_data_Page();
	kha_audio2_ogg_tools_Crc32.init();
};
$hxClasses["kha.audio2.ogg.vorbis.VorbisDecodeState"] = kha_audio2_ogg_vorbis_VorbisDecodeState;
kha_audio2_ogg_vorbis_VorbisDecodeState.__name__ = true;
kha_audio2_ogg_vorbis_VorbisDecodeState.prototype = {
	page: null
	,eof: null
	,pFirst: null
	,pLast: null
	,validBits: null
	,inputPosition: null
	,input: null
	,discardSamplesDeferred: null
	,segments: null
	,bytesInSeg: null
	,channelBuffers: null
	,channelBufferStart: null
	,channelBufferEnd: null
	,currentSample: null
	,previousWindow: null
	,previousLength: null
	,finalY: null
	,firstDecode: null
	,nextSeg: null
	,acc: null
	,lastSeg: null
	,lastSegWhich: null
	,endSegWithKnownLoc: null
	,knownLocForPacket: null
	,error: null
	,currentLoc: null
	,currentLocValid: null
	,firstAudioPageOffset: null
	,setup: function(loc0,loc1) {
		this.inputPosition += 1;
		var segmentCount = this.input.readByte();
		this.inputPosition += segmentCount;
		var this1 = new Array(segmentCount);
		var vec = this1;
		var _g = 0;
		var _g1 = segmentCount;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		this.segments = vec;
		this.endSegWithKnownLoc = -2;
		if(loc0 != -1 || loc1 != -1) {
			var i = segmentCount - 1;
			while(i >= 0) {
				if(this.segments[i] < 255) {
					break;
				}
				if(i >= 0) {
					this.endSegWithKnownLoc = i;
					this.knownLocForPacket = loc0;
				}
				--i;
			}
		}
		if(this.firstDecode) {
			var i = 0;
			var len = 0;
			var p = new kha_audio2_ogg_vorbis_data_ProbedPage();
			var _g = 0;
			var _g1 = segmentCount;
			while(_g < _g1) {
				var i = _g++;
				len += this.segments[i];
			}
			len += 27 + segmentCount;
			p.pageStart = this.firstAudioPageOffset;
			p.pageEnd = p.pageStart + len;
			p.firstDecodedSample = 0;
			p.lastDecodedSample = loc0;
			this.pFirst = p;
		}
		this.nextSeg = 0;
	}
	,clone: function(seekFunc) {
		var state = Object.create(kha_audio2_ogg_vorbis_VorbisDecodeState.prototype);
		seekFunc(this.inputPosition);
		state.input = this.input;
		state.eof = this.eof;
		state.validBits = this.validBits;
		state.discardSamplesDeferred = this.discardSamplesDeferred;
		state.firstDecode = this.firstDecode;
		state.nextSeg = this.nextSeg;
		state.bytesInSeg = this.bytesInSeg;
		state.acc = state.acc;
		state.lastSeg = this.lastSeg;
		state.lastSegWhich = this.lastSegWhich;
		state.currentLoc = this.currentLoc;
		state.currentLocValid = this.currentLocValid;
		state.inputPosition = this.inputPosition;
		state.firstAudioPageOffset = this.firstAudioPageOffset;
		state.error = this.error;
		state.segments = this.segments;
		state.pFirst = this.pFirst;
		state.pLast = this.pLast;
		state.page = this.page.clone();
		return state;
	}
	,next: function() {
		if(this.lastSeg) {
			return 0;
		}
		if(this.nextSeg == -1) {
			this.lastSegWhich = this.segments.length - 1;
			try {
				this.page.start(this);
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(((_g1) instanceof kha_audio2_ogg_vorbis_data_ReaderError)) {
					var e = _g1;
					this.lastSeg = true;
					this.error = e;
					return 0;
				} else {
					throw _g;
				}
			}
			if((this.page.flag & 1) == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CONTINUED_PACKET_FLAG_INVALID,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 171, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "next"}));
			}
		}
		var len = this.segments[this.nextSeg++];
		if(len < 255) {
			this.lastSeg = true;
			this.lastSegWhich = this.nextSeg - 1;
		}
		if(this.nextSeg >= this.segments.length) {
			this.nextSeg = -1;
		}
		this.bytesInSeg = len;
		return len;
	}
	,startPacket: function() {
		while(this.nextSeg == -1) {
			this.page.start(this);
			if((this.page.flag & 1) != 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 193, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "startPacket"}));
			}
		}
		this.lastSeg = false;
		this.validBits = 0;
		this.bytesInSeg = 0;
	}
	,maybeStartPacket: function() {
		if(this.nextSeg == -1) {
			var eof = false;
			var x;
			try {
				this.inputPosition += 1;
				x = this.input.readByte();
			} catch( _g ) {
				if(((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
					eof = true;
					x = 0;
				} else {
					throw _g;
				}
			}
			if(eof) {
				return false;
			}
			var tmp;
			var tmp1;
			var tmp2;
			if(x == 79) {
				this.inputPosition += 1;
				tmp2 = this.input.readByte() != 103;
			} else {
				tmp2 = true;
			}
			if(!tmp2) {
				this.inputPosition += 1;
				tmp1 = this.input.readByte() != 103;
			} else {
				tmp1 = true;
			}
			if(!tmp1) {
				this.inputPosition += 1;
				tmp = this.input.readByte() != 83;
			} else {
				tmp = true;
			}
			if(tmp) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 218, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "maybeStartPacket"}));
			}
			this.page.startWithoutCapturePattern(this);
		}
		this.startPacket();
		return true;
	}
	,readBits: function(n) {
		if(this.validBits < 0) {
			return 0;
		} else if(this.validBits < n) {
			if(n > 24) {
				return this.readBits(24) + (this.readBits(n - 24) << 24);
			} else {
				if(this.validBits == 0) {
					this.acc = 0;
				}
				while(true) {
					if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
						this.validBits = -1;
						break;
					} else {
						this.bytesInSeg--;
						this.inputPosition += 1;
						this.acc = this.acc + (this.input.readByte() << this.validBits);
						this.validBits += 8;
					}
					if(!(this.validBits < n)) {
						break;
					}
				}
				if(this.validBits < 0) {
					return 0;
				} else {
					var z = this.acc & (1 << n) - 1;
					this.acc = this.acc >>> n;
					this.validBits -= n;
					return z;
				}
			}
		} else {
			var z = this.acc & (1 << n) - 1;
			this.acc = this.acc >>> n;
			this.validBits -= n;
			return z;
		}
	}
	,readPacketRaw: function() {
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			return -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			return this.input.readByte();
		}
	}
	,readPacket: function() {
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		return x;
	}
	,flushPacket: function() {
		while(this.bytesInSeg != 0 || !this.lastSeg && this.next() != 0) {
			this.bytesInSeg--;
			this.inputPosition += 1;
			this.input.readByte();
		}
	}
	,vorbisValidate: function() {
		var header = new haxe_io_Bytes(new ArrayBuffer(6));
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[0] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[1] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[2] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[3] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[4] = x;
		var x;
		if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
			x = -1;
		} else {
			this.bytesInSeg--;
			this.inputPosition += 1;
			x = this.input.readByte();
		}
		this.validBits = 0;
		header.b[5] = x;
		if(header.toString() != "vorbis") {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
		}
	}
	,firstPageValidate: function() {
		if(this.segments.length != 1) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"segmentCount",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 308, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "firstPageValidate"}));
		}
		if(this.segments[0] != 30) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"decodeState head",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 311, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "firstPageValidate"}));
		}
	}
	,startFirstDecode: function() {
		this.firstAudioPageOffset = this.inputPosition;
		this.firstDecode = true;
	}
	,capturePattern: function() {
		var tmp;
		var tmp1;
		var tmp2;
		this.inputPosition += 1;
		if(this.input.readByte() == 79) {
			this.inputPosition += 1;
			tmp2 = this.input.readByte() != 103;
		} else {
			tmp2 = true;
		}
		if(!tmp2) {
			this.inputPosition += 1;
			tmp1 = this.input.readByte() != 103;
		} else {
			tmp1 = true;
		}
		if(!tmp1) {
			this.inputPosition += 1;
			tmp = this.input.readByte() != 83;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 324, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "capturePattern"}));
		}
	}
	,skip: function(len) {
		this.inputPosition += len;
		var this1 = new Array(len);
		var vec = this1;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
	}
	,prepHuffman: function() {
		if(this.validBits <= 24) {
			if(this.validBits == 0) {
				this.acc = 0;
			}
			while(true) {
				if(this.bytesInSeg == 0 && (this.lastSeg || this.next() == 0)) {
					return;
				} else {
					this.bytesInSeg--;
					this.inputPosition += 1;
					this.acc = this.acc + (this.input.readByte() << this.validBits);
					this.validBits += 8;
				}
				if(!(this.validBits <= 24)) {
					break;
				}
			}
		}
	}
	,decode: function(c) {
		if(this.validBits < 10) {
			this.prepHuffman();
		}
		var i = c.fastHuffman[this.acc & 1023];
		var val;
		if(i >= 0) {
			var l = c.codewordLengths[i];
			this.acc = this.acc >>> l;
			this.validBits -= l;
			if(this.validBits < 0) {
				this.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = this.decodeScalarRaw(c);
		}
		if(c.sparse) {
			val = c.sortedValues[val];
		}
		return val;
	}
	,decodeRaw: function(c) {
		if(this.validBits < 10) {
			this.prepHuffman();
		}
		var i = c.fastHuffman[this.acc & 1023];
		if(i >= 0) {
			var l = c.codewordLengths[i];
			this.acc = this.acc >>> l;
			this.validBits -= l;
			if(this.validBits < 0) {
				this.validBits = 0;
				return -1;
			} else {
				return i;
			}
		} else {
			return this.decodeScalarRaw(c);
		}
	}
	,isLastByte: function() {
		if(this.bytesInSeg == 0) {
			return this.lastSeg;
		} else {
			return false;
		}
	}
	,finishDecodePacket: function(previousLength,n,r) {
		var left = r.left.start;
		var currentLocValid = false;
		var n2 = n >> 1;
		if(this.firstDecode) {
			this.currentLoc = -n2;
			this.discardSamplesDeferred = n - r.right.end;
			currentLocValid = true;
			this.firstDecode = false;
		} else if(this.discardSamplesDeferred != 0) {
			r.left.start += this.discardSamplesDeferred;
			left = r.left.start;
			this.discardSamplesDeferred = 0;
		} else {
			var tmp = previousLength == 0 && currentLocValid;
		}
		if(this.lastSegWhich == this.endSegWithKnownLoc) {
			if(currentLocValid && (this.page.flag & 4) != 0) {
				var currentEnd = this.knownLocForPacket - (n - r.right.end);
				if(currentEnd < this.currentLoc + r.right.end) {
					var len = currentEnd < this.currentLoc ? 0 : currentEnd - this.currentLoc;
					len += r.left.start;
					this.currentLoc += len;
					return { len : len, left : left, right : r.right.start};
				}
			}
			this.currentLoc = this.knownLocForPacket - (n2 - r.left.start);
			currentLocValid = true;
		}
		if(currentLocValid) {
			this.currentLoc += r.right.start - r.left.start;
		}
		return { len : r.right.end, left : left, right : r.right.start};
	}
	,readInt32: function() {
		this.inputPosition += 4;
		return this.input.readInt32();
	}
	,readByte: function() {
		this.inputPosition += 1;
		return this.input.readByte();
	}
	,read: function(n) {
		this.inputPosition += n;
		var this1 = new Array(n);
		var vec = this1;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		return vec;
	}
	,readBytes: function(n) {
		this.inputPosition += n;
		return this.input.read(n);
	}
	,readString: function(n) {
		this.inputPosition += n;
		return this.input.readString(n);
	}
	,getSampleNumber: function(seekFunc,inputLength) {
		var restoreOffset = this.inputPosition;
		var previousSafe = UInt.gte(inputLength,65536) && UInt.gte(inputLength - 65536,this.firstAudioPageOffset) ? inputLength - 65536 : this.firstAudioPageOffset;
		seekFunc(this.inputPosition = previousSafe);
		var end = 0;
		var last = false;
		var _g = this.findPage(seekFunc,inputLength);
		switch(_g._hx_index) {
		case 0:
			var e = _g.end;
			var l = _g.last;
			end = e;
			last = l;
			break;
		case 1:
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 519, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "getSampleNumber"}));
		}
		var lastPageLoc = this.inputPosition;
		_hx_loop1: while(!last) {
			seekFunc(this.inputPosition = end);
			var _g = this.findPage(seekFunc,inputLength);
			switch(_g._hx_index) {
			case 0:
				var e = _g.end;
				var l = _g.last;
				end = e;
				last = l;
				break;
			case 1:
				break _hx_loop1;
			}
			previousSafe = lastPageLoc + 1;
			lastPageLoc = this.inputPosition;
		}
		seekFunc(this.inputPosition = lastPageLoc);
		this.inputPosition += 6;
		var this1 = new Array(6);
		var vec = this1;
		var _g = 0;
		var _g1 = 6;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		var vorbisHeader = vec;
		this.inputPosition += 4;
		var lo = this.input.readInt32();
		this.inputPosition += 4;
		var hi = this.input.readInt32();
		if(lo == -1 && hi == -1 || hi > 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 553, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "getSampleNumber"}));
		}
		this.pLast = new kha_audio2_ogg_vorbis_data_ProbedPage();
		this.pLast.pageStart = lastPageLoc;
		this.pLast.pageEnd = end;
		this.pLast.lastDecodedSample = lo;
		this.pLast.firstDecodedSample = null;
		this.pLast.afterPreviousPageStart = previousSafe;
		seekFunc(this.inputPosition = restoreOffset);
		return lo;
	}
	,forcePageResync: function() {
		this.nextSeg = -1;
	}
	,setInputOffset: function(seekFunc,n) {
		seekFunc(this.inputPosition = n);
	}
	,findPage: function(seekFunc,inputLength) {
		try {
			while(true) {
				this.inputPosition += 1;
				var n = this.input.readByte();
				if(n == 79) {
					var retryLoc = this.inputPosition;
					if(retryLoc - 25 > inputLength) {
						return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
					}
					var tmp;
					var tmp1;
					this.inputPosition += 1;
					if(this.input.readByte() == 103) {
						this.inputPosition += 1;
						tmp1 = this.input.readByte() != 103;
					} else {
						tmp1 = true;
					}
					if(!tmp1) {
						this.inputPosition += 1;
						tmp = this.input.readByte() != 83;
					} else {
						tmp = true;
					}
					if(tmp) {
						continue;
					}
					var this1 = new Array(27);
					var header = this1;
					header[0] = 79;
					header[1] = 103;
					header[2] = 103;
					header[3] = 83;
					this.inputPosition += 1;
					header[4] = this.input.readByte();
					this.inputPosition += 1;
					header[5] = this.input.readByte();
					this.inputPosition += 1;
					header[6] = this.input.readByte();
					this.inputPosition += 1;
					header[7] = this.input.readByte();
					this.inputPosition += 1;
					header[8] = this.input.readByte();
					this.inputPosition += 1;
					header[9] = this.input.readByte();
					this.inputPosition += 1;
					header[10] = this.input.readByte();
					this.inputPosition += 1;
					header[11] = this.input.readByte();
					this.inputPosition += 1;
					header[12] = this.input.readByte();
					this.inputPosition += 1;
					header[13] = this.input.readByte();
					this.inputPosition += 1;
					header[14] = this.input.readByte();
					this.inputPosition += 1;
					header[15] = this.input.readByte();
					this.inputPosition += 1;
					header[16] = this.input.readByte();
					this.inputPosition += 1;
					header[17] = this.input.readByte();
					this.inputPosition += 1;
					header[18] = this.input.readByte();
					this.inputPosition += 1;
					header[19] = this.input.readByte();
					this.inputPosition += 1;
					header[20] = this.input.readByte();
					this.inputPosition += 1;
					header[21] = this.input.readByte();
					this.inputPosition += 1;
					header[22] = this.input.readByte();
					this.inputPosition += 1;
					header[23] = this.input.readByte();
					this.inputPosition += 1;
					header[24] = this.input.readByte();
					this.inputPosition += 1;
					header[25] = this.input.readByte();
					this.inputPosition += 1;
					header[26] = this.input.readByte();
					if(header[4] != 0) {
						seekFunc(this.inputPosition = retryLoc);
						continue;
					}
					var goal = header[22] + (header[23] << 8) + (header[24] << 16) + (header[25] << 24);
					header[22] = 0;
					header[23] = 0;
					header[24] = 0;
					header[25] = 0;
					var crc = 0;
					var _g = 0;
					while(_g < 27) {
						var i = _g++;
						crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[header[i] ^ crc >>> 24];
					}
					var len = 0;
					try {
						var _g1 = 0;
						var _g2 = header[26];
						while(_g1 < _g2) {
							var i1 = _g1++;
							this.inputPosition += 1;
							var s = this.input.readByte();
							crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[s ^ crc >>> 24];
							len += s;
						}
						var _g3 = 0;
						var _g4 = len;
						while(_g3 < _g4) {
							var i2 = _g3++;
							this.inputPosition += 1;
							var byte = this.input.readByte();
							crc = crc << 8 ^ kha_audio2_ogg_tools_Crc32.table[byte ^ crc >>> 24];
						}
					} catch( _g5 ) {
						if(((haxe_Exception.caught(_g5).unwrap()) instanceof haxe_io_Eof)) {
							return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
						} else {
							throw _g5;
						}
					}
					if(crc == goal) {
						var end = this.inputPosition;
						seekFunc(this.inputPosition = retryLoc - 1);
						return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.Found(end,(header[5] & 4) != 0);
					}
				}
			}
		} catch( _g ) {
			if(((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				return kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound;
			} else {
				throw _g;
			}
		}
	}
	,analyzePage: function(seekFunc,h) {
		var z = new kha_audio2_ogg_vorbis_data_ProbedPage();
		var this1 = new Array(255);
		var packetType = this1;
		z.pageStart = this.inputPosition;
		this.inputPosition += 27;
		var this1 = new Array(27);
		var vec = this1;
		var _g = 0;
		var _g1 = 27;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		var pageHeader = vec;
		var n = pageHeader[26];
		this.inputPosition += n;
		var this1 = new Array(n);
		var vec = this1;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			vec[i] = this.input.readByte();
		}
		var lacing = vec;
		var len = 0;
		var _g = 0;
		var _g1 = pageHeader[26];
		while(_g < _g1) {
			var i = _g++;
			len += lacing[i];
		}
		z.pageEnd = z.pageStart + 27 + pageHeader[26] + len;
		z.lastDecodedSample = pageHeader[6] + (pageHeader[7] << 8) + (pageHeader[8] << 16) + (pageHeader[9] << 16);
		if((pageHeader[5] & 4) != 0) {
			z.firstDecodedSample = null;
			seekFunc(this.inputPosition = z.pageStart);
			return z;
		}
		var numPacket = 0;
		var packetStart = (pageHeader[5] & 1) == 0;
		var modeCount = h.modes.length;
		var _g = 0;
		var _g1 = pageHeader[26];
		while(_g < _g1) {
			var i = _g++;
			if(packetStart) {
				if(lacing[i] == 0) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				this.inputPosition += 1;
				var n = this.input.readByte();
				if((n & 1) != 0) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				n >>= 1;
				var n1 = modeCount - 1;
				var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
				var b = n1 < 16384 ? n1 < 16 ? log2_4[n1] : n1 < 512 ? 5 + log2_4[n1 >> 5] : 10 + log2_4[n1 >> 10] : n1 < 16777216 ? n1 < 524288 ? 15 + log2_4[n1 >> 15] : 20 + log2_4[n1 >> 20] : n1 < 536870912 ? 25 + log2_4[n1 >> 25] : n1 < -2147483648 ? 30 + log2_4[n1 >> 30] : 0;
				n &= (1 << b) - 1;
				if(n >= modeCount) {
					seekFunc(this.inputPosition = z.pageStart);
					return null;
				}
				packetType[numPacket++] = h.modes[n].blockflag;
				var len = lacing[i] - 1;
				this.inputPosition += len;
				var this1 = new Array(len);
				var vec = this1;
				var _g2 = 0;
				var _g3 = len;
				while(_g2 < _g3) {
					var i1 = _g2++;
					vec[i1] = this.input.readByte();
				}
			} else {
				var len1 = lacing[i];
				this.inputPosition += len1;
				var this2 = new Array(len1);
				var vec1 = this2;
				var _g4 = 0;
				var _g5 = len1;
				while(_g4 < _g5) {
					var i2 = _g4++;
					vec1[i2] = this.input.readByte();
				}
			}
			packetStart = lacing[i] < 255;
		}
		var samples = 0;
		if(numPacket > 1) {
			samples += packetType[numPacket - 1] ? h.blocksize1 : h.blocksize0;
		}
		var i = numPacket - 2;
		while(i >= 1) {
			--i;
			if(packetType[i]) {
				if(packetType[i + 1]) {
					samples += h.blocksize1 >> 1;
				} else {
					samples += (h.blocksize1 - h.blocksize0 >> 2) + (h.blocksize0 >> 1);
				}
			} else {
				samples += h.blocksize0 >> 1;
			}
			--i;
		}
		z.firstDecodedSample = z.lastDecodedSample - samples;
		seekFunc(this.inputPosition = z.pageStart);
		return z;
	}
	,decodeScalarRaw: function(c) {
		this.prepHuffman();
		var codewordLengths = c.codewordLengths;
		var codewords = c.codewords;
		var sortedCodewords = c.sortedCodewords;
		if(c.entries > 8 ? sortedCodewords != null : codewords != null) {
			var n = this.acc;
			n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
			n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
			n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
			n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
			var code = n >>> 16 | n << 16;
			var x = 0;
			var n = c.sortedEntries;
			while(n > 1) {
				var m = x + (n >> 1);
				if(UInt.gte(code,sortedCodewords[m])) {
					x = m;
					n -= n >> 1;
				} else {
					n >>= 1;
				}
			}
			if(!c.sparse) {
				x = c.sortedValues[x];
			}
			var len = codewordLengths[x];
			if(this.validBits >= len) {
				this.acc = this.acc >>> len;
				this.validBits -= len;
				return x;
			}
			this.validBits = 0;
			return -1;
		}
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var i = _g++;
			var cl = codewordLengths[i];
			if(cl == 255) {
				continue;
			}
			if(codewords[i] == (this.acc & (1 << cl) - 1)) {
				if(this.validBits >= cl) {
					this.acc = this.acc >>> cl;
					this.validBits -= cl;
					return i;
				}
				this.validBits = 0;
				return -1;
			}
		}
		this.error = new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 847, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "decodeScalarRaw"});
		this.validBits = 0;
		return -1;
	}
	,__class__: kha_audio2_ogg_vorbis_VorbisDecodeState
};
var kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult = $hxEnums["kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult"] = { __ename__:true,__constructs__:null
	,Found: ($_=function(end,last) { return {_hx_index:0,end:end,last:last,__enum__:"kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult",toString:$estr}; },$_._hx_name="Found",$_.__params__ = ["end","last"],$_)
	,NotFound: {_hx_name:"NotFound",_hx_index:1,__enum__:"kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult",toString:$estr}
};
kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.__constructs__ = [kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.Found,kha_audio2_ogg_vorbis__$VorbisDecodeState_FindPageResult.NotFound];
var kha_audio2_ogg_vorbis_VorbisDecoder = function(header,decodeState) {
	this.header = header;
	this.decodeState = decodeState;
	this.totalSample = null;
	this.currentSample = 0;
	this.previousLength = 0;
	var this1 = new Array(header.channel);
	this.channelBuffers = this1;
	var this1 = new Array(header.channel);
	this.previousWindow = this1;
	var this1 = new Array(header.channel);
	this.finalY = this1;
	var _g = 0;
	var _g1 = header.channel;
	while(_g < _g1) {
		var i = _g++;
		var this1 = this.channelBuffers;
		var this2 = new Array(header.blocksize1);
		var vec = this2;
		this1[i] = vec;
		var this3 = this.previousWindow;
		var this4 = new Array(header.blocksize1 / 2 | 0);
		var vec1 = this4;
		this3[i] = vec1;
		this.finalY[i] = [];
	}
	var this1 = new Array(2);
	this.a = this1;
	var this1 = new Array(2);
	this.b = this1;
	var this1 = new Array(2);
	this.c = this1;
	var this1 = new Array(2);
	this.window = this1;
	var this1 = new Array(2);
	this.bitReverseData = this1;
	this.initBlocksize(0,header.blocksize0);
	this.initBlocksize(1,header.blocksize1);
};
$hxClasses["kha.audio2.ogg.vorbis.VorbisDecoder"] = kha_audio2_ogg_vorbis_VorbisDecoder;
kha_audio2_ogg_vorbis_VorbisDecoder.__name__ = true;
kha_audio2_ogg_vorbis_VorbisDecoder.start = function(input) {
	var decodeState = new kha_audio2_ogg_vorbis_VorbisDecodeState(input);
	var header = kha_audio2_ogg_vorbis_data_Header.read(decodeState);
	var decoder = new kha_audio2_ogg_vorbis_VorbisDecoder(header,decodeState);
	decodeState.startFirstDecode();
	decoder.pumpFirstFrame();
	return decoder;
};
kha_audio2_ogg_vorbis_VorbisDecoder.prototype = {
	previousWindow: null
	,previousLength: null
	,finalY: null
	,a: null
	,b: null
	,c: null
	,window: null
	,bitReverseData: null
	,channelBuffers: null
	,channelBufferStart: null
	,channelBufferEnd: null
	,header: null
	,currentSample: null
	,totalSample: null
	,decodeState: null
	,read: function(output,samples,channels,sampleRate,useFloat) {
		var b = this.header.sampleRate;
		if((UInt.toFloat(sampleRate) % UInt.toFloat(b) | 0) != 0) {
			throw haxe_Exception.thrown("Unsupported sampleRate : can't convert " + (this.header.sampleRate == null ? "null" : Std.string(UInt.toFloat(this.header.sampleRate))) + " to " + sampleRate);
		}
		if(channels % this.header.channel != 0) {
			throw haxe_Exception.thrown("Unsupported channels : can't convert " + this.header.channel + " to " + channels);
		}
		var b = this.header.sampleRate;
		var sampleRepeat = UInt.toFloat(sampleRate) / UInt.toFloat(b) | 0;
		var channelRepeat = channels / this.header.channel | 0;
		var n = 0;
		var len = Math.floor(samples / sampleRepeat);
		if(this.totalSample != null && len > this.totalSample - this.currentSample) {
			len = this.totalSample - this.currentSample;
		}
		var index = 0;
		while(n < len) {
			var k = this.channelBufferEnd - this.channelBufferStart;
			if(k >= len - n) {
				k = len - n;
			}
			var _g = this.channelBufferStart;
			var _g1 = this.channelBufferStart + k;
			while(_g < _g1) {
				var j = _g++;
				var _g2 = 0;
				var _g3 = sampleRepeat;
				while(_g2 < _g3) {
					var sr = _g2++;
					var _g4 = 0;
					var _g5 = this.header.channel;
					while(_g4 < _g5) {
						var i = _g4++;
						var _g6 = 0;
						var _g7 = channelRepeat;
						while(_g6 < _g7) {
							var cr = _g6++;
							var value = this.channelBuffers[i][j];
							if(value > 1) {
								value = 1;
							} else if(value < -1) {
								value = -1;
							}
							if(useFloat) {
								output[index] = value;
								++index;
							}
						}
					}
				}
			}
			n += k;
			this.channelBufferStart += k;
			if(n == len || this.getFrameFloat() == 0) {
				break;
			}
		}
		var _g = n;
		var _g1 = len;
		while(_g < _g1) {
			var j = _g++;
			var _g2 = 0;
			var _g3 = sampleRepeat;
			while(_g2 < _g3) {
				var sr = _g2++;
				var _g4 = 0;
				var _g5 = this.header.channel;
				while(_g4 < _g5) {
					var i = _g4++;
					var _g6 = 0;
					var _g7 = channelRepeat;
					while(_g6 < _g7) {
						var cr = _g6++;
						if(useFloat) {
							output[index] = 0;
							++index;
						}
					}
				}
			}
		}
		this.currentSample += len;
		return len * sampleRepeat;
	}
	,skipSamples: function(len) {
		var n = 0;
		if(this.totalSample != null && len > this.totalSample - this.currentSample) {
			len = this.totalSample - this.currentSample;
		}
		while(n < len) {
			var k = this.channelBufferEnd - this.channelBufferStart;
			if(k >= len - n) {
				k = len - n;
			}
			n += k;
			this.channelBufferStart += k;
			if(n == len || this.getFrameFloat() == 0) {
				break;
			}
		}
		this.currentSample += len;
		return len;
	}
	,setupSampleNumber: function(seekFunc,inputLength) {
		if(this.totalSample == null) {
			this.totalSample = this.decodeState.getSampleNumber(seekFunc,inputLength);
		}
	}
	,seek: function(seekFunc,inputLength,sampleNumber) {
		if(this.currentSample == sampleNumber) {
			return;
		}
		if(this.totalSample == null) {
			this.setupSampleNumber(seekFunc,inputLength);
			if(this.totalSample == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 187, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
			}
		}
		if(sampleNumber < 0) {
			sampleNumber = 0;
		}
		var p0 = this.decodeState.pFirst;
		var p1 = this.decodeState.pLast;
		if(sampleNumber >= p1.lastDecodedSample) {
			sampleNumber = p1.lastDecodedSample - 1;
		}
		if(sampleNumber < p0.lastDecodedSample) {
			this.seekFrameFromPage(seekFunc,p0.pageStart,0,sampleNumber);
		} else {
			var attempts = 0;
			while(p0.pageEnd < p1.pageStart) {
				var startOffset = p0.pageEnd;
				var endOffset = p1.afterPreviousPageStart;
				var startSample = p0.lastDecodedSample;
				var endSample = p1.lastDecodedSample;
				if(startSample == null || endSample == null) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 219, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				if(UInt.gt(endOffset,startOffset + 4000)) {
					endOffset = endOffset - 4000;
				}
				var probe = startOffset + Math.floor(UInt.toFloat(endOffset - startOffset) / UInt.toFloat(endSample - startSample) * (sampleNumber - startSample));
				if(attempts >= 4) {
					var probe2 = startOffset + (endOffset - startOffset >>> 1);
					probe = attempts >= 8 ? probe2 : UInt.gt(probe2,probe) ? probe + (probe2 - probe >>> 1) : probe2 + (probe - probe2 >>> 1);
				}
				++attempts;
				seekFunc(this.decodeState.inputPosition = probe);
				var _g = this.decodeState.findPage(seekFunc,inputLength);
				switch(_g._hx_index) {
				case 0:
					var _g1 = _g.end;
					var _g2 = _g.last;
					break;
				case 1:
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 249, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				var q = this.decodeState.analyzePage(seekFunc,this.header);
				if(q == null) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 255, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
				}
				q.afterPreviousPageStart = probe;
				if(q.pageStart == p1.pageStart) {
					p1 = q;
					continue;
				}
				if(sampleNumber < q.lastDecodedSample) {
					p1 = q;
				} else {
					p0 = q;
				}
			}
			if(p0.lastDecodedSample <= sampleNumber && sampleNumber < p1.lastDecodedSample) {
				this.seekFrameFromPage(seekFunc,p1.pageStart,p0.lastDecodedSample,sampleNumber);
			} else {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 275, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "seek"}));
			}
		}
	}
	,seekFrameFromPage: function(seekFunc,pageStart,firstSample,targetSample) {
		var frame = 0;
		var frameStart = firstSample;
		seekFunc(this.decodeState.inputPosition = pageStart);
		this.decodeState.nextSeg = -1;
		var leftEnd = 0;
		var leftStart = 0;
		var prevState = null;
		var lastState = null;
		while(true) {
			prevState = lastState;
			lastState = this.decodeState.clone(seekFunc);
			var initialResult = this.decodeInitial();
			if(initialResult == null) {
				lastState = prevState;
				break;
			}
			leftStart = initialResult.left.start;
			leftEnd = initialResult.left.end;
			var start = frame == 0 ? leftEnd : leftStart;
			if(targetSample < frameStart + initialResult.right.start - start) {
				break;
			}
			var _this = this.decodeState;
			while(_this.bytesInSeg != 0 || !_this.lastSeg && _this.next() != 0) {
				_this.bytesInSeg--;
				_this.inputPosition += 1;
				_this.input.readByte();
			}
			frameStart += initialResult.right.start - start;
			++frame;
		}
		this.decodeState = lastState;
		seekFunc(this.decodeState.inputPosition);
		this.previousLength = 0;
		this.pumpFirstFrame();
		this.currentSample = frameStart;
		this.skipSamples(targetSample - frameStart);
	}
	,clone: function(seekFunc) {
		var decoder = Object.create(kha_audio2_ogg_vorbis_VorbisDecoder.prototype);
		decoder.currentSample = this.currentSample;
		decoder.totalSample = this.totalSample;
		decoder.previousLength = this.previousLength;
		decoder.channelBufferStart = this.channelBufferStart;
		decoder.channelBufferEnd = this.channelBufferEnd;
		decoder.a = this.a;
		decoder.b = this.b;
		decoder.c = this.c;
		decoder.window = this.window;
		decoder.bitReverseData = this.bitReverseData;
		decoder.header = this.header;
		decoder.decodeState = this.decodeState.clone(seekFunc);
		var this1 = new Array(this.header.channel);
		decoder.channelBuffers = this1;
		var this1 = new Array(this.header.channel);
		decoder.previousWindow = this1;
		var this1 = new Array(this.header.channel);
		decoder.finalY = this1;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			decoder.channelBuffers[i] = kha_audio2_ogg_vorbis_VorbisTools.copyVector(this.channelBuffers[i]);
			decoder.previousWindow[i] = kha_audio2_ogg_vorbis_VorbisTools.copyVector(this.previousWindow[i]);
			decoder.finalY[i] = Lambda.array(this.finalY[i]);
		}
		return decoder;
	}
	,ensurePosition: function(seekFunc) {
		seekFunc(this.decodeState.inputPosition);
	}
	,getFrameFloat: function() {
		var result = this.decodePacket();
		if(result == null) {
			this.channelBufferStart = this.channelBufferEnd = 0;
			return 0;
		}
		var len = this.finishFrame(result);
		this.channelBufferStart = result.left;
		this.channelBufferEnd = result.left + len;
		return len;
	}
	,pumpFirstFrame: function() {
		this.finishFrame(this.decodePacket());
	}
	,finishFrame: function(r) {
		var len = r.len;
		var right = r.right;
		var left = r.left;
		if(this.previousLength != 0) {
			var n = this.previousLength;
			var w = this.getWindow(n);
			var _g = 0;
			var _g1 = this.header.channel;
			while(_g < _g1) {
				var i = _g++;
				var cb = this.channelBuffers[i];
				var pw = this.previousWindow[i];
				var _g2 = 0;
				var _g3 = n;
				while(_g2 < _g3) {
					var j = _g2++;
					cb[left + j] = cb[left + j] * w[j] + pw[j] * w[n - 1 - j];
				}
			}
		}
		var prev = this.previousLength;
		this.previousLength = len - right;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			var pw = this.previousWindow[i];
			var cb = this.channelBuffers[i];
			var _g2 = 0;
			var _g3 = len - right;
			while(_g2 < _g3) {
				var j = _g2++;
				pw[j] = cb[right + j];
			}
		}
		if(prev == 0) {
			return 0;
		}
		if(len < right) {
			right = len;
		}
		return right - left;
	}
	,getWindow: function(len) {
		len <<= 1;
		if(len == this.header.blocksize0) {
			return this.window[0];
		} else if(len == this.header.blocksize1) {
			return this.window[1];
		} else {
			return null;
		}
	}
	,initBlocksize: function(bs,n) {
		var n2 = n >> 1;
		var n4 = n >> 2;
		var n8 = n >> 3;
		var this1 = this.a;
		var this2 = new Array(n2);
		this1[bs] = this2;
		var this1 = this.b;
		var this2 = new Array(n2);
		this1[bs] = this2;
		var this1 = this.c;
		var this2 = new Array(n4);
		this1[bs] = this2;
		var this1 = this.window;
		var this2 = new Array(n2);
		this1[bs] = this2;
		var this1 = this.bitReverseData;
		var this2 = new Array(n8);
		this1[bs] = this2;
		kha_audio2_ogg_vorbis_VorbisTools.computeTwiddleFactors(n,this.a[bs],this.b[bs],this.c[bs]);
		kha_audio2_ogg_vorbis_VorbisTools.computeWindow(n,this.window[bs]);
		kha_audio2_ogg_vorbis_VorbisTools.computeBitReverse(n,this.bitReverseData[bs]);
	}
	,inverseMdct: function(buffer,n,blocktype) {
		var bt = blocktype ? 1 : 0;
		var a = this.a[bt];
		var b = this.b[bt];
		var c = this.c[bt];
		var bitReverse = this.bitReverseData[bt];
		var n2 = n >> 1;
		var n4 = n >> 2;
		var n8 = n >> 3;
		var this1 = new Array(n2);
		var buf2 = this1;
		var dOffset = n2 - 2;
		var aaOffset = 0;
		var eOffset = 0;
		var eStopOffset = n2;
		while(eOffset != eStopOffset) {
			buf2[dOffset + 1] = buffer[eOffset] * a[aaOffset] - buffer[eOffset + 2] * a[aaOffset + 1];
			buf2[dOffset] = buffer[eOffset] * a[aaOffset + 1] + buffer[eOffset + 2] * a[aaOffset];
			dOffset -= 2;
			aaOffset += 2;
			eOffset += 4;
		}
		eOffset = n2 - 3;
		while(dOffset >= 0) {
			buf2[dOffset + 1] = -buffer[eOffset + 2] * a[aaOffset] - -buffer[eOffset] * a[aaOffset + 1];
			buf2[dOffset] = -buffer[eOffset + 2] * a[aaOffset + 1] + -buffer[eOffset] * a[aaOffset];
			dOffset -= 2;
			aaOffset += 2;
			eOffset -= 4;
		}
		var u = buffer;
		var v = buf2;
		var aaOffset = n2 - 8;
		var eOffset0 = n4;
		var eOffset1 = 0;
		var dOffset0 = n4;
		var dOffset1 = 0;
		while(aaOffset >= 0) {
			var v41_21 = v[eOffset0 + 1] - v[eOffset1 + 1];
			var v40_20 = v[eOffset0] - v[eOffset1];
			u[dOffset0 + 1] = v[eOffset0 + 1] + v[eOffset1 + 1];
			u[dOffset0] = v[eOffset0] + v[eOffset1];
			u[dOffset1 + 1] = v41_21 * a[aaOffset + 4] - v40_20 * a[aaOffset + 5];
			u[dOffset1] = v40_20 * a[aaOffset + 4] + v41_21 * a[aaOffset + 5];
			v41_21 = v[eOffset0 + 3] - v[eOffset1 + 3];
			v40_20 = v[eOffset0 + 2] - v[eOffset1 + 2];
			u[dOffset0 + 3] = v[eOffset0 + 3] + v[eOffset1 + 3];
			u[dOffset0 + 2] = v[eOffset0 + 2] + v[eOffset1 + 2];
			u[dOffset1 + 3] = v41_21 * a[aaOffset] - v40_20 * a[aaOffset + 1];
			u[dOffset1 + 2] = v40_20 * a[aaOffset] + v41_21 * a[aaOffset + 1];
			aaOffset -= 8;
			dOffset0 += 4;
			dOffset1 += 4;
			eOffset0 += 4;
			eOffset1 += 4;
		}
		var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
		var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
		var i_off = n2 - 1 - n4 * 0;
		var eeOffset0 = i_off;
		var eeOffset2 = i_off + -(n >> 3);
		var aOffset = 0;
		var i = (n >> 4 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eeOffset0] - u[eeOffset2];
			var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
			u[eeOffset0] += u[eeOffset2];
			u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
			u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
			k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
			u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
			u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
			u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
			k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
			u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
			u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
			u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
			k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
			u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
			u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
			u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			eeOffset0 -= 8;
			eeOffset2 -= 8;
		}
		var i_off = n2 - 1 - n4;
		var eeOffset0 = i_off;
		var eeOffset2 = i_off + -(n >> 3);
		var aOffset = 0;
		var i = (n >> 4 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eeOffset0] - u[eeOffset2];
			var k01_21 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
			u[eeOffset0] += u[eeOffset2];
			u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
			u[eeOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
			k01_21 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
			u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
			u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
			u[eeOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
			k01_21 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
			u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
			u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
			u[eeOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			k00_20 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
			k01_21 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
			u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
			u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
			u[eeOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eeOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 8;
			eeOffset0 -= 8;
			eeOffset2 -= 8;
		}
		var d0 = n2 - 1 - n8 * 0;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8 * 2;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var d0 = n2 - 1 - n8 * 3;
		var aOffset = 0;
		var eOffset0 = d0;
		var eOffset2 = d0 + -(n >> 4);
		var i = (n >> 5 >> 2) + 1;
		while(--i > 0) {
			var k00_20 = u[eOffset0] - u[eOffset2];
			var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
			u[eOffset0] += u[eOffset2];
			u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
			u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
			k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
			u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
			u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
			u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
			k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
			u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
			u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
			u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			aOffset += 16;
			k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
			k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
			u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
			u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
			u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
			u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
			eOffset0 -= 8;
			eOffset2 -= 8;
			aOffset += 16;
		}
		var _g = 2;
		var _g1 = ld - 3 >> 1;
		while(_g < _g1) {
			var l = _g++;
			var k0 = n >> l + 2;
			var k0_2 = k0 >> 1;
			var lim = 1 << l + 1;
			var _g2 = 0;
			var _g3 = lim;
			while(_g2 < _g3) {
				var i = _g2++;
				var d0 = n2 - 1 - k0 * i;
				var k1 = 1 << l + 3;
				var aOffset = 0;
				var eOffset0 = d0;
				var eOffset2 = d0 + -k0_2;
				var i1 = (n >> l + 4 >> 2) + 1;
				while(--i1 > 0) {
					var k00_20 = u[eOffset0] - u[eOffset2];
					var k01_21 = u[eOffset0 + (-1)] - u[eOffset2 + (-1)];
					u[eOffset0] += u[eOffset2];
					u[eOffset0 + (-1)] += u[eOffset2 + (-1)];
					u[eOffset2] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-1)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = u[eOffset0 + (-2)] - u[eOffset2 + (-2)];
					k01_21 = u[eOffset0 + (-3)] - u[eOffset2 + (-3)];
					u[eOffset0 + (-2)] += u[eOffset2 + (-2)];
					u[eOffset0 + (-3)] += u[eOffset2 + (-3)];
					u[eOffset2 + (-2)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-3)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = u[eOffset0 + (-4)] - u[eOffset2 + (-4)];
					k01_21 = u[eOffset0 + (-5)] - u[eOffset2 + (-5)];
					u[eOffset0 + (-4)] += u[eOffset2 + (-4)];
					u[eOffset0 + (-5)] += u[eOffset2 + (-5)];
					u[eOffset2 + (-4)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-5)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					aOffset += k1;
					k00_20 = u[eOffset0 + (-6)] - u[eOffset2 + (-6)];
					k01_21 = u[eOffset0 + (-7)] - u[eOffset2 + (-7)];
					u[eOffset0 + (-6)] += u[eOffset2 + (-6)];
					u[eOffset0 + (-7)] += u[eOffset2 + (-7)];
					u[eOffset2 + (-6)] = k00_20 * a[aOffset] - k01_21 * a[aOffset + 1];
					u[eOffset2 + (-7)] = k01_21 * a[aOffset] + k00_20 * a[aOffset + 1];
					eOffset0 -= 8;
					eOffset2 -= 8;
					aOffset += k1;
				}
			}
		}
		var _g = ld - 3 >> 1;
		var _g1 = ld - 6;
		while(_g < _g1) {
			var l = _g++;
			var k0 = n >> l + 2;
			var k1 = 1 << l + 3;
			var k0_2 = k0 >> 1;
			var rlim = n >> l + 6;
			var lim = 1 << l + 1;
			var aOffset = 0;
			var i_off = n2 - 1;
			var r = rlim + 1;
			while(--r > 0) {
				var A0 = a[aOffset];
				var A1 = a[aOffset + 1];
				var A2 = a[aOffset + k1];
				var A3 = a[aOffset + k1 + 1];
				var A4 = a[aOffset + k1 * 2];
				var A5 = a[aOffset + k1 * 2 + 1];
				var A6 = a[aOffset + k1 * 3];
				var A7 = a[aOffset + k1 * 3 + 1];
				var eeOffset0 = i_off;
				var eeOffset2 = i_off + -k0_2;
				var i = lim + 1;
				while(--i > 0) {
					var k00 = u[eeOffset0] - u[eeOffset2];
					var k11 = u[eeOffset0 + (-1)] - u[eeOffset2 + (-1)];
					u[eeOffset0] += u[eeOffset2];
					u[eeOffset0 + (-1)] += u[eeOffset2 + (-1)];
					u[eeOffset2] = k00 * A0 - k11 * A1;
					u[eeOffset2 + (-1)] = k11 * A0 + k00 * A1;
					k00 = u[eeOffset0 + (-2)] - u[eeOffset2 + (-2)];
					k11 = u[eeOffset0 + (-3)] - u[eeOffset2 + (-3)];
					u[eeOffset0 + (-2)] += u[eeOffset2 + (-2)];
					u[eeOffset0 + (-3)] += u[eeOffset2 + (-3)];
					u[eeOffset2 + (-2)] = k00 * A2 - k11 * A3;
					u[eeOffset2 + (-3)] = k11 * A2 + k00 * A3;
					k00 = u[eeOffset0 + (-4)] - u[eeOffset2 + (-4)];
					k11 = u[eeOffset0 + (-5)] - u[eeOffset2 + (-5)];
					u[eeOffset0 + (-4)] += u[eeOffset2 + (-4)];
					u[eeOffset0 + (-5)] += u[eeOffset2 + (-5)];
					u[eeOffset2 + (-4)] = k00 * A4 - k11 * A5;
					u[eeOffset2 + (-5)] = k11 * A4 + k00 * A5;
					k00 = u[eeOffset0 + (-6)] - u[eeOffset2 + (-6)];
					k11 = u[eeOffset0 + (-7)] - u[eeOffset2 + (-7)];
					u[eeOffset0 + (-6)] += u[eeOffset2 + (-6)];
					u[eeOffset0 + (-7)] += u[eeOffset2 + (-7)];
					u[eeOffset2 + (-6)] = k00 * A6 - k11 * A7;
					u[eeOffset2 + (-7)] = k11 * A6 + k00 * A7;
					eeOffset0 -= k0;
					eeOffset2 -= k0;
				}
				aOffset += k1 * 4;
				i_off -= 8;
			}
		}
		var i_off = n2 - 1;
		var A2 = a[n >> 3];
		var zOffset = i_off;
		var baseOffset = i_off - 16 * (n >> 5);
		while(zOffset > baseOffset) {
			var t0 = u[zOffset];
			var t1 = u[zOffset + (-8)];
			u[zOffset + (-8)] = t0 - t1;
			u[zOffset] = t0 + t1;
			t0 = u[zOffset + (-1)];
			t1 = u[zOffset + (-9)];
			u[zOffset + (-9)] = t0 - t1;
			u[zOffset + (-1)] = t0 + t1;
			t0 = u[zOffset + (-2)];
			t1 = u[zOffset + (-10)];
			var k00 = t0 - t1;
			u[zOffset + (-2)] = t0 + t1;
			t0 = u[zOffset + (-3)];
			t1 = u[zOffset + (-11)];
			var k11 = t0 - t1;
			u[zOffset + (-3)] = t0 + t1;
			u[zOffset + (-10)] = (k00 + k11) * A2;
			u[zOffset + (-11)] = (k11 - k00) * A2;
			t0 = u[zOffset + (-4)];
			t1 = u[zOffset + (-12)];
			k00 = t1 - t0;
			u[zOffset + (-4)] = t0 + t1;
			t0 = u[zOffset + (-5)];
			t1 = u[zOffset + (-13)];
			k11 = t0 - t1;
			u[zOffset + (-5)] = t0 + t1;
			u[zOffset + (-12)] = k11;
			u[zOffset + (-13)] = k00;
			t0 = u[zOffset + (-6)];
			t1 = u[zOffset + (-14)];
			k00 = t1 - t0;
			u[zOffset + (-6)] = t0 + t1;
			t0 = u[zOffset + (-7)];
			t1 = u[zOffset + (-15)];
			k11 = t0 - t1;
			u[zOffset + (-7)] = t0 + t1;
			u[zOffset + (-14)] = (k00 + k11) * A2;
			u[zOffset + (-15)] = (k00 - k11) * A2;
			var t01 = u[zOffset];
			var t11 = u[zOffset + (-4)];
			var k001 = t01 - t11;
			var y0 = t01 + t11;
			t01 = u[zOffset + (-2)];
			t11 = u[zOffset + (-6)];
			var y2 = t01 + t11;
			var k22 = t01 - t11;
			u[zOffset] = y0 + y2;
			u[zOffset + (-2)] = y0 - y2;
			var k33 = u[zOffset + (-3)] - u[zOffset + (-7)];
			u[zOffset + (-4)] = k001 + k33;
			u[zOffset + (-6)] = k001 - k33;
			t01 = u[zOffset + (-1)];
			t11 = u[zOffset + (-5)];
			var k111 = t01 - t11;
			var y1 = t01 + t11;
			var y3 = u[zOffset + (-3)] + u[zOffset + (-7)];
			u[zOffset + (-1)] = y1 + y3;
			u[zOffset + (-3)] = y1 - y3;
			u[zOffset + (-5)] = k111 - k22;
			u[zOffset + (-7)] = k111 + k22;
			var zOffset1 = zOffset - 8;
			var t02 = u[zOffset1];
			var t12 = u[zOffset1 + (-4)];
			var k002 = t02 - t12;
			var y01 = t02 + t12;
			t02 = u[zOffset1 + (-2)];
			t12 = u[zOffset1 + (-6)];
			var y21 = t02 + t12;
			var k221 = t02 - t12;
			u[zOffset1] = y01 + y21;
			u[zOffset1 + (-2)] = y01 - y21;
			var k331 = u[zOffset1 + (-3)] - u[zOffset1 + (-7)];
			u[zOffset1 + (-4)] = k002 + k331;
			u[zOffset1 + (-6)] = k002 - k331;
			t02 = u[zOffset1 + (-1)];
			t12 = u[zOffset1 + (-5)];
			var k112 = t02 - t12;
			var y11 = t02 + t12;
			var y31 = u[zOffset1 + (-3)] + u[zOffset1 + (-7)];
			u[zOffset1 + (-1)] = y11 + y31;
			u[zOffset1 + (-3)] = y11 - y31;
			u[zOffset1 + (-5)] = k112 - k221;
			u[zOffset1 + (-7)] = k112 + k221;
			zOffset -= 16;
		}
		var brOffset = 0;
		var dOffset0 = n4 - 4;
		var dOffset1 = n2 - 4;
		while(dOffset0 >= 0) {
			var k4 = bitReverse[brOffset];
			v[dOffset1 + 3] = u[k4];
			v[dOffset1 + 2] = u[k4 + 1];
			v[dOffset0 + 3] = u[k4 + 2];
			v[dOffset0 + 2] = u[k4 + 3];
			k4 = bitReverse[brOffset + 1];
			v[dOffset1 + 1] = u[k4];
			v[dOffset1] = u[k4 + 1];
			v[dOffset0 + 1] = u[k4 + 2];
			v[dOffset0] = u[k4 + 3];
			dOffset0 -= 4;
			dOffset1 -= 4;
			brOffset += 2;
		}
		var cOffset = 0;
		var dOffset = 0;
		var eOffset = n2 - 4;
		while(dOffset < eOffset) {
			var a02 = v[dOffset] - v[eOffset + 2];
			var a11 = v[dOffset + 1] + v[eOffset + 3];
			var b0 = c[cOffset + 1] * a02 + c[cOffset] * a11;
			var b1 = c[cOffset + 1] * a11 - c[cOffset] * a02;
			var b2 = v[dOffset] + v[eOffset + 2];
			var b3 = v[dOffset + 1] - v[eOffset + 3];
			v[dOffset] = b2 + b0;
			v[dOffset + 1] = b3 + b1;
			v[eOffset + 2] = b2 - b0;
			v[eOffset + 3] = b1 - b3;
			a02 = v[dOffset + 2] - v[eOffset];
			a11 = v[dOffset + 3] + v[eOffset + 1];
			b0 = c[cOffset + 3] * a02 + c[cOffset + 2] * a11;
			b1 = c[cOffset + 3] * a11 - c[cOffset + 2] * a02;
			b2 = v[dOffset + 2] + v[eOffset];
			b3 = v[dOffset + 3] - v[eOffset + 1];
			v[dOffset + 2] = b2 + b0;
			v[dOffset + 3] = b3 + b1;
			v[eOffset] = b2 - b0;
			v[eOffset + 1] = b1 - b3;
			cOffset += 4;
			dOffset += 4;
			eOffset -= 4;
		}
		var bOffset = n2 - 8;
		var eOffset = n2 - 8;
		var dOffset0 = 0;
		var dOffset1 = n2 - 4;
		var dOffset2 = n2;
		var dOffset3 = n - 4;
		while(eOffset >= 0) {
			var p3 = buf2[eOffset + 6] * b[bOffset + 7] - buf2[eOffset + 7] * b[bOffset + 6];
			var p2 = -buf2[eOffset + 6] * b[bOffset + 6] - buf2[eOffset + 7] * b[bOffset + 7];
			buffer[dOffset0] = p3;
			buffer[dOffset1 + 3] = -p3;
			buffer[dOffset2] = p2;
			buffer[dOffset3 + 3] = p2;
			var p1 = buf2[eOffset + 4] * b[bOffset + 5] - buf2[eOffset + 5] * b[bOffset + 4];
			var p0 = -buf2[eOffset + 4] * b[bOffset + 4] - buf2[eOffset + 5] * b[bOffset + 5];
			buffer[dOffset0 + 1] = p1;
			buffer[dOffset1 + 2] = -p1;
			buffer[dOffset2 + 1] = p0;
			buffer[dOffset3 + 2] = p0;
			p3 = buf2[eOffset + 2] * b[bOffset + 3] - buf2[eOffset + 3] * b[bOffset + 2];
			p2 = -buf2[eOffset + 2] * b[bOffset + 2] - buf2[eOffset + 3] * b[bOffset + 3];
			buffer[dOffset0 + 2] = p3;
			buffer[dOffset1 + 1] = -p3;
			buffer[dOffset2 + 2] = p2;
			buffer[dOffset3 + 1] = p2;
			p1 = buf2[eOffset] * b[bOffset + 1] - buf2[eOffset + 1] * b[bOffset];
			p0 = -buf2[eOffset] * b[bOffset] - buf2[eOffset + 1] * b[bOffset + 1];
			buffer[dOffset0 + 3] = p1;
			buffer[dOffset1] = -p1;
			buffer[dOffset2 + 3] = p0;
			buffer[dOffset3] = p0;
			bOffset -= 8;
			eOffset -= 8;
			dOffset0 += 4;
			dOffset2 += 4;
			dOffset1 -= 4;
			dOffset3 -= 4;
		}
	}
	,decodePacket: function() {
		var result = this.decodeInitial();
		if(result == null) {
			return null;
		}
		var rest = this.decodePacketRest(result);
		return rest;
	}
	,decodeInitial: function() {
		this.channelBufferStart = this.channelBufferEnd = 0;
		while(true) {
			if(!this.decodeState.maybeStartPacket()) {
				return null;
			}
			if(this.decodeState.readBits(1) != 0) {
				while(true) {
					var _this = this.decodeState;
					var x;
					if(_this.bytesInSeg == 0 && (_this.lastSeg || _this.next() == 0)) {
						x = -1;
					} else {
						_this.bytesInSeg--;
						_this.inputPosition += 1;
						x = _this.input.readByte();
					}
					_this.validBits = 0;
					if(!(-1 != x)) {
						break;
					}
				}
				continue;
			}
			break;
		}
		var n = this.header.modes.length - 1;
		var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
		var i = this.decodeState.readBits(n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0);
		if(i == -1 || i >= this.header.modes.length) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 519, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "decodeInitial"}));
		}
		var m = this.header.modes[i];
		var n;
		var prev;
		var next;
		if(m.blockflag) {
			n = this.header.blocksize1;
			prev = this.decodeState.readBits(1);
			next = this.decodeState.readBits(1);
		} else {
			next = 0;
			prev = next;
			n = this.header.blocksize0;
		}
		var windowCenter = n >> 1;
		return { mode : i, left : m.blockflag && prev == 0 ? { start : n - this.header.blocksize0 >> 2, end : n + this.header.blocksize0 >> 2} : { start : 0, end : windowCenter}, right : m.blockflag && next == 0 ? { start : n * 3 - this.header.blocksize0 >> 2, end : n * 3 + this.header.blocksize0 >> 2} : { start : windowCenter, end : n}};
	}
	,decodePacketRest: function(r) {
		var len = 0;
		var m = this.header.modes[r.mode];
		var this1 = new Array(256);
		var zeroChannel = this1;
		var this1 = new Array(256);
		var reallyZeroChannel = this1;
		var n = m.blockflag ? this.header.blocksize1 : this.header.blocksize0;
		var map = this.header.mapping[m.mapping];
		var n2 = n >> 1;
		var rangeList = [256,128,86,64];
		var codebooks = this.header.codebooks;
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			var s = map.chan[i].mux;
			zeroChannel[i] = false;
			var floor = this.header.floorConfig[map.submapFloor[s]];
			if(floor.type == 0) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecoder.hx", lineNumber : 581, className : "kha.audio2.ogg.vorbis.VorbisDecoder", methodName : "decodePacketRest"}));
			} else {
				var g = floor.floor1;
				if(this.decodeState.readBits(1) != 0) {
					var fy = [];
					var this1 = new Array(256);
					var step2Flag = this1;
					var range = rangeList[g.floor1Multiplier - 1];
					var offset = 2;
					fy = this.finalY[i];
					var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
					fy[0] = this.decodeState.readBits((range < 16384 ? range < 16 ? log2_4[range] : range < 512 ? 5 + log2_4[range >> 5] : 10 + log2_4[range >> 10] : range < 16777216 ? range < 524288 ? 15 + log2_4[range >> 15] : 20 + log2_4[range >> 20] : range < 536870912 ? 25 + log2_4[range >> 25] : range < -2147483648 ? 30 + log2_4[range >> 30] : 0) - 1);
					var log2_41 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
					fy[1] = this.decodeState.readBits((range < 16384 ? range < 16 ? log2_41[range] : range < 512 ? 5 + log2_41[range >> 5] : 10 + log2_41[range >> 10] : range < 16777216 ? range < 524288 ? 15 + log2_41[range >> 15] : 20 + log2_41[range >> 20] : range < 536870912 ? 25 + log2_41[range >> 25] : range < -2147483648 ? 30 + log2_41[range >> 30] : 0) - 1);
					var _g2 = 0;
					var _g3 = g.partitions;
					while(_g2 < _g3) {
						var j = _g2++;
						var pclass = g.partitionClassList[j];
						var cdim = g.classDimensions[pclass];
						var cbits = g.classSubclasses[pclass];
						var csub = (1 << cbits) - 1;
						var cval = 0;
						if(cbits != 0) {
							var c = codebooks[g.classMasterbooks[pclass]];
							var _this = this.decodeState;
							if(_this.validBits < 10) {
								_this.prepHuffman();
							}
							var i1 = c.fastHuffman[_this.acc & 1023];
							var val;
							if(i1 >= 0) {
								var l = c.codewordLengths[i1];
								_this.acc = _this.acc >>> l;
								_this.validBits -= l;
								if(_this.validBits < 0) {
									_this.validBits = 0;
									val = -1;
								} else {
									val = i1;
								}
							} else {
								val = _this.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							cval = val;
						}
						var books = g.subclassBooks[pclass];
						var _g4 = 0;
						var _g5 = cdim;
						while(_g4 < _g5) {
							var k = _g4++;
							var book = books[cval & csub];
							cval >>= cbits;
							var tmp = offset++;
							var tmp1;
							if(book >= 0) {
								var _this1 = this.decodeState;
								var c1 = codebooks[book];
								if(_this1.validBits < 10) {
									_this1.prepHuffman();
								}
								var i2 = c1.fastHuffman[_this1.acc & 1023];
								var val1;
								if(i2 >= 0) {
									var l1 = c1.codewordLengths[i2];
									_this1.acc = _this1.acc >>> l1;
									_this1.validBits -= l1;
									if(_this1.validBits < 0) {
										_this1.validBits = 0;
										val1 = -1;
									} else {
										val1 = i2;
									}
								} else {
									val1 = _this1.decodeScalarRaw(c1);
								}
								if(c1.sparse) {
									val1 = c1.sortedValues[val1];
								}
								tmp1 = val1;
							} else {
								tmp1 = 0;
							}
							fy[tmp] = tmp1;
						}
					}
					if(this.decodeState.validBits == -1) {
						zeroChannel[i] = true;
						continue;
					}
					step2Flag[0] = step2Flag[1] = true;
					var naighbors = g.neighbors;
					var xlist = g.xlist;
					var _g6 = 2;
					var _g7 = g.values;
					while(_g6 < _g7) {
						var j1 = _g6++;
						var low = naighbors[j1][0];
						var high = naighbors[j1][1];
						var x0 = xlist[low];
						var y0 = fy[low];
						var dy = fy[high] - y0;
						var adx = xlist[high] - x0;
						var err = Math.abs(dy) * (xlist[j1] - x0);
						var off = err / adx | 0;
						var lowroom = dy < 0 ? y0 - off : y0 + off;
						var val2 = fy[j1];
						var highroom = range - lowroom;
						var room = highroom < lowroom ? highroom * 2 : lowroom * 2;
						if(val2 != 0) {
							step2Flag[low] = step2Flag[high] = true;
							step2Flag[j1] = true;
							if(val2 >= room) {
								if(highroom > lowroom) {
									fy[j1] = val2 - lowroom + lowroom;
								} else {
									fy[j1] = lowroom - val2 + highroom - 1;
								}
							} else if((val2 & 1) != 0) {
								fy[j1] = lowroom - (val2 + 1 >> 1);
							} else {
								fy[j1] = lowroom + (val2 >> 1);
							}
						} else {
							step2Flag[j1] = false;
							fy[j1] = lowroom;
						}
					}
					var _g8 = 0;
					var _g9 = g.values;
					while(_g8 < _g9) {
						var j2 = _g8++;
						if(!step2Flag[j2]) {
							fy[j2] = -1;
						}
					}
				} else {
					zeroChannel[i] = true;
				}
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			reallyZeroChannel[i] = zeroChannel[i];
		}
		var _g = 0;
		var _g1 = map.couplingSteps;
		while(_g < _g1) {
			var i = _g++;
			if(!zeroChannel[map.chan[i].magnitude] || !zeroChannel[map.chan[i].angle]) {
				zeroChannel[map.chan[i].magnitude] = zeroChannel[map.chan[i].angle] = false;
			}
		}
		var _g = 0;
		var _g1 = map.submaps;
		while(_g < _g1) {
			var i = _g++;
			var this1 = new Array(this.header.channel);
			var residueBuffers = this1;
			var this2 = new Array(256);
			var doNotDecode = this2;
			var ch = 0;
			var _g2 = 0;
			var _g3 = this.header.channel;
			while(_g2 < _g3) {
				var j = _g2++;
				if(map.chan[j].mux == i) {
					if(zeroChannel[j]) {
						doNotDecode[ch] = true;
						residueBuffers[ch] = null;
					} else {
						doNotDecode[ch] = false;
						residueBuffers[ch] = this.channelBuffers[j];
					}
					++ch;
				}
			}
			var r1 = map.submapResidue[i];
			var residue = this.header.residueConfig[r1];
			residue.decode(this.decodeState,this.header,residueBuffers,ch,n2,doNotDecode,this.channelBuffers);
		}
		var i = map.couplingSteps;
		var n2 = n >> 1;
		while(--i >= 0) {
			var m1 = this.channelBuffers[map.chan[i].magnitude];
			var a = this.channelBuffers[map.chan[i].angle];
			var _g = 0;
			var _g1 = n2;
			while(_g < _g1) {
				var j = _g++;
				var a2;
				var m2;
				if(m1[j] > 0) {
					if(a[j] > 0) {
						m2 = m1[j];
						a2 = m1[j] - a[j];
					} else {
						a2 = m1[j];
						m2 = m1[j] + a[j];
					}
				} else if(a[j] > 0) {
					m2 = m1[j];
					a2 = m1[j] + a[j];
				} else {
					a2 = m1[j];
					m2 = m1[j] - a[j];
				}
				m1[j] = m2;
				a[j] = a2;
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			if(reallyZeroChannel[i]) {
				var _g2 = 0;
				var _g3 = n2;
				while(_g2 < _g3) {
					var j = _g2++;
					this.channelBuffers[i][j] = 0;
				}
			} else {
				map.doFloor(this.header.floorConfig,i,n,this.channelBuffers[i],this.finalY[i],null);
			}
		}
		var _g = 0;
		var _g1 = this.header.channel;
		while(_g < _g1) {
			var i = _g++;
			this.inverseMdct(this.channelBuffers[i],n,m.blockflag);
		}
		var _this = this.decodeState;
		while(_this.bytesInSeg != 0 || !_this.lastSeg && _this.next() != 0) {
			_this.bytesInSeg--;
			_this.inputPosition += 1;
			_this.input.readByte();
		}
		return this.decodeState.finishDecodePacket(this.previousLength,n,r);
	}
	,__class__: kha_audio2_ogg_vorbis_VorbisDecoder
};
var kha_audio2_ogg_vorbis_VorbisTools = function() { };
$hxClasses["kha.audio2.ogg.vorbis.VorbisTools"] = kha_audio2_ogg_vorbis_VorbisTools;
kha_audio2_ogg_vorbis_VorbisTools.__name__ = true;
kha_audio2_ogg_vorbis_VorbisTools.assert = function(b,p) {
};
kha_audio2_ogg_vorbis_VorbisTools.neighbors = function(x,n) {
	var low = -1;
	var high = 65536;
	var plow = 0;
	var phigh = 0;
	var _g = 0;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		if(x[i] > low && x[i] < x[n]) {
			plow = i;
			low = x[i];
		}
		if(x[i] < high && x[i] > x[n]) {
			phigh = i;
			high = x[i];
		}
	}
	return { low : plow, high : phigh};
};
kha_audio2_ogg_vorbis_VorbisTools.floatUnpack = function(x) {
	var mantissa = UInt.toFloat(x & 2097151);
	var sign = x & -2147483648;
	var exp = (x & 2145386496) >>> 21;
	var res = sign != 0 ? -mantissa : mantissa;
	return res * Math.pow(2,exp - 788);
};
kha_audio2_ogg_vorbis_VorbisTools.bitReverse = function(n) {
	n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
	n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
	n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
	n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
	return n >>> 16 | n << 16;
};
kha_audio2_ogg_vorbis_VorbisTools.pointCompare = function(a,b) {
	if(a.x < b.x) {
		return -1;
	} else if(a.x > b.x) {
		return 1;
	} else {
		return 0;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.uintAsc = function(a,b) {
	if(UInt.gt(b,a)) {
		return -1;
	} else if(a == b) {
		return 0;
	} else {
		return 1;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.lookup1Values = function(entries,dim) {
	var r = Math.exp(Math.log(entries) / dim) | 0;
	if((Math.pow(r + 1,dim) | 0) <= entries) {
		++r;
	}
	return r;
};
kha_audio2_ogg_vorbis_VorbisTools.computeWindow = function(n,$window) {
	var n2 = n >> 1;
	var _g = 0;
	var _g1 = n2;
	while(_g < _g1) {
		var i = _g++;
		$window[i] = Math.sin(1.5707963267948966 * kha_audio2_ogg_vorbis_VorbisTools.square(Math.sin((i + 0.5) / n2 * 0.5 * 3.14159265358979323846264)));
	}
};
kha_audio2_ogg_vorbis_VorbisTools.square = function(f) {
	return f * f;
};
kha_audio2_ogg_vorbis_VorbisTools.computeBitReverse = function(n,rev) {
	var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
	var ld = (n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0) - 1;
	var n8 = n >> 3;
	var _g = 0;
	var _g1 = n8;
	while(_g < _g1) {
		var i = _g++;
		var n = i;
		n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
		n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
		n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
		n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
		rev[i] = (n >>> 16 | n << 16) >>> 32 - ld + 3 << 2;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.computeTwiddleFactors = function(n,af,bf,cf) {
	var n4 = n >> 2;
	var n8 = n >> 3;
	var k2 = 0;
	var _g = 0;
	var _g1 = n4;
	while(_g < _g1) {
		var k = _g++;
		af[k2] = Math.cos(4 * k * 3.14159265358979323846264 / n);
		af[k2 + 1] = -Math.sin(4 * k * 3.14159265358979323846264 / n);
		bf[k2] = Math.cos((k2 + 1) * 3.14159265358979323846264 / n / 2) * 0.5;
		bf[k2 + 1] = Math.sin((k2 + 1) * 3.14159265358979323846264 / n / 2) * 0.5;
		k2 += 2;
	}
	var k2 = 0;
	var _g = 0;
	var _g1 = n8;
	while(_g < _g1) {
		var k = _g++;
		cf[k2] = Math.cos(2 * (k2 + 1) * 3.14159265358979323846264 / n);
		cf[k2 + 1] = -Math.sin(2 * (k2 + 1) * 3.14159265358979323846264 / n);
		k2 += 2;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.drawLine = function(output,x0,y0,x1,y1,n) {
	if(kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable == null) {
		var this1 = new Array(32);
		kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable = this1;
		var _g = 0;
		while(_g < 32) {
			var i = _g++;
			var this1 = kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable;
			var this2 = new Array(64);
			this1[i] = this2;
			var _g1 = 1;
			while(_g1 < 64) {
				var j = _g1++;
				kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[i][j] = i / j | 0;
			}
		}
	}
	var dy = y1 - y0;
	var adx = x1 - x0;
	var ady = dy < 0 ? -dy : dy;
	var base;
	var x = x0;
	var y = y0;
	var err = 0;
	var sy;
	if(adx < 64 && ady < 32) {
		if(dy < 0) {
			base = -kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[ady][adx];
			sy = base - 1;
		} else {
			base = kha_audio2_ogg_vorbis_VorbisTools.integerDivideTable[ady][adx];
			sy = base + 1;
		}
	} else {
		base = dy / adx | 0;
		sy = dy < 0 ? base - 1 : base + 1;
	}
	ady -= (base < 0 ? -base : base) * adx;
	if(x1 > n) {
		x1 = n;
	}
	output[x] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[y];
	var _g = x + 1;
	var _g1 = x1;
	while(_g < _g1) {
		var i = _g++;
		err += ady;
		if(err >= adx) {
			err -= adx;
			y += sy;
		} else {
			y += base;
		}
		output[i] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[y];
	}
};
kha_audio2_ogg_vorbis_VorbisTools.predictPoint = function(x,x0,x1,y0,y1) {
	var dy = y1 - y0;
	var adx = x1 - x0;
	var err = Math.abs(dy) * (x - x0);
	var off = err / adx | 0;
	if(dy < 0) {
		return y0 - off;
	} else {
		return y0 + off;
	}
};
kha_audio2_ogg_vorbis_VorbisTools.emptyFloatVector = function(len) {
	var this1 = new Array(len);
	var vec = this1;
	return vec;
};
kha_audio2_ogg_vorbis_VorbisTools.copyVector = function(source) {
	var this1 = new Array(source.length);
	var dest = this1;
	var _g = 0;
	var _g1 = source.length;
	while(_g < _g1) {
		var i = _g++;
		dest[i] = source[i];
	}
	return dest;
};
var kha_audio2_ogg_vorbis_data_Codebook = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Codebook"] = kha_audio2_ogg_vorbis_data_Codebook;
kha_audio2_ogg_vorbis_data_Codebook.__name__ = true;
kha_audio2_ogg_vorbis_data_Codebook.read = function(decodeState) {
	var c = new kha_audio2_ogg_vorbis_data_Codebook();
	if(decodeState.readBits(8) != 66 || decodeState.readBits(8) != 67 || decodeState.readBits(8) != 86) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 40, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	var x = decodeState.readBits(8);
	c.dimensions = (decodeState.readBits(8) << 8) + x;
	var x = decodeState.readBits(8);
	var y = decodeState.readBits(8);
	c.entries = (decodeState.readBits(8) << 16) + (y << 8) + x;
	var ordered = decodeState.readBits(1);
	c.sparse = ordered != 0 ? false : decodeState.readBits(1) != 0;
	var this1 = new Array(c.entries);
	var lengths = this1;
	if(!c.sparse) {
		c.codewordLengths = lengths;
	}
	var total = 0;
	if(ordered != 0) {
		var currentEntry = 0;
		var currentLength = decodeState.readBits(5) + 1;
		while(currentEntry < c.entries) {
			var limit = c.entries - currentEntry;
			var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			var n = decodeState.readBits(limit < 16384 ? limit < 16 ? log2_4[limit] : limit < 512 ? 5 + log2_4[limit >> 5] : 10 + log2_4[limit >> 10] : limit < 16777216 ? limit < 524288 ? 15 + log2_4[limit >> 15] : 20 + log2_4[limit >> 20] : limit < 536870912 ? 25 + log2_4[limit >> 25] : limit < -2147483648 ? 30 + log2_4[limit >> 30] : 0);
			if(currentEntry + n > c.entries) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"codebook entrys",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 67, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
			}
			var _g = 0;
			var _g1 = n;
			while(_g < _g1) {
				var i = _g++;
				lengths[currentEntry + i] = currentLength;
			}
			currentEntry += n;
			++currentLength;
		}
	} else {
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var j = _g++;
			var present = c.sparse ? decodeState.readBits(1) : 1;
			if(present != 0) {
				lengths[j] = decodeState.readBits(5) + 1;
				++total;
			} else {
				lengths[j] = 255;
			}
		}
	}
	if(c.sparse && total >= c.entries >> 2) {
		c.codewordLengths = lengths;
		c.sparse = false;
	}
	var tmp;
	if(c.sparse) {
		tmp = total;
	} else {
		var sortedCount = 0;
		var _g = 0;
		var _g1 = c.entries;
		while(_g < _g1) {
			var j = _g++;
			var l = lengths[j];
			if(l > 10 && l != 255) {
				++sortedCount;
			}
		}
		tmp = sortedCount;
	}
	c.sortedEntries = tmp;
	var values = null;
	if(!c.sparse) {
		var this1 = new Array(c.entries);
		c.codewords = this1;
	} else {
		if(c.sortedEntries != 0) {
			var this1 = new Array(c.sortedEntries);
			c.codewordLengths = this1;
			var this1 = new Array(c.entries);
			c.codewords = this1;
			var this1 = new Array(c.entries);
			values = this1;
		}
		var size = c.entries + 64 * c.sortedEntries;
	}
	if(!c.computeCodewords(lengths,c.entries,values)) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"compute codewords",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 120, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	if(c.sortedEntries != 0) {
		c.sortedCodewords = [];
		var this1 = new Array(c.sortedEntries);
		c.sortedValues = this1;
		c.computeSortedHuffman(lengths,values);
	}
	if(c.sparse) {
		values = null;
		c.codewords = null;
		lengths = null;
	}
	c.computeAcceleratedHuffman();
	c.lookupType = decodeState.readBits(4);
	if(c.lookupType > 2) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"codebook lookup type",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 143, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
	}
	if(c.lookupType > 0) {
		var x = decodeState.readBits(32);
		var mantissa = UInt.toFloat(x & 2097151);
		var sign = x & -2147483648;
		var exp = (x & 2145386496) >>> 21;
		var res = sign != 0 ? -mantissa : mantissa;
		c.minimumValue = res * Math.pow(2,exp - 788);
		var x = decodeState.readBits(32);
		var mantissa = UInt.toFloat(x & 2097151);
		var sign = x & -2147483648;
		var exp = (x & 2145386496) >>> 21;
		var res = sign != 0 ? -mantissa : mantissa;
		c.deltaValue = res * Math.pow(2,exp - 788);
		c.valueBits = decodeState.readBits(4) + 1;
		c.sequenceP = decodeState.readBits(1) != 0;
		if(c.lookupType == 1) {
			c.lookupValues = kha_audio2_ogg_vorbis_VorbisTools.lookup1Values(c.entries,c.dimensions);
		} else {
			c.lookupValues = c.entries * c.dimensions;
		}
		var this1 = new Array(c.lookupValues);
		var mults = this1;
		var _g = 0;
		var _g1 = c.lookupValues;
		while(_g < _g1) {
			var j = _g++;
			var q = decodeState.readBits(c.valueBits);
			if(q == -1) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"fail lookup",{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 161, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "read"}));
			}
			mults[j] = q;
		}
		var this1 = new Array(c.lookupValues);
		c.multiplicands = this1;
		var _g = 0;
		var _g1 = c.lookupValues;
		while(_g < _g1) {
			var j = _g++;
			c.multiplicands[j] = mults[j] * c.deltaValue + c.minimumValue;
		}
		if(c.lookupType == 2 && c.sequenceP) {
			var _g = 1;
			var _g1 = c.lookupValues;
			while(_g < _g1) {
				var j = _g++;
				c.multiplicands[j] = c.multiplicands[j - 1];
			}
			c.sequenceP = false;
		}
	}
	return c;
};
kha_audio2_ogg_vorbis_data_Codebook.prototype = {
	dimensions: null
	,entries: null
	,codewordLengths: null
	,minimumValue: null
	,deltaValue: null
	,valueBits: null
	,lookupType: null
	,sequenceP: null
	,sparse: null
	,lookupValues: null
	,multiplicands: null
	,codewords: null
	,fastHuffman: null
	,sortedCodewords: null
	,sortedValues: null
	,sortedEntries: null
	,addEntry: function(huffCode,symbol,count,len,values) {
		if(!this.sparse) {
			this.codewords[symbol] = huffCode;
		} else {
			this.codewords[count] = huffCode;
			this.codewordLengths[count] = len;
			values[count] = symbol;
		}
	}
	,includeInSort: function(len) {
		if(this.sparse) {
			return true;
		} else if(len == 255) {
			return false;
		} else if(len > 10) {
			return true;
		} else {
			return false;
		}
	}
	,computeCodewords: function(len,n,values) {
		var this1 = new Array(32);
		var available = this1;
		available[0] = 0;
		available[1] = 0;
		available[2] = 0;
		available[3] = 0;
		available[4] = 0;
		available[5] = 0;
		available[6] = 0;
		available[7] = 0;
		available[8] = 0;
		available[9] = 0;
		available[10] = 0;
		available[11] = 0;
		available[12] = 0;
		available[13] = 0;
		available[14] = 0;
		available[15] = 0;
		available[16] = 0;
		available[17] = 0;
		available[18] = 0;
		available[19] = 0;
		available[20] = 0;
		available[21] = 0;
		available[22] = 0;
		available[23] = 0;
		available[24] = 0;
		available[25] = 0;
		available[26] = 0;
		available[27] = 0;
		available[28] = 0;
		available[29] = 0;
		available[30] = 0;
		available[31] = 0;
		var k = 0;
		while(k < n) {
			if(len[k] < 255) {
				break;
			}
			++k;
		}
		if(k == n) {
			return true;
		}
		var m = 0;
		var count = m++;
		if(!this.sparse) {
			this.codewords[k] = 0;
		} else {
			this.codewords[count] = 0;
			this.codewordLengths[count] = len[k];
			values[count] = k;
		}
		var i = 0;
		while(++i <= len[k]) available[i] = 1 << 32 - i;
		i = k;
		while(++i < n) {
			var z = len[i];
			if(z == 255) {
				continue;
			}
			while(z > 0 && available[z] == 0) --z;
			if(z == 0) {
				return false;
			}
			var res = available[z];
			available[z] = 0;
			var n1 = res;
			n1 = (n1 & -1431655766) >>> 1 | (n1 & 1431655765) << 1;
			n1 = (n1 & -858993460) >>> 2 | (n1 & 858993459) << 2;
			n1 = (n1 & -252645136) >>> 4 | (n1 & 252645135) << 4;
			n1 = (n1 & -16711936) >>> 8 | (n1 & 16711935) << 8;
			var huffCode = n1 >>> 16 | n1 << 16;
			var count = m++;
			if(!this.sparse) {
				this.codewords[i] = huffCode;
			} else {
				this.codewords[count] = huffCode;
				this.codewordLengths[count] = len[i];
				values[count] = i;
			}
			if(z != len[i]) {
				var y = len[i];
				while(y > z) {
					available[y] = res + (1 << 32 - y);
					--y;
				}
			}
		}
		return true;
	}
	,computeSortedHuffman: function(lengths,values) {
		if(!this.sparse) {
			var k = 0;
			var _g = 0;
			var _g1 = this.entries;
			while(_g < _g1) {
				var i = _g++;
				var len = lengths[i];
				if(this.sparse ? true : len == 255 ? false : len > 10) {
					var n = this.codewords[i];
					n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
					n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
					n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
					n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
					this.sortedCodewords[k++] = n >>> 16 | n << 16;
				}
			}
		} else {
			var _g = 0;
			var _g1 = this.sortedEntries;
			while(_g < _g1) {
				var i = _g++;
				var n = this.codewords[i];
				n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
				n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
				n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
				n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
				this.sortedCodewords[i] = n >>> 16 | n << 16;
			}
		}
		this.sortedCodewords[this.sortedEntries] = -1;
		this.sortedCodewords.sort(kha_audio2_ogg_vorbis_VorbisTools.uintAsc);
		var len = this.sparse ? this.sortedEntries : this.entries;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			var huffLen = this.sparse ? lengths[values[i]] : lengths[i];
			if(this.sparse ? true : huffLen == 255 ? false : huffLen > 10) {
				var n = this.codewords[i];
				n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
				n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
				n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
				n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
				var code = n >>> 16 | n << 16;
				var x = 0;
				var n1 = this.sortedEntries;
				while(n1 > 1) {
					var m = x + (n1 >> 1);
					if(UInt.gte(code,this.sortedCodewords[m])) {
						x = m;
						n1 -= n1 >> 1;
					} else {
						n1 >>= 1;
					}
				}
				if(this.sparse) {
					this.sortedValues[x] = values[i];
					this.codewordLengths[x] = huffLen;
				} else {
					this.sortedValues[x] = i;
				}
			}
		}
	}
	,computeAcceleratedHuffman: function() {
		var this1 = new Array(1024);
		this.fastHuffman = this1;
		this.fastHuffman[0] = -1;
		var _g = 0;
		var _g1 = 1024;
		while(_g < _g1) {
			var i = _g++;
			this.fastHuffman[i] = -1;
		}
		var len = this.sparse ? this.sortedEntries : this.entries;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			if(this.codewordLengths[i] <= 10) {
				var z;
				if(this.sparse) {
					var n = this.sortedCodewords[i];
					n = (n & -1431655766) >>> 1 | (n & 1431655765) << 1;
					n = (n & -858993460) >>> 2 | (n & 858993459) << 2;
					n = (n & -252645136) >>> 4 | (n & 252645135) << 4;
					n = (n & -16711936) >>> 8 | (n & 16711935) << 8;
					z = n >>> 16 | n << 16;
				} else {
					z = this.codewords[i];
				}
				while(z < 1024) {
					this.fastHuffman[z] = i;
					z += 1 << this.codewordLengths[i];
				}
			}
		}
	}
	,codebookDecode: function(decodeState,output,offset,len) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		var z = val;
		var lookupValues = this.lookupValues;
		var sequenceP = this.sequenceP;
		var multiplicands = this.multiplicands;
		var minimumValue = this.minimumValue;
		if(z < 0) {
			return false;
		}
		if(len > this.dimensions) {
			len = this.dimensions;
		}
		if(this.lookupType == 1) {
			var div = 1;
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				var off = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
				var val = multiplicands[off] + last;
				output[offset + i] += val;
				if(sequenceP) {
					last = val + minimumValue;
				}
				div = div * lookupValues;
			}
			return true;
		}
		z *= this.dimensions;
		if(sequenceP) {
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				var val = multiplicands[z + i] + last;
				output[offset + i] += val;
				last = val + minimumValue;
			}
		} else {
			var last = 0.0;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				output[offset + i] += multiplicands[z + i] + last;
			}
		}
		return true;
	}
	,codebookDecodeStep: function(decodeState,output,offset,len,step) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		var z = val;
		var last = 0.0;
		if(z < 0) {
			return false;
		}
		if(len > this.dimensions) {
			len = this.dimensions;
		}
		var lookupValues = this.lookupValues;
		var sequenceP = this.sequenceP;
		var multiplicands = this.multiplicands;
		if(this.lookupType == 1) {
			var div = 1;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var i = _g++;
				var off = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
				var val = multiplicands[off] + last;
				output[offset + i * step] += val;
				if(sequenceP) {
					last = val;
				}
				div = div * lookupValues;
			}
			return true;
		}
		z *= this.dimensions;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			var val = multiplicands[z + i] + last;
			output[offset + i * step] += val;
			if(sequenceP) {
				last = val;
			}
		}
		return true;
	}
	,decodeStart: function(decodeState) {
		if(decodeState.validBits < 10) {
			decodeState.prepHuffman();
		}
		var i = this.fastHuffman[decodeState.acc & 1023];
		var val;
		if(i >= 0) {
			var l = this.codewordLengths[i];
			decodeState.acc = decodeState.acc >>> l;
			decodeState.validBits -= l;
			if(decodeState.validBits < 0) {
				decodeState.validBits = 0;
				val = -1;
			} else {
				val = i;
			}
		} else {
			val = decodeState.decodeScalarRaw(this);
		}
		if(this.sparse) {
			val = this.sortedValues[val];
		}
		return val;
	}
	,decodeDeinterleaveRepeat: function(decodeState,residueBuffers,ch,cInter,pInter,len,totalDecode) {
		var effective = this.dimensions;
		if(this.lookupType == 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 488, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "decodeDeinterleaveRepeat"}));
		}
		var multiplicands = this.multiplicands;
		var sequenceP = this.sequenceP;
		var lookupValues = this.lookupValues;
		while(totalDecode > 0) {
			var last = 0.0;
			if(decodeState.validBits < 10) {
				decodeState.prepHuffman();
			}
			var i = this.fastHuffman[decodeState.acc & 1023];
			var val;
			if(i >= 0) {
				var l = this.codewordLengths[i];
				decodeState.acc = decodeState.acc >>> l;
				decodeState.validBits -= l;
				if(decodeState.validBits < 0) {
					decodeState.validBits = 0;
					val = -1;
				} else {
					val = i;
				}
			} else {
				val = decodeState.decodeScalarRaw(this);
			}
			if(this.sparse) {
				val = this.sortedValues[val];
			}
			var z = val;
			if(z < 0) {
				if(decodeState.bytesInSeg == 0 && decodeState.lastSeg) {
					return null;
				}
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Codebook.hx", lineNumber : 503, className : "kha.audio2.ogg.vorbis.data.Codebook", methodName : "decodeDeinterleaveRepeat"}));
			}
			if(cInter + pInter * ch + effective > len * ch) {
				effective = len * ch - (pInter * ch - cInter);
			}
			if(this.lookupType == 1) {
				var div = 1;
				if(sequenceP) {
					var _g = 0;
					var _g1 = effective;
					while(_g < _g1) {
						var i1 = _g++;
						var off = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
						var val1 = multiplicands[off] + last;
						residueBuffers[cInter][pInter] += val1;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						last = val1;
						div = div * lookupValues;
					}
				} else {
					var _g2 = 0;
					var _g3 = effective;
					while(_g2 < _g3) {
						var i2 = _g2++;
						var off1 = UInt.toFloat(z / div | 0) % UInt.toFloat(lookupValues) | 0;
						var val2 = multiplicands[off1] + last;
						residueBuffers[cInter][pInter] += val2;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						div = div * lookupValues;
					}
				}
			} else {
				z *= this.dimensions;
				if(sequenceP) {
					var _g4 = 0;
					var _g5 = effective;
					while(_g4 < _g5) {
						var i3 = _g4++;
						var val3 = multiplicands[z + i3] + last;
						residueBuffers[cInter][pInter] += val3;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
						last = val3;
					}
				} else {
					var _g6 = 0;
					var _g7 = effective;
					while(_g6 < _g7) {
						var i4 = _g6++;
						var val4 = multiplicands[z + i4] + last;
						residueBuffers[cInter][pInter] += val4;
						if(++cInter == ch) {
							cInter = 0;
							++pInter;
						}
					}
				}
			}
			totalDecode -= effective;
		}
		return { cInter : cInter, pInter : pInter};
	}
	,residueDecode: function(decodeState,target,offset,n,rtype) {
		if(rtype == 0) {
			var step = n / this.dimensions | 0;
			var _g = 0;
			var _g1 = step;
			while(_g < _g1) {
				var k = _g++;
				if(!this.codebookDecodeStep(decodeState,target,offset + k,n - offset - k,step)) {
					return false;
				}
			}
		} else {
			var k = 0;
			while(k < n) {
				if(!this.codebookDecode(decodeState,target,offset,n - k)) {
					return false;
				}
				k += this.dimensions;
				offset += this.dimensions;
			}
		}
		return true;
	}
	,__class__: kha_audio2_ogg_vorbis_data_Codebook
};
var kha_audio2_ogg_vorbis_data_Comment = function() {
	this.data = new haxe_ds_StringMap();
};
$hxClasses["kha.audio2.ogg.vorbis.data.Comment"] = kha_audio2_ogg_vorbis_data_Comment;
kha_audio2_ogg_vorbis_data_Comment.__name__ = true;
kha_audio2_ogg_vorbis_data_Comment.prototype = {
	data: null
	,get_title: function() {
		return this.getString("title");
	}
	,get_loopStart: function() {
		return Std.parseInt(this.getString("loopstart"));
	}
	,get_loopLength: function() {
		return Std.parseInt(this.getString("looplength"));
	}
	,get_version: function() {
		return this.getString("version");
	}
	,get_album: function() {
		return this.getString("album");
	}
	,get_organization: function() {
		return this.getString("organization");
	}
	,get_tracknumber: function() {
		return this.getString("tracknumber");
	}
	,get_performer: function() {
		return this.getString("performer");
	}
	,get_copyright: function() {
		return this.getString("copyright");
	}
	,get_license: function() {
		return this.getString("license");
	}
	,get_artist: function() {
		return this.getString("artist");
	}
	,get_description: function() {
		return this.getString("description");
	}
	,get_genre: function() {
		return this.getString("genre");
	}
	,get_date: function() {
		return this.getString("date");
	}
	,get_location: function() {
		return this.getString("location");
	}
	,get_contact: function() {
		return this.getString("contact");
	}
	,get_isrc: function() {
		return this.getString("isrc");
	}
	,get_artists: function() {
		return this.getArray("artist");
	}
	,add: function(key,value) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			this.data.h[key].push(value);
		} else {
			var v = [value];
			this.data.h[key] = v;
		}
	}
	,getString: function(key) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			return this.data.h[key][0];
		} else {
			return null;
		}
	}
	,getArray: function(key) {
		key = key.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this.data.h,key)) {
			return this.data.h[key];
		} else {
			return null;
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Comment
	,__properties__: {get_artists:"get_artists",get_isrc:"get_isrc",get_contact:"get_contact",get_location:"get_location",get_date:"get_date",get_genre:"get_genre",get_description:"get_description",get_artist:"get_artist",get_license:"get_license",get_copyright:"get_copyright",get_performer:"get_performer",get_tracknumber:"get_tracknumber",get_organization:"get_organization",get_album:"get_album",get_version:"get_version",get_loopLength:"get_loopLength",get_loopStart:"get_loopStart",get_title:"get_title"}
};
var kha_audio2_ogg_vorbis_data_Floor = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor"] = kha_audio2_ogg_vorbis_data_Floor;
kha_audio2_ogg_vorbis_data_Floor.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor.read = function(decodeState,codebooks) {
	var floor = new kha_audio2_ogg_vorbis_data_Floor();
	floor.type = decodeState.readBits(16);
	if(floor.type > 1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 28, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
	}
	if(floor.type == 0) {
		var g = floor.floor0 = new kha_audio2_ogg_vorbis_data_Floor0();
		g.order = decodeState.readBits(8);
		g.rate = decodeState.readBits(16);
		g.barkMapSize = decodeState.readBits(16);
		g.amplitudeBits = decodeState.readBits(6);
		g.amplitudeOffset = decodeState.readBits(8);
		g.numberOfBooks = decodeState.readBits(4) + 1;
		var _g = 0;
		var _g1 = g.numberOfBooks;
		while(_g < _g1) {
			var j = _g++;
			g.bookList[j] = decodeState.readBits(8);
		}
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.FEATURE_NOT_SUPPORTED,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 41, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
	} else {
		var p = [];
		var g = floor.floor1 = new kha_audio2_ogg_vorbis_data_Floor1();
		var maxClass = -1;
		g.partitions = decodeState.readBits(5);
		var this1 = new Array(g.partitions);
		g.partitionClassList = this1;
		var _g = 0;
		var _g1 = g.partitions;
		while(_g < _g1) {
			var j = _g++;
			g.partitionClassList[j] = decodeState.readBits(4);
			if(g.partitionClassList[j] > maxClass) {
				maxClass = g.partitionClassList[j];
			}
		}
		var this1 = new Array(maxClass + 1);
		g.classDimensions = this1;
		var this1 = new Array(maxClass + 1);
		g.classMasterbooks = this1;
		var this1 = new Array(maxClass + 1);
		g.classSubclasses = this1;
		var this1 = new Array(maxClass + 1);
		g.subclassBooks = this1;
		var _g = 0;
		var _g1 = maxClass + 1;
		while(_g < _g1) {
			var j = _g++;
			g.classDimensions[j] = decodeState.readBits(3) + 1;
			g.classSubclasses[j] = decodeState.readBits(2);
			if(g.classSubclasses[j] != 0) {
				g.classMasterbooks[j] = decodeState.readBits(8);
				if(g.classMasterbooks[j] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 64, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
				}
			}
			var kl = 1 << g.classSubclasses[j];
			var this1 = g.subclassBooks;
			var this2 = new Array(kl);
			this1[j] = this2;
			var _g2 = 0;
			var _g3 = kl;
			while(_g2 < _g3) {
				var k = _g2++;
				g.subclassBooks[j][k] = decodeState.readBits(8) - 1;
				if(g.subclassBooks[j][k] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Floor.hx", lineNumber : 73, className : "kha.audio2.ogg.vorbis.data.Floor", methodName : "read"}));
				}
			}
		}
		g.floor1Multiplier = decodeState.readBits(2) + 1;
		g.rangebits = decodeState.readBits(4);
		var this1 = new Array(250);
		g.xlist = this1;
		g.xlist[0] = 0;
		g.xlist[1] = 1 << g.rangebits;
		g.values = 2;
		var _g = 0;
		var _g1 = g.partitions;
		while(_g < _g1) {
			var j = _g++;
			var c = g.partitionClassList[j];
			var _g2 = 0;
			var _g3 = g.classDimensions[c];
			while(_g2 < _g3) {
				var k = _g2++;
				g.xlist[g.values] = decodeState.readBits(g.rangebits);
				g.values++;
			}
		}
		var _g = 0;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			p.push(new kha_audio2_ogg_vorbis_data_IntPoint());
			p[j].x = g.xlist[j];
			p[j].y = j;
		}
		p.sort(kha_audio2_ogg_vorbis_VorbisTools.pointCompare);
		var this1 = new Array(g.values);
		g.sortedOrder = this1;
		var _g = 0;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			g.sortedOrder[j] = p[j].y;
		}
		var this1 = new Array(g.values);
		g.neighbors = this1;
		var _g = 2;
		var _g1 = g.values;
		while(_g < _g1) {
			var j = _g++;
			var x = g.xlist;
			var low = -1;
			var high = 65536;
			var plow = 0;
			var phigh = 0;
			var _g2 = 0;
			var _g3 = j;
			while(_g2 < _g3) {
				var i = _g2++;
				if(x[i] > low && x[i] < x[j]) {
					plow = i;
					low = x[i];
				}
				if(x[i] < high && x[i] > x[j]) {
					phigh = i;
					high = x[i];
				}
			}
			var ne_low = plow;
			var ne_high = phigh;
			var this1 = g.neighbors;
			var this2 = new Array(g.values);
			this1[j] = this2;
			g.neighbors[j][0] = ne_low;
			g.neighbors[j][1] = ne_high;
		}
	}
	return floor;
};
kha_audio2_ogg_vorbis_data_Floor.prototype = {
	floor0: null
	,floor1: null
	,type: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor
};
var kha_audio2_ogg_vorbis_data_Floor0 = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor0"] = kha_audio2_ogg_vorbis_data_Floor0;
kha_audio2_ogg_vorbis_data_Floor0.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor0.prototype = {
	order: null
	,rate: null
	,barkMapSize: null
	,amplitudeBits: null
	,amplitudeOffset: null
	,numberOfBooks: null
	,bookList: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor0
};
var kha_audio2_ogg_vorbis_data_Floor1 = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Floor1"] = kha_audio2_ogg_vorbis_data_Floor1;
kha_audio2_ogg_vorbis_data_Floor1.__name__ = true;
kha_audio2_ogg_vorbis_data_Floor1.prototype = {
	partitions: null
	,partitionClassList: null
	,classDimensions: null
	,classSubclasses: null
	,classMasterbooks: null
	,subclassBooks: null
	,xlist: null
	,sortedOrder: null
	,neighbors: null
	,floor1Multiplier: null
	,rangebits: null
	,values: null
	,__class__: kha_audio2_ogg_vorbis_data_Floor1
};
var kha_audio2_ogg_vorbis_data_Header = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Header"] = kha_audio2_ogg_vorbis_data_Header;
kha_audio2_ogg_vorbis_data_Header.__name__ = true;
kha_audio2_ogg_vorbis_data_Header.read = function(decodeState) {
	var page = decodeState.page;
	page.start(decodeState);
	if((page.flag & 2) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"not firstPage",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 46, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if((page.flag & 4) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"lastPage",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 49, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if((page.flag & 1) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"continuedPacket",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 52, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.firstPageValidate();
	decodeState.inputPosition += 1;
	if(decodeState.input.readByte() != 1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"decodeState head",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 57, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header = new haxe_io_Bytes(new ArrayBuffer(6));
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[0] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[1] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[2] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[3] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[4] = x;
	var x;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header.b[5] = x;
	if(header.toString() != "vorbis") {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
	}
	decodeState.inputPosition += 4;
	var version = decodeState.input.readInt32();
	if(version != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"vorbis version : " + version,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 66, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header = new kha_audio2_ogg_vorbis_data_Header();
	decodeState.inputPosition += 1;
	header.channel = decodeState.input.readByte();
	if(header.channel == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"no channel",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 73, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	} else if(header.channel > 16) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.TOO_MANY_CHANNELS,"too many channels",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 75, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 4;
	header.sampleRate = decodeState.input.readInt32();
	if(header.sampleRate == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,"no sampling rate",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 80, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 4;
	header.maximumBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 4;
	header.nominalBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 4;
	header.minimumBitRate = decodeState.input.readInt32();
	decodeState.inputPosition += 1;
	var x = decodeState.input.readByte();
	var log0 = x & 15;
	var log1 = x >> 4;
	header.blocksize0 = 1 << log0;
	header.blocksize1 = 1 << log1;
	if(log0 < 6 || log0 > 13) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 93, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if(log1 < 6 || log1 > 13) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 96, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	if(log0 > log1) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 99, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.inputPosition += 1;
	var x = decodeState.input.readByte();
	if((x & 1) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 105, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.page.start(decodeState);
	decodeState.startPacket();
	var len = 0;
	var output = new haxe_io_BytesOutput();
	while(true) {
		len = decodeState.next();
		if(!(len != 0)) {
			break;
		}
		decodeState.inputPosition += len;
		output.write(decodeState.input.read(len));
		decodeState.bytesInSeg = 0;
	}
	var packetInput = new haxe_io_BytesInput(output.getBytes());
	packetInput.readByte();
	packetInput.read(6);
	var vendorLength = packetInput.readInt32();
	header.vendor = packetInput.readString(vendorLength);
	header.comment = new kha_audio2_ogg_vorbis_data_Comment();
	var commentCount = packetInput.readInt32();
	var _g = 0;
	var _g1 = commentCount;
	while(_g < _g1) {
		var i = _g++;
		var n = packetInput.readInt32();
		var str = packetInput.readString(n);
		var splitter = str.indexOf("=");
		if(splitter != -1) {
			header.comment.add(str.substring(0,splitter),str.substring(splitter + 1));
		}
	}
	var x1 = packetInput.readByte();
	if((x1 & 1) == 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 141, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	decodeState.startPacket();
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	if(x1 != 5) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"setup packet",{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 149, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
	}
	var header1 = new haxe_io_Bytes(new ArrayBuffer(6));
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[0] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[1] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[2] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[3] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[4] = x1;
	var x1;
	if(decodeState.bytesInSeg == 0 && (decodeState.lastSeg || decodeState.next() == 0)) {
		x1 = -1;
	} else {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		x1 = decodeState.input.readByte();
	}
	decodeState.validBits = 0;
	header1.b[5] = x1;
	if(header1.toString() != "vorbis") {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"vorbis header",{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 301, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "vorbisValidate"}));
	}
	var codebookCount = decodeState.readBits(8) + 1;
	var this1 = new Array(codebookCount);
	header.codebooks = this1;
	var _g = 0;
	var _g1 = codebookCount;
	while(_g < _g1) {
		var i = _g++;
		header.codebooks[i] = kha_audio2_ogg_vorbis_data_Codebook.read(decodeState);
	}
	x = decodeState.readBits(6) + 1;
	var _g = 0;
	var _g1 = x;
	while(_g < _g1) {
		var i = _g++;
		if(decodeState.readBits(16) != 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 165, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
		}
	}
	var floorCount = decodeState.readBits(6) + 1;
	var this1 = new Array(floorCount);
	header.floorConfig = this1;
	var _g = 0;
	var _g1 = floorCount;
	while(_g < _g1) {
		var i = _g++;
		header.floorConfig[i] = kha_audio2_ogg_vorbis_data_Floor.read(decodeState,header.codebooks);
	}
	var residueCount = decodeState.readBits(6) + 1;
	var this1 = new Array(residueCount);
	header.residueConfig = this1;
	var _g = 0;
	var _g1 = residueCount;
	while(_g < _g1) {
		var i = _g++;
		header.residueConfig[i] = kha_audio2_ogg_vorbis_data_Residue.read(decodeState,header.codebooks);
	}
	var mappingCount = decodeState.readBits(6) + 1;
	var this1 = new Array(mappingCount);
	header.mapping = this1;
	var _g = 0;
	var _g1 = mappingCount;
	while(_g < _g1) {
		var i = _g++;
		var map = kha_audio2_ogg_vorbis_data_Mapping.read(decodeState,header.channel);
		header.mapping[i] = map;
		var _g2 = 0;
		var _g3 = map.submaps;
		while(_g2 < _g3) {
			var j = _g2++;
			if(map.submapFloor[j] >= header.floorConfig.length) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 191, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
			}
			if(map.submapResidue[j] >= header.residueConfig.length) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 194, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
			}
		}
	}
	var modeCount = decodeState.readBits(6) + 1;
	var this1 = new Array(modeCount);
	header.modes = this1;
	var _g = 0;
	var _g1 = modeCount;
	while(_g < _g1) {
		var i = _g++;
		var mode = kha_audio2_ogg_vorbis_data_Mode.read(decodeState);
		header.modes[i] = mode;
		if(mode.mapping >= header.mapping.length) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Header.hx", lineNumber : 205, className : "kha.audio2.ogg.vorbis.data.Header", methodName : "read"}));
		}
	}
	while(decodeState.bytesInSeg != 0 || !decodeState.lastSeg && decodeState.next() != 0) {
		decodeState.bytesInSeg--;
		decodeState.inputPosition += 1;
		decodeState.input.readByte();
	}
	return header;
};
kha_audio2_ogg_vorbis_data_Header.prototype = {
	maximumBitRate: null
	,nominalBitRate: null
	,minimumBitRate: null
	,sampleRate: null
	,channel: null
	,blocksize0: null
	,blocksize1: null
	,codebooks: null
	,floorConfig: null
	,residueConfig: null
	,mapping: null
	,modes: null
	,comment: null
	,vendor: null
	,__class__: kha_audio2_ogg_vorbis_data_Header
};
var kha_audio2_ogg_vorbis_data_IntPoint = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.IntPoint"] = kha_audio2_ogg_vorbis_data_IntPoint;
kha_audio2_ogg_vorbis_data_IntPoint.__name__ = true;
kha_audio2_ogg_vorbis_data_IntPoint.prototype = {
	x: null
	,y: null
	,__class__: kha_audio2_ogg_vorbis_data_IntPoint
};
var kha_audio2_ogg_vorbis_data_Mapping = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Mapping"] = kha_audio2_ogg_vorbis_data_Mapping;
kha_audio2_ogg_vorbis_data_Mapping.__name__ = true;
kha_audio2_ogg_vorbis_data_Mapping.read = function(decodeState,channels) {
	var m = new kha_audio2_ogg_vorbis_data_Mapping();
	var mappingType = decodeState.readBits(16);
	if(mappingType != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,"mapping type " + mappingType,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 22, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
	}
	var this1 = new Array(channels);
	m.chan = this1;
	var _g = 0;
	var _g1 = channels;
	while(_g < _g1) {
		var j = _g++;
		m.chan[j] = new kha_audio2_ogg_vorbis_data_MappingChannel();
	}
	if(decodeState.readBits(1) != 0) {
		m.submaps = decodeState.readBits(4) + 1;
	} else {
		m.submaps = 1;
	}
	if(decodeState.readBits(1) != 0) {
		m.couplingSteps = decodeState.readBits(8) + 1;
		var _g = 0;
		var _g1 = m.couplingSteps;
		while(_g < _g1) {
			var k = _g++;
			var n = channels - 1;
			var log2_4 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			m.chan[k].magnitude = decodeState.readBits(n < 16384 ? n < 16 ? log2_4[n] : n < 512 ? 5 + log2_4[n >> 5] : 10 + log2_4[n >> 10] : n < 16777216 ? n < 524288 ? 15 + log2_4[n >> 15] : 20 + log2_4[n >> 20] : n < 536870912 ? 25 + log2_4[n >> 25] : n < -2147483648 ? 30 + log2_4[n >> 30] : 0);
			var n1 = channels - 1;
			var log2_41 = [0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4];
			m.chan[k].angle = decodeState.readBits(n1 < 16384 ? n1 < 16 ? log2_41[n1] : n1 < 512 ? 5 + log2_41[n1 >> 5] : 10 + log2_41[n1 >> 10] : n1 < 16777216 ? n1 < 524288 ? 15 + log2_41[n1 >> 15] : 20 + log2_41[n1 >> 20] : n1 < 536870912 ? 25 + log2_41[n1 >> 25] : n1 < -2147483648 ? 30 + log2_41[n1 >> 30] : 0);
			if(m.chan[k].magnitude >= channels) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 46, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
			if(m.chan[k].angle >= channels) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 49, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
			if(m.chan[k].magnitude == m.chan[k].angle) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 52, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
		}
	} else {
		m.couplingSteps = 0;
	}
	if(decodeState.readBits(2) != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 61, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
	}
	if(m.submaps > 1) {
		var _g = 0;
		var _g1 = channels;
		while(_g < _g1) {
			var j = _g++;
			m.chan[j].mux = decodeState.readBits(4);
			if(m.chan[j].mux >= m.submaps) {
				throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 67, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "read"}));
			}
		}
	} else {
		var _g = 0;
		var _g1 = channels;
		while(_g < _g1) {
			var j = _g++;
			m.chan[j].mux = 0;
		}
	}
	var this1 = new Array(m.submaps);
	m.submapFloor = this1;
	var this1 = new Array(m.submaps);
	m.submapResidue = this1;
	var _g = 0;
	var _g1 = m.submaps;
	while(_g < _g1) {
		var j = _g++;
		decodeState.readBits(8);
		m.submapFloor[j] = decodeState.readBits(8);
		m.submapResidue[j] = decodeState.readBits(8);
	}
	return m;
};
kha_audio2_ogg_vorbis_data_Mapping.prototype = {
	couplingSteps: null
	,chan: null
	,submaps: null
	,submapFloor: null
	,submapResidue: null
	,doFloor: function(floors,i,n,target,finalY,step2Flag) {
		var n2 = n >> 1;
		var s = this.chan[i].mux;
		var floor;
		var floor = floors[this.submapFloor[s]];
		if(floor.type == 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mapping.hx", lineNumber : 94, className : "kha.audio2.ogg.vorbis.data.Mapping", methodName : "doFloor"}));
		} else {
			var g = floor.floor1;
			var lx = 0;
			var ly = finalY[0] * g.floor1Multiplier;
			var _g = 1;
			var _g1 = g.values;
			while(_g < _g1) {
				var q = _g++;
				var j = g.sortedOrder[q];
				if(finalY[j] >= 0) {
					var hy = finalY[j] * g.floor1Multiplier;
					var hx = g.xlist[j];
					kha_audio2_ogg_vorbis_VorbisTools.drawLine(target,lx,ly,hx,hy,n2);
					lx = hx;
					ly = hy;
				}
			}
			if(lx < n2) {
				var _g = lx;
				var _g1 = n2;
				while(_g < _g1) {
					var j = _g++;
					target[j] *= kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE[ly];
				}
			}
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Mapping
};
var kha_audio2_ogg_vorbis_data_MappingChannel = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.MappingChannel"] = kha_audio2_ogg_vorbis_data_MappingChannel;
kha_audio2_ogg_vorbis_data_MappingChannel.__name__ = true;
kha_audio2_ogg_vorbis_data_MappingChannel.prototype = {
	magnitude: null
	,angle: null
	,mux: null
	,__class__: kha_audio2_ogg_vorbis_data_MappingChannel
};
var kha_audio2_ogg_vorbis_data_Mode = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Mode"] = kha_audio2_ogg_vorbis_data_Mode;
kha_audio2_ogg_vorbis_data_Mode.__name__ = true;
kha_audio2_ogg_vorbis_data_Mode.read = function(decodeState) {
	var m = new kha_audio2_ogg_vorbis_data_Mode();
	m.blockflag = decodeState.readBits(1) != 0;
	m.windowtype = decodeState.readBits(16);
	m.transformtype = decodeState.readBits(16);
	m.mapping = decodeState.readBits(8);
	if(m.windowtype != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mode.hx", lineNumber : 22, className : "kha.audio2.ogg.vorbis.data.Mode", methodName : "read"}));
	}
	if(m.transformtype != 0) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Mode.hx", lineNumber : 25, className : "kha.audio2.ogg.vorbis.data.Mode", methodName : "read"}));
	}
	return m;
};
kha_audio2_ogg_vorbis_data_Mode.prototype = {
	blockflag: null
	,mapping: null
	,windowtype: null
	,transformtype: null
	,__class__: kha_audio2_ogg_vorbis_data_Mode
};
var kha_audio2_ogg_vorbis_data_Page = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Page"] = kha_audio2_ogg_vorbis_data_Page;
kha_audio2_ogg_vorbis_data_Page.__name__ = true;
kha_audio2_ogg_vorbis_data_Page.prototype = {
	flag: null
	,clone: function() {
		var page = new kha_audio2_ogg_vorbis_data_Page();
		page.flag = this.flag;
		return page;
	}
	,start: function(decodeState) {
		var tmp;
		var tmp1;
		var tmp2;
		decodeState.inputPosition += 1;
		if(decodeState.input.readByte() == 79) {
			decodeState.inputPosition += 1;
			tmp2 = decodeState.input.readByte() != 103;
		} else {
			tmp2 = true;
		}
		if(!tmp2) {
			decodeState.inputPosition += 1;
			tmp1 = decodeState.input.readByte() != 103;
		} else {
			tmp1 = true;
		}
		if(!tmp1) {
			decodeState.inputPosition += 1;
			tmp = decodeState.input.readByte() != 83;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,null,{ fileName : "kha/audio2/ogg/vorbis/VorbisDecodeState.hx", lineNumber : 324, className : "kha.audio2.ogg.vorbis.VorbisDecodeState", methodName : "capturePattern"}));
		}
		this.startWithoutCapturePattern(decodeState);
	}
	,startWithoutCapturePattern: function(decodeState) {
		decodeState.inputPosition += 1;
		var version = decodeState.input.readByte();
		if(version != 0) {
			throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM_STRUCTURE_VERSION,"" + version,{ fileName : "kha/audio2/ogg/vorbis/data/Page.hx", lineNumber : 34, className : "kha.audio2.ogg.vorbis.data.Page", methodName : "startWithoutCapturePattern"}));
		}
		decodeState.inputPosition += 1;
		this.flag = decodeState.input.readByte();
		decodeState.inputPosition += 4;
		var loc0 = decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		var loc1 = decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.inputPosition += 4;
		decodeState.input.readInt32();
		decodeState.setup(loc0,loc1);
	}
	,__class__: kha_audio2_ogg_vorbis_data_Page
};
var kha_audio2_ogg_vorbis_data_PageFlag = function() { };
$hxClasses["kha.audio2.ogg.vorbis.data.PageFlag"] = kha_audio2_ogg_vorbis_data_PageFlag;
kha_audio2_ogg_vorbis_data_PageFlag.__name__ = true;
var kha_audio2_ogg_vorbis_data_ProbedPage = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.ProbedPage"] = kha_audio2_ogg_vorbis_data_ProbedPage;
kha_audio2_ogg_vorbis_data_ProbedPage.__name__ = true;
kha_audio2_ogg_vorbis_data_ProbedPage.prototype = {
	pageStart: null
	,pageEnd: null
	,afterPreviousPageStart: null
	,firstDecodedSample: null
	,lastDecodedSample: null
	,__class__: kha_audio2_ogg_vorbis_data_ProbedPage
};
var kha_audio2_ogg_vorbis_data_ReaderError = function(type,message,posInfos) {
	if(message == null) {
		message = "";
	}
	this.type = type;
	this.message = message;
	this.posInfos = posInfos;
};
$hxClasses["kha.audio2.ogg.vorbis.data.ReaderError"] = kha_audio2_ogg_vorbis_data_ReaderError;
kha_audio2_ogg_vorbis_data_ReaderError.__name__ = true;
kha_audio2_ogg_vorbis_data_ReaderError.prototype = {
	type: null
	,message: null
	,posInfos: null
	,__class__: kha_audio2_ogg_vorbis_data_ReaderError
};
var kha_audio2_ogg_vorbis_data_ReaderErrorType = $hxEnums["kha.audio2.ogg.vorbis.data.ReaderErrorType"] = { __ename__:true,__constructs__:null
	,NEED_MORE_DATA: {_hx_name:"NEED_MORE_DATA",_hx_index:0,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_API_MIXING: {_hx_name:"INVALID_API_MIXING",_hx_index:1,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,OUTOFMEM: {_hx_name:"OUTOFMEM",_hx_index:2,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,FEATURE_NOT_SUPPORTED: {_hx_name:"FEATURE_NOT_SUPPORTED",_hx_index:3,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,TOO_MANY_CHANNELS: {_hx_name:"TOO_MANY_CHANNELS",_hx_index:4,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,FILE_OPEN_FAILURE: {_hx_name:"FILE_OPEN_FAILURE",_hx_index:5,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_WITHOUT_LENGTH: {_hx_name:"SEEK_WITHOUT_LENGTH",_hx_index:6,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,UNEXPECTED_EOF: {_hx_name:"UNEXPECTED_EOF",_hx_index:7,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_INVALID: {_hx_name:"SEEK_INVALID",_hx_index:8,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_SETUP: {_hx_name:"INVALID_SETUP",_hx_index:9,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_STREAM: {_hx_name:"INVALID_STREAM",_hx_index:10,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,MISSING_CAPTURE_PATTERN: {_hx_name:"MISSING_CAPTURE_PATTERN",_hx_index:11,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_STREAM_STRUCTURE_VERSION: {_hx_name:"INVALID_STREAM_STRUCTURE_VERSION",_hx_index:12,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,CONTINUED_PACKET_FLAG_INVALID: {_hx_name:"CONTINUED_PACKET_FLAG_INVALID",_hx_index:13,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INCORRECT_STREAM_SERIAL_NUMBER: {_hx_name:"INCORRECT_STREAM_SERIAL_NUMBER",_hx_index:14,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,INVALID_FIRST_PAGE: {_hx_name:"INVALID_FIRST_PAGE",_hx_index:15,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,BAD_PACKET_TYPE: {_hx_name:"BAD_PACKET_TYPE",_hx_index:16,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,CANT_FIND_LAST_PAGE: {_hx_name:"CANT_FIND_LAST_PAGE",_hx_index:17,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,SEEK_FAILED: {_hx_name:"SEEK_FAILED",_hx_index:18,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
	,OTHER: {_hx_name:"OTHER",_hx_index:19,__enum__:"kha.audio2.ogg.vorbis.data.ReaderErrorType",toString:$estr}
};
kha_audio2_ogg_vorbis_data_ReaderErrorType.__constructs__ = [kha_audio2_ogg_vorbis_data_ReaderErrorType.NEED_MORE_DATA,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_API_MIXING,kha_audio2_ogg_vorbis_data_ReaderErrorType.OUTOFMEM,kha_audio2_ogg_vorbis_data_ReaderErrorType.FEATURE_NOT_SUPPORTED,kha_audio2_ogg_vorbis_data_ReaderErrorType.TOO_MANY_CHANNELS,kha_audio2_ogg_vorbis_data_ReaderErrorType.FILE_OPEN_FAILURE,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_WITHOUT_LENGTH,kha_audio2_ogg_vorbis_data_ReaderErrorType.UNEXPECTED_EOF,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_INVALID,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM,kha_audio2_ogg_vorbis_data_ReaderErrorType.MISSING_CAPTURE_PATTERN,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_STREAM_STRUCTURE_VERSION,kha_audio2_ogg_vorbis_data_ReaderErrorType.CONTINUED_PACKET_FLAG_INVALID,kha_audio2_ogg_vorbis_data_ReaderErrorType.INCORRECT_STREAM_SERIAL_NUMBER,kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_FIRST_PAGE,kha_audio2_ogg_vorbis_data_ReaderErrorType.BAD_PACKET_TYPE,kha_audio2_ogg_vorbis_data_ReaderErrorType.CANT_FIND_LAST_PAGE,kha_audio2_ogg_vorbis_data_ReaderErrorType.SEEK_FAILED,kha_audio2_ogg_vorbis_data_ReaderErrorType.OTHER];
var kha_audio2_ogg_vorbis_data_Residue = function() {
};
$hxClasses["kha.audio2.ogg.vorbis.data.Residue"] = kha_audio2_ogg_vorbis_data_Residue;
kha_audio2_ogg_vorbis_data_Residue.__name__ = true;
kha_audio2_ogg_vorbis_data_Residue.read = function(decodeState,codebooks) {
	var r = new kha_audio2_ogg_vorbis_data_Residue();
	r.type = decodeState.readBits(16);
	if(r.type > 2) {
		throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Residue.hx", lineNumber : 29, className : "kha.audio2.ogg.vorbis.data.Residue", methodName : "read"}));
	}
	var this1 = new Array(64);
	var residueCascade = this1;
	r.begin = decodeState.readBits(24);
	r.end = decodeState.readBits(24);
	r.partSize = decodeState.readBits(24) + 1;
	var classifications = r.classifications = decodeState.readBits(6) + 1;
	r.classbook = decodeState.readBits(8);
	var _g = 0;
	var _g1 = r.classifications;
	while(_g < _g1) {
		var j = _g++;
		var highBits = 0;
		var lowBits = decodeState.readBits(3);
		if(decodeState.readBits(1) != 0) {
			highBits = decodeState.readBits(5);
		}
		residueCascade[j] = highBits * 8 + lowBits;
	}
	var this1 = new Array(r.classifications);
	r.residueBooks = this1;
	var _g = 0;
	var _g1 = r.classifications;
	while(_g < _g1) {
		var j = _g++;
		var this1 = r.residueBooks;
		var this2 = new Array(8);
		this1[j] = this2;
		var _g2 = 0;
		while(_g2 < 8) {
			var k = _g2++;
			if((residueCascade[j] & 1 << k) != 0) {
				r.residueBooks[j][k] = decodeState.readBits(8);
				if(r.residueBooks[j][k] >= codebooks.length) {
					throw haxe_Exception.thrown(new kha_audio2_ogg_vorbis_data_ReaderError(kha_audio2_ogg_vorbis_data_ReaderErrorType.INVALID_SETUP,null,{ fileName : "kha/audio2/ogg/vorbis/data/Residue.hx", lineNumber : 55, className : "kha.audio2.ogg.vorbis.data.Residue", methodName : "read"}));
				}
			} else {
				r.residueBooks[j][k] = -1;
			}
		}
	}
	var el = codebooks[r.classbook].entries;
	var classwords = codebooks[r.classbook].dimensions;
	var this1 = new Array(el);
	r.classdata = this1;
	var _g = 0;
	var _g1 = el;
	while(_g < _g1) {
		var j = _g++;
		var temp = j;
		var k = classwords;
		var this1 = r.classdata;
		var this2 = new Array(classwords);
		var cd = this1[j] = this2;
		while(--k >= 0) {
			cd[k] = temp % classifications;
			temp = temp / classifications | 0;
		}
	}
	return r;
};
kha_audio2_ogg_vorbis_data_Residue.prototype = {
	begin: null
	,end: null
	,partSize: null
	,classifications: null
	,classbook: null
	,classdata: null
	,residueBooks: null
	,type: null
	,decode: function(decodeState,header,residueBuffers,ch,n,doNotDecode,channelBuffers) {
		var codebooks = header.codebooks;
		var classwords = codebooks[this.classbook].dimensions;
		var nRead = this.end - this.begin;
		var partSize = this.partSize;
		var partRead = UInt.toFloat(nRead) / UInt.toFloat(partSize) | 0;
		var this1 = new Array(header.channel * partRead + 1);
		var classifications = this1;
		var _g = 0;
		var _g1 = ch;
		while(_g < _g1) {
			var i = _g++;
			if(!doNotDecode[i]) {
				var buffer = residueBuffers[i];
				var _g2 = 0;
				var _g3 = buffer.length;
				while(_g2 < _g3) {
					var j = _g2++;
					buffer[j] = 0;
				}
			}
		}
		if(this.type == 2 && ch != 1) {
			var _g = 0;
			var _g1 = ch;
			while(_g < _g1) {
				var j = _g++;
				if(!doNotDecode[j]) {
					break;
				} else if(j == ch - 1) {
					return;
				}
			}
			var _g = 0;
			while(_g < 8) {
				var pass = _g++;
				var pcount = 0;
				var classSet = 0;
				if(ch == 2) {
					while(pcount < partRead) {
						var z = this.begin + pcount * partSize;
						var cInter = z & 1;
						var pInter = z >>> 1;
						if(pass == 0) {
							var c = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i = c.fastHuffman[decodeState.acc & 1023];
							var val;
							if(i >= 0) {
								var l = c.codewordLengths[i];
								decodeState.acc = decodeState.acc >>> l;
								decodeState.validBits -= l;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val = -1;
								} else {
									val = i;
								}
							} else {
								val = decodeState.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							var q = val;
							if(q == -1) {
								return;
							}
							var i1 = classwords;
							while(--i1 >= 0) {
								classifications[i1 + pcount] = q % this.classifications;
								q = q / this.classifications | 0;
							}
						}
						var _g1 = 0;
						var _g2 = classwords;
						while(_g1 < _g2) {
							var i2 = _g1++;
							if(pcount >= partRead) {
								break;
							}
							var z1 = this.begin + pcount * partSize;
							var c1 = classifications[pcount];
							var b = this.residueBooks[c1][pass];
							if(b >= 0) {
								var book = codebooks[b];
								var result = book.decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter,pInter,n,partSize);
								if(result == null) {
									return;
								} else {
									cInter = result.cInter;
									pInter = result.pInter;
								}
							} else {
								z1 = z1 + partSize;
								cInter = z1 & 1;
								pInter = z1 >>> 1;
							}
							++pcount;
						}
					}
				} else if(ch == 1) {
					while(pcount < partRead) {
						var z2 = this.begin + pcount * partSize;
						var cInter1 = 0;
						var pInter1 = z2;
						if(pass == 0) {
							var c2 = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i3 = c2.fastHuffman[decodeState.acc & 1023];
							var val1;
							if(i3 >= 0) {
								var l1 = c2.codewordLengths[i3];
								decodeState.acc = decodeState.acc >>> l1;
								decodeState.validBits -= l1;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val1 = -1;
								} else {
									val1 = i3;
								}
							} else {
								val1 = decodeState.decodeScalarRaw(c2);
							}
							if(c2.sparse) {
								val1 = c2.sortedValues[val1];
							}
							var q1 = val1;
							if(q1 == -1) {
								return;
							}
							var i4 = classwords;
							while(--i4 >= 0) {
								classifications[i4 + pcount] = q1 % this.classifications;
								q1 = q1 / this.classifications | 0;
							}
						}
						var _g3 = 0;
						var _g4 = classwords;
						while(_g3 < _g4) {
							var i5 = _g3++;
							if(pcount >= partRead) {
								break;
							}
							var z3 = this.begin + pcount * partSize;
							var b1 = this.residueBooks[classifications[pcount]][pass];
							if(b1 >= 0) {
								var book1 = codebooks[b1];
								var result1 = book1.decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter1,pInter1,n,partSize);
								if(result1 == null) {
									return;
								} else {
									cInter1 = result1.cInter;
									pInter1 = result1.pInter;
								}
							} else {
								z3 = z3 + partSize;
								cInter1 = 0;
								pInter1 = z3;
							}
							++pcount;
						}
					}
				} else {
					while(pcount < partRead) {
						var z4 = this.begin + pcount * partSize;
						var cInter2 = UInt.toFloat(z4) % UInt.toFloat(ch) | 0;
						var pInter2 = UInt.toFloat(z4) / UInt.toFloat(ch) | 0;
						if(pass == 0) {
							var c3 = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i6 = c3.fastHuffman[decodeState.acc & 1023];
							var val2;
							if(i6 >= 0) {
								var l2 = c3.codewordLengths[i6];
								decodeState.acc = decodeState.acc >>> l2;
								decodeState.validBits -= l2;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val2 = -1;
								} else {
									val2 = i6;
								}
							} else {
								val2 = decodeState.decodeScalarRaw(c3);
							}
							if(c3.sparse) {
								val2 = c3.sortedValues[val2];
							}
							var q2 = val2;
							if(q2 == -1) {
								return;
							}
							var i7 = classwords;
							while(--i7 >= 0) {
								classifications[i7 + pcount] = q2 % this.classifications;
								q2 = q2 / this.classifications | 0;
							}
						}
						var _g5 = 0;
						var _g6 = classwords;
						while(_g5 < _g6) {
							var i8 = _g5++;
							if(pcount >= partRead) {
								break;
							}
							var z5 = this.begin + pcount * partSize;
							var b2 = this.residueBooks[classifications[pcount]][pass];
							if(b2 >= 0) {
								var book2 = codebooks[b2];
								var result2 = book2.decodeDeinterleaveRepeat(decodeState,residueBuffers,ch,cInter2,pInter2,n,partSize);
								if(result2 == null) {
									return;
								} else {
									cInter2 = result2.cInter;
									pInter2 = result2.pInter;
								}
							} else {
								z5 = z5 + partSize;
								cInter2 = UInt.toFloat(z5) % UInt.toFloat(ch) | 0;
								pInter2 = UInt.toFloat(z5) / UInt.toFloat(ch) | 0;
							}
							++pcount;
						}
					}
				}
			}
			return;
		}
		var _g = 0;
		while(_g < 8) {
			var pass = _g++;
			var pcount = 0;
			var classSet = 0;
			while(pcount < partRead) {
				if(pass == 0) {
					var _g1 = 0;
					var _g2 = ch;
					while(_g1 < _g2) {
						var j = _g1++;
						if(!doNotDecode[j]) {
							var c = codebooks[this.classbook];
							if(decodeState.validBits < 10) {
								decodeState.prepHuffman();
							}
							var i = c.fastHuffman[decodeState.acc & 1023];
							var val;
							if(i >= 0) {
								var l = c.codewordLengths[i];
								decodeState.acc = decodeState.acc >>> l;
								decodeState.validBits -= l;
								if(decodeState.validBits < 0) {
									decodeState.validBits = 0;
									val = -1;
								} else {
									val = i;
								}
							} else {
								val = decodeState.decodeScalarRaw(c);
							}
							if(c.sparse) {
								val = c.sortedValues[val];
							}
							var temp = val;
							if(temp == -1) {
								return;
							}
							var i1 = classwords;
							while(--i1 >= 0) {
								classifications[j * partRead + i1 + pcount] = temp % this.classifications;
								temp = temp / this.classifications | 0;
							}
						}
					}
				}
				var _g3 = 0;
				var _g4 = classwords;
				while(_g3 < _g4) {
					var i2 = _g3++;
					if(pcount >= partRead) {
						break;
					}
					var _g5 = 0;
					var _g6 = ch;
					while(_g5 < _g6) {
						var j1 = _g5++;
						if(!doNotDecode[j1]) {
							var c1 = classifications[j1 * partRead + pcount];
							var b = this.residueBooks[c1][pass];
							if(b >= 0) {
								var target = residueBuffers[j1];
								var offset = this.begin + pcount * partSize;
								var n = partSize;
								var book = codebooks[b];
								if(!book.residueDecode(decodeState,target,offset,n,this.type)) {
									return;
								}
							}
						}
					}
					++pcount;
				}
			}
		}
	}
	,__class__: kha_audio2_ogg_vorbis_data_Residue
};
var kha_audio2_ogg_vorbis_data_Setting = function() { };
$hxClasses["kha.audio2.ogg.vorbis.data.Setting"] = kha_audio2_ogg_vorbis_data_Setting;
kha_audio2_ogg_vorbis_data_Setting.__name__ = true;
var kha_compute_ConstantLocation = function() {
};
$hxClasses["kha.compute.ConstantLocation"] = kha_compute_ConstantLocation;
kha_compute_ConstantLocation.__name__ = true;
kha_compute_ConstantLocation.prototype = {
	__class__: kha_compute_ConstantLocation
};
var kha_compute_TextureUnit = function() {
};
$hxClasses["kha.compute.TextureUnit"] = kha_compute_TextureUnit;
kha_compute_TextureUnit.__name__ = true;
kha_compute_TextureUnit.prototype = {
	__class__: kha_compute_TextureUnit
};
var kha_graphics1_Graphics = function() { };
$hxClasses["kha.graphics1.Graphics"] = kha_graphics1_Graphics;
kha_graphics1_Graphics.__name__ = true;
kha_graphics1_Graphics.__isInterface__ = true;
kha_graphics1_Graphics.prototype = {
	begin: null
	,end: null
	,setPixel: null
	,__class__: kha_graphics1_Graphics
};
var kha_graphics2_Graphics = function() {
	this.transformations = [new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1)];
	this.transformationIndex = 0;
	this.opacities = [1];
	this.myFontSize = 12;
	this.pipe = null;
};
$hxClasses["kha.graphics2.Graphics"] = kha_graphics2_Graphics;
kha_graphics2_Graphics.__name__ = true;
kha_graphics2_Graphics.prototype = {
	begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
	}
	,end: function() {
	}
	,flush: function() {
	}
	,clear: function(color) {
	}
	,drawImage: function(img,x,y) {
		this.drawSubImage(img,x,y,0,0,img.get_width(),img.get_height());
	}
	,drawSubImage: function(img,x,y,sx,sy,sw,sh) {
		this.drawScaledSubImage(img,sx,sy,sw,sh,x,y,sw,sh);
	}
	,drawScaledImage: function(img,dx,dy,dw,dh) {
		this.drawScaledSubImage(img,0,0,img.get_width(),img.get_height(),dx,dy,dw,dh);
	}
	,drawScaledSubImage: function(image,sx,sy,sw,sh,dx,dy,dw,dh) {
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) {
			strength = 1.0;
		}
	}
	,fillRect: function(x,y,width,height) {
	}
	,drawString: function(text,x,y) {
	}
	,drawCharacters: function(text,start,length,x,y) {
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) {
			strength = 1.0;
		}
	}
	,drawVideo: function(video,x,y,width,height) {
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
	}
	,get_imageScaleQuality: function() {
		return 0;
	}
	,set_imageScaleQuality: function(value) {
		return 1;
	}
	,get_mipmapScaleQuality: function() {
		return 0;
	}
	,set_mipmapScaleQuality: function(value) {
		return 1;
	}
	,get_color: function() {
		return -16777216;
	}
	,set_color: function(color) {
		return -16777216;
	}
	,get_font: function() {
		return null;
	}
	,set_font: function(font) {
		return null;
	}
	,get_fontSize: function() {
		return this.myFontSize;
	}
	,set_fontSize: function(value) {
		return this.myFontSize = value;
	}
	,get_transformation: function() {
		return this.transformations[this.transformationIndex];
	}
	,set_transformation: function(transformation) {
		this.setTransformation(transformation);
		var _this = this.transformations[this.transformationIndex];
		_this._00 = transformation._00;
		_this._10 = transformation._10;
		_this._20 = transformation._20;
		_this._01 = transformation._01;
		_this._11 = transformation._11;
		_this._21 = transformation._21;
		_this._02 = transformation._02;
		_this._12 = transformation._12;
		_this._22 = transformation._22;
		return transformation;
	}
	,pushTransformation: function(trans) {
		this.transformationIndex++;
		if(this.transformationIndex == this.transformations.length) {
			this.transformations.push(new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1));
		}
		var _this = this.transformations[this.transformationIndex];
		_this._00 = trans._00;
		_this._10 = trans._10;
		_this._20 = trans._20;
		_this._01 = trans._01;
		_this._11 = trans._11;
		_this._21 = trans._21;
		_this._02 = trans._02;
		_this._12 = trans._12;
		_this._22 = trans._22;
		this.setTransformation(this.transformations[this.transformationIndex]);
	}
	,popTransformation: function() {
		this.transformationIndex--;
		this.setTransformation(this.transformations[this.transformationIndex]);
		return this.transformations[this.transformationIndex + 1];
	}
	,scale: function(x,y) {
		var _this = this.transformations[this.transformationIndex];
		var _this__00 = x;
		var _this__10 = 0;
		var _this__20 = 0;
		var _this__01 = 0;
		var _this__11 = y;
		var _this__21 = 0;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		var m__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var m__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var m__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var m__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var m__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var m__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var m__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var m__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var m__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		_this._00 = m__00;
		_this._10 = m__10;
		_this._20 = m__20;
		_this._01 = m__01;
		_this._11 = m__11;
		_this._21 = m__21;
		_this._02 = m__02;
		_this._12 = m__12;
		_this._22 = m__22;
	}
	,translation: function(tx,ty) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = tx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = ty;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		return new kha_math_FastMatrix3(_this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02,_this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12,_this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22,_this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02,_this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12,_this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22,_this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02,_this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12,_this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22);
	}
	,translate: function(tx,ty) {
		var _this = this.transformations[this.transformationIndex];
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = tx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = ty;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		var m__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var m__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var m__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var m__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var m__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var m__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var m__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var m__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var m__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		_this._00 = m__00;
		_this._10 = m__10;
		_this._20 = m__20;
		_this._01 = m__01;
		_this._11 = m__11;
		_this._21 = m__21;
		_this._02 = m__02;
		_this._12 = m__12;
		_this._22 = m__22;
	}
	,pushTranslation: function(tx,ty) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = tx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = ty;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m = this.transformations[this.transformationIndex];
		var trans__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var trans__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var trans__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var trans__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var trans__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var trans__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var trans__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var trans__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var trans__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		this.transformationIndex++;
		if(this.transformationIndex == this.transformations.length) {
			this.transformations.push(new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1));
		}
		var _this = this.transformations[this.transformationIndex];
		_this._00 = trans__00;
		_this._10 = trans__10;
		_this._20 = trans__20;
		_this._01 = trans__01;
		_this._11 = trans__11;
		_this._21 = trans__21;
		_this._02 = trans__02;
		_this._12 = trans__12;
		_this._22 = trans__22;
		this.setTransformation(this.transformations[this.transformationIndex]);
	}
	,rotation: function(angle,centerx,centery) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = centerx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = centery;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m__00 = Math.cos(angle);
		var m__10 = -Math.sin(angle);
		var m__20 = 0;
		var m__01 = Math.sin(angle);
		var m__11 = Math.cos(angle);
		var m__21 = 0;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__001 = _this__00 * m__00 + _this__10 * m__01 + _this__20 * m__02;
		var _this__101 = _this__00 * m__10 + _this__10 * m__11 + _this__20 * m__12;
		var _this__201 = _this__00 * m__20 + _this__10 * m__21 + _this__20 * m__22;
		var _this__011 = _this__01 * m__00 + _this__11 * m__01 + _this__21 * m__02;
		var _this__111 = _this__01 * m__10 + _this__11 * m__11 + _this__21 * m__12;
		var _this__211 = _this__01 * m__20 + _this__11 * m__21 + _this__21 * m__22;
		var _this__021 = _this__02 * m__00 + _this__12 * m__01 + _this__22 * m__02;
		var _this__121 = _this__02 * m__10 + _this__12 * m__11 + _this__22 * m__12;
		var _this__221 = _this__02 * m__20 + _this__12 * m__21 + _this__22 * m__22;
		var m__00 = 1;
		var m__10 = 0;
		var m__20 = -centerx;
		var m__01 = 0;
		var m__11 = 1;
		var m__21 = -centery;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__00 = _this__001 * m__00 + _this__101 * m__01 + _this__201 * m__02;
		var _this__10 = _this__001 * m__10 + _this__101 * m__11 + _this__201 * m__12;
		var _this__20 = _this__001 * m__20 + _this__101 * m__21 + _this__201 * m__22;
		var _this__01 = _this__011 * m__00 + _this__111 * m__01 + _this__211 * m__02;
		var _this__11 = _this__011 * m__10 + _this__111 * m__11 + _this__211 * m__12;
		var _this__21 = _this__011 * m__20 + _this__111 * m__21 + _this__211 * m__22;
		var _this__02 = _this__021 * m__00 + _this__121 * m__01 + _this__221 * m__02;
		var _this__12 = _this__021 * m__10 + _this__121 * m__11 + _this__221 * m__12;
		var _this__22 = _this__021 * m__20 + _this__121 * m__21 + _this__221 * m__22;
		var m = this.transformations[this.transformationIndex];
		return new kha_math_FastMatrix3(_this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02,_this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12,_this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22,_this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02,_this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12,_this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22,_this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02,_this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12,_this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22);
	}
	,rotate: function(angle,centerx,centery) {
		var _this = this.transformations[this.transformationIndex];
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = centerx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = centery;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m__00 = Math.cos(angle);
		var m__10 = -Math.sin(angle);
		var m__20 = 0;
		var m__01 = Math.sin(angle);
		var m__11 = Math.cos(angle);
		var m__21 = 0;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__001 = _this__00 * m__00 + _this__10 * m__01 + _this__20 * m__02;
		var _this__101 = _this__00 * m__10 + _this__10 * m__11 + _this__20 * m__12;
		var _this__201 = _this__00 * m__20 + _this__10 * m__21 + _this__20 * m__22;
		var _this__011 = _this__01 * m__00 + _this__11 * m__01 + _this__21 * m__02;
		var _this__111 = _this__01 * m__10 + _this__11 * m__11 + _this__21 * m__12;
		var _this__211 = _this__01 * m__20 + _this__11 * m__21 + _this__21 * m__22;
		var _this__021 = _this__02 * m__00 + _this__12 * m__01 + _this__22 * m__02;
		var _this__121 = _this__02 * m__10 + _this__12 * m__11 + _this__22 * m__12;
		var _this__221 = _this__02 * m__20 + _this__12 * m__21 + _this__22 * m__22;
		var m__00 = 1;
		var m__10 = 0;
		var m__20 = -centerx;
		var m__01 = 0;
		var m__11 = 1;
		var m__21 = -centery;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__00 = _this__001 * m__00 + _this__101 * m__01 + _this__201 * m__02;
		var _this__10 = _this__001 * m__10 + _this__101 * m__11 + _this__201 * m__12;
		var _this__20 = _this__001 * m__20 + _this__101 * m__21 + _this__201 * m__22;
		var _this__01 = _this__011 * m__00 + _this__111 * m__01 + _this__211 * m__02;
		var _this__11 = _this__011 * m__10 + _this__111 * m__11 + _this__211 * m__12;
		var _this__21 = _this__011 * m__20 + _this__111 * m__21 + _this__211 * m__22;
		var _this__02 = _this__021 * m__00 + _this__121 * m__01 + _this__221 * m__02;
		var _this__12 = _this__021 * m__10 + _this__121 * m__11 + _this__221 * m__12;
		var _this__22 = _this__021 * m__20 + _this__121 * m__21 + _this__221 * m__22;
		var m = this.transformations[this.transformationIndex];
		var m__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var m__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var m__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var m__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var m__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var m__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var m__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var m__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var m__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		_this._00 = m__00;
		_this._10 = m__10;
		_this._20 = m__20;
		_this._01 = m__01;
		_this._11 = m__11;
		_this._21 = m__21;
		_this._02 = m__02;
		_this._12 = m__12;
		_this._22 = m__22;
	}
	,pushRotation: function(angle,centerx,centery) {
		var _this__00 = 1;
		var _this__10 = 0;
		var _this__20 = centerx;
		var _this__01 = 0;
		var _this__11 = 1;
		var _this__21 = centery;
		var _this__02 = 0;
		var _this__12 = 0;
		var _this__22 = 1;
		var m__00 = Math.cos(angle);
		var m__10 = -Math.sin(angle);
		var m__20 = 0;
		var m__01 = Math.sin(angle);
		var m__11 = Math.cos(angle);
		var m__21 = 0;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__001 = _this__00 * m__00 + _this__10 * m__01 + _this__20 * m__02;
		var _this__101 = _this__00 * m__10 + _this__10 * m__11 + _this__20 * m__12;
		var _this__201 = _this__00 * m__20 + _this__10 * m__21 + _this__20 * m__22;
		var _this__011 = _this__01 * m__00 + _this__11 * m__01 + _this__21 * m__02;
		var _this__111 = _this__01 * m__10 + _this__11 * m__11 + _this__21 * m__12;
		var _this__211 = _this__01 * m__20 + _this__11 * m__21 + _this__21 * m__22;
		var _this__021 = _this__02 * m__00 + _this__12 * m__01 + _this__22 * m__02;
		var _this__121 = _this__02 * m__10 + _this__12 * m__11 + _this__22 * m__12;
		var _this__221 = _this__02 * m__20 + _this__12 * m__21 + _this__22 * m__22;
		var m__00 = 1;
		var m__10 = 0;
		var m__20 = -centerx;
		var m__01 = 0;
		var m__11 = 1;
		var m__21 = -centery;
		var m__02 = 0;
		var m__12 = 0;
		var m__22 = 1;
		var _this__00 = _this__001 * m__00 + _this__101 * m__01 + _this__201 * m__02;
		var _this__10 = _this__001 * m__10 + _this__101 * m__11 + _this__201 * m__12;
		var _this__20 = _this__001 * m__20 + _this__101 * m__21 + _this__201 * m__22;
		var _this__01 = _this__011 * m__00 + _this__111 * m__01 + _this__211 * m__02;
		var _this__11 = _this__011 * m__10 + _this__111 * m__11 + _this__211 * m__12;
		var _this__21 = _this__011 * m__20 + _this__111 * m__21 + _this__211 * m__22;
		var _this__02 = _this__021 * m__00 + _this__121 * m__01 + _this__221 * m__02;
		var _this__12 = _this__021 * m__10 + _this__121 * m__11 + _this__221 * m__12;
		var _this__22 = _this__021 * m__20 + _this__121 * m__21 + _this__221 * m__22;
		var m = this.transformations[this.transformationIndex];
		var trans__00 = _this__00 * m._00 + _this__10 * m._01 + _this__20 * m._02;
		var trans__10 = _this__00 * m._10 + _this__10 * m._11 + _this__20 * m._12;
		var trans__20 = _this__00 * m._20 + _this__10 * m._21 + _this__20 * m._22;
		var trans__01 = _this__01 * m._00 + _this__11 * m._01 + _this__21 * m._02;
		var trans__11 = _this__01 * m._10 + _this__11 * m._11 + _this__21 * m._12;
		var trans__21 = _this__01 * m._20 + _this__11 * m._21 + _this__21 * m._22;
		var trans__02 = _this__02 * m._00 + _this__12 * m._01 + _this__22 * m._02;
		var trans__12 = _this__02 * m._10 + _this__12 * m._11 + _this__22 * m._12;
		var trans__22 = _this__02 * m._20 + _this__12 * m._21 + _this__22 * m._22;
		this.transformationIndex++;
		if(this.transformationIndex == this.transformations.length) {
			this.transformations.push(new kha_math_FastMatrix3(1,0,0,0,1,0,0,0,1));
		}
		var _this = this.transformations[this.transformationIndex];
		_this._00 = trans__00;
		_this._10 = trans__10;
		_this._20 = trans__20;
		_this._01 = trans__01;
		_this._11 = trans__11;
		_this._21 = trans__21;
		_this._02 = trans__02;
		_this._12 = trans__12;
		_this._22 = trans__22;
		this.setTransformation(this.transformations[this.transformationIndex]);
	}
	,pushOpacity: function(opacity) {
		this.setOpacity(opacity);
		this.opacities.push(opacity);
	}
	,popOpacity: function() {
		var ret = this.opacities.pop();
		this.setOpacity(this.get_opacity());
		return ret;
	}
	,get_opacity: function() {
		return this.opacities[this.opacities.length - 1];
	}
	,set_opacity: function(opacity) {
		this.setOpacity(opacity);
		return this.opacities[this.opacities.length - 1] = opacity;
	}
	,scissor: function(x,y,width,height) {
	}
	,disableScissor: function() {
	}
	,pipe: null
	,get_pipeline: function() {
		return this.pipe;
	}
	,set_pipeline: function(pipeline) {
		this.setPipeline(pipeline);
		return this.pipe = pipeline;
	}
	,transformations: null
	,transformationIndex: null
	,opacities: null
	,myFontSize: null
	,setTransformation: function(transformation) {
	}
	,setOpacity: function(opacity) {
	}
	,setPipeline: function(pipeline) {
	}
	,__class__: kha_graphics2_Graphics
	,__properties__: {set_pipeline:"set_pipeline",get_pipeline:"get_pipeline",set_opacity:"set_opacity",get_opacity:"get_opacity",set_transformation:"set_transformation",get_transformation:"get_transformation",set_fontSize:"set_fontSize",get_fontSize:"get_fontSize",set_font:"set_font",get_font:"get_font",set_color:"set_color",get_color:"get_color",set_mipmapScaleQuality:"set_mipmapScaleQuality",get_mipmapScaleQuality:"get_mipmapScaleQuality",set_imageScaleQuality:"set_imageScaleQuality",get_imageScaleQuality:"get_imageScaleQuality"}
};
var kha_graphics2_Graphics1 = function(canvas) {
	this.canvas = canvas;
};
$hxClasses["kha.graphics2.Graphics1"] = kha_graphics2_Graphics1;
kha_graphics2_Graphics1.__name__ = true;
kha_graphics2_Graphics1.__interfaces__ = [kha_graphics1_Graphics];
kha_graphics2_Graphics1.prototype = {
	canvas: null
	,texture: null
	,pixels: null
	,begin: function() {
		if(this.texture == null || (this.texture.get_realWidth() != this.canvas.get_width() || this.texture.get_realHeight() != this.canvas.get_height())) {
			this.texture = kha_Image.create(this.canvas.get_width(),this.canvas.get_height(),0,2);
		}
		this.pixels = this.texture.lock();
	}
	,end: function() {
		this.texture.unlock();
		this.canvas.get_g2().begin(false);
		this.canvas.get_g2().drawImage(this.texture,0,0);
		this.canvas.get_g2().end();
	}
	,setPixel: function(x,y,color) {
		this.pixels.setInt32(y * this.texture.get_stride() + x * 4,kha_Color.fromBytes(color & 255,(color & 65280) >>> 8,(color & 16711680) >>> 16,color >>> 24));
	}
	,__class__: kha_graphics2_Graphics1
};
var kha_graphics2_GraphicsExtension = function() { };
$hxClasses["kha.graphics2.GraphicsExtension"] = kha_graphics2_GraphicsExtension;
kha_graphics2_GraphicsExtension.__name__ = true;
kha_graphics2_GraphicsExtension.drawArc = function(g2,cx,cy,radius,sAngle,eAngle,strength,ccw,segments) {
	if(segments == null) {
		segments = 0;
	}
	if(ccw == null) {
		ccw = false;
	}
	if(strength == null) {
		strength = 1;
	}
	sAngle %= Math.PI * 2;
	eAngle %= Math.PI * 2;
	if(ccw) {
		if(eAngle > sAngle) {
			eAngle -= Math.PI * 2;
		}
	} else if(eAngle < sAngle) {
		eAngle += Math.PI * 2;
	}
	radius += strength / 2;
	if(segments <= 0) {
		segments = Math.floor(10 * Math.sqrt(radius));
	}
	var theta = (eAngle - sAngle) / segments;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	var x = Math.cos(sAngle) * radius;
	var y = Math.sin(sAngle) * radius;
	var _g = 0;
	var _g1 = segments;
	while(_g < _g1) {
		var n = _g++;
		var px = x + cx;
		var py = y + cy;
		var t = x;
		x = c * x - s * y;
		y = c * y + s * t;
		kha_graphics2_GraphicsExtension.drawInnerLine(g2,x + cx,y + cy,px,py,strength);
	}
};
kha_graphics2_GraphicsExtension.fillArc = function(g2,cx,cy,radius,sAngle,eAngle,ccw,segments) {
	if(segments == null) {
		segments = 0;
	}
	if(ccw == null) {
		ccw = false;
	}
	sAngle %= Math.PI * 2;
	eAngle %= Math.PI * 2;
	if(ccw) {
		if(eAngle > sAngle) {
			eAngle -= Math.PI * 2;
		}
	} else if(eAngle < sAngle) {
		eAngle += Math.PI * 2;
	}
	if(segments <= 0) {
		segments = Math.floor(10 * Math.sqrt(radius));
	}
	var theta = (eAngle - sAngle) / segments;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	var x = Math.cos(sAngle) * radius;
	var y = Math.sin(sAngle) * radius;
	var sx = x + cx;
	var sy = y + cy;
	var _g = 0;
	var _g1 = segments;
	while(_g < _g1) {
		var n = _g++;
		var px = x + cx;
		var py = y + cy;
		var t = x;
		x = c * x - s * y;
		y = c * y + s * t;
		g2.fillTriangle(px,py,x + cx,y + cy,sx,sy);
	}
};
kha_graphics2_GraphicsExtension.drawCircle = function(g2,cx,cy,radius,strength,segments) {
	if(segments == null) {
		segments = 0;
	}
	if(strength == null) {
		strength = 1;
	}
	radius += strength / 2;
	if(segments <= 0) {
		segments = Math.floor(10 * Math.sqrt(radius));
	}
	var theta = 2 * Math.PI / segments;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	var x = radius;
	var y = 0.0;
	var _g = 0;
	var _g1 = segments;
	while(_g < _g1) {
		var n = _g++;
		var px = x + cx;
		var py = y + cy;
		var t = x;
		x = c * x - s * y;
		y = c * y + s * t;
		kha_graphics2_GraphicsExtension.drawInnerLine(g2,x + cx,y + cy,px,py,strength);
	}
};
kha_graphics2_GraphicsExtension.drawInnerLine = function(g2,x1,y1,x2,y2,strength) {
	var side = y2 > y1 ? 1 : 0;
	if(y2 == y1) {
		side = x2 - x1 > 0 ? 1 : 0;
	}
	var vec_x = 0;
	var vec_y = 0;
	if(y2 == y1) {
		var x = 0;
		var y = -1;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var v_x = x;
		var v_y = y;
		vec_x = v_x;
		vec_y = v_y;
	} else {
		var x = 1;
		var y = -(x2 - x1) / (y2 - y1);
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var v_x = x;
		var v_y = y;
		vec_x = v_x;
		vec_y = v_y;
	}
	var currentLength = Math.sqrt(vec_x * vec_x + vec_y * vec_y);
	if(currentLength != 0) {
		var mul = strength / currentLength;
		vec_x *= mul;
		vec_y *= mul;
	}
	var x = x1 + side * vec_x;
	var y = y1 + side * vec_y;
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var p1_x = x;
	var p1_y = y;
	var x = x2 + side * vec_x;
	var y = y2 + side * vec_y;
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var p2_x = x;
	var p2_y = y;
	var x = p1_x - vec_x;
	var y = p1_y - vec_y;
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var p3_x = x;
	var p3_y = y;
	var x = p2_x - vec_x;
	var y = p2_y - vec_y;
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var p4_x = x;
	var p4_y = y;
	g2.fillTriangle(p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
	g2.fillTriangle(p3_x,p3_y,p2_x,p2_y,p4_x,p4_y);
};
kha_graphics2_GraphicsExtension.fillCircle = function(g2,cx,cy,radius,segments) {
	if(segments == null) {
		segments = 0;
	}
	if(segments <= 0) {
		segments = Math.floor(10 * Math.sqrt(radius));
	}
	var theta = 2 * Math.PI / segments;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	var x = radius;
	var y = 0.0;
	var _g = 0;
	var _g1 = segments;
	while(_g < _g1) {
		var n = _g++;
		var px = x + cx;
		var py = y + cy;
		var t = x;
		x = c * x - s * y;
		y = c * y + s * t;
		g2.fillTriangle(px,py,x + cx,y + cy,cx,cy);
	}
};
kha_graphics2_GraphicsExtension.drawPolygon = function(g2,x,y,vertices,strength) {
	if(strength == null) {
		strength = 1;
	}
	var iterator_current = 0;
	var iterator_array = vertices;
	var v0 = iterator_array[iterator_current++];
	var v1 = v0;
	while(iterator_current < iterator_array.length) {
		var v2 = iterator_array[iterator_current++];
		g2.drawLine(v1.x + x,v1.y + y,v2.x + x,v2.y + y,strength);
		v1 = v2;
	}
	g2.drawLine(v1.x + x,v1.y + y,v0.x + x,v0.y + y,strength);
};
kha_graphics2_GraphicsExtension.fillPolygon = function(g2,x,y,vertices) {
	var iterator_current = 0;
	var iterator_array = vertices;
	if(iterator_current >= iterator_array.length) {
		return;
	}
	var v0 = iterator_array[iterator_current++];
	if(iterator_current >= iterator_array.length) {
		return;
	}
	var v1 = iterator_array[iterator_current++];
	while(iterator_current < iterator_array.length) {
		var v2 = iterator_array[iterator_current++];
		g2.fillTriangle(v0.x + x,v0.y + y,v1.x + x,v1.y + y,v2.x + x,v2.y + y);
		v1 = v2;
	}
};
kha_graphics2_GraphicsExtension.drawCubicBezier = function(g2,x,y,segments,strength) {
	if(strength == null) {
		strength = 1.0;
	}
	if(segments == null) {
		segments = 20;
	}
	var t;
	var q0 = kha_graphics2_GraphicsExtension.calculateCubicBezierPoint(0,x,y);
	var q1;
	var _g = 1;
	var _g1 = segments + 1;
	while(_g < _g1) {
		var i = _g++;
		t = i / segments;
		q1 = kha_graphics2_GraphicsExtension.calculateCubicBezierPoint(t,x,y);
		g2.drawLine(q0[0],q0[1],q1[0],q1[1],strength);
		q0 = q1;
	}
};
kha_graphics2_GraphicsExtension.drawCubicBezierPath = function(g2,x,y,segments,strength) {
	if(strength == null) {
		strength = 1.0;
	}
	if(segments == null) {
		segments = 20;
	}
	var i = 0;
	var t;
	var q0 = null;
	var q1 = null;
	while(i < x.length - 3) {
		if(i == 0) {
			q0 = kha_graphics2_GraphicsExtension.calculateCubicBezierPoint(0,[x[i],x[i + 1],x[i + 2],x[i + 3]],[y[i],y[i + 1],y[i + 2],y[i + 3]]);
		}
		var _g = 1;
		var _g1 = segments + 1;
		while(_g < _g1) {
			var j = _g++;
			t = j / segments;
			q1 = kha_graphics2_GraphicsExtension.calculateCubicBezierPoint(t,[x[i],x[i + 1],x[i + 2],x[i + 3]],[y[i],y[i + 1],y[i + 2],y[i + 3]]);
			g2.drawLine(q0[0],q0[1],q1[0],q1[1],strength);
			q0 = q1;
		}
		i += 3;
	}
};
kha_graphics2_GraphicsExtension.calculateCubicBezierPoint = function(t,x,y) {
	var u = 1 - t;
	var tt = t * t;
	var uu = u * u;
	var uuu = uu * u;
	var ttt = tt * t;
	var p = [uuu * x[0],uuu * y[0]];
	p[0] += 3 * uu * t * x[1];
	p[1] += 3 * uu * t * y[1];
	p[0] += 3 * u * tt * x[2];
	p[1] += 3 * u * tt * y[2];
	p[0] += ttt * x[3];
	p[1] += ttt * y[3];
	return p;
};
kha_graphics2_GraphicsExtension.drawAlignedString = function(g2,text,x,y,horAlign,verAlign) {
	var xoffset = 0.0;
	if(horAlign == 1 || horAlign == 2) {
		var width = g2.get_font().width(g2.get_fontSize(),text);
		if(horAlign == 1) {
			xoffset = -width * 0.5;
		} else {
			xoffset = -width;
		}
	}
	var yoffset = 0.0;
	if(verAlign == 1 || verAlign == 2) {
		var height = g2.get_font().height(g2.get_fontSize());
		if(verAlign == 1) {
			yoffset = -height * 0.5;
		} else {
			yoffset = -height;
		}
	}
	g2.drawString(text,x + xoffset,y + yoffset);
};
kha_graphics2_GraphicsExtension.drawAlignedCharacters = function(g2,text,start,length,x,y,horAlign,verAlign) {
	var xoffset = 0.0;
	if(horAlign == 1 || horAlign == 2) {
		var width = g2.get_font().widthOfCharacters(g2.get_fontSize(),text,start,length);
		if(horAlign == 1) {
			xoffset = -width * 0.5;
		} else {
			xoffset = -width;
		}
	}
	var yoffset = 0.0;
	if(verAlign == 1 || verAlign == 2) {
		var height = g2.get_font().height(g2.get_fontSize());
		if(verAlign == 1) {
			yoffset = -height * 0.5;
		} else {
			yoffset = -height;
		}
	}
	g2.drawCharacters(text,start,length,x + xoffset,y + yoffset);
};
var kha_graphics2_truetype_VectorOfIntPointer = function() {
};
$hxClasses["kha.graphics2.truetype.VectorOfIntPointer"] = kha_graphics2_truetype_VectorOfIntPointer;
kha_graphics2_truetype_VectorOfIntPointer.__name__ = true;
kha_graphics2_truetype_VectorOfIntPointer.prototype = {
	value: null
	,__class__: kha_graphics2_truetype_VectorOfIntPointer
};
var kha_graphics2_truetype_Stbtt_$temp_$rect = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_rect"] = kha_graphics2_truetype_Stbtt_$temp_$rect;
kha_graphics2_truetype_Stbtt_$temp_$rect.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$rect.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$rect
};
var kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_glyph_h_metrics"] = kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics;
kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics.prototype = {
	advanceWidth: null
	,leftSideBearing: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics
};
var kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_font_v_metrics"] = kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics;
kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics.prototype = {
	ascent: null
	,descent: null
	,lineGap: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics
};
var kha_graphics2_truetype_Stbtt_$temp_$region = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_temp_region"] = kha_graphics2_truetype_Stbtt_$temp_$region;
kha_graphics2_truetype_Stbtt_$temp_$region.__name__ = true;
kha_graphics2_truetype_Stbtt_$temp_$region.prototype = {
	width: null
	,height: null
	,xoff: null
	,yoff: null
	,__class__: kha_graphics2_truetype_Stbtt_$temp_$region
};
var kha_graphics2_truetype_Stbtt_$_$buf = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__buf"] = kha_graphics2_truetype_Stbtt_$_$buf;
kha_graphics2_truetype_Stbtt_$_$buf.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$buf.prototype = {
	data: null
	,cursor: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$buf
};
var kha_graphics2_truetype_Stbtt_$bakedchar = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_bakedchar"] = kha_graphics2_truetype_Stbtt_$bakedchar;
kha_graphics2_truetype_Stbtt_$bakedchar.__name__ = true;
kha_graphics2_truetype_Stbtt_$bakedchar.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,xoff: null
	,yoff: null
	,xadvance: null
	,__class__: kha_graphics2_truetype_Stbtt_$bakedchar
};
var kha_graphics2_truetype_Stbtt_$aligned_$quad = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_aligned_quad"] = kha_graphics2_truetype_Stbtt_$aligned_$quad;
kha_graphics2_truetype_Stbtt_$aligned_$quad.__name__ = true;
kha_graphics2_truetype_Stbtt_$aligned_$quad.prototype = {
	x0: null
	,y0: null
	,s0: null
	,t0: null
	,x1: null
	,y1: null
	,s1: null
	,t1: null
	,__class__: kha_graphics2_truetype_Stbtt_$aligned_$quad
};
var kha_graphics2_truetype_Stbtt_$packedchar = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_packedchar"] = kha_graphics2_truetype_Stbtt_$packedchar;
kha_graphics2_truetype_Stbtt_$packedchar.__name__ = true;
kha_graphics2_truetype_Stbtt_$packedchar.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,xoff: null
	,yoff: null
	,xadvance: null
	,xoff2: null
	,yoff2: null
	,__class__: kha_graphics2_truetype_Stbtt_$packedchar
};
var kha_graphics2_truetype_Stbtt_$pack_$range = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_pack_range"] = kha_graphics2_truetype_Stbtt_$pack_$range;
kha_graphics2_truetype_Stbtt_$pack_$range.__name__ = true;
kha_graphics2_truetype_Stbtt_$pack_$range.prototype = {
	font_size: null
	,first_unicode_codepoint_in_range: null
	,array_of_unicode_codepoints: null
	,num_chars: null
	,chardata_for_range: null
	,h_oversample: null
	,v_oversample: null
	,__class__: kha_graphics2_truetype_Stbtt_$pack_$range
};
var kha_graphics2_truetype_Stbtt_$pack_$context = function() { };
$hxClasses["kha.graphics2.truetype.Stbtt_pack_context"] = kha_graphics2_truetype_Stbtt_$pack_$context;
kha_graphics2_truetype_Stbtt_$pack_$context.__name__ = true;
kha_graphics2_truetype_Stbtt_$pack_$context.prototype = {
	width: null
	,height: null
	,stride_in_bytes: null
	,padding: null
	,h_oversample: null
	,v_oversample: null
	,pixels: null
	,__class__: kha_graphics2_truetype_Stbtt_$pack_$context
};
var kha_graphics2_truetype_Stbtt_$fontinfo = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_fontinfo"] = kha_graphics2_truetype_Stbtt_$fontinfo;
kha_graphics2_truetype_Stbtt_$fontinfo.__name__ = true;
kha_graphics2_truetype_Stbtt_$fontinfo.prototype = {
	data: null
	,fontstart: null
	,numGlyphs: null
	,loca: null
	,head: null
	,glyf: null
	,hhea: null
	,hmtx: null
	,kern: null
	,gpos: null
	,index_map: null
	,indexToLocFormat: null
	,cff: null
	,charstrings: null
	,gsubrs: null
	,subrs: null
	,fontdicts: null
	,fdselect: null
	,__class__: kha_graphics2_truetype_Stbtt_$fontinfo
};
var kha_graphics2_truetype_Stbtt_$vertex = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt_vertex"] = kha_graphics2_truetype_Stbtt_$vertex;
kha_graphics2_truetype_Stbtt_$vertex.__name__ = true;
kha_graphics2_truetype_Stbtt_$vertex.prototype = {
	x: null
	,y: null
	,cx: null
	,cy: null
	,cx1: null
	,cy1: null
	,type: null
	,padding: null
	,__class__: kha_graphics2_truetype_Stbtt_$vertex
};
var kha_graphics2_truetype_Stbtt_$_$bitmap = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__bitmap"] = kha_graphics2_truetype_Stbtt_$_$bitmap;
kha_graphics2_truetype_Stbtt_$_$bitmap.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$bitmap.prototype = {
	w: null
	,h: null
	,stride: null
	,pixels: null
	,pixels_offset: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$bitmap
};
var kha_graphics2_truetype_Stbtt_$_$edge = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__edge"] = kha_graphics2_truetype_Stbtt_$_$edge;
kha_graphics2_truetype_Stbtt_$_$edge.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$edge.prototype = {
	x0: null
	,y0: null
	,x1: null
	,y1: null
	,invert: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$edge
};
var kha_graphics2_truetype_Stbtt_$_$active_$edge = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__active_edge"] = kha_graphics2_truetype_Stbtt_$_$active_$edge;
kha_graphics2_truetype_Stbtt_$_$active_$edge.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$active_$edge.prototype = {
	next: null
	,fx: null
	,fdx: null
	,fdy: null
	,direction: null
	,sy: null
	,ey: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$active_$edge
};
var kha_graphics2_truetype_Stbtt_$_$point = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__point"] = kha_graphics2_truetype_Stbtt_$_$point;
kha_graphics2_truetype_Stbtt_$_$point.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$point.prototype = {
	x: null
	,y: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$point
};
var kha_graphics2_truetype_Stbtt_$_$csctx = function() {
};
$hxClasses["kha.graphics2.truetype.Stbtt__csctx"] = kha_graphics2_truetype_Stbtt_$_$csctx;
kha_graphics2_truetype_Stbtt_$_$csctx.__name__ = true;
kha_graphics2_truetype_Stbtt_$_$csctx.prototype = {
	bounds: null
	,started: null
	,first_x: null
	,first_y: null
	,x: null
	,y: null
	,min_x: null
	,min_y: null
	,max_x: null
	,max_y: null
	,pvertices: null
	,num_vertices: null
	,__class__: kha_graphics2_truetype_Stbtt_$_$csctx
};
var kha_graphics2_truetype_StbTruetype = function() { };
$hxClasses["kha.graphics2.truetype.StbTruetype"] = kha_graphics2_truetype_StbTruetype;
kha_graphics2_truetype_StbTruetype.__name__ = true;
kha_graphics2_truetype_StbTruetype.STBTT_assert = function(value) {
	if(!value) {
		throw haxe_Exception.thrown("Error");
	}
};
kha_graphics2_truetype_StbTruetype.STBTT_POINT_SIZE = function(x) {
	return -x;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get8 = function(b) {
	if(b.cursor >= b.data.get_length()) {
		return 0;
	}
	var pos = b.cursor++;
	if(pos == null) {
		pos = 0;
	}
	return b.data.readU8(pos);
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_peek8 = function(b) {
	if(b.cursor >= b.data.get_length()) {
		return 0;
	}
	var pos = b.cursor;
	if(pos == null) {
		pos = 0;
	}
	return b.data.readU8(pos);
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_seek = function(b,o) {
	if(o > b.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_skip = function(b,o) {
	var o1 = b.cursor + o;
	if(o1 > b.data.get_length() || o1 < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o1 > b.data.get_length() || o1 < 0 ? b.data.get_length() : o1;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get = function(b,n) {
	var v = 0;
	if(!(n >= 1 && n <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__new_buf = function(p,size) {
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	if(size >= 1073741824) {
		throw haxe_Exception.thrown("Error");
	}
	r.data = p;
	r.cursor = 0;
	return r;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get16 = function(b) {
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_get32 = function(b) {
	var v = 0;
	var _g = 0;
	var _g1 = 4;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__buf_range = function(b,o,s) {
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
		return r1;
	}
	r1.data = b.data.sub(o,s);
	return r1;
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_get_index = function(b) {
	var start = b.cursor;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	if(count > 0) {
		var offsize;
		if(b.cursor >= b.data.get_length()) {
			offsize = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			offsize = b.data.readU8(pos);
		}
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var o = b.cursor + offsize * count;
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var o = b.cursor + (v - 1);
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var s = b.cursor - start;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
			return r1;
		} else {
			r1.data = b.data.sub(start,s);
			return r1;
		}
	}
	return b;
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_int = function(b) {
	var b0;
	if(b.cursor >= b.data.get_length()) {
		b0 = 0;
	} else {
		var pos = b.cursor++;
		if(pos == null) {
			pos = 0;
		}
		b0 = b.data.readU8(pos);
	}
	if(b0 >= 32 && b0 <= 246) {
		return b0 - 139;
	} else if(b0 >= 247 && b0 <= 250) {
		var tmp;
		if(b.cursor >= b.data.get_length()) {
			tmp = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			tmp = b.data.readU8(pos);
		}
		return (b0 - 247) * 256 + tmp + 108;
	} else if(b0 >= 251 && b0 <= 254) {
		var tmp;
		if(b.cursor >= b.data.get_length()) {
			tmp = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			tmp = b.data.readU8(pos);
		}
		return -(b0 - 251) * 256 - tmp - 108;
	} else if(b0 == 28) {
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		return v;
	} else if(b0 == 29) {
		var v = 0;
		var _g = 0;
		var _g1 = 4;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		return v;
	} else {
		throw haxe_Exception.thrown("Error");
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_skip_operand = function(b) {
	var v;
	var b0;
	if(b.cursor >= b.data.get_length()) {
		b0 = 0;
	} else {
		var pos = b.cursor;
		if(pos == null) {
			pos = 0;
		}
		b0 = b.data.readU8(pos);
	}
	if(b0 < 28) {
		throw haxe_Exception.thrown("Error");
	}
	if(b0 == 30) {
		var o = b.cursor + 1;
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		while(b.cursor < b.data.get_length()) {
			if(b.cursor >= b.data.get_length()) {
				v = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v = b.data.readU8(pos);
			}
			if((v & 15) == 15 || v >> 4 == 15) {
				break;
			}
		}
	} else {
		var b0;
		if(b.cursor >= b.data.get_length()) {
			b0 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = b.data.readU8(pos);
		}
		if(!(b0 >= 32 && b0 <= 246)) {
			if(b0 >= 247 && b0 <= 250) {
				if(b.cursor < b.data.get_length()) {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					b.data.readU8(pos);
				}
			} else if(b0 >= 251 && b0 <= 254) {
				if(b.cursor < b.data.get_length()) {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					b.data.readU8(pos);
				}
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
			} else if(b0 == 29) {
				var v = 0;
				var _g = 0;
				var _g1 = 4;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
			} else {
				throw haxe_Exception.thrown("Error");
			}
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__dict_get = function(b,key) {
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var ret = null;
	while(b.cursor < b.data.get_length()) {
		var start = b.cursor;
		var op;
		while(true) {
			var tmp;
			if(b.cursor >= b.data.get_length()) {
				tmp = 0;
			} else {
				var pos = b.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = b.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(b.cursor >= b.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = b.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = b.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = b.cursor + 1;
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				while(b.cursor < b.data.get_length()) {
					if(b.cursor >= b.data.get_length()) {
						v = 0;
					} else {
						var pos2 = b.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = b.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(b.cursor >= b.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = b.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = b.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(b.cursor < b.data.get_length()) {
							var pos4 = b.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							b.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(b.cursor < b.data.get_length()) {
							var pos5 = b.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							b.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i = _g++;
							var v2;
							if(b.cursor >= b.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = b.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = b.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i1 = _g2++;
							var v4;
							if(b.cursor >= b.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = b.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = b.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = b.cursor;
		if(b.cursor >= b.data.get_length()) {
			op = 0;
		} else {
			var pos8 = b.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = b.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(b.cursor >= b.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = b.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = b.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == key) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = b.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	if(ret != null) {
		return ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > b.data.get_length() || 0 > b.data.get_length()) {
			return r1;
		} else {
			r1.data = b.data.sub(0,0);
			return r1;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__dict_get_ints = function(b,key,outcount,out) {
	var i = 0;
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var ret = null;
	while(b.cursor < b.data.get_length()) {
		var start = b.cursor;
		var op;
		while(true) {
			var tmp;
			if(b.cursor >= b.data.get_length()) {
				tmp = 0;
			} else {
				var pos = b.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = b.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(b.cursor >= b.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = b.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = b.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = b.cursor + 1;
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				while(b.cursor < b.data.get_length()) {
					if(b.cursor >= b.data.get_length()) {
						v = 0;
					} else {
						var pos2 = b.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = b.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(b.cursor >= b.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = b.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = b.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(b.cursor < b.data.get_length()) {
							var pos4 = b.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							b.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(b.cursor < b.data.get_length()) {
							var pos5 = b.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							b.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(b.cursor >= b.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = b.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = b.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(b.cursor >= b.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = b.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = b.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = b.cursor;
		if(b.cursor >= b.data.get_length()) {
			op = 0;
		} else {
			var pos8 = b.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = b.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(b.cursor >= b.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = b.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = b.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == key) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = b.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > b.data.get_length() || 0 > b.data.get_length()) {
			operands = r1;
		} else {
			r1.data = b.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < outcount && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		out[i] = tmp;
		++i;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_index_count = function(b) {
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	return v;
};
kha_graphics2_truetype_StbTruetype.stbtt__cff_index_get = function(b,i) {
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i1 = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var offsize;
	if(b.cursor >= b.data.get_length()) {
		offsize = 0;
	} else {
		var pos = b.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = b.data.readU8(pos);
	}
	if(!(i >= 0 && i < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = b.cursor + i * offsize;
	if(o > b.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var start = v;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var end = v;
	var o = 2 + (count + 1) * offsize + start;
	var s = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
		return r1;
	} else {
		r1.data = b.data.sub(o,s);
		return r1;
	}
};
kha_graphics2_truetype_StbTruetype.ttBYTE = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	return p.readU8(pos);
};
kha_graphics2_truetype_StbTruetype.ttCHAR = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var n = p.readU8(pos);
	if(n >= 128) {
		return n - 256;
	}
	return n;
};
kha_graphics2_truetype_StbTruetype.ttUSHORT = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	return ch2 | ch1 << 8;
};
kha_graphics2_truetype_StbTruetype.ttSHORT = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	if((n & 32768) != 0) {
		return n - 65536;
	}
	return n;
};
kha_graphics2_truetype_StbTruetype.ttULONG = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var pos1 = pos;
	if(pos1 == null) {
		pos1 = 0;
	}
	var ch1 = p.readU8(pos1);
	var ch2 = p.readU8(pos1 + 1);
	var ch3 = p.readU8(pos1 + 2);
	var ch4 = p.readU8(pos1 + 3);
	return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
};
kha_graphics2_truetype_StbTruetype.ttLONG = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var ch3 = p.readU8(pos + 2);
	var ch4 = p.readU8(pos + 3);
	return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
};
kha_graphics2_truetype_StbTruetype.to_stbtt_uint16 = function(value) {
	return value & 65535;
};
kha_graphics2_truetype_StbTruetype.ttFixed = function(p,pos) {
	if(pos == null) {
		pos = 0;
	}
	var pos1 = pos;
	if(pos1 == null) {
		pos1 = 0;
	}
	var ch1 = p.readU8(pos1);
	var ch2 = p.readU8(pos1 + 1);
	var ch3 = p.readU8(pos1 + 2);
	var ch4 = p.readU8(pos1 + 3);
	return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
};
kha_graphics2_truetype_StbTruetype.stbtt_tag4 = function(p,pos,c0,c1,c2,c3) {
	if(p.readU8(pos) == c0 && p.readU8(pos + 1) == c1 && p.readU8(pos + 2) == c2) {
		return p.readU8(pos + 3) == c3;
	} else {
		return false;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_tag = function(p,pos,str) {
	var c0 = HxOverrides.cca(str,0);
	var c1 = HxOverrides.cca(str,1);
	var c2 = HxOverrides.cca(str,2);
	var c3 = HxOverrides.cca(str,3);
	if(p.readU8(pos) == c0 && p.readU8(pos + 1) == c1 && p.readU8(pos + 2) == c2) {
		return p.readU8(pos + 3) == c3;
	} else {
		return false;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__isfont = function(font) {
	var c0 = HxOverrides.cca("1",0);
	if(font.readU8(0) == c0 && font.readU8(1) == 0 && font.readU8(2) == 0 && font.readU8(3) == 0) {
		return true;
	}
	var c0 = HxOverrides.cca("typ1",0);
	var c1 = HxOverrides.cca("typ1",1);
	var c2 = HxOverrides.cca("typ1",2);
	var c3 = HxOverrides.cca("typ1",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	var c0 = HxOverrides.cca("OTTO",0);
	var c1 = HxOverrides.cca("OTTO",1);
	var c2 = HxOverrides.cca("OTTO",2);
	var c3 = HxOverrides.cca("OTTO",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	if(font.readU8(0) == 0 && font.readU8(1) == 1 && font.readU8(2) == 0 && font.readU8(3) == 0) {
		return true;
	}
	var c0 = HxOverrides.cca("true",0);
	var c1 = HxOverrides.cca("true",1);
	var c2 = HxOverrides.cca("true",2);
	var c3 = HxOverrides.cca("true",3);
	if(font.readU8(0) == c0 && font.readU8(1) == c1 && font.readU8(2) == c2 && font.readU8(3) == c3) {
		return true;
	}
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__find_table = function(data,fontstart,tag) {
	var pos = fontstart + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var num_tables = ch2 | ch1 << 8;
	var tabledir = fontstart + 12;
	var _g = 0;
	var _g1 = num_tables;
	while(_g < _g1) {
		var i = _g++;
		var loc = tabledir + 16 * i;
		var c0 = HxOverrides.cca(tag,0);
		var c1 = HxOverrides.cca(tag,1);
		var c2 = HxOverrides.cca(tag,2);
		var c3 = HxOverrides.cca(tag,3);
		if(data.readU8(loc) == c0 && data.readU8(loc + 1) == c1 && data.readU8(loc + 2) == c2 && data.readU8(loc + 3) == c3) {
			var pos = loc + 8;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = data.readU8(pos1);
			var ch2 = data.readU8(pos1 + 1);
			var ch3 = data.readU8(pos1 + 2);
			var ch4 = data.readU8(pos1 + 3);
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return 0;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontOffsetForIndex = function(font_collection,index) {
	if(kha_graphics2_truetype_StbTruetype.stbtt__isfont(font_collection)) {
		if(index == 0) {
			return 0;
		} else {
			return -1;
		}
	}
	var c0 = HxOverrides.cca("ttcf",0);
	var c1 = HxOverrides.cca("ttcf",1);
	var c2 = HxOverrides.cca("ttcf",2);
	var c3 = HxOverrides.cca("ttcf",3);
	if(font_collection.readU8(0) == c0 && font_collection.readU8(1) == c1 && font_collection.readU8(2) == c2 && font_collection.readU8(3) == c3) {
		var tmp;
		var pos = 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = font_collection.readU8(pos1);
		var ch2 = font_collection.readU8(pos1 + 1);
		var ch3 = font_collection.readU8(pos1 + 2);
		var ch4 = font_collection.readU8(pos1 + 3);
		if((ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) != 65536) {
			var pos = 4;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = font_collection.readU8(pos1);
			var ch2 = font_collection.readU8(pos1 + 1);
			var ch3 = font_collection.readU8(pos1 + 2);
			var ch4 = font_collection.readU8(pos1 + 3);
			tmp = (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) == 131072;
		} else {
			tmp = true;
		}
		if(tmp) {
			var pos = 8;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = font_collection.readU8(pos);
			var ch2 = font_collection.readU8(pos + 1);
			var ch3 = font_collection.readU8(pos + 2);
			var ch4 = font_collection.readU8(pos + 3);
			var n = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
			if(index >= n) {
				return -1;
			}
			var pos = 12 + index * 4;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = font_collection.readU8(pos1);
			var ch2 = font_collection.readU8(pos1 + 1);
			var ch3 = font_collection.readU8(pos1 + 2);
			var ch4 = font_collection.readU8(pos1 + 3);
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return -1;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetNumberOfFonts = function(font_collection) {
	if(kha_graphics2_truetype_StbTruetype.stbtt__isfont(font_collection)) {
		return 1;
	}
	var c0 = HxOverrides.cca("ttcf",0);
	var c1 = HxOverrides.cca("ttcf",1);
	var c2 = HxOverrides.cca("ttcf",2);
	var c3 = HxOverrides.cca("ttcf",3);
	if(font_collection.readU8(0) == c0 && font_collection.readU8(1) == c1 && font_collection.readU8(2) == c2 && font_collection.readU8(3) == c3) {
		var tmp;
		var pos = 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = font_collection.readU8(pos1);
		var ch2 = font_collection.readU8(pos1 + 1);
		var ch3 = font_collection.readU8(pos1 + 2);
		var ch4 = font_collection.readU8(pos1 + 3);
		if((ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) != 65536) {
			var pos = 4;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = font_collection.readU8(pos1);
			var ch2 = font_collection.readU8(pos1 + 1);
			var ch3 = font_collection.readU8(pos1 + 2);
			var ch4 = font_collection.readU8(pos1 + 3);
			tmp = (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24) == 131072;
		} else {
			tmp = true;
		}
		if(tmp) {
			var pos = 8;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = font_collection.readU8(pos);
			var ch2 = font_collection.readU8(pos + 1);
			var ch3 = font_collection.readU8(pos + 2);
			var ch4 = font_collection.readU8(pos + 3);
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		}
	}
	return 0;
};
kha_graphics2_truetype_StbTruetype.stbtt__get_subrs = function(cff,fontdict) {
	var subrsoff = [0];
	var private_loc = [0,0];
	var i = 0;
	if(0 > fontdict.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	fontdict.cursor = 0 > fontdict.data.get_length() ? fontdict.data.get_length() : 0;
	var ret = null;
	while(fontdict.cursor < fontdict.data.get_length()) {
		var start = fontdict.cursor;
		var op;
		while(true) {
			var tmp;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				tmp = 0;
			} else {
				var pos = fontdict.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = fontdict.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = fontdict.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = fontdict.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = fontdict.cursor + 1;
				if(o > fontdict.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				fontdict.cursor = o > fontdict.data.get_length() || o < 0 ? fontdict.data.get_length() : o;
				while(fontdict.cursor < fontdict.data.get_length()) {
					if(fontdict.cursor >= fontdict.data.get_length()) {
						v = 0;
					} else {
						var pos2 = fontdict.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = fontdict.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(fontdict.cursor >= fontdict.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = fontdict.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = fontdict.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos4 = fontdict.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							fontdict.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos5 = fontdict.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							fontdict.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = fontdict.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = fontdict.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = fontdict.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = fontdict.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = fontdict.cursor;
		if(fontdict.cursor >= fontdict.data.get_length()) {
			op = 0;
		} else {
			var pos8 = fontdict.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = fontdict.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = fontdict.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = fontdict.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == 18) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > fontdict.data.get_length() || s > fontdict.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = fontdict.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > fontdict.data.get_length() || 0 > fontdict.data.get_length()) {
			operands = r1;
		} else {
			r1.data = fontdict.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < 2 && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		private_loc[i] = tmp;
		++i;
	}
	if(private_loc[1] == 0 || private_loc[0] == 0) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	}
	var o = private_loc[1];
	var s = private_loc[0];
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	var pdict;
	if(o < 0 || s < 0 || o > cff.data.get_length() || s > cff.data.get_length() - o) {
		pdict = r1;
	} else {
		r1.data = cff.data.sub(o,s);
		pdict = r1;
	}
	var i = 0;
	if(0 > pdict.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
	var ret = null;
	while(pdict.cursor < pdict.data.get_length()) {
		var start = pdict.cursor;
		var op;
		while(true) {
			var tmp;
			if(pdict.cursor >= pdict.data.get_length()) {
				tmp = 0;
			} else {
				var pos = pdict.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = pdict.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(pdict.cursor >= pdict.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = pdict.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = pdict.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = pdict.cursor + 1;
				if(o > pdict.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				pdict.cursor = o > pdict.data.get_length() || o < 0 ? pdict.data.get_length() : o;
				while(pdict.cursor < pdict.data.get_length()) {
					if(pdict.cursor >= pdict.data.get_length()) {
						v = 0;
					} else {
						var pos2 = pdict.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = pdict.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(pdict.cursor >= pdict.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = pdict.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = pdict.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(pdict.cursor < pdict.data.get_length()) {
							var pos4 = pdict.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							pdict.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(pdict.cursor < pdict.data.get_length()) {
							var pos5 = pdict.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							pdict.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(pdict.cursor >= pdict.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = pdict.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = pdict.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(pdict.cursor >= pdict.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = pdict.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = pdict.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = pdict.cursor;
		if(pdict.cursor >= pdict.data.get_length()) {
			op = 0;
		} else {
			var pos8 = pdict.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = pdict.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(pdict.cursor >= pdict.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = pdict.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = pdict.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == 19) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > pdict.data.get_length() || s > pdict.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = pdict.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
			operands = r1;
		} else {
			r1.data = pdict.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < 1 && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		subrsoff[i] = tmp;
		++i;
	}
	if(subrsoff[0] == 0) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	}
	var o = private_loc[1] + subrsoff[0];
	if(o > cff.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
	var start = cff.cursor;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(cff.cursor >= cff.data.get_length()) {
			v1 = 0;
		} else {
			var pos = cff.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = cff.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	if(count > 0) {
		var offsize;
		if(cff.cursor >= cff.data.get_length()) {
			offsize = 0;
		} else {
			var pos = cff.cursor++;
			if(pos == null) {
				pos = 0;
			}
			offsize = cff.data.readU8(pos);
		}
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var o = cff.cursor + offsize * count;
		if(o > cff.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(cff.cursor >= cff.data.get_length()) {
				v1 = 0;
			} else {
				var pos = cff.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = cff.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var o = cff.cursor + (v - 1);
		if(o > cff.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
		var s = cff.cursor - start;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(start < 0 || s < 0 || start > cff.data.get_length() || s > cff.data.get_length() - start) {
			return r1;
		} else {
			r1.data = cff.data.sub(start,s);
			return r1;
		}
	} else {
		return cff;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_InitFont = function(info,data,fontstart) {
	info.data = data;
	info.fontstart = fontstart;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	info.cff = r;
	var cmap = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"cmap");
	info.loca = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"loca");
	info.head = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"head");
	info.glyf = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"glyf");
	info.hhea = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"hhea");
	info.hmtx = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"hmtx");
	info.kern = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"kern");
	info.gpos = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"GPOS");
	if(cmap == 0 || info.head == 0 || info.hhea == 0 || info.hmtx == 0) {
		return false;
	}
	if(info.glyf != 0) {
		if(info.loca == 0) {
			return false;
		}
	} else {
		var topdict;
		var topdictidx;
		var cstype = [2];
		var charstrings = [0];
		var fdarrayoff = [0];
		var fdselectoff = [0];
		var cff = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"CFF ");
		if(cff == 0) {
			return false;
		}
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		info.fontdicts = r;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		info.fdselect = r;
		var cff_data = data.sub(cff,data.get_length() - cff);
		var size = cff_data.get_length();
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		if(size >= 1073741824) {
			throw haxe_Exception.thrown("Error");
		}
		r.data = cff_data;
		r.cursor = 0;
		info.cff = r;
		var b = info.cff;
		var o = b.cursor + 2;
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var o;
		if(b.cursor >= b.data.get_length()) {
			o = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			o = b.data.readU8(pos);
		}
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(!(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start)) {
				r1.data = b.data.sub(start,s);
			}
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				topdictidx = r1;
			} else {
				r1.data = b.data.sub(start,s);
				topdictidx = r1;
			}
		} else {
			topdictidx = b;
		}
		if(0 > topdictidx.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdictidx.cursor = 0 > topdictidx.data.get_length() ? topdictidx.data.get_length() : 0;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var offsize;
		if(topdictidx.cursor >= topdictidx.data.get_length()) {
			offsize = 0;
		} else {
			var pos = topdictidx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			offsize = topdictidx.data.readU8(pos);
		}
		if(0 >= count) {
			throw haxe_Exception.thrown("Error");
		}
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var o = topdictidx.cursor + 0 * offsize;
		if(o > topdictidx.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		topdictidx.cursor = o > topdictidx.data.get_length() || o < 0 ? topdictidx.data.get_length() : o;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var start = v;
		var v = 0;
		if(!(offsize >= 1 && offsize <= 4)) {
			throw haxe_Exception.thrown("Error");
		}
		var _g = 0;
		var _g1 = offsize;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(topdictidx.cursor >= topdictidx.data.get_length()) {
				v1 = 0;
			} else {
				var pos = topdictidx.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = topdictidx.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var end = v;
		var o = 2 + (count + 1) * offsize + start;
		var s = end - start;
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(o < 0 || s < 0 || o > topdictidx.data.get_length() || s > topdictidx.data.get_length() - o) {
			topdict = r1;
		} else {
			r1.data = topdictidx.data.sub(o,s);
			topdict = r1;
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(!(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start)) {
				r1.data = b.data.sub(start,s);
			}
		}
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var tmp;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				tmp = r1;
			} else {
				r1.data = b.data.sub(start,s);
				tmp = r1;
			}
		} else {
			tmp = b;
		}
		info.gsubrs = tmp;
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 17) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			charstrings[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 262) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			cstype[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 292) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			fdarrayoff[i] = tmp;
			++i;
		}
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 293) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			fdselectoff[i] = tmp;
			++i;
		}
		var subrsoff = [0];
		var private_loc = [0,0];
		var i = 0;
		if(0 > topdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		topdict.cursor = 0 > topdict.data.get_length() ? topdict.data.get_length() : 0;
		var ret = null;
		while(topdict.cursor < topdict.data.get_length()) {
			var start = topdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(topdict.cursor >= topdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = topdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = topdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(topdict.cursor >= topdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = topdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = topdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = topdict.cursor + 1;
					if(o > topdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					topdict.cursor = o > topdict.data.get_length() || o < 0 ? topdict.data.get_length() : o;
					while(topdict.cursor < topdict.data.get_length()) {
						if(topdict.cursor >= topdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = topdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = topdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(topdict.cursor >= topdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = topdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = topdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos4 = topdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								topdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(topdict.cursor < topdict.data.get_length()) {
								var pos5 = topdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								topdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(topdict.cursor >= topdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = topdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = topdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(topdict.cursor >= topdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = topdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = topdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = topdict.cursor;
			if(topdict.cursor >= topdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = topdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = topdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(topdict.cursor >= topdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = topdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = topdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 18) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > topdict.data.get_length() || s > topdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = topdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > topdict.data.get_length() || 0 > topdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = topdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 2 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			private_loc[i] = tmp;
			++i;
		}
		var tmp;
		if(private_loc[1] == 0 || private_loc[0] == 0) {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			tmp = r;
		} else {
			var o = private_loc[1];
			var s = private_loc[0];
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			var pdict;
			if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
				pdict = r1;
			} else {
				r1.data = b.data.sub(o,s);
				pdict = r1;
			}
			var i = 0;
			if(0 > pdict.data.get_length()) {
				throw haxe_Exception.thrown("Error");
			}
			pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
			var ret = null;
			while(pdict.cursor < pdict.data.get_length()) {
				var start = pdict.cursor;
				var op;
				while(true) {
					var tmp1;
					if(pdict.cursor >= pdict.data.get_length()) {
						tmp1 = 0;
					} else {
						var pos = pdict.cursor;
						if(pos == null) {
							pos = 0;
						}
						tmp1 = pdict.data.readU8(pos);
					}
					if(!(tmp1 >= 28)) {
						break;
					}
					var v;
					var b0;
					if(pdict.cursor >= pdict.data.get_length()) {
						b0 = 0;
					} else {
						var pos1 = pdict.cursor;
						if(pos1 == null) {
							pos1 = 0;
						}
						b0 = pdict.data.readU8(pos1);
					}
					if(b0 < 28) {
						throw haxe_Exception.thrown("Error");
					}
					if(b0 == 30) {
						var o = pdict.cursor + 1;
						if(o > pdict.data.get_length() || o < 0) {
							throw haxe_Exception.thrown("Error");
						}
						pdict.cursor = o > pdict.data.get_length() || o < 0 ? pdict.data.get_length() : o;
						while(pdict.cursor < pdict.data.get_length()) {
							if(pdict.cursor >= pdict.data.get_length()) {
								v = 0;
							} else {
								var pos2 = pdict.cursor++;
								if(pos2 == null) {
									pos2 = 0;
								}
								v = pdict.data.readU8(pos2);
							}
							if((v & 15) == 15 || v >> 4 == 15) {
								break;
							}
						}
					} else {
						var b01;
						if(pdict.cursor >= pdict.data.get_length()) {
							b01 = 0;
						} else {
							var pos3 = pdict.cursor++;
							if(pos3 == null) {
								pos3 = 0;
							}
							b01 = pdict.data.readU8(pos3);
						}
						if(!(b01 >= 32 && b01 <= 246)) {
							if(b01 >= 247 && b01 <= 250) {
								if(pdict.cursor < pdict.data.get_length()) {
									var pos4 = pdict.cursor++;
									if(pos4 == null) {
										pos4 = 0;
									}
									pdict.data.readU8(pos4);
								}
							} else if(b01 >= 251 && b01 <= 254) {
								if(pdict.cursor < pdict.data.get_length()) {
									var pos5 = pdict.cursor++;
									if(pos5 == null) {
										pos5 = 0;
									}
									pdict.data.readU8(pos5);
								}
							} else if(b01 == 28) {
								var v1 = 0;
								var _g = 0;
								var _g1 = 2;
								while(_g < _g1) {
									var i1 = _g++;
									var v2;
									if(pdict.cursor >= pdict.data.get_length()) {
										v2 = 0;
									} else {
										var pos6 = pdict.cursor++;
										if(pos6 == null) {
											pos6 = 0;
										}
										v2 = pdict.data.readU8(pos6);
									}
									v1 = v1 << 8 | v2;
								}
							} else if(b01 == 29) {
								var v3 = 0;
								var _g2 = 0;
								var _g3 = 4;
								while(_g2 < _g3) {
									var i2 = _g2++;
									var v4;
									if(pdict.cursor >= pdict.data.get_length()) {
										v4 = 0;
									} else {
										var pos7 = pdict.cursor++;
										if(pos7 == null) {
											pos7 = 0;
										}
										v4 = pdict.data.readU8(pos7);
									}
									v3 = v3 << 8 | v4;
								}
							} else {
								throw haxe_Exception.thrown("Error");
							}
						}
					}
				}
				var end = pdict.cursor;
				if(pdict.cursor >= pdict.data.get_length()) {
					op = 0;
				} else {
					var pos8 = pdict.cursor++;
					if(pos8 == null) {
						pos8 = 0;
					}
					op = pdict.data.readU8(pos8);
				}
				if(op == 12) {
					var op1;
					if(pdict.cursor >= pdict.data.get_length()) {
						op1 = 0;
					} else {
						var pos9 = pdict.cursor++;
						if(pos9 == null) {
							pos9 = 0;
						}
						op1 = pdict.data.readU8(pos9);
					}
					op = op1 | 256;
				}
				if(op == 19) {
					var s = end - start;
					var r = new kha_graphics2_truetype_Stbtt_$_$buf();
					r.data = null;
					r.cursor = 0;
					var r1 = r;
					if(start < 0 || s < 0 || start > pdict.data.get_length() || s > pdict.data.get_length() - start) {
						ret = r1;
					} else {
						r1.data = pdict.data.sub(start,s);
						ret = r1;
					}
					break;
				}
			}
			var operands;
			if(ret != null) {
				operands = ret;
			} else {
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
					operands = r1;
				} else {
					r1.data = pdict.data.sub(0,0);
					operands = r1;
				}
			}
			while(i < 1 && operands.cursor < operands.data.get_length()) {
				var b0;
				if(operands.cursor >= operands.data.get_length()) {
					b0 = 0;
				} else {
					var pos = operands.cursor++;
					if(pos == null) {
						pos = 0;
					}
					b0 = operands.data.readU8(pos);
				}
				var tmp1;
				if(b0 >= 32 && b0 <= 246) {
					tmp1 = b0 - 139;
				} else if(b0 >= 247 && b0 <= 250) {
					var tmp2;
					if(operands.cursor >= operands.data.get_length()) {
						tmp2 = 0;
					} else {
						var pos1 = operands.cursor++;
						if(pos1 == null) {
							pos1 = 0;
						}
						tmp2 = operands.data.readU8(pos1);
					}
					tmp1 = (b0 - 247) * 256 + tmp2 + 108;
				} else if(b0 >= 251 && b0 <= 254) {
					var tmp3;
					if(operands.cursor >= operands.data.get_length()) {
						tmp3 = 0;
					} else {
						var pos2 = operands.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						tmp3 = operands.data.readU8(pos2);
					}
					tmp1 = -(b0 - 251) * 256 - tmp3 - 108;
				} else if(b0 == 28) {
					var v = 0;
					var _g = 0;
					var _g1 = 2;
					while(_g < _g1) {
						var i1 = _g++;
						var v1;
						if(operands.cursor >= operands.data.get_length()) {
							v1 = 0;
						} else {
							var pos3 = operands.cursor++;
							if(pos3 == null) {
								pos3 = 0;
							}
							v1 = operands.data.readU8(pos3);
						}
						v = v << 8 | v1;
					}
					tmp1 = v;
				} else if(b0 == 29) {
					var v2 = 0;
					var _g2 = 0;
					var _g3 = 4;
					while(_g2 < _g3) {
						var i2 = _g2++;
						var v3;
						if(operands.cursor >= operands.data.get_length()) {
							v3 = 0;
						} else {
							var pos4 = operands.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							v3 = operands.data.readU8(pos4);
						}
						v2 = v2 << 8 | v3;
					}
					tmp1 = v2;
				} else {
					throw haxe_Exception.thrown("Error");
				}
				subrsoff[i] = tmp1;
				++i;
			}
			if(subrsoff[0] == 0) {
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				tmp = r;
			} else {
				var o = private_loc[1] + subrsoff[0];
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var start = b.cursor;
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var count = v;
				if(count > 0) {
					var offsize;
					if(b.cursor >= b.data.get_length()) {
						offsize = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						offsize = b.data.readU8(pos);
					}
					if(!(offsize >= 1 && offsize <= 4)) {
						throw haxe_Exception.thrown("Error");
					}
					var o = b.cursor + offsize * count;
					if(o > b.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
					var v = 0;
					if(!(offsize >= 1 && offsize <= 4)) {
						throw haxe_Exception.thrown("Error");
					}
					var _g = 0;
					var _g1 = offsize;
					while(_g < _g1) {
						var i = _g++;
						var v1;
						if(b.cursor >= b.data.get_length()) {
							v1 = 0;
						} else {
							var pos = b.cursor++;
							if(pos == null) {
								pos = 0;
							}
							v1 = b.data.readU8(pos);
						}
						v = v << 8 | v1;
					}
					var o = b.cursor + (v - 1);
					if(o > b.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
					var s = b.cursor - start;
					var r = new kha_graphics2_truetype_Stbtt_$_$buf();
					r.data = null;
					r.cursor = 0;
					var r1 = r;
					if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
						tmp = r1;
					} else {
						r1.data = b.data.sub(start,s);
						tmp = r1;
					}
				} else {
					tmp = b;
				}
			}
		}
		info.subrs = tmp;
		if(cstype[0] != 2) {
			return false;
		}
		if(charstrings[0] == 0) {
			return false;
		}
		if(fdarrayoff[0] != 0) {
			if(fdselectoff[0] == 0) {
				return false;
			}
			var o = fdarrayoff[0];
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var start = b.cursor;
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var count = v;
			var tmp;
			if(count > 0) {
				var offsize;
				if(b.cursor >= b.data.get_length()) {
					offsize = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					offsize = b.data.readU8(pos);
				}
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o = b.cursor + offsize * count;
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var v = 0;
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g = 0;
				var _g1 = offsize;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(b.cursor >= b.data.get_length()) {
						v1 = 0;
					} else {
						var pos = b.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = b.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var o = b.cursor + (v - 1);
				if(o > b.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
				var s = b.cursor - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
					tmp = r1;
				} else {
					r1.data = b.data.sub(start,s);
					tmp = r1;
				}
			} else {
				tmp = b;
			}
			info.fontdicts = tmp;
			var o = fdselectoff[0];
			var s = b.data.get_length() - fdselectoff[0];
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			var tmp;
			if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
				tmp = r1;
			} else {
				r1.data = b.data.sub(o,s);
				tmp = r1;
			}
			info.fdselect = tmp;
		}
		var o = charstrings[0];
		if(o > b.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
		var start = b.cursor;
		var v = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v1;
			if(b.cursor >= b.data.get_length()) {
				v1 = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v1 = b.data.readU8(pos);
			}
			v = v << 8 | v1;
		}
		var count = v;
		var tmp;
		if(count > 0) {
			var offsize;
			if(b.cursor >= b.data.get_length()) {
				offsize = 0;
			} else {
				var pos = b.cursor++;
				if(pos == null) {
					pos = 0;
				}
				offsize = b.data.readU8(pos);
			}
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var o = b.cursor + offsize * count;
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var v = 0;
			if(!(offsize >= 1 && offsize <= 4)) {
				throw haxe_Exception.thrown("Error");
			}
			var _g = 0;
			var _g1 = offsize;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(b.cursor >= b.data.get_length()) {
					v1 = 0;
				} else {
					var pos = b.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = b.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var o = b.cursor + (v - 1);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			var s = b.cursor - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > b.data.get_length() || s > b.data.get_length() - start) {
				tmp = r1;
			} else {
				r1.data = b.data.sub(start,s);
				tmp = r1;
			}
		} else {
			tmp = b;
		}
		info.charstrings = tmp;
	}
	var t = kha_graphics2_truetype_StbTruetype.stbtt__find_table(data,fontstart,"maxp");
	if(t != 0) {
		var pos = t + 4;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		info.numGlyphs = ch2 | ch1 << 8;
	} else {
		info.numGlyphs = 65535;
	}
	var pos = cmap + 2;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var numTables = ch2 | ch1 << 8;
	info.index_map = 0;
	var _g = 0;
	var _g1 = numTables;
	while(_g < _g1) {
		var i = _g++;
		var encoding_record = cmap + 4 + 8 * i;
		var pos = encoding_record;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		switch(ch2 | ch1 << 8) {
		case 0:
			var pos1 = encoding_record + 4;
			if(pos1 == null) {
				pos1 = 0;
			}
			var pos2 = pos1;
			if(pos2 == null) {
				pos2 = 0;
			}
			var ch11 = data.readU8(pos2);
			var ch21 = data.readU8(pos2 + 1);
			var ch3 = data.readU8(pos2 + 2);
			var ch4 = data.readU8(pos2 + 3);
			info.index_map = cmap + (ch4 | ch3 << 8 | ch21 << 16 | ch11 << 24);
			break;
		case 3:
			var pos3 = encoding_record + 2;
			if(pos3 == null) {
				pos3 = 0;
			}
			var ch12 = data.readU8(pos3);
			var ch22 = data.readU8(pos3 + 1);
			switch(ch22 | ch12 << 8) {
			case 1:case 10:
				var pos4 = encoding_record + 4;
				if(pos4 == null) {
					pos4 = 0;
				}
				var pos5 = pos4;
				if(pos5 == null) {
					pos5 = 0;
				}
				var ch13 = data.readU8(pos5);
				var ch23 = data.readU8(pos5 + 1);
				var ch31 = data.readU8(pos5 + 2);
				var ch41 = data.readU8(pos5 + 3);
				info.index_map = cmap + (ch41 | ch31 << 8 | ch23 << 16 | ch13 << 24);
				break;
			}
			break;
		}
	}
	if(info.index_map == 0) {
		return false;
	}
	var pos = info.head + 50;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	info.indexToLocFormat = ch2 | ch1 << 8;
	return true;
};
kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex = function(info,unicode_codepoint) {
	var data = info.data;
	var index_map = info.index_map;
	var pos = index_map;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var format = ch2 | ch1 << 8;
	if(format == 0) {
		var pos = index_map + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var bytes = ch2 | ch1 << 8;
		if(unicode_codepoint < bytes - 6) {
			var pos = index_map + 6 + unicode_codepoint;
			if(pos == null) {
				pos = 0;
			}
			return data.readU8(pos);
		}
		return 0;
	} else if(format == 6) {
		var pos = index_map + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var first = ch2 | ch1 << 8;
		var pos = index_map + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var count = ch2 | ch1 << 8;
		if(unicode_codepoint >= first && unicode_codepoint < first + count) {
			var pos = index_map + 10 + (unicode_codepoint - first) * 2;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			return ch2 | ch1 << 8;
		}
		return 0;
	} else if(format == 2) {
		throw haxe_Exception.thrown("Error");
	} else if(format == 4) {
		var pos = index_map + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var segcount = (ch2 | ch1 << 8) >> 1;
		var pos = index_map + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var searchRange = (ch2 | ch1 << 8) >> 1;
		var pos = index_map + 10;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var entrySelector = ch2 | ch1 << 8;
		var pos = index_map + 12;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var rangeShift = (ch2 | ch1 << 8) >> 1;
		var endCount = index_map + 14;
		var search = endCount;
		if(unicode_codepoint > 65535) {
			return 0;
		}
		var pos = search + rangeShift * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		if(unicode_codepoint >= (ch2 | ch1 << 8)) {
			search += rangeShift * 2;
		}
		search -= 2;
		while(entrySelector != 0) {
			searchRange >>= 1;
			var pos = search + searchRange * 2;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			var end = ch2 | ch1 << 8;
			if(unicode_codepoint > end) {
				search += searchRange * 2;
			}
			--entrySelector;
		}
		search += 2;
		var item = search - endCount >> 1 & 65535;
		var pos = endCount + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		if(unicode_codepoint > (ch2 | ch1 << 8)) {
			throw haxe_Exception.thrown("Error");
		}
		var pos = index_map + 14 + segcount * 2 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var start = ch2 | ch1 << 8;
		if(unicode_codepoint < start) {
			return 0;
		}
		var pos = index_map + 14 + segcount * 6 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var offset = ch2 | ch1 << 8;
		if(offset == 0) {
			var pos = index_map + 14 + segcount * 4 + 2 + 2 * item;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			var n = ch2 | ch1 << 8;
			return unicode_codepoint + ((n & 32768) != 0 ? n - 65536 : n) & 65535;
		}
		var pos = offset + (unicode_codepoint - start) * 2 + index_map + 14 + segcount * 6 + 2 + 2 * item;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		return ch2 | ch1 << 8;
	} else if(format == 12 || format == 13) {
		var pos = index_map + 12;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = data.readU8(pos1);
		var ch2 = data.readU8(pos1 + 1);
		var ch3 = data.readU8(pos1 + 2);
		var ch4 = data.readU8(pos1 + 3);
		var ngroups = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		var low = 0;
		var high = ngroups;
		while(low < high) {
			var mid = low + (high - low >> 1);
			var pos = index_map + 16 + mid * 12;
			if(pos == null) {
				pos = 0;
			}
			var pos1 = pos;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch1 = data.readU8(pos1);
			var ch2 = data.readU8(pos1 + 1);
			var ch3 = data.readU8(pos1 + 2);
			var ch4 = data.readU8(pos1 + 3);
			var start_char = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
			var pos2 = index_map + 16 + mid * 12 + 4;
			if(pos2 == null) {
				pos2 = 0;
			}
			var pos3 = pos2;
			if(pos3 == null) {
				pos3 = 0;
			}
			var ch11 = data.readU8(pos3);
			var ch21 = data.readU8(pos3 + 1);
			var ch31 = data.readU8(pos3 + 2);
			var ch41 = data.readU8(pos3 + 3);
			var end_char = ch41 | ch31 << 8 | ch21 << 16 | ch11 << 24;
			if(unicode_codepoint < start_char) {
				high = mid;
			} else if(unicode_codepoint > end_char) {
				low = mid + 1;
			} else {
				var pos4 = index_map + 16 + mid * 12 + 8;
				if(pos4 == null) {
					pos4 = 0;
				}
				var pos5 = pos4;
				if(pos5 == null) {
					pos5 = 0;
				}
				var ch12 = data.readU8(pos5);
				var ch22 = data.readU8(pos5 + 1);
				var ch32 = data.readU8(pos5 + 2);
				var ch42 = data.readU8(pos5 + 3);
				var start_glyph = ch42 | ch32 << 8 | ch22 << 16 | ch12 << 24;
				if(format == 12) {
					return start_glyph + unicode_codepoint - start_char;
				} else {
					return start_glyph;
				}
			}
		}
		return 0;
	}
	throw haxe_Exception.thrown("Error");
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointShape = function(info,unicode_codepoint) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,unicode_codepoint));
};
kha_graphics2_truetype_StbTruetype.stbtt_setvertex = function(v,type,x,y,cx,cy) {
	v.type = type;
	v.x = x;
	v.y = y;
	v.cx = cx;
	v.cy = cy;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset = function(info,glyph_index) {
	var g1;
	var g2;
	if(!(info.cff.data == null || info.cff.data.get_length() == 0)) {
		throw haxe_Exception.thrown("Error");
	}
	if(glyph_index >= info.numGlyphs) {
		return -1;
	}
	if(info.indexToLocFormat >= 2) {
		return -1;
	}
	if(info.indexToLocFormat == 0) {
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		g1 = info1 + (ch2 | ch1 << 8) * 2;
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 2 + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		g2 = info1 + (ch2 | ch1 << 8) * 2;
	} else {
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = p.readU8(pos1);
		var ch2 = p.readU8(pos1 + 1);
		var ch3 = p.readU8(pos1 + 2);
		var ch4 = p.readU8(pos1 + 3);
		g1 = info1 + (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24);
		var info1 = info.glyf;
		var p = info.data;
		var pos = info.loca + glyph_index * 4 + 4;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = p.readU8(pos1);
		var ch2 = p.readU8(pos1 + 1);
		var ch3 = p.readU8(pos1 + 2);
		var ch4 = p.readU8(pos1 + 3);
		g2 = info1 + (ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24);
	}
	if(g1 == g2) {
		return -1;
	} else {
		return g1;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox = function(info,glyph_index,rect) {
	if(info.cff.data != null && info.cff.data.get_length() > 0) {
		kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2(info,glyph_index,rect);
	} else {
		var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
		if(g < 0) {
			return false;
		}
		var p = info.data;
		var pos = g + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.x0 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 4;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.y0 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 6;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.x1 = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = g + 8;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		rect.y1 = (n & 32768) != 0 ? n - 65536 : n;
	}
	return true;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBox = function(info,codepoint,rect) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint),rect);
};
kha_graphics2_truetype_StbTruetype.stbtt_IsGlyphEmpty = function(info,glyph_index) {
	if(info.cff.data != null && info.cff.data.get_length() > 0) {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2(info,glyph_index,null) == 0;
	}
	var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
	if(g < 0) {
		return true;
	}
	var p = info.data;
	var pos = g;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	var numberOfContours = (n & 32768) != 0 ? n - 65536 : n;
	return numberOfContours == 0;
};
kha_graphics2_truetype_StbTruetype.stbtt__close_shape = function(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy) {
	if(start_off) {
		if(was_off) {
			kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,cx + scx >> 1,cy + scy >> 1,cx,cy);
		}
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,sx,sy,scx,scy);
	} else if(was_off) {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,sx,sy,cx,cy);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],2,sx,sy,0,0);
	}
	return num_vertices;
};
kha_graphics2_truetype_StbTruetype.copyVertices = function(from,to,offset,count) {
	var _g = 0;
	var _g1 = count;
	while(_g < _g1) {
		var i = _g++;
		to[offset + i] = from[i];
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeTT = function(info,glyph_index) {
	var data = info.data;
	var vertices = null;
	var num_vertices = 0;
	var g = kha_graphics2_truetype_StbTruetype.stbtt__GetGlyfOffset(info,glyph_index);
	if(g < 0) {
		return null;
	}
	var pos = g;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	var numberOfContours = (n & 32768) != 0 ? n - 65536 : n;
	if(numberOfContours > 0) {
		var flags = 0;
		var j = 0;
		var next_move = 0;
		var off = 0;
		var was_off = false;
		var start_off = false;
		var endPtsOfContoursOffset = g + 10;
		var pos = endPtsOfContoursOffset + numberOfContours * 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var ins = ch2 | ch1 << 8;
		var pointsIndex = endPtsOfContoursOffset + numberOfContours * 2 + 2 + ins;
		var pos = endPtsOfContoursOffset + numberOfContours * 2 - 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = data.readU8(pos);
		var ch2 = data.readU8(pos + 1);
		var n = 1 + (ch2 | ch1 << 8);
		var m = n + 2 * numberOfContours;
		var this1 = new Array(m);
		vertices = this1;
		if(vertices == null) {
			return null;
		} else {
			var _g = 0;
			var _g1 = vertices.length;
			while(_g < _g1) {
				var i = _g++;
				vertices[i] = new kha_graphics2_truetype_Stbtt_$vertex();
			}
		}
		next_move = 0;
		var flagcount = 0;
		off = m - n;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			if(flagcount == 0) {
				flags = data.readU8(pointsIndex++);
				if((flags & 8) != 0) {
					flagcount = data.readU8(pointsIndex++);
				}
			} else {
				--flagcount;
			}
			vertices[off + i].type = flags;
		}
		var x = 0;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			flags = vertices[off + i].type;
			if((flags & 2) != 0) {
				var dx = data.readU8(pointsIndex++);
				x += (flags & 16) != 0 ? dx : -dx;
			} else if((flags & 16) == 0) {
				var value;
				var ch1 = data.readU8(pointsIndex);
				var ch2 = data.readU8(pointsIndex + 1);
				var n1 = ch2 | ch1 << 8;
				if((n1 & 32768) != 0) {
					value = n1 - 65536;
				} else {
					value = n1;
				}
				x += value;
				pointsIndex += 2;
			}
			vertices[off + i].x = x;
		}
		var y = 0;
		var _g = 0;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			flags = vertices[off + i].type;
			if((flags & 4) != 0) {
				var dy = data.readU8(pointsIndex++);
				y += (flags & 32) != 0 ? dy : -dy;
			} else if((flags & 32) == 0) {
				var value;
				var ch1 = data.readU8(pointsIndex);
				var ch2 = data.readU8(pointsIndex + 1);
				var n1 = ch2 | ch1 << 8;
				if((n1 & 32768) != 0) {
					value = n1 - 65536;
				} else {
					value = n1;
				}
				y += value;
				pointsIndex += 2;
			}
			vertices[off + i].y = y;
		}
		num_vertices = 0;
		var scy = 0;
		var scx = scy;
		var cy = scx;
		var cx = cy;
		var sy = cx;
		var sx = sy;
		var i = 0;
		while(i < n) {
			flags = vertices[off + i].type;
			x = vertices[off + i].x;
			y = vertices[off + i].y;
			if(next_move == i) {
				if(i != 0) {
					num_vertices = kha_graphics2_truetype_StbTruetype.stbtt__close_shape(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy);
				}
				start_off = (flags & 1) == 0;
				if(start_off) {
					scx = x;
					scy = y;
					if((vertices[off + i + 1].type & 1) == 0) {
						sx = x + vertices[off + i + 1].x >> 1;
						sy = y + vertices[off + i + 1].y >> 1;
					} else {
						sx = vertices[off + i + 1].x;
						sy = vertices[off + i + 1].y;
						++i;
					}
				} else {
					sx = x;
					sy = y;
				}
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],1,sx,sy,0,0);
				was_off = false;
				var pos = endPtsOfContoursOffset + j * 2;
				if(pos == null) {
					pos = 0;
				}
				var ch1 = data.readU8(pos);
				var ch2 = data.readU8(pos + 1);
				next_move = 1 + (ch2 | ch1 << 8);
				++j;
			} else if((flags & 1) == 0) {
				if(was_off) {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,cx + x >> 1,cy + y >> 1,cx,cy);
				}
				cx = x;
				cy = y;
				was_off = true;
			} else {
				if(was_off) {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],3,x,y,cx,cy);
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(vertices[num_vertices++],2,x,y,0,0);
				}
				was_off = false;
			}
			++i;
		}
		num_vertices = kha_graphics2_truetype_StbTruetype.stbtt__close_shape(vertices,num_vertices,was_off,start_off,sx,sy,scx,scy,cx,cy);
	} else if(numberOfContours < 0) {
		var more = 1;
		var compIndex = g + 10;
		num_vertices = 0;
		vertices = null;
		while(more != 0) {
			var comp_num_verts = 0;
			var i;
			var comp_verts = null;
			var tmp = null;
			var mtx0 = 1;
			var mtx1 = 0;
			var mtx2 = 0;
			var mtx3 = 1;
			var mtx4 = 0;
			var mtx5 = 0;
			var pos = compIndex;
			if(pos == null) {
				pos = 0;
			}
			var ch1 = data.readU8(pos);
			var ch2 = data.readU8(pos + 1);
			var n = ch2 | ch1 << 8;
			var flags = (n & 32768) != 0 ? n - 65536 : n;
			var pos1 = compIndex += 2;
			if(pos1 == null) {
				pos1 = 0;
			}
			var ch11 = data.readU8(pos1);
			var ch21 = data.readU8(pos1 + 1);
			var n1 = ch21 | ch11 << 8;
			var gidx = (n1 & 32768) != 0 ? n1 - 65536 : n1;
			compIndex += 2;
			if((flags & 2) != 0) {
				if((flags & 1) != 0) {
					var pos2 = compIndex;
					if(pos2 == null) {
						pos2 = 0;
					}
					var ch12 = data.readU8(pos2);
					var ch22 = data.readU8(pos2 + 1);
					var n2 = ch22 | ch12 << 8;
					mtx4 = (n2 & 32768) != 0 ? n2 - 65536 : n2;
					var pos3 = compIndex += 2;
					if(pos3 == null) {
						pos3 = 0;
					}
					var ch13 = data.readU8(pos3);
					var ch23 = data.readU8(pos3 + 1);
					var n3 = ch23 | ch13 << 8;
					mtx5 = (n3 & 32768) != 0 ? n3 - 65536 : n3;
					compIndex += 2;
				} else {
					var pos4 = compIndex;
					if(pos4 == null) {
						pos4 = 0;
					}
					var n4 = data.readU8(pos4);
					mtx4 = n4 >= 128 ? n4 - 256 : n4;
					var pos5 = ++compIndex;
					if(pos5 == null) {
						pos5 = 0;
					}
					var n5 = data.readU8(pos5);
					mtx5 = n5 >= 128 ? n5 - 256 : n5;
					++compIndex;
				}
			} else {
				throw haxe_Exception.thrown("Error");
			}
			if((flags & 8) != 0) {
				var pos6 = compIndex;
				if(pos6 == null) {
					pos6 = 0;
				}
				var ch14 = data.readU8(pos6);
				var ch24 = data.readU8(pos6 + 1);
				var n6 = ch24 | ch14 << 8;
				mtx3 = ((n6 & 32768) != 0 ? n6 - 65536 : n6) / 16384.0;
				mtx0 = mtx3;
				compIndex += 2;
				mtx2 = 0;
				mtx1 = mtx2;
			} else if((flags & 64) != 0) {
				var pos7 = compIndex;
				if(pos7 == null) {
					pos7 = 0;
				}
				var ch15 = data.readU8(pos7);
				var ch25 = data.readU8(pos7 + 1);
				var n7 = ch25 | ch15 << 8;
				mtx0 = ((n7 & 32768) != 0 ? n7 - 65536 : n7) / 16384.0;
				compIndex += 2;
				mtx2 = 0;
				mtx1 = mtx2;
				var pos8 = compIndex;
				if(pos8 == null) {
					pos8 = 0;
				}
				var ch16 = data.readU8(pos8);
				var ch26 = data.readU8(pos8 + 1);
				var n8 = ch26 | ch16 << 8;
				mtx3 = ((n8 & 32768) != 0 ? n8 - 65536 : n8) / 16384.0;
				compIndex += 2;
			} else if((flags & 128) != 0) {
				var pos9 = compIndex;
				if(pos9 == null) {
					pos9 = 0;
				}
				var ch17 = data.readU8(pos9);
				var ch27 = data.readU8(pos9 + 1);
				var n9 = ch27 | ch17 << 8;
				mtx0 = ((n9 & 32768) != 0 ? n9 - 65536 : n9) / 16384.0;
				var pos10 = compIndex += 2;
				if(pos10 == null) {
					pos10 = 0;
				}
				var ch18 = data.readU8(pos10);
				var ch28 = data.readU8(pos10 + 1);
				var n10 = ch28 | ch18 << 8;
				mtx1 = ((n10 & 32768) != 0 ? n10 - 65536 : n10) / 16384.0;
				var pos11 = compIndex += 2;
				if(pos11 == null) {
					pos11 = 0;
				}
				var ch19 = data.readU8(pos11);
				var ch29 = data.readU8(pos11 + 1);
				var n11 = ch29 | ch19 << 8;
				mtx2 = ((n11 & 32768) != 0 ? n11 - 65536 : n11) / 16384.0;
				var pos12 = compIndex += 2;
				if(pos12 == null) {
					pos12 = 0;
				}
				var ch110 = data.readU8(pos12);
				var ch210 = data.readU8(pos12 + 1);
				var n12 = ch210 | ch110 << 8;
				mtx3 = ((n12 & 32768) != 0 ? n12 - 65536 : n12) / 16384.0;
				compIndex += 2;
			}
			var m = Math.sqrt(mtx0 * mtx0 + mtx1 * mtx1);
			var n13 = Math.sqrt(mtx2 * mtx2 + mtx3 * mtx3);
			comp_verts = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,gidx);
			comp_num_verts = comp_verts == null ? 0 : comp_verts.length;
			if(comp_num_verts > 0) {
				var _g = 0;
				var _g1 = comp_num_verts;
				while(_g < _g1) {
					var i1 = _g++;
					var v = comp_verts[i1];
					var x = v.x;
					var y = v.y;
					v.x = m * (mtx0 * x + mtx2 * y + mtx4) | 0;
					v.y = n13 * (mtx1 * x + mtx3 * y + mtx5) | 0;
					x = v.cx;
					y = v.cy;
					v.cx = m * (mtx0 * x + mtx2 * y + mtx4) | 0;
					v.cy = n13 * (mtx1 * x + mtx3 * y + mtx5) | 0;
				}
				var this1 = new Array(num_vertices + comp_num_verts);
				tmp = this1;
				if(tmp == null) {
					return null;
				}
				if(num_vertices > 0) {
					kha_graphics2_truetype_StbTruetype.copyVertices(vertices,tmp,0,num_vertices);
				}
				kha_graphics2_truetype_StbTruetype.copyVertices(comp_verts,tmp,num_vertices,comp_num_verts);
				vertices = tmp;
				num_vertices += comp_num_verts;
			}
			more = flags & 32;
		}
	}
	if(vertices == null) {
		return null;
	}
	if(vertices.length < num_vertices) {
		throw haxe_Exception.thrown("Error");
	}
	if(num_vertices < vertices.length) {
		var this1 = new Array(num_vertices);
		var tmp = this1;
		kha_graphics2_truetype_StbTruetype.copyVertices(vertices,tmp,0,num_vertices);
		return tmp;
	} else {
		return vertices;
	}
};
kha_graphics2_truetype_StbTruetype.STBTT__CSCTX_INIT = function(bounds) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = bounds;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	return tmp;
};
kha_graphics2_truetype_StbTruetype.stbtt__track_vertex = function(c,x,y) {
	if(x > c.max_x || !c.started) {
		c.max_x = x;
	}
	if(y > c.max_y || !c.started) {
		c.max_y = y;
	}
	if(x < c.min_x || !c.started) {
		c.min_x = x;
	}
	if(y < c.min_y || !c.started) {
		c.min_y = y;
	}
	c.started = true;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_v = function(c,type,x,y,cx,cy,cx1,cy1) {
	if(c.bounds) {
		if(x > c.max_x || !c.started) {
			c.max_x = x;
		}
		if(y > c.max_y || !c.started) {
			c.max_y = y;
		}
		if(x < c.min_x || !c.started) {
			c.min_x = x;
		}
		if(y < c.min_y || !c.started) {
			c.min_y = y;
		}
		c.started = true;
		if(type == 4) {
			if(cx > c.max_x || !c.started) {
				c.max_x = cx;
			}
			if(cy > c.max_y || !c.started) {
				c.max_y = cy;
			}
			if(cx < c.min_x || !c.started) {
				c.min_x = cx;
			}
			if(cy < c.min_y || !c.started) {
				c.min_y = cy;
			}
			c.started = true;
			if(cx1 > c.max_x || !c.started) {
				c.max_x = cx1;
			}
			if(cy1 > c.max_y || !c.started) {
				c.max_y = cy1;
			}
			if(cx1 < c.min_x || !c.started) {
				c.min_x = cx1;
			}
			if(cy1 < c.min_y || !c.started) {
				c.min_y = cy1;
			}
			c.started = true;
		}
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],type,x,y,cx,cy);
		c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx1 , Int);
		c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy1 , Int);
	}
	c.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_close_shape = function(ctx) {
	if(ctx.first_x != ctx.x || ctx.first_y != ctx.y) {
		var x = ctx.first_x | 0;
		var y = ctx.first_y | 0;
		if(ctx.bounds) {
			if(x > ctx.max_x || !ctx.started) {
				ctx.max_x = x;
			}
			if(y > ctx.max_y || !ctx.started) {
				ctx.max_y = y;
			}
			if(x < ctx.min_x || !ctx.started) {
				ctx.min_x = x;
			}
			if(y < ctx.min_y || !ctx.started) {
				ctx.min_y = y;
			}
			ctx.started = true;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],2,x,y,0,0);
			ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
			ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
		}
		ctx.num_vertices++;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_rmove_to = function(ctx,dx,dy) {
	if(ctx.first_x != ctx.x || ctx.first_y != ctx.y) {
		var x = ctx.first_x | 0;
		var y = ctx.first_y | 0;
		if(ctx.bounds) {
			if(x > ctx.max_x || !ctx.started) {
				ctx.max_x = x;
			}
			if(y > ctx.max_y || !ctx.started) {
				ctx.max_y = y;
			}
			if(x < ctx.min_x || !ctx.started) {
				ctx.min_x = x;
			}
			if(y < ctx.min_y || !ctx.started) {
				ctx.min_y = y;
			}
			ctx.started = true;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],2,x,y,0,0);
			ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
			ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
		}
		ctx.num_vertices++;
	}
	ctx.first_x = ctx.x = ctx.x + dx;
	ctx.first_y = ctx.y = ctx.y + dy;
	var x = ctx.x | 0;
	var y = ctx.y | 0;
	if(ctx.bounds) {
		if(x > ctx.max_x || !ctx.started) {
			ctx.max_x = x;
		}
		if(y > ctx.max_y || !ctx.started) {
			ctx.max_y = y;
		}
		if(x < ctx.min_x || !ctx.started) {
			ctx.min_x = x;
		}
		if(y < ctx.min_y || !ctx.started) {
			ctx.min_y = y;
		}
		ctx.started = true;
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],1,x,y,0,0);
		ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
		ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
	}
	ctx.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_rline_to = function(ctx,dx,dy) {
	ctx.x += dx;
	ctx.y += dy;
	var x = ctx.x | 0;
	var y = ctx.y | 0;
	if(ctx.bounds) {
		if(x > ctx.max_x || !ctx.started) {
			ctx.max_x = x;
		}
		if(y > ctx.max_y || !ctx.started) {
			ctx.max_y = y;
		}
		if(x < ctx.min_x || !ctx.started) {
			ctx.min_x = x;
		}
		if(y < ctx.min_y || !ctx.started) {
			ctx.min_y = y;
		}
		ctx.started = true;
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],2,x,y,0,0);
		ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(0 , Int);
		ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(0 , Int);
	}
	ctx.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__csctx_rccurve_to = function(ctx,dx1,dy1,dx2,dy2,dx3,dy3) {
	var cx1 = ctx.x + dx1;
	var cy1 = ctx.y + dy1;
	var cx2 = cx1 + dx2;
	var cy2 = cy1 + dy2;
	ctx.x = cx2 + dx3;
	ctx.y = cy2 + dy3;
	var x = ctx.x | 0;
	var y = ctx.y | 0;
	var cx = cx1 | 0;
	var cy = cy1 | 0;
	var cx1 = cx2 | 0;
	var cy1 = cy2 | 0;
	if(ctx.bounds) {
		if(x > ctx.max_x || !ctx.started) {
			ctx.max_x = x;
		}
		if(y > ctx.max_y || !ctx.started) {
			ctx.max_y = y;
		}
		if(x < ctx.min_x || !ctx.started) {
			ctx.min_x = x;
		}
		if(y < ctx.min_y || !ctx.started) {
			ctx.min_y = y;
		}
		ctx.started = true;
		if(cx > ctx.max_x || !ctx.started) {
			ctx.max_x = cx;
		}
		if(cy > ctx.max_y || !ctx.started) {
			ctx.max_y = cy;
		}
		if(cx < ctx.min_x || !ctx.started) {
			ctx.min_x = cx;
		}
		if(cy < ctx.min_y || !ctx.started) {
			ctx.min_y = cy;
		}
		ctx.started = true;
		if(cx1 > ctx.max_x || !ctx.started) {
			ctx.max_x = cx1;
		}
		if(cy1 > ctx.max_y || !ctx.started) {
			ctx.max_y = cy1;
		}
		if(cx1 < ctx.min_x || !ctx.started) {
			ctx.min_x = cx1;
		}
		if(cy1 < ctx.min_y || !ctx.started) {
			ctx.min_y = cy1;
		}
		ctx.started = true;
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt_setvertex(ctx.pvertices[ctx.num_vertices],4,x,y,cx,cy);
		ctx.pvertices[ctx.num_vertices].cx1 = js_Boot.__cast(cx1 , Int);
		ctx.pvertices[ctx.num_vertices].cy1 = js_Boot.__cast(cy1 , Int);
	}
	ctx.num_vertices++;
};
kha_graphics2_truetype_StbTruetype.stbtt__get_subr = function(idx,n) {
	if(0 > idx.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var bias = 107;
	if(count >= 33900) {
		bias = 32768;
	} else if(count >= 1240) {
		bias = 1131;
	}
	n += bias;
	if(n < 0 || n >= count) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	}
	if(0 > idx.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var offsize;
	if(idx.cursor >= idx.data.get_length()) {
		offsize = 0;
	} else {
		var pos = idx.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = idx.data.readU8(pos);
	}
	if(!(n >= 0 && n < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = idx.cursor + n * offsize;
	if(o > idx.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	idx.cursor = o > idx.data.get_length() || o < 0 ? idx.data.get_length() : o;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var start = v;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(idx.cursor >= idx.data.get_length()) {
			v1 = 0;
		} else {
			var pos = idx.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = idx.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var end = v;
	var o = 2 + (count + 1) * offsize + start;
	var s = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s < 0 || o > idx.data.get_length() || s > idx.data.get_length() - o) {
		return r1;
	} else {
		r1.data = idx.data.sub(o,s);
		return r1;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__cid_get_glyph_subrs = function(info,glyph_index) {
	var fdselect = info.fdselect;
	var nranges;
	var start;
	var end;
	var v;
	var fmt;
	var fdselector = -1;
	var i;
	if(0 > fdselect.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	fdselect.cursor = 0 > fdselect.data.get_length() ? fdselect.data.get_length() : 0;
	if(fdselect.cursor >= fdselect.data.get_length()) {
		fmt = 0;
	} else {
		var pos = fdselect.cursor++;
		if(pos == null) {
			pos = 0;
		}
		fmt = fdselect.data.readU8(pos);
	}
	if(fmt == 0) {
		var o = fdselect.cursor + glyph_index;
		if(o > fdselect.data.get_length() || o < 0) {
			throw haxe_Exception.thrown("Error");
		}
		fdselect.cursor = o > fdselect.data.get_length() || o < 0 ? fdselect.data.get_length() : o;
		if(fdselect.cursor >= fdselect.data.get_length()) {
			fdselector = 0;
		} else {
			var pos = fdselect.cursor++;
			if(pos == null) {
				pos = 0;
			}
			fdselector = fdselect.data.readU8(pos);
		}
	} else if(fmt == 3) {
		var v1 = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v2;
			if(fdselect.cursor >= fdselect.data.get_length()) {
				v2 = 0;
			} else {
				var pos = fdselect.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v2 = fdselect.data.readU8(pos);
			}
			v1 = v1 << 8 | v2;
		}
		nranges = v1;
		var v1 = 0;
		var _g = 0;
		var _g1 = 2;
		while(_g < _g1) {
			var i = _g++;
			var v2;
			if(fdselect.cursor >= fdselect.data.get_length()) {
				v2 = 0;
			} else {
				var pos = fdselect.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v2 = fdselect.data.readU8(pos);
			}
			v1 = v1 << 8 | v2;
		}
		start = v1;
		var _g = 0;
		var _g1 = nranges;
		while(_g < _g1) {
			var i = _g++;
			if(fdselect.cursor >= fdselect.data.get_length()) {
				v = 0;
			} else {
				var pos = fdselect.cursor++;
				if(pos == null) {
					pos = 0;
				}
				v = fdselect.data.readU8(pos);
			}
			var v1 = 0;
			var _g2 = 0;
			var _g3 = 2;
			while(_g2 < _g3) {
				var i1 = _g2++;
				var v2;
				if(fdselect.cursor >= fdselect.data.get_length()) {
					v2 = 0;
				} else {
					var pos1 = fdselect.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					v2 = fdselect.data.readU8(pos1);
				}
				v1 = v1 << 8 | v2;
			}
			end = v1;
			if(glyph_index >= start && glyph_index < end) {
				fdselector = v;
				break;
			}
			start = end;
		}
	}
	if(fdselector == -1) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
	}
	var cff = info.cff;
	var b = info.fontdicts;
	if(0 > b.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = 0 > b.data.get_length() ? b.data.get_length() : 0;
	var v = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var count = v;
	var offsize;
	if(b.cursor >= b.data.get_length()) {
		offsize = 0;
	} else {
		var pos = b.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = b.data.readU8(pos);
	}
	if(!(fdselector >= 0 && fdselector < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = b.cursor + fdselector * offsize;
	if(o > b.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var start = v;
	var v = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i = _g++;
		var v1;
		if(b.cursor >= b.data.get_length()) {
			v1 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v1 = b.data.readU8(pos);
		}
		v = v << 8 | v1;
	}
	var end = v;
	var o = 2 + (count + 1) * offsize + start;
	var s = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	var fontdict;
	if(o < 0 || s < 0 || o > b.data.get_length() || s > b.data.get_length() - o) {
		fontdict = r1;
	} else {
		r1.data = b.data.sub(o,s);
		fontdict = r1;
	}
	var subrsoff = [0];
	var private_loc = [0,0];
	var i = 0;
	if(0 > fontdict.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	fontdict.cursor = 0 > fontdict.data.get_length() ? fontdict.data.get_length() : 0;
	var ret = null;
	while(fontdict.cursor < fontdict.data.get_length()) {
		var start = fontdict.cursor;
		var op;
		while(true) {
			var tmp;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				tmp = 0;
			} else {
				var pos = fontdict.cursor;
				if(pos == null) {
					pos = 0;
				}
				tmp = fontdict.data.readU8(pos);
			}
			if(!(tmp >= 28)) {
				break;
			}
			var v;
			var b0;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				b0 = 0;
			} else {
				var pos1 = fontdict.cursor;
				if(pos1 == null) {
					pos1 = 0;
				}
				b0 = fontdict.data.readU8(pos1);
			}
			if(b0 < 28) {
				throw haxe_Exception.thrown("Error");
			}
			if(b0 == 30) {
				var o = fontdict.cursor + 1;
				if(o > fontdict.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				fontdict.cursor = o > fontdict.data.get_length() || o < 0 ? fontdict.data.get_length() : o;
				while(fontdict.cursor < fontdict.data.get_length()) {
					if(fontdict.cursor >= fontdict.data.get_length()) {
						v = 0;
					} else {
						var pos2 = fontdict.cursor++;
						if(pos2 == null) {
							pos2 = 0;
						}
						v = fontdict.data.readU8(pos2);
					}
					if((v & 15) == 15 || v >> 4 == 15) {
						break;
					}
				}
			} else {
				var b01;
				if(fontdict.cursor >= fontdict.data.get_length()) {
					b01 = 0;
				} else {
					var pos3 = fontdict.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					b01 = fontdict.data.readU8(pos3);
				}
				if(!(b01 >= 32 && b01 <= 246)) {
					if(b01 >= 247 && b01 <= 250) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos4 = fontdict.cursor++;
							if(pos4 == null) {
								pos4 = 0;
							}
							fontdict.data.readU8(pos4);
						}
					} else if(b01 >= 251 && b01 <= 254) {
						if(fontdict.cursor < fontdict.data.get_length()) {
							var pos5 = fontdict.cursor++;
							if(pos5 == null) {
								pos5 = 0;
							}
							fontdict.data.readU8(pos5);
						}
					} else if(b01 == 28) {
						var v1 = 0;
						var _g = 0;
						var _g1 = 2;
						while(_g < _g1) {
							var i1 = _g++;
							var v2;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v2 = 0;
							} else {
								var pos6 = fontdict.cursor++;
								if(pos6 == null) {
									pos6 = 0;
								}
								v2 = fontdict.data.readU8(pos6);
							}
							v1 = v1 << 8 | v2;
						}
					} else if(b01 == 29) {
						var v3 = 0;
						var _g2 = 0;
						var _g3 = 4;
						while(_g2 < _g3) {
							var i2 = _g2++;
							var v4;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								v4 = 0;
							} else {
								var pos7 = fontdict.cursor++;
								if(pos7 == null) {
									pos7 = 0;
								}
								v4 = fontdict.data.readU8(pos7);
							}
							v3 = v3 << 8 | v4;
						}
					} else {
						throw haxe_Exception.thrown("Error");
					}
				}
			}
		}
		var end = fontdict.cursor;
		if(fontdict.cursor >= fontdict.data.get_length()) {
			op = 0;
		} else {
			var pos8 = fontdict.cursor++;
			if(pos8 == null) {
				pos8 = 0;
			}
			op = fontdict.data.readU8(pos8);
		}
		if(op == 12) {
			var op1;
			if(fontdict.cursor >= fontdict.data.get_length()) {
				op1 = 0;
			} else {
				var pos9 = fontdict.cursor++;
				if(pos9 == null) {
					pos9 = 0;
				}
				op1 = fontdict.data.readU8(pos9);
			}
			op = op1 | 256;
		}
		if(op == 18) {
			var s = end - start;
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(start < 0 || s < 0 || start > fontdict.data.get_length() || s > fontdict.data.get_length() - start) {
				ret = r1;
			} else {
				r1.data = fontdict.data.sub(start,s);
				ret = r1;
			}
			break;
		}
	}
	var operands;
	if(ret != null) {
		operands = ret;
	} else {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		if(0 > fontdict.data.get_length() || 0 > fontdict.data.get_length()) {
			operands = r1;
		} else {
			r1.data = fontdict.data.sub(0,0);
			operands = r1;
		}
	}
	while(i < 2 && operands.cursor < operands.data.get_length()) {
		var b0;
		if(operands.cursor >= operands.data.get_length()) {
			b0 = 0;
		} else {
			var pos = operands.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = operands.data.readU8(pos);
		}
		var tmp;
		if(b0 >= 32 && b0 <= 246) {
			tmp = b0 - 139;
		} else if(b0 >= 247 && b0 <= 250) {
			var tmp1;
			if(operands.cursor >= operands.data.get_length()) {
				tmp1 = 0;
			} else {
				var pos1 = operands.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				tmp1 = operands.data.readU8(pos1);
			}
			tmp = (b0 - 247) * 256 + tmp1 + 108;
		} else if(b0 >= 251 && b0 <= 254) {
			var tmp2;
			if(operands.cursor >= operands.data.get_length()) {
				tmp2 = 0;
			} else {
				var pos2 = operands.cursor++;
				if(pos2 == null) {
					pos2 = 0;
				}
				tmp2 = operands.data.readU8(pos2);
			}
			tmp = -(b0 - 251) * 256 - tmp2 - 108;
		} else if(b0 == 28) {
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i1 = _g++;
				var v1;
				if(operands.cursor >= operands.data.get_length()) {
					v1 = 0;
				} else {
					var pos3 = operands.cursor++;
					if(pos3 == null) {
						pos3 = 0;
					}
					v1 = operands.data.readU8(pos3);
				}
				v = v << 8 | v1;
			}
			tmp = v;
		} else if(b0 == 29) {
			var v2 = 0;
			var _g2 = 0;
			var _g3 = 4;
			while(_g2 < _g3) {
				var i2 = _g2++;
				var v3;
				if(operands.cursor >= operands.data.get_length()) {
					v3 = 0;
				} else {
					var pos4 = operands.cursor++;
					if(pos4 == null) {
						pos4 = 0;
					}
					v3 = operands.data.readU8(pos4);
				}
				v2 = v2 << 8 | v3;
			}
			tmp = v2;
		} else {
			throw haxe_Exception.thrown("Error");
		}
		private_loc[i] = tmp;
		++i;
	}
	if(private_loc[1] == 0 || private_loc[0] == 0) {
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		return r;
	} else {
		var o = private_loc[1];
		var s = private_loc[0];
		var r = new kha_graphics2_truetype_Stbtt_$_$buf();
		r.data = null;
		r.cursor = 0;
		var r1 = r;
		var pdict;
		if(o < 0 || s < 0 || o > cff.data.get_length() || s > cff.data.get_length() - o) {
			pdict = r1;
		} else {
			r1.data = cff.data.sub(o,s);
			pdict = r1;
		}
		var i = 0;
		if(0 > pdict.data.get_length()) {
			throw haxe_Exception.thrown("Error");
		}
		pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
		var ret = null;
		while(pdict.cursor < pdict.data.get_length()) {
			var start = pdict.cursor;
			var op;
			while(true) {
				var tmp;
				if(pdict.cursor >= pdict.data.get_length()) {
					tmp = 0;
				} else {
					var pos = pdict.cursor;
					if(pos == null) {
						pos = 0;
					}
					tmp = pdict.data.readU8(pos);
				}
				if(!(tmp >= 28)) {
					break;
				}
				var v;
				var b0;
				if(pdict.cursor >= pdict.data.get_length()) {
					b0 = 0;
				} else {
					var pos1 = pdict.cursor;
					if(pos1 == null) {
						pos1 = 0;
					}
					b0 = pdict.data.readU8(pos1);
				}
				if(b0 < 28) {
					throw haxe_Exception.thrown("Error");
				}
				if(b0 == 30) {
					var o = pdict.cursor + 1;
					if(o > pdict.data.get_length() || o < 0) {
						throw haxe_Exception.thrown("Error");
					}
					pdict.cursor = o > pdict.data.get_length() || o < 0 ? pdict.data.get_length() : o;
					while(pdict.cursor < pdict.data.get_length()) {
						if(pdict.cursor >= pdict.data.get_length()) {
							v = 0;
						} else {
							var pos2 = pdict.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							v = pdict.data.readU8(pos2);
						}
						if((v & 15) == 15 || v >> 4 == 15) {
							break;
						}
					}
				} else {
					var b01;
					if(pdict.cursor >= pdict.data.get_length()) {
						b01 = 0;
					} else {
						var pos3 = pdict.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						b01 = pdict.data.readU8(pos3);
					}
					if(!(b01 >= 32 && b01 <= 246)) {
						if(b01 >= 247 && b01 <= 250) {
							if(pdict.cursor < pdict.data.get_length()) {
								var pos4 = pdict.cursor++;
								if(pos4 == null) {
									pos4 = 0;
								}
								pdict.data.readU8(pos4);
							}
						} else if(b01 >= 251 && b01 <= 254) {
							if(pdict.cursor < pdict.data.get_length()) {
								var pos5 = pdict.cursor++;
								if(pos5 == null) {
									pos5 = 0;
								}
								pdict.data.readU8(pos5);
							}
						} else if(b01 == 28) {
							var v1 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i1 = _g++;
								var v2;
								if(pdict.cursor >= pdict.data.get_length()) {
									v2 = 0;
								} else {
									var pos6 = pdict.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v2 = pdict.data.readU8(pos6);
								}
								v1 = v1 << 8 | v2;
							}
						} else if(b01 == 29) {
							var v3 = 0;
							var _g2 = 0;
							var _g3 = 4;
							while(_g2 < _g3) {
								var i2 = _g2++;
								var v4;
								if(pdict.cursor >= pdict.data.get_length()) {
									v4 = 0;
								} else {
									var pos7 = pdict.cursor++;
									if(pos7 == null) {
										pos7 = 0;
									}
									v4 = pdict.data.readU8(pos7);
								}
								v3 = v3 << 8 | v4;
							}
						} else {
							throw haxe_Exception.thrown("Error");
						}
					}
				}
			}
			var end = pdict.cursor;
			if(pdict.cursor >= pdict.data.get_length()) {
				op = 0;
			} else {
				var pos8 = pdict.cursor++;
				if(pos8 == null) {
					pos8 = 0;
				}
				op = pdict.data.readU8(pos8);
			}
			if(op == 12) {
				var op1;
				if(pdict.cursor >= pdict.data.get_length()) {
					op1 = 0;
				} else {
					var pos9 = pdict.cursor++;
					if(pos9 == null) {
						pos9 = 0;
					}
					op1 = pdict.data.readU8(pos9);
				}
				op = op1 | 256;
			}
			if(op == 19) {
				var s = end - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > pdict.data.get_length() || s > pdict.data.get_length() - start) {
					ret = r1;
				} else {
					r1.data = pdict.data.sub(start,s);
					ret = r1;
				}
				break;
			}
		}
		var operands;
		if(ret != null) {
			operands = ret;
		} else {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			var r1 = r;
			if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
				operands = r1;
			} else {
				r1.data = pdict.data.sub(0,0);
				operands = r1;
			}
		}
		while(i < 1 && operands.cursor < operands.data.get_length()) {
			var b0;
			if(operands.cursor >= operands.data.get_length()) {
				b0 = 0;
			} else {
				var pos = operands.cursor++;
				if(pos == null) {
					pos = 0;
				}
				b0 = operands.data.readU8(pos);
			}
			var tmp;
			if(b0 >= 32 && b0 <= 246) {
				tmp = b0 - 139;
			} else if(b0 >= 247 && b0 <= 250) {
				var tmp1;
				if(operands.cursor >= operands.data.get_length()) {
					tmp1 = 0;
				} else {
					var pos1 = operands.cursor++;
					if(pos1 == null) {
						pos1 = 0;
					}
					tmp1 = operands.data.readU8(pos1);
				}
				tmp = (b0 - 247) * 256 + tmp1 + 108;
			} else if(b0 >= 251 && b0 <= 254) {
				var tmp2;
				if(operands.cursor >= operands.data.get_length()) {
					tmp2 = 0;
				} else {
					var pos2 = operands.cursor++;
					if(pos2 == null) {
						pos2 = 0;
					}
					tmp2 = operands.data.readU8(pos2);
				}
				tmp = -(b0 - 251) * 256 - tmp2 - 108;
			} else if(b0 == 28) {
				var v = 0;
				var _g = 0;
				var _g1 = 2;
				while(_g < _g1) {
					var i1 = _g++;
					var v1;
					if(operands.cursor >= operands.data.get_length()) {
						v1 = 0;
					} else {
						var pos3 = operands.cursor++;
						if(pos3 == null) {
							pos3 = 0;
						}
						v1 = operands.data.readU8(pos3);
					}
					v = v << 8 | v1;
				}
				tmp = v;
			} else if(b0 == 29) {
				var v2 = 0;
				var _g2 = 0;
				var _g3 = 4;
				while(_g2 < _g3) {
					var i2 = _g2++;
					var v3;
					if(operands.cursor >= operands.data.get_length()) {
						v3 = 0;
					} else {
						var pos4 = operands.cursor++;
						if(pos4 == null) {
							pos4 = 0;
						}
						v3 = operands.data.readU8(pos4);
					}
					v2 = v2 << 8 | v3;
				}
				tmp = v2;
			} else {
				throw haxe_Exception.thrown("Error");
			}
			subrsoff[i] = tmp;
			++i;
		}
		if(subrsoff[0] == 0) {
			var r = new kha_graphics2_truetype_Stbtt_$_$buf();
			r.data = null;
			r.cursor = 0;
			return r;
		} else {
			var o = private_loc[1] + subrsoff[0];
			if(o > cff.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
			var start = cff.cursor;
			var v = 0;
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i = _g++;
				var v1;
				if(cff.cursor >= cff.data.get_length()) {
					v1 = 0;
				} else {
					var pos = cff.cursor++;
					if(pos == null) {
						pos = 0;
					}
					v1 = cff.data.readU8(pos);
				}
				v = v << 8 | v1;
			}
			var count = v;
			if(count > 0) {
				var offsize;
				if(cff.cursor >= cff.data.get_length()) {
					offsize = 0;
				} else {
					var pos = cff.cursor++;
					if(pos == null) {
						pos = 0;
					}
					offsize = cff.data.readU8(pos);
				}
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o = cff.cursor + offsize * count;
				if(o > cff.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
				var v = 0;
				if(!(offsize >= 1 && offsize <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g = 0;
				var _g1 = offsize;
				while(_g < _g1) {
					var i = _g++;
					var v1;
					if(cff.cursor >= cff.data.get_length()) {
						v1 = 0;
					} else {
						var pos = cff.cursor++;
						if(pos == null) {
							pos = 0;
						}
						v1 = cff.data.readU8(pos);
					}
					v = v << 8 | v1;
				}
				var o = cff.cursor + (v - 1);
				if(o > cff.data.get_length() || o < 0) {
					throw haxe_Exception.thrown("Error");
				}
				cff.cursor = o > cff.data.get_length() || o < 0 ? cff.data.get_length() : o;
				var s = cff.cursor - start;
				var r = new kha_graphics2_truetype_Stbtt_$_$buf();
				r.data = null;
				r.cursor = 0;
				var r1 = r;
				if(start < 0 || s < 0 || start > cff.data.get_length() || s > cff.data.get_length() - start) {
					return r1;
				} else {
					r1.data = cff.data.sub(start,s);
					return r1;
				}
			} else {
				return cff;
			}
		}
	}
};
kha_graphics2_truetype_StbTruetype.STBTT__CSERR = function(s) {
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__run_charstring = function(info,glyph_index,c) {
	var in_header = true;
	var maskbits = 0;
	var subr_stack_height = 0;
	var sp = 0;
	var v;
	var i;
	var b0;
	var has_subrs = false;
	var clear_stack;
	var _g = [];
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	_g.push(0);
	var s = _g;
	var _g = [];
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	_g.push(new kha_graphics2_truetype_Stbtt_$_$buf());
	var subr_stack = _g;
	var subrs = info.subrs;
	var b;
	var f;
	var b1 = info.charstrings;
	if(0 > b1.data.get_length()) {
		throw haxe_Exception.thrown("Error");
	}
	b1.cursor = 0 > b1.data.get_length() ? b1.data.get_length() : 0;
	var v1 = 0;
	var _g = 0;
	var _g1 = 2;
	while(_g < _g1) {
		var i1 = _g++;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var count = v1;
	var offsize;
	if(b1.cursor >= b1.data.get_length()) {
		offsize = 0;
	} else {
		var pos = b1.cursor++;
		if(pos == null) {
			pos = 0;
		}
		offsize = b1.data.readU8(pos);
	}
	if(!(glyph_index >= 0 && glyph_index < count)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var o = b1.cursor + glyph_index * offsize;
	if(o > b1.data.get_length() || o < 0) {
		throw haxe_Exception.thrown("Error");
	}
	b1.cursor = o > b1.data.get_length() || o < 0 ? b1.data.get_length() : o;
	var v1 = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i1 = _g++;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var start = v1;
	var v1 = 0;
	if(!(offsize >= 1 && offsize <= 4)) {
		throw haxe_Exception.thrown("Error");
	}
	var _g = 0;
	var _g1 = offsize;
	while(_g < _g1) {
		var i1 = _g++;
		var v2;
		if(b1.cursor >= b1.data.get_length()) {
			v2 = 0;
		} else {
			var pos = b1.cursor++;
			if(pos == null) {
				pos = 0;
			}
			v2 = b1.data.readU8(pos);
		}
		v1 = v1 << 8 | v2;
	}
	var end = v1;
	var o = 2 + (count + 1) * offsize + start;
	var s1 = end - start;
	var r = new kha_graphics2_truetype_Stbtt_$_$buf();
	r.data = null;
	r.cursor = 0;
	var r1 = r;
	if(o < 0 || s1 < 0 || o > b1.data.get_length() || s1 > b1.data.get_length() - o) {
		b = r1;
	} else {
		r1.data = b1.data.sub(o,s1);
		b = r1;
	}
	while(b.cursor < b.data.get_length()) {
		i = 0;
		clear_stack = true;
		if(b.cursor >= b.data.get_length()) {
			b0 = 0;
		} else {
			var pos = b.cursor++;
			if(pos == null) {
				pos = 0;
			}
			b0 = b.data.readU8(pos);
		}
		switch(b0) {
		case 1:case 3:case 18:case 23:
			maskbits += sp / 2 | 0;
			break;
		case 4:
			in_header = false;
			if(sp < 1) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x = c.first_x | 0;
				var y = c.first_y | 0;
				if(c.bounds) {
					if(x > c.max_x || !c.started) {
						c.max_x = x;
					}
					if(y > c.max_y || !c.started) {
						c.max_y = y;
					}
					if(x < c.min_x || !c.started) {
						c.min_x = x;
					}
					if(y < c.min_y || !c.started) {
						c.min_y = y;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x,y,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x;
			c.first_y = c.y = c.y + s[sp - 1];
			var x1 = c.x | 0;
			var y1 = c.y | 0;
			if(c.bounds) {
				if(x1 > c.max_x || !c.started) {
					c.max_x = x1;
				}
				if(y1 > c.max_y || !c.started) {
					c.max_y = y1;
				}
				if(x1 < c.min_x || !c.started) {
					c.min_x = x1;
				}
				if(y1 < c.min_y || !c.started) {
					c.min_y = y1;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x1,y1,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 5:
			if(sp < 2) {
				return false;
			}
			while(i + 1 < sp) {
				c.x += s[i];
				c.y += s[i + 1];
				var x2 = c.x | 0;
				var y2 = c.y | 0;
				if(c.bounds) {
					if(x2 > c.max_x || !c.started) {
						c.max_x = x2;
					}
					if(y2 > c.max_y || !c.started) {
						c.max_y = y2;
					}
					if(x2 < c.min_x || !c.started) {
						c.min_x = x2;
					}
					if(y2 < c.min_y || !c.started) {
						c.min_y = y2;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x2,y2,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				i += 2;
			}
			break;
		case 6:
			if(sp < 1) {
				return false;
			}
			while(i < sp) {
				c.x += s[i];
				c.y += 0;
				var x3 = c.x | 0;
				var y3 = c.y | 0;
				if(c.bounds) {
					if(x3 > c.max_x || !c.started) {
						c.max_x = x3;
					}
					if(y3 > c.max_y || !c.started) {
						c.max_y = y3;
					}
					if(x3 < c.min_x || !c.started) {
						c.min_x = x3;
					}
					if(y3 < c.min_y || !c.started) {
						c.min_y = y3;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x3,y3,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
				if(i >= sp) {
					break;
				}
				c.x += 0;
				c.y += s[i];
				var x4 = c.x | 0;
				var y4 = c.y | 0;
				if(c.bounds) {
					if(x4 > c.max_x || !c.started) {
						c.max_x = x4;
					}
					if(y4 > c.max_y || !c.started) {
						c.max_y = y4;
					}
					if(x4 < c.min_x || !c.started) {
						c.min_x = x4;
					}
					if(y4 < c.min_y || !c.started) {
						c.min_y = y4;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x4,y4,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
			}
			break;
		case 7:
			if(sp < 1) {
				return false;
			}
			while(i < sp) {
				c.x += 0;
				c.y += s[i];
				var x5 = c.x | 0;
				var y5 = c.y | 0;
				if(c.bounds) {
					if(x5 > c.max_x || !c.started) {
						c.max_x = x5;
					}
					if(y5 > c.max_y || !c.started) {
						c.max_y = y5;
					}
					if(x5 < c.min_x || !c.started) {
						c.min_x = x5;
					}
					if(y5 < c.min_y || !c.started) {
						c.min_y = y5;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x5,y5,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
				if(i >= sp) {
					break;
				}
				c.x += s[i];
				c.y += 0;
				var x6 = c.x | 0;
				var y6 = c.y | 0;
				if(c.bounds) {
					if(x6 > c.max_x || !c.started) {
						c.max_x = x6;
					}
					if(y6 > c.max_y || !c.started) {
						c.max_y = y6;
					}
					if(x6 < c.min_x || !c.started) {
						c.min_x = x6;
					}
					if(y6 < c.min_y || !c.started) {
						c.min_y = y6;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x6,y6,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				++i;
			}
			break;
		case 8:
			if(sp < 6) {
				return false;
			}
			while(i + 5 < sp) {
				var cx1 = c.x + s[i];
				var cy1 = c.y + s[i + 1];
				var cx2 = cx1 + s[i + 2];
				var cy2 = cy1 + s[i + 3];
				c.x = cx2 + s[i + 4];
				c.y = cy2 + s[i + 5];
				var x7 = c.x | 0;
				var y7 = c.y | 0;
				var cx = cx1 | 0;
				var cy = cy1 | 0;
				var cx11 = cx2 | 0;
				var cy11 = cy2 | 0;
				if(c.bounds) {
					if(x7 > c.max_x || !c.started) {
						c.max_x = x7;
					}
					if(y7 > c.max_y || !c.started) {
						c.max_y = y7;
					}
					if(x7 < c.min_x || !c.started) {
						c.min_x = x7;
					}
					if(y7 < c.min_y || !c.started) {
						c.min_y = y7;
					}
					c.started = true;
					if(cx > c.max_x || !c.started) {
						c.max_x = cx;
					}
					if(cy > c.max_y || !c.started) {
						c.max_y = cy;
					}
					if(cx < c.min_x || !c.started) {
						c.min_x = cx;
					}
					if(cy < c.min_y || !c.started) {
						c.min_y = cy;
					}
					c.started = true;
					if(cx11 > c.max_x || !c.started) {
						c.max_x = cx11;
					}
					if(cy11 > c.max_y || !c.started) {
						c.max_y = cy11;
					}
					if(cx11 < c.min_x || !c.started) {
						c.min_x = cx11;
					}
					if(cy11 < c.min_y || !c.started) {
						c.min_y = cy11;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x7,y7,cx,cy);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx11 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy11 , Int);
				}
				c.num_vertices++;
				i += 6;
			}
			break;
		case 11:
			if(subr_stack_height <= 0) {
				return false;
			}
			b = subr_stack[--subr_stack_height];
			clear_stack = false;
			break;
		case 12:
			var dx1;
			var dx2;
			var dx3;
			var dx4;
			var dx5;
			var dx6;
			var dy1;
			var dy2;
			var dy3;
			var dy4;
			var dy5;
			var dy6;
			var dx;
			var dy;
			var b1;
			if(b.cursor >= b.data.get_length()) {
				b1 = 0;
			} else {
				var pos1 = b.cursor++;
				if(pos1 == null) {
					pos1 = 0;
				}
				b1 = b.data.readU8(pos1);
			}
			switch(b1) {
			case 34:
				if(sp < 7) {
					return false;
				}
				dx1 = s[0];
				dx2 = s[1];
				dy2 = s[2];
				dx3 = s[3];
				dx4 = s[4];
				dx5 = s[5];
				dx6 = s[6];
				var cx12 = c.x + dx1;
				var cy12 = c.y;
				var cx21 = cx12 + dx2;
				var cy21 = cy12 + dy2;
				c.x = cx21 + dx3;
				c.y = cy21;
				var x8 = c.x | 0;
				var y8 = c.y | 0;
				var cx3 = cx12 | 0;
				var cy3 = cy12 | 0;
				var cx13 = cx21 | 0;
				var cy13 = cy21 | 0;
				if(c.bounds) {
					if(x8 > c.max_x || !c.started) {
						c.max_x = x8;
					}
					if(y8 > c.max_y || !c.started) {
						c.max_y = y8;
					}
					if(x8 < c.min_x || !c.started) {
						c.min_x = x8;
					}
					if(y8 < c.min_y || !c.started) {
						c.min_y = y8;
					}
					c.started = true;
					if(cx3 > c.max_x || !c.started) {
						c.max_x = cx3;
					}
					if(cy3 > c.max_y || !c.started) {
						c.max_y = cy3;
					}
					if(cx3 < c.min_x || !c.started) {
						c.min_x = cx3;
					}
					if(cy3 < c.min_y || !c.started) {
						c.min_y = cy3;
					}
					c.started = true;
					if(cx13 > c.max_x || !c.started) {
						c.max_x = cx13;
					}
					if(cy13 > c.max_y || !c.started) {
						c.max_y = cy13;
					}
					if(cx13 < c.min_x || !c.started) {
						c.min_x = cx13;
					}
					if(cy13 < c.min_y || !c.started) {
						c.min_y = cy13;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x8,y8,cx3,cy3);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx13 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy13 , Int);
				}
				c.num_vertices++;
				var cx14 = c.x + dx4;
				var cy14 = c.y;
				var cx22 = cx14 + dx5;
				var cy22 = cy14 + -dy2;
				c.x = cx22 + dx6;
				c.y = cy22;
				var x9 = c.x | 0;
				var y9 = c.y | 0;
				var cx4 = cx14 | 0;
				var cy4 = cy14 | 0;
				var cx15 = cx22 | 0;
				var cy15 = cy22 | 0;
				if(c.bounds) {
					if(x9 > c.max_x || !c.started) {
						c.max_x = x9;
					}
					if(y9 > c.max_y || !c.started) {
						c.max_y = y9;
					}
					if(x9 < c.min_x || !c.started) {
						c.min_x = x9;
					}
					if(y9 < c.min_y || !c.started) {
						c.min_y = y9;
					}
					c.started = true;
					if(cx4 > c.max_x || !c.started) {
						c.max_x = cx4;
					}
					if(cy4 > c.max_y || !c.started) {
						c.max_y = cy4;
					}
					if(cx4 < c.min_x || !c.started) {
						c.min_x = cx4;
					}
					if(cy4 < c.min_y || !c.started) {
						c.min_y = cy4;
					}
					c.started = true;
					if(cx15 > c.max_x || !c.started) {
						c.max_x = cx15;
					}
					if(cy15 > c.max_y || !c.started) {
						c.max_y = cy15;
					}
					if(cx15 < c.min_x || !c.started) {
						c.min_x = cx15;
					}
					if(cy15 < c.min_y || !c.started) {
						c.min_y = cy15;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x9,y9,cx4,cy4);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx15 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy15 , Int);
				}
				c.num_vertices++;
				break;
			case 35:
				if(sp < 13) {
					return false;
				}
				dx1 = s[0];
				dy1 = s[1];
				dx2 = s[2];
				dy2 = s[3];
				dx3 = s[4];
				dy3 = s[5];
				dx4 = s[6];
				dy4 = s[7];
				dx5 = s[8];
				dy5 = s[9];
				dx6 = s[10];
				dy6 = s[11];
				var cx16 = c.x + dx1;
				var cy16 = c.y + dy1;
				var cx23 = cx16 + dx2;
				var cy23 = cy16 + dy2;
				c.x = cx23 + dx3;
				c.y = cy23 + dy3;
				var x10 = c.x | 0;
				var y10 = c.y | 0;
				var cx5 = cx16 | 0;
				var cy5 = cy16 | 0;
				var cx17 = cx23 | 0;
				var cy17 = cy23 | 0;
				if(c.bounds) {
					if(x10 > c.max_x || !c.started) {
						c.max_x = x10;
					}
					if(y10 > c.max_y || !c.started) {
						c.max_y = y10;
					}
					if(x10 < c.min_x || !c.started) {
						c.min_x = x10;
					}
					if(y10 < c.min_y || !c.started) {
						c.min_y = y10;
					}
					c.started = true;
					if(cx5 > c.max_x || !c.started) {
						c.max_x = cx5;
					}
					if(cy5 > c.max_y || !c.started) {
						c.max_y = cy5;
					}
					if(cx5 < c.min_x || !c.started) {
						c.min_x = cx5;
					}
					if(cy5 < c.min_y || !c.started) {
						c.min_y = cy5;
					}
					c.started = true;
					if(cx17 > c.max_x || !c.started) {
						c.max_x = cx17;
					}
					if(cy17 > c.max_y || !c.started) {
						c.max_y = cy17;
					}
					if(cx17 < c.min_x || !c.started) {
						c.min_x = cx17;
					}
					if(cy17 < c.min_y || !c.started) {
						c.min_y = cy17;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x10,y10,cx5,cy5);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx17 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy17 , Int);
				}
				c.num_vertices++;
				var cx18 = c.x + dx4;
				var cy18 = c.y + dy4;
				var cx24 = cx18 + dx5;
				var cy24 = cy18 + dy5;
				c.x = cx24 + dx6;
				c.y = cy24 + dy6;
				var x11 = c.x | 0;
				var y11 = c.y | 0;
				var cx6 = cx18 | 0;
				var cy6 = cy18 | 0;
				var cx19 = cx24 | 0;
				var cy19 = cy24 | 0;
				if(c.bounds) {
					if(x11 > c.max_x || !c.started) {
						c.max_x = x11;
					}
					if(y11 > c.max_y || !c.started) {
						c.max_y = y11;
					}
					if(x11 < c.min_x || !c.started) {
						c.min_x = x11;
					}
					if(y11 < c.min_y || !c.started) {
						c.min_y = y11;
					}
					c.started = true;
					if(cx6 > c.max_x || !c.started) {
						c.max_x = cx6;
					}
					if(cy6 > c.max_y || !c.started) {
						c.max_y = cy6;
					}
					if(cx6 < c.min_x || !c.started) {
						c.min_x = cx6;
					}
					if(cy6 < c.min_y || !c.started) {
						c.min_y = cy6;
					}
					c.started = true;
					if(cx19 > c.max_x || !c.started) {
						c.max_x = cx19;
					}
					if(cy19 > c.max_y || !c.started) {
						c.max_y = cy19;
					}
					if(cx19 < c.min_x || !c.started) {
						c.min_x = cx19;
					}
					if(cy19 < c.min_y || !c.started) {
						c.min_y = cy19;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x11,y11,cx6,cy6);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx19 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy19 , Int);
				}
				c.num_vertices++;
				break;
			case 36:
				if(sp < 9) {
					return false;
				}
				dx1 = s[0];
				dy1 = s[1];
				dx2 = s[2];
				dy2 = s[3];
				dx3 = s[4];
				dx4 = s[5];
				dx5 = s[6];
				dy5 = s[7];
				dx6 = s[8];
				var cx110 = c.x + dx1;
				var cy110 = c.y + dy1;
				var cx25 = cx110 + dx2;
				var cy25 = cy110 + dy2;
				c.x = cx25 + dx3;
				c.y = cy25;
				var x12 = c.x | 0;
				var y12 = c.y | 0;
				var cx7 = cx110 | 0;
				var cy7 = cy110 | 0;
				var cx111 = cx25 | 0;
				var cy111 = cy25 | 0;
				if(c.bounds) {
					if(x12 > c.max_x || !c.started) {
						c.max_x = x12;
					}
					if(y12 > c.max_y || !c.started) {
						c.max_y = y12;
					}
					if(x12 < c.min_x || !c.started) {
						c.min_x = x12;
					}
					if(y12 < c.min_y || !c.started) {
						c.min_y = y12;
					}
					c.started = true;
					if(cx7 > c.max_x || !c.started) {
						c.max_x = cx7;
					}
					if(cy7 > c.max_y || !c.started) {
						c.max_y = cy7;
					}
					if(cx7 < c.min_x || !c.started) {
						c.min_x = cx7;
					}
					if(cy7 < c.min_y || !c.started) {
						c.min_y = cy7;
					}
					c.started = true;
					if(cx111 > c.max_x || !c.started) {
						c.max_x = cx111;
					}
					if(cy111 > c.max_y || !c.started) {
						c.max_y = cy111;
					}
					if(cx111 < c.min_x || !c.started) {
						c.min_x = cx111;
					}
					if(cy111 < c.min_y || !c.started) {
						c.min_y = cy111;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x12,y12,cx7,cy7);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx111 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy111 , Int);
				}
				c.num_vertices++;
				var cx112 = c.x + dx4;
				var cy112 = c.y;
				var cx26 = cx112 + dx5;
				var cy26 = cy112 + dy5;
				c.x = cx26 + dx6;
				c.y = cy26 + -(dy1 + dy2 + dy5);
				var x13 = c.x | 0;
				var y13 = c.y | 0;
				var cx8 = cx112 | 0;
				var cy8 = cy112 | 0;
				var cx113 = cx26 | 0;
				var cy113 = cy26 | 0;
				if(c.bounds) {
					if(x13 > c.max_x || !c.started) {
						c.max_x = x13;
					}
					if(y13 > c.max_y || !c.started) {
						c.max_y = y13;
					}
					if(x13 < c.min_x || !c.started) {
						c.min_x = x13;
					}
					if(y13 < c.min_y || !c.started) {
						c.min_y = y13;
					}
					c.started = true;
					if(cx8 > c.max_x || !c.started) {
						c.max_x = cx8;
					}
					if(cy8 > c.max_y || !c.started) {
						c.max_y = cy8;
					}
					if(cx8 < c.min_x || !c.started) {
						c.min_x = cx8;
					}
					if(cy8 < c.min_y || !c.started) {
						c.min_y = cy8;
					}
					c.started = true;
					if(cx113 > c.max_x || !c.started) {
						c.max_x = cx113;
					}
					if(cy113 > c.max_y || !c.started) {
						c.max_y = cy113;
					}
					if(cx113 < c.min_x || !c.started) {
						c.min_x = cx113;
					}
					if(cy113 < c.min_y || !c.started) {
						c.min_y = cy113;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x13,y13,cx8,cy8);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx113 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy113 , Int);
				}
				c.num_vertices++;
				break;
			case 37:
				if(sp < 11) {
					return false;
				}
				dx1 = s[0];
				dy1 = s[1];
				dx2 = s[2];
				dy2 = s[3];
				dx3 = s[4];
				dy3 = s[5];
				dx4 = s[6];
				dy4 = s[7];
				dx5 = s[8];
				dy5 = s[9];
				dy6 = s[10];
				dx6 = dy6;
				dx = dx1 + dx2 + dx3 + dx4 + dx5;
				dy = dy1 + dy2 + dy3 + dy4 + dy5;
				if(Math.abs(dx) > Math.abs(dy)) {
					dy6 = -dy;
				} else {
					dx6 = -dx;
				}
				var cx114 = c.x + dx1;
				var cy114 = c.y + dy1;
				var cx27 = cx114 + dx2;
				var cy27 = cy114 + dy2;
				c.x = cx27 + dx3;
				c.y = cy27 + dy3;
				var x14 = c.x | 0;
				var y14 = c.y | 0;
				var cx9 = cx114 | 0;
				var cy9 = cy114 | 0;
				var cx115 = cx27 | 0;
				var cy115 = cy27 | 0;
				if(c.bounds) {
					if(x14 > c.max_x || !c.started) {
						c.max_x = x14;
					}
					if(y14 > c.max_y || !c.started) {
						c.max_y = y14;
					}
					if(x14 < c.min_x || !c.started) {
						c.min_x = x14;
					}
					if(y14 < c.min_y || !c.started) {
						c.min_y = y14;
					}
					c.started = true;
					if(cx9 > c.max_x || !c.started) {
						c.max_x = cx9;
					}
					if(cy9 > c.max_y || !c.started) {
						c.max_y = cy9;
					}
					if(cx9 < c.min_x || !c.started) {
						c.min_x = cx9;
					}
					if(cy9 < c.min_y || !c.started) {
						c.min_y = cy9;
					}
					c.started = true;
					if(cx115 > c.max_x || !c.started) {
						c.max_x = cx115;
					}
					if(cy115 > c.max_y || !c.started) {
						c.max_y = cy115;
					}
					if(cx115 < c.min_x || !c.started) {
						c.min_x = cx115;
					}
					if(cy115 < c.min_y || !c.started) {
						c.min_y = cy115;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x14,y14,cx9,cy9);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx115 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy115 , Int);
				}
				c.num_vertices++;
				var cx116 = c.x + dx4;
				var cy116 = c.y + dy4;
				var cx28 = cx116 + dx5;
				var cy28 = cy116 + dy5;
				c.x = cx28 + dx6;
				c.y = cy28 + dy6;
				var x15 = c.x | 0;
				var y15 = c.y | 0;
				var cx10 = cx116 | 0;
				var cy10 = cy116 | 0;
				var cx117 = cx28 | 0;
				var cy117 = cy28 | 0;
				if(c.bounds) {
					if(x15 > c.max_x || !c.started) {
						c.max_x = x15;
					}
					if(y15 > c.max_y || !c.started) {
						c.max_y = y15;
					}
					if(x15 < c.min_x || !c.started) {
						c.min_x = x15;
					}
					if(y15 < c.min_y || !c.started) {
						c.min_y = y15;
					}
					c.started = true;
					if(cx10 > c.max_x || !c.started) {
						c.max_x = cx10;
					}
					if(cy10 > c.max_y || !c.started) {
						c.max_y = cy10;
					}
					if(cx10 < c.min_x || !c.started) {
						c.min_x = cx10;
					}
					if(cy10 < c.min_y || !c.started) {
						c.min_y = cy10;
					}
					c.started = true;
					if(cx117 > c.max_x || !c.started) {
						c.max_x = cx117;
					}
					if(cy117 > c.max_y || !c.started) {
						c.max_y = cy117;
					}
					if(cx117 < c.min_x || !c.started) {
						c.min_x = cx117;
					}
					if(cy117 < c.min_y || !c.started) {
						c.min_y = cy117;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x15,y15,cx10,cy10);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx117 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy117 , Int);
				}
				c.num_vertices++;
				break;
			default:
				return false;
			}
			break;
		case 14:
			if(c.first_x != c.x || c.first_y != c.y) {
				var x16 = c.first_x | 0;
				var y16 = c.first_y | 0;
				if(c.bounds) {
					if(x16 > c.max_x || !c.started) {
						c.max_x = x16;
					}
					if(y16 > c.max_y || !c.started) {
						c.max_y = y16;
					}
					if(x16 < c.min_x || !c.started) {
						c.min_x = x16;
					}
					if(y16 < c.min_y || !c.started) {
						c.min_y = y16;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x16,y16,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			return true;
		case 19:case 20:
			if(in_header) {
				maskbits += sp / 2 | 0;
			}
			in_header = false;
			var o = b.cursor + ((maskbits + 7) / 8 | 0);
			if(o > b.data.get_length() || o < 0) {
				throw haxe_Exception.thrown("Error");
			}
			b.cursor = o > b.data.get_length() || o < 0 ? b.data.get_length() : o;
			break;
		case 21:
			in_header = false;
			if(sp < 2) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x17 = c.first_x | 0;
				var y17 = c.first_y | 0;
				if(c.bounds) {
					if(x17 > c.max_x || !c.started) {
						c.max_x = x17;
					}
					if(y17 > c.max_y || !c.started) {
						c.max_y = y17;
					}
					if(x17 < c.min_x || !c.started) {
						c.min_x = x17;
					}
					if(y17 < c.min_y || !c.started) {
						c.min_y = y17;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x17,y17,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x + s[sp - 2];
			c.first_y = c.y = c.y + s[sp - 1];
			var x18 = c.x | 0;
			var y18 = c.y | 0;
			if(c.bounds) {
				if(x18 > c.max_x || !c.started) {
					c.max_x = x18;
				}
				if(y18 > c.max_y || !c.started) {
					c.max_y = y18;
				}
				if(x18 < c.min_x || !c.started) {
					c.min_x = x18;
				}
				if(y18 < c.min_y || !c.started) {
					c.min_y = y18;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x18,y18,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 22:
			in_header = false;
			if(sp < 1) {
				return false;
			}
			if(c.first_x != c.x || c.first_y != c.y) {
				var x19 = c.first_x | 0;
				var y19 = c.first_y | 0;
				if(c.bounds) {
					if(x19 > c.max_x || !c.started) {
						c.max_x = x19;
					}
					if(y19 > c.max_y || !c.started) {
						c.max_y = y19;
					}
					if(x19 < c.min_x || !c.started) {
						c.min_x = x19;
					}
					if(y19 < c.min_y || !c.started) {
						c.min_y = y19;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x19,y19,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
			}
			c.first_x = c.x = c.x + s[sp - 1];
			c.first_y = c.y = c.y;
			var x20 = c.x | 0;
			var y20 = c.y | 0;
			if(c.bounds) {
				if(x20 > c.max_x || !c.started) {
					c.max_x = x20;
				}
				if(y20 > c.max_y || !c.started) {
					c.max_y = y20;
				}
				if(x20 < c.min_x || !c.started) {
					c.min_x = x20;
				}
				if(y20 < c.min_y || !c.started) {
					c.min_y = y20;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],1,x20,y20,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 24:
			if(sp < 8) {
				return false;
			}
			while(i + 5 < sp - 2) {
				var cx118 = c.x + s[i];
				var cy118 = c.y + s[i + 1];
				var cx29 = cx118 + s[i + 2];
				var cy29 = cy118 + s[i + 3];
				c.x = cx29 + s[i + 4];
				c.y = cy29 + s[i + 5];
				var x21 = c.x | 0;
				var y21 = c.y | 0;
				var cx20 = cx118 | 0;
				var cy20 = cy118 | 0;
				var cx119 = cx29 | 0;
				var cy119 = cy29 | 0;
				if(c.bounds) {
					if(x21 > c.max_x || !c.started) {
						c.max_x = x21;
					}
					if(y21 > c.max_y || !c.started) {
						c.max_y = y21;
					}
					if(x21 < c.min_x || !c.started) {
						c.min_x = x21;
					}
					if(y21 < c.min_y || !c.started) {
						c.min_y = y21;
					}
					c.started = true;
					if(cx20 > c.max_x || !c.started) {
						c.max_x = cx20;
					}
					if(cy20 > c.max_y || !c.started) {
						c.max_y = cy20;
					}
					if(cx20 < c.min_x || !c.started) {
						c.min_x = cx20;
					}
					if(cy20 < c.min_y || !c.started) {
						c.min_y = cy20;
					}
					c.started = true;
					if(cx119 > c.max_x || !c.started) {
						c.max_x = cx119;
					}
					if(cy119 > c.max_y || !c.started) {
						c.max_y = cy119;
					}
					if(cx119 < c.min_x || !c.started) {
						c.min_x = cx119;
					}
					if(cy119 < c.min_y || !c.started) {
						c.min_y = cy119;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x21,y21,cx20,cy20);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx119 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy119 , Int);
				}
				c.num_vertices++;
				i += 6;
			}
			if(i + 1 >= sp) {
				return false;
			}
			c.x += s[i];
			c.y += s[i + 1];
			var x22 = c.x | 0;
			var y22 = c.y | 0;
			if(c.bounds) {
				if(x22 > c.max_x || !c.started) {
					c.max_x = x22;
				}
				if(y22 > c.max_y || !c.started) {
					c.max_y = y22;
				}
				if(x22 < c.min_x || !c.started) {
					c.min_x = x22;
				}
				if(y22 < c.min_y || !c.started) {
					c.min_y = y22;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x22,y22,0,0);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
			}
			c.num_vertices++;
			break;
		case 25:
			if(sp < 8) {
				return false;
			}
			while(i + 1 < sp - 6) {
				c.x += s[i];
				c.y += s[i + 1];
				var x23 = c.x | 0;
				var y23 = c.y | 0;
				if(c.bounds) {
					if(x23 > c.max_x || !c.started) {
						c.max_x = x23;
					}
					if(y23 > c.max_y || !c.started) {
						c.max_y = y23;
					}
					if(x23 < c.min_x || !c.started) {
						c.min_x = x23;
					}
					if(y23 < c.min_y || !c.started) {
						c.min_y = y23;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],2,x23,y23,0,0);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(0 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(0 , Int);
				}
				c.num_vertices++;
				i += 2;
			}
			if(i + 5 >= sp) {
				return false;
			}
			var cx120 = c.x + s[i];
			var cy120 = c.y + s[i + 1];
			var cx210 = cx120 + s[i + 2];
			var cy210 = cy120 + s[i + 3];
			c.x = cx210 + s[i + 4];
			c.y = cy210 + s[i + 5];
			var x24 = c.x | 0;
			var y24 = c.y | 0;
			var cx30 = cx120 | 0;
			var cy30 = cy120 | 0;
			var cx121 = cx210 | 0;
			var cy121 = cy210 | 0;
			if(c.bounds) {
				if(x24 > c.max_x || !c.started) {
					c.max_x = x24;
				}
				if(y24 > c.max_y || !c.started) {
					c.max_y = y24;
				}
				if(x24 < c.min_x || !c.started) {
					c.min_x = x24;
				}
				if(y24 < c.min_y || !c.started) {
					c.min_y = y24;
				}
				c.started = true;
				if(cx30 > c.max_x || !c.started) {
					c.max_x = cx30;
				}
				if(cy30 > c.max_y || !c.started) {
					c.max_y = cy30;
				}
				if(cx30 < c.min_x || !c.started) {
					c.min_x = cx30;
				}
				if(cy30 < c.min_y || !c.started) {
					c.min_y = cy30;
				}
				c.started = true;
				if(cx121 > c.max_x || !c.started) {
					c.max_x = cx121;
				}
				if(cy121 > c.max_y || !c.started) {
					c.max_y = cy121;
				}
				if(cx121 < c.min_x || !c.started) {
					c.min_x = cx121;
				}
				if(cy121 < c.min_y || !c.started) {
					c.min_y = cy121;
				}
				c.started = true;
			} else {
				kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x24,y24,cx30,cy30);
				c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx121 , Int);
				c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy121 , Int);
			}
			c.num_vertices++;
			break;
		case 26:case 27:
			if(sp < 4) {
				return false;
			}
			f = 0.0;
			if((sp & 1) != 0) {
				f = s[i];
				++i;
			}
			while(i + 3 < sp) {
				if(b0 == 27) {
					var cx122 = c.x + s[i];
					var cy122 = c.y + f;
					var cx211 = cx122 + s[i + 1];
					var cy211 = cy122 + s[i + 2];
					c.x = cx211 + s[i + 3];
					c.y = cy211;
					var x25 = c.x | 0;
					var y25 = c.y | 0;
					var cx31 = cx122 | 0;
					var cy31 = cy122 | 0;
					var cx123 = cx211 | 0;
					var cy123 = cy211 | 0;
					if(c.bounds) {
						if(x25 > c.max_x || !c.started) {
							c.max_x = x25;
						}
						if(y25 > c.max_y || !c.started) {
							c.max_y = y25;
						}
						if(x25 < c.min_x || !c.started) {
							c.min_x = x25;
						}
						if(y25 < c.min_y || !c.started) {
							c.min_y = y25;
						}
						c.started = true;
						if(cx31 > c.max_x || !c.started) {
							c.max_x = cx31;
						}
						if(cy31 > c.max_y || !c.started) {
							c.max_y = cy31;
						}
						if(cx31 < c.min_x || !c.started) {
							c.min_x = cx31;
						}
						if(cy31 < c.min_y || !c.started) {
							c.min_y = cy31;
						}
						c.started = true;
						if(cx123 > c.max_x || !c.started) {
							c.max_x = cx123;
						}
						if(cy123 > c.max_y || !c.started) {
							c.max_y = cy123;
						}
						if(cx123 < c.min_x || !c.started) {
							c.min_x = cx123;
						}
						if(cy123 < c.min_y || !c.started) {
							c.min_y = cy123;
						}
						c.started = true;
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x25,y25,cx31,cy31);
						c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx123 , Int);
						c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy123 , Int);
					}
					c.num_vertices++;
				} else {
					var cx124 = c.x + f;
					var cy124 = c.y + s[i];
					var cx212 = cx124 + s[i + 1];
					var cy212 = cy124 + s[i + 2];
					c.x = cx212;
					c.y = cy212 + s[i + 3];
					var x26 = c.x | 0;
					var y26 = c.y | 0;
					var cx32 = cx124 | 0;
					var cy32 = cy124 | 0;
					var cx125 = cx212 | 0;
					var cy125 = cy212 | 0;
					if(c.bounds) {
						if(x26 > c.max_x || !c.started) {
							c.max_x = x26;
						}
						if(y26 > c.max_y || !c.started) {
							c.max_y = y26;
						}
						if(x26 < c.min_x || !c.started) {
							c.min_x = x26;
						}
						if(y26 < c.min_y || !c.started) {
							c.min_y = y26;
						}
						c.started = true;
						if(cx32 > c.max_x || !c.started) {
							c.max_x = cx32;
						}
						if(cy32 > c.max_y || !c.started) {
							c.max_y = cy32;
						}
						if(cx32 < c.min_x || !c.started) {
							c.min_x = cx32;
						}
						if(cy32 < c.min_y || !c.started) {
							c.min_y = cy32;
						}
						c.started = true;
						if(cx125 > c.max_x || !c.started) {
							c.max_x = cx125;
						}
						if(cy125 > c.max_y || !c.started) {
							c.max_y = cy125;
						}
						if(cx125 < c.min_x || !c.started) {
							c.min_x = cx125;
						}
						if(cy125 < c.min_y || !c.started) {
							c.min_y = cy125;
						}
						c.started = true;
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x26,y26,cx32,cy32);
						c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx125 , Int);
						c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy125 , Int);
					}
					c.num_vertices++;
				}
				f = 0.0;
				i += 4;
			}
			break;
		case 10:case 29:
			if(b0 == 10) {
				if(!has_subrs) {
					if(info.fdselect.data.get_length() != 0) {
						var fdselect = info.fdselect;
						var nranges;
						var start;
						var end;
						var v1;
						var fmt;
						var fdselector = -1;
						var i1;
						if(0 > fdselect.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						fdselect.cursor = 0 > fdselect.data.get_length() ? fdselect.data.get_length() : 0;
						if(fdselect.cursor >= fdselect.data.get_length()) {
							fmt = 0;
						} else {
							var pos2 = fdselect.cursor++;
							if(pos2 == null) {
								pos2 = 0;
							}
							fmt = fdselect.data.readU8(pos2);
						}
						if(fmt == 0) {
							var o1 = fdselect.cursor + glyph_index;
							if(o1 > fdselect.data.get_length() || o1 < 0) {
								throw haxe_Exception.thrown("Error");
							}
							fdselect.cursor = o1 > fdselect.data.get_length() || o1 < 0 ? fdselect.data.get_length() : o1;
							if(fdselect.cursor >= fdselect.data.get_length()) {
								fdselector = 0;
							} else {
								var pos3 = fdselect.cursor++;
								if(pos3 == null) {
									pos3 = 0;
								}
								fdselector = fdselect.data.readU8(pos3);
							}
						} else if(fmt == 3) {
							var v2 = 0;
							var _g = 0;
							var _g1 = 2;
							while(_g < _g1) {
								var i2 = _g++;
								var v3;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v3 = 0;
								} else {
									var pos4 = fdselect.cursor++;
									if(pos4 == null) {
										pos4 = 0;
									}
									v3 = fdselect.data.readU8(pos4);
								}
								v2 = v2 << 8 | v3;
							}
							nranges = v2;
							var v4 = 0;
							var _g2 = 0;
							var _g3 = 2;
							while(_g2 < _g3) {
								var i3 = _g2++;
								var v5;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v5 = 0;
								} else {
									var pos5 = fdselect.cursor++;
									if(pos5 == null) {
										pos5 = 0;
									}
									v5 = fdselect.data.readU8(pos5);
								}
								v4 = v4 << 8 | v5;
							}
							start = v4;
							var _g4 = 0;
							var _g5 = nranges;
							while(_g4 < _g5) {
								var i4 = _g4++;
								if(fdselect.cursor >= fdselect.data.get_length()) {
									v1 = 0;
								} else {
									var pos6 = fdselect.cursor++;
									if(pos6 == null) {
										pos6 = 0;
									}
									v1 = fdselect.data.readU8(pos6);
								}
								var v6 = 0;
								var _g6 = 0;
								var _g7 = 2;
								while(_g6 < _g7) {
									var i5 = _g6++;
									var v7;
									if(fdselect.cursor >= fdselect.data.get_length()) {
										v7 = 0;
									} else {
										var pos7 = fdselect.cursor++;
										if(pos7 == null) {
											pos7 = 0;
										}
										v7 = fdselect.data.readU8(pos7);
									}
									v6 = v6 << 8 | v7;
								}
								end = v6;
								if(glyph_index >= start && glyph_index < end) {
									fdselector = v1;
									break;
								}
								start = end;
							}
						}
						if(fdselector == -1) {
							var r = new kha_graphics2_truetype_Stbtt_$_$buf();
							r.data = null;
							r.cursor = 0;
						}
						var cff = info.cff;
						var b2 = info.fontdicts;
						if(0 > b2.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						b2.cursor = 0 > b2.data.get_length() ? b2.data.get_length() : 0;
						var v8 = 0;
						var _g8 = 0;
						var _g9 = 2;
						while(_g8 < _g9) {
							var i6 = _g8++;
							var v9;
							if(b2.cursor >= b2.data.get_length()) {
								v9 = 0;
							} else {
								var pos8 = b2.cursor++;
								if(pos8 == null) {
									pos8 = 0;
								}
								v9 = b2.data.readU8(pos8);
							}
							v8 = v8 << 8 | v9;
						}
						var count = v8;
						var offsize;
						if(b2.cursor >= b2.data.get_length()) {
							offsize = 0;
						} else {
							var pos9 = b2.cursor++;
							if(pos9 == null) {
								pos9 = 0;
							}
							offsize = b2.data.readU8(pos9);
						}
						if(!(fdselector >= 0 && fdselector < count)) {
							throw haxe_Exception.thrown("Error");
						}
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var o2 = b2.cursor + fdselector * offsize;
						if(o2 > b2.data.get_length() || o2 < 0) {
							throw haxe_Exception.thrown("Error");
						}
						b2.cursor = o2 > b2.data.get_length() || o2 < 0 ? b2.data.get_length() : o2;
						var v10 = 0;
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var _g10 = 0;
						var _g11 = offsize;
						while(_g10 < _g11) {
							var i7 = _g10++;
							var v11;
							if(b2.cursor >= b2.data.get_length()) {
								v11 = 0;
							} else {
								var pos10 = b2.cursor++;
								if(pos10 == null) {
									pos10 = 0;
								}
								v11 = b2.data.readU8(pos10);
							}
							v10 = v10 << 8 | v11;
						}
						var start1 = v10;
						var v12 = 0;
						if(!(offsize >= 1 && offsize <= 4)) {
							throw haxe_Exception.thrown("Error");
						}
						var _g12 = 0;
						var _g13 = offsize;
						while(_g12 < _g13) {
							var i8 = _g12++;
							var v13;
							if(b2.cursor >= b2.data.get_length()) {
								v13 = 0;
							} else {
								var pos11 = b2.cursor++;
								if(pos11 == null) {
									pos11 = 0;
								}
								v13 = b2.data.readU8(pos11);
							}
							v12 = v12 << 8 | v13;
						}
						var end1 = v12;
						var o3 = 2 + (count + 1) * offsize + start1;
						var s1 = end1 - start1;
						var r1 = new kha_graphics2_truetype_Stbtt_$_$buf();
						r1.data = null;
						r1.cursor = 0;
						var r2 = r1;
						var fontdict;
						if(o3 < 0 || s1 < 0 || o3 > b2.data.get_length() || s1 > b2.data.get_length() - o3) {
							fontdict = r2;
						} else {
							r2.data = b2.data.sub(o3,s1);
							fontdict = r2;
						}
						var subrsoff = [0];
						var private_loc = [0,0];
						var i9 = 0;
						if(0 > fontdict.data.get_length()) {
							throw haxe_Exception.thrown("Error");
						}
						fontdict.cursor = 0 > fontdict.data.get_length() ? fontdict.data.get_length() : 0;
						var ret = null;
						while(fontdict.cursor < fontdict.data.get_length()) {
							var start2 = fontdict.cursor;
							var op;
							while(true) {
								var subrs1;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									subrs1 = 0;
								} else {
									var pos12 = fontdict.cursor;
									if(pos12 == null) {
										pos12 = 0;
									}
									subrs1 = fontdict.data.readU8(pos12);
								}
								if(!(subrs1 >= 28)) {
									break;
								}
								var v14;
								var b01;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									b01 = 0;
								} else {
									var pos13 = fontdict.cursor;
									if(pos13 == null) {
										pos13 = 0;
									}
									b01 = fontdict.data.readU8(pos13);
								}
								if(b01 < 28) {
									throw haxe_Exception.thrown("Error");
								}
								if(b01 == 30) {
									var o4 = fontdict.cursor + 1;
									if(o4 > fontdict.data.get_length() || o4 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									fontdict.cursor = o4 > fontdict.data.get_length() || o4 < 0 ? fontdict.data.get_length() : o4;
									while(fontdict.cursor < fontdict.data.get_length()) {
										if(fontdict.cursor >= fontdict.data.get_length()) {
											v14 = 0;
										} else {
											var pos14 = fontdict.cursor++;
											if(pos14 == null) {
												pos14 = 0;
											}
											v14 = fontdict.data.readU8(pos14);
										}
										if((v14 & 15) == 15 || v14 >> 4 == 15) {
											break;
										}
									}
								} else {
									var b02;
									if(fontdict.cursor >= fontdict.data.get_length()) {
										b02 = 0;
									} else {
										var pos15 = fontdict.cursor++;
										if(pos15 == null) {
											pos15 = 0;
										}
										b02 = fontdict.data.readU8(pos15);
									}
									if(!(b02 >= 32 && b02 <= 246)) {
										if(b02 >= 247 && b02 <= 250) {
											if(fontdict.cursor < fontdict.data.get_length()) {
												var pos16 = fontdict.cursor++;
												if(pos16 == null) {
													pos16 = 0;
												}
												fontdict.data.readU8(pos16);
											}
										} else if(b02 >= 251 && b02 <= 254) {
											if(fontdict.cursor < fontdict.data.get_length()) {
												var pos17 = fontdict.cursor++;
												if(pos17 == null) {
													pos17 = 0;
												}
												fontdict.data.readU8(pos17);
											}
										} else if(b02 == 28) {
											var v15 = 0;
											var _g14 = 0;
											var _g15 = 2;
											while(_g14 < _g15) {
												var i10 = _g14++;
												var v16;
												if(fontdict.cursor >= fontdict.data.get_length()) {
													v16 = 0;
												} else {
													var pos18 = fontdict.cursor++;
													if(pos18 == null) {
														pos18 = 0;
													}
													v16 = fontdict.data.readU8(pos18);
												}
												v15 = v15 << 8 | v16;
											}
										} else if(b02 == 29) {
											var v17 = 0;
											var _g16 = 0;
											var _g17 = 4;
											while(_g16 < _g17) {
												var i11 = _g16++;
												var v18;
												if(fontdict.cursor >= fontdict.data.get_length()) {
													v18 = 0;
												} else {
													var pos19 = fontdict.cursor++;
													if(pos19 == null) {
														pos19 = 0;
													}
													v18 = fontdict.data.readU8(pos19);
												}
												v17 = v17 << 8 | v18;
											}
										} else {
											throw haxe_Exception.thrown("Error");
										}
									}
								}
							}
							var end2 = fontdict.cursor;
							if(fontdict.cursor >= fontdict.data.get_length()) {
								op = 0;
							} else {
								var pos20 = fontdict.cursor++;
								if(pos20 == null) {
									pos20 = 0;
								}
								op = fontdict.data.readU8(pos20);
							}
							if(op == 12) {
								var op1;
								if(fontdict.cursor >= fontdict.data.get_length()) {
									op1 = 0;
								} else {
									var pos21 = fontdict.cursor++;
									if(pos21 == null) {
										pos21 = 0;
									}
									op1 = fontdict.data.readU8(pos21);
								}
								op = op1 | 256;
							}
							if(op == 18) {
								var s2 = end2 - start2;
								var r3 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r3.data = null;
								r3.cursor = 0;
								var r4 = r3;
								if(start2 < 0 || s2 < 0 || start2 > fontdict.data.get_length() || s2 > fontdict.data.get_length() - start2) {
									ret = r4;
								} else {
									r4.data = fontdict.data.sub(start2,s2);
									ret = r4;
								}
								break;
							}
						}
						var operands;
						if(ret != null) {
							operands = ret;
						} else {
							var r5 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r5.data = null;
							r5.cursor = 0;
							var r6 = r5;
							if(0 > fontdict.data.get_length() || 0 > fontdict.data.get_length()) {
								operands = r6;
							} else {
								r6.data = fontdict.data.sub(0,0);
								operands = r6;
							}
						}
						while(i9 < 2 && operands.cursor < operands.data.get_length()) {
							var b03;
							if(operands.cursor >= operands.data.get_length()) {
								b03 = 0;
							} else {
								var pos22 = operands.cursor++;
								if(pos22 == null) {
									pos22 = 0;
								}
								b03 = operands.data.readU8(pos22);
							}
							var subrs2;
							if(b03 >= 32 && b03 <= 246) {
								subrs2 = b03 - 139;
							} else if(b03 >= 247 && b03 <= 250) {
								var subrs3;
								if(operands.cursor >= operands.data.get_length()) {
									subrs3 = 0;
								} else {
									var pos23 = operands.cursor++;
									if(pos23 == null) {
										pos23 = 0;
									}
									subrs3 = operands.data.readU8(pos23);
								}
								subrs2 = (b03 - 247) * 256 + subrs3 + 108;
							} else if(b03 >= 251 && b03 <= 254) {
								var subrs4;
								if(operands.cursor >= operands.data.get_length()) {
									subrs4 = 0;
								} else {
									var pos24 = operands.cursor++;
									if(pos24 == null) {
										pos24 = 0;
									}
									subrs4 = operands.data.readU8(pos24);
								}
								subrs2 = -(b03 - 251) * 256 - subrs4 - 108;
							} else if(b03 == 28) {
								var v19 = 0;
								var _g18 = 0;
								var _g19 = 2;
								while(_g18 < _g19) {
									var i12 = _g18++;
									var v20;
									if(operands.cursor >= operands.data.get_length()) {
										v20 = 0;
									} else {
										var pos25 = operands.cursor++;
										if(pos25 == null) {
											pos25 = 0;
										}
										v20 = operands.data.readU8(pos25);
									}
									v19 = v19 << 8 | v20;
								}
								subrs2 = v19;
							} else if(b03 == 29) {
								var v21 = 0;
								var _g20 = 0;
								var _g21 = 4;
								while(_g20 < _g21) {
									var i13 = _g20++;
									var v22;
									if(operands.cursor >= operands.data.get_length()) {
										v22 = 0;
									} else {
										var pos26 = operands.cursor++;
										if(pos26 == null) {
											pos26 = 0;
										}
										v22 = operands.data.readU8(pos26);
									}
									v21 = v21 << 8 | v22;
								}
								subrs2 = v21;
							} else {
								throw haxe_Exception.thrown("Error");
							}
							private_loc[i9] = subrs2;
							++i9;
						}
						if(private_loc[1] == 0 || private_loc[0] == 0) {
							var r7 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r7.data = null;
							r7.cursor = 0;
							subrs = r7;
						} else {
							var o5 = private_loc[1];
							var s3 = private_loc[0];
							var r8 = new kha_graphics2_truetype_Stbtt_$_$buf();
							r8.data = null;
							r8.cursor = 0;
							var r9 = r8;
							var pdict;
							if(o5 < 0 || s3 < 0 || o5 > cff.data.get_length() || s3 > cff.data.get_length() - o5) {
								pdict = r9;
							} else {
								r9.data = cff.data.sub(o5,s3);
								pdict = r9;
							}
							var i14 = 0;
							if(0 > pdict.data.get_length()) {
								throw haxe_Exception.thrown("Error");
							}
							pdict.cursor = 0 > pdict.data.get_length() ? pdict.data.get_length() : 0;
							var ret1 = null;
							while(pdict.cursor < pdict.data.get_length()) {
								var start3 = pdict.cursor;
								var op2;
								while(true) {
									var subrs5;
									if(pdict.cursor >= pdict.data.get_length()) {
										subrs5 = 0;
									} else {
										var pos27 = pdict.cursor;
										if(pos27 == null) {
											pos27 = 0;
										}
										subrs5 = pdict.data.readU8(pos27);
									}
									if(!(subrs5 >= 28)) {
										break;
									}
									var v23;
									var b04;
									if(pdict.cursor >= pdict.data.get_length()) {
										b04 = 0;
									} else {
										var pos28 = pdict.cursor;
										if(pos28 == null) {
											pos28 = 0;
										}
										b04 = pdict.data.readU8(pos28);
									}
									if(b04 < 28) {
										throw haxe_Exception.thrown("Error");
									}
									if(b04 == 30) {
										var o6 = pdict.cursor + 1;
										if(o6 > pdict.data.get_length() || o6 < 0) {
											throw haxe_Exception.thrown("Error");
										}
										pdict.cursor = o6 > pdict.data.get_length() || o6 < 0 ? pdict.data.get_length() : o6;
										while(pdict.cursor < pdict.data.get_length()) {
											if(pdict.cursor >= pdict.data.get_length()) {
												v23 = 0;
											} else {
												var pos29 = pdict.cursor++;
												if(pos29 == null) {
													pos29 = 0;
												}
												v23 = pdict.data.readU8(pos29);
											}
											if((v23 & 15) == 15 || v23 >> 4 == 15) {
												break;
											}
										}
									} else {
										var b05;
										if(pdict.cursor >= pdict.data.get_length()) {
											b05 = 0;
										} else {
											var pos30 = pdict.cursor++;
											if(pos30 == null) {
												pos30 = 0;
											}
											b05 = pdict.data.readU8(pos30);
										}
										if(!(b05 >= 32 && b05 <= 246)) {
											if(b05 >= 247 && b05 <= 250) {
												if(pdict.cursor < pdict.data.get_length()) {
													var pos31 = pdict.cursor++;
													if(pos31 == null) {
														pos31 = 0;
													}
													pdict.data.readU8(pos31);
												}
											} else if(b05 >= 251 && b05 <= 254) {
												if(pdict.cursor < pdict.data.get_length()) {
													var pos32 = pdict.cursor++;
													if(pos32 == null) {
														pos32 = 0;
													}
													pdict.data.readU8(pos32);
												}
											} else if(b05 == 28) {
												var v24 = 0;
												var _g22 = 0;
												var _g23 = 2;
												while(_g22 < _g23) {
													var i15 = _g22++;
													var v25;
													if(pdict.cursor >= pdict.data.get_length()) {
														v25 = 0;
													} else {
														var pos33 = pdict.cursor++;
														if(pos33 == null) {
															pos33 = 0;
														}
														v25 = pdict.data.readU8(pos33);
													}
													v24 = v24 << 8 | v25;
												}
											} else if(b05 == 29) {
												var v26 = 0;
												var _g24 = 0;
												var _g25 = 4;
												while(_g24 < _g25) {
													var i16 = _g24++;
													var v27;
													if(pdict.cursor >= pdict.data.get_length()) {
														v27 = 0;
													} else {
														var pos34 = pdict.cursor++;
														if(pos34 == null) {
															pos34 = 0;
														}
														v27 = pdict.data.readU8(pos34);
													}
													v26 = v26 << 8 | v27;
												}
											} else {
												throw haxe_Exception.thrown("Error");
											}
										}
									}
								}
								var end3 = pdict.cursor;
								if(pdict.cursor >= pdict.data.get_length()) {
									op2 = 0;
								} else {
									var pos35 = pdict.cursor++;
									if(pos35 == null) {
										pos35 = 0;
									}
									op2 = pdict.data.readU8(pos35);
								}
								if(op2 == 12) {
									var op3;
									if(pdict.cursor >= pdict.data.get_length()) {
										op3 = 0;
									} else {
										var pos36 = pdict.cursor++;
										if(pos36 == null) {
											pos36 = 0;
										}
										op3 = pdict.data.readU8(pos36);
									}
									op2 = op3 | 256;
								}
								if(op2 == 19) {
									var s4 = end3 - start3;
									var r10 = new kha_graphics2_truetype_Stbtt_$_$buf();
									r10.data = null;
									r10.cursor = 0;
									var r11 = r10;
									if(start3 < 0 || s4 < 0 || start3 > pdict.data.get_length() || s4 > pdict.data.get_length() - start3) {
										ret1 = r11;
									} else {
										r11.data = pdict.data.sub(start3,s4);
										ret1 = r11;
									}
									break;
								}
							}
							var operands1;
							if(ret1 != null) {
								operands1 = ret1;
							} else {
								var r12 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r12.data = null;
								r12.cursor = 0;
								var r13 = r12;
								if(0 > pdict.data.get_length() || 0 > pdict.data.get_length()) {
									operands1 = r13;
								} else {
									r13.data = pdict.data.sub(0,0);
									operands1 = r13;
								}
							}
							while(i14 < 1 && operands1.cursor < operands1.data.get_length()) {
								var b06;
								if(operands1.cursor >= operands1.data.get_length()) {
									b06 = 0;
								} else {
									var pos37 = operands1.cursor++;
									if(pos37 == null) {
										pos37 = 0;
									}
									b06 = operands1.data.readU8(pos37);
								}
								var subrs6;
								if(b06 >= 32 && b06 <= 246) {
									subrs6 = b06 - 139;
								} else if(b06 >= 247 && b06 <= 250) {
									var subrs7;
									if(operands1.cursor >= operands1.data.get_length()) {
										subrs7 = 0;
									} else {
										var pos38 = operands1.cursor++;
										if(pos38 == null) {
											pos38 = 0;
										}
										subrs7 = operands1.data.readU8(pos38);
									}
									subrs6 = (b06 - 247) * 256 + subrs7 + 108;
								} else if(b06 >= 251 && b06 <= 254) {
									var subrs8;
									if(operands1.cursor >= operands1.data.get_length()) {
										subrs8 = 0;
									} else {
										var pos39 = operands1.cursor++;
										if(pos39 == null) {
											pos39 = 0;
										}
										subrs8 = operands1.data.readU8(pos39);
									}
									subrs6 = -(b06 - 251) * 256 - subrs8 - 108;
								} else if(b06 == 28) {
									var v28 = 0;
									var _g26 = 0;
									var _g27 = 2;
									while(_g26 < _g27) {
										var i17 = _g26++;
										var v29;
										if(operands1.cursor >= operands1.data.get_length()) {
											v29 = 0;
										} else {
											var pos40 = operands1.cursor++;
											if(pos40 == null) {
												pos40 = 0;
											}
											v29 = operands1.data.readU8(pos40);
										}
										v28 = v28 << 8 | v29;
									}
									subrs6 = v28;
								} else if(b06 == 29) {
									var v30 = 0;
									var _g28 = 0;
									var _g29 = 4;
									while(_g28 < _g29) {
										var i18 = _g28++;
										var v31;
										if(operands1.cursor >= operands1.data.get_length()) {
											v31 = 0;
										} else {
											var pos41 = operands1.cursor++;
											if(pos41 == null) {
												pos41 = 0;
											}
											v31 = operands1.data.readU8(pos41);
										}
										v30 = v30 << 8 | v31;
									}
									subrs6 = v30;
								} else {
									throw haxe_Exception.thrown("Error");
								}
								subrsoff[i14] = subrs6;
								++i14;
							}
							if(subrsoff[0] == 0) {
								var r14 = new kha_graphics2_truetype_Stbtt_$_$buf();
								r14.data = null;
								r14.cursor = 0;
								subrs = r14;
							} else {
								var o7 = private_loc[1] + subrsoff[0];
								if(o7 > cff.data.get_length() || o7 < 0) {
									throw haxe_Exception.thrown("Error");
								}
								cff.cursor = o7 > cff.data.get_length() || o7 < 0 ? cff.data.get_length() : o7;
								var start4 = cff.cursor;
								var v32 = 0;
								var _g30 = 0;
								var _g31 = 2;
								while(_g30 < _g31) {
									var i19 = _g30++;
									var v33;
									if(cff.cursor >= cff.data.get_length()) {
										v33 = 0;
									} else {
										var pos42 = cff.cursor++;
										if(pos42 == null) {
											pos42 = 0;
										}
										v33 = cff.data.readU8(pos42);
									}
									v32 = v32 << 8 | v33;
								}
								var count1 = v32;
								if(count1 > 0) {
									var offsize1;
									if(cff.cursor >= cff.data.get_length()) {
										offsize1 = 0;
									} else {
										var pos43 = cff.cursor++;
										if(pos43 == null) {
											pos43 = 0;
										}
										offsize1 = cff.data.readU8(pos43);
									}
									if(!(offsize1 >= 1 && offsize1 <= 4)) {
										throw haxe_Exception.thrown("Error");
									}
									var o8 = cff.cursor + offsize1 * count1;
									if(o8 > cff.data.get_length() || o8 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									cff.cursor = o8 > cff.data.get_length() || o8 < 0 ? cff.data.get_length() : o8;
									var v34 = 0;
									if(!(offsize1 >= 1 && offsize1 <= 4)) {
										throw haxe_Exception.thrown("Error");
									}
									var _g32 = 0;
									var _g33 = offsize1;
									while(_g32 < _g33) {
										var i20 = _g32++;
										var v35;
										if(cff.cursor >= cff.data.get_length()) {
											v35 = 0;
										} else {
											var pos44 = cff.cursor++;
											if(pos44 == null) {
												pos44 = 0;
											}
											v35 = cff.data.readU8(pos44);
										}
										v34 = v34 << 8 | v35;
									}
									var o9 = cff.cursor + (v34 - 1);
									if(o9 > cff.data.get_length() || o9 < 0) {
										throw haxe_Exception.thrown("Error");
									}
									cff.cursor = o9 > cff.data.get_length() || o9 < 0 ? cff.data.get_length() : o9;
									var s5 = cff.cursor - start4;
									var r15 = new kha_graphics2_truetype_Stbtt_$_$buf();
									r15.data = null;
									r15.cursor = 0;
									var r16 = r15;
									if(start4 < 0 || s5 < 0 || start4 > cff.data.get_length() || s5 > cff.data.get_length() - start4) {
										subrs = r16;
									} else {
										r16.data = cff.data.sub(start4,s5);
										subrs = r16;
									}
								} else {
									subrs = cff;
								}
							}
						}
					}
					has_subrs = true;
				}
			}
			if(sp < 1) {
				return false;
			}
			v = s[--sp] | 0;
			if(subr_stack_height >= 10) {
				return false;
			}
			subr_stack[subr_stack_height++] = b;
			var idx = b0 == 10 ? subrs : info.gsubrs;
			var n = v;
			if(0 > idx.data.get_length()) {
				throw haxe_Exception.thrown("Error");
			}
			idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
			var v36 = 0;
			var _g34 = 0;
			var _g35 = 2;
			while(_g34 < _g35) {
				var i21 = _g34++;
				var v37;
				if(idx.cursor >= idx.data.get_length()) {
					v37 = 0;
				} else {
					var pos45 = idx.cursor++;
					if(pos45 == null) {
						pos45 = 0;
					}
					v37 = idx.data.readU8(pos45);
				}
				v36 = v36 << 8 | v37;
			}
			var count2 = v36;
			var bias = 107;
			if(count2 >= 33900) {
				bias = 32768;
			} else if(count2 >= 1240) {
				bias = 1131;
			}
			n += bias;
			if(n < 0 || n >= count2) {
				var r17 = new kha_graphics2_truetype_Stbtt_$_$buf();
				r17.data = null;
				r17.cursor = 0;
				b = r17;
			} else {
				if(0 > idx.data.get_length()) {
					throw haxe_Exception.thrown("Error");
				}
				idx.cursor = 0 > idx.data.get_length() ? idx.data.get_length() : 0;
				var v38 = 0;
				var _g36 = 0;
				var _g37 = 2;
				while(_g36 < _g37) {
					var i22 = _g36++;
					var v39;
					if(idx.cursor >= idx.data.get_length()) {
						v39 = 0;
					} else {
						var pos46 = idx.cursor++;
						if(pos46 == null) {
							pos46 = 0;
						}
						v39 = idx.data.readU8(pos46);
					}
					v38 = v38 << 8 | v39;
				}
				var count3 = v38;
				var offsize2;
				if(idx.cursor >= idx.data.get_length()) {
					offsize2 = 0;
				} else {
					var pos47 = idx.cursor++;
					if(pos47 == null) {
						pos47 = 0;
					}
					offsize2 = idx.data.readU8(pos47);
				}
				if(!(n >= 0 && n < count3)) {
					throw haxe_Exception.thrown("Error");
				}
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var o10 = idx.cursor + n * offsize2;
				if(o10 > idx.data.get_length() || o10 < 0) {
					throw haxe_Exception.thrown("Error");
				}
				idx.cursor = o10 > idx.data.get_length() || o10 < 0 ? idx.data.get_length() : o10;
				var v40 = 0;
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g38 = 0;
				var _g39 = offsize2;
				while(_g38 < _g39) {
					var i23 = _g38++;
					var v41;
					if(idx.cursor >= idx.data.get_length()) {
						v41 = 0;
					} else {
						var pos48 = idx.cursor++;
						if(pos48 == null) {
							pos48 = 0;
						}
						v41 = idx.data.readU8(pos48);
					}
					v40 = v40 << 8 | v41;
				}
				var start5 = v40;
				var v42 = 0;
				if(!(offsize2 >= 1 && offsize2 <= 4)) {
					throw haxe_Exception.thrown("Error");
				}
				var _g40 = 0;
				var _g41 = offsize2;
				while(_g40 < _g41) {
					var i24 = _g40++;
					var v43;
					if(idx.cursor >= idx.data.get_length()) {
						v43 = 0;
					} else {
						var pos49 = idx.cursor++;
						if(pos49 == null) {
							pos49 = 0;
						}
						v43 = idx.data.readU8(pos49);
					}
					v42 = v42 << 8 | v43;
				}
				var end4 = v42;
				var o11 = 2 + (count3 + 1) * offsize2 + start5;
				var s6 = end4 - start5;
				var r18 = new kha_graphics2_truetype_Stbtt_$_$buf();
				r18.data = null;
				r18.cursor = 0;
				var r19 = r18;
				if(o11 < 0 || s6 < 0 || o11 > idx.data.get_length() || s6 > idx.data.get_length() - o11) {
					b = r19;
				} else {
					r19.data = idx.data.sub(o11,s6);
					b = r19;
				}
			}
			if(b.data.get_length() == 0) {
				return false;
			}
			b.cursor = 0;
			clear_stack = false;
			break;
		case 30:
			if(sp < 4) {
				return false;
			}
			while(i + 3 < sp) {
				var cx126 = c.x;
				var cy126 = c.y + s[i];
				var cx213 = cx126 + s[i + 1];
				var cy213 = cy126 + s[i + 2];
				c.x = cx213 + s[i + 3];
				c.y = cy213 + (sp - i == 5 ? s[i + 4] : 0);
				var x27 = c.x | 0;
				var y27 = c.y | 0;
				var cx33 = cx126 | 0;
				var cy33 = cy126 | 0;
				var cx127 = cx213 | 0;
				var cy127 = cy213 | 0;
				if(c.bounds) {
					if(x27 > c.max_x || !c.started) {
						c.max_x = x27;
					}
					if(y27 > c.max_y || !c.started) {
						c.max_y = y27;
					}
					if(x27 < c.min_x || !c.started) {
						c.min_x = x27;
					}
					if(y27 < c.min_y || !c.started) {
						c.min_y = y27;
					}
					c.started = true;
					if(cx33 > c.max_x || !c.started) {
						c.max_x = cx33;
					}
					if(cy33 > c.max_y || !c.started) {
						c.max_y = cy33;
					}
					if(cx33 < c.min_x || !c.started) {
						c.min_x = cx33;
					}
					if(cy33 < c.min_y || !c.started) {
						c.min_y = cy33;
					}
					c.started = true;
					if(cx127 > c.max_x || !c.started) {
						c.max_x = cx127;
					}
					if(cy127 > c.max_y || !c.started) {
						c.max_y = cy127;
					}
					if(cx127 < c.min_x || !c.started) {
						c.min_x = cx127;
					}
					if(cy127 < c.min_y || !c.started) {
						c.min_y = cy127;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x27,y27,cx33,cy33);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx127 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy127 , Int);
				}
				c.num_vertices++;
				i += 4;
				if(i + 3 >= sp) {
					break;
				}
				var cx128 = c.x + s[i];
				var cy128 = c.y;
				var cx214 = cx128 + s[i + 1];
				var cy214 = cy128 + s[i + 2];
				c.x = cx214 + (sp - i == 5 ? s[i + 4] : 0);
				c.y = cy214 + s[i + 3];
				var x28 = c.x | 0;
				var y28 = c.y | 0;
				var cx34 = cx128 | 0;
				var cy34 = cy128 | 0;
				var cx129 = cx214 | 0;
				var cy129 = cy214 | 0;
				if(c.bounds) {
					if(x28 > c.max_x || !c.started) {
						c.max_x = x28;
					}
					if(y28 > c.max_y || !c.started) {
						c.max_y = y28;
					}
					if(x28 < c.min_x || !c.started) {
						c.min_x = x28;
					}
					if(y28 < c.min_y || !c.started) {
						c.min_y = y28;
					}
					c.started = true;
					if(cx34 > c.max_x || !c.started) {
						c.max_x = cx34;
					}
					if(cy34 > c.max_y || !c.started) {
						c.max_y = cy34;
					}
					if(cx34 < c.min_x || !c.started) {
						c.min_x = cx34;
					}
					if(cy34 < c.min_y || !c.started) {
						c.min_y = cy34;
					}
					c.started = true;
					if(cx129 > c.max_x || !c.started) {
						c.max_x = cx129;
					}
					if(cy129 > c.max_y || !c.started) {
						c.max_y = cy129;
					}
					if(cx129 < c.min_x || !c.started) {
						c.min_x = cx129;
					}
					if(cy129 < c.min_y || !c.started) {
						c.min_y = cy129;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x28,y28,cx34,cy34);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx129 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy129 , Int);
				}
				c.num_vertices++;
				i += 4;
			}
			break;
		case 31:
			if(sp < 4) {
				return false;
			}
			while(i + 3 < sp) {
				var cx130 = c.x + s[i];
				var cy130 = c.y;
				var cx215 = cx130 + s[i + 1];
				var cy215 = cy130 + s[i + 2];
				c.x = cx215 + (sp - i == 5 ? s[i + 4] : 0);
				c.y = cy215 + s[i + 3];
				var x29 = c.x | 0;
				var y29 = c.y | 0;
				var cx35 = cx130 | 0;
				var cy35 = cy130 | 0;
				var cx131 = cx215 | 0;
				var cy131 = cy215 | 0;
				if(c.bounds) {
					if(x29 > c.max_x || !c.started) {
						c.max_x = x29;
					}
					if(y29 > c.max_y || !c.started) {
						c.max_y = y29;
					}
					if(x29 < c.min_x || !c.started) {
						c.min_x = x29;
					}
					if(y29 < c.min_y || !c.started) {
						c.min_y = y29;
					}
					c.started = true;
					if(cx35 > c.max_x || !c.started) {
						c.max_x = cx35;
					}
					if(cy35 > c.max_y || !c.started) {
						c.max_y = cy35;
					}
					if(cx35 < c.min_x || !c.started) {
						c.min_x = cx35;
					}
					if(cy35 < c.min_y || !c.started) {
						c.min_y = cy35;
					}
					c.started = true;
					if(cx131 > c.max_x || !c.started) {
						c.max_x = cx131;
					}
					if(cy131 > c.max_y || !c.started) {
						c.max_y = cy131;
					}
					if(cx131 < c.min_x || !c.started) {
						c.min_x = cx131;
					}
					if(cy131 < c.min_y || !c.started) {
						c.min_y = cy131;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x29,y29,cx35,cy35);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx131 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy131 , Int);
				}
				c.num_vertices++;
				i += 4;
				if(i + 3 >= sp) {
					break;
				}
				var cx132 = c.x;
				var cy132 = c.y + s[i];
				var cx216 = cx132 + s[i + 1];
				var cy216 = cy132 + s[i + 2];
				c.x = cx216 + s[i + 3];
				c.y = cy216 + (sp - i == 5 ? s[i + 4] : 0);
				var x30 = c.x | 0;
				var y30 = c.y | 0;
				var cx36 = cx132 | 0;
				var cy36 = cy132 | 0;
				var cx133 = cx216 | 0;
				var cy133 = cy216 | 0;
				if(c.bounds) {
					if(x30 > c.max_x || !c.started) {
						c.max_x = x30;
					}
					if(y30 > c.max_y || !c.started) {
						c.max_y = y30;
					}
					if(x30 < c.min_x || !c.started) {
						c.min_x = x30;
					}
					if(y30 < c.min_y || !c.started) {
						c.min_y = y30;
					}
					c.started = true;
					if(cx36 > c.max_x || !c.started) {
						c.max_x = cx36;
					}
					if(cy36 > c.max_y || !c.started) {
						c.max_y = cy36;
					}
					if(cx36 < c.min_x || !c.started) {
						c.min_x = cx36;
					}
					if(cy36 < c.min_y || !c.started) {
						c.min_y = cy36;
					}
					c.started = true;
					if(cx133 > c.max_x || !c.started) {
						c.max_x = cx133;
					}
					if(cy133 > c.max_y || !c.started) {
						c.max_y = cy133;
					}
					if(cx133 < c.min_x || !c.started) {
						c.min_x = cx133;
					}
					if(cy133 < c.min_y || !c.started) {
						c.min_y = cy133;
					}
					c.started = true;
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt_setvertex(c.pvertices[c.num_vertices],4,x30,y30,cx36,cy36);
					c.pvertices[c.num_vertices].cx1 = js_Boot.__cast(cx133 , Int);
					c.pvertices[c.num_vertices].cy1 = js_Boot.__cast(cy133 , Int);
				}
				c.num_vertices++;
				i += 4;
			}
			break;
		default:
			if(b0 != 255 && b0 != 28 && (b0 < 32 || b0 > 254)) {
				return false;
			}
			if(b0 == 255) {
				var v44 = 0;
				var _g42 = 0;
				var _g43 = 4;
				while(_g42 < _g43) {
					var i25 = _g42++;
					var v45;
					if(b.cursor >= b.data.get_length()) {
						v45 = 0;
					} else {
						var pos50 = b.cursor++;
						if(pos50 == null) {
							pos50 = 0;
						}
						v45 = b.data.readU8(pos50);
					}
					v44 = v44 << 8 | v45;
				}
				f = v44 / 65536;
			} else {
				var o12 = b.cursor + (-1);
				if(o12 > b.data.get_length() || o12 < 0) {
					throw haxe_Exception.thrown("Error");
				}
				b.cursor = o12 > b.data.get_length() || o12 < 0 ? b.data.get_length() : o12;
				var b07;
				if(b.cursor >= b.data.get_length()) {
					b07 = 0;
				} else {
					var pos51 = b.cursor++;
					if(pos51 == null) {
						pos51 = 0;
					}
					b07 = b.data.readU8(pos51);
				}
				if(b07 >= 32 && b07 <= 246) {
					f = b07 - 139;
				} else if(b07 >= 247 && b07 <= 250) {
					var f1;
					if(b.cursor >= b.data.get_length()) {
						f1 = 0;
					} else {
						var pos52 = b.cursor++;
						if(pos52 == null) {
							pos52 = 0;
						}
						f1 = b.data.readU8(pos52);
					}
					f = (b07 - 247) * 256 + f1 + 108;
				} else if(b07 >= 251 && b07 <= 254) {
					var f2;
					if(b.cursor >= b.data.get_length()) {
						f2 = 0;
					} else {
						var pos53 = b.cursor++;
						if(pos53 == null) {
							pos53 = 0;
						}
						f2 = b.data.readU8(pos53);
					}
					f = -(b07 - 251) * 256 - f2 - 108;
				} else if(b07 == 28) {
					var v46 = 0;
					var _g44 = 0;
					var _g45 = 2;
					while(_g44 < _g45) {
						var i26 = _g44++;
						var v47;
						if(b.cursor >= b.data.get_length()) {
							v47 = 0;
						} else {
							var pos54 = b.cursor++;
							if(pos54 == null) {
								pos54 = 0;
							}
							v47 = b.data.readU8(pos54);
						}
						v46 = v46 << 8 | v47;
					}
					f = v46;
				} else if(b07 == 29) {
					var v48 = 0;
					var _g46 = 0;
					var _g47 = 4;
					while(_g46 < _g47) {
						var i27 = _g46++;
						var v49;
						if(b.cursor >= b.data.get_length()) {
							v49 = 0;
						} else {
							var pos55 = b.cursor++;
							if(pos55 == null) {
								pos55 = 0;
							}
							v49 = b.data.readU8(pos55);
						}
						v48 = v48 << 8 | v49;
					}
					f = v48;
				} else {
					throw haxe_Exception.thrown("Error");
				}
			}
			if(sp >= 48) {
				return false;
			}
			s[sp++] = f;
			clear_stack = false;
		}
		if(clear_stack) {
			sp = 0;
		}
	}
	return false;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeT2 = function(info,glyph_index) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = true;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var count_ctx = tmp;
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = false;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var output_ctx = tmp;
	if(kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,count_ctx)) {
		var this1 = new Array(count_ctx.num_vertices);
		output_ctx.pvertices = this1;
		var _g = 0;
		var _g1 = count_ctx.num_vertices;
		while(_g < _g1) {
			var i = _g++;
			output_ctx.pvertices[i] = new kha_graphics2_truetype_Stbtt_$vertex();
		}
		if(kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,output_ctx)) {
			if(output_ctx.num_vertices != count_ctx.num_vertices) {
				throw haxe_Exception.thrown("Error");
			}
			return output_ctx.pvertices;
		}
	}
	return null;
};
kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphInfoT2 = function(info,glyph_index,rect) {
	var tmp = new kha_graphics2_truetype_Stbtt_$_$csctx();
	tmp.bounds = true;
	tmp.started = false;
	tmp.first_x = 0;
	tmp.first_y = 0;
	tmp.x = 0;
	tmp.y = 0;
	tmp.min_x = 0;
	tmp.min_y = 0;
	tmp.max_x = 0;
	tmp.max_y = 0;
	tmp.pvertices = null;
	tmp.num_vertices = 0;
	var c = tmp;
	var r = kha_graphics2_truetype_StbTruetype.stbtt__run_charstring(info,glyph_index,c);
	if(rect != null) {
		rect.x0 = r ? c.min_x : 0;
		rect.y0 = r ? c.min_y : 0;
		rect.x1 = r ? c.max_x : 0;
		rect.y1 = r ? c.max_y : 0;
	}
	if(r) {
		return c.num_vertices;
	} else {
		return 0;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape = function(info,glyph_index) {
	if(info.cff.data == null || info.cff.data.get_length() == 0) {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeTT(info,glyph_index);
	} else {
		return kha_graphics2_truetype_StbTruetype.stbtt__GetGlyphShapeT2(info,glyph_index);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics = function(info,glyph_index) {
	var p = info.data;
	var pos = info.hhea + 34;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var numOfLongHorMetrics = ch2 | ch1 << 8;
	var metrics = new kha_graphics2_truetype_Stbtt_$temp_$glyph_$h_$metrics();
	if(glyph_index < numOfLongHorMetrics) {
		var p = info.data;
		var pos = info.hmtx + 4 * glyph_index;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.advanceWidth = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = info.hmtx + 4 * glyph_index + 2;
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.leftSideBearing = (n & 32768) != 0 ? n - 65536 : n;
	} else {
		var p = info.data;
		var pos = info.hmtx + 4 * (numOfLongHorMetrics - 1);
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.advanceWidth = (n & 32768) != 0 ? n - 65536 : n;
		var p = info.data;
		var pos = info.hmtx + 4 * numOfLongHorMetrics + 2 * (glyph_index - numOfLongHorMetrics);
		if(pos == null) {
			pos = 0;
		}
		var ch1 = p.readU8(pos);
		var ch2 = p.readU8(pos + 1);
		var n = ch2 | ch1 << 8;
		metrics.leftSideBearing = (n & 32768) != 0 ? n - 65536 : n;
	}
	return metrics;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphKernAdvance = function(info,glyph1,glyph2) {
	var kern = info.kern;
	var data = info.data;
	var straw;
	var m;
	if(info.kern == 0) {
		return 0;
	}
	var pos = kern + 2;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	if((ch2 | ch1 << 8) < 1) {
		return 0;
	}
	var pos = kern + 8;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	if((ch2 | ch1 << 8) != 1) {
		return 0;
	}
	var l = 0;
	var pos = kern + 10;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = data.readU8(pos);
	var ch2 = data.readU8(pos + 1);
	var r = (ch2 | ch1 << 8) - 1;
	var needle = glyph1 << 16 | glyph2;
	while(l <= r) {
		m = l + r >> 1;
		var pos = kern + 18 + m * 6;
		if(pos == null) {
			pos = 0;
		}
		var pos1 = pos;
		if(pos1 == null) {
			pos1 = 0;
		}
		var ch1 = data.readU8(pos1);
		var ch2 = data.readU8(pos1 + 1);
		var ch3 = data.readU8(pos1 + 2);
		var ch4 = data.readU8(pos1 + 3);
		straw = ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		if(needle < straw) {
			r = m - 1;
		} else if(needle > straw) {
			l = m + 1;
		} else {
			var pos2 = kern + 22 + m * 6;
			if(pos2 == null) {
				pos2 = 0;
			}
			var ch11 = data.readU8(pos2);
			var ch21 = data.readU8(pos2 + 1);
			var n = ch21 | ch11 << 8;
			if((n & 32768) != 0) {
				return n - 65536;
			} else {
				return n;
			}
		}
	}
	return 0;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointKernAdvance = function(info,ch1,ch2) {
	if(info.kern == 0) {
		return 0;
	}
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphKernAdvance(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,ch1),kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,ch2));
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointHMetrics = function(info,codepoint) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics(info,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint));
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontVMetrics = function(info) {
	var metrics = new kha_graphics2_truetype_Stbtt_$temp_$font_$v_$metrics();
	var p = info.data;
	var pos = info.hhea + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	metrics.ascent = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.hhea + 6;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	metrics.descent = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.hhea + 8;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	metrics.lineGap = (n & 32768) != 0 ? n - 65536 : n;
	return metrics;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetFontBoundingBox = function(info) {
	var rect = new kha_graphics2_truetype_Stbtt_$temp_$rect();
	var p = info.data;
	var pos = info.head + 36;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.x0 = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.head + 38;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.y0 = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.head + 40;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.x1 = (n & 32768) != 0 ? n - 65536 : n;
	var p = info.data;
	var pos = info.head + 42;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	rect.y1 = (n & 32768) != 0 ? n - 65536 : n;
	return rect;
};
kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight = function(info,height) {
	var p = info.data;
	var pos = info.hhea + 4;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n = ch2 | ch1 << 8;
	var p = info.data;
	var pos = info.hhea + 6;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var n1 = ch2 | ch1 << 8;
	var fheight = ((n & 32768) != 0 ? n - 65536 : n) - ((n1 & 32768) != 0 ? n1 - 65536 : n1);
	return height / fheight;
};
kha_graphics2_truetype_StbTruetype.stbtt_ScaleForMappingEmToPixels = function(info,pixels) {
	var p = info.data;
	var pos = info.head + 18;
	if(pos == null) {
		pos = 0;
	}
	var ch1 = p.readU8(pos);
	var ch2 = p.readU8(pos + 1);
	var unitsPerEm = ch2 | ch1 << 8;
	return pixels / unitsPerEm;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel = function(font,glyph,scale_x,scale_y,shift_x,shift_y) {
	var rect = new kha_graphics2_truetype_Stbtt_$temp_$rect();
	if(!kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBox(font,glyph,rect)) {
		rect.x0 = 0;
		rect.y0 = 0;
		rect.x1 = 0;
		rect.y1 = 0;
	} else {
		var x0 = rect.x0;
		var x1 = rect.x1;
		var y0 = rect.y0;
		var y1 = rect.y1;
		rect.x0 = Math.floor(x0 * scale_x + shift_x);
		rect.y0 = Math.floor(-y1 * scale_y + shift_y);
		rect.x1 = Math.ceil(x1 * scale_x + shift_x);
		rect.y1 = Math.ceil(-y0 * scale_y + shift_y);
	}
	return rect;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBox = function(font,glyph,scale_x,scale_y) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(font,glyph,scale_x,scale_y,0.0,0.0);
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapBoxSubpixel = function(font,codepoint,scale_x,scale_y,shift_x,shift_y) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(font,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(font,codepoint),scale_x,scale_y,shift_x,shift_y);
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapBox = function(font,codepoint,scale_x,scale_y) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapBoxSubpixel(font,codepoint,scale_x,scale_y,0.0,0.0);
};
kha_graphics2_truetype_StbTruetype.stbtt__new_active = function(e,eIndex,off_x,start_point) {
	var z = new kha_graphics2_truetype_Stbtt_$_$active_$edge();
	var dxdy = (e[eIndex].x1 - e[eIndex].x0) / (e[eIndex].y1 - e[eIndex].y0);
	if(z == null) {
		throw haxe_Exception.thrown("Error");
	}
	if(z == null) {
		return z;
	}
	z.fdx = dxdy;
	z.fdy = dxdy != 0.0 ? 1.0 / dxdy : 0.0;
	z.fx = e[eIndex].x0 + dxdy * (start_point - e[eIndex].y0);
	z.fx -= off_x;
	z.direction = e[eIndex].invert ? 1.0 : -1.0;
	z.sy = e[eIndex].y0;
	z.ey = e[eIndex].y1;
	z.next = null;
	return z;
};
kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge = function(scanline,scanlineIndex,x,e,x0,y0,x1,y1) {
	if(y0 == y1) {
		return;
	}
	if(!(y0 < y1)) {
		throw haxe_Exception.thrown("Error");
	}
	if(!(e.sy <= e.ey)) {
		throw haxe_Exception.thrown("Error");
	}
	if(y0 > e.ey) {
		return;
	}
	if(y1 < e.sy) {
		return;
	}
	if(y0 < e.sy) {
		x0 += (x1 - x0) * (e.sy - y0) / (y1 - y0);
		y0 = e.sy;
	}
	if(y1 > e.ey) {
		x1 += (x1 - x0) * (e.ey - y1) / (y1 - y0);
		y1 = e.ey;
	}
	if(x0 == x) {
		if(!(x1 <= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 == x + 1) {
		if(!(x1 >= x)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 <= x) {
		if(!(x1 <= x)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(x0 >= x + 1) {
		if(!(x1 >= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
	} else if(!(x1 >= x && x1 <= x + 1)) {
		throw haxe_Exception.thrown("Error");
	}
	if(x0 <= x && x1 <= x) {
		scanline[scanlineIndex + x] += e.direction * (y1 - y0);
	} else if(!(x0 >= x + 1 && x1 >= x + 1)) {
		if(!(x0 >= x && x0 <= x + 1 && x1 >= x && x1 <= x + 1)) {
			throw haxe_Exception.thrown("Error");
		}
		scanline[scanlineIndex + x] += e.direction * (y1 - y0) * (1 - (x0 - x + (x1 - x)) / 2);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__fill_active_edges_new = function(scanline,scanline_fill,scanline_fillIndex,len,e,y_top) {
	var y_bottom = y_top + 1;
	while(e != null) {
		if(!(e.ey >= y_top)) {
			throw haxe_Exception.thrown("Error");
		}
		if(e.fdx == 0) {
			var x0 = e.fx;
			if(x0 < len) {
				if(x0 >= 0) {
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x0 | 0,e,x0,y_top,x0,y_bottom);
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline_fill,scanline_fillIndex - 1,x0 + 1 | 0,e,x0,y_top,x0,y_bottom);
				} else {
					kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline_fill,scanline_fillIndex - 1,0,e,x0,y_top,x0,y_bottom);
				}
			}
		} else {
			var x01 = e.fx;
			var dx = e.fdx;
			var xb = x01 + dx;
			var x_top;
			var x_bottom;
			var sy0;
			var sy1;
			var dy = e.fdy;
			if(!(e.sy <= y_bottom && e.ey >= y_top)) {
				throw haxe_Exception.thrown("Error");
			}
			if(e.sy > y_top) {
				x_top = x01 + dx * (e.sy - y_top);
				sy0 = e.sy;
			} else {
				x_top = x01;
				sy0 = y_top;
			}
			if(e.ey < y_bottom) {
				x_bottom = x01 + dx * (e.ey - y_top);
				sy1 = e.ey;
			} else {
				x_bottom = xb;
				sy1 = y_bottom;
			}
			if(x_top >= 0 && x_bottom >= 0 && x_top < len && x_bottom < len) {
				if((x_top | 0) == (x_bottom | 0)) {
					var x = x_top | 0;
					var height = sy1 - sy0;
					if(!(x >= 0 && x < len)) {
						throw haxe_Exception.thrown("Error");
					}
					scanline[x] += e.direction * (1 - (x_top - x + (x_bottom - x)) / 2) * height;
					scanline_fill[scanline_fillIndex + x] += e.direction * height;
				} else {
					var x1;
					if(x_top > x_bottom) {
						sy0 = y_bottom - (sy0 - y_top);
						sy1 = y_bottom - (sy1 - y_top);
						var t = sy0;
						sy0 = sy1;
						sy1 = t;
						t = x_bottom;
						x_bottom = x_top;
						x_top = t;
						dx = -dx;
						dy = -dy;
						t = x01;
						x01 = xb;
						xb = t;
					}
					var x11 = x_top | 0;
					var x2 = x_bottom | 0;
					var y_crossing = (x11 + 1 - x01) * dy + y_top;
					var sign = e.direction;
					var area = sign * (y_crossing - sy0);
					scanline[x11] += area * (1 - (x_top - x11 + (x11 + 1 - x11)) / 2);
					var step = sign * dy;
					var _g = x11 + 1;
					var _g1 = x2;
					while(_g < _g1) {
						var x3 = _g++;
						scanline[x3] += area + step / 2;
						area += step;
					}
					y_crossing += dy * (x2 - (x11 + 1));
					if(!(Math.abs(area) <= 1.01)) {
						throw haxe_Exception.thrown("Error");
					}
					scanline[x2] += area + sign * (1 - (x2 - x2 + (x_bottom - x2)) / 2) * (sy1 - y_crossing);
					scanline_fill[scanline_fillIndex + x2] += sign * (sy1 - sy0);
				}
			} else {
				var _g2 = 0;
				var _g3 = len;
				while(_g2 < _g3) {
					var x4 = _g2++;
					var y0 = y_top;
					var x12 = x4;
					var x21 = x4 + 1;
					var x31 = xb;
					var y3 = y_bottom;
					var y1 = (x4 - x01) / dx + y_top;
					var y2 = (x4 + 1 - x01) / dx + y_top;
					if(x01 < x12 && x31 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x31,y3);
					} else if(x31 < x12 && x01 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x31,y3);
					} else if(x01 < x12 && x31 > x12) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x31,y3);
					} else if(x31 < x12 && x01 > x12) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x12,y1);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x12,y1,x31,y3);
					} else if(x01 < x21 && x31 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x31,y3);
					} else if(x31 < x21 && x01 > x21) {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x21,y2);
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x21,y2,x31,y3);
					} else {
						kha_graphics2_truetype_StbTruetype.stbtt__handle_clipped_edge(scanline,0,x4,e,x01,y0,x31,y3);
					}
				}
			}
		}
		e = e.next;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__rasterize_sorted_edges = function(result,e,n,vsubsample,off_x,off_y) {
	var active = null;
	var j = 0;
	var scanline;
	var scanline2Index = 0;
	var eIndex = 0;
	if(result.w > 64) {
		var this1 = new Array(result.w * 2 + 1);
		scanline = this1;
	} else {
		var this1 = new Array(129);
		scanline = this1;
	}
	var scanline2 = scanline;
	scanline2Index = result.w;
	var y = off_y;
	e[eIndex + n].y0 = off_y + result.h + 1;
	while(j < result.h) {
		var scan_y_top = y + 0.0;
		var scan_y_bottom = y + 1.0;
		var step_value = active;
		var step_parent = null;
		var _g = 0;
		var _g1 = result.w;
		while(_g < _g1) {
			var i = _g++;
			scanline[i] = 0;
		}
		var _g2 = 0;
		var _g3 = result.w + 1;
		while(_g2 < _g3) {
			var i1 = _g2++;
			scanline2[scanline2Index + i1] = 0;
		}
		while(step_value != null) {
			var z = step_value;
			if(z.ey <= scan_y_top) {
				if(step_parent == null) {
					active = z.next;
					step_value = z.next;
				} else {
					step_parent.next = z.next;
					step_value = z.next;
				}
				if(z.direction == 0) {
					throw haxe_Exception.thrown("Error");
				}
				z.direction = 0;
			} else {
				step_parent = step_value;
				step_value = step_value.next;
			}
		}
		while(e[eIndex].y0 <= scan_y_bottom) {
			if(e[eIndex].y0 != e[eIndex].y1) {
				var z1 = kha_graphics2_truetype_StbTruetype.stbtt__new_active(e,eIndex,off_x,scan_y_top);
				if(!(z1.ey >= scan_y_top)) {
					throw haxe_Exception.thrown("Error");
				}
				if(z1 != null) {
					if(j == 0 && off_y != 0) {
						if(z1.ey < scan_y_top) {
							z1.ey = scan_y_top;
						}
					}
					if(!(z1.ey >= scan_y_top)) {
						throw haxe_Exception.thrown("Error");
					}
				}
				z1.next = active;
				active = z1;
			}
			++eIndex;
		}
		if(active != null) {
			kha_graphics2_truetype_StbTruetype.stbtt__fill_active_edges_new(scanline,scanline2,scanline2Index + 1,result.w,active,scan_y_top);
		}
		var sum = 0;
		var _g4 = 0;
		var _g5 = result.w;
		while(_g4 < _g5) {
			var i2 = _g4++;
			sum += scanline2[scanline2Index + i2];
			var k = scanline[i2] + sum;
			k = Math.abs(k) * 255.0 + 0.5;
			var m = k | 0;
			if(m > 255) {
				m = 255;
			}
			result.pixels.writeU8(result.pixels_offset + j * result.stride + i2,m);
		}
		step_parent = null;
		step_value = active;
		while(step_value != null) {
			var z2 = step_value;
			z2.fx += z2.fdx;
			step_parent = step_value;
			step_value = step_value.next;
		}
		++y;
		++j;
	}
};
kha_graphics2_truetype_StbTruetype.STBTT__COMPARE = function(a,b) {
	return a.y0 < b.y0;
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_ins_sort = function(p,n) {
	var i;
	var j;
	var _g = 1;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		var t = p[i];
		var a = t;
		j = i;
		while(j > 0) {
			var b = p[j - 1];
			var c = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(a,b);
			if(!c) {
				break;
			}
			p[j] = p[j - 1];
			--j;
		}
		if(i != j) {
			p[j] = t;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort = function(p,pIndex,n) {
	while(n > 12) {
		var t;
		var c;
		var m = n >> 1;
		var c01 = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + m]);
		var c12 = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex + m],p[pIndex + n - 1]);
		if(c01 != c12) {
			c = kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + n - 1]);
			var z = c == c12 ? 0 : n - 1;
			t = p[pIndex + z];
			p[pIndex + z] = p[pIndex + m];
			p[pIndex + m] = t;
		}
		t = p[pIndex];
		p[pIndex] = p[pIndex + m];
		p[pIndex + m] = t;
		var i = 1;
		var j = n - 1;
		while(true) {
			while(kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex + i],p[pIndex])) ++i;
			while(kha_graphics2_truetype_StbTruetype.STBTT__COMPARE(p[pIndex],p[pIndex + j])) --j;
			if(i >= j) {
				break;
			}
			t = p[pIndex + i];
			p[pIndex + i] = p[pIndex + j];
			p[pIndex + j] = t;
			++i;
			--j;
		}
		if(j < n - i) {
			kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,pIndex,j);
			pIndex += i;
			n -= i;
		} else {
			kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,pIndex + i,n - i);
			n = j;
		}
	}
};
kha_graphics2_truetype_StbTruetype.stbtt__sort_edges = function(p,n) {
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_quicksort(p,0,n);
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges_ins_sort(p,n);
};
kha_graphics2_truetype_StbTruetype.stbtt__rasterize = function(result,pts,wcount,windings,scale_x,scale_y,shift_x,shift_y,off_x,off_y,invert) {
	var y_scale_inv = invert ? -scale_y : scale_y;
	var i;
	var j;
	var k;
	var vsubsample = 1;
	var ptsIndex = 0;
	var n = 0;
	var _g = 0;
	var _g1 = windings;
	while(_g < _g1) {
		var i = _g++;
		n += wcount[i];
	}
	var this1 = new Array(n + 1);
	var e = this1;
	if(e == null) {
		return;
	} else {
		var _g = 0;
		var _g1 = e.length;
		while(_g < _g1) {
			var i = _g++;
			e[i] = new kha_graphics2_truetype_Stbtt_$_$edge();
		}
	}
	n = 0;
	var m = 0;
	var _g = 0;
	var _g1 = windings;
	while(_g < _g1) {
		var i = _g++;
		var p = pts;
		var pIndex = ptsIndex + m;
		m += wcount[i];
		j = wcount[i] - 1;
		var _g2 = 0;
		var _g3 = wcount[i];
		while(_g2 < _g3) {
			var k = _g2++;
			var a = k;
			var b = j;
			if(p[pIndex + j].y == p[pIndex + k].y) {
				j = k;
				continue;
			}
			e[n].invert = false;
			if(invert ? p[pIndex + j].y > p[pIndex + k].y : p[pIndex + j].y < p[pIndex + k].y) {
				e[n].invert = true;
				a = j;
				b = k;
			}
			e[n].x0 = p[pIndex + a].x * scale_x + shift_x;
			e[n].y0 = (p[pIndex + a].y * y_scale_inv + shift_y) * vsubsample;
			e[n].x1 = p[pIndex + b].x * scale_x + shift_x;
			e[n].y1 = (p[pIndex + b].y * y_scale_inv + shift_y) * vsubsample;
			++n;
			j = k;
		}
	}
	kha_graphics2_truetype_StbTruetype.stbtt__sort_edges(e,n);
	kha_graphics2_truetype_StbTruetype.stbtt__rasterize_sorted_edges(result,e,n,vsubsample,off_x,off_y);
};
kha_graphics2_truetype_StbTruetype.stbtt__add_point = function(points,n,x,y) {
	if(points == null) {
		return;
	}
	points[n].x = x;
	points[n].y = y;
};
kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve = function(points,num_points,x0,y0,x1,y1,x2,y2,objspace_flatness_squared,n) {
	var mx = (x0 + 2 * x1 + x2) / 4;
	var my = (y0 + 2 * y1 + y2) / 4;
	var dx = (x0 + x2) / 2 - mx;
	var dy = (y0 + y2) / 2 - my;
	if(n > 16) {
		return 1;
	}
	if(dx * dx + dy * dy > objspace_flatness_squared) {
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points,x0,y0,(x0 + x1) / 2.0,(y0 + y1) / 2.0,mx,my,objspace_flatness_squared,n + 1);
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points,mx,my,(x1 + x2) / 2.0,(y1 + y2) / 2.0,x2,y2,objspace_flatness_squared,n + 1);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points.value,x2,y2);
		num_points.value += 1;
	}
	return 1;
};
kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic = function(points,num_points,x0,y0,x1,y1,x2,y2,x3,y3,objspace_flatness_squared,n) {
	var dx0 = x1 - x0;
	var dy0 = y1 - y0;
	var dx1 = x2 - x1;
	var dy1 = y2 - y1;
	var dx2 = x3 - x2;
	var dy2 = y3 - y2;
	var dx = x3 - x0;
	var dy = y3 - y0;
	var longlen = Math.sqrt(dx0 * dx0 + dy0 * dy0) + Math.sqrt(dx1 * dx1 + dy1 * dy1) + Math.sqrt(dx2 * dx2 + dy2 * dy2);
	var shortlen = Math.sqrt(dx * dx + dy * dy);
	var flatness_squared = longlen * longlen - shortlen * shortlen;
	if(n > 16) {
		return;
	}
	if(flatness_squared > objspace_flatness_squared) {
		var x01 = (x0 + x1) / 2;
		var y01 = (y0 + y1) / 2;
		var x12 = (x1 + x2) / 2;
		var y12 = (y1 + y2) / 2;
		var x23 = (x2 + x3) / 2;
		var y23 = (y2 + y3) / 2;
		var xa = (x01 + x12) / 2;
		var ya = (y01 + y12) / 2;
		var xb = (x12 + x23) / 2;
		var yb = (y12 + y23) / 2;
		var mx = (xa + xb) / 2;
		var my = (ya + yb) / 2;
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points,x0,y0,x01,y01,xa,ya,mx,my,objspace_flatness_squared,n + 1);
		kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points,mx,my,xb,yb,x23,y23,x3,y3,objspace_flatness_squared,n + 1);
	} else {
		kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points.value,x3,y3);
		num_points.value += 1;
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_FlattenCurves = function(vertices,num_verts,objspace_flatness,contour_lengths,num_contours) {
	var points = null;
	var num_points = 0;
	var objspace_flatness_squared = objspace_flatness * objspace_flatness;
	var i;
	var n = 0;
	var start = 0;
	var pass;
	var _g = 0;
	var _g1 = num_verts;
	while(_g < _g1) {
		var i = _g++;
		if(vertices[i].type == 1) {
			++n;
		}
	}
	num_contours.value = n;
	if(n == 0) {
		return null;
	}
	var this1 = new Array(n);
	contour_lengths.value = this1;
	if(contour_lengths.value == null) {
		num_contours.value = 0;
		return null;
	}
	var _g = 0;
	while(_g < 2) {
		var pass = _g++;
		var x = 0;
		var y = 0;
		if(pass == 1) {
			var this1 = new Array(num_points);
			points = this1;
			if(points == null) {
				contour_lengths.value = null;
				num_contours.value = 0;
				return null;
			} else {
				var _g1 = 0;
				var _g2 = points.length;
				while(_g1 < _g2) {
					var i = _g1++;
					points[i] = new kha_graphics2_truetype_Stbtt_$_$point();
				}
			}
		}
		num_points = 0;
		n = -1;
		var _g3 = 0;
		var _g4 = num_verts;
		while(_g3 < _g4) {
			var i1 = _g3++;
			switch(vertices[i1].type) {
			case 1:
				if(n >= 0) {
					contour_lengths.value[n] = num_points - start;
				}
				++n;
				start = num_points;
				x = vertices[i1].x;
				y = vertices[i1].y;
				kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points++,x,y);
				break;
			case 2:
				x = vertices[i1].x;
				y = vertices[i1].y;
				kha_graphics2_truetype_StbTruetype.stbtt__add_point(points,num_points++,x,y);
				break;
			case 3:
				var num_points_reference = { value : num_points};
				kha_graphics2_truetype_StbTruetype.stbtt__tesselate_curve(points,num_points_reference,x,y,vertices[i1].cx,vertices[i1].cy,vertices[i1].x,vertices[i1].y,objspace_flatness_squared,0);
				num_points = num_points_reference.value;
				x = vertices[i1].x;
				y = vertices[i1].y;
				break;
			case 4:
				var num_points_reference1 = { value : num_points};
				kha_graphics2_truetype_StbTruetype.stbtt__tesselate_cubic(points,num_points_reference1,x,y,vertices[i1].cx,vertices[i1].cy,vertices[i1].cx1,vertices[i1].cy1,vertices[i1].x,vertices[i1].y,objspace_flatness_squared,0);
				num_points = num_points_reference1.value;
				x = vertices[i1].x;
				y = vertices[i1].y;
				break;
			}
		}
		contour_lengths.value[n] = num_points - start;
	}
	return points;
};
kha_graphics2_truetype_StbTruetype.stbtt_Rasterize = function(result,flatness_in_pixels,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,x_off,y_off,invert) {
	var scale = scale_x > scale_y ? scale_y : scale_x;
	var winding_count = 0;
	var winding_lengths = null;
	var winding_count_reference = { value : winding_count};
	var winding_lengths_reference = new kha_graphics2_truetype_VectorOfIntPointer();
	var windings = kha_graphics2_truetype_StbTruetype.stbtt_FlattenCurves(vertices,num_verts,flatness_in_pixels / scale,winding_lengths_reference,winding_count_reference);
	winding_count = winding_count_reference.value;
	winding_lengths = winding_lengths_reference.value;
	if(windings != null) {
		kha_graphics2_truetype_StbTruetype.stbtt__rasterize(result,windings,winding_lengths,winding_count,scale_x,scale_y,shift_x,shift_y,x_off,y_off,invert);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapSubpixel = function(info,scale_x,scale_y,shift_x,shift_y,glyph,region) {
	var gbm = new kha_graphics2_truetype_Stbtt_$_$bitmap();
	var vertices = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,glyph);
	var num_verts = vertices.length;
	if(scale_x == 0) {
		scale_x = scale_y;
	}
	if(scale_y == 0) {
		if(scale_x == 0) {
			return null;
		}
		scale_y = scale_x;
	}
	var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(info,glyph,scale_x,scale_y,shift_x,shift_y);
	var ix0 = rect.x0;
	var iy0 = rect.y0;
	var ix1 = rect.x1;
	var iy1 = rect.y1;
	gbm.w = ix1 - ix0;
	gbm.h = iy1 - iy0;
	gbm.pixels = null;
	region.width = gbm.w;
	region.height = gbm.h;
	region.xoff = ix0;
	region.yoff = iy0;
	if(gbm.w != 0 && gbm.h != 0) {
		gbm.pixels = kha_internal_BytesBlob.alloc(gbm.w * gbm.h);
		if(gbm.pixels != null) {
			gbm.stride = gbm.w;
			kha_graphics2_truetype_StbTruetype.stbtt_Rasterize(gbm,0.35,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,ix0,iy0,true);
		}
	}
	return gbm.pixels;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmap = function(info,scale_x,scale_y,glyph,region) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapSubpixel(info,scale_x,scale_y,0.0,0.0,glyph,region);
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,shift_x,shift_y,glyph) {
	var ix0 = 0;
	var iy0 = 0;
	var vertices = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphShape(info,glyph);
	var num_verts = vertices == null ? 0 : vertices.length;
	var gbm = new kha_graphics2_truetype_Stbtt_$_$bitmap();
	var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBoxSubpixel(info,glyph,scale_x,scale_y,shift_x,shift_y);
	ix0 = rect.x0;
	iy0 = rect.y0;
	gbm.pixels = output;
	gbm.pixels_offset = output_offset;
	gbm.w = out_w;
	gbm.h = out_h;
	gbm.stride = out_stride;
	if(gbm.w != 0 && gbm.h != 0) {
		kha_graphics2_truetype_StbTruetype.stbtt_Rasterize(gbm,0.35,vertices,num_verts,scale_x,scale_y,shift_x,shift_y,ix0,iy0,true);
	}
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmap = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,glyph) {
	kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,0.0,0.0,glyph);
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapSubpixel = function(info,scale_x,scale_y,shift_x,shift_y,codepoint,region) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapSubpixel(info,scale_x,scale_y,shift_x,shift_y,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint),region);
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeCodepointBitmapSubpixel = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,shift_x,shift_y,codepoint) {
	kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmapSubpixel(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,shift_x,shift_y,kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(info,codepoint));
};
kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmap = function(info,scale_x,scale_y,codepoint,region) {
	return kha_graphics2_truetype_StbTruetype.stbtt_GetCodepointBitmapSubpixel(info,scale_x,scale_y,0.0,0.0,codepoint,region);
};
kha_graphics2_truetype_StbTruetype.stbtt_MakeCodepointBitmap = function(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,codepoint) {
	kha_graphics2_truetype_StbTruetype.stbtt_MakeCodepointBitmapSubpixel(info,output,output_offset,out_w,out_h,out_stride,scale_x,scale_y,0.0,0.0,codepoint);
};
kha_graphics2_truetype_StbTruetype.stbtt_BakeFontBitmap = function(data,offset,pixel_height,pixels,pw,ph,chars,chardata) {
	var f = new kha_graphics2_truetype_Stbtt_$fontinfo();
	if(!kha_graphics2_truetype_StbTruetype.stbtt_InitFont(f,data,offset)) {
		return -1;
	}
	var y = 1;
	var x = y;
	var bottom_y = 1;
	var scale = kha_graphics2_truetype_StbTruetype.stbtt_ScaleForPixelHeight(f,pixel_height);
	var i = 0;
	var _g = 0;
	while(_g < chars.length) {
		var index = chars[_g];
		++_g;
		var g = kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(f,index);
		var metrics = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphHMetrics(f,g);
		var advance = metrics.advanceWidth;
		var lsb = metrics.leftSideBearing;
		var rect = kha_graphics2_truetype_StbTruetype.stbtt_GetGlyphBitmapBox(f,g,scale,scale);
		var x0 = rect.x0;
		var y0 = rect.y0;
		var x1 = rect.x1;
		var y1 = rect.y1;
		var gw = x1 - x0;
		var gh = y1 - y0;
		if(x + gw + 1 >= pw) {
			y = bottom_y;
			x = 1;
		}
		if(y + gh + 1 >= ph) {
			return -i;
		}
		if(x + gw >= pw) {
			throw haxe_Exception.thrown("Error");
		}
		if(y + gh >= ph) {
			throw haxe_Exception.thrown("Error");
		}
		chardata[i].x0 = x;
		chardata[i].y0 = y;
		chardata[i].x1 = x + gw;
		chardata[i].y1 = y + gh;
		chardata[i].xadvance = scale * advance;
		chardata[i].xoff = x0;
		chardata[i].yoff = y0;
		x = x + gw + 1;
		if(y + gh + 1 > bottom_y) {
			bottom_y = y + gh + 1;
		}
		++i;
	}
	var _g = 0;
	var _g1 = pw * ph;
	while(_g < _g1) {
		var i1 = _g++;
		pixels.writeU8(i1,0);
	}
	i = 0;
	var ch;
	var _g = 0;
	while(_g < chars.length) {
		var index = chars[_g];
		++_g;
		var g = kha_graphics2_truetype_StbTruetype.stbtt_FindGlyphIndex(f,index);
		ch = chardata[i];
		kha_graphics2_truetype_StbTruetype.stbtt_MakeGlyphBitmap(f,pixels,ch.x0 + ch.y0 * pw,ch.x1 - ch.x0,ch.y1 - ch.y0,pw,scale,scale,g);
		++i;
	}
	return bottom_y;
};
kha_graphics2_truetype_StbTruetype.stbtt_GetBakedQuad = function(chardata,pw,ph,char_index,xpos,ypos,q,opengl_fillrule) {
	var d3d_bias = opengl_fillrule ? 0 : -0.5;
	var ipw = 1.0 / pw;
	var iph = 1.0 / ph;
	var b = chardata[char_index];
	var round_x = Math.floor(xpos.value + b.xoff + 0.5);
	var round_y = Math.floor(ypos.value + b.yoff + 0.5);
	q.x0 = round_x + d3d_bias;
	q.y0 = round_y + d3d_bias;
	q.x1 = round_x + b.x1 - b.x0 + d3d_bias;
	q.y1 = round_y + b.y1 - b.y0 + d3d_bias;
	q.s0 = b.x0 * ipw;
	q.t0 = b.y0 * iph;
	q.s1 = b.x1 * ipw;
	q.t1 = b.y1 * iph;
	xpos.value += b.xadvance;
};
var kha_graphics4_ConstantLocation = function() { };
$hxClasses["kha.graphics4.ConstantLocation"] = kha_graphics4_ConstantLocation;
kha_graphics4_ConstantLocation.__name__ = true;
kha_graphics4_ConstantLocation.__isInterface__ = true;
var kha_graphics4_CubeMap = function(texture) {
	this.texture_ = texture;
};
$hxClasses["kha.graphics4.CubeMap"] = kha_graphics4_CubeMap;
kha_graphics4_CubeMap.__name__ = true;
kha_graphics4_CubeMap.__interfaces__ = [kha_Resource,kha_Canvas];
kha_graphics4_CubeMap.getRenderTargetFormat = function(format) {
	switch(format) {
	case 0:
		return 0;
	case 2:
		return 3;
	case 3:
		return 4;
	case 4:
		return 1;
	default:
		return 0;
	}
};
kha_graphics4_CubeMap.getDepthBufferBits = function(depthAndStencil) {
	switch(depthAndStencil) {
	case 0:
		return -1;
	case 1:
		return 24;
	case 2:
		return 24;
	case 3:
		return 24;
	case 4:
		return 32;
	case 5:
		return 16;
	}
};
kha_graphics4_CubeMap.getStencilBufferBits = function(depthAndStencil) {
	switch(depthAndStencil) {
	case 0:
		return -1;
	case 1:
		return -1;
	case 2:
		return 8;
	case 3:
		return 8;
	case 4:
		return 8;
	case 5:
		return 0;
	}
};
kha_graphics4_CubeMap.getTextureFormat = function(format) {
	switch(format) {
	case 0:
		return 0;
	case 2:
		return 3;
	case 4:
		return 4;
	case 5:
		return 5;
	default:
		return 1;
	}
};
kha_graphics4_CubeMap.createRenderTarget = function(size,format,depthStencil,contextId) {
	if(contextId == null) {
		contextId = 0;
	}
	if(depthStencil == null) {
		depthStencil = 0;
	}
	if(format == null) {
		format = 0;
	}
	var cubeMap = new kha_graphics4_CubeMap(null);
	cubeMap.format = format;
	cubeMap.renderTarget_ = Krom.createRenderTargetCubeMap(size,kha_graphics4_CubeMap.getDepthBufferBits(depthStencil),kha_graphics4_CubeMap.getRenderTargetFormat(format),kha_graphics4_CubeMap.getStencilBufferBits(depthStencil),contextId);
	return cubeMap;
};
kha_graphics4_CubeMap.prototype = {
	texture_: null
	,renderTarget_: null
	,format: null
	,graphics4: null
	,unload: function() {
	}
	,lock: function(level) {
		if(level == null) {
			level = 0;
		}
		return null;
	}
	,unlock: function() {
	}
	,get_width: function() {
		if(this.texture_ == null) {
			return this.renderTarget_.width;
		} else {
			return this.texture_.width;
		}
	}
	,get_height: function() {
		if(this.texture_ == null) {
			return this.renderTarget_.height;
		} else {
			return this.texture_.height;
		}
	}
	,get_g1: function() {
		return null;
	}
	,get_g2: function() {
		return null;
	}
	,get_g4: function() {
		if(this.graphics4 == null) {
			this.graphics4 = new kha_krom_Graphics(this);
		}
		return this.graphics4;
	}
	,__class__: kha_graphics4_CubeMap
	,__properties__: {get_g4:"get_g4",get_g2:"get_g2",get_g1:"get_g1",get_height:"get_height",get_width:"get_width"}
};
var kha_graphics4_FragmentShader = function(sources,names) {
	if(sources != null) {
		this.shader = Krom.createFragmentShader(sources[0].bytes.b.bufferValue,names[0]);
	}
};
$hxClasses["kha.graphics4.FragmentShader"] = kha_graphics4_FragmentShader;
kha_graphics4_FragmentShader.__name__ = true;
kha_graphics4_FragmentShader.fromSource = function(source) {
	var shader = new kha_graphics4_FragmentShader(null,null);
	shader.shader = Krom.createFragmentShaderFromSource(source);
	return shader;
};
kha_graphics4_FragmentShader.prototype = {
	shader: null
	,'delete': function() {
		Krom.deleteShader(this.shader);
		this.shader = null;
	}
	,__class__: kha_graphics4_FragmentShader
};
var kha_graphics4_GeometryShader = function(sources,names) {
	this.shader = Krom.createGeometryShader(sources[0].bytes.b.bufferValue,names[0]);
};
$hxClasses["kha.graphics4.GeometryShader"] = kha_graphics4_GeometryShader;
kha_graphics4_GeometryShader.__name__ = true;
kha_graphics4_GeometryShader.prototype = {
	shader: null
	,'delete': function() {
		Krom.deleteShader(this.shader);
		this.shader = null;
	}
	,__class__: kha_graphics4_GeometryShader
};
var kha_graphics4_Graphics = function() { };
$hxClasses["kha.graphics4.Graphics"] = kha_graphics4_Graphics;
kha_graphics4_Graphics.__name__ = true;
kha_graphics4_Graphics.__isInterface__ = true;
kha_graphics4_Graphics.prototype = {
	begin: null
	,beginFace: null
	,beginEye: null
	,end: null
	,vsynced: null
	,refreshRate: null
	,clear: null
	,viewport: null
	,scissor: null
	,disableScissor: null
	,setVertexBuffer: null
	,setVertexBuffers: null
	,setIndexBuffer: null
	,setTexture: null
	,setTextureDepth: null
	,setTextureArray: null
	,setVideoTexture: null
	,setImageTexture: null
	,setTextureParameters: null
	,setTexture3DParameters: null
	,setTextureCompareMode: null
	,setCubeMapCompareMode: null
	,setCubeMap: null
	,setCubeMapDepth: null
	,maxBoundTextures: null
	,setStencilReferenceValue: null
	,instancedRenderingAvailable: null
	,setPipeline: null
	,setBool: null
	,setInt: null
	,setInt2: null
	,setInt3: null
	,setInt4: null
	,setInts: null
	,setFloat: null
	,setFloat2: null
	,setFloat3: null
	,setFloat4: null
	,setFloats: null
	,setVector2: null
	,setVector3: null
	,setVector4: null
	,setMatrix: null
	,setMatrix3: null
	,drawIndexedVertices: null
	,drawIndexedVerticesInstanced: null
	,flush: null
	,__class__: kha_graphics4_Graphics
};
var kha_graphics4_InternalPipeline = function(pipeline,projectionLocation,textureLocation) {
	this.pipeline = pipeline;
	this.projectionLocation = projectionLocation;
	this.textureLocation = textureLocation;
};
$hxClasses["kha.graphics4.InternalPipeline"] = kha_graphics4_InternalPipeline;
kha_graphics4_InternalPipeline.__name__ = true;
kha_graphics4_InternalPipeline.prototype = {
	pipeline: null
	,projectionLocation: null
	,textureLocation: null
	,__class__: kha_graphics4_InternalPipeline
};
var kha_graphics4_PipelineCache = function() { };
$hxClasses["kha.graphics4.PipelineCache"] = kha_graphics4_PipelineCache;
kha_graphics4_PipelineCache.__name__ = true;
kha_graphics4_PipelineCache.__isInterface__ = true;
kha_graphics4_PipelineCache.prototype = {
	get: null
	,__class__: kha_graphics4_PipelineCache
};
var kha_graphics4_SimplePipelineCache = function(pipeline,texture) {
	var projectionLocation = null;
	try {
		projectionLocation = pipeline.getConstantLocation("projectionMatrix");
	} catch( _g ) {
		var x = haxe_Exception.caught(_g).unwrap();
		haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 57, className : "kha.graphics4.SimplePipelineCache", methodName : "new"});
	}
	var textureLocation = null;
	if(texture) {
		try {
			textureLocation = pipeline.getTextureUnit("tex");
		} catch( _g ) {
			var x = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 66, className : "kha.graphics4.SimplePipelineCache", methodName : "new"});
		}
	}
	this.pipeline = new kha_graphics4_InternalPipeline(pipeline,projectionLocation,textureLocation);
};
$hxClasses["kha.graphics4.SimplePipelineCache"] = kha_graphics4_SimplePipelineCache;
kha_graphics4_SimplePipelineCache.__name__ = true;
kha_graphics4_SimplePipelineCache.__interfaces__ = [kha_graphics4_PipelineCache];
kha_graphics4_SimplePipelineCache.prototype = {
	pipeline: null
	,get: function(colorFormats,depthStencilFormat) {
		return this.pipeline;
	}
	,__class__: kha_graphics4_SimplePipelineCache
};
var kha_graphics4_PerFramebufferPipelineCache = function(pipeline,texture) {
	this.pipelines = [];
	pipeline.compile();
	var projectionLocation = null;
	try {
		projectionLocation = pipeline.getConstantLocation("projectionMatrix");
	} catch( _g ) {
		var x = haxe_Exception.caught(_g).unwrap();
		haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 89, className : "kha.graphics4.PerFramebufferPipelineCache", methodName : "new"});
	}
	var textureLocation = null;
	if(texture) {
		try {
			textureLocation = pipeline.getTextureUnit("tex");
		} catch( _g ) {
			var x = haxe_Exception.caught(_g).unwrap();
			haxe_Log.trace(x,{ fileName : "kha/graphics4/Graphics2.hx", lineNumber : 98, className : "kha.graphics4.PerFramebufferPipelineCache", methodName : "new"});
		}
	}
	this.pipelines.push(new kha_graphics4_InternalPipeline(pipeline,projectionLocation,textureLocation));
};
$hxClasses["kha.graphics4.PerFramebufferPipelineCache"] = kha_graphics4_PerFramebufferPipelineCache;
kha_graphics4_PerFramebufferPipelineCache.__name__ = true;
kha_graphics4_PerFramebufferPipelineCache.__interfaces__ = [kha_graphics4_PipelineCache];
kha_graphics4_PerFramebufferPipelineCache.prototype = {
	pipelines: null
	,get: function(colorFormats,depthStencilFormat) {
		return this.pipelines[this.hash(colorFormats,depthStencilFormat)];
	}
	,hash: function(colorFormats,depthStencilFormat) {
		return 0;
	}
	,__class__: kha_graphics4_PerFramebufferPipelineCache
};
var kha_graphics4_ImageShaderPainter = function(g4) {
	this.myPipeline = null;
	this.bilinearMipmaps = false;
	this.bilinear = false;
	this.g = g4;
	kha_graphics4_ImageShaderPainter.bufferStart = 0;
	kha_graphics4_ImageShaderPainter.bufferIndex = 0;
	kha_graphics4_ImageShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_ImageShaderPainter.standardImagePipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.ImageShaderPainter"] = kha_graphics4_ImageShaderPainter;
kha_graphics4_ImageShaderPainter.__name__ = true;
kha_graphics4_ImageShaderPainter.initShaders = function() {
	if(kha_graphics4_ImageShaderPainter.structure == null) {
		kha_graphics4_ImageShaderPainter.structure = kha_graphics4_Graphics2.createImageVertexStructure();
	}
	if(kha_graphics4_ImageShaderPainter.standardImagePipeline == null) {
		var pipeline = kha_graphics4_Graphics2.createImagePipeline(kha_graphics4_ImageShaderPainter.structure);
		kha_graphics4_ImageShaderPainter.standardImagePipeline = new kha_graphics4_PerFramebufferPipelineCache(pipeline,true);
	}
};
kha_graphics4_ImageShaderPainter.prototype = {
	projectionMatrix: null
	,bilinear: null
	,bilinearMipmaps: null
	,g: null
	,myPipeline: null
	,get_pipeline: function() {
		return this.myPipeline;
	}
	,set_pipeline: function(pipe) {
		this.myPipeline = pipe != null ? pipe : kha_graphics4_ImageShaderPainter.standardImagePipeline;
		return this.myPipeline;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_ImageShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_ImageShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(6000,kha_graphics4_ImageShaderPainter.structure,1);
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_ImageShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(9000,0);
			var indices = kha_graphics4_ImageShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1500) {
				var i = _g++;
				indices[i * 3 * 2] = i * 4;
				indices[i * 3 * 2 + 1] = i * 4 + 1;
				indices[i * 3 * 2 + 2] = i * 4 + 2;
				indices[i * 3 * 2 + 3] = i * 4;
				indices[i * 3 * 2 + 4] = i * 4 + 2;
				indices[i * 3 * 2 + 5] = i * 4 + 3;
			}
			kha_graphics4_ImageShaderPainter.indexBuffer.unlock();
		}
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex] = bottomleftx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 1] = bottomlefty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 9] = topleftx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 10] = toplefty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 11] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 18] = toprightx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 19] = toprighty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 20] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 27] = bottomrightx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 28] = bottomrighty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 29] = -5.0;
	}
	,setRectTexCoords: function(left,top,right,bottom) {
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 3] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 4] = bottom;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 12] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 13] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 21] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 22] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 30] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 31] = bottom;
	}
	,setRectColor: function(r,g,b,a) {
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 5] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 6] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 7] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 8] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 14] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 15] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 16] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 17] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 23] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 24] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 25] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 26] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 32] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 33] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 34] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 35] = a;
	}
	,drawBuffer: function(end) {
		if(kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart == 0) {
			return;
		}
		kha_graphics4_ImageShaderPainter.rectVertexBuffer.unlock((kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ImageShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ImageShaderPainter.indexBuffer);
		this.g.setTexture(pipeline.textureLocation,kha_graphics4_ImageShaderPainter.lastTexture);
		this.g.setTextureParameters(pipeline.textureLocation,2,2,this.bilinear ? 1 : 0,this.bilinear ? 1 : 0,this.bilinearMipmaps ? 2 : 0);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(kha_graphics4_ImageShaderPainter.bufferStart * 2 * 3,(kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 2 * 3);
		this.g.setTexture(pipeline.textureLocation,null);
		if(end || (kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1) * 4 >= 1500) {
			kha_graphics4_ImageShaderPainter.bufferStart = 0;
			kha_graphics4_ImageShaderPainter.bufferIndex = 0;
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock(0);
		} else {
			kha_graphics4_ImageShaderPainter.bufferStart = kha_graphics4_ImageShaderPainter.bufferIndex;
			kha_graphics4_ImageShaderPainter.rectVertices = kha_graphics4_ImageShaderPainter.rectVertexBuffer.lock(kha_graphics4_ImageShaderPainter.bufferStart * 4);
		}
	}
	,setBilinearFilter: function(bilinear) {
		this.drawBuffer(false);
		kha_graphics4_ImageShaderPainter.lastTexture = null;
		this.bilinear = bilinear;
	}
	,setBilinearMipmapFilter: function(bilinear) {
		this.drawBuffer(false);
		kha_graphics4_ImageShaderPainter.lastTexture = null;
		this.bilinearMipmaps = bilinear;
	}
	,drawImage: function(img,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty,opacity,color) {
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			this.drawBuffer(false);
		}
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 5] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 6] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 7] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 8] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 14] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 15] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 16] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 17] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 23] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 24] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 25] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 26] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 32] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 33] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 34] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 35] = a;
		var right = tex.get_width() / tex.get_realWidth();
		var bottom = tex.get_height() / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 3] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 4] = bottom;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 12] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 13] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 21] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 22] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 30] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 31] = bottom;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex] = bottomleftx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 1] = bottomlefty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 9] = topleftx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 10] = toplefty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 11] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 18] = toprightx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 19] = toprighty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 20] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 27] = bottomrightx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 28] = bottomrighty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 29] = -5.0;
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,drawImage2: function(img,sx,sy,sw,sh,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty,opacity,color) {
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			this.drawBuffer(false);
		}
		var left = sx / tex.get_realWidth();
		var top = sy / tex.get_realHeight();
		var right = (sx + sw) / tex.get_realWidth();
		var bottom = (sy + sh) / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 3] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 4] = bottom;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 12] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 13] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 21] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 22] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 30] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 31] = bottom;
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 5] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 6] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 7] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 8] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 14] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 15] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 16] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 17] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 23] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 24] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 25] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 26] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 32] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 33] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 34] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 35] = a;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex] = bottomleftx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 1] = bottomlefty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 9] = topleftx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 10] = toplefty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 11] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 18] = toprightx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 19] = toprighty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 20] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 27] = bottomrightx;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 28] = bottomrighty;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 29] = -5.0;
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,drawImageScale: function(img,sx,sy,sw,sh,left,top,right,bottom,opacity,color) {
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			this.drawBuffer(false);
		}
		var left1 = sx / tex.get_realWidth();
		var top1 = sy / tex.get_realHeight();
		var right1 = (sx + sw) / tex.get_realWidth();
		var bottom1 = (sy + sh) / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 3] = left1;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 4] = bottom1;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 12] = left1;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 13] = top1;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 21] = right1;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 22] = top1;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 30] = right1;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 31] = bottom1;
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 5] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 6] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 7] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 8] = opacity;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 14] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 15] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 16] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 17] = opacity;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 23] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 24] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 25] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 26] = opacity;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 32] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 33] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 34] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 35] = opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 1] = bottom;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 9] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 10] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 11] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 18] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 19] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 20] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 27] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 28] = bottom;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 29] = -5.0;
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,end: function() {
		if(kha_graphics4_ImageShaderPainter.bufferIndex > 0) {
			this.drawBuffer(true);
		}
		kha_graphics4_ImageShaderPainter.lastTexture = null;
	}
	,__class__: kha_graphics4_ImageShaderPainter
	,__properties__: {set_pipeline:"set_pipeline",get_pipeline:"get_pipeline"}
};
var kha_graphics4_ColoredShaderPainter = function(g4) {
	this.myPipeline = null;
	this.g = g4;
	kha_graphics4_ColoredShaderPainter.bufferIndex = 0;
	kha_graphics4_ColoredShaderPainter.triangleBufferIndex = 0;
	kha_graphics4_ColoredShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_ColoredShaderPainter.standardColorPipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.ColoredShaderPainter"] = kha_graphics4_ColoredShaderPainter;
kha_graphics4_ColoredShaderPainter.__name__ = true;
kha_graphics4_ColoredShaderPainter.initShaders = function() {
	if(kha_graphics4_ColoredShaderPainter.structure == null) {
		kha_graphics4_ColoredShaderPainter.structure = kha_graphics4_Graphics2.createColoredVertexStructure();
	}
	if(kha_graphics4_ColoredShaderPainter.standardColorPipeline == null) {
		var pipeline = kha_graphics4_Graphics2.createColoredPipeline(kha_graphics4_ColoredShaderPainter.structure);
		kha_graphics4_ColoredShaderPainter.standardColorPipeline = new kha_graphics4_PerFramebufferPipelineCache(pipeline,false);
	}
};
kha_graphics4_ColoredShaderPainter.prototype = {
	projectionMatrix: null
	,g: null
	,myPipeline: null
	,get_pipeline: function() {
		return this.myPipeline;
	}
	,set_pipeline: function(pipe) {
		this.myPipeline = pipe != null ? pipe : kha_graphics4_ColoredShaderPainter.standardColorPipeline;
		return this.myPipeline;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_ColoredShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_ColoredShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(4000,kha_graphics4_ColoredShaderPainter.structure,1);
			kha_graphics4_ColoredShaderPainter.rectVertices = kha_graphics4_ColoredShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_ColoredShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(6000,0);
			var indices = kha_graphics4_ColoredShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				indices[i * 3 * 2] = i * 4;
				indices[i * 3 * 2 + 1] = i * 4 + 1;
				indices[i * 3 * 2 + 2] = i * 4 + 2;
				indices[i * 3 * 2 + 3] = i * 4;
				indices[i * 3 * 2 + 4] = i * 4 + 2;
				indices[i * 3 * 2 + 5] = i * 4 + 3;
			}
			kha_graphics4_ColoredShaderPainter.indexBuffer.unlock();
			kha_graphics4_ColoredShaderPainter.triangleVertexBuffer = new kha_graphics4_VertexBuffer(3000,kha_graphics4_ColoredShaderPainter.structure,1);
			kha_graphics4_ColoredShaderPainter.triangleVertices = kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.lock();
			kha_graphics4_ColoredShaderPainter.triangleIndexBuffer = new kha_graphics4_IndexBuffer(3000,0);
			var triIndices = kha_graphics4_ColoredShaderPainter.triangleIndexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				triIndices[i * 3] = i * 3;
				triIndices[i * 3 + 1] = i * 3 + 1;
				triIndices[i * 3 + 2] = i * 3 + 2;
			}
			kha_graphics4_ColoredShaderPainter.triangleIndexBuffer.unlock();
		}
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.bufferIndex * 7 * 4;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex] = bottomleftx;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 1] = bottomlefty;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 7] = topleftx;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 8] = toplefty;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 9] = -5.0;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 14] = toprightx;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 15] = toprighty;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 16] = -5.0;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 21] = bottomrightx;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 22] = bottomrighty;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 23] = -5.0;
	}
	,setRectColors: function(opacity,color) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.bufferIndex * 7 * 4;
		var a = opacity * ((color >>> 24) * 0.00392156862745098);
		var r = a * (((color & 16711680) >>> 16) * 0.00392156862745098);
		var g = a * (((color & 65280) >>> 8) * 0.00392156862745098);
		var b = a * ((color & 255) * 0.00392156862745098);
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 3] = r;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 4] = g;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 5] = b;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 6] = a;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 10] = r;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 11] = g;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 12] = b;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 13] = a;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 17] = r;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 18] = g;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 19] = b;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 20] = a;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 24] = r;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 25] = g;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 26] = b;
		kha_graphics4_ColoredShaderPainter.rectVertices[baseIndex + 27] = a;
	}
	,setTriVertices: function(x1,y1,x2,y2,x3,y3) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 7 * 3;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex] = x1;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 1] = y1;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 7] = x2;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 8] = y2;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 9] = -5.0;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 14] = x3;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 15] = y3;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 16] = -5.0;
	}
	,setTriColors: function(opacity,color) {
		var baseIndex = kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 7 * 3;
		var a = opacity * ((color >>> 24) * 0.00392156862745098);
		var r = a * (((color & 16711680) >>> 16) * 0.00392156862745098);
		var g = a * (((color & 65280) >>> 8) * 0.00392156862745098);
		var b = a * ((color & 255) * 0.00392156862745098);
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 3] = r;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 4] = g;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 5] = b;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 6] = a;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 10] = r;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 11] = g;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 12] = b;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 13] = a;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 17] = r;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 18] = g;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 19] = b;
		kha_graphics4_ColoredShaderPainter.triangleVertices[baseIndex + 20] = a;
	}
	,drawBuffer: function(trisDone) {
		if(kha_graphics4_ColoredShaderPainter.bufferIndex == 0) {
			return;
		}
		if(!trisDone) {
			if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
				this.drawTriBuffer(true);
			}
		}
		kha_graphics4_ColoredShaderPainter.rectVertexBuffer.unlock(kha_graphics4_ColoredShaderPainter.bufferIndex * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ColoredShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ColoredShaderPainter.indexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(0,kha_graphics4_ColoredShaderPainter.bufferIndex * 2 * 3);
		kha_graphics4_ColoredShaderPainter.bufferIndex = 0;
		kha_graphics4_ColoredShaderPainter.rectVertices = kha_graphics4_ColoredShaderPainter.rectVertexBuffer.lock();
	}
	,drawTriBuffer: function(rectsDone) {
		if(!rectsDone) {
			if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
				this.drawBuffer(true);
			}
		}
		kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.unlock(kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 3);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_ColoredShaderPainter.triangleVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_ColoredShaderPainter.triangleIndexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.drawIndexedVertices(0,kha_graphics4_ColoredShaderPainter.triangleBufferIndex * 3);
		kha_graphics4_ColoredShaderPainter.triangleBufferIndex = 0;
		kha_graphics4_ColoredShaderPainter.triangleVertices = kha_graphics4_ColoredShaderPainter.triangleVertexBuffer.lock();
	}
	,fillRect: function(opacity,color,bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			this.drawTriBuffer(true);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex + 1 >= 1000) {
			this.drawBuffer(false);
		}
		this.setRectColors(opacity,color);
		this.setRectVertices(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty);
		++kha_graphics4_ColoredShaderPainter.bufferIndex;
	}
	,fillTriangle: function(opacity,color,x1,y1,x2,y2,x3,y3) {
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			this.drawBuffer(true);
		}
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex + 1 >= 1000) {
			this.drawTriBuffer(false);
		}
		this.setTriColors(opacity,color);
		this.setTriVertices(x1,y1,x2,y2,x3,y3);
		++kha_graphics4_ColoredShaderPainter.triangleBufferIndex;
	}
	,endTris: function(rectsDone) {
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			this.drawTriBuffer(rectsDone);
		}
	}
	,endRects: function(trisDone) {
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			this.drawBuffer(trisDone);
		}
	}
	,end: function() {
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			this.drawBuffer(false);
		}
	}
	,__class__: kha_graphics4_ColoredShaderPainter
	,__properties__: {set_pipeline:"set_pipeline",get_pipeline:"get_pipeline"}
};
var kha_graphics4_TextShaderPainter = function(g4) {
	this.bakedQuadCache = new kha_AlignedQuad();
	this.bilinear = false;
	this.myPipeline = null;
	this.g = g4;
	kha_graphics4_TextShaderPainter.bufferIndex = 0;
	kha_graphics4_TextShaderPainter.initShaders();
	this.myPipeline = kha_graphics4_TextShaderPainter.standardTextPipeline;
	this.initBuffers();
};
$hxClasses["kha.graphics4.TextShaderPainter"] = kha_graphics4_TextShaderPainter;
kha_graphics4_TextShaderPainter.__name__ = true;
kha_graphics4_TextShaderPainter.initShaders = function() {
	if(kha_graphics4_TextShaderPainter.structure == null) {
		kha_graphics4_TextShaderPainter.structure = kha_graphics4_Graphics2.createTextVertexStructure();
	}
	if(kha_graphics4_TextShaderPainter.standardTextPipeline == null) {
		var pipeline = kha_graphics4_Graphics2.createTextPipeline(kha_graphics4_TextShaderPainter.structure);
		kha_graphics4_TextShaderPainter.standardTextPipeline = new kha_graphics4_PerFramebufferPipelineCache(pipeline,true);
	}
};
kha_graphics4_TextShaderPainter.findIndex = function(charCode) {
	var blocks = kha_KravurImage.charBlocks;
	var offset = 0;
	var _g = 0;
	var _g1 = blocks.length / 2 | 0;
	while(_g < _g1) {
		var i = _g++;
		var start = blocks[i * 2];
		var end = blocks[i * 2 + 1];
		if(charCode >= start && charCode <= end) {
			return offset + charCode - start;
		}
		offset += end - start + 1;
	}
	return 0;
};
kha_graphics4_TextShaderPainter.prototype = {
	projectionMatrix: null
	,font: null
	,g: null
	,myPipeline: null
	,fontSize: null
	,bilinear: null
	,get_pipeline: function() {
		return this.myPipeline;
	}
	,set_pipeline: function(pipe) {
		this.myPipeline = pipe != null ? pipe : kha_graphics4_TextShaderPainter.standardTextPipeline;
		return this.myPipeline;
	}
	,setProjection: function(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}
	,initBuffers: function() {
		if(kha_graphics4_TextShaderPainter.rectVertexBuffer == null) {
			kha_graphics4_TextShaderPainter.rectVertexBuffer = new kha_graphics4_VertexBuffer(4000,kha_graphics4_TextShaderPainter.structure,1);
			kha_graphics4_TextShaderPainter.rectVertices = kha_graphics4_TextShaderPainter.rectVertexBuffer.lock();
			kha_graphics4_TextShaderPainter.indexBuffer = new kha_graphics4_IndexBuffer(6000,0);
			var indices = kha_graphics4_TextShaderPainter.indexBuffer.lock();
			var _g = 0;
			while(_g < 1000) {
				var i = _g++;
				indices[i * 3 * 2] = i * 4;
				indices[i * 3 * 2 + 1] = i * 4 + 1;
				indices[i * 3 * 2 + 2] = i * 4 + 2;
				indices[i * 3 * 2 + 3] = i * 4;
				indices[i * 3 * 2 + 4] = i * 4 + 2;
				indices[i * 3 * 2 + 5] = i * 4 + 3;
			}
			kha_graphics4_TextShaderPainter.indexBuffer.unlock();
		}
	}
	,setRectVertices: function(bottomleftx,bottomlefty,topleftx,toplefty,toprightx,toprighty,bottomrightx,bottomrighty) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex] = bottomleftx;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 1] = bottomlefty;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 9] = topleftx;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 10] = toplefty;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 11] = -5.0;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 18] = toprightx;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 19] = toprighty;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 20] = -5.0;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 27] = bottomrightx;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 28] = bottomrighty;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 29] = -5.0;
	}
	,setRectTexCoords: function(left,top,right,bottom) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 3] = left;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 4] = bottom;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 12] = left;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 13] = top;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 21] = right;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 22] = top;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 30] = right;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 31] = bottom;
	}
	,setRectColors: function(opacity,color) {
		var baseIndex = kha_graphics4_TextShaderPainter.bufferIndex * 9 * 4;
		var a = opacity * ((color >>> 24) * 0.00392156862745098);
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 5] = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 6] = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 7] = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 8] = a;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 14] = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 15] = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 16] = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 17] = a;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 23] = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 24] = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 25] = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 26] = a;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 32] = ((color & 16711680) >>> 16) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 33] = ((color & 65280) >>> 8) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 34] = (color & 255) * 0.00392156862745098;
		kha_graphics4_TextShaderPainter.rectVertices[baseIndex + 35] = a;
	}
	,drawBuffer: function() {
		if(kha_graphics4_TextShaderPainter.bufferIndex == 0) {
			return;
		}
		kha_graphics4_TextShaderPainter.rectVertexBuffer.unlock(kha_graphics4_TextShaderPainter.bufferIndex * 4);
		var pipeline = this.myPipeline.get(null,3);
		this.g.setPipeline(pipeline.pipeline);
		this.g.setVertexBuffer(kha_graphics4_TextShaderPainter.rectVertexBuffer);
		this.g.setIndexBuffer(kha_graphics4_TextShaderPainter.indexBuffer);
		this.g.setMatrix(pipeline.projectionLocation,this.projectionMatrix);
		this.g.setTexture(pipeline.textureLocation,kha_graphics4_TextShaderPainter.lastTexture);
		this.g.setTextureParameters(pipeline.textureLocation,2,2,this.bilinear ? 1 : 0,this.bilinear ? 1 : 0,0);
		this.g.drawIndexedVertices(0,kha_graphics4_TextShaderPainter.bufferIndex * 2 * 3);
		this.g.setTexture(pipeline.textureLocation,null);
		kha_graphics4_TextShaderPainter.bufferIndex = 0;
		kha_graphics4_TextShaderPainter.rectVertices = kha_graphics4_TextShaderPainter.rectVertexBuffer.lock();
	}
	,setBilinearFilter: function(bilinear) {
		this.end();
		this.bilinear = bilinear;
	}
	,setFont: function(font) {
		this.font = js_Boot.__cast(font , kha_Kravur);
	}
	,bakedQuadCache: null
	,drawString: function(text,opacity,color,x,y,transformation) {
		var font = this.font._get(this.fontSize);
		var tex = font.getTexture();
		if(kha_graphics4_TextShaderPainter.lastTexture != null && tex != kha_graphics4_TextShaderPainter.lastTexture) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = tex;
		var xpos = x;
		var ypos = y;
		var _g = 0;
		var _g1 = text.length;
		while(_g < _g1) {
			var i = _g++;
			var charCode = text.charCodeAt(i);
			var q = font.getBakedQuad(this.bakedQuadCache,kha_graphics4_TextShaderPainter.findIndex(charCode),xpos,ypos);
			if(q != null) {
				if(kha_graphics4_TextShaderPainter.bufferIndex + 1 >= 1000) {
					this.drawBuffer();
				}
				this.setRectColors(opacity,color);
				this.setRectTexCoords(q.s0 * tex.get_width() / tex.get_realWidth(),q.t0 * tex.get_height() / tex.get_realHeight(),q.s1 * tex.get_width() / tex.get_realWidth(),q.t1 * tex.get_height() / tex.get_realHeight());
				var x = q.x0;
				var y = q.y1;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var value_x = x;
				var value_y = y;
				var w = transformation._02 * value_x + transformation._12 * value_y + transformation._22;
				var x1 = (transformation._00 * value_x + transformation._10 * value_y + transformation._20) / w;
				var y1 = (transformation._01 * value_x + transformation._11 * value_y + transformation._21) / w;
				var x2 = x1;
				var y2 = y1;
				if(y2 == null) {
					y2 = 0;
				}
				if(x2 == null) {
					x2 = 0;
				}
				var p0_x = x2;
				var p0_y = y2;
				var x3 = q.x0;
				var y3 = q.y0;
				if(y3 == null) {
					y3 = 0;
				}
				if(x3 == null) {
					x3 = 0;
				}
				var value_x1 = x3;
				var value_y1 = y3;
				var w1 = transformation._02 * value_x1 + transformation._12 * value_y1 + transformation._22;
				var x4 = (transformation._00 * value_x1 + transformation._10 * value_y1 + transformation._20) / w1;
				var y4 = (transformation._01 * value_x1 + transformation._11 * value_y1 + transformation._21) / w1;
				var x5 = x4;
				var y5 = y4;
				if(y5 == null) {
					y5 = 0;
				}
				if(x5 == null) {
					x5 = 0;
				}
				var p1_x = x5;
				var p1_y = y5;
				var x6 = q.x1;
				var y6 = q.y0;
				if(y6 == null) {
					y6 = 0;
				}
				if(x6 == null) {
					x6 = 0;
				}
				var value_x2 = x6;
				var value_y2 = y6;
				var w2 = transformation._02 * value_x2 + transformation._12 * value_y2 + transformation._22;
				var x7 = (transformation._00 * value_x2 + transformation._10 * value_y2 + transformation._20) / w2;
				var y7 = (transformation._01 * value_x2 + transformation._11 * value_y2 + transformation._21) / w2;
				var x8 = x7;
				var y8 = y7;
				if(y8 == null) {
					y8 = 0;
				}
				if(x8 == null) {
					x8 = 0;
				}
				var p2_x = x8;
				var p2_y = y8;
				var x9 = q.x1;
				var y9 = q.y1;
				if(y9 == null) {
					y9 = 0;
				}
				if(x9 == null) {
					x9 = 0;
				}
				var value_x3 = x9;
				var value_y3 = y9;
				var w3 = transformation._02 * value_x3 + transformation._12 * value_y3 + transformation._22;
				var x10 = (transformation._00 * value_x3 + transformation._10 * value_y3 + transformation._20) / w3;
				var y10 = (transformation._01 * value_x3 + transformation._11 * value_y3 + transformation._21) / w3;
				var x11 = x10;
				var y11 = y10;
				if(y11 == null) {
					y11 = 0;
				}
				if(x11 == null) {
					x11 = 0;
				}
				var p3_x = x11;
				var p3_y = y11;
				this.setRectVertices(p0_x,p0_y,p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
				xpos += q.xadvance;
				++kha_graphics4_TextShaderPainter.bufferIndex;
			}
		}
	}
	,drawCharacters: function(text,start,length,opacity,color,x,y,transformation) {
		var font = this.font._get(this.fontSize);
		var tex = font.getTexture();
		if(kha_graphics4_TextShaderPainter.lastTexture != null && tex != kha_graphics4_TextShaderPainter.lastTexture) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = tex;
		var xpos = x;
		var ypos = y;
		var _g = start;
		var _g1 = start + length;
		while(_g < _g1) {
			var i = _g++;
			var q = font.getBakedQuad(this.bakedQuadCache,kha_graphics4_TextShaderPainter.findIndex(text[i]),xpos,ypos);
			if(q != null) {
				if(kha_graphics4_TextShaderPainter.bufferIndex + 1 >= 1000) {
					this.drawBuffer();
				}
				this.setRectColors(opacity,color);
				this.setRectTexCoords(q.s0 * tex.get_width() / tex.get_realWidth(),q.t0 * tex.get_height() / tex.get_realHeight(),q.s1 * tex.get_width() / tex.get_realWidth(),q.t1 * tex.get_height() / tex.get_realHeight());
				var x = q.x0;
				var y = q.y1;
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				var value_x = x;
				var value_y = y;
				var w = transformation._02 * value_x + transformation._12 * value_y + transformation._22;
				var x1 = (transformation._00 * value_x + transformation._10 * value_y + transformation._20) / w;
				var y1 = (transformation._01 * value_x + transformation._11 * value_y + transformation._21) / w;
				var x2 = x1;
				var y2 = y1;
				if(y2 == null) {
					y2 = 0;
				}
				if(x2 == null) {
					x2 = 0;
				}
				var p0_x = x2;
				var p0_y = y2;
				var x3 = q.x0;
				var y3 = q.y0;
				if(y3 == null) {
					y3 = 0;
				}
				if(x3 == null) {
					x3 = 0;
				}
				var value_x1 = x3;
				var value_y1 = y3;
				var w1 = transformation._02 * value_x1 + transformation._12 * value_y1 + transformation._22;
				var x4 = (transformation._00 * value_x1 + transformation._10 * value_y1 + transformation._20) / w1;
				var y4 = (transformation._01 * value_x1 + transformation._11 * value_y1 + transformation._21) / w1;
				var x5 = x4;
				var y5 = y4;
				if(y5 == null) {
					y5 = 0;
				}
				if(x5 == null) {
					x5 = 0;
				}
				var p1_x = x5;
				var p1_y = y5;
				var x6 = q.x1;
				var y6 = q.y0;
				if(y6 == null) {
					y6 = 0;
				}
				if(x6 == null) {
					x6 = 0;
				}
				var value_x2 = x6;
				var value_y2 = y6;
				var w2 = transformation._02 * value_x2 + transformation._12 * value_y2 + transformation._22;
				var x7 = (transformation._00 * value_x2 + transformation._10 * value_y2 + transformation._20) / w2;
				var y7 = (transformation._01 * value_x2 + transformation._11 * value_y2 + transformation._21) / w2;
				var x8 = x7;
				var y8 = y7;
				if(y8 == null) {
					y8 = 0;
				}
				if(x8 == null) {
					x8 = 0;
				}
				var p2_x = x8;
				var p2_y = y8;
				var x9 = q.x1;
				var y9 = q.y1;
				if(y9 == null) {
					y9 = 0;
				}
				if(x9 == null) {
					x9 = 0;
				}
				var value_x3 = x9;
				var value_y3 = y9;
				var w3 = transformation._02 * value_x3 + transformation._12 * value_y3 + transformation._22;
				var x10 = (transformation._00 * value_x3 + transformation._10 * value_y3 + transformation._20) / w3;
				var y10 = (transformation._01 * value_x3 + transformation._11 * value_y3 + transformation._21) / w3;
				var x11 = x10;
				var y11 = y10;
				if(y11 == null) {
					y11 = 0;
				}
				if(x11 == null) {
					x11 = 0;
				}
				var p3_x = x11;
				var p3_y = y11;
				this.setRectVertices(p0_x,p0_y,p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
				xpos += q.xadvance;
				++kha_graphics4_TextShaderPainter.bufferIndex;
			}
		}
	}
	,end: function() {
		if(kha_graphics4_TextShaderPainter.bufferIndex > 0) {
			this.drawBuffer();
		}
		kha_graphics4_TextShaderPainter.lastTexture = null;
	}
	,__class__: kha_graphics4_TextShaderPainter
	,__properties__: {set_pipeline:"set_pipeline",get_pipeline:"get_pipeline"}
};
var kha_graphics4_Graphics2 = function(canvas) {
	this.scissorH = -1;
	this.scissorW = -1;
	this.scissorY = -1;
	this.scissorX = -1;
	this.scissorEnabled = false;
	this.lastPipeline = null;
	this.pipelineCache = new haxe_ds_ObjectMap();
	this.myMipmapScaleQuality = 0;
	this.myImageScaleQuality = 0;
	kha_graphics2_Graphics.call(this);
	this.set_color(-1);
	this.canvas = canvas;
	this.g = canvas.get_g4();
	this.imagePainter = new kha_graphics4_ImageShaderPainter(this.g);
	this.coloredPainter = new kha_graphics4_ColoredShaderPainter(this.g);
	this.textPainter = new kha_graphics4_TextShaderPainter(this.g);
	this.textPainter.fontSize = this.get_fontSize();
	this.projectionMatrix = new kha_math_FastMatrix4(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
	this.setProjection();
	if(kha_graphics4_Graphics2.videoPipeline == null) {
		kha_graphics4_Graphics2.videoPipeline = kha_graphics4_Graphics2.createImagePipeline(kha_graphics4_Graphics2.createImageVertexStructure());
		kha_graphics4_Graphics2.videoPipeline.fragmentShader = kha_Shaders.painter_video_frag;
		kha_graphics4_Graphics2.videoPipeline.vertexShader = kha_Shaders.painter_video_vert;
		kha_graphics4_Graphics2.videoPipeline.compile();
	}
};
$hxClasses["kha.graphics4.Graphics2"] = kha_graphics4_Graphics2;
kha_graphics4_Graphics2.__name__ = true;
kha_graphics4_Graphics2.upperPowerOfTwo = function(v) {
	--v;
	v |= v >>> 1;
	v |= v >>> 2;
	v |= v >>> 4;
	v |= v >>> 8;
	v |= v >>> 16;
	return ++v;
};
kha_graphics4_Graphics2.createImageVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("texPosition",1);
	structure.add("vertexColor",3);
	return structure;
};
kha_graphics4_Graphics2.createImagePipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_image_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_image_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 1;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 1;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.createColoredVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("vertexColor",3);
	return structure;
};
kha_graphics4_Graphics2.createColoredPipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_colored_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_colored_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 1;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 1;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.createTextVertexStructure = function() {
	var structure = new kha_graphics4_VertexStructure();
	structure.add("vertexPosition",2);
	structure.add("texPosition",1);
	structure.add("vertexColor",3);
	return structure;
};
kha_graphics4_Graphics2.createTextPipeline = function(structure) {
	var shaderPipeline = new kha_graphics4_PipelineState();
	shaderPipeline.fragmentShader = kha_Shaders.painter_text_frag;
	shaderPipeline.vertexShader = kha_Shaders.painter_text_vert;
	shaderPipeline.inputLayout = [structure];
	shaderPipeline.blendSource = 3;
	shaderPipeline.blendDestination = 5;
	shaderPipeline.alphaBlendSource = 3;
	shaderPipeline.alphaBlendDestination = 5;
	return shaderPipeline;
};
kha_graphics4_Graphics2.__super__ = kha_graphics2_Graphics;
kha_graphics4_Graphics2.prototype = $extend(kha_graphics2_Graphics.prototype,{
	myColor: null
	,myFont: null
	,projectionMatrix: null
	,imagePainter: null
	,coloredPainter: null
	,textPainter: null
	,canvas: null
	,g: null
	,setProjection: function() {
		var width = this.canvas.get_width();
		var height = this.canvas.get_height();
		if(((this.canvas) instanceof kha_Framebuffer)) {
			var _this = this.projectionMatrix;
			var tx = -width / width;
			var ty = -height / (0 - height);
			var tz = -1.0002000200020003;
			var m__00 = 2 / width;
			var m__10 = 0;
			var m__20 = 0;
			var m__30 = tx;
			var m__01 = 0;
			var m__11 = 2.0 / (0 - height);
			var m__21 = 0;
			var m__31 = ty;
			var m__02 = 0;
			var m__12 = 0;
			var m__22 = -0.002000200020002;
			var m__32 = tz;
			var m__03 = 0;
			var m__13 = 0;
			var m__23 = 0;
			var m__33 = 1;
			_this._00 = m__00;
			_this._10 = m__10;
			_this._20 = m__20;
			_this._30 = m__30;
			_this._01 = m__01;
			_this._11 = m__11;
			_this._21 = m__21;
			_this._31 = m__31;
			_this._02 = m__02;
			_this._12 = m__12;
			_this._22 = m__22;
			_this._32 = m__32;
			_this._03 = m__03;
			_this._13 = m__13;
			_this._23 = m__23;
			_this._33 = m__33;
		} else {
			if(!kha_Image.get_nonPow2Supported()) {
				width = kha_graphics4_Graphics2.upperPowerOfTwo(width);
				height = kha_graphics4_Graphics2.upperPowerOfTwo(height);
			}
			if(kha_Image.renderTargetsInvertedY()) {
				var _this = this.projectionMatrix;
				var tx = -width / width;
				var ty = -height / height;
				var tz = -1.0002000200020003;
				var m__00 = 2 / width;
				var m__10 = 0;
				var m__20 = 0;
				var m__30 = tx;
				var m__01 = 0;
				var m__11 = 2.0 / height;
				var m__21 = 0;
				var m__31 = ty;
				var m__02 = 0;
				var m__12 = 0;
				var m__22 = -0.002000200020002;
				var m__32 = tz;
				var m__03 = 0;
				var m__13 = 0;
				var m__23 = 0;
				var m__33 = 1;
				_this._00 = m__00;
				_this._10 = m__10;
				_this._20 = m__20;
				_this._30 = m__30;
				_this._01 = m__01;
				_this._11 = m__11;
				_this._21 = m__21;
				_this._31 = m__31;
				_this._02 = m__02;
				_this._12 = m__12;
				_this._22 = m__22;
				_this._32 = m__32;
				_this._03 = m__03;
				_this._13 = m__13;
				_this._23 = m__23;
				_this._33 = m__33;
			} else {
				var _this = this.projectionMatrix;
				var tx = -width / width;
				var ty = -height / (0 - height);
				var tz = -1.0002000200020003;
				var m__00 = 2 / width;
				var m__10 = 0;
				var m__20 = 0;
				var m__30 = tx;
				var m__01 = 0;
				var m__11 = 2.0 / (0 - height);
				var m__21 = 0;
				var m__31 = ty;
				var m__02 = 0;
				var m__12 = 0;
				var m__22 = -0.002000200020002;
				var m__32 = tz;
				var m__03 = 0;
				var m__13 = 0;
				var m__23 = 0;
				var m__33 = 1;
				_this._00 = m__00;
				_this._10 = m__10;
				_this._20 = m__20;
				_this._30 = m__30;
				_this._01 = m__01;
				_this._11 = m__11;
				_this._21 = m__21;
				_this._31 = m__31;
				_this._02 = m__02;
				_this._12 = m__12;
				_this._22 = m__22;
				_this._32 = m__32;
				_this._03 = m__03;
				_this._13 = m__13;
				_this._23 = m__23;
				_this._33 = m__33;
			}
		}
		this.imagePainter.setProjection(this.projectionMatrix);
		this.coloredPainter.setProjection(this.projectionMatrix);
		this.textPainter.setProjection(this.projectionMatrix);
	}
	,drawImage: function(img,x,y) {
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.end();
		var xw = x + img.get_width();
		var yh = y + img.get_height();
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = yh;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p1_x = x2;
		var p1_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p2_x = x1;
		var p2_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x = xw;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p3_x = x1;
		var p3_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = xw;
		var y = yh;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p4_x = x1;
		var p4_y = y1;
		var _this = this.imagePainter;
		var opacity = this.get_opacity();
		var color = this.get_color();
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			_this.drawBuffer(false);
		}
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 5] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 6] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 7] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 8] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 14] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 15] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 16] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 17] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 23] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 24] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 25] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 26] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 32] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 33] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 34] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 35] = a;
		var right = tex.get_width() / tex.get_realWidth();
		var bottom = tex.get_height() / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 3] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 4] = bottom;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 12] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 13] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 21] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 22] = 0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 30] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 31] = bottom;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex] = p1_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 1] = p1_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 9] = p2_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 10] = p2_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 11] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 18] = p3_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 19] = p3_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 20] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 27] = p4_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 28] = p4_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 29] = -5.0;
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,drawScaledSubImage: function(img,sx,sy,sw,sh,dx,dy,dw,dh) {
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x = dx;
		var y = dy + dh;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p1_x = x1;
		var p1_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = dx;
		var y = dy;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p2_x = x1;
		var p2_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = dx + dw;
		var y = dy;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p3_x = x1;
		var p3_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = dx + dw;
		var y = dy + dh;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p4_x = x1;
		var p4_y = y1;
		var _this = this.imagePainter;
		var opacity = this.get_opacity();
		var color = this.get_color();
		var tex = img;
		if(kha_graphics4_ImageShaderPainter.bufferStart + kha_graphics4_ImageShaderPainter.bufferIndex + 1 >= 1500 || kha_graphics4_ImageShaderPainter.lastTexture != null && tex != kha_graphics4_ImageShaderPainter.lastTexture) {
			_this.drawBuffer(false);
		}
		var left = sx / tex.get_realWidth();
		var top = sy / tex.get_realHeight();
		var right = (sx + sw) / tex.get_realWidth();
		var bottom = (sy + sh) / tex.get_realHeight();
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 3] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 4] = bottom;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 12] = left;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 13] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 21] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 22] = top;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 30] = right;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 31] = bottom;
		var r = ((color & 16711680) >>> 16) * 0.00392156862745098;
		var g = ((color & 65280) >>> 8) * 0.00392156862745098;
		var b = (color & 255) * 0.00392156862745098;
		var a = (color >>> 24) * 0.00392156862745098 * opacity;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 5] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 6] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 7] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 8] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 14] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 15] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 16] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 17] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 23] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 24] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 25] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 26] = a;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 32] = r;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 33] = g;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 34] = b;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 35] = a;
		var baseIndex = (kha_graphics4_ImageShaderPainter.bufferIndex - kha_graphics4_ImageShaderPainter.bufferStart) * 9 * 4;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex] = p1_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 1] = p1_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 2] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 9] = p2_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 10] = p2_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 11] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 18] = p3_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 19] = p3_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 20] = -5.0;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 27] = p4_x;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 28] = p4_y;
		kha_graphics4_ImageShaderPainter.rectVertices[baseIndex + 29] = -5.0;
		++kha_graphics4_ImageShaderPainter.bufferIndex;
		kha_graphics4_ImageShaderPainter.lastTexture = tex;
	}
	,get_color: function() {
		return this.myColor;
	}
	,set_color: function(color) {
		return this.myColor = color;
	}
	,drawRect: function(x,y,width,height,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p1_x = x2;
		var p1_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p2_x = x2;
		var p2_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p3_x = x2;
		var p3_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p4_x = x2;
		var p4_y = y2;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + height + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x - strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + height + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width - strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width - strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var v_x = x2;
		var v_y = y2;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width + strength / 2;
		var y1 = y + height - strength / 2;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
	}
	,fillRect: function(x,y,width,height) {
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = y + height;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p1_x = x2;
		var p1_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p2_x = x2;
		var p2_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x1 = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y1 = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x2 = x1;
		var y2 = y1;
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		var p3_x = x2;
		var p3_y = y2;
		var _this = this.transformations[this.transformationIndex];
		var x1 = x + width;
		var y1 = y + height;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var value_x = x1;
		var value_y = y1;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p4_x = x1;
		var p4_y = y1;
		this.coloredPainter.fillRect(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y,p4_x,p4_y);
	}
	,drawString: function(text,x,y) {
		this.imagePainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.drawString(text,this.get_opacity(),this.get_color(),x,y,this.transformations[this.transformationIndex]);
	}
	,drawCharacters: function(text,start,length,x,y) {
		this.imagePainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
		this.textPainter.drawCharacters(text,start,length,this.get_opacity(),this.get_color(),x,y,this.transformations[this.transformationIndex]);
	}
	,get_font: function() {
		return this.myFont;
	}
	,set_font: function(font) {
		this.textPainter.setFont(font);
		return this.myFont = font;
	}
	,set_fontSize: function(value) {
		return kha_graphics2_Graphics.prototype.set_fontSize.call(this,this.textPainter.fontSize = value);
	}
	,drawLine: function(x1,y1,x2,y2,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		this.imagePainter.end();
		this.textPainter.end();
		var vec_x = 0;
		var vec_y = 0;
		if(y2 == y1) {
			var x = 0;
			var y = -1;
			if(y == null) {
				y = 0;
			}
			if(x == null) {
				x = 0;
			}
			var v_x = x;
			var v_y = y;
			vec_x = v_x;
			vec_y = v_y;
		} else {
			var x = 1;
			var y = -(x2 - x1) / (y2 - y1);
			if(y == null) {
				y = 0;
			}
			if(x == null) {
				x = 0;
			}
			var v_x = x;
			var v_y = y;
			vec_x = v_x;
			vec_y = v_y;
		}
		var currentLength = Math.sqrt(vec_x * vec_x + vec_y * vec_y);
		if(currentLength != 0) {
			var mul = strength / currentLength;
			vec_x *= mul;
			vec_y *= mul;
		}
		var x = x1 + 0.5 * vec_x;
		var y = y1 + 0.5 * vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p1_x = x;
		var p1_y = y;
		var x = x2 + 0.5 * vec_x;
		var y = y2 + 0.5 * vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p2_x = x;
		var p2_y = y;
		var x = p1_x - vec_x;
		var y = p1_y - vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p3_x = x;
		var p3_y = y;
		var x = p2_x - vec_x;
		var y = p2_y - vec_y;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var p4_x = x;
		var p4_y = y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p1_x + _this._12 * p1_y + _this._22;
		var x = (_this._00 * p1_x + _this._10 * p1_y + _this._20) / w;
		var y = (_this._01 * p1_x + _this._11 * p1_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p1_x = v_x;
		p1_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p2_x + _this._12 * p2_y + _this._22;
		var x = (_this._00 * p2_x + _this._10 * p2_y + _this._20) / w;
		var y = (_this._01 * p2_x + _this._11 * p2_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p2_x = v_x;
		p2_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p3_x + _this._12 * p3_y + _this._22;
		var x = (_this._00 * p3_x + _this._10 * p3_y + _this._20) / w;
		var y = (_this._01 * p3_x + _this._11 * p3_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p3_x = v_x;
		p3_y = v_y;
		var _this = this.transformations[this.transformationIndex];
		var w = _this._02 * p4_x + _this._12 * p4_y + _this._22;
		var x = (_this._00 * p4_x + _this._10 * p4_y + _this._20) / w;
		var y = (_this._01 * p4_x + _this._11 * p4_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var v_x = x1;
		var v_y = y1;
		p4_x = v_x;
		p4_y = v_y;
		this.coloredPainter.fillTriangle(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
		this.coloredPainter.fillTriangle(this.get_opacity(),this.get_color(),p3_x,p3_y,p2_x,p2_y,p4_x,p4_y);
	}
	,fillTriangle: function(x1,y1,x2,y2,x3,y3) {
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.transformations[this.transformationIndex];
		var x = x1;
		var y = y1;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p1_x = x1;
		var p1_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = x2;
		var y = y2;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p2_x = x1;
		var p2_y = y1;
		var _this = this.transformations[this.transformationIndex];
		var x = x3;
		var y = y3;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var value_x = x;
		var value_y = y;
		var w = _this._02 * value_x + _this._12 * value_y + _this._22;
		var x = (_this._00 * value_x + _this._10 * value_y + _this._20) / w;
		var y = (_this._01 * value_x + _this._11 * value_y + _this._21) / w;
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		var p3_x = x1;
		var p3_y = y1;
		this.coloredPainter.fillTriangle(this.get_opacity(),this.get_color(),p1_x,p1_y,p2_x,p2_y,p3_x,p3_y);
	}
	,myImageScaleQuality: null
	,get_imageScaleQuality: function() {
		return this.myImageScaleQuality;
	}
	,set_imageScaleQuality: function(value) {
		if(value == this.myImageScaleQuality) {
			return value;
		}
		this.imagePainter.setBilinearFilter(value == 1);
		this.textPainter.setBilinearFilter(value == 1);
		return this.myImageScaleQuality = value;
	}
	,myMipmapScaleQuality: null
	,get_mipmapScaleQuality: function() {
		return this.myMipmapScaleQuality;
	}
	,set_mipmapScaleQuality: function(value) {
		this.imagePainter.setBilinearMipmapFilter(value == 1);
		return this.myMipmapScaleQuality = value;
	}
	,pipelineCache: null
	,lastPipeline: null
	,setPipeline: function(pipeline) {
		if(pipeline == this.lastPipeline) {
			return;
		}
		this.lastPipeline = pipeline;
		this.flush();
		if(pipeline == null) {
			this.imagePainter.set_pipeline(null);
			this.coloredPainter.set_pipeline(null);
			this.textPainter.set_pipeline(null);
		} else {
			var cache = this.pipelineCache.h[pipeline.__id__];
			if(cache == null) {
				cache = new kha_graphics4_SimplePipelineCache(pipeline,true);
				this.pipelineCache.set(pipeline,cache);
			}
			this.imagePainter.set_pipeline(cache);
			this.coloredPainter.set_pipeline(cache);
			this.textPainter.set_pipeline(cache);
		}
	}
	,scissorEnabled: null
	,scissorX: null
	,scissorY: null
	,scissorW: null
	,scissorH: null
	,scissor: function(x,y,width,height) {
		this.scissorEnabled = true;
		this.scissorX = x;
		this.scissorY = y;
		this.scissorW = width;
		this.scissorH = height;
		this.flush();
		this.g.scissor(x,y,width,height);
	}
	,disableScissor: function() {
		this.scissorEnabled = false;
		this.flush();
		this.g.disableScissor();
	}
	,begin: function(clear,clearColor) {
		if(clear == null) {
			clear = true;
		}
		if(kha_graphics4_Graphics2.current == null) {
			kha_graphics4_Graphics2.current = this;
		} else {
			throw haxe_Exception.thrown("End before you begin");
		}
		this.g.begin();
		if(clear) {
			this.clear(clearColor);
		}
		this.setProjection();
	}
	,clear: function(color) {
		this.flush();
		this.g.clear(color == null ? -16777216 : color);
	}
	,flush: function() {
		this.imagePainter.end();
		this.textPainter.end();
		var _this = this.coloredPainter;
		if(kha_graphics4_ColoredShaderPainter.triangleBufferIndex > 0) {
			_this.drawTriBuffer(false);
		}
		if(kha_graphics4_ColoredShaderPainter.bufferIndex > 0) {
			_this.drawBuffer(false);
		}
	}
	,end: function() {
		this.flush();
		this.g.end();
		if(kha_graphics4_Graphics2.current == this) {
			kha_graphics4_Graphics2.current = null;
		} else {
			throw haxe_Exception.thrown("Begin before you end");
		}
	}
	,drawVideoInternal: function(video,x,y,width,height) {
	}
	,drawVideo: function(video,x,y,width,height) {
		this.setPipeline(kha_graphics4_Graphics2.videoPipeline);
		this.drawVideoInternal(video,x,y,width,height);
		this.setPipeline(null);
	}
	,__class__: kha_graphics4_Graphics2
});
var kha_graphics4_IndexBuffer = function(indexCount,usage,canRead) {
	if(canRead == null) {
		canRead = false;
	}
	this.indexCount = indexCount;
	this.buffer = Krom.createIndexBuffer(indexCount);
};
$hxClasses["kha.graphics4.IndexBuffer"] = kha_graphics4_IndexBuffer;
kha_graphics4_IndexBuffer.__name__ = true;
kha_graphics4_IndexBuffer.prototype = {
	_data: null
	,buffer: null
	,indexCount: null
	,'delete': function() {
		Krom.deleteIndexBuffer(this.buffer);
		this.buffer = null;
	}
	,lock: function(start,count) {
		this._data = Krom.lockIndexBuffer(this.buffer);
		if(start == null) {
			start = 0;
		}
		if(count == null) {
			count = this.indexCount;
		}
		return this._data.subarray(start,start + count);
	}
	,unlock: function(count) {
		Krom.unlockIndexBuffer(this.buffer);
	}
	,set: function() {
		Krom.setIndexBuffer(this.buffer);
	}
	,count: function() {
		return this.indexCount;
	}
	,__class__: kha_graphics4_IndexBuffer
};
var kha_graphics4_PipelineStateBase = function() {
	this.inputLayout = null;
	this.vertexShader = null;
	this.fragmentShader = null;
	this.geometryShader = null;
	this.tessellationControlShader = null;
	this.tessellationEvaluationShader = null;
	this.cullMode = 2;
	this.depthWrite = false;
	this.depthMode = 0;
	this.stencilMode = 0;
	this.stencilBothPass = 0;
	this.stencilDepthFail = 0;
	this.stencilFail = 0;
	this.stencilReferenceValue = kha_graphics4_StencilValue.Static(0);
	this.stencilReadMask = 255;
	this.stencilWriteMask = 255;
	this.blendSource = 1;
	this.blendDestination = 2;
	this.blendOperation = 0;
	this.alphaBlendSource = 1;
	this.alphaBlendDestination = 2;
	this.alphaBlendOperation = 0;
	this.colorWriteMasksRed = [];
	this.colorWriteMasksGreen = [];
	this.colorWriteMasksBlue = [];
	this.colorWriteMasksAlpha = [];
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksRed.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksGreen.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksBlue.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorWriteMasksAlpha.push(true);
	this.colorAttachmentCount = 1;
	this.colorAttachments = [];
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.colorAttachments.push(0);
	this.depthStencilAttachment = 0;
	this.conservativeRasterization = false;
};
$hxClasses["kha.graphics4.PipelineStateBase"] = kha_graphics4_PipelineStateBase;
kha_graphics4_PipelineStateBase.__name__ = true;
kha_graphics4_PipelineStateBase.prototype = {
	inputLayout: null
	,vertexShader: null
	,fragmentShader: null
	,geometryShader: null
	,tessellationControlShader: null
	,tessellationEvaluationShader: null
	,cullMode: null
	,depthWrite: null
	,depthMode: null
	,stencilMode: null
	,stencilBothPass: null
	,stencilDepthFail: null
	,stencilFail: null
	,stencilReferenceValue: null
	,stencilReadMask: null
	,stencilWriteMask: null
	,blendSource: null
	,blendDestination: null
	,blendOperation: null
	,alphaBlendSource: null
	,alphaBlendDestination: null
	,alphaBlendOperation: null
	,colorWriteMasksRed: null
	,colorWriteMasksGreen: null
	,colorWriteMasksBlue: null
	,colorWriteMasksAlpha: null
	,colorAttachmentCount: null
	,colorAttachments: null
	,depthStencilAttachment: null
	,set_colorWriteMask: function(value) {
		var value1 = this.colorWriteMasksAlpha[0] = value;
		var value = this.colorWriteMasksGreen[0] = value1;
		var value1 = this.colorWriteMasksBlue[0] = value;
		return this.colorWriteMasksRed[0] = value1;
	}
	,get_colorWriteMaskRed: function() {
		return this.colorWriteMasksRed[0];
	}
	,set_colorWriteMaskRed: function(value) {
		return this.colorWriteMasksRed[0] = value;
	}
	,get_colorWriteMaskGreen: function() {
		return this.colorWriteMasksGreen[0];
	}
	,set_colorWriteMaskGreen: function(value) {
		return this.colorWriteMasksGreen[0] = value;
	}
	,get_colorWriteMaskBlue: function() {
		return this.colorWriteMasksBlue[0];
	}
	,set_colorWriteMaskBlue: function(value) {
		return this.colorWriteMasksBlue[0] = value;
	}
	,get_colorWriteMaskAlpha: function() {
		return this.colorWriteMasksAlpha[0];
	}
	,set_colorWriteMaskAlpha: function(value) {
		return this.colorWriteMasksAlpha[0] = value;
	}
	,conservativeRasterization: null
	,__class__: kha_graphics4_PipelineStateBase
	,__properties__: {set_colorWriteMaskAlpha:"set_colorWriteMaskAlpha",get_colorWriteMaskAlpha:"get_colorWriteMaskAlpha",set_colorWriteMaskBlue:"set_colorWriteMaskBlue",get_colorWriteMaskBlue:"get_colorWriteMaskBlue",set_colorWriteMaskGreen:"set_colorWriteMaskGreen",get_colorWriteMaskGreen:"get_colorWriteMaskGreen",set_colorWriteMaskRed:"set_colorWriteMaskRed",get_colorWriteMaskRed:"get_colorWriteMaskRed",set_colorWriteMask:"set_colorWriteMask"}
};
var kha_graphics4_PipelineState = function() {
	kha_graphics4_PipelineStateBase.call(this);
	this.pipeline = Krom.createPipeline();
};
$hxClasses["kha.graphics4.PipelineState"] = kha_graphics4_PipelineState;
kha_graphics4_PipelineState.__name__ = true;
kha_graphics4_PipelineState.convertBlendingFactor = function(factor) {
	switch(factor) {
	case 0:case 1:
		return 0;
	case 2:
		return 1;
	case 3:
		return 2;
	case 4:
		return 3;
	case 5:
		return 4;
	case 6:
		return 5;
	case 7:
		return 6;
	case 8:
		return 7;
	case 9:
		return 8;
	case 10:
		return 9;
	}
};
kha_graphics4_PipelineState.__super__ = kha_graphics4_PipelineStateBase;
kha_graphics4_PipelineState.prototype = $extend(kha_graphics4_PipelineStateBase.prototype,{
	pipeline: null
	,'delete': function() {
		Krom.deletePipeline(this.pipeline);
		this.pipeline = null;
	}
	,compile: function() {
		var structure0 = this.inputLayout.length > 0 ? this.inputLayout[0] : null;
		var structure1 = this.inputLayout.length > 1 ? this.inputLayout[1] : null;
		var structure2 = this.inputLayout.length > 2 ? this.inputLayout[2] : null;
		var structure3 = this.inputLayout.length > 3 ? this.inputLayout[3] : null;
		var gs = this.geometryShader != null ? this.geometryShader.shader : null;
		var tcs = this.tessellationControlShader != null ? this.tessellationControlShader.shader : null;
		var tes = this.tessellationEvaluationShader != null ? this.tessellationEvaluationShader.shader : null;
		var stencilReferenceValue = 0;
		var _g = this.stencilReferenceValue;
		if(_g._hx_index == 1) {
			var value = _g.value;
			stencilReferenceValue = value;
		}
		Krom.compilePipeline(this.pipeline,structure0,structure1,structure2,structure3,this.inputLayout.length,this.vertexShader.shader,this.fragmentShader.shader,gs,tcs,tes,{ cullMode : this.cullMode, depthWrite : this.depthWrite, depthMode : this.depthMode, stencilMode : this.stencilMode, stencilBothPass : this.stencilBothPass, stencilDepthFail : this.stencilDepthFail, stencilFail : this.stencilFail, stencilReferenceValue : stencilReferenceValue, stencilReadMask : this.stencilReadMask, stencilWriteMask : this.stencilWriteMask, blendSource : kha_graphics4_PipelineState.convertBlendingFactor(this.blendSource), blendDestination : kha_graphics4_PipelineState.convertBlendingFactor(this.blendDestination), alphaBlendSource : kha_graphics4_PipelineState.convertBlendingFactor(this.alphaBlendSource), alphaBlendDestination : kha_graphics4_PipelineState.convertBlendingFactor(this.alphaBlendDestination), colorWriteMaskRed : this.colorWriteMasksRed, colorWriteMaskGreen : this.colorWriteMasksGreen, colorWriteMaskBlue : this.colorWriteMasksBlue, colorWriteMaskAlpha : this.colorWriteMasksAlpha, conservativeRasterization : this.conservativeRasterization});
	}
	,set: function() {
		Krom.setPipeline(this.pipeline);
	}
	,getConstantLocation: function(name) {
		return Krom.getConstantLocation(this.pipeline,name);
	}
	,getTextureUnit: function(name) {
		return Krom.getTextureUnit(this.pipeline,name);
	}
	,__class__: kha_graphics4_PipelineState
});
var kha_graphics4_StencilValue = $hxEnums["kha.graphics4.StencilValue"] = { __ename__:true,__constructs__:null
	,Dynamic: {_hx_name:"Dynamic",_hx_index:0,__enum__:"kha.graphics4.StencilValue",toString:$estr}
	,Static: ($_=function(value) { return {_hx_index:1,value:value,__enum__:"kha.graphics4.StencilValue",toString:$estr}; },$_._hx_name="Static",$_.__params__ = ["value"],$_)
};
kha_graphics4_StencilValue.__constructs__ = [kha_graphics4_StencilValue.Dynamic,kha_graphics4_StencilValue.Static];
var kha_graphics4_TessellationControlShader = function(sources,names) {
	this.shader = Krom.createTessellationControlShader(sources[0].bytes.b.bufferValue,names[0]);
};
$hxClasses["kha.graphics4.TessellationControlShader"] = kha_graphics4_TessellationControlShader;
kha_graphics4_TessellationControlShader.__name__ = true;
kha_graphics4_TessellationControlShader.prototype = {
	shader: null
	,'delete': function() {
		Krom.deleteShader(this.shader);
		this.shader = null;
	}
	,__class__: kha_graphics4_TessellationControlShader
};
var kha_graphics4_TessellationEvaluationShader = function(sources,names) {
	this.shader = Krom.createTessellationEvaluationShader(sources[0].bytes.b.bufferValue,names[0]);
};
$hxClasses["kha.graphics4.TessellationEvaluationShader"] = kha_graphics4_TessellationEvaluationShader;
kha_graphics4_TessellationEvaluationShader.__name__ = true;
kha_graphics4_TessellationEvaluationShader.prototype = {
	shader: null
	,'delete': function() {
		Krom.deleteShader(this.shader);
		this.shader = null;
	}
	,__class__: kha_graphics4_TessellationEvaluationShader
};
var kha_graphics4_TextureUnit = function() { };
$hxClasses["kha.graphics4.TextureUnit"] = kha_graphics4_TextureUnit;
kha_graphics4_TextureUnit.__name__ = true;
kha_graphics4_TextureUnit.__isInterface__ = true;
var kha_graphics4_VertexBuffer = function(vertexCount,structure,usage,instanceDataStepRate,canRead) {
	if(canRead == null) {
		canRead = false;
	}
	if(instanceDataStepRate == null) {
		instanceDataStepRate = 0;
	}
	this.lockEnd = 0;
	this.lockStart = 0;
	this.vertexCount = vertexCount;
	this.structure = structure;
	this.mySize = vertexCount;
	this.buffer = Krom.createVertexBuffer(vertexCount,structure.elements,usage,instanceDataStepRate);
};
$hxClasses["kha.graphics4.VertexBuffer"] = kha_graphics4_VertexBuffer;
kha_graphics4_VertexBuffer.__name__ = true;
kha_graphics4_VertexBuffer.prototype = {
	buffer: null
	,_data: null
	,vertexCount: null
	,structure: null
	,mySize: null
	,lockStart: null
	,lockEnd: null
	,'delete': function() {
		Krom.deleteVertexBuffer(this.buffer);
		this.buffer = null;
	}
	,lock: function(start,count) {
		this.lockStart = start != null ? start : 0;
		this.lockEnd = count != null ? start + count : this.mySize;
		this._data = Krom.lockVertexBuffer(this.buffer,this.lockStart,this.lockEnd);
		return this._data;
	}
	,lockInt16: function(start,count) {
		var this1 = new Int16Array(this.lock(start,count).buffer);
		return this1;
	}
	,unlock: function(count) {
		if(count != null) {
			this.lockEnd = this.lockStart + count;
		}
		Krom.unlockVertexBuffer(this.buffer,this.lockEnd);
	}
	,stride: function() {
		return this.structure.byteSize();
	}
	,count: function() {
		return this.vertexCount;
	}
	,set: function(offset) {
		Krom.setVertexBuffer(this.buffer);
		return 0;
	}
	,__class__: kha_graphics4_VertexBuffer
};
var kha_graphics4_VertexElement = function(name,data) {
	this.name = name;
	this.data = data;
};
$hxClasses["kha.graphics4.VertexElement"] = kha_graphics4_VertexElement;
kha_graphics4_VertexElement.__name__ = true;
kha_graphics4_VertexElement.prototype = {
	name: null
	,data: null
	,__class__: kha_graphics4_VertexElement
};
var kha_graphics4_VertexShader = function(sources,names) {
	if(sources != null) {
		this.shader = Krom.createVertexShader(sources[0].bytes.b.bufferValue,names[0]);
	}
};
$hxClasses["kha.graphics4.VertexShader"] = kha_graphics4_VertexShader;
kha_graphics4_VertexShader.__name__ = true;
kha_graphics4_VertexShader.fromSource = function(source) {
	var shader = new kha_graphics4_VertexShader(null,null);
	shader.shader = Krom.createVertexShaderFromSource(source);
	return shader;
};
kha_graphics4_VertexShader.prototype = {
	shader: null
	,'delete': function() {
		Krom.deleteShader(this.shader);
		this.shader = null;
	}
	,__class__: kha_graphics4_VertexShader
};
var kha_graphics4_VertexStructure = function() {
	this.elements = [];
	this.instanced = false;
};
$hxClasses["kha.graphics4.VertexStructure"] = kha_graphics4_VertexStructure;
kha_graphics4_VertexStructure.__name__ = true;
kha_graphics4_VertexStructure.prototype = {
	elements: null
	,instanced: null
	,add: function(name,data) {
		this.elements.push(new kha_graphics4_VertexElement(name,data));
	}
	,size: function() {
		return this.elements.length;
	}
	,byteSize: function() {
		var byteSize = 0;
		var _g = 0;
		var _g1 = this.elements.length;
		while(_g < _g1) {
			var i = _g++;
			byteSize += this.dataByteSize(this.elements[i].data);
		}
		return byteSize;
	}
	,dataByteSize: function(data) {
		switch(data) {
		case 0:
			return 4;
		case 1:
			return 8;
		case 2:
			return 12;
		case 3:
			return 16;
		case 4:
			return 64;
		case 5:
			return 4;
		case 6:
			return 8;
		}
	}
	,get: function(index) {
		return this.elements[index];
	}
	,__class__: kha_graphics4_VertexStructure
};
var kha_input_Gamepad = $hx_exports["kha"]["input"]["Gamepad"] = function(index,id) {
	if(id == null) {
		id = "unknown";
	}
	if(index == null) {
		index = 0;
	}
	this.connected = false;
	this.index = index;
	this.axisListeners = [];
	this.buttonListeners = [];
	kha_input_Gamepad.instances[index] = this;
};
$hxClasses["kha.input.Gamepad"] = kha_input_Gamepad;
kha_input_Gamepad.__name__ = true;
kha_input_Gamepad.get = function(index) {
	if(index == null) {
		index = 0;
	}
	if(index >= kha_input_Gamepad.instances.length) {
		return null;
	}
	return kha_input_Gamepad.instances[index];
};
kha_input_Gamepad.notifyOnConnect = function(connectListener,disconnectListener) {
	if(connectListener != null) {
		kha_input_Gamepad.connectListeners.push(connectListener);
	}
	if(disconnectListener != null) {
		kha_input_Gamepad.disconnectListeners.push(disconnectListener);
	}
};
kha_input_Gamepad.removeConnect = function(connectListener,disconnectListener) {
	if(connectListener != null) {
		HxOverrides.remove(kha_input_Gamepad.connectListeners,connectListener);
	}
	if(disconnectListener != null) {
		HxOverrides.remove(kha_input_Gamepad.disconnectListeners,disconnectListener);
	}
};
kha_input_Gamepad.sendConnectEvent = function(index) {
	kha_input_Gamepad.instances[index].connected = true;
	var _g = 0;
	var _g1 = kha_input_Gamepad.connectListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(index);
	}
};
kha_input_Gamepad.sendDisconnectEvent = function(index) {
	kha_input_Gamepad.instances[index].connected = false;
	var _g = 0;
	var _g1 = kha_input_Gamepad.disconnectListeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		listener(index);
	}
};
kha_input_Gamepad.prototype = {
	index: null
	,notify: function(axisListener,buttonListener) {
		if(axisListener != null) {
			this.axisListeners.push(axisListener);
		}
		if(buttonListener != null) {
			this.buttonListeners.push(buttonListener);
		}
	}
	,remove: function(axisListener,buttonListener) {
		if(axisListener != null) {
			HxOverrides.remove(this.axisListeners,axisListener);
		}
		if(buttonListener != null) {
			HxOverrides.remove(this.buttonListeners,buttonListener);
		}
	}
	,axisListeners: null
	,buttonListeners: null
	,id: null
	,vendor: null
	,connected: null
	,rumble: function(leftAmount,rightAmount) {
		kha_SystemImpl.setGamepadRumble(this.index,leftAmount,rightAmount);
	}
	,get_id: function() {
		return kha_SystemImpl.getGamepadId(this.index);
	}
	,get_vendor: function() {
		return kha_SystemImpl.getGamepadVendor(this.index);
	}
	,sendAxisEvent: function(axis,value) {
		var _g = 0;
		var _g1 = this.axisListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(axis,value);
		}
	}
	,sendButtonEvent: function(button,value) {
		var _g = 0;
		var _g1 = this.buttonListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(button,value);
		}
	}
	,__class__: kha_input_Gamepad
	,__properties__: {get_vendor:"get_vendor",get_id:"get_id"}
};
var kha_input_BlockInterventions = $hxEnums["kha.input.BlockInterventions"] = { __ename__:true,__constructs__:null
	,Default: {_hx_name:"Default",_hx_index:0,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,Full: {_hx_name:"Full",_hx_index:1,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,None: {_hx_name:"None",_hx_index:2,__enum__:"kha.input.BlockInterventions",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:3,func:func,__enum__:"kha.input.BlockInterventions",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_BlockInterventions.__constructs__ = [kha_input_BlockInterventions.Default,kha_input_BlockInterventions.Full,kha_input_BlockInterventions.None,kha_input_BlockInterventions.Custom];
var kha_netsync_Controller = function() {
	this.__id = kha_netsync_ControllerBuilder.nextId++;
	this._inputBuffer = new haxe_io_Bytes(new ArrayBuffer(1));
};
$hxClasses["kha.netsync.Controller"] = kha_netsync_Controller;
kha_netsync_Controller.__name__ = true;
kha_netsync_Controller.prototype = {
	__id: null
	,_inputBufferIndex: null
	,_inputBuffer: null
	,_id: function() {
		return this.__id;
	}
	,_receive: function(bytes) {
	}
	,__class__: kha_netsync_Controller
};
var kha_input_Keyboard = $hx_exports["kha"]["input"]["Keyboard"] = function() {
	kha_netsync_Controller.call(this);
	this.downListeners = [];
	this.upListeners = [];
	this.pressListeners = [];
	kha_input_Keyboard.instance = this;
};
$hxClasses["kha.input.Keyboard"] = kha_input_Keyboard;
kha_input_Keyboard.__name__ = true;
kha_input_Keyboard.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getKeyboard(num);
};
kha_input_Keyboard.disableSystemInterventions = function(behavior) {
	kha_input_Keyboard.keyBehavior = behavior;
};
kha_input_Keyboard.__super__ = kha_netsync_Controller;
kha_input_Keyboard.prototype = $extend(kha_netsync_Controller.prototype,{
	notify: function(downListener,upListener,pressListener) {
		if(downListener != null) {
			this.downListeners.push(downListener);
		}
		if(upListener != null) {
			this.upListeners.push(upListener);
		}
		if(pressListener != null) {
			this.pressListeners.push(pressListener);
		}
	}
	,remove: function(downListener,upListener,pressListener) {
		if(downListener != null) {
			HxOverrides.remove(this.downListeners,downListener);
		}
		if(upListener != null) {
			HxOverrides.remove(this.upListeners,upListener);
		}
		if(pressListener != null) {
			HxOverrides.remove(this.pressListeners,pressListener);
		}
	}
	,show: function() {
	}
	,hide: function() {
	}
	,downListeners: null
	,upListeners: null
	,pressListeners: null
	,sendDownEvent: function(code) {
		var _g = 0;
		var _g1 = this.downListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(code);
		}
	}
	,sendUpEvent: function(code) {
		var _g = 0;
		var _g1 = this.upListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(code);
		}
	}
	,sendPressEvent: function(char) {
		var _g = 0;
		var _g1 = this.pressListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(char);
		}
	}
	,_receive: function(bytes) {
	}
	,__class__: kha_input_Keyboard
});
var kha_input_MouseEventBlockBehavior = $hxEnums["kha.input.MouseEventBlockBehavior"] = { __ename__:true,__constructs__:null
	,Full: {_hx_name:"Full",_hx_index:0,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}
	,None: {_hx_name:"None",_hx_index:1,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:2,func:func,__enum__:"kha.input.MouseEventBlockBehavior",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_MouseEventBlockBehavior.__constructs__ = [kha_input_MouseEventBlockBehavior.Full,kha_input_MouseEventBlockBehavior.None,kha_input_MouseEventBlockBehavior.Custom];
var kha_input_MouseCursor = $hxEnums["kha.input.MouseCursor"] = { __ename__:true,__constructs__:null
	,Default: {_hx_name:"Default",_hx_index:0,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Pointer: {_hx_name:"Pointer",_hx_index:1,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Text: {_hx_name:"Text",_hx_index:2,__enum__:"kha.input.MouseCursor",toString:$estr}
	,EastWestResize: {_hx_name:"EastWestResize",_hx_index:3,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthSouthResize: {_hx_name:"NorthSouthResize",_hx_index:4,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthEastResize: {_hx_name:"NorthEastResize",_hx_index:5,__enum__:"kha.input.MouseCursor",toString:$estr}
	,SouthEastResize: {_hx_name:"SouthEastResize",_hx_index:6,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NorthWestResize: {_hx_name:"NorthWestResize",_hx_index:7,__enum__:"kha.input.MouseCursor",toString:$estr}
	,SouthWestResize: {_hx_name:"SouthWestResize",_hx_index:8,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Grab: {_hx_name:"Grab",_hx_index:9,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Grabbing: {_hx_name:"Grabbing",_hx_index:10,__enum__:"kha.input.MouseCursor",toString:$estr}
	,NotAllowed: {_hx_name:"NotAllowed",_hx_index:11,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Wait: {_hx_name:"Wait",_hx_index:12,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Crosshair: {_hx_name:"Crosshair",_hx_index:13,__enum__:"kha.input.MouseCursor",toString:$estr}
	,Custom: ($_=function(image) { return {_hx_index:14,image:image,__enum__:"kha.input.MouseCursor",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["image"],$_)
};
kha_input_MouseCursor.__constructs__ = [kha_input_MouseCursor.Default,kha_input_MouseCursor.Pointer,kha_input_MouseCursor.Text,kha_input_MouseCursor.EastWestResize,kha_input_MouseCursor.NorthSouthResize,kha_input_MouseCursor.NorthEastResize,kha_input_MouseCursor.SouthEastResize,kha_input_MouseCursor.NorthWestResize,kha_input_MouseCursor.SouthWestResize,kha_input_MouseCursor.Grab,kha_input_MouseCursor.Grabbing,kha_input_MouseCursor.NotAllowed,kha_input_MouseCursor.Wait,kha_input_MouseCursor.Crosshair,kha_input_MouseCursor.Custom];
var kha_input_Mouse = $hx_exports["kha"]["input"]["Mouse"] = function() {
	kha_netsync_Controller.call(this);
	kha_input_Mouse.instance = this;
};
$hxClasses["kha.input.Mouse"] = kha_input_Mouse;
kha_input_Mouse.__name__ = true;
kha_input_Mouse.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getMouse(num);
};
kha_input_Mouse.setWheelEventBlockBehavior = function(behavior) {
	kha_input_Mouse.wheelEventBlockBehavior = behavior;
};
kha_input_Mouse.__super__ = kha_netsync_Controller;
kha_input_Mouse.prototype = $extend(kha_netsync_Controller.prototype,{
	notify: function(downListener,upListener,moveListener,wheelListener,leaveListener) {
		this.notifyWindowed(0,downListener,upListener,moveListener,wheelListener,leaveListener);
	}
	,remove: function(downListener,upListener,moveListener,wheelListener,leaveListener) {
		this.removeWindowed(0,downListener,upListener,moveListener,wheelListener,leaveListener);
	}
	,notifyWindowed: function(windowId,downListener,upListener,moveListener,wheelListener,leaveListener) {
		if(downListener != null) {
			if(this.windowDownListeners == null) {
				this.windowDownListeners = [];
			}
			while(this.windowDownListeners.length <= windowId) this.windowDownListeners.push([]);
			this.windowDownListeners[windowId].push(downListener);
		}
		if(upListener != null) {
			if(this.windowUpListeners == null) {
				this.windowUpListeners = [];
			}
			while(this.windowUpListeners.length <= windowId) this.windowUpListeners.push([]);
			this.windowUpListeners[windowId].push(upListener);
		}
		if(moveListener != null) {
			if(this.windowMoveListeners == null) {
				this.windowMoveListeners = [];
			}
			while(this.windowMoveListeners.length <= windowId) this.windowMoveListeners.push([]);
			this.windowMoveListeners[windowId].push(moveListener);
		}
		if(wheelListener != null) {
			if(this.windowWheelListeners == null) {
				this.windowWheelListeners = [];
			}
			while(this.windowWheelListeners.length <= windowId) this.windowWheelListeners.push([]);
			this.windowWheelListeners[windowId].push(wheelListener);
		}
		if(leaveListener != null) {
			if(this.windowLeaveListeners == null) {
				this.windowLeaveListeners = [];
			}
			while(this.windowLeaveListeners.length <= windowId) this.windowLeaveListeners.push([]);
			this.windowLeaveListeners[windowId].push(leaveListener);
		}
	}
	,removeWindowed: function(windowId,downListener,upListener,moveListener,wheelListener,leaveListener) {
		if(downListener != null) {
			if(this.windowDownListeners != null) {
				if(windowId < this.windowDownListeners.length) {
					HxOverrides.remove(this.windowDownListeners[windowId],downListener);
				} else {
					haxe_Log.trace("no downListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 152, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no downListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 156, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(upListener != null) {
			if(this.windowUpListeners != null) {
				if(windowId < this.windowUpListeners.length) {
					HxOverrides.remove(this.windowUpListeners[windowId],upListener);
				} else {
					haxe_Log.trace("no upListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 166, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no upListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 170, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(moveListener != null) {
			if(this.windowMoveListeners != null) {
				if(windowId < this.windowMoveListeners.length) {
					HxOverrides.remove(this.windowMoveListeners[windowId],moveListener);
				} else {
					haxe_Log.trace("no moveListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 180, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no moveListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 184, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(wheelListener != null) {
			if(this.windowWheelListeners != null) {
				if(windowId < this.windowWheelListeners.length) {
					HxOverrides.remove(this.windowWheelListeners[windowId],wheelListener);
				} else {
					haxe_Log.trace("no wheelListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 194, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no wheelListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 198, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
		if(leaveListener != null) {
			if(this.windowLeaveListeners != null) {
				if(windowId < this.windowLeaveListeners.length) {
					HxOverrides.remove(this.windowLeaveListeners[windowId],leaveListener);
				} else {
					haxe_Log.trace("no leaveListeners for window \"" + windowId + "\" are registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 208, className : "kha.input.Mouse", methodName : "removeWindowed"});
				}
			} else {
				haxe_Log.trace("no leaveListeners were ever registered",{ fileName : "kha/input/Mouse.hx", lineNumber : 212, className : "kha.input.Mouse", methodName : "removeWindowed"});
			}
		}
	}
	,lock: function() {
	}
	,unlock: function() {
	}
	,canLock: function() {
		return false;
	}
	,isLocked: function() {
		return false;
	}
	,notifyOnLockChange: function(change,error) {
	}
	,removeFromLockChange: function(change,error) {
	}
	,hideSystemCursor: function() {
	}
	,showSystemCursor: function() {
	}
	,setSystemCursor: function(cursor) {
	}
	,windowDownListeners: null
	,windowUpListeners: null
	,windowMoveListeners: null
	,windowWheelListeners: null
	,windowLeaveListeners: null
	,sendLeaveEvent: function(windowId) {
		if(this.windowLeaveListeners != null) {
			var _g = 0;
			var _g1 = this.windowLeaveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener();
			}
		}
	}
	,sendDownEvent: function(windowId,button,x,y) {
		if(this.windowDownListeners != null) {
			var _g = 0;
			var _g1 = this.windowDownListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(button,x,y);
			}
		}
	}
	,sendUpEvent: function(windowId,button,x,y) {
		if(this.windowUpListeners != null) {
			var _g = 0;
			var _g1 = this.windowUpListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(button,x,y);
			}
		}
	}
	,sendMoveEvent: function(windowId,x,y,movementX,movementY) {
		if(this.windowMoveListeners != null) {
			var _g = 0;
			var _g1 = this.windowMoveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,movementX,movementY);
			}
		}
	}
	,sendWheelEvent: function(windowId,delta) {
		if(this.windowWheelListeners != null) {
			var _g = 0;
			var _g1 = this.windowWheelListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(delta);
			}
		}
	}
	,_receive: function(bytes) {
	}
	,__class__: kha_input_Mouse
});
var kha_input_MouseImpl = function() {
	kha_input_Mouse.call(this);
};
$hxClasses["kha.input.MouseImpl"] = kha_input_MouseImpl;
kha_input_MouseImpl.__name__ = true;
kha_input_MouseImpl.__super__ = kha_input_Mouse;
kha_input_MouseImpl.prototype = $extend(kha_input_Mouse.prototype,{
	lock: function() {
		kha_SystemImpl.lockMouse();
	}
	,unlock: function() {
		kha_SystemImpl.unlockMouse();
	}
	,canLock: function() {
		return kha_SystemImpl.canLockMouse();
	}
	,isLocked: function() {
		return kha_SystemImpl.isMouseLocked();
	}
	,notifyOnLockChange: function(func,error) {
		kha_SystemImpl.notifyOfMouseLockChange(func,error);
	}
	,removeFromLockChange: function(func,error) {
		kha_SystemImpl.removeFromMouseLockChange(func,error);
	}
	,hideSystemCursor: function() {
		kha_SystemImpl.hideSystemCursor();
	}
	,showSystemCursor: function() {
		kha_SystemImpl.showSystemCursor();
	}
	,_receive: function(bytes) {
	}
	,__class__: kha_input_MouseImpl
});
var kha_input_Pen = function() {
	kha_input_Pen.instance = this;
};
$hxClasses["kha.input.Pen"] = kha_input_Pen;
kha_input_Pen.__name__ = true;
kha_input_Pen.get = function(num) {
	if(num == null) {
		num = 0;
	}
	return kha_SystemImpl.getPen(num);
};
kha_input_Pen.prototype = {
	notify: function(downListener,upListener,moveListener) {
		this.notifyWindowed(0,downListener,upListener,moveListener);
	}
	,notifyEraser: function(eraserDownListener,eraserUpListener,eraserMoveListener) {
		this.notifyEraserWindowed(0,eraserDownListener,eraserUpListener,eraserMoveListener);
	}
	,remove: function(downListener,upListener,moveListener) {
		this.removeWindowed(0,downListener,upListener,moveListener);
	}
	,removeEraser: function(eraserDownListener,eraserUpListener,eraserMoveListener) {
		this.removeEraserWindowed(0,eraserDownListener,eraserUpListener,eraserMoveListener);
	}
	,notifyWindowed: function(windowId,downListener,upListener,moveListener) {
		if(downListener != null) {
			if(this.windowDownListeners == null) {
				this.windowDownListeners = [];
			}
			while(this.windowDownListeners.length <= windowId) this.windowDownListeners.push([]);
			this.windowDownListeners[windowId].push(downListener);
		}
		if(upListener != null) {
			if(this.windowUpListeners == null) {
				this.windowUpListeners = [];
			}
			while(this.windowUpListeners.length <= windowId) this.windowUpListeners.push([]);
			this.windowUpListeners[windowId].push(upListener);
		}
		if(moveListener != null) {
			if(this.windowMoveListeners == null) {
				this.windowMoveListeners = [];
			}
			while(this.windowMoveListeners.length <= windowId) this.windowMoveListeners.push([]);
			this.windowMoveListeners[windowId].push(moveListener);
		}
	}
	,notifyEraserWindowed: function(windowId,eraserDownListener,eraserUpListener,eraserMoveListener) {
		if(eraserDownListener != null) {
			if(this.windowEraserDownListeners == null) {
				this.windowEraserDownListeners = [];
			}
			while(this.windowEraserDownListeners.length <= windowId) this.windowEraserDownListeners.push([]);
			this.windowEraserDownListeners[windowId].push(eraserDownListener);
		}
		if(eraserUpListener != null) {
			if(this.windowEraserUpListeners == null) {
				this.windowEraserUpListeners = [];
			}
			while(this.windowEraserUpListeners.length <= windowId) this.windowEraserUpListeners.push([]);
			this.windowEraserUpListeners[windowId].push(eraserUpListener);
		}
		if(eraserMoveListener != null) {
			if(this.windowEraserMoveListeners == null) {
				this.windowEraserMoveListeners = [];
			}
			while(this.windowEraserMoveListeners.length <= windowId) this.windowEraserMoveListeners.push([]);
			this.windowEraserMoveListeners[windowId].push(eraserMoveListener);
		}
	}
	,removeWindowed: function(windowId,downListener,upListener,moveListener) {
		if(downListener != null && this.windowDownListeners != null) {
			if(windowId < this.windowDownListeners.length) {
				HxOverrides.remove(this.windowDownListeners[windowId],downListener);
			}
		}
		if(upListener != null && this.windowUpListeners != null) {
			if(windowId < this.windowUpListeners.length) {
				HxOverrides.remove(this.windowUpListeners[windowId],upListener);
			}
		}
		if(moveListener != null && this.windowMoveListeners != null) {
			if(windowId < this.windowMoveListeners.length) {
				HxOverrides.remove(this.windowMoveListeners[windowId],moveListener);
			}
		}
	}
	,removeEraserWindowed: function(windowId,eraserDownListener,eraserUpListener,eraserMoveListener) {
		if(eraserDownListener != null && this.windowEraserDownListeners != null) {
			if(windowId < this.windowEraserDownListeners.length) {
				HxOverrides.remove(this.windowEraserDownListeners[windowId],eraserDownListener);
			}
		}
		if(eraserUpListener != null && this.windowEraserUpListeners != null) {
			if(windowId < this.windowEraserUpListeners.length) {
				HxOverrides.remove(this.windowEraserUpListeners[windowId],eraserUpListener);
			}
		}
		if(eraserMoveListener != null && this.windowEraserMoveListeners != null) {
			if(windowId < this.windowEraserMoveListeners.length) {
				HxOverrides.remove(this.windowEraserMoveListeners[windowId],eraserMoveListener);
			}
		}
	}
	,windowDownListeners: null
	,windowUpListeners: null
	,windowMoveListeners: null
	,windowEraserDownListeners: null
	,windowEraserUpListeners: null
	,windowEraserMoveListeners: null
	,sendDownEvent: function(windowId,x,y,pressure) {
		if(this.windowDownListeners != null) {
			var _g = 0;
			var _g1 = this.windowDownListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendUpEvent: function(windowId,x,y,pressure) {
		if(this.windowUpListeners != null) {
			var _g = 0;
			var _g1 = this.windowUpListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendMoveEvent: function(windowId,x,y,pressure) {
		if(this.windowMoveListeners != null) {
			var _g = 0;
			var _g1 = this.windowMoveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendEraserDownEvent: function(windowId,x,y,pressure) {
		if(this.windowEraserDownListeners != null) {
			var _g = 0;
			var _g1 = this.windowEraserDownListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendEraserUpEvent: function(windowId,x,y,pressure) {
		if(this.windowEraserUpListeners != null) {
			var _g = 0;
			var _g1 = this.windowEraserUpListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,sendEraserMoveEvent: function(windowId,x,y,pressure) {
		if(this.windowEraserMoveListeners != null) {
			var _g = 0;
			var _g1 = this.windowEraserMoveListeners[windowId];
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener(x,y,pressure);
			}
		}
	}
	,__class__: kha_input_Pen
};
var kha_input_TouchDownEventBlockBehavior = $hxEnums["kha.input.TouchDownEventBlockBehavior"] = { __ename__:true,__constructs__:null
	,Full: {_hx_name:"Full",_hx_index:0,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}
	,None: {_hx_name:"None",_hx_index:1,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}
	,Custom: ($_=function(func) { return {_hx_index:2,func:func,__enum__:"kha.input.TouchDownEventBlockBehavior",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["func"],$_)
};
kha_input_TouchDownEventBlockBehavior.__constructs__ = [kha_input_TouchDownEventBlockBehavior.Full,kha_input_TouchDownEventBlockBehavior.None,kha_input_TouchDownEventBlockBehavior.Custom];
var kha_input_Surface = $hx_exports["kha"]["input"]["Surface"] = function() {
	this.touchStartListeners = [];
	this.touchEndListeners = [];
	this.moveListeners = [];
	kha_input_Surface.instance = this;
};
$hxClasses["kha.input.Surface"] = kha_input_Surface;
kha_input_Surface.__name__ = true;
kha_input_Surface.get = function(num) {
	if(num == null) {
		num = 0;
	}
	if(num != 0) {
		return null;
	}
	return kha_input_Surface.instance;
};
kha_input_Surface.setTouchDownEventBlockBehavior = function(behavior) {
	kha_input_Surface.touchDownEventBlockBehavior = behavior;
};
kha_input_Surface.prototype = {
	notify: function(touchStartListener,touchEndListener,moveListener) {
		if(touchStartListener != null) {
			this.touchStartListeners.push(touchStartListener);
		}
		if(touchEndListener != null) {
			this.touchEndListeners.push(touchEndListener);
		}
		if(moveListener != null) {
			this.moveListeners.push(moveListener);
		}
	}
	,remove: function(touchStartListener,touchEndListener,moveListener) {
		if(touchStartListener != null) {
			HxOverrides.remove(this.touchStartListeners,touchStartListener);
		}
		if(touchEndListener != null) {
			HxOverrides.remove(this.touchEndListeners,touchEndListener);
		}
		if(moveListener != null) {
			HxOverrides.remove(this.moveListeners,moveListener);
		}
	}
	,touchStartListeners: null
	,touchEndListeners: null
	,moveListeners: null
	,sendTouchStartEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.touchStartListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(index,x,y);
		}
	}
	,sendTouchEndEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.touchEndListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(index,x,y);
		}
	}
	,sendMoveEvent: function(index,x,y) {
		var _g = 0;
		var _g1 = this.moveListeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener(index,x,y);
		}
	}
	,__class__: kha_input_Surface
};
var kha_internal_BytesBlob = function(bytes) {
	this.bytes = bytes;
};
$hxClasses["kha.internal.BytesBlob"] = kha_internal_BytesBlob;
kha_internal_BytesBlob.__name__ = true;
kha_internal_BytesBlob.__interfaces__ = [kha_Resource];
kha_internal_BytesBlob.fromBytes = function(bytes) {
	return new kha_internal_BytesBlob(bytes);
};
kha_internal_BytesBlob.alloc = function(size) {
	return new kha_internal_BytesBlob(new haxe_io_Bytes(new ArrayBuffer(size)));
};
kha_internal_BytesBlob.readF32 = function(i) {
	var sign = (i & -2147483648) == 0 ? 1 : -1;
	var exp = i >> 23 & 255;
	var man = i & 8388607;
	switch(exp) {
	case 0:
		return 0.0;
	case 255:
		if(man != 0) {
			return NaN;
		} else if(sign > 0) {
			return Infinity;
		} else {
			return -Infinity;
		}
		break;
	default:
		return sign * ((man + 8388608) / 8388608.0) * Math.pow(2,exp - 127);
	}
};
kha_internal_BytesBlob.bit = function(value,position) {
	var b = (value >>> position & 1) == 1;
	if(b) {
		var a = 3;
		++a;
		return true;
	} else {
		var c = 4;
		--c;
		return false;
	}
};
kha_internal_BytesBlob.toText = function(chars,length) {
	var value = "";
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var i = _g++;
		value += String.fromCodePoint(chars[i]);
	}
	return value;
};
kha_internal_BytesBlob.prototype = {
	bytes: null
	,sub: function(start,length) {
		return new kha_internal_BytesBlob(this.bytes.sub(start,length));
	}
	,length: null
	,get_length: function() {
		return this.bytes.length;
	}
	,writeU8: function(position,value) {
		this.bytes.b[position] = value;
	}
	,readU8: function(position) {
		var byte = this.bytes.b[position];
		++position;
		return byte;
	}
	,readS8: function(position) {
		var byte = this.bytes.b[position];
		++position;
		var sign = (byte & 128) == 0 ? 1 : -1;
		byte &= 127;
		return sign * byte;
	}
	,readU16BE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		position += 2;
		return first * 256 + second;
	}
	,readU16LE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		position += 2;
		return second * 256 + first;
	}
	,readU32LE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		position += 4;
		return fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256;
	}
	,readU32BE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		position += 4;
		return first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
	}
	,readS16BE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		position += 2;
		var sign = (first & 128) == 0 ? 1 : -1;
		first &= 127;
		if(sign == -1) {
			return -32767 + first * 256 + second;
		} else {
			return first * 256 + second;
		}
	}
	,readS16LE: function(position) {
		var first = this.bytes.b[position];
		var second = this.bytes.b[position + 1];
		var sign = (second & 128) == 0 ? 1 : -1;
		second &= 127;
		position += 2;
		if(sign == -1) {
			return -32767 + second * 256 + first;
		} else {
			return second * 256 + first;
		}
	}
	,readS32LE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		var sign = (first & 128) == 0 ? 1 : -1;
		first &= 127;
		position += 4;
		if(sign == -1) {
			return -2147483647 + fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256;
		} else {
			return fourth + third * 256 + second * 256 * 256 + first * 256 * 256 * 256;
		}
	}
	,readS32BE: function(position) {
		var fourth = this.bytes.b[position];
		var third = this.bytes.b[position + 1];
		var second = this.bytes.b[position + 2];
		var first = this.bytes.b[position + 3];
		var sign = (fourth & 128) == 0 ? 1 : -1;
		fourth &= 127;
		position += 4;
		if(sign == -1) {
			return -2147483647 + first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
		}
		return first + second * 256 + third * 256 * 256 + fourth * 256 * 256 * 256;
	}
	,readF32LE: function(position) {
		return kha_internal_BytesBlob.readF32(this.readS32LE(position));
	}
	,readF32BE: function(position) {
		return kha_internal_BytesBlob.readF32(this.readS32BE(position));
	}
	,toString: function() {
		return this.bytes.toString();
	}
	,readUtf8String: function() {
		return this.bytes.toString();
	}
	,toBytes: function() {
		return this.bytes;
	}
	,unload: function() {
		this.bytes = null;
	}
	,__class__: kha_internal_BytesBlob
	,__properties__: {get_length:"get_length"}
};
var kha_krom_Graphics = function(renderTarget) {
	this.renderTarget = renderTarget;
};
$hxClasses["kha.krom.Graphics"] = kha_krom_Graphics;
kha_krom_Graphics.__name__ = true;
kha_krom_Graphics.__interfaces__ = [kha_graphics4_Graphics];
kha_krom_Graphics.prototype = {
	renderTarget: null
	,begin: function(additionalRenderTargets) {
		Krom.begin(this.renderTarget,additionalRenderTargets);
	}
	,beginFace: function(face) {
		Krom.beginFace(this.renderTarget,face);
	}
	,beginEye: function(eye) {
	}
	,end: function() {
		Krom.end();
	}
	,flush: function() {
	}
	,vsynced: function() {
		return true;
	}
	,refreshRate: function() {
		return 60;
	}
	,clear: function(color,depth,stencil) {
		var flags = 0;
		if(color != null) {
			flags |= 1;
		}
		if(depth != null) {
			flags |= 2;
		}
		if(stencil != null) {
			flags |= 4;
		}
		Krom.clear(flags,color == null ? 0 : color,depth,stencil);
	}
	,viewport: function(x,y,width,height) {
		Krom.viewport(x,y,width,height);
	}
	,setVertexBuffer: function(vertexBuffer) {
		vertexBuffer.set(0);
	}
	,setVertexBuffers: function(vertexBuffers) {
		Krom.setVertexBuffers(vertexBuffers);
	}
	,setIndexBuffer: function(indexBuffer) {
		indexBuffer.set();
	}
	,setCubeMap: function(unit,cubeMap) {
		if(cubeMap == null) {
			return;
		}
		if(cubeMap.texture_ != null) {
			Krom.setTexture(unit,cubeMap.texture_);
		} else {
			Krom.setRenderTarget(unit,cubeMap.renderTarget_);
		}
	}
	,setCubeMapDepth: function(unit,cubeMap) {
		if(cubeMap == null) {
			return;
		}
		Krom.setTextureDepth(unit,cubeMap.renderTarget_);
	}
	,setTexture: function(unit,texture) {
		if(texture == null) {
			return;
		}
		if(texture.texture_ != null) {
			Krom.setTexture(unit,texture.texture_);
		} else {
			Krom.setRenderTarget(unit,texture.renderTarget_);
		}
	}
	,setTextureDepth: function(unit,texture) {
		if(texture == null) {
			return;
		}
		Krom.setTextureDepth(unit,texture.renderTarget_);
	}
	,setTextureArray: function(unit,texture) {
	}
	,setVideoTexture: function(unit,texture) {
	}
	,setImageTexture: function(unit,texture) {
		if(texture == null) {
			return;
		}
		Krom.setImageTexture(unit,texture.texture_);
	}
	,setTextureParameters: function(texunit,uAddressing,vAddressing,minificationFilter,magnificationFilter,mipmapFilter) {
		Krom.setTextureParameters(texunit,uAddressing,vAddressing,minificationFilter,magnificationFilter,mipmapFilter);
	}
	,setTexture3DParameters: function(texunit,uAddressing,vAddressing,wAddressing,minificationFilter,magnificationFilter,mipmapFilter) {
		Krom.setTexture3DParameters(texunit,uAddressing,vAddressing,wAddressing,minificationFilter,magnificationFilter,mipmapFilter);
	}
	,setTextureCompareMode: function(texunit,enabled) {
		Krom.setTextureCompareMode(texunit,enabled);
	}
	,setCubeMapCompareMode: function(texunit,enabled) {
		Krom.setCubeMapCompareMode(texunit,enabled);
	}
	,maxBoundTextures: function() {
		return 8;
	}
	,setPipeline: function(pipeline) {
		pipeline.set();
	}
	,setStencilReferenceValue: function(value) {
	}
	,setBool: function(location,value) {
		Krom.setBool(location,value);
	}
	,setInt: function(location,value) {
		Krom.setInt(location,value);
	}
	,setInt2: function(location,value1,value2) {
	}
	,setInt3: function(location,value1,value2,value3) {
	}
	,setInt4: function(location,value1,value2,value3,value4) {
	}
	,setInts: function(location,values) {
	}
	,setFloat: function(location,value) {
		Krom.setFloat(location,value);
	}
	,setFloat2: function(location,value1,value2) {
		Krom.setFloat2(location,value1,value2);
	}
	,setFloat3: function(location,value1,value2,value3) {
		Krom.setFloat3(location,value1,value2,value3);
	}
	,setFloat4: function(location,value1,value2,value3,value4) {
		Krom.setFloat4(location,value1,value2,value3,value4);
	}
	,setFloats: function(location,values) {
		Krom.setFloats(location,values.buffer);
	}
	,setVector2: function(location,value) {
		Krom.setFloat2(location,value.x,value.y);
	}
	,setVector3: function(location,value) {
		Krom.setFloat3(location,value.x,value.y,value.z);
	}
	,setVector4: function(location,value) {
		Krom.setFloat4(location,value.x,value.y,value.z,value.w);
	}
	,setMatrix: function(location,matrix) {
		kha_krom_Graphics.mat[0] = matrix._00;
		kha_krom_Graphics.mat[1] = matrix._01;
		kha_krom_Graphics.mat[2] = matrix._02;
		kha_krom_Graphics.mat[3] = matrix._03;
		kha_krom_Graphics.mat[4] = matrix._10;
		kha_krom_Graphics.mat[5] = matrix._11;
		kha_krom_Graphics.mat[6] = matrix._12;
		kha_krom_Graphics.mat[7] = matrix._13;
		kha_krom_Graphics.mat[8] = matrix._20;
		kha_krom_Graphics.mat[9] = matrix._21;
		kha_krom_Graphics.mat[10] = matrix._22;
		kha_krom_Graphics.mat[11] = matrix._23;
		kha_krom_Graphics.mat[12] = matrix._30;
		kha_krom_Graphics.mat[13] = matrix._31;
		kha_krom_Graphics.mat[14] = matrix._32;
		kha_krom_Graphics.mat[15] = matrix._33;
		Krom.setMatrix(location,kha_krom_Graphics.mat.buffer);
	}
	,setMatrix3: function(location,matrix) {
		kha_krom_Graphics.mat[0] = matrix._00;
		kha_krom_Graphics.mat[1] = matrix._01;
		kha_krom_Graphics.mat[2] = matrix._02;
		kha_krom_Graphics.mat[3] = matrix._10;
		kha_krom_Graphics.mat[4] = matrix._11;
		kha_krom_Graphics.mat[5] = matrix._12;
		kha_krom_Graphics.mat[6] = matrix._20;
		kha_krom_Graphics.mat[7] = matrix._21;
		kha_krom_Graphics.mat[8] = matrix._22;
		Krom.setMatrix3(location,kha_krom_Graphics.mat.buffer);
	}
	,drawIndexedVertices: function(start,count) {
		if(count == null) {
			count = -1;
		}
		if(start == null) {
			start = 0;
		}
		Krom.drawIndexedVertices(start,count);
	}
	,drawIndexedVerticesInstanced: function(instanceCount,start,count) {
		if(count == null) {
			count = -1;
		}
		if(start == null) {
			start = 0;
		}
		Krom.drawIndexedVerticesInstanced(instanceCount,start,count);
	}
	,instancedRenderingAvailable: function() {
		return true;
	}
	,scissor: function(x,y,width,height) {
		Krom.scissor(x,y,width,height);
	}
	,disableScissor: function() {
		Krom.disableScissor();
	}
	,__class__: kha_krom_Graphics
};
var kha_krom_Sound = function(bytes) {
	kha_Sound.call(this);
	this.sampleRate = 44100;
	var count = bytes.length / 4 | 0;
	var this1 = new Float32Array(count);
	this.uncompressedData = this1;
	var _g = 0;
	var _g1 = count;
	while(_g < _g1) {
		var i = _g++;
		this.uncompressedData[i] = bytes.getFloat(i * 4);
	}
	this.compressedData = null;
};
$hxClasses["kha.krom.Sound"] = kha_krom_Sound;
kha_krom_Sound.__name__ = true;
kha_krom_Sound.__super__ = kha_Sound;
kha_krom_Sound.prototype = $extend(kha_Sound.prototype,{
	uncompress: function(done) {
		done();
	}
	,unload: function() {
		kha_Sound.prototype.unload.call(this);
	}
	,__class__: kha_krom_Sound
});
var kha_math_FastMatrix3 = function(_00,_10,_20,_01,_11,_21,_02,_12,_22) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
};
$hxClasses["kha.math.FastMatrix3"] = kha_math_FastMatrix3;
kha_math_FastMatrix3.__name__ = true;
kha_math_FastMatrix3.fromMatrix3 = function(m) {
	return new kha_math_FastMatrix3(m._00,m._10,m._20,m._01,m._11,m._21,m._02,m._12,m._22);
};
kha_math_FastMatrix3.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_01: null
	,_11: null
	,_21: null
	,_02: null
	,_12: null
	,_22: null
	,__class__: kha_math_FastMatrix3
};
var kha_math_FastMatrix4 = function(_00,_10,_20,_30,_01,_11,_21,_31,_02,_12,_22,_32,_03,_13,_23,_33) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._30 = _30;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._31 = _31;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
	this._32 = _32;
	this._03 = _03;
	this._13 = _13;
	this._23 = _23;
	this._33 = _33;
};
$hxClasses["kha.math.FastMatrix4"] = kha_math_FastMatrix4;
kha_math_FastMatrix4.__name__ = true;
kha_math_FastMatrix4.fromMatrix4 = function(m) {
	return new kha_math_FastMatrix4(m._00,m._10,m._20,m._30,m._01,m._11,m._21,m._31,m._02,m._12,m._22,m._32,m._03,m._13,m._23,m._33);
};
kha_math_FastMatrix4.orthogonalProjection = function(left,right,bottom,top,zn,zf) {
	var tx = -(right + left) / (right - left);
	var ty = -(top + bottom) / (top - bottom);
	var tz = -(zf + zn) / (zf - zn);
	return new kha_math_FastMatrix4(2 / (right - left),0,0,tx,0,2.0 / (top - bottom),0,ty,0,0,-2 / (zf - zn),tz,0,0,0,1);
};
kha_math_FastMatrix4.perspectiveProjection = function(fovY,aspect,zn,zf) {
	var uh = 1.0 / Math.tan(fovY / 2);
	var uw = uh / aspect;
	return new kha_math_FastMatrix4(uw,0,0,0,0,uh,0,0,0,0,(zf + zn) / (zn - zf),2 * zf * zn / (zn - zf),0,0,-1,0);
};
kha_math_FastMatrix4.lookAt = function(eye,at,up) {
	var x = at.x - eye.x;
	var y = at.y - eye.y;
	var z = at.z - eye.z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var zaxis_x = x;
	var zaxis_y = y;
	var zaxis_z = z;
	var currentLength = Math.sqrt(zaxis_x * zaxis_x + zaxis_y * zaxis_y + zaxis_z * zaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		zaxis_x *= mul;
		zaxis_y *= mul;
		zaxis_z *= mul;
	}
	var _x = zaxis_y * up.z - zaxis_z * up.y;
	var _y = zaxis_z * up.x - zaxis_x * up.z;
	var _z = zaxis_x * up.y - zaxis_y * up.x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var xaxis_x = x;
	var xaxis_y = y;
	var xaxis_z = z;
	var currentLength = Math.sqrt(xaxis_x * xaxis_x + xaxis_y * xaxis_y + xaxis_z * xaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		xaxis_x *= mul;
		xaxis_y *= mul;
		xaxis_z *= mul;
	}
	var _x = xaxis_y * zaxis_z - xaxis_z * zaxis_y;
	var _y = xaxis_z * zaxis_x - xaxis_x * zaxis_z;
	var _z = xaxis_x * zaxis_y - xaxis_y * zaxis_x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var yaxis_x = x;
	var yaxis_y = y;
	var yaxis_z = z;
	return new kha_math_FastMatrix4(xaxis_x,xaxis_y,xaxis_z,-(xaxis_x * eye.x + xaxis_y * eye.y + xaxis_z * eye.z),yaxis_x,yaxis_y,yaxis_z,-(yaxis_x * eye.x + yaxis_y * eye.y + yaxis_z * eye.z),-zaxis_x,-zaxis_y,-zaxis_z,zaxis_x * eye.x + zaxis_y * eye.y + zaxis_z * eye.z,0,0,0,1);
};
kha_math_FastMatrix4.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_30: null
	,_01: null
	,_11: null
	,_21: null
	,_31: null
	,_02: null
	,_12: null
	,_22: null
	,_32: null
	,_03: null
	,_13: null
	,_23: null
	,_33: null
	,__class__: kha_math_FastMatrix4
};
var kha_math_FastVector2 = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
};
$hxClasses["kha.math.FastVector2"] = kha_math_FastVector2;
kha_math_FastVector2.__name__ = true;
kha_math_FastVector2.fromVector2 = function(v) {
	return new kha_math_FastVector2(v.x,v.y);
};
kha_math_FastVector2.prototype = {
	x: null
	,y: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		return length;
	}
	,toString: function() {
		return "FastVector2(" + this.x + ", " + this.y + ")";
	}
	,__class__: kha_math_FastVector2
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
var kha_math_FastVector3 = function(x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["kha.math.FastVector3"] = kha_math_FastVector3;
kha_math_FastVector3.__name__ = true;
kha_math_FastVector3.fromVector3 = function(v) {
	return new kha_math_FastVector3(v.x,v.y,v.z);
};
kha_math_FastVector3.prototype = {
	x: null
	,y: null
	,z: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		return length;
	}
	,toString: function() {
		return "FastVector3(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,__class__: kha_math_FastVector3
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
var kha_math_FastVector4 = function(x,y,z,w) {
	if(w == null) {
		w = 1;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["kha.math.FastVector4"] = kha_math_FastVector4;
kha_math_FastVector4.__name__ = true;
kha_math_FastVector4.fromVector4 = function(v) {
	return new kha_math_FastVector4(v.x,v.y,v.z,v.w);
};
kha_math_FastVector4.prototype = {
	x: null
	,y: null
	,z: null
	,w: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		this.w *= mul;
		return length;
	}
	,toString: function() {
		return "FastVector4(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
	}
	,__class__: kha_math_FastVector4
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
var kha_math_Matrix3 = function(_00,_10,_20,_01,_11,_21,_02,_12,_22) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
};
$hxClasses["kha.math.Matrix3"] = kha_math_Matrix3;
kha_math_Matrix3.__name__ = true;
kha_math_Matrix3.fromFastMatrix3 = function(m) {
	return new kha_math_Matrix3(m._00,m._10,m._20,m._01,m._11,m._21,m._02,m._12,m._22);
};
kha_math_Matrix3.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_01: null
	,_11: null
	,_21: null
	,_02: null
	,_12: null
	,_22: null
	,__class__: kha_math_Matrix3
};
var kha_math_Matrix4 = function(_00,_10,_20,_30,_01,_11,_21,_31,_02,_12,_22,_32,_03,_13,_23,_33) {
	this._00 = _00;
	this._10 = _10;
	this._20 = _20;
	this._30 = _30;
	this._01 = _01;
	this._11 = _11;
	this._21 = _21;
	this._31 = _31;
	this._02 = _02;
	this._12 = _12;
	this._22 = _22;
	this._32 = _32;
	this._03 = _03;
	this._13 = _13;
	this._23 = _23;
	this._33 = _33;
};
$hxClasses["kha.math.Matrix4"] = kha_math_Matrix4;
kha_math_Matrix4.__name__ = true;
kha_math_Matrix4.fromFastMatrix4 = function(m) {
	return new kha_math_Matrix4(m._00,m._10,m._20,m._30,m._01,m._11,m._21,m._31,m._02,m._12,m._22,m._32,m._03,m._13,m._23,m._33);
};
kha_math_Matrix4.orthogonalProjection = function(left,right,bottom,top,zn,zf) {
	var tx = -(right + left) / (right - left);
	var ty = -(top + bottom) / (top - bottom);
	var tz = -(zf + zn) / (zf - zn);
	return new kha_math_Matrix4(2 / (right - left),0,0,tx,0,2 / (top - bottom),0,ty,0,0,-2 / (zf - zn),tz,0,0,0,1);
};
kha_math_Matrix4.perspectiveProjection = function(fovY,aspect,zn,zf) {
	var uh = 1.0 / Math.tan(fovY / 2);
	var uw = uh / aspect;
	return new kha_math_Matrix4(uw,0,0,0,0,uh,0,0,0,0,(zf + zn) / (zn - zf),2 * zf * zn / (zn - zf),0,0,-1,0);
};
kha_math_Matrix4.lookAt = function(eye,at,up) {
	var x = at.x - eye.x;
	var y = at.y - eye.y;
	var z = at.z - eye.z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var zaxis_x = x;
	var zaxis_y = y;
	var zaxis_z = z;
	var currentLength = Math.sqrt(zaxis_x * zaxis_x + zaxis_y * zaxis_y + zaxis_z * zaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		zaxis_x *= mul;
		zaxis_y *= mul;
		zaxis_z *= mul;
	}
	var _x = zaxis_y * up.z - zaxis_z * up.y;
	var _y = zaxis_z * up.x - zaxis_x * up.z;
	var _z = zaxis_x * up.y - zaxis_y * up.x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var _this_x = x;
	var _this_y = y;
	var _this_z = z;
	var x = _this_x;
	var y = _this_y;
	var z = _this_z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var xaxis_x = x;
	var xaxis_y = y;
	var xaxis_z = z;
	var currentLength = Math.sqrt(xaxis_x * xaxis_x + xaxis_y * xaxis_y + xaxis_z * xaxis_z);
	if(currentLength != 0) {
		var mul = 1 / currentLength;
		xaxis_x *= mul;
		xaxis_y *= mul;
		xaxis_z *= mul;
	}
	var _x = xaxis_y * zaxis_z - xaxis_z * zaxis_y;
	var _y = xaxis_z * zaxis_x - xaxis_x * zaxis_z;
	var _z = xaxis_x * zaxis_y - xaxis_y * zaxis_x;
	var x = _x;
	var y = _y;
	var z = _z;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var yaxis_x = x;
	var yaxis_y = y;
	var yaxis_z = z;
	return new kha_math_Matrix4(xaxis_x,xaxis_y,xaxis_z,-(xaxis_x * eye.x + xaxis_y * eye.y + xaxis_z * eye.z),yaxis_x,yaxis_y,yaxis_z,-(yaxis_x * eye.x + yaxis_y * eye.y + yaxis_z * eye.z),-zaxis_x,-zaxis_y,-zaxis_z,zaxis_x * eye.x + zaxis_y * eye.y + zaxis_z * eye.z,0,0,0,1);
};
kha_math_Matrix4.prototype = {
	_00: null
	,_10: null
	,_20: null
	,_30: null
	,_01: null
	,_11: null
	,_21: null
	,_31: null
	,_02: null
	,_12: null
	,_22: null
	,_32: null
	,_03: null
	,_13: null
	,_23: null
	,_33: null
	,__class__: kha_math_Matrix4
};
var kha_math_Vector2 = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
};
$hxClasses["kha.math.Vector2"] = kha_math_Vector2;
kha_math_Vector2.__name__ = true;
kha_math_Vector2.prototype = {
	x: null
	,y: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		return length;
	}
	,__class__: kha_math_Vector2
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
var kha_math_Vector3 = function(x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["kha.math.Vector3"] = kha_math_Vector3;
kha_math_Vector3.__name__ = true;
kha_math_Vector3.prototype = {
	x: null
	,y: null
	,z: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		return length;
	}
	,__class__: kha_math_Vector3
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
var kha_math_Vector4 = function(x,y,z,w) {
	if(w == null) {
		w = 1;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["kha.math.Vector4"] = kha_math_Vector4;
kha_math_Vector4.__name__ = true;
kha_math_Vector4.prototype = {
	x: null
	,y: null
	,z: null
	,w: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	,set_length: function(length) {
		var currentLength = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if(currentLength == 0) {
			return 0;
		}
		var mul = length / currentLength;
		this.x *= mul;
		this.y *= mul;
		this.z *= mul;
		this.w *= mul;
		return length;
	}
	,__class__: kha_math_Vector4
	,__properties__: {set_length:"set_length",get_length:"get_length"}
};
var kha_netsync_Client = function() { };
$hxClasses["kha.netsync.Client"] = kha_netsync_Client;
kha_netsync_Client.__name__ = true;
kha_netsync_Client.__isInterface__ = true;
kha_netsync_Client.prototype = {
	get_id: null
	,id: null
	,send: null
	,receive: null
	,onClose: null
	,__class__: kha_netsync_Client
	,__properties__: {get_id:"get_id"}
};
var kha_netsync_ControllerBuilder = function() { };
$hxClasses["kha.netsync.ControllerBuilder"] = kha_netsync_ControllerBuilder;
kha_netsync_ControllerBuilder.__name__ = true;
var kha_netsync_Entity = function() { };
$hxClasses["kha.netsync.Entity"] = kha_netsync_Entity;
kha_netsync_Entity.__name__ = true;
kha_netsync_Entity.__isInterface__ = true;
kha_netsync_Entity.prototype = {
	_id: null
	,_size: null
	,_send: null
	,_receive: null
	,__class__: kha_netsync_Entity
};
var kha_netsync_LocalClient = function(id) {
	this.myId = id;
};
$hxClasses["kha.netsync.LocalClient"] = kha_netsync_LocalClient;
kha_netsync_LocalClient.__name__ = true;
kha_netsync_LocalClient.__interfaces__ = [kha_netsync_Client];
kha_netsync_LocalClient.prototype = {
	myId: null
	,send: function(bytes,mandatory) {
	}
	,receive: function(receiver) {
	}
	,onClose: function(close) {
	}
	,controllers: null
	,get_controllers: function() {
		return null;
	}
	,id: null
	,get_id: function() {
		return this.myId;
	}
	,__class__: kha_netsync_LocalClient
	,__properties__: {get_id:"get_id",get_controllers:"get_controllers"}
};
var kha_netsync_State = function(time,data) {
	this.time = time;
	this.data = data;
};
$hxClasses["kha.netsync.State"] = kha_netsync_State;
kha_netsync_State.__name__ = true;
kha_netsync_State.prototype = {
	time: null
	,data: null
	,__class__: kha_netsync_State
};
var kha_netsync_Session = function(maxPlayers,address,port) {
	this.ping = 1;
	this.currentPlayers = 0;
	this.controllers = new haxe_ds_IntMap();
	this.entities = new haxe_ds_IntMap();
	kha_netsync_Session.instance = this;
	this.maxPlayers = maxPlayers;
	this.address = address;
	this.port = port;
};
$hxClasses["kha.netsync.Session"] = kha_netsync_Session;
kha_netsync_Session.__name__ = true;
kha_netsync_Session.the = function() {
	return kha_netsync_Session.instance;
};
kha_netsync_Session.prototype = {
	entities: null
	,controllers: null
	,maxPlayers: null
	,currentPlayers: null
	,ping: null
	,address: null
	,port: null
	,startCallback: null
	,refusedCallback: null
	,resetCallback: null
	,localClient: null
	,network: null
	,updateTaskId: null
	,pingTaskId: null
	,me: null
	,get_me: function() {
		return this.localClient;
	}
	,addEntity: function(entity) {
		var this1 = this.entities;
		var key = entity._id();
		this1.h[key] = entity;
	}
	,addController: function(controller) {
		haxe_Log.trace("Adding controller id " + controller._id(),{ fileName : "kha/netsync/Session.hx", lineNumber : 95, className : "kha.netsync.Session", methodName : "addController"});
		controller._inputBufferIndex = 0;
		var this1 = this.controllers;
		var key = controller._id();
		this1.h[key] = controller;
	}
	,sendControllerUpdate: function(id,bytes) {
		if(this.controllers.h.hasOwnProperty(id)) {
			if(this.controllers.h[id]._inputBuffer.length < this.controllers.h[id]._inputBufferIndex + 4 + bytes.length) {
				var newBuffer = new haxe_io_Bytes(new ArrayBuffer(this.controllers.h[id]._inputBufferIndex + 4 + bytes.length));
				newBuffer.blit(0,this.controllers.h[id]._inputBuffer,0,this.controllers.h[id]._inputBufferIndex);
				this.controllers.h[id]._inputBuffer = newBuffer;
			}
			this.controllers.h[id]._inputBuffer.setInt32(this.controllers.h[id]._inputBufferIndex,bytes.length);
			this.controllers.h[id]._inputBuffer.blit(this.controllers.h[id]._inputBufferIndex + 4,bytes,0,bytes.length);
			this.controllers.h[id]._inputBufferIndex += 4 + bytes.length;
		}
	}
	,sendPing: function() {
		var bytes = new haxe_io_Bytes(new ArrayBuffer(5));
		bytes.b[0] = 4;
		bytes.setFloat(1,kha_Scheduler.realTime());
		this.sendToServer(bytes);
	}
	,sendPlayerUpdate: function() {
	}
	,receive: function(bytes,client) {
		switch(bytes.b[0]) {
		case 0:
			var index = bytes.b[1];
			this.localClient = new kha_netsync_LocalClient(index);
			kha_Scheduler.resetTime();
			this.startCallback();
			break;
		case 1:
			var time = bytes.getDouble(1);
			var offset = 9;
			var entity = this.entities.iterator();
			while(entity.hasNext()) {
				var entity1 = entity.next();
				entity1._receive(offset,bytes);
				offset += entity1._size();
			}
			kha_Scheduler.warp(time);
			break;
		case 3:
			switch(bytes.b[1]) {
			case 0:
				break;
			case 1:
				this.executeRPC(bytes);
				break;
			}
			break;
		case 4:
			var sendTime = bytes.getFloat(1);
			this.ping = kha_Scheduler.realTime() - sendTime;
			break;
		case 5:
			this.refusedCallback();
			break;
		case 6:
			this.currentPlayers = bytes.getInt32(1);
			break;
		}
	}
	,executeRPC: function(bytes) {
		var args = [];
		var syncId = bytes.getInt32(2);
		var index = 6;
		var classnamelength = bytes.getUInt16(index);
		index += 2;
		var classname = "";
		var _g = 0;
		var _g1 = classnamelength;
		while(_g < _g1) {
			var i = _g++;
			var code = bytes.b[index];
			classname += String.fromCodePoint(code);
			++index;
		}
		var methodnamelength = bytes.getUInt16(index);
		index += 2;
		var methodname = "";
		var _g = 0;
		var _g1 = methodnamelength;
		while(_g < _g1) {
			var i = _g++;
			var code = bytes.b[index];
			methodname += String.fromCodePoint(code);
			++index;
		}
		while(index < bytes.length) {
			var type = bytes.b[index];
			++index;
			switch(type) {
			case 66:
				var value = bytes.b[index] == 1;
				++index;
				haxe_Log.trace("Bool: " + (value == null ? "null" : "" + value),{ fileName : "kha/netsync/Session.hx", lineNumber : 299, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(value);
				break;
			case 70:
				var value1 = bytes.getDouble(index);
				index += 8;
				haxe_Log.trace("Float: " + value1,{ fileName : "kha/netsync/Session.hx", lineNumber : 304, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(value1);
				break;
			case 73:
				var value2 = bytes.getInt32(index);
				index += 4;
				haxe_Log.trace("Int: " + value2,{ fileName : "kha/netsync/Session.hx", lineNumber : 309, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(value2);
				break;
			case 83:
				var length = bytes.getUInt16(index);
				index += 2;
				var str = "";
				var _g = 0;
				var _g1 = length;
				while(_g < _g1) {
					var i = _g++;
					var code = bytes.b[index];
					str += String.fromCodePoint(code);
					++index;
				}
				haxe_Log.trace("String: " + str,{ fileName : "kha/netsync/Session.hx", lineNumber : 319, className : "kha.netsync.Session", methodName : "executeRPC"});
				args.push(str);
				break;
			default:
				haxe_Log.trace("Unknown argument type.",{ fileName : "kha/netsync/Session.hx", lineNumber : 322, className : "kha.netsync.Session", methodName : "executeRPC"});
			}
		}
		if(syncId == -1) {
			Reflect.field($hxClasses[classname],methodname + "_remotely").apply(null,args);
		} else {
			Reflect.field(kha_netsync_SyncBuilder.objects[syncId],methodname + "_remotely").apply(kha_netsync_SyncBuilder.objects[syncId],args);
		}
	}
	,waitForStart: function(callback,refuseCallback,errorCallback,closeCallback,resCallback) {
		var _gthis = this;
		this.startCallback = callback;
		this.refusedCallback = refuseCallback;
		this.resetCallback = resCallback;
		this.network = new kha.netsync.Network(this.address,this.port,errorCallback,function() {
			closeCallback();
			_gthis.reset();
		});
		this.network.listen(function(bytes) {
			_gthis.receive(bytes);
		});
		this.updateTaskId = kha_Scheduler.addFrameTask($bind(this,this.update),0);
		this.ping = 1;
		this.pingTaskId = kha_Scheduler.addTimeTask($bind(this,this.sendPing),0,1);
	}
	,reset: function() {
		kha_Scheduler.removeFrameTask(this.updateTaskId);
		kha_Scheduler.removeTimeTask(this.pingTaskId);
		this.currentPlayers = 0;
		this.ping = 1;
		this.controllers = new haxe_ds_IntMap();
		this.entities = new haxe_ds_IntMap();
		this.resetCallback();
	}
	,update: function() {
		var controller = this.controllers.iterator();
		while(controller.hasNext()) {
			var controller1 = controller.next();
			if(controller1._inputBufferIndex > 0) {
				var bytes = new haxe_io_Bytes(new ArrayBuffer(22 + controller1._inputBufferIndex));
				bytes.b[0] = 2;
				bytes.setInt32(1,controller1._id());
				bytes.setDouble(5,kha_Scheduler.time());
				bytes.setInt32(13,kha_System.windowWidth(0));
				bytes.setInt32(17,kha_System.windowHeight(0));
				bytes.b[21] = 0;
				bytes.blit(22,controller1._inputBuffer,0,controller1._inputBufferIndex);
				this.sendToServer(bytes);
				controller1._inputBufferIndex = 0;
			}
		}
	}
	,sendToServer: function(bytes) {
		this.network.send(bytes,false);
	}
	,__class__: kha_netsync_Session
	,__properties__: {get_me:"get_me"}
};
var kha_netsync_SyncBuilder = function() { };
$hxClasses["kha.netsync.SyncBuilder"] = kha_netsync_SyncBuilder;
kha_netsync_SyncBuilder.__name__ = true;
var kha_simd_Float32x4 = function(_0,_1,_2,_3) {
	this._0 = _0;
	this._1 = _1;
	this._2 = _2;
	this._3 = _3;
};
$hxClasses["kha.simd.Float32x4"] = kha_simd_Float32x4;
kha_simd_Float32x4.__name__ = true;
kha_simd_Float32x4.create = function() {
	return new kha_simd_Float32x4(0,0,0,0);
};
kha_simd_Float32x4.loadAllFast = function(t) {
	return new kha_simd_Float32x4(t,t,t,t);
};
kha_simd_Float32x4.load = function(a,b,c,d) {
	return new kha_simd_Float32x4(a,b,c,d);
};
kha_simd_Float32x4.loadFast = function(a,b,c,d) {
	return new kha_simd_Float32x4(a,b,c,d);
};
kha_simd_Float32x4.get = function(t,index) {
	var value = 0;
	switch(index) {
	case 0:
		value = t._0;
		break;
	case 1:
		value = t._1;
		break;
	case 2:
		value = t._2;
		break;
	case 3:
		value = t._3;
		break;
	}
	return value;
};
kha_simd_Float32x4.getFast = function(t,index) {
	var value = 0;
	switch(index) {
	case 0:
		value = t._0;
		break;
	case 1:
		value = t._1;
		break;
	case 2:
		value = t._2;
		break;
	case 3:
		value = t._3;
		break;
	}
	return value;
};
kha_simd_Float32x4.abs = function(t) {
	return new kha_simd_Float32x4(Math.abs(t._0),Math.abs(t._1),Math.abs(t._2),Math.abs(t._3));
};
kha_simd_Float32x4.add = function(a,b) {
	return new kha_simd_Float32x4(a._0 + b._0,a._1 + b._1,a._2 + b._2,a._3 + b._3);
};
kha_simd_Float32x4.div = function(a,b) {
	return new kha_simd_Float32x4(a._0 / b._0,a._1 / b._1,a._2 / b._2,a._3 / b._3);
};
kha_simd_Float32x4.mul = function(a,b) {
	return new kha_simd_Float32x4(a._0 * b._0,a._1 * b._1,a._2 * b._2,a._3 * b._3);
};
kha_simd_Float32x4.neg = function(t) {
	return new kha_simd_Float32x4(-t._0,-t._1,-t._2,-t._3);
};
kha_simd_Float32x4.reciprocalApproximation = function(t) {
	return new kha_simd_Float32x4(0,0,0,0);
};
kha_simd_Float32x4.reciprocalSqrtApproximation = function(t) {
	return new kha_simd_Float32x4(0,0,0,0);
};
kha_simd_Float32x4.sub = function(a,b) {
	return new kha_simd_Float32x4(a._0 - b._0,a._1 - b._1,a._2 - b._2,a._3 - b._3);
};
kha_simd_Float32x4.sqrt = function(t) {
	return new kha_simd_Float32x4(Math.sqrt(t._0),Math.sqrt(t._1),Math.sqrt(t._2),Math.sqrt(t._3));
};
kha_simd_Float32x4.prototype = {
	_0: null
	,_1: null
	,_2: null
	,_3: null
	,__class__: kha_simd_Float32x4
};
var zui_Ext = function() { };
$hxClasses["zui.Ext"] = zui_Ext;
zui_Ext.__name__ = true;
zui_Ext.floatInput = function(ui,handle,label,align,precision) {
	if(precision == null) {
		precision = 1000.0;
	}
	if(align == null) {
		align = 0;
	}
	if(label == null) {
		label = "";
	}
	handle.text = Std.string(Math.round(handle.value * precision) / precision);
	var text = ui.textInput(handle,label,align);
	handle.value = parseFloat(text);
	return handle.value;
};
zui_Ext.initPath = function(handle,systemId) {
	handle.text = systemId == "Windows" ? "C:\\Users" : "/";
};
zui_Ext.fileBrowser = function(ui,handle,foldersOnly) {
	if(foldersOnly == null) {
		foldersOnly = false;
	}
	var sep = "/";
	var cmd = "ls ";
	var systemId = kha_System.get_systemId();
	if(systemId == "Windows") {
		cmd = "dir /b ";
		if(foldersOnly) {
			cmd += "/ad ";
		}
		sep = "\\";
		handle.text = StringTools.replace(handle.text,"\\\\","\\");
		handle.text = StringTools.replace(handle.text,"\r","");
	}
	if(handle.text == "") {
		zui_Ext.initPath(handle,systemId);
	}
	var save = Krom.getFilesLocation() + sep + zui_Ext.dataPath + "dir.txt";
	if(handle.text != zui_Ext.lastPath) {
		Krom.sysCommand(cmd + "\"" + handle.text + "\"" + " > " + "\"" + save + "\"");
	}
	zui_Ext.lastPath = handle.text;
	var str = haxe_io_Bytes.ofData(Krom.loadBlob(save)).toString();
	var files = str.split("\n");
	var i1 = handle.text.indexOf("/");
	var i2 = handle.text.indexOf("\\");
	var nested = i1 > -1 && handle.text.length - 1 > i1 || i2 > -1 && handle.text.length - 1 > i2;
	handle.changed = false;
	if(nested && ui.button("..",0)) {
		handle.changed = ui.changed = true;
		handle.text = handle.text.substring(0,handle.text.lastIndexOf(sep));
		if(handle.text.length == 2 && handle.text.charAt(1) == ":") {
			handle.text += sep;
		}
	}
	var _g = 0;
	while(_g < files.length) {
		var f = files[_g];
		++_g;
		if(f == "" || f.charAt(0) == ".") {
			continue;
		}
		if(ui.button(f,0)) {
			handle.changed = ui.changed = true;
			if(handle.text.charAt(handle.text.length - 1) != sep) {
				handle.text += sep;
			}
			handle.text += f;
		}
	}
	return handle.text;
};
zui_Ext.inlineRadio = function(ui,handle,texts,align) {
	if(align == null) {
		align = 0;
	}
	if(!ui.isVisible(ui.t.ELEMENT_H * ui.ops.scaleFactor)) {
		ui.endElement();
		return handle.position;
	}
	var step = ui._w / texts.length;
	var hovered = -1;
	if(ui.getHover()) {
		var ix = ui.inputX - ui._x - ui._windowX | 0;
		var _g = 0;
		var _g1 = texts.length;
		while(_g < _g1) {
			var i = _g++;
			if(ix < i * step + step) {
				hovered = i;
				break;
			}
		}
	}
	if(ui.getReleased()) {
		handle.position = hovered;
		handle.changed = ui.changed = true;
	} else {
		handle.changed = false;
	}
	var _g = 0;
	var _g1 = texts.length;
	while(_g < _g1) {
		var i = _g++;
		if(handle.position == i) {
			ui.g.set_color(ui.t.ACCENT_HOVER_COL);
			if(!ui.enabled) {
				ui.fadeColor();
			}
			ui.g.fillRect(ui._x + step * i,ui._y + ui.buttonOffsetY,step,ui.t.BUTTON_H * ui.ops.scaleFactor);
		} else if(hovered == i) {
			ui.g.set_color(ui.t.ACCENT_COL);
			if(!ui.enabled) {
				ui.fadeColor();
			}
			ui.g.drawRect(ui._x + step * i,ui._y + ui.buttonOffsetY,step,ui.t.BUTTON_H * ui.ops.scaleFactor);
		}
		ui.g.set_color(ui.t.TEXT_COL);
		ui._x += step * i;
		var _w = ui._w;
		ui._w = step | 0;
		ui.drawString(ui.g,texts[i],null,0,align);
		ui._x -= step * i;
		ui._w = _w;
	}
	ui.endElement();
	return handle.position;
};
zui_Ext.colorWheel = function(ui,handle,alpha,w,colorPreview) {
	if(colorPreview == null) {
		colorPreview = true;
	}
	if(alpha == null) {
		alpha = false;
	}
	if(w == null) {
		w = ui._w;
	}
	zui_Ext.rgbToHsv(((handle.color & 16711680) >>> 16) * 0.00392156862745098,((handle.color & 65280) >>> 8) * 0.00392156862745098,(handle.color & 255) * 0.00392156862745098,zui_Ext.ar);
	var chue = zui_Ext.ar[0];
	var csat = zui_Ext.ar[1];
	var cval = zui_Ext.ar[2];
	var calpha = (handle.color >>> 24) * 0.00392156862745098;
	var px = ui._x;
	var py = ui._y;
	var scroll = ui.currentWindow != null && ui.currentWindow.scrollEnabled;
	if(!scroll) {
		w -= ui.t.SCROLL_W * ui.ops.scaleFactor | 0;
		px += (ui.t.SCROLL_W * ui.ops.scaleFactor | 0) / 2;
	}
	ui.image(ui.ops.color_wheel,kha_Color.fromFloats(cval,cval,cval));
	var ph = ui._y - py;
	var ox = px + w / 2;
	var oy = py + ph / 2;
	var cw = w * 0.7;
	var cwh = cw / 2;
	var cx = ox;
	var cy = oy + csat * cwh;
	var theta = chue * (Math.PI * 2.0);
	var cx2 = Math.cos(theta) * (cx - ox) - Math.sin(theta) * (cy - oy) + ox;
	var cy2 = Math.sin(theta) * (cx - ox) + Math.cos(theta) * (cy - oy) + oy;
	cx = cx2;
	cy = cy2;
	ui.g.set_color(-16777216);
	ui.g.fillRect(cx - 3 * ui.ops.scaleFactor,cy - 3 * ui.ops.scaleFactor,6 * ui.ops.scaleFactor,6 * ui.ops.scaleFactor);
	ui.g.set_color(-1);
	ui.g.fillRect(cx - 2 * ui.ops.scaleFactor,cy - 2 * ui.ops.scaleFactor,4 * ui.ops.scaleFactor,4 * ui.ops.scaleFactor);
	if(alpha) {
		var alphaHandle = handle.nest(1,{ value : Math.round(calpha * 100) / 100});
		calpha = ui.slider(alphaHandle,"Alpha",0.0,1.0,true);
		if(alphaHandle.changed) {
			handle.changed = ui.changed = true;
		}
	}
	var gx = ox + ui._windowX;
	var gy = oy + ui._windowY;
	if(ui.inputStarted && ui.getInputInRect(gx - cwh,gy - cwh,cw,cw)) {
		zui_Ext.wheelSelectedHande = handle;
	}
	if(ui.inputReleased) {
		zui_Ext.wheelSelectedHande = null;
	}
	if(ui.inputDown && zui_Ext.wheelSelectedHande == handle) {
		var vx = gx - ui.inputX;
		var vy = gy - ui.inputY;
		csat = Math.min(Math.sqrt(vx * vx + vy * vy),cwh) / cwh;
		var angle = Math.atan2(ui.inputX - gx,ui.inputY - gy);
		if(angle < 0) {
			angle = Math.PI + (Math.PI - Math.abs(angle));
		}
		angle = Math.PI * 2 - angle;
		chue = angle / (Math.PI * 2);
		handle.changed = ui.changed = true;
	}
	zui_Ext.hsvToRgb(chue,csat,cval,zui_Ext.ar);
	handle.color = kha_Color.fromFloats(zui_Ext.ar[0],zui_Ext.ar[1],zui_Ext.ar[2],calpha);
	if(colorPreview) {
		ui.text("",2,handle.color);
	}
	var pos = zui_Ext.inlineRadio(ui,zui_Handle.global.nest(0,null),["RGB","HSV","Hex"]);
	var h0 = handle.nest(0).nest(0);
	var h1 = handle.nest(0).nest(1);
	var h2 = handle.nest(0).nest(2);
	if(pos == 0) {
		h0.value = ((handle.color & 16711680) >>> 16) * 0.00392156862745098;
		var f = ui.slider(h0,"R",0,1,true);
		handle.color = ((handle.color >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (f * 255 | 0) << 16 | (((handle.color & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | ((handle.color & 255) * 0.00392156862745098 * 255 | 0);
		h1.value = ((handle.color & 65280) >>> 8) * 0.00392156862745098;
		var f = ui.slider(h1,"G",0,1,true);
		handle.color = ((handle.color >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (((handle.color & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (f * 255 | 0) << 8 | ((handle.color & 255) * 0.00392156862745098 * 255 | 0);
		h2.value = (handle.color & 255) * 0.00392156862745098;
		var f = ui.slider(h2,"B",0,1,true);
		handle.color = ((handle.color >>> 24) * 0.00392156862745098 * 255 | 0) << 24 | (((handle.color & 16711680) >>> 16) * 0.00392156862745098 * 255 | 0) << 16 | (((handle.color & 65280) >>> 8) * 0.00392156862745098 * 255 | 0) << 8 | (f * 255 | 0);
	} else if(pos == 1) {
		zui_Ext.rgbToHsv(((handle.color & 16711680) >>> 16) * 0.00392156862745098,((handle.color & 65280) >>> 8) * 0.00392156862745098,(handle.color & 255) * 0.00392156862745098,zui_Ext.ar);
		h0.value = zui_Ext.ar[0];
		h1.value = zui_Ext.ar[1];
		h2.value = zui_Ext.ar[2];
		var chue = ui.slider(h0,"H",0,1,true);
		var csat = ui.slider(h1,"S",0,1,true);
		var cval = ui.slider(h2,"V",0,1,true);
		zui_Ext.hsvToRgb(chue,csat,cval,zui_Ext.ar);
		handle.color = kha_Color.fromFloats(zui_Ext.ar[0],zui_Ext.ar[1],zui_Ext.ar[2]);
	} else if(pos == 2) {
		handle.text = (handle.color >>> 0).toString(16);
		handle.color = parseInt(ui.textInput(handle,"#"),16);
	}
	if(h0.changed || h1.changed || h2.changed) {
		handle.changed = ui.changed = true;
	}
	return handle.color;
};
zui_Ext.textArea = function(ui,handle,align,editable) {
	if(editable == null) {
		editable = true;
	}
	if(align == null) {
		align = 0;
	}
	handle.text = StringTools.replace(handle.text,"\t","    ");
	var lines = handle.text.split("\n");
	var selected = ui.textSelectedHandle == handle;
	var cursorStartX = ui.cursorX;
	var keyPressed = selected && ui.isKeyPressed;
	ui.highlightOnSelect = false;
	ui.tabSwitchEnabled = false;
	ui.g.set_color(ui.t.SEPARATOR_COL);
	var g = ui.g;
	var x = ui._x + ui.buttonOffsetY;
	var y = ui._y + ui.buttonOffsetY;
	var w = ui._w - ui.buttonOffsetY * 2;
	var h = lines.length * (ui.t.ELEMENT_H * ui.ops.scaleFactor) - ui.buttonOffsetY * 2;
	var strength = 0.0;
	if(strength == 0.0) {
		strength = 1;
	}
	if(!ui.enabled) {
		ui.fadeColor();
	}
	g.fillRect(x,y - 1,w,h + 1);
	var _g = 0;
	var _g1 = lines.length;
	while(_g < _g1) {
		var i = _g++;
		if(!selected && ui.getHover() || selected && i == handle.position) {
			handle.position = i;
			handle.text = lines[i];
			ui.textInput(handle,"",align,editable);
			if(keyPressed && ui.key != 13 && ui.key != 27) {
				lines[i] = ui.textSelected;
			}
		} else {
			ui.text(lines[i],align);
		}
		ui._y -= ui.t.ELEMENT_OFFSET * ui.ops.scaleFactor;
	}
	ui._y += ui.t.ELEMENT_OFFSET * ui.ops.scaleFactor;
	if(keyPressed) {
		if(ui.key == 40 && handle.position < lines.length - 1) {
			handle.position++;
		}
		if(ui.key == 38 && handle.position > 0) {
			handle.position--;
		}
		if(editable && ui.key == 13) {
			handle.position++;
			lines.splice(handle.position,0,HxOverrides.substr(lines[handle.position - 1],ui.cursorX,null));
			lines[handle.position - 1] = HxOverrides.substr(lines[handle.position - 1],0,ui.cursorX);
			ui.startTextEdit(handle);
			ui.cursorX = ui.highlightAnchor = 0;
		}
		if(editable && ui.key == 8 && cursorStartX == 0 && handle.position > 0) {
			handle.position--;
			ui.cursorX = ui.highlightAnchor = lines[handle.position].length;
			lines[handle.position] += lines[handle.position + 1];
			lines.splice(handle.position + 1,1);
		}
		ui.textSelected = lines[handle.position];
	}
	ui.highlightOnSelect = true;
	ui.tabSwitchEnabled = true;
	handle.text = lines.join("\n");
	return handle.text;
};
zui_Ext.beginMenu = function(ui) {
	zui_Ext._ELEMENT_OFFSET = ui.t.ELEMENT_OFFSET;
	zui_Ext._BUTTON_COL = ui.t.BUTTON_COL;
	ui.t.ELEMENT_OFFSET = 0;
	ui.t.BUTTON_COL = ui.t.SEPARATOR_COL;
	ui.g.set_color(ui.t.SEPARATOR_COL);
	ui.g.fillRect(0,0,ui._windowW,ui.t.BUTTON_H * ui.ops.scaleFactor * 1.1 + 2 + ui.buttonOffsetY);
};
zui_Ext.endMenu = function(ui) {
	ui.t.ELEMENT_OFFSET = zui_Ext._ELEMENT_OFFSET;
	ui.t.BUTTON_COL = zui_Ext._BUTTON_COL;
};
zui_Ext.menuButton = function(ui,text) {
	ui._w = ui.ops.font.width(ui.fontSize,text) + 25 * ui.ops.scaleFactor | 0;
	return ui.button(text);
};
zui_Ext.MENUBAR_H = function(ui) {
	return ui.t.BUTTON_H * ui.ops.scaleFactor * 1.1 + 2 + ui.buttonOffsetY;
};
zui_Ext.dist = function(x1,y1,x2,y2) {
	var vx = x1 - x2;
	var vy = y1 - y2;
	return Math.sqrt(vx * vx + vy * vy);
};
zui_Ext.fract = function(f) {
	return f - (f | 0);
};
zui_Ext.mix = function(x,y,a) {
	return x * (1.0 - a) + y * a;
};
zui_Ext.clamp = function(x,minVal,maxVal) {
	return Math.min(Math.max(x,minVal),maxVal);
};
zui_Ext.step = function(edge,x) {
	if(x < edge) {
		return 0.0;
	} else {
		return 1.0;
	}
};
zui_Ext.hsvToRgb = function(cR,cG,cB,out) {
	var f = cR + 1.0;
	var px = Math.abs((f - (f | 0)) * 6.0 - 3.0);
	var f = cR + 0.66666666666666663;
	var py = Math.abs((f - (f | 0)) * 6.0 - 3.0);
	var f = cR + 0.33333333333333331;
	var pz = Math.abs((f - (f | 0)) * 6.0 - 3.0);
	out[0] = cB * (1.0 - cG + Math.min(Math.max(px - 1.0,0.0),1.0) * cG);
	out[1] = cB * (1.0 - cG + Math.min(Math.max(py - 1.0,0.0),1.0) * cG);
	out[2] = cB * (1.0 - cG + Math.min(Math.max(pz - 1.0,0.0),1.0) * cG);
};
zui_Ext.rgbToHsv = function(cR,cG,cB,out) {
	var a = cG < cB ? 0.0 : 1.0;
	var px = cB * (1.0 - a) + cG * a;
	var a = cG < cB ? 0.0 : 1.0;
	var py = cG * (1.0 - a) + cB * a;
	var a = cG < cB ? 0.0 : 1.0;
	var pz = -1.0 * (1.0 - a) + 0.0 * a;
	var a = cG < cB ? 0.0 : 1.0;
	var pw = 0.66666666666666663 * (1.0 - a) + -0.33333333333333331 * a;
	var a = cR < px ? 0.0 : 1.0;
	var qx = px * (1.0 - a) + cR * a;
	var a = cR < px ? 0.0 : 1.0;
	var qy = py * (1.0 - a) + py * a;
	var a = cR < px ? 0.0 : 1.0;
	var qz = pw * (1.0 - a) + pz * a;
	var a = cR < px ? 0.0 : 1.0;
	var qw = cR * (1.0 - a) + px * a;
	var d = qx - Math.min(qw,qy);
	out[0] = Math.abs(qz + (qw - qy) / (6.0 * d + 1.0e-10));
	out[1] = d / (qx + 1.0e-10);
	out[2] = qx;
};
var zui_Id = function() { };
$hxClasses["zui.Id"] = zui_Id;
zui_Id.__name__ = true;
var zui_Themes = function() { };
$hxClasses["zui.Themes"] = zui_Themes;
zui_Themes.__name__ = true;
var zui_Zui = function(ops) {
	this.checkSelectImage = null;
	this.elementsBaked = false;
	this.scissor = false;
	this.sticky = false;
	this.tabVertical = false;
	this.tabScroll = 0.0;
	this.tabHandle = null;
	this.tabColors = null;
	this.tabNames = null;
	this.tooltipTime = 0.0;
	this.tooltipWait = false;
	this.tooltipShown = false;
	this.tooltipY = 0.0;
	this.tooltipX = 0.0;
	this.tooltipInvertY = false;
	this.tooltipImgMaxWidth = null;
	this.tooltipImg = null;
	this.tooltipText = "";
	this.comboToSubmit = 0;
	this.submitComboHandle = null;
	this.comboSelectedWindow = null;
	this.comboSelectedHandle = null;
	this.tabPressedHandle = null;
	this.tabPressed = false;
	this.textToSubmit = "";
	this.submitTextHandle = null;
	this.textSelectedHandle = null;
	this.restoreY = -1.0;
	this.restoreX = -1.0;
	this.windowHeaderH = 0.0;
	this.windowHeaderW = 0.0;
	this.dragHandle = null;
	this.scrollHandle = null;
	this.windowEnded = true;
	this._windowY = 0.0;
	this._windowX = 0.0;
	this.imageScrollAlign = true;
	this.scrollAlign = 0.0;
	this.curRatio = -1;
	this.highlightAnchor = 0;
	this.cursorX = 0;
	this.inputStartedTime = 0.0;
	this.key = null;
	this.isTabDown = false;
	this.isReturnDown = false;
	this.isEscapeDown = false;
	this.isDeleteDown = false;
	this.isBackspaceDown = false;
	this.isADown = false;
	this.isAltDown = false;
	this.isCtrlDown = false;
	this.isShiftDown = false;
	this.isKeyDown = false;
	this.isKeyPressed = false;
	this.inputWheelDelta = 0;
	this.inputEnabled = true;
	this.inputRegistered = false;
	this.sliderTooltipW = 0.0;
	this.sliderTooltipY = 0.0;
	this.sliderTooltipX = 0.0;
	this.sliderTooltip = false;
	this.touchHold = false;
	this.highlightFullRow = false;
	this.windowBorderRight = 0;
	this.windowBorderLeft = 0;
	this.windowBorderBottom = 0;
	this.windowBorderTop = 0;
	this.tabSwitchEnabled = true;
	this.highlightOnSelect = true;
	this.alwaysRedraw = false;
	this.scrollEnabled = true;
	this.imageInvertY = false;
	this.changed = false;
	this.isReleased = false;
	this.isHovered = false;
	this.isPushed = false;
	this.isStarted = false;
	this.enabled = true;
	this.isTyping = false;
	this.isScrolling = false;
	if(ops.theme == null) {
		ops.theme = zui_Themes.dark;
	}
	this.t = ops.theme;
	if(ops.khaWindowId == null) {
		ops.khaWindowId = 0;
	}
	if(ops.scaleFactor == null) {
		ops.scaleFactor = 1.0;
	}
	if(ops.autoNotifyInput == null) {
		ops.autoNotifyInput = true;
	}
	this.ops = ops;
	this.setScale(ops.scaleFactor);
	if(ops.autoNotifyInput) {
		this.registerInput();
	}
	if(zui_Zui.copyReceiver == null) {
		zui_Zui.copyReceiver = this;
		kha_System.notifyOnCutCopyPaste($bind(this,this.onCut),$bind(this,this.onCopy),$bind(this,this.onPaste));
		kha_System.notifyOnFrames(function(frames) {
			if((zui_Zui.isCopy || zui_Zui.isPaste) && ++zui_Zui.copyFrame > 1) {
				zui_Zui.isCopy = zui_Zui.isCut = zui_Zui.isPaste = false;
			} else if(zui_Zui.copyFrame > 1 && ++zui_Zui.copyFrame > 2) {
				zui_Zui.copyFrame = 0;
				zui_Zui.textToPaste = "";
			}
		});
	}
	var rtTextVS = kha_graphics4_Graphics2.createTextVertexStructure();
	this.rtTextPipeline = kha_graphics4_Graphics2.createTextPipeline(rtTextVS);
	this.rtTextPipeline.alphaBlendSource = 1;
	this.rtTextPipeline.compile();
};
$hxClasses["zui.Zui"] = zui_Zui;
zui_Zui.__name__ = true;
zui_Zui.prototype = {
	isScrolling: null
	,isTyping: null
	,enabled: null
	,isStarted: null
	,isPushed: null
	,isHovered: null
	,isReleased: null
	,changed: null
	,imageInvertY: null
	,scrollEnabled: null
	,alwaysRedraw: null
	,highlightOnSelect: null
	,tabSwitchEnabled: null
	,windowBorderTop: null
	,windowBorderBottom: null
	,windowBorderLeft: null
	,windowBorderRight: null
	,highlightFullRow: null
	,touchHold: null
	,sliderTooltip: null
	,sliderTooltipX: null
	,sliderTooltipY: null
	,sliderTooltipW: null
	,inputRegistered: null
	,inputEnabled: null
	,inputX: null
	,inputY: null
	,inputStartedX: null
	,inputStartedY: null
	,inputDX: null
	,inputDY: null
	,inputWheelDelta: null
	,inputStarted: null
	,inputStartedR: null
	,inputReleased: null
	,inputReleasedR: null
	,inputDown: null
	,inputDownR: null
	,isKeyPressed: null
	,isKeyDown: null
	,isShiftDown: null
	,isCtrlDown: null
	,isAltDown: null
	,isADown: null
	,isBackspaceDown: null
	,isDeleteDown: null
	,isEscapeDown: null
	,isReturnDown: null
	,isTabDown: null
	,key: null
	,char: null
	,inputStartedTime: null
	,cursorX: null
	,highlightAnchor: null
	,ratios: null
	,curRatio: null
	,xBeforeSplit: null
	,wBeforeSplit: null
	,g: null
	,t: null
	,ops: null
	,globalG: null
	,rtTextPipeline: null
	,fontSize: null
	,fontOffsetY: null
	,arrowOffsetX: null
	,arrowOffsetY: null
	,titleOffsetX: null
	,buttonOffsetY: null
	,checkOffsetX: null
	,checkOffsetY: null
	,checkSelectOffsetX: null
	,checkSelectOffsetY: null
	,radioOffsetX: null
	,radioOffsetY: null
	,radioSelectOffsetX: null
	,radioSelectOffsetY: null
	,scrollAlign: null
	,imageScrollAlign: null
	,_x: null
	,_y: null
	,_w: null
	,_h: null
	,_windowX: null
	,_windowY: null
	,_windowW: null
	,_windowH: null
	,currentWindow: null
	,windowEnded: null
	,scrollHandle: null
	,dragHandle: null
	,windowHeaderW: null
	,windowHeaderH: null
	,restoreX: null
	,restoreY: null
	,textSelectedHandle: null
	,textSelected: null
	,submitTextHandle: null
	,textToSubmit: null
	,tabPressed: null
	,tabPressedHandle: null
	,comboSelectedHandle: null
	,comboSelectedWindow: null
	,comboSelectedAlign: null
	,comboSelectedTexts: null
	,comboSelectedLabel: null
	,comboSelectedX: null
	,comboSelectedY: null
	,comboSelectedW: null
	,submitComboHandle: null
	,comboToSubmit: null
	,tooltipText: null
	,tooltipImg: null
	,tooltipImgMaxWidth: null
	,tooltipInvertY: null
	,tooltipX: null
	,tooltipY: null
	,tooltipShown: null
	,tooltipWait: null
	,tooltipTime: null
	,tabNames: null
	,tabColors: null
	,tabHandle: null
	,tabScroll: null
	,tabVertical: null
	,sticky: null
	,scissor: null
	,elementsBaked: null
	,checkSelectImage: null
	,setScale: function(factor) {
		this.ops.scaleFactor = factor;
		this.fontSize = this.t.FONT_SIZE * this.ops.scaleFactor | 0;
		var fontHeight = this.ops.font.height(this.fontSize);
		this.fontOffsetY = (this.t.ELEMENT_H * this.ops.scaleFactor - fontHeight) / 2;
		this.arrowOffsetY = (this.t.ELEMENT_H * this.ops.scaleFactor - this.t.ARROW_SIZE * this.ops.scaleFactor) / 2;
		this.arrowOffsetX = this.arrowOffsetY;
		this.titleOffsetX = (this.arrowOffsetX * 2 + this.t.ARROW_SIZE * this.ops.scaleFactor) / this.ops.scaleFactor;
		this.buttonOffsetY = (this.t.ELEMENT_H * this.ops.scaleFactor - this.t.BUTTON_H * this.ops.scaleFactor) / 2;
		this.checkOffsetY = (this.t.ELEMENT_H * this.ops.scaleFactor - this.t.CHECK_SIZE * this.ops.scaleFactor) / 2;
		this.checkOffsetX = this.checkOffsetY;
		this.checkSelectOffsetY = (this.t.CHECK_SIZE * this.ops.scaleFactor - this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor) / 2;
		this.checkSelectOffsetX = this.checkSelectOffsetY;
		this.radioOffsetY = (this.t.ELEMENT_H * this.ops.scaleFactor - this.t.CHECK_SIZE * this.ops.scaleFactor) / 2;
		this.radioOffsetX = this.radioOffsetY;
		this.radioSelectOffsetY = (this.t.CHECK_SIZE * this.ops.scaleFactor - this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor) / 2;
		this.radioSelectOffsetX = this.radioSelectOffsetY;
		this.elementsBaked = false;
	}
	,bakeElements: function() {
		if(this.checkSelectImage != null) {
			this.checkSelectImage.unload();
		}
		this.checkSelectImage = kha_Image.createRenderTarget(this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor | 0,this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor | 0,null,0,1,this.ops.khaWindowId);
		var g = this.checkSelectImage.get_g2();
		g.begin(true,0);
		g.set_color(this.t.ACCENT_SELECT_COL);
		g.drawLine(0,0,this.checkSelectImage.get_width(),this.checkSelectImage.get_height(),2 * this.ops.scaleFactor);
		g.drawLine(this.checkSelectImage.get_width(),0,0,this.checkSelectImage.get_height(),2 * this.ops.scaleFactor);
		g.end();
		this.elementsBaked = true;
	}
	,remove: function() {
		if(this.ops.autoNotifyInput) {
			this.unregisterInput();
		}
	}
	,registerInput: function() {
		var _gthis = this;
		kha_input_Mouse.get().notifyWindowed(this.ops.khaWindowId,$bind(this,this.onMouseDown),$bind(this,this.onMouseUp),$bind(this,this.onMouseMove),$bind(this,this.onMouseWheel));
		kha_input_Keyboard.get().notify($bind(this,this.onKeyDown),$bind(this,this.onKeyUp),$bind(this,this.onKeyPress));
		kha_System.notifyOnApplicationState(function() {
			_gthis.inputDX = _gthis.inputDY = 0;
		},null,null,null,null);
		this.inputRegistered = true;
	}
	,unregisterInput: function() {
		kha_input_Mouse.get().removeWindowed(this.ops.khaWindowId,$bind(this,this.onMouseDown),$bind(this,this.onMouseUp),$bind(this,this.onMouseMove),$bind(this,this.onMouseWheel));
		kha_input_Keyboard.get().remove($bind(this,this.onKeyDown),$bind(this,this.onKeyUp),$bind(this,this.onKeyPress));
		this.endInput();
		this.isShiftDown = this.isCtrlDown = this.isAltDown = false;
		this.inputX = this.inputY = 0;
		this.inputRegistered = false;
	}
	,begin: function(g) {
		if(!this.elementsBaked) {
			this.bakeElements();
		}
		this.changed = false;
		this.globalG = g;
		zui_Zui.current = this;
		this._x = 0;
		this._y = 0;
		this._w = 0;
		this._h = 0;
	}
	,end: function(last) {
		if(last == null) {
			last = true;
		}
		if(!this.windowEnded) {
			this.endWindow();
		}
		this.drawCombo();
		this.drawTooltip(true);
		this.tabPressedHandle = null;
		if(last) {
			this.endInput();
		}
	}
	,beginRegion: function(g,x,y,w) {
		if(!this.elementsBaked) {
			g.end();
			this.bakeElements();
			g.begin(false);
		}
		this.changed = false;
		this.globalG = g;
		this.g = g;
		this.currentWindow = null;
		this.tooltipText = "";
		this.tooltipImg = null;
		this._windowX = 0;
		this._windowY = 0;
		this._windowW = w;
		this._x = x;
		this._y = y;
		this._w = w;
	}
	,endRegion: function(last) {
		if(last == null) {
			last = true;
		}
		this.drawTooltip(false);
		this.tabPressedHandle = null;
		if(last) {
			this.endInput();
		}
	}
	,beginSticky: function() {
		this.sticky = true;
		this._y -= this.currentWindow.scrollOffset;
	}
	,endSticky: function() {
		this.sticky = false;
		this.scissor = true;
		this.g.scissor(0,this._y | 0,this._windowW | 0,this._windowH - this._y | 0);
		this.windowHeaderH += this._y - this.windowHeaderH;
		this._y += this.currentWindow.scrollOffset;
	}
	,endInput: function() {
		this.isKeyPressed = false;
		this.inputStarted = false;
		this.inputStartedR = false;
		this.inputReleased = false;
		this.inputReleasedR = false;
		this.inputDX = 0;
		this.inputDY = 0;
		this.inputWheelDelta = 0;
		if(zui_Zui.keyRepeat && this.isKeyDown && kha_Scheduler.time() - zui_Zui.keyRepeatTime > 0.05) {
			if(this.key == 8 || this.key == 46 || this.key == 37 || this.key == 39 || this.key == 38 || this.key == 40) {
				zui_Zui.keyRepeatTime = kha_Scheduler.time();
				this.isKeyPressed = true;
			}
		}
		if(zui_Zui.touchControls && this.inputDown && this.inputX == this.inputStartedX && this.inputY == this.inputStartedY && this.inputStartedTime > 0 && kha_Scheduler.time() - this.inputStartedTime > 0.5) {
			this.touchHold = true;
			this.inputStartedTime = 0;
		}
	}
	,inputChanged: function() {
		if(!(this.inputDX != 0 || this.inputDY != 0 || this.inputWheelDelta != 0 || this.inputStarted || this.inputStartedR || this.inputReleased || this.inputReleasedR || this.inputDown || this.inputDownR)) {
			return this.isKeyPressed;
		} else {
			return true;
		}
	}
	,windowDirty: function(handle,x,y,w,h) {
		var wx = x + handle.dragX;
		var wy = y + handle.dragY;
		var inputChanged = this.getInputInRect(wx,wy,w,h) && this.inputChanged();
		if(!(this.alwaysRedraw || this.isScrolling || this.isTyping)) {
			return inputChanged;
		} else {
			return true;
		}
	}
	,window: function(handle,x,y,w,h,drag) {
		if(drag == null) {
			drag = false;
		}
		if(handle.texture == null || w != handle.texture.get_width() || h != handle.texture.get_height()) {
			this.resize(handle,w,h,this.ops.khaWindowId);
		}
		if(!this.windowEnded) {
			this.endWindow();
		}
		this.windowEnded = false;
		this.g = handle.texture.get_g2();
		this.currentWindow = handle;
		this._windowX = x + handle.dragX;
		this._windowY = y + handle.dragY;
		this._windowW = w;
		this._windowH = h;
		this.windowHeaderW = 0;
		this.windowHeaderH = 0;
		if(this.windowDirty(handle,x,y,w,h)) {
			handle.redraws = 2;
		}
		if(zui_Zui.onBorderHover != null) {
			if(this.getInputInRect(this._windowX - 4,this._windowY,8,this._windowH)) {
				zui_Zui.onBorderHover(handle,0);
			} else if(this.getInputInRect(this._windowX + this._windowW - 4,this._windowY,8,this._windowH)) {
				zui_Zui.onBorderHover(handle,1);
			} else if(this.getInputInRect(this._windowX,this._windowY - 4,this._windowW,8)) {
				zui_Zui.onBorderHover(handle,2);
			} else if(this.getInputInRect(this._windowX,this._windowY + this._windowH - 4,this._windowW,8)) {
				zui_Zui.onBorderHover(handle,3);
			}
		}
		if(handle.redraws <= 0) {
			return false;
		}
		this._x = 0;
		this._y = handle.scrollOffset;
		if(handle.layout == 1) {
			w = this.t.ELEMENT_W * this.ops.scaleFactor | 0;
		}
		this._w = !handle.scrollEnabled ? w : w - (this.t.SCROLL_W * this.ops.scaleFactor | 0);
		this._h = h;
		this.tooltipText = "";
		this.tooltipImg = null;
		this.tabNames = null;
		if(this.t.FILL_WINDOW_BG) {
			this.g.begin(true,this.t.WINDOW_BG_COL);
		} else {
			this.g.begin(true,0);
			this.g.set_color(this.t.WINDOW_BG_COL);
			this.g.fillRect(this._x,this._y - handle.scrollOffset,handle.lastMaxX,handle.lastMaxY);
		}
		handle.dragEnabled = drag;
		if(drag) {
			if(this.inputStarted && this.getInputInRect(this._windowX,this._windowY,this._windowW,15 * this.ops.scaleFactor | 0)) {
				this.dragHandle = handle;
			} else if(this.inputReleased) {
				this.dragHandle = null;
			}
			if(handle == this.dragHandle) {
				handle.redraws = 2;
				handle.dragX += this.inputDX | 0;
				handle.dragY += this.inputDY | 0;
			}
			this._y += 15 * this.ops.scaleFactor | 0;
			this.windowHeaderH += 15 * this.ops.scaleFactor | 0;
		}
		return true;
	}
	,endWindow: function(bindGlobalG) {
		if(bindGlobalG == null) {
			bindGlobalG = true;
		}
		var handle = this.currentWindow;
		if(handle == null) {
			return;
		}
		if(handle.redraws > 0 || this.isScrolling || this.isTyping) {
			if(this.scissor) {
				this.scissor = false;
				this.g.disableScissor();
			}
			if(this.tabNames != null) {
				this.drawTabs();
			}
			if(handle.dragEnabled) {
				this.g.set_color(this.t.SEPARATOR_COL);
				this.g.fillRect(0,0,this._windowW,15 * this.ops.scaleFactor | 0);
			}
			var wh = this._windowH - this.windowHeaderH;
			var fullHeight = this._y - handle.scrollOffset - this.windowHeaderH;
			if(fullHeight < wh || handle.layout == 1 || !this.scrollEnabled) {
				handle.scrollEnabled = false;
				handle.scrollOffset = 0;
			} else {
				handle.scrollEnabled = true;
				if(this.tabScroll < 0) {
					handle.scrollOffset = this.tabScroll;
					this.tabScroll = 0;
				}
				var wy = this._windowY + this.windowHeaderH;
				var amountToScroll = fullHeight - wh;
				var amountScrolled = -handle.scrollOffset;
				var ratio = amountScrolled / amountToScroll;
				var barH = wh * Math.abs(wh / fullHeight);
				barH = Math.max(barH,this.t.ELEMENT_H * this.ops.scaleFactor);
				var totalScrollableArea = wh - barH;
				var e = amountToScroll / totalScrollableArea;
				var barY = totalScrollableArea * ratio + this.windowHeaderH;
				var barFocus = this.getInputInRect(this._windowX + this._windowW - (this.t.SCROLL_W * this.ops.scaleFactor | 0),barY + this._windowY,this.t.SCROLL_W * this.ops.scaleFactor | 0,barH);
				if(this.inputStarted && barFocus) {
					this.scrollHandle = handle;
					this.isScrolling = true;
				}
				var scrollDelta = this.inputWheelDelta;
				if(zui_Zui.touchControls && this.inputDown && this.inputDY != 0) {
					this.isScrolling = true;
					scrollDelta = -this.inputDY / 20;
				}
				if(handle == this.scrollHandle) {
					this.scroll(this.inputDY * e,fullHeight);
				} else if(scrollDelta != 0 && this.comboSelectedHandle == null && this.getInputInRect(this._windowX,wy,this._windowW,wh)) {
					this.scroll(scrollDelta * (this.t.ELEMENT_H * this.ops.scaleFactor),fullHeight);
				}
				if(handle.scrollOffset > 0) {
					handle.scrollOffset = 0;
				} else if(fullHeight + handle.scrollOffset < wh) {
					handle.scrollOffset = wh - fullHeight;
				}
				this.g.set_color(this.t.WINDOW_BG_COL);
				this.g.fillRect(this._windowW - (this.t.SCROLL_W * this.ops.scaleFactor | 0),wy,this.t.SCROLL_W * this.ops.scaleFactor | 0,wh);
				this.g.set_color(this.t.ACCENT_COL);
				var scrollbarFocus = this.getInputInRect(this._windowX + this._windowW - (this.t.SCROLL_W * this.ops.scaleFactor | 0),wy,this.t.SCROLL_W * this.ops.scaleFactor | 0,wh);
				var barW = scrollbarFocus || handle == this.scrollHandle ? this.t.SCROLL_W * this.ops.scaleFactor | 0 : (this.t.SCROLL_W * this.ops.scaleFactor | 0) / 3;
				this.g.fillRect(this._windowW - barW - this.scrollAlign,barY,barW,barH);
			}
			handle.lastMaxX = this._x;
			handle.lastMaxY = this._y;
			if(handle.layout == 0) {
				handle.lastMaxX += this._windowW;
			} else {
				handle.lastMaxY += this._windowH;
			}
			handle.redraws--;
			this.g.end();
		}
		this.windowEnded = true;
		if(zui_Zui.alwaysRedrawWindow || handle.redraws > -4) {
			if(bindGlobalG) {
				this.globalG.begin(false);
			}
			this.globalG.set_color(this.t.WINDOW_TINT_COL);
			this.globalG.drawImage(handle.texture,this._windowX,this._windowY);
			if(bindGlobalG) {
				this.globalG.end();
			}
			if(handle.redraws <= 0) {
				handle.redraws--;
			}
		}
	}
	,scroll: function(delta,fullHeight) {
		this.currentWindow.scrollOffset -= delta;
	}
	,tab: function(handle,text,vertical,color) {
		if(color == null) {
			color = -1;
		}
		if(vertical == null) {
			vertical = false;
		}
		if(this.tabNames == null) {
			this.tabNames = [];
			this.tabColors = [];
			this.tabHandle = handle;
			this.tabVertical = vertical;
			this._w -= this.tabVertical ? this.t.ELEMENT_OFFSET * this.ops.scaleFactor + this.t.ELEMENT_W * this.ops.scaleFactor - this.ops.scaleFactor | 0 : 0;
			if(vertical) {
				this.windowHeaderW += this.t.ELEMENT_W * this.ops.scaleFactor;
			} else {
				this.windowHeaderH += this.t.BUTTON_H * this.ops.scaleFactor + this.buttonOffsetY + this.t.ELEMENT_OFFSET * this.ops.scaleFactor;
			}
			this.restoreX = this.inputX;
			this.restoreY = this.inputY;
			if(!vertical && this.getInputInRect(this._windowX,this._windowY,this._windowW,this.windowHeaderH)) {
				this.inputX = this.inputY = -1;
			}
			if(vertical) {
				this._x += this.windowHeaderW + 6;
				this._w -= 6;
			} else {
				this._y += this.windowHeaderH + 3;
			}
		}
		this.tabNames.push(text);
		this.tabColors.push(color);
		return handle.position == this.tabNames.length - 1;
	}
	,drawTabs: function() {
		this.inputX = this.restoreX;
		this.inputY = this.restoreY;
		if(this.currentWindow == null) {
			return;
		}
		var tabX = 0.0;
		var tabY = 0.0;
		var tabHMin = this.t.BUTTON_H * this.ops.scaleFactor * 1.1 | 0;
		var headerH = this.currentWindow.dragEnabled ? 15 * this.ops.scaleFactor | 0 : 0;
		var tabH = this.t.FULL_TABS && this.tabVertical ? (this._windowH - headerH) / this.tabNames.length | 0 : tabHMin;
		var origy = this._y;
		this._y = headerH;
		this.tabHandle.changed = false;
		if(this.isCtrlDown && this.isTabDown) {
			this.tabHandle.position++;
			if(this.tabHandle.position >= this.tabNames.length) {
				this.tabHandle.position = 0;
			}
			this.tabHandle.changed = true;
			this.isTabDown = false;
		}
		if(this.tabHandle.position >= this.tabNames.length) {
			this.tabHandle.position = this.tabNames.length - 1;
		}
		this.g.set_color(this.t.SEPARATOR_COL);
		if(this.tabVertical) {
			this.g.fillRect(0,this._y,this.t.ELEMENT_W * this.ops.scaleFactor,this._windowH);
		} else {
			this.g.fillRect(0,this._y,this._windowW,this.buttonOffsetY + tabH + 2);
		}
		this.g.set_color(this.t.ACCENT_COL);
		if(this.tabVertical) {
			this.g.fillRect(this.t.ELEMENT_W * this.ops.scaleFactor,this._y,1,this._windowH);
		} else {
			this.g.fillRect(this.buttonOffsetY,this._y + this.buttonOffsetY + tabH + 2,this._windowW - this.buttonOffsetY * 2,1);
		}
		var basey = this.tabVertical ? this._y : this._y + 2;
		var _g = 0;
		var _g1 = this.tabNames.length;
		while(_g < _g1) {
			var i = _g++;
			this._x = tabX;
			this._y = basey + tabY;
			this._w = this.tabVertical ? this.t.ELEMENT_W * this.ops.scaleFactor - this.ops.scaleFactor | 0 : this.t.FULL_TABS ? this._windowW / this.tabNames.length | 0 : this.ops.font.width(this.fontSize,this.tabNames[i]) + this.buttonOffsetY * 2 + 18 * this.ops.scaleFactor | 0;
			var released = this.getReleased(tabH);
			var pushed = this.getPushed(tabH);
			var hover = this.getHover(tabH);
			if(released) {
				var h = this.tabHandle.nest(this.tabHandle.position);
				h.scrollOffset = this.currentWindow.scrollOffset;
				h = this.tabHandle.nest(i);
				this.tabScroll = h.scrollOffset;
				this.tabHandle.position = i;
				this.currentWindow.redraws = 3;
				this.tabHandle.changed = true;
			}
			var selected = this.tabHandle.position == i;
			this.g.set_color(pushed || hover ? this.t.BUTTON_HOVER_COL : this.tabColors[i] != -1 ? this.tabColors[i] : selected ? this.t.WINDOW_BG_COL : this.t.SEPARATOR_COL);
			if(this.tabVertical) {
				tabY += tabH + 1;
			} else {
				tabX += this._w + 1;
			}
			var g = this.g;
			var x = this._x + this.buttonOffsetY;
			var y = this._y + this.buttonOffsetY;
			var w = this._w;
			var strength = 0.0;
			if(strength == 0.0) {
				strength = 1;
			}
			if(!this.enabled) {
				this.fadeColor();
			}
			g.fillRect(x,y - 1,w,tabH + 1);
			this.g.set_color(selected ? this.t.BUTTON_TEXT_COL : this.t.LABEL_COL);
			this.drawString(this.g,this.tabNames[i],null,(tabH - tabHMin) / 2,this.t.FULL_TABS ? 1 : 0);
			if(selected && !this.tabVertical) {
				this.g.set_color(this.t.WINDOW_BG_COL);
				this.g.fillRect(this._x + this.buttonOffsetY + 1,this._y + this.buttonOffsetY + tabH,this._w - 1,1);
				this.g.set_color(this.t.HIGHLIGHT_COL);
				this.g.fillRect(this._x + this.buttonOffsetY + 1,this._y + this.buttonOffsetY,this._w - 1,2);
			}
		}
		this._x = 0;
		this._y = origy;
		this._w = (!this.currentWindow.scrollEnabled ? this._windowW : this._windowW - (this.t.SCROLL_W * this.ops.scaleFactor | 0)) | 0;
	}
	,panel: function(handle,text,isTree,filled,pack) {
		if(pack == null) {
			pack = true;
		}
		if(filled == null) {
			filled = true;
		}
		if(isTree == null) {
			isTree = false;
		}
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this.endElement();
			return handle.selected;
		}
		if(this.getReleased()) {
			handle.selected = !handle.selected;
			handle.changed = this.changed = true;
		}
		if(filled) {
			this.g.set_color(this.t.PANEL_BG_COL);
			var g = this.g;
			var x = this._x;
			var y = this._y;
			var w = this._w;
			var h = this.t.ELEMENT_H * this.ops.scaleFactor;
			var strength = 0.0;
			if(strength == 0.0) {
				strength = 1;
			}
			if(!this.enabled) {
				this.fadeColor();
			}
			g.fillRect(x,y - 1,w,h + 1);
		}
		if(isTree) {
			this.drawTree(handle.selected);
		} else {
			this.drawArrow(handle.selected);
		}
		this.g.set_color(this.t.LABEL_COL);
		this.g.set_opacity(1.0);
		this.drawString(this.g,text,this.titleOffsetX,0);
		this.endElement();
		if(pack && !handle.selected) {
			this._y -= this.t.ELEMENT_OFFSET * this.ops.scaleFactor;
		}
		return handle.selected;
	}
	,image: function(image,tint,h,sx,sy,sw,sh) {
		if(sh == null) {
			sh = 0;
		}
		if(sw == null) {
			sw = 0;
		}
		if(sy == null) {
			sy = 0;
		}
		if(sx == null) {
			sx = 0;
		}
		if(tint == null) {
			tint = -1;
		}
		var iw = (sw > 0 ? sw : image.get_width()) * this.ops.scaleFactor;
		var ih = (sh > 0 ? sh : image.get_height()) * this.ops.scaleFactor;
		var w = Math.min(iw,this._w);
		var x = this._x;
		var scroll = this.currentWindow != null && this.currentWindow.scrollEnabled;
		var r;
		if(this.curRatio == -1) {
			r = 1.0;
		} else {
			var ratio = this.ratios[this.curRatio];
			r = ratio < 0 ? -ratio : ratio;
		}
		if(this.imageScrollAlign) {
			w = Math.min(iw,this._w - this.buttonOffsetY * 2);
			x += this.buttonOffsetY;
			if(!scroll) {
				w -= (this.t.SCROLL_W * this.ops.scaleFactor | 0) * r;
				x += (this.t.SCROLL_W * this.ops.scaleFactor | 0) * r / 2;
			}
		} else if(scroll) {
			w += (this.t.SCROLL_W * this.ops.scaleFactor | 0) * r;
		}
		var ratio = h == null ? w / iw : h / ih;
		if(h == null) {
			h = ih * ratio;
		} else {
			w = iw * ratio;
		}
		if(!this.isVisible(h)) {
			this.endElement(h);
			return 0;
		}
		var started = this.getStarted(h);
		var down = this.getPushed(h);
		var released = this.getReleased(h);
		var hover = this.getHover(h);
		if(this.curRatio == -1 && (started || down || released || hover)) {
			if(this.inputX < this._windowX + this._x || this.inputX > this._windowX + this._x + w) {
				hover = false;
				released = hover;
				down = released;
				started = down;
			}
		}
		this.g.set_color(tint);
		if(!this.enabled) {
			this.fadeColor();
		}
		var h_float = h;
		if(sw > 0) {
			if(this.imageInvertY) {
				this.g.drawScaledSubImage(image,sx,sy,sw,sh,x,this._y + h_float,w,-h_float);
			} else {
				this.g.drawScaledSubImage(image,sx,sy,sw,sh,x,this._y,w,h_float);
			}
		} else if(this.imageInvertY) {
			this.g.drawScaledImage(image,x,this._y + h_float,w,-h_float);
		} else {
			this.g.drawScaledImage(image,x,this._y,w,h_float);
		}
		this.endElement(h);
		if(started) {
			return 1;
		} else if(released) {
			return 3;
		} else if(down) {
			return 2;
		} else if(hover) {
			return 4;
		} else {
			return 0;
		}
	}
	,text: function(text,align,bg) {
		if(bg == null) {
			bg = 0;
		}
		if(align == null) {
			align = 0;
		}
		if(text.indexOf("\n") >= 0) {
			var align1 = align;
			var bg1 = bg;
			if(bg1 == null) {
				bg1 = 0;
			}
			if(align1 == null) {
				align1 = 0;
			}
			var _g = 0;
			var _g1 = text.split("\n");
			while(_g < _g1.length) {
				var line = _g1[_g];
				++_g;
				this.text(line,align1,bg1);
			}
			return 0;
		}
		var h = Math.max(this.t.ELEMENT_H * this.ops.scaleFactor,this.ops.font.height(this.fontSize));
		if(!this.isVisible(h)) {
			this.endElement(h + this.t.ELEMENT_OFFSET * this.ops.scaleFactor);
			return 0;
		}
		var started = this.getStarted(h);
		var down = this.getPushed(h);
		var released = this.getReleased(h);
		var hover = this.getHover(h);
		if(bg != 0) {
			this.g.set_color(bg);
			this.g.fillRect(this._x + this.buttonOffsetY,this._y + this.buttonOffsetY,this._w - this.buttonOffsetY * 2,this.t.BUTTON_H * this.ops.scaleFactor);
		}
		this.g.set_color(this.t.TEXT_COL);
		this.drawString(this.g,text,null,0,align);
		this.endElement(h + this.t.ELEMENT_OFFSET * this.ops.scaleFactor);
		if(started) {
			return 1;
		} else if(released) {
			return 3;
		} else if(down) {
			return 2;
		} else {
			return 0;
		}
	}
	,splitText: function(lines,align,bg) {
		if(bg == null) {
			bg = 0;
		}
		if(align == null) {
			align = 0;
		}
		var _g = 0;
		var _g1 = lines.split("\n");
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			this.text(line,align,bg);
		}
	}
	,startTextEdit: function(handle) {
		this.isTyping = true;
		this.submitTextHandle = this.textSelectedHandle;
		this.textToSubmit = this.textSelected;
		this.textSelectedHandle = handle;
		this.textSelected = handle.text;
		this.cursorX = handle.text.length;
		if(this.tabPressed) {
			this.tabPressed = false;
			this.isKeyPressed = false;
		} else if(!this.highlightOnSelect) {
			var x = this.inputX - (this._windowX + this._x + this.t.TEXT_OFFSET * this.ops.scaleFactor);
			this.cursorX = 0;
			while(this.cursorX < this.textSelected.length && this.ops.font.width(this.fontSize,HxOverrides.substr(this.textSelected,0,this.cursorX)) < x) this.cursorX++;
		}
		this.tabPressedHandle = handle;
		this.highlightAnchor = this.highlightOnSelect ? 0 : this.cursorX;
		if(kha_input_Keyboard.get() != null) {
			kha_input_Keyboard.get().show();
		}
	}
	,submitTextEdit: function() {
		this.submitTextHandle.text = this.textToSubmit;
		this.submitTextHandle.changed = this.changed = true;
		this.submitTextHandle = null;
		this.textToSubmit = "";
		this.textSelected = "";
	}
	,updateTextEdit: function(align,editable) {
		if(editable == null) {
			editable = true;
		}
		if(align == null) {
			align = 0;
		}
		var text = this.textSelected;
		if(this.isKeyPressed) {
			if(this.key == 37) {
				if(this.cursorX > 0) {
					this.cursorX--;
				}
			} else if(this.key == 39) {
				if(this.cursorX < text.length) {
					this.cursorX++;
				}
			} else if(editable && this.key == 8) {
				if(this.cursorX > 0 && this.highlightAnchor == this.cursorX) {
					text = HxOverrides.substr(text,0,this.cursorX - 1) + HxOverrides.substr(text,this.cursorX,text.length);
					this.cursorX--;
				} else if(this.highlightAnchor < this.cursorX) {
					text = HxOverrides.substr(text,0,this.highlightAnchor) + HxOverrides.substr(text,this.cursorX,text.length);
					this.cursorX = this.highlightAnchor;
				} else {
					text = HxOverrides.substr(text,0,this.cursorX) + HxOverrides.substr(text,this.highlightAnchor,text.length);
				}
			} else if(editable && this.key == 46) {
				if(this.highlightAnchor == this.cursorX) {
					text = HxOverrides.substr(text,0,this.cursorX) + HxOverrides.substr(text,this.cursorX + 1,null);
				} else if(this.highlightAnchor < this.cursorX) {
					text = HxOverrides.substr(text,0,this.highlightAnchor) + HxOverrides.substr(text,this.cursorX,text.length);
					this.cursorX = this.highlightAnchor;
				} else {
					text = HxOverrides.substr(text,0,this.cursorX) + HxOverrides.substr(text,this.highlightAnchor,text.length);
				}
			} else if(this.key == 13) {
				this.deselectText();
			} else if(this.key == 27) {
				this.textSelected = this.textSelectedHandle.text;
				this.deselectText();
			} else if(this.key == 9 && this.tabSwitchEnabled && !this.isCtrlDown) {
				this.tabPressed = true;
				this.deselectText();
				this.key = null;
			} else if(this.key == 36) {
				this.cursorX = 0;
			} else if(this.key == 35) {
				this.cursorX = text.length;
			} else if(this.isCtrlDown && this.isADown) {
				this.cursorX = text.length;
				this.highlightAnchor = 0;
			} else if(editable && this.key != 16 && this.key != 20 && this.key != 17 && this.key != 224 && this.key != 18 && this.key != 38 && this.key != 40 && this.char != null && this.char != "" && HxOverrides.cca(this.char,0) >= 32) {
				text = HxOverrides.substr(text,0,this.highlightAnchor) + this.char + HxOverrides.substr(text,this.cursorX,null);
				this.cursorX = this.cursorX + 1 > text.length ? text.length : this.cursorX + 1;
				if(zui_Zui.dynamicGlyphLoad && HxOverrides.cca(this.char,0) > 126 && kha_graphics2_Graphics.fontGlyphs.indexOf(HxOverrides.cca(this.char,0)) == -1) {
					kha_graphics2_Graphics.fontGlyphs.push(HxOverrides.cca(this.char,0));
					kha_graphics2_Graphics.fontGlyphs = kha_graphics2_Graphics.fontGlyphs.slice();
				}
			}
			var selecting = this.isShiftDown && (this.key == 37 || this.key == 39 || this.key == 16);
			if(!selecting && (!this.isCtrlDown || this.isCtrlDown && this.isAltDown)) {
				this.highlightAnchor = this.cursorX;
			}
		}
		if(editable && zui_Zui.textToPaste != "") {
			text = HxOverrides.substr(text,0,this.highlightAnchor) + zui_Zui.textToPaste + HxOverrides.substr(text,this.cursorX,null);
			this.cursorX += zui_Zui.textToPaste.length;
			this.highlightAnchor = this.cursorX;
			zui_Zui.textToPaste = "";
			zui_Zui.isPaste = false;
		}
		if(this.highlightAnchor == this.cursorX) {
			zui_Zui.textToCopy = text;
		} else if(this.highlightAnchor < this.cursorX) {
			zui_Zui.textToCopy = text.substring(this.highlightAnchor,this.cursorX);
		} else {
			zui_Zui.textToCopy = text.substring(this.cursorX,this.highlightAnchor);
		}
		if(editable && zui_Zui.isCut) {
			if(this.highlightAnchor == this.cursorX) {
				text = "";
			} else if(this.highlightAnchor < this.cursorX) {
				text = HxOverrides.substr(text,0,this.highlightAnchor) + HxOverrides.substr(text,this.cursorX,text.length);
				this.cursorX = this.highlightAnchor;
			} else {
				text = HxOverrides.substr(text,0,this.cursorX) + HxOverrides.substr(text,this.highlightAnchor,text.length);
			}
		}
		var off = this.t.TEXT_OFFSET * this.ops.scaleFactor;
		var lineHeight = this.t.ELEMENT_H * this.ops.scaleFactor;
		var cursorHeight = lineHeight - this.buttonOffsetY * 3.0;
		if(this.highlightAnchor != this.cursorX) {
			var istart = this.cursorX;
			var iend = this.highlightAnchor;
			if(this.highlightAnchor < this.cursorX) {
				istart = this.highlightAnchor;
				iend = this.cursorX;
			}
			var hlstr = HxOverrides.substr(text,istart,iend - istart);
			var hlstrw = this.ops.font.width(this.fontSize,hlstr);
			var startoff = this.ops.font.width(this.fontSize,HxOverrides.substr(text,0,istart));
			var hlStart = align == 0 ? this._x + startoff + off : this._x + this._w - hlstrw - off;
			if(align == 2) {
				hlStart -= this.ops.font.width(this.fontSize,HxOverrides.substr(text,iend,text.length));
			}
			this.g.set_color(this.t.ACCENT_SELECT_COL);
			this.g.fillRect(hlStart,this._y + this.buttonOffsetY * 1.5,hlstrw,cursorHeight);
		}
		var time = kha_Scheduler.time();
		if(this.isKeyDown || time % 1. < 0.5) {
			var str = align == 0 ? HxOverrides.substr(text,0,this.cursorX) : text.substring(this.cursorX,text.length);
			var strw = this.ops.font.width(this.fontSize,str);
			var cursorX = align == 0 ? this._x + strw + off : this._x + this._w - strw - off;
			this.g.set_color(this.t.TEXT_COL);
			this.g.fillRect(cursorX,this._y + this.buttonOffsetY * 1.5,this.ops.scaleFactor,cursorHeight);
		}
		this.textSelected = text;
	}
	,textInput: function(handle,label,align,editable) {
		if(editable == null) {
			editable = true;
		}
		if(align == null) {
			align = 0;
		}
		if(label == null) {
			label = "";
		}
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this.endElement();
			return handle.text;
		}
		var hover = this.getHover();
		if(hover && zui_Zui.onTextHover != null) {
			zui_Zui.onTextHover();
		}
		this.g.set_color(hover ? this.t.ACCENT_HOVER_COL : this.t.ACCENT_COL);
		var g = this.g;
		var fill = this.t.FILL_ACCENT_BG;
		var x = this._x + this.buttonOffsetY;
		var y = this._y + this.buttonOffsetY;
		var w = this._w - this.buttonOffsetY * 2;
		var h = this.t.BUTTON_H * this.ops.scaleFactor;
		var strength = 0.0;
		if(strength == 0.0) {
			strength = 1;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		if(fill) {
			g.fillRect(x,y - 1,w,h + 1);
		} else {
			g.drawRect(x,y,w,h,strength);
		}
		var startEdit = this.getReleased() || this.tabPressed;
		if(this.textSelectedHandle != handle && startEdit) {
			this.startTextEdit(handle);
		}
		if(this.textSelectedHandle == handle) {
			this.updateTextEdit(align,editable);
		}
		if(this.submitTextHandle == handle) {
			this.submitTextEdit();
		} else {
			handle.changed = false;
		}
		if(label != "") {
			this.g.set_color(this.t.LABEL_COL);
			var labelAlign = align == 2 ? 0 : 2;
			this.drawString(this.g,label,labelAlign == 0 ? null : 0,0,labelAlign);
		}
		this.g.set_color(this.t.TEXT_COL);
		if(this.textSelectedHandle != handle) {
			this.drawString(this.g,handle.text,null,0,align);
		} else {
			this.drawString(this.g,this.textSelected,null,0,align,false);
		}
		this.endElement();
		return handle.text;
	}
	,deselectText: function() {
		if(this.textSelectedHandle == null) {
			return;
		}
		this.submitTextHandle = this.textSelectedHandle;
		this.textToSubmit = this.textSelected;
		this.textSelectedHandle = null;
		this.isTyping = false;
		if(this.currentWindow != null) {
			this.currentWindow.redraws = 2;
		}
		if(kha_input_Keyboard.get() != null) {
			kha_input_Keyboard.get().hide();
		}
		this.highlightAnchor = this.cursorX;
	}
	,button: function(text,align,label) {
		if(label == null) {
			label = "";
		}
		if(align == null) {
			align = 1;
		}
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this.endElement();
			return false;
		}
		var released = this.getReleased();
		var pushed = this.getPushed();
		var hover = this.getHover();
		if(released) {
			this.changed = true;
		}
		this.g.set_color(pushed ? this.t.BUTTON_PRESSED_COL : hover ? this.t.BUTTON_HOVER_COL : this.t.BUTTON_COL);
		var g = this.g;
		var fill = this.t.FILL_BUTTON_BG;
		var x = this._x + this.buttonOffsetY;
		var y = this._y + this.buttonOffsetY;
		var w = this._w - this.buttonOffsetY * 2;
		var h = this.t.BUTTON_H * this.ops.scaleFactor;
		var strength = 0.0;
		if(strength == 0.0) {
			strength = 1;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		if(fill) {
			g.fillRect(x,y - 1,w,h + 1);
		} else {
			g.drawRect(x,y,w,h,strength);
		}
		this.g.set_color(this.t.BUTTON_TEXT_COL);
		this.drawString(this.g,text,null,0,align);
		if(label != "") {
			this.g.set_color(this.t.LABEL_COL);
			this.drawString(this.g,label,null,0,align == 2 ? 0 : 2);
		}
		this.endElement();
		return released;
	}
	,check: function(handle,text) {
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this.endElement();
			return handle.selected;
		}
		if(this.getReleased()) {
			handle.selected = !handle.selected;
			handle.changed = this.changed = true;
		} else {
			handle.changed = false;
		}
		var hover = this.getHover();
		this.drawCheck(handle.selected,hover);
		this.g.set_color(this.t.TEXT_COL);
		this.drawString(this.g,text,this.titleOffsetX,0,0);
		this.endElement();
		return handle.selected;
	}
	,radio: function(handle,position,text) {
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this.endElement();
			return handle.position == position;
		}
		if(position == 0) {
			handle.changed = false;
		}
		if(this.getReleased()) {
			handle.position = position;
			handle.changed = this.changed = true;
		}
		var hover = this.getHover();
		this.drawRadio(handle.position == position,hover);
		this.g.set_color(this.t.TEXT_COL);
		this.drawString(this.g,text,this.titleOffsetX,0);
		this.endElement();
		return handle.position == position;
	}
	,combo: function(handle,texts,label,showLabel,align) {
		if(align == null) {
			align = 0;
		}
		if(showLabel == null) {
			showLabel = false;
		}
		if(label == null) {
			label = "";
		}
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this.endElement();
			return handle.position;
		}
		if(this.getReleased()) {
			if(this.comboSelectedHandle == null) {
				this.inputEnabled = false;
				this.comboSelectedHandle = handle;
				this.comboSelectedWindow = this.currentWindow;
				this.comboSelectedAlign = align;
				this.comboSelectedTexts = texts;
				this.comboSelectedLabel = label;
				this.comboSelectedX = this._x + this._windowX | 0;
				this.comboSelectedY = this._y + this._windowY + this.t.ELEMENT_H * this.ops.scaleFactor | 0;
				this.comboSelectedW = this._w | 0;
				var _g = 0;
				while(_g < texts.length) {
					var t = texts[_g];
					++_g;
					var w = (this.ops.font.width(this.fontSize,t) | 0) + 10;
					if(this.comboSelectedW < w) {
						this.comboSelectedW = w;
					}
				}
				if(this.comboSelectedW > this._w * 2) {
					this.comboSelectedW = this._w * 2 | 0;
				}
				if(this.comboSelectedW > this._w) {
					this.comboSelectedW += this.t.TEXT_OFFSET * this.ops.scaleFactor | 0;
				}
				this.comboToSubmit = handle.position;
			}
		}
		if(handle == this.submitComboHandle) {
			handle.position = this.comboToSubmit;
			this.submitComboHandle = null;
			handle.changed = this.changed = true;
		} else {
			handle.changed = false;
		}
		var hover = this.getHover();
		if(hover) {
			this.g.set_color(this.t.ACCENT_HOVER_COL);
			var g = this.g;
			var fill = this.t.FILL_ACCENT_BG;
			var x = this._x + this.buttonOffsetY;
			var y = this._y + this.buttonOffsetY;
			var w = this._w - this.buttonOffsetY * 2;
			var h = this.t.BUTTON_H * this.ops.scaleFactor;
			var strength = 0.0;
			if(strength == 0.0) {
				strength = 1;
			}
			if(!this.enabled) {
				this.fadeColor();
			}
			if(fill) {
				g.fillRect(x,y - 1,w,h + 1);
			} else {
				g.drawRect(x,y,w,h,strength);
			}
		} else {
			this.g.set_color(this.t.ACCENT_COL);
			var g = this.g;
			var fill = this.t.FILL_ACCENT_BG;
			var x = this._x + this.buttonOffsetY;
			var y = this._y + this.buttonOffsetY;
			var w = this._w - this.buttonOffsetY * 2;
			var h = this.t.BUTTON_H * this.ops.scaleFactor;
			var strength = 0.0;
			if(strength == 0.0) {
				strength = 1;
			}
			if(!this.enabled) {
				this.fadeColor();
			}
			if(fill) {
				g.fillRect(x,y - 1,w,h + 1);
			} else {
				g.drawRect(x,y,w,h,strength);
			}
		}
		var x = this._x + this._w - this.arrowOffsetX - 8;
		var y = this._y + this.arrowOffsetY + 3;
		this.g.fillTriangle(x,y,x + this.t.ARROW_SIZE * this.ops.scaleFactor,y,x + this.t.ARROW_SIZE * this.ops.scaleFactor / 2,y + this.t.ARROW_SIZE * this.ops.scaleFactor / 2);
		if(showLabel && label != "") {
			if(align == 0) {
				this._x -= 15;
			}
			this.g.set_color(this.t.LABEL_COL);
			this.drawString(this.g,label,null,0,align == 0 ? 2 : 0);
			if(align == 0) {
				this._x += 15;
			}
		}
		if(align == 2) {
			this._x -= 15;
		}
		this.g.set_color(this.t.TEXT_COL);
		if(handle.position < texts.length) {
			this.drawString(this.g,texts[handle.position],null,0,align);
		}
		if(align == 2) {
			this._x += 15;
		}
		this.endElement();
		return handle.position;
	}
	,slider: function(handle,text,from,to,filled,precision,displayValue,align,textEdit) {
		if(textEdit == null) {
			textEdit = true;
		}
		if(align == null) {
			align = 2;
		}
		if(displayValue == null) {
			displayValue = true;
		}
		if(precision == null) {
			precision = 100.0;
		}
		if(filled == null) {
			filled = false;
		}
		if(to == null) {
			to = 1.0;
		}
		if(from == null) {
			from = 0.0;
		}
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this.endElement();
			return handle.value;
		}
		if(this.getStarted()) {
			this.scrollHandle = handle;
			this.isScrolling = true;
			if(zui_Zui.touchControls) {
				this.sliderTooltip = true;
				this.sliderTooltipX = this._x + this._windowX;
				this.sliderTooltipY = this._y + this._windowY;
				this.sliderTooltipW = this._w;
			}
		}
		handle.changed = false;
		if(handle == this.scrollHandle) {
			var range = to - from;
			var sliderX = this._x + this._windowX + this.buttonOffsetY;
			var sliderW = this._w - this.buttonOffsetY * 2;
			var step = range / sliderW;
			var value = from + (this.inputX - sliderX) * step;
			handle.value = Math.round(value * precision) / precision;
			if(handle.value < from) {
				handle.value = from;
			} else if(handle.value > to) {
				handle.value = to;
			}
			handle.changed = this.changed = true;
		}
		var hover = this.getHover();
		this.drawSlider(handle.value,from,to,filled,hover);
		var startEdit = (this.getReleased() || this.tabPressed) && textEdit;
		if(startEdit) {
			handle.text = handle.value + "";
			this.startTextEdit(handle);
			handle.changed = this.changed = true;
		}
		var lalign = align == 0 ? 2 : 0;
		if(this.textSelectedHandle == handle) {
			this.updateTextEdit(lalign);
		}
		if(this.submitTextHandle == handle) {
			this.submitTextEdit();
			try {
				var code = handle.text;
				handle.value = eval(code);
			} catch( _g ) {
			}
			handle.changed = this.changed = true;
		}
		this.g.set_color(this.t.LABEL_COL);
		this.drawString(this.g,text,null,0,align);
		if(displayValue) {
			this.g.set_color(this.t.TEXT_COL);
			if(this.textSelectedHandle != handle) {
				this.drawString(this.g,Math.round(handle.value * precision) / precision + "",null,0,lalign);
			} else {
				this.drawString(this.g,this.textSelected,null,0,lalign);
			}
		}
		this.endElement();
		return handle.value;
	}
	,separator: function(h,fill) {
		if(fill == null) {
			fill = true;
		}
		if(h == null) {
			h = 4;
		}
		if(!this.isVisible(this.t.ELEMENT_H * this.ops.scaleFactor)) {
			this._y += h * this.ops.scaleFactor;
			return;
		}
		if(fill) {
			this.g.set_color(this.t.SEPARATOR_COL);
			this.g.fillRect(this._x,this._y,this._w,h * this.ops.scaleFactor);
		}
		this._y += h * this.ops.scaleFactor;
	}
	,tooltip: function(text) {
		this.tooltipText = text;
		this.tooltipY = this._y + this._windowY;
	}
	,tooltipImage: function(image,maxWidth) {
		this.tooltipImg = image;
		this.tooltipImgMaxWidth = maxWidth;
		this.tooltipInvertY = this.imageInvertY;
		this.tooltipY = this._y + this._windowY;
	}
	,drawArrow: function(selected) {
		var x = this._x + this.arrowOffsetX;
		var y = this._y + this.arrowOffsetY;
		this.g.set_color(this.t.TEXT_COL);
		if(selected) {
			this.g.fillTriangle(x,y,x + this.t.ARROW_SIZE * this.ops.scaleFactor,y,x + this.t.ARROW_SIZE * this.ops.scaleFactor / 2,y + this.t.ARROW_SIZE * this.ops.scaleFactor);
		} else {
			this.g.fillTriangle(x,y,x,y + this.t.ARROW_SIZE * this.ops.scaleFactor,x + this.t.ARROW_SIZE * this.ops.scaleFactor,y + this.t.ARROW_SIZE * this.ops.scaleFactor / 2);
		}
	}
	,drawTree: function(selected) {
		var SIGN_W = 7 * this.ops.scaleFactor;
		var x = this._x + this.arrowOffsetX + 1;
		var y = this._y + this.arrowOffsetY + 1;
		this.g.set_color(this.t.TEXT_COL);
		if(selected) {
			this.g.fillRect(x,y + SIGN_W / 2 - 1,SIGN_W,SIGN_W / 8);
		} else {
			this.g.fillRect(x,y + SIGN_W / 2 - 1,SIGN_W,SIGN_W / 8);
			this.g.fillRect(x + SIGN_W / 2 - 1,y,SIGN_W / 8,SIGN_W);
		}
	}
	,drawCheck: function(selected,hover) {
		var x = this._x + this.checkOffsetX;
		var y = this._y + this.checkOffsetY;
		this.g.set_color(hover ? this.t.ACCENT_HOVER_COL : this.t.ACCENT_COL);
		var g = this.g;
		var fill = this.t.FILL_ACCENT_BG;
		var w = this.t.CHECK_SIZE * this.ops.scaleFactor;
		var h = this.t.CHECK_SIZE * this.ops.scaleFactor;
		var strength = 0.0;
		if(strength == 0.0) {
			strength = 1;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		if(fill) {
			g.fillRect(x,y - 1,w,h + 1);
		} else {
			g.drawRect(x,y,w,h,strength);
		}
		if(selected) {
			this.g.set_color(-1);
			if(!this.enabled) {
				this.fadeColor();
			}
			var size = this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor | 0;
			this.g.drawScaledImage(this.checkSelectImage,x + this.checkSelectOffsetX,y + this.checkSelectOffsetY,size,size);
		}
	}
	,drawRadio: function(selected,hover) {
		var x = this._x + this.radioOffsetX;
		var y = this._y + this.radioOffsetY;
		this.g.set_color(hover ? this.t.ACCENT_HOVER_COL : this.t.ACCENT_COL);
		var g = this.g;
		var fill = this.t.FILL_ACCENT_BG;
		var w = this.t.CHECK_SIZE * this.ops.scaleFactor;
		var h = this.t.CHECK_SIZE * this.ops.scaleFactor;
		var strength = 0.0;
		if(strength == 0.0) {
			strength = 1;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		if(fill) {
			g.fillRect(x,y - 1,w,h + 1);
		} else {
			g.drawRect(x,y,w,h,strength);
		}
		if(selected) {
			this.g.set_color(this.t.ACCENT_SELECT_COL);
			if(!this.enabled) {
				this.fadeColor();
			}
			this.g.fillRect(x + this.radioSelectOffsetX,y + this.radioSelectOffsetY,this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor,this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor);
		}
	}
	,drawSlider: function(value,from,to,filled,hover) {
		var x = this._x + this.buttonOffsetY;
		var y = this._y + this.buttonOffsetY;
		var w = this._w - this.buttonOffsetY * 2;
		this.g.set_color(hover ? this.t.ACCENT_HOVER_COL : this.t.ACCENT_COL);
		var g = this.g;
		var fill = this.t.FILL_ACCENT_BG;
		var h = this.t.BUTTON_H * this.ops.scaleFactor;
		var strength = 0.0;
		if(strength == 0.0) {
			strength = 1;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		if(fill) {
			g.fillRect(x,y - 1,w,h + 1);
		} else {
			g.drawRect(x,y,w,h,strength);
		}
		this.g.set_color(hover ? this.t.ACCENT_HOVER_COL : this.t.ACCENT_COL);
		var offset = (value - from) / (to - from);
		var barW = 8 * this.ops.scaleFactor;
		var sliderX = filled ? x : x + (w - barW) * offset;
		sliderX = Math.max(Math.min(sliderX,x + (w - barW)),x);
		var sliderW = filled ? w * offset : barW;
		sliderW = Math.max(Math.min(sliderW,w),0);
		var g = this.g;
		var h = this.t.BUTTON_H * this.ops.scaleFactor;
		var strength = 0.0;
		if(strength == 0.0) {
			strength = 1;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		g.fillRect(sliderX,y - 1,sliderW,h + 1);
	}
	,drawCombo: function() {
		if(this.comboSelectedHandle == null) {
			return;
		}
		var _g = this.g;
		this.globalG.set_color(this.t.SEPARATOR_COL);
		this.globalG.begin(false);
		var comboH = (this.comboSelectedTexts.length + (this.comboSelectedLabel != "" ? 1 : 0)) * (this.t.ELEMENT_H * this.ops.scaleFactor | 0);
		var distTop = this.comboSelectedY - comboH - (this.t.ELEMENT_H * this.ops.scaleFactor | 0) - this.windowBorderTop;
		var distBottom = kha_System.windowHeight() - this.windowBorderBottom - (this.comboSelectedY + comboH);
		var unrollUp = distBottom < 0 && distBottom < distTop;
		this.beginRegion(this.globalG,this.comboSelectedX,this.comboSelectedY,this.comboSelectedW);
		if(this.isKeyPressed || this.inputWheelDelta != 0) {
			var arrowUp = this.isKeyPressed && this.key == (unrollUp ? 40 : 38);
			var arrowDown = this.isKeyPressed && this.key == (unrollUp ? 38 : 40);
			var wheelUp = unrollUp && this.inputWheelDelta > 0 || !unrollUp && this.inputWheelDelta < 0;
			var wheelDown = unrollUp && this.inputWheelDelta < 0 || !unrollUp && this.inputWheelDelta > 0;
			if((arrowUp || wheelUp) && this.comboToSubmit > 0) {
				this.comboToSubmit--;
				this.submitComboHandle = this.comboSelectedHandle;
			} else if((arrowDown || wheelDown) && this.comboToSubmit < this.comboSelectedTexts.length - 1) {
				this.comboToSubmit++;
				this.submitComboHandle = this.comboSelectedHandle;
			}
			if(this.comboSelectedWindow != null) {
				this.comboSelectedWindow.redraws = 2;
			}
		}
		this.inputEnabled = true;
		var _BUTTON_COL = this.t.BUTTON_COL;
		var _ELEMENT_OFFSET = this.t.ELEMENT_OFFSET;
		this.t.ELEMENT_OFFSET = 0;
		var unrollRight = this._x + this.comboSelectedW * 2 < kha_System.windowWidth() - this.windowBorderRight ? 1 : -1;
		var _g1 = 0;
		var _g2 = this.comboSelectedTexts.length;
		while(_g1 < _g2) {
			var i = _g1++;
			if(unrollUp) {
				this._y -= this.t.ELEMENT_H * this.ops.scaleFactor * 2;
			}
			this.t.BUTTON_COL = i == this.comboSelectedHandle.position ? this.t.ACCENT_SELECT_COL : this.t.SEPARATOR_COL;
			this.fill(0,0,this._w / this.ops.scaleFactor,this.t.ELEMENT_H * this.ops.scaleFactor / this.ops.scaleFactor,this.t.SEPARATOR_COL);
			if(this.button(this.comboSelectedTexts[i],this.comboSelectedAlign)) {
				this.comboToSubmit = i;
				this.submitComboHandle = this.comboSelectedHandle;
				if(this.comboSelectedWindow != null) {
					this.comboSelectedWindow.redraws = 2;
				}
				break;
			}
			if(this._y + this.t.ELEMENT_H * this.ops.scaleFactor > kha_System.windowHeight() - this.windowBorderBottom || this._y - this.t.ELEMENT_H * this.ops.scaleFactor * 2 < this.windowBorderTop) {
				this._x += this.comboSelectedW * unrollRight;
				this._y = this.comboSelectedY;
			}
		}
		this.t.BUTTON_COL = _BUTTON_COL;
		this.t.ELEMENT_OFFSET = _ELEMENT_OFFSET;
		if(this.comboSelectedLabel != "") {
			if(unrollUp) {
				this._y -= this.t.ELEMENT_H * this.ops.scaleFactor * 2;
				this.fill(0,0,this._w / this.ops.scaleFactor,this.t.ELEMENT_H * this.ops.scaleFactor / this.ops.scaleFactor,this.t.SEPARATOR_COL);
				this.g.set_color(this.t.LABEL_COL);
				this.drawString(this.g,this.comboSelectedLabel,null,0,2);
				this._y += this.t.ELEMENT_H * this.ops.scaleFactor;
				this.fill(0,0,this._w / this.ops.scaleFactor,this.ops.scaleFactor,this.t.ACCENT_SELECT_COL);
			} else {
				this.fill(0,0,this._w / this.ops.scaleFactor,this.t.ELEMENT_H * this.ops.scaleFactor / this.ops.scaleFactor,this.t.SEPARATOR_COL);
				this.fill(0,0,this._w / this.ops.scaleFactor,this.ops.scaleFactor,this.t.ACCENT_SELECT_COL);
				this.g.set_color(this.t.LABEL_COL);
				this.drawString(this.g,this.comboSelectedLabel,null,0,2);
			}
		}
		if((this.inputReleased || this.isEscapeDown || this.isReturnDown) && !zui_Zui.comboFirst) {
			this.comboSelectedHandle = null;
			zui_Zui.comboFirst = true;
		} else {
			zui_Zui.comboFirst = false;
		}
		this.inputEnabled = this.comboSelectedHandle == null;
		this.endRegion(false);
		this.globalG.end();
		this.g = _g;
	}
	,drawTooltip: function(bindGlobalG) {
		if(this.sliderTooltip) {
			if(bindGlobalG) {
				this.globalG.begin(false);
			}
			this.globalG.set_font(this.ops.font);
			this.globalG.set_fontSize(this.fontSize * 2);
			var text = Math.round(this.scrollHandle.value * 100) / 100 + "";
			var xoff = this.ops.font.width(this.globalG.get_fontSize(),text) / 2;
			var yoff = this.ops.font.height(this.globalG.get_fontSize());
			var x = Math.min(Math.max(this.sliderTooltipX,this.inputX),this.sliderTooltipX + this.sliderTooltipW);
			this.globalG.set_color(this.t.ACCENT_COL);
			this.globalG.fillRect(x - xoff,this.sliderTooltipY - yoff,xoff * 2,yoff);
			this.globalG.set_color(this.t.TEXT_COL);
			this.globalG.drawString(text,x - xoff,this.sliderTooltipY - yoff);
			if(bindGlobalG) {
				this.globalG.end();
			}
		}
		if(this.tooltipText != "" || this.tooltipImg != null) {
			if(this.inputChanged()) {
				this.tooltipShown = false;
				this.tooltipWait = this.inputDX == 0 && this.inputDY == 0;
			}
			if(!this.tooltipShown) {
				this.tooltipShown = true;
				this.tooltipX = this.inputX;
				this.tooltipTime = kha_Scheduler.time();
			}
			if(!this.tooltipWait && kha_Scheduler.time() - this.tooltipTime > 1.0) {
				if(this.tooltipText != "") {
					this.drawTooltipText(bindGlobalG);
				} else {
					this.drawTooltipImage(bindGlobalG);
				}
			}
		} else {
			this.tooltipShown = false;
		}
	}
	,drawTooltipText: function(bindGlobalG) {
		this.globalG.set_color(this.t.TEXT_COL);
		var lines = this.tooltipText.split("\n");
		var tooltipW = 0.0;
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			var lineTooltipW = this.ops.font.width(this.fontSize,line);
			if(lineTooltipW > tooltipW) {
				tooltipW = lineTooltipW;
			}
		}
		this.tooltipX = Math.min(this.tooltipX,kha_System.windowWidth() - tooltipW - 20);
		if(bindGlobalG) {
			this.globalG.begin(false);
		}
		var fontHeight = this.ops.font.height(this.fontSize);
		this.globalG.fillRect(this.tooltipX,this.tooltipY,tooltipW + 20,fontHeight * lines.length);
		this.globalG.set_font(this.ops.font);
		this.globalG.set_fontSize(this.fontSize);
		this.globalG.set_color(this.t.ACCENT_COL);
		var _g = 0;
		var _g1 = lines.length;
		while(_g < _g1) {
			var i = _g++;
			this.globalG.drawString(lines[i],this.tooltipX + 5,this.tooltipY + i * this.fontSize);
		}
		if(bindGlobalG) {
			this.globalG.end();
		}
	}
	,drawTooltipImage: function(bindGlobalG) {
		var w = this.tooltipImg.get_width();
		if(this.tooltipImgMaxWidth != null && w > this.tooltipImgMaxWidth) {
			w = this.tooltipImgMaxWidth;
		}
		var h = this.tooltipImg.get_height() * (w / this.tooltipImg.get_width());
		this.tooltipX = Math.min(this.tooltipX,kha_System.windowWidth() - w - 20);
		this.tooltipY = Math.min(this.tooltipY,kha_System.windowHeight() - h - 20);
		if(bindGlobalG) {
			this.globalG.begin(false);
		}
		this.globalG.set_color(-16777216);
		this.globalG.fillRect(this.tooltipX,this.tooltipY,w,h);
		this.globalG.set_color(-1);
		if(this.tooltipInvertY) {
			this.globalG.drawScaledImage(this.tooltipImg,this.tooltipX,this.tooltipY + h,w,-h);
		} else {
			this.globalG.drawScaledImage(this.tooltipImg,this.tooltipX,this.tooltipY,w,h);
		}
		if(bindGlobalG) {
			this.globalG.end();
		}
	}
	,drawString: function(g,text,xOffset,yOffset,align,truncation) {
		if(truncation == null) {
			truncation = true;
		}
		if(align == null) {
			align = 0;
		}
		if(yOffset == null) {
			yOffset = 0;
		}
		var fullText = text;
		if(truncation) {
			while(text.length > 0 && this.ops.font.width(this.fontSize,text) > this._w - 6) text = HxOverrides.substr(text,0,text.length - 1);
			if(text.length < fullText.length) {
				text += "..";
				if(this.isHovered) {
					this.tooltip(fullText);
				}
			}
		}
		if(xOffset == null) {
			xOffset = this.t.TEXT_OFFSET;
		}
		xOffset *= this.ops.scaleFactor;
		g.set_font(this.ops.font);
		g.set_fontSize(this.fontSize);
		if(align == 1) {
			xOffset = this._w / 2 - this.ops.font.width(this.fontSize,text) / 2;
		} else if(align == 2) {
			xOffset = this._w - this.ops.font.width(this.fontSize,text) - this.t.TEXT_OFFSET * this.ops.scaleFactor;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		g.set_pipeline(this.rtTextPipeline);
		g.drawString(text,this._x + xOffset,this._y + this.fontOffsetY + yOffset);
		g.set_pipeline(null);
	}
	,endElement: function(elementSize) {
		if(elementSize == null) {
			elementSize = this.t.ELEMENT_H * this.ops.scaleFactor + this.t.ELEMENT_OFFSET * this.ops.scaleFactor;
		}
		if(this.currentWindow == null || this.currentWindow.layout == 0) {
			if(this.curRatio == -1 || this.ratios != null && this.curRatio == this.ratios.length - 1) {
				this._y += elementSize;
				if(this.ratios != null && this.curRatio == this.ratios.length - 1) {
					this.curRatio = -1;
					this.ratios = null;
					this._x = this.xBeforeSplit;
					this._w = this.wBeforeSplit;
					this.highlightFullRow = false;
				}
			} else {
				this.curRatio++;
				this._x += this._w;
				var ratio = this.ratios[this.curRatio];
				this._w = (ratio < 0 ? -ratio : ratio * this.wBeforeSplit) | 0;
			}
		} else {
			this._x += this._w + this.t.ELEMENT_OFFSET * this.ops.scaleFactor;
		}
	}
	,highlightNextRow: function() {
		this.highlightFullRow = true;
	}
	,getRatio: function(ratio,dyn) {
		if(ratio < 0) {
			return -ratio;
		} else {
			return ratio * dyn;
		}
	}
	,row: function(ratios) {
		this.ratios = ratios;
		this.curRatio = 0;
		this.xBeforeSplit = this._x;
		this.wBeforeSplit = this._w;
		var ratio = ratios[this.curRatio];
		this._w = (ratio < 0 ? -ratio : ratio * this._w) | 0;
	}
	,indent: function(bothSides) {
		if(bothSides == null) {
			bothSides = true;
		}
		this._x += this.t.TAB_W * this.ops.scaleFactor | 0;
		this._w -= this.t.TAB_W * this.ops.scaleFactor | 0;
		if(bothSides) {
			this._w -= this.t.TAB_W * this.ops.scaleFactor | 0;
		}
	}
	,unindent: function(bothSides) {
		if(bothSides == null) {
			bothSides = true;
		}
		this._x -= this.t.TAB_W * this.ops.scaleFactor | 0;
		this._w += this.t.TAB_W * this.ops.scaleFactor | 0;
		if(bothSides) {
			this._w += this.t.TAB_W * this.ops.scaleFactor | 0;
		}
	}
	,fadeColor: function() {
		this.g.set_color(kha_Color.fromFloats(((this.g.get_color() & 16711680) >>> 16) * 0.00392156862745098,((this.g.get_color() & 65280) >>> 8) * 0.00392156862745098,(this.g.get_color() & 255) * 0.00392156862745098,0.25));
	}
	,fill: function(x,y,w,h,color) {
		this.g.set_color(color);
		if(!this.enabled) {
			this.fadeColor();
		}
		this.g.fillRect(this._x + x * this.ops.scaleFactor,this._y + y * this.ops.scaleFactor - 1,w * this.ops.scaleFactor,h * this.ops.scaleFactor);
		this.g.set_color(-1);
	}
	,rect: function(x,y,w,h,color,strength) {
		if(strength == null) {
			strength = 1.0;
		}
		this.g.set_color(color);
		if(!this.enabled) {
			this.fadeColor();
		}
		this.g.drawRect(this._x + x * this.ops.scaleFactor,this._y + y * this.ops.scaleFactor,w * this.ops.scaleFactor,h * this.ops.scaleFactor,strength);
		this.g.set_color(-1);
	}
	,drawRect: function(g,fill,x,y,w,h,strength) {
		if(strength == null) {
			strength = 0.0;
		}
		if(strength == 0.0) {
			strength = 1;
		}
		if(!this.enabled) {
			this.fadeColor();
		}
		if(fill) {
			g.fillRect(x,y - 1,w,h + 1);
		} else {
			g.drawRect(x,y,w,h,strength);
		}
	}
	,isVisible: function(elemH) {
		if(this.currentWindow == null) {
			return true;
		}
		if(this._y + elemH > this.windowHeaderH) {
			return this._y < this.currentWindow.texture.get_height();
		} else {
			return false;
		}
	}
	,getReleased: function(elemH) {
		if(elemH == null) {
			elemH = -1.0;
		}
		this.isReleased = this.enabled && this.inputEnabled && this.inputReleased && this.getHover(elemH) && this.getInitialHover(elemH);
		return this.isReleased;
	}
	,getPushed: function(elemH) {
		if(elemH == null) {
			elemH = -1.0;
		}
		this.isPushed = this.enabled && this.inputEnabled && this.inputDown && this.getHover(elemH) && this.getInitialHover(elemH);
		return this.isPushed;
	}
	,getStarted: function(elemH) {
		if(elemH == null) {
			elemH = -1.0;
		}
		this.isStarted = this.enabled && this.inputEnabled && this.inputStarted && this.getHover(elemH);
		return this.isStarted;
	}
	,getInitialHover: function(elemH) {
		if(elemH == null) {
			elemH = -1.0;
		}
		if(this.scissor && this.inputY < this._windowY + this.windowHeaderH) {
			return false;
		}
		if(elemH == -1.0) {
			elemH = this.t.ELEMENT_H * this.ops.scaleFactor;
		}
		if(this.enabled && this.inputEnabled && this.inputStartedX >= this._windowX + this._x && this.inputStartedX < this._windowX + this._x + this._w && this.inputStartedY >= this._windowY + this._y) {
			return this.inputStartedY < this._windowY + this._y + elemH;
		} else {
			return false;
		}
	}
	,getHover: function(elemH) {
		if(elemH == null) {
			elemH = -1.0;
		}
		if(this.scissor && this.inputY < this._windowY + this.windowHeaderH) {
			return false;
		}
		if(elemH == -1.0) {
			elemH = this.t.ELEMENT_H * this.ops.scaleFactor;
		}
		this.isHovered = this.enabled && this.inputEnabled && this.inputX >= this._windowX + (this.highlightFullRow ? 0 : this._x) && this.inputX < this._windowX + this._x + (this.highlightFullRow ? this._windowW : this._w) && this.inputY >= this._windowY + this._y && this.inputY < this._windowY + this._y + elemH;
		return this.isHovered;
	}
	,getInputInRect: function(x,y,w,h,scale) {
		if(scale == null) {
			scale = 1.0;
		}
		if(this.enabled && this.inputEnabled && this.inputX >= x * scale && this.inputX < (x + w) * scale && this.inputY >= y * scale) {
			return this.inputY < (y + h) * scale;
		} else {
			return false;
		}
	}
	,onMouseDown: function(button,x,y) {
		if(button == 0) {
			this.inputStarted = true;
		} else {
			this.inputStartedR = true;
		}
		if(button == 0) {
			this.inputDown = true;
		} else {
			this.inputDownR = true;
		}
		this.inputStartedTime = kha_Scheduler.time();
		this.inputStartedX = x;
		this.inputStartedY = y;
	}
	,onMouseUp: function(button,x,y) {
		if(this.isScrolling) {
			this.isScrolling = false;
			this.scrollHandle = null;
			this.sliderTooltip = false;
			if(x == this.inputStartedX && y == this.inputStartedY) {
				if(button == 0) {
					this.inputReleased = true;
				} else {
					this.inputReleasedR = true;
				}
			}
		} else if(button == 0) {
			this.inputReleased = true;
		} else {
			this.inputReleasedR = true;
		}
		if(button == 0) {
			this.inputDown = false;
		} else {
			this.inputDownR = false;
		}
		this.deselectText();
		if(this.touchHold) {
			this.touchHold = false;
			this.inputReleased = false;
			this.inputReleasedR = true;
		}
	}
	,onMouseMove: function(x,y,movementX,movementY) {
		this.setInputPosition(x,y);
	}
	,onMouseWheel: function(delta) {
		this.inputWheelDelta = delta;
	}
	,setInputPosition: function(x,y) {
		this.inputDX += x - this.inputX;
		this.inputDY += y - this.inputY;
		this.inputX = x;
		this.inputY = y;
	}
	,onKeyDown: function(code) {
		this.key = code;
		this.isKeyPressed = true;
		this.isKeyDown = true;
		zui_Zui.keyRepeatTime = kha_Scheduler.time() + 0.4;
		switch(code) {
		case 8:
			this.isBackspaceDown = true;
			break;
		case 9:
			this.isTabDown = true;
			break;
		case 13:
			this.isReturnDown = true;
			break;
		case 16:
			this.isShiftDown = true;
			break;
		case 17:
			this.isCtrlDown = true;
			break;
		case 18:
			this.isAltDown = true;
			break;
		case 27:
			this.isEscapeDown = true;
			break;
		case 32:
			this.char = " ";
			break;
		case 46:
			this.isDeleteDown = true;
			break;
		case 65:
			this.isADown = true;
			break;
		default:
		}
	}
	,onKeyUp: function(code) {
		this.isKeyDown = false;
		switch(code) {
		case 8:
			this.isBackspaceDown = false;
			break;
		case 9:
			this.isTabDown = false;
			break;
		case 13:
			this.isReturnDown = false;
			break;
		case 16:
			this.isShiftDown = false;
			break;
		case 17:
			this.isCtrlDown = false;
			break;
		case 18:
			this.isAltDown = false;
			break;
		case 27:
			this.isEscapeDown = false;
			break;
		case 46:
			this.isDeleteDown = false;
			break;
		case 65:
			this.isADown = false;
			break;
		default:
		}
	}
	,onKeyPress: function(char) {
		this.char = char;
		this.isKeyPressed = true;
	}
	,onCut: function() {
		zui_Zui.isCut = true;
		return this.onCopy();
	}
	,onCopy: function() {
		zui_Zui.isCopy = true;
		return zui_Zui.textToCopy;
	}
	,onPaste: function(s) {
		zui_Zui.isPaste = true;
		zui_Zui.textToPaste = s;
	}
	,ELEMENT_W: function() {
		return this.t.ELEMENT_W * this.ops.scaleFactor;
	}
	,ELEMENT_H: function() {
		return this.t.ELEMENT_H * this.ops.scaleFactor;
	}
	,ELEMENT_OFFSET: function() {
		return this.t.ELEMENT_OFFSET * this.ops.scaleFactor;
	}
	,ARROW_SIZE: function() {
		return this.t.ARROW_SIZE * this.ops.scaleFactor;
	}
	,BUTTON_H: function() {
		return this.t.BUTTON_H * this.ops.scaleFactor;
	}
	,CHECK_SIZE: function() {
		return this.t.CHECK_SIZE * this.ops.scaleFactor;
	}
	,CHECK_SELECT_SIZE: function() {
		return this.t.CHECK_SELECT_SIZE * this.ops.scaleFactor;
	}
	,FONT_SIZE: function() {
		return this.t.FONT_SIZE * this.ops.scaleFactor | 0;
	}
	,SCROLL_W: function() {
		return this.t.SCROLL_W * this.ops.scaleFactor | 0;
	}
	,TEXT_OFFSET: function() {
		return this.t.TEXT_OFFSET * this.ops.scaleFactor;
	}
	,TAB_W: function() {
		return this.t.TAB_W * this.ops.scaleFactor | 0;
	}
	,HEADER_DRAG_H: function() {
		return 15 * this.ops.scaleFactor | 0;
	}
	,SCALE: function() {
		return this.ops.scaleFactor;
	}
	,FLASH_SPEED: function() {
		return 0.5;
	}
	,TOOLTIP_DELAY: function() {
		return 1.0;
	}
	,resize: function(handle,w,h,khaWindowId) {
		if(khaWindowId == null) {
			khaWindowId = 0;
		}
		handle.redraws = 2;
		if(handle.texture != null) {
			handle.texture.unload();
		}
		if(w < 1) {
			w = 1;
		}
		if(h < 1) {
			h = 1;
		}
		handle.texture = kha_Image.createRenderTarget(w,h,0,0,1,khaWindowId);
		handle.texture.get_g2().set_imageScaleQuality(1);
	}
	,__class__: zui_Zui
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = true;
$hxClasses["Array"] = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
Main.cwd = "";
arm2d_Editor.defaultWindowW = 240;
arm2d_Editor.windowW = arm2d_Editor.defaultWindowW;
arm2d_Editor.coffX = 160.0;
arm2d_Editor.coffY = 40.0;
arm2d_Editor.currentOperation = "";
arm2d_Editor.assetNames = [""];
arm2d_Editor.showFiles = false;
arm2d_Editor.foldersOnly = false;
arm2d_Editor.gridSnapBounds = false;
arm2d_Editor.gridSnapPos = true;
arm2d_Editor.gridUseRelative = true;
arm2d_Editor.useRotationSteps = false;
arm2d_Editor.gridSize = 20;
arm2d_Editor.rotationSteps = 0.261799386;
arm2d_Editor.modalW = 625;
arm2d_Editor.modalH = 545;
arm2d_Editor.modalHeaderH = 66;
arm2d_Editor.modalRectW = 625;
arm2d_Editor.modalRectH = 545;
arm2d_Editor.path = "/";
arm2d_ElementController.isManipulating = false;
arm2d_ElementController.transformStartedMouse = false;
arm2d_ElementController.drag = false;
arm2d_ElementController.dragLeft = false;
arm2d_ElementController.dragTop = false;
arm2d_ElementController.dragRight = false;
arm2d_ElementController.dragBottom = false;
arm2d_ElementController.grab = false;
arm2d_ElementController.grabX = false;
arm2d_ElementController.grabY = false;
arm2d_ElementController.rotate = false;
arm2d_ElementController.newElementSelected = false;
zui_Handle.global = new zui_Handle();
arm2d_ui_UIProperties.hwin = zui_Handle.global.nest(1,null);
armory_ui_Canvas.assetMap = new haxe_ds_IntMap();
armory_ui_Canvas.themes = [];
armory_ui_Canvas.events = [];
armory_ui_Canvas.screenW = -1;
armory_ui_Canvas.screenH = -1;
armory_ui_Canvas.locale = "en";
armory_ui_Canvas.h = new zui_Handle();
armory_ui_Canvas.elemId = -1;
armory_ui_Canvas.assetId = -1;
armory_ui_Popup.show = false;
armory_ui_Popup.hwnd = new zui_Handle();
armory_ui_Popup.boxTitle = "";
armory_ui_Popup.boxText = "";
armory_ui_Popup.modalX = 0;
armory_ui_Popup.modalY = 0;
armory_ui_Popup.modalW = 400;
armory_ui_Popup.modalH = 160;
armory_ui_Themes.light = { NAME : "Default Light", WINDOW_BG_COL : -1052689, WINDOW_TINT_COL : -14540254, ACCENT_COL : -1118482, ACCENT_HOVER_COL : -4473925, ACCENT_SELECT_COL : -5592406, BUTTON_COL : -3355444, BUTTON_TEXT_COL : -14540254, BUTTON_HOVER_COL : -5000269, BUTTON_PRESSED_COL : -5131855, TEXT_COL : -6710887, LABEL_COL : -5592406, SEPARATOR_COL : -6710887, HIGHLIGHT_COL : -14656100, CONTEXT_COL : -5592406, PANEL_BG_COL : -5592406, FONT_SIZE : 26, ELEMENT_W : 200, ELEMENT_H : 48, ELEMENT_OFFSET : 8, ARROW_SIZE : 10, BUTTON_H : 44, CHECK_SIZE : 30, CHECK_SELECT_SIZE : 16, SCROLL_W : 12, TEXT_OFFSET : 16, TAB_W : 24, FILL_WINDOW_BG : false, FILL_BUTTON_BG : true, FILL_ACCENT_BG : false, LINK_STYLE : 0, FULL_TABS : false};
haxe_Unserializer.DEFAULT_RESOLVER = new haxe__$Unserializer_DefaultResolver();
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
kha_Assets.images = new kha__$Assets_ImageList();
kha_Assets.sounds = new kha__$Assets_SoundList();
kha_Assets.blobs = new kha__$Assets_BlobList();
kha_Assets.fonts = new kha__$Assets_FontList();
kha_Assets.videos = new kha__$Assets_VideoList();
kha_Color.Black = -16777216;
kha_Color.White = -1;
kha_Color.Red = -65536;
kha_Color.Blue = -16776961;
kha_Color.Green = -16711936;
kha_Color.Magenta = -65281;
kha_Color.Yellow = -256;
kha_Color.Cyan = -16711681;
kha_Color.Purple = -8388480;
kha_Color.Pink = -16181;
kha_Color.Orange = -23296;
kha_Color.Transparent = 0;
kha_Color.invMaxChannelValue = 0.00392156862745098;
kha_FontStyle.Default = new kha_FontStyle(false,false,false);
kha_Scheduler.timeWarpSaveTime = 10.0;
kha_Scheduler.DIF_COUNT = 3;
kha_Scheduler.maxframetime = 0.5;
kha_Scheduler.startTime = 0;
kha_Shaders.painter_colored_fragData0 = "s142:I3ZlcnNpb24gMzMwCgpvdXQgdmVjNCBGcmFnQ29sb3I7CmluIHZlYzQgZnJhZ21lbnRDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIEZyYWdDb2xvciA9IGZyYWdtZW50Q29sb3I7Cn0KCg";
kha_Shaders.painter_colored_vertData0 = "s307:I3ZlcnNpb24gMzMwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWM0IGZyYWdtZW50Q29sb3I7CmluIHZlYzQgdmVydGV4Q29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiB2ZWM0KHZlcnRleFBvc2l0aW9uLCAxLjApOwogICAgZnJhZ21lbnRDb2xvciA9IHZlcnRleENvbG9yOwp9Cgo";
kha_Shaders.painter_image_fragData0 = "s374:I3ZlcnNpb24gMzMwCgp1bmlmb3JtIHNhbXBsZXIyRCB0ZXg7CgppbiB2ZWMyIHRleENvb3JkOwppbiB2ZWM0IGNvbG9yOwpvdXQgdmVjNCBGcmFnQ29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICB2ZWM0IHRleGNvbG9yID0gdGV4dHVyZSh0ZXgsIHRleENvb3JkKSAqIGNvbG9yOwogICAgdmVjMyBfMzIgPSB0ZXhjb2xvci54eXogKiBjb2xvci53OwogICAgdGV4Y29sb3IgPSB2ZWM0KF8zMi54LCBfMzIueSwgXzMyLnosIHRleGNvbG9yLncpOwogICAgRnJhZ0NvbG9yID0gdGV4Y29sb3I7Cn0KCg";
kha_Shaders.painter_image_vertData0 = "s376:I3ZlcnNpb24gMzMwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHRleFBvc2l0aW9uOwpvdXQgdmVjNCBjb2xvcjsKaW4gdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICB0ZXhDb29yZCA9IHRleFBvc2l0aW9uOwogICAgY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_Shaders.painter_text_fragData0 = "s270:I3ZlcnNpb24gMzMwCgp1bmlmb3JtIHNhbXBsZXIyRCB0ZXg7CgpvdXQgdmVjNCBGcmFnQ29sb3I7CmluIHZlYzQgZnJhZ21lbnRDb2xvcjsKaW4gdmVjMiB0ZXhDb29yZDsKCnZvaWQgbWFpbigpCnsKICAgIEZyYWdDb2xvciA9IHZlYzQoZnJhZ21lbnRDb2xvci54eXosIHRleHR1cmUodGV4LCB0ZXhDb29yZCkueCAqIGZyYWdtZW50Q29sb3Iudyk7Cn0KCg";
kha_Shaders.painter_text_vertData0 = "s398:I3ZlcnNpb24gMzMwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHRleFBvc2l0aW9uOwpvdXQgdmVjNCBmcmFnbWVudENvbG9yOwppbiB2ZWM0IHZlcnRleENvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvbiwgMS4wKTsKICAgIHRleENvb3JkID0gdGV4UG9zaXRpb247CiAgICBmcmFnbWVudENvbG9yID0gdmVydGV4Q29sb3I7Cn0KCg";
kha_Shaders.painter_video_fragData0 = "s374:I3ZlcnNpb24gMzMwCgp1bmlmb3JtIHNhbXBsZXIyRCB0ZXg7CgppbiB2ZWMyIHRleENvb3JkOwppbiB2ZWM0IGNvbG9yOwpvdXQgdmVjNCBGcmFnQ29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICB2ZWM0IHRleGNvbG9yID0gdGV4dHVyZSh0ZXgsIHRleENvb3JkKSAqIGNvbG9yOwogICAgdmVjMyBfMzIgPSB0ZXhjb2xvci54eXogKiBjb2xvci53OwogICAgdGV4Y29sb3IgPSB2ZWM0KF8zMi54LCBfMzIueSwgXzMyLnosIHRleGNvbG9yLncpOwogICAgRnJhZ0NvbG9yID0gdGV4Y29sb3I7Cn0KCg";
kha_Shaders.painter_video_vertData0 = "s376:I3ZlcnNpb24gMzMwCgp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKCmluIHZlYzMgdmVydGV4UG9zaXRpb247Cm91dCB2ZWMyIHRleENvb3JkOwppbiB2ZWMyIHRleFBvc2l0aW9uOwpvdXQgdmVjNCBjb2xvcjsKaW4gdmVjNCB2ZXJ0ZXhDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb24sIDEuMCk7CiAgICB0ZXhDb29yZCA9IHRleFBvc2l0aW9uOwogICAgY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKfQoK";
kha_System.renderListeners = [];
kha_System.foregroundListeners = [];
kha_System.resumeListeners = [];
kha_System.pauseListeners = [];
kha_System.backgroundListeners = [];
kha_System.shutdownListeners = [];
kha_System.dropFilesListeners = [];
kha_SystemImpl.maxGamepads = 4;
kha_SystemImpl.mouseLockListeners = [];
kha_Window.windows = [];
kha_WindowFeatures.None = 0;
kha_WindowFeatures.FeatureResizable = 1;
kha_WindowFeatures.FeatureMinimizable = 2;
kha_WindowFeatures.FeatureMaximizable = 4;
kha_WindowFeatures.FeatureBorderless = 8;
kha_WindowFeatures.FeatureOnTop = 16;
kha_audio2_Audio.disableGcInteractions = false;
kha_audio2_Audio.intBox = new kha_internal_IntBox(0);
kha_audio2_Audio1.channelCount = 32;
kha_audio2_Audio1.lastAllocationCount = 0;
kha_audio2_ogg_tools_Crc32.POLY = 79764919;
kha_audio2_ogg_vorbis_VorbisDecodeState.INVALID_BITS = -1;
kha_audio2_ogg_vorbis_VorbisTools.EOP = -1;
kha_audio2_ogg_vorbis_VorbisTools.M__PI = 3.14159265358979323846264;
kha_audio2_ogg_vorbis_VorbisTools.DIVTAB_NUMER = 32;
kha_audio2_ogg_vorbis_VorbisTools.DIVTAB_DENOM = 64;
kha_audio2_ogg_vorbis_VorbisTools.INVERSE_DB_TABLE = [1.0649863e-07,1.1341951e-07,1.2079015e-07,1.2863978e-07,1.3699951e-07,1.4590251e-07,1.5538408e-07,1.6548181e-07,1.7623575e-07,1.8768855e-07,1.9988561e-07,2.1287530e-07,2.2670913e-07,2.4144197e-07,2.5713223e-07,2.7384213e-07,2.9163793e-07,3.1059021e-07,3.3077411e-07,3.5226968e-07,3.7516214e-07,3.9954229e-07,4.2550680e-07,4.5315863e-07,4.8260743e-07,5.1396998e-07,5.4737065e-07,5.8294187e-07,6.2082472e-07,6.6116941e-07,7.0413592e-07,7.4989464e-07,7.9862701e-07,8.5052630e-07,9.0579828e-07,9.6466216e-07,1.0273513e-06,1.0941144e-06,1.1652161e-06,1.2409384e-06,1.3215816e-06,1.4074654e-06,1.4989305e-06,1.5963394e-06,1.7000785e-06,1.8105592e-06,1.9282195e-06,2.0535261e-06,2.1869758e-06,2.3290978e-06,2.4804557e-06,2.6416497e-06,2.8133190e-06,2.9961443e-06,3.1908506e-06,3.3982101e-06,3.6190449e-06,3.8542308e-06,4.1047004e-06,4.3714470e-06,4.6555282e-06,4.9580707e-06,5.2802740e-06,5.6234160e-06,5.9888572e-06,6.3780469e-06,6.7925283e-06,7.2339451e-06,7.7040476e-06,8.2047000e-06,8.7378876e-06,9.3057248e-06,9.9104632e-06,1.0554501e-05,1.1240392e-05,1.1970856e-05,1.2748789e-05,1.3577278e-05,1.4459606e-05,1.5399272e-05,1.6400004e-05,1.7465768e-05,1.8600792e-05,1.9809576e-05,2.1096914e-05,2.2467911e-05,2.3928002e-05,2.5482978e-05,2.7139006e-05,2.8902651e-05,3.0780908e-05,3.2781225e-05,3.4911534e-05,3.7180282e-05,3.9596466e-05,4.2169667e-05,4.4910090e-05,4.7828601e-05,5.0936773e-05,5.4246931e-05,5.7772202e-05,6.1526565e-05,6.5524908e-05,6.9783085e-05,7.4317983e-05,7.9147585e-05,8.4291040e-05,8.9768747e-05,9.5602426e-05,0.00010181521,0.00010843174,0.00011547824,0.00012298267,0.00013097477,0.00013948625,0.00014855085,0.00015820453,0.00016848555,0.00017943469,0.00019109536,0.00020351382,0.00021673929,0.00023082423,0.00024582449,0.00026179955,0.00027881276,0.00029693158,0.00031622787,0.00033677814,0.00035866388,0.00038197188,0.00040679456,0.00043323036,0.00046138411,0.00049136745,0.00052329927,0.00055730621,0.00059352311,0.00063209358,0.00067317058,0.00071691700,0.00076350630,0.00081312324,0.00086596457,0.00092223983,0.00098217216,0.0010459992,0.0011139742,0.0011863665,0.0012634633,0.0013455702,0.0014330129,0.0015261382,0.0016253153,0.0017309374,0.0018434235,0.0019632195,0.0020908006,0.0022266726,0.0023713743,0.0025254795,0.0026895994,0.0028643847,0.0030505286,0.0032487691,0.0034598925,0.0036847358,0.0039241906,0.0041792066,0.0044507950,0.0047400328,0.0050480668,0.0053761186,0.0057254891,0.0060975636,0.0064938176,0.0069158225,0.0073652516,0.0078438871,0.0083536271,0.0088964928,0.009474637,0.010090352,0.010746080,0.011444421,0.012188144,0.012980198,0.013823725,0.014722068,0.015678791,0.016697687,0.017782797,0.018938423,0.020169149,0.021479854,0.022875735,0.024362330,0.025945531,0.027631618,0.029427276,0.031339626,0.033376252,0.035545228,0.037855157,0.040315199,0.042935108,0.045725273,0.048696758,0.051861348,0.055231591,0.058820850,0.062643361,0.066714279,0.071049749,0.075666962,0.080584227,0.085821044,0.091398179,0.097337747,0.10366330,0.11039993,0.11757434,0.12521498,0.13335215,0.14201813,0.15124727,0.16107617,0.17154380,0.18269168,0.19456402,0.20720788,0.22067342,0.23501402,0.25028656,0.26655159,0.28387361,0.30232132,0.32196786,0.34289114,0.36517414,0.38890521,0.41417847,0.44109412,0.46975890,0.50028648,0.53279791,0.56742212,0.60429640,0.64356699,0.68538959,0.72993007,0.77736504,0.82788260,0.88168307,0.9389798,1.0];
kha_audio2_ogg_vorbis_data_Codebook.NO_CODE = 255;
kha_audio2_ogg_vorbis_data_Codebook.delay = 0;
kha_audio2_ogg_vorbis_data_Header.PACKET_ID = 1;
kha_audio2_ogg_vorbis_data_Header.PACKET_COMMENT = 3;
kha_audio2_ogg_vorbis_data_Header.PACKET_SETUP = 5;
kha_audio2_ogg_vorbis_data_PageFlag.CONTINUED_PACKET = 1;
kha_audio2_ogg_vorbis_data_PageFlag.FIRST_PAGE = 2;
kha_audio2_ogg_vorbis_data_PageFlag.LAST_PAGE = 4;
kha_audio2_ogg_vorbis_data_Setting.MAX_CHANNELS = 16;
kha_audio2_ogg_vorbis_data_Setting.PUSHDATA_CRC_COUNT = 4;
kha_audio2_ogg_vorbis_data_Setting.FAST_HUFFMAN_LENGTH = 10;
kha_audio2_ogg_vorbis_data_Setting.FAST_HUFFMAN_TABLE_SIZE = 1024;
kha_audio2_ogg_vorbis_data_Setting.FAST_HUFFMAN_TABLE_MASK = 1023;
kha_graphics2_Graphics.fontGlyphs = (function($this) {
	var $r;
	var _g = [];
	{
		var _g1 = 32;
		while(_g1 < 256) {
			var i = _g1++;
			_g.push(i);
		}
	}
	$r = _g;
	return $r;
}(this));
kha_graphics2_truetype_StbTruetype.STBTT_vmove = 1;
kha_graphics2_truetype_StbTruetype.STBTT_vline = 2;
kha_graphics2_truetype_StbTruetype.STBTT_vcurve = 3;
kha_graphics2_truetype_StbTruetype.STBTT_vcubic = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_DONTCARE = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_BOLD = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_ITALIC = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_UNDERSCORE = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MACSTYLE_NONE = 8;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_UNICODE = 0;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_MAC = 1;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_ISO = 2;
kha_graphics2_truetype_StbTruetype.STBTT_PLATFORM_ID_MICROSOFT = 3;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_1_0 = 0;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_1_1 = 1;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_ISO_10646 = 2;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_2_0_BMP = 3;
kha_graphics2_truetype_StbTruetype.STBTT_UNICODE_EID_UNICODE_2_0_FULL = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_SYMBOL = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_UNICODE_BMP = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_SHIFTJIS = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MS_EID_UNICODE_FULL = 10;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_ROMAN = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_ARABIC = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_JAPANESE = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_HEBREW = 5;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_CHINESE_TRAD = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_GREEK = 6;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_KOREAN = 3;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_EID_RUSSIAN = 7;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_ENGLISH = 1033;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_ITALIAN = 1040;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_CHINESE = 2052;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_JAPANESE = 1041;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_DUTCH = 1043;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_KOREAN = 1042;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_FRENCH = 1036;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_RUSSIAN = 1049;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_GERMAN = 1031;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_SPANISH = 1033;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_HEBREW = 1037;
kha_graphics2_truetype_StbTruetype.STBTT_MS_LANG_SWEDISH = 1053;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_ENGLISH = 0;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_JAPANESE = 11;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_ARABIC = 12;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_KOREAN = 23;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_DUTCH = 4;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_RUSSIAN = 32;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_FRENCH = 1;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_SPANISH = 6;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_GERMAN = 2;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_SWEDISH = 5;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_HEBREW = 10;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_CHINESE_SIMPLIFIED = 33;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_ITALIAN = 3;
kha_graphics2_truetype_StbTruetype.STBTT_MAC_LANG_CHINESE_TRAD = 19;
kha_graphics2_truetype_StbTruetype.STBTT_MAX_OVERSAMPLE = 8;
kha_graphics2_truetype_StbTruetype.STBTT_RASTERIZER_VERSION = 2;
kha_graphics4_ImageShaderPainter.bufferSize = 1500;
kha_graphics4_ImageShaderPainter.vertexSize = 9;
kha_graphics4_ColoredShaderPainter.bufferSize = 1000;
kha_graphics4_ColoredShaderPainter.triangleBufferSize = 1000;
kha_graphics4_TextShaderPainter.bufferSize = 1000;
kha_input_Gamepad.__meta__ = { statics : { sendConnectEvent : { input : null}, sendDisconnectEvent : { input : null}}, fields : { sendAxisEvent : { input : null}, sendButtonEvent : { input : null}}};
kha_input_Gamepad.instances = [];
kha_input_Gamepad.connectListeners = [];
kha_input_Gamepad.disconnectListeners = [];
kha_input_Keyboard.__meta__ = { fields : { sendDownEvent : { input : null}, sendUpEvent : { input : null}, sendPressEvent : { input : null}}};
kha_input_Keyboard.keyBehavior = kha_input_BlockInterventions.Default;
kha_input_Mouse.__meta__ = { fields : { sendLeaveEvent : { input : null}, sendDownEvent : { input : null}, sendUpEvent : { input : null}, sendMoveEvent : { input : null}, sendWheelEvent : { input : null}}};
kha_input_Mouse.wheelEventBlockBehavior = kha_input_MouseEventBlockBehavior.Full;
kha_input_Surface.touchDownEventBlockBehavior = kha_input_TouchDownEventBlockBehavior.Full;
kha_internal_BytesBlob.bufferSize = 2000;
kha_krom_Graphics.mat = (function($this) {
	var $r;
	var this1 = new Float32Array(16);
	$r = this1;
	return $r;
}(this));
kha_math_FastMatrix3.width = 3;
kha_math_FastMatrix3.height = 3;
kha_math_FastMatrix4.width = 4;
kha_math_FastMatrix4.height = 4;
kha_math_Matrix3.width = 3;
kha_math_Matrix3.height = 3;
kha_math_Matrix4.width = 4;
kha_math_Matrix4.height = 4;
kha_netsync_ControllerBuilder.nextId = 0;
kha_netsync_Session.START = 0;
kha_netsync_Session.ENTITY_UPDATES = 1;
kha_netsync_Session.CONTROLLER_UPDATES = 2;
kha_netsync_Session.REMOTE_CALL = 3;
kha_netsync_Session.PING = 4;
kha_netsync_Session.SESSION_ERROR = 5;
kha_netsync_Session.PLAYER_UPDATES = 6;
kha_netsync_Session.RPC_SERVER = 0;
kha_netsync_Session.RPC_ALL = 1;
kha_netsync_SyncBuilder.nextId = 0;
kha_netsync_SyncBuilder.objects = [];
zui_Ext.dataPath = "";
zui_Ext.lastPath = "";
zui_Ext._ELEMENT_OFFSET = 0;
zui_Ext._BUTTON_COL = 0;
zui_Ext.kx = 1.0;
zui_Ext.ky = 0.66666666666666663;
zui_Ext.kz = 0.33333333333333331;
zui_Ext.kw = 3.0;
zui_Ext.ar = [0.0,0.0,0.0];
zui_Ext.Kx = 0.0;
zui_Ext.Ky = -0.33333333333333331;
zui_Ext.Kz = 0.66666666666666663;
zui_Ext.Kw = -1.0;
zui_Ext.e = 1.0e-10;
zui_Id.i = 0;
zui_Themes.dark = { NAME : "Default Dark", WINDOW_BG_COL : -14079703, WINDOW_TINT_COL : -1, ACCENT_COL : -13027015, ACCENT_HOVER_COL : -12369085, ACCENT_SELECT_COL : -11513776, BUTTON_COL : -13092808, BUTTON_TEXT_COL : -1513499, BUTTON_HOVER_COL : -11974327, BUTTON_PRESSED_COL : -15000805, TEXT_COL : -1513499, LABEL_COL : -3618616, SEPARATOR_COL : -14671840, HIGHLIGHT_COL : -14656100, CONTEXT_COL : -14540254, PANEL_BG_COL : -12895429, FONT_SIZE : 13, ELEMENT_W : 100, ELEMENT_H : 24, ELEMENT_OFFSET : 4, ARROW_SIZE : 5, BUTTON_H : 22, CHECK_SIZE : 15, CHECK_SELECT_SIZE : 8, SCROLL_W : 6, TEXT_OFFSET : 8, TAB_W : 6, FILL_WINDOW_BG : false, FILL_BUTTON_BG : true, FILL_ACCENT_BG : false, LINK_STYLE : 0, FULL_TABS : false};
zui_Zui.alwaysRedrawWindow = true;
zui_Zui.keyRepeat = true;
zui_Zui.dynamicGlyphLoad = true;
zui_Zui.touchControls = false;
zui_Zui.keyRepeatTime = 0.0;
zui_Zui.textToPaste = "";
zui_Zui.textToCopy = "";
zui_Zui.isCut = false;
zui_Zui.isCopy = false;
zui_Zui.isPaste = false;
zui_Zui.copyFrame = 0;
zui_Zui.comboFirst = true;
Main.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
