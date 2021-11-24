    var mymap;
    var markeropa;
    var catmarkers = [];
    var savearray = [];
    var teyvatarray = [
        'viteclair',
        'statue','teleport','tpbarge','succes','pano','anemo','geocul','eleccul','agate','sceaugeo',
        'cordi','cdelic','cprec','cluxe','cdefi','cfee',"cfeee",'sanctum','sanctul','sanctui',
        'betrang','bgivre','brocheux','bshaman','bviandu','fmens','chasseur','colosse','gardien','geosaure','magea','magel','frap','merc','mitrail','pilleur','usurier',
        'ferblanc','argetoile','cristal','electrocris','eclatcm','artefact','dent','noyauc',
        'ffeu','fbrume','gdloup','pomme','carotte','radis',
        'halampe','chrysantheme','lyscalla','tombaie','bacrochet','pissenlit','cecilia','chanemo',
        'qingxin','muguet','piment','lysverni','fsoie','bambou','lotus','lapis','jade','perle','conque',
        'amethyste','dendro','fcerisier','ganoderma','hsanglot','herbem','melonl','moelle','scarabuto',
        'grenouille','lezard','papillon','luciole','crabe'];
    var nbtmark = 0;
    var langue, lgmenu;

// $(window).load(function(){

// Fonctions Interaction sur la Map

    function onMapClick(e) {
        console.log(langue["ui-click"] + mymap.project([e.latlng.lat, e.latlng.lng], mymap.getMaxZoom()));
    }

    function unproject(coord) {
        return mymap.unproject(coord, mymap.getMaxZoom());
      }
    
    function convcoord(coord) {
        var x = 2*(3584 + coord[1]);
        var y = 2*(9728 - coord[0]);
        return [x,y];
    }

    function onMarkerClick(e) {
        markeropa = this;
    }

    function checkinfo(e) {
        if (!localStorage.getItem('Mapvers') || !(localStorage.Mapvers === "5.2")) {
            localStorage.Mapvers = "5.2";
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
        $('#menu a[data-type]').each(function(){
            if ($(this).hasClass('active')) {
                // $('.' + $(this).data('type')).show();
                mymap.addLayer(window[$(this).data('type') + 'Group']);
            }
        });
        $('.matbtn').each(function(){
            if ($(this).hasClass('active')) {
                // $('.' + $(this).data('type')).show();
                mymap.addLayer(window[$(this).data('type') + 'Group']);
            }
        });
        if (localStorage.MenumapgenshinLi) {
            var listatut = JSON.parse(localStorage.MenumapgenshinLi);
        } else {
            localStorage.MenumapgenshinLi = [];
        };
        if (localStorage.MenumapgenshinBtn) {
            var btnstatut = JSON.parse(localStorage.MenumapgenshinBtn);
        } else {
            localStorage.MenumapgenshinBtn = [];
        };

        if(listatut){
            listatut.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active');
                // $('.' + element).show();
                mymap.addLayer(window[element + 'Group']);
            });
        };
        if (btnstatut){
            btnstatut.forEach(function(element) {
                $("#btn" + lgmenu + element).addClass('active').attr('src', "media/icones/" + element + "on.png");
                // $('.' + element).show();
                mymap.addLayer(window[element + 'Group']);
            });
        };

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
    mymap.setMaxBounds(new L.latLngBounds(unproject([7168,7168]), unproject([25600,25600])));

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

    // Chargement des Marqueurs

        loadmarker(liststatue,Statue,1,"statue",langue.cat01,"statue");
        loadmarker(listteleport,Teleport,1,"teleport",langue.cat02,"tp");
        loadmarker(listtpbarge,Tpbarge,1,"tpbarge",langue.cat79,"tpbi");
        loadmarker(listsucces,Succes,1,"succes",langue.cat46,"succes","succes");
        loadmarker(listpano,Pano,0,"pano",langue.cat03,"pano","pano");
        loadmarker(listpanol,Pano,0,"pano",langue.cat03,"panol","panol");
        loadmarker(listpanoi,Pano,1,"pano",langue.cat03,"panoi","panoi");
        loadmarker(listanemo,Anemo,0,"anemo",langue.cat10,"anemo","anemo");
        loadmarker(listgeocul,Geocul,0,"geocul",langue.cat29,"geoc","geocul");
        loadmarker(listeleccul,Eleccul,1,"eleccul",langue.cat80,"eleccul","eleccul");
        loadmarker(listagate,Agate,0,"agate",langue.cat47,"agate","agate");
        loadmarker(listsceaugeo,Sceaugeo,0,"sceaugeo",langue.cat30,"sg","sceaugeo");
        loadmarker(listcordi,Cordi,0,"cordi",langue.cat04,"oc","cordi");
        loadmarker(listcordil,Cordi,0,"cordi",langue.cat04,"ocl","cordil");
        loadmarker(listcordii,Cordi,1,"cordi",langue.cat04,"oci","cordii");
        loadmarker(listcdelic,Cdelic,0,"cdelic",langue.cat05,"dc","cdelic");
        loadmarker(listcdelicl,Cdelic,0,"cdelic",langue.cat05,"dcl","cdelicl");
        loadmarker(listcdelici,Cdelic,1,"cdelic",langue.cat05,"dci","cdelici");
        loadmarker(listcprec,Cprec,0,"cprec",langue.cat06,"pc","cprec");
        loadmarker(listcprecl,Cprec,0,"cprec",langue.cat06,"pcl","cprecl");
        loadmarker(listcpreci,Cprec,1,"cprec",langue.cat06,"pci","cpreci");
        loadmarker(listcluxe,Cluxe,0,"cluxe",langue.cat07,"lc","cluxe");
        loadmarker(listcluxel,Cluxe,0,"cluxe",langue.cat07,"lcl","cluxel");
        loadmarker(listcluxei,Cluxe,1,"cluxe",langue.cat07,"lci","cluxei");
        loadmarker(listcdefi,Cdefi,0,"cdefi",langue.cat08,"defi","cdefi");
        loadmarker(listcdefil,Cdefi,0,"cdefi",langue.cat08,"defil","cdefil");
        loadmarker(listcdefii,Cdefi,1,"cdefi",langue.cat08,"defii","cdefii");
        loadmarker(listcfee,Cfee,0,"cfee",langue.cat09,"","cfee");
        loadmarker(listcfeel,Cfee,0,"cfee",langue.cat09,"","cfeel");
        loadmarker(listcfeee,Cfeee,1,"cfeee",langue.cat88,"cfeee","cfeee");
        loadmarker(listsanctum,Sanctum,0,"sanctum",langue.cat70,"sanctum","sanctum");
        loadmarker(listsanctul,Sanctul,0,"sanctul",langue.cat71,"sanctul","sanctul");
        loadmarker(listsanctui,Sanctui,1,"sanctui",langue.cat91,"sanctui","sanctui");
        loadmarker(listbetrang,Betrang,0,"betrang",langue.cat49,"betrang");
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
        loadmarker(listargetoile,Argetoile,0,"argetoile",langue.cat48);
        loadmarker(listcristal,Cristal,1,"cristal",langue.cat11);
        loadmarker(listelectroc,Electrocris,1,"electrocris",langue.cat12);
        loadmarker(listeclatcm,Eclatcm,0,"eclatcm",langue.cat26);
        loadmarker(listdent,Dent,0,"dent",langue.cat78,"dent");
        loadmarker(listartefact,Artefact,1,"artefact",langue.cat76);
        loadmarker(listlapis,Lapis,0,"lapis",langue.cat41);
        loadmarker(listjade,Jade,0,"jade",langue.cat39);
        loadmarker(listnoyauc,Noyauc,0,"noyauc",langue.cat44);
        loadmarker(listperle,Perle,0,"perle",langue.cat32);
        loadmarker(listconque,Conque,0,"conque",langue.cat40);
        loadmarker(listamethyste,Amethyste,1,"amethyste",langue.cat84);
        loadmarker(listffeu,Ffeu,0,"ffeu",langue.cat14);
        loadmarker(listfbrume,Fbrume,0,"fbrume",langue.cat13);
        loadmarker(listgdloup,Gdloup,0,"gdloup",langue.cat45);
        loadmarker(listpomme,Pomme,0,"pomme",langue.cat15);
        loadmarker(listcarotte,Carotte,1,"carotte",langue.cat16);
        loadmarker(listradis,Radis,1,"radis",langue.cat17);
        loadmarker(listhalampe,Halampe,0,"halampe",langue.cat20);
        loadmarker(listchrysantheme,Chrysantheme,0,"chrysantheme",langue.cat21);
        loadmarker(listlyscalla,Lyscalla,0,"lyscalla",langue.cat22);
        loadmarker(listtombaie,Tombaie,0,"tombaie",langue.cat18);
        loadmarker(listbacrochet,Bacrochet,0,"bacrochet",langue.cat24);
        loadmarker(listpissenlit,Pissenlit,0,"pissenlit",langue.cat19);
        loadmarker(listchanemo,Chanemo,0,"chanemo",langue.cat74)
        loadmarker(listcecilia,Cecilia,0,"cecilia",langue.cat23);
        loadmarker(listqingxin,Qingxin,0,"qingxin",langue.cat34);
        loadmarker(listmuguet,Muguet,0,"muguet",langue.cat35,"muguet");
        loadmarker(listpiment,Piment,0,"piment",langue.cat36);
        loadmarker(listlysverni,Lysverni,0,"lysverni",langue.cat37);
        loadmarker(listfsoie,Fsoie,0,"fsoie",langue.cat38);
        loadmarker(listbambou,Bambou,0,"bambou",langue.cat31);
        loadmarker(listlotus,Lotus,0,"lotus",langue.cat33);
        loadmarker(listdendro,Dendro,1,"dendro",langue.cat90);
        loadmarker(listfcerisier,Fcerisier,1,"fcerisier",langue.cat85);
        loadmarker(listganoderma,Ganoderma,1,"ganoderma",langue.cat81);
        loadmarker(listhsanglot,Hsanglot,1,"hsanglot",langue.cat86);
        loadmarker(listherbem,Herbem,1,"herbem",langue.cat82);
        loadmarker(listmelonl,Melonl,1,"melonl",langue.cat83);
        loadmarker(listmoelle,Moelle,1,"moelle",langue.cat92);
        loadmarker(listscarabuto,Scarabuto,1,"scarabuto",langue.cat87);
        loadmarker(listgrenouille,Grenouille,0,"grenouille",langue.cat27);
        loadmarker(listlezard,Lezard,0,"lezard",langue.cat28);
        loadmarker(listpapillon,Papillon,0,"papillon",langue.cat42);
        loadmarker(listluciole,Luciole,0,"luciole",langue.cat43);
        loadmarker(listcrabe,Crabe,1,"crabe",langue.cat64);
        loadmarker(listviteclair,Viteclair,1,"viteclair",langue.cat89,"","viteclair");
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

    $('#menu a[data-type]').on('click', function(e){
        e.preventDefault();
  
        var type = $(this).data('type');
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            mymap.addLayer(window[type+'Group']);
        } else {
            mymap.removeLayer(window[type+'Group']);
        };

        var listatut = [];
        $('#menu a[data-type]').each(function(){
            if ($(this).hasClass('active') && (listatut.indexOf($(this).data('type')) < 0)) {
                listatut.push($(this).data('type'));
            };
        });
        localStorage.MenumapgenshinLi = JSON.stringify(listatut);
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
