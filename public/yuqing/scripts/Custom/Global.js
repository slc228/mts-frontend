
const urlneo4j = "http://" + window.document.location.hostname + ":8992/";
//cfl mysql
const mysqlipaddress = "http://" + window.document.location.hostname + ":7004/";
const neo4jdatabase = "http://" + window.document.location.hostname + ":12310";
const urlmysql615 = "http://" + window.document.location.hostname + ":7004";
const urlimage = "http://" + window.document.location.hostname + ":8788/";
const urlreg = "http://" + window.document.location.hostname + ":8099/";
const urlCrawl = "http://" + window.document.location.hostname + ":5001";
const nodeServer = "http://" + window.document.location.host + "/"
const urlData = "http://" + window.document.location.hostname + ":6001/"
const crawl = "http://" + window.document.location.hostname + ":5000/";

const crawlers = crawl + "getRecord?taskid=all";
const submitCcrawlTask = crawl + "crawl";
const submitKjxyCcrawlTask = crawl + "crawl_kjzy";
const searchCcrawlTask = urlData + "search";

const users = nodeServer + "users";
const inference = nodeServer + "inference";

const importFile = urlData + "importFile";
const getImportRecords = urlData + "getImportRecords";
const synchronize = urlData + "importOuter";
const getSynchronizeRecords = urlData + "getOuterRecords";

const getUsers = mysqlipaddress + "user/users";
const login = mysqlipaddress + "user/login";

const entity = nodeServer + "entity";
const getEntityCount = nodeServer + "entity/count";
const getEntityKnowledges = nodeServer + "entity/knowledges";
const getEntityAttributes = nodeServer + "entity/attributes";

const getnodesnames = urlneo4j + "getnodesnames"; //模糊查询，返回实体名与实体属性
const getnodesbyname = urlneo4j + "getnodesbyname"; //模糊查询2，只返回实体名
const deleterelationship = urlneo4j + "deleterelationship"; //删除关系
const addrelationship = urlneo4j + "addrelationship"; //添加关系
const getnodeonelayer = urlneo4j + "getnodeonelayer"; //精确查询
const getnodeonelayer2 = urlneo4j + "getnodeonelayer2"; //精确查询
const addsinglenode = urlneo4j + "addsinglenode"; //添加实体节点
const updatesinglenode = urlneo4j + "updatesinglenode"; //修改节点属性
const deletenode = urlneo4j + "deletenode"; //删除节点
const deletevalue = urlneo4j + "deletevalue"; //删除属性
const getnodebyname = urlneo4j + "getnodebyname"; //精确查询2，返回值有所差别
const addliehuobyfile = urlneo4j + "addliehuobyfile"; //上传烈火xlsx文件
const getliehuofile = urlneo4j + "getliehuofile"; //下载烈火数据文件
const getnodebylabel = urlneo4j + "getnodebylabel"; //通过类别查询节点
const addnodesandrelationshipsbyfile = urlneo4j + "addnodesandrelationshipsbyfile";//通过文件传输数据
const gettextbynum = urlneo4j + "gettextbynum";//获取标注文本
const updateannotation = urlneo4j + "updateannotation";//添加标注
const gettextbynum2 = urlneo4j + "gettextbynum2";//获取标注文本
const updaterawtext = urlneo4j + "updaterawtext";//更新标注文本
const getPropertyTextByNumType = urlneo4j + "getPropertyTextByNumType2";//获取类型属性标注文本，传入num和type
const getPropertyValuesByName = urlneo4j + "getPropertyValuesByName";//获取实体类型的所有属性，传入name
const uploadPropertyRawtext = urlneo4j + "uploadPropertyRawtext";//更新属性标注文本 传入type和rawtext
const updatePropertyAnnotation = urlneo4j + "updatePropertyAnnotation";//更新属性标标注，传入id和annotation

const getAllNodes = urlneo4j + "getallnodestriples";
const getNodesByClass = urlneo4j + "getallnodestriplesbyclass";



const getnode = urlneo4j + "getnode";

//数据集与训练集下载
const loaddata = urlneo4j + "getdataset"
//测试集下载
const loadtestdata = urlneo4j + "gettestset"

//mysql数据库
// const getAllEntity = urlmysql + "getAllEntity"; //获取所有实体类型
// const analysis1 = urlmysql + "analysis1"; //烈火-1的分析数据
// const analysis5 = urlmysql + "analysis5"; //烈火-1的分析数据
// const deleteEntity = urlmysql + "deleteEntity?entityName=";
// const addEntity = urlmysql + "addEntity?entityName=";
//const getAllEntity2 = "http://localhost:7778/kg/entities/all"
const getAllEntity2 = urlmysql615 + "/tris/estb/ets"
const addEntity2 = urlmysql615 + "/kg/entity"
const deleteEntity2 = urlmysql615 + "/kg/entity/" 


