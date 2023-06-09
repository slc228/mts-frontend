import axios from 'axios';
import { AxiosResponse } from 'axios';
import VueCookies from 'vue-cookies'
//import { Print } from './Frame';

//axios.defaults.withCredentials = true;


const instance = axios.create({
    timeout: 1000000,
    withCredentials: false //不允许跨域携带cookie信息
});
instance.interceptors.request.use(
    config => {
        let userInfo = sessionStorage.getItem('userInfo');
        if(!userInfo){
            return config;
        }
        let token;
        try {
            token = userInfo ? JSON.parse(userInfo).accessToken : "";
        } catch {
            token = "";
        }

        let user_auth = sessionStorage.getItem("user_auth");
        let id;
        let cellphone;
        let name;
        let roleList;
        var current_user_json = {}
        var roleListSend=[]
        try {
            name = user_auth ? JSON.parse(user_auth).name : "";
            cellphone = user_auth ? JSON.parse(user_auth).cellphone : "";
            id = user_auth ? JSON.parse(user_auth).id : 1;
            roleList = user_auth ? JSON.parse(user_auth).roleList : [];
            for(let item of roleList){
                if(item.roleCode.startsWith("PS_")){
                    var role = {}
                    role.roleCode=item.roleCode;
                    role.roleName=item.roleName;
                    roleListSend.push(role);
                }
            }
            current_user_json.id=id; 
            current_user_json.name=name; 
            current_user_json.cellphone=cellphone; 
        } catch {
            name = "";
            cellphone= "";
            id = 1;
            roleList=[];
        }
        
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
            'clientType': 'WEB',
            'current_user_json': encodeURIComponent(JSON.stringify(current_user_json)),
            'roleList':encodeURIComponent(JSON.stringify(roleListSend)),
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(response => {
    switch (response.data.code) {
        case 401:
            Request.WebchannelMap("link",{ url: "/i/login"});
            return response;
        default:
            return response;
    }
}, err => {
    return Promise.resolve(err)
})



export default class Request {
    static appId = '35013501';
//static baseUrl = 'http://202.120.40.69:58082/';
     //   static baseUrl = 'http://www.homewriter.cn:56000/';
    //static baseUrl = 'https://www.homewriter.cn/CovidMap/';
    // static baseUrl = 'http://192.168.30.93/CovidMap/';
    //   static baseUrl = 'http://localhost/CovidMap/';
 //  static baseUrl = '/api/';
   static baseUrl = '/er/yuqing/';
  // static baseUrl = '/yuqing/';
//static baseUrl = 'http://192.168.40.32:8082/';

    static HanldeSuccessBack(response, success, failure) {
        //   console.trace(response);
        if (response.status == 200) {
            if (success != null) {
                let data = response.data;
                if (data.data != null) {
                    data = data.data;
                }
                success(data, response);
            }
        } else {
            if (failure != null) {
                failure(response);
            }
        }
    }

    static HanldeFailureBack(error, failure) {
        console.trace(error);
        if (failure != null) {
            failure(error);
        }
    }



    static WebchannelMap(type, content) {
        const setChannel = new BroadcastChannel(type);
        setChannel.postMessage(
            Object.assign(content, { loginTime: sessionStorage.getItem("nowDataTime") })
        );
        setChannel.close();
        return setChannel;
    };



    static Get(url, success, failure) {

        let user = VueCookies.get("user");
        //  console.log(user);

        let sessionId = "";
        let userId = "";
        if (user != null) {
            sessionId = user.sessionId;
            userId = user.user_uuid;
        }

        //  console.log(Request.baseUrl + url);
        instance.get(
            Request.baseUrl + url
            , {
                timeout: 999999,
                headers: {
                    appid: this.appId,
                    sessionid: sessionId,
                    userid: userId,
                }
            })
            .then(function (response) {
                Request.HanldeSuccessBack(response, success, failure);
            })
            .catch(function (error) {
                Request.HanldeFailureBack(error, failure);
            });
    }

    static Post(url, data, success, failure) {
        console.log(data);

        let user = VueCookies.get("user");
        //   console.log(user);

        let sessionId = "";
        let userId = "";
        if (user != null) {
            sessionId = user.sessionId;
            userId = user.user_uuid;
        }

        //  console.log(sessionId);
        //   console.log(userId);
        //   console.log(this.appId);
        // 发送 POST 请求
        /*       axios({
             method: 'post',
        //   url: Request.baseUrl + url,
             url: 'api/' + url,
             data: data,
             timeout: 999999,
             headers: {
                 appid: this.appId,
                 sessionid: sessionId,
                 userid: userId
             }
             /*    transformRequest: [function (data) {
                     // 对 data 进行任意转换处理
                     console.log(data);
                     return data;
                 }],*/
        //  })


        //   console.log(Request.baseUrl + url);
        instance.post(
            Request.baseUrl + url
            , data
            , {
                timeout: 999999,
                headers: {
                    appid: this.appId,
                    sessionid: sessionId,
                    userid: userId,
                }
            })
            .then(function (response) {
                Request.HanldeSuccessBack(response, success, failure);
            })
            .catch(function (error) {
                Request.HanldeFailureBack(error, failure);
            });
    }


    static Download(url, success, failure) {

        let user = VueCookies.get("user");
        //  console.log(user);

        let sessionId = "";
        let userId = "";
        if (user != null) {
            sessionId = user.sessionId;
            userId = user.user_uuid;
        }

        //  console.log(Request.baseUrl + url);
        instance.get(
            Request.baseUrl + url
            , {
                timeout: 999999,
                headers: {
                    appid: this.appId,
                    sessionid: sessionId,
                    userid: userId,
                },
                responseType: 'arraybuffer'
            })
            .then(function (response) {
                Request.HanldeSuccessBack(response, success, failure);
            })
            .catch(function (error) {
                Request.HanldeFailureBack(error, failure);
            });
    }

/*
    static Upload(url, data, success, failure) {
        this.Post(url, data, success, failure);
    }*/

}
/*
const RequestInstall = {
    install: (Vue:any, options:any) => {
        Vue.prototype.$get = Request.Get;
        Vue.prototype.$post = Request.Post;
    }
}
export default RequestInstall;*/