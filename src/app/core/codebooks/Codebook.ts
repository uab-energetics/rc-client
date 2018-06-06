export interface Choice {
  value: string
  displayName: string
}

export interface Type {
  [propName: string]: {
    format: Type | string        // 'text' | 'number' | 'select' | 'list'
    prompt: string
    hovertip?: string
    items?: Type | string  // for type='list'. 'string' value defaults to a Type object with only the 'format' attribute defined
    options?: (string | Choice)[] // for type='select'|'multi-select'
  } | string // string here would specify the key of another type
}

export interface Codebook {
  key: string
  version: string
  spec: {
    [typeKey: string]: Type
  }
}
