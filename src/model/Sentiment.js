import Request from '../common/HttpRequest';

export default class Sentiment {
    static Search(keyword,pageId,pageSize,
        success, failure) {
        Request.Post("data/globalSearchWithObject",
            {
                keyword:keyword,
                sensitiveType:"",
                emotion:"",
                startPublishedDay:"",
                endPublishedDay:"",
                resource:"",
                page:pageId,
                pageSize:pageSize,
                timeOrder:0

            }, success, failure);
    }

    static SearchByBaidu(keyword,pageId,
        success, failure) {
        Request.Post("data/globalSearchBaidu",
            {
                keyword:keyword,
                page:pageId
            }, success, failure);
    }

    static SearchBy360(keyword,pageId,
        success, failure) {
        Request.Post("data/globalSearch360",
            {
                keyword:keyword,
                page:pageId
            }, success, failure);
    }

    static SearchByBing(keyword,pageId,
        success, failure) {
        Request.Post("data/globalSearchBing",
            {
                keyword:keyword,
                page:pageId
            }, success, failure);
    }
}