const express = require("express");
const app = express();

const Posting = require("./api/models/posts");
const postData = new Posting();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {  
        //modify filename
        cb(null, `${file.fieldname}-${Date.now()}${ext(file.mimetype)}`)
    }
})
var upload = multer({storage: storage});

const ext = (mimeType) => {
    switch(mimeType) {
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
        case "image/jpg":
            return ".jpg";
    }
}



//middle ware
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/uploads', express.static('uploads'));



//API endpoints

app.get("/", (req, res) => {
    res.status(200).send("hello");
});

app.get("/api/posts", (req, res) => {
    res.status(200).send(postData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const foundPost = postData.getIndBlog(postId);

    if (foundPost) {
    res.status(200).send(foundPost);
    }
    else {
        res.status(404).send("Not found");
    }
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
    
    const newpost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path.replace(/\\/g, "/"),
        "added_date": `${Date.now()}`
    }

    postData.add(newpost);
    res.status(201).send(newpost);
 });



app.listen(3000, () => console.log("Listening on http://localhost:3000"))