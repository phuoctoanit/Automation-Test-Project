import { config } from '../configs/config';
import app from './app';

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
