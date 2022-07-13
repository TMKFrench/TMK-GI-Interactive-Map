// Genshin Impact Interactive Map routine (C)TMKFrench & LBM - Anthony

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
        if (!localStorage.getItem('Mapvers') || !(localStorage.Mapvers === "6.1.5")) {
            localStorage.Mapvers = "6.1.5";
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
    
        $.post('api/t/mergemarkers', {data : JSON.stringify(servmarkers)}, function(res) {
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
            $.post('api/t/addmarker/'+idm, function(res) {
                if(typeof(res.error) !== 'undefined') {
                    alert('Vous avez été déconnecté. La page va se rafraîchir.');
                    window.location.reload();
                };
    
                currentMarker.setOpacity(.45);
                userMarkers = res.markers;
            });
        } else {
            $.post('api/t/removemarker/'+idm, function(res) {
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
        userMarkers = JSON.stringify(markers); //??? pkoi ?
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
            $.post('api/t/resetmarkers', function(res) {
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
        } else {
            localStorage.setItem('userMarkers', JSON.stringify(lstmrk));
        };
        alert(langue["ui-import"]);
        window.location.reload();
    };
    
    function reselectmenu(itemdb, btndb, regiondb, chestdb){

        if (!localStorage.getItem("menuclear") || !(localStorage.menuclear === "1")) {
            localStorage.MenumapgenshinItem = [];
            localStorage.menuclear = "1";
        };

        var itemlocal = (localStorage.MenumapgenshinItem) ? JSON.parse(localStorage.MenumapgenshinItem) : [];
        var btnlocal = (localStorage.MenumapgenshinBtn) ? JSON.parse(localStorage.MenumapgenshinBtn) : [];
        var regionlocal = (localStorage.MenumapgenshinRegion) ? JSON.parse(localStorage.MenumapgenshinRegion) : [];
        var chestlocal = (localStorage.MenumapgenshinChest) ? JSON.parse(localStorage.MenumapgenshinChest) : [];

        var item = (userLocal) ? itemlocal : itemdb;
        var btn = (userLocal) ? btnlocal : btndb;
        var region = (userLocal) ? regionlocal : regiondb;
        var chest = (userLocal) ? chestlocal : chestdb;

        if(item){
            item.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
                mymap.addLayer(window[element + 'Group']);
            });
        };
        if (btn){
            btn.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active').attr('src', "media/icones/" + element + "on.png");
                mymap.addLayer(window[element + 'Group']);
            });
        };
        if (region){
            region.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
            });
        };
        if (chest){
            chest.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
            });
        };

        region.forEach(function(region){
            chest.forEach(function(chest) {
                mymap.addLayer(window[chest + region + 'Group']);
            });
        });
    };
    
// Variables générales

var mymap;
var currentMarker;
var userMarkers = getUserMarkers();
var userLocal = true;
var teyvatarray = [
    'statue','teleport','tpbarge','elecgate','peche','succes','quete','pano','anemo','geocul','eleccul','agate','gyroc','sceaugeo','tasdepierre','pseculaire','offrandes',
    'cordimond','cdelicmond','cprecmond','cluxemond','cdefimond','cfeemond','cfeeemond','cetrmond',
    'cordiliyu','cdelicliyu','cprecliyu','cluxeliyu','cdefiliyu','cfeeliyu','cfeeeliyu','cetrliyu',
    'cordiinaz','cdelicinaz','cprecinaz','cluxeinaz','cdefiinaz','cfeeinaz','cfeeeinaz','cetrinaz',
    'sanctum','sanctul','sanctui',
    'betrang','bgivre','brocheux','bshaman','bviandu','fmens','chasseur','colosse','gardien','geosaure','magea','magel','frap','merc','mitrail','pilleur','usurier',
    'ferblanc','argetoile','cristal','electrocris','eclatcm','artefact','dent','noyauc',
    'ffeu','fbrume','gdloup','pomme','carotte','radis',
    'halampe','chrysantheme','lyscalla','tombaie','bacrochet','pissenlit','cecilia','chanemo',
    'qingxin','muguet','piment','lysverni','fsoie','bambou','lotus','lapis','jade','perle','conque',
    'amethyste','anguille','cfluo','corail','dendro','famakumo','fcerisier','ganoderma','hsanglot','herbem','melonl','moelle','scarabuto',
    'grenouille','lezard','papillon','luciole','crabe'];
