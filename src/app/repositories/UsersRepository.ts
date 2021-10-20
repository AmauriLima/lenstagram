import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../app/models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export default UsersRepository;
