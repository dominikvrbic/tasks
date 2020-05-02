import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCrendentialsDto: AuthCrendentialsDto): Promise<void> {
    const { password, username } = authCrendentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
