{
	"translatorID": "9d774afe-a51d-4055-a6c7-23bc96d19fe7",
	"label": "Easy Citekey",
	"creator": "Erik Hetzner",
	"target": "txt",
	"minVersion": "2.1.9",
	"maxVersion": "",
	"priority": 200,
	"inRepository": false,
	"translatorType": 2,
	"browserSupport": "gcs",
	"displayOptions": {
		"Alternate (@DoeTitle2000)": false
	},
	"lastUpdated": "2013-07-15 07:03:17"
}

// This file is part of zotxt.

// zotxt is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// zotxt is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with zotxt. If not, see <http://www.gnu.org/licenses/>.

// from bibtex exporter
var citeKeyCleanRe = ZU.XRegExp('[^\\P{Lu}\\P{Ll}0-9\\!\\$\\&\\*\\+\\-\\.\\/\\:\\;\\<\\>\?\\[\\]\\^\\_\\`\\|]+', 'g');

function determineYear (item) {
    var year = "";
    var rawdate = item['date'];
    if (rawdate) {
        var yearMd = rawdate.match(/[0-9]{4}/);
        if (yearMd && yearMd[0]) {
            year = yearMd[0];
        };
    }
    return year;
}

function stripFormatting(str) {
    return str.replace(new RegExp("(</?i>|</?b>|</?sub>|</?sup>|</span>|<span[^>]+>)", "g"), "");
}

function cleanString(string) {
    return ZU.XRegExp.replace(string.replace(/\s+/g, "_"), citeKeyCleanRe, "");
}

function determineAuthor (item) {
    var primaryCreatorType = ZU.getCreatorsForType(item.itemType)[0];
    var primaryCreators = item.creators.filter(function (c) {
        return (c.creatorType === primaryCreatorType);
    });
    var creator = primaryCreators[0] || item.creators[0];
    var author = (creator && creator['lastName']) || "Anonymous";
    return author;
}

