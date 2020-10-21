import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createStores1603219413344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'stores',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'address',
                    type: 'varchar'
                },
                {
                    name: 'cep',
                    type: 'integer'
                },
                {
                    name: 'cnpj',
                    type: 'integer'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stores');
    }

}
