    var mymap;
    var markeropa;
    var catmarkers = [];
    var savearray = [];
    var teyvatarray = [
        'viteclair',
        'statue','teleport','tpbarge','elecgate','peche','succes','pano','anemo','geocul','eleccul','agate','sceaugeo',
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

// $(window).load(function(){

// Fonctions Interaction sur la Map

    function onMapClick(e) {
        console.log(langue["ui-click"] + mymap.project([e.latlng.lat,e.latlng.lng], mymap.getMaxZoom()));
    }

    function unproject(coord) {
        return mymap.unproject(coord, mymap.getMaxZoom());
      }
    
    function convcoord(coord) {
        var x = coord[0];
        var y = coord[1];
        return [x,y];
    }

    function onMarkerClick(e) {
        markeropa = this;
    }

    function checkinfo(e) {
        if (!localStorage.getItem('Mapvers') || !(localStorage.Mapvers === "5.7")) {
            localStorage.Mapvers = "5.7";
            if (localStorage.MapLng === "FR") {
                var infobox = lity('#infomajFR');
            } else {
                var infobox = lity('#infomajEN');
            }
        }
    }

// Fonctions de Gestion des Marqueurs

    function getLscbx (name) {
        lscbx = localStorage.getItem("chkbox" + name);
        if(!lscbx) {
            lscbx = [];
        } else {
            lscbx = JSON.parse(lscbx);
        }
        return lscbx;
    }

    function initarray() {
        catmarkers.forEach(function(e) {
            window[e+'array'] = getLscbx(e);
        });
    }

    function selectarray(mtype,mnumb,mstate) {
        array = window[mtype+'array'];
        if (mstate) {
            array.push(mnumb);
            markeropa.setOpacity(0.45);
        } else {
            array.splice((array.indexOf(""+mnumb)), 1);
            markeropa.setOpacity(1);
        }
        localStorage.setItem("chkbox" + mtype, JSON.stringify(array));
    };

    function activecb(mtype,mnumb) {
        cooktl = getLscbx(mtype);
        if (cooktl) {
            if (cooktl.indexOf(""+mnumb) >= 0)
                return true;
        };
        return false;
    };

    function resetmarkers() {
        doreset();
        alert(langue["ui-reset"]);
        return document.location.href = 'index.html';
    };

    function doreset () {
        catmarkers.forEach(function(e) {
            localStorage.removeItem("chkbox"+e);
        });
    };

    function savemarkers() {
        savearray = ["v2"];
        catmarkers.forEach(function(e){
            savearray.splice(savearray.length, 0, e, getLscbx(e));
        });
        return savearray;
    };

    function loadusermarkers(lstmrk) {
        if (lstmrk[0] == "v2") {
            doreset();
            var i = 1, cbx;
            while (lstmrk[i]) {
                cbx = "chkbox" + lstmrk[i];
                localStorage.setItem(cbx, JSON.stringify(lstmrk[i+1]));
                i = i + 2;
            };
            alert(langue["ui-import"]);
            return document.location.href = 'index.html';
        } else {
            alert(langue["ui-fileerror"]);
        };
    };

    function reselectmenu(){
        $('.itembtn').each(function(){
            if ($(this).hasClass('active')) {
                mymap.addLayer(window[$(this).data('type') + 'Group']);
            }
        });
        $('.matbtn').each(function(){
            if ($(this).hasClass('active')) {
                mymap.addLayer(window[$(this).data('type') + 'Group']);
            }
        });
        if (localStorage.MenumapgenshinItem) {
            var itemstatut = JSON.parse(localStorage.MenumapgenshinItem);
        } else {
            localStorage.MenumapgenshinItem = [];
        };
        if (localStorage.MenumapgenshinBtn) {
            var btnstatut = JSON.parse(localStorage.MenumapgenshinBtn);
        } else {
            localStorage.MenumapgenshinBtn = [];
        };
        if (localStorage.MenumapgenshinRegion) {
            var regionstatut = JSON.parse(localStorage.MenumapgenshinRegion);
        } else {
            localStorage.MenumapgenshinRegion = [];
            regionstatut = [];
        };
        if (localStorage.MenumapgenshinChest) {
            var cheststatut = JSON.parse(localStorage.MenumapgenshinChest);
        } else {
            localStorage.MenumapgenshinChest = [];
            cheststatut = [];
        };

        if(itemstatut){
            itemstatut.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
                mymap.addLayer(window[element + 'Group']);
            });
        };
        if (btnstatut){
            btnstatut.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active').attr('src', "media/icones/" + element + "on.png");
                mymap.addLayer(window[element + 'Group']);
            });
        };
        if (regionstatut){
            regionstatut.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
            });
        };
        if (cheststatut){
            cheststatut.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
            });
        };
        regionstatut.forEach(function(region){
            cheststatut.forEach(function(chest) {
                mymap.addLayer(window[chest + region + 'Group']);
            });
        });
    };

    // $(function () {

