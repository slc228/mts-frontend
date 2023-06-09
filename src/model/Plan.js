import Request from '../common/HttpRequest';

export default class Plan  {
    static Get(pageID, pageSize, username, success, failure) {  
        Request.Post("data/getAllFangan",
        {
            pageID : pageID,
            pageSize : pageSize,
            username : username
        } , success, failure);
    }

    static GetEmergencyPlanCount(success, failure) {  
        Request.Get("data/getAllEmergencyFanganQuantity",
        success, failure);
    }
    
    static GetIncrement(success, failure) {  
        Request.Get("data/getQuantityToday", success, failure);
    }

    static GetTotoal(success, failure) {  
        Request.Get("data/getQuantityAll", success, failure);
    }

    static GetWords(id, success, failure) {  
        Request.Get("data/getWordCloudByFid?=" + id,
        success, failure);
    }
    
    static GetCrawlers(success, failure){
        Request.Get("data/getMonitoringWebsites",
       success, failure);
    }
    static SaveMoniterCrawlers(id, crawlers, success, failure){
        Request.Post("data/saveMonitoringWebsitesByFid",
        {
            fid: id.toString(),
            websites: crawlers
        },
       success, failure);
    }
    static GetMoniterCrawlers(id, success, failure){
        Request.Post("data/getMonitoringWebsitesByFid",
        {
            fid: id
        },
       success, failure);
    }

    static GetPlanCount(success, failure) {  
        Request.Get("data/getAllFanganQuantity",
        success, failure);
    }

    static GetPlanResults(fid,
        keyword,
        sensitiveType,
        emotion,
        startPublishedDay,
        endPublishedDay,
        startCaptureTime,
        endCaptureTime,
        resource,
        page,
        pageSize,
        timeOrder, success, failure){
        Request.Post("data/searchByFangAn",
        {   fid : fid.toString(),
            keyword : keyword,
            sensitiveType : sensitiveType,
            emotion : emotion,
            startPublishedDay : startPublishedDay,
            endPublishedDay : endPublishedDay,
            startCaptureTime : startCaptureTime,
            endCaptureTime : endCaptureTime,
            resource : resource,
            page : page,
            pageSize : pageSize,
            timeOrder : timeOrder
        } , success, failure);
    }

    static Delete(id, success, failure){
        Request.Post("User/deleteFangAn",
        {   fid : id.toString(),
            username : '1111'
        } , success, failure);
    }
    
    static Save(fid,
        username,
        programmeName,
        matchType,
        regionKeyword,
        roleKeyword,
        eventKeyword,
        sensitiveWord,
        priority,
        category,
        startDate,
        endDate,
        notifiedWhenCompleted,
        exceptKeyword, success, failure){
        Request.Post("User/saveFangAn",
        {   fid : fid.toString(),
            username : username,
            programmeName : programmeName,
            matchType : matchType,
            regionKeyword : regionKeyword,
            roleKeyword : roleKeyword,
            eventKeyword : eventKeyword,
            sensitiveWord : sensitiveWord,
            priority : priority,
            category : category,
            startDate : startDate,
            endDate : endDate,
            notifiedWhenCompleted : notifiedWhenCompleted,
            exceptKeyword : exceptKeyword
        } , success, failure);
    }

    static GetSources(success, failure){
        Request.Get("data/getResources",
        success, failure);
    }
}



