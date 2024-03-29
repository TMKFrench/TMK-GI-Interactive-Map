// Layers

var teyvatarray = ['teleport','lumen','lampe','peche','quete','succes','pano','cordi','cdelic','cprec','cluxe','cdefi','cfee','ferblanc','cristal','lapis','jade','noyauc','fbrume','gdloup','champitoile','grenouille','lezard','luciolichance','belette','artefact','tasdepierre','orbeprof','message','fossile',
];

// Initialisation des Markers

var initDatas = {
teleport:{List:'teleport', Icon:'Teleport', Grp:'teleport', Title:langue.cat02, Filename:'tpgo'},
lumen:{List:'lumen', Icon:'Lumen', Grp:'lumen', Title:langue.cat116, Filename:'lumen', Cbx:'lumen'},
lampe:{List:'lampe', Icon:'Lampe', Grp:'lampe', Title:langue.cat117},
peche:{List:'peche', Icon:'Peche', Grp:'peche', Title:langue.cat94, Filename:'pechego'},
quete:{List:'quete', Icon:'Quete', Grp:'quete', Title:langue.cat118, Filename:'quetego', Cbx:'quetego'},
succes:{List:'succes', Icon:'Succes', Grp:'succes', Title:langue.cat46, Filename:'succesgo', Cbx:'succesgo'},
pano:{List:'pano', Icon:'Pano', Grp:'pano', Title:langue.cat03, Filename:'panogo', Cbx:'panogo'},
cordi:{List:'cordi', Icon:'Cordi', Grp:'cordi', Title:langue.cat04, Filename:'ocgo', Cbx:'cordigo'},
cdelic:{List:'cdelic', Icon:'Cdelic', Grp:'cdelic', Title:langue.cat05, Filename:'dcgo', Cbx:'cdelicgo'},
cprec:{List:'cprec', Icon:'Cprec', Grp:'cprec', Title:langue.cat06, Filename:'pcgo', Cbx:'cprecgo'},
cluxe:{List:'cluxe', Icon:'Cluxe', Grp:'cluxe', Title:langue.cat07, Filename:'lcgo', Cbx:'cluxego'},
cdefi:{List:'cdefi', Icon:'Cdefi', Grp:'cdefi', Title:langue.cat08, Filename:'defigo', Cbx:'cdefigo'},
cfee:{List:'cfee', Icon:'Cfee', Grp:'cfee', Title:langue.cat09, Filename:'cfeego', Cbx:'cfeego'},
ferblanc:{List:'ferblanc', Icon:'Ferblanc', Grp:'ferblanc', Title:langue.cat25},
cristal:{List:'cristal', Icon:'Cristal', Grp:'cristal', Title:langue.cat11},
lapis:{List:'lapis', Icon:'Lapis', Grp:'lapis', Title:langue.cat41},
jade:{List:'jade', Icon:'Jade', Grp:'jade', Title:langue.cat39},
noyauc:{List:'noyauc', Icon:'Noyauc', Grp:'noyauc', Title:langue.cat44},
fbrume:{List:'fbrume', Icon:'Fbrume', Grp:'fbrume', Title:langue.cat13},
gdloup:{List:'gdloup', Icon:'Gdloup', Grp:'gdloup', Title:langue.cat45},
champitoile:{List:'champitoile', Icon:'Champitoile', Grp:'champitoile', Title:langue.cat119},
grenouille:{List:'grenouille', Icon:'Grenouille', Grp:'grenouille', Title:langue.cat27},
lezard:{List:'lezard', Icon:'Lezard', Grp:'lezard', Title:langue.cat28},
luciolichance:{List:'luciolichance', Icon:'Luciolichance', Grp:'luciolichance', Title:langue.cat120},
belette:{List:'belette', Icon:'Belette', Grp:'belette', Title:langue.cat121},
artefact:{List:'artefact', Icon:'Artefact', Grp:'artefact', Title:langue.cat76},
tasdepierre:{List:'tasdepierre', Icon:'Tasdepierre', Grp:'tasdepierre', Title:langue.cat123, Filename:'tas2pierrego', Cbx:'tasdepierrego'},
orbeprof:{List:'orbeprof', Icon:'Orbeprof', Grp:'orbeprof', Title:langue.cat125, Filename:'orbeprof', Cbx:'orbeprof'},
message:{List:'message', Icon:'Message', Grp:'message', Title:langue.cat126, Filename:'messagego', Cbx:'messagego'},
fossile:{List:'fossile', Icon:'Fossile', Grp:'fossile', Title:langue.cat127, Filename:'fossile', Cbx:'fossile'},
};

// Liste des Marqueurs

// Téléporteurs

var listteleport = [
	[0,[ 7596, 6047],{id:'00001',mid:'01'}],[0,[ 6641, 6199],{id:'00002',mid:'02'}],[0,[ 8067, 6458],{id:'00003',mid:'03'}],[0,[ 8914, 6365],{id:'00004',mid:'04'}],[0,[ 6675, 7188],{id:'00005',mid:'05'}],[0,[ 7606, 7413],{id:'00006',mid:'06'}],[0,[ 9138, 7206],{id:'00007',mid:'07'}],[0,[ 5410, 8231],{id:'00008',mid:'08'}],[0,[ 4952, 9054],{id:'00009',mid:'09'}],[0,[ 7012, 8896],{id:'00010',mid:'10'}],
	[0,[ 8676, 8653],{id:'00011',mid:'11'}],[0,[ 9031, 8267],{id:'00012',mid:'12'}],[0,[ 7864, 9370],{id:'00013',mid:'13'}],[0,[ 8828, 9528],{id:'00014',mid:'14'}],[3,[ 8154, 8120],{id:'00407',mid:'15'}]
];

// Cristal de Lumen

