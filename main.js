"use strict";

$.getJSON( "concerts.json", function(data) {
				let concertEvents = [];
				var htmlElements = '';

				for (var i = 0; i < data.results.length; i++) {
					concertEvents.push
					({
						nafn:data.results[i].eventDateName,
						stage:data.results[i].name,
						date:data.results[i].dateOfShow,
						groupname:data.results[i].userGroupName,
						hallname:data.results[i].eventHallName,
						img:data.results[i].imageSource
					});
				}

				for (var j = 0; j < data.results.length; j++) {
					moment.locale("is");

					htmlElements += '<span class="pure-u-1-3" id="third" alt="'+ concertEvents[j].hallname +'"> <p> Event date name: ' + concertEvents[j].nafn + '</p><p> Nafn:' + concertEvents[j].stage + '</p><p> Dagsetning: ' + moment(concertEvents[j].date).format("LLL") + '</p><p> Group nafn: ' + concertEvents[j].groupname + '</p><p> Staðsetning: ' + concertEvents[j].hallname + '</p><p><img src="' + concertEvents[j].img  + '"></p></span>';

					document.getElementById('af').innerHTML = htmlElements;
				}
			});

			(function() {
				var $spans = $('#third');
				var $search = $('#filter-search');
				var cache = [];

				$spans.each(function() {
					cache.push({
						element: this,
						text: this.alt.trim().toLowerCase()
					});
				});

				function filter() {

					cache.forEach(function(span) {
						var index = 0;
						if (this.value.trim().toLowerCase()) {
							index = span.text.indexOf(this.value.trim().toLowerCase());
						}

						span.element.style.display = index === -1 ? 'none' : '';
					});
				}

				if ('oninput' in $search[0]) {
					$search.on('input', filter);
				} else {
					$search.on('keyup', filter);
				}
			}());