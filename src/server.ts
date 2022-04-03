import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { url } from 'inspector';
import { RSA_NO_PADDING } from 'constants';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/filteredimage", async ( req, res ) => {
    var validUrl = require('valid-url');
    if(!validUrl.isUri(req.query.image_url)){
      res.statusCode = 500;
      res.send("URL not valid");
    }else{
      let result = await filterImageFromURL(req.query.image_url);
      var onFinished= require('on-finished');
      res.sendFile(result);
      onFinished(res, () =>{
        var files = new Array();
        files.push(result);
        deleteLocalFiles(files);
      })
    }
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();