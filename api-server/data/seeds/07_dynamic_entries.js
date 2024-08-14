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
      notes: 'give to PFC Snuffy',
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
      notes: 'needs to work on sec+ approved networks',
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
  ]);
};
