exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('units').del();
  await knex('units').insert([
    /*1*/ { unit_name: 'incoming personnel', reports_to: 15 },
    /*2*/ { unit_name: 'incoming personnel', reports_to: 17 },
    /*3*/ { unit_name: 'maintenance crew', reports_to: 11 },
    /*4*/ { unit_name: 'S1 crew', reports_to: 11 },
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
    /*18*/ { unit_name: 'Alpha Team', reports_to: 17 },
    /*19*/ { unit_name: 'Bravo Team', reports_to: 17 },
    /*20*/ { unit_name: 'Charlie Team', reports_to: 11 },
    /*21*/ { unit_name: 'Delta Team', reports_to: 11 },
    /*22*/ { unit_name: 'Echo Platoon', reports_to: 12 },
    /*23*/ { unit_name: 'Foxtrot Platoon', reports_to: 12 },
    /*24*/ { unit_name: 'Golf Company', reports_to: 13 },
    /*25*/ { unit_name: 'Hotel Company', reports_to: 13 },
    /*26*/ { unit_name: 'India Battalion', reports_to: 14 },
    /*27*/ { unit_name: 'Juliet Battalion', reports_to: 14 },
    /*28*/ { unit_name: 'Kilo Platoon', reports_to: 15 },
    /*29*/ { unit_name: 'Lima Platoon', reports_to: 15 },
    /*30*/ { unit_name: 'Mike Squad', reports_to: 16 },
    /*31*/ { unit_name: 'November Squad', reports_to: 16 },
    /*32*/ { unit_name: 'Oscar CO', reports_to: 17 },
    /*33*/ { unit_name: 'Papa CO', reports_to: 17 },
    /*34*/ { unit_name: 'Quebec BAT', reports_to: 0 },
    /*35*/ { unit_name: 'Romeo Squad', reports_to: 13 },
    /*36*/ { unit_name: 'Sierra Squad', reports_to: 14 },
    /*37*/ { unit_name: 'Tango Platoon', reports_to: 12 },
    /*38*/ { unit_name: 'Uniform Platoon', reports_to: 11 },
    /*39*/ { unit_name: 'Victor CO', reports_to: 15 },
    /*40*/ { unit_name: 'Whiskey CO', reports_to: 17 },
    /*41*/ { unit_name: 'X-ray Team', reports_to: 16 },
    /*42*/ { unit_name: 'Yankee Team', reports_to: 13 },
    /*43*/ { unit_name: 'Zulu BAT', reports_to: 0 },
    /*44*/ { unit_name: '1st Recon', reports_to: 11 },
    /*45*/ { unit_name: '2nd Recon', reports_to: 12 },
    /*46*/ { unit_name: '3rd Recon', reports_to: 13 },
    /*47*/ { unit_name: '4th Recon', reports_to: 14 },
  ]);
};
