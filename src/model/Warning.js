import Request from '../common/HttpRequest';

export default class Warning {
    static Save(fid, keywords, sensitiveType, emotion, matchType,
        thresholdNum,
        thresholdNumSwitch,
        thresholdPercentage,
        thresholdPercentageSwitch,
        warningReceiverList,
        success, failure) {
        Request.Post("data/saveEarlyWarningByFid",
            {
                fid: fid.toString(),
                keywords: keywords,//[乌克兰 核电站,俄罗斯 核电站],
                sensitiveType: sensitiveType,//[1,2],
                emotion: emotion,//[angry,fear],
                matchType: matchType,
                thresholdNum: thresholdNum,
                thresholdNumSwitch: thresholdNumSwitch,//1
                thresholdPercentage: thresholdPercentage,//20,
                thresholdPercentageSwitch: thresholdPercentageSwitch,//1
                warningReceiverList : warningReceiverList
            }, success, failure);
    }

    static SaveContact(fid, name, phone,
        success, failure) {
        Request.Post("data/addWarningReceiver",
            {
                fid: fid.toString(),
                name: name,
                phone: phone,
            }, success, failure);
    }

    static Get(fid,
        success, failure) {
        Request.Post("data/getEarlyWarningByFid",
            {
                fid: fid.toString(),
            }, success, failure);
    }

    static GetContacts(fid,
        success, failure) {
        Request.Post("data/getEarlyWarningReceiverByFid",
            {
                fid: fid.toString(),
            }, success, failure);
    }

    static GetRecords(pageId, pageSize,
        success, failure) {
        Request.Post("data/getAllWarningRecord",
            {
                pageId: pageId,
                pageSize: pageSize,
            }, success, failure);
    }

    static GetTemplate(success, failure) {
        Request.Get("data/getSMSTemplate",
            success, failure);
    }

    static SaveTemplate(text, success, failure) {
        Request.Post("data/modifySMSTemplate",
        {
            text: text,
        },   success, failure);
    }

    static GetReceivers(pageId, pageSize,
        success, failure) {
        Request.Post("data/getDefaultWarningReceiver",
            {
                pageId: pageId,
                pageSize: pageSize,
            }, success, failure);
    }

    static AddReceivers( name, phone,
        success, failure) {
        Request.Post("data/addDefaultWarningReceiver",
            {
                name: name,
                phone: phone,
            }, success, failure);
    }

    static UpdateReceivers(id, name, phone,
        success, failure) {
        Request.Post("data/modifyDefaultWarningReceiver",
            {
                id: id,
                name: name,
                phone: phone,
            }, success, failure);
    }
    
    static DeleteReceivers(id,
        success, failure) {
        Request.Post("data/deleteDefaultWarningReceiver",
            {
                id: id,
            }, success, failure);
    }
}