module.exports = {
  printWidth: 200,

  tabWidth: 2, // tab缩进大小,默认为2

  useTabs: false, // 使用tab缩进，默认false

  semi: false, // 语句末尾加分号, 默认true

  singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)

  quoteProps: 'as-needed',

  jsxSingleQuote: true, // 在JSX中使用单引号, 默认false

  trailingComma: 'none', // 行尾逗号,默认es5(2.0.0),可选 none|es5|all

  bracketSpacing: true, // 对象中的空格 默认true

  jsxBracketSameLine: false, // JSX标签闭合位置 默认false

  arrowParens: 'avoid', // 箭头函数参数括号 默认always 可选 avoid| always

  vueIndentScriptAndStyle: false, // 是否缩进Vue文件中的<script>和<style>标记内的代码，默认false

  htmlWhitespaceSensitivity: 'ignore', // 修复 vue template 中的结束标签结尾尖括号掉到下一行的问题

  endOfLine: 'lf' // 默认lf，可选 lf|crlf|cr|auto
}
