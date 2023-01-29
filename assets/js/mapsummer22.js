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
    if (!localStorage.getItem('Mapverssummer22') || !(localStorage.Mapverssummer22 === "1.0.7")) {
        localStorage.Mapverssummer22 = "1.0.7";
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

    $.post('api/se/mergemarkers', {data : JSON.stringify(servmarkers)}, function(res) {
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
        $.post('api/se/addmarker/'+idm, function(res) {
            if(typeof(res.error) !== 'undefined') {
                alert('Vous avez été déconnecté. La page va se rafraîchir.');
                window.location.reload();
            };

            currentMarker.setOpacity(.45);
            userMarkers = res.markers;
        });
    } else {
        $.post('api/se/removemarker/'+idm, function(res) {
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

function updateislandmarkers (ileId, ilever, old) {
    hidelayer = window['l'+ileId+old];
    hidelayer.forEach(function(e) {
      mymap.removeLayer(window[ileId+old+e+'Group']);
    });
    showlayer = window['l'+ileId+ilever];
    window['menuActive'].forEach(function(e) {
      if (showlayer.indexOf(e) >=0) {
        mymap.addLayer(window[ileId+ilever+e+'Group']);
      }
    });
    window['btnActive'].forEach(function(e) {
      if (showlayer.indexOf(e) >=0) {
        mymap.addLayer(window[ileId+ilever+e+'Group']);
      }
    });
  }

  function updateislandmarkersmenu (type, add) {
    for (let i =1; i < 4; i++) {
      currentver = window['oldile'+i];
      if (window['lile'+i+currentver].indexOf(type) >=0) {
        if (add) {
          mymap.addLayer(window['ile'+i+currentver+type+'Group'])
        } else {
          mymap.removeLayer(window['ile'+i+currentver+type+'Group']);
        }
      };
    }
  }

  function updateislandmarkersinit () {
    for (let i =1; i < 4; i++) {
      window['menuActive'].forEach(function(e) {
        if (window['lile'+i+'1'].indexOf(e) >=0) {
          mymap.addLayer(window['ile'+i+'1'+e+'Group'])
        }
      });
      window['btnActive'].forEach(function(e) {
        if (window['lile'+i+'1'].indexOf(e) >=0) {
          mymap.addLayer(window['ile'+i+'1'+e+'Group'])
        }
      });
    }
  }

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

function popUpOpen2(e) {
    var content = e.popup.getContent();
    island = $(content).find('input.item-ile').first().data('id');
    $('input[data-id="'+island+'"][data-ver="'+window['old'+island]+'"]').prop('checked', 'checked');
  };

function resetmarkers() {
    if(userLocal) {
        localStorage.removeItem('userMarkers');
    } else {
        $.post('api/se/resetmarkers', function(res) {
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
        var lilocal = (localStorage.MenumapgenshinLiSum22) ? JSON.parse(localStorage.MenumapgenshinLiSum22) : [];
        var btnlocal = (localStorage.MenumapgenshinBtnSum22) ? JSON.parse(localStorage.MenumapgenshinBtnSum22) : [];
        menuActive = lilocal;
        btnActive = btnlocal;

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
'teleport','tpbarge','ile21tpbarge','ile22tpbarge','succes','cecho','cmirage','marchenimbus','forumcorbeau','briseur','nucleus','ile21nucleus','ile22nucleus',
'cordi','ile12cordi','ile13cordi','ile14cordi','ile17cordi','ile21cordi','ile22cordi','ile31cordi','ile32cordi',
'cdelic','ile11cdelic','ile14cdelic','ile15cdelic','ile16cdelic','ile18cdelic','ile21cdelic','ile22cdelic','ile31cdelic',
'cprec','ile21cprec','ile22cprec','ile31cprec',
'cluxe','ile22cluxe',
'cdefi','ile11cdefi','ile12cdefi','ile13cdefi','ile14cdefi','ile15cdefi','ile16cdefi','ile17cdefi','ile18cdefi','ile19cdefi','ile21cdefi','ile22cdefi','ile31cdefi','ile32cdefi',
'cfee','ile11cfee','ile12cfee','ile17cfee',
'animauxtranslucide','ile12animauxtranslucide','ile13animauxtranslucide','ile14animauxtranslucide','ile16animauxtranslucide','ile17animauxtranslucide','ile19animauxtranslucide','ile21animauxtranslucide','ile22animauxtranslucide','ile31animauxtranslucide','ile32animauxtranslucide',
'quete','ile15quete','ile21quete',
'artefact','ile11artefact','ile13artefact','ile14artefact','ile16artefact','ile17artefact','ile18artefact','ile21artefact','ile22artefact',
'electrocris','ile12electrocris','ile16electrocris',
'amethyste','ile14amethyste',
'lapis','ile16lapis','ile17lapis','ile19lapis',
'ferblanc','cristal','jade','noyauc',
'ffeu','fbrume','ile11fbrume','ile14fbrume','ile16fbrume','ile17fbrume',
'pissenlit','ile11pissenlit','ile17pissenlit','ile21pissenlit','ile22pissenlit',
'hsanglot','ile12hsanglot','ile16hsanglot',
'ganoderma','ile12ganoderma','ile14ganoderma','ile16ganoderma','ile21ganoderma','ile22ganoderma',
'qingxin','ile13qingxin',
'piment','ile13piment','ile16piment','ile17piment',
'muguet','ile16muguet','ile17muguet',
'gdloup','champitoile',
'grenouille','lezard'];
var nbtmark = 0;
var langue, lgmenu;
var oldile1 = 1, oldile2 = 1, oldile3 = 1;
var menuActive = [], btnActive = [];
var lile11 = ['cdefi','cfee','cdelic','artefact','fbrume','pissenlit'], lile12 = ['cordi','cdefi','cfee','animauxtranslucide','electrocris','hsanglot','ganoderma'], lile13 = ['cordi','cdefi','animauxtranslucide','artefact','qingxin','piment'], lile14 = ['cordi','cdelic','cdefi','animauxtranslucide','artefact','amethyste','fbrume','ganoderma'], lile15 = ['cdelic','cdefi','quete'], lile16 = ['cdelic','cdefi','animauxtranslucide','artefact','electrocris','lapis','fbrume','hsanglot','ganoderma','piment','muguet'], lile17 = ['cordi','cdefi','cfee','animauxtranslucide','artefact','lapis','fbrume','pissenlit','piment','muguet'], lile18 = ['cdelic','cdefi','artefact'], lile19 = ['cdefi','animauxtranslucide','lapis'];
var lile21 = ['cordi','cdelic','cprec','cdefi','tpbarge','quete','pissenlit','ganoderma','artefact','nucleus'], lile22 = ['cordi','cdelic','cprec','cluxe','cdefi','tpbarge','animauxtranslucide','pissenlit','ganoderma','artefact','nucleus'];
var lile31 = ['cordi','cdelic','cprec','cdefi','animauxtranslucide'], lile32 = ['cordi','cdefi','animauxtranslucide'];

// Initialisation et chargement de la Map

mymap = L.map('mapid', {
    center : [0,0],
    zoom : 2
});

L.tileLayer('media/tilessummer22/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.youtube.com/channel/UCbg8iC6Tw7de2URdwp3pyZQ/">TMK World</a>',
    maxZoom: 5,
    minZoom: 2,
    continuousWorld: true,
    maxBoundsViscosity: 0.8,
    noWrap: true
}).addTo(mymap);

var latLngBoundsile1 = L.latLngBounds([unproject([4953,4493])], [unproject([5774, 5181])]);
var latLngBoundsile2 = L.latLngBounds([unproject([3186,5113])], [unproject([4706, 6054])]);
var latLngBoundsile3 = L.latLngBounds([unproject([2840,3113])], [unproject([4114, 4054])]);

for (let i = 1; i < 10; i++) {
  window['imageOverlayile1'+i] = L.imageOverlay('media/tilessummer22/ile1-'+i+'.png', latLngBoundsile1);   
};

for (let i = 1; i < 3; i++) {
  window['imageOverlayile2'+i] = L.imageOverlay('media/tilessummer22/ile2-'+i+'.png', latLngBoundsile2);   
};

for (let i = 1; i < 3; i++) {
  window['imageOverlayile3'+i] = L.imageOverlay('media/tilessummer22/ile3-'+i+'.png', latLngBoundsile3);
};

imageOverlayile11.addTo(mymap);
imageOverlayile21.addTo(mymap);
imageOverlayile31.addTo(mymap);


mymap.zoomControl.setPosition('topright')
mymap.setMaxBounds(new L.latLngBounds(unproject([0,0]), unproject([8192,8192])));

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
loadmarker(listteleport,Teleport,"teleport",langue.cat02,"sum22tp");
loadmarker(listtpbarge,Tpbarge,"tpbarge",langue.cat79,"sum22tpbarge");
loadmarker(listile21tpbarge,Tpbarge,"ile21tpbarge",langue.cat79,"sum22ile21tpbarge");
loadmarker(listile22tpbarge,Tpbarge,"ile22tpbarge",langue.cat79,"sum22ile22tpbarge");
loadmarker(listcecho,Cecho,"cecho",langue.cat129,"sum22cecho","sum22cecho");
loadmarker(listcmirage,Cecho,"cmirage",langue.cat130,"sum22cmirage","sum22cmirage");
loadmarker(listquete,Quete,"quete",langue.cat118,"sum22quete","sum22quete");
loadmarker(listile15quete,Quete,"ile15quete",langue.cat118,"sum22ile15quete","sum22ile15quete");
loadmarker(listile21quete,Quete,"ile21quete",langue.cat118,"sum22ile21quete","sum22ile21quete");
loadmarker(listnucleus,Nucleus,"nucleus",langue.cat135,"sum22nucleus","sum22nucleus");
loadmarker(listile21nucleus,Nucleus,"ile21nucleus",langue.cat135,"sum22ile21nucleus","sum22ile21nucleus");
loadmarker(listile22nucleus,Nucleus,"ile22nucleus",langue.cat135,"sum22ile22nucleus","sum22ile22nucleus");
loadmarker(listcordi,Cordi,"cordi",langue.cat04,"sum22oc","sum22cordi");
loadmarker(listile12cordi,Cordi,"ile12cordi",langue.cat04,"sum22ile12oc","sum22ile12cordi");
loadmarker(listile13cordi,Cordi,"ile13cordi",langue.cat04,"sum22ile13oc","sum22ile13cordi");
loadmarker(listile14cordi,Cordi,"ile14cordi",langue.cat04,"sum22ile14oc","sum22ile14cordi");
loadmarker(listile17cordi,Cordi,"ile17cordi",langue.cat04,"sum22ile17oc","sum22ile17cordi");
loadmarker(listile21cordi,Cordi,"ile21cordi",langue.cat04,"sum22ile21oc","sum22ile21cordi");
loadmarker(listile22cordi,Cordi,"ile22cordi",langue.cat04,"sum22ile22oc","sum22ile22cordi");
loadmarker(listile31cordi,Cordi,"ile31cordi",langue.cat04,"sum22ile31oc","sum22ile31cordi");
loadmarker(listile32cordi,Cordi,"ile32cordi",langue.cat04,"sum22ile32oc","sum22ile32cordi");
loadmarker(listcdelic,Cdelic,"cdelic",langue.cat05,"sum22dc","sum22cdelic");
loadmarker(listile11cdelic,Cdelic,"ile11cdelic",langue.cat05,"sum22ile11dc","sum22ile11cdelic");
loadmarker(listile14cdelic,Cdelic,"ile14cdelic",langue.cat05,"sum22ile14dc","sum22ile14cdelic");
loadmarker(listile15cdelic,Cdelic,"ile15cdelic",langue.cat05,"sum22ile15dc","sum22ile15cdelic");
loadmarker(listile16cdelic,Cdelic,"ile16cdelic",langue.cat05,"sum22ile16dc","sum22ile16cdelic");
loadmarker(listile18cdelic,Cdelic,"ile18cdelic",langue.cat05,"sum22ile18dc","sum22ile18cdelic");
loadmarker(listile21cdelic,Cdelic,"ile21cdelic",langue.cat05,"sum22ile21dc","sum22ile21cdelic");
loadmarker(listile22cdelic,Cdelic,"ile22cdelic",langue.cat05,"sum22ile22dc","sum22ile22cdelic");
loadmarker(listile31cdelic,Cdelic,"ile31cdelic",langue.cat05,"sum22ile31dc","sum22ile31cdelic");
loadmarker(listcprec,Cprec,"cprec",langue.cat06,"sum22pc","sum22cprec");
loadmarker(listile21cprec,Cprec,"ile21cprec",langue.cat06,"sum22ile21pc","sum22ile21cprec");
loadmarker(listile22cprec,Cprec,"ile22cprec",langue.cat06,"sum22ile22pc","sum22ile22cprec");
loadmarker(listile31cprec,Cprec,"ile31cprec",langue.cat06,"sum22ile31pc","sum22ile31cprec");
loadmarker(listcluxe,Cluxe,"cluxe",langue.cat07,"sum22lc","sum22cluxe");
loadmarker(listile22cluxe,Cluxe,"ile22cluxe",langue.cat07,"sum22ile22lc","sum22ile22cluxe");
loadmarker(listcdefi,Cdefi,"cdefi",langue.cat08,"","sum22cdefi");
loadmarker(listile11cdefi,Cdefi,"ile11cdefi",langue.cat08,"sum22ile11cdefi","sum22ile11cdefi");
loadmarker(listile12cdefi,Cdefi,"ile12cdefi",langue.cat08,"sum22ile12cdefi","sum22ile12cdefi");
loadmarker(listile13cdefi,Cdefi,"ile13cdefi",langue.cat08,"sum22ile13cdefi","sum22ile13cdefi");
loadmarker(listile14cdefi,Cdefi,"ile14cdefi",langue.cat08,"sum22ile14cdefi","sum22ile14cdefi");
loadmarker(listile15cdefi,Cdefi,"ile15cdefi",langue.cat08,"sum22ile15cdefi","sum22ile15cdefi");
loadmarker(listile16cdefi,Cdefi,"ile16cdefi",langue.cat08,"sum22ile16cdefi","sum22ile16cdefi");
loadmarker(listile17cdefi,Cdefi,"ile17cdefi",langue.cat08,"sum22ile17cdefi","sum22ile17cdefi");
loadmarker(listile18cdefi,Cdefi,"ile18cdefi",langue.cat08,"sum22ile18cdefi","sum22ile18cdefi");
loadmarker(listile19cdefi,Cdefi,"ile19cdefi",langue.cat08,"sum22ile19cdefi","sum22ile19cdefi");
loadmarker(listile21cdefi,Cdefi,"ile21cdefi",langue.cat08,"sum22ile21cdefi","sum22ile21cdefi");
loadmarker(listile22cdefi,Cdefi,"ile22cdefi",langue.cat08,"sum22ile22cdefi","sum22ile22cdefi");
loadmarker(listile31cdefi,Cdefi,"ile31cdefi",langue.cat08,"sum22ile31cdefi","sum22ile31cdefi");
loadmarker(listile32cdefi,Cdefi,"ile32cdefi",langue.cat08,"sum22ile32cdefi","sum22ile32cdefi");
loadmarker(listile11cfee,Cfee,"ile11cfee",langue.cat09,"","sum22ile11cfee");
loadmarker(listile12cfee,Cfee,"ile12cfee",langue.cat09,"","sum22ile12cfee");
loadmarker(listile17cfee,Cfee,"ile17cfee",langue.cat09,"","sum22ile17cfee");
loadmarker(listmarchenimbus,Mnimbus,"marchenimbus",langue.cat131,"","sum22marchenimbus");
loadmarker(listanimauxtranslucide,Animauxtrans,"animauxtranslucide",langue.cat132,"","sum22animauxtranslucide");
loadmarker(listile12animauxtranslucide,Animauxtrans,"ile12animauxtranslucide",langue.cat132,"","sum22ile12animauxtranslucide");
loadmarker(listile13animauxtranslucide,Animauxtrans,"ile13animauxtranslucide",langue.cat132,"","sum22ile13animauxtranslucide");
loadmarker(listile14animauxtranslucide,Animauxtrans,"ile14animauxtranslucide",langue.cat132,"","sum22ile14animauxtranslucide");
loadmarker(listile16animauxtranslucide,Animauxtrans,"ile16animauxtranslucide",langue.cat132,"","sum22ile16animauxtranslucide");
loadmarker(listile17animauxtranslucide,Animauxtrans,"ile17animauxtranslucide",langue.cat132,"","sum22ile17animauxtranslucide");
loadmarker(listile19animauxtranslucide,Animauxtrans,"ile19animauxtranslucide",langue.cat132,"","sum22ile19animauxtranslucide");
loadmarker(listile21animauxtranslucide,Animauxtrans,"ile21animauxtranslucide",langue.cat132,"","sum22ile21animauxtranslucide");
loadmarker(listile22animauxtranslucide,Animauxtrans,"ile22animauxtranslucide",langue.cat132,"","sum22ile22animauxtranslucide");
loadmarker(listile31animauxtranslucide,Animauxtrans,"ile31animauxtranslucide",langue.cat132,"","sum22ile32animauxtranslucide");
loadmarker(listile32animauxtranslucide,Animauxtrans,"ile32animauxtranslucide",langue.cat132,"","sum22ile32animauxtranslucide");
loadmarker(listforumcorbeau,Fcorbeau,"forumcorbeau",langue.cat133,"sum22forumc","sum22forumcorbeau");
loadmarker(listbriseur,Briseur,"briseur",langue.cat134,"","sum22briseur");
// loadmarker(listferblanc,Ferblanc,"ferblanc",langue.cat25);
// loadmarker(listcristal,Cristal,"cristal",langue.cat11);
loadmarker(listlapis,Lapis,"lapis",langue.cat41);
loadmarker(listile16lapis,Lapis,"ile16lapis",langue.cat41);
loadmarker(listile17lapis,Lapis,"ile17lapis",langue.cat41);
loadmarker(listile19lapis,Lapis,"ile19lapis",langue.cat41);
// loadmarker(listjade,Jade,"jade",langue.cat39);
// loadmarker(listnoyauc,Noyauc,"noyauc",langue.cat44);
loadmarker(listartefact,Artefact,"artefact",langue.cat76);
loadmarker(listile11artefact,Artefact,"ile11artefact",langue.cat76);
loadmarker(listile13artefact,Artefact,"ile13artefact",langue.cat76);
loadmarker(listile14artefact,Artefact,"ile14artefact",langue.cat76);
loadmarker(listile16artefact,Artefact,"ile16artefact",langue.cat76);
loadmarker(listile17artefact,Artefact,"ile17artefact",langue.cat76);
loadmarker(listile18artefact,Artefact,"ile18artefact",langue.cat76);
loadmarker(listile21artefact,Artefact,"ile21artefact",langue.cat76);
loadmarker(listile22artefact,Artefact,"ile22artefact",langue.cat76);
loadmarker(listelectroc,Electrocris,"electrocris",langue.cat12);
loadmarker(listile12electroc,Electrocris,"ile12electrocris",langue.cat12);
loadmarker(listile16electroc,Electrocris,"ile16electrocris",langue.cat12);
loadmarker(listamethyste,Amethyste,"amethyste",langue.cat84);
loadmarker(listile14amethyste,Amethyste,"ile14amethyste",langue.cat84);
loadmarker(listfbrume,Fbrume,"fbrume",langue.cat13);
loadmarker(listile11fbrume,Fbrume,"ile11fbrume",langue.cat13);
loadmarker(listile14fbrume,Fbrume,"ile14fbrume",langue.cat13);
loadmarker(listile16fbrume,Fbrume,"ile16fbrume",langue.cat13);
loadmarker(listile17fbrume,Fbrume,"ile17fbrume",langue.cat13);
loadmarker(listffeu,Ffeu,"ffeu",langue.cat14);
loadmarker(listpissenlit,Pissenlit,"pissenlit",langue.cat19);
loadmarker(listile11pissenlit,Pissenlit,"ile11pissenlit",langue.cat19);
loadmarker(listile17pissenlit,Pissenlit,"ile17pissenlit",langue.cat19);
loadmarker(listile21pissenlit,Pissenlit,"ile21pissenlit",langue.cat19);
loadmarker(listile22pissenlit,Pissenlit,"ile22pissenlit",langue.cat19);
loadmarker(listganoderma,Ganoderma,"ganoderma",langue.cat81);
loadmarker(listile12ganoderma,Ganoderma,"ile12ganoderma",langue.cat81);
loadmarker(listile14ganoderma,Ganoderma,"ile14ganoderma",langue.cat81);
loadmarker(listile16ganoderma,Ganoderma,"ile16ganoderma",langue.cat81);
loadmarker(listile21ganoderma,Ganoderma,"ile21ganoderma",langue.cat81);
loadmarker(listile22ganoderma,Ganoderma,"ile22ganoderma",langue.cat81);
loadmarker(listhsanglot,Hsanglot,"hsanglot",langue.cat86);
loadmarker(listile12hsanglot,Hsanglot,"ile12hsanglot",langue.cat86);
loadmarker(listile16hsanglot,Hsanglot,"ile16hsanglot",langue.cat86);
loadmarker(listqingxin,Qingxin,"qingxin",langue.cat34);
loadmarker(listile13qingxin,Qingxin,"ile13qingxin",langue.cat34);
loadmarker(listpiment,Piment,"piment",langue.cat36);
loadmarker(listile13piment,Piment,"ile13piment",langue.cat36);
loadmarker(listile16piment,Piment,"ile16piment",langue.cat36);
loadmarker(listile17piment,Piment,"ile17piment",langue.cat36);
loadmarker(listmuguet,Muguet,"muguet",langue.cat35);
loadmarker(listile16muguet,Muguet,"ile16muguet",langue.cat35);
loadmarker(listile17muguet,Muguet,"ile17muguet",langue.cat35);
// loadmarker(listgrenouille,Grenouille,"grenouille",langue.cat27);
// loadmarker(listlezard,Lezard,"lezard",langue.cat28);

$('#total' + lgmenu).text(nbtmark + langue['ui-load']);

L.marker(unproject([5404, 4550]), {icon: Layers, riseOnHover: true}).on('click', onMarkerClick).bindTooltip("Changer la configuration de l'île", {offset : [20,0], direction : 'right'}).bindPopup('<form><input type="radio" class="item-ile radioile" id="ile11" name="configile1" data-id="ile1" data-ver="1"><label for="ile11"><span><img src="media/icones/config11.png" /> Rocaille sereine + Rocaille sereine</span></label><br><input type="radio" class="radioile" id="ile12" name="configile1" data-id="ile1" data-ver="2"><label for="ile12"><span><img src="media/icones/config12.png" /> Rocaille sereine + Rocaille lumineuse</span></label><br><input type="radio" class="radioile" id="ile13" name="configile1" data-id="ile1" data-ver="3"><label for="ile13"><span><img src="media/icones/config13.png" /> Rocaille sereine + Rocaille inflexible</span></label><br><input type="radio" class="radioile" id="ile14" name="configile1" data-id="ile1" data-ver="4"><label for="ile14"><span><img src="media/icones/config14.png" /> Rocaille lumineuse + Rocaille sereine</span></label><br><input type="radio" class="radioile" id="ile15" name="configile1" data-id="ile1" data-ver="5"><label for="ile15"><span><img src="media/icones/config15.png" /> Rocaille lumineuse + Rocaille lumineuse</span></label><br><input type="radio" class="radioile" id="ile16" name="configile1" data-id="ile1" data-ver="6"><label for="ile16"><span><img src="media/icones/config16.png" /> Rocaille lumineuse + Rocaille inflexible</span></label><br><input type="radio" class="radioile" id="ile17" name="configile1" data-id="ile1" data-ver="7"><label for="ile17"><span><img src="media/icones/config17.png" /> Rocaille inflexible + Rocaille sereine</span></label><br><input type="radio" class="radioile" id="ile18" name="configile1" data-id="ile1" data-ver="8"><label for="ile18"><span><img src="media/icones/config18.png" /> Rocaille inflexible + Rocaille lumineuse</span></label><br><input type="radio" class="radioile" id="ile19" name="configile1" data-id="ile1" data-ver="9"><label for="ile19"><span><img src="media/icones/config19.png" /> Rocaille inflexible + Rocaille inflexible</span></label></form>', {maxHeight : 350, minWidth : 350, className : 'radiopop'}).on('popupopen', popUpOpen2).addTo(mymap);
L.marker(unproject([4206, 5318]), {icon: Layers, riseOnHover: true}).on('click', onMarkerClick).bindTooltip("Changer la configuration de l'île", {offset : [20,0], direction : 'right'}).bindPopup('<form><input type="radio" class="item-ile radioile" id="ile21" name="configile2" data-id="ile2" data-ver="1"><label for="ile21"><span><img src="media/icones/config21.png" /> Îles funestes - Présent</span></label><br><input type="radio" class="radioile" id="ile22" name="configile2" data-id="ile2" data-ver="2"><label for="ile22"><span><img src="media/icones/config22.png" /> Îles funestes - Passé</span></label></form>', {maxHeight : 350, minWidth : 350, className : 'radiopop'}).on('popupopen', popUpOpen2).addTo(mymap);
L.marker(unproject([3688, 3812]), {icon: Layers, riseOnHover: true}).on('click', onMarkerClick).bindTooltip("Changer la configuration de l'île", {offset : [20,0], direction : 'right'}).bindPopup('<form><input type="radio" class="item-ile radioile" id="ile31" name="configile3" data-id="ile3" data-ver="1"><label for="ile31"><span><img src="media/icones/config31.png" /> Îles brisées - Montagnes hautes</span></label><br><input type="radio" class="radioile" id="ile32" name="configile3" data-id="ile3" data-ver="2"><label for="ile32"><span><img src="media/icones/config32.png" /> Îles brisées - Montagnes basses</span></label></form>', {maxHeight : 350, minWidth : 350, className : 'radiopop'}).on('popupopen', popUpOpen2).addTo(mymap);

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
        window['menuActive'].push(type);
        updateislandmarkersmenu (type, true);
        if(!userLocal)
            $.post('api/se/addmenu/'+type);
    } else {
        mymap.removeLayer(window[type+'Group']);
        window['menuActive'].splice(window['menuActive'].indexOf(type), 1);
        updateislandmarkersmenu (type, false);
        if(!userLocal)
            $.post('api/se/removemenu/'+type);
    };

    if(userLocal) {
        var listatut = [];
        $('#menu a[data-type]').each(function(){
            if ($(this).hasClass('active') && (listatut.indexOf($(this).data('type')) < 0)) {
                listatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinLiSum22 = JSON.stringify(listatut);
        };
    });

$('.matbtn').on('click', function() {
    var ndf = $(this).data('type');
    if (!($(this).hasClass('active'))) {
        $(this).attr('src', "media/icones/" + ndf + "on.png");
        $(this).toggleClass('active');
        mymap.addLayer(window[ndf+'Group']);
        window['btnActive'].push(ndf);
        updateislandmarkersmenu (ndf, true);
        if(!userLocal)
            $.post('api/se/addbtn/'+ndf);
    } else {
        $(this).attr('src', "media/icones/" + ndf + "off.png");
        $(this).toggleClass('active');
        mymap.removeLayer(window[ndf+'Group']);
        window['btnActive'].splice(window['btnActive'].indexOf(ndf), 1);
        updateislandmarkersmenu (ndf, false);
        if(!userLocal)
            $.post('api/se/removebtn/'+ndf);
    };

    if(userLocal) {
        var btnstatut = [];
        $('.matbtn').each(function(){
            if ($(this).hasClass('active') && (btnstatut.indexOf($(this).data('type')) < 0)) {
                btnstatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinBtnSum22 = JSON.stringify(btnstatut);
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
    $.get('api/se/user', function(res) {
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
            updateislandmarkersinit();
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
            menuActive = listatut;
            btnActive = btnstatut;
            initMarkers();
            reselectmenu(listatut, btnstatut);
            updateislandmarkersinit();
        }
    });
            // initMarkers();
            // reselectmenu(listatut, btnstatut);
            // updateislandmarkersinit();

    $(document).on('change', 'input[type="checkbox"]', function() {
        if(userLocal) {
            saveLocalUserMarkers($(this).data('id'), $(this).is(':checked'));
        } else {
            saveDBUserMarkers($(this).data('id'), $(this).is(':checked'));
        };
    });

    $(document).on('change', 'input[type="radio"]', function() {
        var ileId = $(this).data('id');
        var ilever = $(this).data('ver');
        // alert(ileId+ilever);
        old=window['old'+ileId];
        window['imageOverlay'+ileId+old].removeFrom(mymap);
        window['imageOverlay'+ileId+ilever].addTo(mymap);
        updateislandmarkers (ileId, ilever, old);
        window['old'+ileId]=ilever;
        currentMarker.closePopup();
      });
  
});

checkinfo();

// Fin Windows load