var listlumen = [
	[3,[ 8711, 5517],{id:'00015',mid:'01',text:langue.com320+langue.com321}],[0,[ 8214, 5590],{id:'00016',mid:'02'}],[0,[ 8528, 5774],{id:'00017',mid:'03'}],[0,[ 7660, 5939],{id:'00018',mid:'04'}],[0,[ 7293, 6160],{id:'00019',mid:'05'}],[0,[ 6581, 5971],{id:'00020',mid:'06'}],[0,[ 6537, 6465],{id:'00021',mid:'07'}],[0,[ 6821, 6451],{id:'00022',mid:'08'}],[0,[ 8120, 5986],{id:'00023',mid:'09'}],[0,[ 8256, 5989],{id:'00024',mid:'10'}],
	[0,[ 8630, 5994],{id:'00025',mid:'11'}],[0,[ 9059, 5963],{id:'00026',mid:'12'}],[5,[ 9245, 6123],{id:'00027',mid:'13',video:'xzYQl-N8-0I',text:langue.succesgoh003}],[0,[ 8740, 6224],{id:'00028',mid:'14'}],[0,[ 9415, 6378],{id:'00029',mid:'15'}],[5,[ 8088, 6120],{id:'00030',mid:'16',video:'6K_RYerUfK0'}],[0,[ 7842, 6280],{id:'00031',mid:'17'}],[0,[ 8156, 6326],{id:'00032',mid:'18'}],[0,[ 8656, 6427],{id:'00033',mid:'19'}],[0,[ 7643, 6445],{id:'00034',mid:'20'}],
	[0,[ 7855, 6513],{id:'00035',mid:'21'}],[0,[ 9038, 6592],{id:'00036',mid:'22'}],[0,[ 7916, 6719],{id:'00037',mid:'23'}],[0,[ 9222, 6733],{id:'00038',mid:'24'}],[0,[ 7374, 6761],{id:'00039',mid:'25'}],[0,[ 7960, 6815],{id:'00040',mid:'26'}],[0,[ 8308, 6792],{id:'00041',mid:'27'}],[0,[ 5992, 6823],{id:'00042',mid:'28'}],[0,[ 6146, 7094],{id:'00043',mid:'29'}],[0,[ 6634, 7142],{id:'00044',mid:'30'}],
	[0,[ 6490, 7220],{id:'00045',mid:'31'}],[5,[ 7431, 7057],{id:'00046',mid:'32',video:'BUoLABYaFAg'}],[0,[ 7481, 7210],{id:'00047',mid:'33'}],[0,[ 7804, 7308],{id:'00048',mid:'34'}],[0,[ 7623, 7366],{id:'00049',mid:'35'}],[0,[ 7439, 7372],{id:'00050',mid:'36'}],[0,[ 7149, 7501],{id:'00051',mid:'37'}],[3,[ 7604, 7788],{id:'00052',mid:'38'}],[0,[ 8016, 7675],{id:'00053',mid:'39'}],[0,[ 8252, 7153],{id:'00054',mid:'40'}],
	[0,[ 8611, 7328],{id:'00055',mid:'41'}],[0,[ 8833, 7167],{id:'00056',mid:'42'}],[0,[ 9004, 7067],{id:'00057',mid:'43'}],[0,[ 9155, 7049],{id:'00058',mid:'44'}],[0,[ 9227, 6901],{id:'00059',mid:'45'}],[0,[ 9632, 7202],{id:'00060',mid:'46'}],[0,[ 9676, 7534],{id:'00061',mid:'47'}],[0,[ 8968, 8005],{id:'00062',mid:'48'}],[0,[ 8959, 8265],{id:'00063',mid:'49'}],[0,[ 8856, 8544],{id:'00064',mid:'50'}],
	[0,[ 8700, 8582],{id:'00065',mid:'51',text:langue.com322}],[0,[ 8838, 8788],{id:'00066',mid:'52'}],[0,[ 8683, 8691],{id:'00067',mid:'53'}],[0,[ 8416, 8655],{id:'00068',mid:'54'}],[0,[ 8416, 8712],{id:'00069',mid:'55'}],[0,[ 8147, 8432],{id:'00070',mid:'56'}],[0,[ 8133, 8790],{id:'00071',mid:'57'}],[0,[ 7960, 8668],{id:'00072',mid:'58'}],[0,[ 7776, 8310],{id:'00073',mid:'59'}],[0,[ 7406, 8358],{id:'00074',mid:'60'}],
	[0,[ 7219, 8532],{id:'00075',mid:'61'}],[0,[ 7275, 8661],{id:'00076',mid:'62'}],[0,[ 6462, 8799],{id:'00077',mid:'63'}],[0,[ 6381, 8796],{id:'00078',mid:'64',text:langue.com322}],[0,[ 5970, 8690],{id:'00079',mid:'65'}],[0,[ 5599, 8179],{id:'00080',mid:'66'}],[0,[ 5131, 8366],{id:'00081',mid:'67'}],[0,[ 5101, 8484],{id:'00082',mid:'68'}],[0,[ 4927, 8983],{id:'00083',mid:'69'}],[0,[ 4507, 9008],{id:'00084',mid:'70'}],
	[0,[ 7693, 8945],{id:'00085',mid:'71'}],[0,[ 7229, 9163],{id:'00086',mid:'72'}],[0,[ 7069, 9318],{id:'00087',mid:'73'}],[0,[ 7427, 9656],{id:'00088',mid:'74'}],[0,[ 7787, 9584],{id:'00089',mid:'75'}],[0,[ 8215, 9635],{id:'00090',mid:'76'}],[0,[ 8777, 9181],{id:'00091',mid:'77'}],[5,[ 8988, 9511],{id:'00092',mid:'78',video:'mmvY8eaNRB8',text:langue.com320}],[0,[ 8608, 9540],{id:'00093',mid:'79'}],[0,[ 8671, 9692],{id:'00094',mid:'80'}],
	[0,[ 8762, 9891],{id:'00095',mid:'81'}],[0,[ 8651,10055],{id:'00096',mid:'82'}]
];

// Lampe de Lumen

var listlampe = [
	[12,[ 5933, 7170],{id:'00097',mid:'01'}],[12,[ 6484, 6297],{id:'00098',mid:'02'}],[12,[ 6499, 6471],{id:'00099',mid:'03'}],[12,[ 6644, 6533],{id:'00100',mid:'04'}],[12,[ 6733, 6560],{id:'00101',mid:'05'}],[12,[ 6880, 6338],{id:'00102',mid:'06'}],[12,[ 7609, 5942],{id:'00103',mid:'07'}],[12,[ 7630, 6313],{id:'00104',mid:'08'}],[12,[ 7648, 6451],{id:'00105',mid:'09'}],[12,[ 8061, 6361],{id:'00106',mid:'10'}],
	[12,[ 8105, 6220],{id:'00107',mid:'11'}],[12,[ 7936, 6042],{id:'00108',mid:'12'}],[12,[ 7924, 5939],{id:'00109',mid:'13'}],[12,[ 7947, 5764],{id:'00110',mid:'14'}],[12,[ 8263, 5654],{id:'00111',mid:'15'}],[12,[ 8465, 5857],{id:'00112',mid:'16'}],[12,[ 8597, 6191],{id:'00113',mid:'17'}],[12,[ 8584, 6393],{id:'00114',mid:'18'}],[12,[ 8884, 6362],{id:'00115',mid:'19'}],[12,[ 9144, 6427],{id:'00116',mid:'20'}],
	[12,[ 9419, 6561],{id:'00117',mid:'21'}],[12,[ 9597, 6640],{id:'00118',mid:'22'}],[12,[ 9225, 6707],{id:'00119',mid:'23'}],[12,[ 9263, 6936],{id:'00120',mid:'24'}],[12,[ 9543, 7168],{id:'00121',mid:'25'}],[12,[ 9424, 7377],{id:'00122',mid:'26'}],[12,[ 9009, 7482],{id:'00123',mid:'27'}],[12,[ 8768, 7396],{id:'00124',mid:'28'}],[12,[ 8900, 6374],{id:'00125',mid:'29'}]
];

// Spot de Pêche

var listpeche = [
	[7,[ 7649, 7125],{id:'00126',mid:'01'}],[7,[ 7362, 8183],{id:'00127',mid:'02'}]
];

// Quête

