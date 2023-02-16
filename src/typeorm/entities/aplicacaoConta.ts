import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'ALOCACAO_CONTA', synchronize: false })
export class ALOCACAO_CONTA {
    @Column()
      APCO_NOME: string

    @PrimaryColumn()
      APCO_COD: string

    @Column()
      APCO_TIPO: string
}
