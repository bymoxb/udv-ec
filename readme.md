# udv-ec (último dígito verificador Ecuador)

## Introducción

edv-ec es una librería JavaScript para validar números de cédulas y RUCs emitidos en Ecuador.

## Uso

### Verificar Cédula

```js

const { verificarCedula } = require('udv-ec');

const cedula = '1710034065';

console.log(verificarCedula(cedula));

// Retorna true, si es una cédula válida
// Retorna false, si es una cédula inválida
```

### Verificar RUC

```js

const { verificarRuc } = require('udv-ec');

const ruc = '1713175071001';

console.log(verificarRuc(ruc));

// Retorna true, si es un RUC válido
// Retorna false, si es un RUC inválido
```

## Proceso de validación

### Números de Cédulas

Dado el número de cédula: `1710034065`

1. Será exactamente una cadena de 10 dígitos numéricos.

2. El último dígito de la cadena será el dígito verificador (`5` para el número de cédula dado).

3. Los **dos** primeros dígitos (`17`) corresponden a la provincia en la cual se emitió el documento. No serán menores a `0` ni mayores a `24`.

4. Coeficientes a utilizar son: `2, 1, 2, 1, 2, 1, 2, 1, 2, 1`.
   
5. Cada dígito de la cedula (con exepción al último dígito verificador) será **multiplicado** por un coeficiente de su misma posición. Como se muestra acontinuación.

| Posición | Dígito de la Cédula | Coeficiente | Resultado de la Multiplicación |
| :------: | :-----------------: | :---------: | :----------------------------: |
|    0     |          1          |      2      |               2                |
|    1     |          7          |      1      |               7                |
|    2     |          1          |      2      |               2                |
|    3     |          0          |      1      |               0                |
|    4     |          0          |      2      |               0                |
|    5     |          3          |      1      |               3                |
|    6     |          4          |      2      |               8                |
|    7     |          0          |      1      |               0                |
|    8     |          6          |      2      |               12               |

6. Si el resultado de la múltiplicación es **mayor** o **igual** que `10`, se le resta `9`.

| Resultado de la Multiplicación | Cantidad a restar | Resultado |
| :----------------------------: | :---------------: | :-------: |
|               2                |                   |     2     |
|               7                |                   |     7     |
|               2                |                   |     2     |
|               0                |                   |     0     |
|               0                |                   |     0     |
|               3                |                   |     3     |
|               8                |                   |     8     |
|               0                |                   |     0     |
|               12               |        -9         |     3     |

7. Se suman los resultados: `2 + 7 + 2 + 0 + 0 + 3 + 8 + 0 + 3` `=` `25`

8. Al resultado de la suma (`25`) se le aplica el módulo `10`. (`25 % 10 = 5`)

9. Comparación.
   1. Si el resultado al aplicar el módulo `10` es **igual** a `0`, se compara inmediatamente con el último dígito verificador. En el caso de ser iguales, se asume que es una cédula válida, caso contrario es una cédula inválida. (No se aplica para este caso, ya que el resultado anterior fue `5`)
   
   2. Caso contrario, al número `10` se le resta el resultado de la aplicación del módulo (`5`). (Si aplica para este caso)
      1. `10 - 5 = 5`
      2. Este resultado (`5`) es comparado con el último dígito verificador (`5`), en el caso de ser iguales, se asume que es una cédula válida, caso contrario es una cédula inválida.
         1. `5 == 5`
         2. Es una cédula **válida**.

### Números de RUCs (Registro Único de Contribuyentes)

1. Será exactamente una cadena de 13 dígitos numéricos.

2. Los **dos** primeros dígitos corresponden a la provincia en la cual se emitió el documento. No serán menores a `0` ni mayores a `24`.

4. Los últimos tres dígitos corresponderán al número de establecimentos adicionaes. (`001`, `002`, `003`, ...)

5. El RUC tiene tres clasificaciones.
   1. RUC Natural.
   2. RUC Jurídicos y extranjeros sin cédula.
   3. RUC Públicos.

#### RUC Natural

Dado el número de RUC: `1713175071001`

1. El **tercer** dígito del RUC estará dentro del rango de `0` a `5` (`###[0-5]#########`). (Para le el ejemplo, el tercer dígito es `1`)

