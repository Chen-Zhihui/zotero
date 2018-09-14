{
	"translatorID": "f4b52ab0-f878-4556-85a0-c7aeedd09dfc",
	"label": "Better CSL JSON",
	"creator": "Emiliano heyns",
	"target": "json",
	"minVersion": "4.0.27",
	"maxVersion": "",
	"displayOptions": {
		"keepUpdated": false
	},
	"translatorType": 2,
	"browserSupport": "gcsv",
	"inRepository": false,
	"priority": 100,
	"lastUpdated": "2018-09-07 18:14:21"
}

var Translator = {
  initialize: function () {},
  version: "5.0.201",
  BetterCSLJSON: true,
  // header == ZOTERO_TRANSLATOR_INFO -- maybe pick it from there
  header: {"translatorID":"f4b52ab0-f878-4556-85a0-c7aeedd09dfc","label":"Better CSL JSON","description":"exports references in pandoc-compatible CSL-JSON format, with added citation keys and parsing of metadata","creator":"Emiliano heyns","target":"json","minVersion":"4.0.27","maxVersion":"","displayOptions":{"keepUpdated":false},"translatorType":2,"browserSupport":"gcsv","inRepository":false,"priority":100,"lastUpdated":"2018-09-07 18:14:21"},
  override: {"DOIandURL":true,"asciiBibLaTeX":true,"asciiBibTeX":true,"autoAbbrev":false,"autoAbbrevStyle":false,"autoExport":false,"autoExportIdleWait":false,"autoPin":false,"biblatexExtendedDateFormat":false,"biblatexExtendedNameFormat":true,"bibtexParticleNoOp":true,"bibtexURL":true,"cacheFlushInterval":false,"citeCommand":false,"citekeyFold":false,"citekeyFormat":false,"citeprocNoteCitekey":false,"csquotes":false,"debug":false,"debugLog":false,"itemObserverDelay":false,"jabrefFormat":false,"jurismPreferredLanguage":false,"keyConflictPolicy":false,"keyScope":false,"kuroshiro":false,"lockedInit":false,"parseParticles":false,"postscript":false,"preserveBibTeXVariables":false,"qualityReport":false,"quickCopyMode":false,"quickCopyPandocBrackets":false,"rawLaTag":false,"scrubDatabase":false,"skipFields":false,"skipWords":false,"sorted":false,"strings":false,"suppressTitleCase":false,"testing":false,"warnBulkModify":false},
  options: {"keepUpdated":false},

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
      if (stage == 'doImport') this.pathSep = (Zotero.BetterBibTeX.platform().toLowerCase().startsWith('win')) ? '\\' : '/'

      this.references = []

      for (var key in this.options) {
        if (typeof this.options[key] === 'boolean') {
          this.options[key] = !!Zotero.getOption(key)
        } else {
          this.options[key] = Zotero.getOption(key)
        }
      }
      // special handling
      this.options.exportPath = Zotero.getOption('exportPath')
      this.options.exportFilename = Zotero.getOption('exportFilename')
    }

    this.preferences = {}
    for (const [pref, override] of Object.entries(this.override)) {
      let value = undefined

      if (override) {
        try {
          value = Zotero.getOption(`preference_${pref}`)
        } catch (err) {
          value = undefined
        }
      }

      if (typeof value === 'undefined') value = Zotero.getHiddenPref('better-bibtex.' + pref)
      this.preferences[pref] = value
    }
    // special handling
    this.preferences.skipWords = this.preferences.skipWords.toLowerCase().trim().split(/\s*,\s*/).filter(function(s) { return s })
    this.preferences.skipFields = this.preferences.skipFields.toLowerCase().trim().split(/\s*,\s*/).filter(function(s) { return s })
    if (!this.preferences.rawLaTag) this.preferences.rawLaTag = '#LaTeX'
    Zotero.debug('prefs loaded: ' + JSON.stringify(this.preferences, null, 2))

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
    const start = Date.now()
    Translator.configure('doExport')
    Translator.initialize()
    Translator.doExport()
    Zotero.debug("Better CSL JSON" + ' export took ' + (Date.now() - start))
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./Better CSL JSON.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Better CSL JSON.ts":
/*!****************************!*\
  !*** ./Better CSL JSON.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/Better CSL JSON.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csl_1 = __webpack_require__(/*! ./csl/csl */ "./csl/csl.ts");
