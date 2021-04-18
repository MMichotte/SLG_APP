import os, csv, datetime
from generate_seeds import generateSeeds, FULL_PATH

CLIENTS_CSV = f'{FULL_PATH}/../../data/csv/clients.csv'
SUPPLIERS_CSV = f'{FULL_PATH}/../../data/csv/suppliers.csv'

columns = [ "id", "country", "city", "zip_code", "street_address", "createdAt", "updatedAt" ]
  
rows = []

obj_id = 1

with open(CLIENTS_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    address = [
      obj_id,
      'Belgium',
      row[6] if row[6] != '' else '-',
      row[5] if row[5] != '' else '-',
      row[4] if row[4] != '' else '-',
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    ]
    rows.append(address)
    obj_id += 1

with open(SUPPLIERS_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    address = [
      obj_id,
      'Belgium',
      row[6] if row[6] != '' else '-',
      row[5] if row[5] != '' else '-',
      row[4] if row[4] != '' else '-',
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    ]
    rows.append(address)
    obj_id += 1

generateSeeds('address', columns, rows)
  