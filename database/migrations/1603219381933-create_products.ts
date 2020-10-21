import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProducts1603219381933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
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
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'float'
                },
                {
                    name: 'store_id',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'record_id',
                    type: 'integer',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    name: 'store_id',
                    columnNames: ['store_id'],
                    referencedTableName: 'stores',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'record_id',
                    columnNames: ['record_id'],
                    referencedTableName: 'records',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
