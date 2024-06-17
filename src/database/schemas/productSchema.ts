import { sqliteTable, integer, text  } from 'drizzle-orm/sqlite-core';

export const product = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  checked: integer('checked', {mode: 'boolean'}).notNull().default(false)
});