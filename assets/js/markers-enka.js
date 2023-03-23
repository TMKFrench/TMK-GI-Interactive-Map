// Layers

var teyvatarray = ['teleport','enkagate','cyclejn','triangle','peche','quete','succes','clesigil1','clesigil2','clesigil3','clesigil4','clesigil5','cordi','cdelic','cprec','cluxe','cdefi','cfee','pierrekc','ferblanc','amethyste','electroc','noyauc','perle','corail','ffeu','fbrume','ganoderma','herbem','grenouille','lezard','crabe',
];

// Initialisation des Markers

var initDatas = {
teleport:{List:'teleport', Icon:'Teleport', Grp:'teleport', Title:langue.cat02, Filename:'tpe'},
enkagate:{List:'enkagate', Icon:'Enkagate', Grp:'enkagate', Title:langue.cat100, Filename:'egate'},
cyclejn:{List:'cyclejn', Icon:'Cyclejn', Grp:'cyclejn', Title:langue.cat101},
triangle:{List:'triangle', Icon:'Triangle', Grp:'triangle', Title:langue.cat102, Filename:'triangle', Cbx:'triangle'},
trianglenocb:{List:'trianglenocb', Icon:'Triangle', Grp:'triangle', Title:langue.cat102, Filename:'trianglenocb'},
peche:{List:'peche', Icon:'Peche', Grp:'peche', Title:langue.cat94, Filename:'pechee'},
quete:{List:'quete', Icon:'Quete', Grp:'quete', Title:langue.cat118, Filename:'quetee', Cbx:'quetee'},
succes:{List:'succes', Icon:'Succes', Grp:'succes', Title:langue.cat46, Filename:'succese', Cbx:'succese'},
clesigil1:{List:'clesigil1', Icon:'Clesigil1', Grp:'clesigil1', Title:langue.cat104, Filename:'clesigil1-', Cbx:'clesigil1'},
clesigil2:{List:'clesigil2', Icon:'Clesigil2', Grp:'clesigil2', Title:langue.cat105, Filename:'clesigil2-', Cbx:'clesigil2'},
clesigil3:{List:'clesigil3', Icon:'Clesigil3', Grp:'clesigil3', Title:langue.cat106, Filename:'clesigil3-', Cbx:'clesigil3'},
clesigil4:{List:'clesigil4', Icon:'Clesigil4', Grp:'clesigil4', Title:langue.cat107, Filename:'clesigil4-', Cbx:'clesigil4'},
clesigil5:{List:'clesigil5', Icon:'Clesigil5', Grp:'clesigil5', Title:langue.cat108, Filename:'clesigil5-', Cbx:'clesigil5'},
cordi:{List:'cordi', Icon:'Cordi', Grp:'cordi', Title:langue.cat04, Filename:'oce', Cbx:'cordie'},
cdelic:{List:'cdelic', Icon:'Cdelic', Grp:'cdelic', Title:langue.cat05, Filename:'dce', Cbx:'cdelice'},
cprec:{List:'cprec', Icon:'Cprec', Grp:'cprec', Title:langue.cat06, Filename:'pce', Cbx:'cprece'},
cluxe:{List:'cluxe', Icon:'Cluxe', Grp:'cluxe', Title:langue.cat07, Filename:'lce', Cbx:'cluxee'},
cdefi:{List:'cdefi', Icon:'Cdefi', Grp:'cdefi', Title:langue.cat08, Filename:'defie', Cbx:'defie'},
cfee:{List:'cfee', Icon:'Cfee', Grp:'cfee', Title:langue.cat09, Cbx:'cfeeenko'},
pierrekc:{List:'pierrekc', Icon:'Pierrekc', Grp:'pierrekc', Title:langue.cat103, Filename:'pierrekc', Cbx:'pierrekc'},
ferblanc:{List:'ferblanc', Icon:'Ferblanc', Grp:'ferblanc', Title:langue.cat25},
amethyste:{List:'amethyste', Icon:'Amethyste', Grp:'amethyste', Title:langue.cat84},
electroc:{List:'electroc', Icon:'Electroc', Grp:'electroc', Title:langue.cat12},
noyauc:{List:'noyauc', Icon:'Noyauc', Grp:'noyauc', Title:langue.cat44},
perle:{List:'perle', Icon:'Perle', Grp:'perle', Title:langue.cat32},
corail:{List:'corail', Icon:'Corail', Grp:'corail', Title:langue.cat97},
ffeu:{List:'ffeu', Icon:'Ffeu', Grp:'ffeu', Title:langue.cat14},
fbrume:{List:'fbrume', Icon:'Fbrume', Grp:'fbrume', Title:langue.cat13},
ganoderma:{List:'ganoderma', Icon:'Ganoderma', Grp:'ganoderma', Title:langue.cat82},
herbem:{List:'herbem', Icon:'Herbem', Grp:'herbem', Title:langue.cat82},
grenouille:{List:'grenouille', Icon:'Grenouille', Grp:'grenouille', Title:langue.cat27},
lezard:{List:'lezard', Icon:'Lezard', Grp:'lezard', Title:langue.cat28},
crabe:{List:'crabe', Icon:'Crabe', Grp:'crabe', Title:langue.cat64},
};

// Liste des Marqueurs

// Téléporteurs

var listteleport = [
	[0,[ 4742, 2177],{id:'00090',mid:'01',text:langue.com282}],[0,[10955, 3901],{id:'00091',mid:'02',text:langue.com282}],[0,[ 9820, 5884],{id:'00092',mid:'03'}],[0,[ 9424, 6487],{id:'00093',mid:'04'}],[0,[ 8732, 6328],{id:'00094',mid:'05'}],[0,[ 9674, 7265],{id:'00095',mid:'06'}],[0,[ 7049, 6504],{id:'00096',mid:'07'}],[0,[ 7792, 7183],{id:'00097',mid:'08'}],[0,[ 5665, 5697],{id:'00098',mid:'09'}],[0,[ 6673, 6705],{id:'00099',mid:'10'}],
	[0,[ 7023, 7097],{id:'00100',mid:'11'}],[0,[ 8093, 8596],{id:'00101',mid:'12'}],[0,[ 4770, 5937],{id:'00102',mid:'13'}],[0,[ 5305, 6308],{id:'00103',mid:'14'}],[0,[ 6702, 7776],{id:'00104',mid:'15'}],[0,[ 7410, 8946],{id:'00105',mid:'16'}],[0,[ 4801, 6837],{id:'00106',mid:'17'}],[0,[ 6379, 8672],{id:'00107',mid:'18'}],[0,[ 6647, 9549],{id:'00108',mid:'19'}],[0,[ 8366,11370],{id:'00109',mid:'20',text:langue.com282}],
	[0,[ 6289,10339],{id:'00110',mid:'21'}],[0,[ 3687, 7654],{id:'00111',mid:'22'}],[0,[ 1879, 8644],{id:'00112',mid:'23'}],[0,[ 2579,10040],{id:'00113',mid:'24'}]
];

