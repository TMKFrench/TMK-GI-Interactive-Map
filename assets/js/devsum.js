function onMapClick(e) {
    var txt = map.project([e.latlng.lat, e.latlng.lng], map.getMaxZoom());
    var uid = generateSerial(10);
    var x = Math.floor(txt.x);
    var y = Math.floor(txt.y);
    L.marker([e.latlng.lat, e.latlng.lng], {uid: uid, icon: window[markertype+'Icon']}).bindPopup('<input type="text" value="['+x+','+y+']" class="py-2 px-4 border rounded text-xs w-full text-center" onclick="select()" /><br><span class="py-2 px-4 text-xs w-full text-center"> UID : '+uid+'</span><br><a class="delete-point underline mt-2 font-bold inline-block" style="color:red!important;" href="#!">Supprimer</a>', {maxHeight : 350, minWidth : 350}).on('click', updateCurrentMarker).addTo(map);
  
    userMarkers.push(uid);
    var datam = [uid, markertype, x, y];
    $.post('devapi/add', {data : JSON.stringify(datam)}, function(res) {
        console.table(datam);
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

var currentMarker;
var userMarkers = [];
var markertype = 'ferblanc';
var mgroup = [
    'ferblanc','cristal','noyauc','electroc','artefact','ffeu','fbrume','pomme','grenouille','lezard','crabe',
    'champsacra','champitoile','fruitharra','kalpalotus','nilotpalotus','padisachidee','pechezaytun','rosesum','viparyas'
];

// Initialisation de la carte
var map = new L.Map('devmap', {
    center : [0,0],
    zoom : 2,
    zoomControl: false
});

L.tileLayer('media/tilesteyvat31/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.youtube.com/channel/UCbg8iC6Tw7de2URdwp3pyZQ/">TMK World</a>',
    maxZoom: 7,
    minZoom: 2,
    continuousWorld: true,
    maxBoundsViscosity: 0.8,
    noWrap: true,
    errorTileUrl : 'media/tilesteyvat31/empty.png'
}).addTo(map);

// map.zoomControl.setPosition('topright');
map.setMaxBounds(new L.latLngBounds(unproject([2048,4096]), unproject([28672,28672])));

// Génération des marqueurs existants

function initmarkers() {

    // Depuis le fichiers JS

    mgroup.forEach(function(group) {
        window['list'+group].forEach(function(marker) {
            newmarker = L.marker(unproject(marker[1]), {icon : window[group+'Icon'], title: "Id: "+marker[2].mid, riseOnHover: true}).addTo(map);
        });
    });

    // Depuis la DB de dev

    $.post('devapi/import', function(res) {
        res.forEach(function(marker) {
            newmarker = L.marker(unproject([marker.x, marker.y]), {uid: marker.uid, icon: window[marker.mgroup+'Icon'], title: "Id: "+marker.uid})
            .bindPopup('<input type="text" value="['+marker.x+','+marker.y+']" class="py-2 px-4 border rounded text-xs w-full text-center" onclick="select()" /><br><span class="py-2 px-4 text-xs w-full text-center"> UID : '+marker.uid+'</span><br><a class="delete-point underline mt-2 font-bold inline-block" style="color:red!important;" href="#!">Supprimer</a>', {maxHeight : 350, minWidth : 350})
            .on('click', updateCurrentMarker).addTo(map);
            userMarkers.push(marker.uid);
        });
    });

};

// Créer un marqueur au clic
map.on('click', onMapClick);

$(document).ready(function() {

    initmarkers();

    $(document).on('click', 'a.delete-point', function(e) {
        e.preventDefault();

        var i=userMarkers.indexOf(currentMarker.options.uid);
        if( i >= 0) {
          userMarkers.splice(i, 1);
        }
  
        $.post('devapi/delete', {data : currentMarker.options.uid}, function () {
            console.log('Retrait du marker Id :'+currentMarker.options.uid);
        });
  
        map.removeLayer(currentMarker);
  
    });
  
    $(document).on('change', 'input[type="radio"]', function() {
        markertype = $(this).data('type');
    });

});