// import lunr from "lunr";
const lunr = require("lunr");

const data_url = '/recipes/search/index.json';

// import '../../_sass/screen.scss';

async function fetchDataAsync(url) {
    const response = await fetch(url);
    values = await response.json();

    console.log('values', values);
    let index = lunr(function () {
        this.ref('id');
        this.ref('id');
        this.field('title', { boost: 20 });
        this.field('alt_title', { boost: 20 });
        this.field('url');
        this.field('category', { boost: 10 });
        this.field('tags', { boost: 5 });
        this.field('content');
        this.field('summary');

        values.forEach(function (doc) {
            // console.log('adding ', doc);
            this.add(doc)
        }, this);
    });

    console.log('index', index);

    return index;
    // console.log(await response.json());
}


document.addEventListener("DOMContentLoaded", function(){

    let search = document.getElementById('searchForm');
    // console.log('search2', search);
    // let data = load(data_url);
    let data = fetchDataAsync(data_url);
    let index = '';
    console.log('data', data);
    

    // fetch(data_url).then(r => r.json())
    //     .then(data => {
    //         index = lunr(function(){
    //             this.ref('id');
    //             this.field('title', { boost: 20 });
    //             this.field('alt_title', { boost: 20 });
    //             this.field('url');
    //             this.field('category', { boost: 10 });
    //             this.field('tags', { boost: 5 });
    //             this.field('content');
    //             this.field('summary');

    //         // console.log(data);
    //         data.forEach(function(doc){
    //             console.log('adding ', doc);
    //             index.add(doc);
    //         }, index);
 
    //     })
    //     .catch(e => console.log("Something went wrong", e));
    // });
    // console.log('index', index);
    // console.log('search', index.search('tortilla'));

    

});

// $(function() {

    // if (typeof documents !== 'undefined') {
    //     var idx = lunr(function() {
    //         this.ref('id');
    //         this.field('title', {
    //             boost: 20
    //         });
    //         this.field('alt_title', {
    //             boost: 20
    //         });
    //         this.field('url');
    //         this.field('category', { boost: 10 });
    //         this.field('tags', { boost: 5 });
    //         this.field('content');
    //         this.field('summary');

    //         documents.forEach(function(doc, index) {
    //             var entry = $.extend({
    //                 id: index
    //             }, doc);
    //             this.add(entry);
    //         }, this);
    //     });
    // }

    // $('#searchForm').submit(function(event) {
    //     event.preventDefault();

    //     var searchTerm = $('#searchField').val();
    //     var results = idx.search(searchTerm);

    //     // console.log('results', results);

    //     $('#results').html('<h1>Search Results (' + results.length + ')</h1>');
    //     $('#results').append('<section id="searchResults"></section>');

    //     $.each(results, function(index, result) {
    //         entry = documents[result.ref];
    //         // Append the entry to the list.
    //         $('#searchResults').append('
    //         <article class="recipe">
    //           <h1><a href="' + entry.url + '">' + entry.title + '</a></h1>
    //           <div class="image"><img src="' + entry.image + '"/></div>
    //           <p>' + entry.summary + '</p>
    //           <p><a class="button" href="' + entry.url + '">Read more</a></p>
    //         </article>');
    //     });
    // });

// });

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
