// 定义一个接口，用于限制FormList对象的具体属性
export interface FormListInter {
  type: string;
  label: string;
  prop: string;
  [key: string]: any;
}

// 定义一个接口，用于限制Form对象的具体属性
export interface FormInter {
  [key: string]: any;
}
 
// 一个自定义类型
export type FormList = Array<FormListInter>