import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersProducts1603316942908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_products',
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
                    name: 'product_id',
                    type: 'integer',
                },
                {
                    name: 'user_id',
                    type: 'integer'
                }
            ],
            foreignKeys:[
                {
                    name: 'product_id',
                    columnNames: ['product_id'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'user_id',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'  
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
