import { MessageBox } from 'element-ui'

/**
 * 二次确认弹窗装饰器
 * @param message
 * @param title
 * @returns {function(*, *, *): *}
 */
export const confirm = function (message: string = '确认删除？', title: string = '提示') {
  return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
    const oldValue = descriptor.value
    descriptor.value = function (...args: any) {
      MessageBox.confirm(message, title)
        .then((oldValue as any).bind(this, ...args))
        .catch(error => {
          console.log('e', error)
        })
    }
    return descriptor
  }
}
