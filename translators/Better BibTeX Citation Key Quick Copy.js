{
	"translatorID": "a515a220-6fef-45ea-9842-8025dfebcc8f",
	"label": "Better BibTeX Citation Key Quick Copy",
	"creator": "Emiliano heyns",
	"target": "txt",
	"minVersion": "4.0.27",
	"translatorType": 2,
	"browserSupport": "gcsv",
	"priority": 100,
	"displayOptions": {
		"quickCopyMode": ""
	},
	"inRepository": false,
	"lastUpdated": "2018-07-23 12:38:09"
}

var Translator = {
  initialize: function () {},
  version: "5.0.180",
  BetterBibTeXCitationKeyQuickCopy: true,
  // header == ZOTERO_TRANSLATOR_INFO -- maybe pick it from there
  header: {"translatorID":"a515a220-6fef-45ea-9842-8025dfebcc8f","label":"Better BibTeX Citation Key Quick Copy","description":"exports citations to be copy-pasted into your LaTeX/Markdown /Org-mode/etc documents","creator":"Emiliano heyns","target":"txt","minVersion":"4.0.27","translatorType":2,"browserSupport":"gcsv","priority":100,"displayOptions":{"quickCopyMode":""},"inRepository":false,"lastUpdated":"2018-07-23 12:38:09"},
  preferences: {"debug":false,"rawLaTag":"#LaTeX","testing":false,"DOIandURL":"both","asciiBibLaTeX":false,"asciiBibTeX":true,"autoExport":"immediate","quickCopyMode":"latex","citeCommand":"cite","quickCopyPandocBrackets":false,"citekeyFormat":"​[auth:lower][shorttitle3_3][year]","citekeyFold":true,"keyConflictPolicy":"keep","keyScope":"library","preserveBibTeXVariables":false,"bibtexParticleNoOp":false,"skipFields":"","bibtexURL":"off","warnBulkModify":10,"postscript":"","strings":"","autoAbbrev":false,"autoAbbrevStyle":"","autoExportIdleWait":10,"cacheFlushInterval":5,"csquotes":"","skipWords":"a,ab,aboard,about,above,across,after,against,al,along,amid,among,an,and,anti,around,as,at,before,behind,below,beneath,beside,besides,between,beyond,but,by,d,da,das,de,del,dell,dello,dei,degli,della,dell,delle,dem,den,der,des,despite,die,do,down,du,during,ein,eine,einem,einen,einer,eines,el,en,et,except,for,from,gli,i,il,in,inside,into,is,l,la,las,le,les,like,lo,los,near,nor,of,off,on,onto,or,over,past,per,plus,round,save,since,so,some,sur,than,the,through,to,toward,towards,un,una,unas,under,underneath,une,unlike,uno,unos,until,up,upon,versus,via,von,while,with,within,without,yet,zu,zum","jabrefFormat":0,"jurismPreferredLanguage":"","qualityReport":false,"biblatexExtendedDateFormat":true,"biblatexExtendedNameFormat":false,"suppressTitleCase":false,"itemObserverDelay":100,"parseParticles":true,"citeprocNoteCitekey":false,"scrubDatabase":false,"lockedInit":false,"autoPin":false,"kuroshiro":false,"sorted":false,"debugLog":"","ajv":true},
  options: {"quickCopyMode":""},

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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

/***/ }),
/* 1 */
/*!**************************************************!*\
  !*** ./Better BibTeX Citation Key Quick Copy.ts ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/Better BibTeX Citation Key Quick Copy.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format = __webpack_require__(/*! string-template */ 2);
