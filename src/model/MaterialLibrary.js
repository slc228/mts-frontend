import Request from '../common/HttpRequest';

export default class  MaterialLibrary{
    static Get(fid,
        success, failure) {
        Request.Post("report/getMaterialLibListByFid",
            {
                fid: fid.toString(),
            }, success, failure);
    }

    static Add(id, resultIds,
        success, failure) {
        Request.Post("report/addMaterial",
            {
                id: id,
                ids: resultIds,
            }, success, failure);
    }

    static Delete(id, resultIds,
        success, failure) {
        Request.Post("report/deleteMaterial",
            {
                id: id,
                ids: resultIds,
            }, success, failure);
    }

    static GetMaterials(id, pageId,pageSize,
        success, failure) {
        Request.Post("report/getMaterialDetailById",
            {
                id: id,
                pageId: pageId,
                pageSize: pageSize,
            }, success, failure);
    }

    static AddLibrary(fid, name,
        success, failure) {
        Request.Post("report/addMaterialLib",
            {
                fid: fid.toString(),
                materialLibName: name,
            }, success, failure);
    }

    static DeleteLibrary(id,
        success, failure) {
        Request.Post("report/deleteMaterialLib",
            {
                id: id
            }, success, failure);
    }
}``