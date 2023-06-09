function Dictionary() {
    // 函数中的私有变量
    var items = {};
    // 判断是否有某个属性，使用的是in方法（可以包括继承的属性），而不是使用的Object.hasOwnProperty()
    this.Has = function (key) {
        return key in items;
    };
    // 设置属性和值
    this.Add = function (key, value) {
        items[key] = value;
    };
    // 获取某个属性对应的值
    this.Get = function (key) {
        return this.Has(key) ? items[key] : null;
    };
    // 删除某个属性，此时需要判断items中是否有这个属性，有就删除并返回true，没有返回false
    this.Remove = function (key) {
        if (this.Has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };
    // 获取所有属性的值，返回的是一个数组
    this.Keys = function () {
        var keys = [];
        for (const key in items) {
            // for in 循环会将items所继承的属性也遍历到，为了防止得到遍历的属性，加入如下判断进行过滤
            if (this.Has(key)) {
                keys.push(items[key])
            }
        }
        return keys;
    };
    // 获取所有属性的值，返回的是一个数组
    this.Values = function () {
        var values = [];
        for (const key in items) {
            // for in 循环会将items所继承的属性也遍历到，为了防止得到遍历的属性，加入如下判断进行过滤
            if (this.Has(key)) {
                values.push(items[key])
            }
        }
        return values;
    };
    // 获取所有的属性及其值
    this.Items = function () {
        return items;
    }

    this.Clear = function (){
        items = {};
    }
}
