var movies = [
  "Finance",
  "Banking",
  "Landing",
  "Banking Investment",
  "Accounting",
  "Information Technology",
  "Arts",
  "Chartered accountant",
  "Chartered Financial Analyst"
];

function displayMovieInfo() {
  var movie = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=bJjSLKEDS8Bu4t8ns9wXuKd8jP0HscUa&q=&limit=10&offset=0&rating=G&q=" +
    movie;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#food-view").empty();
    var total = response.pagination.count;
    for (var i = 0; i < total; i++) {
      var still = response.data[i].images.original_still.url;
      var original_gif = response.data[i].images.original.url;
      $("#food-view").append(
        "<img src='" +
          still +
          "' data-still='" +
          still +
          "' data-animate='" +
          original_gif +
          "' data-state='still' class='img-fluid'/>"
      );
    }
  });
}
$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state == "still") {
    console.log(state);
    var animate = $(this).attr("data-animate");
    $(this).attr("src", animate);
    $(this).attr("data-state", "animate");
  } else {
    var still = $(this).attr("data-still");
    $(this).attr("src", still);
    $(this).attr("data-state", "still");
  }
});

function renderButtons() {
  $("#button-list").empty();
  for (var i = 0; i < movies.length; i++) {
    var a = $("<button class='btn btn-light' style='margin:5px;'>");
    a.addClass("movie");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);
    $("#button-list").append(a);
  }
}

$("#add-food").on("click", function(event) {
  event.preventDefault();
  var movie = $("#food-input")
    .val()
    .trim();
  movies.push(movie);
  renderButtons();
});
$(document).on("click", ".movie", displayMovieInfo);

renderButtons();