const exporter_1 = __webpack_require__(/*! ./lib/exporter */ 3);
function select_link(item, mode) {
    switch (mode) {
        case 'id': return `zotero://select/items/${item.itemID}`;
        case 'citekey': return `zotero://select/items/@${encodeURIComponent(item.citekey)}`;
        default: throw new Error(`Unsupported link mode ${mode}`);
    }
}
const Mode = {
    gitbook(items) {
        const citations = items.map(item => `{{ \"${item.citekey}\" | cite }}`);
        Zotero.write(citations.join(''));
    },
    atom(items) {
        const keys = items.map(item => item.citekey);
        if (keys.length === 1) {
            Zotero.write(`[](#@${keys[0]})`);
        }
        else {
            Zotero.write(`[](?@${keys.join(',')})`);
        }
    },
    latex(items) {
        const keys = items.map(item => item.citekey);
        const cmd = `${Translator.preferences.citeCommand}`.trim();
        if (cmd === '') {
            Zotero.write(keys.join(','));
        }
        else {
            Zotero.write(`\\${cmd}{${keys.join(',')}}`);
        }
    },
    citekeys(items) {
        const keys = items.map(item => item.citekey);
        Zotero.write(keys.join(','));
    },
    pandoc(items) {
        let keys = items.map(item => `@${item.citekey}`);
        keys = keys.join('; ');
        if (Translator.preferences.quickCopyPandocBrackets)
            keys = `[${keys}]`;
        Zotero.write(keys);
    },
    orgRef(items) {
        if (!items.length)
            return '';
        Zotero.write(`cite:${items.map(item => item.citekey).join(',')}`);
    },
    orgmode(items) {
        for (const item of items) {
            Zotero.write(`[[${select_link(item, 'id')}][@${item.citekey}]]`);
        }
    },
    orgmode_citekey(items) {
        for (const item of items) {
            Zotero.write(`[[${select_link(item, 'citekey')}][@${item.citekey}]]`);
        }
    },
    selectLink(items) {
        Zotero.write(items.map(item => select_link(item, 'id')).join('\n'));
    },
    selectLink_citekey(items) {
        Zotero.write(items.map(item => select_link(item, 'citekey')).join('\n'));
    },
    rtfScan(items) {
        const reference = items.map(item => {
            const ref = [];
            // author
            const creators = item.creators || [];
            const creator = creators[0] || {};
            let name = creator.name || creator.lastName || 'no author';
            if (creators.length > 1)
                name += ' et al.';
            ref.push(name);
            // title
            if (item.title)
                ref.push(JSON.stringify(item.title));
            // year
            if (item.date) {
                let date = Zotero.BetterBibTeX.parseDate(item.date);
                if (date.type === 'interval')
                    date = date.from;
                if (date.type === 'verbatim' || !date.year) {
                    ref.push(item.date);
                }
                else {
                    ref.push(date.year);
                }
            }
            else {
                ref.push('no date');
            }
            return ref.join(', ');
        });
        Zotero.write(`{${reference.join('; ')}}`);
    },
    'string-template'(items) {
        try {
            const { citation, item, sep } = JSON.parse(Translator.preferences.citeCommand);
            Zotero.write(format(citation || '{citation}', { citation: items.map(i => format(item || '{item}', { item: i })).join(sep || '') }));
        }
        catch (err) {
            Zotero.write(`${err}`);
        }
    },
};
Translator.doExport = () => {
    let item;
    const items = [];
    while ((item = exporter_1.Exporter.nextItem())) {
        items.push(item);
    }
    const mode = Mode[`${Translator.options.quickCopyMode}`] || Mode[`${Translator.preferences.quickCopyMode}`];
    if (mode) {
        mode.call(null, items);
    }
    else {
        throw new Error(`Unsupported Quick Copy format '${Translator.options.quickCopyMode || Translator.preferences.quickCopyMode}', I only know about: ${Object.keys(Mode).join(', ')}`);
    }
};
; Zotero.debug('BBT: loaded translators/Better BibTeX Citation Key Quick Copy.ts'); } catch ($wrap_loader_catcher_translators_Better_BibTeX_Citation_Key_Quick_Copy_ts) { Zotero.logError('Error: BBT: load of translators/Better BibTeX Citation Key Quick Copy.ts failed:' + $wrap_loader_catcher_translators_Better_BibTeX_Citation_Key_Quick_Copy_ts + '::' + $wrap_loader_catcher_translators_Better_BibTeX_Citation_Key_Quick_Copy_ts.stack) };

/***/ }),
/* 2 */
/*!************************************************!*\
  !*** ../node_modules/string-template/index.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var nargs = /\{([0-9a-zA-Z_]+)\}/g

module.exports = template

function template(string) {
    var args

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = new Array(arguments.length - 1)
        for (var i = 1; i < arguments.length; ++i) {
            args[i - 1] = arguments[i]
        }
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === "{" &&
            string[index + match.length] === "}") {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}


/***/ }),
/* 3 */
/*!*************************!*\
  !*** ./lib/exporter.ts ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/lib/exporter.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jabref_1 = __webpack_require__(/*! ../bibtex/jabref */ 4); // not so nice... BibTeX-specific code
