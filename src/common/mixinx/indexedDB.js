export default {
  methods: {
    db_open() {
      let _this = this;
      return new Promise((reslove,rej)=>{
        let request = window.indexedDB.open(this.db.name, this.db.version);
        request.onerror = function(e){
          console.log("数据库打开错误");
          alert("请在最新版谷歌浏览器打开");
          rej(e)
        };
        request.onsuccess = function(e) {
          _this.db_store = e.target.result;
          console.log("数据库创建成功");
          reslove(e);
        };
        request.onupgradeneeded = function(e) {
          _this.db_store = e.target.result;
          _this.db_create_store();
        };
      })
    },
    db_create_store() { //创建表
      let db = this.db_store;
      this.db.stores.forEach(store=>{
        if (db.objectStoreNames.contains(store.name)) return;
        let object_store = db.createObjectStore(store.name,{keyPath: 'id'});
        Object.keys(store.keys).forEach(key=>{
          object_store.createIndex(key, key, {
            unique: store.keys[key]
          });
        })
      })
    },
    db_create_transaction(db, store = 'person', mode = "readwrite") { //创建事务
      return db.transaction(store, mode).objectStore(store)
    },
    //新增
    db_add(store='person',data={id:2,name:'name2',pass_word:'pass_word2'}){
      let db = this.db_store;
      data.id = new Date().getTime();
      return new Promise((reslove,rej)=>{
        let request = this.db_create_transaction(db,store).add(data);
        request.onsuccess = function (e) {
          reslove(e)
        }
        request.onerror = function (e) {
          rej(e);
        }
      })
    },
    //更新数据 data必须包涵id
    db_update(store = 'person', data = {
        id: 1,
        name: 'test11',
        pass_word: 'pass1'
      }) {
      let db = this.db_store;
      return new Promise((reslove,rej)=>{
        if(!data.id) {
          rej("data必须包涵id");
          return;
        }
        let request = this.db_create_transaction(db,store).put(data);
        request.onsuccess = function(e) {
          reslove(e)
        };
        request.onerror = function(e) {
          rej(e)
        };
      })
    },
    db_delete(store = 'person', key = 1) {
      let db = this.db_store;
      return new Promise((reslove, rej) => {
        let request = this.db_create_transaction(db, store).delete(key) //主键
        request.onsuccess = function (e) {
          reslove(e)
        };
        request.onerror = function (e) {
          rej(e)
        };
      })
    },
    db_query_data_by_options(store = "person", option = {},page={}) {
      let db = this.db_store;
      let _this = this;
      return new Promise((reslove, rej) => {
        let request = this.db_create_transaction(db, store).openCursor();
        let out_dto = {
          data:[],
          total:1,
          start:page.start || 0,
          length:page.length,
        };
        let arr = [];
        request.onsuccess = function (e) {
          let cursor = e.target.result;
          if (cursor) {
            if (_this.db_object_contrast(option, cursor.value)) {
              arr.push(cursor.value);
            }
            cursor.continue();
          } else {
            out_dto.total = arr.length;
            let end = out_dto.length ? out_dto.start + out_dto.length:undefined;
            out_dto.data = arr.slice(out_dto.start, end);
            reslove(out_dto);
          }
        };
        request.onerror = function (e) {
          rej(e);
        };
      })
    },
    db_get(store = 'person', option = {}) {
      let db = this.db_store;
      return new Promise((reslove, rej) => {
        let request = this.db_create_transaction(db, store)
        if(option.id) {
          request = request.get(option.id)
        }else {
          let key = Object.keys(option)[0];
          request = request.index(key).get(option[key]);
        }

        request.onsuccess = function (e) {
          if (request.result) {
            reslove(request.result)
          } else {
            rej(e)
          }
        };
        request.onerror = function (e) {
          rej(e);
        };
      })
    },
    // 对象对比
    db_object_contrast(op, ob) {
      let op_keys = Object.keys(op);
      if (op_keys.length == 0) return true;
      let is_right = 0;
      op_keys.forEach(key=>{
        if (typeof op[key] == "number" && op[key] == ob[key]) {
          is_right++;
        }
        if (typeof op[key] == "string" && (ob[key]+'').includes(op[key])) {
          is_right++;
        }
        if(typeof op[key] == 'undefined') is_right++;
      });
      return is_right >= op_keys.length;
    }
  }
}