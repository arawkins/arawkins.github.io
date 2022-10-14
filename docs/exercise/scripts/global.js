var tmplCache = {};
var loadedFiles = [];

(function (Handlebars) {
	Handlebars.registerHelper("msgStrs", function (prop, v) {
		var str = msgStrs[prop];
		return new Handlebars.SafeString(str);
	});
	Handlebars.registerHelper("formatDate", function (str, options) {
		/**
		 * @function formatDate - A function to format the dates in the templates
		 * 
		 * - Note to CarriersEdge: I've added some code here to check for options from the handlebars templates, 
		 * including the ability to choose how the date is formatted. This allows for 
		 * formatting the date on page two differently, as requested. I also specifically defined some of the other parameters that
		 * were passed along to getDateStr, which appeared to be undefined. I left the bulk of the code after that alone, 
		 * with the exception of the getDateStr function, which I've added a line to and commented.
		 * 
		 * @param {string} str 
		 * - A date time string that needs formatting.
		 * 
		 * @param {object} options
		 * - The handlebars helper options object.
		 * 
		 * @param {object} options.hash  
		 * - Contains parameters sent from the handlebars template
		 * 
		 * @param {number} [options.hash.dateFormat=5] 
		 * - A number between 1 and 6. Used to choose from the six formatting options in the function getDateStr below.
		 * - eg. {{ formatDate modified format=1}}
		 * 
		 * @param {boolean} [options.hash.dateOnly=false] 
		 * - If true, the date will not show the hours, minutes, and seconds.
		 * - eg. {{ formatDate modified dateOnly=true}}
		 * 
		 * @param {string} [options.hash.locale=navigator.language] 
		 * - The users locale. Defaults to the users chosen browser language
		 * - eg. {{ formateDate modified locale="en-US"}}
		 */


		/* 
			Here I'm creating and setting the variables that will be passed to getDateTime.
		 	I tried to use sensible defaults that mimicked how the app was working in it's original state.
		   	navigator.language should contain the user's browser language, so that felt like a good default.
		*/
		let dateFormat = 5,
			locale = navigator.language,
			dateOnly = false;

		// Here I'm checking options.hash, which is passed by handlebars, to see if any options were set. If so, I overwrite the defaults.
		if (typeof options != undefined && typeof options.hash != undefined) {
			let errorPrefix = "formatDate helper param error: "
			if (options.hash.hasOwnProperty("dateFormat")) {
				// There are 6 formatting options in getDateStr below, so check if the value is between 1 and 6. If not, let the user know.
				if(typeof options.hash.dateFormat === "number" && options.hash.dateFormat >= 1 && options.hash.dateFormat <=6) {
					dateFormat = options.hash.dateFormat;
				} else {
					console.log(errorPrefix + "dateFormat must be a number between 1 and 6");
				}
			}
			if (options.hash.hasOwnProperty("dateOnly")) {
				if (typeof options.hash.dateOnly === "boolean") {
					dateOnly = options.hash.dateOnly;
				} else {
					console.log(errorPrefix + "dateOnly must be set to a boolean value");
				}
			}
			if (options.hash.hasOwnProperty("locale")) {
				if (typeof options.hash.locale === "string") {
					locale = options.hash.locale;
				} else {
					console.log(errorPrefix + "locale must be set to a string value");
				}
			}
		}
		
		// Finally, call the getDateTime with the selected options, and then return the result.
		if (str) {
			str = getDateTime(str, dateOnly, locale, dateFormat);
		}
		return str;
	});
}(window.Handlebars));

$(document).ready(function () {
	loadView($('nav a.current'));

	$(document).on('click', 'a', function () {
		if ($(this).attr('href') == '#') {
			return false;
		}
	});

	$('nav a').click(function () {
		var el = $(this);
		if (!el.hasClass('current')) {
			$('nav a.current').removeClass('current');
			el.addClass('current');
			loadView(el);
		}
		return false;
	});

});

function loadView(el) {
	if (el.length) {
		var contentEl = $('.content');
		loadingStart(contentEl);
		var url = el.attr('href');
		url = url.indexOf('?') ? url.split('?')[0] : url;
		url = url.replace(/[\.-]/g, '');
		loadJS(url + ".js", url, contentEl);
	}
}

