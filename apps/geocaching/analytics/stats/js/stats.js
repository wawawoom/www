(function () {

	var raw = null;
	var GCs = {};

	var findIndex = function(url, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].page === url) {
				return i;
			}
		}
		return -1;
	}

	var getStats = function () {
		
		fetch('./factory.php')
			.then((resp) => resp.json()) // Transform the data into json
			.then(function(data) {
				raw = data;
				buildStats();
				buildUI();
			});
	}

	var buildStats = function () {

		raw.forEach(function(entry) {
			
			var match, GC;

			if (entry.STA_Referer && entry.STA_Referer !== "") {
				// Try to get the GC code
				match = entry.STA_Referer.match(/GC[A-Z0-9]+/);

				if (match && match[0]) {
					GC = match[0];

					// And in global GCs array
					if (!GCs[GC]) {
						GCs[GC] = [];
					}
					entry.GC = GC;

					var indx = findIndex(entry.STA_Referer, GCs[GC]);

					if (indx > -1) {
						GCs[GC][indx].count = GCs[GC][indx].count + 1;
					} else {
						GCs[GC].push({
							page: entry.STA_Referer,
							count: 1
						});
					}
				
				}

			}

		});

	}

	var buildUI = function () {

		var html = '';

		for (var key in GCs) {

			html += `<h2>${key}</h2>`;

			html += `<div class="table-responsive">
				<table class="table table-striped table-sm">
					<thead>
						<tr>
							<th>Count</th>
							<th>Link</th>
						</tr>
					</thead>
					<tbody>`;
			
			var GC = GCs[key];
			GC.sort(function(a,b) {return b.count - a.count});

			for (var pageKey in GC) {
				
				var page = GC[pageKey];
				var count = page.count;
				var link = page.page;
				var displayedLink = link.replace('http://wawawoom.fr/geocaching/GC84ZZG/', '');

				html += `<tr>
							<td>${count}</td>
							<td><a href="${displayedLink}" target="_blank">${displayedLink}</a></td>
						</tr>`;
			}
						
						
			html += `</tbody>
				</table>
			</div>`;

		}

		document.getElementById("content").innerHTML = html;

	}

	var init = function () {

		getStats();

	};

	init();


})();