// Initialisation et chargement de la Map

    mymap = L.map('mapid', {
        // crs: L.CRS.Simple,
        center : [0,0],
        zoom : 3
    });

    L.tileLayer('media/tiles/{z}/{x}/{y}.jpg', {
        // attribution: none,
        maxZoom: 7,
        minZoom: 3,
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

    function loadmarker(marklist, markico, regmark, grp, marktitle, filename, cbxname) {
        var marq = [], nfichier, i, mtype, checkbox='', popup='', curmarker, txt="", counternull=0;
        var checkopa = getLscbx(cbxname);
        var lgrp = window[grp + 'Group'];
        if(typeof cbxname !== 'undefined') 
            catmarkers.push(cbxname);
        // console.log(JSON.stringify(catmarkers));
        for (i=0; i<marklist.length; i++) {
            marq = marklist[i];
            // console.log("mark n° "+ (i+1) + " " + JSON.stringify(marq)); // Pour Debug les marqueurs
            mtype = marq[0];
            nfichier = filename + (i+1);
            if(typeof cbxname !== 'undefined')
            checkbox = '<br><h2><label><input id="mapbox" name="'+cbxname+'" value="'+(i+1)+'" type="checkbox" /> '+langue['ui-found']+'</h2>';
            if(regmark === 0)
            marq[1] = convcoord(marq[1]);
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
                    popup = '<iframe width="560" height="315" src="//www.youtube.com/embed/'+marq[2]+'?rel=0" frameborder="0" allowfullscreen></iframe>'+txt+checkbox;
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

            if(checkopa.indexOf(""+(i+1)) >= 0)
            curmarker.setOpacity(0.43);
            curmarker.addTo(lgrp);

        };
        console.log(marktitle + " : " + (marklist.length - counternull) + langue["ui-load"]);
        nbtmark += (marklist.length - counternull);
        // console.log("nombre de marqueur Total chargés : " + nbtmark); // Pour debug
    };

    // Chargement des Marqueurs marklist, markico, regmark, grp, marktitle, filename, cbxname

        loadmarker(liststatue,Statue,1,"statue",langue.cat01,"statue");
        loadmarker(listteleport,Teleport,1,"teleport",langue.cat02,"tp");
        loadmarker(listtpbarge,Tpbarge,1,"tpbarge",langue.cat79,"tpbi");
        loadmarker(listelecgate,Elecgate,1,"elecgate",langue.cat93,"egate");
        loadmarker(listpeche,Peche,1,"peche",langue.cat94,"peche");
        loadmarker(listsucces,Succes,1,"succes",langue.cat46,"succes","succes");
        loadmarker(listpano,Pano,1,"pano",langue.cat03,"pano","pano");
        loadmarker(listpanol,Pano,1,"pano",langue.cat03,"panol","panol");
        loadmarker(listpanoi,Pano,1,"pano",langue.cat03,"panoi","panoi");
        loadmarker(listanemo,Anemo,1,"anemo",langue.cat10,"anemo","anemo");
        loadmarker(listgeocul,Geocul,1,"geocul",langue.cat29,"geoc","geocul");
        loadmarker(listeleccul,Eleccul,1,"eleccul",langue.cat80,"eleccul","eleccul");
        loadmarker(listagate,Agate,1,"agate",langue.cat47,"agate","agate");
        loadmarker(listsceaugeo,Sceaugeo,1,"sceaugeo",langue.cat30,"sg","sceaugeo");
        loadmarker(listcordi,Cordi,1,"cordimond",langue.cat04,"oc","cordi");
        loadmarker(listcordil,Cordi,1,"cordiliyu",langue.cat04,"ocl","cordil");
        loadmarker(listcordii,Cordi,1,"cordiinaz",langue.cat04,"oci","cordii");
        loadmarker(listcdelic,Cdelic,1,"cdelicmond",langue.cat05,"dc","cdelic");
        loadmarker(listcdelicl,Cdelic,1,"cdelicliyu",langue.cat05,"dcl","cdelicl");
        loadmarker(listcdelici,Cdelic,1,"cdelicinaz",langue.cat05,"dci","cdelici");
        loadmarker(listcprec,Cprec,1,"cprecmond",langue.cat06,"pc","cprec");
        loadmarker(listcprecl,Cprec,1,"cprecliyu",langue.cat06,"pcl","cprecl");
        loadmarker(listcpreci,Cprec,1,"cprecinaz",langue.cat06,"pci","cpreci");
        loadmarker(listcluxe,Cluxe,1,"cluxemond",langue.cat07,"lc","cluxe");
        loadmarker(listcluxel,Cluxe,1,"cluxeliyu",langue.cat07,"lcl","cluxel");
        loadmarker(listcluxei,Cluxe,1,"cluxeinaz",langue.cat07,"lci","cluxei");
        loadmarker(listcdefi,Cdefi,1,"cdefimond",langue.cat08,"defi","cdefi");
        loadmarker(listcdefil,Cdefi,1,"cdefiliyu",langue.cat08,"defil","cdefil");
        loadmarker(listcdefii,Cdefi,1,"cdefiinaz",langue.cat08,"defii","cdefii");
        loadmarker(listcfee,Cfee,1,"cfeemond",langue.cat09,"","cfee");
        loadmarker(listcfeel,Cfee,1,"cfeeliyu",langue.cat09,"","cfeel");
        loadmarker(listcfeei,Cfee,1,"cfeeinaz",langue.cat09,"","cfeei");
        loadmarker(listcetr,Cetr,1,"cetrinaz",langue.cat99,"cei","cetr");
        loadmarker(listcfeee,Cfeee,1,"cfeeeinaz",langue.cat88,"cfeee","cfeee");
        loadmarker(listsanctum,Sanctum,1,"sanctum",langue.cat70,"sanctum","sanctum");
        loadmarker(listsanctul,Sanctul,1,"sanctul",langue.cat71,"sanctul","sanctul");
        loadmarker(listsanctui,Sanctui,1,"sanctui",langue.cat91,"sanctui","sanctui");
        loadmarker(listbetrang,Betrang,1,"betrang",langue.cat49,"betrang");
        loadmarker(listbgivre,Bgivre,1,"bgivre",langue.cat67,"bgivre");
        loadmarker(listbrocheux,Brocheux,1,"brocheux",langue.cat65,"brocheux");
        loadmarker(listbshaman,Bshaman,1,"bshaman",langue.cat61);
        loadmarker(listbviandu,Bviandu,1,"bviandu",langue.cat51,"bviandu");
        loadmarker(listfmcryo,Fmcryo,1,"fmens",langue.cat53,"fmcryo");
        loadmarker(listfmpyro,Fmpyro,1,"fmens",langue.cat54,"fmpyro");
        loadmarker(listchasseur,Chasseur,1,"chasseur",langue.cat66,"chasseur");
        loadmarker(listcolosse,Colosse,1,"colosse",langue.cat75,"chasseur");
        loadmarker(listgardien,Gardien,1,"gardien",langue.cat52,"gardien");
        loadmarker(listgeosaure,Geosaure,1,"geosaure",langue.cat55,"geosaure");
        loadmarker(listmagecryo,Magecryo,1,"magea",langue.cat56,"magec");
        loadmarker(listmagehydro,Magehydro,1,"magea",langue.cat57,"mageh");
        loadmarker(listmagepyro,Magepyro,1,"magea",langue.cat58,"magep");
        loadmarker(listmagecl,Magecl,1,"magel",langue.cat59,"magecl");
        loadmarker(listmageel,Mageel,1,"magel",langue.cat60,"mageel");
        loadmarker(listfrapa,Frapa,1,"frap",langue.cat68,"frapa");
        loadmarker(listfrape,Frape,1,"frap",langue.cat69,"frape");
        loadmarker(listmercg,Mercg,1,"merc",langue.cat72,"mercg");
        loadmarker(listmercp,Mercp,1,"merc",langue.cat73,"mercp");
        loadmarker(listmitrailc,Mitrailc,1,"mitrail",langue.cat62,"mitc");
        loadmarker(listmitrailh,Mitrailh,1,"mitrail",langue.cat63,"mith");
        loadmarker(listpilleur,Pilleur,1,"pilleur",langue.cat77,"pilleur");
        loadmarker(listusurier,Usurier,1,"usurier",langue.cat50,"usurier");
        loadmarker(listferblanc,Ferblanc,1,"ferblanc",langue.cat25);
        loadmarker(listargetoile,Argetoile,1,"argetoile",langue.cat48);
        loadmarker(listcristal,Cristal,1,"cristal",langue.cat11);
        loadmarker(listelectroc,Electrocris,1,"electrocris",langue.cat12);
        loadmarker(listeclatcm,Eclatcm,1,"eclatcm",langue.cat26);
        loadmarker(listdent,Dent,1,"dent",langue.cat78,"dent");
        loadmarker(listartefact,Artefact,1,"artefact",langue.cat76);
        loadmarker(listlapis,Lapis,1,"lapis",langue.cat41);
        loadmarker(listjade,Jade,1,"jade",langue.cat39);
        loadmarker(listnoyauc,Noyauc,1,"noyauc",langue.cat44);
        loadmarker(listperle,Perle,1,"perle",langue.cat32);
        loadmarker(listconque,Conque,1,"conque",langue.cat40);
        loadmarker(listamethyste,Amethyste,1,"amethyste",langue.cat84);
        loadmarker(listffeu,Ffeu,1,"ffeu",langue.cat14);
        loadmarker(listfbrume,Fbrume,1,"fbrume",langue.cat13);
        loadmarker(listgdloup,Gdloup,1,"gdloup",langue.cat45);
        loadmarker(listpomme,Pomme,1,"pomme",langue.cat15);
        loadmarker(listcarotte,Carotte,1,"carotte",langue.cat16);
        loadmarker(listradis,Radis,1,"radis",langue.cat17);
        loadmarker(listhalampe,Halampe,1,"halampe",langue.cat20);
        loadmarker(listchrysantheme,Chrysantheme,1,"chrysantheme",langue.cat21);
        loadmarker(listlyscalla,Lyscalla,1,"lyscalla",langue.cat22);
        loadmarker(listtombaie,Tombaie,1,"tombaie",langue.cat18);
        loadmarker(listbacrochet,Bacrochet,1,"bacrochet",langue.cat24);
        loadmarker(listpissenlit,Pissenlit,1,"pissenlit",langue.cat19);
        loadmarker(listchanemo,Chanemo,1,"chanemo",langue.cat74)
        loadmarker(listcecilia,Cecilia,1,"cecilia",langue.cat23);
        loadmarker(listqingxin,Qingxin,1,"qingxin",langue.cat34);
        loadmarker(listmuguet,Muguet,1,"muguet",langue.cat35,"muguet");
        loadmarker(listpiment,Piment,1,"piment",langue.cat36);
        loadmarker(listlysverni,Lysverni,1,"lysverni",langue.cat37);
        loadmarker(listfsoie,Fsoie,1,"fsoie",langue.cat38);
        loadmarker(listbambou,Bambou,1,"bambou",langue.cat31);
        loadmarker(listlotus,Lotus,1,"lotus",langue.cat33);
        loadmarker(listanguille,Anguille,1,"anguille",langue.cat95);
        loadmarker(listcfluo,Cfluo,1,"cfluo",langue.cat98);
        loadmarker(listdendro,Dendro,1,"dendro",langue.cat90);
        loadmarker(listfamakumo,Famakumo,1,"famakumo",langue.cat96);
        loadmarker(listfcerisier,Fcerisier,1,"fcerisier",langue.cat85);
        loadmarker(listganoderma,Ganoderma,1,"ganoderma",langue.cat81);
        loadmarker(listhsanglot,Hsanglot,1,"hsanglot",langue.cat86);
        loadmarker(listherbem,Herbem,1,"herbem",langue.cat82);
        loadmarker(listmelonl,Melonl,1,"melonl",langue.cat83);
        loadmarker(listmoelle,Moelle,1,"moelle",langue.cat92);
        loadmarker(listcorail,Corail,1,"corail",langue.cat97);
        loadmarker(listscarabuto,Scarabuto,1,"scarabuto",langue.cat87);
        loadmarker(listgrenouille,Grenouille,1,"grenouille",langue.cat27);
        loadmarker(listlezard,Lezard,1,"lezard",langue.cat28);
        loadmarker(listpapillon,Papillon,1,"papillon",langue.cat42);
        loadmarker(listluciole,Luciole,1,"luciole",langue.cat43);
        loadmarker(listcrabe,Crabe,1,"crabe",langue.cat64);
        // loadmarker(listviteclair,Viteclair,1,"viteclair",langue.cat89,"","viteclair");
        // loadmarker(listoceanide2,Oceanide2,"oceanide2",langue.cat75,"oceanidepa");
        // loadmarker(listoceanide3,Oceanide3,"oceanide3",langue.cat75,"oceanidefm");
        // loadmarker(listoceanide4,Oceanide4,"oceanide4",langue.cat75,"oceanideel");
        // loadmarker(listoceanide5,Oceanide5,"oceanide5",langue.cat75,"oceaniders");

    $('#total' + lgmenu).text(nbtmark + langue['ui-load']);

// Fonctions Interaction Map

    mymap.on("click", onMapClick);

    mymap.on('popupopen', function () {
        $(":checkbox").on("change", function(){
            var checkboxtype = this.name;
            var checkboxnumber = this.value;
            var checkboxstate = this.checked;
            selectarray (checkboxtype, checkboxnumber, checkboxstate);
        });
        if(document.getElementById("mapbox")){
            var checkboxtype = document.getElementById("mapbox").name;
            var checkboxnumber = document.getElementById("mapbox").value;
            var checkboxstate = activecb(checkboxtype,checkboxnumber);
            $("#mapbox").prop('checked', checkboxstate);
        };
    });

// Gestion du Menu

    $('.itembtn').on('click', function(e){
        e.preventDefault();
  
        var type = $(this).data('type');
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            mymap.addLayer(window[type+'Group']);
        } else {
            mymap.removeLayer(window[type+'Group']);
        };

        var itemstatut = [];
        $('.itembtn').each(function(){
            if ($(this).hasClass('active') && (itemstatut.indexOf($(this).data('type')) < 0)) {
                itemstatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinItem = JSON.stringify(itemstatut);
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

        var cheststatut = [];
        $('.chest' + lgmenu).each(function(){
            if ($(this).hasClass('active') && (cheststatut.indexOf($(this).data('type')) < 0)) {
                cheststatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinChest = JSON.stringify(cheststatut);
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
        
        var regionstatut = [];
        $('.region' + lgmenu).each(function(){
            if ($(this).hasClass('active') && (regionstatut.indexOf($(this).data('type')) < 0)) {
                regionstatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinRegion = JSON.stringify(regionstatut);
    });

    $('.matbtn').on('click', function() {
        var ndf = $(this).data('type');
        if (!($(this).hasClass('active'))) {
            $(this).attr('src', "media/icones/" + ndf + "on.png");
            $(this).toggleClass('active');
            mymap.addLayer(window[ndf+'Group']);
        } else {
            $(this).attr('src', "media/icones/" + ndf + "off.png");
            $(this).toggleClass('active');
            mymap.removeLayer(window[ndf+'Group']);
        };

        var btnstatut = [];
        $('.matbtn').each(function(){
            if ($(this).hasClass('active') && (btnstatut.indexOf($(this).data('type')) < 0)) {
                btnstatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinBtn = JSON.stringify(btnstatut);
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
        document.location.href='index.html';
    });

    $('.btnsave').on('click', function() {
        this.href=URL.createObjectURL(new Blob([JSON.stringify(savemarkers())]));
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

    $('.btngolden').on('click', function () {
        document.location.href='index2.html';
    });

    // }); // Fin Fonction globale

    initarray();
    reselectmenu();
    checkinfo();

// }); // Fin Windows load
