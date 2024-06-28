require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./model/User');
const Place = require('./model/Place');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Booking = require('./model/Booking');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'efbabac4011a02f28462d9404e506a0a8dc7af9f1eaf3a3a74a7d051765988fd95e8c18435eb6e3bfaedc27cab2319d41f954547068cfdf9572e9fcdf0bb177c';

app.use(express.urlencoded({extended:false}))

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173" 
    }));
    
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
    
app.get('/test',(req,res)=>{
    res.json('test ok');
});

mongoose.connect(process.env.DATABASE_URL);

app.post('/register',async (req,res)=>{
    const{name,email,password} = req.body;
    try{
        const userData = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
        res.json(userData);
    }catch(err){
        res.status(422).json(err);
    }
    
})

app.post('/login', async (req,res)=>{
    const{email,password}=req.body;
    try{
        const userData = await User.findOne({email}).exec();
        if(userData){
            const passOk = bcrypt.compareSync(password,userData.password);
            if(passOk)
                jwt.sign({
                        email:userData.email,
                        id:userData._id,
                    },
                    jwtSecret,
                    {},
                    (err,token)=>{
                        if(err) throw err;
                        res.cookie('token',token).json(userData);
                    })
            else
                res.status(401).json('Incorrect Password')
        }
        else{
            res.status(401).json('User not found.');
        }
    }catch(err){
        res.status(401).json(err);
    }
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id}); 
        })
    }else{
        res.json(null);
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName = 'photo'+ Date.now() + '.jpg';
    const uploadPath = __dirname + '/uploads/' + newName;
    await imageDownloader.image({
        url:link,
        dest: uploadPath
    })
    res.json(newName);
})
   
const photosMiddleware = multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
})

app.post('/places',(req,res)=>{
    const {token} = req.cookies;
    const {
        title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
    } = req.body;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)throw err;
            const placeDoc = await Place.create({
                owner:userData.id,
                title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
            });
            res.json(placeDoc);
        })
    }
})

app.get('/places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err)throw err;
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    })
})

app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    const {token} = req.cookies;
    const {
        id,title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
    } = req.body;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)throw err;
            const placeData = await Place.findById(id).exec();
            if(placeData.owner.toString() === userData.id){
                placeData.set({
                    title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
                })
                await placeData.save();
                res.json('ok');
            }
        })
    }
})

app.get('/index',async (req,res)=>{
    res.json(await Place.find().exec());
})

app.get('/placefromindex/:id',async (req,res)=>{
    const {id} = req.params;
    const place = await Place.findById(id);
    res.json(place);
})

app.post('/booking', async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    const {
        place,checkIn,checkOut,numberOfGuests,name,mobile,price
    } = req.body;
    Booking.create({
        place,user:userData.id,checkIn,checkOut,numberOfGuests,name,mobile,price
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err;
    });
});

function getUserDataFromReq(req){
    return new Promise ((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtSecret,{},(err,userData)=>{
            if(err) throw err;
            resolve(userData);
        })
    })
}

app.get('/bookings',async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'));
})

app.listen(4000);

//db username: booking
//db password: 3ktocV0NF6PSZ5lm