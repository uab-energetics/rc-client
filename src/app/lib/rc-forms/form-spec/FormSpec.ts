interface PcAbstractControl {
  type: 'number' | 'text' | 'select' | 'multi-select' | 'group'
  title: string
  prompt: string
}

interface PcGroupControl extends PcAbstractControl {
  list?: boolean
  fields: {
    [key: string]: PcGroupControl | PcFormControl
  }
}

interface PcFormControl extends PcAbstractControl {

  // type = 'select' | 'multi-select' | 'radio-button'
  choices?: { value: any, name: string }[]

  // type = 'text'
  placeholder?: string

  // type = 'number'
  min?: number
  max?: number
}

interface Codebook {
  root: PcGroupControl | PcFormControl
}


export { Codebook }