var listquete = [
	[0,[ 7787, 9486],{id:'00612',mid:'01',text:langue.quetegoh01,title:langue.quetegot01}],[0,[ 7753, 9536],{id:'00618',mid:'02',text:langue.quetegoh02,title:langue.quetegot02}],[0,[ 8257, 8807],{id:'00619',mid:'03',text:langue.quetegoh03,title:langue.quetegot03}],[0,[ 8574, 7371],{id:'00620',mid:'04',text:langue.quetegoh04,title:langue.quetegot04}],[0,[ 8321, 7189],{id:'00621',mid:'05',text:langue.quetegoh05,title:langue.quetegot05}],[0,[ 7408, 9640],{id:'00622',mid:'06',text:langue.quetegoh06,title:langue.quetegot06}],[0,[ 7052, 8836],{id:'00623',mid:'07',text:langue.quetegoh07,title:langue.quetegot07}],[0,[ 7784, 9420],{id:'00624',mid:'08',text:langue.quetegoh08,title:langue.quetegot08}],[0,[ 7801, 9423],{id:'00625',mid:'09',text:langue.quetegoh09,title:langue.quetegot09}],[0,[ 7185, 8703],{id:'00630',mid:'10',text:langue.quetegoh10,title:langue.quetegot10}],
	[5,[ 7755, 9448],{id:'00635',mid:'11',video:'_4jtzTdDU2s',text:langue.quetegoh11,title:langue.quetegot11}],[5,[ 7762, 9471],{id:'00636',mid:'12',video:'I7PHs_inObI',text:langue.quetegoh12,title:langue.quetegot12}],[5,[ 7755, 9493],{id:'00637',mid:'13',video:'9iiYp16aMp0',text:langue.quetegoh13,title:langue.quetegot13}]
];

// Succès

var listsucces = [
	[5,[ 9813, 7375],{id:'00296',mid:'01',video:'ciwGxaiAKWc',text:langue.succesgoh001,title:langue.succesgot001}],[5,[ 9153, 6222],{id:'00403',mid:'02',video:'bYYoFRnRTOs',text:langue.succesgoh002,title:langue.succesgot002}],[5,[ 9221, 6164],{id:'00404',mid:'03',video:'S4Fx9Ev47q0',text:langue.succesgoh003,title:langue.succesgot003}],[3,[ 6224, 7329],{id:'00405',mid:'04',text:langue.succesgoh004,title:langue.succesgot004}],[5,[ 8291, 7132],{id:'00406',mid:'05',video:'HHloNNa-C0s',text:langue.succesgoh005,title:langue.succesgot005}],[3,[ 6196, 7329],{id:'00546',mid:'06',text:langue.succesgoh006,title:langue.succesgot006}],[5,[ 8174, 8786],{id:'00556',mid:'07',video:'alTQSYclv6k',text:langue.succesgoh007,title:langue.succesgot007}],[5,[ 6460, 8048],{id:'00594',mid:'08',video:'mB_9xBNlxnk',text:langue.succesgoh008,title:langue.succesgot008}],[5,[ 7340, 9692],{id:'00627',mid:'09',video:'N0A_HGDOYkg',text:langue.succesgoh009,title:langue.succesgot009}],[5,[ 5243, 8750],{id:'00628',mid:'10',video:'XezZIZ4r0GM',text:langue.succesgoh010,title:langue.succesgot010}],
	[0,[ 7731, 9471],{id:'00631',mid:'11',text:langue.succesgoh011,title:langue.succesgot011}],[0,[ 7730, 9537],{id:'00632',mid:'12',text:langue.succesgoh012,title:langue.succesgot012}],[5,[ 6377, 8176],{id:'00633',mid:'13',video:'9PXu1FbJ8G8',text:langue.succesgoh013,title:langue.succesgot013}],[5,[ 6533, 8176],{id:'00634',mid:'14',video:'BUWUHYGcoZ4',text:langue.succesgoh014,title:langue.succesgot014}]
];

// Panorama

var listpano = [
	[0,[ 9228, 6703],{id:'00128',mid:'01',text:langue.panogo1}],[0,[ 8490, 7248],{id:'00129',mid:'02',text:langue.panogo2}],[0,[ 8843, 8232],{id:'00130',mid:'03',text:langue.panogo3}],[0,[ 7624, 6501],{id:'00175',mid:'04',text:langue.panogo4}],[0,[ 7383, 9477],{id:'00176',mid:'05',text:langue.panogo5}],[0,[ 8211, 8056],{id:'00586',mid:'06',text:langue.panogo6}],[0,[ 5235, 8395],{id:'00629',mid:'07',text:langue.panogo7}]
];

// Coffres Ordinaires

var listcordi = [
	[0,[ 6799, 6559],{id:'00253',mid:'01',text:langue.com003}],[0,[ 6537, 6280],{id:'00254',mid:'02',text:langue.com308}],[0,[ 6303, 6540],{id:'00255',mid:'03',text:langue.com003}],[0,[ 6462, 6094],{id:'00256',mid:'04',text:langue.com307}],[0,[ 6902, 6392],{id:'00257',mid:'05',text:langue.com307}],[0,[ 6838, 6342],{id:'00258',mid:'06'}],[0,[ 6759, 6259],{id:'00259',mid:'07',text:langue.com307}],[0,[ 7159, 6222],{id:'00260',mid:'08',text:langue.com307}],[0,[ 7675, 6221],{id:'00261',mid:'09',text:langue.com003}],[5,[ 8029, 5918],{id:'00262',mid:'10',video:'cKzExDx3Tt4',text:langue.com310}],
	[3,[ 7821, 6516],{id:'00263',mid:'11',text:langue.com311}],[0,[ 8044, 6437],{id:'00264',mid:'12',text:langue.com314+langue.com316+langue.com307}],[0,[ 7671, 6543],{id:'00265',mid:'13',text:langue.com003}],[0,[ 8148, 5944],{id:'00266',mid:'14',text:langue.com308}],[0,[ 8239, 6134],{id:'00267',mid:'15',text:langue.com003}],[0,[ 8040, 6004],{id:'00268',mid:'16',text:langue.com003}],[0,[ 8026, 5610],{id:'00269',mid:'17',text:langue.com003}],[0,[ 8146, 5752],{id:'00270',mid:'18',text:langue.com307}],[0,[ 8178, 5558],{id:'00271',mid:'19',text:langue.com003}],[0,[ 8709, 6196],{id:'00272',mid:'20',text:langue.com003}],
	[0,[ 8890, 6256],{id:'00273',mid:'21'}],[0,[ 8493, 6207],{id:'00274',mid:'22',text:langue.com003}],[0,[ 8448, 5824],{id:'00275',mid:'23',text:langue.com003}],[0,[ 9124, 6973],{id:'00276',mid:'24',text:langue.com307}],[0,[ 9531, 6635],{id:'00277',mid:'25',text:langue.com310}],[0,[ 9370, 7180],{id:'00278',mid:'26',text:langue.com003}],[0,[ 9540, 7331],{id:'00279',mid:'27',text:langue.com003}],[0,[ 9001, 6727],{id:'00280',mid:'28',text:langue.com308}],[0,[ 6409, 6563],{id:'00380',mid:'29',text:langue.com314+langue.com315}],[0,[ 8359, 5685],{id:'00381',mid:'30',text:langue.com314+langue.com315}],
	[0,[ 6474, 6900],{id:'00382',mid:'31',text:langue.com003}],[0,[ 5894, 7500],{id:'00383',mid:'32',text:langue.com003}],[0,[ 6109, 7585],{id:'00384',mid:'33',text:langue.com308}],[0,[ 9199, 6219],{id:'00385',mid:'34',text:langue.com003}],[0,[ 8858, 8597],{id:'00386',mid:'35',text:langue.com314+langue.com315}],[0,[ 8317, 8809],{id:'00387',mid:'36',text:langue.com003}],[0,[ 8381, 8672],{id:'00388',mid:'37',text:langue.com308}],[0,[ 8391, 8118],{id:'00389',mid:'38',text:langue.com007}],[0,[ 7584, 7465],{id:'00390',mid:'39'}],[0,[ 8358, 8440],{id:'00486',mid:'40',text:langue.com320+langue.com315}],
	[0,[ 7948, 7934],{id:'00487',mid:'41',text:langue.com307}],[0,[ 8111, 8169],{id:'00488',mid:'42',text:langue.com320+langue.com315}],[0,[ 7932, 8371],{id:'00489',mid:'43',text:langue.com320+langue.com315}],[0,[ 7989, 8904],{id:'00490',mid:'44',text:langue.com310}],[0,[ 7830, 9077],{id:'00491',mid:'45',text:langue.com308}],[0,[ 7387, 7205],{id:'00492',mid:'46',text:langue.com320+langue.com315}],[0,[ 7310, 7608],{id:'00493',mid:'47',text:langue.com310}],[0,[ 7450, 8202],{id:'00494',mid:'48',text:langue.com003}],[0,[ 7463, 8423],{id:'00495',mid:'49'}],[0,[ 7240, 8397],{id:'00496',mid:'50',text:langue.com310}],
	[0,[ 7610, 8690],{id:'00497',mid:'51',text:langue.com003}],[0,[ 8501, 9378],{id:'00498',mid:'52',text:langue.com003}],[0,[ 8780, 9907],{id:'00499',mid:'53',text:langue.com320+langue.com315}],[0,[ 8858, 9987],{id:'00500',mid:'54',text:langue.com308}],[0,[ 7562, 9831],{id:'00501',mid:'55',text:langue.com003}],[0,[ 7194, 9500],{id:'00502',mid:'56',text:langue.com003}],[0,[ 6889, 8861],{id:'00503',mid:'57',text:langue.com307}],[0,[ 5063, 8474],{id:'00504',mid:'58'}],[0,[ 7583, 6347],{id:'00505',mid:'59',text:langue.com320+langue.com315}],[0,[ 8691, 7435],{id:'00506',mid:'60',text:langue.com320+langue.com315}],
	[0,[ 7488, 6170],{id:'00507',mid:'61'}],[0,[ 7505, 6040],{id:'00564',mid:'62'}],[0,[ 7574, 5839],{id:'00565',mid:'63'}],[0,[ 8148, 6254],{id:'00566',mid:'64'}],[0,[ 8885, 6612],{id:'00567',mid:'65',text:langue.com003}],[0,[ 9229, 7385],{id:'00568',mid:'66'}],[0,[ 7222, 7476],{id:'00569',mid:'67'}],[0,[ 8685, 7448],{id:'00570',mid:'68'}],[0,[ 7944, 7344],{id:'00595',mid:'69'}],[3,[ 9626, 6612],{id:'00596',mid:'70',text:langue.com330}],
	[5,[ 8976, 6623],{id:'00597',mid:'71',video:'eB5n_MEeQSY',text:langue.com331}]
];

