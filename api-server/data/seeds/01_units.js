/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('units').del();
  await knex('units').insert([
    /*1*/ { unit_name: 'incoming personel', higher_unit: 15 },
    /*2*/ { unit_name: 'incoming personel', higher_unit: 17 },

    /*3*/ { unit_name: 'maintenence crew', higher_unit: 11 },
    /*4*/ { unit_name: 's1 crew', higher_unit: 11 },
    /*5*/ { unit_name: '3rd squad', higher_unit: 12 },
    /*6*/ { unit_name: '4th squad', higher_unit: 12 },

    /*7*/ { unit_name: 'A squad', higher_unit: 13 },
    /*8*/ { unit_name: 'B squad', higher_unit: 13 },
    /*9*/ { unit_name: 'C squad', higher_unit: 14 },
    /*10*/ { unit_name: 'D squad', higher_unit: 14 },

    /*11*/ { unit_name: '1st platoon', higher_unit: 15 },
    /*12*/ { unit_name: '2nd platoon', higher_unit: 15 },

    /*13*/ { unit_name: 'A platoon', higher_unit: 16 },
    /*14*/ { unit_name: 'B platoon', higher_unit: 16 },

    /*15*/ { unit_name: '1 CO', higher_unit: 17 },
    /*16*/ { unit_name: 'A CO', higher_unit: 17 },

    /*17*/ { unit_name: '369 BAT', higher_unit: 0 },
  ]);
};

//id  level unit_name higherunit
//1   1     a         2
//2   2     b         0(means no higher)

//add a new one lower
//id  level unit_name higherunit
//1   1     a         2
//2   2     b         3
//3   3     c         0

//add a new one higher
//id  level unit_name higherunit
//1   2     a         2
//2   3     b         3
//3   4     c         0
//4   1     1         1

//another higher
//1   3     a         2
//2   4     b         3
//3   5     c         0
//4   2     1         1
//5   1     bru       4

//same level added
//6   3     aaa       2
