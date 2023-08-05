class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        //first we are checking whether something is there in keyword or not
        const keyword = this.queryStr.keyword ?
         {    
            name:{
                //below is a regex query to find particular pattern in a mongodb
                $regex : this.queryStr.keyword,
                $options:"i"
            },
        }
        :{};
        console.log(keyword )
        this.query = this.query.find({...keyword});
        return this;
    }

    //filter for category
    filter(){
        //we are storing querystr in other string
         const queryCopy = {...this.queryStr}
         //removing some field for category
          console.log(queryCopy)
         const removeFileds = ["keyword","page","limit"];

         removeFileds.forEach(key => delete queryCopy[key]);

         //filter for price and rating

          console.log(queryCopy)
          //object to string
          let queryString = JSON.stringify(queryCopy);
          //below in price we are adding $ before every price tag so we are using regex for this

          queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);

          

          //this.query means product.find()
          this.query = this.query.find(JSON.parse(queryString));

          console.log(queryString)

          return this;
    }

    pagination(resultPerPage){
        //this.queryStr.page gives the number of page which we pass to the header 
           const currentPage = Number(this.queryStr.page) || 1;

           const skip = resultPerPage * (currentPage-1);

           //this.query means product.find
           this.query = this.query.limit(resultPerPage).skip(skip);
           return this;
    }
}
module.exports = ApiFeatures; 