// Coffres Délicats

var listcdelic = [
	[0,[ 6889, 5957],{id:'00281',mid:'01',text:langue.com003}],[0,[ 8158, 6251],{id:'00282',mid:'02',text:langue.com003}],[0,[ 8084, 6290],{id:'00283',mid:'03',text:langue.com307}],[5,[ 8355, 6294],{id:'00284',mid:'04',video:'KtWifuvg8xw',text:langue.com301}],[0,[ 7564, 6364],{id:'00285',mid:'05',text:langue.com003}],[5,[ 7942, 5970],{id:'00286',mid:'06',video:'bedcVz3bs1Q',text:langue.com301}],[5,[ 8016, 6566],{id:'00287',mid:'07',video:'7f6FZQZ3uR8',text:langue.com301}],[0,[ 8939, 6344],{id:'00288',mid:'08',text:langue.com308}],[0,[ 8542, 6110],{id:'00289',mid:'09',text:langue.com310}],[0,[ 9017, 6471],{id:'00290',mid:'10',text:langue.com003}],
	[0,[ 8588, 5632],{id:'00291',mid:'11',text:langue.com003}],[0,[ 9074, 5709],{id:'00292',mid:'12',text:langue.com003}],[0,[ 9352, 6369],{id:'00293',mid:'13',text:langue.com003}],[5,[ 9786, 7384],{id:'00294',mid:'14',video:'CxeNvymr7xs',text:langue.com312}],[5,[ 9250, 6035],{id:'00391',mid:'15',video:'7hYRpu0JaLM',text:langue.succesgoh003}],[5,[ 8403, 6770],{id:'00392',mid:'16',video:'CG-8AGrQIGc',text:langue.com301}],[0,[ 8548, 8385],{id:'00393',mid:'17',text:langue.com003}],[5,[ 7582, 7372],{id:'00508',mid:'18',video:'sACt8O1bX14',text:langue.com171}],[0,[ 7301, 7438],{id:'00509',mid:'19',text:langue.com003}],[5,[ 8634, 9148],{id:'00510',mid:'20',video:'FF10yIPdL0E',text:langue.com003}],
	[5,[ 8835, 9323],{id:'00511',mid:'21',video:'gMt26AI2EPY',text:langue.com301}],[0,[ 8669, 9499],{id:'00512',mid:'22',text:langue.com003}],[0,[ 8679, 9881],{id:'00513',mid:'23',text:langue.com324}],[0,[ 8596, 9991],{id:'00514',mid:'24',text:langue.com320+langue.com003}],[0,[ 8217, 9604],{id:'00515',mid:'25',text:langue.com308}],[0,[ 7200, 9100],{id:'00516',mid:'26',text:langue.com003}],[0,[ 6989, 9064],{id:'00517',mid:'27',text:langue.com003}],[0,[ 7230, 6956],{id:'00518',mid:'28',text:langue.com320+langue.com315}],[0,[ 9007, 6912],{id:'00519',mid:'29',text:langue.com320+langue.com315}],[0,[ 8205, 8850],{id:'00571',mid:'30',text:langue.com327}],
	[0,[ 5868, 8725],{id:'00572',mid:'31',text:langue.com003}],[3,[ 7870, 7385],{id:'00598',mid:'32',text:langue.com320+langue.com321}],[0,[ 8766, 6268],{id:'00599',mid:'33',text:langue.com320+langue.com315}],[5,[ 9222, 7194],{id:'00600',mid:'34',video:'OgPYU_HnG2c',text:langue.com301}]
];

// Coffres Précieux

var listcprec = [
	[0,[ 7886, 6277],{id:'00295',mid:'01',text:langue.com313+langue.com307}],[0,[ 9457, 6717],{id:'00297',mid:'02',text:langue.com003}],[5,[ 9256, 6047],{id:'00394',mid:'03',video:'bseO6U-n6Vw',text:langue.succesgoh003}],[5,[ 8330, 6951],{id:'00395',mid:'04',video:'tNEO7959das',text:langue.com177}],[5,[ 7804, 6985],{id:'00396',mid:'05',video:'-WrI7aALe_E',text:langue.com318}],[3,[ 7620, 7734],{id:'00520',mid:'06',text:langue.com320+langue.com321}],[5,[ 9003, 9527],{id:'00521',mid:'07',video:'Piz8Y_Pg-lE',text:langue.com201}],[5,[ 8970, 9699],{id:'00522',mid:'08',video:'J8YLMQBHauo',text:langue.com325}],[5,[ 8677, 9924],{id:'00523',mid:'09',video:'BHna3wy_oJE',text:langue.com320+langue.com326}],[0,[ 7288, 8934],{id:'00524',mid:'10',text:langue.com308}],
	[0,[ 8144, 8862],{id:'00573',mid:'11',text:langue.com327}],[5,[ 6396, 5980],{id:'00574',mid:'12',video:'QsqhBlzHTcg',text:langue.com328}],[0,[ 7400, 8512],{id:'00626',mid:'13',text:langue.com332}]
];

