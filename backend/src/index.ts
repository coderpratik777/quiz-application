
import { IoManager } from './managers/IoManager'; 
import { UserManager } from './managers/UserManager';

const io = IoManager.getIo();
const userManager = new UserManager();
io.on('connection', (socket) => {
  userManager.addUser(socket)
});

io.listen(4000);