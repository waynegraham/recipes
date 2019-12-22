$(function() {

    if (typeof documents !== "undefined") {
        var idx = lunr(function() {
            this.ref("id");
            this.field("title", {
                boost: 20
            });
            this.field("alt_title", {
                boost: 20
            });
            this.field("url");
            this.field("category", {
                boost: 10
            });
            this.field("tags", {
                boost: 5
            });
            this.field("content");
            this.field("summary");

            documents.forEach(function(doc, index) {
                var entry = $.extend({
                    id: index
                }, doc);
                this.add(entry);
            }, this);
        });
    }

    $("#searchForm").submit(function(event) {
        event.preventDefault();

        var searchTerm = $("#searchField").val();
        var results = idx.search(searchTerm);

        console.log('results', results.length);

        $("#results").html('<h1>Search Results (' + results.length + ")</h1>");
        $("#results").append("<section id=\"searchResults\"></section>");

        $.each(results, function(index, result) {
            entry = documents[result.ref];
            // Append the entry to the list.
            $("#searchResults").append('<article class="recipe"><h1><a href="' + entry.url + '">' + entry.title + '</a></h1><div class="image"><a href="' + entry.url + '"><img src="' + entry.image + '"/></a></div><p>' + entry.content + '</p><p><a class="button" href="' + entry.url + '">Read more</a></p></article>');
        });
    });

    $(function() {
        $('.recipe img').imgPin();
        $('a[href*=\\#]').on('click', function(event) {
            var el = $(this.hash);
            if (el.length > 0) {
                event.preventDefault();
                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top - 50
                }, 500);
            }
        });
    });



});
