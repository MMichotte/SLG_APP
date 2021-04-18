import os, csv, datetime
from generate_seeds import generateSeeds, FULL_PATH
from helper import getProductRefList, getSupplierRefList


# code, designation, N° de doc, date, sociéte, nom, prix, quant 


"""
generer commandes -> par fournisseur et date 
generer product-orders associé aux commandes 
"""


ORDER_CSV = f'{FULL_PATH}/../../data/csv/products_ordered.csv'

PROD_REFS = getProductRefList()
SUPPLIER_REFS = getSupplierRefList()

ordered_products = []
with open(ORDER_CSV, encoding='utf8', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';')
  next(reader) # skip header
  for row in reader:
    date = row[3].split('/')
    try:
      OP = {}
      OP['product_id'] = PROD_REFS.index(row[0]) + 1
      OP['created_at'] = datetime.datetime(int(date[2]),int(date[1]),int(date[0]))
      OP['supplier'] = SUPPLIER_REFS.index(row[4]) + 1
      OP['price'] = float(row[6].strip(' €').replace('.', '').replace(',','.'))
      OP['quant'] = float(row[7].replace('.', '').replace(',','.'))
      
      ordered_products.append(OP)
      
    except:
      pass

sorted_ordered_products = sorted(ordered_products, key = lambda x: (x['supplier'], x['created_at']))


order_columns = [ "id", "id_company", "status", "createdAt", "updatedAt" ]
orders = []
order_id = 1

bill_supp_columns = [ "id", "invoice_number", "shipping_fees", "debited_amount", "note", "createdAt", "updatedAt" ]
bills = []

order_prod_columns = [ "id", "id_product", "id_order", "note", "quantity_ordered", 'quantity_received',
  "pc_invoice_price", "pc_purchase_price_HT_at_date", "status", "id_bill_supplier", "createdAt", "updatedAt" ]
order_prods = []
order_prods_id = 1

prev_supplier = sorted_ordered_products[0]['supplier']
prev_date = sorted_ordered_products[0]['created_at']
order = [
  order_id,
  prev_supplier,
  'Closed',
  prev_date.strftime('%Y-%m-%d %H:%M:%S'),
  prev_date.strftime('%Y-%m-%d %H:%M:%S')
]
orders.append(order)

for op in sorted_ordered_products:
  if (op['supplier'] != prev_supplier or op['created_at'] != prev_date):
    order_id += 1
    order = [
      order_id,
      op['supplier'],
      'Closed',
      op['created_at'].strftime('%Y-%m-%d %H:%M:%S'),
      op['created_at'].strftime('%Y-%m-%d %H:%M:%S')
    ]
    orders.append(order)
    
    bill_amount = 0
    for o in order_prods:
      if o[2] == order_id -1:
        bill_amount += o[6]

    bill_supp = [
      order_id - 1,
      '',
      0,
      bill_amount,
      '',
      op['created_at'].strftime('%Y-%m-%d %H:%M:%S'),
      op['created_at'].strftime('%Y-%m-%d %H:%M:%S')
    ]
    bills.append(bill_supp)
  else:
    pass

  order_prod = [
    order_prods_id,
    op['product_id'],
    order_id,
    '',
    op['quant'],
    op['quant'],
    op['price'],
    op['price'],
    'Received',
    order_id,
    op['created_at'].strftime('%Y-%m-%d %H:%M:%S'),
    op['created_at'].strftime('%Y-%m-%d %H:%M:%S')
  ]
  order_prods_id += 1
  order_prods.append(order_prod)

  prev_supplier = op['supplier']
  prev_date = op['created_at']

bill_amount = 0
for o in order_prods:
  if o[2] == order_id:
    bill_amount += o[6]

bill_supp = [
  order_id,
  '',
  0,
  bill_amount,
  '',
  op['created_at'].strftime('%Y-%m-%d %H:%M:%S'),
  op['created_at'].strftime('%Y-%m-%d %H:%M:%S')
]
bills.append(bill_supp)

generateSeeds('order', order_columns, orders)
generateSeeds('bill_supplier', bill_supp_columns, bills)
generateSeeds('product_order', order_prod_columns, order_prods)