// Porte phasée

var listenkagate = [
	[12,[ 4340, 6736],{id:'00001',mid:'01'}],[12,[ 4138, 6425],{id:'00002',mid:'02'}],[12,[ 6950, 5540],{id:'00003',mid:'03'}],[12,[ 7778, 4542],{id:'00004',mid:'04'}],[12,[ 7266, 6601],{id:'00005',mid:'05'}],[12,[ 8118, 6684],{id:'00006',mid:'06'}],[12,[ 7834, 7122],{id:'00007',mid:'07'}],[12,[ 7908, 7442],{id:'00008',mid:'08'}],[12,[ 6984, 9084],{id:'00009',mid:'09'}],[12,[ 6686, 9664],{id:'00010',mid:'10'}],
	[12,[ 6704, 8806],{id:'00011',mid:'11'}],[12,[ 6276,10187],{id:'00012',mid:'12'}],[12,[ 7206, 8486],{id:'00013',mid:'13'}],[12,[ 7118, 8230],{id:'00014',mid:'14'}],[12,[ 8342, 6440],{id:'00015',mid:'15'}],[12,[10924, 3608],{id:'00016',mid:'16'}],[12,[10864, 3032],{id:'00017',mid:'17'}]
];

// Inter Jour/Nuit

var listcyclejn = [
	[12,[ 4707, 6932],{id:'00049',mid:'01'}],[12,[ 4739, 6914],{id:'00050',mid:'02'}],[12,[ 4675, 6442],{id:'00051',mid:'03'}],[12,[ 5554, 6184],{id:'00052',mid:'04'}],[12,[ 5629, 6097],{id:'00053',mid:'05'}],[12,[ 5086, 5562],{id:'00054',mid:'06'}],[12,[ 5824, 5053],{id:'00055',mid:'07'}],[12,[ 6251, 5655],{id:'00056',mid:'08'}],[12,[ 4874, 2934],{id:'00057',mid:'09'}],[12,[ 8192, 4304],{id:'00058',mid:'10'}],
	[12,[ 7099, 6577],{id:'00059',mid:'11'}],[12,[ 7341, 7125],{id:'00060',mid:'12'}],[12,[ 6823, 7449],{id:'00061',mid:'13'}],[12,[ 6592, 7585],{id:'00062',mid:'14'}],[12,[ 9863, 5916],{id:'00063',mid:'15'}],[12,[ 9389, 6102],{id:'00064',mid:'16'}],[12,[ 9607, 6281],{id:'00065',mid:'17'}],[12,[ 9190, 6342],{id:'00066',mid:'18'}],[12,[ 8890, 6241],{id:'00067',mid:'19'}],[12,[ 8807, 6566],{id:'00068',mid:'20'}],
	[12,[ 8999, 6596],{id:'00069',mid:'21'}],[12,[ 9348, 6817],{id:'00070',mid:'22'}],[12,[ 9516, 6850],{id:'00071',mid:'23'}],[12,[ 9518, 7093],{id:'00072',mid:'24'}],[12,[ 8985, 7235],{id:'00073',mid:'25'}],[12,[ 9231, 7235],{id:'00074',mid:'26'}],[12,[ 9721, 7174],{id:'00075',mid:'27'}],[12,[ 9853, 7289],{id:'00076',mid:'28'}],[12,[ 9912, 7333],{id:'00077',mid:'29'}],[12,[ 9535, 7604],{id:'00078',mid:'30'}],
	[12,[ 9802, 7629],{id:'00079',mid:'31'}],[12,[ 9849, 7590],{id:'00080',mid:'32'}],[12,[ 8054, 8454],{id:'00081',mid:'33'}],[12,[ 7279, 8660],{id:'00082',mid:'34'}],[12,[ 6552, 8687],{id:'00083',mid:'35'}],[12,[ 6488, 8911],{id:'00084',mid:'36'}],[12,[ 7233, 8884],{id:'00085',mid:'37'}],[12,[ 7456, 8870],{id:'00086',mid:'38'}],[12,[ 6227, 9027],{id:'00087',mid:'39'}],[12,[ 6280,10423],{id:'00088',mid:'40'}],
	[12,[ 9131,11270],{id:'00089',mid:'41'}]
];

// Mecanisme Triangulaire

var listtriangle = [
	[3,[ 4764, 6007],{id:'00036',mid:'01',text:langue.jour}],[5,[ 4992, 5655],{id:'00037',mid:'02',video:'6h3akxw7_YM'}],[0,[ 5651, 5416],{id:'00038',mid:'03',text:langue.jour}],[0,[ 6264, 5628],{id:'00039',mid:'04',text:langue.jour}],[0,[ 5684, 5256],{id:'00040',mid:'05'}],[0,[ 5784, 5208],{id:'00041',mid:'06'}],[3,[ 5898, 5082],{id:'00042',mid:'07',text:langue.nuit}],[3,[ 5584, 6152],{id:'00043',mid:'08',text:langue.nuit}],[5,[ 9459, 6797],{id:'00044',mid:'09',video:'DySSXDQTZgE',text:langue.nuit}],[0,[ 5584, 5873],{id:'00045',mid:'10',text:langue.jour}],
	[0,[ 7367, 8752],{id:'00046',mid:'11',text:langue.jour+langue.com283}],[0,[ 7529, 8738],{id:'00047',mid:'12',text:langue.jour+langue.com283}],[0,[ 4748, 6857],{id:'00048',mid:'13',text:langue.nuit}]
];

// Mecanisme Triangulaire sans CB

var listtrianglenocb = [
	[0,[ 7894, 6940],{id:'00018',mid:'01',text:langue.com274}],[0,[ 7668, 8844],{id:'00019',mid:'02',text:langue.com274}],[3,[ 4700, 5944],{id:'00021',mid:'03',text:langue.nuit+langue.com276}],[3,[ 6209, 5606],{id:'00022',mid:'04',text:langue.nuit+langue.com276}],[0,[ 6264, 5496],{id:'00023',mid:'05',text:langue.com274}],[0,[ 6993, 7247],{id:'00024',mid:'06',text:langue.com279}],[0,[ 6976, 7305],{id:'00025',mid:'07',text:langue.nuit}],[5,[ 6278, 9042],{id:'00026',mid:'08',video:'Zmeo6yTrZuA',text:langue.nuit}],[5,[ 6322, 9044],{id:'00027',mid:'09',video:'IrITk5yRdVg',text:langue.jour}],[3,[ 9879, 5913],{id:'00028',mid:'10',text:langue.jour+langue.com276}],
	[3,[ 9881, 5968],{id:'00029',mid:'11',text:langue.jour+langue.com276}],[5,[ 9407, 6920],{id:'00030',mid:'12',video:'yy1Tdm5hNqg',text:langue.nuit}],[3,[ 9901, 7390],{id:'00031',mid:'13',text:langue.jour+langue.com276}],[3,[ 4809, 2796],{id:'00032',mid:'14',text:langue.nuit+langue.com282}],[0,[ 4765, 2920],{id:'00033',mid:'15',text:langue.jour+langue.com282}],[0,[ 4805, 2918],{id:'00034',mid:'16',text:langue.nuit+langue.com282}],[0,[ 9503, 7082],{id:'00035',mid:'17',text:langue.nuit+langue.com276}]
];