function date2csl(date) {
    switch (date.type) {
        case 'open':
            return [0];
        case 'date':
            const csl = [date.year > 0 ? date.year : date.year - 1];
            if (date.month) {
                csl.push(date.month);
                if (date.day) {
                    csl.push(date.day);
                }
            }
            return csl;
        case 'season':
            // https://github.com/retorquere/zotero-better-bibtex/issues/860
            return [date.year > 0 ? date.year : date.year - 1, date.season + 12]; // tslint:disable-line:no-magic-numbers
        default:
            throw new Error(`Expected date or open, got ${date.type}`);
    }
}
csl_1.CSLExporter.date2CSL = date => {
    switch (date.type) {
        case 'date':
            return {
                'date-parts': [date2csl(date)],
                circa: (date.approximate || date.uncertain) ? true : undefined,
            };
        case 'interval':
            return {
                'date-parts': [date2csl(date.from), date2csl(date.to)],
                circa: (date.from.approximate || date.from.uncertain || date.to.approximate || date.to.uncertain) ? true : undefined,
            };
        case 'verbatim':
            return { literal: date.verbatim };
        case 'season':
            return {
                'date-parts': [[date.year]],
                season: date.season,
                circa: (date.approximate || date.uncertain) ? true : undefined,
            };
        default:
            throw new Error(`Unexpected date type ${JSON.stringify(date)}`);
    }
};
csl_1.CSLExporter.serialize = csl => JSON.stringify(csl);
csl_1.CSLExporter.flush = items => `[\n${(items.map(item => `  ${item}`)).join(',\n')}\n]\n`;
Translator.initialize = () => csl_1.CSLExporter.initialize();
Translator.doExport = () => csl_1.CSLExporter.doExport();
; Zotero.debug('BBT: loaded translators/Better CSL JSON.ts'); } catch ($wrap_loader_catcher_translators_Better_CSL_JSON_ts) { Zotero.logError('Error: BBT: load of translators/Better CSL JSON.ts failed:' + $wrap_loader_catcher_translators_Better_CSL_JSON_ts + '::' + $wrap_loader_catcher_translators_Better_CSL_JSON_ts.stack) };

/***/ }),

/***/ "./csl/csl.ts":
/*!********************!*\
  !*** ./csl/csl.ts ***!
  \********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/csl/csl.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __webpack_require__(/*! ../lib/debug */ "./lib/debug.ts");
