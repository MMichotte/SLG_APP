import os, csv, datetime
from generate_seeds import generateSeeds, FULL_PATH

PRODUCTS_CSV = f'{FULL_PATH}/../../data/csv/products_current.csv'

columns = [ "id", "reference", "label", "purchase_price_HT", "sale_price_HT", "quantity", "note", "createdAt", "updatedAt" ]
  
rows = []

obj_id = 1

unique_refs = []

with open(PRODUCTS_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    if row[0] != '' and row[1] != '' and row[0] not in unique_refs:
      unique_refs.append(row[0])
      product = [
        obj_id,
        row[0],
        row[1],
        float(row[6].strip(' €').replace('.', '').replace(',','.')),
        float(row[8].strip(' €').replace('.', '').replace(',','.')),
        float(row[14].replace('.', '').replace(',','.')) if row[14] != '' else 0 ,
        row[13],
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      ]
      rows.append(product)
      obj_id += 1

generateSeeds('product', columns, rows)
  