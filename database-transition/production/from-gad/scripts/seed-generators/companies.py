import os, csv, datetime
from generate_seeds import generateSeeds, FULL_PATH

CLIENTS_CSV = f'{FULL_PATH}/../../data/csv/clients.csv'
SUPPLIERS_CSV = f'{FULL_PATH}/../../data/csv/suppliers.csv'

columns = [ "id", "type", "name", "email", "vat_num", "phone_1", "phone_2", "mobile", "website", "createdAt", "updatedAt", "id_person", "id_address" ]
  
rows = []

unique_refs = []

row_id = 1
obj_id = 1

with open(CLIENTS_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    if row[0] != '':
      email = f'change.this@fakemail{obj_id}.com'
      if row[10] != '' and row[10] not in unique_refs:
        email = row[10]
        unique_refs.append(email)
      company = [
        obj_id,
        'C',
        row[0],
        email,
        row[11],
        row[7],
        '',
        row[8],
        '',
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        '',
        row_id
      ]
      rows.append(company)
      obj_id += 1
    row_id += 1

with open(SUPPLIERS_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    if row[0] != '':
      email = f'change.this@fakemail{obj_id}.com'
      if row[10] != '' and row[10] not in unique_refs:
        email = row[10]
        unique_refs.append(email)
      company = [
        obj_id,
        'S',
        row[0],
        email,
        row[14],
        row[7],
        '',
        row[8],
        row[17],
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        '',
        row_id
      ]
      rows.append(company)
      obj_id += 1
    row_id += 1

generateSeeds('company', columns, rows)
  