// Genshin Impact Interactive Map routine (C)TMKFrench & LBM - Anthony & Mystral77 (New API)

// Fonctions Interaction sur la Map

    function onMapClick(e) {
        var txt = mymap.project([e.latlng.lat, e.latlng.lng], map.getMaxZoom());
        var x = Math.floor(txt.x);
        var y = Math.floor(txt.y);
        console.log(langue["ui-click"] + "[" + x + "," + y + "]");
    }

    function unproject(coord) {
        return mymap.unproject(coord, mymap.getMaxZoom());
    }
    
    function onMarkerClick(e) {
        currentMarker = this;
    }

    function checkinfo(e) {
        if (!localStorage.getItem('Mapversenka') || !(localStorage.Mapversenka === "2.0.0")) {
            localStorage.Mapversenka = "2.0.0";
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
    
    function sanityze (e) {
        if (e) {
            t1 = e.replace('"[','[');
            t2 = t1.replaceAll('\\','');
            t3 = t2.replace(']"',']')
            return t3;
        };
    };

    function mergesave(servmarkers) {
        var localmarkers = (localStorage.userMarkersEnka) ? JSON.parse(localStorage.userMarkersEnka) : [];
        localmarkers.forEach(function(e){
            if(servmarkers.indexOf(e)<0)
                servmarkers.push(e);
        });
    
        $.post('api/e/mergemarkers', {data : JSON.stringify(servmarkers)}, function(res) {
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
            $.post('api/e/addmarker/'+idm, function(res) {
                if(typeof(res.error) !== 'undefined') {
                    alert('Vous avez été déconnecté. La page va se rafraîchir.');
                    window.location.reload();
                };
    
                currentMarker.setOpacity(.35);
                userMarkers = res.markers;
            });
        } else {
            $.post('api/e/removemarker/'+idm, function(res) {
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
          currentMarker.setOpacity(.35);
        } else {
          if(markers.indexOf(idm) >= 0) {
            markers.splice(markers.indexOf(idm), 1);
          }
          currentMarker.setOpacity(1);
        }
    
        localStorage.setItem('userMarkersEnka', JSON.stringify(markers));
        userMarkers = JSON.stringify(markers);
    };
    
    function getUserMarkers() {
        var markers = sanityze(localStorage.getItem('userMarkersEnka'));
    
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
            $('#cbxtxt'+$(content).find('input#mapbox').first().data('id')).html(langue['ui-found']);
          }
        }
      }
    
    function resetmarkers() {
        if(userLocal) {
            localStorage.removeItem('userMarkersEnka');
        } else {
            $.post('api/e/resetmarkers', function(res) {
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
            var i = 1, cbx, markers = [];
            while (lstmrk[i]) {
                cbx = lstmrk[i];
                lstmrk[i+1].forEach(function(e){
                    markers.push(cbx + e);
                });
                if (localStorage.getItem('chkbox'+cbx))
                    localStorage.removeItem('chkbox'+cbx);
                i = i + 2;
            };
            localStorage.setItem('userMarkers', JSON.stringify(markers));
        } else if (lstmrk[0] == "v3enka") {
            lstmrk.splice(0,1);
            localStorage.setItem('userMarkersEnka', JSON.stringify(lstmrk));
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
            var lilocal = (localStorage.MenumapgenshinLiEnka) ? JSON.parse(localStorage.MenumapgenshinLiEnka) : [];
            var btnlocal = (localStorage.MenumapgenshinBtnEnka) ? JSON.parse(localStorage.MenumapgenshinBtnEnka) : [];

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
var olduserMarkers = (localStorage.getItem('userMarkers')) ? JSON.parse(localStorage.userMarkers) : [] ;
var userLocal = true;
var listatut = [];
var btnstatut = [];
var teyvatarray = [
    'teleport','enkagate','cyclejn','triangle','peche','succes','quete',
    'clesigil1','clesigil2','clesigil3','clesigil4','clesigil5',
    'cordi','cdelic','cprec','cluxe','cdefi','cfee','pierrekc',
    'ferblanc','amethyste','electrocris','noyauc','perle','corail',
    'ffeu','fbrume','ganoderma','herbem',
    'grenouille','crabe'];
var nbtmark = 0;
var langue, lgmenu;

// Initialisation et chargement de la Map

    mymap = L.map('mapid', {
        center : [0,0],
        zoom : 2
    });

    L.tileLayer('media/tilesenka/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.youtube.com/channel/UCbg8iC6Tw7de2URdwp3pyZQ/">TMK World</a>',
        maxZoom: 6,
        minZoom: 2,
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
    loadmarker(listteleport,"Teleport","teleport",langue.cat02,"tpe");
    loadmarker(listenkagate,"Enkagate","enkagate",langue.cat100,"egate");
    loadmarker(listcyclejn,"Cyclejn","cyclejn",langue.cat101);
    loadmarker(listtriangle,"Triangle","triangle",langue.cat102,"triangle","triangle");
    loadmarker(listtrianglenocb,"Triangle","triangle",langue.cat102,"trianglenocb");
    loadmarker(listsucces,"Succes","succes",langue.cat46,"succese","succese");
    loadmarker(listquete,"Quete","quete",langue.cat118,"quetee","quetee");
    loadmarker(listpeche,"Peche","peche",langue.cat94,"pechee");
    loadmarker(listpierrekc,"Pierrekc","pierrekc",langue.cat103,"pierrekc","pierrekc");
    loadmarker(listclesigil1,"Clesigil1","clesigil1",langue.cat104,"clesigil1-","clesigil1");
    loadmarker(listclesigil2,"Clesigil2","clesigil2",langue.cat105,"clesigil2-","clesigil2");
    loadmarker(listclesigil3,"Clesigil3","clesigil3",langue.cat106,"clesigil3-","clesigil3");
    loadmarker(listclesigil4,"Clesigil4","clesigil4",langue.cat107,"clesigil4-","clesigil4");
    loadmarker(listclesigil5,"Clesigil5","clesigil5",langue.cat108,"clesigil5-","clesigil5");
    loadmarker(listcordi,"Cordi","cordi",langue.cat04,"oce","cordie");
    loadmarker(listcdelic,"Cdelic","cdelic",langue.cat05,"dce","cdelice");
    loadmarker(listcprec,"Cprec","cprec",langue.cat06,"pce","cprece");
    loadmarker(listcluxe,"Cluxe","cluxe",langue.cat07,"lce","cluxee");
    loadmarker(listcdefi,"Cdefi","cdefi",langue.cat08,"defie","cdefie");
    loadmarker(listcfee,"Cfee","cfee",langue.cat09,"","cfeeenko");
    loadmarker(listferblanc,"Ferblanc","ferblanc",langue.cat25);
    loadmarker(listamethyste,"Amethyste","amethyste",langue.cat84);
    loadmarker(listelectroc,"Electrocris","electrocris",langue.cat12);
    loadmarker(listnoyauc,"Noyauc","noyauc",langue.cat44);
    loadmarker(listperle,"Perle","perle",langue.cat32);
    loadmarker(listcorail,"Corail","corail",langue.cat97);
    loadmarker(listffeu,"Ffeu","ffeu",langue.cat14);
    loadmarker(listfbrume,"Fbrume","fbrume",langue.cat13);
    loadmarker(listganoderma,"Ganoderma","ganoderma",langue.cat81);
    loadmarker(listherbem,"Herbem","herbem",langue.cat82);
    loadmarker(listgrenouille,"Grenouille","grenouille",langue.cat27);
    loadmarker(listcrabe,"Crabe","crabe",langue.cat64);

    $('#total' + lgmenu).text(nbtmark + langue['ui-load']);
};

    function loadmarker(marklist, markico, grp, marktitle, filename, cbxname) {
        var marq = [], nfichier, i, mtype, checkbox='', popup='', curmarker, txt="", minfo, micon, counternull=0;
        var lgrp = window[grp + 'Group'];
        for (i=0; i<marklist.length; i++) {
            marq = marklist[i];
            mtype = marq[0];
            minfo = marq[2];
            nfichier = filename + minfo.mid;

            if ((typeof minfo.icon !=='undefined') && (typeof minfo.under !=='undefined')) {
                micon = window[minfo.icon +'u'];
            } else if (typeof minfo.under !=='undefined') {
                micon = window[markico +'u'];
            } else {
                micon = window[markico];
            }

            if(typeof cbxname !== 'undefined')
            checkbox = '<br><h2><label class="switch"><input type="checkbox" id="mapbox" data-id="'+minfo.id+'" /><span class="cursor"></span><span id="cbxtxt'+minfo.id+'" class="texte">'+langue['ui-tofind']+'</span></label></h2>';

            if(typeof minfo.title !== 'undefined')
            txt += '<br><h2>'+minfo.title+'</h2><br>';

            switch (mtype) {
                case 0 : // Img (txt+cb)
                    txt += (typeof minfo.text !=='undefined') ? "<br><h1>"+minfo.text+"</h1>" : "";
                    popup = '<a href="media/'+nfichier+'.jpg" data-lity><img class="thumb" src="media/'+nfichier+'.jpg"/></a>'+txt+checkbox;
                    break;
                case 3 : // Gif (txt+cb)
                    txt += (typeof minfo.text !=='undefined') ? "<br><h1>"+minfo.text+"</h1>" : "";
                    popup = '<a href="media/'+nfichier+'.gif" data-lity><img class="thumb" src="media/'+nfichier+'.gif"/></a>'+txt+checkbox;
                    break;
                case 5 : // Video (txt+cb)
                    txt += (typeof minfo.text !=='undefined') ? "<br><h1>"+minfo.text+"</h1>" : "";
                    popup = '<iframe width="480" height="270" src="//www.youtube.com/embed/'+minfo.video+'?rel=0" frameborder="0" allowfullscreen></iframe>'+txt+checkbox;
                    break;
                case 7 : // Todo
                    txt = "<br><h1><b>"+marktitle+" "+minfo.mid+"</b><br>"+langue['ui-todo']+"</h1>";
                    popup = '<a href="media/todo.gif" class="items-center" data-lity><img class="thumb2" src="media/todo.gif"/></a>'+txt+checkbox;
                    break;
                case 11 : // null (+cb)
                    popup = '<h1>'+minfo.text+checkbox+'</h1>';
                    break;
                case 12 : // sans popup (sauf temporaire)
                    popup = '<h1>'+checkbox+'</h1>';
                    // Have a break, have a Kitkat
            };

            titlem = (typeof minfo.title !=='undefined') ? minfo.title : marktitle;
            titlem += " Id:"+minfo.mid;

            if(typeof cbxname !== 'undefined') {
                
                if (mtype == 11) {
                    curmarker = L.marker(unproject(marq[1]), {icon: Null, title: ""}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
                    counternull += 1;
                } else {
                    curmarker = L.marker(unproject(marq[1]), {icon: micon, title: titlem, riseOnHover: true}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
                }
            } else {
                if (mtype !== 12) {
                    curmarker = L.marker(unproject(marq[1]), {icon: micon, title: titlem, riseOnHover: true}).bindPopup(popup, popupOptions);
                } else {
                    curmarker = L.marker(unproject(marq[1]), {icon: micon, title: titlem, riseOnHover: true});
                }

            };

            if((olduserMarkers.indexOf(cbxname+minfo.mid) >= 0) || (userMarkers.indexOf(minfo.id) >=0)) {
                curmarker.setOpacity(0.35);
                if(userMarkers.indexOf(minfo.id) < 0) {
                    userMarkers.push(minfo.id);
                    olduserMarkers.splice(olduserMarkers.indexOf(cbxname+minfo.mid), 1);
                }
            }
            
            curmarker.addTo(lgrp);

        };

        console.log(marktitle + " : " + (marklist.length - counternull) + langue["ui-load"]);
        nbtmark += (marklist.length - counternull);
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
                $.post('api/e/addmenu/'+type);
        } else {
            mymap.removeLayer(window[type+'Group']);
            if(!userLocal)
                $.post('api/e/removemenu/'+type);
        };

        if(userLocal) {
            var listatut = [];
            $('#menu a[data-type]').each(function(){
                if ($(this).hasClass('active') && (listatut.indexOf($(this).data('type')) < 0)) {
                    listatut.push($(this).data('type'));
                };
            });
            localStorage.MenumapgenshinLiEnka = JSON.stringify(listatut);
            };
        });

    $('.matbtn').on('click', function() {
        var ndf = $(this).data('type');
        if (!($(this).hasClass('active'))) {
            $(this).attr('src', "media/icones/" + ndf + "on.png");
            $(this).toggleClass('active');
            mymap.addLayer(window[ndf+'Group']);
            if(!userLocal)
                $.post('api/e/addbtn/'+ndf);
        } else {
            $(this).attr('src', "media/icones/" + ndf + "off.png");
            $(this).toggleClass('active');
            mymap.removeLayer(window[ndf+'Group']);
            if(!userLocal)
                $.post('api/e/removebtn/'+ndf);
        };

        if(userLocal) {
            var btnstatut = [];
            $('.matbtn').each(function(){
                if ($(this).hasClass('active') && (btnstatut.indexOf($(this).data('type')) < 0)) {
                    btnstatut.push($(this).data('type'));
                };
            });
            localStorage.MenumapgenshinBtnEnka = JSON.stringify(btnstatut);
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
        if (confirm(langue["ui-mergeenka"])) {
            mergesave(userMarkers);
        }
    });
     
    $('.btnsave').on('click', function() {
        var arr1 = ['v3enka'];
        var save = arr1.concat(userMarkers);
        this.href=URL.createObjectURL(new Blob([JSON.stringify(save)]));
        alert(langue["ui-exportenka"]);
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
            loadusermarkers(JSON.parse(sanityze(this.result)));
        };
        fr_.readAsText(this.files[0]);
    });

// Fin Fonction globale

$(document).ready(function() {

    var heightmenu = window.innerHeight - $("#topmenu" + lgmenu).outerHeight(true);
    $("#MarkerSelect" + lgmenu).css("max-height", heightmenu + 'px');

    // Update de l'ancien système de sauvegarde
    oldtonew();

    // Récupération des info users
    $.get('api/e/user', function(res) {
        if(typeof res.users !== 'undefined')
        console.log("u: "+res.users);
  
        if(typeof res.visits !== 'undefined')
        console.log("v: "+res.visits);
          
        if(typeof res.login !== 'undefined') {
          $('#discord' + lgmenu).attr('href', res.login).attr('target', (window.location !== window.parent.location) ? '_blank' : '_self');
          $('#goggle' + lgmenu).attr('href', res.loging).attr('target', (window.location !== window.parent.location) ? '_blank' : '_self');
          initMarkers();
          localStorage.setItem('userMarkersEnka',JSON.stringify(userMarkers));
          localStorage.setItem('userMarkers',JSON.stringify(olduserMarkers));
          reselectmenu();
        }
  
        if(typeof res.uid !== 'undefined') {
          $('#discord' + lgmenu)
              .html('<strong>'+langue["ui-deco"]+'</strong><img src="'+res.avatar+'" onerror="this.src=\''+res.avatar_default+'\'" class="mr-1 ml-1 h-6 rounded-full" /><strong>'+res.username+'</strong>')
              .attr('href', res.logout);
          $('#logincontainer' + lgmenu).toggleClass('hidden flex');
          $('#loggedcontainer' + lgmenu).toggleClass('hidden flex');
          $('#local' + lgmenu).toggleClass('hidden flex');
          $('#distant' + lgmenu).toggleClass('hidden flex');
          userLocal = false;
          userMarkers = (res.markers !== null) ? res.markers : [];
          olduserMarkers = (res.oldmarkers !== null) ? res.oldmarkers : [];
          listatut = (res.menu !== null) ? res.menu : [];
          btnstatut = (res.btn !== null) ? res.btn : [];
          updatemv3 = (res.updatemv3 !== null) ? res.updatemv3 : [];
          initMarkers();
          if (updatemv3.indexOf('enka') < 0) {
            $.post('api/e/updatemarkers', {newm : JSON.stringify(userMarkers), oldm : JSON.stringify(olduserMarkers)}, function(res) {
                if(typeof(res.error) !== 'undefined') {
                    alert('Vous avez été déconnecté. La page va se rafraîchir.');
                    window.location.reload();
                };
            });
          }
          reselectmenu(listatut, btnstatut);
        }
    });

    $(document).on('change', 'input[type="checkbox"]', function() {

        var cbxid = $(this).data('id');

        if ($(this).is(':checked')) {
            $('#cbxtxt'+cbxid).html(langue['ui-found']);
        } else {
            $('#cbxtxt'+cbxid).html(langue['ui-tofind']);
        }
    
        if(userLocal) {
          saveLocalUserMarkers($(this).data('id'), $(this).is(':checked'));
        } else {
          saveDBUserMarkers($(this).data('id'), $(this).is(':checked'));
        }
  
      });
  
    $(window).resize(function() {
        var heightmenu = window.innerHeight - $("#topmenu" + lgmenu).outerHeight(true);
        $("#MarkerSelect" + lgmenu).css("max-height", heightmenu + 'px');
    });
  
});

checkinfo();

// Fin Windows load
