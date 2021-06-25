  var movies = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.value);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
			dataType: 'jsonp',
            url: '../locator_search?key=%QUERY',
            filter: function (movies) {
				//console.log(movies);
                // Map the remote source JSON array to a JavaScript object array
                return $.map(movies, function (movie) {
                    return {
                          //value: (movie.FullName ? movie.FullName : 1) + ' ' + (movie.milePost ? movie.milePost : 1),
						  value: (movie.st_number ? (movie.st_number + ' ') : '') + 
						  (movie.FullName ? (movie.FullName + ', ') : '') + 
						  (movie.city ? (movie.city + ', ') : '') + 
						  (movie.state ? (movie.state + ' ') : '') + 
						  (movie.zip_code ? (movie.zip_code + ' ') : '') + 
						  (movie.milePost ? (movie.milePost + ' ') : ''),
						  values:[{FullName: movie.FullName, FullName: movie.FullName, road_code:movie.road_code, 
						  pointx:movie.pointx, pointy:movie.pointy, county:movie.county, district:movie.district, Type:movie.Type,neighborhood:movie.neighborhood,city:movie.city,state:movie.state,zip_code:movie.zip_code
						  }],
                        values2:movies						
                    };
                });
            }
        },
		limit: 15
    });
 
 // Initialize the Bloodhound suggestion engine
    movies.initialize();

	  // Instantiate the Typeahead UI
    $('#peel9_search .typeahead').typeahead(null, {
        displayKey: 'value',
        source: movies.ttAdapter()
    });
	//Control the Divs Based on Search Input Length

    $('#peel9_search .typeahead').on('typeahead:selected', function (e, datum) {
		$('#addrs').val(datum.values[0].FullName);
		$('#uc').val(datum.values[0].FullName);
		$('#owner_address_log').val(datum.values[0].FullName);
		$('#addrs22').val(datum.values[0].FullName);
		$('#nghbd22').val(datum.values[0].neighborhood);
		$('#state22').val(datum.values[0].state);
		$('#county22').val(datum.values[0].county);
		$('#zip22').val(datum.values[0].zip_code);
		$('#city22').val(datum.values[0].FullName);
		$('#lat').val(datum.values[0].pointy);
		$('#lng').val(datum.values[0].pointx);
		$('#lat22').val(datum.values[0].pointy);
		$('#lng22').val(datum.values[0].pointx);
		$('#locality').val(datum.values[0].city);
		$('#neighborhood').val(datum.values[0].neighborhood);
		$('#administrative_area_level_1').val(datum.values[0].state);
		$('#administrative_area_level_2').val(datum.values[0].county);
		$('#postal_code').val(datum.values[0].zip_code);
	initMapPeel9();	
    });

		$('#peel9_locator_add').click(function () {		
                    $(document).ready(function () {
                        $('.iframe').colorbox({
                            iframe: true,
                            width: $(window).width() * width,
                            height: $(window).height() * height,
                            href:"../LocatorDatabase",
                            onClosed: function () {
                                var timesRun = 0;
                                var interval = setInterval(function () {
                                    timesRun += 1;
                                    if (timesRun === 1) {
                                        clearInterval(interval);
                                    }                                   
                                }, 100);
                            },
                        });

                    });
                });
 
	function initMapPeel9() {
  var get_center = {lat: parseFloat(document.getElementById('lat').value), lng: parseFloat(document.getElementById('lng').value)};  
   var get_center2 = [parseFloat(document.getElementById('lat').value), parseFloat(document.getElementById('lng').value)]; 
    var marker = L.marker(get_center2, {
      title: 'Mile Post'
    }).addTo(map);
  map.setView(get_center2, 19);

  

	}
	
	function addMap(){
let map_skin = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png';

						if ('{{darkMode}}' == 'true') {
							map_skin = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
						}


						mapLink = '<a href="https://wiki.openstreetmap.org/wiki/Tile_servers</a>';
						var osm = L.tileLayer(
							map_skin, {
							attribution: '&copy; ' + mapLink + ' Contributors',
							maxZoom: 24,
						}).addTo(map);
var layerscontrol = L.control.fullscreen().addTo(map);
	L.control.layers({
									"Base": osm,
									'Gray': L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'),
									"Google": L.tileLayer('https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
										attribution: 'google'
									})
								}, {}, {

								}, { position: 'topleft', collapsed: false }).addTo(map);
} 