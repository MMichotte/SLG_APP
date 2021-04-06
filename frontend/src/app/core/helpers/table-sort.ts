import { SortEvent } from 'primeng/api';

export function tableSort(event: SortEvent) {
  // event.data = Data to sort
  // event.mode = 'single' or 'multiple' sort mode
  // event.field = Sort field in single sort
  // event.order = Sort order in single sort
  // event.multiSortMeta = SortMeta array in multiple sort

  event.data.sort((data1, data2) => {
    const value1 = data1[event.field];
    const value2 = data2[event.field];
    let result = null;

    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  
    if (value1 == null && value2 != null) result = -1;
    else if (value1 != null && value2 == null) result = 1;
    else if (value1 == null && value2 == null) result = 0;
    else if (dateRegex.test(value1) && dateRegex.test(value2)) {
      const d1 = new Date(value1.split('/')[2], value1.split('/')[1], value1.split('/')[0]); 
      const d2 = new Date(value2.split('/')[2], value2.split('/')[1], value2.split('/')[0]); 
      if (d1 === d2) result = 0;
      else result = (d1 > d2) ? 1 : -1;
    } else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
    else result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
    
    return (event.order * result);
  });
}