// Points de pêche

var listpeche = [
	[0,[ 2694,10277],{id:'00507',mid:'01',text:langue.pechee1}],[0,[ 6314, 8972],{id:'00508',mid:'02',text:langue.pechee2}],[0,[ 6702, 8754],{id:'00509',mid:'03',text:langue.pechee3}]
];

// Quêtes

var listquete = [
	[5,[ 6540, 7632],{id:'00493',mid:'01',video:'7HiHpkT1hsI',text:langue.nuit+langue.queteeh01,title:langue.queteet01}],[5,[ 6626, 8672],{id:'00494',mid:'02',video:'pNLwX8LbQnc',text:langue.nuit+langue.queteeh02,title:langue.queteet02}]
];

// Succès

var listsucces = [
	[3,[ 7344, 7115],{id:'00020',mid:'01'}]
];

// Clé Sigil 1

var listclesigil1 = [
	[0,[ 4770, 7081],{id:'00122',mid:'01'}],[0,[ 4366, 6761],{id:'00123',mid:'02'}],[0,[ 4441, 6290],{id:'00124',mid:'03'}],[0,[ 5423, 5666],{id:'00125',mid:'04'}],[0,[ 5660, 5465],{id:'00126',mid:'05',text:langue.com272}],[0,[ 5992, 6159],{id:'00127',mid:'06'}],[0,[ 6988, 6852],{id:'00128',mid:'07'}],[0,[ 7174, 7346],{id:'00129',mid:'08'}],[0,[ 7904, 7426],{id:'00130',mid:'09'}],[0,[ 7038, 7538],{id:'00131',mid:'10'}],
	[0,[10268, 5884],{id:'00132',mid:'11',text:langue.com283}],[0,[ 8908, 6736],{id:'00133',mid:'12'}],[0,[ 9462, 7478],{id:'00134',mid:'13',text:langue.nuit+langue.com285}],[0,[ 7638, 8826],{id:'00135',mid:'14'}],[0,[ 6722, 9478],{id:'00136',mid:'15'}],[0,[ 6770,10138],{id:'00137',mid:'16'}]
];

// Clé Sigil 2

var listclesigil2 = [
	[0,[ 5672, 5495],{id:'00138',mid:'01'}],[0,[ 5599, 5791],{id:'00139',mid:'02'}],[0,[ 7007, 6428],{id:'00140',mid:'03'}],[0,[ 7492, 7423],{id:'00141',mid:'04'}],[0,[11354, 3083],{id:'00156',mid:'05',text:langue.com282}],[0,[ 9508, 6015],{id:'00157',mid:'06'}],[0,[ 6796, 8598],{id:'00158',mid:'07'}],[0,[ 6996, 9054],{id:'00159',mid:'08'}],[0,[ 8879,11151],{id:'00160',mid:'09',text:langue.com282}]
];

// Clé Sigil 3

var listclesigil3 = [
	[0,[ 5526, 5454],{id:'00114',mid:'01'}],[0,[ 6235, 5672],{id:'00115',mid:'02'}],[0,[ 4920, 2949],{id:'00116',mid:'03',text:langue.com282}],[0,[ 8068, 4392],{id:'00117',mid:'04'}],[3,[ 6444, 7211],{id:'00118',mid:'05'}],[0,[ 9369, 6312],{id:'00119',mid:'06'}],[0,[ 6133, 8729],{id:'00120',mid:'07'}],[0,[ 9072,11558],{id:'00121',mid:'08',text:langue.com282}]
];

// Clé Sigil 4

var listclesigil4 = [
	[0,[ 4705, 6154],{id:'00142',mid:'01'}],[0,[ 6106, 5322],{id:'00143',mid:'02'}],[0,[ 5020, 2794],{id:'00144',mid:'03',text:langue.com282}],[5,[ 7708, 4432],{id:'00145',mid:'04',video:'Vy9lqjfYZAw'}],[0,[ 7841, 7165],{id:'00146',mid:'05'}],[0,[ 9882, 6010],{id:'00147',mid:'06',text:langue.jour}],[0,[ 9074, 6581],{id:'00148',mid:'07'}],[0,[ 9702, 7448],{id:'00149',mid:'08'}],[0,[10016, 7404],{id:'00150',mid:'09'}],[0,[ 8194, 8300],{id:'00151',mid:'10'}],
	[0,[ 6386, 8915],{id:'00152',mid:'11'}],[0,[ 6369, 9092],{id:'00153',mid:'12'}],[0,[ 7337, 9001],{id:'00154',mid:'13'}],[0,[ 6464,10300],{id:'00155',mid:'14'}]
];

// Clé Sigil 5

var listclesigil5 = [
	[0,[10730, 3494],{id:'00161',mid:'01',text:langue.com282}],[0,[ 5601, 5789],{id:'00162',mid:'02',text:langue.com284}],[0,[ 6262, 5954],{id:'00163',mid:'03'}],[5,[ 5661, 6121],{id:'00164',mid:'04',video:'kfTTP2QMk4c',text:langue.nuit}],[0,[ 7229, 6857],{id:'00165',mid:'05'}],[0,[ 6743, 7544],{id:'00166',mid:'06'}],[0,[ 9071, 6848],{id:'00167',mid:'07'}],[0,[ 9442, 7249],{id:'00168',mid:'08'}],[0,[ 9398, 7426],{id:'00169',mid:'09'}],[0,[ 7388, 8684],{id:'00170',mid:'10'}],
	[0,[ 7601, 9373],{id:'00171',mid:'11'}],[0,[ 6475, 9621],{id:'00172',mid:'12'}]
];

// Coffres Ordinaires

