const { verificarCedula } = require('../src/index');

// FUENTE: GOOGLE => http://web.educacion.gob.ec/
const cedulasValidas = [
  '0102813417',
  '0105287882',
  '0104470034',
  '0101220044',
  '0104030747',
  '0104478615',
  '0104619036',
  '0104835640',
  '0104992060',
  '1400484463',
  '0910142942',
  '0104532601',
  '0300821972',
  '0602059685',
  '0603736299',
  '1103581474',
  '0503038002',
  '0705208304',
  '0703263228',
  '2000051611',
  '0909702805',
  '0914500152',
  '0914960174',
  '0923265748',
  '1202386148',
  '0923867618',
  '1721526083',
  '0910040948',
  '0911373736',
  '0920959509',
  '0909698664',
  '1203750920',
  '0931226518',
  '0920168754',
  '0921621207',
  '0921950754',
  '1003203237',
  '1002634838',
  '1715928717',
  '1103505580',
  '0301264792',
  '1310779648',
  '0920368578',
  '1711309375',
  '1206027425',
  '1205962184',
  '1309189460',
  '1900219690',
  '1310689300',
  '1706345475',
  '1308650900',
  '1306359553',
  '1714012414',
  '0401042551',
  '0602746737',
  '1718514332',
  '1702928795',
  '0301458154',
  '1709408874',
  '1710559202',
  '1713651113',
  '1716583560',
  '1716982150',
  '1802792455',
  '1802616969',
  '1803104262',
  '1803484797',
  '1803606613',
  '1803694460',
  '0926428459',
  '0905025326',
  '0930040100',
  '0104108741',
  '0604310870',
  '1718471848',
  '1600399610',
  '1718307836',
  '0401671847',
  '1003342373',
  '0301916425',
  '1712268463',
  '1803467115',
  '1709012809',
  '0102778271',
  '1804030235',
  '0104275672',
  '1714111018',
  '0103444618',
  '1103145023',
  '1103328488',
  '1719850461',
  '0922558101',
  '1713463238',
  '0704141654',
  '1205603507',
  '0103439220',
  '0105193676',
  '1312077751',
  '0916565435',
  '0503339368',
  '0104645494',
  '0105494033',
  '1102978580',
  '0916971054',
  '0502653231',
  '1104326218',
  '0602681694',
  '0925338956',
  '1311757452',
  '0915709638',
  '1104034226',
  '0106069032',
  '1719242453',
  '0103808283',
  '1716004625',
  '1002937108',
  '1714954953',
  '0104708664',
  '1102189873',
  '1103513592',
  '1103716401',
  '1104793367',
  '1309882502',
  '1310229719',
  '1600407934',
  '0105674808',
  '0919366880',
  '0301872131',
  '0603960840',
  '0704352012',
  '0602763195',
  '0922638713',
  '1206304816',
  '1710218999',
  '1714729025',
  '1715972947',
  '1721002770',
  '1802172468',
  '1900705359',
  '0103149845',
  '1002865598',
  '0910116722',
  '0104068507',
  '1711204246',
  '0917475337',
  '1311505026',
  '1803735933',
  '1719316430',
  '0921694980',
  '0105845697',
  '1715076772',
  '1708218449',
  '0104854864',
  '1715284194',
  '1712623071',
  '0102740347',
  '1308317450',
  '1715863849',
  '1308316601',
  '1804235214',
  '1203494859',
  '1002837753',
  '0702128547',
  '0923385546',
  '0704466093',
  '1103318638',
  '1104149727',
  '0930301239',
  '1716122682',
  '1003554902',
  '0101955870',
  '0940432321',
  '0928664101',
  '0105473334',
  '1104586795',
  '0920876380',
  '0103815007',
  '1311982324',
  '1500449861',
];

