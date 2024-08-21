/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tags').del();
  await knex('tags').insert([
    { tag_name: 'LMTV license' },
    { tag_name: 'airborne' },
    { tag_name: 'sec+' },
    { tag_name: 'medical' },
    { tag_name: 'first aid training' },
    { tag_name: 'cybersecurity' },
    { tag_name: 'hazmat certified' },
    { tag_name: 'leadership' },
    { tag_name: 'air assault' },
    { tag_name: 'sniper qualified' },
    { tag_name: 'advanced driving' },
    { tag_name: 'combat medic' },
    { tag_name: 'explosive ordnance disposal' },
    { tag_name: 'intelligence analysis' },
    { tag_name: 'drone operations' },
    { tag_name: 'communication protocols' },
    { tag_name: 'logistics planning' },
    { tag_name: 'parachute rigger' },
    { tag_name: 'emergency response' },
    { tag_name: 'marksmanship' },
    { tag_name: 'hand-to-hand combat' },
    { tag_name: 'ranger qualified' },
    { tag_name: 'water survival' },

    { tag_name: 'physical fitness training' },
    { tag_name: 'counterintelligence' },
    { tag_name: 'chemical warfare' },
    { tag_name: 'vehicle maintenance' },
    { tag_name: 'radio communications' },
    { tag_name: 'field operations' },
    { tag_name: 'night vision operations' },
    { tag_name: 'urban warfare' },
    { tag_name: 'long-range reconnaissance' },
    { tag_name: 'close quarters combat' },
    { tag_name: 'explosives handling' },
    { tag_name: 'mountaineering' },
    { tag_name: 'pathfinder' },
    { tag_name: 'force protection' },
    { tag_name: 'search and rescue' },
    { tag_name: 'mission planning' },
    { tag_name: 'tactical leadership' },
    { tag_name: 'emergency evacuation' },
    { tag_name: 'intelligence gathering' },
    { tag_name: 'weapons systems' },
    { tag_name: 'amphibious operations' },
    { tag_name: 'air defense' },
    { tag_name: 'terrain navigation' },
    { tag_name: 'battlefield first aid' },
    { tag_name: 'special operations' },
  ]);
};
