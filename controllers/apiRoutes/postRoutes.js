const express = require('express');
const router = express.Router();
const {Post,User} = require('../../models');

router.get("/",(req,res)=>{
    Post.findAll().then(PostData=>{
        res.json(PostData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.get("/:id",(req,res)=>{
    Post.findByPk(req.params.id).then(singlePost=>{
        if(singlePost){
            res.json(singlePost)
        } else {
            res.status(404).json({err:"no post found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.post("/",(req,res)=>{
    Post.create({
        post:req.body.post,
    }).then(newPost=>{
        res.json(newPost)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.put("/:id",(req,res)=>{
    Post.update({
        post:req.body.post,
    },{
        where:{
            id:req.params.id
        }
    }).then(updatedData=>{
        if(updatedData[0]){
            res.json(updatedData)
        } else {
            res.status(404).json({err:"no post found"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.delete("/:id",(req,res)=>{
    Post.destroy({
        where:{
            id:req.params.id
        }
    }).then(deletedPost=>{
        if(deletedPost){
            res.json(deletedPost)
        } else {
            res.status(404).json({err:"no post found"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

module.exports = router;