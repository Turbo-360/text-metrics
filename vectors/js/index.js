/* Define your vectors here. To run the function below,
   from the root directory run the devserver:
   $ turbo devserver

   then navigate to: 
   http://localhost:3000/vectors/metrics

   Deploy the vectors by running from root directory:
   $ turbo vectors
*/

// import npm packages here:
// var turbo = require('turbo360')
var sentiment = require('sentiment');
var sw = require('stopword');

module.exports = {

	metrics: (req, res) => {
		const original = req.query.text;
		if (original == null) {
			res.json({
				confirmation: 'fail',
				message: 'Missing text data'
			})
		}
		if (typeof original !== 'string') {
			res.json({
				confirmation: 'fail',
				message: 'Text must be of type string'
			})
		}

		const lang = req.query.lang;

		// Simplify the text for analysis
		var simplified = original;
		// Convert text to lowercase
		simplified = simplified.toLowerCase();
		// Remove all non-alphanumeric characters (?.!'," and so on). Keep space characters
		simplified = simplified.replace(/[^A-Za-z0-9\s]/g, '');
		// Convert all white space to simple spaces
		simplified = simplified.replace(/\s/g, ' ');

		// Split on white space, then remove '' elements from the resulting array
		var wordArray = simplified.split(/\ /).filter(isEmpty);

		var totalLetters = (simplified.replace(/\ /g, '')).length;
		var totalWords = wordArray.length;
		var averageWordLength = totalLetters/(wordArray.length);

		var uniqueWords = [];
		for (i in wordArray) {
			let word = wordArray[i];
			if (uniqueWords.indexOf(word) === -1) {
				uniqueWords.push(word);
			}
		}
		var numUniqueWords = uniqueWords.length;

		var sent = sentiment(original);

		sansStopwords = deleteStopwords(wordArray, lang);
		var wordOccurrences = {};
		for (i in sansStopwords) {
			let word = sansStopwords[i]
			if (word in wordOccurrences) {
				wordOccurrences[word] += 1;
			} else {
				wordOccurrences[word] = 1;
			}
		}

		var wordOccurrencesSorted = {};
		// Sort words by frequency
		sortedWords = Object.keys(wordOccurrences).sort(function(a,b){return wordOccurrences[a]-wordOccurrences[b]});
		// Create a dictionary of the top 10 words and their frequencies
		var topTenWords = {}
		for (let i = sortedWords.length - 1; i > sortedWords.length - 11; i--) {
			if (i < 0) {
				break
			}
			topTenWords[sortedWords[i]] = wordOccurrences[sortedWords[i]];
		}

		res.json({
			confirmation: 'success',
			metrics: {
				numWords: totalWords,
				numLetters: totalLetters,
				averageWordLength: averageWordLength,
				numUniqueWords: numUniqueWords,
				wordOccurrences: wordOccurrences,
				topTenWords: topTenWords
			},
			sentiment: {
				score: sent.score,
				comparative: sent.comparative,
				positive: sent.positive,
				negative: sent.negative
			},
			text: {
				textOriginal: original,
				textSimplified: simplified,
				textSansStopwords: sansStopwords.join(" ")
			},
			array: {
				all: wordArray,
				unique: uniqueWords,
				uniqueSansStopwords: sansStopwords
			}
		});
	}
}

function simplify(text) {
	// Convert text to lowercase
	text = text.toLowerCase();
	// Remove all non-alphanumeric characters (?.!'," and so on). Keep space characters
	text = text.replace(/[^A-Za-z0-9\s]/g, '');
	// Convert all white space to simple spaces
	text = text.replace(/\s/g, ' ');
	// Return the result
	return text;
}

// Used for filter method
function isEmpty(str) {
	return str !== '';
}

function deleteStopwords(text, lang) {
	permitted = ['ar','bn','br','da','de','en','es','fa','fr','hi','it','ja','nl','no','pl','pt','ru','sv','zh']
	if (permitted.indexOf(lang) === -1) {
		lang = 'en';
	}
	if (lang === 'en') {
		return sw.removeStopwords(text, sw.en);
	}
	if (lang === 'ar') {
		return sw.removeStopwords(text, sw.ar);
	}
	if (lang === 'bn') {
		return sw.removeStopwords(text, sw.bn);
	}
	if (lang === 'br') {
		return sw.removeStopwords(text, sw.br);
	}
	if (lang === 'da') {
		return sw.removeStopwords(text, sw.da);
	}
	if (lang === 'de') {
		return sw.removeStopwords(text, sw.de);
	}
	if (lang === 'es') {
		return sw.removeStopwords(text, sw.es);
	}
	if (lang === 'fa') {
		return sw.removeStopwords(text, sw.fa);
	}
	if (lang === 'fr') {
		return sw.removeStopwords(text, sw.fr);
	}
	if (lang === 'hi') {
		return sw.removeStopwords(text, sw.hi);
	}
	if (lang === 'it') {
		return sw.removeStopwords(text, sw.it);
	}
	if (lang === 'ja') {
		return sw.removeStopwords(text, sw.nl);
	}
	if (lang === 'no') {
		return sw.removeStopwords(text, sw.no);
	}
	if (lang === 'pl') {
		return sw.removeStopwords(text, sw.pl);
	}
	if (lang === 'pt') {
		return sw.removeStopwords(text, sw.pt);
	}
	if (lang === 'ru') {
		return sw.removeStopwords(text, sw.ru);
	}
	if (lang === 'sv') {
		return sw.removeStopwords(text, sw.sv);
	}
	if (lang === 'zh') {
		return sw.removeStopwords(text, sw.zh);
	}
}
