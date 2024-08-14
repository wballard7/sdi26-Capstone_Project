
//get all units from sent id and down
app.get('/units/related/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const units = await knex.raw(
      `
            WITH RECURSIVE UnitHierarchy AS (
                SELECT id, unit_name, higher_unit
                FROM units
                WHERE id = ?

                UNION ALL

                SELECT u.id, u.unit_name, u.higher_unit
                FROM units u
                INNER JOIN UnitHierarchy uh ON u.parent = uh.id
            )
            SELECT *
            FROM UnitHierarchy
            ORDER BY level DESC;
        `,
      [id],
    );

    res.json(units.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch related units' });
  }
});
