import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1671805590775 implements MigrationInterface {
  name = 'default1671805590775'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 
            EMPR_COD
          ,EMPR_NOME
          , EMPR_FONE
          , EMPR_FAX
          , EMPR_BAIRRO
          , EMPR_CONTATO
          , EMPR_UNFE_SIGLA
          , EMPR_IM
          , EMPR_IE
          , EMPR_END
          , EMPR_CIDADE
          , EMPR_CGC
          , EMPR_CEP
          , EMPR_QRP
          , EMPR_QRP_PROMIS
          , EMPR_REDUZ_INSS
          , EMPR_REDUZ_ISS
          , EMPR_REDUZ_IR
          , EMPR_NUMERO_PROSOFT
          , EMPR_EMAIL
          , EMPR_REDUZ_RETENC1
          , EMPR_REDUZ_RETENC2
          , EMPR_REDUZ_CLIE_INSS
          , EMPR_REDUZ_CLIE_IR
          , EMPR_REDUZ_CLIE_ISS
          , EMPR_REDUZ_CLIE_PIS
          , EMPR_REDUZ_CLIE_COFINS
          , EMPR_REDUZ_CLIE_SOCIAL
          , EMPR_REDUZ_CLIE_RETENC1
          , EMPR_REDUZ_CLIE_RETENC2
          , EMPR_CIDA_COD
          , EMPR_BAIR_COD
          , EMPR_REDUZ_EMPRESTIMO
          , EMPR_REDUZ_PIS
          , EMPR_REDUZ_COFINS
          , EMPR_REDUZ_CSSL
          , EMPR_GERA_LANC_CLIE_INSS
          , EMPR_GERA_LANC_CLIE_IR
          , EMPR_GERA_LANC_CLIE_ISS
          , EMPR_GERA_LANC_CLIE_PIS
          , EMPR_GERA_LANC_CLIE_COFINS
          , EMPR_GERA_LANC_CLIE_SOCIAL
          , EMPR_GERA_LANC_CLIE_RETENC1
          , EMPR_GERA_LANC_CLIE_RETENC2
          , EMPR_DESC_MICRO
          , EMPR_REDUZ_COD
          , EMPR_REDUZ_INSS_PF
          , EMPR_REDUZ_IR_PF
          , EMPR_REDUZ_ISS_PF
          , EMPR_REDUZ_RETENC1_PF
          , EMPR_REDUZ_RETENC2_PF
          , EMPR_REDUZ_PIS_PF
          , EMPR_REDUZ_COFINS_PF
          , EMPR_REDUZ_CSSL_PF
          , EMPR_REDUZ_CLIE_INSS_PF
          , EMPR_REDUZ_CLIE_IR_PF
          , EMPR_REDUZ_CLIE_ISS_PF
          , EMPR_REDUZ_CLIE_RETENC1_PF
          , EMPR_REDUZ_CLIE_RETENC2_PF
          , EMPR_REDUZ_CLIE_PIS_PF
          , EMPR_REDUZ_CLIE_COFINS_PF
          , EMPR_REDUZ_CLIE_SOCIAL_PF
          , EMPR_NIVEL_FEDERAL
          , EMPR_TIPO_SIMPLES
          , EMPR_CLASSIFICACAO_SIMPLES
          , EMPR_ATV_EXCLUSIVA_INDUSTRIAL
          , EMPR_LOGO
          , EMPR_EMAIL_SMTP
          , EMPR_EMAIL_SENHA
          , EMPR_EMAIL_USUARIO
          , EMPR_GERA_LANC_FORN_INSS
          , EMPR_GERA_LANC_FORN_IR
          , EMPR_GERA_LANC_FORN_ISS
          , EMPR_GERA_LANC_FORN_PIS
          , EMPR_GERA_LANC_FORN_COFINS
          , EMPR_GERA_LANC_FORN_SOCIAL
          , EMPR_GERA_LANC_FORN_RETENC1
          , EMPR_GERA_LANC_FORN_RETENC2
          , EMPR_GERA_TERCEIRO_RETENC
          , EMPR_CARTA_COBR
          , EMPR_TIPO_ATIVIDADE
          , EMPR_NIRE
          , EMPR_CONTRATO_SOCIAL
          , EMPR_DATA_CONTRATO_SOCIAL
          , EMPR_SIGLA
          , EMPR_CAPITAL_SOCIAL
          , EMPR_DATA_CONST_REGISTRO
          , EMPR_IND_BLOQ
          , EMPR_GERA_TERCEIRO_IR
          , EMPR_GERA_TERCEIRO_ISS
          , EMPR_GERA_TERCEIRO_INSS
          , EMPR_GERA_TERCEIRO_PIS
          , EMPR_GERA_TERCEIRO_COFINS
          , EMPR_GERA_TERCEIRO_SOCIAL
          , EMPR_GERA_TERCEIRO_RETENC1
          , EMPR_GERA_TERCEIRO_RETENC2
          , EMPR_NATUREZA_JURIDICA
          , EMPR_OBRIG_ECD
          , EMPR_OBRIG_CPRB
          , EMPR_ACORDO_MULTA
          , EMPR_SITUACAO_PJ
          , EMPR_CLTR_COD
          , EMPR_SITUACAO_ESPECIAL_PJ
          , EMPR_FORN_COD
          , EMPR_CLIE_COD
          , EMPR_ATV_CPRB
          , EMPR_FATOR_PREV
          , EMPR_R2010
          , EMPR_R2020
          , EMPR_R2060
          , EMPR_INTERFACE_CONTABIL
          , EMPR_CAMINHO_CONTABIL
          , EMPR_CARGA_TRIBUTARIA
          , EMPR_TIPO_INSC
          , EMPR_LOTACAO_TRIBUTARIA
          , EMPR_RUBRICA_EMP
          , EMPR_RUBRICA_TAB
          , EMPR_NAJU_COD
          , EMPR_COOPERATIVA
          , EMPR_CONSTRUTORA
          , EMPR_PONTO_ELETRONICO
          , EMPR_TRAB_TEMP
          , EMPR_S1200
          , EMPR_S1210
          , EMPR_S1250
          , EMPR_S1260
          , EMPR_S1270
          , EMPR_DATA_VALIDADE_CERT
          , EMPR_SCP_COD
          , EMPR_CERTIFICADO
          , EMPR_PROD_SGN
            EMPR_VALID_CPF,
            EMPR_CPF
        FROM
            EMPRESA`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "empresa"')
  }
}