function getTemplate(path, data, htmlOnly) {
	if (!tmplCache[path]) {
		var tmplStr;
		$.ajax({
			url: 'templates/' + path + '.htm',
			method: 'GET',
			async: false,
			success: function (html) {
				tmplCache[path] = {
					html: html,
					compile: Handlebars.compile(html)
				}
			}
		});
	}
	if (tmplCache[path]) {
		return tmplCache[path].compile(data);
	} else {
		return '<p>' + msgStrs.errorgeneral + '</p>';
	}
}

function loadingStart(el) {
	el.html('<img src="images/spinner.gif" class="loadingImg" alt="" />');
}

function loadingEnd(el, html) {
	el.html(html);
}

function loadJS(file, jsCallback, el) {
	var filepath = 'scripts/' + file;
	var successFtn = function () {
		if ($.isFunction(jsCallback)) {
			jsCallback();
		} else if ($.isFunction(window[jsCallback])) {
			window[jsCallback]();
		}
	}
	if (!$("script[src*='" + filepath + "']").length && $.inArray(filepath, loadedFiles) < 0) {
		loadedFiles.push(filepath);
		$.getScript(filepath).done(function () {
			successFtn();
		}).fail(function (jqxhr, settings, exception) {
			if (jqxhr.status == 200) {
				successFtn();
			} else {
				var i = $.inArray(filepath, loadedFiles);
				if (i > -1) {
					loadedFiles.splice(i, 1);
				}
				loadingEnd(el, '<p>' + msgStrs.errorgeneral + '</p>');
			}
		});
	} else {
		successFtn();
	}
}

function getDateTime(timeStr, dateOnly, locale, format) {
	if (timeStr) {
		var finalDateStr = '';
		if (timeStr.indexOf(' - ') > -1) {
			timeStrArr = timeStr.split(' - ');
			var d = newDateFromStr(timeStrArr[0], locale);
			finalDateStr += getDateStr(d, dateOnly, format);
			d = newDateFromStr(timeStrArr[1], locale);
			finalDateStr += ' - ' + getDateStr(d, dateOnly, format);
		} else {
			var d = newDateFromStr(timeStr, locale);
			finalDateStr = getDateStr(d, dateOnly, format);
		}
		return finalDateStr;
	} else {
		return '';
	}
}

function getDateStr(d, dateOnly, format) {
	var newTimeStr = '';
	var day = ('0' + d.getDate()).slice(-2);
	var month = ('0' + (d.getMonth() + 1)).slice(-2);
	var monthStr = msgStrs['month' + parseInt(month)];
	var format = format != undefined ? format : 5;
	if (format == 1) {
		newTimeStr = month + '/' + day + '/' + d.getFullYear();
	} else if (format == 2) {
		newTimeStr = day + '/' + month + '/' + d.getFullYear();
	} else if (format == 3) {
		newTimeStr = day + '-' + monthStr.substr(0, 3).toUpperCase() + '-' + d.getFullYear();
	} else if (format == 4) {
		newTimeStr = monthStr.substr(0, 3).toUpperCase() + ' ' + day + ', ' + d.getFullYear();
	} else if (format == 5) {
		newTimeStr = d.getFullYear() + '-' + month + '-' + day;
	} else  {
		// note to CarriersEdge: I added this to create a sixth formatting option, to format the date mm/dd/yy as requested in exercise 1.
		newTimeStr = month + '/' + day + '/' + d.getFullYear().toString().substr(2);
	}
	if (!dateOnly) {
		newTimeStr += ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
	}
	return newTimeStr;
}

function newDateFromStr(timeStr, locale) {
	var dateFormat = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	if (timeStr.length <= 10) {
		dateFormat = /(\d{4})-(\d{2})-(\d{2})/;
	}
	var offset = 0;
	var dateArray = dateFormat.exec(timeStr);
	if (dateArray.length > 4) {
		d = new Date(dateArray[1], dateArray[2] - 1, dateArray[3], dateArray[4], dateArray[5], dateArray[6], offset);
	} else {
		d = new Date(dateArray[1], dateArray[2] - 1, dateArray[3], 0, 0, 0, offset);
	}
	return d;
}