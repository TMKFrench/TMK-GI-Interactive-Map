// Fonctions Interaction sur la Map

function onMapClick(e) {
    console.log(langue["ui-click"] + mymap.project([e.latlng.lat,e.latlng.lng], mymap.getMaxZoom()));
}

function unproject(coord) {
    return mymap.unproject(coord, mymap.getMaxZoom());
  }

function onMarkerClick(e) {
    currentMarker = this;
}

function checkinfo(e) {
    if (!localStorage.getItem('Mapversgouffre') || !(localStorage.Mapversgouffre === "1.2.3")) {
        localStorage.Mapversgouffre = "1.2.3";
        if (localStorage.MapLng === "FR") {
            var infobox = lity('#infomajFR');
        } else {
            var infobox = lity('#infomajEN');
        }
    }
}

function oldtonew(e) {
    if (!localStorage.getItem('updatesave')) {
        var listcbx = ['cordi','cordil','cordii','cordie','cordide','cordig','cdelic','cdelicl','cdelici','cdelice','cdelicde','cdelicg','cprec','cprecl','cpreci','cprece','cprecde','cprecg',
        'cluxe','cluxel','cluxei','cluxee','cluxede','cluxeg','cdefi','cdefil','cdefii','cdefie','cdefide','cdefig','cfee','cfeel','cfeei','cfeeenko','cfeedenko','cfeeg','cfeee','cfeeede',
        'cetr','sanctum','sanctul','sanctui','pano','panol','panoi','succes','succesl','succese','anemo','geocul','eleccul','agate','sceaugeo','triangle','pierrekc',
        'clesigil1','clesigil2','clesigil3','clesigil4','clesigil5','stelede','cepreuve','cceremonie','echo1','echo2','echo3','echo4','echo5','echo6','echo7','cpeint','charp'
        ];
        var newusermarkers = [];
        listcbx.forEach(function(e){
            markers = (localStorage.getItem('chkbox'+e)) ? JSON.parse(localStorage.getItem('chkbox'+e)) : [];
            markers.forEach(function(nb){
                newusermarkers.push(e+nb);
            });
            localStorage.removeItem('chkbox'+e);
        });
        localStorage.setItem('userMarkers', JSON.stringify(newusermarkers));
        localStorage.updatesave = "1";
        userMarkers = newusermarkers;
    }
};

function mergesave(servmarkers) {
    var localmarkers = (localStorage.userMarkers) ? JSON.parse(localStorage.userMarkers) : [];
    localmarkers.forEach(function(e){
        if(servmarkers.indexOf(e)<0)
            servmarkers.push(e);
    });

    $.post('api/go/mergemarkers', {data : JSON.stringify(servmarkers)}, function(res) {
        if(typeof(res.error) !== 'undefined') {
            alert('Vous avez été déconnecté. La page va se rafraîchir.');
            window.location.reload();
        };
    });
    alert(langue["ui-mergedone"]);
    window.location.reload();
};

function saveDBUserMarkers(idm, checked) {

    if(checked) {
        $.post('api/go/addmarker/'+idm, function(res) {
            if(typeof(res.error) !== 'undefined') {
                alert('Vous avez été déconnecté. La page va se rafraîchir.');
                window.location.reload();
            };

            currentMarker.setOpacity(.45);
            userMarkers = res.markers;
        });
    } else {
        $.post('api/go/removemarker/'+idm, function(res) {
            if(typeof(res.error) !== 'undefined') {
                alert('Vous avez été déconnecté. La page va se rafraîchir.');
                window.location.reload();
            };

            currentMarker.setOpacity(1);
            userMarkers = res.markers;
        });
    };
};

function saveLocalUserMarkers(idm, checked) {

    var markers = getUserMarkers();

    if(checked) {
      if(markers.indexOf(idm) < 0) {
        markers.push(idm);
      }
      currentMarker.setOpacity(.45);
    } else {
      if(markers.indexOf(idm) >= 0) {
        markers.splice(markers.indexOf(idm), 1);
      }
      currentMarker.setOpacity(1);
    }

    localStorage.setItem('userMarkers', JSON.stringify(markers));
    userMarkers = JSON.stringify(markers);
};

