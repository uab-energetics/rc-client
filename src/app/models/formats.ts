export const RESPONSE_FORMATS = {
  TEXT: 'txt',
  NUMBER: 'num',
  BOOLEAN: 'boo',
  MULTI_SELECT: 'multi-sel',
  SELECT: 'sel',
  NOT_REPORTED: 'not-reported'
};

export function propName( type: string ){
  switch(type){
    case RESPONSE_FORMATS.TEXT: return 'txt';
    case RESPONSE_FORMATS.NUMBER: return 'num';
    case RESPONSE_FORMATS.BOOLEAN: return 'boo';
    case RESPONSE_FORMATS.SELECT: return 'sel';
    case RESPONSE_FORMATS.MULTI_SELECT: return 'selections';
    default: return null;
  }
}
