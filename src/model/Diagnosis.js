import Request from '../common/HttpRequest';

export default class Diagnosis {
    static Get(success, failure) {
        Request.Post("Home/MapData", null, success, failure);
    }
    static GetDiagnosisStatisticsDistrict(success, failure) {
        Request.Post("Home/DiagnosisStatisticsDistrict", null, success, failure);
    }
    static GetDiagnosisStatisticsDate(success, failure) {
        Request.Post("Home/DiagnosisStatisticsDate", null, success, failure);
    }
    static GetDiagnosisStatisticsDistrictDate(success, failure) {
        Request.Post("Home/DiagnosisDistrictDate", null, success, failure);
    }

    static GetDiagnosisStatisticsDistrictDateLine(success, failure) {
        Request.Post("Home/DiagnosisDistrictDateLine", null, success, failure);
    }
    static GetLocationDetail(location, success, failure) {
        Request.GetRemote("https://restapi.amap.com/v3/geocode/regeo?key=00c6ccdab429bffddfa606a33e75cde1&location=" + location + "&radius=1&extensions=all", success, failure);
    }
    static GetSuzhouMap(leftLongitude,
        rightLongitude,
        topLatitudeValue,
        bottomLatitudeValue, success, failure) {
        Request.Post("Home/GetSuzhouData", {
            "leftLongitude": leftLongitude.toString(),
            "rightLongitude": rightLongitude.toString(),
            "topLatitudeValue": topLatitudeValue.toString(),
            "bottomLatitudeValue": bottomLatitudeValue.toString()
        }, success, failure);
    }

    static GetShanghaiMap(leftLongitude,
        rightLongitude,
        topLatitudeValue,
        bottomLatitudeValue, success, failure) {
        Request.Post("Home/GetShanghaiData", {
            "leftLongitude": leftLongitude.toString(),
            "rightLongitude": rightLongitude.toString(),
            "topLatitudeValue": topLatitudeValue.toString(),
            "bottomLatitudeValue": bottomLatitudeValue.toString()
        }, success, failure);
    }

    static Search(name, city, success, failure) {
        console.log(name);
        console.log(decodeURIComponent(name));

        Request.Post("Home/Search", "name=" + name + "&city=" + city, success, failure);
        /*    Request.Post("Home/Search", {
               "name": name,
                   "city": city,
               }, success, failure);*/

    }
    static GetDiagnosisStatisticsDistrictSuzhou(success, failure) {
        Request.Post("Home/DiagnosisStatisticsDistrictSuzhou", null, success, failure);
    }
    static GetDiagnosisStatisticsDateSuzhou(success, failure) {
        Request.Post("Home/DiagnosisStatisticsDateSuzhou", null, success, failure);
    }
    static GetDiagnosisStatisticsDistrictDateSuzhou(success, failure) {
        Request.Post("Home/DiagnosisDistrictDateSuzhou", null, success, failure);
    }

    static GetDiagnosisStatisticsDistrictDateLineSuzhou(success, failure) {
        Request.Post("Home/DiagnosisDistrictDateLineSuzhou", null, success, failure);
    }



    /*
    static Search(address, success, failure) {  
        Request.HttpGet("https://restapi.amap.com/v3/geocode/geo?key=00c6ccdab429bffddfa606a33e75cde1&address=" + address + "&city=shanghai", success, failure);
    }*/
}