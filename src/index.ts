/**
 * Comprueba si un número de cédula es válido
 * @param {string} cedula - número de cedula a comprobar
 * @return {boolean} - retorna true si el número es válido, false de ser inválido
 */
function verificarCedula(cedula: string): boolean {
  try {
    const auxCedula = cedula;

    if (auxCedula.length !== 10) {
      return false;
    }

    const primeros2 = +auxCedula.substr(0, 2);

    if (primeros2 < 1 || primeros2 > 24) {
      return false;
    }

    const digitoVerificador = +(auxCedula.split('').slice(-1));

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];

    const sumaT = auxCedula.substr(0, 9).split('').reduce((p, c, i) => {
      let aux = 0;

      const mult = (+c) * coeficientes[i];

      aux = mult > 9 ? mult - 9 : mult;

      return p + aux;
    }, 0);

    const residuo = sumaT % 10;

    return (residuo === 0) ? (digitoVerificador === 0) : ((10 - residuo) === digitoVerificador);
  } catch (error) {
    return false;
  }
}

function verificarPJ(ruc: string): boolean {
  try {
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];

    const digitoVerificador = +(ruc.split('').slice(-1));

    const multiplicacion = ruc.substr(0, 9).split('')
      .reduce((p, c, i) => ((p) + ((+c) * coeficientes[i])), 0);

    const residuo = multiplicacion % 11;

    return (residuo === 0) ? (digitoVerificador === 0) : (11 - residuo) === digitoVerificador;
  } catch (error) {
    return false;
  }
}

function verificarIP(ruc: string): boolean {
  try {
    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];

    const digitoVerificador = +(ruc.split('').slice(-1));

    const multiplicacion = ruc.substr(0, 8).split('')
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
function verificarRuc(ruc: string): boolean {
  try {
    const auxRuc = ruc;

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

export {
  verificarCedula,
  verificarRuc,
};
