const PATH = "./data.json";
const fs = require("fs");

class Post {

    get () {
        return this.readData();
    }

    getIndBlog (urId) {
        const theposts = this.readData();
        const found = theposts.find(el => el["id"] == urId);

        return found;    //returns urId if found
    }

    add (newPost) {
        const currPost = this.readData();
        currPost.unshift(newPost);
        this.storeData(currPost);
    }

    readData () {
        let rawdata = fs.readFileSync(PATH);
        let pos = JSON.parse(rawdata);
        return pos;
    }

    storeData(rawData) {
        let myData = JSON.stringify(rawData);
        fs.writeFileSync(PATH, myData);
    }
}

module.exports = Post;