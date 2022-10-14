function pagethree() {
	$.getJSON('json/data.json').done(function (d) {
		var newHTML = getTemplate('pagethree', d);
		loadingEnd($('.content'), newHTML);
        
        $('.fn a, .ln a').click(function() {
            alert("username: " + $(this).attr('href'));
            return false;
        });

        $('.place a').click(function() {
            alert("place id: " + $(this).attr('href'));
            return false;
        });

        $('.delete').click(function() {
            alert("I am deleting " + $(this).attr('href'));
            return false;
        });

        $('.edit').click(function() {
            alert("I am editing " + $(this).attr('href'));
            return false;
        });
	});
}