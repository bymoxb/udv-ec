/**
 * Comprueba si un número de cédula es válido
 * @param {string} cedula - número de cedula a comprobar
 * @return {boolean} - retorna true si el número es válido, false de ser inválido
 */
function verificarCedula(cedula = '') {
  try {
    const auxCedula = `${cedula}`;

    if (auxCedula.length !== 10) {
      return false;
    }

    const primeros2 = +auxCedula.substr(0, 2);

    if (primeros2 < 1 || primeros2 > 24) {
      return false;
    }

    const digitoVerificador = +([...auxCedula].pop());

    const { impares: imparesList, pares: paresList } = [...auxCedula.substr(0, 9)]
      .reduce(({ pares, impares }, c, i) => (i % 2 ? {
        pares: [...pares, c],
        impares,
      } : {
        pares,
        impares: [...impares, c],
      }), { pares: [], impares: [] });

    const imparesListMult = imparesList.map((i) => ((i * 2) > 9 ? (i * 2) - 9 : i * 2));

    const sumaImpares = imparesListMult.reduce((p, c) => (+p + +c), 0);
    const sumaPares = paresList.reduce((p, c) => (+p + +c), 0);

    const sumaT = sumaImpares + sumaPares;
    const modulo10 = sumaT % 10;

    return (modulo10 === 0) ? (digitoVerificador === 0) : ((10 - modulo10) === digitoVerificador);
  } catch (error) {
    return false;
  }
}

function verificarPJ(ruc = '') {
  try {
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];

    const digitoVerificador = +([...ruc].pop());

    const multiplicacion = [...ruc.substr(0, 9)]
      .reduce((p, c, i) => ((p) + ((+c) * coeficientes[i])), 0);

    const residuo = multiplicacion % 11;

    return (residuo === 0) ? (digitoVerificador === 0) : (11 - residuo) === digitoVerificador;
  } catch (error) {
    return false;
  }
}

function verificarIP(ruc = '') {
  try {
    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];

    const digitoVerificador = +([...ruc].pop());

    const multiplicacion = [...ruc.substr(0, 8)]
      .reduce((p, c, i) => ((p) + ((+c) * coeficientes[i])), 0);

    const residuo = multiplicacion % 11;

    return (residuo === 0) ? (digitoVerificador === 0) : (11 - residuo) === digitoVerificador;
  } catch (error) {
    return false;
  }
}

/**
 * Comprueba sin un número de RUC es válido
 * @param {string} ruc - número de ruc a comprobar
 * @return {boolean} - retorna true si el número es válido, false de ser inválido
 */
function verificarRuc(ruc = '') {
  try {
    const auxRuc = `${ruc}`;

    if (auxRuc.length !== 13) return false;

    const tresUltimosDigitos = auxRuc.substr(10, 3);

    if (!(new RegExp(/^[0-9][0-9][1-9]$/)).test(tresUltimosDigitos)) return false;

    const tercerDigito = auxRuc[2];

    // PERSONA NATURAL
    if (new RegExp(/^[0-5]$/).test(tercerDigito)) {
      return verificarCedula(auxRuc.substr(0, 10));
    }

    // INSTITUCIÓN PÚBLICA
    if (new RegExp(/^6$/gm).test(tercerDigito)) {
      return verificarIP(auxRuc.substr(0, 9));
    }

    // PERSONA JURÍDICA
    if (new RegExp(/^9$/gm).test(tercerDigito)) {
      return verificarPJ(auxRuc.substr(0, 10));
    }

    return false;
  } catch (error) {
    return false;
  }
}

module.exports = {
  verificarCedula,
  verificarRuc,
};
