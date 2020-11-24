import 'dotenv/config';

import { app } from './app';
import { routes } from './controllers';

routes(app);

app.listen(process.env.PORT || 3001, () => {
  console.clear();
  console.log(`Christino SGI server start on port ${process.env.PORT || 3001}...`);
});
