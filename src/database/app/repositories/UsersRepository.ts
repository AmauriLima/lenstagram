import { Repository } from 'typeorm';
import { User } from '../../../entities/User';

class UsersRepository extends Repository<User> {}

export default UsersRepository;
