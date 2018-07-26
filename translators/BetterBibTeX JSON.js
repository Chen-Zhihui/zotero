{
	"translatorID": "36a3b0b5-bad0-4a04-b79b-441c7cef77db",
	"label": "BetterBibTeX JSON",
	"creator": "Emiliano Heyns",
	"target": "json",
	"minVersion": "4.0.27",
	"maxVersion": "",
	"configOptions": {
		"async": true,
		"getCollections": true
	},
	"displayOptions": {
		"exportNotes": true,
		"exportFileData": false
	},
	"translatorType": 3,
	"browserSupport": "gcsv",
	"priority": 100,
	"inRepository": false,
	"lastUpdated": "2018-07-23 12:37:59"
}

var Translator = {
  initialize: function () {},
  version: "5.0.180",
  BetterBibTeXJSON: true,
  // header == ZOTERO_TRANSLATOR_INFO -- maybe pick it from there
  header: {"translatorID":"36a3b0b5-bad0-4a04-b79b-441c7cef77db","label":"BetterBibTeX JSON","description":"exports and imports references in BetterBibTeX debug format. Mostly for BBT-internal use","creator":"Emiliano Heyns","target":"json","minVersion":"4.0.27","maxVersion":"","configOptions":{"async":true,"getCollections":true},"displayOptions":{"exportNotes":true,"exportFileData":false},"translatorType":3,"browserSupport":"gcsv","priority":100,"inRepository":false,"lastUpdated":"2018-07-23 12:37:59"},
  preferences: {"debug":false,"rawLaTag":"#LaTeX","testing":false,"DOIandURL":"both","asciiBibLaTeX":false,"asciiBibTeX":true,"autoExport":"immediate","quickCopyMode":"latex","citeCommand":"cite","quickCopyPandocBrackets":false,"citekeyFormat":"​[auth:lower][shorttitle3_3][year]","citekeyFold":true,"keyConflictPolicy":"keep","keyScope":"library","preserveBibTeXVariables":false,"bibtexParticleNoOp":false,"skipFields":"","bibtexURL":"off","warnBulkModify":10,"postscript":"","strings":"","autoAbbrev":false,"autoAbbrevStyle":"","autoExportIdleWait":10,"cacheFlushInterval":5,"csquotes":"","skipWords":"a,ab,aboard,about,above,across,after,against,al,along,amid,among,an,and,anti,around,as,at,before,behind,below,beneath,beside,besides,between,beyond,but,by,d,da,das,de,del,dell,dello,dei,degli,della,dell,delle,dem,den,der,des,despite,die,do,down,du,during,ein,eine,einem,einen,einer,eines,el,en,et,except,for,from,gli,i,il,in,inside,into,is,l,la,las,le,les,like,lo,los,near,nor,of,off,on,onto,or,over,past,per,plus,round,save,since,so,some,sur,than,the,through,to,toward,towards,un,una,unas,under,underneath,une,unlike,uno,unos,until,up,upon,versus,via,von,while,with,within,without,yet,zu,zum","jabrefFormat":0,"jurismPreferredLanguage":"","qualityReport":false,"biblatexExtendedDateFormat":true,"biblatexExtendedNameFormat":false,"suppressTitleCase":false,"itemObserverDelay":100,"parseParticles":true,"citeprocNoteCitekey":false,"scrubDatabase":false,"lockedInit":false,"autoPin":false,"kuroshiro":false,"sorted":false,"debugLog":"","ajv":true},
  options: {"exportNotes":true,"exportFileData":false},

  stringCompare: (new Intl.Collator('en')).compare,

  configure: function(stage) {
    var version = Zotero.BetterBibTeX.version();
    this.isZotero = version.Zotero.isZotero;
    this.isJurisM = version.Zotero.isJurisM;

    this.BetterCSL = this.BetterCSLYAML || this.BetterCSLJSON;

    this.debugEnabled = Zotero.BetterBibTeX.debugEnabled();
    this.unicode = true; // set by Better Bib(La)TeX later

    if (stage == 'detectImport') {
      this.options = {}
    } else {
      this.references = []

      for (var key in this.options) {
        this.options[key] = Zotero.getOption(key)
      }
      // special handling
      this.options.exportPath = Zotero.getOption('exportPath')
      this.options.exportFilename = Zotero.getOption('exportFilename')
    }

    for (key in this.preferences) {
      this.preferences[key] = Zotero.getHiddenPref('better-bibtex.' + key)
    }
    // special handling
    this.preferences.skipWords = this.preferences.skipWords.toLowerCase().trim().split(/\s*,\s*/).filter(function(s) { return s })
    this.preferences.skipFields = this.preferences.skipFields.toLowerCase().trim().split(/\s*,\s*/).filter(function(s) { return s })
    if (!this.preferences.rawLaTag) this.preferences.rawLaTag = '#LaTeX'

    this.collections = {}
    if (stage == 'doExport' && this.header.configOptions && this.header.configOptions.getCollections && Zotero.nextCollection) {
      let collection
      while (collection = Zotero.nextCollection()) {
        let children = collection.children || collection.descendents || []
        let key = (collection.primary ? collection.primary : collection).key

        this.collections[key] = {
          id: collection.id,
          key: key,
          parent: collection.fields.parentKey,
          name: collection.name,
          items: collection.childItems,
          collections: children.filter(function(coll) { return coll.type === 'collection'}).map(function(coll) { return coll.key}),
          // items: (item.itemID for item in children when item.type != 'collection')
          // descendents: undefined
          // children: undefined
          // childCollections: undefined
          // primary: undefined
          // fields: undefined
          // type: undefined
          // level: undefined
        }
      }
      for (const collection of Object.values(this.collections)) {
        if (collection.parent && !this.collections[collection.parent]) {
          collection.parent = false
          Zotero.debug('BBT translator: collection with key ' + collection.key + ' has non-existent parent ' + collection.parent + ', assuming root collection')
        }
      }
    }
  }
};


  function doExport() {
    Translator.configure('doExport')
    Translator.initialize()
    Translator.doExport()
  }



  function detectImport() {
    Translator.configure('detectImport')
    return Translator.detectImport()
  }
  function doImport() {
    Translator.configure('doImport')
    Translator.initialize()
    return Translator.doImport()
  }

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************************!*\
  !*** ./BetterBibTeX JSON.ts ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/BetterBibTeX JSON.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __webpack_require__(/*! ./lib/debug */ 1);
