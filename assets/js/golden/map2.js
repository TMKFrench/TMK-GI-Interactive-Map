    var mymap;
    var markeropa;
    var catmarkers = [];
    var savearray = [];
    var teyvatarray = [
        'echo1','echo2','echo3','echo4','echo5','echo6','echo7','evt',
        'teleport','tpbarge','succes',
        'cordi','cdelic','cprec','cluxe','cdefi','cfee','cpeint','charp',
        'bshaman','bviandu','magea',
        'ferblanc','cristal','electrocris','noyauc','conque',
        'ffeu','fbrume','carotte','radis','pissenlit',
        'grenouille','lezard','papillon','luciole','crabe'];
    var nbtmark = 0;
    var langue, lgmenu;

// $(window).load(function(){

// Fonctions Interaction sur la Map

    function onMapClick(e) {
        console.log(langue["ui-click"] + mymap.wrapLatLng(e.latlng));
    }

    function onMarkerClick(e) {
        markeropa = this;
    }

    function checkinfo(e) {
        if (!localStorage.getItem('Mapversg') || !(localStorage.Mapversg === "1.6.4")) {
            localStorage.Mapversg = "1.6.4";
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
        return document.location.href = 'index2.html';
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
            return document.location.href = 'index2.html';
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
        if (localStorage.MenumapgenshinLiG) {
            var listatut = JSON.parse(localStorage.MenumapgenshinLiG);
        } else {
            localStorage.MenumapgenshinLiG = [];
        };
        if (localStorage.MenumapgenshinBtnG) {
            var btnstatut = JSON.parse(localStorage.MenumapgenshinBtnG);
        } else {
            localStorage.MenumapgenshinBtnG = [];
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
        crs: L.CRS.Simple,
        minZoom : -3,
        maxZoom : 1
    });

    mymap.zoomControl.setPosition('topright')
    mymap.setMaxBounds(new L.latLngBounds([-1000,-1000], [9192,9192]));
    var bounds = [[0,0], [8192,8192]];
    var image = L.imageOverlay('media/mapgolden.jpg', bounds).addTo(mymap);
    mymap.fitBounds(bounds);

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

    function loadmarker(marklist, markico, grp, marktitle, filename, cbxname) {
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
                case 12 : // sans popup
                    // Have a break, have a Kitkat
            };

            if(typeof cbxname !== 'undefined') {
                if (mtype == 11) {
                    curmarker = L.marker(marq[1], {icon: Null, title: ""}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
                    counternull += 1;
                } else {
                    if (mtype == 5)
                        titlem = (typeof marq[4] !=='undefined') ? marq[4] : marktitle;
                    else if (mtype == 0 || mtype == 3)
                        titlem = (typeof marq[3] !=='undefined') ? marq[3] : marktitle;
                    curmarker = L.marker(marq[1], {icon: markico, title: titlem, riseOnHover: true}).on('click', onMarkerClick).bindPopup(popup, popupOptions);
                }
            } else {
                if (mtype !== 12) {
                    curmarker = L.marker(marq[1], {icon: markico, title: marktitle, riseOnHover: true}).bindPopup(popup, popupOptions);
                } else {
                    curmarker = L.marker(marq[1], {icon: markico, title: marktitle});
                }
            };

            if(checkopa.indexOf(""+(i+1)) >= 0)
            curmarker.setOpacity(0.45);
            curmarker.addTo(lgrp);

        };
        console.log(marktitle + " : " + (marklist.length - counternull) + langue["ui-load"]);
        nbtmark += (marklist.length - counternull);
        // console.log("nombre de marqueur Total chargés : " + nbtmark); // Pour debug
    };

    // Chargement des Marqueurs

        loadmarker(listteleport,Teleport,"teleport",langue.cat02,"tpg");
        loadmarker(listtpbarge,Tpbarge,"tpbarge",langue.cat03,"tpb");
        loadmarker(listtpbargeold,Tpbarge,"tpbarge",langue.cat81,"tpbo");
        loadmarker(listcordi,Cordi,"cordi",langue.cat04,"ocg","cordig");
        loadmarker(listcdelic,Cdelic,"cdelic",langue.cat05,"dcg","cdelicg");
        loadmarker(listcprec,Cprec,"cprec",langue.cat06,"pcg","cprecg");
        loadmarker(listcluxe,Cluxe,"cluxe",langue.cat07,"lcg","cluxeg");
        loadmarker(listcdefi,Cdefi,"cdefi",langue.cat08,"defig","cdefig");
        loadmarker(listcfee,Cfee,"cfee",langue.cat09,"","cfeeg");
        loadmarker(listcpeint,Cpeint,"cpeint",langue.cat82,"cpeint","cpeint");
        loadmarker(listcharp,Charp,"charp",langue.cat83,"charp","charp");
        loadmarker(listferblanc,Ferblanc,"ferblanc",langue.cat25);
        loadmarker(listcristal,Cristal,"cristal",langue.cat11);
        loadmarker(listelectroc,Electrocris,"electrocris",langue.cat12);
        loadmarker(listconque,Conque,"conque",langue.cat40);
        // loadmarker(listnoyauc,Noyauc,"noyauc",langue.cat44);
        loadmarker(listcarotte,Carotte,"carotte",langue.cat16);
        loadmarker(listradis,Radis,"radis",langue.cat17);
        loadmarker(listffeu,Ffeu,"ffeu",langue.cat14);
        loadmarker(listfbrume,Fbrume,"fbrume",langue.cat13);
        loadmarker(listpissenlit,Pissenlit,"pissenlit",langue.cat19);
        // loadmarker(listgrenouille,Grenouille,"grenouille",langue.cat27);
        // loadmarker(listlezard,Lezard,"lezard",langue.cat28);
        // loadmarker(listpapillon,Papillon,"papillon",langue.cat42);
        // loadmarker(listluciole,Luciole,"luciole",langue.cat43);
        loadmarker(listcrabe,Crabe,"crabe",langue.cat64);
        loadmarker(listecho1,Echo1,"echo1",langue.cat79,"echo1","echo1");
        loadmarker(listecho2,Echo2,"echo2",langue.cat79,"echo2","echo2");
        loadmarker(listecho3,Echo3,"echo3",langue.cat79,"echo3","echo3");
        loadmarker(listecho4,Echo4,"echo4",langue.cat79,"echo4","echo4");
        loadmarker(listecho5,Echo5,"echo5",langue.cat79,"echo5","echo5");
        loadmarker(listecho6,Echo6,"echo6",langue.cat79,"echo6","echo6");
        loadmarker(listecho7,Echo7,"echo7",langue.cat79,"echo7","echo7");
        loadmarker(listevt,Evt,"evt",langue.cat84);

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
        localStorage.MenumapgenshinLiG = JSON.stringify(listatut);
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
        localStorage.MenumapgenshinBtnG = JSON.stringify(btnstatut);
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
        document.location.href='index2.html';
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

    $('.btnteyvat').on('click', function () {
        document.location.href='index.html';
    });

    // }); // Fin Fonction globale

    initarray();
    reselectmenu();
    checkinfo();

// }); // Fin Windows load
