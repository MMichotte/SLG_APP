#!/bin/bash

source .env

DB=$DB_URL

SEED_DIR='../../seeds/'

psql -d $DB -a -f "${SEED_DIR}address.sql"  >/dev/null
psql -d $DB -a -f "${SEED_DIR}user.sql" >/dev/null
psql -d $DB -a -f "${SEED_DIR}person.sql" >/dev/null
psql -d $DB -a -f "${SEED_DIR}company.sql"  >/dev/null
psql -d $DB -a -f "${SEED_DIR}product.sql" >/dev/null
psql -d $DB -a -f "${SEED_DIR}stock_update.sql" >/dev/null
psql -d $DB -a -f "${SEED_DIR}order.sql" >/dev/null
psql -d $DB -a -f "${SEED_DIR}bill_supplier.sql" >/dev/null
psql -d $DB -a -f "${SEED_DIR}product_order.sql" >/dev/null
