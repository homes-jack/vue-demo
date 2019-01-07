SmcvInputPop  弹窗选择框
  事件 sendDate 发出选择的数据
  title title
  type  radio  单选列表
        checkbox 多选
        date  日期选择
        cascading  级联选择
  option 渲染data的键名
          默认 {
            id: "code",
            label: "codeName",
            children: "children"
          }
  data  数据  type=date 不用传
              type=cascading 树形结构
  default 初始值  ''为空
  v-model  弹窗显示
  lazy Boolean 默认 true  懒加载只在type=cascading作用
               与loading事件搭配
  loading 事件 loading(node,reslove) 支持异步
      setTimeout(() => {
        reslove(data<Array>);
      }, 800);
  disabled  只在type=cascading作用 该级联项是否可选
