import router from 'router';
import {userLookup} from '../../controllers/admin/userLookup.js';
import {assignNewMembership, updateMembership, changeMembership} from '../../controllers/admin/assignMembership.js';
import authmiddleware from '../../middleware/authMiddleware.js';
import authorizeRole from '../../middleware/authorizeRole.js';

router.get('/user-lookup', authmiddleware, authorizeRole(['admin']), userLookup);
router.post('/assign-membership', authmiddleware, authorizeRole(['admin']), assignNewMembership);
router.put('/update-membership', authmiddleware, authorizeRole(['admin']), updateMembership);
router.put('/change-membership', authmiddleware, authorizeRole(['admin']), changeMembership);