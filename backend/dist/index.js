import app from './app.js';
import { connectToDatabase } from './db/connection.js';
import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('Server Open && Connected to DB');
    });
}).catch(err => console.log(err));
//# sourceMappingURL=index.js.map