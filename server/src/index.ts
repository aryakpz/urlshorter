
import express from 'express';
import urlRoutes from './routes/urlRoutes';  
const app = express();
const cors=require("cors")
app.use(cors());
app.use(express.json()); 
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

