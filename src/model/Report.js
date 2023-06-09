import Request from '../common/HttpRequest';

export default class  Report{
    static GetAll(pageId, pageSize, success, failure) {
        Request.Post("report/getAllBriefingFiles",
        {
            pageId: pageId, 
            pageSize: pageSize
        },
            success, failure);
    }

    static GetDownloadUrl(id, type){
       return Request.baseUrl + "report/downloadBriefingFiles?id=" + id + "&type=" + type;
    }

    static Download(id, type, success, failure){
        Request.Download("report/downloadBriefingFiles?id=" + id + "&type=" + type,
            success, failure);
    }
    
    static Add(id, name, templateId, libId, success, failure) {
        Request.Post("report/generateBriefingFile",
        {
            fid: id.toString(), 
            title: name,
            templateId: templateId, 
            materialId: libId
        },
            success, failure);
    }

    static DeleteFile(id, success, failure) {
        Request.Post("report/deleteBriefingFilesById",
        {
            id: id.toString()
        },
            success, failure);
    }

    static Upload(id, file, success, failure) {
        
        var formData = new FormData();
        formData.append("id", id);
        formData.append("file", file);

        Request.Post('report/uploadFile', formData, success, failure);
    }
}