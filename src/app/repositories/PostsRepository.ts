import { EntityRepository, Repository } from 'typeorm';
import { delay } from '../../utils/delay';
import { Post } from '../models/Post';

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {
  async findAllByUserIdWithSQL(id: string): Promise<Post> {
    await delay(2000);
    const posts = await this.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC', [id]);
    return posts;
  }

  async findByIdWithSQL(id: string): Promise<Post> {
    const [post] = await this.query('SELECT * FROM posts WHERE id = $1', [id]);
    return post;
  }

  async updateWithSQL({ id, description, url_img }: Post): Promise<Post> {
    const [[updatedPost]] = await this.query(`
      UPDATE posts
      SET description = $1, url_img = $2, updated_at = now()
      WHERE id = $3
      RETURNING *
    `, [description, url_img, id]);
    return updatedPost;
  }
}

export default PostsRepository;
