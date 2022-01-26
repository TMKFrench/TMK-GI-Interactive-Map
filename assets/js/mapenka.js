    var mymap;
    var markeropa;
    var catmarkers = [];
    var savearray = [];
    var teyvatarray = [
        'teleport','enkagate','cyclejn','triangle','peche','succes',
        'clesigil1','clesigil2','clesigil3','clesigil4','clesigil5',
        'cordi','cdelic','cprec','cluxe','cdefi','cfee','pierrekc',
        'ferblanc','amethyste','electrocris','noyauc','perle','corail',
        'ffeu','fbrume','ganoderma','herbem',
        'grenouille','crabe'];
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
    
    function onMarkerClick(e) {
        markeropa = this;
    }

    function checkinfo(e) {
        if (!localStorage.getItem('Mapversenka') || !(localStorage.Mapversenka === "1.3.1")) {
            localStorage.Mapversenka = "1.3.1";
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
        return document.location.href = 'indexenka.html';
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
            return document.location.href = 'indexenka.html';
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
        if (localStorage.MenumapgenshinLiEnka) {
            var listatut = JSON.parse(localStorage.MenumapgenshinLiEnka);
        } else {
            localStorage.MenumapgenshinLiEnka = [];
        };
        if (localStorage.MenumapgenshinBtnEnka) {
            var btnstatut = JSON.parse(localStorage.MenumapgenshinBtnEnka);
        } else {
            localStorage.MenumapgenshinBtnEnka = [];
        };

        if(listatut){
            listatut.forEach(function(element) {
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

    };

    // $(function () {

// Initialisation et chargement de la Map

    mymap = L.map('mapid', {
        // crs: L.CRS.Simple,
        center : [0,0],
        zoom : 2
    });

    L.tileLayer('media/tilesenka/{z}/{x}/{y}.png', {
        // attribution: none,
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

            if(checkopa.indexOf(""+(i+1)) >= 0)
            curmarker.setOpacity(0.45);
            curmarker.addTo(lgrp);

        };
        console.log(marktitle + " : " + (marklist.length - counternull) + langue["ui-load"]);
        nbtmark += (marklist.length - counternull);
        // console.log("nombre de marqueur Total chargés : " + nbtmark); // Pour debug
    };

    // Chargement des Marqueurs marklist, markico, grp, marktitle, filename, cbxname

        loadmarker(listteleport,Teleport,"teleport",langue.cat02,"tpe");
        loadmarker(listenkagate,Enkagate,"enkagate",langue.cat100,"egate");
        loadmarker(listcyclejn,Cyclejn,"cyclejn",langue.cat101);
        loadmarker(listtriangle,Triangle,"triangle",langue.cat102,"triangle","triangle");
        loadmarker(listtrianglenocb,Triangle,"triangle",langue.cat102,"trianglenocb");
        loadmarker(listpierrekc,Pierrekc,"pierrekc",langue.cat103,"pierrekc","pierrekc");
        loadmarker(listclesigil1,Clesigil1,"clesigil1",langue.cat104,"clesigil1-","clesigil1");
        loadmarker(listclesigil2,Clesigil2,"clesigil2",langue.cat105,"clesigil2-","clesigil2");
        loadmarker(listclesigil3,Clesigil3,"clesigil3",langue.cat106,"clesigil3-","clesigil3");
        loadmarker(listclesigil4,Clesigil4,"clesigil4",langue.cat107,"clesigil4-","clesigil4");
        loadmarker(listclesigil5,Clesigil5,"clesigil5",langue.cat108,"clesigil5-","clesigil5");
        loadmarker(listcordi,Cordi,"cordi",langue.cat04,"oce","cordie");
        loadmarker(listcdelic,Cdelic,"cdelic",langue.cat05,"dce","cdelice");
        loadmarker(listcprec,Cprec,"cprec",langue.cat06,"pce","cprece");
        loadmarker(listcluxe,Cluxe,"cluxe",langue.cat07,"lce","cluxee");
        loadmarker(listcdefi,Cdefi,"cdefi",langue.cat08,"defie","cdefie");
        loadmarker(listcfee,Cfee,"cfee",langue.cat09,"","cfeeenko");
        loadmarker(listferblanc,Ferblanc,"ferblanc",langue.cat25);
        loadmarker(listamethyste,Amethyste,"amethyste",langue.cat84);
        loadmarker(listelectroc,Electrocris,"electrocris",langue.cat12);
        loadmarker(listnoyauc,Noyauc,"noyauc",langue.cat44);
        loadmarker(listperle,Perle,"perle",langue.cat32);
        loadmarker(listcorail,Corail,"corail",langue.cat97);
        loadmarker(listffeu,Ffeu,"ffeu",langue.cat14);
        loadmarker(listfbrume,Fbrume,"fbrume",langue.cat13);
        loadmarker(listganoderma,Ganoderma,"ganoderma",langue.cat81);
        loadmarker(listherbem,Herbem,"herbem",langue.cat82);
        loadmarker(listgrenouille,Grenouille,"grenouille",langue.cat27);
        loadmarker(listcrabe,Crabe,"crabe",langue.cat64);

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
        localStorage.MenumapgenshinLiEnka = JSON.stringify(listatut);
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
        localStorage.MenumapgenshinBtnEnka = JSON.stringify(btnstatut);
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
        document.location.href='indexenka.html';
    });

    $('.btnsave').on('click', function() {
        this.href=URL.createObjectURL(new Blob([JSON.stringify(savemarkers())]));
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
