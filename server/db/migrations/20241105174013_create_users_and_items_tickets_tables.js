/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Users Table
  await knex.schema.createTable("users", (table) => {
    table.string("id").primary(); // No auto-increment, id is a string
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("email").unique().notNullable();
    table.enu("role", ["Admin", "Customer", "Support"]).notNullable();
    table.string("phone").unique().notNullable();
    table.integer("isActive").defaultTo(1); // Active status (1)
    table.integer("isDeleted").defaultTo(0); // Deleted status (0)
  });

  // Items Table
  await knex.schema.createTable("items", (table) => {
    table.string("id").primary(); // No auto-increment, id is a string
    table.string("name").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.text("description").nullable();
    table.string("photo").nullable();
    table.integer("isActive").defaultTo(1); // Active status (1)
    table.integer("isDeleted").defaultTo(0); // Deleted status (0)
  });

  // Tickets Table
  await knex.schema.createTable("tickets", (table) => {
    table.string("id").primary(); // No auto-increment, id is a string
    table.string("guiId").unique();
    table
      .string("user_id") // Foreign key to users
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .string("item_id") // Foreign key to items, matching type of id in items
      .references("id")
      .inTable("items")
      .onDelete("CASCADE");
    table.enu("status", ["New", "Resolved", "Canceled"]).defaultTo("New");
    table.integer("isActive").defaultTo(1); // Active status (1)
    table.integer("isDeleted").defaultTo(0); // Deleted status (0)
    table.text("description").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("tickets");
  await knex.schema.dropTableIfExists("items");
  await knex.schema.dropTableIfExists("users");
};
