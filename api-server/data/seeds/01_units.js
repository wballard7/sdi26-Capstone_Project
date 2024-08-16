/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('units').del();
  await knex('units').insert([
    /*1*/ { unit_name: 'incoming personel', reports_to: 15 },
    /*2*/ { unit_name: 'incoming personel', reports_to: 17 },

    /*3*/ { unit_name: 'maintenence crew', reports_to: 11 },
    /*4*/ { unit_name: 's1 crew', reports_to: 11 },
    /*5*/ { unit_name: '3rd squad', reports_to: 12 },
    /*6*/ { unit_name: '4th squad', reports_to: 12 },

    /*7*/ { unit_name: 'A squad', reports_to: 13 },
    /*8*/ { unit_name: 'B squad', reports_to: 13 },
    /*9*/ { unit_name: 'C squad', reports_to: 14 },
    /*10*/ { unit_name: 'D squad', reports_to: 14 },

    /*11*/ { unit_name: '1st platoon', reports_to: 15 },
    /*12*/ { unit_name: '2nd platoon', reports_to: 15 },

    /*13*/ { unit_name: 'A platoon', reports_to: 16 },
    /*14*/ { unit_name: 'B platoon', reports_to: 16 },

    /*15*/ { unit_name: '1 CO', reports_to: 17 },
    /*16*/ { unit_name: 'A CO', reports_to: 17 },

    /*17*/ { unit_name: '369 BAT', reports_to: 0 },
  ]);
};

//id unit_name higherunit
//1    a         2
//2    b         0(means no higher)

//add a new one lower
//id unit_name higherunit
//1     a         2
//2     b         3
//3     c         0

//add a new one higher
//id  level unit_name higherunit
//1     a         2
//2     b         3
//3     c         0
//4     1         1

//another higher
//1     a         2
//2     b         3
//3     c         0
//4     1         1
//5     bru       4

//same level added
//6     aaa       2