//知识融合
const extractEntity = urlreg + "entityreg";
const extractProperty = urlreg + "propertyreg";
const extractRelationship = urlreg + "relationreg";
const knowledgeFusion = mysqlipaddress + "tris/";
const saveTempEntityMuchTogether = knowledgeFusion + "etmps"; //POST 批量添加临时实体
const getTempEntity = knowledgeFusion + "etmps"; //GET 批量获取临时实体（分页）
const getMuchTempEntityIsExist = knowledgeFusion + "etmps/exist"; //POST 批量判断临时实体是否存在于数据库
const deleteTempEntityById = knowledgeFusion + "etmp/"; //DELETE /后传入id,删除id的临时实体
const deleteTempEntityByIds = knowledgeFusion + "etmps/dels"; //POST 批量删除临时实体
const deleteTempRelationshipByIds = knowledgeFusion + "rtmps/dels"; // POST 批量删除临时关系
const deleteTempPropertityByIds = knowledgeFusion + "atmps/dels"; //POST批量删除临时属性
const getTempEntityIsExist = knowledgeFusion + "etmp"; //POST 判断临时实体是否存在 {entityname:, entiyutype:}
const addNewEntity = knowledgeFusion + "estb"; //POST 添加正式实体 {entityname:, entitytype:, id:}
const deleteTwoDbEntity = knowledgeFusion + "estb/del"; //POST 删除实体
const updateTwoDbEntity = knowledgeFusion + "estb"; //PUT 更新实体
const getSimilarEntity = knowledgeFusion + "esims"; //POST 获取相似实体{entityname:, entitytype:}
const addEntityOneToOther = knowledgeFusion + "ea"; //POST 添加实体对齐{id:,e1name:,e2name:,type:}
const deleteTempRelationshipById = knowledgeFusion + "rtmp/"; //DELETE /后传入id,删除id的临时关系
const saveTempRelationshipMuchTogether = knowledgeFusion + "rtmps"; //POST 批量添加临时关系
const getTempRelationship = knowledgeFusion + "rtmps"; //GET 批量获取临时关系（分页）
const getTempRelationshipIsExist = knowledgeFusion + "rtmps/exist"; //POST 批量判断临时实体是否存在临时表单
const addNewRel = knowledgeFusion + "rstb"; //POST {entity_head:, entity_tail, type_head:, type_tail:, rel_value:,id:} 添加关系
const ensureSaveRel = knowledgeFusion + "rstb"; //PUT {entity_head:, entity_tail, type_head:, type_tail:, rel_value:,id:} 修改关系
const deleteRealRel = knowledgeFusion + "rstb/del"; //POST

const deleteTempPropertityById = knowledgeFusion + "atmp/"; //DELETE /后传入id,删除id的临时属性
const saveTempPropertityMuchTogether = knowledgeFusion + "atmps"; //POST 批量添加临时属性
const getTempPropertity = knowledgeFusion + "atmps"; //GET 批量获取临时属性（分页）
const getTempPropertityIsExist = knowledgeFusion + "atmps/exist"; //POST 批量判断临时实体是否存在临时表单
const addNewPro = knowledgeFusion + "astb"; //POST {entity:, entitytype, attribute:, att_value:, id:} 添加属性
const ensureSavePro = knowledgeFusion + "astb"; //PUT {entity:, entitytype, attribute:, att_value:, id:} 修改关系
const deleteRealPro = knowledgeFusion + "astb/del";//POST


const getEquipments = urlmysql615 + "/tris/equipments";


//语音图像视频演示接口
//const yanshi = url3501 + "demo";
//const yanshi2 = urlyuyin + "demo";

//算法
//const stcq = "http://111.186.56.173:8083/ner?sentence=";//实体抽取
//const stcq = urlcq + "ner?sentence="; //实体抽取

//615算法抽取接口





//图像视频
const knowledgeReason = urlimage + "inf"
const getAllImages = urlmysql615 + "/images?";
const getAllVideos = urlmysql615 + "/videos?";
const changeImageUrl = urlmysql615 + "/images/fpath";
const changeVideoUrl = urlmysql615 + "/videos/fpath";
const submitImage = urlmysql615 + "/image";
const submitVideo = urlmysql615 + "/video";
const deleteImage = urlmysql615 + "/image";
const deleteVideo = urlmysql615 + "/video";

//图像畸变
const getImageRelation = urlimage + "relation";//获取图像间相似度
const changeImage = urlimage + "fix";//图像畸变
const composeImage = urlimage + "compose";//合成图像
const getRawImageRelation = urlimage + "rawrelation";//获取raw图像间相似度
const changeRawImage = urlimage + "rawfix";//raw图像畸变
const composeRawImage = urlimage + "rawcompose";//合成raw图像
const uploadImageParas = urlimage + "paras";//上传相机参数
const knowledgeReasoning = urlimage + "inference";//知识推理
const uploadImageParam = urlimage + "uploadimageparam";//上传图片相机参数