// Coffres Luxueux

var listcluxe = [
	[0,[ 9049, 7437],{id:'00397',mid:'01',text:langue.com317}],[5,[ 7412, 7175],{id:'00398',mid:'02',video:'ida4gfj9-es',text:langue.com319}],[0,[ 7388, 9679],{id:'00525',mid:'03'}],[0,[ 8141, 8417],{id:'00526',mid:'04'}],[0,[ 8206, 8893],{id:'00575',mid:'05',text:langue.com327}],[0,[ 4798, 8772],{id:'00576',mid:'06',text:langue.com317}]
];

// Coffres Défis

var listcdefi = [
	[5,[ 6444, 6430],{id:'00160',mid:'01',video:'G9B4f1mT4Ec',text:langue.com309+langue.br+langue.defip+40+langue.defis}],[5,[ 7563, 6124],{id:'00161',mid:'02',video:'cSWE8fDChHk',text:langue.com309+langue.br+langue.defik+80+langue.defis}],[5,[ 8064, 6289],{id:'00162',mid:'03',video:'WoRNQsxNx-c',text:langue.com309+langue.br+langue.defip+40+langue.defis}],[5,[ 8395, 6201],{id:'00163',mid:'04',video:'V3Sm3dXY_6o',text:langue.com309+langue.br+langue.defib+30+langue.defis}],[5,[ 9626, 6841],{id:'00164',mid:'05',video:'8bMy1dkPazw',text:langue.com309+langue.br+langue.defik+50+langue.defis}],[5,[ 8779, 7241],{id:'00165',mid:'06',video:'wOaAQOx56xc',text:langue.com309+langue.br+langue.defik+60+langue.defis}],[5,[ 8834, 7457],{id:'00166',mid:'07',video:'93fozlgW-Jw',text:langue.com309+langue.br+langue.defib+30+langue.defis}],[5,[ 7657, 6830],{id:'00167',mid:'08',video:'aavtaPFDSzo',text:langue.com309+langue.br+langue.defib+30+langue.defis}],[5,[ 7826, 7160],{id:'00168',mid:'09',video:'YAvEQSJLeKA',text:langue.com309+langue.br+langue.defip+40+langue.defis}],[5,[ 7576, 7241],{id:'00169',mid:'10',video:'MqVj6-i51aY',text:langue.com309+langue.br+langue.defik+60+langue.defis}],
	[5,[ 7203, 7641],{id:'00170',mid:'11',video:'xdwu51uIaRA',text:langue.com309+langue.br+langue.defib+30+langue.defis}],[5,[ 7200, 7832],{id:'00171',mid:'12',video:'Lbh9IRQJ8r0',text:langue.com309+langue.br+langue.defip+40+langue.defis}],[5,[ 7817, 8438],{id:'00172',mid:'13',video:'1-_kj9oUaJc',text:langue.com309+langue.br+langue.defip+60+langue.defis}],[5,[ 8271, 8888],{id:'00173',mid:'14',video:'qGa2HSkCeGc',text:langue.com309+langue.br+langue.defik+50+langue.defis}],[5,[ 8624, 9678],{id:'00174',mid:'15',video:'SrQ09sejWa4',text:langue.com309+langue.br+langue.defib+30+langue.defis}]
];

// Coffres des Fées

var listcfee = [
	[5,[ 6613, 5993],{id:'00131',mid:'01',video:'n2NdENNXW4E',text:langue.com189}],[5,[ 7875, 5926],{id:'00132',mid:'02',video:'nvrfFuyZfjU',text:langue.com040}],[5,[ 8713, 6148],{id:'00133',mid:'03',video:'AdzoVpK2YvY',text:langue.com189}],[5,[ 9035, 6187],{id:'00134',mid:'04',video:'7Rqeps1zAko',text:langue.com189}],[5,[ 8093, 6348],{id:'00135',mid:'05',video:'GV3yDwdZwD0',text:langue.com040}],[5,[ 8047, 6381],{id:'00136',mid:'06',video:'5QX7WDZUPtA'}],[5,[ 7745, 6434],{id:'00137',mid:'07',video:'sffBEY7P_p0'}],[5,[ 6642, 6546],{id:'00138',mid:'08',video:'WYPz9fZ0N5o',text:langue.com040}],[5,[ 6059, 6740],{id:'00139',mid:'09',video:'S_b8IqTHU0g',text:langue.com189}],[5,[ 6326, 6983],{id:'00140',mid:'10',video:'zpNve5I2Pds',text:langue.com189}],
	[5,[ 7132, 7173],{id:'00141',mid:'11',video:'y-HI5MXDxLU',text:langue.com323+langue.br+langue.com189}],[5,[ 7416, 7296],{id:'00142',mid:'12',video:'3FcUN49O0Vo',text:langue.com189}],[5,[ 7184, 7561],{id:'00143',mid:'13',video:'7k8Jp7CTdA8',text:langue.com189}],[5,[ 8342, 6791],{id:'00144',mid:'14',video:'VmqAsW3FvbA',text:langue.com189}],[5,[ 8517, 7253],{id:'00145',mid:'15',video:'S-m-deh6gpc',text:langue.com189}],[5,[ 8917, 6945],{id:'00146',mid:'16',video:'QuxpjVQHm-c',text:langue.com189}],[5,[ 9287, 6696],{id:'00147',mid:'17',video:'b2pRu6ejY6U',text:langue.com189}],[5,[ 9419, 7389],{id:'00148',mid:'18',video:'0KEVzp6ZA9E',text:langue.com189}],[5,[ 8987, 7765],{id:'00149',mid:'19',video:'bwupBptw0hw',text:langue.com189}],[5,[ 8119, 8234],{id:'00150',mid:'20',video:'yy_v9RtcYWQ',text:langue.com189}],
	[5,[ 8409, 8578],{id:'00151',mid:'21',video:'NpMoig6RAWU',text:langue.com189}],[5,[ 7208, 8616],{id:'00152',mid:'22',video:'Bc1vRWSKCRU',text:langue.com189}],[5,[ 5806, 8781],{id:'00153',mid:'23',video:'DXOLPiB2MJI',text:langue.com189}],[5,[ 7233, 9240],{id:'00154',mid:'24',video:'WqKbv1kAz00',text:langue.com189}],[5,[ 8722, 9375],{id:'00155',mid:'25',video:'3kYewCiWt9s',text:langue.com189}],[5,[ 8815, 9633],{id:'00156',mid:'26',video:'K_kkMLok4kk',text:langue.com189}],[5,[ 8675, 9932],{id:'00157',mid:'27',video:'OftZ9AFtIbY',text:langue.com040}],[0,[ 8640, 9990],{id:'00158',mid:'28'}],[0,[ 8716, 9978],{id:'00159',mid:'29'}],[5,[ 8393, 8335],{id:'00485',mid:'30',video:'VeP3r6clK6M',text:langue.com189}]
];

// Fer Blanc