var listcordi = [
	[0,[ 2419, 9910],{id:'00173',mid:'01',text:langue.com003}],[0,[ 2112, 9967],{id:'00174',mid:'02',text:langue.com003}],[0,[ 1770, 9890],{id:'00175',mid:'03',text:langue.com210}],[0,[ 1714, 9745],{id:'00176',mid:'04',text:langue.com003}],[0,[ 1852, 9231],{id:'00177',mid:'05',text:langue.com003}],[0,[ 1912, 8056],{id:'00178',mid:'06',text:langue.com003}],[0,[ 1992, 8340],{id:'00179',mid:'07',text:langue.com003}],[0,[ 2212, 8847],{id:'00180',mid:'08',text:langue.com210}],[0,[ 2425, 8250],{id:'00181',mid:'09',text:langue.com003}],[0,[ 2890, 7850],{id:'00182',mid:'10',text:langue.com003}],
	[0,[ 3323, 7763],{id:'00183',mid:'11',text:langue.com003}],[0,[ 4639, 6936],{id:'00184',mid:'12',text:langue.com003}],[0,[ 4517, 7113],{id:'00185',mid:'13',text:langue.com003}],[0,[ 4465, 6732],{id:'00186',mid:'14',text:langue.com003}],[0,[ 4492, 6221],{id:'00187',mid:'15',text:langue.com003}],[5,[ 4782, 6316],{id:'00188',mid:'16',video:'54CHGIeaI0M',text:langue.jour+langue.com271}],[0,[ 5062, 6139],{id:'00189',mid:'17',text:langue.com003}],[0,[ 5258, 5841],{id:'00190',mid:'18',text:langue.com003}],[0,[ 6094, 5504],{id:'00191',mid:'19',text:langue.com003}],[0,[ 5935, 5769],{id:'00192',mid:'20',text:langue.com003}],
	[0,[ 5756, 6036],{id:'00193',mid:'21',text:langue.com003}],[0,[ 5858, 6203],{id:'00194',mid:'22',text:langue.com003}],[0,[ 6047, 6049],{id:'00195',mid:'23',text:langue.com003}],[0,[ 6287, 5973],{id:'00196',mid:'24',text:langue.com003}],[0,[ 6214, 5608],{id:'00197',mid:'25',text:langue.com272}],[0,[ 7227, 6349],{id:'00198',mid:'26',text:langue.com003}],[0,[ 6915, 6476],{id:'00199',mid:'27',text:langue.com003}],[0,[ 7725, 6854],{id:'00200',mid:'28',text:langue.com003}],[3,[ 7686, 6772],{id:'00201',mid:'29',text:langue.com271}],[0,[ 7096, 6584],{id:'00202',mid:'30',text:langue.com003}],
	[0,[ 7858, 6902],{id:'00203',mid:'31',text:langue.com003}],[0,[ 7972, 6754],{id:'00204',mid:'32',text:langue.com003}],[0,[ 7674, 9254],{id:'00205',mid:'33',text:langue.com003}],[0,[ 7264, 7702],{id:'00206',mid:'34',text:langue.com003}],[0,[ 6728, 7626],{id:'00207',mid:'35',text:langue.com003}],[0,[ 6458, 7278],{id:'00208',mid:'36',text:langue.com003}],[0,[ 7112, 6706],{id:'00209',mid:'37',text:langue.com003}],[0,[ 7150, 6914],{id:'00210',mid:'38',text:langue.com003}],[0,[ 7581, 7207],{id:'00211',mid:'39',text:langue.com003}],[3,[ 7078, 6471],{id:'00212',mid:'40',text:langue.com271}],
	[0,[ 7754, 9167],{id:'00213',mid:'41',text:langue.com003}],[0,[ 7312, 8671],{id:'00214',mid:'42',text:langue.com003}],[0,[ 6950, 8730],{id:'00215',mid:'43',text:langue.com003}],[0,[ 5976,10454],{id:'00216',mid:'44',text:langue.com003}],[0,[ 6572, 9388],{id:'00217',mid:'45',text:langue.com003}],[0,[ 6789, 7402],{id:'00218',mid:'46',text:langue.com003}],[0,[ 6735, 6804],{id:'00219',mid:'47',text:langue.com003}],[0,[ 6982, 7612],{id:'00220',mid:'48',text:langue.com003}],[0,[ 7330, 7675],{id:'00221',mid:'49',text:langue.com003}],[0,[ 7595, 7059],{id:'00222',mid:'50',text:langue.com275}],
	[0,[ 9155, 6615],{id:'00223',mid:'51',text:langue.com003}],[0,[ 8999, 6704],{id:'00224',mid:'52',text:langue.com003}],[0,[ 8858, 6522],{id:'00225',mid:'53',text:langue.com003}],[0,[ 9550, 7198],{id:'00226',mid:'54',text:langue.com003}],[0,[ 9984, 7204],{id:'00227',mid:'55',text:langue.com003}],[0,[ 8994, 7126],{id:'00228',mid:'56',text:langue.com003}],[5,[ 4791, 5922],{id:'00229',mid:'57',video:'JcBqo2lpXD8',text:langue.nuit}],[0,[ 5114, 6312],{id:'00230',mid:'58',text:langue.nuit}],[0,[ 6210, 5659],{id:'00231',mid:'59',text:langue.com273}],[5,[ 7720, 4310],{id:'00232',mid:'60',video:'_cTUcphRUoA',text:langue.nuit+langue.com271}],
	[5,[ 7068, 6566],{id:'00233',mid:'61',video:'WfzBqYHfMV0',text:langue.com177}],[3,[ 7674, 9130],{id:'00234',mid:'62',text:langue.nuit+langue.com271}],[0,[ 9700, 6039],{id:'00235',mid:'63',text:langue.nuit}],[5,[ 5202, 5610],{id:'00236',mid:'64',video:'-ef4WlU0crk',text:langue.nuit}],[0,[ 7476, 6799],{id:'00237',mid:'65',text:langue.com003}],[5,[ 6454, 8771],{id:'00238',mid:'66',video:'cWDPo6B9eZs',text:langue.nuit}],[0,[ 6597, 8918],{id:'00239',mid:'67',text:langue.nuit+langue.com288}]
];

// Coffres Délicats

