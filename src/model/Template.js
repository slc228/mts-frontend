import Request from '../common/HttpRequest';

export default class Template{
    static GetAll(success, failure) {
        Request.Get("report/getBriefingTemplate",
            success, failure);
    }
    
    static Save(template, success, failure) {
        Request.Post("report/saveBriefingTemplate",
        template, success, failure);
    }

    static Remove(id, success, failure){
        Request.Post("report/deleteBriefingTemplateById",
        {
            id: id
        }, success, failure);
    }
}