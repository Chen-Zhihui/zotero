{
	"translatorID": "f895aa0d-f28e-47fe-b247-2ea77c6ed583",
	"translatorType": 2,
	"label": "Better BibLaTeX",
	"creator": "Simon Kornblith, Richard Karnesky, Anders Johansson and Emiliano Heyns",
	"target": "bib",
	"minVersion": "4.0.27",
	"maxVersion": "",
	"configOptions": {
		"getCollections": true
	},
	"displayOptions": {
		"exportNotes": false,
		"exportFileData": false,
		"useJournalAbbreviation": false,
		"keepUpdated": false
	},
	"priority": 50,
	"inRepository": false,
	"lastUpdated": "2018-08-27 16:44:00"
}

var Translator = {
  initialize: function () {},
  version: "5.0.195",
  BetterBibLaTeX: true,
  // header == ZOTERO_TRANSLATOR_INFO -- maybe pick it from there
  header: {"translatorID":"f895aa0d-f28e-47fe-b247-2ea77c6ed583","translatorType":2,"label":"Better BibLaTeX","description":"exports references in BibLaTeX format","creator":"Simon Kornblith, Richard Karnesky, Anders Johansson and Emiliano Heyns","target":"bib","minVersion":"4.0.27","maxVersion":"","configOptions":{"getCollections":true},"displayOptions":{"exportNotes":false,"exportFileData":false,"useJournalAbbreviation":false,"keepUpdated":false},"priority":50,"inRepository":false,"lastUpdated":"2018-08-27 16:44:00"},
  override: {"DOIandURL":true,"asciiBibLaTeX":true,"asciiBibTeX":true,"autoAbbrev":false,"autoAbbrevStyle":false,"autoExport":false,"autoExportIdleWait":false,"autoPin":false,"biblatexExtendedDateFormat":false,"biblatexExtendedNameFormat":true,"bibtexParticleNoOp":true,"bibtexURL":true,"cacheFlushInterval":false,"citeCommand":false,"citekeyFold":false,"citekeyFormat":false,"citeprocNoteCitekey":false,"csquotes":false,"debug":false,"debugLog":false,"itemObserverDelay":false,"jabrefFormat":false,"jurismPreferredLanguage":false,"keyConflictPolicy":false,"keyScope":false,"kuroshiro":false,"lockedInit":false,"parseParticles":false,"postscript":false,"preserveBibTeXVariables":false,"qualityReport":false,"quickCopyMode":false,"quickCopyPandocBrackets":false,"rawLaTag":false,"scrubDatabase":false,"skipFields":false,"skipWords":false,"sorted":false,"strings":false,"suppressTitleCase":false,"testing":false,"warnBulkModify":false},
  options: {"exportNotes":false,"exportFileData":false,"useJournalAbbreviation":false,"keepUpdated":false},

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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
            const cached = Zotero.BetterBibTeX.cacheFetch(item.itemID, Translator.options, Translator.preferences);
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
/* 2 */
/*!****************************!*\
  !*** ./Better BibLaTeX.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/Better BibLaTeX.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reference_1 = __webpack_require__(/*! ./bibtex/reference */ 3);
const exporter_1 = __webpack_require__(/*! ./lib/exporter */ 1);
const debug_1 = __webpack_require__(/*! ./lib/debug */ 0);
reference_1.Reference.prototype.fieldEncoding = {
    url: 'url',
    doi: 'verbatim',
    eprint: 'verbatim',
    eprintclass: 'verbatim',
    crossref: 'raw',
    xdata: 'raw',
    xref: 'raw',
    entrykey: 'raw',
    childentrykey: 'raw',
    verba: 'verbatim',
    verbb: 'verbatim',
    verbc: 'verbatim',
    institution: 'literal',
    publisher: 'literal',
    organization: 'literal',
    location: 'literal',
};
reference_1.Reference.prototype.caseConversion = {
    title: true,
    shorttitle: true,
    origtitle: true,
    booktitle: true,
    maintitle: true,
    eventtitle: true,
};
reference_1.Reference.prototype.lint = __webpack_require__(/*! ./bibtex/biblatex.qr.bcf */ 11);
reference_1.Reference.prototype.addCreators = function () {
    debug_1.debug('addCreators:', this.item.creators);
    if (!this.item.creators || !this.item.creators.length)
        return;
    const creators = {
        author: [],
        bookauthor: [],
        commentator: [],
        editor: [],
        editora: [],
        editorb: [],
        holder: [],
        translator: [],
        scriptwriter: [],
        director: [],
    };
    for (const creator of this.item.creators) {
        let kind;
        switch (creator.creatorType) {
            case 'director':
                // 365.something
                if (['video', 'movie'].includes(this.referencetype)) {
                    kind = 'director';
                }
                else {
                    kind = 'author';
                }
                break;
            case 'author':
            case 'interviewer':
            case 'programmer':
            case 'artist':
            case 'podcaster':
            case 'presenter':
                kind = 'author';
                break;
            case 'bookAuthor':
                kind = 'bookauthor';
                break;
            case 'commenter':
                kind = 'commentator';
                break;
            case 'editor':
                kind = 'editor';
                break;
            case 'inventor':
                kind = 'holder';
                break;
            case 'translator':
                kind = 'translator';
                break;
            case 'seriesEditor':
                kind = 'editorb';
                break;
            case 'scriptwriter':
                // 365.something
                if (['video', 'movie'].includes(this.referencetype)) {
                    kind = 'scriptwriter';
                }
                else {
                    kind = 'editora';
                }
                break;
            default:
                kind = 'editora';
        }
        creators[kind].push(creator);
    }
    debug_1.debug('addCreators:', creators);
    for (const [field, value] of Object.entries(creators)) {
        this.remove(field);
        this.add({ name: field, value, enc: 'creators' });
    }
    this.remove('editoratype');
    if (creators.editora.length > 0)
        this.add({ name: 'editoratype', value: 'collaborator' });
    this.remove('editorbtype');
    if (creators.editorb.length > 0)
        this.add({ name: 'editorbtype', value: 'redactor' });
};
reference_1.Reference.prototype.typeMap = {
    csl: {
        article: 'article',
        'article-journal': 'article',
        'article-magazine': { type: 'article', subtype: 'magazine' },
        'article-newspaper': { type: 'article', subtype: 'newspaper' },
        bill: 'legislation',
        book: 'book',
        broadcast: { type: 'misc', subtype: 'broadcast' },
        chapter: 'incollection',
        dataset: 'data',
        entry: 'inreference',
        'entry-dictionary': 'inreference',
        'entry-encyclopedia': 'inreference',
        figure: 'image',
        graphic: 'image',
        interview: { type: 'misc', subtype: 'interview' },
        legal_case: 'jurisdiction',
        legislation: 'legislation',
        manuscript: 'unpublished',
        map: { type: 'misc', subtype: 'map' },
        motion_picture: 'movie',
        musical_score: 'audio',
        pamphlet: 'booklet',
        'paper-conference': 'inproceedings',
        patent: 'patent',
        personal_communication: 'letter',
        post: 'online',
        'post-weblog': 'online',
        report: 'report',
        review: 'review',
        'review-book': 'review',
        song: 'music',
        speech: { type: 'misc', subtype: 'speech' },
        thesis: 'thesis',
        treaty: 'legal',
        webpage: 'online',
    },
    zotero: {
        artwork: 'artwork',
        audioRecording: 'audio',
        bill: 'legislation',
        blogPost: 'online',
        book: 'book',
        bookSection: 'incollection',
        case: 'jurisdiction',
        computerProgram: 'software',
        conferencePaper: 'inproceedings',
        dictionaryEntry: 'inreference',
        document: 'misc',
        email: 'letter',
        encyclopediaArticle: 'inreference',
        film: 'movie',
        forumPost: 'online',
        hearing: 'jurisdiction',
        instantMessage: 'misc',
        interview: 'misc',
        journalArticle: 'article',
        letter: 'letter',
        magazineArticle: { type: 'article', subtype: 'magazine' },
        manuscript: 'unpublished',
        map: 'misc',
        newspaperArticle: { type: 'article', subtype: 'newspaper' },
        patent: 'patent',
        podcast: 'audio',
        presentation: 'unpublished',
        radioBroadcast: 'audio',
        report: 'report',
        statute: 'legislation',
        thesis: 'thesis',
        tvBroadcast: 'video',
        videoRecording: 'video',
        webpage: 'online',
    },
};
Translator.initialize = () => {
    reference_1.Reference.installPostscript();
    Translator.unicode = !Translator.preferences.asciiBibLaTeX;
};
function looks_like_number(n) {
    if (n.match(/^(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)$/))
        return 'roman';
    if (n.match(/^[A-Z]?[0-9]+(\.[0-9]+)?$/i))
        return 'arabic';
    if (n.match(/^[A-Z]$/i))
        return 'arabic';
    return false;
}
function looks_like_number_field(n) {
    if (!n)
        return false;
    n = n.split(/-+|–|,|\//).map(_n => _n.trim());
    switch (n.length) {
        case 1:
            return looks_like_number(n[0]);
        case 2:
            return looks_like_number(n[0]) && (looks_like_number(n[0]) === looks_like_number(n[1]));
        default:
            return false;
    }
}
Translator.doExport = () => {
    // Zotero.write(`\n% ${Translator.header.label}\n`)
    Zotero.write('\n');
    let item;
    while (item = exporter_1.Exporter.nextItem()) {
        const ref = new reference_1.Reference(item);
        if (['bookSection', 'chapter'].includes(item.referenceType) && ref.hasCreator('bookAuthor'))
            ref.referencetype = 'inbook';
        if (item.referenceType === 'book' && !ref.hasCreator('author') && ref.hasCreator('editor'))
            ref.referencetype = 'collection';
        if (ref.referencetype === 'book' && item.numberOfVolumes)
            ref.referencetype = 'mvbook';
        let m;
        if (item.url && (m = item.url.match(/^http:\/\/www.jstor.org\/stable\/([\S]+)$/i))) {
            ref.add({ name: 'eprinttype', value: 'jstor' });
            ref.add({ name: 'eprint', value: m[1] });
            delete item.url;
            ref.remove('url');
        }
        if (item.url && (m = item.url.match(/^http:\/\/books.google.com\/books?id=([\S]+)$/i))) {
            ref.add({ name: 'eprinttype', value: 'googlebooks' });
            ref.add({ name: 'eprint', value: m[1] });
            delete item.url;
            ref.remove('url');
        }
        if (item.url && (m = item.url.match(/^http:\/\/www.ncbi.nlm.nih.gov\/pubmed\/([\S]+)$/i))) {
            ref.add({ name: 'eprinttype', value: 'pubmed' });
            ref.add({ name: 'eprint', value: m[1] });
            delete item.url;
            ref.remove('url');
        }
        ref.add({ name: 'langid', value: ref.language });
        ref.add({ name: item.referenceType === 'presentation' ? 'venue' : 'location', value: item.place, enc: 'literal' });
        /*
        if (ref.referencetype === 'inbook') {
          ref.add({ name: 'chapter', value: item.title })
        } else {
          ref.add({ name: 'title', value: item.title })
        }
        */
        ref.add({ name: 'title', value: item.title });
        ref.add({ name: 'edition', value: item.edition });
        ref.add({ name: 'volume', value: item.volume });
        // ref.add({ name: 'rights', value: item.rights })
        ref.add({ name: 'isbn', value: item.ISBN });
        ref.add({ name: 'issn', value: item.ISSN });
        ref.add({ name: 'url', value: item.url });
        ref.add({ name: 'doi', value: item.DOI });
        ref.add({ name: 'shorttitle', value: item.shortTitle });
        ref.add({ name: 'abstract', value: item.abstractNote });
        ref.add({ name: 'volumes', value: item.numberOfVolumes });
        ref.add({ name: 'version', value: item.versionNumber });
        ref.add({ name: 'eventtitle', value: item.conferenceName });
        ref.add({ name: 'pagetotal', value: item.numPages });
        ref.add({ name: 'number', value: item.number || item.seriesNumber });
        ref.add({ name: looks_like_number_field(item.issue) ? 'number' : 'issue', value: item.issue });
        switch (item.referenceType) {
            case 'case':
            case 'gazette':
            case 'legal_case':
                ref.add({ name: 'journaltitle', value: item.reporter, preserveBibTeXVariables: true });
                break;
            case 'statute':
            case 'bill':
            case 'legislation':
                ref.add({ name: 'journaltitle', value: item.code, preserveBibTeXVariables: true });
                break;
        }
        if (item.publicationTitle) {
            switch (item.referenceType) {
                case 'bookSection':
                case 'conferencePaper':
                case 'dictionaryEntry':
                case 'encyclopediaArticle':
                case 'chapter':
                case 'chapter':
                    ref.add({ name: 'booktitle', value: item.publicationTitle, preserveBibTeXVariables: true });
                    break;
                case 'magazineArticle':
                case 'newspaperArticle':
                case 'article-magazine':
                case 'article-newspaper':
                    ref.add({ name: 'journaltitle', value: item.publicationTitle, preserveBibTeXVariables: true });
                    if (['newspaperArticle', 'article-newspaper'].includes(item.referenceType))
                        ref.add({ name: 'journalsubtitle', value: item.section });
                    break;
                case 'journalArticle':
                case 'article':
                case 'article-journal':
                    if (ref.isBibVar(item.publicationTitle)) {
                        ref.add({ name: 'journaltitle', value: item.publicationTitle, preserveBibTeXVariables: true });
                    }
                    else {
                        if (Translator.options.useJournalAbbreviation && item.journalAbbreviation) {
                            ref.add({ name: 'journaltitle', value: item.journalAbbreviation, preserveBibTeXVariables: true });
                        }
                        else {
                            ref.add({ name: 'journaltitle', value: item.publicationTitle, preserveBibTeXVariables: true });
                            ref.add({ name: 'shortjournal', value: item.journalAbbreviation, preserveBibTeXVariables: true });
                        }
                    }
                    break;
                default:
                    if (!ref.has.journaltitle && (item.publicationTitle !== item.title))
                        ref.add({ name: 'journaltitle', value: item.publicationTitle });
            }
        }
        switch (item.referenceType) {
            case 'bookSection':
            case 'encyclopediaArticle':
            case 'dictionaryEntry':
            case 'conferencePaper':
            case 'film':
            case 'videoRecording':
            case 'tvBroadcast':
                if (!ref.has.booktitle)
                    ref.add({ name: 'booktitle', value: item.publicationTitle });
                break;
        }
        let main;
        if (((item.multi || {})._keys || {}).title && (main = (item.multi.main || {}).title || item.language)) {
            const languages = Object.keys(item.multi._keys.title).filter(lang => lang !== main);
            main += '-';
            languages.sort((a, b) => {
                if (a === b)
                    return 0;
                if (a.indexOf(main) === 0 && b.indexOf(main) !== 0)
                    return -1;
                if (a.indexOf(main) !== 0 && b.indexOf(main) === 0)
                    return 1;
                if (a < b)
                    return -1;
                return 1;
            });
            for (let i = 0; i < languages.length; i++) {
                ref.add({
                    name: i === 0 ? 'titleaddon' : `user${String.fromCharCode('d'.charCodeAt(0) + i)}`,
                    value: item.multi._keys.title[languages[i]],
                });
            }
        }
        ref.add({ name: 'series', value: item.seriesTitle || item.series });
        switch (item.referenceType) {
            case 'report':
            case 'thesis':
                ref.add({ name: 'institution', value: item.publisher });
                break;
            case 'case':
            case 'hearing':
            case 'legal_case':
                ref.add({ name: 'institution', value: item.court });
                break;
            case 'computerProgram':
                ref.add({ name: 'organization', value: item.publisher });
                break;
            default:
                ref.add({ name: 'publisher', value: item.publisher });
        }
        switch (item.referenceType) {
            case 'letter':
            case 'personal_communication':
                ref.add({ name: 'type', value: item.type || 'Letter' });
                break;
            case 'email':
                ref.add({ name: 'type', value: 'E-mail' });
                break;
            case 'thesis':
                const thesistype = item.type ? item.type.toLowerCase() : null;
                if (['phdthesis', 'mastersthesis'].includes(thesistype)) {
                    ref.referencetype = thesistype;
                }
                else {
                    ref.add({ name: 'type', value: item.type });
                }
                break;
            case 'report':
                if ((item.type || '').toLowerCase().trim() === 'techreport') {
                    ref.referencetype = 'techreport';
                }
                else {
                    ref.add({ name: 'type', value: item.type });
                }
                break;
            default:
                ref.add({ name: 'type', value: item.type });
        }
        if (item.referenceType === 'manuscript')
            ref.add({ name: 'howpublished', value: item.type });
        ref.add({ name: 'eventtitle', value: item.meetingName });
        if (item.accessDate && item.url)
            ref.add({ name: 'urldate', value: Zotero.Utilities.strToISO(item.accessDate), enc: 'date' });
        ref.add({
            name: 'date',
            verbatim: 'year',
            orig: { name: 'origdate', verbatim: 'origdate' },
            value: item.date,
            enc: 'date',
        });
        ref.add({ name: 'pages', value: ref.normalizeDashes(item.pages) });
        ref.add({ name: 'keywords', value: item.tags, enc: 'tags' });
        ref.addCreators();
        // 'juniorcomma' needs more thought, it isn't for *all* suffixes you want this. Or even at all.
        // ref.add({ name: 'options', value: (option for option in ['useprefix', 'juniorcomma'] when ref[option]).join(',') })
        if (ref.useprefix)
            ref.add({ name: 'options', value: 'useprefix=true' });
        ref.add({ name: 'file', value: item.attachments, enc: 'attachments' });
        if (item.cslVolumeTitle) { // #381
            debug_1.debug('cslVolumeTitle: true, type:', item.referenceType, 'has:', Object.keys(ref.has));
            if (item.referenceType === 'book' && ref.has.title) {
                debug_1.debug('cslVolumeTitle: for book, type:', item.referenceType, 'has:', Object.keys(ref.has));
                ref.add({ name: 'maintitle', value: item.cslVolumeTitle }); // ; to prevent chaining
                [ref.has.title.bibtex, ref.has.maintitle.bibtex] = [ref.has.maintitle.bibtex, ref.has.title.bibtex]; // ; to prevent chaining
                [ref.has.title.value, ref.has.maintitle.value] = [ref.has.maintitle.value, ref.has.title.value];
            }
            if (['bookSection', 'chapter'].includes(item.referenceType) && ref.has.booktitle) {
                debug_1.debug('cslVolumeTitle: for bookSection, type:', item.referenceType, 'has:', Object.keys(ref.has));
                ref.add({ name: 'maintitle', value: item.cslVolumeTitle }); // ; to prevent chaining
                [ref.has.booktitle.bibtex, ref.has.maintitle.bibtex] = [ref.has.maintitle.bibtex, ref.has.booktitle.bibtex]; // ; to preven chaining
                [ref.has.booktitle.value, ref.has.maintitle.value] = [ref.has.maintitle.value, ref.has.booktitle.value];
            }
        }
        for (const eprinttype of ['pmid', 'arxiv', 'jstor', 'hdl', 'googlebooks']) {
            if (ref.has[eprinttype]) {
                if (!ref.has.eprinttype) {
                    ref.add({ name: 'eprinttype', value: eprinttype });
                    ref.add({ name: 'eprint', value: ref.has[eprinttype].value });
                }
                ref.remove(eprinttype);
            }
        }
        if (item.archive && item.archiveLocation) {
            let archive = true;
            switch (item.archive.toLowerCase()) {
                case 'arxiv':
                    if (!ref.has.eprinttype)
                        ref.add({ name: 'eprinttype', value: 'arxiv' });
                    ref.add({ name: 'eprintclass', value: item.callNumber });
                    break;
                case 'jstor':
                    if (!ref.has.eprinttype)
                        ref.add({ name: 'eprinttype', value: 'jstor' });
                    break;
                case 'pubmed':
                    if (!ref.has.eprinttype)
                        ref.add({ name: 'eprinttype', value: 'pubmed' });
                    break;
                case 'hdl':
                    if (!ref.has.eprinttype)
                        ref.add({ name: 'eprinttype', value: 'hdl' });
                    break;
                case 'googlebooks':
                case 'google books':
                    if (!ref.has.eprinttype)
                        ref.add({ name: 'eprinttype', value: 'googlebooks' });
                    break;
                default:
                    archive = false;
            }
            if (archive) {
                if (!ref.has.eprint)
                    ref.add({ name: 'eprint', value: item.archiveLocation });
            }
        }
        ref.complete();
    }
    exporter_1.Exporter.complete();
    Zotero.write('\n');
};
; Zotero.debug('BBT: loaded translators/Better BibLaTeX.ts'); } catch ($wrap_loader_catcher_translators_Better_BibLaTeX_ts) { Zotero.logError('Error: BBT: load of translators/Better BibLaTeX.ts failed:' + $wrap_loader_catcher_translators_Better_BibLaTeX_ts + '::' + $wrap_loader_catcher_translators_Better_BibLaTeX_ts.stack) };

/***/ }),
/* 3 */
/*!*****************************!*\
  !*** ./bibtex/reference.ts ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/bibtex/reference.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exporter_1 = __webpack_require__(/*! ../lib/exporter */ 1);
const unicode_translator_1 = __webpack_require__(/*! ./unicode_translator */ 5);
const debug_1 = __webpack_require__(/*! ../lib/debug */ 0);
const datefield_1 = __webpack_require__(/*! ./datefield */ 10);
const arXiv = new class {
    constructor() {
        // new-style IDs
        // arXiv:0707.3168 [hep-th]
        // arXiv:YYMM.NNNNv# [category]
        this.new = /^arxiv:([0-9]{4}\.[0-9]+)(v[0-9]+)?([^\S\n]+\[(.*)\])?$/i;
        // arXiv:arch-ive/YYMMNNNv# or arXiv:arch-ive/YYMMNNNv# [category]
        this.old = /^arxiv:([a-z]+-[a-z]+\/[0-9]{7})(v[0-9]+)?([^\S\n]+\[(.*)\])?$/i;
        // bare
        this.bare = /^arxiv:[^\S\n]*([\S]+)/i;
    }
    parse(id) {
        let m;
        if (!id)
            return undefined;
        if (m = this.new.exec(id)) {
            return { id, eprint: m[1], primaryClass: m[4] }; // tslint:disable-line:no-magic-numbers
        }
        if (m = this.old.exec(id)) {
            return { id, eprint: m[1], primaryClass: m[4] }; // tslint:disable-line:no-magic-numbers
        }
        if (m = this.bare.exec(id)) {
            return { id, eprint: m[1] };
        }
        return undefined;
    }
};
const Language = new class {
    constructor() {
        this.babelMap = {
            af: 'afrikaans',
            am: 'amharic',
            ar: 'arabic',
            ast: 'asturian',
            bg: 'bulgarian',
            bn: 'bengali',
            bo: 'tibetan',
            br: 'breton',
            ca: 'catalan',
            cop: 'coptic',
            cy: 'welsh',
            cz: 'czech',
            da: 'danish',
            de_1996: 'ngerman',
            de_at_1996: 'naustrian',
            de_at: 'austrian',
            de_de_1996: 'ngerman',
            de: ['german', 'germanb'],
            dsb: ['lsorbian', 'lowersorbian'],
            dv: 'divehi',
            el: 'greek',
            el_polyton: 'polutonikogreek',
            en_au: 'australian',
            en_ca: 'canadian',
            en: 'english',
            en_gb: ['british', 'ukenglish'],
            en_nz: 'newzealand',
            en_us: ['american', 'usenglish'],
            eo: 'esperanto',
            es: 'spanish',
            et: 'estonian',
            eu: 'basque',
            fa: 'farsi',
            fi: 'finnish',
            fr_ca: ['acadian', 'canadian', 'canadien'],
            fr: ['french', 'francais', 'français'],
            fur: 'friulan',
            ga: 'irish',
            gd: ['scottish', 'gaelic'],
            gl: 'galician',
            he: 'hebrew',
            hi: 'hindi',
            hr: 'croatian',
            hsb: ['usorbian', 'uppersorbian'],
            hu: 'magyar',
            hy: 'armenian',
            ia: 'interlingua',
            id: ['indonesian', 'bahasa', 'bahasai', 'indon', 'meyalu'],
            is: 'icelandic',
            it: 'italian',
            ja: 'japanese',
            kn: 'kannada',
            la: 'latin',
            lo: 'lao',
            lt: 'lithuanian',
            lv: 'latvian',
            ml: 'malayalam',
            mn: 'mongolian',
            mr: 'marathi',
            nb: ['norsk', 'bokmal', 'nob'],
            nl: 'dutch',
            nn: 'nynorsk',
            no: ['norwegian', 'norsk'],
            oc: 'occitan',
            pl: 'polish',
            pms: 'piedmontese',
            pt_br: ['brazil', 'brazilian'],
            pt: ['portuguese', 'portuges'],
            pt_pt: 'portuguese',
            rm: 'romansh',
            ro: 'romanian',
            ru: 'russian',
            sa: 'sanskrit',
            se: 'samin',
            sk: 'slovak',
            sl: ['slovenian', 'slovene'],
            sq_al: 'albanian',
            sr_cyrl: 'serbianc',
            sr_latn: 'serbian',
            sr: 'serbian',
            sv: 'swedish',
            syr: 'syriac',
            ta: 'tamil',
            te: 'telugu',
            th: ['thai', 'thaicjk'],
            tk: 'turkmen',
            tr: 'turkish',
            uk: 'ukrainian',
            ur: 'urdu',
            vi: 'vietnamese',
            zh_latn: 'pinyin',
            zh: 'pinyin',
            zlm: ['malay', 'bahasam', 'melayu'],
        };
        for (const [key, value] of Object.entries(this.babelMap)) {
            if (typeof value === 'string')
                this.babelMap[key] = [value];
        }
        // list of unique languages
        this.babelList = [];
        for (const v of Object.values(this.babelMap)) {
            for (const lang of v) {
                if (this.babelList.indexOf(lang) < 0)
                    this.babelList.push(lang);
            }
        }
        this.cache = {};
        this.prefix = {};
    }
    lookup(langcode) {
        if (!this.cache[langcode]) {
            this.cache[langcode] = [];
            for (const lc of Language.babelList) {
                this.cache[langcode].push({ lang: lc, sim: this.string_similarity(langcode, lc) });
            }
            this.cache[langcode].sort((a, b) => b.sim - a.sim);
        }
        return this.cache[langcode];
    }
    fromPrefix(langcode) {
        if (!langcode || (langcode.length < 2))
            return false;
        if (this.prefix[langcode] == null) {
            // consider a langcode matched if it is the prefix of exactly one language in the map
            const lc = langcode.toLowerCase();
            const matches = [];
            for (const languages of Object.values(Language.babelMap)) {
                for (const lang of languages) {
                    if (lang.toLowerCase().indexOf(lc) !== 0)
                        continue;
                    matches.push(languages);
                    break;
                }
            }
            if (matches.length === 1) {
                this.prefix[langcode] = matches[0];
            }
            else {
                this.prefix[langcode] = false;
            }
        }
        return this.prefix[langcode];
    }
    get_bigrams(str) {
        const s = str.toLowerCase();
        const bigrams = [...Array(s.length).keys()].map(i => s.slice(i, i + 2));
        bigrams.sort();
        return bigrams;
    }
    string_similarity(str1, str2) {
        const pairs1 = this.get_bigrams(str1);
        const pairs2 = this.get_bigrams(str2);
        const union = pairs1.length + pairs2.length;
        let hit_count = 0;
        while ((pairs1.length > 0) && (pairs2.length > 0)) {
            if (pairs1[0] === pairs2[0]) {
                hit_count++;
                pairs1.shift();
                pairs2.shift();
                continue;
            }
            if (pairs1[0] < pairs2[0]) {
                pairs1.shift();
            }
            else {
                pairs2.shift();
            }
        }
        return (hit_count * 2) / union;
    }
};
/*
 * h1 Global object: Translator
 *
 * The global Translator object allows access to the current configuration of the translator
 *
 * @param {enum} caseConversion whether titles should be title-cased and case-preserved
 * @param {boolean} bibtexURL set to true when BBT will generate \url{..} around the urls for BibTeX
 */
/*
 * h1 class: Reference
 *
 * The Bib(La)TeX references are generated by the `Reference` class. Before being comitted to the cache, you can add
 * postscript code that can manipulated the `has` or the `referencetype`
 *
 * @param {String} @referencetype referencetype
 * @param {Object} @item the current Zotero item being converted
 */
/*
 * The fields are objects with the following keys:
 *   * name: name of the Bib(La)TeX field
 *   * value: the value of the field
 *   * bibtex: the LaTeX-encoded value of the field
 *   * enc: the encoding to use for the field
 */
