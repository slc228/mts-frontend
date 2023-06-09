import Request from '../common/HttpRequest';

export default class News {
    static Get(keyword, sensitiveFlag, startPublishedDay, endPublishedDay, page, pageSize, timeOrder, isToday, success, failure) {
        Request.Post("data/globalSearch/dataSearch",
            {
                "keyword": keyword,
                "sensitiveFlag": sensitiveFlag,
                "startPublishedDay": startPublishedDay,
                "endPublishedDay": endPublishedDay,
                "page": page,
                "pageSize": pageSize,
                "timeOrder": timeOrder,
                "isToday": isToday,
            },
            success, failure);
    }

    static GetHotArticles(page, pageSize, success, failure) {
        Request.Post("data/getHotArticle",
            {
                "pageId": page,
                "pageSize": pageSize
            },
            success, failure);
    }

    static GetTopics(success, failure) {
        Request.Get("graph/getHotSpot",
            success, failure);
    }
}