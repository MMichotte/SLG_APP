
NUMBER_OF_PRODS_TO_EXTRACT = 0 # 0 = all 
MAX_PROD_PER_FILE = 5000

with open('./Parts_database.txt','r') as file:
    products = file.readlines()
    file.close()

usedIds = []

fileCount = 0

while True:
    count = 0
    productsJson: str = "/* eslint-disable quotes */\nimport { CreateProductDTO } from '../../../src/modules/products/dto/create-product.dto';\n\nexport const ProductSeed_" + str(fileCount) +": CreateProductDTO[] = [\n"

    for product in products:
        if count >= NUMBER_OF_PRODS_TO_EXTRACT and NUMBER_OF_PRODS_TO_EXTRACT != 0:
            break
        if count >= MAX_PROD_PER_FILE:
            break

        prodId = product.split(';')[0].strip()
        if prodId not in usedIds:
            usedIds.append(prodId)
            prodName = product.split(';')[1].strip()
            if prodId != '' and prodName != '':
                productsJson += '\t{\n'
                productsJson += '\t\treference: \"' + prodId + '\",\n'
                productsJson += '\t\tlabel: \"' + prodName + '\",\n'
                productsJson += '\t\tpurchasePriceHT: ' + str(0.0) + ',\n'
                productsJson += '\t\tsalePriceHT: ' + str(0.0) + ',\n'
                productsJson += '\t\tsalePriceTTC: ' + str(0.0) + ',\n'
                productsJson += '\t\tquantity: ' + str(0) + ',\n'
                productsJson += '\t\tnote: \'\'\n'
                productsJson += '\t},\n'

        count += 1

    productsJson = productsJson.rstrip(',\n')
    productsJson += '\n]\n'

    fileName = 'product.seed.' + (str(NUMBER_OF_PRODS_TO_EXTRACT) if NUMBER_OF_PRODS_TO_EXTRACT !=0 else 'all') + '_' + str(fileCount) + '.ts'

    with open('./seeds/' + fileName,'w') as file:
        file.write(productsJson)
        file.close()
    
    fileCount += 1

    productsLeft = products[count:-1]
    products = productsLeft
    if len(products) == 0:
        break
