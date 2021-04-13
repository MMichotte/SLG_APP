export function search(array: any[], properties: string[], input: string, maxLen: number = 200): any[] {
  let words: string[] = input.split(' ');
  words = words?.filter(w => w.length > 1);

  const filteredArray: any[] = array?.filter(
    (el: any) => { 
      for (const word of words) {
        let attribute: any = el;
        properties.forEach(prop => {
          attribute = attribute[prop];
        });
        if (!attribute.toLowerCase().includes(word.toLowerCase())) {
          return false;
        }
      };
      return true;
    }
  ).slice(0, maxLen);

  return filteredArray;

} 
