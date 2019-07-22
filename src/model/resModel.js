class BaseModel {
    constructor(data, message){
        // if(typeof(data)==='string'){
        //     this.message=data;
        // }
        // if(data){

        // }
        this.data=data;
        this.message=message;
    }
}

class succecssModel extends BaseModel {
    constructor(data, message){
        super(data, message)
        this.errno=0
    }
}
class errorModel extends BaseModel {
    constructor(data, message){
        super(data, message)
        this.errno=-1
    }
}

module.exports = {
    succecssModel,
    errorModel,
}