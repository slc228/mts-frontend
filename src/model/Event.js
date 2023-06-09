import Request from '../common/HttpRequest';

export default class  Event{
    static WordCloud(fid,
        success, failure) {
        Request.Post("graph/getWordCloud",
            {
                fid: fid.toString(),
            }, success, failure);
    }

    static Senseitive(fid,startDate,endDate,
        success, failure) {
        Request.Post("graph/getSensitivityDistribution",
            {
                fid: fid.toString(),
                startPublishedDay: startDate,
                endPublishedDay: endDate

            }, success, failure);
    }

    static Emotion(fid,startDate,endDate,
        success, failure) {
        Request.Post("graph/getEmotionalDistribution",
            {
                fid: fid.toString(),
                startPublishedDay: startDate,
                endPublishedDay: endDate

            }, success, failure);
    }

    static Source(fid,startDate,endDate,
        success, failure) {
        Request.Post("graph/getSourceDistribution",
            {
                fid: fid.toString(),
                startPublishedDay: startDate,
                endPublishedDay: endDate

            }, success, failure);
    }

    static SourceMount(fid,startDate,endDate,
        success, failure) {
        Request.Post("graph/getSourceTrend",
            {
                fid: fid.toString(),
                startPublishedDay: startDate,
                endPublishedDay: endDate

            }, success, failure);
    }

    static TotalMount(fid,startDate,endDate,
        success, failure) {
        Request.Post("graph/getTotalTrend",
            {
                fid: fid.toString(),
                startPublishedDay: startDate,
                endPublishedDay: endDate

            }, success, failure);
    }

    static EmotionMount(fid,startDate,endDate,
        success, failure) {
        Request.Post("graph/getEmotionalTrend",
            {
                fid: fid.toString(),
                startPublishedDay: startDate,
                endPublishedDay: endDate

            }, success, failure);
    }

    static Summary(fid,
        success, failure) {
        Request.Post("graph/getSummary",
            {
                fid: fid.toString()
            }, success, failure);
    }

    static Region(fid,startDate,endDate,
        success, failure) {
        Request.Post("graph/getGeographicDistribution",
            {
                fid: fid.toString(),
                startPublishedDay: startDate,
                endPublishedDay: endDate

            }, success, failure);
    }
    
    static WeiboSource(fid,
        success, failure) {
        Request.Post("data/getWeiboTrack",
            {
                fid:  fid.toString(),
            }, success, failure);
    }
    
    static EventTrack(fid, eventTrackOption,
        success, failure) {
        Request.Post("graph/getEventTrack",
            {
                fid:  fid.toString(),
                numberOfClass: eventTrackOption.toString()
            }, success, failure);
    }

    static SourceCommunicationChain (fid,
        success, failure) {
        Request.Post("graph/getTrace",
            {
                fid:  fid.toString(),
            }, success, failure);
    }

    static CommunicationChain (fid,
        success, failure) {
        Request.Post("graph/getWebsiteTrace",
            {
                fid:  fid.toString(),
            }, success, failure);
    }


    static GetExtracs(fid, success, failure){
        Request.Post("data/extractByFangAn",
            {
                fid:  fid.toString(),
            }, success, failure);
    }
}