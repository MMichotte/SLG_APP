import os, csv, datetime
from generate_seeds import generateSeeds, FULL_PATH

def getProductRefList():
  PRODUCTS_CSV = f'{FULL_PATH}/../../data/csv/products_current.csv'

  refs = []

  obj_id = 1

  unique_refs = []

  with open(PRODUCTS_CSV, encoding='utf8', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    next(reader) # skip header
    for row in reader:
      if row[0] != '' and row[1] != '' and row[0] not in unique_refs:
        unique_refs.append(row[0])
        refs.append(row[0])
        obj_id += 1
  
  return refs
  

def getSupplierRefList():
  CLIENTS_CSV = f'{FULL_PATH}/../../data/csv/clients.csv'
  SUPPLIERS_CSV = f'{FULL_PATH}/../../data/csv/suppliers.csv'
    
  refs = []
  
  row_id = 1
  obj_id = 1

  with open(CLIENTS_CSV, encoding='utf8', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    next(reader) # skip header
    for row in reader:
      if row[0] != '':
        refs.append(row[0])
        obj_id += 1
      row_id += 1

  with open(SUPPLIERS_CSV, encoding='utf8', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    next(reader) # skip header
    for row in reader:
      if row[0] != '':
        refs.append(row[0])
        obj_id += 1
      row_id += 1

  return refs