import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../app/models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  async findByIdWithSQL(id: string): Promise<User> {
    const [user] = await this.query('SELECT * FROM users WHERE id = $1', [id]);
    return user;
  }
}

export default UsersRepository;