var listcdelic = [
	[0,[ 4816, 7038],{id:'00296',mid:'01',text:langue.com003}],[5,[ 5723, 5165],{id:'00313',mid:'02',video:'ABH71JGWbJs',text:langue.com273}],[0,[ 7077, 5776],{id:'00314',mid:'03',text:langue.com003}],[0,[ 8000, 8418],{id:'00315',mid:'04',text:langue.com003}],[0,[ 6862, 9184],{id:'00316',mid:'05',text:langue.com003}],[0,[ 6071,10111],{id:'00317',mid:'06',text:langue.com003}],[0,[ 7094, 7272],{id:'00318',mid:'07',text:langue.com003}],[0,[ 7565, 8631],{id:'00319',mid:'08',text:langue.com003}],[0,[ 6950, 9374],{id:'00320',mid:'09',text:langue.com003}],[0,[ 6640, 9548],{id:'00321',mid:'10',text:langue.com003}],
	[5,[ 6882, 9260],{id:'00322',mid:'11',video:'yB3eC6sOsP0',text:langue.com271}],[0,[ 6624, 7017],{id:'00323',mid:'12',text:langue.com003}],[0,[ 7072, 7085],{id:'00324',mid:'13',text:langue.com003}],[0,[ 9095, 6070],{id:'00325',mid:'14',text:langue.com003}],[0,[ 9658, 6202],{id:'00326',mid:'15',text:langue.com277}],[0,[ 8962, 6363],{id:'00327',mid:'16',text:langue.com003}],[0,[ 9814, 7504],{id:'00328',mid:'17',text:langue.com003}],[0,[ 9360, 7692],{id:'00329',mid:'18',text:langue.com003}],[0,[ 9112, 7166],{id:'00330',mid:'19',text:langue.com278}],[0,[ 9282, 6928],{id:'00331',mid:'20',text:langue.com003}],
	[5,[ 5612, 6098],{id:'00332',mid:'21',video:'ncec1h9yLe8',text:langue.nuit}],[5,[ 5628, 6170],{id:'00333',mid:'22',video:'za5Y5bHfxok',text:langue.nuit}],[5,[ 5874, 5998],{id:'00334',mid:'23',video:'aT29cqvyha8',text:langue.com271}],[5,[ 7061, 7219],{id:'00335',mid:'24',video:'ymzED-VnHuQ',text:langue.nuit}],[5,[ 8058, 8456],{id:'00336',mid:'25',video:'VxB7WBo1dS4',text:langue.nuit}],[0,[ 6489, 8928],{id:'00337',mid:'26',text:langue.com003}],[0,[ 6368, 9042],{id:'00338',mid:'27',text:langue.com272}],[5,[ 6418,10311],{id:'00339',mid:'28',video:'9qaYKFDj8hc',text:langue.nuit+langue.com271}],[5,[10019, 6103],{id:'00340',mid:'29',video:'amqxLOLSmIw',text:langue.nuit+langue.com271}],[0,[ 9294, 6595],{id:'00341',mid:'30',text:langue.nuit+langue.com003}],
	[3,[ 8892, 6689],{id:'00342',mid:'31',text:langue.nuit+langue.com271}],[5,[ 8706, 6530],{id:'00343',mid:'32',video:'x0yxN244gpM',text:langue.nuit+langue.com280}],[0,[ 9160, 7159],{id:'00344',mid:'33',text:langue.com078}],[3,[ 9721, 7079],{id:'00345',mid:'34',text:langue.nuit+langue.com271}],[5,[ 9850, 7625],{id:'00346',mid:'35',video:'3928gzC3F3Q',text:langue.jour}],[3,[ 9164, 7198],{id:'00347',mid:'36',text:langue.nuit+langue.com271}],[5,[ 6188, 9054],{id:'00348',mid:'37',video:'w8G6BpSWPR0',text:langue.com271}],[5,[ 6472, 8776],{id:'00349',mid:'38',video:'5otZBX29T9o'}],[5,[ 7422, 8975],{id:'00350',mid:'39',video:'aXu_N95xawk',text:langue.com271}],[0,[10279, 5907],{id:'00351',mid:'40',text:langue.com283}],
	[5,[ 9460, 7054],{id:'00352',mid:'41',video:'HZzt9cyvfeQ',text:langue.nuit}]
];

// Coffres Précieux

var listcprec = [
	[0,[ 5981, 5360],{id:'00240',mid:'01',text:langue.com003}],[0,[ 5642, 5547],{id:'00241',mid:'02',text:langue.com003}],[0,[ 6708, 9500],{id:'00242',mid:'03',text:langue.com003}],[0,[ 7586, 9115],{id:'00243',mid:'04',text:langue.com003}],[0,[ 6694,10128],{id:'00244',mid:'05',text:langue.com003}],[0,[ 6203, 8752],{id:'00245',mid:'06',text:langue.com003}],[0,[ 9372, 6123],{id:'00246',mid:'07',text:langue.com003}],[5,[ 6806, 7018],{id:'00247',mid:'08',video:'WuECEHP_Ams',text:langue.nuit+langue.com271}],[5,[ 6467, 8743],{id:'00248',mid:'09',video:'nh7kra3UOZo',text:langue.nuit+langue.com271}],[0,[ 9918, 6146],{id:'00249',mid:'10',text:langue.com003}],
	[5,[ 9495, 6827],{id:'00250',mid:'11',video:'QeqYcPSty-Y',text:langue.nuit}],[5,[ 9903, 7640],{id:'00251',mid:'12',video:'ZWlk8bdJyOo',text:langue.jour}],[5,[ 4758, 6676],{id:'00252',mid:'13',video:'wNwhcawrIq4'}],[5,[ 9657, 7433],{id:'00253',mid:'14',video:'IODgLS-rJY8',text:langue.nuit}],[5,[ 7414, 7013],{id:'00254',mid:'15',video:'wS7Kb1_gyew',text:langue.nuit}]
];

// Coffres Luxueux

var listcluxe = [
	[5,[ 7220, 8842],{id:'00486',mid:'01',video:'-bLmlM80Pkk',text:langue.nuit}],[5,[ 6280,10342],{id:'00487',mid:'02',video:'P_IXo3irdEU',text:langue.jour}],[5,[10072, 5902],{id:'00488',mid:'03',video:'NyEhUVHRdiE',text:langue.jour}],[0,[ 9100, 6541],{id:'00489',mid:'04',text:langue.com281}],[5,[ 7447, 8873],{id:'00490',mid:'05',video:'_p6N-sEgFBQ',text:langue.com286}],[5,[ 5710, 5815],{id:'00491',mid:'06',video:'hZHVFTdLa5M',text:langue.nuit+langue.com284}],[5,[ 6472, 8798],{id:'00492',mid:'07',video:'PHa9aIuScIc'}]
];

// Coffres Défis