var listferblanc = [
	[12,[ 8248, 6341],{id:'00219',mid:'01'}],[12,[ 7756, 6343],{id:'00220',mid:'02'}],[12,[ 7819, 6098],{id:'00221',mid:'03'}],[12,[ 7744, 5898],{id:'00222',mid:'04'}],[12,[ 9121, 6264],{id:'00223',mid:'05'}],[12,[ 9072, 6277],{id:'00224',mid:'06'}],[12,[ 9130, 6653],{id:'00225',mid:'07'}],[12,[ 9170, 6692],{id:'00226',mid:'08'}],[12,[ 9415, 7401],{id:'00227',mid:'09'}],[12,[ 9092, 7292],{id:'00228',mid:'10'}],
	[12,[ 6571, 6483],{id:'00338',mid:'11'}],[12,[ 6690, 6456],{id:'00339',mid:'12'}],[12,[ 8187, 6186],{id:'00340',mid:'13'}],[12,[ 6552, 7030],{id:'00341',mid:'14'}],[12,[ 8067, 6857],{id:'00342',mid:'15'}],[12,[ 8047, 6890],{id:'00343',mid:'16'}],[12,[ 8577, 8463],{id:'00344',mid:'17'}],[12,[ 8607, 8436],{id:'00345',mid:'18'}],[12,[ 8433, 9901],{id:'00437',mid:'19'}],[12,[ 7302, 7478],{id:'00553',mid:'20'}],
	[12,[ 7870, 7340],{id:'00591',mid:'21'}]
];

// Cristal

var listcristal = [
	[12,[ 8135, 6321],{id:'00229',mid:'01'}],[12,[ 7567, 6296],{id:'00230',mid:'02'}],[12,[ 7572, 6410],{id:'00231',mid:'03'}],[12,[ 7982, 5684],{id:'00232',mid:'04'}],[12,[ 8366, 6206],{id:'00233',mid:'05'}],[12,[ 8734, 6116],{id:'00234',mid:'06'}],[12,[ 8884, 6518],{id:'00235',mid:'07'}],[12,[ 8930, 6506],{id:'00236',mid:'08'}],[12,[ 8925, 6549],{id:'00237',mid:'09'}],[12,[ 9139, 6638],{id:'00238',mid:'10'}],
	[12,[ 9126, 6666],{id:'00239',mid:'11'}],[12,[ 9522, 7067],{id:'00240',mid:'12'}],[12,[ 9605, 6548],{id:'00241',mid:'13'}],[12,[ 7284, 6788],{id:'00346',mid:'14'}],[12,[ 6162, 7095],{id:'00347',mid:'15'}],[12,[ 6127, 7098],{id:'00348',mid:'16'}],[12,[ 6016, 7435],{id:'00349',mid:'17'}],[12,[ 6060, 7450],{id:'00350',mid:'18'}],[12,[ 8223, 7100],{id:'00351',mid:'19'}],[12,[ 8472, 7266],{id:'00352',mid:'20'}],
	[12,[ 8543, 7242],{id:'00353',mid:'21'}],[12,[ 8518, 7099],{id:'00354',mid:'22'}],[12,[ 8185, 7986],{id:'00438',mid:'23'}],[12,[ 8195, 8029],{id:'00439',mid:'24'}],[12,[ 7904, 8838],{id:'00440',mid:'25'}],[12,[ 7602, 7830],{id:'00441',mid:'26'}],[12,[ 7286, 8214],{id:'00442',mid:'27'}],[12,[ 7567, 8481],{id:'00443',mid:'28'}],[12,[ 8890, 9152],{id:'00444',mid:'29'}],[12,[ 8845, 9489],{id:'00445',mid:'30'}],
	[12,[ 8531, 9762],{id:'00446',mid:'31'}],[12,[ 8553, 9734],{id:'00447',mid:'32'}],[12,[ 7511, 9966],{id:'00448',mid:'33'}],[12,[ 7041, 9302],{id:'00449',mid:'34'}],[12,[ 7111, 9331],{id:'00450',mid:'35'}],[12,[ 6988, 8657],{id:'00451',mid:'36'}],[12,[ 6075, 8790],{id:'00452',mid:'37'}],[12,[ 5803, 8725],{id:'00453',mid:'38'}],[12,[ 6536, 5974],{id:'00551',mid:'39'}],[12,[ 8795, 7460],{id:'00562',mid:'40'}],
	[12,[ 5865, 8854],{id:'00563',mid:'41'}],[12,[ 7886, 7367],{id:'00592',mid:'42'}]
];

// Coeur de Lapis

var listlapis = [
	[12,[ 7442, 6184],{id:'00215',mid:'01'}],[12,[ 7399, 6174],{id:'00216',mid:'02'}],[12,[ 8236, 6353],{id:'00217',mid:'03'}],[12,[ 8162, 6045],{id:'00218',mid:'04'}],[12,[ 6389, 7273],{id:'00336',mid:'05'}],[12,[ 6325, 7195],{id:'00337',mid:'06'}],[12,[ 6401, 7212],{id:'00547',mid:'07'}],[12,[ 7857, 7323],{id:'00590',mid:'08'}]
];

// Jade Noctiluque

var listjade = [
	[12,[ 6503, 6179],{id:'00188',mid:'01'}],[12,[ 6740, 6411],{id:'00189',mid:'02'}],[12,[ 7590, 6195],{id:'00190',mid:'03'}],[12,[ 7714, 5989],{id:'00191',mid:'04'}],[12,[ 8228, 5774],{id:'00192',mid:'05'}],[12,[ 8666, 6455],{id:'00193',mid:'06'}],[12,[ 9000, 5763],{id:'00194',mid:'07'}],[12,[ 9005, 5814],{id:'00195',mid:'08'}],[12,[ 8914, 7096],{id:'00196',mid:'09'}],[12,[ 6436, 6433],{id:'00309',mid:'10'}],
	[12,[ 8097, 7882],{id:'00417',mid:'11'}],[12,[ 8507, 9963],{id:'00418',mid:'12'}],[12,[ 7839, 7371],{id:'00589',mid:'13'}]
];

// Noyau cristallin

var listnoyauc = [
	[12,[ 6464, 6180],{id:'00184',mid:'01'}],[12,[ 6367, 6182],{id:'00185',mid:'02'}],[12,[ 7397, 6052],{id:'00186',mid:'03'}],[12,[ 6173, 7528],{id:'00306',mid:'04'}],[12,[ 6412, 7396],{id:'00307',mid:'05'}],[12,[ 8845, 8998],{id:'00308',mid:'06'}],[12,[ 7282, 7760],{id:'00415',mid:'07'}],[12,[ 7308, 7590],{id:'00416',mid:'08'}]
];

// Fleurs de Brume

var listfbrume = [
	[12,[ 7808, 6846],{id:'00333',mid:'01'}],[12,[ 7842, 7028],{id:'00334',mid:'02'}],[12,[ 7542, 7238],{id:'00335',mid:'03'}],[12,[ 5587, 8259],{id:'00436',mid:'04'}]
];

// Gueule de Loup

var listgdloup = [
	[12,[ 7156, 6176],{id:'00212',mid:'01'}],[12,[ 7121, 6232],{id:'00213',mid:'02'}],[12,[ 7283, 6181],{id:'00214',mid:'03'}]
];

// Champitoile