const debug_1 = __webpack_require__(/*! ../lib/debug */ 0);
// export singleton: https://k94n.com/es6-modules-single-instance-pattern
exports.Exporter = new class {
    constructor() {
        this.attachmentCounter = 0;
        this.preamble = { DeclarePrefChars: '' };
        this.caching = !Translator.options.exportFileData;
        this.jabref = new jabref_1.JabRef();
    }
    unique_chars(str) {
        let uniq = '';
        for (const c of str) {
            if (uniq.indexOf(c) < 0)
                uniq += c;
        }
        return uniq;
    }
    nextItem() {
        let item;
        while (item = Zotero.nextItem()) {
            if (['note', 'attachment'].includes(item.itemType))
                continue;
            debug_1.debug('fetched item:', item);
            if (!item.citekey) {
                debug_1.debug(new Error('No citation key found in'), item);
                throw new Error(`No citation key in ${JSON.stringify(item)}`);
            }
            this.jabref.citekeys.set(item.itemID, item.citekey);
            const cached = Zotero.BetterBibTeX.cacheFetch(item.itemID, Translator.options);
            if (cached) {
                if (Translator.preferences.sorted && (Translator.BetterBibTeX || Translator.BetterBibLaTeX)) {
                    Translator.references.push({ citekey: item.citekey, reference: cached.reference });
                }
                else {
                    Zotero.write(cached.reference);
                }
                if (cached.metadata && cached.metadata.DeclarePrefChars)
                    this.preamble.DeclarePrefChars += cached.metadata.DeclarePrefChars;
                continue;
            }
            debug_1.debug('pre-simplify', item);
            Zotero.BetterBibTeX.simplifyFields(item);
            debug_1.debug('post-simplify', item);
            Object.assign(item, Zotero.BetterBibTeX.extractFields(item));
            debug_1.debug('exporting', item);
            return item;
        }
        return null;
    }
    // TODO: move to bibtex-exporters
    complete() {
        debug_1.debug('sorted:', { prefs: Translator.preferences, bbt: Translator.BetterBibTeX, bbl: Translator.BetterBibLaTeX });
        if (Translator.preferences.sorted && (Translator.BetterBibTeX || Translator.BetterBibLaTeX)) {
            Translator.references.sort((a, b) => Translator.stringCompare(a.citekey, b.citekey));
            Zotero.write(Translator.references.map(ref => ref.reference).join(''));
        }
        debug_1.debug('Exporter.complete: write JabRef groups');
        this.jabref.exportGroups();
        let preamble = [];
        if (this.preamble.DeclarePrefChars)
            preamble.push("\\ifdefined\\DeclarePrefChars\\DeclarePrefChars{'’-}\\else\\fi");
        if (this.preamble.noopsort)
            preamble.push('\\newcommand{\\noopsort}[1]{}');
        if (preamble.length > 0) {
            preamble = preamble.map(cmd => `"${cmd} "`);
            Zotero.write(`@preamble{ ${preamble.join(' \n # ')} }\n`);
        }
    }
};
; Zotero.debug('BBT: loaded translators/lib/exporter.ts'); } catch ($wrap_loader_catcher_translators_lib_exporter_ts) { Zotero.logError('Error: BBT: load of translators/lib/exporter.ts failed:' + $wrap_loader_catcher_translators_lib_exporter_ts + '::' + $wrap_loader_catcher_translators_lib_exporter_ts.stack) };

/***/ }),
/* 4 */
/*!**************************!*\
  !*** ./bibtex/jabref.ts ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/bibtex/jabref.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __webpack_require__(/*! ../lib/debug */ 0);
class JabRef {
    constructor() {
        this.citekeys = new Map;
    }
    exportGroups() {
        if ((Object.keys(Translator.collections).length === 0) || !Translator.preferences.jabrefFormat)
            return;
        let meta;
        if (Translator.preferences.jabrefFormat === 3) { // tslint:disable-line:no-magic-numbers
            meta = 'groupsversion:3';
        }
        else if (Translator.BetterBibLaTeX) {
            meta = 'databaseType:biblatex';
        }
        else {
            meta = 'databaseType:bibtex';
        }
        Zotero.write(`@comment{jabref-meta: ${meta};}\n`);
        Zotero.write('@comment{jabref-meta: groupstree:\n');
        this.groups = ['0 AllEntriesGroup:'];
        for (const collection of Object.values(Translator.collections)) {
            if (collection.parent)
                continue;
            this.exportGroup(collection, 1);
        }
        Zotero.write(this.groups.map(group => this.quote(group, true)).concat('').join(';\n'));
        Zotero.write('}\n');
    }
    exportGroup(collection, level) {
        let group = [`${level} ExplicitGroup:${this.quote(collection.name)}`, '0'];
        if (Translator.preferences.jabrefFormat === 3) { // tslint:disable-line:no-magic-numbers
            const references = ((collection.items || []).filter(id => this.citekeys.has(id)).map(id => this.quote(this.citekeys.get(id))));
            if (Translator.preferences.testing)
                references.sort();
            group = group.concat(references);
        }
        // what is the meaning of the empty cell at the end, JabRef?
        group.push('');
        this.groups.push(group.join(';'));
        for (const key of collection.collections || []) {
            if (Translator.collections[key])
                this.exportGroup(Translator.collections[key], level + 1);
        }
    }
    quote(s, wrap = false) {
        s = s.replace(/([\\;])/g, '\\$1');
        debug_1.debug('JabRef.quote:', s);
        if (wrap)
            s = s.match(/.{1,70}/g).join('\n');
        return s;
    }
}
exports.JabRef = JabRef;
; Zotero.debug('BBT: loaded translators/bibtex/jabref.ts'); } catch ($wrap_loader_catcher_translators_bibtex_jabref_ts) { Zotero.logError('Error: BBT: load of translators/bibtex/jabref.ts failed:' + $wrap_loader_catcher_translators_bibtex_jabref_ts + '::' + $wrap_loader_catcher_translators_bibtex_jabref_ts.stack) };

/***/ })
/******/ ]);
