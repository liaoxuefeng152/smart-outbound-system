import { pgTable, serial, timestamp, varchar, boolean, integer, jsonb, text, uuid, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 用户扩展表（扩展 auth.users）
export const profiles = pgTable(
	"profiles",
	{
		id: uuid("id").primaryKey().default(sql`auth.uid()`),
		role: varchar("role", { length: 20 }).notNull().default("operator"), // admin, operator, viewer
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [index("profiles_id_idx").on(table.id)]
);

// AI话术场景表
export const scriptScenarios = pgTable(
	"script_scenarios",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		name: varchar("name", { length: 100 }).notNull(),
		instance_id: varchar("instance_id", { length: 100 }).notNull(),
		script_id: varchar("script_id", { length: 100 }).notNull(),
		opening_script: text("opening_script").notNull(),
		common_qa: jsonb("common_qa"),
		ending_script: text("ending_script").notNull(),
		status: varchar("status", { length: 20 }).notNull().default("active"), // active, inactive
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [
		index("script_scenarios_status_idx").on(table.status),
		index("script_scenarios_created_at_idx").on(table.created_at)
	]
);

// 客户号码表
export const customers = pgTable(
	"customers",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		phone: varchar("phone", { length: 20 }).notNull().unique(),
		name: varchar("name", { length: 50 }),
		remark: text("remark"),
		source_channel: varchar("source_channel", { length: 100 }),
		call_status: varchar("call_status", { length: 20 }).notNull().default("pending"), // pending, calling, connected, not_connected, completed
		last_call_time: timestamp("last_call_time", { withTimezone: true }),
		intention_tag: varchar("intention_tag", { length: 20 }), // high_intention, watching, no_intention, invalid
		is_blacklisted: boolean("is_blacklisted").notNull().default(false),
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [
		index("customers_phone_idx").on(table.phone),
		index("customers_call_status_idx").on(table.call_status),
		index("customers_intention_tag_idx").on(table.intention_tag),
		index("customers_is_blacklisted_idx").on(table.is_blacklisted),
		index("customers_created_at_idx").on(table.created_at)
	]
);

// 黑名单表
export const blacklist = pgTable(
	"blacklist",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		phone: varchar("phone", { length: 20 }).notNull().unique(),
		reason: text("reason").notNull(),
		operator_id: uuid("operator_id").notNull().references(() => profiles.id),
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [
		index("blacklist_phone_idx").on(table.phone),
		index("blacklist_operator_id_idx").on(table.operator_id),
		index("blacklist_created_at_idx").on(table.created_at)
	]
);

// 外呼任务表
export const tasks = pgTable(
	"tasks",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		name: varchar("name", { length: 100 }).notNull(),
		script_scenario_id: uuid("script_scenario_id").notNull().references(() => scriptScenarios.id),
		call_mode: varchar("call_mode", { length: 20 }).notNull().default("auto"), // auto, predictive
		allowed_time_start: varchar("allowed_time_start", { length: 10 }).notNull(), // "09:00"
		allowed_time_end: varchar("allowed_time_end", { length: 10 }).notNull(), // "18:00"
		retry_count: integer("retry_count").notNull().default(0),
		call_interval: integer("call_interval").notNull().default(60), // 秒
		total_numbers: integer("total_numbers").notNull().default(0),
		called_count: integer("called_count").notNull().default(0),
		connected_count: integer("connected_count").notNull().default(0),
		intention_count: integer("intention_count").notNull().default(0),
		status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, executing, paused, completed, terminated, failed
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [
		index("tasks_script_scenario_id_idx").on(table.script_scenario_id),
		index("tasks_status_idx").on(table.status),
		index("tasks_created_at_idx").on(table.created_at)
	]
);

// 任务号码关联表（多对多）
export const taskNumbers = pgTable(
	"task_numbers",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		task_id: uuid("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
		customer_id: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
		status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, calling, connected, not_connected
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [
		index("task_numbers_task_id_idx").on(table.task_id),
		index("task_numbers_customer_id_idx").on(table.customer_id),
		index("task_numbers_status_idx").on(table.status)
	]
);

// 通话记录表
export const callRecords = pgTable(
	"call_records",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		task_id: uuid("task_id").references(() => tasks.id),
		phone: varchar("phone", { length: 20 }).notNull(),
		customer_name: varchar("customer_name", { length: 50 }),
		source_channel: varchar("source_channel", { length: 100 }),
		call_status: varchar("call_status", { length: 20 }).notNull(), // connected, not_connected, failed
		call_duration: integer("call_duration").notNull().default(0), // 秒
		intention_tag: varchar("intention_tag", { length: 20 }),
		recording_url: text("recording_url"),
		transcript_text: text("transcript_text"),
		call_time: timestamp("call_time", { withTimezone: true }).defaultNow().notNull(),
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [
		index("call_records_task_id_idx").on(table.task_id),
		index("call_records_phone_idx").on(table.phone),
		index("call_records_call_status_idx").on(table.call_status),
		index("call_records_intention_tag_idx").on(table.intention_tag),
		index("call_records_call_time_idx").on(table.call_time)
	]
);

// 系统配置表
export const systemConfig = pgTable(
	"system_config",
	{
		id: serial().primaryKey(),
		aliyun_access_key_id: varchar("aliyun_access_key_id", { length: 100 }).notNull(),
		aliyun_access_key_secret: varchar("aliyun_access_key_secret", { length: 100 }).notNull(),
		aliyun_main_phone: varchar("aliyun_main_phone", { length: 20 }).notNull(),
		callback_url: varchar("callback_url", { length: 200 }).notNull(),
		timeout: integer("timeout").notNull().default(30),
		retry_count: integer("retry_count").notNull().default(3),
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	}
);

// 操作日志表
export const operationLogs = pgTable(
	"operation_logs",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		operator_id: uuid("operator_id").notNull().references(() => profiles.id),
		action: varchar("action", { length: 50 }).notNull(), // login, create_task, import_numbers, modify_config, delete_data
		action_detail: text("action_detail"),
		ip_address: varchar("ip_address", { length: 50 }),
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [
		index("operation_logs_operator_id_idx").on(table.operator_id),
		index("operation_logs_action_idx").on(table.action),
		index("operation_logs_created_at_idx").on(table.created_at)
	]
);