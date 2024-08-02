import app from './app';
var cors = require('cors')

const PORT = process.env.PORT || 3001;


// Define CORS options
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
