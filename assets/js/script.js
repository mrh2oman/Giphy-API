$(document).ready(function () {

	var topics = {
		searches: [
		"Rick and Morty", "Mr.PoopyButthole", "Mr Meeseeks", "Dawn of the Dead 1978", "Psych", "Batman", "Bane", "Joker", "Rafi", "Ruxin", "Hot Fuzz", "Shaun of the Dead", "The World's End", "Cat Fails" 
		],
		buttons: function () {
			for (var i = 0; i < topics.searches.length; i++) {
				var screenButton = $("<button>");
				screenButton.attr("data-search", topics.searches[i]);
				screenButton.addClass("btns btn btn-lg btn-link");
				screenButton.text(topics.searches[i]);
				$("#btnsSpot").append(screenButton);
			}
		},
		userSearch: function (user) {
			user.preventDefault();
			var searchUser = $("#user-search").val();

			if (topics.searches.indexOf(searchUser) < 0 && searchUser.length > 0) {

				topics.searches.push(searchUser);
				var userBttn = $("<button>");
				userBttn.attr("data-search", searchUser);
				userBttn.addClass("btns btn btn-lg btn-link btn--blue");
				userBttn.text(searchUser);
				$("#btnsSpot").append(userBttn);
				$("#user-search").val("");

			}
		},

		displayResults: function (user) {
			$("#displayGif").empty();
			user.preventDefault();
			var query = $(this).data("search");
			var key = "&api_key=dc6zaTOxFJmzC";
			var limit = "&limit=10";
			var urlA = "https://api.giphy.com/v1/gifs/search?q=" + query + limit + key;
			console.log(urlA);

			$.ajax({
				url: urlA,
				method: "GET"
			}).done(function(output) {
				for (var j = 0; j < output.data.length; j++) {
					var gifLocation = $("<div>");

					gifLocation.addClass("gifDiv");

					var activeLink = output.data[j].images["fixed_height"].url;
					var deactiveLink = output.data[j].images["fixed_height_still"].url;
					var newImg = $('<img>');
					var rating = output.data[j].rating;
					console.log(rating);
					var ratingsP = $("<p>");
					ratingsP.addClass("ratingsP");
					ratingsP.text("Rating is " + rating);
					newImg.attr('src', deactiveLink);
					newImg.attr('data-animate', activeLink);
					newImg.attr('data-still', deactiveLink);
					newImg.attr('data-state', "still")
					newImg.addClass('gif');
					gifLocation.append(newImg);
					gifLocation.prepend(ratingsP);

					$("#displayGif").append(gifLocation);


				}

				$(".gif").on("click", function () {
					var state = $(this).attr("data-state");
					if (state === "still") {
						$(this).attr("src",
							$(this).data("animate"));
						$(this).attr("data-state", "animate");

					} else {
						$(this).attr("src",
							$(this).data("still"));
						$(this).attr("data-state", "still");
					}
				});
			});
		},


	}
	topics.buttons();

	$("#clickSearch").click(topics.userSearch);
	$(document).on("click", ".btns", topics.displayResults);

});
