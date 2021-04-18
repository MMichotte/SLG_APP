import os, csv, json, re

FULL_PATH = os.path.dirname(os.path.realpath(__file__))

def fromatData(x): 
  if x == '':
    return 'null'
  elif isinstance(x, int):
    return f'{x}'
  elif isinstance(x, float):
    return f'{x}'
  elif isinstance(x, str):
    x = x.replace('"', '')
    x = x.replace('\n', '')
    x = x.replace('\'', '\'\'')
    return f'\'{x}\''

def generateSeeds(table_name, table_columns, table_rows):

  outputFile = f'{FULL_PATH}/../../../seeds/{table_name}'
  
  file_content = f'INSERT INTO public.{table_name}\n\t('

  for col in table_columns:
    file_content += f'\"{col}\", '
  
  file_content = file_content.strip(', ')
  file_content += f') \nVALUES \n'

  for row in table_rows:
    row_str = map(fromatData, row)
    row_joined = ', '.join(row_str)
    file_content += f'\t({row_joined}),\n'
  
  file_content = file_content.strip(',\n') + ';\n'

  file_content += f'\nselect setval(\'{table_name}_id_seq\', (select max(id) from public.{table_name}));'

  with open(f'{outputFile}.sql', 'w') as file:
    file.write(file_content)
    file.close()
