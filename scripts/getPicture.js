$(function () {
	var currentQuery;
	var currentPage;

	$('.btn_search').click(searchAction);
	
	$('.pagination a').click(function(e) {
		e.preventDefault();
		var value = $(this).data('page');
		switch (value) {
			case "prev":
				if (currentPage > 1) {
				currentPage--;
				}
				break;

			case "next":
				if (currentPage < 9) {
					currentPage++;
				}
				break;

			default:
				currentPage = parseInt(value);
		}
		searchPhotos(currentQuery, currentPage);
		return false;
	});

	function searchAction() {
		var textSearch = $('.text_search').val();
		if (textSearch == "") {
			$('.alert').show();
			return;
		}
		currentQuery = textSearch;
		currentPage = 1;

		$('.alert').hide();
		$('.pagination').hide();
		searchPhotos(currentQuery, currentPage);
	}

	function searchPhotos(textSearch, page) {
		var data = {
			'method': 'flickr.photos.search',
			'api_key': '70743884d6864d2e7a2a417983682da5',
			'format': 'json',
			'text': textSearch,
			'per_page': 12,
			'page': page
		}
		$.getJSON('https://flickr.com/services/rest?jsoncallback=?', data)
			.done(onPhotosLoaded);
	}

	function onPhotosLoaded(data) {
		$('.pagination').show();
 		$('#search-result').empty();

		$.each(data.photos.photo, function(i,item){
    		var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
    		var originalPhotoURL = 'http://flickr.com/photo.gne?id='+item.id;

    		$('#search-result').append('<div class="thumbnail photo"><a class="photo-link" href="'
    			+originalPhotoURL+'"target="_blank"><img class="photo-img" src='
    			+photoURL+'></a><div class="caption '+item.id+'"><p class="photoTitle">'+item.title+'</p></div></div>');
		});
	}
});