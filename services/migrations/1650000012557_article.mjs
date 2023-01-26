import { Kysely, sql } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("article")
    .addColumn("articleID", "text", col => col.primaryKey())
    .addColumn("title", "text", col => col.notNull())
    .addColumn("url", "text", col => col.notNull())
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("article").execute();
}
