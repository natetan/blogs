var express = require('express');
var router = express.Router();
var Blog = require('../models/blogs');

router.route('/')

	.post(function(req, res) {

		var blog = new Blog();      
		blog.title = req.body.title;
		blog.author = req.body.author;
		blog.body  = req.body.body;

		blog.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message : 'Blog created!' });
		});
	})

    .get(function(req, res) {
        Blog.find(function(err, blogs) {
            if (err) {
                res.send(err);
			}
			/*
			for(var i = 0; i < blogs.length; i++) {
				res.render('blogs', {
					title: blogs[i].title,
					author: blogs[i].author,
					body: blogs[i].body,
				});
			}
			*/
			console.log("blogs length: " + blogs.length);
			res.json(blogs);
        });
    });

router.route('/:blog_id')
	
	.get(function(req, res) {
		Blog.findById(req.params.blog_id, function(err, blog) {
			if (err) {
				console.log("blog id error", err);
				return res.sendStatus(404);
			}
			res.render('blog', {
				title: blog.title,
				author: blog.author,
				body: blog.body,
			});
		});
	})

	.put(function(req, res) {
		Blog.findById(req.params.blog_id, function(err, blog) {
			if (err) {
				res.send(err);
			}
			blog.title = req.body.title;
			blog.author = req.body.author;
			blog.body = req.body.body;

			blog.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'blog updated'});
			});
		});
	})

	.delete(function(req, res) {
		Blog.remove({_id: req.params.blog_id}, function(err, blog) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'blog deleted!'});
		});
	});

module.exports = router;
