/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('dynamic_entries').del();
  const input_id = await knex('static_entries').select('id');
  const audience_id = await knex('join_audience').select('id');
  await knex('dynamic_entries').insert([
    {
      name: 'medical-deployment task for Unit 11',
      input_id: input_id[0].id,
      audience_id: audience_id[0].id,
      start_date: 20240814,
      end_date: 20240815,
      recurrence: 'none',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'Get this done by next week',
    },
    {
      name: 'Motorpool task for Unit 11',
      input_id: input_id[1].id,
      audience_id: audience_id[1].id,
      start_date: 20240814,
      end_date: 20240815,
      recurrence: 'monthly',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'Needs to road test the LMTV',
    },
    {
      name: 'Weapons Qual',
      input_id: input_id[2].id,
      audience_id: audience_id[2].id,
      start_date: 20240814,
      end_date: 20240815,
      recurrence: 'yearly',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'Pew pew learning',
    },
    {
      name: 'JQS',
      input_id: input_id[3].id,
      audience_id: audience_id[3].id,
      start_date: 20241001,
      end_date: 20250401,
      recurrence: 'daily',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      tag_id: 2,
      notes: 'Training starts 01OCT24',
    },
    {
      name: 'LMTV Road Test',
      input_id: input_id[4].id,
      audience_id: audience_id[4].id,
      start_date: 20241001,
      end_date: 20241007,
      recurrence: 'bi-annual',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 1,
      notes: 'Give to PFC Snuffy',
    },
    {
      name: 'Static Line Airborne Jump',
      input_id: input_id[5].id,
      audience_id: audience_id[5].id,
      start_date: 20240924,
      end_date: 20240924,
      recurrence: 'once',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 2,
      notes: 'Give to SGT Slaughter',
    },
    {
      name: 'Unit Server check',
      input_id: input_id[6].id,
      audience_id: audience_id[6].id,
      start_date: 20240814,
      end_date: 20240821,
      recurrence: 'monthly',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 3,
      notes: 'Needs to work on sec+ approved networks',
    },
    {
      name: 'Post Deployment Health assessment',
      input_id: input_id[7].id,
      audience_id: audience_id[7].id,
      start_date: 20240814,
      end_date: 20241030,
      recurrence: 'none',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 1,
      notes: 'Deployed earlier this year',
    },
    {
      name: 'Secure Network Setup',
      input_id: input_id[8].id,
      audience_id: audience_id[8].id,
      start_date: 20240820,
      end_date: 20240821,
      recurrence: 'monthly',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'Critical for upcoming missions',
    },
    {
      name: 'Night Recon Patrol',
      input_id: input_id[9].id,
      audience_id: audience_id[9].id,
      start_date: 20240822,
      end_date: 20240823,
      recurrence: 'once',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'Stealth required',
    },
    {
      name: 'Helicopter Readiness Check',
      input_id: input_id[10].id,
      audience_id: audience_id[10].id,
      start_date: 20240824,
      end_date: 20240825,
      recurrence: 'weekly',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'Prepare for high-altitude ops',
    },
    {
      name: 'Convoy Logistics Planning',
      input_id: input_id[11].id,
      audience_id: audience_id[11].id,
      start_date: 20240826,
      end_date: 20240828,
      recurrence: 'monthly',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 7,
      notes: 'Coordinate with supply units',
    },
    {
      name: 'Physical Training Schedule for Unit 11',
      input_id: input_id[12].id,
      audience_id: audience_id[12].id,
      start_date: 20240801,
      end_date: 20240831,
      recurrence: 'weekly',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'PT every Monday, Wednesday, and Friday at 0600',
    },
    {
      name: 'Chemical Warfare Drill',
      input_id: input_id[13].id,
      audience_id: audience_id[13].id,
      start_date: 20240915,
      end_date: 20240916,
      recurrence: 'quarterly',
      event_owner_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      notes: 'Mandatory for all personnel',
    },
    {
      name: 'Urban Warfare Tactics Training',
      input_id: input_id[14].id,
      audience_id: audience_id[14].id,
      start_date: 20240901,
      end_date: 20240905,
      recurrence: 'once',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 32,
      notes: 'Close-quarters combat drills in a simulated urban environment',
    },
    {
      name: 'Advanced Reconnaissance Mission Brief',
      input_id: input_id[15].id,
      audience_id: audience_id[15].id,
      start_date: 20240825,
      end_date: 20240825,
      recurrence: 'none',
      event_owner_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      notes: 'Detailed briefing on the upcoming recon mission',
    },
    {
      name: 'Leadership Development Course',
      input_id: input_id[16].id,
      audience_id: audience_id[16].id,
      start_date: 20240820,
      end_date: 20240920,
      recurrence: 'once',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 8,
      notes: 'Focus on tactical leadership skills and decision-making',
    },
    {
      name: 'Weapons Maintenance for Unit 11',
      input_id: input_id[17].id,
      audience_id: audience_id[17].id,
      start_date: 20240812,
      end_date: 20240813,
      recurrence: 'monthly',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      notes: 'Regular maintenance for all unit weapons systems',
    },
    {
      name: 'Force Protection Exercise',
      input_id: input_id[18].id,
      audience_id: audience_id[18].id,
      start_date: 20240910,
      end_date: 20240912,
      recurrence: 'once',
      event_owner_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      tag_id: 37,
      notes: 'Drills for securing critical assets and personnel',
    },
    {
      name: 'Search and Rescue Training',
      input_id: input_id[19].id,
      audience_id: audience_id[19].id,
      start_date: 20240901,
      end_date: 20240903,
      recurrence: 'once',
      event_owner_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      tag_id: 39,
      notes: 'Focus on rapid response and disaster recovery operations',
    },
    {
      name: 'Explosives Handling and Disposal Course',
      input_id: input_id[20].id,
      audience_id: audience_id[20].id,
      start_date: 20240829,
      end_date: 20240830,
      recurrence: 'none',
      event_owner_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      notes: 'Training on safely handling and disposing of explosive devices',
    },
    {
      name: 'Pathfinder Operations Training',
      input_id: input_id[21].id,
      audience_id: audience_id[21].id,
      start_date: 20240818,
      end_date: 20240820,
      recurrence: 'none',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 36,
      notes: 'Specialized training on setting up drop zones and landing sites',
    },
    {
      name: 'Emergency Evacuation Drill',
      input_id: input_id[22].id,
      audience_id: audience_id[22].id,
      start_date: 20240822,
      end_date: 20240822,
      recurrence: 'none',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 41,
      notes: 'Simulated evacuation for various emergency scenarios',
    },
    {
      name: 'Mountaineering Operations',
      input_id: input_id[23].id,
      audience_id: audience_id[23].id,
      start_date: 20240830,
      end_date: 20240902,
      recurrence: 'none',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      tag_id: 35,
      notes: 'Training in high-altitude and rugged terrain',
    },
    {
      name: 'Urban Warfare Operations',
      input_id: input_id[24].id,
      audience_id: audience_id[24].id,
      start_date: 20240820,
      end_date: 20240822,
      recurrence: 'none',
      event_owner_id: 'a46d1c98-9107-4664-bffc-a6a481efa2a6',
      tag_id: 32,
      notes: 'Focus on close-quarters combat in urban settings',
    },
    {
      name: 'Radio Communications Protocol Training',
      input_id: input_id[25].id,
      audience_id: audience_id[25].id,
      start_date: 20240821,
      end_date: 20240822,
      recurrence: 'monthly',
      event_owner_id: '0c49ad8f-a23e-4379-a926-96af872449b8',
      tag_id: 16,
      notes: 'Proper use of radio frequencies and protocols during operations',
    },
    {
      name: 'dynamic for ',
      input_id: input_id[26].id,
      audience_id: audience_id[26].id,
      start_date: 20240901,
      end_date: 20240903,
      recurrence: 'once',
      event_owner_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      tag_id: 39,
      notes: 'Focus on rapid response and disaster recovery operations',
    },
    {
      name: 'Search and Rescue Training',
      input_id: input_id[27].id,
      audience_id: audience_id[27].id,
      start_date: 20240901,
      end_date: 20240903,
      recurrence: 'once',
      event_owner_id: 'd89d71e2-4012-43f8-a324-b9bffc4edd4d',
      tag_id: 39,
      notes: 'Focus on rapid response and disaster recovery operations',
    },
  ]);
};
