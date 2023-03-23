function onMapClick(e) {
    var txt = map.project([e.latlng.lat, e.latlng.lng], map.getMaxZoom());
    var uid = generateSerial(10);
    var mid = countmarker[""+markertype] + 1;
    var x = Math.floor(txt.x);
    var y = Math.floor(txt.y);
    var under = false;
    L.marker([e.latlng.lat, e.latlng.lng], {uid: uid, type: markertype, icon: window[markertype+'Icon'], title: "Id: "+uid, under: under}).bindPopup('<input type="text" value="['+x+','+y+']" class="py-2 px-4 border rounded text-xs w-full text-center" onclick="select()" /><br><span class="py-2 px-4 text-xs w-full text-center"> UID : '+uid+' MID : '+mid+'</span><br><span class="py-2 px-4 text-xs w-full text-center"><input class="under-point" type="checkbox" id="devbox'+uid+'" data-cbxid="'+uid+'" /> Under</span><br /><a class="delete-point underline mt-2 font-bold inline-block" style="color:red!important;" href="#!">Supprimer</a>', {maxHeight : 350, minWidth : 350}).on('click', updateCurrentMarker).addTo(map);
    countmarker[""+markertype] += 1;
    userMarkers.push(uid);
    var datam = [uid, mid, markertype, x, y, under];
    $.post('api/dev/add', {data : datam}, function(res) {
		if (typeof(res.ok) != "undefined")
			console.log(res.ok)
		else if (typeof(res.error) != "undefined")
			alert("error "+res.error)
		else
			alert("unkown error")
    });
};

function generateSerial(len) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = len;
    var randomstring = '';

    for (var x=0;x<string_length;x++) {

       var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);

    }
    return randomstring;
}

function unproject(coord) {
    return map.unproject(coord, map.getMaxZoom());
}

function updateCurrentMarker() {
    currentMarker = this;
}

function popUpOpen(e) {
    let uid = e.popup._source.options.uid
    let checkbox = $("#devbox"+uid)
    if ((checkbox) && (e.popup._source.options.under)) checkbox.prop('checked', 'checked')
}

var currentMarker;
var userMarkers = [];
var markertype = 'ferblanc';
var countmarker = {};
var mgroup = [
    'pupe','viandemyst','sceausacre',
    'ferblanc','cristal','eclatcm','noyauc','electroc','artefact','ffeu','fbrume','pomme','grenouille','lezard','crabe',
    'champitoile','fruitharra','nilotpalotus','padisachidee','pechezaytun','rosesum',
    'viparyas','noixajilenakh','scarabee','quandong','anguille'
]; // ,'aranara','aranara2','kalpalotus'
var DBMarkers = L.layerGroup();

// Initialisation de la carte
var map = new L.Map('devmap', {
    center : [0,0],
    zoom : 2,
    zoomControl: false
});

L.tileLayer('media/tilesteyvat341/{z}/{x}/{y}.jpg', {
    attribution: '<a href="https://www.youtube.com/channel/UCbg8iC6Tw7de2URdwp3pyZQ/">TMK World</a>',
    maxZoom: 7,
    minZoom: 2,
    continuousWorld: true,
    maxBoundsViscosity: 0.8,
    noWrap: true,
    errorTileUrl : 'media/tilesteyvat34/empty.png'
}).addTo(map);

// map.zoomControl.setPosition('topright');
map.setMaxBounds(new L.latLngBounds(unproject([2048,4096]), unproject([28672,28672])));

// Génération des marqueurs existants

function initmarkers() {

    // Depuis le fichiers JS

    mgroup.forEach(function(group) {
        // console.log(group);
        // console.table(window['list'+group]);
        if (window['list'+group]) {
            window['list'+group].forEach(function(marker) {
                newmarker = L.marker(unproject(marker[1]), {icon : window[group+'Icon'], title: "Id: "+marker[2].mid, riseOnHover: true}).addTo(DBMarkers);
            });
            countmarker[""+group] = window['list'+group].length;
        } else {
            countmarker[""+group] = 0;
        };
    });
    map.addLayer(DBMarkers);
    // console.table(countmarker);

    // Depuis la DB de dev

    $.get('api/dev/import', function(res) {
        res.forEach(function(marker) {
			// console.log(marker.under)
            newmarker = L.marker(unproject([marker.x, marker.y]), {uid: marker.uid, mid: marker.mid, icon: window[marker.mgroup+'Icon'], title: "Id: "+marker.uid, under: marker.under})
            .bindPopup('<input type="text" value="['+marker.x+','+marker.y+']" class="py-2 px-4 border rounded text-xs w-full text-center" onclick="select()" /><br><span class="py-2 px-4 text-xs w-full text-center"> UID : '+marker.uid+' MID : '+marker.mid+'</span><br><span class="py-2 px-4 text-xs w-full text-center"><input class="under-point" type="checkbox" id="devbox'+marker.uid+'" data-cbxid="'+marker.uid+'" /> Under</span><br /><a class="delete-point underline mt-2 font-bold inline-block" style="color:red!important;" href="#!">Supprimer</a>', {maxHeight : 350, minWidth : 350})
            .on('click', updateCurrentMarker).addTo(map);
            userMarkers.push(marker.uid);
            countmarker[""+marker.mgroup] += 1;
            console.log("groupe : "+marker.mgroup+", Nombre : "+countmarker[""+marker.mgroup]);
            if (marker.under) newmarker._icon.style.filter = "drop-shadow(0 0 5px red)";
        });
    });
    // Object.keys(countmarker).forEach(function(key) {
    //     console.log(key + " : " + countmarker[key]);
    // })
    // console.table(countmarker);
};

// Créer un marqueur au clic
map.on('click', onMapClick);
map.on('popupopen', popUpOpen);

$(document).ready(function() {

    initmarkers();

    $(document).on('click', 'a.delete-point', function(e) {
        e.preventDefault();

        var i=userMarkers.indexOf(currentMarker.options.uid);
        if( i >= 0) {
          userMarkers.splice(i, 1);
        //   console.log(currentMarker.options.mid);
          countmarker[""+currentMarker.options.type] += -1;
        }

        $.post('api/dev/delete', {data : currentMarker.options.uid}, function (res) {
			if (typeof(res.ok) != "undefined") {
				console.log(res.ok)
		        map.removeLayer(currentMarker);
			} else if (typeof(res.error) != "undefined")
				alert("error "+res.error)
			else
				alert("unkown error")
		});
    });

    $(document).on('click', 'input.under-point',function() {
		$.post('api/dev/under',{data : [currentMarker.options.uid, currentMarker.options.under]}, function (res) {
			if (typeof(res.ok) != "undefined") {
				console.log(res.ok)
				currentMarker.options.under = (currentMarker.options.under)?false:true;
				currentMarker._icon.style.filter = (currentMarker.options.under)?"drop-shadow(0 0 5px red)":"none"
			} else if (typeof(res.error) != "undefined")
				alert("error "+res.error)
			else
				alert("unkown error")
		});
	});

    $(document).on('change', 'input[type="radio"]', function() {
        markertype = $(this).data('type');
    });

    $('#dbmark').on('click', function () {
        if ($(this).is(':checked')) {
            map.removeLayer(DBMarkers);
        } else {
            map.addLayer(DBMarkers);
        }
    });
});