var listchampitoile = [
	[12,[ 8794, 5783],{id:'00242',mid:'01'}],[12,[ 9054, 5788],{id:'00243',mid:'02'}],[12,[ 9047, 5607],{id:'00244',mid:'03'}],[12,[ 9044, 5963],{id:'00245',mid:'04'}],[12,[ 9075, 6050],{id:'00246',mid:'05'}],[12,[ 9076, 6113],{id:'00247',mid:'06'}],[12,[ 8305, 7187],{id:'00355',mid:'07'}],[12,[ 8445, 7154],{id:'00356',mid:'08'}],[12,[ 8510, 7155],{id:'00357',mid:'09'}],[12,[ 8548, 7040],{id:'00358',mid:'10'}],
	[12,[ 8516, 6852],{id:'00359',mid:'11'}],[12,[ 8386, 6775],{id:'00360',mid:'12'}],[12,[ 8285, 6935],{id:'00361',mid:'13'}],[12,[ 8296, 7155],{id:'00362',mid:'14'}],[12,[ 8164, 7077],{id:'00363',mid:'15'}],[12,[ 8193, 6771],{id:'00364',mid:'16'}],[12,[ 8088, 6746],{id:'00365',mid:'17'}],[12,[ 8018, 6803],{id:'00366',mid:'18'}],[12,[ 7928, 6828],{id:'00367',mid:'19'}],[12,[ 7999, 7719],{id:'00368',mid:'20'}],
	[12,[ 7848, 7488],{id:'00369',mid:'21'}],[12,[ 7715, 7463],{id:'00370',mid:'22'}],[12,[ 7750, 7368],{id:'00371',mid:'23'}],[12,[ 7632, 7404],{id:'00372',mid:'24'}],[12,[ 7615, 7474],{id:'00373',mid:'25'}],[12,[ 7305, 8606],{id:'00454',mid:'26'}],[12,[ 7170, 8608],{id:'00455',mid:'27'}],[12,[ 8865, 9295],{id:'00456',mid:'28'}],[12,[ 8816, 9427],{id:'00457',mid:'29'}],[12,[ 8674, 9483],{id:'00458',mid:'30'}],
	[12,[ 8581, 9549],{id:'00459',mid:'31'}],[12,[ 8611, 9649],{id:'00460',mid:'32'}],[12,[ 8696, 9666],{id:'00461',mid:'33'}],[12,[ 8774, 9751],{id:'00462',mid:'34'}],[12,[ 8523, 9704],{id:'00463',mid:'35'}],[12,[ 8980, 9761],{id:'00464',mid:'36'}],[12,[ 8192, 9630],{id:'00465',mid:'37'}],[12,[ 7656, 9728],{id:'00466',mid:'38'}],[12,[ 7613, 9909],{id:'00467',mid:'39'}],[12,[ 7370, 9916],{id:'00468',mid:'40'}],
	[12,[ 7464, 9716],{id:'00469',mid:'41'}],[12,[ 7339, 9476],{id:'00470',mid:'42'}],[12,[ 7096, 9512],{id:'00471',mid:'43'}],[12,[ 7425, 9385],{id:'00472',mid:'44'}],[12,[ 7441, 9307],{id:'00473',mid:'45'}],[12,[ 7327, 9132],{id:'00474',mid:'46'}],[12,[ 7274, 9165],{id:'00475',mid:'47'}],[12,[ 7118, 9224],{id:'00476',mid:'48'}],[12,[ 6948, 9084],{id:'00477',mid:'49'}],[12,[ 6992, 8844],{id:'00478',mid:'50'}],
	[12,[ 7155, 8673],{id:'00479',mid:'51'}],[12,[ 6873, 8808],{id:'00480',mid:'52'}],[12,[ 6709, 8776],{id:'00481',mid:'53'}],[12,[ 7860, 7348],{id:'00593',mid:'54'}]
];

// Grenouille

var listgrenouille = [
	[12,[ 8879, 5762],{id:'00187',mid:'01'}],[12,[ 9094, 5657],{id:'00211',mid:'02'}],[12,[ 8371, 7153],{id:'00329',mid:'03'}],[12,[ 7749, 6947],{id:'00330',mid:'04'}],[12,[ 8800, 7327],{id:'00331',mid:'05'}],[12,[ 8640, 7344],{id:'00332',mid:'06'}],[12,[ 8852, 9429],{id:'00431',mid:'07'}],[12,[ 8726, 9695],{id:'00432',mid:'08'}],[12,[ 6093, 8674],{id:'00433',mid:'09'}],[12,[ 5917, 8716],{id:'00434',mid:'10'}],
	[12,[ 5824, 8809],{id:'00435',mid:'11'}]
];

// Lézard

var listlezard = [
	[12,[ 6729, 6214],{id:'00209',mid:'01'}],[12,[ 6743, 5935],{id:'00210',mid:'02'}],[12,[ 7181, 6116],{id:'00320',mid:'03'}],[12,[ 6750, 7234],{id:'00321',mid:'04'}],[12,[ 9042, 7505],{id:'00322',mid:'05'}],[12,[ 8570, 6992],{id:'00323',mid:'06'}],[12,[ 8676, 8573],{id:'00324',mid:'07'}],[12,[ 8624, 8821],{id:'00325',mid:'08'}],[12,[ 8828, 9094],{id:'00326',mid:'09'}],[12,[ 8208, 7734],{id:'00327',mid:'10'}],
	[12,[ 7785, 7408],{id:'00328',mid:'11'}],[12,[ 8068, 7822],{id:'00423',mid:'12'}],[12,[ 7574, 7716],{id:'00424',mid:'13'}],[12,[ 7867, 9117],{id:'00425',mid:'14'}],[12,[ 8626, 9320],{id:'00426',mid:'15'}],[12,[ 5652, 8658],{id:'00427',mid:'16'}],[12,[ 4904, 9002],{id:'00428',mid:'17'}],[12,[ 4627, 9195],{id:'00429',mid:'18'}],[12,[ 4939, 8342],{id:'00430',mid:'19'}],[12,[ 6418, 6113],{id:'00548',mid:'20'}],
	[12,[ 6648, 6427],{id:'00552',mid:'21'}],[12,[ 8624, 9570],{id:'00557',mid:'22'}],[12,[ 6812, 8767],{id:'00558',mid:'23'}],[12,[ 6495, 8796],{id:'00559',mid:'24'}],[12,[ 5510, 8121],{id:'00560',mid:'25'}],[12,[ 4631, 8569],{id:'00561',mid:'26'}]
];

// Luciolichance

var listluciolichance = [
	[12,[ 6827, 6285],{id:'00177',mid:'01'}],[12,[ 6864, 6309],{id:'00178',mid:'02'}],[12,[ 6720, 6480],{id:'00179',mid:'03'}],[12,[ 6772, 6219],{id:'00180',mid:'04'}],[12,[ 7836, 6525],{id:'00181',mid:'05'}],[12,[ 8280, 5830],{id:'00182',mid:'06'}],[12,[ 8612, 5956],{id:'00183',mid:'07'}],[12,[ 6641, 6462],{id:'00301',mid:'08'}],[12,[ 6150, 7527],{id:'00302',mid:'09'}],[12,[ 9102, 7406],{id:'00303',mid:'10'}],
	[12,[ 8550, 6893],{id:'00304',mid:'11'}],[12,[ 7778, 7326],{id:'00305',mid:'12'}],[12,[ 8079, 7909],{id:'00408',mid:'13'}],[12,[ 7558, 8504],{id:'00409',mid:'14'}],[12,[ 8865, 9104],{id:'00410',mid:'15'}],[12,[ 8658, 9326],{id:'00411',mid:'16'}],[12,[ 8763, 9483],{id:'00412',mid:'17'}],[12,[ 5838, 8705],{id:'00413',mid:'18'}],[12,[ 5649, 8331],{id:'00414',mid:'19'}],[12,[ 8890, 9337],{id:'00554',mid:'20'}],
	[12,[ 8787, 9522],{id:'00555',mid:'21'}],[12,[ 7230, 7491],{id:'00587',mid:'22'}],[12,[ 8569, 9668],{id:'00588',mid:'23'}]
];

