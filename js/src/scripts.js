$(function() {

    if (typeof documents !== 'undefined') {
        var idx = lunr(function() {
            this.ref('id');
            this.field('title', {
                boost: 20
            });
            this.field('alt_title', {
                boost: 20
            });
            this.field('url');
            this.field('category', { boost: 10 });
            this.field('tags', { boost: 5 });
            this.field('content');
            this.field('summary');

            documents.forEach(function(doc, index) {
                var entry = $.extend({
                    id: index
                }, doc);
                this.add(entry);
            }, this);
        });
    }

    $('#searchForm').submit(function(event) {
        event.preventDefault();

        var searchTerm = $('#searchField').val();
        var results = idx.search(searchTerm);

        // console.log('results', results);

        $('#results').html('<h1>Search Results (' + results.length + ')</h1>');
        $('#results').append('<section id="searchResults"></section>');

        $.each(results, function(index, result) {
            entry = documents[result.ref];
            // Append the entry to the list.
            $('#searchResults').append('<article class="recipe"><h1><a href="' + entry.url + '">' + entry.title + '</a></h1><div class="image"><img src="' + entry.image + '"/></div><p>' + entry.summary + '</p><p><a class="button" href="' + entry.url + '">Read more</a></p></article>');
        });
    });


});

// $.getJSON('/content.json', function(data){
//   window.searchData = data;



// $.each(data, function(index, value){
//   var entry = $.extend({ id: index }, value);
//
//   lunr(function(){
//     this.field('id');
//     this.field('title', { boost: 10 });
//     this.field('summary');
//
//     this.add(entry);
//   });
//
// });
// });



// });
