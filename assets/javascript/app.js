$(document).ready(function () {

    var animalArray = ["cat", "dog", "bird", "mouse", "rabbit", "elephant", "ostrich", "otter"];

    function renderButtons() {

        for (var i = 0; i < animalArray.length; i++) {

            var a = $("<button>");
            a.addClass("animal btn btn-primary");
            a.attr("data-animal", animalArray[i]);
            a.text(animalArray[i]);
            $("#animal-buttons").append(a);

        }
    };

    function displayAnimalGifs() {

        $("#gifs-appear-here").empty();

        var animal = $(this).attr("data-animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var animalImage = $("<img>");

                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalDiv.addClass("col animal-gif");

                    animalDiv.append(animalImage);
                    animalDiv.append(p);



                    $("#gifs-appear-here").prepend(animalDiv);
                }
            });
    };


    // had to google search for this play/stop functionality, couldn't find something directly from giphy //
    
    $(document).on("click", "img", function () {

        var src = $(this).attr("src");
        console.log(src);

        if ($(this).hasClass("playing")) {
            //stop
            $(this).attr("src", src.replace(".gif", "_s.gif"))
            $(this).removeClass("playing");

        } else {
            //play
            $(this).addClass("playing");
            $(this).attr("src", src.replace("_s.gif", ".gif"))
        }


    });


    $("#add-animal").on("click", function (event) {
        event.preventDefault();




        var animal = $("#animal-input").val().trim();


        if (animal) {

            animalArray.push(animal);

            $("#animal-input").val("");
            $("#animal-buttons").empty();
            renderButtons();



        }



    });


    renderButtons();

    $(document).on("click", ".animal", displayAnimalGifs)



});