const chunkSize = 0x100000;
Translator.detectImport = () => {
    let str;
    debug_1.debug('BetterBibTeX JSON.detect: start');
    let json = '';
    while ((str = Zotero.read(chunkSize)) !== false) {
        json += str;
        if (json[0] !== '{')
            return false;
    }
    // a failure to parse will throw an error which a) is actually logged, and b) will count as "false"
    const data = JSON.parse(json);
    if (!data.config || (data.config.id !== Translator.header.translatorID))
        throw new Error(`ID mismatch: got ${data.config && data.config.id}, expected ${Translator.header.translatorID}`);
    if (!data.items || !data.items.length)
        throw new Error('No items');
    return true;
};
Translator.doImport = async () => {
    let str;
    let json = '';
    while ((str = Zotero.read(chunkSize)) !== false) {
        json += str;
    }
    const data = JSON.parse(json);
    const validFields = Zotero.BetterBibTeX.validFields();
    const items = new Set;
    debug_1.debug('importing', data.items.length, 'items');
    for (const source of data.items) {
        Zotero.BetterBibTeX.simplifyFields(source);
        // I do export these but the cannot be imported back
        delete source.relations;
        delete source.citekey;
        delete source.uri;
        if (!validFields[source.itemType])
            throw new Error(`unexpected item type '${source.itemType}'`);
        for (const field of Object.keys(source)) {
            if (!validFields[source.itemType][field])
                throw new Error(`unexpected ${source.itemType}.${field} in ${JSON.stringify(source)}`);
        }
        const item = new Zotero.Item();
        Object.assign(item, source);
        for (const att of item.attachments || []) {
            if (att.url)
                delete att.path;
            delete att.relations;
            delete att.uri;
        }
        await item.complete();
        items.add(source.itemID);
        Zotero.setProgress(items.size / data.items.length * 100); // tslint:disable-line:no-magic-numbers
    }
    Zotero.setProgress(100); // tslint:disable-line:no-magic-numbers
    const collections = Object.values(data.collections || {});
    for (const collection of collections) {
        collection.zoteroCollection = (new Zotero.Collection());
        collection.zoteroCollection.type = 'collection';
        collection.zoteroCollection.name = collection.name;
        collection.zoteroCollection.children = collection.items.filter(id => {
            if (items.has(id))
                return true;
            debug_1.debug(`Collection ${collection.key} has non-existent item ${id}`);
            return false;
        }).map(id => ({ type: 'item', id }));
    }
    for (const collection of collections) {
        if (collection.parent && data.collections[collection.parent]) {
            data.collections[collection.parent].zoteroCollection.children.push(collection.zoteroCollection);
        }
        else {
            if (collection.parent)
                debug_1.debug(`Collection ${collection.key} has non-existent parent ${collection.parent}`);
            collection.parent = false;
        }
    }
    for (const collection of collections) {
        if (collection.parent)
            continue;
        collection.zoteroCollection.complete();
    }
};
Translator.doExport = () => {
    let item;
    debug_1.debug('starting export');
    const data = {
        config: {
            id: Translator.header.translatorID,
            label: Translator.header.label,
            release: Zotero.BetterBibTeX.version(),
            preferences: Translator.preferences,
            options: Translator.options,
        },
        collections: Translator.collections,
        items: [],
    };
    debug_1.debug('header ready');
    const validFields = Zotero.BetterBibTeX.validFields();
    const validItemFields = new Set([
        'citekey',
        'uri',
        'relations',
    ]);
    const validAttachmentFields = new Set(['relations', 'uri', 'itemType', 'title', 'path', 'tags', 'dateAdded', 'dateModified', 'seeAlso', 'mimeType']);
    while ((item = Zotero.nextItem())) {
        Zotero.BetterBibTeX.simplifyFields(item);
        item.relations = item.relations ? (item.relations['dc:relation'] || []) : [];
        for (const field of Object.keys(item)) {
            if (validItemFields.has(field))
                continue;
            if (validFields[item.itemType] && !validFields[item.itemType][field]) {
                debug_1.debug('bbt json: delete', item.itemType, field, item[field]);
                delete item[field];
            }
        }
        for (const att of item.attachments || []) {
            att.path = att.localpath;
            for (const field of Object.keys(att)) {
                att.relations = att.relations ? (att.relations['dc:relation'] || []) : [];
                if (!validAttachmentFields.has(field))
                    delete att[field];
            }
        }
        if (item.relations)
            debug_1.debug('adding item', item);
        data.items.push(item);
    }
    debug_1.debug('data ready');
    Zotero.write(JSON.stringify(data, null, '  '));
    debug_1.debug('export done');
};
; Zotero.debug('BBT: loaded translators/BetterBibTeX JSON.ts'); } catch ($wrap_loader_catcher_translators_BetterBibTeX_JSON_ts) { Zotero.logError('Error: BBT: load of translators/BetterBibTeX JSON.ts failed:' + $wrap_loader_catcher_translators_BetterBibTeX_JSON_ts + '::' + $wrap_loader_catcher_translators_BetterBibTeX_JSON_ts.stack) };

/***/ }),
/* 1 */
/*!**********************!*\
  !*** ./lib/debug.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

Zotero.debug('BBT: loading translators/lib/debug.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { format } from '../../content/debug-formatter'
function debug(...msg) {
    // if (!Translator.debugEnabled && !Translator.preferences.testing) return
    // Zotero.debug(format(`better-bibtex:${Translator.header.label}`, msg))
    Zotero.BetterBibTeX.debug(Translator.header.label, ...msg);
}
exports.debug = debug;
; Zotero.debug('BBT: loaded translators/lib/debug.ts'); } catch ($wrap_loader_catcher_translators_lib_debug_ts) { Zotero.logError('Error: BBT: load of translators/lib/debug.ts failed:' + $wrap_loader_catcher_translators_lib_debug_ts + '::' + $wrap_loader_catcher_translators_lib_debug_ts.stack) };

/***/ })
/******/ ]);
