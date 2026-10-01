import { app } from "./src/app.js";
import { PORT, IS_DEV } from "./src/config/config.js";

app.listen(PORT, () => console.log(`Server is ready at PORT ${PORT}`));
