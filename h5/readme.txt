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

SmcvScroll 上拉加载 下拉刷新
  事件 addData 上拉加载  addData(fn) fn && fn(); fn 回调必调
       resetData 下拉刷新

SmcvTextarea 去除emoji

SmcvCellInput 单行输入/展示
  v-model  String 数据
  no_data_str  数据为空展示内容
  title  title
  edit Boolean 默认 false 是否编辑
  placeholder  编辑的placeholder
  clearable 默认 true 编辑时是否可删除
  number 默认 false 编辑时是否纯数字

SmcvLongTabel 横向表格
  lt_list Array 数据
  option_list Array 配置项
  默认 [
        {name:'汇总',label:'activityDateString'}, 顶部显示名称及字段
        {name:'D90',label:'d90'},  以下每行显示名称及字段
        {name:'T60',label:'t60'},
        {name:'G10',label:'g10'},
        {name:'V80',label:'v80'},
        {name:'RV80',label:'rv80'},
      ]
  showAll Boolean 默认false 是否显示汇总

SmcvCalendar 日历
  firstCheck String newDate(yyyy/MM/dd) 初始显示日期(当天)
  showWeek Boolean false 是否按星期显示
  showPoint Boolean false 显示日期下小点
  actRange Array ['1970/1/1','2050/12/31'] 标记日期范围
  markDateMore Array [] 赋予特定日期其他calss
    [{className:'is_write',date:'2019/01/10'}]
  sundayStart Boolean true 是否周日第一天
  loading Boolean false 点击日期加载 与load事件一起使用
  事件 choseDay 点击日期item触发 传出date
      load loading为true点击触发 load(data,reslove) reslove支持异步，必调
