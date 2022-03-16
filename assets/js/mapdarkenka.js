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
    if (!localStorage.getItem('Mapversdarkenka') || !(localStorage.Mapversdarkenka === "1.4")) {
        localStorage.Mapversdarkenka = "1.4";
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

// function doreset () {
//     // catmarkers = []
//     catmarkers.forEach(function(e) {
//         localStorage.removeItem("chkbox"+e);
//     });
// };

function loadusermarkers(lstmrk) {
    if (lstmrk[0] == "v2") {
        // doreset();
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

function reselectmenu(ligne, btn){

    // $('#menu a[data-type]').each(function(){
    //     if ($(this).hasClass('active')) {
    //         mymap.addLayer(window[$(this).data('type') + 'Group']);
    //     }
    // });
    // $('.matbtn').each(function(){
    //     if ($(this).hasClass('active')) {
    //         mymap.addLayer(window[$(this).data('type') + 'Group']);
    //     }
    // });

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
        var lilocal = (localStorage.MenumapgenshinLiDarkEnka) ? JSON.parse(localStorage.MenumapgenshinLiDarkEnka) : [];
        var btnlocal = (localStorage.MenumapgenshinBtnDarkEnka) ? JSON.parse(localStorage.MenumapgenshinBtnDarkEnka) : [];
        // if (localStorage.MenumapgenshinLiDarkEnka) {
        //     var listatut = JSON.parse(localStorage.MenumapgenshinLiDarkEnka);
        // } else {
        //     localStorage.MenumapgenshinLiDarkEnka = [];
        // };
        // if (localStorage.MenumapgenshinBtnDarkEnka) {
        //     var btnstatut = JSON.parse(localStorage.MenumapgenshinBtnDarkEnka);
        // } else {
        //     localStorage.MenumapgenshinBtnDarkEnka = [];
        // };

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
    // };
};

// Variables générales

var mymap;
var userMarkers = getUserMarkers();
var userLocal = true;
var listatut = [];
var btnstatut = [];
var teyvatarray = [
    'statue','teleport','enkagate','ptnrj','stele',
    'cordi','cdelic','cprec','cluxe','cdefi','cfee','cfeee','epreuve','ceremonie',
    'noyauc','abyssium','tilleul'
];
var nbtmark = 0;
var langue, lgmenu;

// Initialisation et chargement de la Map

mymap = L.map('mapid', {
    center : [0,0],
    zoom : 2
});

L.tileLayer('media/tilesdarkenka/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.youtube.com/channel/UCbg8iC6Tw7de2URdwp3pyZQ/">TMK World</a>',
    maxZoom: 5,
    minZoom: 2,
    continuousWorld: true,
    maxBoundsViscosity: 0.8,
    noWrap: true
}).addTo(mymap);

mymap.zoomControl.setPosition('topright')
mymap.setMaxBounds(new L.latLngBounds(unproject([0,-1000]), unproject([8192,8192])));

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
    loadmarker(liststatue,Vassal,"statue",langue.cat109,"vassal");
    loadmarker(listteleport,Teleport,"teleport",langue.cat02,"tpde");
    loadmarker(listenkagate,Enkagate,"enkagate",langue.cat100,"egate");
    loadmarker(listptnrj,Ptnrj,"ptnrj",langue.cat112);
    loadmarker(liststele,Stele,"stele",langue.cat115,"stele",'stelede');
    loadmarker(listcordi,Cordi,"cordi",langue.cat04,"ocde","cordide");
    loadmarker(listcdelic,Cdelic,"cdelic",langue.cat05,"dcde","cdelicde");
    loadmarker(listcprec,Cprec,"cprec",langue.cat06,"pcde","cprecde");
    loadmarker(listcluxe,Cluxe,"cluxe",langue.cat07,"lcde","cluxede");
    loadmarker(listcdefi,Cdefi,"cdefi",langue.cat08,"","cdefide");
    loadmarker(listcfee,Cfee,"cfee",langue.cat09,"","cfeedenko");
    loadmarker(listcfeee,Cfeee,"cfeee",langue.cat88,"","cfeeede");
    loadmarker(listepreuve,Epreuve,"epreuve",langue.cat111,"","cepreuve");
    loadmarker(listceremonie,Ceremonie,"ceremonie",langue.cat110,"","cceremonie");
    loadmarker(listnoyauc,Noyauc,"noyauc",langue.cat44);
    loadmarker(listabyssium,Abyssium,"abyssium",langue.cat113);
    loadmarker(listtilleul,Tilleul,"tilleul",langue.cat114);

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
            } else if (mtype == 12) {
                titlem = (typeof marq[2] !=='undefined') ? marktitle+" "+marq[2] : marktitle;
                curmarker = L.marker(unproject(marq[1]), {icon: markico, title: titlem, riseOnHover: true}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
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

// Interaction Map

mymap.on('click', onMapClick);
mymap.on('popupopen', popUpOpen);

// Gestion du Menu

$('#menu a[data-type]').on('click', function(e){
    e.preventDefault();

    var type = $(this).data('type');
    $(this).toggleClass('active');
    if($(this).hasClass('active')) {
        mymap.addLayer(window[type+'Group']);
        if(!userLocal)
          $.post('api/se/addmenu/'+type);
    } else {
        mymap.removeLayer(window[type+'Group']);
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
    localStorage.MenumapgenshinLiDarkEnka = JSON.stringify(listatut);
    };
});

$('.matbtn').on('click', function() {
    var ndf = $(this).data('type');
    if (!($(this).hasClass('active'))) {
        $(this).attr('src', "media/icones/" + ndf + "on.png");
        $(this).toggleClass('active');
        mymap.addLayer(window[ndf+'Group']);
        if(!userLocal)
            $.post('api/se/addbtn/'+ndf);
    } else {
        $(this).attr('src', "media/icones/" + ndf + "off.png");
        $(this).toggleClass('active');
        mymap.removeLayer(window[ndf+'Group']);
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
        localStorage.MenumapgenshinBtnDarkEnka = JSON.stringify(btnstatut);
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
        }
  
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
        }
  
      });
  
  
});

// initMarkers();
// reselectmenu();
checkinfo();

// Fin Windows load