2. Se extrae los **10 primeros** dígitos que serán validados como si fuera un número de cédula. (`1713175071`)

#### RUC Jurídicos y extranjeros sin cédula.

Dado el número de RUC: `1790085783001`

1. El tercer dígito del RUC será siempre `9`. (`##9##########`)

2. El dígito verificador sera el de la **décima** posición. (`3` para el ejemplo)

3. Los coeficientes a utilizar son: `4, 3, 2, 7, 6, 5, 4, 3, 2`.

4. Cada dígito del RUC (con exepción al dígito verificador y los tres últimos) serán **multiplicados** por un coeficiente de su misma posición. Como se muestra acontinuación.

| Posición | Dígito de la Cédula | Coeficiente | Resultado de la Multiplicación |
| :------: | :-----------------: | :---------: | :----------------------------: |
|    0     |          1          |      4      |               4                |
|    1     |          7          |      3      |               21               |
|    2     |          9          |      2      |               18               |
|    3     |          0          |      7      |               0                |
|    4     |          0          |      6      |               0                |
|    5     |          8          |      5      |               40               |
|    6     |          5          |      4      |               20               |
|    7     |          7          |      3      |               21               |
|    8     |          8          |      2      |               16               |

5. Se suman los resultados: `4 + 21 + 18 + 0 + 0 + 40 + 20 + 21 + 16 = 140`

8. Al resultado de la suma (`140`) se le aplica el módulo `11`. (`140 % 11 = 8`)

9. Comparación.
   1. Si el resultado al aplicar el módulo `11` es **igual** a `0`, se compara inmediatamente con el último dígito verificador. En el caso de ser iguales, se asume que el RUC es válido, caso contrario es el RUC es inválido. (No se aplica para este caso, ya que el resultado anterior fue `8`)
   
   2. Caso contrario, al número `11` se le resta el resultado de la aplicación del módulo (`8`). (Si aplica para este caso)
      1. `11 - 8 = 3`
      2. Este resultado (`3`) es comparado con el dígito verificador (`3`), en el caso de ser iguales, se asume que el RUC es válido, caso contrario es el RUC es inválido.
         1. `3 == 3`
         2. Es un RUC **válido**.

#### RUC Públicos

Dado el número de RUC: `1260004800001`

1. El tercer dígito del RUC será siempre `6`. (`##6##########`)

2. El dígito verificador sera el de la **novena** posición. (`0` para el ejemplo)

3. Los coeficientes a utilizar son: `3, 2, 7, 6, 5, 4, 3, 2`.

4. Cada dígito del RUC (con exepción al dígito verificador y los cuatro últimos) serán **multiplicados** por un coeficiente de su misma posición. Como se muestra acontinuación.

| Posición | Dígito de la Cédula | Coeficiente | Resultado de la Multiplicación |
| :------: | :-----------------: | :---------: | :----------------------------: |
|    0     |          1          |      3      |               3                |
|    1     |          2          |      2      |               4                |
|    2     |          6          |      7      |               42               |
|    3     |          0          |      6      |               0                |
|    4     |          0          |      5      |               0                |
|    5     |          0          |      4      |               0                |
|    6     |          4          |      3      |               12               |
|    7     |          8          |      2      |               16               |

1. Se suman los resultados: `3 + 4 + 42 + 0 + 0 + 0 + 12 + 16 = 77`

2. Al resultado de la suma (`77`) se le aplica el módulo `11`. (`77 % 11 = 0`)

3. Comparación.
   1. Si el resultado al aplicar el módulo `11` es **igual** a `0`, este es comparado con el último dígito verificador, en el caso de ser iguales, se asume que el RUC es válido, caso contrario es el RUC es inválido.
      1. `0 == 0`
      2. Es un RUC **válido**.
   
   2. Caso contrario, al número `11` se le resta el resultado de la aplicación del módulo. (No se aplica para este caso, ya que el resultado anterior fue `0`)
      1. Este resultado es comparado con el dígito verificador, en el caso de ser iguales, se asume que el RUC es válido, caso contrario es el RUC es inválido.

## License

Licencia [MIT](./LICENSE)
