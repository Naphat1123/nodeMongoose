var express = require("express");
var router = express.Router();
const blogs = require("../model/blog");
const { check, validationResult } = require('express-validator');

router.get("/", (req, res) => {
    blogs.getAllBlogs((err, Blogs) => {
        if (err) console.log(err);

        res.render("blog", { Blogs: Blogs });
    });
});

router.get("/add", (req, res) => {
    res.render("blog/add");
});

router.get("/delete/:id", (req, res) => {
    blogs.deleteBlog([req.params.id], (err) => {
        if (err) throw err
        req.flash('success', 'Delete complete')
        res.redirect('/blog')
    })
});

router.get("/edit/:id", (req, res) => {
    blogs.getBlogId([req.params.id], (err, data) => {
        if (err) throw err

        res.render('blog/edit', { data: data })
    })
});

router.post("/add", (req, res) => {
    if (!req.body.title || !req.body.blog || !req.body.name === null) {
        req.flash('error', 'please insert data')
        res.redirect('/blog/add')
    } else {

        data = new blogs({
            title: req.body.title,
            blog: req.body.blog,
            name: req.body.name,
        });
        blogs.createBlog(data, (err, callback) => {
            if (err) console.log(err);
        });
        req.flash('success', 'insert data complete')
        res.redirect("/blog/add");
    }

});

router.post("/update", (req, res) => {
    if (!req.body.title || !req.body.blog || !req.body.name === null) {
        req.flash('error', 'please insert data')
        res.redirect('/blog')
    } else {

        data = new blogs({
            id: req.body.id,
            title: req.body.title,
            blog: req.body.blog,
            name: req.body.name,
        });
        blogs.updateBlog(data, (err, callback) => {
            if (err) console.log(err);
        });
        req.flash('success', 'update data complete')
        res.redirect("/blog");
    }

});
module.exports = router;