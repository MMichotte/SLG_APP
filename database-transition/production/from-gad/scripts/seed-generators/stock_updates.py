import os, csv, datetime
from generate_seeds import generateSeeds, FULL_PATH
from helper import getProductRefList

STOCK_UPD_CSV = f'{FULL_PATH}/../../data/csv/stock_update.csv'

PROD_REFS = getProductRefList()

columns = [ "id", "type", "quantity", "note", "createdAt", "updatedAt", "id_product" ]
  
rows = []

obj_id = 1

with open(STOCK_UPD_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    try:
      SU = [
        obj_id,
        'inventory',
        float(row[5].replace('.', '').replace(',','.')),
        '',
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        PROD_REFS.index(row[2]) + 1
      ]
      rows.append(SU)
    
      obj_id += 1
    except:
      pass

generateSeeds('stock_update', columns, rows)
  