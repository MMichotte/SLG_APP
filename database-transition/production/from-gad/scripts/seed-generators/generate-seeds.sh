#!/bin/bash

python3 addresses.py 
if [ $? -eq 0 ]; then echo 'addresses ok'; fi
python3 persons.py
if [ $? -eq 0 ]; then echo 'persons ok'; fi
python3 companies.py 
if [ $? -eq 0 ]; then echo 'companies ok'; fi
python3 products.py
if [ $? -eq 0 ]; then echo 'products ok'; fi
python3 stock_updates.py
if [ $? -eq 0 ]; then echo 'stock_updates ok'; fi 
python3 product_orders.py
if [ $? -eq 0 ]; then echo 'product_orders ok'; fi