var stopwords = ["a", "aan", "abans", "aber", "acaba", "acerca", "ach", "aderton", "adertonde", "adesso", "adjÃ¶", "af", "agora", "ai", "aj", "al", "albo", "aldrig", "algmas", "algun", "alguna", "algunas", "algunes", "alguno", "algunos", "alguns", "algÃºn", "ali", "alla", "allas", "alle", "allo", "allora", "allt", "alltid", "alltsÃ¥", "alors", "als", "altmÃ½Ã¾", "altre", "altri", "altro", "altÃ½", "am", "ama", "amb", "ambdÃ³s", "ambos", "ampleamos", "an", "anar", "anche", "andet", "andra", "andras", "andre", "annan", "annat", "ans", "ante", "antes", "apontar", "aquel", "aquela", "aquelas", "aquele", "aqueles", "aquell", "aquellas", "aquelles", "aquellos", "aquells", "aqui", "aquÃ­", "arbeid", "arriba", "artonde", "artonn", "at", "atras", "atrÃ¡s", "att", "au", "auch", "aucuns", "auf", "aus", "aussi", "autre", "av", "avant", "avec", "avere", "aveva", "avevano", "avoir", "az", "bajo", "bakom", "bana", "bara", "bardzo", "bastant", "bastante", "bazÃ½", "be", "begge", "behÃ¶va", "behÃ¶vas", "behÃ¶vde", "behÃ¶vt", "bei", "belki", "bem", "ben", "benden", "beni", "benim", "beslut", "beslutat", "beslutit", "bez", "beÃ¾", "bien", "bij", "bin", "bir", "biri", "birkaÃ§", "birkez", "birÃ¾ey", "birÃ¾eyi", "bis", "bist", "biz", "bizden", "bizi", "bizim", "bland", "blev", "bli", "blir", "blivit", "bo", "bom", "bon", "bort", "borta", "bra", "bruke", "bu", "buna", "bunda", "bundan", "bunu", "bunun", "buono", "byÄ", "bÃ¤st", "bÃ¤ttre", "bÃ¥da", "bÃ¥das", "bÃ©", "cada", "caminho", "car", "ce", "cela", "ces", "ceux", "chaque", "che", "chi", "ci", "ciebie", "cierta", "ciertas", "cierto", "ciertos", "cima", "cinque", "ciÄ", "co", "com", "comme", "comment", "como", "comprare", "comprido", "con", "conhecido", "consecutivi", "consecutivo", "consegueixo", "conseguim", "conseguimos", "conseguir", "consigo", "consigue", "consigueix", "consigueixen", "consigueixes", "consiguen", "consigues", "corrente", "cosa", "csak", "cual", "cuando", "cui", "czy", "da", "dadurch", "dag", "dagar", "dagarna", "dagen", "daha", "daher", "dahi", "daleko", "dalt", "dan", "dans", "darum", "das", "dass", "dat", "daÃ", "de", "debaixo", "dedans", "defa", "dehors", "dein", "deine", "del", "delen", "della", "dello", "dem", "den", "denne", "dentro", "depuis", "der", "deras", "deres", "des", "desde", "deshalb", "desligado", "dess", "dessen", "det", "detta", "dette", "deve", "devem", "deverÃ¡", "devo", "devrait", "di", "die", "dies", "dieser", "dieses", "dig", "din", "dina", "dins", "direita", "disse", "dit", "ditt", "diye", "diz", "dizer", "dla", "dlaczego", "dlatego", "do", "dobrze", "doch", "dock", "dog", "dois", "doit", "doksan", "dokuz", "dokÄd", "donc", "donde", "doppio", "dort", "dos", "doÅÄ", "droite", "du", "durch", "duÅ¼o", "dwa", "dwaj", "dwie", "dwoje", "dzisiaj", "dziÅ", "dÃ¤r", "dÃ¤rfÃ¶r", "dÃ¥", "dÃ©but", "dÃ¶rt", "e", "ecco", "een", "efter", "eftersom", "egy", "ein", "eine", "einem", "einen", "einer", "eines", "ej", "el", "ela", "ele", "eles", "elfte", "ellas", "elle", "eller", "elles", "elli", "ellos", "ells", "els", "elva", "em", "empleais", "emplean", "emplear", "empleas", "empleo", "en", "encima", "encore", "end", "ene", "eneste", "enhver", "enkel", "enkelt", "enkla", "enligt", "enn", "enquanto", "entonces", "entre", "entÃ£o", "er", "eramos", "eran", "eras", "erem", "eren", "eres", "ert", "es", "essai", "est", "esta", "estaba", "estado", "estais", "estamos", "estan", "estar", "estarÃ¡", "estat", "estava", "este", "estem", "estes", "esteu", "esteve", "estic", "estive", "estivemos", "estiveram", "estoy", "estÃ ", "estÃ¡", "estÃ£o", "et", "ets", "ett", "ettusen", "eu", "euer", "eure", "fa", "faig", "fait", "faites", "fan", "fanns", "fare", "farÃ¡", "fas", "faz", "fazer", "fazia", "fel", "fem", "femte", "femtio", "femtionde", "femton", "femtonde", "fer", "feu", "fez", "fi", "fick", "fim", "fin", "fine", "finnas", "finns", "fino", "fire", "fjorton", "fjortonde", "fjÃ¤rde", "fler", "flera", "flere", "flesta", "fleste", "foi", "fois", "for", "fora", "force", "fordi", "forrige", "forsÃke", "fra", "fram", "framfÃ¶r", "frÃ¥n", "fue", "fueron", "fui", "fuimos", "fyra", "fyrtio", "fyrtionde", "fÃ", "fÃr", "fÃrst", "fÃ¥", "fÃ¥r", "fÃ¥tt", "fÃ¶ljande", "fÃ¶r", "fÃ¶re", "fÃ¶rlÃ¥t", "fÃ¶rra", "fÃ¶rsta", "fÃ¸r", "fÃ¼r", "gdyby", "gdzie", "genast", "genom", "gente", "gibi", "gick", "giu", "gjorde", "gjort", "gjÃre", "goda", "godare", "godast", "gott", "gueno", "gÃ", "gÃ¤lla", "gÃ¤ller", "gÃ¤llt", "gÃ¤rna", "gÃ¥", "gÃ¥r", "gÃ¥tt", "gÃ¶r", "gÃ¶ra", "ha", "hace", "haceis", "hacemos", "hacen", "hacer", "haces", "had", "hadde", "hade", "haft", "hago", "hai", "han", "hanno", "hans", "har", "hatte", "hatten", "hattest", "hattet", "haut", "haver", "heb", "heller", "hellre", "helst", "helt", "hem", "hendes", "henne", "hennes", "hep", "hepsi", "her", "het", "hier", "hij", "hinter", "hit", "hiÃ§", "ho", "hoe", "hogy", "hon", "honom", "horas", "hors", "hun", "hundra", "hundraen", "hundraett", "hur", "hva", "hvad", "hvem", "hver", "hvilken", "hvis", "hvor", "hvordan", "hvorfor", "hvornÃ¥r", "hÃ¡t", "hÃ¤r", "hÃ¶g", "hÃ¶ger", "hÃ¶gre", "hÃ¶gst", "i", "ibland", "ich", "ici", "idag", "ide", "igen", "igÃ¥r", "ihr", "ihre", "ik", "iki", "ikke", "il", "ile", "ils", "im", "imorgon", "in", "incluso", "inclÃ²s", "ind", "indietro", "infÃ¶r", "inga", "ingen", "ingenting", "inget", "iniciar", "inicio", "innan", "inne", "innen", "inny", "inom", "inte", "intenta", "intentais", "intentamos", "intentan", "intentar", "intentas", "intento", "intet", "inuti", "invece", "io", "ir", "irÃ¡", "is", "ise", "ist", "ista", "iste", "isto", "iÃ§in", "ja", "jag", "jak", "jakby", "jaki", "je", "jede", "jedem", "jeden", "jeder", "jedes", "jedna", "jedno", "jeg", "jego", "jej", "jemu", "jener", "jenes", "jeres", "jest", "jestem", "jetzt", "jeÅli", "jeÅ¼eli", "jo", "juste", "juÅ¼", "jÃ¤mfÃ¶rt", "jÄ", "kan", "kann", "kannst", "kanske", "katrilyon", "kaÅ¼dy", "kez", "ki", "kiedy", "kierunku", "kim", "kimden", "kime", "kimi", "knappast", "kom", "komma", "kommer", "kommit", "kr", "kto", "ku", "kunde", "kunna", "kunnat", "kunne", "kvar", "kÃ¶nnen", "kÃ¶nnt", "kÃ½rk", "la", "lage", "lang", "largo", "las", "lav", "lavoro", "le", "legat", "lei", "les", "lesz", "leur", "lidt", "ligado", "ligga", "ligger", "lik", "lika", "like", "likstÃ¤lld", "likstÃ¤llda", "lilla", "lille", "lite", "liten", "litet", "llarg", "llavors", "lo", "loro", "los", "lub", "lui", "lungo", "lÃ ", "lÃ¤nge", "lÃ¤ngre", "lÃ¤ngst", "lÃ¤tt", "lÃ¤ttare", "lÃ¤ttast", "lÃ¥ngsam", "lÃ¥ngsammare", "lÃ¥ngsammast", "lÃ¥ngsamt", "lÃ¥ngt", "ma", "machen", "maintenant", "maioria", "maiorias", "mais", "majÄ", "makt", "mam", "mand", "mange", "mas", "me", "med", "meg", "meget", "meglio", "mein", "meine", "mellan", "mentre", "mera", "mere", "mes", "mesmo", "mest", "meu", "mi", "mientras", "mig", "mij", "milyar", "milyon", "min", "mina", "mindre", "mine", "minst", "mio", "mit", "mitt", "mittemot", "mnie", "mnÄ", "mode", "modo", "moi", "moins", "moja", "moje", "molt", "molta", "molti", "molto", "molts", "mon", "mot", "moÅ¼e", "mu", "muchos", "muito", "muitos", "musst", "muy", "muÃ", "muÃt", "my", "mycket", "mye", "mÃ", "mÃte", "mÃ¥nga", "mÃ¥ste", "mÃªme", "mÃ³j", "mÃ¶jlig", "mÃ¶jligen", "mÃ¶jligt", "mÃ¶jligtvis", "mÃ¼", "mÃ¼ssen", "mÃ¼Ãt", "mÃ½", "na", "nach", "nachdem", "nam", "nami", "nas", "nasi", "nasz", "nasza", "nasze", "nasÃ½l", "natychmiast", "navn", "ne", "ned", "neden", "nederst", "nedersta", "nedre", "nei", "nein", "nej", "nella", "nem", "ner", "nerde", "nerede", "nereye", "ni", "nic", "nich", "nicht", "nie", "niego", "niej", "niemu", "nigdy", "nim", "nimi", "nio", "nionde", "nittio", "nittionde", "nitton", "nittonde", "niye", "niÃ§in", "niÄ", "niÅ¼", "no", "nog", "nogen", "noget", "noi", "noll", "nome", "nommÃ©s", "nos", "nosaltres", "nosotros", "nosso", "nostro", "notre", "nous", "nouveaux", "nove", "novo", "nr", "nu", "nummer", "nun", "nuovi", "nuovo", "ny", "nyt", "nÃ", "nÃr", "nÃ£o", "nÃ¤r", "nÃ¤sta", "nÃ¥gon", "nÃ¥gonting", "nÃ¥got", "nÃ¥gra", "nÃ¦r", "nÃ¦ste", "nÃ¦sten", "nÃ³s", "nÃ¶dvÃ¤ndig", "nÃ¶dvÃ¤ndiga", "nÃ¶dvÃ¤ndigt", "nÃ¶dvÃ¤ndigtvis", "o", "obok", "och", "ocksÃ¥", "od", "oda", "oder", "of", "ofta", "oftast", "og", "ogsÃ", "okoÅo", "olika", "olikt", "oltre", "om", "on", "ona", "ondan", "onde", "one", "oni", "onlar", "onlardan", "onlari", "onlarÃ½n", "ono", "ons", "onu", "ook", "op", "opp", "ora", "os", "oss", "otro", "otte", "otto", "otuz", "ou", "outro", "over", "owszem", "oÃ¹", "par", "para", "parce", "parole", "part", "parte", "pas", "pegar", "peggio", "pelo", "per", "pero", "perquÃ¨", "persone", "personnes", "perÃ²", "pessoas", "peu", "peut", "piu", "piÃ¨ce", "plupart", "po", "poco", "pod", "pode", "podeis", "podem", "podemos", "poden", "poder", "poderÃ¡", "podeu", "podia", "podria", "podriais", "podriamos", "podrian", "podrias", "poniewaÅ¼", "por", "porque", "potser", "pour", "pourquoi", "povo", "primer", "primero", "primo", "promeiro", "promesso", "przed", "przedtem", "puc", "puede", "pueden", "puedo", "punkt", "pÃ", "pÃ¥", "qua", "qual", "qualquer", "quan", "quand", "quando", "quant", "quarto", "quasi", "quattro", "que", "quel", "quelle", "quelles", "quello", "quels", "quem", "questo", "qui", "quien", "quieto", "quindi", "quinto", "quÃ©", "quÃª", "rakt", "redan", "rett", "riktig", "rispetto", "rÃ¡", "rÃ¤tt", "sa", "sabe", "sabeis", "sabem", "sabemos", "saben", "saber", "sabes", "sabeu", "sade", "sagt", "sam", "sama", "samma", "samme", "sanki", "sans", "sant", "sap", "saps", "sara", "se", "secondo", "sedan", "sei", "seid", "sein", "seine", "sekiz", "seks", "seksen", "sem", "sembra", "sembrava", "sen", "senare", "senast", "senden", "seni", "senin", "sense", "sent", "senza", "ser", "ses", "sette", "seu", "seulement", "seus", "sex", "sextio", "sextionde", "sexton", "sextonde", "si", "sia", "siamo", "sich", "siden", "sie", "sien", "siendo", "siete", "sig", "sina", "sind", "sist", "sista", "siste", "sitt", "siz", "sizden", "sizi", "sizin", "siÄ", "sju", "sjunde", "sjuttio", "sjuttionde", "sjutton", "sjuttonde", "sjÃ¤tte", "ska", "skall", "skulle", "skÄd", "slik", "slutligen", "slutt", "smÃ¥", "smÃ¥tt", "snart", "sobre", "soc", "sois", "solament", "solamente", "soll", "sollen", "sollst", "sollt", "solo", "sols", "som", "somente", "somos", "son", "sono", "sonst", "sont", "sopra", "soprattutto", "sota", "sotto", "sous", "soweit", "sowie", "soy", "soyez", "start", "stati", "stato", "stesso", "stille", "stor", "stora", "store", "stort", "stÃ¶rre", "stÃ¶rst", "su", "subito", "sujet", "sul", "sulla", "sur", "sus", "syv", "szÃ©t", "sÃ", "sÃ£o", "sÃ¤ga", "sÃ¤ger", "sÃ¤mre", "sÃ¤mst", "sÃ¥", "sÄ", "ta", "tak", "taki", "tal", "tam", "tambiÃ©n", "tambÃ©", "tambÃ©m", "tandis", "tanto", "te", "tellement", "tels", "tem", "tempo", "ten", "tene", "teneis", "tenemos", "tener", "tengo", "tenho", "tenim", "tenir", "teniu", "tentar", "tentaram", "tente", "tentei", "terzo", "tes", "teu", "teve", "the", "ti", "tid", "tidig", "tidigare", "tidigast", "tidigt", "tiempo", "tiene", "tienen", "til", "tilbake", "till", "tills", "tillsammans", "tilstand", "tinc", "tio", "tionde", "tipo", "tive", "tjugo", "tjugoen", "tjugoett", "tjugonde", "tjugotre", "tjugotvÃ¥", "tjungo", "to", "tobie", "tobÄ", "todo", "todos", "tolfte", "tolv", "ton", "tot", "tous", "tout", "tra", "trabaja", "trabajais", "trabajamos", "trabajan", "trabajar", "trabajas", "trabajo", "trabalhar", "trabalho", "tras", "tre", "tredje", "trettio", "trettionde", "tretton", "trettonde", "trilyon", "triplo", "trop", "trÃ¨s", "tu", "tutaj", "tuyo", "tvÃ¥", "tvÃ¥hundra", "twoi", "twoja", "twoje", "twÃ³j", "ty", "tÃªm", "tÃ¼m", "ud", "uit", "ultimo", "um", "uma", "umas", "un", "una", "unas", "und", "under", "unes", "uno", "unos", "uns", "unser", "unsere", "unter", "upp", "ur", "ursÃ¤kt", "usa", "usais", "usamos", "usan", "usar", "usas", "uso", "ut", "utan", "utanfÃ¶r", "ute", "uten", "va", "vad", "vagy", "vai", "vaig", "vais", "valeur", "valor", "vamos", "van", "var", "vara", "varfÃ¶r", "varifrÃ¥n", "varit", "varken", "varsÃ¥god", "vart", "vaya", "ve", "ved", "veja", "vem", "vems", "ver", "verdad", "verdade", "verdadeiro", "verdadera", "verdadero", "verdi", "verkligen", "veya", "vi", "vid", "vidare", "viktig", "viktigare", "viktigast", "viktigt", "vil", "vilka", "vilken", "vilket", "vill", "ville", "vissza", "vite", "vocÃª", "voi", "voie", "voient", "volte", "vom", "von", "vont", "vor", "vosaltres", "vosotras", "vosotros", "vostro", "votre", "vous", "voy", "vu", "vÃr", "vÃre", "vÃrt", "vÃ¤nster", "vÃ¤nstra", "vÃ¤rre", "vÃ¥r", "vÃ¥ra", "vÃ¥rt", "wam", "wami", "wann", "warum", "was", "wasi", "wasz", "wasza", "wasze", "wat", "we", "weiter", "weitere", "wel", "wenn", "wer", "werde", "werden", "werdet", "weshalb", "wie", "wieder", "wieso", "wij", "wir", "wird", "wirst", "wiÄc", "wo", "woher", "wohin", "wszystko", "wtedy", "wy", "ya", "yani", "yedi", "yetmiÃ¾", "yirmi", "yo", "yÃ¼z", "zal", "zawsze", "ze", "zei", "zij", "zo", "zou", "zu", "zum", "zur", "Ã", "Ã¡t", "Ã¤n", "Ã¤nnu", "Ã¤ven", "Ã¥tminstone", "Ã¥tta", "Ã¥ttio", "Ã¥ttionde", "Ã¥ttonde", "Ã§a", "Ã§ok", "Ã§Ã¼nkÃ¼", "Ã©", "Ã©n", "Ã©s", "Ã©ssent", "Ã©taient", "Ã©tat", "Ã©tions", "Ã©tÃ©", "Ãªtre", "Ãµ", "Ãµk", "Ã¶n", "Ã¶ssze", "Ã¶ver", "Ã¶vermorgon", "Ã¶verst", "Ã¶vre", "Ãºltim", "Ãºltimo", "Ãºs", "Ã¼ber", "Ã¼Ã§", "Ã¾ey", "Ã¾eyden", "Ã¾eyi", "Ã¾eyler", "Ã¾u", "Ã¾una", "Ã¾unda", "Ã¾undan", "Ã¾unu", "Å¼aden", "Å¼e", "Î±á½ÏÏÏ", "Î³Î¬Ï", "Î³Î±^", "Î³Îµ", "Î´Î­", "Î´Î®", "Î´Î±Î¯", "Î´Î±Î¯Ï", "Î´Î¹Î¬", "Î´â", "Îµá¼°", "Îµá¼°Î¼Î¯", "Îµá¼°Ï", "Îµá¼´Î¼Î¹", "ÎºÎ±Î¯", "ÎºÎ±ÏÎ¬", "Î¼Î­Î½", "Î¼Î®", "Î¼ÎµÏÎ¬", "Î¿á¼±", "Î¿á½", "Î¿á½Î´Î­", "Î¿á½Î´ÎµÎ¯Ï", "Î¿á½Îº", "Î¿á½ÏÎµ", "Î¿á½ÏÏÏ", "Î¿á½Î½", "Î¿á½ÏÎ¿Ï", "ÏÎ±ÏÎ¬", "ÏÎµÏÎ¯", "ÏÏÏÏ", "ÏÏÏ", "ÏÏ", "ÏÏÎ½", "ÏÎ¬", "ÏÎ®Î½", "ÏÎ¯", "ÏÎ¯Ï", "ÏÎµ", "ÏÎ¹", "ÏÎ¹Ï", "ÏÎ¿Î¯", "ÏÎ¿Î¹Î¿á¿¦ÏÎ¿Ï", "ÏÎ¿ÏÏ", "ÏÎ¿á¿¦", "ÏÏ", "ÏÏÎ½", "Ïá¿Ï", "Ïá¿", "Ïá¿¶Î½", "Ïá¿·", "Ð°", "Ð°Ð»Ð»Ð¾", "Ð±ÐµÐ·", "Ð±Ð»Ð¸Ð·ÐºÐ¾", "Ð±Ð¾Ð»ÐµÐµ", "Ð±Ð¾Ð»ÑÑÐµ", "Ð±ÑÐ´ÐµÐ¼", "Ð±ÑÐ´ÐµÑ", "Ð±ÑÐ´ÐµÑÐµ", "Ð±ÑÐ´ÐµÑÑ", "Ð±ÑÐ´ÑÐ¾", "Ð±ÑÐ´Ñ", "Ð±ÑÐ´ÑÑ", "Ð±ÑÐ´Ñ", "Ð±Ñ", "Ð±ÑÐ²Ð°ÐµÑ", "Ð±ÑÐ²Ñ", "Ð±ÑÐ»", "Ð±ÑÐ»Ð°", "Ð±ÑÐ»Ð¸", "Ð±ÑÐ»Ð¾", "Ð±ÑÑÑ", "Ð²", "Ð²Ð°Ð¶Ð½Ð°Ñ", "Ð²Ð°Ð¶Ð½Ð¾Ðµ", "Ð²Ð°Ð¶Ð½ÑÐµ", "Ð²Ð°Ð¶Ð½ÑÐ¹", "Ð²Ð°Ð¼", "Ð²Ð°Ð¼Ð¸", "Ð²Ð°Ñ", "Ð²Ð°Ñ", "Ð²Ð°ÑÐ°", "Ð²Ð°ÑÐµ", "Ð²Ð°ÑÐ¸", "Ð²Ð²ÐµÑÑ", "Ð²Ð´Ð°Ð»Ð¸", "Ð²Ð´ÑÑÐ³", "Ð²ÐµÐ´Ñ", "Ð²ÐµÐ·Ð´Ðµ", "Ð²ÐµÑÑ", "Ð²Ð½Ð¸Ð·", "Ð²Ð½Ð¸Ð·Ñ", "Ð²Ð¾", "Ð²Ð¾ÐºÑÑÐ³", "Ð²Ð¾Ð½", "Ð²Ð¾ÑÐµÐ¼Ð½Ð°Ð´ÑÐ°ÑÑÐ¹", "Ð²Ð¾ÑÐµÐ¼Ð½Ð°Ð´ÑÐ°ÑÑ", "Ð²Ð¾ÑÐµÐ¼Ñ", "Ð²Ð¾ÑÑÐ¼Ð¾Ð¹", "Ð²Ð¾Ñ", "Ð²Ð¿ÑÐ¾ÑÐµÐ¼", "Ð²ÑÐµÐ¼ÐµÐ½Ð¸", "Ð²ÑÐµÐ¼Ñ", "Ð²ÑÐµ", "Ð²ÑÐµÐ³Ð´Ð°", "Ð²ÑÐµÐ³Ð¾", "Ð²ÑÐµÐ¼", "Ð²ÑÐµÐ¼Ð¸", "Ð²ÑÐµÐ¼Ñ", "Ð²ÑÐµÑ", "Ð²ÑÐµÑ", "Ð²ÑÑ", "Ð²ÑÑÐ´Ñ", "Ð²ÑÑ", "Ð²ÑÑ", "Ð²ÑÐ¾ÑÐ¾Ð¹", "Ð²Ñ", "Ð³", "Ð³Ð´Ðµ", "Ð³Ð¾Ð²Ð¾ÑÐ¸Ð»", "Ð³Ð¾Ð²Ð¾ÑÐ¸Ñ", "Ð³Ð¾Ð´", "Ð³Ð¾Ð´Ð°", "Ð³Ð¾Ð´Ñ", "Ð´Ð°", "Ð´Ð°Ð²Ð½Ð¾", "Ð´Ð°Ð¶Ðµ", "Ð´Ð°Ð»ÐµÐºÐ¾", "Ð´Ð°Ð»ÑÑÐµ", "Ð´Ð°ÑÐ¾Ð¼", "Ð´Ð²Ð°", "Ð´Ð²Ð°Ð´ÑÐ°ÑÑÐ¹", "Ð´Ð²Ð°Ð´ÑÐ°ÑÑ", "Ð´Ð²Ðµ", "Ð´Ð²ÐµÐ½Ð°Ð´ÑÐ°ÑÑÐ¹", "Ð´Ð²ÐµÐ½Ð°Ð´ÑÐ°ÑÑ", "Ð´Ð²ÑÑ", "Ð´ÐµÐ²ÑÑÐ½Ð°Ð´ÑÐ°ÑÑÐ¹", "Ð´ÐµÐ²ÑÑÐ½Ð°Ð´ÑÐ°ÑÑ", "Ð´ÐµÐ²ÑÑÑÐ¹", "Ð´ÐµÐ²ÑÑÑ", "Ð´ÐµÐ¹ÑÑÐ²Ð¸ÑÐµÐ»ÑÐ½Ð¾", "Ð´ÐµÐ»", "Ð´ÐµÐ½Ñ", "Ð´ÐµÑÑÑÑÐ¹", "Ð´ÐµÑÑÑÑ", "Ð´Ð»Ñ", "Ð´Ð¾", "Ð´Ð¾Ð²Ð¾Ð»ÑÐ½Ð¾", "Ð´Ð¾Ð»Ð³Ð¾", "Ð´Ð¾Ð»Ð¶Ð½Ð¾", "Ð´ÑÑÐ³Ð°Ñ", "Ð´ÑÑÐ³Ð¸Ðµ", "Ð´ÑÑÐ³Ð¸Ñ", "Ð´ÑÑÐ³Ð¾", "Ð´ÑÑÐ³Ð¾Ðµ", "Ð´ÑÑÐ³Ð¾Ð¹", "Ðµ", "ÐµÐ³Ð¾", "ÐµÐµ", "ÐµÐ¹", "ÐµÐ¼Ñ", "ÐµÑÐ»Ð¸", "ÐµÑÑÑ", "ÐµÑÐµ", "ÐµÑÑ", "ÐµÑ", "ÐµÑ", "Ð¶", "Ð¶Ðµ", "Ð¶Ð¸Ð·Ð½Ñ", "Ð·Ð°", "Ð·Ð°Ð½ÑÑ", "Ð·Ð°Ð½ÑÑÐ°", "Ð·Ð°Ð½ÑÑÐ¾", "Ð·Ð°Ð½ÑÑÑ", "Ð·Ð°ÑÐµÐ¼", "Ð·Ð°ÑÐ¾", "Ð·Ð°ÑÐµÐ¼", "Ð·Ð´ÐµÑÑ", "Ð·Ð½Ð°ÑÐ¸Ñ", "Ð¸", "Ð¸Ð·", "Ð¸Ð»Ð¸", "Ð¸Ð¼", "Ð¸Ð¼ÐµÐ½Ð½Ð¾", "Ð¸Ð¼ÐµÑÑ", "Ð¸Ð¼Ð¸", "Ð¸Ð¼Ñ", "Ð¸Ð½Ð¾Ð³Ð´Ð°", "Ð¸Ñ", "Ðº", "ÐºÐ°Ð¶Ð´Ð°Ñ", "ÐºÐ°Ð¶Ð´Ð¾Ðµ", "ÐºÐ°Ð¶Ð´ÑÐµ", "ÐºÐ°Ð¶Ð´ÑÐ¹", "ÐºÐ°Ð¶ÐµÑÑÑ", "ÐºÐ°Ðº", "ÐºÐ°ÐºÐ°Ñ", "ÐºÐ°ÐºÐ¾Ð¹", "ÐºÐµÐ¼", "ÐºÐ¾Ð³Ð´Ð°", "ÐºÐ¾Ð³Ð¾", "ÐºÐ¾Ð¼", "ÐºÐ¾Ð¼Ñ", "ÐºÐ¾Ð½ÐµÑÐ½Ð¾", "ÐºÐ¾ÑÐ¾ÑÐ°Ñ", "ÐºÐ¾ÑÐ¾ÑÐ¾Ð³Ð¾", "ÐºÐ¾ÑÐ¾ÑÐ¾Ð¹", "ÐºÐ¾ÑÐ¾ÑÑÐµ", "ÐºÐ¾ÑÐ¾ÑÑÐ¹", "ÐºÐ¾ÑÐ¾ÑÑÑ", "ÐºÑÐ¾Ð¼Ðµ", "ÐºÑÑÐ³Ð¾Ð¼", "ÐºÑÐ¾", "ÐºÑÐ´Ð°", "Ð»ÐµÑ", "Ð»Ð¸", "Ð»Ð¸ÑÑ", "Ð»ÑÑÑÐµ", "Ð»ÑÐ´Ð¸", "Ð¼", "Ð¼Ð°Ð»Ð¾", "Ð¼ÐµÐ¶Ð´Ñ", "Ð¼ÐµÐ»Ñ", "Ð¼ÐµÐ½ÐµÐµ", "Ð¼ÐµÐ½ÑÑÐµ", "Ð¼ÐµÐ½Ñ", "Ð¼Ð¸Ð»Ð»Ð¸Ð¾Ð½Ð¾Ð²", "Ð¼Ð¸Ð¼Ð¾", "Ð¼Ð¸ÑÐ°", "Ð¼Ð½Ðµ", "Ð¼Ð½Ð¾Ð³Ð¾", "Ð¼Ð½Ð¾Ð³Ð¾ÑÐ¸ÑÐ»ÐµÐ½Ð½Ð°Ñ", "Ð¼Ð½Ð¾Ð³Ð¾ÑÐ¸ÑÐ»ÐµÐ½Ð½Ð¾Ðµ", "Ð¼Ð½Ð¾Ð³Ð¾ÑÐ¸ÑÐ»ÐµÐ½Ð½ÑÐµ", "Ð¼Ð½Ð¾Ð³Ð¾ÑÐ¸ÑÐ»ÐµÐ½Ð½ÑÐ¹", "Ð¼Ð½Ð¾Ð¹", "Ð¼Ð½Ð¾Ñ", "Ð¼Ð¾Ð³", "Ð¼Ð¾Ð³ÑÑ", "Ð¼Ð¾Ð¶", "Ð¼Ð¾Ð¶ÐµÑ", "Ð¼Ð¾Ð¶Ð½Ð¾", "Ð¼Ð¾Ð¶ÑÐ¾", "Ð¼Ð¾Ð¸", "Ð¼Ð¾Ð¹", "Ð¼Ð¾Ñ", "Ð¼Ð¾ÑÑ", "Ð¼Ð¾Ñ", "Ð¼Ð¾Ñ", "Ð¼Ñ", "Ð½Ð°", "Ð½Ð°Ð²ÐµÑÑÑ", "Ð½Ð°Ð´", "Ð½Ð°Ð´Ð¾", "Ð½Ð°Ð·Ð°Ð´", "Ð½Ð°Ð¸Ð±Ð¾Ð»ÐµÐµ", "Ð½Ð°ÐºÐ¾Ð½ÐµÑ", "Ð½Ð°Ð¼", "Ð½Ð°Ð¼Ð¸", "Ð½Ð°Ñ", "Ð½Ð°ÑÐ°Ð»Ð°", "Ð½Ð°Ñ", "Ð½Ð°ÑÐ°", "Ð½Ð°ÑÐµ", "Ð½Ð°ÑÐ¸", "Ð½Ðµ", "Ð½ÐµÐ³Ð¾", "Ð½ÐµÐ´Ð°Ð²Ð½Ð¾", "Ð½ÐµÐ´Ð°Ð»ÐµÐºÐ¾", "Ð½ÐµÐµ", "Ð½ÐµÐ¹", "Ð½ÐµÐ»ÑÐ·Ñ", "Ð½ÐµÐ¼", "Ð½ÐµÐ¼Ð½Ð¾Ð³Ð¾", "Ð½ÐµÐ¼Ñ", "Ð½ÐµÐ¿ÑÐµÑÑÐ²Ð½Ð¾", "Ð½ÐµÑÐµÐ´ÐºÐ¾", "Ð½ÐµÑÐºÐ¾Ð»ÑÐºÐ¾", "Ð½ÐµÑ", "Ð½ÐµÑ", "Ð½ÐµÑ", "Ð½Ð¸", "Ð½Ð¸Ð±ÑÐ´Ñ", "Ð½Ð¸Ð¶Ðµ", "Ð½Ð¸Ð·ÐºÐ¾", "Ð½Ð¸ÐºÐ¾Ð³Ð´Ð°", "Ð½Ð¸ÐºÑÐ´Ð°", "Ð½Ð¸Ð¼Ð¸", "Ð½Ð¸Ñ", "Ð½Ð¸ÑÐµÐ³Ð¾", "Ð½Ð¾", "Ð½Ñ", "Ð½ÑÐ¶Ð½Ð¾", "Ð½Ñ", "Ð¾", "Ð¾Ð±", "Ð¾Ð±Ð°", "Ð¾Ð±ÑÑÐ½Ð¾", "Ð¾Ð´Ð¸Ð½", "Ð¾Ð´Ð¸Ð½Ð½Ð°Ð´ÑÐ°ÑÑÐ¹", "Ð¾Ð´Ð¸Ð½Ð½Ð°Ð´ÑÐ°ÑÑ", "Ð¾Ð´Ð½Ð°Ð¶Ð´Ñ", "Ð¾Ð´Ð½Ð°ÐºÐ¾", "Ð¾Ð´Ð½Ð¾Ð³Ð¾", "Ð¾Ð´Ð½Ð¾Ð¹", "Ð¾ÐºÐ¾Ð»Ð¾", "Ð¾Ð½", "Ð¾Ð½Ð°", "Ð¾Ð½Ð¸", "Ð¾Ð½Ð¾", "Ð¾Ð¿ÑÑÑ", "Ð¾ÑÐ¾Ð±ÐµÐ½Ð½Ð¾", "Ð¾Ñ", "Ð¾ÑÐ¾Ð²ÑÑÐ´Ñ", "Ð¾ÑÑÑÐ´Ð°", "Ð¾ÑÐµÐ½Ñ", "Ð¿ÐµÑÐ²ÑÐ¹", "Ð¿ÐµÑÐµÐ´", "Ð¿Ð¾", "Ð¿Ð¾Ð´", "Ð¿Ð¾Ð¶Ð°Ð»ÑÐ¹ÑÑÐ°", "Ð¿Ð¾Ð·Ð¶Ðµ", "Ð¿Ð¾ÐºÐ°", "Ð¿Ð¾Ñ", "Ð¿Ð¾ÑÐ°", "Ð¿Ð¾ÑÐ»Ðµ", "Ð¿Ð¾ÑÑÐµÐ´Ð¸", "Ð¿Ð¾ÑÐ¾Ð¼", "Ð¿Ð¾ÑÐ¾Ð¼Ñ", "Ð¿Ð¾ÑÐµÐ¼Ñ", "Ð¿Ð¾ÑÑÐ¸", "Ð¿ÑÐµÐºÑÐ°ÑÐ½Ð¾", "Ð¿ÑÐ¸", "Ð¿ÑÐ¾", "Ð¿ÑÐ¾ÑÑÐ¾", "Ð¿ÑÐ¾ÑÐ¸Ð²", "Ð¿ÑÐ¾ÑÐµÐ½ÑÐ¾Ð²", "Ð¿ÑÑÐ½Ð°Ð´ÑÐ°ÑÑÐ¹", "Ð¿ÑÑÐ½Ð°Ð´ÑÐ°ÑÑ", "Ð¿ÑÑÑÐ¹", "Ð¿ÑÑÑ", "ÑÐ°Ð·", "ÑÐ°Ð·Ð²Ðµ", "ÑÐ°Ð½Ð¾", "ÑÐ°Ð½ÑÑÐµ", "ÑÑÐ´Ð¾Ð¼", "Ñ", "ÑÐ°Ð¼", "ÑÐ°Ð¼Ð°", "ÑÐ°Ð¼Ð¸", "ÑÐ°Ð¼Ð¸Ð¼", "ÑÐ°Ð¼Ð¸Ð¼Ð¸", "ÑÐ°Ð¼Ð¸Ñ", "ÑÐ°Ð¼Ð¾", "ÑÐ°Ð¼Ð¾Ð³Ð¾", "ÑÐ°Ð¼Ð¾Ð¹", "ÑÐ°Ð¼Ð¾Ð¼", "ÑÐ°Ð¼Ð¾Ð¼Ñ", "ÑÐ°Ð¼Ñ", "ÑÐ²Ð¾Ðµ", "ÑÐ²Ð¾ÐµÐ³Ð¾", "ÑÐ²Ð¾ÐµÐ¹", "ÑÐ²Ð¾Ð¸", "ÑÐ²Ð¾Ð¸Ñ", "ÑÐ²Ð¾Ñ", "ÑÐµÐ°Ð¾Ð¹", "ÑÐµÐ±Ðµ", "ÑÐµÐ±Ñ", "ÑÐµÐ³Ð¾Ð´Ð½Ñ", "ÑÐµÐ´ÑÐ¼Ð¾Ð¹", "ÑÐµÐ¹ÑÐ°Ñ", "ÑÐµÐ¼Ð½Ð°Ð´ÑÐ°ÑÑÐ¹", "ÑÐµÐ¼Ð½Ð°Ð´ÑÐ°ÑÑ", "ÑÐµÐ¼Ñ", "ÑÐ¸Ñ", "ÑÐºÐ°Ð·Ð°Ð»", "ÑÐºÐ°Ð·Ð°Ð»Ð°", "ÑÐºÐ°Ð·Ð°ÑÑ", "ÑÐºÐ¾Ð»ÑÐºÐ¾", "ÑÐ»Ð¸ÑÐºÐ¾Ð¼", "ÑÐ½Ð°ÑÐ°Ð»Ð°", "ÑÐ½Ð¾Ð²Ð°", "ÑÐ¾", "ÑÐ¾Ð±Ð¾Ð¹", "ÑÐ¾Ð±Ð¾Ñ", "ÑÐ¾Ð²ÑÐµÐ¼", "ÑÐ¿Ð°ÑÐ¸Ð±Ð¾", "ÑÑÐ°Ð»", "ÑÑÑÑ", "Ñ", "ÑÐ°", "ÑÐ°Ðº", "ÑÐ°ÐºÐ°Ñ", "ÑÐ°ÐºÐ¶Ðµ", "ÑÐ°ÐºÐ¸Ðµ", "ÑÐ°ÐºÐ¾Ðµ", "ÑÐ°ÐºÐ¾Ð¹", "ÑÐ°Ð¼", "ÑÐ²Ð¾Ð¹", "ÑÐ²Ð¾Ñ", "ÑÐ²Ð¾Ñ", "ÑÐµ", "ÑÐµÐ±Ðµ", "ÑÐµÐ±Ñ", "ÑÐµÐ¼", "ÑÐµÐ¼Ð¸", "ÑÐµÐ¿ÐµÑÑ", "ÑÐµÑ", "ÑÐ¾", "ÑÐ¾Ð±Ð¾Ð¹", "ÑÐ¾Ð±Ð¾Ñ", "ÑÐ¾Ð³Ð´Ð°", "ÑÐ¾Ð³Ð¾", "ÑÐ¾Ð¶Ðµ", "ÑÐ¾Ð»ÑÐºÐ¾", "ÑÐ¾Ð¼", "ÑÐ¾Ð¼Ñ", "ÑÐ¾Ñ", "ÑÐ¾Ñ", "ÑÑÐµÑÐ¸Ð¹", "ÑÑÐ¸", "ÑÑÐ¸Ð½Ð°Ð´ÑÐ°ÑÑÐ¹", "ÑÑÐ¸Ð½Ð°Ð´ÑÐ°ÑÑ", "ÑÑ", "ÑÑÐ´Ð°", "ÑÑÑ", "ÑÑ", "ÑÑÑÑÑ", "Ñ", "ÑÐ¶", "ÑÐ¶Ðµ", "ÑÐ¼ÐµÑÑ", "ÑÐ¾ÑÐ¾ÑÐ¾", "ÑÐ¾ÑÐµÑÑ", "ÑÐ¾ÑÑ", "ÑÐ¾ÑÑ", "ÑÐ¾ÑÐµÑÑ", "ÑÐ°ÑÑÐ¾", "ÑÐ°ÑÐµ", "ÑÐµÐ³Ð¾", "ÑÐµÐ»Ð¾Ð²ÐµÐº", "ÑÐµÐ¼", "ÑÐµÐ¼Ñ", "ÑÐµÑÐµÐ·", "ÑÐµÑÐ²ÐµÑÑÑÐ¹", "ÑÐµÑÑÑÐµ", "ÑÐµÑÑÑÐ½Ð°Ð´ÑÐ°ÑÑÐ¹", "ÑÐµÑÑÑÐ½Ð°Ð´ÑÐ°ÑÑ", "ÑÑÐ¾", "ÑÑÐ¾Ð±", "ÑÑÐ¾Ð±Ñ", "ÑÑÑÑ", "ÑÐµÑÑÐ½Ð°Ð´ÑÐ°ÑÑÐ¹", "ÑÐµÑÑÐ½Ð°Ð´ÑÐ°ÑÑ", "ÑÐµÑÑÐ¾Ð¹", "ÑÐµÑÑÑ", "ÑÑÐ°", "ÑÑÐ¸", "ÑÑÐ¸Ð¼", "ÑÑÐ¸Ð¼Ð¸", "ÑÑÐ¸Ñ", "ÑÑÐ¾", "ÑÑÐ¾Ð³Ð¾", "ÑÑÐ¾Ð¹", "ÑÑÐ¾Ð¼", "ÑÑÐ¾Ð¼Ñ", "ÑÑÐ¾Ñ", "ÑÑÑ", "Ñ", "á¼Î»Î»Î¬", "á¼Î»Î»â", "á¼ÏÏ", "á¼Î»Î»Î¿Ï", "á¼Î½", "á¼ÏÎ±", "á¼Î¬Î½", "á¼Î³Ï", "á¼Îº", "á¼Î¼ÏÏ", "á¼Î½", "á¼ÏÎ¯", "á¼Î±ÏÏÎ¿á¿¦", "á¼ÏÎ¹", "á¼¡", "á¼¤", "á½", "á½Î´Îµ", "á½Ï", "á½ÏÏÎ¹Ï", "á½ÏÎ¹", "á½Î¼ÏÏ", "á½ÏÎ­Ï", "á½ÏÏ", "á½¡Ï", "á½¥ÏÏÎµ", "á½¦"];
// Based on http://www.ranks.nl/stopwords/

function determineTitleWord(item) {
    var cleanTitle = stripFormatting(item['title'].toLowerCase());
    var words = ZU.XRegExp.split(cleanTitle, ZU.XRegExp("\\s+|\\p{P}"));
    var filteredWords = words.filter(function (word) {
        return (stopwords.indexOf(word) == -1 &&
                word.length > 1 &&
                !ZU.XRegExp.test(word, ZU.XRegExp('^\\p{P}+$')) &&
                !ZU.XRegExp.test(word, ZU.XRegExp('^[0-9]+$')));
    });
    return filteredWords[0] || "unknown";
}

function doExport () {
    var item;
    var first = true;
    while((item = Zotero.nextItem())) {
        // only write spaces after the first export
        if (!first) {
            Zotero.write(" ");
        } else {
            first = false;
        }
        var year = determineYear(item);
        var author = determineAuthor(item);
        var titleword = determineTitleWord(item);
        if (Zotero.getOption("alternate")) {
            Zotero.write("@" + ZU.capitalizeTitle(author, true) + ZU.capitalizeTitle(titleword, true) + year);
        } else {
            Zotero.write("@" + cleanString(author.toLowerCase()) + ":" + year + cleanString(titleword.toLowerCase()));
        }
    }
}