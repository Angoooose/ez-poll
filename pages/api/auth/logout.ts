import { withIronSessionApiRoute } from 'iron-session/next';
import sessionCookie from '../../../utils/sessionCookie';

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    req.session.destroy();
    res.send({ message: 'Logged out', code: 1 });
  }, sessionCookie);