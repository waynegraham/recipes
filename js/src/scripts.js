$(function() {
    var idx = lunr(function() {
        this.ref('id');
        this.field('title', {
            boost: 10
        });
        this.field('url');
        this.field('body');
        this.field('summary');

        documents.forEach(function(doc, index) {
            var entry = $.extend({id: index}, doc);
            this.add(entry);
        }, this);
    });

    $('#searchForm').submit(function( event ){
         event.preventDefault();

         var searchTerm = $('#searchField').val();
         var results = idx.search(searchTerm);

         // console.log('results', results);

         $('#results').html('<h1>Search Results (' + results.length +')</h1>');
         $('#results').append('<ul id="searchResults"></ul>');

         $.each(results, function(index, result){
             entry = documents[result.ref];
             // Append the entry to the list.
             $('#searchResults').append('<li><a href="' + entry.url + '">' + entry.title + '</li>');
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
