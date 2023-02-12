CREATE TABLE "options" (
	"uid"	TEXT NOT NULL,
	"sso"	TEXT NOT NULL,
	"type"	TEXT NOT NULL,
	"option"	TEXT
);
PRAGMA database_list;
SELECT type,name,sql,tbl_name FROM "main".sqlite_master;