// Belette foudrazurée

var listbelette = [
	[12,[ 7459, 6216],{id:'00248',mid:'01'}],[12,[ 8682, 6329],{id:'00249',mid:'02'}],[12,[ 9094, 6068],{id:'00250',mid:'03'}],[12,[ 9297, 6620],{id:'00251',mid:'04'}],[12,[ 8911, 7155],{id:'00252',mid:'05'}],[12,[ 8303, 5675],{id:'00374',mid:'06'}],[12,[ 9311, 7282],{id:'00375',mid:'07'}],[12,[ 8854, 7615],{id:'00376',mid:'08'}],[12,[ 8238, 7051],{id:'00377',mid:'09'}],[12,[ 8012, 7695],{id:'00378',mid:'10'}],
	[12,[ 7360, 7354],{id:'00379',mid:'11'}],[12,[ 7951, 8501],{id:'00482',mid:'12'}],[12,[ 7692, 8894],{id:'00483',mid:'13'}],[12,[ 8739, 9619],{id:'00484',mid:'14'}]
];

// Artéfacts

var listartefact = [
	[12,[ 6882, 6433],{id:'00197',mid:'01'}],[12,[ 6635, 6107],{id:'00198',mid:'02'}],[12,[ 7497, 6075],{id:'00199',mid:'03'}],[12,[ 8139, 6305],{id:'00200',mid:'04'}],[12,[ 8104, 6138],{id:'00201',mid:'05'}],[12,[ 8278, 6139],{id:'00202',mid:'06'}],[12,[ 8238, 5578],{id:'00203',mid:'07'}],[12,[ 8867, 6291],{id:'00204',mid:'08'}],[12,[ 8900, 6311],{id:'00205',mid:'09'}],[12,[ 8866, 6466],{id:'00206',mid:'10'}],
	[12,[ 8651, 6097],{id:'00207',mid:'11'}],[12,[ 9217, 6955],{id:'00208',mid:'12'}],[12,[ 8160, 5895],{id:'00310',mid:'13'}],[12,[ 7535, 5869],{id:'00311',mid:'14'}],[12,[ 8145, 5886],{id:'00312',mid:'15'}],[12,[ 6722, 7236],{id:'00313',mid:'16'}],[12,[ 8963, 7519],{id:'00314',mid:'17'}],[12,[ 8282, 7142],{id:'00315',mid:'18'}],[12,[ 8592, 7428],{id:'00316',mid:'19'}],[12,[ 8741, 7186],{id:'00317',mid:'20'}],
	[12,[ 8978, 7996],{id:'00318',mid:'21'}],[12,[ 8697, 8604],{id:'00319',mid:'22'}],[12,[ 7322, 7532],{id:'00419',mid:'23'}],[12,[ 7328, 7558],{id:'00420',mid:'24'}],[12,[ 7192, 7818],{id:'00421',mid:'25'}],[12,[ 8052, 8579],{id:'00422',mid:'26'}],[12,[ 6361, 6018],{id:'00549',mid:'27'}],[12,[ 6418, 5978],{id:'00550',mid:'28'}]
];

// Tas de pierres

var listtasdepierre = [
	[0,[ 7091, 6122],{id:'00298',mid:'01'}],[0,[ 7807, 6578],{id:'00299',mid:'02'}],[0,[ 7996, 6806],{id:'00300',mid:'03'}],[0,[ 7915, 5819],{id:'00399',mid:'04'}],[0,[ 9001, 8211],{id:'00400',mid:'05'}],[0,[ 7601, 7308],{id:'00401',mid:'06'}],[0,[ 7457, 7151],{id:'00402',mid:'07'}],[0,[ 8036, 8171],{id:'00527',mid:'08'}],[0,[ 7752, 8493],{id:'00528',mid:'09'}],[0,[ 8003, 8970],{id:'00529',mid:'10'}],
	[0,[ 7157, 7541],{id:'00530',mid:'11'}],[0,[ 7226, 8162],{id:'00531',mid:'12'}],[0,[ 7265, 8445],{id:'00532',mid:'13'}],[0,[ 8952, 9356],{id:'00533',mid:'14'}],[0,[ 9012, 9764],{id:'00534',mid:'15'}],[0,[ 8655, 9783],{id:'00535',mid:'16'}],[0,[ 8306, 9636],{id:'00536',mid:'17'}],[0,[ 7723, 9683],{id:'00537',mid:'18'}],[0,[ 7420,10002],{id:'00538',mid:'19'}],[0,[ 6997, 9249],{id:'00539',mid:'20'}],
	[0,[ 7308, 8776],{id:'00540',mid:'21'}],[0,[ 6620, 8774],{id:'00541',mid:'22'}],[0,[ 6120, 8597],{id:'00542',mid:'23'}],[0,[ 4546, 8451],{id:'00543',mid:'24'}],[0,[ 8310, 8491],{id:'00544',mid:'25'}],[0,[ 7999, 8480],{id:'00545',mid:'26'}],[0,[ 8074, 6511],{id:'00601',mid:'27'}],[0,[ 8153, 8109],{id:'00602',mid:'28'}]
];

// Orbes des Profondeurs bleues

var listorbeprof = [
	[0,[ 6596, 7280],{id:'00577',mid:'01',text:langue.com329}],[0,[ 6370, 6045],{id:'00578',mid:'02',text:langue.com329}],[0,[ 7729, 7011],{id:'00579',mid:'03',text:langue.com329}],[0,[ 7880, 8612],{id:'00580',mid:'04',text:langue.com329}],[0,[ 7244, 7822],{id:'00581',mid:'05',text:langue.com329}],[0,[ 8964, 9709],{id:'00582',mid:'06',text:langue.com329}],[0,[ 7814, 9758],{id:'00583',mid:'07',text:langue.com329}],[0,[ 7292, 8782],{id:'00584',mid:'08',text:langue.com329}],[0,[ 5969, 8692],{id:'00585',mid:'09',text:langue.com329}]
];

// Messages secrets

var listmessage = [
	[0,[ 8813, 5472],{id:'00603',mid:'01'}],[0,[ 7915, 7594],{id:'00604',mid:'02'}],[0,[ 7166, 7537],{id:'00605',mid:'03'}],[0,[ 7176, 7796],{id:'00606',mid:'04'}],[0,[ 8810, 8920],{id:'00607',mid:'05'}],[0,[ 8643,10035],{id:'00608',mid:'06'}],[0,[ 8594,10032],{id:'00609',mid:'07'}],[0,[ 5699, 8724],{id:'00610',mid:'08'}],[0,[ 4676, 9120],{id:'00611',mid:'09'}]
];

// Fossile

var listfossile = [
	[0,[ 8620, 5695],{id:'00613',mid:'01'}],[0,[ 7539, 6422],{id:'00614',mid:'02'}],[0,[ 7445, 7041],{id:'00615',mid:'03'}],[0,[ 7407, 7873],{id:'00616',mid:'04'}],[0,[ 5840, 8683],{id:'00617',mid:'05'}]
];

var totalMarkers = 637;