import Request from '../common/HttpRequest';

export default class Role {
    static Get(success, failure) {
        Request.Get("User/getAllRoles", success, failure);
    }

    static Add(roleName, publicOpinionMonitoring, globalSearch,
        briefingManagement, sensitiveWords, determine,
        directionalMonitoring, directionalUserMonitoring, analysis,
        warning, briefingFabrication, systemManagement,
        success, failure) {
        Request.Post("User/addRole",
        {
            roleName: roleName,
            publicOpinionMonitoring: publicOpinionMonitoring,
            globalSearch: globalSearch,
            briefingManagement: briefingManagement,
            sensitiveWords: sensitiveWords,
            determine: determine,
            directionalMonitoring: directionalMonitoring,
            directionalUserMonitoring: directionalUserMonitoring,
            analysis: analysis,
            warning: warning,
            briefingFabrication: briefingFabrication,
            systemManagement: systemManagement
        }, success, failure);
    }

    static Update(id,roleName, publicOpinionMonitoring, globalSearch,
        briefingManagement, sensitiveWords, determine,
        directionalMonitoring, directionalUserMonitoring, analysis,
        warning, briefingFabrication, systemManagement,
        success, failure) {
        Request.Post("User/modifyRole",
        {
            id: id,
            roleName: roleName,
            publicOpinionMonitoring: publicOpinionMonitoring,
            globalSearch: globalSearch,
            briefingManagement: briefingManagement,
            sensitiveWords: sensitiveWords,
            determine: determine,
            directionalMonitoring: directionalMonitoring,
            directionalUserMonitoring: directionalUserMonitoring,
            analysis: analysis,
            warning: warning,
            briefingFabrication: briefingFabrication,
            systemManagement: systemManagement
        }, success, failure);
    }

    static Delete(id,
        success, failure) {
        Request.Post("User/deleteRole",
            {
                id: id,
            }, success, failure);
    }
}