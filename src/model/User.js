import Request from '../common/HttpRequest';

export default class User {
    static Get(pageId, pageSize,success, failure) {
        Request.Post("User/getAllUsers", 
        {
            pageId: pageId,
            pageSize: pageSize,
        }, success, failure);
    }

    static Add(username, validDate, role,
        success, failure) {
        Request.Post("User/createUser",
        {
            username:username,
            password:'35013501',
            phone:'',
            email:'',
            validDate: validDate + ' 00:00:00',
            role: role,
            state: 1,
            eventLimiter: [],
            sensitiveLimiter: []
        }, success, failure);
    }

    static Update(id,
         validDate, role,
        success, failure) {
        Request.Post("User/modifyUser",
        {
            userUuid: id,
         //   username:username,
            validDate: validDate + ' 00:00:00',
            role: role,
            state: 1,
            eventLimiter: [],
            sensitiveLimiter: []
        }, success, failure);
    }

    static Delete(id,
        success, failure) {
        Request.Post("User/deleteUser",
            {
                userUuid: id,
            }, success, failure);
    }

    static Login(username, password,
        success, failure) {
        Request.Post("User/login",
            {
                username: username,
                password: password,
            }, success, failure);
    }
}