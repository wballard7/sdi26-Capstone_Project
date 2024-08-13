/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('units', table => {
        table.increments('id').primary();
        table.string('unit_name').notNullable();
      });
   
    //   units				
    //   id	level	level	    unit	        parent
    //   1	1	not assigned	not assigned	7
    //   2	1	not assigned	not assigned	7
    //   3	2	    squad	        1st	        6
    //   4	2	    squad	        2nd         6
    //   5	3	    platoon	        yellow      7
    //   6	4	    company	        Aco	        8
    //   7	4	    company	        Bco	        8
    //   8	5	    bat	            300	        9
    
      
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('units');
};
