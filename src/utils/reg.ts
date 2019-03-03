const regs = {
  // 用户名应为4到16位（字母，数字，-，_）
  username: /^[a-zA-Z0-9_-]{4,16}$/,
  // '密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
  password: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?]).*$/,
  id: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
  email: /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i,
  mobile: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
  tel: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
  ipv4: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  md5: /^[a-zA-Z0-9]{32}$/,
  domain: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/,
  imei: /^[0-9]{15}$/,
  number: /^[0-9]*$/,
  domainfix: /([a-z]{2,6})$/,
  url: /^((https|http):\/\/)?(((([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5])[.]{1}){3}([0-9]|1[0-9]{2}|[1-9][0-9]|2[0-4][0-9]|25[0-5]))|([0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D-]+[.]{1})+[a-zA-Z-]+)(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?){1}/,
  label: /^[a-zA-Z0-9\u4e00-\u9fa5\-_]+$/,
  require: (v:any) => v,
  max: (v:number, m:number) => (v <= m),
  min: (v:number, m:number) => (v >= m),
  rang: (v:number, rangExp:string) => {
    const resReg = rangExp.match(/(\(|\[)(\d+),(\d+)(\)|\])/)
    // tslint:disable-next-line:curly
    if (!resReg) return false 
    const [, left, x, y, right] = [...resReg]
    const xn = Number(x)
    const yn = Number(y)
    return (left === '(' ? xn > v : xn >= v ) && (right === ')' ? yn > v : yn >= v)  
  } 
}

const validateErrorMsg = {
  userId: '用户名应为4到16位（字母、数字、-、_)',
  password: '密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
  tel: '请输入正确的手机号',
  require: '不能为空',
  default: '输入格式有误',
  min: '最大值',
  rang: '值应该在$1-$2之间'
}

const validateFor = (value: any, type: string|string[]):any => {
  const typeStrArr = Array.isArray(type) ? type : [type]
  const regType2argsArr = typeStrArr.filter(str => str).map(typestr => {
    const res:any = typestr.split('|')
    res[1] = res[1] ? res[1].split(',') : []
    return res 
  })
  console.log(regType2argsArr)
  const errOne = regType2argsArr.find(([regType, args]) => !(typeof regs[regType] === 'function' ? regs[regType].call(null, value, ...args) : regs[regType].test(value)))
  if (errOne) {
    let errMsg = validateErrorMsg[errOne[0]] || validateErrorMsg.default
    if (errOne[1].length) {
      const args = errOne[1]
      errMsg = errMsg.replace('$0', value).replace('$1', args[0]).replace('$2', args[1])
    }
    return errMsg 
  }
}
export {
  validateFor
}