function getUserMarkers() {
    var markers = localStorage.getItem('userMarkers');

    if(!markers) {
      markers = [];
    } else {
      markers = JSON.parse(markers);
    }

    return markers;
};

function popUpOpen(e) {
    var content = e.popup.getContent();

    if($(content).find('input#mapbox').length > 0) {
      if(userMarkers.indexOf( $(content).find('input#mapbox').first().data('id') ) >= 0) {
        $('input#mapbox[data-id="'+$(content).find('input#mapbox').first().data('id')+'"]').prop('checked', 'checked');
      }
    }
  }

function resetmarkers() {
    if(userLocal) {
        localStorage.removeItem('userMarkers');
    } else {
        $.post('api/go/resetmarkers', function(res) {
            if(typeof(res.error) !== 'undefined') {
              alert('Vous avez été déconnecté. La page va se rafraîchir.');
              window.location.reload();
            }
        });
    };
    alert(langue["ui-reset"]);
    window.location.reload();
};

function loadusermarkers(lstmrk) {
    if (lstmrk[0] == "v2") {
        var i = 1, cbx;
        while (lstmrk[i]) {
            cbx = lstmrk[i];
            lstmrk[i+1].forEach(function(e){
                userMarkers.push(cbx + e);
            });
            if (localStorage.getItem('chkbox'+cbx))
                localStorage.removeItem('chkbox'+cbx);
            i = i + 2;
        };
        localStorage.setItem('userMarkers', JSON.stringify(userMarkers));
    } else {
        localStorage.setItem('userMarkers', JSON.stringify(lstmrk));
    };
    alert(langue["ui-import"]);
    window.location.reload();
};

    // IMPORTANT !!!!!! Penser à changer les valeurs de LocalStorage en cas de réutilisation du code pour une autre map !!!!!!!!!

function reselectmenu(ligne, btn){

    if (!userLocal) {

        if(ligne){
            ligne.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
                mymap.addLayer(window[element + 'Group']);
            });
        };
        if (btn){
            btnstatut.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active').attr('src', "media/icones/" + element + "on.png");
                mymap.addLayer(window[element + 'Group']);
            });
        };
    } else {
        var lilocal = (localStorage.MenumapgenshinLiGouffre) ? JSON.parse(localStorage.MenumapgenshinLiGouffre) : [];
        var btnlocal = (localStorage.MenumapgenshinBtnGouffre) ? JSON.parse(localStorage.MenumapgenshinBtnGouffre) : [];

        if(lilocal){
            lilocal.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
                mymap.addLayer(window[element + 'Group']);
            });
        };
        if (btnlocal){
            btnlocal.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active').attr('src', "media/icones/" + element + "on.png");
                mymap.addLayer(window[element + 'Group']);
            });
        };
    };
};

// Variables générales

var mymap;
var userMarkers = getUserMarkers();
var userLocal = true;
var listatut = [];
var btnstatut = [];
var teyvatarray = [
'teleport','lumen','lampe','peche','succes','quete','pano','tasdepierre','orbeprof','message','fossile',
'cordi','cdelic','cprec','cluxe','cdefi','cfee',
'ferblanc','cristal','lapis','jade','noyauc','artefact',
'fbrume','gdloup','champitoile',
'grenouille','lezard','luciolichance','belette'];
var nbtmark = 0;
var langue, lgmenu;

// Initialisation et chargement de la Map

mymap = L.map('mapid', {
    center : [0,0],
    zoom : 2
});

L.tileLayer('media/tilesgouffre/{z}/{x}/{y}.jpg', {
    attribution: '<a href="https://www.youtube.com/channel/UCbg8iC6Tw7de2URdwp3pyZQ/">TMK World</a>',
    maxZoom: 6,
    minZoom: 3,
    continuousWorld: true,
    maxBoundsViscosity: 0.8,
    noWrap: true
}).addTo(mymap);

mymap.zoomControl.setPosition('topright')
mymap.setMaxBounds(new L.latLngBounds(unproject([0,0]), unproject([16384,16384])));

teyvatarray.forEach(function(e){
    window[e+'Group'] = L.layerGroup();
});


// Affichage du Bouton Menu

