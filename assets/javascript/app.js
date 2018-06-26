var bands = ["Thriller by Michael Jackson","When Doves Cry by Prince", "I Wanna Dance With Somebody by Whitney Houston", "Everybody (Backstreet’s Back) by the Backstreet Boys", 
"Billie Jean by Michael Jackson", "No Scrubs by TLC", "Yellow by Coldplay", "End of the Road by Boyz II Men", "Bohemian Rhapsody by Queen", "Sweet Child O'Mine by Guns N' Roses" ];


function makeButtons(){ 
	$('#buttonsView').empty();
	for (var i = 0; i < bands.length; i++){
		var a = $('<button>') 
		a.addClass('band'); 
		a.attr('data-name', bands[i]); 
		a.text(bands[i]); 
		$('#buttonsView').append(a); 
	}
}


$("#addBand").on("click", function(){

	
	var band = $("#band-input").val().trim();
	bands.push(band);
	makeButtons();
	return false; 
})

function displayGifs(){
	var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=10&api_key=y0fp0dE7jamRjFEQb4nm41cn0NJXKRSr";

		
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
			
				var gifDiv = $('<div class=gifs>');
				var bandGif = $('<img>');
					bandGif.attr('src', results[i].images.fixed_height_still.url);
					bandGif.attr('title', "Rating: " + results[i].rating);
					bandGif.attr('data-still', results[i].images.fixed_height_still.url);
					bandGif.attr('data-state', 'still');
					bandGif.addClass('gif');
					bandGif.attr('data-animate', results[i].images.fixed_height.url);
			
				gifDiv.append(bandGif)
			

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}


$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



$(document).on("click", ".band", displayGifs);
makeButtons();