class Reference {
    constructor(item) {
        // private nonLetters = new Zotero.Utilities.XRegExp('[^\\p{Letter}]', 'g')
        this.punctuationAtEnd = new Zotero.Utilities.XRegExp('[\\p{Punctuation}]$');
        this.startsWithLowercase = new Zotero.Utilities.XRegExp('^[\\p{Ll}]');
        this.hasLowercaseWord = new Zotero.Utilities.XRegExp('\\s[\\p{Ll}]');
        this.whitespace = new Zotero.Utilities.XRegExp('\\p{Zs}');
        this.inPostscript = false;
        this._enc_creators_initials_marker = '\u0097'; // end of guarded area
        this._enc_creators_relax_marker = '\u200C'; // zero-width non-joiner
        this.isBibVarRE = /^[a-z][a-z0-9_]*$/i;
        this.item = item;
        this.has = {};
        this.raw = (Translator.preferences.rawLaTag === '*') || (this.item.tags.includes(Translator.preferences.rawLaTag));
        this.data = { DeclarePrefChars: '' };
        if (!this.item.language) {
            this.english = true;
            debug_1.debug('detecting language: defaulting to english');
        }
        else {
            const langlc = this.item.language.toLowerCase();
            let language = Language.babelMap[langlc.replace(/[^a-z0-9]/, '_')];
            if (!language)
                language = Language.babelMap[langlc.replace(/-[a-z]+$/i, '').replace(/[^a-z0-9]/, '_')];
            if (!language)
                language = Language.fromPrefix(langlc);
            debug_1.debug('detecting language:', { langlc, language });
            if (language) {
                this.language = language[0];
            }
            else {
                const match = Language.lookup(langlc);
                if (match[0].sim >= 0.9) { // tslint:disable-line:no-magic-numbers
                    this.language = match[0].lang;
                }
                else {
                    this.language = this.item.language;
                }
            }
            this.english = ['american', 'british', 'canadian', 'english', 'australian', 'newzealand', 'USenglish', 'UKenglish'].includes(this.language);
            debug_1.debug('detected language:', { language: this.language, english: this.english });
        }
        if (this.item.extraFields.csl.type) {
            this.item.cslType = this.item.extraFields.csl.type.value.toLowerCase();
            delete item.extraFields.csl.type;
        }
        if (this.item.extraFields.csl['volume-title']) { // should just have been mapped by Zotero
            this.item.cslVolumeTitle = this.item.extraFields.csl['volume-title'].value;
            delete this.item.extraFields.csl['volume-title'];
        }
        this.item.referenceType = this.item.cslType || this.item.itemType;
        debug_1.debug('postextract: item:', this.item);
        // should be const referencetype: string | { type: string, subtype?: string }
        // https://github.com/Microsoft/TypeScript/issues/10422
        const referencetype = this.typeMap.csl[this.item.cslType] || this.typeMap.zotero[this.item.itemType] || 'misc';
        if (typeof referencetype === 'string') {
            this.referencetype = referencetype;
        }
        else {
            this.add({ name: 'entrysubtype', value: referencetype.subtype });
            this.referencetype = referencetype.type;
        }
        if (Translator.preferences.jabrefFormat) {
            if (Translator.preferences.testing) {
                this.add({ name: 'timestamp', value: '2015-02-24 12:14:36 +0100' });
            }
            else {
                this.add({ name: 'timestamp', value: this.item.dateModified || this.item.dateAdded });
            }
        }
        if (['arxiv.org', 'arxiv'].includes((this.item.libraryCatalog || '').toLowerCase()) && (this.item.arXiv = arXiv.parse(this.item.publicationTitle))) {
            this.item.arXiv.source = 'publicationTitle';
            if (Translator.BetterBibLaTeX)
                delete this.item.publicationTitle;
        }
        else if (this.item.extraFields.kv.arxiv && (this.item.arXiv = arXiv.parse(`arxiv:${this.item.extraFields.kv.arxiv}`))) {
            this.item.arXiv.source = 'extra';
        }
        if (this.item.arXiv) {
            this.add({ name: 'archivePrefix', value: 'arXiv' });
            this.add({ name: 'eprinttype', value: 'arxiv' });
            this.add({ name: 'eprint', value: this.item.arXiv.eprint });
            if (this.item.arXiv.primaryClass)
                this.add({ name: 'primaryClass', value: this.item.arXiv.primaryClass });
            delete this.item.extraFields.kv.arxiv;
        }
    }
    static installPostscript() {
        const postscript = Translator.preferences.postscript;
        if (typeof postscript !== 'string' || postscript.trim() === '')
            return;
        try {
            Reference.prototype.postscript = new Function('reference', 'item', `this.inPostscript = true; ${postscript}; this.inPostscript = false;`);
            Zotero.debug(`Installed postscript: ${JSON.stringify(postscript)}`);
        }
        catch (err) {
            Zotero.debug(`Failed to compile postscript: ${err}\n\n${JSON.stringify(postscript)}`);
        }
    }
    /** normalize dashes, mainly for use in `pages` */
    normalizeDashes(str) {
        str = (str || '').trim();
        if (this.raw)
            return str;
        return str
            .replace(/\u2053/g, '~')
            .replace(/[\u2014\u2015]/g, '---') // em-dash
            .replace(/[\u2012\u2013]/g, '--'); // en-dash
        // .replace(/([0-9])\s-\s([0-9])/g, '$1--$2') // treat space-hyphen-space like an en-dash when it's between numbers
    }
    /*
     * Add a field to the reference field set
     *
     * @param {field} field to add. 'name' must be set, and either 'value' or 'bibtex'. If you set 'bibtex', BBT will trust
     *   you and just use that as-is. If you set 'value', BBT will escape the value according the encoder passed in 'enc'; no
     *   'enc' means 'enc_latex'. If you pass both 'bibtex' and 'latex', 'bibtex' takes precedence (and 'value' will be
     *   ignored)
     */
    add(field) {
        debug_1.debug('add field', field);
        if (field.enc === 'date') {
            if (!field.value)
                return;
            if (Translator.BetterBibLaTeX && Translator.preferences.biblatexExtendedDateFormat && Zotero.BetterBibTeX.isEDTF(field.value, true)) {
                return this.add(Object.assign({}, field, { enc: 'verbatim' }));
            }
            const date = Zotero.BetterBibTeX.parseDate(field.value);
            this.add(datefield_1.datefield(date, field));
            this.add(datefield_1.datefield(date.orig, Object.assign({}, field, { name: (field.orig && field.orig.inherit) ? `orig${field.name}` : (field.orig && field.orig.name), verbatim: (field.orig && field.orig.inherit && field.verbatim) ? `orig${field.verbatim}` : (field.orig && field.orig.verbatim) })));
            return;
        }
        if (field.fallback && field.replace)
            throw new Error('pick fallback or replace, buddy');
        if (field.fallback && this.has[field.name])
            return;
        // legacy field addition, leave in place for postscripts
        if (!field.name) {
            const keys = Object.keys(field);
            switch (keys.length) {
                case 0: // name -> undefined/null
                    return;
                case 1:
                    field = { name: keys[0], value: field[keys[0]] };
                    break;
                default:
                    throw new Error(`Quick-add mode expects exactly one name -> value mapping, found ${JSON.stringify(field)} (${(new Error()).stack})`);
            }
        }
        if (!field.bibtex) {
            if ((typeof field.value !== 'number') && !field.value)
                return;
            if ((typeof field.value === 'string') && (field.value.trim() === ''))
                return;
            if (Array.isArray(field.value) && (field.value.length === 0))
                return;
        }
        if (this.has[field.name]) {
            if (!this.inPostscript && !field.replace)
                throw new Error(`duplicate field '${field.name}' for ${this.item.citekey}`);
            this.remove(field.name);
        }
        if (!field.bibtex) {
            let value;
            if ((typeof field.value === 'number') || (field.preserveBibTeXVariables && this.isBibVar(field.value))) {
                value = `${field.value}`;
            }
            else {
                const enc = field.enc || this.fieldEncoding[field.name] || 'latex';
                value = this[`enc_${enc}`](field, this.raw);
                if (!value)
                    return;
                value = value.trim();
                if (!field.bare || field.value.match(/\s/))
                    value = `{${value}}`;
            }
            // minor cleanup
            value = value.replace(/({})+($|[{}$\/\\.;,])/g, '$2');
            field.bibtex = `${value}`;
        }
        this.has[field.name] = field;
    }
    /*
     * Remove a field from the reference field set
     *
     * @param {name} field to remove.
     * @return {Object} the removed field, if present
     */
    remove(name) {
        if (!this.has[name])
            return;
        debug_1.debug('remove field', name);
        const removed = this.has[name];
        delete this.has[name];
        return removed;
    }
    isBibVar(value) {
        return Translator.preferences.preserveBibTeXVariables && value && (typeof value === 'string') && this.isBibVarRE.test(value);
    }
    hasCreator(type) { return (this.item.creators || []).some(creator => creator.creatorType === type); }
    complete() {
        if (Translator.preferences.DOIandURL !== 'both') {
            if (this.has.doi && this.has.url) {
                debug_1.debug('removing', Translator.preferences.DOIandURL === 'doi' ? 'url' : 'doi');
                switch (Translator.preferences.DOIandURL) {
                    case 'doi':
                        this.remove('url');
                        break;
                    case 'url':
                        this.remove('doi');
                        break;
                }
            }
        }
        if ((this.item.collections || []).length && Translator.preferences.jabrefFormat === 4) { // tslint:disable-line:no-magic-numbers
            let groups = this.item.collections.filter(key => Translator.collections[key]).map(key => Translator.collections[key].name);
            groups = groups.sort().filter((item, pos, ary) => !pos || (item !== ary[pos - 1]));
            this.add({ name: 'groups', value: groups.join(',') });
        }
        for (const [cslName, field] of Object.entries(this.item.extraFields.csl)) {
            debug_1.debug('extraFields: csl', cslName, field);
            // these are handled just like 'arxiv' and 'lccn', respectively
            if (['pmid', 'pmcid'].includes(cslName)) {
                this.item.extraFields.kv[cslName] = field;
                delete this.item.extraFields.csl[cslName];
                continue;
            }
            let name = null;
            let replace = false;
            let enc;
            switch (field.type) {
                case 'string':
                    enc = null;
                    break;
                case 'creator':
                    enc = 'creators';
                    break;
                case 'date':
                    enc = 'date';
                    replace = true;
                default:
                    enc = field.type;
            }
            // CSL names are not in BibTeX format, so only add it if there's a mapping
            if (Translator.BetterBibLaTeX) {
                switch (cslName) {
                    case 'authority':
                        name = 'institution';
                        break;
                    case 'status':
                        name = 'pubstate';
                        break;
                    case 'title':
                        name = this.referencetype === 'book' ? 'maintitle' : null;
                        break;
                    case 'container-title':
                        switch (this.item.referenceType) {
                            case 'film':
                            case 'tvBroadcast':
                            case 'videoRecording':
                            case 'motion_picture':
                                name = 'booktitle';
                                break;
                            case 'bookSection':
                            case 'chapter':
                                name = 'maintitle';
                                break;
                            default:
                                name = 'journaltitle';
                                break;
                        }
                        break;
                    case 'original-publisher':
                        name = 'origpublisher';
                        enc = 'literal';
                        break;
                    case 'original-publisher-place':
                        name = 'origlocation';
                        enc = 'literal';
                        break;
                    case 'original-title':
                        name = 'origtitle';
                        break;
                    case 'original-date':
                        name = 'origdate';
                        break;
                    case 'publisher-place':
                        name = 'location';
                        enc = 'literal';
                        break;
                    case 'issued':
                        name = 'date';
                        break;
                    // https://github.com/retorquere/zotero-better-bibtex/issues/644
                    case 'event-place':
                        name = 'venue';
                        break;
                    case 'event-date':
                        name = 'eventdate';
                        break;
                    case 'accessed':
                        name = 'urldate';
                        break;
                    case 'number':
                    case 'volume':
                    case 'author':
                    case 'director':
                    case 'editor':
                    case 'doi':
                    case 'isbn':
                    case 'issn':
                        name = cslName;
                        break;
                }
            }
            if (Translator.BetterBibTeX) {
                switch (cslName) {
                    case 'call-number':
                        name = 'lccn';
                        break;
                    case 'doi':
                    case 'issn':
                        name = cslName;
                        break;
                }
            }
            if (name) {
                this.override({ name, verbatim: name, orig: { inherit: true }, value: field.value, enc, replace, fallback: !replace });
            }
            else {
                debug_1.debug('Unmapped CSL field', cslName, '=', field.value);
            }
        }
        for (const [name, field] of Object.entries(this.item.extraFields.bibtex)) {
            debug_1.debug('extraFields: bibtex', name, field);
            // psuedo-var, sets the reference type
            if (name === 'referencetype') {
                this.referencetype = field.value;
                continue;
            }
            debug_1.debug('extraFields: bibtex');
            this.override(field);
        }
        for (const [name, field] of Object.entries(this.item.extraFields.kv)) {
            debug_1.debug('extraFields: kv', name, field);
            switch (name) {
                case 'mr':
                    this.override({ name: 'mrnumber', value: field.value, raw: field.raw });
                    break;
                case 'zbl':
                    this.override({ name: 'zmnumber', value: field.value, raw: field.raw });
                    break;
                case 'lccn':
                case 'pmcid':
                    this.override({ name, value: field.value, raw: field.raw });
                    break;
                case 'pmid':
                case 'arxiv':
                case 'jstor':
                case 'hdl':
                    if (Translator.BetterBibLaTeX) {
                        this.override({ name: 'eprinttype', value: name });
                        this.override({ name: 'eprint', value: field.value, raw: field.raw });
                    }
                    else {
                        this.override({ name, value: field.value, raw: field.raw });
                    }
                    break;
                case 'googlebooksid':
                    if (Translator.BetterBibLaTeX) {
                        this.override({ name: 'eprinttype', value: 'googlebooks' });
                        this.override({ name: 'eprint', value: field.value, raw: field.raw });
                    }
                    else {
                        this.override({ name: 'googlebooks', value: field.value, raw: field.raw });
                    }
                    break;
                case 'xref':
                    this.override({ name, value: field.value, raw: field.raw });
                    break;
                default:
                    debug_1.debug('unexpected KV field', name, field);
            }
        }
        let notes = '';
        if (Translator.options.exportNotes && this.item.notes && this.item.notes.length) {
            notes = this.item.notes.join('<p>');
        }
        const annotation = Translator.BetterBibTeX ? 'annote' : 'annotation';
        if (this.has.note && this.item.extra) {
            this.add({ name: annotation, value: notes ? `${this.item.extra.replace(/\n/g, '<br/>')}<p>${notes}` : this.item.extra, html: !!notes });
        }
        else {
            this.add({ name: 'note', value: this.item.extra });
            this.add({ name: annotation, value: notes, html: true });
        }
        try {
            this.postscript(this, this.item);
        }
        catch (err) {
            debug_1.debug('Reference.postscript failed:', err);
        }
        for (const name of Translator.preferences.skipFields) {
            this.remove(name);
        }
        if (!this.has.url && this.has.urldate)
            this.remove('urldate');
        if (!Object.keys(this.has).length)
            this.add({ name: 'type', value: this.referencetype });
        const fields = Object.values(this.has).map(field => `  ${field.name} = ${field.bibtex}`);
        // sort fields for stable tests
        if (Translator.preferences.testing || Translator.preferences.sorted)
            fields.sort();
        let ref = `@${this.referencetype}{${this.item.citekey},\n`;
        ref += fields.join(',\n');
        ref += '\n}\n';
        ref += this.qualityReport();
        ref += '\n';
        if (Translator.preferences.sorted) {
            Translator.references.push({ citekey: this.item.citekey, reference: ref });
        }
        else {
            Zotero.write(ref);
        }
        this.data.DeclarePrefChars = exporter_1.Exporter.unique_chars(this.data.DeclarePrefChars);
        Zotero.BetterBibTeX.cacheStore(this.item.itemID, Translator.options, Translator.preferences, ref, this.data);
        if (this.data.DeclarePrefChars)
            exporter_1.Exporter.preamble.DeclarePrefChars += this.data.DeclarePrefChars;
    }
    /*
     * 'Encode' to raw LaTeX value
     *
     * @param {field} field to encode
     * @return {String} unmodified `field.value`
     */
    enc_raw(f) {
        return f.value;
    }
    /*
     * Encode to LaTeX url
     *
     * @param {field} field to encode
     * @return {String} field.value encoded as verbatim LaTeX string (minimal escaping). If in Better BibTeX, wraps return value in `\url{string}`
     */
    enc_url(f) {
        const value = this.enc_verbatim(f);
        if (Translator.BetterBibTeX) {
            return `\\url{${this.enc_verbatim(f)}}`;
        }
        else {
            return value;
        }
    }
    /*
     * Encode to verbatim LaTeX
     *
     * @param {field} field to encode
     * @return {String} field.value encoded as verbatim LaTeX string (minimal escaping).
     */
    enc_verbatim(f) {
        return this.toVerbatim(f.value);
    }
    _enc_creators_scrub_name(name) {
        return Zotero.Utilities.XRegExp.replace(name, this.whitespace, ' ', 'all');
    }
    /*
     * Encode creators to author-style field
     *
     * @param {field} field to encode. The 'value' must be an array of Zotero-serialized `creator` objects.
     * @return {String} field.value encoded as author-style value
     */
    enc_creators(f, raw) {
        if (f.value.length === 0)
            return null;
        const encoded = [];
        for (const creator of f.value) {
            let name;
            if (creator.name || (creator.lastName && (creator.fieldMode === 1))) {
                name = raw ? `{${creator.name || creator.lastName}}` : this.enc_latex({ value: new String(this._enc_creators_scrub_name(creator.name || creator.lastName)) }); // tslint:disable-line:no-construct
            }
            else if (raw) {
                name = [creator.lastName || '', creator.firstName || ''].join(', ');
            }
            else if (creator.lastName || creator.firstName) {
                name = {
                    family: this._enc_creators_scrub_name(creator.lastName || ''),
                    given: this._enc_creators_scrub_name(creator.firstName || ''),
                };
                if (Translator.preferences.parseParticles)
                    Zotero.BetterBibTeX.parseParticles(name);
                if (!Translator.BetterBibLaTeX || !Translator.preferences.biblatexExtendedNameFormat) {
                    // side effects to set use-prefix/uniorcomma -- make sure addCreators is called *before* adding 'options'
                    if (!this.useprefix)
                        this.useprefix = !!name['non-dropping-particle'];
                    if (!this.juniorcomma)
                        this.juniorcomma = (f.juniorcomma && name['comma-suffix']);
                }
                if (Translator.BetterBibTeX) {
                    name = this._enc_creators_bibtex(name);
                }
                else {
                    name = this._enc_creators_biblatex(name);
                }
                name = name.replace(/ and /g, ' {and} ');
            }
            else {
                continue;
            }
            encoded.push(name.trim());
        }
        return encoded.join(' and ');
    }
    /*
     * Encode text to LaTeX literal list (double-braced)
     *
     * This encoding supports simple HTML markup.
     *
     * @param {field} field to encode.
     * @return {String} field.value encoded as author-style value
     */
    enc_literal(f) {
        if (!f.value)
            return null;
        return this.enc_latex({ value: new String(f.value) }); // tslint:disable-line:no-construct
    }
    /*
     * Encode text to LaTeX
     *
     * This encoding supports simple HTML markup.
     *
     * @param {field} field to encode.
     * @return {String} field.value encoded as author-style value
     */
    enc_latex(f, raw = false) {
        if (typeof f.value === 'number')
            return f.value;
        if (!f.value)
            return null;
        if (Array.isArray(f.value)) {
            if (f.value.length === 0)
                return null;
            return f.value.map(word => this.enc_latex(this.clone(f, word), raw)).join(f.sep || '');
        }
        if (f.raw || raw)
            return f.value;
        const caseConversion = !Translator.preferences.suppressTitleCase && (this.caseConversion[f.name] || f.caseConversion);
        const latex = unicode_translator_1.text2latex(f.value, { html: f.html, caseConversion: caseConversion && this.english });
        let value = latex.latex;
        if (caseConversion && Translator.BetterBibTeX && !this.english)
            value = `{${value}}`;
        if (f.value instanceof String && !latex.raw)
            value = new String(`{${value}}`); // tslint:disable-line:no-construct
        return value;
    }
    enc_tags(f) {
        let tags = f.value.filter(tag => tag !== Translator.preferences.rawLaTag);
        if (tags.length === 0)
            return null;
        // sort tags for stable tests
        if (Translator.preferences.testing || Translator.preferences.sorted)
            tags.sort((a, b) => Translator.stringCompare(a, b));
        tags = tags.map(tag => {
            if (Translator.BetterBibTeX) {
                tag = tag.replace(/([#\\%&])/g, '\\$1');
            }
            else {
                tag = tag.replace(/([#%\\])/g, '\\$1');
            }
            // the , -> ; is unfortunate, but I see no other way
            tag = tag.replace(/,/g, ';');
            // verbatim fields require balanced braces -- please just don't use braces in your tags
            let balanced = 0;
            for (const ch of tag) {
                switch (ch) {
                    case '{':
                        balanced += 1;
                        break;
                    case '}':
                        balanced -= 1;
                        break;
                }
                if (balanced < 0)
                    break;
            }
            if (balanced !== 0)
                tag = tag.replace(/{/g, '(').replace(/}/g, ')');
            return tag;
        });
        return tags.join(',');
    }
    enc_attachments(f) {
        if (!f.value || (f.value.length === 0))
            return null;
        const attachments = [];
        const errors = [];
        for (const attachment of f.value) {
            const att = {
                title: attachment.title,
                mimetype: attachment.contentType || '',
                path: '',
            };
            if (Translator.options.exportFileData) {
                att.path = attachment.saveFile ? attachment.defaultPath : '';
            }
            else if (attachment.localPath) {
                att.path = attachment.localPath;
            }
            if (!att.path)
                continue; // amazon/googlebooks etc links show up as atachments without a path
            // att.path = att.path.replace(/^storage:/, '')
            att.path = att.path.replace(/(?:\s*[{}]+)+\s*/g, ' ');
            debug_1.debug('attachment::', Translator.options, att);
            if (Translator.options.exportFileData) {
                debug_1.debug('saving attachment::', Translator.options, att);
                attachment.saveFile(att.path, true);
            }
            if (!att.title)
                att.title = att.path.replace(/.*[\\\/]/, '') || 'attachment';
            if (!att.mimetype && (att.path.slice(-4).toLowerCase() === '.pdf'))
                att.mimetype = 'application/pdf'; // tslint:disable-line:no-magic-numbers
            if (Translator.preferences.testing) {
                exporter_1.Exporter.attachmentCounter += 1;
                att.path = `files/${exporter_1.Exporter.attachmentCounter}/${att.path.replace(/.*[\/\\]/, '')}`;
            }
            else if (Translator.options.exportPath && att.path.startsWith(Translator.options.exportPath)) {
                att.path = att.path.slice(Translator.options.exportPath.length);
                debug_1.debug('clipped attachment::', Translator.options, att);
            }
            attachments.push(att);
        }
        if (errors.length !== 0)
            f.errors = errors;
        if (attachments.length === 0)
            return null;
        // sort attachments for stable tests, and to make non-snapshots the default for JabRef to open (#355)
        attachments.sort((a, b) => {
            if ((a.mimetype === 'text/html') && (b.mimetype !== 'text/html'))
                return 1;
            if ((b.mimetype === 'text/html') && (a.mimetype !== 'text/html'))
                return -1;
            return Translator.stringCompare(a.path, b.path);
        });
        if (Translator.preferences.jabrefFormat)
            return attachments.map(att => [att.title, att.path, att.mimetype].map(part => part.replace(/([\\{}:;])/g, '\\$1')).join(':')).join(';');
        return attachments.map(att => att.path.replace(/([\\{};])/g, '\\$1')).join(';');
    }
    override(field) {
        const name = field.name.split('.');
        if (name.length > 1) {
            if (this.referencetype !== name[0])
                return;
            field.name = name[1];
        }
        if ((typeof field.value === 'string') && (field.value.trim() === '')) {
            this.remove(field.name);
            return;
        }
        this.add(Object.assign({}, field, { replace: (typeof field.replace !== 'boolean' && typeof field.fallback !== 'boolean') || field.replace }));
    }
    /*
     * Return a copy of the given `field` with a new value
     *
     * @param {field} field to be cloned
     * @param {value} value to be assigned
     * @return {Object} copy of field settings with new value
     */
    clone(f, value) {
        const clone = JSON.parse(JSON.stringify(f));
        delete clone.bibtex;
        clone.value = value;
        return clone;
    }
    _enc_creators_pad_particle(particle, relax = false) {
        // space at end is always OK
        if (particle[particle.length - 1] === ' ')
            return particle;
        if (Translator.BetterBibLaTeX) {
            if (Zotero.Utilities.XRegExp.test(particle, this.punctuationAtEnd))
                this.data.DeclarePrefChars += particle[particle.length - 1];
            // if BBLT, always add a space if it isn't there
            return particle + ' ';
        }
        // otherwise, we're in BBT.
        // If the particle ends in a period, add a space
        if (particle[particle.length - 1] === '.')
            return particle + ' ';
        // if it ends in any other punctuation, it's probably something like d'Medici -- no space
        if (Zotero.Utilities.XRegExp.test(particle, this.punctuationAtEnd)) {
            if (relax)
                return `${particle}${this._enc_creators_relax_marker} `;
            return particle;
        }
        // otherwise, add a space
        return particle + ' ';
    }
    _enc_creators_biblatex(name) {
        let family, latex;
        if ((name.family.length > 1) && (name.family[0] === '"') && (name.family[name.family.length - 1] === '"')) {
            family = new String(name.family.slice(1, -1)); // tslint:disable-line:no-construct
        }
        else {
            ({ family } = name);
        }
        let initials = (name.given || '').indexOf(this._enc_creators_initials_marker); // end of guarded area
        if (Translator.preferences.biblatexExtendedNameFormat && (name['dropping-particle'] || name['non-dropping-particle'] || name['comma-suffix'])) {
            if (initials >= 0) {
                initials = name.given.substring(0, initials);
                if (initials.length > 1)
                    initials = new String(initials); // tslint:disable-line:no-construct
                name.given = name.given.replace(this._enc_creators_initials_marker, '');
            }
            else {
                initials = '';
            }
            latex = [];
            if (family)
                latex.push(`family=${this.enc_latex({ value: family })}`);
            if (name.given)
                latex.push(`given=${this.enc_latex({ value: name.given })}`);
            if (initials)
                latex.push(`given-i=${this.enc_latex({ value: initials })}`);
            if (name.suffix)
                latex.push(`suffix=${this.enc_latex({ value: name.suffix })}`);
            if (name['dropping-particle'] || name['non-dropping-particle']) {
                latex.push(`prefix=${this.enc_latex({ value: name['dropping-particle'] || name['non-dropping-particle'] })}`);
                latex.push(`useprefix=${!!name['non-dropping-particle']}`);
            }
            if (name['comma-suffix'])
                latex.push('juniorcomma=true');
            return latex.join(', ');
        }
        if (family && Zotero.Utilities.XRegExp.test(family, this.startsWithLowercase))
            family = new String(family); // tslint:disable-line:no-construct
        if (family)
            family = this.enc_latex({ value: family });
        if (initials >= 0)
            name.given = `<span relax="true">${name.given.replace(this._enc_creators_initials_marker, '</span>')}`;
        latex = '';
        if (name['dropping-particle'])
            latex += this.enc_latex({ value: this._enc_creators_pad_particle(name['dropping-particle']) });
        if (name['non-dropping-particle'])
            latex += this.enc_latex({ value: this._enc_creators_pad_particle(name['non-dropping-particle']) });
        if (family)
            latex += family;
        if (name.suffix)
            latex += `, ${this.enc_latex({ value: name.suffix })}`;
        if (name.given)
            latex += `, ${this.enc_latex({ value: name.given })}`;
        return latex;
    }
    _enc_creators_bibtex(name) {
        let family;
        if ((name.family.length > 1) && (name.family[0] === '"') && (name.family[name.family.length - 1] === '"')) { // quoted
            family = new String(name.family.slice(1, -1)); // tslint:disable-line:no-construct
        }
        else {
            family = name.family;
        }
        if (name.given && (name.given.indexOf(this._enc_creators_initials_marker) >= 0)) {
            name.given = `<span relax="true">${name.given.replace(this._enc_creators_initials_marker, '</span>')}`;
        }
        /*
          TODO: http://chat.stackexchange.com/rooms/34705/discussion-between-retorquere-and-egreg
    
          My advice is never using the alpha style; it's a relic of the past, when numbering citations was very difficult
          because one didn't know the full citation list when writing a paper. In order to have the bibliography in
          alphabetical order, such tricks were devised. The alternative was listing the citation in order of appearance.
          Your document gains nothing with something like XYZ88 as citation key.
    
          The “van” problem should be left to the bibliographic style. Some styles consider “van” as part of the name, some
          don't. In any case, you'll have a kludge, mostly unportable. However, if you want van Gogh to be realized as vGo
          in the label, use {\relax van} Gogh or something like this.
        */
        if (name['non-dropping-particle'])
            family = new String(this._enc_creators_pad_particle(name['non-dropping-particle']) + family); // tslint:disable-line:no-construct
        if (Zotero.Utilities.XRegExp.test(family, this.startsWithLowercase) || Zotero.Utilities.XRegExp.test(family, this.hasLowercaseWord))
            family = new String(family); // tslint:disable-line:no-construct
        // https://github.com/retorquere/zotero-better-bibtex/issues/978 -- enc_latex can return null
        family = this.enc_latex({ value: family }) || '';
        // https://github.com/retorquere/zotero-better-bibtex/issues/976#issuecomment-393442419
        if (family[0] !== '{' && name.family.match(/[-\u2014\u2015\u2012\u2013]/))
            family = `{${family}}`;
        if (name['dropping-particle'])
            family = this.enc_latex({ value: this._enc_creators_pad_particle(name['dropping-particle'], true) }) + family;
        if (Translator.BetterBibTeX && Translator.preferences.bibtexParticleNoOp && (name['non-dropping-particle'] || name['dropping-particle'])) {
            family = `{\\noopsort{${this.enc_latex({ value: name.family.toLowerCase() })}}}${family}`;
            exporter_1.Exporter.preamble.noopsort = true;
        }
        if (name.given)
            name.given = this.enc_latex({ value: name.given });
        if (name.suffix)
            name.suffix = this.enc_latex({ value: name.suffix });
        let latex = family;
        if (name.suffix)
            latex += `, ${name.suffix}`;
        if (name.given)
            latex += `, ${name.given}`;
        return latex;
    }
    postscript(reference, item) { } // tslint:disable-line:no-empty
    toVerbatim(text) {
        let value;
        if (Translator.BetterBibTeX) {
            value = (`${text}`).replace(/([#\\%&{}])/g, '\\$1');
        }
        else {
            value = (`${text}`).replace(/([\\{}])/g, '\\$1');
        }
        if (!Translator.unicode)
            value = value.replace(/[^\x21-\x7E]/g, (chr => `\\%${`00${chr.charCodeAt(0).toString(16).slice(-2)}`}`)); // tslint:disable-line:no-magic-numbers
        return value;
    }
    qualityReport() {
        if (!Translator.preferences.qualityReport)
            return '';
        let report = this.lint({
            timestamp: `added because JabRef format is set to ${Translator.preferences.jabrefFormat || '?'}`,
        });
        if (report) {
            if (this.has.pages) {
                const dashes = this.has.pages.bibtex.match(/-+/g);
                // if (dashes && dashes.includes('-')) report.push('? hyphen found in pages field, did you mean to use an en-dash?')
                if (dashes && dashes.includes('---'))
                    report.push('? em-dash found in pages field, did you mean to use an en-dash?');
            }
            if (this.has.journal && this.has.journal.value.indexOf('.') >= 0)
                report.push(`? Possibly abbreviated journal title ${this.has.journal.value}`);
            if (this.has.journaltitle && this.has.journaltitle.value.indexOf('.') >= 0)
                report.push(`? Possibly abbreviated journal title ${this.has.journaltitle.value}`);
            if (this.referencetype === 'inproceedings' && this.has.booktitle) {
                if (!this.has.booktitle.value.match(/:|Proceedings|Companion| '/) || this.has.booktitle.value.match(/\.|workshop|conference|symposium/)) {
                    report.push('? Unsure about the formatting of the booktitle');
                }
            }
            if (this.has.title && !Translator.preferences.suppressTitleCase) {
                const titleCased = Zotero.BetterBibTeX.titleCase(this.has.title.value) === this.has.title.value;
                if (this.has.title.value.match(/\s/)) {
                    if (titleCased)
                        report.push('? Title looks like it was stored in title-case in Zotero');
                }
                else {
                    if (!titleCased)
                        report.push('? Title looks like it was stored in lower-case in Zotero');
                }
            }
        }
        else {
            report = [`I don't know how to quality-check ${this.referencetype} references`];
        }
        if (!report.length)
            return '';
        report.unshift(`== ${Translator.BetterBibTeX ? 'BibTeX' : 'BibLateX'} quality report for ${this.item.citekey}:`);
        return report.map(line => `% ${line}\n`).join('');
    }
}
exports.Reference = Reference;
//  @polyglossia = [
//    'albanian'
//    'amharic'
//    'arabic'
//    'armenian'
//    'asturian'
//    'bahasai'
//    'bahasam'
//    'basque'
//    'bengali'
//    'brazilian'
//    'brazil'
//    'breton'
//    'bulgarian'
//    'catalan'
//    'coptic'
//    'croatian'
//    'czech'
//    'danish'
//    'divehi'
//    'dutch'
//    'english'
//    'british'
//    'ukenglish'
//    'esperanto'
//    'estonian'
//    'farsi'
//    'finnish'
//    'french'
//    'friulan'
//    'galician'
//    'german'
//    'austrian'
//    'naustrian'
//    'greek'
//    'hebrew'
//    'hindi'
//    'icelandic'
//    'interlingua'
//    'irish'
//    'italian'
//    'kannada'
//    'lao'
//    'latin'
//    'latvian'
//    'lithuanian'
//    'lsorbian'
//    'magyar'
//    'malayalam'
//    'marathi'
//    'nko'
//    'norsk'
//    'nynorsk'
//    'occitan'
//    'piedmontese'
//    'polish'
//    'portuges'
//    'romanian'
//    'romansh'
//    'russian'
//    'samin'
//    'sanskrit'
//    'scottish'
//    'serbian'
//    'slovak'
//    'slovenian'
//    'spanish'
//    'swedish'
//    'syriac'
//    'tamil'
//    'telugu'
//    'thai'
//    'tibetan'
//    'turkish'
//    'turkmen'
//    'ukrainian'
//    'urdu'
//    'usorbian'
//    'vietnamese'
//    'welsh'
//  ]
; Zotero.debug('BBT: loaded translators/bibtex/reference.ts'); } catch ($wrap_loader_catcher_translators_bibtex_reference_ts) { Zotero.logError('Error: BBT: load of translators/bibtex/reference.ts failed:' + $wrap_loader_catcher_translators_bibtex_reference_ts + '::' + $wrap_loader_catcher_translators_bibtex_reference_ts.stack) };

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

/***/ }),
/* 5 */
/*!**************************************!*\
  !*** ./bibtex/unicode_translator.ts ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/bibtex/unicode_translator.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __webpack_require__(/*! ../lib/debug */ 0);
const HE = __webpack_require__(/*! he */ 6);
const unicodeMapping = __webpack_require__(/*! ./unicode_translator_mapping.js */ 9);
const htmlConverter = new class HTMLConverter {
    convert(html, options) {
        this.embraced = false;
        this.options = options;
        this.latex = '';
        this.mapping = (Translator.unicode ? unicodeMapping.unicode : unicodeMapping.ascii);
        this.stack = [];
        const ast = Zotero.BetterBibTeX.parseHTML(html, this.options);
        this.walk(ast);
        return { latex: this.latex, raw: ast.nodeName === 'pre' };
    }
    walk(tag) {
        if (!tag)
            return;
        switch (tag.nodeName) {
            case '#text':
                this.chars(tag.value);
                return;
            case 'pre':
            case 'script':
                this.latex += tag.value;
                return;
        }
        this.stack.unshift(tag);
        let latex = '...'; // default to no-op
        switch (tag.nodeName) {
            case 'i':
            case 'em':
            case 'italic':
                latex = '\\emph{...}';
                break;
            case 'b':
            case 'strong':
                latex = '\\textbf{...}';
                break;
            case 'a':
                /* zotero://open-pdf/0_5P2KA4XM/7 is actually a reference. */
                if (tag.attr.href && tag.attr.href.length)
                    latex = `\\href{${tag.attr.href}}{...}`;
                break;
            case 'sup':
                latex = '\\textsuperscript{...}';
                break;
            case 'sub':
                latex = '\\textsubscript{...}';
                break;
            case 'br':
                latex = '';
                /* line-breaks on empty line makes LaTeX sad */
                if (this.latex !== '' && this.latex[this.latex.length - 1] !== '\n')
                    latex = '\\\\';
                latex += '\n...';
                break;
            case 'p':
            case 'div':
            case 'table':
            case 'tr':
                latex = '\n\n...\n\n';
                break;
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
                latex = `\n\n\\${'sub'.repeat(parseInt(tag.nodeName[1]) - 1)}section{...}\n\n`;
                break;
            case 'ol':
                latex = '\n\n\\begin{enumerate}\n...\n\n\\end{enumerate}\n';
                break;
            case 'ul':
                latex = '\n\n\\begin{itemize}\n...\n\n\\end{itemize}\n';
                break;
            case 'li':
                latex = '\n\\item ...';
                break;
            case 'span':
            case 'sc':
            case 'nc':
                break; // ignore, handled by the relax/nocase/smallcaps handler below
            case 'td':
            case 'th':
                latex = ' ... ';
                break;
            case '#document':
            case '#document-fragment':
            case 'tbody':
            case 'html':
            case 'head':
            case 'body':
                break; // ignore
            default:
                debug_1.debug(`unexpected tag '${tag.nodeName}' (${Object.keys(tag)})`);
        }
        if (latex !== '...')
            latex = this.embrace(latex, latex.match(/^\\[a-z]+{\.\.\.}$/));
        if (tag.smallcaps)
            latex = this.embrace(`\\textsc{${latex}}`, true);
        if (tag.nocase)
            latex = `{{${latex}}}`;
        if (tag.relax)
            latex = `{\\relax ${latex}}`;
        if (tag.enquote) {
            if (Translator.BetterBibTeX) {
                latex = `\\enquote{${latex}}`;
            }
            else {
                latex = `\\mkbibquote{${latex}}`;
            }
        }
        const [prefix, postfix] = latex.split('...');
        this.latex += prefix;
        for (const child of tag.childNodes) {
            this.walk(child);
        }
        this.latex += postfix;
        this.stack.shift();
    }
    embrace(latex, condition) {
        /* holy mother of %^$#^%$@ the bib(la)tex case conversion rules are insane */
        /* https://github.com/retorquere/zotero-better-bibtex/issues/541 */
        /* https://github.com/plk/biblatex/issues/459 ... oy! */
        if (!this.embraced)
            this.embraced = this.options.caseConversion && (((this.latex || latex)[0] !== '\\') || Translator.BetterBibTeX);
        if (!this.embraced || !condition)
            return latex;
        return `{${latex}}`;
    }
    chars(text) {
        let latex = '';
        let math = false;
        let braced = 0;
        if (this.options.html)
            text = HE.decode(text, { isAttributeValue: true });
        for (let c of Zotero.Utilities.XRegExp.split(text, '')) {
            // in and out of math mode
            if (!!this.mapping.math[c] !== math) {
                latex += '$';
                math = !!this.mapping.math[c];
            }
            // balance out braces with invisible braces until http://tex.stackexchange.com/questions/230750/open-brace-in-bibtex-fields/230754#comment545453_230754 is widely deployed
            switch (c) {
                case '{':
                    braced += 1;
                    break;
                case '}':
                    braced -= 1;
                    break;
            }
            if (braced < 0) {
                latex += '\\vphantom\\{';
                braced = 0;
            }
            c = this.mapping.math[c] || this.mapping.text[c] || c;
            latex += this.embrace(c, unicodeMapping.embrace[c]);
        }
        // add any missing closing phantom braces
        switch (braced) {
            case 0:
                break;
            case 1:
                latex += '\\vphantom\\}';
                break;
            default:
                latex += `\\vphantom{${'\\}'.repeat(braced)}}`;
                break;
        }
        // might still be in math mode at the end
        if (math)
            latex += '$';
        this.latex += latex;
    }
};
function html2latex(html, options) {
    if (typeof options.html === 'undefined')
        options.html = true;
    const latex = htmlConverter.convert(html, options);
    latex.latex = latex.latex
        .replace(/(\\\\)+[^\S\n]*\n\n/g, '\n\n')
        .replace(/\n\n\n+/g, '\n\n')
        .replace(/{}([}])/g, '$1');
    return latex;
}
exports.html2latex = html2latex;
function text2latex(text, options = {}) {
    if (typeof options.html === 'undefined')
        options.html = false;
    return html2latex(text, options);
}
exports.text2latex = text2latex;
; Zotero.debug('BBT: loaded translators/bibtex/unicode_translator.ts'); } catch ($wrap_loader_catcher_translators_bibtex_unicode_translator_ts) { Zotero.logError('Error: BBT: load of translators/bibtex/unicode_translator.ts failed:' + $wrap_loader_catcher_translators_bibtex_unicode_translator_ts + '::' + $wrap_loader_catcher_translators_bibtex_unicode_translator_ts.stack) };

/***/ }),
/* 6 */
/*!********************************!*\
  !*** ../node_modules/he/he.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.1.1 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)([=a-zA-Z0-9])?/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;
			if ($1) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $1;
				semicolon = $2;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}
			if ($3) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $3;
				semicolon = $4;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}
			if ($5) {
				// Decode named character references with trailing `;`, e.g. `&copy;`.
				reference = $5;
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// Ambiguous ampersand. https://mths.be/notes/ambiguous-ampersands
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					return $0;
				}
			}
			// If we’re still here, it’s a legacy reference for sure. No need for an
			// extra `if` check.
			// Decode named character references without trailing `;`, e.g. `&amp`
			// This is only a parse error if it gets converted to `&`, or if it is
			// followed by `=` in an attribute context.
			reference = $6;
			next = $7;
			if (next && options.isAttributeValue) {
				if (strict && next == '=') {
					parseError('`&` did not start a character reference');
				}
				return $0;
			} else {
				if (strict) {
					parseError(
						'named character reference was not terminated by a semicolon'
					);
				}
				// Note: there is no need to check `has(decodeMapLegacy, reference)`.
				return decodeMapLegacy[reference] + (next || '');
			}
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.1.1',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return he;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ 7)(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ 8)))

/***/ }),
/* 7 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 8 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/*!**********************************************!*\
  !*** ./bibtex/unicode_translator_mapping.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {
  'unicode': {
    'math': {
      '<': '<',
      '>': '>',
      '\\': '\\backslash{}'
    },
    'text': {
      '#': '\\#',
      '$': '\\$',
      '%': '\\%',
      '&': '\\&',
      '^': '\\^',
      '_': '\\_',
      '{': '\\{',
      '}': '\\}',
      '~': '\\textasciitilde{}',
      '\xA0': '~',
      '\u200B': '\\mbox{}',
      '\u200C': '{\\aftergroup\\ignorespaces}'
    }
  },
  'ascii': {
    'math': {
      '<': '<',
      '>': '>',
      '\\': '\\backslash{}',
      '\xAC': '\\lnot{}',
      '\xAD': '\\-',
      '\xB0': '^\\circ{}',
      '\xB1': '\\pm{}',
      '\xB2': '^2',
      '\xB3': '^3',
      '\xB5': '\\mathrm{\\mu}',
      '\xB7': '\\cdot{}',
      '\xB9': '^1',
      '\xF7': '\\div{}',
      '\u0127': '\\Elzxh{}',
      '\u0192': 'f',
      '\u01AA': '\\eth{}',
      '\u01B5': '\\Zbar{}',
      '\u0237': '\\jmath{}',
      '\u0250': '\\Elztrna{}',
      '\u0252': '\\Elztrnsa{}',
      '\u0254': '\\Elzopeno{}',
      '\u0256': '\\Elzrtld{}',
      '\u0259': '\\Elzschwa{}',
      '\u025B': '\\varepsilon{}',
      '\u0263': '\\Elzpgamma{}',
      '\u0264': '\\Elzpbgam{}',
      '\u0265': '\\Elztrnh{}',
      '\u026C': '\\Elzbtdl{}',
      '\u026D': '\\Elzrtll{}',
      '\u026F': '\\Elztrnm{}',
      '\u0270': '\\Elztrnmlr{}',
      '\u0271': '\\Elzltlmr{}',
      '\u0273': '\\Elzrtln{}',
      '\u0277': '\\Elzclomeg{}',
      '\u0279': '\\Elztrnr{}',
      '\u027A': '\\Elztrnrl{}',
      '\u027B': '\\Elzrttrnr{}',
      '\u027C': '\\Elzrl{}',
      '\u027D': '\\Elzrtlr{}',
      '\u027E': '\\Elzfhr{}',
      '\u0282': '\\Elzrtls{}',
      '\u0283': '\\Elzesh{}',
      '\u0287': '\\Elztrnt{}',
      '\u0288': '\\Elzrtlt{}',
      '\u028A': '\\Elzpupsil{}',
      '\u028B': '\\Elzpscrv{}',
      '\u028C': '\\Elzinvv{}',
      '\u028D': '\\Elzinvw{}',
      '\u028E': '\\Elztrny{}',
      '\u0290': '\\Elzrtlz{}',
      '\u0292': '\\Elzyogh{}',
      '\u0294': '\\Elzglst{}',
      '\u0295': '\\Elzreglst{}',
      '\u0296': '\\Elzinglst{}',
      '\u02A4': '\\Elzdyogh{}',
      '\u02A7': '\\Elztesh{}',
      '\u02C8': '\\Elzverts{}',
      '\u02CC': '\\Elzverti{}',
      '\u02D0': '\\Elzlmrk{}',
      '\u02D1': '\\Elzhlmrk{}',
      '\u02D2': '\\Elzsbrhr{}',
      '\u02D3': '\\Elzsblhr{}',
      '\u02D4': '\\Elzrais{}',
      '\u02D5': '\\Elzlow{}',
      '\u0305': '\\overline{}',
      '\u0309': '\\ovhook{}',
      '\u0310': '\\candra{}',
      '\u0312': '\\oturnedcomma{}',
      '\u0315': '\\ocommatopright{}',
      '\u031A': '\\droang{}',
      '\u0321': '\\Elzpalh{}',
      '\u032A': '\\Elzsbbrg{}',
      '\u0330': '\\utilde{}',
      '\u0331': '\\underbar{}',
      '\u0332': '\\underline{}',
      '\u038E': '\\mathrm{\'Y}',
      '\u038F': '\\mathrm{\'\\Omega}',
      '\u0390': '\\acute{\\ddot{\\iota}}',
      '\u0391': 'A',
      '\u0392': 'B',
      '\u0393': '\\Gamma{}',
      '\u0394': '\\Delta{}',
      '\u0395': 'E',
      '\u0396': 'Z',
      '\u0397': 'H',
      '\u0398': '\\Theta{}',
      '\u0399': 'I',
      '\u039A': 'K',
      '\u039B': '\\Lambda{}',
      '\u039C': 'M',
      '\u039D': 'N',
      '\u039E': '\\Xi{}',
      '\u039F': 'O',
      '\u03A0': '\\Pi{}',
      '\u03A1': 'P',
      '\u03A3': '\\Sigma{}',
      '\u03A4': 'T',
      '\u03A5': '\\Upsilon{}',
      '\u03A6': '\\Phi{}',
      '\u03A7': 'X',
      '\u03A8': '\\Psi{}',
      '\u03A9': '\\Omega{}',
      '\u03AA': '\\mathrm{\\ddot{I}}',
      '\u03AB': '\\mathrm{\\ddot{Y}}',
      '\u03AD': '\\acute{\\epsilon}',
      '\u03AE': '\\acute{\\eta}',
      '\u03AF': '\\acute{\\iota}',
      '\u03B0': '\\acute{\\ddot{\\upsilon}}',
      '\u03B1': '\\alpha{}',
      '\u03B2': '\\beta{}',
      '\u03B3': '\\gamma{}',
      '\u03B4': '\\delta{}',
      '\u03B5': '\\epsilon{}',
      '\u03B6': '\\zeta{}',
      '\u03B7': '\\eta{}',
      '\u03B9': '\\iota{}',
      '\u03BA': '\\kappa{}',
      '\u03BB': '\\lambda{}',
      '\u03BC': '\\mu{}',
      '\u03BD': '\\nu{}',
      '\u03BE': '\\xi{}',
      '\u03BF': 'o',
      '\u03C0': '\\pi{}',
      '\u03C1': '\\rho{}',
      '\u03C2': '\\varsigma{}',
      '\u03C3': '\\sigma{}',
      '\u03C4': '\\tau{}',
      '\u03C5': '\\upsilon{}',
      '\u03C6': '\\varphi{}',
      '\u03C7': '\\chi{}',
      '\u03C8': '\\psi{}',
      '\u03C9': '\\omega{}',
      '\u03CA': '\\ddot{\\iota}',
      '\u03CB': '\\ddot{\\upsilon}',
      '\u03CD': '\\acute{\\upsilon}',
      '\u03CE': '\\acute{\\omega}',
      '\u03D2': '\\Upsilon{}',
      '\u03D5': '\\phi{}',
      '\u03D6': '\\varpi{}',
      '\u03D8': '\\Qoppa{}',
      '\u03D9': '\\qoppa{}',
      '\u03DA': '\\Stigma{}',
      '\u03DB': '\\stigma{}',
      '\u03DC': '\\Digamma{}',
      '\u03DD': '\\digamma{}',
      '\u03DE': '\\Koppa{}',
      '\u03DF': '\\koppa{}',
      '\u03E0': '\\Sampi{}',
      '\u03E1': '\\sampi{}',
      '\u03F0': '\\varkappa{}',
      '\u03F1': '\\varrho{}',
      '\u03F5': '\\epsilon{}',
      '\u03F6': '\\backepsilon{}',
      '\u2001': '\\quad{}',
      '\u200A': '\\mkern1mu{}',
      '\u2016': '\\Vert{}',
      '\u2017': '\\twolowline{}',
      '\u201B': '\\Elzreapos{}',
      '\u2032': '{\'}',
      '\u2033': '{\'\'}',
      '\u2034': '{\'\'\'}',
      '\u2035': '\\backprime{}',
      '\u2036': '\\backdprime{}',
      '\u2037': '\\backtrprime{}',
      '\u2038': '\\caretinsert{}',
      '\u203C': '\\Exclam{}',
      '\u2040': '\\cat{}',
      '\u2043': '\\hyphenbullet{}',
      '\u2044': '\\fracslash{}',
      '\u2047': '\\Question{}',
      '\u2050': '\\closure{}',
      '\u2057': '\'\'\'\'',
      '\u20D0': '\\lvec{}',
      '\u20D1': '\\vec{}',
      '\u20D2': '\\vertoverlay{}',
      '\u20D6': '\\LVec{}',
      '\u20D7': '\\vec{}',
      '\u20DB': '\\dddot{}',
      '\u20DC': '\\ddddot{}',
      '\u20DD': '\\enclosecircle{}',
      '\u20DE': '\\enclosesquare{}',
      '\u20DF': '\\enclosediamond{}',
      '\u20E1': '\\overleftrightarrow{}',
      '\u20E4': '\\enclosetriangle{}',
      '\u20E7': '\\annuity{}',
      '\u20E8': '\\threeunderdot{}',
      '\u20E9': '\\widebridgeabove{}',
      '\u20EC': '\\underrightharpoondown{}',
      '\u20ED': '\\underleftharpoondown{}',
      '\u20EE': '\\underleftarrow{}',
      '\u20EF': '\\underrightarrow{}',
      '\u20F0': '\\asteraccent{}',
      '\u2102': '\\mathbb{C}',
      '\u2107': '\\Euler{}',
      '\u210B': '\\mathscr{H}',
      '\u210C': '\\mathfrak{H}',
      '\u210D': '\\mathbb{H}',
      '\u210E': '\\Planckconst{}',
      '\u210F': '\\hslash{}',
      '\u2110': '\\mathscr{I}',
      '\u2111': '\\mathfrak{I}',
      '\u2112': '\\mathscr{L}',
      '\u2113': '\\mathscr{l}',
      '\u2115': '\\mathbb{N}',
      '\u2118': '\\wp{}',
      '\u2119': '\\mathbb{P}',
      '\u211A': '\\mathbb{Q}',
      '\u211B': '\\mathscr{R}',
      '\u211C': '\\mathfrak{R}',
      '\u211D': '\\mathbb{R}',
      '\u211E': '\\Elzxrat{}',
      '\u2124': '\\mathbb{Z}',
      '\u2126': '\\Omega{}',
      '\u2127': '\\mho{}',
      '\u2128': '\\mathfrak{Z}',
      '\u2129': '\\ElsevierGlyph{2129}',
      '\u212C': '\\mathscr{B}',
      '\u212D': '\\mathfrak{C}',
      '\u212F': '\\mathscr{e}',
      '\u2130': '\\mathscr{E}',
      '\u2131': '\\mathscr{F}',
      '\u2132': '\\Finv{}',
      '\u2133': '\\mathscr{M}',
      '\u2134': '\\mathscr{o}',
      '\u2135': '\\aleph{}',
      '\u2136': '\\beth{}',
      '\u2137': '\\gimel{}',
      '\u2138': '\\daleth{}',
      '\u213C': '\\mathbb{\\pi}',
      '\u213D': '\\mathbb{\\gamma}',
      '\u213E': '\\mathbb{\\Gamma}',
      '\u213F': '\\mathbb{\\Pi}',
      '\u2140': '\\mathbb{\\Sigma}',
      '\u2141': '\\Game{}',
      '\u2142': '\\sansLturned{}',
      '\u2143': '\\sansLmirrored{}',
      '\u2144': '\\Yup{}',
      '\u2145': '\\CapitalDifferentialD{}',
      '\u2146': '\\DifferentialD{}',
      '\u2147': '\\ExponetialE{}',
      '\u2148': '\\ComplexI{}',
      '\u2149': '\\ComplexJ{}',
      '\u214A': '\\PropertyLine{}',
      '\u214B': '\\invamp{}',
      '\u2153': '\\textfrac{1}{3}',
      '\u2154': '\\textfrac{2}{3}',
      '\u2155': '\\textfrac{1}{5}',
      '\u2156': '\\textfrac{2}{5}',
      '\u2157': '\\textfrac{3}{5}',
      '\u2158': '\\textfrac{4}{5}',
      '\u2159': '\\textfrac{1}{6}',
      '\u215A': '\\textfrac{5}{6}',
      '\u215B': '\\textfrac{1}{8}',
      '\u215C': '\\textfrac{3}{8}',
      '\u215D': '\\textfrac{5}{8}',
      '\u215E': '\\textfrac{7}{8}',
      '\u2190': '\\leftarrow{}',
      '\u2191': '\\uparrow{}',
      '\u2192': '\\rightarrow{}',
      '\u2193': '\\downarrow{}',
      '\u2194': '\\leftrightarrow{}',
      '\u2195': '\\updownarrow{}',
      '\u2196': '\\nwarrow{}',
      '\u2197': '\\nearrow{}',
      '\u2198': '\\searrow{}',
      '\u2199': '\\swarrow{}',
      '\u219A': '\\nleftarrow{}',
      '\u219B': '\\nrightarrow{}',
      '\u219C': '\\arrowwaveleft{}',
      '\u219D': '\\arrowwaveright{}',
      '\u219E': '\\twoheadleftarrow{}',
      '\u219F': '\\twoheaduparrow{}',
      '\u21A0': '\\twoheadrightarrow{}',
      '\u21A1': '\\twoheaddownarrow{}',
      '\u21A2': '\\leftarrowtail{}',
      '\u21A3': '\\rightarrowtail{}',
      '\u21A4': '\\mapsfrom{}',
      '\u21A5': '\\MapsUp{}',
      '\u21A6': '\\mapsto{}',
      '\u21A7': '\\MapsDown{}',
      '\u21A8': '\\updownarrowbar{}',
      '\u21A9': '\\hookleftarrow{}',
      '\u21AA': '\\hookrightarrow{}',
      '\u21AB': '\\looparrowleft{}',
      '\u21AC': '\\looparrowright{}',
      '\u21AD': '\\leftrightsquigarrow{}',
      '\u21AE': '\\nleftrightarrow{}',
      '\u21AF': '\\lightning{}',
      '\u21B0': '\\Lsh{}',
      '\u21B1': '\\Rsh{}',
      '\u21B2': '\\dlsh{}',
      '\u21B3': '\\ElsevierGlyph{21B3}',
      '\u21B4': '\\linefeed{}',
      '\u21B5': '\\carriagereturn{}',
      '\u21B6': '\\curvearrowleft{}',
      '\u21B7': '\\curvearrowright{}',
      '\u21B8': '\\barovernorthwestarrow{}',
      '\u21B9': '\\barleftarrowrightarrowba{}',
      '\u21BA': '\\circlearrowleft{}',
      '\u21BB': '\\circlearrowright{}',
      '\u21BC': '\\leftharpoonup{}',
      '\u21BD': '\\leftharpoondown{}',
      '\u21BE': '\\upharpoonright{}',
      '\u21BF': '\\upharpoonleft{}',
      '\u21C0': '\\rightharpoonup{}',
      '\u21C1': '\\rightharpoondown{}',
      '\u21C2': '\\downharpoonright{}',
      '\u21C3': '\\downharpoonleft{}',
      '\u21C4': '\\rightleftarrows{}',
      '\u21C5': '\\dblarrowupdown{}',
      '\u21C6': '\\leftrightarrows{}',
      '\u21C7': '\\leftleftarrows{}',
      '\u21C8': '\\upuparrows{}',
      '\u21C9': '\\rightrightarrows{}',
      '\u21CA': '\\downdownarrows{}',
      '\u21CB': '\\leftrightharpoons{}',
      '\u21CC': '\\rightleftharpoons{}',
      '\u21CD': '\\nLeftarrow{}',
      '\u21CE': '\\nLeftrightarrow{}',
      '\u21CF': '\\nRightarrow{}',
      '\u21D0': '\\Leftarrow{}',
      '\u21D1': '\\Uparrow{}',
      '\u21D2': '\\Rightarrow{}',
      '\u21D3': '\\Downarrow{}',
      '\u21D4': '\\Leftrightarrow{}',
      '\u21D5': '\\Updownarrow{}',
      '\u21D6': '\\Nwarrow{}',
      '\u21D7': '\\Nearrow{}',
      '\u21D8': '\\Searrow{}',
      '\u21D9': '\\Swarrow{}',
      '\u21DA': '\\Lleftarrow{}',
      '\u21DB': '\\Rrightarrow{}',
      '\u21DC': '\\leftsquigarrow{}',
      '\u21DD': '\\rightsquigarrow{}',
      '\u21DE': '\\nHuparrow{}',
      '\u21DF': '\\nHdownarrow{}',
      '\u21E0': '\\dashleftarrow{}',
      '\u21E1': '\\updasharrow{}',
      '\u21E2': '\\dashrightarrow{}',
      '\u21E3': '\\downdasharrow{}',
      '\u21E4': '\\LeftArrowBar{}',
      '\u21E5': '\\RightArrowBar{}',
      '\u21E6': '\\leftwhitearrow{}',
      '\u21E7': '\\upwhitearrow{}',
      '\u21E8': '\\rightwhitearrow{}',
      '\u21E9': '\\downwhitearrow{}',
      '\u21EA': '\\whitearrowupfrombar{}',
      '\u21F4': '\\circleonrightarrow{}',
      '\u21F5': '\\DownArrowUpArrow{}',
      '\u21F6': '\\rightthreearrows{}',
      '\u21F7': '\\nvleftarrow{}',
      '\u21F8': '\\pfun{}',
      '\u21F9': '\\nvleftrightarrow{}',
      '\u21FA': '\\nVleftarrow{}',
      '\u21FB': '\\ffun{}',
      '\u21FC': '\\nVleftrightarrow{}',
      '\u21FD': '\\leftarrowtriangle{}',
      '\u21FE': '\\rightarrowtriangle{}',
      '\u21FF': '\\leftrightarrowtriangle{}',
      '\u2200': '\\forall{}',
      '\u2201': '\\complement{}',
      '\u2202': '\\partial{}',
      '\u2203': '\\exists{}',
      '\u2204': '\\nexists{}',
      '\u2205': '\\varnothing{}',
      '\u2206': '\\increment{}',
      '\u2207': '\\nabla{}',
      '\u2208': '\\in{}',
      '\u2209': '\\not\\in{}',
      '\u220A': '\\smallin{}',
      '\u220B': '\\ni{}',
      '\u220C': '\\not\\ni{}',
      '\u220D': '\\smallni{}',
      '\u220E': '\\QED{}',
      '\u220F': '\\prod{}',
      '\u2210': '\\coprod{}',
      '\u2211': '\\sum{}',
      '\u2213': '\\mp{}',
      '\u2214': '\\dotplus{}',
      '\u2215': '\\slash{}',
      '\u2216': '\\setminus{}',
      '\u2217': '{_\\ast}',
      '\u2218': '\\circ{}',
      '\u2219': '\\bullet{}',
      '\u221A': '\\surd{}',
      '\u221B': '\\sqrt[3]',
      '\u221C': '\\sqrt[4]',
      '\u221D': '\\propto{}',
      '\u221E': '\\infty{}',
      '\u221F': '\\rightangle{}',
      '\u2220': '\\angle{}',
      '\u2221': '\\measuredangle{}',
      '\u2222': '\\sphericalangle{}',
      '\u2223': '\\mid{}',
      '\u2224': '\\nmid{}',
      '\u2225': '\\parallel{}',
      '\u2226': '\\nparallel{}',
      '\u2227': '\\wedge{}',
      '\u2228': '\\vee{}',
      '\u2229': '\\cap{}',
      '\u222A': '\\cup{}',
      '\u222B': '\\int{}',
      '\u222C': '{\\int\\!\\int}',
      '\u222D': '{\\int\\!\\int\\!\\int}',
      '\u222E': '\\oint{}',
      '\u222F': '\\surfintegral{}',
      '\u2230': '\\volintegral{}',
      '\u2231': '\\clwintegral{}',
      '\u2232': '\\ElsevierGlyph{2232}',
      '\u2233': '\\ElsevierGlyph{2233}',
      '\u2234': '\\therefore{}',
      '\u2235': '\\because{}',
      '\u2236': ':',
      '\u2237': '\\Colon{}',
      '\u2238': '\\ElsevierGlyph{2238}',
      '\u2239': '\\eqcolon{}',
      '\u223A': '\\mathbin{{:}\\!\\!{-}\\!\\!{:}}',
      '\u223B': '\\homothetic{}',
      '\u223C': '\\sim{}',
      '\u223D': '\\backsim{}',
      '\u223E': '\\lazysinv{}',
      '\u223F': '\\AC{}',
      '\u2240': '\\wr{}',
      '\u2241': '\\not\\sim{}',
      '\u2242': '\\ElsevierGlyph{2242}',
      '\u2243': '\\simeq{}',
      '\u2244': '\\not\\simeq{}',
      '\u2245': '\\cong{}',
      '\u2246': '\\approxnotequal{}',
      '\u2247': '\\not\\cong{}',
      '\u2248': '\\approx{}',
      '\u2249': '\\not\\approx{}',
      '\u224A': '\\approxeq{}',
      '\u224B': '\\tildetrpl{}',
      '\u224C': '\\allequal{}',
      '\u224D': '\\asymp{}',
      '\u224E': '\\Bumpeq{}',
      '\u224F': '\\bumpeq{}',
      '\u2250': '\\doteq{}',
      '\u2251': '\\doteqdot{}',
      '\u2252': '\\fallingdotseq{}',
      '\u2253': '\\risingdotseq{}',
      '\u2255': '=:',
      '\u2256': '\\eqcirc{}',
      '\u2257': '\\circeq{}',
      '\u2258': '\\arceq{}',
      '\u2259': '\\estimates{}',
      '\u225A': '\\ElsevierGlyph{225A}',
      '\u225B': '\\starequal{}',
      '\u225C': '\\triangleq{}',
      '\u225D': '\\eqdef{}',
      '\u225E': '\\measeq{}',
      '\u225F': '\\ElsevierGlyph{225F}',
      '\u2260': '\\not =',
      '\u2261': '\\equiv{}',
      '\u2262': '\\not\\equiv{}',
      '\u2263': '\\Equiv{}',
      '\u2264': '\\leq{}',
      '\u2265': '\\geq{}',
      '\u2266': '\\leqq{}',
      '\u2267': '\\geqq{}',
      '\u2268': '\\lneqq{}',
      '\u2269': '\\gneqq{}',
      '\u226A': '\\ll{}',
      '\u226B': '\\gg{}',
      '\u226C': '\\between{}',
      '\u226D': '{\\not\\kern-0.3em\\times}',
      '\u226E': '\\not<',
      '\u226F': '\\not>',
      '\u2270': '\\not\\leq{}',
      '\u2271': '\\not\\geq{}',
      '\u2272': '\\lessequivlnt{}',
      '\u2273': '\\greaterequivlnt{}',
      '\u2274': '\\ElsevierGlyph{2274}',
      '\u2275': '\\ElsevierGlyph{2275}',
      '\u2276': '\\lessgtr{}',
      '\u2277': '\\gtrless{}',
      '\u2278': '\\notlessgreater{}',
      '\u2279': '\\notgreaterless{}',
      '\u227A': '\\prec{}',
      '\u227B': '\\succ{}',
      '\u227C': '\\preccurlyeq{}',
      '\u227D': '\\succcurlyeq{}',
      '\u227E': '\\precapprox{}',
      '\u227F': '\\succapprox{}',
      '\u2280': '\\not\\prec{}',
      '\u2281': '\\not\\succ{}',
      '\u2282': '\\subset{}',
      '\u2283': '\\supset{}',
      '\u2284': '\\not\\subset{}',
      '\u2285': '\\not\\supset{}',
      '\u2286': '\\subseteq{}',
      '\u2287': '\\supseteq{}',
      '\u2288': '\\not\\subseteq{}',
      '\u2289': '\\not\\supseteq{}',
      '\u228A': '\\subsetneq{}',
      '\u228B': '\\supsetneq{}',
      '\u228C': '\\cupleftarrow{}',
      '\u228D': '\\cupdot{}',
      '\u228E': '\\uplus{}',
      '\u228F': '\\sqsubset{}',
      '\u2290': '\\sqsupset{}',
      '\u2291': '\\sqsubseteq{}',
      '\u2292': '\\sqsupseteq{}',
      '\u2293': '\\sqcap{}',
      '\u2294': '\\sqcup{}',
      '\u2295': '\\oplus{}',
      '\u2296': '\\ominus{}',
      '\u2297': '\\otimes{}',
      '\u2298': '\\oslash{}',
      '\u2299': '\\odot{}',
      '\u229A': '\\circledcirc{}',
      '\u229B': '\\circledast{}',
      '\u229C': '\\circledequal{}',
      '\u229D': '\\circleddash{}',
      '\u229E': '\\boxplus{}',
      '\u229F': '\\boxminus{}',
      '\u22A0': '\\boxtimes{}',
      '\u22A1': '\\boxdot{}',
      '\u22A2': '\\vdash{}',
      '\u22A3': '\\dashv{}',
      '\u22A4': '\\top{}',
      '\u22A5': '\\perp{}',
      '\u22A6': '\\assert{}',
      '\u22A7': '\\truestate{}',
      '\u22A8': '\\forcesextra{}',
      '\u22A9': '\\Vdash{}',
      '\u22AA': '\\Vvdash{}',
      '\u22AB': '\\VDash{}',
      '\u22AC': '\\nvdash{}',
      '\u22AD': '\\nvDash{}',
      '\u22AE': '\\nVdash{}',
      '\u22AF': '\\nVDash{}',
      '\u22B0': '\\prurel{}',
      '\u22B1': '\\scurel{}',
      '\u22B2': '\\vartriangleleft{}',
      '\u22B3': '\\vartriangleright{}',
      '\u22B4': '\\trianglelefteq{}',
      '\u22B5': '\\trianglerighteq{}',
      '\u22B6': '\\original{}',
      '\u22B7': '\\image{}',
      '\u22B8': '\\multimap{}',
      '\u22B9': '\\hermitconjmatrix{}',
      '\u22BA': '\\intercal{}',
      '\u22BB': '\\veebar{}',
      '\u22BC': '\\barwedge{}',
      '\u22BD': '\\barvee{}',
      '\u22BE': '\\rightanglearc{}',
      '\u22BF': '\\varlrtriangle{}',
      '\u22C0': '\\ElsevierGlyph{22C0}',
      '\u22C1': '\\ElsevierGlyph{22C1}',
      '\u22C2': '\\bigcap{}',
      '\u22C3': '\\bigcup{}',
      '\u22C4': '\\diamond{}',
      '\u22C5': '\\cdot{}',
      '\u22C6': '\\star{}',
      '\u22C7': '\\divideontimes{}',
      '\u22C8': '\\bowtie{}',
      '\u22C9': '\\ltimes{}',
      '\u22CA': '\\rtimes{}',
      '\u22CB': '\\leftthreetimes{}',
      '\u22CC': '\\rightthreetimes{}',
      '\u22CD': '\\backsimeq{}',
      '\u22CE': '\\curlyvee{}',
      '\u22CF': '\\curlywedge{}',
      '\u22D0': '\\Subset{}',
      '\u22D1': '\\Supset{}',
      '\u22D2': '\\Cap{}',
      '\u22D3': '\\Cup{}',
      '\u22D4': '\\pitchfork{}',
      '\u22D5': '\\hash{}',
      '\u22D6': '\\lessdot{}',
      '\u22D7': '\\gtrdot{}',
      '\u22D8': '\\verymuchless{}',
      '\u22D9': '\\verymuchgreater{}',
      '\u22DA': '\\lesseqgtr{}',
      '\u22DB': '\\gtreqless{}',
      '\u22DC': '\\eqless{}',
      '\u22DD': '\\eqgtr{}',
      '\u22DE': '\\curlyeqprec{}',
      '\u22DF': '\\curlyeqsucc{}',
      '\u22E0': '\\npreceq{}',
      '\u22E1': '\\nsucceq{}',
      '\u22E2': '\\not\\sqsubseteq{}',
      '\u22E3': '\\not\\sqsupseteq{}',
      '\u22E4': '\\sqsubsetneq{}',
      '\u22E5': '\\Elzsqspne{}',
      '\u22E6': '\\lnsim{}',
      '\u22E7': '\\gnsim{}',
      '\u22E8': '\\precedesnotsimilar{}',
      '\u22E9': '\\succnsim{}',
      '\u22EA': '\\ntriangleleft{}',
      '\u22EB': '\\ntriangleright{}',
      '\u22EC': '\\ntrianglelefteq{}',
      '\u22ED': '\\ntrianglerighteq{}',
      '\u22EE': '\\vdots{}',
      '\u22EF': '\\cdots{}',
      '\u22F0': '\\upslopeellipsis{}',
      '\u22F1': '\\downslopeellipsis{}',
      '\u22F2': '\\disin{}',
      '\u22F3': '\\varisins{}',
      '\u22F4': '\\isins{}',
      '\u22F5': '\\isindot{}',
      '\u22F6': '\\barin{}',
      '\u22F7': '\\isinobar{}',
      '\u22F8': '\\isinvb{}',
      '\u22F9': '\\isinE{}',
      '\u22FA': '\\nisd{}',
      '\u22FB': '\\varnis{}',
      '\u22FC': '\\nis{}',
      '\u22FD': '\\varniobar{}',
      '\u22FE': '\\niobar{}',
      '\u22FF': '\\bagmember{}',
      '\u2300': '\\diameter{}',
      '\u2302': '\\house{}',
      '\u2306': '\\perspcorrespond{}',
      '\u2308': '\\lceil{}',
      '\u2309': '\\rceil{}',
      '\u230A': '\\lfloor{}',
      '\u230B': '\\rfloor{}',
      '\u2310': '\\invneg{}',
      '\u2311': '\\wasylozenge{}',
      '\u2312': '\\profline{}',
      '\u2313': '\\profsurf{}',
      '\u2315': '\\recorder{}',
      '\u2316': '{\\mathchar"2208}',
      '\u2317': '\\viewdata{}',
      '\u2319': '\\turnednot{}',
      '\u231C': '\\ulcorner{}',
      '\u231D': '\\urcorner{}',
      '\u231E': '\\llcorner{}',
      '\u231F': '\\lrcorner{}',
      '\u2320': '\\inttop{}',
      '\u2321': '\\intbottom{}',
      '\u2322': '\\frown{}',
      '\u2323': '\\smile{}',
      '\u2329': '\\langle{}',
      '\u232A': '\\rangle{}',
      '\u232C': '\\varhexagonlrbonds{}',
      '\u2332': '\\conictaper{}',
      '\u2336': '\\topbot{}',
      '\u2339': '\\APLinv{}',
      '\u233D': '\\ElsevierGlyph{E838}',
      '\u233F': '\\notslash{}',
      '\u2340': '\\notbackslash{}',
      '\u2347': '\\APLleftarrowbox{}',
      '\u2348': '\\APLrightarrowbox{}',
      '\u2350': '\\APLuparrowbox{}',
      '\u2353': '\\APLboxupcaret{}',
      '\u2357': '\\APLdownarrowbox{}',
      '\u235D': '\\APLcomment{}',
      '\u235E': '\\APLinput{}',
      '\u235F': '\\APLlog{}',
      '\u2370': '\\APLboxquestion{}',
      '\u237C': '\\rangledownzigzagarrow{}',
      '\u2394': '\\hexagon{}',
      '\u239B': '\\lparenuend{}',
      '\u239C': '\\lparenextender{}',
      '\u239D': '\\lparenlend{}',
      '\u239E': '\\rparenuend{}',
      '\u239F': '\\rparenextender{}',
      '\u23A0': '\\rparenlend{}',
      '\u23A1': '\\lbrackuend{}',
      '\u23A2': '\\lbrackextender{}',
      '\u23A3': '\\Elzdlcorn{}',
      '\u23A4': '\\rbrackuend{}',
      '\u23A5': '\\rbrackextender{}',
      '\u23A6': '\\rbracklend{}',
      '\u23A7': '\\lbraceuend{}',
      '\u23A8': '\\lbracemid{}',
      '\u23A9': '\\lbracelend{}',
      '\u23AA': '\\vbraceextender{}',
      '\u23AB': '\\rbraceuend{}',
      '\u23AC': '\\rbracemid{}',
      '\u23AD': '\\rbracelend{}',
      '\u23AE': '\\intextender{}',
      '\u23AF': '\\harrowextender{}',
      '\u23B0': '\\lmoustache{}',
      '\u23B1': '\\rmoustache{}',
      '\u23B2': '\\sumtop{}',
      '\u23B3': '\\sumbottom{}',
      '\u23B4': '\\overbracket{}',
      '\u23B5': '\\underbracket{}',
      '\u23B6': '\\bbrktbrk{}',
      '\u23B7': '\\sqrtbottom{}',
      '\u23B8': '\\lvboxline{}',
      '\u23B9': '\\rvboxline{}',
      '\u23CE': '\\varcarriagereturn{}',
      '\u23DC': '\\overparen{}',
      '\u23DD': '\\underparen{}',
      '\u23DE': '\\overbrace{}',
      '\u23DF': '\\underbrace{}',
      '\u23E0': '\\obrbrak{}',
      '\u23E1': '\\ubrbrak{}',
      '\u23E2': '\\trapezium{}',
      '\u23E3': '\\benzenr{}',
      '\u23E4': '\\strns{}',
      '\u23E5': '\\fltns{}',
      '\u23E6': '\\accurrent{}',
      '\u23E7': '\\elinters{}',
      '\u24C8': '\\circledS{}',
      '\u2506': '\\Elzdshfnc{}',
      '\u2519': '\\Elzsqfnw{}',
      '\u2571': '\\diagup{}',
      '\u2580': '\\blockuphalf{}',
      '\u2584': '\\blocklowhalf{}',
      '\u2588': '\\blockfull{}',
      '\u258C': '\\blocklefthalf{}',
      '\u2590': '\\blockrighthalf{}',
      '\u2591': '\\blockqtrshaded{}',
      '\u2592': '\\blockhalfshaded{}',
      '\u2593': '\\blockthreeqtrshaded{}',
      '\u25A1': '\\square{}',
      '\u25A2': '\\squoval{}',
      '\u25A3': '\\blackinwhitesquare{}',
      '\u25A4': '\\squarehfill{}',
      '\u25A5': '\\squarevfill{}',
      '\u25A6': '\\squarehvfill{}',
      '\u25A7': '\\squarenwsefill{}',
      '\u25A8': '\\squareneswfill{}',
      '\u25A9': '\\squarecrossfill{}',
      '\u25AA': '\\blacksquare{}',
      '\u25AB': '\\smwhtsquare{}',
      '\u25AC': '\\hrectangleblack{}',
      '\u25AD': '\\fbox{~~}',
      '\u25AE': '\\vrectangleblack{}',
      '\u25AF': '\\Elzvrecto{}',
      '\u25B0': '\\parallelogramblack{}',
      '\u25B1': '\\ElsevierGlyph{E381}',
      '\u25B3': '\\bigtriangleup{}',
      '\u25B4': '\\blacktriangle{}',
      '\u25B5': '\\vartriangle{}',
      '\u25B6': '\\RHD{}',
      '\u25B7': '\\rhd{}',
      '\u25B8': '\\blacktriangleright{}',
      '\u25B9': '\\triangleright{}',
      '\u25BA': '\\blackpointerright{}',
      '\u25BB': '\\whitepointerright{}',
      '\u25BD': '\\bigtriangledown{}',
      '\u25BE': '\\blacktriangledown{}',
      '\u25BF': '\\triangledown{}',
      '\u25C0': '\\LHD{}',
      '\u25C1': '\\lhd{}',
      '\u25C2': '\\blacktriangleleft{}',
      '\u25C3': '\\triangleleft{}',
      '\u25C4': '\\blackpointerleft{}',
      '\u25C5': '\\whitepointerleft{}',
      '\u25C7': '\\Diamond{}',
      '\u25C8': '\\blackinwhitediamond{}',
      '\u25C9': '\\fisheye{}',
      '\u25CA': '\\lozenge{}',
      '\u25CB': '\\bigcirc{}',
      '\u25CC': '\\dottedcircle{}',
      '\u25CD': '\\circlevertfill{}',
      '\u25CE': '\\bullseye{}',
      '\u25D0': '\\Elzcirfl{}',
      '\u25D1': '\\Elzcirfr{}',
      '\u25D2': '\\Elzcirfb{}',
      '\u25D3': '\\circletophalfblack{}',
      '\u25D4': '\\circleurquadblack{}',
      '\u25D5': '\\blackcircleulquadwhite{}',
      '\u25D6': '\\LEFTCIRCLE{}',
      '\u25D8': '\\Elzrvbull{}',
      '\u25D9': '\\inversewhitecircle{}',
      '\u25DA': '\\invwhiteupperhalfcircle{}',
      '\u25DB': '\\invwhitelowerhalfcircle{}',
      '\u25DC': '\\ularc{}',
      '\u25DD': '\\urarc{}',
      '\u25DE': '\\lrarc{}',
      '\u25DF': '\\llarc{}',
      '\u25E0': '\\topsemicircle{}',
      '\u25E1': '\\botsemicircle{}',
      '\u25E2': '\\lrblacktriangle{}',
      '\u25E3': '\\llblacktriangle{}',
      '\u25E4': '\\ulblacktriangle{}',
      '\u25E5': '\\urblacktriangle{}',
      '\u25E6': '\\smwhtcircle{}',
      '\u25E7': '\\Elzsqfl{}',
      '\u25E8': '\\Elzsqfr{}',
      '\u25E9': '\\squareulblack{}',
      '\u25EA': '\\Elzsqfse{}',
      '\u25EB': '\\boxbar{}',
      '\u25EC': '\\trianglecdot{}',
      '\u25ED': '\\triangleleftblack{}',
      '\u25EE': '\\trianglerightblack{}',
      '\u25EF': '\\bigcirc{}',
      '\u25F0': '\\squareulquad{}',
      '\u25F1': '\\squarellquad{}',
      '\u25F2': '\\squarelrquad{}',
      '\u25F3': '\\squareurquad{}',
      '\u25F4': '\\circleulquad{}',
      '\u25F5': '\\circlellquad{}',
      '\u25F6': '\\circlelrquad{}',
      '\u25F7': '\\circleurquad{}',
      '\u25F8': '\\ultriangle{}',
      '\u25F9': '\\urtriangle{}',
      '\u25FA': '\\lltriangle{}',
      '\u25FB': '\\square{}',
      '\u25FC': '\\blacksquare{}',
      '\u25FD': '\\mdsmwhtsquare{}',
      '\u25FE': '\\mdsmblksquare{}',
      '\u25FF': '\\lrtriangle{}',
      '\u2609': '\\Sun{}',
      '\u2610': '\\Square{}',
      '\u2611': '\\CheckedBox{}',
      '\u2612': '\\XBox{}',
      '\u2615': '\\steaming{}',
      '\u2620': '\\skull{}',
      '\u2621': '\\danger{}',
      '\u2622': '\\radiation{}',
      '\u2623': '\\biohazard{}',
      '\u262F': '\\yinyang{}',
      '\u2639': '\\frownie{}',
      '\u263A': '\\smiley{}',
      '\u263B': '\\blacksmiley{}',
      '\u263C': '\\sun{}',
      '\u263D': '\\rightmoon{}',
      '\u2641': '\\earth{}',
      '\u2661': '\\heartsuit{}',
      '\u2662': '\\diamond{}',
      '\u2664': '\\varspadesuit{}',
      '\u2667': '\\varclubsuit{}',
      '\u266B': '\\twonotes{}',
      '\u266C': '\\sixteenthnote{}',
      '\u266D': '\\flat{}',
      '\u266E': '\\natural{}',
      '\u266F': '\\sharp{}',
      '\u267B': '\\recycle{}',
      '\u267E': '\\acidfree{}',
      '\u2680': '\\dicei{}',
      '\u2681': '\\diceii{}',
      '\u2682': '\\diceiii{}',
      '\u2683': '\\diceiv{}',
      '\u2684': '\\dicev{}',
      '\u2685': '\\dicevi{}',
      '\u2686': '\\circledrightdot{}',
      '\u2687': '\\circledtwodots{}',
      '\u2688': '\\blackcircledrightdot{}',
      '\u2689': '\\blackcircledtwodots{}',
      '\u2693': '\\anchor{}',
      '\u2694': '\\swords{}',
      '\u26A0': '\\warning{}',
      '\u26A5': '\\Hermaphrodite{}',
      '\u26AA': '\\medcirc{}',
      '\u26AB': '\\medbullet{}',
      '\u26AC': '\\mdsmwhtcircle{}',
      '\u26B2': '\\neuter{}',
      '\u2772': '\\lbrbrak{}',
      '\u2773': '\\rbrbrak{}',
      '\u27C0': '\\threedangle{}',
      '\u27C1': '\\whiteinwhitetriangle{}',
      '\u27C2': '\\perp{}',
      '\u27C3': '\\subsetcirc{}',
      '\u27C4': '\\supsetcirc{}',
      '\u27C5': '\\Lbag{}',
      '\u27C6': '\\Rbag{}',
      '\u27C7': '\\veedot{}',
      '\u27C8': '\\bsolhsub{}',
      '\u27C9': '\\suphsol{}',
      '\u27CC': '\\longdivision{}',
      '\u27D0': '\\Diamonddot{}',
      '\u27D1': '\\wedgedot{}',
      '\u27D2': '\\upin{}',
      '\u27D3': '\\pullback{}',
      '\u27D4': '\\pushout{}',
      '\u27D5': '\\leftouterjoin{}',
      '\u27D6': '\\rightouterjoin{}',
      '\u27D7': '\\fullouterjoin{}',
      '\u27D8': '\\bigbot{}',
      '\u27D9': '\\bigtop{}',
      '\u27DA': '\\DashVDash{}',
      '\u27DB': '\\dashVdash{}',
      '\u27DC': '\\multimapinv{}',
      '\u27DD': '\\vlongdash{}',
      '\u27DE': '\\longdashv{}',
      '\u27DF': '\\cirbot{}',
      '\u27E0': '\\lozengeminus{}',
      '\u27E1': '\\concavediamond{}',
      '\u27E2': '\\concavediamondtickleft{}',
      '\u27E3': '\\concavediamondtickright{}',
      '\u27E4': '\\whitesquaretickleft{}',
      '\u27E5': '\\whitesquaretickright{}',
      '\u27E6': '\\llbracket{}',
      '\u27E7': '\\rrbracket{}',
      '\u27EA': '\\lang{}',
      '\u27EB': '\\rang{}',
      '\u27EC': '\\Lbrbrak{}',
      '\u27ED': '\\Rbrbrak{}',
      '\u27EE': '\\lgroup{}',
      '\u27EF': '\\rgroup{}',
      '\u27F0': '\\UUparrow{}',
      '\u27F1': '\\DDownarrow{}',
      '\u27F2': '\\acwgapcirclearrow{}',
      '\u27F3': '\\cwgapcirclearrow{}',
      '\u27F4': '\\rightarrowonoplus{}',
      '\u27F5': '\\longleftarrow{}',
      '\u27F6': '\\longrightarrow{}',
      '\u27F7': '\\longleftrightarrow{}',
      '\u27F8': '\\Longleftarrow{}',
      '\u27F9': '\\Longrightarrow{}',
      '\u27FA': '\\Longleftrightarrow{}',
      '\u27FB': '\\longmapsfrom{}',
      '\u27FC': '\\longmapsto{}',
      '\u27FD': '\\Longmapsfrom{}',
      '\u27FE': '\\Longmapsto{}',
      '\u27FF': '\\sim\\joinrel\\leadsto{}',
      '\u2900': '\\psur{}',
      '\u2901': '\\nVtwoheadrightarrow{}',
      '\u2902': '\\nvLeftarrow{}',
      '\u2903': '\\nvRightarrow{}',
      '\u2904': '\\nvLeftrightarrow{}',
      '\u2905': '\\ElsevierGlyph{E212}',
      '\u2906': '\\Mapsfrom{}',
      '\u2907': '\\Mapsto{}',
      '\u2908': '\\downarrowbarred{}',
      '\u2909': '\\uparrowbarred{}',
      '\u290A': '\\Uuparrow{}',
      '\u290B': '\\Ddownarrow{}',
      '\u290C': '\\leftbkarrow{}',
      '\u290D': '\\rightbkarrow{}',
      '\u290E': '\\leftdbkarrow{}',
      '\u290F': '\\dbkarow{}',
      '\u2910': '\\drbkarow{}',
      '\u2911': '\\rightdotarrow{}',
      '\u2912': '\\UpArrowBar{}',
      '\u2913': '\\DownArrowBar{}',
      '\u2914': '\\pinj{}',
      '\u2915': '\\finj{}',
      '\u2916': '\\bij{}',
      '\u2917': '\\nvtwoheadrightarrowtail{}',
      '\u2918': '\\nVtwoheadrightarrowtail{}',
      '\u2919': '\\lefttail{}',
      '\u291A': '\\righttail{}',
      '\u291B': '\\leftdbltail{}',
      '\u291C': '\\rightdbltail{}',
      '\u291D': '\\diamondleftarrow{}',
      '\u291E': '\\rightarrowdiamond{}',
      '\u291F': '\\diamondleftarrowbar{}',
      '\u2920': '\\barrightarrowdiamond{}',
      '\u2921': '\\nwsearrow{}',
      '\u2922': '\\neswarrow{}',
      '\u2923': '\\ElsevierGlyph{E20C}',
      '\u2924': '\\ElsevierGlyph{E20D}',
      '\u2925': '\\ElsevierGlyph{E20B}',
      '\u2926': '\\ElsevierGlyph{E20A}',
      '\u2927': '\\ElsevierGlyph{E211}',
      '\u2928': '\\ElsevierGlyph{E20E}',
      '\u2929': '\\ElsevierGlyph{E20F}',
      '\u292A': '\\ElsevierGlyph{E210}',
      '\u292B': '\\rdiagovfdiag{}',
      '\u292C': '\\fdiagovrdiag{}',
      '\u292D': '\\seovnearrow{}',
      '\u292E': '\\neovsearrow{}',
      '\u292F': '\\fdiagovnearrow{}',
      '\u2930': '\\rdiagovsearrow{}',
      '\u2931': '\\neovnwarrow{}',
      '\u2932': '\\nwovnearrow{}',
      '\u2933': '\\ElsevierGlyph{E21C}',
      '\u2934': '\\uprightcurvearrow{}',
      '\u2935': '\\downrightcurvedarrow{}',
      '\u2936': '\\ElsevierGlyph{E21A}',
      '\u2937': '\\ElsevierGlyph{E219}',
      '\u2938': '\\cwrightarcarrow{}',
      '\u2939': '\\acwleftarcarrow{}',
      '\u293A': '\\acwoverarcarrow{}',
      '\u293B': '\\acwunderarcarrow{}',
      '\u293C': '\\curvearrowrightminus{}',
      '\u293D': '\\curvearrowleftplus{}',
      '\u293E': '\\cwundercurvearrow{}',
      '\u293F': '\\ccwundercurvearrow{}',
      '\u2940': '\\Elolarr{}',
      '\u2941': '\\Elorarr{}',
      '\u2942': '\\ElzRlarr{}',
      '\u2943': '\\leftarrowshortrightarrow{}',
      '\u2944': '\\ElzrLarr{}',
      '\u2945': '\\rightarrowplus{}',
      '\u2946': '\\leftarrowplus{}',
      '\u2947': '\\Elzrarrx{}',
      '\u2948': '\\leftrightarrowcircle{}',
      '\u2949': '\\twoheaduparrowcircle{}',
      '\u294A': '\\leftrightharpoon{}',
      '\u294B': '\\rightleftharpoon{}',
      '\u294C': '\\updownharpoonrightleft{}',
      '\u294D': '\\updownharpoonleftright{}',
      '\u294E': '\\LeftRightVector{}',
      '\u294F': '\\RightUpDownVector{}',
      '\u2950': '\\DownLeftRightVector{}',
      '\u2951': '\\LeftUpDownVector{}',
      '\u2952': '\\LeftVectorBar{}',
      '\u2953': '\\RightVectorBar{}',
      '\u2954': '\\RightUpVectorBar{}',
      '\u2955': '\\RightDownVectorBar{}',
      '\u2956': '\\DownLeftVectorBar{}',
      '\u2957': '\\DownRightVectorBar{}',
      '\u2958': '\\LeftUpVectorBar{}',
      '\u2959': '\\LeftDownVectorBar{}',
      '\u295A': '\\LeftTeeVector{}',
      '\u295B': '\\RightTeeVector{}',
      '\u295C': '\\RightUpTeeVector{}',
      '\u295D': '\\RightDownTeeVector{}',
      '\u295E': '\\DownLeftTeeVector{}',
      '\u295F': '\\DownRightTeeVector{}',
      '\u2960': '\\LeftUpTeeVector{}',
      '\u2961': '\\LeftDownTeeVector{}',
      '\u2962': '\\leftleftharpoons{}',
      '\u2963': '\\upupharpoons{}',
      '\u2964': '\\rightrightharpoons{}',
      '\u2965': '\\downdownharpoons{}',
      '\u2966': '\\leftrightharpoonsup{}',
      '\u2967': '\\leftrightharpoonsdown{}',
      '\u2968': '\\rightleftharpoonsup{}',
      '\u2969': '\\rightleftharpoonsdown{}',
      '\u296A': '\\leftbarharpoon{}',
      '\u296B': '\\barleftharpoon{}',
      '\u296C': '\\rightbarharpoon{}',
      '\u296D': '\\barrightharpoon{}',
      '\u296E': '\\UpEquilibrium{}',
      '\u296F': '\\ReverseUpEquilibrium{}',
      '\u2970': '\\RoundImplies{}',
      '\u2971': '\\equalrightarrow{}',
      '\u2972': '\\similarrightarrow{}',
      '\u2973': '\\leftarrowsimilar{}',
      '\u2974': '\\rightarrowsimilar{}',
      '\u2975': '\\rightarrowapprox{}',
      '\u2976': '\\ltlarr{}',
      '\u2977': '\\leftarrowless{}',
      '\u2978': '\\gtrarr{}',
      '\u2979': '\\subrarr{}',
      '\u297A': '\\leftarrowsubset{}',
      '\u297B': '\\suplarr{}',
      '\u297C': '\\ElsevierGlyph{E214}',
      '\u297D': '\\ElsevierGlyph{E215}',
      '\u297E': '\\upfishtail{}',
      '\u297F': '\\downfishtail{}',
      '\u2980': '\\Elztfnc{}',
      '\u2981': '\\spot{}',
      '\u2982': '\\typecolon{}',
      '\u2983': '\\lBrace{}',
      '\u2984': '\\rBrace{}',
      '\u2985': '\\ElsevierGlyph{3018}',
      '\u2986': '\\Elroang{}',
      '\u2987': '\\limg{}',
      '\u2988': '\\rimg{}',
      '\u2989': '\\lblot{}',
      '\u298A': '\\rblot{}',
      '\u298B': '\\lbrackubar{}',
      '\u298C': '\\rbrackubar{}',
      '\u298D': '\\lbrackultick{}',
      '\u298E': '\\rbracklrtick{}',
      '\u298F': '\\lbracklltick{}',
      '\u2990': '\\rbrackurtick{}',
      '\u2991': '\\langledot{}',
      '\u2992': '\\rangledot{}',
      '\u2993': '<\\kern-0.58em(',
      '\u2994': '\\ElsevierGlyph{E291}',
      '\u2995': '\\Lparengtr{}',
      '\u2996': '\\Rparenless{}',
      '\u2997': '\\lblkbrbrak{}',
      '\u2998': '\\rblkbrbrak{}',
      '\u2999': '\\Elzddfnc{}',
      '\u299A': '\\vzigzag{}',
      '\u299B': '\\measuredangleleft{}',
      '\u299C': '\\Angle{}',
      '\u299D': '\\rightanglemdot{}',
      '\u299E': '\\angles{}',
      '\u299F': '\\angdnr{}',
      '\u29A0': '\\Elzlpargt{}',
      '\u29A1': '\\sphericalangleup{}',
      '\u29A2': '\\turnangle{}',
      '\u29A3': '\\revangle{}',
      '\u29A4': '\\angleubar{}',
      '\u29A5': '\\revangleubar{}',
      '\u29A6': '\\wideangledown{}',
      '\u29A7': '\\wideangleup{}',
      '\u29A8': '\\measanglerutone{}',
      '\u29A9': '\\measanglelutonw{}',
      '\u29AA': '\\measanglerdtose{}',
      '\u29AB': '\\measangleldtosw{}',
      '\u29AC': '\\measangleurtone{}',
      '\u29AD': '\\measangleultonw{}',
      '\u29AE': '\\measangledrtose{}',
      '\u29AF': '\\measangledltosw{}',
      '\u29B0': '\\revemptyset{}',
      '\u29B1': '\\emptysetobar{}',
      '\u29B2': '\\emptysetocirc{}',
      '\u29B3': '\\emptysetoarr{}',
      '\u29B4': '\\emptysetoarrl{}',
      '\u29B5': '\\ElsevierGlyph{E260}',
      '\u29B6': '\\ElsevierGlyph{E61B}',
      '\u29B7': '\\circledparallel{}',
      '\u29B8': '\\circledbslash{}',
      '\u29B9': '\\operp{}',
      '\u29BA': '\\obot{}',
      '\u29BB': '\\olcross{}',
      '\u29BC': '\\odotslashdot{}',
      '\u29BD': '\\uparrowoncircle{}',
      '\u29BE': '\\circledwhitebullet{}',
      '\u29BF': '\\circledbullet{}',
      '\u29C0': '\\circledless{}',
      '\u29C1': '\\circledgtr{}',
      '\u29C2': '\\cirscir{}',
      '\u29C3': '\\cirE{}',
      '\u29C4': '\\boxslash{}',
      '\u29C5': '\\boxbslash{}',
      '\u29C6': '\\boxast{}',
      '\u29C7': '\\boxcircle{}',
      '\u29C8': '\\boxbox{}',
      '\u29C9': '\\boxonbox{}',
      '\u29CA': '\\ElzLap{}',
      '\u29CB': '\\Elzdefas{}',
      '\u29CC': '\\triangles{}',
      '\u29CD': '\\triangleserifs{}',
      '\u29CE': '\\rtriltri{}',
      '\u29CF': '\\LeftTriangleBar{}',
      '\u29D0': '\\RightTriangleBar{}',
      '\u29D1': '\\lfbowtie{}',
      '\u29D2': '\\rfbowtie{}',
      '\u29D3': '\\fbowtie{}',
      '\u29D4': '\\lftimes{}',
      '\u29D5': '\\rftimes{}',
      '\u29D6': '\\hourglass{}',
      '\u29D7': '\\blackhourglass{}',
      '\u29D8': '\\lvzigzag{}',
      '\u29D9': '\\rvzigzag{}',
      '\u29DA': '\\Lvzigzag{}',
      '\u29DB': '\\Rvzigzag{}',
      '\u29DC': '\\ElsevierGlyph{E372}',
      '\u29DD': '\\tieinfty{}',
      '\u29DE': '\\nvinfty{}',
      '\u29DF': '\\multimapboth{}',
      '\u29E0': '\\laplac{}',
      '\u29E1': '\\lrtriangleeq{}',
      '\u29E2': '\\shuffle{}',
      '\u29E3': '\\eparsl{}',
      '\u29E4': '\\smeparsl{}',
      '\u29E5': '\\eqvparsl{}',
      '\u29E6': '\\gleichstark{}',
      '\u29E7': '\\thermod{}',
      '\u29E8': '\\downtriangleleftblack{}',
      '\u29E9': '\\downtrianglerightblack{}',
      '\u29EA': '\\blackdiamonddownarrow{}',
      '\u29EB': '\\blacklozenge{}',
      '\u29EC': '\\circledownarrow{}',
      '\u29ED': '\\blackcircledownarrow{}',
      '\u29EE': '\\errbarsquare{}',
      '\u29EF': '\\errbarblacksquare{}',
      '\u29F0': '\\errbardiamond{}',
      '\u29F1': '\\errbarblackdiamond{}',
      '\u29F2': '\\errbarcircle{}',
      '\u29F3': '\\errbarblackcircle{}',
      '\u29F4': '\\RuleDelayed{}',
      '\u29F5': '\\setminus{}',
      '\u29F6': '\\dsol{}',
      '\u29F7': '\\rsolbar{}',
      '\u29F8': '\\xsol{}',
      '\u29F9': '\\zhide{}',
      '\u29FA': '\\doubleplus{}',
      '\u29FB': '\\tripleplus{}',
      '\u29FC': '\\lcurvyangle{}',
      '\u29FD': '\\rcurvyangle{}',
      '\u29FE': '\\tplus{}',
      '\u29FF': '\\tminus{}',
      '\u2A00': '\\bigodot{}',
      '\u2A01': '\\bigoplus{}',
      '\u2A02': '\\bigotimes{}',
      '\u2A03': '\\bigcupdot{}',
      '\u2A04': '\\Elxuplus{}',
      '\u2A05': '\\ElzThr{}',
      '\u2A06': '\\Elxsqcup{}',
      '\u2A07': '\\ElzInf{}',
      '\u2A08': '\\ElzSup{}',
      '\u2A09': '\\varprod{}',
      '\u2A0A': '\\modtwosum{}',
      '\u2A0B': '\\sumint{}',
      '\u2A0C': '\\iiiint{}',
      '\u2A0D': '\\ElzCint{}',
      '\u2A0E': '\\intBar{}',
      '\u2A0F': '\\clockoint{}',
      '\u2A10': '\\ElsevierGlyph{E395}',
      '\u2A11': '\\awint{}',
      '\u2A12': '\\rppolint{}',
      '\u2A13': '\\scpolint{}',
      '\u2A14': '\\npolint{}',
      '\u2A15': '\\pointint{}',
      '\u2A16': '\\sqrint{}',
      '\u2A17': '\\intlarhk{}',
      '\u2A18': '\\intx{}',
      '\u2A19': '\\intcap{}',
      '\u2A1A': '\\intcup{}',
      '\u2A1B': '\\upint{}',
      '\u2A1C': '\\lowint{}',
      '\u2A1D': '\\Join{}',
      '\u2A1E': '\\bigtriangleleft{}',
      '\u2A1F': '\\zcmp{}',
      '\u2A20': '\\zpipe{}',
      '\u2A21': '\\zproject{}',
      '\u2A22': '\\ringplus{}',
      '\u2A23': '\\plushat{}',
      '\u2A24': '\\simplus{}',
      '\u2A25': '\\ElsevierGlyph{E25A}',
      '\u2A26': '\\plussim{}',
      '\u2A27': '\\plussubtwo{}',
      '\u2A28': '\\plustrif{}',
      '\u2A29': '\\commaminus{}',
      '\u2A2A': '\\ElsevierGlyph{E25B}',
      '\u2A2B': '\\minusfdots{}',
      '\u2A2C': '\\minusrdots{}',
      '\u2A2D': '\\ElsevierGlyph{E25C}',
      '\u2A2E': '\\ElsevierGlyph{E25D}',
      '\u2A2F': '\\ElzTimes{}',
      '\u2A30': '\\dottimes{}',
      '\u2A31': '\\timesbar{}',
      '\u2A32': '\\btimes{}',
      '\u2A33': '\\smashtimes{}',
      '\u2A34': '\\ElsevierGlyph{E25E}',
      '\u2A35': '\\ElsevierGlyph{E25E}',
      '\u2A36': '\\otimeshat{}',
      '\u2A37': '\\Otimes{}',
      '\u2A38': '\\odiv{}',
      '\u2A39': '\\triangleplus{}',
      '\u2A3A': '\\triangleminus{}',
      '\u2A3B': '\\triangletimes{}',
      '\u2A3C': '\\ElsevierGlyph{E259}',
      '\u2A3D': '\\intprodr{}',
      '\u2A3E': '\\fcmp{}',
      '\u2A3F': '\\amalg{}',
      '\u2A40': '\\capdot{}',
      '\u2A41': '\\uminus{}',
      '\u2A42': '\\barcup{}',
      '\u2A43': '\\barcap{}',
      '\u2A44': '\\capwedge{}',
      '\u2A45': '\\cupvee{}',
      '\u2A46': '\\cupovercap{}',
      '\u2A47': '\\capovercup{}',
      '\u2A48': '\\cupbarcap{}',
      '\u2A49': '\\capbarcup{}',
      '\u2A4A': '\\twocups{}',
      '\u2A4B': '\\twocaps{}',
      '\u2A4C': '\\closedvarcup{}',
      '\u2A4D': '\\closedvarcap{}',
      '\u2A4E': '\\Sqcap{}',
      '\u2A4F': '\\Sqcup{}',
      '\u2A50': '\\closedvarcupsmashprod{}',
      '\u2A51': '\\wedgeodot{}',
      '\u2A52': '\\veeodot{}',
      '\u2A53': '\\ElzAnd{}',
      '\u2A54': '\\ElzOr{}',
      '\u2A55': '\\ElsevierGlyph{E36E}',
      '\u2A56': '\\ElOr{}',
      '\u2A57': '\\bigslopedvee{}',
      '\u2A58': '\\bigslopedwedge{}',
      '\u2A59': '\\veeonwedge{}',
      '\u2A5A': '\\wedgemidvert{}',
      '\u2A5B': '\\veemidvert{}',
      '\u2A5C': '\\midbarwedge{}',
      '\u2A5D': '\\midbarvee{}',
      '\u2A5E': '\\perspcorrespond{}',
      '\u2A5F': '\\Elzminhat{}',
      '\u2A60': '\\wedgedoublebar{}',
      '\u2A61': '\\varveebar{}',
      '\u2A62': '\\doublebarvee{}',
      '\u2A63': '\\ElsevierGlyph{225A}',
      '\u2A64': '\\dsub{}',
      '\u2A65': '\\rsub{}',
      '\u2A66': '\\eqdot{}',
      '\u2A67': '\\dotequiv{}',
      '\u2A68': '\\equivVert{}',
      '\u2A69': '\\equivVvert{}',
      '\u2A6A': '\\dotsim{}',
      '\u2A6B': '\\simrdots{}',
      '\u2A6C': '\\simminussim{}',
      '\u2A6D': '\\congdot{}',
      '\u2A6E': '\\stackrel{*}{=}',
      '\u2A6F': '\\hatapprox{}',
      '\u2A70': '\\approxeqq{}',
      '\u2A71': '\\eqqplus{}',
      '\u2A72': '\\pluseqq{}',
      '\u2A73': '\\eqqsim{}',
      '\u2A74': '\\Coloneqq{}',
      '\u2A75': '\\Equal{}',
      '\u2A76': '\\Same{}',
      '\u2A77': '\\ddotseq{}',
      '\u2A78': '\\equivDD{}',
      '\u2A79': '\\ltcir{}',
      '\u2A7A': '\\gtcir{}',
      '\u2A7B': '\\ltquest{}',
      '\u2A7C': '\\gtquest{}',
      '\u2A7D': '\\leqslant{}',
      '\u2A7E': '\\geqslant{}',
      '\u2A7F': '\\lesdot{}',
      '\u2A80': '\\gesdot{}',
      '\u2A81': '\\lesdoto{}',
      '\u2A82': '\\gesdoto{}',
      '\u2A83': '\\lesdotor{}',
      '\u2A84': '\\gesdotol{}',
      '\u2A85': '\\lessapprox{}',
      '\u2A86': '\\gtrapprox{}',
      '\u2A87': '\\lneq{}',
      '\u2A88': '\\gneq{}',
      '\u2A89': '\\lnapprox{}',
      '\u2A8A': '\\gnapprox{}',
      '\u2A8B': '\\lesseqqgtr{}',
      '\u2A8C': '\\gtreqqless{}',
      '\u2A8D': '\\lsime{}',
      '\u2A8E': '\\gsime{}',
      '\u2A8F': '\\lsimg{}',
      '\u2A90': '\\gsiml{}',
      '\u2A91': '\\lgE{}',
      '\u2A92': '\\glE{}',
      '\u2A93': '\\lesges{}',
      '\u2A94': '\\gesles{}',
      '\u2A95': '\\eqslantless{}',
      '\u2A96': '\\eqslantgtr{}',
      '\u2A97': '\\elsdot{}',
      '\u2A98': '\\egsdot{}',
      '\u2A99': '\\eqqless{}',
      '\u2A9A': '\\eqqgtr{}',
      '\u2A9B': '\\eqqslantless{}',
      '\u2A9C': '\\eqqslantgtr{}',
      '\u2A9D': '\\Pisymbol{ppi020}{117}',
      '\u2A9E': '\\Pisymbol{ppi020}{105}',
      '\u2A9F': '\\simlE{}',
      '\u2AA0': '\\simgE{}',
      '\u2AA1': '\\NestedLessLess{}',
      '\u2AA2': '\\NestedGreaterGreater{}',
      '\u2AA3': '\\partialmeetcontraction{}',
      '\u2AA4': '\\glj{}',
      '\u2AA5': '\\gla{}',
      '\u2AA6': '\\leftslice{}',
      '\u2AA7': '\\rightslice{}',
      '\u2AA8': '\\lescc{}',
      '\u2AA9': '\\gescc{}',
      '\u2AAA': '\\smt{}',
      '\u2AAB': '\\lat{}',
      '\u2AAC': '\\smte{}',
      '\u2AAD': '\\late{}',
      '\u2AAE': '\\bumpeqq{}',
      '\u2AAF': '\\preceq{}',
      '\u2AB0': '\\succeq{}',
      '\u2AB1': '\\precneq{}',
      '\u2AB2': '\\succneq{}',
      '\u2AB3': '\\preceqq{}',
      '\u2AB4': '\\succeqq{}',
      '\u2AB5': '\\precneqq{}',
      '\u2AB6': '\\succneqq{}',
      '\u2AB7': '\\precapprox{}',
      '\u2AB8': '\\succapprox{}',
      '\u2AB9': '\\precnapprox{}',
      '\u2ABA': '\\succnapprox{}',
      '\u2ABB': '\\llcurly{}',
      '\u2ABC': '\\ggcurly{}',
      '\u2ABD': '\\subsetdot{}',
      '\u2ABE': '\\supsetdot{}',
      '\u2ABF': '\\subsetplus{}',
      '\u2AC0': '\\supsetplus{}',
      '\u2AC1': '\\submult{}',
      '\u2AC2': '\\supmult{}',
      '\u2AC3': '\\subedot{}',
      '\u2AC4': '\\supedot{}',
      '\u2AC5': '\\subseteqq{}',
      '\u2AC6': '\\supseteqq{}',
      '\u2AC7': '\\subsim{}',
      '\u2AC8': '\\supsim{}',
      '\u2AC9': '\\subsetapprox{}',
      '\u2ACA': '\\supsetapprox{}',
      '\u2ACB': '\\subsetneqq{}',
      '\u2ACC': '\\supsetneqq{}',
      '\u2ACD': '\\lsqhook{}',
      '\u2ACE': '\\rsqhook{}',
      '\u2ACF': '\\csub{}',
      '\u2AD0': '\\csup{}',
      '\u2AD1': '\\csube{}',
      '\u2AD2': '\\csupe{}',
      '\u2AD3': '\\subsup{}',
      '\u2AD4': '\\supsub{}',
      '\u2AD5': '\\subsub{}',
      '\u2AD6': '\\supsup{}',
      '\u2AD7': '\\suphsub{}',
      '\u2AD8': '\\supdsub{}',
      '\u2AD9': '\\forkv{}',
      '\u2ADA': '\\topfork{}',
      '\u2ADB': '\\mlcp{}',
      '\u2ADC': '\\forks{}',
      '\u2ADD': '\\forksnot{}',
      '\u2ADE': '\\shortlefttack{}',
      '\u2ADF': '\\shortdowntack{}',
      '\u2AE0': '\\shortuptack{}',
      '\u2AE1': '\\perps{}',
      '\u2AE2': '\\vDdash{}',
      '\u2AE3': '\\dashV{}',
      '\u2AE4': '\\Dashv{}',
      '\u2AE5': '\\DashV{}',
      '\u2AE6': '\\varVdash{}',
      '\u2AE7': '\\Barv{}',
      '\u2AE8': '\\vBar{}',
      '\u2AE9': '\\vBarv{}',
      '\u2AEA': '\\Top{}',
      '\u2AEB': '\\ElsevierGlyph{E30D}',
      '\u2AEC': '\\Not{}',
      '\u2AED': '\\bNot{}',
      '\u2AEE': '\\revnmid{}',
      '\u2AEF': '\\cirmid{}',
      '\u2AF0': '\\midcir{}',
      '\u2AF1': '\\topcir{}',
      '\u2AF2': '\\nhpar{}',
      '\u2AF3': '\\parsim{}',
      '\u2AF4': '\\interleave{}',
      '\u2AF5': '\\nhVvert{}',
      '\u2AF6': '\\Elztdcol{}',
      '\u2AF7': '\\lllnest{}',
      '\u2AF8': '\\gggnest{}',
      '\u2AF9': '\\leqqslant{}',
      '\u2AFA': '\\geqqslant{}',
      '\u2AFB': '\\trslash{}',
      '\u2AFC': '\\biginterleave{}',
      '\u2AFD': '{{/}\\!\\!{/}}',
      '\u2AFE': '\\talloblong{}',
      '\u2AFF': '\\bigtalloblong{}',
      '\u2B12': '\\squaretopblack{}',
      '\u2B13': '\\squarebotblack{}',
      '\u2B14': '\\squareurblack{}',
      '\u2B15': '\\squarellblack{}',
      '\u2B16': '\\diamondleftblack{}',
      '\u2B17': '\\diamondrightblack{}',
      '\u2B18': '\\diamondtopblack{}',
      '\u2B19': '\\diamondbotblack{}',
      '\u2B1A': '\\dottedsquare{}',
      '\u2B1B': '\\blacksquare{}',
      '\u2B1C': '\\square{}',
      '\u2B1D': '\\vysmblksquare{}',
      '\u2B1E': '\\vysmwhtsquare{}',
      '\u2B1F': '\\pentagonblack{}',
      '\u2B20': '\\pentagon{}',
      '\u2B21': '\\varhexagon{}',
      '\u2B22': '\\varhexagonblack{}',
      '\u2B23': '\\hexagonblack{}',
      '\u2B24': '\\lgblkcircle{}',
      '\u2B25': '\\mdblkdiamond{}',
      '\u2B26': '\\mdwhtdiamond{}',
      '\u2B27': '\\mdblklozenge{}',
      '\u2B28': '\\mdwhtlozenge{}',
      '\u2B29': '\\smblkdiamond{}',
      '\u2B2A': '\\smblklozenge{}',
      '\u2B2B': '\\smwhtlozenge{}',
      '\u2B2C': '\\blkhorzoval{}',
      '\u2B2D': '\\whthorzoval{}',
      '\u2B2E': '\\blkvertoval{}',
      '\u2B2F': '\\whtvertoval{}',
      '\u2B30': '\\circleonleftarrow{}',
      '\u2B31': '\\leftthreearrows{}',
      '\u2B32': '\\leftarrowonoplus{}',
      '\u2B33': '\\longleftsquigarrow{}',
      '\u2B34': '\\nvtwoheadleftarrow{}',
      '\u2B35': '\\nVtwoheadleftarrow{}',
      '\u2B36': '\\twoheadmapsfrom{}',
      '\u2B37': '\\twoheadleftdbkarrow{}',
      '\u2B38': '\\leftdotarrow{}',
      '\u2B39': '\\nvleftarrowtail{}',
      '\u2B3A': '\\nVleftarrowtail{}',
      '\u2B3B': '\\twoheadleftarrowtail{}',
      '\u2B3C': '\\nvtwoheadleftarrowtail{}',
      '\u2B3D': '\\nVtwoheadleftarrowtail{}',
      '\u2B3E': '\\leftarrowx{}',
      '\u2B3F': '\\leftcurvedarrow{}',
      '\u2B40': '\\equalleftarrow{}',
      '\u2B41': '\\bsimilarleftarrow{}',
      '\u2B42': '\\leftarrowbackapprox{}',
      '\u2B43': '\\rightarrowgtr{}',
      '\u2B44': '\\rightarrowsupset{}',
      '\u2B45': '\\LLeftarrow{}',
      '\u2B46': '\\RRightarrow{}',
      '\u2B47': '\\bsimilarrightarrow{}',
      '\u2B48': '\\rightarrowbackapprox{}',
      '\u2B49': '\\similarleftarrow{}',
      '\u2B4A': '\\leftarrowapprox{}',
      '\u2B4B': '\\leftarrowbsimilar{}',
      '\u2B4C': '\\rightarrowbsimilar{}',
      '\u2B50': '\\medwhitestar{}',
      '\u2B51': '\\medblackstar{}',
      '\u2B52': '\\smwhitestar{}',
      '\u2B53': '\\rightpentagonblack{}',
      '\u2B54': '\\rightpentagon{}',
      '\u300A': '\\ElsevierGlyph{300A}',
      '\u300B': '\\ElsevierGlyph{300B}',
      '\u3012': '\\postalmark{}',
      '\u3014': '\\lbrbrak{}',
      '\u3015': '\\rbrbrak{}',
      '\u3018': '\\ElsevierGlyph{3018}',
      '\u3019': '\\ElsevierGlyph{3019}',
      '\u301A': '\\openbracketleft{}',
      '\u301B': '\\openbracketright{}',
      '\u3030': '\\hzigzag{}',
      '\uD835\uDC00': '\\mathbf{A}',
      '\uD835\uDC01': '\\mathbf{B}',
      '\uD835\uDC02': '\\mathbf{C}',
      '\uD835\uDC03': '\\mathbf{D}',
      '\uD835\uDC04': '\\mathbf{E}',
      '\uD835\uDC05': '\\mathbf{F}',
      '\uD835\uDC06': '\\mathbf{G}',
      '\uD835\uDC07': '\\mathbf{H}',
      '\uD835\uDC08': '\\mathbf{I}',
      '\uD835\uDC09': '\\mathbf{J}',
      '\uD835\uDC0A': '\\mathbf{K}',
      '\uD835\uDC0B': '\\mathbf{L}',
      '\uD835\uDC0C': '\\mathbf{M}',
      '\uD835\uDC0D': '\\mathbf{N}',
      '\uD835\uDC0E': '\\mathbf{O}',
      '\uD835\uDC0F': '\\mathbf{P}',
      '\uD835\uDC10': '\\mathbf{Q}',
      '\uD835\uDC11': '\\mathbf{R}',
      '\uD835\uDC12': '\\mathbf{S}',
      '\uD835\uDC13': '\\mathbf{T}',
      '\uD835\uDC14': '\\mathbf{U}',
      '\uD835\uDC15': '\\mathbf{V}',
      '\uD835\uDC16': '\\mathbf{W}',
      '\uD835\uDC17': '\\mathbf{X}',
      '\uD835\uDC18': '\\mathbf{Y}',
      '\uD835\uDC19': '\\mathbf{Z}',
      '\uD835\uDC1A': '\\mathbf{a}',
      '\uD835\uDC1B': '\\mathbf{b}',
      '\uD835\uDC1C': '\\mathbf{c}',
      '\uD835\uDC1D': '\\mathbf{d}',
      '\uD835\uDC1E': '\\mathbf{e}',
      '\uD835\uDC1F': '\\mathbf{f}',
      '\uD835\uDC20': '\\mathbf{g}',
      '\uD835\uDC21': '\\mathbf{h}',
      '\uD835\uDC22': '\\mathbf{i}',
      '\uD835\uDC23': '\\mathbf{j}',
      '\uD835\uDC24': '\\mathbf{k}',
      '\uD835\uDC25': '\\mathbf{l}',
      '\uD835\uDC26': '\\mathbf{m}',
      '\uD835\uDC27': '\\mathbf{n}',
      '\uD835\uDC28': '\\mathbf{o}',
      '\uD835\uDC29': '\\mathbf{p}',
      '\uD835\uDC2A': '\\mathbf{q}',
      '\uD835\uDC2B': '\\mathbf{r}',
      '\uD835\uDC2C': '\\mathbf{s}',
      '\uD835\uDC2D': '\\mathbf{t}',
      '\uD835\uDC2E': '\\mathbf{u}',
      '\uD835\uDC2F': '\\mathbf{v}',
      '\uD835\uDC30': '\\mathbf{w}',
      '\uD835\uDC31': '\\mathbf{x}',
      '\uD835\uDC32': '\\mathbf{y}',
      '\uD835\uDC33': '\\mathbf{z}',
      '\uD835\uDC34': '\\mathsl{A}',
      '\uD835\uDC35': '\\mathsl{B}',
      '\uD835\uDC36': '\\mathsl{C}',
      '\uD835\uDC37': '\\mathsl{D}',
      '\uD835\uDC38': '\\mathsl{E}',
      '\uD835\uDC39': '\\mathsl{F}',
      '\uD835\uDC3A': '\\mathsl{G}',
      '\uD835\uDC3B': '\\mathsl{H}',
      '\uD835\uDC3C': '\\mathsl{I}',
      '\uD835\uDC3D': '\\mathsl{J}',
      '\uD835\uDC3E': '\\mathsl{K}',
      '\uD835\uDC3F': '\\mathsl{L}',
      '\uD835\uDC40': '\\mathsl{M}',
      '\uD835\uDC41': '\\mathsl{N}',
      '\uD835\uDC42': '\\mathsl{O}',
      '\uD835\uDC43': '\\mathsl{P}',
      '\uD835\uDC44': '\\mathsl{Q}',
      '\uD835\uDC45': '\\mathsl{R}',
      '\uD835\uDC46': '\\mathsl{S}',
      '\uD835\uDC47': '\\mathsl{T}',
      '\uD835\uDC48': '\\mathsl{U}',
      '\uD835\uDC49': '\\mathsl{V}',
      '\uD835\uDC4A': '\\mathsl{W}',
      '\uD835\uDC4B': '\\mathsl{X}',
      '\uD835\uDC4C': '\\mathsl{Y}',
      '\uD835\uDC4D': '\\mathsl{Z}',
      '\uD835\uDC4E': '\\mathsl{a}',
      '\uD835\uDC4F': '\\mathsl{b}',
      '\uD835\uDC50': '\\mathsl{c}',
      '\uD835\uDC51': '\\mathsl{d}',
      '\uD835\uDC52': '\\mathsl{e}',
      '\uD835\uDC53': '\\mathsl{f}',
      '\uD835\uDC54': '\\mathsl{g}',
      '\uD835\uDC56': '\\mathsl{i}',
      '\uD835\uDC57': '\\mathsl{j}',
      '\uD835\uDC58': '\\mathsl{k}',
      '\uD835\uDC59': '\\mathsl{l}',
      '\uD835\uDC5A': '\\mathsl{m}',
      '\uD835\uDC5B': '\\mathsl{n}',
      '\uD835\uDC5C': '\\mathsl{o}',
      '\uD835\uDC5D': '\\mathsl{p}',
      '\uD835\uDC5E': '\\mathsl{q}',
      '\uD835\uDC5F': '\\mathsl{r}',
      '\uD835\uDC60': '\\mathsl{s}',
      '\uD835\uDC61': '\\mathsl{t}',
      '\uD835\uDC62': '\\mathsl{u}',
      '\uD835\uDC63': '\\mathsl{v}',
      '\uD835\uDC64': '\\mathsl{w}',
      '\uD835\uDC65': '\\mathsl{x}',
      '\uD835\uDC66': '\\mathsl{y}',
      '\uD835\uDC67': '\\mathsl{z}',
      '\uD835\uDC68': '\\mathbit{A}',
      '\uD835\uDC69': '\\mathbit{B}',
      '\uD835\uDC6A': '\\mathbit{C}',
      '\uD835\uDC6B': '\\mathbit{D}',
      '\uD835\uDC6C': '\\mathbit{E}',
      '\uD835\uDC6D': '\\mathbit{F}',
      '\uD835\uDC6E': '\\mathbit{G}',
      '\uD835\uDC6F': '\\mathbit{H}',
      '\uD835\uDC70': '\\mathbit{I}',
      '\uD835\uDC71': '\\mathbit{J}',
      '\uD835\uDC72': '\\mathbit{K}',
      '\uD835\uDC73': '\\mathbit{L}',
      '\uD835\uDC74': '\\mathbit{M}',
      '\uD835\uDC75': '\\mathbit{N}',
      '\uD835\uDC76': '\\mathbit{O}',
      '\uD835\uDC77': '\\mathbit{P}',
      '\uD835\uDC78': '\\mathbit{Q}',
      '\uD835\uDC79': '\\mathbit{R}',
      '\uD835\uDC7A': '\\mathbit{S}',
      '\uD835\uDC7B': '\\mathbit{T}',
      '\uD835\uDC7C': '\\mathbit{U}',
      '\uD835\uDC7D': '\\mathbit{V}',
      '\uD835\uDC7E': '\\mathbit{W}',
      '\uD835\uDC7F': '\\mathbit{X}',
      '\uD835\uDC80': '\\mathbit{Y}',
      '\uD835\uDC81': '\\mathbit{Z}',
      '\uD835\uDC82': '\\mathbit{a}',
      '\uD835\uDC83': '\\mathbit{b}',
      '\uD835\uDC84': '\\mathbit{c}',
      '\uD835\uDC85': '\\mathbit{d}',
      '\uD835\uDC86': '\\mathbit{e}',
      '\uD835\uDC87': '\\mathbit{f}',
      '\uD835\uDC88': '\\mathbit{g}',
      '\uD835\uDC89': '\\mathbit{h}',
      '\uD835\uDC8A': '\\mathbit{i}',
      '\uD835\uDC8B': '\\mathbit{j}',
      '\uD835\uDC8C': '\\mathbit{k}',
      '\uD835\uDC8D': '\\mathbit{l}',
      '\uD835\uDC8E': '\\mathbit{m}',
      '\uD835\uDC8F': '\\mathbit{n}',
      '\uD835\uDC90': '\\mathbit{o}',
      '\uD835\uDC91': '\\mathbit{p}',
      '\uD835\uDC92': '\\mathbit{q}',
      '\uD835\uDC93': '\\mathbit{r}',
      '\uD835\uDC94': '\\mathbit{s}',
      '\uD835\uDC95': '\\mathbit{t}',
      '\uD835\uDC96': '\\mathbit{u}',
      '\uD835\uDC97': '\\mathbit{v}',
      '\uD835\uDC98': '\\mathbit{w}',
      '\uD835\uDC99': '\\mathbit{x}',
      '\uD835\uDC9A': '\\mathbit{y}',
      '\uD835\uDC9B': '\\mathbit{z}',
      '\uD835\uDC9C': '\\mathscr{A}',
      '\uD835\uDC9E': '\\mathscr{C}',
      '\uD835\uDC9F': '\\mathscr{D}',
      '\uD835\uDCA2': '\\mathscr{G}',
      '\uD835\uDCA5': '\\mathscr{J}',
      '\uD835\uDCA6': '\\mathscr{K}',
      '\uD835\uDCA9': '\\mathscr{N}',
      '\uD835\uDCAA': '\\mathscr{O}',
      '\uD835\uDCAB': '\\mathscr{P}',
      '\uD835\uDCAC': '\\mathscr{Q}',
      '\uD835\uDCAE': '\\mathscr{S}',
      '\uD835\uDCAF': '\\mathscr{T}',
      '\uD835\uDCB0': '\\mathscr{U}',
      '\uD835\uDCB1': '\\mathscr{V}',
      '\uD835\uDCB2': '\\mathscr{W}',
      '\uD835\uDCB3': '\\mathscr{X}',
      '\uD835\uDCB4': '\\mathscr{Y}',
      '\uD835\uDCB5': '\\mathscr{Z}',
      '\uD835\uDCB6': '\\mathscr{a}',
      '\uD835\uDCB7': '\\mathscr{b}',
      '\uD835\uDCB8': '\\mathscr{c}',
      '\uD835\uDCB9': '\\mathscr{d}',
      '\uD835\uDCBB': '\\mathscr{f}',
      '\uD835\uDCBD': '\\mathscr{h}',
      '\uD835\uDCBE': '\\mathscr{i}',
      '\uD835\uDCBF': '\\mathscr{j}',
      '\uD835\uDCC0': '\\mathscr{k}',
      '\uD835\uDCC1': '\\mathscr{l}',
      '\uD835\uDCC2': '\\mathscr{m}',
      '\uD835\uDCC3': '\\mathscr{n}',
      '\uD835\uDCC5': '\\mathscr{p}',
      '\uD835\uDCC6': '\\mathscr{q}',
      '\uD835\uDCC7': '\\mathscr{r}',
      '\uD835\uDCC8': '\\mathscr{s}',
      '\uD835\uDCC9': '\\mathscr{t}',
      '\uD835\uDCCA': '\\mathscr{u}',
      '\uD835\uDCCB': '\\mathscr{v}',
      '\uD835\uDCCC': '\\mathscr{w}',
      '\uD835\uDCCD': '\\mathscr{x}',
      '\uD835\uDCCE': '\\mathscr{y}',
      '\uD835\uDCCF': '\\mathscr{z}',
      '\uD835\uDCD0': '\\mathmit{A}',
      '\uD835\uDCD1': '\\mathmit{B}',
      '\uD835\uDCD2': '\\mathmit{C}',
      '\uD835\uDCD3': '\\mathmit{D}',
      '\uD835\uDCD4': '\\mathmit{E}',
      '\uD835\uDCD5': '\\mathmit{F}',
      '\uD835\uDCD6': '\\mathmit{G}',
      '\uD835\uDCD7': '\\mathmit{H}',
      '\uD835\uDCD8': '\\mathmit{I}',
      '\uD835\uDCD9': '\\mathmit{J}',
      '\uD835\uDCDA': '\\mathmit{K}',
      '\uD835\uDCDB': '\\mathmit{L}',
      '\uD835\uDCDC': '\\mathmit{M}',
      '\uD835\uDCDD': '\\mathmit{N}',
      '\uD835\uDCDE': '\\mathmit{O}',
      '\uD835\uDCDF': '\\mathmit{P}',
      '\uD835\uDCE0': '\\mathmit{Q}',
      '\uD835\uDCE1': '\\mathmit{R}',
      '\uD835\uDCE2': '\\mathmit{S}',
      '\uD835\uDCE3': '\\mathmit{T}',
      '\uD835\uDCE4': '\\mathmit{U}',
      '\uD835\uDCE5': '\\mathmit{V}',
      '\uD835\uDCE6': '\\mathmit{W}',
      '\uD835\uDCE7': '\\mathmit{X}',
      '\uD835\uDCE8': '\\mathmit{Y}',
      '\uD835\uDCE9': '\\mathmit{Z}',
      '\uD835\uDCEA': '\\mathmit{a}',
      '\uD835\uDCEB': '\\mathmit{b}',
      '\uD835\uDCEC': '\\mathmit{c}',
      '\uD835\uDCED': '\\mathmit{d}',
      '\uD835\uDCEE': '\\mathmit{e}',
      '\uD835\uDCEF': '\\mathmit{f}',
      '\uD835\uDCF0': '\\mathmit{g}',
      '\uD835\uDCF1': '\\mathmit{h}',
      '\uD835\uDCF2': '\\mathmit{i}',
      '\uD835\uDCF3': '\\mathmit{j}',
      '\uD835\uDCF4': '\\mathmit{k}',
      '\uD835\uDCF5': '\\mathmit{l}',
      '\uD835\uDCF6': '\\mathmit{m}',
      '\uD835\uDCF7': '\\mathmit{n}',
      '\uD835\uDCF8': '\\mathmit{o}',
      '\uD835\uDCF9': '\\mathmit{p}',
      '\uD835\uDCFA': '\\mathmit{q}',
      '\uD835\uDCFB': '\\mathmit{r}',
      '\uD835\uDCFC': '\\mathmit{s}',
      '\uD835\uDCFD': '\\mathmit{t}',
      '\uD835\uDCFE': '\\mathmit{u}',
      '\uD835\uDCFF': '\\mathmit{v}',
      '\uD835\uDD00': '\\mathmit{w}',
      '\uD835\uDD01': '\\mathmit{x}',
      '\uD835\uDD02': '\\mathmit{y}',
      '\uD835\uDD03': '\\mathmit{z}',
      '\uD835\uDD04': '\\mathfrak{A}',
      '\uD835\uDD05': '\\mathfrak{B}',
      '\uD835\uDD07': '\\mathfrak{D}',
      '\uD835\uDD08': '\\mathfrak{E}',
      '\uD835\uDD09': '\\mathfrak{F}',
      '\uD835\uDD0A': '\\mathfrak{G}',
      '\uD835\uDD0D': '\\mathfrak{J}',
      '\uD835\uDD0E': '\\mathfrak{K}',
      '\uD835\uDD0F': '\\mathfrak{L}',
      '\uD835\uDD10': '\\mathfrak{M}',
      '\uD835\uDD11': '\\mathfrak{N}',
      '\uD835\uDD12': '\\mathfrak{O}',
      '\uD835\uDD13': '\\mathfrak{P}',
      '\uD835\uDD14': '\\mathfrak{Q}',
      '\uD835\uDD16': '\\mathfrak{S}',
      '\uD835\uDD17': '\\mathfrak{T}',
      '\uD835\uDD18': '\\mathfrak{U}',
      '\uD835\uDD19': '\\mathfrak{V}',
      '\uD835\uDD1A': '\\mathfrak{W}',
      '\uD835\uDD1B': '\\mathfrak{X}',
      '\uD835\uDD1C': '\\mathfrak{Y}',
      '\uD835\uDD1E': '\\mathfrak{a}',
      '\uD835\uDD1F': '\\mathfrak{b}',
      '\uD835\uDD20': '\\mathfrak{c}',
      '\uD835\uDD21': '\\mathfrak{d}',
      '\uD835\uDD22': '\\mathfrak{e}',
      '\uD835\uDD23': '\\mathfrak{f}',
      '\uD835\uDD24': '\\mathfrak{g}',
      '\uD835\uDD25': '\\mathfrak{h}',
      '\uD835\uDD26': '\\mathfrak{i}',
      '\uD835\uDD27': '\\mathfrak{j}',
      '\uD835\uDD28': '\\mathfrak{k}',
      '\uD835\uDD29': '\\mathfrak{l}',
      '\uD835\uDD2A': '\\mathfrak{m}',
      '\uD835\uDD2B': '\\mathfrak{n}',
      '\uD835\uDD2C': '\\mathfrak{o}',
      '\uD835\uDD2D': '\\mathfrak{p}',
      '\uD835\uDD2E': '\\mathfrak{q}',
      '\uD835\uDD2F': '\\mathfrak{r}',
      '\uD835\uDD30': '\\mathfrak{s}',
      '\uD835\uDD31': '\\mathfrak{t}',
      '\uD835\uDD32': '\\mathfrak{u}',
      '\uD835\uDD33': '\\mathfrak{v}',
      '\uD835\uDD34': '\\mathfrak{w}',
      '\uD835\uDD35': '\\mathfrak{x}',
      '\uD835\uDD36': '\\mathfrak{y}',
      '\uD835\uDD37': '\\mathfrak{z}',
      '\uD835\uDD38': '\\mathbb{A}',
      '\uD835\uDD39': '\\mathbb{B}',
      '\uD835\uDD3B': '\\mathbb{D}',
      '\uD835\uDD3C': '\\mathbb{E}',
      '\uD835\uDD3D': '\\mathbb{F}',
      '\uD835\uDD3E': '\\mathbb{G}',
      '\uD835\uDD40': '\\mathbb{I}',
      '\uD835\uDD41': '\\mathbb{J}',
      '\uD835\uDD42': '\\mathbb{K}',
      '\uD835\uDD43': '\\mathbb{L}',
      '\uD835\uDD44': '\\mathbb{M}',
      '\uD835\uDD46': '\\mathbb{O}',
      '\uD835\uDD4A': '\\mathbb{S}',
      '\uD835\uDD4B': '\\mathbb{T}',
      '\uD835\uDD4C': '\\mathbb{U}',
      '\uD835\uDD4D': '\\mathbb{V}',
      '\uD835\uDD4E': '\\mathbb{W}',
      '\uD835\uDD4F': '\\mathbb{X}',
      '\uD835\uDD50': '\\mathbb{Y}',
      '\uD835\uDD52': '\\mathbb{a}',
      '\uD835\uDD53': '\\mathbb{b}',
      '\uD835\uDD54': '\\mathbb{c}',
      '\uD835\uDD55': '\\mathbb{d}',
      '\uD835\uDD56': '\\mathbb{e}',
      '\uD835\uDD57': '\\mathbb{f}',
      '\uD835\uDD58': '\\mathbb{g}',
      '\uD835\uDD59': '\\mathbb{h}',
      '\uD835\uDD5A': '\\mathbb{i}',
      '\uD835\uDD5B': '\\mathbb{j}',
      '\uD835\uDD5C': '\\mathbb{k}',
      '\uD835\uDD5D': '\\mathbb{l}',
      '\uD835\uDD5E': '\\mathbb{m}',
      '\uD835\uDD5F': '\\mathbb{n}',
      '\uD835\uDD60': '\\mathbb{o}',
      '\uD835\uDD61': '\\mathbb{p}',
      '\uD835\uDD62': '\\mathbb{q}',
      '\uD835\uDD63': '\\mathbb{r}',
      '\uD835\uDD64': '\\mathbb{s}',
      '\uD835\uDD65': '\\mathbb{t}',
      '\uD835\uDD66': '\\mathbb{u}',
      '\uD835\uDD67': '\\mathbb{v}',
      '\uD835\uDD68': '\\mathbb{w}',
      '\uD835\uDD69': '\\mathbb{x}',
      '\uD835\uDD6A': '\\mathbb{y}',
      '\uD835\uDD6B': '\\mathbb{z}',
      '\uD835\uDD6C': '\\mathslbb{A}',
      '\uD835\uDD6D': '\\mathslbb{B}',
      '\uD835\uDD6E': '\\mathslbb{C}',
      '\uD835\uDD6F': '\\mathslbb{D}',
      '\uD835\uDD70': '\\mathslbb{E}',
      '\uD835\uDD71': '\\mathslbb{F}',
      '\uD835\uDD72': '\\mathslbb{G}',
      '\uD835\uDD73': '\\mathslbb{H}',
      '\uD835\uDD74': '\\mathslbb{I}',
      '\uD835\uDD75': '\\mathslbb{J}',
      '\uD835\uDD76': '\\mathslbb{K}',
      '\uD835\uDD77': '\\mathslbb{L}',
      '\uD835\uDD78': '\\mathslbb{M}',
      '\uD835\uDD79': '\\mathslbb{N}',
      '\uD835\uDD7A': '\\mathslbb{O}',
      '\uD835\uDD7B': '\\mathslbb{P}',
      '\uD835\uDD7C': '\\mathslbb{Q}',
      '\uD835\uDD7D': '\\mathslbb{R}',
      '\uD835\uDD7E': '\\mathslbb{S}',
      '\uD835\uDD7F': '\\mathslbb{T}',
      '\uD835\uDD80': '\\mathslbb{U}',
      '\uD835\uDD81': '\\mathslbb{V}',
      '\uD835\uDD82': '\\mathslbb{W}',
      '\uD835\uDD83': '\\mathslbb{X}',
      '\uD835\uDD84': '\\mathslbb{Y}',
      '\uD835\uDD85': '\\mathslbb{Z}',
      '\uD835\uDD86': '\\mathslbb{a}',
      '\uD835\uDD87': '\\mathslbb{b}',
      '\uD835\uDD88': '\\mathslbb{c}',
      '\uD835\uDD89': '\\mathslbb{d}',
      '\uD835\uDD8A': '\\mathslbb{e}',
      '\uD835\uDD8B': '\\mathslbb{f}',
      '\uD835\uDD8C': '\\mathslbb{g}',
      '\uD835\uDD8D': '\\mathslbb{h}',
      '\uD835\uDD8E': '\\mathslbb{i}',
      '\uD835\uDD8F': '\\mathslbb{j}',
      '\uD835\uDD90': '\\mathslbb{k}',
      '\uD835\uDD91': '\\mathslbb{l}',
      '\uD835\uDD92': '\\mathslbb{m}',
      '\uD835\uDD93': '\\mathslbb{n}',
      '\uD835\uDD94': '\\mathslbb{o}',
      '\uD835\uDD95': '\\mathslbb{p}',
      '\uD835\uDD96': '\\mathslbb{q}',
      '\uD835\uDD97': '\\mathslbb{r}',
      '\uD835\uDD98': '\\mathslbb{s}',
      '\uD835\uDD99': '\\mathslbb{t}',
      '\uD835\uDD9A': '\\mathslbb{u}',
      '\uD835\uDD9B': '\\mathslbb{v}',
      '\uD835\uDD9C': '\\mathslbb{w}',
      '\uD835\uDD9D': '\\mathslbb{x}',
      '\uD835\uDD9E': '\\mathslbb{y}',
      '\uD835\uDD9F': '\\mathslbb{z}',
      '\uD835\uDDA0': '\\mathsf{A}',
      '\uD835\uDDA1': '\\mathsf{B}',
      '\uD835\uDDA2': '\\mathsf{C}',
      '\uD835\uDDA3': '\\mathsf{D}',
      '\uD835\uDDA4': '\\mathsf{E}',
      '\uD835\uDDA5': '\\mathsf{F}',
      '\uD835\uDDA6': '\\mathsf{G}',
      '\uD835\uDDA7': '\\mathsf{H}',
      '\uD835\uDDA8': '\\mathsf{I}',
      '\uD835\uDDA9': '\\mathsf{J}',
      '\uD835\uDDAA': '\\mathsf{K}',
      '\uD835\uDDAB': '\\mathsf{L}',
      '\uD835\uDDAC': '\\mathsf{M}',
      '\uD835\uDDAD': '\\mathsf{N}',
      '\uD835\uDDAE': '\\mathsf{O}',
      '\uD835\uDDAF': '\\mathsf{P}',
      '\uD835\uDDB0': '\\mathsf{Q}',
      '\uD835\uDDB1': '\\mathsf{R}',
      '\uD835\uDDB2': '\\mathsf{S}',
      '\uD835\uDDB3': '\\mathsf{T}',
      '\uD835\uDDB4': '\\mathsf{U}',
      '\uD835\uDDB5': '\\mathsf{V}',
      '\uD835\uDDB6': '\\mathsf{W}',
      '\uD835\uDDB7': '\\mathsf{X}',
      '\uD835\uDDB8': '\\mathsf{Y}',
      '\uD835\uDDB9': '\\mathsf{Z}',
      '\uD835\uDDBA': '\\mathsf{a}',
      '\uD835\uDDBB': '\\mathsf{b}',
      '\uD835\uDDBC': '\\mathsf{c}',
      '\uD835\uDDBD': '\\mathsf{d}',
      '\uD835\uDDBE': '\\mathsf{e}',
      '\uD835\uDDBF': '\\mathsf{f}',
      '\uD835\uDDC0': '\\mathsf{g}',
      '\uD835\uDDC1': '\\mathsf{h}',
      '\uD835\uDDC2': '\\mathsf{i}',
      '\uD835\uDDC3': '\\mathsf{j}',
      '\uD835\uDDC4': '\\mathsf{k}',
      '\uD835\uDDC5': '\\mathsf{l}',
      '\uD835\uDDC6': '\\mathsf{m}',
      '\uD835\uDDC7': '\\mathsf{n}',
      '\uD835\uDDC8': '\\mathsf{o}',
      '\uD835\uDDC9': '\\mathsf{p}',
      '\uD835\uDDCA': '\\mathsf{q}',
      '\uD835\uDDCB': '\\mathsf{r}',
      '\uD835\uDDCC': '\\mathsf{s}',
      '\uD835\uDDCD': '\\mathsf{t}',
      '\uD835\uDDCE': '\\mathsf{u}',
      '\uD835\uDDCF': '\\mathsf{v}',
      '\uD835\uDDD0': '\\mathsf{w}',
      '\uD835\uDDD1': '\\mathsf{x}',
      '\uD835\uDDD2': '\\mathsf{y}',
      '\uD835\uDDD3': '\\mathsf{z}',
      '\uD835\uDDD4': '\\mathsfbf{A}',
      '\uD835\uDDD5': '\\mathsfbf{B}',
      '\uD835\uDDD6': '\\mathsfbf{C}',
      '\uD835\uDDD7': '\\mathsfbf{D}',
      '\uD835\uDDD8': '\\mathsfbf{E}',
      '\uD835\uDDD9': '\\mathsfbf{F}',
      '\uD835\uDDDA': '\\mathsfbf{G}',
      '\uD835\uDDDB': '\\mathsfbf{H}',
      '\uD835\uDDDC': '\\mathsfbf{I}',
      '\uD835\uDDDD': '\\mathsfbf{J}',
      '\uD835\uDDDE': '\\mathsfbf{K}',
      '\uD835\uDDDF': '\\mathsfbf{L}',
      '\uD835\uDDE0': '\\mathsfbf{M}',
      '\uD835\uDDE1': '\\mathsfbf{N}',
      '\uD835\uDDE2': '\\mathsfbf{O}',
      '\uD835\uDDE3': '\\mathsfbf{P}',
      '\uD835\uDDE4': '\\mathsfbf{Q}',
      '\uD835\uDDE5': '\\mathsfbf{R}',
      '\uD835\uDDE6': '\\mathsfbf{S}',
      '\uD835\uDDE7': '\\mathsfbf{T}',
      '\uD835\uDDE8': '\\mathsfbf{U}',
      '\uD835\uDDE9': '\\mathsfbf{V}',
      '\uD835\uDDEA': '\\mathsfbf{W}',
      '\uD835\uDDEB': '\\mathsfbf{X}',
      '\uD835\uDDEC': '\\mathsfbf{Y}',
      '\uD835\uDDED': '\\mathsfbf{Z}',
      '\uD835\uDDEE': '\\mathsfbf{a}',
      '\uD835\uDDEF': '\\mathsfbf{b}',
      '\uD835\uDDF0': '\\mathsfbf{c}',
      '\uD835\uDDF1': '\\mathsfbf{d}',
      '\uD835\uDDF2': '\\mathsfbf{e}',
      '\uD835\uDDF3': '\\mathsfbf{f}',
      '\uD835\uDDF4': '\\mathsfbf{g}',
      '\uD835\uDDF5': '\\mathsfbf{h}',
      '\uD835\uDDF6': '\\mathsfbf{i}',
      '\uD835\uDDF7': '\\mathsfbf{j}',
      '\uD835\uDDF8': '\\mathsfbf{k}',
      '\uD835\uDDF9': '\\mathsfbf{l}',
      '\uD835\uDDFA': '\\mathsfbf{m}',
      '\uD835\uDDFB': '\\mathsfbf{n}',
      '\uD835\uDDFC': '\\mathsfbf{o}',
      '\uD835\uDDFD': '\\mathsfbf{p}',
      '\uD835\uDDFE': '\\mathsfbf{q}',
      '\uD835\uDDFF': '\\mathsfbf{r}',
      '\uD835\uDE00': '\\mathsfbf{s}',
      '\uD835\uDE01': '\\mathsfbf{t}',
      '\uD835\uDE02': '\\mathsfbf{u}',
      '\uD835\uDE03': '\\mathsfbf{v}',
      '\uD835\uDE04': '\\mathsfbf{w}',
      '\uD835\uDE05': '\\mathsfbf{x}',
      '\uD835\uDE06': '\\mathsfbf{y}',
      '\uD835\uDE07': '\\mathsfbf{z}',
      '\uD835\uDE08': '\\mathsfsl{A}',
      '\uD835\uDE09': '\\mathsfsl{B}',
      '\uD835\uDE0A': '\\mathsfsl{C}',
      '\uD835\uDE0B': '\\mathsfsl{D}',
      '\uD835\uDE0C': '\\mathsfsl{E}',
      '\uD835\uDE0D': '\\mathsfsl{F}',
      '\uD835\uDE0E': '\\mathsfsl{G}',
      '\uD835\uDE0F': '\\mathsfsl{H}',
      '\uD835\uDE10': '\\mathsfsl{I}',
      '\uD835\uDE11': '\\mathsfsl{J}',
      '\uD835\uDE12': '\\mathsfsl{K}',
      '\uD835\uDE13': '\\mathsfsl{L}',
      '\uD835\uDE14': '\\mathsfsl{M}',
      '\uD835\uDE15': '\\mathsfsl{N}',
      '\uD835\uDE16': '\\mathsfsl{O}',
      '\uD835\uDE17': '\\mathsfsl{P}',
      '\uD835\uDE18': '\\mathsfsl{Q}',
      '\uD835\uDE19': '\\mathsfsl{R}',
      '\uD835\uDE1A': '\\mathsfsl{S}',
      '\uD835\uDE1B': '\\mathsfsl{T}',
      '\uD835\uDE1C': '\\mathsfsl{U}',
      '\uD835\uDE1D': '\\mathsfsl{V}',
      '\uD835\uDE1E': '\\mathsfsl{W}',
      '\uD835\uDE1F': '\\mathsfsl{X}',
      '\uD835\uDE20': '\\mathsfsl{Y}',
      '\uD835\uDE21': '\\mathsfsl{Z}',
      '\uD835\uDE22': '\\mathsfsl{a}',
      '\uD835\uDE23': '\\mathsfsl{b}',
      '\uD835\uDE24': '\\mathsfsl{c}',
      '\uD835\uDE25': '\\mathsfsl{d}',
      '\uD835\uDE26': '\\mathsfsl{e}',
      '\uD835\uDE27': '\\mathsfsl{f}',
      '\uD835\uDE28': '\\mathsfsl{g}',
      '\uD835\uDE29': '\\mathsfsl{h}',
      '\uD835\uDE2A': '\\mathsfsl{i}',
      '\uD835\uDE2B': '\\mathsfsl{j}',
      '\uD835\uDE2C': '\\mathsfsl{k}',
      '\uD835\uDE2D': '\\mathsfsl{l}',
      '\uD835\uDE2E': '\\mathsfsl{m}',
      '\uD835\uDE2F': '\\mathsfsl{n}',
      '\uD835\uDE30': '\\mathsfsl{o}',
      '\uD835\uDE31': '\\mathsfsl{p}',
      '\uD835\uDE32': '\\mathsfsl{q}',
      '\uD835\uDE33': '\\mathsfsl{r}',
      '\uD835\uDE34': '\\mathsfsl{s}',
      '\uD835\uDE35': '\\mathsfsl{t}',
      '\uD835\uDE36': '\\mathsfsl{u}',
      '\uD835\uDE37': '\\mathsfsl{v}',
      '\uD835\uDE38': '\\mathsfsl{w}',
      '\uD835\uDE39': '\\mathsfsl{x}',
      '\uD835\uDE3A': '\\mathsfsl{y}',
      '\uD835\uDE3B': '\\mathsfsl{z}',
      '\uD835\uDE3C': '\\mathsfbfsl{A}',
      '\uD835\uDE3D': '\\mathsfbfsl{B}',
      '\uD835\uDE3E': '\\mathsfbfsl{C}',
      '\uD835\uDE3F': '\\mathsfbfsl{D}',
      '\uD835\uDE40': '\\mathsfbfsl{E}',
      '\uD835\uDE41': '\\mathsfbfsl{F}',
      '\uD835\uDE42': '\\mathsfbfsl{G}',
      '\uD835\uDE43': '\\mathsfbfsl{H}',
      '\uD835\uDE44': '\\mathsfbfsl{I}',
      '\uD835\uDE45': '\\mathsfbfsl{J}',
      '\uD835\uDE46': '\\mathsfbfsl{K}',
      '\uD835\uDE47': '\\mathsfbfsl{L}',
      '\uD835\uDE48': '\\mathsfbfsl{M}',
      '\uD835\uDE49': '\\mathsfbfsl{N}',
      '\uD835\uDE4A': '\\mathsfbfsl{O}',
      '\uD835\uDE4B': '\\mathsfbfsl{P}',
      '\uD835\uDE4C': '\\mathsfbfsl{Q}',
      '\uD835\uDE4D': '\\mathsfbfsl{R}',
      '\uD835\uDE4E': '\\mathsfbfsl{S}',
      '\uD835\uDE4F': '\\mathsfbfsl{T}',
      '\uD835\uDE50': '\\mathsfbfsl{U}',
      '\uD835\uDE51': '\\mathsfbfsl{V}',
      '\uD835\uDE52': '\\mathsfbfsl{W}',
      '\uD835\uDE53': '\\mathsfbfsl{X}',
      '\uD835\uDE54': '\\mathsfbfsl{Y}',
      '\uD835\uDE55': '\\mathsfbfsl{Z}',
      '\uD835\uDE56': '\\mathsfbfsl{a}',
      '\uD835\uDE57': '\\mathsfbfsl{b}',
      '\uD835\uDE58': '\\mathsfbfsl{c}',
      '\uD835\uDE59': '\\mathsfbfsl{d}',
      '\uD835\uDE5A': '\\mathsfbfsl{e}',
      '\uD835\uDE5B': '\\mathsfbfsl{f}',
      '\uD835\uDE5C': '\\mathsfbfsl{g}',
      '\uD835\uDE5D': '\\mathsfbfsl{h}',
      '\uD835\uDE5E': '\\mathsfbfsl{i}',
      '\uD835\uDE5F': '\\mathsfbfsl{j}',
      '\uD835\uDE60': '\\mathsfbfsl{k}',
      '\uD835\uDE61': '\\mathsfbfsl{l}',
      '\uD835\uDE62': '\\mathsfbfsl{m}',
      '\uD835\uDE63': '\\mathsfbfsl{n}',
      '\uD835\uDE64': '\\mathsfbfsl{o}',
      '\uD835\uDE65': '\\mathsfbfsl{p}',
      '\uD835\uDE66': '\\mathsfbfsl{q}',
      '\uD835\uDE67': '\\mathsfbfsl{r}',
      '\uD835\uDE68': '\\mathsfbfsl{s}',
      '\uD835\uDE69': '\\mathsfbfsl{t}',
      '\uD835\uDE6A': '\\mathsfbfsl{u}',
      '\uD835\uDE6B': '\\mathsfbfsl{v}',
      '\uD835\uDE6C': '\\mathsfbfsl{w}',
      '\uD835\uDE6D': '\\mathsfbfsl{x}',
      '\uD835\uDE6E': '\\mathsfbfsl{y}',
      '\uD835\uDE6F': '\\mathsfbfsl{z}',
      '\uD835\uDE70': '\\mathtt{A}',
      '\uD835\uDE71': '\\mathtt{B}',
      '\uD835\uDE72': '\\mathtt{C}',
      '\uD835\uDE73': '\\mathtt{D}',
      '\uD835\uDE74': '\\mathtt{E}',
      '\uD835\uDE75': '\\mathtt{F}',
      '\uD835\uDE76': '\\mathtt{G}',
      '\uD835\uDE77': '\\mathtt{H}',
      '\uD835\uDE78': '\\mathtt{I}',
      '\uD835\uDE79': '\\mathtt{J}',
      '\uD835\uDE7A': '\\mathtt{K}',
      '\uD835\uDE7B': '\\mathtt{L}',
      '\uD835\uDE7C': '\\mathtt{M}',
      '\uD835\uDE7D': '\\mathtt{N}',
      '\uD835\uDE7E': '\\mathtt{O}',
      '\uD835\uDE7F': '\\mathtt{P}',
      '\uD835\uDE80': '\\mathtt{Q}',
      '\uD835\uDE81': '\\mathtt{R}',
      '\uD835\uDE82': '\\mathtt{S}',
      '\uD835\uDE83': '\\mathtt{T}',
      '\uD835\uDE84': '\\mathtt{U}',
      '\uD835\uDE85': '\\mathtt{V}',
      '\uD835\uDE86': '\\mathtt{W}',
      '\uD835\uDE87': '\\mathtt{X}',
      '\uD835\uDE88': '\\mathtt{Y}',
      '\uD835\uDE89': '\\mathtt{Z}',
      '\uD835\uDE8A': '\\mathtt{a}',
      '\uD835\uDE8B': '\\mathtt{b}',
      '\uD835\uDE8C': '\\mathtt{c}',
      '\uD835\uDE8D': '\\mathtt{d}',
      '\uD835\uDE8E': '\\mathtt{e}',
      '\uD835\uDE8F': '\\mathtt{f}',
      '\uD835\uDE90': '\\mathtt{g}',
      '\uD835\uDE91': '\\mathtt{h}',
      '\uD835\uDE92': '\\mathtt{i}',
      '\uD835\uDE93': '\\mathtt{j}',
      '\uD835\uDE94': '\\mathtt{k}',
      '\uD835\uDE95': '\\mathtt{l}',
      '\uD835\uDE96': '\\mathtt{m}',
      '\uD835\uDE97': '\\mathtt{n}',
      '\uD835\uDE98': '\\mathtt{o}',
      '\uD835\uDE99': '\\mathtt{p}',
      '\uD835\uDE9A': '\\mathtt{q}',
      '\uD835\uDE9B': '\\mathtt{r}',
      '\uD835\uDE9C': '\\mathtt{s}',
      '\uD835\uDE9D': '\\mathtt{t}',
      '\uD835\uDE9E': '\\mathtt{u}',
      '\uD835\uDE9F': '\\mathtt{v}',
      '\uD835\uDEA0': '\\mathtt{w}',
      '\uD835\uDEA1': '\\mathtt{x}',
      '\uD835\uDEA2': '\\mathtt{y}',
      '\uD835\uDEA3': '\\mathtt{z}',
      '\uD835\uDEA4': '\\imath{}',
      '\uD835\uDEA5': '\\jmath{}',
      '\uD835\uDEA8': '\\mathbf{A}',
      '\uD835\uDEA9': '\\mathbf{B}',
      '\uD835\uDEAA': '\\mathbf{\\Gamma}',
      '\uD835\uDEAB': '\\mathbf{\\Delta}',
      '\uD835\uDEAC': '\\mathbf{E}',
      '\uD835\uDEAD': '\\mathbf{Z}',
      '\uD835\uDEAE': '\\mathbf{H}',
      '\uD835\uDEAF': '\\mathbf{\\Theta}',
      '\uD835\uDEB0': '\\mathbf{I}',
      '\uD835\uDEB1': '\\mathbf{K}',
      '\uD835\uDEB2': '\\mathbf{\\Lambda}',
      '\uD835\uDEB3': 'M',
      '\uD835\uDEB4': 'N',
      '\uD835\uDEB5': '\\mathbf{\\Xi}',
      '\uD835\uDEB6': 'O',
      '\uD835\uDEB7': '\\mathbf{\\Pi}',
      '\uD835\uDEB8': '\\mathbf{P}',
      '\uD835\uDEBA': '\\mathbf{\\Sigma}',
      '\uD835\uDEBB': '\\mathbf{T}',
      '\uD835\uDEBC': '\\mathbf{\\Upsilon}',
      '\uD835\uDEBD': '\\mathbf{\\Phi}',
      '\uD835\uDEBE': '\\mathbf{X}',
      '\uD835\uDEBF': '\\mathbf{\\Psi}',
      '\uD835\uDEC0': '\\mathbf{\\Omega}',
      '\uD835\uDEC1': '\\mathbf{\\nabla}',
      '\uD835\uDEC2': '\\mathbf{A}',
      '\uD835\uDEC3': '\\mathbf{B}',
      '\uD835\uDEC4': '\\mathbf{\\Gamma}',
      '\uD835\uDEC5': '\\mathbf{\\Delta}',
      '\uD835\uDEC6': '\\mathbf{E}',
      '\uD835\uDEC7': '\\mathbf{Z}',
      '\uD835\uDEC8': '\\mathbf{H}',
      '\uD835\uDEC9': '\\mathbf{\\theta}',
      '\uD835\uDECA': '\\mathbf{I}',
      '\uD835\uDECB': '\\mathbf{K}',
      '\uD835\uDECC': '\\mathbf{\\Lambda}',
      '\uD835\uDECD': 'M',
      '\uD835\uDECE': 'N',
      '\uD835\uDECF': '\\mathbf{\\Xi}',
      '\uD835\uDED0': 'O',
      '\uD835\uDED1': '\\mathbf{\\Pi}',
      '\uD835\uDED2': '\\mathbf{P}',
      '\uD835\uDED3': '\\mathbf{\\varsigma}',
      '\uD835\uDED4': '\\mathbf{\\Sigma}',
      '\uD835\uDED5': '\\mathbf{T}',
      '\uD835\uDED6': '\\mathbf{\\Upsilon}',
      '\uD835\uDED7': '\\mathbf{\\Phi}',
      '\uD835\uDED8': '\\mathbf{X}',
      '\uD835\uDED9': '\\mathbf{\\Psi}',
      '\uD835\uDEDA': '\\mathbf{\\Omega}',
      '\uD835\uDEDB': '\\partial{}',
      '\uD835\uDEDC': '\\in{}',
      '\uD835\uDEE2': '\\mathsl{A}',
      '\uD835\uDEE3': '\\mathsl{B}',
      '\uD835\uDEE4': '\\mathsl{\\Gamma}',
      '\uD835\uDEE5': '\\mathsl{\\Delta}',
      '\uD835\uDEE6': '\\mathsl{E}',
      '\uD835\uDEE7': '\\mathsl{Z}',
      '\uD835\uDEE8': '\\mathsl{H}',
      '\uD835\uDEE9': '\\mathsl{\\Theta}',
      '\uD835\uDEEA': '\\mathsl{I}',
      '\uD835\uDEEB': '\\mathsl{K}',
      '\uD835\uDEEC': '\\mathsl{\\Lambda}',
      '\uD835\uDEED': 'M',
      '\uD835\uDEEE': 'N',
      '\uD835\uDEEF': '\\mathsl{\\Xi}',
      '\uD835\uDEF0': 'O',
      '\uD835\uDEF1': '\\mathsl{\\Pi}',
      '\uD835\uDEF2': '\\mathsl{P}',
      '\uD835\uDEF4': '\\mathsl{\\Sigma}',
      '\uD835\uDEF5': '\\mathsl{T}',
      '\uD835\uDEF6': '\\mathsl{\\Upsilon}',
      '\uD835\uDEF7': '\\mathsl{\\Phi}',
      '\uD835\uDEF8': '\\mathsl{X}',
      '\uD835\uDEF9': '\\mathsl{\\Psi}',
      '\uD835\uDEFA': '\\mathsl{\\Omega}',
      '\uD835\uDEFB': '\\mathsl{\\nabla}',
      '\uD835\uDEFC': '\\mathsl{A}',
      '\uD835\uDEFD': '\\mathsl{B}',
      '\uD835\uDEFE': '\\mathsl{\\Gamma}',
      '\uD835\uDEFF': '\\mathsl{\\Delta}',
      '\uD835\uDF00': '\\mathsl{E}',
      '\uD835\uDF01': '\\mathsl{Z}',
      '\uD835\uDF02': '\\mathsl{H}',
      '\uD835\uDF03': '\\mathsl{\\Theta}',
      '\uD835\uDF04': '\\mathsl{I}',
      '\uD835\uDF05': '\\mathsl{K}',
      '\uD835\uDF06': '\\mathsl{\\Lambda}',
      '\uD835\uDF07': 'M',
      '\uD835\uDF08': 'N',
      '\uD835\uDF09': '\\mathsl{\\Xi}',
      '\uD835\uDF0A': 'O',
      '\uD835\uDF0B': '\\mathsl{\\Pi}',
      '\uD835\uDF0C': '\\mathsl{P}',
      '\uD835\uDF0D': '\\mathsl{\\varsigma}',
      '\uD835\uDF0E': '\\mathsl{\\Sigma}',
      '\uD835\uDF0F': '\\mathsl{T}',
      '\uD835\uDF10': '\\mathsl{\\Upsilon}',
      '\uD835\uDF11': '\\mathsl{\\Phi}',
      '\uD835\uDF12': '\\mathsl{X}',
      '\uD835\uDF13': '\\mathsl{\\Psi}',
      '\uD835\uDF14': '\\mathsl{\\Omega}',
      '\uD835\uDF15': '\\partial{}',
      '\uD835\uDF16': '\\in{}',
      '\uD835\uDF1C': '\\mathbit{A}',
      '\uD835\uDF1D': '\\mathbit{B}',
      '\uD835\uDF1E': '\\mathbit{\\Gamma}',
      '\uD835\uDF1F': '\\mathbit{\\Delta}',
      '\uD835\uDF20': '\\mathbit{E}',
      '\uD835\uDF21': '\\mathbit{Z}',
      '\uD835\uDF22': '\\mathbit{H}',
      '\uD835\uDF23': '\\mathbit{\\Theta}',
      '\uD835\uDF24': '\\mathbit{I}',
      '\uD835\uDF25': '\\mathbit{K}',
      '\uD835\uDF26': '\\mathbit{\\Lambda}',
      '\uD835\uDF27': 'M',
      '\uD835\uDF28': 'N',
      '\uD835\uDF29': '\\mathbit{\\Xi}',
      '\uD835\uDF2A': 'O',
      '\uD835\uDF2B': '\\mathbit{\\Pi}',
      '\uD835\uDF2C': '\\mathbit{P}',
      '\uD835\uDF2E': '\\mathbit{\\Sigma}',
      '\uD835\uDF2F': '\\mathbit{T}',
      '\uD835\uDF30': '\\mathbit{\\Upsilon}',
      '\uD835\uDF31': '\\mathbit{\\Phi}',
      '\uD835\uDF32': '\\mathbit{X}',
      '\uD835\uDF33': '\\mathbit{\\Psi}',
      '\uD835\uDF34': '\\mathbit{\\Omega}',
      '\uD835\uDF35': '\\mathbit{\\nabla}',
      '\uD835\uDF36': '\\mathbit{A}',
      '\uD835\uDF37': '\\mathbit{B}',
      '\uD835\uDF38': '\\mathbit{\\Gamma}',
      '\uD835\uDF39': '\\mathbit{\\Delta}',
      '\uD835\uDF3A': '\\mathbit{E}',
      '\uD835\uDF3B': '\\mathbit{Z}',
      '\uD835\uDF3C': '\\mathbit{H}',
      '\uD835\uDF3D': '\\mathbit{\\Theta}',
      '\uD835\uDF3E': '\\mathbit{I}',
      '\uD835\uDF3F': '\\mathbit{K}',
      '\uD835\uDF40': '\\mathbit{\\Lambda}',
      '\uD835\uDF41': 'M',
      '\uD835\uDF42': 'N',
      '\uD835\uDF43': '\\mathbit{\\Xi}',
      '\uD835\uDF44': 'O',
      '\uD835\uDF45': '\\mathbit{\\Pi}',
      '\uD835\uDF46': '\\mathbit{P}',
      '\uD835\uDF47': '\\mathbit{\\varsigma}',
      '\uD835\uDF48': '\\mathbit{\\Sigma}',
      '\uD835\uDF49': '\\mathbit{T}',
      '\uD835\uDF4A': '\\mathbit{\\Upsilon}',
      '\uD835\uDF4B': '\\mathbit{\\Phi}',
      '\uD835\uDF4C': '\\mathbit{X}',
      '\uD835\uDF4D': '\\mathbit{\\Psi}',
      '\uD835\uDF4E': '\\mathbit{\\Omega}',
      '\uD835\uDF4F': '\\partial{}',
      '\uD835\uDF50': '\\in{}',
      '\uD835\uDF56': '\\mathsfbf{A}',
      '\uD835\uDF57': '\\mathsfbf{B}',
      '\uD835\uDF58': '\\mathsfbf{\\Gamma}',
      '\uD835\uDF59': '\\mathsfbf{\\Delta}',
      '\uD835\uDF5A': '\\mathsfbf{E}',
      '\uD835\uDF5B': '\\mathsfbf{Z}',
      '\uD835\uDF5C': '\\mathsfbf{H}',
      '\uD835\uDF5D': '\\mathsfbf{\\Theta}',
      '\uD835\uDF5E': '\\mathsfbf{I}',
      '\uD835\uDF5F': '\\mathsfbf{K}',
      '\uD835\uDF60': '\\mathsfbf{\\Lambda}',
      '\uD835\uDF61': 'M',
      '\uD835\uDF62': 'N',
      '\uD835\uDF63': '\\mathsfbf{\\Xi}',
      '\uD835\uDF64': 'O',
      '\uD835\uDF65': '\\mathsfbf{\\Pi}',
      '\uD835\uDF66': '\\mathsfbf{P}',
      '\uD835\uDF68': '\\mathsfbf{\\Sigma}',
      '\uD835\uDF69': '\\mathsfbf{T}',
      '\uD835\uDF6A': '\\mathsfbf{\\Upsilon}',
      '\uD835\uDF6B': '\\mathsfbf{\\Phi}',
      '\uD835\uDF6C': '\\mathsfbf{X}',
      '\uD835\uDF6D': '\\mathsfbf{\\Psi}',
      '\uD835\uDF6E': '\\mathsfbf{\\Omega}',
      '\uD835\uDF6F': '\\mathsfbf{\\nabla}',
      '\uD835\uDF70': '\\mathsfbf{A}',
      '\uD835\uDF71': '\\mathsfbf{B}',
      '\uD835\uDF72': '\\mathsfbf{\\Gamma}',
      '\uD835\uDF73': '\\mathsfbf{\\Delta}',
      '\uD835\uDF74': '\\mathsfbf{E}',
      '\uD835\uDF75': '\\mathsfbf{Z}',
      '\uD835\uDF76': '\\mathsfbf{H}',
      '\uD835\uDF77': '\\mathsfbf{\\Theta}',
      '\uD835\uDF78': '\\mathsfbf{I}',
      '\uD835\uDF79': '\\mathsfbf{K}',
      '\uD835\uDF7A': '\\mathsfbf{\\Lambda}',
      '\uD835\uDF7B': 'M',
      '\uD835\uDF7C': 'N',
      '\uD835\uDF7D': '\\mathsfbf{\\Xi}',
      '\uD835\uDF7E': 'O',
      '\uD835\uDF7F': '\\mathsfbf{\\Pi}',
      '\uD835\uDF80': '\\mathsfbf{P}',
      '\uD835\uDF81': '\\mathsfbf{\\varsigma}',
      '\uD835\uDF82': '\\mathsfbf{\\Sigma}',
      '\uD835\uDF83': '\\mathsfbf{T}',
      '\uD835\uDF84': '\\mathsfbf{\\Upsilon}',
      '\uD835\uDF85': '\\mathsfbf{\\Phi}',
      '\uD835\uDF86': '\\mathsfbf{X}',
      '\uD835\uDF87': '\\mathsfbf{\\Psi}',
      '\uD835\uDF88': '\\mathsfbf{\\Omega}',
      '\uD835\uDF89': '\\partial{}',
      '\uD835\uDF8A': '\\in{}',
      '\uD835\uDF90': '\\mathsfbfsl{A}',
      '\uD835\uDF91': '\\mathsfbfsl{B}',
      '\uD835\uDF92': '\\mathsfbfsl{\\Gamma}',
      '\uD835\uDF93': '\\mathsfbfsl{\\Delta}',
      '\uD835\uDF94': '\\mathsfbfsl{E}',
      '\uD835\uDF95': '\\mathsfbfsl{Z}',
      '\uD835\uDF96': '\\mathsfbfsl{H}',
      '\uD835\uDF97': '\\mathsfbfsl{\\vartheta}',
      '\uD835\uDF98': '\\mathsfbfsl{I}',
      '\uD835\uDF99': '\\mathsfbfsl{K}',
      '\uD835\uDF9A': '\\mathsfbfsl{\\Lambda}',
      '\uD835\uDF9B': 'M',
      '\uD835\uDF9C': 'N',
      '\uD835\uDF9D': '\\mathsfbfsl{\\Xi}',
      '\uD835\uDF9E': 'O',
      '\uD835\uDF9F': '\\mathsfbfsl{\\Pi}',
      '\uD835\uDFA0': '\\mathsfbfsl{P}',
      '\uD835\uDFA2': '\\mathsfbfsl{\\Sigma}',
      '\uD835\uDFA3': '\\mathsfbfsl{T}',
      '\uD835\uDFA4': '\\mathsfbfsl{\\Upsilon}',
      '\uD835\uDFA5': '\\mathsfbfsl{\\Phi}',
      '\uD835\uDFA6': '\\mathsfbfsl{X}',
      '\uD835\uDFA7': '\\mathsfbfsl{\\Psi}',
      '\uD835\uDFA8': '\\mathsfbfsl{\\Omega}',
      '\uD835\uDFA9': '\\mathsfbfsl{\\nabla}',
      '\uD835\uDFAA': '\\mathsfbfsl{A}',
      '\uD835\uDFAB': '\\mathsfbfsl{B}',
      '\uD835\uDFAC': '\\mathsfbfsl{\\Gamma}',
      '\uD835\uDFAD': '\\mathsfbfsl{\\Delta}',
      '\uD835\uDFAE': '\\mathsfbfsl{E}',
      '\uD835\uDFAF': '\\mathsfbfsl{Z}',
      '\uD835\uDFB0': '\\mathsfbfsl{H}',
      '\uD835\uDFB1': '\\mathsfbfsl{\\vartheta}',
      '\uD835\uDFB2': '\\mathsfbfsl{I}',
      '\uD835\uDFB3': '\\mathsfbfsl{K}',
      '\uD835\uDFB4': '\\mathsfbfsl{\\Lambda}',
      '\uD835\uDFB5': 'M',
      '\uD835\uDFB6': 'N',
      '\uD835\uDFB7': '\\mathsfbfsl{\\Xi}',
      '\uD835\uDFB8': 'O',
      '\uD835\uDFB9': '\\mathsfbfsl{\\Pi}',
      '\uD835\uDFBA': '\\mathsfbfsl{P}',
      '\uD835\uDFBB': '\\mathsfbfsl{\\varsigma}',
      '\uD835\uDFBC': '\\mathsfbfsl{\\Sigma}',
      '\uD835\uDFBD': '\\mathsfbfsl{T}',
      '\uD835\uDFBE': '\\mathsfbfsl{\\Upsilon}',
      '\uD835\uDFBF': '\\mathsfbfsl{\\Phi}',
      '\uD835\uDFC0': '\\mathsfbfsl{X}',
      '\uD835\uDFC1': '\\mathsfbfsl{\\Psi}',
      '\uD835\uDFC2': '\\mathsfbfsl{\\Omega}',
      '\uD835\uDFC3': '\\partial{}',
      '\uD835\uDFC4': '\\in{}',
      '\uD835\uDFCA': '\\mbfDigamma{}',
      '\uD835\uDFCB': '\\mbfdigamma{}',
      '\uD835\uDFCE': '\\mathbf{0}',
      '\uD835\uDFCF': '\\mathbf{1}',
      '\uD835\uDFD0': '\\mathbf{2}',
      '\uD835\uDFD1': '\\mathbf{3}',
      '\uD835\uDFD2': '\\mathbf{4}',
      '\uD835\uDFD3': '\\mathbf{5}',
      '\uD835\uDFD4': '\\mathbf{6}',
      '\uD835\uDFD5': '\\mathbf{7}',
      '\uD835\uDFD6': '\\mathbf{8}',
      '\uD835\uDFD7': '\\mathbf{9}',
      '\uD835\uDFD8': '\\mathbb{0}',
      '\uD835\uDFD9': '\\mathbb{1}',
      '\uD835\uDFDA': '\\mathbb{2}',
      '\uD835\uDFDB': '\\mathbb{3}',
      '\uD835\uDFDC': '\\mathbb{4}',
      '\uD835\uDFDD': '\\mathbb{5}',
      '\uD835\uDFDE': '\\mathbb{6}',
      '\uD835\uDFDF': '\\mathbb{7}',
      '\uD835\uDFE0': '\\mathbb{8}',
      '\uD835\uDFE1': '\\mathbb{9}',
      '\uD835\uDFE2': '\\mathsf{0}',
      '\uD835\uDFE3': '\\mathsf{1}',
      '\uD835\uDFE4': '\\mathsf{2}',
      '\uD835\uDFE5': '\\mathsf{3}',
      '\uD835\uDFE6': '\\mathsf{4}',
      '\uD835\uDFE7': '\\mathsf{5}',
      '\uD835\uDFE8': '\\mathsf{6}',
      '\uD835\uDFE9': '\\mathsf{7}',
      '\uD835\uDFEA': '\\mathsf{8}',
      '\uD835\uDFEB': '\\mathsf{9}',
      '\uD835\uDFEC': '\\mathsfbf{0}',
      '\uD835\uDFED': '\\mathsfbf{1}',
      '\uD835\uDFEE': '\\mathsfbf{2}',
      '\uD835\uDFEF': '\\mathsfbf{3}',
      '\uD835\uDFF0': '\\mathsfbf{4}',
      '\uD835\uDFF1': '\\mathsfbf{5}',
      '\uD835\uDFF2': '\\mathsfbf{6}',
      '\uD835\uDFF3': '\\mathsfbf{7}',
      '\uD835\uDFF4': '\\mathsfbf{8}',
      '\uD835\uDFF5': '\\mathsfbf{9}',
      '\uD835\uDFF6': '\\mathtt{0}',
      '\uD835\uDFF7': '\\mathtt{1}',
      '\uD835\uDFF8': '\\mathtt{2}',
      '\uD835\uDFF9': '\\mathtt{3}',
      '\uD835\uDFFA': '\\mathtt{4}',
      '\uD835\uDFFB': '\\mathtt{5}',
      '\uD835\uDFFC': '\\mathtt{6}',
      '\uD835\uDFFD': '\\mathtt{7}',
      '\uD835\uDFFE': '\\mathtt{8}',
      '\uD835\uDFFF': '\\mathtt{9}',
      '\u2070': '^{0}',
      '\u2074': '^{4}',
      '\u2075': '^{5}',
      '\u2076': '^{6}',
      '\u2077': '^{7}',
      '\u2078': '^{8}',
      '\u2079': '^{9}',
      '\u207A': '^{+}',
      '\u207B': '^{-}',
      '\u207C': '^{=}',
      '\u207D': '^{(}',
      '\u207E': '^{)}',
      '\u207F': '^{n}',
      '\u2080': '_{0}',
      '\u2081': '_{1}',
      '\u2082': '_{2}',
      '\u2083': '_{3}',
      '\u2084': '_{4}',
      '\u2085': '_{5}',
      '\u2086': '_{6}',
      '\u2087': '_{7}',
      '\u2088': '_{8}',
      '\u2089': '_{9}',
      '\u208A': '_{+}',
      '\u208B': '_{-}',
      '\u208C': '_{=}',
      '\u208D': '_{(}',
      '\u208E': '_{)}',
      '\u2003': '\\quad{}',
      '\u3008': '\\langle{}',
      '\u3009': '\\rangle{}',
      '\u2ADD\u0338': '\\forks{}'
    },
    'text': {
      '#': '\\#',
      '$': '\\$',
      '%': '\\%',
      '&': '\\&',
      '^': '\\^',
      '_': '\\_',
      '{': '\\{',
      '}': '\\}',
      '~': '\\textasciitilde{}',
      '\xA0': '~',
      '\xA1': '\\textexclamdown{}',
      '\xA2': '\\textcent{}',
      '\xA3': '\\textsterling{}',
      '\xA4': '\\textcurrency{}',
      '\xA5': '\\textyen{}',
      '\xA6': '\\textbrokenbar{}',
      '\xA7': '\\textsection{}',
      '\xA8': '\\textasciidieresis{}',
      '\xA9': '\\textcopyright{}',
      '\xAA': '\\textordfeminine{}',
      '\xAB': '\\guillemotleft{}',
      '\xAE': '\\textregistered{}',
      '\xAF': '\\textasciimacron{}',
      '\xB4': '\\textasciiacute{}',
      '\xB6': '\\textparagraph{}',
      '\xB8': '\\c{}',
      '\xBA': '\\textordmasculine{}',
      '\xBB': '\\guillemotright{}',
      '\xBC': '\\textonequarter{}',
      '\xBD': '\\textonehalf{}',
      '\xBE': '\\textthreequarters{}',
      '\xBF': '\\textquestiondown{}',
      '\xC0': '\\`A',
      '\xC1': '\\\'A',
      '\xC2': '\\^A',
      '\xC3': '\\~A',
      '\xC4': '\\"A',
      '\xC5': '\\AA{}',
      '\xC6': '\\AE{}',
      '\xC7': '{\\c C}',
      '\xC8': '\\`E',
      '\xC9': '\\\'E',
      '\xCA': '\\^E',
      '\xCB': '\\"E',
      '\xCC': '\\`I',
      '\xCD': '\\\'I',
      '\xCE': '\\^I',
      '\xCF': '\\"I',
      '\xD0': '\\DH{}',
      '\xD1': '\\~N',
      '\xD2': '\\`O',
      '\xD3': '\\\'O',
      '\xD4': '\\^O',
      '\xD5': '\\~O',
      '\xD6': '\\"O',
      '\xD7': '\\texttimes{}',
      '\xD8': '\\O{}',
      '\xD9': '\\`U',
      '\xDA': '\\\'U',
      '\xDB': '\\^U',
      '\xDC': '\\"U',
      '\xDD': '\\\'Y',
      '\xDE': '\\TH{}',
      '\xDF': '\\ss{}',
      '\xE0': '\\`a',
      '\xE1': '\\\'a',
      '\xE2': '\\^a',
      '\xE3': '\\~a',
      '\xE4': '\\"a',
      '\xE5': '\\aa{}',
      '\xE6': '\\ae{}',
      '\xE7': '{\\c c}',
      '\xE8': '\\`e',
      '\xE9': '\\\'e',
      '\xEA': '\\^e',
      '\xEB': '\\"e',
      '\xEC': '\\`i',
      '\xED': '\\\'i',
      '\xEE': '\\^i',
      '\xEF': '\\"i',
      '\xF0': '\\dh{}',
      '\xF1': '\\~n',
      '\xF2': '\\`o',
      '\xF3': '\\\'o',
      '\xF4': '\\^o',
      '\xF5': '\\~o',
      '\xF6': '\\"o',
      '\xF8': '\\o{}',
      '\xF9': '\\`u',
      '\xFA': '\\\'u',
      '\xFB': '\\^u',
      '\xFC': '\\"u',
      '\xFD': '\\\'y',
      '\xFE': '\\th{}',
      '\xFF': '\\"y',
      '\u0100': '\\=A',
      '\u0101': '\\=a',
      '\u0102': '{\\u A}',
      '\u0103': '{\\u a}',
      '\u0104': '\\k{A}',
      '\u0105': '\\k{a}',
      '\u0106': '\\\'C',
      '\u0107': '\\\'c',
      '\u0108': '\\^C',
      '\u0109': '\\^c',
      '\u010A': '\\.{C}',
      '\u010B': '\\.{c}',
      '\u010C': '{\\v C}',
      '\u010D': '{\\v c}',
      '\u010E': '{\\v D}',
      '\u010F': '{\\v d}',
      '\u0110': '\\DJ{}',
      '\u0111': '\\dj{}',
      '\u0112': '\\=E',
      '\u0113': '\\=e',
      '\u0114': '{\\u E}',
      '\u0115': '{\\u e}',
      '\u0116': '\\.{E}',
      '\u0117': '\\.{e}',
      '\u0118': '\\k{E}',
      '\u0119': '\\k{e}',
      '\u011A': '{\\v E}',
      '\u011B': '{\\v e}',
      '\u011C': '\\^G',
      '\u011D': '\\^g',
      '\u011E': '{\\u G}',
      '\u011F': '{\\u g}',
      '\u0120': '\\.{G}',
      '\u0121': '\\.{g}',
      '\u0122': '{\\c G}',
      '\u0123': '{\\c g}',
      '\u0124': '\\^H',
      '\u0125': '\\^h',
      '\u0126': '{\\fontencoding{LELA}\\selectfont\\char40}',
      '\u0128': '\\~I',
      '\u0129': '\\~i',
      '\u012A': '\\=I',
      '\u012B': '\\=i',
      '\u012C': '{\\u I}',
      '\u012D': '{\\u \\i}',
      '\u012E': '\\k{I}',
      '\u012F': '\\k{i}',
      '\u0130': '\\.{I}',
      '\u0131': '\\i{}',
      '\u0132': 'IJ',
      '\u0133': 'ij',
      '\u0134': '\\^J',
      '\u0135': '\\^\\{j}',
      '\u0136': '{\\c K}',
      '\u0137': '{\\c k}',
      '\u0138': '{\\fontencoding{LELA}\\selectfont\\char91}',
      '\u0139': '\\\'L',
      '\u013A': '\\\'l',
      '\u013B': '{\\c L}',
      '\u013C': '{\\c l}',
      '\u013D': '{\\v L}',
      '\u013E': '{\\v l}',
      '\u013F': '{\\fontencoding{LELA}\\selectfont\\char201}',
      '\u0140': '{\\fontencoding{LELA}\\selectfont\\char202}',
      '\u0141': '\\L{}',
      '\u0142': '\\l{}',
      '\u0143': '\\\'N',
      '\u0144': '\\\'n',
      '\u0145': '{\\c N}',
      '\u0146': '{\\c n}',
      '\u0147': '{\\v N}',
      '\u0148': '{\\v n}',
      '\u0149': '\'n',
      '\u014A': '\\NG{}',
      '\u014B': '\\ng{}',
      '\u014C': '\\=O',
      '\u014D': '\\=o',
      '\u014E': '{\\u O}',
      '\u014F': '{\\u o}',
      '\u0150': '{\\H O}',
      '\u0151': '{\\H o}',
      '\u0152': '\\OE{}',
      '\u0153': '\\oe{}',
      '\u0154': '\\\'R',
      '\u0155': '\\\'r',
      '\u0156': '{\\c R}',
      '\u0157': '{\\c r}',
      '\u0158': '{\\v R}',
      '\u0159': '{\\v r}',
      '\u015A': '\\\'S',
      '\u015B': '\\\'s',
      '\u015C': '\\^S',
      '\u015D': '\\^s',
      '\u015E': '{\\c S}',
      '\u015F': '{\\c s}',
      '\u0160': '{\\v S}',
      '\u0161': '{\\v s}',
      '\u0162': '{\\c T}',
      '\u0163': '{\\c t}',
      '\u0164': '{\\v T}',
      '\u0165': '{\\v t}',
      '\u0166': '{\\fontencoding{LELA}\\selectfont\\char47}',
      '\u0167': '{\\fontencoding{LELA}\\selectfont\\char63}',
      '\u0168': '\\~U',
      '\u0169': '\\~u',
      '\u016A': '\\=U',
      '\u016B': '\\=u',
      '\u016C': '{\\u U}',
      '\u016D': '{\\u u}',
      '\u016E': '\\r{U}',
      '\u016F': '\\r{u}',
      '\u0170': '{\\H U}',
      '\u0171': '{\\H u}',
      '\u0172': '\\k{U}',
      '\u0173': '\\k{u}',
      '\u0174': '\\^W',
      '\u0175': '\\^w',
      '\u0176': '\\^Y',
      '\u0177': '\\^y',
      '\u0178': '\\"Y',
      '\u0179': '\\\'Z',
      '\u017A': '\\\'z',
      '\u017B': '\\.{Z}',
      '\u017C': '\\.{z}',
      '\u017D': '{\\v Z}',
      '\u017E': '{\\v z}',
      '\u0195': '\\texthvlig{}',
      '\u019E': '\\textnrleg{}',
      '\u01BA': '{\\fontencoding{LELA}\\selectfont\\char195}',
      '\u01C2': '\\textdoublepipe{}',
      '\u01F5': '\\\'g',
      '\u0258': '{\\fontencoding{LEIP}\\selectfont\\char61}',
      '\u0261': 'g',
      '\u0272': '\\Elzltln{}',
      '\u0278': '\\textphi{}',
      '\u027F': '{\\fontencoding{LEIP}\\selectfont\\char202}',
      '\u029E': '\\textturnk{}',
      '\u02BC': '\'',
      '\u02C7': '\\textasciicaron{}',
      '\u02D8': '\\textasciibreve{}',
      '\u02D9': '\\textperiodcentered{}',
      '\u02DA': '\\r{}',
      '\u02DB': '\\k{}',
      '\u02DC': '\\texttildelow{}',
      '\u02DD': '\\H{}',
      '\u02E5': '\\tone{55}',
      '\u02E6': '\\tone{44}',
      '\u02E7': '\\tone{33}',
      '\u02E8': '\\tone{22}',
      '\u02E9': '\\tone{11}',
      '\u0300': '\\`',
      '\u0301': '\\\'',
      '\u0302': '\\^',
      '\u0303': '\\~',
      '\u0304': '\\=',
      '\u0306': '\\u{}',
      '\u0307': '\\.',
      '\u0308': '\\"',
      '\u030A': '\\r{}',
      '\u030B': '\\H{}',
      '\u030C': '\\v{}',
      '\u030F': '\\cyrchar\\C{}',
      '\u0311': '{\\fontencoding{LECO}\\selectfont\\char177}',
      '\u0318': '{\\fontencoding{LECO}\\selectfont\\char184}',
      '\u0319': '{\\fontencoding{LECO}\\selectfont\\char185}',
      '\u0322': '\\Elzrh{}',
      '\u0327': '\\c{}',
      '\u0328': '\\k{}',
      '\u032B': '{\\fontencoding{LECO}\\selectfont\\char203}',
      '\u032F': '{\\fontencoding{LECO}\\selectfont\\char207}',
      '\u0335': '\\Elzxl{}',
      '\u0336': '\\Elzbar{}',
      '\u0337': '{\\fontencoding{LECO}\\selectfont\\char215}',
      '\u0338': '{\\fontencoding{LECO}\\selectfont\\char216}',
      '\u033A': '{\\fontencoding{LECO}\\selectfont\\char218}',
      '\u033B': '{\\fontencoding{LECO}\\selectfont\\char219}',
      '\u033C': '{\\fontencoding{LECO}\\selectfont\\char220}',
      '\u033D': '{\\fontencoding{LECO}\\selectfont\\char221}',
      '\u0361': '{\\fontencoding{LECO}\\selectfont\\char225}',
      '\u0386': '\\\'A',
      '\u0388': '\\\'E',
      '\u0389': '\\\'H',
      '\u038A': '\\\'{}{I}',
      '\u038C': '{\\\'{}O}',
      '\u03AC': '{\\\'$\\alpha$}',
      '\u03B8': '\\texttheta{}',
      '\u03CC': '\\\'o',
      '\u03D0': '\\Pisymbol{ppi022}{87}',
      '\u03D1': '\\textvartheta{}',
      '\u03F4': '\\textTheta{}',
      '\u0401': '\\cyrchar\\CYRYO{}',
      '\u0402': '\\cyrchar\\CYRDJE{}',
      '\u0403': '\\cyrchar{\\\'\\CYRG}',
      '\u0404': '\\cyrchar\\CYRIE{}',
      '\u0405': '\\cyrchar\\CYRDZE{}',
      '\u0406': '\\cyrchar\\CYRII{}',
      '\u0407': '\\cyrchar\\CYRYI{}',
      '\u0408': '\\cyrchar\\CYRJE{}',
      '\u0409': '\\cyrchar\\CYRLJE{}',
      '\u040A': '\\cyrchar\\CYRNJE{}',
      '\u040B': '\\cyrchar\\CYRTSHE{}',
      '\u040C': '\\cyrchar{\\\'\\CYRK}',
      '\u040E': '\\cyrchar\\CYRUSHRT{}',
      '\u040F': '\\cyrchar\\CYRDZHE{}',
      '\u0410': '\\cyrchar\\CYRA{}',
      '\u0411': '\\cyrchar\\CYRB{}',
      '\u0412': '\\cyrchar\\CYRV{}',
      '\u0413': '\\cyrchar\\CYRG{}',
      '\u0414': '\\cyrchar\\CYRD{}',
      '\u0415': '\\cyrchar\\CYRE{}',
      '\u0416': '\\cyrchar\\CYRZH{}',
      '\u0417': '\\cyrchar\\CYRZ{}',
      '\u0418': '\\cyrchar\\CYRI{}',
      '\u0419': '\\cyrchar\\CYRISHRT{}',
      '\u041A': '\\cyrchar\\CYRK{}',
      '\u041B': '\\cyrchar\\CYRL{}',
      '\u041C': '\\cyrchar\\CYRM{}',
      '\u041D': '\\cyrchar\\CYRN{}',
      '\u041E': '\\cyrchar\\CYRO{}',
      '\u041F': '\\cyrchar\\CYRP{}',
      '\u0420': '\\cyrchar\\CYRR{}',
      '\u0421': '\\cyrchar\\CYRS{}',
      '\u0422': '\\cyrchar\\CYRT{}',
      '\u0423': '\\cyrchar\\CYRU{}',
      '\u0424': '\\cyrchar\\CYRF{}',
      '\u0425': '\\cyrchar\\CYRH{}',
      '\u0426': '\\cyrchar\\CYRC{}',
      '\u0427': '\\cyrchar\\CYRCH{}',
      '\u0428': '\\cyrchar\\CYRSH{}',
      '\u0429': '\\cyrchar\\CYRSHCH{}',
      '\u042A': '\\cyrchar\\CYRHRDSN{}',
      '\u042B': '\\cyrchar\\CYRERY{}',
      '\u042C': '\\cyrchar\\CYRSFTSN{}',
      '\u042D': '\\cyrchar\\CYREREV{}',
      '\u042E': '\\cyrchar\\CYRYU{}',
      '\u042F': '\\cyrchar\\CYRYA{}',
      '\u0430': '\\cyrchar\\cyra{}',
      '\u0431': '\\cyrchar\\cyrb{}',
      '\u0432': '\\cyrchar\\cyrv{}',
      '\u0433': '\\cyrchar\\cyrg{}',
      '\u0434': '\\cyrchar\\cyrd{}',
      '\u0435': '\\cyrchar\\cyre{}',
      '\u0436': '\\cyrchar\\cyrzh{}',
      '\u0437': '\\cyrchar\\cyrz{}',
      '\u0438': '\\cyrchar\\cyri{}',
      '\u0439': '\\cyrchar\\cyrishrt{}',
      '\u043A': '\\cyrchar\\cyrk{}',
      '\u043B': '\\cyrchar\\cyrl{}',
      '\u043C': '\\cyrchar\\cyrm{}',
      '\u043D': '\\cyrchar\\cyrn{}',
      '\u043E': '\\cyrchar\\cyro{}',
      '\u043F': '\\cyrchar\\cyrp{}',
      '\u0440': '\\cyrchar\\cyrr{}',
      '\u0441': '\\cyrchar\\cyrs{}',
      '\u0442': '\\cyrchar\\cyrt{}',
      '\u0443': '\\cyrchar\\cyru{}',
      '\u0444': '\\cyrchar\\cyrf{}',
      '\u0445': '\\cyrchar\\cyrh{}',
      '\u0446': '\\cyrchar\\cyrc{}',
      '\u0447': '\\cyrchar\\cyrch{}',
      '\u0448': '\\cyrchar\\cyrsh{}',
      '\u0449': '\\cyrchar\\cyrshch{}',
      '\u044A': '\\cyrchar\\cyrhrdsn{}',
      '\u044B': '\\cyrchar\\cyrery{}',
      '\u044C': '\\cyrchar\\cyrsftsn{}',
      '\u044D': '\\cyrchar\\cyrerev{}',
      '\u044E': '\\cyrchar\\cyryu{}',
      '\u044F': '\\cyrchar\\cyrya{}',
      '\u0451': '\\cyrchar\\cyryo{}',
      '\u0452': '\\cyrchar\\cyrdje{}',
      '\u0453': '\\cyrchar{\\\'\\cyrg}',
      '\u0454': '\\cyrchar\\cyrie{}',
      '\u0455': '\\cyrchar\\cyrdze{}',
      '\u0456': '\\cyrchar\\cyrii{}',
      '\u0457': '\\cyrchar\\cyryi{}',
      '\u0458': '\\cyrchar\\cyrje{}',
      '\u0459': '\\cyrchar\\cyrlje{}',
      '\u045A': '\\cyrchar\\cyrnje{}',
      '\u045B': '\\cyrchar\\cyrtshe{}',
      '\u045C': '\\cyrchar{\\\'\\cyrk}',
      '\u045E': '\\cyrchar\\cyrushrt{}',
      '\u045F': '\\cyrchar\\cyrdzhe{}',
      '\u0460': '\\cyrchar\\CYROMEGA{}',
      '\u0461': '\\cyrchar\\cyromega{}',
      '\u0462': '\\cyrchar\\CYRYAT{}',
      '\u0464': '\\cyrchar\\CYRIOTE{}',
      '\u0465': '\\cyrchar\\cyriote{}',
      '\u0466': '\\cyrchar\\CYRLYUS{}',
      '\u0467': '\\cyrchar\\cyrlyus{}',
      '\u0468': '\\cyrchar\\CYRIOTLYUS{}',
      '\u0469': '\\cyrchar\\cyriotlyus{}',
      '\u046A': '\\cyrchar\\CYRBYUS{}',
      '\u046C': '\\cyrchar\\CYRIOTBYUS{}',
      '\u046D': '\\cyrchar\\cyriotbyus{}',
      '\u046E': '\\cyrchar\\CYRKSI{}',
      '\u046F': '\\cyrchar\\cyrksi{}',
      '\u0470': '\\cyrchar\\CYRPSI{}',
      '\u0471': '\\cyrchar\\cyrpsi{}',
      '\u0472': '\\cyrchar\\CYRFITA{}',
      '\u0474': '\\cyrchar\\CYRIZH{}',
      '\u0478': '\\cyrchar\\CYRUK{}',
      '\u0479': '\\cyrchar\\cyruk{}',
      '\u047A': '\\cyrchar\\CYROMEGARND{}',
      '\u047B': '\\cyrchar\\cyromegarnd{}',
      '\u047C': '\\cyrchar\\CYROMEGATITLO{}',
      '\u047D': '\\cyrchar\\cyromegatitlo{}',
      '\u047E': '\\cyrchar\\CYROT{}',
      '\u047F': '\\cyrchar\\cyrot{}',
      '\u0480': '\\cyrchar\\CYRKOPPA{}',
      '\u0481': '\\cyrchar\\cyrkoppa{}',
      '\u0482': '\\cyrchar\\cyrthousands{}',
      '\u0488': '\\cyrchar\\cyrhundredthousands{}',
      '\u0489': '\\cyrchar\\cyrmillions{}',
      '\u048C': '\\cyrchar\\CYRSEMISFTSN{}',
      '\u048D': '\\cyrchar\\cyrsemisftsn{}',
      '\u048E': '\\cyrchar\\CYRRTICK{}',
      '\u048F': '\\cyrchar\\cyrrtick{}',
      '\u0490': '\\cyrchar\\CYRGUP{}',
      '\u0491': '\\cyrchar\\cyrgup{}',
      '\u0492': '\\cyrchar\\CYRGHCRS{}',
      '\u0493': '\\cyrchar\\cyrghcrs{}',
      '\u0494': '\\cyrchar\\CYRGHK{}',
      '\u0495': '\\cyrchar\\cyrghk{}',
      '\u0496': '\\cyrchar\\CYRZHDSC{}',
      '\u0497': '\\cyrchar\\cyrzhdsc{}',
      '\u0498': '\\cyrchar\\CYRZDSC{}',
      '\u0499': '\\cyrchar\\cyrzdsc{}',
      '\u049A': '\\cyrchar\\CYRKDSC{}',
      '\u049B': '\\cyrchar\\cyrkdsc{}',
      '\u049C': '\\cyrchar\\CYRKVCRS{}',
      '\u049D': '\\cyrchar\\cyrkvcrs{}',
      '\u049E': '\\cyrchar\\CYRKHCRS{}',
      '\u049F': '\\cyrchar\\cyrkhcrs{}',
      '\u04A0': '\\cyrchar\\CYRKBEAK{}',
      '\u04A1': '\\cyrchar\\cyrkbeak{}',
      '\u04A2': '\\cyrchar\\CYRNDSC{}',
      '\u04A3': '\\cyrchar\\cyrndsc{}',
      '\u04A4': '\\cyrchar\\CYRNG{}',
      '\u04A5': '\\cyrchar\\cyrng{}',
      '\u04A6': '\\cyrchar\\CYRPHK{}',
      '\u04A7': '\\cyrchar\\cyrphk{}',
      '\u04A8': '\\cyrchar\\CYRABHHA{}',
      '\u04A9': '\\cyrchar\\cyrabhha{}',
      '\u04AA': '\\cyrchar\\CYRSDSC{}',
      '\u04AB': '\\cyrchar\\cyrsdsc{}',
      '\u04AC': '\\cyrchar\\CYRTDSC{}',
      '\u04AD': '\\cyrchar\\cyrtdsc{}',
      '\u04AE': '\\cyrchar\\CYRY{}',
      '\u04AF': '\\cyrchar\\cyry{}',
      '\u04B0': '\\cyrchar\\CYRYHCRS{}',
      '\u04B1': '\\cyrchar\\cyryhcrs{}',
      '\u04B2': '\\cyrchar\\CYRHDSC{}',
      '\u04B3': '\\cyrchar\\cyrhdsc{}',
      '\u04B4': '\\cyrchar\\CYRTETSE{}',
      '\u04B5': '\\cyrchar\\cyrtetse{}',
      '\u04B6': '\\cyrchar\\CYRCHRDSC{}',
      '\u04B7': '\\cyrchar\\cyrchrdsc{}',
      '\u04B8': '\\cyrchar\\CYRCHVCRS{}',
      '\u04B9': '\\cyrchar\\cyrchvcrs{}',
      '\u04BA': '\\cyrchar\\CYRSHHA{}',
      '\u04BB': '\\cyrchar\\cyrshha{}',
      '\u04BC': '\\cyrchar\\CYRABHCH{}',
      '\u04BD': '\\cyrchar\\cyrabhch{}',
      '\u04BE': '\\cyrchar\\CYRABHCHDSC{}',
      '\u04BF': '\\cyrchar\\cyrabhchdsc{}',
      '\u04C0': '\\cyrchar\\CYRpalochka{}',
      '\u04C3': '\\cyrchar\\CYRKHK{}',
      '\u04C4': '\\cyrchar\\cyrkhk{}',
      '\u04C7': '\\cyrchar\\CYRNHK{}',
      '\u04C8': '\\cyrchar\\cyrnhk{}',
      '\u04CB': '\\cyrchar\\CYRCHLDSC{}',
      '\u04CC': '\\cyrchar\\cyrchldsc{}',
      '\u04D4': '\\cyrchar\\CYRAE{}',
      '\u04D5': '\\cyrchar\\cyrae{}',
      '\u04D8': '\\cyrchar\\CYRSCHWA{}',
      '\u04D9': '\\cyrchar\\cyrschwa{}',
      '\u04E0': '\\cyrchar\\CYRABHDZE{}',
      '\u04E1': '\\cyrchar\\cyrabhdze{}',
      '\u04E8': '\\cyrchar\\CYROTLD{}',
      '\u04E9': '\\cyrchar\\cyrotld{}',
      '\u2002': '\\hspace{0.6em}',
      '\u2003': '\\quad{}',
      '\u2004': '\\;',
      '\u2005': '\\hspace{0.25em}',
      '\u2006': '\\hspace{0.166em}',
      '\u2007': '\\hphantom{0}',
      '\u2008': '\\hphantom{,}',
      '\u2009': '\\,',
      '\u200B': '\\mbox{}',
      '\u200C': '{\\aftergroup\\ignorespaces}',
      '\u2010': '-',
      '\u2013': '\\textendash{}',
      '\u2014': '\\textemdash{}',
      '\u2015': '\\rule{1em}{1pt}',
      '\u2018': '`',
      '\u2019': '\'',
      '\u201A': ',',
      '\u201C': '``',
      '\u201D': '\'\'',
      '\u201E': ',,',
      '\u2020': '\\textdagger{}',
      '\u2021': '\\textdaggerdbl{}',
      '\u2022': '\\textbullet{}',
      '\u2024': '.',
      '\u2025': '..',
      '\u2026': '\\ldots{}',
      '\u2030': '\\textperthousand{}',
      '\u2031': '\\textpertenthousand{}',
      '\u2039': '\\guilsinglleft{}',
      '\u203A': '\\guilsinglright{}',
      '\u205F': '\\:',
      '\u2060': '\\nolinebreak{}',
      '\u20A7': '\\ensuremath{\\Elzpes}',
      '\u20AC': '\\texteuro{}',
      '\u210A': '\\mathscr{g}',
      '\u2116': '\\cyrchar\\textnumero{}',
      '\u2122': '\\texttrademark{}',
      '\u212B': '\\AA{}',
      '\u2212': '-',
      '\u2254': ':=',
      '\u2305': '\\barwedge{}',
      '\u2423': '\\textvisiblespace{}',
      '\u2460': '\\ding{172}',
      '\u2461': '\\ding{173}',
      '\u2462': '\\ding{174}',
      '\u2463': '\\ding{175}',
      '\u2464': '\\ding{176}',
      '\u2465': '\\ding{177}',
      '\u2466': '\\ding{178}',
      '\u2467': '\\ding{179}',
      '\u2468': '\\ding{180}',
      '\u2469': '\\ding{181}',
      '\u25A0': '\\ding{110}',
      '\u25B2': '\\ding{115}',
      '\u25BC': '\\ding{116}',
      '\u25C6': '\\ding{117}',
      '\u25CF': '\\ding{108}',
      '\u25D7': '\\ding{119}',
      '\u2605': '\\ding{72}',
      '\u2606': '\\ding{73}',
      '\u260E': '\\ding{37}',
      '\u261B': '\\ding{42}',
      '\u261E': '\\ding{43}',
      '\u263E': '\\rightmoon{}',
      '\u263F': '\\mercury{}',
      '\u2640': '\\venus{}',
      '\u2642': '\\male{}',
      '\u2643': '\\jupiter{}',
      '\u2644': '\\saturn{}',
      '\u2645': '\\uranus{}',
      '\u2646': '\\neptune{}',
      '\u2647': '\\pluto{}',
      '\u2648': '\\aries{}',
      '\u2649': '\\taurus{}',
      '\u264A': '\\gemini{}',
      '\u264B': '\\cancer{}',
      '\u264C': '\\leo{}',
      '\u264D': '\\virgo{}',
      '\u264E': '\\libra{}',
      '\u264F': '\\scorpio{}',
      '\u2650': '\\sagittarius{}',
      '\u2651': '\\capricornus{}',
      '\u2652': '\\aquarius{}',
      '\u2653': '\\pisces{}',
      '\u2660': '\\ding{171}',
      '\u2663': '\\ding{168}',
      '\u2665': '\\ding{170}',
      '\u2666': '\\ding{169}',
      '\u2669': '\\quarternote{}',
      '\u266A': '\\eighthnote{}',
      '\u2701': '\\ding{33}',
      '\u2702': '\\ding{34}',
      '\u2703': '\\ding{35}',
      '\u2704': '\\ding{36}',
      '\u2706': '\\ding{38}',
      '\u2707': '\\ding{39}',
      '\u2708': '\\ding{40}',
      '\u2709': '\\ding{41}',
      '\u270C': '\\ding{44}',
      '\u270D': '\\ding{45}',
      '\u270E': '\\ding{46}',
      '\u270F': '\\ding{47}',
      '\u2710': '\\ding{48}',
      '\u2711': '\\ding{49}',
      '\u2712': '\\ding{50}',
      '\u2713': '\\ding{51}',
      '\u2714': '\\ding{52}',
      '\u2715': '\\ding{53}',
      '\u2716': '\\ding{54}',
      '\u2717': '\\ding{55}',
      '\u2718': '\\ding{56}',
      '\u2719': '\\ding{57}',
      '\u271A': '\\ding{58}',
      '\u271B': '\\ding{59}',
      '\u271C': '\\ding{60}',
      '\u271D': '\\ding{61}',
      '\u271E': '\\ding{62}',
      '\u271F': '\\ding{63}',
      '\u2720': '\\ding{64}',
      '\u2721': '\\ding{65}',
      '\u2722': '\\ding{66}',
      '\u2723': '\\ding{67}',
      '\u2724': '\\ding{68}',
      '\u2725': '\\ding{69}',
      '\u2726': '\\ding{70}',
      '\u2727': '\\ding{71}',
      '\u2729': '\\ding{73}',
      '\u272A': '\\ding{74}',
      '\u272B': '\\ding{75}',
      '\u272C': '\\ding{76}',
      '\u272D': '\\ding{77}',
      '\u272E': '\\ding{78}',
      '\u272F': '\\ding{79}',
      '\u2730': '\\ding{80}',
      '\u2731': '\\ding{81}',
      '\u2732': '\\ding{82}',
      '\u2733': '\\ding{83}',
      '\u2734': '\\ding{84}',
      '\u2735': '\\ding{85}',
      '\u2736': '\\ding{86}',
      '\u2737': '\\ding{87}',
      '\u2738': '\\ding{88}',
      '\u2739': '\\ding{89}',
      '\u273A': '\\ding{90}',
      '\u273B': '\\ding{91}',
      '\u273C': '\\ding{92}',
      '\u273D': '\\ding{93}',
      '\u273E': '\\ding{94}',
      '\u273F': '\\ding{95}',
      '\u2740': '\\ding{96}',
      '\u2741': '\\ding{97}',
      '\u2742': '\\ding{98}',
      '\u2743': '\\ding{99}',
      '\u2744': '\\ding{100}',
      '\u2745': '\\ding{101}',
      '\u2746': '\\ding{102}',
      '\u2747': '\\ding{103}',
      '\u2748': '\\ding{104}',
      '\u2749': '\\ding{105}',
      '\u274A': '\\ding{106}',
      '\u274B': '\\ding{107}',
      '\u274D': '\\ding{109}',
      '\u274F': '\\ding{111}',
      '\u2750': '\\ding{112}',
      '\u2751': '\\ding{113}',
      '\u2752': '\\ding{114}',
      '\u2756': '\\ding{118}',
      '\u2758': '\\ding{120}',
      '\u2759': '\\ding{121}',
      '\u275A': '\\ding{122}',
      '\u275B': '\\ding{123}',
      '\u275C': '\\ding{124}',
      '\u275D': '\\ding{125}',
      '\u275E': '\\ding{126}',
      '\u2761': '\\ding{161}',
      '\u2762': '\\ding{162}',
      '\u2763': '\\ding{163}',
      '\u2764': '\\ding{164}',
      '\u2765': '\\ding{165}',
      '\u2766': '\\ding{166}',
      '\u2767': '\\ding{167}',
      '\u2776': '\\ding{182}',
      '\u2777': '\\ding{183}',
      '\u2778': '\\ding{184}',
      '\u2779': '\\ding{185}',
      '\u277A': '\\ding{186}',
      '\u277B': '\\ding{187}',
      '\u277C': '\\ding{188}',
      '\u277D': '\\ding{189}',
      '\u277E': '\\ding{190}',
      '\u277F': '\\ding{191}',
      '\u2780': '\\ding{192}',
      '\u2781': '\\ding{193}',
      '\u2782': '\\ding{194}',
      '\u2783': '\\ding{195}',
      '\u2784': '\\ding{196}',
      '\u2785': '\\ding{197}',
      '\u2786': '\\ding{198}',
      '\u2787': '\\ding{199}',
      '\u2788': '\\ding{200}',
      '\u2789': '\\ding{201}',
      '\u278A': '\\ding{202}',
      '\u278B': '\\ding{203}',
      '\u278C': '\\ding{204}',
      '\u278D': '\\ding{205}',
      '\u278E': '\\ding{206}',
      '\u278F': '\\ding{207}',
      '\u2790': '\\ding{208}',
      '\u2791': '\\ding{209}',
      '\u2792': '\\ding{210}',
      '\u2793': '\\ding{211}',
      '\u2794': '\\ding{212}',
      '\u2798': '\\ding{216}',
      '\u2799': '\\ding{217}',
      '\u279A': '\\ding{218}',
      '\u279B': '\\ding{219}',
      '\u279C': '\\ding{220}',
      '\u279D': '\\ding{221}',
      '\u279E': '\\ding{222}',
      '\u279F': '\\ding{223}',
      '\u27A0': '\\ding{224}',
      '\u27A1': '\\ding{225}',
      '\u27A2': '\\ding{226}',
      '\u27A3': '\\ding{227}',
      '\u27A4': '\\ding{228}',
      '\u27A5': '\\ding{229}',
      '\u27A6': '\\ding{230}',
      '\u27A7': '\\ding{231}',
      '\u27A8': '\\ding{232}',
      '\u27A9': '\\ding{233}',
      '\u27AA': '\\ding{234}',
      '\u27AB': '\\ding{235}',
      '\u27AC': '\\ding{236}',
      '\u27AD': '\\ding{237}',
      '\u27AE': '\\ding{238}',
      '\u27AF': '\\ding{239}',
      '\u27B1': '\\ding{241}',
      '\u27B2': '\\ding{242}',
      '\u27B3': '\\ding{243}',
      '\u27B4': '\\ding{244}',
      '\u27B5': '\\ding{245}',
      '\u27B6': '\\ding{246}',
      '\u27B7': '\\ding{247}',
      '\u27B8': '\\ding{248}',
      '\u27B9': '\\ding{249}',
      '\u27BA': '\\ding{250}',
      '\u27BB': '\\ding{251}',
      '\u27BC': '\\ding{252}',
      '\u27BD': '\\ding{253}',
      '\u27BE': '\\ding{254}',
      '\u27E8': '\\langle{}',
      '\u27E9': '\\rangle{}',
      '\uFB00': 'ff',
      '\uFB01': 'fi',
      '\uFB02': 'fl',
      '\uFB03': 'ffi',
      '\uFB04': 'ffl',
      '\uFFFD': '\\dbend{}',
      '\uD835\uDEB9': '\\mathbf{\\vartheta}',
      '\uD835\uDEDD': '\\mathbf{\\vartheta}',
      '\uD835\uDEDE': '\\mathbf{\\varkappa}',
      '\uD835\uDEDF': '\\mathbf{\\phi}',
      '\uD835\uDEE0': '\\mathbf{\\varrho}',
      '\uD835\uDEE1': '\\mathbf{\\varpi}',
      '\uD835\uDEF3': '\\mathsl{\\vartheta}',
      '\uD835\uDF17': '\\mathsl{\\vartheta}',
      '\uD835\uDF18': '\\mathsl{\\varkappa}',
      '\uD835\uDF19': '\\mathsl{\\phi}',
      '\uD835\uDF1A': '\\mathsl{\\varrho}',
      '\uD835\uDF1B': '\\mathsl{\\varpi}',
      '\uD835\uDF2D': '\\mathbit{O}',
      '\uD835\uDF51': '\\mathbit{\\vartheta}',
      '\uD835\uDF52': '\\mathbit{\\varkappa}',
      '\uD835\uDF53': '\\mathbit{\\phi}',
      '\uD835\uDF54': '\\mathbit{\\varrho}',
      '\uD835\uDF55': '\\mathbit{\\varpi}',
      '\uD835\uDF67': '\\mathsfbf{\\vartheta}',
      '\uD835\uDF8B': '\\mathsfbf{\\vartheta}',
      '\uD835\uDF8C': '\\mathsfbf{\\varkappa}',
      '\uD835\uDF8D': '\\mathsfbf{\\phi}',
      '\uD835\uDF8E': '\\mathsfbf{\\varrho}',
      '\uD835\uDF8F': '\\mathsfbf{\\varpi}',
      '\uD835\uDFA1': '\\mathsfbfsl{\\vartheta}',
      '\uD835\uDFC5': '\\mathsfbfsl{\\vartheta}',
      '\uD835\uDFC6': '\\mathsfbfsl{\\varkappa}',
      '\uD835\uDFC7': '\\mathsfbfsl{\\phi}',
      '\uD835\uDFC8': '\\mathsfbfsl{\\varrho}',
      '\uD835\uDFC9': '\\mathsfbfsl{\\varpi}',
      '\u017F': 's',
      '\u02B9': '\'',
      '\u02BB': '\'',
      '\u02BD': '\'',
      '\u02C6': '\\textasciicircum{}',
      '\u02C9': '-',
      '\u0374': '\'',
      '\u0375': ',',
      '\u037E': ';',
      '\u2000': ' ',
      '\u2011': '-',
      '\u2012': '-',
      '`': '\u2018',
      '\u201F': '\\quotedblbase{}',
      '\u2023': '>',
      '\u2027': '-',
      '\u202F': ' ',
      '\u203E': '-',
      '\u2048': '?!',
      '\u2049': '!?',
      '\u204A': '7',
      '\u2100': 'a/c',
      '\u2101': 'a/s',
      '\u2103': '\\textcelsius{}',
      '\u2105': 'c/o',
      '\u2106': 'c/u',
      '\u2109': 'F',
      '\u2117': '\\textcircledP{}',
      '\u2120': '\\textservicemark{}',
      '\u2121': 'TEL',
      '\u212A': 'K',
      '\u212E': '\\textestimated{}',
      '\u215F': ' 1/',
      '\u2160': 'I',
      '\u2161': 'II',
      '\u2162': 'III',
      '\u2163': 'IV',
      '\u2164': 'V',
      '\u2165': 'VI',
      '\u2166': 'VII',
      '\u2167': 'VIII',
      '\u2168': 'IX',
      '\u2169': 'X',
      '\u216A': 'XI',
      '\u216B': 'XII',
      '\u216C': 'L',
      '\u216D': 'C',
      '\u216E': 'D',
      '\u216F': 'M',
      '\u2170': 'i',
      '\u2171': 'ii',
      '\u2172': 'iii',
      '\u2173': 'iv',
      '\u2174': 'v',
      '\u2175': 'vi',
      '\u2176': 'vii',
      '\u2177': 'viii',
      '\u2178': 'ix',
      '\u2179': 'x',
      '\u217A': 'xi',
      '\u217B': 'xii',
      '\u217C': 'l',
      '\u217D': 'c',
      '\u217E': 'd',
      '\u217F': 'm',
      '\u2400': 'NUL',
      '\u2401': 'SOH',
      '\u2402': 'STX',
      '\u2403': 'ETX',
      '\u2404': 'EOT',
      '\u2405': 'ENQ',
      '\u2406': 'ACK',
      '\u2407': 'BEL',
      '\u2408': 'BS',
      '\u2409': 'HT',
      '\u240A': 'LF',
      '\u240B': 'VT',
      '\u240C': 'FF',
      '\u240D': 'CR',
      '\u240E': 'SO',
      '\u240F': 'SI',
      '\u2410': 'DLE',
      '\u2411': 'DC1',
      '\u2412': 'DC2',
      '\u2413': 'DC3',
      '\u2414': 'DC4',
      '\u2415': 'NAK',
      '\u2416': 'SYN',
      '\u2417': 'ETB',
      '\u2418': 'CAN',
      '\u2419': 'EM',
      '\u241A': 'SUB',
      '\u241B': 'ESC',
      '\u241C': 'FS',
      '\u241D': 'GS',
      '\u241E': 'RS',
      '\u241F': 'US',
      '\u2420': 'SP',
      '\u2421': 'DEL',
      '\u2424': 'NL',
      '\u2425': '///',
      '\u2426': '?',
      '\u246A': '(11)',
      '\u246B': '(12)',
      '\u246C': '(13)',
      '\u246D': '(14)',
      '\u246E': '(15)',
      '\u246F': '(16)',
      '\u2470': '(17)',
      '\u2471': '(18)',
      '\u2472': '(19)',
      '\u2473': '(20)',
      '\u2474': '(1)',
      '\u2475': '(2)',
      '\u2476': '(3)',
      '\u2477': '(4)',
      '\u2478': '(5)',
      '\u2479': '(6)',
      '\u247A': '(7)',
      '\u247B': '(8)',
      '\u247C': '(9)',
      '\u247D': '(10)',
      '\u247E': '(11)',
      '\u247F': '(12)',
      '\u2480': '(13)',
      '\u2481': '(14)',
      '\u2482': '(15)',
      '\u2483': '(16)',
      '\u2484': '(17)',
      '\u2485': '(18)',
      '\u2486': '(19)',
      '\u2487': '(20)',
      '\u2488': '1.',
      '\u2489': '2.',
      '\u248A': '3.',
      '\u248B': '4.',
      '\u248C': '5.',
      '\u248D': '6.',
      '\u248E': '7.',
      '\u248F': '8.',
      '\u2490': '9.',
      '\u2491': '10.',
      '\u2492': '11.',
      '\u2493': '12.',
      '\u2494': '13.',
      '\u2495': '14.',
      '\u2496': '15.',
      '\u2497': '16.',
      '\u2498': '17.',
      '\u2499': '18.',
      '\u249A': '19.',
      '\u249B': '20.',
      '\u249C': '(a)',
      '\u249D': '(b)',
      '\u249E': '(c)',
      '\u249F': '(d)',
      '\u24A0': '(e)',
      '\u24A1': '(f)',
      '\u24A2': '(g)',
      '\u24A3': '(h)',
      '\u24A4': '(i)',
      '\u24A5': '(j)',
      '\u24A6': '(k)',
      '\u24A7': '(l)',
      '\u24A8': '(m)',
      '\u24A9': '(n)',
      '\u24AA': '(o)',
      '\u24AB': '(p)',
      '\u24AC': '(q)',
      '\u24AD': '(r)',
      '\u24AE': '(s)',
      '\u24AF': '(t)',
      '\u24B0': '(u)',
      '\u24B1': '(v)',
      '\u24B2': '(w)',
      '\u24B3': '(x)',
      '\u24B4': '(y)',
      '\u24B5': '(z)',
      '\u24B6': '(A)',
      '\u24B7': '(B)',
      '\u24B8': '(C)',
      '\u24B9': '(D)',
      '\u24BA': '(E)',
      '\u24BB': '(F)',
      '\u24BC': '(G)',
      '\u24BD': '(H)',
      '\u24BE': '(I)',
      '\u24BF': '(J)',
      '\u24C0': '(K)',
      '\u24C1': '(L)',
      '\u24C2': '(M)',
      '\u24C3': '(N)',
      '\u24C4': '(O)',
      '\u24C5': '(P)',
      '\u24C6': '(Q)',
      '\u24C7': '(R)',
      '\u24C9': '(T)',
      '\u24CA': '(U)',
      '\u24CB': '(V)',
      '\u24CC': '(W)',
      '\u24CD': '(X)',
      '\u24CE': '(Y)',
      '\u24CF': '(Z)',
      '\u24D0': '(a)',
      '\u24D1': '(b)',
      '\u24D2': '(c)',
      '\u24D3': '(d)',
      '\u24D4': '(e)',
      '\u24D5': '(f)',
      '\u24D6': '(g)',
      '\u24D7': '(h)',
      '\u24D8': '(i)',
      '\u24D9': '(j)',
      '\u24DA': '(k)',
      '\u24DB': '(l)',
      '\u24DC': '(m)',
      '\u24DD': '(n)',
      '\u24DE': '(o)',
      '\u24DF': '(p)',
      '\u24E0': '(q)',
      '\u24E1': '(r)',
      '\u24E2': '(s)',
      '\u24E3': '(t)',
      '\u24E4': '(u)',
      '\u24E5': '(v)',
      '\u24E6': '(w)',
      '\u24E7': '(x)',
      '\u24E8': '(y)',
      '\u24E9': '(z)',
      '\u24EA': '(0)',
      '\u2500': '-',
      '\u2501': '=',
      '\u2502': '|',
      '\u2503': '|',
      '\u2504': '-',
      '\u2505': '=',
      '\u2507': '|',
      '\u2508': '-',
      '\u2509': '=',
      '\u250A': '|',
      '\u250B': '|',
      '\u250C': '+',
      '\u250D': '+',
      '\u250E': '+',
      '\u250F': '+',
      '\u2510': '+',
      '\u2511': '+',
      '\u2512': '+',
      '\u2513': '+',
      '\u2514': '+',
      '\u2515': '+',
      '\u2516': '+',
      '\u2517': '+',
      '\u2518': '+',
      '\u251A': '+',
      '\u251B': '+',
      '\u251C': '+',
      '\u251D': '+',
      '\u251E': '+',
      '\u251F': '+',
      '\u2520': '+',
      '\u2521': '+',
      '\u2522': '+',
      '\u2523': '+',
      '\u2524': '+',
      '\u2525': '+',
      '\u2526': '+',
      '\u2527': '+',
      '\u2528': '+',
      '\u2529': '+',
      '\u252A': '+',
      '\u252B': '+',
      '\u252C': '+',
      '\u252D': '+',
      '\u252E': '+',
      '\u252F': '+',
      '\u2530': '+',
      '\u2531': '+',
      '\u2532': '+',
      '\u2533': '+',
      '\u2534': '+',
      '\u2535': '+',
      '\u2536': '+',
      '\u2537': '+',
      '\u2538': '+',
      '\u2539': '+',
      '\u253A': '+',
      '\u253B': '+',
      '\u253C': '+',
      '\u253D': '+',
      '\u253E': '+',
      '\u253F': '+',
      '\u2540': '+',
      '\u2541': '+',
      '\u2542': '+',
      '\u2543': '+',
      '\u2544': '+',
      '\u2545': '+',
      '\u2546': '+',
      '\u2547': '+',
      '\u2548': '+',
      '\u2549': '+',
      '\u254A': '+',
      '\u254B': '+',
      '\u254C': '-',
      '\u254D': '=',
      '\u254E': '|',
      '\u254F': '|',
      '\u2550': '=',
      '\u2551': '|',
      '\u2552': '+',
      '\u2553': '+',
      '\u2554': '+',
      '\u2555': '+',
      '\u2556': '+',
      '\u2557': '+',
      '\u2558': '+',
      '\u2559': '+',
      '\u255A': '+',
      '\u255B': '+',
      '\u255C': '+',
      '\u255D': '+',
      '\u255E': '+',
      '\u255F': '+',
      '\u2560': '+',
      '\u2561': '+',
      '\u2562': '+',
      '\u2563': '+',
      '\u2564': '+',
      '\u2565': '+',
      '\u2566': '+',
      '\u2567': '+',
      '\u2568': '+',
      '\u2569': '+',
      '\u256A': '+',
      '\u256B': '+',
      '\u256C': '+',
      '\u256D': '+',
      '\u256E': '+',
      '\u256F': '+',
      '\u2570': '+',
      '\u2572': '\\',
      '\u2573': 'X',
      '\u257C': '-',
      '\u257D': '|',
      '\u257E': '-',
      '\u257F': '|',
      '\u2613': 'X',
      '\uFB05': 'st',
      '\uFB06': 'st',
      '\u01CD': '{\\v A}',
      '\u01CE': '{\\v a}',
      '\u01CF': '{\\v I}',
      '\u01D0': '{\\v i}',
      '\u01D1': '{\\v O}',
      '\u01D2': '{\\v o}',
      '\u01D3': '{\\v U}',
      '\u01D4': '{\\v u}',
      '\u01E6': '{\\v G}',
      '\u01E7': '{\\v g}',
      '\u01E8': '{\\v K}',
      '\u01E9': '{\\v k}',
      '\u01EA': '{\\k O}',
      '\u01EB': '{\\k o}',
      '\u01F0': '{\\v j}',
      '\u01F4': '\\\'G',
      '\u1E02': '\\.{B}',
      '\u1E03': '\\.{b}',
      '\u1E04': '{\\d B}',
      '\u1E05': '{\\d b}',
      '\u1E06': '{\\b B}',
      '\u1E07': '{\\b b}',
      '\u1E0A': '\\.{D}',
      '\u1E0B': '\\.{d}',
      '\u1E0C': '{\\d D}',
      '\u1E0D': '{\\d d}',
      '\u1E0E': '{\\b D}',
      '\u1E0F': '{\\b d}',
      '\u1E10': '{\\c D}',
      '\u1E11': '{\\c d}',
      '\u1E1E': '\\.{F}',
      '\u1E1F': '\\.{f}',
      '\u1E20': '\\=G',
      '\u1E21': '\\=g',
      '\u1E22': '\\.{H}',
      '\u1E23': '\\.{h}',
      '\u1E24': '{\\d H}',
      '\u1E25': '{\\d h}',
      '\u1E26': '\\"H',
      '\u1E27': '\\"h',
      '\u1E28': '{\\c H}',
      '\u1E29': '{\\c h}',
      '\u1E30': '\\\'K',
      '\u1E31': '\\\'k',
      '\u1E32': '{\\d K}',
      '\u1E33': '{\\d k}',
      '\u1E34': '{\\b K}',
      '\u1E35': '{\\b k}',
      '\u1E36': '{\\d L}',
      '\u1E37': '{\\d l}',
      '\u1E3A': '{\\b L}',
      '\u1E3B': '{\\b l}',
      '\u1E3E': '\\\'M',
      '\u1E3F': '\\\'m',
      '\u1E40': '\\.{M}',
      '\u1E41': '\\.{m}',
      '\u1E42': '{\\d M}',
      '\u1E43': '{\\d m}',
      '\u1E44': '\\.{N}',
      '\u1E45': '\\.{n}',
      '\u1E46': '{\\d N}',
      '\u1E47': '{\\d n}',
      '\u1E48': '{\\b N}',
      '\u1E49': '{\\b n}',
      '\u1E54': '\\\'P',
      '\u1E55': '\\\'p',
      '\u1E56': '\\.{P}',
      '\u1E57': '\\.{p}',
      '\u1E58': '\\.{R}',
      '\u1E59': '\\.{r}',
      '\u1E5A': '{\\d R}',
      '\u1E5B': '{\\d r}',
      '\u1E5E': '{\\b R}',
      '\u1E5F': '{\\b r}',
      '\u1E60': '\\.{S}',
      '\u1E61': '\\.{s}',
      '\u1E62': '{\\d S}',
      '\u1E63': '{\\d s}',
      '\u1E6A': '\\.{T}',
      '\u1E6B': '\\.{t}',
      '\u1E6C': '{\\d T}',
      '\u1E6D': '{\\d t}',
      '\u1E6E': '{\\b T}',
      '\u1E6F': '{\\b t}',
      '\u1E7C': '\\~V',
      '\u1E7D': '\\~v',
      '\u1E7E': '{\\d V}',
      '\u1E7F': '{\\d v}',
      '\u1E80': '\\`W',
      '\u1E81': '\\`w',
      '\u1E82': '\\\'W',
      '\u1E83': '\\\'w',
      '\u1E84': '\\"W',
      '\u1E85': '\\"w',
      '\u1E86': '\\.{W}',
      '\u1E87': '\\.{w}',
      '\u1E88': '{\\d W}',
      '\u1E89': '{\\d w}',
      '\u1E8A': '\\.{X}',
      '\u1E8B': '\\.{x}',
      '\u1E8C': '\\"X',
      '\u1E8D': '\\"x',
      '\u1E8E': '\\.{Y}',
      '\u1E8F': '\\.{y}',
      '\u1E90': '\\^Z',
      '\u1E91': '\\^z',
      '\u1E92': '{\\d Z}',
      '\u1E93': '{\\d z}',
      '\u1E94': '{\\b Z}',
      '\u1E95': '{\\b z}',
      '\u1E96': '{\\b h}',
      '\u1E97': '\\"t',
      '\u1E98': '{\\r w}',
      '\u1E99': '{\\r y}',
      '\u1EA0': '{\\d A}',
      '\u1EA1': '{\\d a}',
      '\u1EB8': '{\\d E}',
      '\u1EB9': '{\\d e}',
      '\u1EBC': '\\~E',
      '\u1EBD': '\\~e',
      '\u1ECA': '{\\d I}',
      '\u1ECB': '{\\d i}',
      '\u1ECC': '{\\d O}',
      '\u1ECD': '{\\d o}',
      '\u1EE4': '{\\d U}',
      '\u1EE5': '{\\d u}',
      '\u1EF2': '\\`Y',
      '\u1EF3': '\\`y',
      '\u1EF4': '{\\d Y}',
      '\u1EF5': '{\\d y}',
      '\u1EF8': '\\~Y',
      '\u1EF9': '\\~y'
    }
  },
  'embrace': {
    '\\k{A}': true,
    '\\k{E}': true,
    '\\k{I}': true,
    '\\k{U}': true,
    '\\k{a}': true,
    '\\k{e}': true,
    '\\k{i}': true,
    '\\k{u}': true,
    '\\r{U}': true,
    '\\r{u}': true
  }
};


/***/ }),
/* 10 */
/*!*****************************!*\
  !*** ./bibtex/datefield.ts ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

Zotero.debug('BBT: loading translators/bibtex/datefield.ts'); try { "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __webpack_require__(/*! ../lib/debug */ 0);
function pad(v, padding) {
    if (v.length >= padding.length)
        return v;
    return (padding + v).slice(-padding.length);
}
function year(y) {
    // tslint:disable-next-line:no-magic-numbers
    if (Math.abs(y) > 999) {
        return `${y}`;
    }
    else {
        // tslint:disable-next-line:no-magic-numbers
        return (y < 0 ? '-' : '') + (`000${Math.abs(y)}`).slice(-4);
    }
}
function format(date) {
    let formatted;
    if (typeof date.year === 'number' && date.month && date.day) {
        formatted = `${year(date.year)}-${pad(date.month, '00')}-${pad(date.day, '00')}`;
    }
    else if (typeof date.year === 'number' && (date.month || date.season)) {
        // tslint:disable-next-line:no-magic-numbers
        formatted = `${year(date.year)}-${pad((date.month || (date.season + 20)), '00')}`;
    }
    else if (typeof date.year === 'number') {
        formatted = year(date.year);
    }
    else {
        formatted = '';
    }
    if (formatted && Translator.BetterBibLaTeX && Translator.preferences.biblatexExtendedDateFormat) {
        if (date.uncertain)
            formatted += '?';
        if (date.approximate)
            formatted += '~';
    }
    return formatted;
}
function datefield(date, field) {
    debug_1.debug('formatting date', date, field);
    if (!date)
        return {};
    if (date && !date.type && date.orig)
        return {};
    if (!date.type)
        throw new Error(`Failed to parse ${JSON.stringify(date)}`);
    field = Object.assign({}, field, { enc: 'latex', value: '' });
    if (date.type === 'verbatim') {
        field.name = field.verbatim;
        if (date.verbatim === 'n.d.') {
            field.value = '<pre>\\bibstring{nodate}</pre>';
        }
        else {
            field.value = date.verbatim;
        }
    }
    else if (date.type === 'date' || date.type === 'season') {
        field.value = format(date);
    }
    else if (date.type === 'interval') {
        field.value = `${format(date.from)}/${format(date.to)}`;
    }
    else if (date.year) {
        field.value = format(date);
    }
    if (!field.value || !field.name)
        return {};
    // well this is fairly dense... the date field is not an verbatim field, so the 'circa' symbol ('~') ought to mean a
    // NBSP... but some magic happens in that field (always with the magic, BibLaTeX...). But hey, if I insert an NBSP,
    // guess what that gets translated to!
    if (date.type !== 'verbatim')
        field.value = field.value.replace(/~/g, '\u00A0');
    return field;
}
exports.datefield = datefield;
; Zotero.debug('BBT: loaded translators/bibtex/datefield.ts'); } catch ($wrap_loader_catcher_translators_bibtex_datefield_ts) { Zotero.logError('Error: BBT: load of translators/bibtex/datefield.ts failed:' + $wrap_loader_catcher_translators_bibtex_datefield_ts + '::' + $wrap_loader_catcher_translators_bibtex_datefield_ts.stack) };

