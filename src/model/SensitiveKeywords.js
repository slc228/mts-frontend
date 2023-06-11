import Request from '../common/HttpRequest';

export default class SensitiveKeywords  {
    static GetTypes(success, failure){
        Request.Get("data/getSensitiveWordTypes",
         success, failure);
    }

    static GetWords(id, success, failure){
        Request.Post("data/getSensitiveWordsByTypeId",
        {
            typeId: id
        },
         success, failure);
    }

    static AddSensitiveWord(id, word, success, failure){
        Request.Post("data/addSensitiveWord",
        {
            typeId: id,
            text: word
        },
         success, failure);

    }
    static DeleteSensitiveWord(wordId, success, failure){
        Request.Post("data/deleteSensitiveWords",
        {
            wordId: wordId
        },
         success, failure);
        
    }
    static AddSensitiveCategory(data, success, failure){
        Request.Post("data/addSensitiveWordType",
        {
           ...data
        },
         success, failure);
        
    }
    static UpdateSensitiveWordType(data, success, failure){
      Request.Post("data/updateSensitiveWordType",
      {
         ...data
      },
       success, failure);
      
  }
    static DeleteSensitiveCategory(id, success, failure){
        Request.Post("data/deleteSensitiveWordType",
        {
            typeId: id
        },
         success, failure);
        
    }

    static AnalysisCase(text, success, failure){
        Request.Post("data/sampleAnalysis",
        {
            text: text
        },
         success, failure);
    }
}



