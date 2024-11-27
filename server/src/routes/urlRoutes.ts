
import {deleteUrl, editUrl, getUrls, redirectUrl} from '../controllers/urlController';

const express = require('express');
const router = express.Router();

// create table 
router.get('/create',getUrls);

//get all the urls
router.get('/display', getUrls);

//post the url
router.post('/add',);

//delete the url
router.delete('/delete/:shorturl', deleteUrl);

//update the url

router.put('/edit/:shorturl',editUrl)

// redirect into the mainurl 

router.get('/:shorturl',redirectUrl)
     
export default router;


    