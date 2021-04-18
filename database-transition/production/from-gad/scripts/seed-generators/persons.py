import os, csv, datetime
from generate_seeds import generateSeeds, FULL_PATH

CLIENTS_CSV = f'{FULL_PATH}/../../data/csv/clients.csv'


columns = [ "id", "civility", "first_name", "last_name", "email", "phone", "mobile", "vat_num", "createdAt", "updatedAt", "id_address" ]
  
rows = []

unique_refs = []

obj_id = 1

with open(CLIENTS_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    if row[0] == '':
      email = f'change.this@fakemail{obj_id}.com'
      if row[10] != '' and row[10] not in unique_refs:
        email = row[10]
        unique_refs.append(email)

      person = [
        obj_id,
        'Mr.',
        row[3] if row[3] != '' else 'UNKNOWN',
        row[2] if row[2] != '' else 'UNKNOWN',
        email,
        row[7],
        row[8],
        row[11],
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        obj_id,
      ]
      rows.append(person)
    
    obj_id += 1

generateSeeds('person', columns, rows)
  