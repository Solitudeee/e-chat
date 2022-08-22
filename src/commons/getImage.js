
export default {
    getImageUrl(type,name){
        // let baseURL = "http://localhost:3030/";
        let baseURL = "/api/";
        return baseURL+type+'/'+name;
    }
}

