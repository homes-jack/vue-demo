<template>

</template>

<script>
export default {
  name: "indexedDB",

  data() {
    return {
      db:{
        name:"test",
        version:1,
        stores:{
          name:"person"
        }
      },
      request:{}
    };
  },
  created() {
    this.open();
  },
  methods:{
    open(){
      this.request = window.indexedDB.open(this.db.name,this.db.version);
      this.request.onerror = this.open_err;
      this.request.onsuccess = this.open_success;
      this.request.onupgradeneeded = this.open_upgradeneeded;
    },
    open_success(e){
      let db = e.target.result;
      console.log("数据库创建成功");
      this.create_store(db);
      // this.add(db);
      // this.get(db);
      // this.get_all(db);
      // this.update(db)
    },
    open_upgradeneeded(e){ //数据库升级、新增触发
      console.log("数据库升级成功");
      let db = e.target.result;
      this.create_store(db);
    },
    open_err(e){
      console.log("数据库打开错误");
      alert("请在最新版谷歌浏览器打开")
    },
    //创建表
    create_store(db){
      if(db.objectStoreNames.contains(this.db.stores.name)) return;
      //创建person表 主键为id { keyPath: 'id' }
      let object_store = db.createObjectStore(this.db.stores.name,{
        // autoIncrement: true //自动生成主键
        keyPath: 'id'
      });
      //createIndex 三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值
      object_store.createIndex("name","name",{unique:true});
      object_store.createIndex("pass_word","pass_word",{unique:true});
    },
    //创建事务
    create_transaction(db,store='person',mode="readwrite"){
      return db.transaction(Array.from(db.objectStoreNames),mode).objectStore(store)
    },
    //新增
    add(db,store='person',data={id:2,name:'name2',pass_word:'pass_word2'}){
      console.log(db);
      return new Promise((reslove,rej)=>{
        let request = this.create_transaction(db,store).add(data);
        request.onsuccess = function (e) {
          console.log("数据写入成功");
          reslove(e)
        }
        request.onerror = function (e) {
          console.log("数据写入失败",e);
          rej(e);
        }
      })
    },
    //读取  get只取一条数据
    get(db,store='person') {
      return new Promise((reslove,rej)=>{
        let request = this.create_transaction(db,store).get(1) // 1 ==> 表主键对应值 get只取一条数据
        //使用索引检索
        // request = this.create_transaction(db,store).index('name').get('test11');
        // request.onsuccess = function(e){
        //   console.log(e.target.result);
        //   if(e.target.result){

        //   }else {

        //   }
        // }

        request.onsuccess = function (e) {
          if(request.result) {
            console.log("result",request.result);
            reslove(request.result)
          }else {
            rej(e)
          }
        };
        request.onerror = function (e) {
          rej(e);
        };
      })
    },
    //遍历数据
    get_all(db,store="person"){
      return new Promise((reslove,rej)=>{
        let request = this.create_transaction(db,store).openCursor();
        let out_arr = [];
        request.onsuccess = function (e){
          let cursor = e.target.result;
          if(cursor) {
            console.log("cursor",cursor);
            out_arr.push(cursor.value);
            cursor.continue();
          }else {
            console.log("done",out_arr);
            reslove(out_arr);
          }
        };
        request.onerror = function (e) {
          rej(e);
        };
      })
    },
    //更新数据
    update(db,store='person',data={id:1,name:'test11',pass_word:'pass1'}){
      return new Promise((reslove,rej)=>{
        let request = this.create_transaction(db,store).put(data);
        request.onsuccess = function(e) {
          console.log("数据更新成功");
          reslove(e)
        };
        request.onerror = function(e) {
          console.log("数据更新失败");
          rej(e)
        };
      })
    },
    //删除数据
    delete(db,store='person',key=1){
      return new Promise((reslove,rej)=>{
        let request = this.create_transaction(db,store).delete(key) //主键
        request.onsuccess = function (e) {
          reslove(e)
        };
        request.onerror = function (e) {
          rej(e)
        };
      })
    },
  },

};
</script>

<style lang="scss">
body {
  background: black;

}
</style>