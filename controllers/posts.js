const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Setlist = require("../models/Setlist")



module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("add-song.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getSongs: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("my-songs.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getSetlist: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ position: "desc" }).lean();
      
      res.render("setlist.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const setlist = await Setlist.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, setlist: setlist});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      /* const result = await cloudinary.uploader.upload(req.file.path); */

      await Post.create({
        songName: req.body.songName,
        bandName: req.body.bandName,
        songKey: req.body.songKey,
        BPM: req.body.BPM,
         /* tab: req.body.tab, */
        /*  image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption, */
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  bookmarkPost: async (req, res)=>{
    var bookmarked = false
    try{
      var post = await Post.findById({_id:req.params.id})
      bookmarked = (post.bookmarks.includes(req.user.id))
    } catch(err){
    }
    //if already bookmarked we will remove user from likes array
    if(bookmarked){
      try{
        await Post.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'bookmarks' : req.user.id}
          })
          
          console.log('Removed user from bookmarks array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      //else add user to bookmarked array
      else{
        try{
          await Post.findOneAndUpdate({_id:req.params.id},
            
            {
              $addToSet : {'bookmarks' : req.user.id},
              /* $position : -1  */
            })
            
            console.log('Added user to bookmarks array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },

     bookmarkUp: async (req, res)=>{
      try {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { bookmarks: 1 },
          }
          );
          console.log('song moved up in bookmarks array')
          res.redirect(`back`)
      }catch(err){
          console.log(err)
      }
    }, 

   

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      /* await cloudinary.uploader.destroy(post.cloudinaryId); */
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/my-songs");
    } catch (err) {
      res.redirect("/my-songs");
    }
  },

  getAboutUs: async (req, res) => {
    try {
      
      res.render("about-us.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  getPP: async (req, res) => {
    try {
      
      res.render("pp.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  getTOS: async (req, res) => {
    try {
      
      res.render("tos.ejs");
    } catch (err) {
      console.log(err);
    }
  },



};