var BoutonMenu = L.easyButton({
states : [{
    stateName: 'close-menu',
    icon: '<img src="media/icones/menuoff.png">',
    title: langue["ui-close"],
    onClick: function(btn, mymap){
        $('body').toggleClass('show-menu');
        mymap.invalidateSize();
        btn.state('open-menu')
    }
},{
    stateName: 'open-menu',
    icon: '<img src="media/icones/menuon.png">',
    title: langue["ui-open"],
    onClick: function(btn, mymap){
        $('body').toggleClass('show-menu');
        mymap.invalidateSize();
        btn.state('close-menu')
    }
}]
});

BoutonMenu.addTo(mymap);

// Initialisation des marqueurs

// Chargement des Marqueurs marklist, markico, grp, marktitle, filename, cbxname

function initMarkers () {
loadmarker(listteleport,Teleport,"teleport",langue.cat02,"tpgo");
loadmarker(listlumen,Lumen,"lumen",langue.cat116,"lumen","lumen");
loadmarker(listlampe,Lampe,"lampe",langue.cat117);
loadmarker(listpeche,Peche,"peche",langue.cat94,"pechego");
loadmarker(listquete,Quete,"quete",langue.cat118,"quetego","quetego");
loadmarker(listsucces,Succes,"succes",langue.cat46,"succesgo","succesgo");
loadmarker(listpano,Pano,"pano",langue.cat03,"panogo","panogo");
loadmarker(listtasdepierre,Tasdepierre,"tasdepierre",langue.cat123,"tas2pierrego","tasdepierrego");
loadmarker(listorbeprof,Orbeprof,"orbeprof",langue.cat125,"orbeprof","orbeprof");
loadmarker(listmessage,Message,"message",langue.cat126,"messagego","messagego");
loadmarker(listfossile,Fossile,"fossile",langue.cat127,"fossile","fossile");
loadmarker(listcordi,Cordi,"cordi",langue.cat04,"ocgo","cordigo");
loadmarker(listcdelic,Cdelic,"cdelic",langue.cat05,"dcgo","cdelicgo");
loadmarker(listcprec,Cprec,"cprec",langue.cat06,"pcgo","cprecgo");
loadmarker(listcluxe,Cluxe,"cluxe",langue.cat07,"lcgo","cluxego");
loadmarker(listcdefi,Cdefi,"cdefi",langue.cat08,"defigo","cdefigo");
loadmarker(listcfee,Cfee,"cfee",langue.cat09,"cfeego","cfeego");
loadmarker(listferblanc,Ferblanc,"ferblanc",langue.cat25);
loadmarker(listcristal,Cristal,"cristal",langue.cat11);
loadmarker(listlapis,Lapis,"lapis",langue.cat41);
loadmarker(listjade,Jade,"jade",langue.cat39);
loadmarker(listnoyauc,Noyauc,"noyauc",langue.cat44);
loadmarker(listartefact,Artefact,"artefact",langue.cat76);
loadmarker(listfbrume,Fbrume,"fbrume",langue.cat13);
loadmarker(listgdloup,Gdloup,"gdloup",langue.cat45);
loadmarker(listchampitoile,Champitoile,"champitoile",langue.cat119);
loadmarker(listgrenouille,Grenouille,"grenouille",langue.cat27);
loadmarker(listlezard,Lezard,"lezard",langue.cat28);
loadmarker(listluciolichance,Luciolichance,"luciolichance",langue.cat120);
loadmarker(listbelette,Belette,"belette",langue.cat121);

$('#total' + lgmenu).text(nbtmark + langue['ui-load']);
};

