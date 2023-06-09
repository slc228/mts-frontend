function Parse(type, name) {
    for (let key in type) {
        if (key == name) {
         return type[key];
        }
    }
}

function GetKeys(type) {
    let keys = [];
    for (let key in type) {
        keys.push(key);
    }
    return keys;
}

function GetValues(type) {
    let values = [];
    for (let key in type) {
        values.push(type[key]);
    }
    return values;
}

function GetKey(type, value) {
    for (let key in type) {
        if (type[key] == value) {
            return key;
        }
    }
    return null;
}

function GetValue(type, name) {
    for (let key in type) {
        if (key == name) {
            return type[key];
        }
    }
}

const EntityCategory = {
    WQ: "武器",
    FJ: "飞机",
    JT: "舰艇",
    QT: "潜艇",
    CGQ: "传感器",
}

const KnowledgeCategory = {
    Knowledge: "知识名称",
    Charger: "责任人",
    Group: "组别",
   // Category: "分类",
   // ConfidentialityLevel: "密级",
  //  keyWord: "关键字",
   // ReleaseDate: "发布时间"
}       

const UserRole = {
    ADMIN: "管理员",
    USER: "用户"
}

const KnowledgeViewMode = {
    Single: Symbol("Single"),
    Multi: Symbol("Multi")
}

const NodeType = {
    Entity: Symbol("Entity"),
    Relationship: Symbol("Relationship"),
    Property: Symbol("Property")
}