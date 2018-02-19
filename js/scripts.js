$(function(){if("undefined"!=typeof documents)var e=lunr(function(){this.ref("id"),this.field("title",{boost:10}),this.field("url"),this.field("body"),this.field("summary"),documents.forEach(function(e,t){var s=$.extend({id:t},e);this.add(s)},this)});$("#searchForm").submit(function(t){t.preventDefault();var s=$("#searchField").val(),i=e.search(s);$("#results").html("<h1>Search Results ("+i.length+")</h1>"),$("#results").append('<section id="searchResults"></section>'),$.each(i,function(e,t){entry=documents[t.ref],$("#searchResults").append('<article class="recipe"><h1><a href="'+entry.url+'">'+entry.title+'</a></h1><div class="image"><img src="'+entry.image+'"/></div><p>'+entry.summary+'</p><p><a class="button" href="'+entry.url+'">Read more</a></p></article>')})})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50cyIsImlkeCIsImx1bnIiLCJ0aGlzIiwicmVmIiwiZmllbGQiLCJib29zdCIsImZvckVhY2giLCJkb2MiLCJpbmRleCIsImVudHJ5IiwiZXh0ZW5kIiwiaWQiLCJhZGQiLCJzdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic2VhcmNoVGVybSIsInZhbCIsInJlc3VsdHMiLCJzZWFyY2giLCJodG1sIiwibGVuZ3RoIiwiYXBwZW5kIiwiZWFjaCIsInJlc3VsdCIsInVybCIsInRpdGxlIiwiaW1hZ2UiLCJzdW1tYXJ5Il0sIm1hcHBpbmdzIjoiQUFBQUEsRUFBRSxXQUVFLEdBQXlCLG1CQUFkQyxXQUNQLEdBQUlDLEdBQU1DLEtBQUssV0FDWEMsS0FBS0MsSUFBSSxNQUNURCxLQUFLRSxNQUFNLFNBQ1BDLE1BQU8sS0FFWEgsS0FBS0UsTUFBTSxPQUNYRixLQUFLRSxNQUFNLFFBQ1hGLEtBQUtFLE1BQU0sV0FFWEwsVUFBVU8sUUFBUSxTQUFTQyxFQUFLQyxHQUM1QixHQUFJQyxHQUFRWCxFQUFFWSxRQUNWQyxHQUFJSCxHQUNMRCxFQUNITCxNQUFLVSxJQUFJSCxJQUNWUCxPQUlYSixHQUFFLGVBQWVlLE9BQU8sU0FBU0MsR0FDN0JBLEVBQU1DLGdCQUVOLElBQUlDLEdBQWFsQixFQUFFLGdCQUFnQm1CLE1BQy9CQyxFQUFVbEIsRUFBSW1CLE9BQU9ILEVBSXpCbEIsR0FBRSxZQUFZc0IsS0FBSyx1QkFBeUJGLEVBQVFHLE9BQVMsVUFDN0R2QixFQUFFLFlBQVl3QixPQUFPLDBDQUVyQnhCLEVBQUV5QixLQUFLTCxFQUFTLFNBQVNWLEVBQU9nQixHQUM1QmYsTUFBUVYsVUFBVXlCLEVBQU9yQixLQUV6QkwsRUFBRSxrQkFBa0J3QixPQUFPLHdDQUEwQ2IsTUFBTWdCLElBQU0sS0FBT2hCLE1BQU1pQixNQUFRLHlDQUEyQ2pCLE1BQU1rQixNQUFRLGVBQWlCbEIsTUFBTW1CLFFBQVUsa0NBQW9DbkIsTUFBTWdCLElBQU0iLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAodHlwZW9mIGRvY3VtZW50cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGlkeCA9IGx1bnIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnJlZignaWQnKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywge1xuICAgICAgICAgICAgICAgIGJvb3N0OiAxMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkKCd1cmwnKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGQoJ2JvZHknKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGQoJ3N1bW1hcnknKTtcblxuICAgICAgICAgICAgZG9jdW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZG9jLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGluZGV4XG4gICAgICAgICAgICAgICAgfSwgZG9jKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChlbnRyeSk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCgnI3NlYXJjaEZvcm0nKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgc2VhcmNoVGVybSA9ICQoJyNzZWFyY2hGaWVsZCcpLnZhbCgpO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IGlkeC5zZWFyY2goc2VhcmNoVGVybSk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Jlc3VsdHMnLCByZXN1bHRzKTtcblxuICAgICAgICAkKCcjcmVzdWx0cycpLmh0bWwoJzxoMT5TZWFyY2ggUmVzdWx0cyAoJyArIHJlc3VsdHMubGVuZ3RoICsgJyk8L2gxPicpO1xuICAgICAgICAkKCcjcmVzdWx0cycpLmFwcGVuZCgnPHNlY3Rpb24gaWQ9XCJzZWFyY2hSZXN1bHRzXCI+PC9zZWN0aW9uPicpO1xuXG4gICAgICAgICQuZWFjaChyZXN1bHRzLCBmdW5jdGlvbihpbmRleCwgcmVzdWx0KSB7XG4gICAgICAgICAgICBlbnRyeSA9IGRvY3VtZW50c1tyZXN1bHQucmVmXTtcbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgZW50cnkgdG8gdGhlIGxpc3QuXG4gICAgICAgICAgICAkKCcjc2VhcmNoUmVzdWx0cycpLmFwcGVuZCgnPGFydGljbGUgY2xhc3M9XCJyZWNpcGVcIj48aDE+PGEgaHJlZj1cIicgKyBlbnRyeS51cmwgKyAnXCI+JyArIGVudHJ5LnRpdGxlICsgJzwvYT48L2gxPjxkaXYgY2xhc3M9XCJpbWFnZVwiPjxpbWcgc3JjPVwiJyArIGVudHJ5LmltYWdlICsgJ1wiLz48L2Rpdj48cD4nICsgZW50cnkuc3VtbWFyeSArICc8L3A+PHA+PGEgY2xhc3M9XCJidXR0b25cIiBocmVmPVwiJyArIGVudHJ5LnVybCArICdcIj5SZWFkIG1vcmU8L2E+PC9wPjwvYXJ0aWNsZT4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxufSk7XG5cbi8vICQuZ2V0SlNPTignL2NvbnRlbnQuanNvbicsIGZ1bmN0aW9uKGRhdGEpe1xuLy8gICB3aW5kb3cuc2VhcmNoRGF0YSA9IGRhdGE7XG5cblxuXG4vLyAkLmVhY2goZGF0YSwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKXtcbi8vICAgdmFyIGVudHJ5ID0gJC5leHRlbmQoeyBpZDogaW5kZXggfSwgdmFsdWUpO1xuLy9cbi8vICAgbHVucihmdW5jdGlvbigpe1xuLy8gICAgIHRoaXMuZmllbGQoJ2lkJyk7XG4vLyAgICAgdGhpcy5maWVsZCgndGl0bGUnLCB7IGJvb3N0OiAxMCB9KTtcbi8vICAgICB0aGlzLmZpZWxkKCdzdW1tYXJ5Jyk7XG4vL1xuLy8gICAgIHRoaXMuYWRkKGVudHJ5KTtcbi8vICAgfSk7XG4vL1xuLy8gfSk7XG4vLyB9KTtcblxuXG5cbi8vIH0pO1xuIl19
