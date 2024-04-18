(function(A) {
     
	if (!Array.prototype.forEach)
		A.forEach = A.forEach || function(action, that) {
			for (var i = 0, l = this.length; i < l; i++)
				if (i in this)
					action.call(that, this[i], i, this);
			};

		})(Array.prototype);

		var
		mapObject,
		markers = [],
		markersData = {
			'Sightseeing': [
			{
				name: 'Open Bus',
				location_latitude: 48.865633, 
				location_longitude: 2.321236,
				map_image_url: 'map/img/thumb_map_1.jpg',
				name_point: 'Open Bus',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
				get_directions_start_address: '',
				phone: '+3934245255',
				url_point: 'single_tour.html'
			},
			{
				name: 'Senna River Tour',
				location_latitude: 48.854183,
				location_longitude: 2.354808,
				map_image_url: 'map/img/thumb_map_1.jpg',
				name_point: 'Senna River Tour',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
				get_directions_start_address: '',
				phone: '+3934245255',
				url_point: 'single_tour.html'
			}
			]
		};


		var mapOptions = {
			zoom: 15,
			center: new google.maps.LatLng(22.624714, 120.282033),
			mapTypeId: google.maps.MapTypeId.ROADMAP,

			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DEFAULT,
				position: google.maps.ControlPosition.TOP_LEFT
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.TOP_RIGHT
			},
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.TOP_RIGHT
			},
				scrollwheel: true,
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_TOP
			},

			styles: [
				{
					"featureType": "administrative.country",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative.province",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "administrative.locality",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "administrative.neighborhood",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative.land_parcel",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "landscape.man_made",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "landscape.natural.landcover",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "landscape.natural.terrain",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "poi.attraction",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "poi.business",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "poi.government",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "poi.medical",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "poi.place_of_worship",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "poi.school",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "poi.sports_complex",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.highway.controlled_access",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "transit.line",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit.station.airport",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit.station.bus",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit.station.rail",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				}
			]
		};
		var
		marker;
		mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);

		function addLocationButton(map) {
			const locationButton = document.createElement("button");
		  
			locationButton.textContent = "移動到你現在的位置！";
			locationButton.classList.add("custom-map-control-button");
			map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
			locationButton.addEventListener("click", () => {
			  // Try HTML5 geolocation.
			  if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
				  (position) => {
					const pos = {
					  lat: position.coords.latitude,
					  lng: position.coords.longitude,
					};
		  
					if (!infoWindow) {
					  infoWindow = new google.maps.InfoWindow();
					}
		  
					infoWindow.setPosition(pos);
					infoWindow.setContent("Boom！在這裡！");
					infoWindow.open(map);
					map.setCenter(pos);
				  },
				  () => {
					handleLocationError(true, infoWindow, map.getCenter());
				  }
				);
			  } else {
				handleLocationError(false, infoWindow, map.getCenter());
			  }
			});
		  }

		  
		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(
			browserHasGeolocation
			? "Error: The Geolocation service failed."
			: "Error: Your browser doesn't support geolocation."
		);
		infoWindow.open(map);
		}
		
		addLocationButton(mapObject);

		var Spots = document.getElementById('spotsData').getAttribute('data-spots');
		var allSpots = JSON.parse(Spots);

		allSpots.forEach(function (spot) {
			var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(spot.lat, spot.lon),
			  map: mapObject,
			  icon: {
				url: 'map/img/pins/PIN.png',
				scaledSize: new google.maps.Size(32, 32) // 初始大小
			  }			});
		  
			google.maps.event.addListener(marker, 'click', function () {
			  closeInfoBox();
			  getInfoBox(spot).open(mapObject, this);
			  mapObject.setCenter(new google.maps.LatLng(spot.lat, spot.lon));
			});
			
			google.maps.event.addListener(mapObject, 'zoom_changed', function () {
				var zoomLevel = mapObject.getZoom();
				var newIconSize = 32; // 初始大小
			
				// 根据缩放级别调整标记符号的大小
				if (zoomLevel <= 10) {
				  newIconSize = 32;
				} else if (zoomLevel <= 15) {
				  newIconSize = 48;
				} else {
				  newIconSize = 64;
				}
			
				// 更新标记符号的大小
				marker.setIcon({
				  url: 'map/img/pins/PIN.png',
				  scaledSize: new google.maps.Size(newIconSize, newIconSize)
				});
			  });
		  });
		  
		
		// for (var key in markersData)
		// 	markersData[key].forEach(function (item) {
		// 		marker = new google.maps.Marker({
		// 			position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
		// 			map: mapObject,
		// 			icon: 'map/img/pins/Walking.png',
		// 		});

		// 		if ('undefined' === typeof markers[key])
		// 			markers[key] = [];
		// 		markers[key].push(marker);
		// 		google.maps.event.addListener(marker, 'click', (function () {
		// 			closeInfoBox();
		// 			getInfoBox(item).open(mapObject, this);
		// 			mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
		// 		}));
					
		// 	});
	

		function hideAllMarkers () {
			for (var key in markers)
				markers[key].forEach(function (marker) {
					marker.setMap(null);
				});
		};

		function closeInfoBox() {
			$('div.infoBox').remove();
		};

		function getInfoBox(item) {
			return new InfoBox({
				content:
				'<div class="marker_info" id="marker_info">' +
				// '<img src="" alt="Image"/>' +
				'<h3>'+ item.location +'</h3>' +
				'<span><b>開放時間：</b>'+ item.opentime +'</span>' +
				'<div><span><b>好吃好玩：</b>'+ item.shop +'</span></div>' +
				'<div><span><b>情報：</b>'+ item.description +'</span></div>' +
				'<div class="marker_tools">' +
				'<form action="'+ item.googleMap +'" method="get" target="_blank" style="display:inline-block""><button type="submit" value="Get directions" class="btn_infobox_get_directions">GoogleMap導航</button></form>' +
					// '<a href="tel://'+ item.phone +'" class="btn_infobox_phone">'+ item.phone +'</a>' +
					'</div>' +
					'<a href="/skateboard.map.spot/spot/'+ item.id + '" target="_blank" class="btn_infobox">更多板點資訊</a>' +
				'</div>',
				disableAutoPan: false,
				maxWidth: 0,
				pixelOffset: new google.maps.Size(10, 125),
				closeBoxMargin: '5px -20px 2px 2px',
				closeBoxURL: "map/img/close_infobox.png",
				isHidden: false,
				alignBottom: true,
				pane: 'floatPane',
				enableEventPropagation: true
			});
		};