var nbtmark = 0;
var langue, lgmenu;

// Initialisation et chargement de la Map

mymap = L.map('mapid', {
    center : [0,0],
    zoom : 3
});

L.tileLayer('media/tilesteyvat/{z}/{x}/{y}.jpg', {
    attribution: '<a href="https://www.youtube.com/channel/UCbg8iC6Tw7de2URdwp3pyZQ/">TMK World</a>',
    maxZoom: 7,
    minZoom: 2,
    continuousWorld: true,
    maxBoundsViscosity: 0.8,
    noWrap: true
}).addTo(mymap);

mymap.zoomControl.setPosition('topright')
mymap.setMaxBounds(new L.latLngBounds(unproject([3584,5632]), unproject([28672,28672])));

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
    loadmarker(liststatue,Statue,"statue",langue.cat01,"statue");
    loadmarker(listteleport,Teleport,"teleport",langue.cat02,"tp");
    loadmarker(listtpbarge,Tpbarge,"tpbarge",langue.cat79,"tpbi");
    loadmarker(listelecgate,Elecgate,"elecgate",langue.cat93,"egate");
    loadmarker(listpeche,Peche,"peche",langue.cat94,"peche");
    loadmarker(listsucces,Succes,"succes",langue.cat46,"succes","succes");
    loadmarker(listquete,Quete,"quete",langue.cat118,"quete","quete");
    loadmarker(listpano,Pano,"pano",langue.cat03,"pano","pano");
    loadmarker(listpanol,Pano,"pano",langue.cat03,"panol","panol");
    loadmarker(listpanoi,Pano,"pano",langue.cat03,"panoi","panoi");
    loadmarker(listanemo,Anemo,"anemo",langue.cat10,"anemo","anemo");
    loadmarker(listgeocul,Geocul,"geocul",langue.cat29,"geoc","geocul");
    loadmarker(listeleccul,Eleccul,"eleccul",langue.cat80,"eleccul","eleccul");
    loadmarker(listagate,Agate,"agate",langue.cat47,"agate","agate");
    loadmarker(listgyroc,Gyroc,"gyroc",langue.cat122,"gyroc","gyroc");
    loadmarker(listsceaugeo,Sceaugeo,"sceaugeo",langue.cat30,"sg","sceaugeo");
    loadmarker(listtasdepierre,Tasdepierre,"tasdepierre",langue.cat123,"tas2pierre","tasdepierre");
    loadmarker(listpseculaire,Pseculaire,"pseculaire",langue.cat124,"pseculaire","pseculaire");
    loadmarker(listoffrandes,Offrandes,"offrandes",langue.cat128,"offrandes","offrandes");
    loadmarker(listcordi,Cordi,"cordimond",langue.cat04,"oc","cordi");
    loadmarker(listcordil,Cordi,"cordiliyu",langue.cat04,"ocl","cordil");
    loadmarker(listcordii,Cordi,"cordiinaz",langue.cat04,"oci","cordii");
    loadmarker(listcdelic,Cdelic,"cdelicmond",langue.cat05,"dc","cdelic");
    loadmarker(listcdelicl,Cdelic,"cdelicliyu",langue.cat05,"dcl","cdelicl");
    loadmarker(listcdelici,Cdelic,"cdelicinaz",langue.cat05,"dci","cdelici");
    loadmarker(listcprec,Cprec,"cprecmond",langue.cat06,"pc","cprec");
    loadmarker(listcprecl,Cprec,"cprecliyu",langue.cat06,"pcl","cprecl");
    loadmarker(listcpreci,Cprec,"cprecinaz",langue.cat06,"pci","cpreci");
    loadmarker(listcluxe,Cluxe,"cluxemond",langue.cat07,"lc","cluxe");
    loadmarker(listcluxel,Cluxe,"cluxeliyu",langue.cat07,"lcl","cluxel");
    loadmarker(listcluxei,Cluxe,"cluxeinaz",langue.cat07,"lci","cluxei");
    loadmarker(listcdefi,Cdefi,"cdefimond",langue.cat08,"defi","cdefi");
    loadmarker(listcdefil,Cdefi,"cdefiliyu",langue.cat08,"defil","cdefil");
    loadmarker(listcdefii,Cdefi,"cdefiinaz",langue.cat08,"defii","cdefii");
    loadmarker(listcfee,Cfee,"cfeemond",langue.cat09,"","cfee");
    loadmarker(listcfeel,Cfee,"cfeeliyu",langue.cat09,"","cfeel");
    loadmarker(listcfeei,Cfee,"cfeeinaz",langue.cat09,"","cfeei");
    loadmarker(listcetr,Cetr,"cetrinaz",langue.cat99,"cei","cetr");
    loadmarker(listcfeee,Cfeee,"cfeeeinaz",langue.cat88,"cfeee","cfeee");
    loadmarker(listsanctum,Sanctum,"sanctum",langue.cat70,"sanctum","sanctum");
    loadmarker(listsanctul,Sanctul,"sanctul",langue.cat71,"sanctul","sanctul");
    loadmarker(listsanctui,Sanctui,"sanctui",langue.cat91,"sanctui","sanctui");
    loadmarker(listbetrang,Betrang,"betrang",langue.cat49,"betrang");
    loadmarker(listbgivre,Bgivre,"bgivre",langue.cat67,"bgivre");
    loadmarker(listbrocheux,Brocheux,"brocheux",langue.cat65,"brocheux");
    loadmarker(listbshaman,Bshaman,"bshaman",langue.cat61);
    loadmarker(listbviandu,Bviandu,"bviandu",langue.cat51,"bviandu");
    loadmarker(listfmcryo,Fmcryo,"fmens",langue.cat53,"fmcryo");
    loadmarker(listfmpyro,Fmpyro,"fmens",langue.cat54,"fmpyro");
    loadmarker(listchasseur,Chasseur,"chasseur",langue.cat66,"chasseur");
    loadmarker(listcolosse,Colosse,"colosse",langue.cat75,"colosse");
    loadmarker(listgardien,Gardien,"gardien",langue.cat52,"gardien");
    loadmarker(listgeosaure,Geosaure,"geosaure",langue.cat55,"geosaure");
    loadmarker(listmagecryo,Magecryo,"magea",langue.cat56,"magec");
    loadmarker(listmagehydro,Magehydro,"magea",langue.cat57,"mageh");
    loadmarker(listmagepyro,Magepyro,"magea",langue.cat58,"magep");
    loadmarker(listmagecl,Magecl,"magel",langue.cat59,"magecl");
    loadmarker(listmageel,Mageel,"magel",langue.cat60,"mageel");
    loadmarker(listfrapa,Frapa,"frap",langue.cat68,"frapa");
    loadmarker(listfrape,Frape,"frap",langue.cat69,"frape");
    loadmarker(listmercg,Mercg,"merc",langue.cat72,"mercg");
    loadmarker(listmercp,Mercp,"merc",langue.cat73,"mercp");
    loadmarker(listmitrailc,Mitrailc,"mitrail",langue.cat62,"mitc");
    loadmarker(listmitrailh,Mitrailh,"mitrail",langue.cat63,"mith");
    loadmarker(listpilleur,Pilleur,"pilleur",langue.cat77,"pilleur");
    loadmarker(listusurier,Usurier,"usurier",langue.cat50,"usurier");
    loadmarker(listferblanc,Ferblanc,"ferblanc",langue.cat25);
    loadmarker(listargetoile,Argetoile,"argetoile",langue.cat48);
    loadmarker(listcristal,Cristal,"cristal",langue.cat11);
    loadmarker(listelectroc,Electrocris,"electrocris",langue.cat12);
    loadmarker(listeclatcm,Eclatcm,"eclatcm",langue.cat26);
    loadmarker(listdent,Dent,"dent",langue.cat78,"dent");
    loadmarker(listartefact,Artefact,"artefact",langue.cat76);
    loadmarker(listlapis,Lapis,"lapis",langue.cat41);
    loadmarker(listjade,Jade,"jade",langue.cat39);
    loadmarker(listnoyauc,Noyauc,"noyauc",langue.cat44);
    loadmarker(listperle,Perle,"perle",langue.cat32);
    loadmarker(listconque,Conque,"conque",langue.cat40);
    loadmarker(listamethyste,Amethyste,"amethyste",langue.cat84);
    loadmarker(listffeu,Ffeu,"ffeu",langue.cat14);
    loadmarker(listfbrume,Fbrume,"fbrume",langue.cat13);
    loadmarker(listgdloup,Gdloup,"gdloup",langue.cat45);
    loadmarker(listpomme,Pomme,"pomme",langue.cat15);
    loadmarker(listcarotte,Carotte,"carotte",langue.cat16);
    loadmarker(listradis,Radis,"radis",langue.cat17);
    loadmarker(listhalampe,Halampe,"halampe",langue.cat20);
    loadmarker(listchrysantheme,Chrysantheme,"chrysantheme",langue.cat21);
    loadmarker(listlyscalla,Lyscalla,"lyscalla",langue.cat22);
    loadmarker(listtombaie,Tombaie,"tombaie",langue.cat18);
    loadmarker(listbacrochet,Bacrochet,"bacrochet",langue.cat24);
    loadmarker(listpissenlit,Pissenlit,"pissenlit",langue.cat19);
    loadmarker(listchanemo,Chanemo,"chanemo",langue.cat74)
    loadmarker(listcecilia,Cecilia,"cecilia",langue.cat23);
    loadmarker(listqingxin,Qingxin,"qingxin",langue.cat34);
    loadmarker(listmuguet,Muguet,"muguet",langue.cat35,"muguet");
    loadmarker(listpiment,Piment,"piment",langue.cat36);
    loadmarker(listlysverni,Lysverni,"lysverni",langue.cat37);
    loadmarker(listfsoie,Fsoie,"fsoie",langue.cat38);
    loadmarker(listbambou,Bambou,"bambou",langue.cat31);
    loadmarker(listlotus,Lotus,"lotus",langue.cat33);
    loadmarker(listanguille,Anguille,"anguille",langue.cat95);
    loadmarker(listcfluo,Cfluo,"cfluo",langue.cat98);
    loadmarker(listdendro,Dendro,"dendro",langue.cat90);
    loadmarker(listfamakumo,Famakumo,"famakumo",langue.cat96);
    loadmarker(listfcerisier,Fcerisier,"fcerisier",langue.cat85);
    loadmarker(listganoderma,Ganoderma,"ganoderma",langue.cat81);
    loadmarker(listhsanglot,Hsanglot,"hsanglot",langue.cat86);
    loadmarker(listherbem,Herbem,"herbem",langue.cat82);
    loadmarker(listmelonl,Melonl,"melonl",langue.cat83);
    loadmarker(listmoelle,Moelle,"moelle",langue.cat92);
    loadmarker(listcorail,Corail,"corail",langue.cat97);
    loadmarker(listscarabuto,Scarabuto,"scarabuto",langue.cat87);
    loadmarker(listgrenouille,Grenouille,"grenouille",langue.cat27);
    loadmarker(listlezard,Lezard,"lezard",langue.cat28);
    loadmarker(listpapillon,Papillon,"papillon",langue.cat42);
    loadmarker(listluciole,Luciole,"luciole",langue.cat43);
    loadmarker(listcrabe,Crabe,"crabe",langue.cat64);

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
                case 12 : // sans popup (sauf temporaire)
                    popup = '<h1>'+checkbox+'</h1>';
                    // Have a break, have a Kitkat
            };

            if(typeof cbxname !== 'undefined') {
                if (mtype == 11) {
                    curmarker = L.marker(unproject(marq[1]), {icon: Null, title: ""}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
                    counternull += 1;
                } else if (mtype == 7) {
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
            curmarker.setOpacity(0.35);
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

    $('.itembtn').on('click', function(e){
        e.preventDefault();
  
        var type = $(this).data('type');
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            mymap.addLayer(window[type+'Group']);
            if(!userLocal)
            $.post('api/t/addmenu/'+type);  
        } else {
            mymap.removeLayer(window[type+'Group']);
            if(!userLocal)
            $.post('api/t/removemenu/'+type);  
        };

        if(userLocal) {
            var itemstatut = [];
            $('.itembtn').each(function(){
                if ($(this).hasClass('active') && (itemstatut.indexOf($(this).data('type')) < 0)) {
                    itemstatut.push($(this).data('type'));
                };
            });
            localStorage.MenumapgenshinItem = JSON.stringify(itemstatut);
        };
    });

    $('.chest' + lgmenu).on('click', function(e) {
        e.preventDefault();
        var type = $(this).data('type');
        var obj = this;
        $(obj).toggleClass('active');
        var cheststate = ($(obj).hasClass('active')) ? true : false
        $('.region' + lgmenu).each(function(){
            region = $(this).data('type');
            if($(this).hasClass('active') && cheststate) {
                mymap.addLayer(window[type + region + 'Group']);
            } else {
                mymap.removeLayer(window[type + region + 'Group']);
            };
        });

        if(!userLocal) {
            if (cheststate) {
                $.post('api/t/addchest/'+type);
            } else {
                $.post('api/t/removechest/'+type);
            }
        } else {
        var cheststatut = [];
        $('.chest' + lgmenu).each(function(){
            if ($(this).hasClass('active') && (cheststatut.indexOf($(this).data('type')) < 0)) {
                cheststatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinChest = JSON.stringify(cheststatut);
        };
    });

    $('.region' + lgmenu).on('click',function(e) {
        e.preventDefault();
        var type = $(this).data('type');
        var obj = this;
        $(obj).toggleClass('active');
        var regionstate = ($(obj).hasClass('active')) ? true : false
        $('.chest' + lgmenu).each(function(){
            chest = $(this).data('type');
            if($(this).hasClass('active') && regionstate) {
                mymap.addLayer(window[chest + type + 'Group']);
            } else {
                mymap.removeLayer(window[chest + type + 'Group']);
            }
        });
        
        if(!userLocal) {
            if (regionstate) {
                $.post('api/t/addregion/'+type);
            } else {
                $.post('api/t/removeregion/'+type);
            }
        } else {
        var regionstatut = [];
        $('.region' + lgmenu).each(function(){
            if ($(this).hasClass('active') && (regionstatut.indexOf($(this).data('type')) < 0)) {
                regionstatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinRegion = JSON.stringify(regionstatut);
        };
    });

    $('.matbtn').on('click', function() {
        var ndf = $(this).data('type');
        if (!($(this).hasClass('active'))) {
            $(this).attr('src', "media/icones/" + ndf + "on.png");
            $(this).toggleClass('active');
            mymap.addLayer(window[ndf+'Group']);
            if(!userLocal)
                $.post('api/t/addbtn/'+ndf);  
        } else {
            $(this).attr('src', "media/icones/" + ndf + "off.png");
            $(this).toggleClass('active');
            mymap.removeLayer(window[ndf+'Group']);
            if(!userLocal)
                $.post('api/t/removebtn/'+ndf);
        };

        if(userLocal) {
            var btnstatut = [];
            $('.matbtn').each(function(){
                if ($(this).hasClass('active') && (btnstatut.indexOf($(this).data('type')) < 0)) {
                    btnstatut.push($(this).data('type'));
                };
            });
            localStorage.MenumapgenshinBtn = JSON.stringify(btnstatut);
        };
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
    $.get('api/t/user', function(res) {
        if(typeof res.users !== 'undefined')
        console.log("u: "+res.users);
        //   $('#total-users').text(res.users);
  
        if(typeof res.visits !== 'undefined')
        console.log("v: "+res.visits);
        //   $('#total-visits').text(res.visits);
  
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
          itemload = (res.menu !== null) ? res.menu : [];
          btnload = (res.btn !== null) ? res.btn : [];
          regionload = (res.region !== null) ? res.region : [];
          chestload = (res.chest !== null) ? res.chest : [];
          initMarkers();
          reselectmenu(itemload, btnload, regionload, chestload);
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
    checkinfo();

// Fin Windows load