var listcdefi = [
	[5,[ 2202, 9720],{id:'00294',mid:'01',video:'4psJeCZd78g',text:langue.defip+40+langue.defis}],[5,[ 1683, 8930],{id:'00295',mid:'02',video:'eoXuoOod4SM',text:langue.defib+50+langue.defis}],[5,[ 2163, 8588],{id:'00297',mid:'03',video:'mI0SlgriP4M',text:langue.defip+60+langue.defis}],[5,[ 2668, 8230],{id:'00298',mid:'04',video:'NqAMe4SXwtM',text:langue.defip+40+langue.defis}],[5,[ 4480, 6867],{id:'00299',mid:'05',video:'lCmW_DL_vqI',text:langue.defip+40+langue.defis}],[5,[ 6338, 6192],{id:'00300',mid:'06',video:'d5Ba8vBx-5Q',text:langue.defip+60+langue.defis}],[5,[ 7838, 6692],{id:'00301',mid:'07',video:'BrvuR8Ec1I8',text:langue.defib+30+langue.defis}],[5,[ 6927, 6998],{id:'00302',mid:'08',video:'si57YzCbiEo',text:langue.defip+40+langue.defis}],[5,[ 7787, 7085],{id:'00303',mid:'09',video:'tVGXFeZGk28',text:langue.defib+60+langue.defis}],[5,[ 6803, 7436],{id:'00304',mid:'10',video:'7G6FTW2ngt0',text:langue.nuit+langue.defip+40+langue.defis}],
	[5,[ 9356, 5997],{id:'00305',mid:'11',video:'tqPKCrocMvo',text:langue.defip+40+langue.defis}],[5,[ 9452, 7043],{id:'00306',mid:'12',video:'TmVvMMF-YIo',text:langue.defip+40+langue.defis}],[5,[ 9237, 7411],{id:'00307',mid:'13',video:'FaFPfbA60Fk',text:langue.defip+60+langue.defis}],[5,[ 8110, 8265],{id:'00308',mid:'14',video:'PCppqGSjjwQ',text:langue.defip+30+langue.defis}],[5,[ 7788, 8673],{id:'00309',mid:'15',video:'1lVeUeC_rc0',text:langue.defib+30+langue.defis}],[5,[ 7403, 8783],{id:'00310',mid:'16',video:'Uzqm9qpYes0',text:langue.defic+40+langue.defis}],[5,[ 6737, 8790],{id:'00311',mid:'17',video:'ic73rMSCDt0',text:langue.defip+40+langue.defis}],[5,[ 6682, 9028],{id:'00312',mid:'18',video:'iMD45Pc5b2g',text:langue.defip+45+langue.defis}]
];

// Coffres Fées

var listcfee = [
	[5,[ 1857, 9144],{id:'00255',mid:'01',video:'e4jb6ZHyNvM',text:langue.com189}],[5,[ 2665, 8186],{id:'00256',mid:'02',video:'sQvnN2ihA6Q',text:langue.com189}],[5,[ 2843, 7885],{id:'00257',mid:'03',video:'s7Wgxhu4fAk',text:langue.com189}],[5,[ 1660, 8572],{id:'00258',mid:'04',video:'sdaebnUmrQg',text:langue.com189}],[5,[ 4682, 6740],{id:'00259',mid:'05',video:'5K0ffLHobyc',text:langue.com189}],[5,[ 4656, 6169],{id:'00260',mid:'06',video:'AqSC6u7ZicM',text:langue.com189}],[5,[ 5057, 5870],{id:'00261',mid:'07',video:'7zEGAq9KNlQ',text:langue.com189}],[5,[ 5003, 5956],{id:'00262',mid:'08',video:'4awhHb9oa5I',text:langue.com189}],[5,[ 5482, 6001],{id:'00263',mid:'09',video:'uG0xsmsLdK0',text:langue.com189}],[5,[ 5653, 5506],{id:'00264',mid:'10',video:'X9cmlyYVb6A',text:langue.com189}],
	[5,[ 5553, 5604],{id:'00265',mid:'11',video:'-6VWJNW4gfo',text:langue.com189}],[5,[ 5629, 6043],{id:'00266',mid:'12',video:'s27cXSf0gWM',text:langue.nuit+langue.com189}],[5,[ 5648, 5783],{id:'00267',mid:'13',video:'0PWKHUJcDFw',text:langue.com284+langue.com040}],[5,[ 5627, 5703],{id:'00268',mid:'14',video:'Z5xNSaBXGkE',text:langue.com189}],[5,[ 7197, 5903],{id:'00269',mid:'15',video:'m8rWTCJIh2w',text:langue.com189}],[5,[ 7083, 6298],{id:'00270',mid:'16',video:'TGO3QIwcvzI',text:langue.com189}],[5,[ 7118, 6528],{id:'00271',mid:'17',video:'dmoog76UEI0',text:langue.com189}],[5,[ 7860, 6722],{id:'00272',mid:'18',video:'40Ny0cwf9dM',text:langue.com189}],[5,[ 6490, 6911],{id:'00273',mid:'19',video:'W1HfaCbZKnQ',text:langue.com189}],[5,[ 6765, 7107],{id:'00274',mid:'20',video:'zSKui8xDU4A',text:langue.nuit+langue.com189}],
	[5,[ 8967, 6371],{id:'00275',mid:'21',video:'Fqmi7folMfo'}],[5,[ 8948, 6433],{id:'00276',mid:'22',video:'xv5el-CoaN0',text:langue.com189}],[5,[ 8993, 6563],{id:'00277',mid:'23',video:'E7UeMKKUIZ0',text:langue.com189}],[5,[ 9287, 6593],{id:'00278',mid:'24',video:'NAIoxXZ1u_4',text:langue.nuit}],[5,[ 8900, 6689],{id:'00279',mid:'25',video:'F5Dth9dCYHE',text:langue.nuit}],[5,[ 9032, 6992],{id:'00280',mid:'26',video:'hGy9JwoxX7c',text:langue.jour}],[5,[ 9471, 7118],{id:'00281',mid:'27',video:'dBWT02I7pWA'}],[5,[ 9438, 7251],{id:'00282',mid:'28',video:'8n6W4_6-KaM'}],[5,[ 9056, 7326],{id:'00283',mid:'29',video:'-p47fxl1Src',text:langue.nuit}],[5,[ 9885, 7695],{id:'00284',mid:'30',video:'N-vujm7JvNw',text:langue.com189}],
	[5,[ 6920, 8616],{id:'00285',mid:'31',video:'_1Hrb2h887k',text:langue.nuit+langue.com040}],[5,[ 7238, 8696],{id:'00286',mid:'32',video:'1IXQ0fHxOeA',text:langue.com189}],[5,[ 6146, 8838],{id:'00287',mid:'33',video:'vrupQmBO6e0',text:langue.com189}],[5,[ 6472, 9096],{id:'00288',mid:'34',video:'sIV1EMelzVY',text:langue.com189}],[5,[ 6858, 8988],{id:'00289',mid:'35',video:'uxrpalQ_4yk',text:langue.com189}],[5,[ 6610, 9272],{id:'00290',mid:'36',video:'ZzlLHbD-8BY'}],[5,[ 6968, 9386],{id:'00291',mid:'37',video:'FWGc9I_cYgY',text:langue.com040}],[5,[ 7514, 9212],{id:'00292',mid:'38',video:'auGaIeR-iis',text:langue.com189}],[5,[ 6144,10243],{id:'00293',mid:'39',video:'0cKjKUJJ8tg',text:langue.com189}]
];

// Pierre cassée

