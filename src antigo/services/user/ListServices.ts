import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { USUARIO } from '../../typeorm/entities/usuario'

class ListUserService {
  public async execute (): Promise<USUARIO[]> {
    const user = await UsuarioRepository.find()

    return user
  }
}

export default ListUserService
