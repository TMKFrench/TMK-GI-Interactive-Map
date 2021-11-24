// Déclaration des types marqueurs

var Teleport = L.icon({iconUrl:'media/icones/teleport.png', className:'teleport', iconSize:[25, 40], iconAnchor:[12, 40], popupAnchor:[0, -40]});
var Tpbarge = L.icon({iconUrl:'media/icones/tpbarge.png', className:'tpbarge', iconSize:[30, 30], iconAnchor:[15, 30], popupAnchor:[0, -30]});
var Echo1 = L.icon({iconUrl:'media/icones/echo1m.png', className:'echo1', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Echo2 = L.icon({iconUrl:'media/icones/echo2m.png', className:'echo2', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Echo3 = L.icon({iconUrl:'media/icones/echo3m.png', className:'echo3', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Echo4 = L.icon({iconUrl:'media/icones/echo4m.png', className:'echo4', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Echo5 = L.icon({iconUrl:'media/icones/echo5m.png', className:'echo5', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Echo6 = L.icon({iconUrl:'media/icones/echo6m.png', className:'echo6', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Echo7 = L.icon({iconUrl:'media/icones/echo7m.png', className:'echo7', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Evt = L.icon({iconUrl:'media/icones/evt.png', className:'evt', iconSize:[48, 48], iconAnchor:[24, 48], popupAnchor:[0, -48]});
var Cordi = L.icon({iconUrl:'media/icones/cordi.png', className:'cordi', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Cdelic = L.icon({iconUrl:'media/icones/cdelic.png', className:'cdelic', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Cprec = L.icon({iconUrl:'media/icones/cprec.png', className:'cprec', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Cluxe = L.icon({iconUrl:'media/icones/cluxe.png', className:'cluxe', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Cdefi = L.icon({iconUrl:'media/icones/cdefi.png', className:'cdefi', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Cfee = L.icon({iconUrl:'media/icones/cfee.png', className:'cfee', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Cpeint = L.icon({iconUrl:'media/icones/cpeint.png', className:'cpeint', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Charp = L.icon({iconUrl:'media/icones/charp.png', className:'charp', iconSize:[30, 48], iconAnchor:[15, 48], popupAnchor:[0, -48]});
var Ferblanc = L.icon({iconUrl:'media/icones/ferblanc.png', className:'ferblanc', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Cristal = L.icon({iconUrl:'media/icones/cristal.png', className:'cristal', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Electrocris = L.icon({iconUrl:'media/icones/electrocris.png', className:'electrocris', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
// var Noyauc = L.icon({iconUrl:'media/icones/noyauc.png', className:'noyauc', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Conque = L.icon({iconUrl:'media/icones/conque.png', className:'conque', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Ffeu = L.icon({iconUrl:'media/icones/ffeu.png', className:'ffeu', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Fbrume = L.icon({iconUrl:'media/icones/fbrume.png', className:'fbrume', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Carotte = L.icon({iconUrl:'media/icones/carotte.png', className:'carotte', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Radis = L.icon({iconUrl:'media/icones/radis.png', className:'radis', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Pissenlit = L.icon({iconUrl:'media/icones/pissenlit.png', className:'pissenlit', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
// var Grenouille = L.icon({iconUrl:'media/icones/grenouille.png', className:'grenouille', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
// var Lezard = L.icon({iconUrl:'media/icones/lezard.png', className:'lezard', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
// var Papillon = L.icon({iconUrl:'media/icones/papillon.png', className:'papillon', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
// var Luciole = L.icon({iconUrl:'media/icones/luciole.png', className:'luciole', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Crabe = L.icon({iconUrl:'media/icones/crabe.png', className:'crabe', iconSize:[30, 30], iconAnchor:[15, 15], popupAnchor:[0, -15]});
var Null = L.icon({iconUrl:'media/icones/null0.png', className:'null', iconSize:[2, 2], iconAnchor:[2, 3], popupAnchor:[-3, -3]});

var popupOptions =
    {
        'minWidth': '640px',
        'minHeight': '480px',
        'closeButton': false
    }

    // Liste des Marqueurs

// Téléporteurs

var listteleport = [
    [0,[3415,5416]],[0,[5263,5116]],[0,[4516,3471]],[0,[2853,4036]],[0,[4447,4551]],[0,[3525,3240]],[0,[5419,3652]]
];

// Téléporteurs de barge

var listtpbargeold = [
    [0,[3404,5334]],[0,[5040,4960]],[0,[4549,3428]],[0,[2798,4100]]
];

var listtpbarge = [
    [0,[3470,5307]],[0,[5208,4795]],[0,[4324,3306]],[0,[2774,4239]],[0,[4267,4570]],[0,[4720,5525]],[0,[4305,5548]],[0,[3516,3186]],[0,[4810,3468]],[0,[5376,3693]],[0,[5252,4205]]
];

// Coffres Ordinaires genshin,coffre,ordinaire,common,chest,map,archipel pomme dorée,archipel,pomme,dorée,golden apple archipelago,golden,apple,archipelago 52

var listcordi = [
    [0,[2848,4826],langue.com003],[0,[3994,5400],langue.com003],[0,[4548,5093],langue.com003],[0,[5221,5118],langue.com021],[0,[4964,5069],langue.com007],[0,[5208,4323],langue.com003],[0,[4440,3435]],[0,[4763,3693],langue.com003],[0,[5647,3476]],[0,[4527,2895],langue.com003],
    [0,[3422,3864],langue.com003],[0,[4033,4612],langue.com003],[0,[3427,5250],langue.com003],[0,[3285,5339],langue.com003],[0,[5344,4904],langue.com003],[0,[4736,5530],langue.com003],[0,[5444,3448],langue.com003],[0,[5678,3517],langue.com003],[0,[6180,2395]],[0,[2590,4188]],
    [0,[2624,4122]],[5,[2654,4079],"9xW4BsYIszY"],[0,[3387,5371],langue.com021],[0,[4774,3236],langue.com021],[0,[5228,5094]],[0,[5285,4905]],[0,[2796,4537],langue.com003],[0,[5312,5169]],[0,[6016,5709]],[0,[5423,3870],langue.com003],
    [0,[5837,3621],langue.com003],[0,[5738,3593],langue.com206],[0,[5621,3694]],[0,[5552,3640]],[0,[5557,3676]],[0,[5587,3690],langue.com003],[0,[5614,3701]],[0,[5687,3552]],[0,[5698,3453]],[0,[5335,3423],langue.com003],
    [0,[4388,3534]],[0,[4392,3537]],[0,[4565,3517],langue.com021],[0,[4777,3798]],[0,[4544,3821]],[0,[4213,3569],langue.com052],[0,[3326,4800]],[0,[2520,4289]],[0,[2395,4132]],[0,[2735,4495],langue.com007],
    [0,[6994,5520]],[0,[7013,5568]]
];

// Coffres Délicats genshin,coffre,délicat,exquisite,chest,map,archipel pomme dorée,archipel,pomme,dorée,golden apple archipelago,golden,apple,archipelago 33

var listcdelic = [
    [0,[4926,5086],langue.com003],[0,[5002,5001],langue.com003],[0,[5349,5018],langue.com003],[5,[4730,3731],"SX6wXY6eHew",langue.com087],[0,[2770,4072]],[5,[2631,4170],"cptGcANFCFY",langue.com172],[0,[3378,5388],langue.com003],[0,[5223,4855],langue.com003],[0,[4964,5574],langue.com003],[0,[3488,6112],langue.com003],
    [0,[5479,3446],langue.com003],[0,[2580,4129],langue.com003],[0,[2620,4015],langue.com181],[0,[3549,5711],langue.com003],[0,[4289,5788],langue.com003],[0,[4564,3370],langue.com003],[0,[4407,3315],langue.com003],[0,[2606,4456],langue.com003],[0,[2800,4329],langue.com003],[0,[3818,5949],langue.com003],
    [0,[5152,5471],langue.com003],[0,[5466,5196],langue.com003],[0,[5162,4364],langue.com003],[0,[3094,5629],langue.com003],[0,[4967,5037],langue.com003],[0,[5567,3300],langue.com003],[0,[4709,3763],langue.com003],[0,[4542,3634],langue.com003],[0,[3676,4268],langue.com003],[0,[3302,4802],langue.com003],
    [0,[2542,2682],langue.com003],[0,[2310,4539],langue.com003],[5,[2655,3282],"rG8RdmYMxIM"]
];

// Coffres Précieux genshin,coffre,précieux,precious,chest,map,liyue 6

var listcprec = [
    [0,[5988,5717],langue.com003],[5,[4727,3461],"Lqvz8qb-CxI"],[5,[4727,3479],"Lqvz8qb-CxI"],[5,[7011,5556],"-exQ-8MAZsA"],[5,[7009,5562],"-exQ-8MAZsA"],[5,[7003,5566],"-exQ-8MAZsA"]
];

// Coffres Luxueux genshin,coffre,luxueux,luxurious,chest,map,liyue 4

var listcluxe = [
    [0,[5513,3586],langue.com174],[0,[5010,5263],langue.com205],[5,[4721,3469],"Lqvz8qb-CxI"],[5,[2630,3276],"qe5_L-jAh9o"]
];

// Coffres Défis genshin,coffre,défi,challenge,chest,map,archipel pomme dorée,archipel,pomme,dorée,golden apple archipelago,golden,apple,archipelago 11

var listcdefi = [
    [5,[3382,4484],"ZQBIJ7oe6f4",langue.com173],[5,[2677,4218],"pXi5NwZ-ayQ",langue.com177],[5,[2618,4587],"NruKcKDBmr0",langue.com178],[5,[3335,5283],"1po99RCOd3A",langue.com179],[5,[3251,5775],"xxMsgW_WqKk",langue.com180],
    [5,[5544,5650],"VU9xIurFL34",langue.com182],[5,[5138,4191],"cPjFScpkYek",langue.com183],[5,[5193,3956],"ftrVPjSZapw",langue.com184],[5,[5966,3138],"gQ7Vu9qjvLg",langue.com184],[5,[4826,3245],"t0oMKriA2vA",langue.com185],
    [5,[3050,3262],"XNtMgW9wjAY",langue.com186]
];

var listcfee = [
    [5,[2609,4118],"LnfzMHlo8EI",langue.cat07,langue.com187]
];

// Coffres Peinture Murale 16

var listcpeint = [
    [0,[3471,5536]],[0,[2690,4188]],[0,[2579,4038]],[0,[2659,4600]],[0,[4449,3380]],[0,[4440,3567]],[0,[4273,5565]],[0,[4866,5336]],[0,[5343,4989]],[0,[3126,2304]],
    [0,[2711,4494]],[0,[5097,5006]],[0,[4789,3812]],[0,[4594,3813]],[0,[4583,3460]],[0,[4422,3123]]
];

// Coffres Harpastum 18

var listcharp = [
    [0,[2719,4015],langue.com175],[0,[2517,4050],langue.com176],[0,[5016,5540],langue.com194],[0,[5172,5245],langue.com195],[0,[3294,5229],langue.com176],[0,[3097,5572],langue.com176],[0,[2688,4284],langue.com196],[0,[3961,5717],langue.com197],[0,[4924,5360],langue.com176],[0,[4842,5351],langue.com176],
    [0,[4825,5160],langue.com198],[0,[4817,5154],langue.com199],[0,[5072,4895],langue.com176],[0,[4974,4811],langue.com200],[0,[4360,3525],langue.com201],[0,[4481,3362],langue.com202],[0,[4405,3177],langue.com203],[0,[4788,3197],langue.com204]
];

// Fer Blanc

var listferblanc = [
    [12,[3400,5516]],[12,[3403,5485]],[12,[3388,5473]],[12,[4213,5575]],[12,[4192,5620]],[12,[4191,5651]],[12,[2653,4188]],[12,[2638,4183]],[12,[2603,4577]],[12,[2624,4571]],
    [12,[3267,5634]],[12,[3384,5427]],[12,[4492,3455]],[12,[4407,3552]],[12,[5007,5098]],[12,[4990,5104]]
];

// Cristal

var listcristal = [
    [12,[5661,3540]],[12,[4940,5583]],[12,[3546,5731]],[12,[3565,5723]],[12,[2610,4571]],[12,[3269,5640]],[12,[3266,5619]],[12,[3261,5607]],[12,[4458,3481]],[12,[4415,3550]],
    [12,[5496,3395]],[12,[5482,3391]],[12,[4444,3184]]
];

// Electrocristal

var listelectroc = [
    [12,[4987,5081]],[12,[3433,5224]],[12,[4992,5639]],[12,[4322,5643]],[12,[3640,5853]],[12,[4610,3208]],[12,[2534,4007]],[12,[4446,3789]],[12,[5633,3692]]
];

// Conque d'étoile

var listconque =[
    [12,[3281,5609]],[12,[3281,5627]],[12,[3270,5653]]
];

// Noyau cristallin

// var listnoyauc = [
    
// ];

// Fleurs de Feu

var listffeu = [
    [12,[3371,5399]],[12,[4630,3324]],[12,[4552,3681]],[12,[3133,5596]]
];

// Fleurs de Brume

var listfbrume = [
    [12,[3224,5323]],[12,[3213,5331]],[12,[3210,5326]],[12,[5204,4824]],[12,[5228,4810]],[12,[4883,5420]],[12,[5479,3512]],[12,[5503,3444]],[12,[4371,3351]],[12,[4043,5790]]
];

// Carottes

var listcarotte = [
    [12,[5325,5102]],[12,[5027,4911]]
];

// Radis

var listradis = [
    [12,[5331,5100]]
];

// Pissenlit

var listpissenlit = [
    [12,[2696,4164]],[12,[2789,4016]],[12,[2537,4037]],[12,[2692,4243]],[12,[2779,4459]],[12,[2682,4458]],[12,[5633,3692]]
];

// Ganoderma Marin

var listgano = [
    [12,[3267,5442]],[12,[3265,5450]],[12,[3242, 5431]],[12,[3245, 5410]]
];

// Grenouille

// var listgrenouille = [
    
// ];

// Lézard

// var listlezard = [
    
// ];

// Papillon

// var listpapillon = [
    
// ];

// Luciole

// var listluciole = [
    
// ];

// Crabe

var listcrabe = [
    [12,[3454,5291]],[12,[3491,5327]],[12,[3354,5506]],[12,[4276,4347]],[12,[5249,4834]],[12,[2770,4257]],[12,[2759,4219]],[12,[4378,3335]],[12,[5117,5476]],[12,[5219,4883]],
    [12,[3535,3155]]
];

// Event Echos du Passé

var listecho1 = [
    [0,[4955,5605],langue.ceI1],[0,[4855,5355],langue.ceI2],[0,[4915,5054],langue.ceI3],[0,[5257,5182],langue.ceI4],[0,[5271,4936],langue.ceI5]
];

var listecho2 = [
    [0,[4238,5623],langue.ceII1],[0,[5144,4294],langue.ceII2]
];

var listecho3 = [
    [0,[5112,4152],langue.ceIII1],[0,[5655,3540],langue.ceIII2],[0,[5462,3463],langue.ceIII3]
];

var listecho4 = [
    [0,[3379,5327],langue.ceIV1],[0,[4466,4423],langue.ceIV2],[0,[4264,4338],langue.ceIV3]
];

var listecho5 = [
    [0,[3498,6097],langue.ceV1],[0,[3100,2276],langue.ceV2],[3,[5241,5088],langue.ceV3],[0,[6176,2390],langue.ceV4],[0,[6016,5702],langue.ceV5]
];

var listecho6 = [
    [0,[2792,4121],langue.ceVI1],[0,[4279,5818],langue.ceVI2],[0,[3377,5407],langue.ceVI3],[0,[4284,4468],langue.ceVI4]
];

var listecho7 = [
    [0,[5370,4873],langue.ceVII1],[0,[4993,4945],langue.ceVII2],[0,[2674,4431],langue.ceVII3],[0,[2646,4565],langue.ceVII4],[0,[2676,4129],langue.ceVII5],[0,[3447,5435],langue.ceVII6],[0,[4778,3735],langue.ceVII7],[0,[3561,5741],langue.ceVII8],[0,[4549,3398],langue.ceVII9],[0,[4823,3253],langue.ceVII10]
];

// Event En avant toute ! genshin,map,archipel pomme dorée,archipel,pomme,dorée,golden apple archipelago,golden,apple,archipelago,événement,en avant toute,event, full speed ahead

var listevt = [
    [5,[5365,3639],"n5cmUCfEQus",langue.com188],[5,[3674,5028],"geJuTjFfl08",langue.com189],[5,[4271,3560],"l1kedYdvyiA",langue.com190],[5,[2993,4381],"faa-_Gb2WKU",langue.com191],[5,[3637,5369],"z6CH48EWamA",langue.com192],[5,[4660,5611],"WGJjWm2nTnQ",langue.com193]
];