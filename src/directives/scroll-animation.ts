import { DirectiveOptions } from 'vue'

const directive: DirectiveOptions = {
  inserted(el, binding: any) {
    // 聚焦元素
    binding.addClass = () => {
      const { top } = el.getBoundingClientRect()
      const h = document.documentElement.clientHeight || document.body.clientHeight
      if (top < h) {
        if (el.className.indexOf(binding.value) == -1) {
          // 下面单引号中间是一个空格
          el.className += ` ${binding.value}`
        }
        if (binding.addClass) {
          window.removeEventListener('scroll', binding.addClass)
        }
      }
    }
    window.addEventListener('scroll', binding.addClass, true)
    binding.addClass()
  },
  unbind(el, binding: any) {
    if (binding.addClass) {
      window.removeEventListener('scroll', binding.addClass)
    }
  }
}

export default directive