var listpierrekc = [
	[0,[ 4166, 6405],{id:'00401',mid:'01'}],[0,[ 4660, 6326],{id:'00402',mid:'02'}],[0,[ 4961, 6048],{id:'00403',mid:'03'}],[0,[ 5080, 5593],{id:'00404',mid:'04'}],[0,[ 4923, 6316],{id:'00405',mid:'05'}],[0,[ 5340, 5558],{id:'00406',mid:'06'}],[0,[ 5900, 5576],{id:'00407',mid:'07'}],[0,[ 5622, 5819],{id:'00408',mid:'08'}],[0,[ 5667, 5465],{id:'00409',mid:'09'}],[0,[ 6022, 5994],{id:'00410',mid:'10'}],
	[0,[ 7632, 4600],{id:'00411',mid:'11'}],[0,[ 8088, 4536],{id:'00412',mid:'12'}],[0,[ 7464, 4508],{id:'00413',mid:'13'}],[0,[ 7720, 4492],{id:'00414',mid:'14'}],[0,[ 4775, 7035],{id:'00415',mid:'15'}],[0,[ 5305, 6223],{id:'00416',mid:'16'}],[0,[ 5637, 5928],{id:'00417',mid:'17'}],[0,[ 6152, 5784],{id:'00418',mid:'18'}],[0,[ 7347, 9063],{id:'00419',mid:'19'}],[0,[ 6840, 9064],{id:'00420',mid:'20'}],
	[0,[ 6836, 8820],{id:'00421',mid:'21'}],[0,[ 6326, 8834],{id:'00422',mid:'22'}],[0,[ 6170,10380],{id:'00423',mid:'23'}],[0,[ 6318,10067],{id:'00424',mid:'24'}],[0,[ 6246,10225],{id:'00425',mid:'25'}],[0,[ 7144, 8332],{id:'00426',mid:'26'}],[0,[ 6922, 7762],{id:'00427',mid:'27'}],[0,[ 6764, 7546],{id:'00428',mid:'28'}],[0,[ 6706, 7532],{id:'00429',mid:'29'}],[3,[ 6606, 8810],{id:'00430',mid:'30'}],
	[0,[ 9515, 6198],{id:'00431',mid:'31'}],[0,[ 9886, 6022],{id:'00432',mid:'32'}],[0,[ 9094, 6327],{id:'00433',mid:'33'}],[0,[ 9670, 6849],{id:'00434',mid:'34'}],[0,[ 9990, 7398],{id:'00435',mid:'35'}],[0,[ 9834, 7686],{id:'00436',mid:'36'}],[0,[ 9716, 7730],{id:'00437',mid:'37'}],[0,[ 9628, 7508],{id:'00438',mid:'38'}],[0,[ 9686, 7422],{id:'00439',mid:'39'}],[0,[ 9238, 7572],{id:'00440',mid:'40'}],
	[0,[ 9082, 7312],{id:'00441',mid:'41'}],[0,[ 5836, 5056],{id:'00442',mid:'42',text:langue.jour}],[0,[ 5828, 5074],{id:'00443',mid:'43',text:langue.jour}],[0,[ 5604, 6106],{id:'00444',mid:'44',text:langue.nuit}],[5,[ 7032, 7268],{id:'00445',mid:'45',video:'TbA6NyJGDxE',text:langue.nuit}],[5,[ 7361, 7244],{id:'00446',mid:'46',video:'n9GVoqFEPB0',text:langue.nuit}],[0,[ 9451, 6949],{id:'00447',mid:'47',text:langue.nuit}],[0,[ 9395, 7390],{id:'00448',mid:'48'}],[0,[ 5008, 2874],{id:'00449',mid:'49',text:langue.com282}],[0,[ 4896, 2954],{id:'00450',mid:'50',text:langue.com282}],
	[0,[ 4924, 2934],{id:'00451',mid:'51',text:langue.com282}],[0,[11336, 3036],{id:'00452',mid:'52',text:langue.com282}],[0,[11230, 2846],{id:'00453',mid:'53',text:langue.com282}],[0,[ 8870,11140],{id:'00454',mid:'54',text:langue.com282}],[0,[ 8897,11182],{id:'00455',mid:'55',text:langue.com282}],[0,[ 4639, 6963],{id:'00456',mid:'56'}],[0,[ 4704, 6789],{id:'00457',mid:'57'}],[0,[ 4768, 3115],{id:'00458',mid:'58'}],[0,[11324, 2984],{id:'00459',mid:'59'}],[0,[10066, 7283],{id:'00460',mid:'60'}]
];

// Fer Blanc

var listferblanc = [
	[12,[ 1839, 9121],{id:'00353',mid:'01'}],[12,[ 4936, 5796],{id:'00354',mid:'02'}],[12,[ 4996, 5828],{id:'00355',mid:'03'}],[12,[ 5795, 5567],{id:'00356',mid:'04'}],[12,[ 6562, 9500],{id:'00357',mid:'05'}],[12,[ 6874, 8763],{id:'00358',mid:'06'}],[12,[ 7251, 7741],{id:'00359',mid:'07'}],[12,[ 9552, 7354],{id:'00360',mid:'08'}]
];

// Morceau d'améthyste

var listamethyste = [
	[12,[ 1860, 9160],{id:'00361',mid:'01'}],[12,[ 5749, 5647],{id:'00362',mid:'02'}],[12,[ 5646, 5501],{id:'00363',mid:'03'}],[12,[ 7706, 6804],{id:'00364',mid:'04'}],[12,[ 7670, 6774],{id:'00365',mid:'05'}],[12,[ 6204, 5539],{id:'00366',mid:'06'}],[12,[ 6195, 5483],{id:'00367',mid:'07'}],[12,[ 6850, 9360],{id:'00368',mid:'08'}],[12,[ 6896, 9384],{id:'00369',mid:'09'}],[12,[ 6206, 9148],{id:'00370',mid:'10'}],
	[12,[ 6328, 8644],{id:'00371',mid:'11'}],[12,[ 5898,10342],{id:'00372',mid:'12'}],[12,[ 5898,10430],{id:'00373',mid:'13'}],[12,[ 7312, 8500],{id:'00374',mid:'14'}],[12,[ 6464, 7604],{id:'00375',mid:'15'}],[12,[ 7595, 8992],{id:'00376',mid:'16'}],[12,[ 7578, 8941],{id:'00377',mid:'17'}],[12,[ 7391, 8503],{id:'00378',mid:'18'}],[12,[ 7372, 8496],{id:'00379',mid:'19'}],[12,[ 6828, 8664],{id:'00380',mid:'20'}],
	[12,[ 6412, 9098],{id:'00381',mid:'21'}],[12,[ 9424, 6037],{id:'00382',mid:'22'}],[12,[ 9564, 6163],{id:'00383',mid:'23'}],[12,[ 9758, 5951],{id:'00384',mid:'24'}],[12,[ 5398, 2964],{id:'00385',mid:'25'}],[12,[10866, 2868],{id:'00386',mid:'26'}],[12,[10836, 2874],{id:'00387',mid:'27'}],[12,[10824, 3038],{id:'00388',mid:'28'}],[12,[10820, 3014],{id:'00389',mid:'29'}],[12,[ 8981,11409],{id:'00390',mid:'30'}],
	[12,[ 9002,11094],{id:'00391',mid:'31'}],[12,[ 9080,11302],{id:'00392',mid:'32'}]
];