// FUENTE: (ALTERANDO DIGITOS DE LAS CÉDULAS VÁLIDAS, Y ALGUNAS GENERADAS ALEATORIAMENTE)
const cedulasInvalidas = [
  '0104132817',
  '0108875282',
  '0100704434',
  '0100201244',
  '0107304047',
  '0106784415',
  '0100194636',
  '0106354840',
  '0100924960',
  '1404840463',
  '0919420142',
  '0106324501',
  '0309210872',
  '0606592085',
  '0602363799',
  '1104813574',
  '0500383002',
  '0703085204',
  '0702633228',
  '2006510011',
  '0911004552',
  '0911604974',
  '0927653248',
  '1201862348',
  '0926673818',
  '0919400048',
  '0917731336',
  '0925590909',
  '0906989664',
  '1209503720',
  '0935261218',
  '0927680154',
  '0922211607',
  '0927501954',
  '1002033237',
  '1008342638',
  '1717285917',
  '1105053580',
  '0307641292',
  '0925680378',
  '1713091375',
  '1204276025',
  '1201625984',
  '1304899160',
  '1906190290',
  '1313890600',
  '1704456375',
  '1309508600',
  '1714124014',
  '0405421051',
  '0607462737',
  '1707282995',
  '0301581454',
  '1708089474',
  '1711513613',
  '1715836560',
  '1711826950',
  '1804922755',
  '1809162669',
  '1802043162',
  '1807843497',
  '1806063613',
  '1804943660',
  '0924286459',
  '0903255026',
  '0931400000',
  '0107084141',
  '0608104370',
  '1718718448',
  '1606990310',
  '1718078336',
  '0408711647',
  '1003423373',
  '0304161925',
  '1714682263',
  '1801673415',
  '1708129009',
  '0102782771',
  '1802304035',
  '0106754272',
  '1710114118',
  '0106443418',
  '1104283388',
  '1714509861',
  '0921582501',
  '1712633438',
  '0706414154',
  '1205035607',
  '0102393420',
  '0106935176',
  '1317772051',
  '0914656535',
  '0503393368',
  '0104454694',
  '0100945433',
  '1105782980',
  '0910716954',
  '0502532631',
  '1102264318',
  '0606812694',
  '0929385356',
  '1314571752',
  '0916095738',
  '1102344026',
  '0100696032',
  '0102083883',
  '1716046025',
  '1001372908',
  '1719544953',
  '0106084764',
  '1105133592',
  '1104163701',
  '1103934767',
  '1305829802',
  '1609070434',
  '0108745608',
  '0918669380',
  '0301721831',
  '0700524312',
  '0601632795',
  '0927382613',
  '1710294725',
  '1719725947',
  '1727021070',
  '1804722168',
  '1903050759',
  '0108493145',
  '1005652898',
  '0917160122',
  '0105684007',
  '1712041246',
  '0913757437',
  '1310051526',
  '1809353733',
  '1714169330',
  '0106455897',
  '1717765072',
  '1704188249',
  '0108544864',
  '1711845294',
  '1710232671',
  '0103402747',
  '1304178350',
  '1718635849',
  '1802354214',
  '1208943459',
  '1007372853',
  '0705282147',
  '0925853346',
  '1106183338',
  '1107494127',
  '0932010339',
  '1716226182',
  '1009543502',
  '0108551970',
  '0943320421',
  '0921648601',
  '0103735434',
  '0923760880',
  '0100153807',
  '1313821924',
];

// WARN: Cédulas no registradas en RC, pero son válidas para el algoritmo.
const cedulasDudosas = [
  '1108892173',
  '0608603940',
  '1107864595',
  '1508490461',
];

describe('Verificar cédula Válidas', () => {
  test.each(cedulasValidas)('Cédula válida (%s) debe de ser: true', (cedula) => {
    expect(verificarCedula(cedula)).toBe(true);
  });
});

describe('Verificar cédula Inválidas', () => {
  test.each(cedulasInvalidas)('Cédula inválida (%s) debe de ser: false', (cedula) => {
    expect(verificarCedula(cedula)).toBe(false);
  });
});