const validCSLTypes = [
    'article',
    'article-magazine',
    'article-newspaper',
    'article-journal',
    'review',
    'review-book',
    'bill',
    'broadcast',
    'dataset',
    'figure',
    'graphic',
    'interview',
    'legislation',
    'legal_case',
    'map',
    'motion_picture',
    'musical_score',
    'patent',
    'post',
    'post-weblog',
    'personal_communication',
    'song',
    'speech',
    'treaty',
    'webpage',
    'book',
    'chapter',
    'entry',
    'entry-dictionary',
    'entry-encyclopedia',
    'manuscript',
    'pamphlet',
    'paper-conference',
    'report',
    'thesis',
];
// export singleton: https://k94n.com/es6-modules-single-instance-pattern
exports.CSLExporter = new class {
    initialize() {
        const postscript = Translator.preferences.postscript;
        if (typeof postscript === 'string' && postscript.trim() !== '') {
            try {
                this.postscript = new Function('reference', 'item', postscript);
                Zotero.debug(`Installed postscript: ${JSON.stringify(postscript)}`);
            }
            catch (err) {
                Zotero.debug(`Failed to compile postscript: ${err}\n\n${JSON.stringify(postscript)}`);
            }
        }
    }
    postscript(reference, item) { } // tslint:disable-line:no-empty
    doExport() {
        const items = [];
        let item;
        while (item = Zotero.nextItem()) {
            if (item.itemType === 'note' || item.itemType === 'attachment')
                continue;
            let cached;
            if (cached = Zotero.BetterBibTeX.cacheFetch(item.itemID, Translator.options, Translator.preferences)) {
                items.push(cached.reference);
                continue;
            }
            Zotero.BetterBibTeX.simplifyFields(item);
            Object.assign(item, Zotero.BetterBibTeX.extractFields(item));
            if (item.accessDate) { // WTH is Juris-M doing with those dates?
                item.accessDate = item.accessDate.replace(/T?[0-9]{2}:[0-9]{2}:[0-9]{2}.*/, '').trim();
            }
            let csl = Zotero.Utilities.itemToCSLJSON(item);
            // 637
            delete csl['publisher-place'];
            delete csl['archive-place'];
            delete csl['event-place'];
            delete csl['original-publisher-place'];
            delete csl['publisher-place'];
            if (item.place)
                csl[item.itemType === 'presentation' ? 'event-place' : 'publisher-place'] = item.place;
            // https://github.com/retorquere/zotero-better-bibtex/issues/811#issuecomment-347165389
            if (item.ISBN)
                csl.ISBN = item.ISBN;
            delete csl.authority;
            if (item.itemType === 'videoRecording' && csl.type === 'video')
                csl.type = 'motion_picture';
            if (item.date) {
                const parsed = Zotero.BetterBibTeX.parseDate(item.date);
                if (parsed.type)
                    csl.issued = this.date2CSL(parsed); // possible for there to be an orig-date only
                if (parsed.orig)
                    csl['original-date'] = this.date2CSL(parsed.orig);
            }
            if (item.accessDate)
                csl.accessed = this.date2CSL(Zotero.BetterBibTeX.parseDate(item.accessDate));
            debug_1.debug('extracted:', item.extraFields);
            for (let [name, { type, value }] of Object.entries(item.extraFields.csl)) {
                switch (name) {
                    case 'type':
                        if (validCSLTypes.includes(value))
                            csl.type = value;
                        continue;
                    case 'doi':
                    case 'isbn':
                    case 'issn':
                    case 'pmcid':
                    case 'pmid':
                    case 'url':
                        name = name.toUpperCase();
                        break;
                }
                switch (type) {
                    case 'date':
                        csl[name] = this.date2CSL(Zotero.BetterBibTeX.parseDate(value));
                        break;
                    case 'creator':
                        csl[name] = [];
                        for (let creator of value) {
                            if (creator.name) {
                                csl[name].push({ literal: creator.name });
                            }
                            else {
                                creator = { family: creator.name || creator.lastName || '', given: creator.firstName || '', isInstitution: ((creator.name || creator.fieldMode === 1) ? 1 : undefined) };
                                Zotero.BetterBibTeX.parseParticles(creator);
                                csl[name].push(creator);
                            }
                        }
                        break;
                    default:
                        csl[name] = value;
                }
            }
            [csl.shortTitle, csl['title-short']] = [csl['title-short'], csl.shortTitle]; // ; here for disambiguation
            [csl.journalAbbreviation, csl['container-title-short']] = [csl['container-title-short'], csl.journalAbbreviation];
            /* ham-fisted workaround for #365 */
            if ((csl.type === 'motion_picture' || csl.type === 'broadcast') && csl.author && !csl.director)
                [csl.author, csl.director] = [csl.director, csl.author];
            csl.id = item.citekey;
            /* Juris-M workarounds to match Zotero as close as possible */
            for (const kind of ['translator', 'author', 'editor', 'director', 'reviewed-author']) {
                for (const creator of csl[kind] || []) {
                    delete creator.multi;
                }
            }
            delete csl.multi;
            delete csl.system_id;
            if (csl.type === 'broadcast' && csl.genre === 'television broadcast')
                delete csl.genre;
            this.postscript(csl, item);
            csl = this.serialize(csl);
            Zotero.BetterBibTeX.cacheStore(item.itemID, Translator.options, Translator.preferences, csl);
            items.push(csl);
        }
        Zotero.write(this.flush(items));
    }
};
; Zotero.debug('BBT: loaded translators/csl/csl.ts'); } catch ($wrap_loader_catcher_translators_csl_csl_ts) { Zotero.logError('Error: BBT: load of translators/csl/csl.ts failed:' + $wrap_loader_catcher_translators_csl_csl_ts + '::' + $wrap_loader_catcher_translators_csl_csl_ts.stack) };

/***/ }),

/***/ "./lib/debug.ts":
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

/******/ });
