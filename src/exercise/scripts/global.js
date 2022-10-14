var tmplCache = {};
var loadedFiles = [];

(function (Handlebars) {
	Handlebars.registerHelper("msgStrs", function (prop, v) {
		var str = msgStrs[prop];
		return new Handlebars.SafeString(str);
	});
	Handlebars.registerHelper("formatDate", function (str, options) {
		// the date formatting helper can accept the following options:
		// dateFormat
		// 	a number between 1 and 6. Default is 5. This value is used in getDateStr function below to control how dates are formatted
		// 	eg. {{ formatDate modified format=1}}
		// dateOnly
		//	a boolean. If true, the date will not show the hours, minutes, and seconds. Default is false
		// 	eg. {{ formatDate modified dateOnly=true}}
		// locale
		//	a string containing the browsers locale. Currently not used within the application. Default is the default browser language, set in navigator.languages[0];
		//	eg. {{ formateDate modified locale="en-US"}}


		// first set the default values.
		let dateFormat = 5;
		let locale = navigator.languages[0];
		let dateOnly = false;

		// Now lets check options.hash, which is passed by handlebars, to see if any options were set. If so, overwrite the defaults.
		if (typeof options != undefined && typeof options.hash != undefined) {
			let errorPrefix = "formatDate helper param error: "
			if (options.hash.hasOwnProperty("dateFormat")) {
				if(typeof options.hash.dateFormat === "number" && options.hash.dateFormat >= 1 && options.hash.dateFormat <=6) {
					dateFormat = options.hash.dateFormat;
				} else {
					console.log(errorPrefix + "dateFormat must be a number between 1 and 5");
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