// Electrocristal

var listelectroc = [
	[12,[ 1883, 9182],{id:'00393',mid:'01'}],[12,[ 1952, 9279],{id:'00394',mid:'02'}],[12,[ 1845, 9247],{id:'00395',mid:'03'}],[12,[ 4610, 6281],{id:'00396',mid:'04'}],[12,[ 4617, 6312],{id:'00397',mid:'05'}],[12,[ 5663, 5628],{id:'00398',mid:'06'}],[12,[ 1758, 9584],{id:'00399',mid:'07'}],[12,[ 1712, 9558],{id:'00400',mid:'08'}]
];

// Noyau cristallin

var listnoyauc = [
	[12,[ 2236, 9962],{id:'00476',mid:'01'}],[12,[ 2408, 8437],{id:'00477',mid:'02'}],[12,[ 2441, 8431],{id:'00478',mid:'03'}],[12,[ 5501, 5503],{id:'00479',mid:'04'}],[12,[ 7178, 6466],{id:'00480',mid:'05'}],[12,[ 7588, 7100],{id:'00481',mid:'06'}],[12,[ 7560, 7018],{id:'00482',mid:'07'}],[12,[ 7252, 6469],{id:'00483',mid:'08'}],[12,[ 7528, 7103],{id:'00484',mid:'09'}],[12,[ 6736, 9482],{id:'00485',mid:'10'}]
];

// Perles de loche

var listperle = [
	[12,[ 5596, 6282],{id:'00471',mid:'01'}],[12,[ 7506, 8890],{id:'00472',mid:'02'}]
];

// Perle de corail

var listcorail = [
	[12,[ 2571,10133],{id:'00461',mid:'01'}],[12,[ 2719,10131],{id:'00462',mid:'02'}],[12,[ 2761,10152],{id:'00463',mid:'03'}],[12,[ 2707,10279],{id:'00464',mid:'04'}],[12,[ 2583,10227],{id:'00465',mid:'05'}],[12,[ 2271, 8756],{id:'00466',mid:'06'}],[12,[ 2349, 8709],{id:'00467',mid:'07'}],[12,[ 2431, 8692],{id:'00468',mid:'08'}],[12,[ 2433, 8798],{id:'00469',mid:'09'}],[12,[ 2351, 8925],{id:'00470',mid:'10'}]
];

// Fleurs de Feu

var listffeu = [
	[12,[ 1881, 8022],{id:'00473',mid:'01'}],[12,[ 1955, 8015],{id:'00474',mid:'02'}],[12,[ 5012, 2972],{id:'00475',mid:'03'}]
];

// Fleurs de Brume

var listfbrume = [
	[12,[ 5473, 5997],{id:'00495',mid:'01'}],[12,[ 5523, 6039],{id:'00496',mid:'02'}],[12,[ 5571, 6214],{id:'00497',mid:'03'}],[12,[ 5603, 6203],{id:'00498',mid:'04'}],[12,[ 5469, 5914],{id:'00499',mid:'05'}],[12,[ 6644, 9566],{id:'00500',mid:'06'}],[12,[ 4843, 2839],{id:'00501',mid:'07'}]
];

// Ganoderma marin

var listganoderma = [
	[12,[ 8964, 6418],{id:'00502',mid:'01'}],[12,[ 8932, 6385],{id:'00503',mid:'02'}],[12,[ 8955, 6443],{id:'00504',mid:'03'}],[12,[ 8914, 6466],{id:'00505',mid:'04'}],[12,[ 8897, 6447],{id:'00506',mid:'05'}]
];

// Herbe Marine

var listherbem = [
	[12,[ 2356, 9819],{id:'00519',mid:'01'}],[12,[ 2361, 9780],{id:'00520',mid:'02'}],[12,[ 2307, 9793],{id:'00521',mid:'03'}],[12,[ 1982, 9844],{id:'00522',mid:'04'}],[12,[ 1902, 9775],{id:'00523',mid:'05'}],[12,[ 2037, 9735],{id:'00524',mid:'06'}],[12,[ 2172, 9539],{id:'00525',mid:'07'}],[12,[ 2110, 9553],{id:'00526',mid:'08'}],[12,[ 2023, 9579],{id:'00527',mid:'09'}],[12,[ 1952, 9490],{id:'00528',mid:'10'}],
	[12,[ 2377, 8879],{id:'00529',mid:'11'}],[12,[ 2405, 8775],{id:'00530',mid:'12'}],[12,[ 2404, 8745],{id:'00531',mid:'13'}],[12,[ 2138, 8555],{id:'00532',mid:'14'}],[12,[ 2118, 8598],{id:'00533',mid:'15'}],[12,[ 2186, 8603],{id:'00534',mid:'16'}],[12,[ 2048, 8426],{id:'00535',mid:'17'}],[12,[ 5556, 6102],{id:'00536',mid:'18'}],[12,[ 5476, 6228],{id:'00537',mid:'19'}],[12,[ 5536, 6165],{id:'00538',mid:'20'}],
	[12,[ 5624, 6264],{id:'00539',mid:'21'}],[12,[ 2500, 9996],{id:'00540',mid:'22'}],[12,[ 6560, 9564],{id:'00541',mid:'23'}],[12,[ 2284, 9900],{id:'00542',mid:'24'}]
];

// Grenouille

var listgrenouille = [
	[12,[ 2026, 8499],{id:'00510',mid:'01'}],[12,[ 5481, 6204],{id:'00511',mid:'02'}],[12,[11314, 3158],{id:'00512',mid:'03'}]
];

// Lézard

var listlezard = [
	[12,[ 7388, 8634],{id:'00513',mid:'01'}],[12,[ 7398, 9024],{id:'00514',mid:'02'}],[12,[ 5888,10182],{id:'00515',mid:'03'}],[12,[ 2240,10020],{id:'00516',mid:'04'}],[12,[ 7390, 8636],{id:'00517',mid:'05'}],[12,[ 6800,10118],{id:'00518',mid:'06'}]
];

// Crabe

var listcrabe = [
	[12,[ 2356, 9819],{id:'00543',mid:'01'}],[12,[ 1648, 8868],{id:'00544',mid:'02'}]
];

var totalMarkers = 544;