function loadmarker(marklist, markico, grp, marktitle, filename, cbxname) {
    var marq = [], nfichier, i, mtype, checkbox='', popup='', curmarker, txt="", counternull=0;
    var lgrp = window[grp + 'Group'];
    for (i=0; i<marklist.length; i++) {
        marq = marklist[i];
        // console.log("mark n° "+ (i+1) + " " + JSON.stringify(marq)); // Pour Debug les marqueurs
        mtype = marq[0];
        nfichier = filename + (i+1);
        if(typeof cbxname !== 'undefined')
        checkbox = '<br><h2><label><input type="checkbox" id="mapbox" data-id="'+cbxname+(i+1)+'" /> '+langue['ui-found']+'</label></h2>';

        switch (mtype) {
            case 0 : // Img (txt+cb)
                txt = (typeof marq[2] !=='undefined') ? "<br><h1>"+marq[2]+"</h1>" : "";
                popup = '<a href="media/'+nfichier+'.jpg" data-lity><img class="thumb" src="media/'+nfichier+'.jpg"/></a>'+txt+checkbox;
                break;
            case 3 : // Gif (txt+cb)
                txt = (typeof marq[2] !=='undefined') ? "<br><h1>"+marq[2]+"</h1>" : "";
                popup = '<a href="media/'+nfichier+'.gif" data-lity><img class="thumb" src="media/'+nfichier+'.gif"/></a>'+txt+checkbox;
                break;
            case 5 : // Video (txt+cb)
                txt = (typeof marq[3] !=='undefined') ? "<br><h1>"+marq[3]+"</h1>" : "";
                popup = '<iframe width="480" height="270" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe>'+txt+checkbox;
                break;
            case 7 : // Todo
                txt = "<br><h1><b>"+marktitle+" "+(i+1)+"</b><br>"+langue['ui-todo']+"</h1>";
                popup = '<a href="media/todo.gif" class="items-center" data-lity><img class="thumb2" src="media/todo.gif"/></a>'+txt+checkbox;
                break;
            case 11 : // null (+cb)
                popup = '<h1>'+marq[2]+checkbox+'</h1>';
                break;
            case 12 : // sans popup ou temporaire avant img
                popup = '<h1>'+checkbox+'</h1>';
                // Have a break, have a Kitkat
        };

        if(typeof cbxname !== 'undefined') {
            if (mtype == 11) {
                curmarker = L.marker(unproject(marq[1]), {icon: Null, title: ""}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
                counternull += 1;
            } else if (mtype == 7) {
                titlem = (typeof marq[2] !=='undefined') ? marktitle+" "+marq[2] : marktitle;
                curmarker = L.marker(unproject(marq[1]), {icon: markico, title: titlem, riseOnHover: true}).on('click', onMarkerClick).bindPopup(popup, popupOptions2);
            } else {
                if (mtype == 5)
                    titlem = (typeof marq[4] !=='undefined') ? marq[4] : marktitle;
                else if (mtype == 0 || mtype == 3)
                    titlem = (typeof marq[3] !=='undefined') ? marq[3] : marktitle;
                curmarker = L.marker(unproject(marq[1]), {icon: markico, title: titlem, riseOnHover: true}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
            }
        } else {
            if (mtype !== 12) {
                curmarker = L.marker(unproject(marq[1]), {icon: markico, title: marktitle, riseOnHover: true}).bindPopup(popup, popupOptions);
            } else {
                titlem = (typeof marq[2] !=='undefined') ? marktitle+" "+marq[2] : marktitle;
                curmarker = L.marker(unproject(marq[1]), {icon: markico, title: titlem, riseOnHover: true});
            }
        };

        if(userMarkers.indexOf(cbxname+(i+1)) >= 0)
        curmarker.setOpacity(0.45);
        curmarker.addTo(lgrp);

    };
    console.log(marktitle + " : " + (marklist.length - counternull) + langue["ui-load"]);
    nbtmark += (marklist.length - counternull);
    // console.log("nombre de marqueur Total chargés : " + nbtmark); // Pour debug
};

// Fonctions Interaction Map

mymap.on("click", onMapClick);
mymap.on('popupopen', popUpOpen);

// Gestion du Menu

    // IMPORTANT !!!!!! Penser à changer les valeurs de LocalStorage et de POST en cas de réutilisation du code pour une autre map !!!!!!!!!

$('#menu a[data-type]').on('click', function(e){
    e.preventDefault();

    var type = $(this).data('type');
    $(this).toggleClass('active');
    if($(this).hasClass('active')) {
        mymap.addLayer(window[type+'Group']);
        if(!userLocal)
            $.post('api/go/addmenu/'+type);
    } else {
        mymap.removeLayer(window[type+'Group']);
        if(!userLocal)
            $.post('api/go/removemenu/'+type);
    };

    if(userLocal) {
        var listatut = [];
        $('#menu a[data-type]').each(function(){
            if ($(this).hasClass('active') && (listatut.indexOf($(this).data('type')) < 0)) {
                listatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinLiGouffre = JSON.stringify(listatut);
        };
    });

$('.matbtn').on('click', function() {
    var ndf = $(this).data('type');
    if (!($(this).hasClass('active'))) {
        $(this).attr('src', "media/icones/" + ndf + "on.png");
        $(this).toggleClass('active');
        mymap.addLayer(window[ndf+'Group']);
        if(!userLocal)
            $.post('api/go/addbtn/'+ndf);
    } else {
        $(this).attr('src', "media/icones/" + ndf + "off.png");
        $(this).toggleClass('active');
        mymap.removeLayer(window[ndf+'Group']);
        if(!userLocal)
            $.post('api/go/removebtn/'+ndf);
    };

    if(userLocal) {
        var btnstatut = [];
        $('.matbtn').each(function(){
            if ($(this).hasClass('active') && (btnstatut.indexOf($(this).data('type')) < 0)) {
                btnstatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinBtnGouffre = JSON.stringify(btnstatut);
    }
});

// Gestion des Boutons Menu Haut

$('.btninfo').on('click', function(){
    if (localStorage.MapLng === "FR") {
        var infobox = lity('#infoFR');
    } else {
        var infobox = lity('#infoEN');
    }
});

$('.btnreset').on('click', function() {
    if (confirm(langue["ui-prereset"])) {
        resetmarkers()
    }
});

$('.btnlg').on('click', function() {
    if (localStorage.MapLng === "FR") {
        localStorage.MapLng = "EN";
    } else {
        localStorage.MapLng = "FR";
    };
    window.location.reload();
});

$('.btnmerge').on('click', function() {
    if (confirm(langue["ui-merge"])) {
        mergesave(userMarkers);
    }
});
 
$('.btnsave').on('click', function() {
    this.href=URL.createObjectURL(new Blob([JSON.stringify(userMarkers)]));
    alert(langue["ui-export"]);
});

$('.btnload').on('click', function (e) {
    var fileElem = document.getElementById("ImportBox");
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault();
});

$('#ImportBox').on('change', function(ev_) {
    var fr_;
    (fr_=new FileReader()).onload=function(ev_) {
        loadusermarkers(JSON.parse(this.result));
    };
    fr_.readAsText(this.files[0]);
});

// Fin Fonction globale

$(document).ready(function() {

    // Update de l'ancien système de sauvegarde
    oldtonew();

    // Récupération des info users
    $.get('api/go/user', function(res) {
        if(typeof res.users !== 'undefined')
        //   $('#total-users').text(res.users);
        console.log("u: "+res.users);

        if(typeof res.visits !== 'undefined')
        //   $('#total-visits').text(res.visits);
        console.log("v: "+res.visits);
      
        if(typeof res.login !== 'undefined') {
            $('#discord' + lgmenu).attr('href', res.login).attr('target', (window.location !== window.parent.location) ? '_blank' : '_self');
            initMarkers();
            reselectmenu();
        };

        if(typeof res.uid !== 'undefined') {
            $('#discord' + lgmenu)
                .toggleClass('bg-indigo-400 bg-gray-400 text-white text-gray-900 border-indigo-400 border-gray-800 text-xs')
                .html('<strong>'+langue["ui-deco"]+'</strong><img src="'+res.avatar+'" onerror="this.src=\''+res.avatar_default+'\'" class="mr-1 ml-1 h-6 rounded-full" /><strong>'+res.username+'</strong>')
                .attr('href', res.logout);
            $('#local' + lgmenu).toggleClass('hidden flex');
            $('#distant' + lgmenu).toggleClass('hidden flex');
            userLocal = false;
            userMarkers = (res.markers !== null) ? res.markers : [];
            listatut = (res.menu !== null) ? res.menu : [];
            btnstatut = (res.btn !== null) ? res.btn : [];
            initMarkers();
            reselectmenu(listatut, btnstatut);
        }
    });

    $(document).on('change', 'input[type="checkbox"]', function() {
        if(userLocal) {
            saveLocalUserMarkers($(this).data('id'), $(this).is(':checked'));
        } else {
            saveDBUserMarkers($(this).data('id'), $(this).is(':checked'));
        };
    });
});

checkinfo();

// Fin Windows load