/***/ }),
/* 11 */
/*!********************************!*\
  !*** ./bibtex/biblatex.qr.bcf ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

const fieldSet = {
  'optional': new Set([
    'abstract',
    'annotation',
    'authortype',
    'bookpagination',
    'crossref',
    'date',
    'entryset',
    'entrysubtype',
    'execute',
    'file',
    'gender',
    'ids',
    'indextitle',
    'indexsorttitle',
    'isan',
    'ismn',
    'iswc',
    'keywords',
    'label',
    'langid',
    'langidopts',
    'library',
    'lista',
    'listb',
    'listc',
    'listd',
    'liste',
    'listf',
    'month',
    'nameaddon',
    'options',
    'origdate',
    'origlocation',
    'origpublisher',
    'origtitle',
    'pagination',
    'presort',
    'related',
    'relatedoptions',
    'relatedstring',
    'relatedtype',
    'shortauthor',
    'shorteditor',
    'shorthand',
    'shorthandintro',
    'shortjournal',
    'shortseries',
    'shorttitle',
    'sortkey',
    'sortname',
    'sortshorthand',
    'sorttitle',
    'sortyear',
    'url',
    'urldate',
    'usera',
    'userb',
    'userc',
    'userd',
    'usere',
    'userf',
    'verba',
    'verbb',
    'verbc',
    'xdata',
    'xref',
    'year'
  ]),
  'optional_set': new Set([
    'entryset',
    'crossref'
  ]),
  'optional_article': new Set([
    'addendum',
    'annotator',
    'author',
    'commentator',
    'doi',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eid',
    'eprint',
    'eprintclass',
    'eprinttype',
    'issn',
    'issue',
    'issuetitle',
    'issuesubtitle',
    'journalsubtitle',
    'journaltitle',
    'language',
    'note',
    'number',
    'origlanguage',
    'pages',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'translator',
    'version',
    'volume'
  ]),
  'optional_bibnote': new Set([
    'note'
  ]),
  'optional_book': new Set([
    'author',
    'addendum',
    'afterword',
    'annotator',
    'chapter',
    'commentator',
    'doi',
    'edition',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'foreword',
    'introduction',
    'isbn',
    'language',
    'location',
    'maintitle',
    'maintitleaddon',
    'mainsubtitle',
    'note',
    'number',
    'origlanguage',
    'pages',
    'pagetotal',
    'part',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'translator',
    'volume',
    'volumes'
  ]),
  'optional_mvbook': new Set([
    'addendum',
    'afterword',
    'annotator',
    'author',
    'commentator',
    'doi',
    'edition',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'foreword',
    'introduction',
    'isbn',
    'language',
    'location',
    'note',
    'number',
    'origlanguage',
    'pagetotal',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'translator',
    'volume',
    'volumes'
  ]),
  'optional_bookinbook_inbook_suppbook': new Set([
    'addendum',
    'afterword',
    'annotator',
    'author',
    'booktitle',
    'bookauthor',
    'booksubtitle',
    'booktitleaddon',
    'chapter',
    'commentator',
    'doi',
    'edition',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'foreword',
    'introduction',
    'isbn',
    'language',
    'location',
    'mainsubtitle',
    'maintitle',
    'maintitleaddon',
    'note',
    'number',
    'origlanguage',
    'part',
    'publisher',
    'pages',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'translator',
    'volume',
    'volumes'
  ]),
  'optional_booklet': new Set([
    'addendum',
    'author',
    'chapter',
    'doi',
    'editor',
    'editortype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'howpublished',
    'language',
    'location',
    'note',
    'pages',
    'pagetotal',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon',
    'type'
  ]),
  'optional_collection_reference': new Set([
    'addendum',
    'afterword',
    'annotator',
    'chapter',
    'commentator',
    'doi',
    'edition',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'foreword',
    'introduction',
    'isbn',
    'language',
    'location',
    'mainsubtitle',
    'maintitle',
    'maintitleaddon',
    'note',
    'number',
    'origlanguage',
    'pages',
    'pagetotal',
    'part',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'translator',
    'volume',
    'volumes'
  ]),
  'optional_mvcollection_mvreference': new Set([
    'addendum',
    'afterword',
    'annotator',
    'author',
    'commentator',
    'doi',
    'edition',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'foreword',
    'introduction',
    'isbn',
    'language',
    'location',
    'note',
    'number',
    'origlanguage',
    'publisher',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon',
    'translator',
    'volume',
    'volumes'
  ]),
  'optional_incollection_inreference_suppcollection': new Set([
    'addendum',
    'afterword',
    'annotator',
    'author',
    'booksubtitle',
    'booktitle',
    'booktitleaddon',
    'chapter',
    'commentator',
    'doi',
    'edition',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'foreword',
    'introduction',
    'isbn',
    'language',
    'location',
    'mainsubtitle',
    'maintitle',
    'maintitleaddon',
    'note',
    'number',
    'origlanguage',
    'pages',
    'part',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'translator',
    'volume',
    'volumes'
  ]),
  'optional_manual': new Set([
    'addendum',
    'author',
    'chapter',
    'doi',
    'edition',
    'editor',
    'editortype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'isbn',
    'language',
    'location',
    'note',
    'number',
    'organization',
    'pages',
    'pagetotal',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'type',
    'version'
  ]),
  'optional_misc': new Set([
    'addendum',
    'author',
    'doi',
    'editor',
    'editortype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'howpublished',
    'language',
    'location',
    'note',
    'organization',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon',
    'type',
    'version'
  ]),
  'optional_online': new Set([
    'addendum',
    'author',
    'editor',
    'editortype',
    'language',
    'note',
    'organization',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon',
    'version'
  ]),
  'optional_patent': new Set([
    'addendum',
    'author',
    'doi',
    'eprint',
    'eprintclass',
    'eprinttype',
    'holder',
    'location',
    'note',
    'number',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon',
    'type',
    'version'
  ]),
  'optional_periodical': new Set([
    'addendum',
    'doi',
    'editor',
    'editora',
    'editorb',
    'editorc',
    'editortype',
    'editoratype',
    'editorbtype',
    'editorctype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'issn',
    'issue',
    'issuesubtitle',
    'issuetitle',
    'language',
    'note',
    'number',
    'pubstate',
    'date',
    'series',
    'subtitle',
    'title',
    'volume'
  ]),
  'optional_mvproceedings': new Set([
    'addendum',
    'doi',
    'editor',
    'editortype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'eventdate',
    'eventtitle',
    'eventtitleaddon',
    'isbn',
    'language',
    'location',
    'note',
    'number',
    'organization',
    'pagetotal',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'venue',
    'volumes'
  ]),
  'optional_proceedings': new Set([
    'addendum',
    'chapter',
    'doi',
    'editor',
    'editortype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'eventdate',
    'eventtitle',
    'eventtitleaddon',
    'isbn',
    'language',
    'location',
    'mainsubtitle',
    'maintitle',
    'maintitleaddon',
    'note',
    'number',
    'organization',
    'pages',
    'pagetotal',
    'part',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'venue',
    'volume',
    'volumes'
  ]),
  'optional_inproceedings': new Set([
    'addendum',
    'author',
    'booksubtitle',
    'booktitle',
    'booktitleaddon',
    'chapter',
    'doi',
    'editor',
    'editortype',
    'eprint',
    'eprintclass',
    'eprinttype',
    'eventdate',
    'eventtitle',
    'eventtitleaddon',
    'isbn',
    'language',
    'location',
    'mainsubtitle',
    'maintitle',
    'maintitleaddon',
    'note',
    'number',
    'organization',
    'pages',
    'part',
    'publisher',
    'pubstate',
    'series',
    'subtitle',
    'title',
    'titleaddon',
    'venue',
    'volume',
    'volumes'
  ]),
  'optional_report': new Set([
    'addendum',
    'author',
    'chapter',
    'doi',
    'eprint',
    'eprintclass',
    'eprinttype',
    'institution',
    'isrn',
    'language',
    'location',
    'note',
    'number',
    'pages',
    'pagetotal',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon',
    'type',
    'version'
  ]),
  'optional_thesis': new Set([
    'addendum',
    'author',
    'chapter',
    'doi',
    'eprint',
    'eprintclass',
    'eprinttype',
    'institution',
    'language',
    'location',
    'note',
    'pages',
    'pagetotal',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon',
    'type'
  ]),
  'optional_unpublished': new Set([
    'addendum',
    'author',
    'howpublished',
    'language',
    'location',
    'note',
    'pubstate',
    'subtitle',
    'title',
    'titleaddon'
  ])
}
const allowed = {
  article: [
      fieldSet.optional,
      fieldSet.optional_article,
  ],
  artwork: [
      fieldSet.optional,
  ],
  audio: [
      fieldSet.optional,
  ],
  bibnote: [
      fieldSet.optional,
      fieldSet.optional_bibnote,
  ],
  book: [
      fieldSet.optional,
      fieldSet.optional_book,
  ],
  bookinbook: [
      fieldSet.optional,
      fieldSet.optional_bookinbook_inbook_suppbook,
  ],
  booklet: [
      fieldSet.optional,
      fieldSet.optional_booklet,
  ],
  collection: [
      fieldSet.optional,
      fieldSet.optional_collection_reference,
  ],
  commentary: [
      fieldSet.optional,
  ],
  customa: [
      fieldSet.optional,
  ],
  customb: [
      fieldSet.optional,
  ],
  customc: [
      fieldSet.optional,
  ],
  customd: [
      fieldSet.optional,
  ],
  custome: [
      fieldSet.optional,
  ],
  customf: [
      fieldSet.optional,
  ],
  inbook: [
      fieldSet.optional,
      fieldSet.optional_bookinbook_inbook_suppbook,
  ],
  incollection: [
      fieldSet.optional,
      fieldSet.optional_incollection_inreference_suppcollection,
  ],
  inproceedings: [
      fieldSet.optional,
      fieldSet.optional_inproceedings,
  ],
  inreference: [
      fieldSet.optional,
      fieldSet.optional_incollection_inreference_suppcollection,
  ],
  image: [
      fieldSet.optional,
  ],
  jurisdiction: [
      fieldSet.optional,
  ],
  legal: [
      fieldSet.optional,
  ],
  legislation: [
      fieldSet.optional,
  ],
  letter: [
      fieldSet.optional,
  ],
  manual: [
      fieldSet.optional,
      fieldSet.optional_manual,
  ],
  misc: [
      fieldSet.optional,
      fieldSet.optional_misc,
  ],
  movie: [
      fieldSet.optional,
  ],
  music: [
      fieldSet.optional,
  ],
  mvcollection: [
      fieldSet.optional,
      fieldSet.optional_mvcollection_mvreference,
  ],
  mvreference: [
      fieldSet.optional,
      fieldSet.optional_mvcollection_mvreference,
  ],
  mvproceedings: [
      fieldSet.optional,
      fieldSet.optional_mvproceedings,
  ],
  mvbook: [
      fieldSet.optional,
      fieldSet.optional_mvbook,
  ],
  online: [
      fieldSet.optional,
      fieldSet.optional_online,
  ],
  patent: [
      fieldSet.optional,
      fieldSet.optional_patent,
  ],
  performance: [
      fieldSet.optional,
  ],
  periodical: [
      fieldSet.optional,
      fieldSet.optional_periodical,
  ],
  proceedings: [
      fieldSet.optional,
      fieldSet.optional_proceedings,
  ],
  reference: [
      fieldSet.optional,
      fieldSet.optional_collection_reference,
  ],
  report: [
      fieldSet.optional,
      fieldSet.optional_report,
  ],
  review: [
      fieldSet.optional,
  ],
  set: [
      fieldSet.optional,
      fieldSet.optional_set,
  ],
  software: [
      fieldSet.optional,
  ],
  standard: [
      fieldSet.optional,
  ],
  suppbook: [
      fieldSet.optional,
      fieldSet.optional_bookinbook_inbook_suppbook,
  ],
  suppcollection: [
      fieldSet.optional,
      fieldSet.optional_incollection_inreference_suppcollection,
  ],
  suppperiodical: [
      fieldSet.optional,
  ],
  thesis: [
      fieldSet.optional,
      fieldSet.optional_thesis,
  ],
  unpublished: [
      fieldSet.optional,
      fieldSet.optional_unpublished,
  ],
  video: [
      fieldSet.optional,
  ],
  xdata: [
      fieldSet.optional,
  ],
}
const required = [
    {
      types: new Set(["article","book","bookinbook","booklet","collection","inbook","incollection","inproceedings","inreference","manual","misc","mvbook","mvcollection","online","patent","periodical","proceedings","reference","report","set","suppbook","suppcollection","suppperiodical","thesis","unpublished"]),
      check: function(ref, report) {
            if (!ref.has.date === !ref.has.year) report.push("Exactly one of 'date' / 'year' must be present")
      }
    },
    {
      types: new Set(["set"]),
      check: function(ref, report) {
            if (!ref.has.entryset) report.push("Missing required field 'entryset'")
            if (!ref.has.crossref) report.push("Missing required field 'crossref'")
      }
    },
    {
      types: new Set(["article"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.journaltitle) report.push("Missing required field 'journaltitle'")
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["book","mvbook","mvcollection","mvreference"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["bookinbook","inbook","suppbook"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.title) report.push("Missing required field 'title'")
            if (!ref.has.booktitle) report.push("Missing required field 'booktitle'")
      }
    },
    {
      types: new Set(["booklet"]),
      check: function(ref, report) {
            if (!(this.has.author || this.has.editor)) report.push("At least one of 'author' / 'editor' must be present")
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["collection","reference"]),
      check: function(ref, report) {
            if (!ref.has.editor) report.push("Missing required field 'editor'")
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["incollection","inreference","suppcollection"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.editor) report.push("Missing required field 'editor'")
            if (!ref.has.title) report.push("Missing required field 'title'")
            if (!ref.has.booktitle) report.push("Missing required field 'booktitle'")
      }
    },
    {
      types: new Set(["manual"]),
      check: function(ref, report) {
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["misc"]),
      check: function(ref, report) {
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["online"]),
      check: function(ref, report) {
            if (!ref.has.title) report.push("Missing required field 'title'")
            if (!ref.has.url) report.push("Missing required field 'url'")
      }
    },
    {
      types: new Set(["patent"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.title) report.push("Missing required field 'title'")
            if (!ref.has.number) report.push("Missing required field 'number'")
      }
    },
    {
      types: new Set(["periodical"]),
      check: function(ref, report) {
            if (!ref.has.editor) report.push("Missing required field 'editor'")
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["mvproceedings","proceedings"]),
      check: function(ref, report) {
            if (!ref.has.editor) report.push("Missing required field 'editor'")
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
    {
      types: new Set(["inproceedings"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.title) report.push("Missing required field 'title'")
            if (!ref.has.booktitle) report.push("Missing required field 'booktitle'")
      }
    },
    {
      types: new Set(["report"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.title) report.push("Missing required field 'title'")
            if (!ref.has.type) report.push("Missing required field 'type'")
            if (!ref.has.institution) report.push("Missing required field 'institution'")
      }
    },
    {
      types: new Set(["thesis"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.title) report.push("Missing required field 'title'")
            if (!ref.has.type) report.push("Missing required field 'type'")
            if (!ref.has.institution) report.push("Missing required field 'institution'")
      }
    },
    {
      types: new Set(["unpublished"]),
      check: function(ref, report) {
            if (!ref.has.author) report.push("Missing required field 'author'")
            if (!ref.has.title) report.push("Missing required field 'title'")
      }
    },
]

module.exports = function(explanation) {
  var type = this.referencetype.toLowerCase()

  if (!allowed[type]) return

  var unexpected = Object.keys(this.has).filter(field => !allowed[type].find(set => set.has(field)))
  var report = unexpected.map(field => "Unexpected field '" + field + "'" + (explanation[field] ? (' (' + explanation[field] + ')'): ''))

  for (const test of required) {
    if (test.types.has(type)) test.check(this, report)
  }

    for (const field of ["isbn"]) {
      if (this.has[field]) {
        const warning = Zotero.BetterBibTeX.qrCheck(this.has[field].value, "isbn", null)
        if (warning) report.push("'" + field + "': " + warning)
      }
    }
    for (const field of ["issn"]) {
      if (this.has[field]) {
        const warning = Zotero.BetterBibTeX.qrCheck(this.has[field].value, "issn", null)
        if (warning) report.push("'" + field + "': " + warning)
      }
    }
    for (const field of ["ismn"]) {
      if (this.has[field]) {
        const warning = Zotero.BetterBibTeX.qrCheck(this.has[field].value, "ismn", null)
        if (warning) report.push("'" + field + "': " + warning)
      }
    }
    for (const field of ["date","eventdate","origdate","urldate"]) {
      if (this.has[field]) {
        const warning = Zotero.BetterBibTeX.qrCheck(this.has[field].value, "date", null)
        if (warning) report.push("'" + field + "': " + warning)
      }
    }
    for (const field of ["gender"]) {
      if (this.has[field]) {
        const warning = Zotero.BetterBibTeX.qrCheck(this.has[field].value, "pattern", "(?:sf|sm|sn|pf|pm|pn|pp)")
        if (warning) report.push("'" + field + "': " + warning)
      }
    }

  return report
}


/***/ })
/******/ ]);
