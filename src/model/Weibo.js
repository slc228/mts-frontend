import Request from '../common/HttpRequest';

export default class Weibo {
    static Search(fid, text,pageId,pageSize,
        success, failure) {
        Request.Post("data/searchWeiboUser",
            {
                fid: fid.toString(),
                text: text,
                pageId: pageId,
                pageSize:pageSize
            }, success, failure);
    }

    static Get(fid,
        success, failure) {
        Request.Post("data/getMonitorWeiboUserByFid",
            {
                fid: fid.toString(),
            }, success, failure);
    }


    static Add(fid, uri,nickname,
        success, failure) {
        Request.Post("data/addMonitoringWeiboUser",
            {
                fid: fid.toString(),
                uri: uri,
                nickname: nickname
            }, success, failure);
    }

    static Delete(fid, uri,
        success, failure) {
        Request.Post("data/deleteMonitoringWeiboUser",
            {
                fid: fid.toString(),
                uri: uri
            }, success, failure);
    }

    
}