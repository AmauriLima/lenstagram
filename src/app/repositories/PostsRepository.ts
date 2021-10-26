import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../models/Post';

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {}

export default PostsRepository;
