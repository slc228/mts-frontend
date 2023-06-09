import Request from '../common/HttpRequest';

export default class Log {
    static Get(success, failure) {
        Request.Get("User/getAllRoles", success, failure);
    }

    static GetRequestLog(username, url, body, pageId, pageSize, 
        success, failure) {
        Request.Post("data/searchRequestLog",
        {
            username: username,
            url: url,
            body: body,
            pageId: pageId,
            pageSize: pageSize,
        }, success, failure);
    }

    static GetCrawlertLog(jobName, category, content, pageId, pageSize, 
        success, failure) {
        Request.Post("data/searchCrawlLog",
        {
            jobName: jobName,
            content: content,
            category: category,
            pageId: pageId,
            pageSize: pageSize,
        }, success, failure);
    }
}